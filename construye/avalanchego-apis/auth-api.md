# API de Autenticación

Cuando corres tu nodo, puedes requerir que las llamadas de la API tengan un token de autorización asignado. Esta API administra la creación y revoación de tokens de autorizacion.

Un token de autorización provee acceso a un o más extremos de la API. Esto es útil para delegar accesso al API de un nodo. Los tokens expiran después de 12 horas.

Un token de autorización es enviado en el encabezado de la las llamadas a la API. Específicamente el encabezado`Authorization` debe tener el valor `Bearer TOKEN.GOES.HERE` \(donde `TOKEN.GOES.HERE` es reemplazado con el token\).

Esta API es solamente alcanzable si el nodo se inició con el [argumento de línea de comando ](../references/command-line-interface.md)`--api-auth-required`. Si el nodo es iniciado sin esta caracterísitca, las llamadas a la API no requerirán tokens de autorización, entonces la API no será alcanzable. Esta API nunca requiere un token de autorización para ser alcanzado.

La creación de tokens de autorización debe ser permisionada. Si ejecutas tu nodo con `--api-auth-required`, entonces también deberás especificar una contraseña para el token de autorización con el argumento `--api-auth-password`. Debes indicar esta contraseña en función de crear/revocar un token de autorización.

Notar que si ejecutas tu nodo con `--api-auth-required` entonces algunas herramientas como MetaMask pueden no ser capaces de hacer llamadas al API de tu nodo debido a que no cuentan con token de autorización.

## Formato

Esta API utiliza formato RPC `json 2.0`. Para más información en hacer llamadas JSON RPC, mira [aquí.](issuing-api-calls.md)

## Endpoint / Extremo

```text
/ext/auth
```

## Metodos

### auth.newToken

Crea un nuevo token de autorización que otorga el acceso a uno o más extremos de la API.

#### **Firma**

```cpp
auth.newToken(
    {
        password: string,
        endpoints: []string
    }
) -> {token: string}
```

* `password` es la contraseña del token de autorización de este nodo.
* `endpoints` es una lista de extremos que pueden ser accesibles usando el token generado. Si `endpoints` contiene el elemento `"*"`, el token generado dará acceso a cualquier extremo de la API.
* `token` es el token de autorización.

#### **Example Call**

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

This call will generate an authorization token that allows access to API endpoints `/ext/bc/X` \(ie the X-Chain\) and `/ext/info` \(ie the [info API](info-api.md).\)

#### **Example Response**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbmRwb2ludHMiOlsiKiJdLCJleHAiOjE1OTM0NzU4OTR9.Cqo7TraN_CFN13q3ae4GRJCMgd8ZOlQwBzyC29M6Aps"
    },
    "id": 1
}
```

This authorization token should be included in API calls by giving header `Authorization` value `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbmRwb2ludHMiOlsiKiJdLCJleHAiOjE1OTM0NzU4OTR9.Cqo7TraN_CFN13q3ae4GRJCMgd8ZOlQwBzyC29M6Aps`.

For example, to call [`info.peers`](info-api.md#info-peers) with this token:

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

Revoke a previously generated token. The given token will no longer grant access to any endpoint. If the token is invalid, does nothing.

#### **Firma**

```cpp
auth.revokeToken(
    {
        password: string,
        token: string
    }
) -> {success: bool}
```

* `password` is this node’s authorization token password.
* `token` is the authorization token being revoked.

#### **Llamada de ejemplo**

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

#### **Respuesta Ejemplo**

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

Cambia la contraseña del token de autorización de este nodo. Cualquier token de autorización creado con la contraseña anterior será inválido.

#### **Firma**

```cpp
auth.changePassword(
    {
        oldPassword: string,
        newPassword: string
    }
) -> {success: bool}
```

* `oldPassword` es la contraseña actual del token de autorización del nodo.
* `newPassword` es la nueva contraseña del token de autorización que tendrá el nodo después del llamado a la API. Debe tener entre 1 y 1024 caracteres.

#### **Llamada de ejemplo**

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

#### **Respuesta ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "success": true
    },
    "id": 1
}
```

