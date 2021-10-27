# Postmanコレクション

## Postmanとは？

Postmanは、REST、SOAP、GraphQLリクエスト、テストAPIを迅速かつ簡単に送信するために開発者が使用する無料ツールです。これは、Linux、MacOS、Windowsのオンラインツールとアプリケーションの両方として利用できます。Postmanでは、API呼び出しを迅速に発行し、適切にフォーマットされた検索可能なフォーマットでレスポンスを確認することができます。

当社は[Avalanche](https://docs.avax.network)のPostmanコレクションを作成しました。これには[AvalancheGoインスタンス](../release-notes/avalanchego.md)上で利用できる公開API呼び出しが含まれています。これにより、長く複雑な`curl`コマンドをコピーして貼り付ける必要はなくなりました。

APIコレクションとともに、PostmanのAvalanche環境例もあります。これは、ノードのIPアドレス、自分のAvalancheアドレス、クエリの同様な共通要素といった共通変数を定義するので、それらを複数回入力する必要はありません。

これらを組み合わせると、ノードのタブを簡単に維持し、その状態をチェックして、その操作についての詳細を確認するクイッククエリを実行することができます。

## セットアップ

### Postmanインストール

Postmanはウェブアプリとしてローカルにインストールすることができます。操作が簡素化されるため、アプリケーションのインストールをお勧めします。Postmanは[ウェブサイト](https://www.postman.com/downloads/)からダウンロードすることができます。メールアドレスを使用してサインアップすることをお勧めします。そうすると、ワークスペースを簡単にバックアップして、Webアプリとコンピューターにインストールされているアプリ間で共有できます。

![Postmanをダウンロード](../../.gitbook/assets/postman_01_download.png)

アプリケーションをインストールした後、実行します。アカウントを作成するか、ログインします。そのようにしてください。改めて、必要ではありませんが推奨します。

### コレクションインポート

Workspacesタブから`New workspace`を選択し、新しいワークスペースを作成します。これが残りの仕事が行われる場所となります。

![新しいワークスペース](../../.gitbook/assets/postman_02_workspace.png)

コレクションをインポートする準備ができました。Worskspacesタブのヘッダーで`New`を選択し、`Link`タブに切り替えます。

![コレクションのインポート](../../.gitbook/assets/postman_03_import.png)

そこで、URL入力フィールド内でコレクションにリンクを貼り付けます。

```text
https://raw.githubusercontent.com/ava-labs/avalanche-postman-collection/master/Avalanche.postman_collection.json
```

Postmanは、ファイルコンテンツのフォーマットを認識し、コレクションとしてのファイルのインポートを提供します。インポートを完了します。これで、ワークスペースにAvalancheコレクションが得られます。

![コレクションコンテンツ](../../.gitbook/assets/postman_04_collection.png)

### 環境インポート

次に、環境変数をインポートする必要があります。再び、Worskspacesタブのヘッダーを選択`New`し、`Link`タブに切り替えます。今回は、環境JSONにリンクを貼り付けます。

```text
https://raw.githubusercontent.com/ava-labs/avalanche-postman-collection/master/Example-Avalanche-Environment.postman_environment.json
```

Postmanがファイルのフォーマットを認識します。

![環境インポート](../../.gitbook/assets/postman_05_environment.png)

ワークスペースにインポートします。ここで、特定のインストールの実際のパラメータに合わせるためにその環境を編集する必要があります。これらは、インポートされたファイルのデフォルトとは異なるパラメータです。

環境ドロップダウンの横にある目の形をしたアイコンをクリックします。

![環境コンテンツ](../../.gitbook/assets/postman_06_variables.png)

`Edit`ボタンを選択し、デフォルトを変更します。少なくとも、`host`変数の値、すなわちノードのIPアドレスを変更する必要があります。それをノードのIPに変更します(`initial`と`current`値の両方を変更)。また、Postmanをインストールした同じマシン上でノードが実行されていない場合は、適切な[コマンドラインオプション](../references/command-line-interface.md#http-server)をチェックして、外部からAPIポート上の接続を受け入れていることを確認してください。

これで、すべてをソートし、ノードをクエリする準備ができました。

## API呼び出しを作る

API呼び出しグループ(例えば`Health`)を開きます。`getLiveness`呼び出しをダブルクリックします。

![API呼び出し](../../.gitbook/assets/postman_07_making_calls.png)

呼び出しのフォーマットが、`http``host``port`環境変数を使用しているのが分かります。`Send`をクリックします。リクエストが送信され、そのレスポンスがすぐに`Response`の`Body`タブに表示されます。

![レスポンス](../../.gitbook/assets/postman_08_response.png)

実際の呼び出しとノードに送信される変数を確認するには、API呼び出しタブで`Body`タブに切り替えます。そこで、変数を迅速に変更し、異なるクエリへのレスポンスを確認することができます。

## 結論

チュートリアルを完了すると、ターミナルでcurlコマンドを混乱させることなく、ノードにAPI呼び出しを迅速に発行できるようになります。これにより、ノードの状態を迅速に確認したり、変更を追跡したり、ノードの健全性またはLivenessの再確認をすることができます。

## 貢献

当社は、[Avalanche API](https://docs.avax.network/build/avalanchego-apis)を使用して、このコレクションを継続的に最新の状態に保ち、[データの可視化](https://learning.postman.com/docs/sending-requests/visualizer/#visualizing-response-data)も追加してゆきたいと考えています。Avalanche Postmanコレクションを改善できる場合は、まず`master`から分岐して機能ブランチを作成し、次に機能ブランチを改善し、最後に`master`に自分の仕事をマージする[プルリクエスト](https://github.com/ava-labs/avalanche-docs/pulls)を作成します。

ご不明な点や問題、ご提案がある場合は、[お問い合せください](https://chat.avalabs.org/)。

