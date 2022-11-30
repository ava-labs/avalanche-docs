# Tools and Utilities

There are a number of tools for managing your node and developing Subnets. This
page lists the most popular ones, explains what they do and their intended usage.

## AvalancheGo Installer

AvalancheGo Installer is a shell (bash) script that installs AvalancheGo on a Linux computer. This script sets up full, running node in a matter of minutes with minimal user input required. This is convenient if you want to run the node as a service on a standalone Linux installation, for example to set up a (Subnet) validator, use the node as a private RPC server and similar uses. It also makes upgrading or reinstalling the nodes easy.

Github: [https://github.com/ava-labs/avalanche-docs/blob/master/scripts/avalanchego-installer.sh](https://github.com/ava-labs/avalanche-docs/blob/master/scripts/avalanchego-installer.sh)

Document: [Run an Avalanche Node Using the Install Script](../nodes/build/set-up-node-with-installer.md)

If you want to run a node in a more complex environment, like in a docker or kubernetes container, or as a part of an installation orchestrated using a tool like Terraform, this installer probably won't fit your purposes.

## Avalanche CLI

Avalanche CLI is a developer-centric command line tool that gives you access to everything Avalanche. Setting up a local network, creating a subnet, customizing the Subnet/VM configuration - this is the tool to use. It is under rapid development, so check back for new versions with expanded functionality.

Github: [https://github.com/ava-labs/avalanche-cli](https://github.com/ava-labs/avalanche-cli)

Document: [Create an EVM Subnet on a Local Network](../subnets/create-a-local-subnet.md)

## Subnet CLI

Subnet CLI is command-line interface to manage Avalanche Subnets. It is intended for provisioning testnet or mainnet subnets in production and allows for the use of Ledger device to store the controlling keys to the Subnet for increased operational security.

Github: [https://github.com/ava-labs/subnet-cli](https://github.com/ava-labs/subnet-cli)

Document: [Subnet CLI](../subnets/subnet-cli.md)

## Avalanche Network Runner (ANR)

The Avalanche Network Runner (**ANR**) allows a user to define, create and interact with a network of Avalanche nodes. Networks created with **ANR** are temporary and get destroyed when the tool is stopped, so the purpose of the tool is to be used for local development and testing the code in the early stages, before you're ready to deploy on permanent infrastructure (testnet or mainnet).

Github: [https://github.com/ava-labs/avalanche-network-runner](https://github.com/ava-labs/avalanche-network-runner)

Document: [Avalanche Network Runner](../subnets/network-runner.md)

## Avalanche Plugin Manager (APM)

Avalanche Plugin Manager (**APM**) is a command-line tool to manage virtual machines binaries on existing avalanchego instances. It enables to add/remove nodes to subnets, upgrade the VM plugin binaries as new versions get released to the plugin repository.

Github: [https://github.com/ava-labs/apm](https://github.com/ava-labs/apm)

### avalanche-plugins-core

`avalanche-plugins-core` is plugin repository that ships with the `apm`. A plugin repository consists of a set of virtual machine and Subnet definitions that the `apm` consumes to allow users to quickly and easily download and manage VM binaries.

Github: [https://github.com/ava-labs/avalanche-plugins-core](https://github.com/ava-labs/avalanche-plugins-core)

## Avalanche Ops

A single command to launch and configure network infrastructure (virtual machines or cloud instances) and installs Avalanche nodes from scratch allowing for various configuration requirements. Provisions all resources required to run a node or network with recommended setups (configurable). This tool is intended for quickly creating, testing and iterating over various Avalanche network infrastructure configurations for testing and simulation purposes. Use this to play with various setups and reproduce potential problems and issues with possible configurations.

Github: [https://github.com/ava-labs/avalanche-ops](https://github.com/ava-labs/avalanche-ops)
