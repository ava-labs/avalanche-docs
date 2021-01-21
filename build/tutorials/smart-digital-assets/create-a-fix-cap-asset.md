# Crear un Activo de Capital Fijo

## Introducción


Este tutorial ilustra cómo se puede utilizar Avalanche para crear e intercambiar un activo fungible de capital fijo. Se crea una cantidad específica del activo en la inicialización del mismo, y luego, nunca más se crea.

Supongamos que hay un acuerdo de reparto de ingresos \(ISA\) con 10 millones de acciones, y no se crearán más acciones. Vamos a crear un activo donde una unidad del activo representa una acción de la ISA.

## Requisitos

Haber completado [Iniciando en Avalanche](../../getting-started.md) y que seas familiar con [La Arquitectura de Avalanche](../../../learn/platform-overview/).

## Crear el Activo

Nuestro activo existirá en la [X-Chain](../../../learn/platform-overview/#exchange-chain-x-chain), así que para crear nuestro activo ejecutaremos `avm.createFixedCapAsset`, el cual es un método de la [API de la X-Chain](../../avalanchego-apis/exchange-chain-x-chain-api.md).

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

### Respuesta

* `assetID` es la ID del nuevo activo.
* `changeAddr` en el resultado está la dirección donde se envió el cambio.

Ahora, en la creación del activo. Querrás reemplazar `address` por una dirección que controles para que puedas controlar todos los activos recién acuñados y poder enviarlos más tarde en este tutorial.

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

La respuesta contiene el ID del activo, que es también el ID de esta transacción:

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

## Intercambie el Activo

### Compruebe el balance

Todas las 10.000.000 de unidades del activo \(acciones\) están controladas por la dirección que especificamos en `initialHolders`.

Para verificar esto, ejecutamos [`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance):

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

La respuesta confirma que la creación de nuestro activo tuvo éxito y que la dirección especificada contiene los 10,000,000 de acciones:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "balance":10000000
    }
}
```

### Envía el Activo

Ahora enviemos 100 acciones ejecutando [`avm.send`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-send).

Para enviar las acciones, necesitamos probar que controlamos el usuario desde el que se envían las acciones. Por lo tanto, esta vez tendremos que rellenar `username` y `password`.

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

### Comprobar el estado de la transacción

La respuesta de lo que ejecutamos anteriormente debería verse así:

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

`txID` es el ID de la transacción `send` que enviamos a la red.

Luego de un segundo o dos la transacción debería finalizar. Podemos comprobar el estado de la transacción con [`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus):

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

La respuesta debería verse así:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "status":"Accepted"
    }
}
```

También podría ver que el `status` es `Pending` si la red aún no lo ha finalizado.

Ahora revisemos el balance de la dirección `to`:

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

La respuesta debería ser:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "balance":100
    }
}
```

## Concluimos!

En este tutorial:

* Ejecutamos`createFixedCapAsset` para crear un activo de capital fijo
* Ejecutamos `getBalance` para comprobar los saldos de las direcciones
* Ejecutamos`send` para transferir una cantidad de nuestro activo

<!--stackedit_data:
eyJoaXN0b3J5IjpbOTEwMTQwMzc5LDEwOTA1MjI0MjgsMTYxNT
czNDE2MF19
-->