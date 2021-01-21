# Keystore API

Cada nodo tiene un almacén de llaves integrado. Los clientes crean usuarios en el almacén de llaves, que actúan como identidades que se utilizarán al interactuar con blockchains. Un almacén de llaves existe a nivel de nodo, por lo que si crea un usuario en un nodo, existe _solamente_ en ese nodo. Sin embargo, los usuarios se pueden importar y exportar utilizando esta API.

_**Solo debes crear un usuario de almacén de llaves en un nodo que operes, ya que el operador del nodo tiene acceso a tu contraseña de texto sin formato.**_

Para la validación y delegación en la red principal, debe emitir transacciones a través de [la wallet](../tutorials/nodes-and-staking/staking-avax-by-validating-or-delegating-with-the-avalanche-wallet.md). De esa manera, las llaves de control de tus fondos no se almacenarán en el nodo, lo que reduce significativamente el riesgo en caso de que una computadora que ejecuta un nodo se vea comprometida.

## Formato

Esta API utiliza formato de API `json 2.0`. Para obtener más información sobre cómo realizar llamadas JSON RPC, consulta [aquí](issuing-api-calls.md).

## Endpoint / Extremo

```text
/ext/keystore
```

## Metodos

### keystore.createUser

Cree un nuevo usuario con el nombre de usuario y la contraseña especificados.

#### **Signature**

```cpp
keystore.createUser(
    {
        username:string,
        password:string
    }
) -> {success:bool}
```

* `username` y `password` pueden ser a lo más 1024 caracteres.
* La solicitud será rechazada si la contraseña (`password`) es muy débil. `password` 
debe tener al menos 8 caracteres y contener letras mayúsculas y minúsculas, así como números y símbolos.

#### **Llamada de ejemplo**

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

#### **Respuesta ejemplo**

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

Elimina un usuario.

#### **Signature**

```cpp
keystore.deleteUser({username: string, password:string}) -> {success: bool}
```

#### **Llamada de ejemplo**

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

#### **Respuesta ejemplo**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{"success" : true}
}
```

### keystore.exportUser

Exportar un usuario. El usuario se puede importar a otro nodo con [`keystore.importUser`](keystore-api.md#keystore-importuser). La contraseña del usuario permanece encriptada.

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

`encoding` especifica el formato de la cadena que codifica los datos del usuario. Puede ser "cb58" o "hex". El valor predeterminado es "cb58".

#### **Llamada de ejemplo**

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

#### **Respuesta ejemplo**

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

Import a user. `password` must match the user’s password. `username` doesn’t have to match the username `user` had when it was exported.

#### **Signature**

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

`encoding` specifies the format of the string encoding user data . Can be either “cb58” or “hex”. Defaults to “cb58”.

#### **Example Call**

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

#### **Example Response**

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

List the users in this keystore.

#### **Signature**

```cpp
keystore.ListUsers() -> {users:[]string}
```

#### **Llamada de ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"keystore.listUsers"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/keystore
```

#### **Respuesta ejemplo**

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

<!--stackedit_data:
eyJoaXN0b3J5IjpbNTMzNjEwMTYzXX0=
-->