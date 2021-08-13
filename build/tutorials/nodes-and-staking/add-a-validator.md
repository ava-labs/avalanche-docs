# Validator Setにノードを追加する

## JavaScript-JavaScript-JavaScript-Java

[Primary Network](https://avalanche.gitbook.io/avalanche/build/tutorials/platform/add-a-validator#introduction)はAvalancheプラットフォームに固有のもので、Avalancheの[組み込み](https://avalanche.gitbook.io/avalanche/learn/platform-overview)ブロックチェーンが検証されています。このチュートリアルでは、Primary Networkにノードを追加し、Avalancheの[サブネット](https://avalanche.gitbook.io/avalanche/learn/platform-overview#subnets)を追加します。

P-ChainはAvalancheのメタデータを管理します。これには、どのノードがどのブロックチェーンに存在するか、どのブロックチェーンがどのサブネットに存在するかを追跡するものと、どのブロックチェーンがどのサブネットに検証されているかを確認するものが含まれます。バリデータを追加するには、P-Chainに[トランザクション](http://support.avalabs.org/en/articles/4587384-what-is-a-transaction)を発行します。

{% ヒント スタイル="danger" %}トランザクションをバリデータとしてノードを追加すると、パラメータを変更する方法はありません。**ステークを早期に削除したり、ステーク金額、ノードID、リワードアドレスを変更することはできません。**以下のAPIコールで正しい値を使用していることを確認してください。わからない場合は、[Developer FAQ を](http://support.avalabs.org/en/collections/2618154-developer-faq)参照するか、[Discord](https://chat.avalabs.org/) に関するヘルプを尋ねてください。{% endhint %}

## JavaScript-JavaScript-JavaScript-Java

[Avalanche Node](run-avalanche-node.md)の実行を完了しました。[Avalancheの建築](../../../learn/platform-overview/)に精通しています。このチュートリアルでは[、AvalancheのPostmanコレクション](https://github.com/ava-labs/avalanche-postman-collection)を使用してAPIコールを作成します。

ノードが十分に接続されていることを確認するために、ノードがステーキングポート \(`9651` デフォルト\)で TCP トラフィックを受信して送信できるようにし、`コマンドライン引数 --public-ip=[YOUR NODE'S PUBLIC IP ここでは]` を使用してノードを起動してください。これらいずれかを行うことができなかった場合、あなたのステーキング報酬を危険にさらす可能性があります。

## Avalanche Wallet によるバリデーターの追加

まず、[Avalanche Wallet](https://wallet.avax.network)を使用して、ノードをバリデータとして追加する方法を紹介します。

[`info.getNodeID`](https://avalanche.gitbook.io/avalanche/build/apis/info-api#info-getnodeid)を呼び出してノードのIDを取得します。

![getNodeID ポストマーン](../../../.gitbook/assets/getNodeID-postman.png)

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

レスポンスにはノードのIDがあります:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "nodeID": "NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD"
    },
    "id": 1
}
```

[ウォレット](https://wallet.avax.network/)を開き、`[獲得`]タブを開きます。[`バリデータの追加]`を選択します。

![Webウォレットの獲得タブ](../../../.gitbook/assets/web-wallet-earn-tab.png)

Staking パラメーターを入力します。これらは以下で詳しく説明されています。すべてのステーキングパラメーターを入力し、それらをダブルチェックしたら、[`確認`]をクリックします。ステーキング期間が2週間以上、委任手数料率が2%以上、AVAXが2,000以上あることを確認してください。

--/../../learn/platform-overview/staking.md" %}

![JavaScriptを有効にします。](../../../.gitbook/assets/earn-validate.png)

この成功メッセージが表示され、残高が更新されるはずです。

![JavaScriptのJavaScriptを有効にします。](../../../.gitbook/assets/your-validation-transaction-is-sent.png)

[`platform.getPendingValidators`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-getpendingvalidators)を呼び出すと、トランザクションが受け入れられたことを確認します。

![getPendingValidators postman](../../../.gitbook/assets/getPendingValidators-postman.png)

`[`報酬]タブに戻り、[`報酬]`をクリックします。

![獲得、検証、委任](../../../.gitbook/assets/earn-validate-delegate.png)

バリデータの開始時間が経過すると、その結果得られるリワード、およびその開始時間、終了時間、およびその過ぎたバリデーション期間の割合が表示されます。

![推定報酬](../../../.gitbook/assets/estimated-rewards.png)

それでいい！

## APIコールでバリデータを追加する

また、ノードにAPIコールを作成することにより、バリデーターにノードを追加することもできます。Primary Networkを追加するには、[`platform.addValidator`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-addvalidator)を呼び出します。

このメソッドのシグネチャーは次のとおりです:

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

これらの引数を調べてみましょう。

`nodeID`

これは、バリデータのノードIDです。ノードのIDを取得するには、[`info.getNodeID`](https://avalanche.gitbook.io/avalanche/build/apis/info-api#info-getnodeid)を呼び出します。

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "info.getNodeID",
    "params":{},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

レスポンスにはノードのIDがあります:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "nodeID": "NodeID-LMUue2dBBRWdDbPL4Yx47Ps31noeewJji"
    },
    "id": 1
}
```

`startTime` と `endTime`

トランザクションをPrimary Networkに参加する際に、トランザクションが \(stop validating validating\) と入力する時間を指定し、 \(stop validating validating) を残します。\) プライマリネットワークを検証できる最小期間は24時間、最大期間は1年です。1つは、Primary Networkを再度入力できます。_連続_期間は最大1年です。`startTime`と`endTime`は、それぞれPrimary Networkのバリデーションを始め、validatorが停止するUNIXの時間です。`startTime`は、トランザクションが発行される時間と比較して将来的である必要があります。

`stakeAmount`

Primary Networkを検証するには、AVAXを出力する必要があります。このパラメーターはAVAXのステークした量を定義します。

`rewardAddress`

Primary Networkの検証を停止すると、Primary Networkの検証中に十分な反応があり正しい場合、報酬を受け取ります。これらのトークンは`rewardAddress`に送られます。元のステークは`、ユーザー名`で制御されたアドレスに戻ります。

バリデーターのステークは、動作に関係なくスラッシュされません。バリデーターは常にバリデーションが完了すると、ステークを返却します。

`changeAddr`

このトランザクションに起因する変更は、このアドレスに送信されます。このフィールドは空のままにできます。

`delegationFeeRate-JP`

Avalancheは、利害関係の代表団を許可しています。このパラメータは、他の人がステークを委任したときにこのバリデータが請求するパーセント料金です。例えば、`delegationFeeRate`が`1.2345`で、誰かがこのバリデータに委任した場合、そのデリゲート期間が終わると、1.2345%の報酬がバリデータに渡り、残りはデリゲータに委任されます。

`ユーザー名`と`パスワード`

これらのパラメーターは、トランザクション手数料を支払うユーザーのユーザー名とパスワードであり、ステーク状態のAVAXを提供し、誰にステーク状態のAVAXが返されます。

さて、トランザクションを発行しましょう。シェルコマンド`の日付`を使って、将来のUNIX時間を10分と30日間計算して、それぞれ`startTime`と`endTime`の値として使用します。\(Note: Mac 上で動作している場合は、`$(date` を `$(gdate`) に置き換えます。`gdate` がインストールされていない場合は、`coreutils を brew installします。`\) この例では、2,000 AVAX \(2 x 1012 nAVAX\)を賭けています。

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

レスポンスにはトランザクションIDと変更したアドレスが含まれています。

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

[`platform.getTxStatus`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-gettxstatus) を呼び出すことでトランザクションのステータスを確認できます:

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

ステータスは`Committed`(コミット)で、トランザクションが成功したことを意味します。[`platform.getPendingValidators`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-getpendingvalidators) を呼び出すことができます。そして、ノードがPrimary Networkの保留中のバリデーターに設定されていることを確認できます。

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

レスポンスには、私たちが追加したノードが含まれています:

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

`1584021450`に到達すると、このノードはPrimary Networkの検証を開始します。`1584121156`に達すると、このノードはPrimary Networkの検証を停止します。ステークレスAVAXは`ユーザー名`で制御されたアドレスに返却され、報酬は`rewardAddress`に与えられます。

## JavaScript-JP-JP-

### Subnet Validatorトランザクションの発行

さて、同じノードをサブネットに追加しましょう。[Subnetの作成についてこのチュートリアルを](https://avalanche.gitbook.io/avalanche/build/tutorials/platform/create-a-subnet)行った場合、以下はより意味がありません。今では、Avalanche Walletではなく、APIコールでサブネットにバリデータを追加することができます。

Subnet に ID `nTd2Q2nTLp8M9qv2VKHMdvYhtNWX7aTPa4SMEK7x7yJHbcWvr`, threshold 2 があり、その`ユーザー名`は少なくとも 2 つの制御キーを保持しているとします。

バリデータを追加するには、APIメソッド[`platform.addSubnetValidator`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-addsubnetvalidator)を呼び出します。JavaScript-JP-JP-

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

パラメーターを調べてみましょう:

`nodeID`

これは、サブネットに追加されるバリデータのノードIDです。**このバリデータは、このサブネットを検証する期間全体の Primary Network を検証する必要があります。**

`subnetID`

これは、バリデータを追加するサブネットのIDです。

`startTime` と `endTime`

`startTime``` は、バリデータがサブネットの検証を停止する Unix 時間です。

`JP-JP-`

これはコンセンサスのバリデーターのサンプリング重量です。バリデーターの重みが1で、サブネット内のすべてのバリデーターの累積重量が100である場合、このバリデーターはコンセンサス中100サンプルごとに1に含まれます。サブネット内のすべてのバリデーターの累積重量は、少なくとも`雪-サンプルサイズ`でなければなりません。例えば、サブネットにバリデータが1つしかない場合、その重みは少なくとも`snow-sample-size` \(default 20\)でなければなりません。バリデーターのウェイトは、バリデーターのウェイトを変更できないことを思い出してください。

`changeAddr`

このトランザクションに起因する変更は、このアドレスに送信されます。このフィールドは空のままにできます。

`ユーザー名`と`パスワード`

これらのパラメーターは、トランザクション手数料を支払うユーザーのユーザー名とパスワードです。このユーザーは、このSubnetにバリデータを追加するには、このSubnetのコントロールキーを十分に保持する必要があります。

シェルコマンド`の日付`を使って、将来のUNIX時間を10分と30日間計算して、それぞれ`startTime`と`endTime`の値として使用します。\(Note: Mac 上で動作している場合は、`$(date` を `$(gdate`) に置き換えます。`gdate` がインストールされていない場合は、`coreutils を brew installします。`\)

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

レスポンスにはトランザクションIDと変更したアドレスが含まれています。

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

[`platform.getTxStatus`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-gettxstatus) を呼び出すことでトランザクションのステータスを確認できます:

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

ステータスは`Committed`(コミット)で、トランザクションが成功したことを意味します。[`platform.getPendingValidators`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-getpendingvalidators) を呼び出すことができ、ノードがPrimary Networkの保留中のバリデーターに設定されていることを確認できます。今回はサブネットIDを指定します:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {"subnetID":"nTd2Q2nTLp8M9qv2VKHMdvYhtNWX7aTPa4SMEK7x7yJHbcWvr"},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

レスポンスには、私たちが追加したノードが含まれています:

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

`1584042912`に到達すると、このノードはこのサブネットの検証を開始します。`1584121156`に達すると、このノードはこのSubnetの検証を停止します。

### サブネットのホワイトリスト

ノードがサブネットのバリデータとして追加されたので、サブネットのホワイトリストに追加しましょう。Whitelist は、ノードがサブネットを意図せずに検証することを防ぎます。

サブネットをホワイトリスト化するには、ノードを再起動し、`--whitelisted-subnets` パラメーターをホワイトリストに追加します。

JavaScript-JP-JP-

`JavaScript-JP-JP-`

