# Variable-Cap Assetの作成

## JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScri

このチュートリアルでは、可変キャップの真菌可能なアセットの作成方法を説明します。アセットの単位は存在しませんが、アセットの単位をマイニングすることができます。アセットの作成では、どのアドレスがより多くのユニットをミントするか指定します。

なぜ、単一のアドレスではなく、アセットの単位をミントできるアドレスを指定するの_か_疑問に思うかもしれません。JavaScript-JP-JP-

* **セキュリティ:** 一つのアドレスだけがアセットの多くをミントできるようにし、そのアドレスのための秘密鍵が失われた場合、これ以上のユニットをミントすることはできません。同様に、1つのアドレスだけが資産の多くをmintできる場合、そのアドレスの保持者を望むだけの限り一方的にmintingから停止するものはありません。
* **柔軟性:** 「Aliceはこの資産の単位を単位でmintすることができます。Dinesh、Ellin、Jamieは2つのmint moreをmintすることができます。」というようなロジックをエンコードできるのは嬉しいことです。

企業の株式を代表する資産を発行したいとします。最初に株式は存在しないが、後でより多くの株式を作成することができます。そんな資産を作りましょう。

## JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScri

[Avalanche Node](../nodes-and-staking/run-avalanche-node.md)の実行を完了しました。[Avalancheの建築](../../../learn/platform-overview/)に精通しています。

## Asset の作成

X-Chainにアセットが存在するので、アセットを作成するために[`avm.createVariableCapAsset`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createvariablecapasset)を呼び出します。これは[X-ChainのAPI](../../avalanchego-apis/exchange-chain-x-chain-api.md)のメソッドです。

このメソッドの署名は次のとおりです。

```cpp
avm.createVariableCapAsset({
    name: string,
    symbol: string,
    denomination: int,
    minterSets []{
        minters: []string,
        threshold: int
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

* `name` は、アセットの人間が読みやすい名前です。必ずしも一意なわけではありません。0-128文字の間です。
* `symbol` はこの資産の短縮記号です。0-4文字の間で、JavaScriptを有効にします。必ずしも一意なわけではありません。JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScri
* `denomination` は、このアセットの残高をユーザーインターフェイスによってどのように表示するかを決定します。デノニーが0の場合、この資産の100単位は100で表示されます。デノニーが1の場合、この資産の100単位は10.0で表示されます。2の場合、この資産の100単位は.100などで表示されます。
* `minterSets`は、各要素が`minting`トランザクションに署名することにより、mintingトランザクションに署名する`こと`により、より多くのアセットをmintingすることができますことを指定するリストです。
* X-Chainでトランザクションを実行するには、AVAXで支払うトランザクション手数料が`必要```です。
* `For` example, the component is any use-parallely.JavaScript-JP-JP-
* `changeAddr` は、変更が送信されるアドレスです。JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScri

### JPRESSENTS

* `assetID`は、新しいアセットのIDです。
* `changeAddr` は、変更が送信されたアドレスです。

この例では、より多くのシェアをミントします。だから、2番目のminter設定の2つのアドレスをユーザーコントロールしたアドレスに置き換えてください。

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.createVariableCapAsset",
    "params" :{
        "name":"Corp. Shares",
        "symbol":"CS",
        "minterSets":[
            {
                "minters": [
                    "X-avax1ghstjukrtw8935lryqtnh643xe9a94u3tc75c7"
                ],
                "threshold": 1
            },
            {
                "minters": [
                    "X-avax1k4nr26c80jaquzm9369j5a4shmwcjn0vmemcjz",
                    "X-avax1yell3e4nln0m39cfpdhgqprsd87jkh4qnakklx",
                    "X-avax1ztkzsrjnkn0cek5ryvhqswdtcg23nhge3nnr5e"
                ],
                "threshold": 2
            }
        ],
        "from":["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

レスポンスは次のようになります:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "assetID":"i1EqsthjiFTxunrj8WD2xFSrQ5p2siEKQacmCCB5qBFVqfSL2",
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

## 資産のミント

現在、0株が存在します。10M株をミントしましょう。

### Unsigned Transactionsの作成

[`avm.mint`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-mint)を使ってシェアをミントします。

* `amount` は、作成される株式数です。
* `assetID`は、私たちが作成しているアセットのIDです。
* `to`は、新規発行済株式を取得する住所です。ユーザーコントロールのアドレスに置き換えます。これにより、新しく作成さ`れ`た株式の一部を送信できます。
* `username` は、このアセットの詳細をmintする権限を与えるキーを保持するユーザーでなければなりません。つまり、上記の1つのミンターセットのいずれかに対して少なくとも_閾値_キーを制御します。

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.mint",
    "params" :{
        "amount":10000000,
        "assetID":"i1EqsthjiFTxunrj8WD2xFSrQ5p2siEKQacmCCB5qBFVqfSL2",
        "to":"X-avax1a202a8pu5w4vnerwzp84j68yknm6lf47drfsdv",
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

レスポンスにはトランザクションのIDが含まれています。

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"E1gqPbkziu8AutqccRa9ioPWyEF3Vd7eMjDJ3UshjQPpLoREZ",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

[`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus)を使用して、ネットワークに送ったトランザクションのステータスを確認できます。

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.getTxStatus",
    "params" :{
        "txID":"E1gqPbkziu8AutqccRa9ioPWyEF3Vd7eMjDJ3UshjQPpLoREZ"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

これは次のようにする必要があります。

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "status": "Accepted"
    },
    "id": 1
}
```

## 資産の取引

### バランスを確認する

10Mの株式はすべて`mint`で指定した`to`アドレスによって管理されます。これを検証するには、[`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance) を使います:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-avax1a202a8pu5w4vnerwzp84j68yknm6lf47drfsdv",
        "assetID":"i1EqsthjiFTxunrj8WD2xFSrQ5p2siEKQacmCCB5qBFVqfSL2"
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

### Assetを送信する

[`avm.send`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-send)を使って100株のシェアを別のアドレスに送りましょう。--

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.send",
    "params" :{
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE",
        "assetID" :"i1EqsthjiFTxunrj8WD2xFSrQ5p2siEKQacmCCB5qBFVqfSL2",
        "amount"  :100,
        "to"      :"X-avax1qwnlpknmdkkl22rhmad0dcn80wfasp2y3yg3x0"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

To addressの残高を確認しましょ`う`:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-avax1qwnlpknmdkkl22rhmad0dcn80wfasp2y3yg3x0",
        "assetID":"i1EqsthjiFTxunrj8WD2xFSrQ5p2siEKQacmCCB5qBFVqfSL2"
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

* `createVariableCapAsset` を使用して、シェアを表す可変キャップアセットを作成します。
* `Mint`を使って、資産の単位をミントします。
* `getBalance` を使用してアドレス残高を確認します。
* `Send` を使用するシェアを転送します。

