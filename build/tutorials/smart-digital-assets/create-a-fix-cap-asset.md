# Fixed-Capアセットの作成

## JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-Java

このチュートリアルでは、Avalancheがどのように固定キャップの真菌可能な資産を作成および取引することができます。アセットの初期化時にアセットの特定の量が作成され、これ以上作成されません。

10MBの株式を持つ所得分配契約\(ISA\)があり、これ以上株式が作成されないとします。JavaScriptのJavaScriptを有効にして、JavaScriptを有効にします。

## JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-Java

[Avalanche Node](../nodes-and-staking/run-avalanche-node.md)の実行を完了しました。[Avalancheの建築](../../../learn/platform-overview/)に精通しています。

## Asset の作成

X[-Chain](../../../learn/platform-overview/#exchange-chain-x-chain)にアセットが存在するので、アセットを作成するために、`avm.createFixedCapAsset`を[X-Chainの](../../avalanchego-apis/exchange-chain-x-chain-api.md)APIメソッドで呼び出します。

このメソッドの署名は次のとおりです。

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

### Parameters-Parameters-JP-JP-J

* `name` はアセットの人間が読みやすい名前です。必ずしも一意なわけではありません。
* `symbol` は、アセットのショートランドシンボルです。0-4文字の間で、JavaScriptを有効にします。必ずしも一意なわけではありません。JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-Java
* `denomination` は、このアセットの残高をユーザーインターフェイスによってどのように表示するかを決定します。デノニーが0の場合、この資産の100単位は100で表示されます。デノニーが1の場合、この資産の100単位は10.0で表示されます。2の場合、この資産の100単位は.100などで表示されます。
* X-Chainでトランザクションを実行するには、AVAXで支払うトランザクション手数料が`必要```です。
* `initialHolders`の各要素は`、アドレス`がジェネシスでアセットの`金額`単位を保持することを指定します。
* `For` example, the component is any use-parallely.JavaScript-JP-JP-
* `changeAddr` は、変更が送信されるアドレスです。JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-Java

### JPRESSENTS

* `assetID`は、新しいアセットのIDです。
* `changeAddr` は、変更が送信されたアドレスです。

資産の作成にあたって`アドレス`をコントロールしたアドレスに置き換えて、このチュートリアルでは、新しく作成されたアセットをすべて制御し、後で送信できるようにします。

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

レスポンスにはアセットのIDが含まれています。これはこのトランザクションのIDでもあります。

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

## 資産の取引

### バランスを確認する

10,000,000 単位は、`initialHolders` で指定したアドレスによって管理されます。

これを確認するには、[`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance) を呼び出します:

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

この応答により、当社の資産作成が成功し、予想されるアドレスが10,000,000株すべてを保有していることを確認します。

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

さて、[`avm.send`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-send)を呼び出して100株を送りましょう。

シェアを送信するには、シェアを送信するユーザーを制御する必要があります。したがって、今回は`ユーザー名`とパスワードを入力する必要があります`。`

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

上記の呼び出しからのレスポンスは次のようになります:

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

`txID`は、私たちがネットワークに送信した`送信`トランザクションのIDです。

2-2 秒後、トランザクションは確定する必要があります。[`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus) でトランザクションのステータスを確認できます:

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

レスポンスは次のようになります:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "status":"Accepted"
    }
}
```

また、ネットワークがまだそれを確定していない場合、`ステータス`が`保留中`であることがわかります。

では、`to` addressの残高を確認しましょう:

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

レスポンスは次のようにしてください。

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "balance":100
    }
}
```

## JP-JP-

JavaScript-JP-JP-

* `createFixedCapAsset` と呼ばれる固定キャップアセットを作成します
* `getBalance`という名前でアドレス残高を確認します
* `SEND`と呼ばれる資産の量を転送します

