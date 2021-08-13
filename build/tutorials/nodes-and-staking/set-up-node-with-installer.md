# Avalancheノードを実行する

AvalancheGo をコンピュータにインストールするシェル \(bash\) スクリプトがあります。このスクリプトは、ユーザー入力が必要なくても数分でノードを実行するように設定します。

## 始める前に

このインストールスクリプトは次のようにします。

* OS: Ubuntu 18.04 または 20.04 \(Sorry, MacOS, Windows NT-JP サポートされていない\)
* AvalancheGoは実行されていませんし、すでにサービスとしてインストールされていません
* スクリプトを実行しているユーザーにはスーパーユーザー権限があります \(`sudo`\ を実行できます)

### 環境への配慮

Linux の別のフレーバーを実行すると、スクリプトは意図した通りに動作しないかもしれません。`Systemd` はシステムサービスの実行に使用されることを想定しています。他のLinuxフレーバーは何か他のものを使うかもしれませんし、スクリプトによって想定されるとは異なる場所にファイルがあるかもしれません。

コンピューター上で既にノードが実行されている場合は、スクリプトを実行する前にそれを停止します。

#### Terminal から実行するノード

Node がターミナルで動作している場合、`ctrl+C` を押して停止します。

#### Node as a service as a JavaScript.

Node がすでにサービスとして実行されている場合、おそらくこのスクリプトは必要ありません。- 行って良かったわ

#### バックグラウンドで実行するノード

ノードがバックグラウンド \(`nohup`で実行することにより、例えば\)で実行されている場合、`ps aux | grep avalanche`を実行してノードを実行するプロセスを見つけます。これは次のように出力します:

```text
ubuntu  6834  0.0  0.0   2828   676 pts/1    S+   19:54   0:00 grep avalanche
ubuntu  2630 26.1  9.4 2459236 753316 ?      Sl   Dec02 1220:52 /home/ubuntu/build/avalanchego
```

`grep` を持っていない行を探します。この例では、それが 2 行目です。ノードに関する情報が表示されます。`JP-JP-``kill -2 2630` を実行してノードを停止します。

#### ノード作業ファイル

AvalancheGoノードがこのコンピュータで以前に実行された場合、`$HOME/.avalanchego`ディレクトリにローカルノードファイルが保存されます。これらのファイルは乱されず、スクリプトで設定されたノードは、以前と同じIDで動作し、ステートメントを続けます。つまり、ノードのセキュリティのために、`staker.crt`と`staker.key`ファイルをバックアップして、`$HOME/.avalanchego/staking`に保存します。必要な場合は、これらのファイルを使用して別のコンピューターでノードを再作成できます。この[チュートリアル](node-backup-and-restore.md)では、バックアップと復元手順についてご覧ください。

### ネットワークに関する考慮事項

AvalancheGoはネットワークポート`9651`でインターネットからの接続を受け入れる必要があります。NetBeans IDE 6.1 では、NetBeans IDE 6.1 では、NetBeans IDE 6.1 では、NetBeans IDE 6.1 では、NetBeans IDE 6.1 では、NetBeans IDE 6.1 では、NetBeans IDE 6.1 では、NetBeans IDE 6.1 では、NetBeans IDE 6.1 では、NetBeans IDE 6.1 では、

#### クラウドプロバイダーでの実行

クラウドプロバイダーコンピューター・インスタンスでノードが実行されている場合、静的IPが存在します。JP-JP-このスクリプトは IP を自分で調べることを試みますが、それはすべての環境で動作しない可能性がありますので、IP をチェックするか、自分で入力する必要があります。

#### ホーム接続で実行する

家庭用インターネット接続にあるコンピューターでノードを実行している場合、動的IPがあります。つまり、IPは定期的に変化します。installスクリプトは、その状況に合わせてノードを適切に設定します。しかし、ホーム接続のためには、ノードがインストールされているコンピューターへのポート`9651`のインバウンドポート転送を設定する必要があります。

モデルやルーターの設定が多すぎるため、何をすべきかについての指示はでき[ませ](https://www.howtogeek.com/66214/how-to-forward-ports-on-your-router/)んが、オンラインガイド([この](https://www.noip.com/support/knowledgebase/general-port-forwarding-guide/)ような \)が見つかるかもしれません。

## スクリプトの実行

それで、システムを準備し、情報の準備ができましたら、それに到達しましょう。

スクリプトをダウンロードして実行するには、次のように入力します。

```bash
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/avalanchego-installer.sh;\
chmod 755 avalanchego-installer.sh;\
./avalanchego-installer.sh
```

- もうすぐ！出力は次のようになります:

```text
AvalancheGo installer
---------------------
Preparing environment...
Found arm64 architecture...
Looking for the latest arm64 build...
Will attempt to download:
 https://github.com/ava-labs/avalanchego/releases/download/v1.1.1/avalanchego-linux-arm64-v1.1.1.tar.gz
avalanchego-linux-arm64-v1.1.1.tar.gz 100%[=========================================================================>]  29.83M  75.8MB/s    in 0.4s
2020-12-28 14:57:47 URL:https://github-production-release-asset-2e65be.s3.amazonaws.com/246387644/f4d27b00-4161-11eb-8fb2-156a992fd2c8?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20201228%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20201228T145747Z&X-Amz-Expires=300&X-Amz-Signature=ea838877f39ae940a37a076137c4c2689494c7e683cb95a5a4714c062e6ba018&X-Amz-SignedHeaders=host&actor_id=0&key_id=0&repo_id=246387644&response-content-disposition=attachment%3B%20filename%3Davalanchego-linux-arm64-v1.1.1.tar.gz&response-content-type=application%2Foctet-stream [31283052/31283052] -> "avalanchego-linux-arm64-v1.1.1.tar.gz" [1]
Unpacking node files...
avalanchego-v1.1.1/plugins/
avalanchego-v1.1.1/plugins/evm
avalanchego-v1.1.1/avalanchego
Node files unpacked into /home/ubuntu/avalanche-node
```

そして、スクリプトはネットワーク環境に関する情報を求めます:

```text
To complete the setup some networking information is needed.
Where is the node installed:
1) residential network (dynamic IP)
2) cloud provider (static IP)
Enter your connection type [1,2]:
```

JP-JP`-```SPARC-JP-JP-J

```text
Detected '3.15.152.14' as your public IP. Is this correct? [y,n]:
```

検出されたIPが間違っているかどうか`、n```で確認し、次のプロンプトで正しいIPを入力します。

その後、スクリプトはシステムサービスの作成を続け、サービスを開始して終了します。

```text
Installing service with public IP: 3.15.152.14
Created symlink /etc/systemd/system/multi-user.target.wants/avalanchego.service → /etc/systemd/system/avalanchego.service.

Done!

Your node should now be bootstrapping on the main net.
Node configuration file is /home/ubuntu/.avalanchego/configs/node.json
To check that the service is running use the following command (q to exit):
sudo systemctl status avalanchego
To follow the log use (ctrl+C to stop):
sudo journalctl -u avalanchego -f

Reach us over on https://chat.avax.network if you're having problems.
```

スクリプトが終了し、システムプロンプトが再び表示されます。

## Post installation-JP

AvalancheGoはサービスとしてバックグラウンドで実行する必要があります。JavaScript-JP-JP-

```bash
sudo systemctl status avalanchego
```

これによりノードの最新のログが表示されます。これは次のように表示されます:

```text
● avalanchego.service - AvalancheGo systemd service
Loaded: loaded (/etc/systemd/system/avalanchego.service; enabled; vendor preset: enabled)
Active: active (running) since Tue 2021-01-05 10:38:21 UTC; 51s ago
Main PID: 2142 (avalanchego)
Tasks: 8 (limit: 4495)
Memory: 223.0M
CGroup: /system.slice/avalanchego.service
└─2142 /home/ubuntu/avalanche-node/avalanchego --dynamic-public-ip=opendns --http-host=

Jan 05 10:38:45 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:45] <P Chain> avalanchego/vms/platformvm/vm.go#322: initializing last accepted block as 2FUFPVPxbTpKNn39moGSzsmGroYES4NZRdw3mJgNvMkMiMHJ9e
Jan 05 10:38:45 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:45] <P Chain> avalanchego/snow/engine/snowman/transitive.go#58: initializing consensus engine
Jan 05 10:38:45 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:45] avalanchego/api/server.go#143: adding route /ext/bc/11111111111111111111111111111111LpoYY
Jan 05 10:38:45 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:45] avalanchego/api/server.go#88: HTTP API server listening on ":9650"
Jan 05 10:38:58 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:58] <P Chain> avalanchego/snow/engine/common/bootstrapper.go#185: Bootstrapping started syncing with 1 vertices in the accepted frontier
Jan 05 10:39:02 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:02] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: fetched 2500 blocks
Jan 05 10:39:04 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:04] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: fetched 5000 blocks
Jan 05 10:39:06 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:06] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: fetched 7500 blocks
Jan 05 10:39:09 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:09] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: fetched 10000 blocks
Jan 05 10:39:11 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:11] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: fetched 12500 blocks
```

`JavaScript`-JP`-`JP-

NodeID を確認するには、次のコマンドを実行します。

```bash
sudo journalctl -u avalanchego | grep "NodeID"
```

それは次のように出力します:

```text
Jan 05 10:38:38 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:38] avalanchego/node/node.go#428: Set node's ID to 6seStrauyCnVV7NEVwRbfaT9B6EnXEzfY
```

NodeID--`を`取得する値に、`NodeID-6seStrauyCnVV7NEVwRbfaT9B6EnXEzfY`を準備します。それを保存します。ノードをステーキングまたは検索するために必要です。

Node はブートストラップのプロセスにあるはずです。進捗状況を監視するには、次のコマンドを発行します。

```bash
sudo journalctl -u avalanchego -f
```

ノード出力の読み込みを停止したい場合は、`ctrl+C`を押します。

## Node の停止

AvalancheGoを停止するには、次のように実行します。

```bash
sudo systemctl stop avalanchego
```

JavaScript-JP-JP-

```bash
sudo systemctl start avalanchego
```

## ノードアップグレード

AvalancheGoは現在進行中のプロジェクトであり、定期的なバージョンアップが行われています。ほとんどのアップグレードは推奨されますが、必要ありません。後方互換性がないアップグレードについては、事前通知が表示されます。新しいバージョンのノードがリリースされると、次のようなログ行に気付きます:

```text
Jan 08 10:26:45 ip-172-31-16-229 avalanchego[6335]: INFO [01-08|10:26:45] avalanchego/network/peer.go#526: beacon 9CkG9MBNavnw7EVSRsuFr7ws9gascDQy3 attempting to connect with newer version avalanche/1.1.1. You may want to update your client
```

新しいバージョンではバグ修正、新機能、アップグレードが行われているため、常に最新バージョンにアップグレードすることをお勧めします。

Node をアップグレードするには、インストーラ・スクリプトを実行します。

```bash
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

## Node 構成

ノード操作を設定するファイルは`~/.avalanchego/configs/node.json`です。設定オプションを追加または変更することができます。設定オプションのドキュメントは[こちら](../../references/command-line-interface.md)からご覧ください。デフォルトの設定は次のようになります:

```javascript
{
  "dynamic-public-ip": "opendns",
  "http-host": ""
}
```

コンフィギュレーションファイルは`JSON`ファイルで正しくフォーマットされている必要が`あり`ますので、スイッチはコマンドラインと異なるフォーマットでフォーマットされています。

## 前のバージョンの使用

インストーラースクリプトは、最新バージョン以外にAvalancheGoのバージョンをインストールするためにも使用できます。

インストール可能なバージョンのリストを表示するには、次のようにします。

```bash
./avalanchego-installer.sh --list
```

これは、次のようなものを印刷します。

```text
AvalancheGo installer
---------------------
Available versions:
v1.3.2
v1.3.1
v1.3.0
v1.2.4-arm-fix
v1.2.4
v1.2.3-signed
v1.2.3
v1.2.2
v1.2.1
v1.2.0
```

特定のバージョンをインストールするには、`--version` でスクリプトを実行し、バージョンのタグを続けてください。JavaScript-JavaScript-JavaScript-Java

```bash
./avalanchego-installer.sh --version v1.3.1
```

{% ヒント スタイル="danger" %}AvalancheGo バージョンすべてが互換性があるわけではありません。通常、最新バージョンを実行する必要があります。最新バージョン以外のバージョンを実行すると、ノードが正常に動作しなくなり、バリデーターでは、ステーキングリワードが受け取られない可能性があります。{% endhint %}

[Jean Zundel](https://github.com/jzu) 氏は、ノードバージョンをインストールするためのサポートを実装してくれたことに感謝しています。

## 再インストールとスクリプトの更新

Installer スクリプトは随時更新され、新機能や機能が追加されました。新機能を利用したり、ノードが失敗した変更から復元したりするには、ノードを再インストールすることができます。それを行うには、Webからスクリプトの最新バージョンを取得します:

```bash
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/avalanchego-installer.sh
```

スクリプトが更新されたら、`--reinstall` コマンドライン引数で再び実行します:

```bash
./avalanchego-installer.sh --reinstall
```

これにより、既存のサービスファイルを削除し、初めて起動したように、インストーラーを最初から実行します。NodeID はそのままにします。

## 次は何ですか？

それで、AvalancheGoノードを実行しています！おめでとうございます![Twitter](https://twitter.com/avalancheavax)、[Telegram](https://t.me/avalancheavax)、[Reddit](https://t.me/avalancheavax)でそれをやったことを知らせてください！

PPP ドライバは、PPP ドライバのサポートを含んでいます。クラウドサービスプロバイダーにいる場合は、行ってください。

これで、ノードが何をしているのかをよりよく把握するために、[ノード監視](setting-up-node-monitoring.md)を設定することで[、ノードとやり取り、](../../avalanchego-apis/issuing-api-calls.md)トークンを[賭け](staking-avax-by-validating-or-delegating-with-the-avalanche-wallet.md)たり、インストールをレベルアップできます。また、[Postmanコレクション](../../tools/postman-avalanche-collection.md)を使用して、ノードにコマンドをより簡単に発行することもできます。

最後に、まだまだない場合は、ノードを別のマシンに復元する必要がある場合に備えて重要なファイルを[バックアップ](node-backup-and-restore.md)することをお勧めします。

ご質問、またはヘルプが必要な場合は、[Discord](https://chat.avalabs.org/)サーバーでお気軽にお問い合わせください。

