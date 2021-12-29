# API de la chaîne de contrat (C-Chain)

Cette API permet aux clients d'interagir avec la [P-Chain](../../learn/platform-overview/#platform-chain-p-chain), qui maintient l'ensemble de [validateurs](../../learn/platform-overview/staking.md#validators)  d'Avalanche et gère la création de blockchain.

## Point de terminaison

```cpp
/ext/P
```

## Format

Cette API utilise le `json 2.0` format RPC.

## Méthodes

### platform.addDelegator

Ajoutez un délégant au réseau primaire.

Un délégant mise AVAX et spécifie un validateur (le délégataire) pour valider en son nom. Le délégataire a une probabilité accrue d'être échantillonné par d'autres validateurs (poids) en proportion de la mise qui lui est délégué.

Le délégataire facture des frais au délégant ; le premier reçoit un pourcentage de la récompense de validation du délégant (le cas échéant). Une transaction qui délègue une mise n'a pas de frais.

La période de délégation doit être un sous-ensemble de la période pendant laquelle le délégataire valide le réseau primaire.

Notez qu'une fois que vous avez émis la transaction pour ajouter un nœud en tant que délégant, il n'y a aucun moyen de modifier les paramètres. **Vous ne pouvez pas supprimer une mise anticipée ou modifier le montant de la mise, l'ID du nœud ou l'adresse de la récompense.** Veuillez vous assurer que vous utilisez les bonnes valeurs. Si vous n'êtes pas sûr, consultez notre [FAQ du développeur](https://support.avalabs.org/en/collections/2618154-developer-faq) ou demandez de l'aide sur [Discord.](https://chat.avalabs.org/)

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

* `nodeID` est l'ID du nœud à déléguer.
* `startTime` est l'heure d'Unix où le délégant commence à déléguer.
* `endTime` est l'heure d'Unix où le délégant cesse de déléguer (et AVAX misé est retourné).
* `stakeAmount` est la quantité de nAVAX que le délégant mise.
* `rewardAddress` est l'adresse à laquelle la récompense du validateur est envoyée, s'il y en a une.
* `from` sont les adresses que vous souhaitez utiliser pour cette opération. En cas d'omission, utilisez l'une de vos adresses au besoin.
* `changeAddr` l'adresse à laquelle tout changement sera envoyé. En cas d'omission, la modification est envoyée à l'une des adresses contrôlées par l'utilisateur.
* `username` est l'utilisateur qui paie les frais de transaction.
* `password` est le mot de passe de `username`.
* `txID` est l'ID de transaction

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Ajoutez un validateur au réseau primaire. Vous devez miser AVAX pour le faire. Si le nœud est suffisamment correct et réactif lors de la validation, vous recevez une récompense lorsque la fin de la période de staking est atteinte. La probabilité pour le validateur d'être échantillonné par d'autres validateurs pendant le consensus est proportionnelle au montant d'AVAX misé.

Le validateur facture des frais aux délégants ; le premier reçoit un pourcentage de la récompense de la validation du délégant (le cas échéant). Les frais de délégation minimum sont de 2 %. Une transaction qui ajoute un validateur n'a pas de frais.

La période de validation doit être comprise entre 2 semaines et 1 an.

Il y a un poids total maximum imposé sur les validateurs. Cela signifie qu'aucun validateur n'aura jamais plus d'AVAX misé et délégué que cette valeur. Cette valeur sera initialement définie à `min(5 * amount staked, 3M AVAX)`. La valeur totale sur un validateur est de 3 millions d'AVAX.

Notez qu'une fois que vous émettez la transaction pour ajouter un nœud en tant que validateur, il n'y a aucun moyen de modifier les paramètres. **Vous ne pouvez pas annuler la mise plus tôt ni modifier le montant de la mise, l'ID du nœud ou l'adresse de récompense. **Veuillez vous assurer que vous utilisez les bonnes valeurs. Si vous n'êtes pas sûr, consultez notre [FAQ du développeur](https://support.avalabs.org/en/collections/2618154-developer-faq) ou demandez de l'aide sur [Discord.](https://chat.avalabs.org/)

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

* `nodeID` est l'ID du nœud du validateur en cours d'ajout.
* `startTime` est l'heure d'Unix où le validateur commence à valider le réseau principal.
* `endTime` est l'heure d'Unix où le validateur cesse de valider le réseau principal (et AVAX misée est renvoyée).
* `stakeAmount` est la quantité de nAVAX que le validateur mise.
* `rewardAddress` est l'adresse à laquelle la récompense du validateur ira, s'il y en a une.
* `delegationFeeRate` est le pourcentage de frais que ce validateur facture lorsque d'autres lui délèguent la mise. Jusqu'à 4 décimales admises, d'autres décimales sont ignorées. Doit être compris entre 0 et 100, inclus. Par exemple, si `delegationFeeRate` est `1.2345` et que quelqu'un délègue à ce validateur, alors, à la fin de la période de délégation, 1,2345 % de la récompense va au validateur et le reste va au délégant.
* `from` sont les adresses que vous souhaitez utiliser pour cette opération. En cas d'omission, utilisez l'une de vos adresses au besoin.
* `changeAddr` l'adresse à laquelle tout changement sera envoyé. En cas d'omission, la modification est envoyée à l'une des adresses contrôlées par l'utilisateur.
* `username` est l'utilisateur qui paie les frais de transaction.
* `password` est le mot de passe de `username`.
* `txID` est l'ID de transaction

#### **Exemple d'appel**

Dans cet exemple, nous utilisons la commande shell `date` pour calculer les heures Unix 10 minutes et 2 jours dans le futur. (Remarque : si vous êtes sur un Mac, remplacez `$(date` par `$(gdate`. Si `gdate` n'est pas installé, effectuez `brew install coreutils`.)

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

#### **Exemple de réponse**

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

Ajoutez un validateur à un sous-réseau autre que le réseau primaire. Le validateur doit valider le réseau primaire pour toute la durée qu'il valide ce sous-réseau.

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

* `nodeID` est l'ID du nœud du validateur.
* `subnetID` est le sous-réseau qu'il validera.
* `startTime` est l'heure d'unix où le validateur commence à valider le sous-réseau.
* `endTime` est l'heure d'unix où le validateur cesse de valider le sous-réseau.
* `weight` est le poids du validateur utilisé pour l'échantillonnage.
* `from` sont les adresses que vous souhaitez utiliser pour cette opération. En cas d'omission, utilisez l'une de vos adresses au besoin.
* `changeAddr` l'adresse à laquelle tout changement sera envoyé. En cas d'omission, la modification est envoyée à l'une des adresses contrôlées par l'utilisateur.
* `username` est l'utilisateur qui paie les frais de transaction.
* `password` est le mot de passe de `username`.
* `txID` est l'ID de transaction.

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

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Créez une nouvelle blockchain. Actuellement, il ne prend en charge que la création de nouvelles instances du MAV et de la VM d'horodatage.

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

* `subnetID` est l'ID du sous-réseau qui valide la nouvelle blockchain. Le sous-réseau doit exister et ne peut pas être le réseau primaire.
* `vmID` est l'ID de la machine virtuelle sur laquelle fonctionne la blockchain. Peut également être un alias de la machine virtuelle.
* `name` est un nom lisible par l'homme pour la nouvelle blockchain. Pas nécessairement unique.
* `genesisData` est la représentation en octets de l'état de genèse de la nouvelle blockchain codée dans le format indiqué par le paramètre `encoding`.
* `encoding` spécifie le format à utiliser pour `genesisData`. Peut être « cb58 » ou « hex ». Par défaut à « cb58 ». Les machines virtuelles doivent avoir une méthode API statique nommée `buildGenesis` qui peut être utilisée pour générer `genesisData`
* `from` sont les adresses que vous souhaitez utiliser pour cette opération. En cas d'omission, utilisez l'une de vos adresses au besoin.
* `changeAddr` l'adresse à laquelle tout changement sera envoyé. En cas d'omission, la modification est envoyée à l'une des adresses contrôlées par l'utilisateur.
* `username` est l'utilisateur qui paie les frais de transaction. Cet utilisateur doit disposer d'un nombre suffisant de clés de contrôle du sous-réseau.
* `password` est le mot de passe de `username`.
* `txID` est l'ID de transaction.

#### **Exemple d'appel**

Dans cet exemple, nous créons une nouvelle instance de la machine virtuelle timestamp. `genesisData` est venu en appelant `timestamp.buildGenesis`.

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

#### **Exemple de réponse**

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

Créez un nouveau sous-réseau.

L'ID du sous-réseau est le même que l'ID de cette transaction.

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

* Afin d'ajouter un validateur à ce sous-réseau, les signatures `threshold` sont nécessaires à partir des adresses dans `controlKeys`
* `from` sont les adresses que vous souhaitez utiliser pour cette opération. En cas d'omission, utilisez l'une de vos adresses au besoin.
* `changeAddr` l'adresse à laquelle tout changement sera envoyé. En cas d'omission, la modification est envoyée à l'une des adresses contrôlées par l'utilisateur.
* `username` est l'utilisateur qui paie les frais de transaction.
* `password` est le mot de passe de `username`.

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Envoyez AVAX d'une adresse sur la P-Chain à une adresse sur la X-Chain. Après avoir émis cette transaction, vous devez appeler la [`avm.import`](exchange-chain-x-chain-api.md#avm-import)méthode  de la X-Chain avec l'asset ID  `AVAX`pour terminer le transfert.

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

* `amount` est la quantité de nAVAX à envoyer.
* `to` est l'adresse sur la X-Chain pour envoyer l'AVAX
* `from` sont les adresses que vous souhaitez utiliser pour cette opération. En cas d'omission, utilisez l'une de vos adresses au besoin.
* `changeAddr` l'adresse à laquelle tout changement sera envoyé. En cas d'omission, la modification est envoyée à l'une des adresses contrôlées par l'utilisateur.
* `username` est l'utilisateur qui envoie l'AVAX et paie les frais de transaction.
* `password` est le mot de passe de `username`.
* `txID` est l'ID de cette transaction.

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Obtenez la clé privée qui contrôle une adresse donnée. La clé privée renvoyée peut être ajoutée à un utilisateur avec [`platform.importKey`](platform-chain-p-chain-api.md#platform-importkey).

#### **Signature**

```cpp
platform.exportKey({
    username: string,
    password: string,
    address: string
}) -> {privateKey: string}
```

* `username` est l'utilisateur qui contrôle `address`.
* `password` est le mot de passe de `username`.
* `privateKey` est la représentation de la chaîne hexadécimale de la clé privée qui contrôle `address`.

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

* `address` est l'adresse pour obtenir le solde.
* `balance` est le solde total, dans nAVAX.
* `unlocked` est le solde débloqué, dans nAVAX.
* `lockedStakeable` est le solde pouvant être misé débloqué, dans nAVAX.
* `lockedNotStakeable` est le solde débloqué et ne pouvant pas être misé, dans nAVAX.
* `utxoIDs` sont les ID des UTXO qui référencent `address`.

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Obtenez toutes les blockchains qui existent (excluant la P-Chain).

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

* `blockchains` est toutes les blockchains qui existent sur le réseau Avalanche.
* `name` est le nom lisible par l'homme de cette blockchain.
* `id` est l'ID de la blockchain.
* `subnetID` est l'ID du sous-réseau qui valide cette blockchain.
* `vmID` est l'ID de la machine virtuelle sur laquelle fonctionne la blockchain.

#### **Exemple d'appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getBlockchains",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Exemple de réponse**

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

`status` est l'une des :

* `Validating` : la blockchain est validée par ce nœud.
* `Created` : la blockchain existe mais n'est pas validée par ce nœud.
* `Preferred` : la blockchain a été proposée pour être créée et est susceptible d'être créée, mais la transaction n'est pas encore acceptée.
* `Unknown` : la blockchain n'a pas été proposée ou la proposition de la créer n'est pas préférée. La proposition peut être soumise à nouveau.

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Retourne une limite supérieure sur le nombre d'AVAX qui existent. Il s'agit d'une limite supérieure car elle ne tient pas compte des jetons brûlés, y compris les frais de transaction.

#### **Signature**

```cpp
platform.getCurrentSupply() -> {supply: int}
```

* `supply` est une limite supérieure sur le nombre d'AVAX qui existent, libellée dans nAVAX.

#### **Exemple d'appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getCurrentSupply",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Exemple de réponse**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "supply": "365865167637779183"
    },
    "id": 1
}
```

La réponse dans cet exemple indique que l'offre d'AVAX est au maximum de 365,865 millions.

### platform.getCurrentValidators

Listez les validateurs actuels du sous-réseau donné.

Le champ de haut niveau  `delegators` a été [déprécié](deprecated-api-calls.md#getcurrentvalidators) à la v1.0.1, et a été supprimé dans la v1.0.6. Au lieu de cela, chaque élément de `validators` contient maintenant la liste des délégants pour ce validateur.

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

* `subnetID` est le sous-réseau dont les validateurs actuels sont renvoyés. En cas d'omission, renvoie les validateurs actuels du réseau primaire.
* `nodeIDs` est une liste des nodeID des validateurs actuels à demander. En cas d'omission, tous les validateurs actuels sont renvoyés. Si un nodeID spécifié ne fait pas partie de l'ensemble des validateurs actuels, il ne sera pas inclus dans la réponse.
* `validators` :
   * `txID` est la transaction du validateur.
   * `startTime` est l'heure d'Unix où le validateur commence à valider le sous-réseau.
   * `endTime` est l'heure d'Unix où le validateur cesse de valider le sous-réseau.
   * `stakeAmount` est la quantité de nAVAX que ce validateur a misé. Omis si `subnetID` n'est pas le réseau principal.
   * `nodeID` est l'ID du nœud du validateur.
   * `weight` est le poids du validateur lors de l'échantillonnage des validateurs. Omis si`subnetID` n'est pas le réseau principal.
   * `rewardOwner` est une sortie `OutputOwners` qui inclut `locktime`, `threshold` et un tableau de `addresses`.
   * `potentialReward` est la récompense potentielle gagnée du staking
   * `delegationFeeRate` est le pourcentage de frais que ce validateur facture lorsque d'autres lui délèguent la mise.
   * `uptime` est le pourcentage de temps où le nœud interrogé a signalé que le pair était en ligne.
   * `connected` est si le nœud est connecté au réseau
   * `delegators` est la liste des délégants de ce validateur :
      * `txID` est la transaction du délégant.
      * `startTime` est l'heure d'Unix à laquelle le délégant a commencé.
      * `endTime` est l'heure d'Unix où le délégant s'arrête.
      * `stakeAmount` est le montant de nAVAX que ce délégant a misé. Omis si `subnetID` n'est pas le réseau principal.
      * `nodeID`e st l'ID du nœud de validation du nœud.
      * `rewardOwner` est une sortie `OutputOwners` qui inclut `locktime`, `threshold` et un tableau de `addresses`.
      * `potentialReward` est la récompense potentielle gagnée du staking
* `delegators`: (**obsolète à partir de la v1.0.1. Voir la note au haut de la documentation de la méthode.**)

#### **Exemple d'appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getCurrentValidators",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Exemple de réponse**

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

#### **Exemple d'appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getHeight",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Exemple de réponse**

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

Obtenez la quantité minimale d'AVAX requise pour valider le réseau principal et la quantité minimale d'AVAX qui peut être déléguée.

#### **Signature**

```cpp
platform.getMinStake() ->
{
    minValidatorStake : uint64,
    minDelegatorStake : uint64
}
```

#### **Exemple d'appel**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getMinStake"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Exemple de réponse**

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

Listez les validateurs dans l'ensemble du validateur en attente du sous-réseau spécifié. Chaque validateur ne valide pas actuellement le sous-réseau, mais le fera à l'avenir.

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

* `subnetID` est le sous-réseau dont les validateurs actuels sont renvoyés. En cas d'omission, renvoie les validateurs actuels du réseau primaire.
* `nodeIDs`est une liste des nodeID des validateurs en attente à demander. En cas d'omission, tous les validateurs en attente sont renvoyés. Si un nodeID spécifié ne fait pas partie de l'ensemble des validateurs en attente, il ne sera pas inclus dans la réponse.
* `validators` :
   * `txID` est la transaction du validateur.
   * `startTime` est l'heure d'Unix où le validateur commence à valider le sous-réseau.
   * `endTime` est l'heure d'Unix où le validateur cesse de valider le sous-réseau.
   * `stakeAmount` est la quantité de nAVAX que ce validateur a misé. Omis si `subnetID` n'est pas le réseau principal.
   * `nodeID` est l'ID du nœud du validateur.
   * `connected` si le nœud est connecté.
   * `weight` est le poids du validateur lors de l'échantillonnage des validateurs. Omis si`subnetID` n'est pas le réseau principal.
* `delegators` :
   * `txID` est la transaction du délégant.
   * `startTime` est l'heure d'Unix où le délégant commence.
   * `endTime` est l'heure d'Unix où le délégant s'arrête.
   * `stakeAmount` est le montant de nAVAX que ce délégant a misé. Omis si `subnetID` n'est pas le réseau principal.
   * `nodeID`e st l'ID du nœud de validation du nœud.

#### **Exemple d'appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Exemple de réponse**

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

Renvoie les UTXO qui ont été récompensées après la fin de la période de staking ou de délégation de la transaction fournie.

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

* `txID`est l'ID de la transaction du staking ou de la délégation
* `numFetched` est le nombre d'UTXO renvoyées
* `utxos` est un tableau d'UTXO de récompense codée
* `encoding` indique le format des UTXO renvoyées. Peut être « cb58 » ou « hex » et par défaut à « cb58 ».

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Récupérez un actif pour l'actif du staking d'un sous-réseau. Actuellement, cette action ne renvoie que l'actif du staking du réseau principal.

#### **Signature**

```cpp
platform.getStakingAssetID({
    subnetID: string //optional
}) -> {
    assetID: string
}
```

* `subnetID` est le sous-réseau dont l'assetID est demandé.
* `assetID`est l'assetID d'un actif de staking d'un sous-réseau.

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

* `ids` sont les ID des sous-réseaux sur lesquels on veut obtenir des informations. En cas d'omission, obtient des informations sur tous les sous-réseaux.
* `id` est l'ID du sous-réseau.
* Les signatures `threshold` des adresses dans `controlKeys` sont nécessaires pour ajouter un validateur au sous-réseau.

Voir [ici](../tutorials/nodes-and-staking/add-a-validator.md) pour obtenir des informations sur l'ajout d'un validateur à un sous-réseau.

#### **Exemple d'appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getSubnets",
    "params": {"ids":["hW8Ma7dLMA7o4xmJf3AXBbo17bXzE7xnThUd3ypM4VAWo1sNJ"]},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Exemple de réponse**

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

Obtenez la quantité de nAVAX misées par un ensemble d'adresses. Le montant renvoyé n'inclut pas les récompenses du staking

#### **Signature**

```cpp
platform.getStake({addresses: []string}) -> {staked: int}
```

#### **Exemple d'appel**

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

#### **Exemple de réponse**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "staked": "5000000"
    },
    "id": 1
}
```

### platform.getTimestamp

Obtenez l'horodatage actuel de la P-Chain.

#### **Signature**

```cpp
platform.getTimestamp() -> {time: string}
```

#### **Exemple d'appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTimestamp",
    "params": {},
    "id": 1
}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Exemple de réponse**

```json
{
    "jsonrpc": "2.0",
    "result": {
        "timestamp": "2021-09-07T00:00:00-04:00"
    },
    "id": 1
}
```

### platform.getTotalStake

Obtenez la quantité totale de nAVAX misées sur le réseau principal.

#### **Signature**

```cpp
platform.getTotalStake() -> {stake: int}
```

#### **Exemple d'appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTotalStake",
    "params": {},
    "id": 1
}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Exemple de réponse**

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

Obtient une transaction par son ID.

Paramètre `encoding` facultatif pour indiquer le format de la transaction retournée. Peut être « cb58 » ou « hex ». Par défaut à « cb58 ».

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

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Obtient le statut d'une transaction par son ID. Si la transaction a été abandonnée, la réponse inclura un champ `reason` avec plus d'informations sur les raisons pour lesquelles la transaction a été abandonnée.

Voir [ici](deprecated-api-calls.md#gettxstatus) pour obtenir des remarques sur le comportement précédent.

#### **Signature**

```cpp
platform.getTxStatus({
    txID: string
}) -> {status: string}
```

`status` est l'une des :

* `Committed`: la transaction est (ou sera) acceptée par chaque nœud
* `Processing`: la transaction est en cours de vote par ce noeud
* `Dropped`: la transaction ne sera jamais acceptée par un nœud du réseau, cochez le champ `reason` pour obtenir plus d'informations
* `Unknown`: la transaction n'a pas été vue par ce nœud.

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Obtient les UTXO qui référencent un ensemble donné d'adresses.

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

* `utxos` est une liste d'UTXO de sorte que chaque UTXO référence au moins une adresse dans `addresses`.
* Au plus `limit` UTXO sont retournées. Si `limit` est omise ou supérieure à 1024, elle est définie à 1024.
*  Cette méthode prend en charge la pagination.  `endIndex`désigne la dernière UTXO renvoyée. Pour obtenir le jeu suivant d'UTXO, utilisez la valeur de `endIndex` comme `startIndex` dans le prochain appel.
* Si `startIndex` est omise, elle récupérera toutes les UTXO jusqu'à `limit`.
* Lors de l'utilisation de la pagination (c'est-à-dire quand `startIndex` est fournie), les UTXO peuvent ne pas être uniques sur plusieurs appels. C'est-à-dire, une UTXO peut apparaître dans le résultat du premier appel, puis à nouveau dans le deuxième appel.
* Lors de l'utilisation de la pagination, la cohérence n'est pas garantie sur plusieurs appels. C'est-à-dire, l'ensemble d'UTXO des adresses peut avoir changé entre les appels.
* `encoding` indique le format des UTXO renvoyées. Peut être « cb58 » ou « hex » et par défaut à « cb58 ».

#### **Exemple**

Supposons que nous voulons que toutes les UTXO qui référencent au moins une de `P-avax1s994jad0rtwvlfpkpyg2yau9nxt60qqfv023qx` et `P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr`.

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
        },
        "encoding": "cb58"
    },
    "id": 1
}
```

Puisque  `numFetched`est inférieure à `limit`, nous savons que nous avons fini de récupérer les UTXO et n'avons pas besoin de rappeler cette méthode à nouveau.

Supposons que nous voulons récupérer les UTXO exportées de la X Chain vers la P Chain afin de créer une ImportTx. Nous devons ensuite appeler GetUTXOs avec l'argument sourceChain pour récupérer les UTXO atomiques :

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

Cela donne la réponse :

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

### platform.getValidatorsAt

Obtenez les validateurs et leurs poids d'un sous-réseau ou du réseau principal à une hauteur de P-Chain donnée.

#### **Signature**

```cpp
platform.getValidatorsAt(
    {
        height: int,
        subnetID: string, // optional
    }
)
```

* `height` est la hauteur de la chaîne P à laquelle le validateur doit être réglé.
* `subnetID` est l'ID de sous-réseau pour obtenir l'ensemble de validateurs. S'il n'est pas donné, obtient le jeu de validateurs du réseau principal.

#### **Exemple d'appel**

```bash
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getValidatorsAt",
    "params": {
        "height":1
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Exemple de réponse**

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "validators": {
            "NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg": 2000000000000000,
            "NodeID-GWPcbFJZFfZreETSoWjPimr846mXEKCtu": 2000000000000000,
            "NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ": 2000000000000000,
            "NodeID-NFBbbJ4qCmNaCzeW7sxErhvWqvEQMnYcN": 2000000000000000,
            "NodeID-P7oB2McjBGgW2NXXWVYjV8JEDFoW9xDE5": 2000000000000000
        }
    },
    "id": 1
}
```

### platform.importAVAX

Effectuez un transfert d'AVAX de la X-Chain à la P-Chain.

Avant d'appeler cette méthode, vous devez appeler la méthode de [`avm.export`](exchange-chain-x-chain-api.md#avm-export) X-Chain avec l'assetID `AVAX` pour lancer le transfert.

#### **Signature**

```cpp
platform.importAVAX(
    {
        from: []string, //optional
        to: string,
        changeAddr: string, //optional
        username: string,
        password: string
    }
) ->
{
    tx: string,
    changeAddr: string
}
```

* `to` est l'ID de l'adresse à laquelle AVAX est importée. Elle doit être identique à l'argument `to`dans l'appel correspondant à la X-Chain `export`.
* `from` sont les adresses que vous souhaitez utiliser pour cette opération. En cas d'omission, utilisez l'une de vos adresses au besoin.
* `changeAddr` l'adresse à laquelle tout changement sera envoyé. En cas d'omission, la modification est envoyée à l'une des adresses contrôlées par l'utilisateur.
* `username`est l'utilisateur qui contrôle et modifie les adresses.
* `password` est le mot de passe de `username`.

#### **Exemple d'appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.importAVAX",
    "params": {
        "to": "P-avax1apzq2zt0uaaatum3wdz83u4z7dv4st7l5m5n2a",
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username": "myUsername",
        "password": "myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Exemple de réponse**

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

Donnez à un utilisateur le contrôle d'une adresse en lui fournissant la clé privée qui contrôle l'adresse.

#### **Signature**

```cpp
platform.importKey({
    username: string,
    password: string,
    privateKey:string
}) -> {address: string}
```

* Ajoutez `privateKey` à l'ensemble de `username` des clés privées. `address` est l'adresse  `username` qui contrôle maintenant avec la clé privée.

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Émettez une transaction à la Platform Chain.

#### **Signature**

```cpp
platform.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {txID: string}
```

* `tx` est la représentation d'octets d'une transaction.
* `encoding` indique le format de codage des octets de la transaction. Peut être « cb58 » ou « hex ». Par défaut à « cb58 ».
* `txID` est l'ID de la transaction.

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Listez les adresses que l'utilisateur donné contrôle.

#### **Signature**

```cpp
platform.listAddresses({
    username: string,
    password: string
}) -> {addresses: []string}
```

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Échantillonnez des validateurs du sous-réseau spécifié.

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

* `size` est le nombre de validateurs à échantillonner.
* `subnetID` est le sous-réseau à partir duquel il est échantillonné. En cas d'omission, la valeur par défaut est le réseau principal.
* Chaque élément de `validators` est l'ID d'un validateur.

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Obtenez le sous-réseau qui valide une blockchain donnée.

#### **Signature**

```cpp
platform.validatedBy(
    {
        blockchainID: string
    }
) -> {subnetID: string}
```

* `blockchainID` est l'ID de la blockchain.
* `subnetID`est l'ID du sous-réseau qui valide la blockchain.

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

#### **Signature**

```cpp
platform.validates(
    {
        subnetID: string
    }
) -> {blockchainIDs: []string}
```

* `subnetID` est l'ID du sous-réseau.
* Chaque élément de `blockchainIDs` est l'ID d'une blockchain que le sous-réseau valide.

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

