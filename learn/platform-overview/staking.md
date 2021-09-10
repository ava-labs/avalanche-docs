---
description: Learn how to stake on Avalanche by validating or delegating
---

# Staking

Staking is the process of locking up tokens to support a network while receiving a reward in return \(rewards can be increased network utility, monetary compensation, etc.\). The concept of staking was [first formally introduced](https://web.archive.org/web/20160306084128/https://peercoin.net/assets/paper/peercoin-paper.pdf) by Sunny King and Scott Nadal of Peercoin.

### How does proof-of-stake work?

To resist [sybil attacks](https://support.avalabs.org/en/articles/4064853-what-is-a-sybil-attack), a decentralized network must require that network influence is paid with a scarce resource. This makes it infeasibly expensive for an attacker to gain enough influence over the network to compromise its security. In proof-of-work systems, the scarce resource is computing power. On Avalanche, the scarce resource is the native token, [AVAX](../../#avalanche-avax-token). For a node to [validate](http://support.avalabs.org/en/articles/4064704-what-is-a-blockchain-validator) a blockchain on Avalanche, it must stake AVAX.

## Staking Parameters on Avalanche

When a validator is done validating the [Primary Network](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network), it receives back the AVAX tokens it staked. It may receive a reward for helping to secure the network. A validator only receives a [validation reward](http://support.avalabs.org/en/articles/4587396-what-are-validator-staking-rewards) if it is sufficiently responsive and correct during the time it validates. Read the [Avalanche token whitepaper](https://files.avalabs.org/papers/token.pdf) to learn more about AVAX and the mechanics of staking.

{% hint style="warning" %}
Staking rewards are sent to your wallet address at the end of the staking term **as long as all of these parameters are met**.
{% endhint %}

* The minimum amount that a validator must stake is 2,000 AVAX
* The minimum amount that a delegator must delegate is 25 AVAX
* The minimum amount of time one can stake funds for validation is 2 weeks
* The maximum amount of time one can stake funds for validation is 1 year
* The minimum amount of time one can stake funds for delegation is 2 weeks
* The maximum amount of time one can stake funds for delegation is 1 year
* The minimum delegation fee rate is 2%
* The maximum weight of a validator \(their own stake + stake delegated to them\) is the minimum of 3e6 AVAX and 5 times the amount the validator staked. For example, if you staked 2,000 AVAX to become a validator, only 8000 AVAX can be delegated to your node total \(not per delegator\)
* The minimum percentage of the time a validator must be correct and online in order to receive a reward is 80%

## Validators

**Validators** secure Avalanche, create new blocks/vertices, and process transactions. To achieve consensus, validators repeatedly sample each other. The probability that a given validator is sampled is proportional to its stake.

When you add a node to the validator set, you specify:

* Your node’s ID
* When you want to start and stop validating
* How many AVAX you are staking
* The address to send any rewards to
* Your delegation fee rate \(see below\)

{% hint style="info" %}
The minimum amount that a validator must stake is 2,000 AVAX.
{% endhint %}

{% hint style="danger" %}
Note that once you issue the transaction to add a node as a validator, there is no way to change the parameters. **You can’t remove your stake early or change the stake amount, node ID, or reward address.** Please make sure you’re using the correct values in the API calls below. If you’re not sure, ask for help on [Discord](https://chat.avax.network) or browse our [Developer FAQs](http://support.avalabs.org/en/collections/2618154-developer-faq).
{% endhint %}

### Running a Validator <a id="running-a-validator"></a>

If you’re running a validator, it’s important that your node is well connected to ensure that you receive a reward. See [here](http://support.avalabs.org/en/articles/4594192-networking-setup).

When you issue the transaction to add a validator, the staked tokens and transaction fee are deducted from the addresses you control. When you are done validating, the staked funds are returned to the addresses they came from. If you earned a reward, it is sent to the address you specified when you added yourself as a validator.

#### Allow API calls <a id="allow-api-calls"></a>

To make API calls to your node from remote machines, allow traffic on the API port \(`9650` by default\), and run your node with argument `--http-host=`

You should disable all APIs you will not use via command-line arguments. You should configure your network to only allow access to the API port from trusted machines \(e.g., your personal computer.\)

#### Why is my uptime low? <a id="why-is-my-uptime-low"></a>

Every validator on Avalanche keeps track of the uptime of other validators. You can see the connections a node has by calling `info.peers`, as well as the uptime of each connection. **This is only one node’s point of view**. Other nodes may perceive the uptime of your node differently. Just because one node perceives your uptime as being low does not mean that you will not receive staking rewards.

The likely reason that your node is not connected to another node is that NAT traversal failed, and you did not start your node with `--public-ip=[NODE'S PUBLIC IP]`. In the future, we will add better monitoring to make it easier to verify that your node is well-connected.

#### Secret Management <a id="secret-management"></a>

The only secret that you need on your validating node is its Staking Key, the TLS key that determines your node’s ID. The first time you start a node, the Staking Key is created and put in `$HOME/.avalanchego/staking/staker.key`. You should back up this file \(and `staker.crt`\) somewhere secure. Losing your Staking Key could jeopardize your validation reward, as your node will have a new ID.

You do not need to have AVAX funds on your validating node. In fact, it's best practice to **not** have a lot of funds on your node. Almost all of your funds should be in "cold" addresses whose private key is not on any computer.

#### Monitoring <a id="monitoring"></a>

Follow this tutorial to learn how to monitor your node's uptime, general health, etc.

{% page-ref page="../../build/tutorials/nodes-and-staking/setting-up-node-monitoring.md" %}

## Delegators

A delegator is a token holder, who wants to participate in staking, but chooses to trust an existing validating node through delegation.

When you delegate stake to a validator, you specify:

* The ID of the node you’re delegating to
* When you want to start/stop delegating stake \(must be while the validator is validating\)
* How many AVAX you are staking
* The address to send any rewards to

{% hint style="info" %}
The minimum amount that a delegator must delegate is 25 AVAX.
{% endhint %}

{% hint style="danger" %}
Note that once you issue the transaction to add your stake to a delegator, there is no way to change the parameters. **You can’t remove your stake early or change the stake amount, node ID, or reward address.** If you’re not sure, ask for help on [Discord](https://chat.avax.network) or browse our [Developer FAQs](http://support.avalabs.org/en/collections/2618154-developer-faq).
{% endhint %}

### Delegator rewards <a id="delegator-rewards"></a>

If the validator that you delegate tokens to is sufficiently correct and responsive, you will receive a reward when you are done delegating. Delegators are rewarded according to the same function as validators. However, the validator that you delegate to keeps a portion of your reward–specified by the validator’s delegation fee rate.

When you issue the transaction to delegate tokens, the staked tokens and transaction fee are deducted from the addresses you control. When you are done delegating, the staked tokens are returned to your address. If you earned a reward, it is sent to the address you specified when you delegated tokens.

