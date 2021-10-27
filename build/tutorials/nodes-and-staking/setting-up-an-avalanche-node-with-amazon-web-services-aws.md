# Amazonウェブサービス（AWS）でAvalancheノードを実行する

## はじめに

このチュートリアルでは、[Amazonウェブサービス（AWS）](https://aws.amazon.com/)にAvalancheノードを設定する方法を説明します。AWSのようなクラウドサービスは、ノードが安全で、利用可能で、アクセス可能な状態を確保するのによい方法です。

開始するには、次が必要です。

* AWSアカウント
* AWSマシンにSSHをするターミナル
* 安全にファイルを保存し、バックアップできる場所

このチュートリアルでは、ローカルマシンにUNIXスタイルのターミナルがあることを想定しています。Windowsでご利用の場合は、ここで使用するコマンドを調整する必要があります。

## AWSにログインする<a id="ff31"></a>

AWSのサインアップについてはこの記事では取り上げませんが、Amazonでは、[こちら](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account)に説明があります。

保護するために、AWSルートユーザーアカウントにマルチファクタ認証を設定しておくことが_強く_推奨されています。Amazonでは、[こちら](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_virtual.html#enable-virt-mfa-for-root)にこれについてのドキュメントがあります。

アカウントを設定したら、新しいEC2インスタンスを作成します。EC2は、AWSのクラウドでの仮想マシンインスタンスです。[AWS管理コンソール](https://console.aws.amazon.com/)に移動し、EC2ダッシュボードを入力します。

![AWS管理コンソール.png](../../../.gitbook/assets/image%20%2835%29.png)

EC2インスタンスにログインするには、インスタンスにアクセスを許可するローカルマシンの鍵が必要です。まずその鍵を作成することで、後でEC2インスタンスに割り当てられるようにします。左側のバーの、**Network & Security（ネットワークとセキュリティ）**の下で、**Key Pairs（鍵ペア）**を選択します。

![&quot;Network &amp; Security（セキュリティ）&quot; ドロップダウン下の&quot;Key Pairs（鍵ペア）&quot;を選択します。](../../../.gitbook/assets/image%20%2838%29.png)

**Create key pair（鍵ペアの作成）**を選択し、鍵ペア作成ウィザードを起動します。

![&quot;Create key pair（鍵ペアを作成する）pair.&quot;](https://miro.medium.com/max/847/1*UZ4L0DGUogCfBq-TZ5U3Kw.png)を選択する

鍵に`avalanche`という名前をつけます。ローカルマシンにMacOSまたはLinuxがある場合は、`pem`ファイルフォーマットを選択します。Windowsの場合は、`ppk`ファイルフォーマットを使用します。オプションで鍵ペアのタグを追加し、トラッキングをサポートできます。

![後でEC2インスタンスに割り当てる鍵ペアを作成します。](https://miro.medium.com/max/827/1*Bo30BXjwPTGpgFtoU9VDBA.png)

`Create key pair`をクリックします。成功したというメッセージが表示されます。鍵ファイルはローカルマシンにダウンロードする必要があります。このファイルがなければ、EC2インスタンスにアクセスすることができません。**このファイルのコピーを作成し、外部ハードドライブなどの別のストレージ媒体に保管しましょう。このファイルは機密として保管し、他人と共有しないでください。**

![鍵ペア作成後の成功メッセージ。](https://miro.medium.com/max/534/1*RGpHRWWFjNKMZb7cQTyeWQ.png)

## セキュリティグループを作成する<a id="f8df"></a>

AWSセキュリティグループは、EC2インスタンスに出入りできるインターネットトラフィックを定義します。ファイアウォールのようなものだと考えてください。**ネットワークとセキュリティ**ドロップダウンの下で**セキュリティグループ**を選択し、新しいセキュリティグループを作成します。

![&quot; Network &amp; セキュリティ.&quot;の下の&quot;セキュリティグループ&quot; を選択する](https://miro.medium.com/max/214/1*pFOMpS0HhzcAYbl_VfyWlA.png)

これによりセキュリティグループパネルが開きます。セキュリティグループパネルの右上にある**Create security grou（セキュリティグループを作成する）**をクリックします。

![&quot;セキュリティグループを作成する&quot;](https://miro.medium.com/max/772/1*B0JSYoMBplAtCz2Yb2e1sA.png)を選択する

インバウンドトラフィックが許可されているものを指定する必要があります。IPアドレスからSSHトラフィックを許可すれば、EC2インスタンスにログインできるようになります。（ISPがIPアドレスを変更するたびに、この規則を変更する必要があります。ISPが定期的に変更されている場合は、どこからでもSSHトラフィックを可能にし、このルールを頻繁に変更する必要がないようにできます。）ポート9651でTCPトラフィックを許可するので、ノードがネットワーク上の他のノードと通信できるようになります。IPからポート9650でTCPトラフィックを許可するので、ノードにAPI呼び出しが可能になります。**重要なことは、IPからこのポートのトラフィックのみを許可することです**。どこからでも着信トラフィックを許可する場合、これらはサービス攻撃ベクトルの拒否として使用することができます。最後に、すべてのアウトバウンドトラフィックを許可します。

![インバウンドとアウトバウンドのルールは、次のようになります。](../../../.gitbook/assets/inbound-rules.png)

鍵`Name`と値`Avalanche Security Group`で新しいセキュリティグループにタグを追加します。これにより、セキュリティグループがリスト表示されたときに、このセキュリティーグループは何であるかを知ることができます。

![セキュリティグループにタグを付けると、後で識別できるようになります。](https://miro.medium.com/max/961/1*QehD3uyplkb4RPxddP1qkg.png)

`Create security group`をクリックします。セキュリティグループのリストに新しいセキュリティグループが表示されます。

## EC2インスタンスを起動する<a id="0682"></a>

これで、EC2インスタンスを起動する準備ができました。EC2ダッシュボードに移動し、**Launch instance（インスタンスを起動する）**を選択します。

![&quot;インスタンスを起動する.&quot;を選択します](https://miro.medium.com/max/813/1*zsawPDMBFlonC_7kg060wQ.png)

オペレーティングシステムに**Ubuntu 20.04 LTS \(HVM\), SSD Volume Type2**を選択します。

![Ubuntu 20.04 LTSを選択します。](https://miro.medium.com/max/1591/1*u438irkY1UoRGHO6v76jRw.png)

次に、インスタンスのタイプを選択します。これにより、クラウドインスタンスのハードウェア仕様を定義します。このチュートリアルでは、**c5.large**を設定します。Avalancheは、軽量のコンセンサスプロトコルであるため、これは十分に強力でなければなりません。c5.largeインスタンスを作成するには、フィルタードロップダウンメニューから**Compute-optimized（コンピュート最適化）**オプションを選択します。

![コンピュート最適化でフィルタします。](https://miro.medium.com/max/595/1*tLVhk8BUXVShgm8XHOzmCQ.png)

表のc5.largeインスタンスの横にあるチェックボックスを選択します。

![c5.largeを選択します。](https://miro.medium.com/max/883/1*YSmQYAGvwJmKEFg0iA60aQ.png)

右下のコーナーにある、**Next: Configure Instance Details（次に：インスタンスの詳細を設定する）**ボタンをクリックします。

![](https://miro.medium.com/max/575/1*LdOFvctYF3HkFxmyNGDGSg.png)

インスタンスの詳細はデフォルトのままにできます。

### オプション：SpotインスタンスまたはReservedインスタンスの使用<a id="c99a"></a>

デフォルトでは、EC2インスタンスの実行は一時間ごとに請求されます。EC2で費用を抑える方法は２つあります。

１つは、** Spotインスタンス**としてEC2を起動することです。Spotインスタンスは常に稼働が保証できるインスタンスではありませんが、永続インスタンスよりも平均的に費用が抑えられます。Spotインスタンスは、供給と需要の市場価格構造を使用します。インスタンス需要が上がるにつれ、Spotインスタンス価格が上がるようになります。Spotインスタンスに支払う最大価格を設定することができます。価格が上がった場合にEC2インスタンスが停止できる差し止め通告で、多額の費用を節約できる場合があります。このオプションを選択する前にリサーチを行い、最大価格で中断する頻度がコスト削減に見合っているかどうかを判断してください。Spotインスタンスの使用を選択した場合、中断行動を、必ず**Terminate（終了）**ではなく**Stop（停止）**に設定し、**Persistent Request（永続リクエスト）**オプションにチェックマークを付けるようにしてください。

もう１つの方法は、**Reserved Instance（予約インスタンス）**を使用して節約することです。予約インスタンスではEC2使用の年間の前払いを行い、ロックと引き換えに1時間あたりの料金が低額になります。長期間ノードを実行し、サービス中断のリスクを冒したくない場合は、費用を節約できるよいオプションです。繰り返しますが、このオプションを選択する前に自分でリサーチしてください。

### ストレージ、タグ、セキュリティグループを追加する<a id="dbf5"></a>

画面右下隅にある**Next: Add Storage（次に：ストレージを追加する）**ボタンをクリックします。

インスタンスディスクにスペースを追加する必要があります。この例では100GBを使用します。Avalancheデータベースは、プルーニングが導入されるまで継続的に成長し続けるため、現時点では、より大きなハードドライブの割り当てをするほうが安全です。

![ディスクサイズに100GBを選択します。](../../../.gitbook/assets/add-storage.png)

画面右下隅にある、**Next: Add Tags（次に：タグを追加する）**をクリックし、インスタンスにタグを追加します。タグにより、インスタンスとメタデータを関連付けることができます。鍵`Name`と値`My Avalanche Node`でタグを追加するこれにより、EC2インスタンスリストにあるこのインスタンスが何であるかが明確になります。

![鍵&quot;Name（名前）&quot;と値&quot;t;My Avalanche Node（My Avalancheノード）&quot;でタグを追加する](https://miro.medium.com/max/1295/1*Ov1MfCZuHRzWl7YATKYDwg.png)

さて、以前に作成したセキュリティグループをインスタンスに割り当てます。**Select an existing security group（既存のセキュリティグループ）**を選択し、以前に作成したセキュリティグループを選択します。

![先に作成したセキュリティグループを選択します。](../../../.gitbook/assets/configure-security-group.png)

最後に、右下にある**Review and Launch（レビューと起動）**をクリックします。レビューページには、起動しようとしているインスタンスの詳細が表示されます。これらを確認し、問題がなければ、画面右下隅にある青い**Launch（起動）**ボタンをクリックします。

このインスタンスで鍵ペアを選択するよう求められます。**Choose an existing key pair（既存の鍵ペア）**を選択し、チュートリアルで先に作成した`avalanche`鍵ペアを選択します。以前に作成した`.pem`または`.ppk`ファイルにアクセスできることを確認するボックスを確かめます（必ずバックアップしておきましょう）。次に、**Launch Instances（インスタンスを起動する）**をクリックします。

![先ほど作成した鍵ペアを使用します。](https://miro.medium.com/max/700/1*isN2Z7Y39JgoBAaDZ75x-g.png)

インスタンスの起動を確認する新しいポップアップが表示されます。

![インスタンスが起動しています。](https://miro.medium.com/max/727/1*QEmh9Kpn1RbHmoKLHRpTPQ.png)

### Elastic IPを割り当てる

デフォルトでは、インスタンスには固定IPがありません。AWSのElastic IPサービスで固定IPを指定しましょう。EC2ダッシュボードに戻ります。**Network & Security（ネットワークとセキュリティ）**で、**Elastic IP**を選択します。

![&quot;Network&Security（ネットワーク&amp;セキュリティ）.&quot;のElastic IPs&quot;を選択](https://miro.medium.com/max/192/1*BGm6pR_LV9QnZxoWJ7TgJw.png)

**Allocate Elastic IP address2（Elastic IPアドレスを割り当てる）**を選択します。

![&quot;Allocate Elastic IP address（Elastic IPアドレスを割り当てる）&quot;を選択](https://miro.medium.com/max/503/1*pjDWA9ybZBKnEr1JTg_Mmw.png)

インスタンスが実行している地域を選択し、AmazonのIPv4アドレスのプールの使用を選択します。**Allocate（割り当てる）**をクリックします。

![Elastic IPの設定です。](https://miro.medium.com/max/840/1*hL5TtBcD_kR71OGYLQnyBg.png)

Elastic IPマネージャーから作成したElastic IPを選択します。**Action（アクション）**ドロップダウンから、**Associate Elastic IP address（Elastic IPアドレスを関連付ける）**を選択します。

![&quot;Actions（アクション）&quot;で&quot;Associate Elastic IP address（Elastic IPアドレスを関連付ける）&quot;を選択](https://miro.medium.com/max/490/1*Mj6N7CllYVJDl_-zcCl-gw.png)

作成したインスタンスを選択します。これにより、新しいElastic IPをインスタンスと関連付け、変更しないパブリックIPアドレスに付与します。

![EC2インスタンスにElastic IPを割り当てます。](https://miro.medium.com/max/834/1*NW-S4LzL3EC1q2_4AkIPUg.png)

## AvalancheGoを設定する<a id="829e"></a>

EC2ダッシュボードに戻り、`Running Instances`を選択します。

![実行するインスタンスに移動します。](https://miro.medium.com/max/672/1*CHJZQ7piTCl_nsuEAeWpDw.png)

新しく作成したEC2インスタンスを選択します。これにより、インスタンスの情報とともに詳細パネルが開きます。

![新しいインスタンスの詳細です。](https://miro.medium.com/max/1125/1*3DNT5ecS-Dbf33I_gxKMlg.png)

後で使用する`IPv4 Public IP`フィールドをコピーします。今後は、この値`PUBLICIP`を呼び出します。

**覚えておいてください。次のターミナルコマンドは、Linuxを実行していることを想定しています。MacOSやその他のオペレーティングシステムでは、コマンドが異なる場合があります。コードブロックからコマンドをコピーする場合、ブロックのテキストの全体をコピーして貼り付けます。**

ローカルマシンからAWSインスタンスにログインします。ターミナル（ショートカット`CTRL + ALT + T`を試してください）を開き、先にダウンロードした`.pem`ファイルを含むディレクトリに移動します。

`.pem`ファイルを次に`$HOME/.ssh`に移動します（ここでは、`.pem`ファイルは一般的にライブです）：

```bash
mv avalanche.pem ~/.ssh
```

SSHエージェントに追加することで、EC2インスタンスへのSSHに使用でき、読み取り専用としてマークできます。

```bash
ssh-add ~/.ssh/avalanche.pem; chmod 400 ~/.ssh/avalanche.pem
```

インスタンス内のSSHです。（`PUBLICIP`を以前のパブリックIPフィールドに置き換えることを忘れないでください）

```text
ssh ubuntu@PUBLICIP
```

パーミッションが正しく設定されて**いない**場合、次のエラーが表示されます。

![パーミッションは、必ず正しく設定してください。](https://miro.medium.com/max/1065/1*Lfp8o3DTsGfoy2HOOLw3pg.png)

これでEC2インスタンスにログインできました。

![EC2インスタンスにいます。](https://miro.medium.com/max/1030/1*XNdOvUznKbuuMF5pMf186w.png)

まだ行っていない場合は、インスタンスを更新して、オペレーティングシステムとセキュリティ更新が最新のものになっていることを確認します。

```text
sudo apt update; sudo apt upgrade -y; sudo reboot
```

これによりインスタンスも再起動します。5分待ち、ローカルマシンでこのコマンドを実行して再びログインします。

```bash
ssh ubuntu@PUBLICIP
```

再びEC2インスタンスにログインしています。ここで、Avalancheノードを設定する必要があります。これを行うには、インストールプロセスを自動化する[Avalancheノードを設定する](set-up-node-with-installer.md)チュートリアルに従ってください。先に設定した、`PUBLICIP`が必要です。

これでAvalancheGoノードが実行されているはずです。ブートストラップのプロセスでは、数時間かかることがあります。完了したかどうかを確認するには、`curl`を使用してAPI呼び出しを発行することができます。EC2インスタンスからリクエストを行う場合、リクエストは次の通りです。

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

ノードのブートストラップが完了すると、レスポンスは、次のようになります。

```text
{
    "jsonrpc": "2.0",
    "result": {
        "isBootstrapped": true
    },
    "id": 1
}
```

AvalancheGoがブートストラップしていない場合でも、継続できます。

ノードをバリデーターにするには、ノードIDが必要です。取得するには、次を実行します。

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

レスポンスには、ノードIDが含まれています。

```text
{"jsonrpc":"2.0","result":{"nodeID":"NodeID-DznHmm3o7RkmpLkWMn9NqafH66mqunXbM"},"id":1}
```

上記の例では、ノードIDは`NodeID-DznHmm3o7RkmpLkWMn9NqafH66mqunXbM`です。後でノードIDをコピーします。ノードIDは機密ではないため、テキストエディタに貼り付けることができます。

AvalancheGoには、ノードとやり取りに使用できる[Health API1（健全性API）](../../avalanchego-apis/health-api.md)などのAPIがあります。デフォルトでは一部のAPIは無効となっています。このようなAPIを有効にするには、`/etc/systemd/system/avalanchego.service`（インストールプロセス中に作成した）のExecStartセクションを変更し、エンドポイントを有効にするフラグを含めるように変更します。正当な理由がある場合を除き、手動でAPIを有効にしないでください。

![デフォルトでは一部のAPIは無効になっています。](https://miro.medium.com/max/881/1*Vm-Uh2yV0pDCVn8zqFw64A.png)

EC2インスタンスが破損したり、利用できない場合には、ノードのステーキング鍵と証明書をバックアップします。ノードのIDは、ステーキング鍵と証明書から派生します。ステーキング鍵や証明書を紛失した場合、ノードは新しいノードIDを取得します。ノードがバリデーターである場合、これによりステーキングリワードが対象外になる可能性があります。**ノードのステーキング鍵と証明書をコピーしておくことが強く推奨されています**。初めてノードを実行する場合、新しいステーキング鍵/証明書ペアを生成し、ディレクトリに保存します`/home/ubuntu/.avalanchego/staking`。

実行してSSHインスタンスを終了します。

```bash
exit
```

これでEC2インスタンスに接続されていない状態になっており、ローカルマシンに戻っています。

装置にステーキング鍵と証明書をコピーするには、次のコマンドを実行します。いつものように、`PUBLICIP`を置き換えます。

```text
scp -r ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking ~/aws_avalanche_backup
```

これでステーキング鍵と証明書がディレクトリに含まれました`~/aws_avalanche_backup`。**このディレクトリの内容は機密事項です**。インターネットに接続されていないストレージ（外部ハードドライブなど）にこのディレクトリを保持してください。

### ノードをアップグレードする<a id="9ac7"></a>

AvalancheGoは進行中のプロジェクトであり、通常バージョンアップがあります。ほとんどのアップグレードが推奨されていますが、必須ではありません。後方互換性がないアップグレードには、事前通知があります。ノードを最新版に更新するには、前と同じようにAWSインスタンスにSSHを追加し、インストーラスクリプトを実行します。

```text
./avalanchego-installer.sh
```

これでマシンは最新のAvalancheGoバージョンを実行しています。AvalancheGoサービスのステータスを確認するには、`sudo systemctl status avalanchego.`を実行します。

## まとめ

完了です。これで、AWSEC2インスタンスで実行するAvalancheGoノードがある状態になりました。AvalancheGoノードに[ノードモニタリング](setting-up-node-monitoring.md)を設定することが推奨されています。AWS請求アラートの設定をお勧めします。これにより、請求が到着しても驚くことがなくなります。このチュートリアルに関してご意見やご不明な点がある場合は、[Discord](https://chat.avalabs.org)でメッセージをお送りください。

