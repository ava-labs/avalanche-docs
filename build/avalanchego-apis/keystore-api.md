# Keystore API

すべてのノードには鍵ストアが組み込まれています。クライアントは、keystoreにユーザーを作成します。これは、ブロックチェーンとやり取りする際に使用するIDとして機能します。キーストアはノードレベルに存在するので、ユーザーをノードに作成するとそのノードに_のみ_存在します。ただし、このAPIを使用してユーザーをインポートしてエクスポートすることができます。

_**Nodeオペレーターがプレーンテキストパスワードにアクセスできるため、keystoreユーザーを操作するノードにのみ作成する必要があります。**_

メインネットでのバリデーションとデリジェンスについては、[ウォレット](../tutorials/nodes-and-staking/staking-avax-by-validating-or-delegating-with-the-avalanche-wallet.md)を通じてトランザクションを発行する必要があります。そのため、資金の制御キーはノードに保存されず、ノードを実行するコンピュータが侵害された場合にリスクを大幅に低下します。

## JP-JP-

`JSON 2.0` API 形式を使用しています。JSON RPC 呼び出しの詳細については、[こちら](issuing-api-calls.md)を参照してください。

## Endpoint-JP

```text
/ext/keystore
```

## JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-Java

### keystore.createUser

指定したユーザー名とパスワードで新しいユーザーを作成します。

#### **JPS-JP-JP**

```cpp
keystore.createUser(
    {
        username:string,
        password:string
    }
) -> {success:bool}
```

* `username` と`パスワード`は1024文字以上です。
* `パスワード`が弱い場合、リクエストは拒否されます。`パスワード`は8文字以上で、大文字と小文字、数字と記号を含んでいます。

#### **Call 例**

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

#### **レスポンス例**

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

ユーザーを削除します。

#### **JPS-JP-JP**

```cpp
keystore.deleteUser({username: string, password:string}) -> {success: bool}
```

#### **Call 例**

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

#### **レスポンス例**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{"success" : true}
}
```

### keystore.exportUser

ユーザーをエクスポートします。ユーザーは[`keystore.importUser`](keystore-api.md#keystore-importuser)で別のノードにインポートできます。ユーザーのパスワードは暗号化されたままです。

#### **JPS-JP-JP**

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

`encoding` は、文字列のエンコーディングユーザデータの書式を指定します。"cb58" または "hex" でもできます。デフォルトは "cb58" です。

#### **Call 例**

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

#### **レスポンス例**

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

`user`-JP`-```JP-

#### **JPS-JP-JP**

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

`encoding` は、文字列のエンコーディングユーザーデータの書式を指定します。--デフォルトは "cb58" です。

#### **Call 例**

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

#### **レスポンス例**

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

このキーストアのユーザーを一覧表示します。

#### **JPS-JP-JP**

```cpp
keystore.ListUsers() -> {users:[]string}
```

#### **Call 例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"keystore.listUsers"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/keystore
```

#### **レスポンス例**

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

