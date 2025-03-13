"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react'
import { Address, createPublicClient, http, type Abi, Chain, bytesToHex, hexToBytes } from 'viem'
import validatorManagerAbi from '../contract_compiler/compiled/PoAValidatorManager.json'
import { usePoAValidatorManagementWizardStore } from '../config/store'
import { debugTraceAndDecode } from '../../common/api/debug'
import { parseNodeID } from '../../common/utils/parse'
import { Context, utils, pvm } from '@avalabs/avalanchejs'
import { platformEndpoint, pvmApi } from './const'
import { AvaCloudSDK } from '@avalabs/avacloud-sdk'
import { getRegistrationJustification } from './justification'
import { packWarpIntoAccessList } from '@/toolbox/src/demo/examples/InitializePoA/packWarp'

interface RemoveValidatorProps {
    rpcUrl: string
    evmChainId: number
    subnetId: string
    transparentProxyAddress: string
    l1Name: string
    tokenSymbol: string
    poaOwnerAddress: string
    validatorNodeID: string
    isTestnet: boolean
    onValidatorRemoved: () => void
}

export default function RemoveValidator({
    subnetId,
    rpcUrl,
    transparentProxyAddress,
    validatorNodeID,
    isTestnet,
    onValidatorRemoved
}: RemoveValidatorProps) {
    const { chainConfig, coreWalletClient, getViemL1Chain } = usePoAValidatorManagementWizardStore()
    const [isRemoving, setIsRemoving] = useState(false)
    const [error, setError] = useState<string | null>(null)
    // Create a fallback chain config if none is provided
    const effectiveChainConfig = getViemL1Chain()
    const publicClient = createPublicClient({
        chain: effectiveChainConfig,
        transport: http()
    })

    const handleRemoveValidator = async () => {
        // Check if wallet client is available
        if (!coreWalletClient) {
            setError("Wallet client not initialized. Please connect your wallet in the Chain Configuration step.");
            return;
        }

        setIsRemoving(true)
        setError(null)

        try {
            // Get account
            const [account] = await coreWalletClient.getAddresses()

            // Parse the node ID using the utility function
            const nodeIDHex = parseNodeID(validatorNodeID) as Address

            // Get the validation ID from the validator manager contract
            const validationID = await publicClient.readContract({
                abi: validatorManagerAbi.abi,
                address: transparentProxyAddress as Address,
                functionName: 'registeredValidators',
                args: [nodeIDHex],
            })
            console.log("Validation ID: ", validationID)

            // Simulate the transaction
            let request;
            try {
                const simulationResult = await publicClient.simulateContract({
                    abi: validatorManagerAbi.abi,
                    address: transparentProxyAddress as Address,
                    functionName: 'initializeEndValidation',
                    args: [validationID],
                    account,
                    gas: BigInt(2500000),
                })
                request = simulationResult.request;
            } catch (error) {
                console.log("Initial simulation failed, trying resendEndValidatorMessage instead");
                const fallbackSimulation = await publicClient.simulateContract({
                    abi: validatorManagerAbi.abi,
                    address: transparentProxyAddress as Address,
                    functionName: 'resendEndValidatorMessage',
                    args: [validationID],
                    account,
                    gas: BigInt(2500000),
                })
                request = fallbackSimulation.request;
            }

            // Submit the transaction to the core wallet
            const tx = await coreWalletClient.writeContract({
                ...request,
                chain: effectiveChainConfig,
            })
            // Wait for the transaction to be confirmed
            const receipt = await publicClient.waitForTransactionReceipt({ hash: tx })
            console.log("Remove Validator Transaction: ", tx)
            console.log("Remove Validator Receipt: ", receipt)

            // Check if the transaction was successful
            if (receipt.status === 'reverted') {
                const revertReason = await debugTraceAndDecode(
                    tx,
                    rpcUrl,
                    validatorManagerAbi.abi as Abi
                )
                throw new Error(`Transaction reverted: ${revertReason}`)
            }

            // Get changeWeight warp message from tx logs
            const changeWeightWarpMessage = receipt.logs[0].data
            console.log("Change Weight Warp Message: ", changeWeightWarpMessage)

            let networkName: "fuji" | "mainnet" = isTestnet ? "fuji" : "mainnet";

            const { signedMessage } = await new AvaCloudSDK({network: networkName, serverURL: "https://api.avax-test.network"}).data.signatureAggregator.aggregateSignatures({
                network: networkName,
                signatureAggregatorRequest: {
                  message: changeWeightWarpMessage,
                  signingSubnetId: subnetId,
                  quorumPercentage: 67
                }
            });

            console.log("Signed Message: ", signedMessage)

            let newPChainAddress = ''
            try {
                if (!window.avalanche || !coreWalletClient) {
                    return;
                }

                const response = await window.avalanche.request<{ addressPVM: string }[]>({
                    method: 'avalanche_getAccounts',
                    params: []
                });

                const activeAccountIndex = response.findIndex((account: any) => account.active === true);
                const pChainAddress = response[activeAccountIndex].addressPVM;

                if (!newPChainAddress || newPChainAddress === '') {
                    newPChainAddress = pChainAddress as string;
                }

                console.log("Core Wallet P-Chain Address: ", pChainAddress);
            } catch (error) {
                console.error("Error fetching P-Chain address:", error);
            }
            // Get fee state, context and utxos from P-Chain
            const feeState = await pvmApi.getFeeState();
            const { utxos } = await pvmApi.getUTXOs({ addresses: [newPChainAddress] });
            const context = await Context.getContextFromURI(platformEndpoint);

            const unsignedRemoveValidatorTx = pvm.e.newSetL1ValidatorWeightTx({
                message: new Uint8Array(Buffer.from(signedMessage, 'hex')),
                feeState,
                fromAddressesBytes: [utils.bech32ToBytes(newPChainAddress)],
                utxos,
            }, context);

            console.log("Unsigned Change Weight Tx: ", unsignedRemoveValidatorTx)
            const unsignedRemoveValidatorTxBytes = unsignedRemoveValidatorTx.toBytes()
            const unsignedRemoveValidatorTxHex = bytesToHex(unsignedRemoveValidatorTxBytes)
  
            if (!window.avalanche) {
                return;
            }
            // Submit the transaction to the P-Chain using Core Wallet
            const txID = await window.avalanche.request({
              method: 'avalanche_sendTransaction',
              params: {
                transactionHex: unsignedRemoveValidatorTxHex,
                chainAlias: 'P',
              }
            });
            console.log("Change Weight Validator Response: ", txID)

              // Wait for transaction to be confirmed
            while (true) {
                let status = await pvmApi.getTxStatus({ txID: txID as string });
                if (status.status === "Committed") break;
                await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
            }
   
            // get justification for original register validator tx (the unsigned warp msg emitted)
            const justification = await getRegistrationJustification(effectiveChainConfig.rpcUrls.default.http[0], validationID as string, subnetId);
            console.log("Justification: ", justification)
            // get signature for p-chain change weight tx
            const { signedMessage: finalSignedMessage } = await new AvaCloudSDK({network: networkName, serverURL: "https://api.avax-test.network"}).data.signatureAggregator.aggregateSignatures({
                network: networkName,
                signatureAggregatorRequest: {
                  message: changeWeightWarpMessage,
                  justification: bytesToHex(justification),
                  signingSubnetId: subnetId,
                  quorumPercentage: 67
                }
            });

            console.log("Final Signed Message: ", finalSignedMessage)

            const signedPChainWarpMsgBytes = hexToBytes(`0x${finalSignedMessage}`)
            const accessList = packWarpIntoAccessList(signedPChainWarpMsgBytes)
            console.log("Access List: ", accessList)

            // Submit the transaction to the Validator Manager
            const {request: completeEndValidationTx} = await publicClient.simulateContract({
                abi: validatorManagerAbi.abi,
                address: transparentProxyAddress as Address,
                functionName: 'completeEndValidation',
                args: [validationID],
                account,
                gas: BigInt(2500000),
                accessList
            })

            const finalizeRegistrationTx = await coreWalletClient.writeContract(completeEndValidationTx)
            console.log("Finalize Registration Tx: ", finalizeRegistrationTx)

            onValidatorRemoved()
        } catch (error: any) {
            console.error('Error removing validator:', error)
            setError(error.message || 'An unknown error occurred while removing the validator')
        } finally {
            setIsRemoving(false)
        }
    }

    return (
        <>
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-2 mb-2 text-xs">
                    <div className="flex items-center">
                        <svg className="h-3 w-3 text-red-400 mr-1 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <div>
                            {error.includes("InvalidValidatorStatus") ? (
                                <span className="text-red-700">Invalid validator status. Try initializing the end process first.</span>
                            ) : (
                                <span className="text-red-700">{error}</span>
                            )}
                        </div>
                    </div>
                </div>
            )}
            <Button
                variant="destructive"
                size="sm"
                onClick={handleRemoveValidator}
                disabled={isRemoving || !coreWalletClient}
            >
                <Trash2 className="mr-2 h-4 w-4" />
                {!coreWalletClient ? 'Connect Wallet First' : isRemoving ? 'Removing...' : 'Remove'}
            </Button>
        </>
    )
}
