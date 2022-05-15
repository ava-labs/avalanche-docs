# Fuji Testnet Deployment

After trying out a subnet on a local box by following [this tutorial](./create-a-local-subnet.md), next step is to try it out on Fuji Testnet. 

:::warning

All IDs in this article are for illustration purpose. They can be different in your own run-through of this tutorial.

:::



## Prerequisites

- 1+ nodes running on Fuji Testnet (does not need to be a validator)
- [`subnet-cli`](https://github.com/ava-labs/subnet-cli) installed
- `subnet-cli` private key with some Fuji AVAX

### Fuji Testnet

For this tutorial, we recommend that you follow [Run an Avalanche Node Manually](../nodes/build/run-avalanche-node-manually.md#connect-to-fuji-testnet) and this step particularly:

  _To connect to the Fuji Testnet instead of the main net, use argument `--network-id=fuji`_

To get the NodeID of this Fuji node, call the following curl command to [info.getNodeID](../apis/avalanchego/apis/info.md#infogetnodeid):

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

The response should look something like:

```json
{
    "jsonrpc": "2.0",
    "result": {
        "nodeID": "NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD"
    },
    "id": 1
}
```

That portion that says, `NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD` is ths NodeID, the entire thing. We will need this id in the later section when calling [subnet-cli wizard](#run-subnet-cli-wizard).

:::info

With more data on Fuji testnet, it may take a while to bootstrap Fuji Testnet from scratch. 

:::


### Subnet-cli

```bash
git clone https://github.com/ava-labs/subnet-cli.git;
cd subnet-cli;
go install -v .;
```

Once you have installed it, run `subnet-cli` on your console to confirm it is
working as expected (_make sure your $GOBIN is in your $PATH_):


### `Subnet-cli` Private Key 

```bash
subnet-cli create key
```

This creates a file `.subnet-cli.pk` under the current directory. 


`subnet-cli` will assume you have funds on this key (or `--private-key-path`) on the P-Chain for the
rest of this walkthrough.

The easiest way to do this (**for testing only**) is:

1. User your private key in the `.subnet-cli.pk` file on the [web wallet](https://wallet.avax.network) to access this wallet. (Private Key is the first option on the [web wallet](https://wallet.avax.network)).
2. Request funds from the [faucet](https://faucet.avax-test.network).
3. Move the test funds (faucet sends avax token on either the X or C-Chain) to the P-Chain ([tutorial between X/P chains](../quickstart/transfer-avax-between-x-chain-and-p-chain.md) or [tutorial between C/P chains](../quickstart/transfer-avax-between-p-chain-and-c-chain.md)).    

After following these 3 steps, your test key should now have a balance on the
P-Chain.



## Build Binary

First, you'll need to compile the subnet-evm into a binary that AvalancheGo
can interact with. To do this, first install [`subnet-evm`](https://github.com/ava-labs/subnet-evm)  (assumes you don't
yet have the `subnet-evm` repository downloaded):

```bash
git clone https://github.com/ava-labs/subnet-evm.git
cd subnet-evm
```

Create a VMID with string `subnetevm` which you can change to whatever you like. 
This command is used to generate a valid VMID based on some string to uniquely
identify a VM. This should stay the same for all versions of the VM, so it
should be based on a word rather than the hash of some code.

```bash
subnet-cli create VMID subnetevm
```
This will prints this output:
```bash
created a new VMID srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy from subnetevm
```

Now issue this command to build 
```bash
./scripts/build.sh build/srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy
```

## Move Binary

Once the `subnet-evm` binary is built, you'll need to move it to AvalancheGo's
plugin directory (within the [--build-dir](../nodes/maintain/avalanchego-config-flags.md#--build-dir-string)) so it can be run by your node.
When building `avalanchego` from source (see [Run an Avalanche Node Manually](../nodes/build/run-avalanche-node-manually.md#connect-to-fuji-testnet)), this defaults to `avalanchego/build/plugins` in which `avalanchego` 
is the directory where you have checked out AvalancheGo project.
This build directory is structured as:

```
build-dir
|_avalanchego
  |_build
    |_plugins
      |_evm
```

To put the `subnet-evm` binary in the right place, run the following command
(assuming the `avalanchego` and `subnet-evm` repos are in the same folder):

```bash
mv ./subnet-evm/build/srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy ./avalanchego/build/plugins;
```

## Run `subnet-cli wizard`

The easiest and fastest way to get your new subnet off the ground is to use the
[`subnet-cli`](https://github.com/ava-labs/subnet-cli). This powerful CLI can
add validators, create subnets, and create blockchains.

_The `subnet-cli` DOES NOT need to be run on the same host where you are
running your validator. By default, it interfaces exclusively with the public
Avalanche API Endpoints._

To make it as easy as possible to get started, the `subnet-cli` also provides
a `wizard` command that takes care of EVERYTHING for you. TL;DR, type one
command and you'll have a subnet with a running `subnet-evm` instance 5 minutes
later.

To make `NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD` (which was created [above](#fuji-testnet)) a validator, create a subnet, add `NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD` to the
subnet (comma separated with multiple validators), and create a `subnet-evm`-based blockhain, run the following command:

```bash
subnet-cli wizard \
--node-ids=NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD \
--vm-genesis-path=networks/11111/genesis.json \
--vm-id=srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy \
--chain-name=subnetevm
```

_As mentioned before, the `vm-id` was generated by calling `subnet-cli create VMID subnetevm`. You can
use any value here, the only important thing is to make sure the binary you
generate has the same name._

:::info

You can find an example of a genesis file to use when launching your own
`subnet-evm` in the [networks folder](https://github.com/ava-labs/subnet-evm/blob/master/networks/11111/genesis.json).

:::

As part of the return of `subnet-cli wizard`, a `Subnet ID` value will be returned which will be needed in next step. 

## Add New Subnet to Node Whitelist

During the execution of the `wizard` command, you will be prompted to add your
new subnetID to your node. This is done using the `whitelisted-subnets` config.
You can provide the `whitelisted-subnets` argument by modifying your config
file (reference [here](../nodes/maintain/avalanchego-config-flags.md#whitelist)) or providing an argument on startup.

Example Config File:

```json
{
  "network-id": "fuji",
  "health-check-frequency": "2s",
  "log-display-level": "INFO",
  "log-level": "INFO",
  "whitelisted-subnets": "p433wpuXyJiDhyazPYyZMJeaoPSW76CBZ2x7wrVPLgvokotXz"
}
```

Example Node Args:

```bash
--whitelisted-subnets=p433wpuXyJiDhyazPYyZMJeaoPSW76CBZ2x7wrVPLgvokotXz --network-id=fuji
```

Note: `p433wpuXyJiDhyazPYyZMJeaoPSW76CBZ2x7wrVPLgvokotXz` is an example of subnet-id, please replace it with your correct subnet-id.


## Restart Node

Once you've updated your config, you'll need to restart your AvalancheGo node for the changes to take effect.

If you completed the steps successfully, you'll see the node print out something like these (ignore the exact value of all ids, they are just for illustraction purpose):

```bash
INFO [01-25|16:47:04] chains/manager.go#246: creating chain:
    ID: 2AM3vsuLoJdGBGqX2ibE8RGEq4Lg7g4bot6BT1Z7B9dH5corUD
    VMID:sqja3uK17MJxfC7AN8nGadBw9JK5BcrsNwNynsqP5Gih8M5Bm
INFO [01-25|16:47:04] api/server/server.go#203: adding route /ext/bc/2JVSBoinj9C2J33VntvzYtVJNZdN2NKiwwKjcumHUWEb5DbBrm/events
INFO [01-25|16:47:04] api/server/server.go#203: adding route /ext/bc/2JVSBoinj9C2J33VntvzYtVJNZdN2NKiwwKjcumHUWEb5DbBrm
INFO [01-25|16:47:04] api/server/server.go#203: adding route /ext/bc/2JVSBoinj9C2J33VntvzYtVJNZdN2NKiwwKjcumHUWEb5DbBrm/wallet
INFO [01-25|16:47:04] <2AM3vsuLoJdGBGqX2ibE8RGEq4Lg7g4bot6BT1Z7B9dH5corUD Chain> snow/engine/snowman/transitive.go#67: initializing consensus engine
INFO [01-25|16:47:04] <2AM3vsuLoJdGBGqX2ibE8RGEq4Lg7g4bot6BT1Z7B9dH5corUD Chain> snow/engine/snowman/bootstrap/bootstrapper.go#225: Starting bootstrap...
INFO [01-25|16:47:04] <P Chain> snow/engine/snowman/bootstrap/bootstrapper.go#458: waiting for the remaining chains in this subnet to finish syncing
INFO [01-25|16:47:04] api/server/server.go#203: adding route /ext/bc/2AM3vsuLoJdGBGqX2ibE8RGEq4Lg7g4bot6BT1Z7B9dH5corUD/public
INFO [01-25|16:47:04] <2AM3vsuLoJdGBGqX2ibE8RGEq4Lg7g4bot6BT1Z7B9dH5corUD Chain> snow/engine/common/bootstrapper.go#235: Bootstrapping started syncing with 2 vertices in the accepted frontier
INFO [01-25|16:47:05] <2AM3vsuLoJdGBGqX2ibE8RGEq4Lg7g4bot6BT1Z7B9dH5corUD Chain> snow/engine/snowman/bootstrap/bootstrapper.go#419: bootstrapping fetched 69 blocks. Executing state transitions...
INFO [01-25|16:47:06] <2AM3vsuLoJdGBGqX2ibE8RGEq4Lg7g4bot6BT1Z7B9dH5corUD Chain> snow/engine/common/queue/jobs.go#181: executed 69 operations
INFO [01-25|16:47:06] <2AM3vsuLoJdGBGqX2ibE8RGEq4Lg7g4bot6BT1Z7B9dH5corUD Chain> snow/engine/snowman/transitive.go#354: bootstrapping finished with 2DUxceCx71L5TLTeLpKUQxSBVm8vTKPmFs2usAyRnusUzs4Q4M as the last accepted block
```

If you didn't put the `subnet-evm` binary in the right place, you'll see something
like:

```bash
INFO [01-26|05:54:19] chains/manager.go#246: creating chain:
    ID: 2AM3vsuLoJdGBGqX2ibE8RGEq4Lg7g4bot6BT1Z7B9dH5corUD
    VMID:sqja3uK17MJxfC7AN8nGadBw9JK5BcrsNwNynsqP5Gih8M5Bm
ERROR[01-26|05:54:19] chains/manager.go#270: error creating chain 2AM3vsuLoJdGBGqX2ibE8RGEq4Lg7g4bot6BT1Z7B9dH5corUD: error while looking up VM: there is no ID with alias sqja3uK17MJxfC7AN8nGadBw9JK5BcrsNwNynsqP5Gih8M5Bm
```
