# Run a DFK Subnet Node

## Introduction

This article describes how to run a Mainnet node on [DeFi Kingdoms (DFK)
Subnet](https://subnets.avax.network/defi-kingdoms).

Following necessary steps are needed to run your node on the DFK Subnet:

1. Build the AvalancheGo binary
2. Build the plugin binary for the DFK Subnet-EVM
3. Track the DFK Subnet
4. Connect to the DFK Subnet!

_Just want the commands? Jump to the [end](#just-want-the-commands-we-got-you)!_

## Build `AvalancheGo` Binary

First, you need to download and build AvalancheGo (handles the orchestration of running Custom VMs).
You can follow [this comprehensive guide](/nodes/run/node-manually.md) to complete
this step. For this tutorial, we recommend compiling from source instead of using the `AvalancheGo Installer`.

## Build `subnet-evm` Binary

_For the steps below, we will assume that you completed first step successfully and are now in your
AvalancheGo directory (within your `$GOPATH`)._

Next, you will clone the DFK Subnet-EVM repository:

```bash
mkdir -p $GOPATH/src/github.com/ava-labs
cd $GOPATH/src/github.com/ava-labs
git clone https://github.com/ava-labs/subnet-evm.git
cd subnet-evm
```

:::info
The repository cloning method used is HTTPS, but SSH can be used too:

`git clone git@github.com:ava-labs/subnet-evm.git`

You can find more about SSH and how to use it 
[here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/about-ssh). 
:::

Now that you are in the `ava-labs/subnet-evm` repository, you will build the binary and place it
directly into the `plugins` directory. To do this, you will pass in the desired
path to place the plugin binary. You will want to place this binary into the plugins directory of
AvalancheGo.

```bash
./scripts/build.sh ~/.avalanchego/plugins/mDV3QWRXfwgKUWb9sggkv4vQxAQR4y2CyKrt5pLZ5SzQ7EHBv
```

The long string `mDV3QWRXfwgKUWb9sggkv4vQxAQR4y2CyKrt5pLZ5SzQ7EHBv` is the CB58 encoded VMID of the
DFK Subnet-EVM. AvalancheGo will use the name of this file to determine what VMs are available to
run from the `plugins` directory.

## Tracking DFK Subnet and Restarting the Node

AvalancheGo will only validate the primary network by default. In order to add the DFK Subnet, you
will need to add the DFK Subnet ID to the set of tracked Subnets in the node's config file or
pass it through the command-line options of the node. Once the node's config file has been updated,
you will need to start the Avalanche node (restart if already running).

Once you start the node, it will begin syncing the Primary Network. Once the node reaches the point
in the Platform Chain where the DFK Subnet is created, it will begin syncing the DFK Subnet as well,
and will start validating once it has fully bootstrapped.

### Updating Config File

You can skip this section if you want to track Subnets through command-line flags.

You need to create a new config file or edit your existing one for your node. In this tutorial, you
will create a config file at: `~/.avalanchego/config.json`. Note: you can create a config file
anywhere on your file system, you will just need to specify its location via the flag
`--config-file=<file path>` when you start your node. See
[this](/nodes/configure/avalanchego-config-flags.md#config-file) for more info on configuration
file and flags.

You will need to add the DFK Subnet ID to the track Subnets section of the config file:

```json
{
    <OTHER-CONFIGURATIONS>
    "track-subnets": "Vn3aX6hNRstj5VHHm63TCgPNaeGnRSqCYXQqemSqDd2TQH4qJ"
}
```

Track Subnets is a comma separated list of Subnet IDs, so if you are validating more than one
Subnet, you can simply add a comma to the end of the list and append the DFK Subnet ID
`Vn3aX6hNRstj5VHHm63TCgPNaeGnRSqCYXQqemSqDd2TQH4qJ`.

### Running the Node

First, make sure to shut down your node in case it is still running. Then, you will navigate back
into the AvalancheGo directory:

```bash
cd $GOPATH/src/github.com/ava-labs/avalanchego
```

If you went through the steps to set up a config file, then you can launch your node by specifying
the config file on the command line:

```bash
./build/avalanchego --config-file ~/.avalanchego/config.json
```

If you want to track the Subnets through the command-line flag. You can append the other
flags or even the `--config-file` flag as well, according to your need.

```bash
./build/avalanchego --track-subnets Vn3aX6hNRstj5VHHm63TCgPNaeGnRSqCYXQqemSqDd2TQH4qJ
```

## Just Want the Commands? We Got You

:::caution
Run `go version`. **It should be 1.19.6 or above.** Run `echo $GOPATH`. **It should not be empty.**
:::

```bash
mkdir -p $GOPATH/src/github.com/ava-labs
cd $GOPATH/src/github.com/ava-labs
git clone https://github.com/ava-labs/avalanchego.git
cd avalanchego
./scripts/build.sh
cd $GOPATH/src/github.com/ava-labs
git clone https://github.com/ava-labs/subnet-evm.git
cd subnet-evm
./scripts/build.sh ~/.avalanchego/plugins/mDV3QWRXfwgKUWb9sggkv4vQxAQR4y2CyKrt5pLZ5SzQ7EHBv
cd $GOPATH/src/github.com/ava-labs/avalanchego
./build/avalanchego --track-subnets Vn3aX6hNRstj5VHHm63TCgPNaeGnRSqCYXQqemSqDd2TQH4qJ
```

:::info
The repository cloning method used is HTTPS, but SSH can be used too:

`git clone git@github.com:ava-labs/avalanchego.git`

`git clone git@github.com:ava-labs/subnet-evm.git`

You can find more about SSH and how to use it 
[here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/about-ssh). 
:::
