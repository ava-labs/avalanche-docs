# Understand how a node bootstraps

Once a node (or a validator) joins the network, it needs download blocks or vertexs.

This step is necessary to build locally chains' state and be then able to verify
and execute incoming transactions, as it is required to validators.

Bootstrapping ain't easy. Let's see if I can clarify it here.
WHAT IT IS, FIRST OF ALL

Note that Avalanche consensus engine does not make any assumption about block
structure, which is entirely left to the VMs. 

## It all starts with validators

## A chain bootstrap mechanics

Avalanche chains are not bootstrapped from the genesis up to their frontier.
Instead bootstrap happens in two phases, frontier retrieval and block downloading.

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
