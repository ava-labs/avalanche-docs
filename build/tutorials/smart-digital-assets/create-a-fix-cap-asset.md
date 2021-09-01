# 固定キャップアセットを作成する

## はじめに

このチュートリアルでは、Avalancheを使用して固定資産を作成、取引できる方法を説明します。アセットの初期化時にアセットの特定の量が作成され、その後、これ以上生成されることはありません。

100万株を持つ所得分担協定（ISA）が存在し、これ以上株式が作成されないとしましょう。ISAの1つのシェアを表すアセットを作成しましょう。

## 要件

完了した[Avalancheノードを実行](../nodes-and-staking/run-avalanche-node.md)し、Avalancheアーキテクチャに精通しています[。](../../../learn/platform-overview/)

## アセットを作成する

X[-Chain](../../../learn/platform-overview/#exchange-chain-x-chain)上に存在するので、X-Chain APIの方法`avm.createFixedCapAsset`として我々が呼ぶアセットを作成するように、[我々の](../../avalanchego-apis/exchange-chain-x-chain-api.md)アセットを作成します。

このメソッドの署名は、次のとおりです。

```cpp
avm.createFixedCapAsset({
    name: string,
    symbol: string,
    denomination: int,  
    initialHolders: []{
        address: string,
        amount: int
    },
    from: []string,
    changeAddr: string,
    username: string,  
    password: string
}) ->
{
    assetID: string,
    changeAddr: string,
}
```

### パラメータ

* `name`これは、アセットの人間が読みやすい名前です。必ずしも一意ではない。
* `symbol`iss は、アセットのショートランドシンボルです。0から4文字の間で。必ずしも一意ではない。省略可能。
* `denomination`このアセットの残高がユーザーインターフェースでどのように表示されるかを決定します。デノミネーションが0の場合、このアセットの100ユニットが100として表示されます。デノミネーションが2の場合、このアセットの100ユニットは.100などと表示されます。
* X-Chain上で取引を行うには、AVAXで支払われたトランザクション手数料が必要です。そして`username`、手数料を支払ったユーザーを`password`表します。
* 内に含まれる各要素は、ジェネシスでアセットの`amount`単位を`address`保持する指定を`initialHolders`します。
* `from`は、この操作に使用するアドレスです。省略した場合、必要に応じてあなたのアドレスを使用します。
* `changeAddr`変更があった場合は、アドレス省略した場合、変更はユーザーがコントロールするアドレスのひとつに送信されます。

### レスポンス

* `assetID`は、新しいアセットのID。
* `changeAddr`その結果、変更が送信されたアドレスとなります。

さて、アセットを作成する。`address`そのため、新たにミントされたアセットをすべてコントロールし、後でこのチュートリアルの送信が可能になります。

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.createFixedCapAsset",
    "params" :{
        "name": "ISA Shares",
        "symbol":"ISAS",
        "denomination": 0,
        "initialHolders": [
            {
                "address": "X-avax10pvk9anjqrjfv2xudkdptza654695uwc8ecyg5",
                "amount": 10000000
            }
        ],
        "from":["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

レスポンスにはアセットIDが含まれています。これは、このトランザクションのIDです:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "assetID":"keMuoTQSGjqZbNVTCcbrwuNNNv9eEEZWBaRY3TapcgjkoZmQ1",
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

## アセットを取引する

### バランスを確認する

アセット（株式）の10,000,000台がすべて、我々が指定したアドレスによってコントロールされます`initialHolders`。

これを確認するため、以下のように呼び出します[`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance)。

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-avax10pvk9anjqrjfv2xudkdptza654695uwc8ecyg5",
        "assetID":"keMuoTQSGjqZbNVTCcbrwuNNNv9eEEZWBaRY3TapcgjkoZmQ1"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

この対応により、我々のアセット作成が成功したことを確認し、予期されるアドレスは、10,000,000株の株式すべてが保持されていることを確認します。

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "balance":10000000
    }
}
```

### アセットを送信する

さて、呼び出しで100株の株式を送りましょう[`avm.send`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-send)。

株式を送信するためには、共有が送信されたユーザーをコントロールする必要があります。したがって、今回は記入`username`し`password`

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.send",
    "params" :{
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE",
        "assetID" :"keMuoTQSGjqZbNVTCcbrwuNNNv9eEEZWBaRY3TapcgjkoZmQ1",
        "amount"  :100,
        "to"      :"X-avax1t8sl0knfzly3t3sherctxwezy533ega3sxww2k"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

### トランザクションステータスを確認する

上記のコールからのレスポンスは、次のようになります。

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"2EAgR1YbsaJrwFiU4DpwjUfTLkt97WrjQYYNQny13AheewnxSR",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

`txID`は、我々がネットワークに送信した`send`トランザクションのIDです。

2秒～2秒後に、トランザクションが確定される必要があります。トランザクションのステータスを見ることができます[`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus)：

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getTxStatus",
    "params" :{
        "txID":"2EAgR1YbsaJrwFiU4DpwjUfTLkt97WrjQYYNQny13AheewnxSR"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

レスポンスは次のようになります：

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "status":"Accepted"
    }
}
```

また、ネットワークがまだファイナリズムが`status`行われていないかどう`Pending`かもご覧かもしれません。

次に、アドレスが残っているかを確認しましょう`to`：

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-avax1t8sl0knfzly3t3sherctxwezy533ega3sxww2k",
        "assetID":"keMuoTQSGjqZbNVTCcbrwuNNNv9eEEZWBaRY3TapcgjkoZmQ1"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

応答は、次のようになります：

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "balance":100
    }
}
```

## ラッピングアップ

このチュートリアルでは、以下のようにします：

* 固定資本アセットを作成`createFixedCapAsset`するために呼び出されました
* アドレス残高を確認`getBalance`する
* 我々のアセットの数量を移転する`send`よう呼び出されました

