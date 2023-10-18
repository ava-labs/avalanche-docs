---
tags: [Tooling, AvalancheGo APIs]
description: The AvalancheGo Postman collection includes all the public API calls that are available on AvalancheGo instance, allowing you to quickly issue commands to your node and see the response, without having to copy and paste long and complicated `curl` commands.
pagination_label: AvalancheGo Install Script
sidebar_position: 4
---

# Data Visualization

import ReactPlayer from 'react-player'

## API calls with Data Visualization

Data visualization is available for a number of API calls. It takes the request
output and transforms it into a table, with all the information converted in a
user friendly manner.

Please check out
[how to install Postman](../avalanchego-postman-collection/setup#setup) and
[how to make API calls with Postman](../avalanchego-postman-collection/making-api-calls.md)
beforehand, as this guide assumes that the user has already gone through these steps.

API calls for which data visualization it is available:

### C-Chain

* [`eth_baseFee`](../../reference/avalanchego/c-chain/api#eth_basefee)
* [`eth_blockNumber`](https://www.quicknode.com/docs/ethereum/eth_blockNumber)
* [`eth_chainId`](https://www.quicknode.com/docs/ethereum/eth_chainId)
* [`eth_getAssetBalance`](../../reference/avalanchego/c-chain/api#eth_getassetbalance)
* [`eth_getBalance`](https://www.quicknode.com/docs/ethereum/eth_getBalance)
* [`eth_getBlockByHash`](https://www.quicknode.com/docs/ethereum/eth_getBlockByHash)
* [`eth_getBlockByNumber`](https://www.quicknode.com/docs/ethereum/eth_getBlockByNumber)
* [`eth_getTransactionByHash`](https://www.quicknode.com/docs/ethereum/eth_getTransactionByHash)
* [`eth_getTransactionReceipt`](https://www.quicknode.com/docs/ethereum/eth_getTransactionReceipt)
* [`avax.getAtomicTx`](../../reference/avalanchego/c-chain/api#avaxgetatomictx)

### P-Chain

* [`platform.getCurrentValidators`](../../reference/avalanchego/p-chain/api#platformgetcurrentvalidators)

### X-Chain

* [`avm.getAssetDescription`](../../reference/avalanchego/x-chain/api#avmgetassetdescription)
* [`avm.getBlock`](../../reference/avalanchego/x-chain/api#avmgetblock)
* [`avm.getBlockByHeight`](../../reference/avalanchego/x-chain/api#avmgetblockbyheight)
* [`avm.getTx`](../../reference/avalanchego/x-chain/api#avmgettx)

<ReactPlayer playing controls url='/img/postman/postman-23-visuals-video.mov' width="1000px" height="600px"/>



## Data Visualization Features

* The request output is displayed in a table, each data category having a
different color.

![Data Visualization Feature](/img/postman/postman-24-visualization-feature.png)

* Unix timestamps are converted to date and time.

![Data Visualization Feature](/img/postman/postman-25-visualization-feature.png)

* Hexadecimal to decimal conversions.

![Data Visualization Feature](/img/postman/postman-26-visualization-feature.png)

* Native token amounts shown as AVAX and/or gwei and wei.

![Data Visualization Feature](/img/postman/postman-27-visualization-feature.png)

* The name of the transaction type added besides the transaction.
type ID.

![Data Visualization Feature](/img/postman/postman-28-visualization-feature.png)

* Percentages added for the amount of gas used. This percent represents what percentage
of gas was used our of the `gasLimit`.

![Data Visualization Feature](/img/postman/postman-29-visualization-feature.png)

* Convert the output for atomic transactions from hexadecimal to user readable.

:::info
Please note that this only works for C-Chain Mainnet, not Fuji.
:::


![Data Visualization Feature](/img/postman/postman-30-visualization-feature.png)

## How to Visualize Responses

1. After [installing Postman](../avalanchego-postman-collection/setup#postman-installation)
and importing the [Avalanche collection](../avalanchego-postman-collection/setup#collection-import),
choose an API to make the call. 

2. Make the call. 

3. Click on the **Visualize** tab.

4. Now all data from the output can be seen displayed in a table.

:::info 
Learn how to make an API call with Postman with the help of this guide.
:::

![Visualize Response](/img/postman/postman-31-visualize-response.png)
![Visualize Response](/img/postman/postman-32-visualize-response.png)

## Examples

### `eth_getTransactionByHash`

<ReactPlayer playing controls url='/img/postman/postman-33-visualize-response-example.mov'
width="1000px" height="600px"/>

### `avm.getBlock`

<ReactPlayer playing controls url='/img/postman/postman-34-visualize-response-example.mov' 
width="1000px" height="600px"/>

### `platform.getCurrentValidators`

<ReactPlayer playing controls url='/img/postman/postman-35-visualize-response-example.mov' 
width="1000px" height="600px"/>

### `avax.getAtomicTx`

<ReactPlayer playing controls url='/img/postman/postman-36-visualize-response-example.mov' 
width="1000px" height="600px"/>

### `eth_getBalance`

<ReactPlayer playing controls url='/img/postman/postman-36-visualize-response-example.mov' width="1000px" height="600px"/>