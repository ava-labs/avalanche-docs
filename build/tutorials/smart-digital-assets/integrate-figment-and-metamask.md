# Integrating Figment and Metamask

[Figment](https://figment.io) is a blockchain cloud service provider.  They offer a free API gateway service for AVM, EVM and platform chain APIs which developers can use to build on Avalanche.

## Setup

First, [create an account](https://figment.io/datahub/avalanche). You'll get a email with a verification link. When you click it then you'll be signed back in to Figment's DataHub dashboard.

## DataHub Dashboard

Once signed in and at the [DataHub dashboard](https://datahub.figment.io) select Avalanche from Available protocols. This will give you access to the free tier of the API gateway service. The free tier has a quota of 200k requests per day. There are [upgrade options](https://datahub.figment.io/services/avalanche/prices) for more requests if you max out over 200k per day. After selecting Avalanche you'll land on the Avalanche Dashboard.

## Avalanche Dashboard

On the Avalanche dashboard you'll see a graph of API requests at the top of the page. Below that you'll see your current plan and stats related to your daily usage.

Next you'll see API keys, which are passed in the URL. Lastly API service URLs. Figment provides API endpoints for mainnet and fuji testnet.

* Mainnet avalanche--mainnet--rpc.datahub.figment.io
* Fuji avalanche--fuji--rpc.datahub.figment.io

### Confirm it works

Try the following `curl` to confirm that you can access the Figment node's RPC. This `curl` is asking for the blockchainID of the X-Chain on the Fuji tesnet. Make sure to add your API key to `api-key` in the url below.

```zsh
curl --location --request POST 'https://avalanche--fuji--rpc.datahub.figment.io/apikey/api-key/ext/info' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getBlockchainID",
    "params": {
        "alias":"X"
    }
}'
```

If you are successully able to POST to the figment full node then you should get the following response.

```zsh
{
    "jsonrpc": "2.0",
    "result": {
        "blockchainID": "2JVSBoinj9C2J33VntvzYtVJNZdN2NKiwwKjcumHUWEb5DbBrm"
    },
    "id": 1
}
```

## Set up Metamask

The first thing we should set is a metamask wallet.

![Image for post](https://miro.medium.com/max/408/0*0HGM4O_J5iF3943S)

Click to metamask icon on the browser and select the network drop-down menu. Here we should connect to C-Chain. Click to “Custom RPC”.

![Image for post](https://miro.medium.com/max/989/1*Y7O1bBeTWnuQBAqTnwmqUQ.png)

Now, we need to set these boxes with correct values.

* **Network Name**: Figment-of-my-imagination
* **New RPC URL**:
  * **Mainnet:** [https://avalanche--mainnet--rpc.datahub.figment.io/apikey/api-key/ext/bc/C/rpc](https://avalanche--mainnet--rpc.datahub.figment.io/apikey/api-key/ext/bc/C/rpc)
  * **Fuji Testnet:** [https://avalanche--fuji--rpc.datahub.figment.io/apikey/api-key/ext/bc/C/rpc](https://avalanche--fuji--rpc.datahub.figment.io/apikey/api-key/ext/bc/C/rpc)
* **ChainID**:
  * **Mainnet:** `0xa86a`
  * **Fuji Testnet:** `0xa869`
* **Symbol**: AVAX
* **Explorer**:
  * **Mainnet:** [https://cchain.explorer.avax.network](https://cchain.explorer.avax.network/) 
  * **Fuji Testnet:** [https://cchain.explorer.avax-test.network](https://cchain.explorer.avax-test.network/)

![Image for post](https://miro.medium.com/max/358/1*q0HIWcI3okakwYV2glos0A.png)

After setting up all the parameters correctly, we should see this page. For now, we have 0 C-AVAX. “C” refers to C-chain and we have to get some C-AVAX to interact with the network.
