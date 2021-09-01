# バリアブルキャップアセットを作成する

## はじめに

このチュートリアルでは、可変キャップで可変性のアセットを作成する方法を説明します。アセットが初期化された時点でアセットの単位は存在しませんが、より多くのアセットの単位がミントされる可能性があります。アセット作成上に、より多くのユニットをミントする可能性のあるアドレスセットを指定します。

_単一のアドレスではなく、より多くのアセットをミントできる_アドレスセットを指定する理由をお疑問に思うかもしれません。ここに理由は次のような理由です：

* **セキュリティ：1つのアドレスだけがより多くのアセットを失い、そのアドレスに秘密鍵が紛失した**場合、これ以上のユニットのミントは発生できません。同様に、より多くのアセットを発行できるアドレスだけが、そのアドレスが希望する限り、一方的にマイトするのを止めることはありません。
* **柔軟性：「Alice**は、このアセットのより多くのユニット、Dinesh、Ellin、Jamieを2つで、同時により多くのミントできるようにすることができます。」などのロジックをエンコードできるのは素晴らしいことです。

企業の株式を代表する資産を発行したいとしましょう。最初に株式は存在しませんが、より多くの株式が後で作成される可能性があります。こうしたアセットを作成しましょう。

## 要件

完了した[Avalancheノードを実行](../nodes-and-staking/run-avalanche-node.md)し、Avalancheアーキテクチャに精通しています[。](../../../learn/platform-overview/)

## アセットを作成する

[`avm.createVariableCapAsset`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createvariablecapasset)我々のアセットはX-Chain上に存在するため、我々が呼び出すアセットを作成するため、[X-ChainのAPI](../../avalanchego-apis/exchange-chain-x-chain-api.md)の方法です。

このメソッドの署名は、次のとおりです。

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

### パラメータ

* `name`これは、我々のアセットのための人間が読みやすい名前です。必ずしも一意ではない。0から128文字の間で。
* `symbol`iss は、このアセットのためのショートランドシンボル。0から4文字の間で。必ずしも一意ではない。省略可能。
* `denomination`このアセットの残高がユーザーインターフェースでどのように表示されるかを決定します。デノミネーションが0の場合、このアセットの100ユニットが100として表示されます。デノミネーションが2の場合、このアセットの100ユニットは.100などと表示されます。
* `minterSets``minters`は、各要素が、中に含まれたアドレスのリスト`threshold`が、ミントトランザクションに署名することにより、より多くのアセットをまとめて指定するリストを一覧で示します。
* X-Chain上で取引を行うには、AVAXで支払われたトランザクション手数料が必要です。そして`username`、手数料を支払ったユーザーを`password`表します。
* `from`は、この操作に使用するアドレスです。省略した場合、必要に応じてあなたのアドレスを使用します。
* `changeAddr`変更があった場合は、アドレス省略した場合、変更はユーザーがコントロールするアドレスのひとつに送信されます。

### レスポンス

* `assetID`は、新しいアセットのID。
* `changeAddr`その結果、変更が送信されたアドレスとなります。

後でこの例の例では、より多くの株式を獲得します。そのため、2番目のミンターで、少なくとも2つのアドレスを、あなたのユーザーコントロールされたアドレスと置き換えるようにしてください。

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

レスポンスは次のようになります：

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

## アセットをミントする

現在0株が存在します。100万株をミントしましょう。

### 未署名トランザクションを作成する

我々は株式をミントするために使用[`avm.mint`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-mint)します。

* `amount`は、作成される株式の数です。
* `assetID`これが、より多くのアセットのIDです。
* `to`isは、新たに発行された株式を受領するアドレスです。ユーザーコントロールされたアドレス`to`に置き換えることで、後で新しくミントされた株式を送付することができます。
* `username`より多くのこのアセットをミントする権限を与える鍵を保持するユーザーでなければなりません。つまり、上記で指定したミンターセットのいずれかで、少なくとも_閾値_キーをコントロールします。

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

レスポンスには、トランザクションのIDが含まれています：

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

以下の方法で、我々がネットワークに送信したトランザクションステータスが確認できます[`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus)。

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

これにより以下のようなことが可能になります：

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "status": "Accepted"
    },
    "id": 1
}
```

## アセットを取引する

### バランスを確認する

100万株はすべて、我々が指定した`to`アドレスによってコントロールされます。`mint`これを確認するため、以下のようにしてください[`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance)：

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

100株を別のアドレスに送りましょう[`avm.send`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-send)。そうするには、次のようにします：

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

アドレスの残高を確認しましょう`to`：

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

* 株式を表す可変資金アセットを作成`createVariableCapAsset`するために使用されます。
* より多くのアセットをミントする`mint`のに使用されます。
* アドレス残高を確認するために使用`getBalance`されます。
* 株式の移転`send`に使用します。

