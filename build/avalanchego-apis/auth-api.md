# Auth API

ノードを実行するときに、APIコールにAuthorization Tokenが付属していることを要求できます。この API は、認可トークンの作成と失効を管理します。

認可トークンにより、1つ以上のAPIエンドポイントへのアクセスが可能になります。これは、ノードの API にアクセスする際に便利です。トークンは12時間後に有効期限が切れます。

API コールのヘッダーに認可トークンが提供されます。具体的には、ヘッダー`Authorization`には`Bearer TOKEN.GOES.HERE` \(`where TOKEN.GOES.HERE` is rundata token\)があります。

このAPIは[、コマンドライン引数--api-auth-required](../references/command-line-interface.md)``でノードが起動した場合にのみ到達可能です。このCLIなしでノードが起動された場合、APIコールでは認可トークンが不要なため、このAPIは到達できません。このAPIでは、認可トークンに到達する必要はありません。

Authorization tokenの作成は許可されなければなりません。`--api-auth-required` を使用してノードを実行する場合、`--api-auth-password` 引数で認可トークンパスワードを指定する必要があります。認可トークンを作成/取り消すには、このパスワードを提供する必要があります。

`--api-auth-required`でノードを実行すると、MetaMaskのようないくつかのツールでは、Authトークンを持っていないため、ノードにAPIコールを実行できない可能性があります。

## JP-JP-

`JSON 2.0` RPC 形式を使用しています。JSON RPC 呼び出しの詳細については、[こちら](issuing-api-calls.md)を参照してください。

## Endpoint-JP

```text
/ext/auth
```

## JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScri

### auth.newToken

1つ以上の API エンドポイントへのアクセスを許可する新しい認可トークンを作成します。

#### **JPS-JP-JP**

```cpp
auth.newToken(
    {
        password: string,
        endpoints: []string
    }
) -> {token: string}
```

* `password` はこのノードの認可トークンパスワードです。
* `endpoints` は、生成されたトークンを使用してアクセスできるエンドポイントのリストです。`endpoints` には、`"*"` 要素が含まれている場合、生成されたトークンが API エンドポイントにアクセスできます。
* `token` は認可トークンです。

#### **Call 例**

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

この呼び出しにより、API エンドポイント`/ext/bc/X` \(すなわちX-Chain\)および`/ext/info` \(すなわち[info API](info-api.md))へのアクセスを可能にする認可トークンが生成されます。\)

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

この認証トークンは、APIコールに含まれている必要があります`。Authorization value Bearer eyJhbGciOiJIJIJIUzI1NiIsInR5cCI6IkpXVCJJ9.eyJFbmRwb2ludHMiOlsiKiJdLCJleHAiOjE1OTM0NzU4OTR9.Cqo7TraN_CFN13q3ae4GRJCMgd8ZOlQwBzyC29M6Aps```.

例えば、このトークンで [`info.peers`](info-api.md#info-peers) を呼び出すには、次のようにします。

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

JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScri与えられたトークンにより、エンドポイントへのアクセスが許可されなくなります。トークンが無効である場合、何もありません。

#### **JPS-JP-JP**

```cpp
auth.revokeToken(
    {
        password: string,
        token: string
    }
) -> {success: bool}
```

* `password` はこのノードの認可トークンパスワードです。
* `token` は、取り消される認可トークンです。

#### **Call 例**

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

### auth.changePasswordPassword

このノードの認可トークンパスワードを変更します。古いパスワードで作成された認可トークンは無効になります。

#### **JPS-JP-JP**

```cpp
auth.changePassword(
    {
        oldPassword: string,
        newPassword: string
    }
) -> {success: bool}
```

* `oldPassword`はこのノードの現在の認可トークンパスワードです。
* `newPassword` は、このAPIコール後のノードの新しい認可トークンパスワードです。1-1024文字でなければなりません。

#### **Call 例**

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

