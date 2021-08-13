# NFT \(Part 1\)を作成します。

## JavaScript-JavaScript-JavaScript-Java

Avalancheでは、デジタル商品はトークンとして表現されています。一部のトークンには**真剣な**ものがあります。つまり、1つのトークンが他の1つのトークンに対して交換可能であることを意味します。例えば、現実世界の通貨は真剣です。1 $5 ノートは他の $5 ノートと同じ扱いです。

Avalanche はまた、非真菌トークン \(NFTs\)もサポートしています。定義上、各NFTは一意であり、他のNFTに対して完全に交換可能ではありません。例えば、NFTは現実世界の芸術作品の所有権を表すNFTがあるかもしれません。NFTはデジタル不足を表現し、従来の真菌性トークンよりもさらに高いユーティリティを持っていることが証明されるかもしれません。

このチュートリアルでは、AvalancheGoのAPIを使ってNFTを作成して送信します。今後のチュートリアルでは、[AvalancheJS](../../tools/avalanchejs/)を使用してカスタムNFTファミリーを作成し、より詳細にNFTを探ります。

## JavaScript-JavaScript-JavaScript-Java

[Avalanche Node](../nodes-and-staking/run-avalanche-node.md)の実行を完了しました。[Avalancheの建築](../../../learn/platform-overview/)に精通しています。このチュートリアルでは[、AvalancheのPostmanコレクション](https://github.com/ava-labs/avalanche-postman-collection)を使用してAPIコールを作成します。

## NFTファミリーの作成

NFTは各ファミリーに属し**、**名前とシンボルを持つ。各家族は**グループ**で構成されています。家族のグループ数は、家族が作成されたときに指定されます。NFTはX-Chain上に存在するので、NFTファミリーを作成するために、[`avm.createNFTAsset`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createnftasset)を呼び出します。これは[X-ChainのAPI](../../avalanchego-apis/exchange-chain-x-chain-api.md)のメソッドです。

このメソッドの署名は次のとおりです。

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

### **JavaScript-JP-JP-**

* [`avm.createNFTAsset`-JP](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createnftasset)

**Parameters-Parameters-JP-JP-J**

* `name` はNFTファミリーの人間が読みやすい名前です。必ずしも一意なわけではありません。0-128文字の間です。
* `symbol` は、この NFT ファミリーの短縮記号です。0-4文字の間で、JavaScriptを有効にします。必ずしも一意なわけではありません。JavaScript-JavaScript-JavaScript-Java
* `minterSets`は、各要素が`minting`操作に署名することにより、mintingのアドレスがより多く`の`アセットをmintingできることを指定するリストです。
* X-Chainでトランザクションを実行するには、AVAXで支払うトランザクション手数料が`必要```です。
* `For` example, the component is any use-parallely.JavaScript-JP-JP-
* `changeAddr` は、変更が送信されるアドレスです。省略した場合、変更はあなたのアドレスに送信されます。

### **JPRESSENTS**

* `assetID`は、作成した新しいアセットのIDです。
* `changeAddr` は、変更が送信されたアドレスです。

この例では、NFT をミントします。そのため、minter 設定の 1 つのアドレスをユーザーがコントロールするアドレスに置き換えてください。

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

レスポンスは次のようになります:

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

注意すべき点はいくつかあります: まず、NFTファミリーの作成に加えて、AvalancheGoの[`avm.createNFTAsset`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createnftasset)は渡される`minterSets`の各グループも作成します。例えば、`minterSets` に 3 つの要素がある場合、NFT ファミリーには 3 つのグループがあります。2つ目は、レスポンスで返される`assetID`に注意してください。これは新しく作成したNFTファミリーの`assetID`であり、後でNFTを発行する必要があります。

なぜ、単一のアドレスではなく、アセットの単位をミントできるアドレスを指定するの_か_疑問に思うかもしれません。JavaScript-JP-JP-

* **セキュリティ:** 一つのアドレスだけがアセットの多くをミントできるようにし、そのアドレスのための秘密鍵が失われた場合、これ以上のユニットをミントすることはできません。同様に、1つのアドレスだけが資産の多くをmintできる場合、そのアドレスの保持者を望むだけの限り一方的にmintingから停止するものはありません。
* **柔軟性:** 「Aliceはこの資産の単位を単位でmintすることができます。Dinesh、Ellin、Jamieは2つのmint moreをmintすることができます。」というようなロジックをエンコードできるのは嬉しいことです。

## NFT用UTXOを取得する

NFT 出力は [`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance)s や [`avm.getAllBalances`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getallbalances) への呼び出しには表示されません。NFTを確認するには、[`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos)を呼び出してから、utxoを解析して型IDを確認する必要があります。NFT Mint Outputsは`00 00 00 00a`の型idを16進数 `\(10`進数で10進数で16進数で`00 00 0b`の型idを11進数で`16`進数で16進数で11進数で16進数で11進数で000 00 000bの型idを16進数で16進数で11進数で11進数で16進数で16進数で11進数で00進数で00

### **JavaScript-JP-JP-**

* [`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos)

### **Parameters-Parameters-JP-JP-J**

* `addresses` は UTXO を取得するアドレスです。

**JP-JP-**

* `numFetched` は応答中の UTXO の総数です。
* `utxos`はCB58エンコードされた文字列の配列です。
* `endIndex` このメソッドはページネーションをサポートしています。`endIndex`は、最後に返されたUTXOを表します。

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

レスポンスにはUTXOsのリストが含まれています。

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

[`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos) は 2 UTXO を返します。まず最初にそれを取り、それをデコードして[、それがNFT Mint Outputで](../../references/avm-transaction-serialization.md#nft-mint-output)あることを確認しましょう。まず、[`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos)から16進に戻り、Base58Checkエンコードされた文字列を変換します。[CB58](http://support.avalabs.org/en/articles/4587395-what-is-cb58)文字列：

```cpp
116VhGCxiSL4GrMPKHkk9Z92WCn2i4qk8qdN3gQkFz6FMEbHo82Lgg8nkMCPJcZgpVXZLQU6MfYuqRWfzHrojmcjKWbfwqzZoZZmvSjdD3KJFsW3PDs5oL3XpCHq4vkfFy3q1wxVY8qRc6VrTZaExfHKSQXX1KnC
```

JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScri

```cpp
00 00 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57 00 00 00 01 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57 00 00 00 0a 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 01 00 00 00 01 3c b7 d3 84 2e 8c ee 6a 0e bd 09 f1 fe 88 4f 68 61 e1 b2 9c
```

これで、[トランザクションシリアライズ形式](../../references/avm-transaction-serialization.md)を参照することで、HXEをUTXOの個々のコンポーネントに分解できます。

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

`TypeID`は`00 00 0aで`あり、NFT Mint Outputの正しい型IDであることに注意してください。`GroupID`は`00 00 00です。`この`GroupID`は、`avm.createNFTAsset`に渡した`MinterSet`の数に基づいて作成されました。

## 資産のミント

NFTファミリーと`MinterSet`のグループがあれば、このグループに属するNFTを作成できます。これを行うには、[`avm.mintNFT`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-mintnft)を呼び出します:

### **JavaScript-JP-JP-**

* [`avm.mintNFT`-JP](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-mintnft)

### **Parameters-Parameters-JP-JP-J**

* `assetID`はNFTファミリーのIDです。
* `payload` は任意の CB58 エンコードされたペイロードで、最大 1024 バイトです。Part 2 \(**COMING SOON**\)では、NFT ペイロード周辺のプロトコルを作成する方法を探ります。このチュートリアルでは、ペイロードは "AVA Labs" という文字列です。
* `to` は、新しく採掘されたNFTを受け取るアドレスです。ユーザーコントロールのアドレスに置き換えます。これにより、新しく作成さ`れ`たNFTの一部を送信できます。
* `username` は、このNFTの詳細をミントする権限を与えるキーを保持するユーザーでなければなりません。つまり、上記の1つのミンターセットのいずれかに対して少なくとも_閾値_キーを制御します。
* `password` は`ユーザー名`の有効なパスワードです。

### **JPRESSENTS**

* `txID`はトランザクションIDです。
* `changeAddr` は、変更が送信されたアドレスです。

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

レスポンスにはトランザクションのIDが含まれています。

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

前の手順と同様に、NFTが [`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos) を呼び出して、UTXO を解析して [NFT Transfer Output](../../references/avm-transaction-serialization.md#nft-transfer-output) が NFT 出力されていることを確認できます。

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

これは次のようにする必要があります。

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

前の手順と同様に、CB58エンコードされたUTXOを16進数にデコードしてから、それを個々のコンポーネントに分解して、正しいUTXOと型を確認できます。

まず、[`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos)から16進に戻り、Base58Checkエンコードされた文字列を変換します。CB58文字列：

```cpp
11Do4RK6FchGXeoycKujR7atm3tvBz3qc64uoipCc5J74Sj1U4orM6vbBGSES8hnjgjZava9oPgmnbHxh2mBKjeXdvAqTRtYMHEacrveSzKgk7F8h8xi8JB9CddoiX8nbjZMYt1keGo5Rvpjh8dGymDWwRbV1FdnG5uDiiyU8uidc3P24
```

JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScri

```cpp
00 00 7d 07 0d 1e fe a6 4e 45 09 05 c6 11 ee b1 cf 61 9f 21 22 eb 17 db aa ea 9a fe 2d ff 17 be 27 6b 00 00 00 01 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57 00 00 00 0b 00 00 00 00 00 00 00 08 41 56 41 20 4c 61 62 73 00 00 00 00 00 00 00 00 00 00 00 01 00 00 00 01 3c b7 d3 84 2e 8c ee 6a 0e bd 09 f1 fe 88 4f 68 61 e1 b2 9c
```

これで、HEXをUTXOの個々のコンポーネントに分解できます。

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

`TypeID`は`00 00 0b`であり、[NFT Transfer Output](../../references/avm-transaction-serialization.md#nft-transfer-output)の正しいタイプidであることに注意してください。また、ペイロードが含まれています。

## NFTを送信する

NFTを誰にでも送信できます。これを行うには、AvalancheGoの[`avm.sendNFT`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-sendnft) APIメソッドを使用します。

**JavaScript-JP-JP-**

* [`avm.sendNFT`-JP](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-sendnft)

**Parameters-Parameters-JP-JP-J**

* `assetID`は、私たちが送信しているNFTのIDです。
* `to` は、新しく採掘されたNFTを受け取るアドレスです。
* `groupID` は NFT グループで、NFT を送信することができます。
* `username` は NFT を制御するユーザーです。
* `password` は`ユーザー名`の有効なパスワードです。

**JPRESSENTS**

* `txID`はトランザクションIDです。
* `changeAddr` は、変更が送信されたアドレスです。

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

この応答により、NFT移転運用が成功したことを確認します。

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

[`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos)を呼び出して、NFTを返すUTXOを返すアドレスをCB58から16進数に変換した後、返されたUTXOを分解して、`11`進数でID `00 00 0b`を入力するUTXOが存在することを確認できます。

## JP-JP-

ブロックチェーン技術とトークンノミクスは、デジタル資産を表現する急激な新しい方法です。非真菌型トークンにより、希少な資産をトークン化できます。JavaScript-JP-JP-

* `createNFTAsset` を使用して、非真菌性アセットファミリーとグループを作成します。
* `mintNFT` を使用して、NFT の単位をグループにミントします。
* `getUTXOを`使って、UTXOをアドレスに取得します。その後、CB58エンコードされたUTXOを16進化に変換し、それを個々のコンポーネントに分解しました。
* `SendNFT` を使用して、NFT をアドレス間で転送します。

このシリーズのパート2では、AvalancheJSを使用してNFTペイロードのプロトコルを複数のグループに発行することにより、より詳しく説明します。

