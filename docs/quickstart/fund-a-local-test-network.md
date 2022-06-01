# Fund a Local Test Network

## Introduction

In [Create a Local Test Network](create-a-local-test-network.md), we showed you how to launch a 5 node local test network. Once you have a local network the next step is to fund an address so that you can begin creating transactions and interacting with smart-contracts.

We'll show you how to leverage a pre-funded private key to access funds on the X-Chain, C-Chain and P-Chain.

:::info
This same private key, `PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN`, can be used to sign txs locally using [AvalancheJS](../apis/avalanchejs/README.md). You don't need to import the key into the local keystore in order to access those funds. They are in the genesis vertex and block for each respective chain.

The port in this tutorial uses 9650. Depending on how you start your local network, it could be different. If you are using Avalanche Network Runner, please check [here](./create-a-local-test-network.md#retrieve-all-nodes) to see how to retrieve the port numbers.

:::

:::warning
Keystore APIs are used in this tutorial, as warned in [Keystore API](../apis/avalanchego/apis/keystore.md): you should only create a keystore user on a node that you operate, as the node operator has access to your plaintext password.
:::

## Create a User

:::tip
This step can be skipped if you are only interesting in how to check the fund balance on X/P/C Chain.
:::

First run [`keystore.createUser`](../apis/avalanchego/apis/keystore.md#keystorecreateuser) to create a user in the local keystore.

```text
curl --location --request POST '127.0.0.1:9650/ext/keystore' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"keystore.createUser",
    "params" :{
        "username": "username",
        "password": "password"
    }
}'

{
    "jsonrpc": "2.0",
    "result": {
        "success": true
    },
    "id": 1
}
```

Next you can import the pre-funded private key, `PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN`, aka `ewoq`, into any of the 3 blockchains on the default subnet. After importing the key you can check the balance to confirm that it worked.

## X-Chain

### Import Key

:::tip
This step can be skipped if you are only interesting in how to check the fund balance on X Chain. It shows how to get the correct address.
:::

Import `ewoq` into the [X-Chain via avm.importKey API](../apis/avalanchego/apis/x-chain.md#avmimportkey).

```text
curl --location --request POST '127.0.0.1:9650/ext/bc/X' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.importKey",
    "params" :{
        "username": "username",
        "password": "password",
        "privateKey":"PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN"
    }
}'

{
    "jsonrpc": "2.0",
    "result": {
        "address": "X-custom18jma8ppw3nhx5r4ap8clazz0dps7rv5u9xde7p"
    },
    "id": 1
}
```

### Check X-Chain balance

Confirm the `X-custom18jma8ppw3nhx5r4ap8clazz0dps7rv5u9xde7p` address now has a balance of 300m AVAX on the X-Chain.

```text
curl --location --request POST '127.0.0.1:9650/ext/bc/X' \
--header 'Content-Type: application/json' \
--data-raw '{
  "jsonrpc":"2.0",
  "id"     : 1,
  "method" :"avm.getBalance",
  "params" :{
      "address":"X-custom18jma8ppw3nhx5r4ap8clazz0dps7rv5u9xde7p",
      "assetID": "AVAX"
  }
} '

{
    "jsonrpc": "2.0",
    "result": {
        "balance": "300000000000000000",
        "utxoIDs": [
            {
                "txID": "BUuypiq2wyuLMvyhzFXcPyxPMCgSp7eeDohhQRqTChoBjKziC",
                "outputIndex": 1
            }
        ]
    },
    "id": 1
}
```

## C-Chain

### Import Key

:::tip
This step can be skipped if you are only interesting in how to check the fund balance on C Chain. It just shows how to get the correct address.
:::

Import `ewoq` into the [C-Chain via avax.importKey API](../apis/avalanchego/apis/c-chain.md#avaximportkey).

```text
curl --location --request POST '127.0.0.1:9650/ext/bc/C/avax' \
--header 'Content-Type: application/json' \
--data-raw '{
    "method": "avax.importKey",
    "params": {
        "username":"username",
        "password":"password",
        "privateKey":"PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN"
    },
    "jsonrpc": "2.0",
    "id": 1
}'

{
    "jsonrpc": "2.0",
    "result": {
        "address": "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"
    },
    "id": 1
}
```

### Check the C-Chain balance

Confirm the `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC` address has a balance of 50m (0x295be96e64066972000000 in hex) AVAX on the C-Chain.

```text
curl --location --request POST 'localhost:9650/ext/bc/C/rpc' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "eth_getBalance",
    "params": [
        "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC",
        "latest"
    ],
    "id": 1
}'

{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x295be96e64066972000000"
}
```

### Integrate with MetaMask

To see this account on Metamask, follow these steps:

- Set up Metamask by using the info below:

  - **Network Name**: Avalanche Local C-Chain
  - **New RPC URL**: [http://127.0.0.1:9650/ext/bc/C/rpc](http://127.0.0.1:9650/ext/bc/C/rpc)
  - **ChainID**: `43112`
  - **Symbol**: `AVAX`

- Create a new account by importing this private key `0x56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027` on Metamask

!["Metamask import account"](/img/Metamask-Import-Account.png)

- Now you can see the balance of this newly created account on `Avalanche Local`

!["Local pre-funded account"](/img/local-pre-funded-account.png)

## P-Chain

### Import Key

:::tip
This step can be skipped if you are only interesting in how to check the fund balance on P Chain. It just shows how to get the correct address.
:::

Import `ewoq` into the [P-Chain via platform.importKey API](../apis/avalanchego/apis/p-chain.md#platformimportkey).

```text
curl --location --request POST '127.0.0.1:9650/ext/bc/P' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.importKey",
    "params" :{
        "username":"username",
        "password":"password",
        "privateKey":"PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN"
    }
}'

{
    "jsonrpc": "2.0",
    "result": {
        "address": "P-custom18jma8ppw3nhx5r4ap8clazz0dps7rv5u9xde7p"
    },
    "id": 1
}
```

### Check P-Chain balance

Confirm the `P-custom18jma8ppw3nhx5r4ap8clazz0dps7rv5u9xde7p` address has a balance of 30m AVAX on the P-Chain. 20m should be unlocked and 10m locked and stakeable.

```text
curl --location --request POST '127.0.0.1:9650/ext/bc/P' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getBalance",
    "params" :{
      "address":"P-custom18jma8ppw3nhx5r4ap8clazz0dps7rv5u9xde7p"
    }
}'

{
    "jsonrpc": "2.0",
    "result": {
        "balance": "30000000000000000",
        "unlocked": "30000000000000000",
        "lockedStakeable": "0",
        "lockedNotStakeable": "0",
        "utxoIDs": [
            {
                "txID": "11111111111111111111111111111111LpoYY",
                "outputIndex": 0
            },
            {
                "txID": "11111111111111111111111111111111LpoYY",
                "outputIndex": 1
            }
        ]
    },
    "id": 1
}
```
