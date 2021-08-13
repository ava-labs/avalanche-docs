# Platform Chain \(P-Chain\) API

このAPIにより、クライアントは[P-Chain](../../learn/platform-overview/#platform-chain-p-chain)と対話できます。これはAvalancheの[バリデータセット](../../learn/platform-overview/staking.md#validators)を維持し、ブロックチェーン作成を処理します。

## Endpoint-JP

```cpp
/ext/P
```

## JP-JP-

`JSON 2.0` RPC 形式を使用しています。

## JavaScript-JavaScript-JavaScript-Java

### platform.addDelegator.JP

Primary Networkにデリゲーターを追加します。

AVAX に対して、AVAX を賭け、バリデータ \(delegatee\) を指定します。delegatee は、他のバリデータ \(weight\) によってサンプリングされる確率が高まっています。

delegatee はデリゲーターに手数料を請求します。前者はデリゲーターのバリデーション報酬のパーセンテージを受け取ります \(もしあれば)。\) ステークを委任するトランザクションには手数料はありません。

委任期間は、デリゲートがプライマリネットワークを検証する期間の一部でなければなりません。

トランザクションをデリゲーターとしてノードを追加すると、パラメータを変更する方法はありません。**ステークを早期に削除したり、ステーク金額、ノードID、リワードアドレスを変更することはできません。**正しい値を使用していることを確認してください。わからない場合は、Discordの[開発者FAQ](https://support.avalabs.org/en/collections/2618154-developer-faq)をご覧ください[。](https://chat.avalabs.org/)

--/../learn/platform-overview/staking.md" %}

#### **JPS-JP-JP**

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

* `nodeID` は、デリゲートするノードの ID です。
* `startTime` は、デリゲーターがデリゲートを開始する Unix 時刻です。
* `endTime` は、デリゲーターが \(そして、AVAX が返される\)の委任を停止する UNIX 時刻です。
* `stakeAmount` は、デリゲーターがステーキングしているnAVAXの量です。
* `rewardAddress` はバリデーターのリワードがあれば行くアドレスです。
* `For` example, the component is any use-parallely.JavaScript-JP-JP-
* `changeAddr` は、変更が送信されるアドレスです。JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-
* `username`はトランザクション手数料を支払うユーザーです。
* `password` は`ユーザー名の`パスワードです。
* `txID`はトランザクションIDです。

#### **Call 例**

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

Primary Networkにバリデータを追加します。AVAXを買う必要があります。ノードが十分に正しく、レスポンシブな状態で検証された場合、ステーキング期間終了時にリワードを受け取ります。バリデーターのコンセンサス中に他のバリデーターによってサンプリングされる確率は、AVAXのステーク値に比例します。

バリデータはデリゲーターに手数料を請求します。前者はデリゲーターのバリデーションリワード \(もしあれば)のパーセンテージを受け取ります。\) 最低の委任料は2%です。バリデーターを追加するトランザクションには手数料はありません。

検証期間は2週間から1年間でなければなりません。

バリデーターに課される最大総重量があります。これは、バリデーターがこの値よりもAVAXをステークレスに委任し、それに委任することはありません。この値は最初に`min(5 * staked, 3M AVAX)`に設定されます。バリデーターの合計値は300万AVAXです。

トランザクションをバリデータとしてノードを追加すると、パラメータを変更する方法はありません。**ステークを早期に削除したり、ステーク金額、ノードID、リワードアドレスを変更することはできません。**正しい値を使用していることを確認してください。わからない場合は、Discordの[開発者FAQ](https://support.avalabs.org/en/collections/2618154-developer-faq)をご覧ください[。](https://chat.avalabs.org/)

--/../learn/platform-overview/staking.md" %}

#### **JPS-JP-JP**

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

* `nodeID` は、追加されるバリデータのノードIDです。
* `startTime` は、Primary Network のバリデーションを始める Unix 時刻です。
* `endTime` は、バリデータがPrimary Network \(そして、AVAX が返されます\)の検証を停止する UNIX 時刻です。
* `stakeAmount` は、バリデータがステーキングしているnAVAXの量です。
* `rewardAddress` はバリデーターのリワードがあれば行くアドレスです。
* `delegationFeeRate`は、他の人がステークを委任したときにこのバリデーターが課金するパーセント料金です。4進数まで許可されています。小数点数は追加の小数点数は無視されます。--例えば、`delegationFeeRate`が`1.2345`で、誰かがこのバリデータに委任した場合、そのデリゲート期間が終わると、1.2345%の報酬がバリデータに渡り、残りはデリゲータに委任されます。
* `For` example, the component is any use-parallely.JavaScript-JP-JP-
* `changeAddr` は、変更が送信されるアドレスです。JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-
* `username`はトランザクション手数料を支払うユーザーです。
* `password` は`ユーザー名の`パスワードです。
* `txID`はトランザクションIDです。

#### **Call 例**

この例では、シェルコマンド`date`を使用してUNIXの10分2日間を計算します。\(Note: Mac 上で動作している場合は、`$(date` を `$(gdate`) に置き換えます。`gdate` がインストールされていない場合は、`coreutils を brew installします。`\)

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

Primary Network以外のサブネットにバリデーターを追加します。Validatorは、このサブネットを検証する期間全体でプライマリネットワークを検証する必要があります。

#### **JPS-JP-JP**

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

* `nodeID` はバリデータのノードIDです。
* `subnetID` は、彼らが検証するサブネットです。
* `startTime` は、バリデータがサブネットの検証を開始するunixの時間です。
* `endTime`は、バリデータがサブネットの検証を停止するunix時間です。
* `weight` はサンプリングに使用するバリデータの重みです。
* `For` example, the component is any use-parallely.JavaScript-JP-JP-
* `changeAddr` は、変更が送信されるアドレスです。JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-
* `username`はトランザクション手数料を支払うユーザーです。
* `password` は`ユーザー名の`パスワードです。
* `txID`はトランザクションIDです。

#### **コールの例**

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

指定したユーザーがコントロールする新しいアドレスを作成します。

#### **JPS-JP-JP**

```cpp
platform.createAddress({
    username: string,
    password: string
}) -> {address: string}
```

#### **Call 例**

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

新しいブロックチェーンを作成します。現在、AVM および Timestamp VM の新しいインスタンス作成のみをサポートしています。

#### **JPS-JP-JP**

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

* `subnetID` は、新しいブロックチェーンを検証する Subnet の ID です。Subnetは存在しなければならず、Primary Networkでなければなりません。
* `vmID`は、ブロックチェーンが実行する仮想マシンのIDです。また、仮想マシンのエイリアスでもできます。
* `name` は新しいブロックチェーンのための人間が読みやすい名前です。必ずしも一意なわけではありません。
* `genesisData`は`、`エンコードパラメータで指定されたフォーマットでエンコードされた新しいブロックチェーンのジェネシス状態のバイト表現です。
* `encoding` は、`genesisData` に使用する書式を指定します。--デフォルトは "cb58" です。Virtual Machinesには、`genesisData`を生成するために使用できる`buildGenesis`という名前の静的APIメソッドがあります。
* `For` example, the component is any use-parallely.JavaScript-JP-JP-
* `changeAddr` は、変更が送信されるアドレスです。JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-
* `username`はトランザクション手数料を支払うユーザーです。このユーザーは、サブネットの制御キーを十分に数持っている必要があります。
* `password` は`ユーザー名の`パスワードです。
* `txID`はトランザクションIDです。

#### **Call 例**

この例では、Timestamp Virtual Machine の新しいインスタンスを作成しています。`genesisData` は `timestamp.buildGenesis` を呼び出すことから来ました。

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

#### **JPS-JP-JP**

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

* このサブネットにバリデータを追加するには、`controlKeys` のアドレスから`閾値`署名が必要です。
* `For` example, the component is any use-parallely.JavaScript-JP-JP-
* `changeAddr` は、変更が送信されるアドレスです。JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-
* `username`はトランザクション手数料を支払うユーザーです。
* `password` は`ユーザー名の`パスワードです。

#### **Call 例**

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

### Platform.exportAVAX-JP

AVAX を P-Chain のアドレスから X-Chain のアドレスに送信します。このトランザクションを発行したら、トランザクションを完了するにはX-Chainの[`avm.importAVAX`](exchange-chain-x-chain-api.md#avm-importavax)メソッドを呼び出す必要があります。

#### **JPS-JP-JP**

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

* `amount` は、nAVAX の送信する量です。
* `Toは`X-Chain上のアドレスでAVAXを送信します。
* `For` example, the component is any use-parallely.JavaScript-JP-JP-
* `changeAddr` は、変更が送信されるアドレスです。JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-
* `username`はAVAXを送り、トランザクション手数料を支払うユーザーです。
* `password` は`ユーザー名の`パスワードです。
* `txID`はこのトランザクションのIDです。

#### **Call 例**

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

指定したアドレスを制御する秘密鍵を取得します。  返された秘密鍵は、[`platform.importKey`](platform-chain-p-chain-api.md#platform-importkey) を使用してユーザーに追加できます。

#### **JPS-JP-JP**

```cpp
platform.exportKey({
    username: string,
    password: string,
    address: string
}) -> {privateKey: string}
```

* `username` は`アドレス`を制御するユーザーです。
* `password` は`ユーザー名の`パスワードです。
* `privateKey` は`アドレス`を制御する秘密鍵の文字列表現です。

#### **Call 例**

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

### platform.getBalance.JP

AVAXの残高を指定したアドレスによって制御します。

#### **JPS-JP-JP**

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

* `address` は、バランスを取得するアドレスです。
* `バランス`とは、nAVAXで合計バランスです。
* `unlocked`は、nAVAXでアンロックされた残高です。
* `lockedStakeable`は、nAVAXでロックされたstakeableバランスです。
* `lockedNotStakeable`は、nAVAXでロックされ、stakeableの残高ではありません。
* `utxoIDs`は、UTXOのIDであり、その参照`アドレス`です。

#### **Call 例**

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

JavaScript-JP-JP-

#### **JPS-JP-JP**

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

* `blockchains`はAvalancheネットワーク上に存在するすべてのブロックチェーンです。
* `name` はこのブロックチェーンの人間が読みやすい名前です。
* `id`はブロックチェーンのIDです。
* `subnetID` は、このブロックチェーンを検証する Subnet の ID です。
* `vmID`は、ブロックチェーンが実行する仮想マシンのIDです。

#### **Call 例**

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

Blockchainのステータスを取得します。

#### **JPS-JP-JP**

```cpp
platform.getBlockchainStatus(
    {
        blockchainID: string
    }
) -> {status: string}
```

`status` は次のいずれかです:

* `Validating`: ブロックチェーンがこのノードによって検証されています。
* `Created`: ブロックチェーンが存在しますが、このノードによって検証されていません。
* `Preferred`: ブロックチェーンが作成されることを提案され、作成される可能性が高いが、トランザクションはまだ受け入れられていません。
* `未知：`ブロックチェーンが提案されていないか、それを作成する提案が好ましくない。提案書は再提出する場合があります。

#### **Call 例**

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

### platform.getCurrentSupply.JP

AVAX の数字上限を返します。これは、トランザクション手数料を含む燃焼トークンにはアッパーバインドです。

#### **JPS-JP-JP**

```cpp
platform.getCurrentSupply() -> {supply: int}
```

* `supply`は、nAVAXで存在するAVAXの数上限です。

#### **Call 例**

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

この例の応答は、AVAXの供給量は最大365.865万円であることを示しています。

### platform.getCurrentValidators

指定した Subnet の現在のバリデーターを一覧表示します。

`トップレベルフィールドデリゲーター`はv1.0.1で[廃止さ](deprecated-api-calls.md#getcurrentvalidators)れ、v1.0.6で削除されました。代わりに、`validators`の各要素には、そのvalidatorのデリゲーターのリストが含まれています。

#### **JPS-JP-JP**

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

* `subnetID` は現在のバリデータが返されるサブネットです。省略した場合、Primary Networkの現在のバリデーターを返します。
* `nodeIDs` は、リクエストする現在のバリデーターの nodeID のリストです。JavaScript-JavaScript-JavaScript-JavaScript-Java指定されたnodeIDが現在のバリデーターのセットに含まれていない場合、レスポンスに含まれません。
* `validators`:
   * `txID`はバリデータトランザクションです。
   * `startTime` は、バリデータがSubnetの検証を開始する UNIX 時刻です。
   * `endTime` は、Subnet のバリデーションを停止する Unix 時間です。
   * `stakeAmount` はこのバリデータがステークしたnAVAXの量です。`subnetID` がプライマリネットワークでない場合に省略されます。
   * `nodeID` はバリデータのノードIDです。
   * `weight`はバリデーターの重みです。`subnetID` がプライマリネットワークである場合に省略されます。
   * `rewardOwner` は、`OutputOwners` 出力で`、ロックタイム、``閾値`、`およびアドレス`の配列を含む。
   * `potentialReward`は、ステーキングから得られる潜在的な報酬です。
   * `delegationFeeRate`は、他の人がステークを委任したときにこのバリデーターが課金するパーセント料金です。
   * `uptime` は、クエリーされたノードがピアをオンラインとして報告した時間の％です。
   * node がネットワークに接続されている場合、`connected` は
   * `delegators`はこのバリデータへのdelegatorsのリストです:
      * `txID`はデリゲータートランザクションです。
      * `startTime` は、デリゲーターが始まった Unix 時間です。
      * `endTime` は、デリゲータが停止する UNIX 時間です。
      * `stakeAmount` は、このデリゲーターがステークしたnAVAXの量です。`subnetID` がプライマリネットワークでない場合に省略されます。
      * `nodeID`はノードのノードIDです。
      * `rewardOwner` は、`OutputOwners` 出力で`、ロックタイム、``閾値`、`およびアドレス`の配列を含む。
      * `potentialReward`は、ステーキングから得られる潜在的な報酬です。
* `-`**-メソッドドキュメントの最上部にある注釈を参照してください。**\)

#### **Call 例**

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

### platform.getHeight-JP

JavaScript-JavaScript-JavaScript-JavaScript-Java

#### **JPS-JP-JP**

```cpp
platform.getHeight() ->
{
    height: int,
}
```

#### **Call 例**

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

Primary Networkの検証に必要なAVAXの最小量と、委任できるAVAXの最小量を取得します。

#### **JPS-JP-JP**

```cpp
platform.getMinStake() ->
{
    minValidatorStake : uint64,
    minDelegatorStake : uint64
}
```

#### **Call 例**

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

指定した Subnet の pending バリデータセットにバリデーターをリストします。各バリデータは現在、Subnetを検証していませんが、将来的には検証されます。

#### **JPS-JP-JP**

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

* `subnetID` は現在のバリデータが返されるサブネットです。省略した場合、Primary Networkの現在のバリデーターを返します。
* `nodeIDs` は、要求する保留中のバリデーターの nodeID のリストです。省略した場合、すべての保留中のバリデータが返されます。指定されたnodeIDが保留中のバリデーターのセットに含まれていない場合、レスポンスには含まれません。
* `validators`:
   * `txID`はバリデータトランザクションです。
   * `startTime` は、バリデータがSubnetの検証を開始する UNIX 時刻です。
   * `endTime` は、Subnet のバリデーションを停止する Unix 時間です。
   * `stakeAmount` はこのバリデータがステークしたnAVAXの量です。`subnetID` がプライマリネットワークでない場合に省略されます。
   * `nodeID` はバリデータのノードIDです。
   * Node が接続されている場合に`接続さ`れます。
   * `weight`はバリデーターの重みです。`subnetID` がプライマリネットワークである場合に省略されます。
* `デリゲーター`:
   * `txID`はデリゲータートランザクションです。
   * `startTime` は、デリゲータが起動するUNIXの時刻です。
   * `endTime` は、デリゲータが停止する UNIX 時間です。
   * `stakeAmount` は、このデリゲーターがステークしたnAVAXの量です。`subnetID` がプライマリネットワークでない場合に省略されます。
   * `nodeID`はノードのノードIDです。

#### **Call 例**

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

提供されたトランザクションのステーキングまたは委任期終了後に報酬を受けたUTXOを返します。

#### **JPS-JP-JP**

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

* `txID`は、ステーキングまたは委任トランザクションのIDです。
* `numFetched` は UTXO の数です。
* `utxos`は、エンコードされたリワードUTXOの配列です。
* `encoding` は、UTXO の書式を指定します。"cb58" または "hex" でも、デフォルト値は "cb58" です。

#### **Call 例**

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

サブネットのステーキングアセットのassetIDを取得します。現在、これはPrimary Networkのstaking assetIDのみを返します。

#### **JPS-JP-JP**

```cpp
platform.getStakingAssetID({
    subnetID: string //optional
}) -> {
    assetID: string
}
```

* `subnetID` は、assetID が要求されるサブネットです。
* `assetID`はサブネットのステーキングアセットのassetIDです。

#### **Call 例**

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

Subnets に関する情報を取得します。

#### **JPS-JP-JP**

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

* `ids` はサブネットの ID です。省略した場合、すべてのサブネットに関する情報を取得します。
* `id` は Subnet の ID です。
* `controlKeys` のアドレスからの`閾値`署名は、バリデーターをサブネットに追加する必要があります。

Subnet へのバリデーターの追加方法については[、こちら](../tutorials/nodes-and-staking/add-a-validator.md)をご覧ください。

#### **Call 例**

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

### platform.getStake.JP

NAVAXの値を取得します。返金された金額には、ステーキング報酬は含まれません。

#### **JPS-JP-JP**

```cpp
platform.getStake({addresses: []string}) -> {staked: int}
```

#### **Call 例**

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

### platform.getTotalStake

NAVAXの合計量をPrimary Networkに取得します。

#### **JPS-JP-JP**

```cpp
platform.getTotalStake() -> {stake: int}
```

#### **Call 例**

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

JavaScript-JavaScript-JavaScript-JavaScript-Java

JavaScript-JavaScript`-`JavaScript-JavaScript-JavaScript-JavaScript---デフォルトは "cb58" です。

#### **JPS-JP-JP**

```cpp
platform.getTx({
    txID: string,
    encoding: string //optional
}) -> {
    tx: string,
    encoding: string,
}
```

#### **Call 例**

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

トランザクションのステータスを ID で取得します。トランザクションがドロップされた場合、responseにはトランザクションがドロップさ`れ`た理由の詳細情報が含まれます。

以前の動作に関する注意事項は[こちら](deprecated-api-calls.md#gettxstatus)をご覧ください。

#### **JPS-JP-JP**

```cpp
platform.getTxStatus({
    txID: string
}) -> {status: string}
```

`status` は次のいずれかです:

* `Committed`: トランザクションはすべてのノードで \(または \) 受け入れられます。
* `Processing`: トランザクションはこのノードによって投票されています。
* `Dropped`:トランザクションはネットワーク内のどのノードでも受け入れられません。 `reason`フィールドで詳細情報を得ることができます。
* `Unknown`: このノードではトランザクションが見られませんでした

#### **Call 例**

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

JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-

#### **JPS-JP-JP**

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

* `utxos` は、各 UTXO `が`少なくとも 1 つのアドレスをアドレスに参照するような UTXO のリストです。
* JavaScript-JavaScript`-`JavaScript-JavaScript-Java`limit` が省略されたり、1024 より大きい場合は、1024 に設定されます。
* `endIndex`は、最後のUTXOを表します。次のUTXOを取得するには、次の呼び出しで`endIndex`の値を`startIndex`として使用します。
* `startIndex`が省略された場合、UTXOを最大`限`に取得します。
* Pagination \(すなわち `startIndex` が指定された場合\) を使用する場合、UTXO は複数の呼び出しで一意であることが保証されません。つまり、UTXOは最初の呼び出しの結果に表示され、その後2番目の呼び出しに再び表示されます。
* ページネーションを使用する場合、複数の呼び出しで一貫性が保証されません。つまり、アドレスのUTXOセットは、呼び出し間で変更された可能性があります。
* `encoding` は、UTXO の書式を指定します。"cb58" または "hex" でも、デフォルト値は "cb58" です。

#### **JPE-JP-JP**

`JavaScript``-JP-JP-`

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

これによりレスポンスが与えられます:

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

`numFetched` は `limit` と同じなので、フェッチされていない UTXO もっとあるかもしれないことを知ることができます。今回は`startIndex`でメソッドを再び呼び出します:

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

これによりレスポンスが与えられます:

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

`numFetched`は`制限`値より少ないので、UTXOを取得できており、このメソッドを再び呼び出す必要はありません。

ImportTxをビルドするためにXチェーンからPチェーンにエクスポートされたUTXOを取得したいとします。次に、アトミックUTXOを取得するために、sourceChain引数でGetUTXOを呼び出す必要があります。

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

これによりレスポンスが与えられます:

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

### Platform.importAVAX-JP

AVAXをX-ChainからP-Chainに転送します。

このメソッドが呼び出される前に、X-Chainの[`avm.exportAVAX`](exchange-chain-x-chain-api.md#avm-exportavax)メソッドを呼び出して転送を開始する必要があります。

#### **JPS-JP-JP**

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

* `to` は AVAX インポートしたアドレスの ID です。これはX-Chainの`exportAVAX`への対応する呼び出しの`to`引数と同じでなければなりません。
* `sourceChain` は、AVAX からインポートされるチェーンの ID またはエイリアスです。X-Chainから資金をインポートするには、`「X」`を使用します。
* `For` example, the component is any use-parallely.JavaScript-JP-JP-
* `changeAddr` は、変更が送信されるアドレスです。JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-
* `username` は`、指定`したアドレスを制御するユーザーです。
* `password` は`ユーザー名の`パスワードです。

#### **Call 例**

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

アドレスを制御する秘密鍵を指定することで、アドレスをユーザーに制御できます。

#### **JPS-JP-JP**

```cpp
platform.importKey({
    username: string,
    password: string,
    privateKey:string
}) -> {address: string}
```

* `usernameの`プライベートキーのセットに`privateKey`を追加します。`address`は、privateKeyで現在コントロールされているアドレス `username`です。

#### **Call 例**

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

### JP-JP-

Platform Chainにトランザクションを発行します。

#### **JPS-JP-JP**

```cpp
platform.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {txID: string}
```

* `tx` はトランザクションのバイト表現です。
* `encoding` はトランザクションバイトのためのエンコーディング形式を指定します。--デフォルトは "cb58" です。
* `txID`はトランザクションのIDです。

#### **Call 例**

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

指定したユーザーが制御するアドレスを一覧表示します。

#### **JPS-JP-JP**

```cpp
platform.listAddresses({
    username: string,
    password: string
}) -> {addresses: []string}
```

#### **Call 例**

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

指定したSubnetからバリデーターをサンプルします。

#### **JPS-JP-JP**

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

* `size` は、サンプルするバリデーターの数です。
* `subnetID` は、サンプリングする Subnet です。省略した場合、デフォルトはプライマリネットワークです。
* `Validators`の各要素は、ValidatorのIDです。

#### **Call 例**

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

特定のブロックチェーンを検証するSubnetを取得します。

#### **JPS-JP-JP**

```cpp
platform.validatedBy(
    {
        blockchainID: string
    }
) -> {subnetID: string}
```

* `blockchainID`はブロックチェーンのIDです。
* `subnetID` は、ブロックチェーンを検証する Subnet の ID です。

#### **Call 例**

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

Subnet 検証済みのブロックチェーンの ID を取得します。

#### **JPS-JP-JP**

```cpp
platform.validates(
    {
        subnetID: string
    }
) -> {blockchainIDs: []string}
```

* `subnetID` は Subnet の ID です。
* `blockchainID`の各要素は、Subnetが検証するブロックチェーンのIDです。

#### **Call 例**

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

