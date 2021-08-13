# Postmanコレクション

## Postmanとは何ですか？

Postmanは、REST、SOAP、GraphQLリクエストを迅速かつ簡単に送信し、APIをテストするために開発者が使用する無料ツールです。Linux、MacOS、Windows用のオンラインツールとアプリケーションとして利用可能です。Postman では、API コールを迅速に発行し、適切にフォーマットされた検索可能なフォームでレスポンスを確認できます。

AvalancheのPostmanコレクションを作成しました。[AvalancheGoインスタンス](../release-notes/avalanchego.md)で利用可能なすべての`public` APIコールを含むため[、](https://docs.avax.network)コマンドをコピー&ペーストすることなく、ノードに迅速に発行し、レスポンスを確認できます。

APIコレクションに加えて、PostmanのAvalanche環境の例もあります。これは、ノードのIPアドレス、Avalancheアドレス、クエリーの同様の共通要素などの共通変数を定義しています。

これにより、ノード上のタブを簡単に維持し、その状態を確認し、クイッククエリを実行して、その操作の詳細を確認できます。

## JP-JP-

### Postman インストール

Postman は、ローカルにインストールするか、Web アプリケーションとして使用することができます。操作を簡素化するため、アプリケーションをインストールすることをお勧めします。Postmanは、その[ウェブサイト](https://www.postman.com/downloads/)からダウンロードできます。Web アプリとコンピューターにインストールされているアプリ間でワークスペースを簡単にバックアップして共有できるので、メールアドレスを使用してサインアップすることをお勧めします。

![Postmanをダウンロード](../../.gitbook/assets/postman_01_download.png)

アプリケーションをインストールしたら、それを実行します。アカウントを作成するか、ログインするように促されます。そうしなさい。繰り返しますが、それは必要ではありませんが、推奨します。

### コレクションインポート

[Workspaces] タブから [`New workspace`] を選択し、プロンプトに従って新しいワークスペースを作成します。これにより、残りの作業が行われる場所になります。

![新しいワークスペース](../../.gitbook/assets/postman_02_workspace.png)

コレクションをインポートする準備ができました。Worskspaces タブのヘッダーで`[新規`]を選択し、`[リンク`] タブに切り替えます。

![Import コレクション](../../.gitbook/assets/postman_03_import.png)

そこで、URL入力フィールドにコレクションへのリンクを貼り付けます。

```text
https://raw.githubusercontent.com/ava-labs/avalanche-postman-collection/master/Avalanche.postman_collection.json
```

Postman はファイルコンテンツのフォーマットを認識し、ファイルをコレクションとしてインポートするよう申し出ます。インポートを完了します。これで、Avalancheコレクションがワークスペースに表示されます。

![Collection contents](../../.gitbook/assets/postman_04_collection.png)

### 環境のインポート

次に、環境変数をインポートする必要があります。再び、Worskspacesタブのヘッダーが`[新規`]を選択し、`[リンク`]タブに切り替えます。今回は、環境JSONへのリンクを貼り付けます。

```text
https://raw.githubusercontent.com/ava-labs/avalanche-postman-collection/master/Example-Avalanche-Environment.postman_environment.json
```

Postman はファイルの形式を認識します:

![環境のインポート](../../.gitbook/assets/postman_05_environment.png)

ワークスペースにインポートします。JavaScript-JP-JP-これらは、インポートされたファイルのデフォルトとは異なるパラメータです。

EJP-JP-JP

![環境コンテンツ](../../.gitbook/assets/postman_06_variables.png)

`[編集`]ボタンを選択してデフォルトを変更します。最小限にして、ノードのIPアドレスを変更する必要があります。これは`、ホスト`変数の値です。Node \(`initial` と `current` value\ の両方を変更します)のIPに変更します。また、Postmanをインストールした同じマシンでノードが動作していない場合は、適切な[コマンドラインオプション](../references/command-line-interface.md#http-server)をチェックして、APIポートで接続を外部から受け付けていることを確認してください。

ノードにクエリする準備ができました これでNodeのJavaScriptを入力します

## APIコールの作成

`Health` など、API コールグループのいずれかを開きます。`getLiveness`コールをダブルクリックします:

![APIコール](../../.gitbook/assets/postman_07_making_calls.png)

このコールのフォーマットは、`http`、`host`、および `port` 環境変数を使用しています。`[送信`]をクリックします。Requestは送信され、すぐにレスポンスが表示されます`。[Body]```タブにレスポンスが表示されます。

![JPRESSENTS](../../.gitbook/assets/postman_08_response.png)

実際の呼び出しとノードに送信される変数を確認するには、API コールタブの`Body`タブに切り替えます。変数を変更して、さまざまなクエリへの応答を確認できます。

## JP-JP-

チュートリアルが完了したら、ターミナルで curl コマンドを乱すことなくAPIコールをノードにすばやく発行できるようになりました。これにより、ノードの状態をすばやく確認したり、変更を追跡したり、ノードの健全性や活性度をダブルチェックしたりできます。

## JavaScript-JP-JP-

このコレクションを[Avalanche API](https://docs.avax.network/build/avalanchego-apis)で最新の状態に保ち、[またデータビジュアル化](https://learning.postman.com/docs/sending-requests/visualizer/#visualizing-response-data)も加えていきたいと考えています。Avalanche Postman Collection の改善に役立つ場合は、まず `master` を分岐して feature ブランチを作成します。次に feature ブランチを改善し、最後に [pull request](https://github.com/ava-labs/avalanche-docs/pulls) を作成して、作業を `master に`マージします。

その他のご質問やご提案がございましたら、[ぜひご相談ください。](https://chat.avalabs.org/)

