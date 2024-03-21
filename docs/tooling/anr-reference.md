---
tags: [Build, Tooling, Dapps]
description: The Avalanche Network Runner (ANR) allows a user to define, create and interact with a network of Avalanche nodes. It can be used for development and testing.
sidebar_label: ANR Commands
pagination_label: ANR Commands
---

# Avalanche Network Runner Commands

## Global Flags

- `--dial-timeout duration`      server dial timeout (default 10s)
- `--endpoint string`            server endpoint (default "localhost:8080")
- `--log-dir string`             log directory
- `--log-level string`           log level (default "INFO")
- `--request-timeout duration`   client request timeout (default 3m0s)

## Ping

Pings the server.

```sh
avalanche-network-runner ping [options] [flags]
```

### Example

```sh
avalanche-network-runner ping
```

```sh
curl --location --request POST 'http://localhost:8081/v1/ping'
```

## Server

Starts a network runner server.

```sh
avalanche-network-runner server [options] [flags]
```

### Flags

- `--dial-timeout duration` server dial timeout (default 10s)
- `--disable-grpc-gateway`true to disable grpc-gateway server (overrides `--grpc-gateway-port`)
- `--disable-nodes-output` true to disable nodes stdout/stderr
- `--grpc-gateway-port string` grpc-gateway server port (default ":8081")
- `--log-dir string` log directory
- `--log-level string` log level for server logs (default "INFO")
- `--port string` server port (default ":8080")
- `--snapshots-dir string` directory for snapshots

### Example

```sh
avalanche-network-runner server
```

## Control

Network runner control commands.

```sh
avalanche-network-runner control [command]
```

### `add-node`

Adds a new node to the network.

```sh
avalanche-network-runner control add-node node-name [options] [flags]
```

#### Flags

- `--avalanchego-path string` avalanchego binary path
- `--chain-configs string` [optional] JSON string of map from chain id to its config file contents
- `--node-config string` node config as string
- `--plugin-dir string` [optional] plugin directory
- `--subnet-configs string` [optional] JSON string of map from subnet id to its config file contents
- `--upgrade-configs string` [optional] JSON string of map from chain id to its upgrade file contents

#### Example

```sh
avalanche-network-runner control add-node node6
```

```sh
curl --location 'http://localhost:8081/v1/control/addnode' \
--header 'Content-Type: application/json' \
--data '{
  "name": "node6"
}'
```

### `add-permissionless-delegator`

Delegates to a permissionless validator in an elastic subnet.

```sh
avalanche-network-runner control add-permissionless-delegator permissionlessValidatorSpecs [options] [flags]
```

#### Example

```sh
avalanche-network-runner control add-permissionless-delegator '{"validatorSpec":[{"subnet_id":"p433wpuXyJiDhyazPYyZMJeaoPSW76CBZ2x7wrVPLgvokotXz","node_name":"node5","asset_id":"U8iRqJoiJm8xZHAacmvYyZVwqQx6uDNtQeP3CQ6fcgQk3JqnK","staked_token_amount":2000,"start_time":"2023-09-25 21:00:00","stake_duration":336}]}'
```

```sh
curl --location 'http://localhost:8081/v1/control/addpermissionlessdelegator' \
--header 'Content-Type: application/json' \
--data '{
    "validatorSpec": [
        {
          "subnet_id": "p433wpuXyJiDhyazPYyZMJeaoPSW76CBZ2x7wrVPLgvokotXz",
          "node_name": "node5",
          "asset_id": "U8iRqJoiJm8xZHAacmvYyZVwqQx6uDNtQeP3CQ6fcgQk3JqnK",
          "staked_token_amount": 2000,
          "start_time": "2023-09-25 21:00:00",
          "stake_duration": 336
        }
    ]
    
}'
```

### `add-permissionless-validator`

Adds a permissionless validator to elastic subnets.

```sh
avalanche-network-runner control add-permissionless-validator permissionlessValidatorSpecs [options] [flags]
```

#### Example

```sh
avalanche-network-runner control add-permissionless-validator '[{"subnet_id":"p433wpuXyJiDhyazPYyZMJeaoPSW76CBZ2x7wrVPLgvokotXz","node_name":"node5","staked_token_amount":2000,"asset_id":"U8iRqJoiJm8xZHAacmvYyZVwqQx6uDNtQeP3CQ6fcgQk3JqnK","start_time":"2023-09-25 21:00:00","stake_duration":336}]'
```

```sh
curl --location 'http://localhost:8081/v1/control/addpermissionlessvalidator' \
--header 'Content-Type: application/json' \
--data '{
  "validatorSpec": [
    {
      "subnetId":"p433wpuXyJiDhyazPYyZMJeaoPSW76CBZ2x7wrVPLgvokotXz",
      "nodeName":"node1", 
      "stakedTokenAmount": 2000, 
      "assetId": "U8iRqJoiJm8xZHAacmvYyZVwqQx6uDNtQeP3CQ6fcgQk3JqnK", 
      "startTime": "2023-05-25 21:00:00", 
      "stakeDuration": 336
    }
]}'
```

### `add-subnet-validators`

Adds subnet validators.

```sh
avalanche-network-runner control add-subnet-validators validatorsSpec [options] [flags]
```

#### Example

```sh
avalanche-network-runner control add-subnet-validators '[{"subnet_id": "p433wpuXyJiDhyazPYyZMJeaoPSW76CBZ2x7wrVPLgvokotXz", "node_names":["node1"]}]'
```

```sh
curl --location 'http://localhost:8081/v1/control/addsubnetvalidators' \
--header 'Content-Type: application/json' \
--data '[{"subnetId": "p433wpuXyJiDhyazPYyZMJeaoPSW76CBZ2x7wrVPLgvokotXz", "nodeNames":["node1"]}]'
```

### `attach-peer`

Attaches a peer to the node.

```sh
avalanche-network-runner control attach-peer node-name [options] [flags]
```

#### Example

```sh
avalanche-network-runner control attach-peer node5
```

```sh
curl --location 'http://localhost:8081/v1/control/attachpeer' \
--header 'Content-Type: application/json' \
--data '{
    "nodeName":"node5"
}'
```

### `create-blockchains`

Creates blockchains.

```sh
avalanche-network-runner control create-blockchains blockchain-specs [options] [flags]
```

#### Example

```sh
avalanche-network-runner control create-blockchains '[{"vm_name":"subnetevm","genesis":"/path/to/genesis.json", "subnet_id": "p433wpuXyJiDhyazPYyZMJeaoPSW76CBZ2x7wrVPLgvokotXz"}]'
```

```sh
curl --location 'http://localhost:8081/v1/control/createblockchains' \
--header 'Content-Type: application/json' \
--data '{
  "blockchainSpecs": [
    {
      "vm_name": "subnetevm",
      "genesis": "/path/to/genesis.json", 
      "subnet_id": "p433wpuXyJiDhyazPYyZMJeaoPSW76CBZ2x7wrVPLgvokotXz"
    }
  ]
}'
```

### `create-subnets`

Creates subnets.

```sh
avalanche-network-runner control create-subnets [options] [flags]
```

#### Example

```sh
avalanche-network-runner control create-subnets '[{"participants": ["node1", "node2", "node3", "node4", "node5"]}]'
```

```sh
curl --location 'http://localhost:8081/v1/control/createsubnets' \
--header 'Content-Type: application/json' \
--data '
{
    "participants": [
        "node1",
        "node2",
        "node3",
        "node4",
        "node5"
    ]
}'
```

### `elastic-subnets`

Transforms subnets to elastic subnets.

```sh
avalanche-network-runner control elastic-subnets elastic_subnets_specs [options] [flags]
```

#### Example

```sh
avalanche-network-runner control elastic-subnets '[{"subnet_id":"p433wpuXyJiDhyazPYyZMJeaoPSW76CBZ2x7wrVPLgvokotXz", "asset_name":"Avalanche", 
"asset_symbol":"AVAX", "initial_supply": 240000000, "max_supply": 720000000, "min_consumption_rate": 100000, 
"max_consumption_rate": 120000, "min_validator_stake": 2000, "max_validator_stake": 3000000, "min_stake_duration": 336, 
"max_stake_duration": 8760, "min_delegation_fee": 20000, "min_delegator_stake": 25, "max_validator_weight_factor": 5, 
"uptime_requirement": 800000}]'
```

```sh
curl -X POST -k http://localhost:8081/v1/control/transformelasticsubnets -d '{"elasticSubnetSpec": [{"subnetId":"p433wpuXyJiDhyazPYyZMJeaoPSW76CBZ2x7wrVPLgvokotXz","assetName":"Avalanche", "assetSymbol":"AVAX", "initialSupply": 240000000, "maxSupply": 720000000, "minConsumption_rate": 100000, "maxConsumption_rate": 120000, "minValidatorStake": 2000, "maxValidatorStake": 3000000, "minStakeDuration": 336, "maxStakeDuration": 8760, "minDelegationFee": 20000, "minDelegatorStake": 25, "maxValidatorWeightFactor": 5, "uptimeRequirement": 800000}]}'
```

### `get-snapshot-names`

Lists available snapshots.

```sh
avalanche-network-runner control get-snapshot-names [options] [flags]
```

#### Example

```sh
avalanche-network-runner control get-snapshot-names
```

```sh
curl --location --request POST 'http://localhost:8081/v1/control/getsnapshotnames' 
```

### `health`

Waits until local cluster is ready.

```sh
avalanche-network-runner control health [options] [flags]
```

#### Example

```sh
./build/avalanche-network-runner control health
```

```sh
curl --location --request POST 'http://localhost:8081/v1/control/health'
```

### `list-blockchains`

Lists all blockchain ids of the network.

```sh
avalanche-network-runner control list-blockchains [flags]
```

#### Example

```sh
avalanche-network-runner control list-blockchains
```

```sh
curl --location --request POST 'http://localhost:8081/v1/control/listblockchains'
```

### `list-rpcs`

Lists RPCs for all blockchains in the network.

#### Flags

```sh
avalanche-network-runner control list-rpcs [flags]
```

#### Example

```sh
avalanche-network-runner control list-rpcs
```

```sh
curl --location --request POST 'http://localhost:8081/v1/control/listrpcs'
```

### `list-subnets`

Lists all subnet ids of the network.

```sh
avalanche-network-runner control list-subnets [flags]
```

#### Example

```sh
avalanche-network-runner control list-subnets
```

```sh
curl --location --request POST 'http://localhost:8081/v1/control/listsubnets'
```

### `load-snapshot`

Loads a network snapshot.

```sh
avalanche-network-runner control load-snapshot snapshot-name [flags]

if the `AVALANCHEGO_EXEC_PATH` and `AVALANCHEGO_PLUGIN_PATH` env vars aren't set then you should pass them in as a flag
avalanche-network-runner control load-snapshot snapshotName --avalanchego-path /path/to/avalanchego/binary --plugin-dir /path/to/avalanchego/plugins
```

#### Flags

- `--avalanchego-path string`     avalanchego binary path
- `--chain-configs string`        [optional] JSON string of map from chain id to its config file contents
- `--global-node-config string`   [optional] global node config as JSON string, applied to all nodes
- `--plugin-dir string`           plugin directory
- `--reassign-ports-if-used`      true to reassign snapshot ports if already taken
- `--root-data-dir string`        root data directory to store logs and configurations
- `--subnet-configs string`       [optional] JSON string of map from subnet id to its config file contents
- `--upgrade-configs string`      [optional] JSON string of map from chain id to its upgrade file contents

#### Example

```sh
avalanche-network-runner control load-snapshot snapshot

```

```sh
curl --location 'http://localhost:8081/v1/control/loadsnapshot' \
--header 'Content-Type: application/json' \
--data '{
    "snapshotName":"snapshot"
}'

if the `AVALANCHEGO_EXEC_PATH` and `AVALANCHEGO_PLUGIN_PATH` env vars aren't set then you should pass them in to the curl
curl -X POST -k http://localhost:8081/v1/control/loadsnapshot -d '{"snapshotName":"node5","execPath":"/path/to/avalanchego/binary","pluginDir":"/path/to/avalanchego/plugins"}'
```

### `pause-node`

Pauses a node.

```sh
avalanche-network-runner control pause-node node-name [options] [flags]
```

#### Example

```sh
avalanche-network-runner control pause-node node5
```

```sh
curl --location 'http://localhost:8081/v1/control/pausenode' \
--header 'Content-Type: application/json' \
--data '{
  "name": "node5"
}'
```

### `remove-node`

Removes a node.

```sh
avalanche-network-runner control remove-node node-name [options] [flags]
```

#### Example

```sh
avalanche-network-runner control remove-node node5
```

```sh
curl --location 'http://localhost:8081/v1/control/removenode' \
--header 'Content-Type: application/json' \
--data '{
    "name":"node5"
}'
```

### `remove-snapshot`

Removes a network snapshot.

```sh
avalanche-network-runner control remove-snapshot snapshot-name [flags]
```

#### Example

```sh
avalanche-network-runner control remove-snapshot node5
```

```sh
curl --location 'http://localhost:8081/v1/control/removesnapshot' \
--header 'Content-Type: application/json' \
--data '{
    "snapshot_name":"node5"
}'
```

### `remove-subnet-validator`

Removes a subnet validator.

```sh
avalanche-network-runner control remove-subnet-validator removeValidatorSpec [options] [flags]
```

#### Example

```sh
avalanche-network-runner control remove-subnet-validator '[{"subnet_id": "p433wpuXyJiDhyazPYyZMJeaoPSW76CBZ2x7wrVPLgvokotXz", "node_names":["node1"]}]'
```

```sh
curl --location 'http://localhost:8081/v1/control/removesubnetvalidator' \
--header 'Content-Type: application/json' \
--data '[{"subnetId": "p433wpuXyJiDhyazPYyZMJeaoPSW76CBZ2x7wrVPLgvokotXz", "nodeNames":["node1"]}]'
```

### `restart-node`

Restarts a node.

```sh
avalanche-network-runner control restart-node node-name [options] [flags]
```

#### Flags

- `--avalanchego-path string`      avalanchego binary path
- `--chain-configs string`         [optional] JSON string of map from chain id to its config file contents
- `--plugin-dir string`            [optional] plugin directory
- `--subnet-configs string`        [optional] JSON string of map from subnet id to its config file contents
- `--upgrade-configs string`       [optional] JSON string of map from chain id to its upgrade file contents
- `--whitelisted-subnets string`   [optional] whitelisted subnets (comma-separated)

#### Example

```sh
avalanche-network-runner control restart-node \
--request-timeout=3m \
--log-level debug \
--endpoint="localhost:8080" \
node1 
```

```sh
curl --location 'http://localhost:8081/v1/control/restartnode' \
--header 'Content-Type: application/json' \
--data '{
  "name": "node5"
}'
```

### `resume-node`

Resumes a node.

```sh
avalanche-network-runner control resume-node node-name [options] [flags]
```

#### Example

```sh
avalanche-network-runner control resume-node node5
```

```sh
curl --location 'http://localhost:8081/v1/control/resumenode' \
--header 'Content-Type: application/json' \
--data '{
  "name": "node5"
}'
```

### `rpc_version`

Gets RPC server version.

```sh
avalanche-network-runner control rpc_version [flags]
```

#### Example

```sh
./build/avalanche-network-runner control rpc_version
```

```sh
curl --location --request POST 'http://localhost:8081/v1/control/rpcversion'
```

### `save-snapshot`

Saves a network snapshot.

```sh
avalanche-network-runner control save-snapshot snapshot-name [flags]
```

#### Example

```sh
avalanche-network-runner control save-snapshot snapshotName
```

```sh
curl --location 'http://localhost:8081/v1/control/savesnapshot' \
--header 'Content-Type: application/json' \
--data '{
    "snapshot_name":"node5"
}'
```

### `send-outbound-message`

Sends an outbound message to an attached peer.

```sh
avalanche-network-runner control send-outbound-message node-name [options] [flags]
```

#### Flags

- `--message-bytes-b64 string`   Message bytes in base64 encoding
- `--message-op uint32`          Message operation type
- `--peer-id string`             peer ID to send a message to

#### Example

```sh
avalanche-network-runner control send-outbound-message \
--request-timeout=3m \
--log-level debug \
--endpoint="localhost:8080" \
--node-name node1 \
--peer-id "7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg" \
--message-op=16 \
--message-bytes-b64="EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKgAAAAPpAqmoZkC/2xzQ42wMyYK4Pldl+tX2u+ar3M57WufXx0oXcgXfXCmSnQbbnZQfg9XqmF3jAgFemSUtFkaaZhDbX6Ke1DVpA9rCNkcTxg9X2EcsfdpKXgjYioitjqca7WA="
```

```sh
curl -X POST -k http://localhost:8081/v1/control/sendoutboundmessage -d '{"nodeName":"node1","peerId":"7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg","op":16,"bytes":"EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKgAAAAPpAqmoZkC/2xzQ42wMyYK4Pldl+tX2u+ar3M57WufXx0oXcgXfXCmSnQbbnZQfg9XqmF3jAgFemSUtFkaaZhDbX6Ke1DVpA9rCNkcTxg9X2EcsfdpKXgjYioitjqca7WA="}'
```

### `start`

Starts a network.

```sh
avalanche-network-runner control start [options] [flags]
```

#### Flags

- `--avalanchego-path string`                  avalanchego binary path
- `--blockchain-specs string`                  [optional] JSON string of array of [(VM name, genesis file path)]
- `--chain-configs string`                     [optional] JSON string of map from chain id to its config file contents
- `--custom-node-configs global-node-config`   [optional] custom node configs as JSON string of map, for each node individually. Common entries override global-node-config, but can be combined. Invalidates `number-of-nodes` (provide all node configs if used).
- `--dynamic-ports`                            true to assign dynamic ports
- `--global-node-config string`                [optional] global node config as JSON string, applied to all nodes
- `--number-of-nodes uint32`                   number of nodes of the network (default 5)
- `--plugin-dir string`                        [optional] plugin directory
- `--reassign-ports-if-used`                   true to reassign default/given ports if already taken
- `--root-data-dir string`                     [optional] root data directory to store logs and configurations
- `--subnet-configs string`                    [optional] JSON string of map from subnet id to its config file contents
- `--upgrade-configs string`                  [optional] JSON string of map from chain id to its upgrade file contents
- `--whitelisted-subnets string`               [optional] whitelisted subnets (comma-separated)

#### Example

```sh
avalanche-network-runner control start \
  --log-level debug \
  --endpoint="localhost:8080" \
  --number-of-nodes=5 \
  --blockchain-specs '[{"vm_name": "subnetevm", "genesis": "./path/to/config.json"}]'
```

```sh
curl --location 'http://localhost:8081/v1/control/start' \
--header 'Content-Type: application/json' \
--data '{
  "numNodes": 5,
  "blockchainSpecs": [
    {
      "vm_name": "subnetevm",
      "genesis": "/path/to/config.json"
    }
  ]
}'
```

### `status`

Gets network status.

```sh
avalanche-network-runner control status [options] [flags]
```

#### Example

```sh
./build/avalanche-network-runner control status
```

```sh
curl --location --request POST 'http://localhost:8081/v1/control/status'
```

### `stop`

Stops the network.

```sh
avalanche-network-runner control stop [options] [flags]
```

#### Example

```sh
avalanche-network-runner control stop
```

```sh
curl --location --request POST 'http://localhost:8081/v1/control/stop'
```

### `stream-status`

Gets a stream of network status.

```sh
avalanche-network-runner control stream-status [options] [flags]
```

#### Flags

- `--push-interval duration`   interval that server pushes status updates to the client (default 5s)

#### Example

```sh
avalanche-network-runner control stream-status
```

```sh
curl --location --request POST 'http://localhost:8081/v1/control/streamstatus'
```

### `uris`

Lists network uris.

```sh
avalanche-network-runner control uris [options] [flags]
```

#### Example

```sh
avalanche-network-runner control uris
```

```sh
curl --location --request POST 'http://localhost:8081/v1/control/uris'
```

### `vmid`

Returns the vm id associated to the given vm name.

```sh
avalanche-network-runner control vmid vm-name [flags]
```

#### Example

```sh
/build/avalanche-network-runner control vmid subnetevm
```

```sh
curl --location 'http://localhost:8081/v1/control/vmid' \
--header 'Content-Type: application/json' \
--data '{
    "vmName": "subnetevm"
}'
```

### `wait-for-healthy`

Waits until local cluster and custom vms are ready.

```sh
avalanche-network-runner control wait-for-healthy [options] [flags]
```

#### Example

```sh
./build/avalanche-network-runner control wait-for-healthy
```

```sh
curl --location --request POST 'http://localhost:8081/v1/control/waitforhealthy'
```
