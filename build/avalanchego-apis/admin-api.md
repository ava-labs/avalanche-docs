# API administratrice

Cette API peut être utilisée pour mesurer la santé des noeuds et le débogage. Notez que l'API Admin est désactivé par défaut pour des raisons de sécurité. Pour exécuter un noeud avec l'API Admin activé, utilisez [l'argument ligne de commande](../references/command-line-interface.md) `enabled,`

## Format

Cette API utilise le format RPC `json 2.0`.

{% page-ref page="issuing-api-calls.md" %}

## Point de fin

```text
/ext/admin
```

## Méthodes API

### admin.alias

Attribuer un paramètre API un alias, un paramètre différent pour l'API. Le paramètre original fonctionnera toujours. Ce changement n'affecte que ce nœud ; d'autres nœuds ne sauront pas sur cet alias.

#### **Signature**

```text
admin.alias({endpoint:string, alias:string}) -> {success:bool}
```

* endpoint est le paramètre initial de l'API. `endpoint` devrait inclure uniquement la partie `du` paramètre après `/ext/`.
* L'API étant aliasée peut maintenant être appelée à `ext/alias`.
* `alias` peut être au plus 512 caractères.

#### **Exemple d'appel**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.alias",
    "params": {
        "alias":"myAlias",
        "endpoint":"bc/X"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Exemple de réponse**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

Maintenant, les appels vers la chaîne X-Chain être effectués soit vers `/ext/bc/X` ou, de façon équivalente, vers `/ext/bc/X`

### admin.aliasChain

Donnez une chaîne de blocs alias, un nom différent qui peut être utilisé n'importe quel endroit l'ID de la chaîne de blocs est utilisé.

#### **Signature**

```text
admin.aliasChain(
    {
        chain:string,
        alias:string
    }
) -> {success:bool}
```

* `chaîne` est l'ID de la chaîne de bloc.
* `alias` peut maintenant être utilisé à la place de l'ID de la blockchain \(dans les paramètres de l'API par exemple. \)

#### **Exemple d'appel**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.aliasChain",
    "params": {
        "chain":"sV6o671RtkGBcno1FiaDbVcFv2sG5aVXMZYzKdP4VQAWmJQnM",
        "alias":"myBlockchainAlias"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Exemple de réponse**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

Maintenant, au lieu d'interagir avec la `blockchain` dont l'ID est `sV6o671RtkGBcno1FiaDbVcFv2sG5aVXMZYzKdP4VQAWmJQnM` en faisant des appels API vers `/ext/bc/sV6o671RtkGBcno1FiaDbVcFv2sG5aVXMZKdP4VQAWmJQnM`, on peut également faire des appels vers sV6o671RtkGBcno1FiaDbVcFv2sG5aVXMZYzKdP4VQAWmJQnM

### admin.getChainAliases

Retourne les alias de la chaîne

#### **Signature**

```text
admin.getChainAliases(
    {
        chain:string
    }
) -> {aliases:string[]}
```

* `chaîne` est l'ID de la chaîne de bloc.

#### **Exemple d'appel**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.getChainAliases",
    "params": {
        "chain":"sV6o671RtkGBcno1FiaDbVcFv2sG5aVXMZYzKdP4VQAWmJQnM"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Exemple de réponse**

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "aliases": [
            "X",
            "avm",
            "2eNy1mUFdmaxXNj1eQHUe7Np4gju9sJsEtWQ4MX3ToiNKuADed"
        ]
    },
    "id": 1
}
```

### admin.lockProfile

Écrit un profil des statistiques mutex à `lock.profile`.

#### **Signature**

```text
admin.lockProfile() -> {success:bool}
```

#### **Exemple d'appel**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.lockProfile",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Exemple de réponse**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

### admin.memoryProfile

Écrit un profil mémoire du profil vers `mem.profile`.

#### **Signature**

```text
admin.memoryProfile() -> {success:bool}
```

#### **Exemple d'appel**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.memoryProfile",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Exemple de réponse**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

### admin.startCPUProfiler

Démarrez le profilage de l'utilisation du CPU du nœud. Pour cesser, appelez `admin.stopCPUProfiler`. En arrêt, écrit le profil à `cpu.profile`.

#### **Signature**

```text
admin.startCPUProfiler() -> {success:bool}
```

#### **Exemple d'appel**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.startCPUProfiler",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Exemple de réponse**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

### admin.stopCPUProfiler

Arrêter le profil CPU qui a été précédemment démarré.

#### **Signature**

```text
admin.stopCPUProfiler() -> {success:bool}
```

#### **Exemple d'appel**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.stopCPUProfiler"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Exemple de réponse**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

