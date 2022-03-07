# Create a Variable-Cap Asset

## Introduction

This tutorial illustrates how to create a variable-cap, fungible asset. No units of the asset exist when the asset is initialized, but more units of the asset may be minted. On asset creation, we specify which sets of addresses may mint more units.

You may be wondering why we specify _sets_ of addresses that can mint more units of the asset rather than a single address. Here's why:

* **Security:** if only one address can mint more of the asset, and the private key for that address is lost, no more units can ever be minted. Similarly, if only one address can mint more of the asset, nothing stops the holder of that address from unilaterally minting as much as they want.
* **Flexibility:** it’s nice to be able to encode logic like, "Alice can unilaterally mint more units of this asset, or 2 of Dinesh, Ellin, and Jamie can together mint more."

Suppose that we want to issue an asset that represents shares of a corporation. No shares exist to start with, but more shares may be created later. Let’s create such an asset.

## Requirements

You've completed [Run an Avalanche Node](../nodes-and-staking/run-avalanche-node.md) and are familiar with [Avalanche's architecture](../../../learn/platform-overview/README.md).

## Create the Asset

Our asset will exist on the X-Chain, so to create our asset we’ll call [`avm.createVariableCapAsset`](../../avalanchego-apis/x-chain.mdx#avmcreatevariablecapasset), which is a method of the [X-Chain’s API](../../avalanchego-apis/x-chain.mdx).

The signature for this method is:

```
avm.createVariableCapAsset({
    name: string,
    symbol: string,
    denomination: int,
    minterSets []{
        minters: []string,
        threshold: int
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

* `name` is a human-readable name for our asset. Not necessarily unique. Between 0 and 128 characters.
* `symbol` is a shorthand symbol for this asset. Between 0 and 4 characters. Not necessarily unique. May be omitted.
* `denomination` determines how balances of this asset are displayed by user interfaces. If denomination is 0, 100 units of this asset are displayed as 100. If denomination is 1, 100 units of this asset are displayed as 10.0. If denomination is 2, 100 units of this asset are displays as .100, etc.
* `minterSets` is a list where each element specifies that `threshold` of the addresses in `minters` may together mint more of the asset by signing a minting transaction.
* Performing a transaction on the X-Chain requires a transaction fee paid in AVAX. `username` and `password` denote the user paying the fee.
* `from` are the addresses that you want to use for this operation. If omitted, uses any of your addresses as needed.
* `changeAddr` is the address any change will be sent to. If omitted, change is sent to one of the addresses controlled by the user.

### Response

* `assetID` is the ID of the new asset.
* `changeAddr` in the result is the address where any change was sent.

Later in this example, we’ll mint more shares, so be sure to replace at least 2 addresses in the second minter set with addresses your user controls.

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.createVariableCapAsset",
    "params" :{
        "name":"Corp. Shares",
        "symbol":"CS",
        "minterSets":[
            {
                "minters": [
                    "X-avax1ghstjukrtw8935lryqtnh643xe9a94u3tc75c7"
                ],
                "threshold": 1
            },
            {
                "minters": [
                    "X-avax1k4nr26c80jaquzm9369j5a4shmwcjn0vmemcjz",
                    "X-avax1yell3e4nln0m39cfpdhgqprsd87jkh4qnakklx",
                    "X-avax1ztkzsrjnkn0cek5ryvhqswdtcg23nhge3nnr5e"
                ],
                "threshold": 2
            }
        ],
        "from":["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

The response should look like this:

```json
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "assetID":"i1EqsthjiFTxunrj8WD2xFSrQ5p2siEKQacmCCB5qBFVqfSL2",
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

## Mint the Asset

Right now 0 shares exist. Let’s mint 10M shares.

### Create the Unsigned Transaction

We’ll use [`avm.mint`](../../avalanchego-apis/x-chain.mdx#avmmint) to mint the shares.

* `amount` is the number of shares that will be created.
* `assetID` is the ID of the asset we’re creating more of.
* `to` is the address that will receive the newly minted shares. Replace `to` with an address your user controls so that later you’ll be able to send some of the newly minted shares.
* `username` must be a user that holds keys giving it permission to mint more of this asset. That is, it controls at least _threshold_ keys for one of the minter sets we specified above.

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.mint",
    "params" :{
        "amount":10000000,
        "assetID":"i1EqsthjiFTxunrj8WD2xFSrQ5p2siEKQacmCCB5qBFVqfSL2",
        "to":"X-avax1a202a8pu5w4vnerwzp84j68yknm6lf47drfsdv",
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

The response contains the transaction’s ID:

```json
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"E1gqPbkziu8AutqccRa9ioPWyEF3Vd7eMjDJ3UshjQPpLoREZ",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

We can check the status of the transaction we’ve just sent to the network using [`avm.getTxStatus`](../../avalanchego-apis/x-chain.mdx#avmgettxstatus):

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.getTxStatus",
    "params" :{
        "txID":"E1gqPbkziu8AutqccRa9ioPWyEF3Vd7eMjDJ3UshjQPpLoREZ"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

This should give:

```json
{
    "jsonrpc": "2.0",
    "result": {
        "status": "Accepted"
    },
    "id": 1
}
```

## Trade the Asset

### Check a Balance

All 10M shares are controlled by the `to` address we specified in `mint`. To verify this, we’ll use [`avm.getBalance`](../../avalanchego-apis/x-chain.mdx#avmgetbalance):

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-avax1a202a8pu5w4vnerwzp84j68yknm6lf47drfsdv",
        "assetID":"i1EqsthjiFTxunrj8WD2xFSrQ5p2siEKQacmCCB5qBFVqfSL2"
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

### Send the Asset

Let’s send 100 shares to another address by using [`avm.send`](../../avalanchego-apis/x-chain.mdx#avmsend). To do so:

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.send",
    "params" :{
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE",
        "assetID" :"i1EqsthjiFTxunrj8WD2xFSrQ5p2siEKQacmCCB5qBFVqfSL2",
        "amount"  :100,
        "to"      :"X-avax1qwnlpknmdkkl22rhmad0dcn80wfasp2y3yg3x0"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Let’s check the balances of the `to` address:

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-avax1qwnlpknmdkkl22rhmad0dcn80wfasp2y3yg3x0",
        "assetID":"i1EqsthjiFTxunrj8WD2xFSrQ5p2siEKQacmCCB5qBFVqfSL2"
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

* Used `createVariableCapAsset` to create a variable-cap asset that represents shares.
* Used `mint` to mint more units of an asset.
* Used `getBalance` to check address balances.
* Used `send` to transfer shares.

