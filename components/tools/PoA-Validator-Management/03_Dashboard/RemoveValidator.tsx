"use client"

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react'
import { Address, bytesToHex, createPublicClient, hexToBytes, http } from 'viem'
import PoAValidatorManagerABI from '../contract_compiler/compiled/PoAValidatorManager.json'
import { pvm, utils, Context } from '@avalabs/avalanchejs'
import { usePoAValidatorManagementWizardStore } from '../config/store'
import { packL1ValidatorRegistration } from '../../common/utils/convertWarp'
import { packWarpIntoAccessList } from '../../common/utils/packWarp'
import { pChainChainID, platformEndpoint, pvmApi } from './const'
import { fetchPChainAddressForActiveAccount } from '../../common/api/coreWallet'
import { parseNodeID } from '../../common/utils/parse'
import { AvaCloudSDK } from '@avalabs/avacloud-sdk'

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


// Remove Validator From an L1
// The complete process is as follows:
// 1. `InitializeEndValidation` on Validator Manager Contract
// 2. Sign the emitted EVM warp message with signature aggregator
// 3. Set the validator weight to 0 on P-Chain using a `SetL1ValidatorWeightTx`
// 4. Set the validator as disabled on P-Chain using a `DisableL1ValidatorTx` (which withdraws the AVAX PAYG balance to address specified from `RegisterL1Validator`)
// 5. Reconstruct the warp message from P-Chain that disables the validator
// 6. Sign the reconstructed P-Chain warp message with signature aggregator (justification needed??? Probably unsigned warp msg from EVM?)
// 7. Submit the transaction to P-Chain `completeEndValidation` passing the signed P-Chain warp message in an AccessList (temp wallet needed)

export default function RemoveValidator({
    nodeId,
    transparentProxyAddress,
    poaOwnerAddress,
    rpcUrl,
    subnetId,
    validationIdPChain,
    onValidatorRemoved
}: RemoveValidatorProps) {
    const {
        chainConfig,
        coreWalletClient
    } = usePoAValidatorManagementWizardStore()

    if (!chainConfig) {
        throw new Error('Chain config is not set')
    }
    if (!coreWalletClient) {
        throw new Error('Core wallet client is not set')
    }

    const [isRemoving, setIsRemoving] = useState(false)
    const [coreWalletPChainAddress, setCoreWalletPChainAddress] = useState('')

    const publicClient = createPublicClient({
        chain: chainConfig,
        transport: http(rpcUrl)
    });

    // ensure temp wallet is set and get P-Chain address from core wallet
    useEffect(() => {
        const fetchPChainAddress = async () => {
            try {
                const pChainAddress = await fetchPChainAddressForActiveAccount();
                setCoreWalletPChainAddress(pChainAddress);
                console.log("Core Wallet P-Chain Address: ", pChainAddress);
            } catch (error) {
                console.error("Error fetching P-Chain address:", error);
            }
        };
        fetchPChainAddress();
    }, []); // Add dependency to re-run if temp wallet changes

    const handleRemoveValidator = async () => {
        if (!publicClient) return
        try {
            setIsRemoving(true)

            // Get validationId from Validator Manager Contract
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

            // Initialize End Validation on Validator Manager Contract
            const { request } = await publicClient.simulateContract({
                address: transparentProxyAddress as Address,
                abi: PoAValidatorManagerABI.abi,
                functionName: 'initializeEndValidation',
                args: [validationId],
                account: poaOwnerAddress as Address,
                chain: chainConfig,
            })

            const hash = await coreWalletClient.writeContract(request)

            // Wait for transaction to be confirmed
            const receipt = await publicClient.waitForTransactionReceipt({ hash })
            console.log("Initialize End Validation Receipt: ", receipt)

            // Get the unsigned warp message from the receipt
            const unsignedWarpMsg = receipt.logs[0].data ?? '';
            console.log("Initialize End Validation Warp Msg: ", unsignedWarpMsg)

            // Aggregate signatures from validators
            const { signedMessage: signedWarpMsg } = await new AvaCloudSDK({network: 'fuji', serverURL: "https://api.avax-test.network"}).data.signatureAggregator.aggregateSignatures({
                network: 'fuji',
                signatureAggregatorRequest: {
                  message: unsignedWarpMsg,
                  signingSubnetId: subnetId,
                  quorumPercentage: 67
                }
              });

            console.log("Initialize End Validation Signed Warp Msg: ", signedWarpMsg)

             // Create a new change weight transaction
             const pChainAddressBytes = utils.bech32ToBytes(coreWalletPChainAddress)

             let feeState = await pvmApi.getFeeState();
             let { utxos } = await pvmApi.getUTXOs({ addresses: [coreWalletPChainAddress] });
             let context = await Context.getContextFromURI(platformEndpoint);
             const unsignedPChainChangeWeightMsg = pvm.e.newSetL1ValidatorWeightTx({
                message: new Uint8Array(Buffer.from(signedWarpMsg, 'hex')),
                feeState,
                fromAddressesBytes: [pChainAddressBytes],
                utxos,
            }, context)

            // convert to bytes then to hex
            const unsignedPChainChangeWeightTxBytes = unsignedPChainChangeWeightMsg.toBytes()
            const unsignedPChainChangeWeightTxHex = bytesToHex(unsignedPChainChangeWeightTxBytes)

            // Submit to Core Wallet
            if (!window.avalanche) throw new Error('Core wallet not found');
            const changeWeightTxResponse = await window.avalanche.request<string>({
                method: 'avalanche_sendTransaction',
                params: {
                    transactionHex: unsignedPChainChangeWeightTxHex,
                    chainAlias: 'P',
                }
            });

            // Wait for transaction to be confirmed
            while (true) {
                let status = await pvmApi.getTxStatus({ txID: changeWeightTxResponse });
                console.log("PX Chain Change Weight Tx Status: ", status)
                if (status.status === "Committed") break;
                await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
            }

            console.log("Validator changed weight to 0 successfully on P-Chain")


            // Get fee state and utxos from P-Chain
            // feeState = await pvmApi.getFeeState();
            // ({ utxos } = await pvmApi.getUTXOs({ addresses: [coreWalletPChainAddress] }));
            // context = await Context.getContextFromURI(platformEndpoint);

            // // Create a new disable validator transaction
            // const unsignedPChainDisableValidatorMsg = pvm.e.newDisableL1ValidatorTx({
            //     disableAuth: [0],
            //     feeState,
            //     fromAddressesBytes: [pChainAddressBytes],
            //     utxos,
            //     validationId: validationIdPChain,
            // }, context)

            // // Convert to bytes then to hex
            // const unsignedPChainDisableValidatorTxBytes = unsignedPChainDisableValidatorMsg.toBytes()
            // const unsignedPChainDisableValidatorTxHex = bytesToHex(unsignedPChainDisableValidatorTxBytes)

            // // Submit to Core Wallet
            // const disabledValidatorTxResponse = await window.avalanche.request<string>({
            //     method: 'avalanche_sendTransaction',
            //     params: {
            //         transactionHex: unsignedPChainDisableValidatorTxHex,
            //         chainAlias: 'P',
            //     }
            // });

            // // Wait for transaction to be confirmed
            // while (true) {
            //     let status = await pvmApi.getTxStatus({ txID: disabledValidatorTxResponse });
            //     console.log("PX Chain Tx Status: ", status)
            //     if (status.status === "Committed") break;
            //     await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
            // }

            // TODO: RECONSTRUCT THE WARP MESSAGE FROM P-CHAIN AND COMPLETEENDVALIDATION ON EVM

            // // Reconstruct the warp message from P-Chain
            const validationIDBytes = hexToBytes(validationIdPChain as Address)
            const unsignedPChainWarpMsg = packL1ValidatorRegistration(validationIDBytes, false, 5, pChainChainID)
            const unsignedPChainWarpMsgHex = bytesToHex(unsignedPChainWarpMsg)
            console.log("Unsigned P-Chain Warp Message: ", unsignedPChainWarpMsgHex)
          

            // Sign the reconstructed P-Chain warp message with justification (unsigned warp msg from EVM??)
            // const { signedMessage } = await new AvaCloudSDK({network: 'fuji', serverURL: "https://api.avax-test.network"}).data.signatureAggregator.aggregateSignatures({
            //     network: 'fuji',
            //     signatureAggregatorRequest: {
            //       message: unsignedPChainWarpMsgHex,
            //       justification: "PLACEHOLDER",
            //       signingSubnetId: subnetId,
            //       quorumPercentage: 67
            //     }
            //   });

            // console.log("Signed P-Chain Warp Message: ", signedMessage)

            // Convert to bytes then to hex then pack into access list
            // const signedPChainWarpMsgBytes = hexToBytes(`0x${signedMessage}`)
            // const accessList = packWarpIntoAccessList(signedPChainWarpMsgBytes)

            // const { request: completeRequest } = await publicClient.simulateContract({
            //     abi: PoAValidatorManagerABI.abi,
            //     address: transparentProxyAddress as Address,
            //     functionName: 'completeValidatorRegistration',
            //     args: [0],
            //     account: tempAccount,
            //     gas: BigInt(500000),
            //     accessList: accessList,
            // })

            // console.log("Access List: ", accessList)
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
