# Integrate Figment and Metamask

[Figment](https://figment.io) is a blockchain cloud service provider. Figment offers free access to Avalanche's APIs, which developers can use to build on Avalanche.

## Setup

First, [create an account](https://figment.io/datahub/avalanche) on Figment. You'll get a email with a verification link. When you click it, you'll be signed into Figment's DataHub dashboard.

## DataHub Dashboard

Once you're signed in and at the [DataHub dashboard](https://datahub.figment.io), find the `Available protocols` section and select Avalanche. This will bring you to the Avalanche dashboard. Figment's free tier of service for Avalanche has a limit of 200,000 requests per day. If you want to make more requests per day, you can selection from their [paid options](https://datahub.figment.io/services/avalanche/prices).

## Avalanche Dashboard

On the Avalanche dashboard you'll data about your plan and your usage of Avalanche APIs.

Next, you'll see your API key. It will look something like this: `f81e193b9412a683af7101e964766c07`. This piece of information is used to authenticate you when you make calls to the Avalanche API. You must provide it when you make a call to an Avalanche API hosted by Figment.

As the table on the dashboard says, you can make an API call to Avalanche's mainnet at `avalanche--mainnet--rpc.datahub.figment.io`. You can make an API call to the Fuji testnet at `avalanche--fuji--rpc.datahub.figment.io`.

### Try it Out

Paste the following command into your computer's terminal to confirm that you can access the Avalanche API hosted by Figment. This `curl` is asking for the blockchainID of the X-Chain on the Fuji testnet. Replace `APIKEYGOESHERE` with the API key you see on the Avalanche dashboard.

```text
curl --location --request POST 'https://avalanche--fuji--rpc.datahub.figment.io/apikey/APIKEYGOESHERE/ext/info' \
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

```text
{
    "jsonrpc": "2.0",
    "result": {
        "blockchainID": "2JVSBoinj9C2J33VntvzYtVJNZdN2NKiwwKjcumHUWEb5DbBrm"
    },
    "id": 1
}
```

## Set up Metamask

Let's connect our Metamask wallet to the Avalanche API hosted by Figment. Open Metamask and select the network drop-down menu. Then, select `Custom RPC`

![Image for post](https://miro.medium.com/max/408/0*0HGM4O_J5iF3943S)

Now, fill in the boxes with the following values, depending on whether you want to connect to mainnet or the Fuji testnet. Again, replace `APIKEYGOESHERE` with your API key from Figment.

### Mainnet Settings

* **Network Name**: Figment C-Chain Mainnet
* **New RPC URL**: `https://avalanche--mainnet--rpc.datahub.figment.io/apikey/APIKEYGOESHERE/ext/bc/C/rpc`
* **ChainID**: `0xa86a`
* **Symbol**: AVAX
* **Explorer**: `https://cchain.explorer.avax.network`

### Fuji Settings

* **Network Name**: Figment C-Chain Fuji
* **New RPC URL**: `https://avalanche--fuji--rpc.datahub.figment.io/apikey/APIKEYGOESHERE/ext/bc/C/rpc` 
* **ChainID**: `0xa869`
* **Symbol**: AVAX
* **Explorer**: `https://cchain.explorer.avax-test.network`

![Image for post](https://miro.medium.com/max/989/1*Y7O1bBeTWnuQBAqTnwmqUQ.png)

After setting up all of the parameters, you should see this page, which shows your \(empty\) balance.

![Image for post](https://miro.medium.com/max/358/1*q0HIWcI3okakwYV2glos0A.png)

