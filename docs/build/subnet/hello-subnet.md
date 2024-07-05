---
tags: [Build, Subnets]
description: This tutorial walks you through the process of using Avalanche-CLI to create a Subnet, deploy it to a local network, and connect to it with Core wallet.
sidebar_label: Build Your First Subnet
pagination_label: Build Your First Subnet
---

# Build Your First Subnet

This tutorial walks you through the process of using Avalanche-CLI to create a Subnet,
deploy it to a local network, and connect to it with Core wallet.

The first step of learning Subnet development is learning to use [Avalanche-CLI](https://github.com/ava-labs/avalanche-cli).

## Installation

The fastest way to install the latest Avalanche-CLI binary is by running the install script:

```shell
curl -sSfL https://raw.githubusercontent.com/ava-labs/avalanche-cli/main/scripts/install.sh | sh -s
```

The binary installs inside the `~/bin` directory. If the directory doesn't exist,
it will be created.

You can run all of the commands in this tutorial by calling `~/bin/avalanche`.

You can also add the command to your system path by running

```shell
export PATH=~/bin:$PATH
```

If you add it to your path, you should be able to call the program anywhere with just `avalanche`.
To add it to your path permanently, add an export command to your shell initialization script
(ex: .bashrc or .zshrc).

For more detailed installation instructions, see [Avalanche-CLI Installation](/tooling/cli-guides/install-avalanche-cli.md)

## Create Your Subnet Configuration

This tutorials teaches you how to create an Ethereum Virtual Machine (EVM) based Subnet. To do so,
you use Subnet-EVM, Avalanche's Subnet fork of the EVM. It supports airdrops, custom fee tokens,
configurable gas parameters, and multiple stateful precompiles. To learn more, take a look at
[Subnet-EVM](https://github.com/ava-labs/subnet-evm). The goal of your first command is to create
a Subnet-EVM configuration.

The Subnet command suite provides a collection of tools for developing and deploying Subnets.

The Subnet Creation Wizard walks you through the process of creating your Subnet. To get started,
first pick a name for your Subnet. This tutorial uses `mySubnet`, but feel free to substitute that
with any name you like. Once you've picked your name, run

`avalanche subnet create mySubnet`

The following sections walk through each question in the wizard.

### Choose Your VM

Select `SubnetEVM`.

### Enter Your Subnet's ChainID

Choose a positive integer for your EVM-style ChainID.

In production environments, this ChainID needs to be unique and not shared with any other chain.
You can visit [chainlist](https://chainlist.org/) to verify that your selection is unique.
Because this is a development Subnet, feel free to pick any number. Stay away from well-known
ChainIDs such as 1 (Ethereum) or 43114 (Avalanche C-Chain) as those may cause issues with other
tools.

### Token Symbol

Enter a string to name your Subnet's native token. The token symbol doesn't necessarily need to be unique.
Example token symbols are AVAX, JOE, and BTC.

### Subnet-EVM Version

Select `Use latest version`.

### Gas Fee Configuration

This question determines how to set gas fees on your Subnet.

Select `Low disk use / Low Throughput 1.5 mil gas/s (C-Chain's setting)`.

### Airdrop

Select `Airdrop 1 million tokens to the default address (do not use in production)`.

This address's private key is well-known, so DO NOT send any production funds to it. Attackers
would likely drain the funds instantly.

When you are ready to start more mature testing, select `Customize your airdrop` to distribute
funds to additional addresses.

### Precompiles

Precompiles are Avalanche's way of customizing the behavior of your Subnet. They're strictly an
advanced feature, so you can safely select `No` for now.

### Wrapping Up

If all worked successfully, the command prints `Successfully created subnet configuration`.

You've successfully created your first Subnet configuration. Now it's time to deploy it.

## Deploying Subnets Locally

To deploy your Subnet, run

`avalanche subnet deploy mySubnet`

Make sure to substitute the name of your Subnet if you used a different one than `mySubnet`.

Next, select `Local Network`.

This command boots a five node Avalanche network on your machine. It needs to download the latest
versions of AvalancheGo and Subnet-EVM. The command may take a couple minutes to run.

Note: If you run `bash` on your shell and are running Avalanche-CLI on ARM64 on Mac, you will 
require Rosetta 2 to be able to deploy Subnets locally. You can download Rosetta 2 using 
`softwareupdate --install-rosetta` .

If all works as expected, the command output should look something like this:

<!-- markdownlint-disable MD013 -->

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

<!-- markdownlint-enable MD013 -->

You can use the deployment details to connect to and interact with your Subnet. Now it's time to
interact with it.

<details>
<summary> Full Subnet Creation and Deployment Example </summary>

```bash
laviniatalpas@Lavinias-MacBook-Pro ~ % cd desktop
laviniatalpas@Lavinias-MacBook-Pro desktop % mkdir subnet
laviniatalpas@Lavinias-MacBook-Pro desktop % cd subnet
laviniatalpas@Lavinias-MacBook-Pro subnet % curl -sSfL https://raw.githubusercontent.com/ava-labs/avalanche-cli/main/scripts/install.sh | sh -s
ava-labs/avalanche-cli info checking GitHub for latest tag
ava-labs/avalanche-cli info found version: 1.6.3 for darwin/arm64
ava-labs/avalanche-cli info installed /Users/laviniatalpas/bin/avalanche
laviniatalpas@Lavinias-MacBook-Pro subnet % export PATH=~/bin:$PATH
laviniatalpas@Lavinias-MacBook-Pro subnet % avalanche subnet create mySubnet
✔ Subnet-EVM
✔ Use latest release version
✔ No
creating genesis for subnet mySubnet
Enter your subnet's ChainId. It can be any positive integer.
ChainId: 1234
Select a symbol for your subnet's native token
Token symbol: test
✔ Low disk use    / Low Throughput    1.5 mil gas/s (C-Chain's setting)
✔ Airdrop 1 million tokens to the default ewoq address (do not use in production)
prefunding address 0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC with balance 1000000000000000000000000
✔ No
✓ Successfully created subnet configuration
laviniatalpas@Lavinias-MacBook-Pro subnet % avalanche subnet deploy mySubnet
✔ Local Network
Deploying [mySubnet] to Local Network
Backend controller started, pid: 90858, output at: /Users/laviniatalpas/.avalanche-cli/runs/server_20240705_194105/avalanche-cli-backend.log

Booting Network. Wait until healthy...
Node logs directory: /Users/laviniatalpas/.avalanche-cli/runs/network_20240705_194106/node<i>/logs
Network ready to use.

Deploying Blockchain. Wait until network acknowledges...

Blockchain ready to use

+-------------------+------------------------------------------------------------------------------------+
|                                           mySubnet RPC URLs                                            |
+-------------------+------------------------------------------------------------------------------------+
| Localhost         | http://127.0.0.1:9650/ext/bc/mySubnet/rpc                                          |
+                   +------------------------------------------------------------------------------------+
|                   | http://127.0.0.1:9650/ext/bc/8q18Mmjp86up2B6upkFdfaPjskuLkrk9dSPqbhp44DPZkq3KV/rpc |
+-------------------+------------------------------------------------------------------------------------+

+-------+------------------------------------------+-----------------------+
|                                  Nodes                                   |
+-------+------------------------------------------+-----------------------+
| Name  | Node ID                                  | Localhost Endpoint    |
+-------+------------------------------------------+-----------------------+
| node1 | NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg | http://127.0.0.1:9650 |
+-------+------------------------------------------+-----------------------+
| node2 | NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ | http://127.0.0.1:9652 |
+-------+------------------------------------------+-----------------------+
| node3 | NodeID-NFBbbJ4qCmNaCzeW7sxErhvWqvEQMnYcN | http://127.0.0.1:9654 |
+-------+------------------------------------------+-----------------------+
| node4 | NodeID-GWPcbFJZFfZreETSoWjPimr846mXEKCtu | http://127.0.0.1:9656 |
+-------+------------------------------------------+-----------------------+
| node5 | NodeID-P7oB2McjBGgW2NXXWVYjV8JEDFoW9xDE5 | http://127.0.0.1:9658 |
+-------+------------------------------------------+-----------------------+

Browser Extension connection details (any node URL from above works):
RPC URL:           http://127.0.0.1:9650/ext/bc/8q18Mmjp86up2B6upkFdfaPjskuLkrk9dSPqbhp44DPZkq3KV/rpc
Funded address:    0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC with 1000000 (10^18) - private key: 56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027
Network name:      mySubnet
Chain ID:          1234
Currency Symbol:   test
laviniatalpas@Lavinias-MacBook-Pro subnet % avalanche subnet describe mySubnet --genesis
{
    "config": {
        "byzantiumBlock": 0,
        "chainId": 1234,
        "constantinopleBlock": 0,
        "eip150Block": 0,
        "eip155Block": 0,
        "eip158Block": 0,
        "feeConfig": {
            "gasLimit": 8000000,
            "targetBlockRate": 2,
            "minBaseFee": 25000000000,
            "targetGas": 15000000,
            "baseFeeChangeDenominator": 36,
            "minBlockGasCost": 0,
            "maxBlockGasCost": 1000000,
            "blockGasCostStep": 200000
        },
        "homesteadBlock": 0,
        "istanbulBlock": 0,
        "muirGlacierBlock": 0,
        "petersburgBlock": 0,
        "warpConfig": {
            "blockTimestamp": 1720197620,
            "quorumNumerator": 67
        }
    },
    "nonce": "0x0",
    "timestamp": "0x668821f4",
    "extraData": "0x",
    "gasLimit": "0x7a1200",
    "difficulty": "0x0",
    "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "coinbase": "0x0000000000000000000000000000000000000000",
    "alloc": {
        "8db97c7cece249c2b98bdc0226cc4c2a57bf52fc": {
            "balance": "0xd3c21bcecceda1000000"
        }
    },
    "airdropHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "airdropAmount": null,
    "number": "0x0",
    "gasUsed": "0x0",
    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "baseFeePerGas": null,
    "excessBlobGas": null,
    "blobGasUsed": null
}
laviniatalpas@Lavinias-MacBook-Pro subnet % avalanche network stop
Network stopped successfully.
Server shutdown gracefully
laviniatalpas@Lavinias-MacBook-Pro subnet % avalanche network start
Backend controller started, pid: 93276, output at: /Users/laviniatalpas/.avalanche-cli/runs/server_20240705_194322/avalanche-cli-backend.log
Starting previously deployed and stopped snapshot
Booting Network. Wait until healthy...
Node logs directory: /Users/laviniatalpas/.avalanche-cli/runs/network_20240705_194322/node<i>/logs

Network ready to use.

+-------------------+------------------------------------------------------------------------------------+
|                                           mySubnet RPC URLs                                            |
+-------------------+------------------------------------------------------------------------------------+
| Localhost         | http://127.0.0.1:9650/ext/bc/mySubnet/rpc                                          |
+                   +------------------------------------------------------------------------------------+
|                   | http://127.0.0.1:9650/ext/bc/8q18Mmjp86up2B6upkFdfaPjskuLkrk9dSPqbhp44DPZkq3KV/rpc |
+-------------------+------------------------------------------------------------------------------------+

+-------+------------------------------------------+-----------------------+
|                                  Nodes                                   |
+-------+------------------------------------------+-----------------------+
| Name  | Node ID                                  | Localhost Endpoint    |
+-------+------------------------------------------+-----------------------+
| node1 | NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg | http://127.0.0.1:9650 |
+-------+------------------------------------------+-----------------------+
| node2 | NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ | http://127.0.0.1:9652 |
+-------+------------------------------------------+-----------------------+
| node3 | NodeID-NFBbbJ4qCmNaCzeW7sxErhvWqvEQMnYcN | http://127.0.0.1:9654 |
+-------+------------------------------------------+-----------------------+
| node4 | NodeID-GWPcbFJZFfZreETSoWjPimr846mXEKCtu | http://127.0.0.1:9656 |
+-------+------------------------------------------+-----------------------+
| node5 | NodeID-P7oB2McjBGgW2NXXWVYjV8JEDFoW9xDE5 | http://127.0.0.1:9658 |
+-------+------------------------------------------+-----------------------+
laviniatalpas@Lavinias-MacBook-Pro subnet % avalanche network status
Network is Up:
  Number of Nodes: 5
  Number of Custom VMs: 1
  Network Healthy: true
  Custom VMs Healthy: true

+-------------------+------------------------------------------------------------------------------------+
|                                           mySubnet RPC URLs                                            |
+-------------------+------------------------------------------------------------------------------------+
| Localhost         | http://127.0.0.1:9650/ext/bc/mySubnet/rpc                                          |
+                   +------------------------------------------------------------------------------------+
|                   | http://127.0.0.1:9650/ext/bc/8q18Mmjp86up2B6upkFdfaPjskuLkrk9dSPqbhp44DPZkq3KV/rpc |
+-------------------+------------------------------------------------------------------------------------+

+-------+------------------------------------------+-----------------------+
|                                  Nodes                                   |
+-------+------------------------------------------+-----------------------+
| Name  | Node ID                                  | Localhost Endpoint    |
+-------+------------------------------------------+-----------------------+
| node1 | NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg | http://127.0.0.1:9650 |
+-------+------------------------------------------+-----------------------+
| node2 | NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ | http://127.0.0.1:9652 |
+-------+------------------------------------------+-----------------------+
| node3 | NodeID-NFBbbJ4qCmNaCzeW7sxErhvWqvEQMnYcN | http://127.0.0.1:9654 |
+-------+------------------------------------------+-----------------------+
| node4 | NodeID-GWPcbFJZFfZreETSoWjPimr846mXEKCtu | http://127.0.0.1:9656 |
+-------+------------------------------------------+-----------------------+
| node5 | NodeID-P7oB2McjBGgW2NXXWVYjV8JEDFoW9xDE5 | http://127.0.0.1:9658 |
+-------+------------------------------------------+-----------------------+

```

</details>

## Interacting with Your Subnet

You can use the value provided by `Browser Extension connection details` to connect to your Subnet
with Core, MetaMask, or any other wallet.

:::note

To allow API calls from other machines, use `--http-host=0.0.0.0` in the config.

:::


<!-- markdownlint-disable MD013 -->

```text
Browser Extension connection details (any node URL from above works):
RPC URL:          http://127.0.0.1:9650/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc
Funded address:   0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC with 1000000 (10^18) - private key: 56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027
Network name:     mySubnet
Chain ID:         54325
Currency Symbol:  TUTORIAL
```

<!-- markdownlint-enable MD013 -->

This tutorial uses Core.

### Importing the Test Private Key

:::warning
This address derives from a well-known private key. Anyone can steal funds sent to this address.
Only use it on development networks that only you have access to. If you send production funds to
this address, attackers may steal them instantly.
:::

First, you need to import your airdrop private key into Core. 

In the Accounts screen, select the `Imported` tab. Click on `Import private key`.

![Import Account](/img/first-subnet/import1.png)

Here, enter the private key. Import the well-known private key `0x56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027`.

![Enter private key](/img/first-subnet/import2.png)

Next, rename the Core account to prevent confusion. On the `Imported` tab, click on the pen icon
next to your account. Rename the account `DO NOT USE -- Public test key` to prevent confusion with any
personal wallets.

![Rename Account](/img/first-subnet/import3.png)

![Rename Account](/img/first-subnet/import4.png)

### Connect to the Subnet

Next, you need to add your Subnet to Core's networks.

In the Core Extension click, `See All Networks` and then select the
 ` + ` icon in the top right.

![Add network](/img/first-subnet/network1.png)

Enter your Subnet's details, found in the output of your `avalanche subnet deploy` 
[command](#deploying-subnets-locally), into the form and click `Save`.

![Add network 2](/img/first-subnet/network2.png)

If all worked as expected, your balance should read 1 million tokens. 
Your Subnet is ready for action. You might want to try to 
[Deploy a Smart Contract on Your Subnet-EVM Using Remix and Core](/build/subnet/utility/deploy-smart-contract-to-subnet.md).

![Subnet in Core](/img/first-subnet/subnet-in-core.png)

## Next Steps

Congrats Subnetooooor, you just deployed your first Subnet!

After you feel comfortable with this deployment flow, try deploying smart contracts on your chain
with [Remix](https://remix.ethereum.org/), [Hardhat](https://hardhat.org/), or
[Foundry](https://github.com/foundry-rs/foundry). You can also experiment with customizing your
Subnet by addingprecompiles or adjusting the airdrop.

Once you've developed a stable Subnet you like, see
[Create an EVM Subnet on Fuji Testnet](/build/subnet/deploy/fuji-testnet-subnet.md) to take your 
Subnet one step closer to production.

Good Subnetting!

## FAQ

**How is the Subnet ID determined upon creation?**

The Subnet ID is the hash of the transaction that created the Subnet.

