# Create a Local Test Network

## Introduction

This tutorial explains several methods of creating a local test network.

There are currently three options to launch such a local network:
* Using the [Avalanche Network Runner](../../tools/network-runner/) (recommended)
* Manually starting each AvalancheGo node (not recommended)

## Create a Local Test Network

The below commands assume you have [AvalancheGo](../nodes-and-staking/run-avalanche-node.md#download-avalanchego) installed at `$GOPATH/src/github.com/ava-labs/avalanchego`. Each of the five nodes created is a validator. The staking keys for these nodes are in `$GOPATH/src/github.com/ava-labs/avalanchego/staking/local/staker1.crt`, etc.

### Avalanche Network Runner

Install the [Avalanche Network Runner](../../tools/network-runner.md) by cloning the repo:

```
git clone https://github.com/ava-labs/avalanche-network-runner.git
```

As this is a `go` tool, we recommend installing according to the `$GOPATH` convention. The rest of this tutorial assumes this convention.

Change the working directory to this repository:

```sh
cd $GOPATH/src/github.com/ava-labs/avalanche-network-runner
```

Run the example network configuration:

```
go run ./examples/local/fivenodenetwork/main.go
```

This creates a 5 node network where each node has a randomly generated API port. Note that you may provide configurations to the Avalanche Network Runner so that it uses predefined API ports for each node. Please see the Network Runner's [documentation](../../tools/network-runner.md) for details.

After you run the above command, check the output to see the API port of each node. The output will contain something like this:

```
INFO [12-07|18:32:48] local/network.go#380: adding node "node-0" 
with tmp dir at /tmp/avalanchego-network-runner-2634315498, 
logs at /tmp/avalanchego-network-runner-2634315498/logs, 
DB at /tmp/avalanchego-network-runner-2634315498, 
P2P port 33833, 
API port 33695
```

To make API calls, use the `API port`, which in this example is `33695`. Each node will have a unique API port.

Once you have a node's API port, you can make API calls to it as shown [here.](#verifying-nodes-are-connected)

### Manually

The 5 nodes will have HTTP ports (where API calls should be sent) `9650`, `9652`, `9654`, `9656` , and `9658`.

To start the network:

```sh
cd $GOPATH/src/github.com/ava-labs/avalanchego
```

```sh
./scripts/build.sh
```

```sh
./build/avalanchego --public-ip=127.0.0.1 --http-port=9650 --staking-port=9651 --db-dir=db/node1 --network-id=local --staking-tls-cert-file=$(pwd)/staking/local/staker1.crt --staking-tls-key-file=$(pwd)/staking/local/staker1.key
```

```sh
./build/avalanchego --public-ip=127.0.0.1 --http-port=9652 --staking-port=9653 --db-dir=db/node2 --network-id=local --bootstrap-ips=127.0.0.1:9651 --bootstrap-ids=NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg --staking-tls-cert-file=$(pwd)/staking/local/staker2.crt --staking-tls-key-file=$(pwd)/staking/local/staker2.key
```

```sh
./build/avalanchego --public-ip=127.0.0.1 --http-port=9654 --staking-port=9655 --db-dir=db/node3 --network-id=local --bootstrap-ips=127.0.0.1:9651 --bootstrap-ids=NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg --staking-tls-cert-file=$(pwd)/staking/local/staker3.crt --staking-tls-key-file=$(pwd)/staking/local/staker3.key
```

```sh
./build/avalanchego --public-ip=127.0.0.1 --http-port=9656 --staking-port=9657 --db-dir=db/node4 --network-id=local --bootstrap-ips=127.0.0.1:9651 --bootstrap-ids=NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg --staking-tls-cert-file=$(pwd)/staking/local/staker4.crt --staking-tls-key-file=$(pwd)/staking/local/staker4.key
```

```sh
./build/avalanchego --public-ip=127.0.0.1 --http-port=9658 --staking-port=9659 --db-dir=db/node5 --network-id=local --bootstrap-ips=127.0.0.1:9651 --bootstrap-ids=NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg --staking-tls-cert-file=$(pwd)/staking/local/staker5.crt --staking-tls-key-file=$(pwd)/staking/local/staker5.key
```

