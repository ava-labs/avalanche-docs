---
sidebar_label: Subnets
---

# What Is a Subnet?

A **Subnet** is a sovereign network which defines its own rules regarding its
membership and token economics. It is composed of a dynamic subset of Avalanche
validators working together to achieve consensus on the state of one or more
blockchains. Each blockchain is validated by exactly one Subnet, while a Subnet
can validate many blockchains.

Avalanche's [Primary Network](avalanche-platform.md) is a special Subnet running three blockchains:

- The Platform Chain [(P-Chain)](/learn/avalanche/avalanche-platform#p-chain)
- The Contract Chain [(C-Chain)](/learn/avalanche/avalanche-platform#c-chain)
- The Exchange Chain [(X-Chain)](/learn/avalanche/avalanche-platform#x-chain)

![image](/img/subnet-validators.png)

(Image adopted from [this article](https://www.coinbase.com/cloud/discover/dev-foundations/intro-to-avalanche-subnets))

:::info
Every validator in a Subnet
**must** also validate the Primary Network.
:::

Node operators that validate a Subnet with multiple chains do not need to run multiple machines for 
validation. For example, the Primary Network is a Subnet with three coexisting chains, all of which 
can be validated by a single node, or a single machine.

## Advantages

### Independent Networks

- Subnets use virtual machines to specify their own execution logic, determine their
own fee regime, maintain their own state, facilitate their own networking, and
provide their own security. 
- Each Subnet's performance is isolated from other Subnets in the ecosystem, so increased usage on
one Subnet won't affect another.
- Subnets can have their own token economics with their own native tokens, fee
markets, and incentives determined by the Subnet deployer. 
- One Subnet can host multiple blockchains with customized [virtual machines](virtual-machines.md).

### Native Interoperability

- Avalanche Warp Messaging enables native cross-Subnet communication and allows Virtual Machine (VM)
developers to implement arbitrary communication protocols between any two Subnets.


### Accommodate Application-Specific Requirements

_Different blockchain-based applications may require validators to have certain
properties such as large amounts of RAM or CPU power._ 

- A Subnet could require that validators
meet certain [hardware requirements](/nodes/build/run-avalanche-node-manually.md#requirements) so
that the application doesn’t suffer from low performance due to slow validators.

### Launch a Network Designed With Compliance In Mind

_Avalanche’s Subnet architecture makes regulatory compliance manageable. As
mentioned above, a Subnet may require validators to meet a set of requirements._

Some examples of requirements the creators of a Subnet may choose include:

- Validators must be located in a given country.
- Validators must pass KYC/AML checks.
- Validators must hold a certain license.

### Control The Privacy of On-Chain Data

_Subnets are ideal for organizations interested in keeping their information private._

- Institutions conscious of their stakeholders' privacy can create a private Subnet where the
contents of the blockchains would be visible only to a set of pre-approved validators. 
Define this at creation with a [single parameter](/nodes/maintain/subnet-configs.md#private-subnet).

### Validator Sovereignty

_In a heterogeneous network of blockchains, some validators will not want to
validate certain blockchains because they simply have no interest in those
blockchains._
 
- The Subnet model enables validators to concern themselves only with
blockchain networks they choose to participate in. This greatly reduces the computational burden on validators.

## Develop Your Own Subnet

To get started, check out the tutorials in our [Subnets](/subnets/build-first-subnet)
section.

