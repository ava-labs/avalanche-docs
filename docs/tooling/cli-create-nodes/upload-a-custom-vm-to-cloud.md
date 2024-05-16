---
tags: [Tooling, Avalanche-CLI]
description: This page demonstrates how to deploy a blockchain run with a custom virtual machine using cloud-based validators using the Avalanche-CLI.
pagination_label: Deploy a Custom VM to a set of Cloud-Based validators using Avalanche-CLI
sidebar_label: Deploy a Custom VM
sidebar_position: 6
---

# Deploy a Custom VM Using Avalanche-CLI

This page demonstrates how to deploy a custom VM into cloud-based validators using Avalanche-CLI.

:::info
Currently, only Fuji network and Devnets are supported.
:::

:::warning

ALPHA WARNING: This command is currently in experimental mode. Proceed at your own risk.

:::

## Prerequisites

Before we begin, you will need to have:

- Created a cloud server node as described [here](/tooling/cli-create-nodes/create-a-validator-aws.md)
- Created a Custom VM, as described [here](/build/vm/intro.md).
- (Ignore for Devnet) Set up a key to be able to pay for transaction Fees, as described [here](/build/subnet/deploy/fuji-testnet-subnet.md).

Currently, only AWS & GCP cloud services are supported.

## Deploying the VM

We will be deploying the [MorpheusVM](https://github.com/ava-labs/hypersdk/tree/main/examples/morpheusvm)
example built with the HyperSDK.

The following settings will be used:

- Repo url: `https://github.com/ava-labs/hypersdk/`
- Branch Name: `vryx-poc`
- Build Script: `examples/morpheusvm/scripts/build.sh`

:::note
The CLI needs a public repo url in order to be able to download and install the custom VM on cloud.
:::

### Genesis File

The following contents will serve as the chain genesis. They were generated using
`morpheus-cli` as shown [here](https://github.com/ava-labs/hypersdk/blob/main/examples/morpheusvm/scripts/run.sh).

Save it into a file with path `<genesisPath>` (for example `~/morpheusvm_genesis.json`):

```json
{
  "stateBranchFactor":16,
  "minBlockGap":1000,
  "minUnitPrice":[1,1,1,1,1],
  "maxChunkUnits":[1800000,18446744073709551615,18446744073709551615,18446744073709551615,18446744073709551615],
  "epochDuration":60000,
  "validityWindow":59000,
  "partitions":8,
  "baseUnits":1,
  "baseWarpUnits":1024,
  "warpUnitsPerSigner":128,
  "outgoingWarpComputeUnits":1024,
  "storageKeyReadUnits":5,
  "storageValueReadUnits":2,
  "storageKeyAllocateUnits":20,
  "storageValueAllocateUnits":5,
  "storageKeyWriteUnits":10,
  "storageValueWriteUnits":3,
  "customAllocation": [
    {
      "address":"morpheus1qrzvk4zlwj9zsacqgtufx7zvapd3quufqpxk5rsdd4633m4wz2fdjk97rwu",
      "balance":3000000000000000000
    },
    {"address":"morpheus1qryyvfut6td0l2vwn8jwae0pmmev7eqxs2vw0fxpd2c4lr37jj7wvrj4vc3",
      "balance":3000000000000000000
    },
    {"address":"morpheus1qp52zjc3ul85309xn9stldfpwkseuth5ytdluyl7c5mvsv7a4fc76g6c4w4",
      "balance":3000000000000000000
    },
    {"address":"morpheus1qzqjp943t0tudpw06jnvakdc0y8w790tzk7suc92aehjw0epvj93s0uzasn",
      "balance":3000000000000000000
    },
    {"address":"morpheus1qz97wx3vl3upjuquvkulp56nk20l3jumm3y4yva7v6nlz5rf8ukty8fh27r",
      "balance":3000000000000000000
    }
  ]
}
```

## Create the Subnet

Let's create a Subnet called `<subnetName>`, with custom VM binary and genesis.

```shell
avalanche subnet create <subnetName>
```

Choose custom

```text
Use the arrow keys to navigate: ↓ ↑ → ←
? Choose your VM:
    Subnet-EVM
  ▸ Custom
```

Provide path to genesis:

```text
✗ Enter path to custom genesis: <genesisPath>
```

Provide the source code repo url:

```text
✗ Source code repository URL: https://github.com/ava-labs/hypersdk/
```

Set the branch:

```text
✗ Branch: main
```

Finally set the build script:

```text
✗ Build script: examples/morpheusvm/scripts/build.sh
```

CLI will generate a locally compiled binary, and then create the Subnet.

```text
Cloning into ...

Successfully created subnet configuration
```

## Deploy Subnet 

For this example, we will deploy the Subnet and blockchain on Fuji. Run:

```shell
avalanche subnet deploy <subnetName>
```

Choose Fuji:

```text
Use the arrow keys to navigate: ↓ ↑ → ←
? Choose a network to deploy on:
    Local Network
  ▸ Fuji
    Mainnet
```

Use stored the key:

```text
Use the arrow keys to navigate: ↓ ↑ → ←
? Which key source should be used to pay transaction fees?:
  ▸ Use stored key
    Use ledger
```

Choose `<keyName>` as the key to use to pay the fees:

```text
Use the arrow keys to navigate: ↓ ↑ → ←
? Which stored key should be used to pay transaction fees?:
  ▸ <keyName>
```

Use the same key as the control key for the Subnet:

```text
Use the arrow keys to navigate: ↓ ↑ → ←
? How would you like to set your control keys?:
  ▸ Use fee-paying key
    Use all stored keys
    Custom list
```

The successfully creation of our Subnet and blockchain is
confirmed by the following output:

```text
Your Subnet's control keys: [P-fuji1dlwux652lkflgz79g3nsphjzvl6t35xhmunfk1]
Your subnet auth keys for chain creation: [P-fuji1dlwux652lkflgz79g3nsphjzvl6t35xhmunfk1]
Subnet has been created with ID: RU72cWmBmcXber6ZBPT7R5scFFuVSoFRudcS3vayf3L535ZE3
Now creating blockchain...
+--------------------+----------------------------------------------------+
| DEPLOYMENT RESULTS |                                                    |
+--------------------+----------------------------------------------------+
| Chain Name         | subnetName                                         |
+--------------------+----------------------------------------------------+
| Subnet ID          | RU72cWmBmcXber6ZBPT7R5scFFuVSoFRudcS3vayf3L535ZE3  |
+--------------------+----------------------------------------------------+
| VM ID              | srEXiWaHq58RK6uZMmUNaMF2FzG7vPzREsiXsptAHk9gsZNvN  |
+--------------------+----------------------------------------------------+
| Blockchain ID      | 2aDgZRYcSBsNoLCsC8qQH6iw3kUSF5DbRHM4sGEqVKwMSfBDRf |
+--------------------+                                                    +
| P-Chain TXID       |                                                    |
+--------------------+----------------------------------------------------+
```

## Set the Config Files

Avalanche-CLI supports uploading the full set of configuration
files for a blockchain:

- Genesis File
- Blockchain Config
- Subnet Config
- Network Upgrades
- AvalancheGo Config

The following example uses all of them, but the user can decide to provide a subset of those.

### AvalancheGo Flags

Save the following content (as defined [here](https://github.com/ava-labs/hypersdk/blob/vryx-poc/examples/morpheusvm/tests/e2e/e2e_test.go))
into a file with path `<avagoFlagsPath>` (for example `~/morpheusvm_avago.json`):

```json
{
  "log-level":"INFO",
  "log-display-level":"INFO",
  "proposervm-use-current-height":true,
  "throttler-inbound-validator-alloc-size":"10737418240",
  "throttler-inbound-at-large-alloc-size":"10737418240",
  "throttler-inbound-node-max-processing-msgs":"1000000",
  "throttler-inbound-node-max-at-large-bytes":"10737418240",
  "throttler-inbound-bandwidth-refill-rate":"1073741824",
  "throttler-inbound-bandwidth-max-burst-size":"1073741824",
  "throttler-inbound-cpu-validator-alloc":"100000",
  "throttler-inbound-cpu-max-non-validator-usage":"100000",
  "throttler-inbound-cpu-max-non-validator-node-usage":"100000",
  "throttler-inbound-disk-validator-alloc":"10737418240000",
  "throttler-outbound-validator-alloc-size":"10737418240",
  "throttler-outbound-at-large-alloc-size":"10737418240",
  "throttler-outbound-node-max-at-large-bytes":"10737418240",
  "consensus-on-accept-gossip-validator-size":"10",
  "consensus-on-accept-gossip-peer-size":"10",
  "network-compression-type":"zstd",
  "consensus-app-concurrency":"128",
  "profile-continuous-enabled":true,
  "profile-continuous-freq":"1m",
  "http-host":"",
  "http-allowed-origins": "*",
  "http-allowed-hosts": "*"
}
```

Then set the Subnet to use it by executing:

```shell
avalanche subnet configure subnetName
```

Select node-config.json:

```text
Use the arrow keys to navigate: ↓ ↑ → ←
? Which configuration file would you like to provide?:
  ▸ node-config.json
    chain.json
    subnet.json
    per-node-chain.json
```

Provide the path to the AvalancheGo config file:

```text
✗ Enter the path to your configuration file: <avagoFlagsPath>
```

Finally, choose no:

```text
Use the arrow keys to navigate: ↓ ↑ → ←
? Would you like to provide the chain.json file as well?:
  ▸ No
    Yes
File ~/.avalanche-cli/subnets/subnetName/node-config.json successfully written
```

### Blockchain Config

`morpheus-cli` as shown [here](https://github.com/ava-labs/hypersdk/blob/vryx-poc/examples/morpheusvm/scripts/run.sh).
Save the following content (generated by this [script](https://github.com/ava-labs/hypersdk/blob/vryx-poc/examples/morpheusvm/scripts/run.sh))
in a known file path (for example `~/morpheusvm_chain.json`):

```json
{
  "chunkBuildFrequency": 250,
  "targetChunkBuildDuration": 250,
  "blockBuildFrequency": 100,
  "mempoolSize": 2147483648,
  "mempoolSponsorSize": 10000000,
  "authExecutionCores": 16,
  "precheckCores": 16,
  "actionExecutionCores": 8,
  "missingChunkFetchers": 48,
  "verifyAuth": true,
  "authRPCCores": 48,
  "authRPCBacklog": 10000000,
  "authGossipCores": 16,
  "authGossipBacklog": 10000000,
  "chunkStorageCores": 16,
  "chunkStorageBacklog": 10000000,
  "streamingBacklogSize": 10000000,
  "continuousProfilerDir":"/home/ubuntu/morpheusvm-profiles",
  "logLevel": "INFO"
}
```

Then set the Subnet to use it by executing:

```shell
avalanche subnet configure subnetName
```

Select chain.json:

```text
Use the arrow keys to navigate: ↓ ↑ → ←
? Which configuration file would you like to provide?:
    node-config.json
  ▸ chain.json
    subnet.json
    per-node-chain.json
```

Provide the path to the blockchain config file:

```text
✗ Enter the path to your configuration file: ~/morpheusvm_chain.json
```

Finally choose no:

```text
Use the arrow keys to navigate: ↓ ↑ → ←
? Would you like to provide the subnet.json file as well?:
  ▸ No
    Yes
File ~/.avalanche-cli/subnets/subnetName/chain.json successfully written
```

### Subnet Config

Save the following content (generated by this [script](https://github.com/ava-labs/hypersdk/blob/vryx-poc/examples/morpheusvm/scripts/run.sh))
in a known path (for example `~/morpheusvm_subnet.json`):

```json
{
  "proposerMinBlockDelay": 0,
  "proposerNumHistoricalBlocks": 512
}
```

Then set the Subnet to use it by executing:

```shell
avalanche subnet configure subnetName
```

Select `subnet.json`:

```text
Use the arrow keys to navigate: ↓ ↑ → ←
? Which configuration file would you like to provide?:
    node-config.json
    chain.json
  ▸ subnet.json
    per-node-chain.json
```

Provide the path to the Subnet config file:

```text
✗ Enter the path to your configuration file: ~/morpheusvm_subnet.json
```

Choose no:

```text
Use the arrow keys to navigate: ↓ ↑ → ←
? Would you like to provide the chain.json file as well?:
  ▸ No
    Yes
File ~/.avalanche-cli/subnets/subnetName/subnet.json successfully written
```

### Network Upgrades

Save the following content (currently with no network upgrades) in a known path
(for example `~/morpheusvm_upgrades.json`):

```json
{}
```

Then set the Subnet to use it by executing:

```shell
avalanche subnet upgrade import subnetName
```

Provide the path to the network upgrades file:

```text
✗ Provide the path to the upgrade file to import: ~/morpheusvm_upgrades.json
```

## Deploy Our Custom VM

To deploy our Custom VM, run:

```shell
avalanche node sync <clusterName> <subnetName>
```

```text
Node(s) successfully started syncing with Subnet!
```

Your custom VM is successfully deployed!

You can also use `avalanche node update subnet <subnetName>` to reinstall the binary
when the branch is updated, or update the config files.
