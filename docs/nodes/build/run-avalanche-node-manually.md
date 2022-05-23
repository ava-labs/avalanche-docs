---
sidebar_position: 2
description: The quickest way to learn about Avalanche is to run a node and interact with the network and geared toward people interested in how the Avalanche Platform works.
---

# Run an Avalanche Node Manually

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

Downloading [pre-built binary](run-avalanche-node-manually.md#binary) is easier and recommended if you're just looking to run your own node and stake on it.

Building the node from source is recommended if you're a developer looking to experiment and build on Avalanche.

#### **Source Code**

If you want to build the node from source, you're first going to need to install Go 1.17.9 or later. Follow the instructions [here](https://golang.org/doc/install).

Run `go version`. **It should be 1.17.9 or above.** Run `echo $GOPATH`. **It should not be empty.**

Download the AvalancheGo repository into your `$GOPATH`:

```sh
cd $GOPATH
mkdir -p src/github.com/ava-labs
git clone git@github.com:ava-labs/avalanchego.git
cd avalanchego
```

Note: This checkouts to the master branch. For the latest stable version, checkout the latest tag.

Build AvalancheGo:

```sh
./scripts/build.sh
```

The binary, named `avalanchego`, is in `avalanchego/build`. If you've followed the instructions so far, this will be within your `$GOPATH` at: `$GOPATH/src/github.com/ava-labs/avalanchego/build`.

To begin running AvalancheGo, run the following (hit Ctrl+C to stop your node):

```sh
./build/avalanchego
```

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

To check if a given chain is done bootstrapping, in another terminal window call [`info.isBootstrapped`](../../apis/avalanchego/apis/info.md#infoisbootstrapped) by copying and pasting the following command:

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

Your node is running and connected now. If you want to use your node as a validator on the main net, check out [this tutorial](../validate/add-a-validator.md#add-a-validator-with-avalanche-wallet) to find out how to add your node as a validator using the web wallet.

You can use `Ctrl + C` to kill the node.

If you want to experiment and play with your node, read on.

To be able to make API calls to your node from other machines, when starting up the node include argument `--http-host=` (e.g. `./build/avalanchego --http-host=`)


#### Connect to Fuji Testnet

To connect to the Fuji Testnet instead of the main net, use argument `--network-id=fuji`. You can get funds on the Testnet from the [faucet.](https://faucet.avax-test.network/)

### What Next?

Now that you've launched your Avalanche node, what should you do next?

Your Avalanche node will perform consensus on its own, but it is not yet a validator on the network. This means that the rest of the network will not query your node when sampling the network during consensus. If you want to add your node as a validator, check out [Add a Validator](../validate/add-a-validator.md) to take it a step further.