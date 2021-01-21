# Keystore API

Cada nodo tiene un almacén de llaves integrado. Los clientes crean usuarios en el almacén de llaves, que actúan como identidades que se utilizarán al interactuar con blockchains. Un almacén de llaves existe a nivel de nodo, por lo que si crea un usuario en un nodo, existe _solamente_ en ese nodo. Sin embargo, los usuarios se pueden importar y exportar utilizando esta API.

_**Solo debes crear un usuario de almacén de llaves en un nodo que operes, ya que el operador del nodo tiene acceso a tu contraseña de texto sin formato.**_

Para la validación y delegación en la red principal, debe emitir transacciones a través de [la wallet](../tutorials/nodes-and-staking/staking-avax-by-validating-or-delegating-with-the-avalanche-wallet.md). De esa manera, las llaves de control de tus fondos no se almacenarán en el nodo, lo que reduce significativamente el riesgo en caso de que una computadora que ejecuta un nodo se vea comprometida.That way control keys for your funds won't be stored on the node, which significantly lowers the risk should a computer running a node be compromised.

## Format

This API uses the `json 2.0` API format. For more information on making JSON RPC calls, see [here](issuing-api-calls.md).

## Endpoint

```text
/ext/keystore
```

## Methods

### keystore.createUser

Create a new user with the specified username and password.

#### **Signature**

```cpp
keystore.createUser(
    {
        username:string,
        password:string
    }
) -> {success:bool}
```

* `username` and `password` can be at most 1024 characters.
* Your request will be rejected if `password` is too weak. `password` should be at least 8 characters and contain upper and lower case letters as well as numbers and symbols.

#### **Example Call**

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

### keystore.deleteUser

Delete a user.

#### **Signature**

```cpp
keystore.deleteUser({username: string, password:string}) -> {success: bool}
```

#### **Example Call**

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

#### **Example Response**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{"success" : true}
}
```

### keystore.exportUser

Export a user. The user can be imported to another node with [`keystore.importUser`](keystore-api.md#keystore-importuser). The user’s password remains encrypted.

#### **Signature**

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

`encoding` specifies the format of the string encoding user data. Can be either “cb58” or “hex”. Defaults to “cb58”.

#### **Example Call**

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

#### **Example Response**

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

#### **Example Call**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"keystore.listUsers"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/keystore
```

#### **Example Response**

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
eyJoaXN0b3J5IjpbLTE1Njg1MDYyNDFdfQ==
-->