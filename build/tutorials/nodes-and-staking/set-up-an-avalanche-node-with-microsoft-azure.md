---
description: 'コミュニティメンバーによって生成されたチュートリアル'
---

# Microsoft AzureでAvalancheノードを実行する

バリデータを実行し、Avalancheでステーキングすることで、9.69%から11.54%の間で、非常に競争力のある報酬を提供します。最大レートは、1年間ステーキングにより稼働し、14日間の最低レートです。スラッシュも存在しないため、クライアントでハードウェア障害やバグを心配する必要はありません。代わりにAvalancheを使用する場合、報酬を受け取るために、現在60%以上の稼働時間を維持する必要があります。この要求を満たすことができなかった場合、スラッシュは発生しませんが、報酬を受け取ることはありません。**また、そのノード上でバリデーションを開始するように、秘密鍵をノードに置く必要もありません。**誰かがあなたのクラウド環境に侵入し、ノードにアクセスできるとしても、最悪のことはノードです。

AVAXで報酬を受け取ることができるようになるだけでなく、後でエコシステム内の他のサブネットをバリデーションし、サブネットネイティブなトークンで報酬を受け取ることも可能になります。

バリデータを実行するには、2 CPUコア、4 GB Memory、200 GB SSDのハードウェア要件のみが必要です。Avalancheの[革命的](https://medium.com/ava-hub/avalanche-consensus-the-biggest-breakthrough-since-nakamoto-66e9917fd656)なコンセンサスメカニズムにより、一度にコンセンサスに参加する何百万ものバリデータにスケールすることができ、比類のない分散化を提供します。

現在バリデータになるに際し、ステークにかかる最低額は、2,000 AVAXです。（価格が上昇すると、時間の経過とともに削減できます）。あるいは、バリデータは、少額の手数料を請求することも可能になります。[ここで](https://vscout.io/)計算機を使用して、デリゲートと比較して、ノードを実行する際に報酬がいくら稼働するかを確認することができます。

可能であれば、自分のバリデータを実行することをお勧めします。しかし、最小ステーキング要件を満たさない、委任を希望される人のために、現在[ここ](https://avascan.info/staking/validator/NodeID-MGrikMRTmooL1j7uawPHjaMS1cXkbewdb)で見つけることができるノードを実行しています。

この記事では、Microsoft Azure上でノードを構成するプロセスを一歩踏み出します。このチュートリアルでは、Microsoft Azureに関する以前の経験は存在しません。また、可能な限りいくつかの仮定で各ステップを経て終了します。

**この記事の時点で、2コールと8GBのメモリを持つバーチャルマシンのスポット価格設定コストは、毎時間0.01060ドルで、年間約113.44ドルで動作し、83.76%の節約になります！価格に行くにつれて通常の支払と比較して。**比較すると、2コール、4GBのメモリでスポットプライシングが可能になるAWS内のバーチャルマシンは、年間約462ドルです。

## 初期サブスクリプション構成<a id="6e8d"></a>

### 2ファクターを設定する<a id="b9d0"></a>

まず、マイクロソフトアカウントが必要になります。すでに持っていない場合、以下のリンク先で作成するオプションが表示されます。すでに1つをお持ちでない場合は、以下のリンクにアクセスし、「二段階認証」を選択し、提供されたステップに従って、ノードの安全性を確保するための2つのファクター認証を設定してください。

[https://account.microsoft.com/security](https://account.microsoft.com/security)

![ポストのための画像](https://miro.medium.com/max/1135/1*tr3rEcrvI4rEpC7KPYqg6g.png)

二つの要素が設定されたら、[https://portal.azure.com](https://portal.azure.com/)にアクセスし、Microsoftアカウントでサインインすることにより、Azureポータルにログインします。ログイン時にサブスクリプションが存在しないため、まず1つを作成する必要があります。以下のハイライトで「サブスクリプション」を選択します：

![ポストのための画像](https://miro.medium.com/max/648/1*5Jp8oXzczaEND-z9_QZaQA.png)

その後、「\+追加」を選択し、新しいサブスクリプションを追加します。

![ポストのための画像](https://miro.medium.com/max/374/1*Lw3HklSSC8NDN2ftQEVgYA.png)

**Spot Instance VM価格（かなり安い価格です。）を使用したい場合、フリートライアルアカウントを使用することはできません（そして、バリデーションが終了した際にエラーが発生する場合）ので、Pay-As-You-Goを選択してください。**

![ポストのための画像](https://miro.medium.com/max/789/1*TO5Uh07OkH_QdwludEgapg.png)

請求情報を入力し、サインアッププロセスの一部として確認してください。テクニカルサポートを追加にすると、（サポート終了後に追加された追加料金を支払う必要がない場合を除く）サポートなしオプションを選択し、「次へ」を押してください。

![ポストのための画像](https://miro.medium.com/max/783/1*5KJOATvu3giAr6ygO3rF6Q.png)

## バーチャルマシンを作成する<a id="41ac"></a>

サブスクリプションが完了しました。AvalancheノードのためのUbuntuバーチャルマシンを作成することができます。メニューで左上のアイコンを選択し、「\+リソースを作成する」を選択します。

![ポストのための画像](https://miro.medium.com/max/565/1*3nSPwgEM3oIgrIlIo-TS1w.png)

Ubuntu Server 18.04 LTSを選択します（通常、人気のあるセクションの下に存在する場合、マーケットプレイスで検索する場合もあります）

![ポストのための画像](https://miro.medium.com/max/605/1*Y0iZEZExC36c7FXqPlrPuw.png)

これにより、以下のように仮想マシンを作成するページに移動します。

![ポストのための画像](https://miro.medium.com/max/775/1*cv0z0mt6Uavx5MkiazpiUA.png)

まず、仮想マシンを名前を入力します。これは何でもありませんが、私の例ではAvalancheと呼んでいます（これは自動的にリソースグループ名がマッチするように変更されます）

その後、ドロップダウンリストから地域を選択します。ほとんどの機能が有効で、より安価な価格で、より大きなものになる傾向があるので、あなたが好む地域で推奨されるものを1つ選択します。この例では、北ヨーロッパを選択しました。

![ポストのための画像](https://miro.medium.com/max/769/1*XOpa22qSdNI-0PW5oIyUhQ.png)

スポット価格を使用し、ランニングコストで大幅な額を節約するオプションができます。スポットインスタンスは、供給と需要市場価格構造を使用します。インスタンスに対する需要が上昇すると、スポットインスタンスの価格が上昇します。容量が不足した場合、VMはオフになります。しかし、特にCapacityのみオプションを選択する場合、このような発生の可能性は非常に低いものです。万一、ステーキング報酬を受け取るには、少なくとも60%以上の時間を維持する必要があります。Avalancheで実装されるスラッシングは存在しません。

**Azure Spotインスタンスでは、はい**

![ポストのための画像](https://miro.medium.com/max/756/1*zWWiYhloPdnKEXGhZJA3dQ.png)

「サイズを選択し、バーチャルマシンサイズを変更します。D-Series v4選択で、メニューからD2s\_v4を選択します。（このサイズは2コース、8GBのメモリーで、プレミアムSSDを有効にします）。代わりにF2s\_v2インスタンスを使用することができます。2コース、4GBのメモリで、プレミアムSSDを可能にします。しかし、スポット価格は、現在、スポットインスタンス価格で、より大きなVMの場合、実際に機能します。[このリンク](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/linux/)を使用して、異なる地域で価格を見ることができます。

![ポストのための画像](https://miro.medium.com/max/957/1*JzebwGho6qDFbzlqCJSN9w.png)

バーチャルマシンのサイズを選択した後、「価格履歴を表示し、近くの地域で価格を比較する」を選択し、過去3ヶ月でスポット価格がどのように変化したか、そして、より多くのスペースを持つ可能性のある近くの地域を使用するより安くかどうかをご覧ください。

![ポストのための画像](https://miro.medium.com/max/763/1*UQYmhtL8JMhrOkaWk8cloA.png)

この記事の時点で、北欧で提供されるD2s\_v4のスポット価格は、1時間あたり0.07975ドル、年間約698.61ドルです。**スポット価格により、時速0.01295ドルに下落します。これは年間約113.44ドルで動作し、83.76%の節約になります！**

一時につき0.01060ドル、あるいは年間約92.86ドルです！

![ポストのための画像](https://miro.medium.com/max/677/1*Th5aDwLS6_IoM0LidRbH6g.png)

以下に示すように、北欧と![近くの](https://miro.medium.com/max/30/1*OJ4monpMy8DhWw_HWycMjg.png?q=20)地域で3ヶ月間のVMの価格履歴をご覧いただけます。

![ポストのための画像](https://miro.medium.com/max/968/1*OJ4monpMy8DhWw_HWycMjg.png)

### Amazon AWSより安く<a id="45e9"></a>

比較として、c5.largeインスタンスはAWS上で1時間あたり0.085ドルかかります。これにより年間合計で745米ドルになります。スポットインスタンスは、62%の節約が可能になります。その結果、合計は462ドルにまで下げています。

次のステップは、VMのユーザー名を変更し、他のAvalancheチュートリアルとアライズするように変更することです。そうでない場合は、この記事で後でいくつかのコマンドを変更し、ubuntuを新しいユーザー名とスワップアウトする必要があります。

![ポストのための画像](https://miro.medium.com/max/780/1*CNmFTz056EUmahfi5zG3JQ.png)

### ディスク<a id="ed2e"></a>

次に、インスタンスのためのディスクを構成する64GBのディスクでより高いパフォーマンスを提供するプレミアムSSDまた、標準SSDで10,000トランザクション単位（読み取り、削除）あたり0.002ドルの支払いが必要です。一方、プレミアムSSDですべてが含まれています。個人的には、より高いパフォーマンスのために、プレミアムSSを選択しました。しかし、ディスクが大幅に使用される可能性が高いため、長期的に見ることにより、より安く動作する可能性もあります。

次へ：ネットワーク構成に移行する

![ポストのための画像](https://miro.medium.com/max/763/1*Oqv9nA8KoSIyq95DuPDN4g.png)

### ネットワーク構成<a id="bc5d"></a>

スタティックIPを使用し、そのノードに割り当てられたパブリックIPが停止した場合に変更がないようにします。パブリックIPで「新しい作成」を選択

![ポストのための画像](https://miro.medium.com/max/774/1*2wsz1_OG7DpLA7jmTJfm0A.png)

その後、Assignmentタイプとして「Static」を選択します

![ポストのための画像](https://miro.medium.com/max/347/1*y-JbYlRNN3GNNXtZDP-UXQ.png)

その後、Avalancheノードにアクセスするコントロールするために、ネットワークセキュリティグループを構成する必要があります。NICネットワークセキュリティグループタイプとして「高度」を選択し、「新しい作成」を選択します。

![ポストのための画像](https://miro.medium.com/max/763/1*e5Y-mHGkn42A-mJx6o3J0g.png)

安全上の目的で、誰がリモートであなたのノードに接続できるかを制限したいのです。これを実行するには、まずあなたの既存のパブリックIPが何であるかを知りたいと思います。これは、グーグルに移動し、「私のipは何ですか」を検索することにより可能です。

![ポストのための画像](https://miro.medium.com/max/450/1*-aV-AdrABCUmludxXUPV6Q.png)

具体的に要求されていない場合を除き、自宅に動的パブリックIPが割り当てられている可能性が高いので、割り当てられたパブリックIPは将来変化する可能性があります。現在のIPにアクセスする制限をお勧めします。その後、あなたの家のIPが変更され、もはやVMにリモート接続ができなくなった場合、新しいパブリックIPでネットワークセキュリティルールを更新することができます。

注意：もしあなたの家庭のIPが変更になった場合、ネットワークセキュリティグループルールの変更が必要になった場合、「avalanche-nsg」を検索し、新しいIPでSSHとポート9650のルールを変更することができます。****ポート 9651は、他のAvalancheノードと通信する方法として、誰もがオープンな状態で維持する必要があります。

![ポストのための画像](https://miro.medium.com/max/481/1*fR6SrKhTSTQ4cS3PoFrQfQ.png)

パブリックIPが選択されたことで、インバウンドルール下の左側で、変更が可能になります。「任意の」から「IPアドレス」に変更し、その後、「ソースを変更する」パブリックIPアドレスを入力します。下部の優先度を100に変更し、保存を押します。

![ポストのための画像](https://miro.medium.com/max/1039/1*iLP9gUH4weTfsPcmeUbXLw.png)

その後、「\+ インバウンドルーを追加する」を選択し、RPCアクセスのための別のルールを追加します。ソースを「IPアドレス」に変更し、googleから返されたパブリックIPを入力します。この時点で、「宛先ポート範囲」フィールドを9650に変更し、プロトコルとして「TCP」を選択します。優先度を110に変更し、「Avalanche\_RPC」の名前を付け、Addを押すとします。

![ポストのための画像](https://miro.medium.com/max/914/1*Zg9mHCkU7G5BoinN0EWZAg.png)

「\+インバウンドルールを追加する」を選択し、Avalancheプロトコルの最終ルールを追加します。このルールでは、誰もが開かれた必要があるため、「ソース」が「Any」に設定されています。宛先ポート範囲を「9651」に変更し、プロトコルを「TCP」に変更します。120の優先度を入力し、Avalanche\_プロトコル名を入力し、Addを押します。

![ポストのための画像](https://miro.medium.com/max/662/1*tIMEp7O83NIUitWwlcHAxw.png)

ネットワークセキュリティグループは、以下のようになり、（パブリックIPアドレスは異なりますが、）、OKを押す必要があります。

![ポストのための画像](https://miro.medium.com/max/363/1*7rAR3C_UrX94iXxL4sdV9g.png)

他の設定をデフォルトとして残し、「レビュー \+作成」を押し、バーチャルマシンを作成します。

![ポストのための画像](https://miro.medium.com/max/828/1*01yGser7qYjiXDngemqClQ.png)

まずバリデーションテストここでエラーが発生した場合、Pay-As-You-Goサブスクリプションモデルを選択し、Spotインスタンスが利用できないため、フリートライアルサブスクリプションを使用しないようにしてください。すべてが正しく見えることを確認し、「作成」を押してください。

![ポストのための画像](https://miro.medium.com/max/751/1*HyQP7HJCiVQPPiWodRj6aQ.png)

その後、仮想マシンを接続するための新しい鍵ペアを生成するよう求めるメッセージが表示されます。「秘密鍵をダウンロードし、リソースを作成する」を選択し、PCに秘密鍵をダウンロードします。

![ポストのための画像](https://miro.medium.com/max/456/1*FCAVco29fcianH4TjxVGzQ.png)

デプロイが完了したら、「リソースに移動する」を選択します

![ポストのための画像](https://miro.medium.com/max/608/1*dXl1RkH6xZvHkdI1d-XsOQ.png)

## プロビジョドされたディスクサイズを変更する<a id="00dc"></a>

デフォルトで、Ubuntu VMは30GBのプレミアムSSDでプロビジョニングされます。データベース成長を可能にするには、250GBに増やしてください。

![ポストのための画像](https://miro.medium.com/max/880/1*2uJoRLC586qLEhr1RNNeTg.png)

ディスクサイズを変更するには、VMは停止、解割り当てられる必要があります。「ストップ」を選択し、ステータスが脱割当を確認するを待ちます。その後、左側で「ディスク」を選択します。

![ポストのための画像](https://miro.medium.com/max/976/1*eUCBMgyQtEukvCyi3pm48g.png)

変更に加え、現在プロビジョニングされているディスク名を選択します

![ポストのための画像](https://miro.medium.com/max/696/1*faady6O9ZyS2AvKotRFFWA.png)

設定下で左側で「サイズ\+パフォーマンス」を選択し、250GBに変更後、「サイズを変更します。

![ポストのための画像](https://miro.medium.com/max/850/1*zZhh27myfdBcEhf3QMhs3A.png)

今度こそできることにより、ubuntu内で自動的にパーティションが拡張されます。仮想マシン概要ページに戻るには、ナビゲーション設定でAvalancheを選択します。

![ポストのための画像](https://miro.medium.com/max/946/1*RGlKMhmlZ1__6u3RjFSDMA.png)

その後、VMを始める

![ポストのための画像](https://miro.medium.com/max/929/1*vgVR-3sRejyBcXrMn65v5g.png)

## Avalancheノードに接続<a id="8bb7"></a>

以下の手順は、Windows 10マシンからバーチャルマシンに接続する方法を示します。ubuntuマシンから接続する方法については、AWSチュートリアルを参照[してください。](setting-up-an-avalanche-node-with-amazon-web-services-aws.md)

ローカルPC上で、Avalancheというドライブのルートにフォルダを作成し、以前にダウンロードしたAvalanche\_key.pemファイルをフォルダに移動します。その後、ファイルを右クリックし、プロパティを選択します。セキュリティタブに移動し、下部の「高度」を選択します。

![ポストのための画像](https://miro.medium.com/max/719/1*KlzhuVcn5Vt0imxDPblBtA.png)

「継承を無効にする」を選択し、「このオブジェクトからすべての継承権を削除する」ことで、そのファイルのすべての既存の権限を削除します。

![ポストのための画像](https://miro.medium.com/max/740/1*VxuomVeWbhYquRynA8hP4Q.png)

次に、「追加」を選択し、新しいパーミッションを追加します。ポップアップボックスから、マシンにログインするために使用するユーザーアカウントに入力します。この例では、Seqと呼ばれるローカルユーザーでログインする場合、あなたがログインするために使用するMicrosoftアカウントを持っている可能性があります。そのため、PCにログインするどのようなアカウントを使用し、「名前を確認する」を押すことで、検証し、OKを押すために強調する必要があります。

![ポストのための画像](https://miro.medium.com/max/758/1*sMxk7zaRHVTqA0UyHTKwzQ.png)

その後、パーミッションセクションから、「読み取りと実行」と「読み取り」のみが選択され、OKを押すようにします。

![ポストのための画像](https://miro.medium.com/max/903/1*5Fkh3FJQuNeWQyEd0irjtA.png)

異なるPC名/ユーザーアカウントを除く、以下のように見えるはずです。つまり、安全上の目的で、鍵ファイルが変更されたり、このマシン上の他のアカウントからアクセスできないということです。

![ポストのための画像](https://miro.medium.com/max/736/1*F-YK0xdB92cIweCQFGGRvA.png)

### AvalancheノードパブリックIPを見つける<a id="4687"></a>

Azureポータルから、ノードに割り当てられた静的なパブリックIPアドレスをメモします。

![ポストのための画像](https://miro.medium.com/max/1082/1*5cf1dAAO0G7Dzu2s0Xxh-Q.png)

Avalancheノードにログインするには、「cmd」を検索し、Windows 10マシン上で「コマンドプロンプト」を選択してコマンドプロンプトを開きます。

![ポストのための画像](https://miro.medium.com/max/384/1*NlYlg9of5O9fQtiroqMFZw.png)

次に、以下のコマンドを使用し、EnterYourAzureIPHereをAzureポータルに表示される静的なIPアドレスに置き換えます。

ssh -i C:\Avalanche\Avalanche\_key.pem ubuntu@EnterYourAzureIPHere

私の例では、次のようにします：

ssh -i C:\Avalanche\Avalanche\_key.pem ubuntu@13.74.10.81

接続する際に、継続するよう求めるメッセージが表示されます。

![ポストのための画像](https://miro.medium.com/max/651/1*Hp1AF-03TbO-eRUvuKvZcA.png)

今では、ノードに接続する必要があります。

![ポストのための画像](https://miro.medium.com/max/967/1*Kc3rna-3SQV3tnMMLkMi6A.png)

以下のセクションは、[AmazonのAWS上でAvalancheノードを設定](setting-up-an-avalanche-node-with-amazon-web-services-aws.md)するためのColinの優れたチュートリアルから取りまとめます。

### セキュリティパッチでLinuxを更新する<a id="8a1c"></a>

ノード上にいることにより、最新のパッケージに更新するのは良いアイデアです。これを実行するには、次のコマンドを実行して、順番に次のコマンドを実行してください。

```text
sudo apt update
sudo apt upgrade -y
sudo reboot
```

![ポストのための画像](https://miro.medium.com/max/793/1*_2UmPN6vabjGe6aihX9KqA.png)

これにより、我々のオペレーティングシステムのための最新のセキュリティパッチで、我々のインスタンスが最新になります。これによりノードが再起動されます。我々は、1分あるか2秒でバックアップを完了し、再度ログインします。

### Avalancheノードをセットアップする<a id="5688"></a>

さて、Avalancheノードをセットアップする必要があります。これを実行するには、[Avalanche](set-up-node-with-installer.md)ノードウィンドインストーラチュートリアルに従ってインストールプロセスを自動化します。以前に設定したAzureポータルからコピーした「IPv4パブリックIP」が必要です。

インストールが完了したら、ノードがブートストラップするはずです！avalanchegoノード最新ステータスを見るために、以下のコマンドを実行できます。

```text
sudo systemctl status avalanchego
```

ブートストラップのステータス確認のためには、「curl」を使用してローカルRPCにリクエストする必要があります。このリクエストは、次のようになります。

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

ノードは、（現在の書き込みで1時間以上もの間、ブートストラップがかかる場合がございます。ブートストラップは、ノードがダウンロードし、チェーンの履歴を検証することを意味します。これでしばらくお時間をください。ノードがブートストラップが完了すると、レスポンスは次のようになります。

```text
{
    "jsonrpc": "2.0",
    "result": {
        "isBootstrapped": true
    },
    "id": 1
}
```

常に「sudo systemctl ステータスavalanchego」を使用して、以前と同様に、サービスの最新ステータスを見ることができます。

### NodeID<a id="20a7"></a>

このノード上でバリデーションを行うことを計画する場合、絶対にNodeIDを取得する必要があります。これは、RPCからも取得されます。以下のcurlコマンドを呼び出し、NodeIDを取得します。

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

すべてがうまくいかない場合、レスポンスは次のようなものに見えるはずです。

```text
{"jsonrpc":"2.0","result":{"nodeID":"NodeID-Lve2PzuCvXZrqn8Stqwy9vWZux6VyGUCR"},"id":1}
```

「NodeID-Lve2PzuCvXrqn8Stqqwy9vWZux6VyGUCR という部分」というその部分が、我々のNodeIDであり、全体的なことです。コピーし、我々のノートに保持してください。この価値について機密や安全性の確保は一切ありません。しかし、バリデータとしてこのノードを送信する際に絶対的なものです。

### ステーキングキーをバックアップする<a id="ef3e"></a>

最後に行われるべきことは、我々のインスタンスが破損または終了したというタイムリーなイベントで、ステーキングキーをバックアップすることです。これらの鍵を保持するための良いプラクティスです。バックアップするために、以下のコマンドを使用します：

```text
scp -i C:\Avalanche\avalanche_key.pem -r ubuntu@EnterYourAzureIPHere:/home/ubuntu/.avalanchego/staking C:\Avalanche
```

以前と同様に、「EnterYourAzureIPHere」を取得した適切な値に置き換える必要があります。これにより、以前に作成したC:\Avalancheフォルダに、ステーキングキーとステーキング証明書をバックアップします。

![ポストのための画像](https://miro.medium.com/max/358/1*nqsjJAv2fkcLKPri5idN-Q.png)

