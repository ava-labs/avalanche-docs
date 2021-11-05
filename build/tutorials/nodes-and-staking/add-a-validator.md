# バリデーターセットにノードを追加する

## はじめに

[一次ネットワーク](https://avalanche.gitbook.io/avalanche/build/tutorials/platform/add-a-validator#introduction)は、Avalancheプラットフォームに固有のもので、Avalancheの[組み込みブロックチェーン](https://avalanche.gitbook.io/avalanche/learn/platform-overview)を検証します。このチュートリアルでは、一次ネットワークにノードを追加し、Avalanche上で[サブネット](https://avalanche.gitbook.io/avalanche/learn/platform-overview#subnets)を追加します。

P-Chainは、Avalanche上でメタデータを管理します。これには、どのノードがどのサブネットにあるか、どのブロックチェーンが存在するか、どのサブネットがどのブロックチェーンを検証しているかの追跡が含まれます。バリデーターを追加するには、P-Chainに[トランザクション](http://support.avalabs.org/en/articles/4587384-what-is-a-transaction)を発行します。

{% hint style="danger" %}いったんトランザクションを発行し、ノードをバリデーターとして追加してしまうと、パラメータを変更する方法はないということに注意してください。**ステークを早期に削除したり、ステーク額、ノードID、報酬アドレスを変更したりすることはできません。**以下のAPIコールで正しい値を設定していることを確認してください。よくわからない場合は、[開発者向けのよくある質問](http://support.avalabs.org/en/collections/2618154-developer-faq)を参照するか、[Discord](https://chat.avalabs.org/)でヘルプを求めてください。{% endhint %}

## 要件

[Run an Avalanche Node1（Avalancheノードを実行する）](run-avalanche-node.md)を修了したので、[Avalancheのアーキテクチャ](../../../learn/platform-overview/)をよく理解されていると思います。このチュートリアルでは、[AvalancheのPostmanコレクション](https://github.com/ava-labs/avalanche-postman-collection)を使用して、API呼び出しに役立てようと思います。

ノードが正しく接続されていることを確認するには、ノードがステーキングポート（デフォルトは`9651`）でTCPを受信し、コマンドライン引数でノードを起動したことを確認してください`--public-ip=[YOUR NODE'S PUBLIC IP HERE]`。これらを行わないと、ステーキング報酬を損なう可能性があります。

## Avalancheウォレットでバリデーターを追加する

まず、[Avalancheウォレット](https://wallet.avax.network)を使用し、ノードをバリデーターとして追加する方法を説明します。

[`info.getNodeID`](https://avalanche.gitbook.io/avalanche/build/apis/info-api#info-getnodeid)呼び出しでノードのIDを取得します。

![getNodeIDポストマン](../../../.gitbook/assets/getNodeID-postman.png)

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

レスポンスには、ノードのIDがあります。

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "nodeID": "NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD"
    },
    "id": 1
}
```

[ウォレット](https://wallet.avax.network/)を開き、`Earn`タブに移動します。(3`Add Validator`)を選択します。

![ウェブウォレット獲得タブ](../../../.gitbook/assets/web-wallet-earn-tab.png)

ステーキングパラメータを入力します。これらは、次でさらに詳細に説明します。すべてのステーキングパラメータを入力し、それらをダブルチェックしたら、`Confirm`をクリックします。ステーキング期間が少なくとも2週間で、デリゲート手数料率が2%、そして最低2,000AVAXをステーキングしていることを確認します。

{% page-ref page="../../../learn/platform-overview/staking.md" %}

![検証を獲得](../../../.gitbook/assets/earn-validate.png)

この成功メッセージが表示され、残高が更新されるはずです。

![検証トランザクションが送信されます。](../../../.gitbook/assets/your-validation-transaction-is-sent.png)

[`platform.getPendingValidators`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-getpendingvalidators)呼び出しで、トランザクションが承認されたことを確認します。

![getPendingValidatorsポストマン](../../../.gitbook/assets/getPendingValidators-postman.png)

(`Earn`タブに戻り、`Estimated Rewards`をクリックします。

![獲得、検証、デリゲート](../../../.gitbook/assets/earn-validate-delegate.png)

バリデータの起動時間を経過すると、獲得するリワードと、その起動時間、終了時間、経過した検証期間の割合が表示されます。

![推定リワード](../../../.gitbook/assets/estimated-rewards.png)

完了です。

## API呼び出しでバリデーターを追加する

また、ノードにAPI呼び出しを呼び出し、バリデーターセットにノードを追加することもできます。ノードを一次ネットワークに追加するには、[`platform.addValidator`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-addvalidator)を呼び出します。

このメソッドの署名は次の通りです。

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

これらの引数を調べましょう。

`nodeID`

これは、追加されるバリデーターのノードIDです。ノードのIDを取得するには、[`info.getNodeID`](https://avalanche.gitbook.io/avalanche/build/apis/info-api#info-getnodeid)を呼び出します。

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "info.getNodeID",
    "params":{},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

レスポンスには、ノードのIDがあります。

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

一次ネットワークに参加するためのトランザクションを発行する際には、参加（バリデーションの開始）と退出（バリデーションの停止）の時間を指定します。一次ネットワークを検証できる最小期間は24時間で、最大期間は1年です。一旦退出しても、再び一次ネットワークに入ることができます。連続的な最大_継続_時間は1年です。  `startTime`と`endTime`はそれぞれ、バリデーターが一次ネットワークを起動し、検証を停止するUnix時間です。 `startTime`は、トランザクションが発行された時点から見て未来のことでなければなりません。

`stakeAmount`

一次ネットワークを検証するには、AVAXをステークする必要があります。このパラメーターは、ステークされたAVAXの数を定義します。

`rewardAddress`

バリデーターが一次ネットワークの検証を停止すると、一次ネットワークの検証中に十分にレスポンスし、正しい場合にリワードが受けられます。これらのトークンは`rewardAddress`に送信されます。元のステークは、`username`で管理されるアドレスに送信されます。

バリデーターのステークは、行動にかかわらず、決してスラッシュされません。検証が完了すると、常にステークを受信します。

`changeAddr`

このトランザクションに起因する変更は、このアドレスに送信されます。このフィールドを空のままにすることができます。そうすると、ユーザーが管理するアドレスのいずれかに変更が送信されます。

`delegationFeeRate`

Avalancheにより、ステークのデリゲートが可能になります。このパラメータは、他の人がステークにデリゲートする際に、このバリデーターに請求する割合です。例えば、`delegationFeeRate`が`1.2345`で、誰かがこのバリデーターをデリゲートする場合、デリゲート期間が終了すると、リワードの1.2345%がバリデーターに、残りはデリゲートした者に移動します。

`username`と`password`

これらのパラメータは、トランザクション手数料を支払うユーザーのユーザー名とパスワードです。これらは、ステークされたAVAXを提供し、ステークされたAVAXが返される人に提供します。

では、トランザクションを発行しましょう。シェルコマンド`date`を使用して、10分後と30日後のUnix時間を計算し、`startTime`と`endTime`それぞれの値として使用することができます。（注意：Macを使用している場合、`$(date`を`$(gdate`に置き換えてください。`gdate`がインストールされていない場合は、`brew install coreutils`を実行します。)この例では、2,000AVAXをステークします（2 x 1012 nAVAX）。

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

レスポンスには、トランザクションIDと、変更が行われたアドレスがあります。

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

[`platform.getTxStatus`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-gettxstatus)呼び出しでトランザクションのステータスを確認することができます。

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

ステータスは、`Committed`でなければなりません。つまり、トランザクションが成功したことを意味します。[`platform.getPendingValidators`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-getpendingvalidators)を呼び出して、ノードが、一次ネットワークの保留中のバリデーターセットにいることを確認することができます。

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

レスポンスには、先ほど追加されたノードが含まれます。

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

時間になると`1584021450`、このノードは、一次ネットワークの検証を開始します`1584121156`に達すると、このノードは、一次ネットワークの検証を停止します。ステークされたAVAXは、`username`で管理されるアドレスに返されます。そして、リワードがある場合、`rewardAddress`に与えられます。

## サブネットにバリデータを追加する

この[チュートリアル](../platform/create-a-subnet.md#adding-subnet-validators)では、サブネットにバリデータ－を追加する方法を説明します。