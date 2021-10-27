# Avalancheノードを監視する

_このチュートリアルを執筆してくれた、コミュニティメンバーのJovica Popovićに感謝します。必要に応じて、_[_Discord_](https://chat.avax.network)_で彼に連絡することができます。_

## はじめに

このチュートリアルでは、ノードでUbuntu 18.04または20.04を実行していることを想定しています（Mac OX版チュートリアルは後ほど）。

このチュートリアルでは、[AvalancheGo](https://github.com/ava-labs/avalanchego)のインスタンスを監視するインフラストラクチャの設定方法を説明します。次を使用します。

* データを収集・保存する[Prometheus](https://prometheus.io/)
* マシン情報を入手する[node_exporter](https://github.com/prometheus/node_exporter)
* ノード情報を入手するAvalancheGoの[メトリックAPI](https://docs.avax.network/build/avalanchego-apis/metrics-api)
* ダッシュボードでデータを可視化する[Grafana](https://grafana.com/)。

前提条件：

* AvalancheGoノードが実行していること
* ノードを実行しているマシンへのシェルによるアクセス
* マシン上の管理者権限

### **差し止め請求：セキュリティ**

{% hint style="danger" %}ここに説明したシステムは、一般のインターネットに公開しては**なりません**。ここで示すPrometheもGrafanaも、不正アクセスに対する耐性がありません。必ず両方とも、安全なプロキシ、ローカルネットワーク、VPNでのみアクセスできるようにしてください。その設定に関しては、当チュートリアルでは範疇外ですが、その点をご注意ください。セキュリティ状態が悪いと、攻撃者にノードをコントロールされる恐れがあります。適切なセキュリティ慣行に従うことは、皆さんの責任です。{% endhint %}

### 貢献

Grafanaダッシュボードのベースは、[ColmenaLabs](https://blog.colmenalabs.org/index.html)の人たちが作成したものですが、現在は利用できません。このチュートリアルに対する改善点や提案がある場合は、声をあげ、課題点を投稿し、[Github](https://github.com/ava-labs)でプルリクエストを行ってください。

## Prometheusを設定する

まず、システムユーザーアカウントを追加し、ディレクトリを作成する必要があります。（スーパーユーザー認証情報が必要です）。

```cpp
sudo useradd -M -r -s /bin/false prometheus
```

```cpp
sudo mkdir /etc/prometheus /var/lib/prometheus
```

まだインストールしていない場合は、必要なユーティリティを取得します。

```cpp
sudo apt-get install -y apt-transport-https
```

```cpp
sudo apt-get install -y software-properties-common wget
```

次に、[ダウンロードページ](https://prometheus.io/download/)からPrometheusの最新版のリンクを入手します（適切なプロセッサーアーキテクチャを選択して下さい）。そしてwgetでダウンロードし、アーカイブを解凍します。

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

設定には`/etc/prometheus`、データには`/var/lib/prometheus`を使用します。

システムサービスとして実行するPrometheusを設定してみましょう。次を行います**:**

```cpp
sudo nano /etc/systemd/system/prometheus.service
```

（またはそのファイルを選択したテキストエディタで開き）、次の設定を入力します。

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

ファイルを保存します。これで、システムサービスとしてPrometheusを実行できるようになりました。

```cpp
sudo systemctl daemon-reload
```

```cpp
sudo systemctl start prometheus
```

```cpp
sudo systemctl enable prometheus
```

Prometheusを実行しています。次で確認できます。

```cpp
sudo systemctl status prometheus
```

次のような出力となる必要があります。

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

また、`http://your-node-host-ip:9090/`で利用できるPrometheusウェブインターフェースも確認できます。

{% hint style="warning" %}ファイアウォールがオンになっている場合は、`sudo ufw allow 9090/tcp`を行う必要があります。**{% endhint %}

## Grafanaをインストールする

UbuntuでGrafanaプロジェクトリポジトリを設定するには、次を実行します。

```cpp
wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
```

```cpp
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
```

Grafanaをインストールするには、次を実行します。

```cpp
sudo apt-get update
```

```cpp
sudo apt-get install grafana
```

サービスとして設定するには、次を実行します。

```cpp
sudo systemctl daemon-reload
```

```cpp
sudo systemctl start grafana-server
```

```cpp
sudo systemctl enable grafana-server.service
```

正しく実行されているいるかを確認するには、次を実行します。

```text
sudo systemctl status grafana-server
```

grafanaを`active`として表示する必要があります。`http://your-node-host-ip:3000/`でGrafanaが利用できるようになりました。

{% hint style="warning" %}ファイアウォールがオンになっている場合は、`sudo ufw allow 3000/tcp`を行う必要があります。**{% endhint %}

ユーザー名/パスワード管理/管理でログインし、新しく安全なパスワードを設定します。ここで、GrafanaをデータソースPrometheusに接続する必要があります。

Grafanaのウェブインターフェース上では、次を行います。

* 左側メニューで「Configuration（設定）」に移動し、「Data Sources（データソース）」を選択します。
* 「Click Add Data Source（データソースを追加する）」をクリックします。
* Prometheusを選択します。
* フォームに、名前（Prometheus）と、URLとして`http://localhost:9090`を入力します。
* `Save & Test`をクリックします。
* 「Data source is working（データソースが機能しています）」というグリーンのメッセージを確認します。

## node_exporterを設定する

AvalancheGoのメトリックに加えて、マシン自体のモニタリングを設定してみましょう。そうすれば、CPU、メモリ、ネットワーク、ディスクの使用量を確認し、どのような異常でも認識できます。それには、Prometheusプラグインであるnode_exporterを使用します。

次で最新のバージョンを取得します。

```text
curl -s https://api.github.com/repos/prometheus/node_exporter/releases/latest | grep browser_download_url | grep linux-amd64 |  cut -d '"' -f 4 | wget -qi -
```

別のアーキテクチャ（例えば、RasberryPiは`linux-arm64`）がある場合には、`linux-amd64`を変更します実行ファイルを展開して移動します。

```cpp
tar xvf node_exporter-1.1.2.linux-amd64.tar.gz
```

```cpp
sudo mv node_exporter-1.1.2.linux-amd64/node_exporter /usr/local/bin
```

で正しくインストールされていることを確認してください。

```cpp
node_exporter --version
```

次に、サービスとしてnode_exporterを追加します。次を行います。

```cpp
sudo nano /etc/systemd/system/node_exporter.service
```

（またはそのファイルを選択したテキストエディタで開き）、次のように展開します。

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

これにより、node_exporterを設定し、興味のあるデータを収集します。サービスを起動し、ブート時に有効にします。

```cpp
sudo systemctl start node_exporter
```

```cpp
sudo systemctl enable node_exporter
```

再度、サービスが正しく実行されていることを確認します。

```cpp
sudo systemctl status node_exporter
```

`Ignoring unknown escape sequences`などのメッセージが表示された場合は、サービスファイルの内容が正しくコピーされていること、そして追加のバックスラッシュや新ラインがないことを二重確認してください。必要に応じて修正し、その後にサービスを再起動します。

これで、すべてを1つに結び付ける準備ができました。

## AvalancheGoとnode_exporterのジョブを設定する

適切な[コマンドライン引数](../../references/command-line-interface.md)でAvalancheGoノードを実行していることを確認してください。メトリックAPIを有効（デフォルト）にする必要があります。ホストマシンの外部からAPI呼び出しを行うためにCLI引数`--http-host`を使用する場合は、どのAPIでのアドレスなのかメモを取っておいてください。

ここで、適切なPrometheusジョブを定義する必要があります。Prometheusの設定を編集してみましょう。

次を行います。

```cpp
sudo nano /etc/prometheus/prometheus.yml
```

（またはそのファイルを選択したテキストエディタで開き）、その末尾に追加します。

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

**インデントが重要です**。`-job_name`が既存の`-job_name`エントリと垂直に揃っていることを確認し、他のラインも適切にインデントされていることを確認します。ノードの設定に応じて、正しいホストIPまたは`localhost`を使用するようにしてください。

設定ファイルを保存し、Prometheusを再起動します。

```cpp
sudo systemctl restart prometheus
```

`http://your-node-host-ip:9090/targets`でPrometheusウェブインターフェースを確認します。3つのターゲットが有効になっています。

* Prometheus
* AvalancheGo
* avalanchego-machine

そのすべてに`UP`として`State`があることを確認します。

Grafanaを開きます。これで、このようなソースでダッシュボードを作成できるようになりました。また、[設定済のダッシュボード](https://github.com/ava-labs/avalanche-docs/tree/master/dashboards)を使用することもできます。

設定済のダッシュボードをインポートするには、次を行います。

* Grafanaのウェブインターフェースを開きます。
* 左のツールバーの`+`をクリックします。
* `Import JSON`を選択し、JSONファイルをアップロードするか、`Import via panel json`の領域にコンテンツを貼り付けます。
* データソースとして`Prometheus`を選択します。

完了です。これで、ノードが行う素晴らしいすべてのことができるようになりました。やったー！

