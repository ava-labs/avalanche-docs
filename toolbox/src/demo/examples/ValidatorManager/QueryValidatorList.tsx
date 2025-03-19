"use client";

import { useExampleStore } from "../../utils/store";
import { useErrorBoundary } from "react-error-boundary";
import { useState, useEffect } from "react";
import { Button, Input, Select, Success } from "../../ui";
import { Note } from "../../ui/Note";
import { networkIDs } from "@avalabs/avalanchejs";
import { InfoIcon, Calendar, Clock, ChevronRight, Users, Check, X, ChevronLeft } from "lucide-react";

interface Validator {
  validationId: string;
  nodeId: string;
  subnetId: string;
  weight: number;
  remainingBalance: number;
  creationTimestamp: number;
  blsCredentials?: Record<string, any>;
  remainingBalanceOwner?: {
    addresses: string[];
    threshold: number;
  };
  deactivationOwner?: {
    addresses: string[];
    threshold: number;
  };
  connected?: boolean; // Adding this for UI compatibility
}

interface L1ValidatorsResponse {
  nextPageToken?: string;
  validators: Validator[];
}

export default function QueryValidatorList() {
  const { showBoundary } = useErrorBoundary();
  const { networkID, setNetworkID, subnetID, setSubnetID } = useExampleStore();
  const [validators, setValidators] = useState<Validator[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedValidator, setSelectedValidator] = useState<Validator | null>(null);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [prevPageTokens, setPrevPageTokens] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [totalValidators, setTotalValidators] = useState(0);

  // Network names for display
  const networkNames: Record<number, string> = {
    [networkIDs.MainnetID]: "mainnet",
    [networkIDs.FujiID]: "fuji",
  };

  useEffect(() => {
    fetchValidators();
  }, [networkID, subnetID]);

  async function fetchValidators(pageToken?: string, isForwardNavigation = true) {
    setIsLoading(true);
    setError(null);
    
    // Only reset selected validator when doing a new search, not when paginating
    if (!pageToken) {
      setSelectedValidator(null);
      setPrevPageTokens([]);
      setCurrentPage(1);
    }

    try {
      const network = networkNames[networkID];
      if (!network) {
        throw new Error("Invalid network selected");
      }

      const baseUrl = `https://glacier-api.avax.network/v1/networks/${network}/l1Validators`;
      
      // Build query parameters
      const queryParams = new URLSearchParams();
      if (subnetID) {
        queryParams.append('subnetId', subnetID);
      }
      
      // Add page token if provided
      if (pageToken) {
        queryParams.append('pageToken', pageToken);
      }
      
      // Add page size
      queryParams.append('pageSize', pageSize.toString());
      
      // Construct final URL with query parameters
      const url = `${baseUrl}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data: L1ValidatorsResponse = await response.json();
      
      // Store the next page token if it exists
      setNextPageToken(data.nextPageToken || null);
      
      // Update pagination state
      if (isForwardNavigation && pageToken) {
        // When moving forward, store the previous page token
        setPrevPageTokens(prev => [...prev, pageToken]);
        setCurrentPage(prev => prev + 1);
      } else if (!isForwardNavigation && prevPageTokens.length > 0) {
        // When moving backward, remove the last token
        setPrevPageTokens(prev => prev.slice(0, -1));
        setCurrentPage(prev => prev - 1);
      }
      
      // Update validator list
      setValidators(data.validators || []);
    } catch (error: any) {
      setError(error.message || "Failed to fetch validators");
      setValidators([]);
      console.error("Error fetching validators:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleNextPage() {
    if (nextPageToken) {
      fetchValidators(nextPageToken, true);
    }
  }

  function handlePrevPage() {
    if (prevPageTokens.length > 0) {
      // Get the token for the previous page
      const prevPageToken = prevPageTokens[prevPageTokens.length - 2];
      fetchValidators(prevPageToken, false);
    } else {
      // If no previous tokens, go back to first page
      fetchValidators();
    }
  }

  function formatTimestamp(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleString();
  }

  function formatStake(stake: number): string {
    if (isNaN(stake)) return String(stake);
    
    // Format as just the number with commas, no conversion
    return stake.toLocaleString();
  }

  function formatAvaxBalance(balance: number): string {
    if (isNaN(balance)) return String(balance);
    
    // Format with commas and convert to AVAX (1 AVAX = 10^9 nAVAX)
    return (balance / 1_000_000_000).toLocaleString(undefined, { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    }) + " AVAX";
  }

  const handleViewDetails = (validator: Validator) => {
    setSelectedValidator(validator);
  };

  return (
    <div className="space-y-6">
      {/* Network Selection Card */}
      <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
        <h2 className="text-xl font-bold mb-4">L1 Validators</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Select
            label="Network"
            value={networkID}
            onChange={(value) => setNetworkID(Number(value))}
            options={[
              { value: networkIDs.FujiID, label: "Fuji" },
              { value: networkIDs.MainnetID, label: "Mainnet" },
            ]}
          />
          
          <Input
            label="Subnet ID"
            value={subnetID}
            onChange={setSubnetID}
            placeholder="Enter subnet ID (optional)"
          />
        </div>

        <Button
          type="primary"
          onClick={() => fetchValidators()}
          loading={isLoading}
          disabled={isLoading}
          className="w-full md:w-auto"
        >
          Refresh Validators
        </Button>
      </div>

      {/* Validators List Card */}
      {error ? (
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
          <p className="text-red-700 dark:text-red-400">{error}</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <h3 className="text-lg font-bold">Validator List</h3>
              <div className="ml-2 flex items-center text-neutral-500" title="Active validators in the network">
                <InfoIcon size={16} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-500">
                Page {currentPage}
              </span>
              <span className="bg-neutral-200 dark:bg-neutral-700 text-xs font-medium px-2 py-1 rounded-full">
                {validators.length}
              </span>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : validators.length > 0 ? (
            <div className="space-y-4">
              <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800">
                        <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Node ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">AVAX Balance</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Weight</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Created</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                      {validators.map((validator, index) => (
                        <tr key={index} className="hover:bg-neutral-100 dark:hover:bg-neutral-800">
                          <td className="px-4 py-3 text-sm font-mono truncate max-w-[200px]">
                            <span title={validator.nodeId}>{validator.nodeId}</span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            {formatAvaxBalance(validator.remainingBalance)}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            {formatStake(validator.weight)}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            {formatTimestamp(validator.creationTimestamp)}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <Button
                              type="secondary"
                              onClick={() => handleViewDetails(validator)}
                              className="text-xs py-1 px-2"
                            >
                              Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Pagination Controls */}
              <div className="mt-6 flex flex-col items-center">
                <div className="inline-flex shadow-sm rounded-md">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1 || isLoading}
                    className={`relative inline-flex items-center px-4 py-2 rounded-l-md border ${
                      currentPage === 1 || isLoading 
                        ? 'border-neutral-200 dark:border-neutral-700 text-neutral-400 dark:text-neutral-600 bg-neutral-50 dark:bg-neutral-800 cursor-not-allowed' 
                        : 'border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700'
                    } text-sm font-medium`}
                  >
                    <ChevronLeft size={16} className="mr-1" />
                    Prev
                  </button>
                  <div className="relative inline-flex items-center px-4 py-2 border-t border-b border-neutral-300 dark:border-neutral-600 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-sm font-medium">
                    {currentPage}
                  </div>
                  <button
                    onClick={handleNextPage}
                    disabled={!nextPageToken || isLoading}
                    className={`relative inline-flex items-center px-4 py-2 rounded-r-md border ${
                      !nextPageToken || isLoading 
                        ? 'border-neutral-200 dark:border-neutral-700 text-neutral-400 dark:text-neutral-600 bg-neutral-50 dark:bg-neutral-800 cursor-not-allowed' 
                        : 'border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700'
                    } text-sm font-medium`}
                  >
                    Next
                    <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
                
                {/* Pagination Status */}
                <div className="mt-2 text-xs text-neutral-500">
                  Page {currentPage} • {validators.length} validators {nextPageToken && "• More available"}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-neutral-500">
              <p>No validators found</p>
            </div>
          )}
        </div>
      )}

      {/* Validator Details Modal */}
      {selectedValidator && (
        <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Validator Details</h3>
            <Button type="secondary" onClick={() => setSelectedValidator(null)} className="text-xs py-1 px-2">
              Close
            </Button>
          </div>
          
          <div className="space-y-6">
            {/* Basic Information Card */}
            <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-lg">
              <h4 className="text-sm font-semibold mb-3 text-neutral-700 dark:text-neutral-300">Node Information</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-neutral-500 mb-1">Validation ID</p>
                  <p className="font-mono text-sm break-all" title={selectedValidator.validationId}>{selectedValidator.validationId}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-neutral-500 mb-1">Node ID</p>
                  <p className="font-mono text-sm break-all" title={selectedValidator.nodeId}>{selectedValidator.nodeId}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-neutral-500 mb-1">Subnet ID</p>
                  <p className="font-mono text-sm break-all" title={selectedValidator.subnetId}>{selectedValidator.subnetId}</p>
                </div>
              </div>
            </div>
            
            {/* Staking Information */}
            <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-lg">
              <h4 className="text-sm font-semibold mb-3 text-neutral-700 dark:text-neutral-300">Staking Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-neutral-500 mb-1">Weight</p>
                  <p className="font-mono text-sm">{formatStake(selectedValidator.weight)}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-neutral-500 mb-1">Remaining Balance</p>
                  <p className="font-mono text-sm">{formatAvaxBalance(selectedValidator.remainingBalance)}</p>
                </div>
              </div>
            </div>
            
            {/* Time Information */}
            <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-lg">
              <h4 className="text-sm font-semibold mb-3 text-neutral-700 dark:text-neutral-300">Time Information</h4>
              <div>
                <p className="text-sm font-medium text-neutral-500 mb-1">Creation Time</p>
                <div className="flex items-center">
                  <Calendar size={14} className="text-neutral-500 mr-2" />
                  <p className="font-mono text-sm">{formatTimestamp(selectedValidator.creationTimestamp)}</p>
                </div>
              </div>
            </div>
            
            {/* Remaining Balance Owner Information */}
            {selectedValidator.remainingBalanceOwner && (
              <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Remaining Balance Owner</h4>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm font-medium text-neutral-500 mb-1">Threshold</p>
                  <p className="font-mono text-sm">{selectedValidator.remainingBalanceOwner.threshold}</p>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-neutral-500">Addresses</p>
                    <span className="bg-neutral-200 dark:bg-neutral-700 text-xs font-medium px-2 py-1 rounded-full">
                      {selectedValidator.remainingBalanceOwner.addresses.length}
                    </span>
                  </div>
                  <div className="max-h-40 overflow-y-auto border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800">
                    {selectedValidator.remainingBalanceOwner.addresses.map((address, index) => (
                      <div key={index} className="p-2 font-mono text-sm break-all border-b border-neutral-200 dark:border-neutral-700 last:border-b-0">
                        {address}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Deactivation Owner Information */}
            {selectedValidator.deactivationOwner && (
              <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Deactivation Owner</h4>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm font-medium text-neutral-500 mb-1">Threshold</p>
                  <p className="font-mono text-sm">{selectedValidator.deactivationOwner.threshold}</p>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-neutral-500">Addresses</p>
                    <span className="bg-neutral-200 dark:bg-neutral-700 text-xs font-medium px-2 py-1 rounded-full">
                      {selectedValidator.deactivationOwner.addresses.length}
                    </span>
                  </div>
                  <div className="max-h-40 overflow-y-auto border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800">
                    {selectedValidator.deactivationOwner.addresses.map((address, index) => (
                      <div key={index} className="p-2 font-mono text-sm break-all border-b border-neutral-200 dark:border-neutral-700 last:border-b-0">
                        {address}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      <Note>
        <div className="flex items-center text-neutral-500 italic">
          <InfoIcon size={14} className="mr-2" />
          Data retrieved from Glacier API
          {validators.length > 0 && <span className="ml-1">• {validators.length} validators (Page {currentPage})</span>}
        </div>
      </Note>
    </div>
  );
}
