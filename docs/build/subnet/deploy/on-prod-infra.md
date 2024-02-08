---
tags: [Build, Subnets]
description: This tutorial demonstrates how to deploy a Subnet to production environment.
sidebar_label: On Production Infrastructure
pagination_label: Deploy Subnets on Production Infrastructure
sidebar_position: 3
---

# Deploy Subnets on Production Infrastructure

## Introduction

After architecting your Subnet environment on the [local machine](/tooling/cli-create-deploy-subnets/deploy-local-subnet.md),
proving
the design and testing it out on [the Fuji Testnet](/tooling/cli-create-deploy-subnets/deploy-fuji-testnet-subnet.md),
eventually you will
need to deploy your Subnet to production environment. Running a Subnet in production is much more
involved than local and Testnet deploys, as your Subnet will have to take care of real world usage,
maintaining uptime, upgrades and all of that in a potentially adversarial environment. The purpose
of this document is to point out a set of general considerations and propose potential solutions to
them.

The architecture of the environment your particular Subnet will use will be greatly influenced by
the type of load and activity your Subnet is designed to support so your solution will most likely
differ from what we propose here. Still, it might be useful to follow along, to build up the
intuition for the type of questions you will need to consider.

## Node Setup

Avalanche nodes are essential elements for running your Subnet in production. At a minimum, your
Subnet will need validator nodes, potentially also nodes that act as RPC servers, indexers or
explorers. Running a node is basically running an instance of [AvalancheGo](/nodes/README.md) on a
server.

### Server OS

Although AvalancheGo can run on a MacOS or a Windows computer, we strongly recommend running nodes
on computers running Linux as they are designed specifically for server loads and all the tools and
utilities needed for administering a server are native to Linux.

### Hardware Specification

For running AvalancheGo as a validator on the Primary Network the recommended configuration is as follows:

- CPU: Equivalent of 8 AWS vCPU
- RAM: 16 GiB
- Storage: 1 TiB with at least 3000 IOPS
- OS: Ubuntu 20.04
- Network: Reliable IPv4 or IPv6 network connection, with an open public port

That is the configuration sufficient for running a Primary Network node. Any resource requirements
for your Subnet come on top of this, so you should not go below this configuration, but may need to
step up the specification if you expect your Subnet to handle a significant amount of transactions.

Be sure to set up monitoring of resource consumption for your nodes because resource exhaustion may
cause your node to slow down or even halt, which may severely impact your Subnet negatively.

### Server Location

You can run a node on a physical computer that you own and run, or on a cloud instance. Although
running on your own HW may seem like a good idea, unless you have a sizeable DevOps 24/7 staff we
recommend using cloud service providers as they generally provide reliable computing resources that
you can count on to be properly maintained and monitored.

#### Local Servers

If you plan on running nodes on your own hardware, make sure they satisfy the minimum HW
specification as outlined earlier. Pay close attention to proper networking setup, making sure the
p2p port (9651) is accessible and public IP properly configured on the node. Make sure the node is
connected to the network physically (not over Wi-Fi), and that the router is powerful enough to
handle a couple of thousands of persistent TCP connections and that network bandwidth can
accommodate at least 5Mbps of steady upstream and downstream network traffic.

When installing the AvalancheGo node on the machines, unless you have a dedicated DevOps staff that
will take care of node setup and configuration, we recommend using the
[installer script](/nodes/run/with-installer/installing-avalanchego.md) to set up the nodes.
It will abstract most of the setup process for you, set up the node as a system
service and will enable easy node upgrades.

#### Cloud Providers

There are a number of different cloud providers. We have documents that show how to set up a node on
the most popular ones:

- [Amazon Web Services](/nodes/run/third-party/aws-node.md)
- [Azure](/nodes/run/third-party/microsoft-azure-node.md)
- [Google Cloud Platform](/nodes/run/third-party/google-cloud-node.md)

There is a whole range of other cloud providers that may offer lower prices or better deals for your
particular needs, so it makes sense to shop around.

Once you decide on a provider (or providers), if they offer instances in multiple data centers, it
makes sense to spread the nodes geographically since that provides a better resilience and stability
against outages.

### Number of Validators

Number of validators on a Subnet is a crucial decision you need to make. For stability and
decentralization, you should strive to have as many validators as possible.

For stability reasons our recommendation is to have **at least** 5 full validators on your Subnet.
If you have less than 5 validators your Subnet liveness will be at risk whenever a single validator
goes offline, and if you have less than 4 even one offline node will halt your Subnet.

You should be aware that 5 is the minimum we recommend. But, from a decentralization standpoint
having more validators is always better as it increases the stability of your Subnet and makes it
more resilient to both technical failures and adversarial action. In a nutshell: run as many Subnet
validators as you can.

Considering that at times you will have to take nodes offline, for routine maintenance (at least for
node upgrades which happen with some regularity) or unscheduled outages and failures you need to be
able to routinely handle at least one node being offline without your Subnet performance degrading.

### Node Bootstrap

Once you set up the server and install AvalancheGo on them, nodes will need to bootstrap (sync with
the network). This is a lengthy process, as the nodes need to catch up and replay all the network
activity since the genesis up to the present moment. Full bootstrap on a node can take more than a
week, but there are ways to shorten that process, depending on your circumstances.

#### State Sync

If the nodes you will be running as validators don't need to have the full transaction history, then
you can use [state sync](/nodes/configure/chain-config-flags.md#state-sync-enabled-boolean). With
this flag enabled, instead of replaying the whole history to get to the current state, nodes simply
download only the current state from other network peers, shortening the bootstrap process from
multiple days to a couple of hours. If the nodes will be used for Subnet validation exclusively, you
can use the state sync without any issues. Currently, state sync is only available for the C-Chain,
but since the bulk of the transactions on the platform happen there it still has a significant
impact on the speed of bootstrapping.

#### Database Copy

Good way to cut down on bootstrap times on multiple nodes is database copy. Database is identical
across nodes, and as such can safely be copied from one node to another. Just make sure to that the
node is not running during the copy process, as that can result in a corrupted database. Database
copy procedure is explained in detail [here](/nodes/maintain/node-backup-and-restore.md#database).

Please make sure you don't reuse any node's NodeID by accident, especially don't restore another
node's ID, see [here](/nodes/maintain/node-backup-and-restore.md#nodeid) for details. Each node
must has its own unique NodeID, otherwise, the nodes sharing the same ID will not behave correctly,
which will impact your validator's uptime, thus staking rewards, and the stability of your Subnet.

## Subnet Deploy

Once you have the nodes set up you are ready to deploy the actual Subnet. Right now, the recommended
tool to do that is [Avalanche-CLI](https://github.com/ava-labs/avalanche-cli).

Instructions for deployment by Avalanche-CLI can be found [here](/tooling/cli-create-deploy-subnets/deploy-mainnet-subnet.md).

### Ledger HW Wallet

When creating the Subnet, you will be required to have a private key that will control the
administrative functions of the Subnet (adding validators, managing the configuration). Needless to
say, whoever has this private key has complete control over the Subnet and the way it runs.
Therefore, protecting that key is of the utmost operational importance. Which is why we strongly
recommend using a hardware wallet such as a [Ledger HW Wallet](https://www.ledger.com/) to store and
access that private key.

General instruction on how to use a Ledger
device with Avalanche can be found
[here](https://support.avax.network/en/articles/6150237-how-to-use-a-ledger-nano-s-or-nano-x-with-avalanche).

### Genesis File

The structure that defines the most important parameters in a Subnet is found in the genesis file,
which is a `json` formatted, human-readable file. Describing the contents and the options available
in the genesis file is beyond the scope of this document, and if you're ready to deploy your Subnet
to production you probably have it mapped out already.

If you want to review, we have a description of the genesis file in our document on
[customizing EVM Subnets](/build/subnet/upgrade/customize-a-subnet.md).

## Validator Configuration

Running nodes as Subnet validators warrants some additional considerations, above those when running
a regular node or a Primary Network-only validator.

### Joining a Subnet

For a node to join a Subnet, there are two prerequisites:

- Primary Network validation
- Subnet tracking

Primary Network validation means that a node cannot join a Subnet as a validator before becoming a
validator on the Primary Network itself. So, after you add the node to the validator set on the
Primary Network, node can join a Subnet. Of course, this is valid only for Subnet validators, if you
need a non-validating Subnet node, then the node doesn't need to be a validator at all.

To have a node start syncing the Subnet, you need to add the `--track-subnets` command line
option, or `track-subnets` key to the node config file (found at
`.avalanchego/configs/node.json` for installer-script created nodes). A single node can sync
multiple Subnets, so you can add them as a comma-separated list of Subnet IDs.

An example of a node config syncing two Subnets:

```json
{
  "public-ip-resolution-service": "opendns",
  "http-host": "",
  "track-subnets": "28nrH5T2BMvNrWecFcV3mfccjs6axM1TVyqe79MCv2Mhs8kxiY,Ai42MkKqk8yjXFCpoHXw7rdTWSHiKEMqh5h8gbxwjgkCUfkrk"
}
```

But that is not all. Besides tracking the SubnetID, the node also needs to have the
plugin that contains the VM instance the blockchain in the Subnet will run. You should have already
been through that on Testnet and Fuji, but for a refresher, you can refer to [this tutorial](/tooling/cli-create-deploy-subnets/deploy-fuji-testnet-subnet.md).

So, name the VM plugin binary as the `VMID` of the Subnet chain and place it in the `plugins`
directory where the node binary is (for installer-script created nodes that would be
`~/avalanche-node/plugins/`).

### Subnet Bootstrapping

After you have tracked the Subnet and placed the VM binary in the correct directory, your node is
ready to start syncing with the Subnet. Restart the node and monitor the log output. You should
notice something similar to:

<!-- markdownlint-disable MD013 -->

```text
Jul 30 18:26:31 node-fuji avalanchego[1728308]: [07-30|18:26:31.422] INFO chains/manager.go:262 creating chain:
Jul 30 18:26:31 node-fuji avalanchego[1728308]:     ID: 2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt
Jul 30 18:26:31 node-fuji avalanchego[1728308]:     VMID:srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy
```

<!-- markdownlint-enable MD013 -->

That means the node has detected the Subnet, and is attempting to initialize it and start
bootstrapping the Subnet. It might take some time (if there are already transactions on the Subnet),
and eventually it will finish the bootstrap with a message like:

<!-- markdownlint-disable MD013 -->

```text
Jul 30 18:27:21 node-fuji avalanchego[1728308]: [07-30|18:27:21.055] INFO <2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt Chain> snowman/transitive.go:333 consensus starting with J5wjmotMCrM2DKxeBTBPfwgCPpvsjtuqWNozLog2TomTjSuGK as the last accepted block
```

<!-- markdownlint-enable MD013 -->

That means the node has successfully bootstrapped the Subnet and is now in sync. If the node is one
of the validators, it will start validating any transactions that get posted to the Subnet.

### Monitoring

If you want to inspect the process of Subnet syncing, you can use the RPC call to check for the
[blockchain status](/reference/avalanchego/p-chain/api.md#platformgetblockchainstatus).

For a more in-depth look into Subnet operation, check out the blockchain log. By default, the log
can be found in `~/.avalanchego/logs/ChainID.log` where you replace the `ChainID` with the actual ID
of the blockchain in your Subnet.

For an even more thorough (and pretty!) insight into how the node and the Subnet is behaving, you
can install the Prometheus+Grafana monitoring system with the custom dashboards for the regular node
operation, as well as a dedicated dashboard for Subnet data. Check out the
[tutorial](/nodes/maintain/setting-up-node-monitoring.md) for information on how to set it up.

### Managing Validation

On Avalanche all validations are limited in time and can range from two weeks up to one year.
Furthermore, Subnet validations are always a subset of the Primary Network validation period (must
be shorter or the same). That means that periodically your validators will expire and you will need
to submit a new validation transaction for both the Primary Network and your Subnet.

Unless managed properly and in a timely manner, that can be disruptive for your Subnet (if all
validators expire at the same time your Subnet will halt). To avoid that, keep notes on when a
particular validation is set to expire and be ready to renew it as soon as possible. Also, when
initially setting up the nodes, make sure to stagger the validator expiry so they don't all expire
on the same date. Setting end dates at least a day apart is a good practice, as well as setting
reminders for each expiry.

## Conclusion

Hopefully, by reading this document you have a better picture of the requirements and considerations
you need to make when deploying your Subnet to production and you are now better prepared to launch
your Subnet successfully.

Keep in mind, running a Subnet in production is not a one-and-done kind of situation, it is in fact
running a fleet of servers 24/7. And as with any real time service, you should have a robust
logging, monitoring and alerting systems to constantly check the nodes and Subnet health and alert
you if anything out of the ordinary happens.

If you have any questions, doubts or would like to chat, please check out our [Discord
server](https://chat.avax.network/), where we host a dedicated `#subnet-chat` channel dedicated to
talking about all things Subnet.

We hope to see you there!
