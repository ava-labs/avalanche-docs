# AVAX-Chain-C-C-Chain-JP-JP

## JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-Java

AVAXトークンはX-Chainに存在し、P-Chainに、Primary Networkの検証時に株式として提供できるものであり、C-Chainには、スマートコントラクトやガスの支払いに使用できるものがあります。このチュートリアルでは、X-ChainとC-Chainの間にAVAXトークンを送ります。

## JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-Java

[Avalanche Node](../nodes-and-staking/run-avalanche-node.md)の実行を完了しました。[Avalancheの建築](../../../learn/platform-overview/)に精通しています。

AVAXを送信するには、AVAXが必要です!AVAXを購入することで、実際のAVAXを取得することができます。または[AVAX Test Faucet](https://faucet.avax-test.network)からtestnet AVAXを取得することができます。Avalancheで遊ぶための無料で簡単な方法です。

## AVAXをWebウォレットで転送する

AVAXをチェーン間で転送する最も簡単な方法は[、Avalanche Walletを](https://wallet.avax.network/)使用することです。AVAXにアクセスして移動する非管理的で安全な方法です。

Avalanche Walletのソースコードは[こちらから](https://github.com/ava-labs/avalanche-wallet)ご覧いただけます。

### ステップ1 - Avalancheウォレットを開く

![投稿の画像](../../../.gitbook/assets/wallet-x2p-01-login.png)

[**Access Wallet**]を選択してウォレットを入力します。ウォレットをメインAvalancheネットワーク以外のネットワークに接続するには、[**Mainnet**]を選択して、接続するネットワークを選択します。

### ステップ2 - ウォレットにログインする

ウォレットにアクセスするには、プライベートキー、mnemonicキーフレーズ、キーストアファイル、またはLedger Nano S. レジャー経由のC-Chain転送はまだサポートされていません。

![投稿の画像](../../../.gitbook/assets/wallet-x2p-02-access.png)

ログインが成功すると、残高、資産ポートフォリオ、その他のさまざまな情報が表示されます。

### ステップ3 - クロスチェーンタブに移動します。

![投稿の画像](../../../.gitbook/assets/wallet-x2p-03-earn.png)

チェーン間でトークンを転送する機能は[**Cross Chain**]タブにあります。

### ステップ4 - 転送する金額を入力します。

**Source Chain**と**Destination Chain**の選択肢が表示されます。X-ChainとC-Chainを選択します。X と C の残高と、ソースからデスティネーションチェーンに転送する金額を入力するための入力フィールドが表示されます。

![投稿の画像](../../../.gitbook/assets/wallet-x2c-01-x-c.png)

X-ChainからC-Chainに転送する金額を入力します。

### ステップ5 - トランザクションの確認

![投稿の画像](../../../.gitbook/assets/wallet-x2c-02-trasnfer.png)

[**Confirm**]を押し、[**Transfer**] を押して転送を開始します。

### ステップ6-完了！

クロスチェーン転送は2つのステッププロセスです。最初にX-Chainから資金をエクスポートするトランザクションと、もう1つはC-Chainにインポートするトランザクションです。ウォレットは両方で行い、その進捗状況を表示します。

![投稿の画像](../../../.gitbook/assets/wallet-x2c-03-done.png)

それだけだ!AVAXをX-ChainからC-Chainに移行しました！これで、C-Chainにスマートコントラクトをデプロイすることができます。

### C-ChainからX-Chainへの移行

AVAXをX-Chainに戻すには、逆方向に転送する必要があります。

**Source** and **Destination** ドロップダウン・メニューからそれらを選択して、SourceとDestination チェーンを切り替えます。残りのプロセスは同じです: 金額を入力し、確認し、転送します。

## APIコールによるX-ChainからC-Chainへの移行

Avalancheネットワーク上でアプリケーションを構築する場合は、より広範な機能の一部として、プログラム的に転送を行うことができます。AvalancheGo ノードで適切な API を呼び出すことで、その方法を学びます。チュートリアルでは、AvalancheGoノード、X-Chain上のAVAXトークン、およびノードのキーストアに[作成](../../avalanchego-apis/keystore-api.md#keystorecreateuser)および保存されたユーザー資格情報にアクセスできることを前提としています。

以下のAPIコールでは、ノードがローカル \(つまり`127.0.0.1`\でリスニング)を実行していると仮定しています。ノードはメインネットワーク、テストネットワーク、またはローカルネットワークに接続できます。JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-Javaノードはローカルである必要はありません。他の場所でホストされているノードへの呼び出しをすることができます。

Avalanche Walletを使用してAVAXを転送する際に気づいたかもしれませんが、クロスチェーン転送は2つのトランザクション操作です。

* AVAX を X-Chain からエクスポート
* AVAX を C-Chain にインポートする

転送を行う前に、C-Chainにアドレスを設定する必要があります。

### C-Chainでアドレスとキーを設定する

X-Chainは[Bech32](http://support.avalabs.org/en/articles/4587392-what-is-bech32)アドレスを使用し、C-Chainは16進Ethereum Virtual Machine \(EVM\)アドレスを使用しています。両方とも一方向暗号機能を使用して秘密鍵から派生しているため、アドレスを1つのフォーマットからもう1つのフォーマットに変換する方法はありません。

これを回避するために、X-Chainから秘密鍵をエクスポートしてからC-Chainにインポートできます。この方法で、X-Chain アドレスを使用して、X-プレフィックスをC-プレフィックスに変更して、C-Chainに使用する正しいBech32アドレスを取得できます。

まず、X-Chainから秘密鍵をエクスポートします:

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

JP-JP-

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "privateKey":"PrivateKey-2w4XiXxPfQK4TypYqnohRL8DRNTz9cGiGmwQ1zmgEqD9c9KWLq"
    }
}
```

これで、同じ秘密鍵をC-Chainにインポートします:

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

レスポンスには、16進エンコードされたEVMアドレスが含まれています。

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "0x5Bf544EF123FE41B262295dBA41c5a9CFA8efDB4"
    },
    "id": 1
}
```

今、トークンを転送するために必要なすべてがあります。

### X-ChainからC-Chainへの移行

あなたがエクスポートした秘密鍵に対応するアドレスを使用し、[`avm.exportAVAX`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-exportavax) コール内のC-プレフィックスを使用します。

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

KeystoreユーザーがC-Chain上で対応する秘密鍵を所有しているため、AVAXを任意のアドレスにインポートできるようになりました。エクスポートされた同じアドレスにそれをインポートする必要はありません。AVAXをMetaMaskまたは他のサードパーティサービスで所有するアドレスにインポートできます。

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

where `to` は、選択した16進エンコードされたEVMアドレスです。

レスポンスは次のようになります:

```cpp
{   
    "jsonrpc": "2.0",   
    "result": {
        "txID": "LWTRsiKnEUJC58y8ezAk6hhzmSMUCtemLvm3LZFw8fxDQpns3"
    },  
    "id": 1
}
```

注:CCHAINへのインポートトランザクションのトランザクション手数料はありません。

AVAX を C-Chain に移行したら、それを使用すると、スマートコントラクトと対話できます。

## C-ChainからX-Chainへの移行

AVAXをC-ChainからX-Chainに戻すことができます。まずはエクスポートする必要があります:

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

ここで、X-Chain アドレスがbech32でエンコードさ`れ`たアドレスです。輸出額と輸入額の両方のトランザクション手数料が請求されるため、輸出額がトランザクション手数料を超えることを確認してください。

レスポンスは次のようになります:

```cpp
{   
    "jsonrpc": "2.0",   
    "result": {
        "txID": "2ZDt3BNwzA8vm4CMP42pWD242VZy7TSWYUXEuBifkDh4BxbCvj"    
    },  
    "id": 1
}
```

転送を完了するには、[`avm.importAVAX`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-importavax) を呼び出します。

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

ここで、bech32エンコードされたX-Chainアドレスは、前回の手順で資金を送っ`た`アドレスです。

レスポンスは次のようになります:

```cpp
{   
    "jsonrpc": "2.0",   
    "result": {
        "txID": "2kxwWpHvZPhMsJcSTmM7a3Da7sExB8pPyF7t4cr2NSwnYqNHni"    
    },  
    "id": 1
}
```

## JP-JP-

それでいい！Avalanche Walletを使用し、Avalancheノードで適切なAPIコールを呼び出すことで、X-ChainとC-Chainの間でAVAXを前後に交換できます。

