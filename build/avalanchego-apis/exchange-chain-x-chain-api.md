---
description: La X-Chain est une instance de la machine virtuelle d'Avalanche \(AVM\)
---

# API de la chaîne d'échange \(X-Chain\)

La [X-Chain](../../learn/platform-overview/#exchange-chain-x-chain), la plateforme native d'Avalanche pour créer et échanger des actifs, est une instance de la machine virtuelle Avalanche \(AVM\). Cette API permet aux clients de créer et d'échanger des actifs sur la X-Chain et d'autres instances de l'AVM.

{% embed url="https://www.youtube.com/watch?v=rD-IOd1nvFo" caption="" %}

## Format

Cette API utilise le `json 2.0` format RPC. Pour plus d'informations sur les appels JSON RPC, voir [ici](issuing-api-calls.md).

## Points de terminaison

`/ext/bc/X` pour interagir avec la X-Chain.

`/ext/bc/blockchainID` pour interagir avec d'autres instances d'AVM, où `blockchainID` est l'ID d'une blockchain qui exécute l'AVM.

## Méthodes

### avm.buildGenesis

Donné une représentation JSON de l'état de genèse de cette machine virtuelle, créez la représentation en octets de cet état.

#### **Point de terminaison**

Cet appel est effectué au point de terminaison statique de l'API de l'AVM :

`/ext/vm/avm`

Remarque : les adresses ne doivent pas inclure de préfixe de la chaîne \(c.-à-d. X-\) dans les appels au point de terminaison de l'API statique parce que ces préfixes font référence à une chaîne spécifique.

#### **Signature**

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

Coder spécifie le format de codage à utiliser pour les octets arbitraires, c.-à-d. les octets de genèse qui sont retournés. Peut être « cb58 » ou « hex ». Par défaut à « cb58 ».

`genesisData` a cette forme :

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

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Créez une nouvelle adresse contrôlée par l'utilisateur donné.

#### **Signature**

```cpp
avm.createAddress({
    username: string,
    password: string
}) -> {address: string}
```

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Créez un nouvel actif fongible à capitalisation fixe. Une quantité est créée lors de l'initialisation, puis il n'y en a plus jamais. L'actif peut être envoyé avec `avm.send`.

{% page-ref page="../tutorials/smart-digital-assets/create-a-fix-cap-asset.md" %}

#### **Signature**

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

* `name`est un nom lisible par l'homme pour l'actif. Pas nécessairement unique.
* `symbol`est un symbole abrégé de l'actif. Entre 0 et 4 caractères. Pas nécessairement unique. Peut être omis.
* `denomination`détermine la manière dont les soldes de cet actif sont affichés par les interfaces utilisateur. Si `denomination` est 0, 100 unités de cet actif sont affichées comme 100. Si `denomination` est 1, 100 unités de cet actif sont affichées comme 10.0. Si  `denomination`est 2, 100 unités de cet actif sont affichées sous forme de 1.00, etc. Par défaut à 0.
* `from` sont les adresses que vous souhaitez utiliser pour cette opération. En cas d'omission, utilisez l'une de vos adresses au besoin.
* `changeAddr` l'adresse à laquelle tout changement sera envoyé. En cas d'omission, la modification est envoyée à l'une des adresses contrôlées par l'utilisateur.
* `username` et `password` désignent l'utilisateur qui paie les frais de transaction.
* Chaque élément de `initialHolders` spécifie que `address` contient `amount` unités de l'actif à l'origine.
* `assetID` est l'ID du nouvel actif.

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Frappez les unités d'un actif à capitalisation variable créé avec [`avm.createVariableCapAsset`](exchange-chain-x-chain-api.md#avm-createvariablecapasset).

#### **Signature**

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

* `amount` unités de `assetID` seront créés et contrôlés par l'adresse `to`.
* `from` sont les adresses que vous souhaitez utiliser pour cette opération. En cas d'omission, utilisez l'une de vos adresses au besoin.
* `changeAddr` l'adresse à laquelle tout changement sera envoyé. En cas d'omission, la modification est envoyée à l'une des adresses contrôlées par l'utilisateur.
* `username` est l'utilisateur qui paie les frais de transaction. `username` doit détenir des clés lui donnant la permission de frapper plus de cet actif. C'est-à-dire qu'il doit contrôler au moins les clés _de seuil_ pour l'un des ensembles de minters.
* `txID` est l'ID de cette transaction.
* `changeAddr` dans le résultat est l'adresse à laquelle tout changement a été envoyé.

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Créez un nouvel actif fongible à capitalisation variable. Aucune unité de l'actif n'existe lors de l'initialisation. Les minters peuvent frapper les unités de cet actif en utilisant `avm.mint`.

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

* `name`est un nom lisible par l'homme pour l'actif. Pas nécessairement unique.
* `symbol`est un symbole abrégé de l'actif. Entre 0 et 4 caractères. Pas nécessairement unique. Peut être omis.
* `denomination`détermine la manière dont les soldes de cet actif sont affichés par les interfaces utilisateur. Si la dénomination est 0, 100 unités de cet actif sont affichées comme 100. Si la dénomination est 1, 100 unités de cet actif sont affichées comme 10,0. Si la dénomination est 2, 100 unités de cet actif sont affichées sous la forme .100, etc.
* `minterSets` est une liste où chaque élément spécifie que `threshold` des adresses dans `minters` peut ensemble frapper plus de pièces de l'actif en signant une transaction de frappe.
* `from` sont les adresses que vous souhaitez utiliser pour cette opération. En cas d'omission, utilisez l'une de vos adresses au besoin.
* `changeAddr` l'adresse à laquelle tout changement sera envoyé. En cas d'omission, la modification est envoyée à l'une des adresses contrôlées par l'utilisateur.
* `username`paie les frais de transaction.
* `assetID` est l'ID du nouvel actif.
* `changeAddr` dans le résultat est l'adresse à laquelle tout changement a été envoyé.

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Créez un nouvel actif non fongible. Aucune unité de l'actif n'existe lors de l'initialisation. Les minters peuvent frapper les unités de cet actif en utilisant `avm.mintNFT`.

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

* `name`est un nom lisible par l'homme pour l'actif. Pas nécessairement unique.
* `symbol`est un symbole abrégé de l'actif. Entre 0 et 4 caractères. Pas nécessairement unique. Peut être omis.
* `minterSets` est une liste où chaque élément spécifie que `threshold` des adresses dans `minters` peut ensemble frapper plus de pièces de l'actif en signant une transaction de frappe.
* `from` sont les adresses que vous souhaitez utiliser pour cette opération. En cas d'omission, utilisez l'une de vos adresses au besoin.
* `changeAddr` l'adresse à laquelle tout changement sera envoyé. En cas d'omission, la modification est envoyée à l'une des adresses contrôlées par l'utilisateur.
* `username`paie les frais de transaction.
* `assetID` est l'ID du nouvel actif.
* `changeAddr` dans le résultat est l'adresse à laquelle tout changement a été envoyé.

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Frappez des [`avm.createNFTAsset`](exchange-chain-x-chain-api.md#avm-createnftasset)jetons non fongibles qui ont été créés avec .

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

* `assetID`est l'identifiant de l'actif NFT nouvellement créé.
* `payload` est une charge utile arbitraire d'un maximum de 1024 octets. Son format de codage est spécifié par l'`encoding`argument .
* `from` sont les adresses que vous souhaitez utiliser pour cette opération. En cas d'omission, utilisez l'une de vos adresses au besoin.
* `changeAddr` l'adresse à laquelle tout changement sera envoyé. En cas d'omission, la modification est envoyée à l'une des adresses contrôlées par l'utilisateur.
* `username` est l'utilisateur qui paie les frais de transaction. `username` doit détenir des clés lui donnant la permission de frapper plus de cet actif. C'est-à-dire qu'il doit contrôler au moins les clés _de seuil_ pour l'un des ensembles de minters.
* `txID` est l'ID de cette transaction.
* `changeAddr` dans le résultat est l'adresse à laquelle tout changement a été envoyé.
* `encoding` est le format de codage à utiliser pour l'argument de charge utile. Peut être « cb58 » ou « hex ». Par défaut à « cb58 ».

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Envoyez un actif de la X-Chain à la P-Chain ou à la C-Chain. Après avoir appelé cette méthode, vous devez appeler [le de la C-Chain`avax.import`](contract-chain-c-chain-api.md#avax-import)  ou le [de`avax.importAVAX`](platform-chain-p-chain-api.md#avax-importAVAX) la P-Chain  pour terminer le transfert.

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

* `to` est l'adresse P-Chain ou C-Chain à laquelle l'actif est envoyé.
* `amount` est le montant de l'actif à envoyer.
* `assetID` est l'ID de l'actif qui est envoyé. Utilisez  `AVAX`pour les exportations AVAX.
* `from` sont les adresses que vous souhaitez utiliser pour cette opération. En cas d'omission, utilisez l'une de vos adresses au besoin.
* `changeAddr` l'adresse à laquelle tout changement sera envoyé. En cas d'omission, la modification est envoyée à l'une des adresses contrôlées par l'utilisateur.
* L'actif est envoyé à partir d'adresses contrôlées par`username`
* `password` est le mot de passe de `username`.

* `txID` est l'ID de cette transaction.
* `changeAddr` dans le résultat est l'adresse à laquelle tout changement a été envoyé.

#### **Exemple d'appel**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.export",
    "params" :{
        "to":"C-avax1q9c6ltuxpsqz7ul8j0h0d0ha439qt70sr3x2m0",
        "amount": 10,
        "assetID": "AVAX",
        "from":["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Exemple de réponse**

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

### avm.exportKey

Obtenez la clé privée qui contrôle une adresse donnée. La clé privée renvoyée peut être ajoutée à un utilisateur avec [`avm.importKey`](exchange-chain-x-chain-api.md#avm-importkey).

#### **Signature**

```cpp
avm.exportKey({
    username: string,
    password: string,
    address: string
}) -> {privateKey: string}
```

* `username` doit contrôler `address`.
* `privateKey` est la représentation de la chaîne hexadécimale de la clé privée qui contrôle `address`.

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Obtenez les soldes de tous les actifs contrôlés par une adresse donnée.

#### **Signature**

```cpp
avm.getAllBalances({address:string}) -> {
    balances: []{
        asset: string,
        balance: int
    }
}
```

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Obtenez des informations sur un actif.

#### **Signature**

```cpp
avm.getAssetDescription({assetID: string}) -> {
    assetId: string,
    name: string,
    symbol: string,
    denomination: int
}
```

* `assetID` est l'id de l'actif pour lequel les informations sont demandées.
* `name` est le nom lisible par l'homme et non nécessairement unique.
* `symbol` est le symbole de l'actif.
* `denomination`détermine la manière dont les soldes de cet actif sont affichés par les interfaces utilisateur. Si la dénomination est 0, 100 unités de cet actif sont affichées comme 100. Si la dénomination est 1, 100 unités de cet actif sont affichées comme 10,0. Si la dénomination est 2, 100 unités de cet actif sont affichées sous la forme .100, etc.

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Obtenez le solde d'un actif contrôlé par une adresse donnée.

#### **Signature**

```cpp
avm.getBalance({
    address: string,
    assetID: string
}) -> {balance: int}
```

* `address`propriétaire de l'actif
* `assetID`id de l'actif pour lequel le solde est demandé

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Retourne toutes les transactions qui changent le solde de l'adresse donnée. On dit qu'une transaction modifie le solde d'une adresse si l'un ou l'autre est vrai :

* Une UTXO que la transaction consomme était au moins partiellement détenue par l'adresse.
* Une UTXO que la transaction produit est au moins partiellement détenue par l'adresse.

Remarque : l'indexation \(`index-transactions`\) doit être activée dans la configuration de la X-Chain.

#### **Signature**

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

**Paramètres de demande**

* `address`: l'adresse pour laquelle nous récupérons les transactions liées
* `assetID`: ne retournent que les transactions qui ont changé le solde de cet actif. Doit être une ID ou une alias pour un actif.
* `pageSize`: nombre d'articles à retourner par page. Facultatif. Par défaut à 1024.

**Paramètres de réponse**

* `txIDs`: liste des ID de transaction qui ont affecté le solde de cette adresse.
* `cursor`: numéro de la page ou offset. Utilisez cette demande pour obtenir la page suivante.

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Retourne la transaction spécifiée. Le paramètre  `encoding` définit le format de la transaction retournée. Peut être `"cb58"`,  `"hex"`ou `"json"`. Par défaut à « cb58 ».

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

#### **Exemple d'appel**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getTx",
    "params" :{
        "txID":"KMcVWV1dJAuWQXfrJgNFFr9uPHqXELQNZoFWoosYVqQV5qGj5",
        "encoding": "json"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **Exemple de réponse**

```json
{
    "jsonrpc": "2.0",
    "result": {
        "tx": {
            "unsignedTx": {
                "networkID": 1,
                "blockchainID": "2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM",
                "outputs": [
                    {
                        "assetID": "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z",
                        "fxID": "spdxUxVJQbX85MGxMHbKw1sHxMnSqJ3QBzDyDYEP3h6TLuxqQ",
                        "output": {
                            "addresses": [
                                "X-avax126rd3w35xwkmj8670zvf7y5r8k36qa9z9803wm"
                            ],
                            "amount": 1530084210,
                            "locktime": 0,
                            "threshold": 1
                        }
                    }
                ],
                "inputs": [],
                "memo": "0x",
                "sourceChain": "11111111111111111111111111111111LpoYY",
                "importedInputs": [
                    {
                        "txID": "28jfD1CViCz7CKawJBzmHCQRWtk6xwzcBjCVErH6dBo11JLvmw",
                        "outputIndex": 0,
                        "assetID": "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z",
                        "fxID": "spdxUxVJQbX85MGxMHbKw1sHxMnSqJ3QBzDyDYEP3h6TLuxqQ",
                        "input": {
                            "amount": 1531084210,
                            "signatureIndices": [
                                0
                            ]
                        }
                    }
                ]
            },
            "credentials": [
                {
                    "fxID": "spdxUxVJQbX85MGxMHbKw1sHxMnSqJ3QBzDyDYEP3h6TLuxqQ",
                    "credential": {
                        "signatures": [
                            "0x447ea3c6725add24e240b3179f9cc28ab5410c48f822d32d12459861ca816765297dbfe07e1957e3b470d39e6f56f10269dd7f8c4e108857db874b2c4ba1a22401"
                        ]
                    }
                }
            ]
        },
        "encoding": "json"
    },
    "id": 1
}
```

où :

* `credentials`est une liste des références de cette transaction. Chaque référence prouve que le créateur de cette transaction est autorisé à consommer l'une des entrées de cette transaction. Chaque référence est une liste de signatures.
* `unsignedTx` est la partie sans signature de la transaction.
* `networkID`est l'ID du réseau sur lequel cette transaction est effectuée. \(Avalanche Mainnet est `1`.\)
* `blockchainID`est l'ID de la blockchain sur laquelle cette transaction est effectuée. \(Avalanche Mainnet X-Chain est `2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM`.\)
* Chaque élément de  `outputs`est une sortie \(UTXO\) de cette transaction qui n'est pas exportée vers une autre chaîne.
* Chaque élément de  est une entrée de cette transaction qui `inputs`n'a pas été importée d'une autre chaîne.
* Les transactions d'importation ont des champs supplémentaires  `sourceChain`et , qui `importedInputs`spécifient l'ID de la blockchain à partir duquel les actifs sont importés, et les entrées qui sont importées.
* Les transactions d'exportation ont des champs supplémentaires  `destinationChain`et , qui spécifient l'ID de la blockchain vers laquelle les actifs sont `exportedOutputs`exportés, et les UTXOs qui sont exportés.

Une sortie contient :

* `assetID`: l'ID de l'actif transféré. \(L'ID Mainnet Avax est `FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z`.\)
* `fxID`: l'ID de la FX que cette sortie utilise.
* `output`: le contenu spécifique à la FX de cette sortie.

La plupart des sorties utilisent la FX secp256k1, ressemble à ceci :

```json
{
    "assetID": "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z",
    "fxID": "spdxUxVJQbX85MGxMHbKw1sHxMnSqJ3QBzDyDYEP3h6TLuxqQ",
    "output": {
        "addresses": [
            "X-avax126rd3w35xwkmj8670zvf7y5r8k36qa9z9803wm"
        ],
        "amount": 1530084210,
        "locktime": 0,
        "threshold": 1
    }
}
```

La sortie ci-dessus peut être consommée après le temps Unix  `locktime`par une transaction qui a des signatures de  `threshold`des adresses dans `addresses`.

### avm.getTxStatus

Obtenez l'état d'une transaction envoyée au réseau.

### avm.getTxStatus

Obtenez l'état d'une transaction envoyée au réseau.

#### **Signature**

```cpp
avm.getTxStatus({txID: string}) -> {status: string}
```

`status` est l'une des :

* `Accepted`: la transaction est \(ou sera\) acceptée par chaque nœud
* `Processing`: la transaction est en cours de vote par ce noeud
* `Rejected`: la transaction ne sera jamais acceptée par un nœud dans le réseau
* `Unknown`: la transaction n'a pas été vue par ce nœud.

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Obtient les UTXO qui font référence à une adresse donnée. Si sourceChain est spécifiée, elle récupérera les UTXO atomiques exportées de cette chaîne vers la X-Chain.

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

* `utxos` est une liste d'UTXO de sorte que chaque UTXO référence au moins une adresse dans `addresses`.
* Au plus `limit` UTXO sont retournées. Si `limit` est omise ou supérieure à 1024, elle est définie à 1024.
*  Cette méthode prend en charge la pagination.  `endIndex`désigne la dernière UTXO renvoyée. Pour obtenir le jeu suivant d'UTXO, utilisez la valeur de `endIndex` comme `startIndex` dans le prochain appel.
* Si `startIndex` est omise, elle récupérera toutes les UTXO jusqu'à `limit`.
* Lors de l'utilisation de la pagination \(c'est-à-dire quand  `startIndex`est fournie\), les UTXO peuvent ne pas être uniques sur plusieurs appels. C'est-à-dire, une UTXO peut apparaître dans le résultat du premier appel, puis à nouveau dans le deuxième appel.
* Lors de l'utilisation de la pagination, la cohérence n'est pas garantie sur plusieurs appels. C'est-à-dire, l'ensemble d'UTXO des adresses peut avoir changé entre les appels.
* `encoding` définit le format des UTXO retournées. Peut être « cb58 » ou « hex ». Par défaut à « cb58 ».

#### **Exemple**

Supposons que nous voulons que toutes les UTXO qui référencent au moins une de `X-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf` et `X-avax1x459sj0ssujguq723cljfty4jlae28evjzt7xz`.

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

Cela donne la réponse :

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

Puisque `numFetched` est identique à `limit`, nous pouvons dire qu'il y a peut-être plus d'UTXO qui n'ont pas été récupérées. Nous appelons à nouveau la méthode, cette fois avec `startIndex`:

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

Cela donne la réponse :

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

Puisque  `numFetched`est inférieure à `limit`, nous savons que nous avons fini de récupérer les UTXO et n'avons pas besoin de rappeler cette méthode à nouveau.

Supposons que nous voulons récupérer les UTXO exportées de la P Chain vers la X Chain afin de créer une ImportTx. Nous devons ensuite appeler GetUTXOs avec l'argument sourceChain pour récupérer les UTXO atomiques :

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

Cela donne la réponse :

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

Finalisez un transfert d'un actif de la P-Chain ou C-Chain vers la X-Chain. Avant que cette méthode ne soit appelé, vous devez appeler la méthode de la P-Chain [`platform.exportAVAX`](platform-chain-p-chain-api.md#platform-exportavax) ou C-Chain [`avax.export`](contract-chain-c-chain-api.md#avax-export) pour commencer le transfert.

#### **Signature**

```cpp
avm.import({
    to: string,
    sourceChain: string,
    username: string,
    password: string,
}) -> {txID: string}
```

* `to` est l'adresse à laquelle l'AVAX est envoyée. Elle doit être identique à l'argument `to`dans l'appel correspondant à la P-Chain `exportAVAX` ou C-Chain `export`.
* `sourceChain` est l'ID ou les alias de la chaîne à partir de laquelle AVAX est importée. Pour importer des fonds de la C-Chain, utilisez `"C"`.
* `username` est l'utilisateur qui contrôle `to`.
* `txID` est l'ID de la transaction atomique nouvellement créée.

#### **Exemple d'appel**

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

#### **Exemple de réponse**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2gXpf4jFoMAWQ3rxBfavgFfSdLkL2eFUYprKsUQuEdB5H6Jo1H"
    },
    "id": 1
}
```

### avm.importKey

Donnez à un utilisateur le contrôle d'une adresse en lui fournissant la clé privée qui contrôle l'adresse.

#### **Signature**

```cpp
avm.importKey({
    username: string,
    password: string,
    privateKey: string
}) -> {address: string}
```

* Ajoutez `privateKey` à l'ensemble de `username` des clés privées. `address` est l'adresse  `username` qui contrôle maintenant avec la clé privée.

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Envoyez une transaction signée au réseau. `encoding` indique le format de la transaction signée. Peut être « cb58 » ou « hex ». Par défaut à « cb58 ».

#### **Signature**

```cpp
avm.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {
    txID: string
}
```

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Listez les adresses que l'utilisateur donné contrôle.

#### **Signature**

```cpp
avm.listAddresses({
    username: string,
    password: string
}) -> {addresses: []string}
```

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Envoyez une quantité d'un actif à une adresse.

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

* Envoie `amount` unités d'actif avec l'ID `assetID` à l'adresse `to`. `amount` est libellé dans le plus petit incrément de l'actif. Pour AVAX, c'est 1 nAVAX \(un milliardième de 1 AVAX\).
* `to` est l'adresse de la X-Chain à laquelle l'actif est envoyé.
* `from` sont les adresses que vous souhaitez utiliser pour cette opération. En cas d'omission, utilisez l'une de vos adresses au besoin.
* `changeAddr` l'adresse à laquelle tout changement sera envoyé. En cas d'omission, la modification est envoyée à l'une des adresses contrôlées par l'utilisateur.
* Vous pouvez joindre un `memo`, dont la longueur peut aller jusqu'à 256 octets.
* L'actif est envoyé à partir d'adresses contrôlées par un utilisateur `username`. \(Bien sûr, cet utilisateur devra détenir au moins le solde de l'actif envoyé.\)

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Envoie plusieurs transferts de  `amount`de `assetID`, à une adresse spécifiée à partir d'une liste d'adresses propriétaires.

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

* `outputs` est un tableau de littéraux d'objets qui contiennent chacun un `assetID`, `amount` et `to`.
* `memo` est un message facultatif, dont la longueur peut aller jusqu'à 256 octets.
* `from` sont les adresses que vous souhaitez utiliser pour cette opération. En cas d'omission, utilisez l'une de vos adresses au besoin.
* `changeAddr` l'adresse à laquelle tout changement sera envoyé. En cas d'omission, la modification est envoyée à l'une des adresses contrôlées par l'utilisateur.
* L'actif est envoyé à partir d'adresses contrôlées par un utilisateur `username`. \(Bien sûr, cet utilisateur devra détenir au moins le solde de l'actif envoyé.\)

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Envoyez un jeton non fongible.

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

* `assetID` est l'ID d'actif du NFT envoyé.
* `groupID` est le groupe NFT à partir duquel envoyer le NFT. La création de NFT permet de créer plusieurs groupes sous chaque ID de NFT. Vous pouvez émettre plusieurs NFT à chaque groupe.
* `to` est l'adresse du NFT auquel AVAX est envoyé.
* `from` sont les adresses que vous souhaitez utiliser pour cette opération. `changeAddr`En cas d'omission, utilisez l'une de vos adresses au besoin.  est l'adresse à laquelle toute modification sera envoyée. En cas d'omission, la modification est envoyée à l'une des adresses contrôlées par l'utilisateur.
* L'actif est envoyé à partir d'adresses contrôlées par un utilisateur `username`. \(Bien sûr, cet utilisateur devra détenir au moins le solde du NFT envoyé.\)

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Envoyez une transaction signée au réseau et supposez que la transmission sera acceptée. `encoding` indique le format de la transaction signée. Peut être « cb58 » ou « hex ». Par défaut à « cb58 ».

Cet appel est fait au point de terminaison de l'API du portefeuille :

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

#### Exemple d'appel

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

#### Exemple de réponse

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

Envoyez une quantité d'un actif à une adresse et supposez que le tx soit accepté afin que les futurs appels puissent utiliser l'ensemble d'UTXO modifié.

Cet appel est fait au point de terminaison de l'API du portefeuille :

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

* Envoie `amount` unités d'actif avec l'ID `assetID` à l'adresse `to`. `amount` est libellé dans le plus petit incrément de l'actif. Pour AVAX, c'est 1 nAVAX \(un milliardième de 1 AVAX\).
* `to` est l'adresse de la X-Chain à laquelle l'actif est envoyé.
* `from` sont les adresses que vous souhaitez utiliser pour cette opération. En cas d'omission, utilisez l'une de vos adresses au besoin.
* `changeAddr` l'adresse à laquelle tout changement sera envoyé. En cas d'omission, la modification est envoyée à l'une des adresses contrôlées par l'utilisateur.
* Vous pouvez joindre un `memo`, dont la longueur peut aller jusqu'à 256 octets.
* L'actif est envoyé à partir d'adresses contrôlées par un utilisateur `username`. \(Bien sûr, cet utilisateur devra détenir au moins le solde de l'actif envoyé.\)

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Envoyez plusieurs transferts de `amount` de `assetID`, à une adresse spécifiée à partir d'une liste d'adresses propriétaires et supposez que la transmission sera acceptée afin que les appels futurs puissent utiliser l'ensemble d'UTXO modifié.

Cet appel est fait au point de terminaison de l'API du portefeuille :

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

* `outputs` est un tableau de littéraux d'objets qui contiennent chacun un `assetID`, `amount` et `to`.
* `from` sont les adresses que vous souhaitez utiliser pour cette opération. En cas d'omission, utilisez l'une de vos adresses au besoin.
* `changeAddr` l'adresse à laquelle tout changement sera envoyé. En cas d'omission, la modification est envoyée à l'une des adresses contrôlées par l'utilisateur.
* Vous pouvez joindre un `memo`, dont la longueur peut aller jusqu'à 256 octets.
* L'actif est envoyé à partir d'adresses contrôlées par un utilisateur `username`. \(Bien sûr, cet utilisateur devra détenir au moins le solde de l'actif envoyé.\)

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

### événements

Ecoutez les transactions sur une adresse spécifiée.

Cet appel est fait au point de terminaison de l'API d'événements :

`/ext/bc/X/events`

#### **Exemple de Golang**

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

**Opérations**

| Commande | Description | Exemple | Arguments |
| :--- | :--- | :--- | :--- |
| **NewSet** | créer un nouvel ensemble de cartes d'adresse | {« newSet »:{} |  |
| **NewBloom** | créer un nouveau bloom set | {"newBloom":{"maxElements":"1000","collisionProb":"0.0100"}} | maxElements - le nombre d'éléments dans le filtre doit être > 0 collisionProb - la probabilité de collision autorisée doit être > 0 et <= 1 |
| **AddAddresses** | ajouter une adresse à l'ensemble | {"addAddresses":{"addresses":["X-fuji.."]]} | adresses - liste des adresses à comparer |

Appeler **NewSet** ou **NewBloom** réinitialise le filtre, et doit être suivi de **AddAddresses**. **AddAddresses** peut être appelé à plusieurs reprises.

**Définir les détails**

* **NewSet** réalise des correspondances d'adresses absolues, si l'adresse est dans l'ensemble, la transaction vous sera envoyée.
* **NewBloom** [Bloom filtering](https://en.wikipedia.org/wiki/Bloom_filter) peut produire des faux positifs, mais permet de filtrer un plus grand nombre d'adresses.  Si les adresses sont dans le filtre, vous recevrez la transaction.

#### **Exemple de réponse**

```cpp
2021/05/11 15:59:35 {"txID":"22HWKHrREyXyAiDnVmGp3TQQ79tHSSVxA9h26VfDEzoxvwveyk"}
```

