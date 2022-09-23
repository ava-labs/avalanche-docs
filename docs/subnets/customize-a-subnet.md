---
Description: How to customize a Subnet by utilizing Genesis, Precompile and Blockchain Configs.
---

# Customize Your EVM-Powered Subnet

All Subnets can be customized by utilizing [`Subnet Configs`](#subnet-configs).

A Subnet can have one or more blockchains. For example, the Primary Network, which is a Subnet, a special one nonetheless, has 3 blockchains. Each chain can be further customized using chain specific configuration file. See [here](../nodes/maintain/chain-config-flags.md) for detailed explanation.

A blockchain created by or forked from [Subnet-EVM](https://github.com/ava-labs/subnet-evm) can be customized by utilizing one or more of the following methods:

- [Genesis](#genesis)
- [Precompile](#precompiles)
- [Upgrade Configs](#network-upgrades-enabledisable-precompiles)
- [Chain Configs](#chain-configs)

## Subnet Configs

A Subnet can customized by setting parameters for the following:

- [Validator-only communication to create a private Subnet](../nodes/maintain/subnet-configs.md#validatoronly-bool)
- [Consensus](../nodes/maintain/subnet-configs.md#consensus-parameters)
- [Gossip](../nodes/maintain/subnet-configs.md#gossip-configs)

See [here](../nodes/maintain/subnet-configs.md) for more info.

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

`chainID`: Denotes the chainID of to be created chain. Must be picked carefully since a conflict with other chains can cause issues. One suggestion is to check with [chainlist.org](https://chainlist.org/) to avoid ID collision, reserve and publish your chain ID properly.

#### Hardforks

`homesteadBlock`, `eip150Block`, `eip150Hash`, `eip155Block`, `byzantiumBlock`, `constantinopleBlock`, `petersburgBlock`, `istanbulBlock`, `muirGlacierBlock`, `subnetEVMTimestamp` are hardfork activation times. Changing these may cause issues, so treat them carefully.

#### Fee Config

`gasLimit`: Sets the max amount of gas consumed per block.

`targetBlockRate`: Sets the target rate of block production in seconds. A target of 2 will target producing a block every 2 seconds. If the network starts producing faster than this, base fees are increased accordingly.

`minBaseFee`: Sets a lower bound on the EIP-1559 base fee of a block. Since the block's base fee sets the minimum gas price for any transaction included in that block, this effectively sets a minimum gas price for any transaction.

`targetGas`: Specifies the targeted amount of gas (including block gas cost) to consume within a rolling 10-seconds window. When the dynamic fee algorithm observes that network activity is above/below the `targetGas`, it increases/decreases the base fee proportionally to how far above/below the target actual network activity is. If the network starts producing blocks with gas cost higher than this, base fees are increased accordingly.

`baseFeeChangeDenominator`: Divides the difference between actual and target utilization to determine how much to increase/decrease the base fee. A larger denominator indicates a slower changing, stickier base fee, while a lower denominator allows the base fee to adjust more quickly.

`minBlockGasCost`: Sets the minimum amount of gas to charge for the production of a block.

`maxBlockGasCost`: Sets the maximum amount of gas to charge for the production of a block.

`blockGasCostStep`: Determines how much to increase/decrease the block gas cost depending on the amount of time elapsed since the previous block.

If the block is produced at the target rate, the block gas cost will stay the same as the block gas cost for the parent block.

If it is produced faster/slower, the block gas cost will be increased/decreased by the step value for each second faster/slower than the target block rate accordingly.

:::note
If the `blockGasCostStep` is set to a very large number, it effectively requires block production to go no faster than the `targetBlockRate`. For example, if a block is produced two seconds faster than the target block rate, the block gas cost will increase by `2 * blockGasCostStep`.

:::

#### Custom Fee Recipients

See section [Setting a Custom Fee Recipient](#setting-a-custom-fee-recipient)

### Alloc

See section [Setting the Genesis Allocation](#setting-the-genesis-allocation)

### Header

The fields `nonce`, `timestamp`, `extraData`, `gasLimit`, `difficulty`, `mixHash`, `coinbase`, `number`, `gasUsed`, `parentHash` defines the genesis block header. The field `gasLimit` should be set to match the `gasLimit` set in the `feeConfig`. You do not need to change any of the other genesis header fields.

### Examples

Another example of a genesis file can be found in the [networks folder](https://github.com/ava-labs/subnet-evm/blob/master/networks/testnet/11111/genesis.json). Note: please remove `airdropHash` and `airdropAmount` fields if you want to start with it.

Here are a few examples on how a genesis file is used:

- [scripts/run.sh](https://github.com/ava-labs/subnet-evm/blob/master/scripts/run.sh#L99)
- [subnet-cli](./subnet-cli.md#subnet-cli-create-blockchain)

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

```text
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

#### Fee Recipient

With `allowFeeRecipients` enabled, your validators can specify their addresses to collect fees. They need to update their EVM [chain config](#fee-recipient-1) with the following to specify where the fee should be sent to.

```json
{
  "feeRecipient": "<YOUR 0x-ADDRESS>"
}
```

:::warning

If `allowFeeRecipients` feature is enabled on the Subnet, but a validator doesn't specify a "feeRecipient", the fees will be burned in blocks it produces.

:::

## Precompiles

Subnet EVM can provide custom functionalities with precompiled contracts. These precompiled contracts can be activated through `ChainConfig` (in genesis or as an upgrade).

### Restricting Smart Contract Deployers

If you'd like to restrict who has the ability to deploy contracts on your
subnet, you can provide an `AllowList` configuration in your genesis or upgrade file:

```json
{
  "contractDeployerAllowListConfig": {
    "blockTimestamp": 0,
    "adminAddresses": ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"]
  }
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

#### Trustless Mode

It's possible to enable this precompile without an admin address. In this mode you can define a list of addresses that are allowed to deploy contracts. This list is immutable and can't be changed. This mode is useful for networks that don't need a trusted party to manage the allow list. To enable this mode, you need to specify addresses in `enabledAddresses` field in your genesis or upgrade file:

```json
{
  "contractDeployerAllowListConfig": {
    "blockTimestamp": 0,
    "enabledAddresses": ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"]
  }
}
```

This will allow only `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC` to deploy contracts. For further information about trustless precompiles see [Trustless Precompile Activation](#trustless-precompile-activation).

### Restricting Who Can Submit Transactions

Similar to restricting contract deployers, this precompile restricts which addresses may submit transactions on chain. Like the previous section, you can activate the precompile by including an `AllowList` configuration in your genesis file:

```json
{
  "config": {
    "txAllowListConfig": {
      "blockTimestamp": 0,
      "adminAddresses": ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"]
    }
  }
}
```

In this example, `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC` is named as the
`Admin` of the `TransactionAllowList`. This enables them to add other `Admins` or to add
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

#### Trustless Mode

It's possible to enable this precompile without an admin address. In this mode you can define a list of addresses that are allowed to submit transactions. This list is immutable and can't be changed. This mode is useful for networks that don't need a trusted party to manage the allow list. To enable this mode, you need to specify addresses in `enabledAddresses` field in your genesis or upgrade file:

```json
{
  "txAllowListConfig": {
    "blockTimestamp": 0,
    "enabledAddresses": ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"]
  }
}
```

This will allow only `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC` to submit transactions. For further information about trustless precompiles see [Trustless Precompile Activation](#trustless-precompile-activation).

### Minting Native Coins

You can mint native(gas) coins with a precompiled contract. In order to activate this feature, you can provide `nativeMinterConfig` in genesis:

```json
{
  "config": {
    "contractNativeMinterConfig": {
      "blockTimestamp": 0,
      "adminAddresses": ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"]
    }
  }
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

#### Trustless Mode

It's possible to enable this precompile without an admin address. In this mode you can define a list of addresses that will receive native coins. This mode is useful for networks that requires one-time mint only without a trusted party. To enable this mode, you need to specify a map of addresses with their corresponding mint amounts in `initialMint` field in your genesis or upgrade file:

```json
{
  "contractNativeMinterConfig": {
    "blockTimestamp": 0,
    "initialMint": {
      "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC": "1000000000000000000",
      "0x10037Fb06Ec4aB8c870a92AE3f00cD58e5D484b3": "0xde0b6b3a7640000"
    }
  }
}
```

In the amount field you can specify either decimal or hex string. This will mint 1000000000000000000 (equivalent of 1 Coin) to both addresses. Note that these are both in string format. "0xde0b6b3a7640000" hex is equivalent to 1000000000000000000. For further information about trustless precompiles see [Trustless Precompile Activation](#trustless-precompile-activation).

### Configuring Dynamic Fees

You can configure the parameters of the dynamic fee algorithm on chain using the `FeeConfigManager`. In order to activate this feature, you will need to provide the `FeeConfigManager` in the genesis:

```json
{
  "config": {
    "feeManagerConfig": {
      "blockTimestamp": 0,
      "adminAddresses": ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"]
    }
  }
}
```

The FeeConfigManager implements the FeeManager interface which includes the same AllowList interface used by ContractNativeMinter, TxAllowList, etc. To see an example of the AllowList interface, see the [TxAllowList](#restricting-who-can-submit-transactions) above.

The `Stateful Precompile` powering the `FeeConfigManager` adheres to the following Solidity interface at `0x0200000000000000000000000000000000000003` (you can load this interface and interact directly in Remix):

```solidity
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./IAllowList.sol";

interface IFeeManager is IAllowList {
  // Set fee config fields to contract storage
  function setFeeConfig(
    uint256 gasLimit,
    uint256 targetBlockRate,
    uint256 minBaseFee,
    uint256 targetGas,
    uint256 baseFeeChangeDenominator,
    uint256 minBlockGasCost,
    uint256 maxBlockGasCost,
    uint256 blockGasCostStep
  ) external;

  // Get fee config from the contract storage
  function getFeeConfig()
    external
    view
    returns (
      uint256 gasLimit,
      uint256 targetBlockRate,
      uint256 minBaseFee,
      uint256 targetGas,
      uint256 baseFeeChangeDenominator,
      uint256 minBlockGasCost,
      uint256 maxBlockGasCost,
      uint256 blockGasCostStep
    );

  // Get the last block number changed the fee config from the contract storage
  function getFeeConfigLastChangedAt() external view returns (uint256 blockNumber);
}
```

In addition to the AllowList interface, the FeeConfigManager adds the following capabilities:

- `getFeeConfig` - retrieves the current dynamic fee config
- `getFeeConfigLastChangedAt` - retrieves the timestamp of the last block where the fee config was updated
- `setFeeConfig` - sets the dynamic fee config on chain (see [here](#fee-config) for details on the fee config parameters)

#### Trustless Mode

It's possible to enable this precompile without an admin address. In this mode you can define your fee structure to take effect at the activation. This mode is useful for networks that don't need a trusted party to manage the fee config. To enable this mode, you need to specify the fee config in `initialFeeConfig` field in your genesis or upgrade file:

```json
{
  "feeManagerConfig": {
    "blockTimestamp": 0,
    "initialFeeConfig": {
      "gasLimit": 20000000,
      "targetBlockRate": 2,
      "minBaseFee": 1000000000,
      "targetGas": 100000000,
      "baseFeeChangeDenominator": 48,
      "minBlockGasCost": 0,
      "maxBlockGasCost": 10000000,
      "blockGasCostStep": 500000
    }
  }
}
```

This will set the fee config to the values specified in the `initialFeeConfig` field. For further information about trustless precompiles see [Trustless Precompile Activation](#trustless-precompile-activation).

#### eth_FeeConfig API

Subnet-EVM comes with an API request for getting fee config at a specific block. You can use this API to check your activated fee config.

**Signature**

```sh
eth_feeConfig([blk BlkNrOrHash]) -> {feeConfig: json}
```

- `blk` is the block number or hash at which to retrieve the fee config.

**Example Call**

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

**Example Response**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
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
    "lastChangedAt": 0
  }
}
```

## Examples

Subnet-EVM contains example contracts for precompiles under `/contract-examples`. It's a hardhat project with tests, tasks. For more information see [contract examples README](https://github.com/ava-labs/subnet-evm/tree/master/contract-examples#subnet-evm-contracts).

## Network Upgrades: Enable/Disable Precompiles

:::warning

Performing a network upgrade requires coordinating the upgrade network-wide. A network upgrade changes the rule set used to process and verify blocks, such that any node that upgrades incorrectly or fails to upgrade by the time that upgrade goes into effect may become out of sync with the rest of the network.

Any mistakes in configuring network upgrades or coordinating them on validators may cause the network to halt and recovering may be difficult.

:::

In addition to specifying the configuration for each of the above precompiles in the genesis chain config, they can be individually enabled or disabled at a given timestamp as a network upgrade. Disabling a precompile disables calling the precompile and destructs its storage so it can be enabled at a later timestamp with a new configuration if desired.

These upgrades must be specified in a file named `upgrade.json` placed in the same directory where [`config.json`](#chain-configs) resides: `{chain-config-dir}/{blockchainID}/upgrade.json`. For example, `WAGMI Subnet` upgrade should be placed in `~/.avalanchego/configs/chains/2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt/upgrade.json`.

The content of the `upgrade.json` should be formatted according to the following:

```json
{
  "precompileUpgrades": [
    {
      "[PRECOMPILE_NAME]": {
        "blockTimestamp": "[ACTIVATION_TIMESTAMP]", // unix timestamp precompile should activate at
        "[PARAMETER]": "[VALUE]" // precompile specific configuration options, eg. "adminAddresses"
      }
    }
  ]
}
```

To disable a precompile, the following format should be used:

```json
{
  "precompileUpgrades": [
    {
      "<precompileName>": {
        "blockTimestamp": "[DEACTIVATION_TIMESTAMP]", // unix timestamp the precompile should deactivate at
        "disable": true
      }
    }
  ]
}
```

Each item in `precompileUpgrades` must specify exactly one precompile to enable or disable and the block timestamps must be in increasing order. Once an upgrade has been activated (a block after the specified timestamp has been accepted), it must always be present in `upgrade.json` exactly as it was configured at the time of activation (otherwise the node will refuse to start).

Enabling and disabling a precompile is a network upgrade and should always be done with caution.

:::danger

For safety, you should always treat `precompileUpgrades` as append-only.

As a last resort measure, it is possible to abort or reconfigure a precompile upgrade that has not been activated since the chain is still processing blocks using the prior rule set.

:::

If aborting an upgrade becomes necessary, you can remove the precompile upgrade from `upgrade.json` from the end of the list of upgrades. As long as the blockchain has not accepted a block with a timestamp past that upgrade's timestamp, it will abort the upgrade for that node.

### Example

```json
{
  "precompileUpgrades": [
    {
      "feeManagerConfig": {
        "blockTimestamp": 1668950000,
        "adminAddresses": ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"]
      }
    },
    {
      "txAllowListConfig": {
        "blockTimestamp": 1668960000,
        "adminAddresses": ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"]
      }
    },
    {
      "feeManagerConfig": {
        "blockTimestamp": 1668970000,
        "disable": true
      }
    }
  ]
}
```

This example enables the `feeManagerConfig` at the first block with timestamp >= `1668950000`, enables `txAllowListConfig` at the first block with timestamp >= `1668960000`, and disables `feeManagerConfig` at the first block with timestamp >= `1668970000`.

When a precompile disable takes effect (ie., after its `blockTimestamp` has passed), its storage will be wiped. If you want to reenable it, you will need to treat it as a new configuration.

After you have created the `upgrade.json` and placed it in the chain config directory, you need to restart the node for the upgrade file to be loaded (again, make sure you don't restart all Subnet validators at once!). On node restart, it will print out the configuration of the chain, where you can double-check that the upgrade has loaded correctly. In our example:

```text
INFO [08-15|15:09:36.772] <2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt Chain>
github.com/ava-labs/subnet-evm/eth/backend.go:155: Initialised chain configuration
config=“{ChainID: 11111 Homestead: 0 EIP150: 0 EIP155: 0 EIP158: 0 Byzantium: 0
Constantinople: 0 Petersburg: 0 Istanbul: 0, Muir Glacier: 0, Subnet EVM: 0, FeeConfig:
{\“gasLimit\“:20000000,\“targetBlockRate\“:2,\“minBaseFee\“:1000000000,\“targetGas\
“:100000000,\“baseFeeChangeDenominator\“:48,\“minBlockGasCost\“:0,\“maxBlockGasCost\
“:10000000,\“blockGasCostStep\“:500000}, AllowFeeRecipients: false, NetworkUpgrades: {\
“subnetEVMTimestamp\“:0}, PrecompileUpgrade: {}, UpgradeConfig: {\"precompileUpgrades\":[{\"feeManagerConfig\":{\"adminAddresses\":[\"0x8db97c7cece249c2b98bdc0226cc4c2a57bf52fc\"],\"enabledAddresses\":null,\"blockTimestamp\":1668950000}},{\"txAllowListConfig\":{\"adminAddresses\":[\"0x8db97c7cece249c2b98bdc0226cc4c2a57bf52fc\"],\"enabledAddresses\":null,\"blockTimestamp\":1668960000}},{\"feeManagerConfig\":{\"adminAddresses\":null,\"enabledAddresses\":null,\"blockTimestamp\":1668970000,\"disable\":true}}]}, Engine: Dummy Consensus Engine}"”
```

You can also check activation of precompiles with [`getActivatePrecompilesAt API`](#getActivatePrecompilesAt) and the current chain config with [`getChainConfig API`](#eth_getChainConfig).

Notice that `precompileUpgrades` entry correctly reflects the changes. That's it, your Subnet is all set and the desired upgrades will be activated at the indicated timestamp!

### Trustless Precompile Activation

Precompiles are contracts that has certain features. These features could only be triggered by privileged addresses in previous releases of subnet-evm. For example, the `feeManagerConfig` precompile allows privileged addresses to change the fee structure of the network:

```json
{
  "precompileUpgrades": [
    {
      "feeManagerConfig": {
        "blockTimestamp": 1668950000,
        "adminAddresses": ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"]
      }
    }
  ]
}
```

In this example, only the address `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC` is allowed to change the fee structure of the network. The admin address has to intract with the precompile in order to activate it's effect. I.e it needs to send a transaction with relevant fee structure to change it. This is a very powerful feature, but it also means that the network is vulnerable to a single point of failure. If the address `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC` is compromised, the network is compromised.

In order to make these precompiles more trustless, we have introduced a new way to activate precompiles without admin addresses. This is done by setting relevant precompile initial configuration in either as an upgrade or as a genesis configuration. For example, the `feeManagerConfig` precompile can be configured as follows to change the fee structure on the activation:

```json
{
  "precompileUpgrades": [
    {
      "feeManagerConfig": {
        "blockTimestamp": 1668950000,
        "initialFeeConfig": {
          "gasLimit": 20000000,
          "targetBlockRate": 2,
          "minBaseFee": 1000000000,
          "targetGas": 100000000,
          "baseFeeChangeDenominator": 48,
          "minBlockGasCost": 0,
          "maxBlockGasCost": 10000000,
          "blockGasCostStep": 500000
        }
      }
    }
  ]
}
```

Notice that there is no `adminAddresses` field in the configuration. This means that the precompile will be activated with the given configuration without any admin address. It also means there is no need to send a transaction to change the fee structure. The precompile will change the fee at the given timestamp.

This is a trustless way to activate precompiles.

_Note: If you trustlessly activate a precompile, then it will be activated as a precompile. If you want to change the configuration, you will need to first disable it then activate the precompile again with the new configuration._

See every precompile initial configuration in their relevant `Trustless Mode` sections under [Precompiles](#precompiles).

### eth_getChainConfig

`eth_getChainConfig` returns chain config with parsed upgrade bytes. This API is enabled by default with `internal-blockchain` namespace.

**Signature**

```sh
eth_getChainConfig({}) -> {chainConfig: json}
```

**Example Call**

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"eth_getChainConfig",
    "params" :[]
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/Nvqcm33CX2XABS62iZsAcVUkavfnzp1Sc5k413wn5Nrf7Qjt7/rpc
```

**Example Response**

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

### eth_getActivatePrecompilesAt

`eth_getActivatePrecompilesAt` returns activated precompiles at a specific timestamp. If no timestamp is provided it returns the latest block timestamp. This API is enabled by default with `internal-blockchain` namespace.

**Signature**

```sh
eth_getActivatePrecompilesAt([timestamp uint]) -> {precompiles: []Precompile}
```

- `timestamp` specifies the timestamp to show the precompiles active at this time. If omitted it shows precompiles activated at the latest block timestamp.

**Example Call**

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "eth_getActivatePrecompilesAt",
    "params": [],
    "id": 1
}'  -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/Nvqcm33CX2XABS62iZsAcVUkavfnzp1Sc5k413wn5Nrf7Qjt7/rpc
```

**Example Response**

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

## Chain Configs

As described in [this doc](../nodes/maintain/chain-config-flags.md#subnet-chain-configs), each blockchain of Subnets can have its own custom configuration. If a Subnet's chain id is `2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt`, the config file for this chain is located at `{chain-config-dir}/2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt/config.json`.

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

### Fee Recipient

This works together with [`allowFeeRecipients`](#setting-a-custom-fee-recipient) to specify where the fees should be sent to.

With `allowFeeRecipients` enabled, validators can specify their addresses to collect fees.

```json
{
  "feeRecipient": "<YOUR 0x-ADDRESS>"
}
```

:::warning

If `allowFeeRecipients` feature is enabled on the Subnet, but a validator doesn't specify a "feeRecipient", the fees will be burned in blocks it produces.

:::
