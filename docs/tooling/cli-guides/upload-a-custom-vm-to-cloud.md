---
tags: [Tooling, Avalanche-CLI]
description: This page demonstrates how to upload a Custom VM into Cloud-Based Validators using Avalanche-CLI
pagination_label: Upload a Custom VM into a set of Cloud-Based validators using Avalanche-CLI
sidebar_label: Upload a Custom VM into Cloud
sidebar_position: 7
---

# Upload a Custom VM into Cloud Using Avalanche-CLI

This page demonstrates how to upload a Custom VM into Cloud-Based Validators using Avalanche-CLI

:::info
Currently, only Fuji network is supported.
:::

:::warning

ALPHA WARNING: This command is currently in experimental mode. Proceed at your own risk.

:::

## Prerequisites

Before we begin, you will need to have been:

- Created a Cloud Server node as described [here](/docs/tooling/cli-guides/create-a-validator.md)
- Developed/Customized a VM, as described [here](/docs/build/vm/intro.md).

Currently, we only support AWS cloud services, but we plan to add support for more cloud 
services in the near future.

## Example VM to be Used in This Tutorial

We will be uploading the [TokenVM](https://github.com/ava-labs/hypersdk/tree/main/examples/tokenvm)
example of HyperSDK. 

### Source Code

The following setting will be used:

- Repo url: `https://github.com/ava-labs/hypersdk/`
- Branch Name: `main`
- Build Script: examples/tokenvm/scripts/build.sh

:::note

CLI needs a public repo url in order to be able to download and install the custom VM on cloud.

### Local Build Stage

A locally compiled binary is needed to first set the CLI Subnet. You can create it by locally
cloning HyperSDK, changing to the desired branch and then executing the build script. Eg:

```bash
git clone https://github.com/ava-labs/hypersdk
cd hypersdk
git checkout main
./examples/tokenvm/scripts/build.sh <vmBinaryPath>
```

### Blockchain Configuration Files

CLI supports uploading the full set of configuration files for a blockchain. The following example
uses all of them, but the user can decide to provide a subset of those.

Genesis will be saved into `<genesisPath>`:

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

Blockchain configuration into `<chainConfPath>`:

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

Avalanche Subnet configuration will be saved into `<subnetConfPath>`:

```json
{
  "proposerMinBlockDelay": 0,
  "proposerNumHistoricalBlocks": 768
}
```

Network upgrades into `<networkUpgradesPath>`:

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
  "stateSyncServerDelay": 1
}
```

Finally, AvalancheGo flags required by the VM will be saved into `<avagoFlagsPath>`:

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

## Create the CLI Subnet

Let's create a CLI Subnet called `<subnetName>`, with custom VM binary and genesis.

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

## Deploy the CLI Subnet to Fuji

This step is going to create a Subnet and a Blockchain inside Fuji. It 
requires you to set up a key to be able to pay for the Fuji Fees,
as described [here](/docs/build/subnet/deploy/fuji-testnet-subnet.md).
Let's assume you have a key `<keyName>` with enough funds.

Execute:

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

Use stored key:

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

The Subnet + blockchain should now be created:

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

### AvalancheGo Flags

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

Finally choose no:

```text
Use the arrow keys to navigate: ↓ ↑ → ← 
? Would you like to provide the chain.json file as well?: 
  ▸ No
    Yes
File ~/.avalanche-cli/subnets/subnetName/node-config.json successfully written
```

### Blockchain config

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
✗ Enter the path to your configuration file: <chainConfPath>
```

Finally choose no:

```text
Use the arrow keys to navigate: ↓ ↑ → ← 
? Would you like to provide the subnet.json file as well?: 
  ▸ No
    Yes
File ~/.avalanche-cli/subnets/subnetName/chain.json successfully written
```

### Subnet config

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
✗ Enter the path to your configuration file: <subnetConfPath>
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

```shell
avalanche subnet upgrade import subnetName
```

Provide the path to the network upgrades file:

```text
✗ Provide the path to the upgrade file to import: <networkUpgradesPath>
```

## Upload the Custom VM to your Cloud Nodes

Let's assume your validators belong to the cluster `<clusterName>`

We will ask the validators to start tracking the Subnet `<subnetName>`. In order to do that,
they will also need to get and compile the custom VM.

```shell
avalanche node sync clusterName subnetName

Checking if node(s) in cluster newCluster are bootstrapped to Primary Network ...
Checking compatibility of avalanche go version in cluster newCluster with Subnet EVM RPC of subnet subnetName ...
Installing Custom VM build environment on the EC2 instance(s) ...

PLAY [all] *********************************************************************

TASK [Gathering Facts] *********************************************************
ok: [aws-node]

TASK [install gcc] *************************************************************
changed: [aws-node]

TASK [install go] **************************************************************
changed: [aws-node]

TASK [install rust] ************************************************************
changed: [aws-node]

PLAY RECAP *********************************************************************
aws-node                   : ok=4    changed=3    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0   

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

PLAY [aws-node] ****************************************************************

TASK [Gathering Facts] *********************************************************
ok: [aws-node]

TASK [copy exported subnet VM spec to cloud server] ****************************
changed: [aws-node]

PLAY RECAP *********************************************************************
aws-node                   : ok=2    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0   


PLAY [aws-node] ****************************************************************

TASK [Gathering Facts] *********************************************************
ok: [aws-node]

TASK [import subnet] ***********************************************************
changed: [aws-node]

TASK [avalanche join subnet] ***************************************************
changed: [aws-node]

TASK [restart node - restart avalanchego] **************************************
changed: [aws-node]

PLAY RECAP *********************************************************************
aws-node                   : ok=4    changed=3    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0   

Node(s) successfully started syncing with Subnet!
```

Your full customized VM is ready to go!

You can also take advantage of `avalanche node update subnet <subnetName>` to reinstall the binary
when the branch is updated, or update the config files.

