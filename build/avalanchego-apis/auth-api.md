# API認証

ノードを実行するときに、API呼び出しに認証トークンを付けるようにリクエストできます。このAPIは、認証トークンの作成と失効を管理します。

認証トークンは、1つまたは複数のAPIエンドポイントへのアクセスを提供します。これは、ノードのAPIへのアクセスを委任するときに役立ちます。トークンは12時間後に失効します。

認証トークンは、API呼び出しのヘッダに指定します。具体的には、ヘッダ`Authorization`に値`Bearer TOKEN.GOES.HERE`を指定します（ここでは`TOKEN.GOES.HERE`をトークンに置き換えています）。

認証トークンの作成には許可が必要です。`--api-auth-required`でノードを実行するは、の引数で認証トークンのパスワードを指定する必要があります。認証トークンを作成・破棄するためには、このパスワードを指定する必要があります。

認証トークンの作成には許可が必要です。`--api-auth-required`でノードを実行するには、`--api-auth-password`の引数で認証トークンのパスワードを指定する必要があります。認証トークンを作成・破棄するためには、このパスワードを指定する必要があります。

なお、`--api-auth-required`でノードを実行すると、MetaMaskのような一部のツールは、認証トークンを持っていないので、ノードへのAPI呼び出しができない場合があります。

## フォーマット

このAPIは`json 2.0`RPCフォーマットを使用しています。JSON RPC呼び出しの詳細については、[こちら](issuing-api-calls.md)をご覧ください。

## エンドポイント

```text
/ext/auth
```

## メソッド

### auth.newToken

1つまたは複数のAPIエンドポイントへのアクセスを許可する新しい認証トークンを作成します。

#### **署名**

```cpp
auth.newToken(
    {
        password: string,
        endpoints: []string
    }
) -> {token: string}
```

* `password`は、このノードの認証トークンのパスワードです。　　
* `endpoints`は，生成されたトークンを使ってアクセスできるエンドポイントのリストです。`endpoints`が`"*"`の要素を含む場合、生成されたトークンは任意のAPIエンドポイントにアクセスできます。
* `token`は認証トークンです。

#### **呼び出し例**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "auth.newToken",
    "params":{
        "password":"YOUR PASSWORD GOES HERE",
        "endpoints":["/ext/bc/X", "/ext/info"]
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/auth
```

この呼び出しは、APIのエンドポイント`/ext/bc/X`（X-Chainなど）や`/ext/info`（[API情報](info-api.md)など）へのアクセスを許可する認証トークンを生成します。

#### **レスポンス例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbmRwb2ludHMiOlsiKiJdLCJleHAiOjE1OTM0NzU4OTR9.Cqo7TraN_CFN13q3ae4GRJCMgd8ZOlQwBzyC29M6Aps"
    },
    "id": 1
}
```

この認証トークンは、ヘッダー`Authorization`値`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbmRwb2ludHMiOlsiKiJdLCJleHAiOjE1OTM0NzU4OTR9.Cqo7TraN_CFN13q3ae4GRJCMgd8ZOlQwBzyC29M6Aps`を指定してAPI呼び出しに含める必要があります。



例えば、このトークンで[`info.peers`](info-api.md#info-peers)を呼び出す場合、次のようになります。

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.peers"
}' 127.0.0.1:9650/ext/info \
-H 'content-type:application/json;' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbmRwb2ludHMiOlsiKiJdLCJleHAiOjE1OTM0NzU4OTR9.Cqo7TraN_CFN13q3ae4GRJCMgd8ZOlQwBzyC29M6Aps'
```

### auth.revokeToken

以前に生成されたトークンを取り消します。指定されたトークンは、どのエンドポイントへのアクセスも未許可となります。トークンが無効な場合は何もしません。

#### **署名**

```cpp
auth.revokeToken(
    {
        password: string,
        token: string
    }
) -> {success: bool}
```

* `password`は、このノードの認証トークンのパスワードです。　　
* `token`は、取り消される認証トークンです。

#### **呼び出し例**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "auth.revokeToken",
    "params":{
        "password":"123",
        "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTMxNzIzMjh9.qZVNhH6AMQ_LpbXnPbTFEL6Vm5EM5FLU-VEKpYBH3k4"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/auth
```

#### **レスポンス例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "success": true
    },
    "id": 1
}
```

### auth.changePassword

このノードの認証トークンのパスワードを変更します。古いパスワードで作成された認証トークンはすべて無効になります。

#### **署名**

```cpp
auth.changePassword(
    {
        oldPassword: string,
        newPassword: string
    }
) -> {success: bool}
```

* `oldPassword`は、このノードの現在の認証トークンのパスワードです。
* `newPassword`は、このAPI呼び出し後のノードの新しい認証トークンパスワードです。 1〜1024文字である必要があります。

#### **呼び出し例**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "auth.changePassword",
    "params":{
        "oldPassword":"OLD PASSWORD HERE",
        "newPassword":"NEW PASSWORD HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/auth
```

#### **レスポンス例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "success": true
    },
    "id": 1
}
```

