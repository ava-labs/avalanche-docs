# Understand Nodes Bootstrapping

Bootstrapping our node is the process of letting it *securely* download chain blocks
or DAG vertexes so to recreate the chain full state locally.

Bootstrapping must guarantee that the local state of our node is in sync with
other valid nodes state. In this way our node can verify incoming transactions and
reach consensus with other nodes, collectively moving forward the chains.

Bootstrapping a node is a multi-step process which requires downloading both
Primary Network chains and any Subnet chain the node explicitly tracks in a
precise order.

Here we try to describe these steps.

## A Note On Linear Chains and DAGs

Avalanche hosts both linear chains made up of blocks and DAGs containing
vertexes.

While consensus flows over a linear chain and DAGs are different, bootstrapping
mechanisms are pretty similar. In fact so similar that we'll be able to describe
these mechanisms without specifying the nature of the blockchain to bootstrap.

Blocks and vertexes are just ordered lists of transactions and we refer them
collectively as containers whenever needed.

TODO: make sure to carefully use "node" and "validator" words, although in this
specific context there is no much difference.

## It's About Validators (And Where To Find Them)

Bootstrapping is all about downloading previously accepted containers *in the
most secure manner*. We don't want our node to trust a rogue source and download
its blocks. These blocks would end up poisoning our node local state and making it
impossible for the node to properly validate the network and reach consensus with
other nodes.

What is the most reliable source of information in the Avalanche ecosystem? It's
a *large enough* majority of validators! So the first step of bootstrapping is
finding enough validators to download containers from.

The P-chain continuously keeps track of validators. So whenever any chain
*other than the P-chain* has to bootstrap, the P-chain should be able to provide
an up-to-date list of validators for that Subnet. The node can then reach these
validators out to securely download containers.

There is a caveat here: the validators list must be *up-to-date*. If the validator
list is not up-to-date, the node may mistakenly assume that some nodes are still
validating while their validation period has expired already. This would open up
the possibility to download faulty blocks from an source that is not secure (anymore).

**So every avalanche node must fully bootstrap the P-chain before moving on
to the other Primary Network chains and other Subnets**.

What about the P-chain? The P-chain can never have an up-to-date validators list
before completing its bootstrap. To solve this chicken-and-egg situation the
Avalanche Foundation maintains a trusted set of validators called beacons.
Beacons Node-IDs and IP addresses are listed in [the AvalancheGo
codebase](https://github.com/ava-labs/avalanchego/blob/master/genesis/beacons.go). 
Every node has the beacons list available from the start and reach them out as soon as they start. 

Beacons and validators are the only trusted sources of information for chains
content. Beacons and validators availability is key to the bootstrapping
process so much that **bootstrap stalls until the node establishes secure
connections to enough beacons or validators**. If the node fails to reach
beacons within a given timeout, it shuts down as no operation can be
carried out securely.

## A Chain Bootstrap Mechanics

Avalanche chains are *not* bootstrapped from the genesis up to their frontier.
Instead bootstrap happens in two phases we call frontier retrieval and block downloading.

### Frontier Retrieval

The current frontier is retrieved by polling chain validators.


### Block Downloading

Once frontier is retrieved blocks are downloaded from peers from the frontier
down to genesis (if it's the first time bootstrap is carried out) or the
latest accepted block available locally (if bootstrap has already run once).


## Orchestrating Multiple Chains


## When Does Bootstrapping Finish?

## Enters State Sync

## Forbidden Operations
