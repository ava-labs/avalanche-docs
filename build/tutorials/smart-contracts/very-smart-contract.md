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

[Libraries](https://docs.soliditylang.org/en/v0.8.4/contracts.html?highlight=libraries#libraries) can be provided, libraries must be deployed.  They need to be independently verified.   They need to be in the *Add Contract Libraries* section.

![Libraries](../../../.gitbook/assets/smart-contract-library.png)

The c-chain explorers will be able to fetch constructor arguments automatically for simple smart contracts.  More complicated contracts might require you to pass in special constructor arguments.
As described in [Caveats](#caveats) section smart contracts with complicated constructors will have validation issues.
You can try this [online abi encoder](https://abi.hashex.org/).

## Requirements

* **IMPORTANT** Contracts should be verified on testnet before being deployed to mainnet to ensure you won't have issues.
* Contracts must be flattened.
  - Includes will not work.  
* Contracts should be compile-able in [Remix](https://remix.ethereum.org).
  - A flattened contract with `pragma experimental ABIEncoderV2` (as an example) can create unusual binary and/or constructor blobs.  This might cause validation issues.
* C-chain explorers **only** validate with the [solc javascript](https://github.com/ethereum/solc-bin) and support [solidity](https://docs.soliditylang.org) contracts.

## Libraries

The compile bytecode will identify if there are are external libraries.  If you released with remix, you will also see multiple transactions created.

```json
{
  "linkReferences": {
    "contracts/Storage.sol": {
      "MathUtils": [
        {
          "length": 20,
          "start": 3203
        }
        ...
      ]
    }
  },
  "object": "....",
  ...
}
```

This requires you to add external libraries in order to veriy the code.

A library can have dependant libraries.  To verify a library the hierarchy of dependencies will need to be provided into the c-chain explorer.  It may fail if you provide more than the library plus it's dependencies.

You can also see references in the byte code in the form `__\$75f20d36....\$__`.  The keccak256 is generated from the library name.

Example [online converter](https://emn178.github.io/online-tools/keccak_256.html):
`contracts/Storage.sol:MathUtils` => `75f20d361629befd780a5bd3159f017ee0f8283bdb6da80805f83e829337fd12`

### Example

[SwapFlashLoan](https://cchain.explorer.avax-test.network/address/0x12DF75Fed4DEd309477C94cE491c67460727C0E8/contracts)

SwapFlashLoan uses swaputils and mathutils:

[SwapUtils](https://cchain.explorer.avax-test.network/address/0x6703e4660E104Af1cD70095e2FeC337dcE034dc1/contracts)

SwapUtils requires mathutils:

[MathUtils](https://cchain.explorer.avax-test.network/address/0xbA21C84E4e593CB1c6Fe6FCba340fa7795476966/contracts)


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

