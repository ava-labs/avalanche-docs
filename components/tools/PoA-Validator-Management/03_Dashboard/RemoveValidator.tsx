"use client"

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react'
import { Address, bytesToHex, createPublicClient, createWalletClient, custom, defineChain, Hex, hexToBytes, http, keccak256, stringToHex } from 'viem'
import PoAValidatorManagerABI from '../contract_compiler/compiled/PoAValidatorManager.json'
import { fromBytes } from 'viem'
import { aggregateSignatures } from '@/components/tools/common/api/signature-aggregator'
import { pvm, utils, Context } from '@avalabs/avalanchejs'
import { generatePrivateKey } from 'viem/accounts'
import { useL1ManagerWizardStore } from '../config/store'
import { packL1ValidatorRegistration } from '../../common/utils/convertWarp'
import { packWarpIntoAccessList } from '../../common/utils/packWarp'
import { pvmApi } from './const'
import { fetchPChainAddressForActiveAccount } from '../../common/api/coreWallet'
import { parseNodeID } from '../../common/utils/parse'


interface RemoveValidatorProps {
    nodeId: string
    transparentProxyAddress: string
    poaOwnerAddress: string
    onValidatorRemoved: () => void
    evmChainId: number
    l1Name: string
    tokenSymbol: string
    rpcUrl: string,
    subnetId: string,
    validationIdPChain: string
}

export default function RemoveValidator({
    nodeId,
    transparentProxyAddress,
    poaOwnerAddress,
    rpcUrl,
    evmChainId,
    subnetId,
    l1Name,
    tokenSymbol,
    validationIdPChain,
    onValidatorRemoved
}: RemoveValidatorProps) {
    const chainConfig = defineChain({
        id: evmChainId,
        name: l1Name,
        network: l1Name.toLowerCase(),
        nativeCurrency: {
            name: tokenSymbol,
            symbol: tokenSymbol,
            decimals: 18,
        },
        rpcUrls: {
            default: { http: [rpcUrl] },
            public: { http: [rpcUrl] },
        },
    })

    const {
        tempEVMPrivateKeyHex,
        setTempEVMPrivateKeyHex,
    } = useL1ManagerWizardStore()


    const [isRemoving, setIsRemoving] = useState(false)
    const [coreWalletPChainAddress, setCoreWalletPChainAddress] = useState('')

    const noopProvider = { request: () => Promise.resolve(null) }
    const provider = typeof window !== 'undefined' ? window.ethereum! : noopProvider
    const walletClient = createWalletClient({
        chain: chainConfig,
        transport: custom(provider),
    })

    const publicClient = createPublicClient({
        chain: chainConfig,
        transport: http(rpcUrl)
    });

    useEffect(() => {
        if (tempEVMPrivateKeyHex === '0x') {
            setTempEVMPrivateKeyHex(generatePrivateKey())
        }
        const fetchPChainAddress = async () => {
            const pChainAddress = await fetchPChainAddressForActiveAccount();
            setCoreWalletPChainAddress(pChainAddress);
        };
        fetchPChainAddress();
    }, []); // Run once when component mounts

    const handleRemoveValidator = async () => {
        if (!walletClient || !publicClient) return
        try {
            setIsRemoving(true)

            // Get validationId from contract
            const validationId = await publicClient.readContract({
                address: transparentProxyAddress as Address,
                abi: PoAValidatorManagerABI.abi,
                functionName: 'registeredValidators',
                args: [parseNodeID(nodeId)],
            }) as string

            if (!validationId) {
                throw new Error('Validator not registered')
            }

            console.log("Removing validator with validationId:", validationId)

            const { request } = await publicClient.simulateContract({
                address: transparentProxyAddress as Address,
                abi: PoAValidatorManagerABI.abi,
                functionName: 'initializeEndValidation',
                args: [validationId],
                account: poaOwnerAddress as Address,
            })

            const hash = await walletClient.writeContract(request)

            // Wait for transaction to be mined
            const receipt = await publicClient.waitForTransactionReceipt({ hash })
            console.log("Initialize End Validation Receipt: ", receipt)

            const unsignedWarpMsg = receipt.logs[0].data ?? '';
            console.log("Initialize End Validation Warp Msg: ", unsignedWarpMsg)

            const signedWarpMsg = await aggregateSignatures({
                message: unsignedWarpMsg,
                signingSubnetId: subnetId,
            })

            console.log("Initialize End Validation Signed Warp Msg: ", signedWarpMsg)


            let feeState = await pvmApi.getFeeState();
            let { utxos } = await pvmApi.getUTXOs({ addresses: [coreWalletPChainAddress] });
            let context = await Context.getContextFromURI(platformEndpoint);

            const pChainAddressBytes = utils.bech32ToBytes(coreWalletPChainAddress)
            const unsignedPChainDisableValidatorMsg = pvm.e.newDisableL1ValidatorTx({
                disableAuth: [0],
                feeState,
                fromAddressesBytes: [pChainAddressBytes],
                utxos,
                validationId: validationIdPChain,
            }, context)

            const unsignedPChainDisableValidatorTxBytes = unsignedPChainDisableValidatorMsg.toBytes()
            const unsignedPChainDisableValidatorTxHex = bytesToHex(unsignedPChainDisableValidatorTxBytes)

            const disabledValidatorTxResponse = await window.avalanche.request({
                method: 'avalanche_sendTransaction',
                params: {
                    transactionHex: unsignedPChainDisableValidatorTxHex,
                    chainAlias: 'P',
                }
            });

            while (true) {
                let status = await pvmApi.getTxStatus({ txID: disabledValidatorTxResponse });
                console.log("PX Chain Tx Status: ", status)
                if (status.status === "Committed") break;
                await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
            }

            feeState = await pvmApi.getFeeState();
            ({ utxos } = await pvmApi.getUTXOs({ addresses: [coreWalletPChainAddress] }));
            context = await Context.getContextFromURI(platformEndpoint);

            const unsignedPChainChangeWeightMsg = pvm.e.newSetL1ValidatorWeightTx({
                message: new Uint8Array(Buffer.from(signedWarpMsg, 'hex')),
                feeState,
                fromAddressesBytes: [pChainAddressBytes],
                utxos,
            }, context)


            const unsignedPChainChangeWeightTxBytes = unsignedPChainChangeWeightMsg.toBytes()
            const unsignedPChainChangeWeightTxHex = bytesToHex(unsignedPChainChangeWeightTxBytes)

            const changeWeightTxResponse = await window.avalanche.request({
                method: 'avalanche_sendTransaction',
                params: {
                    transactionHex: unsignedPChainChangeWeightTxHex,
                    chainAlias: 'P',
                }
            });

            while (true) {
                let status = await pvmApi.getTxStatus({ txID: changeWeightTxResponse });
                console.log("PX Chain Change Weight Tx Status: ", status)
                if (status.status === "Committed") break;
                await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
            }

            console.log("Validator removed successfully from P-Chain")

            const pChainChainID = '11111111111111111111111111111111LpoYY'
            const validationIDBytes = hexToBytes(validationIdPChain as Address)
            const unsignedPChainWarpMsg = packL1ValidatorRegistration(validationIDBytes, false, 5, pChainChainID)
            const unsignedPChainWarpMsgHex = bytesToHex(unsignedPChainWarpMsg)
            console.log("Unsigned P-Chain Warp Message: ", unsignedPChainWarpMsgHex)
            console.log("Waiting 30s before aggregating signatures")
            await new Promise(resolve => setTimeout(resolve, 30000)); // 30 seconds
            const signedMessage = await aggregateSignatures({
                message: unsignedPChainWarpMsgHex,
                justification: unsignedWarpMsg,
                signingSubnetId: subnetId,
            });

            console.log("Signed P-Chain Warp Message: ", signedMessage)

            const signedPChainWarpMsgBytes = hexToBytes(`0x${signedMessage}`)
            const accessList = packWarpIntoAccessList(signedPChainWarpMsgBytes)

            const { request: completeRequest } = await publicClient.simulateContract({
                abi: PoAValidatorManagerABI.abi,
                address: transparentProxyAddress as Address,
                functionName: 'completeValidatorRegistration',
                args: [0],
                account: tempAccount,
                gas: BigInt(500000),
                accessList: accessList,
            })

            console.log("Access List: ", accessList)



            onValidatorRemoved()
        } catch (error) {
            console.error('Error removing validator:', error)
        } finally {
            setIsRemoving(false)
        }
    }

    return (
        <Button
            variant="destructive"
            size="sm"
            onClick={handleRemoveValidator}
            disabled={isRemoving}
        >
            <Trash2 className="mr-2 h-4 w-4" />
            {isRemoving ? 'Removing...' : 'Remove'}
        </Button>
    )
}
