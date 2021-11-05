# AvalancheでLedger Nano SあるいはNano Xを使用する

暗号通貨の安全を確保するため業界標準は、ハードウェアウォレット、つまりコンピュータと秘密鍵間に完全なアイソレーションを提供するための専用デバイスです。

先に作成したAvalancheアドレスを使用したい場合は、Avalancheウォレットから取得したニーモニックフレーズを使用して[リカバリーフレーズからの復元](https://support.ledger.com/hc/en-us/articles/4404382560913-Restore-from-recovery-phrase)の手順を使用する必要があります。新しいアドレスを設定する場合は、[新しいデバイスとして設定](https://support.ledger.com/hc/en-us/articles/360000613793-Set-up-as-new-device)する通常の手順に従ってください。

Avalanche Ledgerウォレットアプリは、[Ledger Live](https://www.ledger.com/ledger-live)を介して使用できます。

## Ledger Live上でAvalancheを設定する方法<a id="1c80"></a>

最初に、[Ledger Live](https://www.ledger.com/ledger-live)をインストールする必要があります。MacOS、Windows、LinuxおよびiOSとAndroid用のダウンロードがあります。

{% hint style="danger" %}実行する前に、Ledger Liveアプリケーションのバージョンが最新であることを確認してください。古いバージョンでは、最新のデバイスファームウェアやAvalancheアプリバージョンが表示されない場合があります。この文章作成時の最新のLedger Liveアプリバージョンは、2.26.1です。{% endhint %}

アプリのインストールが正常に完了したら、アプリを実行してください。「マネージャー」タブを開き、端末の両ボタンを押してデバイス管理を許可します。App Catalog検索フィールドに、「Avalanche」を入力します。Avalancheアプリがv0.5.2（またはそれ以上）であることを確認し、「Install（インストール）」ボタンをクリックします。

![Avalanche Ledgerアプリインストールボタン](../../../.gitbook/assets/ledger-06-live-install.png)

「Apps installed（インストールされたアプリ）」タブに移動し、Avalanche v0.5.2が表示されていれば、インストールが成功したことを確認できます。

![Avalanche Ledgerアプリインストールボタン](../../../.gitbook/assets/ledger-07-live-version.png)

## LedgerでAvalancheウォレットを使用する<a id="48a3"></a>

Avalancheアプリをインストールすると、Ledgerを介して[Avalancheウォレット](https://wallet.avax.network/)とやり取りすることができるようになります。これには、AVAX、トークン、NFTs、クロスチェーンスワップの送信およびステークあるいはデリゲートが含まれます。

ウォレットにアクセスするには、まずLedgerをコンピュータにプラグインし、暗証番号（PIN）を入力します。

![PIN（暗証番号）コード画面](../../../.gitbook/assets/ledger-03-pin.png)

デバイスに複数のアプリがインストールされている場合は、左右のボタンを使用してAvalancheアプリを選択してください。

![Avalancheアプリ](../../../.gitbook/assets/ledger-04-app-start.png)

両方のボタンを押してアプリを起動します。「Avalanche」アプリの画面が表示され、アプリのバージョンが0.5.2（またはそれ以上）であることが確認できます。

![アプリのバージョン](../../../.gitbook/assets/ledger-05-app-version.png)

Avalancheアプリの実行を確認した後、ウォレットホームページ上で「Access Wallet \(ウォレットにアクセス）」ボタンをクリックします。

![Access Walletボタン](https://miro.medium.com/max/2364/1*SC1uM5xFybz3lfPiKwOHUw.png)

次の「How do you want to access your wallet? \(ウォレットへのアクセス方法\)」で、「Ledger」ボタンをクリックします。

![Ledgerにアクセスする](../../../.gitbook/assets/ledger-01-wallet-access.png)

Ledgerデバイス上の公開鍵へのアクセスを確認するよう求められます。デバイス上でのプロンプトで右ボタンをクリックし、最後の画面で両方のボタンを押して確認します。

![](../../../.gitbook/assets/ledger-02-confirm-access.png)

異なるチェーンに異なる鍵が使われているため、この動作を2度行う必要があります。成功すると、ウォレットへのサインインが行われ、これまでの残高が表示されます。

![ウェブウォレットのPortfolio（ポートフォリオ）タブ](../../../.gitbook/assets/web-wallet-portfolio-tab.png)

資金を転送するには、「Send（送信）」タブに移動し、「To Address（宛先）」フィールドにX-Addressを貼り付けます。金額を指定し、オプションでmemo（備考）を設定します。「Confirm（確認）」を押し、「Send Transacition（トランザクションを送信）ボタンを押します。

![Send Transaction（トランザクションを送信）](../../../.gitbook/assets/send-transaction.png)

Ledgerで実行の確認を求められます。ウェブウォレットに表示されているハッシュが、Ledgerで表示されているものと一致していることを確認します。すべてが一致している場合、最後の画面で両方のボタンを押してトランザクションの送信を確認してください。

![](https://miro.medium.com/max/2932/1*XI8fzBRpDr0PXcuVQPHLvQ.png)

アイコンをクリックして最新の残高に更新します。送信した金額とトランザクション手数料が引かれた金額が表示されています。

![ウォレット残高を更新](../../../.gitbook/assets/refresh-wallet-balance.png)

右側の列に最新のトランザクションが表示されます。拡大鏡アイコンをクリックすると、エクスプローラでトランザクションが開きます。

![拡大鏡](../../../.gitbook/assets/magnifying-glass.png)

ここでエクスプローラ上でトランザクションの詳細を確認することができます。トランザクションID、トランザクションのステータス、トランザクションが行われたタイミング、インプットとアウトプットにかかわるすべての情報を含む取引のすべてがここにリストされます。

![トランザクションの詳細](../../../.gitbook/assets/transaction-details.png)

## 公開予定のツール<a id="135b"></a>

Ava Labsは、金融のインターネットを構築しています。当社では、金融アプリケーションを構築、使用する方法を再定義することにより、摩擦のない世界を創り出すソリューションを開発しています。このインフラの重要な部分はハードウェアウォレットです。そのおかげで、ユーザーは自分の秘密鍵とコインが潜在的に悪意のある攻撃者から完全に隔離されていることを完全に確信できます。新たにリリースしたLedgerアプリは、ユーザーとコインの安全を守る業界のベストプラクティスに従うことでこれを実現しています。

