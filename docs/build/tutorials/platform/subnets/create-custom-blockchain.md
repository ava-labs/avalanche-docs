---
sidebar_position: 5
---

# Create a Custom Blockchain

## Introduction

Avalanche supports creating blockchains with virtual machines in subnets. In this tutorial, we’ll create a custom blockchain using a custom Virtual Machine (Timestamp VM).

If you want a blockchain that has capabilities of X-Chain (AVM) or C-Chain (EVM), see [Create AVM Blockchain](create-avm-blockchain.md) and [Create EVM Blockchain](create-evm-blockchain.md) respectively.

_Note: IDs of Blockchains, Subnets, Transactions and Addresses can be different for each run/network. It means that some inputs, endpoints etc. in the tutorial can be different when you try._

### Prerequisites

You will need a running node, a user on the node, and some AVAX in the address controlled by the user. All of that is covered in the [Run an Avalanche Node](../../nodes-and-staking/run-avalanche-node.md) tutorial.

Next, you need to have your node be a validator on the [Primary Network](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network). You can find out how to do that in the [Add a Validator](../../nodes-and-staking/add-a-validator.md) tutorial. It is recommended you do that [with API calls](../../nodes-and-staking/add-a-validator.md#add-a-validator-with-api-calls), since that is the way you will be interacting with your node in the rest of this tutorial.

## Create the Virtual Machine

Every blockchain is an instance of a virtual machine. For example X-Chain is an instance of AVM and C-Chain is EVM's instance. Avalanche supports creating new blockchains (instances) from Virtual Machines. In this case we will use [Timestamp VM](https://github.com/ava-labs/timestampvm), which is an external VM plugin. Timestamp VM will communicate with our AvalancheGo node through RPC.

:::info
[Create a Virtual Machine (VM)](create-a-virtual-machine-vm.md)
:::

## Create the Subnet

Every blockchain is validated by a [subnet](README.md). Before you can create a blockchain, you’ll need a subnet to validate it. You can also use a subnet that already exists if you have a sufficient number of its control keys.

:::info
[Create a Subnet](create-a-subnet.md)
:::


### Add Validators to the Subnet

The subnet needs validators in it to, well, validate blockchains.

:::info
[Add a node to the Validator Set](../../nodes-and-staking/add-a-validator.md)
:::


### Create the Genesis Data {#create-the-genesis-data}

Each blockchain has some genesis state when it’s created. Each VM defines the format and semantics of its genesis data. TimestampVM uses CB58 encoded data as genesis data. There is `encode` and `decode` static API methods that can be used to encode/decode string data. See [TimestampVM API](create-a-virtual-machine-vm.md#api).

Let's generate a simple genesis data for TimestampVM:

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "timestampvm.encode",
    "params":{
        "data":"helloworld"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/vm/tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH
```

```json
{
  "jsonrpc": "2.0",
  "result": {
    "bytes": "fP1vxkpyLWnH9dD6BQA",
    "encoding": "cb58"
  },
  "id": 1
}
```

Our genesis data will be `fP1vxkpyLWnH9dD6BQA`.

## Create the Blockchain

Now let’s create the new blockchain. To do so, we call [`platform.createBlockchain`](../../../avalanchego-apis/p-chain.md#platformcreateblockchain). Your call should look like the one below. You have to change `subnetID` to the subnet that will validate your blockchain, and supply a `username` that controls a sufficient number of the subnet’s control keys. As a reminder, you can find out what a subnet’s threshold and control keys are by calling [`platform.getSubnets`](../../../avalanchego-apis/p-chain.md#platformgetsubnets).

Recall that we used `tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH` as our VM ID in [Create A Virtual Machine(VM)](create-a-virtual-machine-vm.md#vm-aliases).

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createBlockchain",
    "params" : {
        "subnetID": "KL1e8io1Zi2kr8cTXxvi321pAzfQuUa8tmBfadqpf9K2dc2TT",
        "vmID":"tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH",
        "name":"My new TSVM",
        "genesisData": "fP1vxkpyLWnH9dD6BQA",
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

The response contains the transaction ID:

```json
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

### Verify Success {#verify-success}

After a few seconds, the transaction to create our blockchain should have been accepted and the blockchain should exist (assuming the request was well-formed, etc.)

To check, call [`platform.getBlockchains`](../../../avalanchego-apis/p-chain.md#platformgetblockchains). This returns a list of all blockchains that exist.

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getBlockchains",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

The response confirms that the blockchain was created:

```json
{
    "jsonrpc": "2.0",
    "result": {
        "blockchains": [
            {
                "id": "AXerNQX7voY2AABaRdTAyXcawBURBR6thPRJp43LtPpZZi6Qz",
                "name": "X-Chain",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "jvYyfQTxGMJLuGWa55kdP2p2zSUYsQ5Raupu4TW34ZAUBAbtq"
            },
            {
                "id": "tZGm6RCkeGpVETUTp11DW3UYFZmm69zfqxchpHrSF7wgy8rmw",
                "name": "C-Chain",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "mgj786NP7uDwBCcq6YwThhaN8FLyybkCa4zBWTQbNgmK6k9A6"
            },
            {
                "id": "sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk",
                "name": "My new TSVM",
                "subnetID": "KL1e8io1Zi2kr8cTXxvi321pAzfQuUa8tmBfadqpf9K2dc2TT",
                "vmID": "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH"
            },
            {
                "id": "xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH",
                "name": "My new AVM",
                "subnetID": "KL1e8io1Zi2kr8cTXxvi321pAzfQuUa8tmBfadqpf9K2dc2TT",
                "vmID": "jvYyfQTxGMJLuGWa55kdP2p2zSUYsQ5Raupu4TW34ZAUBAbtq"
            }
        ]
    },
    "id": 1
}
```

### Validating the Blockchain {#validating-blockchain}

Every blockchain needs a set of validators to validate and process transactions on it. You can check if a node is validating a given blockchain by calling [`platform.getBlockchainStatus`](../../../avalanchego-apis/p-chain.md#platformgetblockchainstatus) on that node:

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getBlockchainStatus",
    "params" :{
        "blockchainID":"sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

```json
{
  "jsonrpc": "2.0",
  "result": {
    "status": "Validating"
  },
  "id": 1
}
```

If it responds `"Validating"`, the node is validating the given chain. If it responds `"Syncing"`, then the chain tracked by this node but it is not validating. If it responde `"Created"` then the chain exists but it is not being synced. Note that in order to validate or watch a subnet, you need to start your node with argument `--whitelisted-subnets=[subnet ID goes here]` (e.g. `--whitelisted-subnets=KL1e8io1Zi2kr8cTXxvi321pAzfQuUa8tmBfadqpf9K2dc2TT`) as well as add the node to the subnet's validator set.

More information can be found in the [Adding a Subnet Validator](../../nodes-and-staking/add-a-validator.md#adding-a-subnet-validator) tutorial.

## Interacting with the New Blockchain {#interact-with-the-new-blockchain}

You can interact with this new instance of the VM. The API endpoint of the blockchain is `127.0.0.1:9650/ext/bc/sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk`. The last part in the endpoint is the blockchain ID, which is `sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk`. Every blockchain ID is different from each other, so this is not a static ID. Your blockchain ID and the endpoint can be different.

You can also alias this chain ID with `timestampbc`, or whatever you like, for simpler API URLs. More information: [admin.aliasChain](https://docs.avax.network/build/avalanchego-apis/admin/#adminaliaschain)

### Verify Genesis Block

In the genesis we specified `fP1vxkpyLWnH9dD6BQA` as the genesis data. Let’s verify that:

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "timestampvm.getBlock",
    "params":{},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk
```

```json
{
    "jsonrpc": "2.0",
    "result": {
        "timestamp": "0",
        "data": "nyfJkNxEwKeQ9KpPducrm3jRaDzpPNJXUdZtgCWeMZTUxPqGp",
        "id": "24kWScv7DMA4LwdoFwmN1iRU3idyHRrrA2UxN9k6AuXihoK3mn",
        "parentID": "11111111111111111111111111111111LpoYY"
    },
    "id": 1
}
```

As you can see our first block has `timestamp: 0`. Also the parent ID (`11111111111111111111111111111111LpoYY`) is the P-chain's ID. Let's decode the genesis data with VM's static API method. Recall that our TimestampVM ID is aliased with `timestampvm`:

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "id"     : 1,
    "method" : "timestampvm.decode",
    "params" : {
        "bytes": "nyfJkNxEwKeQ9KpPducrm3jRaDzpPNJXUdZtgCWeMZTUxPqGp"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/vm/tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH
```

```json
{
    "jsonrpc": "2.0",
    "result": {
        "data":"helloworld",
        "encoding": "cb58"
    },
    "id": 1
}
```

We can see genesis data has the `helloworld` string.

### Propose New Block

We can propose new blocks to our blockchain with some data in it.

Let's get encoded data first. Blocks expect to have 32-length bytes. There is a `length` argument in encode method:

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "id"     : 1,
    "method" : "timestampvm.encode",
    "params" : {
        "data": "mynewblock",
        "length": 32
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/vm/tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH
```

Result:

```json
{
  "jsonrpc": "2.0",
  "result": {
    "bytes": "qDNkrS9xuyGmaAgdHAjbmANSvCKnK5BHvyCybJaFCAqx46Z8y",
    "encoding": "cb58"
  },
  "id": 1
}
```

Now we can propose a new block with the data:

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "timestampvm.proposeBlock",
    "params":{
        "data":"qDNkrS9xuyGmaAgdHAjbmANSvCKnK5BHvyCybJaFCAqx46Z8y"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk
```

Result:

```json
{
  "jsonrpc": "2.0",
  "result": {
    "Success": true
  },
  "id": 1
}
```

Let's check latest block to verify existence of our proposed block:

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "timestampvm.getBlock",
    "params":{},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk
```

Result:

```json
{
  "jsonrpc": "2.0",
  "result": {
    "timestamp": "1625674027",
    "data": "qDNkrS9xuyGmaAgdHAjbmANSvCKnK5BHvyCybJaFCAqx46Z8y",
    "id": "Br36bggr9vEEoNTNVPsSCD7QHHoCqE31Coui6uh1rA71EGPve",
    "parentID": "24kWScv7DMA4LwdoFwmN1iRU3idyHRrrA2UxN9k6AuXihoK3mn"
  },
  "id": 1
}
```

Result contains `data` field has `qDNkrS9xuyGmaAgdHAjbmANSvCKnK5BHvyCybJaFCAqx46Z8y`. This is the same data as our proposed data in the previous step.

