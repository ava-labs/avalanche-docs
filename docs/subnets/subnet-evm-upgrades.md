# Network Upgrades 

## Enable/Disable Precompiles

:::warning

Performing a network upgrade requires coordinating the upgrade network-wide. A network upgrade
changes the rule set used to process and verify blocks, such that any node that upgrades incorrectly
or fails to upgrade by the time that upgrade goes into effect may become out of sync with the rest
of the network.

Any mistakes in configuring network upgrades or coordinating them on validators may cause the network
to halt and recovering may be difficult.

:::

In addition to specifying the configuration for each of the above precompiles in the genesis chain
config, they can be individually enabled or disabled at a given timestamp as a network upgrade.
Disabling a precompile disables calling the precompile and destructs its storage so it can be enabled
at a later timestamp with a new configuration if desired.

These upgrades must be specified in a file named `upgrade.json` placed in the same directory where
[`config.json`](subnet-evm-avalanchego-config.md) resides: `{chain-config-dir}/{blockchainID}/upgrade.json`.
For example, `WAGMI Subnet` upgrade should be placed in
`~/.avalanchego/configs/chains/2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt/upgrade.json`.

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

:::warning

An invalid `blockTimestamp` in an upgrade file results the update failing.
The `blockTimestamp` value should be set to a valid Unix timestamp value which is
in the _future_ relative to the _head of the chain_.
If the node encounters a `blockTimestamp` which is in the past, it will fail on startup.

:::

To disable a precompile, the following format should be used:

<!-- markdownlint-disable MD013 -->

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

<!-- markdownlint-enable MD013 -->

Each item in `precompileUpgrades` must specify exactly one precompile to enable or disable and the
block timestamps must be in increasing order. Once an upgrade has been activated (a block after the
specified timestamp has been accepted), it must always be present in `upgrade.json` exactly as it
was configured at the time of activation (otherwise the node will refuse to start).

Enabling and disabling a precompile is a network upgrade and should always be done with caution.

:::danger

For safety, you should always treat `precompileUpgrades` as append-only.

As a last resort measure, it is possible to abort or reconfigure a precompile upgrade that has not
been activated since the chain is still processing blocks using the prior rule set.

:::

If aborting an upgrade becomes necessary, you can remove the precompile upgrade from `upgrade.json`
from the end of the list of upgrades. As long as the blockchain has not accepted a block with a
timestamp past that upgrade's timestamp, it will abort the upgrade for that node.

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

This example enables the `feeManagerConfig` at the first block with timestamp >= `1668950000`, enables
`txAllowListConfig` at the first block with timestamp >= `1668960000`, and disables `feeManagerConfig`
at the first block with timestamp >= `1668970000`.

When a precompile disable takes effect (that is, after its `blockTimestamp` has passed), its storage
will be wiped. If you want to reenable it, you will need to treat it as a new configuration.

After you have created the `upgrade.json` and placed it in the chain config directory, you need to
restart the node for the upgrade file to be loaded (again, make sure you don't restart all Subnet
validators at once!). On node restart, it will print out the configuration of the chain, where you
can double-check that the upgrade has loaded correctly. In our example:

<!-- markdownlint-disable MD013 -->

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

<!-- markdownlint-enable MD013 -->

Notice that `precompileUpgrades` entry correctly reflects the changes. You can also check the
activated precompiles at a timestamp with the
[`eth_getActivePrecompilesAt`](../apis/avalanchego/apis/subnet-evm.md#eth_getactiveprecompilesat)
RPC method. The [`eth_getChainConfig`](../apis/avalanchego/apis/subnet-evm.md#eth_getchainconfig)
RPC method will also return the configured upgrades in the response.

That's it, your Subnet is all set and the desired upgrades will be activated at the indicated timestamp!

### Initial Precompile Configurations

Precompiles can be managed by some privileged addresses to change their configurations and activate
their effects. For example, the `feeManagerConfig` precompile can have `adminAddresses` which can
change the fee structure of the network.

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

In this example, only the address `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC` is allowed to change
the fee structure of the network. The admin address has to call the precompile in order to activate
its effect; that is it needs to send a transaction with a new fee config to perform the update.
This is a very powerful feature, but it also gives a large amount of power to the admin address. If
the address `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC` is compromised, the network is compromised.

With the initial configurations, precompiles can immediately activate their effect on the activation
timestamp. With this way admin addresses can be omitted from the precompile configuration. For example,
the `feeManagerConfig` precompile can have `initialFeeConfig` to setup the fee configuration on the
activation:

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

Notice that there is no `adminAddresses` field in the configuration. This means that there will be
no admin addresses to manage the fee structure with this precompile. The precompile will simply
update the fee configuration to the specified fee config when it activates on the `blockTimestamp` `1668950000`.

:::note
It's still possible to add `adminAddresses` or `enabledAddresses` along with these initial
configurations. In this case, the precompile will be activated with the initial configuration, and
admin/enabled addresses can access to the precompiled contract normally.
:::

:::info

If you want to change the precompile initial configuration, you will need to first disable it then
activate the precompile again with the new configuration.

:::

See every precompile initial configuration in their relevant `Initial Configuration` sections under [Precompiles](subnet-evm-precompiles.md).


## Network Upgrades: State Upgrades

Subnet-EVM allows the network operators to specify a modification to state that will take place
at the beginning of the first block with a timestamp greater than or equal to the one specified
in the configuration.

This provides a last resort path to updating non-upgradeable contracts via a network upgrade
(for example, to fix issues when you are running your own blockchain).

:::warning

This should only be used as a last resort alternative to forking `subnet-evm` and specifying
the network upgrade in code.

Using a network upgrade to modify state is not part of normal operations of the
EVM. You should ensure the modifications do not invalidate any of the assumptions of
deployed contracts or cause incompatibilities with downstream infrastructure such as
block explorers.

:::

The timestamps for upgrades in `stateUpgrades` must be in increasing order.
`stateUpgrades` can be specified along with `precompileUpgrades` or by itself.

The following three state modifications are supported:

- `balanceChange`: adds a specified amount to the balance of a given account. This amount can be
  specified as hex or decimal and must be positive.
- `storage`: modifies the specified storage slots to the specified values. Keys and values must
  be 32 bytes specified in hex, with a `0x` prefix.
- `code`: modifies the code stored in the specified account. The
  code must _only_ be the runtime portion of a code. The code must start with a `0x` prefix.

:::warning

If modifying the code, _only_ the runtime portion of the bytecode should be provided in
`upgrades.json`. Do not use the bytecode that would be used for deploying a new contract, as this
includes the constructor code as well. Refer to your compiler's documentation for information
on how to find the runtime portion of the contract you wish to modify.

:::

The `upgrades.json` file shown below describes a network upgrade that will make the following
state modifications at the first block after (or at) `March 8, 2023 1:30:00 AM GMT`:

- Sets the code for the account at `0x71562b71999873DB5b286dF957af199Ec94617F7`,
- And adds `100` wei to the balance of the account at `0xb794f5ea0ba39494ce839613fffba74279579268`,
- Sets the storage slot `0x1234` to the value `0x6666` for the account at `0xb794f5ea0ba39494ce839613fffba74279579268`.

```json
{
  "stateUpgrades": [
    {
      "blockTimestamp": 1678239000,
      "accounts": {
        "0x71562b71999873DB5b286dF957af199Ec94617F7": {
          "code": "0x6080604052348015600f57600080fd5b506004361060285760003560e01c80632e64cec114602d575b600080fd5b60336047565b604051603e91906067565b60405180910390f35b60008054905090565b6000819050919050565b6061816050565b82525050565b6000602082019050607a6000830184605a565b9291505056fea26469706673582212209421042a1fdabcfa2486fb80942da62c28e61fc8362a3f348c4a96a92bccc63c64736f6c63430008120033"
        },
        "0xb794f5ea0ba39494ce839613fffba74279579268": {
          "balanceChange": "0x64",
          "storage": {
            "0x0000000000000000000000000000000000000000000000000000000000001234": "0x0000000000000000000000000000000000000000000000000000000000006666"
          }
        }
      }
    }
  ]
}
```
