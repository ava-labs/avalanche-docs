---
description: Avalanche also supports non-fungible tokens (NFTs). By definition, each NFT is unique and not perfectly interchangeable for any other NFT.
---


# Create an NFT (Part 1)

## Introduction

On Avalanche, digital goods are represented as tokens. Some tokens are **fungible**, which means that one token is interchangeable for any other one token. Real-world currency is fungible, for example; one $5 note is treated as being the same as any other $5 note.

Avalanche also supports non-fungible tokens (NFTs). By definition, each NFT is unique and not perfectly interchangeable for any other NFT. For example, there could be an NFT that represents ownership of a real-world piece of art; each piece of art, like each NFT, is unique. NFTs represent digital scarcity and may prove to have even greater utility than traditional fungible tokens.

In this tutorial, we’ll create and send NFTs using AvalancheGo’s API. In a future tutorial, we’ll create a custom NFT family using [AvalancheJS](../../tools/avalanchejs/README.md) and explore NFTs in more detail.

## Requirements

You've completed [Run an Avalanche Node](../nodes-and-staking/run-avalanche-node.md) and are familiar with [Avalanche's architecture](../../../learn/platform-overview/README.md). In this tutorial, we use [Avalanche’s Postman collection](https://github.com/ava-labs/avalanche-postman-collection) to help us make API calls.

## Create the NFT Family

Each NFT belongs to a **family**, which has a name and a symbol. Each family is composed of **groups**. The number of groups in a family is specified when the family is created. Our NFT will exist on the X-Chain, so to create our NFT family we’ll call [`avm.createNFTAsset`](../../avalanchego-apis/x-chain.mdx#avmcreatenftasset), which is a method of the [X-Chain’s API](../../avalanchego-apis/x-chain.mdx).

The signature for this method is:

```
avm.createNFTAsset({
    name: string,
    symbol: string,
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

### **Method**

* [`avm.createNFTAsset`](../../avalanchego-apis/x-chain.mdx#avmcreatenftasset)

**Parameters**

* `name` is a human-readable name for our NFT family. Not necessarily unique. Between 0 and 128 characters.
* `symbol` is a shorthand symbol for this NFT family. Between 0 and 4 characters. Not necessarily unique. May be omitted.
* `minterSets` is a list where each element specifies that `threshold` of the addresses in `minters` may together mint more of the asset by signing a minting operation.
* Performing a transaction on the X-Chain requires a transaction fee paid in AVAX. `username` and `password` denote the user paying the fee.
* `from` are the addresses that you want to use for this operation. If omitted, uses any of your addresses as needed.
* `changeAddr` is the address any change will be sent to. If omitted, change is sent to any of your addresses.

### **Response**

* `assetID` is the ID of the new asset that we’ll have created.
* `changeAddr` in the result is the address where any change was sent.

Later in this example, we’ll mint an NFT, so be sure to replace at least 1 address in the minter set with an address which your user controls.

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.createNFTAsset",
    "params" :{
        "name":"Family",
        "symbol":"FAM",
        "minterSets":[
            {
                "minters": [
                    "X-avax1ghstjukrtw8935lryqtnh643xe9a94u3tc75c7"
                ],
                "threshold": 1
            }
        ],
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
        "assetID":"2X1YV4jpGpqezvj2khQdj1yEiXU1dCwsJ7DmNhQRyZZ7j9oYBp",
        "changeAddr":"X-avax1ghstjukrtw8935lryqtnh643xe9a94u3tc75c7"
    }
}
```

A couple things to note: first, in addition to creating an NFT family, AvalancheGo’s [`avm.createNFTAsset`](../../avalanchego-apis/x-chain.mdx#avmcreatenftasset) also creates a group for each of the `minterSets`, which are passed in. For example, if `minterSets` has 3 elements, the NFT family has 3 groups. Second, take note of the `assetID` which is returned in the response. This is the `assetID` of the newly created NFT family, and you’ll need it later to issue NFTs.

You may be wondering why we specify _sets_ of addresses that can mint more units of the asset rather than a single address. Here's why:

* **Security:** if only one address can mint more of the asset, and the private key for that address is lost, no more units can ever be minted. Similarly, if only one address can mint more of the asset, nothing stops the holder of that address from unilaterally minting as much as they want.
* **Flexibility:** it’s nice to be able to encode logic like, "Alice can unilaterally mint more units of this asset, or 2 of Dinesh, Ellin, and Jamie can together mint more."

## Get UTXOs for NFT

NFT outputs don’t show up in calls to [`avm.getBalance`](../../avalanchego-apis/x-chain.mdx#avmgetbalance) or [`avm.getAllBalances`](../../avalanchego-apis/x-chain.mdx#avmgetallbalances). To see your NFTs, you have to call [`avm.getUTXOs`](../../avalanchego-apis/x-chain.mdx#avmgetutxos) and then parse the utxo to check for the type ID. NFT Mint Outputs have a type id of `00 00 00 0a` in hexidecimal (`10` in decimal) and NFT Transfer Outputs have a type id of `00 00 00 0b` in hexdecimal (`11` in decimal).

### **Method**

* [`avm.getUTXOs`](../../avalanchego-apis/x-chain.mdx#avmgetutxos)

### **Parameters**

* `addresses` are the addresses to fetch UTXOs for.

**Response:**

* `numFetched` is the total number of UTXOs in the response.
* `utxos` is an array of CB58 encoded strings.
* `endIndex` This method supports pagination. `endIndex` denotes the last UTXO returned.

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.getUTXOs",
    "params" :{
        "addresses":["X-avax1ghstjukrtw8935lryqtnh643xe9a94u3tc75c7"]
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

The response contains a list of UTXOs:

```json
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "numFetched": "2",
        "utxos": [
            "116VhGCxiSL4GrMPKHkk9Z92WCn2i4qk8qdN3gQkFz6FMEbHo82Lgg8nkMCPJcZgpVXZLQU6MfYuqRWfzHrojmcjKWbfwqzZoZZmvSjdD3KJFsW3PDs5oL3XpCHq4vkfFy3q1wxVY8qRc6VrTZaExfHKSQXX1KnC",
            "11cxRVipJgtuHy1ZJ6qM7moAf3GveBD9PjHeZMkhk7kjizdGUu5RxZqhViaWh8dJa9jT9sS62xy73FubMAxAy8b542v3k8frTnVitUagW9YhTMLmZ6nE48Z9qXB2V9HHzCuFH1xMvUEj33eNWv5wsP3JvmywkwkQW9WLM"
        ],
        "endIndex": {
            "address": "X-avax1ghstjukrtw8935lryqtnh643xe9a94u3tc75c7",
            "utxo": "2iyUVo8XautXpZwVfp5vhSh4ASWbo67zmHbtx7SUJg2Qa8BHtr"
        }
    }
}
```

[`avm.getUTXOs`](../../avalanchego-apis/x-chain.mdx#avmgetutxos) returns 2 UTXOs. Let’s take the first one and decode it to confirm that it’s an [NFT Mint Output.](../../references/avm-transaction-serialization.md#nft-mint-output) First, we convert the Base58Check encoded string which is returned from [`avm.getUTXOs`](../../avalanchego-apis/x-chain.mdx#avmgetutxos) in to hex. The following [CB58](http://support.avalabs.org/en/articles/4587395-what-is-cb58) string:

```
116VhGCxiSL4GrMPKHkk9Z92WCn2i4qk8qdN3gQkFz6FMEbHo82Lgg8nkMCPJcZgpVXZLQU6MfYuqRWfzHrojmcjKWbfwqzZoZZmvSjdD3KJFsW3PDs5oL3XpCHq4vkfFy3q1wxVY8qRc6VrTZaExfHKSQXX1KnC
```

is expressed in hexadecimal as:

```
00 00 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57 00 00 00 01 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57 00 00 00 0a 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 01 00 00 00 01 3c b7 d3 84 2e 8c ee 6a 0e bd 09 f1 fe 88 4f 68 61 e1 b2 9c
```

Now, we can decompose the hex into the UTXO’s individual components by referring to the [transaction serialization format](../../references/avm-transaction-serialization.md):

```
NFT Mint Output

CodecID: 00 00
TXID: 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57
Output Index: 00 00 00 01
AssetID: 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57
TypeID: 00 00 00 0a
GroupID: 00 00 00 00
Locktime: 00 00 00 00 00 00 00 00
Threshold: 00 00 00 01
Address Count: 00 00 00 01
Addresses[0]: 3c b7 d3 84 2e 8c ee 6a 0e bd 09 f1 fe 88 4f 68 61 e1 b2 9c
```

Note that the `TypeID` is `00 00 00 0a` which is the correct type ID for an NFT Mint Output. Also note that the `GroupID` is `00 00 00 00`. This `GroupID` was created based on the number of `MinterSets` which I passed in to `avm.createNFTAsset`.

## Mint the Asset

Now that we have an NFT family and a group for the single `MinterSet` we’re able to create NFTs belonging to this group. To do that we call [`avm.mintNFT`](../../avalanchego-apis/x-chain.mdx#avmmintnft):

### **Method**

* [`avm.mintNFT`](../../avalanchego-apis/x-chain.mdx#avmmintnft)

### **Parameters**

* `assetID` is the ID of the NFT family.
* `payload` is an arbitrary CB58 encoded payload of up to 1024 bytes. In Part 2 (**COMING SOON**) we’ll explore creating a protocol around the NFT payload. For this tutorial, the payload is the string "AVA Labs".
* `to` is the address that will receive the newly minted NFT. Replace `to` with an address your user controls so that later you’ll be able to send some of the newly minted NFT.
* `username` must be a user that holds keys giving it permission to mint more of this NFT. That is, it controls at least _threshold_ keys for one of the minter sets we specified above.
* `password` is the valid password for `username`

### **Response**

* `txID` is the transaction ID.
* `changeAddr` in the result is the address where any change was sent.

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.mintNFT",
    "params" :{
        "assetID":"2X1YV4jpGpqezvj2khQdj1yEiXU1dCwsJ7DmNhQRyZZ7j9oYBp",
        "payload":"2EWh72jYQvEJF9NLk",
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
        "txID":"x4fKx95KirTvqWCeiPZfnjB4xFdrTduymRKMouXTioXojdnUm",
        "changeAddr": "X-avax1a202a8pu5w4vnerwzp84j68yknm6lf47drfsdv"
    }
}
```

Similar to the previous step, we can now confirm that an NFT was minted by calling [`avm.getUTXOs`](../../avalanchego-apis/x-chain.mdx#avmgetutxos) and parsing the UTXO to confirm that we now have an [NFT Transfer Output](../../references/avm-transaction-serialization.md#nft-transfer-output).

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.getUTXOs",
    "params" :{
        "addresses":["X-avax1a202a8pu5w4vnerwzp84j68yknm6lf47drfsdv"]
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

This should give:

```json
{
    "jsonrpc": "2.0",
    "result": {
        "numFetched": "2",
        "utxos": [
            "11Do4RK6FchGXeoycKujR7atm3tvBz3qc64uoipCc5J74Sj1U4orM6vbBGSES8hnjgjZava9oPgmnbHxh2mBKjeXdvAqTRtYMHEacrveSzKgk7F8h8xi8JB9CddoiX8nbjZMYt1keGo5Rvpjh8dGymDWwRbV1FdnG5uDiiyU8uidc3P24",
            "11JL98R9yVoCaekrzP2PoCKJfCTin6vhTWU4h9TxqevEUnhiMo2j7F4DHxRpHq6BnFnHGAajhmiXgrdfUbbNd1izmdLVMwqe3UCTJWWLaJ6XUZ46R243T8NdhKXXJWC9GvcjFYMyiKRWvVnvFt7duzq8P8D53uhv1QfdQ9"
        ],
        "endIndex": {
            "address": "X-avax1a202a8pu5w4vnerwzp84j68yknm6lf47drfsdv",
            "utxo": "2qs3A1sBhVjFcXqRADJ7AorvoawVgMkNdgJi8eYNPABMKmdBYq"
        }
    },
    "id": 1
}
```

As in the previous step, we can now decode the CB58 encoded UTXO to hexidecimal and then decompose it to its individual components to confirm that we have the correct UTXO and type.

First, we convert the Base58Check encoded string which is returned from [`avm.getUTXOs`](../../avalanchego-apis/x-chain.mdx#avmgetutxos) in to hex. The following CB58 string:

```
11Do4RK6FchGXeoycKujR7atm3tvBz3qc64uoipCc5J74Sj1U4orM6vbBGSES8hnjgjZava9oPgmnbHxh2mBKjeXdvAqTRtYMHEacrveSzKgk7F8h8xi8JB9CddoiX8nbjZMYt1keGo5Rvpjh8dGymDWwRbV1FdnG5uDiiyU8uidc3P24
```

is expressed in hexadecimal as:

```
00 00 7d 07 0d 1e fe a6 4e 45 09 05 c6 11 ee b1 cf 61 9f 21 22 eb 17 db aa ea 9a fe 2d ff 17 be 27 6b 00 00 00 01 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57 00 00 00 0b 00 00 00 00 00 00 00 08 41 56 41 20 4c 61 62 73 00 00 00 00 00 00 00 00 00 00 00 01 00 00 00 01 3c b7 d3 84 2e 8c ee 6a 0e bd 09 f1 fe 88 4f 68 61 e1 b2 9c
```

Now, we can decompose the hex into the UTXO’s individual components:

```
NFT Mint Output

CodecID: 00 00
TXID: 7d 07 0d 1e fe a6 4e 45 09 05 c6 11 ee b1 cf 61 9f 21 22 eb 17 db aa ea 9a fe 2d ff 17 be 27 6b
Output Index: 00 00 00 01
AssetID: 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57
TypeID: 00 00 00 0b
GroupID: 00 00 00 00
Payload Length: 00 00 00 08
Payload: 41 56 41 20 4c 61 62 73
Locktime: 00 00 00 00 00 00 00 00
Threshold: 00 00 00 01
Address Count: 00 00 00 01
Addresses[0]: 3c b7 d3 84 2e 8c ee 6a 0e bd 09 f1 fe 88 4f 68 61 e1 b2 9c
```

Note that the `TypeID` is `00 00 00 0b` which is the correct type id for an [NFT Transfer Output](../../references/avm-transaction-serialization.md#nft-transfer-output). Also, note that the Payload is included.

## Send the NFT

Now, you can send the NFT to anyone. To do that, use AvalancheGo’s [`avm.sendNFT`](../../avalanchego-apis/x-chain.mdx#avmsendnft) API method.

**Method**

* [`avm.sendNFT`](../../avalanchego-apis/x-chain.mdx#avmsendnft)

**Parameters**

* `assetID` is the ID of the NFT we’re sending.
* `to` is the address that will receive the newly minted NFT.
* `groupID` is the NFT group from which to send the NFT.
* `username` is the user that controls the NFT.
* `password` is the valid password for `username`

**Response**

* `txID` is the transaction ID.
* `changeAddr` in the result is the address where any change was sent.

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.sendNFT",
    "params" :{
        "assetID" :"2X1YV4jpGpqezvj2khQdj1yEiXU1dCwsJ7DmNhQRyZZ7j9oYBp",
        "to"      :"X-avax1ghstjukrtw8935lryqtnh643xe9a94u3tc75c7",
        "groupID" : 0,
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

The response confirms that our NFT Transfer Operation was successful:

```json
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID": "txtzxcrzPx1sn38HWKU9PB52EpbpXCegbdHNxPNAYd9ZvezJq",
        "changeAddr": "X-avax1a202a8pu5w4vnerwzp84j68yknm6lf47drfsdv"0
    }
}
```

You can call [`avm.getUTXOs`](../../avalanchego-apis/x-chain.mdx#avmgetutxos) for the address which you sent the NFT to and decompose the returned UTXO, after converting from CB58 to hex, to confirm that there is a UTXO with type id `00 00 00 0b` in hex or `11` in decimal.

## Wrapping up

Blockchain technology and tokenomics represent a radical new way of representing digital assets. Non-fungible tokens allow scarce assets to be tokenized. In this tutorial, we:

* Used `createNFTAsset` to create a non-fungible asset family and group.
* Used `mintNFT` to mint units of an NFT to the group.
* Used `getUTXOs` to fetch UTXOs for an address. We then converted the CB58 encoded UTXO to hex and decomposed it to its individual components.
* Used `sendNFT` to transfer NFTs between addresses.

In Part 2 of this series, we’ll go more in-depth by using AvalancheJS to create a protocol for our NFT payload by issuing it to multiple groups.

