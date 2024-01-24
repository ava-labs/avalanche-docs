---
tags: [Tooling, Avalanche-CLI]
description: This page demonstrates how to setup a Devnet of cloud-based validators using the Avalanche-CLI.
pagination_label: Setup a Devnet of Cloud-Based validators using Avalanche-CLI
sidebar_label: Setup a Devnet
sidebar_position: 8
---

# Setup a Devnet Using Avalanche-CLI

This page demonstrates how to setup a Devnet of cloud-based validators using Avalanche-CLI, 
and deploy a VM into it.

Devnets (Developer Networks) are isolated avalanche networks deployed on the cloud. Similar to local networks
in terms of configuration and usage but installed on remote nodes.

Think of DevNets as being an intermediate step in the developer testing process after local network and before Fuji network.

:::warning

ALPHA WARNING: This command is currently in experimental mode. Proceed at your own risk.

:::

## Prerequisites

Before we begin, you will need to have:

- Created an AWS account and have an updated AWS `credentials` file in home directory with [default] profile
- Install [Terraform](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)
- [Created a Subnet configuration `<SubnetName>`](/build/subnet/deploy/fuji-testnet-subnet.md#create-an-evm-subnet) based on SubnetEVM.

Note: the tutorial is based in AWS, but Devnets can also be created and operated in other supported
cloud providers, such as GCP.

## Choose a Deployment Method

You can either use a sequence of prompt-based commands to get CLI to ask you all the required information for the setup, or
execute one command than encompasses all steps, with appropriate command line flags for all the needed info.

For the second case we provide three important use cases examples:

- creating a devnet an deploy a preexistent CLI Subnet (same example as the step by step)
- creating a devnet, create a Subnet based on a Custom VM, and deploy it (similar to [
this one](/tooling/cli-guides/upload-a-custom-vm-to-cloud))
- creating a devnet with Warp-enabled Subnets

## Step by Step

### Creating the Devnet

Start the Devnet creation command. It will ask for all needed params:

```shell
avalanche node create <clusterName>
```

Choose Devnet for the network:

```text
? Choose a network for the operation:
    Fuji
  ▸ Devnet
```

Then you will be asked on the cloud provider to use. Use AWS:

```text
? Which cloud service would you like to launch your Avalanche Node(s) in?:
  ▸ Amazon Web Services
    Google Cloud Platform
```

Then, specify a network of 5 nodes (it can be from 2 onwards):

```text
✗ How many nodes do you want to set up?: 5
```

Then select the AWS region `us-east-1`:

```text
 Which AWS region do you want to set up your node in?:
  ▸ us-east-1
    us-east-2
    us-west-1
    us-west-2
    Choose custom region (list of regions available at https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html)
```

Give authorization to access AWS resources on behalf of the user:

```text
? I authorize Avalanche-CLI to access my AWS account:
  ▸ Yes
    No
```

Now, the nodes will be created. 

After that, you will be asked which AvalancheGo version you want to install in the nodes. Select
the one associated to `<subnetName>`.

```text
...
New EC2 instance(s) successfully created in AWS!
? What version of Avalanche Go would you like to install in the node?:
    Use latest Avalanche Go Version
  ▸ Use the deployed Subnet's VM version that the node will be validating
    Custom
✗ Which Subnet would you like to use to choose the avalanche go version?: <subnetName>

...

AvalancheGo and Avalanche-CLI installed and node(s) are bootstrapping!
```

You can check the Devnet setup with the `node status` command:

```shell
avalanche node status <clusterName>
Checking if node(s) are bootstrapped to Primary Network ...
Checking if node(s) are healthy ...
Getting avalanchego version of node(s)
All nodes in cluster <clusterName> are bootstrapped to Primary Network!

STATUS FOR CLUSTER: <clusterName>
=================================

+---------------------+------------------------------------------+----------------+---------+---------------+-----------------+---------+
|      CLOUD ID       |                 NODE ID                  |       IP       | NETWORK | AVAGO VERSION | PRIMARY NETWORK | HEALTHY |
+---------------------+------------------------------------------+----------------+---------+---------------+-----------------+---------+
| i-06f320b47e02a728b | NodeID-Gyae6B7D4UdYuZ2h7WcKomFp7NRAApPq5 | 3.212.170.192  | Devnet  | v1.10.16      | BOOTSTRAPPED    | OK      |
+---------------------+------------------------------------------+----------------+---------+---------------+-----------------+---------+
| i-0e66a50effc15f5bd | NodeID-4cNMiepvj71dAqPoKGQh8pEksYacpDF5U | 52.44.30.153   | Devnet  | v1.10.16      | BOOTSTRAPPED    | OK      |
+---------------------+------------------------------------------+----------------+---------+---------------+-----------------+---------+
| i-0329d919d1b0adc52 | NodeID-NSRM8DscQb81oaFDYhhVfZZGt2GWMPyWk | 34.205.184.11  | Devnet  | v1.10.16      | BOOTSTRAPPED    | OK      |
+---------------------+------------------------------------------+----------------+---------+---------------+-----------------+---------+
| i-0533fb4ed4f521f5a | NodeID-ASuFNx1Hg4nQR3HDAmnSa9G8CWqmcjBbQ | 34.207.4.124   | Devnet  | v1.10.16      | BOOTSTRAPPED    | OK      |
+---------------------+------------------------------------------+----------------+---------+---------------+-----------------+---------+
| i-0ed9f7d7e049fe42b | NodeID-Phcq9zSLxfCzxsgNqzQwMYe1wxr9rFCuf | 100.25.120.218 | Devnet  | v1.10.16      | BOOTSTRAPPED    | OK      |
+---------------------+------------------------------------------+----------------+---------+---------------+-----------------+---------+
```

### Deploying the Subnet into the Devnet

At this point, you have a working Devnet, but no Subnet association:

```shell
avalanche node status <clusterName> --subnet <subnetName>
Checking if node(s) are bootstrapped to Primary Network ...
Checking if node(s) are healthy ...
Getting avalanchego version of node(s)
Error: failed to find the blockchain ID for this subnet, has it been deployed/created on this network?
exit status 1
```

So, next step is to deploy `<subnetName>` into `<clusterName>`. So as to create the Subnet and blockchain transactions
needed for posterior syncing and validation of the Subnet.

While the `subnet deploy` command can be used [as described here](/build/subnet/deploy/fuji-testnet-subnet.md#deploy-the-subnet),
deploying into Devnets is a subset of that operation, and so a quickest command is provided.

It automatically takes into account the API endpoint of the Devnet, and use a common funding option for Devnets, known as EWOQ keys.

```shell
avalanche node devnet deploy <clusterName> <subnetName>
Checking if node(s) are healthy ...
Checking compatibility of node(s) avalanche go version with Subnet EVM RPC of subnet <subnetName> ...
Deploying [<subnetName>] to Devnet
Loading EWOQ key
Your Subnet's control keys: [P-custom18jma8ppw3nhx5r4ap8clazz0dps7rv5u9xde7p]
Your subnet auth keys for chain creation: [P-custom18jma8ppw3nhx5r4ap8clazz0dps7rv5u9xde7p]
Subnet has been created with ID: giY8tswWgZmcAWzPkoNrmjjrykited7GJ9799SsFzTiq5a1ML
Now creating blockchain...
+--------------------+----------------------------------------------------+
| DEPLOYMENT RESULTS |                                                    |
+--------------------+----------------------------------------------------+
| Chain Name         | subnetName                                         |
+--------------------+----------------------------------------------------+
| Subnet ID          | giY8tswWgZmcAWzPkoNrmjjrykited7GJ9799SsFzTiq5a1ML  |
+--------------------+----------------------------------------------------+
| VM ID              | srEXiWaHjBgJPLWjtprZFhiFnFJkY2URD4ug4SJdAnLbkBBGm  |
+--------------------+----------------------------------------------------+
| Blockchain ID      | 2Hm4V6jYrRTv2efTSHwky51yLd6KvFBUUuSRkwm1TomEXsSzKj |
+--------------------+                                                    +
| P-Chain TXID       |                                                    |
+--------------------+----------------------------------------------------+
Subnet successfully deployed into devnet!
```

You can now check the updated status:

```shell
avalanche node status <clusterName> --subnet <subnetName>
Checking if node(s) are bootstrapped to Primary Network ...
Checking if node(s) are healthy ...
Getting avalanchego version of node(s)
Getting subnet sync status of node(s)

STATUS FOR CLUSTER: <clusterName>
=================================

+---------------------+------------------------------------------+----------------+---------+---------------+-----------------+---------+------------------+
|      CLOUD ID       |                 NODE ID                  |       IP       | NETWORK | AVAGO VERSION | PRIMARY NETWORK | HEALTHY |  SUBNET SUBNET1  |
+---------------------+------------------------------------------+----------------+---------+---------------+-----------------+---------+------------------+
| i-02825a7abd3933969 | NodeID-5ocvR3Fw2dKyrUF45nwbSXnd7cb3nyq9a | 44.206.157.218 | Devnet  | v1.10.16      | BOOTSTRAPPED    | OK      | NOT_BOOTSTRAPPED |
+---------------------+------------------------------------------+----------------+---------+---------------+-----------------+---------+------------------+
| i-0a008d94ba7c61f40 | NodeID-Betdv9jBp2QNtf1KgL1cy2pXAuxudMHQA | 34.205.243.57  | Devnet  | v1.10.16      | BOOTSTRAPPED    | OK      | NOT_BOOTSTRAPPED |
+---------------------+------------------------------------------+----------------+---------+---------------+-----------------+---------+------------------+
| i-0bf856134cd60f5f8 | NodeID-LymKbUAvLTcT7BPrfAJcm1fjJViWrjdAM | 3.216.85.230   | Devnet  | v1.10.16      | BOOTSTRAPPED    | OK      | NOT_BOOTSTRAPPED |
+---------------------+------------------------------------------+----------------+---------+---------------+-----------------+---------+------------------+
| i-05fc163dc2eefafef | NodeID-4TyRp3MxHQXzfrB27V91txppvegeaapyd | 44.217.75.32   | Devnet  | v1.10.16      | BOOTSTRAPPED    | OK      | NOT_BOOTSTRAPPED |
+---------------------+------------------------------------------+----------------+---------+---------------+-----------------+---------+------------------+
| i-03697de53219c71b0 | NodeID-EZ3Xt1tm3WyUzMSKmVzg4ahcdnQ1dZGBT | 3.227.214.222  | Devnet  | v1.10.16      | BOOTSTRAPPED    | OK      | NOT_BOOTSTRAPPED |
+---------------------+------------------------------------------+----------------+---------+---------------+-----------------+---------+------------------+
```

### Syncing the Subnet

Next step is for the Devnet nodes to start keeping up to date with the Subnet state, while executing the Subnet Virtual Machine.

```shell
avalanche node sync <clusterName> <subnetName>
Checking if node(s) are bootstrapped to Primary Network ...
Checking if node(s) are healthy ...
Checking compatibility of node(s) avalanche go version with Subnet EVM RPC of subnet <subnetName> ...
[aws_node_i-0bf856134cd60f5f8] Track Subnet
[aws_node_i-03697de53219c71b0] Track Subnet
[aws_node_i-0a008d94ba7c61f40] Track Subnet
[aws_node_i-05fc163dc2eefafef] Track Subnet
[aws_node_i-02825a7abd3933969] Track Subnet
Node(s) successfully started syncing with Subnet!
Check node subnet syncing status with avalanche node status <clusterName> --subnet <subnetName>

```

Let's check the updated status:

```shell
avalanche node status <clusterName> --subnet <subnetName>
Checking if node(s) are bootstrapped to Primary Network ...
Checking if node(s) are healthy ...
Getting avalanchego version of node(s)
Getting subnet sync status of node(s)
All nodes in cluster <clusterName> are synced to Subnet <subnetaName>

STATUS FOR CLUSTER: <clusterName>
=================================

+---------------------+------------------------------------------+----------------+---------+---------------+-----------------+---------+----------------+
|      CLOUD ID       |                 NODE ID                  |       IP       | NETWORK | AVAGO VERSION | PRIMARY NETWORK | HEALTHY | SUBNET SUBNET1 |
+---------------------+------------------------------------------+----------------+---------+---------------+-----------------+---------+----------------+
| i-02825a7abd3933969 | NodeID-5ocvR3Fw2dKyrUF45nwbSXnd7cb3nyq9a | 44.206.157.218 | Devnet  | v1.10.16      | BOOTSTRAPPED    | OK      | SYNCED         |
+---------------------+------------------------------------------+----------------+---------+---------------+-----------------+---------+----------------+
| i-0a008d94ba7c61f40 | NodeID-Betdv9jBp2QNtf1KgL1cy2pXAuxudMHQA | 34.205.243.57  | Devnet  | v1.10.16      | BOOTSTRAPPED    | OK      | SYNCED         |
+---------------------+------------------------------------------+----------------+---------+---------------+-----------------+---------+----------------+
| i-0bf856134cd60f5f8 | NodeID-LymKbUAvLTcT7BPrfAJcm1fjJViWrjdAM | 3.216.85.230   | Devnet  | v1.10.16      | BOOTSTRAPPED    | OK      | SYNCED         |
+---------------------+------------------------------------------+----------------+---------+---------------+-----------------+---------+----------------+
| i-05fc163dc2eefafef | NodeID-4TyRp3MxHQXzfrB27V91txppvegeaapyd | 44.217.75.32   | Devnet  | v1.10.16      | BOOTSTRAPPED    | OK      | SYNCED         |
+---------------------+------------------------------------------+----------------+---------+---------------+-----------------+---------+----------------+
| i-03697de53219c71b0 | NodeID-EZ3Xt1tm3WyUzMSKmVzg4ahcdnQ1dZGBT | 3.227.214.222  | Devnet  | v1.10.16      | BOOTSTRAPPED    | OK      | SYNCED         |
+---------------------+------------------------------------------+----------------+---------+---------------+-----------------+---------+----------------+
```

### Validating the Subnet

Latest step is to add the nodes as Subnet validators, so as the Devnet can change the Subnet state under user request.

While you can follow [the instructions here](/tooling/cli-guides/validate-#be-a-subnet-validator), for this
tutorial we opt for providing the flag `--default-validator-params`, that set for the user most common validator params:

```shell
avalanche node validate subnet <clusterName> <subnetName> --default-validator-params
Loading EWOQ key
Checking if node(s) are bootstrapped to Primary Network ...
Checking if node(s) are healthy ...
Avalanche node id for host aws_node_i-02825a7abd3933969 is NodeID-5ocvR3Fw2dKyrUF45nwbSXnd7cb3nyq9a
Avalanche node id for host aws_node_i-0a008d94ba7c61f40 is NodeID-Betdv9jBp2QNtf1KgL1cy2pXAuxudMHQA
Avalanche node id for host aws_node_i-0bf856134cd60f5f8 is NodeID-LymKbUAvLTcT7BPrfAJcm1fjJViWrjdAM
Avalanche node id for host aws_node_i-05fc163dc2eefafef is NodeID-4TyRp3MxHQXzfrB27V91txppvegeaapyd
Avalanche node id for host aws_node_i-03697de53219c71b0 is NodeID-EZ3Xt1tm3WyUzMSKmVzg4ahcdnQ1dZGBT
...
All nodes in cluster <clusterName> are successfully added as Subnet validators!
```

And the final status is:

```shell
avalanche node status <clusterName> --subnet <subnetName>
Checking if node(s) are bootstrapped to Primary Network ...
Checking if node(s) are healthy ...
Getting avalanchego version of node(s)
Getting subnet sync status of node(s)
All nodes in cluster <clusterName> are synced to Subnet <subnetaName>

STATUS FOR CLUSTER: <clusterName>
=================================

+---------------------+------------------------------------------+----------------+---------+---------------+-----------------+---------+----------------+
|      CLOUD ID       |                 NODE ID                  |       IP       | NETWORK | AVAGO VERSION | PRIMARY NETWORK | HEALTHY | SUBNET SUBNET1 |
+---------------------+------------------------------------------+----------------+---------+---------------+-----------------+---------+----------------+
| i-02825a7abd3933969 | NodeID-5ocvR3Fw2dKyrUF45nwbSXnd7cb3nyq9a | 44.206.157.218 | Devnet  | v1.10.16      | BOOTSTRAPPED    | OK      | VALIDATING     |
+---------------------+------------------------------------------+----------------+---------+---------------+-----------------+---------+----------------+
| i-0a008d94ba7c61f40 | NodeID-Betdv9jBp2QNtf1KgL1cy2pXAuxudMHQA | 34.205.243.57  | Devnet  | v1.10.16      | BOOTSTRAPPED    | OK      | VALIDATING     |
+---------------------+------------------------------------------+----------------+---------+---------------+-----------------+---------+----------------+
| i-0bf856134cd60f5f8 | NodeID-LymKbUAvLTcT7BPrfAJcm1fjJViWrjdAM | 3.216.85.230   | Devnet  | v1.10.16      | BOOTSTRAPPED    | OK      | VALIDATING     |
+---------------------+------------------------------------------+----------------+---------+---------------+-----------------+---------+----------------+
| i-05fc163dc2eefafef | NodeID-4TyRp3MxHQXzfrB27V91txppvegeaapyd | 44.217.75.32   | Devnet  | v1.10.16      | BOOTSTRAPPED    | OK      | VALIDATING     |
+---------------------+------------------------------------------+----------------+---------+---------------+-----------------+---------+----------------+
| i-03697de53219c71b0 | NodeID-EZ3Xt1tm3WyUzMSKmVzg4ahcdnQ1dZGBT | 3.227.214.222  | Devnet  | v1.10.16      | BOOTSTRAPPED    | OK      | VALIDATING     |
+---------------------+------------------------------------------+----------------+---------+---------------+-----------------+---------+----------------+
```

## Single Command

### Create a Devnet and Deploy a Subnet into It

CLI provides the `devnet wiz` command that takes care of all the mentioned steps.

As other CLI commands, all the options can be specified by command line flag instead of having the user
interactively provide the inputs.

As reference we provide example of the flags setting needed for this tutorial:

```shell
avalanche node devnet wiz <clusterName> <subnetName> --authorize-access\
  --aws --num-nodes 5 --region us-east-1 --default-validator-params --node-type default

Creating the devnet
...
Waiting for node(s) in cluster <clusterName> to be healthy...
...
Nodes healthy after 33 seconds

Deploying the subnet
...
Setting the nodes as subnet trackers
...
Waiting for node(s) in cluster <clusterName>to be healthy...
Nodes healthy after 33 seconds
...
Waiting for node(s) in cluster <clusterName> to be syncing subnet <subnetName>...
Nodes Syncing <subnetName> after 5 seconds

Adding nodes as subnet validators
...
Waiting for node(s) in cluster <clusterName> to be validating subnet <subnetName>...
Nodes Validating <subnetName> after 23 seconds

Devnet <clusterName> has been created and is validating subnet <subnetName>!
```

### Create a Devnet, Create a Custom VM based Subnet, and Deploy It

#### Prerequisites

You will need to have:

- Created a Custom VM, as described [here](/build/vm/intro.md).

#### Custom VM

The tutorial will create exactly the same Custom VM as [here](/tooling/cli-guides/upload-a-custom-vm-to-cloud).

Based on the Custom VM tutorial, we will be deploying the [TokenVM](https://github.com/ava-labs/hypersdk/tree/main/examples/tokenvm)
example built with the HyperSDK.

The following settings will be used:

- `<repoUrl>` `https://github.com/ava-labs/hypersdk/`
- `<branch>` `main`
- `<buildScript>` `examples/tokenvm/scripts/build.sh`

Following the Custom VM tutorial, create the needed input files, and set their paths to:

- `<genesisPath>` [Genesis File](/tooling/cli-guides/upload-a-custom-vm-to-cloud#genesis-file)
- `<chainConfigPath>` [Blockchain Config](/tooling/cli-guides/upload-a-custom-vm-to-cloud#blockchain-config)
- `<subnetConfigPath>` [Subnet Config](/tooling/cli-guides/upload-a-custom-vm-to-cloud#subnet-config)
- `<avagoConfigPath>` [AvalancheGo Config](/tooling/cli-guides/upload-a-custom-vm-to-cloud#avalanchego-flags)

#### Execute Wiz

Now we are ready to execute the Devnet Wizard. It it going to:

- create the Subnet configuration, generating also the local VM binary
- create the Devnet
- deploy the Subnet into the Devnet
- make the Devnet nodes to start tracking the Subnet
- make the Devnet nodes to start validating the Subnet

The command assumes `<clusterName>` and `<subnetName>` have not been previously created.

The full command line is:

```text
avalanche node devnet wiz <clusterName> <subnetName> --custom-subnet \
  --subnet-genesis <genesisPath> --custom-vm-repo-url <repoUrl> \
  --custom-vm-branch <branch> --custom-vm-build-script <buildScript> \
  --chain-config <chainConfigPath> --subnet-config <subnetConfigPath> \
  --node-config <avagoConfigPath> --authorize-access --aws --num-nodes 5 \
  --region us-east-1 --default-validator-params --node-type default

Creating the subnet
...
Creating the devnet
...
Waiting for node(s) in cluster <clusterName> to be healthy...
...
Nodes healthy after 33 seconds

Deploying the subnet
...
Setting the nodes as subnet trackers
...
Waiting for node(s) in cluster <clusterName>to be healthy...
Nodes healthy after 33 seconds
...
Waiting for node(s) in cluster <clusterName> to be syncing subnet <subnetName>...
Nodes Syncing <subnetName> after 5 seconds

Adding nodes as subnet validators
...
Waiting for node(s) in cluster <clusterName> to be validating subnet <subnetName>...
Nodes Validating <subnetName> after 23 seconds

Devnet <clusterName> has been created and is validating subnet <subnetName>!
```

### Create a Devnet with Warp-Enabled Subnets

It will contain a Warp-enabled C-Chain (always enabled by default on devnets), and two Warp-enabled Subnet-EVM Subnets.

#### Subnet-EVM Setup

[Avalanche Warp Messaging](https://docs.avax.network/learn/avalanche/awm) is a cross-chain messaging protocol that allows Avalanche  to natively send messages to other . We will create two Subnet-EVM genesis files, both with Warp enabled, but with different chain IDs (68430, 68431):

- create `<genesisPathA>`, with contents:

```text
{
  "config": {
    "chainId": 68430,
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip150Hash": "0x2086799aeebeae135c246c65021c82b4e15a2c451340993aacfd2751886514f0",
    "eip155Block": 0,
    "eip158Block": 0,
    "byzantiumBlock": 0,
    "constantinopleBlock": 0,
    "petersburgBlock": 0,
    "istanbulBlock": 0,
    "muirGlacierBlock": 0,
    "subnetEVMTimestamp": 0,
    "dUpgradeTimestamp": 0,
    "feeConfig": {
      "gasLimit": 20000000,
      "minBaseFee": 1000000000,
      "targetGas": 100000000,
      "baseFeeChangeDenominator": 48,
      "minBlockGasCost": 0,
      "maxBlockGasCost": 10000000,
      "targetBlockRate": 2,
      "blockGasCostStep": 500000
    },
    "warpConfig": {
      "blockTimestamp": 0
    }
  },
  "alloc": {
    "8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC": {
      "balance": "0x52B7D2DCC80CD2E4000000"
    }
  },
  "nonce": "0x0",
  "timestamp": "0x0",
  "extraData": "0x00",
  "gasLimit": "0x1312D00",
  "difficulty": "0x0",
  "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "coinbase": "0x0000000000000000000000000000000000000000",
  "number": "0x0",
  "gasUsed": "0x0",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
}
```

- create `<genesisPathB>`, with contents:

```text
{
  "config": {
    "chainId": 68431,
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip150Hash": "0x2086799aeebeae135c246c65021c82b4e15a2c451340993aacfd2751886514f0",
    "eip155Block": 0,
    "eip158Block": 0,
    "byzantiumBlock": 0,
    "constantinopleBlock": 0,
    "petersburgBlock": 0,
    "istanbulBlock": 0,
    "muirGlacierBlock": 0,
    "subnetEVMTimestamp": 0,
    "dUpgradeTimestamp": 0,
    "feeConfig": {
      "gasLimit": 20000000,
      "minBaseFee": 1000000000,
      "targetGas": 100000000,
      "baseFeeChangeDenominator": 48,
      "minBlockGasCost": 0,
      "maxBlockGasCost": 10000000,
      "targetBlockRate": 2,
      "blockGasCostStep": 500000
    },
    "warpConfig": {
      "blockTimestamp": 0
    }
  },
  "alloc": {
    "8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC": {
      "balance": "0x52B7D2DCC80CD2E4000000"
    }
  },
  "nonce": "0x0",
  "timestamp": "0x0",
  "extraData": "0x00",
  "gasLimit": "0x1312D00",
  "difficulty": "0x0",
  "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "coinbase": "0x0000000000000000000000000000000000000000",
  "number": "0x0",
  "gasUsed": "0x0",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
}
```

#### Wiz Execution

First create the devnet using the Devnet Wizard.

The command assumes that `<clusterName>` has not been previously created.

```text
avalanche node devnet wiz <clusterName> --authorize-access --aws --num-nodes 5\
  --region us-east-1 --latest-avalanchego --node-type default

Creating the devnet
...
Waiting for node(s) in cluster <clusterName> to be healthy...
...
Nodes healthy after 33 seconds

Devnet <clusterName> has been created!
```

Then, create the Subnets using two wiz commands. They will each:

- create a Subnet configuration
- deploy the Subnet into the Devnet
- make the Devnet nodes to start tracking the Subnet
- make the Devnet nodes to start validating the Subnet

The commands assume that `<subnetNameA>` and `<subnetNameB>` have not been previously created.

Create `<subnetNameA>`:

```text
avalanche node devnet wiz <clusterName> <subnetNameA> --force-subnet-create\
  --subnet-genesis <genesisPathA> ---evm-subnet --latest-evm-version\
  --default-validator-params

Creating the subnet
...
Adding subnet into existing devnet <clusterName>
...
Waiting for node(s) in cluster <clusterName> to be healthy...
...
Nodes healthy after 33 seconds

Deploying the subnet
...
Setting the nodes as subnet trackers
...
Waiting for node(s) in cluster <clusterName>to be healthy...
Nodes healthy after 33 seconds
...
Waiting for node(s) in cluster <clusterName> to be syncing subnet <subnetNameA>...
Nodes Syncing <subnetNameA> after 5 seconds

Adding nodes as subnet validators
...
Waiting for node(s) in cluster <clusterName> to be validating subnet <subnetNameA>...
Nodes Validating <subnetNameA> after 23 seconds

Devnet <clusterName> has been created and is validating subnet <subnetNameA>!
```

Create `<subnetNameB>`:

```text
avalanche node devnet wiz <clusterName> <subnetNameB> --force-subnet-create\
  --subnet-genesis <genesisPathB> ---evm-subnet --latest-evm-version\
  --default-validator-params

Creating the subnet
...
Adding subnet into existing devnet <clusterName>
...
Waiting for node(s) in cluster <clusterName> to be healthy...
...
Nodes healthy after 33 seconds

Deploying the subnet
...
Setting the nodes as subnet trackers
...
Waiting for node(s) in cluster <clusterName>to be healthy...
Nodes healthy after 33 seconds
...
Waiting for node(s) in cluster <clusterName> to be syncing subnet <subnetNameB>...
Nodes Syncing <subnetNameB> after 5 seconds

Adding nodes as subnet validators
...
Waiting for node(s) in cluster <clusterName> to be validating subnet <subnetNameB>...
Nodes Validating <subnetNameB> after 23 seconds

Devnet <clusterName> has been created and is validating subnet <subnetNameB>!
```

#### Obtaining Warp Devnet Parameters

Certain parameters are usually needed for Warp interaction, we will show how to use CLI to obtain them.

##### Blockchain Endpoints

First, use `avalanche node status` to get the IP of the first node:

```text
avalanche node status <clusterName>
Checking if node(s) are bootstrapped to Primary Network ...
Checking if node(s) are healthy ...
Getting avalanchego version of node(s)
All nodes in cluster <clusterName> are bootstrapped to Primary Network!

STATUS FOR CLUSTER: <clusterName>
=================================

+---------------------+------------------------------------------+----------------+---------+---------------+-----------------+---------+
|      CLOUD ID       |                 NODE ID                  |       IP       | NETWORK | AVAGO VERSION | PRIMARY NETWORK | HEALTHY |
+---------------------+------------------------------------------+----------------+---------+---------------+-----------------+---------+
| i-0b0f27332a94082f5 | NodeID-6iTKYimySPqhG5ew46BtarNjxSWTng7Hr | 52.204.202.216 | Devnet  | v1.10.17      | BOOTSTRAPPED    | OK      |
+---------------------+------------------------------------------+----------------+---------+---------------+-----------------+---------+
| i-0eed997028e753be7 | NodeID-JdgaYJotZx33WMDZxNmQuPQ3Ac9gc3i9y | 54.205.99.200  | Devnet  | v1.10.17      | BOOTSTRAPPED    | OK      |
+---------------------+------------------------------------------+----------------+---------+---------------+-----------------+---------+
| i-0f188fe6a5d0a7452 | NodeID-GdnycZZgXX1rPrE6Bvfigmmemhw5XQLRo | 3.208.253.232  | Devnet  | v1.10.17      | BOOTSTRAPPED    | OK      |
+---------------------+------------------------------------------+----------------+---------+---------------+-----------------+---------+
| i-0a9f2e841b96ef16d | NodeID-2Xaz3RVVHJBUQbKR8fsPteqPkM5GGzZsW | 34.196.122.72  | Devnet  | v1.10.17      | BOOTSTRAPPED    | OK      |
+---------------------+------------------------------------------+----------------+---------+---------------+-----------------+---------+
| i-0c41fc9bfb5e31205 | NodeID-CtgpzVfxLrTDcKjvhUFSe8V4etFeNYpRT | 3.233.202.158  | Devnet  | v1.10.17      | BOOTSTRAPPED    | OK      |
+---------------------+------------------------------------------+----------------+---------+---------------+-----------------+---------+
```

From this, we will take note of the IP of the first node of the list, `52.204.202.216`.

Next, get blockchain id for `<subnetNameA>`

```text
avalanche subnet describe <subnetNameA>

 _____       _        _ _
|  __ \     | |      (_) |
| |  | | ___| |_ __ _ _| |___
| |  | |/ _ \ __/ _  | | / __|
| |__| |  __/ || (_| | | \__ \
|_____/ \___|\__\__,_|_|_|___/
+---------------------+---------------------------------------------------+
|      PARAMETER      |                       VALUE                       |
+---------------------+---------------------------------------------------+
| Subnet Name         | <subnetNameA>                                     |
+---------------------+---------------------------------------------------+
| ChainID             | 68430                                             |
+---------------------+---------------------------------------------------+
| Mainnet ChainID     | 0                                                 |
+---------------------+---------------------------------------------------+
| Token Name          | TEST                                              |
+---------------------+---------------------------------------------------+
| VM Version          | v0.5.10                                           |
+---------------------+---------------------------------------------------+
| VM ID               | srEXiWaHtoWw6GFGeF3WAxWwAueYWwoD5o2HUjQY9ASJRW32P |
+---------------------+---------------------------------------------------+
| Devnet SubnetID     | giY8tswWgZmcAWzPkoNrmjjrykited7GJ9799SsFzTiq5a1ML |
+---------------------+---------------------------------------------------+
| Devnet BlockchainID | JjDfmxM3hAEX3VuaKH4PpQskhrvp2pzGTgYLpDwinMzFeHJYA |
+---------------------+---------------------------------------------------+

...
```

Take note of the `Devnet BlockchainID` value, `JjDfmxM3hAEX3VuaKH4PpQskhrvp2pzGTgYLpDwinMzFeHJYA`.

Same for `<subnetNameB>`

```text
avalanche subnet describe <subnetNameB>

 _____       _        _ _
|  __ \     | |      (_) |
| |  | | ___| |_ __ _ _| |___
| |  | |/ _ \ __/ _  | | / __|
| |__| |  __/ || (_| | | \__ \
|_____/ \___|\__\__,_|_|_|___/
+---------------------+----------------------------------------------------+
|      PARAMETER      |                       VALUE                        |
+---------------------+----------------------------------------------------+
| Subnet Name         | <subnetNameB>                                      |
+---------------------+----------------------------------------------------+
| ChainID             | 68431                                              |
+---------------------+----------------------------------------------------+
| Mainnet ChainID     | 0                                                  |
+---------------------+----------------------------------------------------+
| Token Name          | TEST                                               |
+---------------------+----------------------------------------------------+
| VM Version          | v0.5.10                                            |
+---------------------+----------------------------------------------------+
| VM ID               | srEXiWaHu18zGnNCT4fyu9haF1HCw6A9CtjWJN1hhkjEUN3zs  |
+---------------------+----------------------------------------------------+
| Devnet SubnetID     | 21VBCbPvq8eUugLHTwMdmW6vqZmHPa9TiPksu6jUTchSbQDk2t |
+---------------------+----------------------------------------------------+
| Devnet BlockchainID | RW37R3svsZUsy2bVLFVjt1BfEH2S6n7E3HwY8KdjGq4JQvz5x  |
+---------------------+----------------------------------------------------+
```

To get `21VBCbPvq8eUugLHTwMdmW6vqZmHPa9TiPksu6jUTchSbQDk2t`.

The general scheme for obtaining the endpoint is:

```text
http://DEVNET_ENDPOINT:9650/ext/bc/SUBNET_BLOCKCHAIN_ID/rpc
```

From this, we can derive that the blockchain endpoints for both Subnets are:

- subnetNameA: `http://52.204.202.216:9650/ext/bc/JjDfmxM3hAEX3VuaKH4PpQskhrvp2pzGTgYLpDwinMzFeHJYA/rpc`
- subnetNameB: `http://52.204.202.216:9650/ext/bc/21VBCbPvq8eUugLHTwMdmW6vqZmHPa9TiPksu6jUTchSbQDk2t/rpc`

We can for example use the endpoint of `<subnetNameA>` to get balance information:

```bash
curl http://52.204.202.216:9650/ext/bc/JjDfmxM3hAEX3VuaKH4PpQskhrvp2pzGTgYLpDwinMzFeHJYA/rpc \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_getBalance","params":["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC", "latest"],"id":1,"jsonrpc":"2.0"}'

{"jsonrpc":"2.0","id":1,"result":"0x52b7b50bf43753a7c54800"}
```

C-Chain endpoint follows the same scheme but with the blockchain alias of `C`: `http://52.204.202.216:9650/ext/bc/C/rpc`

<!-- vale off -->

#### Deploy Teleporter

<!-- vale on -->

<!-- vale off -->

[Teleporter](https://github.com/ava-labs/teleporter) is a cross-chain messaging protocol built on top of Warp. Teleporter provides a user-friendly interface to Warp that provides additional features such as replay protection, message delivery incentives, and message execution, to name a few.

Now that the Warp-enabled devnet is up and running, Teleporter can be deployed to the C-Chain and subnet-evm Subnets. Teleporter is deployed using [Nick's method](https://yamenmerhi.medium.com/nicks-method-ethereum-keyless-execution-168a6659479c) to ensure that the Teleporter contract is deployed to the same address on all chains. For instructions on how to deploy Teleporter, please see the guide [here.](https://github.com/ava-labs/teleporter/blob/main/utils/contract-deployment/README.md) Follow those instructions to deploy Teleporter to Subnet A, Subnet B, and the C-Chain.

<!-- vale on -->

#### Run an AWM Relayer instance

<!-- vale off -->

In order to deliver Warp and Teleporter messages between chains, an off-chain relayer is required. For this tutorial, we will use [AWM Relayer.](https://github.com/ava-labs/awm-relayer) 

<!-- vale on -->

> **_NOTE:_** In this tutorial, we'll run the relayer on the same local machine from which we deployed the devnets, but these steps can be adapted to deploy the relayer in a cloud environment as well. The application itself has minimal hardware requirements, and is essentially stateless.

<!-- vale off -->

##### Configure the Relayer

<!-- vale on -->

First, we need to set the configuration using our devnet values. Below is a template relayer configuration with the values for Subnet A (which we deployed previously) filled in:

```json
{
    "network-id": 1337,
    "p-chain-api-url": "http://52.204.202.216:9650",
    "encrypt-connection": false,
    "source-subnets": [
        {
            "subnet-id": "11111111111111111111111111111111LpoYY",
            "blockchain-id": "<C_CHAIN_BLOCKCHAIN_ID>",
            "vm": "evm",
            "api-node-host": "127.0.0.1",
            "api-node-port": 9650,
            "encrypt-connection": false,
            "message-contracts": {
                "<TELEPORTER_CONTRACT_ADDRESS>": {
                    "message-format": "teleporter",
                    "settings": {
                        "reward-address": "<REWARD_ADDRESS>"
                    }
                }
            }
        },
        {
            "subnet-id": "giY8tswWgZmcAWzPkoNrmjjrykited7GJ9799SsFzTiq5a1ML",
            "blockchain-id": "JjDfmxM3hAEX3VuaKH4PpQskhrvp2pzGTgYLpDwinMzFeHJYA",
            "vm": "evm",
            "api-node-host": "127.0.0.1",
            "api-node-port": 9650,
            "encrypt-connection": false,
            "message-contracts": {
                "<TELEPORTER_CONTRACT_ADDRESS>": {
                    "message-format": "teleporter",
                    "settings": {
                        "reward-address": "<REWARD_ADDRESS>"
                    }
                }
            }
        }
    ],
    "destination-subnets": [
        {
            "subnet-id": "11111111111111111111111111111111LpoYY",
            "blockchain-id": "<C_CHAIN_BLOCKCHAIN_ID>",
            "vm": "evm",
            "api-node-host": "127.0.0.1",
            "api-node-port": 9650,
            "encrypt-connection": false,
            "account-private-key": "<ACCOUNT_PRIVATE_KEY>"
        },
        {
            "subnet-id": "giY8tswWgZmcAWzPkoNrmjjrykited7GJ9799SsFzTiq5a1ML",
            "blockchain-id": "JjDfmxM3hAEX3VuaKH4PpQskhrvp2pzGTgYLpDwinMzFeHJYA",
            "vm": "evm",
            "api-node-host": "127.0.0.1",
            "api-node-port": 9650,
            "encrypt-connection": false,
            "account-private-key": "<ACCOUNT_PRIVATE_KEY>"
        }
    ]
}
```

The following values need to be populated:

<!-- vale off -->

- `<C_CHAIN_BLOCKCHAIN_ID>`: The blockchain ID of the C-Chain. This can be retrieved using [platform.getBlockchains](https://docs.avax.network/reference/avalanchego/p-chain/api#platformgetblockchains) and looking for the blockchain with alias `C`.
- `<TELEPORTER_CONTRACT_ADDRESS>`: The address of the Teleporter contract on the source and destination chains. This is the same address that Teleporter was deployed to in [Deploy Teleporter](#deploy-teleporter).
- `<REWARD_ADDRESS>`: The address that the relayer will use to collect rewards for delivering messages. This can be any address.
- `<ACCOUNT_PRIVATE_KEY>`: The private key of the account that will be used to sign transactions on the source and destination chains. This account must have enough funds to pay for transaction fees on both chains.

<!-- vale on -->

The relayer is now configured to relay messages between the C-Chain and Subnet A. Subnet B can be added as well by extending the `source-subnets` and `destination-subnets` arrays with the appropriate values.

##### Run the Relayer

To run the relayer, we can either build the application from source, or run using a published [Docker image](https://hub.docker.com/r/avaplatform/awm-relayer/tags). For the following examples, assume we've written the relayer configuration to `~/config/config.json` on the host machine.

 To run the relayer built from source:

```bash
# Clone the repository
git clone git@github.com:ava-labs/awm-relayer.git

# Build the application
./scripts/build.sh

# Run the relayer
./build/awm-relayer --config-file ~/config/config.json
```

To run the relayer from the Docker image:

```bash
# Pull the image
docker pull avaplatform/awm-relayer:latest

# Run the relayer
docker run --env CONFIG_FILE=/config/config.json -v ~/config:/config avaplatform/awm-relayer:latest
```

<!-- vale off -->

#### Interact with Teleporter

With the Warp-enabled devnet deployed, Teleporter deployed on each of the chains, and an AWM Relayer instance running, the Teleporter development environment is ready to go!
A good place to start is to explore the [example applications built on top of Teleporter](https://github.com/ava-labs/teleporter/blob/main/contracts/src/CrossChainApplications/README.md) included in the Teleporter repository. These dApps abstract away much of Warp and Teleporter from the user, and demonstrate various cross-chain messaging use cases. 

See the [getting started guide](https://github.com/ava-labs/teleporter/blob/main/contracts/src/CrossChainApplications/GETTING_STARTED.md) for instructions on how to authoer a cross-chain dApp using Teleporter.

An [example script](https://github.com/ava-labs/teleporter/blob/main/scripts/local/examples/basic_send_receive.sh) demonstrates how to interact with Teleporter to send a message from one Subnet to another. Note that this script is intended to be used with a [local network running in Docker](https://github.com/ava-labs/teleporter/blob/main/README.md#run-a-local-testnet-in-docker), and will need to be adapted to use the correct values for the devnet Subnet IDs, but should serve as a good reference. 

<!-- vale on -->
