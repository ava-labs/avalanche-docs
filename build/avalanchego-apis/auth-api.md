# API Auth

Lorsque vous exécutez un nœud, vous pouvez exiger que les appels API aient un jeton d'autorisation joint. Cette API gère la création et la révocation des jetons d'autorisation.

Un jeton d'autorisation fournit l'accès à un ou plusieurs paramètres API d'application. Ceci est utile pour déléguer l'accès aux API d'un nœud. Les jetons expirent après 12 heures.

Un jeton d'autorisation est fourni dans l'en-tête d'un appel API . Spécifiquement, `l'autorisation` de l'en-tête devrait avoir la valeur `Bearer TOKEN.GOES.HERE``` TOKEN.GOES.HERE est remplacé par le jeton\).

Cette API n'est accessible que si le noeud est démarré avec [l'argument de ligne de command](../references/command-line-interface.md)`` Si le noeud est démarré sans ce CLI, les appels API n'ont pas besoin de jetons d'autorisation, de sorte que cette API n'est pas accessible. Cette API n'exige jamais un jeton d'autorisation pour être atteint.

La création de jetons d'autorisation doit être autorisée. Si vous exécutez votre noeud avec `--api-auth-required`, vous devez également spécifier un mot de passe jetant d'autorisation avec l'argument `--api-auth-password`. Vous devez fournir ce mot de passe afin de créer/révoquer les jetons d'autorisation.

Notez que si vous exécutez votre noeud avec `--api-auth-required` alors certains outils comme MetaMask peuvent ne pas être en mesure de faire des appels API sur votre noeud parce qu'ils n'ont pas un jeton auth.

## Format

Cette API utilise le format RPC `json 2.0`. Pour plus d'informations sur les appels JSON RPC, voir [ici.](issuing-api-calls.md)

## Point de fin

```text
/ext/auth
```

## Méthodes

### auth.newToken

Crée un nouveau jeton d'autorisation qui accorde l'accès à un ou plusieurs paramètres API .

#### **Signature**

```cpp
auth.newToken(
    {
        password: string,
        endpoints: []string
    }
) -> {token: string}
```

* `mot de passe` est le mot de passe de ce noeud d'autorisation token
* `les paramètres` est une liste des paramètres qui seront accessibles à l'aide du jeton généré. Si `les paramètres` contiennent un élément `"*"`, le jeton généré peut accéder à n'importe quel paramètre API.
* `jeton` est le jeton d'autorisation.

#### **Exemple d'appel**

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

Cet appel générera un jeton d'autorisation qui permet l'accès aux paramètres API `/ext/bc/X` [\(c'est-à-dire](info-api.md) la chaîne X) et `/ext/info` \(c'est-à-dire l'API d'information. \)

#### **Exemple de réponse**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbmRwb2ludHMiOlsiKiJdLCJleHAiOjE1OTM0NzU4OTR9.Cqo7TraN_CFN13q3ae4GRJCMgd8ZOlQwBzyC29M6Aps"
    },
    "id": 1
}
```

Cette autorisation devrait être incluse dans les appels API en donnant la valeur `d'autorisation` `de l'en-tête Porteur eyJhbGciOiUIUIUzi1NiIsInR5cCI6IkpXVCJ9.eyJFbmRwb2ludHMiOlsiKiJdLSCJleHAIOJE1OTM0NzU4OTR9. Cqo7TraN_CFN13q3ae4GRJCMgd8ZOlQwBzyC29M6Aps`.

Par exemple, pour appeler [`info.peers`](info-api.md#info-peers) avec ce jeton:

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

Révoquer un jeton généré précédemment. Le jeton donné n'accordera plus l'accès à aucun point access Si le jeton est invalide, ne fait rien.

#### **Signature**

```cpp
auth.revokeToken(
    {
        password: string,
        token: string
    }
) -> {success: bool}
```

* `mot de passe` est le mot de passe de ce noeud d'autorisation token
* `jeton` est le jeton d'autorisation révoqué.

#### **Exemple d'appel**

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

#### **Exemple de réponse**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "success": true
    },
    "id": 1
}
```

### auth.changePassword de passe

Changez le mot de passe jeton d'autorisation de ce noeud. Toute autorisation jetons créés sous un ancien mot de passe deviendra invalide.

#### **Signature**

```cpp
auth.changePassword(
    {
        oldPassword: string,
        newPassword: string
    }
) -> {success: bool}
```

* `oldPassword` est le mot de passe actuel de ce noeud d'autorisation jeton.
* `newPassword` est le nouveau mot de passe jeton d'autorisation du noeud après cet appel API . Doit être comprise entre 1 et 1024 caractères.

#### **Exemple d'appel**

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

#### **Exemple de réponse**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "success": true
    },
    "id": 1
}
```

