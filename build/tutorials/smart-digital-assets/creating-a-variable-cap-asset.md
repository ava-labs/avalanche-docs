# Crear un Activo de Capitalización Variable

## Introducción

Este tutorial ilustra cómo crear un activo fungible de capital variable. No existen unidades del activo cuando éste se inicializa, pero se pueden acuñar más unidades del activo. En la creación del activo, especificamos qué conjuntos de direcciones pueden acuñar más unidades.

Tal vez se pregunte por qué especificamos _sets_ de direcciones que pueden acuñar más unidades del activo en lugar de una sola dirección. Aquí está el porqué:

* **Seguridad:** si sólo una dirección puede acuñar más del activo, y se pierde la clave privada de esa dirección, no se podrán acuñar más unidades. Del mismo modo, si sólo una dirección puede acuñar más del activo, nada impide que el titular de esa dirección acuñe unilateralmente todo lo que quiera.
* **Flexibilidad:** es agradable poder codificar la lógica como, "Alice puede acuñar unilateralmente más unidades de este activo, o 2, en el cual Dinesh, Ellin y Jamie pueden juntos acuñar más".

Supongamos que queremos emitir un activo que represente acciones de una corporación. Al principio no existen acciones, pero más adelante se pueden crear más acciones. Vamos a crear tal activo.

## Requisitos

Haber completado [Ejecutar un Nodo de Avalanche](../../getting-started.md) y que seas familiar con [La Arquitectura de Avalanche](../../../learn/platform-overview/).

## Create el Activo

Nuestro activo existirá en la X-Chain, así que para crear nuestro activo ejecutaremos [`avm.createVariableCapAsset`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createvariablecapasset), el cual es un método de la [API de la X-Chain](../../avalanchego-apis/exchange-chain-x-chain-api.md).

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

### Parametros

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

Más adelante en este ejemplo, acuñaremos más acciones, así que asegúrate de sustituir al menos 2 direcciones del segundo minter set por las direcciones que controle tu usuario.

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

La respuesta debe verse así:

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

## Acuñar el Activo

En este momento existen 0 acciones. Acuñemos 10 millones de acciones.

### Crear la Transacción No Firmada

Usaremos [`avm.mint`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-mint) para acuñar las acciones.

* `amount` es el número de acciones que se crearán.
* `assetID` es la identificación del activo del que estamos creando más.
* `to` es la dirección que recibirá las nuevas acciones acuñadas. Reemplaza `to` con una dirección que tu usuario controle para que más tarde puedas enviar algunas de las acciones recién acuñadas.
* `username` debe ser un usuario que tenga las control keys que le permitan acuñar más de este activo. Es decir, controla al menos _threshold_ keys para uno de los minter sets que especificamos arriba.

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

The response contains the transaction’s ID:

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

We can check the status of the transaction we’ve just sent to the network using [`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus):

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

This should give:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "status": "Accepted"
    },
    "id": 1
}
```

## Trade the Asset

### Check a Balance

All 10M shares are controlled by the `to` address we specified in `mint`. To verify this, we’ll use [`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance):

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

### Send the Asset

Let’s send 100 shares to another address by using [`avm.send`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-send). To do so:

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

Let’s check the balances of the `to` address:

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

* Used `createVariableCapAsset` to create a variable-cap asset that represents shares.
* Used `mint` to mint more units of an asset.
* Used `getBalance` to check address balances.
* Used `send` to transfer shares.

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTYyNTAxMjg2MywxMDg3ODc3MDEzLC0xMT
M1MDA1MTYxXX0=
-->