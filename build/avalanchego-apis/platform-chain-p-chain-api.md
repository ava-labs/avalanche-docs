# API de la chaîne de la plateforme \(P-Chain\)

Cette API permet aux clients d'interagir avec la [P-Chain](../../learn/platform-overview/#platform-chain-p-chain), qui maintient le jeu de [validateur](../../learn/platform-overview/staking.md#validators) d'Avalanche et gère la création de blockchain.

## Endpoint

```cpp
/ext/P
```

## Format

Cette API utilise le format `json 2.0`RPC.

## Méthodes

### platform.addDelegator

Ajoutez un délégué au réseau primaire.

Un délégué stagne AVAX et spécifie un validateur \(le délégué\) à valider en leur nom. Le delegatee a une probabilité accrue d'être échantillonné par d'autres validateurs \(poids\) en proportion de la participation qui leur est déléguée.

Le délégué facture une redevance au délégué; le premier reçoit un pourcentage de la récompense de validation du délégué \(le cas échéant\). Une transaction que les délégués sont en jeu n'a pas de frais.

La période de délégation doit être un sous-ensemble de la période que le délégué valide le réseau principal.

Notez qu'une fois que vous émettez la transaction pour ajouter un nœud en tant que délégué, il n'y a pas moyen de changer les paramètres.** Vous ne pouvez pas supprimer un jeu de hasard ou changer le montant de la pique, l'ID de nœud ou l'adresse de récompense.** Assurez-vous que vous utilisez les valeurs correctes. Si vous n'êtes pas sûr, consultez notre [FAQ](https://support.avalabs.org/en/collections/2618154-developer-faq) des développeurs ou demandez de l'aide sur [Discord.](https://chat.avalabs.org/)

{% page-ref page="../../learn/platform-overview/staking.md" %}

#### **Signature**

```cpp
platform.addDelegator(
    {
        nodeID: string,
        startTime: int,
        endTime: int,
        stakeAmount: int,
        rewardAddress: string,
        from: []string, //optional
        changeAddr: string, //optional
        username: string,
        password: string
    }
) ->
{
    txID: string,
    changeAddr: string
}
```

* `nodeID`est l'ID du nœud à déléguer.
* `startTime`est le moment Unix où le délégué commence à déléguer.
* `endTime`est l'heure d'Unix où le délégué cesse de déléguer \(et Unix staké est renvoyé\).
* `stakeAmount`est la quantité de nAVAX que le délégué est en train de staker.
* `rewardAddress`l'adresse est l'objet de la récompense du validateur s'il y en a un.
* `from`sont les adresses que vous souhaitez utiliser pour cette opération. Si omis, utilise l'une de vos adresses au besoin.
* `changeAddr`est l'adresse que tout changement sera envoyé. Si omis, le changement est envoyé à l'une des adresses contrôlées par l'utilisateur.
* `username`est l'utilisateur qui paie les frais de transaction.
* `password`est le mot de passe de `username`l'autre.
* `txID`est l'ID de la transaction

#### **Exemple**

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
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Exemple**

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

Ajoutez un validateur au réseau primaire. Vous devez piquer AVAX pour le faire. Si le nœud est suffisamment correct et adapté au moment de la validation, vous recevez une récompense lorsque la fin de la période de jalonnement est atteinte. La probabilité que le validateur soit échantillonnée par d'autres validateurs au cours du consensus est proportionnelle à la quantité d'AVAX staké.

Le validateur facture une redevance aux délégués ; le premier reçoit un pourcentage de la récompense de validation du délégué \(le cas échéant\). La taxe de délégation minimale est de 2 %. Une transaction qui ajoute un validateur n'a pas de frais.

La période de validation doit être de 2 semaines à 1 an.

Il y a un poids total maximal imposé aux validateurs. Cela signifie qu'aucun validateur ne sera jamais plus d'AVAX jalonné et délégué à elle que cette valeur. Cette valeur sera initialement définie sur `min(5 * amount staked, 3M AVAX)`. La valeur totale sur un validateur est de 3 millions d'AVAX.

Notez qu'une fois que vous émettez la transaction pour ajouter un nœud en tant que validateur, il n'y a pas moyen de changer les paramètres.** Vous ne pouvez pas supprimer les pics rapidement ou changer le montant de la pique, l'ID de nœud ou l'adresse de récompense.** Assurez-vous que vous utilisez les valeurs correctes. Si vous n'êtes pas sûr, consultez notre [FAQ](https://support.avalabs.org/en/collections/2618154-developer-faq) des développeurs ou demandez de l'aide sur [Discord.](https://chat.avalabs.org/)

{% page-ref page="../../learn/platform-overview/staking.md" %}

#### **Signature**

```cpp
platform.addValidator(
    {
        nodeID: string,
        startTime: int,
        endTime: int,
        stakeAmount: int,
        rewardAddress: string,
        delegationFeeRate: float,
        from: []string, //optional
        changeAddr: string, //optional
        username: string,
        password: string
    }
) ->
{
    txID: string,
    changeAddr: string
}
```

* `nodeID`est l'ID de nœud du validateur qui est ajouté.
* `startTime`est l'heure d'Unix où le validateur commence à valider le réseau primaire.
* `endTime`est l'heure d'Unix où le validateur cesse de valider le réseau primaire \(et Unix staked est renvoyé\).
* `stakeAmount`est la quantité de nAVAX que le validateur est en train de staking.
* `rewardAddress`est l'adresse que la récompense du validateur va faire, s'il en existe un.
* `delegationFeeRate`est la redevance en pourcentage que ce validateur facture lorsque d'autres délèguent des piqûres à eux. Jusqu'à 4 décimales autorisées; d'autres décimales sont ignorées. Doit être comprise entre 0 et 100, inclusivement. `delegationFeeRate``1.2345`Par exemple, si le est et si quelqu'un délègue à ce validateur, puis lorsque la période de délégation est terminée, 1,2345 % de la récompense va au validateur et le reste va au délégué.
* `from`sont les adresses que vous souhaitez utiliser pour cette opération. Si omis, utilise l'une de vos adresses au besoin.
* `changeAddr`est l'adresse que tout changement sera envoyé. Si omis, le changement est envoyé à l'une des adresses contrôlées par l'utilisateur.
* `username`est l'utilisateur qui paie les frais de transaction.
* `password`est le mot de passe de `username`l'autre.
* `txID`est l'ID de la transaction

#### **Exemple**

Dans cet exemple, nous utilisons la commande shell `date`pour calculer Unix fois 10 minutes et 2 jours à l'avenir. \(Remarque : si vous êtes sur un Mac, remplacez `$(date`par .`$(gdate` Si vous n'avez pas `gdate`installé, `brew install coreutils`faites.\)

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
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Exemple**

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

Ajoutez un validateur à un sous-réseau autre que le réseau primaire. Le validateur doit valider le réseau primaire pour toute la durée qu'il validera ce sous-réseau.

#### **Signature**

```cpp
platform.addSubnetValidator(
    {
        nodeID: string,
        subnetID: string,
        startTime: int,
        endTime: int,
        weight: int,
        from: []string, //optional
        changeAddr: string, //optional
        username: string,
        password: string
    }
) ->
{
    txID: string,
    changeAddr: string,
}
```

* `nodeID`est l'ID de nœud du validateur.
* `subnetID`est le sous-réseau qu'ils valident.
* `startTime`est l'heure unix où le validateur commence à valider le sous-réseau.
* `endTime`est l'heure unix où le validateur cesse de valider le sous-réseau.
* `weight`est le poids du validateur utilisé pour l'échantillonnage.
* `from`sont les adresses que vous souhaitez utiliser pour cette opération. Si omis, utilise l'une de vos adresses au besoin.
* `changeAddr`est l'adresse que tout changement sera envoyé. Si omis, le changement est envoyé à l'une des adresses contrôlées par l'utilisateur.
* `username`est l'utilisateur qui paie les frais de transaction.
* `password`est le mot de passe de `username`l'autre.
* `txID`est l'ID de transaction.

#### **Exemple d'appel**

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
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Exemple de réponse**

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

#### **Signature**

```cpp
platform.createAddress({
    username: string,
    password: string
}) -> {address: string}
```

#### **Exemple**

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

#### **Exemple**

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

Créez une nouvelle blockchain. Actuellement ne prend en charge la création de nouvelles instances de l'AVM et du Timestamp VM.

#### **Signature**

```cpp
platform.createBlockchain(
    {
        subnetID: string,
        vmID: string,
        name: string,
        genesisData: string,
        encoding: string, //optional
        from: []string, //optional
        changeAddr: string, //optional
        username: string,
        password: string
    }
) ->
{
    txID: string,
    changeAddr: string
}
```

* `subnetID`est l'ID du Subnet qui valide la nouvelle blockchain. Le sous-réseau doit exister et ne peut pas être le réseau principal.
* `vmID`est l'ID de la machine virtuelle que les blockchain s'exécutent. Peut également être un alias de la machine virtuelle.
* `name`est un nom lisible par l'homme pour la nouvelle blockchain. Pas nécessairement unique.
* `genesisData`est la représentation par octets de l'état de genèse de la nouvelle blockchain encodé dans le format spécifié par le `encoding`paramètre.
* `encoding`spécifie le format à utiliser pour .`genesisData` Peut être soit "cb58" ou "hex". Par défaut pour "cb58". Les machines virtuelles devraient avoir une méthode d'API statique nommée `buildGenesis`qui peut être utilisé pour générer`genesisData`
* `from`sont les adresses que vous souhaitez utiliser pour cette opération. Si omis, utilise l'une de vos adresses au besoin.
* `changeAddr`est l'adresse que tout changement sera envoyé. Si omis, le changement est envoyé à l'une des adresses contrôlées par l'utilisateur.
* `username`est l'utilisateur qui paie les frais de transaction. Cet utilisateur doit avoir un nombre suffisant de clés de contrôle du sous-réseau.
* `password`est le mot de passe de `username`l'autre.
* `txID`est l'ID de transaction.

#### **Exemple**

Dans cet exemple, nous créons une nouvelle instance de la machine virtuelle Timestamp. `genesisData`est venu de l'appeler.`timestamp.buildGenesis`

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createBlockchain",
    "params" : {
        "vmID":"timestamp",
        "subnetID":"2bRCr6B4MiEfSjidDwxDpdCyviwnfUVqB2HGwhm947w9YYqb7r",
        "name":"My new timestamp",
        "genesisData": "45oj4CqFViNHUtBxJ55TZfqaVAXFwMRMj2XkHVqUYjJYoTaEM",
        "encoding": "cb58",
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Exemple**

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

Créer un nouveau sous-réseau.

L'ID du sous-réseau est la même que l'ID de cette transaction.

#### **Signature**

```cpp
platform.createSubnet(
    {
        controlKeys: []string,
        threshold: int,
        from: []string, //optional
        changeAddr: string, //optional
        username: string,
        password: string
    }
) ->
{
    txID: string,
    changeAddr: string
}
```

* Afin d'ajouter un validateur à ce sous-réseau, des `threshold`signatures sont requises à partir des adresses de`controlKeys`
* `from`sont les adresses que vous souhaitez utiliser pour cette opération. Si omis, utilise l'une de vos adresses au besoin.
* `changeAddr`est l'adresse que tout changement sera envoyé. Si omis, le changement est envoyé à l'une des adresses contrôlées par l'utilisateur.
* `username`est l'utilisateur qui paie les frais de transaction.
* `password`est le mot de passe de `username`l'autre.

#### **Exemple**

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
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Exemple**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "hJfC5xGhtjhCGBh1JWn3vZ51KJP696TZrsbadPHNbQG2Ve5yd"
    },
    "id": 1
}
```

### platform.exportAVAX

Envoyez AVAX depuis une adresse sur la P-Chain à une adresse sur la X-Chain. Après avoir émis cette transaction, vous devez appeler la [`avm.importAVAX`](exchange-chain-x-chain-api.md#avm-importavax)méthode de X-Chain pour compléter le transfert.

#### **Signature**

```cpp
platform.exportAVAX(
    {
        amount: int,
        from: []string, //optional
        to: string,
        changeAddr: string, //optional
        username: string,
        password: string
    }
) ->
{
    txID: string,
    changeAddr: string
}
```

* `amount`est la quantité de nAVAX à envoyer.
* `to`l'adresse est sur la chaîne X, pour envoyer the à
* `from`sont les adresses que vous souhaitez utiliser pour cette opération. Si omis, utilise l'une de vos adresses au besoin.
* `changeAddr`est l'adresse que tout changement sera envoyé. Si omis, le changement est envoyé à l'une des adresses contrôlées par l'utilisateur.
* `username`l'utilisateur envoie user et paie les frais de transaction.
* `password`est le mot de passe de `username`l'autre.
* `txID`est l'ID de cette transaction.

#### **Exemple**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.exportAVAX",
    "params": {
        "to":"X-avax1yv8cwj9kq3527feemtmh5gkvezna5xys08mxet",
        "amount":1,
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Exemple**

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

Obtenez la clé privée qui contrôle une adresse donnée.   La clé privée renvoyée peut être ajoutée à l'utilisateur avec [`platform.importKey`](platform-chain-p-chain-api.md#platform-importkey).

#### **Signature**

```cpp
platform.exportKey({
    username: string,
    password: string,
    address: string
}) -> {privateKey: string}
```

* `username`l'utilisateur qui contrôle .`address`
* `password`est le mot de passe de `username`l'autre.
* `privateKey`est la représentation de la chaîne de la clé privée qui contrôle .`address`

#### **Exemple**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.exportKey",
    "params" :{
        "username" :"myUsername",
        "password": "myPassword",
        "address": "P-avax1zwp96clwehpwm57r9ftzdm7rnuslrunj68ua3r"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Exemple**

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

#### **Signature**

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
```

* `address`est l'adresse pour obtenir le solde de.
* `balance`est l'équilibre total, en nAVAX.
* `unlocked`est l'équilibre déverrouillé, dans nAVAX.
* `lockedStakeable`est l'équilibre en jeu verrouillé, dans nAVAX.
* `lockedNotStakeable`est l'équilibre verrouillé et non stakeable dans nAVAX.
* `utxoIDs`sont les ID des UTXOs cette référence .`address`

#### **Exemple**

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

#### **Exemple**

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

Obtenez toutes les blockchains qui existent \(à l'exclusion de la P-Chain\).

#### **Signature**

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

* `blockchains`est toutes les blockchains qui existent sur le réseau d'Avalanche.
* `name`est le nom lisible par l'homme de cette blockchain.
* `id`est l'ID de la blockchain.
* `subnetID`est l'ID du Sous-réseau qui valide cette blockchain.
* `vmID`est l'ID de la machine virtuelle que les blockchain s'exécutent.

#### **Exemple**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getBlockchains",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Exemple**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "blockchains": [
            {
                "id": "2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM",
                "name": "X-Chain",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "jvYyfQTxGMJLuGWa55kdP2p2zSUYsQ5Raupu4TW34ZAUBAbtq"
            },
            {
                "id": "2q9e4r6Mu3U68nU1fYjgbR6JvwrRx36CohpAX5UQxse55x1Q5",
                "name": "C-Chain",
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

Obtenez l'état d'une blockchain.

#### **Signature**

```cpp
platform.getBlockchainStatus(
    {
        blockchainID: string
    }
) -> {status: string}
```

`status`est l'un des

* `Validating`: La blockchain est validée par ce nœud.
* `Created`: La blockchain existe mais n'est pas validée par ce nœud.
* `Preferred`: La blockchain a été proposée pour être créée et est susceptible d'être créée mais la transaction n'est pas encore acceptée.
* `Unknown`: La blockchain n'a pas été proposée ou la proposition de la créer n'est pas préférée. La proposition peut être soumise de nouveau à la proposition.

#### **Exemple**

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

#### **Exemple**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "status": "Created"
    },
    "id": 1
}
```

### platform.getCurrentSupply

Retourne un lien supérieur sur le nombre d'AVAX qui existent. Il s'agit d'un blind, parce qu'il ne rend pas compte des jetons brûlés, y compris les frais de transaction.

#### **Signature**

```cpp
platform.getCurrentSupply() -> {supply: int}
```

* `supply`est un lien supérieur sur le nombre d'AVAX qui existent, libellé en nAVAX.

#### **Exemple**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getCurrentSupply",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Exemple**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "supply": "365865167637779183"
    },
    "id": 1
}
```

La réponse dans cet exemple indique que l'offre d'AVAX, est au plus 365.865 millions de personnes.

### platform.getCurrentValidators

Lisez les validateurs actuels du sous-réseau donné.

Le champ de premier niveau a `delegators`été d[eprecated ](deprecated-api-calls.md#getcurrentvalidators)à partir de v1.0.1, et supprimé en v1.0.6. Au lieu de cela, chaque élément de `validators`maintenant contient la liste des délégués pour ce validateur.

#### **Signature**

```cpp
platform.getCurrentValidators({
    subnetID: string, //optional
    nodeIDs: string[], //optional
}) -> {
    validators: []{
        txID: string,
        startTime: string,
        endTime: string,
        stakeAmount: string, //optional
        nodeID: string,
        weight: string, //optional
        rewardOwner: {
            locktime: string,
            threshold: string,
            addresses: string[]
        },
        potentialReward: string,
        delegationFee: string,
        uptime: string,
        connected: bool,
        delegators: []{
            txID: string,
            startTime: string,
            endTime: string,
            stakeAmount: string, //optional
            nodeID: string,
            rewardOwner: {
                locktime: string,
                threshold: string,
                addresses: string[]
            },
            potentialReward: string,
        }
    }
}
```

* `subnetID`est le sous-réseau dont les validateurs actuels sont renvoyés. Si omis, retourne les validateurs actuels du réseau primaire.
* `nodeIDs`est une liste des nœuds d'ID des validateurs actuels à demander. Si l'omission est effectuée, tous les validateurs actuels sont renvoyés. Si un nodeID spécifié n'est pas dans l'ensemble de validateurs en cours, il ne sera pas inclus dans la réponse.
* `validators`:
   * `txID`est la transaction de validateur.
   * `startTime`est l'heure d'Unix où le validateur commence à valider le sous-réseau.
   * `endTime`est l'heure d'Unix où le validateur cesse de valider le sous-réseau.
   * `stakeAmount`est la quantité de nAVAX que ce validateur a staké. Omis si ce `subnetID`n'est pas le réseau principal.
   * `nodeID`est l'ID de nœud du validateur.
   * `weight`est le poids du validateur lorsque les validateurs d'échantillonnage. Omis si `subnetID`est le réseau principal.
   * `rewardOwner`est une `OutputOwners`sortie qui comprend , et `locktime``threshold`un tableau de .`addresses`
   * `potentialReward`est la récompense potentielle gagnée de la staking
   * `delegationFeeRate`est la redevance en pourcentage que ce validateur facture lorsque d'autres délèguent des piqûres à eux.
   * `uptime`est le % de temps que le nœud interrogé a signalé le pair comme en ligne.
   * `connected`est si le nœud est connecté au réseau
   * `delegators`est la liste des délégués à ce validateur :
      * `txID`est la transaction de délégués.
      * `startTime`est l'heure d'Unix lorsque le délégué a commencé.
      * `endTime`est l'heure d'Unix lorsque le délégué s'arrête.
      * `stakeAmount`est la quantité de nAVAX que ce délégué a staké. Omis si ce `subnetID`n'est pas le réseau principal.
      * `nodeID`est l'ID de nœud de validateur du nœud.
      * `rewardOwner`est une `OutputOwners`sortie qui comprend , et `locktime``threshold`un tableau de .`addresses`
      * `potentialReward`est la récompense potentielle gagnée de la staking
* `delegators`: **\(deprecated à partir de v1.0.1. Voir la note en haut de la documentation de la **méthode.\)

#### **Exemple**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getCurrentValidators",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Exemple**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "validators": [
            {
                "txID": "2NNkpYTGfTFLSGXJcHtVv6drwVU2cczhmjK2uhvwDyxwsjzZMm",
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
                        "txID": "Bbai8nzGVcyn2VmeYcbS74zfjJLjDacGNVuzuvAQkHn1uWfoV",
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
        ]
    },
    "id": 1
}
```

### platform.getHeight

Retourne la hauteur du dernier bloc accepté.

#### **Signature**

```cpp
platform.getHeight() ->
{
    height: int,
}
```

#### **Exemple**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getHeight",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Exemple**

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

Obtenez la quantité minimale d'AVAX nécessaire pour valider le réseau primaire et la quantité minimale d'AVAX qui peut être déléguée.

#### **Signature**

```cpp
platform.getMinStake() ->
{
    minValidatorStake : uint64,
    minDelegatorStake : uint64
}
```

#### **Exemple**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getMinStake"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Exemple**

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

Inscrivez les validateurs dans l'ensemble de validateur en instance du sous-réseau spécifié. Chaque validateur n'est pas en train de valider le sous-réseau, mais le sera à l'avenir.

#### **Signature**

```cpp
platform.getPendingValidators({
    subnetID: string, //optional
    nodeIDs: string[], //optional
}) -> {
    validators: []{
        txID: string,
        startTime: string,
        endTime: string,
        stakeAmount: string, //optional
        nodeID: string,
        delegationFee: string,
        connected: bool,
        weight: string, //optional
    },
    delegators: []{
        txID: string,
        startTime: string,
        endTime: string,
        stakeAmount: string,
        nodeID: string
    }
}
```

* `subnetID`est le sous-réseau dont les validateurs actuels sont renvoyés. Si omis, retourne les validateurs actuels du réseau primaire.
* `nodeIDs`est une liste des nœuds d'ID des validateurs en attente à demander. Si l'omission est effectuée, tous les validateurs en instance sont renvoyés. Si un nodeID spécifié n'est pas dans l'ensemble de validateurs en attente, il ne sera pas inclus dans la réponse.
* `validators`:
   * `txID`est la transaction de validateur.
   * `startTime`est l'heure d'Unix où le validateur commence à valider le sous-réseau.
   * `endTime`est l'heure d'Unix où le validateur cesse de valider le sous-réseau.
   * `stakeAmount`est la quantité de nAVAX que ce validateur a staké. Omis si ce `subnetID`n'est pas le réseau principal.
   * `nodeID`est l'ID de nœud du validateur.
   * `connected`si le nœud est connecté.
   * `weight`est le poids du validateur lorsque les validateurs d'échantillonnage. Omis si `subnetID`est le réseau principal.
* `delegators`:
   * `txID`est la transaction de délégués.
   * `startTime`est l'heure Unix lorsque le délégué commence.
   * `endTime`est l'heure d'Unix lorsque le délégué s'arrête.
   * `stakeAmount`est la quantité de nAVAX que ce délégué a staké. Omis si ce `subnetID`n'est pas le réseau principal.
   * `nodeID`est l'ID de nœud de validateur du nœud.

#### **Exemple**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Exemple**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "validators": [
            {
                "txID": "2NNkpYTGfTFLSGXJcHtVv6drwVU2cczhmjK2uhvwDyxwsjzZMm",
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
                "txID": "Bbai8nzGVcyn2VmeYcbS74zfjJLjDacGNVuzuvAQkHn1uWfoV",
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

### platform.getRewardUTXOs

Retourne les UTXOs qui ont été récompensés après la fin de la période de jalonnement ou de délégation de la transaction fournie.

#### **Signature**

```cpp
platform.getRewardUTXOs({
    txID: string,
    encoding: string //optional
}) -> {
    numFetched: integer,
    utxos: []string,
    encoding: string
}
```

* `txID`est l'ID de la transaction de jalonnement ou de déléguer
* `numFetched`est le nombre de UTXOs retourné
* `utxos`est un tableau de récompenses encodées UTXOs
* `encoding`spécifie le format pour les UTXOs. retournés. Peut être soit "cb58" ou "hex" et par défaut vers "cb58".

#### **Exemple**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getRewardUTXOs",
    "params": {
        "txID": "2nmH8LithVbdjaXsxVQCQfXtzN9hBbmebrsaEYnLM9T32Uy2Y5"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Exemple**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "numFetched": "2",
        "utxos": [
            "11Zf8cc55Qy1rVgy3t87MJVCSEu539whRSwpdbrtHS6oh5Hnwv1gz8G3BtLJ73MPspLkD83cygZufT4TPYZCmuxW5cRdPrVMbZAHfb6uyGM1jNGBhBiQAgQ6V1yceYf825g27TT6WU4bTdbniWdECDWdGdi84hdiqSJH2y",
            "11Zf8cc55Qy1rVgy3t87MJVCSEu539whRSwpdbrtHS6oh5Hnwv1NjNhqZnievVs2kBD9qTrayBYRs81emGTtmnu2wzqpLstbAPJDdVjf3kjwGWywNCdjV6TPGojVR5vHpJhBVRtHTQXR9VP9MBdHXge8zEBsQJAoZhTbr2"
        ],
        "encoding": "cb58"
    },
    "id": 1
}
```

### platform.getStakingAssetID

Récupérez un identifiant d'actif pour l'actif de jalonnement d'un sous-réseau. Actuellement, cela ne retourne que l'identifiant de jalonnement du réseau principal.

#### **Signature**

```cpp
platform.getStakingAssetID({
    subnetID: string //optional
}) -> {
    assetID: string
}
```

* `subnetID`est le sous-réseau dont l'identifiant d'actif est demandé.
* `assetID`est l'identifiant d'actif pour l'étalonnage d'un sous-réseau.

#### **Exemple**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getStakingAssetID",
    "params": {
        "subnetID": "11111111111111111111111111111111LpoYY"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Exemple**

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

Obtenez des informations sur les sous-réseaux.

#### **Signature**

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

* `ids`sont les ID des sous-réseaux pour obtenir des informations sur. Si omis, obtient des informations sur tous les sous-réseaux.
* `id`est l'ID du Subnet.
* `threshold`Les signatures d'adresses `controlKeys`sont nécessaires pour ajouter un validateur au sous-réseau.

Consultez [ici](../tutorials/nodes-and-staking/add-a-validator.md) pour des informations sur l'ajout d'un validateur sur un sous-réseau.

#### **Exemple**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getSubnets",
    "params": {"ids":["hW8Ma7dLMA7o4xmJf3AXBbo17bXzE7xnThUd3ypM4VAWo1sNJ"]},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Exemple**

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

Obtenez la quantité de nAVAX jalonnée par un ensemble d'adresses. Le montant retourné ne comprend pas les récompenses de jalonnement.

#### **Signature**

```cpp
platform.getStake({addresses: []string}) -> {staked: int}
```

#### **Exemple**

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

#### **Exemple**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "staked": "5000000"
    },
    "id": 1
}
```

### platform.getTotalStake

Obtenez la quantité totale de nAVAX staked sur le réseau primaire.

#### **Signature**

```cpp
platform.getTotalStake() -> {stake: int}
```

#### **Exemple**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTotalStake",
    "params": {},
    "id": 1
}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Exemple**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "stake": "279825917679866811"
    },
    "id": 1
}
```

### platform.getTx

Fait une transaction par son ID.

`encoding`Paramètre facultatif pour spécifier le format de la transaction retournée. Peut être soit "cb58" ou "hex". Par défaut pour "cb58".

#### **Signature**

```cpp
platform.getTx({
    txID: string,
    encoding: string //optional
}) -> {
    tx: string,
    encoding: string,
}
```

#### **Exemple**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTx",
    "params": {
        "txID":"TAG9Ns1sa723mZy1GSoGqWipK6Mvpaj7CAswVJGM6MkVJDF9Q",
        "encoding": "cb58"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Exemple**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "tx": "111117XV7Rm5EoKbwXFJp5WWWouAENJcF1zXGxPDPCfTbpiLfwkUXcoHKnfzdXz7sRgGYeaVtJkcD9MNgGuKGXsyWEWpTK2zAToEf64ezp7r7SyvyL7RqC5oqvNbRDShn5hm9pDV4JTCjZR5RzAxjBEJZ2V8eqtU6jvpsJMHxNBtCwL6Atc1t2Dt7s5nqf7wdbFUBvwKXppBb2Yps8wUvtTKQifssMUAPygc2Rv4rGd9LRANk4JTiT15qzUjXX7zSzz16pxdBXc4jp2Z2UJRWbdxZdaybL3mYCFj197bBnYieRYzRohaUEpEjGcohrmkSfHB8S2eD74o2r66sVGdpXYo95vkZeayQkrMRit6unwWBx8FJR7Sd7GysxS9A3CiMc8cL4oRmr7XyvcFCrnPbUZK7rnN1Gtq3MN8k4JVvX6DuiFAS7xe61jY3VKJAZM9Lg3BgU6TAU3gZ",
        "encoding": "cb58"
    },
    "id": 1
}
```

### platform.getTxStatus

Obtient le statut d'une transaction par son identité. Si la transaction a été abandonnée, la réponse inclura un `reason`champ avec plus d'informations pour lesquelles la transaction a été abandonnée.

Voir [ici](deprecated-api-calls.md#gettxstatus) pour obtenir des notes sur le comportement précédent.

#### **Signature**

```cpp
platform.getTxStatus({
    txID: string
}) -> {status: string}
```

`status`est l'un des

* `Committed`: la transaction est \(ou sera acceptée\) par chaque nœud
* `Processing`: la transaction est votée par ce nœud
* `Dropped`: La transaction ne sera jamais acceptée par aucun nœud du réseau, vérifiez le `reason`champ pour plus d'informations
* `Unknown`: La transaction n'a pas été vue par ce nœud

#### **Exemple**

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

#### **Exemple**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "status": "Committed"
    },
    "id": 1
}
```

### platform.getUTXOs

Permet aux UTXOs de faire référence à un ensemble d'adresses donné.

#### **Signature**

```cpp
platform.getUTXOs(
    {
        addresses: []string,
        limit: int, //optional
        startIndex: { //optional
            address: string,
            utxo: string
        },
        sourceChain: string, //optional
        encoding: string, //optional
    },
) ->
{
    numFetched: int,
    utxos: []string,
    endIndex: {
        address: string,
        utxo: string
    },
    encoding: string,
}
```

* `utxos`est une liste des UTXO de telle sorte que chaque UTXO fait référence à au moins une adresse en .`addresses`
* Au plus tard, les `limit`UTXOs sont de retour. Si elle `limit`est omise ou supérieure à 1024, elle est fixée à 1024.
* Cette méthode prend en charge la pagination. `endIndex`indique le dernier UTXO retourné. Pour obtenir le prochain jeu of utilisez la valeur de `endIndex`comme `startIndex`dans l'appel suivant.
* Si `startIndex`est omis, va récupérer tous les UTXOs jusqu'à .`limit`
* Lors de l'utilisation de la pagination \(c'est-à-dire lorsque le cas `startIndex`échéant\), les UTXOs ne sont pas garantis pour être unique sur les appels multiples. Autrement dit, un UTXO peut apparaître dans le résultat du premier appel, et puis de nouveau dans le second appel.
* Lors de l'utilisation de la pagination, la cohérence n'est pas garantie sur les appels multiples. Autrement dit, l'ensemble d'adresses UTXO peut avoir changé d'appel.
* `encoding`spécifie le format pour les UTXOs. retournés. Peut être soit "cb58" ou "hex" et par défaut vers "cb58".

#### **Exemple**

Supposons que nous voulons tous les UTXOs qui font référence à au moins un de `P-avax1s994jad0rtwvlfpkpyg2yau9nxt60qqfv023qx`et .`P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr`

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getUTXOs",
    "params" :{
        "addresses":["P-avax1s994jad0rtwvlfpkpyg2yau9nxt60qqfv023qx", "P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr"],
        "limit":5,
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

Ceci donne une réponse:

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
        },
        "encoding": "cb58"
    },
    "id": 1
}
```

Puisque c'est la même chose que , `limit`nous pouvons dire qu'il peut y avoir `numFetched`d'autres UTXOs qui n'ont pas été récupérés. Nous rappelons la méthode de nouveau, cette fois avec `startIndex`:

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
        },
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

Ceci donne une réponse:

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
        },
        "encoding": "cb58"
    },
    "id": 1
}
```

Puisque `numFetched`est moins que , nous savons que nous avons fait la recherche UTXOs et que `limit`nous n'avons pas besoin de rappeler cette méthode de nouveau.

Supposons que nous voulons récupérer les UTXOs exportés de la chaîne X vers la chaîne P afin de construire une importation. Ensuite, nous devons appeler GetUTXOs avec l'argument sourceChain afin de récupérer les GetUTXOs atomiques :

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getUTXOs",
    "params" :{
        "addresses":["P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr"],
        "sourceChain": "X",
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

Ceci donne une réponse:

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
        },
        "encoding": "cb58"
    },
    "id": 1
}
```

### platform.importAVAX

Complétez un transfert d'AVAX de la X-Chain vers la P-Chain.

Avant que cette méthode ne soit appelée, vous devez appeler la [`avm.exportAVAX`](exchange-chain-x-chain-api.md#avm-exportavax)méthode de X-Chain pour initier le transfert.

#### **Signature**

```cpp
platform.importAVAX(
    {
        from: []string, //optional
        to: string,
        changeAddr: string, //optional
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

* `to`est l'ID de l'adresse que of est importé. Cela doit être le même que `to`l'argument de l'appel correspondant à la X-Chain’s .`exportAVAX`
* `sourceChain`est l'ID ou les alias de la chaîne que of est importé. Pour importer des fonds depuis la X-Chain, utilisez `"X"`.
* `from`sont les adresses que vous souhaitez utiliser pour cette opération. Si omis, utilise l'une de vos adresses au besoin.
* `changeAddr`est l'adresse que tout changement sera envoyé. Si omis, le changement est envoyé à l'une des adresses contrôlées par l'utilisateur.
* `username`l'utilisateur qui contrôle l'adresse spécifiée dans .`to`
* `password`est le mot de passe de `username`l'autre.

#### **Exemple**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.importAVAX",
    "params": {
        "sourceChain": "X",
        "to": "P-avax1apzq2zt0uaaatum3wdz83u4z7dv4st7l5m5n2a",
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username": "myUsername",
        "password": "myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Exemple**

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

Donnez à un utilisateur un contrôle sur une adresse en fournissant la clé privée qui contrôle l'adresse.

#### **Signature**

```cpp
platform.importKey({
    username: string,
    password: string,
    privateKey:string
}) -> {address: string}
```

* Ajouter `privateKey`à la série de clés privées. `username`L'adresse `address`est `username`maintenant contrôlée par la clé privée.

#### **Exemple**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.importKey",
    "params" :{
        "username": "myUsername",
        "password": "myPassword",
        "privateKey": "PrivateKey-2w4XiXxPfQK4TypYqnohRL8DRNTz9cGiGmwQ1zmgEqD9c9KWLq"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Exemple**

```cpp
{
    "jsonrpc":"2.0",
    "id": 1,
    "result": {
        "address":"P-avax19hwpvkx2p5q99w87dlpfhqpt3czyh8ywasfaym"
    }
}
```

### platform.issueTx

Émission une transaction à la chaîne de la plateforme.

#### **Signature**

```cpp
platform.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {txID: string}
```

* `tx`est la représentation des octets d'une transaction.
* `encoding`spécifie le format d'encodage pour les octets. Peut être soit "cb58" ou "hex". Par défaut pour "cb58".
* `txID`est l'ID de la transaction.

#### **Exemple**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.issueTx",
    "params": {
        "tx":"111Bit5JNASbJyTLrd2kWkYRoc96swEWoWdmEhuGAFK3rCAyTnTzomuFwgx1SCUdUE71KbtXPnqj93KGr3CeftpPN37kVyqBaAQ5xaDjr7wVBTUYi9iV7kYJnHF61yovViJF74mJJy7WWQKeRMDRTiPuii5gsd11gtNahCCsKbm9seJtk2h1wAPZn9M1eL84CGVPnLUiLP",
        "encoding": "cb58"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Exemple**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "G3BuH6ytQ2averrLxJJugjWZHTRubzCrUZEXoheG5JMqL5ccY"
    },
    "id": 1
}
```

### platform.listAddresses

Lister les adresses contrôlées par l'utilisateur donné.

#### **Signature**

```cpp
platform.listAddresses({
    username: string,
    password: string
}) -> {addresses: []string}
```

#### **Exemple**

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

#### **Exemple**

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

Échantillonnez les validateurs du sous-réseau spécifié.

#### **Signature**

```cpp
platform.sampleValidators(
    {
        size: int,
        subnetID: string, //optional
    }
) ->
{
    validators: []string
}
```

* `size`est le nombre de validateurs à échantillonner.
* `subnetID`est le sous-réseau à échantillonner. Si omis, il est en défaut de paiement au réseau principal.
* Chaque élément de `validators`est l'ID d'un validateur.

#### **Exemple**

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

#### **Exemple**

```cpp
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "validators":[
            "NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ",
            "NodeID-NFBbbJ4qCmNaCzeW7sxErhvWqvEQMnYcN"
        ]
    }
}
```

### platform.validatedBy

Obtenez le sous-réseau qui valide une blockchain donné.

#### **Signature**

```cpp
platform.validatedBy(
    {
        blockchainID: string
    }
) -> {subnetID: string}
```

* `blockchainID`est l'ID de la blockchain.
* `subnetID`est l'ID du Sous-réseau qui valide la blockchain.

#### **Exemple**

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

#### **Exemple**

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

Obtenez les ID des blockchains un Subnet of

#### **Signature**

```cpp
platform.validates(
    {
        subnetID: string
    }
) -> {blockchainIDs: []string}
```

* `subnetID`est l'ID du Subnet.
* Chaque élément de `blockchainIDs`est l'ID d'une blockchain le Subnet valide.

#### **Exemple**

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

#### **Exemple**

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

