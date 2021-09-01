# Auth

Lorsque vous exécutez un nœud, vous pouvez exiger que les appels API aient un jeton d'autorisation en annexe. Cette API gère la création et la révocation des jetons d'autorisation.

Un jeton d'autorisation fournit l'accès à un ou plusieurs paramètres d'API Ceci est utile pour déléguer l'accès aux API d'un nœud. Les jetons expirent après 12 heures.

Un jeton d'autorisation est fourni dans l'en-tête d'un appel de l'API Plus précisément, l'en-tête `Authorization`devrait avoir une valeur `Bearer TOKEN.GOES.HERE`\(où est `TOKEN.GOES.HERE`remplacé par le jeton\).

Cette API n'est accessible que si le nœud est démarré avec un [argument](../references/command-line-interface.md) en ligne de `--api-auth-required`commande. Si le nœud est démarré sans ce CLI, les appels API ne nécessitent pas de jetons d'autorisation, de sorte que cette API n'est pas réalisable. Cette API ne nécessite jamais un jeton d'autorisation pour être atteint.

La création de jetons d'autorisation doit être autorisée. Si vous exécutez votre nœud avec `--api-auth-required`, vous devez également spécifier un mot de passe de jeton d'autorisation avec un argument `--api-auth-password`. Vous devez fournir ce mot de passe afin de créer/révoquer les jetons d'autorisation.

Notez que si vous exécutez votre nœud avec `--api-auth-required`certains outils comme MetaMask peuvent ne pas être en mesure de faire des appels API sur votre nœud parce qu'ils n'ont pas de jeton de hauts.

## Format

Cette API utilise le format `json 2.0`RPC. Pour plus d'informations sur la création d'appels JSON RPC, consultez [ici.](issuing-api-calls.md)

## Endpoint

```text
/ext/auth
```

## Méthodes

### auth.newToken

Crée un nouveau jeton d'autorisation qui accorde l'accès à un ou plusieurs paramètres d'API

#### **Signature**

```cpp
auth.newToken(
    {
        password: string,
        endpoints: []string
    }
) -> {token: string}
```

* `password`est le mot de passe de jeton d'autorisation de ce nœud.
* `endpoints`est une liste de paramètres qui seront accessibles en utilisant le jeton généré. Si `endpoints`contient un élément , `"*"`le jeton généré peut accéder à tout paramètre d'API
* `token`est le jeton d'autorisation.

#### **Exemple**

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

Cet appel va générer un jeton d'autorisation qui permet d'accéder aux paramètres d'API [\(c'est-à-dire](info-api.md) la X-Chain\) et `/ext/bc/X``/ext/info`\(c'est-à-dire l'API d'information.\)

#### **Exemple**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbmRwb2ludHMiOlsiKiJdLCJleHAiOjE1OTM0NzU4OTR9.Cqo7TraN_CFN13q3ae4GRJCMgd8ZOlQwBzyC29M6Aps"
    },
    "id": 1
}
```

Ce jeton d'autorisation devrait être inclus dans les appels de l'API en donnant une `Authorization`valeur d'en-tête .`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbmRwb2ludHMiOlsiKiJdLCJleHAiOjE1OTM0NzU4OTR9.Cqo7TraN_CFN13q3ae4GRJCMgd8ZOlQwBzyC29M6Aps`

Par exemple, pour appeler [`info.peers`](info-api.md#info-peers)avec ce jeton :

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

Révoquer un jeton généré précédemment. Le jeton donné n'accordera plus l'accès à aucun point de fin. Si le jeton est invalide, ne fait rien.

#### **Signature**

```cpp
auth.revokeToken(
    {
        password: string,
        token: string
    }
) -> {success: bool}
```

* `password`est le mot de passe de jeton d'autorisation de ce nœud.
* `token`est le jeton d'autorisation révoqué.

#### **Exemple**

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

#### **Exemple**

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

Modifiez le mot de passe de jeton d'autorisation de ce nœud. Toute jetons d'autorisation créés sous un ancien mot de passe deviendra invalide.

#### **Signature**

```cpp
auth.changePassword(
    {
        oldPassword: string,
        newPassword: string
    }
) -> {success: bool}
```

* `oldPassword`est le mot de passe de jeton d'autorisation actuel de ce nœud.
* `newPassword`est le nouveau mot de passe de jeton d'autorisation du nœud après cet appel d'API. Doit être comprise entre 1 et 1024 caractères.

#### **Exemple**

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

#### **Exemple**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "success": true
    },
    "id": 1
}
```

