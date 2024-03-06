---
tags: [Tooling, Avalanche-CLI]
description: This how-to guide focuses on deploying a couple of teleporter-enabled subnets to a local Avalanche network.
sidebar_label: Teleporter On a Local Network
pagination_label: Teleporter On a Local Network
sidebar_position: 1
---

# How to Deploy Teleporter Enabled Subnets on a Local Network

This how-to guide focuses on deploying Teleporter-enabled Subnets to a local Avalanche network.

After this tutorial, you would have created and deployed two Subnets to the local network and have enabled
them to cross-communicate with each other and with the local C-Chain (through Teleporter and the
underlying Warp technology.)

For more information on Cross Chain messaging through Teleporter and Warp, check:

- [Cross Chain References](/build/cross-chain)

Note that currently only [Subnet-EVM](https://github.com/ava-labs/subnet-evm) and [Subnet-EVM-Based](/build/vm/evm/intro.md) virtual
machines support Teleporter.

## Prerequisites

- [Avalanche-CLI installed](/tooling/cli-guides/install-avalanche-cli.md)

## Create Subnets Configurations

Let's create a Subnet called `<subnet1Name>` with the latest Subnet-EVM version, a chain ID of 1, TOKEN1 as the token name,
and with default Subnet-EVM parameters (more information regarding Subnet creation can be found [here](/build/subnet/hello-subnet.md#create-your-subnet-configuration)):

```bash
avalanche subnet create <subnet1Name> --evm --latest\
    --evm-chain-id 1 --evm-token TOKEN1 --evm-defaults

creating genesis for <subnet subnet1Name>
loading stored key "cli-teleporter-deployer" for teleporter deploys
  (evm address, genesis balance) = (0xE932784f56774879e03F3624fbeC6261154ec711, 600000000000000000000)
using latest teleporter version (v0.2.0)
✓ Successfully created subnet configuration
```

Notice that by default, Teleporter is enabled and a stored key is created to fund Teleporter related operations (that is deploy Teleporter
smart contracts, fund Teleporter relayer).

To disable Teleporter in your Subnet, use the flag `--teleporter=false` when creating the Subnet.

Now let's create a second Subnet called `<subnet2Name>`, with similar settings:

```shell
avalanche subnet create <subnet2Name> --evm --latest\
    --evm-chain-id 2 --evm-token TOKEN2 --evm-defaults

creating genesis for <subnet subnet2Name>
loading stored key "cli-teleporter-deployer" for teleporter deploys
  (evm address, genesis balance) = (0xE932784f56774879e03F3624fbeC6261154ec711, 600000000000000000000)
using latest teleporter version (v0.2.0)
✓ Successfully created subnet configuration
```

## Deploy the Subnets to Local Network

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

Notice some details here:

- Two smart contracts are deployed to each Subnet: Teleporter Messenger smart contract and Teleporter Registry smart contract
- Both Teleporter smart contracts are also deployed to `C-Chain` in the Local Network
- [AWM Teleporter Relayer](https://github.com/ava-labs/awm-relayer) is installed, configured and executed in background (A Relayer
  [listens](/build/cross-chain/teleporter/overview#data-flow) for new messages being generated on a source Subnet and sends them to the destination Subnet.)

CLI configures the Relayer to enable every Subnet to send messages to all other Subnets. If you add
more Subnets, the Relayer will be automatically reconfigured.

When deploying Subnet `<subnet2Name>`, the two Teleporter contracts will not be deployed to C-Chain in Local Network
as they have already been deployed when we deployed the first Subnet.

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

## Verify Teleporter Is Successfully Set Up

To verify that Teleporter is successfully, let's send a couple of cross messages:

```shell
avalanche teleporter msg C-Chain subnet1Name "Hello World" --local

Delivering message "this is a message" to source subnet "C-Chain"
Waiting for message to be received at destination subnet subnet "subnet1Name"
Message successfully Teleported!
```

```shell
avalanche teleporter msg subnet2Name subnet1Name "Hello World" --local

Delivering message "this is a message" to source subnet "subnet2Name"
Waiting for message to be received at destination subnet subnet "subnet1Name"
Message successfully Teleported!
```

You have Teleport-ed your first message in the Local Network!

Relayer related logs can be found at `~/.avalanche-cli/runs/awm-relayer.log`, and
relayer configuration can be found at `~/.avalanche-cli/runs/awm-relayer-config.json`
