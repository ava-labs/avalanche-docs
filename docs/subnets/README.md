# Subnets Overview

A **Subnet** is a sovereign network which defines its own rules regarding its
membership and token economics. It is composed of a dynamic subset of Avalanche
validators working together to achieve consensus on the state of one or more
blockchains. Each blockchain is validated by exactly one Subnet, and a Subnet
can have many blockchains. A validator may be a member of many Subnets.

Avalanche's 3 built-in blockchains: Platform Chain (P-Chain), Contract Chain
(C-Chain) and Exchange Chain (X-Chain) are validated and secured by all the
Avalanche validators which compose a special Subnet and is referred as the
Primary Network.

By definition, all Subnet validators must also validate the Avalanche Primary Network.

![image](/img/subnet-validators.png)

(Image adopted from [this article](https://www.coinbase.com/cloud/discover/dev-foundations/intro-to-avalanche-subnets))

Subnets are independent, they specify their own execution logic, determine their
own fee regime, maintain their own state, facilitate their own networking, and
provide their own security. They don’t share execution thread, storage[^1] or
networking with other Subnets including the Primary Network, effectively
allowing the network to scale up easily while enabling lower latency, higher
transactions per second (TPS), and lower transaction costs provided by the
Avalanche Consensus.

## Advantages

A Subnet manages its own membership, it can create its own token economics and
rules, and may require that its constituent validators have certain properties.

### Independent Token Economics

Subnets can have their own token economics with their own native tokens and fee
markets. They can launch their own blockchains with customized virtual machines.
See [Customize a Subnet](../subnets/customize-a-subnet.md) for more details.

### Compliance

Avalanche’s Subnet architecture makes regulatory compliance manageable. As
mentioned above, a Subnet may require validators to meet a set of requirements.

Some examples of requirements include:

- Validators must be located in a given country
- Validators must pass a KYC/AML checks
- Validators must hold a certain license

(To be abundantly clear, the above examples are just that: examples. These
requirements do not apply to the Avalanche Primary Network.)

### Application-Specific Requirements

Different blockchain-based applications may require validators to have certain
properties. Suppose there is an application that requires large amounts of RAM
or CPU power. A Subnet could require that validators meet certain [hardware
requirements](../nodes/build/run-avalanche-node-manually.md#requirements) so
that the application doesn’t suffer from low performance due to slow validators.

### Support for Private Blockchains

You can create a Subnet where only certain pre-defined validators may join and
create a private Subnet where the contents of the blockchains would be visible
only to those validators. This is ideal for organizations interested in keeping
their information private. See
[here](../nodes/maintain/subnet-configs.md#private-subnet) for more info.

### Separation of Concerns

In a heterogeneous network of blockchains, some validators will not want to
validate certain blockchains because they simply have no interest in those
blockchains. The Subnet model allows validators to only concern themselves with
blockchains that they care about. This reduces the burden on validators.

## Validators

Incentives are provided by Subnet owners in order to attract Avalanche
validators to validate their Subnet, and this incentive can be customized by the
Subnet. Validators must also take security and resource concerns into
consideration when deciding whether to validate a given Subnet.

## Virtual Machines

A **Virtual Machine** (VM) defines the application-level logic of a blockchain.
In technical terms, it specifies the blockchain’s state, state transition
function, transactions, and the API through which users can interact with the
blockchain. Every blockchain on Avalanche is an instance of a VM.

When you write a VM, you don't need to concern yourself with lower-level logic
like networking, consensus, and the structure of the blockchain. Avalanche does
this behind the scenes so you can focus on the thing you would like to build.

Think of a VM as a blueprint for a blockchain; you can use the same VM to create
many blockchains, each of which follows the same rule-set but is logically
independent of other blockchains.

### Why Virtual Machines?

At first, blockchain networks had one Virtual Machine (VM) with a pre-defined,
static set of functionality. This rigid, monolithic design limited what
blockchain-based applications one could run on such networks.

People who wanted custom decentralized applications had to create their own,
entirely new blockchain network from scratch. Doing so required a great deal of
time and effort, offered limited security, and generally resulted in a bespoke,
fragile blockchain that never got off the ground.

Ethereum made a step toward solving this problem with smart contracts.
Developers didn’t need to worry about networking and consensus, but creating
decentralized applications was still hard. The Ethereum VM has low performance
and imposes restrictions on smart contract developers. Solidity and the other
few languages for writing Ethereum smart contracts are unfamiliar to most
programmers.

Avalanche VMs (AVMs) make it easy to define a blockchain-based decentralized
application. Rather than new, limited languages like Solidity, developers can
write VMs in Go (other languages will be supported in the future).

### Example Virtual Machines

The following VMs were built using Go

- [SubnetEVM](https://github.com/ava-labs/subnet-evm/)
- [SpacesVM](https://github.com/ava-labs/spacesvm)
- [BlobVM](https://github.com/ava-labs/blobvm)
- [TimestampVM](https://github.com/ava-labs/timestampvm)

More info:

- [How to Build a Simple Golang VM](https://docs.avax.network/subnets/create-a-vm-timestampvm)
- [How to Build a Complex Golang VM](https://docs.avax.network/subnets/create-a-vm-blobvm)

The following VMs were built using Rust via the [Avalanche RustSDK](https://crates.io/crates/avalanche-types)

- [TimestampVM](https://github.com/ava-labs/timestampvm-rs)
- [SpacesVM](https://github.com/ava-labs/spacesvm-rs)
- [BulletproofVM](https://github.com/usmaneth/BulletproofVM)

More info:

- [How to Build a Simple Rust VM](https://docs.avax.network/subnets/create-a-simple-rust-vm)

## Developing Your Own Subnet

Please check out documents listed on the left panel to develop your own Subnets
with customized virtual machines and blockchains.

[^1]: Subnets do not share storage in logical level (keys/values) with other
    Subnets, but they share storage on disk level (LevelDB) and store their data
    into same database/folder in operating system.
