# Deploying Subnets on Production Infrastructure

## Introduction

After architecting your Subnet environment on the [local machine](create-a-local-subnet.md), proving the design and testing it out on [the testnet](create-a-fuji-subnet.md), eventually you will need to deploy your Subnet to production environment. Running a subnet in production is much more involved than local and testnet deploys, as your Subnet will have to take care of real world usage, maintaining uptime, upgrades and all of that in a potentially adversarial environment. The purpose of this document is to point out a set of general considerations and propose potential solutions to them.

The architecture of the environment your particular Subnet will use will be greatly influenced by the type of load and activity your Subnet is designed to support so your solution will most likely differ from what we propose here. Still, it might be useful to follow along, to build up the intuition for the type of questions you will need to consider.

## Node setup

Nodes are essential elements for running your Subnet in production. At a minimum, your Subnet will need validator nodes, potentially also nodes that act as RPC servers, indexers or explorers. Running a node is basically running an instance of [AvalancheGo](https://github.com/ava-labs/avalanchego) on a server.

### Server OS

Although AvalancheGo can run on a MacOS or a Windows computer, we strongly recommend running nodes on computers running Linux as they are designed specifically for server loads and all the tools and utilities needed for administering a server are native to Linux.

### Hardware specification

For running AvalancheGo as a validator on the Primary Network the recommended configuration is as follows:

* CPU: Equivalent of 8 AWS vCPU
* RAM: 16 GiB
* Storage: 1TB with at least 3000 IOPS
* OS: Ubuntu 18.04/20.04
* Network: Reliable IPv4 or IPv6 network connection, with an open public port

That is the configuration sufficient for running a Primary Network node. Any resource requirements for your Subnet come on top of this, so you should not go below this configuration, but may need to step up the specification if you expect your Subnet to handle a significant amount of transactions.

Be sure to set up monitoring of resource consumption for your nodes because resource exhaustion may cause your Subnet to slow down or even halt.

### Server location

You can run a node on a physical computer that you own and run, or on a cloud instance. Although running on your own HW may seem like a good idea, unless you have a sizeable DevOps 24/7 staff we recommend using cloud service providers as they generally provide reliable computing resources that you can count on to be properly maintained and monitored.

#### Local servers

If you plan on running nodes on your own hardware, make sure they satisfy the minimum HW specification as outlined earlier. Pay close attention to proper networking setup, making sure the p2p port (9651) is accessible and public IP properly configured on the node. Make sure the node is connected to the network physically (not over WiFi), and that the router is powerful enough to handle a couple of thousands of persistent TCP connections and that network bandwidth can accommodate at least 5Mbps of steady upstream and downstream network traffic.

When installing the AvalancheGo client on the machines, unless you have a dedicated DevOps staff that will take care of node setup and configuration, we recommend using the [installer script](../nodes/build/set-up-node-with-installer.md) to set up the nodes. It will abstract most of the setup process for you, set up the node as a system service and will enable easy node upgrades.

#### Cloud providers

There are a number of different cloud providers. We have documents that show how to set up a node on the most popular ones:
* [Amazon Web Services](../nodes/build/setting-up-an-avalanche-node-with-amazon-web-services-aws.md)
* [Azure](../nodes/build/set-up-an-avalanche-node-with-microsoft-azure.md)
* [Google Cloud Platform](../nodes/build/set-up-an-avalanche-node-with-google-cloud-platform.md)

There is a whole range of other cloud providers that may offer lower prices or better deals for your particular needs, so it makes sense to shop around.

Once you decide on a provider (or providers), if they offer instances in multiple data centers, it makes sense to spread the nodes geographically since that provides a better resilience and stability against outages.

### Number of Validators

Number of validators on a subnet is a crucial decision you need to make. For stability and decentralization, you should strive to have as many validators as possible.

For stability reasons our recommendation is to have **at least** 5 full validators on your Subnet. If you have less than 5 validators your Subnet liveness will be at risk whenever a single validator goes offline, and if you have less than 4 even one offline node will halt your Subnet.

Considering that at times you will have to take nodes offline, for routine maintenance (at least for node upgrades which happen with some regularity) or unscheduled outages and failures you need to be able to routinely handle at least one node being offline without your Subnet performance degrading.

### Node bootstrap

Once you set up the node instances and install AvalancheGo clients on them, nodes will need to boostrap (sync with the network). This is a lengthy process, as the nodes need to catch up and replay all the network activity since the genesis up to the present moment. Full bootstrap on a node can take more than a week, but there are ways to shorten that process, depending on your circumstances.

#### State sync

If the nodes you will be running as validators don't need to have the full transaction history, then you can use [state sync](../nodes/maintain/chain-config-flags.md#state-sync-enabled-boolean). With this flag enabled, instead of replaying the whole history to get to the current state, nodes simply download only the current state from other network peers, shortening the bootstrap process from multiple days to a couple of hours. If the nodes will be used for subnet validation exclusively, you can use the state sync without any issues.

#### Database copy

Good way to cut down on bootstrap times on multiple nodes is databse copy. Database is identical across nodes, and as such can safely be copied from one node to another. Just make sure to that the node is not running during the copy process, as that can result in a corrupted database. Database copy procedure is explained in detail [here](../nodes/maintain/node-backup-and-restore.md#database).

## Subnet deploy

Once you have the nodes set up you are ready to deploy the actual subnet. Right now, the recommended tool to do that is [Subnet-CLI](https://github.com/ava-labs/subnet-cli).

Instructions for using the Subnet-CLI can be found [here](../subnets/subnet-cli.md). We will highlight the main steps below.

### Ledger HW wallet

When creating the Subnet, you will be required to have a private key that will control the administrative functions of the subnet (adding validators, managing the configuration). Needless to say, whoever has this private key has complete control over the Subnet and the way it runs. Therefore, protecting that key is of the utmost operational importance. Which is why we strongly recommend using a hardware wallet such as a [Ledger HW Wallet](https://www.ledger.com/) to store and access that private key. 

Of course, Subnet-CLI supports the usage of a Ledger HW wallet. Take advantage of that because losing control of the managing would be catastrophic. General instruction on how to use a Ledger device with Avalanche can be found [here](https://support.avax.network/en/articles/6150237-how-to-use-a-ledger-nano-s-or-nano-x-with-avalanche).

### Subnet-CLI Wizard

Creating a subnet is a multistep process. You need to:
* create a WMID
* create the controlling key
* create the Subnet
* create the blockchain in the Subnet
* add validators to Subnet

Fortunately, to minimize potential errors and streamline the process Subnet-CLi has a Wizard command that does most of the work for you snd guides you through the process.

### Create a subnet



### Create the blockchain

### Add the validators

## Validator Configuration

### Subnet Whitelisting

### Bootstrapping

### Monitoring

### Managing validation

## Othre considerations

## Conclusion
