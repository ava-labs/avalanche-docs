# Run a Node on DFK Subnet

## Introduction

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

First, we will assume that you're starting out in the AvalancheGo directory within your `$GOPATH`, and you will clone the DFK subnet-evm repository.

```bash
cd $GOPATH/src/github.com
mkdir DeFiKingdoms
cd DeFiKingdoms
git clone https://github.com/DefiKingdoms/subnet-evm
cd subnet-evm
```

Now that you are in the DeFiKingdoms/subnet-evm repository, you will build the binary and place it directly into the AvalancheGo `build/plugins` directory. To do this, you will pass in the desired path to place the plugin binary. You will want to place this binary into the plugins directory of AvalancheGo, which was created when building AvalancheGo from source.

```bash
./scripts/build.sh $GOPATH/src/github.com/ava-labs/avalanchego/build/plugins/mDV3QWRXfwgKUWb9sggkv4vQxAQR4y2CyKrt5pLZ5SzQ7EHBv
```

The long string `mDV3QWRXfwgKUWb9sggkv4vQxAQR4y2CyKrt5pLZ5SzQ7EHBv` is the CB58 encoded VMID of the DFK subnet-evm. AvalancheGo will use the name of this file to determine what VMs are available to run from the `plugins` directory.

## Whitelisting DFK Subnet and Restarting the Node

AvalancheGo will only validate the primary network by default. In order to add the DFK Subnet, you will need to add the DFK Subnet ID to the set of whitelisted subnets in the node's config file or pass it through the command line options of the node. Once the node's config file has been updated, you will need to start the Avalanche node (restart if already running).

Once you start the node, it will begin syncing the Primary Network. Once the node reaches the point in the Platform Chain where the DFK Subnet is created, it will begin syncing the DFK Subnet as well, and will start validating once it has fully bootstrapped.

### Updating Config File

You can skip this section if you want to pass whitelisted subnets through command-line flags.

You need to edit your existing config file for your node. In this tutorial, you will create a config file at: `~/.avalanchego/config.json`. Note: you can create a config file anywhere on your file system, you will just need to specify its location via the flag `--config-file=<file path>` when you start your node.

You will need to add the DFK Subnet ID to the whitelisted subnets section of the config file:

```json
{
    <OTHER-CONFIGURATIONS>
    "whitelisted-subnets": "Vn3aX6hNRstj5VHHm63TCgPNaeGnRSqCYXQqemSqDd2TQH4qJ"
}
```

Whitelisted subnets is a comma separated list of subnet IDs, so if you are validating more than one subnet, you can simply add a comma to the end of the list and append the DFK Subnet ID `Vn3aX6hNRstj5VHHm63TCgPNaeGnRSqCYXQqemSqDd2TQH4qJ`.

### Running the Node

First, make sure to shut down your node in case it is still running. Then, you will navigate back into the AvalancheGo directory:

```bash
cd $GOPATH/src/github.com/ava-labs/avalanchego
```

If you went through the steps to set up a config file, then you can launch your node by specifying the config file on the command line:

```bash
./build/avalanchego --config-file ~/.avalanchego/config.json
```

If you want to pass the whitelisted subnets through the command line flag. You can append the other flags or even the `--config-file` flag as well, according to your need.

```bash
./build/avalanchego --whitelisted-subnets Vn3aX6hNRstj5VHHm63TCgPNaeGnRSqCYXQqemSqDd2TQH4qJ
```
