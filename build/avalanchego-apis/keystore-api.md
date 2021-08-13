# API Keystore

Chaque noeud a une frappe intégrée. Les clients créent des utilisateurs sur la borne, qui agissent comme des identités à utiliser lors de l'interaction avec les chaînes de blocage. Un clavier existe au niveau du nœud, donc si vous créez un utilisateur sur un nœud il n'existe _qu'sur_ ce nœud. Cependant, les utilisateurs peuvent être importés et exportés à l'aide de cette API .

_**Vous devez uniquement créer un utilisateur de frappe sur un noeud que vous exploitez, puisque l'opérateur de noeud a accès à votre mot de passe plaintext**_

Pour la validation et la délégation sur le réseau principal, vous devez émettre des transactions via [le portefeuille](../tutorials/nodes-and-staking/staking-avax-by-validating-or-delegating-with-the-avalanche-wallet.md). De cette façon, les clés de contrôle de vos fonds ne seront pas stockées sur le nœud, ce qui réduit considérablement le risque si un ordinateur exécutant un nœud être compromis.

## Format

Cette API utilise le format API `json 2.0`. Pour plus d'informations sur les appels JSON RPC, voir [ici](issuing-api-calls.md).

## Point de fin

```text
/ext/keystore
```

## Méthodes

### keystore.createUser

Créez un nouvel utilisateur avec le nom d'utilisateur et le mot de passe spécifié.

#### **Signature**

```cpp
keystore.createUser(
    {
        username:string,
        password:string
    }
) -> {success:bool}
```

* `nom` d'utilisateur et `mot de passe` peuvent être au plus 1024 caractères.
* Votre demande sera rejetée si `le mot de passe` est trop faible. `mot de passe` devrait être au moins 8 caractères et contenir des lettres de cas supérieures et inférieures ainsi que des nombres et des symboles.

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

#### **Exemple d'appel**

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

#### **Exemple de réponse**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{"success" : true}
}
```

### keystore.exportUser

Exporter un utilisateur. L'utilisateur peut être importé sur un autre noeud avec [`keystore.importUser`](keystore-api.md#keystore-importuser). Le mot de passe de l'utilisateur reste crypté.

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

`encodage` spécifie le format des données utilisateur de chaîne encodage. Peut être "cb58" ou "hex". Par défaut vers "cb58".

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Importer un utilisateur. `mot de passe` doit correspondre au mot de passe de l'utilisateur. `nom` d'utilisateur n'a pas besoin de correspondre à `l'utilisateur` du nom d'utilisateur eu lorsqu'il a été exporté.

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

`encodage` spécifie le format des données utilisateur encodage de chaîne . Peut être soit "cb58" ou "hex". Par défaut vers "cb58".

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Lister les utilisateurs dans cette frappe.

#### **Signature**

```cpp
keystore.ListUsers() -> {users:[]string}
```

#### **Exemple d'appel**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"keystore.listUsers"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/keystore
```

#### **Exemple de réponse**

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

