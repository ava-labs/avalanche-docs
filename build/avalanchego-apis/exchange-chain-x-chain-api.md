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
    encoding: string, //optional
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
                        "minters": [       // la firma de A o B pueden minar más de
                            "A",           // los activos.
                            "B"
                        ],
                        "threshold":1
                    },
                    {
                        "minters": [       // Las firmas de 2 de A, B y C pueden minar
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

* `amount` unidades del `assetID` will be created and controlled by address `to`.
* `from` are the addresses that you want to use for this operation. If omitted, uses any of your addresses as needed.
* `changeAddr` is the address any change will be sent to. If omitted, change is sent to one of the addresses controlled by the user.
* `username` is the user that pays the transaction fee. `username` must hold keys giving it permission to mint more of this asset. That is, it must control at least _threshold_ keys for one of the minter sets.
* `txID` is this transaction’s ID.
* `changeAddr` in the result is the address where any change was sent.

#### **Example Call**

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

#### **Example Response**

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

Create a new variable-cap, fungible asset. No units of the asset exist at initialization. Minters can mint units of this asset using `avm.mint`.

{% page-ref page="../tutorials/smart-digital-assets/creating-a-variable-cap-asset.md" %}

#### **Signature**

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

* `name` is a human-readable name for the asset. Not necessarily unique.
* `symbol` is a shorthand symbol for the asset. Between 0 and 4 characters. Not necessarily unique. May be omitted.
* `denomination` determines how balances of this asset are displayed by user interfaces. If denomination is 0, 100 units of this asset are displayed as 100. If denomination is 1, 100 units of this asset are displayed as 10.0. If denomination is 2, 100 units of this asset are displays as .100, etc.
* `minterSets` is a list where each element specifies that `threshold` of the addresses in `minters` may together mint more of the asset by signing a minting transaction.
* `from` are the addresses that you want to use for this operation. If omitted, uses any of your addresses as needed.
* `changeAddr` is the address any change will be sent to. If omitted, change is sent to one of the addresses controlled by the user.
* `username` pays the transaction fee.
* `assetID` is the ID of the new asset.
* `changeAddr` in the result is the address where any change was sent.

#### **Example Call**

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

#### **Example Response**

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

Create a new non-fungible asset. No units of the asset exist at initialization. Minters can mint units of this asset using `avm.mintNFT`.

{% page-ref page="../tutorials/smart-digital-assets/creating-a-nft-part-1.md" %}

#### **Signature**

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

* `name` is a human-readable name for the asset. Not necessarily unique.
* `symbol` is a shorthand symbol for the asset. Between 0 and 4 characters. Not necessarily unique. May be omitted.
* `minterSets` is a list where each element specifies that `threshold` of the addresses in `minters` may together mint more of the asset by signing a minting transaction.
* `from` are the addresses that you want to use for this operation. If omitted, uses any of your addresses as needed.
* `changeAddr` is the address any change will be sent to. If omitted, change is sent to one of the addresses controlled by the user.
* `username` pays the transaction fee.
* `assetID` is the ID of the new asset.
* `changeAddr` in the result is the address where any change was sent.

#### **Example Call**

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

#### **Example Response**

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

Mint non-fungible tokens which were created with [`avm.createNFTAsset`](exchange-chain-x-chain-api.md#avm-createnftasset).

{% page-ref page="../tutorials/smart-digital-assets/creating-a-nft-part-1.md" %}

#### **Signature**

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

* `assetID` is the assetID of the newly created NFT asset.
* `payload` is an arbitrary payload of up to 1024 bytes. Its encoding format is specified by the `encoding` argument.
* `from` are the addresses that you want to use for this operation. If omitted, uses any of your addresses as needed.
* `changeAddr` is the address any change will be sent to. If omitted, change is sent to one of the addresses controlled by the user.
* `username` is the user that pays the transaction fee. `username` must hold keys giving it permission to mint more of this asset. That is, it must control at least _threshold_ keys for one of the minter sets.
* `txID` is this transaction’s ID.
* `changeAddr` in the result is the address where any change was sent.
* `encoding` is the encoding format to use for the payload argument. Can be either “cb58” or “hex”. Defaults to “cb58”.

#### **Example Call**

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

#### **Example Response**

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

Send a non-AVAX from the X-Chain to the P-Chain or C-Chain. After calling this method, you must call [`avax.import`](contract-chain-c-chain-api.md#avax-import) on the C-Chain to complete the transfer.

#### **Signature**

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

* `to` is the P-Chain or C-Chain address the asset is sent to.
* `amount` is the amount of the asset to send.
* `assetID` is the asset id of the asset which is sent.
* `from` are the addresses that you want to use for this operation. If omitted, uses any of your addresses as needed.
* `changeAddr` is the address any change will be sent to. If omitted, change is sent to one of the addresses controlled by the user.
* The asset is sent from addresses controlled by `username`
* `txID` is this transaction’s ID.
* `changeAddr` in the result is the address where any change was sent.

#### **Example Call**

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

#### **Example Response**

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

Send AVAX from the X-Chain to another chain. After calling this method, you must call `import` on the other chain to complete the transfer.

#### **Signature**

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

* `to` is the P-Chain address the AVAX is sent to.
* `amount` is the amount of nAVAX to send.
* `from` are the addresses that you want to use for this operation. If omitted, uses any of your addresses as needed.
* `changeAddr` is the address any change will be sent to. If omitted, change is sent to one of the addresses controlled by the user.
* The AVAX is sent from addresses controlled by `username`
* `txID` is this transaction’s ID.
* `changeAddr` in the result is the address where any change was sent.

#### **Example Call**

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

#### **Example Response**

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

Get the private key that controls a given address.  
The returned private key can be added to a user with [`avm.importKey`](exchange-chain-x-chain-api.md#avm-importkey).

#### **Signature**

```cpp
avm.exportKey({
    username: string,
    password: string,
    address: string
}) -> {privateKey: string}
```

* `username` must control `address`.
* `privateKey` is the string representation of the private key that controls `address`.

#### **Example Call**

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

#### **Example Response**

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

Get the balances of all assets controlled by a given address.

#### **Signature**

```cpp
avm.getAllBalances({address:string}) -> {
    balances: []{
        asset: string,
        balance: int
    }
}
```

#### **Example Call**

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

#### **Example Response**

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

Get information about an asset.

#### **Signature**

```cpp
avm.getAssetDescription({assetID: string}) -> {
    assetId: string,
    name: string,
    symbol: string,
    denomination: int
}
```

* `assetID` is the id of the asset for which the information is requested.
* `name` is the asset’s human-readable, not necessarily unique name.
* `symbol` is the asset’s symbol.
* `denomination` determines how balances of this asset are displayed by user interfaces. If denomination is 0, 100 units of this asset are displayed as 100. If denomination is 1, 100 units of this asset are displayed as 10.0. If denomination is 2, 100 units of this asset are displays as .100, etc.

#### **Example Call**

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

#### **Example Response**

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

Get the balance of an asset controlled by a given address.

#### **Signature**

```cpp
avm.getBalance({
    address: string,
    assetID: string
}) -> {balance: int}
```

* `address` owner of the asset
* `assetID` id of the asset for which the balance is requested

#### **Example Call**

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

#### **Example Response**

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

Returns the specified transaction. The `encoding` parameter sets the format of the returned transaction. Can be either “cb58” or “hex”. Defaults to “cb58”.

#### **Signature**

```cpp
avm.getTx({
    txID: string,
    encoding: string, //optional
}) -> {
    tx: string,
    encoding: string,
}
```

#### **Example Call**

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

#### **Example Response**

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

Get the status of a transaction sent to the network.

#### **Signature**

```cpp
avm.getTxStatus({txID: string}) -> {status: string}
```

`status` is one of:

* `Accepted`: The transaction is \(or will be\) accepted by every node
* `Processing`: The transaction is being voted on by this node
* `Rejected`: The transaction will never be accepted by any node in the network
* `Unknown`: The transaction hasn’t been seen by this node

#### **Example Call**

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

#### **Example Response**

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

Gets the UTXOs that reference a given address. If sourceChain is specified, then it will retrieve the atomic UTXOs exported from that chain to the X Chain.

#### **Signature**

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

* `utxos` is a list of UTXOs such that each UTXO references at least one address in `addresses`.
* At most `limit` UTXOs are returned. If `limit` is omitted or greater than 1024, it is set to 1024.
* This method supports pagination. `endIndex` denotes the last UTXO returned. To get the next set of UTXOs, use the value of `endIndex` as `startIndex` in the next call.
* If `startIndex` is omitted, will fetch all UTXOs up to `limit`.
* When using pagination \(when `startIndex` is provided\), UTXOs are not guaranteed to be unique across multiple calls. That is, a UTXO may appear in the result of the first call, and then again in the second call.
* When using pagination, consistency is not guaranteed across multiple calls. That is, the UTXO set of the addresses may have changed between calls.
* `encoding` sets the format for the returned UTXOs. Can be either “cb58” or “hex”. Defaults to “cb58”.

#### **Example**

Suppose we want all UTXOs that reference at least one of `X-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf` and `X-avax1x459sj0ssujguq723cljfty4jlae28evjzt7xz`.

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

This gives response:

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

Since `numFetched` is the same as `limit`, we can tell that there may be more UTXOs that were not fetched. We call the method again, this time with `startIndex`:

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

This gives response:

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

Since `numFetched` is less than `limit`, we know that we are done fetching UTXOs and don’t need to call this method again.

Suppose we want to fetch the UTXOs exported from the P Chain to the X Chain in order to build an ImportTx. Then we need to call GetUTXOs with the sourceChain argument in order to retrieve the atomic UTXOs:

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

This gives response:

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

Finalize a transfer of AVAX from the P-Chain or C-Chain to the X-Chain. Before this method is called, you must call the P-Chain’s [`platform.exportAVAX`](platform-chain-p-chain-api.md#platform-exportavax) or C-Chain’s [`avax.export`](contract-chain-c-chain-api.md#avax-export) method to initiate the transfer.

#### **Signature**

```cpp
avm.import({
    to: string,
    sourceChain: string,
    username: string,
    password: string,
}) -> {txID: string}
```

* `to` is the address the AVAX is sent to. This must be the same as the `to` argument in the corresponding call to the P-Chain’s `exportAVAX` or C-Chain's `export`.
* `sourceChain` is the ID or alias of the chain the AVAX is being imported from. To import funds from the C-Chain, use `"C"`.
* `username` is the user that controls `to`.
* `txID` is the ID of the newly created atomic transaction.

#### **Example Call**

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

#### **Example Response**

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

Finalize a transfer of AVAX from the P-Chain to the X-Chain. Before this method is called, you must call the P-Chain’s [`platform.exportAVAX`](platform-chain-p-chain-api.md#platform-exportavax) method to initiate the transfer.

#### **Signature**

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

#### **Example Call**

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

#### **Example Response**

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

#### **Signature**

```cpp
avm.importKey({
    username: string,
    password: string,
    privateKey: string
}) -> {address: string}
```

* Add `privateKey` to `username`‘s set of private keys. `address` is the address `username` now controls with the private key.

#### **Example Call**

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

#### **Example Response**

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

#### **Signature**

```cpp
avm.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {
    txID: string
}
```

#### **Example Call**

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

#### **Example Response**

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

#### **Signature**

```cpp
avm.listAddresses({
    username: string,
    password: string
}) -> {addresses: []string}
```

#### **Example Call**

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

#### **Example Response**

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

#### **Signature**

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

#### **Example Call**

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

#### **Example Response**

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

#### **Signature**

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

#### **Example Call**

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

#### **Example Response**

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

#### **Signature**

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

#### **Example Call**

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

#### **Example Response**

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

#### Signature

```cpp
wallet.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {
    txID: string
}
```

#### Example call

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

#### Example response

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

#### **Signature**

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

#### **Example Call**

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

#### **Example Response**

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

#### **Signature**

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

#### **Example Call**

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

#### **Example Response**

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
eyJoaXN0b3J5IjpbMzQ2MzI5NDQ0LDYzODM2NTgxOCwtMTA0OD
A0MTI3MiwtOTgwOTYxOTg0LC00NDU4Mzc2OSwtOTgxNDU4NjM2
LDEyMzg0MzYxODNdfQ==
-->