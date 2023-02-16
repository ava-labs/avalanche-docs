# Understand Nodes Bootstrapping

Bootstrapping our node is the process of letting it *securely* download chain blocks
or DAG vertexes so to recreate the chain full state locally.

Bootstrapping must guarantee that the local state of our node is in sync with
other valid nodes state. In this way our node can verify incoming transactions and
reach consensus with other nodes, collectively moving forward the chains.

Bootstrapping a node is a multi-step process which requires downloading both
Primary Network chains and any Subnet chain the node explicitly tracks in a
precise order.

In this document we introduce you to these steps, with an high level yet
technical picture. We'll gloss over the most minute details; [our
codebase](https://github.com/ava-labs/avalanchego) is open and available for the
interested readers to dig in and learn about them.

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
its blocks. These blocks would end up poisoning our node local state and making
it impossible for the node to properly validate the network and reach consensus
with other nodes.

What is the most reliable source of information in the Avalanche ecosystem? It's
a *large enough* majority of validators! So the first step of bootstrapping is
finding enough validators to download containers from.

The P-chain continuously keeps track of validators. So whenever any chain *other
than the P-chain* has to bootstrap, the P-chain should be able to provide an
up-to-date list of validators for that Subnet. The node can then reach these
validators out to securely download containers.

There is a caveat here: the validators list must be *up-to-date*. If the
validator list is not up-to-date, the node may mistakenly assume that some nodes
are still validating while their validation period has expired already. This
would open up the possibility to download faulty blocks from an source that is
not secure (anymore).

**So every avalanche node must fully bootstrap the P-chain before moving on to
the other Primary Network chains and other Subnets**.

What about the P-chain? The P-chain can never have an up-to-date validators list
before completing its bootstrap. To solve this chicken-and-egg situation the
Avalanche Foundation maintains a trusted set of validators called beacons.
Beacons Node-IDs and IP addresses are listed in [the AvalancheGo
codebase](https://github.com/ava-labs/avalanchego/blob/master/genesis/beacons.go).
Every node has the beacons list available from the start and reach them out as
soon as they start. 

Beacons and validators are the only trusted sources of information for chains
content. Beacons and validators availability is key to the bootstrapping process
so much that **bootstrap stalls until the node establishes secure connections to
enough beacons or validators**. If the node fails to reach beacons within a
given timeout, it shuts down as no operation can be carried out securely.

## The Bootstrap Mechanics

Once we understand how to find and connect to validators and beacons, we can
look at how the block download works.

Let's start by dispelling a common belief: *Avalanche chains are not
bootstrapped from the genesis up to their frontier*.

Instead, blocks are downloaded from the frontier down to genesis and then
executed upwards. The frontier is the last accepted block for linear chains and
the last accepted vertexes for DAGs. 

Why can't we simply download blocks in order, from the genesis upward? The
reason is again safety: if we downloaded containers upward we wouldn't have a way
to readily verify whether they are legit or they are fed to our node by some
malicious peer. Instead by retrieving the frontier securely from a majority of
honest nodes first, we can cheaply spot any made up container by simply looking
at its ID and checking whether it duly connects with the valid frontier.

Let's now see the two bootstrap phases, the frontier retrieval and the container
execution.

### Frontier Retrieval

The current frontier is retrieved by polling chain validators or beacons.
Avalanche bootstrapping is designed to be robust: the process must be able to
s even if very slow validators are selected as information source. It also
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
restart by sampling new seeders and repeating the whole process,
optimistically assuming the network issue will go away at some point.

### Containers Execution

Once we have one or multiple valid frontiers, our node will start downloading
all parent containers. If it's the first time our node is running, it won't know
any container and will try downloading all parent containers from the frontiers
down to genesis (unless [state sync](#enters-state-sync) is enabled). If
bootstrap had already run once, some containers will be available locally and
our node will stop as soon as it finds a known one.

Containers are first just downloaded and parsed. Once the chain or the DAG is
complete, our node will execute them in order going upward from the oldest
downloaded parent to the frontier. This allows the node to fully rebuild the
chain state and to eventually be in sync with the rest of the network.

## When Does Bootstrapping Finish?

So we have seen [the bootstrap mechanics](#the-bootstrap-mechanics) for a single
chain or DAG. However our node must bootstrap the three Primary Network chains
as well as every Subnet it tracks, each with possibly multiple chains. So when
these chains are bootstrapped? When does the whole node bootstrapping finish?

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
our node needs to recreate the chain full state locally. Downloading and executing
all containers is one way to get that full state But not the only one.

Starting from [Avalanchego version
1.7.11](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.11), our node
can use state sync to drastically cut down C-chain bootstrapping time. Instead
of executing all blocks, state sync uses cryptographic techniques to download
and verify just the state associated to the current frontier. State synced nodes
cannot serve every C-chain block ever accepted but they can safely get the full
C-chain state needed to validate in a much smaller time.

Note that state sync is currently available for the C-chain only. Both P-chain
and X-chain bootstrap by downloading all blocks. Also note that each Primary
Network chain must still wait on other Primary Network chains to complete
bootstrap or state sync before moving onto normal operating mode.
