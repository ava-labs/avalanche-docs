# API Keystore

Chaque nœud a une frappe intégrée. Les clients créent des utilisateurs sur la frappe, qui agissent comme des identités à utiliser lors de l'interaction avec les blockchains. Un clavier existe au niveau du nœud, de sorte que si vous créez un utilisateur sur un nœud, il n'existe _que _sur ce nœud. Toutefois, les utilisateurs peuvent être importés et exportés en utilisant cette API

_**Vous ne devez créer qu'un utilisateur de frappes sur un nœud que vous exploitez, car l'opérateur de nœuds a accès à votre mot de passe en texte.**_

Pour valider et déléguer sur le réseau principal, vous devez émettre des transactions via [le portefeuille](../tutorials/nodes-and-staking/staking-avax-by-validating-or-delegating-with-the-avalanche-wallet.md). De cette façon, les clés de contrôle pour vos fonds ne seront pas stockées sur le nœud, ce qui réduit considérablement le risque si un ordinateur qui exécute un nœud est compromis.

## Format

Cette API utilise le format de `json 2.0`l'API Pour plus d'informations sur la création d'appels JSON RPC, consultez [ici](issuing-api-calls.md).

## Endpoint

```text
/ext/keystore
```

## Méthodes

### keystore.createUser

Créez un nouvel utilisateur avec le nom d'utilisateur et le mot de passe spécifiés.

#### **Signature**

```cpp
keystore.createUser(
    {
        username:string,
        password:string
    }
) -> {success:bool}
```

* `username`et `password`peut être au plus 1024 caractères.
* Votre demande sera rejetée si elle `password`est trop faible. Il `password`devrait être au moins 8 caractères et contenir des lettres de cas supérieures et inférieures ainsi que des numéros et des symboles.

#### **Exemple**

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

#### **Exemple**

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

Supprimer un utilisateur.

#### **Signature**

```cpp
keystore.deleteUser({username: string, password:string}) -> {success: bool}
```

#### **Exemple**

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

#### **Exemple**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{"success" : true}
}
```

### keystore.exportUser

Exporter un utilisateur. L'utilisateur peut être importé sur un autre nœud avec [`keystore.importUser`](keystore-api.md#keystore-importuser). Le mot de passe de l'utilisateur reste crypté.

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

`encoding`spécifie le format de la chaîne de codage des données d'utilisateur. Peut être soit "cb58" ou "hex". Par défaut pour "cb58".

#### **Exemple**

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

#### **Exemple**

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

Importer un utilisateur. Il `password`doit correspondre au mot de passe de l'utilisateur. n'a `username`pas à correspondre au nom d'utilisateur `user`eu lors de son exportation.

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

`encoding`spécifie le format des données d'utilisateur en encodant la chaîne de la . Peut être soit "cb58" ou "hex". Par défaut pour "cb58".

#### **Exemple**

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

#### **Exemple**

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

Lister les utilisateurs de cette frappe.

#### **Signature**

```cpp
keystore.ListUsers() -> {users:[]string}
```

#### **Exemple**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"keystore.listUsers"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/keystore
```

#### **Exemple**

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

