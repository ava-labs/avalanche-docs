---
description: Learn more about Avalanche's transaction fees
---

# Transaction Fees

In order to prevent spam, transactions on Avalanche require the payment of a transaction fee. The fee is paid in [AVAX](../../#avalanche-avax-token). **The transaction fee is burned \(destroyed forever\).**

When you issue a transaction through Avalanche’s API, the transaction fee is automatically deducted from one of the addresses you control.

## Fee Schedule

Different types of transactions require payment of a different transaction fee. This table shows the transaction fee schedule:

{% hint style="warning" %}
The [C-Chain](./#contract-chain-c-chain) gas price is 225 nAVAX \(GWei\) prior to Apricot Phase 3 \(AP3\). The C-Chain gas limit is 8 \* 10e6 \(8,000,000\). AP3 introduces dynamic fees to the C-Chain which allows the gas price to fluctuate between 75 nAVAX \(GWei\) and 225 nAVAX \(GWei\) \(dependent on network activity\). Apricot Phase 4 \(AP4\) further expands the dynamic fee range to between 25 nAVAX \(66% reduction from AP3\) and 1000 nAVAX. See below for more detailed information on dynamic fees.
{% endhint %}

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

## C-Chain Fees

The Avalanche C-Chain uses an algorithm to determine the "base fee" for a transaction. The base fee increases when network utilization is above the target utilization and decreases when network utilization is below the target.

### Base Fee

The base fee can go as low as 25 nAVAX \(GWei\) and as high as 1000 nAVAX \(GWei\) after AP4.

Please note that the maximum gas price is not capped by the static gas price of AP2 \(225 nAVAX\). If you don’t migrate to use the built-in dynamic fee endpoints prior to AP4 activation, it is possible that the processing of your transactions will be delayed \(if the minimum network gas price rises above 225 nAVAX\). We recommend that users switch to using the [eth\_baseFee](https://github.com/ava-labs/avalanche-docs/tree/ddab7fa003383dd9dc236d8e309d2c9a57af00fa/build/avalanchego-apis/contract-chain-c-chain-api/README.md#eth_basefee) and [eth\_maxPriorityFeePerGas](https://github.com/ava-labs/avalanche-docs/tree/ddab7fa003383dd9dc236d8e309d2c9a57af00fa/build/avalanchego-apis/contract-chain-c-chain-api/README.md#eth_maxpriorityfeepergas) API methods to estimate what fee to use in their transactions.

### Dynamic Fee Transactions

Transaction fees are based on Ethereum's EIP-1559 style Dynamic Fee Transactions, which consists of a gas fee cap and a gas tip cap. For all legacy transactions, which only specify a single gas price, the gas price serves as both the gas fee cap and the gas tip cap. The fee cap specifies the maximum price the transaction is willing to pay per unit of gas. The tip cap specifies the maximum amount above the base fee that the transaction is willing to pay to be included in a block \(this is also called the priority fee\). Therefore, the effective gas price paid by a transaction will be `min(gasFeeCap, baseFee + gasTipCap)`. Unlike in Ethereum, where the priority fee is paid to the miner that produces the block, in Avalanche both the base fee and the priority fee are burned.

### MetaMask

MetaMask will automatically start using Dynamic Fee Transactions once Apricot Phase 3 goes into effect. If you use MetaMask, you will automatically start taking advantage of dynamic fees as soon as Apricot Phase 3 goes live.

### How Should You Take Advantage of Dynamic Fees?

If you want to start taking advantage of dynamic fees, you will need to start using the `DynamicFeeTx` type. This transaction type allows your transaction to specify a `gasFeeCap` and a `gasTipCap`.

* `gasFeeCap` - maximum price per unit of gas that the transaction is willing to pay
* `gasTipCap` - maximum amount above the `baseFee` of a block that the transaction is willing to pay to be included

Use `eth_baseFee` API call to estimate the base fee for the next block. If more blocks are produced in between the time that you construct your transaction and it is included in a block, the base fee could be different from the base fee estimated by the API call, so it is important to treat this value as an estimate.

Next, use `eth_maxPriorityFeePerGas` API call to estimate the priority fee needed to be included in a block. This API call will look at the most recent blocks and see what tips have been paid by recent transactions in order to be included in the block.

Based off of this information, you can specify the `gasFeeCap` and `gasTipCap` to your liking based on how you prioritize getting your transaction included as quickly as possible vs. minimizing the price paid per unit of gas.

