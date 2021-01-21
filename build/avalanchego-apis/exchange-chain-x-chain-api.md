---
descripción: La X-Chain o Cadena X es una instancia de la Máquina Virtual de Avalanche (AVM)
---

# Cadena de Intercambio \(X-Chain\) API

La [X-Chain](../../learn/platform-overview/#exchange-chain-x-chain), plataforma nativa de Avalanche para crear e intercambiar activos, es una intancia de la Máquina Virtual de Avalanche \(AVM\). Esta API permite a los clientes crear e intercambiar activos en la X-Chain y otras instancias de la AVM.

{% embed url="https://www.youtube.com/watch?v=rD-IOd1nvFo" caption="" %}

## Formato

Esta API utiliza formatos RPC `json 2.0`. Para más información de llamadas JSON RPC, mira [aquí](issuing-api-calls.md).

## Endpoints / Extremos

`/ext/bc/X` para interactuar con la X-Chain.

`/ext/bc/blockchainID` para interactuar con cualquier otra instancia de AVM, donde `blockchainID` es el ID de la cadena de bloques que ejecuta la AVM.

## Métodos

### avm.buildGenesis

Dada una representación JSON del estado génesis de esta Máquina Virtual, crea la representación en byte de este estado.

#### **Extremo**

Esta llamada al extremo estático del API de la AVM:

`/ext/vm/avm`

Nota: las direcciones no deben incluir el prefijo de la cadena \(ie. X-\) en las llamadas al extremo estático de la API, porque estos prefijos hacen referencia a una cadena en específico.

#### **Firma**

```cpp
avm.buildGenesis({
    networkID: int,
    genesisData: JSON,
    encoding: string, //opcional
}) -> {
    bytes: string,
    encoding: string,
}
```

`encoding` especifica el formato de codificación para utilizar para bytes arbitrarios ie. los bytes del génesis que son regresados. Puede ser “cb58” o “hex”. Por defecto es “cb58”.

`genesisData` tiene la forma:

```cpp
{
"genesisData" :
    {
        "assetAlias1": {               // Cada objeto define un activo
            "name": "human readable name",
            "symbol":"AVAL",           // Debe tener entre 0 y 4 caracteres
            "initialState": {
                "fixedCap" : [         // Elige el tipo de activo.
                    {                  // Puede ser "fixedCap", "variableCap", "limitedTransfer", "nonFungible"
                        "amount":1000, // En el genesis, dirección A tiene
                        "address":"A"  // 1000 unidades de activo
                    },
                    {
                        "amount":5000, // Al genesis, dirección B tiene
                        "address":"B"  // 1000 unidades del activo
                    },
                    ...                // Puedes tener multiples poseedores iniciales
                ]
            }
        },
        "assetAliasCanBeAnythingUnique": { // El sobrenombre puede usarse en vez de assetID en las llamadas
            "name": "human readable name", // nombres no necesitan ser únicos
            "symbol": "AVAL",              // simbolo no necesitan ser únicos
            "initialState": {
                "variableCap" : [          // No existen unidades del activo en el génesis
                    {
                        "minters": [       // la firma de A o B pueden acuñar más de
                            "A",           // los activos.
                            "B"
                        ],
                        "threshold":1
                    },
                    {
                        "minters": [       // Las firmas de 2 de A, B y C pueden acuñar
                            "A",           // mas del activo
                            "B",
                            "C"
                        ],
                        "threshold":2
                    },
                    ...                    // Puedes tener cualquier conjunto de mineros
                ]
            }
        },
        ...                                // Puedes listar más activos
    }
}
```

#### **Llamada de Ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "id"     : 1,
    "method" : "avm.buildGenesis",
    "params" : {
        "networkId": 16,
        "genesisData": {
            "asset1": {
                "name": "myFixedCapAsset",
                "symbol":"MFCA",
                "initialState": {
                    "fixedCap" : [
                        {
                            "amount":100000,
                            "address": "avax13ery2kvdrkd2nkquvs892gl8hg7mq4a6ufnrn6"
                        },
                        {
                            "amount":100000,
                            "address": "avax1rvks3vpe4cm9yc0rrk8d5855nd6yxxutfc2h2r"
                        },
                        {
                            "amount":50000,
                            "address": "avax1ntj922dj4crc4pre4e0xt3dyj0t5rsw9uw0tus"
                        },
                        {
                            "amount":50000,
                            "address": "avax1yk0xzmqyyaxn26sqceuky2tc2fh2q327vcwvda"
                        }
                    ]
                }
            },
            "asset2": {
                "name": "myVarCapAsset",
                "symbol":"MVCA",
                "initialState": {
                    "variableCap" : [
                        {
                            "minters": [
                                "avax1kcfg6avc94ct3qh2mtdg47thsk8nrflnrgwjqr",
                                "avax14e2s22wxvf3c7309txxpqs0qe9tjwwtk0dme8e"
                            ],
                            "threshold":1
                        },
                        {
                            "minters": [
                                "avax1y8pveyn82gjyqr7kqzp72pqym6xlch9gt5grck",
                                "avax1c5cmm0gem70rd8dcnpel63apzfnfxye9kd4wwe",
                                "avax12euam2lwtwa8apvfdl700ckhg86euag2hlhmyw"
                            ],
                            "threshold":2
                        }
                    ]
                }
            }
        },
        "encoding": "hex"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/vm/avm
```

#### **Respuesta Ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "bytes": "0x0000000000010006617373657431000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f6d794669786564436170417373657400044d464341000000000100000000000000010000000700000000000186a10000000000000000000000010000000152b219bc1b9ab0a9f2e3f9216e4460bd5db8d153bfa57c3c",
        "encoding": "hex"
    },
    "id": 1
}
```

### avm.createAddress

Crea una nueva dirección controlada por cierto usuario.

#### **Firma**

```cpp
avm.createAddress({
    username: string,
    password: string
}) -> {address: string}
```

#### **Llamada de ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "avm.createAddress",
    "params": {
        "username": "myUsername",
        "password": "myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Respuesta ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "X-avax12c6n252g5v3w6a6v69f0mnnzwr77jxzr3q3u7d"
    },
    "id": 1
}
```

### avm.createFixedCapAsset

Crea un nuevo activo fungible, de capitalización fija. Una cantidad de él es creada al inicio y posteriormente no pueden crearse más. El activo puede ser enviado con `avm.send`.

{% page-ref page="../tutorials/smart-digital-assets/create-a-fix-cap-asset.md" %}

#### **Firma**

```cpp
avm.createFixedCapAsset({
    name: string,
    symbol: string,
    denomination: int, //opcional
    initialHolders: []{
        address: string,
        amount: int
    },
    from: []string, //opcional
    changeAddr: string, //opcional
    username: string,
    password: string
}) ->
{
    assetID: string,
    changeAddr: string
}
```

* `name` es un nombre humanamente-legible del activo. No necesariamente único.
* `symbol` es una abreviación del símbolo del activo. Entre 0 y 4 caractéres. No necesariamente único. Puede omitirse.
* `denomination` determina cómo se mostrarán en la interfáz de usuario los balances del activo. Si `denomination` es 0, 100 unidades del activo se visualizarán como 100. Si `denomination` es 1, 100 unidades del activo se visualizarán como 10.0. Si `denomination` es 2, 100 unidades del activo se visualizarán como .100, etc. Por defecto es 0.
* `from` son las direcciones que quieres usar para esta operación. Si se omite, necesariamente utilizará cualquiera de tus direcciones.
* `changeAddr` es la dirección a la cual se enviará cualquier cambio. Si se omite, el cambio será enviado a cualquier dirección controlada por el usuario.
* `username` y `password` denotan el usuario que pagará por la comisión de la transacción.
* Cada elemento en `initialHolders` especifica que la dirección `address` poseerá `amount` unidades del activo en el génesis.
* `assetID` es el ID del nuevo activo.

#### **Llamada de Ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.createFixedCapAsset",
    "params" :{
        "name": "myFixedCapAsset",
        "symbol":"MFCA",
        "initialHolders": [
            {
                "address": "X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp",
                "amount": 10000
            },
            {
                "address":"X-avax1y0h66sjk0rlnh9kppnfskwpw2tpcluzxh9png8",
                "amount":50000
            }
        ],
        "from":["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Respuesta ejemplo**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "assetID":"ZiKfqRXCZgHLgZ4rxGU9Qbycdzuq5DRY4tdSNS9ku8kcNxNLD",
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

### avm.mint

Mina unidades de un activo con capitalización variable creados con [`avm.createVariableCapAsset`](exchange-chain-x-chain-api.md#avm-createvariablecapasset).

#### **Firma**

```cpp
avm.mint({
    amount: int,
    assetID: string,
    to: string,
    from: []string, //optional
    changeAddr: string, //optional
    username: string,
    password: string
}) ->
{
    txID: string,
    changeAddr: string,
}
```

* `amount`  de unidades del `assetID` que se crearán y controlará la dirección especificada en `to`.
* `from` son las direcciones que deseas usar para esta operación. Si se omiten, necesariamente utiliza alguna de tus direcciones.
* `changeAddr` es la dirección en la que cualquier cambio será enviado. Si se omite, se enviará a cualquier dirección controlada por el usuario.
* `username` es el usuario que paga por la comisión de transacción. `username` debe poseer la llave otorgando permiso de acuñar más de estos activos. Esto es, debe controlar al menos  _threshold_ llaves de alguno de los conjuntos de mineros.
* `txID` es el ID de la transacción.
* `changeAddr` en el resultado es la dirección a la cual se enviará cualquier cambio.

#### **Llamada de ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.mint",
    "params" :{
        "amount":10000000,
        "assetID":"i1EqsthjiFTxunrj8WD2xFSrQ5p2siEKQacmCCB5qBFVqfSL2",
        "to":"X-avax1ap39w4a7fk0au083rrmnhc2pqk20yjt6s3gzkx",
        "from":["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Respuesta ejemplo**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"2oGdPdfw2qcNUHeqjw8sU2hPVrFyNUTgn6A8HenDra7oLCDtja",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

### avm.createVariableCapAsset

Crea un nuevo activo fungible con capital variable. No existen unidades del activo al iniciar. Los mineros pueden acuñar unidades de este activo utilizando `avm.mint`.

{% page-ref page="../tutorials/smart-digital-assets/creating-a-variable-cap-asset.md" %}

#### **Firma**

```cpp
avm.createVariableCapAsset({
    name: string,
    symbol: string,
    denomination: int, //opcional
    minterSets: []{
        minters: []string,
        threshold: int
    },
    from: []string, //opcional
    changeAddr: string, //opcional
    username: string,
    password: string
}) ->
{
    assetID: string,
    changeAddr: string,
}
```

* `name` es un nombre humanamente-legible del activo. No necesariamente único.
* `symbol` es un simbolo que sirve como abreviación del activo. Entre 0 y 4 caracteres. No necesariamente único. Puede omitirse.
* `denomination` determina cómo se mostrarán en la interfáz de usuario los balances del activo. Si `denomination` es 0, 100 unidades del activo se visualizarán como 100. Si `denomination` es 1, 100 unidades del activo se visualizarán como 10.0. Si `denomination` es 2, 100 unidades del activo se visualizarán como .100, etc.
* `minterSets` es una lista donde cada elemento especifica un límite (`threshold`) de direcciones en`minters` que juntos podrán acuñar nuevos activos firmando una transacción de acuñamiento.
* `from` son las direcciones que quieres usar para esta operación. Si se omite, necesariamente utilizará cualquiera de tus direcciones.
* `changeAddr` es la dirección a la cual se enviará cualquier cambio. Si se omite, el cambio será enviado a cualquier dirección controlada por el usuario.
* `username` paga por la comisión de transacción.
* `assetID` es el ID del nuevo activo.
* `changeAddr` en el resultado, es la dirección a la cual cualquier cambio fue enviado.

#### **Llamada de ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.createVariableCapAsset",
    "params" :{
        "name":"myVariableCapAsset",
        "symbol":"MFCA",
        "minterSets":[
            {
                "minters":[
                    "X-avax14q0p6y4yzweuugz9p080kapajwvac3ur755n7d"
                ],
                "threshold": 1
            },
            {
                "minters": [
                    "X-avax1fzyldr3mwn6lj7y46edhua6vr5ayx0ruuhezpv",
                    "X-avax1x5mrgxj0emysnnzyszamqxhq95t2kwcp9n3fy3",
                    "X-avax13zmrjvj75h3578rn3sfth8p64t2ll4gm4tv2rp"
                ],
                "threshold": 2
            }
        ],
        "from":["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Respuesta Ejemplo**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "assetID":"2QbZFE7J4MAny9iXHUwq8Pz8SpFhWk3maCw4SkinVPv6wPmAbK",
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

### avm.createNFTAsset

Crea un nuevo activo no-fungible. No existen unidades del activo al inicializarlo. Mineros pueden acuñar nuevas unidades de estos activos usando `avm.mintNFT`.

{% page-ref page="../tutorials/smart-digital-assets/creating-a-nft-part-1.md" %}

#### **Firma**

```cpp
avm.createNFTAsset({
    name: string,
    symbol: string,
    minterSets: []{
        minters: []string,
        threshold: int
    },
    from: []string, //optional
    changeAddr: string, //optional
    username: string,
    password: string
}) ->
 {
    assetID: string,
    changeAddr: string,
}
```

* `name` es un nombre humanamente-legible del activo. No necesariamente único.
* `symbol` es un símbolo de abreviación para el activo. Entre 0 y 4 caracteres. No ncesariamente único. Puede ser omitido.
* `minterSets` es una lista donde cada elemento especificado establece un umbral (`threshold`) de direcciones en `minters` que juntos deben acuñar uno o más activos firmando una transacción para acuñar.
* `from` son las direcciones que quieres usar para esta operación. Si se omiten, cualquiera de tus direcciones será necesariamente utilizada.
* `changeAddr` es la dirección a la cual se enviará cualquier cambio. Si se omite, el cambio se enviará a cualquier dirección controlada por el usuario.
* `username` paga por la comisión de transacción.
* `assetID` es el ID del nuevo activo.
* `changeAddr` en el resultado, es la dirección a la cual se envió cualquier cambio que hubiera.

#### **Llamada de ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.createNFTAsset",
    "params" :{
        "name":"Coincert",
        "symbol":"TIXX",
        "minterSets":[
            {
                "minters":[
                    "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
                ],
                "threshold": 1
            }
        ],
        "from": ["X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"],
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Respuesta Ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "assetID": "2KGdt2HpFKpTH5CtGZjYt5XPWs6Pv9DLoRBhiFfntbezdRvZWP",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    },
    "id": 1
}
```

### avm.mintNFT

Acuñar tokens no-fungibles (NFTs) que fueron creados con [`avm.createNFTAsset`](exchange-chain-x-chain-api.md#avm-createnftasset).

{% page-ref page="../tutorials/smart-digital-assets/creating-a-nft-part-1.md" %}

#### **Firma**

```cpp
avm.mintNFT({
    assetID: string,
    payload: string,
    to: string,
    encoding: string, //optional
    from: []string, //optional
    changeAddr: string, //optional
    username: string,
    password: string
}) ->
{
    txID: string,
    changeAddr: string,
}
```

* `assetID` es el ID del activo del nuevo activo NFT creado.
* `payload` es una carga arbitraria de hasta 1024 bytes. Su formato de codificación es especificado en el argumento `encoding`.
* `from` son las direcciones que quieres usar para esta operación. Si se omiten, se usará una de tus direcciones en caso de ser necesario.
* `changeAddr` es la dirección a la que se enviará cualquier cambio. Si se omite, el cambio se envía a una de las direcciones controladas por el usuario.
* `username` es el usuario que paga la tarifa de transacción. `username` debe tener las llaves que le dan permiso para acuñar más de este activo. Es decir, debe controlar al menos un umbral ( _threshold_) de llaves para uno de los conjuntos de mineros. 
* `txID` es el ID de la transacción
* `changeAddr` en el resultado está la dirección a la que se envió el cambio.
* `encoding` es el formato de codificación que se usará para el argumento de carga (payload). Puede ser “cb58” o “hex”. Por defecto es “cb58”.

#### **Llamada de ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.mintNFT",
    "params" :{
        "assetID":"2KGdt2HpFKpTH5CtGZjYt5XPWs6Pv9DLoRBhiFfntbezdRvZWP",
        "payload":"2EWh72jYQvEJF9NLk",
        "to":"X-avax1ap39w4a7fk0au083rrmnhc2pqk20yjt6s3gzkx",
        "from":["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Respuesta Ejemplo**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"2oGdPdfw2qcNUHeqjw8sU2hPVrFyNUTgn6A8HenDra7oLCDtja",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

### avm.export

Envía un activo no-AVAX desde la X-Chain hacia la P-Chain o C-Chain. Después de llamar este método, debes llamar [`avax.import`](contract-chain-c-chain-api.md#avax-import) en la C-Chain o P-Chain para completar la transacción.

#### **Firma**

```cpp
avm.export({
    to: string,
    amount: int,
    assetID: string,
    from: []string, //optional
    changeAddr: string, //optional
    username: string,
    password: string,
}) ->
{
    txID: string,
    changeAddr: string,
}
```

* `to` es la dirección de las cadenas P-Chain or C-Chain a la cual se enviará el activo.
* `amount` es el monto del activo a enviar.
* `assetID` es el ID del activo que se desea enviar.
* `from` son las direcciones que quieres usar par esta operación. Si se omiten, utiliza alguna de tus direcciones si se requere.
* `changeAddr` es la dirección a la cual se enviará cualquier cambio. Si se omite, el cambio será enviado a cualquier dirección controlada por el usuario.
* El activo es enviado desde una dirección controlada por el usuario (`username`)
* `txID` es el ID de la transacción.
* `changeAddr` en el resultado está la dirección a la que se envió el cambio.

#### **Llamada de ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.export",
    "params" :{
        "to":"C-avax1q9c6ltuxpsqz7ul8j0h0d0ha439qt70sr3x2m0",
        "amount": 500,
        "assetID": "2YmsQfMaCczE4mLG1DPYUnRURNGfhjj4qrqnLRR3LmZ3GxDWPt",
        "from":["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Respuesta Ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2Eu16yNaepP57XrrJgjKGpiEDandpiGWW8xbUm6wcTYny3fejj",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    },
    "id": 1
}
```

### avm.exportAVAX

Envía AVAX desde X-Chain a otra cadena. Después de llamar a este método, debes llamar a `import` en la otra cadena para completar la transferencia.

#### **Firma**

```cpp
avm.exportAVAX({
    to: string,
    amount: int,
    from: []string, //optional
    changeAddr: string, //optional
    username: string,
    password: string,
}) ->
{
    txID: string,
    changeAddr: string,
}
```

* `to` es la dirección de la P-Chain a la cual se enviará el AVAX.
* `amount` es el monto de nAVAX a enviar.
* `from` son las direcciones que quieres usar par esta operación. Si se omiten, utiliza alguna de tus direcciones si se requere
* `changeAddr` es la dirección a la cual se enviará cualquier cambio. Si se omite, el cambio será enviado a cualquier dirección controlada por el usuario.
* El activo es enviado desde una dirección controlada por el usuario (`username`)
* `txID` es el ID de la transacción
* `changeAddr` en el resultado está la dirección a la que se envió el cambio.

#### **Llamada de ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.exportAVAX",
    "params" :{
        "to":"P-avax1q9c6ltuxpsqz7ul8j0h0d0ha439qt70sr3x2m0",
        "amount": 500,
        "from":["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Respuesta Ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "25VzbNzt3gi2vkE3Kr6H9KJeSR2tXkr8FsBCm3vARnB5foLVmx",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    },
    "id": 1
}
```

### avm.exportKey

Obtén la llave privada que controla una dirección dada.
La llave privada devuelta puede ser agregada a un usuario con la llamada [`avm.importKey`](exchange-chain-x-chain-api.md#avm-importkey).

#### **Firma**

```cpp
avm.exportKey({
    username: string,
    password: string,
    address: string
}) -> {privateKey: string}
```

* `username` debe controlar la dirección en `address`.
* `privateKey` es la cadena representando la llave privada que controla la dirección `address`.

#### **Llamada de ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.exportKey",
    "params" :{
        "username":"myUsername",
        "password":"myPassword",
        "address":"X-avax1jggdngzc9l87rgurmfu0z0n0v4mxlqta0h3k6e"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Respuesta Ejemplo**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "privateKey":"PrivateKey-2w4XiXxPfQK4TypYqnohRL8DRNTz9cGiGmwQ1zmgEqD9c9KWLq"
    }
}
```

### avm.getAllBalances

Obtén los balances de todos los activos controlados por cierta dirección.

#### **Firma**

```cpp
avm.getAllBalances({address:string}) -> {
    balances: []{
        asset: string,
        balance: int
    }
}
```

#### **Llamada de ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.getAllBalances",
    "params" :{
        "address":"X-avax1c79e0dd0susp7dc8udq34jgk2yvve7haclsz5r"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Respuesta Ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "balances": [
            {
                "asset": "AVAX",
                "balance": "102"
            },
            {
                "asset": "2sdnziCz37Jov3QSNMXcFRGFJ1tgauaj6L7qfk7yUcRPfQMC79",
                "balance": "10000"
            }
        ]
    },
    "id": 1
}
```

### avm.getAssetDescription

Obtén información de un activo.

#### **Firma**

```cpp
avm.getAssetDescription({assetID: string}) -> {
    assetId: string,
    name: string,
    symbol: string,
    denomination: int
}
```

* `assetID` es el id del activo del cual se solicita información.
* `name` es el nombre humanamente-legible, no necesariamente único.
* `symbol` es el símbolo del activo.
* `denomination` determina cómo se visualizan los balances del activo en la interfaz de usuario. Si la denominación es 0, entonces 100 unidades del activo se desplegarán como 100. Si la denominación es 1, entonces 100 unidades del activo se mostrarán como 10.0. Si la denominación es 2, 100 unidades del activo se visualizarán como .100, etc.

#### **Llamada de ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getAssetDescription",
    "params" :{
        "assetID" :"2fombhL7aGPwj3KH4bfrmJwW6PVnMobf9Y2fn9GwxiAAJyFDbe"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Respuesta Ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "assetID": "2fombhL7aGPwj3KH4bfrmJwW6PVnMobf9Y2fn9GwxiAAJyFDbe",
        "name": "Avalanche",
        "symbol": "AVAX",
        "denomination": "9"
    },
    "id": 1
}`
```

### avm.getBalance

Obtén el balance de un activo controlado por una dirección.

#### **Firma**

```cpp
avm.getBalance({
    address: string,
    assetID: string
}) -> {balance: int}
```

* `address` dueño del activo.
* `assetID` id of the asset for which the balance is requested

#### **Llamada de ejemplo**

```cpp
curl -X POST --data '{
  "jsonrpc":"2.0",
  "id"     : 1,
  "method" :"avm.getBalance",
  "params" :{
      "address":"X-avax1ns3jzhqyk7parg29qan56k0fcxwstc76cjqq2s",
      "assetID": "2pYGetDWyKdHxpFxh2LHeoLNCH6H5vxxCxHQtFnnFaYxLsqtHC"
  }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Respuesta Ejemplo**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "balance":"299999999999900",
        "utxoIDs":[
            {
                "txID":"WPQdyLNqHfiEKp4zcCpayRHYDVYuh1hqs9c1RqgZXS4VPgdvo",
                "outputIndex":1
            }
        ]
    }
}
```

### avm.getTx

Regresa una transacción específica. El parámetro `encoding` establece el formato en el que se regresa la transacción. Puede ser “cb58” o “hex”. Por defecto es “cb58”.

#### **Firma**

```cpp
avm.getTx({
    txID: string,
    encoding: string, //optional
}) -> {
    tx: string,
    encoding: string,
}
```

#### **Llamada de ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getTx",
    "params" :{
        "txID":"2QouvFWUbjuySRxeX5xMbNCuAaKWfbk5FeEa2JmoF85RKLk2dD",
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Respuesta Ejemplo**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "tx":"1111111vQFqEEHkkAGwJnpdAJgga28zHk9pFARHp1VWe3QM5wC7ztGA5cZAPanFWXHkhbWEbFs9qsEpNZ7QHrzucUUZqLEPrAwJZLrZBik4dEhbsTCF3nS6s2fXVzc5ar2esLFD92WVMZmJNuTUQuKjVkjag2Gy3HHYSqm6bojrG62KrazywKPhrYx8QF9AqNfYYwD3XcSUV1g46r7sQ1WqzM8nyG4qL517JS1YVuTC3aWPeN5cxP6FdvbYexwHcgaBtiQsYbCEeZ9cuJqhE2Pxx8BJFpicLN8FBexb6fzQyBLiFR7yx6v6YBjq7dtu9MBczFdNCnDE4MsG2SyPZsdUv1XxQYVVwDqgqi8Zto5esJKph72YZbrXX3SHVSZBFZXkKbTzyEQFWHCF1jC",
        "encoding": "cb58"
    }
}
```

### avm.getTxStatus

Obtén el estado de una transacción enviada a la red.

#### **Firma**

```cpp
avm.getTxStatus({txID: string}) -> {status: string}
```

`status` puede ser cualquiera de:

* `Accepted`: La transacción es \(o será\) acceptada por cada nodo.
* `Processing`: La transacción está siendo votada por este nodo.
* `Rejected`: La transacción. no será aceptado por ningún nodo en la red.
* `Unknown`: La transacción no ha sido vista por este nodo.

#### **Llamada de ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getTxStatus",
    "params" :{
        "txID":"2QouvFWUbjuySRxeX5xMbNCuAaKWfbk5FeEa2JmoF85RKLk2dD"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Respuesta Ejemplo**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "status":"Accepted"
    }
}
```

### avm.getUTXOs

Obtén los UTXOs referenciados a cierta direccioń. Si la cadena de origen (sourceChain) es especificada, entonces recuperará los UTXO atómicos exportados de esa cadena a la Cadena X.

#### **Firma**

```cpp
avm.getUTXOs({
    addresses: []string,
    limit: int, //optional
    startIndex: { //optional
        address: string,
        utxo: string
    },
    sourceChain: string, //optional
    encoding: string //optional
}) -> {
    numFetched: int,
    utxos: []string,
    endIndex: {
        address: string,
        utxo: string
    },
    sourceChain: string, //optional
    encoding: string
}
```

* `utxos` es una lista de UTXOs tal que cada UTXO hacer referencia a al menos una dirección en `addresses`.
* A lo más un límite (`limit`) de UTXOs es devuelta. Si `limit` se omite, o es mayor a 1024, entonces será 1024.
* Este método soporta paginación. `endIndex` dentota el último UTXO devuelto. Para obtener el siguiente conjunto de UTXOs, usa el valor de `endIndex` como `startIndex` en la siguiente llamada.
* Si `startIndex` se omite, buscará todos los UTXOs hasta el límite (`limit`).
* Cuando se usa paginación \(cuando se provee un `startIndex` \), no se garantiza que los UTXOs sean únicos a lo largo de multiples llamadas. Esto es, una UTXO puede aparecer en el resultado de una primer llamada, y nuevamente en una segunda llamada.
* Cuando se usa paginación, no se garantiza la consistencia a lo largo de multiples llamadas. Esto es, el conjunto de UTXO de una dirección puede haber cambiado entre llamadas.
* `encoding` establece el formato en que se devuelven los UTXOs. Puede ser “cb58” o “hex”. Por defecto es “cb58”.

#### **Ejemplo**

Supón que deseamos todos los UTXOs que hacen referencia a al menos una de las direcciones  `X-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf` y `X-avax1x459sj0ssujguq723cljfty4jlae28evjzt7xz`.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getUTXOs",
    "params" :{
        "addresses":["X-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf", "X-avax1x459sj0ssujguq723cljfty4jlae28evjzt7xz"],
        "limit":5,
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Esto nos da la respuesta:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "numFetched": "5",
        "utxos": [
            "11PQ1sNw9tcXjVki7261souJnr1TPFrdVCu5JGZC7Shedq3a7xvnTXkBQ162qMYxoerMdwzCM2iM1wEQPwTxZbtkPASf2tWvddnsxPEYndVSxLv8PDFMwBGp6UoL35gd9MQW3UitpfmFsLnAUCSAZHWCgqft2iHKnKRQRz",
            "11RCDVNLzFT8KmriEJN7W1in6vB2cPteTZHnwaQF6kt8B2UANfUkcroi8b8ZSEXJE74LzX1mmBvtU34K6VZPNAVxzF6KfEA8RbYT7xhraioTsHqxVr2DJhZHpR3wGWdjUnRrqSSeeKGE76HTiQQ8WXoABesvs8GkhVpXMK",
            "11GxS4Kj2od4bocNWMQiQhcBEHsC3ZgBP6edTgYbGY7iiXgRVjPKQGkhX5zj4NC62ZdYR3sZAgp6nUc75RJKwcvBKm4MGjHvje7GvegYFCt4RmwRbFDDvbeMYusEnfVwvpYwQycXQdPFMe12z4SP4jXjnueernYbRtC4qL",
            "11S1AL9rxocRf2NVzQkZ6bfaWxgCYch7Bp2mgzBT6f5ru3XEMiVZM6F8DufeaVvJZnvnHWtZqocoSRZPHT5GM6qqCmdbXuuqb44oqdSMRvLphzhircmMnUbNz4TjBxcChtks3ZiVFhdkCb7kBNLbBEmtuHcDxM7MkgPjHw",
            "11Cn3i2T9SMArCmamYUBt5xhNEsrdRCYKQsANw3EqBkeThbQgAKxVJomfc2DE4ViYcPtz4tcEfja38nY7kQV7gGb3Fq5gxvbLdb4yZatwCZE7u4mrEXT3bNZy46ByU8A3JnT91uJmfrhHPV1M3NUHYbt6Q3mJ3bFM1KQjE"
        ],
        "endIndex": {
            "address": "X-avax1x459sj0ssujguq723cljfty4jlae28evjzt7xz",
            "utxo": "kbUThAUfmBXUmRgTpgD6r3nLj7rJUGho6xyht5nouNNypH45j"
        },
        "encoding": "cb58"
    },
    "id": 1
}
```

Como `numFetched` es igual que `limit`,  podemos decir que puede haber más UTXO que no fueron recuperados. Llamamos al método nuevamente, esta vez con `startIndex`:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :2,
    "method" :"avm.getUTXOs",
    "params" :{
        "addresses":["X-avax1x459sj0ssujguq723cljfty4jlae28evjzt7xz"],
        "limit":5,
        "endIndex": {
            "address": "X-avax1x459sj0ssujguq723cljfty4jlae28evjzt7xz",
            "utxo": "kbUThAUfmBXUmRgTpgD6r3nLj7rJUGho6xyht5nouNNypH45j"
        },
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Esto da la respuesta:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "numFetched": "4",
        "utxos": [
            "115ZLnNqzCsyugMY5kbLnsyP2y4se4GJBbKHjyQnbPfRBitqLaxMizsaXbDMU61fHV2MDd7fGsDnkMzsTewULi94mcjk1bfvP7aHYUG2i3XELpV9guqsCtv7m3m3Kg4Ya1m6tAWqT7PhvAaW4D3fk8W1KnXu5JTWvYBqD2",
            "11QASUuhw9M1r52maTFUZ4fnuQby9inX77VYxePQoNavEyCPuHN5cCWPQnwf8fMrydFXVMPAcS4UJAcLjSFskNEmtVPDMY4UyHwh2MChBju6Y7V8yYf3JBmYt767NPsdS3EqgufYJMowpud8fNyH1to4pAdd6A9CYbD8KG",
            "11MHPUWT8CsdrtMWstYpFR3kobsvRrLB4W8tP9kDjhjgLkCJf9aaJQM832oPcvKBsRhCCxfKdWr2UWPztRCU9HEv4qXVwRhg9fknAXzY3a9rXXPk9HmArxMHLzGzRECkXpXb2dAeqaCsZ637MPMrJeWiovgeAG8c5dAw2q",
            "11K9kKhFg75JJQUFJEGiTmbdFm7r1Uw5zsyDLDY1uVc8zo42WNbgcpscNQhyNqNPKrgtavqtRppQNXSEHnBQxEEh5KbAEcb8SxVZjSCqhNxME8UTrconBkTETSA23SjUSk8AkbTRrLz5BAqB6jo9195xNmM3WLWt7mLJ24"
        ],
        "endIndex": {
            "address": "X-avax1x459sj0ssujguq723cljfty4jlae28evjzt7xz",
            "utxo": "21jG2RfqyHUUgkTLe2tUp6ETGLriSDTW3th8JXFbPRNiSZ11jK"
        },
        "encoding": "cb58"
    },
    "id": 1
}
```

Como `numFetched` es menor que `limit`, sabemos que hemos terminado de obtener los UTXO y no es necesario volver a llamar a este método.

Supongamos que queremos recuperar los UTXO exportados de la Cadena P a la Cadena X para construir un ImportTx. Luego, necesitamos llamar a GetUTXOs con el argumento sourceChain para recuperar los UTXOs atómicos:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getUTXOs",
    "params" :{
        "addresses":["X-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf", "X-avax1x459sj0ssujguq723cljfty4jlae28evjzt7xz"],
        "limit":5,
        "sourceChain": "P",
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Esto da la respuesta:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "numFetched": "1",
        "utxos": [
            "115P1k9aSVFBfi9siZZz135jkrBCdEMZMbZ82JaLLuML37cgVMuxgu73ukQbPjXtDgyBCE1cgrJjqDPgboUswV5BGAYhnuxunkHS3xncB599V3mxyvWnwVwNPmq3mKQwF5EWhfTaXkhqE5VFr92yQBk9Nh5ekZBDSFGCSC"
        ],
        "endIndex": {
            "address": "X-avax1x459sj0ssujguq723cljfty4jlae28evjzt7xz",
            "utxo": "2Sz2XwRYqUHwPeiKoRnZ6ht88YqzAF1SQjMYZQQaB5wBFkAqST"
        },
        "encoding": "cb58"
    },
    "id": 1
}
```

### avm.import

Finaliza la transferencia de AVAX desde la P-Chain o C-Chain hacia la X-Chain. Antes de llamar a este método, debes llamar al método [`platform.exportAVAX`](platform-chain-p-chain-api.md#platform-exportavax) en la P-Chain o al  [`avax.export`](contract-chain-c-chain-api.md#avax-export) en la C-Chain para iniciar la transferencia.

#### **Firma**

```cpp
avm.import({
    to: string,
    sourceChain: string,
    username: string,
    password: string,
}) -> {txID: string}
```

* `to` es la dirección a la cual se enviará el AVAX. Esta debe ser igual al argumento `to` en la correspondiente llamada  `exportAVAX` en la P-Chain o `export` para la C-Chain.
* `sourceChain` es el ID o alias de la cadena desde la cual el AVAX está siendo importado. Para importar fondos de la C-Chain, utiliza `"C"`.
* `username` es el usuario que controla `to`.
* `txID` es el ID de la recien creada transacción atómica.

#### **Llamada de ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.import",
    "params" :{
        "to":"X-avax1s7aygrkrtxflmrlyadlhqu70a6f4a4n8l2tru8",
        "sourceChain":"C",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Respuesta Ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2gXpf4jFoMAWQ3rxBfavgFfSdLkL2eFUYprKsUQuEdB5H6Jo1H"
    },
    "id": 1
}
```

### avm.importAVAX

Finaliza una transferencia de AVAX desde la P-Chain hacia la X-Chain. Before this method is called, you must call the P-Chain’s [`platform.exportAVAX`](platform-chain-p-chain-api.md#platform-exportavax) method to initiate the transfer.

#### **Firma**

```cpp
avm.importAVAX({
    to: string,
    sourceChain: string,
    username: string,
    password: string,
}) -> {txID: string}
```

* `to` is the address the AVAX is sent to. This must be the same as the `to` argument in the corresponding call to the P-Chain’s `exportAVAX`.
* `sourceChain` is the ID or alias of the chain the AVAX is being imported from. To import funds from the P-Chain, use `"P"`.
* `username` is the user that controls `to`.

#### **Llamada de ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.importAVAX",
    "params" :{
        "to":"X-avax1s7aygrkrtxflmrlyadlhqu70a6f4a4n8l2tru8",
        "sourceChain":"P",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Respuesta Ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "MqEaeWc4rfkw9fhRMuMTN7KUTNpFmh9Fd7KSre1ZqTsTQG73h"
    },
    "id": 1
}
```

### avm.importKey

Give a user control over an address by providing the private key that controls the address.

#### **Firma**

```cpp
avm.importKey({
    username: string,
    password: string,
    privateKey: string
}) -> {address: string}
```

* Add `privateKey` to `username`‘s set of private keys. `address` is the address `username` now controls with the private key.

#### **Llamada de ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.importKey",
    "params" :{
        "username":"myUsername",
        "password":"myPassword",
        "privateKey":"PrivateKey-2w4XiXxPfQK4TypYqnohRL8DRNTz9cGiGmwQ1zmgEqD9c9KWLq"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Respuesta Ejemplo**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "address":"X-avax1mwlnrzv0ezdycx4qhqj77j55cwgcvtf29zvmpy"
    }
}
```

### avm.issueTx

Send a signed transaction to the network. `encoding` specifies the format of the signed transaction. Can be either “cb58” or “hex”. Defaults to “cb58”.

#### **Firma**

```cpp
avm.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {
    txID: string
}
```

#### **Llamada de ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.issueTx",
    "params" :{
        "tx":"6sTENqXfk3gahxkJbEPsmX9eJTEFZRSRw83cRJqoHWBiaeAhVbz9QV4i6SLd6Dek4eLsojeR8FbT3arFtsGz9ycpHFaWHLX69edJPEmj2tPApsEqsFd7wDVp7fFxkG6HmySR",
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Respuesta Ejemplo**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"NUPLwbt2hsYxpQg4H2o451hmTWQ4JZx2zMzM4SinwtHgAdX1JLPHXvWSXEnpecStLj"
    }
}
```

### avm.listAddresses

List addresses controlled by the given user.

#### **Firma**

```cpp
avm.listAddresses({
    username: string,
    password: string
}) -> {addresses: []string}
```

#### **Llamada de ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "avm.listAddresses",
    "params": {
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Respuesta Ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "addresses": ["X-avax1rt4vac58crp0p59yf640c4gycm6creg2rt8hc6"]
    },
    "id": 1
}
```

### avm.send

Send a quantity of an asset to an address.

#### **Firma**

```cpp
avm.send({
    amount: int,
    assetID: string,
    to: string,
    memo: string, //optional
    from: []string, //optional
    changeAddr: string, //optional
    username: string,
    password: string
}) -> {txID: string, changeAddr: string}
```

* Sends `amount` units of asset with ID `assetID` to address `to`. `amount` is denominated in the smallest increment of the asset. For AVAX this is 1 nAVAX \(one billionth of 1 AVAX.\)
* `to` is the X-Chain address the asset is sent to.
* `from` are the addresses that you want to use for this operation. If omitted, uses any of your addresses as needed.
* `changeAddr` is the address any change will be sent to. If omitted, change is sent to one of the addresses controlled by the user.
* You can attach a `memo`, whose length can be up to 256 bytes.
* The asset is sent from addresses controlled by user `username`. \(Of course, that user will need to hold at least the balance of the asset being sent.\)

#### **Llamada de ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.send",
    "params" :{
        "assetID"   : "AVAX",
        "amount"    : 10000,
        "to"        : "X-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf",
        "from"      : ["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "memo"      : "hi, mom!",
        "username"  : "userThatControlsAtLeast10000OfThisAsset",
        "password"  : "myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Respuesta Ejemplo**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"2iXSVLPNVdnFqn65rRvLrsu8WneTFqBJRMqkBJx5vZTwAQb8c1",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

### avm.sendMultiple

Sends multiple transfers of `amount` of `assetID`, to a specified address from a list of owned addresses.

#### **Firma**

```cpp
avm.sendMultiple({
    outputs: []{
      assetID: string,
      amount: int,
      to: string
    },
    from: []string, //optional
    changeAddr: string, //optional
    memo: string, //optional
    username: string,
    password: string
}) -> {txID: string, changeAddr: string}
```

* `outputs` is an array of object literals which each contain an `assetID`, `amount` and `to`.
* `memo` is an optional message, whose length can be up to 256 bytes.
* `from` are the addresses that you want to use for this operation. If omitted, uses any of your addresses as needed.
* `changeAddr` is the address any change will be sent to. If omitted, change is sent to one of the addresses controlled by the user.
* The asset is sent from addresses controlled by user `username`. \(Of course, that user will need to hold at least the balance of the asset being sent.\)

#### **Llamada de ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.sendMultiple",
    "params" :{
        "outputs": [
            {
                "assetID" : "AVAX",
                "to"      : "X-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf",
                "amount"  : 1000000000
            },
            {
                "assetID" : "26aqSTpZuWDAVtRmo44fjCx4zW6PDEx3zy9Qtp2ts1MuMFn9FB",
                "to"      : "X-avax18knvhxx8uhc0mwlgrfyzjcm2wrd6e60w37xrjq",
                "amount"  : 10
            }
        ],
        "memo"      : "hi, mom!",
        "from"      : ["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username"  : "username",
        "password"  : "myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Respuesta Ejemplo**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"2iXSVLPNVdnFqn65rRvLrsu8WneTFqBJRMqkBJx5vZTwAQb8c1",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

### avm.sendNFT

Send a non-fungible token.

#### **Firma**

```cpp
avm.sendNFT({
    assetID: string,
    groupID: number,
    to: string,
    from: []string, //optional
    changeAddr: string, //optional
    username: string,
    password: string
}) -> {txID: string}
```

* `assetID` is the asset ID of the NFT being sent.
* `groupID` is the NFT group from which to send the NFT. NFT creation allows multiple groups under each NFT ID. You can issue multiple NFTs to each group.
* `to` is the X-Chain address the NFT is sent to.
* `from` are the addresses that you want to use for this operation. If omitted, uses any of your addresses as needed. `changeAddr` is the address any change will be sent to. If omitted, change is sent to one of the addresses controlled by the user.
* The asset is sent from addresses controlled by user `username`. \(Of course, that user will need to hold at least the balance of the NFT being sent.\)

#### **Llamada de ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.sendNFT",
    "params" :{
        "assetID"   : "2KGdt2HpFKpTH5CtGZjYt5XPWs6Pv9DLoRBhiFfntbezdRvZWP",
        "groupID"   : 0,
        "to"        : "X-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf",
        "from"      : ["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username"  : "myUsername",
        "password"  : "myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Respuesta Ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "DoR2UtG1Trd3Q8gWXVevNxD666Q3DPqSFmBSMPQ9dWTV8Qtuy",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    },
    "id": 1
}
```

### wallet.issueTx

Send a signed transaction to the network and assume the tx will be accepted. `encoding` specifies the format of the signed transaction. Can be either “cb58” or “hex”. Defaults to “cb58”.

This call is made to the wallet API endpoint:

`/ext/bc/X/wallet`

#### Firma

```cpp
wallet.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {
    txID: string
}
```

#### Llamada de ejemplo

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"wallet.issueTx",
    "params" :{
        "tx":"6sTENqXfk3gahxkJbEPsmX9eJTEFZRSRw83cRJqoHWBiaeAhVbz9QV4i6SLd6Dek4eLsojeR8FbT3arFtsGz9ycpHFaWHLX69edJPEmj2tPApsEqsFd7wDVp7fFxkG6HmySR",
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X/wallet
```

#### Respuesta Ejemplo

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"NUPLwbt2hsYxpQg4H2o451hmTWQ4JZx2zMzM4SinwtHgAdX1JLPHXvWSXEnpecStLj"
    }
}
```

### wallet.send

Send a quantity of an asset to an address and assume the tx will be accepted so that future calls can use the modified UTXO set.

This call is made to the wallet API endpoint:

`/ext/bc/X/wallet`

#### **Firma**

```cpp
wallet.send({
    amount: int,
    assetID: string,
    to: string,
    memo: string, //optional
    from: []string, //optional
    changeAddr: string, //optional
    username: string,
    password: string
}) -> {txID: string, changeAddr: string}
```

* Sends `amount` units of asset with ID `assetID` to address `to`. `amount` is denominated in the smallest increment of the asset. For AVAX this is 1 nAVAX \(one billionth of 1 AVAX.\)
* `to` is the X-Chain address the asset is sent to.
* `from` are the addresses that you want to use for this operation. If omitted, uses any of your addresses as needed.
* `changeAddr` is the address any change will be sent to. If omitted, change is sent to one of the addresses controlled by the user.
* You can attach a `memo`, whose length can be up to 256 bytes.
* The asset is sent from addresses controlled by user `username`. \(Of course, that user will need to hold at least the balance of the asset being sent.\)

#### **Llamada de ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"wallet.send",
    "params" :{
        "assetID"   : "AVAX",
        "amount"    : 10000,
        "to"        : "X-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf",
        "memo"      : "hi, mom!",
        "from"      : ["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username"  : "userThatControlsAtLeast10000OfThisAsset",
        "password"  : "myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X/wallet
```

#### **Respuesta Ejemplo**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"2iXSVLPNVdnFqn65rRvLrsu8WneTFqBJRMqkBJx5vZTwAQb8c1",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

### wallet.sendMultiple

Send multiple transfers of `amount` of `assetID`, to a specified address from a list of owned of addresses and assume the tx will be accepted so that future calls can use the modified UTXO set.

This call is made to the wallet API endpoint:

`/ext/bc/X/wallet`

#### **Firma**

```cpp
wallet.sendMultiple({
    outputs: []{
      assetID: string,
      amount: int,
      to: string
    },
    from: []string, //optional
    changeAddr: string, //optional
    memo: string, //optional
    username: string,
    password: string
}) -> {txID: string, changeAddr: string}
```

* `outputs` is an array of object literals which each contain an `assetID`, `amount` and `to`.
* `from` are the addresses that you want to use for this operation. If omitted, uses any of your addresses as needed.
* `changeAddr` is the address any change will be sent to. If omitted, change is sent to one of the addresses controlled by the user.
* You can attach a `memo`, whose length can be up to 256 bytes.
* The asset is sent from addresses controlled by user `username`. \(Of course, that user will need to hold at least the balance of the asset being sent.\)

#### **Llamada de ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"wallet.sendMultiple",
    "params" :{
        "outputs": [
            {
                "assetID" : "AVAX",
                "to"      : "X-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf",
                "amount"  : 1000000000
            },
            {
                "assetID" : "26aqSTpZuWDAVtRmo44fjCx4zW6PDEx3zy9Qtp2ts1MuMFn9FB",
                "to"      : "X-avax18knvhxx8uhc0mwlgrfyzjcm2wrd6e60w37xrjq",
                "amount"  : 10
            }
        ],
        "memo"      : "hi, mom!",
        "from"      : ["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username"  : "username",
        "password"  : "myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X/wallet
```

#### **Respuesta Ejemplo**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"2iXSVLPNVdnFqn65rRvLrsu8WneTFqBJRMqkBJx5vZTwAQb8c1",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

<!--stackedit_data:
eyJoaXN0b3J5IjpbNTUzNTcxODE5LDE4MzU0MjAyOTAsLTE1Mj
MwOTgxMzgsLTE2NDg5MjAxNzcsMTExODgzMzk2MCwtMTgyNzEz
NDM4MiwtNzM3MjgwMjQ0LDE5ODg4NTIyNDEsLTk1MTg3NjYzMy
wtMTAyODY2Mjc4OCwxMDc0OTY2Njc2LDIwMDMzMjIwNSwtMTcw
MzUxMzE2NSwtMTkyMzU2OTQ3NSwxNzI0MDQ5NjI1LC0yMzU3OT
MxNDMsLTExMzQzMTMzMDEsLTM1MTI5NTY4MSwtMTk5NTQ2NzQ2
MCwxNjAwMTQwNDQ1XX0=
-->