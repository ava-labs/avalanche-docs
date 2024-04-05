---
tags: [Tooling, Avalanche-CLI]
description: This how-to guide focuses on deploying a couple of teleporter-enabled subnets to a Devnet.
sidebar_label: Teleporter On a Devnet
pagination_label: Teleporter On a Devnet
sidebar_position: 2
---

# How to Deploy Teleporter Enabled Subnets on a Devnet

This how-to guide focuses on deploying Teleporter-enabled Subnets to a Devnet.

After this tutorial, you would have created a Devnet and deployed two Subnets onto it, and have enabled
them to cross-communicate with each other and with the C-Chain (through Teleporter and the
underlying Warp technology.)

For more information on cross chain messaging through Teleporter and Warp, check:

- [Cross Chain References](/build/cross-chain)

Note that currently only [Subnet-EVM](https://github.com/ava-labs/subnet-evm) and [Subnet-EVM-Based](/build/vm/evm/intro.md) virtual
machines support Teleporter.

## Prerequisites

Before we begin, you will need to have:

- Created an AWS account and have an updated AWS `credentials` file in home directory with [default] profile

Note: the tutorial is based in AWS, but Devnets can also be created and operated in other supported
cloud providers, such as GCP.

## Create Subnets configurations

For this section we will follow this [instructions](/tooling/cli-cross-chain/teleporter-on-local-networks.md#create-subnets-configurations),
in order to create two Teleporter-enabled Subnets, `<subnet1Name>` and `<subnet2Name>`.

## Create a devnet and Deploy a Subnet into it

Let's use the `devnet wiz` command to create a devnet `<devnetName>` and deploy `<subnet1Name>` onto it.

The devnet will be created in the `us-east-1` region of Amazon Cloud Service, and will consist of 5 validators only.

```shell
avalanche node devnet wiz <devnetName> <subnet1Name> --aws --node-type default --region us-east-1 --num-validators 5 --num-apis 0 --enable-monitoring=false --default-validator-params 

Creating the devnet...

Creating new EC2 instance(s) on AWS...
...

Deploying [subnet1Name] to Cluster <devnetName>
...

configuring AWM RElayer on host i-0f1815c016b555fcc

Setting the nodes as subnet trackers
...

Setting up teleporter on subnet

Teleporter Messenger successfully deployed to subnet1Name (0x253b2784c75e510dD0fF1da844684a1aC0aa5fcf)
Teleporter Registry successfully deployed to subnet1Name (0xb623C4495220C603D0A939D32478F55891a61750)
Teleporter Messenger successfully deployed to c-chain (0x253b2784c75e510dD0fF1da844684a1aC0aa5fcf)
Teleporter Registry successfully deployed to c-chain (0x5DB9A7629912EBF95876228C24A848de0bfB43A9)

Starting AWM Relayer Service

setting AWM Relayer on host i-0f1815c016b555fcc to relay subnet subnet1Name
updating configuration file ~/.avalanche-cli/nodes/i-0f1815c016b555fcc/services/awm-relayer/awm-relayer-config.json

Devnet <devnetName> is successfully created and is now validating subnet subnet1Name!

Subnet <subnet1Name> RPC URL: http://67.202.23.231:9650/ext/bc/fqcM24LNb3kTV7KD1mAvUJXYy5XunwP8mrE44YuNwPjgZHY6p/rpc
 
✓ Cluster information YAML file can be found at ~/.avalanche-cli/nodes/inventories/<devnetName>/clusterInfo.yaml at local host
```

Notice some details here:

- Two smart contracts are deployed to the Subnet: Teleporter Messenger smart contract and Teleporter Registry smart contract
- Both Teleporter smart contracts are also deployed to `C-Chain`
- [AWM Teleporter Relayer](https://github.com/ava-labs/awm-relayer) is installed and configured as a service into one of the nodes
  (A Relayer [listens](/build/cross-chain/teleporter/overview#data-flow) for new messages being generated on a source
 Subnet and sends them to the destination Subnet.)

CLI configures the Relayer to enable every Subnet to send messages to all other Subnets. If you add
more Subnets, the Relayer will be automatically reconfigured.

## Checking devnet configuration and Relayer logs

Execute `node list` command to get a list of the devnet nodes:

```shell
avalanche node list

Cluster "<devnetName>" (Devnet)
  Node i-0f1815c016b555fcc (NodeID-91PGQ7keavfSV1XVFva2WsQXWLWZqqqKe) 67.202.23.231 [Validator,Relayer]
  Node i-026392a651571232c (NodeID-AkPyyTs9e9nPGShdSoxdvWYZ6X2zYoyrK) 52.203.183.68 [Validator]
  Node i-0d1b98d5d941d6002 (NodeID-ByEe7kuwtrPStmdMgY1JiD39pBAuFY2mS) 50.16.235.194 [Validator]
  Node i-0c291f54bb38c2984 (NodeID-8SE2CdZJExwcS14PYEqr3VkxFyfDHKxKq) 52.45.0.56 [Validator]
  Node i-049916e2f35231c29 (NodeID-PjQY7xhCGaB8rYbkXYddrr1mesYi29oFo) 3.214.163.110 [Validator]
```

Notice that, in this case, `i-0f1815c016b555fcc` was set as Relayer. This host contains a
`systemd` service called `awm-relayer` that can be used to check the Relayer logs, and set the execution
status.

To view the Relayer logs, the following command can be used:

```shell
avalanche node ssh i-0f1815c016b555fcc "journalctl -u awm-relayer --no-pager"

  [Node i-0f1815c016b555fcc (NodeID-91PGQ7keavfSV1XVFva2WsQXWLWZqqqKe) 67.202.23.231 [Validator,Relayer]]
Warning: Permanently added '67.202.23.231' (ED25519) to the list of known hosts.
-- Logs begin at Fri 2024-04-05 14:11:43 UTC, end at Fri 2024-04-05 14:30:24 UTC. --
Apr 05 14:15:06 ip-172-31-47-187 systemd[1]: Started AWM Relayer systemd service.
Apr 05 14:15:07 ip-172-31-47-187 awm-relayer[6886]: {"level":"info","timestamp":"2024-04-05T14:15:07.018Z","logger":"awm-relayer","caller":"main/main.go:66","msg":"Initializing awm-relayer"}
Apr 05 14:15:07 ip-172-31-47-187 awm-relayer[6886]: {"level":"info","timestamp":"2024-04-05T14:15:07.018Z","logger":"awm-relayer","caller":"main/main.go:71","msg":"Set config options."}
Apr 05 14:15:07 ip-172-31-47-187 awm-relayer[6886]: {"level":"info","timestamp":"2024-04-05T14:15:07.018Z","logger":"awm-relayer","caller":"main/main.go:78","msg":"Initializing destination clients"}
Apr 05 14:15:07 ip-172-31-47-187 awm-relayer[6886]: {"level":"info","timestamp":"2024-04-05T14:15:07.021Z","logger":"awm-relayer","caller":"main/main.go:97","msg":"Initializing app request network"}
Apr 05 14:15:08 ip-172-31-47-187 awm-relayer[6886]: {"level":"info","timestamp":"2024-04-05T14:15:08.159Z","logger":"awm-relayer","caller":"main/main.go:309","msg":"starting metrics server...","port":9090}
Apr 05 14:15:08 ip-172-31-47-187 awm-relayer[6886]: {"level":"info","timestamp":"2024-04-05T14:15:08.160Z","logger":"awm-relayer","caller":"main/main.go:251","msg":"Creating relayer","originBlockchainID":"fqcM24LNb3kTV7KD1mAvUJXYy5XunwP8mrE44YuNwPjgZHY6p"}
Apr 05 14:15:08 ip-172-31-47-187 awm-relayer[6886]: {"level":"info","timestamp":"2024-04-05T14:15:08.160Z","logger":"awm-relayer","caller":"main/main.go:251","msg":"Creating relayer","originBlockchainID":"2EfJg86if9Ka5Ag73JRfoqWz4EGuFwtemaNf4XiBBpUW4YngS6"}
Apr 05 14:15:08 ip-172-31-47-187 awm-relayer[6886]: {"level":"info","timestamp":"2024-04-05T14:15:08.160Z","logger":"awm-relayer","caller":"relayer/relayer.go:114","msg":"Creating relayer","subnetID":"11111111111111111111111111111111LpoYY","subnetIDHex":"0000000000000000000000000000000000000000000000000000000000000000","blockchainID":"2EfJg86if9Ka5Ag73JRfoqWz4EGuFwtemaNf4XiBBpUW4YngS6","blockchainIDHex":"a2b6b947cf2b9bf6df03c8caab08e38ab951d8b120b9c37265d9be01d86bb170"}
Apr 05 14:15:08 ip-172-31-47-187 awm-relayer[6886]: {"level":"info","timestamp":"2024-04-05T14:15:08.160Z","logger":"awm-relayer","caller":"relayer/relayer.go:114","msg":"Creating relayer","subnetID":"giY8tswWgZmcAWzPkoNrmjjrykited7GJ9799SsFzTiq5a1ML","subnetIDHex":"5a2e2d87d74b4ec62fdd6626e7d36a44716484dfcc721aa4f2168e8a61af63af","blockchainID":"fqcM24LNb3kTV7KD1mAvUJXYy5XunwP8mrE44YuNwPjgZHY6p","blockchainIDHex":"582fc7bd55472606c260668213bf1b6d291df776c9edf7e042980a84cce7418a"}
Apr 05 14:15:08 ip-172-31-47-187 awm-relayer[6886]: {"level":"info","timestamp":"2024-04-05T14:15:08.171Z","logger":"awm-relayer","caller":"evm/subscriber.go:247","msg":"Successfully subscribed","blockchainID":"2EfJg86if9Ka5Ag73JRfoqWz4EGuFwtemaNf4XiBBpUW4YngS6"}
Apr 05 14:15:08 ip-172-31-47-187 awm-relayer[6886]: {"level":"info","timestamp":"2024-04-05T14:15:08.171Z","logger":"awm-relayer","caller":"relayer/relayer.go:161","msg":"processed-missed-blocks set to false, starting processing from chain head","blockchainID":"2EfJg86if9Ka5Ag73JRfoqWz4EGuFwtemaNf4XiBBpUW4YngS6"}
Apr 05 14:15:08 ip-172-31-47-187 awm-relayer[6886]: {"level":"info","timestamp":"2024-04-05T14:15:08.172Z","logger":"awm-relayer","caller":"relayer/message_relayer.go:662","msg":"Updating latest processed block in database","relayerID":"0xea06381426934ec1800992f41615b9d362c727ad542f6351dbfa7ad2849a35bf","latestBlock":6}
Apr 05 14:15:08 ip-172-31-47-187 awm-relayer[6886]: {"level":"info","timestamp":"2024-04-05T14:15:08.173Z","logger":"awm-relayer","caller":"relayer/message_relayer.go:662","msg":"Updating latest processed block in database","relayerID":"0x175e14327136d57fe22d4bdd295ff14bea8a7d7ab1884c06a4d9119b9574b9b3","latestBlock":6}
Apr 05 14:15:08 ip-172-31-47-187 awm-relayer[6886]: {"level":"info","timestamp":"2024-04-05T14:15:08.173Z","logger":"awm-relayer","caller":"main/main.go:272","msg":"Created relayer","blockchainID":"2EfJg86if9Ka5Ag73JRfoqWz4EGuFwtemaNf4XiBBpUW4YngS6"}
Apr 05 14:15:08 ip-172-31-47-187 awm-relayer[6886]: {"level":"info","timestamp":"2024-04-05T14:15:08.173Z","logger":"awm-relayer","caller":"main/main.go:295","msg":"Relayer initialized. Listening for messages to relay.","originBlockchainID":"2EfJg86if9Ka5Ag73JRfoqWz4EGuFwtemaNf4XiBBpUW4YngS6"}
Apr 05 14:15:08 ip-172-31-47-187 awm-relayer[6886]: {"level":"info","timestamp":"2024-04-05T14:15:08.178Z","logger":"awm-relayer","caller":"evm/subscriber.go:247","msg":"Successfully subscribed","blockchainID":"fqcM24LNb3kTV7KD1mAvUJXYy5XunwP8mrE44YuNwPjgZHY6p"}
Apr 05 14:15:08 ip-172-31-47-187 awm-relayer[6886]: {"level":"info","timestamp":"2024-04-05T14:15:08.178Z","logger":"awm-relayer","caller":"relayer/relayer.go:161","msg":"processed-missed-blocks set to false, starting processing from chain head","blockchainID":"fqcM24LNb3kTV7KD1mAvUJXYy5XunwP8mrE44YuNwPjgZHY6p"}
Apr 05 14:15:08 ip-172-31-47-187 awm-relayer[6886]: {"level":"info","timestamp":"2024-04-05T14:15:08.179Z","logger":"awm-relayer","caller":"relayer/message_relayer.go:662","msg":"Updating latest processed block in database","relayerID":"0xe584ccc0df44506255811f6b54375e46abd5db40a4c84fd9235a68f7b69c6f06","latestBlock":6}
Apr 05 14:15:08 ip-172-31-47-187 awm-relayer[6886]: {"level":"info","timestamp":"2024-04-05T14:15:08.179Z","logger":"awm-relayer","caller":"relayer/message_relayer.go:662","msg":"Updating latest processed block in database","relayerID":"0x70f14d33bde4716928c5c4723d3969942f9dfd1f282b64ffdf96f5ac65403814","latestBlock":6}
Apr 05 14:15:08 ip-172-31-47-187 awm-relayer[6886]: {"level":"info","timestamp":"2024-04-05T14:15:08.180Z","logger":"awm-relayer","caller":"main/main.go:272","msg":"Created relayer","blockchainID":"fqcM24LNb3kTV7KD1mAvUJXYy5XunwP8mrE44YuNwPjgZHY6p"}
Apr 05 14:15:08 ip-172-31-47-187 awm-relayer[6886]: {"level":"info","timestamp":"2024-04-05T14:15:08.180Z","logger":"awm-relayer","caller":"main/main.go:295","msg":"Relayer initialized. Listening for messages to relay.","originBlockchainID":"fqcM24LNb3kTV7KD1mAvUJXYy5XunwP8mrE44YuNwPjgZHY6p"}
```

## Deploying the Second Subnet

Let's use the `devnet wiz` command again to deploy `<subnet2Name>`.

When deploying Subnet `<subnet2Name>`, the two Teleporter contracts will not be deployed to C-Chain in Local Network
as they have already been deployed when we deployed the first Subnet.

```shell
avalanche node devnet wiz <devnetName> <subnet2Name> --default-validator-params 

Adding subnet into existing devnet <devnetName>...
...

Deploying [subnet2Name] to Cluster <devnetName>
...

Stopping AWM Relayer Service

Setting the nodes as subnet trackers
...

Setting up teleporter on subnet

Teleporter Messenger successfully deployed to subnet2Name (0x253b2784c75e510dD0fF1da844684a1aC0aa5fcf)
Teleporter Registry successfully deployed to subnet2Name (0xb623C4495220C603D0A939D32478F55891a61750)
Teleporter Messenger has already been deployed to c-chain

Starting AWM Relayer Service

setting AWM Relayer on host i-0f1815c016b555fcc to relay subnet subnet2Name
updating configuration file ~/.avalanche-cli/nodes/i-0f1815c016b555fcc/services/awm-relayer/awm-relayer-config.json

Devnet <devnetName> is now validating subnet subnet2Name

Subnet <subnet2Name> RPC URL: http://67.202.23.231:9650/ext/bc/7gKt6evRnkA2uVHRfmk9WrH3dYZH9gEVVxDAknwtjvtaV3XuQ/rpc

✓ Cluster information YAML file can be found at ~/.avalanche-cli/nodes/inventories/<devnetName>/clusterInfo.yaml at local host
```

## Verify Teleporter Is Successfully Set Up

To verify that Teleporter is successfully, let's send a couple of cross messages:

```shell
avalanche teleporter msg C-Chain subnet1Name "Hello World" --cluster <devnetName>

Delivering message "this is a message" to source subnet "C-Chain" (2EfJg86if9Ka5Ag73JRfoqWz4EGuFwtemaNf4XiBBpUW4YngS6)
Waiting for message to be received at destination subnet subnet "subnet1Name" (fqcM24LNb3kTV7KD1mAvUJXYy5XunwP8mrE44YuNwPjgZHY6p)
Message successfully Teleported!
```

```shell
avalanche teleporter msg subnet2Name subnet1Name "Hello World" --cluster <devnetName>

Delivering message "this is a message" to source subnet "subnet2Name" (29WP91AG7MqPUFEW2YwtKnsnzVrRsqcWUpoaoSV1Q9DboXGf4q)
Waiting for message to be received at destination subnet subnet "subnet1Name" (fqcM24LNb3kTV7KD1mAvUJXYy5XunwP8mrE44YuNwPjgZHY6p)
Message successfully Teleported!
```

You have Teleport-ed your first message in the Devnet!

## Obtaining Information on Teleporter Deploys

### Obtaining Subnet Information

By executing `subnet describe` on a Teleporter enabled Subnet, the following relevant information
can be found:

- Blockchain RPC URL
- Blockchain ID in cb58 format
- Blockchain ID in plain hex format
- Teleporter Messenger address
- Teleporter Registry address

Let's get the information for `<subnet1Name>`:

```shell
avalanche subnet describe <subnet1Name>

 _____       _        _ _
|  __ \     | |      (_) |
| |  | | ___| |_ __ _ _| |___
| |  | |/ _ \ __/ _  | | / __|
| |__| |  __/ || (_| | | \__ \
|_____/ \___|\__\__,_|_|_|___/

+--------------------------------+----------------------------------------------------------------------------------------+
|           PARAMETER            |                               VALUE                                                    |
+--------------------------------+----------------------------------------------------------------------------------------+
| Subnet Name                    | subnet1Name                                                                            |
+--------------------------------+----------------------------------------------------------------------------------------+
| ChainID                        | 1                                                                                      |
+--------------------------------+----------------------------------------------------------------------------------------+
| Token Name                     | TOKEN1 Token                                                                           |
+--------------------------------+----------------------------------------------------------------------------------------+
| Token Symbol                   | TOKEN1                                                                                 |
+--------------------------------+----------------------------------------------------------------------------------------+
| VM Version                     | v0.6.3                                                                                 |
+--------------------------------+----------------------------------------------------------------------------------------+
| VM ID                          | srEXiWaHjFEgKSgK2zBgnWQUVEy2MZA7UUqjqmBSS7MZYSCQ5                                      |
+--------------------------------+----------------------------------------------------------------------------------------+
| Cluster <devnetName> SubnetID  | giY8tswWgZmcAWzPkoNrmjjrykited7GJ9799SsFzTiq5a1ML                                      |
+--------------------------------+----------------------------------------------------------------------------------------+
| Cluster <devnetName> RPC URL   | http://67.202.23.231:9650/ext/bc/fqcM24LNb3kTV7KD1mAvUJXYy5XunwP8mrE44YuNwPjgZHY6p/rpc |
+--------------------------------+----------------------------------------------------------------------------------------+
| Cluster <devnetName>           | fqcM24LNb3kTV7KD1mAvUJXYy5XunwP8mrE44YuNwPjgZHY6p                                      |
| BlockchainID                   |                                                                                        |
+                                +----------------------------------------------------------------------------------------+
|                                | 0x582fc7bd55472606c260668213bf1b6d291df776c9edf7e042980a84cce7418a                     |
|                                |                                                                                        |
+--------------------------------+----------------------------------------------------------------------------------------+
| Cluster <devnetName> Teleporter| 0x253b2784c75e510dD0fF1da844684a1aC0aa5fcf                                             |
| Messenger Address              |                                                                                        |
+--------------------------------+----------------------------------------------------------------------------------------+
| Cluster <devnetName> Teleporter| 0xb623C4495220C603D0A939D32478F55891a61750                                             |
| Registry Address               |                                                                                        |
+--------------------------------+----------------------------------------------------------------------------------------+

...
```

### Obtaining C-Chain Information

Similar information can be found for C-Chain by using `primary describe`:

```shell
avalanche primary describe --cluster <devnetName>

   _____       _____ _           _         _____
  / ____|     / ____| |         (_)       |  __ \
 | |   ______| |    | |__   __ _ _ _ __   | |__) |_ _ _ __ __ _ _ __ ___  ___
 | |  |______| |    | '_ \ / _  | | '_ \  |  ___/ _  | '__/ _  | '_   _ \/ __|
 | |____     | |____| | | | (_| | | | | | | |  | (_| | | | (_| | | | | | \__ \
  \_____|     \_____|_| |_|\__,_|_|_| |_| |_|   \__,_|_|  \__,_|_| |_| |_|___/

+------------------------------+--------------------------------------------------------------------+
|          PARAMETER           |                               VALUE                                |
+------------------------------+--------------------------------------------------------------------+
| RPC URL                      | http://67.202.23.231:9650/ext/bc/C/rpc                             |
+------------------------------+--------------------------------------------------------------------+
| EVM Chain ID                 | 43112                                                              |
+------------------------------+--------------------------------------------------------------------+
| TOKEN SYMBOL                 | AVAX                                                               |
+------------------------------+--------------------------------------------------------------------+
| Address                      | 0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC                         |
+------------------------------+--------------------------------------------------------------------+
| Balance                      | 49999489.815751426                                                 |
+------------------------------+--------------------------------------------------------------------+
| Private Key                  | 56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027   |
+------------------------------+--------------------------------------------------------------------+
| BlockchainID                 | 2EfJg86if9Ka5Ag73JRfoqWz4EGuFwtemaNf4XiBBpUW4YngS6                 |
+                              +--------------------------------------------------------------------+
|                              | 0xa2b6b947cf2b9bf6df03c8caab08e38ab951d8b120b9c37265d9be01d86bb170 |
+------------------------------+--------------------------------------------------------------------+
| Teleporter Messenger Address | 0x253b2784c75e510dD0fF1da844684a1aC0aa5fcf                         |
+------------------------------+--------------------------------------------------------------------+
| Teleporter Registry Address  | 0x5DB9A7629912EBF95876228C24A848de0bfB43A9                         |
+------------------------------+--------------------------------------------------------------------+
```

## Controlling Relayer Execution

CLI provides two commands to remotely control Relayer execution:

```shell
avalanche teleporter relayer stop --cluster <devnetName>
✓ Remote AWM Relayer on i-0f1815c016b555fcc successfully stopped
```

```shell
avalanche teleporter relayer start --cluster <devnetName>
✓ Remote AWM Relayer on i-0f1815c016b555fcc successfully started
```
