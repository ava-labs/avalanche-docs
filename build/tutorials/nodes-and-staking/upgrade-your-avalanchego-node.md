# AvalancheGoノードをアップグレードする

{% embed url="https://youtu.be/o4Fww-sHoaQ" caption="" %}

## **ノードをバックアップする**

ノードをアップグレードする前に、ネットワークでノードを識別するのに使うstakerファイルをバックアップするよう推奨します。デフォルトのインストールでは、次のコマンドを実行してコピーできます。

```text
cd
cp ~/.avalanchego/staking/staker.crt .
cp ~/.avalanchego/staking/staker.key .
```

次に、`staker.crt`と`staker.key`ファイルをダウンロードし、安全にプライベートに保管します。ノードに何かが起こった場合やマシンノードが実行している場合、これらのファイルでノードを完全に再作成することができます。

開発目的でノードを使用し、ノードにキーストアユーザーがある場合は、それらもバックアップする必要があります。

## インストーラスクリプトを使用してインストールしたノード

[インストーラスクリプト](set-up-node-with-installer.md)でノードをインストールしてノードをアップグレードする場合は、再びインストーラスクリプトを実行します。

```text
./avalanchego-installer.sh
```

すでにAvalancheGoがインストールされていることを検知します。

```text
AvalancheGo installer
---------------------
Preparing environment...
Found 64bit Intel/AMD architecture...
Found AvalancheGo systemd service already installed, switching to upgrade mode.
Stopping service...
```

そしてノードを最新版にアップグレードし、その後ノードのバックアップを開始します。最新版の情報を印刷しておいてください。

```text
Node upgraded, starting service...
New node version:
avalanche/1.1.1 [network=mainnet, database=v1.0.0, commit=f76f1fd5f99736cf468413bbac158d6626f712d2]
Done!
```

これで完了です。ノードは最新のバージョンにアップグレードされています。

手動でノードをインストールする場合は、チュートリアルの後半に進んでください。

## **古いノードバージョンを停止する**

バックアップ後に、ノードのアップグレードを開始できます。現在実行しているバージョンを停止することから始めましょう。

### ターミナルから実行しているノード

ターミナルでノードを実行している場合は、`ctrl+c`を押して停止します。

### サービスとして実行しているノード

ノードをサービスとして実行している場合は、次を入力して停止します。

`sudo systemctl stop avalanchego.service`

（サービスには別の名前、`avalanche.service`、または類似の名前を付けることができます）

### バックグラウンドで実行しているノード

ノードをバックグラウンドで実行している場合（例えば　`nohup`で実行している）は、`ps aux | grep avalanche` を実行してノードを実行するプロセスを見つけます。これにより、次のような出力が生成されます。

```text
ubuntu  6834  0.0  0.0   2828   676 pts/1    S+   19:54   0:00 grep avalanche
ubuntu  2630 26.1  9.4 2459236 753316 ?      Sl   Dec02 1220:52 /home/ubuntu/build/avalanchego
```

この例では、2行目にノードに関する情報を表示しています。この場合、プロセスID、`2630`に注意してください。`kill -2 2630`を実行してノードを停止します。

これで、ノードの新しいバージョンをダウンロードする準備ができました。ソースコードをダウンロードし、バイナリプログラムを構築するか、構築済のバイナリをダウンロードすることができます。両方を行う必要はありません。

構築済のバイナリのダウンロードは簡単です。自分のノードを実行し、ステークしたい場合に推奨

Avalanche上で実験し、構築したい開発者である場合は、[ソースから](upgrade-your-avalanchego-node.md#build-from-source)ノードを構築することが推奨されます。

## **構築済のバイナリをダウンロードする**

自分で構築する代わりに構築済のバイナリをダウンロードする場合は、[リリースページ](https://github.com/ava-labs/avalanchego/releases)に移動し、希望するリリース（おそらく最新のもの）を選択します。

`Assets`で、適切なファイルを選択します。

MacOSの場合  ：ダウンロード`avalanchego-macos-<VERSION>.zip`  ：解凍：`unzip avalanchego-macos-<VERSION>.zip`  結果として生じるフォルダ、`avalanchego-<VERSION>`、はバイナリを含んでいます。

PCまたはクラウドプロバイダ上で動作するLinuxの場合  ：ダウンロード`avalanchego-linux-amd64-<VERSION>.tar.gz`  ：解凍：`tar -xvf avalanchego-linux-amd64-<VERSION>.tar.gz`  結果として生じるフォルダ、`avalanchego-<VERSION>-linux`、はバイナリを含んでいます。

RaspberryPi4または同様のArm64ベースのコンピュータで動作するLinuxの場合  ：ダウンロード`avalanchego-linux-arm64-<VERSION>.tar.gz`  ：解凍：`tar -xvf avalanchego-linux-arm64-<VERSION>.tar.gz`  結果として生じるフォルダ、`avalanchego-<VERSION>-linux`、はバイナリを含んでいます。

これで、ノードの新しいバージョンを実行する準備ができました。

### ターミナルからノードを実行する

MacOSであらかじめ構築されたバイナリを使用する場合：

```cpp
./avalanchego-<VERSION>/build/avalanchego
```

構築済のバイナリをLinux上で使用する場合：

```cpp
./avalanchego-<VERSION>-linux/avalanchego
```

バックグラウンドでノードを実行する場合は、コマンドの起動時に`nohup`を追加します。

### サービスとしてノードを実行する

サービスとしてノードを実行している場合は、古いバイナリを新しいものに置き換える必要があります。

`cp -r avalanchego-<VERSION>-linux/* <DIRECTORY_WITH_OLD_BINARIES>`

次に、`sudo systemctl start avalanchego.service`でサービスを再起動します。

## **ソースから構築する**

まず、Githubレポをクローンします（以前にこれを行っている場合は、この手順を省くことができます）。

```text
git clone https://github.com/ava-labs/avalanchego.git
```

次に、avalanchegoディレクトリに移動します。

```text
cd avalanchego
```

最新のコードをプルします。

```text
git pull
```

注意：マスターブランチが最新のリリースタグで更新されていない場合は、`git pull`ではなく、まず`git fetch --all --tags`そして`git checkout --force tags/<tag>`（`<tag>`が最新リリースタグ、例えば`v1.3.2`）を実行して直接入手できます。ローカルコピーは「切り離されたHEADの状態」状態になりますが、これはリポジトリにプッシュしたいソースに変更を行わない場合は問題ではありません（この場合は、ブランチ、そして通常のマージを確認してください）。また、`--force`フラグがローカルの変更を全て無視することに注意してください。

ローカルコードが最新であることを確認します。次を行います。

```text
git rev-parse HEAD
```

そして、印刷された最初の7文字が[Github](https://github.com/ava-labs/avalanchego)の最新コミットフィールドと一致することを確認します。

注意：`git checkout tags/<tag>`を使用した場合、これら最初の7文字はそのタグのコミットハッシュと一致する必要があります。

では、バイナリを構築しましょう。

```text
./scripts/build.sh
```

これは印刷する必要があります。

```text
Build Successful
```

実行しているバージョンは、次を実行して確認できます。

```text
./build/avalanchego --version
```

次でノードを実行することができます。

```text
./build/avalanchego
```

