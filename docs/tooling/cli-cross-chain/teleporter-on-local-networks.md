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

For more information on cross chain messaging through Teleporter and Warp, check:

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
configuring airdrop to stored key "subnet_<subnet1Name>_airdrop" with address 0x0EF8151A3e6ad1d4e17C8ED4128b20EB5edc58B1
loading stored key "cli-teleporter-deployer" for teleporter deploys
  (evm address, genesis balance) = (0xE932784f56774879e03F3624fbeC6261154ec711, 600000000000000000000)
using latest teleporter version (v1.0.0)
✓ Successfully created subnet configuration
```

Notice that by default, Teleporter is enabled and a stored key is created to fund Teleporter related operations (that is deploy Teleporter
smart contracts, fund Teleporter relayer).

To disable Teleporter in your Subnet, use the flag `--teleporter=false` when creating the Subnet.

To disable Relayer in your Subnet, use the flag `--relayer=false` when creating the Subnet.

Now let's create a second Subnet called `<subnet2Name>`, with similar settings:

```shell
avalanche subnet create <subnet2Name> --evm --latest\
    --evm-chain-id 2 --evm-token TOKEN2 --evm-defaults

creating genesis for <subnet subnet2Name>
configuring airdrop to stored key "subnet_<subnet2Name>_airdrop" with address 0x0EF815FFFF6ad1d4e17C8ED4128b20EB5edAABBB
loading stored key "cli-teleporter-deployer" for teleporter deploys
  (evm address, genesis balance) = (0xE932784f56774879e03F3624fbeC6261154ec711, 600000000000000000000)
using latest teleporter version (v1.1.0)
✓ Successfully created subnet configuration
```

## Deploy the Subnets to Local Network

Let's deploy `<subnet1Name>`:

```shell
avalanche subnet deploy <subnet1Name> --local

Deploying [<subnet1Name>] to Local Network
Backend controller started, pid: 149427, output at: ~/.avalanche-cli/runs/server_20240229_165923/avalanche-cli-backend.log

Booting Network. Wait until healthy...
Node logs directory: ~/.avalanche-cli/runs/network_20240229_165923/node<i>/logs
Network ready to use.

Deploying Blockchain. Wait until network acknowledges...

Teleporter Messenger successfully deployed to c-chain (0xF7cBd95f1355f0d8d659864b92e2e9fbfaB786f7)
Teleporter Registry successfully deployed to c-chain (0x17aB05351fC94a1a67Bf3f56DdbB941aE6c63E25)

Teleporter Messenger successfully deployed to <subnet1Name> (0xF7cBd95f1355f0d8d659864b92e2e9fbfaB786f7)
Teleporter Registry successfully deployed to <subnet1Name> (0x9EDc4cB4E781413b1b82CC3A92a60131FC111F58)

using latest awm-relayer version (v1.1.0)
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
Funded address:   0x0EF8151A3e6ad1d4e17C8ED4128b20EB5edc58B1 with 1000000 (10^18) - private key: 16289399c9466912ffffffdc093c9b51124f0dc54ac7a766b2bc5ccf558d8eee
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

Teleporter Messenger has already been deployed to c-chain

Teleporter Messenger successfully deployed to <subnet2Name> (0xF7cBd95f1355f0d8d659864b92e2e9fbfaB786f7)
Teleporter Registry successfully deployed to <subnet2Name> (0x9EDc4cB4E781413b1b82CC3A92a60131FC111F58)

using latest awm-relayer version (v1.1.0)
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
Funded address:   0x0EF815FFFF6ad1d4e17C8ED4128b20EB5edAABBB with 1000000 (10^18) - private key: 56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027
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

## Obtaining Information on Teleporter Deploys

## Obtaining Subnet Information

By executing `subnet describe` on a teleporter enabled subnet, the following relevant information
can be found:

- blockchain ID in cb58 format
- blockchain ID in plain hex format
- Teleporter Messenger address
- Teleporter Registry address

Let's get the information for `<subnet1Name>`:

```
avalanche subnet describe <subnet1Name>

 _____       _        _ _
|  __ \     | |      (_) |
| |  | | ___| |_ __ _ _| |___
| |  | |/ _ \ __/ _  | | / __|
| |__| |  __/ || (_| | | \__ \
|_____/ \___|\__\__,_|_|_|___/
+--------------------------------+--------------------------------------------------------------------+
|           PARAMETER            |                               VALUE                                |
+--------------------------------+--------------------------------------------------------------------+
| Subnet Name                    | subnet1Name                                                        |
+--------------------------------+--------------------------------------------------------------------+
| ChainID                        | 1                                                                  |
+--------------------------------+--------------------------------------------------------------------+
| Token Name                     | TOKEN1 Token                                                       |
+--------------------------------+--------------------------------------------------------------------+
| Token Symbol                   | TOKEN1                                                             |
+--------------------------------+--------------------------------------------------------------------+
| VM Version                     | v0.6.3                                                             |
+--------------------------------+--------------------------------------------------------------------+
| VM ID                          | srEXiWaHjFEgKSgK2zBgnWQUVEy2MZA7UUqjqmBSS7MZYSCQ5                  |
+--------------------------------+--------------------------------------------------------------------+
| Local Network SubnetID         | 2CZP2ndbQnZxTzGuZjPrJAm5b4s2K2Bcjh8NqWoymi8NZMLYQk                 |
+--------------------------------+--------------------------------------------------------------------+
| Local Network BlockchainID     | 2cFWSgGkmRrmKtbPkB8yTpnq9ykK3Dc2qmxphwYtiGXCvnSwg8                 |
+                                +--------------------------------------------------------------------+
|                                | 0xd3bc5f71e6946d17c488d320cd1f6f5337d9dce75b3fac5023433c4634b6e91e |
+--------------------------------+--------------------------------------------------------------------+
| Local Network Teleporter       | 0x253b2784c75e510dD0fF1da844684a1aC0aa5fcf                         |
| Messenger Address              |                                                                    |
+--------------------------------+--------------------------------------------------------------------+
| Local Network Teleporter       | 0xbD9e8eC38E43d34CAB4194881B9BF39d639D7Bd3                         |
| Registry Address               |                                                                    |
+--------------------------------+--------------------------------------------------------------------+

...
```
## Obtaining C-Chain Information

Similar information can be found for C-Chain by using `primary describe`:

```
avalanche primary describe --local

   _____       _____ _           _         _____
  / ____|     / ____| |         (_)       |  __ \
 | |   ______| |    | |__   __ _ _ _ __   | |__) |_ _ _ __ __ _ _ __ ___  ___
 | |  |______| |    | '_ \ / _  | | '_ \  |  ___/ _  | '__/ _  | '_   _ \/ __|
 | |____     | |____| | | | (_| | | | | | | |  | (_| | | | (_| | | | | | \__ \
  \_____|     \_____|_| |_|\__,_|_|_| |_| |_|   \__,_|_|  \__,_|_| |_| |_|___/

+------------------------------+--------------------------------------------------------------------+
|          PARAMETER           |                               VALUE                                |
+------------------------------+--------------------------------------------------------------------+
| RPC URL                      | http://127.0.0.1:9650/ext/bc/C/rpc                                 |
+------------------------------+--------------------------------------------------------------------+
| EVM Chain ID                 | 43112                                                              |
+------------------------------+--------------------------------------------------------------------+
| TOKEN SYMBOL                 | AVAX                                                               |
+------------------------------+--------------------------------------------------------------------+
| Address                      | 0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC                         |
+------------------------------+--------------------------------------------------------------------+
| Balance                      | 49999489.829989485                                                 |
+------------------------------+--------------------------------------------------------------------+
| Private Key                  | 56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027   |
+------------------------------+--------------------------------------------------------------------+
| BlockchainID                 | 2JeJDKL9Bvn1vLuuPL1DpUccBCVUh7iRnkv3a5pV9kJW5HbuQz                 |
+                              +--------------------------------------------------------------------+
|                              | 0xabc1bd35cb7313c8a2b62980172e6d7ef42aaa532c870499a148858b0b6a34fd |
+------------------------------+--------------------------------------------------------------------+
| Teleporter Messenger Address | 0x253b2784c75e510dD0fF1da844684a1aC0aa5fcf                         |
+------------------------------+--------------------------------------------------------------------+
| Teleporter Registry Address  | 0x17aB05351fC94a1a67Bf3f56DdbB941aE6c63E25                         |
+------------------------------+--------------------------------------------------------------------+
```

## Controlling relayer execution

Besides having the option to not use a relayer at subnet creation time, the relayer
can be stopped and restarted on used request.

To stop the relayer:

```shell
avalanche teleporter relayer stop --local

✓ Local AWM Relayer successfully stopped
```

To start it again:

```shell
avalanche teleporter relayer start --local

using latest awm-relayer version (v1.1.0)
Executing AWM-Relayer...
✓ Local AWM Relayer successfully started
Logs can be found at ~/.avalanche-cli/runs/awm-relayer.log
```
