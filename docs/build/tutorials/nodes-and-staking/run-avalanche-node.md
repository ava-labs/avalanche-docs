---
sidebar_position: 2
description: The quickest way to learn about Avalanche is to run a node and interact with the network and geared toward people interested in how the Avalanche Platform works.
---

# Run an Avalanche Node

The quickest way to learn about Avalanche is to run a node and interact with the network.

In this tutorial, we will:

* Install and run an Avalanche node
* Connect to Avalanche
* Send AVAX
* Add your node to the validator set

:::caution
If your issue isn’t addressed in the FAQ, come ask for help in the [Avalanche Discord](https://chat.avax.network)! We will work to get you through any obstacles.
:::

:::info
If you're interested in using a third-party service to host your node or run a validator, [check out the options](https://docs.avax.network/learn/community#blockchain-infrastructure-and-node-services).
:::

This tutorial is primarily geared toward developers and people interested in how the Avalanche Platform works. If you're just interested in setting up a node for staking, you may want to follow the [Set Up Avalanche Node With Installer](set-up-node-with-installer.md) tutorial instead. Installer automates the installation process and sets it up as a system service, which is recommended for unattended operation. You may also try things out by following this tutorial first, and then later set up the node using the installer as a permanent solution.

## Requirements

Avalanche is an incredibly lightweight protocol, so nodes can run on commodity hardware. Note that as network usage increases, hardware requirements may change.

* CPU: Equivalent of 8 AWS vCPU
* RAM: 16 GiB
* Storage: 512 GiB
* OS: Ubuntu 18.04/20.04 or MacOS &gt;= Catalina

## Run an Avalanche Node and Send Funds

Let’s install AvalancheGo, the Go implementation of an Avalanche node, and connect to the Avalanche Public Testnet.

### Download AvalancheGo

The node is a binary program. You can either download the source code and then build the binary program, or you can download the pre-built binary. You don’t need to do both.

Downloading [pre-built binary](run-avalanche-node.md#binary) is easier and recommended if you're just looking to run your own node and stake on it.

Building the node from source is recommended if you're a developer looking to experiment and build on Avalanche.

#### **Source Code**

If you want to build the node from source, you're first going to need to install Go 1.16.8 or later. Follow the instructions [here](https://golang.org/doc/install).

Run `go version`. **It should be 1.16.8 or above.** Run `echo $GOPATH`. **It should not be empty.**

Download the AvalancheGo repository:

```sh
git clone git@github.com:ava-labs/avalanchego.git
```

Note: This checkouts to master branch. For the latest stable version, checkout to the latest tag.

Change to the `avalanchego` directory:

```sh
cd avalanchego
```

Build AvalancheGo:

```sh
./scripts/build.sh
```

The binary, named `avalanchego`, is in `avalanchego/build`.

#### **Binary**

If you want to download a pre-built binary instead of building it yourself, go to our [releases page](https://github.com/ava-labs/avalanchego/releases), and select the release you want (probably the latest one.)

Under `Assets`, select the appropriate file.

For MacOS: Download: `avalanchego-macos-<VERSION>.zip`
Unzip: `unzip avalanchego-macos-<VERSION>.zip` The resulting folder, `avalanchego-<VERSION>`, contains the binaries.

For Linux on PCs or cloud providers: Download: `avalanchego-linux-amd64-<VERSION>.tar.gz`
Unzip: `tar -xvf avalanchego-linux-amd64-<VERSION>.tar.gz`
The resulting folder, `avalanchego-<VERSION>-linux`, contains the binaries.

For Linux on RaspberryPi4 or similar Arm64-based computers: Download: `avalanchego-linux-arm64-<VERSION>.tar.gz`
Unzip: `tar -xvf avalanchego-linux-arm64-<VERSION>.tar.gz`
The resulting folder, `avalanchego-<VERSION>-linux`, contains the binaries.

### Start a Node, and Connect to Avalanche

If you built from source:

```sh
./build/avalanchego
```

If you are using the pre-built binaries on MacOS:

```sh
./avalanchego-<VERSION>/build/avalanchego
```

If you are using the pre-built binaries on Linux:

```sh
./avalanchego-<VERSION>-linux/avalanchego
```

When the node starts, it has to bootstrap (catch up with the rest of the network). You will see logs about bootstrapping. When a given chain is done bootstrapping, it will print a log like this:

`INFO [06-07|19:54:06] <X Chain> /snow/engine/avalanche/transitive.go#80: bootstrapping finished with 1 vertices in the accepted frontier`

To check if a given chain is done bootstrapping, in another terminal window call [`info.isBootstrapped`](../../avalanchego-apis/info.md#infoisbootstrapped) by copying and pasting the following command:

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.isBootstrapped",
    "params": {
        "chain":"X"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

If this returns `true`, the chain is bootstrapped. If you make an API call to a chain that is not done bootstrapping, it will return `API call rejected because chain is not done bootstrapping`. If your node never finishes bootstrapping, follow [this FAQ](http://support.avalabs.org/en/articles/4593908-is-my-node-done-bootstrapping), if you are still experiencing issues please contact us on [Discord.](https://chat.avalabs.org/)

Your node is running and connected now. If you want to use your node as a validator on the main net, check out [this tutorial](add-a-validator.md#add-a-validator-with-avalanche-wallet) to find out how to add your node as a validator using the web wallet.

You can use `Ctrl + C` to kill the node.

If you want to experiment and play with your node, read on.

To be able to make API calls to your node from other machines, when starting up the node include argument `--http-host=` (e.g. `./build/avalanchego --http-host=`)

To connect to the Fuji Testnet instead of the main net, use argument `--network-id=fuji`. You can get funds on the Testnet from the [faucet.](https://faucet.avax-test.network/)

### Create a Keystore User

Avalanche nodes provide a built-in **Keystore.** The Keystore manages users and is a lot like a [wallet](http://support.avalabs.org/en/articles/4587108-what-is-a-blockchain-wallet). A user is a password-protected identity that a client can use when interacting with blockchains. **You should only create a keystore user on a node that you operate, as the node operator has access to your plaintext password.** To create a user, call [`keystore.createUser`](../../avalanchego-apis/keystore.md#keystorecreateuser):

```sh
curl -X POST --data '{
     "jsonrpc": "2.0",
     "id": 1,
     "method": "keystore.createUser",
     "params": {
         "username": "YOUR USERNAME HERE",
         "password": "YOUR PASSWORD HERE"
     }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/keystore
```

The response should be:

```json
{
     "jsonrpc":"2.0",
     "result":{"success":true},
     "id":1
}
```

Now, you have a user on this node. Keystore data exists at the node level. Users you create on one node’s Keystore do not exist on other nodes but you can import/export users to/from the Keystore. See the [Keystore API](../../avalanchego-apis/keystore.md) to see how.

:::danger
**You should only keep a small amount of your funds on your node.** Most of your funds should be secured by a mnemonic that is not saved to any computer.
:::

### Create an Address

Avalanche is a platform of heterogeneous blockchains, one of which is the [X-Chain](../../../learn/platform-overview/README.md#exchange-chain-x-chain), which acts as a decentralized platform for creating and trading digital assets. We are now going to create an address to hold AVAX on our node.

To create a new address on the X-Chain, call [`avm.createAddress`](../../avalanchego-apis/x-chain.mdx#avmcreateaddress), a method of the [X-Chain’s API](../../avalanchego-apis/x-chain.mdx):

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :2,
    "method" :"avm.createAddress",
    "params" :{
        "username":"YOUR USERNAME HERE",
        "password":"YOUR PASSWORD HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

If your node isn’t finished bootstrapping, this call will return status `503` with message `API call rejected because chain is not done bootstrapping`.

Note that we make this request to `127.0.0.1:9650/ext/bc/X`. The `bc/X` portion signifies that the request is being sent to the blockchain whose ID (or alias) is `X` (i.e., the X-Chain).

The response should look like this:

```json
{
    "jsonrpc":"2.0",
    "id":2,
    "result" :{
        "address":"X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75"
    }
}
```

Your user now controls the address `X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75` on the X-Chain. To tell apart addresses on different chains, the Avalanche convention is for an address to include the ID or alias of the chain it exists on. Hence, this address begins `X-`, denoting that it exists on the X-Chain.

### Send Funds From Avalanche Wallet to Your Node

:::caution
_**Note: the instructions below move real funds.**_
:::

Let’s move funds from the Avalanche Wallet to your node.

Go to [Avalanche Wallet](https://wallet.avax.network). Click `Access Wallet`, then `Mnemonic Key Phrase`. Enter your mnemonic phrase.

Click the `Send` tab on the left. For amount, select, `.002` AVAX. Enter the address of your node, then click `Confirm`.

![web wallet send tab](/img/web-wallet-send-tab(4)(4)(5)(5)(6)(7)(4)(1)(5).png)

We can check an address’s balance of a given asset by calling `avm.getBalance`, another method of the X-Chain’s API. Let’s check that the transfer went through:

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :3,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75",
        "assetID"  :"AVAX"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Note that AVAX has the special ID `AVAX`. Usually an asset ID is an alphanumeric string.

The response should indicate that we have `2,000,000 nAVAX` or `0.002 AVAX`.

```json
{
    "jsonrpc":"2.0",
    "id"     :3,
    "result" :{
        "balance":2000000,
        "utxoIDs": [
            {
                "txID": "x6vR85YPNRf5phpLAEC7Sd6Tq2PXWRt3AAHAK4BpjxyjRyhtu",
                "outputIndex": 0
            }
        ]
    }
}
```

### Send AVAX

Now, let’s send some AVAX by making an API call to our node:

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :5,
    "method" :"avm.send",
    "params" :{
        "assetID"    :"AVAX",
        "amount"     :1000,
        "to"         :"X-avax1w4nt49gyv4e99ldqevy50l2kz55y9efghep0cs",
        "changeAddr" :"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username"   :"YOUR USERNAME HERE",
        "password"   :"YOUR PASSWORD HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

`amount` specifies the number of nAVAX to send.

If you want to specify a particular address where change should go, you can specify it in `changeAddr`. You can leave this field empty; if you do, any change will go to one of the addresses your user controls.

In order to prevent spam, Avalanche requires the payment of a transaction fee. The transaction fee will be automatically deducted from an address controlled by your user when you issue a transaction. Keep that in mind when you’re checking balances below.

:::info

[Transaction Fees](../../../learn/platform-overview/transaction-fees.md)

:::

When you send this request, the node will authenticate you using your username and password. Then, it will look through all the [private keys](http://support.avalabs.org/en/articles/4587058-what-are-public-and-private-keys) controlled by your user until it finds enough AVAX to satisfy the request.

The response contains the transaction’s ID. It will be different for every invocation of `send`.

```json
{
    "jsonrpc":"2.0",
    "id"     :5,
    "result" :{
        "txID":"2QouvFWUbjuySRxeX5xMbNCuAaKWfbk5FeEa2JmoF85RKLk2dD",
        "changeAddr" :"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

#### Checking the Transaction Status

This transaction will only take a second or two to finalize. We can check its status with [`avm.getTxStatus`](../../avalanchego-apis/x-chain.mdx#avmgettxstatus):

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :6,
    "method" :"avm.getTxStatus",
    "params" :{
        "txID":"2QouvFWUbjuySRxeX5xMbNCuAaKWfbk5FeEa2JmoF85RKLk2dD"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

The response should indicate that the transaction was accepted:

```json
{
    "jsonrpc":"2.0",
    "id"     :6,
    "result" :{
        "status":"Accepted"
    }
}
```

You might also see that `status` is `Processing` if the network has not yet finalized the transaction.

Once you see that the transaction is `Accepted`, check the balance of the `to` address to see that it has the AVAX we sent:

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :7,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-avax1w4nt49gyv4e99ldqevy50l2kz55y9efghep0cs",
        "assetID"  :"AVAX"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

The response should be:

```json
{
    "jsonrpc":"2.0",
    "id"     :7,
    "result" :{
        "balance":1000
    }
}
```

In the same fashion, we could check `X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75` to see that AVAX we sent was deducted from its balance, as well as the transaction fee.


