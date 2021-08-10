## Prerequisites

### NodeJS and Yarn

First install the LTS of [nodejs](https://nodejs.org/en) which is `16.5.0` at the time of writing. NodeJS bundles `npm`.

Next install [yarn](https://yarnpkg.com):

```zsh
npm install -g yarn
```

## Dependencies

First clone [this](https://github.com/ava-labs/avalanche-smart-contract-quickstart) repo and download the necessary packages.

```zsh
git clone https://github.com/ava-labs/avalanche-smart-contract-quickstart.git
cd avalanche-smart-contract-quickstart
yarn
```

## Write Contracts

Edit the [`ERC20.sol`](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/contracts/ERC20.sol) contract in `contracts/`. `ERC20.sol` is an [Open Zeppelin](https://openzeppelin.com) [ERC20](https://eips.ethereum.org/EIPS/eip-20) contract. ERC20 is a popular smart contract interface for interoperability. You can also add your own contracts.

## Initialize Truffle
Install truffle

yarn 
```yarn add global truffle```

npm
```npm install -g truffle```

Run
```zsh
truffle init
```

**Do not overwrite contracts or test file folders**

you shoud see a migrations folder and truffle-config.js file populate your IDE

## Compile and Migrate

Configure your truffle-config.js file to the appropriate solidity compiler

```zsh
module.exports = {
...
   },
 
   // Configure your compilers
   compilers: {
     solc: {
        version: "^0.8.3",    // Fetch exact version from solc-bin (default: truffle's version)
       // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
       settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: false,
          runs: 200
        },
        ...
 };
```

Run

```zsh
truffle compile
```


# Verify Smart Contracts on the C-Chain Explorer

The C-Chain Explorer supports verifying smart contracts, allowing users to review it.

The Mainnet C-Chain Explorer is [here](https://cchain.explorer.avax.network/) and the Fuji Testnet Explorer is [here.](https://cchain.explorer.avax-test.network/)

If you have issues, contact us on [Discord](https://chat.avalabs.org).

## Steps

Navigate to the _Code_ tab at the Explorer page for your contract's address.

![Verify &amp; Publish](../../../.gitbook/assets/smart-contract-verify-page.png)

Click _Verify & Publish_ to enter the smart contract verification page.

![Contract Entry](../../../.gitbook/assets/smart-contract-input-page.png)

[Libraries](https://docs.soliditylang.org/en/v0.8.4/contracts.html?highlight=libraries#libraries) can be provided. If they are, they must be deployed, independently verified and in the _Add Contract Libraries_ section.

![Libraries](../../../.gitbook/assets/smart-contract-library.png)

The C-Chain Explorer can fetch constructor arguments automatically for simple smart contracts. More complicated contracts might require you to pass in special constructor arguments. Smart contracts with complicated constructors [may have validation issues](verify-smart-contracts.md#caveats). You can try this [online abi encoder](https://abi.hashex.org/).

## Requirements

* **IMPORTANT** Contracts should be verified on Testnet before being deployed to Mainnet to ensure there are no issues.
* Contracts must be flattened.
  * Includes will not work.  
* Contracts should be compile-able in [Remix](https://remix.ethereum.org).
  * A flattened contract with `pragma experimental ABIEncoderV2` \(as an example\) can create unusual binary and/or constructor blobs.  This might cause validation issues.
* The C-Chain Explorer **only** validates [solc javascript](https://github.com/ethereum/solc-bin) and only supports [Solidity](https://docs.soliditylang.org) contracts.

## Libraries

The compile bytecode will identify if there are are external libraries. If you released with Remix, you will also see multiple transactions created.

```javascript
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

A library can have dependent libraries. To verify a library, the hierarchy of dependencies will need to be provided to the C-Chain Explorer. Verification may fail if you provide more than the library plus any dependencies \(i.e. you might need to prune the Solidity code to exclude anything but the necessary classes\).

You can also see references in the byte code in the form `__$75f20d36....$__`. The keccak256 hash is generated from the library name.

Example [online converter](https://emn178.github.io/online-tools/keccak_256.html): `contracts/Storage.sol:MathUtils` =&gt; `75f20d361629befd780a5bd3159f017ee0f8283bdb6da80805f83e829337fd12`

## Examples

* [SwapFlashLoan](https://cchain.explorer.avax-test.network/address/0x12DF75Fed4DEd309477C94cE491c67460727C0E8/contracts)

SwapFlashLoan uses swaputils and mathutils:

* [SwapUtils](https://cchain.explorer.avax-test.network/address/0x6703e4660E104Af1cD70095e2FeC337dcE034dc1/contracts)

SwapUtils requires mathutils:

* [MathUtils](https://cchain.explorer.avax-test.network/address/0xbA21C84E4e593CB1c6Fe6FCba340fa7795476966/contracts)

## Caveats

### SPDX License Required

An SPDX must be provided.

```javascript
// SPDX-License-Identifier: ...
```

### keccak256 Strings Processed

The C-Chain Explorer interprets all keccak256\(...\) strings, even those in comments. This can cause issues with constructor args.

```javascript
/// keccak256("1");
keccak256("2");
```

This could cause automatic constructor verification failures. If you receive errors about constructor args they can be provided in ABI hex encoded form on the contract verification page.

### Solidity Constructors

Constructors and inherited constructors can can cause problems verifying the constructor arguments.

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

