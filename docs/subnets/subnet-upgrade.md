# How to Upgrade a Subnet

In the course of Subnet operation, you will inevitably need to upgrade or change some part of the software stack that is running your Subnet. If nothing else, you will have to upgrade the AvalancheGo node client. Same goes for the VM plugin binary that is used to run the blockchain on your Subnet, which is most likely the subnet-evm, the Subnet implementation of the Ethereum virtual machine. Also, you may want to change the configuration of the VM. This tutorial will guide you through the process of doing various Subnet upgrades and changes. We will point out things to watch out for and precautions you need to be mindful about.

:::warning
Upgrades are pretty delicate operations you need to be very careful about because wrong configuration, procedural mistakes or a botched upgrade can halt your subnet or even lead to data loss!
:::  

## General upgrade considerations

When operating a Subnet, you should always keep in mind that Proof of Stake networks like Avalanche can only make progress if sufficient amount of validating nodes are connected and processing transactions. Each validator on a Subnet is assigned a certain `weight`, which is a numerical value representing the significance of the node in consensus decisions. On the Primary Network, weight is equal to the amount of AVAX staked on the node. On Subnets, weight is currently assigned by the Subnet owners when they issue the transaction [adding a validator](../apis/avalanchego/apis/p-chain.md#platformaddsubnetvalidator) to the Subnet.

Subnets can operate normally only if validators representing 80% or more of the cumulative validator weight is connected. If the amount of connected stake falls close to or below 80% Subnet performance (time to finality) will suffer, and ultimately the Subnet will halt (stop processing transactions).

You as a Subnet operator need to ensure that whatever you do, at least 80% of the validators' cumulative weight is connected and working.

:::info
When assigning weight to the nodes, always use values greater than 20, as that is the default value of `snow-sample-size` network parameter and thus a minimum cumulative amount that is needed for normal Subnet operation. Recall that a validator's weight can't be changed while it is validating, so take care to use an appropriate value.
:::

## Upgrading subnet validator nodes

AvalancheGo, the node client that is running the Avalanche validators is under constant and rapid development. New versions come out often (roughly every two weeks), bringing added capabilities, performance improvements or security fixes. Updates are usually optional, but from time to time (much rarely than regular updates) there will be an update that includes a network upgrade. Those upgrades are mandatory, and any node that does not upgrade in time will go offline when the network upgrade activates.

That's why having a node upgrade strategy is pretty important, and you should always strive to run the latest version of the AvalancheGo client.

For a general guide on upgrading AvalancheGo check out [this tutorial](../nodes/maintain/upgrade-your-avalanchego-node.md). When upgrading Subnet nodes and keeping in mind the previous section, make sure to stagger node upgrades and start a new upgrade only once the previous node has successfully upgraded. Use the [Health API](../apis/avalanchego/apis/health.md#healthhealth) to check that `healthy` value in the response is `true` on the upgraded node, and on other Subnet validators check that [platform.getCurrentValidators()](../apis/avalanchego/apis/p-chain.md#platformgetcurrentvalidators) has `true` in `connected` attribute for the upgraded nodes `nodeID`. Once those two conditions are satisfied, node is confirmed to be online and validating the Subnet and you can start upgrading another node.

Continue the upgrade cycle until all the Subnet nodes are upgraded.

## Upgrading subnet VM plugin binaries

Besides the AvalancheGo client itself, new versions get released for the VM binaries that run the blockchains on the Subnet. On most Subnets, that is the [subnet-evm](https://github.com/ava-labs/subnet-evm), so we'll discuss that, but the procedure is the similar for other VMs as well.

All the considerations for doing staggered node upgrades as discussed in previous section are valid for VM upgrades as well.

In the future, VM upgrades will be handled by the [AvalancheCLI tool](https://github.com/ava-labs/avalanche-cli), but for now we need to do it manually.

Go to the [releases page](https://github.com/ava-labs/subnet-evm/releases) of the subnet-evm repository. Locate the latest version, and copy link that corresponds to the OS and architecture of the machine the node is running on (`darwin` = Mac, `amd64` = Intel/AMD processor, `arm64` = Arm processor). Log into the machine where the node is running and download the archive, using `wget` and the link to the archive, like this:

```bash
wget https://github.com/ava-labs/subnet-evm/releases/download/v0.2.9/subnet-evm_0.2.9_linux_amd64.tar.gz
```
This will download the archive to the machine. Unpack it like this (use the correct filename, of course):
```bash
tar xvf subnet-evm_0.2.9_linux_amd64.tar.gz
```
This will unpack and place the contents of the archive in the current directory, file `subnet-evm` is the plugin binary. You need to stop the node now (if the node is running as a service, use `sudo systemctl stop avalanchego` command). You need to place that file into the plugins directory where the AvalancheGo binary is located. If the node is installed using the install script, the path will be `~/avalanche-node/plugins` Instead of the `subnet-evm` filename, VM binary needs to be named as the VM ID of the chain on the Subnet. For example, for the [WAGMI Subnet](https://subnets-test.avax.network/wagmi) that VM ID is `srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy`. So, the command to copy the new plugin binary would look like:
```bash
cp subnet-evm ~/avalanche-node/plugins/srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy
```
After you do that, you can start the node back up (if running as service do `sudo systemctl start avalanchego`). You can monitor the log output on the node to check that everything is ok, or you can use the [info.getNodeVersion()](https://docs.avax.network/apis/avalanchego/apis/info#infogetnodeversion) API to check the versions. Example output would look like:
```json
{
    "jsonrpc": "2.0",
    "result": {
        "version": "avalanche/1.7.18",
        "databaseVersion": "v1.4.5",
        "gitCommit": "b6d5827f1a87e26da649f932ad649a4ea0e429c4",
        "vmVersions": {
            "avm": "v1.7.18",
            "evm": "v0.8.15",
            "platform": "v1.7.18",
            "sqja3uK17MJxfC7AN8nGadBw9JK5BcrsNwNynsqP5Gih8M5Bm": "v0.0.7",
            "srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy": "v0.2.9"
        }
    },
    "id": 1
}
```
Note that entry next to the VM ID we upgraded correctly says `v0.2.9`. You have successfully upgraded the VM!

Refer to the previous section on how to make sure node is healthy and connected before moving on to upgrading the next Subnet validator.

## Changing subnet configuration

Sometimes you need to do a Subnet upgrade to change the configuration and rules under which the Subnet operates. As before we will discuss `subnet-evm` upgrades, as that is the most commonly used Subnet VM.

In regular EVM network upgrades are a pretty involved process that includes deploying the new EVM binary, coordinating the timed upgrade and deploying changes to the nodes. But since [Subnet-EVM v0.2.8](https://github.com/ava-labs/subnet-evm/releases/tag/v0.2.8), we introduced the long awaited feature to perform network upgrades by just using a few lines of JSON. Upgrades can consist of enabling/disabling particular precompiles, or changing their parameters. Currently available precompiles allow you to:
- Restrict Smart Contract Deployers
- Restrict Who Can Submit Transactions
- Mint Native Coins
- Configure Dynamic Fees

Please refer to [Customize a Subnet](customize-a-subnet.md) tutorial for a detailed discussion of all Subnet customization capabilities.

The upgrades we want to make on a Subnet must be specified in a file named `upgrade.json` which should be placed in the same directory where [`config.json`](../nodes/maintain/chain-config-flags.md#subnet-chain-configs) resides: `{chain-config-dir}/{blockchainID}/upgrade.json`. For example, `WAGMI Subnet` upgrade should be placed in `~/.avalanchego/configs/chains/2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt/upgrade.json`.

The content of the `upgrade.json` should be formatted according to the following:

```json
{
  "precompileUpgrades": [
    {
      "[PRECOMPILE_NAME]": {
        "[PARAMETER]": "[VALUE]",
        "blockTimestamp": "[ACTIVATION_TIMESTAMP]"
      }
    }
  ]
}
```
For example, contents of the `upgrade.json` might look like:
```json
{
  "precompileUpgrades": [
    {
      "feeManagerConfig": {
        "adminAddresses": ["0x6f0f6DA1852857d7789f68a28bba866671f3880D"],
        "blockTimestamp": 1660658400
      }
    }
  ]
}
```
With the above we intend to change the FeeManager precompile `adminAddresses` to `0x6f0f6DA1852857d7789f68a28bba866671f3880D` at timestamp `1660658400`, which is the [Unix timestamp](https://www.unixtimestamp.com/) for 10:00 AM EDT 08/16/2022.

Please refer to [Customize a Subnet](customize-a-subnet.md#network-upgrades-enabledisable-precompiles) for a detailed discussion of possible precompile upgrade parameters.

After you have created the `upgrade.json` and placed it in the chain config directory, you need to restart the node for the upgrade file to be loaded (again, mke sure you don't restart all Subnet validators at once!). On node restart, it will print out the configuration of the chain, where you can double-check that the upgrade has loaded correctly. In our example:
```text
INFO [08-15|15:09:36.772] <2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt Chain>
github.com/ava-labs/subnet-evm/eth/backend.go:155: Initialised chain configuration
config=“{ChainID: 11111 Homestead: 0 EIP150: 0 EIP155: 0 EIP158: 0 Byzantium: 0
Constantinople: 0 Petersburg: 0 Istanbul: 0, Muir Glacier: 0, Subnet EVM: 0, FeeConfig:
{\“gasLimit\“:20000000,\“targetBlockRate\“:2,\“minBaseFee\“:1000000000,\“targetGas\
“:100000000,\“baseFeeChangeDenominator\“:48,\“minBlockGasCost\“:0,\“maxBlockGasCost\
“:10000000,\“blockGasCostStep\“:500000}, AllowFeeRecipients: false, NetworkUpgrades: {\
“subnetEVMTimestamp\“:0}, PrecompileUpgrade: {}, UpgradeConfig: {\“precompileUpgrades\“:
[{\“feeManagerConfig\“:{\“adminAddresses\“:[\
“0x6f0f6da1852857d7789f68a28bba866671f3880d\“],\“blockTimestamp\“:1660658400}}]},
Engine: Dummy Consensus Engine}”
```
Notice that `precompileUpgrades` entry correctly reflects the changes. That's it, your Subnet is all set and the desired upgrades will be activated at the indicated timestamp!

## Summary

Vital part of Subnet maintenance is performing timely upgrades at all levels of the software stack running your Subnet. We hope this tutorial will give you enough information and context to allow you to do those upgrades with confidence and ease. If you have additional questions or any issues, please reach out to us on [Discord](https://chat.avalabs.org).
