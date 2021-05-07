# Port your Ethereum Dapp to Avalanche

## Overview

The purpose of this document is to help you with porting your existing dapp over to Avalanche. It contains a series of resources designed to help you get the basics of Avalanche Platform and how it works, show how to connect to the network, how to use your existing tools and environments in developing and deploying on Avalanche, as well as some common pitfalls you need to consider when running your dapp on Avalanche.

## Platform basics

Avalanche is a [network of networks](../../../learn/platform-overview/README.md). It means that it is not a single chain running a single, uniform type of blocks. It contains multiple subnets, each running one of more heterogenous chains. But, to run an Ethereum dapp on a low-fee, fast network with instant finality, we don't need to concern ourselves with that right now. Using the link above you can find out more if you wish, but all you need to know right now is that one of the chains running on Avalanche Primary Network is the C-Chain (contract chain).

C-Chain runs a fork of [go-ethereum](https://geth.ethereum.org/docs/rpc/server)\) called [coreth](https://github.com/ava-labs/coreth) that has the networking and consensus portions replaced with Avalanche equivalents. What's left is the Solidity VM, which runs the smart contracts and manages data structures and blocks on the chain. As a result you get a blockchain that can run all the Solidity smart contracts from Ethereum, but with much greater transaction bandwidth and instant finality that [Avalanche's revolutionary consensus](../../../learn/platform-overview/avalanche-consensus.md) enables.

Coreth is loaded as a plugin into [AvalancheGo](https://github.com/ava-labs/avalancheg), the client node application used to run Avalanche network.

As far as your dapp is concerned, it will be running the same as on Ethereum, just quicker and cheaper. Let's find out how.

## Accessing Avalanche C-Chain

C-Chain exposes the [same API](../../avalanchego-apis/contract-chain-c-chain-api.md) as go-ethereum, so you can use all the familiar APIs that are available on Ethereum for interaction with the platform.

There are multiple ways of working with the C-Chain.

### Through MetaMask

You can access C-Chain through MetaMask, by defining a custom network. Go to MetaMask, log in, click the network dropdown, and select 'Custom RPC'. Data for Avalanche is as follows.  

#### **Avalanche Mainnet Settings:**

* **Network Name**: Avalanche Mainnet C-Chain
* **New RPC URL**: [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
* **ChainID**: `0xa86a`
* **Symbol**: `AVAX`
* **Explorer**: [https://cchain.explorer.avax.network/](https://cchain.explorer.avax.network/)

#### **FUJI Testnet Settings:**

* **Network Name**: Avalanche FUJI C-Chain
* **New RPC URL**: [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
* **ChainID**: `0xa869`
* **Symbol**: `AVAX`
* **Explorer**: [https://cchain.explorer.avax-test.network](https://cchain.explorer.avax-test.network/)

In your application's web interface, you can [add Avalanche programmatically](../smart-contracts/add-avalanche-to-metamask-programmatically.md) so your users don't have to enter the network data manually. To see the adding custom network flow in action, check out [Pangolin DEX](https://app.pangolin.exchange/).

### Using the public API nodes

Instead of proxying network operations through MetaMask, you can use the public API, which consists of a number of load-balanced AvalancheGo nodes behind a load balancer.

The C-Chain API endpoint is [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc) for the main net and [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc) for the testnet.

### Running your own node

If you don't want for your dapp to depend on a centralized service you don't control, you can run your own node and access the network that way.

For development purposes, [here](../nodes-and-staking/run-avalanche-node.md) is a tutorial for downloading, building and installation of AvalancheGo. If you're going to run a production node on a Linux machine, [here](../nodes-and-staking/set-up-node-with-installer.md) is a tutorial that shows how to use the installer script to quickly and easily install the node as a systemd service. Script also handles node upgrading. If you want to run a node in a docker container, there are [build scripts](https://github.com/ava-labs/avalanchego/tree/master/scripts) in the AvalancheGo repo for various Docker configs.

### Running a local test network

If you need a private test network to test your dapp, [Avash](https://github.com/ava-labs/avash) is a shell client for launching local Avalanche networks, similar to Ganache on Ethereum.

Avash uses Lua as a scripting language for orchestrating local networks. You can find a tutorial for Avash [here](../../tools/avash.md).

## Developing and deploying contracts

Being an Ethereum-compatible blockchain, all of the usual Ethereum developer tools and environments can be used to develop and deploy dapps for Avalanche's C-Chain. 

### Remix

[Here](../smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md) is a tutorial for using Remix to deploy smart contracts on Avalanche. It relies on MetaMask for access to Avalanche network.

### Truffle

You can also use Truffle to test and deploy smart contracts on Avalanche. Find out how in [this](../smart-contracts/using-truffle-with-the-avalanche-c-chain.md) tutorial.

### Hardhat

Hardhat is the newest development and testing environment for Solidity smart contracts, and the one our developers use the most. Due to its superb testing support, it is the recommended way of developing for Avalanche.

[Here](https://github.com/ava-labs/avalanche-smart-contract-quickstart) is a quickstart repository that our developers use to start new projects.

## Avalanche Explorer

Essential part of the smart contract development environment is the explorer, that indexes and serves blockchain data. Main net C-Chain explorer is available at [https://cchain.explorer.avax.network/](https://cchain.explorer.avax.network/) and test net explorer at [https://cchain.explorer.avax-test.network](https://cchain.explorer.avax-test.network/). Besides the web interface, it also exposes the standard [Ethereum JSON RPC API](https://eth.wiki/json-rpc/API).

## Avalanche Faucet

For development purposes, you will need test tokens. Avalanche has a [Faucet](https://faucet.avax-test.network/) that drips tet tokens to address of your choice. Paste your C-Chain address there.

If you need, you can also run a faucet locally, but building it from the [repository](https://github.com/ava-labs/avalanche-faucet).

## Gotchas and things to look out for

Avalanche Platform's C-Chain is EVM-compatible, but it is not identical. There are some differences you need to be aware of, otherwise you may create subtle bugs or inconsistencies in how you dapps behave.

Here are the main differences you should be aware of.

### Measuring time

It is customary on Ethereum to use block height progress as a proxy for time. You should not do that on Avalanche. Chains on Avalanche are quiescent, meaning that if there is no activity, there are no blocks produced. The opposite is also true, if there is great amount of activity, blocks are produced very fast. Because of that, you should not measure the passage of time by the amount of blocks that are produced. You both get inaccurate results, and be oen to manipulation by third parties.

Instead of block rate, you should measure time simply by reading the timestamp attribute of the produced blocks. Timestamps are guaranteed to be increasing, and to be within 30s of the real time.

### Finality

On Ethereum, blockchain can be reogranized and blocks can be orphaned, so you cannot rely on the fact that a block has been accepted until it is several blocks further from the tip (usually, it is presumed that blocks 6 places deep are safe). That is not the case on Avalanche. Blocks are either accepted or rejected within a second or two. And once the block has been accepted, it is final, and cannot be replaced, dropped or modified. So the concept of 'number of confirmations' on Avalanche is not used. As soon as a block is accepted and available in the explorer, it is final. 

### Gas price

Gas on Avalanche is burned. Validators don't keep the gas for themselves (they get reward for staking), so the dynamics of 'gas wars' where higher priced transactions are included first is non-existent. Therefore, there is never a need to put a higher gas price on your transactions. You'll only be burning gas in vain.

### Coreth configuration

By default, coreth is configured in a way that is optimal for publicly running nodes used as validators. For development or dapps, you may want to change some defaults to settings more appropriate for your usage. This is done through node's command line options. Command line options for coreth are listed [here](../../references/command-line-interface.md#c-chain--coreth), along with their default values.

You can supply options on the command line, or use the config file, which can be easier to work with when a lot of custom options are configured. Use `—config-file=config.json` option, and then provide complete configuration in the `config.json` file, for example:

```javascript
{
  "coreth-config": {
    "snowman-api-enabled": false,
    "coreth-admin-api-enabled": false,
    "net-api-enabled": true,
    "eth-api-enabled": true,
    "personal-api-enabled": false,
    "tx-pool-api-enabled": true,
    "debug-api-enabled": true,
    "web3-api-enabled": true,
    "local-txs-enabled": true
  }
}
```

## Support

Using this tutorial you should be able to quickly get up to speed on Avalanche, deploy and test your dapps. If you have questions, problems, or just want to chat with us, you can reach us on our public [Discord](https://chat.avalabs.org/) server. We'd love to hear from you and find out what you're building on Avalanche!
