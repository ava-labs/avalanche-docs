# Transférer de l'AVAX entre la X-Chain et la P-Chain

## Introduction

Les jetons AVAX existent sur la X-Chain, où ils peuvent être échangés, sur la P-Chain, où ils peuvent être fournis en tant que participation lors de la validation du réseau principal, et sur la C-Chain, où ils peuvent être utilisés dans des contrats intelligents ou pour payer le gaz. Avalanche prend en charge le mouvement d'AVAX entre ces chaînes, et à l'avenir, Avalanche prendra en charge des échanges atomiques plus génériques entre les chaînes. Dans ce tutoriel, nous enverrons des jetons AVAX entre la X-Chain et la P-Chain.

## Exigences

Vous avez complété [Démarrer](../nodes-and-staking/run-avalanche-node.md) et vous connaissez l'[architecture d'Avalanche](../../../learn/platform-overview/).

Afin d'envoyer de l'AVAX, vous devez avoir du AVAX ! Vous pouvez obtenir le vrai AVAX en l'achetant sur un échange, ou vous pouvez obtenir l’AVAX du tesnet depuis le F[aucet testnet AVAX,](https://faucet.avax-test.network) qui est un moyen gratuit et facile de jouer avec Avalanche.

## Transférer de l'AVAX en utilisant le portefeuille web

Le moyen le plus simple de transférer de l'AVAX entre les chaînes est d'utiliser [le portefeuille Avalanche](https://wallet.avax.network/), qui est un moyen non custodial et sécurisé d'accéder et de déplacer de l'AVAX.

Le code source du portefeuille Avalanche peut être trouvé [ici](https://github.com/ava-labs/avalanche-wallet).

### Étape 1 - Ouvrez le portefeuille Avalanche

![Image pour la publication](../../../.gitbook/assets/wallet-x2p-01-login.png)

Sélectionnez **Accéder** au portefeuille pour entrer dans votre portefeuille. Pour connecter le portefeuille à un réseau autre que le réseau principal d'Avalanche, sélectionnez **Mainnet** et choisissez le réseau auquel vous connecter.

### Étape 2 - Connectez-vous à votre portefeuille

Vous pouvez accéder à votre portefeuille en utilisant la clé privée, la phrase clé mnémonique, le fichier keystore ou Ledger Nano S.

![Image pour la publication](../../../.gitbook/assets/wallet-x2p-02-access.png)

Après une connexion réussie, vous verrez votre solde, votre portefeuille d'actifs et diverses autres informations.

### Étape 3 - Accédez à l'onglet Cross Chain

![Image pour la publication](../../../.gitbook/assets/wallet-x2p-03-earn.png)

La fonctionnalité de transfert de jetons entre les chaînes se trouve sur l'onglet **Cross Chain**.

### Étape 4 - Introduisez un montant à transférer

Vous serez présenté avec un choix pour **la chaîne source** et **la chaîne de destination**. Sélectionnez X-Chain et P-Chain, respectivement. Vous verrez vos soldes X et P et un champ de saisie pour saisir le montant à transférer de la chaîne source à la chaîne de destination.

![Image pour la publication](../../../.gitbook/assets/wallet-x2p-05-x-p.png)

Introduisez le montant que vous souhaitez transférer de la X-Chain à la P-Chain.

### Étape 5 - Confirmez la transaction

![Image pour la publication](../../../.gitbook/assets/wallet-x2p-06-confirm.png)

Appuyez sur **Confimer**, puis **sur Transférer** pour lancer le transfert.

### Étape 6 - C'est fait !

Un transfert inter-chaîne est un processus en deux étapes : d'abord une transaction pour exporter les fonds de la X-Chain, et une autre pour les importer dans la P-Chain. Le portefeuille fera les deux et montrera sa progression tout en le faisant.

![Image pour la publication](../../../.gitbook/assets/wallet-x2p-07-transfer.png)

C'est tout ! Vous avez transféré de l'AVAX de la X-Chain vers la P-Chain ! Vous pouvez désormais les utiliser pour valider ou déléguer sur le réseau Avalanche.

### Transfert de la P-Chain à la X-Chain

Pour renvoyer l'AVAX à la X-Chain, vous devez effectuer le transfert dans la direction opposée.

Permutez la chaîne source et la chaîne de destination en les sélectionnant dans le menu déroulant **Source** et **Destination**. Le reste du processus est le même : saisissez le montant, validez et transférez.

## Transférer de la X-Chain à la P-Chain avec des appels API

Si vous créez une application sur le réseau Avalanche, vous souhaiterez peut-être effectuer le transfert par programme dans le cadre d'une fonctionnalité plus large. Vous pouvez le faire en appelant les API appropriées sur un nœud AvalancheGo. Le reste du tutoriel suppose que vous avez accès à un nœud AvalancheGo, aux jetons AVAX sur la X-Chain et aux informations d'identification de l'utilisateur [créé](../../avalanchego-apis/keystore-api.md#keystorecreateuser) et stockées dans le keystore du nœud.

Tous les exemples d'appels d'API ci-dessous supposent que le nœud s'exécute localement (c'est-à-dire écoute sur `127.0.0.1`). Le nœud peut être connecté au réseau principal, à un réseau de test ou à un réseau local. Dans chaque cas, les appels et les réponses de l'API doivent être identiques, à l'exception des formats d'adresse. Le nœud n'a pas besoin d'être local ; vous pouvez passer des appels vers un nœud hébergé ailleurs.

Comme vous l'avez peut-être remarqué lors du transfert d'AVAX à l'aide du portefeuille Avalanche, un transfert inter-chaîne est une opération à deux transactions :

* Exporter de l'AVAX à partir de la X-Chain
* Importer de l'AVAX sur la P-Chain

### Étape 1 - Exporter de l'AVAX à partir de la X-Chain

Pour exporter AVAX, appelez la [`avm.export`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-export)méthode  de la X-Chain avec  `AVAX`assetID.

Votre appel doit ressembler à ceci :

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.export",
    "params" :{
        "to":"P-avax1wkmfja9ve3lt3n9ye4qp3l3gj9k2mz7ep45j7q",
        "assetID": "AVAX",
        "amount": 5000000,
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Où `to` est l'adresse d'une adresse P-Chain que vous détenez et  `changeAddr`est l'adresse à laquelle envoyer toute modification. Vous pouvez laisser `changeAddr` vide ; si vous le faites, la modification sera retournée à une adresse contrôlée par votre utilisateur. (Voir [ici](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createaddress) pour obtenir des instructions sur la création d'une nouvelle adresse P-Chain.)

Notez que vous paierez des frais de transaction pour les opérations d'exportation et d'importation. Dans cet exemple, supposons que les frais de transaction sont de `.001` AVAX. Ensuite, l'exportation ci-dessus consomme en fait `.006`AVAX ; `.005` vont à la P-Chain et  `.001`sont dépensés en frais de transaction.

Assurez-vous que le montant que vous envoyez dépasse les frais de transaction. Sinon, lorsque vous importez l'AVAX sur la P-Chain, les frais de transaction seront consommés et vous vous retrouverez avec _moins_ d'AVAX sur la P-Chain.

La réponse devrait ressembler à ça :

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

Nous pouvons vérifier que cette transaction a été acceptée en appelant [`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus) :

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

Ce qui montre que notre transaction est acceptée :

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "status": "Accepted"
    },
    "id": 1
}
```

Nous pouvons également appeler [`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance) pour vérifier que l'AVAX a été déduit d'une adresse détenue par notre utilisateur :

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

Le montant déduit est le montant exporté (`.005` AVAX dans cet exemple) plus les frais de transaction. Si votre utilisateur contrôle plusieurs adresses X-Chain, l'AVAX peut avoir été envoyé à partir de n'importe quelle combinaison d'entre elles.

### Étape 2 - Importez AVAX dans la P-Chain

Notre transfert n'est pas encore terminé. Nous devons appeler la méthode [`platform.importAVAX`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-importavax) de P-Chain pour terminer le transfert.

Votre appel doit ressembler à ceci :

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

Cela renvoie l'ID de transaction :

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

Nous pouvons vérifier que la transaction a été acceptée avec :

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

Cela devrait `Committed`, ce qui signifie que le transfert est terminé. Nous pouvons également vérifier le solde de l'adresse avec :

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

La réponse devrait ressembler à ça :

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

Notez que le solde que nous voyons est le montant exporté de la X-Chain (`.004` AVAX) moins les frais de transaction (`.001` AVAX dans cet exemple.) Maintenant, nous pouvons utiliser l'AVAX détenu par cette adresse P-Chain pour fournir une mise afin de valider le réseau primaire.

## Transfert de la P-Chain à la X-Chain par programmation

Maintenant, déplaçons AVAX sur la P-Chain vers la X-Chain.

Comme précédemment, il s'agit également d'une opération à deux transactions :

* Exporter depuis la P-Chain
* Importer dans la X-Chain

### Étape 1 - Exporter de l'AVAX à partir de la P-Chain

Pour ce faire, appelez [`platform.exportAVAX`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-exportavax) :

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

Cela renvoie l'ID de transaction et nous pouvons vérifier que la transaction a été validée avec un autre appel à [`platform.getTxStatus`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-gettxstatus). Encore une fois, assurez-vous que le montant que vous envoyez dépasse les frais de transaction.

### Étape 1 - Importer de l'AVAX vers X-Chain

Pour terminer notre transfert de la P-Chain vers la X-Chain, appelez [`avm.import`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-import) :

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.import",
    "params" :{
        "to":"X-avax1fjn5rffqvny7uk3tjegjs6snwjs3hhgcpcxfax",
        "sourceChain":"P",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Notez que `to` est la même adresse spécifiée dans notre appel à [`platform.exportAVAX`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-exportavax).

Comme auparavant, nous pouvons appeler [`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance) pour vérifier que les fonds ont été reçus. Le solde aurait dû augmenter de `.003` AVAX moins les frais de transaction.

## Récapitulatif

C'est fini ! Vous pouvez maintenant permuter AVAX dans les deux sens entre la X-Chain et la P-Chain à la fois en utilisant le portefeuille Avalanche et en appelant les appels API appropriés sur un nœud Avalanche.

Vous pouvez maintenant utiliser les jetons sur la P-Chain pour [ajouter un nœud en tant que validateur](../nodes-and-staking/add-a-validator.md) sur le réseau principal.

