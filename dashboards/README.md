# Grafanaダッシュボード

これらは、ノードモニタリングの[セットアップ](../build/tutorials/nodes-and-staking/setting-up-node-monitoring.md)に示すように、セットアップで動作する、事前に構成されたGrafanaダッシュボードです。

事前に設定されたダッシュボードをインポートするには：

* Grafanaのウェブインターフェースをオープンする
* `+`左側ツールバーをクリックします
* JSONファイルを選択してアップロードするか、`Import via panel json`領域にコンテンツを貼り付けます`Import JSON`。
* データソース`Prometheus`として選択

| リンク | 説明 |
| :--- | :--- |
| [ネットワーク](network.json) | ネットワーキング情報を入手する |
| [データベース](database.json) | データベース操作について詳細な情報を入手する |
| [マシン](machine.json) | コンピュータノードに関する情報が実行中です |
| [X-Chain](x_chain.json) | X-Chain操作について詳細な情報を示すダッシュボード |
| [P-Chain](p_chain.json) | P-Chain操作について詳細な情報を示すダッシュボード |
| [C-Chain](c_chain.json) | C-Chain操作について詳細な情報を示すダッシュボード |
| [メインダッシュボード](main.json) | メインダッシュボード、他のダッシュボードとのリンクで、最も重要な情報を示し、スタートポイントとして役に立つメインダッシュボード |

