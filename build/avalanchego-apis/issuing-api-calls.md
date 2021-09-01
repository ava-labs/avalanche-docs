# Émission d'appels API

Ce guide explique comment faire appel aux API exposées par les nœuds d'Avalanche.

### Endpoint<a id="endpoint"></a>

Un appel API est fait à un endpoint, qui est une URL. La base de l'URL est toujours:

`[node-ip]:[http-port]`

où

* `node-ip`est l'adresse IP du nœud que l'appel est à .
* `http-port`le port que le nœud s'écoute pour les appels HTTP. Ceci est spécifié par [l'argument de la ligne de commande](../references/command-line-interface.md#http-server) \(valeur par `http-port`défaut `9650`\).

Par exemple, l'URL de base peut ressembler à ceci : `127.0.0.1:9650`.

La documentation de chaque API spécifie le point de fin auquel un utilisateur doit faire des appels afin d'accéder aux méthodes de l'API.

## API formatées JSON

Plusieurs API intégrées utilisent le format [JSON RPC 2.0](https://www.jsonrpc.org/specification) pour décrire leurs demandes et leurs réponses. Ces API incluent l'API de la plateforme et l'API de X-Chain.

### Faire une demande de RPC JSON

Supposons que nous voulions appeler la `getTxStatus`méthode de [l'API X-Chain.](exchange-chain-x-chain-api.md) La documentation de l'API X-Chain nous indique que le point X-Chain de cette API est `/ext/bc/X`.

Cela signifie que le point that que nous envoyons notre appel API est :

`[node-ip]:[http-port]/ext/bc/X`

La documentation de l'API X-Chain nous indique que la signature de `getTxStatus`:

[`avm.getTxStatus`](exchange-chain-x-chain-api.md#avm-gettxstatus)`(txID:bytes) -> (status:string)`

où :

* L'argument `txID`est l'ID de la transaction que nous obtenons le statut de .
* La valeur retournée `status`est l'état de la transaction en question.

Pour appeler cette méthode, alors :

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

* `jsonrpc`spécifie la version du protocole JSON \(En pratique est toujours 2.0\)
* `method`spécifie le service \(\) `avm`et la méthode \(\) `getTxStatus`que nous voulons invoquer.
* `params`spécifie les arguments pour la méthode.
* `id`est l'ID de cette demande. Les ID de la demande doivent être uniques.

C'est tout !

### Réponse de succès de JSON

Si l'appel est couronné, la réponse ressemblera à ce qui suit :

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "Status":"Success"
    },
    "id": 1
}
```

* `id`est l'ID de la demande à laquelle la réponse correspond .
* `result`est les valeurs renvoyées de .`getTxStatus`

### Réponse d'erreur JSON

Si la méthode API invoquée renvoie une erreur, la réponse aura un champ `error`à la place de .`result` `data`En outre, il y a un champ supplémentaire, qui contient des informations supplémentaires sur l'erreur qui s'est produite.

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

## Autres formats API

Certaines API peuvent utiliser une norme autre que JSON RPC 2.0 pour formater leurs demandes et leurs réponses. Cette extension devrait spécifier comment faire des appels et leur faire passer les réponses dans leur documentation.

## Envoyer et recevoir des octes

Sauf indication contraire, lorsque des octets sont envoyés dans un appel/une réponse de l'API ils sont en représentation [CB58](https://support.avalabs.org/en/articles/4587395-what-is-cb58), un encodage de base-58 avec une somme de contrôle.

