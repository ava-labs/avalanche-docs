"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react'
import { Address, createPublicClient, createWalletClient, custom, defineChain, http, keccak256, stringToHex } from 'viem'
import PoAValidatorManagerABI from '../contract_compiler/compiled/PoAValidatorManager.json'
import { utils } from '@avalabs/avalanchejs'
import { fromBytes } from 'viem'

interface RemoveValidatorProps {
  nodeId: string
  transparentProxyAddress: string
  poaOwnerAddress: string
  onValidatorRemoved: () => void
  evmChainId: number
  l1Name: string
  tokenSymbol: string
  rpcUrl: string,
  subnetId: string
}

export default function RemoveValidator({ 
  nodeId,
  transparentProxyAddress,
  poaOwnerAddress,
  rpcUrl,
  evmChainId,
  subnetId,
  onValidatorRemoved,
}: RemoveValidatorProps) {
  const [isRemoving, setIsRemoving] = useState(false)
  
  const noopProvider = { request: () => Promise.resolve(null) }
  const provider = typeof window !== 'undefined' ? window.ethereum! : noopProvider
  const walletClient = createWalletClient({
    transport: custom(provider),
  })

  const publicClient = createPublicClient({
    transport: http(rpcUrl)
});

  const handleRemoveValidator = async () => {
    if (!walletClient || !publicClient) return
    try {
      setIsRemoving(true)

      // Format nodeId like in AddValidator
      const nodeIDWithoutPrefix = nodeId.replace("NodeID-", "")
      const decodedID = utils.base58.decode(nodeIDWithoutPrefix)
      const nodeIDHex = fromBytes(decodedID, 'hex')
      const nodeIDHexTrimmed = nodeIDHex.slice(0, -8)

      // Get validationId from contract
      const validationId = await publicClient.readContract({
        address: transparentProxyAddress as Address,
        abi: PoAValidatorManagerABI.abi,
        functionName: 'registeredValidators',
        args: [nodeIDHexTrimmed],
      })

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
      await publicClient.waitForTransactionReceipt({ hash })

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
