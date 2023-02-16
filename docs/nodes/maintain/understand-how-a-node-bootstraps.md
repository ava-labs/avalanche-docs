# Understand how a node bootstraps

Bootstrapping our node is the process of letting it *securely* download chain blocks
or DAG vertexs so to recreate the chain full state locally.

Bootstrapping must guarantee that the local state of our node is in sync with
other valid nodes state. In this way our node can verify incoming transactions and
reach consensus with other nodes, collectivelly moving forward the chains.

Bootstrapping a node is a multi-step process which requires dowloading both
Primary Network chains and any subnet chain the node explicitly tracks in a
precise order.

Here we try to describe these steps.

## A note on linear chains and DAGs

Avalanche hosts both linear chains made up of blocks and DAGs containing
vertexes.

While consensus flows over a linear chain and DAGs are different, bootstrapping
mechanisms are pretty similar. In fact so similar that we'll be able to describe
these mechanisms without specifying the nature of the blockchain to bootstrap.

Blocks and vertexes are just ordered lists of transactions and we refer them
collectivelly as containers whenever needed.

TODO: make sure to carefully use "node" and "validator" words, althought in this
specific context there is no much difference.

## It's about validators (and where to find them)

Bootstrapping is all about downloading previously accepted containers *in the
most secure manner*. We don't want our node to trust a rogue source and download
its blocks. These blocks would end up poisoning our node local state and making it
impossible for the node to properly validate the network and reach consensus with
other nodes.

What is the most reliable source of information in the Avalanche ecosystem? It's
a *large enough* majority of validators! So the first step of bootstrapping is
finding enough validators to download containers from.

The P-chain continuosly keeps track of validators. So whenever any chain
*other than the P-chain* has to bootstrap, the P-chain should be able to provide
an up-to-date list of validators for that subnet. The node can then reach these
validators out to securily download containers.

There is a caveat here: the validators list must be *up-to-date*. If the validator
list is not up-to-date, the node may mistakely assume that some nodes are still
validating while their validation period has expired already. This would open up
the possibility to download faulty blocks from an source that is not secure (anymore).

So every avalanche node must fully bootstrap the P-chain before moving on
to the other Primary Network chains and other subnets.

Validators and beacons availability is key to the bootstrapping process.
Bootstrap process stalls until the node has created a secure connections to
enough vadalitors or beacons. Moreover if the node fails to reach beacons within
a given time, the node will shut-down as no operation can be carried out
securily.

As soon as validators are loaded from P-chain, node attempts to establish a connection with them (VERIFY)

Bootstrap starts only if (3*bootstrapWeight+3)/4 of validators or beacons are connected!
Alpha is bootstrapWeight/2 + 1. What is alpha used for in bootstrapping?


From Joshua's notes

``` txt
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
