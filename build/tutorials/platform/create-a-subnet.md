# サブネットの作成

## JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-Java

[サブネット](../../../learn/platform-overview/#subnets)とは、バリデーターのセットです。サブネットは、一連のブロックチェーンを検証します。各ブロックチェーンは、ブロックチェーン作成時に指定された1つのサブネットで検証されます。Subnetsは、許可されたブロックチェーンを作成できる強力なプリミティブです。

サブネットが作成されると、閾値とキーのセットが指定されます。JavaScript-JP-JP-\) そのサブネットにバリデーターを追加するには、それらのキーからの_閾値_署名が必要です。これらをサブネットの**コントロールキー**と呼び、コントロールキーのシグネチャーをサブネットにバリデーターを追加するトランザクションでコントロールキーのシグネチャーを呼び出します**。**アップショットは、サブネットがメンバーシップを制御していることです。

このチュートリアルでは、2つのコントロールキーと2の閾値を持つ新しいサブネットを作成します。

### コントロールキーの生成<a id="generate-the-control-keys"></a>

まず、2つのコントロールキーを生成しましょう。これを行うには、[`platform.createAddress`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createaddress) これにより新しい秘密鍵が生成され、ユーザーに保存されます。

最初のキーを生成するには:

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

これにより、最初の制御キー \(再び、それは実際に最初の制御キー\\の_アドレス_を与えます)。キーは、指定したユーザーによって保持されます。

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "P-avax1spnextuw2kfzeucj0haf0e4e08jd4499gn0zwg"
    },
    "id": 1
}
```

2番目のキーを生成します:

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

レスポンスには、指定したユーザーが保持する2番目の制御キーが含まれています。

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "P-avax1zg5uhuwfrf5tv852zazmvm9cqratre588qm24z"
    },
    "id": 1
}
```

### サブネットの作成<a id="create-the-subnet"></a>

サブネットを作成するには、[`platform.createSubnet`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createsubnet) を呼び出します。

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

レスポンスはトランザクションのIDを取得します。これは新しく作成したSubnetのIDでもあります。

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

### 成功の検証<a id="verifying-success"></a>

[`platform.getSubnets`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getsubnets) を呼び出すことで、存在するすべてのサブネットを取得できます:

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

### Validators をサブネットに追加する<a id="add-validators-to-the-subnet"></a>

この[チュートリアル](../nodes-and-staking/add-a-validator.md)では、バリデーターをサブネットに追加する方法を説明します。

