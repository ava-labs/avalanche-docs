"use client";

import { useState, useEffect } from 'react';
import { useExampleStore } from "../../utils/store";
import { useErrorBoundary } from "react-error-boundary";
import { Button, Input, Container } from "../../../components";
import { createWalletClient, custom, createPublicClient, http, fromBytes, bytesToHex, hexToBytes, parseEther } from 'viem';
import { pvm, utils, Context, networkIDs } from '@avalabs/avalanchejs';
import validatorManagerAbi from '../../../../contracts/icm-contracts/compiled/ValidatorManager.json';
import { packWarpIntoAccessList } from '../InitializePoA/packWarp';
import { packL1ValidatorRegistration } from '../L1/convertWarp';
import { AvaCloudSDK } from '@avalabs/avacloud-sdk';

// Define interfaces for step status tracking
interface StepStatus {
  status: 'pending' | 'loading' | 'success' | 'error';
  error?: string;
}

interface ValidationSteps {
  initializeRegistration: StepStatus;
  signMessage: StepStatus;
  registerOnPChain: StepStatus;
  waitForPChain: StepStatus;
  finalizeRegistration: StepStatus;
}

// Parse a NodeID- string to a hex string without the prefix and last 8 bytes
const parseNodeID = (nodeID: string) => {
    const nodeIDWithoutPrefix = nodeID.replace("NodeID-", "");
    const decodedID = utils.base58.decode(nodeIDWithoutPrefix)
    const nodeIDHex = fromBytes(decodedID, 'hex')
    const nodeIDHexTrimmed = nodeIDHex.slice(0, -8)
    return nodeIDHexTrimmed
}

export default function AddValidator() {
  const { showBoundary } = useErrorBoundary();
  const {
    walletChainId,
    subnetID,
    proxyAddress,
    evmChainRpcUrl,
    networkID,
    evmChainName,
    evmChainCoinName,
    getPChainAddress
  } = useExampleStore();

  // State variables for form inputs
  const [newNodeID, setNewNodeID] = useState('');
  const [newBlsPublicKey, setNewBlsPublicKey] = useState('');
  const [newBlsProofOfPossession, setNewBlsProofOfPossession] = useState('');
  const [newPChainAddress, setNewPChainAddress] = useState('');
  const [newWeight, setNewWeight] = useState('');
  const [newBalance, setNewBalance] = useState('0.1');
  
  // State for managing the validation process
  const [isAddingValidator, setIsAddingValidator] = useState(false);
  const [isProcessComplete, setIsProcessComplete] = useState(false);
  const [validationSteps, setValidationSteps] = useState<ValidationSteps>({
    initializeRegistration: { status: 'pending' },
    signMessage: { status: 'pending' },
    registerOnPChain: { status: 'pending' },
    waitForPChain: { status: 'pending' },
    finalizeRegistration: { status: 'pending' },
  });

  // State for temp account and warp messages
  const [registerL1ValidatorUnsignedWarpMsg, setRegisterL1ValidatorUnsignedWarpMsg] = useState('');
  const [validationID, setValidationID] = useState('');
  const [savedSignedMessage, setSavedSignedMessage] = useState('');
  const [savedPChainWarpMsg, setSavedPChainWarpMsg] = useState('');
  const [savedPChainResponse, setSavedPChainResponse] = useState<string>('');
  const [networkName, setNetworkName] = useState<"fuji" | "mainnet" | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

// Get P-Chain address if available
  useEffect(() => { 
    const pChainAddr = getPChainAddress();
    if (pChainAddr && (!newPChainAddress || newPChainAddress === '')) {
      setNewPChainAddress(pChainAddr);
    }
  }, []);

  const pChainChainID = "11111111111111111111111111111111LpoYY";
  var platformEndpoint = "https://api.avax-test.network";
  useEffect(() => {
    if (networkID === networkIDs.MainnetID) {
      platformEndpoint = "https://api.avax.network";
      setNetworkName("mainnet");
    } else if (networkID === networkIDs.FujiID) {
      platformEndpoint = "https://api.avax-test.network";
      setNetworkName("fuji");
    } else {
      showBoundary(new Error("Unsupported network with ID " + networkID));
    }
  }, [networkID]);
  const pvmApi = new pvm.PVMApi(platformEndpoint);

  // Update step status helper
  const updateStepStatus = (
    step: keyof ValidationSteps,
    status: StepStatus['status'],
    error?: string
  ) => {
    setValidationSteps(prev => ({
      ...prev,
      [step]: { status, error }
    }));
  };

  // Reset the validation process
  const resetValidation = () => {
    setIsAddingValidator(false);
    setIsProcessComplete(false);
    Object.keys(validationSteps).forEach(step => {
      updateStepStatus(step as keyof ValidationSteps, 'pending');
    });
  };

  // Handle retry of a specific step
  const retryStep = async (step: keyof ValidationSteps) => {
    // Reset status of current step and all following steps
    const steps = Object.keys(validationSteps) as Array<keyof ValidationSteps>;
    const stepIndex = steps.indexOf(step);

    // Only reset the statuses from the failed step onwards
    steps.slice(stepIndex).forEach(currentStep => {
      updateStepStatus(currentStep, 'pending');
    });

    // Start the validation process from the failed step
    await addValidator(step);

    // If the retried step succeeds, continue with the next steps
    const nextStepIndex = stepIndex + 1;
    if (nextStepIndex < steps.length && validationSteps[step].status === 'success') {
      await addValidator(steps[nextStepIndex]);
    }
  };

  // Main function to add a validator
  const addValidator = async (startFromStep?: keyof ValidationSteps) => {
    if (!newNodeID || !newBlsPublicKey || !newBlsProofOfPossession || !newPChainAddress || !newWeight || !proxyAddress) {
      setError('Please fill all required fields to continue');
      return;
    }

    setError(null);

    // Only reset steps and validation state if starting fresh
    if (!startFromStep) {
      setIsAddingValidator(true);
      setIsProcessComplete(false);
      Object.keys(validationSteps).forEach(step => {
        updateStepStatus(step as keyof ValidationSteps, 'pending');
      });
    }

    try {
      // Create wallet client using Core wallet
      const walletClient = createWalletClient({
        transport: custom(window.avalanche!),
      });

      const publicClient = createPublicClient({
        transport: custom(window.avalanche!),
      });

      const [account] = await walletClient.requestAddresses();

      // Step 1: Initialize Registration
      if (!startFromStep || startFromStep === 'initializeRegistration') {
        updateStepStatus('initializeRegistration', 'loading');
        try {
          // Process P-Chain Address
          const pChainAddressBytes = utils.bech32ToBytes(newPChainAddress);
          const pChainAddressHex = fromBytes(pChainAddressBytes, 'hex');
          const expiry = BigInt(Math.floor(Date.now() / 1000) + 43200); // 12 hours

          // Build arguments for `initializeValidatorRegistration`
          const args = [
            {
              nodeID: parseNodeID(newNodeID),
              blsPublicKey: newBlsPublicKey,
              registrationExpiry: expiry,
              remainingBalanceOwner: {
                threshold: 1,
                addresses: [pChainAddressHex]
              },
              disableOwner: {
                threshold: 1,
                addresses: [pChainAddressHex]
              }
            },
            BigInt(newWeight),
          ];

          // Submit transaction
          const hash = await walletClient.writeContract({
            address: proxyAddress as `0x${string}`,
            abi: validatorManagerAbi.abi,
            functionName: 'initiateValidatorRegistration',
            args,
            account,
            chain: {
              id: walletChainId,
              name: evmChainName,
              rpcUrls: {
                default: { http: [evmChainRpcUrl] },
              },
              nativeCurrency: {
                name: evmChainCoinName,
                symbol: evmChainCoinName,
                decimals: 18,
              },
            },
          });

          // Get receipt to extract warp message and validation ID
          const receipt = await publicClient.waitForTransactionReceipt({ hash });
          const unsignedWarpMsg = receipt.logs[0].data ?? '';
          const validationIdHex = receipt.logs[1].topics[1] ?? '';

          // Save to state
          setRegisterL1ValidatorUnsignedWarpMsg(unsignedWarpMsg);
          setValidationID(validationIdHex);

          updateStepStatus('initializeRegistration', 'success');
        } catch (error: any) {
          updateStepStatus('initializeRegistration', 'error', error.message);
          showBoundary(error);
          return;
        }
      }

      // Step 2: Sign Message
      if (!startFromStep || startFromStep === 'signMessage') {
        updateStepStatus('signMessage', 'loading');
        try {
          // Use stored message if retrying
          const messageToSign = startFromStep ? registerL1ValidatorUnsignedWarpMsg : registerL1ValidatorUnsignedWarpMsg;

          // Sign the unsigned warp message with signature aggregator
          const { signedMessage } = await new AvaCloudSDK().data.signatureAggregator.aggregateSignatures({
            network: networkName,
            signatureAggregatorRequest: {
                message: messageToSign,
                signingSubnetId: subnetID,
                quorumPercentage: 67, // Default threshold for subnet validation
            },
        });

          setSavedSignedMessage(signedMessage);
          updateStepStatus('signMessage', 'success');

          if (startFromStep === 'signMessage') {
            await addValidator('registerOnPChain');
            return;
          }
        } catch (error: any) {
          updateStepStatus('signMessage', 'error', error.message);
          showBoundary(error);
          return;
        }
      }

      // Step 3: Register on P-Chain
      if (!startFromStep || startFromStep === 'registerOnPChain') {
        updateStepStatus('registerOnPChain', 'loading');
        try {
          if (!window.avalanche) throw new Error('Core wallet not found');
          
          // Use saved message if retrying
          const messageToUse = startFromStep ? savedSignedMessage : savedSignedMessage;

          // Get fee state, context and utxos from P-Chain
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

          // Submit the transaction to the P-Chain using Core Wallet
          const response = await window.avalanche.request({
            method: 'avalanche_sendTransaction',
            params: {
              transactionHex: unsignedRegisterValidatorTxHex,
              chainAlias: 'P',
            }
          }) as string;

          setSavedPChainResponse(response);
           // Wait for transaction to be confirmed
           while (true) {
            let status = await pvmApi.getTxStatus({ txID: response });
            if (status.status === "Committed") break;
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
          }
          updateStepStatus('registerOnPChain', 'success');

          if (startFromStep === 'registerOnPChain') {
            await addValidator('waitForPChain');
            return;
          }
        } catch (error: any) {
          updateStepStatus('registerOnPChain', 'error', error.message);
          showBoundary(error);
          return;
        }
      }

      // Step 4: Wait for P-Chain txn and aggregate signatures
      if (!startFromStep || startFromStep === 'waitForPChain') {
        updateStepStatus('waitForPChain', 'loading');
        try {
          // Wait for transaction to be confirmed (mocked for demo)
          await new Promise(resolve => setTimeout(resolve, 1000));

          // Create and sign P-Chain warp message
          const validationIDBytes = hexToBytes(validationID as `0x${string}`);
          const unsignedPChainWarpMsg = packL1ValidatorRegistration(validationIDBytes, true, networkID, pChainChainID);
          const unsignedPChainWarpMsgHex = bytesToHex(unsignedPChainWarpMsg);

          // Simulate waiting period
          await new Promise(resolve => setTimeout(resolve, 1000));

          // Aggregate signatures
          const signedMessage = await new AvaCloudSDK().data.signatureAggregator.aggregateSignatures({
            network: networkName,
            signatureAggregatorRequest: {
                message: unsignedPChainWarpMsgHex,
                justification: registerL1ValidatorUnsignedWarpMsg,
                signingSubnetId: subnetID,
                quorumPercentage: 67, // Default threshold for subnet validation
            },
          });

          setSavedPChainWarpMsg(signedMessage.signedMessage);
          updateStepStatus('waitForPChain', 'success');
        } catch (error: any) {
          updateStepStatus('waitForPChain', 'error', error.message);
          showBoundary(error);
          return;
        }
      }

      // Step 6: Finalize Registration
      if (!startFromStep || startFromStep === 'finalizeRegistration') {
        updateStepStatus('finalizeRegistration', 'loading');
        try {
          // Use saved message if retrying
          const warpMsgToUse = startFromStep ? savedPChainWarpMsg : savedPChainWarpMsg;

          // Convert to bytes and pack into access list
          const signedPChainWarpMsgBytes = hexToBytes(`0x${warpMsgToUse}`);
          const accessList = packWarpIntoAccessList(signedPChainWarpMsgBytes);

          // Submit the transaction to the EVM using Core Wallet
          const response = await walletClient.writeContract({
            address: proxyAddress as `0x${string}`,
            abi: validatorManagerAbi.abi,
            functionName: 'completeValidatorRegistration',
            args: [0],
            accessList,
            account,
            chain: {
              id: walletChainId,
              name: evmChainName,
              rpcUrls: {
                default: { http: [evmChainRpcUrl] },
              },
              nativeCurrency: {
                name: evmChainCoinName,
                symbol: evmChainCoinName,
                decimals: 18,
              },
            },
          });

          const receipt = await publicClient.waitForTransactionReceipt({ hash: response });
          console.log("Receipt: ", receipt);          
          updateStepStatus('finalizeRegistration', 'success');
        } catch (error: any) {
          updateStepStatus('finalizeRegistration', 'error', error.message);
          showBoundary(error);
          return;
        }
      }
    } catch (error: any) {
      setError(error.message);
      showBoundary(error);
    }
  };

  // Step Indicator Component
  const StepIndicator = ({
    status,
    label,
    error,
    onRetry
  }: {
    status: StepStatus['status'];
    label: string;
    error?: string;
    onRetry?: () => void;
  }) => {
    return (
      <div className="flex flex-col space-y-1 my-2">
        <div className="flex items-center space-x-2">
          {status === 'loading' && <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent" />}
          {status === 'success' && <div className="h-5 w-5 bg-green-500 rounded-full flex items-center justify-center text-white">✓</div>}
          {status === 'error' && <div className="h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-white">✗</div>}
          {status === 'pending' && <div className="h-5 w-5 rounded-full border-2 border-gray-200" />}
          
          <span className={status === 'error' ? 'text-red-600 font-medium' : 'text-gray-700'}>
            {label}
          </span>
        </div>
        
        {status === 'error' && error && (
          <div className="ml-7 p-2 bg-red-50 border-l-2 border-red-500 rounded text-sm text-red-700">
            {error}
          </div>
        )}
        
        {status === 'error' && onRetry && (
          <div className="ml-7 mt-1">
            <Button onClick={onRetry} className="text-xs bg-red-50 hover:bg-red-100 text-red-600 border border-red-200">
              Retry
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <Container
      title="Add New Validator"
      description="Add a validator to your L1 by providing the required details."
    >
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded-md text-red-700 shadow-sm">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{error}</span>
          </div>
        </div>
      )}

      <Input
        label="Your P-Chain Address"
        value={getPChainAddress()}
        disabled
      />
      
      <Input
        label="Node ID"
        value={newNodeID}
        onChange={setNewNodeID}
        placeholder="Enter validator 'NodeID-'"
        helperText={!newNodeID && error ? "Node ID is required" : undefined}
        required
      />
      
      <Input
        label="BLS Public Key"
        value={newBlsPublicKey}
        onChange={setNewBlsPublicKey}
        placeholder="Enter BLS public key"
        helperText={!newBlsPublicKey && error ? "BLS public key is required" : undefined}
        required
      />
      
      <Input
        label="BLS Proof of Possession"
        value={newBlsProofOfPossession}
        onChange={setNewBlsProofOfPossession}
        placeholder="Enter BLS proof of possession"
        helperText={!newBlsProofOfPossession && error ? "BLS proof of possession is required" : undefined}
        required
      />
      
      <Input
        label="Initial Balance (AVAX)"
        value={newBalance}
        onChange={setNewBalance}
        placeholder="Enter initial balance"
        helperText="Initial 'Pay As You Go' Balance (1.33 AVAX/month/validator)"
        required
      />
      
      <Input
        label="Weight"
        value={newWeight}
        onChange={setNewWeight}
        placeholder="Enter validator weight"
        helperText={!newWeight && error ? "Weight is required" : "Weight in consensus"}
        required
      />
      
      {!isAddingValidator && (
        <Button 
          onClick={() => addValidator()}
          disabled={!proxyAddress}
          loading={isAddingValidator}
          loadingText="Adding Validator..."
        >
          {!proxyAddress ? "Set Proxy Address First" : "Add Validator"}
        </Button>
      )}

      {isAddingValidator && (
        <div className="space-y-2 mt-4 border border-gray-200 rounded-md p-4 bg-gray-50">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-gray-900">Validation Progress</h3>
            {isProcessComplete && (
              <Button onClick={resetValidation} className="text-sm">
                Start New Validation
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
            label="Aggregate Signatures for Warp Message"
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
            label="Wait for P-Chain Confirmation"
            error={validationSteps.waitForPChain.error}
            onRetry={() => retryStep('waitForPChain')}
          />
        
          
          <StepIndicator
            status={validationSteps.finalizeRegistration.status}
            label="Finalize Validator Registration"
            error={validationSteps.finalizeRegistration.error}
            onRetry={() => retryStep('finalizeRegistration')}
          />
          
          {!isProcessComplete && (
            <Button 
              onClick={resetValidation}
              className="mt-4 w-full"
            >
              Cancel Validation
            </Button>
          )}
        </div>
      )}
      
      {isProcessComplete && (
        <div className="flex items-center mt-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-800">
          <div className="flex-shrink-0 h-5 w-5 bg-green-500 rounded-full flex items-center justify-center text-white mr-2">✓</div>
          <div>
            <p className="font-medium">Validator Added Successfully</p>
            <p className="text-sm text-green-700">The validator has been registered on the network</p>
          </div>
        </div>
      )}
    </Container>
  );
}
