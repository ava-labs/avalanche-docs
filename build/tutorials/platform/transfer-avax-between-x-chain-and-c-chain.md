# Transfert AVAX entre la chaîne X et la chaîne C-

## Introduction

Les jetons AVAX existent sur la X-Chain, où ils peuvent être tradés, sur la P-Chain, où ils peuvent être fournis comme un enjeu lors de la validation du réseau principal, et sur la C-Chain, où ils peuvent être utilisés dans des contrats intelligents ou pour payer le gaz. Dans ce tutoriel, nous enverrons des jetons AVAX entre la X-Chain et C-Chain.

## Exigences

Vous avez terminé [Exécuter un nœud Avalanche](../nodes-and-staking/run-avalanche-node.md) et êtes familier avec [l'architecture d'Avalanche](../../../learn/platform-overview/).

Pour envoyer AVAX, vous devez avoir un peu AVAX ! Vous pouvez obtenir un véritable AVAX en l'achetant sur un échange, ou vous pouvez obtenir un test d'AVAX sur le [faucet de test](https://faucet.avax-test.network) AVAX, qui est un moyen gratuit et facile de se connecter à Avalanche.

## Transfert d'AVAX à l'aide du portefeuille web

La manière la plus facile de transférer AVAX entre les chaînes est d'utiliser [le portefeuille](https://wallet.avax.network/) d'Avalanche qui est un moyen non gardien et sécurisé d'accéder et de déplacer AVAX.

Le code source d'Avalanche Wallet se trouve [ici](https://github.com/ava-labs/avalanche-wallet).

### Étape 1 - Ouvrir le portefeuille d'Avalanche

![Image pour post](../../../.gitbook/assets/wallet-x2p-01-login.png)

Sélectionnez le portefeuille **d'accès **pour entrer dans votre portefeuille. Pour connecter le portefeuille à un réseau autre que le réseau principal d'Avalanche, sélectionnez **Mainnet **et choisissez le réseau à connecter.

### Étape 2 - Connectez-vous à votre portefeuille

Vous pouvez accéder à votre portefeuille en utilisant la clé privée, la phrase de clé mnemonique, le fichier de frappe ou le ledger Nano S. Les transferts de C-Chain via Ledger ne sont pas encore pris en charge.

![Image pour post](../../../.gitbook/assets/wallet-x2p-02-access.png)

Après un login réussi, vous verrez votre solde, votre portefeuille d'actifs et diverses autres informations.

### Étape 3 - Allez à l'onglet Cross Chain

![Image pour post](../../../.gitbook/assets/wallet-x2p-03-earn.png)

La fonctionnalité pour transférer les jetons entre les chaînes est sur l'onglet **Cross **Chain.

### Étape 4 - Inscrivez un montant à transférer

Vous serez présenté avec un choix pour la chaîne **source et la chaîne **de ****destination. Sélectionnez X-Chain et C-Chain, respectivement. Vous verrez vos soldes X et C, et un champ d'entrée pour entrer le montant à transférer de la source à la chaîne de destination.

![Image pour post](../../../.gitbook/assets/wallet-x2c-01-x-c.png)

Entrez le montant que vous souhaitez transférer de la X-Chain vers la C-Chain.

### Étape 5 - Confirmer la transaction

![Image pour post](../../../.gitbook/assets/wallet-x2c-02-trasnfer.png)

Appuyez sur la ****confirmation, puis **transférez **pour initier le transfert.

### Étape 6 - Fait !

Un transfert interchaîne est un processus en deux étapes : d'abord une transaction pour exporter les fonds de la X-Chain, et un autre pour l'importer sur la C-Chain. Le portefeuille fera la fois et montrera ses progrès tout en le faisant ainsi.

![Image pour post](../../../.gitbook/assets/wallet-x2c-03-done.png)

C'est tout ! Vous avez transféré AVAX de la X-Chain à C-Chain ! Maintenant, vous pouvez les utiliser pour déployer des contrats intelligents sur C-Chain.

### Transfert de la C-Chain à la X-chain

Pour retourner the à la X-Chain, vous devez effectuer le transfert dans la direction opposée.

Échangez la chaîne de source et de destination, en les sélectionnant dans le menu **déroulant **Source **et **destination. Le reste du processus est le même : entrez le montant, confirment et transférer.

## Transfert de la chaîne X à la chaîne C-Chain avec des appels API

Si vous construisez une application sur le réseau Avalanche, vous pouvez faire le transfert programmatically dans le cadre de certaines fonctionnalités plus larges. Vous pouvez le faire en appelant les API appropriées sur un nœud AvalancheGo. Le reste du tutoriel suppose que vous avez accès à un nœud AvalancheGo, aux jetons AVAX sur la X-Chain, et les identifiants d'utilisateur [créés](../../avalanchego-apis/keystore-api.md#keystorecreateuser) et stockés dans la frappe du nœud.

Tous les exemples d'appels API ci-dessous supposent que le nœud s'exécute localement \(c'est-à-dire l'écoute sur `127.0.0.1`\). Le nœud peut être connecté au réseau principal, à un réseau de test ou à un réseau local. Dans chaque cas, les appels et les réponses de l'API devraient être les mêmes, sauf pour les formats d'adresses. Le nœud n'a pas besoin d'être local; vous pouvez passer des appels à un nœud hébergé ailleurs.

Comme vous pouvez le constater, lors du transfert d'AVAX en utilisant le portefeuille d'Avalanche, un transfert inter-chaînes est une opération de deux transactions :

* Exporter AVAX de la X-Chain
* Importer AVAX sur la C-Chain

Avant de pouvoir faire le transfert, nous devons configurer l'adresse sur la C-Chain, ainsi que la clé de contrôle.

### Définir l'adresse et la clé sur la C-Chain

La X-Chain utilise les adresses [Bech32](http://support.avalabs.org/en/articles/4587392-what-is-bech32) et la C-Chain utilise les adresses de la machine virtuelle Ethereum \(EVM\). Il n'y a pas moyen de convertir l'adresse d'un format à l'autre car ils sont tous les deux dérivés d'une clé privée en utilisant une fonction de cryptographique à sens unique.

Afin de vous déplacer sur cette question, vous pouvez exporter une clé privée de la X-Chain et l'importer ensuite sur la C-Chain. De cette façon, vous pouvez utiliser l'adresse X-Chain et changer le préfixe X- en un préfixe C- afin d'obtenir l'adresse Bech32 correcte à utiliser pour la C-Chain.

Premièrement, exporter une clé privée depuis la X-Chain:

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

Réponse :

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "privateKey":"PrivateKey-2w4XiXxPfQK4TypYqnohRL8DRNTz9cGiGmwQ1zmgEqD9c9KWLq"
    }
}
```

Maintenant, importez la même clé privée sur la C-Chain:

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

La réponse contient une adresse EVM hex-encoded :

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "0x5Bf544EF123FE41B262295dBA41c5a9CFA8efDB4"
    },
    "id": 1
}
```

Maintenant nous avons tout ce dont nous avons besoin pour transférer les jetons.

### Transfert de la X-Chain à la C-Chain

Utilisez l'adresse correspondant à la clé privée que vous avez exportée et que vous utilisez le préfixe C- dans [`avm.exportAVAX`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-exportavax)l'appel:

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

Puisque votre utilisateur de frappes est propriétaire de la clé privée correspondante sur la C-Chain, vous pouvez maintenant importer the à l'adresse de votre choix. Il n'est pas nécessaire de l'importer sur la même adresse qu'elle a été exportée; vous pouvez importer It’s sur une adresse que vous possédez dans MetaMask ou un autre service tiers.

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

où `to`est une adresse EVM hex-encoded de votre choix.

La réponse ressemble à ceci :

```cpp
{   
    "jsonrpc": "2.0",   
    "result": {
        "txID": "LWTRsiKnEUJC58y8ezAk6hhzmSMUCtemLvm3LZFw8fxDQpns3"
    },  
    "id": 1
}
```

Remarque : il n'y a pas de frais de transaction pour les transactions d'importation sur la chaîne C.

Une fois que votre AVAX a été transféré au C-Chain, vous pouvez l'utiliser pour déployer et interagir avec des contrats intelligents.

## Transfert de la C-Chain à la X-Chain

Maintenant, vous pouvez déplacer AVAX de la C-Chain vers la X-Chain. D'abord, nous devons exporter :

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

où `to`est l'adresse bech32 encodée d'une adresse X-Chain que vous détenez. Assurez-vous que le montant que vous exportez dépasse les frais de transaction parce que les transactions d'exportation et d'importation facturent des frais de transaction.

La réponse devrait ressembler à ce qui suit :

```cpp
{   
    "jsonrpc": "2.0",   
    "result": {
        "txID": "2ZDt3BNwzA8vm4CMP42pWD242VZy7TSWYUXEuBifkDh4BxbCvj"    
    },  
    "id": 1
}
```

Pour finir le transfert, appelez [`avm.importAVAX`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-importavax).

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

où `to`est l'adresse codée de bech32 l'adresse X-Chain à laquelle vous avez envoyé les fonds dans l'étape précédente.

La réponse devrait ressembler à ce qui suit :

```cpp
{   
    "jsonrpc": "2.0",   
    "result": {
        "txID": "2kxwWpHvZPhMsJcSTmM7a3Da7sExB8pPyF7t4cr2NSwnYqNHni"    
    },  
    "id": 1
}
```

## Empiler

C'est tout ! Maintenant, vous pouvez échanger des AVAX en allers et en dehors de la chaîne X et de la C-Chain, en utilisant le portefeuille d'Avalanche, et en appelant les appels API appropriés sur un nœud d'Avalanche.

