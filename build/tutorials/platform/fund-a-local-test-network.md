# Fund a Local Test Network

## Introduction

In [Create a Local Test Network](./create-a-local-test-network.md), we showed you how to launch a 5 node local test network. Once you have a local network the next step is to fund an address so that you can begin creating transactions and interacting with smart-contracts.

We'll show you how to leverage a pre-funded private key to access funds on the X-Chain, C-Chain and P-Chain. **NOTE** this same private key, `PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN`, can be used to sign txs locally using [AvalancheJS](../../tools/avalanchejs/README.md). You don't need to import the key into the local keystore in order to access those funds. They are in the genesis vertex and block for each respective chain.

## Create a User

First run `keystore.createUser` to create a user in the local keystore.

```zsh
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

Next you can import the pre-funded private key, `PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN`&mdash;aka `ewoq`, into any of the 3 blockchains on the default subnet. After importing the key you can check the balance to confirm that it worked.

## X-Chain

Import `ewoq` into the [X-Chain](../../avalanchego-apis/exchange-chain-x-chain-api.md).

```zsh
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
        "address": "X-local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u"
    },
    "id": 1
}
```

### Check X-Chain balance

Confirm the `X-local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u` address now has a balance of 300m AVAX on the X-Chain.

```zsh
curl --location --request POST '127.0.0.1:9650/ext/bc/X' \
--header 'Content-Type: application/json' \
--data-raw '{
  "jsonrpc":"2.0",
  "id"     : 1,
  "method" :"avm.getBalance",
  "params" :{
      "address":"X-local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u",
      "assetID": "AVAX"
  }
} '

{
    "jsonrpc": "2.0",
    "result": {
        "balance": "300000000000000000",
        "utxoIDs": [
            {
                "txID": "2fombhL7aGPwj3KH4bfrmJwW6PVnMobf9Y2fn9GwxiAAJyFDbe",
                "outputIndex": 1
            }
        ]
    },
    "id": 1
}
```

## C-Chain

Import `ewoq` into the [C-Chain](../../avalanchego-apis/contract-chain-c-chain-api.md).

```zsh
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

```zsh
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

## P-Chain

Import `ewoq` into the [P-Chain](../../avalanchego-apis/platform-chain-p-chain-api.md).

```zsh
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
        "address": "P-local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u"
    },
    "id": 1
}
```

### Check P-Chain balance

Confirm the `P-local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u` address has a balance of 30m AVAX on the P-Chain. 20m should be unlocked and 10m locked and stakeable.

```zsh
curl --location --request POST '127.0.0.1:9650/ext/bc/P' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getBalance",
    "params" :{
      "address":"P-local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u"    
    }
}'

{
    "jsonrpc": "2.0",
    "result": {
        "balance": "30000000000000000",
        "unlocked": "20000000000000000",
        "lockedStakeable": "10000000000000000",
        "lockedNotStakeable": "0",
        "utxoIDs": [
            {
                "txID": "11111111111111111111111111111111LpoYY",
                "outputIndex": 1
            },
            {
                "txID": "11111111111111111111111111111111LpoYY",
                "outputIndex": 0
            }
        ]
    },
    "id": 1
}
```
