# X-ChainとC-Chain間でAVAXを移動する

## はじめに

AVAXトークンは、X-Chain上に存在します。P-Chain上に、プライマリネットワークのバリデーションに際しステークとして提供できる、そして、スマートコントラクトで使用される、ガスの支払いができるC-Chain上に存在します。このチュートリアルでは、X-ChainとC-Chain間でAVAXトークンを送達します。

## 要件

完了した[Avalancheノードを実行](../nodes-and-staking/run-avalanche-node.md)し、Avalancheアーキテクチャに精通しています[。](../../../learn/platform-overview/)

AVAXを送信するには、AVAXを用意する必要があります！取引所で購入することにより、実際の[AVAX](https://faucet.avax-test.network)を得ることができます。あるいはAVAXテストフォーセットからテストネットAVAXを取得することができます。これはAvalancheで遊ぶための無料で簡単な方法です。

## ウェブウォレットを使用してAVAXの移動

AVAXをチェーン間で転送する最も簡単な方法は、[Avalancheウォレットを](https://wallet.avax.network/)使用することです。これはAVAXにアクセスし、移動する非管理者で安全な方法です。

Avalancheウォレットソースコードは[、ここから](https://github.com/ava-labs/avalanche-wallet)入手できます。

### ステップ1 - Avalancheウォレットを開く

![ポストのための画像](../../../.gitbook/assets/wallet-x2p-01-login.png)

**を選択し、ウォレットを入力**します。メインAvalanche以外のネットワークにウォレットを接続するには、**Mainnetを選択し、接続するネットワークを選択**します。

### ステップ2 - ウォレットにログインする

秘密鍵、mnemonic鍵フレーズ、キーストアファイル、あるいはLedger Nano Sを使用してウォレットにアクセスすることができます。

![ポストのための画像](../../../.gitbook/assets/wallet-x2p-02-access.png)

ログインが成功した後、残高、アセットポートフォリオ、その他のさまざまな情報が表示されます。

### ステップ3 - クロスチェーンタブに移動します

![ポストのための画像](../../../.gitbook/assets/wallet-x2p-03-earn.png)

チェーン間でトークンを移動するための機能は、「**クロスチェーン」タブにあります**。

### ステップ4 - 転送する金額を入力します

**ソースチェーン**と**デスティネーションチェーンのための選択が表示されます**。X-ChainとC-Chainを選択します。XとCのバランスが表示され、ソースからコピー先チェーンに転送する金額を入力するための入力フィールドが表示されます。

![ポストのための画像](../../../.gitbook/assets/wallet-x2c-01-x-c.png)

X-ChainからC-Chainに転送する金額を入力します。

### ステップ5 - トランザクションを確認する

![ポストのための画像](../../../.gitbook/assets/wallet-x2c-02-trasnfer.png)

**確認を押し、その******後Transfer

### ステップ6 - 完了！

クロスチェーンのトランスファーは、X-Chainから資金を輸出するためのトランザクションと、C-Chainにインポートする二つのステッププロセスです。ウォレットは両方を行い、その進捗を示しながらウォレットが進捗を示します。

![ポストのための画像](../../../.gitbook/assets/wallet-x2c-03-done.png)

それで終わりました！AVAXをX-ChainからC-Chainに移転しました！これで、C-Chain上にスマートコントラクトを展開するために使用が可能になります。

### C-ChainからX-chainに移動する

AVAXをX-Chainに戻すには、逆方向での転送が必要です。

ソースと**デスティネーションチェーンをスワップし、「**ソース」****ドロップダウンメニューから選択します。残りのプロセスのプロセスは同じです。金額を入力し、確認し、振り込むことができます。

## APIコールでX-ChainからC-Chainに移行する

Avalancheネットワーク上でアプリケーションを構築する場合、より広範な機能の一部としてプログラムでトランスファーを起こすことをお勧めします。AvalancheGoノード上で適切なAPIを呼び出すことで可能です。チュートリアルの残りのチュートリアルの場合、AvalancheGoノード、X-Chain上のAVAXトークン、およびノードのキーストアに[作成](../../avalanchego-apis/keystore-api.md#keystorecreateuser)され保存されるユーザー認証情報にアクセスできることを前提としています。

以下のAPI呼び出しのサンプルすべてが、ノードがローカルで実行されていると想定します（つまり、リスニングされます`127.0.0.1`。メインネットワーク、テストネットワーク、またはローカルネットワークに接続することができます。各ケースにおいて、APIコールとレスポンスは同じもので、アドレスフォーマットで使用する必要があります。ノードはローカルで必要ありません。

Avalancheウォレットを使用してAVAXを転送中にご留意いただけるよう、クロスチェーン転送は、2つの取引操作です。

* X-ChainからAVAXをエクスポートする
* AVAXをC-Chainにインポート

移転を行う前に、C-Chain上にアドレスを設定し、コントロールキーを設定する必要があります。

### C-Chain上でアドレスとキーを設定する

X-Chainは、[Bech32](http://support.avalabs.org/en/articles/4587392-what-is-bech32)アドレスを使用し、C-Chainは、六角形イーサリアムバーチャルマシン（EVM）アドレスを使用します。両方が一方向暗号機能を使用して秘密鍵から派生するため、アドレスを1つのフォーマットから他方に変換する方法はありません。

これを回避するために、X-Chainから秘密鍵をエクスポートし、C-Chainにインポートすることができます。こうすることで、X-Chainアドレスを使用し、X-プレフィックスをC-プレフィックスに変更することができます。

まず、X-Chainから秘密鍵をエクスポートします：

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

さて、C-Chainに同じ秘密鍵をインポートします：

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

レスポンスには、16進符号化されたEVMアドレスが含まれています：

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "0x5Bf544EF123FE41B262295dBA41c5a9CFA8efDB4"
    },
    "id": 1
}
```

今度は、トークンの移転に必要なものすべてが完了しました。

### X-ChainからC-Chainに移行する

エクスポートした秘密鍵に相当するアドレスを使用して、コール内のC-プレフィックスを使用するようにします[`avm.exportAVAX`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-exportavax)。

```cpp
curl -X POST --data '{  
    "jsonrpc":"2.0",    
    "id"     :1,    
    "method" :"avm.exportAVAX",
    "params" :{
        "to":"C-avax1jggdngzc9l87rgurmfu0z0n0v4mxlqta0h3k6e",   
        "destinationChain": "C",    
        "amount": 5000000,  
        "username":"myUsername",    
        "password":"myPassword"
    }   
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

鍵ストアユーザーは、C-Chain上に、対応する秘密鍵を所有しているため、AVAXを任意のアドレスにインポートすることができます。エクスポートされたと同じアドレスにインポートする必要はありません。AVAXをMetaMaskまたは別のサードパーティサービスで所有するアドレスにインポートすることができます。

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,    
    "method" :"avax.importAVAX",    
    "params" :{
        "to":"0x4b879aff6b3d24352Ac1985c1F45BA4c3493A398",  
        "sourceChain":"X",  
        "username":"myUsername",    
        "password":"myPassword"
    }   
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

ここで、あなたの選択した六角エンコードされたEVMアドレス`to`です。

レスポンスは次のようになります：

```cpp
{   
    "jsonrpc": "2.0",   
    "result": {
        "txID": "LWTRsiKnEUJC58y8ezAk6hhzmSMUCtemLvm3LZFw8fxDQpns3"
    },  
    "id": 1
}
```

注意：Cチェーンへの輸入取引に際し、取引手数料は発生しません。

AVAXがC-Chainに移転した後、スマートコントラクトを展開したりやり取りするために使用できます。

## C-ChainからX-Chainに移行する

AVAXは、C-ChainからX-Chainに戻すことができます。まず、エクスポートする必要があります：

```cpp
curl -X POST --data '{  
    "jsonrpc":"2.0",    
    "id"     :1,    
    "method" :"avax.exportAVAX",
    "params" :{
        "to":"X-avax1wkmfja9ve3lt3n9ye4qp3l3gj9k2mz7ep45j7q",   
        "amount": 5000000,  
        "username":"myUsername",    
        "password":"myPassword"
    }   
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

ここで、あなたが保持するX-Chainアドレスでbech32エンコードされたアドレス`to`です。輸出と輸入取引の両方で取引手数料が発生するので、輸出額が取引手数料を超過するようにしてください。

レスポンスは次のようになります：

```cpp
{   
    "jsonrpc": "2.0",   
    "result": {
        "txID": "2ZDt3BNwzA8vm4CMP42pWD242VZy7TSWYUXEuBifkDh4BxbCvj"    
    },  
    "id": 1
}
```

振り込みを完了する場合は、コールしてください[`avm.importAVAX`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-importavax)。

```cpp
curl -X POST --data '{  
    "jsonrpc":"2.0",    
    "id"     :1,    
    "method": "avm.importAVAX",
    "params": {
        "username":"myUsername",    
        "password":"myPassword",    
        "sourceChain": "C",
        "to":"X-avax1wkmfja9ve3lt3n9ye4qp3l3gj9k2mz7ep45j7q"    
    }   
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

`to`bech32エンコードされた、X-Chainアドレスが、以前のステップで送金されました。

レスポンスは次のようになります：

```cpp
{   
    "jsonrpc": "2.0",   
    "result": {
        "txID": "2kxwWpHvZPhMsJcSTmM7a3Da7sExB8pPyF7t4cr2NSwnYqNHni"    
    },  
    "id": 1
}
```

## ラッピングアップ

それで終わりました！Avalancheウォレットを使用することと、Avalancheノード上で適切なAPI呼び出しを呼び出すことにより、X-ChainとC-Chain間でAVAXを交換することができます。

