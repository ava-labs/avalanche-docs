# API de administración

Esta API se puede utilizar para medir la salud y depuración de nodos. Tenga en cuenta que la API de administrador está desactivada por defecto por razones de seguridad. Para ejecutar un nodo con la API de Admin activada, utilice el [argumento](../references/command-line-interface.md) de línea de comandos `--api-admin-enabled=true`.

## Formato de la versión

Esta API utiliza el formato `json 2.0` RPC.

{% page-ref page="issuing-api-calls.md" %}

## Endpoint

```text
/ext/admin
```

## Métodos de API

### admin.alias

Asignar un endpoint API un alias, un punto de extremo diferente para la API. El punto final original todavía funcionará. Este cambio solo afecta a este nodo; otros nodos no sabrán sobre este alias.

#### **Firma**

```text
admin.alias({endpoint:string, alias:string}) -> {success:bool}
```

* `endpoint` es el punto final original de la API. `endpoint` solo debe incluir la parte del punto final después de `/ext/`.
* La API que se está `ext/alias`.
* `alias` puede ser como máximo de 512 caracteres.

#### **Ejemplo de llamada**

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

#### **Respuesta de ejemplo**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

Ahora, las llamadas a la cadena X se pueden hacer a `/ext/bc/X``` o, equivalentemente, a /ext/bc/X

### admin.aliasChain

Dé un blockchain un alias, un nombre diferente que puede ser usado en cualquier lugar que se utilice el ID de blockchain.

#### **Firma**

```text
admin.aliasChain(
    {
        chain:string,
        alias:string
    }
) -> {success:bool}
```

* `cadena` es la ID de blockchain.
* `alias` ahora se puede utilizar en lugar de la ID de la cadena de bloques \(en puntos finales de API, por ejemplo. \)

#### **Ejemplo de llamada**

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

#### **Respuesta de ejemplo**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

Ahora, en lugar de interactuar con la cadena de bloques cuyo ID es `sV6o671RtkGBcno1FiaDbVcFv2sG5aVXMZYzKdP4VQAWmJQnM``` haciendo llamadas de API a `/ext/bc/sV6o671RtkGBcno1FiaDbVcFv2sG5aVXMZYzKdP4VQAWmJQnM,` también se puede hacer llamadas a /ext/bc/sV6o671RtkGBcno1FiaDbVcFv2sG5aVXMZYzKdP4VQAWmJQnM,

### admin.getChainAliases

Devuelve los alias de la cadena

#### **Firma**

```text
admin.getChainAliases(
    {
        chain:string
    }
) -> {aliases:string[]}
```

* `cadena` es la ID de blockchain.

#### **Ejemplo de llamada**

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

#### **Respuesta de ejemplo**

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

Escribe un perfil de estadísticas de mutex para `lock.profile`.

#### **Firma**

```text
admin.lockProfile() -> {success:bool}
```

#### **Ejemplo de llamada**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.lockProfile",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Respuesta de ejemplo**

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

Escribe un perfil de memoria del to `mem.profile`.

#### **Firma**

```text
admin.memoryProfile() -> {success:bool}
```

#### **Ejemplo de llamada**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.memoryProfile",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Respuesta de ejemplo**

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

Empieza a perfilar la utilización de la CPU del nodo. Para parar, llame al `admin.stopCPUProfiler`. En la parada, escribe el perfil a `cpu.profile`.

#### **Firma**

```text
admin.startCPUProfiler() -> {success:bool}
```

#### **Ejemplo de llamada**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.startCPUProfiler",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Respuesta de ejemplo**

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

Detenga el perfil de CPU que se había iniciado previamente.

#### **Firma**

```text
admin.stopCPUProfiler() -> {success:bool}
```

#### **Ejemplo de llamada**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.stopCPUProfiler"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Respuesta de ejemplo**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

