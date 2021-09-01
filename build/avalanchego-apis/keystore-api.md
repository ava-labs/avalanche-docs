# キーストアAPI

すべてのノードに内蔵されたキーストアがあります。クライアントは、ブロックチェーンとのやり取りに際して使用されるアイデンティティとして機能するキーストア上でユーザーを作成します。キーストアはノードレベルで存在するので、あなたがノード上にユーザを作成する場合、そのノード上_に_のみ存在します。しかし、このAPIを使用してユーザーはインポート、エクスポートできます。

_**ノードオペレータがプレーンテキストパスワードにアクセスできるようにするため、動作するノード上に鍵ストアユーザーを作成する必要があります。**_

メインネット上でバリデーションとデリゲーションを行う場合、ウォレットを通じて取引を発行する必要があります[。](../tutorials/nodes-and-staking/staking-avax-by-validating-or-delegating-with-the-avalanche-wallet.md)こうした方法で、あなたの資金のコントロールキーはノードに保存されず、ノードに接続されるコンピュータが危険が発生した場合、リスクを大幅に低下します。

## フォーマット

このAPIは、`json 2.0`API形式を使用します。JSON RPC呼び出し方法の詳細については、ここを参照[してください。](issuing-api-calls.md)

## エンドポイント

```text
/ext/keystore
```

## メソッド

### keystore.createUser

指定されたユーザー名とパスワードで新しいユーザーを作成します。

#### **シグネチャ**

```cpp
keystore.createUser(
    {
        username:string,
        password:string
    }
) -> {success:bool}
```

* `username`そして、最大で1024文字の文字にする`password`ことができます。
* `password`弱すぎる場合、リクエストは拒否されます。少なくとも8文字で、大文字と小文字の大文字と大文字で小文字を入手する`password`必要があります。数字、シンボル

#### **コール例**

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

#### **例**

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

#### **シグネチャ**

```cpp
keystore.deleteUser({username: string, password:string}) -> {success: bool}
```

#### **コール例**

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

#### **例**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{"success" : true}
}
```

### keystore.exportUser

ユーザーをエクスポート。ユーザは、 . で別のノードにインポートすることができます[`keystore.importUser`](keystore-api.md#keystore-importuser)。ユーザーのパスワードは暗号化され続けます。

#### **シグネチャ**

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

`encoding`文字列エンコードユーザーデータのフォーマットを指定します。cb58あるいは16進のいずれかで可能です。デフォルトは、「cb58」になります。

#### **コール例**

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

#### **例**

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

ユーザーをインポートします。エクスポートされた際に持参`user`したユーザー名と一致する`password`必要は`username`ありません。

#### **シグネチャ**

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

`encoding`文字列エンコードユーザーデータのフォーマットを指定します。「cb58」あるいは「六角」のいずれかでできます。デフォルトは、「cb58」になります。

#### **コール例**

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

#### **例**

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

このキーストアでユーザーをリストします。

#### **シグネチャ**

```cpp
keystore.ListUsers() -> {users:[]string}
```

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"keystore.listUsers"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/keystore
```

#### **例**

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

