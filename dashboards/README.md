# Grafanaダッシュボード

これらは、[ノード監視](../build/tutorials/nodes-and-staking/setting-up-node-monitoring.md)の設定に示すように、設定で動作するGrafanaダッシュボードです。

事前設定済みのダッシュボードをインポートするには:

* GrafanaのWebインターフェースを開く
* 左のツールバーの`+`をクリックします。
* `JSONを`インポートしてJSONファイルをアップロードするか、パネルjsonエリア`から`コンテンツをインポートに貼り付けます。
* `Prometheus`をデータソースとして選択します。

| JPL-JP | JavaScript-JP-JP- |
| :--- | :--- |
| [JPN-WEBサイト](network.json) | ネットワーク情報を持つダッシュボード |
| [JPD-JPD-](database.json) | Dashboard データベース操作に関する詳細な情報 |
| [マシン](machine.json) | コンピューターノードに関する情報が実行中です。 |
| [X-Chain-JP](x_chain.json) | X-Chain操作に関する詳細な情報を表示するダッシュボード |
| [P-Chain-Chain-JP](p_chain.json) | P-Chain操作に関する詳細な情報を表示するダッシュボード |
| [C-Chain-Chain-JP](c_chain.json) | C-Chain操作に関する詳細な情報を表示するダッシュボード |
| [メインダッシュボード](main.json) | 主なダッシュボード、最も重要な情報を表示し、他のダッシュボードへのリンクを示す、起点として便利です。 |

