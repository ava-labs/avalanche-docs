"use client"

import { useState, useCallback, useRef, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Trash2, AlertCircle, Plus, CircleHelp, Lock } from 'lucide-react'
import { AddressEntry, Role } from './types'
import { isValidEthereumAddress } from '@/components/tools/common/utils'

interface EthereumAddressListProps {
  role: Role;
  addresses: AddressEntry[];
  onAddAddresses: (newAddresses: string[]) => void;
  onDeleteAddress: (id: string) => void;
  precompileAction: string;
}

const isValidInput = (input: string): boolean => {
  const addresses = input.split(/[\s,]+/).filter(addr => addr.trim() !== '');
  return addresses.length > 0 && addresses.every(isValidEthereumAddress);
}

const getRoleDescription = (role: Role, precompileAction: string) => {
  switch (role) {
    case 'Admin':
      return `Can ${precompileAction} and have full control over the allowlist, including the ability to add or remove Admins, Managers, and Enabled addresses.`;
    case 'Manager':
      return `Can ${precompileAction}, add or remove Enabled addresses but cannot modify Admins or Managers.`;
    case 'Enabled':
      return `Can ${precompileAction} but cannot modify the allow list.`;
    default:
      return '';
  }
};

export default function EthereumAddressList({
  role,
  addresses,
  onAddAddresses,
  onDeleteAddress,
  precompileAction
}: EthereumAddressListProps) {
  const [newAddress, setNewAddress] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setNewAddress(inputValue);
    
    if (isValidInput(inputValue)) {
      const newAddresses = inputValue.split(/[\s,]+/).filter(addr => addr.trim() !== '');
      onAddAddresses(newAddresses);
      setNewAddress('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && isValidInput(newAddress)) {
      const newAddresses = newAddress.split(/[\s,]+/).filter(addr => addr.trim() !== '');
      onAddAddresses(newAddresses);
      setNewAddress('');
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div>
      <TooltipProvider>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-full" colSpan={2}>
                <div className="flex items-center">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="font-bold mr-2 flex items-center">
                        {role} Addresses 
                        <CircleHelp className="h-4 w-4 text-gray-500 ml-1 inline" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{getRoleDescription(role, precompileAction)}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {addresses.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className={`inline-flex items-center ${entry.error ? 'text-red-500' : ''}`}>
                        {entry.address}
                        {entry.error && <AlertCircle className="h-4 w-4 ml-2" />} 
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{entry.error || entry.requiredReason || 'Valid address'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  {entry.requiredReason && <Lock className="m-2 h-4 w-4 text-gray-500" />}
                  {!entry.requiredReason && (
                    <button 
                      onClick={() => onDeleteAddress(entry.id)} 
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                      aria-label="Delete address"
                    >
                      <Trash2 className="h-4 w-4 text-gray-500" />
                    </button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={2}>
                <div className="flex items-center">
                  <Plus className="h-4 w-4 text-gray-400 mr-2" />
                  <Input
                    type="text"
                    placeholder={`Add one or more addresses for ${role}`}
                    value={newAddress}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="w-full border-transparent bg-transparent shadow-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0 placeholder-gray-400"
                  />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TooltipProvider>
    </div>
  )
}

