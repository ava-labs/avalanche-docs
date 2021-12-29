# Transférer de l'AVAX entre la X-Chain et la C-Chain

## Introduction

Les jetons AVAX existent sur la X-Chain, où ils peuvent être échangés, sur la P-Chain, où ils peuvent être fournis en tant que participation lors de la validation du réseau principal, et sur la C-Chain, où ils peuvent être utilisés dans des contrats intelligents ou pour payer de l'essence. Dans ce tutoriel, nous enverrons des jetons AVAX entre la X-Chain et la C-Chain.

## Exigences

Vous avez terminé [l'exécution d'un nœud Avalanche](../nodes-and-staking/run-avalanche-node.md) et vous connaissez [l'architecture d'Avalanche.](../../../learn/platform-overview/)

Afin d'envoyer de l'AVAX, vous devez avoir du AVAX ! Vous pouvez obtenir le vrai AVAX en l'achetant sur un échange, ou vous pouvez obtenir l’AVAX du tesnet depuis le F[aucet testnet AVAX,](https://faucet.avax-test.network) qui est un moyen gratuit et facile de jouer avec Avalanche.

## Transférer de l'AVAX en utilisant le portefeuille web

Le moyen le plus simple de transférer de l'AVAX entre les chaînes est d'utiliser [le portefeuille Avalanche](https://wallet.avax.network/), qui est un moyen non custodial et sécurisé d'accéder et de déplacer de l'AVAX.

Le code source du portefeuille Avalanche peut être trouvé [ici](https://github.com/ava-labs/avalanche-wallet).

### Étape 1 - Ouvrez le portefeuille Avalanche

![Image pour la publication](../../../.gitbook/assets/wallet-x2p-01-login.png)

Sélectionnez **Accéder** au portefeuille pour entrer dans votre portefeuille. Pour connecter le portefeuille à un réseau autre que le réseau principal d'Avalanche, sélectionnez **Mainnet** et choisissez le réseau auquel vous connecter.

### Étape 2 - Connectez-vous à votre portefeuille

Vous pouvez accéder à votre portefeuille en utilisant la clé privée, la phrase clé mnémonique, le fichier keystore ou Ledger Nano S. Les transferts C-Chain via Ledger ne sont pas encore pris en charge.

![Image pour la publication](../../../.gitbook/assets/wallet-x2p-02-access.png)

Après une connexion réussie, vous verrez votre solde, votre portefeuille d'actifs et diverses autres informations.

### Étape 3 - Accédez à l'onglet Cross Chain

![Image pour la publication](../../../.gitbook/assets/wallet-x2p-03-earn.png)

La fonctionnalité de transfert de jetons entre les chaînes se trouve sur l'onglet **Cross Chain**.

### Étape 4 - Introduisez un montant à transférer

Vous serez présenté avec un choix pour **la chaîne source** et **la chaîne de destination**. Sélectionnez X-Chain et C-Chain, respectivement. Vous verrez vos soldes X et C et un champ de saisie pour saisir le montant à transférer de la chaîne source à la chaîne de destination.

![Image pour la publication](../../../.gitbook/assets/wallet-x2c-01-x-c.png)

Introduisez le montant que vous souhaitez transférer de la X-Chain à la C-Chain.

### Étape 5 - Confirmez la transaction

![Image pour la publication](../../../.gitbook/assets/wallet-x2c-02-trasnfer.png)

Appuyez sur **Confimer**, puis **sur Transférer** pour lancer le transfert.

### Étape 6 - C'est fait !

Un transfert inter-chaîne est un processus en deux étapes : d'abord une transaction pour exporter les fonds de la X-Chain, et une autre pour les importer dans la C-Chain. Le portefeuille fera les deux et montrera sa progression tout en le faisant.

![Image pour la publication](../../../.gitbook/assets/wallet-x2c-03-done.png)

C'est tout ! Vous avez transféré de l'AVAX de la X-Chain vers la C-Chain ! Vous pouvez désormais les utiliser pour déployer des contrats intelligents sur C-Chain.

### Transférer de la C-Chain à la X-chain

Pour renvoyer l'AVAX à la X-Chain, vous devez effectuer le transfert dans la direction opposée.

Permutez la chaîne source et la chaîne de destination en les sélectionnant dans le menu déroulant **Source** et **Destination**. Le reste du processus est le même : saisissez le montant, validez et transférez.

## Transfert de la X-Chain à la C-Chain avec des appels d'API

Si vous créez une application sur le réseau Avalanche, vous souhaiterez peut-être effectuer le transfert par programme dans le cadre d'une fonctionnalité plus large. Vous pouvez le faire en appelant les API appropriées sur un nœud AvalancheGo. Le reste du tutoriel suppose que vous avez accès à un nœud AvalancheGo, aux jetons AVAX sur la X-Chain et aux informations d'identification de l'utilisateur [créé](../../avalanchego-apis/keystore-api.md#keystorecreateuser) et stockées dans le keystore du nœud.

Tous les exemples d'appels d'API ci-dessous supposent que le nœud s'exécute localement (c'est-à-dire écoute sur `127.0.0.1`). Le nœud peut être connecté au réseau principal, à un réseau de test ou à un réseau local. Dans chaque cas, les appels et les réponses de l'API doivent être identiques, à l'exception des formats d'adresse. Le nœud n'a pas besoin d'être local ; vous pouvez passer des appels vers un nœud hébergé ailleurs.

Comme vous l'avez peut-être remarqué lors du transfert d'AVAX à l'aide du portefeuille Avalanche, un transfert inter-chaîne est une opération à deux transactions :

* Exporter de l'AVAX à partir de la X-Chain
* Importer de l'AVAX sur la C-Chain

Avant de pouvoir effectuer le transfert, nous devons configurer l'adresse sur la C-Chain, ainsi que la clé de contrôle.

### Configurer l'adresse et la clé sur la C-Chain

La X-Chain utilise des adresses [Bech32](http://support.avalabs.org/en/articles/4587392-what-is-bech32) et la chaîne C-Chain utilise des adresses EVM hexadécimales. Il n'y a aucun moyen de convertir l'adresse d'un format à l'autre, car ils sont tous deux dérivés d'une clé privée à l'aide d'une fonction cryptographique à sens unique.

Afin de contourner ce problème, vous pouvez exporter une clé privée de la X-Chain, puis l'importer dans la C-Chain. De cette façon, vous pouvez utiliser l'adresse X-Chain et changer le préfixe X en un préfixe C afin d'obtenir la bonne adresse Bech32 à utiliser pour la C-Chain.

Tout d'abord, exportez une clé privée depuis la X-Chain :

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.exportKey",
    "params" :{
        "username" :"myUsername",
        "password":"myPassword",
        "address": "X-avax1jggdngzc9l87rgurmfu0z0n0v4mxlqta0h3k6e"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Réponse :

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "privateKey":"PrivateKey-2w4XiXxPfQK4TypYqnohRL8DRNTz9cGiGmwQ1zmgEqD9c9KWLq"
    }
}
```

Importez maintenant la même clé privée dans la C-Chain :

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avax.importKey",
    "params" :{
        "username" :"myUsername",
        "password":"myPassword",
        "privateKey":"PrivateKey-2w4XiXxPfQK4TypYqnohRL8DRNTz9cGiGmwQ1zmgEqD9c9KWLq"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

La réponse contient une adresse EVM codée en hexadécimal :

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "0x5Bf544EF123FE41B262295dBA41c5a9CFA8efDB4"
    },
    "id": 1
}
```

Nous avons maintenant tout ce dont nous avons besoin pour transférer les jetons.

### Transfert de la X-Chain à la C-Chain

Vous pouvez maintenant utiliser l'adresse correspondant à la clé privée que vous avez exportée et passer à l'utilisation du préfixe C- dans l'appel [`avm.export`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-export) :

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.export",
    "params" :{
        "assetID": "AVAX",
        "to": "C-avax1wkmfja9ve3lt3n9ye4qp3l3gj9k2mz7ep45j7q"
        "amount": 5000000,
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Étant donné que l'utilisateur de votre keystore possède la clé privée correspondante sur la C-Chain, vous pouvez maintenant importer l'AVAX à l'adresse de votre choix. Il n’est pas nécessaire de l’importer à la même adresse que celle vers laquelle il a été exporté ; vous pouvez donc l’importer directement vers une adresse que vous possédez dans MetaMask ou un autre service tiers.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avax.import",
    "params" :{
        "to":"0x4b879aff6b3d24352Ac1985c1F45BA4c3493A398",
        "sourceChain":"X",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

où `to` est une adresse EVM encodée en hexadécimal de votre choix.

La réponse devrait ressembler à ça :

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "LWTRsiKnEUJC58y8ezAk6hhzmSMUCtemLvm3LZFw8fxDQpns3"
    },
    "id": 1
}
```

Remarque : il n'y a pas de frais de transaction pour les transactions d'importation vers la C-Chain.

Une fois que votre AVAX a été transféré vers la C-Chain, vous pouvez immédiatement commencer à exécuter des contrats intelligents.

## Transférer de la C-Chain à la X-Chain

Vous pouvez maintenant déplacer AVAX de la C-Chain vers la X-Chain. Nous devons d'abord exporter :

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avax.exportAVAX",
    "params" :{
        "to":"X-avax1wkmfja9ve3lt3n9ye4qp3l3gj9k2mz7ep45j7q",
        "assetID": "AVAX",
        "amount": 5000000,
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

où `to` est l'adresse encodée en bech32 d'une adresse X-Chain que vous détenez. Assurez-vous que le montant que vous exportez dépasse les frais de transaction car les transactions d'exportation et d'importation factureront des frais de transaction.

La réponse devrait ressembler à ça :

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2ZDt3BNwzA8vm4CMP42pWD242VZy7TSWYUXEuBifkDh4BxbCvj"
    },
    "id": 1
}
```

Pour finir le transfert, appelez [`avm.import`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-import).

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method": "avm.import",
    "params": {
        "username":"myUsername",
        "password":"myPassword",
        "sourceChain": "C",
        "to":"X-avax1wkmfja9ve3lt3n9ye4qp3l3gj9k2mz7ep45j7q"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

où `to` est l'adresse encodée en bech32 l'adresse X-Chain à laquelle vous avez envoyé les fonds à l'étape précédente.

La réponse devrait ressembler à ça :

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2kxwWpHvZPhMsJcSTmM7a3Da7sExB8pPyF7t4cr2NSwnYqNHni"
    },
    "id": 1
}
```

## Récapitulatif

C'est fini ! Vous pouvez maintenant permuter AVAX dans les deux sens entre la X-Chain et la C-Chain, à la fois en utilisant le portefeuille Avalanche et en appelant les appels API appropriés sur un nœud Avalanche.

