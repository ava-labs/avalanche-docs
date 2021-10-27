# Grafanaダッシュボード

[Setting up node monitoring（ノードモニタリングの設定）](../build/tutorials/nodes-and-staking/setting-up-node-monitoring.md)で説明されているように、セットアップで動作する設定済みのGrafanaダッシュボードがあります。

設定済みのダッシュボードをインポートする。

* Grafanaのウェブインターフェースを開きます。
* 左のツールバーから`+`をクリックします。
* `Import JSON`を選択し、JSONファイルをアップロードするか、`Import via panel json`の領域にコンテンツを貼り付けます。
* データソースとして`Prometheus`を選択します。

| リンク | 説明 |
| :--- | :--- |
| [ネットワーク](network.json) | ネットワーク情報を持つダッシュボード |
| [データベース](database.json) | データベース操作について詳細な情報があるダッシュボード |
| [マシン](machine.json) | コンピューターノードの情報が実行中です。 |
| [X-Chain](x_chain.json) | X-Chainの動作の詳細な情報を表示するダッシュボード |
| [P-Chain](p_chain.json) | P-Chainの動作の詳細な情報を表示するダッシュボード |
| [C-Chain](c_chain.json) |  C-Chainの動作の詳細な情報を表示するダッシュボード |
| [メインダッシュボード](main.json) | メインダッシュボード。これは、最も重要な情報や他のダッシュボードへのリンクを表示し、ここからスタートすると便利です。 |

