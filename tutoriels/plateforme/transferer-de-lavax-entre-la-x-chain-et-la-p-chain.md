# Transférer de l'AVAX entre la X-Chain et la P-Chain

## Introduction

Les jetons AVAX existent sur la X-Chain, où ils peuvent être échangés, sur la P-Chain, où ils peuvent être fournis comme enjeu lors de la validation du réseau primaire, et sur la C-Chain, où ils peuvent être utilisés dans des contrats intelligents, ou pour payer le gaz. Dans ce didacticiel, nous enverrons des jetons AVAX entre la X-Chain et la C-Chain.

## Condition

Vous avez terminé l'[exécution d'un nœud Avalanche](../../commencer.md) et vous connaissez l'[architecture d'Avalanche](../../apprendre/presentation-du-systeme/).

Pour envoyer de l'AVAX, vous devez avoir du AVAX! Vous pouvez obtenir le vrai AVAX en l'achetant sur un échange, ou vous pouvez obtenir le AVAX du tesnet depuis le [Faucet testnet](https://faucet.avax-test.network/), qui est un moyen gratuit et facile de jouer avec Avalanche.

## Transférer de l'AVAX à l'aide du portefeuille Web

Le moyen le plus simple de transférer de l'AVAX entre les chaînes est d'utiliser le [portefeuille Avalanche](https://wallet.avax.network/), qui est un moyen non custodial et sécurisé d'accéder et de déplacer de l'AVAX.

Le code source du portefeuille Avalanche peut être trouvé [ici](https://github.com/ava-labs/avalanche-wallet).

### Étape 1 - Ouvrez le portefeuille Avalanche

![](../../.gitbook/assets/image%20%2832%29.png)

Sélectionnez **"Acces Wallet"** pour accéder à votre portefeuille. Pour connecter le portefeuille à un réseau autre que le réseau principal d'Avalanche, sélectionnez **"Mainnet"** et choisissez le réseau auquel vous connecter.

### Étape 2 - Connectez-vous à votre portefeuille

Vous pouvez accéder à votre portefeuille en utilisant la clé privée, la phrase clé mnémonique, le fichier keystore ou Ledger Nano S. Les transferts C-Chain via Ledger ne sont pas encore pris en charge.

![](../../.gitbook/assets/image%20%2831%29.png)

Après une connexion réussie, vous verrez votre solde, votre portefeuille d'actifs et diverses autres informations.

### Étape 3 - Accédez à l'onglet Cross Chain



![](../../.gitbook/assets/image%20%2836%29.png)

La fonctionnalité de transfert de jetons entre les chaînes se trouve sur l'onglet **Cross Chain**.

### Étape 4 - Entrez le montant à transférer

Vous serez présenté avec un choix pour la chaîne **source** et la chaîne de **destination**. Sélectionnez respectivement X-Chain et P-Chain. Vous verrez vos soldes X et P et un champ de saisie pour saisir le montant à transférer de la chaîne source à la chaîne de destination.

![](../../.gitbook/assets/image%20%2829%29.png)

Entrez le montant que vous souhaitez transférer de la X-Chain vers la P-Chain.

### Étape 5 - Confirmer la transaction <a id="etape-5-confirmer-la-transaction"></a>

![](../../.gitbook/assets/image%20%2833%29.png)

Appuyez sur **Confirm,** puis sur **Transfer** pour lancer le transfert.

### Étape 6 - C'est fait!

Un transfert inter-chaîne est un processus en deux étapes: d'abord une transaction pour exporter les fonds de la X-Chain, et une autre pour les importer dans la P-Chain. Le portefeuille fera les deux et montrera sa progression tout en le faisant.

![](../../.gitbook/assets/image%20%2834%29.png)



{% hint style="info" %}
En cas de blocage de la transation depuis la X-Chain vers la C-Chain utiliser la fonction **"Import"** dans votre portefeuille en sélectionnant la X-Chain
{% endhint %}

### Transfert de la P-Chain à la X-Chain

Pour renvoyer l'AVAX à la X-Chain, vous devez effectuer le transfert dans la direction opposée.

Permutez la chaîne source et la chaîne de destination en les sélectionnant dans le menu déroulant **Source** et **Destination**. Le reste du processus est le même: entrez le montant \(amount\), puis appuyez sur **Confirm,** et ensuite sur **Transfer** pour lancer le transfert.

## Transférer de la X-Chain à la P-Chain avec des appels API

Si vous créez une application sur le réseau Avalanche, vous souhaiterez peut-être effectuer le transfert par programme dans le cadre d'une fonctionnalité plus large. Vous pouvez le faire en appelant les API appropriées sur un nœud AvalancheGo. Le reste du didacticiel suppose que vous avez accès à un nœud AvalancheGo, aux jetons AVAX sur la X-Chain et aux informations d'[identification de l'utilisateur créé](../../apis/keystore-api.md) et stockées dans le keystore du nœud.

Tous les exemples d'appels d'API ci-dessous supposent que le nœud s'exécute localement \(c'est-à-dire écoute sur `127.0.0.1`\). Le nœud peut être connecté au réseau principal, à un réseau de test ou à un réseau local. Dans chaque cas, les appels et les réponses de l'API doivent être identiques, à l'exception des formats d'adresse. Le nœud n'a pas besoin d'être local; vous pouvez passer des appels vers un nœud hébergé ailleurs.

Comme vous l'avez peut-être remarqué lors du transfert d'AVAX à l'aide du portefeuille Avalanche, un transfert inter-chaîne est une opération à deux transactions:

* Exporter de l'AVAX depuis la X-Chain
* Importer de l'AVAX dans la P-Chain

### Étape 1 - Exporter de l'AVAX depuis la X-Chain

Pour envoyer l’AVAX, appelez la méthode [`avm.exportAVAX`](../../apis/avm-api-x-chain.md#avm-exportavax) de la X-Chain.

Votre appel doit ressembler à ceci :

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.exportAVAX",
    "params" :{
        "to":"P-avax1wkmfja9ve3lt3n9ye4qp3l3gj9k2mz7ep45j7q",
        "destinationChain": "P",
        "amount": 5000000,
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Où `to` est l'adresse d'une adresse P-Chain que vous détenez et `changeAddr` est l'adresse à laquelle envoyer toute modification. Vous pouvez laisser `changeAddr` vide; si vous le faites, la modification sera retournée à une adresse contrôlée par votre utilisateur. \(Voir [ici](../../apis/platform-api-p-chain.md#platform-createaddress) pour obtenir des instructions sur la création d'une nouvelle adresse P-Chain.\)

Notez que vous paierez des frais de transaction pour les opérations d'exportation et d'importation. Dans cet exemple, supposons que les frais de transaction sont de `1 000 000` nAVAX \(`0.001` AVAX\). Ensuite, l'exportation ci-dessus consomme en fait `6 000 000` nAVAX \(`0.006` AVAX\); `5 000 000` \(`0.005` AVAX\) vont à la P-Chain et `1 000 000` \(`0.001` AVAX\) sont dépensés en frais de transaction.

Assurez-vous que le montant que vous envoyez dépasse les frais de transaction. Sinon, lorsque vous importez l'AVAX sur la P-Chain, les frais de transaction seront consommés et vous vous retrouverez avec moins d'AVAX sur la P-Chain.

La réponse devrait ressembler à ceci :

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "MqEaeWc4rfkw9fhRMuMTN7KUTNpFmh9Fd7KSre1ZqTsTQG73h",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
    },
    "id": 1
}
```

Nous pouvons vérifier que cette transaction a été acceptée en appelant [`avm.getTxStatus`](../../apis/avm-api-x-chain.md#avm-gettxstatus):

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "avm.getTxStatus",
    "params":{
        "txID":"MqEaeWc4rfkw9fhRMuMTN7KUTNpFmh9Fd7KSre1ZqTsTQG73h"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Ce qui montre que notre transaction est acceptée :

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "status": "Accepted"
    },
    "id": 1
}
```

Nous pouvons également appeler [`avm.getBalance`](../../apis/avm-api-x-chain.md#avm-getbalance) pour vérifier que l'AVAX a été déduit d'une adresse détenue par notre utilisateur :

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-ADDRESSGOESHERE",
        "assetID":"AVAX"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Le montant déduit est le montant exporté \(`5 000 000` nAVAX soit `0.005` AVAX dans cet exemple\) plus les frais de transaction. Si votre utilisateur contrôle plusieurs adresses X-Chain, l'AVAX peut avoir été envoyé à partir de n'importe quelle combinaison d'entre elles.

### Étape 2 - Importez AVAX dans la P-Chain

Notre transfert n’est pas encore terminé. Nous devons appeler la méthode [`platform.importAVAX`](../../apis/platform-api-p-chain.md#platform-importavax) de P-Chain pour terminer le transfert. 

Votre appel doit ressembler à ceci :

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.importAVAX",
    "params": {
        "to":"P-avax1wkmfja9ve3lt3n9ye4qp3l3gj9k2mz7ep45j7q",
        "sourceChain":"X",
        "changeAddr":"P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"myUsername",
        "password":"myPassword",
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

Cela renvoie l'ID de transaction :

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2sxo3ySETZ4xzXqAtgsUvZ5pdkqG4SML4c7Z7NoKLZcp77YNXC",
        "changeAddr":"P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

Nous pouvons vérifier que la transaction a été acceptée avec :

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getTxStatus",
    "params" :{
        "txID":"2sxo3ySETZ4xzXqAtgsUvZ5pdkqG4SML4c7Z7NoKLZcp77YNXC"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Cela devrait être`Committed`, ce qui signifie que le transfert est terminé. Nous pouvons également vérifier le solde de l'adresse avec :

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getBalance",
    "params":{
        "address":"P-avax1wkmfja9ve3lt3n9ye4qp3l3gj9k2mz7ep45j7q"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

La réponse devrait ressembler à ceci :

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "balance": "4000000",
        "utxoIDs": [
            {
                "txID": "2sxo3ySETZ4xzXqAtgsUvZ5pdkqG4SML4c7Z7NoKLZcp77YNXC",
                "outputIndex": 0
            }
        ]
    },
    "id": 1
}
```

Notez que le solde que nous voyons est le montant exporté de la X-Chain \(`4.000.000` nAVAX / `0.004` AVAX\) moins les frais de transaction \(`1.000.000` nAVAX/ `0.001` AVAX dans cet exemple.\) Maintenant, nous pouvons utiliser l'AVAX détenu par cette adresse P-Chain pour fournir une mise afin de valider le réseau primaire.

## Transfert de la P-Chain à la X-Chain par programmation

Maintenant, déplaçons AVAX sur la P-Chain vers la X-Chain.

Comme précédemment, il s'agit également d'une opération à deux transactions:

* Exportation depuis la P-Chain
* Importer dans la X-Chain

### Étape 1 - Exporter de l'AVAX à partir de la P-Chain

Pour ce faire, appelez [`platform.exportAVAX`](../../apis/platform-api-p-chain.md#platform-exportavax):

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.exportAVAX",
    "params": {
        "to":"X-avax1fjn5rffqvny7uk3tjegjs6snwjs3hhgcpcxfax",
        "amount":3000000,
        "changeAddr":"P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

Où `to` est l'adresse X-Chain à laquelle l'AVAX est envoyé.

Cela renvoie l'ID de transaction et nous pouvons vérifier que la transaction a été validée avec un autre appel à [`platform.getTxStatus`](../../apis/platform-api-p-chain.md#platform-gettxstatus). Encore une fois, assurez-vous que le montant que vous envoyez dépasse les frais de transaction.

### Étape 1 - Importer de l'AVAX vers X-Chain

Pour terminer notre transfert de la P-Chain vers la X-Chain, appelez [`avm.importAVAX`](../../apis/avm-api-x-chain.md#avm-importavax):

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.importAVAX",
    "params" :{
        "to":"X-avax1fjn5rffqvny7uk3tjegjs6snwjs3hhgcpcxfax",
        "sourceChain":"P",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Notez que `to` est la même adresse spécifiée dans notre appel à [`platform.exportAVAX`](../../apis/platform-api-p-chain.md#platform-exportavax).

Comme auparavant, nous pouvons appeler `avm.getBalance` pour vérifier que les fonds ont été reçus. Le solde aurait dû augmenter de `3 000 000` nAVAX soit `0.003` AVAX moins les frais de transaction.

## Récapitulatif

Vous pouvez maintenant permuter AVAX dans les deux sens entre la X-Chain et la P-Chain à la fois en utilisant le portefeuille Avalanche et en appelant les appels API appropriés sur un nœud Avalanche.

Vous pouvez maintenant utiliser les jetons sur la P-Chain pour ajouter [un nœud en tant que validateur](../noeuds-et-mise-en-jeu/ajouter-un-validateur.md) sur le réseau principal.

