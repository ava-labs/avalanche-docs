# Crear un Activo de Capital Fijo

## Introducción

Este tutorial ilustra cómo se puede utilizar Avalanche para crear e intercambiar un activo fungible de capital fijo. Se crea una cantidad específica del activo en la inicialización del mismo, y luego, nunca más se crea.

Supongamos que hay un acuerdo de reparto de ingresos \(ISA\) con 10 millones de acciones, y no se crearán más acciones. Vamos a crear un activo donde una unidad del activo representa una acción de la ISA.

## Requisitos

Has completado [Ejecutar un nodo](../nodes-and-staking/run-avalanche-node.md) de Avalanche y están familiarizados con [la arquitectura de](../../../learn/platform-overview/) Avalanche.

## Create el Activo

Nuestro activo existirán en la [X-Chain](../../../learn/platform-overview/#exchange-chain-x-chain), de modo que para crear nuestro activo llamaremos `avm.createFixedCapAsset`, un método de la [API](../../avalanchego-apis/exchange-chain-x-chain-api.md) de la X-Chain.

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

### Parametros

* `name`es un nombre de lectura humana para el activo. No necesariamente único.
* `symbol`es un símbolo de corta duración para el activo. Entre 0 y 4 caracteres. No necesariamente único. Puede ser omitido.
* `denomination`determina cómo los saldos de este activo se muestran por interfaces de usuario. Si la denominación es 0, 100 unidades de este activo se muestran como 100. Si la denominación es 1, 100 unidades de este activo se muestran como 10.0. Si la denominación es 2, 100 unidades de este activo se muestran como .100, etc.
* Realizar una transacción en la X-Chain requiere una comisión de transacción pagada en AVAX. `username`y `password`denotar el usuario que paga la tarifa.
* Cada elemento en `initialHolders`especifica que `address`contiene `amount`unidades del activo en la génesis.
* `from`son las direcciones que quieres usar para esta operación. Si se omite, usa cualquiera de tus direcciones según sea necesario.
* `changeAddr`es la dirección a la que se enviará cualquier cambio Si se omite, el cambio se envía a una de las direcciones controladas por el usuario.

### Respuesta

* `assetID`es el ID de un nuevo activo.
* `changeAddr`en el resultado es la dirección donde se envió cualquier cambio.

Ahora, en la creación del activo. Queréis reemplazar `address`con una dirección que controlas para controlar todos los activos recién acuñados y poder enviarlo más tarde en este tutorial.

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

## Intercambia el Activo

### Verifique el Balance

`initialHolders`Las 100unidades del activo \(acciones\) son controladas por la dirección que especificamos en .

Para verificar esto, [`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance)llamamos:

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

La respuesta confirma que nuestra creación de activos fue exitosa y que la dirección deseada tiene la totalidad de los 10 millones de acciones:

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

Ahora, enviemos 100 acciones al llamar [`avm.send`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-send).

Para enviar las acciones, necesitamos probar que controlamos el usuario desde el que se envían las acciones. Por lo tanto, esta vez necesitaremos llenar `username`y llenar.`password`

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

`txID`es el ID de la `send`transacción que enviamos a la red.

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

La respuesta debería ser así:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "status":"Accepted"
    }
}
```

También podrías ver que `status`es `Pending`si la red aún no la ha finalizado.

Ahora revisemos el saldo de la `to`dirección:

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

* Llamada a crear un activo `createFixedCapAsset`de tope fijo
* Llamada a revisar los saldos `getBalance`de direcciones
* Llamada `send`a transferir una cantidad de nuestro activo

