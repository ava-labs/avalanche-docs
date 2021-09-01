# Amazon Web Services（AWS）でAvalancheノードを実行する

## はじめに

このチュートリアルでは、[Amazon Web Services（AWS）](https://aws.amazon.com/)上にAvalancheノードを設定する方法を説明します。AWSのようなクラウドサービスは、あなたのノードが安全かつ利用可能かつアクセス可能であることを確実にする良い方法です。

始めるには、以下の必要がございます：

* AWSアカウント
* AWSマシンにSSHを入手するターミナル
* 安全にファイルを保存、バックアップする場所

このチュートリアルでは、ローカルマシンにUnixスタイルターミナルが存在していると想定します。Windows上で使用されるコマンドを適応する必要があります。

## AWSにログイン<a id="ff31"></a>

AWSに登録するのはこの記事の範囲外ではありませんが、Amazonには[ここ](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account)に手順があります。

_AWSルートユーザーアカウントにマルチファクタ認証を設定して保護することを[お](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_virtual.html#enable-virt-mfa-for-root)_勧めします。Amazonにはここにドキュメントがあります。

アカウントがセットアップされた後、新しいEC2インスタンスを作成する必要があります。EC2は、AWSのクラウド上の仮想マシンインスタンスです。[AWS管理](https://console.aws.amazon.com/)コンソールに移動し、EC2ダッシュボードに入力します。

![AWSマネジメント Console.png](../../../.gitbook/assets/image%20%2835%29.png)

EC2インスタンスにログインするには、あなたのローカルマシン上でインスタンスにアクセスを許可する鍵が必要になります。まず、その鍵を作成し、後でEC2インスタンスに割り当てられるようにします。左側のバーで、**ネットワークとセキュリティで**、**鍵ペアを選択します。**

![&quot;キーペア&quot;&quot;ネットワーク &amp;セキュリティ&quot;ドロップダウンで、&quot;&quot;を選択します。](../../../.gitbook/assets/image%20%2838%29.png)

**を選択し、鍵ペア作成ウィザードを開始**します。

![を選択する&quot;キーペアを作成する。&quot;](https://miro.medium.com/max/847/1*UZ4L0DGUogCfBq-TZ5U3Kw.png)

鍵に名前を付けます`avalanche`。ローカルマシンにMacOSあるいはLinuxがある場合、`pem`ファイル形式を選択します。Windowsであれば、`ppk`ファイル形式を使用してください。オプションで、キーペアのタグを追加してトラッキングを支援することができます。

![後でEC2インスタンスに割り当てられるキーペアを作成します。](https://miro.medium.com/max/827/1*Bo30BXjwPTGpgFtoU9VDBA.png)

をクリックします`Create key pair`。成功メッセージが表示されたはずで、キーファイルはローカルマシンにダウンロードする必要があります。このファイルがなければ、EC2インスタンスにアクセスすることはできません。**このファイルのコピーを作成し、外付けハードドライブなどの別々のストレージメディアに置きましょう。このファイル秘密を保持し、他の人と共有しないでください。**

![鍵ペアを作成した後、成功メッセージ。](https://miro.medium.com/max/534/1*RGpHRWWFjNKMZb7cQTyeWQ.png)

## セキュリティグループを作成する<a id="f8df"></a>

AWSセキュリティグループは、EC2インスタンスを残すことができるインターネットトラフィックが定義します。ファイアウォールと考えてください。****ネットワークとセキュリティドロップダウンで**セキュリティグループを選択して新しいセキュリティグループを作成します**。

![&quot;セキュリティグループ&quot;&quot; ネットワーク &amp; セキュリティ.&quot; 以下に](https://miro.medium.com/max/214/1*pFOMpS0HhzcAYbl_VfyWlA.png)

これにより、セキュリティグループパネルが開きます。**セキュリティグループパネルの右上のパネル**で、セキュリティグループを作成するをクリックします。

![を選択する&quot;セキュリティグループを作成する。&quot;](https://miro.medium.com/max/772/1*B0JSYoMBplAtCz2Yb2e1sA.png)

インバウンドトラフィックが許可されているかを指定する必要があります。IPアドレスからSSHトラフィックを許可し、EC2インスタンスにログインできるようにします。（ISPがIPアドレスを変更するたびに、このルールを変更する必要があります。ISPが定期的に変更された場合、いつでもどこからでもSSHトラフィックを許可して、このルールを頻繁に変更する必要がないようにすることができます。）9651ポート上でTCPトラフィックを許可し、ノードはネットワーク上の他のノードと通信できるようになります。IPからポート9650でTCPトラフィックを許可し、ノードにAPIコールを行うことができます。**IPからこのポート上のトラフィックしか許可しないことが重要です。**どこからでも着信トラフィックを許可した場合、サービス拒否アタックベクトルとして使用することができます。最後に、すべてのアウトバウンドトラフィックを許可します。

![インバウンドとアウトバウンドルールは、こうしたようです。](../../../.gitbook/assets/inbound-rules.png)

キー`Name`と値で新しいセキュリティグループにタグを追加します。`Avalanche Security Group`これにより、我々がセキュリティグループのリストで見たときに、このセキュリティグループが何であるか知ることが可能になります。

![セキュリティグループにタグを付けて、後で識別できるようにします。](https://miro.medium.com/max/961/1*QehD3uyplkb4RPxddP1qkg.png)

をクリックします`Create security group`。新しいセキュリティグループが、セキュリティグループリストで表示されるはずです。

## EC2インスタンスを立ち上げる<a id="0682"></a>

これでEC2インスタンスを立ち上げる準備が完了しました。EC2ダッシュボードに移動し、「**起動」インスタンスを選択します**。

![を選択&quot;インスタンスを起動する.&quot;](https://miro.medium.com/max/813/1*zsawPDMBFlonC_7kg060wQ.png)

オペレーティングシステム**のために**Ubuntu 20.04 LTS（HVM）、SSDボリュームタイプを選択します。

![Ubuntu 20.04 LTSを選択します。](https://miro.medium.com/max/1591/1*u438irkY1UoRGHO6v76jRw.png)

次に、インスタンスタイプを選択しますこれにより、クラウドインスタンスのハードウェア仕様を定義します。このチュートリアルでは、c5.largeを設定します****。Avalancheは軽量コンセンサスプロトコルであるため、これは十分に強力でなければなりません。c5.largeインスタンスを作成するには、フィルタードロップダウンメニューからCompute最適**化**オプションを選択します。

![最適化された計算でフィルターします。](https://miro.medium.com/max/595/1*tLVhk8BUXVShgm8XHOzmCQ.png)

テーブル内のc5.largeインスタンス横のチェックボックスを選択します。

![c5.largeを選択します。](https://miro.medium.com/max/883/1*YSmQYAGvwJmKEFg0iA60aQ.png)

右下隅の「次へ**：インスタンス詳細を構成する**ボタンをクリックします。

![](https://miro.medium.com/max/575/1*LdOFvctYF3HkFxmyNGDGSg.png)

インスタンス詳細は、デフォルトとして維持できます。

### オプション：スポットインスタンスあるいは予約インスタンスを使用する<a id="c99a"></a>

デフォルトでは、EC2インスタンスを実行するために毎時間請求されます。EC2代目にあたる料金を少なくする方法は2種類あります。

まず、EC2を**スポットインスタンスとして立ち上げることです**。スポットインスタンスは、常にアップが保証されることなく、平均で永続的なインスタンスよりもコストがかかりません。スポットインスタンスは、供給と需要市場価格構造を使用します。インスタンスに対する需要が上昇すると、スポットインスタンスの価格が上昇します。スポットインスタンスで支払いを希望する最大価格を設定することができます。価格が上昇した場合、EC2インスタンスが停止できるという注意で、大幅な金額を節約できます。このオプションを選択する前に、あなたの最大価格で中断頻度がコスト削減を正当化するかどうかを判断します。**スポットインスタンスを使用する場合、中断動作を停止するように設定し、「終了」をチェック**し****、「**Persistent Requestオプションをチェックしてください**。

お金を節約できるもう一つの方法は、**予約インスタンスを使用することです**。予約されたインスタンスにより、EC2使用期間中の年間で前払いを行い、ロックと引き換えに、1時間あたりの低レートを受け取ります。長期間にわたってノードを実行しようとし、サービス中断をリスクにしたくない場合、これはお金を節約するための良いオプションです。繰り返しますが、このオプションを選択する前に、自身で調査を行います。

### ストレージ、タグ、セキュリティグループを追加する<a id="dbf5"></a>

画面右下にある「次へ**：ストレージを追加する**ボタンをクリックします。

インスタンスディスクにスペースを追加する必要があります。この例では、100 GBを使用します。Avalancheデータベースは、プルーンが実装されるまで継続的に成長していきます。そのため、現在のところより大きなハードドライブ割当を確保する場合は安全です。

![ディスクサイズで100GBを選択します。](../../../.gitbook/assets/add-storage.png)

次へ**：画面右下のタグ**を追加して、インスタンスにタグを追加します。タグにより、メタデータを、我々のインスタンスと関連付けることができます。キー`Name`と値でタグを追加します。`My Avalanche Node`これにより、EC2インスタンスリストに載っていることが明確になります。

![キーで&quot;Name&quot;そして値で&quot;My Avalanche Node.&quot;でタグを追加する](https://miro.medium.com/max/1295/1*Ov1MfCZuHRzWl7YATKYDwg.png)

以前に作成したセキュリティグループをインスタンスに割り当てます。既存のセキュリティグループ**を選択し、より早く作成されたセキュリティグループを選択**します。

![以前に作成したセキュリティグループを選択します。](../../../.gitbook/assets/configure-security-group.png)

最後に、右下**の「**レビューと起動」をクリックします。レビューページで、ローンチしようとしているインスタンス詳細が表示されます。これらのことを確認し、すべてが良い場合、画面右下にある青い**起動**ボタンをクリックします。

この場合の鍵ペアを選択するよう求められます。既存の鍵ペア**を選択し、チュートリアルの前に作った`avalanche`鍵ペアを選択**します。`.ppk`以前に作成されたファイル`.pem`やアクセス権があることを確認したボックスをチェックする（バックアップが完了したことを確認してください！その後、「インスタンスを**立ち上げる」をクリックします**。

![以前に作成した鍵ペアを使用します。](https://miro.medium.com/max/700/1*isN2Z7Y39JgoBAaDZ75x-g.png)

インスタンスが立ち上げられていることを確認する新しいポップアップ

![あなたのインスタンスがローンチしました！](https://miro.medium.com/max/727/1*QEmh9Kpn1RbHmoKLHRpTPQ.png)

### Elastic IPを割り当てる

デフォルトで、あなたのインスタンスには固定IPは存在しません。AWSのElastic IPサービスを通じて固定IPを与えましょう。EC2ダッシュボードに戻ります。**ネットワークとセキュリティで、**Elastic IP**を選択します**。

![&quot;Elastic IPs&quot;&quot;ネットワーク &amp;セキュリティ.&quot;](https://miro.medium.com/max/192/1*BGm6pR_LV9QnZxoWJ7TgJw.png)

Elastic IPアドレスを**割り当てるを選択します**。

![&quot;Elastic IPアドレスを割り当てる。&quot;](https://miro.medium.com/max/503/1*pjDWA9ybZBKnEr1JTg_Mmw.png)

あなたのインスタンスが実行されている地域を選択し、AmazonのIPv4アドレスのプールを使用するを選択します。Allocateをクリックします****。

![Elastic IPの設定。](https://miro.medium.com/max/840/1*hL5TtBcD_kR71OGYLQnyBg.png)

Elastic IPマネージャから作成したElastic IPを選択します。**アクションドロップダウンから**、**アソシエイト Elastic IPアドレスを選択します**。

![&quot;Actions&quot;下で、 &quot; 選択 &aspic IPアドレス.&quot; クォート; クォート;](https://miro.medium.com/max/490/1*Mj6N7CllYVJDl_-zcCl-gw.png)

作成したばかりのインスタンスを選択しますこれにより、新しいElastic IPがインスタンスと関連付けられ、変わらないパブリックIPアドレスが与えられます。

![EC2インスタンスにElastic IPを割り当てます。](https://miro.medium.com/max/834/1*NW-S4LzL3EC1q2_4AkIPUg.png)

## AvalancheGoをセットアップする<a id="829e"></a>

EC2ダッシュボードに戻し、選択します`Running Instances`。

![ランニングインスタンスに移動します。](https://miro.medium.com/max/672/1*CHJZQ7piTCl_nsuEAeWpDw.png)

新しく作成されたEC2インスタンスを選択します。これにより、インスタンスについての情報が入手された詳細パネルが開きます。

![新しいインスタンスについての詳細。](https://miro.medium.com/max/1125/1*3DNT5ecS-Dbf33I_gxKMlg.png)

後で使用する`IPv4 Public IP`フィールドをコピーします。これからこの値を呼びます`PUBLICIP`。

**覚えておく：以下のターミナルコマンドは、あなたがLinuxを実行していると仮定します。MacOSや他のオペレーティングシステムでコマンドが異なる場合があります。コードブロックからコマンドをコピーする際、ブロックにテキストの全体をコピーして貼り付けます。**

ローカルマシンからAWSインスタンスにログインします。`CTRL + ALT + T`ターミナルを開き、以前にダウンロードした`.pem`ファイルを含むディレクトリに移動します。

以下のもので、（一般的に`.pem`ファイルが存在する`$HOME/.ssh`場合）`.pem`ファイルを移動します。

```bash
mv avalanche.pem ~/.ssh
```

SSHエージェントに追加し、EC2インスタンスにSSHに使用できるようにします。

```bash
ssh-add ~/.ssh/avalanche.pem; chmod 400 ~/.ssh/avalanche.pem
```

SSH。（以前からパブリックIPフィールド`PUBLICIP`に置き換えることを忘れないでください。

```text
ssh ubuntu@PUBLICIP
```

パーミッションが正しく**設定されてい**ない場合、以下のエラーが表示されます。

![権限を正しく設定してください。](https://miro.medium.com/max/1065/1*Lfp8o3DTsGfoy2HOOLw3pg.png)

EC2インスタンスにログインが完了しました。

![You&apos;re EC2インスタンス上で](https://miro.medium.com/max/1030/1*XNdOvUznKbuuMF5pMf186w.png)

既にそうでない場合、最新のオペレーティングシステムとセキュリティアップデートがあることを確認するように更新します。

```text
sudo apt update; sudo apt upgrade -y; sudo reboot
```

これにより、インスタンスを再起動します。5分待機し、その後、ローカルマシン上でこのコマンドを実行して再度ログインします：

```bash
ssh ubuntu@PUBLICIP
```

EC2インスタンスに再度ログインします。さて、Avalancheノードをセットアップする必要があります。これを実行するには、[Avalanche](set-up-node-with-installer.md)ノードウィンドインストーラチュートリアルに従ってインストールプロセスを自動化します。以前にセットアップした`PUBLICIP`ものが必要になります。

AvalancheGoノードが実行され、ブートストラップのプロセス中に実行されるはずです。完了かどうか確認するには、を使用してAPIコールを発行することができます`curl`。EC2インスタンスからリクエストを行っている場合、リクエストは次のようになります。

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

ノードがブートストラップが完了すると、レスポンスは次のようになります。

```text
{
    "jsonrpc": "2.0",
    "result": {
        "isBootstrapped": true
    },
    "id": 1
}
```

AvalancheGoがブートストラップが行われない場合でも、継続できます。

ノードがバリデータになるには、ノードIDが必要です。それを取得するには、以下の実行を実行します。

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

上記の例では、ノードIDは次のとおりです`NodeID-DznHmm3o7RkmpLkWMn9NqafH66mqunXbM`。後で、ノードIDをコピーします。ノードIDは秘密ではありません。

AvalancheGoは、[ヘルスAPI](../../avalanchego-apis/health-api.md)など、他のAPIを持っています。一部のAPIは、デフォルトで無効化されています。こうしたAPIを有効にするには、（インストールプロセス中に`/etc/systemd/system/avalanchego.service`作成された）ExecStartセクションを変更して、これらのエンドポイントが可能にするフラグを追加してください。理由がない場合を除き、手動でAPIを有効にしないでください。

![一部のAPIは、デフォルトで無効化されています。](https://miro.medium.com/max/881/1*Vm-Uh2yV0pDCVn8zqFw64A.png)

EC2インスタンスが破損した場合、または利用不能の場合に備えて、ノードのステーキングキーと証明書をバックアップします。ノードのIDは、ステーキングキーと証明書から派生します。ステーキングキーや証明書を失った場合、ノードは新しいノードIDが取得されます。そのため、バリデータである場合、ステーキング報酬の対象外になる可能性があります。**ノードステーキングキーと証明**書をコピーすることをお勧めします。ノードを実行すると、新しいステーキングキー/証明書ペアを生成し、ディレクトリに保存します`/home/ubuntu/.avalanchego/staking`。

SSHインスタンスから出力するには、以下の実行で

```bash
exit
```

現在、EC2インスタンスに接続できなくなります。

ステーキングキーと証明書をマシンにコピーする場合は、以下のコマンドを実行します。いつものように、置き換えてください`PUBLICIP`。

```text
scp -r ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking ~/aws_avalanche_backup
```

ステーキングキーと証明書がディレクトリに含まれます`~/aws_avalanche_backup`。**このディレクトリの内容は秘密です。**インターネットに接続されていないストレージ上にこのディレクトリを保持する必要があります。

### ノードのアップグレード<a id="9ac7"></a>

AvalancheGoは、進行中のプロジェクトであり、定期的なバージョンアップが存在します。ほとんどのアップグレードをお勧めしますが、必要ありません。バックカーバーと互換性がないアップグレードについては、事前の通知がお受けします。最新バージョンに更新するには、SSHは、以前と同様にAWSインスタンスに登録し、インストーラスクリプトを再度実行してください。

```text
./avalanchego-installer.sh
```

現在、あなたのマシンは、最新のAvalancheGoバージョンを実行しています。AvalancheGoサービスのステータスを見るには、実行してください。`sudo systemctl status avalanchego.`

## ラップアップ

それで終わりました！AWS EC2インスタンス上で実行されるAvalancheGoノードが誕生します。AvalancheGo[ノードの](setting-up-node-monitoring.md)ためのノードモニタリングを設定することをお勧めします。AWSビルアラートを設定することも推奨します。このチュートリアルのフィードバックなどでご意見をお持ちの場合、[Discord](https://chat.avalabs.org)上でメッセージをお送りください。

