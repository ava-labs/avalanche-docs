# 可変キャップ資産を作成する

## はじめに

このチュートリアルでは、可変キャップ、すなわち代替性資産の作成方法を説明します。資産の初期化時には、資産の単位は存在しません。しかし、より多くの単位の資産がミントされる可能性があります。資産の作成時には、より多くの単位をミントできるアドレスセットを指定します

なぜ単一のアドレスではなく、より多くの資産単位をミントできるアドレス_セット_を指定するのか疑問に思われるかもしれません。理由は、次の通りです。

* **セキュリティ：** 1つのアドレスのみがより多くの資産をミントできる場合には、そのアドレスの秘密鍵が失われた場合、これ以上の資産単位をミントすることができなくなります。同様に、1つのアドレスのみがより多くの資産をミントできる場合には、そのアドレスの所有者が一方的にミントすることを止めることができません。
* **柔軟性：**「アリスが一方的にこの資産のより多くの単位をミントできる、あるいは、ディネッシュ、エリン、ジェイミーのうち2人が一緒により多くの単位をミントできる。」というようなロジックをエンコードできるといった柔軟性があるとよいですね。

例えば、企業の株式に相当する資産を発行したいとします。最初株式は存在しませんが、後でより多くの株式を作成することができます。このような資産を作成しましょう。

## 要件

[Run an Avalanche Node（Avalancheノードを実行する）](../nodes-and-staking/run-avalanche-node.md)を修了しているので、[Avalancheのアーキテクチャ](../../../learn/platform-overview/)をよく理解されていると思います。

## 資産を作成する

資産は、X-Chain上に存在し、資産を作成するために、[X-Chain API](../../avalanchego-apis/exchange-chain-x-chain-api.md)のメソッドである[`avm.createVariableCapAsset`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createvariablecapasset)を呼び出します。

このメソッドの署名は、次の通りです。

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

* `name`は、人が読むことのできる資産の名前です。必ずしも固有のものである必要はありません。0～128文字の間で指定します。
* `symbol`は、この資産の省略表現であるシンボルです。0～4文字の間で指定します。必ずしも固有のものである必要はありません。省略しても構いません。
* `denomination`は、この資産の残高がどのようにユーザーインターフェースで表示されるかを決定します。デノミネーションが0の場合、この資産の100単位は100と表示されます。デノミネーションが1の場合、この資産の100単位は10.0と表示されます。デノミネーションが2の場合、この資産の100単位は.100などと表示されます。
* `minterSets`は、各要素を指定するリストです。これにより、`minters`のアドレスのうちの`threshold`が、ミントトランザクションに署名することで、一緒にその資産をより多くミントするよう指定できます。
* X-Chain上でトランザクションを行うには、AVAXで支払われるトランザクション手数料が必要です。`username`と`password`で手数料を支払うユーザーであることが示されます。
* `from`は、この操作に使用したいアドレスです。省略した場合は、必要に応じて自分のアドレスのいずれかを使用します。
* `changeAddr`は、変更が行われた場合に送信されるアドレスです。省略した場合は、ユーザーが管理するアドレスのいずれかに送信されます。

### レスポンス

* `assetID` は、新しい資産のIDです。
* 結果の`changeAddr`は、変更があった場合に送信されるアドレスです。

この例の後半では、より多くの株式をミントし、そして2番目のミンターセットの最低2アドレスをユーザーが管理するアドレスに確実に置き換えます。

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

レスポンスは、次のようになります。

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

## 資産をミントする

現在、0株が存在します。1000万株をミントしましょう。

### 署名のないトランザクションを作成する

株式をミントするのに、[`avm.mint`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-mint)を使用します。

* `amount`は、作成する株式の数です。
* `assetID`は、より多く作成する資産のIDです。
* `to`は、新しくミントされた株式を受け取るアドレスです。`to`をユーザーが管理するアドレスに置き換えます。そうすることで、新しくミントされた株式のいくらかをあとで送信することができます。
* `username`は、この資産をより多くミントする許可を与える鍵を持つユーザーである必要があります。つまり、上記で指定したミンターセットの一つに使用する_しきい値_鍵を管理します。

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

レスポンスには、トランザクションのIDが含まれています。

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

[`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus)を使用して、ネットワークに送られたトランザクションのステータスを確認することができます。

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

このことにより、次が与えられます。

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "status": "Accepted"
    },
    "id": 1
}
```

## 資産を取引する

### 残高を確認する

1000万株すべてが、`mint`で指定した`to`アドレスで管理されています。これを検証するには、[`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance)を使用します。

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

このレスポンスで、資産の作成が成功し、指定アドレスが10,000,000をすべて保有していることを確認できます。

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

[`avm.send`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-send)を用いて100株を別のアドレスに送信しましょう。そうするために：

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

`to`アドレスの残高を確認しましょう。

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

* `createVariableCapAsset`を使用して、株式を表す可変キャップ資産を作成しました。
* `mint`を使用して、より多くの資産の単位をミントしました。
* `getBalance`を使用して、アドレスの残高を確認しました。
* `send`を使用して、株式を転送しました。

