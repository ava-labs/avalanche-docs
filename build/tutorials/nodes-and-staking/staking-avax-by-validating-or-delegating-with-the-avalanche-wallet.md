# 検証あるいはデレゲートすることで、AvalancheウォレットでAVAXをステークする

## **はじめに**<a id="001f"></a>

Avalancheウォレットは、ミドルウェアやサーバー、そして通信を一切使用しない、ウェブベースのアプリケーションです。AvalancheウォレットはVue JSで記述され、オンラインでアクセスすることも、コンパイルしてローカルで実行することもできます。

Avalancheウォレットは、[こちら](https://wallet.avax.network/)でアクセスできます。  Avalancheウォレットのソースコードは、[ここ](https://github.com/ava-labs/avalanche-wallet)にあります。

**ステークを取得しましょう。**

### **ステップ1 - Avalancheウォレットを開く**<a id="552d"></a>

![掲載画像](https://miro.medium.com/max/1552/0*tpBIOjLdppuNKMjA)

キーフレーズ、キーストアファイル、Ledger Nano S（まもなく公開予定）で、ウォレットにアクセスできます。

### **ステップ2 - 「獲得」セクションに移動する**<a id="dc5a"></a>

![掲載画像](https://miro.medium.com/max/1504/0*XTh3nZzBI1bkLbwO)

**ステークするは、**[**プラットフォームチェーン（P-Chain）**](../../../learn/platform-overview/#platform-chain-p-chain)**で利用できる資金を持っていなくてはなりません。資金が**[**取引所チェーン（X-Chain**](../../../learn/platform-overview/#exchange-chain-x-chain)**）にある場合、クロスチェーン転送を開始してP-Chainに転送する必要があります。トークンがロックされている場合は、既にP-Chain上にあるため、X-ChainからP-Chainにクロスチェーン転送を実行する必要はありません。**

![掲載画像](https://miro.medium.com/max/1522/0*xKAf0nXSzqIdmBDg)

P-Chainに転送する金額を入力し、次の「転送」ボタンをクリックして転送を完了しましょう

![掲載画像](https://miro.medium.com/max/1488/0*aremeYNYtKP5nGPx)

できました！

![掲載画像](https://miro.medium.com/max/1512/0*XP8f8CISy-LJ_Lc3)

これで、P-Chainにステークする資金を準備できました。ここで、バリデーターまたはデリゲーターをウォレットに追加できます。

### **ステップ3A：バリデーターになる**！<a id="60f0"></a>

バリデーターを追加するには、ノードを実行する必要があります。リリースされた[バイナリ](https://github.com/ava-labs/avalanchego/releases/)で設定するか、[AvalancheGoソースコード](https://github.com/ava-labs/avalanchego)から構築できます。

バイナリの使用は簡単・便利で、4つのステップでバリデーターを設定できます。

* [こちら](https://github.com/ava-labs/avalanchego/releases)にある最新リリースtar.gz（osxとWindows用zip）をダウンロードする
* 選択したフォルダに解凍：

\* Linux：tar -xvf avalanchego-linux-<バージョン>tar.gz

※OSX：avalanchego-<バージョン＞zipを解凍する

\* Windows：avalanchego-win-<バージョン>zipを解凍する

* バイナリディレクトリcd avalanchego<バージョン>に移動する
* LinuxとOSX、WindowsのAvalancheGoでバイナリと一緒に./avalanchegoを実行する

ノードブートストラップと残りのネットワークとの同期をすれば、準備は完了です。

ノードIDが必要です。[情報API](../../avalanchego-apis/info-api.md)で見つけましょう。

ノードの設定にヘルプが必要な場合は、[Discord](https://chat.avax.network/)に参加してください。

![掲載画像](https://miro.medium.com/max/1600/0*6hZSaT651Dd7R4bL)

フィールドを入力し、確認します。

![掲載画像](https://miro.medium.com/max/1600/0*cy61ZMDY5veMvCZj)

詳細を慎重に確認し、再び「確認」をクリックします。

![掲載画像](https://miro.medium.com/max/1600/0*f3GlN03He6TFkOV7)

おめでとうございます。これで、Avalanche一次ネットワークを検証しています。

### ****ステップ3B：デリゲーターを追加する<a id="59bd"></a>

![掲載画像](https://miro.medium.com/max/1600/0*f-wXi2SiSm4eBmHt)

アクティブなネットワークバリデーターのリストからトークンをデリゲートするバリデーターを選択します。

![掲載画像](https://miro.medium.com/max/1600/0*uNnT2PtjCslRKFbF)

ステーク期間とステーク量を指定します。選択したバリデーターの終了時間に注意してください。デリゲーション期間は、バリデーターが設定された終了日を過ぎて終了するように設定することはできません。

![掲載画像](https://miro.medium.com/max/1600/0*M_6_7L9jtYuPTp-A)

詳細を確認します。

![掲載画像](https://miro.medium.com/max/1600/0*Silj8-uZTm5g9xSi)

おめでとうございます。これで、Avalanche一次ネットワークをデリゲートしています。

