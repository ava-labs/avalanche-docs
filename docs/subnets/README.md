# Subnets Overview

A **Subnet** is a dynamic subset of Avalanche validators working together to achieve consensus on the state of one or more blockchains. Each blockchain is validated by exactly one Subnet. A Subnet can have and validate many blockchains. A validator may be a member of many Subnets.

Avalanche's 3 built-in blockchains: Exchange Chain (X-Chain), Platform Chain (P-Chain), and Contract Chain (C-Chain) are validated and secured by all the Avalanche validators which is a special Subnet and referred as the Primary Network.

![image](/img/subnet-validators.png)

(Image from [this article](https://medium.com/@arikan/a-comparison-of-heterogeneous-blockchain-networks-4bf7ff2fe279))

Subnets are independent and don’t share execution thread, storage or networking with other Subnets or the Primary Network, effectively allowing the network to scale up easily while enabling lower latency, higher transactions per second (TPS), and lower transaction costs provided by the Avalanche Protocol.

Subnets are effectively ‘Blockchain-as-a-Service’ secured by some portion of Avalanche validators.

## Advantages

A Subnet manages its own membership and can create its own rules and it may require that its constituent validators have certain properties. This is very useful, and we explore its ramifications in more depth below:

### Compliance

Avalanche’s Subnet architecture makes regulatory compliance manageable. As mentioned above, a Subnet may require validators to meet a set of requirements.

Some examples of requirements include:

- Validators must be located in a given country
- Validators must pass a KYC/AML checks
- Validators must hold a certain license

(To be abundantly clear, the above examples are just that: examples. These requirements do not apply to the Avalanche Primary Network.)

### Support for Private Blockchains

You can create a Subnet where only certain pre-defined validators may join and create a private Subnet where the contents of the blockchains would be visible only to those validators. This is ideal for organizations interested in keeping their information private. See [here](../nodes/maintain/Subnet-configs.md#private-Subnet) for more info.

### Separation of Concerns

In a heterogeneous network of blockchains, some validators will not want to validate certain blockchains because they simply have no interest in those blockchains. The Subnet model allows validators to only concern themselves with blockchains that they care about. This reduces the burden on validators.

### Application-Specific Requirements

Different blockchain-based applications may require validators to have certain properties. Suppose there is an application that requires large amounts of RAM or CPU power. A Subnet could require that validators meet certain [hardware requirements](../nodes/build/run-avalanche-node-manually.md#requirements) so that the application doesn’t suffer from low performance due to slow validators.

Subnets can have their own token economy with their own native tokens and fee markets. They can launch their own blockchains with customized virtual machines. See [Customize a Subnet](../subnets/customize-a-Subnet.md) for more details.

## Validators

Avalanche validators are incentivized by Subnet owners to validator their Subnet. The incentive can be customized by each Subnet. Validators needs to take consideration of security and resource concerns before joining a Subnet.

## Developing Your Own Subnet

Please check out documents listed on the left panel to develop your own Subnets with customized virtual machine and blockchain.
