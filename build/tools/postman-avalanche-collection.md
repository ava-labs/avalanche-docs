# Postmanコレクション

## ポストマンとは何ですか？

Postmanは、REST、SOAP、GraphQL要求を迅速かつ簡単に送信したり、APIをテストするために開発者が使用する無料ツールです。オンラインツールと、Linux、MacOS、Windowsのためのアプリケーションとして利用できます。Postmanにより、APIコールを迅速に発行し、きっと適切にフォーマットされた検索可能なフォームでレスポンスを確認できます。

[Avalanche](https://docs.avax.network)Goインスタンス上で利用可能なすべてのパブリックAPIコールが含まれ[ており](../release-notes/avalanchego.md)、長くて複雑なコマンドをコピーして貼り付けることなく、素早くノードにコマンドを発行し、レスポンスが表示されるようにします`curl`。

APIコレクションに加え、PostmanのためのAvalanche環境例も存在します。これにより、ノードのIPアドレス、Avalancheアドレス、クエリの同様の共通要素といった変数を定義する例が存在します。

組み合わせると、ノード上のタブを維持し、その状態を確認し、その操作について詳細を確認するクイッククエリを実行することができます。

## セットアップ

### Postmanインストール

Postmanは、ローカルでインストールするか、ウェブアプリとして使用することができます。操作がシンプル化するため、アプリケーションのインストールをお勧めします。Postmanは、その[ウェブサイト](https://www.postman.com/downloads/)からダウンロードすることができます。その後、ワークスペースは簡単にバックアップされ、ウェブアプリとコンピュータにインストールされたアプリ間で共有できるよう、メールアドレスを使用してサインアップすることを推奨します。

![Postmanをダウンロード](../../.gitbook/assets/postman_01_download.png)

アプリをインストールした後、実行してください。アカウントを作成するか、ログインするようメッセージが表示されます。そうしてください。繰り返します。

### コレクションインポート

ワークスペースタブ`New workspace`から選択し、プロンプトに従って新しいワークスペースを作成します。これにより、残りの作業が完了する場所になります。

![新しいワークスペース](../../.gitbook/assets/postman_02_workspace.png)

我々はコレクションをインポートする準備が完了しました。Worskspacesタブのヘッダーで選択し`New`、タブに切り替えます`Link`。

![インポートコレクション](../../.gitbook/assets/postman_03_import.png)

そこで、URL入力フィールドで、コレクションにリンクを貼り付けます：

```text
https://raw.githubusercontent.com/ava-labs/avalanche-postman-collection/master/Avalanche.postman_collection.json
```

Postmanは、ファイルの内容を認識し、ファイルをコレクションとしてインポートするよう提供します。インポートを完了します。これで、ワークスペースでAvalancheコレクションが完了します。

![コレクションコンテンツ](../../.gitbook/assets/postman_04_collection.png)

### 環境インポート

次に、環境変数をインポートする必要があります。繰り返します。Worskspacesタブのヘッダーが選択`New`し、タブに切り替えます`Link`。今回は、環境JSONにリンクを貼り付けます：

```text
https://raw.githubusercontent.com/ava-labs/avalanche-postman-collection/master/Example-Avalanche-Environment.postman_environment.json
```

Postmanは、ファイルのフォーマットを認識します：

![環境インポート](../../.gitbook/assets/postman_05_environment.png)

ワークスペースにインポートします。さて、あなたの特定のインストール上の実際のパラメータに合わせてその環境を編集する必要があります。これらは、インポートされたファイルのデフォルトと異なるパラメーターです。

環境ドロップダウンダイナミックの横にいる目のアイアイアイコンをクリックします：

![環境](../../.gitbook/assets/postman_06_variables.png)

デフォルトを変更する`Edit`ボタンを選択します。最小限にして、ノードのIPアドレスを変更する必要があります`host`。`initial``current`ノードのIPに変更します。また、Postmanをインストールした同じマシン上でノードが実行されていない場合、適切な[コマンドラインオプション](../references/command-line-interface.md#http-server)をチェックし、APIポート上の接続を受け付けていることを確認してください。

これで、すべてをソートし、ノード問い合わせが完了しました。

## APIコールを作る

APIコールグループを開く`Health`。ダブルクリックコール`getLiveness`：

![APIコール](../../.gitbook/assets/postman_07_making_calls.png)

呼び出しのフォーマットが、この`http`ような`port`環境変数を使用`host`する様子が表示されます。をクリックします`Send`。リクエストが送信され、間もなく、次のタブに表示される`Body`タブに次のようにします。`Response`

![レスポンス](../../.gitbook/assets/postman_08_response.png)

実際の呼び出しとノードに送信される変数を見るには、APIコールタブで`Body`タブに切り替わります。そこで、変数を素早く変更し、異なるクエリにレスポンスが表示されるようにすることができます。

## 結論

チュートリアルを完了した場合、端末でカールコマンドを混乱することなく、素早くノードにAPIコールを送信することができます。これにより、ノード内の状態を素早く確認したり、変更を追跡したり、ノードの健康や生息状況を二重チェックすることができます。

## コントリビュート

[Avalanche API](https://docs.avax.network/build/avalanchego-apis)で、このコレクションを継続的に最新の状態に保つとともに、[データビジュアライズを](https://learning.postman.com/docs/sending-requests/visualizer/#visualizing-response-data)追加したいと期待しています。Avalanche Postmanコレクションを改善できるようになれば、まずファイアーブランチを作成し、その後、ファイアーブランチ上に改善を行い`master`、最後にあなたの作業をマージする[プルリクエスト](https://github.com/ava-labs/avalanche-docs/pulls)を作成します`master`。

他に質問や提案がある場合、[我々にご相談ください。](https://chat.avalabs.org/)

