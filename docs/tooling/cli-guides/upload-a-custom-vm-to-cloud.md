---
tags: [Tooling, Avalanche-CLI]
description: This page demonstrates how to deploy a blockchain run with a custom virtual machine using cloud-based validators using the Avalanche-CLI.
pagination_label: Deploy a Custom VM to a set of Cloud-Based validators using Avalanche-CLI
sidebar_label: Deploy a Custom VM
sidebar_position: 7
---

# Deploy a Custom VM Using Avalanche-CLI

This page demonstrates how to deploy a custom VM into cloud-based validators using Avalanche-CLI.

:::info
Currently, only Fuji network is supported.
:::

:::warning

ALPHA WARNING: This command is currently in experimental mode. Proceed at your own risk.

:::

## Prerequisites

Before we begin, you will need to have:

- Created a Cloud Server node as described [here](/docs/tooling/cli-guides/create-a-validator-aws.md)
- Created a Custom VM, as described [here](/docs/build/vm/intro.md).
- Set up a key to be able to pay for the Fuji Fees, as described [here](/docs/build/subnet/deploy/fuji-testnet-subnet.md).

Currently, we only support AWS cloud services, but we plan to add support for more cloud 
services in the near future.

## Deploying the VM

We will be deploying the [TokenVM](https://github.com/ava-labs/hypersdk/tree/main/examples/tokenvm)
example built with the HyperSDK. 

The following settings will be used:

- Repo url: `https://github.com/ava-labs/hypersdk/`
- Branch Name: `main`
- Build Script: `examples/tokenvm/scripts/build.sh`

:::note
The CLI needs a public repo url in order to be able to download and install the custom VM on cloud.
:::

### Local Build Stage

A locally compiled binary is needed to setup the Subnet. You can create it by locally
cloning the HyperSDK, changing to the desired branch, and then executing the build 
script. Eg:

```bash
git clone https://github.com/ava-labs/hypersdk
cd hypersdk
git checkout main
./examples/tokenvm/scripts/build.sh <vmBinaryPath>
```

where `<vmBinaryPath>` is the full path where you want the script's 
output binary to be saved (for example `~/tokenvm.bin`).

### Genesis File

The following contents will serve as the chain genesis. They were generated using
`token-cli` as shown [here](https://github.com/ava-labs/hypersdk/blob/main/examples/tokenvm/scripts/run.sh).

Save it into a file with path `<genesisPath>` (for example `~/tokenvm_genesis.json`):

```json
{
    "hrp": "token",
    "minBlockGap": 100,
    "minEmptyBlockGap": 2500,
    "minUnitPrice": [
        100,
        100,
        100,
        100,
        100
    ],
    "unitPriceChangeDenominator": [
        48,
        48,
        48,
        48,
        48
    ],
    "windowTargetUnits": [
        40000000,
        450000,
        450000,
        450000,
        450000
    ],
    "maxBlockUnits": [
        1800000,
        15000,
        15000,
        2500,
        15000
    ],
    "validityWindow": 60000,
    "baseUnits": 1,
    "baseWarpUnits": 1024,
    "warpUnitsPerSigner": 128,
    "outgoingWarpComputeUnits": 1024,
    "coldStorageKeyReadUnits": 5,
    "coldStorageValueReadUnits": 2,
    "warmStorageKeyReadUnits": 1,
    "warmStorageValueReadUnits": 1,
    "storageKeyCreateUnits": 20,
    "storageKeyValueUnits": 5,
    "coldStorageKeyModificationUnits": 10,
    "coldStorageValueModificationUnits": 3,
    "warmStorageKeyModificationUnits": 5,
    "warmStorageValueModificationUnits": 3,
    "customAllocation": [
        {
            "address": "token1rvzhmceq997zntgvravfagsks6w0ryud3rylh4cdvayry0dl97nsjzf3yp",
            "balance": 10000000000000000000
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

Provide path to binary:

```text
✗ Enter path to vm binary: <vmBinaryPath>
Successfully created subnet configuration
```

## Deploy Subnet on Fuji

To deploy the Subnet and blockchain on Fuji, run:

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

Save the following content (as defined [here](https://github.com/ava-labs/hypersdk/blob/main/examples/tokenvm/tests/e2e/e2e_test.go))
into a file with path `<avagoFlagsPath>` (for example `~/tokenvm_avago.json`):

```json
{
	"log-display-level":"info",
	"proposervm-use-current-height":true,
	"throttler-inbound-validator-alloc-size":"10737418240",
	"throttler-inbound-at-large-alloc-size":"10737418240",
	"throttler-inbound-node-max-processing-msgs":"100000",
	"throttler-inbound-bandwidth-refill-rate":"1073741824",
	"throttler-inbound-bandwidth-max-burst-size":"1073741824",
	"throttler-inbound-cpu-validator-alloc":"100000",
	"throttler-inbound-disk-validator-alloc":"10737418240000",
	"throttler-outbound-validator-alloc-size":"10737418240",
	"throttler-outbound-at-large-alloc-size":"10737418240",
	"consensus-on-accept-gossip-validator-size":"10",
	"consensus-on-accept-gossip-peer-size":"10",
	"network-compression-type":"zstd",
	"consensus-app-concurrency":"512",
	"profile-continuous-enabled":false,
	"profile-continuous-freq":"1m"
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

`token-cli` as shown [here](https://github.com/ava-labs/hypersdk/blob/main/examples/tokenvm/scripts/run.sh).
Save the following content (generated by this [script](https://github.com/ava-labs/hypersdk/blob/main/examples/tokenvm/scripts/run.sh))
in a known file path (for example `~/tokenvm_chain.json`):

```json
{
  "mempoolSize": 10000000,
  "mempoolPayerSize": 10000000,
  "mempoolExemptPayers":["token1rvzhmceq997zntgvravfagsks6w0ryud3rylh4cdvayry0dl97nsjzf3yp"],
  "parallelism": 5,
  "verifySignatures":true,
  "storeTransactions": false,
  "streamingBacklogSize": 10000000,
  "trackedPairs":["*"],
  "logLevel": "info",
  "stateSyncServerDelay": 0
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
✗ Enter the path to your configuration file: ~/tokenvm_chain.json
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

Save the following content (generated by this [script](https://github.com/ava-labs/hypersdk/blob/main/examples/tokenvm/scripts/run.sh))
in a known path (for example `~/tokenvm_subnet.json`):

```json
{
  "proposerMinBlockDelay": 0,
  "proposerNumHistoricalBlocks": 768
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
✗ Enter the path to your configuration file: ~/tokenvm_subnet.json
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
(for example `~/tokenvm_upgrades.json`):

```json
{}
```

Then set the Subnet to use it by executing:

```shell
avalanche subnet upgrade import subnetName
```

Provide the path to the network upgrades file:

```text
✗ Provide the path to the upgrade file to import: ~/tokenvm_upgrades.json
```

## Deploy Our Custom VM

To deploy our Custom VM, run:

```shell
avalanche node sync <clusterName> <subnetName>

...

Custom VM source code repository, branch and build script not defined for subnet. Filling in the details now.
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
✗ Build script: examples/tokenvm/scripts/build.sh

...

Node(s) successfully started syncing with Subnet!
```

Your custom VM is successfully deployed!

You can also use `avalanche node update subnet <subnetName>` to reinstall the binary
when the branch is updated, or update the config files.

