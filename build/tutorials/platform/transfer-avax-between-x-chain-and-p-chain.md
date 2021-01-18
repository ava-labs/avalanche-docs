# Transferir AVAX entre la X-Chain y la P-Chain

## Introduction

Los Tokens de AVAX existen en la X-Chain, donde se pueden tradear, en la P-Chain, donde se pueden proporcionar como stake al validar la Red Primaria, y en la C-Chain, donde se pueden utilizar en smart contracts o para pagar el gas. Avalanche apoya el movimiento de AVAX entre estas cadenas, y en el futuro, Avalanche apoyará más intercambios atómicos genéricos entre cadenas. En este tutorial, enviaremos fichas AVAX entre la X-Chain y la P-Chain.

## Requisitos

Haber completado [Ejecutar un Nodo de Avalanche](../../getting-started.md) y que seas familiar con [La Arquitectura de Avalanche](../../../learn/platform-overview/).


¡Para poder enviar AVAX, necesitas tener algo de AVAX! Puedes conseguir AVAX de verdad comprándola en un exchange, o puedes conseguir AVAX de la red de pruebas desde el [Faucet de Prueba de AVAX](https://faucet.avax-test.network), que es una forma gratis y fácil de ir jugando con Avalanche.

## Transferir AVAX usando la Wallet Web

La forma más fácil de transferir AVAX entre cadenas es usar [La Wallet de Avalanche](https://wallet.avax.network/) que es una forma segura y no custodiada de acceder y mover AVAX.

El código fuente de la Wallet de Avalanche se puede encontrar [aquí](https://github.com/ava-labs/avalanche-wallet).


### Paso 1 - Abre la Wallet de Avalanche

![Image for post](../../../.gitbook/assets/wallet-x2p-01-login.png)

Selecciona **Access Wallet** para ingresar a tu Wallet. Para conectar la Wallet una red que no sea la red principal de Avalanche, selecciona **Mainnet** y elige la red a la que se conectará.

### Paso 2 - Iniciar Sesión en tu Wallet

Puedes acceder a tu wallet utilizando el private key, la frase mnemónica, el archivo keystore o Ledger Nano S

![Image for post](../../../.gitbook/assets/wallet-x2p-02-access.png)

After a successful login you will see your balance, assets portfolio and various other information.

### Step 3 - Go to the Cross Chain Tab

![Image for post](../../../.gitbook/assets/wallet-x2p-03-earn.png)

Functionality for transferring tokens between chains is on the **Cross Chain** tab.

### Step 4 - Enter Amount to Transfer

You will be presented with a choice for **Source Chain** and **Destination Chain**. Select X-Chain and P-Chain, respectively. You will see your X and P balances, and an input field for entering the amount to transfer from source to destination chain.

![Image for post](../../../.gitbook/assets/wallet-x2p-05-x-p.png)

Enter the amount you wish to transfer from the X-Chain to the P-Chain.

### Step 5 - Confirm the Transaction

![Image for post](../../../.gitbook/assets/wallet-x2p-06-confirm.png)

Press **Confirm**, and then **Transfer** to initiate the transfer.

### Step 6 - Done!

A cross-chain transfer is a two step process: first a transaction to export the funds from the X-Chain, and another to import it to the P-Chain. The wallet will do both and show its the progress while doing so.

![Image for post](../../../.gitbook/assets/wallet-x2p-07-transfer.png)

That's it! You've transferred AVAX from the X-Chain to P-Chain! Now you can use them to validate or delegate on the Avalanche network.

### Transfer from P-Chain to X-Chain

To return the AVAX back to the X-Chain, you need to do the transfer in the opposite direction.

Swap the source and destination chains by selecting them from the **Source** and **Destination** drop-down menu. The rest of the process is the same: enter the amount, confirm and transfer.

## Transferring from the X-Chain to P-Chain with API Calls

If you're building an application on the Avalanche network, you may want to do the transfer programmatically as part of some broader functionality. You can do that by calling the appropriate APIs on an AvalancheGo node. The rest of the tutorial assumes you have access to an AvalancheGo node, AVAX tokens on the X-Chain, and user credentials [created](../../avalanchego-apis/keystore-api.md#keystorecreateuser) and stored in the node's keystore.

All the example API calls below assume the node is running locally \(that is, listening on `127.0.0.1`\). The node can be connected to the main network, a test network or a local network. In each case, the API calls and responses should be the same, except for the address formats. The node need not be local; you can make calls to a node hosted elsewhere.

As you may have noticed while transferring AVAX using the Avalanche Wallet, a cross-chain transfer is a two transaction operation:

* Export AVAX from the X-Chain
* Import AVAX to the P-chain

### Step 1 - Export AVAX from the X-Chain

To export AVAX, call the X-Chain’s [`avm.exportAVAX`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-exportavax) method.

Your call should look like this:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.exportAVAX",
    "params" :{
        "to":"P-avax1wkmfja9ve3lt3n9ye4qp3l3gj9k2mz7ep45j7q",
        "destinationChain": "P",
        "amount": 5000000,
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

where `to` is the address of a P-Chain address your user controls and `changeAddr` is the address to send any change to. You can leave `changeAddr` blank; if you leave it blank, change will be returned to an address controlled by your user \(see [here](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createaddress) for instructions on creating a new P-Chain address\).

Note that you will pay a transaction fee for both the export and import operations. In this example, let’s assume the transaction fee is `.001` AVAX. Then, the above export actually consumes `.006` AVAX; `.005` goes to the P-Chain and `.001` is burned as a transaction fee.

Make sure that the amount that you’re sending exceeds the transaction fee. Otherwise, when you import AVAX on the P-Chain, it will consume the transaction fee, and you’ll end up with _less_ AVAX on the P-Chain.

The response should look like this:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "MqEaeWc4rfkw9fhRMuMTN7KUTNpFmh9Fd7KSre1ZqTsTQG73h",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
    },
    "id": 1
}
```

We can verify that this transaction was accepted by calling [`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus):

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "avm.getTxStatus",
    "params":{
        "txID":"MqEaeWc4rfkw9fhRMuMTN7KUTNpFmh9Fd7KSre1ZqTsTQG73h"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Which shows our transaction is accepted:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "status": "Accepted"
    },
    "id": 1
}
```

We can also call [`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance) to check that the AVAX was deducted from an address held by our user:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-ADDRESSGOESHERE",
        "assetID":"AVAX"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

The amount deducted is the exported amount \(`.005` AVAX in this example\) plus the transaction fee. If your user controls multiple X-Chain addresses, AVAX may have been sent from any combination of them.

### Step 2 - Import AVAX to the P-Chain

Our transfer isn’t done just yet. We need to call the P-Chain’s [`platform.importAVAX`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-importavax) method to finish the transfer.

Your call should look like this:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.importAVAX",
    "params": {
        "to":"P-avax1wkmfja9ve3lt3n9ye4qp3l3gj9k2mz7ep45j7q",
        "sourceChain":"X",
        "changeAddr":"P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"myUsername",
        "password":"myPassword",
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

This returns the transaction ID:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2sxo3ySETZ4xzXqAtgsUvZ5pdkqG4SML4c7Z7NoKLZcp77YNXC",
        "changeAddr":"P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

We can check that the transaction was accepted with:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getTxStatus",
    "params" :{
        "txID":"2sxo3ySETZ4xzXqAtgsUvZ5pdkqG4SML4c7Z7NoKLZcp77YNXC"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

It should be `Committed`, meaning the transfer is complete. We can also check the balance of the address with:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getBalance",
    "params":{
        "address":"P-avax1wkmfja9ve3lt3n9ye4qp3l3gj9k2mz7ep45j7q"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

The response should look like this:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "balance": "4000000",
        "utxoIDs": [
            {
                "txID": "2sxo3ySETZ4xzXqAtgsUvZ5pdkqG4SML4c7Z7NoKLZcp77YNXC",
                "outputIndex": 0
            }
        ]
    },
    "id": 1
}
```

Note that the balance we see is the amount exported from the X-Chain \(`.004` AVAX\) less the transaction fee \(`.001` AVAX in this example\). Now, we can use the AVAX held by this P-Chain address to provide a stake in order to validate the Primary Network.

## Transferring from the P-Chain to X-Chain programmatically

Now, let’s move AVAX from the P-Chain back to the X-Chain.

Same as before, this is also a two transaction operation:

* Export from the P-Chain
* Import to the X-Chain

### Step 1 - Export AVAX from the P-Chain

To do so, call [`platform.exportAVAX`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-exportavax):

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.exportAVAX",
    "params": {
        "to":"X-avax1fjn5rffqvny7uk3tjegjs6snwjs3hhgcpcxfax",
        "amount":3000000,
        "changeAddr":"P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

where `to` is the X-Chain address the AVAX is being sent to.

This returns the transaction ID, and we can check that the transaction was committed with another call to [`platform.getTxStatus`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-gettxstatus). Again, make sure that the amount you’re sending exceeds the transaction fee.

### Step 2 - Import AVAX to X-Chain

To finish our transfer from the P-Chain to the X-Chain, call [`avm.importAVAX`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-importavax):

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.importAVAX",
    "params" :{
        "to":"X-avax1fjn5rffqvny7uk3tjegjs6snwjs3hhgcpcxfax",
        "sourceChain":"P",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Note that `to` is the same address specified in our call to [`platform.exportAVAX`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-exportavax).

Just as before, we can call [`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance) to verify the funds were received. The balance should have increased by `.003` AVAX minus the transaction fee.

## Wrapping Up

That’s it! Now, you can swap AVAX back and forth between the X-Chain and P-Chain, both by using the Avalanche Wallet, and by calling the appropriate API calls on an Avalanche node.

Now you can use the tokens on the P-Chain to [add a node as a validator](../nodes-and-staking/add-a-validator.md) on the Primary Network.

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEwMjY0OTk4MDBdfQ==
-->