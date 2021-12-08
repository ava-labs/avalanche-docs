# Create a Local Test Network

## Introduction

In this tutorial, we will show how to create a local test network.

We’ll show you how to launch a 5 node local test network. There are currently three options to launch such a local network:
* Manually
* Using [Avash](../../tools/avash.md)
* Using the new [Network-runner](../../tools/netrunner.md)

## Create a Local Test Network

The below commands assume you have [AvalancheGo](../nodes-and-staking/run-avalanche-node.md#download-avalanchego) installed at `$GOPATH/src/github.com/ava-labs/avalanchego`. Each of the five nodes created is a validator. The staking keys for these nodes are in `$GOPATH/src/github.com/ava-labs/avalanchego/staking/local/staker1.crt`, etc.

### Manually

The 5 nodes will have HTTP ports (where API calls should be sent) `9650`, `9652`, `9654`, `9656` , and `9658`.

To start the network:

```cpp
cd $GOPATH/src/github.com/ava-labs/avalanchego
```

```cpp
./scripts/build.sh
```

```cpp
./build/avalanchego --public-ip=127.0.0.1 --snow-sample-size=2 --snow-quorum-size=2 --http-port=9650 --staking-port=9651 --db-dir=db/node1 --staking-enabled=true --network-id=local --bootstrap-ips= --staking-tls-cert-file=$(pwd)/staking/local/staker1.crt --staking-tls-key-file=$(pwd)/staking/local/staker1.key
```

```cpp
./build/avalanchego --public-ip=127.0.0.1 --snow-sample-size=2 --snow-quorum-size=2 --http-port=9652 --staking-port=9653 --db-dir=db/node2 --staking-enabled=true --network-id=local --bootstrap-ips=127.0.0.1:9651 --bootstrap-ids=NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg --staking-tls-cert-file=$(pwd)/staking/local/staker2.crt --staking-tls-key-file=$(pwd)/staking/local/staker2.key
```

```cpp
./build/avalanchego --public-ip=127.0.0.1 --snow-sample-size=2 --snow-quorum-size=2 --http-port=9654 --staking-port=9655 --db-dir=db/node3 --staking-enabled=true --network-id=local --bootstrap-ips=127.0.0.1:9651 --bootstrap-ids=NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg --staking-tls-cert-file=$(pwd)/staking/local/staker3.crt --staking-tls-key-file=$(pwd)/staking/local/staker3.key
```

```cpp
./build/avalanchego --public-ip=127.0.0.1 --snow-sample-size=2 --snow-quorum-size=2 --http-port=9656 --staking-port=9657 --db-dir=db/node4 --staking-enabled=true --network-id=local --bootstrap-ips=127.0.0.1:9651 --bootstrap-ids=NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg --staking-tls-cert-file=$(pwd)/staking/local/staker4.crt --staking-tls-key-file=$(pwd)/staking/local/staker4.key
```

```cpp
./build/avalanchego --public-ip=127.0.0.1 --snow-sample-size=2 --snow-quorum-size=2 --http-port=9658 --staking-port=9659 --db-dir=db/node5 --staking-enabled=true --network-id=local --bootstrap-ips=127.0.0.1:9651 --bootstrap-ids=NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg --staking-tls-cert-file=$(pwd)/staking/local/staker5.crt --staking-tls-key-file=$(pwd)/staking/local/staker5.key
```

### With Avash

We assume you’ve installed [Avash](../../tools/avash.md).

To open Avash:

```cpp
cd $GOPATH/src/github.com/ava-labs/avash
```

```cpp
go build
```

```cpp
./avash
```

Now we’re in Avash. To start the network:

```cpp
runscript scripts/five_node_staking.lua
```

The 5 nodes will have HTTP ports (where API calls should be sent) `9650`, `9652`, `9654`, `9656` , and `9658`.
When you want to tear down the network, run `exit` to exit Avash.

### Verifying Nodes are Connected {#verifying-nodes-are-connected}

We can look at one of the node’s peers to ensure that the nodes are connected. To do so, call [`info.peers`](../../avalanchego-apis/info-api.md#infopeers).

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.peers"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

`peers` should have 4 entries:

```cpp
{
    "jsonrpc":"2.0",
    "result":{
        "numPeers":"4",
        "peers":[
            {
                "ip":"127.0.0.1:36698",
                "publicIP":"127.0.0.1:9655",
                "nodeID":"NodeID-NFBbbJ4qCmNaCzeW7sxErhvWqvEQMnYcN",
                "version":"avalanche/1.0.5",
                "lastSent":"2020-11-15T09:29:16-05:00",
                "lastReceived":"2020-11-15T09:29:09-05:00"
            },
            {
                "ip":"127.0.0.1:37036",
                "publicIP":"127.0.0.1:9657",
                "nodeID":"NodeID-GWPcbFJZFfZreETSoWjPimr846mXEKCtu",
                "version":"avalanche/1.0.5",
                "lastSent":"2020-11-15T09:29:16-05:00",
                "lastReceived":"2020-11-15T09:29:18-05:00"
            },
            {
                "ip":"127.0.0.1:38764",
                "publicIP":"127.0.0.1:9659",
                "nodeID":"NodeID-P7oB2McjBGgW2NXXWVYjV8JEDFoW9xDE5",
                "version":"avalanche/1.0.5",
                "lastSent":"2020-11-15T09:29:16-05:00",
                "lastReceived":"2020-11-15T09:29:15-05:00"
            },
            {
                "ip":"127.0.0.1:60194",
                "publicIP":"127.0.0.1:9653",
                "nodeID":"NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ",
                "version":"avalanche/1.0.5",
                "lastSent":"2020-11-15T09:29:16-05:00",
                "lastReceived":"2020-11-15T09:29:09-05:00"
            }
        ]
    },
    "id":1
}
```

### Getting AVAX {#getting-avax}

When running a network with `--network-id=local`, as we’ve done, there is a pre-funded X-Chain address that you can import in order to get AVAX. The private key for this address is `PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN`. After you create a keystore user on a node, you can import this key, and the funds it holds, with:

```cpp
curl --location --request POST 'localhost:9650/ext/platform' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "platform.importKey",
    "params":{
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE",
          "privateKey":"PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN"
    },
    "id": 1
}'
```

That’s it! Your local version of Avalanche is up and running. It has the default blockchains: the [X-Chain](../../../learn/platform-overview/README.md#exchange-chain-x-chain), [C-Chain](../../../learn/platform-overview/README.md#contract-chain-c-chain), and [P-Chain](../../../learn/platform-overview/README.md#platform-chain-p-chain). The only subnet that exists is the Primary Network.

You can add more nodes to the network. Just remember to give unique values for `db-dir`, `http-port` , and `staking-port`.

### Using the network-runner
Install the [network-runner](../../tools/netrunner.md) by cloning the repo:
```
git clone https://github.com/ava-labs/avalanche-network-runner.git
```
As this is a `go` tool, we recommend installing according to the `$GOPATH` convention. The rest of this tutorial assumes this convention.

Change the working directory to this repository:
```cpp
cd $GOPATH/src/github.com/ava-labs/avalanche-network-runner
```

Run the example network configuration:
```
go run ./examples/local/fivenodenetwork/main.go
```

This is a simple network which also creates a default 5 nodes network running on generated port numbers changing between executions. This means that the ports the avalanchego nodes run on always change - unless specified via supplied config options, in which case the configured ports will be used. Check the [docs](../../tools/netrunner.md) for details about how to provide and change configs.

Therefore, to be able to connect to the nodes, run the above command and check the command line output for the ports. It will look something like this:
```cpp
INFO [12-07|18:32:48] local/network.go#380: adding node "node-0" 
with tmp dir at /tmp/avalanchego-network-runner-2634315498, 
logs at /tmp/avalanchego-network-runner-2634315498/logs, 
DB at /tmp/avalanchego-network-runner-2634315498, 
P2P port 33833, 
API port 33695
```
To make API calls, use the `API port`, which in this example is `33695`. It obviously differs for every node. The `P2P port` is the consensus port (`33833`), which you usually don't interact with.

It is then possible to make API calls just like [#verifying-nodes-are-connected](#verifying-nodes-are-connected) and [#getting-avax](#getting-avax). Don't forget to change the ports with the generated ones from the tool to execute the API calls.
