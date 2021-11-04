# 平台链（P-Chain） API

通过此 API，客户端可以与 [p-Chain](../../learn/platform-overview/#platform-chain-p-chain) 交互， p-Chain 保留 Avalanche 的[验证者](../../learn/platform-overview/staking.md#validators)集并处理区块链的创建。

## 端点

```cpp
/ext/P
```

## 格式

本 API 使用 `json 2.0`RPC 格式。

## 方法

### platform.addDelegator

向主网络添加委托人。

委托人质押 AVAX，并指定验证者（代理）代表他们进行验证。受托人被其他验证者（权重）按委托给他们的权益的比例进行取样的概率增加。

受托人向委托人收取费用：前者从委托人获得一定比例的验证奖励（如果有的话）。委托质押的交易不收取任何费用。

委托期必须是受托人验证主网络的周期的子集。

请注意，一旦发布交易将节点添加为委托人，则无法更改参数。**您不能提前移除您的权益，或更改权益金额、节点 ID 或奖励地址。**请确保您使用正确的值。如果您不确定，请查看我们的[开发人员常见问题解答](https://support.avalabs.org/en/collections/2618154-developer-faq)，或在 [Discord](https://chat.avalabs.org/) 上寻求帮助。

{% page-ref page="../../learn/platform-overview/staking.md" %}

#### **签名**

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

* `nodeID` 是要委托到的节点的 ID。
* `startTime`是委托人开始委托的 Unix 时间。
* `endTime`是委托人停止委托的 Unix 时间（并且返回质押的 AVAX）。
* `stakeAmount`是委托人质押的 nAVAX 数量。
* `rewardAddress`是验证者奖励要转到的地址（如果有）。
* `from`是您想用于本操作的地址。如果被省略，请根据需要使用您的任何地址。
* `changeAddr` 是任何更改将被发送到的地址。如果被省略，则将更改发送到由用户控制的地址。
* `username`是支付交易费的用户。
* `password` 是 `username` 的密码。
* `txID`是交易 ID

#### **示例调用**

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

#### **示例响应**

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

向主网络添加验证者。您必须质押 AVAX 才能做到这一点。如果在验证时节点足够正确且响应迅速，您在质押期限结束时将获得奖励。验证者在共识期间被其他验证者抽样的概率与 AVAX 质押数量成比例。

验证者向委托人收取费用。前者收到一定比例的委托人验证奖励（如果有）。最低委托费为 2%。添加验证者的交易无费用。

验证期必须在 2 周至 1 年之间。

对验证者施加了最大总权重。这意味着任何验证者的质押和委托 AVAX 不会超过这个值。此值最初将被设置为 `min(5 * amount staked, 3M AVAX)`。验证者的总值为 300 万 AVAX。

注意，一旦您发布交易将节点添加为验证者，就无法更改参数。**        您不能提前移除您的权益，或更改权益金额、节点 ID 或奖励地址。**请确保您使用正确的值。如果您不确定，请查看我们的[开发人员常见问题解答](https://support.avalabs.org/en/collections/2618154-developer-faq)，或在 [Discord](https://chat.avalabs.org/) 上寻求帮助。

{% page-ref page="../../learn/platform-overview/staking.md" %}

#### **签名**

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

* `nodeID`是要添加的验证者的节点 ID。
* `startTime`是验证者开始验证主网络时的 Unix 时间。
* `endTime`是验证者停止验证主网络时的 Unix 时间（并且返回质押的 AVAX）。
* `stakeAmount`是验证者质押的 nAVAX 金额。
* `rewardAddress`是验证者奖励将要到达的地址（如果有）。
* `delegationFeeRate`是其他人将权益委托给验证者时，验证者收取的费用比例。最多允许 4 个小数点；其他小数点被忽略。必须在 0 到 100 之间，包括 0 和 100。例如，如果 `delegationFeeRate` 是 `1.2345`，且某人将其权益委托给验证者，那么在委托期结束时，验证者将收到奖励费的 1.2345%，其余的归委托人所有。
* `from`是您想用于本操作的地址。如果被省略，请根据需要使用您的任何地址。
* `changeAddr` 是任何更改将被发送到的地址。如果被省略，则将更改发送到由用户控制的地址。
* `username`是支付交易费的用户。
* `password` 是 `username` 的密码。
* `txID`是交易 ID

#### **示例调用**

在本实例中，我们使用 shell 命令`date`来计算未来 10 分钟和 2 天的  Unix 时间。（注意：如果您在 Mac 上，请将 `$(date` 替换为 `$(gdate`。如果没有安装 `gdate`，请执行 `brew install coreutils`。）

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

#### **示例响应**

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

向主网络以外的子网添加验证者。验证者必须在验证子网的整个过程中验证主网络。

#### **签名**

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

* `nodeID`是验证者的节点 ID。
* `subnetID`是他们将验证的子网。
* `startTime`是验证者开始验证子网时的 Unix 时间。
* `endTime`是验证者停止验证子网时的 Unix 时间。
* `weight`是用于取样的验证者的权重。
* `from`是您想用于本操作的地址。如果被省略，请根据需要使用您的任何地址。
* `changeAddr` 是任何更改将被发送到的地址。如果被省略，则将更改发送到由用户控制的地址。
* `username`是支付交易费的用户。
* `password` 是 `username` 的密码。
* `txID`是交易 ID。

#### **示例调用**

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

#### **示例响应**

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

创建由给定用户控制的新地址。

#### **签名**

```cpp
platform.createAddress({
    username: string,
    password: string
}) -> {address: string}
```

#### **示例调用**

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

#### **示例响应**

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

创建新的区块链。目前只支持创建 AVM 和 Timestamp VM 的新实例。

#### **签名**

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

* `subnetID`是验证新区块链的子网的 ID。子网必须存在且不能是主网络。
* `vmID`是区块链运行的虚拟机的 ID。也可以是虚拟机的别名。
* `name`是新区块链的人类可读名称。不一定是唯一的。
* `genesisData`是以 `encoding` 参数指定的格式编码的新区块链 genesis 状态的字节表达式。
* `encoding`指定用于 `genesisData` 的格式。可以是“cb58”或“hex”。默认为“cb58”。虚拟机应该有一个名为 `buildGenesis` 的静态 API 方法，可以用于生成 `genesisData`
* `from`是您想用于本操作的地址。如果被省略，请根据需要使用您的任何地址。
* `changeAddr` 是任何更改将被发送到的地址。如果被省略，则将更改发送到由用户控制的地址。
* `username`是支付交易费的用户。此用户必须拥有足够数量的子网控制密钥。
* `password` 是 `username` 的密码。
* `txID`是交易 ID。

#### **示例调用**

在此示例中，我们创建了时间戳虚拟机的新实例。`genesisData` 来自调用 `timestamp.buildGenesis`。

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

#### **示例响应**

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

创建新的子网。

子网的 ID 与本交易的 ID 相同。

#### **签名**

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

* 为了将验证者添加到此子网，需要从 `threshold`中的地址进行`controlKeys`签名。
* `from`是您想用于本操作的地址。如果被省略，请根据需要使用您的任何地址。
* `changeAddr` 是任何更改将被发送到的地址。如果被省略，则将更改发送到由用户控制的地址。
* `username`是支付交易费的用户。
* `password` 是 `username` 的密码。

#### **示例调用**

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

#### **示例响应**

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

将 AVAX 从 P-Chain 上的地址发送到 X-Chain 上的地址。发布此交易后，您必须调用 X-Chain 的 [`avm.importAVAX`](exchange-chain-x-chain-api.md#avm-importavax) 方法以完成转移。

#### **签名**

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

* `amount`是要发送的 nAVAX 数量。
* `to`是将 AVAX 发送到的 X-Chain 上的地址。
* `from`是您想用于本操作的地址。如果被省略，请根据需要使用您的任何地址。
* `changeAddr` 是任何更改将被发送到的地址。如果被省略，则将更改发送到由用户控制的地址。
* `username`是发送 AVAX 并支付交易费的用户。
* `password` 是 `username` 的密码。
* `txID`是本交易的 ID。

#### **示例调用**

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

#### **示例响应**

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

获取控制给定地址的私钥。  可以使用 [`platform.importKey`](platform-chain-p-chain-api.md#platform-importkey) 将返回的私钥添加到用户。

#### **签名**

```cpp
platform.exportKey({
    username: string,
    password: string,
    address: string
}) -> {privateKey: string}
```

* `username` 是控制 `address` 的用户。
* `password` 是 `username` 的密码。
* `privateKey` 是控制 `address` 的私钥的字符串表达式。

#### **示例调用**

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

#### **示例响应**

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

获取由给定地址控制的 AVAX 的余额。

#### **签名**

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

* `address`是获取余额的地址。
* `balance`是余额总数，以 nAVAX 为单位。
* `unlocked`是未锁定余额，以 nAVAX 为单位。
* `lockedStakeable`是锁定的可质押余额，以 nAVAX 为单位。
* `lockedNotStakeable`是锁定而非可质押余额，以 nAVAX 为单位。
* `utxoIDs` 是引用 `address` 的 UTXO 的 ID。

#### **示例调用**

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

#### **示例响应**

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

获取所有存在的区块链（不包括 P-Chain）。

#### **签名**

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

* `blockchains`是 Avalanche 网络上存在的所有区块链。
* `name`是本区块链的人类可读名称。
* `id`是区块链的 ID。
* `subnetID`是验证本区块链的子网的 ID。
* `vmID`是区块链运行的虚拟机的 ID。

#### **示例调用**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getBlockchains",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **示例响应**

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

获取区块链的状态。

#### **签名**

```cpp
platform.getBlockchainStatus(
    {
        blockchainID: string
    }
) -> {status: string}
```

`status`是其中之一：

* `Validating`：区块链正在由本节点验证。
* `Created`：区块链存在，但没有被本节点验证。
* `Preferred`：曾经提议创建区块链而且很有可能创建，但交易尚未被接受。
* `Unknown`：区块链要么没有被提议，要么创建区块链的提议不是首选。可以重新提交提议。

#### **示例调用**

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

#### **示例响应**

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

返回存在的 AVAX 数量的上限。这是一个上限，因为没有考虑到销毁的代币，包括交易费用。

#### **签名**

```cpp
platform.getCurrentSupply() -> {supply: int}
```

* `supply`是存在的 AVAX 数量的上限，以 nAVAX 为单位。

#### **示例调用**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getCurrentSupply",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **示例响应**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "supply": "365865167637779183"
    },
    "id": 1
}
```

此示例的响应表明 AVAX 的供应最多为 3.65865 亿。

### platform.getCurrentValidators

列出给定子网的当前验证者。

顶层字段在 v1.0.1 中`delegators`已[被弃用](deprecated-api-calls.md#getcurrentvalidators)，在 v1.0.6 中已被删除。相反，现在 `validators` 的每个元素都包含用于验证者的委托人列表。

#### **签名**

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

* `subnetID`是返回的当前验证者的子网。如果被省略，返回主网络的当前验证者。
* `nodeIDs`是要请求的当前验证者的 nodeID 列表。如果被省略，则返回所有当前的验证者。如果指定的 nodeID 不在当前验证者的集合中，则它将不会包含在响应中。
* `validators`：
   * `txID`是验证者交易。
   * `startTime`是验证者开始验证子网时的 Unix 时间。
   * `endTime`是验证者停止验证子网时的 Unix 时间。
   * `stakeAmount`是此验证者质押的 nAVAX 数量。如果 `subnetID` 不是主网络，则被省略。
   * `nodeID`是验证者的节点 ID。
   * `weight`是验证者取样时验证者的权重。如果`subnetID`是主网络，则被省略。
   * `rewardOwner` 是一种 `OutputOwners` 输出，其中包括 `locktime`、`threshold` 和 `addresses` 的数组。
   * `potentialReward`是质押产生的潜在奖励。
   * `delegationFeeRate`是其他人将权益委托给验证者时，验证者收取的费用比例。
   * `uptime` 是被查询的节点报告在线对等的时间百分比。
   * `connected`是如果节点连接到网络。
   * `delegators`是此验证者的委托人列表：
      * `txID`是委托人交易。
      * `startTime`是委托人开始时的 Unix 时间。
      * `endTime`是委托人停止时的 Unix 时间。
      * `stakeAmount`是此委托人质押的 nAVAX 数量。如果 `subnetID` 不是主网络，则被省略。
      * `nodeID`是验证节点的节点 ID。
      * `rewardOwner` 是一种 `OutputOwners` 输出，其中包括 `locktime`、`threshold` 和 `addresses` 的数组。
      * `potentialReward`是质押产生的潜在奖励。
* `delegators`：**从 v1.0.1 开始已弃用。请参阅方法文档顶部的注释。**

#### **示例调用**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getCurrentValidators",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **示例响应**

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

返回最后接受的区块的高度。

#### **签名**

```cpp
platform.getHeight() ->
{
    height: int,
}
```

#### **示例调用**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getHeight",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **示例响应**

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

获取验证主网络所需的最低数量 AVAX 和可以委托的最低数量 AVAX。

#### **签名**

```cpp
platform.getMinStake() ->
{
    minValidatorStake : uint64,
    minDelegatorStake : uint64
}
```

#### **示例调用**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getMinStake"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **示例响应**

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

列出指定子网的待定验证者集合中的验证者。每个验证者目前都没有验证子网，而是未来将验证。

#### **签名**

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

* `subnetID`是返回的当前验证者的子网。如果被省略，返回主网络的当前验证者。
* `nodeIDs`是要请求的待定验证者的 nodeID 列表。如果被省略，则返回所有待定验证者。如果指定的 nodeID 不在待定验证者集合中，则它将不会包含在响应中。
* `validators`：
   * `txID`是验证者交易。
   * `startTime`是验证者开始验证子网时的 Unix 时间。
   * `endTime`是验证者停止验证子网时的 Unix 时间。
   * `stakeAmount`是此验证者质押的 nAVAX 数量。如果 `subnetID` 不是主网络，则被省略。
   * `nodeID`是验证者的节点 ID。
   * `connected`如果节点已连接。
   * `weight`是验证者取样时验证者的权重。如果`subnetID`是主网络，则被省略。
* `delegators`：
   * `txID`是委托人交易。
   * `startTime`是委托人开始时的 Unix 时间。
   * `endTime`是委托人停止时的 Unix 时间。
   * `stakeAmount`是此委托人质押的 nAVAX 数量。如果 `subnetID` 不是主网络，则被省略。
   * `nodeID`是验证节点的节点 ID。

#### **示例调用**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **示例响应**

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

返回在提供的交易质押或委托期结束后获得奖励的 UTXO。

#### **签名**

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

* `txID`是质押或委托交易的 ID。
* `numFetched`是返回的 UTXO 的数量。
* `utxos`是一组已编码的奖励 UTXO。
* `encoding`指定返回的 UTXO 的格式。可以是“cb58”或“hex”，默认为“cb58”。

#### **示例调用**

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

#### **示例响应**

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

检索子网质押资产的 assetID。目前仅返回主网络的质押 assetID。

#### **签名**

```cpp
platform.getStakingAssetID({
    subnetID: string //optional
}) -> {
    assetID: string
}
```

* `subnetID`是请求的 assetID 的子网。
* `assetID`是子网质押资产的 assetID。

#### **示例调用**

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

#### **示例响应**

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

获取有关子网的信息。

#### **签名**

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

* `ids`是要获取信息的子网的 ID。如果被省略，请获取有关所有子网的信息。
* `id`是子网的 ID。
* `threshold`要向子网中添加验证者，需要来自 `controlKeys` 中的地址的签名。

请参阅[此处](../tutorials/nodes-and-staking/add-a-validator.md)了解将验证者添加到子网的有关信息。

#### **示例调用**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getSubnets",
    "params": {"ids":["hW8Ma7dLMA7o4xmJf3AXBbo17bXzE7xnThUd3ypM4VAWo1sNJ"]},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **示例响应**

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

获取通过一组地址质押的 nAVAX 数量。返回的金额不包含质押奖励。

#### **签名**

```cpp
platform.getStake({addresses: []string}) -> {staked: int}
```

#### **示例调用**

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

#### **示例响应**

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

获取当前的 P-Chain 时间戳。

#### **签名**

```cpp
platform.getTimestamp() -> {time: string}
```

#### **示例调用**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTimestamp",
    "params": {},
    "id": 1
}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **示例响应**

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

获取质押在主网络上的 nAVAX 总数量。

#### **签名**

```cpp
platform.getTotalStake() -> {stake: int}
```

#### **示例调用**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTotalStake",
    "params": {},
    "id": 1
}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **示例响应**

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

通过 ID 获取交易。

用于指定返回交易的格式的可选 `encoding` 参数。可以是“cb58”或“hex”。默认为“cb58”。

#### **签名**

```cpp
platform.getTx({
    txID: string,
    encoding: string //optional
}) -> {
    tx: string,
    encoding: string,
}
```

#### **示例调用**

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

#### **示例响应**

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

通过 ID 获取交易状态。如果交易被撤销，响应包含带有交易被撤销原因的更多信息的`reason`字段。

请参阅[此处](deprecated-api-calls.md#gettxstatus)了解以前行为的注释。

#### **签名**

```cpp
platform.getTxStatus({
    txID: string
}) -> {status: string}
```

`status` 是其中之一：

* `Committed`：交易已被（或将要被）每个节点接受
* `Processing`：交易正在由本节点投票表决。
* `Dropped`：交易永远不会被网络中的任何节点接受，请查看 `reason` 字段以了解更多信息。
* `Unknown`：交易尚未被本节点查看。

#### **示例调用**

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

#### **示例响应**

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

获取引用给定地址集的 UTXO。

#### **签名**

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

* `utxos` 是一个 UTXO 列表，以便每个 UTXO 在 `addresses` 中引用至少一个地址。
* 最多返回 `limit` 个 UTXO。如果 `limit` 被省略或大于 1024，则将其设置为 1024。
* 本方法支持页码。`endIndex` 表示最后一次返回的 UTXO。要获取下一个 UTXO 集，请在下次调用中使用 `endIndex` 的值作为 `startIndex`。
* 如果 `startIndex` 被省略，将获取所有 UTXO，最多 `limit` 个。
* 当使用页码时（即提供 `startIndex` 时）时，无法保证 UTXO 在多个调用中是独一无二的。也就是说，一个 UTXO 可能出现在第一次调用的结果中，然后在第二次调用中再次出现。
* 使用页码时，不能保证多个调用之间的一致性。也就是说，地址的 UTXO 集可能在调用之间发生变化。
* `encoding`指定返回的 UTXO 的格式。可以是“cb58”或“hex”，默认为“cb58”。

#### **示例**

假设我们希望至少引用一个 `P-avax1s994jad0rtwvlfpkpyg2yau9nxt60qqfv023qx` 和 `P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr` 的所有 UTXO。

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

这给出响应：

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

由于 `numFetched` 与 `limit` 相同，我们可以判断可能有更多未提取的 UTXO。我们再次调用方法，这次通过 `startIndex` 调用：

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

这给出响应：

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

由于 `numFetched` 小于 `limit`，我们知道我们已经完成了 UTXO 的获取，无需再次调用本方法。

假设我们想从 X Chain 获取导出到 P Chain 的 UTXO，以创建 ImportTx。然后，我们需要使用 sourceChain 参数调用 GetUTXO，以便检索原子 UTXO：

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

这给出响应：

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

获取处于给定 P-Chain 高度的子网或主网的验证者及其加权。

#### **签名**

```cpp
platform.getValidatorsAt(
    {
        height: int,
        subnetID: string, // optional
    }
)
```

* `height` 是获取验证者集的 P-Chain 高度。
* `subnetID` 是获取验证者集的子网 ID。如果没有给定，则获取主网的验证者集。

#### **示例调用**

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

#### **示例响应**

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

完成从 X-Chain 到 P-Chain 的 AVAX 转移。

调用此方法之前，您必须调用 X-Chain 的 [`avm.exportAVAX`](exchange-chain-x-chain-api.md#avm-exportavax) 方法启动转移。

#### **签名**

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

* `to`是 AVAX 导入到的地址的 ID。这必须与对 X-Chain 的`to` 的相应调用中的 `exportAVAX` 参数相同。
* `sourceChain`是导入 AVAX 所在的链的 ID 或别名。要从 X-Chain 导入资金，请使用 `"X"`。
* `from`是您想用于本操作的地址。如果被省略，请根据需要使用您的任何地址。
* `changeAddr` 是任何更改将被发送到的地址。如果被省略，则将更改发送到由用户控制的地址。
* `username` 是控制 `to` 中指定的地址的用户。
* `password` 是 `username` 的密码。

#### **示例调用**

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

#### **示例响应**

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

通过提供控制地址的私钥，让用户控制地址。

#### **签名**

```cpp
platform.importKey({
    username: string,
    password: string,
    privateKey:string
}) -> {address: string}
```

* 将 `privateKey` 添加到 `username` 的私钥集 。`address` 是现在通过私钥控制的地址 `username`。

#### **示例调用**

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

#### **示例响应**

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

向平台链发出交易。

#### **签名**

```cpp
platform.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {txID: string}
```

* `tx`是交易的字节表达式。
* `encoding`指定交易字节的编码格式。可以是“cb58”或“hex”。默认为“cb58”。
* `txID`是交易 ID。

#### **示例调用**

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

#### **示例响应**

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

列出由给定用户控制的地址。

#### **签名**

```cpp
platform.listAddresses({
    username: string,
    password: string
}) -> {addresses: []string}
```

#### **示例调用**

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

#### **示例响应**

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

从指定子网对验证者取样。

#### **签名**

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

* `size`是要取样的验证者数量。
* `subnetID`是从中取样的子网。如果被省略，默认为主网络。
* `validators`的每个元素是验证者的 ID。

#### **示例调用**

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

#### **示例响应**

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

获取验证给定区块链的子网。

#### **签名**

```cpp
platform.validatedBy(
    {
        blockchainID: string
    }
) -> {subnetID: string}
```

* `blockchainID`是区块链的 ID。
* `subnetID`是验证区块链的子网的 ID。

#### **示例调用**

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

#### **示例响应**

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

获取子网验证的区块链的 ID。

#### **签名**

```cpp
platform.validates(
    {
        subnetID: string
    }
) -> {blockchainIDs: []string}
```

* `subnetID`是子网的 ID。
* `blockchainIDs`的的每个元素是子网验证的区块链的 ID。

#### **示例调用**

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

#### **示例响应**

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

