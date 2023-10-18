---
tags: [Nodes]
description: This section provides documents on how to build and maintain an AvalancheGo node, and then validate the Avalanche network using an AvalancheGo node.
sidebar_label: Node ➡️ Validator
pagination_label: Add a Node to the Validator Set
sidebar_position: 3
---

# Add a Node to the Validator Set

## Introduction

The [Primary
Network](/learn/avalanche/avalanche-platform.md)
is inherent to the Avalanche platform and validates Avalanche’s built-in
blockchains. In this
tutorial, we’ll add a node to the Primary Network on Avalanche.

The P-Chain manages metadata on Avalanche. This includes tracking which nodes
are in which Subnets, which blockchains exist, and which Subnets are validating
which blockchains. To add a validator, we’ll issue
[transactions](http://support.avalabs.org/en/articles/4587384-what-is-a-transaction)
to the P-Chain.

:::warning

Note that once you issue the transaction to add a node as a validator, there is
no way to change the parameters. **You can’t remove your stake early or change
the stake amount, node ID, or reward address.** Please make sure you’re using
the correct values in the API calls below. If you’re not sure, feel free to join
our [Discord](https://chat.avalabs.org/) to ask questions.

:::

## Requirements

You've completed [Run an Avalanche
Node](/nodes/run/node-manually.md) and are familiar with
[Avalanche's
architecture](/learn/avalanche/avalanche-platform.md). In this
tutorial, we use [AvalancheJS](/tooling/avalanchejs-overview.md) and
[Avalanche’s Postman collection](/tooling/avalanchego-postman-collection/setup.md) 
to help us make API calls.

In order to ensure your node is well-connected, make sure that your node can
receive and send TCP traffic on the staking port (`9651` by default) and your node
has a public IP address(it's optional to set --public-ip=[YOUR NODE'S PUBLIC IP HERE]
when executing the AvalancheGo binary, as by default, the node will attempt to perform
NAT traversal to get the node's IP according to its router). Failing to do either of
these may jeopardize your staking reward.

## Add a Validator with Avalanche Wallet

First, we show you how to add your node as a validator by using [Avalanche Wallet](https://wallet.avax.network).

### Retrieve the Node ID

Get your node’s ID by calling [`info.getNodeID`](/reference/avalanchego/info-api.md#infogetnodeid):

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json' 127.0.0.1:9650/ext/info
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

Open [the wallet](https://wallet.avax.network/), and go the `Earn` tab. Choose
`Add Validator` under the `Validate` section.

Fill out the staking parameters. They are explained in more detail in [this
doc](/nodes/validate/how-to-stake.md). When you’ve filled in all the staking parameters
and double-checked them, click `Confirm`. Make sure the staking period is at
least 2 weeks, the delegation fee rate is at least 2%, and you’re staking at
least 2,000 AVAX on Mainnet (1 AVAX on Fuji Testnet).

You should see a success message, and your balance should be updated.

Calling
[`platform.getPendingValidators`](/reference/avalanchego/p-chain/api.md#platformgetpendingvalidators)
verifies that your transaction was accepted. Note that this API call should be
made before your node's validation start time, otherwise, the return will not
include your node's id as it is no longer pending.

Go back to the `Earn` tab, and click `Estimated Rewards`.

Once your validator’s start time has passed, you will see the rewards it may
earn, as well as its start time, end time, and the percentage of its validation
period that has passed.

You can also call
[`platform.getCurrentValidators`](/reference/avalanchego/p-chain/api.md#platformgetcurrentvalidators)
to check that your node's id is included in the response.

That’s it!

## Add a Validator with AvalancheJS

We can also add a node to the validator set using [AvalancheJS](/tooling/avalanchejs-overview.md).

### Install AvalancheJS

To use AvalancheJS, you can clone the repo:

```zsh
git clone https://github.com/ava-labs/avalanchejs.git
```

:::info
The repository cloning method used is HTTPS, but SSH can be used too:

`git clone git@github.com:ava-labs/avalanchejs.git`

You can find more about SSH and how to use it 
[here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/about-ssh). 
:::

or add it to an existing project:

```zsh
yarn add @avalabs/avalanchejs
```

For this tutorial we will use [`ts-node`](https://www.npmjs.com/package/ts-node)
to run the example scripts directly from an AvalancheJS directory.

### Fuji Workflow

In this section, we will use Fuji Testnet to show how to add a node to the validator set.

Open your AvalancheJS directory and select the
[**`examples/platformvm`**](https://github.com/ava-labs/avalanchejs/tree/master/examples/platformvm)
folder to view the source code for the examples scripts.

We will use the
[**`buildAddValidatorTx.ts`**](https://github.com/ava-labs/avalanchejs/blob/master/examples/platformvm/buildAddValidatorTx.ts)
script to add a validator. To learn more about the `buildAddValidatorTx` API,
please click
[here](https://github.com/ava-labs/avalanchejs-docs/blob/main/classes/api_platformvm.platformvmapi.md#buildaddvalidatortx).

#### Private Key

Locate this line in the file

```js
const privKey: string = `${PrivateKeyPrefix}${DefaultLocalGenesisPrivateKey}`
```

and replace this with a private key that you control. You can use [this code to generate a new key](https://github.com/ava-labs/avalanchejs/blob/master/examples/platformvm/createKeypair.ts).

```js
const privKey: string = "<YOUR-PRIVATE-KEY-HERE>"
```

#### Network Setting

The following settings work when using a local node started with [`--network-id=fuji`](/nodes/configure/avalanchego-config-flags.md#network-id):

```js
const ip: string = "localhost"
const port: number = 9650
const protocol: string = "http"
const networkID: number = 5
```

However, to connect directly to the [Avalanche Fuji Testnet API
server](/tooling/rpc-providers.md), the following changes are
needed:

```js
const ip: string = "api.avax-test.network"
const port: number = 443
const protocol: string = "https"
const networkID: number = 5
```

Depending on the networkID passed in when instantiating an `Avalanche` object in
the code, the encoded addresses used will have a distinctive Human Readable
Part(HRP) per network.

_Example Address: 5 - X-`fuji`19rknw8l0grnfunjrzwxlxync6zrlu33yxqzg0h_

For Fuji Testnet, 5 is the correct value to use.

To learn more about encoded addresses, click [here](/tooling/avalanchejs-guides/manage-x-chain-keys.md#encode-bech32-addresses).

#### Settings for Validation

Next we need to specify the node's validation period and delegation fee.

```ts
const nodeID: string = "NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg"
const startTime: BN = UnixNow().add(new BN(60 * 1))
const endTime: BN = startTime.add(new BN(26300000))
const delegationFee: number = 10
```

#### Node ID

This is the node ID of the validator being added. See [above
section](#retrieve-the-node-id) on how to retrieve the node id by using API
[`info.getNodeID`](/reference/avalanchego/info-api.md#infogetnodeid).

#### Staking Period

`startTime` and `endTime` are required to specify the time of starting/leaving
validation. The minimum duration that one can validate the Primary Network is 2
weeks, and the maximum duration is one year. One can start a new validation on
the Primary Network after finishing one, it’s just that the maximum _continuous_
duration is one year. `startTime` and `endTime` are the Unix times when your
validator will start and stop validating the Primary Network, respectively.
`startTime` must be in the future relative to the time the transaction is
issued.

The sample code uses `const startTime: BN = UnixNow().add(new BN(60 * 1))` and
`const endTime: BN = startTime.add(new BN(26300000))` to compute the Unix time 1
minute and 304 days in the future (at the time when this article was written) to
use as the values of `startTime` and `endTime`, respectively.

:::tip

You can create your own Unix timestamp [here](https://www.unixtimestamp.com/) or
by using the `UnixNow()` method

:::

To create your own start times, please follow the steps below:

Locate this line in the file

```ts
const startTime: BN = UnixNow().add(new BN(60 * 1))
const endTime: BN = startTime.add(new BN(26300000))
```

Change `startTime` and `endTime` to new `BN` values, for example:

```ts
const startTime: BN = new BN(1654656829) // Wed Jun 08 2022 02:53:49 GMT+0000
const endTime: BN = new BN(1662602029) // Thu Sep 08 2022 01:53:49 GMT+0000
```

#### Delegation Fee Rate

Avalanche allows for delegation of stake. This parameter is the percent fee this
validator charges when others delegate stake to them. For example, if
`delegationFeeRate` is `10` and someone delegates to this validator, then when
the delegation period is over, 10% of the reward goes to the validator and the
rest goes to the delegator, if this node meets the validation reward
requirements.

#### Stake Amount

Set the proper staking amount in calling `pchain.buildAddValidatorTx` by
replacing `stakeAmount.minValidatorStake` with a number in the unit of gwei, for
example, `BN(1e12)` which is 10,000 AVAX.

#### Addresses

By default, the example uses the variable `pAddressStrings` to define
`toAddresses`, `fromAddresses`, `changeAddresses` and `rewardAddresses`:

```js
const pAddressStrings: string[] = pchain.keyChain().getAddressStrings()
```

This retrieves the P-Chain addresses that belong to the `private key` that appears earlier in the example.

No change is needed in the addresses for the default action. For customization,
please refer to [this section](#customizing-addresses).

#### Execute the Code

Now that we have made all of the necessary changes to the example script, it's
time to add a validator to the Fuji Network.

Run the command:

```zsh
ts-node examples/platformvm/buildAddValidatorTx.ts
```

The response has the transaction ID.

```zsh
Success! TXID: 2ftDVwmss5eJk8HFsNVi6a3vWK9s3szZFhEeSY2HCS8xDb8Cra
```

We can check the transaction’s status by running the example script:
[`getTxStatus.ts`](https://github.com/ava-labs/avalanchejs/blob/master/examples/platformvm/getTxStatus.ts)
following the steps below:

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
 const txID: string = "2ftDVwmss5eJk8HFsNVi6a3vWK9s3szZFhEeSY2HCS8xDb8Cra"
 ...
 }
```

Run the command:

```sh
ts-node examples/platformvm/getTxStatus.ts
```

This returns:

```sh
{ status: 'Committed' }
```

The status should be `Committed`, meaning the transaction was successful.

We can see if the node is now in the pending validator set for the Fuji network
by using the
example:[`getPendingValidators.ts`](https://github.com/ava-labs/avalanchejs/blob/master/examples/platformvm/getPendingValidators.ts).
Just change the [network settings](#network-setting) to meet Fuji requirements
and then run the script:

```sh
ts-node examples/platformvm/getPendingValidators.ts
```

The response should include the node we just added:

```json
{
  "validators": [
    {
      "nodeID": "NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg",
      "startTime": "1654656829",
      "endtime": "1662602029",
      "stakeAmount": "1000000000"
    }
  ],
  "delegators": []
}
```

When the time reaches `1654656829` (Wed Jun 08 2022 02:53:49 GMT+0000), this
node will start validating the Primary Network. When it reaches `1662602029`
(Thu Sep 08 2022 01:53:49 GMT+0000), this node will stop validating the Primary
Network. The staked AVAX and the rewards, if any, will be returned to
`pAddressStrings`.

#### Customizing Addresses

There are 4 addresses which are needed when calling
`pchain.buildAddValidatorTx`. Only 2 of them can be changed: `toAddresses` and
`rewardAddresses`. For backward-compatibility reasons, `fromAddresses` and
`changeAddresses` are just placeholders and are ignored.

`toAddresses`

An array of addresses who receive the staked tokens at the end of the staking period.

`rewardAddresses`

When a validator stops validating the Primary Network, they will receive a
reward if they are sufficiently responsive and correct while they validated the
Primary Network. These tokens are sent to `rewardAddresses`. The original stake
will be sent back to the addresses defined in `toAddresses`.

A validator’s stake is never slashed, regardless of their behavior they will
always receive their stake back when they’re done validating.

Locate this part of the code

```ts
let privKey: string = `${PrivateKeyPrefix}${DefaultLocalGenesisPrivateKey}`
pKeychain.importKey(privKey)
```

and replace `privKey` with private keys that you control. To generate a new
keypair, we can use the
[`createKeypair.ts`](https://github.com/ava-labs/avalanchejs/blob/master/examples/platformvm/createKeypair.ts)
example script along with [Fuji Network Settings](#network-setting).

```ts
let privKey: string =
  "PrivateKey-PY2dvfxzvBAe1a5nn7x23wmZMgAYJaS3XAZXzdUa22JtzUvKM"
pKeychain.importKey(privKey)
privKey = "PrivateKey-2Y3Vg9LShMJyUDBHzQqv5WtKDJ8yAVHyM3H5CNCBBmtg3pQEQG"
pKeychain.importKey(privKey)
privKey = "PrivateKey-NaV16owRSfa5TAtxtoU1BPUoM2y1ohttRbwKJG1j7onE4Ge1s"
pKeychain.importKey(privKey)
priKey = "PrivateKey-26JMUsR5RCkf5k9ME8WxKCWEuCK5s2SrALUn7vEa2urwyDDc91"
pKeychain.importKey(privKey)

const pAddressStrings: string[] = pchain.keyChain().getAddressStrings()
```

This example would create a keychain with 4 addresses:

```ts
  "P-fuji1jx644d9y00y5q4hz8cq4wr75a2erne2y4e32xc", // pAddressStrings[0]
  "P-fuji1wchdgdp94j8tszlpsp56qvgkvdn20svpmnm8qk", // pAddressStrings[1]
  "P-fuji1f36kkpy6yzd7ayrywxvvprns7qlrcu3hwqdya8", // pAddressStrings[2]
  "P-fuji1qw7yt3fp43kuwsufff4vhezs2yl00slr09vmh5", // pAddressStrings[3]
```

Now we can pass in each address according to its slot in the `pAddressStrings` array:

```ts
const unsignedTx: UnsignedTx = await pchain.buildAddValidatorTx(
  utxoSet,
  [pAddressStrings[0], pAddressStrings[1]], // toAddresses, one or more addresses
  [pAddressStrings[0]], // fromAddresses, required for backward-compatibility
  [pAddressStrings[0]], // changeAddresses, required for backward-compatibility
  nodeID,
  startTime,
  endTime,
  stakeAmount.minValidatorStake,
  [pAddressStrings[2], pAddressStrings[3]], //rewardAddresses, one or more addresses
  delegationFee,
  locktime,
  threshold,
  memo,
  asOf
)
```

### Mainnet Workflow

The Fuji workflow above can be adapted to Mainnet with the following modifications:

- The correct private key.
- Network setting should be to a Mainnet node, either [a local node on
  Mainnet](/nodes/configure/avalanchego-config-flags.md#network-id) or
  [Avalanche Mainnet API
  server](/tooling/rpc-providers.md#using-the-public-api-nodes)
  where `api.avax.network` should be used for the `ip`.
- `const networkID: number = 1` based on [this](/tooling/avalanchejs-guides/manage-x-chain-keys.md#encode-bech32-addresses).
- Set the correct amount to stake.
