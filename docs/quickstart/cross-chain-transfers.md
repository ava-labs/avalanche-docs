# Transfer AVAX Tokens Between Chains

## Introduction

This article shows how to transfer AVAX tokens programmatically between any two chains of the Primary Network.

If you are looking for how to transfter AVAX tokens using the web wallet, please check out [this article](https://support.avax.network/en/articles/6169872-how-to-make-a-cross-chain-transfer-in-the-avalanche-wallet).

## Requirements

You've completed [Run an Avalanche Node](../nodes/build/run-avalanche-node-manually.md) and are familiar with [Avalanche's architecture](../overview/getting-started/avalanche-platform.md). You are familiar with the [AvalancheJS](https://github.com/ava-labs/AvalancheJS) repo.

### AvalancheGo and Avalanche Network Runner

If you are running AvalancheJS on a [Local Test Network](create-a-local-test-network.md) you will use:

- [AvalancheGo](https://github.com/ava-labs/avalanchego) : an Avalanche node implementation written in Go.
- [Avalanche Network Runner](network-runner.md): a tool to quickly deploy local test networks.

Together, you can deploy local test networks and run tests on them.

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

In order to send AVAX, you need to have some AVAX! You can use a pre-funded account on local network or get testnet AVAX from the [AVAX Test Faucet](https://faucet.avax.network), which is a free and easy way to get to play around with Avalanche. After getting comfortable with your code, you can run the code on Mainnet by making necessary changes.

## Transferring AVAX using AvalancheJS

The easiest way to transfer AVAX between chains is to use [AvalancheJS](https://github.com/ava-labs/AvalancheJS) which is a programmatic way to access and move AVAX.

AvalancheJS allows you to create and sign transactions locally which is why it is the recommended way to transfer AVAX between chains. We are moving away from using AvalancheGo's keystore because it requires you to keep your keys on a full node which makes them a target for malicious hackers.

You will find both a [Fuji Workflow](cross-chain-transfers.md#typical-fuji-workflow) and [Avalanche Network Runner Workflow](cross-chain-transfers.md#typical-avalanche-network-runner-workflow) in this tutorial.

## Typical Avalanche Network Runner Workflow

First confirm you have the latest AvalancheGo built.

```text
$ cd /path/to/avalanchego
$ git fetch -p
$ git checkout master
$ ./scripts/build.sh
```

(Note that you can also [download pre-compiled AvalancheGo binaries](https://github.com/ava-labs/avalanchego/releases) rather than building from source.)

Confirm you have Avalanche Network Runner installed by following the steps listed [here](create-a-local-test-network.md#installation)

Start Avalanche Network Runner and run a script to start a new local network.

### Step 1 - Start the server

```text
$ cd /path/to/Avalanche-Network-Runner
$ avalanche-network-runner server \
--log-level debug \
--port=":8080" \
--grpc-gateway-port=":8081"
```

### Step 2 - Start a New Avalanche Network with Five Nodes (a cluster)

```bash
# replace execPath with the path to AvalancheGo on your machine
# e.g., ${HOME}/go/src/github.com/ava-labs/avalanchego/build/avalanchego
$ AVALANCHEGO_EXEC_PATH="avalanchego"
```

```bash
$ avalanche-network-runner control start \
--log-level debug \
--endpoint="0.0.0.0:8080" \
--number-of-nodes=5 \
--avalanchego-path ${AVALANCHEGO_EXEC_PATH}
```

Now you're running a local Avalanche network with 5 nodes.

### Step 3 - Open AvalancheJS

Open your AvalancheJS directory and select the **`examples`** folder to view the source code for the examples scripts.

![Image for post](/img/examples.png)

For more examples on how to transfer AVAX between chains see the following:

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

### Step 4 - Modify Your Export

:::info

The script in this tutorial uses **X Chain <-> C Chain** transfers. Depending on which chains you want to interact with, the scripts you use could be different. Please check the table above for more information.

:::

<br></br>

Select the **`examples/avm`** folder to view the AvalancheJS X-Chain examples. To send AVAX from the X-Chain to the C-Chain, select [`avm/buildExportTx-cchain-avax.ts`](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/buildExportTx-cchain-avax.ts)

![Image for post](/img/ajs-export-cchain-res.png)

### Modify your Avalanche network configuration

Depending on how you started your node, you might use custom settings for your Avalanche Network

You might notice that Avalanche Network Runner produces new ports for each node during node cluster deployment. Be sure to change configurations accordingly with each new cluster.

_Note: See [Advanced Configurations](https://docs.avax.network/nodes/build/set-up-node-with-installer#advanced-node-configuration) to learn more about custom Node configurations_

Below are the following objects in your Avalanche Network:

```js
const ip: string = "localhost";
const port: number = 9650;
const protocol: string = "http";
const networkID: number = 1337;
```

**IP Address**

You Node's IP address

By default, Avalanche Network Runner uses localhost.

```js
const ip: string = "localhost";
```

**Port Number**

As stated above, Avalanche Network Runner produces new port numbers for each node cluster.

```js
const port: number = "<YOUR-NODE-PORT-HERE>";
```

**Protocol**

The protocol we use to connect to the node's IP

```js
const protocol: string = "http";
```

#### **Network ID**

Depending on the networkID which is passed in when instantiating Avalanche, the encoded addresses used will have a distinctive Human Readable Part(HRP) per each network.

_Example Address: 1337 - X-`custom`19rknw8l0grnfunjrzwxlxync6zrlu33yeg5dya_

Mainnet:

```js
const networkID: number = 1;
```

Fuji Testnet:

```js
const networkID: number = 5;
```

Custom Network:

```js
const networkID: number = 1337;
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

### Edit The Amount Of AVAX You Want To Send:

By default the scripts send the wallet's entire AVAX balance:

When using Avalanche Network Runner, we import our [Pre-Generated Private Key](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/buildExportTx-cchain-avax.ts#L30) to our [`xKeychain`](https://github.com/ava-labs/avalanchejs/blob/46ce89f395133702320a77cba4bb9cb818b48fe8/examples/avm/buildExportTx-cchain-avax.ts#L31) to obtain signers. This means `X-custom18jma8ppw3nhx5r4ap8clazz0dps7rv5u9xde7p` is the `balance` holder and will pay the `fee` to export AVAX.

```js
const balance: BN = new BN(getBalanceResponse.balance);
const amount: BN = balance.sub(fee);
```

Change the amount by creating a new _BN_ variable: `value` and assigning it a string value `"10000000000000000"` (.01 AVAX) as an example.

```js
const value: BN = new BN("10000000000000000");
const amount: BN = value.sub(fee);
```

We must pass the value in WEI format. For reference, 10 \*\* 18 WEI = 1 AVAX

You can use the [snowtrace unit converter](https://snowtrace.io/unitconverter) to view more unit conversions

### Step 5 - Run the Export and Import scripts

Between X/P/C chains there is shared memory. First, tokens are exported from the source chain to the shared memory, then imported by the destination chain.

To complete a transfer from the X-Chain to the C-Chain , we must run both the Export and Import scripts.

By default, the scripts use the AvalancheJS constant, [`DefaultLocalGenesisPrivateKey`](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/buildExportTx-cchain-avax.ts#L30) as `privKey` to sign transactions.

```js
const privKey: string = `${PrivateKeyPrefix}${DefaultLocalGenesisPrivateKey}`;
```

The bech32 address which derived from this private key is : `X-custom18jma8ppw3nhx5r4ap8clazz0dps7rv5u9xde7p`

That key is pre-funded on the local network when using Avalanche Network Runner and has the following AVAX in the genesis block/vertex of each chain on the primary subnet:

- X-Chain: 300000000000000000 nAVAX

- P-Chain: 30000000000000000 nAVAX

- C-Chain: 50000000000000000000000000 nAVAX

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

## Typical Fuji Workflow

### Key Management

By default our scripts import our [Pre-Generated Private Key](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/buildExportTx-cchain-avax.ts#L30) to our [`xKeychain`](https://github.com/ava-labs/avalanchejs/blob/46ce89f395133702320a77cba4bb9cb818b48fe8/examples/avm/buildExportTx-cchain-avax.ts#L31) to obtain signers. This means `X-custom18jma8ppw3nhx5r4ap8clazz0dps7rv5u9xde7p` is the `balance` holder and will pay the fee to export AVAX.

You can manage the private keys you use with AvalancheJS directly in the AvalancheJS directory by doing the following:

1. Rename [`secrets.example`](https://github.com/ava-labs/avalanchejs/blob/master/examples/secrets.example) to `secrets.json`

2. Add your Private Key as an object.

```json
// secrets.json
{
  "privateKey": "<YOUR-PRIVATE-KEY-HERE>"
}
```

3. Import your private key into the example script.

```js
// buildExportTx-cchain-avax.ts
import { privateKey } from "../secrets.json";
```

By default, the scripts use the AvalancheJS constant, [`DefaultLocalGenesisPrivateKey`](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/buildExportTx-cchain-avax.ts#L30) as `privKey` to sign transactions.

```js
// buildExportTx-cchain-avax.ts
const privKey: string = `${PrivateKeyPrefix}${DefaultLocalGenesisPrivateKey}`;
```

To run AvalancheJS scripts on Mainnet or Fuji, you can simply replace this with the imported private key:

```js
// buildExportTx-cchain-avax.ts
const privKey: string = privateKey;
```

### Step 1 - Open AvalancheJS

Open your AvalancheJS directory and select the **`examples`** folder to view the source code for the examples scripts.

![Image for post](/img/examples.png)

### Step 2 - Modify Your Export

:::info

The script in this tutorial uses **X Chain <-> C Chain** transfers. Depending on which chains you want to interact with, the scripts you use could be different. Please check the table above for more information.

:::

<br></br>

Select the **`examples/avm`** folder to view the AvalancheJS X-Chain examples. To send AVAX from the X-Chain to the C-Chain, select [`avm/buildExportTx-cchain-avax.ts`](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/buildExportTx-cchain-avax.ts)

![Image for post](/img/ajs-export-cchain-res.png)

### Modify your Avalanche network configuration

Depending on how you started your node, you might use custom settings for your Avalanche Network

_Note: See [Advanced Configurations](https://docs.avax.network/nodes/build/set-up-node-with-installer#advanced-node-configuration) to learn more about custom Node configurations_

Below are the following objects in your Avalanche Network:

```js
const ip: string = "172.11.111.123";
const port: number = 9650;
const protocol: string = "http";
const networkID: number = 5;
```

**IP Address**

If you're using a local node:

```js
const ip: string = "localhost";
```

Or a custom IP address:

```js
const ip: string = "<YOUR-NODE-IP-ADDRESS-HERE>";
```

You can also perform this tutorial on the Avalanche Mainnet or Fuji Testnet by connecting to the [Avalanche Public API](../apis/avalanchego/public-api-server.md) server:

Mainnet:

```js
const ip: string = "api.avax.network";
```

Fuji Testnet:

```js
const ip: string = "api.avax-test.network";
```

**Port Number**

Default port number:

```js
const port: number = 9650;
```

**Protocol**

Local node:

```js
const protocol: string = "http";
```

[Avalanche Public API](../apis/avalanchego/public-api-server.md):

```js
const protocol: string = "https";
```

**Network ID**

Depending on the networkID which is passed in when instantiating Avalanche, the encoded addresses used will have a distinctive Human Readable Part(HRP) per each network.

_Example Address: 5 - X-`fuji`19rknw8l0grnfunjrzwxlxync6zrlu33yxqzg0h_

Mainnet:

```js
const networkID: number = 1;
```

Fuji Testnet:

```js
const networkID: number = 5;
```

You can learn more about our encoded addresses [here](cross-chain-transfers.md#network-id)

#### Edit The Amount Of AVAX You Want To Send:

By default the scripts send the wallet's entire AVAX balance:

```js
const balance: BN = new BN(getBalanceResponse.balance);
const amount: BN = balance.sub(fee);
```

Change the amount by creating a new _BN_ variable: `value` and assigning it a string value `"10000000000000000"` (.01 AVAX) as an example.

```js
const value: BN = new BN("10000000000000000");
const amount: BN = value.sub(fee);
```

We must pass the value in WEI format. For reference, 10 \*\* 18 WEI = 1 AVAX

You can use the [snowtrace unit converter](https://snowtrace.io/unitconverter) to view more unit conversions

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
