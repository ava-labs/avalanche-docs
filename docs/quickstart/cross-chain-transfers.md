# Transfer AVAX Tokens Between Chains

## Introduction

This article shows how to transfer AVAX tokens programmatically between any two chains of the Primary Network.

If you are looking for how to transfter AVAX tokens using the web wallet, please check out [this article](https://support.avax.network/en/articles/6169872-how-to-make-a-cross-chain-transfer-in-the-avalanche-wallet).

## Prerequisites

You've completed [Run an Avalanche Node](../nodes/build/run-avalanche-node-manually.md), are familiar with [Avalanche's architecture](../overview/getting-started/avalanche-platform.md), and [AvalancheJS](https://github.com/ava-labs/AvalancheJS).

Also [ts-node](https://www.npmjs.com/package/ts-node#installation) is needed to run the examples.

## Getting Started

To use AvalancheJS, you can clone the repo:

```zsh
$ git clone https://github.com/ava-labs/avalanchejs.git
```

or add it to an existing project:

```zsh
$ yarn add --dev avalanche
```

For this tutorial we will use a CLI to run the example scripts directly from an AvalancheJS directory.

In order to send AVAX, you need to have some AVAX! You can use a pre-funded account on local network or get testnet AVAX from the [Avalanche Faucet](https://faucet.avax.network), which is an easy way to get to play around with Avalanche. After getting comfortable with your code, you can run the code on Mainnet by making necessary changes.

## Transferring AVAX using AvalancheJS

The easiest way to transfer AVAX between chains is to use [AvalancheJS](https://github.com/ava-labs/AvalancheJS) which is a programmatic way to access and move AVAX.

AvalancheJS allows you to create and sign transactions locally which is why it is the recommended way to transfer AVAX between chains. We are moving away from using AvalancheGo's keystore because it requires you to keep your keys on a full node which makes them a target for malicious hackers.

### Example Code

Following codes can be found under the [examples](https://github.com/ava-labs/avalanchejs/tree/master/examples) directory of the AvalancheJS project.

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

## Typical Fuji Workflow

This tutorial uses [**X Chain <-> C Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/buildExportTx-cchain-avax.ts) transfers as an example. Transferring between other chains are very similar. 

### Transfer from the C-Chain to the X-Chain


#### Locate the Code


Select the [**`examples/avm`**](https://github.com/ava-labs/avalanchejs/tree/master/examples/avm) folder to view the AvalancheJS X-Chain examples. To send AVAX from the X-Chain to the C-Chain, select [`avm/buildExportTx-cchain-avax.ts`](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/buildExportTx-cchain-avax.ts)

![Image for post](/img/ajs-export-cchain-res.png)

#### Make Necessary Changes

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

Depending on how you start your node, you might need to change the following variables in the code:


```js
const ip: string = "localhost";
const port: number = 9650;
const protocol: string = "http";
const networkID: number = 5;
```

**IP Address**

To use a local node started with [`--network-id=fuji`](../nodes/maintain/avalanchego-config-flags.md#network-id):

```js
const ip: string = "localhost";
```

Or to connect directly to the [Avalanche public server for Fuji Testnet](../apis/avalanchego/public-api-server.md):

```js
const ip: string = "api.avax-test.network";
```

**Port Number**

To use a local node started with [`--network-id=fuji`](../nodes/maintain/avalanchego-config-flags.md#network-id):

```js
const port: number = 9650;
```

Or to connect directly to the [Avalanche public server for Fuji Testnet](../apis/avalanchego/public-api-server.md):

```js
const port: number = 443;
```

**Protocol**

To use a local node started with [`--network-id=fuji`](../nodes/maintain/avalanchego-config-flags.md#network-id):

```js
const protocol: string = "http";
```

Or to connect directly to the [Avalanche public server for Fuji Testnet](../apis/avalanchego/public-api-server.md):

```js
const protocol: string = "https";
```

**Network ID**

Depending on the networkID passed in when instantiating Avalanche, the encoded addresses used will have a distinctive Human Readable Part(HRP) per each network.

_Example Address: 5 - X-`fuji`19rknw8l0grnfunjrzwxlxync6zrlu33yxqzg0h_

For Fuji Testnet, 5 is the correct value to use.

```js
const networkID: number = 5;
```

To learn more  about  encoded addresses, click [here](../apis/avalanchejs/manage-x-chain-keys.md#encode-bech32-addresses).

**Set the Correct Amount to Send:**

By default the scripts send the wallet's entire AVAX balance:

```js
const balance: BN = new BN(getBalanceResponse.balance);
const amount: BN = balance.sub(fee);
```

To send a different amount, please replace the code above with the following. Below sets a new value of 0.01 AVAX (10000000000000000 GWEI). Value is set in WEI format where 10 \*\* 18 WEI = 1 AVAX

```js
const value: BN = new BN("10000000000000000");
const amount: BN = value.sub(fee);
```

:::tip
Snowtrace provides a [unit converter](https://snowtrace.io/unitconverter) between different units
:::


#### Execute The Export And Import Scripts

To transfer the specified amount token from X-Chain to C-Chain, the token needs to be first exported from the X-Chain, then imported to C-Chain. 


Run the export script:
```sh
avalanchejs $ ts-node examples/avm/buildExportTx-cchain-avax.ts
```

This returns:
```sh
Success! TXID: Rgg2412kaczRYC3taasvG6bYoqG7tBQG6WfacNdumKDKsVWpF
```


Run the import script:
```sh
avalanchejs $ ts-node examples/evm/buildImportTx-xchain.ts
```

This returns:
```sh
Success! TXID: r2yYqcnCJcdeV5gddZ8NUoG5ZD3Ef7DxbkiE9xn4RxFcDdMd1
```

![Image for post](/img/ajs-getTx.png)

That's it! You've transferred AVAX from the X-Chain to C-Chain! 


You can pass this txID `r2yYqcnCJcdeV5gddZ8NUoG5ZD3Ef7DxbkiE9xn4RxFcDdMd1` into [examples/avm/getTx.ts](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/getTx.ts), plus other similar network settings, then you can run 

```zsh
avalanchejs $ ts-node examples/avm/getTx.ts
```

which returns:

```js
{
  unsignedTx: {
    networkID: 1,
    blockchainID: '2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM',
    outputs: [],
    inputs: [ [Object] ],
    memo: '0x',
    destinationChain: '11111111111111111111111111111111LpoYY',
    exportedOutputs: [ [Object] ]
  },
  credentials: [
    {
      fxID: 'spdxUxVJQbX85MGxMHbKw1sHxMnSqJ3QBzDyDYEP3h6TLuxqQ',
      credential: [Object]
    }
  ]
}
```

### Transfer from the C-Chain to the X-Chain

To return the AVAX back to the X-Chain, you need to do the transfer in the opposite direction:

* Select the **`examples/evm`** folder to view the AvalancheJS C-Chain examples. To send AVAX from the X-Chain to the C-Chain, select [`evm/buildExportTx-xchain-avax.ts`](https://github.com/ava-labs/avalanchejs/blob/master/examples/evm/buildExportTx-xchain-avax.ts)

* You can change the amount of AVAX to send by editing the _BN_ variable: `avaxAmount`. The sample code assigns this as `1e7` or `10000000` (.01 AVAX)

The fee here will only be for exporting the asset. The import fees will be deducted from the UTXOs present on the Exported Atomic Memory, a memory location where UTXOs lie after getting exported but before being imported. If there is only a single UTXO, then it will be deducted from it.

```ts
let avaxAmount: BN = new BN(1e7)
let fee: BN = baseFee.div(new BN(1e9))
fee = fee.add(new BN(1e6))
```

:::tip
When exporting AVAX, be sure to send enough to support import fees (constant .001 AVAX). Sending less than `1e6` or `1000000` (.001 AVAX) may cause the import txn to fail._
:::

Swap source and destination chains by running the [C-Chain Export](https://github.com/ava-labs/avalanchejs/blob/master/examples/evm/buildExportTx-xchain-avax.ts) and [X-Chain Import](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/buildImportTx-cchain.ts) scripts.

```zsh
avalanchejs $ ts-node examples/evm/buildExportTx-xchain-avax.ts
Success! TXID: UAez3DTv26qmhKKFDvmQTayaXTPAVahHenDKe6xnUMhJbKuxc
avalanchejs $ ts-node examples/avm/buildImportTx-cchain.ts
Success! TXID: Sm6Ec2GyguWyG3Li1pARmTpaZ6qLEPuVAHV8QBGL9JWwWAEgM
```


_As with the export and import scripts, be sure to apply the [necessary changes](./cross-chain-transfers.md#modify-your-avalanche-network-configuration) to ['buildExportTx-xchain-avax.ts'](https://github.com/ava-labs/avalanchejs/blob/master/examples/evm/buildExportTx-xchain-avax.ts) to execute the script properly._



## Typical Local Workflow

### Start the Local Network
Follow [Create a Local Test Network](../quickstart/create-a-local-test-network.md#avalanche-network-runner) to start a 5-node local network. Make sure that you get one of the port number by following [this](../quickstart/create-a-local-test-network.md#retrieve-all-nodes). In this tutorial, we will assume one of the port is 30301.

### Locate the Example Code and Make Necessary Changes

Most of the code are already set to run it on a local network. Do check the following values to make sure they are correct.

```js
const ip: string = "localhost";
const port: number = "30301";  // Change this one to the correct value
const protocol: string = "http";
const networkID: number = 1337;

```

Then run the export and import scripts to transfer tokens across chains.



