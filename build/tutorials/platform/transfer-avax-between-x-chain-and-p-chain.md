# X-ChainとP-Chain間でAVAXを移動する

## はじめに

AVAXトークンは、X-Chain上に存在します。P-Chain上に、プライマリネットワークのバリデーションに際しステークとして提供できる、そして、スマートコントラクトで使用される、ガスの支払いができるC-Chain上に存在します。Avalancheは、これらのチェーン間でAVAXの移動をサポートします。そして将来的には、Avalancheは、チェーン間でより一般的なアミックスワップをサポートします。このチュートリアルでは、X-ChainとP-Chain間でAVAXトークンを送達します。

## 要件

[始める](../nodes-and-staking/run-avalanche-node.md)が完了し[まし](../../../learn/platform-overview/)た。

AVAXを送信するには、AVAXを用意する必要があります！取引所で購入することにより、実際の[AVAX](https://faucet.avax-test.network)を得ることができます。あるいはAVAXテストフォーセットからテストネットAVAXを取得することができます。これはAvalancheで遊ぶための無料で簡単な方法です。

## Webウォレットを使用してAVAXの移動

AVAXをチェーン間で転送する最も簡単な方法は[、Avalancheウォレット](https://wallet.avax.network/)を使用することです。Avalancheウォレットを使用することです。

Avalancheウォレットソースコードは[、ここから](https://github.com/ava-labs/avalanche-wallet)入手できます。

### ステップ1 - Avalancheウォレットを開く

![ポストのための画像](../../../.gitbook/assets/wallet-x2p-01-login.png)

**を選択し、ウォレットを入力**します。メインAvalanche以外のネットワークにウォレットを接続するには、**Mainnetを選択し、接続するネットワークを選択**します。

### ステップ2 - ウォレットにログインする

秘密鍵、mnemonic鍵フレーズ、キーストアファイルあるいはLedger Nano Sを使用してウォレットにアクセスすることができます。

![ポストのための画像](../../../.gitbook/assets/wallet-x2p-02-access.png)

ログインが成功した後、残高、アセットポートフォリオ、その他のさまざまな情報が表示されます。

### ステップ3 - クロスチェーンタブに移動します

![ポストのための画像](../../../.gitbook/assets/wallet-x2p-03-earn.png)

チェーン間でトークンを移動するための機能は、「**クロスチェーン」タブにあります**。

### ステップ4 - 転送する金額を入力します

**ソースチェーン**と**デスティネーションチェーンのための選択が表示されます**。X-ChainとP-Chainを選択します。XとPバランスが表示され、ソースからコピー先チェーンに転送する金額を入力するための入力フィールドが表示されます。

![ポストのための画像](../../../.gitbook/assets/wallet-x2p-05-x-p.png)

X-ChainからP-Chainに転送する金額を入力します。

### ステップ5 - トランザクションを確認する

![ポストのための画像](../../../.gitbook/assets/wallet-x2p-06-confirm.png)

**確認を押し、その******後Transfer

### ステップ6 - 完了！

クロスチェーンのトランスファーは、X-Chainから資金を輸出するためのトランザクションと、P-Chainにインポートする二つのステッププロセスです。ウォレットは両方を行い、その進捗を示しながらウォレットが進捗を示します。

![ポストのための画像](../../../.gitbook/assets/wallet-x2p-07-transfer.png)

それで終わりました！AVAXをX-ChainからP-Chainに移転しました！これでAvalancheネットワーク上で検証あるいは委任するために使用できます。

### P-ChainからX-Chainに移行する

AVAXをX-Chainに戻すには、逆方向での転送が必要です。

「ソース**とデスティネーション」**ドロップダウンメニューから選択して、**ソースと**デスティネーションチェーンをスワップします。残りのプロセスのプロセスは同じです。金額を入力し、確認し、振り込むことができます。

## APIコールでX-ChainからP-Chainに移行する

Avalancheネットワーク上でアプリケーションを構築する場合、より広範な機能の一部としてプログラムでトランスファーを起こすことをお勧めします。AvalancheGoノード上で適切なAPIを呼び出すことで可能です。チュートリアルの残りのチュートリアルの場合、AvalancheGoノード、X-Chain上のAVAXトークン、およびノードのキーストアに[作成](../../avalanchego-apis/keystore-api.md#keystorecreateuser)され保存されるユーザー認証情報にアクセスできることを前提としています。

以下のAPI呼び出しのサンプルすべてが、ノードがローカルで実行されていると想定します（つまり、リスニングされます`127.0.0.1`。メインネットワーク、テストネットワーク、またはローカルネットワークに接続することができます。各ケースにおいて、APIコールとレスポンスは同じもので、アドレスフォーマットで使用する必要があります。ノードはローカルで必要ありません。

Avalancheウォレットを使用してAVAXを転送中にご留意いただけるよう、クロスチェーン転送は、2つの取引操作です。

* X-ChainからAVAXをエクスポートする
* AVAXをP-chainにインポートする

### ステップ1 - X-ChainからAVAXをエクスポートする

AVAXをエクスポートするには、X-Chainのメソッドを呼び出してください[`avm.exportAVAX`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-exportavax)。

あなたの呼び出しは、次のようになります。

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

`to`ここで、あなたのユーザーがコントロールするP-Chainアドレスであり、変更を送信するためのアドレス`changeAddr`です。`changeAddr`空白を放棄した場合、変更はユーザーがコントロールするアドレスに戻されます。（新しいP-Chainアドレスを作成する際の手順については、[ここ](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createaddress)を参照してください。

輸出と輸入両方の操作のための取引手数料が支払われますことにご留意ください。この例では、トランザクション手数料がAVAXと仮定します`.001`。その後、上記のエクスポートは、実際にAVAX`.006`を消費し、P-Chainに`.005`移動し、トランザクション手数料として`.001`焼き払われます。

送信する金額が、取引手数料を超えることを確認してください。さもなければ、P-Chain上でAVAXをインポートすると、トランザクション手数料が消費され、P-Chain上で_AVAXが_少なくなります。

レスポンスは次のようになります：

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

このトランザクションが次のように呼び出すことで受け付けられたことを確認することができます[`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus)。

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

これにより、我々のトランザクションが受け入れられることが示されます：

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "status": "Accepted"
    },
    "id": 1
}
```

また、AVAXが、我々のユーザーが保持したアドレスから差し引されたことを確認[`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance)するために呼び出すこともできます。

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

差し引された金額は、エクスポートされた金額（この例では`.005`AVAX）とトランザクション手数料です。あなたのユーザーが複数のX-Chainアドレスをコントロールする場合、AVAXはそれらの組み合わせから送信された可能性があります。

### ステップ2 - AVAXをP-Chainにインポートする

我々の移転はまだ行われません。移行を完了するには、P-Chainの[`platform.importAVAX`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-importavax)メソッドを呼び出す必要があります。

あなたの呼び出しは、次のようになります。

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

これによりトランザクションIDを返します：

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

トランザクションが以下のもので受け入れられていることを確認できます。

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

つまり`Committed`、移転が完了したことです。以下のアドレスでアドレス残量を確認することもできます。

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

レスポンスは次のようになります：

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

我々が見るバランスは、X-Chain（AVAX）からトランザクション手数料を少ない額（この例では`.004``.001`AVAX）からエクスポートされた金額です。現在、このP-Chainアドレスで保持されるAVAXを使用して、プライマリネットワークのバリデーションにステークを提供することができます。

## P-ChainからX-Chainにプログラムで移動する

さて、P-ChainからX-ChainにAVAXを移動しましょう。

以前と同じように、2つのトランザクション操作でもあります：

* P-Chainからエクスポート
* X-Chainにインポート

### ステップ1 - P-ChainからAVAXをエクスポートする

そのためには、次のように呼び出します[`platform.exportAVAX`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-exportavax)：

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

AVAXが送信されるX-Chainアドレス`to`です。

[`platform.getTxStatus`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-gettxstatus)これによりトランザクションIDが返されます。繰り返します。

### ステップ2 - AVAXをX-Chainにインポートする

P-ChainからX-Chainに移転した後、以下のように呼び出します[`avm.importAVAX`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-importavax)。

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

我々が呼び出しした際に指定された同じアドレス`to`であることに注意してください。[`platform.exportAVAX`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-exportavax)

以前と同じように、我々は呼び出して、資金が受け取った確認[`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance)が可能になります。残高は、`.003`AVAXによってトランザクション手数料を引かして増額するはずです。

## ラッピングアップ

それで終わりました！Avalancheウォレットを使用することと、Avalancheノード上で適切なAPI呼び出しを呼び出すことにより、X-ChainとP-Chain間でAVAXを交換することができます。

P-Chain上[で](../nodes-and-staking/add-a-validator.md)使用できるようになりました。

