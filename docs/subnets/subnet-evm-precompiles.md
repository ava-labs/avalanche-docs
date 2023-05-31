## Precompiles

Subnet-EVM can provide custom functionalities with precompiled contracts. These precompiled
contracts can be activated through `ChainConfig` (in genesis or as an upgrade).

### AllowList Interface

The `AllowList` interface is used by precompiles to check if a given address is allowed to use a
precompiled contract. `AllowList` consist of two main roles, `Admin` and `Enabled`. `Admin` can
add/remove other `Admin` and `Enabled` addresses. `Enabled` addresses can use the precompiled
contract, but cannot modify other roles.

`AllowList` adds `adminAddresses` and `enabledAddresses` fields to precompile contract configurations.
For instance fee manager precompile contract configuration looks like this:

```json
{
  "feeManagerConfig": {
    "blockTimestamp": 0,
    "adminAddresses": [<list of addresses>],
    "enabledAddresses": [<list of addresses>]
  }
}
```

`AllowList` configuration affects only the related precompile. For instance, the admin address in
`feeManagerConfig` does not affect admin addresses in other activated precompiles.

The `AllowList` solidity interface is defined as follows, and can be found in [IAlowList.sol](https://github.com/ava-labs/subnet-evm/blob/5faabfeaa021a64c2616380ed2d6ec0a96c8f96d/contract-examples/contracts/IAllowList.sol):

```solidity
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IAllowList {
  // Set [addr] to have the admin role over the precompile
  function setAdmin(address addr) external;

  // Set [addr] to be enabled on the precompile contract.
  function setEnabled(address addr) external;

  // Set [addr] to have no role the precompile contract.
  function setNone(address addr) external;

  // Read the status of [addr].
  function readAllowList(address addr) external view returns (uint256 role);
}
```

`readAllowList(addr)` will return a uint256 with a value of 0, 1, or 2, corresponding to the roles
`None`, `Enabled`, and `Admin` respectively.

_Note: `AllowList` is not an actual contract but just an interface. It's not callable by itself._
_This is used by other precompiles. Check other precompile sections to see how this works._

### Restricting Smart Contract Deployers

If you'd like to restrict who has the ability to deploy contracts on your
Subnet, you can provide an `AllowList` configuration in your genesis or upgrade file:

```json
{
  "contractDeployerAllowListConfig": {
    "blockTimestamp": 0,
    "adminAddresses": ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"]
  }
}
```

In this example, `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC` is named as the
`Admin` of the `ContractDeployerAllowList`. This enables it to add other `Admin` or to add
`Enabled` addresses. Both `Admin` and `Enabled` can deploy contracts. To provide
a great UX with factory contracts, the `tx.Origin` is checked for being a valid
deployer instead of the caller of `CREATE`. This means that factory contracts will still be
able to create new contracts as long as the sender of the original transaction is an allow
listed deployer.

The `Stateful Precompile` contract powering the `ContractDeployerAllowList` adheres to the
[AllowList Solidity interface](#allowlist-interface) at `0x0200000000000000000000000000000000000000`
(you can load this interface and interact directly in Remix):

- If you attempt to add a `Enabled` and you are not an `Admin`, you will see
  something like:
  ![admin fail](/img/admin_fail.png)

- If you attempt to deploy a contract but you are not an `Admin` not
  a `Enabled`, you will see something like:
  ![deploy fail](/img/deploy_fail.png)

- If you call `readAllowList(addr)` then you can read the current role of `addr`, which will return
  a uint256 with a value of 0, 1, or 2, corresponding to the roles `None`, `Enabled`, and `Admin` respectively.

:::warning

If you remove all of the admins from the allow list, it will no longer be possible to update the
allow list without modifying the Subnet-EVM to schedule a network upgrade.

:::

#### Initial Contract Allow List Configuration

It's possible to enable this precompile with an initial configuration to activate its effect on
activation timestamp. This provides a way to enable the precompile without an admin address to manage
the deployer list. With this, you can define a list of addresses that are allowed to deploy contracts.
Since there will be no admin address to manage the deployer list, it can only be modified through a
network upgrade. To use initial configuration, you need to specify addresses in `enabledAddresses`
field in your genesis or upgrade file:

```json
{
  "contractDeployerAllowListConfig": {
    "blockTimestamp": 0,
    "enabledAddresses": ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"]
  }
}
```

This will allow only `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC` to deploy contracts. For further
information about precompile initial configurations see [Initial Precompile Configurations](#initial-precompile-configurations).

### Restricting Who Can Submit Transactions

Similar to restricting contract deployers, this precompile restricts which addresses may submit
transactions on chain. Like the previous section, you can activate the precompile by including an
`AllowList` configuration in your genesis file:

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
`Allowed`. Both `Admins` and `Enabled` can submit transactions to the chain.

The `Stateful Precompile` contract powering the `TxAllowList` adheres to the
[AllowList Solidity interface](#allowlist-interface) at `0x0200000000000000000000000000000000000002`
(you can load this interface and interact directly in Remix):

- If you attempt to add an `Enabled` and you are not an `Admin`, you will see
  something like:
  ![admin fail](/img/admin_fail.png)

- If you attempt to submit a transaction but you are not an `Admin` or not
  `Enabled`, you will see something like: `cannot issue transaction from non-allow listed address`

- If you call `readAllowList(addr)` then you can read the current role of `addr`, which will return
  a `uint256` with a value of 0, 1, or 2, corresponding to the roles `None`, `Allowed`, and `Admin` respectively.

:::warning

If you remove all of the admins from the allow list, it will no longer be possible to update the
allow list without modifying the Subnet-EVM to schedule a network upgrade.

:::

#### Initial TX Allow List Configuration

It's possible to enable this precompile with an initial configuration to activate its effect on
activation timestamp. This provides a way to enable the precompile without an admin address to manage
the TX allow list. With this, you can define a list of addresses that are allowed to submit
transactions. Since there will be no admin address to manage the TX list, it can only be modified
through a network upgrade. To use initial configuration, you need to specify addresses in
`enabledAddresses` field in your genesis or upgrade file:

```json
{
  "txAllowListConfig": {
    "blockTimestamp": 0,
    "enabledAddresses": ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"]
  }
}
```

This will allow only `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC` to submit transactions. For further
information about precompile initial configurations see [Initial Precompile Configurations](#initial-precompile-configurations).

### Minting Native Coins

You can mint native(gas) coins with a precompiled contract. In order to activate this feature, you
can provide `nativeMinterConfig` in genesis:

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

`adminAddresses` denotes admin accounts who can add other `Admin` or `Enabled` accounts. `Admin` and
`Enabled` are both eligible to mint native coins for other addresses. `ContractNativeMinter` uses
same methods as in `ContractDeployerAllowList`.

The `Stateful Precompile` contract powering the `ContractNativeMinter` adheres to the following
Solidity interface at `0x0200000000000000000000000000000000000001` (you can load this interface and
interact directly in Remix):

```solidity
// (c) 2022-2023, Ava Labs, Inc. All rights reserved.
// See the file LICENSE for licensing terms.

pragma solidity ^0.8.0;
import "./IAllowList.sol";

interface INativeMinter is IAllowList {
  // Mint [amount] number of native coins and send to [addr]
  function mintNativeCoin(address addr, uint256 amount) external;
}
```

`mintNativeCoin` takes an address and amount of native coins to be minted. The amount denotes the
amount in minimum denomination of native coins (10^18). For example, if you want to mint 1 native
coin (in AVAX), you need to pass 1 \* 10^18 as the amount.

Note that this uses `IAllowList` interface directly, meaning that it uses the same `AllowList`
interface functions like `readAllowList` and `setAdmin`, `setEnabled`, `setNone`. For more information
see [AllowList Solidity interface](#allowlist-interface).

:::warning

EVM does not prevent overflows when storing the address balance. Overflows in
balance opcodes are handled by setting the
balance to maximum. However the same won't apply for API calls. If you try to mint more than the
maximum balance, API calls will return the overflowed hex-balance. This can break external
tooling. Make sure the total supply of native coins is always less than 2^256-1.

:::

#### Initial Native Minter Configuration

It's possible to enable this precompile with an initial configuration to activate its effect on
activation timestamp. This provides a way to enable the precompile without an admin address to mint
native coins. With this, you can define a list of addresses that will receive an initial mint of the
native coin when this precompile activates. This can be useful for networks that require a one-time
mint without specifying any admin addresses. To use initial configuration, you need to specify a map
of addresses with their corresponding mint amounts in `initialMint` field in your genesis or upgrade
file:

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

In the amount field you can specify either decimal or hex string. This will mint 1000000000000000000
(equivalent of 1 Native Coin denominated as 10^18) to both addresses. Note that these are both in
string format. "0xde0b6b3a7640000" hex is equivalent to 1000000000000000000. For further information
about precompile initial configurations see [Initial Precompile Configurations](#initial-precompile-configurations).

### Configuring Dynamic Fees

You can configure the parameters of the dynamic fee algorithm on chain using the `FeeConfigManager`.
In order to activate this feature, you will need to provide the `FeeConfigManager` in the genesis:

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

The precompile implements the `FeeManager` interface which includes the same `AllowList` interface
used by ContractNativeMinter, TxAllowList, etc. For an example of the `AllowList` interface, see the
[TxAllowList](#allowlist-interface) above.

The `Stateful Precompile` contract powering the `FeeConfigManager` adheres to the following Solidity
interface at `0x0200000000000000000000000000000000000003` (you can load this interface and interact
directly in Remix). It can be also found in
[IFeeManager.sol](https://github.com/ava-labs/subnet-evm/blob/5faabfeaa021a64c2616380ed2d6ec0a96c8f96d/contract-examples/contracts/IFeeManager.sol):

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

FeeConfigManager precompile uses `IAllowList` interface directly, meaning that it uses the same
`AllowList` interface functions like `readAllowList` and `setAdmin`, `setEnabled`, `setNone`. For
more information see [AllowList Solidity interface](#allowlist-interface).

In addition to the `AllowList` interface, the FeeConfigManager adds the following capabilities:

- `getFeeConfig` - retrieves the current dynamic fee config
- `getFeeConfigLastChangedAt` - retrieves the timestamp of the last block where the fee config was updated
- `setFeeConfig` - sets the dynamic fee config on chain (see [here](#fee-config) for details on the
  fee config parameters)

You can also get the fee configuration at a block with the `eth_feeConfig` RPC method. For more
information see [here](../apis/avalanchego/apis/subnet-evm.md#eth_feeconfig).

#### Initial Fee Config Configuration

It's possible to enable this precompile with an initial configuration to activate its effect on
activation timestamp. This provides a way to define your fee structure to take effect at the
activation. To use the initial configuration, you need to specify the fee config in
`initialFeeConfig` field in your genesis or upgrade file:

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

This will set the fee config to the values specified in the `initialFeeConfig` field. For further
information about precompile initial configurations see [Initial Precompile Configurations](#initial-precompile-configurations).

### Changing Fee Reward Mechanisms

Fee reward mechanism can be configured with this stateful precompile contract called as
`RewardManager`. Configuration can include burning fees, sending fees to a predefined address, or
enabling fees to be collected by block producers. This precompile can be configured as follows in
the genesis file:

```json
{
  "config": {
    "rewardManagerConfig": {
      "blockTimestamp": 0,
      "adminAddresses": ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"]
    }
  }
}
```

`adminAddresses` denotes admin accounts who can add other `Admin` or `Enabled` accounts. `Admin` and
`Enabled` are both eligible to change the current fee mechanism.

The precompile implements the `RewardManager` interface which includes the `AllowList` interface.
For an example of the `AllowList` interface, see the [TxAllowList](#allowlist-interface) above.

The `Stateful Precompile` contract powering the `RewardManager` adheres to the following Solidity
interface at `0x0200000000000000000000000000000000000004` (you can load this interface and interact
directly in Remix). It can be also found in
[IRewardManager.sol](https://github.com/ava-labs/subnet-evm/blob/5faabfeaa021a64c2616380ed2d6ec0a96c8f96d/contract-examples/contracts/IRewardManager.sol):

```solidity
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./IAllowList.sol";

interface IRewardManager is IAllowList {
  // setRewardAddress sets the reward address to the given address
  function setRewardAddress(address addr) external;

  // allowFeeRecipients allows block builders to claim fees
  function allowFeeRecipients() external;

  // disableRewards disables block rewards and starts burning fees
  function disableRewards() external;

  // currentRewardAddress returns the current reward address
  function currentRewardAddress() external view returns (address rewardAddress);

  // areFeeRecipientsAllowed returns true if fee recipients are allowed
  function areFeeRecipientsAllowed() external view returns (bool isAllowed);
}
```

`RewardManager` precompile uses `IAllowList` interface directly, meaning that it uses the same
`AllowList` interface functions like `readAllowList` and `setAdmin`, `setEnabled`, `setNone`. For
more information see [AllowList Solidity interface](#allowlist-interface).

In addition to the `AllowList` interface, the `RewardManager` adds the following capabilities:

- `setRewardAddress` - sets the address to which fees are sent. This address can be a contract or a
  user address. The address becomes the required coinbase address for the blocks that this mechanism
  is enabled on. Meaning that it will receive the fees collected from the transactions in the block.
  Receiving fees will not call any contract functions or fallback functions. It will simply increase
  the balance of the address by the amount of fees.

- `allowFeeRecipients` - enables block producers to claim fees. This will allow block producers to
  claim fees by specifying their own addresses in their chain configs. See [here](#fee-recipient)
  for more information on how to specify the fee recipient address in the chain config.

- `disableRewards` - disables block rewards and starts burning fees.

- `currentRewardAddress` - returns the current reward address. This is the address to which fees are
  sent. It can include black hole address (`0x010...0`) which means that fees are burned. It can also
  include a predefined hash (`0x0000000000000000000000000000000000000000`) denoting custom fee
  recipients are allowed. It's advised to use the `areFeeRecipientsAllowed` function to check if
  custom fee recipients are allowed first.

- `areFeeRecipientsAllowed` - returns true if custom fee recipients are allowed.

These 3 mechanisms (burning, sending to a predefined address, and enabling fees to be collected by
block producers) cannot be enabled at the same time. Enabling one mechanism will take over the
previous mechanism. For example, if you enable `allowFeeRecipients` and then enable
`disableRewards`, the `disableRewards` will take over and fees will be burned.

_Note: Reward addresses or fee recipient addresses are not required to be an admin or enabled account._

#### Initial Configuration

It's possible to enable this precompile with an initial configuration to activate its effect on
activation timestamp. This provides a way to enable the precompile without an admin address to
change the fee reward mechanism. This can be useful for networks that require a one-time reward
mechanism change without specifying any admin addresses. Without this initial configuration, the
precompile will inherit the `feeRecipients` mechanism activated at genesis. Meaning that if
`allowFeeRecipients` is set to true in the genesis file, the precompile will be enabled with the
`allowFeeRecipients` mechanism. Otherwise it will keep burning fees. To use the initial
configuration, you need to specify the initial reward mechanism in `initialRewardConfig` field in
your genesis or upgrade file.

In order to allow custom fee recipients, you need to specify the `allowFeeRecipients` field in the `initialRewardConfig`:

```json
{
  "rewardManagerConfig": {
    "blockTimestamp": 0,
    "initialRewardConfig": {
      "allowFeeRecipients": true
    }
  }
}
```

In order to set an address to receive all transaction rewards, you need to specify the
`rewardAddress` field in the `initialRewardConfig`:

```json
{
  "rewardManagerConfig": {
    "blockTimestamp": 0,
    "initialRewardConfig": {
      "rewardAddress": "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"
    }
  }
}
```

In order to disable rewards and start burning fees, you need to leave all fields in the
`initialRewardConfig` empty:

```json
{
  "rewardManagerConfig": {
    "blockTimestamp": 0,
    "initialRewardConfig": {}
  }
}
```

However this is different than the default behavior of the precompile. If you don't specify the
`initialRewardConfig` field, the precompile will inherit the `feeRecipients` mechanism activated at
genesis. Meaning that if `allowFeeRecipients` is set to true in the genesis file, the precompile
will be enabled with the `allowFeeRecipients` mechanism. Otherwise it will keep burning fees.
Example
configuration for this case:

```json
{
  "rewardManagerConfig": {
    "blockTimestamp": 0,
    "adminAddresses": ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"]
  }
}
```

If `allowFeeRecipients` and `rewardAddress` are both specified in the `initialRewardConfig` field
then an error will be returned and precompile won't be activated. For further information about
precompile initial configurations see [Initial Precompile
Configurations](#initial-precompile-configurations).

## Contract Examples

Subnet-EVM contains example contracts for precompiles under `/contract-examples`. It's a hardhat
project with tests, tasks. For more information see [contract examples README](https://github.com/ava-labs/subnet-evm/tree/master/contract-examples#subnet-evm-contracts).