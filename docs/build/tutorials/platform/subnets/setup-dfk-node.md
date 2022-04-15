# Run a Node on DFK Subnet

## Introduction

We recently deployed the DFK subnet on Avalanche mainnet and successfully launched the [DFK chain](https://subnets.avax.network/defi-kingdoms/dfk-chain/explorer) on that subnet. This subnet is maintained by the [DeFi Kingdom](https://defikingdoms.com/)'s team and is based on Avalanche's [subnet-evm](https://github.com/ava-labs/subnet-evm).

A subnet, or subnetwork, is a dynamic set of validators working together to achieve consensus on the state of a set of blockchains. Each blockchain is validated by exactly one subnet. A subnet can validate many blockchains. A node may be a member of many subnets. You can learn more about subnets [here](../subnets/README.md).

[DeFi Kingdom](https://defikingdoms.com/) recently launched the [DFK Subnet](https://subnets.avax.network/defi-kingdoms/dfk-chain/explorer).

This tutorial will take you through the necessary steps to run your node on the DFK Subnet:

1) Build the AvalancheGo build directory
2) Build the plugin binary for the DFK subnet-evm
3) Whitelist the DFK Subnet
4) Run your node and validate the DFK Subnet!

## Requirement

There is a requirement to run a node on the DFK subnet - 

* You must be running a node on the Avalanche Primary Network. You can use this [guide](../../nodes-and-staking/run-avalanche-node.md) to set up your Avalanche node by building from source (recommended for this tutorial).
* You should be using the same machine as where you build AvalancheGo from source.

## Setup

We'll assume that you have followed the instructions to build AvalancheGo from source in [this guide](../../nodes-and-staking/run-avalanche-node.md) and are still in the AvalancheGo directory.
## Build Binary

First, we will assume that you're starting out in the AvalancheGo directory within your `$GOPATH`, and we will clone the DFK subnet-evm repository.

```bash
cd $GOPATH/src/github.com
mkdir DeFiKingdoms
cd DeFiKingdoms
git clone https://github.com/DefiKingdoms/subnet-evm
cd subnet-evm
```

Now that we are in the DeFiKingdoms/subnet-evm repository, we will build the binary and place it directly into the AvalancheGo `build/plugins` directory by passing in the location on the path we want to place the plugin binary (which was created when building AvalancheGo).

```bash
./scripts/build.sh $GOPATH/src/github.com/ava-labs/avalanchego/build/plugins/mDV3QWRXfwgKUWb9sggkv4vQxAQR4y2CyKrt5pLZ5SzQ7EHBv
```

The long string `mDV3QWRXfwgKUWb9sggkv4vQxAQR4y2CyKrt5pLZ5SzQ7EHBv` is the CB58 encoded VMID of the DFK subnet-evm. AvalancheGo will use the name of this file to determine what VMs are available to run from the `plugins` directory.

## Whitelisting DFK Subnet and Restarting the Node

AvalancheGo will only validate the primary network by default. In order to add the DFK Subnet, we will need to add the DFK Subnet ID to the set of whitelisted subnets in the node's config file or pass it through the command line options of the node. Once the node's config file has been updated, you will need to restart the Avalanche node (if running), or start the node to begin syncing both the Primary Network and the DFK Subnet with the new parameters as well as with the plugin binary in the correct place.

### Updating Config File

You can skip this section if you want to pass whitelisted subnets through command-line flags.

You need to edit your existing config file for your node. In this tutorial we will create a config file at: `~/.avalanchego/config.json`. If you are not using any config file, then you can create a JSON file anywhere on your file system and specify the config file when running your AvalancheGo node at the command line.

You will need to add the DFK Subnet ID to the whitelisted subnets section of the config file:

```json
{
    <OTHER-CONFIGURATIONS>
    "whitelisted-subnets": "Vn3aX6hNRstj5VHHm63TCgPNaeGnRSqCYXQqemSqDd2TQH4qJ"
}
```

Whitelisted subnets is a comma separated list of subnet IDs, so if you are validating more than one subnet, you can simply add a comma to the end of the list and append the DFK Subnet ID `Vn3aX6hNRstj5VHHm63TCgPNaeGnRSqCYXQqemSqDd2TQH4qJ`.

### Running the Node

First, make sure to shut down your node in case it is still running. Then, we will navigate back into the AvalancheGo directory and launch the node.

If you went through the steps to set up a config file, then you can launch your node by specifying the config file on the command line:

```bash
./avalanchego/build/avalanchego --config-file ~/.avalanchego/config.json
```

If you want to pass the whitelisted subnets through the command line flag. You can append the other flags or even the `--config-file` flag as well, according to your need.

```bash
./avalanchego/build/avalanchego --whitelisted-subnets Vn3aX6hNRstj5VHHm63TCgPNaeGnRSqCYXQqemSqDd2TQH4qJ
```
