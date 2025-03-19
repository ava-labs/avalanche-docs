"use client";

import { useExampleStore } from "../../utils/store";
import { useErrorBoundary } from "react-error-boundary";
import { useState, useEffect } from "react";
import { Button, Input, Select, Success } from "../../ui";
import { Note } from "../../ui/Note";
import { networkIDs } from "@avalabs/avalanchejs";
import { InfoIcon } from "lucide-react";

interface SubnetDetails {
  createBlockTimestamp: number;
  createBlockIndex: string;
  subnetId: string;
  ownerAddresses: string[];
  threshold: number;
  locktime: number;
  subnetOwnershipInfo: {
    locktime: number;
    threshold: number;
    addresses: string[];
  };
  isL1: boolean;
  l1ConversionTransactionHash?: string;
  l1ValidatorManagerDetails?: {
    blockchainId: string;
    contractAddress: string;
  };
  blockchains: {
    blockchainId: string;
  }[];
}

export default function SubnetDetails() {
  const { showBoundary } = useErrorBoundary();
  const { subnetID, setSubnetID, networkID, setNetworkID } = useExampleStore();
  const [subnetDetails, setSubnetDetails] = useState<SubnetDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Network names for display
  const networkNames: Record<number, string> = {
    [networkIDs.MainnetID]: "mainnet",
    [networkIDs.FujiID]: "fuji",
  };

  useEffect(() => {
    if (subnetID) {
      fetchSubnetDetails();
    }
  }, [subnetID, networkID]);

  async function fetchSubnetDetails() {
    if (!subnetID) {
      setError("Please enter a subnet ID");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const network = networkNames[networkID];
      if (!network) {
        throw new Error("Invalid network selected");
      }

      const response = await fetch(
        `https://glacier-api.avax.network/v1/networks/${network}/subnets/${subnetID}`
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      setSubnetDetails(data);
    } catch (error: any) {
      setError(error.message || "Failed to fetch subnet details");
      setSubnetDetails(null);
      console.error("Error fetching subnet details:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function formatTimestamp(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleString();
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
        <h2 className="text-xl font-bold mb-4">Subnet Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            label="Subnet ID"
            value={subnetID}
            onChange={setSubnetID}
            placeholder="Enter subnet ID"
            error={error}
          />

          <Select
            label="Network"
            value={networkID}
            onChange={(value) => setNetworkID(Number(value))}
            options={[
              { value: networkIDs.FujiID, label: "Fuji" },
              { value: networkIDs.MainnetID, label: "Mainnet" },
            ]}
          />
        </div>

        <Button
          type="primary"
          onClick={fetchSubnetDetails}
          loading={isLoading}
          disabled={!subnetID || isLoading}
          className="w-full md:w-auto"
        >
          Fetch Subnet Details
        </Button>
      </div>

      {subnetDetails && (
        <div className="space-y-6">
          <Success
            label="Subnet ID"
            value={subnetDetails.subnetId}
          />
          
          <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center mb-4">
              <h3 className="text-lg font-bold">Subnet Information</h3>
              <div className="ml-2 flex items-center text-neutral-500" title="General information about this subnet">
                <InfoIcon size={16} />
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Basic Information Card */}
              <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-lg">
                <h4 className="text-sm font-semibold mb-3 text-neutral-700 dark:text-neutral-300">Creation Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-neutral-500 mb-1">Created At</p>
                    <p className="font-mono text-sm">{formatTimestamp(subnetDetails.createBlockTimestamp)}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-neutral-500 mb-1">Create Block Index</p>
                    <p className="font-mono text-sm">{subnetDetails.createBlockIndex}</p>
                  </div>
                </div>
              </div>
              
              {/* Type Information Card */}
              <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-lg">
                <h4 className="text-sm font-semibold mb-3 text-neutral-700 dark:text-neutral-300">Type</h4>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${subnetDetails.isL1 ? 'bg-green-500' : 'bg-neutral-400'}`}></div>
                  <p className="font-medium">{subnetDetails.isL1 ? "Sovereign L1" : "Subnet"}</p>
                </div>
              </div>
              
              {/* Threshold Settings Card */}
              <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-lg">
                <h4 className="text-sm font-semibold mb-3 text-neutral-700 dark:text-neutral-300">Validation Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-neutral-500 mb-1">Threshold</p>
                    <p className="font-mono text-sm">{subnetDetails.threshold}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-neutral-500 mb-1">Locktime</p>
                    <p className="font-mono text-sm">{subnetDetails.locktime}</p>
                  </div>
                </div>
              </div>
            
              {/* L1 Specific Information */}
              {subnetDetails.isL1 && (
                <div className="space-y-4">
                  {subnetDetails.l1ConversionTransactionHash && (
                    <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-lg">
                      <h4 className="text-sm font-semibold mb-3 text-neutral-700 dark:text-neutral-300">L1 Conversion</h4>
                      <p className="text-sm font-medium text-neutral-500 mb-1">Transaction Hash</p>
                      <p className="font-mono text-sm break-all">{subnetDetails.l1ConversionTransactionHash}</p>
                    </div>
                  )}
                  
                  {subnetDetails.l1ValidatorManagerDetails && (
                    <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-lg">
                      <h4 className="text-sm font-semibold mb-3 text-neutral-700 dark:text-neutral-300">Validator Manager</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-white dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700">
                          <p className="text-sm font-medium text-neutral-500 mb-1">Blockchain ID</p>
                          <p className="font-mono text-sm break-all">{subnetDetails.l1ValidatorManagerDetails.blockchainId}</p>
                        </div>
                        <div className="p-3 bg-white dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700">
                          <p className="text-sm font-medium text-neutral-500 mb-1">Contract Address</p>
                          <p className="font-mono text-sm break-all">{subnetDetails.l1ValidatorManagerDetails.contractAddress}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center mb-4">
              <h3 className="text-lg font-bold">Subnet Ownership</h3>
              <div className="ml-2 flex items-center text-neutral-500" title="Information about subnet ownership and control">
                <InfoIcon size={16} />
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Ownership Settings Card */}
              <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-lg">
                <h4 className="text-sm font-semibold mb-3 text-neutral-700 dark:text-neutral-300">Control Parameters</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-neutral-500 mb-1">Threshold</p>
                    <p className="font-mono text-sm">{subnetDetails.subnetOwnershipInfo.threshold}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500 mb-1">Locktime</p>
                    <p className="font-mono text-sm">{subnetDetails.subnetOwnershipInfo.locktime}</p>
                  </div>
                </div>
              </div>
              
              {/* Owner Addresses Card */}
              <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Owner Addresses</h4>
                  <span className="bg-neutral-200 dark:bg-neutral-700 text-xs font-medium px-2 py-1 rounded-full">
                    {subnetDetails.subnetOwnershipInfo.addresses.length}
                  </span>
                </div>
                <div className="max-h-40 overflow-y-auto border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800">
                  {subnetDetails.subnetOwnershipInfo.addresses.map((address, index) => (
                    <div key={index} className="p-2 font-mono text-sm break-all border-b border-neutral-200 dark:border-neutral-700 last:border-b-0">
                      {address}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {subnetDetails.blockchains && subnetDetails.blockchains.length > 0 && (
            <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <h3 className="text-lg font-bold">Blockchains</h3>
                  <div className="ml-2 flex items-center text-neutral-500" title="Blockchains running on this subnet">
                    <InfoIcon size={16} />
                  </div>
                </div>
                <span className="bg-neutral-200 dark:bg-neutral-700 text-xs font-medium px-2 py-1 rounded-full">
                  {subnetDetails.blockchains.length}
                </span>
              </div>
              
              <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-lg">
                <h4 className="text-sm font-semibold mb-3 text-neutral-700 dark:text-neutral-300">Chain IDs</h4>
                <div className="space-y-2">
                  {subnetDetails.blockchains.map((blockchain, index) => (
                    <div key={index} className="p-3 bg-white dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700">
                      <div className="flex items-start">
                        <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold p-1 rounded-md mr-2 min-w-[24px] text-center">
                          #{index+1}
                        </div>
                        <p className="font-mono text-sm break-all">{blockchain.blockchainId}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <Note>
            <div className="flex items-center text-neutral-500 italic">
              <InfoIcon size={14} className="mr-2" />
              Data retrieved from Glacier API
            </div>
          </Note>
        </div>
      )}
    </div>
  );
} 