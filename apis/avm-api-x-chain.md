---
description: >-
  Cette API permet aux clients de créer et d'échanger des actifs sur la chaîne X
  et d'autres instances de l'AVM.
---

# AVM API \(X-Chain\)

La X-Chain, la plateforme native d'Avalanche pour la création et l'échange d'actifs, est une instance de la machine virtuelle Avalanche \(AVM\). Cette API permet aux clients de créer et d'échanger des actifs sur la chaîne X et d'autres instances de l'AVM.

## Format

Cette API utilise le format RPC `json 2.0`. Pour plus d'informations sur les appels JSON RPC, cliquez [ici](emettre-des-appels-dapi.md).

## Endpoints

`/ext/bc/X` pour interagir avec la X-Chain.

`/ext/bc/blockchainID` pour interagir avec d'autres instances AVM, où `blockchainID` est l'ID d'une blockchain exécutant l'AVM.

## Methods

### avm.buildGenesis

Étant donné une représentation JSON de l'état de genèse de cette machine virtuelle, créez la représentation octet de cet état.

**Endpoint**

Cet appel est effectué vers l'endpoint d'API statique d'AVM:

`/ext/vm/avm`

Remarque: les adresses ne doivent pas inclure de préfixe de chaîne \(c'est-à-dire X-\) dans les appels à l'endpoint API statique, car ces préfixes font référence à une chaîne spécifique.

**Signature**

```cpp
avm.buildGenesis(genesisData:JSON) -> {bytes:string}
```

où `genesisData` a cette forme :

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

**Exemple d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "id"     : 1,
    "method" : "avm.buildGenesis",
    "params" : {
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
        }
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/vm/avm
```

**Exémple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "bytes":"11111BcSrCUj7fX2ZiHNVgPnTXSiS1bB1vWo7QMaZ61vcyR7LHgFURR95N4TR6Tnu9u4dUW8M1ERahfCrexDbZr6A7d3dfRkbhJyhyspHdLsxUj8Vxn3pmGt5iTCtJwPggjxy5EEqrK9EZGgTprKFonWY8EkE1hAfp1yLqKRNj64Yii4w6uqoMeiECV4h7nD2YmdXmDkKEPT3MuKesXKjFkpfK9nAMfVJx7JMAjNnS418zSbvjxs6kbbd8TYKna8CYwo8PgjGAqhWE4FkLKcF7vGjZobCkDqbYMmazqeDtHnQLdwEzdjMMCcstvRKG7a7WdCxTt1LDVviVY5DmbsbzZoAwh9b95dvhJCMZS5DfQkuNFrhyfnwqMR49jPdU7tnqisd2fXq75kcaumST2y3SHGVgGRDmuQeZeEUnnVRjeejNcCUdraTj8U5cNb91mKDhL36MkmWZgTaA3pPj2RHJQuBBTbtuHdtpgjZGAPZixX6btg328xUEyvhHzmoVBPswC6BpwXCLhZz1zTPz5XVeu5qEzKoUZesu5Ud6ExAG5R29J5ubdkvoDjNn5VacXRgYX3yxfxtdUmjKQGsqRV23YNJcoTHveSy8HHnPtPXcP6mf6aDoWY2i6pbKoG8ixxZoqZDqDsEbbAhzMjar7yob1B1f5Scm92HfpThKsAWd3iWbyabBLxhT3g54ohm6SjjQKkzRS8Z"
    },
    "id": 1
}
```

### avm.createAddress

Créez une nouvelle adresse contrôlée par l'utilisateur donné.

**Signature**

```cpp
avm.createAddress({
    username: string,
    password:string
}) -> {address: string}
```

**Exemple d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "avm.createAddress",
    "params": {
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

**Exémple de Réponse**

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

Créez un nouvel actif fongible à plafond fixe. Une quantité de celui-ci est créée lors de l'initialisation, puis plus n'est jamais créée. L'élément peut être envoyé avec `avm.send`.

**Signature**

```cpp
avm.createFixedCapAsset({
    name: string,
    symbol: string,
    denomination: int,  
    initialHolders: []{
        address: string,
        amount: int
    },
    from: []string, (optional)
    changeAddr: string, (optional)
    username: string,  
    password: string
}) ->
{
    assetID: string,
    changeAddr: string
}
```

* `name` est un nom lisible par l'homme pour l'actif. Pas nécessairement unique.
* `symbol` est un symbole abrégé de l'actif. Entre 0 et 4 caractères. Pas nécessairement unique. Peut être omis.
*  `denomination` détermine la manière dont les soldes de cet actif sont affichés par les interfaces utilisateur. Si la dénomination est 0, 100 unités de cet actif sont affichées comme 100. Si la dénomination est 1, 100 unités de cet actif sont affichées comme 10,0. Si la dénomination est 2, 100 unités de cet actif sont affichées sous la forme .100, etc.
* `from` sont les adresses que vous souhaitez utiliser pour cette opération. En cas d'omission, utilise l'une de vos adresses au besoin.
* `changeAddr` est l'adresse à laquelle tout changement sera envoyé. En cas d'omission, la modification est envoyée à l'une des adresses contrôlées par l'utilisateur.
* `username` et `password`indiquent que l'utilisateur paie les frais de transaction.
* Chaque élément de `initialHolders` spécifie que l'adresse contient les unités de montant de l'actif lors de la genèse.
* `assetID` est l'ID du nouvel actif.

**Exemple d'un Appel**

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

**Exémple de Réponse**

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

Frapper les unités d'un actif à capitalisation variable \(un actif créé avec `avm.createVariableCapAsset.`\)

**Signature**

```cpp
avm.mint({
    amount: int,
    assetID: string,
    to: string,
    from: []string, (optional)
    changeAddr: string, (optional)
    username: string,
    password: string
}) ->
{
    txID: string,
    changeAddr: string,
}
```

* `amount` est le nombre d'unités d'un `assetID` qui seront créer et utilisées par l'adresse `to`.
* `from` sont les adresses que vous souhaitez utiliser pour cette opération. En cas d'omission, utilise l'une de vos adresses au besoin.
* `changeAddr` est l'adresse à laquelle tout changement sera envoyé. En cas d'omission, la modification est envoyée à l'une des adresses contrôlées par l'utilisateur.
* `username`est l'utilisateur qui paie les frais de transaction. `username` doit détenir des clés lui donnant la permission de frapper davantage de cet actif. Autrement dit, il doit contrôler au moins les clés de _thresold_ pour l'un des sets de minter.
* `txID` est l'ID de cette transaction.
* `changeAddr` dans le résultat est l'adresse à laquelle tout changement a été envoyé.

**Exemple d'un Appel**

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
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

**Exémple de Réponse**

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

Créez un nouvel actif fongible à plafond variable. Aucune unité de l'actif n'existe à l'initialisation. Les minters peuvent frapper des unités de cet actif en utilisant `mint`.

Consultez ce[ tutoriel ](../tutoriels/actifs-numeriques-intelligents/creer-un-actif-a-capitalisation-variable.md)pour un exemple d'utilisation.

**Signature**

```cpp
avm.createVariableCapAsset({
    name: string,
    symbol: string,
    denomination: int,  
    minterSets []{
        minters: []string,
        threshold: int
    },
    from: []string, (optional)
    changeAddr: string, (optional)
    username: string,  
    password: string
}) ->
{
    assetID: string,
    changeAddr: string,
}
```

* `name` est un nom lisible par l'homme pour l'actif. Pas nécessairement unique.
* `symbol` est un symbole abrégé de l'actif. Entre 0 et 4 caractères. Pas nécessairement unique. Peut être omis.
*  `denomination` détermine la manière dont les soldes de cet actif sont affichés par les interfaces utilisateur. Si la dénomination est 0, 100 unités de cet actif sont affichées comme 100. Si la dénomination est 1, 100 unités de cet actif sont affichées comme 10,0. Si la dénomination est 2, 100 unités de cet actif sont affichées sous la forme .100, etc.
* `minterSets` est une liste où chaque élément spécifie que le seuil `threshold` des adresses dans les `minters` peut ensemble minter plus de pièces de l'actif en signant une transaction de frappe.
* Effectuer une transaction sur la X-Chain nécessite des frais de transaction payés en AVAX. `username` et `password` indiquent quel utilisateur paie les frais.
* `from` sont les adresses que vous souhaitez utiliser pour cette opération. En cas d'omission, utilise l'une de vos adresses au besoin.
* `changeAddr` est l'adresse à laquelle tout changement sera envoyé. En cas d'omission, la modification est envoyée à l'une des adresses contrôlées par l'utilisateur.

**Exemple d'un Appel**

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

**Exémple de Réponse**

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

Créez un nouvel actif non fongible. Aucune unité de l'actif n'existe à l'initialisation. Les minters peuvent frapper des unités de cet actif en utilisant `mintNFT`.

**Signature**

```cpp
avm.createNFTAsset({
    name: string,
    symbol: string,
    minterSets []{
        minters: []string,
        threshold: int
    },
    from: []string, (optional)
    changeAddr: string, (optional)
    username: string,  
    password: string
}) ->
 {
    assetID: string,
    changeAddr: string,
}
```

* `name` est un nom lisible par l'homme pour l'actif. Pas nécessairement unique. Entre 0 et 128 caractères.
* `symbol` est un symbole abrégé de l'actif. Entre 0 et 4 caractères. Pas nécessairement unique. Peut être omis.
*  `minterSets` est une liste où chaque élément spécifie que le seuil `threshold` des adresses dans les `minters` peut ensemble minter plus de pièces de l'actif en signant une transaction de frappe.
* Effectuer une transaction sur la X-Chain nécessite des frais de transaction payés en AVAX. `username` et `password` indiquent quel utilisateur paie les frais.
* Chaque élément de `initialHolders` spécifie que l'`address` contient les unités de montant de l'actif `amount` lors de la genèse.
* `from` sont les adresses que vous souhaitez utiliser pour cette opération. En cas d'omission, utilise l'une de vos adresses au besoin.
* `changeAddr` est l'adresse à laquelle tout changement sera envoyé. En cas d'omission, la modification est envoyée à l'une des adresses contrôlées par l'utilisateur.

**Exemple d'un Appel**

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

**Exémple de Réponse**

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

Mint des tokens non fongibles qui sont créés avec `avm.createNFTAsset`.

**Signature**

```cpp
avm.mintNFT({
    assetID: string,
    payload: string,
    to: string,
    from: []string, (optional)
    changeAddr: string, (optional)
    username: string,
    password: string
}) ->
{
    txID: string,
    changeAddr: string,
}
```

* `assetID`est le assetID de l'actif NFT nouvellement créé.
* `payload` est une charge utile encodée CB58 payload jusqu'à 1024 octets.
* `from` sont les adresses que vous souhaitez utiliser pour cette opération. En cas d'omission, utilise l'une de vos adresses au besoin.
* `changeAddr` est l'adresse à laquelle tout changement sera envoyé. En cas d'omission, la modification est envoyée à l'une des adresses contrôlées par l'utilisateur.
* `username`est l'utilisateur qui paie les frais de transaction. `username` doit détenir des clés lui donnant la permission de frapper davantage de cet actif. Autrement dit, il doit contrôler au moins les clés de _thresold_ pour l'un des sets de minter.
* `txID` est l'ID de cette transaction.
* `changeAddr` dans le résultat est l'adresse à laquelle tout changement a été envoyé.

**Exemple d'un Appel**

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
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

**Exémple de Réponse**

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

### avm.exportAVAX

Envoyez AVAX de la X-Chain à une autre chaîne.   
Après avoir appelé cette méthode, vous devez appeler `importAVAX` sur l'autre chaîne pour terminer le transfert.

**Signature**

```cpp
avm.exportAVAX({
    to: string,
    amount: int,
    from: []string, (optional)
    changeAddr: string, (optional)
    username: string,
    password:string,
}) ->
{
    txID: string,
    changeAddr: string,
}
```

* `to` est l'adresse P-Chain à laquelle l'AVAX est envoyé..
* `amount` est la quantité de nAVAX à envoyer.
* `from` sont les adresses que vous souhaitez utiliser pour cette opération. En cas d'omission, utilise l'une de vos adresses au besoin.
* `changeAddr` est l'adresse à laquelle tout changement sera envoyé. En cas d'omission, la modification est envoyée à l'une des adresses contrôlées par l'utilisateur.
* Les AVAX est envoyé à partir d'adresses contrôlées `username`
* `txID` est l'ID de cette transaction.
* `changeAddr` dans le résultat est l'adresse à laquelle tout changement a été envoyé.

**Exemple d'un Appel**

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

**Exémple de Réponse**

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

Obtenez la clé privée qui contrôle une adresse donnée.   
La clé privée renvoyée peut être ajoutée à un utilisateur avec `avm.importKey`.

**Signature**

```cpp
avm.exportKey({
    username: string,
    password:string,
    address:string
}) -> {privateKey: string}
```

* `username` doit contrôlé l' `address`.
* `privateKey` est la représentation sous forme de string de la clé privée qui contrôle `address`.

**Example d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.exportKey",
    "params" :{
        "username" :"myUsername",
        "password":"myPassword",
        "address": "X-avax1jggdngzc9l87rgurmfu0z0n0v4mxlqta0h3k6e"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

**Exémple de Réponse**

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

Avoir les balances de tous les actifs contrôlés par une adresse donné.

**Signature**

```cpp
avm.getAllBalances({address:string}) -> {
    balances: []{
        asset: string,
        balance: int
    }
}
```

**Example d'un Appel**

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

**Exémple de Réponse**

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

**Signature**

```cpp
avm.getAssetDescription({assetID: string}) -> {name: string, symbol: string, denomination:int}
```

* `name` est un nom lisible par l'homme pour l'actif. Pas nécessairement unique.
* `symbol` est un symbole abrégé de l'actif. Entre 0 et 4 caractères. Pas nécessairement unique. Peut être omis.
*  `denomination` détermine la manière dont les soldes de cet actif sont affichés par les interfaces utilisateur. Si la dénomination est 0, 100 unités de cet actif sont affichées comme 100. Si la dénomination est 1, 100 unités de cet actif sont affichées comme 10,0. Si la dénomination est 2, 100 unités de cet actif sont affichées sous la forme .100, etc.

**Example d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getAssetDescription",
    "params" :{
        "assetID" :"ZiKfqRXCZgHLgZ4rxGU9Qbycdzuq5DRY4tdSNS9ku8kcNxNLD"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

**Exémple de Réponse**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "name":"My asset name",
        "symbol":"MyAN"
    }
}
```

### avm.getBalance

Obtenez le solde d'un actif contrôlé par une adresse donnée.

**Signature**

```cpp
avm.getBalance({
    address:string,
    assetID: string
}) -> {balance: int}
```

**Example d'un Appel**

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

**Exémple de Réponse**

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

Renvoie la transaction spécifiée

**Signature**

```cpp
avm.getTx({txID: string}) -> {tx: string}
```

**Example d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getTx",
    "params" :{
        "txID":"2QouvFWUbjuySRxeX5xMbNCuAaKWfbk5FeEa2JmoF85RKLk2dD"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

**Exémple de Réponse**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "tx":"1111111vQFqEEHkkAGwJnpdAJgga28zHk9pFARHp1VWe3QM5wC7ztGA5cZAPanFWXHkhbWEbFs9qsEpNZ7QHrzucUUZqLEPrAwJZLrZBik4dEhbsTCF3nS6s2fXVzc5ar2esLFD92WVMZmJNuTUQuKjVkjag2Gy3HHYSqm6bojrG62KrazywKPhrYx8QF9AqNfYYwD3XcSUV1g46r7sQ1WqzM8nyG4qL517JS1YVuTC3aWPeN5cxP6FdvbYexwHcgaBtiQsYbCEeZ9cuJqhE2Pxx8BJFpicLN8FBexb6fzQyBLiFR7yx6v6YBjq7dtu9MBczFdNCnDE4MsG2SyPZsdUv1XxQYVVwDqgqi8Zto5esJKph72YZbrXX3SHVSZBFZXkKbTzyEQFWHCF1jC"
    }
}
```

### avm.getTxStatus

Obtenez le statut d'une transaction envoyée au réseau.

**Signature**

```text
avm.getTxStatus({txID: string}) -> {status: string}
```

`status` is one of:

* `Accepted`: La transaction est acceptée \(ou sera acceptée\) par tous les noeuds.
* `Processing`: La transaction est votée par ce nœud.
* `Rejected`: La transaction ne sera jamais acceptée par aucun nœud du réseau.
* `Unknown`: La transaction n'a pas été vue par ce nœud.

**Example d'un Appel**

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

**Exémple de Réponse**

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

Obtient les UTXO qui référencent une adresse donnée. Si `sourceChain` est spécifié, il récupérera les UTXO atomiques exportés de cette chaîne vers la chaîne X.

**Signature**

```cpp
avm.getUTXOs(
    {
        addresses: string,
        limit: int, (optional)
        startIndex: { (optional)
            address: string,
            utxo: string
        },
        sourceChain: string (optional)
    },
) -> 
{
    numFetched: int
    utxos: []string,
    endIndex: {
        address: string,
        utxo: string
    }
}
```

* `utxos` est une liste d'UTXOs telle que chaque UTXO référence au moins une adresse dans les `adresses`.
* Au maximum`limit` UTXOs sont renvoyées. Si `limit` est omise ou supérieure à 1024, elle est définie sur 1024.
* Cette méthode prend en charge la pagination. `endIndex` désigne le dernier UTXO renvoyé. Pour obtenir le prochain ensemble d'UTXO, utilisez la valeur de `endIndex` comme `startIndex` lors de l'appel suivant.
* Si `startIndex` est omis, on récupérera tous les UTXO jusqu'à la `limit`.
* Lors de l'utilisation de la pagination \(c'est-à-dire lorsque`startIndex` est fourni\), les UTXO ne sont pas garantis d'être uniques sur plusieurs appels. Autrement dit, un UTXO peut apparaître dans le résultat du premier appel, puis à nouveau dans le deuxième appel.
* Lors de l'utilisation de la pagination, la cohérence n'est pas garantie sur plusieurs appels. Autrement dit, l'ensemble UTXO des adresses peut avoir changé entre les appels.

**Exemple**

Supposons que nous voulions tous les UTXO qui référencent au moins `X-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf` et `X-avax1x459sj0ssujguq723cljfty4jlae28evjzt7xz`.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getUTXOs",
    "params" :{
        "addresses":["X-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf", "X-avax1x459sj0ssujguq723cljfty4jlae28evjzt7xz"],
        "limit":5
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Cela nous donne la réponse :

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
        }
    },
    "id": 1
}
```

Puisque `numFetched` est le même que `limit`, nous pouvons dire qu'il peut y avoir plus d'UTXO qui n'ont pas été récupérés. Nous appelons à nouveau la méthode, cette fois avec `startIndex`:

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
        }
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Cela nous donne la réponse :

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
        }
    },
    "id": 1
}
```

Comme`numFetched` est inférieur à la `limit`, nous savons que nous avons fini de récupérer les UTXO et que nous n'avons pas besoin d'appeler à nouveau cette méthode.

Supposons que nous voulions récupérer les UTXO exportés de la P-Chain vers la X-Chain afin de construire un `ImportTx`. Ensuite, nous devons appeler `GetUTXOs` avec l'argument `sourceChain` afin de récupérer les UTXO atomiques:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getUTXOs",
    "params" :{
        "addresses":["X-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf", "X-avax1x459sj0ssujguq723cljfty4jlae28evjzt7xz"],
        "limit":5,
        "sourceChain": "P"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Cela nous donne la réponse suivante :

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
        }
    },
    "id": 1
}
```

### avm.importAVAX

Finalisez un transfert d'AVAX de la P-Chain vers la X-Chain. Avant d'appeler cette méthode, vous devez appeler la méthode P-Chain [`exportAVAX`](platform-api-p-chain.md) pour lancer le transfert.

**Signature**

```cpp
avm.importAVAX({
    to: string,
    sourceChain: string,
    username: string,
    password:string,
}) -> {txID: string}
```

* `to` est l'adresse à laquelle l'AVAX est envoyé. Cela doit être le même que l'argument `to` dans l'appel correspondant à l'`exportAVAX` de la P-Chain.
* `sourceChain` est l'ID ou l'alias de la chaîne dans laquelle l'AVAX est importé. Pour importer des fonds de la P-Chain, utilisez `"P"`.
* `username` est l'utilisateur qui contrôle `to`.

**Example d'un Appel**

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

**Exémple de Réponse**

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

Donnez à un utilisateur le contrôle d'une adresse en fournissant la clé privée qui contrôle l'adresse.

**Signature**

```cpp
avm.importKey({
    username: string,
    password:string,
    privateKey:string
}) -> {address: string}
```

* Ajoutez `privateKey` à `username` et son ensemble de clés privées. `address` est l'adresse de `username` qui contrôle maintenant la clé privée.

**Example d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.importKey",
    "params" :{
        "username" :"myUsername",
        "password":"myPassword",
        "privateKey":"PrivateKey-2w4XiXxPfQK4TypYqnohRL8DRNTz9cGiGmwQ1zmgEqD9c9KWLq"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

**Exémple de Réponse**

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

Envoyer une transaction au réseau.

**Signature**

```cpp
avm.issueTx({tx: string}) -> {txID: string}
```

**Example d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.issueTx",
    "params" :{
        "tx":"6sTENqXfk3gahxkJbEPsmX9eJTEFZRSRw83cRJqoHWBiaeAhVbz9QV4i6SLd6Dek4eLsojeR8FbT3arFtsGz9ycpHFaWHLX69edJPEmj2tPApsEqsFd7wDVp7fFxkG6HmySR"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

**Exémple de Réponse**

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

Répertoriez les adresses contrôlées par l'utilisateur donné.

**Signature**

```cpp
avm.listAddresses({
    username: string,
    password: string
}) -> {addresses: []string}
```

**Example d'un Appel**

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

**Exémple de Réponse**

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

Envoyez une quantité d'actif à une adresse.

**Signature**

```cpp
avm.send({
    amount: int,
    assetID: string,
    to: string,
    from: []string, (optional)
    changeAddr: string, (optional)
    memo: string, (optional)
    username: string,
    password: string
}) -> {txID: string, changeAddr: string}
```

* Envoyer l' `amount` d'unités d'un asset `assetID` à l'adresse `to`. `amount` est libellé dans le plus petit incrément de l'actif. Pour AVAX, c'est 1 nAVAX \(un milliardième de 1 AVAX.\)
* `to` est l'adresse X-Chain à laquelle l'élément est envoyé.
* `from` sont les adresses que vous souhaitez utiliser pour cette opération. En cas d'omission, utilise l'une de vos adresses au besoin.
* `changeAddr` est l'adresse à laquelle tout changement sera envoyé. En cas d'omission, la modification est envoyée à l'une des adresses contrôlées par l'utilisateur.
* Vous pouvez joindre un `memo`, dont la longueur peut aller jusqu'à 256 octets.
* L'actif est envoyé à partir d'adresses contrôlées par l'utilisateur`username`. \(Bien sûr, cet utilisateur devra détenir au moins le solde de l'actif envoyé.\)

**Example d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.send",
    "params" :{
        "assetID"   : "AVAX",
        "amount"    : 10000,
        "to"        : "X-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf",
        "from":["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "memo"      : "hi, mom!",
        "username"  : "userThatControlsAtLeast10000OfThisAsset",
        "password"  : "myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

**Exémple de Réponse**

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

Envoie une quantité de `assetID` à un tableau d'adresses spécifiées à partir d'une liste d'adresses possédées.

**Signature**

```cpp
avm.sendMultiple({
    outputs: []{
      assetID: string,
      amount: int,
      to: string
    }
    from: []string, (optional)
    changeAddr: string, (optional)
    memo: string, (optional)
    username: string,
    password: string
}) -> {txID: string, changeAddr: string}
```

* `outputs` est un tableau d'objets littéraux contenant chacin un `assetID`, `amount` et`to`.
* `from` sont les adresses que vous souhaitez utiliser pour cette opération. En cas d'omission, utilise l'une de vos adresses au besoin.
* `changeAddr` est l'adresse à laquelle tout changement sera envoyé. En cas d'omission, la modification est envoyée à l'une des adresses contrôlées par l'utilisateur.
* Vous pouvez joindre un `memo`, dont la longueur peut aller jusqu'à 256 octets.
* L'actif est envoyé à partir d'adresses contrôlées par l'utilisateur`username`. \(Bien sûr, cet utilisateur devra détenir au moins le solde de l'actif envoyé.\)

**Example d'un Appel**

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
            }
        ],
        "from":["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "memo"      : "hi, mom!",
        "username"  : "userThatControlsAtLeast10000OfThisAsset",
        "password"  : "myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

**Exémple de Réponse**

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

**Signature**

```cpp
avm.sendNFT({
    assetID: string,
    groupID: number,
    to: string,
    from: []string, (optional)
    changeAddr: string, (optional)
    username: string,
    password: string
}) -> {txID: string}
```

* `assetID` est l'ID d'actif du NFT du NFT envoyé.
* `groupID` st le groupe NFT à partir duquel envoyer le NFT. La création NFT permet plusieurs groupes sous chaque ID NFT. Vous pouvez émettre plusieurs NFT à chaque groupe.
* `to` est l'adresse X-Chain à laquelle le NFT est envoyé.
* `from` sont les adresses que vous souhaitez utiliser pour cette opération. En cas d'omission, utilise l'une de vos adresses au besoin. `changeAddr` est l'adresse à laquelle tout changement sera envoyé. En cas d'omission, la modification est envoyée à l'une des adresses contrôlées par l'utilisateur.
* L'actif est envoyé à partir d'adresses contrôlées par l'utilisateur. `username`. \(Bien sûr, cet utilisateur devra détenir au moins le solde du NFT envoyé.\)

**Example d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.sendNFT",
    "params" :{
        "assetID"   : "2KGdt2HpFKpTH5CtGZjYt5XPWs6Pv9DLoRBhiFfntbezdRvZWP",
        "groupID"   : 0,
        "to"        : "X-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf",
        "from"      :["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username"  : "myUsername",
        "password"  : "myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

**Exémple de Réponse**

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

