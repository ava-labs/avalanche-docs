# Crear un activo variable de Cap

## Introducción

Este tutorial ilustra cómo crear un activo fungible y variable de cap. No existen unidades del activo cuando se inicia el activo, pero se pueden acudir más unidades del activo. En la creación de activos, especificamos qué conjuntos de direcciones pueden mintar más unidades.

Puede estar preguntando por qué especificamos _conjuntos_ de direcciones que pueden mintar más unidades del activo en lugar de una sola dirección. Aquí está el porqué:

* **Seguridad:** si solo una dirección puede mintar más del activo, y la clave privada para esa dirección se pierde, no se pueden acuñar más unidades. De manera similar, si solo una dirección puede mintar más del activo, nada detiene al titular de esa dirección de acuñar unilateralmente tanto como deseen.
* **Flexibilidad:** es agradable poder codificar la lógica como: "Alice puede unilateralmente mentar más unidades de este activo, o 2 de Dinesh, Ellin y Jamie pueden juntar más".

Supongamos que queremos emitir un activo que represente acciones de una corporación. No existen acciones para empezar, pero más acciones pueden crearse más tarde. Creemos tal activo.

## Requisitos para requisitos de seguridad

Has completado [Run Nodo](../nodes-and-staking/run-avalanche-node.md) Avalanche y estás familiarizado con [la arquitectura de Avalanche](../../../learn/platform-overview/).

## Crear el activo

Nuestro activo existirá en la cadena X, por lo que para crear nuestro activo llamaremos [`avm.createVariableCapAsset`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createvariablecapasset), que es un método de la API de [la cadena X](../../avalanchego-apis/exchange-chain-x-chain-api.md).

La firma de este método es:

```cpp
avm.createVariableCapAsset({
    name: string,
    symbol: string,
    denomination: int,
    minterSets []{
        minters: []string,
        threshold: int
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

* `nombre` es un nombre legible por el ser humano. No necesariamente único. Entre 0 y 128 caracteres.
* `símbolo` es un símbolo de la corta distancia para este activo. Entre 0 y 4 caracteres. No necesariamente único. Puede ser omitido.
* `la denominación` determina cómo los saldos de este activo se muestran por interfaces de usuario. Si la denominación es 0, 100 unidades de este activo se muestran como 100. Si la denominación es 1, 100 unidades de este activo se muestran como 10.0. Si la denominación es 2, 100 unidades de este activo son exhibiciones como .100, etc.
* `minterSets` es una lista en la que cada elemento especifica que `el umbral` de las direcciones en `minters` puede mintar juntos más del activo mediante la firma de una transacción de mining.
* Realizar una transacción en la cadena X requiere una tarifa de transacción pagada en AVAX. `nombre de usuario` y `contraseña` denotan el usuario que paga la tarifa.
* `de` son las direcciones que desea utilizar para esta operación. Si se omitida, utiliza cualquiera de sus direcciones según sea necesario.
* `changeAddr` es la dirección a la que se enviará cualquier cambio. Si se omitida, el cambio se envía a una de las direcciones controladas por el usuario.

### Respuesta

* `asset ID` es el ID del nuevo activo.
* `changeAddr` en el resultado es la dirección donde se envió cualquier cambio.

Más tarde en este ejemplo, vamos a mintar más acciones, así que asegúrese de sustituir al menos 2 direcciones en el segundo conjunto de minter con direcciones de sus controles de usuario.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.createVariableCapAsset",
    "params" :{
        "name":"Corp. Shares",
        "symbol":"CS",
        "minterSets":[
            {
                "minters": [
                    "X-avax1ghstjukrtw8935lryqtnh643xe9a94u3tc75c7"
                ],
                "threshold": 1
            },
            {
                "minters": [
                    "X-avax1k4nr26c80jaquzm9369j5a4shmwcjn0vmemcjz",
                    "X-avax1yell3e4nln0m39cfpdhgqprsd87jkh4qnakklx",
                    "X-avax1ztkzsrjnkn0cek5ryvhqswdtcg23nhge3nnr5e"
                ],
                "threshold": 2
            }
        ],
        "from":["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

La respuesta debería parecer así:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "assetID":"i1EqsthjiFTxunrj8WD2xFSrQ5p2siEKQacmCCB5qBFVqfSL2",
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

## Mint el activo

En este momento existen 0 acciones. Vamos a mint 10M acciones.

### Crear la Transacción sin firmar

Usaremos [`avm.mint`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-mint) para mentar las acciones.

* `cantidad` es el número de acciones que se crearán.
* `asset ID` es el ID del activo de la que estamos creando más.
* es la dirección `que` recibirá las acciones de nueva menta. `Reemplazar a` una dirección que controla el usuario para que más tarde pueda enviar algunas de las acciones de nueva menta.
* `Nombre` de usuario debe ser un usuario que tenga las teclas que le da permiso para mentar más de este activo. Es decir, controla al menos las teclas _de umbral_ para uno de los conjuntos de minero que hemos especificado anteriormente.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.mint",
    "params" :{
        "amount":10000000,
        "assetID":"i1EqsthjiFTxunrj8WD2xFSrQ5p2siEKQacmCCB5qBFVqfSL2",
        "to":"X-avax1a202a8pu5w4vnerwzp84j68yknm6lf47drfsdv",
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

La respuesta contiene el ID de la transacción:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"E1gqPbkziu8AutqccRa9ioPWyEF3Vd7eMjDJ3UshjQPpLoREZ",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

Podemos comprobar el estado de la transacción que acabamos de enviar a la red utilizando [`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus):

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.getTxStatus",
    "params" :{
        "txID":"E1gqPbkziu8AutqccRa9ioPWyEF3Vd7eMjDJ3UshjQPpLoREZ"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Esto debe dar:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "status": "Accepted"
    },
    "id": 1
}
```

## Comercio de activos

### Compruebe un equilibrio

Todas las acciones de 10M están controladas por la dirección `que` especificamos en `la menta`. Para verificar esto, usaremos [`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance):

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-avax1a202a8pu5w4vnerwzp84j68yknm6lf47drfsdv",
        "assetID":"i1EqsthjiFTxunrj8WD2xFSrQ5p2siEKQacmCCB5qBFVqfSL2"
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

Enviemos 100 acciones a otra dirección utilizando [`avm.send`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-send). Para ello:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.send",
    "params" :{
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE",
        "assetID" :"i1EqsthjiFTxunrj8WD2xFSrQ5p2siEKQacmCCB5qBFVqfSL2",
        "amount"  :100,
        "to"      :"X-avax1qwnlpknmdkkl22rhmad0dcn80wfasp2y3yg3x0"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Revisemos los saldos de la dirección `de` la siguiente:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-avax1qwnlpknmdkkl22rhmad0dcn80wfasp2y3yg3x0",
        "assetID":"i1EqsthjiFTxunrj8WD2xFSrQ5p2siEKQacmCCB5qBFVqfSL2"
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

* `CreateVariableCapAsset` para crear un activo de tapa variable que represente acciones.
* `Menta` utilizada para mentar más unidades de un activo.
* `getBalance` usado para comprobar los equilibrios de direcciones.
* Se usa `para` transferir acciones.

