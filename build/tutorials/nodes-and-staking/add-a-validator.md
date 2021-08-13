# Ajouter un noeud à l'ensemble de Validator

## Introduction

Le [réseau primaire](https://avalanche.gitbook.io/avalanche/build/tutorials/platform/add-a-validator#introduction) est inhérent à la plateforme Avalanche et valide les [chaînes intégrées](https://avalanche.gitbook.io/avalanche/learn/platform-overview) d'Avalanche. Dans ce tutoriel, nous allons ajouter un noeud au réseau primaire et un [sous-réseau](https://avalanche.gitbook.io/avalanche/learn/platform-overview#subnets) sur Avalanche.

La chaîne P-Chain les métadonnées sur Avalanche. Cela inclut le suivi des nœuds dans lesquels les sous-réseaux, quelles chaînes de blocs existent, et quels sous-réseaux valident les chaînes de blocage. Pour ajouter un validateur, nous allons émettre des [transactions](http://support.avalabs.org/en/articles/4587384-what-is-a-transaction) à la chaîne P.

{% allusion style="danger,%} Notez qu'une fois que vous délivrez la transaction pour ajouter un noeud comme validant, il n'y a aucun moyen de modifier les paramètres. **Vous ne pouvez pas supprimer votre participation tôt ou modifier le montant de la jeu, l'ID du noeud ou l'adresse de récompense.** Assurez-vous que vous utilisez les valeurs correctes dans les appels API ci-dessous. Si vous n'êtes pas sûr, naviguez dans la [FAQ du Développeur](http://support.avalabs.org/en/collections/2618154-developer-faq) ou demandez de l'aide sur [Discord.](https://chat.avalabs.org/) {% endhint %}

## Exigences minimales

Vous avez terminé [Run un nœud avalanche](run-avalanche-node.md) et vous êtes familier avec [l'architecture d'Avalanche](../../../learn/platform-overview/). Dans ce tutoriel, nous utilisons [la collection Avalanche Postman](https://github.com/ava-labs/avalanche-postman-collection) pour nous aider à faire des appels API.

Afin de vous assurer que votre noeud est bien connecté, assurez-vous que votre noeud peut recevoir et envoyer le trafic TCP sur le port de fuite \(`9651` par défaut\) et que vous avez démarré votre noeud avec l'argument de ligne de commande `--public-ip=[YOUR NODE'S PUBLIC IP HERE]`. Ne pas faire l'un de ces facteurs peut compromettre votre récompense staking

## Ajouter un validator avec Portefeuille Avalanche

Premièrement, nous vous montrons comment ajouter votre noeud comme un validant en utilisant [le Portefeuille Avalanche](https://wallet.avax.network).

Obtenez l'ID de votre noeud en appelant [`info.getNodeID`](https://avalanche.gitbook.io/avalanche/build/apis/info-api#info-getnodeid):

![getNodeID postman](../../../.gitbook/assets/getNodeID-postman.png)

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

Ouvrez [le portefeuille](https://wallet.avax.network/), et accédez à l'onglet `Gagner.` Choisissez `Ajouter Validator`.

![Portefeuille Web gagner onglet](../../../.gitbook/assets/web-wallet-earn-tab.png)

Remplissez les paramètres de mise en fumée. Ils sont expliqués plus en détail ci-dessous. Lorsque vous avez rempli tous les paramètres de mise en scène et double-vérifié, cliquez sur `Confirmer`. Assurez-vous que la période de mise en fuite est d'au moins 2 semaines, le tarif de délégation est d'au moins 2%, et vous êtes en train de tremper au moins 2000 AVAX.

{% page-ref page=".. /.. /../learn/platform-overview/staking.md" %}

![Gagner valider](../../../.gitbook/assets/earn-validate.png)

Vous devriez voir ce message de réussite, et votre solde devrait être mis à jour.

![Votre transaction de validation est envoyée](../../../.gitbook/assets/your-validation-transaction-is-sent.png)

Appeler [`platform.getPendingValidators`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-getpendingvalidators) vérifie que notre transaction a été acceptée.

![getPendingValidators postman](../../../.gitbook/assets/getPendingValidators-postman.png)

Retournez à l'onglet `Gagner,` et cliquez sur `Récompenses estimées`.

![Gagner, valider, délégué](../../../.gitbook/assets/earn-validate-delegate.png)

Une fois que le temps de démarrage de votre validant, vous verrez les récompenses qu'il peut gagner, ainsi que son temps de départ, le temps de fin et le pourcentage de sa période de validation qui est passée.

![Récompenses estimées](../../../.gitbook/assets/estimated-rewards.png)

C'est ça!

## Ajoutez un validator avec les appels API

Nous pouvons également ajouter un noeud au jeu de validation en faisant des appels API à notre noeud. Pour ajouter un noeud le Réseau primaire, nous appellerons [`platform.addValidator`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-addvalidator).

La signature de cette méthode est:

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

Passons à travers ces arguments et examinons.

`nodeID`

Ceci est l'ID du noeud du validateur ajouté. Pour obtenir l'ID de votre nœud, appelez [`info.getNodeID`](https://avalanche.gitbook.io/avalanche/build/apis/info-api#info-getnodeid):

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "info.getNodeID",
    "params":{},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

La réponse a l'ID de votre nœud :

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

Lorsque l'on délivre une transaction pour rejoindre le réseau primaire, ils spécifient l'heure qu'ils entrent \(commencer la validation\) et qu'ils quittent \(arrêter la validation. \) La durée minimale que l'on peut valider le réseau primaire est de 24 heures, et la durée maximale est d'un an. On peut entrer de nouveau le réseau primaire après le départ, il est juste que la durée maximale _continue_ est d'un an. `startTime` et `endTime` sont les temps Unix lorsque votre validateur démarrera et cesse de valider le réseau primaire, respectivement. `startTime` doit être dans l'avenir par rapport à la date de la transaction donnée.

`stakeAmount`

Afin de valider le réseau primaire, il faut piquer AVAX. Ce paramètre définit la quantité of

`gratifications`

Lorsqu'un validateur cesse de valider le réseau primaire, il recevra une récompense s'il est suffisamment sensible et correct pendant qu'il a validé le réseau primaire. Ces jetons sont envoyés à `rewardAddress`. La mise originale sera renvoyée à une adresse contrôlée par `le nom` d'utilisateur.

La mise d'un validateur n'est jamais inclinée, quel que soit son comportement; ils recevront toujours leur mise en retour lorsqu'ils auront terminé leur validation.

`changeAddr`

Tout changement résultant de cette transaction sera envoyé à cette adresse. Vous pouvez quitter ce champ vide; si vous le faites, le changement sera envoyé à l'une des adresses de vos commandes utilisateur.

`delegationFeeRate`

Avalanche permet la délégation de jeu. Ce paramètre est la redevance pour cent que ce validator charge lorsque d'autres leur déléguent la jeu. Par exemple, si la `delegationFeeRate` est `1.2345` et quelqu'un délégués à ce validant, alors lorsque la période de délégation est terminée, 1.2345% de la récompense va au validant et le reste va au delegator.

`nom d'utilisateur` et `mot de passe`

Ces paramètres sont le nom d'utilisateur et le mot de passe de l'utilisateur qui paie les frais de transaction, fournit of empilé et à qui of empilé sera retourné.

Maintenant, allons délivrer la transaction. Nous utilisons la `date` de commande shell pour calculer l'heure Unix 10 minutes et 30 jours à l'avenir pour l'utiliser comme valeurs de `startTime` et de `endTime`, respectivement. \(Note: Si vous êtes sur un Mac, remplacez `$(date` avec `$(gdate`. Si vous n'avez pas `gdate` installé, faites `brew installer coreutils`. \) Dans cet exemple nous piquons 2000 AVAX \(2 x 1012 nAVAX\).

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

La réponse a l'ID de la transaction, ainsi que l'adresse que le changement a effectuée.

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

Nous pouvons vérifier l'état de la transaction en appelant [`platform.getTxStatus`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-gettxstatus):

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

Le statut devrait être `engagé`, ce qui signifie que la transaction a été couronnée de succès. Nous pouvons appeler [`platform.getPendingValidators`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-getpendingvalidators) et voir que le noeud est maintenant dans l'ensemble de validation en instance pour le réseau primaire:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

La réponse devrait inclure le noeud que nous venons d'ajouter:

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

Lorsque le temps atteint `1584021450`, ce noeud commencera à valider le réseau primaire. Lorsqu'il atteint `1584121156`, ce noeud cessera de valider le réseau primaire. The empilé sera retourné à une adresse contrôlée par `le nom` d'utilisateur, et les récompenses, le cas échéant, seront remises à `rewardAddress`.

## Ajout d'un Validator de sous-réseau

### Émission d'une transaction de validateur sous-réseau

Maintenant, ajoutons le même noeud à un sous-réseau. Les éléments suivants auront plus de sens si vous avez déjà fait ce [tutoriel sur la création d'un sous-réseau](https://avalanche.gitbook.io/avalanche/build/tutorials/platform/create-a-subnet). En ce moment, vous pouvez seulement ajouter des validateurs aux sous-réseaux avec les appels API et non avec le Portefeuille Avalanche.

Supposons que le Sous-réseau ait ID `nTd2Q2nTLp8M9qv2VKHMdvYhtNWX7aTPa4SMEK7x7yJHbcWvr`, seuil 2, et que `le nom` d'utilisateur détient au moins 2 clés de contrôle.

Pour ajouter le validateur, nous appellerons API [`method`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-addsubnetvalidator) Sa signature est:

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

Examinons les paramètres:

`nodeID`

Ceci est l'ID du noeud du validateur étant ajouté au sous-réseau. **Ce validant doit valider le Réseau primaire pour toute la durée qu'il valide ce sous-réseau.**

`subnetID`

Ceci est l'ID du sous-réseau auquel nous ajoutons un validateur à.

`startTime` et `endTime`

Similaires à ci-dessus, ce sont les temps Unix que le validant démarrera et cessera de valider le sous-réseau. `startTime` doit être au moment ou après que le validant commence à valider le réseau primaire, et `la fin` Time doit être au ou avant le moment où le validant cesse de valider le réseau primaire.

`poids`

Ceci est le poids d'échantillonnage du validateur pour consensus. Si le poids du validateur est 1 et que le poids cumulatif de tous les validateurs dans le sous-réseau est 100, ce validateur sera inclus dans environ 1 échantillons sur 100 lors du consensus. Le poids cumulatif de tous les validateurs du sous-réseau doit être au moins `la taille de l'échantillon de neige`. Par exemple, s'il n'y a qu'un seul validateur dans le `subnet,` son poids doit être au moins subnet, \(20\par défaut). Rappelez-vous que le poids d'un validateur ne peut pas être changé pendant qu'il est validant, alors prenez soin d'utiliser une valeur appropriée.

`changeAddr`

Tout changement résultant de cette transaction sera envoyé à cette adresse. Vous pouvez quitter ce champ vide; si vous le faites, le changement sera envoyé à l'une des adresses de vos commandes utilisateur.

`nom d'utilisateur` et `mot de passe`

Ces paramètres sont le nom d'utilisateur et le mot de passe de l'utilisateur qui paie les frais de transaction. Cet utilisateur doit détenir un nombre suffisant de touches de contrôle de ce Subnet afin d'ajouter un validateur à ce Subnet.

Nous utilisons la `date` de commande shell pour calculer l'heure Unix 10 minutes et 30 jours à l'avenir pour l'utiliser comme valeurs de `startTime` et de `endTime`, respectivement. \(Note: Si vous êtes sur un Mac, remplacez `$(date` avec `$(gdate`. Si vous n'avez pas `gdate` installé, faites `brew installer coreutils`. \)

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.addSubnetValidator",
    "params": {
        "nodeID":"NodeID-LMUue2dBBRWdDbPL4Yx47Ps31noeewJji",
        "subnetID":"nTd2Q2nTLp8M9qv2VKHMdvYhtNWX7aTPa4SMEK7x7yJHbcWvr",
        "startTime":'$(date --date="10 minutes" +%s)',
        "endTime":'$(date --date="30 days" +%s)',
        "weight":30,
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"USERNAME",
        "password":"PASSWORD"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

La réponse a l'ID de la transaction, ainsi que l'adresse que le changement a effectuée.

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

Nous pouvons vérifier l'état de la transaction en appelant [`platform.getTxStatus`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-gettxstatus):

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

Le statut devrait être `engagé`, ce qui signifie que la transaction a été couronnée de succès. Nous pouvons appeler [`platform.getPendingValidators`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-getpendingvalidators) et voir que le noeud est maintenant dans l'ensemble de validation en instance pour le réseau primaire. Cette fois, nous spécifions l'ID subnet

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {"subnetID":"nTd2Q2nTLp8M9qv2VKHMdvYhtNWX7aTPa4SMEK7x7yJHbcWvr"},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

La réponse devrait inclure le noeud que nous venons d'ajouter:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "validators": [
            {
                "nodeID": "NodeID-LMUue2dBBRWdDbPL4Yx47Ps31noeewJji",
                "startTime":1584042912,
                "endTime":1584121156,
                "weight": "30"
            }
        ]
    },
    "id": 1
}
```

Lorsque le temps atteint `1584042912`, ce noeud commencera à valider ce sous-réseau. Lorsqu'il atteint `1584121156`, ce noeud cessera de valider ce sous-réseau.

### Blanchiment du sous-réseau

Maintenant que le noeud a été ajouté comme un validateur du sous-réseau, ajoutons-le au blanchisseur des sous-réseaux. Le blanchisseur empêche le noeud de valider un sous-réseau involontairement.

Pour blanchir le sous-réseau, redémarrez le noeud et ajoutez le paramètre `--`

La commande complète est:

`./build/avalanchego --whitelisted-subnet=nTd2Q2nTLp8M9qv2VKHMdvYhtNWX7aTPa4SMEK7x7yJHbcWvr`

