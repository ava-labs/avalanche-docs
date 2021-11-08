# Financiar una red de pruebas local

## Introducción

En [Creación de una red de pruebas local](create-a-local-test-network.md) te mostramos cómo lanzar una red local de pruebas de cinco nodos. Una vez que tengas una red local, el siguiente paso es financiar una dirección para que puedas empezar a crear transacciones e interactuar con los contratos inteligentes.

Te mostraremos cómo aprovechar una clave privada en la que se le han puesto fondos previamente para acceder a fondos en la X-Chain, C-Chain y P-Chain. **NOTA** esta misma clave privada, `PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN`, se puede usar para firmar tx localmente usando [AvalancheJS](../../tools/avalanchejs/). No necesitas importar la clave al depósito de claves local para acceder a esos fondos. Están en el vértice de génesis y el bloque para cada cadena respectiva.

## Creación de un usuario

Primero ejecuta `keystore.createUser` para crear un usuario en el repositorio de claves local.

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

A continuación puedes importar la clave privada ya con fondos, `PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN`—aka `ewoq`, a cualquiera de las 3 blockchains en la subred predeterminada. Después de importar la clave puedes comprobar el saldo para confirmar que funcionó.

## X-Chain

Importa `ewoq` a la [X-Chain](../../avalanchego-apis/exchange-chain-x-chain-api.md).

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
        "address": "X-local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u"
    },
    "id": 1
}
```

### Verifica el saldo de la X-Chain

Confirma que la dirección `X-local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u` ahora tiene un saldo de 300m AVAX en la X-Chain.

```text
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

Importa `ewoq` a la [C-Chain](../../avalanchego-apis/contract-chain-c-chain-api.md).

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

### Verifica el saldo de la C-Chain

Confirma que la dirección `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC` tiene un saldo de 50m (0x295be96e64066972000000 en hex) AVAX en la C-Chain.

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

### Integra con MetaMask

Para ver esta cuenta en MetaMask, sigue los siguientes pasos:

* Configura Metamask siguiendo [esto](../smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md#local-testnet-avash-settings-avash-tutorial) y crea una red `Avalanche Local`.
* Crea una nueva cuenta importando esta clave privada `0x56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027`en Metamask

![](../../../.gitbook/assets/Metamask-Import-Account.png)

* Ahora puedes ver el saldo de la cuenta recién creada en `Avalanche Local`

![](../../../.gitbook/assets/local-pre-funded-account.png)

## P-Chain

Importa `ewoq` a la [P-Chain](../../avalanchego-apis/platform-chain-p-chain-api.md).

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
        "address": "P-local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u"
    },
    "id": 1
}
```

### Verifica el saldo de la P-Chain

Confirma que la dirección `P-local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u` tenga un saldo de 30m AVAX en la P-Chain; 20m deben estar desbloqueados y 10m bloqueados y susceptibles de participación.

```text
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

