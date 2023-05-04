---
sidebar_label: Subnets
---

# What Is a Subnet?

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
See [Customize a Subnet](/docs/subnets/customize-a-subnet.md) for more details.

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
requirements](/nodes/build/run-avalanche-node-manually.md#requirements) so
that the application doesn’t suffer from low performance due to slow validators.

### Support for Private Blockchains

You can create a Subnet where only certain pre-defined validators may join and
create a private Subnet where the contents of the blockchains would be visible
only to those validators. This is ideal for organizations interested in keeping
their information private. See
[here](/nodes/maintain/subnet-configs.md#private-subnet) for more info.

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

## Developing Your Own Subnet

Please check out documents listed on the left panel to develop your own Subnets
with customized virtual machines and blockchains.

[^1]: Subnets do not share storage in logical level (keys/values) with other
    Subnets, but they share storage on disk level (LevelDB) and store their data
    into same database/folder in operating system.
