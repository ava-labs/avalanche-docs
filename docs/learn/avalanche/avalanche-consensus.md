---
description: Avalanche is a new consensus protocol that is scalable, robust, and decentralized.
---

# Avalanche Consensus

Consensus is the task of getting a group of computers (a.k.a. nodes) to come to an agreement on a decision.
In blockchain, this means that all the participants in a network have to agree on the changes made to
the shared ledger. This agreement is reached through a specific process, a consensus protocol,
that ensures that everyone sees the same information and that the information is accurate and trustworthy.

**Avalanche Consensus** is a new consensus protocol that is scalable, robust, and decentralized. It
combines features of both classical and Nakamoto consensus mechanisms to achieve high throughput, 
fast finality, and
energy efficiency. For the whitepaper, see [here](https://www.avalabs.org/whitepapers). 

Key Features Include: 

- Speed: Avalanche consensus provides sub-second, immutable finality, ensuring that transactions are
quickly confirmed and irreversible.
- Scalability: Capable of a peak throughput of up to 20,000 transactions per second with a latency
of less than half a second.
- Energy Efficiency: Unlike other popular consensus protocols, participation in Avalanche consensus
is not computationally intensive nor expensive. 
- Adaptive Security: Avalanche consensus is designed to resist various attacks, including sybil
attacks, distributed denial-of-service (DDoS) attacks, and collusion attacks. Its probabilistic
nature ensures that the consensus outcome converges to the desired state, even when the network
is under attack. 

![Consensus Comparison](/img/Consensus-protocol-comparison.png)

## Conceptual Overview

Consensus protocols in the Avalanche family operate through repeated sub-sampled voting. When a
[validator](http://support.avalabs.org/en/articles/4064704-what-is-a-blockchain-validator) is
determining whether a
[transaction](http://support.avalabs.org/en/articles/4587384-what-is-a-transaction) should be
accepted, it asks a small, random subset of validators for their preference. Each queried validator
replies with the transaction that it prefers, or thinks should be accepted.

:::note

Consensus will never include a transaction that is determined to be **invalid**. For example, if you
were to submit a transaction to send 100 AVAX to a friend, but your wallet only has 2 AVAX, this transaction
is considered **invalid** and will not participate in consensus. 

:::

If a majority of the validators sampled reply with the same preferred
transaction, this becomes the preferred choice of the group sampled, including the validator that asked.
In the future, this validator and all those who have participated in at least one round of sampling
will reply with the transaction preferred by the majority.

Overtime, more and more validators are queried, and the group in agreement grows larger and larger.

The validator repeats this sampling process until a sufficiently large portion of the validators
queried reply with the same answer for a certain number of consecutive rounds.

- The number of validators required to be considered "sufficiently large" is referred to as "α" (_alpha_).
- The number of consecutive rounds required to reach consensus, a.k.a. the "Confidence Threshold,"
is referred to as "β" (_beta_).

When a transaction has no conflicts, finalization happens very quickly. When
conflicts exist, honest validators quickly cluster around conflicting transactions, entering a
positive feedback loop until all correct validators prefer that transaction. This leads to the
acceptance of non-conflicting transactions and the rejection of conflicting transactions.

![How Avalanche Consensus Works](/img/howavalancheconsensusworks.png)

Avalanche Consensus virtually guarantees that if any honest validator accepts a transaction,
all honest validators will come to the same conclusion.

:::info

For a great visualization, check out [this demo](https://tedyin.com/archive/snow-bft-demo/#/snow) 
from Ava Labs' Co-Founder Ted Yin. 

:::

## Deep Dive Into Avalanche Consensus

<iframe src="https://www.youtube.com/embed/ZUF9sIu-D_k"
        width="100%"
        height="480px"
        title="Deep Dive on the Avalanche Protocol"
        className="video-container"
        display="initial"
        position="relative"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
</iframe>

### Intuition

First, let's develop some intuition about the protocol. Imagine a room full of people trying to
agree on what to get for lunch. Suppose it's a binary choice between pizza and barbecue. Some people
might initially prefer pizza while others initially prefer barbecue. Ultimately, though, everyone's
goal is to achieve **consensus**.

Everyone asks a random subset of the people in the room what their lunch preference is. If more than
half say pizza, the person thinks, "OK, looks like things are leaning toward pizza. I prefer pizza
now." That is, they adopt the _preference_ of the majority. Similarly, if a majority say barbecue,
the person adopts barbecue as their preference.

Everyone repeats this process. Each round, more and more people have the same preference. This is
because the more people that prefer an option, the more likely someone is to receive a majority
reply and adopt that option as their preference. After enough rounds, they reach consensus and
decide on one option, which everyone prefers.

### Snowball

The intuition above outlines the Snowball Algorithm, which is a building block of Avalanche
consensus. Let's review the Snowball algorithm.

#### Parameters

- _n_: number of participants
- _k_ (sample size): between 1 and _n_
- α (quorum size): between 1 and _k_
- β (decision threshold): &gt;= 1

#### Algorithm

```text
preference := pizza
consecutiveSuccesses := 0
while not decided:
  ask k random people their preference
  if >= α give the same response:
    preference := response with >= α
    if preference == old preference:
      consecutiveSuccesses++
    else:
      consecutiveSuccesses = 1
  else:
    consecutiveSuccesses = 0
  if consecutiveSuccesses > β:
    decide(preference)
```

#### Algorithm Explained

Everyone has an initial preference for pizza or barbecue. Until someone has _decided_, they query
_k_ people (the sample size) and ask them what they prefer. If α or more people give the same
response, that response is adopted as the new preference. α is called the _quorum size_. If the new
preference is the same as the old preference, the `consecutiveSuccesses` counter is incremented. If
the new preference is different then the old preference, the `consecutiveSuccesses` counter is set
to `1`. If no response gets a quorum (an α majority of the same response) then the
`consecutiveSuccesses` counter is set to `0`.

Everyone repeats this until they get a quorum for the same response β times in a row. If one person
decides pizza, then every other person following the protocol will eventually also decide on pizza.

Random changes in preference, caused by random sampling, cause a network preference for one choice,
which begets more network preference for that choice until it becomes irreversible and then the
nodes can decide.

In our example, there is a binary choice between pizza or barbecue, but Snowball can be adapted to
achieve consensus on decisions with many possible choices.

The liveness and safety thresholds are parameterizable. As the quorum size, α, increases, the safety
threshold increases, and the liveness threshold decreases. This means the network can tolerate more
byzantine (deliberately incorrect, malicious) nodes and remain safe, meaning all nodes will
eventually agree whether something is accepted or rejected. The liveness threshold is the number of
malicious participants that can be tolerated before the protocol is unable to make progress.

These values, which are constants, are quite small on the Avalanche Network. The sample size, _k_,
is `20`. So when a node asks a group of nodes their opinion, it only queries `20` nodes out of the
whole network. The quorum size, α, is `14`. So if `14` or more nodes give the same response, that
response is adopted as the querying node's preference. The decision threshold, β, is `20`. A node
decides on choice after receiving `20` consecutive quorum (α majority) responses.

Snowball is very scalable as the number of nodes on the network, _n_, increases. Regardless of the
number of participants in the network, the number of consensus messages sent remains the same
because in a given query, a node only queries `20` nodes, even if there are thousands of nodes in
the network.

### Vertices

Everything discussed to this point is how Avalanche is described in [the Avalanche
white-paper](https://assets-global.website-files.com/5d80307810123f5ffbb34d6e/6009805681b416f34dcae012_Avalanche%20Consensus%20Whitepaper.pdf).
The implementation of the Avalanche consensus protocol by Ava Labs (namely in AvalancheGo) has some
optimizations for latency and throughput. The most important optimization is the use of
**vertices**. A vertex is like a block in a linear blockchain. It contains the hashes of its
parents, and it contains a list of transactions. Vertices allow transactions to be batched and voted
on in groups rather than one by one.

If a node receives a vote for a vertex, it counts as a vote for all the transactions in a vertex,
and votes are applied transitively upward. A vertex is accepted when all the transactions which are
in it are accepted. If a vertex contains a rejected transaction then it is rejected and all of its
descendants are rejected. If a vertex is rejected, any valid transactions are re-issued into a new
vertex which is not the child of a rejected vertex. New vertices are appended to preferred vertices.

### Finality

Avalanche consensus is probabilistically safe up to a safety threshold. That is, the probability
that a correct node accepts a transaction that another correct node rejects can be made arbitrarily
low by adjusting system parameters. In Nakamoto consensus protocol (as used in Bitcoin and Ethereum,
for example), a block may be included in the chain but then be removed and not end up in the
canonical chain. This means waiting an hour for transaction settlement. In Avalanche,
acceptance/rejection are **final and irreversible** and only take a few seconds.

### Optimizations

It's not efficient for nodes to just ask, "Do you prefer this vertex?" when they query validators.
In Ava Labs' implementation, during a query a node asks, "Given that this vertex exists, which
vertices do you prefer?" Instead of getting back a binary yes/no, the node receives the other node's
preferred vertex set.

Nodes don't only query upon hearing of a new transaction. They repeatedly query until there are no
virtuous vertices processing. A virtuous vertex is one that has no conflicts.

Nodes don't need to wait until they get all _k_ query responses before registering the outcome of a
poll. If no transaction can get an α majority then there's no need to wait for the rest of the
responses.

### Validators

If it were free to become a validator on the Avalanche network, that would be problematic because a
malicious actor could start many, many nodes which would get queried very frequently. The malicious
actor could make the node act badly and cause a safety or liveness failure. The validators, the
nodes which are queried as part of consensus, have influence over the network. They have to pay for
that influence with real-world value in order to prevent this kind of ballot stuffing. This idea of
using real-world value to buy influence over the network is called Proof of Stake.

To become a validator, a node must **bond** (stake) something valuable (**AVAX**). The more AVAX a
node bonds, the more often that node is queried by other nodes. When a node samples the network it's
not uniformly random. Rather, it's weighted by stake amount. Nodes are incentivized to be validators
because they get a reward if, while they validate, they're sufficiently correct and responsive.

Avalanche doesn't have slashing. If a node doesn't behave well while validating, such as giving
incorrect responses or perhaps not responding at all, its stake is still returned in whole, but with
no reward. As long as a sufficient portion of the bonded AVAX is held by correct nodes, then the
network is safe, and is live for virtuous transactions.

### Big Ideas

Two big ideas in Avalanche are **subsampling** and **transitive voting**. 

Subsampling has low
message overhead. It doesn't matter if there are twenty validators or two thousand validators; the
number of consensus messages a node sends during a query remains constant.

Transitive voting, where a vote for a vertex is a vote for all its ancestors, helps with transaction
throughput. Each vote is actually many votes in one.

### Loose Ends

Transactions are created by users which call an API on the
[AvalancheGo](https://github.com/ava-labs/avalanchego) full node or create them using a library such
as [AvalancheJS](https://github.com/ava-labs/avalanchejs). Vertices are created when nodes batch
incoming transactions together or when accepted transactions from a rejected vertex get reissued. 
It's important to build on virtuous vertices because if we
built on non-virtuous vertices there would be a higher chance that the node would get rejected which
means there's a higher chance it's ancestors get rejected and we would make less progress.

### Other Observations

Conflicting transactions are not guaranteed to be live. That's not really a problem because if you
want your transaction to be live then you should not issue a conflicting transaction.

Avalanche works for linear chains too. The protocol is largely the same as above, but each vertex
has only one parent. This gives a total ordering of vertices. This is useful for certain
applications where one needs to know if a transaction came before another transaction, such as with
smart contracts. Snowman is the name of Ava Labs' implementation of the Avalanche consensus protocol
for linear chains.

If there are no undecided transactions, the Avalanche consensus protocol _quiesce_. That is, it does
nothing if there is no work to be done. Avalanche is more sustainable than Proof-of-work where nodes
need to constantly do work.

Avalanche has no leader. Any node can propose a transaction and any node that has staked AVAX can
vote on every transaction, which makes the network more robust and decentralized.

## Why Do We Care?

Avalanche is a general consensus engine. It doesn't matter what type of application is put on top of
it. The protocol allows the decoupling of the application layer from the consensus layer. If you're
building a dapp on Avalanche then you just need to define a few things, like how conflicts are
defined and what is in a transaction. You don't need to worry about how nodes come to an agreement.
The consensus protocol is a black box that put something into it and it comes back as accepted or
rejected.

Avalanche can be used for all kinds of applications, not just P2P payment networks. Avalanche's
Primary Network has an instance of the Ethereum Virtual Machine, which is backward compatible with
existing Ethereum Dapps and dev tooling. The Ethereum consensus protocol has been replaced with
Avalanche consensus to enable lower block latency and higher throughput.

Avalanche is very performant. It can process thousands of transactions per second with one to two
second acceptance latency.

## Summary

Avalanche consensus is a radical breakthrough in distributed systems. It represents as large a leap
forward as the classical and Nakamoto consensus protocols that came before it. Now that you have a
better understanding of how it works, check out other documentations for building game-changing
Dapps and financial instruments on Avalanche.
