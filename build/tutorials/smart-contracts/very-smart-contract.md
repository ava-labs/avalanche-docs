# Verifying Smart Contracts

Smart contracts can be verified on the c-chain explorers allowing users of your contract to review.

[mainnet explorer](https://cchain.explorer.avax.network/)

[testnet explorer](https://cchain.explorer.avax-test.network/)

If you have issues, reach out in community channels.

## Steps

Navigate to the *Code* tab on your contracts' address.

![Verify &amp; Publish](../../../.gitbook/assets/smart-contract-verify-page.png)

Click *Verify &amp; Publish* to enter the smart contract verification page.

![Contract Entry](../../../.gitbook/assets/smart-contract-input-page.png)

[Libraries](https://docs.soliditylang.org/en/v0.8.4/contracts.html?highlight=libraries#libraries) can be provided, libraries must be deployed and verified separately.
They can be entered in the *Add Contract Libraries* section.

![Libraries](../../../.gitbook/assets/smart-contract-library.png)

The c-chain explorers will be able to fetch constructor arguments automatically for simple smart contracts.  More complicated contracts might require you to pass in special constructor arguments.
As described in [Caveats](#caveats) section smart contracts with complicated constructors will have validation issues.
You can try this [online abi encoder](https://abi.hashex.org/).


## Requirements

* **IMPORTANT** Contracts should be verified on testnet before being deployed to mainnet to ensure you won't have issues.
* Contracts must be flattened.
  - Includes will not work.  
* Contracts must be compile-able in [Remix](https://remix.ethereum.org).
  - Our c-chain explorers can **only** validate with the [solc javascript binaries](https://github.com/ethereum/solc-bin).
  - Our c-chain explorers only support [solidity](https://docs.soliditylang.org) contracts.

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

