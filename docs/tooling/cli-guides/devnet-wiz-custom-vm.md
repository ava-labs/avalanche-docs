---
tags: [Tooling, Avalanche-CLI]
description: This page demonstrates how to use the wiz command to setup a Devnet and deploy a custom VM into it using the Avalanche-CLI.
pagination_label: Deploy a Custom VM into a Devnet using one command and without user interaction
sidebar_label: One command to create a Devnet and deploy a Custom VM into it
sidebar_position: 9
---

# Deploy a Custom VM into a Devnet Using One Command

This page demonstrates how to setup a new Devnet of cloud-based validators using Avalanche-CLI, 
and deploy a new custom VM into it.

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
- Created a Custom VM, as described [here](/build/vm/intro.md).

Note: the tutorial is based in AWS, but Devnets can also be created and operated in other supported
cloud providers, such as GCP.

## Custom VM

The tutorial will create exactly the same Custom VM as [here](/tooling/cli-guides/upload-a-custom-vm-to-cloud), and the
same Devnet as [here](/tooling/cli-guides/setup-a-devnet).

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

## Execute Wiz

Now we are ready to execute the Devnet Wizard. It it going to:

- create the Subnet configuration, generating also the local VM binary
- create the Devnet
- deploy the Subnet into the Devnet
- make the Devnet nodes to start tracking the Subnet
- make the Devnet nodes to start validating the Subnet

The command assumes `<clusterName>` and `<subnetName>` have not been previously created.

The full command line is:

```
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
