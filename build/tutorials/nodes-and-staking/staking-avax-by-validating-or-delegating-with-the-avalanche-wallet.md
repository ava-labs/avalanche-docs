# Avalancheウォレットで、AVAXをバリデーションあるいはデレギートすることでステークします。

## **はじめに**<a id="001f"></a>

Avalancheウォレットは、ミドルウェアやあらゆる種類のサーバー通信が存在しません。Avalancheウォレットは、Vue JSで書かれており、オンラインでアクセスするか、コンパイルしてローカルで実行することができます。

Avalancheウォレットは[こちらから](https://wallet.avax.network/)アクセスできます。  Avalancheウォレットソースコードは[、ここから](https://github.com/ava-labs/avalanche-wallet)入手できます。

**ステーキングを始めましょう！**

### **ステップ 1 —Avalancheウォレットを開く**<a id="552d"></a>

![ポストのための画像](https://miro.medium.com/max/1552/0*tpBIOjLdppuNKMjA)

鍵フレーズ、キーストアファイル、あるいはレジャーナノSを使用してウォレットにアクセスすることができます。（間もなく公開されます！）

### **ステップ 2: 「獲得」セクションに移動します。**<a id="dc5a"></a>

![ポストのための画像](https://miro.medium.com/max/1504/0*XTh3nZzBI1bkLbwO)

**ステークを起こすには、**[**プラットフォームチェーン（P-Chain）**](../../../learn/platform-overview/#platform-chain-p-chain)上で資金を利用する必要があります**！あなたの資金が**[**取引所チェーン（X-Chain）**](../../../learn/platform-overview/#exchange-chain-x-chain)上に存在する場合、クロスチェーン振り込みを開始することにより、P-**Chainに移動する必要があります。あなたのトークンがロックされている場合、すでにP-Chain上に存在するので、X-ChainからP-Chainへのクロスチェーン移行を実行する必要はありません。**

![ポストのための画像](https://miro.medium.com/max/1522/0*xKAf0nXSzqIdmBDg)

P-Chainに送金したい金額を入力し、下記の「転送」ボタンをクリックして、転送を完了します。

![ポストのための画像](https://miro.medium.com/max/1488/0*aremeYNYtKP5nGPx)

Voila！

![ポストのための画像](https://miro.medium.com/max/1512/0*XP8f8CISy-LJ_Lc3)

現在、P-Chain上にステーキングするための資金が用意されています。次に、バリデータやデリゲータをウォレットに追加することができます。

### **ステップ3A：バリデータになる！**<a id="60f0"></a>

バリデータを追加するには、ノード実行が必要です。リリースされた[バイナリ](https://github.com/ava-labs/avalanchego/releases/)を使用してセットアップするか、[AvalancheGo](https://github.com/ava-labs/avalanchego)ソースコードからビルドすることができます。

バイナリの使用は簡単で便利です。そして、4ステップでバリデータとして設定するようにします。

* [最新](https://github.com/ava-labs/avalanchego/releases)リリース tar.gz（osxとウィンドウのzip）をダウンロードする
* 我々が選択したフォルダに展開します：

\* Linux：tar -xvf avalanchego-linux-<VERSION>.tar.gz

\* OSX：unzip avalanchego-macos-<VERSION>.zip

\*Windows：unzip avalanchego-win-<VERSION>.zip

* バイナリディレクトリ cd avalanchego-<VERSION>
* Linux、OSX、Windows上でAvalancheGoで./avalanchegoでバイナリを実行します。

ノードブートストラップや残りのネットワークと同期させ、ロールできるようになります。

ノードIDが必要になります。[情報API](../../avalanchego-apis/info-api.md)を使用していることが見つかろう！

ノード設定にヘルプが必要な場合、[Discord](https://chat.avax.network/)上で参加してください。

![ポストのための画像](https://miro.medium.com/max/1600/0*6hZSaT651Dd7R4bL)

フィールドを入力し、確認しましょう！

![ポストのための画像](https://miro.medium.com/max/1600/0*cy61ZMDY5veMvCZj)

注意深く詳細を確認し、再度「確認」を押してください！

![ポストのための画像](https://miro.medium.com/max/1600/0*f3GlN03He6TFkOV7)

おめでとうございます。Avalancheプライマリネットワークをバリデートしています！

### **ステップ3B：デレゲータを追加！**<a id="59bd"></a>

![ポストのための画像](https://miro.medium.com/max/1600/0*f-wXi2SiSm4eBmHt)

アクティブなネットワークバリデータリストから、トークンを委任するバリデータを選択します。

![ポストのための画像](https://miro.medium.com/max/1600/0*uNnT2PtjCslRKFbF)

ステーキング期間とステーク金額を指定します。選択されたバリデータ終了時刻に注意してください。バリデータが設定された終了日を超えてデータが終了するように設定することはできません。

![ポストのための画像](https://miro.medium.com/max/1600/0*M_6_7L9jtYuPTp-A)

詳細を確認しましょう！

![ポストのための画像](https://miro.medium.com/max/1600/0*Silj8-uZTm5g9xSi)

おめでとうございます。Avalancheプライマリネットワークを委任しています！

