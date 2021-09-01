# API del Keystore

Cada nodo tiene un almacén de llaves integrado. Los clientes crean usuarios en el almacén de llaves, que actúan como identidades que se utilizarán al interactuar con blockchains. Existe una tienda de clave al nivel de nodo, así que si creas un usuario en un nodo que existe _solo _en ese nodo. Sin embargo, los usuarios se pueden importar y exportar utilizando esta API.

_**Solo debes crear un usuario de keystore en un nodo que operas, ya que el operador de nodo tiene acceso a tu contraseña de texto llano.**_

Para la validación y la delegación en la red principal, deberías emitir transacciones a través de [la billetera](../tutorials/nodes-and-staking/staking-avax-by-validating-or-delegating-with-the-avalanche-wallet.md). De esa manera, las llaves de control de tus fondos no se almacenarán en el nodo, lo que reduce significativamente el riesgo en caso de que una computadora que ejecuta un nodo se vea comprometida.

## Format

Esta API utiliza el formato `json 2.0`API. Para más información sobre la realización de llamadas RPC, mira [aquí](issuing-api-calls.md).

## Endpoint / Extremo

```text
/ext/keystore
```

## Metodos

### keystore.createUser

Cree un nuevo usuario con el nombre de usuario y la contraseña especificados.

#### **Firma**

```cpp
keystore.createUser(
    {
        username:string,
        password:string
    }
) -> {success:bool}
```

* `username`y `password`puede ser como máximo 1024 caracteres.
* Tu solicitud será rechazada si `password`es demasiado débil. `password`Debería ser al menos 8 caracteres y contener letras de caso superiores e inferiores, así como números y símbolos.

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

Elimina un usuario.

#### **Firma**

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

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{"success" : true}
}
```

### keystore.exportUser

Exportar un usuario. El usuario puede importarse a otro nodo con [`keystore.importUser`](keystore-api.md#keystore-importuser). La contraseña del usuario permanece encriptada.

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

`encoding`especifica el formato de los datos de usuario de codificación de string. Por defecto es "cb58".

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

Importar un usuario. `password`Debe coincidir con la contraseña del usuario. `username`No tiene que coincidir con el nombre de usuario que `user`tenía cuando fue exportado.

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

`encoding`especifica el formato de los datos de usuario de codificación de string Puede ser "cb58" o "hex". Por defecto es "cb58".

#### **Llamada de ejemplo**

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

Lista de usuarios en el almacén de llaves.

#### **Firma**

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

