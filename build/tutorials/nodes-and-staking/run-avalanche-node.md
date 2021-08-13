# Avalancheノードを実行する

Avalancheについて学ぶ最も簡単な方法は、ノードを実行し、ネットワークと対話することです。

{% embed url="https://youtu.be/c\_SjtCiOFdg" caption=""" %}

このチュートリアル \(est. time: 10 minutes\)では、次のようにします:

* Avalancheノードをインストールして実行します。
* Avalancheに接続
* AVAXを送る
* ノードをバリデータセットに追加します。

{% ヒント スタイル="warning" %}問題がFAQで解決されていない場合は、[Avalanche Discord](https://chat.avax.network)でヘルプを求めてください！私たちは、あらゆる障害物をあなたに導くために働きます。{% endhint %}

--サードパーティーサービスを使用してノードをホストしたり、バリデーターを実行することに興味がある場合は、[オプションをチェックしてください。](https://docs.avax.network/learn/community#blockchain-infrastructure-and-node-services){% endhint %}

このチュートリアルでは、主にAvalancheプラットフォームの動作に興味のある開発者や人々に向けて設計されています。staking 用のノードを設定することに興味があるなら、代わりに [Avalanche ノードをインストーラで設定](set-up-node-with-installer.md)するチュートリアルに従ってください。Installer はインストールプロセスを自動化し、システムサービスとして設定します。これは無人操作に推奨されます。また、このチュートリアルに従ってThingを試してみてください。その後、インストーラーを使用してノードを永久的な解決策として設定することもできます。

## JavaScript-JavaScript-JavaScript-JavaScript-

Avalancheは非常に軽量なプロトコルであるため、コンピューターの最小要件はかなり控えめです。Networkの使用量が増加すると、ハードウェアの要件が変化する可能性があることに注意してください。

* ハードウェア：CPU > 2GHz、RAM > 4GB、ストレージ > 200GBの空き容量
* OS: Ubuntu 18.04/20.04 または MacOS >= Catalina

## Avalancheノードを実行して資金を送る

AvalancheGoをインストールして、Avalanche Public Testnetに接続しましょう。

### AvalancheGoをダウンロード

Node はバイナリプログラムです。JavaScript-JP-JP-両方を行う必要はありません。

[ビルド済みのバイナリの](run-avalanche-node.md#binary)ダウンロードは簡単で、自分のノードを実行し、それを賭けているだけなら推奨されます。

Avalanche 上で実験し、ビルドを探している開発者なら、ソースからノードをビルドすることをお勧めします。

#### **JPY-JPY-**

ノードをソースからビルドする場合は、まずGo 1.15.5以降をインストールする必要があります。[ここ](https://golang.org/doc/install)に手順に従ってください。

`go バージョン`を実行します。**JavaScript-JP-JP-**`echo $GOPATH`を実行します。**--**

AvalancheGo リポジトリをダウンロードします。

```cpp
go get -v -d github.com/ava-labs/avalanchego/...
```

上級ユーザーへの注意: AvalancheGoはGoモジュールを使用しているため、[AvalancheGoリポジトリ](https://github.com/ava-labs/avalanchego)をGOPATH以外の場所にクローンできます。

`avalanchego` ディレクトリに変更:

```cpp
cd $GOPATH/src/github.com/ava-labs/avalanchego
```

AvalancheGoを構築します:

```cpp
./scripts/build.sh
```

`avalanchego`という名前のバイナリーは`avalanchego/build`にあります。

#### **バイナリー**

自分でビルドするのではなく、事前ビルド済みバイナリをダウンロードしたい場合は、 私たちの[リリースページ](https://github.com/ava-labs/avalanchego/releases)に移動し、必要なリリース \(おそらく最新のもの)を選択します。\)

`Assets` で、適切なファイルを選択します。

MacOS: ダウンロード: `avalanchego-macos-<VERSION>.zip`  Unzip: `anzip avalanchego-macos-<VERSION>.zip` 結果のフォルダー `avalanchego-<VERSION>`にはバイナリーが含まれています。

Linux またはクラウドプロバイダーの場合: `avalanchego-linux-amd64-<VERSION>.tar.gz`  `JavaScript-JP-JP-`  `JavaScript-JP-JP-`

RaspberryPi4 または類似の Arm64 ベースのコンピューターの Linux では、次の`ようなもの`があります。  `JavaScript-JP-JP-`  `JavaScript-JP-JP-`

### Node を起動し、Avalanche に接続します。

JavaScript-JP-JP-

```cpp
./build/avalanchego
```

MacOSでビルド済みバイナリを使用している場合:

```cpp
./avalanchego-<VERSION>/build/avalanchego
```

Linuxでビルド済みバイナリを使用している場合:

```cpp
./avalanchego-<VERSION>-linux/avalanchego
```

Node が起動すると、 \(network\ の他の部分に追いつく) \(catch app-jp) が必要です。起動に関するログが表示されます。指定したチェーンが起動すると、次のようにログを出力します:

`INFO [06-07|19:54:06] <X Chain> /snow/engine/avalanche/transitive.go#80: ブートストラップが、受け入れられたフロンティアで1つの頂点で終了しました。`

指定されたチェーンが起動済みかどうかを確認するには、別のターミナルウィンドウで、次のコマンドをコピー&ペーストして[`info.isBootstrapped`](../../avalanchego-apis/info-api.md#info-isbootstrapped)を呼び出します。

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

True を返すと`、`チェーンが起動されます。ブートストラップが行われていないチェーンにAPIコールを実行すると、`ブートストラップが行われていないため、APIコールrejected`が返されます。ノードがブートストラップを完了しない場合は、[このFAQ](http://support.avalabs.org/en/articles/4593908-is-my-node-done-bootstrapping)に従ってください[。](https://chat.avalabs.org/)

Nodeが実行され、接続されています。Nodeをバリデータとしてメインネットで使用する場合は、[この](add-a-validator.md#add-a-validator-with-avalanche-wallet)チュートリアルで、Webウォレットを使用してノードをバリデータとして追加する方法を確認してください。

`Ctrl + C`を使用してノードを終了することができます。

ノードで試して遊びたい場合は、以下を読んでください。

Node から API 呼び出しを他のマシンから得るようにするには、ノードを起動するときに `--http`-host= \(例: `./build/avalanchego --http-host=`\)

Fuji Testnet に接続するには、`--network-id=fuji` を使います。Testnetで資金を入手できます[。](https://faucet.avax-test.network/)

### Keystore ユーザーの作成

AvalancheノードはKeystoreを組み込んでいます**。**Keystore はユーザーを管理し、[ウォレット](http://support.avalabs.org/en/articles/4587108-what-is-a-blockchain-wallet)のように非常に似ています。ユーザーは、クライアントがブロックチェーンとやり取りする際に使用できるパスワードで保護されたIDです。**Nodeオペレーターがプレーンテキストパスワードにアクセスできるため、keystoreユーザーを操作するノードにのみ作成する必要があります。**ユーザーを作成するには、[`keystore.createUser`](../../avalanchego-apis/keystore-api.md#keystore-createuser) を呼び出します。

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

レスポンスは次のようにしてください。

```cpp
{
     "jsonrpc":"2.0",
     "result":{"success":true},
     "id":1
}
```

JavaScript-JP-JP-Keystore データはノードレベルに存在します。1つのノードで作成したユーザーは、他のノードには存在しませんが、Keystoreからユーザーをインポート/エクスポートできます。[Keystore API](../../avalanchego-apis/keystore-api.md) を参照してください。

{% ヒント スタイル="danger" %}**Node に少量の資金だけを保管する必要があります。**資金のほとんどは、どのコンピュータにも保存されていないnemonicによって保護されるべきです。{% endhint %}

### アドレスを作成する

Avalancheは異種ブロックチェーンのプラットフォームであり、その1つは[X-Chain](../../../learn/platform-overview/#exchange-chain-x-chain)であり、デジタル資産の作成と取引のための分散型プラットフォームとして機能します。AVAXをノードに保持するアドレスを作成します。

X-Chainに新しいアドレスを作成するには、[`avm.createAddress`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createaddress) を呼び出します[。](../../avalanchego-apis/exchange-chain-x-chain-api.md)

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

ノードがブートストラップを終了していない場合、この呼び出しはstatus `503`を返します`。なぜなら、チェーンがブートストラップを終了していないため、メッセージAPIコールが拒否`されます。

このリクエストは `127.0.0.1:9650/ext/bc/X` まで行います。`bc/X` 部分は、リクエストがブロックチェーンに送られることを意味し`ます`。その ID \(またはエイリアス\)が X \(すなわち、X-Chain\) であることを意味します。

レスポンスは次のようになります:

```cpp
{
    "jsonrpc":"2.0",
    "id":2,
    "result" :{
        "address":"X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75"
    }
}
```

ユーザーがX-Chain上の`X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75`アドレスを制御するようになりました。異なるチェーン上のアドレスを分離するために、Avalanche規約は、それが存在するチェーンのIDまたはエイリアスを含めるアドレスです。`X-`-

### Avalancheウォレットからノードに資金を送る

{% ヒント スタイル="warning" %}_**注: 以下の手順は、実際の資金を移動します。**_{% endhint %}

Avalanche Walletから資金をノードに移動しましょう。

[Avalanche Wallet](https://wallet.avax.network)に移動します。`[ウォレットにアクセス]を`クリックし、[`Mnemonic Key Phrase`]をクリックします。Ne-Monic-Frase を入力します。

左側の[`Send`]タブをクリックします。amount については、select, `.002 AVAX.002`.JPノードのアドレスを入力し、`[確認`]をクリックします。

![Webウォレット送信タブ](../../../.gitbook/assets/web-wallet-send-tab%20%284%29%20%284%29%20%285%29%20%285%29%20%286%29%20%287%29%20%284%29%20%281%29%20%2819%29.png)

X-ChainのAPIの別のメソッドである`avm.getBalance`を呼び出すことで、特定のアセットのアドレスが残高を確認できます。転送が行ったことを確認しましょう:

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

AVAXには特別なID `AVAX`があります。通常、アセットIDは英数字の文字列です。

応答は`200万`nAVAXまたは`0.002 AVAX`を持っていることを示す必要があります。

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

### AVAXを送る

さて、AVAXをNodeに呼び出してみましょう。

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

`anum`-JP-JP-

変更先のアドレスを指定したい場合は、`changeAddr` で指定できます。このフィールドは空のままにできます。変更はユーザーコントロールするアドレスの一つに移動します。

Avalancheでは、スパムを防ぐために、トランザクション手数料の支払いが必要です。トランザクション手数料は、トランザクション発行時にユーザーが管理するアドレスから自動的に差し引かれます。あなたが下記の残高をチェックする際に注意してください。

--/../../learn/platform-overview/transaction-fees.md" %}

このリクエストを送信すると、ノードはユーザー名とパスワードを使用して認証します。JavaScript-JP[-](http://support.avalabs.org/en/articles/4587058-what-are-public-and-private-keys)JP-

レスポンスにはトランザクションのIDが含まれています。`Send の`呼び出しごとに異なります。

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

このトランザクションは、最終化に2-2回だけかかります。[`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus) でステータスを確認できます:

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

レスポンスはトランザクションが受け付けられたことを示す必要があります。

```cpp
{
    "jsonrpc":"2.0",
    "id"     :6,
    "result" :{
        "status":"Accepted"
    }
}
```

また、ネットワークがトランザクションをまだ確定していない場合、`ステータス`が`Processing`であることもわかります。

トランザクションが`Accepted`であることがわかったら、`to`アドレスの残高を確認して、AVAXが送信されたことを確認してください。

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

レスポンスは次のようにしてください。

```cpp
{
    "jsonrpc":"2.0",
    "id"     :7,
    "result" :{
        "balance":1000
    }
}
```

同じ方法で`X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75`を確認して、AVAXが残高と取引手数料から差し引かれていることを確認できます。

--validator.md" %}

--/../tools/avalanchejs/create-an-asset-on-the-x-chain.md" %}

--

--

--subnet.md" %}

--/../avalanchego-apis/" %}

--/../references/" %}

