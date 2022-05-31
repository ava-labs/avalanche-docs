# Transfer AVAX Tokens Between Chains

## Introduction

This article shows how to transfer AVAX tokens programmatically between any two chains of the Primary Network.

If you are looking for how to transfter AVAX tokens using the web wallet, please check out [this article](https://support.avax.network/en/articles/6169872-how-to-make-a-cross-chain-transfer-in-the-avalanche-wallet).

## Requirements

You've completed [Run an Avalanche Node](../nodes/build/run-avalanche-node-manually.md) and are familiar with [Avalanche's architecture](../overview/getting-started/avalanche-platform.md). You are familiar with the [AvalancheJS](https://github.com/ava-labs/AvalancheJS) repo.

To use AvalancheJS, you can clone the repo:
```zsh
$ git clone https://github.com/ava-labs/avalanchejs.git
```

or add it to an existing project:

```zsh
$ yarn add --dev avalanche
```
For this tutorial we will use a cli to run the example scripts directly from an AvalancheJS directory.


In order to send AVAX, you need to have some AVAX!  You can use a pre-funded account on local network or get testnet AVAX from the [AVAX Test Faucet](https://faucet.avax.network), which is a free and easy way to get to play around with Avalanche. After getting comfortable with your code, you can run the code on Mainnet by making necessary changes. 


## Transferring AVAX using AvalancheJS

The easiest way to transfer AVAX between chains is to use [AvalancheJS](https://github.com/ava-labs/AvalancheJS) which is a programmatic way to access and move AVAX.

AvalancheJS allows you to create and sign transactions locally which is why it is the recommended way to transfer AVAX between chains. We are moving away from using AvalancheGo's keystore because it requires you to keep your keys on a full node which makes them a target for malicious hackers.

You can manage private keys you use with AvalancheJS directly in the AvalancheJS directory by doing the following:

Rename [``secrets.example``](https://github.com/ava-labs/avalanchejs/blob/master/examples/secrets.example) to ``secrets.json``

Add your Private Key as an object
```json
{
  "newPassword": "newPassword",
  "oldPassword": "oldPassword",
  "password": "password",
  "token": "token",
  "user": "user",
  "privateKey": "PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN"
}
```

Import your private key into your project
```js
import { privateKey } from "../secrets.json"
```

By default, the scripts use the AvalancheJS constant, [```DefaultLocalGenesisPrivateKey```](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/buildExportTx-cchain-avax.ts#L30) as ```privKey``` to sign transactions. 

```js
const privKey: string = `${PrivateKeyPrefix}${DefaultLocalGenesisPrivateKey}`
```

The bech32 address which derived from this private key is : ```X-custom18jma8ppw3nhx5r4ap8clazz0dps7rv5u9xde7p```

That key is pre-funded on the local network when using Avalanche Network Runner and has the following AVAX in the genesis block/vertex of each chain on the primary subnet:

- X-Chain: 300000000000000000 nAVAX

- P-Chain: 30000000000000000 nAVAX

- C-Chain: 50000000000000000000000000 nAVAX



You can simply replace this with the imported private key:
```js
const privKey: string = privateKey
```



### Step 1 - Open AvalancheJS

![Image for post](/img/examples.png)

Select the **examples** folder to view the source code for AJS examples. For more examples on how to transfer AVAX between chains see the following:

| Source Chain | Title | Path |
| :--- | :--- | :--- |
| ***X-Chain*** | [**X-Chain : Export Avax to C-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/buildExportTx-cchain-avax.ts) | _X Chain >> C Chain_ |
| ***X-Chain*** | [**C-Chain : Import Avax from X-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/evm/buildImportTx-xchain.ts) | _X Chain >> C Chain_ |
| ***X-Chain*** | [**X-Chain : Export Avax to P-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/buildExportTx-PChain.ts) | _X Chain >> P Chain_ |
| ***X-Chain*** | [**P-Chain : Import Avax from X-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/platformvm/buildImportTx-XChain.ts) | _X Chain >> P Chain_ |
| ***P-Chain*** | [**P-Chain : Export Avax to X-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/platformvm/buildExportTx-XChain.ts) | _P Chain >> X Chain_ |
| ***P-Chain*** | [**X-Chain : Import Avax from P-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/buildImportTx-PChain.ts) | _P Chain >> X Chain_ |
| ***P-Chain*** | [**P-Chain : Export Avax to C-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/platformvm/buildExportTx-CChain.ts) | _P Chain >> C Chain_ |
| ***P-Chain*** | [**C-Chain : Import Avax from P-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/evm/buildImportTx-PChain.ts) | _P Chain >> C Chain_ |
| ***C-Chain*** | [**C-Chain : Export Avax to X-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/evm/buildExportTx-xchain-avax.ts) | _C Chain >> X Chain_ |
| ***C-Chain*** | [**X-Chain : Import Avax from C-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/buildImportTx-cchain.ts) | _C Chain >> X Chain_ |
| ***C-Chain*** | [**C-Chain : Export Avax to P-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/evm/buildExportTx-pchain.ts) | _C Chain >> P Chain_ |
| ***C-Chain*** | [**P-Chain : Import Avax from C-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/platformvm/buildImportTx-CChain.ts) | _C Chain >> P Chain_ |


### Step 2 - Modify Your Export

:::info

The script in this tutorial uses **X Chain <-> C Chain** transfers. Depending on which chains you want to interact with, the scripts you use could be different. Please check the table above for more information.

:::

Select the **examples/avm** folder to view the AvalancheJS X-Chain examples. To send AVAX from the X-Chain to the C-Chain, select [```avm/buildExportTx-cchain-avax.ts```](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/buildExportTx-cchain-avax.ts)

![Image for post](/img/ajs-export-cchain-res.png)

#### Modify your Avalanche network configuration

Depending on how you started your node, you might use a custom settings for your Avalanche Network

_Note: See [Advanced Configurations](https://docs.avax.network/nodes/build/set-up-node-with-installer#advanced-node-configuration) to learn more about custom Node configurations_

**IP Address**

If you're using a local node:
```js
const ip: string = "localhost" 
```

Or a custom node IP:
```js
const ip: string = "<YOUR-NODE-IP-HERE>" 
```

If you want to work directly with the [Avalanche Public API](../apis/avalanchego/public-api-server.md) server:

Mainnet:
```js
const ip: string = "api.avax.network"  
```

Fuji Testnet:
```js
const ip: string = "api.avax-test.network" 
```
**Port Number**

Local node:
```js
const port: number = 9650
```

Custom port:
```js
const port: number = "<YOUR-NODE-PORT-HERE>"
```
**Protocol**

Local node:
```js
const protocol: string = "http"
```

[Avalanche Public API](../apis/avalanchego/public-api-server.md):
```js
const protocol: string = "https"
```

**Network ID**

Depending on the networkID which is passed in when instantiating Avalanche, the encoded addresses used will have a distinctive Human Readable Part(HRP) per each network.

_Example Address: 5 - X-`fuji`19rknw8l0grnfunjrzwxlxync6zrlu33yxqzg0h_


Mainnet:
```js
const networkID: number = 1
  ```
Fuji Testnet:
```js
const networkID: number = 5
  ```

Custom Network:
```js
const networkID: number = 1337
  ```

We use Bech32 to encode our addresses. Each Bech32 address is composed of the following components:
- A Human-Readable Part (HRP).
- The number “1” is a separator (the last digit 1 seen is considered the separator).
- Base-32 encoded string for the data part of the address (the 20-byte address itself).
- A 6-character base-32 encoded error correction code using the BCH algorithm.

AvalancheJS has address encoding for the following networks

```text
0 - X-custom19rknw8l0grnfunjrzwxlxync6zrlu33yeg5dya
1 - X-avax19rknw8l0grnfunjrzwxlxync6zrlu33y2jxhrg
2 - X-cascade19rknw8l0grnfunjrzwxlxync6zrlu33ypmtvnh
3 - X-denali19rknw8l0grnfunjrzwxlxync6zrlu33yhc357h
4 - X-everest19rknw8l0grnfunjrzwxlxync6zrlu33yn44wty
5 - X-fuji19rknw8l0grnfunjrzwxlxync6zrlu33yxqzg0h
1337 - X-custom19rknw8l0grnfunjrzwxlxync6zrlu33yeg5dya
12345 - X-local19rknw8l0grnfunjrzwxlxync6zrlu33ynpm3qq
```

Example Configuration:
```js
const ip: string = "localhost"
const port: number = 9650
const protocol: string = "http"
const networkID: number = 5
```

#### Edit The Amount Of AVAX You Want To Send:

By default the script sends the wallet's entire AVAX balance:

For this tutorial we import our [Private key](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/buildExportTx-cchain-avax.ts#L30) to our [```xKeychain```](https://github.com/ava-labs/avalanchejs/blob/46ce89f395133702320a77cba4bb9cb818b48fe8/examples/avm/buildExportTx-cchain-avax.ts#L31) to obtain signers. This means ```X-custom18jma8ppw3nhx5r4ap8clazz0dps7rv5u9xde7p``` is the ```balance``` holder and will pay the fee to export AVAX. 

```js
const balance: BN = new BN(getBalanceResponse.balance)
const amount: BN = balance.sub(fee)
```

Change the amount by creating a new _BN_ variable: ```value``` and assigning it a string value ```"10000000000000000"``` (.01 AVAX) as an example.

```js
  const value: BN = new BN("10000000000000000")
  const amount: BN = value.sub(fee)
  ```

We must pass the value in WEI format. For reference, 10 ** 18 WEI = 1 AVAX

You can use the [snowtrace unit converter](https://snowtrace.io/unitconverter) to view more unit conversions

### Step 3 - Run the Export and Import scripts

Between X/P/C chains there is shared memory. First, tokens are exported from the source chain to the shared memory, then imported by the destination chain.

To complete a transfer from the X-Chain to the C-Chain , we must run both the Export and Import scripts. 

This example uses **[buildExportTx-cchain-avax.ts](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/buildExportTx-cchain-ant.ts)** to export AVAX from the X-Chain 
and
**[buildImportTx-xchain.ts](https://github.com/ava-labs/avalanchejs/blob/master/examples/evm/buildExportTx-cchain-ant.ts)** to import AVAX to the C-Chain

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
