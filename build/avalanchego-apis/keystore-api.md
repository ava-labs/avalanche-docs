# Keystore API

Every node has a built-in keystore. Clients create users on the keystore, which act as identities to be used when interacting with blockchains. A keystore exists at the node level, so if you create a user on a node it exists _only_ on that node. However, users may be imported and exported using this API.

_**You should only create a keystore user on a node that you operate, as the node operator has access to your plaintext password.**_

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

```text
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

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"keystore.createUser",
    "params" :{
        "username":"bob",
        "password":"creme fraiche"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/keystore
```

#### **Example Response**

```text
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

```text
keystore.deleteUser({username: string, password:string}) -> {success: bool}
```

#### **Example Call**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"keystore.deleteUser",
    "params" : {
        "username" : "bob",
        "password" : "3l33th4x0r!!1!"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/keystore
```

#### **Example Response**

```text
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{"success" : true}
}
```

### keystore.exportUser

Export a user. The user can be imported to another node with [`keystore.importUser`](keystore-api.md#keystore-importuser). The user’s password remains encrypted.

```text
keystore.exportUser(
    {
        username:string,
        password:string
    }
) -> {user:string}
```

#### **Example Call**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"keystore.exportUser",
    "params" :{
        "username"  :"bob",
        "password"  :"creme fraiche"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/keystore
```

#### **Example Response**

```text
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "user":"4CsUh5sfVwz2jNrJXBVpoPtDsb4tZksWykqmxC5CXoDEERyhoRryq62jYTETYh53y13v7NzeReisi"
    }
}
```

### keystore.importUser

Import a user. `password` must match the user’s password. `username` doesn’t have to match the username `user` had when it was exported.

```text
keystore.importUser(
    {
        username:string,
        password:string,
        user:string
    }
) -> {success:bool}
```

#### **Example Call**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"keystore.importUser",
    "params" :{
        "username":"accountNameCanBeDifferent",
        "password":"creme fraiche",
        "user"    :"4CsUh5sfVwz2jNrJXBVpoPtDsb4tZksWykqmxC5CXoDEERyhoRryq62jYTETYh53y13v7NzeReisi"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/keystore
```

#### **Example Response**

```text
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

```text
keystore.ListUsers() -> {users:[]string}
```

#### **Example Call**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"keystore.listUsers"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/keystore
```

#### **Example Response**

```text
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "users":[
            "bob"
        ]
    }
}
```

