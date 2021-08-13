# Diffusion d'appels API

Ce guide explique comment faire les appels aux API exposées par les nœuds avalanches.

### Point de fin<a id="endpoint"></a>

Un appel API est effectué à un endpoint, qui est une URL. La base de l'URL est toujours:

`[node-ip]:[http-port]`

où

* `node-ip` est l'adresse IP du noeud auquel l'appel est de.
* `http-port` est le port que le noeud écoute pour les appels HTTP. Ceci est spécifié par [argument de ligne de commande](../references/command-line-interface.md#http-server) `http-port` \(valeur par défaut `9650`\).

Par exemple, l'URL de base pourrait ressembler à ceci: `127.0.0.1:9650`.

La documentation de chaque API spécifie quel paramètre un utilisateur devrait faire des appels afin d'accéder aux méthodes de l'API.

## API JSON RPC formatées

Plusieurs API intégrées utilisent le format [JSON RPC 2.0](https://www.jsonrpc.org/specification) pour décrire leurs demandes et réponses. Ces API incluent l'API de la plate-forme et l'API de chaîne X.

### Faire une demande JSON RPC

Supposons que nous voulons appeler la méthode `getTxStatus` de [l'API de chaîne X](exchange-chain-x-chain-api.md). La documentation de l'API de chaîne X nous indique que le point endpoint de cette API est `/ext/bc/X`.

Cela signifie que le paramètre auquel nous envoyons notre appel API est:

`[node-ip]:[http-port]/ext/bc/X`

La documentation de l'API de chaîne X-Chain indique que la signature de `getTxStatus` est:

[`avm.getTxStatus(txID:bytes)`](exchange-chain-x-chain-api.md#avm-gettxstatus)` -> avm.getTxStatus(txID:bytes)`

où:

* Argument `txID` est l'ID de la transaction que nous obtenons le statut de.
* `Le statut` de la valeur retournée est le statut de la transaction en question.

Pour appeler cette méthode, alors:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :4,
    "method" :"avm.getTxStatus",
    "params" :{
        "txID":"2QouvFWUbjuySRxeX5xMbNCuAaKWfbk5FeEa2JmoF85RKLk2dD"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

* `jsonrpc` spécifie la version du protocole JSON RPC. \(Dans la pratique est toujours 2.0\)
* `la méthode` spécifie le service `\(avm\)` et la méthode `\(avm\)` que nous voulons invoquer.
* `params` spécifie les arguments à la méthode.
* `id` est l'ID de cette demande. Les ID de la demande devraient être uniques.

C'est ça!

### Réponse de la réussite JSON RPC

Si l'appel est réussi, la réponse ressemblera à celle-ci:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "Status":"Success"
    },
    "id": 1
}
```

* `id` est l'ID de la demande à laquelle cette réponse correspond à.
* `resultat` est les valeurs retournées de `getTxStatus`.

### Réponse d'erreur JSON RPC

Si la méthode API invoquée renvoie une erreur, la réponse aura une `erreur` de champ au lieu du `résultat`. En outre, il y a un champ supplémentaire, `des` données, qui contient des informations supplémentaires sur l'erreur qui s'est produite.

Une telle réponse ressemblerait à:

```cpp
{
    "jsonrpc": "2.0",
    "error": {
        "code": -32600,
        "message": "[Some error message here]",
        "data": [Object with additional information about the error]
    },
    "id": 1
}
```

## Autres formats API

Certaines API peuvent utiliser une norme autre que JSON RPC 2.0 pour formater leurs demandes et réponses. Cette extension devrait préciser comment faire les appels et les réponses leur faire passer dans leur documentation.

## Expédition et réception des octets

Sauf indication contraire, lorsque les octets sont envoyés dans un appel / réponse API, ils sont dans la représentation [CB58](https://support.avalabs.org/en/articles/4587395-what-is-cb58), un codage base-58 avec une somme de contrôle

