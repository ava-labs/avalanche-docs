# サブネットを作成する

## はじめに

[サブネット](../../../learn/platform-overview/#subnets)とは、バリデーターのセットです。サブネットは、ブロックチェーンのセットを検証します。各ブロックチェーンは、ブロックチェーン作成で指定されているまさに1つのサブネットで検証されます。サブネットは、強力なプリミティブで、許可されたブロックチェーン作成を可能にします。

サブネットが作成された場合、閾値と鍵のセットが指定されます。（実際には鍵そのもののではなく、鍵のアドレスが指定されます。）そのサブネットにバリデーターを追加するには、これらの鍵からの_閾値_署名が必要です。これらをサブネットの**コントロール鍵**と呼び、サブネットにバリデーターを追加するトランザクションのコントロール鍵の署名を**コントロール署名と呼びます**。アップショットは、サブネットがメンバーシップを管理するものです。

このチュートリアルでは、2つのコントロール鍵と2の閾値で新しいサブネットを作成します。

### コントロール鍵を生成する<a id="generate-the-control-keys"></a>

まず、2つのコントロール鍵を生成しましょう。そのためには、[`platform.createAddress`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createaddress)を呼び出します。これにより、新しい秘密鍵を生成し、ユーザーに保存します。

最初の鍵を生成するには、次を実行します。

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createAddress",
    "params": {
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

これにより、最初のコントロール鍵が与えられます（改めて、実際には最初のコントロール鍵の_アドレス_が与えられます）鍵は、指定したユーザーが保持しています。

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "P-avax1spnextuw2kfzeucj0haf0e4e08jd4499gn0zwg"
    },
    "id": 1
}
```

2番目の鍵を生成します。

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createAddress",
    "params": {
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

レスポンスには、指定したユーザーが保持する2番目のコントロール鍵が含まれています。

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "P-avax1zg5uhuwfrf5tv852zazmvm9cqratre588qm24z"
    },
    "id": 1
}
```

### サブネットを作成する<a id="create-the-subnet"></a>

サブネットを作成するには、[`platform.createSubnet`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createsubnet)を呼び出します。

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createSubnet",
    "params": {
        "controlKeys":[
            "P-avax1spnextuw2kfzeucj0haf0e4e08jd4499gn0zwg",
            "P-avax1zg5uhuwfrf5tv852zazmvm9cqratre588qm24z"
        ],
        "threshold":2,
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

レスポンスにより、トランザクションのIDが与えられます。これはまた、新しく作成されたサブネットのIDでもあります。

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "3fbrm3z38NoDB4yMC3hg5pRvc72XqnAGiu7NgaEp1dwZ8AD9g",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

### 成功しているか検証する<a id="verifying-success"></a>

[`platform.getSubnets`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getsubnets)を呼び出して、存在するすべてのサブネットを取得できます。

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getSubnets",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

レスポンスは、サブネットが作成されたことを確認します。

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "subnets": [
            {
                "id": "3fbrm3z38NoDB4yMC3hg5pRvc72XqnAGiu7NgaEp1dwZ8AD9g",
                "controlKeys": [
                    "KNjXsaA1sZsaKCD1cd85YXauDuxshTes2",
                    "Aiz4eEt5xv9t4NCnAWaQJFNz5ABqLtJkR"
                ],
                "threshold": "2"
            }
        ]
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

### サブネットにバリデーターを追加する<a id="add-validators-to-the-subnet"></a>

この[チュートリアル](../nodes-and-staking/add-a-validator.md)では、サブネットにバリデータ－を追加する方法を説明します。

