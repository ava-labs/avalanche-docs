---
description: This tutorial will help users to adjust their priority fee and max fee cap during high network activity and take advantage of the benefits of dynamic fee transactions.
---

# Adjusting Gas Price During High Network Activity

Sometimes during periods of high network activity, transactions either remain pending for a very long duration or instantly get a failed transaction notification. This may confuse and frustrate users, especially if they don't understand why their transactions are not getting accepted.

## Probable Reasons You are Here

* Your transaction has stalled, and you don't know what to do
* Your transaction has failed, with an error - `transaction underpriced`
* It's your first transaction, and you want to be sure about any potential issues
* Just for general knowledge on adjusting dynamic fee settings

If these are your reasons for being here, then you can either go through this entire section, for a better understanding of the scenario or directly skip to the [solution](#adjusting-gas-fees-before-submitting-the-transaction).

## Good to Know Keywords and Concepts

The amount of computation used by a transaction is measured in units of `gas`. Each unit of gas is paid for in AVAX at the `gas price` for the transaction. The `gas price` of the transaction is determined by the parameters of the transaction and the `base fee` of the block that it is included in.

To avoid draining the user's wallet due to non-terminating execution through the EVM, transactions are submitted with a `gas limit`, which denotes the maximum units of gas that a particular transaction is allowed to consume.

If a transaction attempts to use more than this limit, then the transaction will revert and still consume and pay for the full `gas limit`. Total fees paid by the user can be calculated as `(gas consumed) * (gas price)`, and is known as `gas fees`. Similarly, maximum gas fees can be calculated as `(gas limit) * (gas price)`.

Originally, transactions could only set a single parameter to define how much they were willing to pay for gas: `gas price`. When dynamic fees were introduced, EIP-1559 style transactions were introduced as well which contain two parameters `maxFeeCap` and `maxPriorityFee` to determine the price a transaction is willing to pay.
 
With the introduction of dynamic fees, legacy style transactions that only have a single `gas price` parameter can lead to both delayed transactions and overpaying for transactions. Dynamic fee transactions are the solution!

For the dynamic fee algorithm, when a block is produced or verified, we look over the past 10s to see how much gas has been consumed within that window (with an added charge for each block produced in that window) to determine the current network utilization. This window has a target utilization, which is currently set to `15M` gas units. Lastly, there is an added charge if a block is produced faster than the target rate of block production. Currently, the target rate of block production is one block every two seconds, so if a new block is produced one second after its parent, then there is an additional surcharge added into the base fee calculation.

Base price could increase, decrease, or remain the same depending upon the amount of activity on the network in the most recent window. If the total gas in the last few blocks of the window is more, less or the same than the target gas, then the base price will increase, decrease, or remain the same, respectively.

When estimating the base fee for users, we simply look at the currently preferred block and calculate what the base fee would be for a block built on top of that block immediately.

Along with a gas limit, users can now pass 2 values in dynamic fee transactions - `gas fee cap` and `gas tip cap`.

The maximum price per unit of gas, that the user is willing to pay for their transaction is called `gas fee cap`. If the base price for a block is more than the gas fee cap, then the transaction will remain in the transaction pool until the base fee has been changed to be less than or equal to the provided gas fee cap (note: the transaction pool limits the number of pending transactions, so if the number of pending transactions exceeds the configured cap then the transactions with the lowest fees may be evicted from the transaction pool and need to be re-issued).

`Gas tip cap` is the maximum price per unit of gas, that the user is willing to pay above the base price to prioritize their transaction. But the tip is capped by both the gas tip cap as well as the gas fee cap. The actual tip paid above the `base fee` of the block is known as the `effective gas tip`.

```javascript
EffectiveTip = min(MaxFeeCap - BaseFee, GasTipCap)
```

Consider the following examples (here GWEI or nAVAX is one-billionth of AVAX) -

| Transaction | Max Fee Cap | Gas tip cap | Base price | Effective tip | Total price |
| ----------- | ----------- | ----------- | ---------- | ------------- | ----------- |
| 1           | 50 GWEI     | 0 GWEI      | 25 GWEI    | 0 GWEI        | 25 GWEI     |
| 2           | 50 GWEI     | 0 GWEI      | 50 GWEI    | 0 GWEI        | 50 GWEI     |
| 3           | 50 GWEI     | 0 GWEI      | 60 GWEI    | 0 GWEI        | **PENDING**|
| A           | 50 GWEI     | 10 GWEI     | 40 GWEI    | 10 GWEI       | 50 GWEI     |
| B           | 40 GWEI     | 40 GWEI     | 40 GWEI    | 0 GWEI        | 40 GWEI     |

Look at transactions **A** and **B** (the bottom two transactions). In these scenarios, it looks like transaction B is paying a higher tip, however, this depends on the base fee of the block where the transactions are included. The effective tip of A is more than that of B. So, if both of these transaction competes for being included in the next block, then the validators would prioritize transaction A since it pays a higher effective tip.


## Why my Transaction is on Hold or Failing?

If your transaction is failing and giving an error - `transaction underpriced`, then the max fee cap of your transaction must be less than the minimum base price that the network supports (as of now, it's 25 nAVAX or GWEI). Although the base fee is automatically estimated in wallets like MetaMask, you can try increasing the max fee cap in the wallet.

During a period of heavy congestion on the network, all submitted transactions can't be included in the same block, due to the block's gas limit. So, validators choose transactions giving higher priority to transactions with the highest effective tips.

Another reason your transaction may get stuck in pending, is that the max fee cap may be below the current base fee that the network is charging. In this case, you need to increase the max fee cap of your transaction above the current base fee for it to be included in the block.

These fee adjustments can be made through wallets like MetaMask.

## Adjusting Gas Fees Before Submitting the Transaction

You may not need to edit the gas fees on normal days. This is only required if there is heavy congestion on the network, and the base fees are frequently fluctuating.

1. Let's create a sample transaction on Avalanche Mainnet, in which we will be sending 0.1 AVAX to a receiver using the MetaMask. By clicking **Next** we can review gas fees and the amount which we want to send.

![](/img/dynamic-fees-adjustment-1.png)


2. On the review page, you can see the estimated priority and max fee for this transaction. Now click on **EDIT**, to adjust these fees according to network requirements.

![](/img/dynamic-fees-adjustment-2.png)


3. On this page, you can edit the priority fee (gas tip cap) and max fee (max fee cap) using the advanced options or you can use the MetaMask's inbuilt gas estimation. You can estimate the max fee as shown on [snowtrace](https://snowtrace.io/gastracker) which represents the average max fee over the last 3 seconds. For more detailed statistics, you can have a look [here](https://stats.avax.network/dashboard/c-chain-activity/).

![](/img/dynamic-fees-adjustment-3.png)

4. If the network activity is high, you have to edit the priority and max fees accordingly, as given on snowtrace. Consider the example below, where the average max fee is 30 GWEI (nAVAX).

![](/img/dynamic-fees-adjustment-4.png)

5. It is recommended to set the max fee cap as the maximum price that you are willing to pay for a transaction, no matter how high or low the base fee will be, as you will only be charged the minimum of base fee and the max fee cap, along with a small priority fee above the base fee. Apart from that, MetaMask will indicate you whether you are paying extra price than required, so you should not have to worry about getting overcharged. Now let's edit the max fee to 40 GWEI. This would ensure that our transaction would not fail until the base fee would exceed this amount. We can set a priority fee to anything between 0 and 40 GWEI. More the priority fee faster will be the transaction. For this example, let's set this to 2 GWEI. However you can always rely on MetaMask's automatic estimate instead of opting for advanced options. Now, save and confirm the transaction.

![](/img/dynamic-fees-adjustment-5.png)

6. After submitting the transaction, even if the base fee has decreased, you will only pay 2 GWEI above that fee as a priority fee. If this fee is one of the highest among the pending transactions, then it will be confirmed rapidly. We can see the confirmation of the transaction below.

![](/img/dynamic-fees-adjustment-6.png)

| Transaction | Max Fee Cap | Gas tip cap | Base price | Effective tip | Total price |
| ----------- | ----------- | ----------- | ---------- | ------------- | ----------- |
| 1           | 40 GWEI     | 2 GWEI      | 25 GWEI    | 2 GWEI        | 27 GWEI     |


## Speeding Up the Pending Transaction

If your transaction is on hold for a very long time, you can speed up through MetaMask. As shown in the below image, click on the **Speed Up** button, to edit your priority and max fee. By default, the new transaction has slightly more priority and max fee (say 10% more than the previous), but you can edit as per your convenience.

![](/img/dynamic-fees-adjustment-7.png)

You can look at Snowtrace's gas tracker to get an estimate about the average base fee, which is currently getting accepted. If the max fee of the network is much higher than your transaction, then set the max fee cap to match that of the network.
