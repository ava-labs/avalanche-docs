# Crear un Activo de Capital Variable

## Introducción

Este tutorial ilustra cómo crear un activo fungible de capital variable. No existen unidades del activo cuando éste se inicializa, pero se pueden acuñar más unidades del activo. En la creación del activo, especificamos qué conjuntos de direcciones pueden acuñar más unidades.

Puede que te preguntes por qué especificamos _conjuntos de direcciones que pueden acuñar más unidades del activo en lugar _de una sola dirección. Aquí está el porqué:

* **Seguridad: **si solo una dirección puede acuñar más del activo, y la clave privada para esa dirección se pierde, no se pueden acuñar más unidades. Del mismo modo, si sólo una dirección puede acuñar más del activo, nada impide que el titular de esa dirección acuñe unilateralmente todo lo que quiera.
* **Flexibilidad: **es agradable poder codificar lógica como: "Alice puede acuñar unilateralmente más unidades de este activo, o 2 de Dinesh, Ellin y Jamie pueden acuñar más".

Supongamos que queremos emitir un activo que represente acciones de una corporación. Al principio no existen acciones, pero más adelante se pueden crear más acciones. Vamos a crear tal activo.

## Requisitos

Has completado [Ejecutar un nodo](../nodes-and-staking/run-avalanche-node.md) de Avalanche y están familiarizados con [la arquitectura de](../../../learn/platform-overview/) Avalanche.

## Create el Activo

Nuestro activo existirán en la X-Chain, así que para crear nuestro activo llamaremos [`avm.createVariableCapAsset`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createvariablecapasset), que es un método de la [API](../../avalanchego-apis/exchange-chain-x-chain-api.md) de la X-Chain.

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

* `name`es un nombre de lectura humana para nuestro activo. No necesariamente único. Entre 0 y 128 caracteres.
* `symbol`es un símbolo de corta duración para este activo. Entre 0 y 4 caracteres. No necesariamente único. Puede ser omitido.
* `denomination`determina cómo los saldos de este activo se muestran por interfaces de usuario. Si la denominación es 0, 100 unidades de este activo se muestran como 100. Si la denominación es 1, 100 unidades de este activo se muestran como 10.0. Si la denominación es 2, 100 unidades de este activo se muestran como .100, etc.
* `minterSets`es una lista donde cada elemento especifica la de las direcciones en que `minters`acuñan más del activo al firmar una transacción `threshold`de acuñación.
* Realizar una transacción en la X-Chain requiere una comisión de transacción pagada en AVAX. `username`y `password`denotar el usuario que paga la tarifa.
* `from`son las direcciones que quieres usar para esta operación. Si se omite, usa cualquiera de tus direcciones según sea necesario.
* `changeAddr`es la dirección a la que se enviará cualquier cambio Si se omite, el cambio se envía a una de las direcciones controladas por el usuario.

### Respuesta

* `assetID`es el ID de un nuevo activo.
* `changeAddr`en el resultado es la dirección donde se envió cualquier cambio.

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

La respuesta debería ser así:

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

Usaremos para [`avm.mint`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-mint)acuñar las acciones.

* `amount`es el número de acciones que se crearán.
* `assetID`es el ID de un activo del que estamos creando más
* `to`es la dirección que recibirá las acciones de nueva acuñación. Reemplaza `to`con una dirección que tu usuario controla para que más tarde puedas enviar algunas de las acciones recientemente acuñadas.
* `username`debe ser un usuario que mantiene claves que le dan permiso de acuñar más de este activo. Es decir, controla al menos las _claves de _umbral para uno de los conjuntos de mineros que especificamos arriba.

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

La respuesta contiene el ID de la transacción.

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

Podemos comprobar el estado de la transacción que acabamos de enviar a la red usando [`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus):

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

Esto debería darnos:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "status": "Accepted"
    },
    "id": 1
}
```

## Intercambia el Activo

### Verifique el Balance

Todas las acciones de 10M están controladas por la `to`dirección que especificamos en .`mint` [`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance)Para verificar esto, usaremos

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

Enviemos 100 acciones a otra dirección usando [`avm.send`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-send). Para hacerlo ejecutamos:

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

Revisemos los saldos de la `to`dirección:

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

* Utilizado `createVariableCapAsset`para crear un activo de límite variable que representa acciones.
* Utilizado para `mint`acuñar más unidades de un activo.
* Utilizado para comprobar los equilibrios `getBalance`de dirección.
* Utilizado `send`para transferir acciones.

