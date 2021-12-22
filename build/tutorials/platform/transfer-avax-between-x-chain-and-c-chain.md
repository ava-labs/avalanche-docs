# X-Chainと C-Chain間でAVAXを転送する

## はじめに

AVAXトークンは、取引可能なX-Chain上、Primary Networkを検証する際にステークとして提供できるP-Chain上、スマートコントラクトで使用するあるいはガス代を支払う C-Chain上に存在しています。このチュートリアルでは、X-Chainと C-Chain間でAVAXトークンを送信します。

## 要件

[Run an Avalanche Node（Avalancheノードを実行する）](../nodes-and-staking/run-avalanche-node.md)を修了されたので、[Avalancheのアーキテクチャ](../../../learn/platform-overview/)をよく理解されていることと思います。

AVAXを送信するには、AVAXがいくらか必要です。実際のAVAXを取得するには、取引所で購入することもできますし、[AVAX Test Faucet](https://faucet.avax-test.network)からテストネットAVAXを取得することもできます。後者は、Avalanche上で試してみるには無料で簡単な方法です。

## ウェブウォレットを使用してAVAXを転送する

チェーン間でAVAXを転送する最も簡単な方法は、[Avalancheウォレット](https://wallet.avax.network/)を使用することです。これは、AVAXにアクセスし、移動させる非管理かつ安全な方法です。

Avalancheウォレットのソースコードは、[ここ](https://github.com/ava-labs/avalanche-wallet)にあります。

### ステップ1 - Avalancheウォレットを開く

![掲載画像](../../../.gitbook/assets/wallet-x2p-01-login.png)

**Access Wallet**（ウォレットにアクセス）を選択し、自分のウォレットを入力します。メインのAvalancheネットワーク以外のネットワークにウォレットを接続させるには、**Mainnet**を選択し、接続するネットワークを選びます。

### ステップ2 - ウォレットにログインする

秘密鍵、ニーモニック鍵フレーズ、キーストアファイルあるいはLedger Nano Sを使って、ウォレットにアクセスすることができます。Ledgerを介したC-Chain転送はまだサポートされていません。

![掲載画像](../../../.gitbook/assets/wallet-x2p-02-access.png)

ログインに成功すると、残高、資産ポートフォリオや様々な情報が表示されます。

### ステップ3 - Cross Chain（クロスチェーン）タブに移動する

![掲載画像](../../../.gitbook/assets/wallet-x2p-03-earn.png)

チェーン間でトークンを転送するための機能は、**Cross Chain**（クロスチェーン）タブにあります。

### ステップ4 - 転送する金額を入力する

**Source Chain**（送信元チェーン）と**Destination Chain**（送信先チェーン）の選択が表示されます。X-Chainと C-Chainをそれぞれ選択します。XとCでの残高と送信元から送信先チェーンへ転送する金額を入力するフィールドが表示されます。

![掲載画像](../../../.gitbook/assets/wallet-x2c-01-x-c.png)

X-Chainから C-Chainに転送する金額を入力します。

### ステップ5 - トランザクションを確認する

![掲載画像](../../../.gitbook/assets/wallet-x2c-02-trasnfer.png)

**Confirm**（確認）を押し、その後**Transfer**(転送）を押して、転送を開始します。

### ステップ6 - 完了しました。

クロスチェーン転送は2段階のプロセスで行われます。まずX-Chainから資金をエクスポートするトランザクション、そして C-Chainにインポートするトランザクションです。ウォレットは両方を行い、実行中進捗を表示します。

![掲載画像](../../../.gitbook/assets/wallet-x2c-03-done.png)

完了です。AVAXは、X-Chainから C-Chainに転送されました。これで、 C-Chain上でスマートコントラクトをデプロイするのに使用できるようになりました。

###  C-ChainからX-Chainへ転送する

AVAXをX-Chainに戻すには、逆の方向に転送を行う必要があります。

**Source**（送信元）と**Destination**(送信先）をドロップダウンメニューから選択し、送信元と送信先を入れ替えます。後のプロセスは同じです。金額を入力し、確認し、転送します。

## APIコールを使ったX-Chainから C-Chainへの転送

Avalancheネットワーク上でアプリケーションを構築している場合は、より広範な機能の一部としてプログラムによる転送を行うことを望まれるかもしれません。AvalancheGoノード上で適切なAPIを呼び出すことで可能です。このチュートリアルのここ以降では、AvalancheGoノード、X-Chain上のAVAXトークン、およびノードのキーストアで[作成](../../avalanchego-apis/keystore-api.md#keystorecreateuser)、保存されたユーザー認証情報にアクセスできることを前提にしています。

次のAPI呼び出しの例はすべて、ノードがローカルで実行されている（つまり`127.0.0.1`上でリスニングしている）ことを前提にしています。ノードは、メインネットワーク、テストネットワーク、またはローカルネットワークに接続することができます。それぞれのケースで、アドレスの形式を除き、API呼び出しとレスポンスは同じでなければなりません。ノードはローカルである必要はありません。他の場所でホスティングされているノードを呼び出すことも可能です。

Avalancheウォレットを使用してAVAXを転送する際に気づかれているかもしれませんが、クロスチェーン転送は2つのトランザクションオペレーションからなります。

* X-ChainからAVAXをエクスポートする
*  C-ChainにAVAXをインポートする

転送を行う前に、 C-Chain上で、コントロール鍵とともにアドレスを設定する必要があります。

###  C-Chain上でアドレスと鍵を設定する

X-Chainは、[Bech32](http://support.avalabs.org/en/articles/4587392-what-is-bech32)アドレスを使用し、 C-Chainは、16進Ethereum仮想マシン（EVM）アドレスを使用します。一方向性暗号学的関数を使用して秘密鍵から派生させているため、ひとつのフォーマットから別のフォーマットに変換する方法はありません。

この問題を回避するため、X-Chainから秘密鍵をエクスポートし、 C-Chainにインポートすることができます。このように、X-Chainアドレスを使用し、X-の接頭辞をC-の接頭辞に変更して、 C-Chainで利用する正しいBech32アドレスを取得することもができます。

まず、X-Chainから秘密鍵をエクスポートします。

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.exportKey",
    "params" :{
        "username" :"myUsername",
        "password":"myPassword",
        "address": "X-avax1jggdngzc9l87rgurmfu0z0n0v4mxlqta0h3k6e"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

レスポンス：

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "privateKey":"PrivateKey-2w4XiXxPfQK4TypYqnohRL8DRNTz9cGiGmwQ1zmgEqD9c9KWLq"
    }
}
```

次に、 C-Chainに同じ秘密鍵をインポートします。

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avax.importKey",
    "params" :{
        "username" :"myUsername",
        "password":"myPassword",
        "privateKey":"PrivateKey-2w4XiXxPfQK4TypYqnohRL8DRNTz9cGiGmwQ1zmgEqD9c9KWLq"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

レスポンスには、16進数でエンコードされたEVMアドレスが含まれます。

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "0x5Bf544EF123FE41B262295dBA41c5a9CFA8efDB4"
    },
    "id": 1
}
```

これでトークンを転送するのに必要な準備がすべてできました。

### X-Chainから C-Chainへ転送する

エクスポートした秘密鍵に対応するアドレスを使用し、[`avm.export`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-export)呼び出しでC-の接頭辞を使用して切り替えます。

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.export",
    "params" :{
        "assetID": "AVAX",
        "to": "C-avax1wkmfja9ve3lt3n9ye4qp3l3gj9k2mz7ep45j7q"
        "amount": 5000000,
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

キーストアユーザーは、 C-Chain上で対応する秘密鍵を所有しているので、AVAXを任意のアドレスにインポートすることができます。エクスポートされた宛先と同じアドレスにインポートする必要はありません。つまり、AVAXをMetaMask上や他のサードパーティーのサービスで所有しているアドレスにインポートすることができます。

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avax.import",
    "params" :{
        "to":"0x4b879aff6b3d24352Ac1985c1F45BA4c3493A398",
        "sourceChain":"X",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

`to`に、16進法でエンコードされている任意のEVMアドレスがあります。

レスポンスは、次のようになります。

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "LWTRsiKnEUJC58y8ezAk6hhzmSMUCtemLvm3LZFw8fxDQpns3"
    },
    "id": 1
}
```

注意： C-Chainへのインポートトランザクションにトランザクション手数料は発生しません。

一旦AVAXが C-Chainに転送されると、スマートコントラクトをデプロイしたり、やり取りするために使用できるようになります。

##  C-ChainからX-Chainへの転送

さて、 C-ChainからX-ChainにAVAXを戻すこともできます。まず、エクスポートする必要があります。

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avax.exportAVAX",
    "params" :{
        "to":"X-avax1wkmfja9ve3lt3n9ye4qp3l3gj9k2mz7ep45j7q",
        "assetID": "AVAX",
        "amount": 5000000,
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

`to`に、保持しているX-Chainアドレスのbech32でエンコードされたアドレスがあります。エクスポート、インポートの両方に手数料がかかるため、エクスポートする金額がトランザクション手数料を上回るようにしてください。

レスポンスは、次のようになります。

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2ZDt3BNwzA8vm4CMP42pWD242VZy7TSWYUXEuBifkDh4BxbCvj"
    },
    "id": 1
}
```

転送を完了させるには、[`avm.import`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-import)を呼び出します。

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method": "avm.import",
    "params": {
        "username":"myUsername",
        "password":"myPassword",
        "sourceChain": "C",
        "to":"X-avax1wkmfja9ve3lt3n9ye4qp3l3gj9k2mz7ep45j7q"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

`to`に、ひとつ前のステップで資金を送信したX-Chainアドレスのbech32でエンコードされたアドレスがあります。

レスポンスは、次のようになります。

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2kxwWpHvZPhMsJcSTmM7a3Da7sExB8pPyF7t4cr2NSwnYqNHni"
    },
    "id": 1
}
```

## まとめ

完了です。これで、Avalancheウォレットを使用し、Avalancheノード上で適切なAPIコールを呼び出すことで、X-Chainと C-Chain間でAVAXを相互にやり取りすることができるようになりました。

