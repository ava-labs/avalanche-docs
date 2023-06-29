---
sidebar_position: 1
description: Learn how to stake on Avalanche by validating or delegating
---

# What Is Staking?

Staking is the process of locking up tokens to support a network while receiving
a reward in return (rewards can be increased network utility, monetary
compensation, etc.). The concept of staking was [first formally
introduced](https://web.archive.org/web/20160306084128/https://peercoin.net/assets/paper/peercoin-paper.pdf)
by Sunny King and Scott Nadal of Peercoin.

## How Does Proof-of-Stake Work?

To resist [sybil
attacks](https://support.avalabs.org/en/articles/4064853-what-is-a-sybil-attack),
a decentralized network must require that network influence is paid with a
scarce resource. This makes it infeasibly expensive for an attacker to gain
enough influence over the network to compromise its security. In proof-of-work
systems, the scarce resource is computing power. On Avalanche, the scarce
resource is the native token,
[AVAX](../../learn/avalanche/intro.md#avax). For a node to
[validate](http://support.avalabs.org/en/articles/4064704-what-is-a-blockchain-validator)
a blockchain on Avalanche, it must stake AVAX.

## Staking Parameters on Avalanche

When a validator is done validating the [Primary
Network](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network),
it receives back the AVAX tokens it staked. It may receive a reward for helping
to secure the network. A validator only receives a [validation
reward](http://support.avalabs.org/en/articles/4587396-what-are-validator-staking-rewards)
if it is sufficiently responsive and correct during the time it validates. Read
the [Avalanche token white paper](https://www.avalabs.org/whitepapers) to learn
more about AVAX and the mechanics of staking.

:::caution

Staking rewards are sent to your wallet address at the end of the staking term
**as long as all of these parameters are met**.

:::

### Mainnet

- The minimum amount that a validator must stake is 2,000 AVAX
- The minimum amount that a delegator must delegate is 25 AVAX
- The minimum amount of time one can stake funds for validation is 2 weeks
- The maximum amount of time one can stake funds for validation is 1 year
- The minimum amount of time one can stake funds for delegation is 2 weeks
- The maximum amount of time one can stake funds for delegation is 1 year
- The minimum delegation fee rate is 2%
- The maximum weight of a validator (their own stake + stake delegated to them)
  is the minimum of 3 million AVAX and 5 times the amount the validator staked.
  For example, if you staked 2,000 AVAX to become a validator, only 8000 AVAX
  can be delegated to your node total (not per delegator)

A validator will receive a staking reward if they are online and response for
more than 80% of their validation period, as measured by a majority of
validators, weighted by stake. **You should aim for your validator be online and
responsive 100% of the time.**

You can call API method `info.uptime` on your node to learn its weighted uptime
and what percentage of the network currently thinks your node has an uptime high
enough to receive a staking reward. See
[here.](../../apis/avalanchego/apis/info.md#infouptime) You can get another
opinion on your node's uptime from Avalanche's [Validator Health
dashboard](https://stats.avax.network/dashboard/validator-health-check/). If
your reported uptime is not close to 100%, there may be something wrong with
your node setup, which may jeopardize your staking reward. If this is the case,
please see [here](#why-is-my-uptime-low) or contact us on
[Discord](https://chat.avax.network) so we can help you find the issue. Note
that only checking the uptime of your validator as measured by non-staking
nodes, validators with small stake, or validators that have not been online for
the full duration of your validation period can provide an inaccurate view of
your node's true uptime.

### Fuji Testnet

On Fuji Testnet, all staking parameters are the same as those on Mainnet except the following ones:

- The minimum amount that a validator must stake is 1 AVAX
- The minimum amount that a delegator must delegate is 1 AVAX
- The minimum amount of time one can stake funds for validation is 24 hours
- The minimum amount of time one can stake funds for delegation is 24 hours

## Reward Formula

Consider a validator which stakes a $Stake$ amount of Avax for $StakingPeriod$ seconds.

Assume that at the start of the staking period there is a $Supply$ amount of Avax in the Primary Network.
The maximum amount of Avax is $MaximumSupply$ .

Then at the end of its staking period, a responsive validator
receives a reward calculated as follows:

<!-- markdownlint-disable MD013 -->
<!-- vale off -->
$$
Reward = \left(MaximumSupply - Supply \right) \times \frac{Stake}{Supply} \times \frac{Staking Period}{Minting Period} \times EffectiveConsumptionRate
$$
where
$$
EffectiveConsumptionRate = 
$$
$$
\frac{MinConsumptionRate}{PercentDenominator} \times \left(1- \frac{Staking Period}{Minting Period}\right) + \frac{MaxConsumptionRate}{PercentDenominator} \times \frac{Staking Period}{Minting Period}
$$
<!-- vale on -->
<!-- markdownlint-enable MD013 -->

Note that $StakingPeriod$ is the staker's entire staking period, not just the
staker's uptime, that is the aggregated time during which the staker has been
responsive. The uptime comes into play only to decide whether a staker should be
rewarded; to calculate the actual reward, only the staking period duration is
taken into account.

$EffectiveConsumptionRate$ is a linear combination of $MinConsumptionRate$ and
$MaxConsumptionRate$.
$MinConsumptionRate$ and $MaxConsumptionRate$ bound $EffectiveConsumptionRate$ because 

<!-- markdownlint-disable MD013 -->
<!-- vale off -->
$$
MinConsumptionRate \leq EffectiveConsumptionRate \leq MaxConsumptionRate
$$
<!-- vale on -->
<!-- markdownlint-enable MD013 -->

The larger $StakingPeriod$ is, the closer $EffectiveConsumptionRate$ is to $MaxConsumptionRate$.

A staker achieves the maximum reward for its stake if $StakingPeriod$ = $Minting Period$.
The reward is:

<!-- markdownlint-disable MD013 -->
<!-- vale off -->
$$
Max Reward = \left(MaximumSupply - Supply \right) \times \frac{Stake}{Supply} \times \frac{MaxConsumptionRate}{PercentDenominator}
$$
<!-- vale on -->
<!-- markdownlint-enable MD013 -->

## Validators

**Validators** secure Avalanche, create new blocks/vertices, and process
transactions. To achieve consensus, validators repeatedly sample each other. The
probability that a given validator is sampled is proportional to its stake.

When you add a node to the validator set, you specify:

- Your node’s ID
- When you want to start and stop validating
- How many AVAX you are staking
- The address to send any rewards to
- Your delegation fee rate (see below)

:::info
The minimum amount that a validator must stake is 2,000 AVAX.
:::

:::warning 

Note that once you issue the transaction to add a node as a
validator, there is no way to change the parameters. **You can’t remove your
stake early or change the stake amount, node ID, or reward address.** Please
make sure you’re using the correct values in the API calls below. If you’re not
sure, ask for help on [Discord](https://chat.avax.network). If you want to add
more tokens to your own validator, you can delegate the tokens to this node -
but you cannot increase the base validation amount (so delegating to yourself
goes against your delegation cap). 

:::

### Running a Validator

If you’re running a validator, it’s important that your node is well connected
to ensure that you receive a reward. 

When you issue the transaction to add a validator, the staked tokens and
transaction fee (which is 0) are deducted from the addresses you control. When
you are done validating, the staked funds are returned to the addresses they
came from. If you earned a reward, it is sent to the address you specified when
you added yourself as a validator.

#### Allow API Calls

To make API calls to your node from remote machines, allow traffic on the API
port (`9650` by default), and run your node with argument `--http-host=`

You should disable all APIs you will not use via command-line arguments. You
should configure your network to only allow access to the API port from trusted
machines (for example, your personal computer.)

#### Why Is My Uptime Low?

Every validator on Avalanche keeps track of the uptime of other validators.
Every validator has a weight (that is the amount staked on it.) The more weight a
validator has, the more influence they have when validators vote on whether your
node should receive a staking reward. You can call API method `info.uptime` on
your node to learn its weighted uptime and what percentage of the network stake
currently thinks your node has an uptime high enough to receive a staking
reward.

You can also see the connections a node has by calling `info.peers`, as well as
the uptime of each connection. **This is only one node’s point of view**. Other
nodes may perceive the uptime of your node differently. Just because one node
perceives your uptime as being low does not mean that you will not receive
staking rewards.

If your node's uptime is low, make sure you're setting config option
`--public-ip=[NODE'S PUBLIC IP]` and that your node can receive incoming TCP
traffic on port 9651.

#### Secret Management

The only secret that you need on your validating node is its Staking Key, the
TLS key that determines your node’s ID. The first time you start a node, the
Staking Key is created and put in `$HOME/.avalanchego/staking/staker.key`. You
should back up this file (and `staker.crt`) somewhere secure. Losing your
Staking Key could jeopardize your validation reward, as your node will have a
new ID.

You do not need to have AVAX funds on your validating node. In fact, it's best
practice to **not** have a lot of funds on your node. Almost all of your funds
should be in "cold" addresses whose private key is not on any computer.

#### Monitoring

Follow this [tutorial](../maintain/setting-up-node-monitoring.md) to learn how
to monitor your node's uptime, general health, etc.

## Delegators

A delegator is a token holder, who wants to participate in staking, but chooses
to trust an existing validating node through delegation.

When you delegate stake to a validator, you specify:

- The ID of the node you’re delegating to
- When you want to start/stop delegating stake (must be while the validator is validating)
- How many AVAX you are staking
- The address to send any rewards to

:::info
The minimum amount that a delegator must delegate is 25 AVAX.
:::

:::warning

Note that once you issue the transaction to add your stake to a delegator, there
is no way to change the parameters. **You can’t remove your stake early or
change the stake amount, node ID, or reward address.** If you’re not sure, ask
for help on [Discord](https://chat.avax.network).

:::

### Delegator Rewards

If the validator that you delegate tokens to is sufficiently correct and
responsive, you will receive a reward when you are done delegating. Delegators
are rewarded according to the same function as validators. However, the
validator that you delegate to keeps a portion of your reward specified by the
validator’s delegation fee rate.

When you issue the transaction to delegate tokens, the staked tokens and
transaction fee are deducted from the addresses you control. When you are done
delegating, the staked tokens are returned to your address. If you earned a
reward, it is sent to the address you specified when you delegated tokens.

## FAQ

### Is There a Tool to Check the Health of a Validator?

Yes, just enter your node's ID in the Avalanche Stats 
[Validator Health Dashboard](https://stats.avax.network/dashboard/validator-health-check/?nodeid=NodeID-Jp4dLMTHd6huttS1jZhqNnBN9ZMNmTmWC).

### How Is It Determined Whether a Validator Receives a Staking Reward?

When a node leaves the validator set, the validators vote on whether the leaving
node should receive a staking reward or not. If a validator calculates that the
leaving node was responsive for more than the required uptime (currently 80%),
the validator will vote for the leaving node to receive a staking reward.
Otherwise, the validator will vote that the leaving node should not receive a
staking reward. The result of this vote, which is weighted by stake, determines
whether the leaving node receives a reward or not.

Each validator only votes "yes" or "no." It does not share its data such as the
leaving node's uptime.

Each validation period is considered separately. That is, suppose a node joins
the validator set, and then leaves. Then it joins and leaves again. The node's
uptime during its first period in the validator set does not affect the uptime
calculation in the second period, hence, has no impact on whether the node
receives a staking reward for its second period in the validator set.

### How Are Delegation Fees Distributed To Validators?

If a validator is online for 80% of a delegation period, 
they receive a % of the reward (the fee) earned by the delegator. 
The P-Chain used to distribute this fee as a separate UTXO per delegation period. 
After the 
[Cortina Activation](https://medium.com/avalancheavax/cortina-x-chain-linearization-a1d9305553f6), 
instead of sending a fee UTXO for each successful delegation period, 
fees are now batched during a node’s entire validation period and are distributed when it is unstaked.

### Error: Couldn't Issue TX: Validator Would Be Over Delegated

This error occurs whenever the delegator can not delegate to the named validator. 
This can be caused by the following.

- The delegator `startTime` is before the validator `startTime`
- The delegator `endTime` is after the validator `endTime`
- The delegator weight would result in the validator total weight exceeding its maximum weight
