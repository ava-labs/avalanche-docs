# 元帳Nano SまたはNano XとAvalancheを使用する

暗号通貨を安全に保護するための業界標準は、ハードウェアウォレットであり、コンピューターとプライベートキーの完全な隔離を提供する専門的なデバイスです。

Avalanche アドレスを使用する場合は、Avalanche ウォレットから得た mnemonic フレーズを使用して、リカバリフレーズの手順[から復元](https://support.ledger.com/hc/en-us/articles/360005434914)する必要があります。新しいアドレスを設定する場合は、[新しいデバイス](https://support.ledger.com/hc/en-us/articles/360000613793-Set-up-as-new-device)手順として定期的に設定するだけです。

Avalanche Ledgerウォレットアプリは[Ledger Live](https://www.ledger.com/ledger-live)から利用できます。

## Ledger LiveでAvalancheを設定する方法<a id="1c80"></a>

まず、[Ledger Live](https://www.ledger.com/ledger-live)をインストールする必要があります。MacOS、Windows、Linux、iOS、Android用のダウンロードがあります。

{% ヒント スタイル="danger" %}Ledger Liveアプリケーションの最新バージョンをお持ちでないか確認してください。旧バージョンでは、最新のデバイスファームウェアとAvalancheアプリのバージョンが表示されない場合があります。Ledger Liveアプリの最新バージョンは2.26.1です。{% endhint %}

アプリを正常にインストールした後、それを実行します。 "Manager" タブに移動し、デバイスの両方のボタンを押してデバイス管理を許可します。App Catalog検索フィールドに「Avalanche」と入力します。Avalancheアプリがv0.5.2 \(またはgreater\)であることを確認し、「Install」ボタンをクリックします。

![Avalanche Ledgerアプリのインストールボタン](../../../.gitbook/assets/ledger-06-live-install.png)

Avalanche v0.5.2 を見る必要があります "Apps installed" タブに進み、インストールが成功したことを確認できます。

![Avalanche Ledgerアプリのインストールボタン](../../../.gitbook/assets/ledger-07-live-version.png)

## LedgerでAvalancheウォレットを使用する<a id="48a3"></a>

Avalancheアプリをインストールしたら、Ledgerで[Avalancheウォレット](https://wallet.avax.network/)と対話できます。これには、AVAX、トークン、NFT、クロスチェーンスワップの送信、ステーキングまたはデリゲートが含まれます。

まず、ウォレットにアクセスするには、Ledgerをコンピュータに接続し、ピンを入力します。

![PINコード画面](../../../.gitbook/assets/ledger-03-pin.png)

デバイスに複数のアプリがインストールされている場合は、左と右のボタンを使用してAvalancheアプリを選択します。

![Avalancheアプリ](../../../.gitbook/assets/ledger-04-app-start.png)

両方のボタンを押してアプリを開始します。アプリがバージョン0.5.2 \(またはそれ以降\)であることを確認できる「Avalanche」アプリ画面に上陸する必要があります。

![App バージョン](../../../.gitbook/assets/ledger-05-app-version.png)

Avalancheアプリが実行されていることを確認したら、ウォレットのホームページで「Access Wallet」ボタンをクリックします。

![ウォレットにアクセスするボタン](https://miro.medium.com/max/2364/1*SC1uM5xFybz3lfPiKwOHUw.png)

その後の「ウォレットにどのようにアクセスしたいですか?」で、「Ledger」ボタンをクリックします。

![Ledger Access](../../../.gitbook/assets/ledger-01-wallet-access.png)

Ledger デバイスの公開鍵へのアクセスを確認するように求められます。デバイス上のプロンプトから右ボタンをクリックし、両方のボタンを押して最後の画面で確認します。

![](../../../.gitbook/assets/ledger-02-confirm-access.png)

異なるチェーンで異なるキーが使用されているため、これを2回行う必要があります。成功すると、ウォレットにサインインされ、以前の残高が表示されます。

![Web Wallet Portfolio タブ](../../../.gitbook/assets/web-wallet-portfolio-tab.png)

資金を振り込むには、[送信]タブに移動し、[アドレス]フィールドにX-Addressを貼り付けます。MOJAX-JP-JP-[Confirm]を押し、[トランザクションを送信]ボタンを押します。

![トランザクションを送信する](../../../.gitbook/assets/send-transaction.png)

Ledgerでアクションを確認するように求められます。Webウォレットに表示されるハッシュがLedgerに表示されているものと一致することを確認します。すべてのものが一致する場合は、トランザクションを送信するために最後の画面の両方のボタンを押して確認します。

![](https://miro.medium.com/max/2932/1*XI8fzBRpDr0PXcuVQPHLvQ.png)

バランスを更新するにはアイコンをクリックすると、送金した金額と取引手数料ごとに減少することができます。

![ウォレットの残高を更新](../../../.gitbook/assets/refresh-wallet-balance.png)

右側の列に、最新のトランザクションが表示されます。虫眼鏡アイコンをクリックすると、エクスプローラーでトランザクションが開きます。

![虫眼鏡](../../../.gitbook/assets/magnifying-glass.png)

最後に、トランザクションの詳細をエクスプローラで確認できるはずです。これはトランザクションID、トランザクションが発生した時点、および入力と出力に関するすべての情報を含むトランザクションに関するすべてを表示します。

![トランザクションの詳細](../../../.gitbook/assets/transaction-details.png)

## より多くのツールが来る<a id="135b"></a>

Ava Labsは金融のインターネットを構築しています。私たちは、ファイナンスアプリケーションを構築し、使用する方法を再定義することにより、摩擦のない世界を創出するソリューションを開発しています。このインフラストラクチャの重要な部分はハードウェアウォレットです。そのため、ユーザーは、潜在的に悪意のあるアクターから完全に隔離されていると確信しています。Ledgerアプリは、ユーザーとコインを安全かつ安全に保つための業界のベストプラクティスに従ってこれを実現しています。

