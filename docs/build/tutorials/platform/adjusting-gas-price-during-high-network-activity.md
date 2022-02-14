---
description: This tutorial will help users to adjust their priority fee and max fee cap during high network activity and take the benefits of dynamic fees algorithm.
---

# Adjusting Gas Price During High Network Activity

Sometimes during periods of high network activity, transactions either remain pending for a very long duration or instantly get a failed transaction notification. This may cause panic among the users if they couldn't figure out what went wrong!

## Probable Reasons You are Here
* Your transaction has stalled, and you don't know what to do
* Your transaction has failed, with an error - `transaction underpriced`
* It's your first transaction, and you want to be sure about any potential issues
* Just for general knowledge on adjusting dynamic fee settings

If these are your reasons for being here, then you can either go through this entire section, for a better understanding of the scenario or directly skip to the [solution](#adjusting-gas-fees-before-submitting-the-transaction).

## Good to Know Keywords and Concepts

The amount of computation used by a transaction is measured in units of `gas`. Each gas has a dynamic price (to be paid in AVAX) which depends upon the network activity, and this is known as `gas price`.

To avoid draining the user's wallet due to using computation infinitely, transactions need to be submitted with a `gas limit`, which denotes the maximum units of gas that a particular transaction could consume.

If a transaction uses more than the gas limit, then it would be rejected. Total fees paid by the user is calculated as `(gas consumed) * (gas price)`, and is known as `gas fees`. Similarly, maximum gas fees are calculated as `(gas limit) * (gas price)`.

Earlier users have to bid how much they want to pay per gas for their transactions. The transaction with a higher bid was picked by the validators. This made the estimation difficult, and users often pay a higher price than required.

This was later replaced by a more deterministic algorithm to estimate the gas price according to the network activity.

For the estimation, we look over the blocks of the last few seconds, known as a window. Each window has a target for the units of gas to be included in it. This is called `Gas Target`. Currently, it is `15M` gas units per window. To make the gas price more predictable, each block is associated with a `base price or base fee` for each gas.

Base price could increase, decrease or remain the same depending upon the congestion on the network in the recent window. If the total gas in the last few blocks of the window is more, less or the same than the target gas, then the base price will increase, decrease or remain the same, respectively.

Along with a gas limit, users now have to pass 2 more values - `gas fee cap` and `gas tip cap`.

The maximum price per unit of gas, that the user is willing to pay for their transaction is called `gas fee cap`. If the base price for a block is more than the gas fee cap, then the transaction would remain pending until the base fee has been changed to be less or equal to the provided gas fee cap.

`Gas tip cap` is the maximum price per unit of gas, that the user is willing to pay above the base price to prioritize their transaction. But the tip is capped by a gas tip cap as well as a gas fee cap. The final tip with which a transaction is included in a block is the `effective gas tip`.

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

Look at transactions **A** and **B**. In these scenarios, it looks like transaction B is paying a higher tip, however, this depends on the base fee of the block where the transactions are included. The effective tip of A is more than that of B. So, if both of these transaction competes for being included in the next block, then the validators would prioritize transaction A, due to higher effective tip.


## Why my Transaction is on Hold or Failing?

If your transaction is failing and giving an error - `transaction underpriced`, then the max fee cap of your transaction must be less than the minimum base price that the network supports (as of now, it's 25 nAVAX or GWEI). Although the base fee is automatically estimated in wallets like Metamask, you can try increasing the max fee cap in the wallet.

During a period of heavy congestion on the network, all submitted transactions couldn't be included in the same block, due to the block's gas limit. So, validators choose transactions giving more priority to transactions with higher effective tip. Your transaction will have to wait until the effective tip is highest among the pending transactions.

Another reason for pending transactions is the max fee cap being significantly below the current base fee that the network is charging. In this case, you would need to increase the max fee cap of the transaction.

These fee adjustments can be made through wallets like Metamask.

## Adjusting Gas Fees Before Submitting the Transaction

You may not need to edit the gas fees on normal days. This is only required if there is heavy congestion on the network, and the base fees are frequently fluctuating.

1. Let's create a sample transaction on Fuji testnet, in which we will be sending 0.1 AVAX to a receiver using the Metamask. By clicking **Next** we can review gas fees and the amount which we want to send.

![](/img/dynamic-fees-adjustment-1.png)


2. On the review page, you can see the estimated priority and max fee for this transaction. Now click on **EDIT**, to adjust these fees according to network requirements.

![](/img/dynamic-fees-adjustment-2.png)


3. On this page, you can edit the priority fee (gas tip cap) and max fee (max fee cap). You can estimate the max fee as shown on [snowtrace](https://snowtrace.io/gastracker) which represents the average max fee over the last 3 seconds. For more detailed statistics, you can have a look [here](https://stats.avax.network/dashboard/c-chain-activity/).

![](/img/dynamic-fees-adjustment-3.png)

4. If the network activity is high, you have to edit the priority and max fees accordingly, as given on snowtrace. Consider the example below, where the average max fee is 78 GWEI (nAVAX).

![](/img/dynamic-fees-adjustment-4.png)

5. Now let's edit the max fee to 78 GWEI. This would ensure that our transaction would not fail until the base fee would exceed this amount. We can set a priority fee to anything between 0 and 78 GWEI. More the priority fee faster will be the transaction. For this example, let's set this to 50 GWEI. Save and confirm the transaction.

![](/img/dynamic-fees-adjustment-5.png)

6. After submitting the transaction, even if the base fee has decreased, you will only pay 50 GWEI above that fee as a priority fee. If this fee is one of the highest among the pending transactions, then it will be confirmed rapidly. We can see the confirmation of the transaction above.

| Transaction | Max Fee Cap | Gas tip cap | Base price | Effective tip | Total price |
| ----------- | ----------- | ----------- | ---------- | ------------- | ----------- |
| 1           | 78 GWEI     | 50 GWEI     | 25 GWEI    | 50 GWEI       | 75 GWEI     |


## Speeding Up the Pending Transaction

If your transaction is on hold for a very long time, you can speed up through Metamask. As shown in the below image, click on the **Speed Up** button, to edit your priority and max fee. By default, the new transaction has slightly more priority and max fee (say 10% more than the previous), but you can edit as per your convenience.

![](/img/dynamic-fees-adjustment-6.png)

You can look at Snowtrace's gas tracker to get an estimate about the average base fee, which is currently getting accepted. If the max fee of the network is much higher than your transaction, then set the max fee cap to match that of the network.
