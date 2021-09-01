# サブネットを作成する

## はじめに

[サブネット](../../../learn/platform-overview/#subnets)は、バリデータセットです。サブネットは、一連のブロックチェーンを検証します。各ブロックチェーンは、ブロックチェーン作成上指定されているまさに1つのサブネットで検証されます。サブネットは、許可されたブロックチェーンの作成を可能にする、パワフルなプリミティブです。

サブネットが作成される際に、閾値と一連の鍵が指定されます。（実際に鍵自身ではなく、鍵のアドレスが指定されます。そのサブネットにバリデータを追加するためには、これらのキーから_閾値_署名が必要です。****サブネットのコントロールキーと呼び、トランザクション上の**コントロールキーの署名をサブネットに追加するコントロールキーと呼びます。**アップショットは、サブネットがメンバーシップをコントロールするということです。

このチュートリアルでは、2つのコントロールキーと2の閾値で新しいサブネットを作成します。

### コントロールキーを生成する<a id="generate-the-control-keys"></a>

まず、2つのコントロールキーを生成しましょう。これを呼び出し、[`platform.createAddress`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createaddress)新しい秘密鍵を生成し、ユーザーのために保存します。

最初のキーを生成するには、：

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

これにより、最初のコントロールキーが与えられます（再び、実際に最初のコントロールキー_の_アドレスが与えられます）。鍵は、指定したユーザーによって保持されます。

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "P-avax1spnextuw2kfzeucj0haf0e4e08jd4499gn0zwg"
    },
    "id": 1
}
```

2番目のキーを生成します：

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

レスポンスには、我々が指定したユーザーによって保持される第2コントロールキーが含まれています：

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "P-avax1zg5uhuwfrf5tv852zazmvm9cqratre588qm24z"
    },
    "id": 1
}
```

### サブネットを作成<a id="create-the-subnet"></a>

サブネットを作成するには、我々は[`platform.createSubnet`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createsubnet).

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

レスポンスにより、トランザクションのIDが提供されます。これは、新しく作成されたSubnetのIDです。

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

### 成功を検証<a id="verifying-success"></a>

以下のサブネット[`platform.getSubnets`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getsubnets)を呼び出すことができます：

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getSubnets",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

こうした対応により、我々のサブネットが作成されたことを確認します：

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

### サブネットにバリデータを追加する<a id="add-validators-to-the-subnet"></a>

この[チュートリアル](../nodes-and-staking/add-a-validator.md)では、バリデータをサブネットに追加する方法を説明します。

