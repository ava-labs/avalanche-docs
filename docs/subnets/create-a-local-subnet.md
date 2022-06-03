# Create an EVM Subnet on a Local Network


To learn how to develop a subnet, the first step is to create a local subnet so that you can experience it freely without too much constraints. [Avalanche-CLI](https://github.com/ava-labs/avalanche-cli) provides such a utility.

## Quickstart

Launch your own custom subnet:
```bash
go install github.com/ava-labs/avalanche-cli@latest
avalanche subnet create <subnetName>
avalanche subnet deploy <subnetName>
```

Shut down your local deployment with:
```bash
avalanche network stop [snapshotName]
```

## Disclaimer

**This beta project is very early in its lifecycle. It will evolve rapidly over the coming weeks and months. Until we achieve our first mature release, we are not committed to preserving backwards compatibility. Commands may be renamed or removed in future versions.**

**We wanted to get this in your hands as soon as possible, so it's releasing before it's "complete." Bug reports and feedback on future directions are appreciated and encouraged! That said, we have LOTS planned and many new features are on the way.**

### Currently Supported Functionality
- Creation of Subnet-EVM configs
- Local deployment of Subnet-EVM based subnets

### Notable Missing Features
- Fuji and mainnet Subnet-EVM deploys

## Installation

### Comptatibility
The tool has been tested on Linux and Mac. Windows is currently not supported.

### Instructions

To use Avalanche-CLI, you'll first need to install golang. Follow the instructions here: https://go.dev/doc/install.

Once go is installed, install the latest version with

`go install github.com/ava-labs/avalanche-cli@latest`

## Subnets

The subnet command suite provides a collection of tools for developing and deploying subnets.

To get started, use the `avalanche subnet create` command wizard to walk through the configuration of your very first subnet. Then, go ahead and deploy it with the `avalanche subnet deploy` command. You can use the rest of the commands to manage your subnet configurations.

To learn more about subnets, check out https://docs.avax.network/subnets/.

### Subnet-EVM

Subnet-EVM is a configurable Ethereum virtual machine designed for subnets. It supports airdrops, custom fee tokens, configurable gas parameters, and multiple stateful precompiles. To learn more, check out https://github.com/ava-labs/subnet-evm.

### Create a Custom Subnet Configuration

If you don't provide any arguments, the subnet creation wizard will walk you through the entire process. This will create a genesis file for your network. It contains all of the information you need to airdrop tokens, set a gas config, and enable any custom precompiles. You can read more about subnet configuration here: https://docs.avax.network/subnets/customize-a-subnet/.

One special note: Every EVM-based chain has a parameter called the `chainId`. When choosing a `chainId` for your network, you should choose a unique value. Check https://chainlist.org/ to see if the value you'd like is already in use.

To use the wizard, run

`avalanche subnet create <subnetName>`

The wizard won't customize every aspect of the Subnet-EVM genesis for you. For many fields, it chooses reasonable defaults. If you'd like complete control, you can specify a custom genesis by providing a path to the file you'd like to use. Run with:

`avalanche subnet create <subnetName> --file <filepath>`

By default, creating a subnet configuration with the same subnetName as one that already exists will fail. To overwrite an existing config, use the force flag:

`avalanche subnet create <existingSubnetName> -f`

### View Created Subnet Configurations

You can list the subnets you've created with

`avalanche subnet list`

To see the details of a specific configuration, run

`avalanche subnet describe <subnetName>`

By default, the command prints a summary of the config. If you'd like to see the raw genesis file, supply the `--genesis` flag:

`avalanche subnet describe <subnetName> --genesis`

### Deploying Subnets Locally

Currently, this tool only supports local subnet deploys. Fuji and Mainnet deploys will be arriving shortly.

To deploy, run

`avalanche subnet deploy <subnetName>`

Local deploys will start a multi-node Avalanche network in the background on your machine. To manage that network, see the `avalanche network` command tree.

If you'd like some additional information on how you can deploy your subnet to Fuji Testnet, run

`avalanche subnet instructions <subnetName>`

### Deploying to Fuji
If you can't wait to for this tool's fuji integration, you can use the `subnet-cli` tool to deploy your subnet.

First, export your subnet's genesis file with `avalanche subnet describe --genesis <subnetName>`. Then, use that genesis file to complete the instructions listed here: https://docs.avax.network/subnets/subnet-cli.

### Delete a Subnet Configuration

To delete a created subnet configuration, run

`avalanche subnet delete <subnetName>`

## Network

The network command suite provides a collection of tools for managing local subnet deployments.

When a subnet is deployed locally, it runs on a local, multi-node Avalanche network. Deploying a subnet locally will start this network in the background. This command suite allows you to shutdown and restart that network.

This network currently supports multiple, concurrently deployed subnets and will eventually support nodes with varying configurations. Expect more functionality in future releases.

### Stopping the Local Network

To stop a running local network, run

`avalanche network stop [snapshotName]`

This graceful shutdown will preserve network state. When restarted, your subnet should resume at the same place it left off.
`snapshotName` is optional, if provided, a named snapshot will be created which can later be started again with `avalanche network start snapshotName`.
If not provided, a default snapshot will be created. The default snapshot will be overwritten at each `stop`.

### Starting/Restarting the Local Network

To start or restart a stopped network, run

`avalanche network start [snapshotName]`

`snapshotName` is optional, if provided the named snapshot will be used to start the network (if found).
If not provided, the last snapshot created with a unnamed `stop` will be used.

If the default snapshot doesn't exist (because no `stop` has been run yet, and/or no subnet has been deployed yet), the command will fail.

Deploying a subnet locally will start the network automatically.

### Deleting the Local Network

To stop your local network and clear its state, run

`avalanche network clean`

This will delete all stored state for all local subnets. You will need to redeploy your subnet configurations one by one to use them again.

### Checking Network Status

If you'd like to determine whether or not a local Avalanche network is running on your macine, run

`avalanche network status`

## Next Step

After you feel comfortable moving forward, you should try it on the Fuji Testnet by following [this tutorial](./create-a-fuji-subnet.md).
