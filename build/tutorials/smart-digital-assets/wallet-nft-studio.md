# AvalancheウォレットでNFTを作成する

## Avalancheの非ファンジブルトークン

[Avalanche](../platform/)は、固定キャップアセット、可変キャップアセット、および非真菌性トークン \(NFTs\)を含むデジタルアセットの作成をネイティブにサポートしています。

一部のアセットは真菌性であり、そのアセットのすべてのユニットは完全に交換可能であることを意味します。例えば、通貨のノートは真偽です。例えば、1 $5 ノートは他の $5 ノートと同じ扱いです。一部の資産は、対照的に、真菌性ではありません。つまり、要素は一意で完全に交換可能ではありません。不動産は、土地の各部分が異なるため、真菌性はありません。

非真菌トークンとは、一意の資産の所有権を証明するのに役立つ方法です。

## NFT Studio on Avalanche Wallet on JP

[Avalanche Wallet](https://wallet.avax.network/)の**NFT Studio**を使用してNFTを作成できます。このチュートリアルでは、**Collectible**アセットを作成します。: 画像と説明付きの汎用NFT、またはカスタムペイロード付きのNFTです。シンプルなポイントとクリックインターフェイスを使用してそれらを作成できます。また、技術的な知識は必要ありません。

**NFT Studio**にアクセスするには、Avalanche Walletにログインします。左側で、**Studio**を選択します。

![NFTスタジオ](../../../.gitbook/assets/nft-studio-01-select.png)

これによりNFT Studioが開きます。2つのオプションがあります:NFTの新しいファミリーを作成するには、**New Family**、および既存のファミリーに新しいアセットを作成するための**Mint Collectible**です。NFTの最初のファミリーを作成する必要がありますので、**New Family**をクリックします。

### NFTファミリーの作成

そこで、コレクターファミリーの名前とシンボル \(ticker\)を入力するように求められます。名前は一意でなければならない。

![新しいファミリーを作成する](../../../.gitbook/assets/nft-studio-02-family.png)

また、**Number of Groups** の値を入力する必要があります。これは、新しく作成したファミリーがどのくらいの個別のコレクティブルを保持するかを指定します。一度作成したら、collectible ファミリーのパラメーターを変更することはできませんので、慎重に選択してください。

完了したら、[**Create**]キーを押して、Collectibleファミリーを作成します。取引手数料は、ウォレットの残高から差し引かれます。ファミリーが作成されると、トランザクションID \(TxID\)とファミリーのパラメーターが表示されます。TxID を使用して[、](https://explorer.avax.network/)エクスプローラー内のトランザクションを調べることができますが、それを書き留める必要はありません。

**Back to Studio**を押して戻り、最初のコレクタブルを作成する準備ができました。**Mint Collectible**を押します。

### Mint NFTs

**Mint Collectible**を押した後、まだ作成されていないCollectibleグループがまだ存在するCollectibleファミリーのリストが表示されます。

![家族を選択する](../../../.gitbook/assets/nft-studio-03-select-family.png)

作成したファミリーを選択します。新しいコレクティブルパラメーターでフォームに記入するように求められます。

![Mint a Collectible](../../../.gitbook/assets/nft-studio-04-mint.png)

デフォルトでは、**Generic** タイプの collectible が選択されます。これはNFT**で、タイトル、**画像の**URL**、および**Description**を持つものです。必要なデータと**、**コレクターの数を決定します。前述のように、データを慎重に入力してください。トークンがマイニングされたら何も変更できません。データのプレビューが表示され、収集可能な状態がどのようなものかを確認できます。

写真の収集機能以外に何か他のものを持ちたい場合は、**[カスタム]**を選択します。

![Custom Collectible-Collectible](../../../.gitbook/assets/nft-studio-05-custom.png)

カスタムコレクターは、**UTF-8**エンコードされた文字列、**URL**、**JSON** ペイロードを含むことができます。JavaScript-JP-JP-

完了したら、**Mint**を押してコレクティブルを作成します。取引手数料はウォレットから差し引かれ、新しく作成されたコレクタブルがウォレットに置かれます。

### あなたのコレクティブルを見る

コレクティブルの概要は、常に画面上部に表示され、残高とともに表示されます。

![JavaScript-JP-JP-](../../../.gitbook/assets/nft-studio-06-overview.png)

コレクティブルを詳細に表示するには、左側のメニューから**「**ポートフォリオ」を選択します。すべてのアセットを表示する画面が表示され、トークンがデフォルトで選択されています。選択範囲を**Collectibles**に変更します。

![Collectibles一覧](../../../.gitbook/assets/nft-studio-07-collectibles.png)

Generic collectibleごとに、タイトルとともに写真が表示されます。また、ポートフォリオ内のコピー数を示す番号も表示されます。ポインターでコレクターをマウスカードする場合は、詳細な説明が表示されます。

![Collectibleの詳細](../../../.gitbook/assets/nft-studio-08-detail.png)

クリックしてコレクターを選択すると、そのグループの数量が表示さ**れ**ます。

## NFTを送信する

誰かにコレクティブルを送信するには、ポートフォリオで選択したコレクティブルで**[**Send]ボタンをクリックするか、左側のメニューの**[Send**]タブに移動して[**Collectibleを追加**]をクリックします。

![Collectiblesの選択](../../../.gitbook/assets/nft-studio-09-send.png)

あなたが送信したいコレクターを選択するためのメニューが表示されます。

![複数のコレクティブル](../../../.gitbook/assets/nft-studio-10-multiple.png)

複数のコレクティブルを1回のトランザクションで送信できます。コレクターのラベルをクリックすると、送信するコピー数を編集できます。複数のファミリーとコレクタータイプを1回のトランザクションで送信できます。

JavaScript-JP**-**JP-

![JavaScript-JP-JP-](../../../.gitbook/assets/nft-studio-11-send-transaction.png)

**トランザクションを押し**た後、ネットワーク上に公開され、トランザクション手数料はお客様の残高から差し引かれます。Collectiblesはすぐに宛先アドレスに堆積されます。

## JavaScript-JP-JP-

NFT ファミリー、ミント NFT グループを作成し、NFT を送信できるようになりました。楽しんでください！あなたの作品を[SNSチャンネル](https://www.avalabs.org/social)でシェアしてください！

NFTがAvalancheネットワーク上でどのように動作するか、NFTを使った製品の構築をご希望の場合は、この[NFT](creating-a-nft-part-1.md)チュートリアルをご覧ください。技術的な質問がある場合は、[Discord](https://chat.avalabs.org/)サーバーでお問い合わせください。

