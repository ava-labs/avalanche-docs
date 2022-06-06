# Transfer AVAX Tokens Between Chains

## Introduction

This article shows how to transfer AVAX tokens programmatically between any two chains (X/P/C chains) of the Primary Network.

If you are looking for how to transfter AVAX tokens using the web wallet, please check out [this article](https://support.avax.network/en/articles/6169872-how-to-make-a-cross-chain-transfer-in-the-avalanche-wallet).

## Prerequisites

- You are familiar with [Avalanche's architecture](../overview/getting-started/avalanche-platform.md).
- You have completed [Run an Avalanche Node](../nodes/build/run-avalanche-node-manually.md).
- You are faimilar with [AvalancheJS](https://github.com/ava-labs/AvalancheJS).
- You have installed [ts-node](https://www.npmjs.com/package/ts-node#installation) so that you can follow examples in this tutorial.

## Getting Started

To use AvalancheJS, you can clone the repo:

```zsh
$ git clone https://github.com/ava-labs/avalanchejs.git
```

or add it to an existing project:

```zsh
$ yarn add --dev avalanche
```

For this tutorial we will use `ts-node` to run the example scripts directly from an AvalancheJS directory.

In order to send AVAX, you need to have some AVAX. You can use a pre-funded account on local network or get testnet AVAX from the [Avalanche Faucet](https://faucet.avax.network), which is an easy way to get to play around with Avalanche. After getting comfortable with your code, you can run the code on Mainnet after making necessary changes.

## Transferring AVAX using AvalancheJS

The easiest way to transfer AVAX between chains is to use [AvalancheJS](https://github.com/ava-labs/AvalancheJS) which is a programmatic way to access and move AVAX.

AvalancheJS allows you to create and sign transactions locally which is why it is the recommended way to transfer AVAX between chains. We are moving away from using AvalancheGo's keystore because it requires you to keep your keys on a full node which makes them a target for malicious hackers.

### Example Code

Following files can be found under the [examples](https://github.com/ava-labs/avalanchejs/tree/master/examples) directory of the AvalancheJS project.

| Source Chain  | Title                                                                                                                                     | Path                 |
| :------------ | :---------------------------------------------------------------------------------------------------------------------------------------- | :------------------- |
| **_X-Chain_** | [**X-Chain : Export Avax to C-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/buildExportTx-cchain-avax.ts)     | _X Chain >> C Chain_ |
| **_X-Chain_** | [**C-Chain : Import Avax from X-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/evm/buildImportTx-xchain.ts)        | _X Chain >> C Chain_ |
| **_X-Chain_** | [**X-Chain : Export Avax to P-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/buildExportTx-PChain.ts)          | _X Chain >> P Chain_ |
| **_X-Chain_** | [**P-Chain : Import Avax from X-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/platformvm/buildImportTx-XChain.ts) | _X Chain >> P Chain_ |
| **_P-Chain_** | [**P-Chain : Export Avax to X-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/platformvm/buildExportTx-XChain.ts)   | _P Chain >> X Chain_ |
| **_P-Chain_** | [**X-Chain : Import Avax from P-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/buildImportTx-PChain.ts)        | _P Chain >> X Chain_ |
| **_P-Chain_** | [**P-Chain : Export Avax to C-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/platformvm/buildExportTx-CChain.ts)   | _P Chain >> C Chain_ |
| **_P-Chain_** | [**C-Chain : Import Avax from P-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/evm/buildImportTx-PChain.ts)        | _P Chain >> C Chain_ |
| **_C-Chain_** | [**C-Chain : Export Avax to X-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/evm/buildExportTx-xchain-avax.ts)     | _C Chain >> X Chain_ |
| **_C-Chain_** | [**X-Chain : Import Avax from C-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/buildImportTx-cchain.ts)        | _C Chain >> X Chain_ |
| **_C-Chain_** | [**C-Chain : Export Avax to P-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/evm/buildExportTx-pchain.ts)          | _C Chain >> P Chain_ |
| **_C-Chain_** | [**P-Chain : Import Avax from C-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/platformvm/buildImportTx-CChain.ts) | _C Chain >> P Chain_ |

:::tip

The naming convention in the file and directory names are:

AVM is for X-Chaim, EVM for C-Chain, and PlatformVM for P-Chain.

:::

## Fuji Workflow

This tutorial uses [**X-Chain <-> C-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/buildExportTx-cchain-avax.ts) transfers as an example. Transferring between other chains are very similar.

### Transfer from the X-Chain to the C-Chain

To transfer a specified amount token from X-Chain to C-Chain, the token needs to be first exported from the X-Chain, then imported to C-Chain.

#### Export the Avax Token From X-Chain to C-Chain

Select the [**`examples/avm`**](https://github.com/ava-labs/avalanchejs/tree/master/examples/avm) folder to view the AvalancheJS X-Chain examples. To export AVAX from the X-Chain to the C-Chain, select [`avm/buildExportTx-cchain-avax.ts`](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/buildExportTx-cchain-avax.ts).

##### Private Key

Locate this line in the file

```js
const privKey: string = `${PrivateKeyPrefix}${DefaultLocalGenesisPrivateKey}`;
```

and replace this with a private key that you control.

```js
const privKey: string = "<YOUR-PRIVATE-KEY-HERE>";
```

##### Network Setting

The following settings work when using a local node started with [`--network-id=fuji`](../nodes/maintain/avalanchego-config-flags.md#network-id):

```js
const ip: string = "localhost";
const port: number = 9650;
const protocol: string = "http";
const networkID: number = 5;
```

However, to connect directly to the [Avalanche Fuji Testnet API server](../apis/avalanchego/public-api-server.md), the following changes are needed:

```js
const ip: string = "api.avax-test.network";
const port: number = 443;
const protocol: string = "https";
const networkID: number = 5;
```

Depending on the networkID passed in when instantiating Avalanche, the encoded addresses used will have a distinctive Human Readable Part(HRP) per each network.

_Example Address: 5 - X-`fuji`19rknw8l0grnfunjrzwxlxync6zrlu33yxqzg0h_

For Fuji Testnet, 5 is the correct value to use.

```js
const networkID: number = 5;
```

To learn more about encoded addresses, click [here](../apis/avalanchejs/manage-x-chain-keys.md#encode-bech32-addresses).

**Set the Correct Amount To Send:**

By default the scripts send the wallet's entire AVAX balance:

```js
const balance: BN = new BN(getBalanceResponse.balance);
const amount: BN = balance.sub(fee);
```

To send a different amount, please replace the code above with the following. Below sets a new value of 0.01 AVAX (`10000000` GWEI). Value is set in GWEI format where `1,000,000,000` GWEI = 1 AVAX

```js
const value: BN = new BN("10000000");
const amount: BN = value.sub(fee);
```

:::tip
Snowtrace provides a [unit converter](https://snowtrace.io/unitconverter) between different units
:::

Run the export script:

```sh
$ ts-node examples/avm/buildExportTx-cchain-avax.ts
```

This returns:

```sh
Success! TXID: 2uQvMcPZjmPXAyvz9cdKBphDDSmnxxx3vsUrxqpj3U92hsfQcc
```

#### Verify the Transaction

You can now pass this txID `2uQvMcPZjmPXAyvz9cdKBphDDSmnxxx3vsUrxqpj3U92hsfQcc` into [examples/avm/getTx.ts](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/getTx.ts), plus other similar network settings, then you can run

```zsh
$ ts-node examples/avm/getTx.ts
```

which returns:

```js
{
  unsignedTx: {
    networkID: 5,
    blockchainID: '2JVSBoinj9C2J33VntvzYtVJNZdN2NKiwwKjcumHUWEb5DbBrm',
    outputs: [ [Object] ],
    inputs: [ [Object], [Object] ],
    memo: '0x41564d207574696c697479206d6574686f64206275696c644578706f7274547820746f206578706f7274204156415820746f2074686520432d436861696e2066726f6d2074686520582d436861696e',
    destinationChain: 'yH8D7ThNJkxmtkuv2jgBa4P1Rn3Qpr4pPr7QYNfcdoS6k6HWp',
    exportedOutputs: [ [Object] ]
  },
  credentials: [
    {
      fxID: 'spdxUxVJQbX85MGxMHbKw1sHxMnSqJ3QBzDyDYEP3h6TLuxqQ',
      credential: [Object]
    },
    {
      fxID: 'spdxUxVJQbX85MGxMHbKw1sHxMnSqJ3QBzDyDYEP3h6TLuxqQ',
      credential: [Object]
    }
  ]
}
```

#### Import the Avax Token From X-Chain to C-Chain

Select the [**`examples/evm`**](https://github.com/ava-labs/avalanchejs/tree/master/examples/evm) folder to view the AvalancheJS C-Chain examples. To import AVAX to the C-Chain from the X-Chain, select [`evm/buildImportTx-xchain.ts`](https://github.com/ava-labs/avalanchejs/blob/master/examples/evm/buildImportTx-xchain.ts)

Copy the [network setting from above](#network-setting) into `evm/buildImportTx-xchain.ts`.

Navigate to this part of the code and ensure that the `cHexAddress`(_Your C-Chain wallet address_) and `private key` are correct:

```ts
const cHexAddress: string = "<YOUR-CCHAIN-WALLET-ADDRESS-HERE>";
const privKey: string = "<YOUR-PRIVATE-KEY-HERE>";
```

Run the import script:

```sh
$ ts-node examples/evm/buildImportTx-xchain.ts
```

This returns:

```sh
Success! TXID: 2uQvMcPZjmPXAyvz9cdKBphDDSmnxxx3vsUrxqpj3U92hsfQcc
```

That's it! You've transferred AVAX from the X-Chain to C-Chain!

You can verify this TX by copy / pasting the import TXID into [Avascan](https://testnet.avascan.info/blockchain/c/tx/2uQvMcPZjmPXAyvz9cdKBphDDSmnxxx3vsUrxqpj3U92hsfQcc).

### Transfer from the C-Chain to the X-Chain

To return the AVAX back to the X-Chain, you need to do the transfer in the opposite direction.

#### Export the Avax Token From C-Chain to X-Chain

Select the [**`examples/evm`**](https://github.com/ava-labs/avalanchejs/tree/master/examples/evm) folder to view the AvalancheJS C-Chain examples. To export AVAX from the X-Chain to the C-Chain, select [`evm/buildExportTx-xchain-avax.ts`](https://github.com/ava-labs/avalanchejs/blob/master/examples/evm/buildExportTx-xchain-avax.ts).

Make necessary changes as above for private key and network settings.

You can change the amount of AVAX to send by editing the _BN_ variable: `avaxAmount`. The sample code assigns this as `1e7` or `10000000` (0.01 AVAX)

The fee here will only be for exporting the asset. The import fees will be deducted from the UTXOs present on the Exported Atomic Memory, a memory location where UTXOs stay after getting exported but before being imported.

```ts
let avaxAmount: BN = new BN(1e7);
let fee: BN = baseFee.div(new BN(1e9));
fee = fee.add(new BN(1e6));
```

:::tip
You do not need to adjust `fee`, you will however adjust `avaxAmount`, the variable that the sample code uses to define the amount of AVAX that the user will send. Be sure to send enough to support import fees (constant .001  AVAX or 1e6 gwei). Sending less than 0.001 AVAX may cause the import txn to fail.
:::

Run the export script:

```zsh
avalanchejs $ ts-node examples/evm/buildExportTx-xchain-avax.ts
Success! TXID: UAez3DTv26qmhKKFDvmQTayaXTPAVahHenDKe6xnUMhJbKuxc
```

#### Import the Avax Token From C-Chain to X-Chain
Before we run the [example import script](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/buildImportTx-cchain.ts), we need to make some changes to the code:

1. Change the [Network Setting](#network-setting) to meet Fuji network requirements.
2. Import your Private Key by following the steps listed [here](#private-key).
3. Run the Script!

```zsh
avalanchejs $ ts-node examples/avm/buildImportTx-cchain.ts
Success! TXID: Sm6Ec2GyguWyG3Li1pARmTpaZ6qLEPuVAHV8QBGL9JWwWAEgM
```

## Mainnet Workflow

The Fuji workflow above can be adapted to Mainnet with the following modifications:

- The correct private key.
- Network setting should be to a Mainnet node, either [a local node on Mainnet](../nodes/maintain/avalanchego-config-flags.md#network-id) or [Avalanche Mainnet API server](../apis/avalanchego/public-api-server.md#using-the-public-api-nodes) where `api.avax.network` should be used for the `ip`.
- `const networkID: number = 1;` based on [this](../apis/avalanchejs/manage-x-chain-keys.md#encode-bech32-addresses).
- Set the correct amount to send.
- The correct receiving address.

## Local Workflow

### Start the Local Network

Follow [Create a Local Test Network](../quickstart/create-a-local-test-network.md#avalanche-network-runner) to start a 5-node local network. Make sure that you get one of the port number by following [this](../quickstart/create-a-local-test-network.md#retrieve-all-nodes). In this tutorial, we will assume one of the ports is 30301.

### Locate the Example Code and Make Necessary Changes

Most of the code are already set to run it on a local network. Do check the following values to make sure they are correct.

```js
const ip: string = "localhost";
const port: number = 30301; // Change this to the correct value
const protocol: string = "http";
const networkID: number = 1337;
```

Then run the export and import scripts to transfer tokens across chains.
