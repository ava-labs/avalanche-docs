# API Auth

Cuando ejecuta un nodo, puede requerir que las llamadas de API tengan un token de autorización adjunto. Esta API gestiona la creación y revocación de fichas de autorización.

Una ficha de autorización proporciona acceso a uno o más puntos finales de API. Esto es útil para delegar el acceso a las API de un nodo. Las fichas expiran después de 12 horas.

En el encabezado de una llamada API se proporciona una ficha de autorización. Específicamente, la `autorización` de cabecera debe tener valor `Bearer TOKEN.GOES.HERE``` \(donde TOKEN.GOES.HERE se sustituye por el token\).

Esta API solo se puede llegar si el nodo se inicia con [el argumento de línea de comandos argument--api-auth-required.](../references/command-line-interface.md)`` Si el nodo se inicia sin este CLI, las llamadas API no requieren fichas de autorización, por lo que esta API no es reachable. Esta API nunca requiere que se alcance una ficha de autorización.

La creación de ficha de autorización debe ser autorizada. Si ejecuta su nodo con `--api-auth-required``,` también debe especificar una contraseña de símbolo de autorización con argumento --api-auth-required, Debe proporcionar esta contraseña para crear / revocar fichas de autorización.

Tenga en cuenta que si ejecuta su nodo con `--api-auth-required` requerido, algunas herramientas como MetaMask pueden no ser capaces de hacer llamadas API a su nodo porque no tienen una token de auth.

## Formato de la versión

Esta API utiliza el formato `json 2.0` RPC. Para obtener más información sobre hacer llamadas JSON RPC, vea [aquí.](issuing-api-calls.md)

## Endpoint

```text
/ext/auth
```

## Métodos de trabajo

### auth.newToken

Crea una nueva ficha de autorización que otorga acceso a uno o más puntos finales de API.

#### **Firma**

```cpp
auth.newToken(
    {
        password: string,
        endpoints: []string
    }
) -> {token: string}
```

* `contraseña` es la contraseña de registro de autorización de este nodo.
* `endpoints` es una lista de puntos de extremo que serán accesibles utilizando el token generado. Si `los puntos de` final contienen un elemento `"*"`, el símbolo generado puede acceder a cualquier punto de inicio de la API.
* `token` es el token de autorización.

#### **Ejemplo de llamada**

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

Esta llamada generará una ficha de autorización que permite el acceso a los puntos finales de API `/ext/bc/X` \(es decir, la X-Chain\) y `/ext/info` \(es decir, la API [de información](info-api.md). \)

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbmRwb2ludHMiOlsiKiJdLCJleHAiOjE1OTM0NzU4OTR9.Cqo7TraN_CFN13q3ae4GRJCMgd8ZOlQwBzyC29M6Aps"
    },
    "id": 1
}
```

Esta ficha de autorización debe incluirse en llamadas de API dando valor `de autorización` `de cabecera Bearer eyJhbGciOiUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbmRwb2ludHMiOlsiKiJdLCJleHAiOjE1OTM0NzU4OTR9. Cqo7TraN_CFN13q3ae4GRJCMgd8ZOlQwBzyC29M6Aps`.

Por ejemplo, llamar a [`info.peers`](info-api.md#info-peers) con esta token:

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

Revocar una token previamente generada. La ficha dada ya no concederá acceso a ningún punto de fin. Si la ficha es inválida, no hace nada.

#### **Firma**

```cpp
auth.revokeToken(
    {
        password: string,
        token: string
    }
) -> {success: bool}
```

* `contraseña` es la contraseña de registro de autorización de este nodo.
* `token` es la ficha de autorización que se revoca.

#### **Ejemplo de llamada**

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

#### **Respuesta de ejemplo**

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

Cambie la contraseña de registro de autorización de este nodo. Cualquier ficha de autorización creada bajo una contraseña antigua se volverá inválida.

#### **Firma**

```cpp
auth.changePassword(
    {
        oldPassword: string,
        newPassword: string
    }
) -> {success: bool}
```

* `oldPassword` es la contraseña de registro de autorización actual de este nodo.
* `newPassword` es la nueva contraseña de registro de autorización del nodo después de esta llamada de API. Debe ser entre 1 y 1024 caracteres.

#### **Ejemplo de llamada**

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

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "success": true
    },
    "id": 1
}
```

