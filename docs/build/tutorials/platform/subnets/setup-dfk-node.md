# Run a Node on DFK Subnet

## Introduction

We recently deployed the DFK subnet on Avalanche mainnet and successfully launched the [DFK chain](https://subnets.avax.network/defi-kingdoms/dfk-chain/explorer) on that subnet. This subnet is maintained by the [DeFi Kingdom](https://defikingdoms.com/)'s team and is based on Avalanche's [subnet-evm](https://github.com/ava-labs/subnet-evm).

A subnet, or subnetwork, is a dynamic set of validators working together to achieve consensus on the state of a set of blockchains. Each blockchain is validated by exactly one subnet. A subnet can validate many blockchains. A node may be a member of many subnets. You can learn more about subnets [here](../subnets/README.md).

## Requirement

There is a requirement to run a node on the DFK subnet - 

* You must be running a node on the Avalanche Primary Network. You can use this [guide](../../nodes-and-staking/set-up-node-with-installer) to set up your node using the installer script.
* You are using the same system where you have deployed your mainnet node.

## Setup

Let's make a separate directory `dfk-subnet` for keeping and building our binaries. Move to the following directory and follow the rest of the tutorial.

## Build Binary

Clone the Defi Kindom's subnet-evm repository which is originally forked from Avalanche's subnet-evm. And build it using the following command.

```bash
git clone https://github.com/DefiKingdoms/subnet-evm \
&& cd subnet-evm \
&& ./scripts/build.sh build/mDV3QWRXfwgKUWb9sggkv4vQxAQR4y2CyKrt5pLZ5SzQ7EHBv
```

The above command will clone the `subnet-evm` repository and build its binary inside the `subnet-evm/build` directory. The name of the binary will be the same as its vmID.

## Move Binary to Plugins Directory

Now we need to move the built binary to the `avalanchego/build/plugins` directory. Run the following command to move the binary to the `plugins` folder. Make sure to use the actual location of your `avalanchego` source and other relative paths. This command assumes we are in the `dfk-subnet` folder and the `avalanchego` source is in its sibling (.\./) folder.

```bash
mv subnet-evm/build/mDV3QWRXfwgKUWb9sggkv4vQxAQR4y2CyKrt5pLZ5SzQ7EHBv ../avalanchego/build/plugins/
```

## Whitelisting DFK Subnet and Restarting the Node

To start syncing the state with the chains on a subnet, we need to whitelist the subnet and restart the node. You can either add the whitelisted subnets in a config file or pass them through command-line options.

### Updating Config File

You can skip this section if you want to pass whitelisted subnets through command-line flags.

You need to edit your existing config file for your node. If you are running a node using [installer script](../../nodes-and-staking/set-up-node-with-installer), it can be found in `~/.avalanchego/configs/node.json`. If you are not using any config file, then you can make it anywhere on your system. Update this JSON file with the whitelisted subnet. 

```json
{
    <OTHER-CONFIGURATIONS>
    "whitelisted-subnets": "Vn3aX6hNRstj5VHHm63TCgPNaeGnRSqCYXQqemSqDd2TQH4qJ"
}
```

### Restarting the Node

If you want to pass the whitelisted subnets through the command line flag. You can append the other flags or even the `--config-file` flag as well, according to your need.

```bash
./avalanchego/build/avalanchego --whitelisted-subnets mDV3QWRXfwgKUWb9sggkv4vQxAQR4y2CyKrt5pLZ5SzQ7EHBv
```

If you want to pass the whitelisted subnets through the config file.

```bash
./avalanchego/build/avalanchego --config-file ./config.json
```

Use the relative paths of binaries and config files as per your need.