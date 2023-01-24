# Virtual Machines

Avalanche allows developers to implement their Dapp in the language of their choice using the 
Virtual Machine (VM) framework. VMs define blockchains, and serve as application-level blueprints 
for how blockchains are created.

## Validators

All Avalanche validators as members of the Avalanche primary network are required to run three VMs:

- Coreth: Defines the Contract Chain (C-Chain); supports smart contracts written in Solidity.
- Platform VM: Defines the Platform Chain (P-Chain); supports operations on staking and Subnets.
- Avalanche VM: Defines the Exchange Chain (X-Chain); supports operations on Avalanche Native
  Assets.

Validators are able to install additional VMs on their node to validate additional Subnets in
the Avalanche ecosystem. In exchange, validators can receive staking rewards in the form of the
Subnets' native gas tokens.

To learn more about Subnets, click [here](/docs/subnets/README.md).

## Building on Virtual Machines

Previously, most blockchain ecosystems required developers to implement their applications in 
the smart-contract language supported natively by the ecosystem. This causes pain for developers,
as developers need to learn new technology stacks specific to each ecosystem they develop in.

Developers with advanced use cases that required more customization were forced to start from 
scratch, and had to implement complex abstractions like networking, state storage, and consensus,
before even being able to build their new application.

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

To learn more about smart contract support, click [here](/docs/dapps/launch-your-ethereum-dapp.md).

### Examples

#### Golang

- [Coreth](https://github.com/ava-labs/coreth)
  - An implementation of the EVM that powers the Avalanche C-Chain that supports Solidity smart
  contracts.
- [Subnet-EVM](https://github.com/ava-labs/subnet-evm)
  - An implementation of the EVM that can be deployed to a custom Subnet to support Solidity smart
  contracts
- [SpacesVM](https://github.com/ava-labs/spacesvm)
  - An authenticated, hierarchical key-value store w/EIP-712 compatibility, state expiry, and
  fee-based metering
- [BlobVM](https://github.com/ava-labs/blobvm)
  - A content-addressable key-value store w/EIP-712 compatibility and fee-based metering
- [TimestampVM](https://github.com/ava-labs/timestampvm)
  - A decentralized timestamp server
- [XSVM](https://github.com/ava-labs/xsvm)
  - An example of Avalanche Warp Messaging that implements Cross-Subnet asset transfers

##### Tutorials

- [How to Build a Simple Golang VM](https://docs.avax.network/subnets/create-a-vm-timestampvm)
- [How to Build a Complex Golang VM](https://docs.avax.network/subnets/create-a-vm-blobvm)

#### Rust

The following VMs were built using Rust via the [Avalanche Rust SDK](https://crates.io/crates/avalanche-types)

- [TimestampVM RS](https://github.com/ava-labs/timestampvm-rs)
  - A Rust implementation of TimestampVM
- [SpacesVM RS](https://github.com/ava-labs/spacesvm-rs)
  - A Rust implementation of SpacesVM
- [BulletproofVM](https://github.com/usmaneth/BulletproofVM)
  - Allows the execution of transactions on Avalanche using Bulletproof zero-knowledge proofs

##### Tutorials

- [How to Build a Simple Rust VM](https://docs.avax.network/subnets/create-a-simple-rust-vm)
