# Create a Local Test Network

## Introduction

This tutorial explains several methods of creating a local test network.

There are currently two options to launch such a local network:

- Using the [Avalanche Network Runner](../subnets/network-runner.md) (recommended)
- Manually starting each AvalancheGo node (not recommended)

## Avalanche Network Runner

### Installation

The Avalanche Network Runner repository is hosted at [https://github.com/ava-labs/avalanche-network-runner](https://github.com/ava-labs/avalanche-network-runner).

That repository's README details the tool.

Clone the repository with:

```bash
git clone https://github.com/ava-labs/avalanche-network-runner.git
```

There are also binary releases ready to use at [releases](https://github.com/ava-labs/avalanche-network-runner/releases). You can download and install it on to your computer.

To build from the source and install the binary locally (requires `golang` to be installed. Check the [requirements](https://github.com/ava-labs/avalanchego#installation) for the minimum version):

```bash
cd ${HOME}/go/src/github.com/ava-labs/avalanche-network-runner
go install -v ./cmd/avalanche-network-runner
```

`avalanche-network-runner` will be installed into `$GOPATH/bin`, please make sure that `$GOPATH/bin` is in your `$PATH`, otherwise, you may not be able to run commands below.

Furthermore, `AVALANCHEGO_EXEC_PATH` should be set properly in all shells you run commands related to Avalanche Network Runner. We strongly recommend that you put the following in to your shell's configuration file.

```bash
# replace execPath with the path to AvalancheGo on your machine
# e.g., ${HOME}/go/src/github.com/ava-labs/avalanchego/build/avalanchego
AVALANCHEGO_EXEC_PATH="${HOME}/go/src/github.com/ava-labs/avalanchego/build/avalanchego"
```

Unless otherwise specified, file paths given below are relative to the root of this repository.

When running with the binary `avalanche-network-runner`, it runs a server process as an RPC server which then waits for API calls and handles them.
Therefore we run one shell with the RPC server, and another one for issuing calls.

### Start the Server

```bash
avalanche-network-runner server \
--log-level debug \
--port=":8080" \
--grpc-gateway-port=":8081"
```

Note that the above command will run until you stop it with `CTRL + C`. Further commands will have to be run in a separate terminal.

The RPC server listens to two ports:

- `port`: the main gRPC port (see [gRPC](https://grpc.io/)).
- `grpc-gateway-port`: the gRPC gateway port (see [gRPC-gateway](https://grpc-ecosystem.github.io/grpc-gateway/)), which allows for HTTP requests.

When using the binary to issue calls, the main port will be hit. In this mode, the binary executes compiled code to issue calls.
Alternatively, plain HTTP can be used to issue calls, without the need to use the binary. In this mode, the `grpc-gateway-port` should be queried.

Each of the examples below will show both modes, claritying its usage.

### Start a New Avalanche Network with Five Nodes (a Cluster)

```bash
curl -X POST -k http://localhost:8081/v1/control/start -d '{"execPath":"'${AVALANCHEGO_EXEC_PATH}'","numNodes":5,"logLevel":"INFO"}'
```

or

```bash
avalanche-network-runner control start \
--log-level debug \
--endpoint="0.0.0.0:8080" \
--number-of-nodes=5 \
--avalanchego-path ${AVALANCHEGO_EXEC_PATH}
```

Response

```json
{
  "clusterInfo": {
    "nodeNames": [],
    "nodeInfos": {},
    "pid": 98315,
    "rootDataDir": "/var/folders/0h/v4nrbbsn1vvbr5h2wfrh5h500000gn/T/network-runner-root-data3575458647",
    "healthy": false,
    "attachedPeerInfos": {},
    "customVmsHealthy": false,
    "customVms": {}
  }
}
```

Use this command to check if all the nodes in the cluster are healthy

```bash
curl -X POST -k http://localhost:8081/v1/control/health -d ''
```

or

```bash
avalanche-network-runner control health \
--log-level debug \
--endpoint="0.0.0.0:8080"
```

The response to this call is actually pretty large, as it contains the state of the whole cluster. At the very end of it there should be a text saying `healthy:true` (it would say `false` if it wasn't healthy).

```json
{
  "clusterInfo": {
    "nodeNames": ["node3", "node4", "node5", "node1", "node2"],
    "nodeInfos": {
      "node1": {
        "name": "node1",
        "execPath": "/Users/testuser/workspace/src/github.com/ava-labs/avalanchego/build/avalanchego",
        "uri": "http://127.0.0.1:40108",
        "id": "NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg",
        "logDir": "/var/folders/0h/v4nrbbsn1vvbr5h2wfrh5h500000gn/T/network-runner-root-data3575458647/node1/log",
        "dbDir": "/var/folders/0h/v4nrbbsn1vvbr5h2wfrh5h500000gn/T/network-runner-root-data3575458647/node1/db-dir",
        "pluginDir": "",
        "whitelistedSubnets": "",
        "config": "eyJhcGktYWRtaW4tZW5hYmxlZCI6dHJ1ZSwiYXBpLWlwY3MtZW5hYmxlZCI6dHJ1ZSwiZGItZGlyIjoiL3Zhci9mb2xkZXJzLzBoL3Y0bnJiYnNuMXZ2YnI1aDJ3ZnJoNWg1MDAwMDBnbi9UL25ldHdvcmstcnVubmVyLXJvb3QtZGF0YTM1NzU0NTg2NDcvbm9kZTEvZGItZGlyIiwiaGVhbHRoLWNoZWNrLWZyZXF1ZW5jeSI6IjJzIiwiaW5kZXgtZW5hYmxlZCI6dHJ1ZSwibG9nLWRpciI6Ii92YXIvZm9sZGVycy8waC92NG5yYmJzbjF2dmJyNWgyd2ZyaDVoNTAwMDAwZ24vVC9uZXR3b3JrLXJ1bm5lci1yb290LWRhdGEzNTc1NDU4NjQ3L25vZGUxL2xvZyIsImxvZy1kaXNwbGF5LWxldmVsIjoiSU5GTyIsImxvZy1sZXZlbCI6IklORk8iLCJuZXR3b3JrLW1heC1yZWNvbm5lY3QtZGVsYXkiOiIxcyIsIm5ldHdvcmstcGVlci1saXN0LWdvc3NpcC1mcmVxdWVuY3kiOiIyNTBtcyIsInBsdWdpbi1kaXIiOiIiLCJwdWJsaWMtaXAiOiIxMjcuMC4wLjEiLCJ3aGl0ZWxpc3RlZC1zdWJuZXRzIjoiIn0="
      },
      "node2": {
        "name": "node2",
        "execPath": "/Users/testuser/workspace/src/github.com/ava-labs/avalanchego/build/avalanchego",
        "uri": "http://127.0.0.1:64470",
        "id": "NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ",
        "logDir": "/var/folders/0h/v4nrbbsn1vvbr5h2wfrh5h500000gn/T/network-runner-root-data3575458647/node2/log",
        "dbDir": "/var/folders/0h/v4nrbbsn1vvbr5h2wfrh5h500000gn/T/network-runner-root-data3575458647/node2/db-dir",
        "pluginDir": "",
        "whitelistedSubnets": "",
        "config": "eyJhcGktYWRtaW4tZW5hYmxlZCI6dHJ1ZSwiYXBpLWlwY3MtZW5hYmxlZCI6dHJ1ZSwiZGItZGlyIjoiL3Zhci9mb2xkZXJzLzBoL3Y0bnJiYnNuMXZ2YnI1aDJ3ZnJoNWg1MDAwMDBnbi9UL25ldHdvcmstcnVubmVyLXJvb3QtZGF0YTM1NzU0NTg2NDcvbm9kZTIvZGItZGlyIiwiaGVhbHRoLWNoZWNrLWZyZXF1ZW5jeSI6IjJzIiwiaW5kZXgtZW5hYmxlZCI6dHJ1ZSwibG9nLWRpciI6Ii92YXIvZm9sZGVycy8waC92NG5yYmJzbjF2dmJyNWgyd2ZyaDVoNTAwMDAwZ24vVC9uZXR3b3JrLXJ1bm5lci1yb290LWRhdGEzNTc1NDU4NjQ3L25vZGUyL2xvZyIsImxvZy1kaXNwbGF5LWxldmVsIjoiSU5GTyIsImxvZy1sZXZlbCI6IklORk8iLCJuZXR3b3JrLW1heC1yZWNvbm5lY3QtZGVsYXkiOiIxcyIsIm5ldHdvcmstcGVlci1saXN0LWdvc3NpcC1mcmVxdWVuY3kiOiIyNTBtcyIsInBsdWdpbi1kaXIiOiIiLCJwdWJsaWMtaXAiOiIxMjcuMC4wLjEiLCJ3aGl0ZWxpc3RlZC1zdWJuZXRzIjoiIn0="
      },
      "node3": {
        "name": "node3",
        "execPath": "/Users/testuser/workspace/src/github.com/ava-labs/avalanchego/build/avalanchego",
        "uri": "http://127.0.0.1:30301",
        "id": "NodeID-NFBbbJ4qCmNaCzeW7sxErhvWqvEQMnYcN",
        "logDir": "/var/folders/0h/v4nrbbsn1vvbr5h2wfrh5h500000gn/T/network-runner-root-data3575458647/node3/log",
        "dbDir": "/var/folders/0h/v4nrbbsn1vvbr5h2wfrh5h500000gn/T/network-runner-root-data3575458647/node3/db-dir",
        "pluginDir": "",
        "whitelistedSubnets": "",
        "config": "eyJhcGktYWRtaW4tZW5hYmxlZCI6dHJ1ZSwiYXBpLWlwY3MtZW5hYmxlZCI6dHJ1ZSwiZGItZGlyIjoiL3Zhci9mb2xkZXJzLzBoL3Y0bnJiYnNuMXZ2YnI1aDJ3ZnJoNWg1MDAwMDBnbi9UL25ldHdvcmstcnVubmVyLXJvb3QtZGF0YTM1NzU0NTg2NDcvbm9kZTMvZGItZGlyIiwiaGVhbHRoLWNoZWNrLWZyZXF1ZW5jeSI6IjJzIiwiaW5kZXgtZW5hYmxlZCI6dHJ1ZSwibG9nLWRpciI6Ii92YXIvZm9sZGVycy8waC92NG5yYmJzbjF2dmJyNWgyd2ZyaDVoNTAwMDAwZ24vVC9uZXR3b3JrLXJ1bm5lci1yb290LWRhdGEzNTc1NDU4NjQ3L25vZGUzL2xvZyIsImxvZy1kaXNwbGF5LWxldmVsIjoiSU5GTyIsImxvZy1sZXZlbCI6IklORk8iLCJuZXR3b3JrLW1heC1yZWNvbm5lY3QtZGVsYXkiOiIxcyIsIm5ldHdvcmstcGVlci1saXN0LWdvc3NpcC1mcmVxdWVuY3kiOiIyNTBtcyIsInBsdWdpbi1kaXIiOiIiLCJwdWJsaWMtaXAiOiIxMjcuMC4wLjEiLCJ3aGl0ZWxpc3RlZC1zdWJuZXRzIjoiIn0="
      },
      "node4": {
        "name": "node4",
        "execPath": "/Users/testuser/workspace/src/github.com/ava-labs/avalanchego/build/avalanchego",
        "uri": "http://127.0.0.1:31072",
        "id": "NodeID-GWPcbFJZFfZreETSoWjPimr846mXEKCtu",
        "logDir": "/var/folders/0h/v4nrbbsn1vvbr5h2wfrh5h500000gn/T/network-runner-root-data3575458647/node4/log",
        "dbDir": "/var/folders/0h/v4nrbbsn1vvbr5h2wfrh5h500000gn/T/network-runner-root-data3575458647/node4/db-dir",
        "pluginDir": "",
        "whitelistedSubnets": "",
        "config": "eyJhcGktYWRtaW4tZW5hYmxlZCI6dHJ1ZSwiYXBpLWlwY3MtZW5hYmxlZCI6dHJ1ZSwiZGItZGlyIjoiL3Zhci9mb2xkZXJzLzBoL3Y0bnJiYnNuMXZ2YnI1aDJ3ZnJoNWg1MDAwMDBnbi9UL25ldHdvcmstcnVubmVyLXJvb3QtZGF0YTM1NzU0NTg2NDcvbm9kZTQvZGItZGlyIiwiaGVhbHRoLWNoZWNrLWZyZXF1ZW5jeSI6IjJzIiwiaW5kZXgtZW5hYmxlZCI6dHJ1ZSwibG9nLWRpciI6Ii92YXIvZm9sZGVycy8waC92NG5yYmJzbjF2dmJyNWgyd2ZyaDVoNTAwMDAwZ24vVC9uZXR3b3JrLXJ1bm5lci1yb290LWRhdGEzNTc1NDU4NjQ3L25vZGU0L2xvZyIsImxvZy1kaXNwbGF5LWxldmVsIjoiSU5GTyIsImxvZy1sZXZlbCI6IklORk8iLCJuZXR3b3JrLW1heC1yZWNvbm5lY3QtZGVsYXkiOiIxcyIsIm5ldHdvcmstcGVlci1saXN0LWdvc3NpcC1mcmVxdWVuY3kiOiIyNTBtcyIsInBsdWdpbi1kaXIiOiIiLCJwdWJsaWMtaXAiOiIxMjcuMC4wLjEiLCJ3aGl0ZWxpc3RlZC1zdWJuZXRzIjoiIn0="
      },
      "node5": {
        "name": "node5",
        "execPath": "/Users/testuser/workspace/src/github.com/ava-labs/avalanchego/build/avalanchego",
        "uri": "http://127.0.0.1:37730",
        "id": "NodeID-P7oB2McjBGgW2NXXWVYjV8JEDFoW9xDE5",
        "logDir": "/var/folders/0h/v4nrbbsn1vvbr5h2wfrh5h500000gn/T/network-runner-root-data3575458647/node5/log",
        "dbDir": "/var/folders/0h/v4nrbbsn1vvbr5h2wfrh5h500000gn/T/network-runner-root-data3575458647/node5/db-dir",
        "pluginDir": "",
        "whitelistedSubnets": "",
        "config": "eyJhcGktYWRtaW4tZW5hYmxlZCI6dHJ1ZSwiYXBpLWlwY3MtZW5hYmxlZCI6dHJ1ZSwiZGItZGlyIjoiL3Zhci9mb2xkZXJzLzBoL3Y0bnJiYnNuMXZ2YnI1aDJ3ZnJoNWg1MDAwMDBnbi9UL25ldHdvcmstcnVubmVyLXJvb3QtZGF0YTM1NzU0NTg2NDcvbm9kZTUvZGItZGlyIiwiaGVhbHRoLWNoZWNrLWZyZXF1ZW5jeSI6IjJzIiwiaW5kZXgtZW5hYmxlZCI6dHJ1ZSwibG9nLWRpciI6Ii92YXIvZm9sZGVycy8waC92NG5yYmJzbjF2dmJyNWgyd2ZyaDVoNTAwMDAwZ24vVC9uZXR3b3JrLXJ1bm5lci1yb290LWRhdGEzNTc1NDU4NjQ3L25vZGU1L2xvZyIsImxvZy1kaXNwbGF5LWxldmVsIjoiSU5GTyIsImxvZy1sZXZlbCI6IklORk8iLCJuZXR3b3JrLW1heC1yZWNvbm5lY3QtZGVsYXkiOiIxcyIsIm5ldHdvcmstcGVlci1saXN0LWdvc3NpcC1mcmVxdWVuY3kiOiIyNTBtcyIsInBsdWdpbi1kaXIiOiIiLCJwdWJsaWMtaXAiOiIxMjcuMC4wLjEiLCJ3aGl0ZWxpc3RlZC1zdWJuZXRzIjoiIn0="
      }
    },
    "pid": 98315,
    "rootDataDir": "/var/folders/0h/v4nrbbsn1vvbr5h2wfrh5h500000gn/T/network-runner-root-data3575458647",
    "healthy": true,
    "attachedPeerInfos": {},
    "customVmsHealthy": false,
    "customVms": {}
  }
}
```

#### To Get API Endpoints of All Nodes in the Cluster {#retrieve-all-nodes}

```bash
curl -X POST -k http://localhost:8081/v1/control/uris -d ''
```

or

```bash
avalanche-network-runner control uris \
--log-level debug \
--endpoint="0.0.0.0:8080"
```

Response

```json
{
  "uris": [
    "http://127.0.0.1:30301",
    "http://127.0.0.1:31072",
    "http://127.0.0.1:37730",
    "http://127.0.0.1:40108",
    "http://127.0.0.1:64470"
  ]
}
```

Now you have a 5-nodes network with HTTP ports (where API calls should be sent) `30301`, `31072`, `37730`, `40108` , and `64470`.

Please refer to the dedicated [Avalanche Network Runner documentation](../subnets/network-runner.md) for more information.

## Manually

The below commands assume you have [AvalancheGo](../nodes/build/run-avalanche-node-manually.md#download-avalanchego) installed at `$GOPATH/src/github.com/ava-labs/avalanchego`. Each of the five nodes created is a validator. The staking keys for these nodes are in `$GOPATH/src/github.com/ava-labs/avalanchego/staking/local/staker1.crt`, etc.

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

## Next Step

Check out [Fund a Local Test Network](./fund-a-local-test-network.md).
