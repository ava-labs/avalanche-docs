---
tags: [Tooling, Avalanche-CLI]
description: This page demonstrates how to setup a Devnet of cloud-based validators using the Avalanche-CLI.
pagination_label: Setup a Devnet of Cloud-Based validators using Avalanche-CLI
sidebar_label: Setup a Devnet
sidebar_position: 2
---

# Setup a Devnet Using Avalanche-CLI

This page demonstrates how to set up a Devnet of cloud-based validators using Avalanche-CLI.

Devnets (Developer Networks) are isolated Avalanche networks deployed on the cloud. Similar to local networks
in terms of configuration and usage but installed on remote nodes.

Think of Devnets as being an intermediate step in the developer testing process after local network and before Fuji network.

:::warning

ALPHA WARNING: This command is currently in experimental mode. Proceed at your own risk.

:::

## Prerequisites

Before we begin, you will need to have:

- Created an AWS account and have an updated AWS `credentials` file in home directory with [default] profile

Note: the tutorial uses AWS hosts, but Devnets can also be created and operated in other supported
cloud providers, such as GCP.

## Setting up a Devnet

Setting up a Devnet consists of:

- Creating a cluster of cloud servers
- Deploying a Subnet into the cluster
- Adding the cloud servers as validator nodes in the Subnet

To execute all steps above in one command, run:

```shell
avalanche node devnet wiz <clusterName>
```

Command line flags can be used instead of interacting with the prompts. The complete command line
flags for `devnet wiz` command can be found [here](/tooling/avalanche-cli.md#node-devnet-wiz).

Let's go through several examples with the full command (with flags) provided.

### Create a Devnet and Deploy Subnet-EVM Based Subnet into the Devnet

For example, to spin up a Devnet with 5 validator nodes and 1 API node in 5 regions each 
(us-west-2,us-east-1,ap-south-1,ap-northeast-1,eu-west-1) in AWS with each node having spec of 
c7g.8xlarge AWS EC2 instance type and io2 volume type, with Subnet `<subnetName>` deployed 
into the Devnet, we will run :

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

### Create a Devnet and Deploy a Custom VM based Subnet into the Devnet

For this example, we will be using the custom VM [TokenVM](https://github.com/ava-labs/hypersdk/tree/main/examples/tokenvm)
built with [HyperSDK](https://github.com/ava-labs/hypersdk).

The following settings will be used:

- `<repoUrl>` `https://github.com/ava-labs/hypersdk/`
- `<branch>` `main`
- `<buildScript>` `examples/tokenvm/scripts/build.sh`
- `<genesisPath>` [Genesis File](/tooling/cli-create-nodes/upload-a-custom-vm-to-cloud#genesis-file)
- `<chainConfigPath>` [Blockchain Config](/tooling/cli-create-nodes/upload-a-custom-vm-to-cloud#blockchain-config)
- `<subnetConfigPath>` [Subnet Config](/tooling/cli-create-nodes/upload-a-custom-vm-to-cloud#subnet-config)
- `<avagoConfigPath>` [AvalancheGo Config](/tooling/cli-create-nodes/upload-a-custom-vm-to-cloud#avalanchego-flags)

To spin up a Devnet with 5 validator nodes and 1 API node in 5 regions each
(us-west-2,us-east-1,ap-south-1,ap-northeast-1,eu-west-1) in AWS with each node having spec of
c7g.8xlarge AWS EC2 instance type and io2 volume type, with the Custom VM based Subnet 
`<subnetName>` deployed into the Devnet, we will run :

```shell
avalanche node devnet wiz <clusterName> <subnetName> --custom-subnet \
  --subnet-genesis <genesisPath> --custom-vm-repo-url <repoUrl> \
  --custom-vm-branch <branch> --custom-vm-build-script <buildScript> \
  --chain-config <chainConfigPath> --subnet-config <subnetConfigPath> \
  --node-config <avagoConfigPath> --authorize-access --aws --num-apis 1,1,1,1,1 \
  --num-validators 5,5,5,5,5  --region us-west-2,us-east-1,ap-south-1,ap-northeast-1,eu-west-1 \
  --default-validator-params --node-type default

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
