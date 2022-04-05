---
sidebar_position: 1
---

# Create a Subnet

**Please checkout [subnet-cli](https://github.com/ava-labs/subnet-cli#subnet-cli-wizard) for the fast way to create a subnet.** You are welcome to read this document to understand how subnet is created.


## Introduction

A subnet is a set of validators. A subnet validates a set of blockchains. Each blockchain is validated by exactly one subnet, which is specified on blockchain creation. Subnets are a powerful primitive that allows the creation of permissioned blockchains.

When a subnet is created, a threshold and a set of keys are specified. (Actually the addresses of the keys, not the keys themselves, are specified.) In order to add a validator to that subnet, _threshold_ signatures from those keys are needed. We call these the subnet’s **control keys** and we call a control key’s signature on a transaction that adds a validator to a subnet a **control signature.** The upshot is that a subnet has control over its membership.

In this tutorial, we’ll create a new subnet with 2 control keys and a threshold of 2.

_Note: IDs of Blockchains, Subnets, Transactions and Addresses can be different for each run/network. It means that some inputs, endpoints etc. in the tutorial can be different when you try._

### Generate the Control Keys {#generate-the-control-keys}

First, let’s generate the 2 control keys. To do so we call [`platform.createAddress`](../../../avalanchego-apis/p-chain.md#platformcreateaddress) This generates a new private key and stores it for a user.

To generate the first key:

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createAddress",
    "params": {
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

This gives the first control key (again, it actually gives the _address_ of the first control key). The key is held by the user we just specified.

```json
{
    "jsonrpc": "2.0",
    "result": {
        "address": "P-avax1spnextuw2kfzeucj0haf0e4e08jd4499gn0zwg"
    },
    "id": 1
}
```

Generate the second key:

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createAddress",
    "params": {
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

The response contains the second control key, which is held by the user we just specified:

```json
{
    "jsonrpc": "2.0",
    "result": {
        "address": "P-avax1zg5uhuwfrf5tv852zazmvm9cqratre588qm24z"
    },
    "id": 1
}
```

### Create the Subnet {#create-the-subnet}

To create a subnet, we call [`platform.createSubnet`](../../../avalanchego-apis/p-chain.md#platformcreatesubnet).

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createSubnet",
    "params": {
        "controlKeys":[
            "P-avax1spnextuw2kfzeucj0haf0e4e08jd4499gn0zwg",
            "P-avax1zg5uhuwfrf5tv852zazmvm9cqratre588qm24z"
        ],
        "threshold":2,
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

The response gives us the transaction’s ID, which is also the ID of the newly created Subnet.

```json
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "3fbrm3z38NoDB4yMC3hg5pRvc72XqnAGiu7NgaEp1dwZ8AD9g",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

### Verifying Success {#verifying-success}

We can call [`platform.getSubnets`](../../../avalanchego-apis/p-chain.md#platformgetsubnets) to get all Subnets that exist:

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getSubnets",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

The response confirms that our subnet was created:

```json
{
    "jsonrpc": "2.0",
    "result": {
        "subnets": [
            {
                "id": "3fbrm3z38NoDB4yMC3hg5pRvc72XqnAGiu7NgaEp1dwZ8AD9g",
                "controlKeys": [
                    "KNjXsaA1sZsaKCD1cd85YXauDuxshTes2",
                    "Aiz4eEt5xv9t4NCnAWaQJFNz5ABqLtJkR"
                ],
                "threshold": "2"
            }
        ]
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

### Adding Subnet Validators  {#adding-subnet-validators}

### Issuing a Subnet Validator Transaction

Now let’s add a validator to a subnet. Right now you can only add validators to subnets with API calls, not with Avalanche Wallet.

Suppose that the Subnet has ID `3fbrm3z38NoDB4yMC3hg5pRvc72XqnAGiu7NgaEp1dwZ8AD9g`, threshold 2, and that `username` holds at least 2 control keys.

To add the validator, we’ll call API method [`platform.addSubnetValidator`](../../../avalanchego-apis/p-chain.md#platformaddsubnetvalidator). Its signature is:

```
platform.addSubnetValidator(
    {
        nodeID: string,
        subnetID: string,
        startTime: int,
        endTime: int,
        weight: int,
        changeAddr: string, (optional)
        username: string,
        password: string
    }
) -> {txID: string}
```

Let’s examine the parameters:

`nodeID`

This is the node ID of the validator being added to the subnet. **This validator must validate the Primary Network for the entire duration that it validates this Subnet.**

`subnetID`

This is the ID of the subnet we’re adding a validator to.

`startTime` and `endTime`

Similar to above, these are the Unix times that the validator will start and stop validating the subnet. `startTime` must be at or after the time that the validator starts validating the Primary Network, and `endTime` must be at or before the time that the validator stops validating the Primary Network.

`weight`

This is the validator’s sampling weight for consensus. If the validator’s weight is 1 and the cumulative weight of all validators in the subnet is 100, then this validator will be included in about 1 in every 100 samples during consensus. The cumulative weight of all validators in the subnet must be at least `snow-sample-size`. For example, if there is only one validator in the subnet, its weight must be at least `snow-sample-size` (default 20). Recall that a validator's weight can't be changed while it is validating, so take care to use an appropriate value.

`changeAddr`

Any change resulting from this transaction will be sent to this address. You can leave this field empty; if you do, change will be sent to one of the addresses your user controls.

`username` and `password`

These parameters are the username and password of the user that pays the transaction fee. This user must hold a sufficient number of this Subnet’s control keys in order to add a validator to this Subnet.

We use the shell command `date` to compute the Unix time 10 minutes and 30 days in the future to use as the values of `startTime` and `endTime`, respectively. (Note: If you’re on a Mac, replace `$(date` with `$(gdate`. If you don’t have `gdate` installed, do `brew install coreutils`.)

Example:

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.addSubnetValidator",
    "params": {
        "nodeID":"NodeID-LMUue2dBBRWdDbPL4Yx47Ps31noeewJji",
        "subnetID":"3fbrm3z38NoDB4yMC3hg5pRvc72XqnAGiu7NgaEp1dwZ8AD9g",
        "startTime":'$(date --date="10 minutes" +%s)',
        "endTime":'$(date --date="30 days" +%s)',
        "weight":30,
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

The response has the transaction ID, as well as the address the change went to.

```json
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2exafyvRNSE5ehwjhafBVt6CTntot7DFjsZNcZ54GSxBbVLcCm",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

We can check the transaction’s status by calling [`platform.getTxStatus`](../../../avalanchego-apis/p-chain.md#platformgettxstatus):

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTxStatus",
    "params": {
        "txID":"2exafyvRNSE5ehwjhafBVt6CTntot7DFjsZNcZ54GSxBbVLcCm"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

The status should be `Committed`, meaning the transaction was successful. We can call [`platform.getPendingValidators`](../../../avalanchego-apis/p-chain.md#platformgetpendingvalidators) and see that the node is now in the pending validator set for the Primary Network. This time, we specify the subnet ID:

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {"subnetID":"3fbrm3z38NoDB4yMC3hg5pRvc72XqnAGiu7NgaEp1dwZ8AD9g"},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

The response should include the node we just added:

```json
{
    "jsonrpc": "2.0",
    "result": {
        "validators": [
            {
                "nodeID": "NodeID-LMUue2dBBRWdDbPL4Yx47Ps31noeewJji",
                "startTime":1584042912,
                "endTime":1584121156,
                "weight": "30"
            }
        ]
    },
    "id": 1
}
```

When the time reaches `1584042912`, this node will start validating this Subnet. When it reaches `1584121156`, this node will stop validating this Subnet.

### Whitelisting the Subnet

Now that the node has been added as a validator of the subnet, let’s add it to the whitelist of subnets. Nodes must whitelist subnet IDs they want to join. The whitelist prevents the node from validating a subnet unintentionally.

To whitelist the subnet, restart the node and add the parameter `--whitelisted-subnets` with a comma separated list of subnets to whitelist.

In this example the full command is:

`./build/avalanchego --whitelisted-subnets=3fbrm3z38NoDB4yMC3hg5pRvc72XqnAGiu7NgaEp1dwZ8AD9g`

For more information about the command see: [whitelisted-subnet command-line argument](../../../references/avalanchego-config-flags.md#whitelist).

### Private Subnets

Avalanche subnets are public. It means that every node can sync and listen ongoing transactions/blocks in subnets, even they're not validating the listened subnet.

Subnet validators/beacons can choose not to publish contents of blockchains via an optional `validatorOnly` configuration. The configuration can be turned on with [Subnet Configs](../../../references/avalanchego-config-flags.md#subnet-configs). If a node sets `validatorOnly` to `true`, the node exchanges messages only with this subnet's validators. Other peers will not be able to learn contents of this subnet from this node.

Note: This is a node-specific configuration. Every validator of this subnet has to use this configuration in order to create a full private subnet.