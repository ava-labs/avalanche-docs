# Avalancheノードを監視する

_Jovica Popović 氏にこのチュートリアルを書いたコミュニティメンバー、Jovica Popović 氏に感謝します。_[_Discord_](https://chat.avax.network)で彼に連絡することができます_。_

## JavaScript-JavaScript-JavaScript-Java

このチュートリアルでは、Ubuntu 18.04 または 20.04 を使用していることを前提にしています。

このチュートリアルでは、[AvalancheGo](https://github.com/ava-labs/avalanchego) のインスタンスを監視するためのインフラストラクチャを設定する方法を説明します。私たちは使用します:

* [Prometheus](https://prometheus.io/)-Data-Data-
* [Node\_exporter](https://github.com/prometheus/node_exporter) はマシンに関する情報を取得します。
* AvalancheGoのノードに関する情報を取得する[メトリックAPI](https://docs.avax.network/build/avalanchego-apis/metrics-api)
* [Grafana](https://grafana.com/)はダッシュボードでデータを可視化します。

前提条件:

* AvalancheGoノードを実行している
* ノードを実行しているマシンへのシェルアクセス
* マシン上の管理者権限

### **Caveat: セキュリティ**

{% ヒント スタイル="danger" %}ここに記載したシステムは、パブリックインターネットに開く**べきで**はありません。PrometheusもGrafanaも、不正アクセスに対して強化されていません。両方の両方がセキュアなプロキシ、ローカルネットワーク、またはVPNでのみアクセスできることを確認してください。このチュートリアルの範囲を超えて設定することはありませんが、注意してください。悪いセキュリティ慣行により、攻撃者がノードにコントロールできるようになります。正しいセキュリティ慣行に従うことはあなたの責任です。{% endhint %}

### JavaScript-JP-JP-

Grafanaダッシュボードの基礎は[ColmenaLabs](https://blog.colmenalabs.org/index.html)の良い人達から採用されました。このチュートリアルを改善する方法についてのアイデアや提案がある場合は、そのようなことを言って、問題を投稿するか、[Github](https://github.com/ava-labs)でプルリクエストを行ってください。

## Prometheusを設定する

まず、システムユーザーアカウントを追加し、ディレクトリを作成する必要があります \(superuser credentials\):

```cpp
sudo useradd -M -r -s /bin/false prometheus
```

```cpp
sudo mkdir /etc/prometheus /var/lib/prometheus
```

必要なユーティリティを取得します。もし、それらがまだインストールされていない場合には、:

```cpp
sudo apt-get install -y apt-transport-https
```

```cpp
sudo apt-get install -y software-properties-common wget
```

次に、[Prometheus](https://prometheus.io/download/)の最新バージョンへのリンクをダウンロードページ \(適切なプロセッサー・アーキテクチャーを指定してください)から取得し、wget を使ってアーカイブを解凍します。

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

次に、バイナリを移動し、所有権を設定し、configファイルを適切な場所に移動する必要があります。

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

`/etc/prometheus` は設定に使用され、データには `/var/lib/prometheus` は使用されます。

Prometheusをシステムサービスとして実行するように設定しましょう。Do**:**

```cpp
sudo nano /etc/systemd/system/prometheus.service
```

\(またはそのファイルを選択した\ のテキストエディタで開きます)、次の設定を入力します。

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

JavaScript-JP-JP-Prometheus をシステムサービスとして実行できます:

```cpp
sudo systemctl daemon-reload
```

```cpp
sudo systemctl start prometheus
```

```cpp
sudo systemctl enable prometheus
```

プロメテウスが走るはずです確認するには、次のようにチェックできます。

```cpp
sudo systemctl status prometheus
```

どのようなものを生成する必要があります:

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

Prometheus Webインターフェースもチェックできます。`http://your-node-host-ip:9090/`

{% ヒント スタイル="warning" %}`JP`-JP-**{% endhint %}

## Grafanaをインストールする

UbuntuでGrafanaプロジェクトリポジトリを設定するには:

```cpp
wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
```

```cpp
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
```

Grafanaをインストールするには:

```cpp
sudo apt-get update
```

```cpp
sudo apt-get install grafana
```

JavaScript-JP-JP-

```cpp
sudo systemctl daemon-reload
```

```cpp
sudo systemctl start grafana-server
```

```cpp
sudo systemctl enable grafana-server.service
```

正常に動作していることを確認するには:

```text
sudo systemctl status grafana-server
```

grafana `をアクティブ`に表示する必要があります。Grafanaは、`http://your-node-host-ip:3000/`で利用できるようになりました。

{% ヒント スタイル="warning" %}`JP`-JP-**{% endhint %}

username/password admin/admin でログインし、新しい安全なパスワードを設定します。GrafanaをデータソースPrometheusに接続する必要があります。

GrafanaのWebインターフェースでは：

* 左側のメニューのConfigurationに移動し、[データソース]を選択します。
* [データソースの追加]をクリックします。
* Prometheusを選択します。
* フォームに、名前 \(Prometheus will do\) と、`http://localhost:9090` を URL として入力します。
* `[保存&テスト]`をクリックします。
* "Data source is change" 緑色のメッセージをチェックします。

## node\_exporterの設定

AvalancheGoのメトリックに加えて、マシン自体のモニタリングを設定してみましょう。そこでCPU、メモリ、ネットワーク、ディスクの使用状況を確認し、異常を認識することができます。そのため、Node\_exporter を使用します。

JPJ-PARJ-PARJ

```text
curl -s https://api.github.com/repos/prometheus/node_exporter/releases/latest | grep browser_download_url | grep linux-amd64 |  cut -d '"' -f 4 | wget -qi -
```

`-```-Untar and executable:

```cpp
tar xvf node_exporter-1.1.2.linux-amd64.tar.gz
```

```cpp
sudo mv node_exporter-1.1.2.linux-amd64/node_exporter /usr/local/bin
```

JavaScript-JP-JP-

```cpp
node_exporter --version
```

次にnode\_exporterをサービスとして追加します。Do:

```cpp
sudo nano /etc/systemd/system/node_exporter.service
```

\(またはそのファイルを選択した\ のテキストエディタで開き、次のように入力します。

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

これにより、node\_exporter を設定して、興味深いと思うさまざまなデータを収集します。サービスを起動し、起動時にそれを有効にします。

```cpp
sudo systemctl start node_exporter
```

```cpp
sudo systemctl enable node_exporter
```

繰り返しますが、サービスが正しく動作していることを確認します。

```cpp
sudo systemctl status node_exporter
```

`JavaScript`-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-Java必要に応じて修正し、その後サービスを再起動します。

これで、私たちはそれをすべて結びつける準備ができています。

## AvalancheGoとnode\_exporter Prometheusジョブの構成

AvalancheGoノードが適切な[コマンドライン引数](../../references/command-line-interface.md)で実行されていることを確認します。メトリクス API を有効にしておく必要があります。CLI 引数 `--http-host` を使用して、ホストマシンの外部から API 呼び出しを行う場合は、API がリスニングするアドレスに注意してください。

Prometheus ジョブを定義する必要があります。Prometheusの設定を編集しましょう:

--

```cpp
sudo nano /etc/prometheus/prometheus.yml
```

\(またはそのファイルを選択した\ のテキストエディタで開き、最後に追加します:

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

**インデントは重要です。**`-job_name` が既存`の -job_name` エントリと垂直に揃っていることを確認し、他の行も適切にインデントされます。Node の構成方法に応じて、正しいホスト IP または `localhost` を使用してください。

Config ファイルを保存して Prometheus を再起動します:

```cpp
sudo systemctl restart prometheus
```

Prometheus Webインターフェース `http://your-node-host-ip:9090/targets` で確認してください。3つのターゲットが有効に表示されるはずです。

* Prometheus-JP
* avalanchego-JP
* avalanchego-Machine-JP-JP

それらのすべてが`State`を`UP`として持っていることを確認してください。

Grafanaを開きます。これで、これらのソースを使用してダッシュボードを作成できます。また、[事前設定されたダッシュボード](https://github.com/ava-labs/avalanche-docs/tree/master/dashboards)を使用することもできます。

あらかじめ設定されたダッシュボードをインポートするには:

* GrafanaのWebインターフェースを開く
* 左のツールバーの`+`をクリックします。
* `JSONを`インポートしてJSONファイルをアップロードするか、パネルjsonエリア`から`コンテンツをインポートに貼り付けます。
* `Prometheus`をデータソースとして選択します。

それでいい！これで、ノードが行うすべてのことを驚くことができます。- ウーフー！

