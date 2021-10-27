# キーストアAPI

すべてのノードには、キーストアが組み込まれています。クライアントはキーストア上にユーザーを作成し、これがブロックチェーンとやり取りする際に使用するIDとして機能します。キーストアはノードレベルで存在するため、あるノードでユーザーを作成しても、そのノード上に_しか_存在しません。ただし、ユーザーはこのAPIを使用してインポートおよびエクスポートすることができます。

_**ノード運用者は、プレーンテキストのパスワードにアクセスできるため、自分が運用するノードでのみキーストアユーザーを作成する必要があります。**_

メインネットでの検証やデリゲートのためには、[ウォレット](../tutorials/nodes-and-staking/staking-avax-by-validating-or-delegating-with-the-avalanche-wallet.md)を通じてトランザクションを行う必要があります。そうすることで、資金の管理がノードに保存されることはなく、ノードを実行するコンピュータが危険にさらされた場合のリスクを大幅に低減することができます。

## フォーマット

本APIでは、`json 2.0`APIフォーマットを使用しています。JSONのRPC呼び出しの詳細については、[こちら](issuing-api-calls.md)をご覧ください。

## エンドポイント

```text
/ext/keystore
```

## メソッド

### keystore.createUser

指定したユーザー名とパスワードで新規ユーザーを作成します。

#### **署名**

```cpp
keystore.createUser(
    {
        username:string,
        password:string
    }
) -> {success:bool}
```

* `username`と`password`は、最大で1024文字となります。
* `password`が脆弱である場合、リクエストは拒否されます。`password`は、8文字以上で、大文字、小文字、数字、記号を含むものとします。

#### **呼び出し例**

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

ユーザーの削除。

#### **署名**

```cpp
keystore.deleteUser({username: string, password:string}) -> {success: bool}
```

#### **呼び出し例**

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

ユーザーをエクスポートします。[`keystore.importUser`](keystore-api.md#keystore-importuser)でユーザーを別のノードにインポートできます。ユーザーのパスワードは暗号化されたままです。

#### **署名**

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

`encoding`は、ユーザーデータをエンコードする文字列のフォーマットを指定します。「cb58」または「16進数」のいずれかになります。デフォルトは「cb58」です。

#### **呼び出し例**

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

ユーザーをインポートします。`password`はユーザーのパスワードと一致する必要があります。`username`はエクスポートされたときの`user`のユーザー名と一致する必要はありません。

#### **署名**

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

`encoding`は、ユーザーデータをエンコードする文字列のフォーマットを指定します。「cb58」または「16進数」のいずれかを指定します。デフォルトは「cb58」です。

#### **呼び出し例**

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

このキーストアに登録されているユーザーをリストアップします。

#### **署名**

```cpp
keystore.ListUsers() -> {users:[]string}
```

#### **呼び出し例**

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

