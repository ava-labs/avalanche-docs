# インストールスクリプトを使用してAvalancheノードを実行する

パソコンには、AvalancheGoをインストールするシェル（bash）スクリプトがあります。このスクリプトには最少のユーザー入力しか必要とせず、わずか数分でノードを完全に実行するよう設定します。

## 起動する前に

Avalancheは、非常に軽量なプロトコルであるため、ノードはコモディティハードウェア上で実行することができます。ネットワークの使用量が増加するにつれ、ハードウェア要件が変更わる可能性があることにご注意ください。

* CPU：8AWSvCPUと同等のもの
* RAM：16GB
* ストレージ：200GB
* OS：Ubuntu 18.04/20.04またはMacOS >=Catalina

このインストールスクリプトは、次を想定しています：

* AvalancheGoが実行していない、またサービスとして既にインストールされていない
* スクリプトを実行するユーザーは、スーパーユーザー権を持つ（`sudo`を実行可能）

### 環境において考慮すべき事項

Linuxタイプが異なる場合、スクリプトが意図したように稼働しない場合があります。システムサービスを実行するために、`systemd`が使用されていることを想定しています。他のLinuxタイプは、他のものを使用したり、スクリプトが想定している場所とは違うところにファイルを配置したりしている場合もあります。

すでにコンピュータでノードが実行されている場合は、スクリプトを実行する前に停止してください。

#### ターミナルから実行するノード

ターミナルでノードを実行している場合は、`ctrl+C`を押して停止します。

#### サービスとして実行するノード

すでにノードがサービスとして実行されている場合は、このスクリプトはおそらく必要ないでしょう。準備はできています。

#### バックグラウンドで実行するノード

ノードがバックグラウンドで実行されている場合（例えば　`nohup`で実行している）は、`ps aux | grep avalanche` を実行してノードを実行するプロセスを見つけます。これにより、次のような出力が生成されます。

```text
ubuntu  6834  0.0  0.0   2828   676 pts/1    S+   19:54   0:00 grep avalanche
ubuntu  2630 26.1  9.4 2459236 753316 ?      Sl   Dec02 1220:52 /home/ubuntu/build/avalanchego
```

その上に`grep`がない行を探します。この例では、2行目です。ノードの情報が表示されます。この場合、`2630`プロセスIDに注意してください。`kill -2 2630`を実行してノードを停止する

#### ノード作業ファイル

以前に、このコンピュータでAvalancheGoノードを実行していたなら、`$HOME/.avalanchego`ディレクトリにローカルノードファイルを保存することができます。これらのファイルは阻害されず、スクリプトで設定するノードは、以前と同じIDと状態で操作を継続します。つまり、ノードのセキュリティのため、`$HOME/.avalanchego/staking`で見つかった`staker.crt`と`staker.key`ファイルをバックアップし、安全な場所に保管するということです。必要に応じて、これらのファイルを使って別のコンピュータにノードを再作成することができます。バックアップと復元手順については、この[チュートリアル](node-backup-and-restore.md)を確認してください。

### ネットワークに関する考慮事項

正常に実行するには、AvalancheGoがネットワークポートでインターネットからの接続を承認する必要があります`9651`。インストールする前に、ノードが実行するネットワーク環境を決定する必要があります。

#### クラウドプロバイダで実行する

ノードがクラウドプロバイダのコンピュータインスタンスで実行されている場合、静的IPを持つことになります。その静的IPを確認するか、まだ設定ていない場合は設定してください。スクリプトは自身でIPを確認しようとしますが、これはすべての環境で機能しない場合があります。よって、IPを確認するか、自分で入力する必要があります。

#### ホームで接続し、実行する

ホームでインターネット接続をしているコンピュータでノードを実行している場合、ダイナミックIPがあります。つまり、IPが定期的に変更されます。インストールスクリプトは、その状況に適切にノードを設定します。ただし自宅で接続するには、ノードがインストールされているコンピュータに、インターネットから`9651`ポートのインバウンドポート転送を設定する必要があります。

モデルとルーターの設定が多すぎるため、正確に何をすべきか説明はできませんが、オンラインガイド（[こちら](https://www.noip.com/support/knowledgebase/general-port-forwarding-guide/)や[こちら](https://www.howtogeek.com/66214/how-to-forward-ports-on-your-router/)のようなもの）があります。サービスプロバイダのサポートも役立つかもしれません。

## スクリプトを実行する

システムを準備したので、進めましょう。

スクリプトをダウンロードし、実行するには、ターミナルに次のように入力します。

```bash
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/avalanchego-installer.sh;\
chmod 755 avalanchego-installer.sh;\
./avalanchego-installer.sh
```

これで終了です。出力は、次のようになります。

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

次に、スクリプトがネットワーク環境の情報を求めます。

```text
To complete the setup some networking information is needed.
Where is the node installed:
1) residential network (dynamic IP)
2) cloud provider (static IP)
Enter your connection type [1,2]:
```

ダイナミックIPがある場合は、`1`を入力します。静的IPの場合は`2`を入力します。静的IP上にある場合は、IPを自動検出して確認を試みます。

```text
Detected '3.15.152.14' as your public IP. Is this correct? [y,n]:
```

検出されたIPが誤っている（か空の）場合は`y`または`n`を確認してください。そして次のプロンプトに正しいIPを入力します。

スクリプトはシステムサービス作成を継続し、サービスを起動して終了します。

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

スクリプトが完了し、システムプロンプトが再び表示されます。

## ポストインストール

AvalancheGoは、サービスとしてバックグラウンドで実行されている必要があります。次で実行されていることを確認できます。

```bash
sudo systemctl status avalanchego
```

これにより、ノードの最新のログを表示します。次のようになっています。

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

サービスがOKであることを示す `active (running)`に注意してください。コマンドプロンプトに戻るには、`q`を押す必要があります。

ネットワークにノードを識別するために使用されるNodeIDを確認するには、次のコマンドを実行します。

```bash
sudo journalctl -u avalanchego | grep "NodeID"
```

次のようになります。

```text
Jan 05 10:38:38 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:38] avalanchego/node/node.go#428: Set node's ID to 6seStrauyCnVV7NEVwRbfaT9B6EnXEzfY
```

`NodeID-`を取得する値の前につけます。例えば、`NodeID-6seStrauyCnVV7NEVwRbfaT9B6EnXEzfY`です。これを保存します。ノードをステークしたり、探したりするのに必要になります。

ノードは今、ブートストラップのプロセス処理中です。次のコマンドを発行して進捗状況をモニターできます。

```bash
sudo journalctl -u avalanchego -f
```

ノード出力の読み取りを停止したい場合は、`ctrl+C`を押します。

## ノードを停止する

AvalancheGoを停止するには、次を実行します。

```bash
sudo systemctl stop avalanchego
```

再び起動するには、次を実行してください。

```bash
sudo systemctl start avalanchego
```

## ノードのアップグレード

AvalancheGoは進行中のプロジェクトであり、通常バージョンアップがあります。ほとんどのアップグレードが推奨されていますが、必須ではありません。後方互換性がないアップグレードには、事前通知があります。ノードの新しいバージョンがリリースされている場合、通知ログは以下のようになります。

```text
Jan 08 10:26:45 ip-172-31-16-229 avalanchego[6335]: INFO [01-08|10:26:45] avalanchego/network/peer.go#526: beacon 9CkG9MBNavnw7EVSRsuFr7ws9gascDQy3 attempting to connect with newer version avalanche/1.1.1. You may want to update your client
```

新しいバージョンには、バグ修正、新しい機能、アップグレードがあるため、常に最新バージョンにアップグレードすることが推奨されています。

ノードをアップグレードするには、再びインストーラスクリプトを実行するだけです。

```bash
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

そしてノードを最新版にアップグレードし、終わったらノードのバックアップを開始します。そして最新版の情報を印刷しておいてください。

```text
Node upgraded, starting service...
New node version:
avalanche/1.1.1 [network=mainnet, database=v1.0.0, commit=f76f1fd5f99736cf468413bbac158d6626f712d2]
Done!
```

## ノードの構成

ノード操作を構成するファイルは、`~/.avalanchego/configs/node.json`です。構成オプションを追加したり変更したりできます。構成オプションのドキュメントは[こちら](../../references/command-line-interface.md)にあります。デフォルトの構成は以下のようになります。

```javascript
{
  "dynamic-public-ip": "opendns",
  "http-host": ""
}
```

構成ファイルは適切に`JSON`フォーマットされていなければなりません。そのため、スイッチはコマンドラインとは異なるものです。上記の例の`--dynamic-public-ip=opendns`のようにならないよう注意してください。

## 以前のバージョンを使用する

インストーラスクリプトは、また、最新バージョン以外のAvalancheGoのバージョンをインストールすることもできます。

インストールで利用可能なバージョンのリストを確認するには、次を実行します。

```bash
./avalanchego-installer.sh --list
```

リストを印刷し、次のようになります。

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

特定のバージョンをインストールするには、バージョンのタグに続けて`--version`とスクリプトを実行します。例：

```bash
./avalanchego-installer.sh --version v1.3.1
```

{% hint style="danger" %}すべてのAvalancheGoバージョンに互換性があるわけではないことに注意してください。一般的には、最新版を実行する必要があります。最新版以外のバージョンを実行すると、ノードが適切に機能しなかったり、バリデータがステーキングリワードを受け取らなかったりする事態が発生します。{% endhint %}

インスピレーションや最新ノード版ではないインストールのサポートの実施については、コミュニティメンバーの[JeanZundel](https://github.com/jzu)に感謝します。

## 再インストールとスクリプトの更新

インストーラスクリプトは、新しい機能と機能を追加しながら随時更新されます。新しい機能を活用したり、ノードが失敗した変更内容から復元するには、ノードを再インストールすることができます。これを行うには、以下でウェブからスクリプトの最新版を取得します。

```bash
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/avalanchego-installer.sh
```

スクリプトが更新されたら、`--reinstall`コマンドライン引数で再び実行します。

```bash
./avalanchego-installer.sh --reinstall
```

これにより既存のサービスファイルを削除し、初めて起動したようにゼロからインストーラを実行します。データベースとNodeIDはそのまま残されていることに注意してください。

## では、次は？

これで終了です。AvalancheGoノードを実行しています。おめでとうございます！[Twitter](https://twitter.com/avalancheavax)、[Telegram](https://t.me/avalancheavax)、[Reddit](https://t.me/avalancheavax)で学習した内容をお知らせください。

自宅のネットワーク（ダイナミックIP）の場合には、ポート転送を設定するのを忘れないでください。クラウドサービスプロバイダにいる場合は、準備ができています。

これで[ノードとやり取りしたり](../../avalanchego-apis/issuing-api-calls.md)、[トークンをステークしたり](staking-avax-by-validating-or-delegating-with-the-avalanche-wallet.md)、[ノードモニタリング](setting-up-node-monitoring.md)を設定してインストールをレベルアップさせ、ノードの作業内容をより理解したりすることができます。また、[Postmanコレクション](../../tools/postman-avalanche-collection.md)を使用し、ノードに対して、さらに簡単にコマンドを発行することができます。

最後に、ノードを別のマシンに復元する必要がある場合は、重要なファイルを[バックアップ](node-backup-and-restore.md)するのがいでしょう。

ご不明な点やサポートが必要な場合は、[Discord](https://chat.avalabs.org/)サーバーでお問合せください。

