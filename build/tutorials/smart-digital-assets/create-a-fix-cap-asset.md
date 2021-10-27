# 固定キャップ資産を作成する

## はじめに

このチュートリアルでは、Avalancheを使用して固定キャプされた代替性資産を作成、取引する方法を説明します。資産の初期化時に特定量の資産が作成され、それ以上は作成されません。

1000万の株式で所得分散協定（ISA）があり、これ以上株式が作成されなくなるとします。資産の1単位がISAの1株を表す資産を作成してみましょう。

## 要件

[Avalancheノードを実行する](../nodes-and-staking/run-avalanche-node.md)を修了しましたから、[Avalancheのアーキテクチャ](../../../learn/platform-overview/)をよく理解されていることと思います。

## 資産を作成する

資産は[X-Chain](../../../learn/platform-overview/#exchange-chain-x-chain)上に存在しています。ですから、資産を作成するため、[X-Chain API](../../avalanchego-apis/exchange-chain-x-chain-api.md)のメソッドである、`avm.createFixedCapAsset`を呼び出します。

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

* `name`は、人が解読できる資産の名前です。必ずしも固有のものである必要はありません。
* `symbol`は、資産の略称シンボルです。0～4文字の間で指定します。必ずしも固有のものである必要はありません。省略しても構いません。
* `denomination`は、この資産の残高がユーザーインターフェースでどのように表示されるかを決定します。デノミネーションが0の場合、この資産の100単位は100と表示されます。デノミネーションが1の場合、この資産の100単位は10.0と表示されます。デノミネーションが2の場合、この資産の100単位は.100などと表示されます。
* X-Chain上でトランザクションを行うには、AVAXで支払われるトランザクション手数料が必要です。`username`と`password`は、手数料を支払うユーザーを示します。
* `initialHolders`の各要素は、発生時に`address`が`amount`単位の資産を保有していることを示しています。
* `from`は、この操作に使用したいアドレスです。省略した場合は、必要に応じて自分のアドレスのいずれかを使用します。
* `changeAddr`は、変更があった場合の送信先アドレスです。省略した場合は、ユーザーが管理するいずれかのアドレスに送信されます。

### レスポンス

* `assetID` は、新しい資産のIDです。
* `changeAddr` の結果には、変更があった場合の送付先が表示されます。

さて、資産を作成しようとしています。`address`を自分が管理するアドレスに置き換えることを望まれるでしょう。置き換えると、新たにミントされたすべての資産を管理し、このチュートリアルの後半で送信できるようになります

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

レスポンスには、このトランザクションのIDでもある資産のIDが含まれています。

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

## 資産を取引する

### 残高を確認する

資産（株式）の10,000,000単位すべてが、`initialHolders`で指定したアドレスで管理されています。

これを検証するには、[`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance)を呼び出します。

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

このレスポンスで、資産が無事作成され、指定アドレスで10,000,000株すべてを保有していることを確認できます。

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "balance":10000000
    }
}
```

### 資産を送信する

さて、[`avm.send`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-send)を呼び出して100株を送りましょう。

株を送信するには、株の送信元のユーザーを管理していることを証明する必要があります。従って、今回、`username`と`password`に記入する必要があります。

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

`txID`は、ネットワークに送信した`send`トランザクションのIDです。

1～2秒で、トランザクションは終了します。トランザクションのステータスは、[`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus)で確認できます。

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

レスポンスは、次のようになります。

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "status":"Accepted"
    }
}
```

ネットワークがまだ終了していない場合、`status`は`Pending`であると表示されるかもしれません。

では、`to`アドレスの残高を確認しましょう。

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

レスポンスは、次のようになります。

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "balance":100
    }
}
```

## まとめ

このチュートリアルでは：

* 固定キャップア資産を作成するために`createFixedCapAsset`を呼び出しました。
* アドレスの残高を確認するために、`getBalance`を呼び出しました。
* 資産の一部を転送するために、`send`を呼び出しました。

