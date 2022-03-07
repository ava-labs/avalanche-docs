---
sidebar_position: 13
---
# Keystore API

Every node has a built-in keystore. Clients create users on the keystore, which act as identities to be used when interacting with blockchains. A keystore exists at the node level, so if you create a user on a node it exists _only_ on that node. However, users may be imported and exported using this API.

_**You should only create a keystore user on a node that you operate, as the node operator has access to your plaintext password.**_

For validation and delegation on main net, you should issue transactions through [the wallet](../tutorials/nodes-and-staking/staking-avax-by-validating-or-delegating-with-the-avalanche-wallet.md). That way control keys for your funds won't be stored on the node, which significantly lowers the risk should a computer running a node be compromised.

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

```sh
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

```sh
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

```json
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

```sh
keystore.deleteUser({username: string, password:string}) -> {success: bool}
```

#### **Example Call**

```sh
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

```json
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{"success" : true}
}
```

### keystore.exportUser

Export a user. The user can be imported to another node with [`keystore.importUser`](keystore.md#keystoreimportuser). The user’s password remains encrypted.

#### **Signature**

```sh
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

`encoding` specifies the format of the string encoding user data. Can be either "cb58" or "hex". Defaults to "cb58".

#### **Example Call**

```sh
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

```json
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

```sh
keystore.importUser(
    {
        username:string,
        password:string,
        user:string,
        encoding:string //optional
    }
) -> {success:bool}
```

`encoding` specifies the format of the string encoding user data . Can be either "cb58" or "hex". Defaults to "cb58".

#### **Example Call**

```sh
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

```json
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

```sh
keystore.ListUsers() -> {users:[]string}
```

#### **Example Call**

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"keystore.listUsers"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/keystore
```

#### **Example Response**

```json
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

