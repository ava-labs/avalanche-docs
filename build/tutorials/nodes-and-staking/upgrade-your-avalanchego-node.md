# AvalancheGoノードをアップグレードする

{% embed url="https://youtu.be/o4Fww-sHoaQ" caption=""" %}

## **ノードのバックアップ**

ノードをアップグレードする前に、ネットワーク上のノードを識別するために使用するステーカーファイルをバックアップすることをお勧めします。デフォルトのインストールでは、以下のコマンドを実行することで、それらをコピーできます。

```text
cd
cp ~/.avalanchego/staking/staker.crt .
cp ~/.avalanchego/staking/staker.key .
```

次に、`staker.crt`と`staker.key`ファイルをダウンロードし、それらを安全でプライベートな場所に保管してください。ノードやマシンノードが実行される場合、これらのファイルを使用してノードを完全に再作成できます。

Node を開発目的で使用し、keystore ユーザーをノードに持っている場合は、それらもバックアップする必要があります。

## Nodeがインストールされたインストーラスクリプト

Node をインストールした場合、Node をアップグレードするには[、インストーラ・スクリプト](set-up-node-with-installer.md)を再度実行してください。

```text
./avalanchego-installer.sh
```

AvalancheGoがすでにインストールされていることを検出します:

```text
AvalancheGo installer
---------------------
Preparing environment...
Found 64bit Intel/AMD architecture...
Found AvalancheGo systemd service already installed, switching to upgrade mode.
Stopping service...
```

それからノードを最新バージョンにアップグレードし、終了後、ノードバックアップを開始し、最新バージョンに関する情報を出力します。

```text
Node upgraded, starting service...
New node version:
avalanche/1.1.1 [network=mainnet, database=v1.0.0, commit=f76f1fd5f99736cf468413bbac158d6626f712d2]
Done!
```

それで、ノードは最新バージョンにアップグレードされます。

ノードを手動でインストールした場合は、チュートリアルの残りの部分を進みます。

## **古いノードバージョンを停止します。**

バックアップが保護されたら、ノードのアップグレードを開始できます。JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-Java

### Terminal から実行するノード

Node がターミナルで動作している場合、`ctrl+c` を押して停止します。

### Node as a service as a JavaScript.

Node がサービスとして実行されている場合は、次のように入力して停止します。

`sudo systemctl stop avalanchego.service.jp`

\(サービスは異なる名前で、`avalanche.service`、または類似\)

### ノードがバックグラウンドで実行

ノードがバックグラウンド \(`nohup`で実行することにより、例えば\)で実行されている場合、`ps aux | grep avalanche`を実行してノードを実行するプロセスを見つけます。これは次のように出力します:

```text
ubuntu  6834  0.0  0.0   2828   676 pts/1    S+   19:54   0:00 grep avalanche
ubuntu  2630 26.1  9.4 2459236 753316 ?      Sl   Dec02 1220:52 /home/ubuntu/build/avalanchego
```

この例では、2行目にノードに関する情報を示します。`JP-JP-``kill -2 2630` を実行してノードを停止します。

今すぐノードの新しいバージョンをダウンロードする準備ができました。JavaScript-JP-JP-両方を行う必要はありません。

ビルド済みのバイナリのダウンロードは簡単で、自分のノードを実行し、それを賭けているだけなら推奨されます。

Avalanche 上で実験し、ビルドを探している開発者なら、[ソースから](upgrade-your-avalanchego-node.md#build-from-source)ノードをビルドすることをお勧めします。

## **Binaryのダウンロード**

自分でビルドするのではなく、事前ビルド済みバイナリをダウンロードしたい場合は、 私たちの[リリースページ](https://github.com/ava-labs/avalanchego/releases)に移動し、必要なリリース \(おそらく最新のもの)を選択します。\)

`Assets` で、適切なファイルを選択します。

MacOSの場合:  ダウンロード: `avalanchego-macos-<VERSION>.zip`  `JP-JP-`  結果として生成されるフォルダ `avalanchego-<VERSION>` はバイナリーを含んでいます。

Linux または PC またはクラウドプロバイダーの場合：  ダウンロード: `avalanchego-linux-amd64-<VERSION>.tar.gz`  `JavaScript-JP-JP-`  `JavaScript-JP-JP-`

RaspberryPi4または類似のArm64ベースのコンピューターのLinuxの場合：  ダウンロード: `avalanchego-linux-arm64-<VERSION>.tar.gz`  `JavaScript-JP-JP-`  `JavaScript-JP-JP-`

これで、ノードの新しいバージョンを実行する準備ができました。

### Terminal からノードを実行する

MacOSでビルド済みバイナリを使用している場合:

```cpp
./avalanchego-<VERSION>/build/avalanchego
```

Linuxでビルド済みバイナリを使用している場合:

```cpp
./avalanchego-<VERSION>-linux/avalanchego
```

ノードをバックグラウンドで実行する場合は、コマンドの開始時に`nohup`を追加します。

### Node をサービスとして実行する

Node をサービスとして実行している場合は、古いバイナリを新しいバイナリに置き換える必要があります。

`-r-avalanchego-<VERSION-Linux-*-<DIRECTORY_WITH_OLD_BINARIES-JP/JP/`

そして、`sudo systemctl start avalanchego.service`でサービスを再起動します。

## **ソースからのビルド**

まずGithub repo \(この手順をスキップすることができます):

```text
git clone https://github.com/ava-labs/avalanchego.git
```

次に avalanchego ディレクトリに移動します:

```text
cd avalanchego
```

最新のコードを引っ張ります:

```text
git pull
```

注: master ブランチが最新のリリースタグで更新されて`い```ない場合、`git pull` ではなく `git fetch --all --tags` を実行してから直接`取得`できます。ローカルコピーは、'detached HEAD' 状態になります。これは、リポジトリ \(その場合、ブランチや通常の merges\) にチェックアウトする必要があります。`--force` フラグは、ローカル変更を無視することにも注意してください。

ローカルコードが最新であることを確認してください。Do:

```text
git rev-parse HEAD
```

Jithub では、最初の 7 文字が表示されていたことを確認します[。](https://github.com/ava-labs/avalanchego)

NOTE: `git checkout tags/<tag>` を使用した場合、これらの最初の 7 文字はそのタグのコミットハッシュにマッチする必要があります。

次にバイナリをビルドします:

```text
./scripts/build.sh
```

これは印刷する必要があります:

```text
Build Successful
```

実行しているバージョンを確認できます:

```text
./build/avalanchego --version
```

ノードを実行できます:

```text
./build/avalanchego
```

