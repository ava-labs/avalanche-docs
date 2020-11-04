# Create a Subnet

## Introduction

A [subnet](../../../learn/platform-overview/#subnets) is a set of validators. A subnet validates a set of blockchains. Each blockchain is validated by exactly one subnet, which is specified on blockchain creation. Subnets are a powerful primitive that allows the creation of permissioned blockchains.

When a subnet is created, a threshold and a set of keys are specified. \(Actually the addresses of the keys, not the keys themselves, are specified.\) In order to add a validator to that subnet, _threshold_ signatures from those keys are needed. We call these the subnet’s **control keys** and we call a control key’s signature on a transaction that adds a validator to a subnet a **control signature.** The upshot is that a subnet has control over its membership.

In this tutorial, we’ll create a new subnet with 2 control keys and a threshold of 2.

### Generate the Control Keys <a id="generate-the-control-keys"></a>

First, let’s generate the 2 control keys. To do so we call [`platform.createAddress`](https://docs.avax-dev.network/build/apis/platform-chain-p-chain-api#platform-createaddress) This generates a new private key and stores it for a user.

To generate the first key:

```text
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

This gives the first control key \(again, it actually gives the _address_ of the first control key\). The key is held by the user we just specified.

```text
{
    "jsonrpc": "2.0",
    "result": {
        "address": "P-avax1spnextuw2kfzeucj0haf0e4e08jd4499gn0zwg"
    },
    "id": 1
}
```

Generate the second key:

```text
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

```text
{
    "jsonrpc": "2.0",
    "result": {
        "address": "P-avax1zg5uhuwfrf5tv852zazmvm9cqratre588qm24z"
    },
    "id": 1
}
```

### Create the Subnet <a id="create-the-subnet"></a>

To create a subnet, we call [`platform.createSubnet`](https://docs.avax-dev.network/build/apis/platform-chain-p-chain-api#platform-createsubnet).

```text
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

```text
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "3fbrm3z38NoDB4yMC3hg5pRvc72XqnAGiu7NgaEp1dwZ8AD9g",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

### Verifying Success <a id="verifying-success"></a>

We can call [`platform.getSubnets`](https://docs.avax-dev.network/build/apis/platform-chain-p-chain-api#platform-getsubnets) to get all Subnets that exist:

```text
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getSubnets",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

The response confirms that our subnet was created:

```text
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

### Add Validators to the Subnet <a id="add-validators-to-the-subnet"></a>

This [tutorial](add-a-validator.md) will show you how to add validators to a subnet.

