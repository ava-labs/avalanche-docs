# Cross Chain Transfers

## Introduction

This article shows how to transfer AVAX tokens programmatically between any two chains of the Primary Network.

## Requirements

You've completed [Run an Avalanche Node](../nodes/build/run-avalanche-node-manually.md) and are familiar with [Avalanche's architecture](../overview/getting-started/avalanche-platform.md). You are familiar with [AvalancheJS](https://github.com/ava-labs/AvalancheJS) repo.

To use AvalancheJS, can clone the repo or add it to an existing project by running the following command:

```zsh
$ yarn add --dev avalanche
```
For this tutorial we will use a cli to run the example scripts directly from an AvalancheJS directory.


In order to send AVAX, you need to have some AVAX! You can get real AVAX by buying it on an exchange, or you can get testnet AVAX from the [AVAX Test Faucet](https://faucet.avax.network), which is a free and easy way to get to play around with Avalanche.


## Transferring AVAX using AvalancheJS

The easiest way to transfer AVAX between chains is to use [AvalancheJS](https://github.com/ava-labs/AvalancheJS) which is a programmatic way to access and move AVAX.

### Step 1 - Open AvalancheJS

![Image for post](/img/examples.png)

Select the **examples** folder to view the source code for AJS examples. To send AVAX between the Chains see the following:

| Source Chain | Title | Path |
| :--- | :--- | :--- |
| ***X-Chain*** | [**AVM : Export Avax to C-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/buildExportTx-cchain-avax.ts) | _X Chain >> C Chain_ |
| ***X-Chain*** | [**EVM : Import Avax from X-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/evm/buildImportTx-xchain.ts) | _X Chain >> C Chain_ |
| ***X-Chain*** | [**AVM : Export Avax to P-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/buildExportTx-PChain.ts) | _X Chain >> P Chain_ |
| ***X-Chain*** | [**PlatformVM : Import Avax from X-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/platformvm/buildImportTx-XChain.ts) | _X Chain >> P Chain_ |
| ***P-Chain*** | [**PlatformVM : Export Avax to X-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/platformvm/buildExportTx-XChain.ts) | _P Chain >> X Chain_ |
| ***P-Chain*** | [**AVM : Import Avax from P-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/buildImportTx-PChain.ts) | _P Chain >> X Chain_ |
| ***P-Chain*** | [**PlatformVm : Export Avax to C-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/platformvm/buildExportTx-CChain.ts) | _P Chain >> C Chain_ |
| ***P-Chain*** | [**EVM : Import Avax from P-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/evm/buildImportTx-PChain.ts) | _P Chain >> C Chain_ |
| ***C-Chain*** | [**EVM : Export Avax to X-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/evm/buildExportTx-xchain-avax.ts) | _C Chain >> X Chain_ |
| ***C-Chain*** | [**AVM : Import Avax from C-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/buildImportTx-cchain.ts) | _C Chain >> X Chain_ |
| ***C-Chain*** | [**EVM : Export Avax to P-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/evm/buildExportTx-pchain.ts) | _C Chain >> P Chain_ |
| ***C-Chain*** | [**PlatformVM : Import Avax from C-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/platformvm/buildImportTx-CChain.ts) | _C Chain >> P Chain_ |


### Step 2 - Modify Your Export

:::info

The script in this tutorial uses **X Chain <-> C Chain** transfers. Depending on which chains you want to interact with, the scripts you use could be different. Please check the table above for more information.

:::

Select the **examples/avm** folder to view the AvalancheJS X-Chain examples. To send AVAX from the X-Chain to the C-Chain, select [```avm/buildExportTx-cchain-avax.ts```](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/buildExportTx-cchain-avax.ts)

![Image for post](/img/ajs-export-cchain-res.png)

#### Modify your Avalanche network configuration

If you are making calls to your Node from another machine, or started your node using [Advanced Configurations](https://docs.avax.network/nodes/build/set-up-node-with-installer#advanced-node-configuration) you might use a custom IP
```js
const ip: string = "localhost" | "custom" 
```

```js
const port: number = 9650
```
```js
const protocol: string = "http" | "https"
```

Depending on the networkID which is passed in when instantiating Avalanche the encoded addresses will have a distinctive HRP per each network.
```js
const networkID: number =
  0: "custom"
  1: "avax"
  2: "cascade"
  3: "denali"
  4: "everest"
  5: "fuji"
  1337: "custom"
  12345: "local"
  ```

Example:
```js
const ip: string = "localhost"
const port: number = 9650
const protocol: string = "http"
const networkID: number = 5
```

#### Edit The Amount Of AVAX You Want To Send:
By default the script sends the wallet's entire AVAX balance:

```js
const balance: BN = new BN(getBalanceResponse.balance)
const amount: BN = balance.sub(fee)
```



Change the amount by creating a new _BN_ variable: ```value``` and assigning it a string value ```"10000000000000000"``` (.01 AVAX) 

```js
  const value: BN = new BN("10000000000000000")
  const amount: BN = value.sub(fee)
  ```

We must pass the value in WEI format. For reference, 10 ** 18 WEI = 1 AVAX

You can use the [snowtrace unit converter](https://snowtrace.io/unitconverter) to view more unit conversions

### Step 3 - Run the Export and Import scripts

Between X/P/C chains there is shared memory. First, tokens are exported from the source chain to the shared memory, then imported by the destination chain.

To complete a transfer from the X-Chain to the C-Chain , we must run both the Export and Import scripts. 


```zsh
avalanchejs $ ts-node examples/avm/buildExportTx-cchain-avax.ts
Success! TXID: Rgg2412kaczRYC3taasvG6bYoqG7tBQG6WfacNdumKDKsVWpF
avalanchejs $ ts-node examples/evm/buildImportTx-xchain.ts               
Success! TXID: r2yYqcnCJcdeV5gddZ8NUoG5ZD3Ef7DxbkiE9xn4RxFcDdMd1
```

![Image for post](/img/ajs-getTx.png)

That's it! You've transferred AVAX from the X-Chain to C-Chain! Now you can use them to deploy smart contracts on C-Chain.

You can retrieve the transaction data by running the following:
```zsh
avalanchejs $ ts-node examples/avm/getTx.ts
```

Returns:
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

To return the AVAX back to the X-Chain, you need to do the transfer in the opposite direction.

Swap source and destination chains by running the [C-Chain Export](https://github.com/ava-labs/avalanchejs/blob/master/examples/evm/buildExportTx-xchain-avax.ts) and [X-Chain Import](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/buildImportTx-cchain.ts) scripts.

```zsh
avalanchejs $ ts-node examples/evm/buildExportTx-xchain-avax.ts
Success! TXID: UAez3DTv26qmhKKFDvmQTayaXTPAVahHenDKe6xnUMhJbKuxc
avalanchejs $ ts-node examples/avm/buildImportTx-cchain.ts
Success! TXID: Sm6Ec2GyguWyG3Li1pARmTpaZ6qLEPuVAHV8QBGL9JWwWAEgM     
```

## Wrapping Up

That’s it! Now, you can swap AVAX back and forth between each chain by using AvalancheJS.

