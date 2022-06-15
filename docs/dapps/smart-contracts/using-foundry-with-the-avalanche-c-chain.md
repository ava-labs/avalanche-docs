# Using Foundry with the Avalanche C Chain

## Introduction

This article shows how to deploy and interact with smart contracts using foundry on the [Fuji C-Chain](../../quickstart/fuji-workflow.md).

[Foundry](https://book.getfoundry.sh/) is a smart contract development toolchain written in Rust.

Foundry manages your dependencies, compiles your project, runs tests, deploys, and lets you interact with the chain from the command-line.

## Prerequisites

- You have installed [foundry](https://book.getfoundry.sh/getting-started/installation.html) so that you can follow examples in this tutorial.
- You have installed and are familiar with [Avalanche-Cli](../../subnets/create-a-local-subnet.md)

## Getting Started

This section will walk you through creating an ERC721 with Foundry and [Avalanche Smart Contract Quickstart](https://github.com/ava-labs/avalanche-smart-contract-quickstart).

Clone the Avalanche Smart Contract Quickstart repo and install its dependencies by running:

```zsh
git clone https://github.com/ava-labs/avalanche-smart-contract-quickstart.git
cd avalanche-smart-contract-quickstart
yarn
```

In order to deploy contracts, you need to have some AVAX. You can use a pre-funded account on a local network or get testnet AVAX from the [Avalanche Faucet](https://faucet.avax.network), which is an easy way to get to play around with Avalanche. After getting comfortable with your code, you can run it on Mainnet after making the necessary changes to your workflow.

## Implement a Game Item NFT

We will use our example ERC721 smart contract, [`NFT.sol`](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/3fbba0ac28f6420e9be5d2635d5f23693f80127a/contracts/NFT.sol) found in `lib/avalanche-smart-contract-quickstart/contracts` of your foundry project.

```ts
//SPDX-License-Identifier: MIT
// contracts/ERC721.sol

pragma solidity >=0.6.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721 {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  constructor() ERC721("GameItem", "ITM") {}

  // commented out unused variable
  // function awardItem(address player, string memory tokenURI)
  function awardItem(address player)
    public
    returns (uint256)
  {
    _tokenIds.increment();

    uint256 newItemId = _tokenIds.current();
    _mint(player, newItemId);
    // _setTokenURI(newItemId, tokenURI);

    return newItemId;
  }
}
```

Let's examine this implementation of an NFT as a Game Item. We start by importing to contracts from our git submodules. We import Openzeppelin's open source implementation of the ERC721 standard which our NFT contract will inherit from. Our constructor takes the `_name` and `_symbol` arguments for our NFT and passes them on to the constructor of the parent ERC721 implementation. Lastly we implement the `awardItem` function which allows anyone to mint an NFT to a players wallet address. This function increments the `currentTokenId` and makes use of the `_mint` function of our parent contract.

# Compile & deploy with forge

To compile the NFT contract run:

 ```zsh
 forge build
 ``` 
 
 By default the compiler output will be in the `out` directory. To deploy our compiled contract with Forge we have to set environment variables for the RPC endpoint and the private key we want to use to deploy.

Set your environment variables by running:

```zsh
export RPC_URL=<YOUR-RPC-ENDPOINT>
export PRIVATE_KEY=<YOUR-PRIVATE-KEY>
```

Since we are deploying on Fuji our `RPC_URL` export should be:

```zsh
export RPC_URL=https://api.avax-test.network/ext/bc/C/rpc
```

Once set, you can deploy your NFT with Forge by running the below command while adding the relevant constructor arguments of the NFT contract:

```zsh
forge create NFT --rpc-url=$RPC_URL --private-key=$PRIVATE_KEY --constructor-args <name> <symbol> 
```

If successfully deployed, you will see the deploying wallet's address, the contract's address as well as the transaction hash printed to your terminal.

Here's an example output from an NFT deployment.

```zsh
[⠔] Compiling...
No files changed, compilation skipped
Deployer: 0x8db97c7cece249c2b98bdc0226cc4c2a57bf52fc
Deployed to: 0x52c84043cd9c865236f11d9fc9f56aa003c1f922
Transaction hash: 0xf35c40dbbdc9e4298698ad1cb9937195e5a5e74e557bab1970a5dfd42a32f533
```

# Using Cast to Interact with the Smart Contract
We can call functions on our NFT contract with Cast, Foundry's command-line tool for interacting with smart contracts, sending transactions, and getting chain data. In this scenario, we will mint a Game Item to a player's wallet using the [`awardItem` function](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/0f29cbb6375a1a452579213f688609c880d52c01/contracts/NFT.sol#L17) in our smart contract.

Given that you already set your RPC and private key env variables during deployment, mint an NFT from your contract by running:

```zsh
cast send --rpc-url=$RPC_URL <contractAddress>  "awardItem(address)" <arg> --private-key=$PRIVATE_KEY
```

Upon success, the command line will display the [transaction data](https://testnet.snowtrace.io/tx/0x4651ae041a481a6eeb852e5300e9be48e66a1d2332733df22d8e75cf460b0c2c).
```zsh
blockHash               0x1d9b0364fe002eeddd0e32be0c27d6797c63dffb51fe555ea446357759e6a6f8
blockNumber             10714448
contractAddress         
cumulativeGasUsed       90837
effectiveGasPrice       28000000000
gasUsed                 90837
logs                    [{"address":"0x45857b942723fff8ee7acd2b1d6515d9965c16e5","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x0000000000000000000000000000000000000000000000000000000000000000","0x000000000000000000000000845095a03a6686e24b90fed55e11f4ec808b1ab3","0x0000000000000000000000000000000000000000000000000000000000000001"],"data":"0x","blockHash":"0x1d9b0364fe002eeddd0e32be0c27d6797c63dffb51fe555ea446357759e6a6f8","blockNumber":"0xa37d50","transactionHash":"0x4651ae041a481a6eeb852e5300e9be48e66a1d2332733df22d8e75cf460b0c2c","transactionIndex":"0x0","logIndex":"0x0","removed":false}]
logsBloom               0x00000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000040000000000000000000000000008010000000000000000040000000000000000000000000000020000040000000000000800000000002000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000060080000000000000000000000000000000000000000000000000000000000000000
root                    
status                  1
transactionHash         0x4651ae041a481a6eeb852e5300e9be48e66a1d2332733df22d8e75cf460b0c2c
transactionIndex        0
type                    2
```


Well done! You just minted your first NFT from your contract. You can sanity check the owner of the NFT with currentTokenId equal to 1 by running the below cast call command. 

```zsh
cast call --rpc-url=$RPC_URL --private-key=$PRIVATE_KEY <contractAddress> "ownerOf(uint256)" 1
```

The address you provided above should be returned as the owner.
```zsh
0x000000000000000000000000845095a03a6686e24b90fed55e11f4ec808b1ab3
```

## Mainnet Workflow

The Fuji workflow above can be adapted to Mainnet with the following modifications to the environment variables:

```zsh
export RPC_URL=https://api.avax.network/ext/bc/C/rpc
export PRIVATE_KEY=<YOUR-PRIVATE-KEY>
```

## Local Workflow

Support for local networks is in development.