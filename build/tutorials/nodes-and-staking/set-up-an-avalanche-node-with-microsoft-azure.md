---
description: 'JPJ-JP-JP'

---

# Microsoft AzureでAvalancheノードを起動する

Avalanche でのステーキングは、有効期間に応じて 9.69% から 11.54% までの非常に競争力のある報酬を提供します。最大レートは1年間ステーキングで獲得し、14日間最低レートです。また、スラッシングもありませんので、クライアントのハードウェア障害やバグを心配する必要はありません。Avalancheでは、報酬を受け取るために現在60%以上の稼働時間を維持する必要があります。この要件を満たすことができなかった場合、スラッシュはありませんが、報酬を受け取れません。**また、そのノードでの検証を開始するために、秘密鍵をノードに置く必要はありません。**たとえ誰かがクラウド環境に侵入してノードにアクセスできるとしても、ノードをオフにすることです。

バリデータノードを実行すると、AVAXでリワードを受け取ることができます。また、後でエコシステム内の他のサブネットを検証し、サブネットにネイティブなトークンでリワードを受け取ることもできます。

バリデータを実行するには、2つのCPUコア、4GBメモリ、200GB SSDのハードウェア要件だけが、膨大なエネルギーを使用しません。Avalancheの[革新的](https://medium.com/ava-hub/avalanche-consensus-the-biggest-breakthrough-since-nakamoto-66e9917fd656)なコンセンサスメカニズムは、コンセンサスに参加する何百万ものバリデーターに一度に規模を拡大することができ、比類のない分散化を提供します。

現在、バリデーターになるのに必要な最低限の金額は2,000 AVAX \(価格が上昇すると時間の経過とともに削減できます\)です。また、バリデーターは、ユーザーが実行コストを支援するために彼らの株式を委譲できるようにするために、少額の料金を請求することもできます。[ここ](https://vscout.io/)で電卓を使って、ノードを実行するときにどのくらいの報酬を得るかを見ることができます。

私は誰もが可能な限り自分のバリデータを実行することを推奨しますが、最小のステーキング要件を満たしていない人のために、[ここで](https://avascan.info/staking/validator/NodeID-MGrikMRTmooL1j7uawPHjaMS1cXkbewdb)見つけることができるノードを実行しています。

この記事では、Microsoft Azure 上でノードを設定するプロセスを手順します。このチュートリアルでは、Microsoft Azureの以前の経験はありませんでしたが、可能な限り少数の仮定で各ステップを経て行きます。

この記事の時点で、2コアと8 GBのメモリを備えた仮想マシンのスポット価格設定は、1時間あたりわずか$0.01060で、年間約$113.44で動作し、**83.76％の節約です。あなたが価格に行くように通常の支払と比較される。**AWSの仮想マシンと2コアと4GBメモリの比較では、スポット価格で約462ドルです。

## 初期サブスクリプションの設定<a id="6e8d"></a>

### 2 ファクターを設定する<a id="b9d0"></a>

まず、Microsoftアカウントが必要です。既に1つを持っていない場合は、次のリンクで1つを作成するオプションが表示されます。既に1つある場合は、次のリンクから「2段階認証」を選択し、提供された手順に従って、ノードを保護するために2要素認証を設定してください。

[JP-JP-](https://account.microsoft.com/security)

![投稿の画像](https://miro.medium.com/max/1135/1*tr3rEcrvI4rEpC7KPYqg6g.png)

2 つの要素が設定されたら、Azure ポータルにログインします。[https://portal.azure.com](https://portal.azure.com/) にアクセスし、Microsoft アカウントでサインインします。ログインすると、サブスクリプションはありませんので、まず1つ作成する必要があります。下記のハイライト表示のように「サブスクリプション」を選択します。

![投稿の画像](https://miro.medium.com/max/648/1*5Jp8oXzczaEND-z9_QZaQA.png)

次に、「+ Add」を選択して新しいサブスクリプションを追加します。

![投稿の画像](https://miro.medium.com/max/374/1*Lw3HklSSC8NDN2ftQEVgYA.png)

Spot Instance VM Pricing \(これはかなり安い値段になります\)を使用したい場合は、無料トライアルアカウント \(そして、あなたはvalidation\にエラーが出るでしょう)を使用することはできませんので、**必ずPay-As-You-Goを選択してください。**

![投稿の画像](https://miro.medium.com/max/789/1*TO5Uh07OkH_QdwludEgapg.png)

請求内容を入力し、サインアッププロセスの一環として身元を確認します。テクニカルサポートを追加する際に、[サポート]オプションの[\(あなたがサポートのために追加料金を支払う場合を除きます)を選択し、[Next]を押します。

![投稿の画像](https://miro.medium.com/max/783/1*5KJOATvu3giAr6ygO3rF6Q.png)

## 仮想マシンを作成する<a id="41ac"></a>

今、サブスクリプションがあったので、Avalancheノード用のUbuntu Virtual Machineを作成できます。メニューの左上にあるアイコンを選択し、「+リソースを作成」を選択します。

![投稿の画像](https://miro.medium.com/max/565/1*3nSPwgEM3oIgrIlIo-TS1w.png)

Ubuntu Server 18.04 LTS \(これは通常、一般的なセクションの下にあるか、または代わりにマーケットプレイス\でそれを検索します)

![投稿の画像](https://miro.medium.com/max/605/1*Y0iZEZExC36c7FXqPlrPuw.png)

これにより、以下のように仮想マシンを作成するページに移動します。

![投稿の画像](https://miro.medium.com/max/775/1*cv0z0mt6Uavx5MkiazpiUA.png)

まず、仮想マシンに名前を入力します。これは何でもできますが、私の例ではAvalanche \(これはまた、自動的にリソースグループ名をmatch\に変更します)

次に、ドロップダウン リストからリージョンを選択します。これらがほとんどの機能が有効で安価な価格でより大きなものになる傾向があるので、あなたが好む地域で推奨されるものの1つを選択します。この例では、北ヨーロッパを選びました。

![投稿の画像](https://miro.medium.com/max/769/1*XOpa22qSdNI-0PW5oIyUhQ.png)

スポット価格設定を使用してランニングコストを大幅に節約することができます。Spot インスタンスは、需要の市場価格構造を使用します。インスタンスに対する需要が上昇すると、スポットインスタンスの価格が上昇します。容量が不十分な場合、VMはオフになります。しかし、このような可能性は非常に低いですが、特にCapacity Onlyオプションを選択するときに、特にCapacity Onlyが選択されます。万一、一、オフにしても、ステーキング報酬を受け取るために少なくとも60%のアップタイムを維持するだけでなく、アバランチではスラッシングは実装されていません。

Azure Spot インスタンスでははいを選択し、[Eviction type to Capacity Only]を選択し、**Eviction ポリシーを停止/Deallocateに設定してください。**

![投稿の画像](https://miro.medium.com/max/756/1*zWWiYhloPdnKEXGhZJA3dQ.png)

Virtual Machine サイズを変更するには、「Select size」を選択し、D-Series v4 v4 選択 \(このサイズは 2 つのコア、8 GB メモリを備え、プレミアム SSD を有効にします) メニューから D2s\_v4 を選択します。代わりにF2s\_v2インスタンスを使用できます。2つのコア、4GBメモリ、プレミアムSSD\を有効にします。しかし、スポット価格は現在、スポットインスタンス価格で大型VMで実際に安価に動作します。[このリンク](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/linux/)を使用して、異なる地域の価格を表示できます。

![投稿の画像](https://miro.medium.com/max/957/1*JzebwGho6qDFbzlqCJSN9w.png)

Virtual Machineのサイズを選択したら、「価格履歴を表示し、近くの地域で価格を比較する」を選択して、過去3か月間にスポット価格がどのように変化したか、また、より多くのスペアキャパシティを持つ可能性のある近くの地域を使用する方が安いかどうかを見ることができます。

![投稿の画像](https://miro.medium.com/max/763/1*UQYmhtL8JMhrOkaWk8cloA.png)

この記事の時点で、北ヨーロッパのD2s\_v4のスポット価格は1時間あたり0.07975ドル、または年間約698.61ドルです。スポット価格で、価格は1時間あたり$ 0.01295に下落します。これは年間約$ 113.44で動作します。**83.76％の節約です！**

一部の地域は、例えば、東米は、1時間あたり$0.01060または年間$92.86です!

![投稿の画像](https://miro.medium.com/max/677/1*Th5aDwLS6_IoM0LidRbH6g.png)

以下に、北欧および![近隣](https://miro.medium.com/max/30/1*OJ4monpMy8DhWw_HWycMjg.png?q=20)地域のVMの価格履歴を確認できます。

![投稿の画像](https://miro.medium.com/max/968/1*OJ4monpMy8DhWw_HWycMjg.png)

### Amazon AWSより安い<a id="45e9"></a>

比較としてc5.largeインスタンスはAWSで1時間あたり$0.085 USDです。これは合計$745 USD/年間です。Spotインスタンスは62%の節約で、合計は462ドルに達します。

次のステップは、VMのユーザー名を変更し、他のAvalancheチュートリアルと合わせてユーザー名をubuntuに変更します。それ以外の場合は、この記事で後でいくつかのコマンドを変更し、ubuntuを新しいユーザー名に交換する必要があります。

![投稿の画像](https://miro.medium.com/max/780/1*CNmFTz056EUmahfi5zG3JQ.png)

### Disk-JP-JP<a id="ed2e"></a>

[次へ]を選択します。次に、インスタンス用のディスクを構成するディスク。ディスクには2つの選択肢があります。Premium SSDは64GBのディスクでより大きなパフォーマンスを提供するPremium SSDは月額$ 10です。また、STANDARD SSDで1万個のトランザクションユニット \(read/write and deletes\)あたり$0.002を支払う必要があります。個人的には、Premium SSDを選びましたが、ディスクが多いため、長期的にも安価に動作する可能性があります。

[Next]を選択します。ネットワーク構成に移動するネットワーク

![投稿の画像](https://miro.medium.com/max/763/1*Oqv9nA8KoSIyq95DuPDN4g.png)

### ネットワーク構成<a id="bc5d"></a>

ノードに割り当てられたパブリックIPが停止した場合に変更されないように、静的IPを使用します。Public IPの下で「新規作成」を選択します。

![投稿の画像](https://miro.medium.com/max/774/1*2wsz1_OG7DpLA7jmTJfm0A.png)

次に、[Static] を選択します。

![投稿の画像](https://miro.medium.com/max/347/1*y-JbYlRNN3GNNXtZDP-UXQ.png)

次に、Avalancheノードへのアクセスインバウンドを制御するために、ネットワークセキュリティグループを構成する必要があります。NICネットワークセキュリティグループのタイプで「Advanced」を選択し、「Create new」を選択します。

![投稿の画像](https://miro.medium.com/max/763/1*e5Y-mHGkn42A-mJx6o3J0g.png)

セキュリティ目的で、ノードにリモート接続できる人を制限したいのですが、そのためには、Node に接続する必要があります。これを行うには、まず既存のパブリックIPが何であるかを知りたいと思います。これはGoogleに行き、「私のip-JP」を検索することによって行うことができます。

![投稿の画像](https://miro.medium.com/max/450/1*-aV-AdrABCUmludxXUPV6Q.png)

特にリクエストしていない限り、自宅に動的パブリックIPを割り当てられた可能性が高いので、将来的に割り当てられたパブリックIPは変わる可能性があります。ただし、現在のIPへのアクセスを制限することをお勧めします。そして、ホームIPが変更され、VMにリモート接続できなくなった場合、新しいパブリックIPでネットワークセキュリティルールを更新するだけで、再び接続できます。

注: ネットワーク セキュリティ グループ ルールを変更する必要がある場合は、「avalanche-nsg」を検索し、新しいIPでSSHおよびPort 9650のルールを変更できます。**Port 9651は他**のAvalancheノードと通信する方法です。

![投稿の画像](https://miro.medium.com/max/481/1*fR6SrKhTSTQ4cS3PoFrQfQ.png)

これで、パブリックIPが既定で、左側のsshルールを変更できるようにします。 ソースを「Any」から「IP Addresses」に変更し、Googleから発見したパブリックIPアドレスを入力します。[Priority]を100に変更し、[Save]を押します。

![投稿の画像](https://miro.medium.com/max/1039/1*iLP9gUH4weTfsPcmeUbXLw.png)

次に、RPCアクセスのための別のルールを追加するには、「+ Add an inbound rule」を選択します。Sourceを「IP Addresses」に変更し、Googleから返されたパブリックIPを「Source IP」フィールドに入力します。今回は、[Destination port ranges] フィールドを 9650 に変更し、プロトコルとして [TCP] を選択します。優先順位を110に変更し、「Avalanche\_RPC」の名前を付けてAddを押します。

![投稿の画像](https://miro.medium.com/max/914/1*Zg9mHCkU7G5BoinN0EWZAg.png)

[+ Add an inbound rule] を選択して、Avalanche Protocol の最終ルールを追加し、他のノードがノードと通信できるようにします。このルールは、誰でも開かれている必要があります。このため、「Source」を「Any」に設定しておきます。[Destination port range] を "9651" に変更し、プロトコルを "TCP" に変更します。120の優先度を入力し、Avalanche\_Protocolの名前を入力し、Addを押します。

![投稿の画像](https://miro.medium.com/max/662/1*tIMEp7O83NIUitWwlcHAxw.png)

Network Security Groupは以下のように \(パブリックIPアドレスが異なるものの) そして OK を押します。

![投稿の画像](https://miro.medium.com/max/363/1*7rAR3C_UrX94iXxL4sdV9g.png)

他の設定をデフォルトにして、[Review + create] を押してVirtualマシンを作成します。

![投稿の画像](https://miro.medium.com/max/828/1*01yGser7qYjiXDngemqClQ.png)

まず、検証テストを実施します。ここでエラーが発生した場合は、Pay-As-You-Goサブスクリプションモデルを選択し、Spotインスタンスが利用できないため、無料トライアルサブスクリプションを使用していないことを確認してください。すべてが正しく見えることを確認し、「作成」を押します。

![投稿の画像](https://miro.medium.com/max/751/1*HyQP7HJCiVQPPiWodRj6aQ.png)

次に、仮想マシンを接続するための新しいキーペアを生成するよう求められるプロンプトが表示されます。PDFファイルは、PDFファイルでダウンロードできます。

![投稿の画像](https://miro.medium.com/max/456/1*FCAVco29fcianH4TjxVGzQ.png)

デプロイが完了したら、「リソースに移動」を選択します。

![投稿の画像](https://miro.medium.com/max/608/1*dXl1RkH6xZvHkdI1d-XsOQ.png)

## Provisioned Disk Sizeを変更する<a id="00dc"></a>

Ubuntu VMは30GB Premium SSDでプロビジョニングされます。JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-Java

![投稿の画像](https://miro.medium.com/max/880/1*2uJoRLC586qLEhr1RNNeTg.png)

ディスクサイズを変更するには、VMを停止して割り当てる必要があります。[Stop]を選択し、ステータスが解除された状態を表示するのを待ちます。次に、左側の「Disks」を選択します。

![投稿の画像](https://miro.medium.com/max/976/1*eUCBMgyQtEukvCyi3pm48g.png)

現在プロビジョニングされているディスク名を選択して変更します。

![投稿の画像](https://miro.medium.com/max/696/1*faady6O9ZyS2AvKotRFFWA.png)

左側の「Size + performance」を選択し、250GBに変更し、「Resize」を押します。

![投稿の画像](https://miro.medium.com/max/850/1*zZhh27myfdBcEhf3QMhs3A.png)

これにより、パーティションを ubuntu 内で自動的に拡張します。仮想マシンの概要ページに戻るには、ナビゲーション設定でAvalancheを選択します。

![投稿の画像](https://miro.medium.com/max/946/1*RGlKMhmlZ1__6u3RjFSDMA.png)

次にVMを起動します。

![投稿の画像](https://miro.medium.com/max/929/1*vgVR-3sRejyBcXrMn65v5g.png)

## Avalancheノードに接続する<a id="8bb7"></a>

以下の手順は、Windows 10マシンからVirtual Machineに接続する方法を示しています。ubuntu マシンから接続する方法については[、AWS](setting-up-an-avalanche-node-with-amazon-web-services-aws.md) チュートリアルをご覧ください。

ローカルPCで、C:ドライブのルートにAvalanche(Avalanche)フォルダーを作成し、前回ダウンロードしたAvalanche\_key.pemファイルをフォルダーに移動します。次に、ファイルを右クリックし、[プロパティ]を選択します。Securityタブに移動し、下部にある「Advanced」を選択します。

![投稿の画像](https://miro.medium.com/max/719/1*KlzhuVcn5Vt0imxDPblBtA.png)

[継承を無効にする]を選択し、[このオブジェクトからすべての継承された権限を削除]を選択して、そのファイルにすべての既存の権限を削除します。

![投稿の画像](https://miro.medium.com/max/740/1*VxuomVeWbhYquRynA8hP4Q.png)

次に、「Add」を選択して新しいパーミッションを追加し、上部にある「Select a principal」を選択します。ポップアップボックスから、マシンにログインするために使用するユーザーアカウントに入力します。この例では、Seqというローカルユーザーでログオンします。Microsoftアカウントを持っている場合がありますので、PCにログインするどのようなアカウントを使って、[名前を確認]を押して、それを強調してOKを押します。

![投稿の画像](https://miro.medium.com/max/758/1*sMxk7zaRHVTqA0UyHTKwzQ.png)

次に、パーミッションセクションから「読み取りと実行」と「読み取り」のみが選択されていることを確認し、OKを押します。

![投稿の画像](https://miro.medium.com/max/903/1*5Fkh3FJQuNeWQyEd0irjtA.png)

これは、別のPC名/ユーザーアカウントを除いて、以下のようなものに見えるはずです。これは、キーファイルが、セキュリティ目的でこのマシン上の他のアカウントによって変更またはアクセスできないことを意味します。

![投稿の画像](https://miro.medium.com/max/736/1*F-YK0xdB92cIweCQFGGRvA.png)

### AvalancheノードパブリックIPを探す<a id="4687"></a>

Azure Portal から、ノードに割り当てられた静的パブリック IP アドレスをメモします。

![投稿の画像](https://miro.medium.com/max/1082/1*5cf1dAAO0G7Dzu2s0Xxh-Q.png)

Avalancheノードにログインするには、「cmd」を検索し、Windows 10マシンで「Command Prompt」を選択してコマンドプロンプトを開きます。

![投稿の画像](https://miro.medium.com/max/384/1*NlYlg9of5O9fQtiroqMFZw.png)

次に、次のコマンドを使用して、EnterYourAzureIPHere を Azure ポータルに表示される静的 IP アドレスに置き換えます。

JP-JP-

私の例の例:

ssh -i C:\Avalanche\Avalanche\_key.pem ubuntu@13.74.10.81

最初に接続すると、続行するよう求められるプロンプトが表示されます。

![投稿の画像](https://miro.medium.com/max/651/1*Hp1AF-03TbO-eRUvuKvZcA.png)

今、Nodeに接続する必要があります。

![投稿の画像](https://miro.medium.com/max/967/1*Kc3rna-3SQV3tnMMLkMi6A.png)

次のセクションは、[AmazonのAWSでAvalancheノードを設定](setting-up-an-avalanche-node-with-amazon-web-services-aws.md)するためのColinの優れたチュートリアルから取り上げられます。

### Linuxをセキュリティパッチで更新する<a id="8a1c"></a>

今、ノードに到達したので、最新のパッケージに更新することをお勧めします。これを行うには、次のコマンドを1-at-a-timeで実行します。

```text
sudo apt update
sudo apt upgrade -y
sudo reboot
```

![投稿の画像](https://miro.medium.com/max/793/1*_2UmPN6vabjGe6aihX9KqA.png)

これにより、当社のオペレーティングシステムの最新のセキュリティパッチがインスタンスに最新のものになります。これによりノードを再起動します。ノードに1〜2分間、起動してから、以前と同じように再度ログインします。

### Avalancheノードを設定する<a id="5688"></a>

これでAvalancheノードを設定する必要があります。これを行うには、インストールプロセスを自動化する[Avalanche Node With Installer](set-up-node-with-installer.md) チュートリアルに従ってください。Azure Portal からコピーされた「IPv4 Public IP」が必要です。

インストールが完了したら、ノードが起動するはずです。avalanchegoノードの最新の状態を確認するために、次のコマンドを実行できます。

```text
sudo systemctl status avalanchego
```

bootstrapの状態を確認するには、ローカルRPCに"curl"を使ってリクエストする必要があります。このリクエストは次のとおりです。

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

Node は、ブートストラップに \(1時間以上に上向き) をかかる場合があります。Bootstrapping は、ノードがチェーンの履歴をダウンロードし、検証することを意味します。これをしばらくして下さい。ノードが起動したら、レスポンスは次のようになります。

```text
{
    "jsonrpc": "2.0",
    "result": {
        "isBootstrapped": true
    },
    "id": 1
}
```

常に「sudo systemctl status avalanchego」を使って、サービスの最新状況を確認できます。

### NodeIDを取得する<a id="20a7"></a>

NodeIDを取得する必要があります。これはRPCからも取得されます。NodeID を取得するには、次の curl コマンドを呼び出します。

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

all-java-java

```text
{"jsonrpc":"2.0","result":{"nodeID":"NodeID-Lve2PzuCvXZrqn8Stqwy9vWZux6VyGUCR"},"id":1}
```

"NodeID-Lve2PzuCvXZrqn8Stqwy9vWZux6VyGUCR"という部分は、NodeIDであり、全体的なものです。それをコピーして、それをノートに保管してください。この値についての機密性も安全性もありませんが、このノードをバリデーターに送信する際には絶対的必要性があります。

### Staking Keysをバックアップする<a id="ef3e"></a>

最後に行うべきことは、インスタンスが破損または終了した場合、不適切なイベントでステーキングキーをバックアップすることです。このキーを保持するのは良い練習です。それらをバックアップするには、次のコマンドを使用します。

```text
scp -i C:\Avalanche\avalanche_key.pem -r ubuntu@EnterYourAzureIPHere:/home/ubuntu/.avalanchego/staking C:\Avalanche
```

以前と同じように、"EnterYourAzureIPHere"を取得した適切な値に置き換える必要があります。これにより、私たちが作成したC:\Avalancheフォルダーにステーキングキーとステーキング証明書をバックアップします。

![投稿の画像](https://miro.medium.com/max/358/1*nqsjJAv2fkcLKPri5idN-Q.png)

