# Avalancheノードをモニターする

_このチュートリアルを書くコミュニティメンバーJovica Popovićにありがとうございました。必要_に応じて、_[_Discord_](https://chat.avax.network)上で彼に連絡することができます。_

## はじめに

このチュートリアルでは、Ubuntu 18.04あるいは20.04がノード上で実行されていると想定します（このチュートリアルのMac OS Xバージョンは後で実行されます）。

このチュートリアルでは、[AvalancheGo](https://github.com/ava-labs/avalanchego)のインスタンスを監視するためのインフラを設定する方法を説明します。我々は、以下の使用を行います：

* [Prometheus](https://prometheus.io/)が、データを収集、保存する
*  [node\_exporter](https://github.com/prometheus/node_exporter)
* AvalancheGoの[メトリックAPI](https://docs.avax.network/build/avalanchego-apis/metrics-api)
* [Grafana](https://grafana.com/)は、ダッシュボード上でデータを可視化する

前提条件：

* AvalancheGoノード
* ノードを実行するマシンにシェルアクセス
* マシン上の管理者権限

### **注意：セキュリティ**

{% hint style="danger" %}**ここに記載したシステムは、パブリックインターネットに開かれた**ことはありません。ここで示したように、PrometheusもGrafanaも、不正なアクセスから強化することはありません。両方が安全なプロキシ、ローカルネットワーク、VPN経由でしかアクセスできないようにしてください。設定は、このチュートリアルの範囲を超えて行くことはありませんが、注意してください。悪いセキュリティ慣行により、攻撃者がノードにコントロールされるにつながる可能性があります！適切なセキュリティプラクティスに従うことはあなたの責任となります。{% endhint %}

### 貢献

Grafanaダッシュボードの基礎は、[ColmenaLabs](https://blog.colmenalabs.org/index.html)の良い人たちから取り上げられています。このチュートリアルを改善する方法についてのアイデアや提案がある場合は、そうした問題を掲載するか、[Github](https://github.com/ava-labs)上でプルリクエストしてください。

## Prometheus

まず、システムユーザーアカウントを追加し、ディレクトリを作成する必要があります（スーパーユーザー認証情報が必要になります）：

```cpp
sudo useradd -M -r -s /bin/false prometheus
```

```cpp
sudo mkdir /etc/prometheus /var/lib/prometheus
```

すでにインストールされていない場合、必要なユーティリティを取得します。

```cpp
sudo apt-get install -y apt-transport-https
```

```cpp
sudo apt-get install -y software-properties-common wget
```

次に、[ダウンロードページ](https://prometheus.io/download/)からPrometheusの最新バージョンにリンクし、（適切なプロセッサアーキテクチャを選択するようにしてください。）wgetを使用してダウンロードし、アーカイブを解凍します。

```cpp
mkdir -p /tmp/prometheus && cd /tmp/prometheus
```

```cpp
wget https://github.com/prometheus/prometheus/releases/download/v2.25.0/prometheus-2.25.0.linux-amd64.tar.gz
```

```cpp
tar xvf prometheus-2.25.0.linux-amd64.tar.gz
```

```cpp
cd prometheus-2.25.0.linux-amd64
```

次に、バイナリを移動し、所有権を設定し、設定ファイルを適切な場所に移動する必要があります。

```cpp
sudo cp {prometheus,promtool} /usr/local/bin/
```

```cpp
sudo chown prometheus:prometheus /usr/local/bin/{prometheus,promtool}
```

```cpp
sudo chown -R prometheus:prometheus /etc/prometheus
```

```cpp
sudo chown prometheus:prometheus /var/lib/prometheus
```

```cpp
sudo cp -r {consoles,console_libraries} /etc/prometheus/
```

```cpp
sudo cp prometheus.yml /etc/prometheus/
```

`/etc/prometheus`設定やデータ`/var/lib/prometheus`のために使用されます。

Prometheusをセットアップしよう。Do\*\*:\*\*

```cpp
sudo nano /etc/systemd/system/prometheus.service
```

（あるいは、選択したテキストエディタでそのファイルを開く）、以下の構成を入力してください。

```cpp
[Unit]
Description=Prometheus
Documentation=https://prometheus.io/docs/introduction/overview/
Wants=network-online.target
After=network-online.target

[Service]
Type=simple
User=prometheus
Group=prometheus
ExecReload=/bin/kill -HUP $MAINPID
ExecStart=/usr/local/bin/prometheus   --config.file=/etc/prometheus/prometheus.yml   --storage.tsdb.path=/var/lib/prometheus   --web.console.templates=/etc/prometheus/consoles   --web.console.libraries=/etc/prometheus/console_libraries   --web.listen-address=0.0.0.0:9090   --web.external-url=

SyslogIdentifier=prometheus
Restart=always

[Install]
WantedBy=multi-user.target
```

ファイルを保存します。現在、Prometheusをシステムサービスとして実行することができます：

```cpp
sudo systemctl daemon-reload
```

```cpp
sudo systemctl start prometheus
```

```cpp
sudo systemctl enable prometheus
```

Prometheusが稼働するようになりました。確かめるために、以下のもので確認することができます。

```cpp
sudo systemctl status prometheus
```

どちらかが次のようなものを生成する必要があります：

```cpp
● prometheus.service - Prometheus
     Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
     Active: active (running) since Wed 2020-04-01 19:23:53 CEST; 5 months 12 days ago
       Docs: https://prometheus.io/docs/introduction/overview/
   Main PID: 1767 (prometheus)
      Tasks: 12 (limit: 9255)
     CGroup: /system.slice/prometheus.service
             └─1767 /usr/local/bin/prometheus --config.file=/etc/prometheus/prometheus.yml --storage.tsdb.path=/var/lib/prometheus --web.console.templa>

Sep 13 13:00:04 ubuntu prometheus[1767]: level=info ts=2020-09-13T11:00:04.744Z caller=head.go:792 component=tsdb msg="Head GC completed" duration=13.6>
Sep 13 13:00:05 ubuntu prometheus[1767]: level=info ts=2020-09-13T11:00:05.263Z caller=head.go:869 component=tsdb msg="WAL checkpoint complete" first=9>
Sep 13 15:00:04 ubuntu prometheus[1767]: level=info ts=2020-09-13T13:00:04.776Z caller=compact.go:495 component=tsdb msg="write block" mint=15999912000>
...
```

Prometheusウェブインターフェースも確認できます。`http://your-node-host-ip:9090/`

{% hint style="warning" %}ファイアウォールがオンになっている場合`sudo ufw allow 9090/tcp`、必要がある場合があります。\*\*{% endhint %}

## Grafanaをインストールする

UbuntuでGrafanaプロジェクトリポジトリをセットアップするには、以下のようにします。

```cpp
wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
```

```cpp
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
```

Grafanaをインストールするには：

```cpp
sudo apt-get update
```

```cpp
sudo apt-get install grafana
```

サービスとして設定するには：

```cpp
sudo systemctl daemon-reload
```

```cpp
sudo systemctl start grafana-server
```

```cpp
sudo systemctl enable grafana-server.service
```

適切に実行されていることを確認する：

```text
sudo systemctl status grafana-server
```

`active`グラファナを以下のように表示するGrafanaは、現在で利用可能であるはずです。`http://your-node-host-ip:3000/`

{% hint style="warning" %}ファイアウォールがオンになっている場合`sudo ufw allow 3000/tcp`、必要がある場合があります。\*\*{% endhint %}

ユーザー名/パスワード管理でログインし、新しい安全なパスワードを設定します。今度は、Grafanaを、我々のデータソースであるPrometheusに接続する必要があります。

Grafanaのウェブインターフェース上で：

* 左側メニューで構成に移動し、データソースを選択します。
* データソースを追加するをクリックします
* Prometheusを選択します。
* フォームで、（Prometheusが行う）名前を入力し、URLとして`http://localhost:9090`ください。
* クリック`Save & Test`
* 「データソースが機能しています」グリーンメッセージをチェックしてください。

##  node\_exporter

AvalancheGoから出たメトリックに加え、マシン自体監視をセットアップしてみましょう。そのため、CPU、メモリ、ネットワーク、ディスク使用状況を確認し、異常を認識することができます。そのため、Prometheusプラグインであるnode\_exporter

以下の最新バージョンで入手してください：

```text
curl -s https://api.github.com/repos/prometheus/node_exporter/releases/latest | grep browser_download_url | grep linux-amd64 |  cut -d '"' -f 4 | wget -qi -
```

異なるアーキテクチャを持っている`linux-amd64`場合（RaspberryPiは`linux-arm64`例として挙げられます）変更を変更します。Untarをアンターし、実行可能ファイルを移動します：

```cpp
tar xvf node_exporter-1.1.2.linux-amd64.tar.gz
```

```cpp
sudo mv node_exporter-1.1.2.linux-amd64/node_exporter /usr/local/bin
```

以下で正しくインストールされていることを確認します。

```cpp
node_exporter --version
```

その後、node\_exporterやる：

```cpp
sudo nano /etc/systemd/system/node_exporter.service
```

（あるいは、選択したテキストエディタでそのファイルを開く）、以下のように記載しておきます。

```cpp
[Unit]
Description=Prometheus Node Exporter
Documentation=https://github.com/prometheus/node_exporter
Wants=network-online.target
After=network-online.target

[Service]
Type=simple
User=prometheus
Group=prometheus
ExecReload=/bin/kill -HUP $MAINPID
ExecStart=/usr/local/bin/node_exporter \
    --collector.cpu \
    --collector.diskstats \
    --collector.filesystem \
    --collector.loadavg \
    --collector.meminfo \
    --collector.filefd \
    --collector.netdev \
    --collector.stat \
    --collector.netstat \
    --collector.systemd \
    --collector.uname \
    --collector.vmstat \
    --collector.time \
    --collector.mdadm \
    --collector.zfs \
    --collector.tcpstat \
    --collector.bonding \
    --collector.hwmon \
    --collector.arp \
    --web.listen-address=:9100 \
    --web.telemetry-path="/metrics"

[Install]
WantedBy=multi-user.target
```

これにより、node\_exporterを設定し、我々が面白く見つけるさまざまなデータを収集します。サービスを始めて、ブート時に有効にしてください。

```cpp
sudo systemctl start node_exporter
```

```cpp
sudo systemctl enable node_exporter
```

繰り返します。

```cpp
sudo systemctl status node_exporter
```

サービスファイルの内容が正しくコピーされ`Ignoring unknown escape sequences`、余分なバックスラッシュや追加改行が存在しないことをダブルチェックしてください。必要に応じて修正し、その後サービスを再起動します。

さて、我々はすべてをまとめて結合する準備が完了しました。

## AvalancheGoと node\_exporter Prometheusジョブを構成

AvalancheGoノードが適切な[コマンドライン引数](../../references/command-line-interface.md)で実行されていることを確認します。メトリックAPIが有効化されている必要があります（デフォルトでは、それはあります）。CLI引数を使用して、ホストマシン外でAPI呼び出しを行う場合、APIが聞かれたアドレスに注意`--http-host`してください。

現在、適切なPrometheusジョブを定義する必要があります。Prometheus構成を編集しましょう：

実行 :

```cpp
sudo nano /etc/prometheus/prometheus.yml
```

（あるいは、選択したテキストエディタでそのファイルを開く）、最後に追加します：

```cpp
  - job_name: 'avalanchego'
    metrics_path: '/ext/metrics'
    static_configs:
      - targets: ['<your-host-ip>:9650']

  - job_name: 'avalanchego-machine'
    static_configs:
      - targets: ['<your-host-ip>:9100']
        labels:
          alias: 'machine'
```

**インデントが重要です**。`-job_name`既存のエントリと垂直にアライメントし`-job_name`、他の行も適切にインデントされますようにしてください。`localhost`正しいホストIPを使用するか、またはノードがどのように構成されるかによって、確実にしてください。

設定ファイルを保存し、Prometheusを再起動します：

```cpp
sudo systemctl restart prometheus
```

Prometheusウェブインターフェースをチェックする`http://your-node-host-ip:9090/targets`。3つのターゲットが有効になっているように見えるはずです：

* Prometheus
* avalanchego
* avalanchego-machine

すべてがそのま`State`まであるように持っていることを確認します。`UP`

Grafanaを開く。[事前に設定](https://github.com/ava-labs/avalanche-docs/tree/master/dashboards)されたダッシュボードも使用できます。

事前に設定されたダッシュボードをインポートするには：

* Grafanaのウェブインターフェースをオープンする
* `+`左側ツールバーをクリックします
* JSONファイルを選択してアップロードするか、`Import via panel json`領域にコンテンツを貼り付けます`Import JSON`。
* データソース`Prometheus`として選択

それで終わりました！今であなたのノードが行うすべてのことに驚くことができます。Woohoo！

