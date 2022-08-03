# Create an EVM Subnet on Fuji Testnet Using Subnet-CLI

:::note

For the latest tool to deploy a Subnet on Fuji, please refer to [this article](./create-a-fuji-subnet.md). This artical is still applicable for Mainnet deploy with a Ledger.

:::

After trying out a Subnet on a local box by following [this tutorial](./create-a-local-subnet.md), next step is to try it out on Fuji Testnet.

In this article, we show how to do the following on Fuji Testnet.

- Create a virtual machine based on subnet-evm.
- Add a node as a validator to the primary network.
- Create a Subnet.
- Add the same node to the newly created Subnet.
- Create a blockchain with the specified virtual machine.

:::tip
The same steps can be applied on Mainnet, see [here](./subnet-cli.md#network-selection) on how to switch to Mainnet when using `subnet-cli`. Furthermore, you should practice using Ledger by following [this](./subnet-cli.md#ledger-support) before deploying on Mainnet.

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

That portion that says, `NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD` is ths NodeID, the entire thing. We will need this id in the later section when calling [subnet-cli wizard](#subnet-cli-wizard).

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

### Private Key

```bash
subnet-cli create key
```

This creates a file `.subnet-cli.pk` under the current directory with a private key. By default,
`subnet-cli` uses the key specified in file `.subnet-cli.pk` on the P-Chain to pay for the transaction fee, unless `--private-key-path` is used to overwrite. Please make sure that you have enough fund on this P-Chain address to pay for transactions.

To get fund on this key on Fuji TestNet, follow these steps:

1. User your private key in the `.subnet-cli.pk` file on the [web wallet](https://wallet.avax.network) to access this wallet. (Private Key is the first option on the [web wallet](https://wallet.avax.network)). And pick **Fuji** on the top right corner as the network and locate your C-Chain address which starts with `0x`.
2. Request funds from the [faucet](https://faucet.avax.network) using your C-Chain address.
3. Move the test funds from the C-Chain to the P-Chain by clicking on the `Cross Chain` on the left side of the web wallet (more details can be found on the [tutorial between C/P chains](../quickstart/cross-chain-transfers.md)).

After following these 3 steps, your test key should now have a balance on the P-Chain on Fuji Testnet.

Check [here](./subnet-cli.md#subnet-cli-create-key) for more info.

## Virtual Machine

Avalanche is a network composed of multiple blockchains. Each blockchain is an instance of a [Virtual Machine (VM)](../overview/getting-started/avalanche-platform.md#virtual-machines), much like an object in an object-oriented language is an instance of a class.
That is, the VM defines the behavior of the blockchain.

[Subnet-evm](https://github.com/ava-labs/subnet-evm) is the VM that defines the Subnet Contract Chains. Subnet-evm is a simplified version of [Avalanche C-Chain](https://github.com/ava-labs/coreth).

This chain implements the Ethereum Virtual Machine and supports Solidity smart contracts as well as most other Ethereum client functionality.

### Build Binary

First, you'll need to compile the subnet-evm into a binary that AvalancheGo can interact with. To do this, first install [`subnet-evm`](https://github.com/ava-labs/subnet-evm) (assumes you don't
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

### Move Binary

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

## Subnet-cli Wizard

The easiest and fastest way to get your new Subnet off the ground is to use the
[`subnet-cli`](https://github.com/ava-labs/subnet-cli). This powerful CLI can
add validators, create Subnets, and create blockchains. Documentation of subnet-cli can be found [here](./subnet-cli.md).

:::info
The `subnet-cli` DOES NOT need to be run on the same host where you are
running your validator. By default, it interfaces exclusively with the public
Avalanche API Endpoints.

:::

To make it as easy as possible to get started, the `subnet-cli` also provides
a `wizard` command that takes care of EVERYTHING for you. TL;DR, type one
command and you'll have a Subnet with a running `subnet-evm` instance a few minutes
later.

Run the following command to:

- Add `NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD` (which was created [above](#fuji-testnet)) as a validator to the primary network (comma separated if multiple validators, and skipping any that already exist);
- Create a Subnet;
- Add `NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD` to the Subnet;
- Create a new blockhain with a virtual machine whose id is `srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy`

```bash
subnet-cli wizard \
--node-ids=NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD \
--vm-genesis-path=my-genesis.json \
--vm-id=srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy \
--chain-name=subnetevm
```

By default, the private key in `.subnet-cli.pk` file which was created from [the step above](#subnet-cli-private-key) is used to pay the cost of this transaction.
You can use `--private-key-path` to specify a different file.

As mentioned before, the `vm-id` was generated by calling `subnet-cli create VMID subnetevm`. You can
use any value here, the only important thing is to make sure the binary you have generated has the same name.

:::info

You can find an example of a genesis file to use when launching your own
`subnet-evm` in the [networks folder](https://github.com/ava-labs/subnet-evm/blob/master/networks/11111/genesis.json). Note: please remove `airdropHash` and `airdropAmount` fields if you want to start with it.

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

:::tip
`p433wpuXyJiDhyazPYyZMJeaoPSW76CBZ2x7wrVPLgvokotXz` is an example of subnet-id, please replace it with your correct subnet-id.
:::

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

Next step is to deploy the Subnet on to the Mainnet, see [this](./setup-dfk-node.md) using DeFi Kingdoms Subnet as an example.

## Appendix

### Connect with Metamask

Subnet-evm supports almost every tool that C-Chain and EVM supports. For instance, let's connect Metamask with our subnet-evm.

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

You can use subnet-evm just like you use C-Chain and EVM tools. Only differences are `chainID` and RPC URL. For example you can follow this article to [Deploy a Smart Contract on Your Subnet EVM Using Remix and Metamask](./deploy-a-smart-contract-on-your-evm.md). Or you can deploy your contracts with [hardhat quick start guide](../dapps/smart-contracts/using-hardhat-with-the-avalanche-c-chain.md) by changing `url` and `chainId` in the `hardhat.config.ts`.
