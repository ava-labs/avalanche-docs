# API de chaîne de la plate-forme \(P-Chain\)

Cette API permet aux clients d'interagir avec la [P-Chain](../../learn/platform-overview/#platform-chain-p-chain), qui maintient l'ensemble [de validation](../../learn/platform-overview/staking.md#validators) d'Avalanche et gère la création de blockchain.

## Point de fin

```cpp
/ext/P
```

## Format

Cette API utilise le format RPC `json 2.0`.

## Méthodes

### platform.addDelegator

Ajoutez un délégué au réseau primaire.

Un délégué prend AVAX et spécifie un validateur \(le délégué\) à valider en leur nom. Le délégué a une probabilité accrue d'être échantillonné par d'autres validateurs \(poids\) proportionnellement à la participation qui leur est déléguée.

Le délégué charge un montant de frais au délégué; le premier reçoit un pourcentage de la récompense de validation du délégué \(le cas échéant). \) Une transaction que les délégués jeunent n'a aucun frais.

La période de délégation doit être un sous-ensemble de la période que le délégué valide le réseau primaire.

Notez qu'une fois que vous délivrez la transaction pour ajouter un noeud en tant que délégué, il n'y a aucun moyen de modifier les paramètres. **Vous ne pouvez pas supprimer une partie tôt ou modifier le montant de la jeu, l'ID du noeud ou l'adresse de récompense.** Assurez-vous que vous utilisez les valeurs correctes. Si vous n'êtes pas sûr, consultez notre [FAQ du développeur](https://support.avalabs.org/en/collections/2618154-developer-faq) ou demandez de l'aide sur [Discord.](https://chat.avalabs.org/)

{% page-ref page=".. /../learn/platform-overview/staking.md" %}

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

* `nodeID` est l'ID du noeud à déléguer.
* `startTime` est l'heure de l'Unix lorsque le délégué commence à déléguer.
* `endTime` est l'heure de l'Unix lorsque le délégué cesse de déléguer \(et AVAX staked est retourné\).
* `stakeAmount` est la quantité de nAVAX que le délégué est en train de staking.
* `rewardAddress` est l'adresse que la récompense de validateur va à, s'il y a un.
* `sont` les adresses que vous souhaitez utiliser pour cette opération. Si elle est omise, utilise l'une de vos adresses au besoin.
* `changeAddr` est l'adresse que tout changement sera envoyé à. Si l'omission est effectuée, le changement est envoyé à l'une des adresses contrôlées par l'utilisateur.
* `nom` d'utilisateur est l'utilisateur qui paie les frais de transaction.
* `mot de passe` est mot de passe `du nom` d'utilisateur.
* `txID` est l'ID de la transaction

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

Ajoutez un validateur au réseau primaire. Vous devez mettre AVAX pour le faire. Si le noeud est suffisamment correct et sensible pendant la validation, vous recevez une récompense lorsque la fin de la période de mise en évidence est atteinte. La probabilité du validateur d'être échantillonnée par d'autres validateurs pendant le consensus est proportionnelle à la quantité validator’s

Le validant facture un montant de frais aux délégués; le premier reçoit un pourcentage de la récompense de validation du délégué \(le cas échéant). \) La taxe minimale de délégation est de 2%. Une transaction qui ajoute un validateur n'a aucun frais.

La période de validation doit être comprise entre 2 semaines et 1 an.

Il y a un poids total maximal imposé aux validateurs. Cela signifie qu'aucun validateur n'aura jamais plus AVAX et délégué à elle que cette valeur. Cette valeur sera initialement définie à `min(5 * montant empilé, 3M AVAX)`. La valeur totale sur un validateur est de 3 millions a

Notez qu'une fois que vous délivrez la transaction pour ajouter un noeud comme validant, il n'y a aucun moyen de modifier les paramètres. **Vous ne pouvez pas supprimer la mise tôt ou modifier le montant de la jeu, l'ID du noeud ou l'adresse de récompense.** Assurez-vous que vous utilisez les valeurs correctes. Si vous n'êtes pas sûr, consultez notre [FAQ du développeur](https://support.avalabs.org/en/collections/2618154-developer-faq) ou demandez de l'aide sur [Discord.](https://chat.avalabs.org/)

{% page-ref page=".. /../learn/platform-overview/staking.md" %}

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

* `nodeID` est l'ID du noeud du validator ajouté.
* `startTime` est l'heure de l'Unix lorsque le validateur commence à valider le réseau primaire.
* `endTime` est l'heure de l'Unix lorsque le validateur cesse de valider le Réseau primaire \(et AVAX staked est retourné\).
* `stakeAmount` est la quantité de nAVAX que le validator est en train de staking.
* `rewardAddress` est l'adresse que la récompense de validation ira à, s'il y a un.
* `delegationFeeRate` est le pourcentage de frais que ce validateur charge lorsque d'autres déléguent leur jeu. Jusqu'à 4 décimales autorisées; des décimales supplémentaires sont ignorées. Doit être comprise entre 0 et 100, inclusivement. Par exemple, si la `delegationFeeRate` est `1.2345` et quelqu'un délégués à ce validant, alors lorsque la période de délégation est terminée, 1.2345% de la récompense va au validant et le reste va au delegator.
* `sont` les adresses que vous souhaitez utiliser pour cette opération. Si elle est omise, utilise l'une de vos adresses au besoin.
* `changeAddr` est l'adresse que tout changement sera envoyé à. Si l'omission est effectuée, le changement est envoyé à l'une des adresses contrôlées par l'utilisateur.
* `nom` d'utilisateur est l'utilisateur qui paie les frais de transaction.
* `mot de passe` est mot de passe `du nom` d'utilisateur.
* `txID` est l'ID de la transaction

#### **Exemple d'appel**

Dans cet exemple, nous utilisons la `date` de commande shell pour calculer Unix fois 10 minutes et 2 jours à l'avenir. \(Note: Si vous êtes sur un Mac, remplacez `$(date` avec `$(gdate`. Si vous n'avez pas `gdate` installé, faites `brew installer coreutils`. \)

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

Ajoutez un validateur à un sous-réseau autre que le réseau primaire. Le Validator doit valider le Réseau primaire pour toute la durée qu'il valide ce sous-réseau.

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

* `nodeID` est l'ID du noeud du validant.
* `subnetID` est le sous-réseau qu'ils valideront.
* `startTime` est l'heure de l'unix lorsque le validant commence à valider le sous-réseau.
* `endTime` est l'heure de l'unix lorsque le validateur cesse de valider le sous-réseau.
* `poids` est le poids du validateur utilisé pour l'échantillonnage.
* `sont` les adresses que vous souhaitez utiliser pour cette opération. Si elle est omise, utilise l'une de vos adresses au besoin.
* `changeAddr` est l'adresse que tout changement sera envoyé à. Si l'omission est effectuée, le changement est envoyé à l'une des adresses contrôlées par l'utilisateur.
* `nom` d'utilisateur est l'utilisateur qui paie les frais de transaction.
* `mot de passe` est mot de passe `du nom` d'utilisateur.
* `txID` est l'ID de la transaction.

#### **Appel d'exemple**

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

Créer une nouvelle blockchain. Actuellement, seul la création de nouvelles instances de l'AVM et du Timestamp VM.

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

* `subnetID` est l'ID du Subnet qui valide la nouvelle blockchain. Le Sous-réseau doit exister et ne peut pas être le réseau primaire.
* `vmID` est l'ID de la machine virtuelle les blockchain Peut également être un alias de la machine virtuelle.
* `nom` est un nom lisible par l'homme pour la nouvelle blockchain. Pas nécessairement unique.
* `genesisData` est la représentation par octet de l'état de genèse de la nouvelle blockchain encodé dans le format spécifié par le paramètre `encodage.`
* `encoding` spécifie le format à utiliser pour `genesisData`. Peut être soit "cb58" ou "hex". Par défaut vers "cb58". Machines virtuelles devraient avoir une méthode d'API statique nommée `buildGenesis` qui peut être utilisé pour générer `des données`
* `sont` les adresses que vous souhaitez utiliser pour cette opération. Si elle est omise, utilise l'une de vos adresses au besoin.
* `changeAddr` est l'adresse que tout changement sera envoyé à. Si l'omission est effectuée, le changement est envoyé à l'une des adresses contrôlées par l'utilisateur.
* `nom` d'utilisateur est l'utilisateur qui paie les frais de transaction. Cet utilisateur doit avoir un nombre suffisant de clés de contrôle du sous-réseau.
* `mot de passe` est mot de passe `du nom` d'utilisateur.
* `txID` est l'ID de la transaction.

#### **Exemple d'appel**

Dans cet exemple, nous créons une nouvelle instance de la machine virtuelle Timestamp. `genesisData` données proviennent de l'appel `timestamp.buildGenesis`.

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

* Afin d'ajouter un validateur à ce sous-réseau, des signatures `de seuil` sont requises à partir des adresses dans la zone `controlKeys`
* `sont` les adresses que vous souhaitez utiliser pour cette opération. Si elle est omise, utilise l'une de vos adresses au besoin.
* `changeAddr` est l'adresse que tout changement sera envoyé à. Si l'omission est effectuée, le changement est envoyé à l'une des adresses contrôlées par l'utilisateur.
* `nom` d'utilisateur est l'utilisateur qui paie les frais de transaction.
* `mot de passe` est mot de passe `du nom` d'utilisateur.

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

Envoyez AVAX à partir d'une adresse sur la chaîne P à une adresse sur la chaîne X. Après avoir émis cette transaction, vous devez appeler la méthode [`X-Chain’s`](exchange-chain-x-chain-api.md#avm-importavax) de la X-Chain’s pour compléter le transfert.

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

* `le` montant est le montant de nAVAX à envoyer.
* `à` est l'adresse sur la chaîne Xpour envoyer the à
* `sont` les adresses que vous souhaitez utiliser pour cette opération. Si elle est omise, utilise l'une de vos adresses au besoin.
* `changeAddr` est l'adresse que tout changement sera envoyé à. Si l'omission est effectuée, le changement est envoyé à l'une des adresses contrôlées par l'utilisateur.
* `nom` d'utilisateur est l'utilisateur qui envoie user et paie les frais de transaction.
* `mot de passe` est mot de passe `du nom` d'utilisateur.
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

Obtenez la clé privée qui contrôle une adresse donnée.   La clé privée retournée peut être ajoutée à un utilisateur avec [`platform.importKey`](platform-chain-p-chain-api.md#platform-importkey).

#### **Signature**

```cpp
platform.exportKey({
    username: string,
    password: string,
    address: string
}) -> {privateKey: string}
```

* `nom` d'utilisateur est l'utilisateur qui contrôle `l'adresse`.
* `mot de passe` est mot de passe `du nom` d'utilisateur.
* `privateKey` est la représentation de la chaîne de la clé privée qui contrôle `l'adresse`.

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

Obtenez le solde de AVAX par une adresse donnée.

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

* `adresse` est l'adresse pour obtenir le solde de.
* `balance` est l'équilibre total, dans nAVAX.
* `déverrouillé` est l'équilibre déverrouillé, dans nAVAX.
* `lockedStakeable` est l'équilibre verrouillé, dans nAVAX.
* `lockedNotStakeable` l'équilibre verrouillé et non stakeable dans nAVAX.
* `utxoids` sont les ID des UTXOs cette `adresse` de référence.

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

Obtenez toutes les chaînes de blocs qui existent \(excluant la P-Chain\).

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

* `blockchains` est toutes les chaînes de blocs qui existent sur le réseau Avalanche.
* `nom` est le nom lisible par l'homme de cette blockchain.
* `id` est l'ID de la chaîne de bloc.
* `subnetID` est l'ID du Subnet qui valide cette chaîne de blocage.
* `vmID` est l'ID de la machine virtuelle les blockchain

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

Obtenez le statut d'une blockchain.

#### **Signature**

```cpp
platform.getBlockchainStatus(
    {
        blockchainID: string
    }
) -> {status: string}
```

`statut` est l'un des :

* `Validation`: La blockchain est validée par ce nœud.
* `Création`: la blockchain existe mais n'est pas validée par ce nœud.
* `Préféré `: La chaîne de blocs a été proposée à être créée et est susceptible d'être créée mais la transaction n'est pas encore acceptée.
* `Inconnu`: la blockchain n'a pas été proposée ou la proposition de la créer n'est pas préférable. La proposition peut être soumise de nouveau.

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

Retourne une limite supérieure sur le nombre of Il s'agit d'une limite supérieure parce qu'elle ne tient pas compte des jetons brûlés, y compris les frais de transaction.

#### **Signature**

```cpp
platform.getCurrentSupply() -> {supply: int}
```

* `l'offre` est une limite supérieure du nombre of libellée en nAVAX.

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

La réponse dans cet exemple indique que l'offre AVAX’s au plus 365,865 millions.

### platform.getCurrentValidators

Lister les validateurs actuels du sous-réseau donné.

Les `délégués` de terrain de haut niveau ont été [deprecated](deprecated-api-calls.md#getcurrentvalidators) à partir de v1.0.1, et enlevés dans v1.0.6. Au lieu de cela, chaque élément de `validateur` contient maintenant la liste des délégués pour ce validateur.

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

* `subnetID` est le sous-réseau dont les validateurs actuels sont retournés. Si vous êtes omis, retourne les validateurs actuels du réseau primaire.
* `nodeIDs` est une liste des nodeIDs des validateurs actuels à demander. Si l'omission est effectuée, tous les validateurs actuels sont retournés. Si un nodeID spécifié n'est pas dans l'ensemble des validateurs actuels, il ne sera pas inclus dans la réponse.
* `validateurs`:
   * `txID` est la transaction de validation.
   * `startTime` est l'heure de l'Unix lorsque le validateur commence à valider le Subnet.
   * `endTime` est l'heure de l'Unix lorsque le validateur cesse de valider le Subnet.
   * `stakeAmount` est la quantité de nAVAX que ce validator empilé. Omis si le `subnetID` n'est pas le réseau primaire.
   * `nodeID` est l'ID du nœud du validant.
   * `poids` est le poids du validateur lorsque les validateurs d'échantillonnage. Omis si le `subnetID` est le réseau primaire.
   * `rewardOwner``` est une sortie `OutputOwners` qui comprend `le temps de verrouillage`, `le seuil` et la gamme d'adresses.
   * `potentialReward` est la récompense potentielle acquise de la fuite
   * `delegationFeeRate` est le pourcentage de frais que ce validateur charge lorsque d'autres déléguent leur jeu.
   * `uptime` est le % du temps que le noeud interrogé a signalé le pair comme en ligne.
   * `connecté` est si le noeud est connecté au réseau
   * `Les délégués` sont la liste des délégués à ce validant:
      * `txID` est la transaction de délégué.
      * `startTime` est l'heure Unix lorsque le délégué a commencé.
      * `endTime` est l'heure Unix lorsque le délégué cesse.
      * `stakeAmount` est la quantité de nAVAX que ce délégué a empilé. Omis si le `subnetID` n'est pas le réseau primaire.
      * `nodeID` est l'ID du noeud de validation.
      * `rewardOwner``` est une sortie `OutputOwners` qui comprend `le temps de verrouillage`, `le seuil` et la gamme d'adresses.
      * `potentialReward` est la récompense potentielle acquise de la fuite
* `délégués`: **\(deprecated à partir de v1.0.1. Voir note en haut de la documentation de la méthode.** \)

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

Obtenez la quantité minimale of pour valider le réseau primaire et la quantité minimale of

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

Inscrivez les validateurs dans l'ensemble de validateur en instance du Sous-réseau spécifié. Chaque validateur n'est pas actuellement validant le Sous-réseau, mais il sera à l'avenir.

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

* `subnetID` est le sous-réseau dont les validateurs actuels sont retournés. Si vous êtes omis, retourne les validateurs actuels du réseau primaire.
* `nodeIDs` est une liste des nodeIDs des validateurs en instance à demander. Si l'omission est effectuée, tous les validateurs en instance sont retournés. Si un nodeID spécifié n'est pas dans l'ensemble des validateurs en instance, il ne sera pas inclus dans la réponse.
* `validateurs`:
   * `txID` est la transaction de validation.
   * `startTime` est l'heure de l'Unix lorsque le validateur commence à valider le Subnet.
   * `endTime` est l'heure de l'Unix lorsque le validateur cesse de valider le Subnet.
   * `stakeAmount` est la quantité de nAVAX que ce validator empilé. Omis si le `subnetID` n'est pas le réseau primaire.
   * `nodeID` est l'ID du nœud du validant.
   * `connecté` si le noeud est connecté.
   * `poids` est le poids du validateur lorsque les validateurs d'échantillonnage. Omis si le `subnetID` est le réseau primaire.
* `délégués`:
   * `txID` est la transaction de délégué.
   * `startTime` est l'heure Unix lorsque le délégué commence.
   * `endTime` est l'heure Unix lorsque le délégué cesse.
   * `stakeAmount` est la quantité de nAVAX que ce délégué a empilé. Omis si le `subnetID` n'est pas le réseau primaire.
   * `nodeID` est l'ID du noeud de validation.

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

Retourne les UTXOs qui ont été récompensés après la période de mise en évidence ou de délégation de la transaction fournie terminée.

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

* `txID` est l'ID de la transaction de jalonnement ou de délégation
* `numFetched` est le nombre de returned retourné
* `utxos` est un tableau de récompense encodée UTXOS
* `encoding` spécifie le format des UTXOS retournés. Peut être "cb58" ou "hex" et par défaut vers "cb58".

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

Récupérer un identifiant d'actif pour l'actif de stockage d'un sous-réseau. Actuellement, cela ne renvoie que l'élément clé du réseau primaire en staking

#### **Signature**

```cpp
platform.getStakingAssetID({
    subnetID: string //optional
}) -> {
    assetID: string
}
```

* `subnetID` est le subnet dont l'identifiant est demandé.
* `assetID` est the pour l'actif de mise en fuite d'un sous-réseau.

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

Obtenez des informations sur les Subnets.

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

* `les ID` des subnets pour obtenir l'information sur. Si l'omission est obtenue, obtenir des informations sur tous les sous-réseaux.
* `id` est l'ID du Subnet.
* les signatures `de seuil` à partir d'adresses dans `controlKeys` sont nécessaires pour ajouter un validateur au sous-réseau.

Consultez [ici](../tutorials/nodes-and-staking/add-a-validator.md) pour obtenir des informations sur l'ajout d'un validator à un sous-réseau.

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

Obtenez la quantité de nAVAX mise par un ensemble d'adresses. Le montant retourné n'inclut pas les récompenses de jalonnement.

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

### platform.getTotalStake

Obtenez la quantité totale de nAVAX mise sur le réseau primaire.

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

Paramètre `encodage` facultatif pour spécifier le format de la transaction retournée. Peut être soit "cb58" ou "hex". Par défaut vers "cb58".

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

Obtient le statut d'une transaction par son ID. Si la transaction a été abandonnée, la réponse comprendra un champ `de raison` avec plus d'informations pourquoi la transaction a été abandonnée.

Voir [ici](deprecated-api-calls.md#gettxstatus) pour les notes sur le comportement précédent.

#### **Signature**

```cpp
platform.getTxStatus({
    txID: string
}) -> {status: string}
```

`statut` est l'un des :

* `Commise`: la transaction est \(ou sera\) acceptée par chaque noeud
* `Traitement`: la transaction est votée par ce noeud
* `Perdue`: la transaction ne sera jamais acceptée par aucun nœud dans le réseau, vérifier le champ `raison` pour plus d'informations
* `Inconnu`: la transaction n'a pas été vue par ce noeud

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

Obtient les UTXOs qui font référence à un ensemble donné d'adresses.

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

* `utxos` est une liste des UTXO de telle que chaque UTXO renvoie au moins une adresse dans `les adresses`.
* Au maximum `les` UTXOs sont retournés. Si la `limite` est omise ou supérieure à 1024, elle est fixée à 1024.
* Cette méthode supporte la pagination. `endIndex` indique la dernière UTXO retournée. Pour obtenir l'ensemble suivant of utilisez la valeur de `endIndex` comme `startIndex` dans l'appel suivant.
* Si `startIndex` est omitted, va chercher tous les UTXOs jusqu'à `limiter`.
* Lorsque vous utilisez la pagination \(c'est-à-dire lorsque `startIndex` est fourni\), les UTXOs ne sont pas garantis d'être unique sur plusieurs appels. Autrement dit, un UTXO peut apparaître dans le résultat du premier appel, puis dans le second appel.
* Lorsque vous utilisez la pagination, la cohérence n'est pas garantie sur plusieurs appels. Autrement dit, l'ensemble UTXO des adresses peut avoir changé entre les appels.
* `encoding` spécifie le format des UTXOS retournés. Peut être "cb58" ou "hex" et par défaut vers "cb58".

#### **Exemple**

Supposons que nous voulons tous les UTXOs qui référence au moins un de `P-avax1s994jad0rtwvlfpkpyg2yau9nxt60qqfv023qx` et `P-avax1fvrjkj7ma5srtayfx7kncu7um3ym73ztydr`.

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
            "address": "P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr",
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
            "address": "P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr",
            "utxo": "21jG2RfqyHUUgkTLe2tUp6ETGLriSDTW3th8JXFbPRNiSZ11jK"
        },
        "encoding": "cb58"
    },
    "id": 1
}
```

Puisque `numFetched` est moins que `limite`, nous savons que nous sommes fait la recherche UTXOs et n'avons pas besoin de rappeler cette méthode à nouveau.

Supposons que nous voulons récupérer les UTXOs exportés de la chaîne X vers la chaîne P afin de construire une ImportTx. Ensuite, nous devons appeler GetUTXOs avec l'argument sourceChain afin de récupérer les UTXOS atomiques:

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

Ceci donne la réponse:

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

Compléter un transfert of de la chaîne Xà la chaîne P-Chain.

Avant que cette méthode soit appelée, vous devez appeler la méthode [`avm.exportAVAX`](exchange-chain-x-chain-api.md#avm-exportavax) de la X-Chain’s pour initier le transfert.

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

* `à` est l'ID de l'adresse que of est importé. Cela doit être le même que celui `de` l'argument dans l'appel correspondant à `l'exportation` de la chaîne XAVAX.
* `sourceChain` est l'ID ou les alias de la chaîne dont of est importé. Pour importer des fonds depuis la chaîne X, utilisez `"X"`.
* `sont` les adresses que vous souhaitez utiliser pour cette opération. Si elle est omise, utilise l'une de vos adresses au besoin.
* `changeAddr` est l'adresse que tout changement sera envoyé à. Si l'omission est effectuée, le changement est envoyé à l'une des adresses contrôlées par l'utilisateur.
* `nom` d'utilisateur est l'utilisateur qui contrôle l'adresse spécifiée `dans`.
* `mot de passe` est mot de passe `du nom` d'utilisateur.

#### **Exemple d'appel**

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

Donnez un contrôle utilisateur sur une adresse en fournissant la clé privée qui contrôle l'adresse.

#### **Signature**

```cpp
platform.importKey({
    username: string,
    password: string,
    privateKey:string
}) -> {address: string}
```

* Ajouter `privateKey` à l'ensemble de clés privées de `username```‘s `l'adresse` est l'adresse utilisateur nom d'utilisateur contrôle maintenant avec la clé privée.

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

Délivrer une transaction à la Chaîne de la Plateforme.

#### **Signature**

```cpp
platform.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {txID: string}
```

* `tx` est la représentation des octets d'une transaction.
* `encodage` spécifie le format d'encodage des octets de la transaction. Peut être soit "cb58" ou "hex". Par défaut vers "cb58".
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

Lister les adresses contrôlées par l'utilisateur donné.

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

Échantillons validateurs du sous-réseau spécifié.

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

* `taille` est le nombre de validateurs à échantillonner.
* `subnetID` est le sous-réseau à échantillonner de. Si omise, les défauts du réseau primaire.
* Chaque élément de `validateur` est l'ID d'un validateur.

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

Obtenez le Sous-réseau qui valide une chaîne de blocs donnée.

#### **Signature**

```cpp
platform.validatedBy(
    {
        blockchainID: string
    }
) -> {subnetID: string}
```

* `blockchainID` est l'ID de la blockchain.
* `subnetID` est l'ID du Subnet qui valide la chaîne de blocage.

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

Obtenez les ID des blockchains qu'un Subnet valide.

#### **Signature**

```cpp
platform.validates(
    {
        subnetID: string
    }
) -> {blockchainIDs: []string}
```

* `subnetID` est l'ID du Subnet.
* Chaque élément des `blockchainIDs` est l'ID d'une blockchain que le Subnet valide.

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

