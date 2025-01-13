"use client"

import { useCallback } from 'react'
import EthereumAddressList from './ethereum-address-list'
import { Role, AddressRoles, AddressEntry } from './types'
import { isValidEthereumAddress } from '@/components/tools/common/utils'

interface AllowlistProps {
  addresses: AddressRoles
  onUpdateAllowlist: (newAddresses: AddressRoles) => void
  precompileAction: string
}

export default function Allowlist({
  addresses,
  onUpdateAllowlist,
  precompileAction
}: AllowlistProps) {
  const isAddressInvalid = useCallback((address: string, currentRole: Role): string | undefined => {
    if (!isValidEthereumAddress(address)) {
      return 'Invalid Ethereum address format'
    }

    const roles: Role[] = ['Admin', 'Manager', 'Enabled']
    for (const role of roles) {
      const duplicateEntry = addresses[role].find(entry => entry.address.toLowerCase() === address.toLowerCase())
      if (duplicateEntry) {
        return 'Duplicate address'
      }
    }

    return undefined
  }, [addresses])

  const addAddresses = useCallback((role: Role, newAddresses: string[]) => {
    const newEntries = newAddresses.map(addr => ({
      id: Math.random().toString(36).substr(2, 9),
      address: addr,
      error: isAddressInvalid(addr, role)
    }))

    const updatedAddresses = {
      ...addresses,
      [role]: [
        ...addresses[role],
        ...newEntries
      ]
    }

    onUpdateAllowlist(updatedAddresses)
  }, [addresses, isAddressInvalid, onUpdateAllowlist])

  const deleteAddress = useCallback((role: Role, id: string) => {
    const updatedAddresses = { ...addresses }
    updatedAddresses[role] = updatedAddresses[role].filter(entry => {
      // Keep the entry if it's not the one we're deleting or if it has a requiredReason
      return entry.id !== id || entry.requiredReason
    })

    onUpdateAllowlist(updatedAddresses)
  }, [addresses, onUpdateAllowlist])

  return (
    <div className="space-y-2">
      {(['Admin', 'Manager', 'Enabled'] as Role[]).map(role => (
        <EthereumAddressList
          key={role}
          role={role}
          addresses={addresses[role]}
          onAddAddresses={(newAddresses) => addAddresses(role, newAddresses)}
          onDeleteAddress={(id) => deleteAddress(role, id)}
          isAddressInvalid={(address) => isAddressInvalid(address, role)}
          precompileAction={precompileAction}
        />
      ))}
    </div>
  )
}

