---
tags: [Subnet-EVM]
description: This page is an overview of the Subnet-EVM API associated with AvalancheGo.
sidebar_label: API
pagination_label: Subnet-EVM API
---

# Subnet-EVM API

[Subnet-EVM](https://github.com/ava-labs/subnet-evm) APIs are identical to
[Coreth](/reference/avalanchego/c-chain/api.md) C-Chain APIs, except Avalanche Specific APIs
starting with `avax`. Subnet-EVM also supports standard Ethereum APIs as well. For more
information about Coreth APIs see [GitHub](https://github.com/ava-labs/coreth).

Subnet-EVM has some additional APIs that are not available in Coreth.

## `eth_feeConfig`

Subnet-EVM comes with an API request for getting fee config at a specific block. You can use this
API to check your activated fee config.

**Signature:**

```sh
eth_feeConfig([blk BlkNrOrHash]) -> {feeConfig: json}
```

- `blk` is the block number or hash at which to retrieve the fee config. Defaults to the latest
  block if omitted.

**Example Call:**

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "eth_feeConfig",
    "params": [
        "latest"
    ],
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt/rpc
```

**Example Response:**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "feeConfig": {
      "gasLimit": 15000000,
      "targetBlockRate": 2,
      "minBaseFee": 33000000000,
      "targetGas": 15000000,
      "baseFeeChangeDenominator": 36,
      "minBlockGasCost": 0,
      "maxBlockGasCost": 1000000,
      "blockGasCostStep": 200000
    },
    "lastChangedAt": 0
  }
}
```

## `eth_getChainConfig`

`eth_getChainConfig` returns the Chain Config of the blockchain. This API is enabled by default with
`internal-blockchain` namespace.

This API exists on the C-Chain as well, but in addition to the normal Chain Config returned by the
C-Chain `eth_getChainConfig` on `subnet-evm` additionally returns the upgrade config, which specifies
network upgrades activated after the genesis. **Signature:**

```sh
eth_getChainConfig({}) -> {chainConfig: json}
```

**Example Call:**

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"eth_getChainConfig",
    "params" :[]
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/Nvqcm33CX2XABS62iZsAcVUkavfnzp1Sc5k413wn5Nrf7Qjt7/rpc
```

**Example Response:**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "chainId": 43214,
    "feeConfig": {
      "gasLimit": 8000000,
      "targetBlockRate": 2,
      "minBaseFee": 33000000000,
      "targetGas": 15000000,
      "baseFeeChangeDenominator": 36,
      "minBlockGasCost": 0,
      "maxBlockGasCost": 1000000,
      "blockGasCostStep": 200000
    },
    "allowFeeRecipients": true,
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip150Hash": "0x2086799aeebeae135c246c65021c82b4e15a2c451340993aacfd2751886514f0",
    "eip155Block": 0,
    "eip158Block": 0,
    "byzantiumBlock": 0,
    "constantinopleBlock": 0,
    "petersburgBlock": 0,
    "istanbulBlock": 0,
    "muirGlacierBlock": 0,
    "subnetEVMTimestamp": 0,
    "contractDeployerAllowListConfig": {
      "adminAddresses": ["0x8db97c7cece249c2b98bdc0226cc4c2a57bf52fc"],
      "blockTimestamp": 0
    },
    "contractNativeMinterConfig": {
      "adminAddresses": ["0x8db97c7cece249c2b98bdc0226cc4c2a57bf52fc"],
      "blockTimestamp": 0
    },
    "feeManagerConfig": {
      "adminAddresses": ["0x8db97c7cece249c2b98bdc0226cc4c2a57bf52fc"],
      "blockTimestamp": 0
    },
    "upgrades": {
      "precompileUpgrades": [
        {
          "feeManagerConfig": {
            "adminAddresses": null,
            "blockTimestamp": 1661541259,
            "disable": true
          }
        },
        {
          "feeManagerConfig": {
            "adminAddresses": null,
            "blockTimestamp": 1661541269
          }
        }
      ]
    }
  }
}
```

## `eth_getActivePrecompilesAt`

`eth_getActivePrecompilesAt` returns activated precompiles at a specific timestamp. If no
timestamp is provided it returns the latest block timestamp. This API is enabled by default with
`internal-blockchain` namespace.

**Signature:**

```sh
eth_getActivePrecompilesAt([timestamp uint]) -> {precompiles: []Precompile}
```

- `timestamp` specifies the timestamp to show the precompiles active at this time. If omitted it
  shows precompiles activated at the latest block timestamp.

**Example Call:**

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "eth_getActivePrecompilesAt",
    "params": [],
    "id": 1
}'  -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/Nvqcm33CX2XABS62iZsAcVUkavfnzp1Sc5k413wn5Nrf7Qjt7/rpc
```

**Example Response:**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "contractDeployerAllowListConfig": {
      "adminAddresses": ["0x8db97c7cece249c2b98bdc0226cc4c2a57bf52fc"],
      "blockTimestamp": 0
    },
    "contractNativeMinterConfig": {
      "adminAddresses": ["0x8db97c7cece249c2b98bdc0226cc4c2a57bf52fc"],
      "blockTimestamp": 0
    },
    "feeManagerConfig": {
      "adminAddresses": ["0x8db97c7cece249c2b98bdc0226cc4c2a57bf52fc"],
      "blockTimestamp": 0
    }
  }
}
```

## `eth_getActiveRulesAt`

`eth_getActiveRulesAt` returns activated rules (precompiles, upgrades) at a specific timestamp. If no
timestamp is provided it returns the latest block timestamp. This API is enabled by default with
`internal-blockchain` namespace.

**Signature:**

```sh
eth_getActiveRulesAt([timestamp uint]) -> {rules: json}
```

- `timestamp` specifies the timestamp to show the rukes active at this time. If omitted it
  shows rules activated at the latest block timestamp.

**Example Call:**

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "eth_getActiveRulesAt",
    "params": [],
    "id": 1
}'  -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/Nvqcm33CX2XABS62iZsAcVUkavfnzp1Sc5k413wn5Nrf7Qjt7/rpc
```

**Example Response:**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "ChainID": 99999,
    "IsHomestead": true,
    "IsEIP150": true,
    "IsEIP155": true,
    "IsEIP158": true,
    "IsByzantium": true,
    "IsConstantinople": true,
    "IsPetersburg": true,
    "IsIstanbul": true,
    "IsCancun": true,
    "IsSubnetEVM": true,
    "IsDurango": true,
    "IsEUpgrade": true,
    "ActivePrecompiles": {
      "0x0200000000000000000000000000000000000003": {
        "adminAddresses": ["0x8db97c7cece249c2b98bdc0226cc4c2a57bf52fc"],
        "blockTimestamp": 0
      },
      "0x0200000000000000000000000000000000000004": {
        "adminAddresses": ["0x8db97c7cece249c2b98bdc0226cc4c2a57bf52fc"],
        "blockTimestamp": 1712918700
      },
      "0x0200000000000000000000000000000000000005": {
        "blockTimestamp": 1714158045,
        "quorumNumerator": 0
      }
    },
    "Predicaters": {
      "0x0200000000000000000000000000000000000005": {
        "blockTimestamp": 1714158045,
        "quorumNumerator": 0
      }
    },
    "AccepterPrecompiles": {
      "0x0200000000000000000000000000000000000005": {
        "blockTimestamp": 1714158045,
        "quorumNumerator": 0
      }
    }
  }
}
```
