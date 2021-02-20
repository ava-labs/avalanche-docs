# API Admin

Esta API puede usarse para medir la salud del nodo y depurar errores. Notar que la API Admin está deshabilitada por defecto por razones de seguridad. Pata correr un nodo con la API Admin habilitada, utiliza el [argumento de línea de comandos](../references/command-line-interface.md) `--api-admin-enabled=true`.

## Formato

Esta API utiliza el formato de RPC `json 2.0`.

{% page-ref page="issuing-api-calls.md" %}

## Endpoint / Extremo

```text
/ext/admin
```

## Métodos de API 

### admin.alias

Asigna un sobrenombre al extremo (endpoint) de la API, un extremo distinto para la API. El  extremo original seguirá funcionando. Esto modifica únicamente a este nodo; otros nodos no sabrán de este sobrenombre.

#### **Firma**

```text
admin.alias({endpoint:string, alias:string}) -> {success:bool}
```

* `endpoint` es el extramo original de la API. `endpoint` debe incluir únicamente la la parte del extremo después de `/ext/`.
* La API con sobrenombre ahora puede llamarse con `ext/alias`.
* `alias` puede tener a lo más 512 caracteres.

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

#### **Respuesta ejemplo**

```text
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

Ahora, las llamadas a la X-Chain pueden hacerse ya sea con `/ext/bc/X` o, equivalentemente, a `/ext/myAlias`.

### admin.aliasChain

Da un sobrenombre a una cadena de bloques, un nuevo nombre podrá ser usado en cualquier lugar que es usado el ID de una cadena de bloques.

#### **Firma**

```text
admin.aliasChain(
    {
        chain:string,
        alias:string
    }
) -> {success:bool}
```

* `chain` es el ID de la cadena de bloques.
* `alias` ahora puede usarse en lugar del ID de la cadena de bloques \(en extremos de la API, por ejemplo.\)

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

#### **Respuesta ejemplo**

```text
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

Ahora, en lugar de interactuar con el ID de la cadena de bloques, que es `sV6o671RtkGBcno1FiaDbVcFv2sG5aVXMZYzKdP4VQAWmJQnM` haciendo llamadas API a `/ext/bc/sV6o671RtkGBcno1FiaDbVcFv2sG5aVXMZYzKdP4VQAWmJQnM`, uno también puede hacer las llamadas a `ext/bc/myBlockchainAlias`.

### admin.lockProfile

Escribe un perfil de estadísticas mutex en`lock.profile`.

#### **Firma**

```text
admin.lockProfile() -> {success:bool}
```

#### **Llamada de Ejemplo**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.lockProfile",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Respuesta Ejemplo**

```text
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

### admin.memoryProfile

Escribe un perfil de memoria en `mem.profile`.

#### **Firma**

```text
admin.memoryProfile() -> {success:bool}
```

#### **Llamada de Ejemplo**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.memoryProfile",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Respuesta Ejemplo**

```text
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

### admin.startCPUProfiler

Comienza el perfilamiento de utilización del CPU del nodo. Para detener, llama `admin.stopCPUProfiler`. Estando detenido, escribe el perfil en `cpu.profile`.

#### **Firma**

```text
admin.startCPUProfiler() -> {success:bool}
```

#### **Llamada de Ejemplo**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.startCPUProfiler",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Respuesta Ejemplo**

```text
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

### admin.stopCPUProfiler

Defiene el perfilamiento de CPU que fue iniciado previamente.

#### **Firma**

```text
admin.stopCPUProfiler() -> {success:bool}
```

#### **Llamada de Ejemplo**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.stopCPUProfiler"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Respuesta Ejemplo**

```text
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTM3NTQxNjg2OCwtMTExMjQ3OTQxNSwtNT
A0MzM5NTk1LC0xNjk3MTUwMTMsMTE3MjIyNDc0LC0yMTQwNTE0
MjEwLDU1MjE3Nzc1MF19
-->