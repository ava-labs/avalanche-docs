# NFTを作成する（パート1）

## はじめに

Avalancheでは、デジタル商品はトークンとして表されます。一部のトークンはファンジブルであり、つまり1つのトークンは他のいかなるトークンに対しても互換性が****いずれかないことを意味します。たとえば、実世界の通貨はファンジブルです。1つの$ 5ノートは、他の5ノートと同じものと扱われます。

Avalancheは、非真菌トークン（NFTs）をサポートしています。定義上、各NFTはユニークであり、他のNFTには完全にやり取りできないものではありません。たとえば、実世界のアート作品の所有権を表すNFTが存在する可能性があります。それぞれのNFTと同様に、それぞれのアート作品はユニークです。NFTsは、デジタル希少性を表し、従来の真菌トークンよりも、さらに大きなユーティリティを持っていることが証明される可能性があります。

このチュートリアルでは、AvalancheGoのAPIを使用してNFTを作成、送信します。将来のチュートリアルでは、[AvalancheJS](../../tools/avalanchejs/)を使用してカスタムNFTファミリーを作成し、より詳細にNFTを探検します。

## 要件

完了した[Avalancheノードを実行](../nodes-and-staking/run-avalanche-node.md)し、Avalancheアーキテクチャに精通しています[。](../../../learn/platform-overview/)このチュートリアルでは、[AvalancheのPostmanコレクション](https://github.com/ava-labs/avalanche-postman-collection)を使用して、APIコールを実行する手助けします。

## NFTファミリーを作成する

それぞれのNFTは、名前とシンボルを持つ****家族に属します。各家族は、グループで構成されています****。家族が作成される際に、家族内のグループ数が指定されます。我々[の](../../avalanchego-apis/exchange-chain-x-chain-api.md)NFTは、X-Chain上に存在するので、我々が呼び出すNFTファミリーを作成する[`avm.createNFTAsset`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createnftasset)。

このメソッドの署名は、次のとおりです。

```cpp
avm.createNFTAsset({
    name: string,
    symbol: string,
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

### **メソッド**

* [`avm.createNFTAsset`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createnftasset)

**パラメータ**

* `name`これは、我々のNFTファミリーのための人間が読みやすい名前です。必ずしも一意ではない。0から128文字の間で。
* `symbol`このNFTファミリーのためのショートランドシンボルです。0から4文字の間で。必ずしも一意ではない。省略可能。
* `minterSets``minters`は、各要素が、中に含まれたアドレスのリスト`threshold`が、ミント操作に署名することにより、より多くのアセットをまとめて指定するリストを一覧で示します。
* X-Chain上で取引を行うには、AVAXで支払われたトランザクション手数料が必要です。そして`username`、手数料を支払ったユーザーを`password`表します。
* `from`は、この操作に使用するアドレスです。省略した場合、必要に応じてあなたのアドレスを使用します。
* `changeAddr`変更があった場合は、アドレス省略した場合、変更があなたのアドレスに送信されます。

### **レスポンス**

* `assetID`is is is 我々が作成した新しいアセットのIDです。
* `changeAddr`その結果、変更が送信されたアドレスとなります。

後でこの例では、NFTをミントするようになります。そのため、ミンターで設定された1つのアドレスを、ユーザーがコントロールするアドレスに置き換えるようにしてください。

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.createNFTAsset",
    "params" :{
        "name":"Family",
        "symbol":"FAM",
        "minterSets":[
            {
                "minters": [
                    "X-avax1ghstjukrtw8935lryqtnh643xe9a94u3tc75c7"
                ],
                "threshold": 1
            }
        ],
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
        "assetID":"2X1YV4jpGpqezvj2khQdj1yEiXU1dCwsJ7DmNhQRyZZ7j9oYBp",
        "changeAddr":"X-avax1ghstjukrtw8935lryqtnh643xe9a94u3tc75c7"
    }
}
```

[`avm.createNFTAsset`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createnftasset)注意すべき事柄：まず、NFTファミリーを作成するに加えて、AvalancheGoは、それぞれのグループを作成`minterSets`します。たとえば、3つの要素`minterSets`がある場合、NFTファミリーには3つのグループがあります。第二に、レスポンスで返された`assetID`ものに注意してください。`assetID`これは、新しく作成されたNFTファミリーです。そのため、後でNFTを発行する必要があります。

_単一のアドレスではなく、より多くのアセットをミントできる_アドレスセットを指定する理由をお疑問に思うかもしれません。ここに理由は次のような理由です：

* **セキュリティ：1つのアドレスだけがより多くのアセットを失い、そのアドレスに秘密鍵が紛失した**場合、これ以上のユニットのミントは発生できません。同様に、より多くのアセットを発行できるアドレスだけが、そのアドレスが希望する限り、一方的にマイトするのを止めることはありません。
* **柔軟性：「Alice**は、このアセットのより多くのユニット、Dinesh、Ellin、Jamieを2つで、同時により多くのミントできるようにすることができます。」などのロジックをエンコードできるのは素晴らしいことです。

## NFTのためのUTXOを取得する

NFT出力は、[`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance)または、への呼び出しに表示されない。[`avm.getAllBalances`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getallbalances)NFTを確認するには、呼び出し後にutxoを解析[`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos)して型IDを確認する必要があります。`10``11`NFTミントアウトプットは、16進数で、NFTトランスファーアウトプット`00 00 00 0a`は、16進数`00 00 00 0b`で、型idを持っています。

### **メソッド**

* [`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos)

### **パラメータ**

* `addresses`は、UTXOを取得するためのアドレスです。

**レスポンス：**

* `numFetched`応答中のUTXO数です。
* `utxos`CB58エンコードされた文字列の配列です。
* `endIndex`この方法は、ページネーションを`endIndex`サポートします。

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.getUTXOs",
    "params" :{
        "addresses":["X-avax1ghstjukrtw8935lryqtnh643xe9a94u3tc75c7"]
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

レスポンスには、UTXOのリストが含まれています：

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "numFetched": "2",
        "utxos": [
            "116VhGCxiSL4GrMPKHkk9Z92WCn2i4qk8qdN3gQkFz6FMEbHo82Lgg8nkMCPJcZgpVXZLQU6MfYuqRWfzHrojmcjKWbfwqzZoZZmvSjdD3KJFsW3PDs5oL3XpCHq4vkfFy3q1wxVY8qRc6VrTZaExfHKSQXX1KnC",
            "11cxRVipJgtuHy1ZJ6qM7moAf3GveBD9PjHeZMkhk7kjizdGUu5RxZqhViaWh8dJa9jT9sS62xy73FubMAxAy8b542v3k8frTnVitUagW9YhTMLmZ6nE48Z9qXB2V9HHzCuFH1xMvUEj33eNWv5wsP3JvmywkwkQW9WLM"
        ],
        "endIndex": {
            "address": "X-avax1ghstjukrtw8935lryqtnh643xe9a94u3tc75c7",
            "utxo": "2iyUVo8XautXpZwVfp5vhSh4ASWbo67zmHbtx7SUJg2Qa8BHtr"
        }
    }
}
```

[`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos)2 UTXOを返します。最初に取り上げて[、NFTミント出力](../../references/avm-transaction-serialization.md#nft-mint-output)であることを確認するようにデコードしましょう。まず、Base58Checkエンコードされた文字列を、in[`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos)から16進に変換します。以下の[CB58](http://support.avalabs.org/en/articles/4587395-what-is-cb58)文字列：

```cpp
116VhGCxiSL4GrMPKHkk9Z92WCn2i4qk8qdN3gQkFz6FMEbHo82Lgg8nkMCPJcZgpVXZLQU6MfYuqRWfzHrojmcjKWbfwqzZoZZmvSjdD3KJFsW3PDs5oL3XpCHq4vkfFy3q1wxVY8qRc6VrTZaExfHKSQXX1KnC
```

16進数で表現されます：

```cpp
00 00 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57 00 00 00 01 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57 00 00 00 0a 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 01 00 00 00 01 3c b7 d3 84 2e 8c ee 6a 0e bd 09 f1 fe 88 4f 68 61 e1 b2 9c
```

これで、[トランザクションシリアライズ形式](../../references/avm-transaction-serialization.md)を参照することにより、UTXOの個々のコンポーネントに六角を分解できます。

```cpp
NFT Mint Output

CodecID: 00 00
TXID: 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57
Output Index: 00 00 00 01
AssetID: 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57
TypeID: 00 00 00 0a
GroupID: 00 00 00 00
Locktime: 00 00 00 00 00 00 00 00
Threshold: 00 00 00 01
Address Count: 00 00 00 01
Addresses[0]: 3c b7 d3 84 2e 8c ee 6a 0e bd 09 f1 fe 88 4f 68 61 e1 b2 9c
```

`TypeID``00 00 00 0a`NFTミントアウトプットのための正しい型IDであることに注意してください。`GroupID`また、そのものであることに注意してください。`00 00 00 00``GroupID`これは、私が .. に通過`MinterSets`した数に基づいて作成されました。`avm.createNFTAsset`

## アセットをミントする

`MinterSet`現在、NFTファミリーと、このグループに属するNFTを作成できる単一のグループが誕生しました。そのためには、以下のように呼び出します[`avm.mintNFT`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-mintnft)。

### **メソッド**

* [`avm.mintNFT`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-mintnft)

### **パラメータ**

* `assetID`は、NFTファミリーのIDです。
* `payload`任意のCB58エンコードされたペイロードで、1024バイトまでです。パート2（すぐに**到達**）では、NFTペイロード周辺にプロトコルの作成を探検します。このチュートリアルでは、ペイロードは「AVA Labs」文字列です。
* `to`iss は、新しくミントされたNFTを受信するアドレスです。ユーザーコントロールされたアドレス`to`に置き換えることで、後で新しいミントされたNFTを送信できるようになります。
* `username`このNFTをより多くのミントする権限を与える鍵を保持するユーザーでなければなりません。つまり、上記で指定したミンターセットのいずれかで、少なくとも_閾値_キーをコントロールします。
* `password`isは`username`

### **レスポンス**

* `txID`トランザクションID
* `changeAddr`その結果、変更が送信されたアドレスとなります。

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.mintNFT",
    "params" :{
        "assetID":"2X1YV4jpGpqezvj2khQdj1yEiXU1dCwsJ7DmNhQRyZZ7j9oYBp",
        "payload":"2EWh72jYQvEJF9NLk",
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
        "txID":"x4fKx95KirTvqWCeiPZfnjB4xFdrTduymRKMouXTioXojdnUm",
        "changeAddr": "X-avax1a202a8pu5w4vnerwzp84j68yknm6lf47drfsdv"
    }
}
```

以前のステップと同様に、UTXOを呼び出し、解析[`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos)して[NFT](../../references/avm-transaction-serialization.md#nft-transfer-output)がミントになったことを確認することができます。

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.getUTXOs",
    "params" :{
        "addresses":["X-avax1a202a8pu5w4vnerwzp84j68yknm6lf47drfsdv"]
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

これにより以下のようなことが可能になります：

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "numFetched": "2",
        "utxos": [
            "11Do4RK6FchGXeoycKujR7atm3tvBz3qc64uoipCc5J74Sj1U4orM6vbBGSES8hnjgjZava9oPgmnbHxh2mBKjeXdvAqTRtYMHEacrveSzKgk7F8h8xi8JB9CddoiX8nbjZMYt1keGo5Rvpjh8dGymDWwRbV1FdnG5uDiiyU8uidc3P24",
            "11JL98R9yVoCaekrzP2PoCKJfCTin6vhTWU4h9TxqevEUnhiMo2j7F4DHxRpHq6BnFnHGAajhmiXgrdfUbbNd1izmdLVMwqe3UCTJWWLaJ6XUZ46R243T8NdhKXXJWC9GvcjFYMyiKRWvVnvFt7duzq8P8D53uhv1QfdQ9"
        ],
        "endIndex": {
            "address": "X-avax1a202a8pu5w4vnerwzp84j68yknm6lf47drfsdv",
            "utxo": "2qs3A1sBhVjFcXqRADJ7AorvoawVgMkNdgJi8eYNPABMKmdBYq"
        }
    },
    "id": 1
}
```

以前のステップと同様に、CB58でエンコードされたUTXOを16進数にデコードし、個々のコンポーネントに分解し、UTXOで正しいUTXOと型が存在することを確認することができます。

まず、Base58Checkエンコードされた文字列を、in[`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos)から16進に変換します。以下のCB58文字列：

```cpp
11Do4RK6FchGXeoycKujR7atm3tvBz3qc64uoipCc5J74Sj1U4orM6vbBGSES8hnjgjZava9oPgmnbHxh2mBKjeXdvAqTRtYMHEacrveSzKgk7F8h8xi8JB9CddoiX8nbjZMYt1keGo5Rvpjh8dGymDWwRbV1FdnG5uDiiyU8uidc3P24
```

16進数で表現されます：

```cpp
00 00 7d 07 0d 1e fe a6 4e 45 09 05 c6 11 ee b1 cf 61 9f 21 22 eb 17 db aa ea 9a fe 2d ff 17 be 27 6b 00 00 00 01 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57 00 00 00 0b 00 00 00 00 00 00 00 08 41 56 41 20 4c 61 62 73 00 00 00 00 00 00 00 00 00 00 00 01 00 00 00 01 3c b7 d3 84 2e 8c ee 6a 0e bd 09 f1 fe 88 4f 68 61 e1 b2 9c
```

これで、UTXOの個別のコンポーネントに六角を分解できます：

```cpp
NFT Mint Output

CodecID: 00 00
TXID: 7d 07 0d 1e fe a6 4e 45 09 05 c6 11 ee b1 cf 61 9f 21 22 eb 17 db aa ea 9a fe 2d ff 17 be 27 6b
Output Index: 00 00 00 01
AssetID: 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57
TypeID: 00 00 00 0b
GroupID: 00 00 00 00
Payload Length: 00 00 00 08
Payload: 41 56 41 20 4c 61 62 73
Locktime: 00 00 00 00 00 00 00 00
Threshold: 00 00 00 01
Address Count: 00 00 00 01
Addresses[0]: 3c b7 d3 84 2e 8c ee 6a 0e bd 09 f1 fe 88 4f 68 61 e1 b2 9c
```

`TypeID``00 00 00 0b`[NFT](../../references/avm-transaction-serialization.md#nft-transfer-output)トランスファーアウトプットのための正しい型idであることに注意してください。また、ペイロードが含まれていることにご留意ください。

## NFTを送信する

これで、NFTを誰にでも送信することができます。そのためには、AvalancheGoの[`avm.sendNFT`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-sendnft)APIメソッドを使用してください。

**メソッド**

* [`avm.sendNFT`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-sendnft)

**パラメータ**

* `assetID`これは、我々が送信するNFTのIDです。
* `to`iss は、新しくミントされたNFTを受信するアドレスです。
* `groupID`は、NFTを送信するNFTグループです。
* `username`は、NFTをコントロールするユーザです。
* `password`isは`username`

**レスポンス**

* `txID`トランザクションID
* `changeAddr`その結果、変更が送信されたアドレスとなります。

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.sendNFT",
    "params" :{
        "assetID" :"2X1YV4jpGpqezvj2khQdj1yEiXU1dCwsJ7DmNhQRyZZ7j9oYBp",
        "to"      :"X-avax1ghstjukrtw8935lryqtnh643xe9a94u3tc75c7",
        "groupID" : 0,
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

こうした対応により、我々のNFTトランスファーオペレーションが成功したことを確認します。

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID": "txtzxcrzPx1sn38HWKU9PB52EpbpXCegbdHNxPNAYd9ZvezJq",
        "changeAddr": "X-avax1a202a8pu5w4vnerwzp84j68yknm6lf47drfsdv"0
    }
}
```

[`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos)CB58から16進に変換した後、NFTに送付したUTXOを呼び出し、戻ったUTXOを分解し、16`11`進数`00 00 00 0b`で型idが存在することを確認できます。

## ラッピングアップ

ブロックチェーン技術とトークンノミクスは、デジタルアセットを表す急激な新しい方法です。非真菌トークンにより、希少のアセットがトークン化できるようになります。このチュートリアルでは、以下のようにします：

* 非真菌アセットファミリーとグループを作成するために使用`createNFTAsset`されます。
* NFTの単位をグループにミントするのに使用`mintNFT`されます。
* UTXOを、アドレスに取得するために使用`getUTXOs`されます。その後、UTXOを10進数に変換し、個々のコンポーネントに分解しました。
* アドレス間でNFTを転送するために使用`sendNFT`されます。

このシリーズパート2では、AvalancheJSを使用して、NFTペイロードのプロトコルを作成し、より詳細な詳細を説明します。

