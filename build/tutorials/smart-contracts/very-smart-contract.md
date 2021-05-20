# Verifying Smart Contracts

Smart contracts can be verified on the c-chain explorers allowing users of your contract to review your code.

[mainnet](https://cchain.explorer.avax.network/)

[testnet](https://cchain.explorer.avax-test.network/)

If you have issues, reach out in community channels.

## Requirements

* **IMPORTANT** Contracts should be verified on testnet before being deployed to mainnet.
* Contracts must be flattened.
  - Includes will not work.  
* Contracts must be compile-able in remix.
  - Our c-chain explorers can **only** validate with the solc JS binaries.
  - Our c-chain explorers only support **solidity** contracts.

## Caveats

### SPDX license required

An SPDX must be provided.
```javascript
// SPDX-License-Identifier: ...
```

### keccak256 strings processed

The c-chain explorers will interpret all keccak256(...) strings.  This can cause issues with constructor args.
```javascript
/// keccak256("1");
keccak256("2");
```
All kecak256 strings even if they are in comments will be parsed.
This could lead automatic constructor verification.  If you receive errors about constructor args they can be provided in ABI hex encoded form on the contract verification page.

### Solidity constructors

Constructors and inherit constructors can can cause problems verifying the constructor arguments.

example:
```javascript
abstract contract Parent {
  constructor () {
    address msgSender = ...;
    emit Something(address(0), msgSender);
  }
}
contract Main is Parent {
  constructor (
          string memory _name,
          address deposit,
          uint fee
  ) {
    ...
  }
}
```

If you receive errors about constructor args they can be provided in ABI hex encoded form on the contract verification page.

