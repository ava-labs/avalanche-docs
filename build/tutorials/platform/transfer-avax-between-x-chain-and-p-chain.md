# AVAX-Chain-P-Chain-JP-JP-J

## JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-Java

AVAXトークンはX-Chainに存在し、P-Chainに、Primary Networkの検証時に株式として提供できるものであり、C-Chainには、スマートコントラクトやガスの支払いに使用できるものがあります。Avalancheはこれらのチェーン間のAVAXの移動をサポートし、将来的にはAvalancheはチェーン間のより一般的な原子スワップをサポートしていきます。このチュートリアルでは、X-ChainとP-Chainの間にAVAXトークンを送ります。

## JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-Java

[Getting Started](../nodes-and-staking/run-avalanche-node.md)を完了しました。[Avalancheの建築](../../../learn/platform-overview/)に精通しています。

AVAXを送信するには、AVAXが必要です!AVAXを購入することで、実際のAVAXを取得することができます。または[AVAX Test Faucet](https://faucet.avax-test.network)からtestnet AVAXを取得することができます。Avalancheで遊ぶための無料で簡単な方法です。

## AVAXをWebウォレットで転送する

AVAXをチェーン間で転送する最も簡単な方法は[、Avalanche Walletを](https://wallet.avax.network/)使用することです。AVAXにアクセスし、移動する非管理的で安全な方法です。

Avalanche Walletのソースコードは[こちらから](https://github.com/ava-labs/avalanche-wallet)ご覧いただけます。

### ステップ1 - Avalancheウォレットを開く

![投稿の画像](../../../.gitbook/assets/wallet-x2p-01-login.png)

[**Access Wallet**]を選択してウォレットを入力します。ウォレットをメインAvalancheネットワーク以外のネットワークに接続するには、[**Mainnet**]を選択して、接続するネットワークを選択します。

### ステップ2 - ウォレットにログインする

ウォレットにアクセスするには、プライベートキー、mnemonicキーフレーズ、キーストアファイル、またはLedger Nano S...

![投稿の画像](../../../.gitbook/assets/wallet-x2p-02-access.png)

ログインが成功すると、残高、資産ポートフォリオ、その他のさまざまな情報が表示されます。

### ステップ3 - クロスチェーンタブに移動します。

![投稿の画像](../../../.gitbook/assets/wallet-x2p-03-earn.png)

チェーン間でトークンを転送する機能は[**Cross Chain**]タブにあります。

### ステップ4 - 転送する金額を入力します。

**Source Chain**と**Destination Chain**の選択肢が表示されます。X-ChainとP-Chainを選択します。X と P の残高と、ソースからデスティネーションチェーンに転送する金額を入力するための入力フィールドが表示されます。

![投稿の画像](../../../.gitbook/assets/wallet-x2p-05-x-p.png)

X-ChainからP-Chainに転送する金額を入力します。

### ステップ5 - トランザクションの確認

![投稿の画像](../../../.gitbook/assets/wallet-x2p-06-confirm.png)

[**Confirm**]を押し、[**Transfer**] を押して転送を開始します。

### ステップ6-完了！

クロスチェーン転送は2つのステッププロセスです。最初にX-Chainから資金をエクスポートするトランザクションと、もう1つはP-Chainにインポートするトランザクションです。ウォレットは両方で行い、その進捗状況を表示します。

![投稿の画像](../../../.gitbook/assets/wallet-x2p-07-transfer.png)

それだけだ!AVAXをX-ChainからP-Chainに移行しました！これで、Avalancheネットワーク上でそれらを使用して検証または委任できます。

### P-ChainからX-Chainへの移行

AVAXをX-Chainに戻すには、逆方向に転送する必要があります。

**Source** and **Destination** ドロップダウン・メニューからそれらを選択して、ソースとデスティネーション・チェーンを切り替えます。残りのプロセスは同じです: 金額を入力し、確認し、転送します。

## APIコールによるX-ChainからP-Chainへの移行

Avalancheネットワーク上でアプリケーションを構築する場合は、より広範な機能の一部として、プログラム的に転送を行うことができます。AvalancheGo ノードで適切な API を呼び出すことで、その方法を学びます。チュートリアルでは、AvalancheGoノード、X-Chain上のAVAXトークン、およびノードのキーストアに[作成](../../avalanchego-apis/keystore-api.md#keystorecreateuser)および保存されたユーザー資格情報にアクセスできることを前提としています。

以下のAPIコールでは、ノードがローカル \(つまり`127.0.0.1`\でリスニング)を実行していると仮定しています。ノードはメインネットワーク、テストネットワーク、またはローカルネットワークに接続できます。JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-Javaノードはローカルである必要はありません。他の場所でホストされているノードへの呼び出しをすることができます。

Avalanche Walletを使用してAVAXを転送する際に気づいたかもしれませんが、クロスチェーン転送は2つのトランザクション操作です。

* AVAX を X-Chain からエクスポート
* AVAX を P-Chain にインポートします。

### ステップ1 - X-ChainからAVAXをエクスポートする

AVAXをエクスポートするには、X-Chainの[`avm.exportAVAX`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-exportavax)メソッドを呼び出します。

あなたの呼び出しは次のようになります:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.exportAVAX",
    "params" :{
        "to":"P-avax1wkmfja9ve3lt3n9ye4qp3l3gj9k2mz7ep45j7q",
        "destinationChain": "P",
        "amount": 5000000,
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

where `to`はユーザーコントロールP-Chainアドレス、`changeAddr`は変更を送信するアドレスです。`changeAddr` ball-[JP](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createaddress)-JP

注: 輸出とインポート両方の操作のトランザクション手数料を支払うことに注意してください。この例では、トランザクション手数料が`.001` AVAX であると仮定します。上記のエクスポートでは、実際に`.006` AVAX を消費します。`.005` は P-Chain に行き、`.001` はトランザクション手数料として焼き付けられます。

送金する金額が取引手数料を超えることを確認してください。そうでなければ、P-ChainでAVAXをインポートすると、トランザクション手数料が消費され、P-ChainではAVAXが_少なく_なります。

レスポンスは次のようになります:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "MqEaeWc4rfkw9fhRMuMTN7KUTNpFmh9Fd7KSre1ZqTsTQG73h",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
    },
    "id": 1
}
```

[`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus)を呼び出すことでこのトランザクションが受け付けられたことを確認できます。

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "avm.getTxStatus",
    "params":{
        "txID":"MqEaeWc4rfkw9fhRMuMTN7KUTNpFmh9Fd7KSre1ZqTsTQG73h"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

これは、トランザクションが受け入れられていることを示しています。

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "status": "Accepted"
    },
    "id": 1
}
```

[`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance) を呼び出すこともできます。AVAX がユーザーが保持するアドレスから差し引かれているかどうかを確認します。

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-ADDRESSGOESHERE",
        "assetID":"AVAX"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

差し引かれている金額は、エクスポート済みの金額 \(`.005` AVAX \) +トランザクション手数料です。ユーザーが複数のX-Chainアドレスを制御する場合、AVAXはそれらの組み合わせから送信された可能性があります。

### ステップ2 - AVAXをP-Chainにインポートする

JPJ-JP-JPP-Chainの[`platform.importAVAX`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-importavax)メソッドを呼び出して、転送を完了する必要があります。

あなたの呼び出しは次のようになります:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.importAVAX",
    "params": {
        "to":"P-avax1wkmfja9ve3lt3n9ye4qp3l3gj9k2mz7ep45j7q",
        "sourceChain":"X",
        "changeAddr":"P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"myUsername",
        "password":"myPassword",
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

これによりトランザクションIDが返されます。

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2sxo3ySETZ4xzXqAtgsUvZ5pdkqG4SML4c7Z7NoKLZcp77YNXC",
        "changeAddr":"P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

トランザクションが受け付けられたことを確認できます:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getTxStatus",
    "params" :{
        "txID":"2sxo3ySETZ4xzXqAtgsUvZ5pdkqG4SML4c7Z7NoKLZcp77YNXC"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

`Committed` する必要があります。つまり、転送が完了します。また、アドレス残高を確認することもできます:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getBalance",
    "params":{
        "address":"P-avax1wkmfja9ve3lt3n9ye4qp3l3gj9k2mz7ep45j7q"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

レスポンスは次のようになります:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "balance": "4000000",
        "utxoIDs": [
            {
                "txID": "2sxo3ySETZ4xzXqAtgsUvZ5pdkqG4SML4c7Z7NoKLZcp77YNXC",
                "outputIndex": 0
            }
        ]
    },
    "id": 1
}
```

JavaScriptのJavaScriptはJavaScriptを有効にします。JavaScriptはJavaScriptを有効にします。JavaScriptはJavaScriptを有効にします。JavaScriptはJavaScriptを有効にします。JavaScriptを有効にします。JavaScriptはJavaScriptを有効にします。JavaScriptを有効にし`ます```。JavaScriptを有効にして、JavaScriptを有効に活用してJavaScriptを有効にします。JavaScripこれで、P-Chainアドレスが保持するAVAXを使用して、プライマリネットワークを検証するために、株式を取得できます。

## P-ChainからX-Chainへのプログラムで移行

さて、AVAXをP-ChainからX-Chainに移動しましょう。

これも2つのトランザクション操作です:

* P-Chainからのエクスポート
* X-Chainへのインポート

### ステップ1 - P-ChainからAVAXをエクスポートする

これを行うには、[`platform.exportAVAX`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-exportavax) を呼び出します:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.exportAVAX",
    "params": {
        "to":"X-avax1fjn5rffqvny7uk3tjegjs6snwjs3hhgcpcxfax",
        "amount":3000000,
        "changeAddr":"P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript`-`JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-Java

これによりトランザクションIDが返り、トランザクションが[`platform.getTxStatus`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-gettxstatus)への別の呼び出しでコミットされたかどうかを確認できます。繰り返しますが、送金する金額が取引手数料を超えることを確認してください。

### ステップ2 - AVAXをX-Chainにインポートする

P-ChainからX-Chainへの移行を終了するには、[`avm.importAVAX`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-importavax)を呼び出します:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.importAVAX",
    "params" :{
        "to":"X-avax1fjn5rffqvny7uk3tjegjs6snwjs3hhgcpcxfax",
        "sourceChain":"P",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

`to` は、[`platform.exportAVAX`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-exportavax) への呼び出しで指定された同じアドレスです。

[`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance) を呼び出して、資金が受け取ったことを確認できます。残高は、取引手数料を差し引いた`.003` AVAX 増加するはずです。

## JP-JP-

それでいい！Avalanche Walletを使用し、Avalancheノードで適切なAPIコールを呼び出すことで、X-ChainとP-Chainの間でAVAXを前後に交換できます。

P-Chainのトークンを使用して、Primary Networkの[バリデータとしてノードを追加](../nodes-and-staking/add-a-validator.md)できます。

