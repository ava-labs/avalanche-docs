# Geth, Coreth, Subnet-EVM and Precompile-EVM

## Geth

[Geth](https://geth.ethereum.org/) (or go-ethereum) is the official implementation of an Ethereum
client, written in the Go programming language. It is one of the original and most popular Ethereum
clients used today. It is responsible for handling transactions, the deployment and execution of
smart contracts and contains the Ethereum Virtual Machine.

## Coreth

[Coreth](https://github.com/ava-labs/coreth) is a fork of Geth that implements the Virtual Machine
of the C-Chain. It has been adapted to work with Avalanche Consensus.

## Subnet-EVM

[Subnet-EVM](https://github.com/ava-labs/subnet-evm) is a fork of Coreth that has been altered to 
make it easy to launch customized EVM-based blockchains on a Subnet. It differs from Coreth in the 
following ways:

- Configurable fees and gas limits were added in genesis 
- Avalanche hard forks were merged into the single "Subnet EVM" hard fork
- Atomic TXs and Shared Memory were removed 
- Multicoin Contract and State were removed

## Precompile-EVM

[Precompile-EVM](https://github.com/ava-labs/precompile-evm) enables registering precompiles to 
Subnet-EVM without forking the Subnet-EVM codebase. This way it makes the most common customization
of Subnet-EVM easier and more approachable and makes it easier to keep Subnet-EVM up-do-date. 
