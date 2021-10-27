# NFTを作成する（パート1）

## はじめに

Avalancheでは、デジタル商品はトークンとして表されます。トークンの中には、別のトークンと交換可能であることを意味する**代替性**のあるものがあります。実世界の通貨は代替性があります。例えば、5ドル紙幣は、他の5ドル紙幣と同じものと扱われます。

Avalancheでは、非代替性トークン（NFT）もサポートしています。定義上、それぞれのNFTは独自のものであり、他のNFTと完全に交換可能なわけではありません。例えば、実世界でのアートの所有を表すNFTがあります。それぞれのNFTと同様それぞれのアートは独自のものです。NFTはデジタルの希少性を表わし、従来の代替性トークンよりもさらに大きな有用性を持っていことがわかるでしょう。

このチュートリアルでは、AvalancheGoのAPIを使用してNFTを作成して送信します。今後のチュートリアルでは、[AvalancheJS](../../tools/avalanchejs/)を使用してカスタムのNFTファミリーを作成し、より詳細にNFTを探っていきます。

## 要件

[Run an Avalanche Node1（Avalancheノードを実行する）](../nodes-and-staking/run-avalanche-node.md)を修了したので、[Avalancheのアーキテクチャ](../../../learn/platform-overview/)をよく理解されていると思います。このチュートリアルでは、[AvalancheのPostmanコレクション](https://github.com/ava-labs/avalanche-postman-collection)を使用して、API呼び出しができるようサポートします。

## NFTファミリーを作成する

それぞれのNFTは、名前とシンボルを持つ**ファミリー**に属します。各ファミリーは、**グループ**で構成されています。ファミリーを作成する際に、ファミリーの中のグループ数を指定します。X-Chain上にNFTが存在しています、そのため、NFTファミリーを作成するには、[X-Chain API](../../avalanchego-apis/exchange-chain-x-chain-api.md)のメソッドである[`avm.createNFTAsset`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createnftasset)を呼び出します。

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

* `name`は、人が読むことのできるNFTファミリーの名前です。必ずしも固有のものである必要はありません。0～128文字の間で指定します。
* `symbol`は、このNFTファミリーの省略表現であるシンボルです。0～4文字の間で指定します。必ずしも固有のものである必要はありません。省略しても構いません。
* `minterSets`はリストで、各要素は、`minters`のアドレスのうちの`threshold`が、ミントオペレーションに署名することで、より多くの資産を一緒にミントできるよう指定するリストです。
* X-Chain上でトランザクションを行うには、AVAXで支払われるトランザクション手数料が必要です。`username`と`password`は手数料を支払うユーザーを示します。
* `from`は、この操作に使用したいアドレスです。省略した場合は、必要に応じて自分のアドレスのいずれかを使用します。
* `changeAddr`は、変更があった場合の送信先アドレスです。省略したい場合は、任意のアドレスに変更を送信します。

### **レスポンス**

* `assetID`は、作成された新しい資産のIDです。
* `changeAddr`の結果には、変更があった場合の送付先が表示されます。

この例の後半では、NFTをミントし、minter set上の少なくとも1つのアドレスをユーザーが管理するアドレスと確実に置き換えます。

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

レスポンスは、次のようになります。

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

注意事項が2つあります。1つは、NFTファミリーを作成するのに加え、AvalancheGoの[`avm.createNFTAsset`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createnftasset)は、渡される`minterSets`のそれぞれのグループも作成するということです。例えば、`minterSets`が3つの要素を持つ場合、NFTファミリーは3つのグループをも持ちます。2つ目は、レスポンスで返される`assetID`に注意することです。これは、新しく作成されたNFTファミリーの`assetID`であり、NFTを発行するときに後で必要になります。

単一のアドレスではなく、より多くの資産単位をミントできるアドレス_セット_を指定するのか疑問に思われるかもしれません。理由は、次の通りです。

* **セキュリティ： **1つのアドレスのみがより多くの資産をミントできる場合には、そのアドレスの秘密鍵が失われた場合、これ以上の資産単位をミントすることができなくなります。同様に、1つのアドレスのみがより多くの資産をミントできる場合には、そのアドレスの所有者が一方的にミントすることを止めることができません。
* **柔軟性：**「アリスが一方的にこの資産のより多くの単位をミントできる、あるいは、ディネッシュ、エリン、ジェイミーのうち2人が一緒により多くの単位をミントできる。」というようなロジックをエンコードできるといった柔軟性があるとよいですね。

## NFT用にUTXOを取得する

NFT出力は、[`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance)あるいは[`avm.getAllBalances`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getallbalances)への呼び出しでは表示されません。自分のNFTを確認するには、[`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos)を呼び出し、uxtoを解析して、タイプIDを確認する必要があります。NFTミント出力は、16進数の`00 00 00 0a`(10進数では`10`)のタイプIDを持ち、NFTトランスファー出力は、16進数の`00 00 00 0b`(10進数では`11`)のタイプIDを持ちます。

### **メソッド**

* [`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos)

### **パラメータ**

* `addresses`は、UTXOを取得するアドレスです。

**レスポンス：**

* `numFetched`は、レスポンスにおけるUTXOの合計数です。
* `utxos`は、CB58エンコードされた文字列の配列です。
* `endIndex`このメソッドは、ページネーションをサポートしています。. `endIndex`は、最後のUTXOが返されたことを示します。

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

このレスポンスには、UTXOのリストが含まれています。

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

[`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos)は2UTXOを返します。最初のものを取得し、デコードして、[NFTミント出力](../../references/avm-transaction-serialization.md#nft-mint-output)であることを確認します。まず、[`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos)から返されるBase58Checkでエンコードされた文字列を16進法に変換します。次の[CB58](http://support.avalabs.org/en/articles/4587395-what-is-cb58)文字列：

```cpp
116VhGCxiSL4GrMPKHkk9Z92WCn2i4qk8qdN3gQkFz6FMEbHo82Lgg8nkMCPJcZgpVXZLQU6MfYuqRWfzHrojmcjKWbfwqzZoZZmvSjdD3KJFsW3PDs5oL3XpCHq4vkfFy3q1wxVY8qRc6VrTZaExfHKSQXX1KnC
```

次のように16進数で表現されます。

```cpp
00 00 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57 00 00 00 01 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57 00 00 00 0a 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 01 00 00 00 01 3c b7 d3 84 2e 8c ee 6a 0e bd 09 f1 fe 88 4f 68 61 e1 b2 9c
```

さて、[transaction serialization format(取引シリアライゼーションフォーマット）](../../references/avm-transaction-serialization.md)を参照することで、この16進数をUTXOの各コンポーネントに分解できます。

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

`TypeID`は、NFTミントアウトプットの正しいタイプIDである`00 00 00 0a`であることに注意してください。また、`GroupID`は`00 00 00 00`であることに注意してください。この`GroupID`は、`avm.createNFTAsset`に渡した`MinterSets`の数に基づいて作成されました

## 資産をミントする

今、このグループに属するNFTを作成することができるシングル`MinterSet`のためのNFTファミリーと1つのグループができました。それを行うために、[`avm.mintNFT`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-mintnft)を呼び出します。

### **メソッド**

* [`avm.mintNFT`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-mintnft)

### **パラメータ**

* `assetID`は、NFTファミリーのIDです。
* `payload`は、最大1024バイトの任意のCB58エンコードされたペイロードです。パート２（**まもなく公開**）では、NFTペイロードまわりのプロトコルの作成を行います。このチュートリアルでは、ペイロードは、「AVA Labs」の文字列です。
* `to`は、新しくミントされたNFTを受け取るアドレスです。`to`をユーザーが管理するアドレスと置き換えます。そうすることにより、新しくミントされたNFTのいくらかをあとで送信することができます。
* `username`は、このNFTをより多くミントする許可を与える鍵を持つユーザーである必要があります。つまり、上記で指定したミンターセットの一つに使用する_しきい値_鍵を管理します。
* `password`は、`username`の有効なパスワードです。

### **レスポンス**

* `txID`は、トランザクションIDです。
* `changeAddr`の結果には、変更があった場合の送付先が表示されます。

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

レスポンスには、トランザクションのIDが含まれています。

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

前のステップと同様に、[`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos)を呼び出し、UTXOを解析して、NFTがミントされたことを確認できます。これで、[NFTトランスファーアウトプット](../../references/avm-transaction-serialization.md#nft-transfer-output)があることを確認できます。

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

これにより、次が与えられます。

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

前のステップと同様に、CB58エンコードされたUTXOを16進法にデコードし、個々のコンポーネントに分解して、正しいUTXOとタイプがあることを確認します。

まず、[`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos)から返されるBase58Checkでエンコードされた文字列を16進法に変換します。次のCB58文字列：

```cpp
11Do4RK6FchGXeoycKujR7atm3tvBz3qc64uoipCc5J74Sj1U4orM6vbBGSES8hnjgjZava9oPgmnbHxh2mBKjeXdvAqTRtYMHEacrveSzKgk7F8h8xi8JB9CddoiX8nbjZMYt1keGo5Rvpjh8dGymDWwRbV1FdnG5uDiiyU8uidc3P24
```

次のように16進数で表現されます。

```cpp
00 00 7d 07 0d 1e fe a6 4e 45 09 05 c6 11 ee b1 cf 61 9f 21 22 eb 17 db aa ea 9a fe 2d ff 17 be 27 6b 00 00 00 01 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57 00 00 00 0b 00 00 00 00 00 00 00 08 41 56 41 20 4c 61 62 73 00 00 00 00 00 00 00 00 00 00 00 01 00 00 00 01 3c b7 d3 84 2e 8c ee 6a 0e bd 09 f1 fe 88 4f 68 61 e1 b2 9c
```

さて、16進数をUTXOの個々のコンポーネントに分解できます。

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

`TypeID`は、[NFTトランスファーアウトプット](../../references/avm-transaction-serialization.md#nft-transfer-output)の正しいタイプidである`00 00 00 0b`だということに注意してください。また、ペイロードが含まれていることに注意します。

## NFTを送信する

これで、誰にでもNFTを送信できるようになりました。これを行うには、AvalancheGoの[`avm.sendNFT`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-sendnft)APIメソッドを使用します。

**メソッド**

* [`avm.sendNFT`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-sendnft)

**パラメータ**

* `assetID`は、送信するNFTのIDです。
* `to`は、新しくミントされたNFTを受け取るアドレスです。
* `groupID`は、NFTを送るための送信元NFTグループです。
* `username`は、NFTを管理するユーザーです。
* `password`は、`username`の有効なパスワードです。

**レスポンス**

* `txID`は、トランザクションIDです。
* `changeAddr`の結果には、変更があった場合の送付先が表示されます。

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

このレスポンスにより、NFTトランスファーアウトプットが成功したことが確認できます。

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

NFTを送信したアドレスに[`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos)を呼び出し、CB58から16進数に変換した後返されたUTXOを分解し、UXTOが、16進数で`00 00 00 0b`の、10進数で`11`のタイプIDとあることを確認できます。

## まとめ

ブロックチェーン技術とトークノミクスは、デジタル資産を表現する革新的で新しい方法を表しています。非代替性トークンは、希少な資産をトークン化することを可能にします。このチュートリアルでは：

* `createNFTAsset`を使用して、非代替性資産ファミリーとグループを作りました。
* `mintNFT`を使用して、NFTの単位をグループにミントしました。
* を使用して、UTXOを一つのアドレスにフェッチしました`getUTXOs`。そして、CB58エンコードされたUTXOを16進数に変換し、個々のコンポーネントに分解しました。
* `sendNFT`を使って、NFTをアドレス間で転送しました。

このシリーズのパート2では、AvalancheJSを使用して、多数のグループに発行することによりNFTペイロードのプロトコルを作成するためにより深く学びます。

