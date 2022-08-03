# Avalanche Network Runner

The Avalanche Network Runner **(ANR)** allows a user to define, create and interact with a network of Avalanche nodes. It can be used for development and testing.

Developing P2P systems is hard, and blockchains are no different. A developer can't just focus on the functionality of a node, but needs to consider the dynamics of the network, the interaction of nodes and emergent system properties. A lot of testing can't be addressed by unit testing, but needs a special kind of integration testing, where the code runs in interaction with other nodes, attempting to simulate real network scenarios.

In the context of avalanche, **[subnets](../subnets/README.md)** are a special focus which requires new tooling and support for playing, working and testing with this unique feature of the Avalanche ecosystem.

The ANR aims at being a tool for developers and system integrators alike, offering functionality to run networks of avalanchego nodes with support for custom node, Subnet and network configurations, allowing to locally test code before deploying to mainnet or even public testnets like `fuji`.

**Note that this tool is not for running production nodes, and that because it is being heavily developed right now, documentation might differ slightly from the actual code.**

## Installation

The Avalanche Network Runner repository is hosted at [https://github.com/ava-labs/avalanche-network-runner](https://github.com/ava-labs/avalanche-network-runner).

That repository's README details the tool.

Clone the repository with:

```bash
git clone https://github.com/ava-labs/avalanche-network-runner.git
```

There are also binary releases ready to use at [releases](https://github.com/ava-labs/avalanche-network-runner/releases).

To build and install the binary locally (requires `golang` to be installed. Check the [requirements](https://github.com/ava-labs/avalanchego#installation) for the minimum version):

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

## Usage

There are two main ways to use the network-runner:

- Run ANR as a binary

  This is the recommended approach for most use cases. Doesn't require golang installation and provides a RPC server with an HTTP API and a client library for easy interaction.

- Import this repository into your go program

  This allows for custom network scenarios and high flexibility, but requires more code to be written.

Running the binary, the user can send requests to the RPC server in order to start a network, create Subnets, add nodes to the network, remove nodes from the network, restart nodes, etc. You can make requests through the `avalanche-network-runner` command or by making API calls. Requests are "translated" into gRPC and sent to the server.

Each node can then also be reached via [api](https://github.com/ava-labs/avalanche-network-runner/tree/main/api) endpoints which each node exposes.

The following diagram is a simplified view of the high level architecture of the tool:
![ANR architecture](/img/grpc-networkrunner.svg)

## Examples

When running with the binary, ANR runs a server process as an RPC server which then waits for API calls and handles them.
Therefore we run one shell with the RPC server, and another one for issuing calls.

### Start the server

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

### Run queries

#### ping the server

```bash
curl -X POST -k http://localhost:8081/v1/ping -d ''
```

or

```bash
avalanche-network-runner ping \
--log-level debug \
--endpoint="0.0.0.0:8080"
```

#### start a new Avalanche network with five nodes (a cluster)

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

Additional optional parameters which can be passed to the start command:

```bash
  --plugin-dir ${AVALANCHEGO_PLUGIN_PATH} \
	--custom-vms '{"subnetevm":"/tmp/subnet-evm.genesis.json"}'
	--global-node-config '{"index-enabled":false, "api-admin-enabled":true,"network-peer-list-gossip-frequency":"300ms"}'
	--custom-node-configs" '{"node1":{"log-level":"debug","api-admin-enabled":false},"node2":{...},...}'
```

`--plugin-dir` and `--custom-vms` are parameters relevant to Subnet operation.
See the [Subnet section](#network-runner-rpc-server-subnet-evm-example) for details about how to run Subnets.

The network-runner supports avalanchego node configuration at different levels.

1. If neither `--global-node-config` nor `--custom-node-configs` is supplied, all nodes get a standard set of config options. Currently this set contains:
   ```json
   {
     "network-peer-list-gossip-frequency": "250ms",
     "network-max-reconnect-delay": "1s",
     "public-ip": "127.0.0.1",
     "health-check-frequency": "2s",
     "api-admin-enabled": true,
     "api-ipcs-enabled": true,
     "index-enabled": true
   }
   ```
2. `--global-node-config` is a JSON string representing a _single_ avalanchego config, which will be applied to **all nodes**. This makes it easy to define common properties to all nodes. Whatever is set here will be _combined_ with the standard set above.
3. `--custom-node-configs` is a map of JSON strings representing the _complete_ network with individual configs. This allows to configure each node independently. If set, `--number-of-nodes` will be **ignored** to avoid conflicts.
4. The configs can be combined and will be merged, i.e. one could set global `--global-node-config` entries applied to each node, and also set `--custom-node-configs` for additional entries.
5. Common `--custom-node-configs` entries override `--global-node-config` entries which override the standard set.
6. The following entries will be **ignored in all cases** because the network-runner needs to set them internally to function properly:
   ```bash
     --log-dir
     --db-dir
     --http-port
     --staking-port
     --public-ipc
   ```

#### wait for all the nodes in the cluster to become healthy

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

#### get API endpoints of all nodes in the cluster

```bash
curl -X POST -k http://localhost:8081/v1/control/uris -d ''
```

or

```bash
avalanche-network-runner control uris \
--log-level debug \
--endpoint="0.0.0.0:8080"
```

#### query cluster status from the server

```bash
curl -X POST -k http://localhost:8081/v1/control/status -d ''
```

or

```bash
avalanche-network-runner control status \
--log-level debug \
--endpoint="0.0.0.0:8080"
```

#### stream cluster status

```bash
avalanche-network-runner control \
--request-timeout=3m \
stream-status \
--push-interval=5s \
--log-level debug \
--endpoint="0.0.0.0:8080"
```

#### remove (stop) a node

```bash
curl -X POST -k http://localhost:8081/v1/control/removenode -d '{"name":"node5"}'
```

or

```bash
avalanche-network-runner control remove-node \
--request-timeout=3m \
--log-level debug \
--endpoint="0.0.0.0:8080" \
--node-name node5
```

#### restart a node

In this example we are stopping the node named `node1`.

**Note**: By convention all node names start with `node` and a number. We suggest to stick to this convention to avoid issues.

```bash
# e.g., ${HOME}/go/src/github.com/ava-labs/avalanchego/build/avalanchego
AVALANCHEGO_EXEC_PATH="avalanchego"
```

Note that you can restart the node with a different binary by providing

```bash
curl -X POST -k http://localhost:8081/v1/control/restartnode -d '{"name":"node1","execPath":"'${AVALANCHEGO_EXEC_PATH}'","logLevel":"INFO"}'
```

or

```bash
avalanche-network-runner control restart-node \
--request-timeout=3m \
--log-level debug \
--endpoint="0.0.0.0:8080" \
--node-name node1 \
--avalanchego-path ${AVALANCHEGO_EXEC_PATH}
```

#### add a node

In this example we are adding a node named `node99`.

```bash
# e.g., ${HOME}/go/src/github.com/ava-labs/avalanchego/build/avalanchego
AVALANCHEGO_EXEC_PATH="avalanchego"
```

Note that you can add the new node with a different binary by providing

```bash
curl -X POST -k http://localhost:8081/v1/control/addnode -d '{"name":"node99","execPath":"'${AVALANCHEGO_EXEC_PATH}'","logLevel":"INFO"}'
```

or

```bash
avalanche-network-runner control add-node \
--request-timeout=3m \
--log-level debug \
--endpoint="0.0.0.0:8080" \
--node-name node99 \
--avalanchego-path ${AVALANCHEGO_EXEC_PATH}
```

It's also possible to provide custom parameters, similar to starting the network:

```bash
	--node-config '{"index-enabled":false, "api-admin-enabled":true,"network-peer-list-gossip-frequency":"300ms"}'
	--custom-vms '{"subnetevm":"/tmp/subnet-evm.genesis.json"}'
```

`--node-config` allows to specify specific avalanchego config parameters to the new node.
See [here](../nodes/maintain/avalanchego-config-flags.md) for the reference of supported flags.

**Note**: The following parameters will be _ignored_ if set in `--node-config`, because the network runner needs to set its own in order to function properly:
`--log-dir`
`--db-dir`

`--custom-vms` allows to configure custom VMs supported by this node.
See the [Subnet section](#network-runner-rpc-server-subnet-evm-example) for details about how to run Subnets.

**Note**: The following Subnet parameters will be set from the global network configuration to this node:
`--whitelisted-subnets`
`--plugin-dir`

#### terminate the cluster

Note that this will still require to stop your RPC server process with `Ctrl-C` to free the shell.

```bash
curl -X POST -k http://localhost:8081/v1/control/stop -d ''
```

or

```bash
avalanche-network-runner control stop \
--log-level debug \
--endpoint="0.0.0.0:8080"
```

## Subnets

ANR can be a great helper tool working with Subnets. We recommend using it to develop and test new Subnets before deploying them in public networks.
For general Subnet documentation, please refer to [subnets](../subnets).
These examples expect a basic understanding of what Subnets are and their usage.

### RPC server `subnet-evm` example

The Subnet EVM is a simplified version of Coreth VM (C-Chain).
This chain implements the Ethereum Virtual Machine and supports Solidity smart-contracts as well as most other Ethereum client functionality.
It can be used to create your own fully Ethereum-compatible Subnet running on Avalanche. This means you can run your Ethereum-compatible dApps in custom Subnets, defining your own gas limits and fees, and deploying solidity smart-contracts while taking advantage of Avalanche's validator network, fast finality, consensus mechanism and other features. Essentially, think of it as your own Ethereum where you can concentrate on your business case rather than the infrastructure. See [subnet-evm](https://github.com/ava-labs/subnet-evm) for further information.

### subnet-cli

**At this moment the ANR requires an additional tool, [`subnet-cli`](../subnets/subnet-cli.md), to be able to create the necessary configuration to deploy a Subnet in a local custom test-network. Generally, getting a Subnet up and running requires a series of manual steps. We are working hard to make this experience smoother and allow for transparent Subnet definition and creation with improved tooling. Please stand-by.** Suggestions are highly appreciated!

Install and start the RPC server just as in [start the server](#start-the-server)
Make sure the server is up:

```bash
curl -X POST -k http://localhost:8081/v1/ping -d ''
```

#### start the cluster with custom VMs

First, download/install `subnet-cli`:

```bash
# or download from https://github.com/ava-labs/subnet-cli/releases
cd ${HOME}/go/src/github.com/ava-labs/subnet-cli
go install -v .
```

Create a VM ID:

```bash
subnet-cli create VMID subnetevm
# srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy
```

Build or...

```bash
rm -rf ${HOME}/go/src/github.com/ava-labs/avalanchego/build
cd ${HOME}/go/src/github.com/ava-labs/avalanchego
./scripts/build.sh
```

...[download](https://github.com/ava-labs/avalanchego/releases) `avalanchego` (if not done already)

Clone and build the `subnet-evm` plugin (requires `golang` installation):

```bash
git clone https://github.com/ava-labs/subnet-evm ${HOME}/go/src/github.com/ava-labs/subnet-evm
cd ${HOME}/go/src/github.com/ava-labs/subnet-evm
go build -v \
-o ${HOME}/go/src/github.com/ava-labs/avalanchego/build/plugins/srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy \
./plugin
```

Verify everything has been built correctly:

```bash
find ${HOME}/go/src/github.com/ava-labs/avalanchego/build
# should yield something like:
# .../build
# .../build/plugins
# .../build/plugins/srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy
# .../build/plugins/evm
# .../build/avalanchego
```

Generate the genesis for the custom VM

```bash
export CHAIN_ID=99999
export GENESIS_ADDRESS="0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"
cat <<EOF > /tmp/subnet-evm.genesis.json
{
  "config": {
    "chainId": $CHAIN_ID,
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
      "gasLimit": 20000000,
      "minBaseFee": 1000000000,
      "targetGas": 100000000,
      "baseFeeChangeDenominator": 48,
      "minBlockGasCost": 0,
      "maxBlockGasCost": 10000000,
      "targetBlockRate": 2,
      "blockGasCostStep": 500000
    }
  },
  "alloc": {
    "${GENESIS_ADDRESS}": {
      "balance": "0x52B7D2DCC80CD2E4000000"
    }
  },
  "nonce": "0x0",
  "timestamp": "0x0",
  "extraData": "0x00",
  "gasLimit": "0x1312D00",
  "difficulty": "0x0",
  "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "coinbase": "0x0000000000000000000000000000000000000000",
  "number": "0x0",
  "gasUsed": "0x0",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
}
EOF
cat /tmp/subnet-evm.genesis.json
```

Set some environment variables for convenience:

```bash
# replace execPath with the path to AvalancheGo on your machine
AVALANCHEGO_EXEC_PATH="${HOME}/go/src/github.com/ava-labs/avalanchego/build/avalanchego"
AVALANCHEGO_PLUGIN_PATH="${HOME}/go/src/github.com/ava-labs/avalanchego/build/plugins"
```

Now start the nodes with custom VM support.
For this, we need to point set the `custom-vms` parameter (a map) to contain the genesis and the vm name:

```bash
curl -X POST -k http://localhost:8081/v1/control/start -d '{"execPath":"'${AVALANCHEGO_EXEC_PATH}'","numNodes":5,"logLevel":"INFO","pluginDir":"'${AVALANCHEGO_PLUGIN_PATH}'","customVms":{"subnetevm":"/tmp/subnet-evm.genesis.json"}}'
```

or

```bash
avalanche-network-runner control start \
--log-level debug \
--endpoint="0.0.0.0:8080" \
--avalanchego-path ${AVALANCHEGO_EXEC_PATH} \
--plugin-dir ${AVALANCHEGO_PLUGIN_PATH} \
--custom-vms '{"subnetevm":"/tmp/subnet-evm.genesis.json"}'
```

Check it all up:

```bash
# to get cluster information including blockchain ID
curl -X POST -k http://localhost:8081/v1/control/status -d ''
```

DONE! You are now running your very own Ethereum blockchain on Avalanche!

### RPC server `blobvm` example

While above we configured and deployed an Ethereum compatible Subnet, Avalanche supports deploying your completely custom blockchain, still taking advantage of existing Avalanche infrastructure and its consensus protocol.

A custom blockchain requires your custom VM. In this tutorial we are going to deploy a custom VM with a Subnet. The process is very similar to the `subnet-evm` one, except that the VM is different. We will also need the `subnet-cli` tool for this tutorial, check [this](#subnet-cli) for some context.

The VM we are going to use here is the [blobvm](https://github.com/ava-labs/blobvm). This is a simple VM which enables content-addressable storage of arbitrary keys/values using any EIP-712 compatible wallet.

Install and start the RPC server just as in [start the server](#start-the-server)
Make sure the server is up:

```bash
curl -X POST -k http://localhost:8081/v1/ping -d ''
```

First, download/install `subnet-cli`:

```bash
# or download from https://github.com/ava-labs/subnet-cli/releases
cd ${HOME}/go/src/github.com/ava-labs/subnet-cli
go install -v .
```

Create a VM ID:

```bash
subnet-cli create VMID blobvm
# kM6h4LYe3AcEU1MB2UNg6ubzAiDAALZzpVrbX8zn3hXF6Avd8
```

Build or...

```bash
rm -rf ${HOME}/go/src/github.com/ava-labs/avalanchego/build
cd ${HOME}/go/src/github.com/ava-labs/avalanchego
./scripts/build.sh
```

...[download](https://github.com/ava-labs/avalanchego/releases) `avalanchego` (if not done already)

Clone and build the `blobvm` plugin (requires `golang` installation):

```bash
git clone https://github.com/ava-labs/blobvm ${HOME}/go/src/github.com/ava-labs/blobvm
cd ${HOME}/go/src/github.com/ava-labs/blobvm
go build -v \
-o ${HOME}/go/src/github.com/ava-labs/avalanchego/build/plugins/kM6h4LYe3AcEU1MB2UNg6ubzAiDAALZzpVrbX8zn3hXF6Avd8 \
./cmd/blobvm
```

Verify everything has been built correctly:

```bash
find ${HOME}/go/src/github.com/ava-labs/avalanchego/build
# should yield something like:
# .../build
# .../build/plugins
# .../build/plugins/kM6h4LYe3AcEU1MB2UNg6ubzAiDAALZzpVrbX8zn3hXF6Avd8
# .../build/plugins/evm
# .../build/avalanchego
```

Every VM needs a genesis file in order to be deployed on Avalanche.
For the blobvm, the file is very simple, and that repository contains a helper tool to create it:

```bash
# generate the genesis for the custom VM
cd ${HOME}/go/src/github.com/ava-labs/blobvm
go install -v ./cmd/blob-cli
echo "[]" > /tmp/alloc.json
blob-cli genesis 1 /tmp/alloc.json --genesis-file /tmp/blobvm.genesis.json
# print contents
cat /tmp/blobvm.genesis.json
```

Set some environment variables for convenience:

```bash
# replace execPath with the path to AvalancheGo on your machine
AVALANCHEGO_EXEC_PATH="${HOME}/go/src/github.com/ava-labs/avalanchego/build/avalanchego"
AVALANCHEGO_PLUGIN_PATH="${HOME}/go/src/github.com/ava-labs/avalanchego/build/plugins"
```

Now start the nodes with custom VM support.
For this, we need to point set the `custom-vms` parameter (a map) to contain the genesis and the vm name:

```bash
curl -X POST -k http://localhost:8081/v1/control/start -d '{"execPath":"'${AVALANCHEGO_EXEC_PATH}'","numNodes":5,"logLevel":"INFO","pluginDir":"'${AVALANCHEGO_PLUGIN_PATH}'","customVms":{"blobvm":"/tmp/blobvm.genesis.json"}}'
```

or

```bash
avalanche-network-runner control start \
--log-level debug \
--endpoint="0.0.0.0:8080" \
--avalanchego-path ${AVALANCHEGO_EXEC_PATH} \
--plugin-dir ${AVALANCHEGO_PLUGIN_PATH} \
--custom-vms '{"blobvm":"/tmp/blobvm.genesis.json"}'
```

Check it all up:

```bash
# to get cluster information including blockchain ID
curl -X POST -k http://localhost:8081/v1/control/status -d ''
```

DONE! You are now running your very own custom blockchain!

## Using Avalanche Network as a Library

The Avalanche Network Runner can also be imported as a library into your programs so that you can use it to programmatically start, interact with and stop Avalanche networks. For an example of using the Network Runner in a program, see an [example](https://github.com/ava-labs/avalanche-network-runner/blob/main/examples/local/fivenodenetwork/main.go).

Creating a network is as simple as:

```go
network, err := local.NewDefaultNetwork(log, binaryPath)
```

where `log` is a logger of type [logging.Logger](https://github.com/ava-labs/avalanchego/blob/master/utils/logging/logger.go#L12) and `binaryPath` is the path of the AvalancheGo binary that each node that exists on network startup will run.

For example, the below snippet creates a new network using default configurations, and each node in the network runs the binaries at `/home/user/go/src/github.com/ava-labs/avalanchego/build`:

```go
network, err := local.NewDefaultNetwork(log,"/home/user/go/src/github.com/ava-labs/avalanchego/build")
```

**Once you create a network, you must eventually call `Stop()` on it to make sure all of the nodes in the network stop.** Calling this method kills all of the Avalanche nodes in the network. You probably want to call this method in a `defer` statement to make sure it runs.

To wait until the network is ready to use, use the network's `Healthy` method. It returns a channel which will be notified when all nodes are healthy.

Each node has a unique name. Use the network's `GetNodeNames()` method to get the names of all nodes.

Use the network's method `GetNode(string)` to get a node by its name. For example:

```go
names, _ := network.GetNodeNames()
node, _ := network.GetNode(names[0])
```

Then you can make API calls to the node:

```go
id, _ := node.GetAPIClient().InfoAPI().GetNodeID() // Gets the node's node ID
balance, _ := node.GetAPIClient().XChainAPI().GetBalance(address,assetID,false) // Pretend these arguments are defined
```

After a network has been created and is healthy, you can add or remove nodes to/from the network:

```
newNode, _ := network.AddNode(nodeConfig)
err := network.RemoveNode(names[0])
```

Where `nodeConfig` is a struct which contains information about the new node to be created.
For a local node, the most important elements are its name, its binary path and its identity, given by a TLS key/cert.

You can create a network where nodes are running different binaries -- just provide different binary paths to each:

```go
  stakingCert, stakingKey, err := staking.NewCertAndKeyBytes()
  if err != nil {
   return err
  }
  nodeConfig := node.Config{
    Name: "New Node",
    ImplSpecificConfig: local.NodeConfig{
      BinaryPath: "/tmp/my-avalanchego/build",
    },
    StakingKey:  stakingKey,
    StakingCert: stakingCert,
  }
```

After adding a node, you may want to call the network's `Healthy` method again and wait until the new node is healthy before making API calls to it.

### Creating Custom Networks

To create custom networks, pass a custom config (the second parameter) to the `local.NewNetwork(logging.Logger, network.Config)` function. The config defines the number of nodes when the network starts, the genesis state of the network, and the configs for each node.

Please refer to [NetworkConfig](https://github.com/ava-labs/avalanche-network-runner#network-creation) for more details.
