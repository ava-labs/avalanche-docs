# バリデータセットにノードを追加する

## はじめに

[プライマリネットワーク](https://avalanche.gitbook.io/avalanche/build/tutorials/platform/add-a-validator#introduction)は、Avalancheプラットフォームに固有であり、Avalancheのビルドインブロックチェーンが検証されます[。](https://avalanche.gitbook.io/avalanche/learn/platform-overview)このチュートリアルでは、プライマリネットワークにノードを追加し、Avalanche上に[サブネット](https://avalanche.gitbook.io/avalanche/learn/platform-overview#subnets)を追加します。

P-Chainは、Avalanche上でメタデータを管理します。これにより、どのノードがブロックチェーンが存在するか、どのブロックチェーンがバリデーションされているかトラッキングが含まれます。バリデータを追加するため、P-Chainに[トランザクション](http://support.avalabs.org/en/articles/4587384-what-is-a-transaction)を発行します。

{% hint style="danger" %}バリデータとしてノードを追加するトランザクションを発行した後、パラメーターを変更する方法は存在しないことに注意してください。**早期にステークを削除したり、ステーク額、ノードID、リワードアドレスを変更することはできません。**以下のAPIコールで正しい値を設定していることを確認してください。確かでない場合、[開発者に関するFAQを](http://support.avalabs.org/en/collections/2618154-developer-faq)参照するか、[Discord](https://chat.avalabs.org/)でヘルプを求めるようにしてください。{% endhint %}

## 要件

完了した[Avalancheノードを実行](run-avalanche-node.md)し、Avalancheアーキテクチャに精通しています[。](../../../learn/platform-overview/)このチュートリアルでは、[AvalancheのPostmanコレクション](https://github.com/ava-labs/avalanche-postman-collection)を使用して、APIコールを実行する手助けします。

ノードがよく接続されるようにするため、（デフォルト`9651`では）、ステーキングポート上でTCPトラフィックを受信、送信できるようにし、コマンドライン引数でノードを開始するようにしてください`--public-ip=[YOUR NODE'S PUBLIC IP HERE]`。これらいずれかを行わないと、ステーキング報酬が危険にさらされる可能性があります。

## Avalancheウォレットでバリデータを追加する

まず、[Avalancheウォレット](https://wallet.avax.network)を使用することにより、バリデータとしてノードを追加する方法を示します。

次のように呼び出して、ノードのIDを取得します[`info.getNodeID`](https://avalanche.gitbook.io/avalanche/build/apis/info-api#info-getnodeid)。

![getNodeID postman](../../../.gitbook/assets/getNodeID-postman.png)

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

レスポンスには、ノードIDがあります：

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "nodeID": "NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD"
    },
    "id": 1
}
```

[ウォレット](https://wallet.avax.network/)を開き、タブを開きます。選択してください`Earn`。`Add Validator`

![ウェブウォレットでタブを稼ぐ](../../../.gitbook/assets/web-wallet-earn-tab.png)

ステーキングパラメーターを記入します。以下でより詳細に説明します。すべてのステーキングパラメーターを入力し、それらをダブルチェックしたら、をクリックします`Confirm`。ステーキング期間が2週間以上であることを確認し、委任手数料率が2%以上であり、少なくとも2,000 AVAXをステーキングするようお願いします。

{% page-ref page="../../../learn/platform-overview/staking.md" %}

![バリデートを稼ぐ](../../../.gitbook/assets/earn-validate.png)

この成功メッセージが表示されたはずです。そしてバランスが更新されるはずです。

![バリデーショントランザクションが送信されます](../../../.gitbook/assets/your-validation-transaction-is-sent.png)

呼び出しにより、我々のトランザクションが承認されたことを確認[`platform.getPendingValidators`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-getpendingvalidators)します。

![getPendingValidators postman](../../../.gitbook/assets/getPendingValidators-postman.png)

タブに戻り`Earn`、をクリックします。`Estimated Rewards`

![獲得、バリデーション、デリゲート](../../../.gitbook/assets/earn-validate-delegate.png)

バリデータのスタート時間が経過すると、獲得可能な報酬、開始時間、終了時間、経過したバリデーション期間の割合が表示されます。

![推定報酬](../../../.gitbook/assets/estimated-rewards.png)

それで終わりました！

## APIコールでバリデータを追加する

また、我々のノードにAPIコールを行うことで、バリデータにノードを追加することも可能です。プライマリネットワークを追加するには、我々は呼び出します[`platform.addValidator`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-addvalidator)。

このメソッドの署名は次のとおりです：

```cpp
platform.addValidator(
    {
        nodeID: string,
        startTime: int,
        endTime: int,
        stakeAmount: int,
        rewardAddress: string,
        changeAddr: string, (optional)
        delegationFeeRate: float,
        username: string,
        password: string
    }
) -> {txID: string}
```

これらの議論を経て検証しましょう。

`nodeID`

これは、バリデータが追加されるノードIDです。ノードIDを取得するには、次のように呼び出します[`info.getNodeID`](https://avalanche.gitbook.io/avalanche/build/apis/info-api#info-getnodeid)。

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "info.getNodeID",
    "params":{},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

レスポンスには、ノードIDがあります：

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "nodeID": "NodeID-LMUue2dBBRWdDbPL4Yx47Ps31noeewJji"
    },
    "id": 1
}
```

`startTime`と`endTime`

プライマリネットワークに参加するようにトランザクションを発行した場合、入力（バリデーションを開始する）と終了する時間を指定します。プライマリネットワークを検証できる最低期間は24時間であり、最大期間は1年です。離脱後、プライマリーネットワークを再入力することができます。ただし、最大_連続_期間は1年です。`startTime`そして、それぞれプライマリーネットワークのバリデータが開始し、停止するUnix時代`endTime`です。トランザクションが発行された時点と比較して未来のものでなければなり`startTime`ません。

`stakeAmount`

プライマリネットワークをバリデートするには、AVAXをステークする必要があります。このパラメーターでは、AVAXステークされた数量を定義します。

`rewardAddress`

プライマリネットワークのバリデータが停止すると、プライマリネットワークのバリデータが十分にレスポンシブかつ修正した場合、プライマリネットワークのバリデータが受け取ります。これらのトークンは、に送信されます`rewardAddress`。オリジナルステークは、.によってコントロールされたアドレスに戻されます`username`。

バリデータは、行動に関係なく、決してスラッシュすることはありません。バリデータが終了した時点で、常にステークが返信されます。

`changeAddr`

この取引に起因する変更は、このアドレスに送信されます。このフィールドは空のままにすることができます。もしあなたがそうした場合、変更はユーザーのコントロールされたアドレスに送信されます。

`delegationFeeRate`

Avalancheにより、ステークの委任が可能になります。このパラメータは、他の人がステークを委任する際に、このバリデータが請求するパーセント手数料です。`delegationFeeRate`例えば、もしis`1.2345`で、このバリデータに委任します。その後、デリゲート期間が終わると、報酬の1.2345%がバリデータになります。

`username`と`password`

これらのパラメーターは、トランザクション手数料を支払い、ステークされたAVAXを提供し、ステークされたAVAXを提供します。そのユーザーのユーザー名とパスワードで、ステークされたAVAXが返却されます。

次に、トランザクションを発行しましょう。将来10分と30日間のUnix時間計算で、それぞれの値として使用するように`startTime`、シェルコマンドを使用`date`します`endTime`。（注意：あなたがMac上で使用されている場合は、 .`$(date`に置き換える`$(gdate`インストールが完了しない場合は`gdate`、`brew install coreutils`.\)この例では、2,000 AVAX \(2 x 1012 nAVAX\)をステークします。

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.addValidator",
    "params": {
        "nodeID":"NodeID-LMUue2dBBRWdDbPL4Yx47Ps31noeewJji",
        "startTime":'$(date --date="10 minutes" +%s)',
        "endTime":'$(date --date="30 days" +%s)',
        "stakeAmount":2000000000000,
        "rewardAddress":"P-avax1d4wfwrfgu4dkkyq7dlhx0lt69y2hjkjeejnhca",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "delegationFeeRate":10,
        "username":"USERNAME",
        "password":"PASSWORD"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

レスポンスには、トランザクションIDと変更されたアドレスが含まれます。

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "6pb3mthunogehapzqmubmx6n38ii3lzytvdrxumovwkqftzls",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

以下のように呼び出すことで、トランザクションのステータスを見ることができます[`platform.getTxStatus`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-gettxstatus)。

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTxStatus",
    "params": {
        "txID":"6pb3mthunogehapzqmubmx6n38ii3lzytvdrxumovwkqftzls"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

ステータスは`Committed`、トランザクションが成功したことを意味します。呼び出し[`platform.getPendingValidators`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-getpendingvalidators)や、メリマインネットワークのために設定されたペンディングバリデータでノードが次のように設定されていることが確認できます。

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

レスポンスには、追加したノードが含まれます：

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "validators": [
            {
                "nodeID": "NodeID-LMUue2dBBRWdDbPL4Yx47Ps31noeewJji",
                "startTime": "1584021450",
                "endtime": "1584121156",
                "stakeAmount": "2000000000000",
            }
        ]
    },
    "id": 1
}
```

時間に到達すると`1584021450`、このノードはプライマリネットワークのバリデーションを開始します。到達すると`1584121156`、プライマリネットワークのバリデーションを中止します。ステークされたAVAXは、コントロールされたアドレスに返却され、報酬があれば`username`、その報酬が与えられます`rewardAddress`。

## サブネットバリデータを追加する

### サブネットバリデータトランザクションを発行する

さて、サブネットに同じノードを追加しましょう。[サブネットを作成する際に](https://avalanche.gitbook.io/avalanche/build/tutorials/platform/create-a-subnet)このチュートリアルをすでに完了した場合、以下のように説明がより意味が分かります。Avalancheウォレットではなく、APIコールでサブネットにバリデータしか追加できません。

SubnetにID `nTd2Q2nTLp8M9qv2VKHMdvYhtNWX7aTPa4SMEK7x7yJHbcWvr`, thresh 2が存在し、少なくとも2つのコントロールキーを`username`保持するとしましょう。

バリデータを追加するには、APIメソッドを呼び出します[`platform.addSubnetValidator`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-addsubnetvalidator)。その署名は、次のとおりです。

```cpp
platform.addSubnetValidator(
    {
        nodeID: string,
        subnetID: string,
        startTime: int,
        endTime: int,
        weight: int,
        changeAddr: string, (optional)
        username: string,
        password: string
    }
) -> {txID: string}
```

パラメータを調べる:

`nodeID`

サブネットに追加されるバリデータ目のノードIDです。**このバリデータは、このサブネットを検証する期間中に、プライマリネットワークのバリデーションをする必要があります。**

`subnetID`

これは、バリデータを追加するサブネットのIDです。

`startTime`と`endTime`

`endTime`上記と同様に、バリデータがサブネットのバリデータ開始、停止するUnix時代です。バリデータがプライマリネットワークのバリデータが開始される以降、以降でなければ`startTime`なりません。

`weight`

これは、コンセンサスのバリデータサンプリング重量です。バリデータが1で、サブネット内のすべてのバリデータが100である場合、コンセンサス中に100サンプル毎にこのバリデータが含まれます。サブネット内のすべてのバリデータ数の累積重量は、少なくとも必要があります`snow-sample-size`。たとえば、サブネットにバリデータが1つしか存在しない場合、その重みは少なくとも（`snow-sample-size`デフォルト20）でなければなりません。バリデータがバリデータになる中にバリデータが変更できないことを忘れないように、適切な値を使用するように注意してください。

`changeAddr`

この取引に起因する変更は、このアドレスに送信されます。このフィールドは空のままにすることができます。もしあなたがそうした場合、変更はユーザーのコントロールされたアドレスに送信されます。

`username`と`password`

これらのパラメーターは、トランザクション手数料を支払うユーザーのユーザー名とパスワードです。このユーザーは、このサブネットにバリデータを追加するために、このサブネットのコントロールキーを十分に保持しなければなりません。

将来10分と30日間のUnix時間計算で、それぞれの値として使用するように`startTime`、シェルコマンドを使用`date`します`endTime`。（注意：あなたがMac上で使用されている場合は、 .`$(date`に置き換える`$(gdate`インストールが完了しない場合は`gdate`、`brew install coreutils`.\)

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.addSubnetValidator",
    "params": {
        "nodeID":"NodeID-LMUue2dBBRWdDbPL4Yx47Ps31noeewJji",
        "subnetID":"nTd2Q2nTLp8M9qv2VKHMdvYhtNWX7aTPa4SMEK7x7yJHbcWvr",
        "startTime":'$(date --date="10 minutes" +%s)',
        "endTime":'$(date --date="30 days" +%s)',
        "weight":30,
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"USERNAME",
        "password":"PASSWORD"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

レスポンスには、トランザクションIDと変更されたアドレスが含まれます。

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2exafyvRNSE5ehwjhafBVt6CTntot7DFjsZNcZ54GSxBbVLcCm",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

以下のように呼び出すことで、トランザクションのステータスを見ることができます[`platform.getTxStatus`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-gettxstatus)。

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTxStatus",
    "params": {
        "txID":"2exafyvRNSE5ehwjhafBVt6CTntot7DFjsZNcZ54GSxBbVLcCm"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

ステータスは`Committed`、トランザクションが成功したことを意味します。呼び出し[`platform.getPendingValidators`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-getpendingvalidators)や、メリマインネットワークのために設定されたペンディングバリデータ \(ペンディング\) であることが確認できます。今回、サブネットIDを指定します：

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {"subnetID":"nTd2Q2nTLp8M9qv2VKHMdvYhtNWX7aTPa4SMEK7x7yJHbcWvr"},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

レスポンスには、追加したノードが含まれます：

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "validators": [
            {
                "nodeID": "NodeID-LMUue2dBBRWdDbPL4Yx47Ps31noeewJji",
                "startTime":1584042912,
                "endTime":1584121156,
                "weight": "30"
            }
        ]
    },
    "id": 1
}
```

時間に到達すると`1584042912`、このノードはこのサブネットのバリデーションを開始します。到達すると`1584121156`、このノードはこのサブネットのバリデーションを中止します。

### サブネットのホワイトリスト

サブネットのバリデータとしてノードが追加されたので、サブネットのホワイトリストに追加しましょう。ホワイトリストにより、ノードが意図することなくサブネットのバリデーションを可能にするのを防ぎます。

サブネットをホワイトリストするには、ノードを再起動し、カンマ区切りのサブネットリスト`--whitelisted-subnets`でパラメータを追加してホワイトリストします。

完全なコマンドは、次のとおりです。

`./build/avalanchego --whitelisted-subnets=nTd2Q2nTLp8M9qv2VKHMdvYhtNWX7aTPa4SMEK7x7yJHbcWvr`

