---
description: Gestion de KeyStore
---

# API Keystore

Chaque nœud a un keystore intégré. Les clients créent des utilisateurs sur le keystore, qui agissent comme des identités à utiliser lors de l'interaction avec les blockchains. Un fichier de clés existe au niveau du nœud, donc si vous créez un utilisateur sur un nœud, il n'existe que sur ce nœud. Cependant, les utilisateurs peuvent être importés et exportés à l'aide de cette API.

{% hint style="danger" %}
**Vous ne devez créer un utilisateur de keystore que sur un nœud que vous exploitez, car l'opérateur de nœud a accès à votre mot de passe en texte brut.**
{% endhint %}

## Format

Cette API utilise le format RPC `json 2.0`. Pour plus d'informations sur les appels JSON RPC, cliquez [ici](emettre-des-appels-dapi.md).

## Endpoints

```cpp
/ext/keystore
```

## M**é**thodes

### keystore.createUser

Créez un nouvel utilisateur avec le nom d'utilisateur et le mot de passe spécifiés.

**Signature**

```cpp
keystore.createUser(
    {
        username:string,
        password:string
    }
) -> {success:bool}
```

* `username` et `password` peut contenir au plus 1024 caractères.
* Votre requête sera rejetée si le `password` est jugée trop "weak". `password` doit comporter au moins 8 caractères et contenir des lettres majuscules et minuscules ainsi que des chiffres et des symboles.

**Exemple d'un Appel**

```cpp
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

**Exemple de Réponse**

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

```cpp
keystore.deleteUser({username: string, password:string}) -> {success: bool}
```

**Exemple d'un Appel**

```cpp
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

**Exemple de Réponse**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{"success" : true}
}
```

### keystore.exportUser

Exportez un utilisateur. L'utilisateur peut être importé vers un autre nœud avec `keystore.importUser`. Le mot de passe de l'utilisateur reste chiffré.

```cpp
keystore.exportUser(
    {
        username:string,
        password:string
    }
) -> {user:string}
```

**Exemple d'un Appel**

```cpp
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

**Exemple de Réponse**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "user":"4CsUh5sfVwz2jNrJXBVpoPtDsb4tZksWykqmxC5CXoDEERyhoRryq62jYTETYh53y13v7NzeReisi"
    }
}
```

### keystore.importUser

Importer l'utilisateur `password` doit correspondre au mot de passe de l'utilisateur. `username` n'a pas à correspondre au nom d'utilisateur que `user` a lors de son exportation.

```cpp
keystore.importUser(
    {
        username:string,
        password:string,
        user:string
    }
) -> {success:bool}
```

**Exemple d'un Appel**

```cpp
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

**Example de Réponse**

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

Répertoriez les utilisateurs de ce keystore.

**Signature**

```cpp
keystore.ListUsers() -> {users:[]string}
```

**Example d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"keystore.listUsers"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/keystore
```

**Example de Réponse**

```cpp
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

