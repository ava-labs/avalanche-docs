# Customize Your Subnet EVM Chain

A Subnet can have one or more blockchains. For example, the Primary Network, which is a Subnet, a
special one nonetheless, has 3 blockchains. Each chain can be further customized using chain specific
configuration file. See [here](../nodes/maintain/chain-config-flags.md) for detailed explanation.

A blockchain created by or forked from [Subnet-EVM](https://github.com/ava-labs/subnet-evm) can be
customized by utilizing one or more of the following methods:

- [Genesis](subnet-evm-genesis)
- [Precompile](subnet-evm-precompiles)
- [Upgrade Configs](subnet-evm-upgrades)
- [Chain Configs](subnet-evm-avalanchego-config)
