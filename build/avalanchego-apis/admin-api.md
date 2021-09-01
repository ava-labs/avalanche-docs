# API de Administración

Esta API puede usarse para medir la salud del nodo y depurar errores. Notar que la API Admin está deshabilitada por defecto por razones de seguridad. `--api-admin-enabled=true`Para ejecutar un nodo con la API de administración habilitada para usar el argumento de [la línea](../references/command-line-interface.md) de comandos

## Format

Esta API utiliza el formato `json 2.0`RPC.

{% page-ref page="issuing-api-calls.md" %}

## Endpoint / Extremo

```text
/ext/admin
```

## API Methods

### admin.alias

Asigna un sobrenombre al extremo \(endpoint\) de la API, un extremo distinto para la API. El extremo original seguirá funcionando. Esto modifica únicamente a este nodo; otros nodos no sabrán de este sobrenombre.

#### **Firma**

```text
admin.alias({endpoint:string, alias:string}) -> {success:bool}
```

* `endpoint`es el punto de partida original de la API. Solo `endpoint`debería incluir la parte del punto de finalización después .`/ext/`
* La API aliada puede ser llamada en `ext/alias`.
* `alias`puede ser al menos 512 caracteres.

#### **Llamada de ejemplo**

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

Ahora, las llamadas a la X-Chain pueden ser hechas a cualquiera o sea, `/ext/bc/X`equivalentemente, a .`/ext/myAlias`

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

* `chain`es el ID de la blockchain
* `alias`Ahora puede ser utilizado en lugar de la ID de la blockchain \(en los extremos de la API, por ejemplo.\)

#### **Llamada de ejemplo**

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

`sV6o671RtkGBcno1FiaDbVcFv2sG5aVXMZYzKdP4VQAWmJQnM`Ahora, en lugar de interactuar con la blockchain cuyo ID está haciendo llamadas de API , `/ext/bc/sV6o671RtkGBcno1FiaDbVcFv2sG5aVXMZYzKdP4VQAWmJQnM`también se puede hacer llamadas .`ext/bc/myBlockchainAlias`

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

* `chain`es el ID de la blockchain

#### **Llamada de ejemplo**

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

### admin.getLoggerLevel

Devuelve el registro y la visualización de los niveles de registradores.

#### **Firma**

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

* `loggerName`es el nombre del registrador que se devuelve Este es un argumento opcional. Si no se especifica, devuelve todos los registros posibles.

#### **Llamada de ejemplo**

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

#### **Respuesta de ejemplo**

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

`lock.profile`Escribe un perfil de estadísticas mutex .

#### **Firma**

```text
admin.lockProfile() -> {success:bool}
```

#### **Llamada de ejemplo**

```bash
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

`mem.profile`Escribe un perfil de memoria del to

#### **Firma**

```text
admin.memoryProfile() -> {success:bool}
```

#### **Llamada de ejemplo**

```bash
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

### admin.setLoggerLevel

Establece los niveles de registro y de visualización de registradores.

#### **Firma**

```text
admin.setLoggerLevel(
    {
        loggerName: string, // optional
        logLevel: string, // optional
        displayLevel: string, // optional
    }
) -> {success:bool}
```

* `loggerName`es el nombre del registrador para ser cambiado. Este es un parámetro opcional. Si no se especifica, cambia todos los registros posibles.
* `logLevel`es el nivel de registro de registros escritos, puede ser omitido.
* `displayLevel`es el nivel de registro de registros mostrados, puede ser omitido.

`logLevel`y no `displayLevel`puede ser omited al mismo tiempo.

#### **Llamada de ejemplo**

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

Comienza el perfilamiento de utilización del CPU del nodo. Para detener, llama `admin.stopCPUProfiler`. En parada, escribe el perfil al `cpu.profile`.

#### **Firma**

```text
admin.startCPUProfiler() -> {success:bool}
```

#### **Llamada de ejemplo**

```bash
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

Defiene el perfilamiento de CPU que fue iniciado previamente.

#### **Firma**

```text
admin.stopCPUProfiler() -> {success:bool}
```

#### **Llamada de ejemplo**

```bash
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

