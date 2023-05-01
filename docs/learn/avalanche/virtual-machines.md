# Virtual Machines

Avalanche allows developers to implement their Dapp in the language of their choice using the 
Virtual Machine (VM) framework. VMs define blockchains, and serve as application-level blueprints 
for how blockchains are created.

Developers can implement VMs in any language, and use libraries and tech stacks that they're
familiar with. Developers have fine control over the behavior of their blockchain, and can redefine
the rules of a blockchain to fit any use-case they have.

## Validators

All Avalanche validators as members of the Avalanche primary network are required to run three VMs:

- Coreth: Defines the Contract Chain (C-Chain); supports smart contract functionality and is
EVM-compatible.
- Platform VM: Defines the Platform Chain (P-Chain); supports operations on staking and Subnets.
- Avalanche VM: Defines the Exchange Chain (X-Chain); supports operations on Avalanche Native
  Tokens.

Validators are able to install additional VMs on their node to validate additional Subnets in
the Avalanche ecosystem. In exchange, validators receive staking rewards in the form of a reward
token configured by Subnets.

To learn more about Subnets, click [here](../../subnets/README.md).

## Building on Virtual Machines

Most blockchain ecosystems require developers to implement their applications in the rule sets and
technologies that are native to them. As an example, most ecosystems only support a single language
native to them with which you can build your Dapp.

Developers with advanced use-cases or who require higher levels of customization need to build their
own blockchain from scratch, re-implement complex abstractions like networking and consensus, all
before even being able to start working on their new application idea.

Avalanche allows developers to choose the tools that work best for them, by providing an 
abstraction for application logic in form of VMs. VMs define a blueprint for how a blockchain 
should behave, and Avalanche uses this blueprint to coordinate validators in the network to run 
the application defined by the VM.

VMs communicate with Avalanche over a language agnostic request-response protocol known as
[RPC](https://en.wikipedia.org/wiki/Remote_procedure_call). This allows the VM framework to 
open a world of endless possibilities to developers, as developers can implement their Dapps using 
the languages, frameworks, and libraries of their choice. Solidity is supported through an EVM
compatible VM known as the Subnet-EVM, and custom VMs can be implemented in multiple popular
languages like Golang and Rust.

## Solidity

Avalanche natively supports the execution of Ethereum smart contracts written in solidity. Ethereum
developers have the option of deploying their smart contracts on the C-Chain's implementation of the
Ethereum Virtual Machine (Coreth), or on their own Subnet using the Subnet-EVM for advanced use
cases that require more customization.

Both C-Chain and the Subnet-EVM are compatible with Ethereum tooling like Remix, MetaMask,
Truffle, and more.

To learn more about smart contract support, click [here](../../dapps/launch-your-ethereum-dapp.md).

## Examples

### Golang

- [Coreth](https://github.com/ava-labs/coreth)
  - An implementation of the EVM that powers the Avalanche C-Chain that supports Solidity smart
  contracts.
- [Subnet-EVM](https://github.com/ava-labs/subnet-evm)
  - An implementation of the EVM that can be deployed to a custom Subnet to support Solidity smart
  contracts
- [TimestampVM](https://github.com/ava-labs/timestampvm)
  - A decentralized timestamp server
- [XSVM](https://github.com/ava-labs/xsvm)
  - An example of Avalanche Warp Messaging that implements Cross-Subnet asset transfers

#### Tutorials

- [How to Build a Simple Golang VM](../../subnets/create-a-vm-timestampvm.md)

### Rust

The following VMs were built using Rust via the [Avalanche Rust SDK](https://crates.io/crates/avalanche-types)

- [TimestampVM RS](https://github.com/ava-labs/timestampvm-rs)
  - A Rust implementation of TimestampVM

#### Tutorials

- [How to Build a Simple Rust VM](../../subnets/create-a-simple-rust-vm.md)
