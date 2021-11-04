---
description: 了解有关 Avalanche 交易费用的详细信息
---

# 交易费用

为了防止滥用，Avalanche 上的交易要求支付交易费用。费用以 [AVAX](../../#avalanche-avax-token) 进行支付。**交易费用会被烧毁（永久销毁）。**

当您通过 Avalanche 的 API 发出交易时，交易费用会自动从您控制的地址之一中进行扣除。

## 费用表

不同类型的交易需要支付不同的交易费用。下表显示了交易费用表：

{% hint style="warning" %}在 Apricot 第 3 阶段 \(AP3\) 之前，[C-Chain](./#contract-chain-c-chain) gas 价格为 225 个 nAVAX \(GWei\)。C-Chain 的 gas 限制为 8 \* 10e6 \(8,000,000\)。AP3 向 C-Chain 引入了动态费用，允许 gas 价格在 75 个 nAVAX \(GWei\) 和 225 个 nAVAX \(GWei\)（取决于网络活动）之间波动。Apricot 第 4 阶段 \(AP4\) 进一步将动态费用范围扩大到 25 个 nAVAX（比 AP3 减少了 66%）至 1000 个 nAVAX 之间。请参阅下面有关动态费用的更多详细信息。{% endhint %}

```cpp
+----------+-------------------+------------------------+
| Chain    : Transaction Type  | Transaction Fee (AVAX) |
+----------+-------------------+------------------------+
| P        : Create Blockchain |                   0.01 |
+----------+-------------------+------------------------+
| P        : Add Validator     |                      0 |
+----------+-------------------+------------------------+
| P        : Add Delegator     |                      0 |
+----------+-------------------+------------------------+
| P        : Create Subnet     |                   0.01 |
+----------+-------------------+------------------------+
| P        : Import AVAX       |                  0.001 |
+----------+-------------------+------------------------+
| P        : Export AVAX       |                  0.001 |
+----------+-------------------+------------------------+
| X        : Send              |                  0.001 |
+----------+-------------------+------------------------+
| X        : Create Asset      |                   0.01 |
+----------+-------------------+------------------------+
| X        : Mint Asset        |                  0.001 |
+----------+-------------------+------------------------+
| X        : Import AVAX       |                  0.001 |
+----------+-------------------+------------------------+
| X        : Export AVAX       |                  0.001 |
+----------+-------------------+------------------------+
| C        : Simple send       |   0.001575 - 0.004725* |
+----------+-------------------+------------------------+

(*) C-Chain gas price varies. See below.
```

## C-Chain 费用

Avalanche C-Chain 使用一种算法来确定交易的“基本费用”。当网络利用率高于目标利用率时，基本费用增加，当网络利用率低于目标利用率时，基本费用减少。

### 基本费用

AP4 后，基本费用最低至 25 个 nAVAX \(GWei\)，最高至 1000 个 nAVAX \(GWei\)。

请注意，gas 的最高价格不受 AP2 gas 静态价格（225 个 nAVAX）的限制。如果您在 AP4 激活之前不迁移到使用内置的动态费用端点，则您的交易处理可能会延迟（如果 gas 的最低网络价格上升到 225 个 nAVAX 以上）。我们建议用户切换到使用 [eth\_baseFee](https://github.com/ava-labs/avalanche-docs/tree/884d4ae1e6c69ff4b260feac1205fc8120bc0093/build/avalanchego-apis/contract-chain-c-chain-api/README.md#eth_basefee) 和 [eth\_maxPrioritiortFeeGas](https://github.com/ava-labs/avalanche-docs/tree/884d4ae1e6c69ff4b260feac1205fc8120bc0093/build/avalanchego-apis/contract-chain-c-chain-api/README.md#eth_maxpriorityfeepergas) API 方法来估算在他们的交易中使用的费用。

### 动态费用交易

交易费用基于以太坊的 EIP-1559 类型的动态费用交易，其中包括 gas 费用上限和 gas 小费上限。对于所有仅指定单个 gas 价格的遗留交易，gas 价格同时作为 gas 费用上限和 gas 小费上限。费用上限指定交易愿意为每单位 gas 支付的最高价格。小费上限指定交易愿意支付的包含在一个区块中的高于基本费用的最大金额（这也称为优先费）。因此，交易支付的有效 gas 价格将为 `min(gasFeeCap, baseFee + gasTipCap)`。与在以太坊中优先费用支付给生产区块的矿工不同，在 Avalanche 中，基础费用和优先费用都被烧毁。

### metamask

一旦 Apricot 第 3 阶段生效，MetaMask 将自动开始采用动态费用交易。如果您使用 MetaMask，一旦 Apricot 第 3 阶段上线，您将自动开始采用动态费用。

### 您应该如何利用动态费用？

如果您想开始采用动态费用，则需要开始使用`DynamicFeeTx`类型。此交易类型允许您的交易指定`gasFeeCap`和`gasTipCap`。

* `gasFeeCap` - 交易愿意支付的每单位 gas 的最高价格
* `gasTipCap` - 高于交易愿意支付的区块包括在内的`baseFee`最大金额

使用 `eth_baseFee`API 调用来估算下一个区块的基本费用。如果在您构建交易并将其包含在一个区块中的时间间隙产生了更多区块，则基本费用可能与 API 调用估算的基本费用不同，因此将此值视为一个估算值很重要。

接下来，使用 `eth_maxPriorityFeePerGas`API 调用来估算需要包含在一个区块中的优先费用。此 API 调用将查看最近的区块，并查看最近的交易为了包含在区块中支付了哪些小费。

基于这些信息，您可以根据您如何优先考虑尽快将交易纳入其中，以及最小化每单位 gas 支付的价格，根据自己的喜好指定`gasFeeCap`和`gasTipCap`。

