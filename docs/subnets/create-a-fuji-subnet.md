# Create an EVM Subnet on Fuji Testnet

After trying out a subnet on a local box by following [this tutorial](./create-a-local-subnet.md), next step is to try it out on Fuji Testnet. 

:::warning

All IDs in this article are for illustration purpose. They can be different in your own run-through of this tutorial.

:::


## Prerequisites

- 1+ nodes running on Fuji Testnet (does not need to be a validator)
- [`subnet-cli`](https://github.com/ava-labs/subnet-cli) installed
- `subnet-cli` private key with some Fuji AVAX

### Fuji Testnet

For this tutorial, we recommend that you follow [Run an Avalanche Node Manually](../nodes/build/run-avalanche-node-manually.md#connect-to-fuji-testnet) and this step particularly to start your node on Fuji:

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

This creates a file `.subnet-cli.pk` under the current directory with a private key. By default, 
`subnet-cli` uses the key specified in file `.subnet-cli.pk` on the P-Chain to pay for the transaction fee, unless `--private-key-path` is used to overwrite. Please make sure that you have enough fund on this P-Chain address to pay for transactions. 

To get fund on this key on Fuji TestNet, follow these steps:

1. User your private key in the `.subnet-cli.pk` file on the [web wallet](https://wallet.avax.network) to access this wallet. (Private Key is the first option on the [web wallet](https://wallet.avax.network)). And pick **Fuji** on the top right corner as the network.
2. Request funds from the [faucet](https://faucet.avax-test.network).
3. Move the test funds (faucet sends avax token on either the X or C-Chain) to the P-Chain ([tutorial between X/P chains](../quickstart/transfer-avax-between-x-chain-and-p-chain.md) or [tutorial between C/P chains](../quickstart/transfer-avax-between-p-chain-and-c-chain.md)).    

After following these 3 steps, your test key should now have a balance on the P-Chain on Fuji Testnet.

Check [here](./subnet-cli.md#subnet-cli-create-key) for more info.

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
|_avalanchego (note: this is the AvalancheGo binary, not a directory)
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
add validators, create subnets, and create blockchains. Documentation of subnet-cli can be found [here](./subnet-cli.md).


:::info
The `subnet-cli` DOES NOT need to be run on the same host where you are
running your validator. By default, it interfaces exclusively with the public
Avalanche API Endpoints.

:::

To make it as easy as possible to get started, the `subnet-cli` also provides
a `wizard` command that takes care of EVERYTHING for you. TL;DR, type one
command and you'll have a subnet with a running `subnet-evm` instance 5 minutes
later.

Run the following command to:
* Add `NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD` (which was created [above](#fuji-testnet)) as a validator to the primary network (comma separated if multiple validators, and skipping any that already exist);
* Create a subnet;
* Add `NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD` to the subnet;
* Create a new blockhain with a virtual machine whose id is `srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy` 

```bash
subnet-cli wizard \
--node-ids=NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD \
--vm-genesis-path=networks/11111/genesis.json \
--vm-id=srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy \
--chain-name=subnetevm
```

By default, the private key in `.subnet-cli.pk` file which was created from [the step above](#subnet-cli-private-key) is used to pay the cost of this transaction. 
You can use `--private-key-path` to specify a different file.

As mentioned before, the `vm-id` was generated by calling `subnet-cli create VMID subnetevm`. You can
use any value here, the only important thing is to make sure the binary you have generated has the same name.

:::info

You can find an example of a genesis file to use when launching your own
`subnet-evm` in the [networks folder](https://github.com/ava-labs/subnet-evm/blob/master/networks/11111/genesis.json).

:::

As part of the return of `subnet-cli wizard`, a `Subnet ID` value will be returned which will be needed in next step. See [here](./subnet-cli.md#subnet-cli-wizard) for more detailed logs.

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

## Next Step

Next step is to deploy the subnet on to the Mainnet, see [this](./setup-dfk-node.md) using DeFi Kingdoms Subnet as an example.


## Appendix

### Create the Genesis Data

Each blockchain has some genesis state when it’s created. Each VM defines the format and semantics of its genesis data.


The default Subnet EVM provided below has some well defined parameters. The default Subnet EVM genesis looks like:

```json
{
  "config": {
    "chainId": 43214,
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
    "subnetEVMTimestamp": 0,
    "feeConfig": {
      "gasLimit": 8000000,
      "minBaseFee": 25000000000,
      "targetGas": 15000000,
      "baseFeeChangeDenominator": 36,
      "minBlockGasCost": 0,
      "maxBlockGasCost": 1000000,
      "targetBlockRate": 2,
      "blockGasCostStep": 200000
    },
    "allowFeeRecipients": false
  },
  "alloc": {
    "8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC": {
      "balance": "0x295BE96E64066972000000"
    }
  },
  "nonce": "0x0",
  "timestamp": "0x0",
  "extraData": "0x00",
  "gasLimit": "0x7A1200",
  "difficulty": "0x0",
  "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "coinbase": "0x0000000000000000000000000000000000000000",
  "number": "0x0",
  "gasUsed": "0x0",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
}
```

#### Chain Config

`chainID`: Denotes the chainID of to be created chain. Must be picked carefully since a conflict with other chains can cause issues.

##### Hardforks

`homesteadBlock`, `eip150Block`, `eip150Hash`, `eip155Block`, `byzantiumBlock`, `constantinopleBlock`, `petersburgBlock`, `istanbulBlock`, `muirGlacierBlock`, `subnetEVMTimestamp` are hardfork activation times. Changing these may cause issues, so treat them carefully.

##### Fee Config

`gasLimit`: Gas limit of blocks.

`minBaseFee`: Minimum base fee of transactions. It is also the initial base fee for EIP-1559 blocks.

`targetGas`: The target gas consumption of blocks. If the network starts producing blocks with gas cost higher than this, base fees are increased accordingly.

`baseFeeChangeDenominator`: The amount the base fee can change between blocks.

`minBlockGasCost`: Minimum gas cost a block should cover.

`maxBlockGasCost`: Maximum gas cost a block should cover.

`targetBlockRate`: The targeted block rate that network should produce blocks. If the network starts producing faster than this, base fees are increased accordingly.

`blockGasCostStep`: The block gas cost change step between blocks.

##### Custom Fee Recipients

`allowFeeRecipients`: Enables fee recipients. By default, all fees are burned (sent to the blackhole address). However, it is possible to enable block producers to set a fee recipient (get compensated for blocks they produce).

With this enabled, your validators can specify their addresses to collect fees. They need to update their AvalancheGo [chain config](../nodes/maintain/chain-config-flags.md#c-chain-configs) with the following:

```json
{
  "feeRecipient": "<YOUR 0x-ADDRESS>"
}
```

For example if the created chain ID is `zZtgbGDPpJaz7zWL6cXi1sSJRW1sMQH4s119GURVYGPXkrUaE` then you should put that configuration under `~/.avalanchego/configs/chains/zZtgbGDPpJaz7zWL6cXi1sSJRW1sMQH4s119GURVYGPXkrUaE/config.json`. Note that the chain ID part (`zZtgbGDPpJaz7zWL6cXi1sSJRW1sMQH4s119GURVYGPXkrUaE`) can be different when you create your own chain.

Note: If you enable this feature but a validator doesn't specify a "feeRecipient", the fees will be burned in blocks they produce.

#### Alloc

Alloc defines addresses and their initial balances. This should be changed accordingly for each chain. The `alloc` field expects key-value pairs. Keys of each entry must be a valid `address`. The `balance` field in the value can be either a `hexadecimal` or `number` to indicate initial balance of the address. The default value contains `8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC` with `50000000000000000000000000` balance in it. Default:

```json
  "alloc": {
    "8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC": {
      "balance": "0x295BE96E64066972000000"
    }
  }
```

#### Header

The fields `nonce`, `timestamp`, `extraData`, `gasLimit`, `difficulty`, `mixHash`, `coinbase`, `number`, `gasUsed`, `parentHash` defines the genesis block header. The field `gasLimit` should be set to match the `gasLimit` set in the `feeConfig`. You do not need to change any of the other genesis header fields.

### Build Genesis

The Subnet EVM has a static API method named `buildGenesis` that takes in a JSON representation of a blockchain’s genesis state and returns the byte representation of that state. You should provide `buildGenesis` a full genesis like below, even if you don't intend to alter default values.

Remind that our VM ID was `srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy`. Calls will be made to `/ext/vm/srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy/rpc`:

To create the byte representation of this genesis state, call `subnetevm.buildGenesis`.

```sh
curl -X POST --data '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "subnetevm.buildGenesis",
  "params": {
    "genesisData": {
      "config": {
        "chainID": 13213,
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
        "subnetEVMTimestamp": 0,
        "feeConfig": {
          "gasLimit": 8000000,
          "targetBlockRate": 2,
          "minBaseFee": 13000000000,
          "targetGas": 15000000,
          "baseFeeChangeDenominator": 36,
          "minBlockGasCost": 0,
          "maxBlockGasCost": 1000000,
          "blockGasCostStep": 200000
        },
        "allowFeeRecipients": false
      },
      "alloc": {
        "8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC": {
          "balance": "333333333333333333333"
        }
      },
      "timestamp": "0x0",
      "gasLimit": "0x7A1200",
      "difficulty": "0x0",
      "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "coinbase": "0x0000000000000000000000000000000000000000",
      "number": "0x0",
      "gasUsed": "0x0",
      "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
    }
  }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/vm/srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy/rpc
```

This returns the byte representation of your blockchain’s genesis state:

```json
{
  "jsonrpc": "2.0",
  "result": {
    "genesisBytes": "FT1GtzvmB3sw5wm2qHXtxy7zXWSzxnoj5vNzu6XCqBCBry2d7MVhYfHg9LJkSpALjPpWKUK3wCGfr5syszjDkLSpEccQXNLvnvhrPTRjyBPdikKLLxqJFqrHpHcxVh3dnoxxP8DAp6h6Vvu4Y4xWU6SH9d5UfR8AHkQfaXLZGNgpj8EdtBALpyyS6KD5UY6W8MeYTfmtH5DW5hrsKZLe8oWEc62wEWNesruy6rtLjQ4He5wLh1Tq81PTdN4KJEmnrS68uYeZexPNZ6avxTDNWFLAqNVaMxuC1uuwzf366SxZsZjsm4t3MBwzSYiCQPYo7ruxXeN9xoqcZT2MoP1TTSTdeweFHdq1w9HT7RGdS2MzgJKy8YeU6enUXtWqcDtQ3BNb3Q6Bh11vdqPMoyRkWmFrcZTgc9jjaRx3XrRXY9wA4qCYRhjRYjKzSg5K463janpNkgvwH6eF4ev2xFcVFHFYqUVLpTEoigKesopASGkNf4v2HPQ1ZLvVofiEbfp5g9CfnKN2S7dkXvYbS2YdkjAo4G4M74uBRGpqrk4qJH6M1zqbFTZHnt6A1rsFBhnGEJFyw4Nimu5w6PTW9w3RLUFrnMejfscDLvN2ETGuXqX847Bd1Aw8NfMdqfvDfCjvAuX5se6BfTJYXMedDR6sWjjsEJGhiMLZpUfrgMzMtkZGVHqV5augcWPqHEjUXkLXEUCU8AcvdzNciRP9Q9s7ZzLqHauzdDc1ae2K9itGJVHXuyhqWk7xSGuZRusvutjxDDqfAngLHF5hqyku42ZaDtNYe7wSGyAdDt8a4VstuUd7LNmt2zHDescsAauEVZE6WjYSrc3dcmSQE5HV6zgEbqgSkEo5ZZMcb5xupT7GAyXn8opFH28kjTPgnnWZi6MNCdrvdMzgshwf3N5ecaJZh1vx9LSwUScw2jg8G6AF4bw7gBpB7t2P4EYd4LtMbNzQCS5Hexak7WEmdhcJ2s1Y2aYcs84F4QgHFy63FhfMxa3iDM252nHC4NPN2XMRd2cbzy59jBcMk99mderGstng25bsxyMhZFGQEnwbLZ4Xs3phCiwcAAo7wkNTyC7eWqmk7FNhGCovucBLgfjNLuUD4DMPEHMMrApknXQh132gp6uUvWbGFnoyDsamaB6L2sVAmo2cCg4Xk6tcNEm3KCdf8H4iXz1a7mbEzUcy9FmxGrhk1YppQryUXP97Nt2tQjd7GM2expSsxdTAyQFjoHeuGHbu6oNmdQLbFgprRd16hDeJJD9PxN79AQAojJQBU14LHN5vLEH5GoKDs7yoMa3iC7h",
    "encoding": "cb58"
  },
  "id": 1
}
```

You can also issue a `subnetevm.decodeBlock` to make sure your encoded genesis bytes are intact:

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "id"     : 1,
    "method" : "subnetevm.decodeGenesis",
    "params" : {
        "encoding": "cb58",
        "genesisBytes":"FT1GtzvmB3sw5wm2qHXtxy7zXWSzxnoj5vNzu6XCqBCBry2d7MVhYfHg9LJkSpALjPpWKUK3wCGfr5syszjDkLSpEccQXNLvnvhrPTRjyBPdikKLLxqJFqrHpHcxVh3dnoxxP8DAp6h6Vvu4Y4xWU6SH9d5UfR8AHkQfaXLZGNgpj8EdtBALpyyS6KD5UY6W8MeYTfmtH5DW5hrsKZLe8oWEc62wEWNesruy6rtLjQ4He5wLh1Tq81PTdN4KJEmnrS68uYeZexPNZ6avxTDNWFLAqNVaMxuC1uuwzf366SxZsZjsm4t3MBwzSYiCQPYo7ruxXeN9xoqcZT2MoP1TTSTdeweFHdq1w9HT7RGdS2MzgJKy8YeU6enUXtWqcDtQ3BNb3Q6Bh11vdqPMoyRkWmFrcZTgc9jjaRx3XrRXY9wA4qCYRhjRYjKzSg5K463janpNkgvwH6eF4ev2xFcVFHFYqUVLpTEoigKesopASGkNf4v2HPQ1ZLvVofiEbfp5g9CfnKN2S7dkXvYbS2YdkjAo4G4M74uBRGpqrk4qJH6M1zqbFTZHnt6A1rsFBhnGEJFyw4Nimu5w6PTW9w3RLUFrnMejfscDLvN2ETGuXqX847Bd1Aw8NfMdqfvDfCjvAuX5se6BfTJYXMedDR6sWjjsEJGhiMLZpUfrgMzMtkZGVHqV5augcWPqHEjUXkLXEUCU8AcvdzNciRP9Q9s7ZzLqHauzdDc1ae2K9itGJVHXuyhqWk7xSGuZRusvutjxDDqfAngLHF5hqyku42ZaDtNYe7wSGyAdDt8a4VstuUd7LNmt2zHDescsAauEVZE6WjYSrc3dcmSQE5HV6zgEbqgSkEo5ZZMcb5xupT7GAyXn8opFH28kjTPgnnWZi6MNCdrvdMzgshwf3N5ecaJZh1vx9LSwUScw2jg8G6AF4bw7gBpB7t2P4EYd4LtMbNzQCS5Hexak7WEmdhcJ2s1Y2aYcs84F4QgHFy63FhfMxa3iDM252nHC4NPN2XMRd2cbzy59jBcMk99mderGstng25bsxyMhZFGQEnwbLZ4Xs3phCiwcAAo7wkNTyC7eWqmk7FNhGCovucBLgfjNLuUD4DMPEHMMrApknXQh132gp6uUvWbGFnoyDsamaB6L2sVAmo2cCg4Xk6tcNEm3KCdf8H4iXz1a7mbEzUcy9FmxGrhk1YppQryUXP97Nt2tQjd7GM2expSsxdTAyQFjoHeuGHbu6oNmdQLbFgprRd16hDeJJD9PxN79AQAojJQBU14LHN5vLEH5GoKDs7yoMa3iC7h"}
}
' -H 'content-type:application/json;' 127.0.0.1:9650/ext/vm/srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy/rpc
```

This should return the same genesis block, provided in `subnetevm.buildGenesis` call. Order of fields can be different:

```json
{
  "jsonrpc": "2.0",
  "result": {
    "genesisData": {
      "config": {
        "chainId": 13213,
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
        "subnetEVMTimestamp": 0,
        "feeConfig": {
          "gasLimit": 8000000,
          "targetBlockRate": 2,
          "minBaseFee": 13000000000,
          "targetGas": 15000000,
          "baseFeeChangeDenominator": 36,
          "minBlockGasCost": 0,
          "maxBlockGasCost": 1000000,
          "blockGasCostStep": 200000
        }
      },
      "nonce": "0x0",
      "timestamp": "0x0",
      "extraData": "0x",
      "gasLimit": "0x7A1200",
      "difficulty": "0x0",
      "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "coinbase": "0x0000000000000000000000000000000000000000",
      "alloc": {
        "8db97c7cece249c2b98bdc0226cc4c2a57bf52fc": {
          "balance": "0x1211ede4974a355555"
        }
      },
      "number": "0x0",
      "gasUsed": "0x0",
      "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    "encoding": "cb58"
  },
  "id": 1
}
```

### Connect with Metamask

Subnet EVM supports almost every tool that C-Chain and EVM supports. For instance, let's connect Metamask with our Subnet EVM.

First we need to create a new network in Metamask. It can be added in Settings > Networks > Add a network.

`Network Name`: Any name to indicate this network.

`New RPC URL`: This must be the RPC URL of our node. In this case it is `http://127.0.0.1:9650/ext/bc/zZtgbGDPpJaz7zWL6cXi1sSJRW1sMQH4s119GURVYGPXkrUaE/rpc`

`Chain ID`: The Chain ID specified in genesis. In this case `13213`.

`Currency Symbol`: Any symbol for this token.

It should look like:
![Add Network](/img/sevm-m1.png)

Now we can access our account with initial balance. We used `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC` as our initial account. The private key of this account is `56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027`. This private key is publicly shared, so don't use this account in mainnet or testnets. The genesis block allocates 333,333,333,333,333,333,333 coins to this account, which is equivalent to `333.3333` SET.

Let's import this private key into Metamask.

- Click on Metamask.
- From "My Accounts" click on "Import Account":
  ![Import Account](/img/sevm-m2.png)

Now you can import your private key in this screen. When you pasted your private key, click on "Import". You should be able to see your account with some balances in it. For example:

![Account with Balance](/img/sevm-m3.png)

Now we can send funds to another account:

- Click on "Send" in your Metamask.
- Input an address or select "Transfer between my accounts"
- Select an address
- Input your amount. It should be look like this

![Account with Balance](/img/sevm-m4.png)

- Click on Next
- You can inspect your transaction in this screen:
  ![Account with Balance](/img/sevm-m5.png)

For example let's verify the base fee is indeed the configured one. Remind that in our genesis we specified `minBaseFee` as 13000000000 which is equivalent to 13 Gwei. Let's click "Edit" above on the "Estimated gas fee" section.

![Gas Fee](/img/sevm-m6.png)

- Click on "Save" in the "Edit priority" dialog when you're done.
- Now we can confirm our transaction. Click on "Confirm"
- After a while your transaction will be confirmed. When confirmed it should look like this:

![Confirmed](/img/sevm-m7.png)

You can inspect your confirmed transaction.

![Confirmed Inspect](/img/sevm-m8.png)

### Other Tools

You can use Subnet EVM just like you use C-Chain and EVM tools. Only differences are `chainID` and RPC URL. For example you can deploy your contracts with [hardhat quick starter](../dapps/smart-contracts/using-hardhat-with-the-avalanche-c-chain.md) by changing `url` and `chainId` in the `hardhat.config.ts`.
