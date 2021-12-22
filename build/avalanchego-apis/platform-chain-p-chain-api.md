# Platform Chain (P-Chain) API

このAPIにより、クライアントは、Avalancheの[バリデーター](../../learn/platform-overview/staking.md#validators)セットを維持し、ブロックチェーンの作成を処理する[P-Chain](../../learn/platform-overview/#platform-chain-p-chain)とやり取りすることができます。

## エンドポイント

```cpp
/ext/P
```

## フォーマット

このAPIは`json 2.0`RPCフォーマットを使用しています。

## メソッド

### platform.addDelegator

一次ネットワークにデリゲーターを追加します。

デリゲーターはAVAXをステークし、代理でバリデーションを行うバリデータ（デリゲーティ）を指定します。デリゲーティは、デリゲートされたステークに比例して、他のバリデーターからサンプリングされる確率（重量）が高くなります。

デリゲーティはデリゲーターに手数料を請求します。前者は、デリゲーターの検証報酬（ある場合）の一定割合を受け取ります。ステークをデリゲートするトランザクションには手数料がありません。

デリゲート期間は、デリゲーティが一次ネットワークを検証する期間のサブセットでなければなりません。

いったんトランザクションを発行し、ノードをデリゲータ―として追加してしまうと、パラメータを変更する方法はないということに注意してください。**ステークを早期に削除したり、ステーク量、ノードID、報酬アドレスの変更はできません。**正しい値を使用しているか確認してください。よくわからない場合は、[デベロッパー用FAQ](https://support.avalabs.org/en/collections/2618154-developer-faq)を確認するか、[Discord](https://chat.avalabs.org/)でヘルプを求めてください。

{% page-ref page="../../learn/platform-overview/staking.md" %}

#### **署名**

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

* `nodeID`は、デリゲートするノードのIDです。
* `startTime`は、デリゲーターがデリゲートを開始したUNIX時間です。
* `endTime`は、デリゲーターがデリゲートをやめる（そしてステークされたAVAXが返される）UNIX時間です。
* `stakeAmount`は、デリゲーターがステーキングしているnAVAXの量です。
* `rewardAddress`は、バリデータの報酬が送られるアドレスです（ある場合）。
* `from`は、この操作に使用したいアドレスです。省略した場合は、必要に応じて自分のアドレスのいずれかを使用します。
* `changeAddr`は、変更が行われた場合に送信されるアドレスです。省略した場合は、ユーザーが管理するいずれかのアドレスに送信されます。
* `username`は、トランザクション手数料を支払うユーザーです。
* `password`は`username`のパスワードです。
* `txID`はトランザクションIDです

#### **呼び出し例**

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

#### **レスポンス例**

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

バリデータをプライマリネットワークに追加します。これを行うにはAVAXをステークする必要があります。検証中にノードが十分に正しく反応していれば、ステーク期間が終了したときに報酬を受け取ることができます。コンセンサスの際に他のバリデータからサンプリングされる確率は、ステークしたAVAXの量に比例します。

バリデータはデリゲーターに手数料を課します。バリデータは、デリゲーターの検証報酬（ある場合）の一定の割合を受け取ります。最小デリゲーション手数料は2%です。バリデータを追加するトランザクションは無料です。

検証期間は2週間から1年の間でなければなりません。

バリデータに課せられる総重量には上限があります。つまり、どのバリデータにもこの値を超えるAVAXがステークされたりデリゲートされたりすることはないということです。この値は初期状態では`min(5 * amount staked, 3M AVAX)`に設定されています。バリデータの総価値は300万AVAXです。

いったんトランザクションを発行し、ノードをバリデータとして追加してしまうと、パラメータを変更する方法はないということに注意してください。**ステークを早期に削除したり、ステーク額、ノードID、報酬アドレスを変更したりすることはできません。**正しい値を使用しているか確認してください。よくわからない場合は、[デベロッパー用FAQ](https://support.avalabs.org/en/collections/2618154-developer-faq)を確認するか、[Discord](https://chat.avalabs.org/)でヘルプを求めてください。

{% page-ref page="../../learn/platform-overview/staking.md" %}

#### **署名**

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

* `nodeID`は、追加されるバリデーターのノードIDです。
* `startTime`は、バリデーターが一次ネットワークの検証を開始したUNIX時間です。
* `endTime`は、バリデーターが一次ネットワークの検証を終了する（そしてステークされたAVAXが返されます）UNIX時間です。
* `stakeAmount`は、バリデーターがステーキングしているnAVAXの量です。
* `rewardAddress`は、バリデーターの報酬が送られるアドレスです（ある場合）。
* `delegationFeeRate`は、他の人がこのバリデータにステークをデリゲートする際に、このバリデータが請求する手数料の割合です。小数点第4位まで有効です。それを超える小数点以下のデータは無視されます。０から100までの間でなければなりません。例えば、`delegationFeeRate`が`1.2345`で、誰かがこのバリデーターをデリゲートする場合、デリゲート期間が終了すると、リワードの1.2345%がバリデーターに、残りはデリゲートした者に移動します。
* `from`は、この操作に使用したいアドレスです。省略した場合は、必要に応じて自分のアドレスのいずれかを使用します。
* `changeAddr`は、変更が行われた場合に送信されるアドレスです。省略した場合は、ユーザーが管理するいずれかのアドレスに送信されます。
* `username`は、トランザクション手数料を支払うユーザーです。
* `password`は`username`のパスワードです。
* `txID`はトランザクションIDです

#### **呼び出し例**

この例では、シェルコマンドを使用して10分後と2日後のUnix時間を計算`date`しています。（注意：Macを使用している場合、`$(date`を`$(gdate`に置き換えてください。`gdate`がインストールされていない場合は、`brew install coreutils`を実行します。)

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

#### **レスポンス例**

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

プライマリネットワーク以外のサブネットにバリデータを追加します。バリデータは、サブネットを検証している間中ずっと、プライマリネットワークを検証しなければなりません。

#### **署名**

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

* `nodeID`はバリデーターのノードIDです。
* `subnetID`は、検証するサブネットです。
* `startTime`は、バリデーターがサブネットの検証を開始したUNIX時間です。
* `endTime`は、バリデーターがサブネットの検証を終了するUNIX時間です。
* `weight`は、サンプリングに使用するバリデーターの重量です。
* `from`は、この操作に使用したいアドレスです。省略した場合は、必要に応じて自分のアドレスのいずれかを使用します。
* `changeAddr`は、変更が行われた場合に送信されるアドレスです。省略した場合は、ユーザーが管理するいずれかのアドレスに送信されます。
* `username`は、トランザクション手数料を支払うユーザーです。
* `password`は`username`のパスワードです。
* `txID`はトランザクションIDです。

#### **呼び出し例**

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

#### **レスポンス例**

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

指定ユーザーが管理する新しいアドレスを作成します。

#### **署名**

```cpp
platform.createAddress({
    username: string,
    password: string
}) -> {address: string}
```

#### **呼び出し例**

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

#### **レスポンス例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "P-avax12lqey27sfujqq6mc5a3jr5av56cjsu8hg2d3hx"
    },
    "id": 1
}
```

### platform.createBlockchain

新しいブロックチェーンを作成します。現在は、AVMとタイムスタンプVMの新しいインスタンスの作成のみサポートしています。

#### **署名**

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

* `subnetID`は新しいブロックチェーンを検証するサブネットのIDです。サブネットは必ず存在していなければならず、プライマリネットワークにはなれません。
* `vmID`は、ブロックチェーンが動作する仮想マシンのIDです。仮想マシンのエイリアスにすることもできます。
* `name`は、新しいブロックチェーンの人間が読める名前です。必ずしも一意である必要はありません。
* `genesisData`は、新しいブロックチェーンの生成状態を`encoding`のパラメータで指定されたフォーマットでエンコードしたバイト表現です。
* `encoding`は`genesisData`で使用するフォーマットを指定します。「cb58」または「hex」のいずれかを指定します。デフォルトは「cb58」です。仮想マシンは、`genesisData`を作成するのに使用することのできる`buildGenesis`という名前の静的APIメソッドを持っている必要があります。
* `from`は、この操作に使用したいアドレスです。省略した場合は、必要に応じて自分のアドレスのいずれかを使用します。
* `changeAddr`は、変更が行われた場合に送信されるアドレスです。省略した場合は、ユーザーが管理するアドレスのいずれかに送信されます。
* `username`は、トランザクション手数料を支払うユーザーです。このユーザーは、十分な数のサブネットのコントロール鍵を持っている必要があります。
* `password`は`username`のパスワードです。
* `txID`はトランザクションIDです。

#### **呼び出し例**

この例では、タイムスタンプ仮想マシンの新しいインスタンスを作成しています。`genesisData`は`timestamp.buildGenesis`から呼び出します。

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

#### **レスポンス例**

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

#### **署名**

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

* このサブネットにバリデーターを追加するには、`controlKeys`のアドレスにある`threshold`の署名が必要です。
* `from`は、この操作に使用したいアドレスです。省略した場合は、必要に応じて自分のアドレスのいずれかを使用します。
* `changeAddr`は、変更が行われた場合に送信されるアドレスです。省略した場合は、ユーザーが管理するいずれかのアドレスに送信されます。
* `username`は、トランザクション手数料を支払うユーザーです。
* `password`は`username`のパスワードです。

#### **呼び出し例**

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

#### **レスポンス例**

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

P-Chain上のアドレスからX-Chain上のアドレスにAVAXを送信します。このトランザクションを発行した後、アセットID`AVAX`でX-Chainの[`avm.import`](exchange-chain-x-chain-api.md#avm-import)メソッドを呼び出し、転送を完了させる必要があります。

#### **署名**

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

* `amount`は、送信するnAVAXの量です。
* `to`は、AVAXを送信するX-Chain上のアドレスです
* `from`は、この操作に使用したいアドレスです。省略した場合は、必要に応じて自分のアドレスのいずれかを使用します。
* `changeAddr`は、変更が行われた場合に送信されるアドレスです。省略した場合は、ユーザーが管理するいずれかのアドレスに送信されます。
* `username`は、ユーザーがAVAXを送信し、トランザクション手数料を支払うことになります。
* `password`は`username`のパスワードです。
* `txID`は、このトランザクションのIDです。

#### **呼び出し例**

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

#### **レスポンス例**

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

指定されたアドレスを管理する秘密鍵を取得します。返された秘密鍵は、[`platform.importKey`](platform-chain-p-chain-api.md#platform-importkey)で、ユーザーに追加できます。

#### **署名**

```cpp
platform.exportKey({
    username: string,
    password: string,
    address: string
}) -> {privateKey: string}
```

* `username`は、`address`を管理するユーザーです。
* `password`は`username`のパスワードです。
* `privateKey`は、`address`を管理する秘密鍵の文字列表現です。

#### **呼び出し例**

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

#### **レスポンス例**

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

指定されたアドレスで管理されているAVAXの残高を取得します。

#### **署名**

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

* `address`は、バランスを取るためのアドレスです。
* `balance`は総残高で、単位はnAVAXです。
* `unlocked`はロックされていない残高で、nAVAXの場合です。
* `lockedStakeable`は、nAVAXでは、ロックされたステーブル残高です。
* `lockedNotStakeable`は、nAVAXでは、ロックされていてステークできない残高です。
* `utxoIDs`は、`address`を参照するUTXOのIDです。

#### **呼び出し例**

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

#### **レスポンス例**

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

存在するすべてのブロックチェーン（ P-Chainを除く）を取得します。

#### **署名**

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

* `blockchains`は、Avalancheネットワーク上に存在するすべてのブロックチェーンのことです。
* `name`は、このブロックチェーンの人間が読める名前です。
* `id`は、ブロックチェーンのIDです。
* `subnetID`は、このブロックチェーンを検証するサブネットのIDです。
* `vmID`は、ブロックチェーンが動作する仮想マシンのIDです。

#### **呼び出し例**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getBlockchains",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **レスポンス例**

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

ブロックチェーンのステータスを取得します。

#### **署名**

```cpp
platform.getBlockchainStatus(
    {
        blockchainID: string
    }
) -> {status: string}
```

`status`は、次の1つです。

* `Validating`：このノードでブロックチェーンの検証が行われています。
* `Created`：ブロックチェーンは存在していますが、このノードによって検証されていません。
* `Preferred`：ブロックチェーンの作成が提案され、作成される可能性が高いが、トランザクションがまだ認められていません。
* `Unknown`：ブロックチェーンが提案されていないか、ブロックチェーンを作成する提案が推奨されていません。提案は再提出することができます。

#### **呼び出し例**

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

#### **レスポンス例**

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

存在するAVAXの数の上限を返します。トランザクション手数料など、焼却されたトークンを考慮していないため、これが上限値となります。

#### **署名**

```cpp
platform.getCurrentSupply() -> {supply: int}
```

* `supply`は、存在するAVAXの数の上限であり、nAVAXと表記されます。

#### **呼び出し例**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getCurrentSupply",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **レスポンス例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "supply": "365865167637779183"
    },
    "id": 1
}
```

この例のレスポンスは、AVAXの供給量が最大で365.865万個であることを示しています。

### platform.getCurrentValidators

指定したサブネットの現在のバリデーターを一覧表示します。

トップレベルのフィールド`delegators`は、v1.0.1時点で[非推奨](deprecated-api-calls.md#getcurrentvalidators)となり、v1.0.6で削除されました。代わりに、今の`validators`の各要素にはそのバリデータのデリゲータリストが含まれています。

#### **署名**

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

* `subnetID`は現在のバリデータが返されるサブネットです。省略された場合は、プライマリネットワークの現在のバリデータを返します。
* `nodeIDs`は、リクエストする現在のバリデータのnodeIDのリストです。省略された場合は、現在のすべてのバリデータを返します。指定したnodeIDが現在のバリデータセットに含まれていない場合は、そのノードはレスポンスに含まれません。
* `validators`：
   * `txID`はバリデーターのトランザクションです。
   * `startTime`は、バリデーターがサブネットの検証を開始したUNIX時間です。
   * `endTime`は、バリデーターがサブネットの検証を終了するUNIX時間です。
   * `stakeAmount`は、このバリデータがステークしたnAVAXの量です。`subnetID`がプライマリネットワークではない場合は省略されます。
   * `nodeID`はバリデーターのノードIDです。
   * `weight`は、バリデータをサンプリングする際のバリデータの重量です。`subnetID`がプライマリネットワークの場合は省略されます。
   * `rewardOwner`は、`locktime`、`threshold`、`addresses`の配列を含む`OutputOwners`の出力です。
   * `potentialReward`はステーキングによって得られる潜在的な報酬です
   * `delegationFeeRate`は、他の人がこのバリデーターにステークをデリゲートする際に、 このバリデーターが請求する手数料の割合です。
   * `uptime`は、問い合わせ先のノードがピアをオンラインと報告した時間の割合です。
   * `connected`は、そのノードがネットワークに接続されている場合です
   * `delegators`は、このバリデーターに対するデリゲーターのリストです。
      * `txID`はデリゲータートランザクションです。
      * `startTime`はデリゲーターが起動したUNIX時間です。
      * `endTime`は、デリゲーターが停止するUNIX時間です。
      * `stakeAmount`は、デリゲーターがステークしたｎAVAXの量です。`subnetID`がプライマリネットワークではない場合は省略されます。
      * `nodeID`は、検証ノードのノードIDです。
      * `rewardOwner`は、`locktime`、`threshold`、`addresses`の配列を含む`OutputOwners`の出力です。
      * `potentialReward`はステーキングによって得られる潜在的な報酬です
* `delegators`：（**v1.0.1以降では非推奨です。メソッドのドキュメントの先頭にある注意書きを参照してください**。）

#### **呼び出し例**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getCurrentValidators",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **レスポンス例**

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

#### **署名**

```cpp
platform.getHeight() ->
{
    height: int,
}
```

#### **呼び出し例**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getHeight",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **レスポンス例**

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

一次ネットワークの検証に必要なAVAXの最小量と、デリゲートできるAVAXの最小量を取得します。

#### **署名**

```cpp
platform.getMinStake() ->
{
    minValidatorStake : uint64,
    minDelegatorStake : uint64
}
```

#### **呼び出し例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getMinStake"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **レスポンス例**

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

### platform.getPendingValidators

指定したサブネットの保留中のバリデーターセットのバリデーターを一覧表示します。各バリデーターは、現在サブネットを検証していませんが、将来的には検証します。

#### **署名**

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

* `subnetID`は現在のバリデータが返されるサブネットです。省略された場合は、プライマリネットワークの現在のバリデータを返します。
* `nodeIDs`は、リクエストする保留中のバリデータのnodeIDのリストです。省略した場合は、保留中のすべてのバリデータを返します。指定したnodeIDが保留中のバリデータのセットに含まれていない場合、レスポンスには含まれません。
* `validators`：
   * `txID`はバリデーターのトランザクションです。
   * `startTime`は、バリデーターがサブネットの検証を開始したUNIX時間です。
   * `endTime`は、バリデーターがサブネットの検証を終了するUNIX時間です。
   * `stakeAmount`は、このバリデータがステークしたnAVAXの量です。`subnetID`がプライマリネットワークではない場合は省略されます。
   * `nodeID`はバリデーターのノードIDです。
   * `connected`ノードが接続されている場合です。
   * `weight`は、バリデータをサンプリングする際のバリデータの重量です。`subnetID`がプライマリネットワークの場合は省略されます。
* `delegators`：
   * `txID`はデリゲータートランザクションです。
   * `startTime`は、デリゲーターが起動したときのUNIX時間です。
   * `endTime`は、デリゲーターが停止するUNIX時間です。
   * `stakeAmount`は、デリゲーターがステークしたｎAVAXの量です。`subnetID`がプライマリネットワークではない場合は省略されます。
   * `nodeID`は、検証ノードのノードIDです。

#### **呼び出し例**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **レスポンス例**

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

### platform.getRewardUTXOs

提供されたトランザクションのステーキング期間またはデリゲート期間が終了した後に報酬を得たUTXOを返します。

#### **署名**

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

* `txID`はステーキングまたはデリゲーショントランザクションのIDです
* `numFetched`は返されたUTXOの数です
* `utxos`は、エンコードされた報酬UTXOの配列です
* `encoding`は、返されるUTXOのフォーマットを指定します。「cb58」または「hex」のいずれかで、デフォルトは「cb58」です。

#### **呼び出し例**

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

#### **レスポンス例**

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

サブネットのステーキング資産の資産IDを取得します。現在は、プライマリネットワークのステーキング資産IDのみを返します。

#### **署名**

```cpp
platform.getStakingAssetID({
    subnetID: string //optional
}) -> {
    assetID: string
}
```

* `subnetID`は、資産IDがリクエストされているサブネットです。
* `assetID`は、サブネットのステーキング資産の資産IDです。

#### **呼び出し例**

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

#### **レスポンス例**

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

サブネットの情報を取得します。

#### **署名**

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

* `ids`は情報を取得するサブネットのIDです。省略する場合は、すべてのサブネットの情報を取得します。
* `id`は、サブネットのIDです。
* `threshold`サブネットにバリデーターを追加するには、`controlKeys`のアドレスからの署名が必要です。

サブネットにバリデーターを追加する方法については[こちら](../tutorials/nodes-and-staking/add-a-validator.md)をご覧ください。

#### **呼び出し例**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getSubnets",
    "params": {"ids":["hW8Ma7dLMA7o4xmJf3AXBbo17bXzE7xnThUd3ypM4VAWo1sNJ"]},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **レスポンス例**

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

一連のアドレスでステークされたnAVAXの量を取得します。返された金額にはステーキング報酬は含まれていません。

#### **署名**

```cpp
platform.getStake({addresses: []string}) -> {staked: int}
```

#### **呼び出し例**

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

#### **レスポンス例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "staked": "5000000"
    },
    "id": 1
}
```

### platform.getTimestamp

現在のP-Chainのタイムスタンプを取得します。

#### **署名**

```cpp
platform.getTimestamp() -> {time: string}
```

#### **呼び出し例**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTimestamp",
    "params": {},
    "id": 1
}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **レスポンス例**

```json
{
    "jsonrpc": "2.0",
    "result": {
        "timestamp": "2021-09-07T00:00:00-04:00"
    },
    "id": 1
}
```

### platform.getTotalStake

一次ネットワークにステークされているnAVAXの総量を取得します。

#### **署名**

```cpp
platform.getTotalStake() -> {stake: int}
```

#### **呼び出し例**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTotalStake",
    "params": {},
    "id": 1
}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **レスポンス例**

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

トランザクションをそのIDで取得します。

返されるトランザクションのフォーマットを指定するオプションの`encoding`パラメータです。「cb58」または「hex」のいずれかを指定します。デフォルトは「cb58」です。

#### **署名**

```cpp
platform.getTx({
    txID: string,
    encoding: string //optional
}) -> {
    tx: string,
    encoding: string,
}
```

#### **呼び出し例**

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

#### **レスポンス例**

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

そのIDでトランザクションのステータスを取得します。トランザクションがドロップされた場合、レスポンスには、トランザクションがドロップされた理由の詳細情報が示される`reason`フィールドが含まれます。

これまでの動作に関する注意点は[こちら](deprecated-api-calls.md#gettxstatus)をご覧ください。

#### **署名**

```cpp
platform.getTxStatus({
    txID: string
}) -> {status: string}
```

`status`は、次の内の1つです。

* `Committed`：すべてのノードがトランザクションを受け入れます（または受け入れることになります）
* `Processing`：トランザクションは、このノードが決定します
* `Dropped`：そのトランザクションは、ネットワーク上のどのノードにも受け入れられません。詳しくは`reason`フィールドをご覧ください
* `Unknown`：トランザクションがこのノードで確認されていません

#### **呼び出し例**

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

#### **レスポンス例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "status": "Committed"
    },
    "id": 1
}
```

### platform.getUTXOs

指定アドレスのセットを参照するUTXOを取得します。

#### **署名**

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

* `utxos`は、各UTXOが`addresses`の少なくとも1つのアドレスを参照するようなUTXOのリストです。
* 最大で`limit`UTXOが返されます。`limit`が省略されるか1024を超える場合は、1024に設定されます。
* このメソッドはページネーションに対応しています。`endIndex`は、最後に返されたUTXOを示します。次のセットのUTXOのを取得するには、次の呼び出しで`endIndex`の値を`startIndex`として使用します。
* `startIndex`が省略された場合は、`limit`までのUTXOをすべて取得します。
* ページネーションを使用する場合（つまり`startIndex`が提供されている場合）、UTXOは複数回の呼び出しで一意であることは保証されません。つまり、あるUTXOは、最初の呼び出しの結果に現れ、その後、2回目の呼び出しで再び現れる可能性があります。
* ページネーションを使用する場合、複数回の呼び出しでの一貫性は保証されません。つまり、アドレスのUTXOのセットが呼び出しの間に変更されている可能性があります。
* `encoding`は、返されるUTXOのフォーマットを指定します。「cb58」または「hex」のいずれかで、デフォルトは「cb58」です。

#### **例**

`P-avax1s994jad0rtwvlfpkpyg2yau9nxt60qqfv023qx`と`P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr`の少なくとも1つを参照するすべてのUTXOが欲しいとします。

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

これでレスポンスが得られます。

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

`numFetched`は`limit`と同じなので、フェッチされなかったUTXOがさらにあるのではないかと考えられます。今度は、`startIndex`でメソッドを再度呼び出します。

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

これでレスポンスが得られます。

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

`numFetched`が`limit`よりも小さいので、UTXOの取得が完了したことがわかり、このメソッドを再度呼び出す必要はありません。

ImportTxを構築するために、X ChainからP ChainにエクスポートしたUTXOをフェッチしたとします。アトミックUTXOを取得するためには、sourceChain引数でGetUTXOを呼び出す必要があります。

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

これでレスポンスが得られます。

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

### platform.getValidatorsAt

バリデータと、指定されたP-Chainの高さでのサブネットあるいはプライマリネットワークの重量を取得します。

#### **署名**

```cpp
platform.getValidatorsAt(
    {
        height: int,
        subnetID: string, // optional
    }
)
```

* `height`は、バリデータを設定するP-Chainの高さです。
* `subnetID`は、バリデータを設定するサブネットのIDです。指定しない場合は、プライマリネットワークのバリデータセットを取得します。

#### **呼び出し例**

```bash
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getValidatorsAt",
    "params": {
        "height":1
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **レスポンス例**

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "validators": {
            "NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg": 2000000000000000,
            "NodeID-GWPcbFJZFfZreETSoWjPimr846mXEKCtu": 2000000000000000,
            "NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ": 2000000000000000,
            "NodeID-NFBbbJ4qCmNaCzeW7sxErhvWqvEQMnYcN": 2000000000000000,
            "NodeID-P7oB2McjBGgW2NXXWVYjV8JEDFoW9xDE5": 2000000000000000
        }
    },
    "id": 1
}
```

### platform.importAVAX

X-ChainからP-Chain.へのAVAXの転送を完了します。

メソッドを呼び出す前に、X-Chainの[`avm.export`](exchange-chain-x-chain-api.md#avm-export)メソッドをassetID`AVAX`で呼び出し、転送を開始する必要があります。

#### **署名**

```cpp
platform.importAVAX(
    {
        from: []string, //optional
        to: string,
        changeAddr: string, //optional
        username: string,
        password: string
    }
) ->
{
    tx: string,
    changeAddr: string
}
```

* `to`は、AVAXがインポートされるアドレスのIDです。これは、X-Chainの`export`に対応する呼び出しの`to`の引数と同じでなければなりません。
* `from`は、この操作に使用したいアドレスです。省略した場合は、必要に応じて自分のアドレスのいずれかを使用します。
* `changeAddr`は、変更が行われた場合に送信されるアドレスです。省略した場合は、ユーザーが管理するいずれかのアドレスに送信されます。
* `username`はアドレスの制御および変更を行うユーザーです。
* `password`は`username`のパスワードです。

#### **呼び出し例**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.importAVAX",
    "params": {
        "to": "P-avax1apzq2zt0uaaatum3wdz83u4z7dv4st7l5m5n2a",
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username": "myUsername",
        "password": "myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **レスポンス例**

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

アドレスを管理する秘密鍵を提供することで、ユーザーにアドレスの管理できるようにします。

#### **署名**

```cpp
platform.importKey({
    username: string,
    password: string,
    privateKey:string
}) -> {address: string}
```

* `username`の秘密鍵のセットに`privateKey`を追加します。`address`は、現在`username`が秘密鍵で管理しているアドレスです。

#### **呼び出し例**

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

#### **レスポンス例**

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

#### **署名**

```cpp
platform.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {txID: string}
```

* `tx`は、トランザクションのバイト表現です。
* `encoding`はトランザクションバイトのエンコードフォーマットを指定します。「cb58」または「hex」のいずれかを指定します。デフォルトは「cb58」です。
* `txID`はトランザクションのIDです。

#### **呼び出し例**

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

#### **レスポンス例**

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

指定されたユーザーが管理するアドレスを一覧表示します。

#### **署名**

```cpp
platform.listAddresses({
    username: string,
    password: string
}) -> {addresses: []string}
```

#### **呼び出し例**

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

#### **レスポンス例**

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

指定したサブネットからバリデーターを抽出します。

#### **署名**

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

* `size`は、サンプリングするバリデーターの数です。
* `subnetID`は、サンプリングするサブネットです。省略した場合、デフォルトでプライマリネットワークとなります。
* `validators`の各要素はバリデーターのIDです。

#### **呼び出し例**

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

#### **レスポンス例**

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

指定ブロックチェーンを検証するサブネットを取得します。

#### **署名**

```cpp
platform.validatedBy(
    {
        blockchainID: string
    }
) -> {subnetID: string}
```

* `blockchainID`は、ブロックチェーンのIDです。
* `subnetID`は、ブロックチェーンを検証するサブネットのIDです。

#### **呼び出し例**

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

#### **レスポンス例**

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

サブネットが検証しているブロックチェーンのIDを取得します。

#### **署名**

```cpp
platform.validates(
    {
        subnetID: string
    }
) -> {blockchainIDs: []string}
```

* `subnetID`は、サブネットのIDです。
* の各要素は、サブネットが検証するブロックチェーンのID`blockchainIDs`です。

#### **呼び出し例**

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

#### **レスポンス例**

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

