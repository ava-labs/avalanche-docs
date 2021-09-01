# インストールスクリプトを使用してAvalancheノードを実行する

我々は、あなたのコンピュータ上にAvalancheGoをインストールするシェル（バッシュ）スクリプトを持っています。このスクリプトは、最小限のユーザー入力で、数分でノードを実行するように設定します。

## 開始前に

このインストールスクリプトは、以下のことを前提とします：

* OS：Ubuntu 18.04あるいは20.04（申し訳ありません、MacOSとWindowsはまだサポートされていません。）
* AvalancheGoは、実行せず、すでにサービスとしてインストールされていない場合があります。
* スクリプトを実行するユーザーは、スーパーユーザー権限を持ちます（実行可能`sudo`）

### 環境配慮

Linuxのフレーバーを実行した場合、意図したとおりスクリプトが機能しない可能性があります。`systemd`システムサービスを実行するために使用されると想定しています。他のLinuxフレーバーは、他のものを使用したり、スクリプトによって想定されると異なる場所にファイルが存在する場合があります。

すでにコンピュータ上で実行されているノードを持っている場合は、スクリプトを実行する前に停止してください。

#### ターミナルから実行されるノード

ターミナルでノードが実行されている場合、押すことで停止します`ctrl+C`。

#### サービスとして実行するノード

すでにサービスとしてノードが実行されている場合、おそらくこのスクリプトを必要としないことでしょう。行きましょう。

#### バックグラウンドで実行されるノード

（例えば実行で実行することにより）あなたのノードがバックグラウンドで実行されている場合`nohup`、実行してノードを実行するプロセスを見つける`ps aux | grep avalanche`。これにより以下のような出力が生成されます：

```text
ubuntu  6834  0.0  0.0   2828   676 pts/1    S+   19:54   0:00 grep avalanche
ubuntu  2630 26.1  9.4 2459236 753316 ?      Sl   Dec02 1220:52 /home/ubuntu/build/avalanchego
```

上に`grep`存在しないラインを探します。 この例では、第二行です。ノードに関する情報を示します。この場合、プロセスidに注意してください`2630`。実行でノードを停止します`kill -2 2630`。

#### ノード作業ファイル

以前にこのコンピュータ上でAvalancheGoノードを実行した場合、ローカルノードファイルがディレクトリに保存されます`$HOME/.avalanchego`。これらのファイルは乱れなく、スクリプトでセットアップされたノードは、以前と同じアイデンティティで動作し続けます。つまり、あなたのノードが安全であるため、バックアップ`staker.crt`とファイルが見つかかり`staker.key`、安全な場所に保存`$HOME/.avalanchego/staking`されます。必要に応じて、これらのファイルを使用して別のコンピュータ上にノードを再作成することができます。バックアップとリストア手順については、この[チュートリアル](node-backup-and-restore.md)をチェックしてください。

### ネットワーキング考慮事項

AvalancheGoは、ネットワークポート上でインターネットから接続を受け付ける必要があります`9651`。インストールに続行する前に、ノードが実行するネットワーク環境を決定する必要があります。

#### クラウドプロバイダー上で実行する

クラウドプロバイダーコンピュータインスタンス上でノードが実行されている場合、静的なIPが存在します。静的IPが何であるかを見つけるか、もしあなたがすでになければセットアップしてください。スクリプトは、IP自体を探し出しようとしますが、すべての環境で動作しない可能性があります。そのため、IPを確認するか、自分で入力する必要があります。

#### ホーム接続上で実行する

住宅のインターネット接続上のコンピュータ上でノードを実行している場合、ダイナミックIPを持ちます。インストールスクリプトにより、そのような状況に合わせて適切にノードを構成します。しかし、ホーム接続のために、インターネット`9651`からノードがインストールされているコンピュータにポート転送を設定する必要があります。

モデルとルータ構成が多すぎるため、正確に何をするか指示することはできませんが、オンラインガイド（[こう](https://www.noip.com/support/knowledgebase/general-port-forwarding-guide/)[やっ](https://www.howtogeek.com/66214/how-to-forward-ports-on-your-router/)たようなもの）が存在し、サービスプロバイダーのサポートもサポートされます。

## スクリプトの実行

そこで、システムを準備し、情報が準備できたようになりました。

スクリプをダウンロードし、実行するには、ターミナルに次のように入力します：

```bash
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/avalanchego-installer.sh;\
chmod 755 avalanchego-installer.sh;\
./avalanchego-installer.sh
```

そして、我々はオフです！出力は、次のようになります：

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

その後、スクリプトが、ネットワーク環境についての情報をメッセージします：

```text
To complete the setup some networking information is needed.
Where is the node installed:
1) residential network (dynamic IP)
2) cloud provider (static IP)
Enter your connection type [1,2]:
```

`1`動的IPを持ち、静的IPを持っている`2`場合は入力してください。静的なIP上にいる場合、IPを自動検出し、確認を求めるようになります。

```text
Detected '3.15.152.14' as your public IP. Is this correct? [y,n]:
```

`y`検出されたIPが間違っているかどう`n`か確認し、次のプロンプトで正しいIPを入力してください。

その後、システムサービス作成が続行し、サービスを開始します。

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

スクリプトが完了し、再びシステムプロンプトが表示されるはずです。

## ポストインストール

AvalancheGoは、サービスとしてバックグラウンドで実行されるはずです。以下で実行されていることを確認することができます。

```bash
sudo systemctl status avalanchego
```

これによりノードの最新ログが印刷されます。このようになります。

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

サービスが大丈夫であることを`active (running)`示すことに注意してください。コマンドプロンプトに戻る`q`ためにプレスする必要がある場合もあります。

ネットワークに接続するノードを識別するために使用されるNodeIDを確認するには、以下のコマンドを実行します：

```bash
sudo journalctl -u avalanchego | grep "NodeID"
```

次のようなアウトプットが生成されます：

```text
Jan 05 10:38:38 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:38] avalanchego/node/node.go#428: Set node's ID to 6seStrauyCnVV7NEVwRbfaT9B6EnXEzfY
```

たとえば、取得する値に準拠`NodeID-`します。`NodeID-6seStrauyCnVV7NEVwRbfaT9B6EnXEzfY`それを保存します。

ノードは、ブートストラップのプロセス中に存在するはずです。次のコマンドを発行することで進捗状況を監視できます：

```bash
sudo journalctl -u avalanchego -f
```

ノード出力を停止したいとき`ctrl+C`にプレスします。

## ノードを停止

AvalancheGoを停止するには、以下の実行を実行します。

```bash
sudo systemctl stop avalanchego
```

再度起動するには、次の実行を実行します。

```bash
sudo systemctl start avalanchego
```

## ノードアップグレード

AvalancheGoは、進行中のプロジェクトであり、定期的なバージョンアップが存在します。ほとんどのアップグレードをお勧めしますが、必要ありません。バックカーバーと互換性がないアップグレードについては、事前の通知がお受けします。新しいバージョンがリリースされると、次のようなログラインが表示されます。

```text
Jan 08 10:26:45 ip-172-31-16-229 avalanchego[6335]: INFO [01-08|10:26:45] avalanchego/network/peer.go#526: beacon 9CkG9MBNavnw7EVSRsuFr7ws9gascDQy3 attempting to connect with newer version avalanche/1.1.1. You may want to update your client
```

新しいバージョンでは、バグ修正、新しい機能、アップグレードが可能になるため、常に最新バージョンにアップグレードすることを推奨します。

ノードをアップグレードするには、インストーラスクリプトを再度実行するだけです。

```bash
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

## ノード構成

ノード操作を設定するファイルです`~/.avalanchego/configs/node.json`。設定オプションを追加、変更することができます。設定オプションのドキュメントは[、ここから](../../references/command-line-interface.md)入手できます。デフォルト設定は、以下のようになります：

```javascript
{
  "dynamic-public-ip": "opendns",
  "http-host": ""
}
```

`--dynamic-public-ip=opendns`設定ファイルが必要であることに注意してください。そのため`JSON`、スイッチはコマンドラインとは異なるフォーマットが行われるため、上記の例のようにオプションを入力しないでください。

## 以前のバージョンを使用する

インストーラスクリプトを使用して、最新バージョン以外にAvalancheGoのバージョンをインストールすることができます。

インストールで利用可能なバージョン一覧を見るには、以下のようにしてください。

```bash
./avalanchego-installer.sh --list
```

リストが出力されます。

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

特定のバージョンをインストールするには、バージョンのタグが`--version`続くスクリプトを実行します。たとえば、

```bash
./avalanchego-installer.sh --version v1.3.1
```

{% hint style="danger" %}AvalancheGoバージョンが互換性とは限らないことに注意してください。一般に最新バージョンを実行する最新以外のバージョンを実行すると、ノードが正しく機能しない、バリデータがステーキングリワードを受け取らないにつながる可能性があります。{% endhint %}

コミュニティメンバーの[Jean Zundel](https://github.com/jzu)のおかげで、インスピレーションを得ることができます。

## 再インストールとスクリプトの更新

インストーラスクリプトは、随時更新され、新しい機能と機能が追加されます。新しい機能を利用したり、ノードが失敗した変更から復元するには、ノードを再インストールするようにしてください。そのためには、以下のものでウェブからスクリプトの最新バージョンを取得します。

```bash
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/avalanchego-installer.sh
```

スクリプトの更新が完了した後、`--reinstall`コマンドライン引数で再度実行してください：

```bash
./avalanchego-installer.sh --reinstall
```

これにより、既存のサービスファイルを削除し、最初にスタートしたように、インストーラをゼロから実行します。データベースとNodeIDはそのまま残されることに注意してください。

## 次は？

それで、AvalancheGoノードを実行します！おめでとうございます！[Twitter](https://twitter.com/avalancheavax)、[Telegram](https://t.me/avalancheavax)あるいは[Reddit](https://t.me/avalancheavax)上でご連絡ください！

住宅ネットワーク（ダイナミックIP）上にいる場合、ポートフォワーディングを設定することを忘れずに。クラウドサービスプロバイダーにいる場合、行きましょう。

これにより、ノードが何をしているかについてより良い洞察を得るために、[ノードモニタリング](setting-up-node-monitoring.md)を設定することで[、ノードとやり取り、](../../avalanchego-apis/issuing-api-calls.md)[トークン](staking-avax-by-validating-or-delegating-with-the-avalanche-wallet.md)をステークしたり、インストールのレベルアップを可能にします。また、我々の[Postmanコレクション](../../tools/postman-avalanche-collection.md)を使用して、より簡単にノードにコマンドを発行する場合もよいでしょう。

最後に、あなたが既に存在しない場合、あなたがあなたのノードを別のマシンに復元する必要がある場合に、重要なファイルを[バックアップ](node-backup-and-restore.md)するのは良いアイデアです。

ご質問があり、サポートが必要な場合、[Discord](https://chat.avalabs.org/)サーバー上でお気軽にご連絡ください。

