# Create a Fixed-Cap Asset

## Introducción


Este tutorial ilustra cómo se puede utilizar Avalanche para crear e intercambiar un activo fungible de capital fijo. Se crea una cantidad específica del activo en la inicialización del mismo, y luego, nunca más se crea.

Supongamos que hay un acuerdo de reparto de ingresos \(ISA\) con 10 millones de acciones, y no se crearán más acciones. Vamos a crear un activo donde una unidad del activo representa una acción de la ISA.

## Requisitos

Haber completado [Ejecutar un Nodo de Avalanche](../../getting-started.md) y que seas familiar con [La Arquitectura de Avalanche](../../../learn/platform-overview/).

## Crear el Activo

Nuestro activo existirá en la [X-Chain](../../../learn/platform-overview/#exchange-chain-x-chain), así que para crear nuestro activo ejecutaremos `avm.createFixedCapAsset`, un método de la [API de la X-Chain](../../avalanchego-apis/exchange-chain-x-chain-api.md).

La firma de este método es:

```cpp
avm.createFixedCapAsset({
    name: string,
    symbol: string,
    denomination: int,  
    initialHolders: []{
        address: string,
        amount: int
    },
    from: []string,
    changeAddr: string,
    username: string,  
    password: string
}) ->
{
    assetID: string,
    changeAddr: string,
}
```

### Parámetros

* `name` es un nombre legible por los humanos para el activo. No necesariamente único.
* `symbol` es un símbolo abreviado para el activo. Entre 0 y 4 caracteres. No necesariamente único. Puede ser omitido.
* `denomination` determina la forma en que los saldos de este activo son mostrados por las interfaces de usuario. Si la denominación es 0, 100 unidades de este activo se muestran como 100. Si la denominación es 1, 100 unidades de este activo se muestran como 10.0. Si la denominación es 2, 100 unidades de este activo se muestran como .100, etc.
* Realizar una transacción en la X-Chain requiere una comisión de transacción pagada en AVAX. `username` y `password`  denotan al usuario que paga la comisión.
* Cada elemento en `initialHolders` especifica que `address` contiene `amount` unidades del activo en la génesis.
* `from` son las direcciones que quieres usar para esta operación. Si se omite, utiliza cualquiera de sus direcciones según sea necesario.
* `changeAddr` es la dirección a la que se enviará cualquier cambio. Si se omite, el cambio se envía a una de las direcciones controladas por el usuario.

### Response

* `assetID` is the ID of the new asset.
* `changeAddr` in the result is the address where any change was sent.

Now, on to creating the asset. You’ll want to replace `address` with an address you control so that you will control all of the newly minted assets and be able to send it later in this tutorial.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.createFixedCapAsset",
    "params" :{
        "name": "ISA Shares",
        "symbol":"ISAS",
        "denomination": 0,
        "initialHolders": [
            {
                "address": "X-avax10pvk9anjqrjfv2xudkdptza654695uwc8ecyg5",
                "amount": 10000000
            }
        ],
        "from":["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

The response contains the asset’s ID, which is also the ID of this transaction:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "assetID":"keMuoTQSGjqZbNVTCcbrwuNNNv9eEEZWBaRY3TapcgjkoZmQ1",
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

## Trade the Asset

### Check a balance

All 10,000,000 units of the asset \(shares\) are controlled by the address we specified in `initialHolders`.

To verify this, we call [`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance):

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-avax10pvk9anjqrjfv2xudkdptza654695uwc8ecyg5",
        "assetID":"keMuoTQSGjqZbNVTCcbrwuNNNv9eEEZWBaRY3TapcgjkoZmQ1"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

The response confirms that our asset creation was successful and that the expected address holds all 10,000,000 shares:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "balance":10000000
    }
}
```

### Send the asset

Now, let’s send 100 shares by calling [`avm.send`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-send).

To send the shares, we need to prove that we control the user the shares are being sent from. Therefore, this time we’ll need to fill in `username` and `password`.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.send",
    "params" :{
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE",
        "assetID" :"keMuoTQSGjqZbNVTCcbrwuNNNv9eEEZWBaRY3TapcgjkoZmQ1",
        "amount"  :100,
        "to"      :"X-avax1t8sl0knfzly3t3sherctxwezy533ega3sxww2k"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

### Check the transaction status

The response from the above call should look like this:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"2EAgR1YbsaJrwFiU4DpwjUfTLkt97WrjQYYNQny13AheewnxSR",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

`txID` is the ID of the `send` transaction we sent to the network.

After a second or two, the transaction should be finalized. We can check the status of the transaction with [`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus):

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getTxStatus",
    "params" :{
        "txID":"2EAgR1YbsaJrwFiU4DpwjUfTLkt97WrjQYYNQny13AheewnxSR"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

The response should look like this:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "status":"Accepted"
    }
}
```

You might also see that `status` is `Pending` if the network has not yet finalized it yet.

Now let’s check the balance of the `to` address:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-avax1t8sl0knfzly3t3sherctxwezy533ega3sxww2k",
        "assetID":"keMuoTQSGjqZbNVTCcbrwuNNNv9eEEZWBaRY3TapcgjkoZmQ1"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

The response should be:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "balance":100
    }
}
```

## Wrapping up

In this tutorial, we:

* Called `createFixedCapAsset` to create a fixed cap asset
* Called `getBalance` to check address balances
* Called `send` to transfer a quantity of our asset

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE3OTkwMTg4MTldfQ==
-->