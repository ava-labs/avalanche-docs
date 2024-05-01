---
tags: [Build, Subnets]
description: This tutorial demonstrates the process of creating a Subnet with a custom virtual machine and deploying it locally.
sidebar_label: With a Custom Virtual Machine
pagination_label: Deploy a Subnet with Multisig Authorization
sidebar_position: 5
---

# Create a Subnet with a Custom Virtual Machine

This tutorial walks through the process of creating a Subnet with a custom virtual machine and
deploying it locally.
Although the tutorial uses a fork of Subnet-EVM as an example, you can extend its lessons to support
any custom VM binary.

## Fork Subnet-EVM

Instead of building a custom VM from scratch, this tutorial starts with forking Subnet-EVM.

### Clone Subnet-EVM

First off, clone the Subnet-EVM repository into a directory of your choosing.

```shell
git clone https://github.com/ava-labs/subnet-evm.git
```

:::info
The repository cloning method used is HTTPS, but SSH can be used too:

`git clone git@github.com:ava-labs/subnet-evm.git`

You can find more about SSH and how to use it
[here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/about-ssh).
:::

### Modify and Build Subnet-EVM

To prove you're running your custom binary and not the stock Subnet-EVM included with
Avalanche-CLI, you need to modify the Subnet-EVM binary by making a minor change.

Navigate to the directory you cloned Subnet-EVM into and generate a new commit:

```shell
git commit -a --allow-empty -m "custom vm commit"
```

Take note of the new commit hash:

```shell
git rev-parse HEAD
c0fe6506a40da466285f37dd0d3c044f494cce32
```

In this case, `c0fe6506a40da466285f37dd0d3c044f494cce32`.

Now build your custom binary by running

```shell
./scripts/build.sh custom_vm.bin
```

This command builds the binary and saves it at `./custom_vm.bin`.

### Create a Custom Genesis

To start a VM, you need to provide a genesis file. Here is a basic Subnet-EVM genesis that's
compatible with your custom VM.

```json
{
  "config": {
    "chainId": 12345,
    "feeConfig": {
      "gasLimit": 15000000,
      "targetBlockRate": 2,
      "minBaseFee": 25000000000,
      "targetGas": 15000000,
      "baseFeeChangeDenominator": 36,
      "minBlockGasCost": 0,
      "maxBlockGasCost": 1000000,
      "blockGasCostStep": 200000
    }
  },
  "nonce": "0x0",
  "timestamp": "0x66321C34",
  "extraData": "0x",
  "gasLimit": "0xe4e1c0",
  "difficulty": "0x0",
  "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "coinbase": "0x0000000000000000000000000000000000000000",
  "alloc": {
    "8db97c7cece249c2b98bdc0226cc4c2a57bf52fc": {
      "balance": "0xd3c21bcecceda1000000"
    }
  },
  "airdropHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "airdropAmount": null,
  "number": "0x0",
  "gasUsed": "0x0",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "baseFeePerGas": null
}
```

Open a text editor and copy the preceding text into a file called `custom_genesis.json`. For full breakdown of the genesis file, see the
[Genesis File](/build/subnet/upgrade/customize-a-subnet.md#genesis).

:::note

The `timestamp` field is the Unix timestamp of the genesis block. `0x66321C34` represents
the timestamp 1714560052 which is the time this tutorial was written. You should use the
timestamp when you create your genesis file.

:::

## Create the Subnet Configuration

Now that you have your binary, it's time to create the Subnet configuration. This tutorial uses
`myCustomSubnet` as it Subnet name. Invoke the Subnet Creation Wizard with this command:

```shell
avalanche subnet create myCustomSubnet
```

### Choose Your VM

Select `Custom` for your VM.

```shell
Use the arrow keys to navigate: ↓ ↑ → ←
? Choose your VM:
    Subnet-EVM
  ▸ Custom
```

### Enter the Path to Your Genesis

Enter the path to the genesis file you created in this [step](#create-a-custom-genesis).

```shell
✔ Enter path to custom genesis: ./custom_genesis.json
```

### Enter the Path to Your VM Binary

Next, enter the path to your VM binary. This should be the path to the `custom_evm.bin` you
created [previously](#modify-and-build-subnet-evm).

```shell
✔ Enter path to vm binary: ./custom_vm.bin
```

### Wrapping Up

If all worked successfully, the command prints `Successfully created Subnet configuration`.

Now it's time to deploy it.

## Deploy the Subnet Locally

To deploy your Subnet, run

`avalanche subnet deploy myCustomSubnet`

Make sure to substitute the name of your Subnet if you used a different one than `myCustomSubnet`.

Next, select `Local Network`.

```text
Use the arrow keys to navigate: ↓ ↑ → ←
? Choose a network to deploy on:
  ▸ Local Network
    Fuji
    Mainnet
```

This command boots a five node Avalanche network on your machine. It needs to download the latest
versions of AvalancheGo and Subnet-EVM. The command may take a couple minutes to run.

If all works as expected, the command output should look something like this:

<!-- markdownlint-disable MD013 -->

```text
> avalanche subnet deploy myCustomSubnet
✔ Local Network
Deploying [myCustomSubnet] to Local Network
Backend controller started, pid: 26110, output at: /home/fm/.avalanche-cli/runs/server_20230816_131014/avalanche-cli-backend.log
Installing avalanchego-v1.10.8...
avalanchego-v1.10.8 installation successful
Node log path: /home/fm/.avalanche-cli/runs/network_20230816_131608/node<i>/logs
Starting network...
VMs ready.

Blockchain has been deployed. Wait until network acknowledges...

Network ready to use. Local network node endpoints:
+-------+----------------+------------------------------------------------------------------------------------+-------------------------------------------------+
| NODE  |       VM       |                                        URL                                         |                    ALIAS URL                    |
+-------+----------------+------------------------------------------------------------------------------------+-------------------------------------------------+
| node1 | myCustomSubnet | http://127.0.0.1:9650/ext/bc/z9a7L6XmFYskbaHuuLFCxThByKg4xqsYYbaqT5ke6xVutDQTp/rpc | http://127.0.0.1:9650/ext/bc/myCustomSubnet/rpc |
+-------+----------------+------------------------------------------------------------------------------------+-------------------------------------------------+
| node2 | myCustomSubnet | http://127.0.0.1:9652/ext/bc/z9a7L6XmFYskbaHuuLFCxThByKg4xqsYYbaqT5ke6xVutDQTp/rpc | http://127.0.0.1:9652/ext/bc/myCustomSubnet/rpc |
+-------+----------------+------------------------------------------------------------------------------------+-------------------------------------------------+
| node3 | myCustomSubnet | http://127.0.0.1:9654/ext/bc/z9a7L6XmFYskbaHuuLFCxThByKg4xqsYYbaqT5ke6xVutDQTp/rpc | http://127.0.0.1:9654/ext/bc/myCustomSubnet/rpc |
+-------+----------------+------------------------------------------------------------------------------------+-------------------------------------------------+
| node4 | myCustomSubnet | http://127.0.0.1:9656/ext/bc/z9a7L6XmFYskbaHuuLFCxThByKg4xqsYYbaqT5ke6xVutDQTp/rpc | http://127.0.0.1:9656/ext/bc/myCustomSubnet/rpc |
+-------+----------------+------------------------------------------------------------------------------------+-------------------------------------------------+
| node5 | myCustomSubnet | http://127.0.0.1:9658/ext/bc/z9a7L6XmFYskbaHuuLFCxThByKg4xqsYYbaqT5ke6xVutDQTp/rpc | http://127.0.0.1:9658/ext/bc/myCustomSubnet/rpc |
+-------+----------------+------------------------------------------------------------------------------------+-------------------------------------------------+

Browser Extension connection details (any node URL from above works):
RPC URL:          http://127.0.0.1:9650/ext/bc/z9a7L6XmFYskbaHuuLFCxThByKg4xqsYYbaqT5ke6xVutDQTp/rpc
```

<!-- markdownlint-enable MD013 -->

You can use the `RPC URL` to connect to and interact with your Subnet.

## Interact with Your Subnet

### Check the Version

You can verify that your Subnet has deployed correctly by querying the local node to see what
Subnets it's running. You need to use the
[`getNodeVersion`](/reference/avalanchego/info-api.md#infogetnodeversion) endpoint. Try running this
curl command:

```shell
curl --location --request POST 'http://127.0.0.1:9650/ext/info' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeVersion",
    "params" :{
    }
}'
```

The command returns a list of all the VMs your local node is currently running along with their versions.

```json
{
  "jsonrpc": "2.0",
  "result": {
    "version": "avalanche/1.10.8",
    "databaseVersion": "v1.4.5",
    "rpcProtocolVersion": "27",
    "gitCommit": "e70a17d9d988b5067f3ef5c4a057f15ae1271ac4",
    "vmVersions": {
      "avm": "v1.10.8",
      "evm": "v0.12.5",
      "platform": "v1.10.8",
      "qDMnZ895HKpRXA2wEvujJew8nNFEkvcrH5frCR9T1Suk1sREe": "v0.5.4@c0fe6506a40da466285f37dd0d3c044f494cce32"
    }
  },
  "id": 1
}
```

Your results may be slightly different, but you can see that in addition to the X-Chain's
`avm`, the C-Chain's `evm`, and the P-Chain's `platform` VM, the node is running the custom VM with
commit `c0fe6506a40da466285f37dd0d3c044f494cce32`.

### Check a Balance

If you used the default genesis, your custom VM has a prefunded address. You can verify its balance
with a curl command. Make sure to substitute the command's URL with the `RPC URL` from your
deployment output.

<!-- markdownlint-disable MD013 -->

```shell
curl --location --request POST 'http://127.0.0.1:9650/ext/bc/myCustomSubnet/rpc' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "eth_getBalance",
    "params": [
        "0x8db97c7cece249c2b98bdc0226cc4c2a57bf52fc",
        "latest"
    ],
    "id": 1
}'
```

<!-- markdownlint-enable MD013 -->

The command should return

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0xd3c21bcecceda1000000"
}
```

The balance is hex encoded, so this means the address has a balance of 1 million tokens.

Note, this command doesn't work on all custom VMs, only VMs that implement the EVM's
`eth_getBalance` interface.

## Next Steps

You've now unlocked the ability to deploy custom VMs. Go build something cool!
