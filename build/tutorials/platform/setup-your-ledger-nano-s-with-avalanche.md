# AvalancheでレジャーナノSあるいはナノX

暗号通貨を安全に安全に安全にするための業界標準は、ハードウェアウォレット、特別なデバイスで、コンピュータと秘密鍵間で完全な孤立を提供します。

以前に作成したAvalancheアドレスを使用する場合は、Avalancheウォレットから得たmnemonic フレーズを使用してリカバリフレーズ手順[から復元](https://support.ledger.com/hc/en-us/articles/360005434914)する必要があります。新しいアドレスを設定する場合は、[新しいデバイス](https://support.ledger.com/hc/en-us/articles/360000613793-Set-up-as-new-device)手順として定期的にセットアップするに従ってください。

Avalanche Ledgerウォレットアプリは、[Ledger Live](https://www.ledger.com/ledger-live)経由で利用できます。

## Ledger Live上でAvalancheをセットアップする方法<a id="1c80"></a>

まず、[Ledger Live](https://www.ledger.com/ledger-live)MacOS、Windows、Linuxだけでなく、iOSとAndroidのためのダウンロードがあります。

{% hint style="danger" %}手続き前に、Ledger Liveアプリケーションを最新版でお持ちください。古いバージョンでは、最新のデバイスファームウェアとAvalancheバージョンが表示されない場合があります。書き込み時の最新のLedger Liveアプリバージョンは、2.26.1です。{% endhint %}

アプリをインストールした後、実行します。「マネージャ」タブに移動し、デバイスの両方のボタンを押して、デバイス管理を許可します。アプリカタログ検索フィールドに "Avalanche"と入力します。Avalancheアプリがv0.5.2（以上）であることを確認し、「インストール」ボタンをクリックします。

![Avalanche Ledgerアプリインストールボタン](../../../.gitbook/assets/ledger-06-live-install.png)

Avalanche v0.5.2を見るべき「アプリがインストールされた」タブに移動することで、インストールが完了したことを確認できます。

![Avalanche Ledgerアプリインストールボタン](../../../.gitbook/assets/ledger-07-live-version.png)

## LedgerでAvalancheウォレットを使用する<a id="48a3"></a>

Avalancheアプリをインストールした後、Ledger経由で[Avalancheウォレット](https://wallet.avax.network/)とやり取りすることができます。これにより、AVAX、トークン、NFTs、クロスチェーンスワップの送信だけでなく、ステーキングやデリゲートが含まれます。

まず、ウォレットにアクセスするには、レジャーをコンピュータに接続し、ピンを入力します。

![PINコード画面](../../../.gitbook/assets/ledger-03-pin.png)

デバイスに複数のアプリがインストールされている場合、左右ボタンを使用してAvalancheアプリを選択します：

![Avalancheアプリ](../../../.gitbook/assets/ledger-04-app-start.png)

両方のボタンを押してアプリを起動します。「Avalanche」アプリ画面上に立ち上げる必要があります。

![アプリバージョン](../../../.gitbook/assets/ledger-05-app-version.png)

Avalancheアプリが実行されていることを確認した後、ウォレットホームページで「ウォレットにアクセスする」ボタンをクリックします。

![ウォレットボタン](https://miro.medium.com/max/2364/1*SC1uM5xFybz3lfPiKwOHUw.png)

後続の「ウォレットにアクセスしたいですか？」で、「レジャー」ボタンをクリックしてください。

![レジャーアクセス](../../../.gitbook/assets/ledger-01-wallet-access.png)

次に、Ledgerデバイス上の公開鍵へのアクセスを確認するメッセージが表示されます。デバイス上のプロンプトと最後の画面上の確認画面で、両方のボタンを押すことで、右ボタンをクリックします。

![](../../../.gitbook/assets/ledger-02-confirm-access.png)

異なるチェーンで異なる鍵が使用されるため、これを2回行う必要があります。成功した場合、ウォレットにサインされ、以前の残高が表示されます。

![ウェブウォレットポートフォリオタブ](../../../.gitbook/assets/web-wallet-portfolio-tab.png)

資金を移動するには、「送信」タブに移動し、X-アドレスを「アドレスを「宛先」フィールドに貼り付けます。額を設定し、オプションでメモを設定します。「確認」を押し、「トランザクションを送信する」ボタン。

![トランザクションを送信する](../../../.gitbook/assets/send-transaction.png)

Ledger上でアクションを確認するメッセージが表示されます。ウェブウォレットに表示されるハッシュが、レジャー上に表示されるものと一致することを確認します。すべてが一致した場合、最後の画面で両方のボタンを押してトランザクションを送信します。

![](https://miro.medium.com/max/2932/1*XI8fzBRpDr0PXcuVQPHLvQ.png)

バランスを更新するアイコンをクリックすると、送金された額と取引手数料あたり減少するはずです。

![ウォレットバランスの更新](../../../.gitbook/assets/refresh-wallet-balance.png)

右側のコラムには、最新のトランザクションが表示されます。拡大ガラスのアイコンをクリックすると、我々のエクスプローラでトランザクションが開きます。

![拡大ガラスを](../../../.gitbook/assets/magnifying-glass.png)

最後に、我々のエクスプローラでトランザクションの詳細を確認できるはずです。これにより、トランザクションID、トランザクションが発生した時のステータス、そしてすべての入力と出力に関する情報が一覧表示されます。

![トランザクション詳細](../../../.gitbook/assets/transaction-details.png)

## より多くのツール<a id="135b"></a>

Ava Labsは、ファイナンスインターネットを構築しています。我々は、人々がファイナンスアプリケーションを構築し、使用方法を再定義することにより、フリクションのない世界を創出するソリューションを開発しています。このインフラの重要な部分はハードウェアウォレットなので、ユーザーは、潜在的に悪意のあるアクターから完全に孤立していると完全に確信することができます。新しくリリースされたLedgerアプリは、ユーザーとコインを安全かつ安全に保つために、業界のベストプラクティスに従うことにより、まさにこれを実行します。

