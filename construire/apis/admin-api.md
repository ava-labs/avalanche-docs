---
description: Cette API peut être utilisée pour mesurer la santé des nœuds et le débogage
---

# API Admin

Cette API peut être utilisée pour mesurer la santé des nœuds et le débogage. Notez que l'API Admin est désactivée par défaut pour des raisons de sécurité. Pour exécuter un nœud avec l'API Admin activée, utilisez l'argument de ligne de commande`--api-admin-enabled=true`.

## Format

Cette API utilise le format RPC `json 2.0`. Pour plus d'informations sur les appels JSON RPC, cliquez [ici](emettre-des-appels-dapi.md).

## Endpoint

```cpp
/ext/admin
```

## Méthodes API

### admin.alias

Attribuez à un point de terminaison d'API un alias, un endpoint différent pour l'API. Le point de terminaison d'origine fonctionnera toujours. Ce changement n'affecte que ce nœud ; les autres nœuds ne connaîtront pas cet alias.

#### **Signature**

```text
admin.alias(endpoint:string, alias:string) -> {success:bool}
```

* `endpoint` est le endpoint d'origine de l'API. `endpoint` ne doit inclure que la partie du endpoint après `/ext/`.
* L'API en cours d'alias peut maintenant être appelée à`ext/alias`.
* `alias` peut comporter au maximum 512 caractères

#### **Exemple d'un Appel**

```cpp
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

#### **Exemple  de Résponse**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

Désormais, les appels à la X-Chain peuvent être effectués soit vers `/ext/bc/X` soit, de manière équivalente, vers`/ext/myAlias`.

### admin.aliasChain

Donnez à une blockchain un alias, un nom différent qui peut être utilisé partout où l'ID de la blockchain est utilisé.

#### **Signature**

```cpp
admin.aliasChain(
    {
        chain:string,
        alias:string
    }
) -> {success:bool}
```

* `chain` est l'ID de la blockchain.
* `alias` peut désormais être utilisé à la place de l'ID de la blockchain \(dans les points de terminaison d'API, par exemple\).

#### **Exemple d'un Appel**

```cpp
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

#### **Example de Réponse**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

Maintenant, au lieu d'interagir avec la blockchain dont l'ID est`sV6o671RtkGBcno1FiaDbVcFv2sG5aVXMZYzKdP4VQAWmJQnM` en passant des appels API à`/ext/bc/sV6o671RtkGBcno1FiaDbVcFv2sG5aVXMZYzKdP4VQAWmJQnM`, on peut aussi appeler `ext/bc/myBlockchainAlias`.

### admin.lockProfile

Écrit un profil de statistiques mutex dans `lock.profile`.

#### **Signature**

```cpp
admin.lockProfile() -> {success:bool}
```

#### **Exemple d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.lockProfile",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Exemple de Réponse**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

### admin.memoryProfile

Écrit un profil mémoire du `mem.profile`.

#### **Exemple d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.memoryProfile",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Exemple de Réponse**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

### admin.startCPUProfiler

Commencez à profiler l'utilisation du processeur du nœud. Pour arrêter, appelez `stopCPUProfiler`. À l'arrêt, écrit le profil dans `cpu.profile`.

**Signature**

```cpp
admin.startCPUProfiler() -> {success:bool}
```

#### **Exemple d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.startCPUProfiler",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Exemple de Réponse**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

### admin.stopCPUProfiler

Arrêtez le profil de CPU qui a été précédemment démarré.

#### **Signature**

```text
admin.stopCPUProfiler() -> {success:bool}
```

#### **Exemple d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.stopCPUProfiler"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Exemple de Réponse**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

