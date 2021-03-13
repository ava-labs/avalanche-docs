---
description: 'Tranfert du token AVAX entre les chaînes X-Chain, P-Chain et X-Chain'
---

# Tranfert d'AVAX entre X-Chain, P-Chain et C-Chain

### Introduction <a id="introduction"></a>

Les jetons AVAX existent à la fois sur la X-Chain, où ils peuvent être échangés, et sur la P-Chain, où ils peuvent être fournis comme enjeu lors de la validation du réseau principal. Avalanche prend en charge les échanges atomiques d'AVAX entre la chaîne X et la chaîne P. \(À l'avenir, Avalanche prendra en charge des échanges atomiques plus génériques entre les chaînes.\) Dans ce didacticiel, nous enverrons des jetons AVAX entre la X-Chain, la P-Chain et la X-Chain.

### Hypothèses <a id="requirements"></a>

Nous supposons que le lecteur a déjà terminé le guide de d'[installation sur OVH]() et est familiarisé avec l'[architecture du réseau d'Avalanche](../../apprendre/presentation-du-systeme/).

### Exporter AVAX sur la X-Chain vers la P-Chain <a id="export-avax-from-the-x-chain-to-the-p-chain"></a>

Bien sûr, pour envoyer AVAX, vous devez avoir du AVAX ! Utilisez le [faucet du public Tesnet](https://faucet.avax.network/) pour envoyer un peu d'AVAX à une adresse X-Chain que vous détenez, comme dans le guide de démarrage rapide.

Pour envoyer l’AVAX, appelez la méthode [`avm.exportAVAX`](../../apis/avm-api-x-chain.md#avm-exportavax) de X-Chain.

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

Notez que vous paierez des frais de transaction pour les opérations d'exportation et d'importation. Dans cet exemple, supposons que les frais de transaction sont de `1 000 000` nAVAX. Ensuite, l'exportation ci-dessus consomme en fait `6 000 000` nAVAX; `5 000 000` vont à la chaîne P et `1 000 000` sont dépensés en frais de transaction.

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

Le montant déduit est le montant exporté \(`5 000 000` dans cet exemple\) plus les frais de transaction. Si votre utilisateur contrôle plusieurs adresses X-Chain, l'AVAX peut avoir été envoyé à partir de n'importe quelle combinaison d'entre elles.

### Importer AVAX sur la P-Chain depuis la X-Chain <a id="import-avax-to-the-p-chain-from-the-x-chain"></a>

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

Notez que le solde que nous voyons est le montant exporté de la X-Chain \(`5.000.000`\) moins les frais de transaction \(`1.000.000` dans cet exemple.\) Maintenant, nous pouvons utiliser l'AVAX détenu par cette adresse P-Chain pour fournir une mise afin de valider le réseau primaire.

### Exporter AVAX sur la P-Chain vers la X-Chain <a id="export-avax-from-the-p-chain-to-the-x-chain"></a>

Maintenant, déplaçons AVAX sur la P-Chain vers la X-Chain.

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

Cela renvoie l'ID de transaction et nous pouvons vérifier que la transaction a été validée avec un autre appel à `platform.getTxStatus`. Encore une fois, assurez-vous que le montant que vous envoyez dépasse les frais de transaction.

### Importer AVAX à la X-Chain depuis la P-Chain <a id="import-avax-to-the-x-chain-from-the-p-chain"></a>

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

Notez que `to` est la même adresse spécifiée dans notre appel à `platform.exportAVAX`.

Comme auparavant, nous pouvons appeler `avm.getBalance` pour vérifier que les fonds ont été reçus. Le solde aurait dû augmenter de `3 000 000`, moins les frais de transaction.

### Exporter AVAX de la X-Chain vers la C-Chain <a id="export-avax-from-the-x-chain-to-the-c-chain"></a>

En plus d'envoyer AVAX entre la X-Chain et la P-Chain, vous pouvez également envoyer AVAX entre la X-Chain et la C-Chain et inversement. La chaîne X utilise des adresses [`Bech32`](http://support.avalabs.org/en/articles/4587392-what-is-bech32) et la chaîne C utilise des adresses EVM hexadécimales. Il n'y a aucun moyen de convertir l'adresse d'un format à l'autre car ils sont tous deux dérivés d'une clé privée à l'aide d'une fonction cryptographique à sens unique.

Afin de contourner ce problème, vous pouvez exporter une clé privée de la X-Chain, puis l'importer dans la C-Chain. De cette façon, vous pouvez utiliser l'adresse X-Chain et changer le préfixe X en un préfixe C afin d'obtenir la bonne adresse Bech32 à utiliser pour la chaîne C.

Tout d'abord, exportez une clé privée depuis la X-Chain :

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

Importez maintenant la même clé privée dans la C-Chain :

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

La réponse contient une adresse EVM codée en hexadécimal :

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "0x5Bf544EF123FE41B262295dBA41c5a9CFA8efDB4"
    },
    "id": 1
}
```

Vous pouvez maintenant utiliser l'adresse correspondant à la clé privée que vous avez exportée et passer à l'utilisation du préfixe C- dans le call [`avm.exportAVAX`](../../apis/avm-api-x-chain.md#avm-exportavax) :

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

Étant donné que l'utilisateur de votre keystore possède la clé privée correspondante sur la C-Chain, vous pouvez maintenant importer l'AVAX à l'adresse de votre choix. Il n’est pas nécessaire de l’importer à la même adresse que celle vers laquelle il a été exporté, vous pouvez donc l’importer directement vers une adresse que vous possédez dans MetaMask ou un autre service tiers.

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

Où `to` est une adresse EVM encodée en hexadécimal de votre choix.

La réponse devrait ressembler à ça :

```cpp
{   
    "jsonrpc": "2.0",   
    "result": { 
        "txID": "LWTRsiKnEUJC58y8ezAk6hhzmSMUCtemLvm3LZFw8fxDQpns3" 
    },  
    "id": 1 
}
```

Remarque: il n'y a pas de frais de transaction pour les transactions d'importation vers la C-Chain.

Une fois que votre AVAX a été transféré vers la C-Chain, vous pouvez immédiatement commencer à exécuter des contrats intelligents. 

{% page-ref page="../contrats-intelligents/deployer-un-contrat-intelligent.md" %}

### Exporter AVAX de la C-Chain à la X-Chain <a id="export-avax-from-the-c-chain-to-the-x-chain"></a>

Vous pouvez maintenant déplacer AVAX de la C-Chain vers la X-Chain

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

Où `to` est l'adresse encodée en bech32 d'une adresse X-Chain que vous détenez. Assurez-vous que le montant que vous exportez dépasse les frais de transaction car les transactions d'exportation et d'importation factureront des frais de transaction.

La réponse devrait ressembler à ça :

```cpp
{   
    "jsonrpc": "2.0",   
    "result": { 
        "txID": "2ZDt3BNwzA8vm4CMP42pWD242VZy7TSWYUXEuBifkDh4BxbCvj"    
    },  
    "id": 1 
}   
```

### Importer AVAX de la X-Chain à la C-Chain <a id="import-avax-to-the-x-chain-from-the-c-chain"></a>

Enfin, nous pouvons terminer en important AVAX de la C-Chain vers la X-Chain, appelez [`avm.importAVAX`](../../apis/avm-api-x-chain.md#avm-importavax).

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

Où `to` est l'adresse encodée en bech32 l'adresse X-Chain à laquelle vous avez envoyé les fonds à l'étape précédente.

La réponse devrait ressembler à ceci :

```cpp
{   
    "jsonrpc": "2.0",   
    "result": { 
        "txID": "2kxwWpHvZPhMsJcSTmM7a3Da7sExB8pPyF7t4cr2NSwnYqNHni"    
    },  
    "id": 1 
}   
```

### Récapitulatif <a id="wrapping-up"></a>

Vous pouvez maintenant permuter AVAX dans les deux sens entre la X-Chain, C-Chain et la P-Chain. À l'avenir, Avalanche prendra en charge des échanges atomiques plus généralisés entre les chaînes.

