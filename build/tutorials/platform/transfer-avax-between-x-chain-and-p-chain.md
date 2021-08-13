# Transfert AVAX entre la chaîne X-Chain la chaîne P

## Introduction

Les jetons AVAX existent sur la chaîne X, où ils peuvent être négociés, sur la X-Chain, où ils peuvent être fournis comme une mise en jeu lors de la validation du réseau primaire, et sur la chaîne C, où ils peuvent être utilisés dans des contrats intelligents ou pour payer le gaz. Avalanche supporte le mouvement of et à l'avenir, Avalanche supportera des swaps atomiques plus génériques entre chaînes. Dans ce tutoriel, nous enverrons AVAX entre la chaîne X-Chain P-Chain.

## Exigences minimales

Vous avez terminé [Démarrer](../nodes-and-staking/run-avalanche-node.md) et êtes familier avec [l'architecture d'Avalanche](../../../learn/platform-overview/).

Afin d'envoyer AVAX, vous devez avoir un peu AVAX! Vous pouvez obtenir un vrai AVAX l'achetant sur un échange, ou vous pouvez obtenir testnet AVAX le [robinet de test AVAX](https://faucet.avax-test.network), qui est un moyen gratuit et facile de se faire jouer avec Avalanche.

## Transfert AVAX en utilisant le portefeuille Web

La façon la plus facile de transférer AVAX entre les chaînes est d'utiliser [le Portefeuille Avalanche](https://wallet.avax.network/), qui est une façon non privative et sécuritaire d'accéder et de déplacer AVAX.

Le code source du portefeuille Avalanche peut être trouvé [ici](https://github.com/ava-labs/avalanche-wallet).

### Étape 1 - Ouvrir le portefeuille d'avalanche

![Image pour post](../../../.gitbook/assets/wallet-x2p-01-login.png)

Sélectionnez **Portefeuille Accès** pour entrer votre portefeuille. Pour connecter le portefeuille à un réseau autre que le réseau principal Avalanche, sélectionnez **Mainnet** et choisissez le réseau à connecter.

### Étape 2 - Connectez-vous à votre portefeuille

Vous pouvez accéder à votre portefeuille en utilisant la clé privée, la phrase clé mnémonique, le fichier keystore ou Ledger Nano S.

![Image pour post](../../../.gitbook/assets/wallet-x2p-02-access.png)

Après une connexion réussie, vous verrez votre solde, votre portefeuille d'actifs et diverses autres informations.

### Étape 3 - Aller à l'onglet Cross chaîne

![Image pour post](../../../.gitbook/assets/wallet-x2p-03-earn.png)

La fonctionnalité pour le transfert de jetons entre les chaînes est sur l'onglet **Chaîne** croisée.

### Étape 4 - Entrez le montant à transférer

Vous serez présenté avec un choix pour Chaîne **source** et **Chaîne de destination**. Sélectionnez X-Chain et P-Chain, respectivement. Vous verrez vos soldes X et P et un champ d'entrée pour entrer le montant à transférer de la source à la chaîne de destination.

![Image pour post](../../../.gitbook/assets/wallet-x2p-05-x-p.png)

Entrez le montant que vous souhaitez transférer de la chaîne Xà la chaîne P-Chain.

### Étape 5 - Confirmer la transaction

![Image pour post](../../../.gitbook/assets/wallet-x2p-06-confirm.png)

Appuyez sur **Confirmer**, puis **Transfert** pour initier le transfert.

### Étape 6 - Fait!

Un transfert interchaîne est un processus en deux étapes : d'abord une transaction pour exporter les fonds de la chaîne X, et un autre pour l'importer dans la chaîne P. Le portefeuille fera les deux et montrer ses progrès tout en le faisant ainsi.

![Image pour post](../../../.gitbook/assets/wallet-x2p-07-transfer.png)

C'est ça! Vous avez transféré AVAX de la chaîne Xà P-Chain ! Maintenant, vous pouvez les utiliser pour valider ou déléguer sur le réseau Avalanche.

### Transfert de la chaîne P à la chaîne X.

Pour retourner the la chaîne X, vous devez effectuer le transfert dans la direction opposée.

Swap la source et les chaînes de destination en les sélectionnant dans le menu déroulant **Source** et **destination.** Le reste du processus est le même: entrez le montant, confirmer et transfert.

## Transfert de la chaîne Xà la chaîne X-Chain les appels API

Si vous construisez une application sur le réseau Avalanche, vous pouvez vouloir effectuer le transfert programmatiquement dans le cadre de certaines fonctionnalités plus larges. Vous pouvez le faire en appelant les API appropriées sur un nœud AvalancheGo. Le reste du tutoriel suppose que vous avez accès à un nœud AvalancheGo, des jetons node, la chaîne X, et les identifications utilisateur [créées](../../avalanchego-apis/keystore-api.md#keystorecreateuser) et stockées dans la clé du nœud.

Tous les exemples des appels API ci-dessous supposent que le noeud fonctionne localement \(c'est-à-dire à l'écoute sur `127.0.0.1`\). Le noeud peut être connecté au réseau principal, à un réseau d'essai ou à un réseau local. Dans chaque cas, les appels et les réponses API devraient être les mêmes, sauf pour les formats d'adresse. Le noeud n'a pas besoin d'être local; vous pouvez téléphoner à un noeud hébergé ailleurs.

Comme vous l'avez peut-être remarqué lors du transfert AVAX à l'aide du portefeuille Avalanche, un transfert interchaîne est une opération de deux opérations :

* Exportation AVAX de la chaîne X
* Importation AVAX dans la chaîne P

### Étape 1 - Exportation AVAX de la chaîne X.

Pour exporter AVAX, appelez la méthode [`X-Chain’s`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-exportavax) de la chaîne X.

Votre appel devrait ressembler à ceci:

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

où est l'adresse d'une adresse P-Chain vos contrôles utilisateur et `changeAddr` est l'adresse `à` envoyer tout changement. Vous pouvez laisser `changeAddr` vide; si vous la laissez vide, le changement sera retourné à une adresse contrôlée par votre utilisateur \(voir [ici](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createaddress) pour les instructions sur la création d'une nouvelle adresse P-Chain adresse\).

Notez que vous payerez des frais de transaction tant pour les opérations d'exportation que d'importation. Dans cet exemple, supposons que la taxe de transaction est `.001` AVAX. Ensuite, l'exportation ci-dessus consomme effectivement `.006` AVAX; `.005` va à la chaîne P et `.001` est brûlé comme une taxe de transaction.

Assurez-vous que le montant que vous envoyez dépasse les frais de transaction. Sinon, lorsque vous importez AVAX sur la P-Chain, il consommera les frais de transaction, et vous finirez avec _moins_ AVAX sur la P-Chain,

La réponse devrait ressembler à ceci:

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

Nous pouvons vérifier que cette transaction a été acceptée en appelant [`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus):

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

Ce qui montre notre transaction est acceptée:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "status": "Accepted"
    },
    "id": 1
}
```

Nous pouvons également appeler [`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance) pour vérifier que that a été déduite d'une adresse détenue par notre utilisateur :

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

Le montant déduit est le montant exporté \(`.005` AVAX dans cet exemple\) plus les frais de transaction. Si votre utilisateur contrôle plusieurs adresses X-Chain AVAX peut avoir été envoyé depuis n'importe quelle combinaison d'entre elles.

### Étape 2 - Importation AVAX dans la chaîne P

Notre transfert n'est pas encore terminé. Nous devons appeler la méthode P-Chain’s [`platform.importAVAX`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-importavax) terminer le transfert.

Votre appel devrait ressembler à ceci:

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

Ceci retourne l'ID de la transaction :

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

Nous pouvons vérifier que la transaction a été acceptée avec:

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

Il devrait être `engagé`, ce qui signifie que le transfert est complet. Nous pouvons également vérifier le solde de l'adresse avec:

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

La réponse devrait ressembler à ceci:

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

Notez que le solde que nous voyons est le montant exporté de la chaîne X\(`.004` AVAX\) moins la taxe de transaction \(`.001` AVAX\) cet exemple\). Maintenant, nous pouvons utiliser the détenu par cette adresse P-Chain pour fournir une participation afin de valider le réseau primaire.

## Transfert de la chaîne P à la chaîne X-Chain

Maintenant, déplacons AVAX la chaîne P vers la chaîne X.

Même qu'auparavant, il s'agit également d'une opération de deux opérations :

* Exportation de la chaîne P
* Importation dans la chaîne X.

### Étape 1 - Exportation AVAX de la chaîne P

Pour ce faire, appelez [`platform.exportAVAX`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-exportavax):

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

où est l'adresse `X-Chain` que the est envoyé à.

Cela renvoie l'ID de la transaction, et nous pouvons vérifier que la transaction a été engagée avec un autre appel à [`platform.getTxStatus`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-gettxstatus). Encore une fois, assurez-vous que le montant que vous envoyez dépasse les frais de transaction.

### Étape 2 - Importation AVAX dans la chaîne X.

Pour terminer notre transfert de la chaîne P à la chaîne X, appelez [`avm.importAVAX`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-importavax):

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

Notez que `pour` est la même adresse spécifiée dans notre appel à [`platform.exportAVAX`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-exportavax).

Comme avant, nous pouvons appeler [`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance) pour vérifier les fonds ont été reçus. Le solde aurait dû augmenter de `003` AVAX moins les frais de transaction.

## Emballage

C'est ça! Maintenant, vous pouvez échanger AVAX l'arrière entre la chaîne Xet la chaîne X-Chain à la fois en utilisant le portefeuille Avalanche, et en appelant les appels API appropriés sur un nœud Avalanche.

Maintenant, vous pouvez utiliser les jetons sur la chaîne P pour [ajouter un noeud comme un validant](../nodes-and-staking/add-a-validator.md) sur le réseau primaire.

