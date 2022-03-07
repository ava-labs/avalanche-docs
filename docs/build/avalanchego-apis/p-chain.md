---
sidebar_position: 3
---

# Platform Chain (P-Chain) API

This API allows clients to interact with the [P-Chain](../../learn/platform-overview/README.md#platform-chain-p-chain), which maintains Avalanche’s [validator](../../learn/platform-overview/staking.md#validators) set and handles blockchain creation.

## Endpoint

```
/ext/P
```

## Format

This API uses the `json 2.0` RPC format.

## Methods

### platform.addDelegator

Add a delegator to the Primary Network.

A delegator stakes AVAX and specifies a validator (the delegatee) to validate on their behalf. The delegatee has an increased probability of being sampled by other validators (weight) in proportion to the stake delegated to them.

The delegatee charges a fee to the delegator; the former receives a percentage of the delegator’s validation reward (if any.) A transaction that delegates stake has no fee.

The delegation period must be a subset of the period that the delegatee validates the Primary Network.

Note that once you issue the transaction to add a node as a delegator, there is no way to change the parameters. **You can’t remove a stake early or change the stake amount, node ID, or reward address.** Please make sure you’re using the correct values. If you’re not sure, check out our [Developer FAQ](https://support.avalabs.org/en/collections/2618154-developer-faq) or ask for help on [Discord.](https://chat.avalabs.org/)

:::info

[Staking](../../learn/platform-overview/staking.md)

:::

#### **Signature**

```sh
platform.addDelegator(
    {
        nodeID: string,
        startTime: int,
        endTime: int,
        stakeAmount: int,
        rewardAddress: string,
        from: []string, //optional
        changeAddr: string, //optional
        username: string,
        password: string
    }
) -> 
{
    txID: string,
    changeAddr: string
}
```

* `nodeID` is the ID of the node to delegate to.
* `startTime` is the Unix time when the delegator starts delegating.
* `endTime` is the Unix time when the delegator stops delegating (and staked AVAX is returned).
* `stakeAmount` is the amount of nAVAX the delegator is staking.
* `rewardAddress` is the address the validator reward goes to, if there is one.
* `from` are the addresses that you want to use for this operation. If omitted, uses any of your addresses as needed.
* `changeAddr` is the address any change will be sent to. If omitted, change is sent to one of the addresses controlled by the user.
* `username` is the user that pays the transaction fee.
* `password` is `username`‘s password.
* `txID` is the transaction ID

#### **Example Call**

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.addDelegator",
    "params": {
        "nodeID":"NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ",
        "rewardAddress":"P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy",
        "startTime":1594102400,
        "endTime":1604102400,
        "stakeAmount":100000,
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Example Response**

```json
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "6pB3MtHUNogeHapZqMUBmx6N38ii3LzytVDrXuMovwKQFTZLs",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

### platform.addValidator

Add a validator to the Primary Network. You must stake AVAX to do this. If the node is sufficiently correct and responsive while validating, you receive a reward when end of staking period is reached. The validator’s probability of being sampled by other validators during consensus is in proportion to the amount of AVAX staked.

The validator charges a fee to delegators; the former receives a percentage of the delegator’s validation reward (if any.) The minimum delegation fee is 2%. A transaction that adds a validator has no fee.

The validation period must be between 2 weeks and 1 year.

There is a maximum total weight imposed on validators. This means that no validator will ever have more AVAX staked and delegated to it than this value. This value will initially be set to `min(5 * amount staked, 3M AVAX)`. The total value on a validator is 3 million AVAX.

Note that once you issue the transaction to add a node as a validator, there is no way to change the parameters. **You can’t remove stake early or change the stake amount, node ID, or reward address.** Please make sure you’re using the correct values. If you’re not sure, check out our [Developer FAQ](https://support.avalabs.org/en/collections/2618154-developer-faq) or ask for help on [Discord.](https://chat.avalabs.org/)

:::info

[Staking](../../learn/platform-overview/staking.md)

:::

#### **Signature**

```sh
platform.addValidator(
    {
        nodeID: string,
        startTime: int,
        endTime: int,
        stakeAmount: int,
        rewardAddress: string,
        delegationFeeRate: float,
        from: []string, //optional
        changeAddr: string, //optional
        username: string,
        password: string
    }
) -> 
{
    txID: string,
    changeAddr: string
}
```

* `nodeID` is the node ID of the validator being added.
* `startTime` is the Unix time when the validator starts validating the Primary Network.
* `endTime` is the Unix time when the validator stops validating the Primary Network (and staked AVAX is returned).
* `stakeAmount` is the amount of nAVAX the validator is staking.
* `rewardAddress` is the address the validator reward will go to, if there is one.
* `delegationFeeRate` is the percent fee this validator charges when others delegate stake to them. Up to 4 decimal places allowed; additional decimal places are ignored. Must be between 0 and 100, inclusive. For example, if `delegationFeeRate` is `1.2345` and someone delegates to this validator, then when the delegation period is over, 1.2345% of the reward goes to the validator and the rest goes to the delegator.
* `from` are the addresses that you want to use for this operation. If omitted, uses any of your addresses as needed.
* `changeAddr` is the address any change will be sent to. If omitted, change is sent to one of the addresses controlled by the user.
* `username` is the user that pays the transaction fee.
* `password` is `username`‘s password.
* `txID` is the transaction ID

#### **Example Call**

In this example, we use shell command `date` to compute Unix times 10 minutes and 2 days in the future. (Note: If you’re on a Mac, replace `$(date` with `$(gdate`. If you don’t have `gdate` installed, do `brew install coreutils`.)

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.addValidator",
    "params": {
        "nodeID":"NodeID-ARCLrphAHZ28xZEBfUL7SVAmzkTZNe1LK",
        "rewardAddress":"P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy",
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "startTime":'$(date --date="10 minutes" +%s)',
        "endTime":'$(date --date="2 days" +%s)',
        "stakeAmount":1000000,
        "delegationFeeRate":10,
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Example Response**

```json
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "6pb3mthunogehapzqmubmx6n38ii3lzytvdrxumovwkqftzls",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

### platform.addSubnetValidator

Add a validator to a subnet other than the Primary Network. The Validator must validate the Primary Network for the entire duration they validate this subnet.

#### **Signature**

```sh
platform.addSubnetValidator(
    {
        nodeID: string,
        subnetID: string,
        startTime: int,
        endTime: int,
        weight: int,
        from: []string, //optional
        changeAddr: string, //optional
        username: string,
        password: string
    }
) -> 
{
    txID: string,
    changeAddr: string,
}
```

* `nodeID` is the node ID of the validator.
* `subnetID` is the subnet they will validate.
* `startTime` is the unix time when the validator starts validating the subnet.
* `endTime` is the unix time when the validator stops validating the subnet.
* `weight` is the validator’s weight used for sampling.
* `from` are the addresses that you want to use for this operation. If omitted, uses any of your addresses as needed.
* `changeAddr` is the address any change will be sent to. If omitted, change is sent to one of the addresses controlled by the user.
* `username` is the user that pays the transaction fee.
* `password` is `username`‘s password.
* `txID` is the transaction ID.

#### **Example Call**

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.addSubnetvalidator",
    "params": {
        "nodeID":"NodeID-7xhw2mdxuds44j42tcb6u5579esbst3lg",
        "subnetID":"zbfoww1ffkpvrfywpj1cvqrfnyesepdfc61hmu2n9jnghduel",
        "startTime":1583524047,
        "endTime":1604102399,
        "weight":1,
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Example Response**

```json
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID": "2exafyvRNSE5ehwjhafBVt6CTntot7DFjsZNcZ54GSxBbVLcCm",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    }
}
```

### platform.createAddress

Create a new address controlled by the given user.

#### **Signature**

```sh
platform.createAddress({
    username: string,
    password: string
}) -> {address: string}
```

#### **Example Call**

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createAddress",
    "params": {
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

#### **Example Response**

```json
{
    "jsonrpc": "2.0",
    "result": {
        "address": "P-avax12lqey27sfujqq6mc5a3jr5av56cjsu8hg2d3hx"
    },
    "id": 1
}
```

### platform.createBlockchain

Create a new blockchain. Currently only supports the creation of new instances of the AVM and the Timestamp VM.

#### **Signature**

```sh
platform.createBlockchain(
    {
        subnetID: string,
        vmID: string,
        name: string,
        genesisData: string,
        encoding: string, //optional
        from: []string, //optional
        changeAddr: string, //optional
        username: string,
        password: string
    }
) -> 
{
    txID: string,
    changeAddr: string
}
```

* `subnetID` is the ID of the Subnet that validates the new blockchain. The Subnet must exist and can’t be the Primary Network.
* `vmID` is the ID of the Virtual Machine the blockchain runs. Can also be an alias of the Virtual Machine.
* `name` is a human-readable name for the new blockchain. Not necessarily unique.
* `genesisData` is the byte representation of the genesis state of the new blockchain encoded in the format specified by the `encoding` parameter.
* `encoding` specifies the format to use for `genesisData`. Can be either "cb58" or "hex". Defaults to "cb58". Virtual Machines should have a static API method named `buildGenesis` that can be used to generate `genesisData`
* `from` are the addresses that you want to use for this operation. If omitted, uses any of your addresses as needed.
* `changeAddr` is the address any change will be sent to. If omitted, change is sent to one of the addresses controlled by the user.
* `username` is the user that pays the transaction fee. This user must have a sufficient number of the subnet’s control keys.
* `password` is `username`‘s password.
* `txID` is the transaction ID.

#### **Example Call**

In this example we’re creating a new instance of the Timestamp Virtual Machine. `genesisData` came from calling `timestamp.buildGenesis`.

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createBlockchain",
    "params" : {
        "vmID":"timestamp",
        "subnetID":"2bRCr6B4MiEfSjidDwxDpdCyviwnfUVqB2HGwhm947w9YYqb7r",
        "name":"My new timestamp",
        "genesisData": "45oj4CqFViNHUtBxJ55TZfqaVAXFwMRMj2XkHVqUYjJYoTaEM",
        "encoding": "cb58",
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Example Response**

```json
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2TBnyFmST7TirNm6Y6z4863zusRVpWi5Cj1sKS9bXTUmu8GfeU",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

### platform.createSubnet

Create a new subnet.

The subnet’s ID is the same as this transaction’s ID.

#### **Signature**

```sh
platform.createSubnet(
    {
        controlKeys: []string,
        threshold: int,
        from: []string, //optional
        changeAddr: string, //optional
        username: string,
        password: string
    }
) -> 
{
    txID: string,
    changeAddr: string
}
```

* In order to add a validator to this subnet, `threshold` signatures are required from the addresses in `controlKeys`
* `from` are the addresses that you want to use for this operation. If omitted, uses any of your addresses as needed.
* `changeAddr` is the address any change will be sent to. If omitted, change is sent to one of the addresses controlled by the user.
* `username` is the user that pays the transaction fee.
* `password` is `username`‘s password.

#### **Example Call**

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createSubnet",
    "params": {
        "controlKeys":[
            "P-avax13xqjvp8r2entvw5m29jxxjhmp3hh6lz8laep9m",
            "P-avax165mp4efnel8rkdeqe5ztggspmw4v40j7pfjlhu"
        ],
        "threshold":2,
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Example Response**

```json
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "hJfC5xGhtjhCGBh1JWn3vZ51KJP696TZrsbadPHNbQG2Ve5yd"
    },
    "id": 1
}
```

### platform.exportAVAX

Send AVAX from an address on the P-Chain to an address on the X-Chain. After issuing this transaction, you must call the X-Chain’s [`avm.import`](x-chain.mdx#avmimport) method with assetID `AVAX` to complete the transfer.

#### **Signature**

```sh
platform.exportAVAX(
    {
        amount: int,
        from: []string, //optional
        to: string,
        changeAddr: string, //optional
        username: string,
        password: string
    }
) -> 
{
    txID: string,
    changeAddr: string
}
```

* `amount` is the amount of nAVAX to send.
* `to` is the address on the X-Chain to send the AVAX to
* `from` are the addresses that you want to use for this operation. If omitted, uses any of your addresses as needed.
* `changeAddr` is the address any change will be sent to. If omitted, change is sent to one of the addresses controlled by the user.
* `username` is the user sending the AVAX and paying the transaction fee.
* `password` is `username`‘s password.
* `txID` is the ID of this transaction.

#### **Example Call**

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.exportAVAX",
    "params": {
        "to":"X-avax1yv8cwj9kq3527feemtmh5gkvezna5xys08mxet",
        "amount":1,
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Example Response**

```json
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2Kz69TNBSeABuaVjKa6ZJCTLobbe5xo9c5eU8QwdUSvPo2dBk3",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

### platform.exportKey

Get the private key that controls a given address.  
The returned private key can be added to a user with [`platform.importKey`](p-chain.md#platformimportkey).

#### **Signature**

```sh
platform.exportKey({
    username: string,
    password: string,
    address: string
}) -> {privateKey: string}
```

* `username` is the user that controls `address`.
* `password` is `username`‘s password.
* `privateKey` is the string representation of the private key that controls `address`.

#### **Example Call**

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.exportKey",
    "params" :{
        "username" :"myUsername",
        "password": "myPassword",
        "address": "P-avax1zwp96clwehpwm57r9ftzdm7rnuslrunj68ua3r"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Example Response**

```json
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "privateKey":"PrivateKey-Lf49kAJw3CbaL783vmbeAJvhscJqC7vi5yBYLxw2XfbzNS5RS"
    }
}
```

### platform.getBalance

Get the balance of AVAX controlled by a given address.

#### **Signature**

```sh
platform.getBalance({
    address:string
}) -> {
    balance: string,
    unlocked: string,
    lockedStakeable: string,
    lockedNotStakeable: string,
    utxoIDs: []{
        txID: string,
        outputIndex: int
    }
}
```

* `address` is the address to get the balance of.
* `balance` is the total balance, in nAVAX.
* `unlocked` is the unlocked balance, in nAVAX.
* `lockedStakeable` is the locked stakeable balance, in nAVAX.
* `lockedNotStakeable` is the locked and not stakeable balance, in nAVAX.
* `utxoIDs` are the IDs of the UTXOs that reference `address`.

#### **Example Call**

```sh
curl -X POST --data '{
  "jsonrpc":"2.0",
  "id"     : 1,
  "method" :"platform.getBalance",
  "params" :{
      "address":"P-avax1m8wnvtqvthsxxlrrsu3f43kf9wgch5tyfx4nmf"
  }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

#### **Example Response**

```json
{
    "jsonrpc": "2.0",
    "result": {
        "balance": "20000000000000000",
        "unlocked": "10000000000000000",
        "lockedStakeable": "10000000000000000",
        "lockedNotStakeable": "0",
        "utxoIDs": [
            {
                "txID": "11111111111111111111111111111111LpoYY",
                "outputIndex": 1
            },
            {
                "txID": "11111111111111111111111111111111LpoYY",
                "outputIndex": 0
            }
        ]
    },
    "id": 1
}
```

### platform.getBlock

Get a block by its ID.

#### **Signature**

```sh
platform.getBlock({
    blockID: string
    encoding: string // optional
}) -> {
    block: string,
    encoding: string
}
```

**Request**

* `blockID` is the block ID. It should be in cb58 format.
* `encoding` is the encoding format to use. Can be either `cb58`, `hex`, or `json`. Defaults to `cb58`.

**Response**

* `block` is the transaction encoded to `encoding`.
* `encoding` is the `encoding`.

#### CB58 Example

##### **Example Call**

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getBlock",
    "params": {
        "blockID": "d7WYmb8VeZNHsny3EJCwMm6QA37s1EHwMxw1Y71V3FqPZ5EFG",
        "encoding": "cb58"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

##### **Example Response**

```json
{
  "jsonrpc": "2.0",
  "result": {
    "block": "11111BwoDGdFYQfsbfJ35VKjMP6z5dtggBJqFay7KN33GdqpU8ZFAvaSVegwfADYFipsCpTft27TA8h99krBjsMvFZ5TgFYrQCNN2DkyXQSVuGadYh8UhZ6Ptp3HwVYvXWHaDwjt3mEs9fkoS5JiTDfrrp3w6ws2LTksv3LGtb66iWjWgnHU46WgY2wVqnwrit2x7mYGTgJpXeziLCY66Hnnu1jAy5hYhK2Ek37XhvBcd1UeTcPAFsEtFdLr8Ku19K2dYYNvvuz7YnJjuqxUjtNoC61UcKrtTyJCqRuyA85NRFD7ZYVKwSd13CevyZWuBiBWZkukUpLhJwTcWnFnzbntKDCMdip4kAtQueDkjYnrXu2AWS3SXiJTSmZm55iwn4iE9sqBs6Rj1CnrakGi7sCcXg1UyYu5scmb5RVDKDtZPNLr5Vb6oTWaM4egHfwgT98koZ28rSw8otJfv4q1BH9vrS4N7pUJxh9grnksG9TQDtjBjD9tmhxC8iSLYTwGNxitAqjZd7SGE9",
    "encoding": "cb58"
  },
  "id": 1
}

```

#### Hex Example

##### **Example Call**

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getBlock",
    "params": {
        "blockID": "d7WYmb8VeZNHsny3EJCwMm6QA37s1EHwMxw1Y71V3FqPZ5EFG",
        "encoding": "hex"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

##### **Example Response**

```json
{
  "jsonrpc": "2.0",
  "result": {
    "block": "0x00000000000309473dc99a0851a29174d84e522da8ccb1a56ac23f7b0ba79f80acce34cf576900000000000f4241000000010000001200000001000000000000000000000000000000000000000000000000000000000000000000000000000000011c4c57e1bcb3c567f9f03caa75563502d1a21393173c06d9d79ea247b20e24800000000021e67317cbc4be2aeb00677ad6462778a8f52274b9d605df2591b23027a87dff000000050000000338e0465f0000000100000000000000000427d4b22a2a78bcddd456742caf91b56badbff985ee19aef14573e7343fd6520000000121e67317cbc4be2aeb00677ad6462778a8f52274b9d605df2591b23027a87dff000000070000000338d1041f0000000000000000000000010000000195a4467dd8f939554ea4e6501c08294386938cbf000000010000000900000001c79711c4b48dcde205b63603efef7c61773a0eb47efb503fcebe40d21962b7c25ebd734057400a12cce9cf99aceec8462923d5d91fffe1cb908372281ed738580119286dde",
    "encoding": "hex"
  },
  "id": 1
}
```

#### JSON Example

##### **Example Call**

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getBlock",
    "params": {
        "blockID": "d7WYmb8VeZNHsny3EJCwMm6QA37s1EHwMxw1Y71V3FqPZ5EFG",
        "encoding": "json"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P 
```
##### **Example Response**

```json
{
  "jsonrpc": "2.0",
  "result": {
    "block": {
      "parentID": "5615di9ytxujackzaXNrVuWQy5y8Yrt8chPCscMr5Ku9YxJ1S",
      "height": 1000001,
      "txs": [
        {
          "unsignedTx": {
            "inputs": {
              "networkID": 1,
              "blockchainID": "11111111111111111111111111111111LpoYY",
              "outputs": [],
              "inputs": [
                {
                  "txID": "DTqiagiMFdqbNQ62V2Gt1GddTVLkKUk2caGr4pyza9hTtsfta",
                  "outputIndex": 0,
                  "assetID": "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z",
                  "fxID": "spdxUxVJQbX85MGxMHbKw1sHxMnSqJ3QBzDyDYEP3h6TLuxqQ",
                  "input": {
                    "amount": 13839124063,
                    "signatureIndices": [
                      0
                    ]
                  }
                }
              ],
              "memo": "0x"
            },
            "destinationChain": "2q9e4r6Mu3U68nU1fYjgbR6JvwrRx36CohpAX5UQxse55x1Q5",
            "exportedOutputs": [
              {
                "assetID": "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z",
                "fxID": "spdxUxVJQbX85MGxMHbKw1sHxMnSqJ3QBzDyDYEP3h6TLuxqQ",
                "output": {
                  "addresses": [
                    "P-avax1jkjyvlwclyu42n4yuegpczpfgwrf8r9lyj0d3c"
                  ],
                  "amount": 13838124063,
                  "locktime": 0,
                  "threshold": 1
                }
              }
            ]
          },
          "credentials": [
            {
              "signatures": [
                "0xc79711c4b48dcde205b63603efef7c61773a0eb47efb503fcebe40d21962b7c25ebd734057400a12cce9cf99aceec8462923d5d91fffe1cb908372281ed7385801"
              ]
            }
          ]
        }
      ]
    },
    "encoding": "json"
  },
  "id": 1
}
```

### platform.getBlockchains

Get all the blockchains that exist (excluding the P-Chain).

#### **Signature**

```sh
platform.getBlockchains() ->
{
    blockchains: []{
        id: string,
        name:string,
        subnetID: string,
        vmID: string
    }
}
```

* `blockchains` is all of the blockchains that exists on the Avalanche network.
* `name` is the human-readable name of this blockchain.
* `id` is the blockchain’s ID.
* `subnetID` is the ID of the Subnet that validates this blockchain.
* `vmID` is the ID of the Virtual Machine the blockchain runs.

#### **Example Call**

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getBlockchains",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Example Response**

```json
{
    "jsonrpc": "2.0",
    "result": {
        "blockchains": [
            {
                "id": "2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM",
                "name": "X-Chain",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "jvYyfQTxGMJLuGWa55kdP2p2zSUYsQ5Raupu4TW34ZAUBAbtq"
            },
            {
                "id": "2q9e4r6Mu3U68nU1fYjgbR6JvwrRx36CohpAX5UQxse55x1Q5",
                "name": "C-Chain",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "mgj786NP7uDwBCcq6YwThhaN8FLyybkCa4zBWTQbNgmK6k9A6"
            },
            {
                "id": "CqhF97NNugqYLiGaQJ2xckfmkEr8uNeGG5TQbyGcgnZ5ahQwa",
                "name": "Simple DAG Payments",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "sqjdyTKUSrQs1YmKDTUbdUhdstSdtRTGRbUn8sqK8B6pkZkz1"
            },
            {
                "id": "VcqKNBJsYanhVFxGyQE5CyNVYxL3ZFD7cnKptKWeVikJKQkjv",
                "name": "Simple Chain Payments",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "sqjchUjzDqDfBPGjfQq2tXW1UCwZTyvzAWHsNzF2cb1eVHt6w"
            },
            {
                "id": "2SMYrx4Dj6QqCEA3WjnUTYEFSnpqVTwyV3GPNgQqQZbBbFgoJX",
                "name": "Simple Timestamp Server",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH"
            },
            {
                "id": "KDYHHKjM4yTJTT8H8qPs5KXzE6gQH5TZrmP1qVr1P6qECj3XN",
                "name": "My new timestamp",
                "subnetID": "2bRCr6B4MiEfSjidDwxDpdCyviwnfUVqB2HGwhm947w9YYqb7r",
                "vmID": "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH"
            },
            {
                "id": "2TtHFqEAAJ6b33dromYMqfgavGPF3iCpdG3hwNMiart2aB5QHi",
                "name": "My new AVM",
                "subnetID": "2bRCr6B4MiEfSjidDwxDpdCyviwnfUVqB2HGwhm947w9YYqb7r",
                "vmID": "jvYyfQTxGMJLuGWa55kdP2p2zSUYsQ5Raupu4TW34ZAUBAbtq"
            }
        ]
    },
    "id": 1
}
```

### platform.getBlockchainStatus

Get the status of a blockchain.

#### **Signature**

```sh
platform.getBlockchainStatus(
    {
        blockchainID: string
    }
) -> {status: string}
```

`status` is one of:

* `Validating`: The blockchain is being validated by this node.
* `Created`: The blockchain exists but isn’t being validated by this node.
* `Preferred`: The blockchain was proposed to be created and is likely to be created but the transaction isn’t yet accepted.
* `Syncing`: This node is participating in this blockchain as a non-validating node.
* `Unknown`: The blockchain either wasn’t proposed or the proposal to create it isn’t preferred. The proposal may be resubmitted.

#### **Example Call**

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getBlockchainStatus",
    "params":{
        "blockchainID":"2NbS4dwGaf2p1MaXb65PrkZdXRwmSX4ZzGnUu7jm3aykgThuZE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Example Response**

```json
{
    "jsonrpc": "2.0",
    "result": {
        "status": "Created"
    },
    "id": 1
}
```

### platform.getCurrentSupply

Returns an upper bound on the number of AVAX that exist. This is an upper bound because it does not account for burnt tokens, including transaction fees.

#### **Signature**

```sh
platform.getCurrentSupply() -> {supply: int}
```

* `supply` is an upper bound on the number of AVAX that exist, denominated in nAVAX.

#### **Example Call**

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getCurrentSupply",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Example Response**

```json
{
    "jsonrpc": "2.0",
    "result": {
        "supply": "365865167637779183"
    },
    "id": 1
}
```

The response in this example indicates that AVAX’s supply is at most 365.865 million.

### platform.getCurrentValidators

List the current validators of the given Subnet.

The top level field `delegators` was [deprecated](deprecated-api-calls.md#getcurrentvalidators) as of v1.0.1, and removed in v1.0.6. Instead, each element of `validators` now contains the list of delegators for that validator.

#### **Signature**

```sh
platform.getCurrentValidators({
    subnetID: string, //optional
    nodeIDs: string[], //optional
}) -> {
    validators: []{
        txID: string,
        startTime: string,
        endTime: string,
        stakeAmount: string, //optional
        nodeID: string,
        weight: string, //optional
        rewardOwner: {
            locktime: string,
            threshold: string,
            addresses: string[]
        },
        potentialReward: string,
        delegationFee: string,
        uptime: string,
        connected: bool,
        delegators: []{
            txID: string,
            startTime: string,
            endTime: string,
            stakeAmount: string, //optional
            nodeID: string,
            rewardOwner: {
                locktime: string,
                threshold: string,
                addresses: string[]
            },
            potentialReward: string,
        }
    }
}
```

* `subnetID` is the subnet whose current validators are returned. If omitted, returns the current validators of the Primary Network.
* `nodeIDs` is a list of the nodeIDs of current validators to request. If omitted, all current validators are returned. If a specified nodeID is not in the set of current validators, it will not be included in the response.
* `validators`:
  * `txID` is the validator transaction.
  * `startTime` is the Unix time when the validator starts validating the Subnet.
  * `endTime` is the Unix time when the validator stops validating the Subnet.
  * `stakeAmount` is the amount of nAVAX this validator staked. Omitted if `subnetID` is not the Primary Network.
  * `nodeID` is the validator’s node ID.
  * `weight` is the validator’s weight when sampling validators. Omitted if `subnetID` is the Primary Network.
  * `rewardOwner` is an `OutputOwners` output which includes `locktime`, `threshold` and array of `addresses`.
  * `potentialReward` is the potential reward earned from staking
  * `delegationFeeRate` is the percent fee this validator charges when others delegate stake to them.
  * `uptime` is the % of time the queried node has reported the peer as online.
  * `connected` is if the node is connected to the network
  * `delegators` is the list of delegators to this validator:
    * `txID` is the delegator transaction.
    * `startTime` is the Unix time when the delegator started.
    * `endTime` is the Unix time when the delegator stops.
    * `stakeAmount` is the amount of nAVAX this delegator staked. Omitted if `subnetID` is not the Primary Network.
    * `nodeID` is the validating node’s node ID.
    * `rewardOwner` is an `OutputOwners` output which includes `locktime`, `threshold` and array of `addresses`.
    * `potentialReward` is the potential reward earned from staking
* `delegators`: (**deprecated as of v1.0.1. See note at top of method documentation.**)

#### **Example Call**

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getCurrentValidators",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Example Response**

```json
{
    "jsonrpc": "2.0",
    "result": {
        "validators": [
            {
                "txID": "2NNkpYTGfTFLSGXJcHtVv6drwVU2cczhmjK2uhvwDyxwsjzZMm",
                "startTime": "1600368632",
                "endTime": "1602960455",
                "stakeAmount": "2000000000000",
                "nodeID": "NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD",
                "rewardOwner": {
                    "locktime": "0",
                    "threshold": "1",
                    "addresses": [
                        "P-avax18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u"
                    ]
                },
                "potentialReward": "117431493426",
                "delegationFee": "10.0000",
                "uptime": "0.0000",
                "connected": false,
                "delegators": [
                    {
                        "txID": "Bbai8nzGVcyn2VmeYcbS74zfjJLjDacGNVuzuvAQkHn1uWfoV",
                        "startTime": "1600368523",
                        "endTime": "1602960342",
                        "stakeAmount": "25000000000",
                        "nodeID": "NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD",
                        "rewardOwner": {
                            "locktime": "0",
                            "threshold": "1",
                            "addresses": [
                                "P-avax18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u"
                            ]
                        },
                        "potentialReward": "11743144774"
                    }
                ]
            }
        ]
    },
    "id": 1
}
```

### platform.getHeight

Returns the height of the last accepted block.

#### **Signature**

```sh
platform.getHeight() ->
{
    height: int,
}
```

#### **Example Call**

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getHeight",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Example Response**

```json
{
    "jsonrpc": "2.0",
    "result": {
        "height": "56"
    },
    "id": 1
}
```

### platform.getMaxStakeAmount

Returns the maximum amount of nAVAX staking to the named node during a particular time period.

#### **Signature**

```sh
platform.getMaxStakeAmount(
    {
        subnetID: string,
        nodeID: string,
        startTime: int,
        endTime: int
    }
) -> 
{
    amount: uint64
}
```

* `subnetID` is a Buffer or cb58 string representing subnet
* `nodeID` is a string representing ID of the node whose stake amount is required during the given duration
* `startTime` is a big number denoting start time of the duration during which stake amount of the node is required.
* `endTime` is a big number denoting end time of the duration during which stake amount of the node is required.

#### **Example Call**

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getMaxStakeAmount",
    "params": {
        "subnetID":"11111111111111111111111111111111LpoYY",
        "nodeID":"NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg",
        "startTime": 1644240334,
        "endTime": 1644240634
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Example Response**

```json
{
    "jsonrpc": "2.0",
    "result": {
        "amount": "2000000000000000"
    },
    "id": 1
}
```

### platform.getMinStake

Get the minimum amount of AVAX required to validate the Primary Network and the minimum amount of AVAX that can be delegated.

#### **Signature**

```sh
platform.getMinStake() -> 
{
    minValidatorStake : uint64,
    minDelegatorStake : uint64
}
```

#### **Example Call**

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getMinStake"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Example Response**

```json
{
    "jsonrpc": "2.0",
    "result": {
        "minValidatorStake": "2000000000000",
        "minDelegatorStake": "25000000000"
    },
    "id": 1
}
```

### platform.getPendingValidators

List the validators in the pending validator set of the specified Subnet. Each validator is not currently validating the Subnet but will in the future.

#### **Signature**

```sh
platform.getPendingValidators({
    subnetID: string, //optional
    nodeIDs: string[], //optional
}) -> {
    validators: []{
        txID: string,
        startTime: string,
        endTime: string,
        stakeAmount: string, //optional
        nodeID: string,
        delegationFee: string,
        connected: bool,
        weight: string, //optional
    },
    delegators: []{
        txID: string,
        startTime: string,
        endTime: string,
        stakeAmount: string,
        nodeID: string
    }
}
```

* `subnetID` is the subnet whose current validators are returned. If omitted, returns the current validators of the Primary Network.
* `nodeIDs` is a list of the nodeIDs of pending validators to request. If omitted, all pending validators are returned. If a specified nodeID is not in the set of pending validators, it will not be included in the response.
* `validators`:
  * `txID` is the validator transaction.
  * `startTime` is the Unix time when the validator starts validating the Subnet.
  * `endTime` is the Unix time when the validator stops validating the Subnet.
  * `stakeAmount` is the amount of nAVAX this validator staked. Omitted if `subnetID` is not the Primary Network.
  * `nodeID` is the validator’s node ID.
  * `connected` if the node is connected.
  * `weight` is the validator’s weight when sampling validators. Omitted if `subnetID` is the Primary Network.
* `delegators`:
  * `txID` is the delegator transaction.
  * `startTime` is the Unix time when the delegator starts.
  * `endTime` is the Unix time when the delegator stops.
  * `stakeAmount` is the amount of nAVAX this delegator staked. Omitted if `subnetID` is not the Primary Network.
  * `nodeID` is the validating node’s node ID.

#### **Example Call**

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Example Response**

```json
{
    "jsonrpc": "2.0",
    "result": {
        "validators": [
            {
                "txID": "2NNkpYTGfTFLSGXJcHtVv6drwVU2cczhmjK2uhvwDyxwsjzZMm",
                "startTime": "1600368632",
                "endTime": "1602960455",
                "stakeAmount": "200000000000",
                "nodeID": "NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD",
                "delegationFee": "10.0000",
                "connected": false
            }
        ],
        "delegators": [
            {
                "txID": "Bbai8nzGVcyn2VmeYcbS74zfjJLjDacGNVuzuvAQkHn1uWfoV",
                "startTime": "1600368523",
                "endTime": "1602960342",
                "stakeAmount": "20000000000",
                "nodeID": "NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg"
            }
        ]
    },
    "id": 1
}
```

### platform.getRewardUTXOs

Returns the UTXOs that were rewarded after the provided transaction's staking or delegation period ended.

#### **Signature**

```sh
platform.getRewardUTXOs({
    txID: string,
    encoding: string //optional
}) -> {
    numFetched: integer,
    utxos: []string,
    encoding: string
}
```

* `txID` is the ID of the staking or delegating transaction
* `numFetched` is the number of returned UTXOs
* `utxos` is an array of encoded reward UTXOs 
* `encoding` specifies the format for the returned UTXOs. Can be either "cb58" or "hex" and defaults to "cb58".

#### **Example Call**

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getRewardUTXOs",
    "params": {
        "txID": "2nmH8LithVbdjaXsxVQCQfXtzN9hBbmebrsaEYnLM9T32Uy2Y5"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Example Response**

```json
{
    "jsonrpc": "2.0",
    "result": {
        "numFetched": "2",
        "utxos": [
            "11Zf8cc55Qy1rVgy3t87MJVCSEu539whRSwpdbrtHS6oh5Hnwv1gz8G3BtLJ73MPspLkD83cygZufT4TPYZCmuxW5cRdPrVMbZAHfb6uyGM1jNGBhBiQAgQ6V1yceYf825g27TT6WU4bTdbniWdECDWdGdi84hdiqSJH2y",
            "11Zf8cc55Qy1rVgy3t87MJVCSEu539whRSwpdbrtHS6oh5Hnwv1NjNhqZnievVs2kBD9qTrayBYRs81emGTtmnu2wzqpLstbAPJDdVjf3kjwGWywNCdjV6TPGojVR5vHpJhBVRtHTQXR9VP9MBdHXge8zEBsQJAoZhTbr2"
        ],
        "encoding": "cb58"
    },
    "id": 1
}
```

### platform.getStakingAssetID

Retrieve an assetID for a subnet’s staking asset. Currently, this only returns the Primary Network’s staking assetID.

#### **Signature**

```sh
platform.getStakingAssetID({
    subnetID: string //optional
}) -> {
    assetID: string
}
```

* `subnetID` is the subnet whose assetID is requested.
* `assetID` is the assetID for a subnet’s staking asset.

#### **Example Call**

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getStakingAssetID",
    "params": {
        "subnetID": "11111111111111111111111111111111LpoYY"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Example Response**

```json
{
    "jsonrpc": "2.0",
    "result": {
        "assetID": "2fombhL7aGPwj3KH4bfrmJwW6PVnMobf9Y2fn9GwxiAAJyFDbe"
    },
    "id": 1
}
```

### platform.getSubnets

Get info about the Subnets.

#### **Signature**

```sh
platform.getSubnets(
    {ids: []string}
) ->
{
    subnets: []{
        id: string,
        controlKeys: []string,
        threshold: string
    }
}
```

* `ids` are the IDs of the subnets to get information about. If omitted, gets information about all subnets.
* `id` is the Subnet’s ID.  
* `threshold` signatures from addresses in `controlKeys` are needed to add a validator to the subnet.  

See [here](../tutorials/nodes-and-staking/add-a-validator.md) for information on adding a validator to a Subnet.

#### **Example Call**

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getSubnets",
    "params": {"ids":["hW8Ma7dLMA7o4xmJf3AXBbo17bXzE7xnThUd3ypM4VAWo1sNJ"]},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Example Response**

```json
{
    "jsonrpc": "2.0",
    "result": {
        "subnets": [
            {
                "id": "hW8Ma7dLMA7o4xmJf3AXBbo17bXzE7xnThUd3ypM4VAWo1sNJ",
                "controlKeys": [
                    "KNjXsaA1sZsaKCD1cd85YXauDuxshTes2",
                    "Aiz4eEt5xv9t4NCnAWaQJFNz5ABqLtJkR"
                ],
                "threshold": "2"
            }
        ]
    },
    "id": 1
}'
```

### platform.getStake

Get the amount of nAVAX staked by a set of addresses. The amount returned does not include staking rewards.

#### **Signature**

```sh
platform.getStake({addresses: []string}) -> {staked: int}
```

#### **Example Call**

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getStake",
    "params": {
        "addresses": [
            "P-everest1g3ea9z5kmkzwnxp8vr8rpjh6lqw4r0ufec460d",
            "P-everest12un03rm579fewele99c4v53qnmymwu46dv3s5v"
        ]
    },
    "id": 1
}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Example Response**

```json
{
    "jsonrpc": "2.0",
    "result": {
        "staked": "5000000"
    },
    "id": 1
}
```

### platform.getTimestamp

Get the current P-Chain timestamp.

#### **Signature**

```sh
platform.getTimestamp() -> {time: string}
```

#### **Example Call**

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTimestamp",
    "params": {},
    "id": 1
}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Example Response**

```json
{
    "jsonrpc": "2.0",
    "result": {
        "timestamp": "2021-09-07T00:00:00-04:00"
    },
    "id": 1
}
```

### platform.getTotalStake

Get the total amount of nAVAX staked on the Primary Network.

#### **Signature**

```sh
platform.getTotalStake() -> {stake: int}
```

#### **Example Call**

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTotalStake",
    "params": {},
    "id": 1
}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Example Response**

```json
{
    "jsonrpc": "2.0",
    "result": {
        "stake": "279825917679866811"
    },
    "id": 1
}
```

### platform.getTx

Gets a transaction by its ID.

Optional `encoding` parameter to specify the format for the returned transaction. Can be either "cb58", "hex", or "json". Defaults to "cb58".

#### **Signature**

```sh
platform.getTx({
    txID: string,
    encoding: string //optional
}) -> {
    tx: string,
    encoding: string,
}
```

#### CB58 Example

##### **Example Call**

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTx",
    "params": {
        "txID":"2Eug3Y6j1yD745y5bQ9bFCf5nvU2qT1eB53GSpD15EkGUfu8xh",
        "encoding": "cb58"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

##### **Example Response**

```json
{
    "jsonrpc": "2.0",
    "result": {
        "tx": "111117ukQs6mcsKobtCH2jrVemXbPL2SgZTxJ4Lg7zazMjo4Kyyo33YNwnwhUJToHRk7zmCFXbL6BieJWpLch9Aa8opKr7qJeWPjSWhriX9TQLBt5jxq9ijX9JB3dwNG7MtY5KXS6EWF3w3tHBL5GTfL36F2b1PJfcWQQoTgeQWoe8MJXM27LGjnkhTMEzuNpTyrEcranPgXwdy9nNVZiLGMyYpzXbnmV2JUkGZXap8Ye3faWBwNg1La4aCXFKZ7ADMSiQUgqWYDMGZkDEg3yXNifSsBiAvqeCTx8kKp4B5W1vsgf3Tko2XW6A3SrkNVFVmbqCNjPKPpKeoSPnAC5Wmrb9zTMSZqYG9F6E7myow4o7tubbeDU3FC6fSws5ytQAnFseKUUT94jBGFGDD9pAuXExFwdwgRRUUS228ai4AZMqEF7KW5J9FhFQCUxMyprLxdPEUrjw3jW",
        "encoding": "cb58"
    },
    "id": 1
}
```

#### JSON Example

##### **Example Call**

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTx",
    "params": {
        "txID":"2Eug3Y6j1yD745y5bQ9bFCf5nvU2qT1eB53GSpD15EkGUfu8xh",
        "encoding": "json"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

##### **Example Response**

```json
{
  "jsonrpc": "2.0",
  "result": {
    "tx": {
      "unsignedTx": {
        "inputs": {
          "networkID": 5,
          "blockchainID": "11111111111111111111111111111111LpoYY",
          "outputs": [],
          "inputs": [
            {
              "txID": "2QYG5yR6YW55ixmBvR4zXLCZKV9we9bmSWHHiGppF4Ko17bTPn",
              "outputIndex": 0,
              "assetID": "U8iRqJoiJm8xZHAacmvYyZVwqQx6uDNtQeP3CQ6fcgQk3JqnK",
              "fxID": "spdxUxVJQbX85MGxMHbKw1sHxMnSqJ3QBzDyDYEP3h6TLuxqQ",
              "input": {
                "amount": 1998000000,
                "signatureIndices": [
                  0
                ]
              }
            }
          ],
          "memo": "0x"
        },
        "destinationChain": "yH8D7ThNJkxmtkuv2jgBa4P1Rn3Qpr4pPr7QYNfcdoS6k6HWp",
        "exportedOutputs": [
          {
            "assetID": "U8iRqJoiJm8xZHAacmvYyZVwqQx6uDNtQeP3CQ6fcgQk3JqnK",
            "fxID": "spdxUxVJQbX85MGxMHbKw1sHxMnSqJ3QBzDyDYEP3h6TLuxqQ",
            "output": {
              "addresses": [
                "P-fuji1yhem6kev6gkfsyse3m5z09e6qsuxujz0arpw8v"
              ],
              "amount": 1997000000,
              "locktime": 0,
              "threshold": 1
            }
          }
        ]
      },
      "credentials": [
        {
          "signatures": [
            "0xdbc03ebd7d06927baacf7aea85cdebd7e0b95cf5b57715a09981fd5a75dac2cb610636bf3657ba4ca47dad4beed2e7f0ec692e7f12f1bbc9f3c34fc5c18ae35d01"
          ]
        }
      ]
    },
    "encoding": "json"
  },
  "id": 1
}
```


### platform.getTxStatus

Gets a transaction’s status by its ID. If the transaction was dropped, response will include a `reason` field with more information why the transaction was dropped.

See [here](deprecated-api-calls.md#gettxstatus) for notes on previous behavior.

#### **Signature**

```sh
platform.getTxStatus({
    txID: string
}) -> {status: string}
```

`status` is one of:

* `Committed`: The transaction is (or will be) accepted by every node
* `Processing`: The transaction is being voted on by this node
* `Dropped`: The transaction will never be accepted by any node in the network, check `reason` field for more information
* `Unknown`: The transaction hasn’t been seen by this node

#### **Example Call**

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTxStatus",
    "params": {
        "txID":"TAG9Ns1sa723mZy1GSoGqWipK6Mvpaj7CAswVJGM6MkVJDF9Q"
   },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Example Response**

```json
{
    "jsonrpc": "2.0",
    "result": {
        "status": "Committed"
    },
    "id": 1
}
```

### platform.getUTXOs

Gets the UTXOs that reference a given set of addresses.

#### **Signature**

```sh
platform.getUTXOs(
    {
        addresses: []string,
        limit: int, //optional
        startIndex: { //optional
            address: string,
            utxo: string
        },
        sourceChain: string, //optional
        encoding: string, //optional
    },
) -> 
{
    numFetched: int,
    utxos: []string,
    endIndex: {
        address: string,
        utxo: string
    },
    encoding: string,
}
```

* `utxos` is a list of UTXOs such that each UTXO references at least one address in `addresses`.
* At most `limit` UTXOs are returned. If `limit` is omitted or greater than 1024, it is set to 1024.
* This method supports pagination. `endIndex` denotes the last UTXO returned. To get the next set of UTXOs, use the value of `endIndex` as `startIndex` in the next call.
* If `startIndex` is omitted, will fetch all UTXOs up to `limit`.
* When using pagination (ie when `startIndex` is provided), UTXOs are not guaranteed to be unique across multiple calls. That is, a UTXO may appear in the result of the first call, and then again in the second call.
* When using pagination, consistency is not guaranteed across multiple calls. That is, the UTXO set of the addresses may have changed between calls.
* `encoding` specifies the format for the returned UTXOs. Can be either "cb58" or "hex" and defaults to "cb58".

#### **Example**

Suppose we want all UTXOs that reference at least one of `P-avax1s994jad0rtwvlfpkpyg2yau9nxt60qqfv023qx` and `P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr`.

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getUTXOs",
    "params" :{
        "addresses":["P-avax1s994jad0rtwvlfpkpyg2yau9nxt60qqfv023qx", "P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr"],
        "limit":5,
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

This gives response:

```json
{
    "jsonrpc": "2.0",
    "result": {
        "numFetched": "5",
        "utxos": [
            "11PQ1sNw9tcXjVki7261souJnr1TPFrdVCu5JGZC7Shedq3a7xvnTXkBQ162qMYxoerMdwzCM2iM1wEQPwTxZbtkPASf2tWvddnsxPEYndVSxLv8PDFMwBGp6UoL35gd9MQW3UitpfmFsLnAUCSAZHWCgqft2iHKnKRQRz",
            "11RCDVNLzFT8KmriEJN7W1in6vB2cPteTZHnwaQF6kt8B2UANfUkcroi8b8ZSEXJE74LzX1mmBvtU34K6VZPNAVxzF6KfEA8RbYT7xhraioTsHqxVr2DJhZHpR3wGWdjUnRrqSSeeKGE76HTiQQ8WXoABesvs8GkhVpXMK",
            "11GxS4Kj2od4bocNWMQiQhcBEHsC3ZgBP6edTgYbGY7iiXgRVjPKQGkhX5zj4NC62ZdYR3sZAgp6nUc75RJKwcvBKm4MGjHvje7GvegYFCt4RmwRbFDDvbeMYusEnfVwvpYwQycXQdPFMe12z4SP4jXjnueernYbRtC4qL",
            "11S1AL9rxocRf2NVzQkZ6bfaWxgCYch7Bp2mgzBT6f5ru3XEMiVZM6F8DufeaVvJZnvnHWtZqocoSRZPHT5GM6qqCmdbXuuqb44oqdSMRvLphzhircmMnUbNz4TjBxcChtks3ZiVFhdkCb7kBNLbBEmtuHcDxM7MkgPjHw",
            "11Cn3i2T9SMArCmamYUBt5xhNEsrdRCYKQsANw3EqBkeThbQgAKxVJomfc2DE4ViYcPtz4tcEfja38nY7kQV7gGb3Fq5gxvbLdb4yZatwCZE7u4mrEXT3bNZy46ByU8A3JnT91uJmfrhHPV1M3NUHYbt6Q3mJ3bFM1KQjE"
        ],
        "endIndex": {
            "address": "P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr",
            "utxo": "kbUThAUfmBXUmRgTpgD6r3nLj7rJUGho6xyht5nouNNypH45j"
        },
        "encoding": "cb58"
    },
    "id": 1
}
```

Since `numFetched` is the same as `limit`, we can tell that there may be more UTXOs that were not fetched. We call the method again, this time with `startIndex`:

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getUTXOs",
    "params" :{
        "addresses":["P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr"],
        "limit":5,
        "startIndex": {
            "address": "P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr",
            "utxo": "kbUThAUfmBXUmRgTpgD6r3nLj7rJUGho6xyht5nouNNypH45j"
        },
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

This gives response:

```json
{
    "jsonrpc": "2.0",
    "result": {
        "numFetched": "4",
        "utxos": [
            "115ZLnNqzCsyugMY5kbLnsyP2y4se4GJBbKHjyQnbPfRBitqLaxMizsaXbDMU61fHV2MDd7fGsDnkMzsTewULi94mcjk1bfvP7aHYUG2i3XELpV9guqsCtv7m3m3Kg4Ya1m6tAWqT7PhvAaW4D3fk8W1KnXu5JTWvYBqD2",
            "11QASUuhw9M1r52maTFUZ4fnuQby9inX77VYxePQoNavEyCPuHN5cCWPQnwf8fMrydFXVMPAcS4UJAcLjSFskNEmtVPDMY4UyHwh2MChBju6Y7V8yYf3JBmYt767NPsdS3EqgufYJMowpud8fNyH1to4pAdd6A9CYbD8KG",
            "11MHPUWT8CsdrtMWstYpFR3kobsvRrLB4W8tP9kDjhjgLkCJf9aaJQM832oPcvKBsRhCCxfKdWr2UWPztRCU9HEv4qXVwRhg9fknAXzY3a9rXXPk9HmArxMHLzGzRECkXpXb2dAeqaCsZ637MPMrJeWiovgeAG8c5dAw2q",
            "11K9kKhFg75JJQUFJEGiTmbdFm7r1Uw5zsyDLDY1uVc8zo42WNbgcpscNQhyNqNPKrgtavqtRppQNXSEHnBQxEEh5KbAEcb8SxVZjSCqhNxME8UTrconBkTETSA23SjUSk8AkbTRrLz5BAqB6jo9195xNmM3WLWt7mLJ24"
        ],
        "endIndex": {
            "address": "P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr",
            "utxo": "21jG2RfqyHUUgkTLe2tUp6ETGLriSDTW3th8JXFbPRNiSZ11jK"
        },
        "encoding": "cb58"
    },
    "id": 1
}
```

Since `numFetched` is less than `limit`, we know that we are done fetching UTXOs and don’t need to call this method again.

Suppose we want to fetch the UTXOs exported from the X Chain to the P Chain in order to build an ImportTx. Then we need to call GetUTXOs with the sourceChain argument in order to retrieve the atomic UTXOs:

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getUTXOs",
    "params" :{
        "addresses":["P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr"],
        "sourceChain": "X",
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

This gives response:

```json
{
    "jsonrpc": "2.0",
    "result": {
        "numFetched": "1",
        "utxos": [
            "115P1k9aSVFBfi9siZZz135jkrBCdEMZMbZ82JaLLuML37cgVMvGwefFXr2EaH2FML6mZuCehMLDdXSVE5aBwc8ePn8WqtZgDv9W641JZoLQhWY8fmvitiBLrc3Zd1aJPDxPouUVXFmLEbmcUnQxfw1Hyz1jpPbWSioowb"
        ],
        "endIndex": {
            "address": "P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr",
            "utxo": "S5UKgWoVpoGFyxfisebmmRf8WqC7ZwcmYwS7XaDVZqoaFcCwK"
        },
        "encoding": "cb58"
    },
    "id": 1
}
```

### platform.getValidatorsAt

Get the validators and their weights of a subnet or the Primary Network at a given P-Chain height.

#### **Signature**

```sh
platform.getValidatorsAt(
    {
        height: int,
        subnetID: string, // optional
    }
)
```

* `height` is the P-Chain height to get the validator set at.
* `subnetID` is the subnet ID to get the validator set of. If not given, gets validator set of the Primary Network.

#### **Example Call**

```bash
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getValidatorsAt",
    "params": {
        "height":1
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Example Response**

```json
{
    "jsonrpc": "2.0",
    "result": {
        "validators": {
            "NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg": 2000000000000000,
            "NodeID-GWPcbFJZFfZreETSoWjPimr846mXEKCtu": 2000000000000000,
            "NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ": 2000000000000000,
            "NodeID-NFBbbJ4qCmNaCzeW7sxErhvWqvEQMnYcN": 2000000000000000,
            "NodeID-P7oB2McjBGgW2NXXWVYjV8JEDFoW9xDE5": 2000000000000000
        }
    },
    "id": 1
}
```

### platform.importAVAX

Complete a transfer of AVAX from the X-Chain to the P-Chain.

Before this method is called, you must call the X-Chain’s [`avm.export`](x-chain.mdx#avmexport) method with assetID `AVAX` to initiate the transfer.

#### **Signature**

```sh
platform.importAVAX(
    {
        from: []string, //optional
        to: string,
        changeAddr: string, //optional
        username: string,
        password: string
    }
) -> 
{
    tx: string,
    changeAddr: string
}
```

* `to` is the ID of the address the AVAX is imported to. This must be the same as the `to` argument in the corresponding call to the X-Chain’s `export`.
* `from` are the addresses that you want to use for this operation. If omitted, uses any of your addresses as needed.
* `changeAddr` is the address any change will be sent to. If omitted, change is sent to one of the addresses controlled by the user.
* `username` is the user that controls from and change addresses.
* `password` is `username`‘s password.

#### **Example Call**

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.importAVAX",
    "params": {
        "to": "P-avax1apzq2zt0uaaatum3wdz83u4z7dv4st7l5m5n2a",
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username": "myUsername",
        "password": "myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Example Response**

```json
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "P63NjowXaQJXt5cmspqdoD3VcuQdXUPM5eoZE2Vcg63aVEx8R",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

### platform.importKey

Give a user control over an address by providing the private key that controls the address.

#### **Signature**

```sh
platform.importKey({
    username: string,
    password: string,
    privateKey:string
}) -> {address: string}
```

* Add `privateKey` to `username`‘s set of private keys. `address` is the address `username` now controls with the private key.

#### **Example Call**

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.importKey",
    "params" :{
        "username": "myUsername",
        "password": "myPassword",
        "privateKey": "PrivateKey-2w4XiXxPfQK4TypYqnohRL8DRNTz9cGiGmwQ1zmgEqD9c9KWLq"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Example Response**

```json
{
    "jsonrpc":"2.0",
    "id": 1,
    "result": {
        "address":"P-avax19hwpvkx2p5q99w87dlpfhqpt3czyh8ywasfaym"
    }
}
```

### platform.issueTx

Issue a transaction to the Platform Chain.

#### **Signature**

```sh
platform.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {txID: string}
```

* `tx` is the byte representation of a transaction.
* `encoding` specifies the encoding format for the transaction bytes. Can be either "cb58" or "hex". Defaults to "cb58".
* `txID` is the transaction’s ID.

#### **Example Call**

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.issueTx",
    "params": {
        "tx":"111Bit5JNASbJyTLrd2kWkYRoc96swEWoWdmEhuGAFK3rCAyTnTzomuFwgx1SCUdUE71KbtXPnqj93KGr3CeftpPN37kVyqBaAQ5xaDjr7wVBTUYi9iV7kYJnHF61yovViJF74mJJy7WWQKeRMDRTiPuii5gsd11gtNahCCsKbm9seJtk2h1wAPZn9M1eL84CGVPnLUiLP",
        "encoding": "cb58"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Example Response**

```json
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "G3BuH6ytQ2averrLxJJugjWZHTRubzCrUZEXoheG5JMqL5ccY"
    },
    "id": 1
}
```

### platform.listAddresses

List addresses controlled by the given user.

#### **Signature**

```sh
platform.listAddresses({
    username: string,
    password: string
}) -> {addresses: []string}
```

#### **Example Call**

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.listAddresses",
    "params": {
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

#### **Example Response**

```json
{
    "jsonrpc": "2.0",
    "result": {
        "addresses": ["P-avax1ffksh2m592yjzwfp2xmdxe3z4ushln9s09z5p0"]
    },
    "id": 1
}
```

### platform.sampleValidators

Sample validators from the specified Subnet.

#### **Signature**

```sh
platform.sampleValidators(
    {
        size: int,
        subnetID: string, //optional
    }
) ->
{
    validators: []string
}
```

* `size` is the number of validators to sample.
* `subnetID` is the Subnet to sampled from. If omitted, defaults to the Primary Network.
* Each element of `validators` is the ID of a validator.

#### **Example Call**

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.sampleValidators",
    "params" :{
        "size":2
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Example Response**

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "validators":[
            "NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ",
            "NodeID-NFBbbJ4qCmNaCzeW7sxErhvWqvEQMnYcN"
        ]
    }
}
```

### platform.validatedBy

Get the Subnet that validates a given blockchain.

#### **Signature**

```sh
platform.validatedBy(
    {
        blockchainID: string
    }
) -> {subnetID: string}
```

* `blockchainID` is the blockchain’s ID.
* `subnetID` is the ID of the Subnet that validates the blockchain.

#### **Example Call**

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.validatedBy",
    "params": {
        "blockchainID": "KDYHHKjM4yTJTT8H8qPs5KXzE6gQH5TZrmP1qVr1P6qECj3XN"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Example Response**

```json
{
    "jsonrpc": "2.0",
    "result": {
        "subnetID": "2bRCr6B4MiEfSjidDwxDpdCyviwnfUVqB2HGwhm947w9YYqb7r"
    },
    "id": 1
}
```

### platform.validates

Get the IDs of the blockchains a Subnet validates.

#### **Signature**

```sh
platform.validates(
    {
        subnetID: string
    }
) -> {blockchainIDs: []string}
```

* `subnetID` is the Subnet’s ID.
* Each element of `blockchainIDs` is the ID of a blockchain the Subnet validates.

#### **Example Call**

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.validates",
    "params": {
        "subnetID":"2bRCr6B4MiEfSjidDwxDpdCyviwnfUVqB2HGwhm947w9YYqb7r"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Example Response**

```json
{
    "jsonrpc": "2.0",
    "result": {
        "blockchainIDs": [
            "KDYHHKjM4yTJTT8H8qPs5KXzE6gQH5TZrmP1qVr1P6qECj3XN",
            "2TtHFqEAAJ6b33dromYMqfgavGPF3iCpdG3hwNMiart2aB5QHi"
        ]
    },
    "id": 1
}
```

