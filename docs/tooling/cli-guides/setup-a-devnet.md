---
tags: [Tooling, Avalanche-CLI]
description: This page demonstrates how to setup a devnet of cloud-based validators using the Avalanche-CLI.
pagination_label: Setup a Devnet of Cloud-Based validators using Avalanche-CLI
sidebar_label: Setup a Devnet
sidebar_position: 8
---

# Setup a Devnet Using Avalanche-CLI

This page demonstrates how to setup a devnet of cloud-based validators using Avalanche-CLI, 
and deploy a VM into it.

:::warning

ALPHA WARNING: This command is currently in experimental mode. Proceed at your own risk.

:::

## Prerequisites

Before we begin, you will need to have:

- Create an AWS account and have an AWS `credentials` file in home directory with [default] profile
- Install [Terraform](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)
- A subnet subnet1 was created on CLI based on SubnetEVM, latest version.

Note: the tutorial is based in AWS, but devnets can also be created and operated in other supported
cloud providers, such as GCP.

## Creating the Devnet

Start the devnet creation command in interactive mode:

```shell
avalanche node create <clusterName>
```

You will be asked to select the network. Choose Devnet:

```
? Choose a network for the operation:
    Fuji
  ▸ Devnet
```

Then will be asked on the cloud provider. Set AWS:

```
? Which cloud service would you like to launch your Avalanche Node(s) in?:
  ▸ Amazon Web Services
    Google Cloud Platform
```

Then, CLI will ask for the number of nodes. Select 5. Notice it can be from 2 onwards.

```
✗ How many nodes do you want to set up?: 5
```

Then select the AWS region. Choose `us-east-1`:

```
 Which AWS region do you want to set up your node in?:
  ▸ us-east-1
    us-east-2
    us-west-1
    us-west-2
    Choose custom region (list of regions available at https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html)
```

Give authorization to access AWS resources on behalf of the user:

```
? I authorize Avalanche-CLI to access my AWS account:
  ▸ Yes
    No
```

Next, the nodes will be created. And latest step of devnet configuration will start.
You will asked which avalanchego version do you want to install in the nodes. Select
the one associated to subnet1.

```
...
New EC2 instance(s) successfully created in AWS!
? What version of Avalanche Go would you like to install in the node?:
    Use latest Avalanche Go Version
  ▸ Use the deployed Subnet's VM version that the node will be validating
    Custom
```

```
✗ Which Subnet would you like to use to choose the avalanche go version?: subnet1
```

Finally the devnet will be fully setup

```
...
AvalancheGo and Avalanche-CLI installed and node(s) are bootstrapping!
```

You can check the setup with `node status` command. It will give output similar to this after
some seconds required for network to stabilize:

```
avalanche node status cluster1
Checking if node(s) are bootstrapped to Primary Network ...
Checking if node(s) are healthy ...
Getting avalanchego version of node(s)
All nodes in cluster cluster1 are bootstrapped to Primary Network!

STATUS FOR CLUSTER: cluster1
============================

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



