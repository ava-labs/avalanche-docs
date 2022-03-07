---
description: In order to prevent spam, transactions on Avalanche require the payment of a transaction fee. The fee is paid in AVAX. Find out more information here. 
---

# Avalanche Transaction Fee

In order to prevent spam, transactions on Avalanche require the payment of a transaction fee. The fee is paid in [AVAX](../../#avalanche-avax-token). **The transaction fee is burned (destroyed forever).**

When you issue a transaction through Avalanche’s API, the transaction fee is automatically deducted from one of the addresses you control.

## Fee Schedule

Different types of transactions require payment of a different transaction fee. This table shows the transaction fee schedule:

```
+----------+-------------------+------------------------+
| Chain    : Transaction Type  | Transaction Fee (AVAX) |
+----------+-------------------+------------------------+
| P        : Create Subnet     |                      1 |
+----------+-------------------+------------------------+
| P        : Create Blockchain |                      1 |
+----------+-------------------+------------------------+
| P        : Add Validator     |                      0 |
+----------+-------------------+------------------------+
| P        : Add Delegator     |                      0 |
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
| C        : Simple send       |           >= 0.001575* |
+----------+-------------------+------------------------+

(*) C-Chain gas price varies. See below.
```

## C-Chain Fees

The Avalanche C-Chain uses an algorithm to determine the "base fee" for a transaction. The base fee increases when network utilization is above the target utilization and decreases when network utilization is below the target.

### Dynamic Fee Transactions

Transaction fees for non-atomic transactions are based on Ethereum's EIP-1559 style Dynamic Fee Transactions, which consists of a gas fee cap and a gas tip cap.

The fee cap specifies the maximum price the transaction is willing to pay per unit of gas. The tip cap (also called the priority fee) specifies the maximum amount above the base fee that the transaction is willing to pay per unit of gas. Therefore, the effective gas price paid by a transaction will be `min(gasFeeCap, baseFee + gasTipCap)`. Unlike in Ethereum, where the priority fee is paid to the miner that produces the block, in Avalanche both the base fee and the priority fee are burned. For legacy transactions, which only specify a single gas price, the gas price serves as both the gas fee cap and the gas tip cap.

Use the [eth_baseFee](../../build/avalanchego-apis/c-chain.md#eth_basefee) API method to estimate the base fee for the next block. If more blocks are produced in between the time that you construct your transaction and it is included in a block, the base fee could be different from the base fee estimated by the API call, so it is important to treat this value as an estimate.

Next, use [eth_maxPriorityFeePerGas](../../build/avalanchego-apis/c-chain.md#eth_maxpriorityfeepergas) API call to estimate the priority fee needed to be included in a block. This API call will look at the most recent blocks and see what tips have been paid by recent transactions in order to be included in the block.

Transactions are ordered by the priority fee, then the timestamp (oldest first).

Based off of this information, you can specify the `gasFeeCap` and `gasTipCap` to your liking based on how you prioritize getting your transaction included as quickly as possible vs. minimizing the price paid per unit of gas.

#### Base Fee

The base fee can go as low as 25 nAVAX (GWei) and has no upper bound. You can use the [eth_baseFee](../../build/avalanchego-apis/c-chain.md#eth_basefee) and [eth_maxPriorityFeePerGas](../../build/avalanchego-apis/c-chain.md#eth_maxpriorityfeepergas) API methods, or [Snowtrace's C-Chain Gas Tracker](https://snowtrace.io/gastracker), to estimate the gas price to use in your transactions.

### Atomic Transaction Fees

C-Chain atomic transactions (i.e. imports and exports from/to other chains) charge dynamic fees based on the amount of gas used by the transaction and the base fee of the block that includes the atomic transaction.

Gas Used:

```
+---------------------+-------+
| Item                : Gas   |
+---------------------+-------+
| Unsigned Tx Byte    : 1     |
+---------------------+-------+
| Signature           : 1000  |
+---------------------+-------+
| Per Atomic Tx       : 10000 |
+---------------------+-------+
```

Therefore, the gas used by an atomic transaction is `1 * len(unsignedTxBytes) + 1,000 * numSignatures + 10,000`

The tx fee additionally takes the base fee into account. Due to the fact that atomic transactions use units denominated in 9 decimal places, the base fee must be converted to 9 decimal places before calculating the actual fee paid by the transaction. Therefore, the actual fee is: `gasUsed * baseFee (converted to 9 decimals)`.
