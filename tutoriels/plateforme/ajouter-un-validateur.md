# Ajouter un validateur

## Introduction <a id="introduction"></a>

Le [réseau primaire](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network) est inhérent à la plateforme Avalanche et valide les blockchains intégrées d'Avalanche. Dans ce tutoriel, nous allons ajouter un nœud au réseau primaire et un [sous-réseau \(subnet\)](../../apprendre/presentation-du-systeme/#sous-reseaux-subnets) sur Avalanche.

La P-Chain gère les métadonnées sur Avalanche. Cela inclut le suivi des nœuds dans les sous-réseaux, quelles blockchains existent et quels sous-réseaux valident quelles blockchains. Pour ajouter un validateur, nous émettrons des [transactions](http://support.avalabs.org/en/articles/4587384-what-is-a-transaction) vers la P-Chain.

Si vous souhaitez lancer votre nœud sur un VPS et avoir un tutoriel pas-à-pas merci de regarder ce tutoriel:

{% page-ref page="instalation-ovh-de-a-a-z.md" %}

{% hint style="danger" %}
Notez qu'une fois que vous émettez la transaction pour ajouter un nœud en tant que validateur, il n'y a aucun moyen de modifier les paramètres. **Vous ne pouvez pas annuler la mise plus tôt ni modifier le montant de la mise, l'ID du nœud ou l'adresse de récompense.** Veuillez vous assurer que vous utilisez les valeurs correctes dans les appels API ci-dessous. Si vous n’êtes pas sûr, demandez de l’aide sur [Telegram](https://t.me/Avalanche_fr), [Discord ](https://chat.avax.network/)où la [FAQ du développeur](http://support.avalabs.org/en/collections/2618154-developer-faq).
{% endhint %}

## Exigences

Vous avez terminé le tutoriel [pour commencer](../../commencer.md) et connaissez l'[architecture d'Avalanche](../../apprendre/presentation-du-systeme/). Dans ce tutoriel nous utilisons la [collection Postman d'Avalanche](https://github.com/ava-labs/avalanche-postman-collection) pour nous aider à passer des appels API.

Afin de vous assurer que votre nœud est bien connecté, assurez-vous que votre nœud peut recevoir et envoyer du trafic TCP sur le port de staking \(`9651` par défaut\) et que vous avez démarré votre nœud avec l'argument de ligne de commande `--public-ip=[YOUR NODE'S PUBLIC IP HERE]`. Ne pas faire l'un ou l'autre de ces éléments peut compromettre votre récompense de mise.

## Ajouter un validateur avec le portefeuille Avalanche  <a id="add-a-validator-with-avalanche-wallet"></a>

Tout d'abord, nous vous montrons comment ajouter votre nœud en tant que validateur en utilisant le [portefeuille Avalanche](https://wallet.avax.network/).

Obtenez l'identifiant de votre nœud en appelant [`info.getNodeID`](../../apis/info-api.md#info-getnodeid):

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

La réponse a l'ID de votre nœud :

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "nodeID": "NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD"
    },
    "id": 1
}
```

Ouvrez le portefeuille et accédez à l'onglet `Earn`. Choisissez`Add Validator`.![](https://docs.avax.network/images/tutorials/adding-validators/2.png)Remplissez les paramètres de staking \(mise en jeu\).

![](../../.gitbook/assets/image%20%289%29.png)

Remplissez les paramètres de staking. Ils sont expliqués plus en détail [ci-dessous](../../apprendre/presentation-du-systeme/staking.md). Une fois que vous avez renseigné tous les paramètres de staking et les avez revérifiés, cliquez sur `Confirm`. Assurez-vous que la période de staking est d'au moins `2 semaines`, que le taux des frais de délégation est d'au moins `2%` et que vous mettez en jeu au moins `2000 AVAX`. 

{% page-ref page="../../apprendre/presentation-du-systeme/staking.md" %}

![](../../.gitbook/assets/image%20%2818%29.png)

Vous devriez voir ce message de réussite et votre solde doit être mis à jour.![](https://docs.avax.network/images/tutorials/adding-validators/4.png)Success message

L'appel de[`platform.getPendingValidators`](../../apis/platform-api-p-chain.md#platform-getpendingvalidators) vérifie que notre transaction a été acceptée.

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

![](../../.gitbook/assets/image%20%282%29.png)

Revenez à l'onglet `Earn`, puis cliquez sur `Estimated Rewards`.

![](../../.gitbook/assets/image%20%287%29.png)

Une fois l'heure de début de votre validateur passée, vous verrez les récompenses qu'il peut gagner, ainsi que son heure de début, son heure de fin et le pourcentage de sa période de validation écoulé.

![](../../.gitbook/assets/image%20%2819%29.png)

C'est tout !

## Ajouter un validateur avec des appels API <a id="add-a-validator-with-api-calls"></a>

Nous pouvons également ajouter un nœud à l'ensemble de validateurs en faisant des appels API à notre nœud. Pour ajouter un nœud au réseau primaire, nous appellerons [`platform.addValidator`](../../apis/platform-api-p-chain.md#platform-addvalidator).

La signature de cette méthode est :

```cpp
platform.addValidator(
    {
        nodeID: string,
        startTime: int,
        endTime: int,
        stakeAmount: int,
        rewardAddress: string,
        changeAddr: string, (optional)
        delegationFeeRate: float,
        username: string,
        password: string
    }
) -> {txID: string}
```

Passons en revue et examinons ces arguments.

`nodeID`

Il s'agit de l'ID de nœud du validateur ajouté. Pour obtenir l'identifiant de votre nœud, appelez [`info.getNodeID`](../../apis/info-api.md#info-getnodeid):

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "info.getNodeID",
    "params":{},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

La réponse pour l'ID de votre nœud :

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "nodeID": "NodeID-LMUue2dBBRWdDbPL4Yx47Ps31noeewJji"
    },
    "id": 1
}
```

`startTime` et `endTime`

Lorsqu'on émet une transaction pour rejoindre le réseau primaire, ils spécifient l'heure à laquelle ils entreront \(commencer la validation\) et quitteront \(arrêter la validation.\) La durée minimale pendant laquelle on peut valider le réseau primaire est de 24 heures et la durée maximale est d'un an. On peut réintégrer le réseau primaire après avoir quitté, c'est juste que la durée maximale continue est d'un an. `startTime`et`endTime`sont les heures Unix où votre validateur commencera et arrêtera de valider le réseau primaire, respectivement. `startTime`doit être dans le futur par rapport à l'heure à laquelle la transaction est émise.

`stakeAmount`

Afin de valider le réseau primaire, il faut mettre en jeu des AVAX. Ce paramètre définit la quantité d'AVAX mis en jeu.

`rewardAddress`

Lorsqu'un validateur arrête de valider le réseau primaire, il recevra une récompense s'il est suffisamment réactif et correct lors de la validation du réseau primaire. Ces jetons sont envoyés à `rewardAddress`. La mise d'origine sera renvoyée à une adresse contrôlée par `username`.

L’enjeu d’un validateur n’est jamais réduit \(slashed\), quel que soit son comportement; ils recevront toujours leur mise de départ lorsqu'ils auront terminé la validation.

`changeAddr`

Tout changement résultant de cette transaction sera envoyé à cette adresse. Vous pouvez laisser ce champ vide ; si vous le faites, la modification sera envoyée à l'une des adresses contrôlées par votre utilisateur.

`delegationFeeRate`

Avalanche permet la délégation d'un enjeu. Ce paramètre est le pourcentage de frais facturé par ce validateur lorsque d'autres lui délèguent la participation. Par exemple, si `DelegationFeeRate` vaut 2,2345 et que quelqu'un délègue à ce validateur, alors lorsque la période de délégation est terminée, 2,2345% de la récompense va au validateur et le reste va au délégant. 

`username` et `password`

Ces paramètres sont le `username` et `password` de l'utilisateur qui paie les frais de transaction, fournit l'AVAX mis en jeu et à qui l'AVAX mis en jeu sera retourné.

Passons maintenant à la transaction. Nous utilisons la commande shell `date` pour calculer l'heure Unix à 10 minutes et 30 jours dans le futur à utiliser comme valeurs de`startTime`et `endTime`, respectivement. \(Remarque: si vous utilisez un Mac, remplacez`$(date`par`$(gdate`. Si vous n'avez pas installé`gdate`faites `brew install coreutils`. Dans cet exemple, nous mettons en jeu `2000 AVAX` \(`2 x 1012 nAVAX`\) .

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.addValidator",
    "params": {
        "nodeID":"NodeID-LMUue2dBBRWdDbPL4Yx47Ps31noeewJji",
        "startTime":'$(date --date="10 minutes" +%s)',
        "endTime":'$(date --date="30 days" +%s)',
        "stakeAmount":2000000000000,
        "rewardAddress":"P-avax1d4wfwrfgu4dkkyq7dlhx0lt69y2hjkjeejnhca",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "delegationFeeRate":10,
        "username":"USERNAME",
        "password":"PASSWORD"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

La réponse a l'ID de la transaction, ainsi que l'adresse à laquelle le changement est allé.

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

Nous pouvons vérifier l'état de la transaction en appelant [`platform.getTxStatus`](../../apis/platform-api-p-chain.md#platform-gettxstatus):

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTxStatus",
    "params": {
        "txID":"6pb3mthunogehapzqmubmx6n38ii3lzytvdrxumovwkqftzls"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

Le statut devrait être `Committed`, signifiant que la transaction a réussi. On peut appeler[`platform.getPendingValidators`](../../apis/platform-api-p-chain.md#platform-getpendingvalidators) et voyez que le nœud est maintenant dans l'ensemble de validateurs en attente pour le réseau primaire :

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

La réponse doit inclure le nœud que nous venons d'ajouter :

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "validators": [
            {
                "nodeID": "NodeID-LMUue2dBBRWdDbPL4Yx47Ps31noeewJji",
                "startTime": "1584021450",
                "endtime": "1584121156",
                "stakeAmount": "2000000000000",
            }
        ] 
    },
    "id": 1
}
```

Lorsque l'heure atteint `1584021450`, ce nœud commencera à valider le réseau primaire. Lorsqu'il atteint `1584121156`, ce nœud arrêtera de valider le réseau primaire. Les AVAX mis en jeu seront retournés à une adresse contrôlée par `username`et les récompenses, le cas échéant, seront attribuées à`rewardAddress`.

## Ajout d'un validateur de sous-réseau <a id="adding-a-subnet-validator"></a>

### Émettre une transaction de validation de sous-réseau <a id="issuing-a-subnet-validator-transaction"></a>

Ajoutons maintenant le même nœud à un sous-réseau. Ce qui suit aura plus de sens si vous avez déjà suivi ce tutoriel sur la [création d’un sous-réseau](creer-un-sous-reseau-subnet.md). À l'heure actuelle, vous ne pouvez ajouter des validateurs aux sous-réseaux qu'avec des appels d'API, pas avec le portefeuille Avalanche.

Supposons que le sous-réseau a un ID `nTd2Q2nTLp8M9qv2VKHMdvYhtNWX7aTPa4SMEK7x7yJHbcWvr`, threshold 2, et l'`username` détient au moins 2 clés de contrôle.

Pour ajouter le validateur, nous appellerons la méthode API [`platform.addSubnetValidator`](../../apis/platform-api-p-chain.md#platform-addsubnetvalidator). Sa signature est :

```cpp
platform.addSubnetValidator(
    {
        nodeID: string,
        subnetID: string,
        startTime: int,
        endTime: int,
        weight: int,
        changeAddr: string, (optional)
        username: string,
        password: string
    }
) -> {txID: string}
```

Examinons les paramètres :

`nodeID`

Il s'agit de l'ID du nœud du validateur ajouté au sous-réseau. **Ce validateur doit valider le réseau principal pendant toute la durée de validation de ce sous-réseau.**

`subnetID`

Il s'agit de l'ID du sous-réseau auquel nous ajoutons un validateur.

`startTime` et `endTime`

Comme ci-dessus, ce sont les heures Unix auxquelles le validateur va démarrer et arrêter la validation du sous-réseau. `startTime` doit être égale ou postérieure à l'heure à laquelle le validateur commence à valider le réseau primaire, et `endTime` doit être égale ou antérieure à l'heure à laquelle le validateur arrête la validation du réseau primaire.

`weight`

Il s’agit du poids d’échantillonnage du validateur pour le consensus. Si le poids du validateur est de 1 et le poids cumulé de tous les validateurs du sous-réseau est de 100, alors ce validateur sera inclus dans environ 1 échantillon sur 100 lors du consensus.

`changeAddr`

Tout changement résultant de cette transaction sera envoyé à cette adresse. Vous pouvez laisser ce champ vide; si vous le faites, la modification sera envoyée à l'une des adresses contrôlées par votre utilisateur.

`username` et `password`

Ces paramètres sont le `username` et `password` de l'utilisateur qui paie les frais de transaction. Cet utilisateur doit détenir un nombre suffisant de clés de contrôle de ce sous-réseau pour pouvoir ajouter un validateur à ce sous-réseau.

Passons maintenant à la transaction. Nous utilisons la commande shell `date` pour calculer l'heure Unix à 10 minutes et 30 jours dans le futur à utiliser comme valeurs de`startTime`et `endTime`, respectivement. \(Remarque: si vous utilisez un Mac, remplacez`$(date`par`$(gdate`. Si vous n'avez pas installé`gdate`faites `brew install coreutils`.

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.addSubnetValidator",
    "params": {
        "nodeID":"NodeID-LMUue2dBBRWdDbPL4Yx47Ps31noeewJji",
        "subnetID":"nTd2Q2nTLp8M9qv2VKHMdvYhtNWX7aTPa4SMEK7x7yJHbcWvr",
        "startTime":'$(date --date="10 minutes" +%s)',
        "endTime":'$(date --date="30 days" +%s)',
        "weight":1,
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"USERNAME",
        "password":"PASSWORD"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

La réponse a l'ID de la transaction, ainsi que l'adresse à laquelle le changement est allé.

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2exafyvRNSE5ehwjhafBVt6CTntot7DFjsZNcZ54GSxBbVLcCm",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

Nous pouvons vérifier l'état de la transaction en appelant [`platform.getTxStatus`](../../apis/platform-api-p-chain.md#platform-gettxstatus):

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTxStatus",
    "params": {
        "txID":"2exafyvRNSE5ehwjhafBVt6CTntot7DFjsZNcZ54GSxBbVLcCm"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

Le statut devrait être `Committed`, signifiant que la transaction a réussi. On peut appeler[`platform.getPendingValidators`](../../apis/platform-api-p-chain.md#platform-getpendingvalidators) et voyez que le nœud est maintenant dans l'ensemble de validateurs en attente pour le réseau primaire. Cette fois, nous spécifions l'ID du sous-réseau :

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {"subnetID":"nTd2Q2nTLp8M9qv2VKHMdvYhtNWX7aTPa4SMEK7x7yJHbcWvr"},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

La réponse doit inclure le nœud que nous venons d'ajouter :

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "validators": [
            {
                "nodeID": "NodeID-LMUue2dBBRWdDbPL4Yx47Ps31noeewJji",
                "startTime":1584042912,
                "endTime":1584121156,
                "weight": "1"
            }
        ]
    },
    "id": 1
}
```

Lorsque l'heure atteint `1584042912`, ce nœud commencera à valider ce sous-réseau. Lorsqu'il atteint `1584121156`, ce nœud cessera de valider ce sous-réseau.

### Ajouter le sous-réseau à la liste blanche <a id="whitelisting-the-subnet"></a>

Maintenant que le nœud a été ajouté en tant que validateur du sous-réseau, ajoutons-le à la liste blanche des sous-réseaux. La liste blanche empêche le nœud de valider un sous-réseau sans le vouloir.

Pour ajouter le sous-réseau à la liste blanche, redémarrez le nœud et ajoutez le paramètre `--whitelisted-subnets` avec une liste de sous-réseaux séparés par des virgules à la liste blanche.

La commande complète est :

`./build/avalanchego --whitelisted-subnets=nTd2Q2nTLp8M9qv2VKHMdvYhtNWX7aTPa4SMEK7x7yJHbcWvr`[  
](https://docs.avax.network/v/v1.0.4/build/tutorials/platform)

