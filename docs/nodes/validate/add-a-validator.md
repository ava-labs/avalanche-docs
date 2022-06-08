---
sidebar_position: 3
---

# Add a Node to the Validator Set

## Introduction

The [Primary Network](https://support.avax.network/en/articles/4135650-what-is-the-primary-network) is inherent to the Avalanche platform and validates Avalanche’s [built-in blockchains](../../overview/getting-started/avalanche-platform.md). In this tutorial, we’ll add a node to the Primary Network on Avalanche.

The P-Chain manages metadata on Avalanche. This includes tracking which nodes are in which subnets, which blockchains exist, and which subnets are validating which blockchains. To add a validator, we’ll issue [transactions](http://support.avalabs.org/en/articles/4587384-what-is-a-transaction) to the P-Chain.

:::danger
Note that once you issue the transaction to add a node as a validator, there is no way to change the parameters. **You can’t remove your stake early or change the stake amount, node ID, or reward address.** Please make sure you’re using the correct values in the API calls below. If you’re not sure, feel free to join our [Discord](https://chat.avalabs.org/) to ask questions.
:::

## Requirements

You've completed [Run an Avalanche Node](../build/run-avalanche-node-manually.md) and are familiar with [Avalanche's architecture](../../overview/getting-started/avalanche-platform.md). In this tutorial, we use [AvalancheJS](../../apis/avalanchejs/README.md) and [Avalanche’s Postman collection](https://github.com/ava-labs/avalanche-postman-collection) to help us make API calls.

In order to ensure your node is well-connected, make sure that your node can receive and send TCP traffic on the staking port (`9651` by default) and that you started your node with config flag `--public-ip=[YOUR NODE'S PUBLIC IP HERE]`. Failing to do either of these may jeopardize your staking reward.

## Add a validator with Avalanche Wallet

First, we show you how to add your node as a validator by using [Avalanche Wallet](https://wallet.avax.network).

### Retrieve the Node ID

Get your node’s ID by calling [`info.getNodeID`](../../apis/avalanchego/apis/info.md#infogetnodeid):

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

The response has your node’s ID:

```json
{
  "jsonrpc": "2.0",
  "result": {
    "nodeID": "NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD"
  },
  "id": 1
}
```

### Add as a Validator

Open [the wallet](https://wallet.avax.network/), and go the `Earn` tab. Choose `Add Validator` under the `Validate` section.

Fill out the staking parameters. They are explained in more detail in [this doc](../validate/staking.md). When you’ve filled in all the staking parameters and double-checked them, click `Confirm`. Make sure the staking period is at least 2 weeks, the delegation fee rate is at least 2%, and you’re staking at least 2,000 AVAX on Mainnet (1 AVAX on Fuji Testnet).

You should a success message, and your balance should be updated.

Calling [`platform.getPendingValidators`](../../apis/avalanchego/apis/p-chain.md#platformgetpendingvalidators) verifies that our transaction was accepted.

Go back to the `Earn` tab, and click `Estimated Rewards`.

Once your validator’s start time has passed, you will see the rewards it may earn, as well as its start time, end time, and the percentage of its validation period that has passed.

That’s it!

## Add a validator with AvalancheJS

We can also add a node to the validator set using [AvalancheJS](../../apis/avalanchejs/README.md).

### Install AvalancheJS

To use AvalancheJS, you can clone the repo:

```zsh
$ git clone https://github.com/ava-labs/avalanchejs.git
```

or add it to an existing project:

```zsh
$ yarn add --dev avalanche
```

For this tutorial we will use [`ts-node`](https://www.npmjs.com/package/ts-node) to run the example scripts directly from an AvalancheJS directory.

### Fuji Workflow

In this section, we will use Fuji Testnet to show how to add a node to the validator set.

Open your AvalancheJS directory and select the [**`examples/platformvm`**](https://github.com/ava-labs/avalanchejs/tree/master/examples/platformvm) folder to view the source code for the examples scripts.

We will use the [**`buildAddValidatorTx.ts`**](https://github.com/ava-labs/avalanchejs/blob/master/examples/platformvm/buildAddValidatorTx.ts) script to add a validator.

#### Private Key

Locate this line in the file

```js
const privKey: string = `${PrivateKeyPrefix}${DefaultLocalGenesisPrivateKey}`;
```

and replace this with a [private key that you control](https://github.com/ava-labs/avalanchejs/blob/master/examples/platformvm/createKeypair.ts).

```js
const privKey: string = "<YOUR-PRIVATE-KEY-HERE>";
```

#### Network Setting

The following settings work when using a local node started with [`--network-id=fuji`](../../nodes/maintain/avalanchego-config-flags.md#network-id):

```js
const ip: string = "localhost";
const port: number = 9650;
const protocol: string = "http";
const networkID: number = 5;
```

However, to connect directly to the [Avalanche Fuji Testnet API server](../../apis/avalanchego/public-api-server.md), the following changes are needed:

```js
const ip: string = "api.avax-test.network";
const port: number = 443;
const protocol: string = "https";
const networkID: number = 5;
```

Depending on the networkID passed in when instantiating an `Avalanche` object in the code, the encoded addresses used will have a distinctive Human Readable Part(HRP) per each network.

_Example Address: 5 - X-`fuji`19rknw8l0grnfunjrzwxlxync6zrlu33yxqzg0h_

For Fuji Testnet, 5 is the correct value to use.

To learn more about encoded addresses, click [here](../../apis/avalanchejs/manage-x-chain-keys.md#encode-bech32-addresses).

#### Settings for Validation

Next we need to specify the node's validation period and delegation fee.

```ts
const nodeID: string = "NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg";
const startTime: BN = UnixNow().add(new BN(60 * 1));
const endTime: BN = startTime.add(new BN(26300000));
const delegationFee: number = 10;
```

#### Node ID

This is the node ID of the validator being added. See [above section](#retrieve-the-node-id) on how to retrieve the node id by using API [`info.getNodeID`](../../apis/avalanchego/apis/info.md#infogetnodeid).

#### Staking Period

`startTime` and `endTime` are required to specify the time of starting/leaving validation. The minimum duration that one can validate the Primary Network is 2 weeks, and the maximum duration is one year. One can start a new validation on the Primary Network after finishing one, it’s just that the maximum _continuous_ duration is one year. `startTime` and `endTime` are the Unix times when your validator will start and stop validating the Primary Network, respectively. `startTime` must be in the future relative to the time the transaction is issued.

The sample code uses `const startTime: BN = UnixNow().add(new BN(60 * 1))` and
`const endTime: BN = startTime.add(new BN(26300000))` to compute the Unix time 1 minute and 304 days in the future (at the time when this article was written) to use as the values of `startTime` and `endTime`, respectively.

:::tip
You can create your own unix timestamp [here](https://www.unixtimestamp.com/) or by using the `UnixNow()` method
:::

To create your own start times, please follow the steps below:

Locate this line in the file

```ts
const startTime: BN = UnixNow().add(new BN(60 * 1));
const endTime: BN = startTime.add(new BN(26300000));
```

Change `startTime` and `endTime` to new `BN` values, for example:

```ts
const startTime: BN = new BN(1654656829); // Wed Jun 08 2022 02:53:49 GMT+0000
const endTime: BN = new BN(1662602029); // Thu Sep 08 2022 01:53:49 GMT+0000
```

#### Delegation Fee Rate

Avalanche allows for delegation of stake. This parameter is the percent fee this validator charges when others delegate stake to them. For example, if `delegationFeeRate` is `10` and someone delegates to this validator, then when the delegation period is over, 10% of the reward goes to the validator and the rest goes to the delegator, if this node meets the validation reward requirements.

#### Stake Amount

The sample code assigns the variable, `stakeAmount` to be the minimum amount of AVAX that a node must stake to become a validator(1 AVAX).

```ts
const stakeAmount: any = await pchain.getMinStake();
```

To stake a different amount, please replace the code above with a stake amount of 1 AVAX or greater. Below sets a new value of 10,000 AVAX (`10000000000000` GWEI). Value is set in GWEI format where `1,000,000,000` GWEI = 1 AVAX.

Please follow the example below for steps to change the stake amount:

Locate this line in the file

```js
  const unsignedTx: UnsignedTx = await pchain.buildAddValidatorTx(
    ...
    stakeAmount.minValidatorStake,
    ...
  )
```

and change the default value to a new `BN` value, for example:

```js
  const unsignedTx: UnsignedTx = await pchain.buildAddValidatorTx(
    ...
    new BN(1e12),
    ...
  )
```

#### Addresses

`toAddresses`

An array of addresses as [Buffer](https://github.com/feross/buffer) who receive the staked tokens at the end of the staking period.

`fromAddresses`

An array of addresses as a [Buffer](https://github.com/feross/buffer) who own the staking UTXOs.

`changeAddresses`

Any change/left-over resulting from this transaction will be sent to these addresses. You can leave this field empty; if you do, change will be sent to one of the addresses your user controls.

`rewardAddresses`

When a validator stops validating the Primary Network, they will receive a reward if they are sufficiently responsive and correct while they validated the Primary Network. These tokens are sent to `rewardAddresses`. The original stake will be sent back to the addresses defined in `toAddresses`.

A validator’s stake is never slashed, regardless of their behavior; they will always receive their stake back when they’re done validating.

By default, the example uses the variable `pAddressStrings` to define `toAddresses`, `fromAddresses`, `changeAddress` and `rewardAddresses`:

```js
const pAddressStrings: string[] = pchain.keyChain().getAddressStrings();
```

This retrieves the P-Chain addresses that belong to the `private key` that appears earlier in the example.

If you wish to change these addresses, please follow the steps below:

Locate this line in the file

```js
const unsignedTx: UnsignedTx = await pchain.buildAddValidatorTx(
...
    pAddressStrings,
    pAddressStrings,
    pAddressStrings,
...
    pAddressStrings,
...
  )
```

and change the specified `pAddressStrings` to the P-Chain address of choice. Please use array format when passing in each new P-Chain address.

```js
const unsignedTx: UnsignedTx = await pchain.buildAddValidatorTx(
...
    ["<YOUR-PCHAIN-ADDRESS-HERE>"],
    ["<YOUR-PCHAIN-ADDRESS-HERE>"],
    ["<YOUR-PCHAIN-ADDRESS-HERE>"],
...
    ["<YOUR-PCHAIN-ADDRESS-HERE>"],
...
  )
```

#### Execute the Code

Now that we have made all of the necessary changes to our example script, it's time to add a validator to the Fuji Network.

Run the command:

```zsh
avlanchejs $ ts-node examples/platformvm/buildAddValidatorTx.ts
```

The response has the transaction ID.

```
avlanchejs $ Success! TXID: 2ftDVwmss5eJk8HFsNVi6a3vWK9s3szZFhEeSY2HCS8xDb8Cra
```

We can check the transaction’s status by running the example script: [`getTxStatus.ts`](https://github.com/ava-labs/avalanchejs/blob/master/examples/platformvm/getTxStatus.ts) following the steps below:

1. Ensure that your [network settings](#network-setting) are correct before running the script.

2. Locate this line in the file

```js
const main = async (): Promise<any> => {
  const txID: string = "x1NLb9JaHkKTXvSRReVSsFwQ38mY7bfD1Ky1BPv721VhrpuSE"
  ...
  }
```

and replace it with the _buildAddValidator_ TXID

```js
const main = async (): Promise<any> => {
 const txID: string = "<YOUR-TXID-HERE>"
 ...
 }
```

Run the command:

```sh
$ ts-node examples/platformvm/getTxStatus.ts
```

This returns:

```sh
$ { status: 'Committed' }
```

The status should be `Committed`, meaning the transaction was successful.

We can see if the node is now in the pending validator set for the Fuji network by using the example:[`getPendingValidators.ts`](https://github.com/ava-labs/avalanchejs/blob/master/examples/platformvm/getPendingValidators.ts). Just change the [network settings](#network-setting) to meet Fuji requirements and then run the script:

```sh
$ ts-node examples/platformvm/getPendingValidators.ts
```

The response should include the node we just added:

```sh
$ { validators: [{
                "nodeID": "NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg",
                "startTime": "1654656829",
                "endtime": "1662602029",
                "stakeAmount": "1000000000"
                }], delegators: [] }
```

When the time reaches `1654656829` (Wed Jun 08 2022 02:53:49 GMT+0000), this node will start validating the Primary Network. When it reaches `1662602029` (Thu Sep 08 2022 01:53:49 GMT+0000), this node will stop validating the Primary Network. The staked AVAX will be returned to the user's `P-chain address`, and the rewards, if any, will be given to `rewardAddress`.

### Mainnet Workflow

The Fuji workflow above can be adapted to Mainnet with the following modifications:

- The correct private key.
- Network setting should be to a Mainnet node, either [a local node on Mainnet](../../nodes/maintain/avalanchego-config-flags.md#network-id) or [Avalanche Mainnet API server](../../apis/avalanchego/public-api-server.md#using-the-public-api-nodes) where `api.avax.network` should be used for the `ip`.
- `const networkID: number = 1;` based on [this](../../apis/avalanchejs/manage-x-chain-keys.md#encode-bech32-addresses).
- Set the correct amount to stake.
