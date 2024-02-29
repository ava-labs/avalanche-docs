---
tags: [Tooling, Avalanche-CLI]
description: This how-to guide focuses on deploying a couple of teleporter-enabled subnets to a local Avalanche network.
sidebar_label: Teleporter On a Local Network 
pagination_label: Teleporter On a Local Network
sidebar_position: 1
---

# How to Deploy Teleporter Enabled Subnets on a Local Network

This how-to guide focuses on deploying Teleporter-enabled Subnets to a local Avalanche network.

It guides you to create and deploy a pair of Subnets and cross communicate between them and with the local
`C-Chain` by using Teleporter and the underlying warp technology.

For more information and concepts on Cross Chain messaging at Avalanche, Teleporter and Warp, check:

- [Cross Chain References](/build/cross-chain)

Note that currently only [Subnet-EVM](https://github.com/ava-labs/subnet-evm) and [Subnet-EVM-Based](https://github.com/ava-labs/precompile-evm) virtual
machines support Teleporter, so we will using them in this tutorial.

## Prerequisites

- [Avalanche-CLI installed](/tooling/cli-guides/install-avalanche-cli.md)

## Create Subnets Configurations

Either you can create a Subnet configuration [by interacting with a Wizard](/build/subnet/hello-subnet#create-your-subnet-configuration), 
or you can use command line flags to bypass interaction.

We will illustrate the second case here.

Let's create `<subnet1Name>` which uses the latest Subnet-evm version, a chain ID of 1, TOKEN1 as token name, and default evm parameters:

```bash
avalanche subnet create <subnet1Name> --evm --latest\
    --evm-chain-id 1 --evm-token TOKEN1 --evm-defaults

creating genesis for <subnet subnet1Name>
loading stored key "cli-teleporter-deployer" for teleporter deploys
  (evm address, genesis balance) = (0xE932784f56774879e03F3624fbeC6261154ec711, 600000000000000000000)
using latest teleporter version (v0.2.0)
✓ Successfully created subnet configuration
```

Notice that by default Teleporter is enabled and a stored key is created or used to fund Teleporter related operations (deploy Teleporter
smart contracts, fund Teleporter relayer).

_You need to set command line flag `--teleporter=false` for a Subnet to not support Teleporter._

Now let's create `<subnet2Name>`, with similar settings:

```shell
avalanche subnet create <subnet2Name> --evm --latest\
    --evm-chain-id 2 --evm-token TOKEN2 --evm-defaults

creating genesis for <subnet subnet2Name>
loading stored key "cli-teleporter-deployer" for teleporter deploys
  (evm address, genesis balance) = (0xE932784f56774879e03F3624fbeC6261154ec711, 600000000000000000000)
using latest teleporter version (v0.2.0)
✓ Successfully created subnet configuration
```

## Locally Deploy the Subnets

Let's deploy `<subnet1Name>`:

```shell
avalanche subnet deploy <subnet1Name> --local

Deploying [<subnet1Name>] to Local Network
Backend controller started, pid: 149427, output at: /home/fm/.avalanche-cli/runs/server_20240229_165923/avalanche-cli-backend.log

Booting Network. Wait until healthy...
Node logs directory: /home/fm/.avalanche-cli/runs/network_20240229_165923/node<i>/logs
Network ready to use.

Deploying Blockchain. Wait until network acknowledges...

Loading stored key "cli-awm-relayer" for relayer ops

Teleporter Messenger successfully deployed to c-chain (0xF7cBd95f1355f0d8d659864b92e2e9fbfaB786f7)
Teleporter Registry successfully deployed to c-chain (0x17aB05351fC94a1a67Bf3f56DdbB941aE6c63E25)

Loading cli-teleporter-deployer key
Teleporter Messenger successfully deployed to <subnet1Name> (0xF7cBd95f1355f0d8d659864b92e2e9fbfaB786f7)
Teleporter Registry successfully deployed to <subnet1Name> (0x9EDc4cB4E781413b1b82CC3A92a60131FC111F58)

using latest awm-relayer version (v0.2.13)
Executing AWM-Relayer...

Blockchain ready to use. Local network node endpoints:
+-------+---------------+------------------------------------------------------------------------------------+------------------------------------------------+
| NODE  |     VM        |                                        URL                                         |                  ALIAS URL                     |
+-------+---------------+------------------------------------------------------------------------------------+------------------------------------------------+
| node1 | <subnet1Name> | http://127.0.0.1:9650/ext/bc/MzN4AbtFzQ3eKqPhFaDpwCMJmagciWSCgghkZx6YeC6jRdvb6/rpc | http://127.0.0.1:9650/ext/bc/<subnet1Name>/rpc |
+-------+---------------+------------------------------------------------------------------------------------+------------------------------------------------+
| node2 | <subnet1Name> | http://127.0.0.1:9652/ext/bc/MzN4AbtFzQ3eKqPhFaDpwCMJmagciWSCgghkZx6YeC6jRdvb6/rpc | http://127.0.0.1:9652/ext/bc/<subnet1Name>/rpc |
+-------+---------------+------------------------------------------------------------------------------------+------------------------------------------------+
| node3 | <subnet1Name> | http://127.0.0.1:9654/ext/bc/MzN4AbtFzQ3eKqPhFaDpwCMJmagciWSCgghkZx6YeC6jRdvb6/rpc | http://127.0.0.1:9654/ext/bc/<subnet1Name>/rpc |
+-------+---------------+------------------------------------------------------------------------------------+------------------------------------------------+
| node4 | <subnet1Name> | http://127.0.0.1:9656/ext/bc/MzN4AbtFzQ3eKqPhFaDpwCMJmagciWSCgghkZx6YeC6jRdvb6/rpc | http://127.0.0.1:9656/ext/bc/<subnet1Name>/rpc |
+-------+---------------+------------------------------------------------------------------------------------+------------------------------------------------+
| node5 | <subnet1Name> | http://127.0.0.1:9658/ext/bc/MzN4AbtFzQ3eKqPhFaDpwCMJmagciWSCgghkZx6YeC6jRdvb6/rpc | http://127.0.0.1:9658/ext/bc/<subnet1Name>/rpc |
+-------+---------------+------------------------------------------------------------------------------------+------------------------------------------------+

Browser Extension connection details (any node URL from above works):
RPC URL:          http://127.0.0.1:9650/ext/bc/MzN4AbtFzQ3eKqPhFaDpwCMJmagciWSCgghkZx6YeC6jRdvb6/rpc
Funded address:   0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC with 1000000 (10^18) - private key: 56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027
Network name:     <subnet1Name>
Chain ID:         1
Currency Symbol:  TOKEN1
```

Some details can be noticed here:

- two smart contracts are deployed per Subnet, Teleporter messenger and Teleporter registry
- the Teleporter contracts are also deployed to local `C-Chain`
- a Teleporter relayer is executed in background

As part of the deploy, an [AWM Relayer](https://github.com/ava-labs/awm-relayer) is installed, configured and executed.
A relayer, or some other intermediate procedure, is always needed for a Teleporter or warp message to be sent from
one Subnet to the other. In this case the relayer is an actor that listens for new messages being generated on a source Subnet,
and send them to the destination Subnet.

On local network, CLI configures the relayer so every Subnet can message to every other Subnet.

When deploying `<subnet2Name>`, the main change is that `C-Chain` Teleporter contracts are not going to be deployed, as they
have already been deployed.

```shell
avalanche subnet deploy <subnet2Name> --local

Deploying [<subnet2Name>] to Local Network

Deploying Blockchain. Wait until network acknowledges...

Loading stored key "cli-awm-relayer" for relayer ops

Teleporter Messenger has already been deployed to c-chain

Loading cli-teleporter-deployer key
Teleporter Messenger successfully deployed to <subnet2Name> (0xF7cBd95f1355f0d8d659864b92e2e9fbfaB786f7)
Teleporter Registry successfully deployed to <subnet2Name> (0x9EDc4cB4E781413b1b82CC3A92a60131FC111F58)

using latest awm-relayer version (v0.2.13)
Executing AWM-Relayer...

Blockchain ready to use. Local network node endpoints:
+-------+---------------+-------------------------------------------------------------------------------------+------------------------------------------------+
| NODE  |     VM        |                                         URL                                         |                  ALIAS URL                     |
+-------+---------------+-------------------------------------------------------------------------------------+------------------------------------------------+
| node1 | <subnet2Name> | http://127.0.0.1:9650/ext/bc/2tVGwEQmeXtdnFURW1YSq5Yf4jbJPfTBfVcu68KWHdHe5e5gX5/rpc | http://127.0.0.1:9650/ext/bc/<subnet2Name>/rpc |
+-------+---------------+-------------------------------------------------------------------------------------+------------------------------------------------+
| node1 | <subnet1Name> | http://127.0.0.1:9650/ext/bc/MzN4AbtFzQ3eKqPhFaDpwCMJmagciWSCgghkZx6YeC6jRdvb6/rpc  | http://127.0.0.1:9650/ext/bc/<subnet1Name>/rpc |
+-------+---------------+-------------------------------------------------------------------------------------+------------------------------------------------+
| node2 | <subnet2Name> | http://127.0.0.1:9652/ext/bc/2tVGwEQmeXtdnFURW1YSq5Yf4jbJPfTBfVcu68KWHdHe5e5gX5/rpc | http://127.0.0.1:9652/ext/bc/<subnet2Name>/rpc |
+-------+---------------+-------------------------------------------------------------------------------------+------------------------------------------------+
| node2 | <subnet1Name> | http://127.0.0.1:9652/ext/bc/MzN4AbtFzQ3eKqPhFaDpwCMJmagciWSCgghkZx6YeC6jRdvb6/rpc  | http://127.0.0.1:9652/ext/bc/<subnet1Name>/rpc |
+-------+---------------+-------------------------------------------------------------------------------------+------------------------------------------------+
| node3 | <subnet2Name> | http://127.0.0.1:9654/ext/bc/2tVGwEQmeXtdnFURW1YSq5Yf4jbJPfTBfVcu68KWHdHe5e5gX5/rpc | http://127.0.0.1:9654/ext/bc/<subnet2Name>/rpc |
+-------+---------------+-------------------------------------------------------------------------------------+------------------------------------------------+
| node3 | <subnet1Name> | http://127.0.0.1:9654/ext/bc/MzN4AbtFzQ3eKqPhFaDpwCMJmagciWSCgghkZx6YeC6jRdvb6/rpc  | http://127.0.0.1:9654/ext/bc/<subnet1Name>/rpc |
+-------+---------------+-------------------------------------------------------------------------------------+------------------------------------------------+
| node4 | <subnet2Name> | http://127.0.0.1:9656/ext/bc/2tVGwEQmeXtdnFURW1YSq5Yf4jbJPfTBfVcu68KWHdHe5e5gX5/rpc | http://127.0.0.1:9656/ext/bc/<subnet2Name>/rpc |
+-------+---------------+-------------------------------------------------------------------------------------+------------------------------------------------+
| node4 | <subnet1Name> | http://127.0.0.1:9656/ext/bc/MzN4AbtFzQ3eKqPhFaDpwCMJmagciWSCgghkZx6YeC6jRdvb6/rpc  | http://127.0.0.1:9656/ext/bc/<subnet1Name>/rpc |
+-------+---------------+-------------------------------------------------------------------------------------+------------------------------------------------+
| node5 | <subnet1Name> | http://127.0.0.1:9658/ext/bc/MzN4AbtFzQ3eKqPhFaDpwCMJmagciWSCgghkZx6YeC6jRdvb6/rpc  | http://127.0.0.1:9658/ext/bc/<subnet1Name>/rpc |
+-------+---------------+-------------------------------------------------------------------------------------+------------------------------------------------+
| node5 | <subnet2Name> | http://127.0.0.1:9658/ext/bc/2tVGwEQmeXtdnFURW1YSq5Yf4jbJPfTBfVcu68KWHdHe5e5gX5/rpc | http://127.0.0.1:9658/ext/bc/<subnet2Name>/rpc |
+-------+---------------+-------------------------------------------------------------------------------------+------------------------------------------------+

Browser Extension connection details (any node URL from above works):
RPC URL:          http://127.0.0.1:9650/ext/bc/2tVGwEQmeXtdnFURW1YSq5Yf4jbJPfTBfVcu68KWHdHe5e5gX5/rpc
Funded address:   0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC with 1000000 (10^18) - private key: 56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027
Network name:     <subnet2Name>
Chain ID:         2
Currency Symbol:  TOKEN2
```

## Basic Check of the Local Teleporter Environment


CLI provides an utility command so as to easily verify if the Subnets are communicating each other as excepted.

Let's send a couple of cross messages:


```shell
avalanche teleporter msg C-Chain subnet1Name "this is a message" --local

Delivering message "this is a message" to source subnet "C-Chain"
Waiting for message to be received at destination subnet subnet "subnet1Name"
Message successfully Teleported!
```

```shell
avalanche teleporter msg subnet2Name subnet1Name "this is a message" --local

Delivering message "this is a message" to source subnet "subnet2Name"
Waiting for message to be received at destination subnet subnet "subnet1Name"
Message successfully Teleported!
```

You have Teleport-ed your first messages in the local network!

_If you are interested in relayer-related stuff, you can check relayer logs at `~/.avalanche-cli/runs/awm-relayer.log`, and
relayer configuration at `~/.avalanche-cli/runs/awm-relayer-config.json`_

