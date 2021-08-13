# Avalanche Bridge \(AB\)FAQ

## Avalanche Bridge \(AB\)FAQ

Avalanche Bridge \(AB\)はERC20トークンをEthereumからAvalancheのC-Chainに転送するために使用できます。この文書は、ブリッジについてよくある質問に答えます。この文書およびその他の文書があなたの質問に答えない場合は、[Avalancheの](https://support.avax.network)サポートサイト[Discord](https://chat.avalabs.org)または[Telegram](https://t.me/avalancheavax)でお問い合わせください。

### JPT-JP-JP

#### トランザクションが失敗した場合、どうすればいいですか？

Et[here](avalanche-bridge-faq.md#speed-up-transaction)umトランザクションがAvalancheに資金を移転するように見えると、確認がない場合は、ここに説明したようにトランザクションをスピードアップできます。Ethereumトランザクションがすでに35件の確認を受けていますが、Avalancheトランザクションタイマーが失敗しているようであれば、AvalancheネットワークでMetamaskウォレットの残高を確認してください。JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-トランザクションを「スピードアップ」することを選択した場合に、これは起こる可能性があります。

Ethereumに資金を移転するときにブリッジによって発行されたEthereumトランザクションは35の確認を受け取るのに長い時間がかかることは非常にあり得ません。これは、Ethereumのガス価格に突然の大きな急騰がある場合に発生する可能性があります。Ethereumで発行された200ブロック内にトランザクションが含まれていない場合、トランザクションを「アンティック」するために、ガス価格が高い新しいトランザクションが発行される可能性があります。

#### ガス価格が送金額より多くなったらどうなりますか？

ERC20アセットをEthereumからAvalancheに移行する際、必要なトークン数を任意の場所に移行できます。このブリッジは、取引手数料を最小限に抑えるような方法で設計されました。ただし、トランザクション手数料が送金する値よりも高い場合、Ethereumのガス価格が下落するまで待つことは理にかなっています。

AvalancheからEt[here](avalanche-bridge-faq.md#fees)umに資産を移行する場合、ブリッジは、ここに説明したように現物移行手数料を請求します。ユーザーインターフェイスにより、手数料額より少ない転送が可能になりました。ユーザーが手動でそのようなトランザクションを生成し、発行する場合、ブリッジはトランザクションを無効とマークし、処理しません。

#### Avalancheで作成したトークンをEthereumに送ることはできますか？

まだまだだABは現在、ERC20トークンの移転のみをサポートしています。これを有効にするには、今後も計画しています。

#### ETHまたはBTCをブリッジで送ることはできますか？

ABは現在、ネイティブETHまたはBTCをサポートしていません。ただし、これらのアセット \(WETH と WBTC\) をブリッジを渡ってラップしたバージョンを転送できます。

#### トランザクションがエクスプローラーに表示されない場合はどうなりますか？

ブリッジ転送に対応するトランザクションは、AvalancheおよびEthereumネットワークのエクスプローラーに表示されます。トランザクションが表示されるまでに数分かかる場合があります。エクスプローラーでトランザクションを検索するには、[AvalancheのC-Chain Explorer](https://cchain.explorer.avax.network/)または[Etherscan](https://etherscan.io/)にアドレスをコピー&ペーストします。ブリッジ自体で送信されたトランザクションを表示するには、ここではAvalancheを探すことができます。そして、ここではEt[here](https://cchain.explorer.avax.network/address/0x50Ff3B278fCC70ec7A9465063d68029AB460eA04/transactions)[](https://etherscan.io/address/0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0)umを探すことができます。まだ取引が表示されない場合は、[Telegram](https://t.me/avalancheavax)または[Discord](https://chat.avax.network/)でご連絡ください。

#### 橋梁の使い方についてのチュートリアルはありますか？

はい、あなたは、ブリッジ機能のビデオチュートリアルを見ることができます [ここ](https://www.youtube.com/playlist?list=PLRHl-ulWK4-FPRA7SS1OrCOC8cOc2K8sP).

#### 他のネットワーク上の別のアドレスに送信できますか？

JavaScript-JP-JP-アセットが他のネットワークに転送された後、どの住所または契約に送信できます。

#### トランザクションをスピードアップすることはできますか？<a id="speed-up-transaction"></a>

はい、あなたはMetamaskの「スピードアップ」ボタンをクリックすることができます。Metamaskによるトランザクションは、元々送られたトランザクションよりも高いガス価格を持つEthereum上で新しいトランザクションを発行します。新しい取引はガス価格が高いため、ブロックに含まれる可能性が高くなります。JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-資金をブリッジに移行するトランザクションをスピードアップすることは安全です。ただし、ユーザーインターフェイスは新しいトランザクションを認識しません。つまり、ユーザーインターフェイスに確認が表示されない可能性があります。新しいトランザクションがEthereumで35の確認済みの場合は、AvalancheのMetamaskウォレットを確認して、ラップされた資金を確認してください。

#### Metamaskに表示されるトークン数が私が指定した数と一致しないのはなぜですか？

AvalancheからEthereumに転送する場合、Metamaskは0トークンが転送されることを示しています。これはMetamaskの既知の問題です。

#### ブリッジ契約のアドレスは何ですか？

Bridge Addresses:
* Ethereum: [`0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0`](https://etherscan.io/address/0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0)
* Avalanche:[`0x50Ff3B278fCC70ec7A9465063d68029AB460eA04`](https://cchain.explorer.avax.network/address/0x50Ff3B278fCC70ec7A9465063d68029AB460eA04)

トークンを**これらのアドレスに直接転送することはでき**ません。Bridgeのユーザーインターフェイスを使用する必要があります。これは、誤ったトランザクションをチェックします。

### JP-JP-

#### Avalanche Bridgeではどのように手数料がかかりますか？

ブリッジは、AvalancheおよびEthereumネットワークでのトランザクション手数料のコストをカバーするために送金手数料を請求します。これらの手数料は、ERC20アセットが移管される現物で課金されます。つまり、トークンを転送するとき、ABによって転送された残高の一部が手数料として取られます。

この手数料は、推定Ethereum取引手数料の割合で、価格変動を考慮した一定の金額(現在$5\)です。

限られた時間、この割合はユーザーに資産の移転を促すためにゼロです。さらに、Avalancheへの移動は、ここに記載されているAVAXエアロップの対象となる可能性があります[。](avalanche-bridge-faq.md#airdrop)

#### ガス推定方法は？ブリッジはどのようにトークン価格を得るのですか？

BridgeはChainlink価格フィードを使用して、Ethereumネットワークのガス価格情報を取得します。使用するガス価格は、Chainlink FASTGAS値とGeth gas価格近似値の高い値です。ガス価格は、ブリッジによって送信されたトランザクションがEthereumブロックに迅速に含まれていることを保証するために、いくつかのGWEIによってパッドされています。

また、ブリッジはChainlink価格フィードを使用して、ブリッジ料金と同等のトークンの量を計算するために使用されるトークン価格を決定します。

#### エアドロップはありますか？<a id="airdrop"></a>

EthereumからAvalancheにトークン75ドル以上(変更される場合があります)を送金すると、ユーザーは0.1 AVAXが空気を落とします。

#### もし、Airdropが届かなかったらどうなりますか？

航空便が届いていない場合は、振込金額が必要な最低金額を満たしていることを確認してください。

### --

#### Avalanche Bridgeは信頼できないですか？

Avalanche Bridgeは、誰も担保資産またはミントラップ資産として保有する資金にアクセスできないという意味で信頼できないのです。ブリッジを渡るすべての転送は、4つの独立した関係者 \(wardens\) の3によって承認される必要があります。この意味で、ブリッジの使用は、資金を送金するために、いかなる当事者にも信頼を必要としません。

#### 看守の役割とは何ですか？

wardens の役割は 4 つです。

1. Secret Sharesの保存
2. Blockchainsのインデックス作成
3. 処理済みトランザクションの追跡
4. JPY-JPY-

Wardenの役割と責任の完全な内訳は、今後のAvalanche Bridge Tech Designの記事で提供されます。

#### Ava LabsとWardensの関係は何ですか？

この会長は、アバランシェ財団の信頼できるパートナーです。彼らは、Avalancheと協力して技術的卓越した実績を持っています。

#### コードは監査されましたか？監査報告書はどこにありますか？

はい、ブリッジ、ワード、スマートコントラクトのコードはHalbornによって監査されています。監査レポートは[こちらから](https://github.com/ava-labs/avalanche-bridge-resources/tree/main/SecurityAudits/v1_1)ご覧いただけます。

### トークン

#### どのようなトークンが橋渡し可能ですか？

ERC20トークンだけがブリッジを渡って転送できます。

#### どのように私はブリッジにトークンを追加することができますか？

[こちら](https://github.com/ava-labs/avalanche-bridge-resources#readme)をご覧ください。

#### Metamaskにブリッジで使用されているトークンを追加するにはどうすればよいですか？

チュートリアルについては[こちら](https://www.youtube.com/watch?v=vZqclPuPjMw&list=PLRHl-ulWK4-FPRA7SS1OrCOC8cOc2K8sP&index=3)を参照してください。

#### ETHからWETHを取得するにはどうすればよいですか？

MetamaskのSWAP関数を使用してETHからWETHに交換できます。また、Ethereumで[Uniswap](https://app.uniswap.org/#/)などのAMMを使用することもできます。

#### なぜ2つのタイプの同じトークンがありますか？どのようなものがアバランシェ橋から派生したのか分かるには？

この文書が参照する現世代のAvalanche Bridge \(AB\)は、AEBと呼ばれる以前のブリッジ実装によって前期に置かれています。AEBブリッジとABブリッジにはそれぞれ独自のトークンセットがあります。AEBトークンはABトークンに賛成して非推奨になりました。ABトークンには`.e`サフィックスがあります。JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-ABトークン契約アドレスは[こちらから](https://github.com/ava-labs/avalanche-bridge-resources/blob/main/avalanche_contract_address.json)確認できます。

#### なぜ新しいブリッジド・トークンがウォレットに自動的に表示されないのですか？

トークンはC-chainアドレスではなく、トークンのスマートコントラクトで保持されます。Wallet(Metamask)に、どのスマートコントラクトがアドレスが保有する残高を確認するかを伝える必要があります。

### サポートされているチェーン

#### どのチェーンがAvalanche Bridgeでサポートされていますか？

Avalanche Bridgeは現在、Ethereum ERC20sの移転のみをAvalanche C-Chainに、その逆にのみサポートしています。Avalanche C-Chainで作成されたERC20の移転をサポートする予定です。また、AvalancheやEthereum以外のネットワークをサポートする予定です。

### JavaScript-JP-JP-

この文書が参照する現世代のAvalanche Bridge \(AB\)は、AEBと呼ばれる以前のブリッジ実装によって前期に置かれています。JavaScript-JP-JP-

#### AEBはいつ動作を停止しますか？

AEBは無効化され、それに渡る転送はもはやできません。AEBのEthereum側に保有する資金は、新しいAvalanche Bridge \(AB\)に移管されました。Avalanche C-Chainでトークン変換が有効になり、ABBトークンがAvalanche Bridgeで同等の1-1ベースでAEBトークンを変換できます。この変換は、[https://bridge.avax.network/convert](https://bridge.avax.network/convert) で行うことができます。AEB トークンサポートタイムラインは、個々の DApp プロジェクトに残ります。

#### AEBトークンをEthereumに転送できますか？

AEBトークンをEthereumに移行するには、上記の質問で説明したように、まずABトークンに変換する必要があります。変換後、新しいAvalanche Bridgeを使用してABトークンをEthereumに戻すことができます。

#### AEB \(非推奨ブリッジ\)トークンをAvalanche Bridge \(AB\)トークンに変換するにはどうすればよいですか？

AEBトークンをAB[ユーザーインターフェイス](http://bridge.avax.network/convert)を使用してABトークンに変換できます。さらに、Pangolinなどの多くのエコシステムプロジェクトは、ユーザーがトークンを簡単に変換し、新しい流動性プールに参加できるように努力しています。

### デザイン/技術

#### BridgeToken契約でtx.orginの使用は安全ですか？

tx.originを使用してスマートコントラクト内の認証を確認することは、セキュリティ上のリスクをもたらしますが、当社のユースケースではありません。ブリッジ契約では、tx.originはスマートコントラクトを「unwrap」関数から直接呼び出すことを許可するだけです。なぜなら、ブリッジは現在、外部所有のアカウントからの転送のみをサポートしています。tx.orgin値をmsg.sender値と比較することでこれを行うことは安全です。

#### 1つの秘密鍵のミントトークンはできますか？

SGX エンクレーブアドレスにアクセスする一人一人のパーティーはありません。enclave自体のみが、4人のワーデンから承認を受けたときに、そのキーを使用してトランザクションを構築/署名できます。この意味で、ここでのエンクレーブは、クロスチェーンスマートコントラクトとして機能しています。

#### なぜブリッジがスマートコントラクトに資金を保持しないのですか？

スマートコントラクトを使用しないと、エンドツーエンドの転送要件を簡素化し、ガス料金を低くし、送金の迅速化を実現します。

#### デザインに関する詳細情報はどこで見つけられますか？

[Avalanche Bridge: Intel SGX を使用したセキュアなクロスチェーンアセットトランスファー](https://medium.com/avalancheavax/avalanche-bridge-secure-cross-chain-asset-transfers-using-intel-sgx-b04f5a4c7ad1)を参照してください。

### JavaScript-JP-JP-

#### Proof of Assetsページで、EthereumとAvalancheの資産の量をマッチしませんか？

ブリッジは、3つの理由から、過剰担保化された\(すなわち、Ethereum 上に存在するよりもERC20アセットを保持する)ことができます。これらはすべて期待されています。

1. EthereumからAvalancheへの新しい移転があります。ブリッジは、Ethereumトランザクションが35の確認を受け取ったら、トランザクションを転送するだけです。それ以前は、担保バランスは、包まれた資産供給よりも多くなります。
2. AEB担保は新しいABブリッジに移転しましたが、AvalancheのすべてのABトークンに変換されていないわけではありません。
3. Bridgeの料金はEthereum側に蓄積されています。エンクレーブは、橋から生成された料金をすぐに徴収しません。代わりに、構成されたしきい値が満たされるまで、ブリッジウォレット内の各アセットのすべての収集された手数料を保持します。その時点で、手数料は別々のウォレットに送られます。

#### AVAXはどこで購入できますか？

所在地によっては、AVAXを一元化した取引所で購入できる可能性があります。AVAXは[Pangolin](https://app.pangolin.exchange/)などの分散型取引所で購入することもできます。

#### どのように私はサポートのために誰かに連絡することができますか？

サポートは、[support.avax.network](https://support.avax.network)または[Discord](https://chat.avax.network/)サーバーで利用できます。

#### トークン名の.eサフィックスは何を意味しますか？

`.e`サフィックスは、アセットがEthereumからブリッジを渡ったことを示しています。

#### AvalancheでMetamaskを設定するにはどうすればよいですか？

Metamaskウォレットを設定してAvalancheネットワークに接続するには、[こちら](https://support.avax.network/en/articles/4626956-how-do-i-set-up-metamask-on-avalanche)をご覧ください。

## JPE-JP-JP

### プロジェクトをエコシステムディレクトリに追加するにはどうすればよいですか？

プロジェクトをエコシステムディレクトリに追加するには、e-`mail ecommission@avalabs.org`までメールでお願いします。下記の内容を含んでください:

* プロジェクト名
* サービスの簡単な説明
* プロジェクトのロゴの88h x 88w .svgバージョン

   Avalancheチームのメンバーがあなたに戻って、プロジェクトの追加を確認します。

#### Ecosystemページで宣伝されたバナーを取得するにはどうすればよいですか？

プロジェクトをAvalanche Ecosystemページのプロモーションカルーセルセクションに記載したい場合は、 `ecompany@avalabs.org` までご連絡ください。プロジェクトの概要とプロモーションに関する詳細を記載してください。Ava Labsサポートチームメンバーは2営業日以内にご返信いたします。

バナーの指定は次の通りです:

* デスクトップと風景：1155px \* 440px
* ポートレートとモバイル：720px \* 337px
* バナーの真ん中またはそれらが切り離されます
* BG としてソリッドカラーを使用するか、 \#00 \(edited\) にフェードするグラデーションを持つ
