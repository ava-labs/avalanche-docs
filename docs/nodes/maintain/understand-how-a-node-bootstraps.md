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

## The Bootstrap Mechanics

Once we understand how to find and connect to validators and beacons, we can
look at how the block download works.

Let's start by dispelling a common belief: *Avalanche chains are not
bootstrapped from the genesis up to their frontier*.

Instead, blocks are downloaded from the frontier down to genesis and then
executed upwards. The frontier is the last accepted block for linear chains and
the last accepted vertexes for DAGs. 

Why can't we simply download blocks in order, from the genesis upward? The
reason is again safety: if we dowloaded containers upward we wouldn't have a way
to readily verify whether they are legit or they are fed to our node by some
malicious peer. Instead by retrieving the frontier securely from a majority of
honest nodes first, we can cheaply spot any made up container by simply looking
at its ID and checking whether it duly connects with the valid frontier.

Let's now see the two bootstrap phases, the frontier retrieval and the container execution.

### Frontier Retrieval

The current frontier is retrieved by polling chain validators or beacons.
Avalanche bootstrapping is designed to be robust: the process must be able to
progres even if very slow validators are selected as information source. It also
handles natively network issues; it better do since bootstrapping may take quite
some time to complete.

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
respond returning the subset of know candidates, whether they are close to the
frontier it knows or pretty old containers. By returning even old containers the
bootstrap process will proceed even starting from and out-of-date frontier.

Frontier retrieval completes when at least one of the candidate frontier is
supported by more than $50\%$ of all validators stake. There may be multiple
containers being validated by a strict majority of network stake. They will all
be used for the next phase, container downloading.

Note that at any point of these steps a network issue may occur, preventing our
node to retrieve the frontiers or validate them. In such case bootstrap will
restart by resampling some seeders and repeting the whole process,
optimistically assuming the network issue will go away at some point.

### Containers Execution

Once frontiers are retrieved containers are downloaded from the frontier
down to genesis (if it's the first time bootstrap is carried out) or the
latest accepted container available locally (if bootstrap has already run once).
At first containers are downloaded and parsed to verify their sequence is correct but not executed.
Once a node has all containers, they are executed upwards and VMs will update their state with containers content.


## Orchestrating Multiple Chains

We mentioned already that the P-chain will fully bootstrap at first.
Then the C-chain, X-chain and any other chain in explicitly tracked subnets will be bootstrap in parallel.

## When Does Bootstrapping Finish?

## Enters State Sync

## Forbidden Operations
