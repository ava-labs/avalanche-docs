# サブネットを作成する

## はじめに

[サブネット](../../../learn/platform-overview/#subnets)とは、バリデーターのセットです。サブネットは、ブロックチェーンのセットを検証します。各ブロックチェーンは、ブロックチェーン作成で指定されているまさに1つのサブネットで検証されます。サブネットは、強力なプリミティブで、許可されたブロックチェーン作成を可能にします。

サブネットが作成された場合、閾値と鍵のセットが指定されます。（実際には鍵そのもののではなく、鍵のアドレスが指定されます。）そのサブネットにバリデーターを追加するには、これらの鍵からの_閾値_署名が必要です。これらをサブネットの**コントロール鍵**と呼び、サブネットにバリデーターを追加するトランザクションのコントロール鍵の署名を**コントロール署名と呼びます**。アップショットは、サブネットがメンバーシップを管理するものです。

このチュートリアルでは、2つのコントロール鍵と2の閾値で新しいサブネットを作成します。

_注：ブロックチェーン、サブネット、トランザクション、アドレスのIDは、ラン/ネットワークごとに異なる場合があります。つまり、チュートリアルの入力やエンドポイントなどが、実際にやってみると違っていることがあるということです。_

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

### サブネットバリデーターの追加<a id="adding-subnet-validators"></a>

### サブネットバリデータートランザクションを発行する

では、サブネットにバリエーターを追加してみましょう。今はAvalancheウォレットではなく、API呼び出しでサブネットにバリデーターを追加することのみが可能です。

サブネットにID`3fbrm3z38NoDB4yMC3hg5pRvc72XqnAGiu7NgaEp1dwZ8AD9g`、閾値2があるとします。そして、その`username`は、少なくとも2つのコントロール鍵を保持しているとします。

バリデーターを追加するには、APIメソッドを呼び出します[`platform.addSubnetValidator`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-addsubnetvalidator)。その署名は、次の通りです。

```cpp
platform.addSubnetValidator(
    {
        nodeID: string,
        subnetID: string,
        startTime: int,
        endTime: int,
        weight: int,
        changeAddr: string, (optional)
        username: string,
        password: string
    }
) -> {txID: string}
```

パラメータを調べましょう。

`nodeID`

これは、サブネットに追加されるバリデーターのノードIDです。**このバリデーターは、このサブネットを検証する期間全体を検証する必要があります。**

`subnetID`

これは、バリデーターを追加するサブネットのIDです。

`startTime`と`endTime`

上記と同様に、これらは、バリデーターがサブネットを起動し、停止するUnix時間です。`startTime`は、バリデーターがプ一次ネットワークの検証を開始する時間以後になければなりません。`endTime`は、バリデーターが一次ネットワークの検証を停止する時間またはそれ以前でなければなりません。

`weight`

これは、コンセンサスのためのバリデーターのサンプリング重量です。バリデーターの重量が1で、サブネット内のすべてのバリデーターの累積重量が100である場合、このバリデーターは、コンセンサス中に100サンプルごとに約1に含まれます。サブネット内のすべてのバリデーターの累積重量は、少なくとも`snow-sample-size`でなければなりません。例えば、サブネットにバリデーターが1つだけの場合、その重量は少なくとも`snow-sample-size`でなければなりません\(デフォルト２０）。バリデーターの重量は検証中に変更できないことを覚えておき、適切な値を使用するように注意してください。

`changeAddr`

このトランザクションに起因する変更は、このアドレスに送信されます。このフィールドを空のままにすることができます。そうすると、ユーザーが管理するアドレスのいずれかに変更が送信されます。

`username`と`password`

これらのパラメータは、トランザクション手数料を支払うユーザー名とパスワードです。このサブネットにバリデーターを追加するには、ユーザーはこのサブネットのコントロール鍵を十分な数量保持する必要があります。

シェルコマンド`date`を使用して、10分後と30日後のUnix時間を計算し、`startTime`と`endTime`それぞれの値として使用することができます。（注意：Macを使用している場合、`$(date`を`$(gdate`に置き換えてください。`gdate`がインストールされていない場合は、`brew install coreutils`を実行します。\)

例：

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.addSubnetValidator",
    "params": {
        "nodeID":"NodeID-LMUue2dBBRWdDbPL4Yx47Ps31noeewJji",
        "subnetID":"3fbrm3z38NoDB4yMC3hg5pRvc72XqnAGiu7NgaEp1dwZ8AD9g",
        "startTime":'$(date --date="10 minutes" +%s)',
        "endTime":'$(date --date="30 days" +%s)',
        "weight":30,
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

レスポンスには、トランザクションIDと、変更が行われたアドレスがあります。

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2exafyvRNSE5ehwjhafBVt6CTntot7DFjsZNcZ54GSxBbVLcCm",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

[`platform.getTxStatus`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-gettxstatus)呼び出しでトランザクションのステータスを確認することができます。

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTxStatus",
    "params": {
        "txID":"2exafyvRNSE5ehwjhafBVt6CTntot7DFjsZNcZ54GSxBbVLcCm"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

ステータスは、`Committed`でなければなりません。つまり、トランザクションが成功したことを意味します。[`platform.getPendingValidators`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-getpendingvalidators)を呼び出して、ノードが、一次ネットワークの保留中のバリデーターセットにいることを確認することができます。今回は、サブネットIDを指定します。

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {"subnetID":"3fbrm3z38NoDB4yMC3hg5pRvc72XqnAGiu7NgaEp1dwZ8AD9g"},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

レスポンスには、先ほど追加されたノードが含まれます。

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "validators": [
            {
                "nodeID": "NodeID-LMUue2dBBRWdDbPL4Yx47Ps31noeewJji",
                "startTime":1584042912,
                "endTime":1584121156,
                "weight": "30"
            }
        ]
    },
    "id": 1
}
```

`1584042912`時間に達すると、このノードは、このサブネットを検証を開始します。`1584121156`に達すると、このノードは、このサブネットの検証を停止します。

### プライベートサブネット

Avalancheのサブネットは公開されています。これは、すべてのノードがサブネット内の進行中のトランザクション/ブロックを同期してリッスンできることを意味します。ただし、リッスンされたサブネットを検証しているわけではありません。

サブネットバリデーター/ビーコンは、オプションの`validatorOnly`設定により、ブロックチェーンのコンテンツを公開しないことを選択できます。[サブネットの設定](../../references/command-line-interface.md#subnet-configs)で設定をオンにすることができます。`validatorOnly`を`true`に設定すると、ノードはこのサブネットのバリデーターとのみメッセージを交換します。他のピアは、このノードからこのサブネットのコンテンツを知ることはできません。

注：これはノード固有の設定です。このサブネットのすべてのバリデーターは、完全なプライベートサブネットを作成するために、この設定を使用する必要があります。

### サブネットをホワイトリストする

ノードがサブネットのバリデーターとして追加されたので、サブネットのホワイトリストに追加しましょう。ホワイトリストは、ノードがサブネットを意図せず検証しないようにします。

サブネットをホワイトリストするには、ノードを再起動し、サブネットのコンマ区切られたリストのパラメータ`--whitelisted-subnets`を追加します。

この例では、完全なコマンドは次のとおりです。

`./build/avalanchego --whitelisted-subnets=3fbrm3z38NoDB4yMC3hg5pRvc72XqnAGiu7NgaEp1dwZ8AD9g`

コマンドの詳細については、以下を参照してください：[whitelisted-subnetコマンドライン引数](../../references/command-line-interface.md#whitelist)。

