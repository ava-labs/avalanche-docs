# Transfert AVAX entre la chaîne X-Chain la chaîne C

## Introduction

Les jetons AVAX existent sur la chaîne X, où ils peuvent être négociés, sur la X-Chain, où ils peuvent être fournis comme une mise en jeu lors de la validation du réseau primaire, et sur la chaîne C, où ils peuvent être utilisés dans des contrats intelligents ou pour payer le gaz. Dans ce tutoriel, nous enverrons AVAX entre la chaîne X-Chain la chaîne C-Chain.

## Exigences minimales

Vous avez terminé [Run un nœud avalanche](../nodes-and-staking/run-avalanche-node.md) et vous êtes familier avec [l'architecture d'Avalanche](../../../learn/platform-overview/).

Afin d'envoyer AVAX, vous devez avoir un peu AVAX! Vous pouvez obtenir un vrai AVAX l'achetant sur un échange, ou vous pouvez obtenir testnet AVAX le [robinet de test AVAX](https://faucet.avax-test.network), qui est un moyen gratuit et facile de se faire jouer avec Avalanche.

## Transfert AVAX à l'aide du portefeuille web

La façon la plus facile de transférer AVAX entre les chaînes est d'utiliser [le portefeuille Avalanche](https://wallet.avax.network/) qui est un moyen non privatif et sûr d'accéder et de déplacer AVAX.

Le code source du portefeuille Avalanche peut être trouvé [ici](https://github.com/ava-labs/avalanche-wallet).

### Étape 1 - Ouvrir le portefeuille d'avalanche

![Image pour post](../../../.gitbook/assets/wallet-x2p-01-login.png)

Sélectionnez **Portefeuille Accès** pour entrer votre portefeuille. Pour connecter le portefeuille à un réseau autre que le réseau principal Avalanche, sélectionnez **Mainnet** et choisissez le réseau à connecter.

### Étape 2 - Connectez-vous à votre portefeuille

Vous pouvez accéder à votre portefeuille en utilisant la clé privée, la phrase clé mnémonique, le fichier keystore ou Ledger Nano S. Les transferts de la chaîne C-Chain Ledger ne sont pas encore pris en charge.

![Image pour post](../../../.gitbook/assets/wallet-x2p-02-access.png)

Après une connexion réussie, vous verrez votre solde, votre portefeuille d'actifs et diverses autres informations.

### Étape 3 - Aller à l'onglet Cross chaîne

![Image pour post](../../../.gitbook/assets/wallet-x2p-03-earn.png)

La fonctionnalité pour le transfert de jetons entre les chaînes est sur l'onglet **Chaîne** croisée.

### Étape 4 - Entrez le montant à transférer

Vous serez présenté avec un choix pour Chaîne **source** et **Chaîne de destination**. Sélectionnez X-Chain et C-Chain, respectivement. Vous verrez vos soldes X et C et un champ d'entrée pour entrer le montant à transférer de la source à la chaîne de destination.

![Image pour post](../../../.gitbook/assets/wallet-x2c-01-x-c.png)

Entrez le montant que vous souhaitez transférer de la chaîne Xà la chaîne C.

### Étape 5 - Confirmer la transaction

![Image pour post](../../../.gitbook/assets/wallet-x2c-02-trasnfer.png)

Appuyez sur **Confirmer**, puis **Transfert** pour initier le transfert.

### Étape 6 - Fait!

Un transfert interchaîne est un processus en deux étapes : d'abord une transaction pour exporter les fonds de la chaîne X, et un autre pour l'importer dans la chaîne C. Le portefeuille fera les deux et montrer ses progrès tout en le faisant ainsi.

![Image pour post](../../../.gitbook/assets/wallet-x2c-03-done.png)

C'est ça! Vous avez transféré AVAX à C-Chain ! Maintenant, vous pouvez les utiliser pour déployer des contrats intelligents sur C-Chain.

### Transfert de la chaîne C à la chaîne X

Pour retourner the la chaîne X, vous devez effectuer le transfert dans la direction opposée.

Swap source et chaîne de destination, en les sélectionnant dans le menu déroulant **Source** et **destination.** Le reste du processus est le même: entrez le montant, confirmer et transfert.

## Transfert de la chaîne Xà la chaîne C avec les appels API

Si vous construisez une application sur le réseau Avalanche, vous pouvez vouloir effectuer le transfert programmatiquement dans le cadre de certaines fonctionnalités plus larges. Vous pouvez le faire en appelant les API appropriées sur un nœud AvalancheGo. Le reste du tutoriel suppose que vous avez accès à un nœud AvalancheGo, des jetons node, la chaîne X, et les identifications utilisateur [créées](../../avalanchego-apis/keystore-api.md#keystorecreateuser) et stockées dans la clé du nœud.

Tous les exemples des appels API ci-dessous supposent que le noeud fonctionne localement \(c'est-à-dire à l'écoute sur `127.0.0.1`\). Le noeud peut être connecté au réseau principal, à un réseau d'essai ou à un réseau local. Dans chaque cas, les appels et les réponses API devraient être les mêmes, sauf pour les formats d'adresse. Le noeud n'a pas besoin d'être local; vous pouvez téléphoner à un noeud hébergé ailleurs.

Comme vous l'avez peut-être remarqué lors du transfert AVAX à l'aide du portefeuille Avalanche, un transfert interchaîne est une opération de deux opérations :

* Exportation AVAX de la chaîne X
* Importation AVAX dans la chaîne C

Avant de pouvoir effectuer le transfert, nous devons configurer l'adresse sur la chaîne C, avec la clé de contrôle.

### Configurez l'adresse et la clé sur la chaîne C

La chaîne X-Chain les adresses [Bech32](http://support.avalabs.org/en/articles/4587392-what-is-bech32) et la chaîne C utilise les adresses hex Ethereum Virtual Machine \(EVM\). Il n'y a aucun moyen de convertir l'adresse d'un format à l'autre puisqu'ils sont tous les deux dérivés d'une clé privée à l'aide d'une fonction cryptographique à sens unique.

Afin de vous contourner, vous pouvez exporter une clé privée de la chaîne X, puis l'importer dans la chaîne C. De cette façon, vous pouvez utiliser l'adresse X-Chain et changer le préfixe X- à un préfixe C- afin d'obtenir l'adresse Bech32 correcte à utiliser pour la chaîne C.

Premièrement, exporter une clé privée depuis la chaîne X:

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

Réponse:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "privateKey":"PrivateKey-2w4XiXxPfQK4TypYqnohRL8DRNTz9cGiGmwQ1zmgEqD9c9KWLq"
    }
}
```

Maintenant, importer la même clé privée dans la chaîne C:

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

La réponse contient une adresse EVM encodée :

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "0x5Bf544EF123FE41B262295dBA41c5a9CFA8efDB4"
    },
    "id": 1
}
```

Maintenant, nous avons tout ce dont nous avons besoin pour transférer les jetons.

### Transfert de la chaîne X à la chaîne C

Utilisez l'adresse correspondant à la clé privée que vous avez exportée et basculez à l'utilisation du préfixe C- dans l'appel [`avm.exportAVAX`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-exportavax):

```cpp
curl -X POST --data '{  
    "jsonrpc":"2.0",    
    "id"     :1,    
    "method" :"avm.exportAVAX",
    "params" :{
        "to":"C-avax1jggdngzc9l87rgurmfu0z0n0v4mxlqta0h3k6e",   
        "destinationChain": "C",    
        "amount": 5000000,  
        "username":"myUsername",    
        "password":"myPassword"
    }   
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Puisque votre utilisateur de frappe possède la clé privée correspondante sur la chaîne C, vous pouvez maintenant importer the l'adresse de votre choix. Il n'est pas nécessaire de l'importer à la même adresse qu'il a été exporté; vous pouvez importer It’s à une adresse que vous possédez dans MetaMask ou un autre service tiers.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,    
    "method" :"avax.importAVAX",    
    "params" :{
        "to":"0x4b879aff6b3d24352Ac1985c1F45BA4c3493A398",  
        "sourceChain":"X",  
        "username":"myUsername",    
        "password":"myPassword"
    }   
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

où est une `adresse` EVM encodée de votre choix.

La réponse ressemble à ceci:

```cpp
{   
    "jsonrpc": "2.0",   
    "result": {
        "txID": "LWTRsiKnEUJC58y8ezAk6hhzmSMUCtemLvm3LZFw8fxDQpns3"
    },  
    "id": 1
}
```

Note: il n'y a pas de frais de transaction pour les transactions d'importation vers la chaîne C.

Une fois votre AVAX transféré dans la chaîne C, vous pouvez l'utiliser pour déployer et interagir avec des contrats intelligents.

## Transfert de la chaîne C à la chaîne X.

Maintenant, vous pouvez déplacer AVAX la chaîne C vers la chaîne X. Premièrement, nous devons exporter :

```cpp
curl -X POST --data '{  
    "jsonrpc":"2.0",    
    "id"     :1,    
    "method" :"avax.exportAVAX",
    "params" :{
        "to":"X-avax1wkmfja9ve3lt3n9ye4qp3l3gj9k2mz7ep45j7q",   
        "amount": 5000000,  
        "username":"myUsername",    
        "password":"myPassword"
    }   
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

où est l'adresse `bech32` encodée d'une adresse X-Chain que vous détenez. Assurez-vous que le montant que vous exportez dépasse les frais de transaction parce que les transactions d'exportation et d'importation facturent des frais de transaction.

La réponse devrait ressembler à ceci:

```cpp
{   
    "jsonrpc": "2.0",   
    "result": {
        "txID": "2ZDt3BNwzA8vm4CMP42pWD242VZy7TSWYUXEuBifkDh4BxbCvj"    
    },  
    "id": 1
}
```

Pour terminer le transfert, appelez [`avm.importAVAX`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-importavax).

```cpp
curl -X POST --data '{  
    "jsonrpc":"2.0",    
    "id"     :1,    
    "method": "avm.importAVAX",
    "params": {
        "username":"myUsername",    
        "password":"myPassword",    
        "sourceChain": "C",
        "to":"X-avax1wkmfja9ve3lt3n9ye4qp3l3gj9k2mz7ep45j7q"    
    }   
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

où est l'adresse bech32 encodée l'adresse X-Chain à laquelle vous avez envoyé les `fonds` dans l'étape précédente.

La réponse devrait ressembler à ceci:

```cpp
{   
    "jsonrpc": "2.0",   
    "result": {
        "txID": "2kxwWpHvZPhMsJcSTmM7a3Da7sExB8pPyF7t4cr2NSwnYqNHni"    
    },  
    "id": 1
}
```

## Emballage

C'est ça! Maintenant, vous pouvez échanger AVAX l'arrière entre la chaîne X-Chain la chaîne X-Chain à la fois en utilisant le portefeuille Avalanche, et en appelant les appels API appropriés sur un nœud Avalanche.

