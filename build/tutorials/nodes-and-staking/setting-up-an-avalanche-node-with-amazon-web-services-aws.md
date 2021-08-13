# Amazon Web Services \(AWS\)でAvalancheノードを実行する

## JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-

[JavaScript-JP-JP-](https://aws.amazon.com/)AWSのようなクラウドサービスは、ノードが非常に安全で利用可能でアクセスできるようにするための良い方法です。

JavaScript-JP-JP-

* AWSアカウント
* AWSマシンにSSHを取得するターミナル
* ファイルを安全に保存してバックアップする場所

JavaScript-JP-JP-Windows なら、ここで使用するコマンドをいくつか適応させる必要があります。

## AWSにログイン<a id="ff31"></a>

AWSに登録するのはこの記事の範囲外ですが、Amazonには[ここ](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account)に説明があります。

AWS root ユーザーアカウントにマルチファクタ認証を設定することをお勧めし_ます_。Amazon[に](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_virtual.html#enable-virt-mfa-for-root)はこのドキュメントがあります。

アカウントが設定されたら、新しいEC2インスタンスを作成する必要があります。EC2はAWSのクラウドにある仮想マシン・インスタンスです。[AWS Management Console](https://console.aws.amazon.com/) に移動し、EC2 ダッシュボードに入力します。

![AWS管理コンソール.png](../../../.gitbook/assets/image%20%2835%29.png)

EC2インスタンスにログインするには、インスタンスへのアクセスを許可するローカルマシン上でキーが必要です。まず、そのキーを EC2 インスタンスに割り当てるように作成します。左側のバーで、**[ネットワークとセキュリティ]**の下で、**[キーペア]**を選択します。

![&quot;Key Pairs&quot;;&quot;Network &amp;Security&quot;ドロップダウンで選択します。](../../../.gitbook/assets/image%20%2838%29.png)

[**キーペアの作成**]を選択して、キーペア作成ウィザードを起動します。

![&quot;キーペアを作成&quot;](https://miro.medium.com/max/847/1*UZ4L0DGUogCfBq-TZ5U3Kw.png)

`--`ローカルマシンにMacOSまたはLinuxがある場合は、`PEM`ファイル形式を選択します。Windows の場合は、`ppk` ファイル形式を使用します。オプションで、キーペアのタグを追加して、トラッキングを支援できます。

![EC2 インスタンスに後で割り当てられるキーペアを作成します。](https://miro.medium.com/max/827/1*Bo30BXjwPTGpgFtoU9VDBA.png)

`[キーペアの作成]`をクリックします。成功メッセージが表示され、キーファイルはローカルマシンにダウンロードされるはずです。このファイルがなければ、EC2インスタンスにアクセスできません。**このファイルのコピーを作成し、外付けハードドライブなどの別の記憶媒体にそれを置きます。このファイルは秘密にしておきます。他の人と共有しないでください。**

![JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-](https://miro.medium.com/max/534/1*RGpHRWWFjNKMZb7cQTyeWQ.png)

## Security グループの作成<a id="f8df"></a>

AWS Security Groupは、どのようなインターネット トラフィックがEC2インスタンスに入力して、そのままにできるかを定義します。JP-JP-[**ネットワーク&セキュリティ]**ドロップダウンで**[**Security Group]を選択して、新しいSecurity Groupを作成します。

![&quot;Security Groups&quot; 下に &quot;Network &amp; Security.&quot;](https://miro.medium.com/max/214/1*pFOMpS0HhzcAYbl_VfyWlA.png)

これにより、[Security Groups]パネルが開きます。[セキュリティ グループ]パネルの右上にある[セキュリティ **グループの作成**]をクリックします。

![&quot;セキュリティグループを作成します。&quot;](https://miro.medium.com/max/772/1*B0JSYoMBplAtCz2Yb2e1sA.png)

Inbound トラフィックが許可されているかを指定する必要があります。EC2インスタンスにログインできるように、IPアドレスからのSSHトラフィックを許可します。JavaScript-JP-JP-ISP が定期的に変更された場合、SSH トラフィックをどこからでも許可して、このルールを頻繁に変更する必要がないようにします。\) ポート9651でTCPトラフィックを許可して、ノードがネットワーク上の他のノードと通信できるようにします。IP から 9650 ポートで TCP トラフィックを許可して、ノードへの API 呼び出しを行うことができます。**IP からこのポートでのみトラフィックを許可することが重要です。**どこからでも受信トラフィックを許可する場合、これはサービス拒否攻撃ベクトルとして使用できます。最後に、すべてのアウトバウンドトラフィックを許可します。

![Inbound/outbound ルールとアウトバウンドのルールはこのようになります。](../../../.gitbook/assets/inbound-rules.png)

key `Name` と value`Avalanche Security Group` で新しいセキュリティ・グループにタグを追加します。これにより、このセキュリティグループが何であるかを知ることができます。

![セキュリティ グループにタグ付けして、後でそれを識別できます。](https://miro.medium.com/max/961/1*QehD3uyplkb4RPxddP1qkg.png)

`[セキュリティ グループの作成]`をクリックします。新しいセキュリティ グループがセキュリティ グループのリストに表示されます。

## EC2 インスタンスを起動する<a id="0682"></a>

これでEC2インスタンスを起動する準備ができました。EC2 Dashboardに移動し、[**Launch instance**]を選択します。

![&quot;Instance.&quot;を起動します。](https://miro.medium.com/max/813/1*zsawPDMBFlonC_7kg060wQ.png)

**Ubuntu 20.04 LTS \(HVM\)、SSD** ボリュームタイプを選択します。

![Ubuntu 20.04 LTS を選択します。](https://miro.medium.com/max/1591/1*u438irkY1UoRGHO6v76jRw.png)

次に、インスタンスタイプを選択します。これは、クラウドインスタンスのハードウェア仕様を定義します。このチュートリアルでは**c5.large**を設定しました。Avalanche は軽量なコンセンサスプロトコルであるため、これは十分に強力なものであるはずです。c5.large インスタンスを作成するには、フィルタードロップダウンメニューから、**Compute--pized-**optionsを選択します。

![最適化された計算でフィルターします。](https://miro.medium.com/max/595/1*tLVhk8BUXVShgm8XHOzmCQ.png)

C5.large インスタンス横のチェックボックスを選択します。

![c5.largeを選択します。](https://miro.medium.com/max/883/1*YSmQYAGvwJmKEFg0iA60aQ.png)

右下隅にある**「次:インスタンス詳細を設定」**ボタンをクリックします。

![](https://miro.medium.com/max/575/1*LdOFvctYF3HkFxmyNGDGSg.png)

インスタンス詳細はデフォルトとして残ることができます。

### オプション: Spot インスタンスまたは予約済みインスタンスを使用する<a id="c99a"></a>

デフォルトでは、EC2インスタンスを実行する際に、1時間ごとに課金されます。EC2の支払い方法は2つあります。

1つ目は、EC2を**スポットインスタンス**として起動することです。Spot インスタンスは、常にアップする保証がないインスタンスですが、平均的なコストは永続的なインスタンスよりも少なくなります。Spot インスタンスは、需要の市場価格構造を使用します。インスタンスに対する需要が上昇すると、スポットインスタンスの価格が上昇します。あなたは、スポットインスタンスのために支払うことを喜んでいる最大価格を設定することができます.EC2インスタンスが価格が上昇すると停止するという注意点で、大幅な金額を節約できます。このオプションを選択する前に、独自の研究を行って、あなたの最大値の価格で中断頻度がコスト削減を正当化するかどうかを判断します。Spot インスタンスを使用する場合、中断動作を**停止**するよう**に**設定し、**Persistent Request** オプションをチェックしてください。

もう1つの方法は、**Reserved Instance**を使用することです。予約済みのインスタンスでは、EC2使用の1年間前払いで支払い、ロックインと引き換えに1時間あたりのレートが低いです。ノードを長期間実行しようとしている場合、サービス中断をリスクにさらさない場合は、お金を節約するのに良いオプションです。このオプションを選択する前に、独自の研究を行います。

### ストレージ, タグ, セキュリティグループを追加します。<a id="dbf5"></a>

**[Next: ストレージを追加]**ボタンをクリックします。

インスタンスディスクにスペースを追加する必要があります。この例では100 GBを使用しています。Avalancheデータベースは、プルーニングが実装されるまで継続的に成長していきますので、今のところより大きなハードドライブの割り当てをする方が安全です。

![JavaScript-JP-JP-](../../../.gitbook/assets/add-storage.png)

**[次へ]**をクリックします: タグを追加します。タグにより、メタデータとインスタンスを関連付けることができます。key `Name` と value `My Avalanche Node` を含むタグを追加します。これにより、このインスタンスがEC2インスタンスの一覧に何があるのかが明らかになります。

![&quot;Name&quot;および値 &quot;My Avalanche Node.&quot;](https://miro.medium.com/max/1295/1*Ov1MfCZuHRzWl7YATKYDwg.png)

これで、以前に作成したセキュリティグループをインスタンスに割り当てます。**[既存のセキュリティ グループの選択**]を選択し、以前に作成されたセキュリティ グループを選択します。

![以前に作成したセキュリティ・グループを選択します。](../../../.gitbook/assets/configure-security-group.png)

最後に、右下の[**Review and Launch**]をクリックします。レビューページでは、起動しようとするインスタンスについての詳細が表示されます。それらを確認し、すべてが良く見える場合は、画面の右下隅にある青い**起動**ボタンをクリックします。

このインスタンスにキーペアを選択するように求められます。**[既存のキーペアを**選択]を選択し、チュートリアルで前回作成した`アバランシェキーペア`を選択します。JPY-PPX`-``PPX`-PPX-PX-PX\) 次に、**[インスタンスを起動**]をクリックします。

![JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-](https://miro.medium.com/max/700/1*isN2Z7Y39JgoBAaDZ75x-g.png)

インスタンスが起動していることを確認する新しいポップアップが表示されるはずです!

![あなたのインスタンスが起動しています！](https://miro.medium.com/max/727/1*QEmh9Kpn1RbHmoKLHRpTPQ.png)

### Elastic IPを割り当てる

デフォルトでは、インスタンスに固定IPはありません。AWSのElastic IPサービスを通じて、固定IPを渡しましょう。EC2ダッシュボードに戻ります。**[ネットワークとセキュリティ]**で、[**Elastic IPs**]を選択します。

![&quot;Elastic IPs&quot;;&quot;Network &amp;Security.&quot;](https://miro.medium.com/max/192/1*BGm6pR_LV9QnZxoWJ7TgJw.png)

**[Elastic IP アドレスを割り当て**]を選択します。

![&quot;Elastic IP address.&quot; を選択します。](https://miro.medium.com/max/503/1*pjDWA9ybZBKnEr1JTg_Mmw.png)

インスタンスが実行している地域を選択し、AmazonのIPv4アドレスのプールを使用することを選択します。**[割り当て**]をクリックします。

![Elastic IP の設定。](https://miro.medium.com/max/840/1*hL5TtBcD_kR71OGYLQnyBg.png)

Elastic IP マネージャーから作成したElastic IPを選択します。**[アクション]**ドロップダウンから、**[Elastic IP アドレスを関連付ける]**を選択します。

![&quot;Actions&quot;で、 &quot;Accessory Elastic IP address.&quot;](https://miro.medium.com/max/490/1*Mj6N7CllYVJDl_-zcCl-gw.png)

作成したインスタンスを選択します。これにより、新しいElastic IPをインスタンスと関連付け、変更しないパブリックIPアドレスが与えられます。

![Elastic IP を EC2 インスタンスに割り当てます。](https://miro.medium.com/max/834/1*NW-S4LzL3EC1q2_4AkIPUg.png)

## AvalancheGoの設定<a id="829e"></a>

EC2 ダッシュボードに戻り、[`Running Instances`]を選択します。

![実行中のインスタンスに移動します。](https://miro.medium.com/max/672/1*CHJZQ7piTCl_nsuEAeWpDw.png)

新しく作成した EC2 インスタンスを選択します。これにより、インスタンスに関する情報が表示される詳細パネルが開きます。

![新しいインスタンスについての詳細はこちら](https://miro.medium.com/max/1125/1*3DNT5ecS-Dbf33I_gxKMlg.png)

`IPv4 Public IP` フィールドをコピーして後で使用します。これから`PUBLICIP`と呼びます。

**JP-JP-MacOS または他のオペレーティングシステムでコマンドが異なる場合があります。コードブロックからコマンドをコピー・ペーストする場合、ブロック内のテキスト全体をコピー&ペーストします。**

ローカルマシンからAWSインスタンスにログインします。端末 \(ショートカット`CTRL + ALT + T`\)を開き、先にダウンロードした `.pem` ファイルを含むディレクトリに移動します。

`.pem`ファイルを`$HOME/.ssh` \(`where .pem` files all-live\)に移動します。

```bash
mv avalanche.pem ~/.ssh
```

SSH エージェントに追加して、それをSSHにEC2インスタンスに使用し、読み取り専用としてマークします。

```bash
ssh-add ~/.ssh/avalanche.pem; chmod 400 ~/.ssh/avalanche.pem
```

SSHインスタンスにインスタンスを入れてください。\(`PUBLICIP`を以前からパブリックIPフィールドに置き換えることを忘れないでください。\)

```text
ssh ubuntu@PUBLICIP
```

パーミッションが正しく設定**されていない**場合、次のエラーが表示されます。

![パーミッションを正しく設定していることを確認してください。](https://miro.medium.com/max/1065/1*Lfp8o3DTsGfoy2HOOLw3pg.png)

EC2 インスタンスにログインしました。

![You&apos;re on the EC2 インスタンス.](https://miro.medium.com/max/1030/1*XNdOvUznKbuuMF5pMf186w.png)

まだまだそうしていない場合は、インスタンスを更新して、最新のオペレーティングシステムとセキュリティ更新プログラムが含まれていることを確認してください。

```text
sudo apt update; sudo apt upgrade -y; sudo reboot
```

これもまたインスタンスを再起動します。5分間待ち、ローカルマシンでこのコマンドを実行して再度ログインします:

```bash
ssh ubuntu@PUBLICIP
```

EC2 インスタンスに再びログインします。これでAvalancheノードを設定する必要があります。これを行うには、インストールプロセスを自動化する[Avalanche Node With Installer](set-up-node-with-installer.md) チュートリアルに従ってください。`PUBLICIP`が必要です。

AvalancheGoノードが実行され、ブートストラップのプロセスで動作するはずです。JavaScriptを有効にするには、`curl`を使ってAPIコールを発行できます。EC2 インスタンスからリクエストを行っている場合、リクエストは次のとおりです。

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

ノードが起動したら、レスポンスは次のようになります。

```text
{
    "jsonrpc": "2.0",
    "result": {
        "isBootstrapped": true
    },
    "id": 1
}
```

AvalancheGoが起動しなくても、続けられます。

ノードをバリデーターにするには、ノードIDが必要です。JavaScript-JP-JP-

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

レスポンスにはノードIDが含まれています。

```text
{"jsonrpc":"2.0","result":{"nodeID":"NodeID-DznHmm3o7RkmpLkWMn9NqafH66mqunXbM"},"id":1}
```

上記の例では、ノードIDは`NodeID-DznHmm3o7RkmpLkWMn9NqafH66mqunXbM`です。Node ID を後でコピーします。ノードIDは秘密ではありませんので、テキストエディタに貼り付けられます。

AvalancheGoには、[Health API](../../avalanchego-apis/health-api.md)などの他のAPIがあります。これは、ノードと対話するために使用できます。一部のAPIはデフォルトで無効化されています。このようなAPIを有効にするには、`/etc/systemd/system/avalanchego.service` \(installation process\) の ExecStart セクションを変更して、これらのエンドポイントを有効にするフラグを追加します。API を手動で有効にしないでください。

![一部のAPIはデフォルトで無効化されています。](https://miro.medium.com/max/881/1*Vm-Uh2yV0pDCVn8zqFw64A.png)

EC2インスタンスが破損している場合、またはそれ以外の場合に使用できない場合にノードのステーキングキーと証明書をバックアップします。ノードのIDは、そのステーキングキーと証明書から派生します。ステーキングキーまたは証明書を失った場合、ノードは新しいノードIDを取得します。これは、ノードがバリデーターである場合、ステーキング報酬の対象外になる可能性があります。**ノードのステーキングキーと証明書をコピーすることをお勧めします。**ノードを実行する際に、新しいステーキングキー/証明書ペアを生成し、それらをディレクトリ`/home/ubuntu/.avalanchego/staking`に保存します。

SSH インスタンスから終了します。

```bash
exit
```

これでEC2インスタンスに接続されていません。ローカルマシンに戻ります。

ステーキングキーと証明書をマシンにコピーするには、次のコマンドを実行します。`PUBLICIP`を置き換えます。

```text
scp -r ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking ~/aws_avalanche_backup
```

`-`-**このディレクトリの内容はsecretです。**このディレクトリをインターネットに接続されていないストレージに保持する必要があります。\)

### Nodeのアップグレード<a id="9ac7"></a>

AvalancheGoは現在進行中のプロジェクトであり、定期的なバージョンアップが行われています。ほとんどのアップグレードは推奨されますが、必要ありません。後方互換性がないアップグレードについては、事前通知が表示されます。ノードを最新バージョンに更新するには、AWSインスタンスにSSHをインストーラースクリプトを再度実行します。

```text
./avalanchego-installer.sh
```

現在、マシンが最新のAvalancheGoバージョンを実行しています。AvalancheGo サービスのステータスを確認するには、`sudo systemctl status avalanchego` を実行します。

## JP-JP-

それだけだ!AWS EC2 インスタンスで実行されている AvalancheGo ノードが追加されました。AvalancheGoノードの[モニタリングを](setting-up-node-monitoring.md)設定することをお勧めします。また、AWS ビリングアラートを設定することをお勧めします。このチュートリアル、または何かご意見がある場合は、[Discord](https://chat.avalabs.org)でメッセージを送ってください。

