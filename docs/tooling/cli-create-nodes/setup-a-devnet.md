---
tags: [Tooling, Avalanche-CLI]
description: This page demonstrates how to setup a Devnet of cloud-based validators using the Avalanche-CLI.
pagination_label: Setup a Devnet of Cloud-Based validators using Avalanche-CLI
sidebar_label: Setup a Devnet
sidebar_position: 2
---

# Setup a Devnet Using Avalanche-CLI

This page demonstrates how to set up a Devnet of cloud-based validators using Avalanche-CLI.

Devnets (Developer Networks) are isolated avalanche networks deployed on the cloud. Similar to local networks
in terms of configuration and usage but installed on remote nodes.

Think of Devnets as being an intermediate step in the developer testing process after local network and before Fuji network.

:::warning

ALPHA WARNING: This command is currently in experimental mode. Proceed at your own risk.

:::

## Prerequisites

Before we begin, you will need to have:

- Created an AWS account and have an updated AWS `credentials` file in home directory with [default] profile
- [Created a Subnet configuration `<SubnetName>`](/build/subnet/deploy/fuji-testnet-subnet.md#create-an-evm-subnet).

Note: the tutorial uses AWS hosts, but Devnets can also be created and operated in other supported
cloud providers, such as GCP.

## Choose a Deployment Method

Setting up a Devnet consists of:
- Creating a cluster of cloud servers
- Creating a Subnet (if it is not already created)
- Deploying the Subnet into the cluster
- Adding the cloud servers as validator nodes in the Subnet

To execute all steps above in one command, run:

```shell
avalanche node devnet wiz <clusterName>
```

Command line flags can be used instead of interacting with the prompts. The complete command line
flags for `devnet wiz` command can be found [here]().

### Create a Devnet and Deploy an Existing Subnet-EVM Based Subnet into the Devnet

For example, let's say we want to spin up a Devnet with 5 validator nodes and 1 API node in
5 regions each (us-west-2,us-east-1,ap-south-1,ap-northeast-1,eu-west-1) in AWS with the nodes
having specs of c7g.8xlarge AWS EC2 instance type and io2 volume type, with an existing Subnet
<subnetName> deployed into the Devnet, we will run :

```shell
avalanche node devnet wiz <clusterName> <subnetName> --authorize-access
  --aws --num-apis 1,1,1,1,1 --num-validators 5,5,5,5,5 
  --region us-west-2,us-east-1,ap-south-1,ap-northeast-1,eu-west-1 --default-validator-params 
  --node-type c7g.8xlarge --aws-volume-type=io2

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

The tutorial will create exactly the same Custom VM as [here](/tooling/cli-create-nodes/upload-a-custom-vm-to-cloud).

Based on the Custom VM tutorial, we will be deploying the [TokenVM](https://github.com/ava-labs/hypersdk/tree/main/examples/tokenvm)
example built with the HyperSDK.

The following settings will be used:

- `<repoUrl>` `https://github.com/ava-labs/hypersdk/`
- `<branch>` `main`
- `<buildScript>` `examples/tokenvm/scripts/build.sh`

Following the Custom VM tutorial, create the needed input files, and set their paths to:

- `<genesisPath>` [Genesis File](/tooling/cli-create-nodes/upload-a-custom-vm-to-cloud#genesis-file)
- `<chainConfigPath>` [Blockchain Config](/tooling/cli-create-nodes/upload-a-custom-vm-to-cloud#blockchain-config)
- `<subnetConfigPath>` [Subnet Config](/tooling/cli-create-nodes/upload-a-custom-vm-to-cloud#subnet-config)
- `<avagoConfigPath>` [AvalancheGo Config](/tooling/cli-create-nodes/upload-a-custom-vm-to-cloud#avalanchego-flags)

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

You can check the Devnet setup with the `node status` command:

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
