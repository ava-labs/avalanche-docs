# Create an EVM Subnet on Fuji Testnet

:::note

This document has been updated using the new Avalanche-CLI to deploy a Subnet on Fuji. If you are looking for the previous version using Subnet-CLI, please click [here](./create-a-fuji-subnet-subnet-cli.md).

:::

After trying out a Subnet on a local box by following [this tutorial](./create-a-local-subnet.md), next step is to try it out on Fuji Testnet.

:::warning
Avalanche CLI does not provide Ledger support yet, please don't try this tutorial on the Mainnet.
:::

In this article, we show how to do the following on Fuji Testnet.

- Create a Subnet.
- Deploy a virtual machine based on Subnet-EVM.
- Add a node as a validator to the Subnet.
- Join a node to the newly created Subnet.

All IDs in this article are for illustration purpose. They can be different in your own run-through of this tutorial.

## Prerequisites

- 1+ nodes running and synced on Fuji Testnet
- [`Avalanche-CLI`](https://github.com/ava-labs/avalanche-cli) installed

## Virtual Machine

Avalanche is a network composed of multiple blockchains. Each blockchain is an instance of a [Virtual Machine (VM)](../overview/getting-started/avalanche-platform.md#virtual-machines), much like an object in an object-oriented language is an instance of a class.
That is, the VM defines the behavior of the blockchain.

[Subnet-EVM](https://github.com/ava-labs/subnet-evm) is the VM that defines the Subnet Contract Chains. Subnet-EVM is a simplified version of [Avalanche C-Chain](https://github.com/ava-labs/coreth).

This chain implements the Ethereum Virtual Machine and supports Solidity smart contracts as well as most other Ethereum client functionality.

## Fuji Testnet

For this tutorial, we recommend that you follow [Run an Avalanche Node Manually](../nodes/build/run-avalanche-node-manually.md#connect-to-Fuji-testnet) and this step particularly to start your node on Fuji:

_To connect to the Fuji Testnet instead of the main net, use argument `--network-id=Fuji`_

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

That portion that says, `NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD` is the NodeID, the entire thing. We will need this id in the later section when calling [addValidator](#add-a-validator).

:::info

With more data on Fuji testnet, it may take a while to bootstrap Fuji Testnet from scratch. You can use [State-Sync](../nodes/maintain/chain-config-flags.md#state-sync-enabled-boolean) to shorten the time for bootstrapping.

:::

## Avalanche-CLI

If not yet installed, install `Avalanche-CLI` following the tutorial at [Avalanche-CLI installation](create-a-local-subnet.md#installation)

### Private Key

All commands which issue a transaction require a private key loaded into the tool.
`Avalanche-CLI` supports the following key operations:

- create
- delete
- export
- list

:::warning

The private key created for this tutorial should only be used for testing operations on `Fuji` or other testnets. Do NOT use this key on `Mainnet`. The key will be stored on your file system. Whoever gets access to that key will have access to any funds secured by that private key. In a future release, `Avalanche-CLI` will integrate with Ledger and support `Mainnet` operations.

:::

Run `create` if you don't have any private key available yet. You can create multiple named keys. Each command requiring a key will therefore require the appropriate key name you want to use.

```bash
avalanche key create mytestkey
```

This will generate a new key named `mytestkey`. The command will then also print addresses associated with the key:

```bash
Generating new key...
Key created
+-----------+-------------------------------+-------------------------------------------------+---------------+
| KEY NAME  |             CHAIN             |                     ADDRESS                     |    NETWORK    |
+-----------+-------------------------------+-------------------------------------------------+---------------+
| mytestkey | C-Chain (Ethereum hex format) | 0x86BB07a534ADF43786ECA5Dd34A97e3F96927e4F      | All           |
+           +-------------------------------+-------------------------------------------------+---------------+
|           | P-Chain (Bech32 format)       | P-custom1a3azftqvygc4tlqsdvd82wks2u7nx85rg7v8ta | Local Network |
+           +                               +-------------------------------------------------+---------------+
|           |                               | P-fuji1a3azftqvygc4tlqsdvd82wks2u7nx85rhk6zqh   | Fuji          |
+-----------+-------------------------------+-------------------------------------------------+---------------+
```

The C-Chain address (`0x86BB07a534ADF43786ECA5Dd34A97e3F96927e4F`) is the one which can be used to fund your key from the [faucet](https://faucet.avax.network/).
The command also prints P-Chain addresses for both the default local network and `Fuji`. The latter (`P-fuji1a3azftqvygc4tlqsdvd82wks2u7nx85rhk6zqh`) is the one needed for this tutorial.

The `delete` command of course deletes a private key:

```bash
avalanche key delete mytestkey
```

Be careful though to always have a key available for commands involving transactions.

The `export` command will **print your private key** in hex format to STDOUT.

```bash
avalanche key export mytestkey
21940fbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb5f0b
```

(this key is intentionally modified).

You can also **import** a key by using the `--file` flag with a path argument and also providing a name to it:

```bash
avalanche key create othertest --file /tmp/test.pk
Loading user key...
Key loaded
```

Finally, the `list` command will list all your keys in your system and their associated addresses (the keys are stored in a special directory on your file system, tampering with the directory will result in malfunction of the tool).

```bash
avalanche key list
+-----------+-------------------------------+-------------------------------------------------+---------------+
| KEY NAME  |             CHAIN             |                     ADDRESS                     |    NETWORK    |
+-----------+-------------------------------+-------------------------------------------------+---------------+
| othertest | C-Chain (Ethereum hex format) | 0x36c83263e33f9e87BB98D3fEb54a01E35a3Fa735      | All           |
+           +-------------------------------+-------------------------------------------------+---------------+
|           | P-Chain (Bech32 format)       | P-custom1n5n4h99j3nx8hdrv50v8ll7aldm383nap6rh42 | Local Network |
+           +                               +-------------------------------------------------+---------------+
|           |                               | P-fuji1n5n4h99j3nx8hdrv50v8ll7aldm383na7j4j7q   | Fuji          |
+-----------+-------------------------------+-------------------------------------------------+---------------+
| mytestkey | C-Chain (Ethereum hex format) | 0x86BB07a534ADF43786ECA5Dd34A97e3F96927e4F      | All           |
+           +-------------------------------+-------------------------------------------------+---------------+
|           | P-Chain (Bech32 format)       | P-custom1a3azftqvygc4tlqsdvd82wks2u7nx85rg7v8ta | Local Network |
+           +                               +-------------------------------------------------+---------------+
|           |                               | P-fuji1a3azftqvygc4tlqsdvd82wks2u7nx85rhk6zqh   | Fuji          |
+-----------+-------------------------------+-------------------------------------------------+---------------+
```

#### Funding the key

:::danger

Do these steps only to follow this tutorial for Fuji addresses. To access the wallet for Mainnet, the use of a ledger device is strongly recommended.

:::

1. A newly created key has no funds on it. Send funds via transfer to its correspondent addresses if you already have funds on a different address, or get it from the faucet at [https://faucet.avax.network](https://faucet.avax.network/) using your **C-Chain address**.

2. **Export** your key via the `avalanche key export` command, then paste the output when selecting "Private key" while accessing the [web wallet](https://wallet.avax.network). (Private Key is the first option on the [web wallet](https://wallet.avax.network)).
3. Move the test funds from the C-Chain to the P-Chain by clicking on the `Cross Chain` on the left side of the web wallet (more details can be found on the [this tutorial](https://support.avax.network/en/articles/6169872-how-to-make-a-cross-chain-transfer-in-the-avalanche-wallet)).

After following these 3 steps, your test key should now have a balance on the P-Chain on Fuji Testnet.

## Create an EVM Subnet

Creating a Subnet with `Avalanche-CLI` for `Fuji` works the same way as with a [local network](./create-a-local-subnet#create-a-custom-subnet-configuration). In fact, the `create` commands only creates a specification of your Subnet on the local file system. Afterwards the Subnet needs to be _deployed_. This in fact allows to reuse configs, by creating the config with the `create` command, then first deploying to a local network and successively to `Fuji` - and eventually to Mainnet.

To create an EVM subnet, run the `subnet create` command with a name of your choice:

```bash
avalanche subnet create testsubnet
```

This will start a series of prompts to customize your EVM Subnet to your needs. Most prompts have some validation to reduce issues due to invalid input.
The first prompt asks for the type of the virtual machine (see [Virtual Machine](#virtual-machine)).

```bash
Use the arrow keys to navigate: ↓ ↑ → ←
? Choose your VM:
  ▸ SubnetEVM
    Custom
```

As we are creating an EVM subnet, we can accept the default `SubnetEVM`.
Next, we are asked for a Chain ID. You should provide your own ID. Check [chainlist.org](https://chainlist.org/) to see if the value you'd like is already in use.

```bash
✔ SubnetEVM
creating subnet testsubnet
Enter your subnet's ChainId. It can be any positive integer.
ChainId: 3333
```

Now, we provide a symbol (of your choice) for the token of this EVM:

```bash
Select a symbol for your subnet's native token
Token symbol: TST
```

At this point, the user is prompted for the fee structure of the Subnet, so that fees can be tuned to the needs:

```bash
Use the arrow keys to navigate: ↓ ↑ → ←
? How would you like to set fees:
  ▸ Low disk use    / Low Throughput    1.5 mil gas/s (C-Chain's setting)
    Medium disk use / Medium Throughput 2 mil   gas/s
    High disk use   / High Throughput   5 mil   gas/s
    Customize fee config
    Go back to previous step
```

You can navigate with the arrow keys to select the suitable setting. Let's assume `Low disk use / Low Throughput 1.5 mil gas/s` for this tutorial.

The next question is about the airdrop:

```bash
✔ Low disk use    / Low Throughput    1.5 mil gas/s
Use the arrow keys to navigate: ↓ ↑ → ←
? How would you like to distribute funds:
  ▸ Airdrop 1 million tokens to the default address (do not use in production)
    Customize your airdrop
    Go back to previous step
```

You can accept the default (again, NOT for production), or customize your airdrop. In the latter case the wizard would continue. Let's assume the default here.

The final question is asking for precompiles. Precompiles are powerful customizations of your EVM. Read about them at [precompiles](./customize-a-subnet#precompiles).

```bash
✔ Airdrop 1 million tokens to the default address (do not use in production)
Use the arrow keys to navigate: ↓ ↑ → ←
? Advanced: Would you like to add a custom precompile to modify the EVM?:
  ▸ No
    Yes
    Go back to previous step
```

For this tutorial, let's assume the simple case of no additional precompile. This finalizes the prompt sequence and the command exits:

```bash
✔ No
Successfully created genesis
```

It's possible to abort the process with Ctrl-C at any time.

At this point, the specification of the new Subnet is created on disk, but is not deployed yet.

We can print the specification to disk by running the `describe` command:

```bash
avalanche describe testsubnet
 _____       _        _ _
|  __ \     | |      (_) |
| |  | | ___| |_ __ _ _| |___
| |  | |/ _ \ __/ _  | | / __|
| |__| |  __/ || (_| | | \__ \
|_____/ \___|\__\__,_|_|_|___/
+-------------+------------+
|  PARAMETER  |   VALUE    |
+-------------+------------+
| Subnet Name | testsubnet |
+-------------+------------+
| ChainID     | 3333       |
+-------------+------------+
| Token Name  | TST        |
+-------------+------------+

  _____              _____             __ _
 / ____|            / ____|           / _(_)
| |  __  __ _ ___  | |     ___  _ __ | |_ _  __ _
| | |_ |/ _  / __| | |    / _ \| '_ \|  _| |/ _  |
| |__| | (_| \__ \ | |___| (_) | | | | | | | (_| |
 \_____|\__,_|___/  \_____\___/|_| |_|_| |_|\__, |
                                             __/ |
                                            |___/
+--------------------------+-------------+
|      GAS PARAMETER       |    VALUE    |
+--------------------------+-------------+
| GasLimit                 |     8000000 |
+--------------------------+-------------+
| MinBaseFee               | 25000000000 |
+--------------------------+-------------+
| TargetGas (per 10s)      |    20000000 |
+--------------------------+-------------+
| BaseFeeChangeDenominator |          36 |
+--------------------------+-------------+
| MinBlockGasCost          |           0 |
+--------------------------+-------------+
| MaxBlockGasCost          |     1000000 |
+--------------------------+-------------+
| TargetBlockRate          |           2 |
+--------------------------+-------------+
| BlockGasCostStep         |      200000 |
+--------------------------+-------------+

          _         _
    /\   (_)       | |
   /  \   _ _ __ __| |_ __ ___  _ __
  / /\ \ | | '__/ _  | '__/ _ \| '_ \
 / ____ \| | | | (_| | | | (_) | |_) |
/_/    \_\_|_|  \__,_|_|  \___/| .__/
                               | |
                               |_|
+--------------------------------------------+------------------------+---------------------------+
|                  ADDRESS                   | AIRDROP AMOUNT (10^18) |   AIRDROP AMOUNT (WEI)    |
+--------------------------------------------+------------------------+---------------------------+
| 0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC |                1000000 | 1000000000000000000000000 |
+--------------------------------------------+------------------------+---------------------------+


  _____                                    _ _
 |  __ \                                  (_) |
 | |__) | __ ___  ___ ___  _ __ ___  _ __  _| | ___  ___
 |  ___/ '__/ _ \/ __/ _ \| '_   _ \| '_ \| | |/ _ \/ __|
 | |   | | |  __/ (_| (_) | | | | | | |_) | | |  __/\__ \
 |_|   |_|  \___|\___\___/|_| |_| |_| .__/|_|_|\___||___/
                                    | |
                                    |_|

No precompiles set
```

We can also list the available subnets:

```bash
avalanche subnet list
go run main.go subnet list
+------------+------------+----------+-----------+----------+
|   SUBNET   |   CHAIN    | CHAIN ID |   TYPE    | DEPLOYED |
+------------+------------+----------+-----------+----------+
| testsubnet | testsubnet |     3333 | SubnetEVM | No       |
+------------+------------+----------+-----------+----------+
```

## Deploy the Subnet

To deploy our new subnet, we can run

```bash
avalanche subnet deploy testsubnet
```

This will start a new prompt series.

```bash
Use the arrow keys to navigate: ↓ ↑ → ←
? Choose a network to deploy on:
  ▸ Local Network
    Fuji
    Mainnet
```

This tutorial is about deploying to `Fuji`, so we navigate with the arrow keys to `Fuji` and hit enter.
We are then asked to provide which private key to use for the deployment. The deployment basically consists in running a [createSubnet transaction](../apis/avalanchego/apis/p-chain.md#platformcreatesubnet). Therefore the key needs to be funded.

```bash
✔ Fuji
Deploying [testsubnet] to Fuji
Use the arrow keys to navigate: ↓ ↑ → ←
? Which private key should be used to issue the transaction?:
    test
  ▸ mytestkey
```

Subnets are currently permissioned only. Therefore, the process now requires the user to provide _which keys can control the subnet_. We are prompted to provide one or more **P-Chain addresses**. Only the keys corresponding to these addresses will be able to add or remove validators. Make sure to provide **Fuji P-Chain** addresses (`P-Fuji....`).

```bash
Configure which addresses may add new validators to the subnet.
These addresses are known as your control keys. You will also
set how many control keys are required to add a validator.
Use the arrow keys to navigate: ↓ ↑ → ←
? Set control keys:
  ▸ Add control key
    Done
    Cancel
```

Enter at `Add control key` and provide at least one key. You can enter multiple addresses, we'll use just one here. When no more addresses need to be added, hit `Done`.
(The address provided here is intentionally invalid. The address has a checksum and the tool will make sure it's a valid address).

```bash
✔ Add control key
Enter P-Chain address (Ex: `P-...`): P-fuji1vaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasz
Use the arrow keys to navigate: ↓ ↑ → ←
? Set control keys:
    Add control key
  ▸ Done
    Cancel
```

Finally, we need to define the threshold of how many keys are required for a change to be valid (there is some input validation). For example, if 1 key only is needed, as above, we'll enter just 1. The threshold can be arbitrary depending on the needs, e.g. 2 of 4 addresses, 1 of 3, 3 of 5, etc.

```bash
✔ Enter required number of control key signatures to add a validator: 1
```

Here the wizard completes, and the transaction is attempted.

If the private key is not funded or does not have enough funds, we'll get an error message:

```bash
Error: insufficient funds: provided UTXOs need 100000000 more units of asset "U8iRqJoiJm8xZHAacmvYyZVwqQx6uDNtQeP3CQ6fcgQk3JqnK"
```

If the private key is funded, but the **control key** is incorrect (not controlled by the private key), the Subnet will be created, but _not the blockchain_:

```bash
Subnet has been created with ID: 2EkPnvnDiLgudnf8NjtxaNcVFtdAAnUPvaoNBrc9WG5tNmmfaK. Now creating blockchain...
Error: insufficient authorization
```

Therefore we need to provide a control key which we have indeed control of, and then it succeeds:

```bash
Subnet has been created with ID: 2b175hLJhGdj3CzgXENso9CmwMgejaCQXhMFzBsm8hXbH2MF7H. Now creating blockchain...
Endpoint for blockchain "2XDnKyAEr1RhhWpTpMXqrjeejN23vETmDykVzkb4PrU1fQjewh" with VM ID "tGBrMADESojmu5Et9CpbGCrmVf9fiAJtZM5ZJ3YVDj5JTu2qw": https://api.avax-test.network/ext/bc/2XDnKyAEr1RhhWpTpMXqrjeejN23vETmDykVzkb4PrU1fQjewh/rpc
```

Well done! You have just created your own Subnet with your own Subnet EVM running on `Fuji`!

To check on your new subnet, visit [Avascan testnet](https://testnet.avascan.info/). The search best works by blockchain ID, so in this example, enter `2XDnKyAEr1RhhWpTpMXqrjeejN23vETmDykVzkb4PrU1fQjewh` into the search box and you should see your shiny new blockchain information.
 
## Add a Validator

This new Subnet is cool - but it doesn't have any dedicated validators yet! Let's add one by running the `addValidator` command and adding the name of our subnet. To be clear, this does _not start or run_ a validator, it only whitelists the node as a recognized validator on the subnet.

:::info

Adding a validator on a Subnet requires that the validator is already a validator on the primary network.

:::

```bash
avalanche subnet addValidator testsubnet
```

As this operation involves a new [transaction](../apis/avalanchego/apis/p-chain.md#platformaddsubnetvalidator), we need to tell the tool which private key to use:

```bash
Use the arrow keys to navigate: ↓ ↑ → ←
? Which private key should be used to issue the transaction?:
    test
  ▸ mytestkey
```

We are here a bit ahead of our time, the tool announces Mainnet support. Just choose `Fuji`:

```bash
Use the arrow keys to navigate: ↓ ↑ → ←
? Choose a network to deploy on. This command only supports Fuji currently.:
  ▸ Fuji
    Mainnet (coming soon)
```

Now we need the **NodeID** of our new validator from the very beginning of this tutorial. For best results make sure the validator is running and synced.

```bash
What is the NodeID of the validator you'd like to whitelist?: NodeID-BFa1paAAAAAAAAAAAAAAAAAAAAQGjPhUy
```

(this ID is intentionally modified)

The next question requires a bit of thinking. A validator has a weight, which defines how often it will be selected for decision making. You should think ahead of how many validators you want initially to identify a good value here. The range is 1 to 100, but the minimum for a Subnet without any validators yet is 20. The structure is a bit described at [addSubnetValidator](../apis/avalanchego/apis/p-chain.md#platformaddsubnetvalidator) under the `weight` section.

We'll select 30 for this one:

```bash
Use the arrow keys to navigate: ↓ ↑ → ←
? What stake weight would you like to assign to the validator?:
    Default (20)
  ▸ Custom
```

```bash
✔ What stake weight would you like to assign to the validator?: 30
```

We then need to specify when the validator will start validating. The time must be in the future. Custom will require to enter a specific date in 'YYYY-MM-DD HH:MM:SS' format. Let's take the default this time:

```bash
Use the arrow keys to navigate: ↓ ↑ → ←
? Start time:
  ▸ Start in one minute
    Custom
```

:::warning

If the `join` command is not successfully completed before this time elapses and the validator's stake weight is >20% of the subnet, the Subnet may have down time.

:::

Finally, specify how long it will be validating:

```bash
✔ Start in one minute
Use the arrow keys to navigate: ↓ ↑ → ←
? How long should your validator validate for?:
  ▸ Until primary network validator expires
    Custom
```

If we choose `Custom` here, we'll have to enter a **duration**, which is a time span expressed in hours. For example, we could say 200 days = 24 \* 200 = 4800h

```bash
✔ How long should this validator be validating? Enter a duration, e.g. 8760h: 4800h
```

The user is shown an actual date of when that is now:

```bash
? Your validator will finish staking by 2023-02-13 12:26:55:
  ▸ Yes
    No
```

Confirm if correct. At this point the prompt series is complete and the transaction is attempted:

```bash
NodeID: NodeID-BFa1padLXBj7VHa2JYvYGzcTBPQGjPhUy
Network: Fuji
Start time: 2022-07-28 12:26:55
End time: 2023-02-13 12:26:55
Weight: 30
Inputs complete, issuing transaction to add the provided validator information...
```

This might take a couple of seconds, and if successful, it will print:

```bash
Transaction successful, transaction ID :EhZh8PvQyqA9xggxn6EsdemXMnWKyy839NzEJ5DHExTBiXbjV
```

This means the node has now been added as validator to the given Subnet on Fuji!

## Join a Subnet

You might already have a running validator which you want to add to a specific subnet. For this we run the `join` command.
This is a bit of a special command. The `join` command will either just _print the required instructions_ for your already running node or will attempt at configuring a config file the user provides.

First also a bit of "marketing" (announcing not yet available Mainnet support):

```bash
avalanche subnet join testsubnet
Use the arrow keys to navigate: ↓ ↑ → ←
? Choose a network to validate on (this command only supports public networks):
  ▸ Fuji
    Mainnet
```

In the [deploy the subnet](#deploy-the-subnet) section, we saw that a Subnet is permissioned via a set of keys. Therefore not any node can be added as validator to the subnet. A holder of a control key _must_ call [subnet addValidator](../apis/avalanchego/apis/p-chain.md#platformaddsubnetvalidator) first in order to allow the node to validate the subnet. So the tool allows the user now to verify if the node has already been permissioned ("whitelisted") to be a validator for this Subnet (by calling an API in the background).

```bash
Would you like to check if your node is allowed to join this subnet?
If not, the subnet's control key holder must call avalanche subnet
addValidator with your NodeID.
Use the arrow keys to navigate: ↓ ↑ → ←
? Check whitelist?:
    Yes
  ▸ No
```

The default is `Yes` but we'll choose `No` here to speed up things, assuming the node is already whitelisted.

There are now two choices possible: Automatic and Manual configuration. As mentioned earlier, "Automatic" will attempt at editing a config file and setting up your plugin directory, while "Manual" will just print the required config to the screen. Let's see what "Automatic" does:

```bash
✔ Automatic
✔ Path to your existing config file (or where it will be generated): config.json
```

We need to provide a path to a config file. If this command were to be run on the box where your validator is running, then you could point this to the actually used config file, e.g. `/etc/avalanchego/config.json` - just make sure the tool has **write** access to the file. Or you could just copy the file later. In any case, the tool will either try to edit the existing file specified by the given path, or create a new file. Again, write permissions are required.

Next, we need to provide the plugin directory. We described VMs at the beginning of this tutorial [Virtual Machine](#virtual-machine). Each VM runs its own plugin, therefore avalanchego needs to be able to access the correspondent plugin binary. As this is the `join` command, which doesn't know yet about the plugin, we need to provide the directory where the plugin is installed. Make sure to provide the location for your case:

```bash
✔ Path to your avalanchego plugin dir (likely avalanchego/build/plugins): /home/user/go/src/github.com/ava-labs/avalanchego/build/plugins
```

The tool doesn't know where exactly it's located so it requires the full path. With the path given, it will copy the VM binary to the provided location:

```
✔ Path to your avalanchego plugin dir (likely avalanchego/build/plugins): /home/user/go/src/github.com/ava-labs/avalanchego/build/plugins█
VM binary written to /home/user/go/src/github.com/ava-labs/avalanchego/build/plugins/tGBrMADESojmu5Et9CpbGCrmVf9fiAJtZM5ZJ3YVDj5JTu2qw
This will edit your existing config file. This edit is nondestructive,
but it's always good to have a backup.
Use the arrow keys to navigate: ↓ ↑ → ←
? Proceed?:
  ▸ Yes
    No
```

Hitting `Yes` will attempt at writing the config file:

```
✔ Yes
The config file has been edited. To use it, make sure to start the node with the '--config-file' option, e.g.

./build/avalanchego --config-file config.json

(using your binary location). The node has to be restarted for the changes to take effect.
```

It is **required to restart the node**.

If we would have chosen "Manual" instead, the tool will just print _instructions_. The user will have to follow these instructions and apply them to the node. Note that the IDs for the VM and subnets will be different in your case.

```bash
✔ Manual

To setup your node, you must do two things:

1. Add your VM binary to your node's plugin directory
2. Update your node config to start validating the subnet

To add the VM to your plugin directory, copy or scp from /tmp/tGBrMADESojmu5Et9CpbGCrmVf9fiAJtZM5ZJ3YVDj5JTu2qw

If you installed avalanchego manually, your plugin directory is likely
avalanchego/build/plugins.

If you start your node from the command line WITHOUT a config file (e.g. via command
line or systemd script), add the following flag to your node's startup command:

--whitelisted-subnets=2b175hLJhGdj3CzgXENso9CmwMgejaCQXhMFzBsm8hXbH2MF7H
(if the node already has a whitelisted-subnets config, append the new value by
comma-separating it).

For example:
./build/avalanchego --network-id=Fuji --whitelisted-subnets=2b175hLJhGdj3CzgXENso9CmwMgejaCQXhMFzBsm8hXbH2MF7H

If you start the node via a JSON config file, add this to your config file:
whitelisted-subnets: 2b175hLJhGdj3CzgXENso9CmwMgejaCQXhMFzBsm8hXbH2MF7H

TIP: Try this command with the --avalanchego-config flag pointing to your config file,
this tool will try to update the file automatically (make sure it can write to it).

After you update your config, you will need to restart your node for the changes to
take effect.
```

## Subnet Export

This tool is most useful on the machine where a validator is or will be running. In order to allow a VM to run on a different machine, the configuration can be exported. We just need to provide a path to where to export the data:

```bash
avalanche subnet export testsubnet
✔ Enter file path to write export data to: /tmp/testsubnet-export.dat
```

The file is in text format and it should not be tampered with. It can then be used to import the configuration on a different machine.

## Subnet Import

To import a VM specification exported in the previous section, just issue the `import` command with the path to the file after having copied the file over:

```bash
avalanche subnet import /tmp/testsubnet-export.dat
Subnet imported successfully
```

After this the whole Subnet configuration should be available on the target machine:

```bash
avalanche subnet list
+---------------+---------------+----------+-----------+----------+
|    SUBNET     |     CHAIN     | CHAIN ID |   TYPE    | DEPLOYED |
+---------------+---------------+----------+-----------+----------+
| testsubnet    | testsubnet    |     3333 | SubnetEVM | No       |
+---------------+---------------+----------+-----------+----------+
```

