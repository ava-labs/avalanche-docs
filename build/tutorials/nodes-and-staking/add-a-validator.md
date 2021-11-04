# 将节点添加到验证者集

## 简介

[主网络](https://avalanche.gitbook.io/avalanche/build/tutorials/platform/add-a-validator#introduction)是 Avalanche 平台所固有，并验证 Avalanche 的[内置区块链](https://avalanche.gitbook.io/avalanche/learn/platform-overview)。在本教程中，我们将把一个节点添加到 Avalanche 的主网络和一个[子网](https://avalanche.gitbook.io/avalanche/learn/platform-overview#subnets)。

P-Chain 管理 Avalanche 上的元数据。这包括跟踪哪些节点在哪些子网中，存在哪些区块链，以及哪些子网在验证哪些区块链。为添加验证者，我们将向 P-Chain 发出[交易](http://support.avalabs.org/en/articles/4587384-what-is-a-transaction)。

{% hint style="danger" %}注意，一旦您发布交易将节点添加为验证者，就无法更改参数。**        您不能提前移除您的质押，或更改质押金额、节点 ID 或奖励地址。**请确保在下面的 API 调用中使用正确的数值。如果您不确定，请阅读[开发人员常见问题解答](http://support.avalabs.org/en/collections/2618154-developer-faq)，或在 [Discord](https://chat.avalabs.org/) 上求助。{% endhint %}

## 要求

您完成了 [Avalanche 节点运行](run-avalanche-node.md)流程，熟悉了 [Avalanche 的架构](../../../learn/platform-overview/)。在本教程中，我们使用 [Avalanche Postman系列](https://github.com/ava-labs/avalanche-postman-collection)来进行 API 调用。

为确保您的节点连接良好，请确保您的节点能够通过质押端口（默认为 `9651`）接收和发送 TCP 流量，并且以命令行参数 `--public-ip=[YOUR NODE'S PUBLIC IP HERE]` 启动节点。做不到上面任何一点都可能危及您的质押奖励。

## 用 Avalanche 钱包添加验证者

首先我们向您展示如何使用 [Avalanche 钱包](https://wallet.avax.network)，将您的节点添加为验证者。

调用 [`info.getNodeID`](https://avalanche.gitbook.io/avalanche/build/apis/info-api#info-getnodeid) 以获取您的节点 ID：

![getNodeID postman](../../../.gitbook/assets/getNodeID-postman.png)

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

响应中包含了您的节点 ID：

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "nodeID": "NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD"
    },
    "id": 1
}
```

打开[钱包](https://wallet.avax.network/)，然后转到 `Earn` 选项卡，选择 `Add Validator`。

![Web 钱包赚钱选项卡](../../../.gitbook/assets/web-wallet-earn-tab.png)

填写质押参数。下面有详细说明。当您填写了所有质押参数并反复核对后，请单击 `Confirm`。确保质押期至少为 2 周，委托费率至少为 2%，至少质押 2000 AVAX。

{% page-ref page="../../../learn/platform-overview/staking.md" %}

![赚钱验证](../../../.gitbook/assets/earn-validate.png)

您应该看到了此次操作成功的提示，您的余额应该已更新。

![您的验证交易已发出](../../../.gitbook/assets/your-validation-transaction-is-sent.png)

调用 [`platform.getPendingValidators`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-getpendingvalidators) 验证我们的交易已被接受。

![getPendingValidators postman](../../../.gitbook/assets/getPendingValidators-postman.png)

回到 `Earn` 选项卡，然后单击 `Estimated Rewards`。

![赚钱、验证、委托](../../../.gitbook/assets/earn-validate-delegate.png)

您的验证者开始时间已过，您将看到可能赚取的奖励及其开始时间和结束时间，以及已过验证期的百分比。

![估计的奖励](../../../.gitbook/assets/estimated-rewards.png)

就是这样！

## 通过 API 调用，添加验证者

我们还可以对节点进行 API 调用，向验证者集添加节点。要向主网添加节点，我们将调用 [`platform.addValidator`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-addvalidator)。

这种方法的签名是：

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

我们一起回顾审视这些参数。

`nodeID`

这是要添加的验证者的节点 ID。要获取您的节点 ID，请调用 [`info.getNodeID`](https://avalanche.gitbook.io/avalanche/build/apis/info-api#info-getnodeid)：

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "info.getNodeID",
    "params":{},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

响应中包含了您的节点 ID：

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "nodeID": "NodeID-LMUue2dBBRWdDbPL4Yx47Ps31noeewJji"
    },
    "id": 1
}
```

`startTime`和`endTime`

在发出交易以加入主网络时，他们会指定进入（开始验证）时间和离开（停止验证）时间。主网络验证的持续时间最少为 24 小时，最长为一年。离开后可以重新进入主网络，只不过_持续_时间至多为一年。`startTime` 与 `endTime` 分别是您的验证者开始和停止验证主网络的 Unix 时间。`startTime` 必须在相对于交易发布时间的未来。

`stakeAmount`

要验证主网络，必须质押 AVAX。此参数定义 AVAX 质押数量。

`rewardAddress`

验证者停止验证主网络时，如果在验证主网络时反应充分且正确，就会获得奖励。这些代币会发送到 `rewardAddress`。原始质押将发回由 `username` 控制的地址。

无论验证者的行为如何，其质押永远不会减少。完成验证后，他们一定会收到自己的质押。

`changeAddr`

此交易所产生的任何变更都将发送到这个地址。您可以将本字段留空。留空后，所做的变更将被发送到您的用户控制的某个地址。

`delegationFeeRate`

Avalanche 允许质押委托。 此参数是其他人将质押委托给验证者时，验证者收取的费用百分比。例如，如果 `delegationFeeRate` 是 `1.2345`，且某人将其质押委托给验证者，那么在委托期结束时，验证者将收到奖励的 1.2345%，其余的归委托人所有。

`username`和`password`

这些参数是相关用户的用户名和密码。该用户负责支付交易费，提供质押的 AVAX，接收被退回的质押 AVAX。

现在，我们发出交易。我们用 shell 命令 `date` 计算未来 10 分钟和 30 天的 Unix 时间，作为 `startTime` 和 `endTime` 的数值。（注意：Mac 用户请将 `$(date` 替换为 `$(gdate`。如果没有安装 `gdate`，请执行 `brew install coreutils`。）在本示例中，我们质押 2000 AVAX（2 x 1012 nAVAX）。

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

响应中包含交易 ID，以及更改发送到的地址。

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

我们可以调用 [`platform.getTxStatus`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-gettxstatus) 来查看交易状态：

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

状态应该是 `Committed`，表示交易成功。我们可以调用 [`platform.getPendingValidators`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-getpendingvalidators)，看到该节点目前位于主网络的待定验证者集中：

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

响应中应该包含刚刚添加的节点：

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

当时间到达 `1584021450` 时，该节点开始验证主网络。当到达 `1584121156` 时，该节点停止验证主网络。质押的 AVAX 将退回到由 `username` 控制的地址，奖励（如有）将发到 `rewardAddress`。

## 将验证者添加到子网

本[教程](../platform/create-a-subnet.md#adding-subnet-validators)将向您展示如何将验证者添加到子网。