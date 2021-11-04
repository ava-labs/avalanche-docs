# 创建子网

## 简介

[子网](../../../learn/platform-overview/#subnets)是一组验证者。子网对一组区块链进行验证。每个区块链完全由一个子网验证，这在区块链创建之时便已指定。子网是一个强大的基元，能够创建有权限的区块链。

在创建子网时，指定一个阈值和一组密钥。（实际上指定的是密钥的地址，而不是密钥本身）。为了将验证者添加到该子网，需要来自这些密钥的_阈值_签名。我们将其称作是子网的** 控制密钥**，我们将一项交易（将验证者添加到子网）中的控制密钥签名称作是**控制签名**。结果是子网可以控制其成员。

在本教程中，我们将创建具有 2 个控制密钥和阈值为 2 的新子网。

_注意：每个运行/网络的区块链、子网、交易和地址的 ID 都可能不同。这意味着当您尝试时，教程中的一些输入、端点等可能不同。_

### 生成控制密钥 <a id="generate-the-control-keys"></a>

首先，我们生成 2 个控制密钥。为此，我们调用 [`platform.createAddress`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createaddress)，这会为用户生成并存储一个新私钥。

要生成第一个密钥：

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createAddress",
    "params": {
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

这会给出第一个控制密钥（同样，这实际上会给出第一个控制密钥的_地址 _）。密钥由我们刚指定的用户持有。

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "P-avax1spnextuw2kfzeucj0haf0e4e08jd4499gn0zwg"
    },
    "id": 1
}
```

生成第二个密钥：

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createAddress",
    "params": {
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

响应包含第二个控制密钥，由我们刚指定的用户持有：

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "P-avax1zg5uhuwfrf5tv852zazmvm9cqratre588qm24z"
    },
    "id": 1
}
```

### 创建子网 <a id="create-the-subnet"></a>

要创建子网，我们调用 [`platform.createSubnet`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createsubnet)。

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createSubnet",
    "params": {
        "controlKeys":[
            "P-avax1spnextuw2kfzeucj0haf0e4e08jd4499gn0zwg",
            "P-avax1zg5uhuwfrf5tv852zazmvm9cqratre588qm24z"
        ],
        "threshold":2,
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

响应会给出交易 ID，这也是新创建子网的 ID。

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "3fbrm3z38NoDB4yMC3hg5pRvc72XqnAGiu7NgaEp1dwZ8AD9g",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

### 验证是否成功 <a id="verifying-success"></a>

我们可以调用 [`platform.getSubnets`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getsubnets) 以获取已存在的所有子网：

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getSubnets",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

响应会确认我们的子网已创建：

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "subnets": [
            {
                "id": "3fbrm3z38NoDB4yMC3hg5pRvc72XqnAGiu7NgaEp1dwZ8AD9g",
                "controlKeys": [
                    "KNjXsaA1sZsaKCD1cd85YXauDuxshTes2",
                    "Aiz4eEt5xv9t4NCnAWaQJFNz5ABqLtJkR"
                ],
                "threshold": "2"
            }
        ]
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

### 添加子网验证者<a id="adding-subnet-validators"></a>

### 发布子网验证者交易

现在，将验证者添加到子网。现在，您只能通过 API 调用将验证者添加到子网中，不能通过 Avalanche Wallet 添加。

假设子网有 ID `3fbrm3z38NoDB4yMC3hg5pRvc72XqnAGiu7NgaEp1dwZ8AD9g`、阈值 2，而且 `username` 至少有两个控制密钥。

要添加验证者，我们将调用 API 方法 [`platform.addSubnetValidator`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-addsubnetvalidator)。其签名为：

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

我们来检查参数：

`nodeID`

这是要添加到子网的验证者的节点 ID。**此验证者必须在其验证此子网的完整持续时间内验证主网络。**

`subnetID`

这是我们将添加验证者到的子网的 ID。

`startTime`和`endTime`

与上面类似，这些是验证者开始和停止验证子网的 Unix 时间。`startTime` 必须是在验证者开始验证主网络的当时或之后，`endTime` 必须是在验证者停止验证主网络的当时或之前。

`weight`

这是验证者的共识采样权重。如果验证者的权重为 1，子网中所有验证者的累积权重为 100，那么在共识期间，大约每 100 次采样中会有 1 个该验证者样本。子网中所有验证者的累积权重必须至少为 `snow-sample-size`。例如，如果子网中只有一个验证者，其权重必须至少为 `snow-sample-size`（默认为 20）。回想一下，验证过程中验证者的权重无法理发，请小心使用适当的数值。

`changeAddr`

此交易所产生的任何变更都将发送到这个地址。您可以将本字段留空。留空后，所做的变更将被发送到您的用户控制的某个地址。

`username`和`password`

这些参数是支付交易费用的用户的用户名和密码。该用户必须持有足够数量的子网控制密钥，才能将验证者添加到此子网中。

我们用 shell 命令 `date` 计算未来 10 分钟和 30 天的 Unix 时间，作为 `startTime` 和 `endTime` 的数值。（注意：Mac 用户请将 `$(date` 替换为 `$(gdate`。如果没有安装 `gdate`，请执行 `brew install coreutils`。）

示例：

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.addSubnetValidator",
    "params": {
        "nodeID":"NodeID-LMUue2dBBRWdDbPL4Yx47Ps31noeewJji",
        "subnetID":"3fbrm3z38NoDB4yMC3hg5pRvc72XqnAGiu7NgaEp1dwZ8AD9g",
        "startTime":'$(date --date="10 minutes" +%s)',
        "endTime":'$(date --date="30 days" +%s)',
        "weight":30,
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

响应中包含交易 ID，以及更改发送到的地址。

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

我们可以调用 [`platform.getTxStatus`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-gettxstatus) 来查看交易状态：

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

状态应该是 `Committed`，表示交易成功。我们可以调用 [`platform.getPendingValidators`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-getpendingvalidators)，看到该节点目前位于主网络的待定验证者集中。这次，我们指定子网 ID：

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {"subnetID":"3fbrm3z38NoDB4yMC3hg5pRvc72XqnAGiu7NgaEp1dwZ8AD9g"},
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
                "startTime":1584042912,
                "endTime":1584121156,
                "weight": "30"
            }
        ]
    },
    "id": 1
}
```

当时间到达 `1584042912` 时，该节点开始验证此子网。当到达 `1584121156` 时，该节点停止验证此子网。

### 私有子网

Avalanche 子网是公共的。这意味着每个节点都可以同步并监听子网中持续进行的交易/区块，即使它们都没有验证被监听的子网。

子网验证者/信标可以选择不通过可选的 `validatorOnly` 配置发布区块链的内容。可以通过[子网配置](../../references/command-line-interface.md#subnet-configs)开启配置。如果节点将 `validatorOnly` 设置为 `true`，则该节点仅与此子网的验证者交换消息。其他对等点将无法从此节点了解此子网的内容。

注意：这是节点特定的配置。此子网的每个验证者都必须使用此配置，以创建完整的私有子网。

### 将子网列入白名单

至此，该节点已被添加为子网验证者，我们将它添加到子网白名单。白名单可以防止节点无意中验证子网。

要将子网列入白名单，请重新启动节点，用一个逗号分隔的子网列表，将参数 `--whitelisted-subnets` 添加到白名单。

在本示例中，完整的命令是：

`./build/avalanchego --whitelisted-subnets=3fbrm3z38NoDB4yMC3hg5pRvc72XqnAGiu7NgaEp1dwZ8AD9g`

有关该命令的更多信息，请参阅：[白名单子网命令行参数](../../references/command-line-interface.md#whitelist)。

