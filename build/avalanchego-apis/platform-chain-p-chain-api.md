# プラットフォームチェーン（P-Chain）API

このAPIにより、Avalancheの[バリデータセット](../../learn/platform-overview/staking.md#validators)を維持し、ブロックチェーン作成を処理する[P-Chain](../../learn/platform-overview/#platform-chain-p-chain)とやり取りできるようになります。

## エンドポイント

```cpp
/ext/P
```

## フォーマット

このAPIは、`json 2.0`RPC形式を使用します。

## メソッド

### platform.addDelegator

プライマリネットワークにデリゲータを追加します。

AVAXをステークし、バリデータ（デリゲート）を指定します。デリゲートは、他のバリデータ（重量）によりサンプリングされる確率が高まります。

デリゲーターは、デリゲーターに手数料を請求します。ステークを委任した取引には手数料は発生しません。

デリゲートがプライマリネットワークを検証する期間の一部でなければなりません。

トランザクションを発行してデリゲータとしてノードを追加する場合、パラメータを変更する方法は存在しないことに注意してください。**早期にステークを削除したり、ステーク額、ノードID、リワードアドレスを変更することはできません。**正しい値を使用していることを確認してください。確かでない場合、開発[者に関するFAQ](https://support.avalabs.org/en/collections/2618154-developer-faq)をチェックするか、[Discord](https://chat.avalabs.org/)でヘルプを求めることもあります。

{% page-ref page="../../learn/platform-overview/staking.md" %}

#### **シグネチャ**

```cpp
platform.addDelegator(
    {
        nodeID: string,
        startTime: int,
        endTime: int,
        stakeAmount: int,
        rewardAddress: string,
        from: []string, //optional
        changeAddr: string, //optional
        username: string,
        password: string
    }
) ->
{
    txID: string,
    changeAddr: string
}
```

* `nodeID`は、委任するノードのIDです。
* `startTime`は、デリゲーターがデリゲーターを始めるUnix時間です。
* `endTime`代表者がデリゲーターの停止（ステークされたAVAXが返される）までのUnix時間です。
* `stakeAmount`代表者がステーキングするnAVAX数です。
* `rewardAddress`isが
* `from`は、この操作に使用するアドレスです。省略した場合、必要に応じてあなたのアドレスを使用します。
* `changeAddr`変更があった場合は、アドレス省略した場合、変更はユーザーがコントロールするアドレスのひとつに送信されます。
* `username`は、トランザクション手数料を支払うユーザーです。
* `password`は、`username`パスワード
* `txID`トランザクションID

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.addDelegator",
    "params": {
        "nodeID":"NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ",
        "rewardAddress":"P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy",
        "startTime":1594102400,
        "endTime":1604102400,
        "stakeAmount":100000,
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "6pB3MtHUNogeHapZqMUBmx6N38ii3LzytVDrXuMovwKQFTZLs",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

### platform.addValidator

プライマリネットワークにバリデータを追加します。これを行うには、AVAXをステークしなければなりません。バリデーション中に十分に正しくレスポンシブなノードが場合、ステーキング期間の終了に達したときにリワードを受け取ります。コンセンサス中に他のバリデータによってサンプリングされる確率は、AVAXステークされた数に比例します。

バリデータは、デリゲータに手数料がかかります。以前の者は、デリゲータにバリデーション報酬の割合を受け取ります。（もしあれば）最低限の委任手数料は2%です。バリデータを追加するトランザクションには手数料はありません。

バリデーション期間は、2週間から1年でなければなりません。

バリデータに課される最大合計重量が存在します。つまり、バリデータは、AVAXがステークされ、この値より多くのAVAXが委任されることはないということを意味します。この値は、最初に . に設定されます`min(5 * amount staked, 3M AVAX)`。バリデータ上の合計額は、300万AVAXです。

バリデータとしてノードを追加するトランザクションを発行した後、パラメーターを変更する方法は存在しないことに注意してください。**早期にステークを削除したり、ステーク額、ノードID、リワードアドレスを変更することはできません。**正しい値を使用していることを確認してください。確かでない場合、開発[者に関するFAQ](https://support.avalabs.org/en/collections/2618154-developer-faq)をチェックするか、[Discord](https://chat.avalabs.org/)でヘルプを求めることもあります。

{% page-ref page="../../learn/platform-overview/staking.md" %}

#### **シグネチャ**

```cpp
platform.addValidator(
    {
        nodeID: string,
        startTime: int,
        endTime: int,
        stakeAmount: int,
        rewardAddress: string,
        delegationFeeRate: float,
        from: []string, //optional
        changeAddr: string, //optional
        username: string,
        password: string
    }
) ->
{
    txID: string,
    changeAddr: string
}
```

* `nodeID`is is is as 追加されるバリデーターのノードIDです。
* `startTime`isiss is is imprimary Networkのバリデータが始まるUnix時間。
* `endTime`isisは、バリデータがプライマリネットワークのバリデータを停止する（ステークされたAVAXが返される）ときのUnix時間です。
* `stakeAmount`バリデータがステーキングされているnAVAX数です。
* `rewardAddress`万が一の場合、バリデータ報酬が行われるアドレスです。
* `delegationFeeRate`他の人がステークを委任する際に、このバリデータが請求するパーセント手数料です。小数点数は4まで許可されています。追加の小数点以下の場所は無視されます。0から100でなければなりません。`delegationFeeRate`例えば、もしis`1.2345`で、このバリデータに委任します。その後、デリゲート期間が終わると、報酬の1.2345%がバリデータになります。
* `from`は、この操作に使用するアドレスです。省略した場合、必要に応じてあなたのアドレスを使用します。
* `changeAddr`変更があった場合は、アドレス省略した場合、変更はユーザーがコントロールするアドレスのひとつに送信されます。
* `username`は、トランザクション手数料を支払うユーザーです。
* `password`は、`username`パスワード
* `txID`トランザクションID

#### **コール例**

この例では、シェルコマンドを使用して、Unixを10分と2日間の時間計算`date`します。（注意：あなたがMac上で使用されている場合は、 .`$(date`に置き換える`$(gdate`インストールが完了しない場合は`gdate`、`brew install coreutils`.\)

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.addValidator",
    "params": {
        "nodeID":"NodeID-ARCLrphAHZ28xZEBfUL7SVAmzkTZNe1LK",
        "rewardAddress":"P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy",
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "startTime":'$(date --date="10 minutes" +%s)',
        "endTime":'$(date --date="2 days" +%s)',
        "stakeAmount":1000000,
        "delegationFeeRate":10,
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **例**

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

### platform.addSubnetValidator

プライマリネットワーク以外のサブネットにバリデータを追加します。バリデータは、このサブネットをバリデートする期間中に、プライマリネットワークのバリデーションをする必要があります。

#### **シグネチャ**

```cpp
platform.addSubnetValidator(
    {
        nodeID: string,
        subnetID: string,
        startTime: int,
        endTime: int,
        weight: int,
        from: []string, //optional
        changeAddr: string, //optional
        username: string,
        password: string
    }
) ->
{
    txID: string,
    changeAddr: string,
}
```

* `nodeID`iss バリデータのノードID。
* `subnetID`は、バリデーションするサブネット
* `startTime`iss is is used inside the バリデータがサブネットのバリデータを開始する時点の unix時間。
* `endTime`iss is is used in バリデータがサブネットのバリデータを停止する時のunix時間。
* `weight`サンプリングに使用されるバリデータウェイトです。
* `from`は、この操作に使用するアドレスです。省略した場合、必要に応じてあなたのアドレスを使用します。
* `changeAddr`変更があった場合は、アドレス省略した場合、変更はユーザーがコントロールするアドレスのひとつに送信されます。
* `username`は、トランザクション手数料を支払うユーザーです。
* `password`は、`username`パスワード
* `txID`トランザクションID

#### **例**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.addSubnetvalidator",
    "params": {
        "nodeID":"NodeID-7xhw2mdxuds44j42tcb6u5579esbst3lg",
        "subnetID":"zbfoww1ffkpvrfywpj1cvqrfnyesepdfc61hmu2n9jnghduel",
        "startTime":1583524047,
        "endTime":1604102399,
        "weight":1,
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **例**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID": "2exafyvRNSE5ehwjhafBVt6CTntot7DFjsZNcZ54GSxBbVLcCm",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    }
}
```

### platform.createAddress

指定されたユーザーによってコントロールされる新しいアドレスを作成します。

#### **シグネチャ**

```cpp
platform.createAddress({
    username: string,
    password: string
}) -> {address: string}
```

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createAddress",
    "params": {
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "P-avax12lqey27sfujqq6mc5a3jr5av56cjsu8hg2d3hx"
    },
    "id": 1
}
```

### platform.create

新しいブロックチェーンを作成します。現在、AVMとTimestamp VMの新しいインスタンス作成のみをサポートします。

#### **シグネチャ**

```cpp
platform.createBlockchain(
    {
        subnetID: string,
        vmID: string,
        name: string,
        genesisData: string,
        encoding: string, //optional
        from: []string, //optional
        changeAddr: string, //optional
        username: string,
        password: string
    }
) ->
{
    txID: string,
    changeAddr: string
}
```

* `subnetID`iss は、新しいブロックチェーンを検証するSubnetのIDです。サブネットは存在しなければなりません。
* `vmID`ブロックチェーンが実行するバーチャルマシンのIDです。バーチャルマシンの別名でもできます。
* `name`これは、新しいブロックチェーンの人間が読みやすい名前です。必ずしも一意ではない。
* `genesisData`パラメータで指定された形式でエンコードされた新しいブロックチェーンのジェネシスステートのバイト表示です`encoding`。
* `encoding`.のために使用するフォーマットを指定します`genesisData`「cb58」あるいは「六角」のいずれかでできます。デフォルトは、「cb58」になります。バーチャルマシンには、生成に使用できる静的なAPIメソッドという必要があります`buildGenesis`。`genesisData`
* `from`は、この操作に使用するアドレスです。省略した場合、必要に応じてあなたのアドレスを使用します。
* `changeAddr`変更があった場合は、アドレス省略した場合、変更はユーザーがコントロールするアドレスのひとつに送信されます。
* `username`は、トランザクション手数料を支払うユーザーです。このユーザーは、サブネットのコントロールキーが十分に存在する必要があります。
* `password`は、`username`パスワード
* `txID`トランザクションID

#### **コール例**

`genesisData`この例では、タイムスタンプバーチャルマシンが新しいインスタンスを作成します。 .`timestamp.buildGenesis`

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createBlockchain",
    "params" : {
        "vmID":"timestamp",
        "subnetID":"2bRCr6B4MiEfSjidDwxDpdCyviwnfUVqB2HGwhm947w9YYqb7r",
        "name":"My new timestamp",
        "genesisData": "45oj4CqFViNHUtBxJ55TZfqaVAXFwMRMj2XkHVqUYjJYoTaEM",
        "encoding": "cb58",
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2TBnyFmST7TirNm6Y6z4863zusRVpWi5Cj1sKS9bXTUmu8GfeU",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

### platform.createSubnet

新しいサブネットを作成します。

サブネットのIDは、このトランザクションのIDと同じです。

#### **シグネチャ**

```cpp
platform.createSubnet(
    {
        controlKeys: []string,
        threshold: int,
        from: []string, //optional
        changeAddr: string, //optional
        username: string,
        password: string
    }
) ->
{
    txID: string,
    changeAddr: string
}
```

* このサブネットにバリデータを追加するため、以下のアドレスから`threshold`署名が必要です。`controlKeys`
* `from`は、この操作に使用するアドレスです。省略した場合、必要に応じてあなたのアドレスを使用します。
* `changeAddr`変更があった場合は、アドレス省略した場合、変更はユーザーがコントロールするアドレスのひとつに送信されます。
* `username`は、トランザクション手数料を支払うユーザーです。
* `password`は、`username`パスワード

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createSubnet",
    "params": {
        "controlKeys":[
            "P-avax13xqjvp8r2entvw5m29jxxjhmp3hh6lz8laep9m",
            "P-avax165mp4efnel8rkdeqe5ztggspmw4v40j7pfjlhu"
        ],
        "threshold":2,
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "hJfC5xGhtjhCGBh1JWn3vZ51KJP696TZrsbadPHNbQG2Ve5yd"
    },
    "id": 1
}
```

### platform.exportAVAX

P-Chain上のアドレスからX-Chain上のアドレスにAVAXを送信します。このトランザクションを発行した後、X-Chainの[`avm.importAVAX`](exchange-chain-x-chain-api.md#avm-importavax)メソッドを呼び出して、振り込みが完了する必要があります。

#### **シグネチャ**

```cpp
platform.exportAVAX(
    {
        amount: int,
        from: []string, //optional
        to: string,
        changeAddr: string, //optional
        username: string,
        password: string
    }
) ->
{
    txID: string,
    changeAddr: string
}
```

* `amount`issimplyは、送信するnAVAX額です。
* `to`AVAXを送信するためのX-Chain上のアドレス
* `from`は、この操作に使用するアドレスです。省略した場合、必要に応じてあなたのアドレスを使用します。
* `changeAddr`変更があった場合は、アドレス省略した場合、変更はユーザーがコントロールするアドレスのひとつに送信されます。
* `username`AVAXを送信し、取引手数料を支払うユーザーです。
* `password`は、`username`パスワード
* `txID`iss は、このトランザクションのIDです。

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.exportAVAX",
    "params": {
        "to":"X-avax1yv8cwj9kq3527feemtmh5gkvezna5xys08mxet",
        "amount":1,
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2Kz69TNBSeABuaVjKa6ZJCTLobbe5xo9c5eU8QwdUSvPo2dBk3",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

### platform.exportKey

指定されたアドレスをコントロールする秘密鍵を取得します。  返却された秘密鍵は、. でユーザーに追加することができます[`platform.importKey`](platform-chain-p-chain-api.md#platform-importkey)。

#### **シグネチャ**

```cpp
platform.exportKey({
    username: string,
    password: string,
    address: string
}) -> {privateKey: string}
```

* `username`は、コントロールするユーザです。`address`
* `password`は、`username`パスワード
* `privateKey`コントロールする秘密鍵の文字列表現`address`

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.exportKey",
    "params" :{
        "username" :"myUsername",
        "password": "myPassword",
        "address": "P-avax1zwp96clwehpwm57r9ftzdm7rnuslrunj68ua3r"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **例**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "privateKey":"PrivateKey-Lf49kAJw3CbaL783vmbeAJvhscJqC7vi5yBYLxw2XfbzNS5RS"
    }
}
```

### platform.getBalance

指定されたアドレスでAVAXの残高を取得します。

#### **シグネチャ**

```cpp
platform.getBalance({
    address:string
}) -> {
    balance: string,
    unlocked: string,
    lockedStakeable: string,
    lockedNotStakeable: string,
    utxoIDs: []{
        txID: string,
        outputIndex: int
    }
}
```

* `address`は、バランスが得られるアドレス。
* `balance`は、nAVAXで合計バランスです。
* `unlocked`は、nAVAXでアンロックされたバランスです。
* `lockedStakeable`これは、nAVAXでロックされたステーク可能なバランスです。
* `lockedNotStakeable`nAVAXでロックされ、ステーク可能なバランスではありません。
* `utxoIDs`は、参照するUTXOのIDです。`address`

#### **コール例**

```cpp
curl -X POST --data '{
  "jsonrpc":"2.0",
  "id"     : 1,
  "method" :"platform.getBalance",
  "params" :{
      "address":"P-avax1m8wnvtqvthsxxlrrsu3f43kf9wgch5tyfx4nmf"
  }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "balance": "20000000000000000",
        "unlocked": "10000000000000000",
        "lockedStakeable": "10000000000000000",
        "lockedNotStakeable": "0",
        "utxoIDs": [
            {
                "txID": "11111111111111111111111111111111LpoYY",
                "outputIndex": 1
            },
            {
                "txID": "11111111111111111111111111111111LpoYY",
                "outputIndex": 0
            }
        ]
    },
    "id": 1
}
```

### platform.getBlockchains

（P-Chainを除く）存在するすべてのブロックチェーンを取得します。

#### **シグネチャ**

```cpp
platform.getBlockchains() ->
{
    blockchains: []{
        id: string,
        name:string,
        subnetID: string,
        vmID: string
    }
}
```

* `blockchains`Avalancheネットワーク上に存在するブロックチェーンすべてです。
* `name`このブロックチェーンの人間が読みやすい名前です。
* `id`ブロックチェーンのIDです。
* `subnetID`iss は、このブロックチェーンを検証するサブネットのIDです。
* `vmID`ブロックチェーンが実行するバーチャルマシンのIDです。

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getBlockchains",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "blockchains": [
            {
                "id": "2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM",
                "name": "X-Chain",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "jvYyfQTxGMJLuGWa55kdP2p2zSUYsQ5Raupu4TW34ZAUBAbtq"
            },
            {
                "id": "2q9e4r6Mu3U68nU1fYjgbR6JvwrRx36CohpAX5UQxse55x1Q5",
                "name": "C-Chain",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "mgj786NP7uDwBCcq6YwThhaN8FLyybkCa4zBWTQbNgmK6k9A6"
            },
            {
                "id": "CqhF97NNugqYLiGaQJ2xckfmkEr8uNeGG5TQbyGcgnZ5ahQwa",
                "name": "Simple DAG Payments",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "sqjdyTKUSrQs1YmKDTUbdUhdstSdtRTGRbUn8sqK8B6pkZkz1"
            },
            {
                "id": "VcqKNBJsYanhVFxGyQE5CyNVYxL3ZFD7cnKptKWeVikJKQkjv",
                "name": "Simple Chain Payments",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "sqjchUjzDqDfBPGjfQq2tXW1UCwZTyvzAWHsNzF2cb1eVHt6w"
            },
            {
                "id": "2SMYrx4Dj6QqCEA3WjnUTYEFSnpqVTwyV3GPNgQqQZbBbFgoJX",
                "name": "Simple Timestamp Server",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH"
            },
            {
                "id": "KDYHHKjM4yTJTT8H8qPs5KXzE6gQH5TZrmP1qVr1P6qECj3XN",
                "name": "My new timestamp",
                "subnetID": "2bRCr6B4MiEfSjidDwxDpdCyviwnfUVqB2HGwhm947w9YYqb7r",
                "vmID": "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH"
            },
            {
                "id": "2TtHFqEAAJ6b33dromYMqfgavGPF3iCpdG3hwNMiart2aB5QHi",
                "name": "My new AVM",
                "subnetID": "2bRCr6B4MiEfSjidDwxDpdCyviwnfUVqB2HGwhm947w9YYqb7r",
                "vmID": "jvYyfQTxGMJLuGWa55kdP2p2zSUYsQ5Raupu4TW34ZAUBAbtq"
            }
        ]
    },
    "id": 1
}
```

### platform.getBlockchainStatus

ブロックチェーンのステータス取得。

#### **シグネチャ**

```cpp
platform.getBlockchainStatus(
    {
        blockchainID: string
    }
) -> {status: string}
```

`status`次のいずれかです：

* `Validating`：ブロックチェーンは、このノードで検証されています。
* `Created`：ブロックチェーンは存在しますが、このノードによって検証されることはありません。
* `Preferred`：ブロックチェーンは生成されるよう提案されましたが、生成される可能性が高いが、トランザクションはまだ受け入れられません。
* `Unknown`：ブロックチェーンは提案ではなく、作成する提案は好ましくありません。プロポーザル再提出することができます。

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getBlockchainStatus",
    "params":{
        "blockchainID":"2NbS4dwGaf2p1MaXb65PrkZdXRwmSX4ZzGnUu7jm3aykgThuZE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "status": "Created"
    },
    "id": 1
}
```

### platform.getCurrentSupply

存在するAVAX数上限を返します。トランザクション手数料を含むバーントトークンについてはアカウントしないため、これは上限です。

#### **シグネチャ**

```cpp
platform.getCurrentSupply() -> {supply: int}
```

* `supply`は、nAVAXで存在するAVAX数上限です。

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getCurrentSupply",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "supply": "365865167637779183"
    },
    "id": 1
}
```

この例で示す回答により、AVAXの供給は365.865万人以上であることを示します。

### platform.getCurrentValidators

指定されたSubnetの現在のバリデータをリストします。

トップレベルフィールドは、v1.0.1から[廃止と](deprecated-api-calls.md#getcurrentvalidators)`delegators`なり、v1.0.6で削除されました。代わりに、`validators`現在の各要素に、バリデータのためのデリゲーターのリストが含まれています。

#### **シグネチャ**

```cpp
platform.getCurrentValidators({
    subnetID: string, //optional
    nodeIDs: string[], //optional
}) -> {
    validators: []{
        txID: string,
        startTime: string,
        endTime: string,
        stakeAmount: string, //optional
        nodeID: string,
        weight: string, //optional
        rewardOwner: {
            locktime: string,
            threshold: string,
            addresses: string[]
        },
        potentialReward: string,
        delegationFee: string,
        uptime: string,
        connected: bool,
        delegators: []{
            txID: string,
            startTime: string,
            endTime: string,
            stakeAmount: string, //optional
            nodeID: string,
            rewardOwner: {
                locktime: string,
                threshold: string,
                addresses: string[]
            },
            potentialReward: string,
        }
    }
}
```

* `subnetID`は、現在のバリデータが返されるサブネット省略した場合、プライマリネットワークの現在のバリデータを返します。
* `nodeIDs`iss は、現在のバリデータが要求するノードIDのリストです。省略した場合、現在のバリデータはすべて返却されます。指定されたノードIDが、現在のバリデータセットに含まれない場合、レスポンスに含まれないことはありません。
* `validators`:
   * `txID`is バリデータトランザクション。
   * `startTime`iss is is iss is is simply the バリデータがSubnetのバリデーションを始めるUnix時間。
   * `endTime`issは、バリデータがSubnetのバリデータを停止するUnix時間です。
   * `stakeAmount`iss は、このバリデータがステークされたnAVAXの量です。`subnetID`プライマリネットワークでない場合、省略。
   * `nodeID`バリデーターのノードIDです。
   * `weight`サンプリング時にバリデータ重量です。プライマリネットワーク`subnetID`である場合、省略。
   * `rewardOwner`は、その`OutputOwners`出力`locktime``threshold`と、その配列を含む`addresses`
   * `potentialReward`ステーキングから獲得した潜在的な報酬
   * `delegationFeeRate`他の人がステークを委任する際に、このバリデータが請求するパーセント手数料です。
   * `uptime`isissis。クエリされたノードがオンラインとしてピアを報告した時点の%。
   * `connected`ノードがネットワークに接続されている場合
   * `delegators`このバリデータに委任者のリスト:
      * `txID`は、デリゲータトランザクションです。
      * `startTime`は、デリゲータが始まったUnix時間です。
      * `endTime`は、デリゲータが停止したUnix時間
      * `stakeAmount`このデリゲーターがステークされたnAVAXの数量です。`subnetID`プライマリネットワークでない場合、省略。
      * `nodeID`isバリデーションノードIDです。
      * `rewardOwner`は、その`OutputOwners`出力`locktime``threshold`と、その配列を含む`addresses`
      * `potentialReward`ステーキングから獲得した潜在的な報酬
* `delegators`: \(v1.0.1以降の**廃止です。メソッドドキュメントの上に記載されているノートをご覧ください。**）

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getCurrentValidators",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "validators": [
            {
                "txID": "2NNkpYTGfTFLSGXJcHtVv6drwVU2cczhmjK2uhvwDyxwsjzZMm",
                "startTime": "1600368632",
                "endTime": "1602960455",
                "stakeAmount": "2000000000000",
                "nodeID": "NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD",
                "rewardOwner": {
                    "locktime": "0",
                    "threshold": "1",
                    "addresses": [
                        "P-avax18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u"
                    ]
                },
                "potentialReward": "117431493426",
                "delegationFee": "10.0000",
                "uptime": "0.0000",
                "connected": false,
                "delegators": [
                    {
                        "txID": "Bbai8nzGVcyn2VmeYcbS74zfjJLjDacGNVuzuvAQkHn1uWfoV",
                        "startTime": "1600368523",
                        "endTime": "1602960342",
                        "stakeAmount": "25000000000",
                        "nodeID": "NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD",
                        "rewardOwner": {
                            "locktime": "0",
                            "threshold": "1",
                            "addresses": [
                                "P-avax18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u"
                            ]
                        },
                        "potentialReward": "11743144774"
                    }
                ]
            }
        ]
    },
    "id": 1
}
```

### platform.getHeight

最後に受け付けたブロックの高さを返します。

#### **シグネチャ**

```cpp
platform.getHeight() ->
{
    height: int,
}
```

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getHeight",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "height": "56"
    },
    "id": 1
}
```

### platform.getMinStake

プライマリネットワークのバリデーションに必要なAVAX最小量と、委任可能なAVAX最小量を取得します。

#### **シグネチャ**

```cpp
platform.getMinStake() ->
{
    minValidatorStake : uint64,
    minDelegatorStake : uint64
}
```

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getMinStake"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "minValidatorStake": "2000000000000",
        "minDelegatorStake": "25000000000"
    },
    "id": 1
}
```

### platform.getPendingバリデータ

指定されたSubnetのペンディングバリデータセットでバリデータをリストします。各バリデータは、現在、Subnetをバリデートするのではなく、将来的には

#### **シグネチャ**

```cpp
platform.getPendingValidators({
    subnetID: string, //optional
    nodeIDs: string[], //optional
}) -> {
    validators: []{
        txID: string,
        startTime: string,
        endTime: string,
        stakeAmount: string, //optional
        nodeID: string,
        delegationFee: string,
        connected: bool,
        weight: string, //optional
    },
    delegators: []{
        txID: string,
        startTime: string,
        endTime: string,
        stakeAmount: string,
        nodeID: string
    }
}
```

* `subnetID`は、現在のバリデータが返されるサブネット省略した場合、プライマリネットワークの現在のバリデータを返します。
* `nodeIDs`iss は、要求する保留中のバリデータが nodeID のリストです。省略した場合、すべてのペンディングバリデータが返されます。指定されたノードIDが、ペンディングバリデータセットに含まれない場合、レスポンスに含まれないことはありません。
* `validators`:
   * `txID`is バリデータトランザクション。
   * `startTime`iss is is iss is is simply the バリデータがSubnetのバリデーションを始めるUnix時間。
   * `endTime`issは、バリデータがSubnetのバリデータを停止するUnix時間です。
   * `stakeAmount`iss は、このバリデータがステークされたnAVAXの量です。`subnetID`プライマリネットワークでない場合、省略。
   * `nodeID`バリデーターのノードIDです。
   * `connected`ノードが接続されている場合
   * `weight`サンプリング時にバリデータ重量です。プライマリネットワーク`subnetID`である場合、省略。
* `delegators`:
   * `txID`は、デリゲータトランザクションです。
   * `startTime`は、デリゲータが始まるUnix時間です。
   * `endTime`は、デリゲータが停止したUnix時間
   * `stakeAmount`このデリゲーターがステークされたnAVAXの数量です。`subnetID`プライマリネットワークでない場合、省略。
   * `nodeID`isバリデーションノードIDです。

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "validators": [
            {
                "txID": "2NNkpYTGfTFLSGXJcHtVv6drwVU2cczhmjK2uhvwDyxwsjzZMm",
                "startTime": "1600368632",
                "endTime": "1602960455",
                "stakeAmount": "200000000000",
                "nodeID": "NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD",
                "delegationFee": "10.0000",
                "connected": false
            }
        ],
        "delegators": [
            {
                "txID": "Bbai8nzGVcyn2VmeYcbS74zfjJLjDacGNVuzuvAQkHn1uWfoV",
                "startTime": "1600368523",
                "endTime": "1602960342",
                "stakeAmount": "20000000000",
                "nodeID": "NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg"
            }
        ]
    },
    "id": 1
}
```

### platform.getRewardUTXO

提供されたトランザクションステーキングまたは委任期が終了した後に報酬を受け取ったUTXOを返します。

#### **シグネチャ**

```cpp
platform.getRewardUTXOs({
    txID: string,
    encoding: string //optional
}) -> {
    numFetched: integer,
    utxos: []string,
    encoding: string
}
```

* `txID`ステーキングあるいは委任されたトランザクションのIDです。
* `numFetched`は、UTXOsを返した数です。
* `utxos`は、エンコードされた報酬UTXOの配列です
* `encoding`返されたUTXOのフォーマットを指定します。「cb58」あるいは「六角」でデフォルト値は「cb58」です。

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getRewardUTXOs",
    "params": {
        "txID": "2nmH8LithVbdjaXsxVQCQfXtzN9hBbmebrsaEYnLM9T32Uy2Y5"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "numFetched": "2",
        "utxos": [
            "11Zf8cc55Qy1rVgy3t87MJVCSEu539whRSwpdbrtHS6oh5Hnwv1gz8G3BtLJ73MPspLkD83cygZufT4TPYZCmuxW5cRdPrVMbZAHfb6uyGM1jNGBhBiQAgQ6V1yceYf825g27TT6WU4bTdbniWdECDWdGdi84hdiqSJH2y",
            "11Zf8cc55Qy1rVgy3t87MJVCSEu539whRSwpdbrtHS6oh5Hnwv1NjNhqZnievVs2kBD9qTrayBYRs81emGTtmnu2wzqpLstbAPJDdVjf3kjwGWywNCdjV6TPGojVR5vHpJhBVRtHTQXR9VP9MBdHXge8zEBsQJAoZhTbr2"
        ],
        "encoding": "cb58"
    },
    "id": 1
}
```

### platform.getStakingAssetID

サブネットのステーキングアセットのためのアセットIDを取得します。現在、プライマリネットワークのステーキングアセットIDのみを返します。

#### **シグネチャ**

```cpp
platform.getStakingAssetID({
    subnetID: string //optional
}) -> {
    assetID: string
}
```

* `subnetID`iss は、アセットIDが要求されたサブネット
* `assetID`サブネットのステーキングアセットのためのアセットIDです。

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getStakingAssetID",
    "params": {
        "subnetID": "11111111111111111111111111111111LpoYY"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "assetID": "2fombhL7aGPwj3KH4bfrmJwW6PVnMobf9Y2fn9GwxiAAJyFDbe"
    },
    "id": 1
}
```

### platform.getSubnets

サブネットについての情報を入手します。

#### **シグネチャ**

```cpp
platform.getSubnets(
    {ids: []string}
) ->
{
    subnets: []{
        id: string,
        controlKeys: []string,
        threshold: string
    }
}
```

* `ids`まさに、サブネットのIDで、について情報を取得します。省略した場合、すべてのサブネットについての情報を取得します。
* `id`サブネットID
* `threshold`サブネットにバリデータを追加する必要が`controlKeys`ありません。

サブネットにバリデータを追加する詳細については[、ここ](../tutorials/nodes-and-staking/add-a-validator.md)を参照してください。

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getSubnets",
    "params": {"ids":["hW8Ma7dLMA7o4xmJf3AXBbo17bXzE7xnThUd3ypM4VAWo1sNJ"]},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "subnets": [
            {
                "id": "hW8Ma7dLMA7o4xmJf3AXBbo17bXzE7xnThUd3ypM4VAWo1sNJ",
                "controlKeys": [
                    "KNjXsaA1sZsaKCD1cd85YXauDuxshTes2",
                    "Aiz4eEt5xv9t4NCnAWaQJFNz5ABqLtJkR"
                ],
                "threshold": "2"
            }
        ]
    },
    "id": 1
}'
```

### platform.getStake

一連のアドレスでステークされたnAVAXの量を取得します。戻された金額は、ステーキング報酬は含まれません。

#### **シグネチャ**

```cpp
platform.getStake({addresses: []string}) -> {staked: int}
```

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getStake",
    "params": {
        "addresses": [
            "P-everest1g3ea9z5kmkzwnxp8vr8rpjh6lqw4r0ufec460d",
            "P-everest12un03rm579fewele99c4v53qnmymwu46dv3s5v"
        ]
    },
    "id": 1
}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "staked": "5000000"
    },
    "id": 1
}
```

### platform.getTotalStake

プライマリネットワーク上にステークされたnAVAX総額を取得します。

#### **シグネチャ**

```cpp
platform.getTotalStake() -> {stake: int}
```

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTotalStake",
    "params": {},
    "id": 1
}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "stake": "279825917679866811"
    },
    "id": 1
}
```

### platform.getTx

IDでトランザクションを取得します。

返されたトランザクションのフォーマットを指定する`encoding`オプションパラメータ。「cb58」あるいは「六角」のいずれかでできます。デフォルトは、「cb58」になります。

#### **シグネチャ**

```cpp
platform.getTx({
    txID: string,
    encoding: string //optional
}) -> {
    tx: string,
    encoding: string,
}
```

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTx",
    "params": {
        "txID":"TAG9Ns1sa723mZy1GSoGqWipK6Mvpaj7CAswVJGM6MkVJDF9Q",
        "encoding": "cb58"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "tx": "111117XV7Rm5EoKbwXFJp5WWWouAENJcF1zXGxPDPCfTbpiLfwkUXcoHKnfzdXz7sRgGYeaVtJkcD9MNgGuKGXsyWEWpTK2zAToEf64ezp7r7SyvyL7RqC5oqvNbRDShn5hm9pDV4JTCjZR5RzAxjBEJZ2V8eqtU6jvpsJMHxNBtCwL6Atc1t2Dt7s5nqf7wdbFUBvwKXppBb2Yps8wUvtTKQifssMUAPygc2Rv4rGd9LRANk4JTiT15qzUjXX7zSzz16pxdBXc4jp2Z2UJRWbdxZdaybL3mYCFj197bBnYieRYzRohaUEpEjGcohrmkSfHB8S2eD74o2r66sVGdpXYo95vkZeayQkrMRit6unwWBx8FJR7Sd7GysxS9A3CiMc8cL4oRmr7XyvcFCrnPbUZK7rnN1Gtq3MN8k4JVvX6DuiFAS7xe61jY3VKJAZM9Lg3BgU6TAU3gZ",
        "encoding": "cb58"
    },
    "id": 1
}
```

### platform.getTxStatus

IDでトランザクションステータスを取得します。トランザクションが削除された場合、トランザクションが削除された理由をより詳細な`reason`フィールドで応答が含まれます。

以前の行動に関するノートについては[、ここ](deprecated-api-calls.md#gettxstatus)を参照してください。

#### **シグネチャ**

```cpp
platform.getTxStatus({
    txID: string
}) -> {status: string}
```

`status`次のいずれかです：

* `Committed`：トランザクションは、すべてのノードで受け入れられる（あるいは受け入れられる）
* `Processing`：トランザクションは、このノードによって投票されます
* `Dropped`：トランザクションは、ネットワーク内のいかなるノードによって受け入れられないことはありません。より詳細な情報については、`reason`フィールドをチェックする
* `Unknown`：このノードではトランザクションは見ることができません。

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTxStatus",
    "params": {
        "txID":"TAG9Ns1sa723mZy1GSoGqWipK6Mvpaj7CAswVJGM6MkVJDF9Q"
   },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "status": "Committed"
    },
    "id": 1
}
```

### platform.getUTXO

指定されたアドレスセットを参照するUTXOを取得します。

#### **シグネチャ**

```cpp
platform.getUTXOs(
    {
        addresses: []string,
        limit: int, //optional
        startIndex: { //optional
            address: string,
            utxo: string
        },
        sourceChain: string, //optional
        encoding: string, //optional
    },
) ->
{
    numFetched: int,
    utxos: []string,
    endIndex: {
        address: string,
        utxo: string
    },
    encoding: string,
}
```

* `utxos`UTXOのリストにより、各UTXOが少なくとも1つのアドレスを参照する`addresses`
* ほとんどの`limit`UTXOは返却されます。`limit`省略された場合、1024を超える場合、1024に設定されます。
* この方法は、ページネーションを`endIndex`サポートします。`startIndex`次のUTXOセットを取得するには、次の呼び出し時にその値`endIndex`を使用してください。
* `startIndex`省略された場合、UTXOを最大限に取得します。`limit`
* （す`startIndex`なわち、提供時）ページネーションを使用する際、UTXOは、複数の呼び出しでユニークであることが保証されることはありません。つまり、UTXOは、最初の呼び出しの結果に表示され、その後、2回目の呼び出しで表示される場合があります。
* ページネーションを使用する際、複数の呼び出しで一貫性が保証されることはありません。つまり、呼び出し間でアドレスのUTXOセットが変更された可能性があります。
* `encoding`返されたUTXOのフォーマットを指定します。「cb58」あるいは「六角」でデフォルト値は「cb58」です。

#### **例**

少なくとも1つと`P-avax1s994jad0rtwvlfpkpyg2yau9nxt60qqfv023qx`を参照するすべてのUTXOを望むとします。`P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr`

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getUTXOs",
    "params" :{
        "addresses":["P-avax1s994jad0rtwvlfpkpyg2yau9nxt60qqfv023qx", "P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr"],
        "limit":5,
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

これにより応答が得られます：

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "numFetched": "5",
        "utxos": [
            "11PQ1sNw9tcXjVki7261souJnr1TPFrdVCu5JGZC7Shedq3a7xvnTXkBQ162qMYxoerMdwzCM2iM1wEQPwTxZbtkPASf2tWvddnsxPEYndVSxLv8PDFMwBGp6UoL35gd9MQW3UitpfmFsLnAUCSAZHWCgqft2iHKnKRQRz",
            "11RCDVNLzFT8KmriEJN7W1in6vB2cPteTZHnwaQF6kt8B2UANfUkcroi8b8ZSEXJE74LzX1mmBvtU34K6VZPNAVxzF6KfEA8RbYT7xhraioTsHqxVr2DJhZHpR3wGWdjUnRrqSSeeKGE76HTiQQ8WXoABesvs8GkhVpXMK",
            "11GxS4Kj2od4bocNWMQiQhcBEHsC3ZgBP6edTgYbGY7iiXgRVjPKQGkhX5zj4NC62ZdYR3sZAgp6nUc75RJKwcvBKm4MGjHvje7GvegYFCt4RmwRbFDDvbeMYusEnfVwvpYwQycXQdPFMe12z4SP4jXjnueernYbRtC4qL",
            "11S1AL9rxocRf2NVzQkZ6bfaWxgCYch7Bp2mgzBT6f5ru3XEMiVZM6F8DufeaVvJZnvnHWtZqocoSRZPHT5GM6qqCmdbXuuqb44oqdSMRvLphzhircmMnUbNz4TjBxcChtks3ZiVFhdkCb7kBNLbBEmtuHcDxM7MkgPjHw",
            "11Cn3i2T9SMArCmamYUBt5xhNEsrdRCYKQsANw3EqBkeThbQgAKxVJomfc2DE4ViYcPtz4tcEfja38nY7kQV7gGb3Fq5gxvbLdb4yZatwCZE7u4mrEXT3bNZy46ByU8A3JnT91uJmfrhHPV1M3NUHYbt6Q3mJ3bFM1KQjE"
        ],
        "endIndex": {
            "address": "P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr",
            "utxo": "kbUThAUfmBXUmRgTpgD6r3nLj7rJUGho6xyht5nouNNypH45j"
        },
        "encoding": "cb58"
    },
    "id": 1
}
```

`numFetched`そのため、フェッチされていないUTXOがより多く存在する可能性が、`limit`我々に示すことができます。今回は、次のようにしてメソッドを呼び出します`startIndex`：

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getUTXOs",
    "params" :{
        "addresses":["P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr"],
        "limit":5,
        "startIndex": {
            "address": "P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr",
            "utxo": "kbUThAUfmBXUmRgTpgD6r3nLj7rJUGho6xyht5nouNNypH45j"
        },
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

これにより応答が得られます：

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "numFetched": "4",
        "utxos": [
            "115ZLnNqzCsyugMY5kbLnsyP2y4se4GJBbKHjyQnbPfRBitqLaxMizsaXbDMU61fHV2MDd7fGsDnkMzsTewULi94mcjk1bfvP7aHYUG2i3XELpV9guqsCtv7m3m3Kg4Ya1m6tAWqT7PhvAaW4D3fk8W1KnXu5JTWvYBqD2",
            "11QASUuhw9M1r52maTFUZ4fnuQby9inX77VYxePQoNavEyCPuHN5cCWPQnwf8fMrydFXVMPAcS4UJAcLjSFskNEmtVPDMY4UyHwh2MChBju6Y7V8yYf3JBmYt767NPsdS3EqgufYJMowpud8fNyH1to4pAdd6A9CYbD8KG",
            "11MHPUWT8CsdrtMWstYpFR3kobsvRrLB4W8tP9kDjhjgLkCJf9aaJQM832oPcvKBsRhCCxfKdWr2UWPztRCU9HEv4qXVwRhg9fknAXzY3a9rXXPk9HmArxMHLzGzRECkXpXb2dAeqaCsZ637MPMrJeWiovgeAG8c5dAw2q",
            "11K9kKhFg75JJQUFJEGiTmbdFm7r1Uw5zsyDLDY1uVc8zo42WNbgcpscNQhyNqNPKrgtavqtRppQNXSEHnBQxEEh5KbAEcb8SxVZjSCqhNxME8UTrconBkTETSA23SjUSk8AkbTRrLz5BAqB6jo9195xNmM3WLWt7mLJ24"
        ],
        "endIndex": {
            "address": "P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr",
            "utxo": "21jG2RfqyHUUgkTLe2tUp6ETGLriSDTW3th8JXFbPRNiSZ11jK"
        },
        "encoding": "cb58"
    },
    "id": 1
}
```

`numFetched``limit`それより少ないので、UTXOを取得したが、再びこのメソッドを呼び出す必要はありません。

ImportTxを構築するために、XチェーンからPチェーンにエクスポートされたUTXOを取得したいとしましょう。その後、アトミックUTXOを取得するために、sourceChain引数でGetUTXOを呼び出す必要があります：

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getUTXOs",
    "params" :{
        "addresses":["P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr"],
        "sourceChain": "X",
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

これにより応答が得られます：

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "numFetched": "1",
        "utxos": [
            "115P1k9aSVFBfi9siZZz135jkrBCdEMZMbZ82JaLLuML37cgVMvGwefFXr2EaH2FML6mZuCehMLDdXSVE5aBwc8ePn8WqtZgDv9W641JZoLQhWY8fmvitiBLrc3Zd1aJPDxPouUVXFmLEbmcUnQxfw1Hyz1jpPbWSioowb"
        ],
        "endIndex": {
            "address": "P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr",
            "utxo": "S5UKgWoVpoGFyxfisebmmRf8WqC7ZwcmYwS7XaDVZqoaFcCwK"
        },
        "encoding": "cb58"
    },
    "id": 1
}
```

### platform.importAVAX

X-ChainからP-ChainにAVAXの移転を完了します。

このメソッドが呼び出される前に、X-Chainの[`avm.exportAVAX`](exchange-chain-x-chain-api.md#avm-exportavax)メソッドを呼び出して、移行を開始する必要があります。

#### **シグネチャ**

```cpp
platform.importAVAX(
    {
        from: []string, //optional
        to: string,
        changeAddr: string, //optional
        sourceChain: string,
        username: string,
        password: string
    }
) ->
{
    tx: string,
    changeAddr: string
}
```

* `to`AVAXがインポートされるアドレスのID。これは、X-Chainに対応する呼び出しで`to`引数と同じでなければなりません。`exportAVAX`
* `sourceChain`AVAXがインポートされるチェーンのIDまたはエイリアです。X-Chainから資金をインポートするには、 `"X"`.
* `from`は、この操作に使用するアドレスです。省略した場合、必要に応じてあなたのアドレスを使用します。
* `changeAddr`変更があった場合は、アドレス省略した場合、変更はユーザーがコントロールするアドレスのひとつに送信されます。
* `username`は、で指定したアドレスをコントロールするユーザです。`to`
* `password`は、`username`パスワード

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.importAVAX",
    "params": {
        "sourceChain": "X",
        "to": "P-avax1apzq2zt0uaaatum3wdz83u4z7dv4st7l5m5n2a",
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username": "myUsername",
        "password": "myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "P63NjowXaQJXt5cmspqdoD3VcuQdXUPM5eoZE2Vcg63aVEx8R",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

### platform.importKey

アドレスをコントロールする秘密鍵を提供することにより、ユーザーにアドレスをコントロールします。

#### **シグネチャ**

```cpp
platform.importKey({
    username: string,
    password: string,
    privateKey:string
}) -> {address: string}
```

* `username`秘密鍵のセットに追加します。`username`現在、秘密鍵でコントロール`privateKey`されるアドレス`address`です。

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.importKey",
    "params" :{
        "username": "myUsername",
        "password": "myPassword",
        "privateKey": "PrivateKey-2w4XiXxPfQK4TypYqnohRL8DRNTz9cGiGmwQ1zmgEqD9c9KWLq"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **例**

```cpp
{
    "jsonrpc":"2.0",
    "id": 1,
    "result": {
        "address":"P-avax19hwpvkx2p5q99w87dlpfhqpt3czyh8ywasfaym"
    }
}
```

### platform.issueTx

プラットフォームチェーンにトランザクションを発行します。

#### **シグネチャ**

```cpp
platform.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {txID: string}
```

* `tx`は、トランザクションのバイト表現です。
* `encoding`トランザクションバイトのためのエンコーディングフォーマットを指定します。「cb58」あるいは「六角」のいずれかでできます。デフォルトは、「cb58」になります。
* `txID`トランザクションID

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.issueTx",
    "params": {
        "tx":"111Bit5JNASbJyTLrd2kWkYRoc96swEWoWdmEhuGAFK3rCAyTnTzomuFwgx1SCUdUE71KbtXPnqj93KGr3CeftpPN37kVyqBaAQ5xaDjr7wVBTUYi9iV7kYJnHF61yovViJF74mJJy7WWQKeRMDRTiPuii5gsd11gtNahCCsKbm9seJtk2h1wAPZn9M1eL84CGVPnLUiLP",
        "encoding": "cb58"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "G3BuH6ytQ2averrLxJJugjWZHTRubzCrUZEXoheG5JMqL5ccY"
    },
    "id": 1
}
```

### platform.listAddresses

指定されたユーザーによってコントロールされるアドレスを一覧します。

#### **シグネチャ**

```cpp
platform.listAddresses({
    username: string,
    password: string
}) -> {addresses: []string}
```

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.listAddresses",
    "params": {
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "addresses": ["P-avax1ffksh2m592yjzwfp2xmdxe3z4ushln9s09z5p0"]
    },
    "id": 1
}
```

### platform.sampleValidators

指定されたサブネットからバリデータをサンプルします。

#### **シグネチャ**

```cpp
platform.sampleValidators(
    {
        size: int,
        subnetID: string, //optional
    }
) ->
{
    validators: []string
}
```

* `size`サンプルするバリデータ数です。
* `subnetID`iss は、Subnetからサンプリングする省略した場合、デフォルトはプライマリネットワークです。
* それぞれの要素は、バリデータのID`validators`です。

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.sampleValidators",
    "params" :{
        "size":2
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "validators":[
            "NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ",
            "NodeID-NFBbbJ4qCmNaCzeW7sxErhvWqvEQMnYcN"
        ]
    }
}
```

### platform.validatedBy

指定されたブロックチェーンを検証するサブネットを入手します。

#### **シグネチャ**

```cpp
platform.validatedBy(
    {
        blockchainID: string
    }
) -> {subnetID: string}
```

* `blockchainID`ブロックチェーンのIDです。
* `subnetID`ブロックチェーンを検証するSubnetのIDです。

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.validatedBy",
    "params": {
        "blockchainID": "KDYHHKjM4yTJTT8H8qPs5KXzE6gQH5TZrmP1qVr1P6qECj3XN"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "subnetID": "2bRCr6B4MiEfSjidDwxDpdCyviwnfUVqB2HGwhm947w9YYqb7r"
    },
    "id": 1
}
```

### platform.validates

SubnetバリデートされたブロックチェーンのIDを取得します。

#### **シグネチャ**

```cpp
platform.validates(
    {
        subnetID: string
    }
) -> {blockchainIDs: []string}
```

* `subnetID`サブネットID
* それぞれの要素は、SubnetがバリデートするブロックチェーンのID`blockchainIDs`です。

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.validates",
    "params": {
        "subnetID":"2bRCr6B4MiEfSjidDwxDpdCyviwnfUVqB2HGwhm947w9YYqb7r"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "blockchainIDs": [
            "KDYHHKjM4yTJTT8H8qPs5KXzE6gQH5TZrmP1qVr1P6qECj3XN",
            "2TtHFqEAAJ6b33dromYMqfgavGPF3iCpdG3hwNMiart2aB5QHi"
        ]
    },
    "id": 1
}
```

