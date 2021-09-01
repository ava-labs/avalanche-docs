# API d'administration

Cette API peut être utilisée pour mesurer la santé des nœuds et le débogage. Notez que l'API Admin est désactivé par défaut pour des raisons de sécurité. Pour exécuter un nœud avec l'API d'Admin activé, utilisez [l'argument de la ligne](../references/command-line-interface.md) de commande `--api-admin-enabled=true`.

## Format

Cette API utilise le format `json 2.0`RPC.

{% page-ref page="issuing-api-calls.md" %}

## Endpoint

```text
/ext/admin
```

## Méthodes API

### admin.alias

Assignez un paramètre API un alias, un paramètre différent pour l'API. Le paramètre d'origine va encore fonctionner. Ce changement ne touche que ce nœud ; d'autres nœuds ne sauront pas sur ces alias.

#### **Signature**

```text
admin.alias({endpoint:string, alias:string}) -> {success:bool}
```

* `endpoint`est le point de départ original de l'API. `endpoint`devrait uniquement inclure la partie du point de départ après .`/ext/`
* L'API aliasé peut maintenant être appelée à `ext/alias`.
* `alias`peut être au plus 512 caractères.

#### **Exemple**

```bash
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

#### **Exemple**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

`/ext/bc/X`Maintenant, les appels vers la chaîne X peuvent être effectués à l'une ou l'autre ou de manière équivalente à .`/ext/myAlias`

### admin.aliasChain

Donnez un alias à la blockchain, un nom différent qui peut être utilisé n'importe quel endroit de l'ID de la blockchain.

#### **Signature**

```text
admin.aliasChain(
    {
        chain:string,
        alias:string
    }
) -> {success:bool}
```

* `chain`est l'ID de la blockchain.
* `alias`peut maintenant être utilisé à la place de l'ID de la blockchain \(dans les paramètres de l'API par exemple.\)

#### **Exemple**

```bash
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

#### **Exemple**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

Maintenant, au lieu d'interagir avec la blockchain dont l'ID est `sV6o671RtkGBcno1FiaDbVcFv2sG5aVXMZYzKdP4VQAWmJQnM`en faisant des appels d'API , `/ext/bc/sV6o671RtkGBcno1FiaDbVcFv2sG5aVXMZYzKdP4VQAWmJQnM`on peut également faire des appels vers .`ext/bc/myBlockchainAlias`

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

* `chain`est l'ID de la blockchain.

#### **Exemple**

```bash
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.getChainAliases",
    "params": {
        "chain":"sV6o671RtkGBcno1FiaDbVcFv2sG5aVXMZYzKdP4VQAWmJQnM"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Exemple**

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

### admin.getLoggerLevel

retourne les niveaux de journal et d'affichage des loggers.

#### **Signature**

```text
admin.getLoggerLevel(
    {
        loggerName:string // optional
    }
) -> {
        loggerLevels: {
            loggerName: {
                    logLevel: string,
                    displayLevel: string
            }
        }
    }
```

* `loggerName`est le nom du logger à renvoyer. Ceci est un argument facultatif. Si ce n'est pas spécifié, il retourne tous les loggers possibles.

#### **Exemple**

```bash
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.getLoggerLevel",
    "params": {
        "loggerName": "C"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Exemple**

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "loggerLevels": {
            "C": {
                "logLevel": "DEBUG",
                "displayLevel": "INFO"
            }
        }
    },
    "id": 1
}
```

### admin.lockProfile

Écrit un profil de statistiques mutex sur `lock.profile`.

#### **Signature**

```text
admin.lockProfile() -> {success:bool}
```

#### **Exemple**

```bash
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.lockProfile",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Exemple**

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

Écrit un profil de mémoire de la à `mem.profile`.

#### **Signature**

```text
admin.memoryProfile() -> {success:bool}
```

#### **Exemple**

```bash
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.memoryProfile",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Exemple**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

### admin.setLoggerLevel

Définit les niveaux de journal et d'affichage des loggers.

#### **Signature**

```text
admin.setLoggerLevel(
    {
        loggerName: string, // optional
        logLevel: string, // optional
        displayLevel: string, // optional
    }
) -> {success:bool}
```

* `loggerName`le nom du logger à modifier. Ceci est un paramètre facultatif. Si elle n'est pas spécifiée, elle modifie tous les loggers possibles.
* `logLevel`est le niveau de journal des journaux écrits, peut être omis.
* `displayLevel`est le niveau de journal des journaux affichés, peut être omis.

`logLevel`et ne `displayLevel`peut être omise en même temps.

#### **Exemple**

```bash
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.setLoggerLevel",
    "params": {
        "loggerName": "C",
        "logLevel": "DEBUG",
        "displayLevel": "INFO"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Exemple**

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

Commencer à profiler l'utilisation du CPU du nœud. Pour arrêter, appelez `admin.stopCPUProfiler`. Sur stop, écrit le profil à `cpu.profile`.

#### **Signature**

```text
admin.startCPUProfiler() -> {success:bool}
```

#### **Exemple**

```bash
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.startCPUProfiler",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Exemple**

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

Arrêtez le profil CPU qui a été précédemment démarré.

#### **Signature**

```text
admin.stopCPUProfiler() -> {success:bool}
```

#### **Exemple**

```bash
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.stopCPUProfiler"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Exemple**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

