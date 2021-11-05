# Avalancheノードを実行する

Avalancheについて学ぶ一番早い方法は、ノードを実行し、ネットワークを介してやり取りすることです。

{% embed url="https://youtu.be/c_SjtCiOFdg" caption="" %}

このチュートリアル（所要時間約10分）では、次を行います。

* Avalancheノードをインストールし、実行する
* Avalancheに接続する
* AVAXを送信する
* ノードをバリデーターセットに追加する

{% hint style="warning" %}問題が「よくある質問」で対処されていない場合は、[Avalanche Discord](https://chat.avax.network)でサポートを求めてください。障害を取り除き、解決に向けての努力をさせていただきます。{% endhint %}

{% hint style="info" %}サードパーティーサービスを使用して、ノードをホストしたり、バリデーターを実行したりすることに興味を持っている場合は[、オプションを確認してください](https://docs.avax.network/learn/community#blockchain-infrastructure-and-node-services){% endhint %}。

このチュートリアルは、主に開発者とAvalancheプラットフォーム機能に関心がある人々を対象としています。ステーキング対応のノードの設定に関心がある場合は、[インストーラーでAvalancheノードを設定する](set-up-node-with-installer.md)チュートリアルをお読みください。インストーラーは、インストールプロセスを自動化し、システムサービスとしての設定を行うため、無人での運用に適しています。このチュートリアルに従って、まず試すこともできます。次に、インストーラを使用してノードを設定します。

## 要件

Avalancheは、非常に軽量なプロトコルであるため、ノードはコモディティハードウェア上で実行することができます。ネットワークの使用量が増加するにつれ、ハードウェア要件が変更わる可能性があることにご注意ください。

* CPU：8AWSvCPUと同等のもの
* RAM：16GB
* ストレージ：200GB
* OS：Ubuntu 18.04/20.04またはMacOS >=Catalina

## Avalancheノードを実行し、資金を送信する

AvalancheノードのGo実装であるAvalancheGoをインストールし、Avalanche Public Testnetに接続してみましょう。

### AvalancheGoをダウンロードする

ノードはバイナリプログラムです。ソースコードをダウンロードし、バイナリプログラムを構築するか、あらかじめ構築されたバイナリをダウンロードすることができます。両方を行う必要はありません。

[構築済のバイナリ](run-avalanche-node.md#binary)のダウンロードは簡単です。自分のノードを実行し、ステークしたい場合に推奨します。

Avalanche上で実験し構築することを検討している開発者であれば、ソースからノードを構築するよう推奨します。

#### **ソースコード**

ソースからノードを構築したい場合は、Go 1.16.8以降をインストールする必要があります。[こちらの](https://golang.org/doc/install)手順に従ってください。

`go version`. **を実行する1.16.8以上が必要です。**`echo $GOPATH`. **を実行する空であってはなりません。**

AvalancheGoリポジトリを次のようにダウンロードします。

```cpp
go get -v -d github.com/ava-labs/avalanchego/...
```

上級ユーザーへの注意：AvalancheGoは、Goモジュールを使用しているので、[AvalancheGoリポジトリ](https://github.com/ava-labs/avalanchego)をGOPATH以外の場所にクローンすることができます。

.`avalanchego`ディレクトリに変更する：

```cpp
cd $GOPATH/src/github.com/ava-labs/avalanchego
```

AvalancheGoを構築する：

```cpp
./scripts/build.sh
```

`avalanchego`という名前のバイナリが、`avalanchego/build`にあります。

#### **バイナリ**

自分で構築する代わりに構築済のバイナリをダウンロードする場合は、[リリースページ](https://github.com/ava-labs/avalanchego/releases)に移動し、希望するリリース（おそらく最新のもの）を選択します。

`Assets`で、適切なファイルを選択します。

MacOS：ダウンロード`avalanchego-macos-<VERSION>.zip`  ：解凍： `unzip avalanchego-macos-<VERSION>.zip`結果として生じるフォルダ、`avalanchego-<VERSION>`はバイナリが含まれています。

PCまたはクラウドプロバイダでのLinux：ダウンロード：`avalanchego-linux-amd64-<VERSION>.tar.gz`  解凍：`tar -xvf avalanchego-linux-amd64-<VERSION>.tar.gz`  結果として生じるフォルダ、`avalanchego-<VERSION>-linux`、はバイナリを含んでいます。

RaspberryPi4または同様のArm64ベースのコンピュータでのLinux：ダウンロード：`avalanchego-linux-arm64-<VERSION>.tar.gz`  解凍：`tar -xvf avalanchego-linux-arm64-<VERSION>.tar.gz`  結果として生じるフォルダ、`avalanchego-<VERSION>-linux`、はバイナリを含んでいます。

### ノードを起動し、Avalancheに接続する

ソースから構築した場合：

```cpp
./build/avalanchego
```

MacOSで構築済のバイナリを使用する場合：

```cpp
./avalanchego-<VERSION>/build/avalanchego
```

Linux上で構築済のバイナリを使用する場合：

```cpp
./avalanchego-<VERSION>-linux/avalanchego
```

ノードが起動すると、ブートストラップ（ネットワークの他の部分に追いつくこと）が必要になります。ブートストラップに関するログが表示されます。指定したチェーンがブートストラップを完了すると、次のようなログを出力します。

`INFO [06-07|19:54:06] <X Chain> /snow/engine/avalanche/transitive.go#80: bootstrapping finished with 1 vertices in the accepted frontier`

指定したチェーンがブートストラップを完了しているかどうかを確認するには、次のコマンドをコピーしてペーストし、別のターミナルウィンドウで[`info.isBootstrapped`](../../avalanchego-apis/info-api.md#info-isbootstrapped)を呼び出します。

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.isBootstrapped",
    "params": {
        "chain":"X"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

これが`true`を返す場合、チェーンはブートストラップされます。ブートストラップが行われないチェーンにAPI呼び出しをすると、`API call rejected because chain is not done bootstrapping`が返ります。ノードがブートストラップを完了しない場合には、この[よくある質問](http://support.avalabs.org/en/articles/4593908-is-my-node-done-bootstrapping)を参照してください、それでも問題が解決しない場合は、[Discord](https://chat.avalabs.org/)でお問い合わせください。

ノードが実行され、接続されています。メインネットでノードをバリデーターとして使用する場合は、[このチュートリアルを](add-a-validator.md#add-a-validator-with-avalanche-wallet)参照し、ウェブウォレットを使用してノードを追加する方法を確認してください。

`Ctrl + C`を使用して、ノードを終了することができます。

ノードで実験し、再生する場合は、読み進めてください。

他の装置からノードへのAPI呼び出しを可能にするには、ノード起動時に`--http-host=`を含む引数を指定します（例：`./build/avalanchego --http-host=`）。

メインネットではなく、Fuji Testnetに接続する場合は、因数`--network-id=fuji`を使用する必要があります。[faucet](https://faucet.avax-test.network/)からテストネット上で資金を取得することができます。

### キーストアユーザーを作成する

Avalancheノードは、組み込みの**キーストア**を提供します。キーストアは、ユーザーを管理するものであり、[ウォレット](http://support.avalabs.org/en/articles/4587108-what-is-a-blockchain-wallet)と非常に近いものです。ユーザーとは、ブロックチェーンでやり取りする際にクライアントが使用する、パスワードで保護されたIDです。**ノードオペレータがプレーンテキストのパスワードにアクセスするため、操作するノードのみにキーストアユーザーを作成する必要があります**。ユーザーを作成する場合は、[`keystore.createUser`](../../avalanchego-apis/keystore-api.md#keystore-createuser)を呼び出します。

```cpp
curl -X POST --data '{
     "jsonrpc": "2.0",
     "id": 1,
     "method": "keystore.createUser",
     "params": {
         "username": "YOUR USERNAME HERE",
         "password": "YOUR PASSWORD HERE"
     }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/keystore
```

レスポンスは、次のようになります。

```cpp
{
     "jsonrpc":"2.0",
     "result":{"success":true},
     "id":1
}
```

これで、このノードにユーザーがいることになります。キーストアデータは、ノードレベルで存在します。1ノードのキーストアで作成するユーザーは、他のノードには存在しませんが、キーストアにユーザーをインポート/エクスポートすることができます。方法については[、キーストアAPI](../../avalanchego-apis/keystore-api.md)を参照してください。

{% hint style="danger" %}**ノードには少額資金のみを保管すべきです。**ほとんどの資金は、任意のコンピュータに保存されていないニーモニックで保護される必要があります。{% endhint %}

### アドレスを作成する

Avalancheは、異種性ブロックチェーンのプラットフォームで、そのうちの１つが[X-Chain](../../../learn/platform-overview/#exchange-chain-x-chain)です。これはデジタル資産を作成・取引するための分散型プラットフォームとして機能します。では、ノードでAVAXを保持するためのアドレスを作成しましょう。

X-Chain上で新しいアドレスを作成するには、[X-Chain のAPI](../../avalanchego-apis/exchange-chain-x-chain-api.md)の[`avm.createAddress`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createaddress)メソッドを呼び出します。

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :2,
    "method" :"avm.createAddress",
    "params" :{
        "username":"YOUR USERNAME HERE",
        "password":"YOUR PASSWORD HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

ノードがブートストラップを完了していない場合、この呼び出しは、`API call rejected because chain is not done bootstrapping`メッセージで`503`ステータスを返します。

このリクエストを`127.0.0.1:9650/ext/bc/X`に対して行うことに注意してください。`bc/X`部分は、そのID（またはエイリアス）が`X`（すなわち、X-Chain）であるブロックチェーンに、リクエストが送信されることを意味します。

レスポンスは、次のようになります。

```cpp
{
    "jsonrpc":"2.0",
    "id":2,
    "result" :{
        "address":"X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75"
    }
}
```

これで、ユーザーがX-Chain上のアドレス`X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75`を管理するようになります。異なるチェーン上のアドレスを見分けるために、Avalanche規約では、アドレスには、そのアドレスが存在するチェーンのIDまたはエイリアスを含めることになっています。従って、このアドレスは`X-`で始まり、X-Chain上に存在することを示します。

### Avalancheウォレットからノードに資金を送信する

{% hint style="warning" %}_**注意：次の手順は実際の資金を移動します**_。{% endhint %}

Avalancheウォレットからノードに資金を移動しましょう。

[Avalancheウォレット](https://wallet.avax.network)に移動します。`Access Wallet`、次に`Mnemonic Key Phrase`をクリックします。ニーモニックフレーズを入力します。

左の`Send`タブをクリックします。金額に対しては、`.002`AVAXを選択します。ノードのアドレスを入力し、`Confirm`をクリックします。

![ウェブウォレット送信タブ](../../../.gitbook/assets/web-wallet-send-tab%20%284%29%20%284%29%20%285%29%20%285%29%20%286%29%20%287%29%20%284%29%20%281%29%20%285%29.png)

X-ChainのAPIの別のメソッドである`avm.getBalance`を呼び出すことで、指定された資産の残高を確認することができます。転送が完了したことを確認しましょう。

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :3,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75",
        "assetID"  :"AVAX"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

AVAXには特別なID`AVAX`が含まれています。通常、資産IDは、英数字の文字列です。

レスポンスには、`2,000,000 nAVAX`あるいは`0.002 AVAX`があることを示す必要があります。

```cpp
{
    "jsonrpc":"2.0",
    "id"     :3,
    "result" :{
        "balance":2000000,
        "utxoIDs": [
            {
                "txID": "x6vR85YPNRf5phpLAEC7Sd6Tq2PXWRt3AAHAK4BpjxyjRyhtu",
                "outputIndex": 0
            }
        ]
    }
}
```

### AVAXを送信する

それでは、ノードに対してAPIを呼び出しをかけて、いくつかのAVAXを送信しましょう。

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :5,
    "method" :"avm.send",
    "params" :{
        "assetID"    :"AVAX",
        "amount"     :1000,
        "to"         :"X-avax1w4nt49gyv4e99ldqevy50l2kz55y9efghep0cs",
        "changeAddr" :"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username"   :"YOUR USERNAME HERE",
        "password"   :"YOUR PASSWORD HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

`amount`は送信するnAVAXの数を指定します。

変更が行われる場所に特定のアドレスを指定するには、`changeAddr`で指定することができます。このフィールドを空のままにすることができます。そうすると、ユーザーが管理するアドレスのいずれかに変更が送信されます。

スパム防止のため、AVAXのトランザクションには手数料の支払いが必要となります。トランザクション手数料は、トランザクションを発行するときにユーザーが管理するアドレスから自動的に差し引かれます。残高を次で確認するときに覚えておいてください。

{% page-ref page="../../../learn/platform-overview/transaction-fees.md" %}

このリクエストを送信すると、ノードはユーザー名とパスワードを使用し、認証します。その後、リクエストを満たす十分なAVAXが見つかるまで、ユーザーが管理するすべての[秘密鍵](http://support.avalabs.org/en/articles/4587058-what-are-public-and-private-keys)を調べます。

レスポンスには、トランザクションのIDが含まれています。`send`の起動ごとに異なるものがあります。

```cpp
{
    "jsonrpc":"2.0",
    "id"     :5,
    "result" :{
        "txID":"2QouvFWUbjuySRxeX5xMbNCuAaKWfbk5FeEa2JmoF85RKLk2dD",
        "changeAddr" :"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

#### トランザクションステータスの確認

このトランザクション完了までにかかる時間は、たった1～2秒です。そのステータスを[`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus)で確認することができます。

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :6,
    "method" :"avm.getTxStatus",
    "params" :{
        "txID":"2QouvFWUbjuySRxeX5xMbNCuAaKWfbk5FeEa2JmoF85RKLk2dD"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

レスポンスは、トランザクションが承認されたことを示す必要があります。

```cpp
{
    "jsonrpc":"2.0",
    "id"     :6,
    "result" :{
        "status":"Accepted"
    }
}
```

`status`が`Processing`で、ネットワークがトランザクションが完了しているかどうか確かめることができます。

トランザクションが`Accepted`であることを確かめたら、`to`アドレスの残高を確認し、送信したAVAXが含まれていることを確認します。

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :7,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-avax1w4nt49gyv4e99ldqevy50l2kz55y9efghep0cs",
        "assetID"  :"AVAX"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

レスポンスは、次のようになります。

```cpp
{
    "jsonrpc":"2.0",
    "id"     :7,
    "result" :{
        "balance":1000
    }
}
```

同じように、`X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75`を確認すると、送信したAVAXが、残高とトランザクション手数料と一緒に差し引かれていることが分かります。

{% page-ref page="add-a-validator.md" %}

{% page-ref page="../../tools/avalanchejs/create-an-asset-on-the-x-chain.md" %}

{% page-ref page="../platform/create-avm-blockchain.md" %}

{% page-ref page="../platform/create-custom-blockchain.md" %}

{% page-ref page="../platform/create-a-subnet.md" %}

{% page-ref page="../../avalanchego-apis/" %}

{% page-ref page="../../references/" %}

