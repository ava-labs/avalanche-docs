# Restrict Access to Precompiles

The AllowList enables a precompile to enforce permissions on addresses. The AllowList is not a
contract itself, but a helper structure to provide a control mechanism for wrapping contracts. It
provides an AllowListConfig to the precompile so that it can take an initial configuration from
genesis/upgrade. 


Precompiles that are using an Allow List have two roles: Admin and Enabled. For each of these roles
a list of addresses can be defined. Enabled addresses can perform the permissioned behavior (issuing
transactions, deploying contracts, ...), but cannot modify other roles. Admin addresses have the
same right, but can also add/remove other Admin and Enabled addresses.


AllowList adds adminAddresses and enabledAddresses fields to precompile contract configurations. For
instance fee manager precompile contract configuration looks like this:

```json
{
  "feeManagerConfig": {
    "blockTimestamp": 0,
    "adminAddresses": [<list_of_addresses>],
    "enabledAddresses": [<list_of_addresses>]
  }
}
```

AllowList configuration affects only the related precompile. For instance, the admin address in
feeManagerConfig does not affect admin addresses in other activated precompiles.

## Interacting with the AllowList from Solidity

The AllowList solidity interface is defined below. AllowList is not an actual precompiled contract but just an
helper interface. It's not callable by itself. This is used by other precompiles.

```solidity
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IAllowList {
  // Set [addr] to have the admin role over the precompile
  function setAdmin(address addr) external;

  // Set [addr] to be enabled on the precompile contract.
  function setEnabled(address addr) external;

  // Set [addr] to have no role the precompile contract.
  function setNone(address addr) external;

  // Read the status of [addr].
  function readAllowList(address addr) external view returns (uint256 role);
}
```

`readAllowList(addr)` will return a `uint256` with a value of 0, 1, or 2, corresponding to the roles
`None`, `Enabled`, and `Admin` respectively.
