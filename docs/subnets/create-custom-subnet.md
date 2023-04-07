# Create a Subnet with a Custom Virtual Machine

Avalanche-CLI is capable of doing much than just deploying prebuilt EVM Subnets. This tutorial walks
you through the process of creating a Subnet with a custom virtual machine and deploying it locally.
Although the tutorial uses a fork of Subnet-EVM as an example, you can extend its lessons to support
any custom VM binary.

## Fork Subnet-EVM

Instead of building a custom VM from scratch, this tutorial starts with forking Subnet-EVM.

### Clone Subnet-EVM

First off, clone the Subnet-EVM repository into a directory of your choosing.

```shell
git clone git@github.com:ava-labs/subnet-evm.git
```

### Modify Subnet-EVM

To prove you're running your custom binary and not the stock Subnet-EVM included with Avalanche-CLI,
you need to modify the Subnet-EVM binary by making a minor change. Navigate to the directory you
cloned Subnet-EVM into and open `./scripts/versions.sh` in a text editor.

The file should look something like this:

```bash
#!/usr/bin/env bash

# Set up the versions to be used
subnet_evm_version=${SUBNET_EVM_VERSION:-'v0.4.4'}
# Don't export them as they're used in the context of other calls
avalanche_version=${AVALANCHE_VERSION:-'v1.9.3'}
network_runner_version=${NETWORK_RUNNER_VERSION:-'35be10cd3867a94fbe960a1c14a455f179de60d9'}
ginkgo_version=${GINKGO_VERSION:-'v2.2.0'}

# This won't be used, but it's here to make code syncs easier
latest_coreth_version=0.11.3
```

Modify the file by setting a custom version. This tutorial uses `v6.6.6`, but the actual version you
choose doesn't matter.

Replace the fourth line in the file to be:

```bash
subnet_evm_version="v6.6.6"
```

Now build your custom binary by running

```shell
./scripts/build.sh custom_evm.bin
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
        },
        "homesteadBlock": 0,
        "eip150Block": 0,
        "eip150Hash": "0x2086799aeebeae135c246c65021c82b4e15a2c451340993aacfd2751886514f0",
        "eip155Block": 0,
        "eip158Block": 0,
        "byzantiumBlock": 0,
        "constantinopleBlock": 0,
        "petersburgBlock": 0,
        "istanbulBlock": 0,
        "muirGlacierBlock": 0,
        "subnetEVMTimestamp": 0
    },
    "nonce": "0x0",
    "timestamp": "0x0",
    "extraData": "0x",
    "gasLimit": "0x7a1200",
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

Open a text editor and copy the preceding text into a file called `custom_genesis.json`.

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
created [previously](#modify-subnet-evm).

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
Backend controller started, pid: 95803, output at: /Users/connor/.avalanche-cli/runs/server_20221206_174845/avalanche-cli-backend
Installing avalanchego-v1.9.3...
avalanchego-v1.9.3 installation successful
VMs ready.
Starting network...
.........
Blockchain has been deployed. Wait until network acknowledges...
.
Network ready to use. Local network node endpoints:
+-------+----------------+-------------------------------------------------------------------------------------+
| NODE  |       VM       |                                         URL                                         |
+-------+----------------+-------------------------------------------------------------------------------------+
| node1 | myCustomSubnet | http://127.0.0.1:9650/ext/bc/2eVmtiGvE4A9AEPwvqEWT4reCASPziNZA27goXMRqQ25Y6oaYm/rpc |
+-------+----------------+-------------------------------------------------------------------------------------+
| node2 | myCustomSubnet | http://127.0.0.1:9652/ext/bc/2eVmtiGvE4A9AEPwvqEWT4reCASPziNZA27goXMRqQ25Y6oaYm/rpc |
+-------+----------------+-------------------------------------------------------------------------------------+
| node3 | myCustomSubnet | http://127.0.0.1:9654/ext/bc/2eVmtiGvE4A9AEPwvqEWT4reCASPziNZA27goXMRqQ25Y6oaYm/rpc |
+-------+----------------+-------------------------------------------------------------------------------------+
| node4 | myCustomSubnet | http://127.0.0.1:9656/ext/bc/2eVmtiGvE4A9AEPwvqEWT4reCASPziNZA27goXMRqQ25Y6oaYm/rpc |
+-------+----------------+-------------------------------------------------------------------------------------+
| node5 | myCustomSubnet | http://127.0.0.1:9658/ext/bc/2eVmtiGvE4A9AEPwvqEWT4reCASPziNZA27goXMRqQ25Y6oaYm/rpc |
+-------+----------------+-------------------------------------------------------------------------------------+

Browser Extension connection details (any node URL from above works):
RPC URL:          http://127.0.0.1:9650/ext/bc/2eVmtiGvE4A9AEPwvqEWT4reCASPziNZA27goXMRqQ25Y6oaYm/rpc
```

<!-- markdownlint-enable MD013 -->

You can use the `RPC URL` to connect to and interact with your Subnet.

## Interact with Your Subnet

### Check the Version

You can verify that your Subnet has deployed correctly by querying the local node to see what
Subnets it's running. You need to use the
[`getNodeVersion`](/apis/avalanchego/apis/info#infogetnodeversion) endpoint. Try running this curl
command:

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
    "version": "avalanche/1.9.3",
    "databaseVersion": "v1.4.5",
    "rpcProtocolVersion": "19",
    "gitCommit": "51c5edd85ccc7927443b945b427e64d91ff99f67",
    "vmVersions": {
      "avm": "v1.9.3",
      "evm": "v0.11.3",
      "platform": "v1.9.3",
      "qDMnZ895HKpRXA2wEvujJew8nNFEkvcrH5frCR9T1Suk1sREe": "v6.6.6@e3cbd01f63209b24e8e024e20cb4c17d37f26855"
    }
  },
  "id": 1
}
```

Your results may be slightly different, but you can see that in addition to the X-Chain's
`avm`, the C-Chain's `evm`, and the P-Chains' `platform` VM, the node is running the custom VM with
version `v6.6.6`.

### Check a Balance

If you used the default genesis, your custom VM has a prefunded address. You can verify its balance
with a curl command. Make sure to substitute the command's URL with the `RPC URL` from your
deployment output.

<!-- markdownlint-disable MD013 -->

```shell
curl --location --request POST 'http://127.0.0.1:9650/ext/bc/2eVmtiGvE4A9AEPwvqEWT4reCASPziNZA27goXMRqQ25Y6oaYm/rpc' \
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
