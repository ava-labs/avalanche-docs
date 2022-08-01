---
sidebar_position: 2
description: The quickest way to learn about Avalanche is to run a node and interact with the network and geared toward people interested in how the Avalanche Platform works.
---

# Run an Avalanche Node Manually

The quickest way to learn about Avalanche is to run a node and interact with the network.

In this tutorial, we will:

- Install and run an Avalanche node
- Connect to Avalanche

:::info
If you're interested in using a third-party service to host your node or run a validator, [check out the options](../README.md#build).
:::

This tutorial is primarily geared toward developers and people interested in how the Avalanche Platform works. If you're just interested in setting up a node for staking, you may want to follow the [Set Up Avalanche Node With Installer](set-up-node-with-installer.md) tutorial instead. Installer automates the installation process and sets it up as a system service, which is recommended for unattended operation. You may also try things out by following this tutorial first, and then later set up the node using the installer as a permanent solution.

## Requirements

### Computer Hardware and OS

Avalanche is an incredibly lightweight protocol, so nodes can run on commodity hardware. Note that as network usage increases, hardware requirements may change.

- CPU: Equivalent of 8 AWS vCPU
- RAM: 16 GiB
- Storage: 1 TB
- OS: Ubuntu 18.04/20.04 or MacOS &gt;= Catalina

### Networking

To run successfully, AvalancheGo needs to accept connections from the Internet on the network port `9651`. Before you proceed with the installation, you need to determine the networking environment your node will run in.

#### Running on a Cloud Provider

If your node is running on a cloud provider computer instance, it will have a static IP. Find out what that static IP is, or set it up if you didn't already.

#### Running on a Home Connection

If you're running a node on a computer that is on a residential internet connection, you have a dynamic IP; that is, your IP will change periodically. You will need to set up inbound port forwarding of port `9651` from the internet to the computer the node is installed on.

As there are too many models and router configurations, we cannot provide instructions on what exactly to do, but there are online guides to be found (like [this](https://www.noip.com/support/knowledgebase/general-port-forwarding-guide/), or [this](https://www.howtogeek.com/66214/how-to-forward-ports-on-your-router/) ), and your service provider support might help too.

:::warning
Please note that a fully connected Avalanche node maintains and communicates over a couple of thousand of live TCP connections. For some low-powered and older home routers that might be too much to handle. If that is the case you may experience lagging on other computers connected to the same router, node getting benched, failing to sync and similar issues.
:::

## Run an Avalanche Node

Let’s install AvalancheGo, the GoLang implementation of an Avalanche node, and connect to the Avalanche primary network.

### Download AvalancheGo

The node is a binary program. You can either download the source code and then build the binary program, or you can download the pre-built binary. You don’t need to do both.

Downloading [pre-built binary](run-avalanche-node-manually.md#binary) is easier and recommended if you're just looking to run your own node and stake on it.

Building the node from source is recommended if you're a developer looking to experiment and build on Avalanche.

#### **Source Code**

First install Go 1.17.9 or later. Follow the instructions [here](https://golang.org/doc/install). You can verify by runing `go version`.

Set `$GOPATH` environment variable properly for Go to look for Go Workspaces. Please read [this](https://go.dev/doc/gopath_code) for details. You can verify by running `echo $GOPATH`.

Download the AvalancheGo repository into your `$GOPATH`:

```sh
cd $GOPATH
mkdir -p src/github.com/ava-labs
cd src/github.com/ava-labs
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

By default (without specifying any parameters), this node will connect to the Mainnet which may take much longer time to finish bootstrapping. See [this](#connect-to-fuji-testnet) for connecting to Fuji Testnet.

When the node starts, it has to bootstrap (catch up with the rest of the network). You will see logs about bootstrapping. When a given chain is done bootstrapping, it will print a log like this:

```text
[05-25|17:18:48.479] INFO <P Chain> snowman/transitive.go:339 consensus starting with 3CEShuttaoY46vofsZsUtrC3BdiJaNgWP9Xgud89WqwBvDVC5 as the last accepted block
[05-25|17:18:48.482] INFO <C Chain> snowman/transitive.go:339 consensus starting with cAhvmHwAqhsw8MtbRXf3e3pzm3RnMC7Gn9uqunRHb6jzUyWab as the last accepted block
[05-25|17:19:06.516] INFO <X Chain> avalanche/transitive.go:306 consensus starting with 1 vertices in the accepted frontier
```

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

If this returns `true`, the chain is bootstrapped; otherwise, it returns `false`. If you make other API calls to a chain that is not done bootstrapping, it will return `API call rejected because chain is not done bootstrapping`. If you are still experiencing issues please contact us on [Discord.](https://chat.avalabs.org/)

Your node is running and connected now. If you want to use your node as a validator on the main net, check out [this tutorial](../validate/add-a-validator.md#add-a-validator-with-avalanche-wallet) to find out how to add your node as a validator using the web wallet.

You can use `Ctrl + C` to kill the node.

To be able to make API calls to your node from other machines, when starting up the node include argument `--http-host=` (e.g. `./build/avalanchego --http-host=`)

#### Connect to Fuji Testnet

To connect to the Fuji Testnet instead of the Mainnet, use argument `--network-id=fuji`. You can get funds on the Testnet from the [faucet.](https://faucet.avax.network/)

## What Next?

Now that you've launched your Avalanche node, what should you do next?

Your Avalanche node will perform consensus on its own, but it is not yet a validator on the network. This means that the rest of the network will not query your node when sampling the network during consensus. If you want to add your node as a validator, check out [Add a Validator](../validate/add-a-validator.md) to take it a step further.

Also check out the [Maintain](../README.md#maintain) section to learn about how to maintain and customize your node to fit your needs.
