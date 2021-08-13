# ノードバックアップと復元

ノードが起動して実行されたら、災害復旧に備える時です。ハードウェアやソフトウェアの問題、あるいは自然災害の場合でも、マシンが壊滅的な障害を抱えている場合、バックアップをすることにより、そのような状況に備えるのが最善です。

JavaScript-JP-JP-このような大量のデータをバックアップして復元する必要がある場合、コストがかかり、複雑で時間がかかる場合があります。幸いにも、より良い方法があります。

すべてのものをバックアップして復元する代わりに、ノードに固有のものであるため、再構築できないファイルだけをバックアップする必要があります。Avalanchegoノードでは、一意のファイルは、ネットワーク上のノードを識別するもの、つまりNodeIDを定義するファイルです。インストール自体は、新しいマシンにノードをインストールすることによって簡単に再作成でき、残りのギガバイトもブロックチェーンデータは、他のネットワークピアからデータをコピーするブートストラップのプロセスによって簡単に再作成できます。

たとえノードがネットワーク上のバリデータであり、複数のデリゲーションを有する場合でも、他のデリゲーションをバックアップする必要はありません。なぜなら、バリデーションとデリジェーショントランザクションはブロックチェーンに保存され、ブートストラップ中に復元されます。

## NodeID-JP

NodeIDは、Nodeをネットワーク上の他のすべてのピアと区別する一意の識別子です。`NodeID-5mb46qkSBj81k9g9e4VFjGSbaaSLFRzD` のような文字列です。NodeIDの構築方法の技術的背景を確認できます[。](../../references/cryptographic-primitives.md#tls-addresses)本質的に、NodeIDは2つのファイルで定義されます。

* `staker.crt`
* `staker.key`

デフォルトのインストールでは、working ディレクトリに、特に `~/.avalanchego/staking/` に記載されています。Nodeを別のマシンで再作成するために必要なのは、それらの同じ2つのファイルで新しいインストールを実行することだけです。

{% ヒント スタイル="warning" %}ユーザーがノードのキーストアで定義されている場合は、それらのユーザーもバックアップおよび復元する必要があります。[Keystore API](../../avalanchego-apis/keystore-api.md)にはユーザーキーのエクスポートおよびインポートに使用できるメソッドがあります。Keystore API は開発者だけが使用し、本番ノードで使用するものではありません。keystore API が何であるかわからなくて、それを使っていない場合は、心配する必要はありません。{% endhint %}

## JPB-JP-JP

ノードをバックアップするには、`staker.crt` および `staker.key` ファイルを、クラウド、USB stick または類似のプライベート ストレージに保存する必要があります。複数の安全な場所にそれらを保存することは、安全性が向上します。

{% ヒント スタイル="warning" %}誰かがステーカーファイルを保持した場合、ノードではなくウォレットの秘密鍵で管理されているため、資金にアクセスすることはできません。しかし、ノードをどこか別の場所で再作成できます。そして、状況によってはステーキング報酬が失われます。Staker ファイルが安全であることを確認してください。{% endhint %}

Staker ファイルをノードを実行しているマシンから取得しましょう。

### Local node から

ノードをローカルに実行している場合は、デスクトップコンピューターで、ファイルがどこにあるかに移動して、安全な場所にコピーしてください。

Linux インストールでは、それらのパスが `/home/USERNAME/.avalanchego/staking/``` になります。そこからファイルを選択してコピーします。ノードを停止する必要はありません。

### `scp` を使用したリモートノードから

`scp` は、'secure copy' コマンドラインプログラムであり、Linux および MacOS コンピューターで利用可能な組み込みです。[PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)パッケージの一部として、Windows版`pscp`もあります。`pscp` を使う場合、次のコマンドで `scp` の各使用法を `pscp -scp` に置き換えます。

ノードからファイルをコピーするには、マシンにリモートでログインできる必要があります。アカウントパスワードを使用できますが、SSHキーを使用する方法で推奨される方法はあります。SSH キーの取得と設定手順は、クラウドプロバイダーとマシン構成に大きく依存しています。[Amazon Web Services](setting-up-an-avalanche-node-with-amazon-web-services-aws.md) および [Microsoft Azure](set-up-an-avalanche-node-with-microsoft-azure.md) 設定ガイドを参照してください。他のプロバイダーには同様の手順があります。

マシンにリモートログインする手段がある場合、次のコマンドでファイルをコピーできます。

```text
scp -r ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking ~/avalanche_backup
```

これにより、マシン上のユーザー名が `ubuntu` であることを想定し、異なる場合には両方の場所で正しいユーザー名を置き換えます。また、`PUBLICIP`をマシンの実際のパブリックIPに置き換えます。`scp` が自動的にダウンロードした SSH キーを使用しない場合は、手動でそれを指すことができます:

```text
scp -i /path/to/the/key.pem -r ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking ~/avalanche_backup
```

実行すると、このコマンドは、`avalanche_backup`ディレクトリをホームディレクトリに作成し、ステーカーファイルを保存します。

## JPY-JPY-J

ノードをバックアップから復元するには、逆の処理を行う必要があります。`staker.key`と`staker.crt`をバックアップからノードの作業ディレクトリに戻します。

まず、通常のノードの[インストール](set-up-node-with-installer.md)を行う必要があります。これにより新しいNodeIDが生成されます。これにより、置き換える必要があります。ノードが正しくインストールされたら、ノードが実行されているマシンにログインして、それを停止します。

```text
sudo systemctl stop avalanchego
```

ノードを復元する準備ができました。

### ローカルノードへ

ノードをローカルに実行している場合は、`staker.key`と`staker.crt`ファイルをバックアップの場所からワーキングディレクトリにコピーします。これは、デフォルトのLinuxインストールでは`/home/USERNAME/.avalanchego/staking/`です。`USERNAME` をノードを実行するために使用する実際のユーザー名に置き換えます。

### `scp`を使ってリモートノードへ

繰り返しますが、プロセスはただ逆操作です。`scp` を使用すると、`staker.key` と `staker.crt` ファイルをバックアップの場所からリモート作業ディレクトリにコピーする必要があります。バックアップされたファイルが上記のバックアップ手順でそれらを配置したディレクトリにあります。

```text
scp ~/avalanche_backup/staker.* ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking
```

または、SSH キーへのパスを指定する必要がある場合:

```text
scp -i /path/to/the/key.pem ~/avalanche_backup/staker.* ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking
```

また、`ubuntu`を正しいユーザー名に置き換え、`PUBLICIP`はノードを実行しているマシンの実際のパブリックIPと、使用された場合SSHキーへのパスです。

### Nodeを再起動して検証

ファイルが置き換えられたら、マシンにログインし、次のようにノードを起動します。

```text
sudo systemctl start avalanchego
```

これで、前のコマンドを実行したのと同じコンソールで [getNodeID](https://docs.avax.network/build/avalanchego-apis/info-api#info-getnodeid) API コールを発行することで、正しいNodeIDでノードが復元されているかを確認できます。

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

元のNodeIDが表示されます。復元プロセスが完了します。

## JavaScript-JP-JP-

ノードを保護する上で欠かせない部分は、ノードの完全かつ痛みのない復元を可能にするバックアップです。このチュートリアルに続いて、あなたはあなたが今まであなたが最初からあなたのノードを復元する必要がある状況で自分自身を見つけるべきであることを知って簡単に安心できます, あなたは簡単かつ迅速にそうすることができます.

このチュートリアルに続いて問題がある場合、コメントを共有したい、またはチャットしたい場合、[Discord](https://chat.avalabs.org/)サーバーで私たちに連絡することができます。

