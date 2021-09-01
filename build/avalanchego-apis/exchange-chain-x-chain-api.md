---
description: La X-Chain es una instancia de la máquina virtual de Avalanche \(AVM\)
---

# API de la Cadena de intercambio \(X-Chain\)

La [X-Chain](../../learn/platform-overview/#exchange-chain-x-chain), la plataforma nativa de Avalanche para crear e intercambiar activos, es una instancia de la máquina virtual de Avalanche \(AVM\). Esta API permite a los clientes crear e intercambiar activos en la X-Chain y otras instancias de la AVM.

{% embed url="https://www.youtube.com/watch?v=rD-IOd1nvFo" caption="" %}

## Format

Esta API utiliza el formato `json 2.0`RPC. Para más información sobre la realización de llamadas RPC, mira [aquí](issuing-api-calls.md).

## Endpoints / Extremos

`/ext/bc/X`para interactuar con la X-Chain.

`/ext/bc/blockchainID`para interactuar con otras instancias de AVM, donde `blockchainID`está el ID de una blockchain que ejecuta la AVM.

## Metodos

### avm.buildGenesis

Dada una representación JSON del estado génesis de esta Máquina Virtual, crea la representación en byte de este estado.

#### **Endpoint**

Esta llamada al extremo estático del API de la AVM:

`/ext/vm/avm`

Nota: las direcciones no deben incluir el prefijo de la cadena \(ie. X-\) en las llamadas al extremo estático de la API, porque estos prefijos hacen referencia a una cadena en específico.

#### **Firma**

```cpp
avm.buildGenesis({
    networkID: int,
    genesisData: JSON,
    encoding: string, //optional
}) -> {
    bytes: string,
    encoding: string,
}
```

La codificación especifica el formato de codificación para usar para bytes arbitrarios ie. Los bytes de génesis que se are Puede ser "cb58" o "hex". Por defecto es "cb58".

`genesisData`tiene este formulario:

```cpp
{
"genesisData" :
    {
        "assetAlias1": {               // Each object defines an asset
            "name": "human readable name",
            "symbol":"AVAL",           // Symbol is between 0 and 4 characters
            "initialState": {
                "fixedCap" : [         // Choose the asset type.
                    {                  // Can be "fixedCap", "variableCap", "limitedTransfer", "nonFungible"
                        "amount":1000, // At genesis, address A has
                        "address":"A"  // 1000 units of asset
                    },
                    {
                        "amount":5000, // At genesis, address B has
                        "address":"B"  // 1000 units of asset
                    },
                    ...                // Can have many initial holders
                ]
            }
        },
        "assetAliasCanBeAnythingUnique": { // Asset alias can be used in place of assetID in calls
            "name": "human readable name", // names need not be unique
            "symbol": "AVAL",              // symbols need not be unique
            "initialState": {
                "variableCap" : [          // No units of the asset exist at genesis
                    {
                        "minters": [       // The signature of A or B can mint more of
                            "A",           // the asset.
                            "B"
                        ],
                        "threshold":1
                    },
                    {
                        "minters": [       // The signatures of 2 of A, B and C can mint
                            "A",           // more of the asset
                            "B",
                            "C"
                        ],
                        "threshold":2
                    },
                    ...                    // Can have many minter sets
                ]
            }
        },
        ...                                // Can list more assets
    }
}
```

#### **Llamada de ejemplo**

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

#### **Respuesta de ejemplo**

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

Crea una nueva dirección controlada por el usuario dado.

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

#### **Respuesta de ejemplo**

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
    denomination: int, //optional
    initialHolders: []{
        address: string,
        amount: int
    },
    from: []string, //optional
    changeAddr: string, //optional
    username: string,
    password: string
}) ->
{
    assetID: string,
    changeAddr: string
}
```

* `name`es un nombre de lectura humana para el activo. No necesariamente único.
* `symbol`es un símbolo de corta duración para el activo. Entre 0 y 4 caracteres. No necesariamente único. Puede ser omitido.
* `denomination`determina cómo los saldos de este activo se muestran por interfaces de usuario. Si `denomination`es 0, 100 unidades de este activo se muestran como 100. Si `denomination`es 1, 100 unidades de este activo se muestran como 10.0. Si es 2, 100 unidades de este activo se muestran como 1.00, etc. `denomination`Defaults a 0.
* `from`son las direcciones que quieres usar para esta operación. Si se omite, usa cualquiera de tus direcciones según sea necesario.
* `changeAddr`es la dirección a la que se enviará cualquier cambio Si se omite, el cambio se envía a una de las direcciones controladas por el usuario.
* `username`y `password`denota al usuario que paga la tarifa de transacción.
* Cada elemento en `initialHolders`especifica que `address`contiene `amount`unidades del activo en la génesis.
* `assetID`es el ID de un nuevo activo.

#### **Llamada de ejemplo**

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

#### **Respuesta de ejemplo**

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

Unidades de acuñación de un activo de límite variable creado con [`avm.createVariableCapAsset`](exchange-chain-x-chain-api.md#avm-createvariablecapasset).

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

* `amount`unidades de se crearán y `assetID`controlarán por dirección .`to`
* `from`son las direcciones que quieres usar para esta operación. Si se omite, usa cualquiera de tus direcciones según sea necesario.
* `changeAddr`es la dirección a la que se enviará cualquier cambio Si se omite, el cambio se envía a una de las direcciones controladas por el usuario.
* `username`es el usuario que paga la tarifa de transacción. `username`Debe mantener las claves que le dan permiso de acuñar más de este activo. Es decir, debe controlar al menos las _claves de _umbral para uno de los juegos de minter.
* `txID`es el ID de esta transacción.
* `changeAddr`en el resultado es la dirección donde se envió cualquier cambio.

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

#### **Respuesta de ejemplo**

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

Crea un nuevo activo fungible con capital variable. No existen unidades del activo al iniciar. `avm.mint`Minters pueden acuñar unidades de este activo usando

{% page-ref page="../tutorials/smart-digital-assets/creating-a-variable-cap-asset.md" %}

#### **Firma**

```cpp
avm.createVariableCapAsset({
    name: string,
    symbol: string,
    denomination: int, //optional
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

* `name`es un nombre de lectura humana para el activo. No necesariamente único.
* `symbol`es un símbolo de corta duración para el activo. Entre 0 y 4 caracteres. No necesariamente único. Puede ser omitido.
* `denomination`determina cómo los saldos de este activo se muestran por interfaces de usuario. Si la denominación es 0, 100 unidades de este activo se muestran como 100. Si la denominación es 1, 100 unidades de este activo se muestran como 10.0. Si la denominación es 2, 100 unidades de este activo se muestran como .100, etc.
* `minterSets`es una lista donde cada elemento especifica la de las direcciones en que `minters`acuñan más del activo al firmar una transacción `threshold`de acuñación.
* `from`son las direcciones que quieres usar para esta operación. Si se omite, usa cualquiera de tus direcciones según sea necesario.
* `changeAddr`es la dirección a la que se enviará cualquier cambio Si se omite, el cambio se envía a una de las direcciones controladas por el usuario.
* `username`paga la tarifa de transacción.
* `assetID`es el ID de un nuevo activo.
* `changeAddr`en el resultado es la dirección donde se envió cualquier cambio.

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

#### **Respuesta de ejemplo**

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

Crea un nuevo activo no-fungible. No existen unidades del activo al iniciar. `avm.mintNFT`Minters pueden acuñar unidades de este activo usando

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

* `name`es un nombre de lectura humana para el activo. No necesariamente único.
* `symbol`es un símbolo de corta duración para el activo. Entre 0 y 4 caracteres. No necesariamente único. Puede ser omitido.
* `minterSets`es una lista donde cada elemento especifica la de las direcciones en que `minters`acuñan más del activo al firmar una transacción `threshold`de acuñación.
* `from`son las direcciones que quieres usar para esta operación. Si se omite, usa cualquiera de tus direcciones según sea necesario.
* `changeAddr`es la dirección a la que se enviará cualquier cambio Si se omite, el cambio se envía a una de las direcciones controladas por el usuario.
* `username`paga la tarifa de transacción.
* `assetID`es el ID de un nuevo activo.
* `changeAddr`en el resultado es la dirección donde se envió cualquier cambio.

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

#### **Respuesta de ejemplo**

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

Tokens no fungibles creados con [`avm.createNFTAsset`](exchange-chain-x-chain-api.md#avm-createnftasset).

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

* `assetID`es el assetID del nuevo activo NFT.
* `payload`es una carga útil arbitraria de hasta 1024 bytes. Su formato de codificación se especifica en el `encoding`argumento.
* `from`son las direcciones que quieres usar para esta operación. Si se omite, usa cualquiera de tus direcciones según sea necesario.
* `changeAddr`es la dirección a la que se enviará cualquier cambio Si se omite, el cambio se envía a una de las direcciones controladas por el usuario.
* `username`es el usuario que paga la tarifa de transacción. `username`Debe mantener las claves que le dan permiso de acuñar más de este activo. Es decir, debe controlar al menos las _claves de _umbral para uno de los juegos de minter.
* `txID`es el ID de esta transacción.
* `changeAddr`en el resultado es la dirección donde se envió cualquier cambio.
* `encoding`es el formato de codificación para usar para el argumento de carga útil. Puede ser "cb58" o "hex". Por defecto es "cb58".

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

#### **Respuesta de ejemplo**

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

Envía un activo no-AVAX desde la X-Chain hacia la P-Chain o C-Chain. Después de llamar a este método, debes llamar [`avax.import`](contract-chain-c-chain-api.md#avax-import)a la C-Chain para completar la transferencia.

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

* `to`es la dirección de P-Chain o C-Chain al que se envía el activo.
* `amount`es la cantidad del activo a enviar.
* `assetID`es el ID de activo del activo que se envia.
* `from`son las direcciones que quieres usar para esta operación. Si se omite, usa cualquiera de tus direcciones según sea necesario.
* `changeAddr`es la dirección a la que se enviará cualquier cambio Si se omite, el cambio se envía a una de las direcciones controladas por el usuario.
* El activo se envía de direcciones controladas por`username`
* `txID`es el ID de esta transacción.
* `changeAddr`en el resultado es la dirección donde se envió cualquier cambio.

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

#### **Respuesta de ejemplo**

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

Envía AVAX desde X-Chain a otra cadena. Después de llamar a este método, debes llamar `import`a la otra cadena para completar la transferencia.

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

* `to`es la dirección de P-Chain a la que se envía AVAX.
* `amount`es la cantidad de nAVAX para enviar.
* `from`son las direcciones que quieres usar para esta operación. Si se omite, usa cualquiera de tus direcciones según sea necesario.
* `changeAddr`es la dirección a la que se enviará cualquier cambio Si se omite, el cambio se envía a una de las direcciones controladas por el usuario.
* La AVAX se envía de direcciones controladas por`username`
* `txID`es el ID de esta transacción.
* `changeAddr`en el resultado es la dirección donde se envió cualquier cambio.

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

#### **Respuesta de ejemplo**

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

Obtén la clave privada que controla una dirección dada.   [`avm.importKey`](exchange-chain-x-chain-api.md#avm-importkey)Se puede agregar a un usuario con .

#### **Firma**

```cpp
avm.exportKey({
    username: string,
    password: string,
    address: string
}) -> {privateKey: string}
```

* `username`debe controlar`address`
* `privateKey`es la representación de cuerda de la clave privada que controla.`address`

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

#### **Respuesta de ejemplo**

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
        "address":"X-avax1c79e0dd0susp7dc8udq34jgk2yvve7hapvdyht"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Respuesta de ejemplo**

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

* `assetID`es el id del activo para el que se solicita la información.
* `name`es el nombre humano del activo, no necesariamente único.
* `symbol`es el símbolo del activo.
* `denomination`determina cómo los saldos de este activo se muestran por interfaces de usuario. Si la denominación es 0, 100 unidades de este activo se muestran como 100. Si la denominación es 1, 100 unidades de este activo se muestran como 10.0. Si la denominación es 2, 100 unidades de este activo se muestran como .100, etc.

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

#### **Respuesta de ejemplo**

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

* `address`propietario de el activo
* `assetID`id del activo para el que se solicita el saldo

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

#### **Respuesta de ejemplo**

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

### avm.getAddressTxs<a id="avm-get-address-txs-api"></a>

Devuelve todas las transacciones que cambian el saldo de la dirección dada. Se dice que una transacción cambia el saldo de una dirección si cualquiera es verdad:

* Una UTXO que consume la transacción fue al menos parcialmente propiedad de la dirección.
* Una UTXO que produce la transacción es al menos parcialmente propiedad de la dirección.

Nota: La indización `index-transactions`\(\) debe ser habilitada en la configuración de la X-chain.

#### **Firma**

```cpp
avm.getAddressTxs({
    address: string,
    cursor: uint64,     // optional, leave empty to get the first page
    assetID: string,
    pageSize: uint64    // optional, defaults to 1024
}) -> {
    txIDs: []string,
    cursor: uint64,
}
```

**Solicitar parámetros**

* `address`: La dirección para la que estamos buscando transacciones relacionadas
* `assetID`: Solo transacciones de retorno que cambiaron el saldo de este activo. Debe ser un ID o un alias para un activo.
* `pageSize`: Número de elementos a regresar por página. Opcional. Por defecto a 1024.

**Parámetros de respuesta**

* `txIDs`: Lista de ID de transacción que afectaron el saldo de esta dirección.
* `cursor`: Número de página o offset. Usa esto en solicitud para obtener la siguiente página.

#### **Llamada de ejemplo**

```cpp
curl -X POST --data '{
  "jsonrpc":"2.0",
  "id"     : 1,
  "method" :"avm.getAddressTxs",
  "params" :{
      "address":"X-local1kpprmfpzzm5lxyene32f6lr7j0aj7gxsu6hp9y",
      "assetID":"AVAX",
      "pageSize":20
  }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txIDs": [
            "SsJF7KKwxiUJkczygwmgLqo3XVRotmpKP8rMp74cpLuNLfwf6"
        ],
        "cursor": "1"
    },
    "id": 1
}
```

### avm.getTx

Regresa una transacción específica. El `encoding`parámetro establece el formato de la transacción devuelva. Puede `"cb58"`ser, `"hex"`o`"json"` Por defecto es "cb58".

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

#### **Respuesta de ejemplo**

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

`status`es uno de los siguientes:

* `Accepted`: La transacción es \(o será\) aceptada por cada nodo
* `Processing`: La transacción está siendo votada por este nodo
* `Rejected`: La transacción nunca será aceptada por ningún nodo en la red
* `Unknown`: La transacción no ha sido vista por este nodo

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

#### **Respuesta de ejemplo**

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

Obtiene los UTXOs con referencia a cierta dirección. Si la cadena de origen \(sourceChain\) es especificada, entonces recuperará los UTXO atómicos exportados de esa cadena a la Cadena X.

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

* `utxos`es una lista de UTXOs de tal manera que cada UTXO hace referencia al menos una dirección en .`addresses`
* En la mayoría de los `limit`UTXOs Si `limit`se omite o supera 1024, se establece en 1024.
* Este método admite la paginación. `endIndex`Denomina la última UTXO devuelve. Para obtener el siguiente conjunto de UTXOs, usa el valor de `endIndex`como `startIndex`en la siguiente llamada.
* Si `startIndex`se omite el proceso, buscará todas las UTXOs hasta .`limit`
* Cuando utiliza la paginación \(cuando se `startIndex`proporciona\), las UTXO no están garantizadas como únicas en varias llamadas. Es decir, puede aparecer un UTXO en el resultado de la primera llamada y luego nuevamente en la segunda llamada.
* Cuando se utiliza la paginación, no se garantiza la consistencia en varias llamadas. Es decir, el conjunto UTXO de direcciones puede haber cambiado entre llamadas.
* `encoding`establece el formato para los UTXOs devueltos Puede ser "cb58" o "hex". Por defecto es "cb58".

#### **Ejemplo**

Supongamos que queremos todas las UTXOs esa referencia al menos una de `X-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf`y .`X-avax1x459sj0ssujguq723cljfty4jlae28evjzt7xz`

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

`limit`Dado que `numFetched`es lo mismo que , podemos decir que puede haber más UTXOs que no fueron perseguidos. Llamamos al método de nuevo, esta vez con `startIndex`:

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

Esto nos da la respuesta:

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

Ya que `numFetched`es menos que , sabemos que hemos terminado de buscar UTXOs y no `limit`necesitamos llamar de nuevo este método.

Supongamos que queremos recuperar los UTXO exportados de la Cadena P a la Cadena X para construir un ImportTx. Luego, necesitamos llamar a GetUTXOs con el argumento sourceChain para recuperar los UTXO atómicos:

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

Esto nos da la respuesta:

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

Finaliza la transferencia de AVAX desde la P-Chain o C-Chain hacia la X-Chain. Antes de que se llame a este método, debes llamar al [`avax.export`](contract-chain-c-chain-api.md#avax-export)método de la P-Chain’s [`platform.exportAVAX`](platform-chain-p-chain-api.md#platform-exportavax)o de la C-Chain, para iniciar la transferencia.

#### **Firma**

```cpp
avm.import({
    to: string,
    sourceChain: string,
    username: string,
    password: string,
}) -> {txID: string}
```

* `to`es la dirección a la que se envía AVAX. Este debe ser el mismo que el `to`argumento en la llamada correspondiente a la llamada de la P-Chain’s `exportAVAX`o C-Chain.`export`
* `sourceChain`es el ID o alias de la cadena de la cual la AVAX está siendo importada. `"C"`Para importar fondos de la C-Chain, usa
* `username`es el usuario que controla`to`
* `txID`es el ID de la transacción atómica recientemente creada.

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

#### **Respuesta de ejemplo**

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

Finaliza una transferencia de AVAX desde la P-Chain hacia la X-Chain. Antes de que se llame a este método, debes llamar el [`platform.exportAVAX`](platform-chain-p-chain-api.md#platform-exportavax)método de la P-Chain’s iniciar la transferencia.

#### **Firma**

```cpp
avm.importAVAX({
    to: string,
    sourceChain: string,
    username: string,
    password: string,
}) -> {txID: string}
```

* `to`es la dirección a la que se envía AVAX. Este debe ser el mismo que el `to`argumento en la llamada correspondiente a la llamada P-Chain.`exportAVAX`
* `sourceChain`es el ID o alias de la cadena de la cual la AVAX está siendo importada. `"P"`Para importar fondos de la P-Chain, usa
* `username`es el usuario que controla`to`

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

#### **Respuesta de ejemplo**

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

Otorga a un usuario control sobre una dirección proporcionando la llave privada que controla la dirección.

#### **Firma**

```cpp
avm.importKey({
    username: string,
    password: string,
    privateKey: string
}) -> {address: string}
```

* `username`Añadir `privateKey`al conjunto de claves privadas. `address`es la dirección `username`ahora controla con la llave privada.

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

#### **Respuesta de ejemplo**

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

Envía una transacción firmada a la red. `encoding`Especifica el formato de la transacción firmada. Puede ser "cb58" o "hex". Por defecto es "cb58".

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

#### **Respuesta de ejemplo**

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

Lista de direcciones controladas por un usuario dado.

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

#### **Respuesta de ejemplo**

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

Envía una cantidad de un activo a una dirección.

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

* Envía `amount`unidades de activo con ID `assetID`para dirigir. `to`Se `amount`denominan en el incremento más pequeño del activo. Para AVAX esto es 1 nAVAX \(una mil millonesima parte de 1 AVAX.\)
* `to`es la dirección de X-Chain a la que se envía el activo.
* `from`son las direcciones que quieres usar para esta operación. Si se omite, usa cualquiera de tus direcciones según sea necesario.
* `changeAddr`es la dirección a la que se enviará cualquier cambio Si se omite, el cambio se envía a una de las direcciones controladas por el usuario.
* `memo`Puedes adjuntar una longitud que puede ser de hasta 256 bytes.
* El activo se envía de direcciones controladas por el usuario `username`. \(Claro, ese usuario deberá mantener al menos el saldo del activo que se envía.\)

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

#### **Respuesta de ejemplo**

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

Envía varias transferencias de `amount`, `assetID`a una dirección especificada de una lista de direcciones propietarias.

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

* `outputs`es una matriz de literales de objeto que cada uno contiene una , `assetID``amount`y .`to`
* `memo`es un mensaje opcional, cuya longitud puede ser de hasta 256 bytes.
* `from`son las direcciones que quieres usar para esta operación. Si se omite, usa cualquiera de tus direcciones según sea necesario.
* `changeAddr`es la dirección a la que se enviará cualquier cambio Si se omite, el cambio se envía a una de las direcciones controladas por el usuario.
* El activo se envía de direcciones controladas por el usuario `username`. \(Claro, ese usuario deberá mantener al menos el saldo del activo que se envía.\)

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

#### **Respuesta de ejemplo**

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

Envía un token no fungible \(NFT\)

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

* `assetID`es el ID de activo de la NFT que se envia.
* `groupID`es el grupo NFT desde el que enviar el NFT. La creación de NFT permite múltiples grupos con un ID de NFT único. Puedes emitir multiples NFTs a cada grupo.
* `to`es la dirección de X-Chain a la que se envía NFT.
* `from`son las direcciones que quieres usar para esta operación. Si se omiten, usa cualquiera de tus direcciones según sea necesario. `changeAddr`es la dirección a la que se enviará cualquier cambio Si se omite, el cambio se envía a una de las direcciones controladas por el usuario.
* El activo se envía de direcciones controladas por el usuario `username`. \(Por supuesto, ese usuario deberá mantener al menos el saldo del NFT que se envía.\)

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

#### **Respuesta de ejemplo**

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

Envía una transacción firmada a la red y asuma que la tx será aceptada. `encoding`Especifica el formato de la transacción firmada. Puede ser "cb58" o "hex". Por defecto es "cb58".

Esta llamada se realiza al extremo de la API de la wallet:

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

#### Llamada de Ejemplo

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

#### Respuesta ejemplo

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

Envía una cantidad de un activo a una dirección y asume que la tx será aceptada para que futuras llamadas puedan usar el conjunto UTXO modificado.

Esta llamada se realiza al extremo de la API de la wallet:

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

* Envía `amount`unidades de activo con ID `assetID`para dirigir. `to`Se `amount`denominan en el incremento más pequeño del activo. Para AVAX esto es 1 nAVAX \(una mil millonesima parte de 1 AVAX.\)
* `to`es la dirección de X-Chain a la que se envía el activo.
* `from`son las direcciones que quieres usar para esta operación. Si se omite, usa cualquiera de tus direcciones según sea necesario.
* `changeAddr`es la dirección a la que se enviará cualquier cambio Si se omite, el cambio se envía a una de las direcciones controladas por el usuario.
* `memo`Puedes adjuntar una longitud que puede ser de hasta 256 bytes.
* El activo se envía de direcciones controladas por el usuario `username`. \(Claro, ese usuario deberá mantener al menos el saldo del activo que se envía.\)

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

#### **Respuesta de ejemplo**

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

Envía varias transferencias de , a una dirección específica de una lista de direcciones propiedad y `assetID`asuma que la tx será aceptada de modo que las llamadas futuras puedan usar el conjunto `amount`de UTX modificado.

Esta llamada se realiza al extremo de la API de la wallet:

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

* `outputs`es una matriz de literales de objeto que cada uno contiene una , `assetID``amount`y .`to`
* `from`son las direcciones que quieres usar para esta operación. Si se omite, usa cualquiera de tus direcciones según sea necesario.
* `changeAddr`es la dirección a la que se enviará cualquier cambio Si se omite, el cambio se envía a una de las direcciones controladas por el usuario.
* `memo`Puedes adjuntar una longitud que puede ser de hasta 256 bytes.
* El activo se envía de direcciones controladas por el usuario `username`. \(Claro, ese usuario deberá mantener al menos el saldo del activo que se envía.\)

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

#### **Respuesta de ejemplo**

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

### eventos

Escuchar las transacciones en una dirección especificada.

Esta llamada se hace al extremo de la API de eventos:

`/ext/bc/X/events`

#### **Golang Ejemplo**

```go
package main

import (
    "encoding/json"
    "log"
    "net"
    "net/http"
    "sync"

    "github.com/ava-labs/avalanchego/api"
    "github.com/ava-labs/avalanchego/pubsub"
    "github.com/gorilla/websocket"
)

func main() {
    dialer := websocket.Dialer{
        NetDial: func(netw, addr string) (net.Conn, error) {
            return net.Dial(netw, addr)
        },
    }

    httpHeader := http.Header{}
    conn, _, err := dialer.Dial("ws://localhost:9650/ext/bc/X/events", httpHeader)
    if err != nil {
        panic(err)
    }

    waitGroup := &sync.WaitGroup{}
    waitGroup.Add(1)

    readMsg := func() {
        defer waitGroup.Done()

        for {
            mt, msg, err := conn.ReadMessage()
            if err != nil {
                log.Println(err)
                return
            }
            switch mt {
            case websocket.TextMessage:
                log.Println(string(msg))
            default:
                log.Println(mt, string(msg))
            }
        }
    }

    go readMsg()

    cmd := &pubsub.Command{NewSet: &pubsub.NewSet{}}
    cmdmsg, err := json.Marshal(cmd)
    if err != nil {
        panic(err)
    }
    err = conn.WriteMessage(websocket.TextMessage, cmdmsg)
    if err != nil {
        panic(err)
    }

    var addresses []string
    addresses = append(addresses, " X-fuji....")
    cmd = &pubsub.Command{AddAddresses: &pubsub.AddAddresses{JSONAddresses: api.JSONAddresses{Addresses: addresses}}}
    cmdmsg, err = json.Marshal(cmd)
    if err != nil {
        panic(err)
    }

    err = conn.WriteMessage(websocket.TextMessage, cmdmsg)
    if err != nil {
        panic(err)
    }

    waitGroup.Wait()
}
```

**Operaciones**

| Command | Descripción | Ejemplo | Argumentos |
| :--- | :--- | :--- | :--- |
| **Newset** | Crea un nuevo mapa de direcciones | {"newSet":{}} |  |
| **NewBloom** | Crea un nuevo conjunto de floración. | {"newBloom"}} | maxElements - el número de elementos en filtro debe ser > 0 collisionProb - la probabilidad de colisión permitida debe ser > 0 y <= 1 |
| **AddAddresses** | añadir una dirección al conjunto | {"addAddresses":{"addresses":["X-fuji..."]}} | direcciones - lista de direcciones para coincidir |

Llamar a **NewSet **o **NewBloom **reestablece el filtro, y debe ser seguido con ****Addresses.** Las AddAddresses se **pueden llamar varias veces.

**Establecer detalles**

* **NewSet **realiza partidos de dirección absolutos, si la dirección está en el conjunto de que te enviarán la transacción.
* **El [filtrado](https://en.wikipedia.org/wiki/Bloom_filter) de **NewBloom puede producir falsos positivos, pero puede permitir que un mayor número de direcciones se filtren Si las direcciones están en el filtro, te enviarán la transacción.

#### **Respuesta de ejemplo**

```cpp
2021/05/11 15:59:35 {"txID":"22HWKHrREyXyAiDnVmGp3TQQ79tHSSVxA9h26VfDEzoxvwveyk"}
```

