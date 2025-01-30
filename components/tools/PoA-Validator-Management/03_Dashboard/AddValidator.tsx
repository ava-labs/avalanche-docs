"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, RefreshCw, Check, X } from 'lucide-react'
import { Address, createWalletClient, createPublicClient, http, fromBytes, bytesToHex, hexToBytes, defineChain, custom, decodeErrorResult, type Abi } from 'viem'
import validatorManagerAbi from '../contract_compiler/compiled/PoAValidatorManager.json'
import { pvm, utils, Context } from '@avalabs/avalanchejs'
import { packL1ValidatorRegistration } from '../../common/utils/convertWarp'
import { packWarpIntoAccessList } from '../../common/utils/packWarp'
import { aggregateSignatures } from '@/components/tools/common/api/signature-aggregator'

interface StepStatus {
  status: 'pending' | 'loading' | 'success' | 'error'
  error?: string
}

interface ValidationSteps {
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

export default function AddValidator({
  rpcUrl,
  evmChainId,
  transparentProxyAddress,
  l1Name,
  tokenSymbol,
  poaOwnerAddress,
  subnetId,
  onValidatorAdded
}: AddValidatorProps) {
  const [newNodeID, setNewNodeID] = useState('')
  const [newBlsPublicKey, setNewBlsPublicKey] = useState('')
  const [newBlsProofOfPossession, setNewBlsProofOfPossession] = useState('')
  const [newPChainAddress, setNewPChainAddress] = useState('')
  const [newWeight, setNewWeight] = useState('')
  const [newBalance, setNewBalance] = useState('0.1')
  const [coreWalletPChainAddress, setCoreWalletPChainAddress] = useState('')
  const [validationSteps, setValidationSteps] = useState<ValidationSteps>({
    initializeRegistration: { status: 'pending' },
    signMessage: { status: 'pending' },
    registerOnPChain: { status: 'pending' },
    waitForPChain: { status: 'pending' },
    finalizeRegistration: { status: 'pending' }
  })
  const [isAddingValidator, setIsAddingValidator] = useState(false)
  const [isProcessComplete, setIsProcessComplete] = useState(false)
  const [savedSignedMessage, setSavedSignedMessage] = useState('')
  const [savedPChainWarpMsg, setSavedPChainWarpMsg] = useState('')

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

  // Create clients inside component with dynamic chain config
  const noopProvider = { request: () => Promise.resolve(null) }
  const provider = typeof window !== 'undefined' ? window.ethereum! : noopProvider
  const walletClient = createWalletClient({
    chain: chainConfig,
    transport: custom(provider),
  })

  const publicClient = createPublicClient({
    chain: chainConfig,
    transport: http()
  })

  useEffect(() => {
    const fetchPChainAddress = async () => {
      try {
        const response = await window.avalanche.request({
          method: 'avalanche_getAccounts',
          params: []
        });
        const activeAccountIndex = response.findIndex((account: any) => account.active === true);
        const pChainAddress = response[activeAccountIndex].addressPVM.replace('avax', 'fuji');
        console.log('P-Chain Address: ', pChainAddress);
        setCoreWalletPChainAddress(pChainAddress);
        // Also set it as the default value for the input if no value is already set
        if (!newPChainAddress) {
          setNewPChainAddress(pChainAddress);
        }
      } catch (error) {
        console.error('Error fetching avalanche accounts, is Core wallet installed?:', error);
      }
    };

    fetchPChainAddress();
  }, []); // Run once when component mounts

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

  const debugTraceAndDecode = async (txHash: string, rpcUrl: string, abi: Abi): Promise<string> => {
    try {
      const traceResponse = await fetch(rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'debug_traceTransaction',
          params: [txHash, { tracer: 'callTracer' }],
          id: 1
        })
      });

      const trace = await traceResponse.json();

      // The error selector is in the output field
      const errorSelector = trace.result.output;
      if (errorSelector && errorSelector.startsWith('0x')) {
        try {
          const errorResult = decodeErrorResult({
            abi,
            data: errorSelector
          });
          return `${errorResult.errorName}${errorResult.args ? ': ' + errorResult.args.join(', ') : ''}`;
        } catch (e) {
          return `Unknown error selector: ${errorSelector}`;
        }
      }
      return 'No error selector found in trace';
    } catch (error: any) {
      return error.message || 'Failed to get revert reason';
    }
  };

  const addValidator = async (startFromStep?: keyof ValidationSteps) => {
    if (!newNodeID || !newBlsPublicKey || !newBlsProofOfPossession || !newPChainAddress || !newWeight || !poaOwnerAddress) {
      console.log('Missing required fields')
      return
    }

    // Only reset steps and validation state if starting fresh
    if (!startFromStep) {
      setIsAddingValidator(true)
      setIsProcessComplete(false)
      Object.keys(validationSteps).forEach(step => {
        updateStepStatus(step as keyof ValidationSteps, 'pending')
      })
    }

    let account: Address;
    let signedValidatorManagerMessage = '';
    let signedPChainWarpMsg = '';
    let validationID = '';
    let RegisterL1ValidatorUnsignedWarpMsg = '';
    let response = '';
    const platformEndpoint = "https://api.avax-test.network";
    const pvmApi = new pvm.PVMApi(platformEndpoint);

    try {
      // Get account first
      [account] = await walletClient.getAddresses()

      // Step 1: Initialize Registration
      if (!startFromStep || startFromStep === 'initializeRegistration') {
        updateStepStatus('initializeRegistration', 'loading')
        try {
          // Process NodeID
          const nodeIDWithoutPrefix = newNodeID.replace("NodeID-", "");
          const decodedID = utils.base58.decode(nodeIDWithoutPrefix)
          const nodeIDHex = fromBytes(decodedID, 'hex')
          const nodeIDHexTrimmed = nodeIDHex.slice(0, -8);

          // Process P-Chain Address
          const pChainAddressBytes = utils.bech32ToBytes(newPChainAddress)
          const pChainAddressHex = fromBytes(pChainAddressBytes, 'hex')
          const expiry = BigInt(Math.floor(Date.now() / 1000) + 43200)

          const args = [
            {
              nodeID: nodeIDHexTrimmed as Address,
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
          
          await publicClient.simulateContract({
            abi: validatorManagerAbi.abi,
            address: transparentProxyAddress as Address,
            functionName: 'initializeValidatorRegistration',
            args,
            account,
            gas: BigInt(2500000),
            nonce: await publicClient.getTransactionCount({ address: poaOwnerAddress as Address })
          })

          const tx = await walletClient.writeContract({
            abi: validatorManagerAbi.abi,
            address: transparentProxyAddress as Address,
            functionName: 'initializeValidatorRegistration',
            args,
            account,
            gas: BigInt(2500000),
            nonce: await publicClient.getTransactionCount({ address: poaOwnerAddress as Address })
          })

          const receipt = await publicClient.waitForTransactionReceipt({ hash: tx })
          RegisterL1ValidatorUnsignedWarpMsg = receipt.logs[0].data ?? '';
          validationID = receipt.logs[1].topics[1] ?? '';
          console.log("RegisterL1ValidatorUnsignedWarpMsg: ", RegisterL1ValidatorUnsignedWarpMsg)
          console.log("ValidationID: ", validationID)
          
          updateStepStatus('initializeRegistration', 'success')
        } catch (error: any) {
          updateStepStatus('initializeRegistration', 'error', error.message)
          return
        }
      }

      // Step 2: Sign Message
      if (!startFromStep || startFromStep === 'signMessage') {
        updateStepStatus('signMessage', 'loading')
        try {
          const signedMessage = await aggregateSignatures({
            message: RegisterL1ValidatorUnsignedWarpMsg,
            signingSubnetId: subnetId,
          });

          signedValidatorManagerMessage = signedMessage;
          console.log("Signed Validator Manager Message: ", signedValidatorManagerMessage)
          setSavedSignedMessage(signedMessage);
          updateStepStatus('signMessage', 'success')
        } catch (error: any) {
          updateStepStatus('signMessage', 'error', error.message)
          return
        }
      }

      // Step 3: Register on P-Chain
      if (!startFromStep || startFromStep === 'registerOnPChain') {
        updateStepStatus('registerOnPChain', 'loading')
        try {
          // Use saved message if retrying
          const messageToUse = startFromStep ? savedSignedMessage : signedValidatorManagerMessage;
          
          const feeState = await pvmApi.getFeeState();
          const { utxos } = await pvmApi.getUTXOs({ addresses: [newPChainAddress] });
          const context = await Context.getContextFromURI(platformEndpoint);

          // Convert balance from AVAX to nAVAX (1 AVAX = 1e9 nAVAX)
          const balanceInNanoAvax = BigInt(Number(newBalance) * 1e9);

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

          response = await window.avalanche.request({
            method: 'avalanche_sendTransaction',
            params: {
              transactionHex: unsignedRegisterValidatorTxHex,
              chainAlias: 'P',
            }
          });
          
          updateStepStatus('registerOnPChain', 'success')
        } catch (error: any) {
          updateStepStatus('registerOnPChain', 'error', error.message)
          return
        }
      }

      // Step 4: Wait for P-Chain
      if (!startFromStep || startFromStep === 'waitForPChain') {
        updateStepStatus('waitForPChain', 'loading')
        try {
          while (true) {
            let status = await pvmApi.getTxStatus({ txID: response });
            if (status.status === "Committed") break;
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
          }
          
          const pChainChainID = '11111111111111111111111111111111LpoYY'
          const validationIDBytes = hexToBytes(validationID as Address)
          const unsignedPChainWarpMsg = packL1ValidatorRegistration(validationIDBytes, true, 5, pChainChainID)
          const unsignedPChainWarpMsgHex = bytesToHex(unsignedPChainWarpMsg)
          console.log("Unsigned P-Chain Warp Message: ", unsignedPChainWarpMsgHex)
          console.log("Waiting 60s before aggregating signatures")
          await new Promise(resolve => setTimeout(resolve, 60000)); // 60 seconds
          const signedMessage = await aggregateSignatures({
            message: unsignedPChainWarpMsgHex,
            justification: RegisterL1ValidatorUnsignedWarpMsg,
            signingSubnetId: subnetId,
          });

          signedPChainWarpMsg = signedMessage;
          setSavedPChainWarpMsg(signedMessage);
          console.log("Signed P-Chain Warp Message: ", signedPChainWarpMsg)

          updateStepStatus('waitForPChain', 'success')
        } catch (error: any) {
          updateStepStatus('waitForPChain', 'error', error.message)
          return
        }
      }

      // Step 5: Finalize Registration
      if (!startFromStep || startFromStep === 'finalizeRegistration') {
        updateStepStatus('finalizeRegistration', 'loading')
        try {
          // Use saved message if retrying
          const warpMsgToUse = startFromStep ? savedPChainWarpMsg : signedPChainWarpMsg;
        
          const signedPChainWarpMsgBytes = hexToBytes(`0x${warpMsgToUse}`)
          const accessList = packWarpIntoAccessList(signedPChainWarpMsgBytes)
          
          console.log("Access List: ", accessList)

          let finalizeRegistrationReceipt;
          let transactionFailed = false;

          try {
            const { request } = await publicClient.simulateContract({
              abi: validatorManagerAbi.abi,
              address: transparentProxyAddress as Address,
              functionName: 'completeValidatorRegistration',
              args: [0],
              account,
              gas: BigInt(5000000),
              nonce: await publicClient.getTransactionCount({ address: poaOwnerAddress as Address }),
              accessList
            }).catch((error) => {
              console.error('Contract simulation failed:', error)
              throw new Error('Failed to simulate contract interaction: ' + error.message)
            })

            console.log("Request: ", request)

            const finalizeRegistrationTx = await walletClient.writeContract(request)
            finalizeRegistrationReceipt = await publicClient.waitForTransactionReceipt({ hash: finalizeRegistrationTx })

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
          console.log("Finalize Registration Receipt: ", finalizeRegistrationReceipt)
          updateStepStatus('finalizeRegistration', 'success')

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

          // Notify parent component
          onValidatorAdded()
        } catch (error: any) {
          updateStepStatus('finalizeRegistration', 'error', error.message)
          return
        }
      }

    } catch (error: any) {
      console.error('Error adding validator:', error)
    }
  }

  const retryStep = (step: keyof ValidationSteps) => {
    // Reset status of current step and all following steps
    const steps = Object.keys(validationSteps) as Array<keyof ValidationSteps>
    const stepIndex = steps.indexOf(step)
    
    // Only reset the statuses from the failed step onwards
    steps.slice(stepIndex).forEach(currentStep => {
      updateStepStatus(currentStep, 'pending')
    })

    // Preserve previous steps' data and continue from failed step
    addValidator(step)
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
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Validator</CardTitle>
        </CardHeader>
        <CardContent>
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
            <Input 
              placeholder={coreWalletPChainAddress || "P-Chain Address"} 
              value={newPChainAddress} 
              onChange={(e) => setNewPChainAddress(e.target.value)}
            />
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
            label="Aggregate Signatures for Validator Manager Warp Message"
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
            label="Finalize Validator Registration"
            error={validationSteps.finalizeRegistration.error}
            onRetry={() => retryStep('finalizeRegistration')}
          />
        </div>
      )}
    </>
  )
}
