# AvalancheGoノードをアップグレードする

{% embed url="https://youtu.be/o4Fww-sHoaQ" caption="" %}

## **ノードをバックアップ**

ノードをアップグレードする前に、ネットワーク上のノードを識別するために使用されるステーカーファイルをバックアップすることをお勧めします。デフォルトのインストールでは、以下のコマンドを実行してコピーすることができます。

```text
cd
cp ~/.avalanchego/staking/staker.crt .
cp ~/.avalanchego/staking/staker.key .
```

その後、ダウンロード`staker.crt`して`staker.key`ファイルを、安全かつプライベートな場所に保管します。ノードに発生した場合、マシンノードが実行される場合、これらのファイルを使用して、完全にノードを再現することができます。

開発目的でノードを使用し、あなたのノード上にキーストアユーザーがいる場合、バックアップも行わなければなりません。

## インストーラスクリプトを使用してインストールされたノード

インストーラースクリプトを使用してノードをインストールしてノードをアップグレードする場合[、](set-up-node-with-installer.md)インストーラースクリプトを再度実行してください。

```text
./avalanchego-installer.sh
```

すでにAvalancheGoがインストールされていると検出されます：

```text
AvalancheGo installer
---------------------
Preparing environment...
Found 64bit Intel/AMD architecture...
Found AvalancheGo systemd service already installed, switching to upgrade mode.
Stopping service...
```

その後、ノードを最新バージョンにアップグレードし、完了後、ノードバックアップを始めて、最新バージョンについての情報をプリントアウトします：

```text
Node upgraded, starting service...
New node version:
avalanche/1.1.1 [network=mainnet, database=v1.0.0, commit=f76f1fd5f99736cf468413bbac158d6626f712d2]
Done!
```

つまり、ノードは最新バージョンにアップグレードされます。

手動でノードをインストールした場合、残りのチュートリアルの手順を進めてください。

## **古いノードバージョンを停止する**

バックアップが安全化された後、ノードのアップグレードを開始することができます。まず、現在実行中のバージョンを停止します。

### ターミナルから実行されるノード

ターミナルでノードが実行されている場合、押すことで停止します`ctrl+c`。

### サービスとして実行するノード

あなたのノードがサービスとして実行されている場合、以下のように入力して停止してください。

`sudo systemctl stop avalanchego.service`

`avalanche.service`（あなたのサービスは、異なる名前が付かない、または類似の場合があります。）

### バックグラウンドで実行されるノード

（例えば実行で実行することにより）あなたのノードがバックグラウンドで実行されている場合`nohup`、実行してノードを実行するプロセスを見つける`ps aux | grep avalanche`。これにより以下のような出力が生成されます：

```text
ubuntu  6834  0.0  0.0   2828   676 pts/1    S+   19:54   0:00 grep avalanche
ubuntu  2630 26.1  9.4 2459236 753316 ?      Sl   Dec02 1220:52 /home/ubuntu/build/avalanchego
```

この例では、2番目の行目に、ノードに関する情報を示します。この場合、プロセスidに注意してください`2630`。実行でノードを停止します`kill -2 2630`。

これで、ノードの新しいバージョンをダウンロードする準備が完了しました。ソースコードをダウンロードしてからバイナリプログラムを構築するか、事前にビルドされたバイナリをダウンロードすることができます。両方を行う必要はありません。

自身のノードを実行し、ステークを希望する場合、事前にビルドされたバイナリのダウンロードがより簡単かつ推奨されます。

Avalanche上に構築しようとする開発者であれば、[ソースから](upgrade-your-avalanchego-node.md#build-from-source)ノードを構築することをお勧めします。

## **事前にビルドされたバイナリをダウンロードする**

自分で構築する代わりに、事前に構築されたバイナリをダウンロードしたい場合は、我々の[リリースページ](https://github.com/ava-labs/avalanchego/releases)に移動し、あなたが望むリリースを選択してください。（おそらく最新のものです。

下で`Assets`、適切なファイルを選択します。

MacOS：  ダウンロード：`avalanchego-macos-<VERSION>.zip`  Unzip：`unzip avalanchego-macos-<VERSION>.zip`  結果として生じるフォルダは、バイナリを含み`avalanchego-<VERSION>`ます。

PCやクラウドプロバイダー上のLinux  ダウンロード：`avalanchego-linux-amd64-<VERSION>.tar.gz`  Unzip：`tar -xvf avalanchego-linux-amd64-<VERSION>.tar.gz`  結果として生じるフォルダは、バイナリを含み`avalanchego-<VERSION>-linux`ます。

RaspberryPi4またはArm64ベースのコンピューター上のLinuxについて：  ダウンロード：`avalanchego-linux-arm64-<VERSION>.tar.gz`  Unzip：`tar -xvf avalanchego-linux-arm64-<VERSION>.tar.gz`  結果として生じるフォルダは、バイナリを含み`avalanchego-<VERSION>-linux`ます。

ノードの新しいバージョンを実行する準備が完了しました。

### ターミナルからノードを実行する

MacOS上でビルド済みバイナリを使用する場合：

```cpp
./avalanchego-<VERSION>/build/avalanchego
```

Linux上で構築済みバイナリを使用する場合：

```cpp
./avalanchego-<VERSION>-linux/avalanchego
```

バックグラウンドでノードを実行したい場合は、コマンドの開始`nohup`時に追加します。

### サービスとしてノードを実行する

サービスとしてノードを実行する場合、古いバイナリを新しいバイナリに置き換える必要があります。

`cp -r avalanchego-<VERSION>-linux/* <DIRECTORY_WITH_OLD_BINARIES>`

その後、サービスを再起動します`sudo systemctl start avalanchego.service`。

## **ソースからビルド**

Githubレポをまずクローンします（以前に行ったことがある場合は、このステップはスキップできます）：

```text
git clone https://github.com/ava-labs/avalanchego.git
```

その後、avalanchegoディレクトリに移動します：

```text
cd avalanchego
```

最新コードをプルします：

```text
git pull
```

`<tag>`注意：マスターブランチが最新のリリースタグで更新されていない場合、代わり`v1.3.2`に最初の実行経由で`git checkout --force tags/<tag>`直接アクセスすることができます`git fetch --all --tags`。`git pull`ローカルコピーは、「分離されたHEAD」状態になります。これは、リポジトリにプッシュしたいソースに変更を加わさない場合、問題ではありません。（その場合、ブランチや通常のマージにチェックアウトする必要があります）また、`--force`フラグは、あなたが持つ可能性のあるローカル変更を無視することに注意してください。

ローカルコードが最新であることを確認します。やる：

```text
git rev-parse HEAD
```

そして、最初の7文字が印刷された[、](https://github.com/ava-labs/avalanchego)Github上の最新コミットフィールドと一致することを確認します。

注意：その後、これらの最初の7文字を用いれば`git checkout tags/<tag>`、そのタグのコミットハッシュと一致する必要があります。

さて、バイナリをビルドする：

```text
./scripts/build.sh
```

これは、印刷する必要があります：

```text
Build Successful
```

以下のことを行うことで実行しているバージョンを確認できます。

```text
./build/avalanchego --version
```

ノードを実行できます：

```text
./build/avalanchego
```

