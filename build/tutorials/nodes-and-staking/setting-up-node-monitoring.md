# Avalancheノードを監視する

## はじめに

このチュートリアルでは、[AvalancheGo](https://github.com/ava-labs/avalanchego)のインスタンスを監視するインフラストラクチャの設定方法を説明します。次を使用します。

* データを収集・保存する[Prometheus](https://prometheus.io/)
* マシン情報を入手する[node_exporter](https://github.com/prometheus/node_exporter)
* ノード情報を入手するAvalancheGoの[メトリックAPI](https://docs.avax.network/build/avalanchego-apis/metrics-api)
* ダッシュボードでデータを可視化する[Grafana](https://grafana.com/)。
* あらかじめ作成された[Avalancheダッシュボード](https://github.com/ava-labs/avalanche-docs/tree/master/dashboards)のセット

前提条件：

* AvalancheGoノードが実行していること
* ノードを実行しているマシンへのシェルによるアクセス
* マシン上の管理者権限

このチュートリアルでは、Ubuntu18.04または20.04がノード上で実行されていることを前提としています。サービスの実行に`systemd`を、パッケージ管理に`apt-get`を使用する他のLinuxフレーバーは機能するかもしれませんが、テストされていません。コミュニティメンバーによると、Debian10上では動作し、他のDebianリリースでも機能する可能性が報告されています。

### 差し止め請求：セキュリティ

{% hint style="danger" %}
ここで説明したシステムは、一般のインターネットに公開しては**いけません**。ここで示すPrometheもGrafanaも、不正アクセスに対する耐性がありません。必ず両方とも、安全なプロキシ、ローカルネットワーク、VPNでのみアクセスできるようにしてください。その設定に関しては、当チュートリアルでは範疇外ですが、その点をご注意ください。セキュリティ状態が悪いと、攻撃者にノードをコントロールされる恐れがあります。適切なセキュリティ慣行に従うことは、皆さんの責任です。{% endhint %}

## インストーラースクリプトの監視

ノードモニタリングを簡単にインストールするために、ほとんどの作業を行うスクリプトを作成しました。スクリプトのダウンロードと実行を行うには、ノードを実行するマシンに管理者権限を持ったユーザーでログインし、以下のコマンドを入力してください。

```bash
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/monitoring-installer.sh;\
chmod 755 monitoring-installer.sh;
```
これによりスクリプトがダウンロードされ、実行可能になります。

スクリプト自体は異なる引数で複数回実行され、それぞれ異なるツールや環境の一部をインストールします。ダウンロードと設定を正しく行うために、以下を実行することから始めてください。

```bash
./monitoring-installer.sh --help
```
次のように表示されます。

```text
Usage: ./monitoring-installer.sh [--1|--2|--3|--4|--help]

Options:
--help   Shows this message
--1      Step 1: Installs Prometheus
--2      Step 2: Installs Grafana
--3      Step 3: Installs node_exporter
--4      Step 4: Installs AvalancheGo Grafana dashboards

Run without any options, script will download and install latest version of AvalancheGo dashboards.
```

やってみましょう。

## ステップ1：Prometheusを設定する<a id="prometheus"></a>

スクリプトを実行して、最初のステップを実行します。

```bash
./monitoring-installer.sh --1
```

このような出力が生成されます。

```text
AvalancheGo monitoring installer
--------------------------------
STEP 1: Installing Prometheus

Checking environment...
Found arm64 architecture...
Prometheus install archive found:
https://github.com/prometheus/prometheus/releases/download/v2.31.0/prometheus-2.31.0.linux-arm64.tar.gz
Attempting to download:
https://github.com/prometheus/prometheus/releases/download/v2.31.0/prometheus-2.31.0.linux-arm64.tar.gz
prometheus.tar.gz                           100%[=========================================================================================>]  65.11M   123MB/s    in 0.5s
2021-11-05 14:16:11 URL:https://github-releases.githubusercontent.com/6838921/a215b0e7-df1f-402b-9541-a3ec9d431f76?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20211105%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211105T141610Z&X-Amz-Expires=300&X-Amz-Signature=72a8ae4c6b5cea962bb9cad242cb4478082594b484d6a519de58b8241b319d94&X-Amz-SignedHeaders=host&actor_id=0&key_id=0&repo_id=6838921&response-content-disposition=attachment%3B%20filename%3Dprometheus-2.31.0.linux-arm64.tar.gz&response-content-type=application%2Foctet-stream [68274531/68274531] -> "prometheus.tar.gz" [1]
...
```
追加のパッケージのインストールの確認を求められる場合があります。その場合はインストールしてください。スクリプトの実行は、Prometheusが正しくインストールされているかを確認する手順で終了します。やってみましょう。以下を実行してください。
```bash
sudo systemctl status prometheus
```

次のような出力になるはずです。

```text
● prometheus.service - Prometheus
Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
Active: active (running) since Fri 2021-11-12 11:38:32 UTC; 17min ago
Docs: https://prometheus.io/docs/introduction/overview/
Main PID: 548 (prometheus)
Tasks: 10 (limit: 9300)
Memory: 95.6M
CGroup: /system.slice/prometheus.service
└─548 /usr/local/bin/prometheus --config.file=/etc/prometheus/prometheus.yml --storage.tsdb.path=/var/lib/prometheus --web.console.templates=/etc/prometheus/con>

Nov 12 11:38:33 ip-172-31-36-200 prometheus[548]: ts=2021-11-12T11:38:33.644Z caller=head.go:590 level=info component=tsdb msg="WAL segment loaded" segment=81 maxSegment=84
Nov 12 11:38:33 ip-172-31-36-200 prometheus[548]: ts=2021-11-12T11:38:33.773Z caller=head.go:590 level=info component=tsdb msg="WAL segment loaded" segment=82 maxSegment=84
```

`active (running)`状態に注意してください（`q`を押して終了）。また、`http://your-node-host-ip:9090/`で利用できるPrometheusウェブインターフェースも確認できます。

{% hint style="warning" %}ファイアーウォールが機能している場合は、`sudo ufw allow 9090/tcp`を行い、そして／あるいは、ノードがクラウドインスタンス上で実行されている場合は、セキュリティ設定を調整し、ポート9090への接続を許可する必要があります。AWSの場合は、[こちら](setting-up-an-avalanche-node-with-amazon-web-services-aws.md#f8df)を確認してください。公共のインターネット上では、必ず自分のIPのみが接続できるように設定してください。{% endhint %}

すべてが完了したら次に進みましょう。

## ステップ2：Grafanaをインストールする<a id="grafana"></a>

スクリプトを実行し、2番目のステップを実行してください。

```bash
./monitoring-installer.sh --2
```

このような出力が生成されます。

```text
AvalancheGo monitoring installer
--------------------------------
STEP 2: Installing Grafana

OK
deb https://packages.grafana.com/oss/deb stable main
Hit:1 http://us-east-2.ec2.ports.ubuntu.com/ubuntu-ports focal InRelease
Get:2 http://us-east-2.ec2.ports.ubuntu.com/ubuntu-ports focal-updates InRelease [114 kB]
Get:3 http://us-east-2.ec2.ports.ubuntu.com/ubuntu-ports focal-backports InRelease [101 kB]
Hit:4 http://ppa.launchpad.net/longsleep/golang-backports/ubuntu focal InRelease
Get:5 http://ports.ubuntu.com/ubuntu-ports focal-security InRelease [114 kB]
Get:6 https://packages.grafana.com/oss/deb stable InRelease [12.1 kB]
...
```
正しく実行されているいるかを確認するには、次を実行します。

```text
sudo systemctl status grafana-server
```

これには、再びgrafanaが`active`と表示されている必要があります。これで、Grafanaはブラウザから`http://your-node-host-ip:3000/`で利用できるようになっているはずです。ユーザーネーム：admin、パスワード：adminでログインしてください。新しい、安全なパスワードを設定するように求められます。パスワードを設定してください。

{% hint style="warning" %}
ファイアーウォールがオンになっている場合、`sudo ufw allow 3000/tcp`を行い、そして／またはクラウドインスタンスの設定を調整し、ポート3000に接続を許可する必要があります。公共のインターネット上では、必ず自分のIPのみが接続できるように設定してください。{% endhint %}

PrometheusとGrafanaがインストールされました。次のステップに進む準備ができました。

## ステップ3：node\_exporterを設定する<a id="exporter"></a>

AvalancheGoのメトリックに加えて、マシン自体のモニタリングを設定しましょう。そうすれば、CPU、メモリ、ネットワーク、ディスクの使用量を確認し、どのような異常でも認識できます。それには、Prometheusプラグインであるnode\_exporterを使用します。

スクリプトを実行して、3番目のステップを実行します。

```bash
./monitoring-installer.sh --3
```
出力は、次のようになります。
```text
AvalancheGo monitoring installer
--------------------------------
STEP 3: Installing node_exporter

Checking environment...
Found arm64 architecture...
Dowloading archive...
https://github.com/prometheus/node_exporter/releases/download/v1.2.2/node_exporter-1.2.2.linux-arm64.tar.gz
node_exporter.tar.gz                        100%[=========================================================================================>]   7.91M  --.-KB/s    in 0.1s
2021-11-05 14:57:25 URL:https://github-releases.githubusercontent.com/9524057/6dc22304-a1f5-419b-b296-906f6dd168dc?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20211105%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211105T145725Z&X-Amz-Expires=300&X-Amz-Signature=3890e09e58ea9d4180684d9286c9e791b96b0c411d8f8a494f77e99f260bdcbb&X-Amz-SignedHeaders=host&actor_id=0&key_id=0&repo_id=9524057&response-content-disposition=attachment%3B%20filename%3Dnode_exporter-1.2.2.linux-arm64.tar.gz&response-content-type=application%2Foctet-stream [8296266/8296266] -> "node_exporter.tar.gz" [1]
node_exporter-1.2.2.linux-arm64/LICENSE
```
再度、サービスが正しく実行されていることを確認します。
```cpp
sudo systemctl status node_exporter
```
サービスが実行されている場合、Prometheus、Grafana、node\_exporterはすべて連携して動作しているはずです。確認するには、ブラウザで`http://your-node-host-ip:9090/targets`のPrometheusウェブインターフェースにアクセスします。3つのターゲットが有効になっています。

* Prometheus
* AvalancheGo
* avalanchego-machine

そのすべてに`UP`として`State`があることを確認します。

{% hint style="info" %}APIポートでTLSが有効になっているAvalancheGoノードを実行する場合、`/etc/prometheus/prometheus.yml`ファイルを手動で編集し、`avalanchego`ジョブを次のように変更する必要があります。
```cpp
  - job_name: 'avalanchego'
    metrics_path: '/ext/metrics'
    scheme: 'https'
    tls_config:
    insecure_skip_verify: true
    static_configs:
      - targets: ['localhost:9650']
```
スペースに（先頭のスペースにも）注意してください！これを行うには管理者権限が必要です（`sudo`を使用してください）。その後prometheusサービスを`sudo systemctl restart prometheus`で再起動します。
{% endhint %}

あとは、データソースを設定し、データを表示する実際のダッシュボードをインストールするだけです。

## ステップ4：ダッシュボード<a id="dashboards"></a>

スクリプトを実行して、ダッシュボードをインストールします。

```bash
./monitoring-installer.sh --4
```
次のような出力が生成されます。
```text
AvalancheGo monitoring installer
--------------------------------

Downloading...
Last-modified header missing -- time-stamps turned off.
2021-11-05 14:57:47 URL:https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/dashboards/c_chain.json [50282/50282] -> "c_chain.json" [1]
FINISHED --2021-11-05 14:57:47--
Total wall clock time: 0.2s
Downloaded: 1 files, 49K in 0s (132 MB/s)
Last-modified header missing -- time-stamps turned off.
...
```
これにより、GitHubからダッシュボードの最新バージョンがダウンロードされ、Grafanaを設定して読み込み、Prometheusをデータソースとして定義します。ダッシュボードが表示されるまで最大30秒かかる場合があります。ブラウザで`http://your-node-host-ip:3000/dashboards`に移動します。7つのAvalancheダッシュボードが表示されます。

![インポートされたダッシュボード](monitoring-01-dashboards.png)

タイトルをクリックして「Avalanche Main Dashboard（Avalanche メインダッシュボード）」を選択します。ロードが行われ、次のように表示されます。

![メインダッシュボード](monitoring-02-main-dashboard.png)

一部のグラフが完全に表示されるまで、時間がかかる場合があります。これは、正しくレンダリングするために一連のデータポイントを必要とするためです。

ノードに関する最も重要な情報が一覧表示されているため、メインダッシュボードをブックマークすることができます。すべてのダッシュボードには、最初の行に他のすべてへのリンクがあるため、簡単に移動することができます。

## 更新

利用可能なノードのメトリックは常に更新され、新しいノードが追加され、古くなったノードが削除されます。そのため、随時、特にパネル上にデータがないことに気づいた場合にはダッシュボードを更新してください。ダッシュボードの更新は簡単です。引数なしでスクリプトを実行するだけです。そうすれば、利用可能な最新バージョンでダッシュボードが更新されます。Grafanaでダッシュボードを更新するには最大30秒許可します。

## まとめ

スクリプトを使用したノードモニタリングのインストールは簡単です。これにより、ノードがどのように動作しており、何が起こっているのかを把握することができます。それに素敵なグラフです！

このチュートリアルについてのフィードバックや、スクリプトやステップを行うのに問題がある場合は[Discord](https://chat.avalabs.org)上でメッセージをお送りください。
