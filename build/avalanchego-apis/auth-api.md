# API de Autenticación

Cuando corres tu nodo, puedes requerir que las llamadas de la API tengan un token de autorización asignado. Esta API administra la creación y revoación de tokens de autorizacion.

Un token de autorización provee acceso a un o más extremos de la API. Esto es útil para delegar accesso al API de un nodo. Los tokens expiran después de 12 horas.

Un token de autorización es enviado en el encabezado de la las llamadas a la API. Específicamente, el encabezado `Authorization`debería tener valor `Bearer TOKEN.GOES.HERE`\(donde se `TOKEN.GOES.HERE`reemplaza con el token\).

Esta API solo es accesible si el nodo se inicia con [el argumento de la línea](../references/command-line-interface.md) de `--api-auth-required`comandos. Si el nodo es iniciado sin esta caracterísitca, las llamadas a la API no requerirán tokens de autorización, entonces la API no será alcanzable. Esta API nunca requiere un token de autorización para ser alcanzado.

La creación de tokens de autorización debe ser permisionada. Si ejecutas tu nodo `--api-auth-required`, también debes especificar una contraseña de token de autorización con `--api-auth-password`argumento. Debes indicar esta contraseña en función de crear/revocar un token de autorización.

`--api-auth-required`Tenga en cuenta que si ejecutas tu nodo con algunas herramientas como MetaMask pueden no ser capaces de hacer llamadas de API a tu nodo porque no tienen un token de auth.

## Format

Esta API utiliza el formato `json 2.0`RPC. Para más información sobre la realización de llamadas RPC, mira [aquí.](issuing-api-calls.md)

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

* `password`es la contraseña de token de autorización de este nodo de que se autorice
* `endpoints`es una lista de puntos de extremo que serán accesibles usando el token generado. Si `endpoints`contiene un elemento , `"*"`el token generado puede acceder a cualquier punto de finalización de la API.
* `token`es el token de autorización.

#### **Llamada de ejemplo**

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

Esta llamada generará un token de autorización que permite el acceso a los puntos de finalización de la API \(es `/ext/bc/X`decir, la X-Chain\) y \(es `/ext/info`decir, la [API](info-api.md) de información.\)

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

Este token de autorización debería ser incluido en las llamadas de API al dar `Authorization`valor de cabecera.`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbmRwb2ludHMiOlsiKiJdLCJleHAiOjE1OTM0NzU4OTR9.Cqo7TraN_CFN13q3ae4GRJCMgd8ZOlQwBzyC29M6Aps`

Por ejemplo, llamar [`info.peers`](info-api.md#info-peers)con este token:

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

* `password`es la contraseña de token de autorización de este nodo de que se autorice
* `token`es el token de autorización

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

* `oldPassword`es la contraseña de token de autorización actual de este nodo.
* `newPassword`es la nueva contraseña de token de autorización del nodo después de esta llamada de API. Debe tener entre 1 y 1024 caracteres.

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

