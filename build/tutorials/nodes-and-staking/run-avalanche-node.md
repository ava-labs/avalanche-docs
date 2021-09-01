# Avalancheノードを実行する

Avalancheについて知るための最も迅速な方法は、ノードを実行し、ネットワークとやり取りすることです。

{% embed url="https://youtu.be/c_SjtCiOFdg" caption="" %}

このチュートリアル（最少時間：10分）では、以下のようにします：

* Avalancheノードをインストール、実行します。
* Avalancheに接続
* AVAXを送信する
* バリデータセットにノードを追加する

{% hint style="warning" %}FAQで問題が対応されていない場合は、[Avalanche Discord](https://chat.avax.network)でサポートしてください！我々は、いかなる障害を経験し、あなたに取り組んでいきます。{% endhint %}

{% hint style="info" %}サードパーティサービスを使用してノードがホスティングしたり、バリデータを実行することに興味がある場合は、[オプションをチェックしてください。](https://docs.avax.network/learn/community#blockchain-infrastructure-and-node-services){% endhint %}

このチュートリアルは、主にAvalancheプラットフォームがどのように動作するかに興味のある開発者や人々に向けたものです。ステーキングのためにノードをセットアップすることにちょうど興味がある場合、代わりに[Avalancheノードをセットアップ](set-up-node-with-installer.md)するチュートリアルをフォローする方法がお勧めです。インストール手順を自動化し、システムサービスとして設定します。まずこのチュートリアルをフォローして、その後、インストーラーを永久的なソリューションとして使用して、ノードを設定することもできます。

## 要件

Avalancheは非常に軽量なプロトコルです。ネットワークの使用量が増加するにつれて、ハードウェア要件が変化する可能性があることに留意してください。

* CPU：8AWS vCPU相当
* RAM：16 GB
* ストレージ:200 GB
* OS：Ubuntu 18.04/20.04あるいはMacOS >= Catalina

## Avalancheノードを実行し、資金を送付する

AvalancheノードでGo実装であるAvalancheGoをインストールし、Avalancheパブリックテストネットに接続しましょう。

### AvalancheGoをダウンロード

ノードは、バイナリプログラムです。ソースコードをダウンロードしてからバイナリプログラムを構築するか、事前にビルドされたバイナリをダウンロードすることができます。両方を行う必要はありません。

自身のノードを実行し、ステークを希望する場合、[事前にビルドされたバイナリ](run-avalanche-node.md#binary)のダウンロードがより簡単かつ推奨されます。

Avalanche上に構築しようとする開発者であれば、ソースからノードを構築することをお勧めします。

#### **ソースコード**

ソースからノードをビルドしたい場合、まずGo 1.15.5以降をインストールする必要があります。[ここに](https://golang.org/doc/install)記載されている指示に従ってください。

実行`go version`。**1.15.5以上でなければなりません。**実行`echo $GOPATH`。**空でないはずです。**

AvalancheGoリポジトリをダウンロード：

```cpp
go get -v -d github.com/ava-labs/avalanchego/...
```

上級ユーザーに注意してください。AvalancheGoは、Goモジュールを使用するので、[AvalancheGoリポジトリ](https://github.com/ava-labs/avalanchego)をGOPATH以外の場所にクローンすることができます。

ディレクトリに変更`avalanchego`：

```cpp
cd $GOPATH/src/github.com/ava-labs/avalanchego
```

AvalancheGoをビルドする：

```cpp
./scripts/build.sh
```

`avalanchego``avalanchego/build`バイナリは

#### **バイナリ**

自分で構築する代わりに、事前に構築されたバイナリをダウンロードしたい場合は、我々の[リリースページ](https://github.com/ava-labs/avalanchego/releases)に移動し、あなたが望むリリースを選択してください。（おそらく最新のものです。

下で`Assets`、適切なファイルを選択します。

MacOS：ダウンロード`avalanchego-macos-<VERSION>.zip`  `unzip avalanchego-macos-<VERSION>.zip`Unzip：結果として生じるフォルダは、バイナリを`avalanchego-<VERSION>`含みます。

PCやクラウドプロバイダー上のLinuxについて：`avalanchego-linux-amd64-<VERSION>.tar.gz`  Unzip：`tar -xvf avalanchego-linux-amd64-<VERSION>.tar.gz`  結果として生じるフォルダは、バイナリを含み`avalanchego-<VERSION>-linux`ます。

RaspberryPi4またはArm64ベースのコンピューター上のLinuxについて：ダウンロード：`avalanchego-linux-arm64-<VERSION>.tar.gz`  Unzip：`tar -xvf avalanchego-linux-arm64-<VERSION>.tar.gz`  結果として生じるフォルダは、バイナリを含み`avalanchego-<VERSION>-linux`ます。

### ノードを開始し、Avalancheに接続します

ソースから構築された場合：

```cpp
./build/avalanchego
```

MacOS上でビルド済みバイナリを使用する場合：

```cpp
./avalanchego-<VERSION>/build/avalanchego
```

Linux上で構築済みバイナリを使用する場合：

```cpp
./avalanchego-<VERSION>-linux/avalanchego
```

ノードが始まるとき、ブートストラップ（他のネットワークに追いつく）必要があります。ブートストラップに関するログが表示されます。指定されたチェーンがブートストラップが完了すると、次のようなログを出力します。

`INFO [06-07|19:54:06] <X Chain> /snow/engine/avalanche/transitive.go#80: bootstrapping finished with 1 vertices in the accepted frontier`

[`info.isBootstrapped`](../../avalanchego-apis/info-api.md#info-isbootstrapped)指定されたチェーンがブートストラップが完了するかどうかを確認するには、次のコマンドをコピーして別のターミナルウィンドウのコールでコピーします。

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

これが返した場合`true`、チェーンはブートストラップされます。ブートストラップが完了しないチェーンにAPI呼び出しをした場合、返却となります`API call rejected because chain is not done bootstrapping`。あなたのノードがブートストラップを完了しない場合[、まだ](http://support.avalabs.org/en/articles/4593908-is-my-node-done-bootstrapping)問題が発生している場合、Discordでご連絡ください[。](https://chat.avalabs.org/)

ノードが実行され、接続されています。メインネット上でバリデータとしてノードを使用する場合、ウェブウォレットを使用してバリデータとしてノードを追加する方法を[確認](add-a-validator.md#add-a-validator-with-avalanche-wallet)してください。

ノードを殺す`Ctrl + C`ために使用できます。

あなたのノードでテスト、プレイしたい場合は、以下を読んでください。

ノードがインクルード引数を起動する際に、他のマシンからAPI呼び出しが可能になるようにします`--http-host=`。`./build/avalanchego --http-host=`

メインネットではなく、富士テストネットに接続するには、引数を使用してください`--network-id=fuji`。Testnet上で[ファックセット](https://faucet.avax-test.network/)から資金を入手できます。

### キーストアユーザーを作成する

Avalancheノードは、組み込みのキーストアを提供します**。**Keystoreは、ユーザーを管理し、[ウォレット](http://support.avalabs.org/en/articles/4587108-what-is-a-blockchain-wallet)のように非常に美しいものです。ユーザーは、ブロックチェーンとやり取りする際にクライアントが使用できるパスワードで保護されたアイデンティティです。**ノードオペレータがプレーンテキストパスワードにアクセスできるようにするため、動作するノード上に鍵ストアユーザーを作成する必要があります。**ユーザを作成するには、次のように呼び出します[`keystore.createUser`](../../avalanchego-apis/keystore-api.md#keystore-createuser)。

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

応答は、次のようになります：

```cpp
{
     "jsonrpc":"2.0",
     "result":{"success":true},
     "id":1
}
```

現在、このノード上にユーザがいます。キーストアデータは、ノードレベルで存在します。1つのノードで作成したユーザーは、他のノード上に存在しませんが、キーストアにユーザーをインポート/エクスポートできます。[Keystore API](../../avalanchego-apis/keystore-api.md)を参照して、方法を確認してください。

{% hint style="danger" %}**少額の資金は、ノード上に保管する必要があります。**ほとんどの資金は、任意のコンピュータに保存できないmnemonicによって安全に保護される必要があります。{% endhint %}

### アドレスを作成

Avalancheは、異種ブロックチェーンのプラットフォームであり、[X-Chain](../../../learn/platform-overview/#exchange-chain-x-chain)であることです。これは、デジタルアセットを作成、取引のための分散型プラットフォームとして機能します。現在、AVAXをノード上に保持するためのアドレスを作成するようになりました。

X-Chain上で新しいアドレスを作成するには、[X](../../avalanchego-apis/exchange-chain-x-chain-api.md)-Chain APIのメソッド[`avm.createAddress`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createaddress)であることを呼び出します。

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

あなたのノードがブートストラップが完了しない場合、メッセージでステータス`503`が返されます。`API call rejected because chain is not done bootstrapping`

`127.0.0.1:9650/ext/bc/X`この要求を行います。この`bc/X`部分は、ID（またはエイリアス）がブロックチェーンに送信されることを意味します`X`。

レスポンスは次のようになります：

```cpp
{
    "jsonrpc":"2.0",
    "id":2,
    "result" :{
        "address":"X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75"
    }
}
```

X-Chain`X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75`上のアドレスをコントロールするようになりました。異なるチェーン上のアドレスを分散させるため、Avalanche条約は、存在するチェーンのIDまたはエイリアスを含めるアドレスです。したがって、このアドレスは始まり`X-`、X-Chain上に存在することを表します。

### Avalancheウォレットからノードに資金を送る

{% hint style="warning" %}注意_**：以下の手順**_{% endhint %}

Avalancheウォレットからノードに資金を移動しましょう。

[Avalancheウォレット](https://wallet.avax.network)に移動します。をクリックして`Access Wallet`、 `Mnemonic Key Phrase`。mnemonicフレーズを入力します。

左の`Send`タブをクリックします。金額については、選択、AVAX`.002`。ノードのアドレスを入力し、をクリックします`Confirm`。

![ウェブウォレット送信タブ](../../../.gitbook/assets/web-wallet-send-tab%20%284%29%20%284%29%20%285%29%20%285%29%20%286%29%20%287%29%20%284%29%20%281%29%20%2819%29.png)

X-Chain APIの別のメソッドである呼び出しにより`avm.getBalance`、指定されたアセットのアドレスが残っているかを確認することができます。トランスファーが経過したことを確認しましょう：

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

AVAXは特別IDを持っていることに注意してください`AVAX`。通常、アセットIDは、英数字の文字列です。

回答は、我々が持つか、`2,000,000 nAVAX`またはそのことを示す必要があります。`0.002 AVAX`

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

さて、我々のノードにAPIコールを行うことで、AVAXをいくつか送りましょう。

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

`amount`送信するnAVAX数を指定します。

変更が行われる特定のアドレスを指定したい場合、その中に指定できます`changeAddr`。このフィールドは空のままにすることができます。もしあなたがそうした場合、変更はユーザーがコントロールするアドレスの1つにアクセスされます。

スパムを防ぐためにAvalancheは、トランザクション手数料の支払いを必要とします。トランザクションを発行するときに、ユーザーがコントロールしたアドレスからトランザクション手数料が自動的に差し引かれます。以下の残高を確認する際に覚えておいてください。

{% page-ref page="../../../learn/platform-overview/transaction-fees.md" %}

このリクエストを送信すると、ノードはユーザー名とパスワードを使用して認証が行われます。その後、要求を満たすのに十分なAVAXが見つかるまで、ユーザーによってコントロールされるすべての[秘密鍵](http://support.avalabs.org/en/articles/4587058-what-are-public-and-private-keys)を探し出します。

レスポンスには、トランザクションのIDが含まれています。の呼び出しごとに異なります`send`。

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

#### トランザクションステータスを確認する

この取引は、完了するために1秒または2回しかかかるものではありません。我々は、ステータスを見ることができます[`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus)：

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

レスポンスは、トランザクションが受け付けられたことを示す必要があります。

```cpp
{
    "jsonrpc":"2.0",
    "id"     :6,
    "result" :{
        "status":"Accepted"
    }
}
```

`status`また、ネットワークがまだトランザクションをファイナリズしていないかどう`Processing`かもご覧いただけます。

トランザクションが存在すると確認されたら、`to`アドレスのバランスを確認して`Accepted`、我々が送付したAVAXが存在していることを確認します。

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

応答は、次のようになります：

```cpp
{
    "jsonrpc":"2.0",
    "id"     :7,
    "result" :{
        "balance":1000
    }
}
```

同じ方法で送付`X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75`したAVAXはバランスと取引手数料から差し引かれたことが確認できます。

{% page-ref page="add-a-validator.md" %}

{% page-ref page="../../tools/avalanchejs/create-an-asset-on-the-x-chain.md" %}

{% page-ref page="../platform/create-avm-blockchain.md" %}

{% page-ref page="../platform/create-custom-blockchain.md" %}

{% page-ref page="../platform/create-a-subnet.md" %}

{% page-ref page="../../avalanchego-apis/" %}

{% page-ref page="../../references/" %}

