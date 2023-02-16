# Understand how a node bootstraps

Bootstrapping our node is the process of let it *securely* download chain blocks
or DAG vertexs so that full state is rebuilt locally.

Bootstrapping must guarantee that the local state of our node is in sync with
other valid nodes state so that our node can verify incoming transactions and
reach consensus with other nodes, collectivelly moving forward the chains.

Bootstrapping a node is a multi-step process which requires rebuilding both
Primary Network chains and any subnet chain the node explicitly track in a
precise order.

Here we try to describe these steps.

## A note on linear chains and DAGs

Avalanche hosts both linear chains made up of blocks and DAGs containing
vertexes.

While consensus over a linear chain and DAGs is different, bootstrapping
mechanisms are pretty similar. In fact so similar that we'll be able to describe
these mechanisms without specifying the nature of the blockchain to bootstrap.

Blocks and vertexes are containers for transactions and we refer them
collectivelly as containers whenever needed.

## It's about validators (and where to find them)

Bootstrapping is all about downloading previously accepted containers *in the most secure manner*.
What is the most reliable source of information in the Avalanche ecosystem? It's a *large enough* majority of validators!
A bootstrapping node seek to download the chains from trusted validators and avoid malicious nodes that could feed us containers created ad-hoc. These containers would poison the node local state and p

The P-chain registers validators and tracks them continously. Whenever any chain
*other than the P-chain* has to bootstrap, the P-chain must be able to provide
an up-to-date list of validators for that subnet. The node can then reach these
validators to securily download containers.

This also explains why the P-chain must be fully bootstrapped before moving on
to other chains and subnets. In fact it's only when the P-chain is up-to-date
that we can access a reliable set of current validators. If the P-chain state is
not up-to-date the node may mistakely assume that some nodes are still
validating while their validation period has expired already and it would then
open up the possibility to download faulty blocks from an non-validator.

For the P-chain itself instead we won't have an updated list of validators available. Some validators may be already be available locally but 

Validators and beacons availability is key to the bootstrapping process.
Bootstrap process stalls until the node has created a secure connections to
enough vadalitors or beacons. Moreover if the node fails to reach beacons within
a given time, the node will shut-down as no operation can be carried out
securily.

As soon as validators are loaded from P-chain, node attempts to establish a connection with them (VERIFY)

Bootstrap starts only if (3*bootstrapWeight+3)/4 of validators or beacons are connected!
Alpha is bootstrapWeight/2 + 1. What is alpha used for in bootstrapping?


From Joshua's notes
```
    In Avalanche, nodes connect to an initial set of bootstrapper nodes known as **beacons** (this is user-configurable). Once connected to a set of beacons, a node is able to discover other nodes in the network. Over time, a node eventually discovers other peers in the network through `PeerList` messages it receives through:

    - The handshake initiated between two peers when attempting to connect to a peer (see [Connecting](#connecting)).
    - Periodic `PeerList` gossip messages that every peer sends to the peers it's connected to (see [Connected](#connected)).
```

## A chain bootstrap mechanics

Avalanche chains are *not* bootstrapped from the genesis up to their frontier.
Instead bootstrap happens in two phases we call frontier retrieval and block downloading.

### Frontier retrieval

The current frontier is retrieved by polling chain validators.


### Block downloading

Once frontier is retrieved blocks are downloaded from peers from the frontier
down to genesis (if it's the first time bootstrap is carried out) or the
latest accepted block available locally (if bootstrap has already run once).


## Orchestrating multiple chains bootstrapping


## Moving to full node operativity

## Enters state syncing

## Forbidden operations during bootstrap
