---
description: Cette API gère la création et la révocation des jetons d'autorisation
---

# API Auth

Lorsque vous exécutez un nœud, vous pouvez exiger que les appels d'API soient associés à un jeton d'autorisation. Cette API gère la création et la révocation des jetons d'autorisation.

Un jeton d'autorisation permet d'accéder à un ou plusieurs endpoints d'API. Ceci est utile pour déléguer l'accès aux API d'un nœud. Les jetons expirent après 12 heures.

Un jeton d'autorisation est fourni dans l'en-tête d'un appel d'API. Plus précisément, l'en-tête `Authorization` doit avoir la valeur `Bearer TOKEN.GOES.HERE` \(où `TOKEN.GOES.HERE` est remplacé par le jeton, bien sûr.\)

Cette API n'est accessible que si le nœud est démarré avec l'argument de ligne de commande `--api-auth-required`. Si le nœud est démarré sans cette CLI, les appels d'API ne nécessitent pas de jetons d'autorisation, donc cette API n'est pas accessible. Cette API ne nécessite jamais de jeton d'autorisation pour être atteinte.

Bien entendu, la création de jetons d'autorisation doit être autorisée. Si vous exécutez votre nœud avec `--api-auth-required`, vous devez également spécifier un mot de passe de jeton d'autorisation avec l'argument `--api-auth-password`. Vous devez fournir ce mot de passe pour créer / révoquer des jetons d'autorisation.

Notez que si vous exécutez votre nœud avec `--api-auth-required`, certains outils comme Metamask peuvent ne pas être en mesure de passer des appels API vers votre nœud car ils ne disposent pas de jeton d'authentification.

## Format

Cette API utilise le format RPC `json 2.0`. Pour plus d'informations sur les appels JSON RPC, cliquez [ici](emettre-des-appels-dapi.md).

## Endpoint

```cpp
/ext/auth
```

### Methods <a id="methods"></a>

### auth.newToken

Crée un nouveau jeton d'autorisation qui accorde l'accès à un ou plusieurs endpoints d'API.

**Signature**

```cpp
auth.newToken(
    {
        password: string,
        endpoints: []string
    }
) -> {token: string}
```

* `password` est le mot de passe du jeton d'autorisation de ce nœud.
* `endpoints` est une liste de points de terminaison qui seront accessibles à l'aide du jeton généré. Si `endpoints` contiennent un élément `"*"`, le jeton généré peut accéder à tout point de terminaison d'API.
* `token` est le jeton d'autorisation.

**Exemple d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "auth.newToken",
    "params":{
        "password":"YOUR PASSWORD GOES HERE",
        "endpoints":["/ext/bc/X", "/ext/info"]
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/auth
```

Cet appel générera un jeton d'autorisation qui permet d'accéder aux endpoints API`/ext/bc/X` \(c'est-à-dire la X-Chain\) et `/ext/info` \(c'est-à-dire l'[API info](info-api.md).\)

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbmRwb2ludHMiOlsiKiJdLCJleHAiOjE1OTM0NzU4OTR9.Cqo7TraN_CFN13q3ae4GRJCMgd8ZOlQwBzyC29M6Aps"
    },
    "id": 1
}
```

Ce jeton d'autorisation doit être inclus dans les appels d'API en donnant la valeur`Authorization` dans l'en-tête`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbmRwb2ludHMiOlsiKiJdLCJleHAiOjE1OTM0NzU4OTR9.Cqo7TraN_CFN13q3ae4GRJCMgd8ZOlQwBzyC29M6Aps`.

Par exemple, pour appeler `info.peers` avec ce jeton :

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.peers"
}' 127.0.0.1:9650/ext/info \
-H 'content-type:application/json;' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbmRwb2ludHMiOlsiKiJdLCJleHAiOjE1OTM0NzU4OTR9.Cqo7TraN_CFN13q3ae4GRJCMgd8ZOlQwBzyC29M6Aps'
```

### auth.revokeToken

Révoquez un jeton précédemment généré. Le jeton donné n'accordera plus l'accès à endpoints. Si le jeton n'est pas valide, il ne fait rien.

**Signature**

```cpp
auth.revokeToken(
    {
        password: string,
        token: string
    }
) -> {success: bool}
```

* `password` est le mot de passe du jeton d'autorisation de ce nœud.
* `token` est le jeton d'autorisation révoqué.

**Exemple d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "auth.revokeToken",
    "params":{
        "password":"123",
        "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTMxNzIzMjh9.qZVNhH6AMQ_LpbXnPbTFEL6Vm5EM5FLU-VEKpYBH3k4"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/auth
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "success": true
    },
    "id": 1
}
```

### auth.changePassword

Modifiez le mot de passe du jeton d'autorisation de ce nœud. Tout jeton d'autorisation créé sous un ancien mot de passe deviendra invalide.

**Signature**

```cpp
auth.changePassword(
    {
        oldPassword: string,
        newPassword: string
    }
) -> {success: bool}
```

* `oldPassword` est le mot de passe actuel du jeton d'autorisation de ce nœud.
* `newPassword`est le nouveau mot de passe du jeton d'autorisation du nœud après cet appel d'API. Doit contenir entre 1 et 1024 caractères.

**Exemple d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "auth.changePassword",
    "params":{
        "oldPassword":"OLD PASSWORD HERE",
        "newPassword":"NEW PASSWORD HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/auth
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "success": true
    },
    "id": 1
}
```

