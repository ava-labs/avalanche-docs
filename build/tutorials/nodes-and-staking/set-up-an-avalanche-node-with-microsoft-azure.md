---
description: 'コミュニティメンバーが作成するチュートリアル：Seq'
---

# Microsoft AzureでAvalancheノードを実行する

バリデーターを実行し、Avalancheでステーキングすることで、ステークする長さに応じ、9.69～11.54%の極度に競争力のある報酬が得られます。最大レートは1年間のステーキング、最低レートは14日間です。スラッシュも含まれていません、ですから、クライアント側でのハードウェア障害やバグを心配する必要はありません。代わりにAvalancheでは、現在、リワードを受け取るのに最低でも60%の稼働時間を維持する必要があります。この要件を満たさなくてもスラッシュされませんが、リワードを受け取れません。****そのノードでの検証を開始するのに、秘密鍵をノードに置く必要もありません。誰かがクラウド環境に侵入し、ノードにアクセスしても、最悪なケースで、彼らができることは、ノードをオフにするくらいです。

バリデーターノードを実行するとAVAXでリワードを受け取れるだけでなく、後でエコシステムで他のサブネットを検証できるほか、サブネットのネイティブのトークンでリワードを受け取ることもできるようになります。

バリデーターを実行するには、2CPUコア、4GBメモリ、200GB SSDのみが必要であり、膨大な量のエネルギーを使用することはありません。Avalancheの[革命的なコンセンサスメカニズム](https://medium.com/ava-hub/avalanche-consensus-the-biggest-breakthrough-since-nakamoto-66e9917fd656)では、一度にコンセンサスに参加する数百万のバリデーターに拡張でき、類いまれな分散化を提供することができます

現在、バリデーターになるためにステークに必要な最低額は2,000AVAX（価格上昇につれ減少することがある）です。あるいはバリデーターも少額の手数料を請求し、ユーザーがステークをデレゲートして、実行コストに役立つようにできます。[こちら](https://vscout.io/)で計算機を使用して、デリゲートと比較し、ノード実行時にいくら獲得するかを確認することができます。

可能な場合、すべての人に独自のバリデーターを実行するように推奨しますが、最低ステーキング要件に満たしていない場合や現在実行しているノードにデリゲートしたい場合は、[こちら](https://avascan.info/staking/validator/NodeID-MGrikMRTmooL1j7uawPHjaMS1cXkbewdb)を参照してください。

この記事では、Microsoft Azure上でノードを設定するプロセスを順に見ていきます。このチュートリアルでは、Microsoft Azureでの経験がないことを想定し、可能な限り少ないステップを踏んでいきます。

この記事の執筆時点では、2コアと8GBのメモリで仮想マシンの価格設定は毎時わずか0.01060ドルで、年間では113.44ドルとなり、**83.76%の節約になります。これは、通常の現金支払いと比較したものです**。スポット価格で2コアと4GBのメモリを搭載したAWSの仮想マシンと比較すると、年間およそ462ドルです。

## 初期サブスクリプションの構成<a id="6e8d"></a>

### 2ファクタ認証を設定する<a id="b9d0"></a>

まず、Microsoftアカウントが必要です。アカウントがない場合は、次のリンクでアカウント作成のオプションを表示します。すでにアカウントがある場合は、次のリンクに移動し、「2段階認証」を選択して手順に従い、2ファクタ認証を設定して、必ずノードを保護してください。

[https://account.microsoft.com/security](https://account.microsoft.com/security)

![掲載画像](https://miro.medium.com/max/1135/1*tr3rEcrvI4rEpC7KPYqg6g.png)

2ファクタ認証を設定したら、[https://portal.azure.com](https://portal.azure.com/)でMicrosoftアカウントにサインインし、Azureポータルにログインします。ログインすると、サブスクリプションがないため、まず1つ作成する必要があります。次にハイライトされているように、「Subscriptions（サブスクリプション\)」を選択します。

![掲載画像](https://miro.medium.com/max/648/1*5Jp8oXzczaEND-z9_QZaQA.png)

次に、「\+ Add（\+追加）」を選択し、新しいサブスクリプションを追加します

![掲載画像](https://miro.medium.com/max/374/1*Lw3HklSSC8NDN2ftQEVgYA.png)

****SpotインスタンスVM価格（大きく低価格）を使用したい場合は、無料トライアルアカウントを使用できません（さらに、検証時にエラーが表示されます）。ですから必ず「Pay-As-You-Go（従量課金制）」を選択してください。。

![掲載画像](https://miro.medium.com/max/789/1*TO5Uh07OkH_QdwludEgapg.png)

請求先の詳細を入力し、サインアッププロセスの一部として確認します。「テクニカルサポート追加」では、サポートなしのオプションを選択（サポート追加料金の支払いを希望する場合を除く）を選択し、「次に」をクリックします。

![掲載画像](https://miro.medium.com/max/783/1*5KJOATvu3giAr6ygO3rF6Q.png)

## 仮想マシンを作成する<a id="41ac"></a>

サブスクリプションが提供されたため、AvalancheノードにUbuntu仮想マシンを作成できるようになります。メニューで左上のアイコンを選択し、「\+リソース作成」を選択します。

![掲載画像](https://miro.medium.com/max/565/1*3nSPwgEM3oIgrIlIo-TS1w.png)

Ubuntuサーバー18.04LTSを選択します（これは通常、一般的なセクション下または、マーケットプレイスで代替的に検索します）。

![掲載画像](https://miro.medium.com/max/605/1*Y0iZEZExC36c7FXqPlrPuw.png)

これにより、以下のように仮想マシンページ作成に移動します。

![掲載画像](https://miro.medium.com/max/775/1*cv0z0mt6Uavx5MkiazpiUA.png)

まず、仮想マシンに名前を入力します。これは何でも良いですが、例ではAvalancheと呼ぶことにします（これにより、自動的にリソースグループ名が一致に変更されます）。

次に、ドロップダウンリストから地域を選択します。これらはほとんどの機能が有効であり安価で、規模がより大きいものとなる傾向があるため、ご希望の地域で推奨されるものを選択してください。この例では、北ヨーロッパを選択しました。

![掲載画像](https://miro.medium.com/max/769/1*XOpa22qSdNI-0PW5oIyUhQ.png)

ランニングコストを大幅に節約するために、スポット価格を使用するオプションがあります。スポットインスタンスは、供給と需要の市場価格構造を使用します。インスタンス需要が上がるにつれ、スポットインスタンス価格が上がるようになります。容量が不足している場合は、VMがオフになります。ただし、特に容量のみのオプションを選択した状態では、これが発生する可能性は非常に低いものとなります。万が一、一時的に停止した場合でも、ステーキングリワードを受け取るには最低60%を維持すればいいだけです。また、Avalancheで実装されたスラッシュもありません。

Azureスポットインスタンスでは「はい」を選択し、「容量のみ」にエビクションポリシータイプを選択し、**エビクションポリシーを必ず停止／割り当て解除にしてください。これは非常に重要です、なぜなら、そうしないとVMが削除されるためです。**

![掲載画像](https://miro.medium.com/max/756/1*zWWiYhloPdnKEXGhZJA3dQ.png)

「サイズを選択」を選択し、仮想マシンサイズを変更します。そしてメニューからDシリーズv4選択のD2s\_v4を選択します（このサイズは2コア、8GBメモリで、プレミアムSSDが有効です）。代わりに、２コア、４GBメモリのF2s\_v2インスタンスで、プレミアムSSDが有効なものを使用することができます。ただしスポット価格は、現在スポットインスタンス価格があるより大きなVMで安くなります。[このリンク](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/linux/)を使用して、異なる地域での価格を表示することができます。

![掲載画像](https://miro.medium.com/max/957/1*JzebwGho6qDFbzlqCJSN9w.png)

仮想マシンのサイズを選択したら、「価格履歴を表示し、近く地域の価格と比較する」を選択し、過去3ヶ月でスポット価格がどのように変化したか、より多くのスペア容量があるかもしれない近くの地域を使用するかどうかをご確認ください。

![掲載画像](https://miro.medium.com/max/763/1*UQYmhtL8JMhrOkaWk8cloA.png)

この記事の執筆時点では、北ヨーロッパのD2s\_v4のスポット価格は毎時0.07975ドル、または年間698.61ドル程度です。スポット価格では、毎時0.01295ドルに下がり、**年間約113.44ドルで、83.76%の節約になります。**

さらに安い地域もあり、例えば、米国東部では毎時0.01060ドルまたは年間92.86ドルです。

![掲載画像](https://miro.medium.com/max/677/1*Th5aDwLS6_IoM0LidRbH6g.png)

以下で、北ヨーロッパや近隣地域の過去３か月のVM価格履歴を表示することができます。![掲載画像](https://miro.medium.com/max/30/1*OJ4monpMy8DhWw_HWycMjg.png?q=20)

![掲載画像](https://miro.medium.com/max/968/1*OJ4monpMy8DhWw_HWycMjg.png)

### AmazonAWSよりも安い<a id="45e9"></a>

c5.largeインスタンスと比較すると、AWSでは毎時0.085ドルがかかります。これは年間合計約745ドルです。スポットインスタンスは62%節約でき、その合計は462ドルに達します。

次のステップでは、VMのユーザー名を変更し、他のAvalancheチュートリアルと調整して、ユーザー名をubuntuに変更します。そうしないと、後でこの記事でいくつかのコマンドを変更し、ubuntuを新しいユーザー名に交換する必要が出てきてしまいます。

![掲載画像](https://miro.medium.com/max/780/1*CNmFTz056EUmahfi5zG3JQ.png)

### ディスク<a id="ed2e"></a>

「次へ」を選択：インスタンスのディスクを設定するディスク。ディスクには2つの選択肢があります。一つはプレミアムSSDで、64GBディスクで優れたパフォーマンスを提供し、月額およそ10ドルです。もう一つはパフォーマンスが低く、月額およそ5ドルの標準SSDです。また、標準SSDでは、10,000トランザクション単位（読み書き、削除）ごとに0.002ドルを支払う必要がありますが、プレミアムSSDはすべてが含まれた価格です。個人的には優れたパフォーマンスのプレミアムSSDを選択しますが、これはまたディスクを酷使する可能性があり、長期的に見れば安くあがるためです。

「次へ」を選択：ネットワーク構成に移動するネットワーキング

![掲載画像](https://miro.medium.com/max/763/1*Oqv9nA8KoSIyq95DuPDN4g.png)

### ネットワーク構成<a id="bc5d"></a>

静的IPを使用したいので、ノードに割り当てられた公開IPを停止した場合に変更されないようにします。公開IPで「新規作成」を選択します

![掲載画像](https://miro.medium.com/max/774/1*2wsz1_OG7DpLA7jmTJfm0A.png)

次に、Assignmentタイプとして「静的」を選択します

![掲載画像](https://miro.medium.com/max/347/1*y-JbYlRNN3GNNXtZDP-UXQ.png)

次に、Avalancheノードへのアクセスインバウンドを管理するネットワークセキュリティグループを設定する必要があります。NICネットワークセキュリティグループタイプとして「アドバンス」を選択し、「新規作成」を選択します

![掲載画像](https://miro.medium.com/max/763/1*e5Y-mHGkn42A-mJx6o3J0g.png)

セキュリティの目的で、誰がノードにリモート接続できるかを制限します。これを行うには、まず既存の公開IPを確認します。Googleに行き、「私のipは何」と検索します。

![掲載画像](https://miro.medium.com/max/450/1*-aV-AdrABCUmludxXUPV6Q.png)

具体的にリクエストされていない限り、ホームにダイナミック公開IPが割り当てられた可能性が高いため、割り当てられた公開IPは将来的に変更される可能性があります。ただし、それでも現在のIPへのアクセスを制限することが推奨されます。そしてホームのIPが変更になり、VMにリモート接続できなくなった場合は、新しい公開IPでネットワークセキュリティルールを更新するだけで、再び接続できるようになります。

注意：展開後にネットワークセキュリティグループの規則を変更する必要がある場合は、「avalanche-nsg」を検索すれば、新しいIPでSSHとポート9650の規則を変更することができます。****ポート9651は、他のAvalancheノードとの通信に使用されるため、誰にでも開放されている必要があります。

![掲載画像](https://miro.medium.com/max/481/1*fR6SrKhTSTQ4cS3PoFrQfQ.png)

これで、公開IPを選択したので、デフォルトで、インバウンドルールの下で左のsshルールを変更できるようになりました。ソースを「Any（どれでも）」から「IPアドレス」に変更し、次に、Googleで見つかった公開IPアドレスをソースIPアドレスフィールドに入力します。「Priority」を「100」に変更し「Save（保存）」を押します。

![掲載画像](https://miro.medium.com/max/1039/1*iLP9gUH4weTfsPcmeUbXLw.png)

次に、「\+ Add an inbound rule（\+インバウンドルーを追加する）」を選択し、RPCアクセスに別のルールを追加します。これもIPのみに制限される必要があります。ソースを「IP Addresses（IPアドレス）」に変更し、Googleから返された公開IPを、「Source IP（ソースIP）」フィールドに入力します。この時、「Destination port range（宛先ポート範囲）」を9650に変更し、プロトコルとして「TCP」を選択します。プライオリティを110に変更して「Avalanche\_RPC」を指定し、Addを押します。

![掲載画像](https://miro.medium.com/max/914/1*Zg9mHCkU7G5BoinN0EWZAg.png)

「\+ Add an inbound rule（\+インバウンドルーを追加する）」を選択し、Avalancheプロトコルの最終ルールを追加します。これにより他のノードがあなたのノードと通信できるようになります。このルールは、すべての人に開放されている必要があります。そのため、「Source（ソース）」を「Any（どれでも）」に設定したままにしておく必要があります。「Destination port rang（宛先ポート範囲）」を「9651」に変更し、プロトコルを「TCP」に変更します。「Priority（プライオリティ）」に120、そしてAvalanche\_Protocolの名前を入力し、「Add（追加）」を押します。

![掲載画像](https://miro.medium.com/max/662/1*tIMEp7O83NIUitWwlcHAxw.png)

ネットワークセキュリティグループは、次のよう（ただし、公開IPアドレスは異なります）になります、そしてOKを押します。

![掲載画像](https://miro.medium.com/max/363/1*7rAR3C_UrX94iXxL4sdV9g.png)

他の設定をデフォルトとして残し、「Review \+ create（レビュー\+作成）」を押して仮想マシンを作成します。

![掲載画像](https://miro.medium.com/max/828/1*01yGser7qYjiXDngemqClQ.png)

まず、検証テストを行います。ここでエラーが発生した場合は、Pay-As-You-Go（従量課金制）サブスクリプションモデルを選択し、Spotインスタンスがないため無料トライアルサブスクリプションを使用しないようにしてください。すべてが正しいことを確認し、「Create（作成）」を押します。

![掲載画像](https://miro.medium.com/max/751/1*HyQP7HJCiVQPPiWodRj6aQ.png)

次に、仮想マシンに接続する新しい鍵ペアを作成するよう求めるプロンプトを受信します。「Download private key and create resource（秘密鍵をダウンロードし、リソースを作成する）」を選択し、PCに秘密鍵をダウンロードします。

![掲載画像](https://miro.medium.com/max/456/1*FCAVco29fcianH4TjxVGzQ.png)

展開が完了したら、「Go to resource（リソースに移動）」を選択します。

![掲載画像](https://miro.medium.com/max/608/1*dXl1RkH6xZvHkdI1d-XsOQ.png)

## プロビジョンされたディスクサイズを変更する<a id="00dc"></a>

デフォルトでは、Ubuntu VMは、30GBのプレミアムSSDでプロビジョンされます。これを250GBに増やし、データベース成長を可能にする必要があります。

![掲載画像](https://miro.medium.com/max/880/1*2uJoRLC586qLEhr1RNNeTg.png)

ディスクサイズを変更するには、VMを停止し、割り当ての解除をする必要があります。「Stop（停止）」を選択し、ステータスが解除されるのを待ちます。次に、左の「Disk（ディスク）」を選択します。

![掲載画像](https://miro.medium.com/max/976/1*eUCBMgyQtEukvCyi3pm48g.png)

現在プロビジョンする「Disk name（ディスク名）」を選択し、変更します

![掲載画像](https://miro.medium.com/max/696/1*faady6O9ZyS2AvKotRFFWA.png)

設定の下の左の「Size \+ performance（サイズ\+パフォーマンス）」を選択し、サイズを250GBに変更し、「Resize（リサイズ）」を押します。

![掲載画像](https://miro.medium.com/max/850/1*zZhh27myfdBcEhf3QMhs3A.png)

これにより、ubuntu内で自動的にパーティションの拡張もされます。仮想マシンの概要ページに戻るには、ナビゲーション設定で「Avalanche」を選択します。

![掲載画像](https://miro.medium.com/max/946/1*RGlKMhmlZ1__6u3RjFSDMA.png)

次に、VMを起動します

![掲載画像](https://miro.medium.com/max/929/1*vgVR-3sRejyBcXrMn65v5g.png)

## Avalancheノードに接続する<a id="8bb7"></a>

以下の手順では、Windows 10マシンから仮想マシンに接続する方法を説明します。ubuntuマシンからの接続方法については、[AWSのチュートリアル](setting-up-an-avalanche-node-with-amazon-web-services-aws.md)を参照してください。

ローカルPCで、CドライブのルートにAvalancheというフォルダを作成し、前にダウンロードしたAvalanche\_key.pemファイルをそのフォルダに移動します。次に、ファイルを右クリックし、「プロパティ」を選択します。セキュリティタブに移動し、一番下にある「Advance（アドバンス）」を選択します

![掲載画像](https://miro.medium.com/max/719/1*KlzhuVcn5Vt0imxDPblBtA.png)

「Disable inheritance（継承を無効にする）」を選択し、「Remove all inherited permissions from this object（このオブジェクトからすべての継承パーミッションを削除する）」を選択します。

![掲載画像](https://miro.medium.com/max/740/1*VxuomVeWbhYquRynA8hP4Q.png)

次に「Add（追加）」を選択し、新しいパーミッションを追加して一番上の「Select a principal（プリンシパルを選択する）」を選択します。ポップアップボックスから、マシンにログインするユーザーアカウントを入力します。この例では、Seqというローカルユーザーでログオンするので、ログインに使うMicrosoftアカウントがあるかもしれません。そのため、PCにログインするアカウントをどれでも使って「Check Names（名前を確認）」を押すと、認証のために下線が引かれるので、OKを押します。

![掲載画像](https://miro.medium.com/max/758/1*sMxk7zaRHVTqA0UyHTKwzQ.png)

次に、パーミッションセクションから「Read & Execute（読み取りと実行）」とのみを確認し、「Read（読み取り）」を選択してOKを押します。

![掲載画像](https://miro.medium.com/max/903/1*5Fkh3FJQuNeWQyEd0irjtA.png)

異なるPC名/ユーザーアカウントである点を除けば、次のようになるはずです。つまり、セキュリティ上キーファイルを変更したり、アクセスしたりできないことを意味します。ですから、このマシンの他のアカウントが、Avalancheノードにアクセスすることはできません。

![掲載画像](https://miro.medium.com/max/736/1*F-YK0xdB92cIweCQFGGRvA.png)

### Avalancheノード公開IPを見つける<a id="4687"></a>

Azureポータルから、ノードに割り当てられた静的な公開IPアドレスを書き留めておいてください。

![掲載画像](https://miro.medium.com/max/1082/1*5cf1dAAO0G7Dzu2s0Xxh-Q.png)

Avalancheノードにログインするには、「cmd」を検索し、Windows 10マシンで「Command Prompt（コマンドプロンプト）」を選択してコマンドプロンプトを開きます。

![掲載画像](https://miro.medium.com/max/384/1*NlYlg9of5O9fQtiroqMFZw.png)

次に、次のコマンドを使用し、EnterYourAzureIPHereをAzureポータルに表示されている静的IPアドレスに置き換えます。

ssh -i C:\Avalanche\Avalanche\_key.pem ubuntu@EnterYourAzureIPHere

この例では：

ssh -i C:\Avalanche\Avalanche\_key.pem ubuntu@13.74.10.81

最初に接続すると、続けるか聞かれるので、「はい」と入力します。

![掲載画像](https://miro.medium.com/max/651/1*Hp1AF-03TbO-eRUvuKvZcA.png)

これでノードに接続されました。

![掲載画像](https://miro.medium.com/max/967/1*Kc3rna-3SQV3tnMMLkMi6A.png)

次のセクションは、[AmazonのAWS上でAvalancheノードを設定する](setting-up-an-avalanche-node-with-amazon-web-services-aws.md) というコリンの素晴らしいチュートリアルからの抜粋です。

### セキュリティパッチでLinuxを更新する<a id="8a1c"></a>

さて、これでノードにいる状態なので、最新のパッケージに更新するようお勧めします。そのためには、以下のコマンドを順番に、1つずつ実行します。

```text
sudo apt update
sudo apt upgrade -y
sudo reboot
```

![掲載画像](https://miro.medium.com/max/793/1*_2UmPN6vabjGe6aihX9KqA.png)

これにより、オペレーティングシステムの最新のセキュリティパッチを備えたインスタンスが最新のものになります。これによりノードも再起動します。ノードが再起動するのに1～2分待ち、以前と同じように再びログインします。

### Avalancheノードを設定する<a id="5688"></a>

ここで、Avalancheノードを設定する必要があります。これを行うには、インストールプロセスを自動化する[Avalancheノードを設定する](set-up-node-with-installer.md)チュートリアルに従ってください。先に設定したAzureポータルからコピーした「IPv4公開IP」が必要です。

インストールが完了すると、ノードがブートストラップするようになります。次のコマンドを実行して、avalanchegoノードの最新のステータスを覗くことができます。

```text
sudo systemctl status avalanchego
```

ブートストラップのステータスを確認するには、「curl」を使用してローカルRPCにリクエストする必要があります。このリクエストは、次の通りです。

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.isBootstrapped",
    "params": {
        "chain":"X"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

ノードがブートストラップするのには、少し時間がかかることがあります（執筆時点では1時間）。ブートストラップとは、チェーンの履歴をダウンロードし、検証することを意味します。少し時間を置きましょう。ノードのブートストラップが完了すると、レスポンスは、次のようになります。

```text
{
    "jsonrpc": "2.0",
    "result": {
        "isBootstrapped": true
    },
    "id": 1
}
```

常に「sudo systemctl status avalanchego」を使用して、以前と同じようにサービスの最新のステータスを見ることもできます。

### NodeIDを取得する<a id="20a7"></a>

このノードで検証を行う予定なら、NodeIDを必ず取得する必要があります。これもRPCから取得します。NodeIDを取得するには、以下のcurlコマンドを呼び出します。

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

全てが上手く行けば、レスポンスは、次のようになります。

```text
{"jsonrpc":"2.0","result":{"nodeID":"NodeID-Lve2PzuCvXZrqn8Stqwy9vWZux6VyGUCR"},"id":1}
```

「NodeID-Lve2PzuCvXzrqn8Stqwy9vZxx6VyGUCR」が、NodeIDの全体です。これをコピーし、ノートに保管してください。この値には機密事項も安全に関する内容もありませんが、このノードをバリデーターに送信する際には必ず必要になるものです。

### ステーキング鍵をバックアップする<a id="ef3e"></a>

最後に行うべきことは、インスタンスが破損したり終了したりといった不測の事態に備え、ステーキング鍵をバックアップすることです。これらの鍵を保持しておくのは良い習慣です。バックアップするには、次のコマンドを使用します。

```text
scp -i C:\Avalanche\avalanche_key.pem -r ubuntu@EnterYourAzureIPHere:/home/ubuntu/.avalanchego/staking C:\Avalanche
```

前と同じように、「EnterYourAzureIPHere」を取得した適切な値に置き換える必要があります。これで、以前に作成したC:\Avalancheフォルダにステーキング鍵と証明書をバックアップします。

![掲載画像](https://miro.medium.com/max/358/1*nqsjJAv2fkcLKPri5idN-Q.png)

