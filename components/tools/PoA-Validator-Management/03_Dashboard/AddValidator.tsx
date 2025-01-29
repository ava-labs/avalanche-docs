"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, RefreshCw, Check, X } from 'lucide-react'
import { Address, createWalletClient, createPublicClient, http, fromBytes, bytesToHex, hexToBytes, defineChain, custom } from 'viem'
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

  const addValidator = async () => {
    if (!newNodeID || !newBlsPublicKey || !newBlsProofOfPossession || !newPChainAddress || !newWeight || !poaOwnerAddress) {
      console.log('Missing required fields')
      return
    }

    setIsAddingValidator(true)
    // Reset all steps
    Object.keys(validationSteps).forEach(step => {
      updateStepStatus(step as keyof ValidationSteps, 'pending')
    })

    let account: Address;
    let signedValidatorManagerMessage: string;
    let signedPChainWarpMsg: string;
    let validationID: string;
    let RegisterL1ValidatorUnsignedWarpMsg: string;
    let response: string;
    const platformEndpoint = "https://api.avax-test.network";
    const pvmApi = new pvm.PVMApi(platformEndpoint);

    try {
      // Get account first
      [account] = await walletClient.getAddresses()

      // Step 1: Initialize Registration
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
        
        updateStepStatus('initializeRegistration', 'success')
      } catch (error: any) {
        updateStepStatus('initializeRegistration', 'error', error.message)
        throw error
      }

      // Step 2: Sign Message
      updateStepStatus('signMessage', 'loading')
      try {
        const signedMessage = await aggregateSignatures({
          message: RegisterL1ValidatorUnsignedWarpMsg,
          signingSubnetId: subnetId,
        });

        signedValidatorManagerMessage = signedMessage;
        updateStepStatus('signMessage', 'success')
      } catch (error: any) {
        updateStepStatus('signMessage', 'error', error.message)
        throw error
      }

      // Step 3: Register on P-Chain
      updateStepStatus('registerOnPChain', 'loading')
      try {
        const feeState = await pvmApi.getFeeState();
        const { utxos } = await pvmApi.getUTXOs({ addresses: [newPChainAddress] });
        const context = await Context.getContextFromURI(platformEndpoint);

        // Convert balance from AVAX to nAVAX (1 AVAX = 1e9 nAVAX)
        const balanceInNanoAvax = BigInt(Number(newBalance) * 1e9);

        const unsignedRegisterValidatorTx = pvm.e.newRegisterL1ValidatorTx({
          balance: balanceInNanoAvax,
          blsSignature: new Uint8Array(Buffer.from(newBlsProofOfPossession.slice(2), 'hex')),
          message: new Uint8Array(Buffer.from(signedValidatorManagerMessage, 'hex')),
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
        throw error
      }

      // Step 4: Wait for P-Chain
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

        const signedMessage = await aggregateSignatures({
          message: unsignedPChainWarpMsgHex,
          justification: RegisterL1ValidatorUnsignedWarpMsg,
        });

        signedPChainWarpMsg = signedMessage;

        updateStepStatus('waitForPChain', 'success')
      } catch (error: any) {
        updateStepStatus('waitForPChain', 'error', error.message)
        throw error
      }

      // Step 5: Finalize Registration
      updateStepStatus('finalizeRegistration', 'loading')
      try {
        const signedPChainWarpMsgBytes = hexToBytes(`0x${signedPChainWarpMsg}`)
        const accessList = packWarpIntoAccessList(signedPChainWarpMsgBytes)

        await publicClient.simulateContract({
          abi: validatorManagerAbi.abi,
          address: transparentProxyAddress as Address,
          functionName: 'completeValidatorRegistration',
          args: [0],
          account,
          gas: BigInt(2500000),
          nonce: await publicClient.getTransactionCount({ address: poaOwnerAddress as Address }),
          accessList
        })

        const finalizeRegistrationTx = await walletClient.writeContract({
          abi: validatorManagerAbi.abi,
          address: transparentProxyAddress as Address,
          functionName: 'completeValidatorRegistration',
          args: [0],
          account,
          gas: BigInt(2500000),
          nonce: await publicClient.getTransactionCount({ address: poaOwnerAddress as Address }),
          accessList
        })

        await publicClient.waitForTransactionReceipt({ hash: finalizeRegistrationTx })
        updateStepStatus('finalizeRegistration', 'success')

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
        throw error
      }

    } catch (error: any) {
      console.error('Error adding validator:', error)
    } finally {
      setIsAddingValidator(false)
    }
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
            <Button onClick={addValidator}>
              <Plus className="mr-2 h-4 w-4" /> Add Validator
            </Button>
          </div>
        </CardContent>
      </Card>

      {isAddingValidator && (
        <div className="mt-4 p-4 border rounded-lg bg-background/95 dark:bg-gray-800/95 border-border">
          <h3 className="font-medium mb-3 text-foreground">Validation Progress</h3>
          <StepIndicator
            status={validationSteps.initializeRegistration.status}
            label="Initialize Validator Registration"
            error={validationSteps.initializeRegistration.error}
            onRetry={validationSteps.initializeRegistration.status === 'error' ? addValidator : undefined}
          />
          <StepIndicator
            status={validationSteps.signMessage.status}
            label="Aggregate Signatures for Validator Manager Warp Message"
            error={validationSteps.signMessage.error}
            onRetry={validationSteps.signMessage.status === 'error' ? addValidator : undefined}
          />
          <StepIndicator
            status={validationSteps.registerOnPChain.status}
            label="Register Validator on P-Chain"
            error={validationSteps.registerOnPChain.error}
            onRetry={validationSteps.registerOnPChain.status === 'error' ? addValidator : undefined}
          />
          <StepIndicator
            status={validationSteps.waitForPChain.status}
            label="Wait for P-Chain Confirmation and Aggregate Signatures for P-Chain Warp Message"
            error={validationSteps.waitForPChain.error}
            onRetry={validationSteps.waitForPChain.status === 'error' ? addValidator : undefined}
          />
          <StepIndicator
            status={validationSteps.finalizeRegistration.status}
            label="Finalize Validator Registration"
            error={validationSteps.finalizeRegistration.error}
            onRetry={validationSteps.finalizeRegistration.status === 'error' ? addValidator : undefined}
          />
        </div>
      )}
    </>
  )
}
