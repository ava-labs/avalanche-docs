# Transfert d'AVAX entre la chaîne X et la P-Chain

## Introduction

Les jetons AVAX existent sur la X-Chain, où ils peuvent être tradés, sur la P-Chain, où ils peuvent être fournis comme un enjeu lors de la validation du réseau principal, et sur la C-Chain, où ils peuvent être utilisés dans des contrats intelligents ou pour payer le gaz. Avalanche prend en charge le mouvement d'AVAX entre ces chaînes et à l'avenir, Avalanche prend en charge les échanges atomiques plus génériques entre les chaînes. Dans ce tutoriel, nous enverrons des jetons AVAX entre la X-Chain et P-Chain.

## Exigences

Vous avez terminé [Obtenir des fonds](../nodes-and-staking/run-avalanche-node.md) et vous êtes familier avec [l'architecture d'Avalanche](../../../learn/platform-overview/).

Pour envoyer AVAX, vous devez avoir un peu AVAX ! Vous pouvez obtenir un véritable AVAX en l'achetant sur un échange, ou vous pouvez obtenir un test d'AVAX sur le [faucet de test](https://faucet.avax-test.network) AVAX, qui est un moyen gratuit et facile de se connecter à Avalanche.

## Transfert d'AVAX en utilisant le portefeuille Web

La manière la plus facile de transférer AVAX entre les chaînes est d'utiliser [le portefeuille](https://wallet.avax.network/) Avalanche, qui est un moyen non gardien et sécurisé d'accéder et de déplacer AVAX.

Le code source d'Avalanche Wallet se trouve [ici](https://github.com/ava-labs/avalanche-wallet).

### Étape 1 - Ouvrir le portefeuille d'Avalanche

![Image pour post](../../../.gitbook/assets/wallet-x2p-01-login.png)

Sélectionnez le portefeuille **d'accès **pour entrer dans votre portefeuille. Pour connecter le portefeuille à un réseau autre que le réseau principal d'Avalanche, sélectionnez **Mainnet **et choisissez le réseau à connecter.

### Étape 2 - Connectez-vous à votre portefeuille

Vous pouvez accéder à votre portefeuille en utilisant la clé privée, la phrase de clé mnemonique, le fichier de frappe ou le ledger Nano S.

![Image pour post](../../../.gitbook/assets/wallet-x2p-02-access.png)

Après un login réussi, vous verrez votre solde, votre portefeuille d'actifs et diverses autres informations.

### Étape 3 - Allez à l'onglet Cross Chain

![Image pour post](../../../.gitbook/assets/wallet-x2p-03-earn.png)

La fonctionnalité pour transférer les jetons entre les chaînes est sur l'onglet **Cross **Chain.

### Étape 4 - Inscrivez un montant à transférer

Vous serez présenté avec un choix pour la chaîne **source et la chaîne **de ****destination. Sélectionnez X-Chain et P-Chain, respectivement. Vous verrez vos soldes X et P, et un champ d'entrée pour entrer le montant à transférer de la source à la chaîne de destination.

![Image pour post](../../../.gitbook/assets/wallet-x2p-05-x-p.png)

Entrez le montant que vous souhaitez transférer de la X-Chain vers la P-Chain.

### Étape 5 - Confirmer la transaction

![Image pour post](../../../.gitbook/assets/wallet-x2p-06-confirm.png)

Appuyez sur la ****confirmation, puis **transférez **pour initier le transfert.

### Étape 6 - Fait !

Un transfert interchaîne est un processus en deux étapes : d'abord une transaction pour exporter les fonds de la X-Chain, et un autre pour l'importer sur la P-Chain. Le portefeuille fera la fois et montrera ses progrès tout en le faisant ainsi.

![Image pour post](../../../.gitbook/assets/wallet-x2p-07-transfer.png)

C'est tout ! Vous avez transféré AVAX de la X-Chain à P-Chain ! Maintenant, vous pouvez les utiliser pour valider ou déléguer sur le réseau d'Avalanche.

### Transfert de P-Chain à X-Chain

Pour retourner the à la X-Chain, vous devez effectuer le transfert dans la direction opposée.

Échangez les chaînes de source et de destination en les sélectionnant dans le menu **déroulant **Source **et **destination. Le reste du processus est le même : entrez le montant, confirment et transférer.

## Transfert de la chaîne X à la P-Chain avec des appels API

Si vous construisez une application sur le réseau Avalanche, vous pouvez faire le transfert programmatically dans le cadre de certaines fonctionnalités plus larges. Vous pouvez le faire en appelant les API appropriées sur un nœud AvalancheGo. Le reste du tutoriel suppose que vous avez accès à un nœud AvalancheGo, aux jetons AVAX sur la X-Chain, et les identifiants d'utilisateur [créés](../../avalanchego-apis/keystore-api.md#keystorecreateuser) et stockés dans la frappe du nœud.

Tous les exemples d'appels API ci-dessous supposent que le nœud s'exécute localement \(c'est-à-dire l'écoute sur `127.0.0.1`\). Le nœud peut être connecté au réseau principal, à un réseau de test ou à un réseau local. Dans chaque cas, les appels et les réponses de l'API devraient être les mêmes, sauf pour les formats d'adresses. Le nœud n'a pas besoin d'être local; vous pouvez passer des appels à un nœud hébergé ailleurs.

Comme vous pouvez le constater, lors du transfert d'AVAX en utilisant le portefeuille d'Avalanche, un transfert inter-chaînes est une opération de deux transactions :

* Exporter AVAX de la X-Chain
* Importer AVAX sur la P-chain

### Étape 1 - Exporter AVAX de la X-Chain

Pour exporter AVAX, appelez la méthode de la [`avm.exportAVAX`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-exportavax)X-Chain.

Votre appel devrait ressembler à ceci :

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

où `to`est l'adresse d'une adresse P-Chain vos contrôles d'utilisateur et où `changeAddr`est l'adresse pour envoyer tout changement. Vous pouvez laisser en `changeAddr`blanc; si vous la laissez en blanc, le changement sera retourné à une adresse contrôlée par votre utilisateur \(voir [ici](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createaddress) pour obtenir des instructions sur la création d'une nouvelle adresse P-Chain\).

Notez que vous paierez une redevance de transaction pour les opérations d'exportation et d'importation. Dans cet exemple, supposons que la taxe de transaction est `.001`AVAX. Puis, l'exportation ci-dessus consomme en fait `.006`AVAX; `.005`va à la P-Chain et est `.001`brûlé en tant que frais de transaction.

Assurez-vous que le montant que vous envoyez dépasse les frais de transaction. _Sinon, lorsque vous importez AVAX sur la P-Chain, il consommera les frais de transaction, et vous finirez par moins _d'AVAX sur la P-Chain.

La réponse devrait ressembler à ce qui suit :

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

Nous pouvons également appeler [`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance)pour vérifier que that a été déduit d'une adresse détenue par notre utilisateur :

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

Le montant déduit est le montant exporté \( `.005`AVAX dans cet exemple\) et les frais de transaction. Si votre utilisateur contrôle plusieurs adresses X-Chain, AVAX peut avoir été envoyé de n'importe quelle combinaison d'elles.

### Étape 2 - Importer AVAX sur la P-Chain

Notre transfert n'est pas encore fait. Nous devons appeler la [`platform.importAVAX`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-importavax)méthode de P-Chain pour terminer le transfert.

Votre appel devrait ressembler à ceci :

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

Cela renvoie l'ID de la transaction :

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

Elle devrait être , ce qui signifie `Committed`que le transfert est complet. Nous pouvons également vérifier le solde de l'adresse avec :

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

La réponse devrait ressembler à ce qui suit :

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

Notez que le solde que nous voyons est le montant exporté de la X-Chain \( `.004`AVAX\) moins la taxe de transaction \( `.001`AVAX dans cet exemple\). Maintenant, nous pouvons utiliser Now, détenu par cette adresse P-Chain pour fournir un enjeu afin de valider le réseau principal.

## Transfert de la P-Chain à la X-Chain de

Maintenant, déplacons AVAX de la P-Chain vers la X-Chain.

Même qu'auparavant, c'est également une opération de deux transactions :

* Exportation de la P-Chain
* Importer sur la chaîne X

### Étape 1 - Exporter AVAX de la P-Chain

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

où `to`est l'adresse X-Chain que the est envoyé.

Cela renvoie l'ID de la transaction, et nous pouvons vérifier que la transaction a été engagée avec un autre appel à [`platform.getTxStatus`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-gettxstatus). Encore une fois, assurez-vous que le montant que vous envoyez dépasse les frais de transaction.

### Étape 2 - Importer AVAX vers X-Chain

Pour terminer notre transfert de la P-Chain vers la X-Chain, appelez [`avm.importAVAX`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-importavax):

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

Notez que `to`c'est la même adresse spécifiée dans notre appel à .[`platform.exportAVAX`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-exportavax)

Comme auparavant, nous pouvons appeler [`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance)pour vérifier que les fonds ont été reçus. Le solde aurait dû augmenter par `.003`AVAX moins les frais de transaction.

## Empiler

C'est tout ! Maintenant, vous pouvez échanger des AVAX en allers et en dehors de la chaîne and de la P-Chain, en utilisant le portefeuille d'Avalanche, et en appelant les appels API appropriés sur un nœud d'Avalanche.

Maintenant, vous pouvez utiliser les jetons sur la P-Chain pour [ajouter un nœud en tant que validateur](../nodes-and-staking/add-a-validator.md) sur le réseau principal.

