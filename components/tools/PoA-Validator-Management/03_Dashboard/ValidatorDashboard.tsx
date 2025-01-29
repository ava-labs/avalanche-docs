"use client"

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, Trash2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useL1ManagerWizardStore } from '../config/store'
import { fetchSubnetId, fetchValidators } from '../../common/api/validator-info'
import AddValidator from './AddValidator'

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
    validators,
    setValidators,
  } = useL1ManagerWizardStore()
  const [isBootstrapped, setIsBootstrapped] = useState(false)

  const refreshValidators = async () => {
    try {
      const fetchedValidators = await fetchValidators(rpcUrl);
      setValidators(fetchedValidators);
      
      // Fetch subnetID from the first validator's validationID
      if (fetchedValidators.length > 0 && fetchedValidators[0].validationID) {
        const newSubnetId = await fetchSubnetId(rpcUrl, fetchedValidators[0].validationID);
        setSubnetId(newSubnetId);
      }
    } catch (error) {
      console.error('Error refreshing validators:', error);
    }
  };

  useEffect(() => {
    refreshValidators();
  }, [evmChainId]);

  const removeValidator = (id: string) => {
    // TODO: Implement remove validator functionality
  }

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
              onClick={refreshValidators}
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

      <AddValidator 
        rpcUrl={rpcUrl}
        evmChainId={evmChainId}
        transparentProxyAddress={transparentProxyAddress}
        l1Name={l1Name}
        tokenSymbol={tokenSymbol}
        poaOwnerAddress={poaOwnerAddress}
        subnetId={subnetId}
        onValidatorAdded={refreshValidators}
      />

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
