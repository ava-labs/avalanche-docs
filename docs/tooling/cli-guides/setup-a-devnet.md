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
- [Created a Subnet configuration `<SubnetName>`](/build/subnet/deploy/fuji-testnet-subnet.md#create-an-evm-subnet) based on SubnetEVM.

Note: the tutorial is based in AWS, but Devnets can also be created and operated in other supported
cloud providers, such as GCP.

## Choose a Deployment Method

You can either use a sequence of prompt-based commands to get CLI to ask you all the required information for the setup, or
execute one command than encompasses all steps, with appropriate command line flags for all the needed info.

For the second case we provide two important use cases examples:

- creating a devnet an deploy a preexistent CLI Subnet (same example as the step by step)
- creating a devnet, create a Subnet based on a Custom VM, and deploy it (similar to [
this one](/tooling/cli-guides/upload-a-custom-vm-to-cloud))

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

While you can follow [the instructions here](/tooling/cli-guides/validate-subnets#be-a-subnet-validator), for this
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
  --aws --num-nodes 5 --region us-east-1 --default-validator-params

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

```bash
avalanche node devnet wiz <clusterName> <subnetName> --custom-subnet \
  --subnet-genesis <genesisPath> --custom-vm-repo-url <repoUrl> \
  --custom-vm-branch <branch> --custom-vm-build-script <buildScript> \
  --chain-config <chainConfigPath> --subnet-config <subnetConfigPath> \
  --node-config <avagoConfigPath> --authorize-access --aws --num-nodes 5 \
  --region us-east-1 --default-validator-params

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
