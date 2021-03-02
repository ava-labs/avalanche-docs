---
description: >-
  Cette API permet aux clients d'interagir avec la P-Chain (Platform Chain), qui
  gère le jeu de validateurs d'Avalanche et gère la création de la blockchain.
---

# Platform API \(P-Chain\)

## Endpoint

```text
/ext/P
```

## Format

Cette API utilise le format RPC `json 2.0`. Pour plus d'informations sur les appels JSON RPC, cliquez [ici](emettre-des-appels-dapi.md).

## Méthodes

### platform.addDelegator

Ajoutez un délégateur au réseau principal.

Un délégateur stake ces AVAX et spécifie un validateur \(le délégataire\) à valider en son nom. Le délégataire a une probabilité accrue d'être échantillonné par d'autres validateurs \(poids\) proportionnellement à l'enjeu qui lui est délégué.

Le délégataire facture des honoraires au délégant; le premier reçoit un pourcentage de la récompense de validation du délégant \(le cas échéant\). Une transaction qui délègue la participation est gratuite.

La période de délégation doit être un sous-ensemble de la période pendant laquelle le délégataire valide le réseau principal.

Notez qu'une fois que vous émettez la transaction pour ajouter un nœud en tant que délégant, il n'y a aucun moyen de modifier les paramètres. **Vous ne pouvez pas annuler la période de stake ou modifier le montant de la mise, l'ID de nœud ou l'adresse de récompense**. Veuillez vous assurer que vous utilisez les valeurs correctes. Si vous n’êtes pas sûr, demandez de l’aide sur [Telegram](https://t.me/Avalanche_fr).

Voir [ici]() pour les paramètres de jalonnement \(staking\) comme le montant minimum qui peut être jalonné..

**Signature**

```cpp
platform.addDelegator(
    {
        nodeID: string,
        startTime: int,
        endTime: int,
        stakeAmount: int,
        rewardAddress: string,
        from: []string, (optional)
        changeAddr: string, (optional)
        username: string,
        password: string
    }
) -> 
{
    txID: string,
    changeAddr: string
}
```

* `nodeID` est l'ID de nœud du délégataire..
* `startTime` est l'heure Unix à laquelle le délégant commence à déléguer.
* `endTime`est l'heure Unix où le délégant arrête de déléguer \(et les AVAX stakeest retourné\).
* `stakeAmount` est la quantité de nAVAX que le délégant jalonne.
* `rewardAddress` est l'adresse à laquelle la récompense du validateur va, s'il y en a une.
* `from` sont les adresses que vous souhaitez utiliser pour cette opération. En cas d'omission, utilise l'une de vos adresses au besoin.
* `changeAddr` est l'adresse à laquelle tout changement sera envoyé. En cas d'omission, la modification est envoyée à l'une des adresses contrôlées par l'utilisateur.
* `username` est l'utilisateur qui paie les frais de transaction.
* `password` est l' `username`mot de passe.
* `txID`est l'ID de transaction

**Example d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.addDelegator",
    "params": {
        "nodeID":"NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ",
        "rewardAddress":"P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy",
        "startTime":1594102400,
        "endTime":1604102400,
        "stakeAmount":100000,
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"username",
        "password":"password"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "6pB3MtHUNogeHapZqMUBmx6N38ii3LzytVDrXuMovwKQFTZLs",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

### platform.addValidator

Ajoutez un validateur au réseau principal. Vous devez stake des AVAX pour ce faire. Si le nœud est suffisamment correct et réactif lors de la validation, vous recevez une récompense une fois la validation terminée. La probabilité du validateur d’être échantillonné par d’autres validateurs lors du consensus est proportionnelle à la quantité d’AVAX jalonnée.

Le validateur peut facturer des frais aux délégués; le premier reçoit un pourcentage de la récompense de validation du délégant \(le cas échéant\). Les frais de délégation minimum sont de 2%. Une transaction qui ajoute un validateur est gratuite.

La période de validation doit être comprise entre 2 semaines et 1 an.

Un poids total maximum est imposé aux validateurs. Cela signifie qu'aucun validateur n'aura jamais plus d'AVAX jalonné et délégué que cette valeur. Cette valeur sera initialement réglée sur min `min(5 * amount staked, 3M AVAX)`. La valeur totale d'un validateur est de 3 millions d'AVAX.

Notez qu'une fois que vous émettez la transaction pour ajouter un nœud en tant que validateur, il n'y a aucun moyen de modifier les paramètres. Vous ne pouvez pas annuler la mise tôt ou modifier le montant de la mise, l'ID de nœud ou l'adresse de récompense. Veuillez vous assurer que vous utilisez les valeurs correctes. Si vous n’êtes pas sûr, demandez de l’aide sur [Telegram](https://t.me/Avalanche_fr).

Voir [ici]() pour les paramètres de jalonnement \(staking\) comme le montant minimum qui peut être jalonné.

**Signature**

```cpp
platform.addValidator(
    {
        nodeID: string,
        startTime: int,
        endTime: int,
        stakeAmount: int,
        rewardAddress: string,
        from: []string, (optional)
        changeAddr: string, (optional)
        delegationFeeRate: float,
        username: string,
        password: string
    }
) -> 
{
    txID: string,
    changeAddr: string
}
```

* `nodeID` est l'ID de nœud du validateur ajouté.
* `startTime` est l'heure Unix à laquelle le validateur commence à valider le réseau primaire.
* `endTime` st l'heure Unix où le validateur arrête de valider le réseau primaire \(et les AVAX stake sont retournés\).
* `stakeAmount` est la quantité de nAVAX que le validateur jalonne.
* `rewardAddress`est l'adresse à laquelle la récompense du validateur ira, s'il y en a une.
* `from` sont les adresses que vous souhaitez utiliser pour cette opération. En cas d'omission, utilise l'une de vos adresses au besoin.
* `changeAddr` est l'adresse à laquelle tout changement sera envoyé. En cas d'omission, la modification est envoyée à l'une des adresses contrôlées par l'utilisateur.
* `delegationFeeRate` est le pourcentage de frais facturé par ce validateur lorsque d'autres lui délèguent la participation. Jusqu'à 4 décimales autorisées; les décimales supplémentaires sont ignorées. Doit être compris entre 0 et 100 inclus. Par exemple, si `DelegationFeeRate` vaut `1,2345` et que quelqu'un délègue à ce validateur, alors lorsque la période de délégation est terminée, 1,2345% de la récompense va au validateur et le reste va au délégant.
* `username` est l'utilisateur qui paie les frais de transaction.
* `password`est l' `username`mot de passe.
* `txID` est l'ID de transaction

**Example d'un Appel**

Dans cet exemple, nous utilisons `date` de la commande shell pour calculer les temps Unix 10 minutes et 2 jours dans le futur. \(Remarque: si vous utilisez un Mac, remplacez`$(date` avec `$(gdate`. Si vous n'avez pas installé `gdate`, faites`brew install coreutils`.\)

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.addValidator",
    "params": {
        "nodeID":"NodeID-ARCLrphAHZ28xZEBfUL7SVAmzkTZNe1LK",
        "rewardAddress":"P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy",
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "startTime":'$(date --date="10 minutes" +%s)',
        "endTime":'$(date --date="2 days" +%s)',
        "stakeAmount":1000000,
        "delegationFeeRate":10,
        "username":"username",
        "password":"password"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "6pb3mthunogehapzqmubmx6n38ii3lzytvdrxumovwkqftzls",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

### platform.addSubnetValidator

Ajoutez un validateur à un sous-réseau autre que le réseau principal. Le validateur doit valider le réseau principal pendant toute la durée de validation de ce sous-réseau.

**Signature**

```text
platform.addSubnetValidator(
    {
        nodeID: string,
        subnetID: string,
        startTime: int,
        endTime: int,
        weight: int,
        from: []string, (optional)
        changeAddr: string, (optional)
        username: string,
        password: string
    }
) -> 
{
    txID: string,
    changeAddr: string,
}
```

* `nodeID` est l'ID de nœud du validateur.
* `subnetID` est le sous-réseau qu'ils valideront.
* `startTime` est l'heure Unix à laquelle le validateur commence à valider le sous-réseau.
* `endTime` est l'heure unix à laquelle le validateur arrête de valider le sous-réseau.
* `weight` est le poids du validateur utilisé pour l’échantillonnage.
* `from` sont les adresses que vous souhaitez utiliser pour cette opération. En cas d'omission, utilise l'une de vos adresses au besoin.
* `changeAddr`est l'adresse à laquelle tout changement sera envoyé. En cas d'omission, la modification est envoyée à l'une des adresses contrôlées par l'utilisateur.
* `username` est l'utilisateur qui paie les frais de transaction.
* `password` est l' `username`mot de passe.
* `txID`est l'ID de transaction.

**Example d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.addSubnetvalidator",
    "params": {
        "nodeID":"NodeID-7xhw2mdxuds44j42tcb6u5579esbst3lg",
        "subnetID":"zbfoww1ffkpvrfywpj1cvqrfnyesepdfc61hmu2n9jnghduel",
        "startTime":1583524047,
        "endTime":1604102399,
        "weight":1,
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"username",
        "password":"password"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID": "2exafyvRNSE5ehwjhafBVt6CTntot7DFjsZNcZ54GSxBbVLcCm",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    }
}
```

### platform.createAddress

Créez une nouvelle adresse contrôlée par l'utilisateur donné.

**Signature**

```cpp
platform.createAddress({
    username: string,
    password:string
}) -> {address: string}
```

**Example d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createAddress",
    "params": {
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "P-avax12lqey27sfujqq6mc5a3jr5av56cjsu8hg2d3hx"
    },
    "id": 1
}
```

### platform.createBlockchain

Créez une nouvelle blockchain. Actuellement, prend uniquement en charge la création de nouvelles instances de l'AVM et de la machine virtuelle d'horodatage.

**Signature**

```cpp
platform.createBlockchain(
    {
        subnetID: string,
        vmID: string,
        name: string,
        genesisData: string,
        from: []string, (optional)
        changeAddr: string, (optional)
        username: string,
        password:string
    }
) -> 
{
    txID: string,
    changeAddr: string
}
```

* `subnetID`est l'ID du sous-réseau qui valide la nouvelle blockchain. Le sous-réseau doit exister et ne peut pas être le réseau principal.
* `vmID` est l'ID de la machine virtuelle exécutée par la blockchain. Peut également être un alias de la machine virtuelle.
* `name` est un nom lisible par l'homme pour la nouvelle blockchain. Pas nécessairement unique.
* `genesisData` est la représentation de base 58 \(avec somme de contrôle\) de l'état de genèse de la nouvelle blockchain. Les machines virtuelles doivent avoir une méthode d'API statique nommée `buildGenesis` qui peut être utilisée pour générer `genesisData`
* `from` sont les adresses que vous souhaitez utiliser pour cette opération. En cas d'omission, utilise l'une de vos adresses au besoin.
* `changeAddr`est l'adresse à laquelle tout changement sera envoyé. En cas d'omission, la modification est envoyée à l'une des adresses contrôlées par l'utilisateur.
* `username` est l'utilisateur qui paie les frais de transaction.
* `password` est l' `username`mot de passe.
* `txID`est l'ID de transaction.

**Example d'un Appel**

Dans cet exemple, nous créons une nouvelle instance de la machine virtuelle Timestamp. `genesisData` provient de l'appel de `timestamp.buildGenesis`.

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createBlockchain",
    "params" : {
        "vmID":"timestamp",
        "SubnetID":"2bRCr6B4MiEfSjidDwxDpdCyviwnfUVqB2HGwhm947w9YYqb7r",
        "name":"My new timestamp",
        "genesisData": "45oj4CqFViNHUtBxJ55TZfqaVAXFwMRMj2XkHVqUYjJYoTaEM",
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"username",
        "password":"password"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2TBnyFmST7TirNm6Y6z4863zusRVpWi5Cj1sKS9bXTUmu8GfeU",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

### platform.createSubnet

Créer un sous-réseau \(Subnet\)

L'ID du sous-réseau est le même que l'ID de dans la transaction.

**Signature**

```text
platform.createSubnet(
    {
        controlKeys: []string,
        threshold: int,
        from: []string, (optional)
        changeAddr: string, (optional)
        username: string,
        password: string
    }
) -> 
{
    txID: string,
    changeAddr: string
}
```

* Afin de créer ajouter un validateur à ce sous-réseau, des signatures `thresold` sont requises à partir des adresses dans `controlKeys`
* `from` sont les adresses que vous souhaitez utiliser pour cette opération. En cas d'omission, utilise l'une de vos adresses au besoin.
* `changeAddr`est l'adresse à laquelle tout changement sera envoyé. En cas d'omission, la modification est envoyée à l'une des adresses contrôlées par l'utilisateur.
* `username` est l'utilisateur qui paie les frais de transaction.
* `password` est l' `username`mot de passe.
* `txID`est l'ID de transaction.

**Example d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createSubnet",
    "params": {
        "controlKeys":[
            "P-avax13xqjvp8r2entvw5m29jxxjhmp3hh6lz8laep9m",
            "P-avax165mp4efnel8rkdeqe5ztggspmw4v40j7pfjlhu"
        ],
        "threshold":2,
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"username",
        "password":"password"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

**Exemple de Réponse**

```text
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "hJfC5xGhtjhCGBh1JWn3vZ51KJP696TZrsbadPHNbQG2Ve5yd"
    },
    "id": 1
}
```

### platform.exportAVAX

Envoyez des AVAX depuis une adresse sur la P-Chain vers une adresse sur la X-Chain. Après avoir émis cette transaction, vous devez appeler la méthode [`importAVAX`](avm-api-x-chain.md) de la X-Chain pour terminer le transfert.

**Signature**

```text
platform.exportAVAX(
    {
        amount: int,
        from: []string, (optional)
        to: string,
        changeAddr: string, (optional)
        username: string,
        password:string
    }
) -> 
{
    txID: string,
    changeAddr: string
}
```

* `amount` est la quantité de nAVAX à envoyer.
* `to` est l'adresse sur la chaîne X à laquelle envoyer l'AVAX
* `from` sont les adresses que vous souhaitez utiliser pour cette opération. En cas d'omission, utilise l'une de vos adresses au besoin.
* `changeAddr`est l'adresse à laquelle tout changement sera envoyé. En cas d'omission, la modification est envoyée à l'une des adresses contrôlées par l'utilisateur.
* `username` est l'utilisateur qui paie les frais de transaction.
* `password` est l' `username`mot de passe.
* `txID`est l'ID de transaction.

**Example d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.exportAVAX",
    "params": {
        "to":"X-avax1yv8cwj9kq3527feemtmh5gkvezna5xys08mxet",
        "amount":1,
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"username",
        "password":"password"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2Kz69TNBSeABuaVjKa6ZJCTLobbe5xo9c5eU8QwdUSvPo2dBk3",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

### platform.exportKey

Obtenez la clé privée qui contrôle une adresse donnée.   
La clé privée retournée peut être ajoutée à un utilisateur avec `platform.importKey`.

**Signature**

```cpp
platform.exportKey({
    username: string,
    password:string,
    address:string
}) -> {privateKey: string}
```

* `username` l'utilisateur qui contrôle l' `address`.
* `password` est l' `username`mot de passe
* `privateKey` est le string de la representation de la clé privée qui contrôle l' `address`.

**Example d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.exportKey",
    "params" :{
        "username" :"username",
        "password":"password",
        "address": "P-avax1zwp96clwehpwm57r9ftzdm7rnuslrunj68ua3r"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "privateKey":"PrivateKey-Lf49kAJw3CbaL783vmbeAJvhscJqC7vi5yBYLxw2XfbzNS5RS"
    }
}
```

### platform.getBalance

Obtenez le solde d'AVAX contrôlé par une adresse donnée.

**Signature**

```cpp
platform.getBalance({
    address:string
}) -> {
    balance: string,
    unlocked: string,
    lockedStakeable: string,
    lockedNotStakeable: string,
    utxoIDs: []{
        txID: string,
        outputIndex: int
        }
    }
}
```

* `address` est l'adresse dont vous souhaitez obtenir le solde.
* `balance` est le solde total, dans nAVAX.
* `unlocked` est la balance déverrouillée, dans nAVAX.
* `lockedStakeable` est la balance de la stake verrouillée, en nAVAX.
* `lockedNotStakeable` est la balance verouillée et non stake, en nAVAX.
* `utxoIDs` sont les ID des UTXO à cette`address`de référence.

**Example d'un Appel**

```cpp
curl -X POST --data '{
  "jsonrpc":"2.0",
  "id"     : 1,
  "method" :"platform.getBalance",
  "params" :{
      "address":"P-avax1m8wnvtqvthsxxlrrsu3f43kf9wgch5tyfx4nmf"
  }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "balance": "20000000000000000",
        "unlocked": "10000000000000000",
        "lockedStakeable": "10000000000000000",
        "lockedNotStakeable": "0",
        "utxoIDs": [
            {
                "txID": "11111111111111111111111111111111LpoYY",
                "outputIndex": 1
            },
            {
                "txID": "11111111111111111111111111111111LpoYY",
                "outputIndex": 0
            }
        ]
    },
    "id": 1
}
```

### platform.getBlockchains

Obtenez toutes les blockchains existantes \(à l'exclusion de la P-Chain\).

**Signature**

```cpp
platform.getBlockchains() ->
{
    blockchains: []{
        id: string,
        name:string,
        subnetID: string,
        vmID: string
    }
}
```

* `blockchains` est l'ensemble des blockchains qui existent sur le réseau Avalanche.
* `name` est le nom lisible par l'homme de cette blockchain.
* `id` est l'ID de la blockchain.
* `subnetID` est l'ID du sous-réseau qui valide cette blockchain.
* `vmID` est l'ID de la machine virtuelle exécutée par la blockchain.

**Example d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getBlockchains",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "blockchains": [
            {
                "id": "mnihvmrJ4MiojP7qhnF3sKR43RJvJbHrbkM8yFoLdwc4nwEqV",
                "name": "AVM",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "jvYyfQTxGMJLuGWa55kdP2p2zSUYsQ5Raupu4TW34ZAUBAbtq"
            },
            {
                "id": "2rWWhAMu2NyNPEHrDNnTfhtdV9MZWKkp1L5D6ANWnhAkJAkosN",
                "name": "Athereum",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "mgj786NP7uDwBCcq6YwThhaN8FLyybkCa4zBWTQbNgmK6k9A6"
            },
            {
                "id": "CqhF97NNugqYLiGaQJ2xckfmkEr8uNeGG5TQbyGcgnZ5ahQwa",
                "name": "Simple DAG Payments",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "sqjdyTKUSrQs1YmKDTUbdUhdstSdtRTGRbUn8sqK8B6pkZkz1"
            },
            {
                "id": "VcqKNBJsYanhVFxGyQE5CyNVYxL3ZFD7cnKptKWeVikJKQkjv",
                "name": "Simple Chain Payments",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "sqjchUjzDqDfBPGjfQq2tXW1UCwZTyvzAWHsNzF2cb1eVHt6w"
            },
            {
                "id": "2SMYrx4Dj6QqCEA3WjnUTYEFSnpqVTwyV3GPNgQqQZbBbFgoJX",
                "name": "Simple Timestamp Server",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH"
            },
            {
                "id": "KDYHHKjM4yTJTT8H8qPs5KXzE6gQH5TZrmP1qVr1P6qECj3XN",
                "name": "My new timestamp",
                "subnetID": "2bRCr6B4MiEfSjidDwxDpdCyviwnfUVqB2HGwhm947w9YYqb7r",
                "vmID": "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH"
            },
            {
                "id": "2TtHFqEAAJ6b33dromYMqfgavGPF3iCpdG3hwNMiart2aB5QHi",
                "name": "My new AVM",
                "subnetID": "2bRCr6B4MiEfSjidDwxDpdCyviwnfUVqB2HGwhm947w9YYqb7r",
                "vmID": "jvYyfQTxGMJLuGWa55kdP2p2zSUYsQ5Raupu4TW34ZAUBAbtq"
            }
        ]
    },
    "id": 1
}
```

### platform.getBlockchainStatus

Obtenez le statut d'une blockchain.

**Signature**

```cpp
platform.getBlockchainStatus(
    {
        blockchainID: string
    }
) -> {status: string}
```

`status` est l'un des :

* `Validating`: la blockchain est en cours de validation par ce nœud.
* `Created`: la blockchain existe mais n'est pas validée par ce nœud.
* `Preferred`: la blockchain a été proposée pour être créée et est susceptible d'être créée, mais la transaction n'est pas encore acceptée.
* `Unknown`: la blockchain n'a pas été proposée ou la proposition de la créer n'est pas préférée. La proposition peut être soumise à nouveau.

**Example d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getBlockchainStatus",
    "params":{
        "blockchainID":"2NbS4dwGaf2p1MaXb65PrkZdXRwmSX4ZzGnUu7jm3aykgThuZE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "status": "Created"
    },
    "id": 1
}
```

### platform.getCurrentValidators

Répertoriez les validateurs actuels du sous-réseau donné. 

Le champ de niveau supérieur `delegators` sont obsolètes à partir de la v1.0.1. Si vous l'utilisez, vous devez arrêter de l'utiliser. Au lieu de cela, chaque élément de v`alidators` contient maintenant la liste des délégués pour ce validateur. Vous devriez obtenir des informations sur les délégués de cette façon à l'avenir.

**Signature**

```cpp
platform.getCurrentValidators({subnetID: string}) ->
{
    validators: []{
        startTime: string,
        endTime: string,
        stakeAmount: string, (optional)
        nodeID: string,
        weight: string, (optional)
        rewardOwner: {
            locktime: string,
            threshold: string,
            addresses: string[]
        },
        potentialReward: string,
        delegationFee: string,
        uptime: string,
        connected: boolean,
        delegators: []{
            startTime: string,
            endTime: string,
            stakeAmount: string, (optional)
            nodeID: string,
            rewardOwner: {
                locktime: string,
                threshold: string,
                addresses: string[]
            },
            potentialReward: string,
        }
    },
    delegators: []{
        startTime: string,
        endTime: string,
        stakeAmount: string, (optional)
        nodeID: string,
        rewardOwner: {
            locktime: string,
            threshold: string,
            addresses: string[]
        },
        potentialReward: string,
    }
}
```

* `subnetID` est le sous-réseau dont les validateurs actuels sont renvoyés. Si omis, retourne les validateurs actuels du réseau primaire.
* `validators`:
  * `startTime`est l'heure Unix à laquelle le validateur commence à valider le sous-réseau.
  * `endTime` est l'heure Unix à laquelle le validateur arrête de valider le sous-réseau.
  * `stakeAmount` est la quantité de nAVAX mis en jeu par ce validateur. Omis si subnetID n'est pas le réseau principal.
  * `nodeID` est l'ID de nœud du validateur.
  * `weight`est le poids du validateur lors de l’échantillonnage des validateurs.  Si omis`subnetID` est le réseau principal.
  * `rewardOwner` est un`OutputOwners` de la sortie qui comprend le `locktime`, `threshold` et un tableau des `addresses`.
  * `potentialReward` est la récompense potentielle obtenue grâce au jalonnement.
  * `delegationFeeRate` est le pourcentage de frais facturé par ce validateur lorsque d'autres lui délèguent la participation.
  * `uptime` est le% de temps pendant lequel le nœud interrogé a signalé le pair comme étant en ligne.
  * `connected`est si le nœud est connecté au réseau
  * `delegators`est la liste des déléguateurs à ce validateur.
* `delegators`: \(**deprecated as of v1.0.1. See note at top of method documentation.**\)

  * `startTime` est l'heure Unix à laquelle le délégateur a démarré.
  * `endTime` est l'heure Unix à laquelle le délégateur s'arrête.
  * `stakeAmount`est la quantité de nAVAX mis en jeu par ce délégateur. Si subnetID omis n'est pas le réseau principal.
  * `nodeID` est l'ID de nœud du validateur.



  * `rewardOwner` est un`OutputOwners` de la sortie qui comprend le `locktime`, `threshold` et un tableau des `addresses`.
  * `potentialReward` est la récompense potentielle obtenue grâce au jalonnement.

**Example d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getCurrentValidators",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "validators": [
            {
                "startTime": "1600368632",
                "endTime": "1602960455",
                "stakeAmount": "2000000000000",
                "nodeID": "NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD",
                "rewardOwner": {
                    "locktime": "0",
                    "threshold": "1",
                    "addresses": [
                        "P-avax18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u"
                    ]
                },
                "potentialReward": "117431493426",
                "delegationFee": "10.0000",
                "uptime": "0.0000",
                "connected": false,
                "delegators": [
                    {
                        "startTime": "1600368523",
                        "endTime": "1602960342",
                        "stakeAmount": "25000000000",
                        "nodeID": "NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD",
                        "rewardOwner": {
                            "locktime": "0",
                            "threshold": "1",
                            "addresses": [
                                "P-avax18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u"
                            ]
                        },
                        "potentialReward": "11743144774"
                    }
                ]
            }

        ],
        "delegators": [
            {
                "startTime": "1600368523",
                "endTime": "1602960342",
                "stakeAmount": "25000000000",
                "nodeID": "NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD",
                "rewardOwner": {
                    "locktime": "0",
                    "threshold": "1",
                    "addresses": [
                        "P-avax18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u"
                    ]
                },
                "potentialReward": "11743144774"
            }
        ]
    },
    "id": 1
}
```

### platform.getHeight

Renvoie la hauteur du dernier bloc accepté.

**Signature**

```cpp
platform.getHeight() ->
{
      height: int,
}
```

**Example d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getHeight",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "height": "56"
    },
    "id": 1
}
```

### platform.getMinStake

Obtenez la quantité minimale d'AVAX requise pour valider le réseau principal et la quantité minimale d'AVAX pouvant être déléguée.

**Signature**

```cpp
platform.getMinStake() -> 
{
    minValidatorStake : uint64,
    minDelegatorStake : uint64
}
```

**Example d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getMinStake"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "minValidatorStake": "2000000000000",
        "minDelegatorStake": "25000000000"
    },
    "id": 1
}
```

### platform.getPendingValidators

Répertoriez les validateurs dans l'ensemble de validateurs en attente du sous-réseau spécifié. Chaque validateur ne valide pas actuellement le sous-réseau, mais le fera à l'avenir.

**Signature**

```cpp
platform.getPendingValidators({subnetID: string}) ->
{
    validators: []{
        startTime: string,
        endTime: string,
        stakeAmount: string, (optional)
        nodeID: string
        delegationFee: string,
        connected: bool,
        weight: string, (optional)
    },
    delegators: []{
        startTime: string,
        endTime: string,
        stakeAmount: string,
        nodeID: string
    }
}
```

* `subnetID` est le sous-réseau dont les validateurs actuels sont renvoyés. Si omis, retourne les validateurs actuels du réseau primaire.
* `validators`:
  * `startTime`est l'heure Unix à laquelle le validateur commence à valider le sous-réseau.
  * `endTime` est l'heure Unix à laquelle le validateur arrête de valider le sous-réseau.
  * `stakeAmount` est la quantité de nAVAX mis en jeu par ce validateur. Omis si subnetID n'est pas le réseau principal.
  * `nodeID` est l'ID de nœud du validateur.
  * `weight`est le poids du validateur lors de l’échantillonnage des validateurs.  Si omis`subnetID` est le réseau principal.
* `delegators`: \(**deprecated as of v1.0.1. See note at top of method documentation.**\)
  * `startTime` est l'heure Unix à laquelle le délégateur a démarré.
  * `endTime` est l'heure Unix à laquelle le délégateur s'arrête.
  * `stakeAmount`est la quantité de nAVAX mis en jeu par ce délégateur. Si subnetID omis n'est pas le réseau principal.
  * `nodeID` est l'ID de nœud du validateur.

**Example d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "validators": [
            {
                "startTime": "1600368632",
                "endTime": "1602960455",
                "stakeAmount": "200000000000",
                "nodeID": "NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD",
                "delegationFee": "10.0000",
                "connected": false
            }
        ],
        "delegators": [
            {
                "startTime": "1600368523",
                "endTime": "1602960342",
                "stakeAmount": "20000000000",
                "nodeID": "NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg"
            }
        ]
    },
    "id": 1
}
```

### platform.getStakingAssetID

Récupérez un assetID pour l'élément de jalonnement d'un sous-réseau. Actuellement, cela renvoie toujours le assetID de jalonnement du réseau principal.

**Signature**

```cpp
platform.getStakingAssetID() ->
{
    assetID: string
}
```

`assetID` est l'ID de l'élément de jalonnement d'un sous-réseau

**Example d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getStakingAssetID",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "assetID": "2fombhL7aGPwj3KH4bfrmJwW6PVnMobf9Y2fn9GwxiAAJyFDbe"
    },
    "id": 1
}
```

### platform.getSubnets

Obtenez tous les sous-réseaux existants.

**Signature**

```cpp
platform.getSubnets(
    {ids: []string}
) ->
{
    subnets: []{
            id: string,
            controlKeys: []string,
            threshold: string
    }
}
```

* `ids` sont les identifiants des sous-réseaux sur lesquels obtenir des informations. Si omis, obtient des informations sur tous les sous-réseaux.
* `id` est l'ID du sous-réseau.
* `threshold` les signatures des adresses de `controlKeys` qui sont nécessaires pour ajouter un validateur au sous-réseau.

Voir [ici](../tutoriels/plateforme/instalation-ovh-de-a-a-z.md#181d) pour plus d'informations sur l'ajout d'un validateur à un sous-réseau.  


**Example d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getSubnets",
    "params": {"ids":["hW8Ma7dLMA7o4xmJf3AXBbo17bXzE7xnThUd3ypM4VAWo1sNJ"]},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "subnets": [
            {
                "id": "hW8Ma7dLMA7o4xmJf3AXBbo17bXzE7xnThUd3ypM4VAWo1sNJ",
                "controlKeys": [
                    "KNjXsaA1sZsaKCD1cd85YXauDuxshTes2",
                    "Aiz4eEt5xv9t4NCnAWaQJFNz5ABqLtJkR"
                ],
                "threshold": "2"
            }
        ]
    },
    "id": 1
}'
```

### platform.getStake

Obtenez la quantité de nAVAX jalonnée par un ensemble d'adresses. Le montant retourné n'inclut pas les récompenses de mise.

**Signature**

```cpp
platform.getStake({addresses: []string}) -> {stake: int}
```

**Example d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getStake",
    "params": {
        "addresses": [
            "P-everest1g3ea9z5kmkzwnxp8vr8rpjh6lqw4r0ufec460d",
            "P-everest12un03rm579fewele99c4v53qnmymwu46dv3s5v"
        ]
    },
    "id": 1
}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "staked": "5000000"
    },
    "id": 1
}
```

### platform.getTx

Obtient une transaction par son ID.

**Signature**

```cpp
platform.getTx({txID: string} -> {tx: string})
```

**Example d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTx",
    "params": {
        "txID":"TAG9Ns1sa723mZy1GSoGqWipK6Mvpaj7CAswVJGM6MkVJDF9Q"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "tx": "111117XV7Rm5EoKbwXFJp5WWWouAENJcF1zXGxPDPCfTbpiLfwkUXcoHKnfzdXz7sRgGYeaVtJkcD9MNgGuKGXsyWEWpTK2zAToEf64ezp7r7SyvyL7RqC5oqvNbRDShn5hm9pDV4JTCjZR5RzAxjBEJZ2V8eqtU6jvpsJMHxNBtCwL6Atc1t2Dt7s5nqf7wdbFUBvwKXppBb2Yps8wUvtTKQifssMUAPygc2Rv4rGd9LRANk4JTiT15qzUjXX7zSzz16pxdBXc4jp2Z2UJRWbdxZdaybL3mYCFj197bBnYieRYzRohaUEpEjGcohrmkSfHB8S2eD74o2r66sVGdpXYo95vkZeayQkrMRit6unwWBx8FJR7Sd7GysxS9A3CiMc8cL4oRmr7XyvcFCrnPbUZK7rnN1Gtq3MN8k4JVvX6DuiFAS7xe61jY3VKJAZM9Lg3BgU6TAU3gZ"
    },
    "id": 1
}
```

### platform.getTxStatus

Obtient le statut d'une transaction par son ID.

**Signature**

```cpp
platform.getTxStatus({txID: string} -> {status: string})
```

**Example d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTxStatus",
    "params": {
        "txID":"TAG9Ns1sa723mZy1GSoGqWipK6Mvpaj7CAswVJGM6MkVJDF9Q"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "result": "Committed",
    "id": 1
}
```

### platform.getUTXOs

Obtient les UTXO qui référencent une adresse d'ensemble donnée.

**Signature**

```cpp
platform.getUTXOs(
    {
        addresses: string,
        limit: int, (optional)
        startIndex: { (optional )
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

* `utxos` est une liste d'UTXO telle que chaque UTXO référence au moins une adresse dans les `addresses`.
* Au maximum `limit` UTXOs sont retournées. Si `limit` est omise ou supérieure à 1024, elle est définie sur 1024.
* Cette méthode prend en charge la pagination. `endIndex` désigne le dernier UTXO renvoyé. Pour obtenir le prochain ensemble d'UTXO, utilisez la valeur de `endIndex` comme `startIndex` lors de l'appel suivant.
* Si `startIndex` est omis, récupérera tous les UTXO jusqu'à la `limit`.
* Lors de l'utilisation de la pagination \(c'est-à-dire lorsque`startIndex` est fourni\), les UTXO ne sont pas garantis d'être uniques sur plusieurs appels. Autrement dit, un UTXO peut apparaître dans le résultat du premier appel, puis à nouveau dans le deuxième appel.
* Lors de l'utilisation de la pagination, la cohérence n'est pas garantie sur plusieurs appels. Autrement dit, l'ensemble UTXO des adresses peut avoir changé entre les appels.

**Example**

Supposons que nous voulons que tous les UTXO référencent au moins un des`P-avax1s994jad0rtwvlfpkpyg2yau9nxt60qqfv023qx` et `P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr`.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getUTXOs",
    "params" :{
        "addresses":["P-avax1s994jad0rtwvlfpkpyg2yau9nxt60qqfv023qx", "P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr"],
        "limit":5
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
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
            "address": "P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr",
            "utxo": "kbUThAUfmBXUmRgTpgD6r3nLj7rJUGho6xyht5nouNNypH45j"
        }
    },
    "id": 1
}
```

puisque `numFetched` est identique à `limit`, nous pouvons dire qu'il peut y avoir plus d'UTXO qui n'ont pas été récupérés. Nous appelons à nouveau la méthode, cette fois avec `startIndex`:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getUTXOs",
    "params" :{
        "addresses":["P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr"],
        "limit":5,
        "startIndex": {
            "address": "P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr",
            "utxo": "kbUThAUfmBXUmRgTpgD6r3nLj7rJUGho6xyht5nouNNypH45j"
        }
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
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
            "address": "P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr",
            "utxo": "21jG2RfqyHUUgkTLe2tUp6ETGLriSDTW3th8JXFbPRNiSZ11jK"
        }
    },
    "id": 1
}
```

Puisque `numFetched` est moins que la `limit`, nous savons que nous avons fini de récupérer les UTXO et que nous n'avons pas besoin d'appeler à nouveau cette méthode.

Suppose we want to fetch the UTXOs exported from the X-Chain to the P-Chain in order to build an `ImportTx`. Then we need to call `GetUTXOs` with the `sourceChain` argument in order to retrieve the atomic UTXOs:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getUTXOs",
    "params" :{
        "addresses":["P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr"],
        "sourceChain": "X"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

La réponse donne :

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "numFetched": "1",
        "utxos": [
            "115P1k9aSVFBfi9siZZz135jkrBCdEMZMbZ82JaLLuML37cgVMvGwefFXr2EaH2FML6mZuCehMLDdXSVE5aBwc8ePn8WqtZgDv9W641JZoLQhWY8fmvitiBLrc3Zd1aJPDxPouUVXFmLEbmcUnQxfw1Hyz1jpPbWSioowb"
        ],
        "endIndex": {
            "address": "P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr",
            "utxo": "S5UKgWoVpoGFyxfisebmmRf8WqC7ZwcmYwS7XaDVZqoaFcCwK"
        }
    },
    "id": 1
}
```

### platform.importAVAX

Effectuez un transfert d'AVAX de la X-Chain vers la P-Chain.

Avant d’appeler cette méthode, vous devez appeler la méthode [`exportAVAX`](avm-api-x-chain.md) de X-Chain pour lancer le transfert.

**Signature**

```cpp
platform.importAVAX(
    {
        from: []string, (optional)
        to: string,
        changeAddr: string, (optional)
        sourceChain: string,
        username: string,
        password: string
    }
) -> 
{
    tx: string,
    changeAddr: string
}
```

* `to` est l'ID de l'adresse vers laquelle l'AVAX est importé. Cela doit être le même que l'argument `to` dans l'appel correspondant à l'`exportAVAX` X-Chain.
* `sourceChain` est l'ID ou l'alias de la chaîne à partir de laquelle l'AVAX est importé. Pour importer des fonds de la X-Chain, utilisez `"X"`.
* `from` sont les adresses que vous souhaitez utiliser pour cette opération. En cas d'omission, utilise l'une de vos adresses au besoin.
* `changeAddr` est l'adresse à laquelle tout changement sera envoyé. En cas d'omission, la modification est envoyée à l'une des adresses contrôlées par l'utilisateur.
* `username` est l'utilisateur qui contrôle l'adresse spécifiée dans `to`.
* `password` est l' `username`mot de passe.

**Example d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.importAVAX",
    "params": {
        "sourceChain":"X",
        "to":"P-avax1apzq2zt0uaaatum3wdz83u4z7dv4st7l5m5n2a",
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"bob",
        "password":"loblaw"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "P63NjowXaQJXt5cmspqdoD3VcuQdXUPM5eoZE2Vcg63aVEx8R",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

### platform.importKey

Donnez à un utilisateur le contrôle d'une adresse en fournissant la clé privée qui contrôle l'adresse.

**Signature**

```cpp
platform.importKey({
    username: string,
    password:string,
    privateKey:string
}) -> {address: string}
```

* Ajoutez `privateKey` à `username` au set des clés privées. `address` est l'adresse d' `username` qui contrôle désormais avec la clé privée.

**Example d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.importKey",
    "params" :{
        "username" :"bob",
        "password":"loblaw",
        "privateKey":"PrivateKey-2w4XiXxPfQK4TypYqnohRL8DRNTz9cGiGmwQ1zmgEqD9c9KWLq"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "address":"P-avax19hwpvkx2p5q99w87dlpfhqpt3czyh8ywasfaym"
    }
}
```

### platform.listAddresses

Répertoriez les adresses contrôlées par l'utilisateur donné.

**Signature**

```cpp
platform.listAddresses({
    username: string,
    password: string
}) -> {addresses: []string}
```

**Example d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.listAddresses",
    "params": {
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "addresses": ["P-avax1ffksh2m592yjzwfp2xmdxe3z4ushln9s09z5p0"]
    },
    "id": 1
}
```

### platform.sampleValidators

Exemples de validateurs du sous-réseau spécifié.

**Signature**

```text
platform.sampleValidators(
    {
        size: int,
        subnetID: string
    }
) ->
{
    validators:[size]string
}
```

* `size` est le nombre de validateurs à échantillonner.
* `subnetID` est le sous-réseau à partir duquel échantillonner. En cas d'omission, la valeur par défaut est le réseau principal.
* Chaque élément de`validators` est l'ID d'un validateur.

**Example d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.sampleValidators",
    "params" :{
        "size":2
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "validators":[
            "NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ",
            "NodeID-NFBbbJ4qCmNaCzeW7sxErhvWqvEQMnYcN"
        ]
    }
}
```

### platform.validatedBy

Obtenez le sous-réseau qui valide une blockchain donnée.

**Signature**

```cpp
platform.validatedBy(
    {
        blockchainID: string
    }
) -> {subnetID: string}
```

* `blockchainID` est l'ID de la blockchain.
* `subnetID` est l'ID du sous-réseau qui valide la blockchain.

**Example d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.validatedBy",
    "params": {
        "blockchainID": "KDYHHKjM4yTJTT8H8qPs5KXzE6gQH5TZrmP1qVr1P6qECj3XN"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "subnetID": "2bRCr6B4MiEfSjidDwxDpdCyviwnfUVqB2HGwhm947w9YYqb7r"
    },
    "id": 1
}
```

### platform.validates

Obtenez les ID des blockchains qu'un sous-réseau valide.

**Signature**

```cpp
platform.validates(
    {
        subnetID: string
    }
) -> {blockchainIDs: []string}
```

* `subnetID` est l'ID du sous-réseau.
* Chaque élément de`blockchainIDs` est l'ID d'une blockchain que le sous-réseau valide.

**Example d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.validates",
    "params": {
        "subnetID":"2bRCr6B4MiEfSjidDwxDpdCyviwnfUVqB2HGwhm947w9YYqb7r"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "blockchainIDs": [
            "KDYHHKjM4yTJTT8H8qPs5KXzE6gQH5TZrmP1qVr1P6qECj3XN",
            "2TtHFqEAAJ6b33dromYMqfgavGPF3iCpdG3hwNMiart2aB5QHi"
        ]
    },
    "id": 1
}
```

