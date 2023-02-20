# Understanding Node Bootstrap

Node Bootstrap is the process of how a node *securely* downloads linear chain
blocks or DAG chain vertices to recreate the latest state of the chain locally.

Bootstrap must guarantee that the local state of a node is in sync with the
state of other valid nodes. Once bootstrap is completed, a node has the latest
state of the chain and can verify new incoming transactions and reach consensus
with other nodes, collectively moving forward the chains.

Bootstrapping a node is a multi-step process which requires downloading the
chains required by the Primary Network (i.e the C-Chain, P-Chain, and X-Chain),
as well as the chains required by any additional Subnets that the node
explicitly tracks.

This document covers the high-level technical details of how bootstrapping
works. This document glosses over some specifics, but the
[avalanchego](https://github.com/ava-labs/avalanchego) codebase is open-source
and is available for curious-minded readers to learn more.

## A Note On Linear Chains and DAGs

Avalanche supports both linear chains made up of blocks and DAGs chains made up
of vertices.

While consensus logic over linear chains and DAGs chains are different,
bootstrap logic between the two are similar enough such that they can be
described without specifying the nature of the blockchain being bootstrapped.

Blocks and vertices at their core are simply ordered lists of transactions and
can be thought of as the same abstraction - containers.

## It's About Validators (And Where To Find Them)

Bootstrapping is all about downloading all previously accepted containers
*securely* so a node can have the latest correct state of the chain. A node
can't arbitrarily trust any source - a malicious actor could provide malicious
blocks, corrupting the boostrapping node's local state, and making it impossible
for the node to correctly validate the network and reach consensus with other
correct nodes.

What is the most reliable source of information in the Avalanche ecosystem? It's
a *large enough*majority of validators! Therefore, the first step of
bootstrapping is finding a sufficient amount of validators to download
containers from.

The P-Chain is responsible for all platform-level operations, including staking
events that modify a Subnet's validator set. Whenever any chain (aside from the
P-Chain itself) bootstraps, it requests an up-to-date validator set for that
Subnet. Once the Subnet's current validator set is known, the node can securely
download containers from these validators to bootstrap the chain.

There is a caveat here: the validator set must be *up-to-date*. If a
bootstrapping node's validator set is stale, the node may incorrectly believe
that some nodes are still validators when their validation period has already
expired. A node might unknowingly end up requesting blocks from non-validators
which respond with malicious blocks that aren't safe to download.

**For this reason, every Avalanche node must fully bootstrap the P-chain first
before moving on to the other Primary Network chains and other Subnets to
guarantee that their validator sets are up-to-date**.

What about the P-chain? The P-chain can't ever have an up-to-date validator set
before completing its bootstrap! To solve this chicken-and-egg situation the
Avalanche Foundation maintains a trusted default set of validators called
beacons (but users are free to configure their own). Beacon Node-IDs and IP
addresses are listed in the
[AvalancheGo codebase](https://github.com/ava-labs/avalanchego/blob/master/genesis/beacons.go).
Every node has the beacons list available from the start and can reach them out
as soon as it starts.

Beacons and validators are the only sources of truth for a blockchain. Beacon
and validator availability is so key to the bootstrapping process that
**bootstrap blocks until the node establishes a sufficient amount of secure
connections to beacons and validators**. If the node fails to reach a sufficient
amount within a given period of time, it shuts down as no operation can be
carried out safely.

## The Bootstrap Mechanics

Once we understand how to find and connect to validators and beacons, we can
look at how the block download works.

Let's start by dispelling a common belief: *Avalanche chains are not
bootstrapped from the genesis up to their frontier*.

Instead, blocks are downloaded from the frontier down to genesis and then
executed upwards. The frontier is the last accepted block for linear chains and
the last accepted vertices for DAGs.

Why can't we simply download blocks in order, from the genesis upward? The
reason is efficiency: if we downloaded containers upward we would get the
maximum safety we seek only by polling a majority of validators for every single
container. That's a lot of network traffic for a single container, and we'd need
to do that for all containers in the chain. Instead if we start by securely
retrieving the frontier from a majority of honest nodes and then we download the
parent containers from the frontier down to genesis, we can cheaply check that
containers align correctly just by verifying at their IDs. Each Avalanche
container carries the IDs of its parents (one block parent for linear chains,
possibly multiple parents for DAGs) and IDs integrity can be guaranteed by
cryptographic means.

Let's now see the two bootstrap phases, the frontier retrieval and the container
execution.

### Frontier Retrieval

The current frontier is retrieved by polling chain validators or beacons.
Avalanche bootstrapping is designed to be robust: the process must be able to
progress even if very slow validators are selected as information source. It
also natively handles network issues; it needs to, since bootstrapping may take
quite some time to complete and networks connections can be unreliable.

Here's the frontier retrieval steps.

Bootstrap starts when our node has connected to a majority of validators or
beacons. Validators are not really counted but weighted by their stake:
bootstrap starts when our node is connected to at least $75\%$ of all validators
or beacons stake.

A subset of seeders is randomly sampled from validators or beacons. Seeders are
the first peers reached out by our node to elicit their current frontier.
Seeders are just a subset of network nodes; they may be slow and provide not
very up-to-date frontier; they may be malicious and return fake container IDs.
But they will give an initial set of candidate frontiers to work with.

Once our node has received the candidate frontiers, it polls **every network
validator** to vet the candidates. It sends its list of candidate frontiers
asking whether every given validator knows about them. Then every validator will
respond returning the subset of known candidates, whether they are close to the
frontier it knows or pretty old containers. By returning even old containers the
bootstrap process will proceed even starting from and out-of-date frontier.

Frontier retrieval completes when at least one of the candidate frontiers is
supported by more than $50\%$ of all validators stake. There may be multiple
containers being validated by a strict majority of network stake. They will all
be used for the next phase, container downloading.

Note that at any point of these steps a network issue may occur, preventing our
node to retrieve the frontiers or validate them. In such case bootstrap will
restart by sampling new seeders and repeating the whole process, optimistically
assuming the network issue will go away at some point.

### Containers Execution

Once we have one or multiple valid frontiers, our node will start downloading
all parent containers. If it's the first time our node is running, it won't know
any container and will try downloading all parent containers from the frontiers
down to genesis (unless [state sync](#enters-state-sync) is enabled). If
bootstrap had already run once, some containers will be available locally and
our node will stop as soon as it finds a known one.

Containers are first just downloaded and parsed. Once the chain or the DAG is
complete, our node will execute them in order going upward from the oldest
downloaded parent to the frontier. This allows the node to rebuild the full
chain state and to eventually be in sync with the rest of the network.

## When Does Bootstrapping Finish?

So we have seen [the bootstrap mechanics](#the-bootstrap-mechanics) for a single
chain or DAG. However our node must bootstrap the three Primary Network chains
as well as every Subnet it tracks, each with possibly multiple chains. So when
are these chains bootstrapped? When does the whole node bootstrapping finish?

We mentioned already that the P-chain will fully bootstrap first, before any
other chain and Subnet. Then the Primary Network C-chain and X-chain as well as
any other chain in tracked Subnets will start bootstrapping. They will proceed
in parallel, each connecting to their validators.

Our node declares a Subnet bootstrapped when all of its chains have completed
bootstrap. This is true for both the Primary Network and other tracked Subnets.
Note that different Subnets are independent in this regards: some Subnets may
have transition into normal operations, validating new transactions and adding
new containers on top of their frontier, while other Subnets are still
bootstrapping.

However within a single Subnet all chains must wait for the slowest of them to
complete bootstrapping. So the chain with longest history or the most complex
operations could effectively stall the other chains in the same Subnet. What's
worse, since the Subnet validators will carry on accepting new transactions and
adding new containers on top of retrieved frontiers, these chains may fall back
with respect to the new, ever moving, current frontier.

Our avalanche node mitigates this situation by restarting bootstrap for chains
who are waiting for the whole Subnet to finish bootstrapping. These chains will
go again through the frontier retrieval and container downloading phases to
reduce their distance from the ever moving current frontier till the slowest
chain has done with its first bootstrap run.

Then our node will be finally ready to validate the network.

## Enters State Sync

The full node bootstrap is a long process and as time goes by, it gets longer
and longer since more and more containers are accepted. We mentioned above that
our node needs to build the full chain state locally. Downloading and
executing all containers is one way to get that full state But not the only one.

Starting from [AvalancheGo version
1.7.11](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.11), our node
can use state sync to drastically cut down C-chain bootstrapping time. Instead
of executing all blocks, state sync uses cryptographic techniques to download
and verify just the state associated with the current frontier. State synced nodes
cannot serve every C-chain block ever accepted but they can safely get the full
C-chain state needed to validate in a much smaller time.

Note that state sync is currently available for the C-chain only. Both P-chain
and X-chain bootstrap by downloading all blocks. Also note that each Primary
Network chain must still wait on other Primary Network chains to complete
bootstrap or state sync before moving onto normal operating mode.

## Conclusions and FAQ

If you got this far, you hopefully have a better idea of what is going on when
your node bootstrap. We have skipped over the most minute details but you should
still be able to answer to some of the FAQ we receive about bootstrapping.

### How Can I Get the ETA for Node Bootstrap?

Logs provide information about both container downloading and their execution
for each chain. Here is an example

```text
[02-16|17:31:42.950] INFO <P Chain> bootstrap/bootstrapper.go:494 fetching blocks {"numFetchedBlocks": 5000, "numTotalBlocks": 101357, "eta": "2m52s"}
[02-16|17:31:58.110] INFO <P Chain> bootstrap/bootstrapper.go:494 fetching blocks {"numFetchedBlocks": 10000, "numTotalBlocks": 101357, "eta": "3m40s"}
[02-16|17:32:04.554] INFO <P Chain> bootstrap/bootstrapper.go:494 fetching blocks {"numFetchedBlocks": 15000, "numTotalBlocks": 101357, "eta": "2m56s"}
...
[02-16|17:36:52.404] INFO <P Chain> queue/jobs.go:203 executing operations {"numExecuted": 17881, "numToExecute": 101357, "eta": "2m20s"}
[02-16|17:37:22.467] INFO <P Chain> queue/jobs.go:203 executing operations {"numExecuted": 35009, "numToExecute": 101357, "eta": "1m54s"}
[02-16|17:37:52.468] INFO <P Chain> queue/jobs.go:203 executing operations {"numExecuted": 52713, "numToExecute": 101357, "eta": "1m23s"}
```

Similar logs are emitted for X and C chains and any chain in explicitly tracked Subnets.

### Why Chain Bootstrap ETA Keeps On Changing?

As we saw in the [bootstrap completion
section](#when-does-bootstrapping-finish), a Subnet like the Primary Network
completes when all of its chains finish bootstrapping. Some of the Subnet chains
may have to wait for the slowest to finish. They'll restart bootstrapping in the
meantime, to make sure they won't fall back too much with respect to the network
accepted frontier.
