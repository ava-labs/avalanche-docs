# Avalanche C-Chain Integration Guide

## Overview

The objective of this document is to provide a brief overview of how to integrate with the EVM-Compatible Avalanche C-Chain. For teams that already support ETH, supporting the C-Chain is as straightforward as spinning up an Avalanche node (which has the [same API](https://eth.wiki/json-rpc/API) as [go-ethereum](https://geth.ethereum.org/docs/rpc/server)) and populating Avalanche’s ChainID (43114) when constructing transactions.

### Running Avalanche node

If you want to build your node form source or include it in a docker image, reference the [AvalancheGo GitHub repository](https://github.com/ava-labs/avalanchego). To quickly get up and running, you can use the [node installation script](../nodes-and-staking/set-up-node-with-installer.md) that automates installing and updating avalanchego node as a systemd service on Linux, using prebuilt binaries.

### Configuring Avalanche node

All command line options available are described [here](../../references/command-line-interface.md), along with their default values.

You can supply options on the command line, or use the config file, which can be easier to work with when a lot of custom options are configured. Use `—config-file=config.json` option, and then provide complete configuration in the `config.json` file, for example:
```json
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

### Interacting with the C-Chain

Interacting with the C-Chain is identical as interacting with [go-ethereum](https://geth.ethereum.org/). You can find the reference material for C-Chain API [here](../../avalanchego-apis/contract-chain-c-chain-api.md).

Please note that `personal_` namespace is turned off by default. To turn it on, you need to pass the appropriate command line switch to your node, like in the above config example.

## Constructing transactions

Avalanche C-Chain transactions are identical to standard EVM transactions with 2 exceptions:
* They must be signed with Avalanche’s ChainID (43114).
* The gas price is fixed to 225 Gwei.

For development purposes, Avalanche supports all the popular tooling for Ethereum, so developers familiar with Ethereum and Solidity can feel right at home. We have tutorials and repositories for several popular development environments:
* [MetaMask and Remix](../smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md)
* [Truffle](../smart-contracts/using-truffle-with-the-avalanche-c-chain.md)
* [Hardhat](https://github.com/ava-labs/avalanche-smart-contract-quickstart)

## Ingesting On-Chain Data

You can use any standard way of ingesting on-chain data you use for Ethereum network.

### Determining Finality

Avalanche consensus provides fast and irreversible finality with 1-2 seconds. To query the most up to date finalized block, query any value (i.e. block, balance, state, etc) with the `latest` parameter.  If you query above the last finalized block (i.e. eth_blockNumber returns 10 and you query 11), an error will be thrown indicating that unfinalized data cannot be queried (as of avalanchego@v1.3.2).

### (Optional) Custom Golang SDK

If you plan on extracting data from the C-Chain into your own systems using golang, we recommend using our custom [ethclient](https://github.com/ava-labs/coreth/tree/master/ethclient). The standard go-ethereum Ethereum client does not compute block hashes correctly (when you call `block.Hash()`) because it doesn't take into account the added `[ExtDataHash](https://github.com/ava-labs/coreth/blob/2c3cfac5f766ce5f32a2eddc43451bdb473b84f1/core/types/block.go#L98)` header field in Avalanche C-Chain blocks, which is used move AVAX between chains (X-Chain and P-Chain). You can read more about our multi-chain abstraction [here](../../../learn/platform-overview/README.md) (out of scope for a normal C-Chain integration).

If you plan on reading JSON responses directly or use web3.js (doesn't recompute hash received over the wire) to extract on-chain transaction data/logs/receipts, you shouldn't have any issues!

## Support

If you have any problems or questions, reach out either directly to our developers, or on our public [Discord](https://chat.avalabs.org/) server.