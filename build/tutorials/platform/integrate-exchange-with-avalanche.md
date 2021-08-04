# Integrate an Exchange with Avalanche C-Chain

## Overview

The objective of this document is to provide a brief overview of how to integrate with the EVM-Compatible Avalanche C-Chain. For teams that already support ETH, supporting the C-Chain is as straightforward as spinning up an Avalanche node \(which has the [same API](https://eth.wiki/json-rpc/API) as [go-ethereum](https://geth.ethereum.org/docs/rpc/server)\) and populating Avalanche’s ChainID \(43114\) when constructing transactions.

Additionally, Ava Labs maintains an implementation of the [Rosetta API](https://www.rosetta-api.org/) for the C-Chain called [avalanche-rosetta](https://github.com/ava-labs/avalanche-rosetta). You can learn more about this standardized integration path on the attached Rosetta API website.

## Integration using EVM Endpoints

### Running Avalanche node

If you want to build your node form source or include it in a docker image, reference the [AvalancheGo GitHub repository](https://github.com/ava-labs/avalanchego). To quickly get up and running, you can use the [node installation script](../nodes-and-staking/set-up-node-with-installer.md) that automates installing and updating avalanchego node as a systemd service on Linux, using prebuilt binaries.

### Configuring Avalanche node

All command line options available are described [here](../../references/command-line-interface.md), along with their default values.

You can supply options on the command line, or use the config file, which can be easier to work with when a lot of custom options are configured. Use `—config-file=config.json` option, and then provide a complete configuration in the `config.json` file.

Individual chains use separate config files, which also applies to the C-Chain, running coreth. For more details, refer to [chain config docs](../../references/command-line-interface.md#chain-configs).

Using the default installation paths, C-Chain config file should be `~/.avalanchego/configs/chains/C/config.json`. The contents can contain only the switches that are different from default, for example:

```json
{
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
```

{% hint style="warning" %}
If you need your node to have full transaction history, you need to disable C-Chain pruning that is on by default since v1.4.10. In that case, make sure you include `"pruning-enabled": false` in the C-Chain config file.
{% endhint %}

### Interacting with the C-Chain

Interacting with the C-Chain is identical to interacting with [go-ethereum](https://geth.ethereum.org/). You can find the reference material for C-Chain API [here](../../avalanchego-apis/contract-chain-c-chain-api.md).

Please note that `personal_` namespace is turned off by default. To turn it on, you need to pass the appropriate command line switch to your node, like in the above config example.

## Integration using Rosetta

[Rosetta](https://www.rosetta-api.org/) is an open-source specification and set of tools that makes integrating with different blockchain networks easier by presenting the same set of APIs for every network. The Rosetta API is made up of 2 core components, the [Data API](https://www.rosetta-api.org/docs/data_api_introduction.html) and the [Construction API](https://www.rosetta-api.org/docs/construction_api_introduction.html). Together, these APIs allow for anyone to read and write to blockchains in a standard format over a standard communication protocol. The specifications for these APIs can be found in the [rosetta-specifications](https://github.com/coinbase/rosetta-specifications) repository.

You can find the Rosetta server implementation for Avalanche C-Chain [here](https://github.com/ava-labs/avalanche-rosetta), all you need to do is install and run the server with proper configuration. It comes with a Dockerfile that packages both the server and the Avalanche client. Detailed instructions can be found in the linked repository.

## Constructing transactions

Avalanche C-Chain transactions are identical to standard EVM transactions with 2 exceptions:

* They must be signed with Avalanche’s ChainID \(43114\).
* The gas price is fixed to 225 Gwei.

For development purposes, Avalanche supports all the popular tooling for Ethereum, so developers familiar with Ethereum and Solidity can feel right at home. We have tutorials and repositories for several popular development environments:

* [MetaMask and Remix](../smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md)
* [Truffle](../smart-contracts/using-truffle-with-the-avalanche-c-chain.md)
* [Hardhat](https://github.com/ava-labs/avalanche-smart-contract-quickstart)

## Ingesting On-Chain Data

You can use any standard way of ingesting on-chain data you use for Ethereum network.

### Determining Finality

Avalanche consensus provides fast and irreversible finality with 1-2 seconds. To query the most up-to-date finalized block, query any value \(i.e. block, balance, state, etc\) with the `latest` parameter. If you query above the last finalized block \(i.e. eth\_blockNumber returns 10 and you query 11\), an error will be thrown indicating that unfinalized data cannot be queried \(as of avalanchego@v1.3.2\).

### \(Optional\) Custom Golang SDK

If you plan on extracting data from the C-Chain into your own systems using golang, we recommend using our custom [ethclient](https://github.com/ava-labs/coreth/tree/master/ethclient). The standard go-ethereum Ethereum client does not compute block hashes correctly \(when you call `block.Hash()`\) because it doesn't take into account the added `[ExtDataHash](https://github.com/ava-labs/coreth/blob/2c3cfac5f766ce5f32a2eddc43451bdb473b84f1/core/types/block.go#L98)` header field in Avalanche C-Chain blocks, which is used move AVAX between chains \(X-Chain and P-Chain\). You can read more about our multi-chain abstraction [here](../../../learn/platform-overview/) \(out of scope for a normal C-Chain integration\).

If you plan on reading JSON responses directly or use web3.js \(doesn't recompute hash received over the wire\) to extract on-chain transaction data/logs/receipts, you shouldn't have any issues!

## Support

If you have any problems or questions, reach out either directly to our developers, or on our public [Discord](https://chat.avalabs.org/) server.

