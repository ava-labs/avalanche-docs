# Auth API

ノードを実行する際に、APIコールが認可トークンが付属するように要求することができます。このAPIにより、認可トークンの作成と失効を管理します。

認可トークンにより、1つ以上のAPIエンドポイントへのアクセスが可能になります。これは、ノードのAPIにアクセスする際に便利です。トークンは、12時間後に期限が切れます。

APIコールヘッダーに、認可トークンが提供されます。具体的には、ヘッダーに値が付いています（`Bearer TOKEN.GOES.HERE`ここでトークンに`TOKEN.GOES.HERE`置き換わる）`Authorization`。

このAPIは、[コマンドライン引数](../references/command-line-interface.md)でノードが開始された場合にのみ到達可能です`--api-auth-required`。このCLIなしでノードが開始された場合、API呼び出しは認可トークンを必要としないため、このAPIに到達できません。このAPIにより、認可トークンに到達する必要はありません。

認可トークンの作成許可が必要です。ノードを実行する場合`--api-auth-required`、引数で認可トークンのパスワードを指定する必要があります`--api-auth-password`。認可トークンを作成/取り消すには、このパスワードを提供する必要があります。

MetaMaskなどのツールでノードを実行した場合`--api-auth-required`、認証トークンが存在しないため、APIコールが発生できない可能性があることに留意してください。

## フォーマット

このAPIは、`json 2.0`RPC形式を使用します。JSON RPC呼び出し方法の詳細については、ここを参照[してください。](issuing-api-calls.md)

## エンドポイント

```text
/ext/auth
```

## メソッド

### auth.newToken

1つ以上のAPIエンドポイントにアクセスできる新しい認可トークンを作成します。

#### **シグネチャ**

```cpp
auth.newToken(
    {
        password: string,
        endpoints: []string
    }
) -> {token: string}
```

* `password`このノードで認可トークンのパスワードです。
* `endpoints`生成されたトークンを使用してアクセス可能になるエンドポイントのリストです。`"*"`要素が含まれ`endpoints`ている場合、生成されたトークンは任意のAPIエンドポイントにアクセスできます。
* `token`認可トークン

#### **コール例**

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

`/ext/info`この呼び出しにより、APIエンドポイントにアクセスできる認可トークンを生成し、APIエンドポイント（X-Chain）と`/ext/bc/X`アクセスを可能にします[。](info-api.md)

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbmRwb2ludHMiOlsiKiJdLCJleHAiOjE1OTM0NzU4OTR9.Cqo7TraN_CFN13q3ae4GRJCMgd8ZOlQwBzyC29M6Aps"
    },
    "id": 1
}
```

この認可トークンは、ヘッダー`Authorization`値を与えることによりAPIコールに含まれなければなりません。`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbmRwb2ludHMiOlsiKiJdLCJleHAiOjE1OTM0NzU4OTR9.Cqo7TraN_CFN13q3ae4GRJCMgd8ZOlQwBzyC29M6Aps`

たとえば、このトークン[`info.peers`](info-api.md#info-peers)で呼び出すには：

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

以前に生成されたトークンを取り消した。与えられたトークンにより、任意のエンドポイントへのアクセスが可能になりません。トークンが無効である場合、何もありません。

#### **シグネチャ**

```cpp
auth.revokeToken(
    {
        password: string,
        token: string
    }
) -> {success: bool}
```

* `password`このノードで認可トークンのパスワードです。
* `token`is is reforce reference reference reference。

#### **コール例**

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

#### **例**

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

このノードで認可トークンのパスワードを変更します。古いパスワードで作成された認可トークンは無効になります。

#### **シグネチャ**

```cpp
auth.changePassword(
    {
        oldPassword: string,
        newPassword: string
    }
) -> {success: bool}
```

* `oldPassword`このノードが現在持つ認可トークンのパスワードです。
* `newPassword`このAPIコール後にノードが新しい認可トークンのパスワードです。1から1024文字でなければなりません。

#### **コール例**

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

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "success": true
    },
    "id": 1
}
```

