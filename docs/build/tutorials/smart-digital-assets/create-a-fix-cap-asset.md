# Create a Fixed-Cap Asset

## Introduction

This tutorial illustrates how Avalanche can be used to create and trade a fixed-cap, fungible asset. A specific quantity of the asset is created at the asset’s initialization, and then, no more is ever created.

Suppose there is an Income Sharing Agreement (ISA) with 10M shares, and no more shares are ever created. Let’s create an asset where one unit of the asset represents one share of the ISA.

## Requirements

You've completed [Run an Avalanche Node](../nodes-and-staking/run-avalanche-node.md) and are familiar with [Avalanche's architecture](../../../learn/platform-overview/README.md).

## Create the Asset

Our asset will exist on the [X-Chain](../../../learn/platform-overview/README.md#exchange-chain-x-chain), so to create our asset we’ll call `avm.createFixedCapAsset`, a method of the [X-Chain’s API](../../avalanchego-apis/x-chain.mdx).

The signature for this method is:

```
avm.createFixedCapAsset({
    name: string,
    symbol: string,
    denomination: int,  
    initialHolders: []{
        address: string,
        amount: int
    },
    from: []string,
    changeAddr: string,
    username: string,  
    password: string
}) ->
{
    assetID: string,
    changeAddr: string,
}
```

### Parameters

* `name` is a human-readable name for the asset. Not necessarily unique.
* `symbol` is a shorthand symbol for the asset. Between 0 and 4 characters. Not necessarily unique. May be omitted.
* `denomination` determines how balances of this asset are displayed by user interfaces. If denomination is 0, 100 units of this asset are displayed as 100. If denomination is 1, 100 units of this asset are displayed as 10.0. If denomination is 2, 100 units of this asset are displays as .100, etc.
* Performing a transaction on the X-Chain requires a transaction fee paid in AVAX. `username` and `password` denote the user paying the fee.
* Each element in `initialHolders` specifies that `address` holds `amount` units of the asset at genesis.
* `from` are the addresses that you want to use for this operation. If omitted, uses any of your addresses as needed.
* `changeAddr` is the address any change will be sent to. If omitted, change is sent to one of the addresses controlled by the user.

### Response

* `assetID` is the ID of the new asset.
* `changeAddr` in the result is the address where any change was sent.

Now, on to creating the asset. You’ll want to replace `address` with an address you control so that you will control all of the newly minted assets and be able to send it later in this tutorial.

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.createFixedCapAsset",
    "params" :{
        "name": "ISA Shares",
        "symbol":"ISAS",
        "denomination": 0,
        "initialHolders": [
            {
                "address": "X-avax10pvk9anjqrjfv2xudkdptza654695uwc8ecyg5",
                "amount": 10000000
            }
        ],
        "from":["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

The response contains the asset’s ID, which is also the ID of this transaction:

```json
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "assetID":"keMuoTQSGjqZbNVTCcbrwuNNNv9eEEZWBaRY3TapcgjkoZmQ1",
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

## Trade the Asset

### Check a balance

All 10,000,000 units of the asset (shares) are controlled by the address we specified in `initialHolders`.

To verify this, we call [`avm.getBalance`](../../avalanchego-apis/x-chain.mdx#avmgetbalance):

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-avax10pvk9anjqrjfv2xudkdptza654695uwc8ecyg5",
        "assetID":"keMuoTQSGjqZbNVTCcbrwuNNNv9eEEZWBaRY3TapcgjkoZmQ1"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

The response confirms that our asset creation was successful and that the expected address holds all 10,000,000 shares:

```json
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "balance":10000000
    }
}
```

### Send the asset

Now, let’s send 100 shares by calling [`avm.send`](../../avalanchego-apis/x-chain.mdx#avmsend).

To send the shares, we need to prove that we control the user the shares are being sent from. Therefore, this time we’ll need to fill in `username` and `password`.

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.send",
    "params" :{
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE",
        "assetID" :"keMuoTQSGjqZbNVTCcbrwuNNNv9eEEZWBaRY3TapcgjkoZmQ1",
        "amount"  :100,
        "to"      :"X-avax1t8sl0knfzly3t3sherctxwezy533ega3sxww2k"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

### Check the transaction status

The response from the above call should look like this:

```json
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"2EAgR1YbsaJrwFiU4DpwjUfTLkt97WrjQYYNQny13AheewnxSR",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

`txID` is the ID of the `send` transaction we sent to the network.

After a second or two, the transaction should be finalized. We can check the status of the transaction with [`avm.getTxStatus`](../../avalanchego-apis/x-chain.mdx#avmgettxstatus):

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getTxStatus",
    "params" :{
        "txID":"2EAgR1YbsaJrwFiU4DpwjUfTLkt97WrjQYYNQny13AheewnxSR"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

The response should look like this:

```json
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "status":"Accepted"
    }
}
```

You might also see that `status` is `Pending` if the network has not yet finalized it yet.

Now let’s check the balance of the `to` address:

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-avax1t8sl0knfzly3t3sherctxwezy533ega3sxww2k",
        "assetID":"keMuoTQSGjqZbNVTCcbrwuNNNv9eEEZWBaRY3TapcgjkoZmQ1"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

The response should be:

```json
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "balance":100
    }
}
```

## Wrapping up

In this tutorial, we:

* Called `createFixedCapAsset` to create a fixed cap asset
* Called `getBalance` to check address balances
* Called `send` to transfer a quantity of our asset

