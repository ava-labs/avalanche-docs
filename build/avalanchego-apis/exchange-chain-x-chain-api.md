---
description: La chaîne Xest une instance de la machine virtuelle Avalanche (AVM)

---

# API de chaîne d'échange \(X-Chain\)

La chaîne [X-Chain](../../learn/platform-overview/#exchange-chain-x-chain), la plateforme native d'Avalanche pour la création et le trading d'actifs, est une instance de la machine virtuelle Avalanche \(AVM\). Cette API permet aux clients de créer et de commercialiser des actifs sur la chaîne X-Chain d'autres instances de l'AVM.

{% embed url="https://www.youtube.com/watch?v=rD-IOd1nvFo" caption="" %}

## Format

Cette API utilise le format RPC `json 2.0`. Pour plus d'informations sur les appels JSON RPC, voir [ici](issuing-api-calls.md).

## Points de fin

`/ext/bc/X` pour interagir avec la chaîne X.

`/ext/bc/blockchainID``` pour interagir avec d'autres instances AVM, où blockchainID est l'ID d'une blockchain exécutant l'AVM.

## Méthodes

### avm.buildGenesis

Compte tenu d'une représentation JSON de l'état de genèse de cette machine virtuelle, créez la représentation des octets de cet état.

#### **Point de fin**

Cet appel est effectué au paramètre de l'API statique de l'AVM:

`/ext/vm/avm`

Note: les adresses ne devraient pas inclure un préfixe de chaîne \(ie. X-\) dans les appels vers le paramètre API statique parce que ces préfixes se réfèrent à une chaîne spécifique.

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

Encoding spécifie le format d'encodage à utiliser pour les octets arbitraires par exemple. les octets de genèse qui sont retournés. Peut être soit "cb58" ou "hex". Par défaut vers "cb58".

`genesisData` a cette forme:

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

Créez un nouvel actif fongible fixed-cap, Une quantité de elle est créée lors de l'initialisation et puis plus n'est jamais créé. L'actif peut être envoyé avec `avm.send`.

{% page-ref page-ref %}

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

* `nom` est un nom lisible par l'homme pour l'actif. Pas nécessairement unique.
* `symbole` est un symbole shorthand pour l'actif. Entre 0 et 4 caractères. Pas nécessairement unique. Peut être omise.
* `la dénomination` détermine la manière dont les soldes de cet actif sont affichés par les interfaces utilisateur. Si `la valeur` est 0, 100 unités de cet actif sont affichées comme `100.` Si la valeur est 1, 100 unités de cet actif sont affichées comme 10.0. Si `la valeur` est 2, 100 unités de cet actif sont affichées comme 1.00, etc. Defaults à 0.
* `sont` les adresses que vous souhaitez utiliser pour cette opération. Si elle est omise, utilise l'une de vos adresses au besoin.
* `changeAddr` est l'adresse que tout changement sera envoyé à. Si l'omission est effectuée, le changement est envoyé à l'une des adresses contrôlées par l'utilisateur.
* `nom` d'utilisateur et `mot de passe` dénotent l'utilisateur payant les frais de transaction.
* Chaque élément dans `initialHolders` spécifie que `l'adresse` détient des unités `de montant` de l'actif à la genèse.
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

Unités de menthe d'un actif à cap variable créé avec [`avm.createVariableCapAsset`](exchange-chain-x-chain-api.md#avm-createvariablecapasset).

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

* les unités `de montant` de `l'identifiant` de l'actif seront créées et contrôlées par l'adresse `à`.
* `sont` les adresses que vous souhaitez utiliser pour cette opération. Si elle est omise, utilise l'une de vos adresses au besoin.
* `changeAddr` est l'adresse que tout changement sera envoyé à. Si l'omission est effectuée, le changement est envoyé à l'une des adresses contrôlées par l'utilisateur.
* `nom` d'utilisateur est l'utilisateur qui paie les frais de transaction. `nom` d'utilisateur doit détenir les clés lui donnant la permission de minter plus de cet actif. Autrement dit, il doit contrôler au moins les clés _de seuil_ pour l'un des ensembles de mineurs.
* `txID` est l'ID de cette transaction.
* `changeAddr` dans le résultat est l'adresse où tout changement a été envoyé.

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

Créez un nouvel actif variable-cap, variable. Aucune unité de l'actif n'existe lors de l'initialisation. Les minters peuvent mint les unités de cet actif en utilisant `avm.mint`.

{% page-ref page-ref %}

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

* `nom` est un nom lisible par l'homme pour l'actif. Pas nécessairement unique.
* `symbole` est un symbole shorthand pour l'actif. Entre 0 et 4 caractères. Pas nécessairement unique. Peut être omise.
* `la dénomination` détermine la manière dont les soldes de cet actif sont affichés par les interfaces utilisateur. Si la valeur est 0, 100 unités de cet actif sont affichées comme 100. Si la valeur est 1, 100 unités de cet actif sont affichées comme 10.0. Si la dénomination est 2, 100 unités de cet actif sont affichées comme .100, etc.
* `minterSets` est une liste où chaque élément spécifie que `le seuil` des adresses dans les `mineurs` peut ensemble minter plus de l'actif en signant une transaction de mintage.
* `sont` les adresses que vous souhaitez utiliser pour cette opération. Si elle est omise, utilise l'une de vos adresses au besoin.
* `changeAddr` est l'adresse que tout changement sera envoyé à. Si l'omission est effectuée, le changement est envoyé à l'une des adresses contrôlées par l'utilisateur.
* `nom` d'utilisateur paie les frais de transaction.
* `assetID` est l'ID du nouvel actif.
* `changeAddr` dans le résultat est l'adresse où tout changement a été envoyé.

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

Créer un nouvel actif non fongible. Aucune unité de l'actif n'existe lors de l'initialisation. Les minters peuvent mint les unités de cet actif en utilisant `avm.mintNFT`.

{% page-ref page="./tutoriels/smart-digital-actifs/creating-a-nft-part-1.md" %}

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

* `nom` est un nom lisible par l'homme pour l'actif. Pas nécessairement unique.
* `symbole` est un symbole shorthand pour l'actif. Entre 0 et 4 caractères. Pas nécessairement unique. Peut être omise.
* `minterSets` est une liste où chaque élément spécifie que `le seuil` des adresses dans les `mineurs` peut ensemble minter plus de l'actif en signant une transaction de mintage.
* `sont` les adresses que vous souhaitez utiliser pour cette opération. Si elle est omise, utilise l'une de vos adresses au besoin.
* `changeAddr` est l'adresse que tout changement sera envoyé à. Si l'omission est effectuée, le changement est envoyé à l'une des adresses contrôlées par l'utilisateur.
* `nom` d'utilisateur paie les frais de transaction.
* `assetID` est l'ID du nouvel actif.
* `changeAddr` dans le résultat est l'adresse où tout changement a été envoyé.

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

Menthe jetons non fongibles qui ont été créés avec [`avm.createNFTAsset`](exchange-chain-x-chain-api.md#avm-createnftasset).

{% page-ref page="./tutoriels/smart-digital-actifs/creating-a-nft-part-1.md" %}

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

* `assetID` est l'actif de l'actif NFT nouvellement créé.
* `charge utile` est une charge utile arbitraire allant jusqu'à 1024 octets. Son format d'encodage est spécifié par l'argument `d'encodage.`
* `sont` les adresses que vous souhaitez utiliser pour cette opération. Si elle est omise, utilise l'une de vos adresses au besoin.
* `changeAddr` est l'adresse que tout changement sera envoyé à. Si l'omission est effectuée, le changement est envoyé à l'une des adresses contrôlées par l'utilisateur.
* `nom` d'utilisateur est l'utilisateur qui paie les frais de transaction. `nom` d'utilisateur doit détenir les clés lui donnant la permission de minter plus de cet actif. Autrement dit, il doit contrôler au moins les clés _de seuil_ pour l'un des ensembles de mineurs.
* `txID` est l'ID de cette transaction.
* `changeAddr` dans le résultat est l'adresse où tout changement a été envoyé.
* `encodage` est le format d'encodage à utiliser pour l'argument de charge utile. Peut être soit "cb58" ou "hex". Par défaut vers "cb58".

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

Envoyez un non-AVAX de la chaîne Xà la chaîne P ou C-Chain. Après avoir appelé cette méthode, vous devez appeler [`avax.import`](contract-chain-c-chain-api.md#avax-import) sur la chaîne C pour terminer le transfert.

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

* `à` est l'adresse P-Chain ou C-Chain l'actif est envoyé à.
* `le` montant est le montant de l'actif à envoyer.
* `assetID` est l'identifiant de l'actif qui est envoyé.
* `sont` les adresses que vous souhaitez utiliser pour cette opération. Si elle est omise, utilise l'une de vos adresses au besoin.
* `changeAddr` est l'adresse que tout changement sera envoyé à. Si l'omission est effectuée, le changement est envoyé à l'une des adresses contrôlées par l'utilisateur.
* L'actif est envoyé à partir d'adresses contrôlées par `le nom` d'utilisateur
* `txID` est l'ID de cette transaction.
* `changeAddr` dans le résultat est l'adresse où tout changement a été envoyé.

#### **Exemple d'appel**

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

### avm.exportAVAX

Envoyez AVAX de la chaîne Xà une autre chaîne. Après avoir appelé cette méthode, vous devez appeler `l'importation` sur l'autre chaîne pour terminer le transfert.

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

* `à` est l'adresse P-Chain que is envoyé.
* `le` montant est le montant de nAVAX à envoyer.
* `sont` les adresses que vous souhaitez utiliser pour cette opération. Si elle est omise, utilise l'une de vos adresses au besoin.
* `changeAddr` est l'adresse que tout changement sera envoyé à. Si l'omission est effectuée, le changement est envoyé à l'une des adresses contrôlées par l'utilisateur.
* The est envoyé à partir d'adresses contrôlées par `le nom` d'utilisateur
* `txID` est l'ID de cette transaction.
* `changeAddr` dans le résultat est l'adresse où tout changement a été envoyé.

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Obtenez la clé privée qui contrôle une adresse donnée.   La clé privée retournée peut être ajoutée à un utilisateur avec [`avm.importKey`](exchange-chain-x-chain-api.md#avm-importkey).

#### **Signature**

```cpp
avm.exportKey({
    username: string,
    password: string,
    address: string
}) -> {privateKey: string}
```

* `nom` d'utilisateur doit contrôler `l'adresse`.
* `privateKey` est la représentation de la chaîne de la clé privée qui contrôle `l'adresse`.

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
* `nom` est le nom lisible par l'homme, pas nécessairement unique.
* `symbole` est le symbole de l'actif.
* `la dénomination` détermine la manière dont les soldes de cet actif sont affichés par les interfaces utilisateur. Si la valeur est 0, 100 unités de cet actif sont affichées comme 100. Si la valeur est 1, 100 unités de cet actif sont affichées comme 10.0. Si la dénomination est 2, 100 unités de cet actif sont affichées comme .100, etc.

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

* `adresse` propriétaire de l'actif
* `assetID` id de l'actif pour lequel le solde est demandé

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

### avm.getTx

Retourne la transaction spécifiée. Le paramètre `encodage` définit le format de la transaction retournée. Peut être soit "cb58" ou "hex". Par défaut vers "cb58".

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
        "txID":"2QouvFWUbjuySRxeX5xMbNCuAaKWfbk5FeEa2JmoF85RKLk2dD",
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
        "tx":"1111111vQFqEEHkkAGwJnpdAJgga28zHk9pFARHp1VWe3QM5wC7ztGA5cZAPanFWXHkhbWEbFs9qsEpNZ7QHrzucUUZqLEPrAwJZLrZBik4dEhbsTCF3nS6s2fXVzc5ar2esLFD92WVMZmJNuTUQuKjVkjag2Gy3HHYSqm6bojrG62KrazywKPhrYx8QF9AqNfYYwD3XcSUV1g46r7sQ1WqzM8nyG4qL517JS1YVuTC3aWPeN5cxP6FdvbYexwHcgaBtiQsYbCEeZ9cuJqhE2Pxx8BJFpicLN8FBexb6fzQyBLiFR7yx6v6YBjq7dtu9MBczFdNCnDE4MsG2SyPZsdUv1XxQYVVwDqgqi8Zto5esJKph72YZbrXX3SHVSZBFZXkKbTzyEQFWHCF1jC",
        "encoding": "cb58"
    }
}
```

### avm.getTxStatus

Obtenez l'état d'une transaction envoyée au réseau.

#### **Signature**

```cpp
avm.getTxStatus({txID: string}) -> {status: string}
```

`statut` est l'un des :

* `Accepté `: la transaction est \(ou sera\) acceptée par chaque noeud
* `Traitement`: la transaction est votée par ce noeud
* `Rejeté`: la transaction ne sera jamais acceptée par aucun nœud dans le réseau
* `Inconnu`: la transaction n'a pas été vue par ce noeud

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

### avm.getUTXOS

Obtient les UTXOs qui font référence à une adresse donnée. Si la chaîne sourceChain spécifiée, elle récupérera les UTXOs atomiques exportées de cette chaîne vers la chaîne X.

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

* `utxos` est une liste des UTXO de telle que chaque UTXO renvoie au moins une adresse dans `les adresses`.
* Au maximum `les` UTXOs sont retournés. Si la `limite` est omise ou supérieure à 1024, elle est fixée à 1024.
* Cette méthode supporte la pagination. `endIndex` indique la dernière UTXO retournée. Pour obtenir l'ensemble suivant of utilisez la valeur de `endIndex` comme `startIndex` dans l'appel suivant.
* Si `startIndex` est omitted, va chercher tous les UTXOs jusqu'à `limiter`.
* Lorsque l'utilisation de pagination \(lorsque `startIndex` est fourni\), les UTXOs ne sont pas garantis d'être unique sur plusieurs appels. Autrement dit, un UTXO peut apparaître dans le résultat du premier appel, puis dans le second appel.
* Lorsque vous utilisez la pagination, la cohérence n'est pas garantie sur plusieurs appels. Autrement dit, l'ensemble UTXO des adresses peut avoir changé entre les appels.
* `encodage` définit le format des UTXOs. Peut être soit "cb58" ou "hex". Par défaut vers "cb58".

#### **Exemple**

Supposons que nous voulons tous les UTXOs cette référence au moins une de `X-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf` et `X-avax1x459sj0ssujguq723cljfty4jlae28evjzt7xz`.

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

Ceci donne la réponse:

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

Puisque `numFetched` est la même `limite`, nous pouvons dire qu'il peut y avoir plus more qui n'ont pas été récupérés. Nous appelons la méthode à nouveau, cette fois avec `startIndex`:

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

Ceci donne la réponse:

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

Puisque `numFetched` est moins que `limite`, nous savons que nous sommes fait la recherche UTXOs et n'avons pas besoin de rappeler cette méthode à nouveau.

Supposons que nous voulons récupérer les UTXOs exportés de la chaîne P vers la chaîne X afin de construire une ImportTx. Ensuite, nous devons appeler GetUTXOs avec l'argument sourceChain afin de récupérer les UTXOS atomiques:

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

Ceci donne la réponse:

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

Finaliser un transfert of de la chaîne P ou C-Chain à la chaîne X. Avant que cette méthode soit appelée, vous devez appeler la [`plate-forme`](platform-chain-p-chain-api.md#platform-exportavax) P-Chain’s ou la méthode [`avax.export`](contract-chain-c-chain-api.md#avax-export) de P-Chain’s pour initier le transfert.

#### **Signature**

```cpp
avm.import({
    to: string,
    sourceChain: string,
    username: string,
    password: string,
}) -> {txID: string}
```

* `à` est l'adresse que the envoyé. Cela doit être le même que celui `de` l'argument dans l'appel correspondant à `l'exportation` de la P-Chain’s ou `C-Chain's`
* `sourceChain` est l'ID ou les alias de la chaîne dont of est importé. Pour importer des fonds de la chaîne C, utilisez `"C"`.
* `nom` d'utilisateur est l'utilisateur qui contrôle `à`.
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

### avm.importAVAX

Finaliser un transfert of de la chaîne P à la chaîne X. Avant que cette méthode soit appelée, vous devez appeler la méthode P-Chain’s [`platform.exportAVAX`](platform-chain-p-chain-api.md#platform-exportavax) pour initier le transfert.

#### **Signature**

```cpp
avm.importAVAX({
    to: string,
    sourceChain: string,
    username: string,
    password: string,
}) -> {txID: string}
```

* `à` est l'adresse que the envoyé. Cela doit être le même que celui `de` l'argument dans l'appel correspondant à `l'exportation` de la P-Chain’s
* `sourceChain` est l'ID ou les alias de la chaîne dont of est importé. Pour importer des fonds de la P-Chain, utilisez `"P"`.
* `nom` d'utilisateur est l'utilisateur qui contrôle `à`.

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Donnez un contrôle utilisateur sur une adresse en fournissant la clé privée qui contrôle l'adresse.

#### **Signature**

```cpp
avm.importKey({
    username: string,
    password: string,
    privateKey: string
}) -> {address: string}
```

* Ajouter `privateKey` à l'ensemble de clés privées de `username```‘s `l'adresse` est l'adresse utilisateur nom d'utilisateur contrôle maintenant avec la clé privée.

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

Envoyez une transaction signée au réseau. `l'encodage` spécifie le format de la transaction signée. Peut être soit "cb58" ou "hex". Par défaut vers "cb58".

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

Lister les adresses contrôlées par l'utilisateur donné.

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

* Envoie les unités de `montant` de l'actif avec ID `d'identification` à `l'adresse`. `montant` est libellé dans la plus petite augmentation de l'actif. Pour AVAX, ceci est 1 nAVAX \(un billionth de 1 AVAX. \)
* `à` est l'adresse X-Chain l'actif est envoyé à.
* `sont` les adresses que vous souhaitez utiliser pour cette opération. Si elle est omise, utilise l'une de vos adresses au besoin.
* `changeAddr` est l'adresse que tout changement sera envoyé à. Si l'omission est effectuée, le changement est envoyé à l'une des adresses contrôlées par l'utilisateur.
* Vous pouvez joindre un `mémo`, dont la longueur peut être jusqu'à 256 octets.
* L'actif est envoyé à partir d'adresses contrôlées par `le nom` d'utilisateur utilisateur. \(Bien sûr, cet utilisateur devra détenir au moins le solde de l'actif envoyé. \)

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

Envoie plusieurs transferts du `montant` `of` à une adresse spécifiée à partir d'une liste d'adresses possédées.

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

* `extrants` est un tableau de lettres d'objet qui contient chacun un `assetID`, `montant` et `à`.
* `memo` est un message facultatif, dont la longueur peut être jusqu'à 256 octets.
* `sont` les adresses que vous souhaitez utiliser pour cette opération. Si elle est omise, utilise l'une de vos adresses au besoin.
* `changeAddr` est l'adresse que tout changement sera envoyé à. Si l'omission est effectuée, le changement est envoyé à l'une des adresses contrôlées par l'utilisateur.
* L'actif est envoyé à partir d'adresses contrôlées par `le nom` d'utilisateur utilisateur. \(Bien sûr, cet utilisateur devra détenir au moins le solde de l'actif envoyé. \)

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

* `assetID` est l'identifiant d'actif de la NFT étant envoyée.
* `groupID` est le groupe NFT à partir duquel envoyer le NFT. La création NFT permet plusieurs groupes sous chaque ID NFT. Vous pouvez émettre plusieurs NFT à chaque groupe.
* `à` est l'adresse X-Chain que la NFT est envoyée à.
* `sont` les adresses que vous souhaitez utiliser pour cette opération. Si l'omission est effectuée, utilise l'une de vos adresses au besoin. `changeAddr` est l'adresse que tout changement sera envoyé. Si l'omission est effectuée, le changement est envoyé à l'une des adresses contrôlées par l'utilisateur.
* L'actif est envoyé à partir d'adresses contrôlées par `le nom` d'utilisateur utilisateur. \(Bien sûr, cet utilisateur devra conserver au moins le solde de la NFT étant envoyée. \)

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

Envoyez une transaction signée au réseau et présumez que le tx sera accepté. `l'encodage` spécifie le format de la transaction signée. Peut être soit "cb58" ou "hex". Par défaut vers "cb58".

Cet appel est fait au point de l'API portefeuille :

`/ext/bc/X/portefeuille`

#### Signature

```cpp
wallet.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {
    txID: string
}
```

#### Appel d'exemple

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

Envoyez une quantité d'un actif à une adresse et présumez que le tx sera accepté de sorte que les prochains appels puissent utiliser l'ensemble UTXO modifié.

Cet appel est fait au point de l'API portefeuille :

`/ext/bc/X/portefeuille`

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

* Envoie les unités de `montant` de l'actif avec ID `d'identification` à `l'adresse`. `montant` est libellé dans la plus petite augmentation de l'actif. Pour AVAX, ceci est 1 nAVAX \(un billionth de 1 AVAX. \)
* `à` est l'adresse X-Chain l'actif est envoyé à.
* `sont` les adresses que vous souhaitez utiliser pour cette opération. Si elle est omise, utilise l'une de vos adresses au besoin.
* `changeAddr` est l'adresse que tout changement sera envoyé à. Si l'omission est effectuée, le changement est envoyé à l'une des adresses contrôlées par l'utilisateur.
* Vous pouvez joindre un `mémo`, dont la longueur peut être jusqu'à 256 octets.
* L'actif est envoyé à partir d'adresses contrôlées par `le nom` d'utilisateur utilisateur. \(Bien sûr, cet utilisateur devra détenir au moins le solde de l'actif envoyé. \)

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

Envoyez plusieurs transferts de `montant` `of` à une adresse spécifiée depuis une liste d'adresses appartenant à la propriété et présumer que le tx sera accepté de sorte que les appels futurs puissent utiliser l'ensemble UTXO modifié.

Cet appel est fait au point de l'API portefeuille :

`/ext/bc/X/portefeuille`

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

* `extrants` est un tableau de lettres d'objet qui contient chacun un `assetID`, `montant` et `à`.
* `sont` les adresses que vous souhaitez utiliser pour cette opération. Si elle est omise, utilise l'une de vos adresses au besoin.
* `changeAddr` est l'adresse que tout changement sera envoyé à. Si l'omission est effectuée, le changement est envoyé à l'une des adresses contrôlées par l'utilisateur.
* Vous pouvez joindre un `mémo`, dont la longueur peut être jusqu'à 256 octets.
* L'actif est envoyé à partir d'adresses contrôlées par `le nom` d'utilisateur utilisateur. \(Bien sûr, cet utilisateur devra détenir au moins le solde de l'actif envoyé. \)

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

Écouter les transactions sur une adresse spécifiée.

Cet appel est fait au paramètre API des événements:

`/ext/bc/X/événements`

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

| Commandement de la Commande. | Description | Exemple | Arguments |
| :--- | :--- | :--- | :--- |
| **NewSet** | créer un nouvel ensemble de carte d'adresse | {"newSet":{} |  |
| **NewBloom** | créer un nouveau jeu de fleurs. | {"newBloom":{"maxÉléments":"1000","collisionProb":"0.0100"}} | maxElements - le nombre d'éléments dans le filtre doit être > 0 collisionProb - la probabilité de collision autorisée doit être > 0 et <= 1 |
| **Addresses:** | ajouter une adresse au jeu | {"addAddresses":{"addresses":\["X-fuji..." \]}} | adresses - liste des adresses à correspondre |

Appelant **NewSet** ou ou **NewBloom** réinitialise le filtre, et doit être suivi avec **Addresses**. **AddAddresses** peut être appelé plusieurs fois.

**Détails du jeu**

* **NewSet** effectue des matchs absolus, si l'adresse est dans l'ensemble, vous serez envoyé la transaction.
* Le [filtrage](https://en.wikipedia.org/wiki/Bloom_filter) **NewBloom** Bloom peut produire des faux positifs, mais peut permettre un plus grand nombre d'adresses à être filtré. Si les adresses sont dans le filtre, vous serez envoyé la transaction.

#### **Exemple de réponse**

```cpp
2021/05/11 15:59:35 {"txID":"22HWKHrREyXyAiDnVmGp3TQQ79tHSSVxA9h26VfDEzoxvwveyk"}
```

