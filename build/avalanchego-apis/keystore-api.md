# API de Keystore

Cada nodo tiene una llave incorporada. Los clientes crean usuarios en el keystore, que actúan como identidades que deben utilizarse al interactuar con blockchains. Existe un keystore a nivel de nodo, por lo que si crea un _usuario_ en un nodo solo existe en ese nodo. Sin embargo, los usuarios pueden importarse y exportarse utilizando esta API.

_**Solo debe crear un usuario de keystore en un nodo que opera, ya que el operador de nodo tiene acceso a su contraseña de texto llano.**_

Para la validación y delegación en red principal, debe emitir transacciones a través de [la billetera](../tutorials/nodes-and-staking/staking-avax-by-validating-or-delegating-with-the-avalanche-wallet.md). De esa manera las teclas de control de sus fondos no se almacenarán en el nodo, lo que reduce significativamente el riesgo si un equipo que ejecuta un nodo se compromete.

## Formato de la versión

Esta API utiliza el formato de API `json 2.0`. Para obtener más información sobre hacer llamadas JSON RPC, vea [aquí](issuing-api-calls.md).

## Endpoint

```text
/ext/keystore
```

## Métodos de trabajo

### keystore.createUser

Crear un nuevo usuario con el nombre de usuario y contraseña especificados.

#### **Firma**

```cpp
keystore.createUser(
    {
        username:string,
        password:string
    }
) -> {success:bool}
```

* `nombre` de usuario y `contraseña` pueden ser como máximo 1024 caracteres.
* Su solicitud será rechazada si `la contraseña` es demasiado débil. `La contraseña` debe ser al menos 8 caracteres y contener letras de caja superior e inferior, así como números y símbolos.

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"keystore.createUser",
    "params" :{
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/keystore
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

### keystore.deleteUser

Suprímase a un usuario.

#### **Firma**

```cpp
keystore.deleteUser({username: string, password:string}) -> {success: bool}
```

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"keystore.deleteUser",
    "params" : {
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/keystore
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{"success" : true}
}
```

### keystore.exportUser

Exportar un usuario. El usuario puede importarse a otro nodo con [`keystore.importUser`](keystore-api.md#keystore-importuser). La contraseña del usuario sigue cifrada.

#### **Firma**

```cpp
keystore.exportUser(
    {
        username:string,
        password:string,
        encoding:string //optional
    }
) -> {
    user:string,
    encoding:string
}
```

`La codificación` especifica el formato de los datos de usuario de codificación de string. Puede ser "cb58" o "hex". Defaults to "cb58".

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"keystore.exportUser",
    "params" :{
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/keystore
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "user":"4CsUh5sfVwz2jNrJXBVpoPtDsb4tZksWykqmxC5CXoDEERyhoRryq62jYTETYh53y13v7NzeReisi",
        "encoding":"cb58"
    }
}
```

### keystore.importUser

Importar un usuario. `la contraseña` debe coincidir con la contraseña del usuario. `El nombre` de usuario no tiene que coincidir con el `usuario` que tenía el usuario cuando fue exportado.

#### **Firma**

```cpp
keystore.importUser(
    {
        username:string,
        password:string,
        user:string,
        encoding:string //optional
    }
) -> {success:bool}
```

`codificación` especifica el formato de los datos de usuario de codificación de string . Puede ser "cb58" o "hex". Defaults to "cb58".

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"keystore.importUser",
    "params" :{
        "username":"myUsername",
        "password":"myPassword",
        "user"    :"4CsUh5sfVwz2jNrJXBVpoPtDsb4tZksWykqmxC5CXoDEERyhoRryq62jYTETYh53y13v7NzeReisi"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/keystore
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

### keystore.listUsers

Enumera a los usuarios de esta keystore.

#### **Firma**

```cpp
keystore.ListUsers() -> {users:[]string}
```

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"keystore.listUsers"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/keystore
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "users":[
            "myUsername"
        ]
    }
}
```

