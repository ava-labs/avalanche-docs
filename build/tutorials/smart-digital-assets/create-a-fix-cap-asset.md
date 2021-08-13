# Crear un conjunto de Activos de Cap Fixed

## Introducción

Este tutorial ilustra cómo Avalanche puede ser utilizado para crear y comerciar un activo fungible y de límite fijo. Una cantidad específica del activo se crea en la inicialización del activo, y luego, no se crea nunca más.

Supongamos que hay un Acuerdo de Intercambio de Ingresos \(ISA\) con acciones de 10M y no se crean más acciones. Creemos un activo donde una unidad del activo representa una parte de la ISA.

## Requisitos para requisitos de seguridad

Has completado [Run Nodo](../nodes-and-staking/run-avalanche-node.md) Avalanche y estás familiarizado con [la arquitectura de Avalanche](../../../learn/platform-overview/).

## Crear el activo

Nuestro activo existirá en la cadena [X](../../../learn/platform-overview/#exchange-chain-x-chain), así que para crear nuestro activo llamaremos `avm.createFixedCapAsset`, un método de la API de la [cadena X](../../avalanchego-apis/exchange-chain-x-chain-api.md).

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

* `nombre` es un nombre legible por el ser activo. No necesariamente único.
* `símbolo` es un símbolo de la corta distancia para el activo. Entre 0 y 4 caracteres. No necesariamente único. Puede ser omitido.
* `la denominación` determina cómo los saldos de este activo se muestran por interfaces de usuario. Si la denominación es 0, 100 unidades de este activo se muestran como 100. Si la denominación es 1, 100 unidades de este activo se muestran como 10.0. Si la denominación es 2, 100 unidades de este activo son exhibiciones como .100, etc.
* Realizar una transacción en la cadena X requiere una tarifa de transacción pagada en AVAX. `nombre de usuario` y `contraseña` denotan el usuario que paga la tarifa.
* Cada elemento en `los Holders iniciales` especifica que `la dirección` contiene unidades de `cantidad` del activo en el génesis.
* `de` son las direcciones que desea utilizar para esta operación. Si se omitida, utiliza cualquiera de sus direcciones según sea necesario.
* `changeAddr` es la dirección a la que se enviará cualquier cambio. Si se omitida, el cambio se envía a una de las direcciones controladas por el usuario.

### Respuesta

* `asset ID` es el ID del nuevo activo.
* `changeAddr` en el resultado es la dirección donde se envió cualquier cambio.

Ahora, para crear el activo. Usted querrá reemplazar `la dirección` por una dirección que controle para que controle todos los activos recién mentados y poder enviarla más tarde en este tutorial.

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

La respuesta contiene el ID del activo, que también es el ID de esta transacción:

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

## Comercio de activos

### Compruebe un equilibrio

Todas las 10.000.000 unidades del activo \(acciones\) están controladas por la dirección que especificamos en `los Titulares iniciales`.

Para verificar esto, llamamos [`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance):

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

La respuesta confirma que nuestra creación de activos tuvo éxito y que la dirección prevista tiene todas las 10.000.000 acciones:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "balance":10000000
    }
}
```

### Enviar el activo

Ahora, enviemos 100 acciones llamando a [`avm.send`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-send).

Para enviar las acciones, necesitamos probar que controlamos al usuario las acciones están siendo enviadas de. Por lo tanto, esta vez necesitaremos llenar `el nombre` de usuario y `contraseña`.

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

### Compruebe el estado de la transacción

La respuesta de la llamada anterior debería parecer así:

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

`txID` es el ID de la transacción de `envío` que enviamos a la red.

Después de un segundo o dos, la transacción debe ser final. Podemos comprobar el estado de la transacción con [`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus):

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

La respuesta debería parecer así:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "status":"Accepted"
    }
}
```

También podría ver que el `estado` está `pendiente` si la red aún no la ha finalizado.

Ahora revisemos el equilibrio de la dirección `de` la dirección:

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

La respuesta debe ser:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "balance":100
    }
}
```

## Envoltura

En este tutorial, nosotros:

* Llamado `createFixedCapAsset` para crear un activo de tapa fija
* Llamado `getBalance` para comprobar los saldos de direcciones
* Llamado `enviar` a transferir una cantidad de nuestro activo

