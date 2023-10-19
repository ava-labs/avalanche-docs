---
tags: [Tooling, AvalancheGo APIs]
description: The AvalancheGo Postman collection includes all the public API calls that are available on AvalancheGo instance, allowing you to quickly issue commands to your node and see the response, without having to copy and paste long and complicated `curl` commands.
pagination_label: AvalancheGo Install Script
sidebar_position: 2
---

# Making API Calls

import ReactPlayer from 'react-player'

## How to Make an API Call

After [installing Postman](../avalanchego-postman-collection/setup#setup)
and importing the [Avalanche collection](../avalanchego-postman-collection/setup#collection-import),
choose an API to make the call. 

The next step is to make sure the URL is the correct one for the call.
This URL consists of the base URL and the endpoint: 

* The base URL is set by an environment variable called `baseURL`, and it is by
default our [public API](../../tooling/rpc-providers.md).
If you need to make a local API call, simply change the URL to localhost. 
This can be done by changing the value
of the `baseURL` variable or changing the URL directly on the call tab.
Check out the [RPC providers](../rpc-providers.md) to see all public URLs.

* The API endpoint depends on which API is used. Please check out 
[our APIs](../../reference/README.md) to find the proper endpoint.


Add the needed parameters for the call. For example, if a user wants to fetch data
about a certain transaction, the transaction hash is needed. For fetching data about a
block, depending on the call used, the block hash or number will be required.

Click the **Send** button.

The output will be displayed in the **Body** tab.

:::info 
Data visualization is available for a number of methods. 
Learn how to use it with the help of 
[this](../avalanchego-postman-collection/data-visualization.md) guide.
:::

![Make Call](/img/postman/postman-38-make-api-call.png)



## Examples

### C-Chain Public API Call

Fetching data about a C-Chain transaction using `eth_getTransactionByHash`.

<ReactPlayer playing controls url='/img/postman/postman-39-api-call-example.mov' width="1000px" height="600px"/>

### X-Chain Public API Call

Fetching data about an X-Chain block using `avm.getBlock`.

<ReactPlayer playing controls url='/img/postman/postman-40-api-call-example.mov' width="1000px" height="600px"/>

### P-Chain Public API Call

Getting the current P-Chain height using `platform.getHeight`.

<ReactPlayer playing controls url='/img/postman/postman-41-api-call-example.mov' width="1000px" height="600px"/>

### API Call Using Variables

Let’s say we want fetch data about this `0x20cb0c03dbbe39e934c7bb04979e3073cc2c93defa30feec41198fde8fabc9b8`
C-Chain transaction using both:

* `eth_getTransactionReceipt`

* `eth_getTransactionByHash`

We can set up an environment variable with the transaction hash as value and use it on both calls.

:::info
Find out more about variables [here](../avalanchego-postman-collection/variables.md).
:::

<ReactPlayer playing controls url='/img/postman/postman-42-api-call-example.mov' width="1000px" height="600px"/>


