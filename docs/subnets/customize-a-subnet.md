---
Description: How to customize a subnet by utilizing Genesis, Precompile and Blockchain Configs.
---

# Customize a Subnet

All subnets can be customized by utilizing `Subnet Configs`.

And a subnet created by or forked from [Subnet-EVM](https://github.com/ava-labs/subnet-evm) can be further customized by utilizing one or more of the following methods:
* Genesis
* Precompile
* Chain Configs 

## Subnet Configs

Parameters for Subnet Configs must be specified with a `{subnetID}.json` config file under `--subnet-config-dir`. AvalancheGo loads configs for subnets specified in `--whitelisted-subnet` parameter. See [here](../nodes/maintain/avalanchego-config-flags.md#subnet-configs) for more info. 

Parameters specified in the Subnet Configs apply to all chains in the specified subnet.  They are are chain-agnostic, not just for EVM Subnet. 

A subnet can customized by setting parameters for the following:

* [Validator-only communication to create a private subnet](../nodes/maintain/avalanchego-config-flags#validatoronly-bool)
* [Consensus](../nodes/maintain/avalanchego-config-flags#consensus-parameters) 
* [Gossip](../nodes/maintain/avalanchego-config-flags#gossip-configs) 

Here is an example config file:

```json
{
  "validatorOnly": false,
  "consensusParameters": {
    "k": 25,
    "alpha": 18
  },
  "appGossipNonValidatorSize": 10
}
```

### Private Subnet

Avalanche subnets are public by default. It means that every node can sync and listen ongoing transactions/blocks in subnets, even they're not validating the listened subnet.

Subnet validators can choose not to publish contents of blockchains via its configuration. If a node sets [`validatorOnly`](../nodes/maintain/avalanchego-config-flags#validatoronly-bool) to true in its subnet configs, the node exchanges messages only with this subnet's validators. Other peers will not be able to learn contents of this subnet from this node.

:::tip
This is a node-specific configuration. Every validator of this subnet has to use this configuration in order to create a full private subnet.
:::


## Genesis

Each blockchain has some genesis state when it’s created. Each Virtual Machine defines the format and semantics of its genesis data.

The default genesis Subnet EVM provided below has some well defined parameters:

```json
{
  "config": {
    "chainId": 43214,
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
    "feeConfig": {
      "gasLimit": 8000000,
      "minBaseFee": 25000000000,
      "targetGas": 15000000,
      "baseFeeChangeDenominator": 36,
      "minBlockGasCost": 0,
      "maxBlockGasCost": 1000000,
      "targetBlockRate": 2,
      "blockGasCostStep": 200000
    },
    "allowFeeRecipients": false
  },
  "alloc": {
    "8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC": {
      "balance": "0x295BE96E64066972000000"
    }
  },
  "nonce": "0x0",
  "timestamp": "0x0",
  "extraData": "0x00",
  "gasLimit": "0x7A1200",
  "difficulty": "0x0",
  "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "coinbase": "0x0000000000000000000000000000000000000000",
  "number": "0x0",
  "gasUsed": "0x0",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
}
```

### Chain Config

`chainID`: Denotes the chainID of to be created chain. Must be picked carefully since a conflict with other chains can cause issues.

#### Hardforks

`homesteadBlock`, `eip150Block`, `eip150Hash`, `eip155Block`, `byzantiumBlock`, `constantinopleBlock`, `petersburgBlock`, `istanbulBlock`, `muirGlacierBlock`, `subnetEVMTimestamp` are hardfork activation times. Changing these may cause issues, so treat them carefully.

#### Fee Config

`gasLimit`: Gas limit of blocks.

`minBaseFee`: Minimum base fee of transactions. It is also the initial base fee for EIP-1559 blocks.

`targetGas`: The target gas consumption of blocks. If the network starts producing blocks with gas cost higher than this, base fees are increased accordingly.

`baseFeeChangeDenominator`: The amount the base fee can change between blocks.

`minBlockGasCost`: Minimum gas cost a block should cover.

`maxBlockGasCost`: Maximum gas cost a block should cover.

`targetBlockRate`: The targeted block rate that network should produce blocks. If the network starts producing faster than this, base fees are increased accordingly.

`blockGasCostStep`: The block gas cost change step between blocks.

#### Custom Fee Recipients

See section [Setting a Custom Fee Recipient](#setting-a-custom-fee-recipient)

### Alloc

See section [Setting the Genesis Allocation](#setting-the-genesis-allocation)


### Header

The fields `nonce`, `timestamp`, `extraData`, `gasLimit`, `difficulty`, `mixHash`, `coinbase`, `number`, `gasUsed`, `parentHash` defines the genesis block header. The field `gasLimit` should be set to match the `gasLimit` set in the `feeConfig`. You do not need to change any of the other genesis header fields.

### Examples

Another example of a genesis file can be found in the [networks folder](https://github.com/ava-labs/subnet-evm/blob/master/networks/11111/genesis.json).


Here are a few examples on how a genesis file is used:
* [scripts/run.sh](https://github.com/ava-labs/subnet-evm/blob/master/scripts/run.sh#L99)
* [subnet-cli](./subnet-cli.md#subnet-cli-create-blockchain)


### Setting the Genesis Allocation


Alloc defines addresses and their initial balances. This should be changed accordingly for each chain. If you don't
provide any genesis allocation, you won't be able to interact with your new
chain (all transactions require a fee to be paid from the sender's balance). 

The `alloc` field expects key-value pairs. Keys of each entry must be a valid `address`. The `balance` field in the value can be either a `hexadecimal` or `number` to indicate initial balance of the address. The default value contains `8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC` with `50000000000000000000000000` balance in it. Default:

```json
  "alloc": {
    "8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC": {
      "balance": "0x295BE96E64066972000000"
    }
  }
```


To specify a different genesis allocation, populate the `alloc` field in the genesis JSON as follows:

```json
  "alloc": {
    "8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC": {
      "balance": "0x52B7D2DCC80CD2E4000000"
    },
    "Ab5801a7D398351b8bE11C439e05C5B3259aeC9B": {
      "balance": "0xa796504b1cb5a7c0000"
    }
  },
```

The keys in the allocation are [hex](https://en.wikipedia.org/wiki/Hexadecimal) addresses **without the canonical `0x` prefix**.
The balances are denominated in Wei ([10^18 Wei = 1 Whole Unit of Native Token](https://eth-converter.com/)) and expressed as
hex strings **with the canonical `0x` prefix**. You can use [this converter](https://www.rapidtables.com/convert/number/hex-to-decimal.html)
to translate between decimal and hex numbers.

The above example yields the following genesis allocations (denominated in whole units of the native token ie. 1 AVAX/1 WAGMI):

```
0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC: 100000000 (0x52B7D2DCC80CD2E4000000=100000000000000000000000000 Wei)
0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B: 49463 (0xa796504b1cb5a7c0000=49463000000000000000000 Wei)
```

### Setting a Custom Fee Recipient

By default, all fees are burned (sent to the blackhole address with `"allowFeeRecipients": false`). However, it is
possible to enable block producers to set a fee recipient (who will get compensated for blocks they produce).

To enable this feature, you'll need to add the following to your
genesis file (under the `"config"` key):

```json
{
  "config": {
    "allowFeeRecipients": true
  }
}
```

#### `feeRecipient` 

With `allowFeeRecipients` enabled, your validators can specify their addresses to collect fees. They need to update their EVM   [chain config](#feerecipient-1) with the following to specify where the fee should be sent to.

```json
{
  "feeRecipient": "<YOUR 0x-ADDRESS>"
}
```


:::warning

If `allowFeeRecipients` feature is enabled on the subnet, but a validator doesn't specify a "feeRecipient", the fees will be burned in blocks it produces.

:::


### Build Genesis

The Subnet EVM has a static API method named `buildGenesis` that takes in a JSON representation of a blockchain’s genesis state and returns the byte representation of that state. You should provide `buildGenesis` a full genesis like below, even if you don't intend to alter default values.

Remind if our VM ID was `srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy`, calls will be made to `/ext/vm/srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy/rpc`:

To create the byte representation of this genesis state, call `subnetevm.buildGenesis`.

```sh
curl -X POST --data '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "subnetevm.buildGenesis",
  "params": {
    "genesisData": {
      "config": {
        "chainID": 13213,
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
        "feeConfig": {
          "gasLimit": 8000000,
          "targetBlockRate": 2,
          "minBaseFee": 13000000000,
          "targetGas": 15000000,
          "baseFeeChangeDenominator": 36,
          "minBlockGasCost": 0,
          "maxBlockGasCost": 1000000,
          "blockGasCostStep": 200000
        },
        "allowFeeRecipients": false
      },
      "alloc": {
        "8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC": {
          "balance": "333333333333333333333"
        }
      },
      "timestamp": "0x0",
      "gasLimit": "0x7A1200",
      "difficulty": "0x0",
      "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "coinbase": "0x0000000000000000000000000000000000000000",
      "number": "0x0",
      "gasUsed": "0x0",
      "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
    }
  }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/vm/srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy/rpc
```

This returns the byte representation of your blockchain’s genesis state:

```json
{
  "jsonrpc": "2.0",
  "result": {
    "genesisBytes": "FT1GtzvmB3sw5wm2qHXtxy7zXWSzxnoj5vNzu6XCqBCBry2d7MVhYfHg9LJkSpALjPpWKUK3wCGfr5syszjDkLSpEccQXNLvnvhrPTRjyBPdikKLLxqJFqrHpHcxVh3dnoxxP8DAp6h6Vvu4Y4xWU6SH9d5UfR8AHkQfaXLZGNgpj8EdtBALpyyS6KD5UY6W8MeYTfmtH5DW5hrsKZLe8oWEc62wEWNesruy6rtLjQ4He5wLh1Tq81PTdN4KJEmnrS68uYeZexPNZ6avxTDNWFLAqNVaMxuC1uuwzf366SxZsZjsm4t3MBwzSYiCQPYo7ruxXeN9xoqcZT2MoP1TTSTdeweFHdq1w9HT7RGdS2MzgJKy8YeU6enUXtWqcDtQ3BNb3Q6Bh11vdqPMoyRkWmFrcZTgc9jjaRx3XrRXY9wA4qCYRhjRYjKzSg5K463janpNkgvwH6eF4ev2xFcVFHFYqUVLpTEoigKesopASGkNf4v2HPQ1ZLvVofiEbfp5g9CfnKN2S7dkXvYbS2YdkjAo4G4M74uBRGpqrk4qJH6M1zqbFTZHnt6A1rsFBhnGEJFyw4Nimu5w6PTW9w3RLUFrnMejfscDLvN2ETGuXqX847Bd1Aw8NfMdqfvDfCjvAuX5se6BfTJYXMedDR6sWjjsEJGhiMLZpUfrgMzMtkZGVHqV5augcWPqHEjUXkLXEUCU8AcvdzNciRP9Q9s7ZzLqHauzdDc1ae2K9itGJVHXuyhqWk7xSGuZRusvutjxDDqfAngLHF5hqyku42ZaDtNYe7wSGyAdDt8a4VstuUd7LNmt2zHDescsAauEVZE6WjYSrc3dcmSQE5HV6zgEbqgSkEo5ZZMcb5xupT7GAyXn8opFH28kjTPgnnWZi6MNCdrvdMzgshwf3N5ecaJZh1vx9LSwUScw2jg8G6AF4bw7gBpB7t2P4EYd4LtMbNzQCS5Hexak7WEmdhcJ2s1Y2aYcs84F4QgHFy63FhfMxa3iDM252nHC4NPN2XMRd2cbzy59jBcMk99mderGstng25bsxyMhZFGQEnwbLZ4Xs3phCiwcAAo7wkNTyC7eWqmk7FNhGCovucBLgfjNLuUD4DMPEHMMrApknXQh132gp6uUvWbGFnoyDsamaB6L2sVAmo2cCg4Xk6tcNEm3KCdf8H4iXz1a7mbEzUcy9FmxGrhk1YppQryUXP97Nt2tQjd7GM2expSsxdTAyQFjoHeuGHbu6oNmdQLbFgprRd16hDeJJD9PxN79AQAojJQBU14LHN5vLEH5GoKDs7yoMa3iC7h",
    "encoding": "cb58"
  },
  "id": 1
}
```

You can also issue a `subnetevm.decodeBlock` to make sure your encoded genesis bytes are intact:

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "id"     : 1,
    "method" : "subnetevm.decodeGenesis",
    "params" : {
        "encoding": "cb58",
        "genesisBytes":"FT1GtzvmB3sw5wm2qHXtxy7zXWSzxnoj5vNzu6XCqBCBry2d7MVhYfHg9LJkSpALjPpWKUK3wCGfr5syszjDkLSpEccQXNLvnvhrPTRjyBPdikKLLxqJFqrHpHcxVh3dnoxxP8DAp6h6Vvu4Y4xWU6SH9d5UfR8AHkQfaXLZGNgpj8EdtBALpyyS6KD5UY6W8MeYTfmtH5DW5hrsKZLe8oWEc62wEWNesruy6rtLjQ4He5wLh1Tq81PTdN4KJEmnrS68uYeZexPNZ6avxTDNWFLAqNVaMxuC1uuwzf366SxZsZjsm4t3MBwzSYiCQPYo7ruxXeN9xoqcZT2MoP1TTSTdeweFHdq1w9HT7RGdS2MzgJKy8YeU6enUXtWqcDtQ3BNb3Q6Bh11vdqPMoyRkWmFrcZTgc9jjaRx3XrRXY9wA4qCYRhjRYjKzSg5K463janpNkgvwH6eF4ev2xFcVFHFYqUVLpTEoigKesopASGkNf4v2HPQ1ZLvVofiEbfp5g9CfnKN2S7dkXvYbS2YdkjAo4G4M74uBRGpqrk4qJH6M1zqbFTZHnt6A1rsFBhnGEJFyw4Nimu5w6PTW9w3RLUFrnMejfscDLvN2ETGuXqX847Bd1Aw8NfMdqfvDfCjvAuX5se6BfTJYXMedDR6sWjjsEJGhiMLZpUfrgMzMtkZGVHqV5augcWPqHEjUXkLXEUCU8AcvdzNciRP9Q9s7ZzLqHauzdDc1ae2K9itGJVHXuyhqWk7xSGuZRusvutjxDDqfAngLHF5hqyku42ZaDtNYe7wSGyAdDt8a4VstuUd7LNmt2zHDescsAauEVZE6WjYSrc3dcmSQE5HV6zgEbqgSkEo5ZZMcb5xupT7GAyXn8opFH28kjTPgnnWZi6MNCdrvdMzgshwf3N5ecaJZh1vx9LSwUScw2jg8G6AF4bw7gBpB7t2P4EYd4LtMbNzQCS5Hexak7WEmdhcJ2s1Y2aYcs84F4QgHFy63FhfMxa3iDM252nHC4NPN2XMRd2cbzy59jBcMk99mderGstng25bsxyMhZFGQEnwbLZ4Xs3phCiwcAAo7wkNTyC7eWqmk7FNhGCovucBLgfjNLuUD4DMPEHMMrApknXQh132gp6uUvWbGFnoyDsamaB6L2sVAmo2cCg4Xk6tcNEm3KCdf8H4iXz1a7mbEzUcy9FmxGrhk1YppQryUXP97Nt2tQjd7GM2expSsxdTAyQFjoHeuGHbu6oNmdQLbFgprRd16hDeJJD9PxN79AQAojJQBU14LHN5vLEH5GoKDs7yoMa3iC7h"}
}
' -H 'content-type:application/json;' 127.0.0.1:9650/ext/vm/srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy/rpc
```

This should return the same genesis block, provided in `subnetevm.buildGenesis` call. Order of fields can be different:

```json
{
  "jsonrpc": "2.0",
  "result": {
    "genesisData": {
      "config": {
        "chainId": 13213,
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
        "feeConfig": {
          "gasLimit": 8000000,
          "targetBlockRate": 2,
          "minBaseFee": 13000000000,
          "targetGas": 15000000,
          "baseFeeChangeDenominator": 36,
          "minBlockGasCost": 0,
          "maxBlockGasCost": 1000000,
          "blockGasCostStep": 200000
        }
      },
      "nonce": "0x0",
      "timestamp": "0x0",
      "extraData": "0x",
      "gasLimit": "0x7A1200",
      "difficulty": "0x0",
      "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "coinbase": "0x0000000000000000000000000000000000000000",
      "alloc": {
        "8db97c7cece249c2b98bdc0226cc4c2a57bf52fc": {
          "balance": "0x1211ede4974a355555"
        }
      },
      "number": "0x0",
      "gasUsed": "0x0",
      "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    "encoding": "cb58"
  },
  "id": 1
}
```


## Precompiles

Subnet EVM can provide custom functionalities with precompiled contracts. These precompiled contracts can be activated through `ChainConfig` (in genesis or as an upgrade).

### Restricting Smart Contract Deployers

If you'd like to restrict who has the ability to deploy contracts on your
subnet, you can provide an `AllowList` configuration in your genesis file:

```json
{
  "config": {
    "chainId": 99999,
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
    "feeConfig": {
      "gasLimit": 20000000,
      "minBaseFee": 1000000000,
      "targetGas": 100000000,
      "baseFeeChangeDenominator": 48,
      "minBlockGasCost": 0,
      "maxBlockGasCost": 10000000,
      "targetBlockRate": 2,
      "blockGasCostStep": 500000
    },
    "contractDeployerAllowListConfig": {
      "blockTimestamp": 0,
      "adminAddresses": ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"]
    }
  },
  "alloc": {
    "8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC": {
      "balance": "0x52B7D2DCC80CD2E4000000"
    }
  },
  "nonce": "0x0",
  "timestamp": "0x0",
  "extraData": "0x00",
  "gasLimit": "0x1312D00",
  "difficulty": "0x0",
  "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "coinbase": "0x0000000000000000000000000000000000000000",
  "number": "0x0",
  "gasUsed": "0x0",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
}
```

In this example, `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC` is named as the
`Admin` of the `ContractDeployerAllowList`. This enables it to add other `Admins` or to add
`Deployers`. Both `Admins` and `Deployers` can deploy contracts. To provide
a great UX with factory contracts, the `tx.Origin` is checked for being a valid
deployer instead of the caller of `CREATE`. This means that factory contracts will still be
able to create new contracts as long as the sender of the original transaction is an allow
listed deployer.

The `Stateful Precompile` powering the `ContractDeployerAllowList` adheres to the following Solidity interface at `0x0200000000000000000000000000000000000000` (you can load this interface and interact directly in Remix):

```solidity
// (c) 2022-2023, Ava Labs, Inc. All rights reserved.
// See the file LICENSE for licensing terms.

// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;

interface AllowListInterface {
    // Set [addr] to have the admin role over the allow list
    function setAdmin(address addr) external;

    // Set [addr] to be enabled on the allow list
    function setEnabled(address addr) external;

    // Set [addr] to have no role over the allow list
    function setNone(address addr) external;

    // Read the status of [addr]
    function readAllowList(address addr) external view returns (uint256);
}
```

If you attempt to add a `Deployer` and you are not an `Admin`, you will see
something like:
![admin fail](/img/admin_fail.png)

If you attempt to deploy a contract but you are not an `Admin` not
a `Deployer`, you will see something like:
![deploy fail](/img/deploy_fail.png)

The allow list has three roles: `None`, `Deployer`, and `Admin`.

If you call `readAllowList(addr)` then you can read the current role of `addr`, which will return a uint256 with a value of 0, 1, or 2, corresponding to the roles `None`, `Deployer`, and `Admin` respectively.

WARNING: if you remove all of the admins from the allow list, it will no longer be possible to update the allow list without modifying the subnet-evm to schedule a network upgrade.

### Restricting Who Can Submit Transactions
Similar to restricting contract deployers, this precompile restricts which addresses may submit transactions on chain. Like the previous section, you can activate the precompile by including an `AllowList` configuration in your genesis file:
```json
{
  "config": {
    "chainId": 99999,
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
    "feeConfig": {
      "gasLimit": 20000000,
      "minBaseFee": 1000000000,
      "targetGas": 100000000,
      "baseFeeChangeDenominator": 48,
      "minBlockGasCost": 0,
      "maxBlockGasCost": 10000000,
      "targetBlockRate": 2,
      "blockGasCostStep": 500000
    },
    "txAllowListConfig": {
      "blockTimestamp": 0,
      "adminAddresses":["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"]
    }
  },
  "alloc": {
    "8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC": {
      "balance": "0x52B7D2DCC80CD2E4000000"
    }
  },
  "nonce": "0x0",
  "timestamp": "0x0",
  "extraData": "0x00",
  "gasLimit": "0x1312D00",
  "difficulty": "0x0",
  "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "coinbase": "0x0000000000000000000000000000000000000000",
  "number": "0x0",
  "gasUsed": "0x0",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
}
```

In this example, `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC` is named as the
`Admin` of the `ContractDeployerAllowList`. This enables them to add other `Admins` or to add
`Allowed`. Both `Admins` and `Allowed` can submit transactions to the chain.

The `Stateful Precompile` powering the `TxAllowList` adheres to the following Solidity interface at `0x0200000000000000000000000000000000000002` (you can load this interface and interact directly in Remix):

```solidity
// (c) 2022-2023, Ava Labs, Inc. All rights reserved.
// See the file LICENSE for licensing terms.

// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;

interface AllowListInterface {
    // Set [addr] to have the admin role over the allow list
    function setAdmin(address addr) external;

    // Set [addr] to be enabled on the allow list
    function setEnabled(address addr) external;

    // Set [addr] to have no role over the allow list
    function setNone(address addr) external;

    // Read the status of [addr]
    function readAllowList(address addr) external view returns (uint256);
}
```

If you attempt to add an `Allowed` and you are not an `Admin`, you will see
something like:
![admin fail](/img/admin_fail.png)

If you attempt to submit a transaction but you are not an `Admin` or not
`Allowed`, you will see something like: `cannot issue transaction from non-allow listed address`

The allow list has three roles: `None`, `Allowed`, and `Admin`.

If you call `readAllowList(addr)` then you can read the current role of `addr`, which will return a `uint256` with a value of 0, 1, or 2, corresponding to the roles `None`, `Allowed`, and `Admin` respectively.

WARNING: if you remove all of the admins from the allow list, it will no longer be possible to update the allow list without modifying the subnet-evm to schedule a network upgrade.

### Minting Native Coins

You can mint native(gas) coins with a precompiled contract. In order to activate this feature, you can provide `nativeMinterConfig` in genesis:

```json
{
  "config": {
    "chainId": 99999,
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
    "feeConfig": {
      "gasLimit": 20000000,
      "minBaseFee": 1000000000,
      "targetGas": 100000000,
      "baseFeeChangeDenominator": 48,
      "minBlockGasCost": 0,
      "maxBlockGasCost": 10000000,
      "targetBlockRate": 2,
      "blockGasCostStep": 500000
    },
    "contractNativeMinterConfig": {
      "blockTimestamp": 0,
      "adminAddresses": ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"]
    }
  },
  "alloc": {
    "8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC": {
      "balance": "0x52B7D2DCC80CD2E4000000"
    }
  },
  "nonce": "0x0",
  "timestamp": "0x0",
  "extraData": "0x00",
  "gasLimit": "0x1312D00",
  "difficulty": "0x0",
  "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "coinbase": "0x0000000000000000000000000000000000000000",
  "number": "0x0",
  "gasUsed": "0x0",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
}
```

`adminAddresses` denotes admin accounts who can add other `Admin` or `Minter` accounts. `Minters` and `Admins` are both eligible to mint native coins for other addresses. `ContractNativeMinter` uses same methods as in `ContractDeployerAllowList`.

The `Stateful Precompile` powering the `ContractNativeMinter` adheres to the following Solidity interface at `0x0200000000000000000000000000000000000001` (you can load this interface and interact directly in Remix):

```solidity
// (c) 2022-2023, Ava Labs, Inc. All rights reserved.
// See the file LICENSE for licensing terms.

// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;

interface NativeMinterInterface {
    // Set [addr] to have the admin role over the minter list
    function setAdmin(address addr) external;

    // Set [addr] to be enabled on the minter list
    function setEnabled(address addr) external;

    // Set [addr] to have no role over the minter list
    function setNone(address addr) external;

    // Read the status of [addr]
    function readAllowList(address addr) external view returns (uint256);

    // Mint [amount] number of native coins and send to [addr]
    function mintNativeCoin(address addr, uint256 amount) external;
}
```

_Note: Both `ContractDeployerAllowList` and `ContractNativeMinter` can be used together._

### Examples

Subnet-EVM contains example contracts for precompiles under `/contract-examples`. It's a hardhat project with tests, tasks. For more information see [contract examples README](https://github.com/ava-labs/subnet-evm/tree/master/contract-examples#subnet-evm-contracts).



## Chain Configs

As described in [this doc](../nodes/maintain/chain-config-flags.md#subnet-chain-configs), each blockchain of subnets can have its own custom configuration. If a subnet's chain id is `2ebCneblahblahblah`, the config file for this chain is located at `{chain-config-dir}/2ebCneblahblahblah/config.json`.


For blockchains created by or forked from Subnet-evm, most [C-Chain configs](../nodes/maintain/chain-config-flags.md#c-chain-configs) are applicable except [Avalanche Specific APIs](../nodes/maintain/chain-config-flags.md#enabling-avalanche-specific-apis).


### Priority Regossip

A transaction is "regossiped" when the node does not find the transaction in
a block after `priority-regossip-frequency` (defaults to `1m`). By default, up to 16 transactions
(max 1 per address) are regossiped to validators per minute.

Operators can use "priority regossip" to more aggressively "regossip" transactions for a set of
important addresses (like bridge relayers). To do so, you'll need to update your
[chain config](../nodes/maintain/chain-config-flags.md#subnet-chain-configs) with the following:

```json
{
  "priority-regossip-addresses": ["<YOUR 0x-ADDRESS>"]
}
```

By default, up to 32 transactions from priority addresses (max 16 per address) are regossipped to validators per second.
You can override these defaults with the following config:

```json
{
  "priority-regossip-frequency": "1s",
  "priority-regossip-max-txs": 32,
  "priority-regossip-addresses": ["<YOUR 0x-ADDRESS>"],
  "priority-regossip-txs-per-address": 16
}
```

### `feeRecipient`

This works together with [`allowFeeRecipients`](#setting-a-custom-fee-recipient) to specify where the fees should be sent to.

With `allowFeeRecipients` enabled, validators can specify their addresses to collect fees. 

```json
{
  "feeRecipient": "<YOUR 0x-ADDRESS>"
}
```


:::warning

If `allowFeeRecipients` feature is enabled on the subnet, but a validator doesn't specify a "feeRecipient", the fees will be burned in blocks it produces.

:::



