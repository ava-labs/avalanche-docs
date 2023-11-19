---
tags: [Nodes, Subnets]
description: Detailed instructions for running an Avalanche node that tracks a Subnet.
sidebar_label: Subnet Nodes
pagination_label: Run a Subnet Node 
sidebar_position: 2
keywords: [subnet, avalanche, avalanche subnet, run a subnet node, subnet node, track subnet, virtual machine, binary]
---
# Run a Subnet Node

## Introduction

This article describes how to run a node that tracks a Subnet. It requires building AvalancheGo, adding
Virtual Machine binaries as plugins to your local data directory, and running AvalancheGo to track these
binaries. 

This tutorial specifically covers tracking a Subnet built with Avalanche's 
[Subnet-EVM](https://github.com/ava-labs/subnet-evm), the default [Virtual Machine](/learn/avalanche/virtual-machines.md)
run by Subnets on Avalanche.

## Build AvalancheGo

It is recommended that you first complete [this comprehensive guide](/nodes/run/node-manually.md) 
which demonstrates how to build and run a basic Avalanche node. Below are the high level details.

<details>
<summary>System Requirements</summary>
<p>

- CPU: Equivalent of 8 AWS vCPU
- RAM: 16 GiB
- Storage: 1 TiB SSD
- OS: Ubuntu 20.04 or MacOS &gt;= 12

Note that as network usage increases, hardware requirements may
change.
</p></details>

<details>
<summary>To build from source:</summary>
<p>

1. Install [gcc](https://gcc.gnu.org/)
2. Install [go](https://go.dev/)

3. Set the [$GOPATH](https://github.com/golang/go/wiki/SettingGOPATH)

4. Create a directory in your `$GOPATH`

```bash
mkdir -p $GOPATH/src/github.com/ava-labs
``` 
<!-- markdownlint-disable MD029 -->

5. Clone AvalancheGo

In the `$GOPATH`, clone [AvalancheGo](https://github.com/ava-labs/avalanchego), 
the consensus engine and node implementation that is the core of the Avalanche
Network.

```bash
cd $GOPATH/src/github.com/ava-labs
git clone https://github.com/ava-labs/avalanchego.git
``` 

6. Run the Build Script

From the `avalanchego` directory, run the build script

```bash
cd $GOPATH/src/github.com/ava-labs/avalanchego
./scripts/build.sh
``` 

</p></details>

## Manage the Subnet Binaries

_After building AvalancheGo successfully,_

### 1. Clone [Subnet-EVM](https://github.com/ava-labs/subnet-evm)

```bash
cd $GOPATH/src/github.com/ava-labs
git clone https://github.com/ava-labs/subnet-evm.git
```

### 2. Build the Binary and Save as a Plugin

In the Subnet-EVM directory, run the build script, and save it in the “plugins” folder of your 
`.avalanchego` data directory. Name the plugin after the `VMID` of the Subnet you wish to track. 
The `VMID` of the WAGMI Subnet is the value beginning with “srEX...”.

```bash
cd $GOPATH/src/github.com/ava-labs/subnet-evm
./scripts/build.sh ~/.avalanchego/plugins/srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy
```

<details>
<summary>Where can I find Subnet parameters like VMID?</summary>
<p>
VMID, Subnet ID, ChainID, and all other parameters can be found in the "Chain Info" 
section of the Subnet Explorer. 

- [Avalanche Mainnet](https://subnets.avax.network/c-chain)
- [Fuji Testnet](https://subnets-test.avax.network/wagmi)

</p></details>



### 3. Specify the Plugin with a Config.json

Create a file named `config.json` and add a `track-subnets` field that is populated with the 
`SubnetID` you wish to track. The `SubnetID` of the WAGMI Subnet is the value beginning with 
“28nr...”.

```bash
cd ~/.avalanchego
echo '{"track-subnets": "28nrH5T2BMvNrWecFcV3mfccjs6axM1TVyqe79MCv2Mhs8kxiY"}' > config.json
```

<!-- markdownlint-enable MD029 -->

## Run the Node

Run AvalancheGo with the `—config-file` flag to start your node and ensure it tracks the Subnets
included in the configuration file.

```bash
cd $GOPATH/src/github.com/ava-labs/avalanchego
./build/avalanchego --config-file ~/.avalanchego/config.json --network-id=fuji
```

Note: The above command includes the `--network-id=fuji` command because the WAGMI Subnet is deployed
on Fuji Testnet. 

<details>
<summary>Run via the command line instead</summary>
<p>

If you would prefer to track Subnets using a command line flag, you can instead use the `--track-subnets`
flag. 

For example: 

```bash
./build/avalanchego --track-subnets 28nrH5T2BMvNrWecFcV3mfccjs6axM1TVyqe79MCv2Mhs8kxiY --network-id=fuji
```

</p></details>

You should now see terminal filled with logs and information to suggest the node is properly running
and has began bootstrapping to the network.

## Bootstrapping and RPC Details

It may take a few hours for the node to fully [bootstrap](/nodes/run/node-manually.md#bootstrapping)
to the Avalanche Primary Network and tracked Subnets. 

When finished bootstrapping, the endpoint will be: 

```bash
localhost:9650/ext/bc/<BlockchainID>/rpc 
```

if run locally, or

```bash
XXX.XX.XX.XXX:9650/ext/bc/<BlockchainID>/rpc
```

if run on a cloud provider. The “X”s should be replaced with the public 
IP of your EC2 instance. 

For more information on the requests available at these endpoints, please see the 
[Subnet-EVM API Reference](/reference/subnet-evm/api.md) documentation.

Because each node is also tracking the Primary Network, those 
[RPC endpoints](nodes/run/node-manually.md#rpc) are available as well.
