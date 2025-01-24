"use client"

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, Plus, Trash2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useL1ManagerWizardStore } from '../config/store'
import { Address, createWalletClient, createPublicClient, http, fromBytes, bytesToHex, parseEther, defineChain, custom } from 'viem'
import validatorManagerAbi from '../contract_compiler/compiled/PoAValidatorManager.json'
import { apiHostPromise } from '@/components/tools/common/utils/config';
import { avm, pvm, evm, utils, TransferableOutput, Context, BlsSignature, secp256k1, pvmSerial, addTxSignatures } from '@avalabs/avalanchejs';
import { packRegisterL1ValidatorMessage, ValidationPeriod } from '../../common/utils/convertWarp'

declare global {
  interface Window {
    avalanche: any;
  }
}

interface Validator {
  id: string
  nodeID: string
  blsPublicKey: string
  blsProofOfPossession: string
  pChainAddress: string
  weight: string
  uptime: string
  validationID?: string
  startTimestamp?: number
  isActive?: boolean
  isL1Validator?: boolean
  isConnected?: boolean
  uptimeSeconds?: number
  uptimePercentage?: number
}

async function rpcRequest(rpcUrl: string, method: string, params: any) {
  const url = rpcUrl.replace(/\/ext\/bc\/[^/]+\/rpc/, '/ext/info');
  const response = await fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params })
  });
  const responseData = await response.json();
  if (responseData.error) {
      throw new Error(responseData.error.message);
  }
  return responseData.result;
}

async function collectPeers(rpcUrl: string) {
  try {
      let peers = [];

      const peersData = await rpcRequest(rpcUrl, "info.peers", { nodeIDs: [] });

      peers = peersData.peers;

      try {
          const [nodeIPData, nodeIDData] = await Promise.all([
              rpcRequest(rpcUrl, "info.getNodeIP", {}),
              rpcRequest(rpcUrl, "info.getNodeID", {})
          ]);

          peers.push({
              "ip": nodeIPData.ip,
              "publicIP": nodeIPData.ip,
              "nodeID": nodeIDData.nodeID,
          });

          console.log('Successfully added node to peers', peers[peers.length - 1]);
      } catch (e) {
          console.warn('Failed to get node IP or ID', e);
      }

      return peers;
  } catch (error) {
      console.error('Error collecting peers:', error);
  }
}
// Move chain config inside component to access store values
export default function LaunchValidators() {
  const { 
    rpcUrl, 
    evmChainId, 
    transparentProxyAddress, 
    l1Name, 
    tokenSymbol, 
    poaOwnerAddress, 
    subnetId,
    setSubnetId,
  } = useL1ManagerWizardStore()
  const [validators, setValidators] = useState<Validator[]>([])
  const [newNodeID, setNewNodeID] = useState('')
  const [newBlsPublicKey, setNewBlsPublicKey] = useState('')
  const [newBlsProofOfPossession, setNewBlsProofOfPossession] = useState('')
  const [newPChainAddress, setNewPChainAddress] = useState('')
  const [newWeight, setNewWeight] = useState('')
  const [isBootstrapped, setIsBootstrapped] = useState(false)
  const [selectedValidator, setSelectedValidator] = useState<Validator | null>(null);
  const [isWeightDialogOpen, setIsWeightDialogOpen] = useState(false);

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

  const noopProvider = { request: () => null }
  const provider = typeof window !== 'undefined' ? window.ethereum! : noopProvider
  const walletClient = createWalletClient({
    chain: chainConfig,
    transport: custom(provider),
  })

  const publicClient = createPublicClient({
    chain: chainConfig,
    transport: http()
  })

  const fetchSubnetId = async (validationID: string) => {
    try {
      const platformEndpoint = rpcUrl.replace(/\/ext\/bc\/[^/]+\/rpc/, '/ext/bc/P');
      console.log('platformEndpoint: ', platformEndpoint)
      console.log('validationID: ', validationID)
      const response = await fetch(platformEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "platform.getL1Validator",
          params: {
            validationID: validationID
          },
          id: 1
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data?.result?.subnetID) {
        setSubnetId(data.result.subnetID);
      }
    } catch (error) {
      console.error('Error fetching subnetID:', error);
    }
  };

  const fetchValidators = async () => {
    try {
      const rpcUrlValidators = rpcUrl.replace('/rpc', '/validators');
      const response = await fetch(rpcUrlValidators, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "validators.getCurrentValidators",
          params: {
            nodeIDs: []
          },
          id: 1
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data?.result?.validators) {
        const fetchedValidators = data.result.validators.map((validator: any) => ({
          id: validator.validationID || validator.nodeID,
          nodeID: validator.nodeID,
          blsPublicKey: validator.blsPublicKey || '',
          blsProofOfPossession: validator.blsProofOfPossession || '',
          pChainAddress: validator.pChainAddress || '',
          weight: validator.weight.toString(),
          uptime: `${validator.uptimePercentage || '100'}%`,
          validationID: validator.validationID,
          startTimestamp: validator.startTimestamp,
          isActive: validator.isActive,
          isL1Validator: validator.isL1Validator,
          isConnected: validator.isConnected,
          uptimeSeconds: validator.uptimeSeconds,
          uptimePercentage: validator.uptimePercentage
        }));
        setValidators(fetchedValidators);
        // Fetch subnetID from the first validator's validationID
        if (fetchedValidators.length > 0 && fetchedValidators[0].validationID) {
          await fetchSubnetId(fetchedValidators[0].validationID);
        }
      }
    } catch (error) {
      console.error('Error fetching validators:', error);
    }
  };

  useEffect(() => {
    fetchValidators();
  }, [evmChainId]);

  const addValidator = async () => {
    if (!newNodeID || !newBlsPublicKey || !newBlsProofOfPossession || !newPChainAddress || !newWeight || !poaOwnerAddress) {
      console.log('Missing required fields')
      return;
    };

    // todo fetch PChain address from Core extension 
    // try {
    //   window.avalanche.request({
    //     method: 'avalanche_getAccounts',
    //     params: []
    //   }).then((response: any) => {
    //     const activeAccountIndex = response.findIndex((account: any) => account.active === true);
    //     console.log('P-Chain Address: ', response[activeAccountIndex].addressPVM)
      
    //   })
    // } catch (error) {
    //   console.error('Error fetching avalanche accounts, is Core wallet installed?:', error)
    // }

    try {
      // get account
      const [account] = await walletClient.getAddresses()

      // Process NodeID
      const nodeIDWithoutPrefix = newNodeID.replace("NodeID-", "");
      const decodedID = utils.base58.decode(nodeIDWithoutPrefix)
      const nodeIDHex = fromBytes(decodedID, 'hex')
      const nodeIDHexTrimmed = nodeIDHex.slice(0, -8); //remove checksum of the node ID (last 8 characters)
  
      // Process P-Chain Address
      const pChainAddressBytes = utils.bech32ToBytes(newPChainAddress)
      const pChainAddressHex = fromBytes(pChainAddressBytes, 'hex')
      // Set expiry to 12 hours from now (43200 seconds) to ensure we're well within the 24-hour limit
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
        BigInt(newWeight), // weight as uint64
      ]
      
      const mockTx = await publicClient.simulateContract({
        abi: validatorManagerAbi.abi,
        address: transparentProxyAddress as Address,
        functionName: 'initializeValidatorRegistration',
        args,
        account,
        gas: BigInt(2500000),
        nonce: await publicClient.getTransactionCount({ address: poaOwnerAddress as Address })
      })

      console.log("mockTx: ", mockTx)

      const tx = await walletClient.writeContract({
        abi: validatorManagerAbi.abi,
        address: transparentProxyAddress as Address,
        functionName: 'initializeValidatorRegistration',
        args,
        account,
        gas: BigInt(2500000),
        nonce: await publicClient.getTransactionCount({ address: poaOwnerAddress as Address })
      })

      console.log("fuji tx: ", tx)

      // Wait for transaction receipt
      const receipt = await publicClient.waitForTransactionReceipt({ hash: tx })
      console.log('Transaction receipt:', receipt)

      const RegisterL1ValidatorUnsignedWarpMsg = receipt.logs[0].data
      if (!RegisterL1ValidatorUnsignedWarpMsg) {
        console.error('RegisterL1ValidatorUnsignedWarpMsg is undefined');
        return;
      }
      console.log('RegisterL1ValidatorUnsignedWarpMsg: ', RegisterL1ValidatorUnsignedWarpMsg)
      const validationID =receipt.logs[1].topics[1];
      if (!validationID) {
        console.error('validationID is undefined');
        return;
      }    
      console.log('validationID: ', validationID)
    
      // sign the unsigned warp msg by the validator set
      const peers = await collectPeers(rpcUrl);
      
      const signResponse = await fetch('/api/signature-aggregator', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: RegisterL1ValidatorUnsignedWarpMsg,
        })
      });

      if (!signResponse.ok) {
        const errorData = await signResponse.json();
        throw new Error(errorData.error || `HTTP error! status: ${signResponse.status}`);
      }

      const { 'signed-message': signedMessage } = await signResponse.json();

      if (!signedMessage) {
        throw new Error('No signed message received from aggregator');
      }

      console.log('signedMessage: ', signedMessage);

      const platformEndpoint = "https://api.avax-test.network" // fuji testnet
      const pvmApi = new pvm.PVMApi(platformEndpoint)    


      const feeState = await pvmApi.getFeeState();
      const { utxos } = await pvmApi.getUTXOs({ addresses: [newPChainAddress] });
      const context = await Context.getContextFromURI(platformEndpoint);

      const unsignedRegisterValidatorTx = pvm.e.newRegisterL1ValidatorTx({
          balance: BigInt(1 * 1e9), // the pay as you go balance for the validator, 1 AVAX we send here 
          blsSignature: new Uint8Array(Buffer.from(newBlsProofOfPossession.slice(2), 'hex')),
          message: new Uint8Array(Buffer.from(signedMessage, 'hex')),
          feeState,
          fromAddressesBytes: [utils.bech32ToBytes(newPChainAddress)],
          utxos,
      }, context);

      console.log('unsignedRegisterValidatorTx: ', unsignedRegisterValidatorTx)

      const unsignedRegisterValidatorTxBytes = unsignedRegisterValidatorTx.toBytes()
      const unsignedRegisterValidatorTxHex = bytesToHex(unsignedRegisterValidatorTxBytes)

      window.avalanche.request({
          method: 'avalanche_sendTransaction',
          params: {
            transactionHex: unsignedRegisterValidatorTxHex,
            chainAlias: 'P',
          }
      }).then(async (response: any) => {
        console.log('P-Chain tx from Core: ', response)
        while (true) {
          let status = await pvmApi.getTxStatus({ txID: response });
          console.log('P-Chain Status: ', status);
          if (status.status === "Committed") break;
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
  
      const pJson = await pvmApi.getTxJson({txID: response});
      console.log('P-Chain JSON: ', pJson)
      })

      const validationPeriod: ValidationPeriod = {
        subnetID: subnetId,
        nodeID: nodeIDHexTrimmed,
        blsPublicKey: newBlsPublicKey as Address,
        registrationExpiry: expiry,
        remainingBalanceOwner: {
          threshold: 1,
          addresses: [pChainAddressHex as Address]
        },
        disableOwner: {
          threshold: 1,
          addresses: [pChainAddressHex as Address]
        },
        weight: BigInt(newWeight)
      }

      const pChainChainID = '11111111111111111111111111111111LpoYY'//TODO: unhardcode

      const unsignedPChainWarpMsg = packRegisterL1ValidatorMessage(validationPeriod, 5, pChainChainID)

      console.log('unsignedPChainWarpMsg: ', unsignedPChainWarpMsg)


      const unsignedPChainWarpMsgHex = bytesToHex(unsignedPChainWarpMsg)

      console.log('unsignedPChainWarpMsgHex: ', unsignedPChainWarpMsgHex)

      const res = await fetch('/api/signature-aggregator', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: unsignedPChainWarpMsgHex,
            justification: RegisterL1ValidatorUnsignedWarpMsg,
        })
      });

      const { 'signed-message': signedPChainWarpMsg } = await res.json();

      console.log('signedPChainWarpMsg: ', signedPChainWarpMsg)

      //todo here, submit signedPChainWarpMsg to the EVM Proxy Contract
              // Update UI
        setValidators([...validators, {
          id: Date.now().toString(),
          nodeID: newNodeID,
          blsPublicKey: newBlsPublicKey,
          blsProofOfPossession: newBlsProofOfPossession,
          pChainAddress: newPChainAddress,
          weight: newWeight,
          uptime: '100%'
        }])

        // Clear form
        setNewNodeID('')
        setNewBlsPublicKey('')
        setNewBlsProofOfPossession('')
        setNewPChainAddress('')
        setNewWeight('')

      } catch (error) {
        console.error('Error adding validator:', error)
      }
    }

    const removeValidator = (id: string) => {
      setValidators(validators.filter(v => v.id !== id))
    }

    const handleChangeWeight = async (validator: Validator) => {
      console.log('Change weight for validator:', validator.nodeID);
      // TODO: Implement weight change functionality
    };

    return (
      <div className="container mx-auto p-4">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Network Status
              {validators.length >= 1 && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Stable
                </span>
              )}
            </CardTitle>
            <CardDescription>Current L1 information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              <div className="p-4 rounded-lg border bg-gray-50">
                <p className="text-sm font-medium text-gray-600">Subnet ID</p>
                <div className="flex items-center gap-2">
                  <p 
                    className="text-2xl font-mono mt-1 text-gray-900 truncate cursor-pointer hover:text-blue-600" 
                    title={subnetId}
                    onClick={() => {
                      navigator.clipboard.writeText(subnetId);
                      // Optional: Add a toast notification here
                    }}
                  >
                    {subnetId ? subnetId.slice(0, 10) + '...' : 'Loading...'}
                  </p>
                  <button 
                    className="p-1 hover:bg-gray-200 rounded"
                    onClick={() => navigator.clipboard.writeText(subnetId)}
                    title="Copy Subnet ID"
                  >
                    <svg 
                      className="w-4 h-4 text-gray-500" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" 
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-4 rounded-lg border bg-gray-50">
                <p className="text-sm font-medium text-gray-600">EVM Chain ID</p>
                <div className="flex items-center gap-2">
                  <p 
                    className="text-2xl font-mono mt-1 text-gray-900 cursor-pointer hover:text-blue-600" 
                    title={`Copy Chain ID: ${evmChainId}`}
                    onClick={() => {
                      navigator.clipboard.writeText(evmChainId.toString());
                    }}
                  >
                    {evmChainId}
                  </p>
                  <button 
                    className="p-1 hover:bg-gray-200 rounded"
                    onClick={() => navigator.clipboard.writeText(evmChainId.toString())}
                    title="Copy Chain ID"
                  >
                    <svg 
                      className="w-4 h-4 text-gray-500" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" 
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className={`p-4 rounded-lg border ${validators.length >= 1 ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                <p className="text-sm font-medium text-gray-600">Total Validators</p>
                <p className={`text-2xl font-mono mt-1 ${validators.length >= 1 ? 'text-green-600' : 'text-gray-900'}`}>
                  {validators.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Current Validators</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchValidators}
                className="gap-2"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Node ID</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead>Uptime</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {validators.map((validator) => (
                  <TableRow key={validator.id}>
                    <TableCell className="font-medium">{validator.nodeID}</TableCell>
                    <TableCell>{validator.weight}</TableCell>
                    <TableCell>{validator.uptime}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleChangeWeight(validator)}
                        >
                          Change Weight
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => removeValidator(validator.id)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Remove
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

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
                placeholder="P-Chain Address" 
                value={newPChainAddress} 
                onChange={(e) => setNewPChainAddress(e.target.value)}
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

        <Alert variant="warning" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important Requirements</AlertTitle>
          <AlertDescription>
            <ul className="list-disc list-inside mt-2">
              <li>16GB RAM (minimum 8GB)</li>
              <li>8 cores CPU (minimum 4 cores)</li>
              <li>At least 100GB of SSD storage</li>
              <li>Port 9651 must be open</li>
            </ul>
          </AlertDescription>
        </Alert>

        <div className="mt-6 flex justify-end">
          <Button 
            onClick={() => setIsBootstrapped(true)}
            disabled={validators.length === 0}
          >
            Continue
          </Button>
        </div>
      </div>
    )
  }
