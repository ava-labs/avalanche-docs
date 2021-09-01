# Ajouter un nœud à l'ensemble de validateurs

## Introduction

Le [réseau primaire](https://avalanche.gitbook.io/avalanche/build/tutorials/platform/add-a-validator#introduction) est inhérent à la plateforme Avalanche et valide les [blockchains intégrées](https://avalanche.gitbook.io/avalanche/learn/platform-overview) d'Avalanche. Dans ce tutoriel, nous ajouterons un nœud au réseau primaire et un [sous-réseau](https://avalanche.gitbook.io/avalanche/learn/platform-overview#subnets) sur Avalanche.

La P-Chain gère les métadonnées sur Avalanche. Cela inclut le suivi des nœuds dans lesquels les sous-réseaux, qui existent des blockchains, et qui sont des sous-réseaux qui valident les blockchains. Pour ajouter un validateur, nous émettrons des [transactions](http://support.avalabs.org/en/articles/4587384-what-is-a-transaction) sur le P-Chain.

{% hint style="danger" %}Notez qu'une fois que vous émettez la transaction pour ajouter un nœud en tant que validateur, il n'y a pas moyen de changer les paramètres.** Vous ne pouvez pas supprimer rapidement votre pieu ou modifier le montant de la pique, l'ID de nœud ou l'adresse de récompense.** Assurez-vous que vous utilisez les valeurs correctes des appels API ci-dessous. Si vous n'êtes pas sûr, naviguez sur la [FAQ](http://support.avalabs.org/en/collections/2618154-developer-faq) du développeur ou demandez de l'aide sur [Discord.](https://chat.avalabs.org/){% endhint %}

## Exigences

Vous avez terminé [Exécuter un nœud Avalanche](run-avalanche-node.md) et êtes familier avec [l'architecture d'Avalanche](../../../learn/platform-overview/). Dans ce tutoriel, nous utilisons [la collection Postman d'Avalanche](https://github.com/ava-labs/avalanche-postman-collection) pour nous aider à faire des appels d'API.

Afin de garantir que votre nœud est bien connecté, assurez-vous que votre nœud peut recevoir et envoyer du trafic TCP sur le port de jalonnement \( `9651`par défaut\) et que vous avez commencé votre nœud avec un argument de ligne de commande `--public-ip=[YOUR NODE'S PUBLIC IP HERE]`. Ne pas faire l'un ou l'autre de ces derniers peut compromettre votre récompense en jalonnement.

## Ajouter un validateur avec Avalanche Wallet

Premièrement, nous vous montrons comment ajouter votre nœud en tant que validateur en utilisant [Avalanche Wallet](https://wallet.avax.network).

Obtenez l'ID de votre nœud en appelant [`info.getNodeID`](https://avalanche.gitbook.io/avalanche/build/apis/info-api#info-getnodeid):

![getNodeID](../../../.gitbook/assets/getNodeID-postman.png)

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

Ouvrez [le portefeuille](https://wallet.avax.network/) et accédez à `Earn`l'onglet. Choisissez .`Add Validator`

![Le portefeuille Web](../../../.gitbook/assets/web-wallet-earn-tab.png)

Remplissez les paramètres de jalonnement. Ils sont expliqués plus en détail ci-dessous. Lorsque vous avez rempli tous les paramètres de jalonnement et les avez vérifiés en double, cliquez sur `Confirm`. Assurez-vous que la période de jalonnement est d'au moins 2 semaines, le tarif des frais de délégation d'au moins 2 %, et que vous you’re au moins 2 000 AVAX.

{% page-ref page="../../../learn/platform-overview/staking.md" %}

![Gagner valid](../../../.gitbook/assets/earn-validate.png)

Vous devez voir ce message de succès et votre solde doit être mis à jour.

![Votre transaction de validation est envoyée](../../../.gitbook/assets/your-validation-transaction-is-sent.png)

L'appel [`platform.getPendingValidators`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-getpendingvalidators)vérifie que notre transaction a été acceptée.

![getPendingValidators](../../../.gitbook/assets/getPendingValidators-postman.png)

Retourner à `Earn`l'onglet et cliquez sur .`Estimated Rewards`

![Gagner, valider, déléguer](../../../.gitbook/assets/earn-validate-delegate.png)

Une fois que le temps de départ de votre validateur est passé, vous verrez les récompenses qu'il peut gagner, ainsi que son temps de départ, son temps de fin et le pourcentage de sa période de validation qui est passée.

![Récompenses estimatives](../../../.gitbook/assets/estimated-rewards.png)

C'est tout !

## Ajouter un validateur avec des appels API

Nous pouvons également ajouter un nœud au validateur en faisant des appels API à notre nœud. Pour ajouter un nœud le réseau primaire, nous appellerons [`platform.addValidator`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-addvalidator).

La signature de cette méthode est :

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

Passons par les arguments et examinons ces arguments.

`nodeID`

Ceci est l'ID de nœud du validateur qui est ajouté. Pour obtenir l'ID de votre nœud, appelez [`info.getNodeID`](https://avalanche.gitbook.io/avalanche/build/apis/info-api#info-getnodeid):

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

`startTime`et`endTime`

Lorsque l'on émet une transaction pour rejoindre le réseau principal, il spécifie le moment où il entrera \(commencer à valider\) et le congé \(cesse de valider.\) La durée minimale que l'on peut valider le réseau primaire est de 24 heures et la durée maximale est d'un an. `startTime`On peut réentrer le réseau primaire après son départ, c'est juste que la _durée maximale _continue est d'un an. `startTime`et `endTime`sont les temps Unix où votre validateur démarrera et arrêtera de valider le réseau primaire, respectivement.

`stakeAmount`

Afin de valider le réseau principal, il faut piquer AVAX. Ce paramètre définit la quantité d'AVAX staké.

`rewardAddress`

Lorsqu'un validateur cesse de valider le réseau primaire, ils recevront une récompense s'ils sont suffisamment sensibles et corrects pendant qu'ils ont validé le réseau primaire. Ces jetons sont envoyés à `rewardAddress`. La participation originale sera renvoyée à une adresse contrôlée par `username`.

Le piquet d'un validateur n'est jamais bloqué, peu importe leur comportement; ils recevront toujours leur piquet de retour lorsqu'ils auront été terminés.

`changeAddr`

Tout changement résultant de cette transaction sera envoyé à cette adresse. Vous pouvez quitter ce champ vide.Si vous le faites, le changement sera envoyé à l'une des adresses de vos commandes d'utilisateurs.

`delegationFeeRate`

Avalanche permet la délégation d'enjeux. Ce paramètre est la redevance en pourcentage que ce validateur facture lorsque d'autres délèguent des piqûres à eux. `delegationFeeRate``1.2345`Par exemple, si le est et si quelqu'un délègue à ce validateur, puis lorsque la période de délégation est terminée, 1,2345 % de la récompense va au validateur et le reste va au délégué.

`username`et`password`

Ces paramètres sont le nom d'utilisateur et le mot de passe de l'utilisateur qui paie les frais de transaction, fournit of et à qui of staked sera renvoyé.

Maintenant envoyons la transaction. Nous utilisons la commande shell `date`pour calculer le temps Unix 10 minutes et 30 jours à l'avenir pour utiliser comme valeurs de `startTime`et , `endTime`respectivement. \(Remarque : si vous êtes sur un Mac, remplacez `$(date`par .`$(gdate` Si vous n'avez pas `gdate`installé, `brew install coreutils`faites.\) Dans cet exemple, nous piquons 2 000 AVAX \(2 x 1012 nAVAX\).

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

La réponse a l'ID de la transaction, ainsi que l'adresse que le changement a été fait.

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

Le statut devrait être , ce qui signifie que la transaction a été couronnée `Committed`de succès. Nous pouvons appeler [`platform.getPendingValidators`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-getpendingvalidators)et voir que le nœud est maintenant dans le validateur en instance pour le réseau principal :

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

La réponse devrait inclure le nœud que nous venons d'ajouter:

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

Lorsque le temps sera `1584021450`atteint, ce nœud commence à valider le réseau primaire. Lorsqu'il atteint `1584121156`, ce nœud cessera de valider le réseau primaire. The stagné sera retourné à une adresse contrôlée par `username`, et les récompenses, le cas échéant, seront remises à `rewardAddress`.

## Ajouter un validateur de sous-réseau

### Émission d'une transaction de validateur de sous-réseau

Maintenant, ajoutons le même nœud à un sous-réseau. Les suivants seront plus sensés si vous avez déjà fait ce [tutoriel sur la création d'un sous-réseau](https://avalanche.gitbook.io/avalanche/build/tutorials/platform/create-a-subnet). En ce moment, vous ne pouvez ajouter des validateurs aux sous-réseaux avec des appels d'API, et non avec Avalanche Wallet.

Supposons que le sous-réseau ait une ID `nTd2Q2nTLp8M9qv2VKHMdvYhtNWX7aTPa4SMEK7x7yJHbcWvr`, le seuil 2 et qui `username`contient au moins 2 clés de contrôle.

Pour ajouter le validateur, nous appellerons la méthode de l'API [`platform.addSubnetValidator`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-addsubnetvalidator). Sa signature est :

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

Examinons les paramètres :

`nodeID`

Ceci est l'ID de nœud du validateur qui est ajouté au sous-réseau.** Ce validateur doit valider le réseau primaire pour toute la durée qu'il valide ce sous-réseau.**

`subnetID`

Ceci est l'ID du sous-réseau sur lequel nous ajoutons un validateur.

`startTime`et`endTime`

Comme plus haut, ce sont les temps Unix que le validateur démarrera et arrêtera de valider le sous-réseau. `startTime`doit être au moment ou après lequel le validateur commence à valider le réseau primaire, et `endTime`doit être au plus tard au moment où le validateur cesse de valider le réseau primaire.

`weight`

Ceci est le poids d'échantillonnage du validateur pour un consensus. Si le poids du validateur est de 1 et que le poids cumulatif de tous les validateurs du sous-réseau est de 100, ce validateur sera inclus dans environ 1 échantillons sur 100 lors du consensus. Le poids cumulatif de tous les validateurs du sous-réseau doit être au moins `snow-sample-size`. Par exemple, s'il n'y a qu'un seul validateur dans le sous-réseau, son poids doit être au moins \(par `snow-sample-size`défaut 20\). Rappelez-vous que le poids d'un validateur ne peut pas être modifié pendant qu'il est en train de valider, alors assurez-vous d'utiliser une valeur appropriée.

`changeAddr`

Tout changement résultant de cette transaction sera envoyé à cette adresse. Vous pouvez quitter ce champ vide.Si vous le faites, le changement sera envoyé à l'une des adresses de vos commandes d'utilisateurs.

`username`et`password`

Ces paramètres sont le nom d'utilisateur et le mot de passe de l'utilisateur qui paie les frais de transaction. Cet utilisateur doit détenir un nombre suffisant de clés de contrôle de ce sous-réseau afin d'ajouter un validateur à ce sous-réseau.

Nous utilisons la commande shell `date`pour calculer le temps Unix 10 minutes et 30 jours à l'avenir pour utiliser comme valeurs de `startTime`et , `endTime`respectivement. \(Remarque : si vous êtes sur un Mac, remplacez `$(date`par .`$(gdate` Si vous n'avez pas `gdate`installé, `brew install coreutils`faites.\)

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

La réponse a l'ID de la transaction, ainsi que l'adresse que le changement a été fait.

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

Le statut devrait être , ce qui signifie que la transaction a été couronnée `Committed`de succès. Nous pouvons appeler [`platform.getPendingValidators`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-getpendingvalidators)et voir que le nœud est maintenant dans le validateur en instance pour le réseau principal. Cette fois-ci, nous spécifions l'ID du sous-réseau :

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {"subnetID":"nTd2Q2nTLp8M9qv2VKHMdvYhtNWX7aTPa4SMEK7x7yJHbcWvr"},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

La réponse devrait inclure le nœud que nous venons d'ajouter:

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

Lorsque le temps sera `1584042912`atteint, ce nœud commence à valider ce sous-réseau. Quand il atteint `1584121156`, ce nœud cessera de valider ce sous-réseau.

### Whitelist le sous-réseau

Maintenant que le nœud a été ajouté comme un validateur du sous-réseau, ajoutons-le à la liste blanche des sous-réseaux. Le whitelist empêche le nœud de valider un sous-réseau de manière non intentionnelle.

Pour blanchir le sous-réseau, redémarrez le nœud et ajoutez le paramètre avec une liste de sous-réseaux séparée `--whitelisted-subnets`par des virgules à la liste blanche.

La commande complète est :

`./build/avalanchego --whitelisted-subnets=nTd2Q2nTLp8M9qv2VKHMdvYhtNWX7aTPa4SMEK7x7yJHbcWvr`

