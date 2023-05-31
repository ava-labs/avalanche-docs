---
Description: How to customize a Subnet by utilizing Genesis, Precompile and Blockchain Configs.
---

# Customize Your EVM-Powered Subnet

All Subnets can be customized by utilizing [`Subnet Configs`](#subnet-configs).

A Subnet can have one or more blockchains. For example, the Primary Network, which is a Subnet, a
special one nonetheless, has 3 blockchains. Each chain can be further customized using chain specific
configuration file. See [here](../nodes/maintain/chain-config-flags.md) for detailed explanation.

A blockchain created by or forked from [Subnet-EVM](https://github.com/ava-labs/subnet-evm) can be
customized by utilizing one or more of the following methods:

- [Genesis](#genesis)
- [Precompile](#precompiles)
- [Upgrade Configs](#network-upgrades-enabledisable-precompiles)
- [Chain Configs](#avalanchego-chain-configs)

## Subnet Configs

A Subnet can customized by setting parameters for the following:

- [Validator-only communication to create a private Subnet](../nodes/maintain/subnet-configs.md#validatoronly-bool)
- [Consensus](../nodes/maintain/subnet-configs.md#consensus-parameters)
- [Gossip](../nodes/maintain/subnet-configs.md#gossip-configs)

See [here](../nodes/maintain/subnet-configs.md) for more info.
