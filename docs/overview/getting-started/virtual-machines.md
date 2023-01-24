# Overview

Avalanche allows developers to implement their Dapp in the language of their choice using the 
Virtual Machine (VM) framework. VMs define blockchains, and serve as application-level blueprints 
for how blockchains are created.

The VM framework is language agnostic, and currently supports the implementation of Dapps in 
popular languages like Solidity, Golang, and Rust.

# Virtual Machines

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

VMs communicate with Avalanche over a langauge agnostic request-response protocol known as
[RPC](https://en.wikipedia.org/wiki/Remote_procedure_call). This allows the VM framework to 
open a world of endless possibilities to developers, as developers can implement their Dapps using 
the languages, frameworks, and libraries of their choice.

# Validators

All Avalanche validators as members of the Avalanche primary network are required to run three VMs:
- Coreth: Defines the Contract Chain (C-Chain); supports smart contracts written in Solidity.
- Platform VM: Defines the Platform Chain (P-Chain); supports operations on staking and Subnets.
- Avalanche VM: Defines the Exchange Chain (X-Chain); supports operations on Avalanche Native
  Assets.

Validators are able to install additional VMs on their node to validate additional subnets in
the Avalanche ecosystem. In exchange, validators can receive staking rewards in the form of the
subnets' native gas tokens.

To learn more about Subnets, click [here](/docs/subnets/README.md).

## Solidity

Avalanche natively supports the execution of Ethereum smart contracts written in solidity. Ethereum
developers have the option of deploying their smart contracts on the C-Chain's implementation of the
Ethereum Virtual Machine (Coreth), or on their own Subnet using the Subnet-EVM for advanced use
cases that require more customization.

Both C-Chain and the Subnet-EVM are compatible with Ethereum tooling like Remix, MetaMask,
Truffle, and more.

To learn more about smart contract support, click [here](/docs/dapps/launch-your-ethereum-dapp.md).