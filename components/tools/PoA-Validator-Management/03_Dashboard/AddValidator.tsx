"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, RefreshCw, Check, X, AlertCircle } from 'lucide-react'
import { Address, createWalletClient, createPublicClient, http, fromBytes, bytesToHex, hexToBytes, type Abi, parseEther, Chain } from 'viem'
import validatorManagerAbi from '../contract_compiler/compiled/PoAValidatorManager.json'
import { pvm, utils, Context, networkIDs } from '@avalabs/avalanchejs'
import { packL1ValidatorRegistration } from '../../common/utils/convertWarp'
import { packWarpIntoAccessList } from '../../common/utils/packWarp'
import { usePoAValidatorManagementWizardStore } from '../config/store'
import { generatePrivateKey, privateKeyToAccount, privateKeyToAddress } from 'viem/accounts'
import { pChainChainID, platformEndpoint, pvmApi } from './const'
import { debugTraceAndDecode } from '../../common/api/debug'
import { parseNodeID } from '../../common/utils/parse'
import { AvaCloudSDK } from "@avalabs/avacloud-sdk";

interface StepStatus {
  status: 'pending' | 'loading' | 'success' | 'error'
  error?: string
}

export interface ValidationSteps {
  initializeRegistration: StepStatus
  signMessage: StepStatus
  registerOnPChain: StepStatus
  waitForPChain: StepStatus
  finalizeRegistration: StepStatus
}

interface AddValidatorProps {
  rpcUrl: string
  evmChainId: number
  transparentProxyAddress: string
  l1Name: string
  tokenSymbol: string
  poaOwnerAddress: string
  subnetId: string
  onValidatorAdded: () => void
}


// Add Validator to an L1
// The complete process is as follows:
// 1. `InitializeValidatorRegistration` on Validator Manager Contract
// 2. Sign the emitted EVM warp message with signature aggregator
// 3. Submit the transaction to P-Chain `registerL1Validator`
// 4. Reconstruct the warp message from P-Chain
// 5. Sign the reconstructed P-Chain warp message with signature aggregator
// 6. Submit the transaction to Validator Manager Contract `completeRegistration` with the signed P-Chain warp message in an AccessList (temp wallet needed)

export default function AddValidator({
  rpcUrl,
  transparentProxyAddress,
  tokenSymbol,
  poaOwnerAddress,
  subnetId,
  onValidatorAdded
}: AddValidatorProps) {
  const {
    chainConfig,
    coreWalletClient,
    registerL1ValidatorUnsignedWarpMsg,
    setRegisterL1ValidatorUnsignedWarpMsg,
    validationID,
    setValidationID,
    tempEVMPrivateKeyHex,
    setTempEVMPrivateKeyHex,
    getViemL1Chain
  } = usePoAValidatorManagementWizardStore()

  const [newNodeID, setNewNodeID] = useState('')
  const [newBlsPublicKey, setNewBlsPublicKey] = useState('')
  const [newBlsProofOfPossession, setNewBlsProofOfPossession] = useState('')
  const [newPChainAddress, setNewPChainAddress] = useState('')
  const [newWeight, setNewWeight] = useState('')
  const [newBalance, setNewBalance] = useState('')
  const [isAddingValidator, setIsAddingValidator] = useState(false)
  const [isProcessComplete, setIsProcessComplete] = useState(false)
  const [validationSteps, setValidationSteps] = useState<ValidationSteps>({
    initializeRegistration: { status: 'pending' },
    signMessage: { status: 'pending' },
    registerOnPChain: { status: 'pending' },
    waitForPChain: { status: 'pending' },
    finalizeRegistration: { status: 'pending' }
  })
  const [savedSignedMessage, setSavedSignedMessage] = useState('')
  const [savedPChainWarpMsg, setSavedPChainWarpMsg] = useState('')
  const [savedPChainResponse, setSavedPChainResponse] = useState('')
  
  const [networkName, setNetworkName] = useState<"fuji" | "mainnet" | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  
  // Create a fallback chain config if none is provided
  const effectiveChainConfig = getViemL1Chain();
  const publicClient = createPublicClient({
    chain: effectiveChainConfig,
    transport: http()
  })

  // ensure temp wallet is set
  useEffect(() => {
    if (tempEVMPrivateKeyHex === '0x') {
      setTempEVMPrivateKeyHex(generatePrivateKey())
    }
  }, []);

  useEffect(() => {
    setNetworkName("fuji");
  }, []);
  
  // Get P-Chain address when wallet is connected
  useEffect(() => {
    const fetchPChainAddress = async () => {
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
          setNewPChainAddress(pChainAddress as string);
        }
        
        console.log("Core Wallet P-Chain Address: ", pChainAddress);
      } catch (error) {
        console.error("Error fetching P-Chain address:", error);
      }
    };

    fetchPChainAddress();
  }, [coreWalletClient, newPChainAddress]);

  // Update Step Status
  const updateStepStatus = (
    step: keyof ValidationSteps,
    status: StepStatus['status'],
    error?: string
  ) => {
    setValidationSteps(prev => ({
      ...prev,
      [step]: { status, error }
    }))
  }

  // Step Indicator Component
  const StepIndicator = ({
    status,
    label,
    error,
    onRetry
  }: {
    status: StepStatus['status']
    label: string
    error?: string
    onRetry?: () => void
  }) => {
    return (
      <div className="flex items-center gap-2 mb-2">
        {status === 'loading' && (
          <div className="animate-spin">
            <RefreshCw className="h-5 w-5 text-blue-500" />
          </div>
        )}
        {status === 'success' && <Check className="h-5 w-5 text-green-500" />}
        {status === 'error' && <X className="h-5 w-5 text-red-500" />}
        {status === 'pending' && <div className="h-5 w-5 rounded-full border-2 border-gray-200" />}
        <span className={status === 'error' ? 'text-red-500' : 'text-gray-700'}>
          {label}
        </span>
        {status === 'error' && error && (
          <span className="text-sm text-red-500 ml-2">{error}</span>
        )}
        {status === 'error' && onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="ml-2"
          >
            <RefreshCw className="h-4 w-4 mr-1" /> Retry
          </Button>
        )}
      </div>
    )
  }

  const retryStep = async (step: keyof ValidationSteps) => {
    // Reset status of current step and all following steps
    const steps = Object.keys(validationSteps) as Array<keyof ValidationSteps>
    const stepIndex = steps.indexOf(step)

    // Only reset the statuses from the failed step onwards
    steps.slice(stepIndex).forEach(currentStep => {
      updateStepStatus(currentStep, 'pending')
    })

    // Start the validation process from the failed step
    await addValidator(step)

    // If the retried step succeeds (no error status), continue with the next steps
    const nextStepIndex = stepIndex + 1
    if (nextStepIndex < steps.length && validationSteps[step].status === 'success') {
      await addValidator(steps[nextStepIndex])
    }
  }

  // Add Validator
  const addValidator = async (startFromStep?: keyof ValidationSteps) => {
    if (!newNodeID || !newBlsPublicKey || !newBlsProofOfPossession || !newPChainAddress || !newWeight || !poaOwnerAddress) {
      setError('Missing required fields');
      return;
    }

    // Check if wallet client is available
    if (!coreWalletClient) {
      setError("Wallet client not initialized. Please connect your wallet in the Chain Configuration step.");
      return;
    }

    // Only reset steps and validation state if starting fresh
    if (!startFromStep) {
      setIsAddingValidator(true);
      setIsProcessComplete(false);
      setError(null); // Clear any previous errors
      Object.keys(validationSteps).forEach(step => {
        updateStepStatus(step as keyof ValidationSteps, 'pending');
      });
    }

    let account: Address;
    let signedValidatorManagerMessage = '';
    let signedPChainWarpMsg = '';
    let RegisterL1ValidatorUnsignedWarpMsg = '';
    let validationIDHex = '';
    let response = '';

    try {
      // Get account first
      [account] = await coreWalletClient.getAddresses()

      // Step 1: Initialize Registration
      if (!startFromStep || startFromStep === 'initializeRegistration') {
        updateStepStatus('initializeRegistration', 'loading')
        try {

          // Process P-Chain Address
          const pChainAddressBytes = utils.bech32ToBytes(newPChainAddress)
          const pChainAddressHex = fromBytes(pChainAddressBytes, 'hex')
          const expiry = BigInt(Math.floor(Date.now() / 1000) + 43200) // 12 hours

          // Build arguments for `initializeValidatorRegistration`
          const args = [
            {
              nodeID: parseNodeID(newNodeID),
              blsPublicKey: newBlsPublicKey,
              registrationExpiry: expiry,
              remainingBalanceOwner: {
                threshold: 1,
                addresses: [pChainAddressHex as Address]
              },
              disableOwner: {
                threshold: 1,
                addresses: [pChainAddressHex as Address]
              }
            },
            BigInt(newWeight),
          ]

          // Simulate the transaction
          await publicClient.simulateContract({
            abi: validatorManagerAbi.abi,
            address: transparentProxyAddress as Address,
            functionName: 'initializeValidatorRegistration',
            args,
            account,
            gas: BigInt(2500000),
            nonce: await publicClient.getTransactionCount({ address: poaOwnerAddress as Address })
          })

          // Submit the transaction to the core wallet
          const tx = await coreWalletClient.writeContract({
            abi: validatorManagerAbi.abi,
            address: transparentProxyAddress as Address,
            functionName: 'initializeValidatorRegistration',
            args,
            account,
            chain: effectiveChainConfig,
            gas: BigInt(2500000),
            nonce: await publicClient.getTransactionCount({ address: poaOwnerAddress as Address })
          })
          console.log("Initialize Validator Registration Transaction: ", tx)

          // get the unsigned warp message and validation ID from the receipt
          const receipt = await publicClient.waitForTransactionReceipt({ hash: tx })
          RegisterL1ValidatorUnsignedWarpMsg = receipt.logs[0].data ?? '';
          validationIDHex = receipt.logs[1].topics[1] ?? '';


          // Save to store
          setRegisterL1ValidatorUnsignedWarpMsg(RegisterL1ValidatorUnsignedWarpMsg)
          setValidationID(validationIDHex)

          console.log("RegisterL1ValidatorUnsignedWarpMsg: ", RegisterL1ValidatorUnsignedWarpMsg)
          console.log("ValidationID: ", validationIDHex)

          updateStepStatus('initializeRegistration', 'success')

        } catch (error: any) {
          updateStepStatus('initializeRegistration', 'error', error.message)
          setError(error.message || "Failed to initialize validator registration")
          return
        }
      }

      // Step 2: Sign Message
      if (!startFromStep || startFromStep === 'signMessage') {
        updateStepStatus('signMessage', 'loading')
        try {
          // Use stored message if retrying, otherwise use the one from previous step
          const messageToSign = startFromStep ? registerL1ValidatorUnsignedWarpMsg : RegisterL1ValidatorUnsignedWarpMsg;

          try {
            const { signedMessage } = await new AvaCloudSDK({network: networkName, serverURL: "https://api.avax-test.network"}).data.signatureAggregator.aggregateSignatures({
              network: networkName,
              signatureAggregatorRequest: {
                message: messageToSign,
                signingSubnetId: subnetId,
                quorumPercentage: 67
              }
            });

            signedValidatorManagerMessage = signedMessage;
            console.log("Signed Validator Manager Message: ", signedValidatorManagerMessage);
            setSavedSignedMessage(signedMessage);
            updateStepStatus('signMessage', 'success');

            // If this was a retry, continue with next step
            if (startFromStep === 'signMessage') {
              await addValidator('registerOnPChain');
              return;
            }
          } catch (error: any) {
            updateStepStatus('signMessage', 'error', error.message);
            setError(error.message || "Failed to aggregate signatures");
            return;
          }
        } catch (error: any) {
          updateStepStatus('signMessage', 'error', error.message)
          setError(error.message || "Failed to sign message")
          return
        }
      }

      // Step 3: Register on P-Chain
      if (!startFromStep || startFromStep === 'registerOnPChain') {
        updateStepStatus('registerOnPChain', 'loading')
        try {
          if (!window.avalanche) throw new Error('Core wallet not found');
          // Use saved message if retrying
          const messageToUse = startFromStep ? savedSignedMessage : signedValidatorManagerMessage;

          // Get fee state, context and utxos from P-Chain
          const feeState = await pvmApi.getFeeState();
          const { utxos } = await pvmApi.getUTXOs({ addresses: [newPChainAddress] });
          const context = await Context.getContextFromURI(platformEndpoint);

          // Convert balance from AVAX to nAVAX (1 AVAX = 1e9 nAVAX)
          const balanceInNanoAvax = BigInt(Number(newBalance) * 1e9);

          // Create a new register validator transaction
          const unsignedRegisterValidatorTx = pvm.e.newRegisterL1ValidatorTx({
            balance: balanceInNanoAvax,
            blsSignature: new Uint8Array(Buffer.from(newBlsProofOfPossession.slice(2), 'hex')),
            message: new Uint8Array(Buffer.from(messageToUse, 'hex')),
            feeState,
            fromAddressesBytes: [utils.bech32ToBytes(newPChainAddress)],
            utxos,
          }, context);

          const unsignedRegisterValidatorTxBytes = unsignedRegisterValidatorTx.toBytes()
          const unsignedRegisterValidatorTxHex = bytesToHex(unsignedRegisterValidatorTxBytes)

          // Submit the transaction to the P-Chain using Core Wallet
          response = await window.avalanche.request({
            method: 'avalanche_sendTransaction',
            params: {
              transactionHex: unsignedRegisterValidatorTxHex,
              chainAlias: 'P',
            }
          });

          // Save the response for future steps
          setSavedPChainResponse(response)

          updateStepStatus('registerOnPChain', 'success')

          // If this was a retry, continue with next step
          if (startFromStep === 'registerOnPChain') {
            await addValidator('waitForPChain')
            return
          }
        } catch (error: any) {
          updateStepStatus('registerOnPChain', 'error', error.message)
          setError(error.message || "Failed to register on P-Chain")
          return
        }
      }

      // Step 4: Wait for P-Chain txn and aggregate signatures
      if (!startFromStep || startFromStep === 'waitForPChain') {
        updateStepStatus('waitForPChain', 'loading')
        try {

          const justificationToUse = startFromStep ? registerL1ValidatorUnsignedWarpMsg : RegisterL1ValidatorUnsignedWarpMsg;

          // Use saved response if available
          const responseToUse = startFromStep ? savedPChainResponse : response;
          const validationIDToUse = startFromStep ? validationID : validationIDHex;

          // Wait for transaction to be confirmed
          while (true) {
            let status = await pvmApi.getTxStatus({ txID: responseToUse });
            if (status.status === "Committed") break;
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
          }

          // Always use the validation ID from the store since it's set during initialization
          const validationIDBytes = hexToBytes(validationIDToUse as Address)
          const unsignedPChainWarpMsg = packL1ValidatorRegistration(validationIDBytes, true, 5, pChainChainID)
          const unsignedPChainWarpMsgHex = bytesToHex(unsignedPChainWarpMsg)
          console.log("Unsigned P-Chain Warp Message: ", unsignedPChainWarpMsgHex)
          // Aggregate signatures from validators
          const { signedMessage } = await new AvaCloudSDK({network: networkName, serverURL: "https://api.avax-test.network"}).data.signatureAggregator.aggregateSignatures({
            network: networkName,
            signatureAggregatorRequest: {
              message: unsignedPChainWarpMsgHex,
              justification: justificationToUse,
              signingSubnetId: subnetId,
              quorumPercentage: 67
            }
          });

          signedPChainWarpMsg = signedMessage;
          setSavedPChainWarpMsg(signedMessage);
          console.log("Signed P-Chain Warp Message: ", signedPChainWarpMsg)

          updateStepStatus('waitForPChain', 'success')
          
          // If this was a retry, continue with next step
          if (startFromStep === 'waitForPChain') {
            await addValidator('finalizeRegistration')
            return
          }
        } catch (error: any) {
          updateStepStatus('waitForPChain', 'error', error.message)
          setError(error.message || "Failed to wait for P-Chain confirmation")
          return
        }
      }

      // Step 5: Finalize Registration
      if (!startFromStep || startFromStep === 'finalizeRegistration') {
        updateStepStatus('finalizeRegistration', 'loading')
        try {
          // Use saved message if retrying
          const warpMsgToUse = startFromStep ? savedPChainWarpMsg : signedPChainWarpMsg;

          // Convert the signed warp message to hex then to bytes then pack into access list
          const signedPChainWarpMsgBytes = hexToBytes(`0x${warpMsgToUse}`)
          const accessList = packWarpIntoAccessList(signedPChainWarpMsgBytes)
          console.log("Access List: ", accessList)

          let finalizeRegistrationReceipt;
          let transactionFailed = false;

          try {
            // simulate the tx then submit it. notice the access list is used
            const { request } = await publicClient.simulateContract({
              abi: validatorManagerAbi.abi,
              address: transparentProxyAddress as Address,
              functionName: 'completeValidatorRegistration',
              args: [0],
              account: poaOwnerAddress as Address,
              gas: BigInt(500000),
              nonce: await publicClient.getTransactionCount({ address: poaOwnerAddress as Address }),
              accessList
            }).catch((error) => {
              console.error('Contract simulation failed:', error)
              throw new Error('Failed to simulate contract interaction: ' + error.message)
            })

            if (!coreWalletClient) {
              throw new Error("Wallet client not initialized. Please reconnect your wallet.");
            }

            const finalizeRegistrationTx = await coreWalletClient.writeContract(request)
            finalizeRegistrationReceipt = await publicClient.waitForTransactionReceipt({ hash: finalizeRegistrationTx })

            // check if weird revert reason
            if (finalizeRegistrationReceipt.status === 'reverted') {
              const revertReason = await debugTraceAndDecode(
                finalizeRegistrationTx,
                rpcUrl,
                validatorManagerAbi.abi as Abi
              );
              console.error('Transaction reverted:', revertReason);
              transactionFailed = true;
              throw new Error(`Transaction reverted: ${revertReason}`);
            }

            console.log("Finalize Registration Receipt: ", finalizeRegistrationReceipt)
            updateStepStatus('finalizeRegistration', 'success')
          } catch (error: any) {
            // Extract error message from potential JSON RPC error
            const errorMessage = error.cause?.message || error.shortMessage || error.message || 'Unknown error';
            console.error('Transaction failed:', errorMessage);
            transactionFailed = true;
            throw new Error(`Transaction failed: ${errorMessage}`);
          }

          if (transactionFailed) {
            // This will be caught by the outer try-catch and allow for retry via the UI
            throw new Error('Transaction failed - please try again')
          }
          updateStepStatus('finalizeRegistration', 'success')

          // Notify parent component to refresh UI
          onValidatorAdded()
        } catch (error: any) {
          updateStepStatus('finalizeRegistration', 'error', error.message)
          setError(error.message || "Failed to finalize registration")
          return
        }

        // After successful completion
        setIsProcessComplete(true)
        setIsAddingValidator(false)

        // Clear form
        setNewNodeID('')
        setNewBlsPublicKey('')
        setNewBlsProofOfPossession('')
        setNewPChainAddress('')
        setNewWeight('')
        setNewBalance('')
      }

    } catch (error: any) {
      console.error('Error adding validator:', error)
      setError(error.message || 'An unknown error occurred while adding the validator')
      setIsAddingValidator(false)
    }
  }

  // Add reset function
  const resetValidation = () => {
    setIsAddingValidator(false)
    setIsProcessComplete(false)
    Object.keys(validationSteps).forEach(step => {
      updateStepStatus(step as keyof ValidationSteps, 'pending')
    })
  }

  return (
    <>
      {!coreWalletClient ? (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add New Validator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4 flex items-start">
              <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
              <div>
                <p className="text-amber-700 font-medium">Wallet Not Connected</p>
                <p className="text-amber-600">Please connect your Core wallet in the Chain Configuration step to add validators.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add New Validator</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                <p className="text-red-700">{error}</p>
              </div>
            )}
            <div className="grid grid-cols-1 gap-4">
              <Input
                placeholder="Node ID"
                value={newNodeID}
                onChange={(e) => setNewNodeID(e.target.value)}
              />
              <Input
                placeholder="BLS Public Key"
                value={newBlsPublicKey}
                onChange={(e) => setNewBlsPublicKey(e.target.value)}
              />
              <Input
                placeholder="BLS Proof of Possession"
                value={newBlsProofOfPossession}
                onChange={(e) => setNewBlsProofOfPossession(e.target.value)}
              />
              <div className="relative group">
                <Input
                  placeholder="P-Chain Address"
                  value={newPChainAddress}
                  disabled
                />
                <div className="absolute hidden group-hover:block bg-gray-800 text-gray-100 text-xs rounded-md px-3 py-1.5 -top-10 left-0 shadow-md">
                  Autofilled from Core wallet
                </div>
              </div>
              <Input
                placeholder="Initial Balance (AVAX)"
                value={newBalance}
                onChange={(e) => setNewBalance(e.target.value)}
                type="number"
                min="0"
                step="0.000000001"
              />
              <Input
                placeholder="Weight"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
                type="number"
              />
              <Button
                onClick={isAddingValidator ? resetValidation : () => addValidator()}
                variant={isAddingValidator ? "destructive" : "default"}
              >
                {isAddingValidator ? (
                  <>
                    <X className="mr-2 h-4 w-4" /> Cancel
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" /> Add Validator
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {isAddingValidator && (
        <div className="mt-4 p-4 border rounded-lg bg-background/95 dark:bg-gray-800/95 border-border">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-foreground">Validation Progress</h3>
            {isProcessComplete && (
              <Button variant="outline" size="sm" onClick={resetValidation}>
                <RefreshCw className="h-4 w-4 mr-1" /> Start New Validation
              </Button>
            )}
          </div>
          <StepIndicator
            status={validationSteps.initializeRegistration.status}
            label="Initialize Validator Registration"
            error={validationSteps.initializeRegistration.error}
            onRetry={() => retryStep('initializeRegistration')}
          />
          <StepIndicator
            status={validationSteps.signMessage.status}
            label="Aggregating Signatures for Emitted Warp Message"
            error={validationSteps.signMessage.error}
            onRetry={() => retryStep('signMessage')}
          />
          <StepIndicator
            status={validationSteps.registerOnPChain.status}
            label="Register Validator on P-Chain"
            error={validationSteps.registerOnPChain.error}
            onRetry={() => retryStep('registerOnPChain')}
          />
          <StepIndicator
            status={validationSteps.waitForPChain.status}
            label="Wait for P-Chain Confirmation and Aggregate Signatures for P-Chain Warp Message"
            error={validationSteps.waitForPChain.error}
            onRetry={() => retryStep('waitForPChain')}
          />
          <StepIndicator
            status={validationSteps.finalizeRegistration.status}
            label="Finalize Registration"
            error={validationSteps.finalizeRegistration.error}
            onRetry={() => retryStep('finalizeRegistration')}
          />
        </div>
      )}
    </>
  )
}
