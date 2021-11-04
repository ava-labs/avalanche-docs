# 运行 Avalanche 节点

了解 Avalanche 的最快方法是运行节点并与网络交互。

{% embed url="https://youtu.be/c_SjtCiOFdg" caption="" %}

在本教程（估计时间： 10 分钟）中，我们将：

* 安装和运行 Avalanche 节点
* 连接到 Avalanche
* 发送 AVAX
* 将您的节点添加到验证者集

{% hint style="warning" %}如果您的问题在常见问题解答中没有提及，请在 [Avalanche Discord](https://chat.avax.network)  中寻求帮助！我们将努力帮助您克服任何障碍。{% endhint %}

{% hint style="info" %}如果您有兴趣使用第三方服务来托管您的节点或运行验证者，[请查看选项](https://docs.avax.network/learn/community#blockchain-infrastructure-and-node-services)。{% endhint %}

本教程主要面向对 Avalanche 平台运作方式感兴趣的开发人员和其他类型的人员。如果您对设置节点进行质押感兴趣，可能希望遵循[使用安装程序设置 Avalanche 节点](set-up-node-with-installer.md)教程。安装程序自动完成安装流程并将其设置为系统服务，建议用于无人值守操作。您还可以先遵循本教程，然后使用安装程序作为永久解决方案来设置节点。

## 要求

Avalanche 是非常轻量的协议，因此节点可以在商用硬件上运行。请注意，随着网络使用量增加，硬件要求可能会发生改变。

* CPU：相当于 8 个 AWS vCPU
* RAM 内存： 16 GB
* 存储：200 GB
* 操作系统：Ubuntu 18.04/20.04 或 MacOS >= Catalina

## 运行 Avalanche 节点并发送资金

安装 AvalancheGo， 即 Avalanche 节点的 Go 实施，然后连接到 Avalanche 公共测试网。

### 下载 AvalancheGo

节点是二进制程序。您可以下载源代码并创建二进制程序，或者下载预构建的二进制程序。您不需要同时采用上述两种方法。

下载[预构建的二进制](run-avalanche-node.md#binary)程序更简单。如果您的目标只是运行自己的节点并进行质押，则推荐采取该方法。

如果您是开发人员，希望在 Avalanche 上实验和构建节点，建议使用源代码构建节点。

#### **源代码**

如果您希望使用源代码构建节点，首先需要安装 Go 1.16.8 或更高版本。遵循[此处](https://golang.org/doc/install)的指示。

运行 `go version`。**版本应该为 1.16.8 或更高。**运行 `echo $GOPATH`。**它不应为空。**

下载 AvalancheGo 储存库：

```cpp
go get -v -d github.com/ava-labs/avalanchego/...
```

高级用户说明：AvalancheGo 使用 Go 模块，因此您可以将 [AvalancheGo 储存库](https://github.com/ava-labs/avalanchego) 克隆到 GOPATH 以外的位置。

更改到 `avalanchego` 目录：

```cpp
cd $GOPATH/src/github.com/ava-labs/avalanchego
```

构建 AvalancheGo：

```cpp
./scripts/build.sh
```

名为 `avalanchego`的二进制程序在 `avalanchego/build` 中 。

#### **二进制程序**

如果您希望下载预构建的二进制程序，而不是自行创建，请前往我们的 [版本页面](https://github.com/ava-labs/avalanchego/releases) ，然后选择您打算下载的版本（可能是最新版本）。

在 `Assets` 下，选择适当的文件。

对于 MacOS：下载：`avalanchego-macos-<VERSION>.zip`  解压缩：`unzip avalanchego-macos-<VERSION>.zip`解压后的文件夹 `avalanchego-<VERSION>` 包含二进制程序。

对于 PC 上的 Linux 或云提供商：下载：`avalanchego-linux-amd64-<VERSION>.tar.gz`  解压缩：`tar -xvf avalanchego-linux-amd64-<VERSION>.tar.gz`  解压后的文件夹 `avalanchego-<VERSION>-linux` 包含二进制程序。

对于 RaspberryPi4 或类似的 Am64 计算机上的 Linux：下载：`avalanchego-linux-arm64-<VERSION>.tar.gz`  解压缩：`tar -xvf avalanchego-linux-arm64-<VERSION>.tar.gz`  解压后的文件夹 `avalanchego-<VERSION>-linux` 包含二进制程序。

### 启动节点，然后连接到 Avalanche

如果您使用源代码构建：

```cpp
./build/avalanchego
```

如果您在 MacOS 上使用预构建的二进制程序：

```cpp
./avalanchego-<VERSION>/build/avalanchego
```

如果您在 Linux 上使用预构建的二进制程序：

```cpp
./avalanchego-<VERSION>-linux/avalanchego
```

在节点启动时，它必须进行引导（与网络的其余部分进度保持一致）。您将查看有关引导的日志。在给定链完成引导时，它将打印类似于下面的日志：

`INFO [06-07|19:54:06] <X Chain> /snow/engine/avalanche/transitive.go#80: bootstrapping finished with 1 vertices in the accepted frontier`

如需检查给定链是否完成引导，在另一个终端窗口调用[`info.isBootstrapped`](../../avalanchego-apis/info-api.md#info-isbootstrapped)，复制和粘贴以下命令：

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.isBootstrapped",
    "params": {
        "chain":"X"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

如果返回 `true`，则该链已引导。如果您对未完成引导的链进行 API 调用，将返回 `API call rejected because chain is not done bootstrapping` 。如果您的节点从未完成引导，请遵循[此常见问题](http://support.avalabs.org/en/articles/4593908-is-my-node-done-bootstrapping) 。如果您仍有问题未解决，请在 [Discord](https://chat.avalabs.org/) 上与我们联系。

您的节点正在运行并已连接。如果您希望在主网上使用您的节点作为验证者，请查阅[此教程](add-a-validator.md#add-a-validator-with-avalanche-wallet)以了解如何使用 web 钱包将您的节点添加为验证者。

您可以使用  `Ctrl + C`终止节点。

如果您希望使用您的节点进行实验和操作，请继续阅读。

为了通过其他机器对您的节点进行 API 调用，在启动节点时包含参数`--http-host=`（例如 `./build/avalanchego --http-host=`）

如需连接到 Fuji 测试网而不是主网，使用参数 `--network-id=fuji` 。您可以通过 [ 水龙头程序在测试网上获取资金。](https://faucet.avax-test.network/)

### 创建 Keystore 用户

Avalanche 节点提供内置的 **Keystore。**Keystore 管理用户，在很大程度上类似于 [钱包](http://support.avalabs.org/en/articles/4587108-what-is-a-blockchain-wallet) 。用户是客户端在与区块链进行交互时可以使用的密码保护身份。**您应只在操作的节点上创建 keystore 用户，因为节点操作员可以查看您的明文密码。**如需创建用户，请调用 [`keystore.createUser`](../../avalanchego-apis/keystore-api.md#keystore-createuser)：

```cpp
curl -X POST --data '{
     "jsonrpc": "2.0",
     "id": 1,
     "method": "keystore.createUser",
     "params": {
         "username": "YOUR USERNAME HERE",
         "password": "YOUR PASSWORD HERE"
     }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/keystore
```

响应是：

```cpp
{
     "jsonrpc":"2.0",
     "result":{"success":true},
     "id":1
}
```

现在您在此节点上拥有一个用户 。Keystore 数据存在于节点级别。您在一个节点的 Keystore 上创建的用户不存在于其他节点，但您可以将用户导入 Keystore 或从 Keystore 导出 。查看 [Keystore  API](../../avalanchego-apis/keystore-api.md) 的操作方式。

{% hint style="danger" %}**您应该仅在您的节点上保留少量的资金。**您的大部分资金应通过未保存到任何计算机的 Mnemonic 得到保障。{% endhint %}

### 创建一个地址

Avalanche 是包括 [X-Chain](../../../learn/platform-overview/#exchange-chain-x-chain) 在内的异构区块链平台，可以充当创建和交易数字资产的去中心化平台。现在我们将在节点上创建一个地址来持有 AVAX。

如需在 X-Chain 上创建一个新地址，请调用 [`avm.createAddress`——](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createaddress) [X-Chain  API](../../avalanchego-apis/exchange-chain-x-chain-api.md) 的一种方法：

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :2,
    "method" :"avm.createAddress",
    "params" :{
        "username":"YOUR USERNAME HERE",
        "password":"YOUR PASSWORD HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

如果您的节点没有完成引导，该调用将通过消息  `API call rejected because chain is not done bootstrapping`返回状态 `503`。

请注意，我们将对 `127.0.0.1:9650/ext/bc/X` 发出此请求。`bc/X` 部分表示请求正在发送到 ID ( 或别名) 为 `X`（即 X-Chain）的区块链。

响应如下所示：

```cpp
{
    "jsonrpc":"2.0",
    "id":2,
    "result" :{
        "address":"X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75"
    }
}
```

您的用户目前控制 X-Chain 上的地址 `X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75`。为了区分不同链上的地址，Avalanche 公约要求地址包含其所在链的 ID 或别名。因此，此地址以 `X-` 开头，表示存在于 X-Chain 上。

### 从 Avalanche 钱包向您的节点发送资金

{% hint style="warning" %}
_**注意：下面的指示可以转移实际基金。**_
{% endhint %}

我们将资金从 Avalanche 钱包转移到您的节点。

前往 [Avalanche 钱包](https://wallet.avax.network)。点击 `Access Wallet`，然后点击 `Mnemonic Key Phrase`。输入您的助记短语。

单击左侧的 `Send` 选项卡。对于金额，选择 `.002` AVAX。输入您的节点地址，然后单击 `Confirm`。

![web 钱包发送选项卡](../../../.gitbook/assets/web-wallet-send-tab%20%284%29%20%284%29%20%285%29%20%285%29%20%286%29%20%287%29%20%284%29%20%281%29%20%285%29.png)

我们可以调用 X-Chain  API 的另一方法，即 `avm.getBalance` ，检查地址的给定资产余额。检查转移是否完成：

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :3,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75",
        "assetID"  :"AVAX"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

注意，AVAX 拥有特殊 ID `AVAX`。通常，资产 ID 是数字和字母组成的字符串。

响应表明我们有  `2,000,000 nAVAX` 或 `0.002 AVAX`。

```cpp
{
    "jsonrpc":"2.0",
    "id"     :3,
    "result" :{
        "balance":2000000,
        "utxoIDs": [
            {
                "txID": "x6vR85YPNRf5phpLAEC7Sd6Tq2PXWRt3AAHAK4BpjxyjRyhtu",
                "outputIndex": 0
            }
        ]
    }
}
```

### 发送 AVAX

现在，通过对节点调用 API，发送部分 AVAX：

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :5,
    "method" :"avm.send",
    "params" :{
        "assetID"    :"AVAX",
        "amount"     :1000,
        "to"         :"X-avax1w4nt49gyv4e99ldqevy50l2kz55y9efghep0cs",
        "changeAddr" :"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username"   :"YOUR USERNAME HERE",
        "password"   :"YOUR PASSWORD HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

`amount` 指定要发送的 nAVAX 数量。

如果您希望指定更改应当送达的特定地址，可以在 `changeAddr` 中指定。您可以将此字段留空；留空后，任何更改将送达您的用户控制的某个地址。

为了防止垃圾邮件，Avalanche 要求支付交易费用。在发布交易时，从您的用户控制的地址自动扣除交易费用。您在查看余额时，请牢记这一点。

{% page-ref page="../../../learn/platform-overview/transaction-fees.md" %}

在发送此请求时，节点将使用您的用户名和密码进行身份验证。接下来，它将逐一查看您的用户控制的所有[私钥](http://support.avalabs.org/en/articles/4587058-what-are-public-and-private-keys)，直到发现满足请求的足够 AVAX 为止。

响应包含交易 ID。每次调用 `send`时都将有所不同。

```cpp
{
    "jsonrpc":"2.0",
    "id"     :5,
    "result" :{
        "txID":"2QouvFWUbjuySRxeX5xMbNCuAaKWfbk5FeEa2JmoF85RKLk2dD",
        "changeAddr" :"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

#### 检查交易状态

此交易在 1-2 秒内完成。我们通过 [`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus) 检查其状态：

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :6,
    "method" :"avm.getTxStatus",
    "params" :{
        "txID":"2QouvFWUbjuySRxeX5xMbNCuAaKWfbk5FeEa2JmoF85RKLk2dD"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

响应指明了交易已被接受：

```cpp
{
    "jsonrpc":"2.0",
    "id"     :6,
    "result" :{
        "status":"Accepted"
    }
}
```

如果网络未能最终完成交易，您还可能看到 `status` 为 `Processing`。

一旦您看到交易是 `Accepted`，检查 `to` 地址的余额，以确定其拥有我们发送的 AVAX：

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :7,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-avax1w4nt49gyv4e99ldqevy50l2kz55y9efghep0cs",
        "assetID"  :"AVAX"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

响应是：

```cpp
{
    "jsonrpc":"2.0",
    "id"     :7,
    "result" :{
        "balance":1000
    }
}
```

同样，我们可以检查  `X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75`，以确定从余额中所扣除我们发送的 AVAX，以及交易费用。

{% page-ref page="add-a-validator.md" %}

{% page-ref page="../../tools/avalanchejs/create-an-asset-on-the-x-chain.md" %}

{% page-ref page="../platform/create-avm-blockchain.md" %}

{% page-ref page="../platform/create-custom-blockchain.md" %}

{% page-ref page="../platform/create-a-subnet.md" %}

{% page-ref page="../../avalanchego-apis/" %}

{% page-ref page="../../references/" %}

