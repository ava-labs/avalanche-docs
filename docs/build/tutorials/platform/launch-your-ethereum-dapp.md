---
description: The purpose of this document is to help you with launching your existing Ethereum dapp on Avalanche, get the basics of Avalanche Platform and how it works.
---


# Launch Your Ethereum dApp on Avalanche

## Overview

The purpose of this document is to help you with launching your existing dapp on Avalanche. It contains a series of resources designed to help you get the basics of Avalanche Platform and how it works, show how to connect to the network, how to use your existing tools and environments in developing and deploying on Avalanche, as well as some common pitfalls you need to consider when running your dapp on Avalanche.

## Platform Basics

Avalanche is a [network of networks](../../../learn/platform-overview/README.md). It means that it is not a single chain running a single, uniform type of blocks. It contains multiple subnets, each running one of more heterogeneous chains. But, to run an Ethereum dapp on a low-fee, fast network with instant finality, we don't need to concern ourselves with that right now. Using the link above you can find out more if you wish, but all you need to know right now is that one of the chains running on Avalanche Primary Network is the C-Chain (contract chain).

C-Chain runs a fork of [go-ethereum](https://geth.ethereum.org/docs/rpc/server) called [coreth](https://github.com/ava-labs/coreth) that has the networking and consensus portions replaced with Avalanche equivalents. What's left is the Ethereum VM, which runs Solidity smart contracts and manages data structures and blocks on the chain. As a result, you get a blockchain that can run all the Solidity smart contracts from Ethereum, but with much greater transaction bandwidth and instant finality that [Avalanche's revolutionary consensus](../../../learn/platform-overview/avalanche-consensus.md) enables.

Coreth is loaded as a plugin into [AvalancheGo](https://github.com/ava-labs/avalanchego), the client node application used to run Avalanche network.

As far as your dapp is concerned, it will be running the same as on Ethereum, just quicker and cheaper. Let's find out how.

## Accessing Avalanche C-Chain

C-Chain exposes the [same API](../../avalanchego-apis/c-chain.md) as go-ethereum, so you can use all the familiar APIs that are available on Ethereum for interaction with the platform.

There are multiple ways of working with the C-Chain.

### Through MetaMask

You can access C-Chain through MetaMask, by defining a custom network. Go to MetaMask, log in, click the network dropdown, and select 'Custom RPC'. Data for Avalanche is as follows.

#### **Avalanche Mainnet Settings:**

* **Network Name**: Avalanche Mainnet C-Chain
* **New RPC URL**: [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
* **ChainID**: `43114`
* **Symbol**: `AVAX`
* **Explorer**: [https://snowtrace.io/](https://snowtrace.io/)

#### **FUJI Testnet Settings:**

* **Network Name**: Avalanche FUJI C-Chain
* **New RPC URL**: [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
* **ChainID**: `43113`
* **Symbol**: `AVAX`
* **Explorer**: [https://testnet.snowtrace.io/](https://testnet.snowtrace.io/)

In your application's web interface, you can [add Avalanche programmatically](../smart-contracts/add-avalanche-to-metamask-programmatically.md) so your users don't have to enter the network data manually. To see the adding custom network flow in action, check out [Pangolin DEX](https://app.pangolin.exchange/).

### Using the Public API Nodes

Instead of proxying network operations through MetaMask, you can use the public API, which consists of a number of AvalancheGo nodes behind a load balancer.

The C-Chain API endpoint is [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc) for the mainnet and [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc) for the testnet.

For more information, see [documentation](../../tools/public-api.md).

However, public API does not expose all the APIs that are available on the node, as some of them would not make sense on a publicly accessible service, and some would present a security risk. If you need to use an API that is not available publicly, you can run your own node.  

## Running Your Own Node

If you don't want your dapp to depend on a centralized service you don't control, or have specific needs that cannot be met through the public API, you can run your own node and access the network that way. Running your own node also avoids potential issues with public API congestion and rate-limiting.

For development and experimental purposes, [here](../nodes-and-staking/run-avalanche-node.md) is a tutorial that shows how to download, build, and install AvalancheGo. Simpler solution is to use the prebuilt binary, available on [GitHub](https://github.com/ava-labs/avalanchego/releases). If you're going to run a node on a Linux machine, you can use the [installer script](../nodes-and-staking/set-up-node-with-installer.md) to install the node as a `systemd` service. Script also handles node upgrading. If you want to run a node in a docker container, there are [build scripts](https://github.com/ava-labs/avalanchego/tree/master/scripts) in the AvalancheGo repo for various Docker configs.

### Node Configuration

Node configuration options are explained [here](../../references/avalanchego-config-flags.md). But unless you have specific needs, you can mostly leave the main node config options at their default values.

On the other hand, you will most likely need to adjust C-Chain configuration to suit your intended use. You can look up complete configuration options for C-Chain [here](../../references/avalanchego-config-flags.md#c-chain-configs) as well as the default configuration. Note that only the options that are different from their default values need to be included in the config file.

By default, the C-Chain config file is located at `$HOME/.avalanchego/configs/chains/C/config.json`. We will go over how to adjust the config to cover some common use cases in the following sections.

#### Running an Archival Node

If you need Ethereum [Archive Node](https://ethereum.org/en/developers/docs/nodes-and-clients/#archive-node) functionality, you need to disable C-Chain pruning, which is enabled by default to conserve disk space. To preserve full historical state, include `"pruning-enabled": false` in the C-Chain config file.

:::note
After changing the flag to disable the database pruning, you will need to run the bootstrap process again, as the node will not backfill any already pruned and missing data.

To re-bootstrap the node, stop it, delete the database (by default stored in `~/.avalanchego/db/`) and start the node again.
:::

#### Running a Node in Debug Mode

By default, debug APIs are disabled. To enable them, you need to enable the appropriate EVM APIs in the config file by including the `eth-apis` value in your C-Chain config file to include the `public-debug`, `private-debug`, `debug-tracer`, `internal-public-debug` and `internal-private-debug` APIs.

:::note
Including the `eth-apis` in the config flag overrides the defaults, so you need to include the default APIs as well!
:::

#### Example C-Chain config file

An example C-Chain config file that includes the archival mode, enables debug APIs as well as default EVM APIs:

```json
{
    "eth-apis": [
        "public-eth",
        "public-eth-filter",
        "net",
        "web3",
        "internal-public-eth",
        "internal-public-blockchain",
        "internal-public-transaction-pool",
        "public-debug",
        "private-debug",
        "debug-tracer",
        "internal-public-debug",
        "internal-private-debug"
    ],
    "pruning-enabled": false
}
```

Default config values for the C-Chain can be seen [here](https://docs.avax.network/build/references/avalanchego-config-flags#c-chain-configs).

### Running a Local Test Network

If you need a private test network to test your dapp, [Avalanche Network Runner](https://github.com/ava-labs/avalanche-network-runner) is a shell client for launching local Avalanche networks, similar to Ganache on Ethereum.

For more information, see [documentation](../../tools/network-runner.md).

## Developing and Deploying Contracts

Being an Ethereum-compatible blockchain, all of the usual Ethereum developer tools and environments can be used to develop and deploy dapps for Avalanche's C-Chain.

### Remix

There is a [tutorial](../smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md) for using Remix to deploy smart contracts on Avalanche. It relies on MetaMask for access to the Avalanche network.


### Truffle

You can also use Truffle to test and deploy smart contracts on Avalanche. Find out how in this [tutorial](../smart-contracts/using-truffle-with-the-avalanche-c-chain.md).

### Hardhat

Hardhat is the newest development and testing environment for Solidity smart contracts, and the one our developers use the most. Due to its superb testing support, it is the recommended way of developing for Avalanche.

For more information see [this doc](../smart-contracts/using-hardhat-with-the-avalanche-c-chain.md).

## Avalanche Explorer

An essential part of the smart contract development environment is the explorer, which indexes and serves blockchain data. Mainnet C-Chain explorer is available at [https://snowtrace.io/](https://snowtrace.io/) and testnet explorer at [https://testnet.snowtrace.io/](https://testnet.snowtrace.io/). Besides the web interface, it also exposes the standard [Ethereum JSON RPC API](https://eth.wiki/json-rpc/API).

## Avalanche Faucet

For development purposes, you will need test tokens. Avalanche has a [Faucet](https://faucet.avax-test.network/) that drips test tokens to the address of your choice. Paste your C-Chain address there.

If you need, you can also run a faucet locally, but building it from the [repository](https://github.com/ava-labs/avalanche-faucet).

## Contract verification

Smart contract verification provides transparency for users interacting with smart contracts by publishing the source code, allowing everyone to attest that it really does what it claims to do. You can verify your smart contracts using the [C-Chain explorer](https://snowtrace.io/). The procedure is simple:

* navigate to your published contract address on the explorer
* on the `code` tab select `verify & publish`
* copy and paste the flattened source code and enter all the build parameters exactly as they are on the published contract
* click `verify & publish`

If successful, the `code` tab will now have a green checkmark, and your users will be able to verify the contents of your contract. This is a strong positive signal that your users can trust your contracts, and it is strongly recommended for all production contracts.

See [this](../smart-contracts/verify-smart-contracts-with-truffle-verify.md) for a detailed tutorial with Sourcify and Truffle.

## Contract security checks

Due to the nature of distributed apps, it is very hard to fix bugs once the application is deployed. Because of that, making sure your app is running correctly and securely before deployment is of great importance. Contract security reviews are done by specialized companies and services. They can be very expensive, which might be out of reach for single developers and startups. But, there are also automated services and programs that are free to use.

Most popular are:

* [Slither](https://github.com/crytic/slither), here's a [tutorial](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/)
* [MythX](https://mythx.io/)
* [Mythril](https://github.com/ConsenSys/mythril)

We highly recommend using at least one of them if professional contract security review is not possible. A more comprehensive look into secure development practices can be found [here](https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md).

## Gotchas and things to look out for

Avalanche Platform's C-Chain is EVM-compatible, but it is not identical. There are some differences you need to be aware of, otherwise, you may create subtle bugs or inconsistencies in how your dapps behave.

Here are the main differences you should be aware of.

### Measuring Time

It is customary on Ethereum to use block height progress as a proxy for time. You should not do that on Avalanche. Chains on Avalanche are quiescent, meaning that if there is no activity, there are no blocks produced. The opposite is also true, if there is a great amount of activity, blocks are produced very fast. Because of that, you should not measure the passage of time by the number of blocks that are produced. The results will not be accurate, and your contract may be manipulated by third parties.

Instead of block rate, you should measure time simply by reading the timestamp attribute of the produced blocks. Timestamps are guaranteed to be monotonically increasing and to be within 30 seconds of the real time.

### Finality

On Ethereum, the blockchain can be reorganized and blocks can be orphaned, so you cannot rely on the fact that a block has been accepted until it is several blocks further from the tip (usually, it is presumed that blocks 6 places deep are safe). That is not the case on Avalanche. Blocks are either accepted or rejected within a second or two. And once the block has been accepted, it is final, and cannot be replaced, dropped, or modified. So the concept of 'number of confirmations' on Avalanche is not used. As soon as a block is accepted and available in the explorer, it is final.

### Using `eth_newFilter` and Related Calls with the Public API

If you're using the [`eth_newFilter`](https://eth.wiki/json-rpc/API#eth_newfilter) API method on the public API server, it may not behave as you expect because the public API is actually several nodes behind a load balancer. If you make an `eth_newFilter` call, subsequent calls to [`eth_getFilterChanges`](https://eth.wiki/json-rpc/API#eth_getfilterchanges) may not end up on the same node as the first call, and you will end up with undefined results.

If you need the log filtering functionality, you should use a websocket connection, which ensures that your client is always talking to the same node behind the load balancer. Alternatively, you can use [`eth_getLogs`](https://eth.wiki/json-rpc/API#eth_getlogs), or run your own node and make API calls to it.

## Support

Using this tutorial you should be able to quickly get up to speed on Avalanche, deploy, and test your dapps. If you have questions, problems, or just want to chat with us, you can reach us on our public [Discord](https://chat.avalabs.org/) server. We'd love to hear from you and find out what you're building on Avalanche!

