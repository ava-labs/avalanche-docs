---
description: >-
  Ce guide explique comment passer des appels aux API exposées par les nœuds
  Avalanche.
---

# Émettre des appels d'API

## Endpoint

Un appel d'API est effectué vers un endpoint, qui est une URL. La base de l'URL est toujours :

`[node-ip]:[http-port]`

où

* `node-ip` est l'adresse IP du nœud auquel l'appel est destiné. 
* `http-port` est le port sur lequel le nœud écoute les appels HTTP. Ceci est spécifié par l'argument de ligne de commande `http-port` \(valeur par défaut `9650`\). 

Par exemple, l'URL de base pourrait ressembler à ceci: `127.0.0.1:9650`.

La documentation de chaque API spécifie à quel endpoint un utilisateur doit effectuer des appels pour accéder aux méthodes de l'API.

## JSON RPC Formatted APIs

Plusieurs API intégrées utilisent le format [JSON RPC 2.0](https://www.jsonrpc.org/specification) pour décrire leurs demandes et leurs réponses. Ces API incluent l'API Platform et l'API X-Chain.

### Faire une requête JSON RPC 

Supposons que nous voulions appeler la méthode `getTxStatus` de l'[API X-Chain](avm-api-x-chain.md). La documentation de l'API X-Chain nous indique que le point de terminaison de cette API est `/ext /bc /X`.

Cela signifie que le endpoint auquel nous envoyons notre appel API est :

`[node-ip]:[http-port]/ext/bc/X`

La documentation de l'API X-Chain nous indique que la signature de `getTxStatus` est :

`avm.getTxStatus(txID:bytes) -> (status:string)`

où :

* l'argument `txID` st l'ID de la transaction dont nous obtenons le statut.
* La valeur retournée `status` est le statut de la transaction en question.

Pour appeler cette méthode :

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

* `jsonrpc` spécifie la version du protocole JSON RPC. \(En pratique, c'est toujours 2.0\)
* `method` spécifie le service \(`avm`\) et la méthode \(`getTxStatus`\) que nous voulons appeler.
* `params` spécifie les arguments de la méthode.
* `id` est l'ID de cette demande. Les ID de demande doivent être uniques.

C'est tout !

### Réponse d'une requête JSON RPC \(success\)

Si l'appel réussit, la réponse ressemblera à ceci :

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "Status":"Success"
    },
    "id": 1
}
```

* `id` est l'ID de la demande à laquelle cette réponse correspond.
* `result` est les valeurs renvoyées de `getTxStatus`.

### Réponse d'une requête JSON RPC \(error\)

Si la méthode API appelée renvoie une erreur, la réponse aura un champ `error` à la place de`result`. En outre, il existe un champ supplémentaire, `data`, qui contient des informations supplémentaires sur l'erreur qui s'est produite.

Une telle réponse ressemblerait à :

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

### Autres formats d'API  <a id="other-api-formats"></a>

Certaines API, telles que l'API Admin, peuvent utiliser une norme autre que JSON RPC 2.0 pour formater leurs demandes et réponses. Une telle extension doit spécifier comment passer des appels et analyser les réponses dans leur documentation.

### Envoi et réception d'octets <a id="sending-and-receiving-bytes"></a>

Sauf indication contraire, lorsque les octets sont envoyés dans un appel / réponse API, ils sont en représentation CB58, un encodage en base 58 avec une somme de contrôle.

