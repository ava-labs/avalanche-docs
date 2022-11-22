# Build Your First Subnet

The first step of learning Subnet development is learning to use [Avalanche-CLI](https://github.com/ava-labs/avalanche-cli).

The best way to get started is by jumping in and deploying your first Subnet.

This tutorial will walk you through the process of using Avalanche-CLI for the first time by creating a Subnet,
deploying it to the local network, and connecting to it with Metamask.

## Installation

The fastest way to install the latest Avalanche-CLI binary is by running the install script:

```bash
curl -sSfL https://raw.githubusercontent.com/ava-labs/avalanche-cli/main/scripts/install.sh | sh -s
```

The binary will be installed inside the `./bin` directory (relative to where the install command was run).

You can run all of the commands in this tutorial by calling `./bin/avalanche`.

You can also add the command to your system path by running

```
cd bin
export PATH=$PWD:$PATH
```

If you add it to your path, you should be able to call the program anywhere with just `avalanche`. To add
it to your path permanently, add an export command to your shell initialization script (ex: .bashrc for
Ubuntu or .zshrc for Mac).

For more detailed installation instructions, see [Avalanche-CLI Installation](install-avalanche-cli)

## Create Your Subnet Configuration

Your first Subnet will be an Ethereum Virtual Machine (EVM) based Subnet. Avalanche's Subnet fork of the
EVM is known as Subnet-EVM. It supports airdrops, custom fee tokens, configurable gas parameters, and
multiple stateful precompiles. To learn more, check out [Subnet-EVM](https://github.com/ava-labs/subnet-evm).
The goal of your first command will be to create a Subnet-EVM configuration.

The Subnet command suite provides a collection of tools for developing and deploying Subnets.

The Subnet Creation Wizard will walk you through the process of creating your subnet. To get started, first
pick a name for your Subnet. This tutorial uses `mySubnet`, but feel free to substitute that with any name
you like. Once you've picked your name, run

`avalanche subnet create mySubnet`

The following sections will walk through each question in the wizard.

### Choose Your VM

Select `SubnetEVM`.

### Enter Your Subnet's ChainID

Choose a positive integer for your EVM-style ChainID.

In production environments, this ChainID will need to be unique and not shared with any other chain. You can visit [ChainList](https://chainlist.org/) to verify that your selection is indeed unique. Because this is a development subnet, feel free to pick any number. We advise staying away from well-known ChainIDs such as 1 (Ethereum) or 43114 (Avalanche C-Chain) as those may cause issues with other tools.

### Token Symbol

Enter a string to name your Subnet's native token. The token symbol does not necessarily need to be unique. Example token symbols are AVAX, JOE, and BTC.

### Subnet-EVM Version

Select `Use latest version`.

### Gas Fee Configuration

This question determines how gas fees are set on your submit.

Select `Low disk use / Low Throughput 1.5 mil gas/s (C-Chain's setting)`.

### Airdrop

Select `Airdrop 1 million tokens to the default address (do not use in production)`.

This address's private key is well-known, so do not send any production funds to it. They would likely be stolen instantly.

When you are ready to start more mature testing, select `Customize your airdrop` to distribute funds to additional addresses.

### Precompiles

Precompiles are Avalanche's way of customizing the behavior of your Subnet. They're strictly an advanced feature,
so you can safely select `No` for now.

### Wrapping Up

If all worked successfully, you will see `Successfully created subnet configuration`.

You've succesffuly created your first Subnet configuration. Now it's time to deploy it.

## Deploying Subnets Locally

To deploy your subnet, run

`avalanche subnet deploy mySubnet`

Make sure to substiture the name of your Subnet if you used a different one than `mySubnet`.

Next, select `Local Network`.

This command will boot a five node Avalanche network on your machine. It will need to download the latest
versions of AvalancheGo and Subnet-EVM. The command may take a couple minutes to run.

If all works as expected, the command output should look something like this:

```text
> avalanche subnet deploy mySubnet
✔ Local Network
Deploying [mySubnet] to Local Network
Installing subnet-evm-v0.4.3...
subnet-evm-v0.4.3 installation successful
Backend controller started, pid: 93928, output at: /Users/subnet-developer/.avalanche-cli/runs/server_20221122_173138/avalanche-cli-backend
Installing avalanchego-v1.9.3...
avalanchego-v1.9.3 installation successful
VMs ready.
Starting network...
..................
Blockchain has been deployed. Wait until network acknowledges...
......
Network ready to use. Local network node endpoints:
+-------+----------+------------------------------------------------------------------------------------+
| NODE  |    VM    |                                        URL                                         |
+-------+----------+------------------------------------------------------------------------------------+
| node2 | mySubnet | http://127.0.0.1:9652/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc |
+-------+----------+------------------------------------------------------------------------------------+
| node3 | mySubnet | http://127.0.0.1:9654/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc |
+-------+----------+------------------------------------------------------------------------------------+
| node4 | mySubnet | http://127.0.0.1:9656/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc |
+-------+----------+------------------------------------------------------------------------------------+
| node5 | mySubnet | http://127.0.0.1:9658/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc |
+-------+----------+------------------------------------------------------------------------------------+
| node1 | mySubnet | http://127.0.0.1:9650/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc |
+-------+----------+------------------------------------------------------------------------------------+

Browser Extension connection details (any node URL from above works):
RPC URL:          http://127.0.0.1:9650/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc
Funded address:   0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC with 1000000 (10^18) - private key: 56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027
Network name:     mySubnet
Chain ID:         54325
Currency Symbol:  TUTORIAL
```

You can use the deployment details to connect to and interact with your subnet. Now let's interact with it.

## Interacting with Your Subnet

You can use the value provided by `Browser Extension connection details` to connect to your Subnet with Metamask, Core, or any other wallet.

```text
Browser Extension connection details (any node URL from above works):
RPC URL:          http://127.0.0.1:9650/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc
Funded address:   0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC with 1000000 (10^18) - private key: 56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027
Network name:     mySubnet
Chain ID:         54325
Currency Symbol:  TUTORIAL
```

In this tutorial, we'll use Metamask.

### Importing the Test Private Key

:::warning
This address's private key is well-known. Anyone can steal funds sent to this address. Only use it on development networks that only you have access to. If production funds are sent to this address, they will likely be stolen instantly.
:::

First, you need to import your airdrop private key into Metamask. Do this by clicking the profile bubble in the top right corner and select `Import account`.

![Import Metamask Account](/img/metamask-import.png)

Import the well-known private key `0x56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027`.

![Import Account Private Key](/img/metamask-import-2.png)

Next, rename the Metamask account to prevent confusion. Switch to the new account and click the three dot menu in the top right corner. Select `Account details`. Click the edit icon next to the account name. We suggest naming the account `DO NOT USE -- Public test key` to prevent confusion with any personal wallets.

![Rename Account](/img/metamask-import-3.png)

Click the checkmark to confirm the change.

### Connect to the Subnet

Next, you need to add your Subnet to Metamask's networks.

Click the profile bubble in the top right corner and select `Settings`. Next, click `Networks`. Finally, click `Add network`.

![Metamask Add Network](/img/metamask-network.png)

At the bottom of the next page, select `Add a network manually`. Enter your subnet's details (found in the output of your `avalanche subnet deploy` [command](#deploying-subnets-locally)) into the form and click `Save`.

![Add Subnet Network Details](/img/metamask-network-2.png)

If all worked as expected, you will see your balance of 1 million tokens. Your Subnet is ready for action. You might want to try to [Deploy a Smart Contract on Your Subnet-EVM Using Remix and Metamask](deploy-a-smart-contract-on-your-evm).

![Subnet in Metamask](/img/subnet-in-metamask.png)

## Next Steps

Congrats Subnetooooor, you just deployed your first subnet!

After you feel comfortable with this deployment flow, try deploying smart contracts on your chain with Remix, Hardhat, or Foundry. You can also experiment with customizing your subnet by adding precompiles or adjusting the airdrop.

Once you've developed a stable subnet you like, see [Create an EVM Subnet on Fuji Testnet](./create-a-fuji-subnet.md) to take your Subnet one step closer to production.

Good Subnetting!
