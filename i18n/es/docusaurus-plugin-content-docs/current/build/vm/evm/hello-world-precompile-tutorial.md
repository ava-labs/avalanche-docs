---
tags: [Build, Virtual Machines]
description: Learn how to create a stateful precompile for Subnet-EVM from scratch.
sidebar_label: Generate a Stateful Precompile
pagination_label: Generate a Stateful Precompile
sidebar_position: 0
---

# Stateful Precompile Generation Tutorial

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In this tutorial, we are going to walk through how we can generate a stateful precompile from scratch.
Before we start, let's brush up on what a precompile is, what a stateful precompile is, and why this
is extremely useful.

## Background

### Precompiled Contracts

Ethereum uses precompiles to efficiently implement cryptographic primitives within the EVM instead of
re-implementing the same primitives in Solidity. The following precompiles are currently included:
ecrecover, sha256, blake2f, ripemd-160, Bn256Add, Bn256Mul, Bn256Pairing, the identity function, and
modular exponentiation.

We can see these [precompile](https://github.com/ethereum/go-ethereum/blob/v1.11.1/core/vm/contracts.go#L82)
mappings from address to function here in the Ethereum VM:

```go
// PrecompiledContractsBerlin contains the default set of pre-compiled Ethereum
// contracts used in the Berlin release.
var PrecompiledContractsBerlin = map[common.Address]PrecompiledContract{
	common.BytesToAddress([]byte{1}): &ecrecover{},
	common.BytesToAddress([]byte{2}): &sha256hash{},
	common.BytesToAddress([]byte{3}): &ripemd160hash{},
	common.BytesToAddress([]byte{4}): &dataCopy{},
	common.BytesToAddress([]byte{5}): &bigModExp{eip2565: true},
	common.BytesToAddress([]byte{6}): &bn256AddIstanbul{},
	common.BytesToAddress([]byte{7}): &bn256ScalarMulIstanbul{},
	common.BytesToAddress([]byte{8}): &bn256PairingIstanbul{},
	common.BytesToAddress([]byte{9}): &blake2F{},
}
```

These precompile addresses start from `0x0000000000000000000000000000000000000001` and increment by 1.

A [precompile](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/core/vm/contracts.go#L54-L57)
follows this interface:

```go
// PrecompiledContract is the basic interface for native Go contracts. The implementation
// requires a deterministic gas count based on the input size of the Run method of the
// contract.
type PrecompiledContract interface {
	RequiredGas(input []byte) uint64  // RequiredPrice calculates the contract gas use
	Run(input []byte) ([]byte, error) // Run runs the precompiled contract
}
```

Here is an example of the
[sha256 precompile](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/core/vm/contracts.go#L237-L250)
function.

```go
type sha256hash struct{}

// RequiredGas returns the gas required to execute the pre-compiled contract.
//
// This method does not require any overflow checking as the input size gas costs
// required for anything significant is so high it's impossible to pay for.
func (c *sha256hash) RequiredGas(input []byte) uint64 {
	return uint64(len(input)+31)/32*params.Sha256PerWordGas + params.Sha256BaseGas
}

func (c *sha256hash) Run(input []byte) ([]byte, error) {
	h := sha256.Sum256(input)
	return h[:], nil
}
```

The CALL opcode (CALL, STATICCALL, DELEGATECALL, and CALLCODE) allows us to invoke this precompile.

The function signature of CALL in the EVM is as follows:

```go
 Call(
 	caller ContractRef,
 	addr common.Address,
 	input []byte,
 	gas uint64,
 	value *big.Int,
)(ret []byte, leftOverGas uint64, err error)
```

Precompiles are a shortcut to execute a function implemented by the EVM itself, rather than an actual
contract. A precompile is associated with a fixed address defined in the EVM. There is no byte code
associated with that address.

When a precompile is called, the EVM checks if the input address is a precompile address, and if so it
executes the precompile. Otherwise, it loads the smart contract at the input address and runs it on the
EVM interpreter with the specified input data.

### Stateful Precompiled Contracts

A stateful precompile builds on a precompile in that it adds state access. Stateful precompiles are
not available in the default EVM, and are specific to Avalanche EVMs such as
[Coreth](https://github.com/ava-labs/coreth) and [Subnet-EVM](https://github.com/ava-labs/subnet-evm).

A stateful precompile follows this [interface](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contract/interfaces.go#L17-L20):

```go
// StatefulPrecompiledContract is the interface for executing a precompiled contract
type StatefulPrecompiledContract interface {
	// Run executes the precompiled contract.
	Run(accessibleState PrecompileAccessibleState,
	caller common.Address,
	addr  common.Address,
	input []byte,
	suppliedGas uint64,
	readOnly bool)
	(ret []byte, remainingGas uint64, err error)
}
```

A stateful precompile injects state access through the `PrecompileAccessibleState` interface to
provide access to the EVM state including the ability to modify balances and read/write storage.

This way we can provide even more customization of the EVM through Stateful Precompiles than we can
with the original precompile interface!

### AllowList

The AllowList enables a precompile to enforce permissions on addresses. The AllowList is not a contract
itself, but a helper structure to provide a control mechanism for wrapping contracts.
It provides an `AllowListConfig` to the precompile so that it can take an initial configuration
from genesis/upgrade. It also provides 4 functions to set/read the permissions. In this tutorial, we
used `IAllowList` interface to provide permission control to the `HelloWorld` precompile.
`IAllowList` is defined in Subnet-EVM under [`./contracts/contracts/interfaces/IAllowList.sol`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/contracts/contracts/interfaces/IAllowList.sol).
The interface is as follows:

```sol
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IAllowList {
  // Set [addr] to have the admin role over the precompile contract.
  function setAdmin(address addr) external;

  // Set [addr] to be enabled on the precompile contract.
  function setEnabled(address addr) external;

  // Set [addr] to have no role for the precompile contract.
  function setNone(address addr) external;

  // Read the status of [addr].
  function readAllowList(address addr) external view returns (uint256 role);
}
```

You can find more information about the AllowList interface [here](/build/subnet/upgrade/customize-a-subnet.md#allowlist-interface).

## Tutorial

### Overview

This is a brief overview of what this tutorial will cover.

- Write a Solidity interface
- Generate the precompile template
- Implement the precompile functions in Golang
- Write and run tests

:::caution
Stateful precompiles are [alpha software](https://en.wikipedia.org/wiki/Software_release_life_cycle#Alpha).
Build at your own risk.
:::

In this tutorial, we used a branch based on Subnet-EVM version `v0.5.2`. You can find the branch
[here](https://github.com/ava-labs/subnet-evm/tree/helloworld-official-tutorial-v2). The code in this
branch is the same as Subnet-EVM except for the `precompile/contracts/helloworld` directory. The
directory contains the code for the `HelloWorld` precompile. We will be using this
precompile as an example to learn how to write a stateful precompile. The code in this branch can become
outdated.
You should always use the latest version of Subnet-EVM when you develop your own precompile.

#### Precompile-EVM

Subnet-EVM precompiles can be registered from an external repo.
This allows developer to build their precompiles without maintaining a fork of Subnet-EVM.
The precompiles are then registered in the Subnet-EVM at build time.

The difference between using Subnet-EVM and Precompile-EVM is that with Subnet-EVM you can change EVM
internals to interact with your precompiles.
Such as changing fee structure, adding new opcodes, changing how to build a block, etc.
With Precompile-EVM you can only add new stateful precompiles that can interact with the StateDB.
Precompiles built with Precompile-EVM are still very powerful because it can directly access to the
state and modify it.

There is a template repo for how to build a precompile with this way called
[Precompile-EVM](https://github.com/ava-labs/precompile-evm). Both Subnet-EVM and Precompile-EVM share
similar directory structures and common codes.
You can reference the Precompile-EVM PR that adds Hello World precompile [here](https://github.com/ava-labs/precompile-evm/pull/12)

### Prerequisites

This tutorial assumes familiarity with Golang and JavaScript.

Additionally, users should be deeply familiar with the EVM in order to understand its invariants
since adding a Stateful Precompile modifies the EVM itself.

Here are some recommended resources to learn the ins and outs of the EVM:

- [The Ethereum Virtual Machine](https://github.com/ethereumbook/ethereumbook/blob/develop/13evm.asciidoc)
- [Precompiles in Solidity](https://medium.com/@rbkhmrcr/precompiles-solidity-e5d29bd428c4)
- [Deconstructing a Smart Contract](https://blog.openzeppelin.com/deconstructing-a-solidity-contract-part-i-introduction-832efd2d7737/)
- [Layout of State Variables in Storage](https://docs.soliditylang.org/en/v0.8.10/internals/layout_in_storage.html)
- [Layout in Memory](https://docs.soliditylang.org/en/v0.8.10/internals/layout_in_memory.html)
- [Layout of Call Data](https://docs.soliditylang.org/en/v0.8.10/internals/layout_in_calldata.html)
- [Contract ABI Specification](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html)
- [Customizing the EVM with Stateful Precompiles](https://medium.com/avalancheavax/customizing-the-evm-with-stateful-precompiles-f44a34f39efd)

Please install the following before getting started.

First, install the latest version of Go. Follow the instructions [here](https://go.dev/doc/install).
You can verify by running `go version`.

Set the `$GOPATH` environment variable properly for Go to look for Go Workspaces. Please read
[this](https://go.dev/doc/gopath_code) for details. You can verify by running `echo $GOPATH`.

:::info
See [here](https://github.com/golang/go/wiki/SettingGOPATH) for instructions on setting the
GOPATH based on system configurations.
:::

As a few things will be installed into `$GOPATH/bin`, please make sure that `$GOPATH/bin` is in your
`$PATH`, otherwise, you may get an error running the commands below.
To do that, run the command: `export PATH=$PATH:$GOROOT/bin:$GOPATH/bin`

Download the following prerequisites into your `$GOPATH`:

- Git Clone the repository (Subnet-EVM or Precompile-EVM)
- Git Clone [AvalancheGo](https://github.com/ava-labs/avalanchego) repository
- Install [Avalanche Network Runner](/tooling/network-runner.md)
- Install [solc](https://github.com/ethereum/solc-js#usage-on-the-command-line)
- Install [Node.js and NPM](https://nodejs.org/en/download)
  For easy copy paste, use the below commands:

```shell
cd $GOPATH
mkdir -p src/github.com/ava-labs
cd src/github.com/ava-labs
```

Clone the repository:

<!-- vale off -->

<Tabs groupId="evm-tabs">
<TabItem value="subnet-evm-tab" label="Subnet-EVM" default>

```shell
git clone git@github.com:ava-labs/subnet-evm.git
```

</TabItem>
<TabItem value="precompile-evm-tab" label="Precompile-EVM" >

```shell
git clone git@github.com:ava-labs/precompile-evm.git
```

Alternatively you can use it as a template repo from [github](https://github.com/ava-labs/precompile-evm/generate).

</TabItem>
</Tabs>

<!-- vale on -->

Then run the following commands:

```shell
git clone git@github.com:ava-labs/avalanchego.git
curl -sSfL https://raw.githubusercontent.com/ava-labs/avalanche-network-runner/main/scripts/install.sh | sh -s
npm install -g solc
```

### Complete Code

You can inspect example pull request for the complete code.

<!-- vale off -->

<Tabs groupId="evm-tabs">
<TabItem value="subnet-evm-tab" label="Subnet-EVM" default>

[Subnet-EVM Hello World Pull Request](https://github.com/ava-labs/subnet-evm/pull/565/)

</TabItem>
<TabItem value="precompile-evm-tab" label="Precompile-EVM"  >

[Precompile-EVM Hello World Pull Request](https://github.com/ava-labs/precompile-evm/pull/12/)

</TabItem>
</Tabs>

<!-- vale on -->

For a full-fledged example, you can also check out the [Reward Manager Precompile](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contracts/rewardmanager/)

### Step 0: Generating the Precompile

First, we must create the Solidity interface that we want our precompile to implement. This will be
the HelloWorld Interface. It will have two simple functions, `sayHello()` and `setGreeting()`. These
two functions will demonstrate the getting and setting respectively of a value stored in the
precompile's state space. The `sayHello()` function
is a `view` function, meaning it does not modify the state of the precompile and returns a string result.
The `setGreeting()` function is a state changer function, meaning it modifies the state of the precompile.
The `HelloWorld` interface inherits `IAllowList` interface to use the allow list functionality.

For the tutorial, we will be working in a new branch in Subnet-EVM/Precompile-EVM repo.

<!-- vale off -->

<Tabs groupId="evm-tabs">
<TabItem value="subnet-evm-tab" label="Subnet-EVM" default>

```bash
cd $GOPATH/src/github.com/ava-labs/subnet-evm
```

Then checkout to a new branch:

```bash
git checkout -b hello-world-stateful-precompile
```

We will start off in this directory `./contracts/`:

```bash
cd contracts/
```

Create a new file called `IHelloWorld.sol` and copy and paste the below code:

```sol
// (c) 2022-2023, Ava Labs, Inc. All rights reserved.
// See the file LICENSE for licensing terms.

// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;
import "./IAllowList.sol";

interface IHelloWorld is IAllowList {
  // sayHello returns the stored greeting string
  function sayHello() external view returns (string calldata result);

  // setGreeting  stores the greeting string
  function setGreeting(string calldata response) external;
}
```

Now we have an interface that our precompile can implement!
Let's create an [ABI](https://docs.soliditylang.org/en/v0.8.13/abi-spec.html#contract-abi-specification)
of our Solidity interface.

In the same directory, let's run:

```shell
solc --abi ./contracts/interfaces/IHelloWorld.sol -o ./abis
```

</TabItem>
<TabItem value="precompile-evm-tab" label="Precompile-EVM"  >

```bash
cd $GOPATH/src/github.com/ava-labs/precompile-evm
```

Then checkout to a new branch:

```bash
git checkout -b hello-world-stateful-precompile
```

We will start off in this directory `./contracts/`:

```bash
cd contracts/
```

For Precompile-EVM interfaces and other contracts in Subnet-EVM
can be accessible through `@avalabs/subnet-evm-contracts` package.
This is already added to the `package.json` file.
You can install it by running:

```shell
npm install
```

In order to import `IAllowList` interface, you can use the following import statement:

```sol
import "@avalabs/subnet-evm-contracts/contracts/interfaces/IAllowList.sol";
```

The full file looks like this:

```sol
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;
import "@avalabs/subnet-evm-contracts/contracts/interfaces/IAllowList.sol";

interface IHelloWorld is IAllowList {
  // sayHello returns the stored greeting string
  function sayHello() external view returns (string calldata result);

  // setGreeting stores the greeting string
  function setGreeting(string calldata response) external;
}
```

Now we have an interface that our precompile can implement!
Let's create an [ABI](https://docs.soliditylang.org/en/v0.8.13/abi-spec.html#contract-abi-specification)
of our Solidity interface.

In Precompile-EVM we import contracts from `@avalabs/subnet-evm-contracts` package.
In order to generate the ABI in Precompile-EVM we need to include the `node_modules` folder to find
imported contracts with following flags:

- `--abi`
  - ABI specification of the contracts.
- `--base-path path`
  - Use the given path as the root of the source tree instead of the root of the filesystem.
- `--include-path path`
  - Make an additional source directory available to the default import callback. Use this option if
    you want to import contracts whose location is not fixed in relation to your main source tree;
    for example
    third-party libraries installed using a package manager. Can be used multiple times.
    Can only be used if base path has a non-empty value.
- `--output-dir path`
  - If given, creates one file per output component and contract/file at the specified directory.
- `--overwrite`
  - Overwrite existing files (used together with `--output-dir`).

```shell
solc --abi ./contracts/interfaces/IHelloWorld.sol -o ./abis --base-path . --include-path ./node_modules
```

</TabItem>
</Tabs>

<!-- vale on -->

This generates the ABI code under `./abis/IHelloWorld.abi`.

```json
[
  {
    "inputs": [
      { "internalType": "address", "name": "addr", "type": "address" }
    ],
    "name": "readAllowList",
    "outputs": [
      { "internalType": "uint256", "name": "role", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "sayHello",
    "outputs": [
      { "internalType": "string", "name": "result", "type": "string" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "addr", "type": "address" }
    ],
    "name": "setAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "addr", "type": "address" }
    ],
    "name": "setEnabled",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "response", "type": "string" }
    ],
    "name": "setGreeting",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "addr", "type": "address" }
    ],
    "name": "setNone",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
```

As you can see the ABI also contains the `IAllowList` interface functions. This is because the
`IHelloWorld` interface inherits from the `IAllowList` interface.

Note: The ABI must have named outputs in order to generate the precompile template.

Now that we have an ABI for the precompile gen tool to interact with, we can run the following
command to generate our HelloWorld precompile files!

Let's go back to the root of the repository and run the PrecompileGen script helper:

<!-- markdownlint-disable MD013 -->

```shell
cd ..
```

Both of these Subnet-EVM and Precompile-EVM have the same `generate_precompile.sh` script. The one in Precompile-EVM
installs the script from Subnet-EVM and runs it.

```bash

$ ./scripts/generate_precompile.sh --help

Using branch: precompile-tutorial
NAME:
precompilegen - subnet-evm precompile generator tool

USAGE:
main [global options] command [command options] [arguments...]

VERSION:
1.10.26-stable

COMMANDS:
help, h Shows a list of commands or help for one command

GLOBAL OPTIONS:

    --abi value
          Path to the contract ABI json to generate, - for STDIN

    --out value
          Output folder for the generated precompile files, - for STDOUT (default =
          ./precompile/contracts/{pkg}). Test files won't be generated if STDOUT is used

    --pkg value
          Go package name to generate the precompile into (default = {type})

    --type value
          Struct name for the precompile (default = {abi file name})

MISC

    --help, -h                     (default: false)
          show help

    --version, -v                  (default: false)
          print the version

COPYRIGHT:
Copyright 2013-2022 The go-ethereum Authors

```

Now let's generate the precompile template files!

<!-- vale off -->

<Tabs groupId="evm-tabs">
<TabItem value="subnet-evm-tab" label="Subnet-EVM" default>

In Subnet-EVM precompile implementations reside under the [`./precompile/contracts`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contracts) directory. Let's generate our precompile
template in the `./precompile/contracts/helloworld` directory, where `helloworld` is the name of the
Go package we want to generate the precompile into.

```bash
./scripts/generate_precompile.sh --abi ./contracts/abis/IHelloWorld.abi --type HelloWorld --pkg helloworld
```

</TabItem>
<TabItem value="precompile-evm-tab" label="Precompile-EVM"  >

For Precompile-EVM we don't need to put files under a deep directory structure. We can just generate the
precompile template under its own directory via `--out ./helloworld` flag.

```bash
./scripts/generate_precompile.sh --abi ./contracts/abis/IHelloWorld.abi --type HelloWorld --pkg helloworld --out ./helloworld
```

</TabItem>
</Tabs>

<!-- vale on -->

<!-- markdownlint-enable MD013 -->

This generates a precompile template files `contract.go`, `contract.abi`, `config.go`, `module.go`
and `README.md` files. `README.md` explains general guidelines for precompile development.
You should carefully read this file before modifying the precompile template.

<!-- markdownlint-disable MD013 -->

```md
There are some must-be-done changes waiting in the generated file. Each area requiring you to add your code is marked with CUSTOM CODE to make them easy to find and modify.
Additionally there are other files you need to edit to activate your precompile.
These areas are highlighted with comments "ADD YOUR PRECOMPILE HERE".
For testing take a look at other precompile tests in contract_test.go and config_test.go in other precompile folders.
See the tutorial in [https://docs.avax.network/subnets/hello-world-precompile-tutorial] for more information about precompile development.

General guidelines for precompile development:
1- Set a suitable config key in generated module.go. E.g: "yourPrecompileConfig"
2- Read the comment and set a suitable contract address in generated module.go. E.g:
ContractAddress = common.HexToAddress("ASUITABLEHEXADDRESS")
3- It is recommended to only modify code in the highlighted areas marked with "CUSTOM CODE STARTS HERE". Typically, custom codes are required in only those areas.
Modifying code outside of these areas should be done with caution and with a deep understanding of how these changes may impact the EVM.
4- Set gas costs in generated contract.go
5- Force import your precompile package in precompile/registry/registry.go
6- Add your config unit tests under generated package config_test.go
7- Add your contract unit tests under generated package contract_test.go
8- Additionally you can add a full-fledged VM test for your precompile under plugin/vm/vm_test.go. See existing precompile tests for examples.
9- Add your solidity interface and test contract to contracts/contracts
10- Write solidity contract tests for your precompile in contracts/contracts/test/
11- Write TypeScript DS-Test counterparts for your solidity tests in contracts/test/
12- Create your genesis with your precompile enabled in tests/precompile/genesis/
13- Create e2e test for your solidity test in tests/precompile/solidity/suites.go
14- Run your e2e precompile Solidity tests with './scripts/run_ginkgo.sh`
```

Let's follow these steps and create our HelloWorld precompile!

<!-- markdownlint-enable MD013 -->

### Step 1: Set Config Key

Let's jump to `helloworld/module.go` file first. This file contains the module definition for our
precompile. You can see the `ConfigKey` is set to some default value of `helloWorldConfig`.
This key should be unique to the precompile.
This config key determines which JSON key to use when reading the precompile's config from the
JSON upgrade/genesis file. In this case, the config key is `helloWorldConfig` and the JSON config
should look like this:

```json
{
  "helloWorldConfig": {
    "blockTimestamp": 0
		...
  }
}
```

### Step 2: Set Contract Address

In the `helloworld/module.go` you can see the `ContractAddress` is set to some default value.
This should be changed to a suitable address for your precompile.
The address should be unique to the precompile. There is a registry of precompile addresses
under [`precompile/registry/registry.go`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/registry/registry.go).
A list of addresses is specified in the comments under this file.
Modify the default value to be the next user available stateful precompile address. For forks of
Subnet-EVM or Precompile-EVM, users should start at `0x0300000000000000000000000000000000000000` to ensure
that their own modifications do not conflict with stateful precompiles that may be added to
Subnet-EVM in the future. You should pick an address that is not already taken.

```go
// This list is kept just for reference. The actual addresses defined in respective packages of precompiles.
// Note: it is important that none of these addresses conflict with each other or any other precompiles
// in core/vm/contracts.go.
// The first stateful precompiles were added in coreth to support nativeAssetCall and nativeAssetBalance. New stateful precompiles
// originating in coreth will continue at this prefix, so we reserve this range in subnet-evm so that they can be migrated into
// subnet-evm without issue.
// These start at the address: 0x0100000000000000000000000000000000000000 and will increment by 1.
// Optional precompiles implemented in subnet-evm start at 0x0200000000000000000000000000000000000000 and will increment by 1
// from here to reduce the risk of conflicts.
// For forks of subnet-evm, users should start at 0x0300000000000000000000000000000000000000 to ensure
// that their own modifications do not conflict with stateful precompiles that may be added to subnet-evm
// in the future.
// ContractDeployerAllowListAddress = common.HexToAddress("0x0200000000000000000000000000000000000000")
// ContractNativeMinterAddress      = common.HexToAddress("0x0200000000000000000000000000000000000001")
// TxAllowListAddress               = common.HexToAddress("0x0200000000000000000000000000000000000002")
// FeeManagerAddress                = common.HexToAddress("0x0200000000000000000000000000000000000003")
// RewardManagerAddress             = common.HexToAddress("0x0200000000000000000000000000000000000004")
// HelloWorldAddress                = common.HexToAddress("0x0300000000000000000000000000000000000000")
// ADD YOUR PRECOMPILE HERE
// {YourPrecompile}Address          = common.HexToAddress("0x03000000000000000000000000000000000000??")
```

Don't forget to update the actual variable `ContractAddress` in `module.go` to the address you chose.
It should look like this:

```go
// ContractAddress is the defined address of the precompile contract.
// This should be unique across all precompile contracts.
// See params/precompile_modules.go for registered precompile contracts and more information.
var ContractAddress = common.HexToAddress("0x0300000000000000000000000000000000000000")
```

Now when Subnet-EVM sees the `helloworld.ContractAddress` as input when executing
[`CALL`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/core/vm/evm.go#L284),
[`CALLCODE`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/core/vm/evm.go#L355),
[`DELEGATECALL`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/core/vm/evm.go#L396),
[`STATICCALL`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/core/vm/evm.go#L445),
it can run the precompile if the precompile is enabled.

### Step 3: Add Custom Code

Search (`CTRL F`) throughout the file with `CUSTOM CODE STARTS HERE` to find the areas in the
precompile package that you need to modify. You should start with the reference imports code block.

#### Step 3.1: Module File

The module file contains fundamental information about the precompile. This includes the key for the
precompile, the address of the precompile, and a configurator. This file is located at
[`./precompile/helloworld/module.go`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contracts/helloworld/module.go)
for Subnet-EVM and
[./helloworld/module.go](https://github.com/ava-labs/precompile-evm/blob/hello-world-example/helloworld/module.go)
for Precompile-EVM.

This file defines the module for the precompile. The module is used to register the precompile to the
precompile registry. The precompile registry is used to read configs and enable the precompile.
Registration is done in the `init()` function of the module file. `MakeConfig()` is used to create a
new instance for the precompile config. This will be used in custom Unmarshal/Marshal logic.
You don't need to override these functions.

##### Configure()

Module file contains a `configurator` which implements the `contract.Configurator` interface. This interface
includes a `Configure()` function used to configure the precompile and set the initial
state of the precompile. This function is called when the precompile is enabled. This is typically used
to read from a given config in upgrade/genesis JSON and sets the initial state of the
precompile accordingly. This function also calls `AllowListConfig.Configure()` to invoke AllowList
configuration as the last step. You should keep it as it is if you want to use AllowList.
You can modify this function for your custom logic. You can circle back to this function later
after you have finalized the implementation of the precompile config.

#### Step 3.2: Config File

The config file contains the config for the precompile. This file is located at
[`./precompile/helloworld/config.go`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contracts/helloworld/config.go)
for Subnet-EVM and
[./helloworld/config.go](https://github.com/ava-labs/precompile-evm/blob/hello-world-example/helloworld/config.go)
for Precompile-EVM.
This file contains the `Config` struct, which implements `precompileconfig.Config` interface.
It has some embedded structs like `precompileconfig.Upgrade`. `Upgrade` is used to enable
upgrades for the precompile. It contains the `BlockTimestamp` and `Disable` to enable/disable
upgrades. `BlockTimestamp` is the timestamp of the block when the upgrade will be activated.
`Disable` is used to disable the upgrade. If you use `AllowList` for the precompile, there is also
`allowlist.AllowListConfig` embedded in the `Config` struct. `AllowListConfig` is used to specify initial
roles for specified addresses. If you have any custom fields in your precompile config, you can add them
here. These custom fields will be read from upgrade/genesis JSON and set in the precompile config.

```go
// Config implements the precompileconfig.Config interface and
// adds specific configuration for HelloWorld.
type Config struct {
	allowlist.AllowListConfig
	precompileconfig.Upgrade
}
```

##### Verify()

`Verify()` is called on startup and an error is treated as fatal. Generated code contains a call
to `AllowListConfig.Verify()` to verify the `AllowListConfig`. You can leave that as is and start
adding your own custom verify code after that.

We can leave this function as is right now because there is no invalid custom configuration for the `Config`.

```go
// Verify tries to verify Config and returns an error accordingly.
func (c *Config) Verify() error {
	// Verify AllowList first
	if err := c.AllowListConfig.Verify(); err != nil {
		return err
	}

	// CUSTOM CODE STARTS HERE
	// Add your own custom verify code for Config here
	// and return an error accordingly
	return nil
}
```

##### Equal()

Next, we see is `Equal()`. This function determines if two precompile configs are equal. This is used
to determine if the precompile needs to be upgraded. There is some default code that is generated for
checking `Upgrade` and `AllowListConfig` equality.

<!-- markdownlint-disable MD013 -->

```go
// Equal returns true if [s] is a [*Config] and it has been configured identical to [c].
func (c *Config) Equal(s precompileconfig.Config) bool {
	// typecast before comparison
	other, ok := (s).(*Config)
	if !ok {
		return false
	}
	// CUSTOM CODE STARTS HERE
	// modify this boolean accordingly with your custom Config, to check if [other] and the current [c] are equal
	// if Config contains only Upgrade  and AllowListConfig  you can skip modifying it.
	equals := c.Upgrade.Equal(&other.Upgrade) && c.AllowListConfig.Equal(&other.AllowListConfig)
	return equals
}
```

<!-- markdownlint-enable MD013 -->

We can leave this function as is since we check `Upgrade` and `AllowListConfig` for equality which are
the only fields that `Config` struct has.

#### Step 3.3: Modify Configure()

We can now circle back to `Configure()` in `module.go` as we finished implementing `Config` struct.
This function configures the `state` with the
initial configuration at`blockTimestamp` when the precompile is enabled.
In the HelloWorld example, we want to set up a default
key-value mapping in the state where the key is `storageKey` and the value is `Hello World!`. The
`StateDB` allows us to store a key-value mapping of 32-byte hashes. The below code snippet can be
copied and pasted to overwrite the default `Configure()` code.

```go
const defaultGreeting = "Hello World!"

// Configure configures [state] with the given [cfg] precompileconfig.
// This function is called by the EVM once per precompile contract activation.
// You can use this function to set up your precompile contract's initial state,
// by using the [cfg] config and [state] stateDB.
func (*configurator) Configure(chainConfig contract.ChainConfig, cfg precompileconfig.Config, state contract.StateDB, _ contract.BlockContext) error {
	config, ok := cfg.(*Config)
	if !ok {
		return fmt.Errorf("incorrect config %T: %v", config, config)
	}
	// CUSTOM CODE STARTS HERE

	// This will be called in the first block where HelloWorld stateful precompile is enabled.
	// 1) If BlockTimestamp is nil, this will not be called
	// 2) If BlockTimestamp is 0, this will be called while setting up the genesis block
	// 3) If BlockTimestamp is 1000, this will be called while processing the first block
	// whose timestamp is >= 1000
	//
	// Set the initial value under [common.BytesToHash([]byte("storageKey")] to "Hello World!"
	StoreGreeting(state, defaultGreeting)
	// AllowList is activated for this precompile. Configuring allowlist addresses here.
	return config.AllowListConfig.Configure(state, ContractAddress)
}
```

#### Step 3.4: Contract File

The contract file contains the functions of the precompile contract that will be called by the EVM. The
file is located at [`./precompile/helloworld/contract.go`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contracts/helloworld/contract.go)
for Subnet-EVM and
[./helloworld/contract.go](https://github.com/ava-labs/precompile-evm/blob/hello-world-example/helloworld/contract.go)
for Precompile-EVM.
Since we use `IAllowList` interface there will be auto-generated code for `AllowList`
functions like below:

```go
// GetHelloWorldAllowListStatus returns the role of [address] for the HelloWorld list.
func GetHelloWorldAllowListStatus(stateDB contract.StateDB, address common.Address) allowlist.Role {
	return allowlist.GetAllowListStatus(stateDB, ContractAddress, address)
}

// SetHelloWorldAllowListStatus sets the permissions of [address] to [role] for the
// HelloWorld list. Assumes [role] has already been verified as valid.
// This stores the [role] in the contract storage with address [ContractAddress]
// and [address] hash. It means that any reusage of the [address] key for different value
// conflicts with the same slot [role] is stored.
// Precompile implementations must use a different key than [address] for their storage.
func SetHelloWorldAllowListStatus(stateDB contract.StateDB, address common.Address, role allowlist.Role) {
	allowlist.SetAllowListRole(stateDB, ContractAddress, address, role)
}
```

These will be helpful to use AllowList precompile helper in our functions.

##### Packers and Unpackers

There are also auto-generated Packers and Unpackers for the ABI. These will be used in `sayHello` and
`setGreeting` functions to comfort the ABI.
These functions are auto-generated
and will be used in necessary places accordingly.
You don't need to worry about how to deal with them, but it's good to know what they are.

Each input to a precompile contract function has it's own `Unpacker` function as follows:

```go
// UnpackSetGreetingInput attempts to unpack [input] into the string type argument
// assumes that [input] does not include selector (omits first 4 func signature bytes)
func UnpackSetGreetingInput(input []byte) (string, error) {
	res, err := HelloWorldABI.UnpackInput("setGreeting", input)
	if err != nil {
		return "", err
	}
	unpacked := *abi.ConvertType(res[0], new(string)).(*string)
	return unpacked, nil
}
```

The ABI is a binary format and the input to the precompile contract function is a
byte array. The `Unpacker` function converts this input to a more easy-to-use format so that we can
use it in our function.

Similarly, there is a `Packer` function for each output of a precompile contract function as follows:

```go
// PackSayHelloOutput attempts to pack given result of type string
// to conform the ABI outputs.
func PackSayHelloOutput(result string) ([]byte, error) {
	return HelloWorldABI.PackOutput("sayHello", result)
}
```

This function converts the output of the function to a byte array that conforms to the ABI and can be
returned to the EVM as a result.

##### Modify sayHello()

The next place to modify is in our `sayHello()` function. In a previous step, we created the `IHelloWorld.sol`
interface with two functions `sayHello()` and `setGreeting()`. We finally get to implement them here.
If any contract calls these functions from the interface, the below function gets executed. This function
is a simple getter function. In `Configure()` we set up a mapping with the key as `storageKey` and
the value as `Hello World!` In this function, we will be returning whatever value is at `storageKey`.
The below code snippet can be copied and pasted to overwrite the default `setGreeting` code.

First, we add a helper function to get the greeting value from the stateDB, this will be helpful
when we test our contract. We will use the `storageKeyHash` to store the value in the Contract's reserved storage in the stateDB.

```go
var (
  // storageKeyHash is the hash of the storage key "storageKey" in the contract storage.
	// This is used to store the value of the greeting in the contract storage.
	// It is important to use a unique key here to avoid conflicts with other storage keys
	// like addresses, AllowList, etc.
	storageKeyHash = common.BytesToHash([]byte("storageKey"))
)
// GetGreeting returns the value of the storage key "storageKey" in the contract storage,
// with leading zeroes trimmed.
// This function is mostly used for tests.
func GetGreeting(stateDB contract.StateDB) string {
	// Get the value set at recipient
	value := stateDB.GetState(ContractAddress, storageKeyHash)
	return string(common.TrimLeftZeroes(value.Bytes()))
}
```

Now we can modify the `sayHello` function to return the stored value.

<!-- markdownlint-disable MD013 -->

```go
func sayHello(accessibleState contract.AccessibleState, caller common.Address, addr common.Address, input []byte, suppliedGas uint64, readOnly bool) (ret []byte, remainingGas uint64, err error) {
	if remainingGas, err = contract.DeductGas(suppliedGas, SayHelloGasCost); err != nil {
		return nil, 0, err
	}
	// CUSTOM CODE STARTS HERE

	// Get the current state
	currentState := accessibleState.GetStateDB()
	// Get the value set at recipient
	value := GetGreeting(currentState)
	packedOutput, err := PackSayHelloOutput(value)
	if err != nil {
		return nil, remainingGas, err
	}

	// Return the packed output and the remaining gas
	return packedOutput, remainingGas, nil
}
```

<!-- markdownlint-enable MD013 -->

##### Modify setGreeting()

We can also modify our `setGreeting()` function. This is a simple setter function. It takes in `input`
and we will set that as the value in the state mapping with the key as `storageKey`. It also checks
if the VM running the precompile is in read-only mode. If it is, it returns an error.

There is also a generated `AllowList` code in that function. This generated code checks if the caller
address is eligible to perform this state-changing operation. If not, it returns an error.

Let's add the helper function to set the greeting value in the stateDB, this will be helpful
when we test our contract.

```go
// StoreGreeting sets the value of the storage key "storageKey" in the contract storage.
func StoreGreeting(stateDB contract.StateDB, input string) {
	inputPadded := common.LeftPadBytes([]byte(input), common.HashLength)
	inputHash := common.BytesToHash(inputPadded)

	stateDB.SetState(ContractAddress, storageKeyHash, inputHash)
}
```

The below code snippet can be copied and pasted to overwrite the default `setGreeting()` code.

<!-- markdownlint-disable MD013 -->

```go
func setGreeting(accessibleState contract.AccessibleState, caller common.Address, addr common.Address, input []byte, suppliedGas uint64, readOnly bool) (ret []byte, remainingGas uint64, err error) {
	if remainingGas, err = contract.DeductGas(suppliedGas, SetGreetingGasCost); err != nil {
		return nil, 0, err
	}
	if readOnly {
		return nil, remainingGas, vmerrs.ErrWriteProtection
	}
	// attempts to unpack [input] into the arguments to the SetGreetingInput.
	// Assumes that [input] does not include selector
	// You can use unpacked [inputStruct] variable in your code
	inputStruct, err := UnpackSetGreetingInput(input)
	if err != nil {
		return nil, remainingGas, err
	}

	// Allow list is enabled and SetGreeting is a state-changer function.
	// This part of the code restricts the function to be called only by enabled/admin addresses in the allow list.
	// You can modify/delete this code if you don't want this function to be restricted by the allow list.
	stateDB := accessibleState.GetStateDB()
	// Verify that the caller is in the allow list and therefore has the right to call this function.
	callerStatus := allowlist.GetAllowListStatus(stateDB, ContractAddress, caller)
	if !callerStatus.IsEnabled() {
		return nil, remainingGas, fmt.Errorf("%w: %s", ErrCannotSetGreeting, caller)
	}
	// allow list code ends here.

	// CUSTOM CODE STARTS HERE
	// Check if the input string is longer than HashLength
	if len(inputStruct) > common.HashLength {
		return nil, 0, ErrInputExceedsLimit
	}

	// setGreeting is the execution function
	// "SetGreeting(name string)" and sets the storageKey
	// in the string returned by hello world
	StoreGreeting(stateDB, inputStruct)

	// This function does not return an output, leave this one as is
	packedOutput := []byte{}

	// Return the packed output and the remaining gas
	return packedOutput, remainingGas, nil
}
```

<!-- markdownlint-enable MD013 -->

### Step 4: Set Gas Costs

Setting gas costs for functions is very important and should be done carefully.
If the gas costs are set too low,
then functions can be abused and can cause DoS attacks.
If the gas costs are set too high, then the contract will be too expensive
to run.
Subnet-EVM has some predefined gas costs for write and read operations
in [`precompile/contract/utils.go`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contract/utils.go#L19-L20).
In order to provide a baseline for gas costs, we have set the following gas costs.

```go
// Gas costs for stateful precompiles
const (
	WriteGasCostPerSlot = 20_000
	ReadGasCostPerSlot  = 5_000
)
```

`WriteGasCostPerSlot` is the cost of one write such as modifying a state storage slot.

`ReadGasCostPerSlot` is the cost of reading a state storage slot.

This should be in your gas cost estimations based on how many times the precompile function does a
read or a write. For example, if the precompile modifies the state slot of its precompile address
twice then the gas cost for that function would be `40_000`. However, if the precompile does additional
operations and requires more computational power, then you should increase the gas costs accordingly.

On top of these gas costs, we also have to account for the gas costs of AllowList gas costs. These
are the gas costs of reading and writing permissions for addresses in AllowList. These are defined
under Subnet-EVM's [`precompile/allowlist/allowlist.go`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/allowlist/allowlist.go#L28-L29).
By default, these are added to the default gas costs of the state-change functions (SetGreeting)
of the precompile. Meaning that these functions will cost an additional `ReadAllowListGasCost` in order
to read permissions from the storage. If you don't plan to read permissions from the storage then
you can omit these.

Now going back to our `/helloworld/contract.go`, we can modify our precompile function gas costs.
Please search (`CTRL F`) `SET A GAS COST HERE` to locate the default gas cost code.

```go
SayHelloGasCost    uint64 = 0                                  // SET A GAS COST HERE
SetGreetingGasCost uint64 = 0 + allowlist.ReadAllowListGasCost // SET A GAS COST HERE
```

We get and set our greeting with `sayHello()` and `setGreeting()` in one slot
respectively so we can define the gas costs as follows. We also read permissions from the
AllowList in `setGreeting()` so we keep `allowlist.ReadAllowListGasCost`.

```go
SayHelloGasCost    uint64 = contract.ReadGasCostPerSlot
SetGreetingGasCost uint64 = contract.WriteGasCostPerSlot + allowlist.ReadAllowListGasCost
```

### Step 5: Register Precompile

We should register our precompile package to the Subnet-EVM to be discovered by other packages.
Our `Module` file contains an `init()` function that registers our precompile.
`init()` is called when the package is imported.
We should register our precompile in a common package so
that it can be imported by other packages.

<!-- vale off -->

<Tabs groupId="evm-tabs">

<TabItem value="subnet-evm-tab" label="Subnet-EVM" default>

For Subnet-EVM we have a precompile registry under [`/precompile/registry/registry.go`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/registry/registry.go).
This registry force-imports precompiles from other packages, for example:

```go
// Force imports of each precompile to ensure each precompile's init function runs and registers itself
// with the registry.
import (
	_ "github.com/ava-labs/subnet-evm/precompile/contracts/deployerallowlist"

	_ "github.com/ava-labs/subnet-evm/precompile/contracts/nativeminter"

	_ "github.com/ava-labs/subnet-evm/precompile/contracts/txallowlist"

	_ "github.com/ava-labs/subnet-evm/precompile/contracts/feemanager"

	_ "github.com/ava-labs/subnet-evm/precompile/contracts/rewardmanager"

	_ "github.com/ava-labs/subnet-evm/precompile/contracts/helloworld"
	// ADD YOUR PRECOMPILE HERE
	// _ "github.com/ava-labs/subnet-evm/precompile/contracts/yourprecompile"
)
```

<!-- vale off -->

The registry itself also force-imported by the [`/plugin/evm/vm.go](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/plugin/evm/vm.go#L50).
This ensures that the registry is imported and the precompiles are registered.

<!-- vale on -->

</TabItem>
<TabItem value="precompile-evm-tab" label="Precompile-EVM"  >

For Precompile-EVM there is a [`plugin/main.go`](https://github.com/ava-labs/precompile-evm/blob/hello-world-example/plugin/main.go)
file in Precompile-EVM that orchestrates this precompile registration.

```go
// (c) 2019-2023, Ava Labs, Inc. All rights reserved.
// See the file LICENSE for licensing terms.

package main

import (
	"fmt"

	"github.com/ava-labs/avalanchego/version"
	"github.com/ava-labs/subnet-evm/plugin/evm"
	"github.com/ava-labs/subnet-evm/plugin/runner"

	// Each precompile generated by the precompilegen tool has a self-registering init function
	// that registers the precompile with the subnet-evm. Importing the precompile package here
	// will cause the precompile to be registered with the subnet-evm.
	_ "github.com/ava-labs/precompile-evm/helloworld"
	// ADD YOUR PRECOMPILE HERE
	//_ "github.com/ava-labs/precompile-evm/{yourprecompilepkg}"
)
```

</TabItem>
</Tabs>

<!-- vale on -->

### Step 6: Add Config Tests

Precompile generation tool generates skeletons for unit tests as well. Generated config tests will
be under [`./precompile/contracts/helloworld/config_test.go`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contracts/helloworld/config_test.go)
for Subnet-EVM and [`./helloworld/config_test.go`](https://github.com/ava-labs/precompile-evm/blob/hello-world-example/helloworld/config_test.go)
for Precompile-EVM.
There are mainly two functions we need
to test: `Verify` and `Equal`. `Verify` checks if the precompile is configured correctly. `Equal`
checks if the precompile is equal to another precompile. Generated `Verify` tests contain a valid case.
You can add more invalid cases depending on your implementation. `Equal` tests generate some
invalid cases to test different timestamps, types, and AllowList cases.
You can check each `config_test.go` files for other precompiles
under the Subnet-EVM's [`./precompile/contracts`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contracts/)
directory for more examples.

### Step 7: Add Contract Tests

The tool also generates contract tests to make sure our precompile is working correctly. Generated
tests include cases to test allow list capabilities, gas costs, and calling functions in read-only mode.
You can check other `contract_test.go` files in the `/precompile/contracts`. Hello World contract
tests will be under [`./precompile/contracts/helloworld/contract_test.go`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contracts/helloworld/contract_test.go)
for Subnet-EVM and
[`./helloworld/contract_test.go`](https://github.com/ava-labs/precompile-evm/blob/hello-world-example/helloworld/contract_test.go)
for Precompile-EVM.
We will also add more test to cover functionalities of `sayHello()` and `setGreeting()`.
Contract tests are defined in a standard structure that each test
can customize to their needs. The test structure is as follows:

```go
// PrecompileTest is a test case for a precompile
type PrecompileTest struct {
	// Caller is the address of the precompile caller
	Caller common.Address
	// Input the raw input bytes to the precompile
	Input []byte
	// InputFn is a function that returns the raw input bytes to the precompile
	// If specified, Input will be ignored.
	InputFn func(t *testing.T) []byte
	// SuppliedGas is the amount of gas supplied to the precompile
	SuppliedGas uint64
	// ReadOnly is whether the precompile should be called in read only
	// mode. If true, the precompile should not modify the state.
	ReadOnly bool
	// Config is the config to use for the precompile
	// It should be the same precompile config that is used in the
	// precompile's configurator.
	// If nil, Configure will not be called.
	Config precompileconfig.Config
	// BeforeHook is called before the precompile is called.
	BeforeHook func(t *testing.T, state contract.StateDB)
	// AfterHook is called after the precompile is called.
	AfterHook func(t *testing.T, state contract.StateDB)
	// ExpectedRes is the expected raw byte result returned by the precompile
	ExpectedRes []byte
	// ExpectedErr is the expected error returned by the precompile
	ExpectedErr string
	// BlockNumber is the block number to use for the precompile's block context
	BlockNumber int64
}
```

Each test can populate the fields of the `PrecompileTest` struct to customize the test.
This test uses an AllowList helper function
`allowlist.RunPrecompileWithAllowListTests(t, Module, state.NewTestStateDB, tests)`
which can run all specified tests plus AllowList test suites. If you don't plan to use AllowList,
you can directly run them as follows:

```go
	for name, test := range tests {
		t.Run(name, func(t *testing.T) {
			test.Run(t, module, newStateDB(t))
		})
	}
```

### Step 8 (Optional): VM Tests

This is only applicable for direct Subnet-EVM forks as test files are not directly exported in
Golang. If you use Precompile-EVM you can skip this step.

VM tests are tests that run the precompile by calling it through the Subnet-EVM. These are the most
comprehensive tests that we can run. If your precompile modifies how the Subnet-EVM works, for example
changing blockchain rules, you should add a VM test. For example, you can take a look at the
TestRewardManagerPrecompileSetRewardAddress function in [here](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/plugin/evm/vm_test.go#L2675).
For this Hello World example, we don't modify any Subnet-EVM rules, so we don't need to add any VM tests.

### Step 9: Add Test Contract

Let's add our test contract to `./contracts/contracts`. This smart contract lets us interact
with our precompile! We cast the `HelloWorld` precompile address to the `IHelloWorld`interface. In
doing so, `helloWorld` is now a contract of type `IHelloWorld` and when we call any functions on
that contract, we will be redirected to the HelloWorld precompile address. The below code snippet
can be copied and pasted into a new file called `ExampleHelloWorld.sol`:

```sol
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IHelloWorld.sol";

// ExampleHelloWorld shows how the HelloWorld precompile can be used in a smart contract.
contract ExampleHelloWorld {
  address constant HELLO_WORLD_ADDRESS =
    0x0300000000000000000000000000000000000000;
  IHelloWorld helloWorld = IHelloWorld(HELLO_WORLD_ADDRESS);

  function sayHello() public view returns (string memory) {
    return helloWorld.sayHello();
  }

  function setGreeting(string calldata greeting) public {
    helloWorld.setGreeting(greeting);
  }
}
```

:::warning

Hello World Precompile is a different contract than ExampleHelloWorld and has a different address.
Since the precompile uses AllowList for a permissioned access,
any call to the precompile including from ExampleHelloWorld will be denied unless
the caller is added to the AllowList.

:::

Please note that this contract is simply a wrapper and is calling the precompile functions.
The reason why we add another example smart contract is to have a simpler stateless tests.

For the test contract we write our test in `./contracts/test/ExampleHelloWorldTest.sol`.

<!-- vale off -->
<!-- vale off -->

<Tabs groupId="evm-tabs">

<TabItem value="subnet-evm-tab" label="Subnet-EVM" default>

<!-- vale on -->

```sol
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../ExampleHelloWorld.sol";
import "../interfaces/IHelloWorld.sol";
import "./AllowListTest.sol";

contract ExampleHelloWorldTest is AllowListTest {
  IHelloWorld helloWorld = IHelloWorld(HELLO_WORLD_ADDRESS);

  function step_getDefaultHelloWorld() public {
    ExampleHelloWorld example = new ExampleHelloWorld();
    address exampleAddress = address(example);

    assertRole(helloWorld.readAllowList(exampleAddress), AllowList.Role.None);
    assertEq(example.sayHello(), "Hello World!");
  }

  function step_doesNotSetGreetingBeforeEnabled() public {
    ExampleHelloWorld example = new ExampleHelloWorld();
    address exampleAddress = address(example);

    assertRole(helloWorld.readAllowList(exampleAddress), AllowList.Role.None);

    try example.setGreeting("testing") {
      assertTrue(false, "setGreeting should fail");
    } catch {}
  }

  function step_setAndGetGreeting() public {
    ExampleHelloWorld example = new ExampleHelloWorld();
    address exampleAddress = address(example);

    assertRole(helloWorld.readAllowList(exampleAddress), AllowList.Role.None);
    helloWorld.setEnabled(exampleAddress);
    assertRole(
      helloWorld.readAllowList(exampleAddress),
      AllowList.Role.Enabled
    );

    string memory greeting = "testgreeting";
    example.setGreeting(greeting);
    assertEq(example.sayHello(), greeting);
  }
}
```

</TabItem>
<TabItem value="precompile-evm-tab" label="Precompile-EVM"  >

For Precompile-EVM, you should import `AllowListTest` with `@avalabs/subnet-evm-contracts` NPM package:

```sol
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../ExampleHelloWorld.sol";
import "../interfaces/IHelloWorld.sol";
import "@avalabs/subnet-evm-contracts/contracts/test/AllowListTest.sol";

contract ExampleHelloWorldTest is AllowListTest {
  IHelloWorld helloWorld = IHelloWorld(HELLO_WORLD_ADDRESS);

  function step_getDefaultHelloWorld() public {
    ExampleHelloWorld example = new ExampleHelloWorld();
    address exampleAddress = address(example);

    assertRole(helloWorld.readAllowList(exampleAddress), AllowList.Role.None);
    assertEq(example.sayHello(), "Hello World!");
  }

  function step_doesNotSetGreetingBeforeEnabled() public {
    ExampleHelloWorld example = new ExampleHelloWorld();
    address exampleAddress = address(example);

    assertRole(helloWorld.readAllowList(exampleAddress), AllowList.Role.None);

    try example.setGreeting("testing") {
      assertTrue(false, "setGreeting should fail");
    } catch {}
  }

  function step_setAndGetGreeting() public {
    ExampleHelloWorld example = new ExampleHelloWorld();
    address exampleAddress = address(example);

    assertRole(helloWorld.readAllowList(exampleAddress), AllowList.Role.None);
    helloWorld.setEnabled(exampleAddress);
    assertRole(
      helloWorld.readAllowList(exampleAddress),
      AllowList.Role.Enabled
    );

    string memory greeting = "testgreeting";
    example.setGreeting(greeting);
    assertEq(example.sayHello(), greeting);
  }
}
```

</TabItem>
</Tabs>

<!-- vale on -->

### Step 10: Add DS-Test

We can now trigger this test contract via `hardhat` tests. The test script uses Subnet-EVM's `test`
framework test in `./contracts/test`.
You can find more information about the test framework [here](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/contracts/test/utils.ts).

<!-- vale off -->

<Tabs groupId="evm-tabs">

<TabItem value="subnet-evm-tab" label="Subnet-EVM" default>

The test script looks like this:

```ts
// (c) 2019-2022, Ava Labs, Inc. All rights reserved.
// See the file LICENSE for licensing terms.

import { ethers } from "hardhat";
import { test } from "./utils";

// make sure this is always an admin for hello world precompile
const ADMIN_ADDRESS = "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC";
const HELLO_WORLD_ADDRESS = "0x0300000000000000000000000000000000000000";

describe("ExampleHelloWorldTest", function () {
  this.timeout("30s");

  beforeEach("Setup DS-Test contract", async function () {
    const signer = await ethers.getSigner(ADMIN_ADDRESS);
    const helloWorldPromise = ethers.getContractAt(
      "IHelloWorld",
      HELLO_WORLD_ADDRESS,
      signer
    );

    return ethers
      .getContractFactory("ExampleHelloWorldTest", { signer })
      .then((factory) => factory.deploy())
      .then((contract) => {
        this.testContract = contract;
        return contract.deployed().then(() => contract);
      })
      .then(() => Promise.all([helloWorldPromise]))
      .then(([helloWorld]) => helloWorld.setAdmin(this.testContract.address))
      .then((tx) => tx.wait());
  });

  test("should gets default hello world", ["step_getDefaultHelloWorld"]);

  test(
    "should not set greeting before enabled",
    "step_doesNotSetGreetingBeforeEnabled"
  );

  test(
    "should set and get greeting with enabled account",
    "step_setAndGetGreeting"
  );
});
```

</TabItem>
<TabItem value="precompile-evm-tab" label="Precompile-EVM"  >
The test script looks like this:

```ts
// (c) 2019-2022, Ava Labs, Inc. All rights reserved.
// See the file LICENSE for licensing terms.

import { ethers } from "hardhat";
import { test } from "@avalabs/subnet-evm-contracts";

// make sure this is always an admin for hello world precompile
const ADMIN_ADDRESS = "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC";
const HELLO_WORLD_ADDRESS = "0x0300000000000000000000000000000000000000";

describe("ExampleHelloWorldTest", function () {
  this.timeout("30s");

  beforeEach("Setup DS-Test contract", async function () {
    const signer = await ethers.getSigner(ADMIN_ADDRESS);
    const helloWorldPromise = ethers.getContractAt(
      "IHelloWorld",
      HELLO_WORLD_ADDRESS,
      signer
    );

    return ethers
      .getContractFactory("ExampleHelloWorldTest", { signer })
      .then((factory) => factory.deploy())
      .then((contract) => {
        this.testContract = contract;
        return contract.deployed().then(() => contract);
      })
      .then(() => Promise.all([helloWorldPromise]))
      .then(([helloWorld]) => helloWorld.setAdmin(this.testContract.address))
      .then((tx) => tx.wait());
  });

  test("should gets default hello world", ["step_getDefaultHelloWorld"]);

  test(
    "should not set greeting before enabled",
    "step_doesNotSetGreetingBeforeEnabled"
  );

  test(
    "should set and get greeting with enabled account",
    "step_setAndGetGreeting"
  );
});
```

</TabItem>
</Tabs>

<!-- vale on -->

### Step 11: Add Genesis

To run our e2e contract tests, we will need to create a Subnet that has the `Hello World`
precompile activated,
so we will copy and paste the below genesis file into: `/tests/precompile/genesis/hello_world.json`.

Note: it's important that this has the same name as the HardHat test file we created in Step 8.1.

```json
{
  "config": {
    "chainId": 99999,
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip150Hash": "0x2086799aeebeae135c246c65021c82b4e15a2c451340993aacfd2751886514f0",
    "eip155Block": 0,
    "eip158Block": 0,
    "byzantiumBlock": 0,
    "constantinopleBlock": 0,
    "petersburgBlock": 0,
    "istanbulBlock": 0,
    "muirGlacierBlock": 0,
    "feeConfig": {
      "gasLimit": 20000000,
      "minBaseFee": 1000000000,
      "targetGas": 100000000,
      "baseFeeChangeDenominator": 48,
      "minBlockGasCost": 0,
      "maxBlockGasCost": 10000000,
      "targetBlockRate": 2,
      "blockGasCostStep": 500000
    },
    "helloWorldConfig": {
      "blockTimestamp": 0,
      "adminAddresses": ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"]
    }
  },
  "alloc": {
    "8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC": {
      "balance": "0x52B7D2DCC80CD2E4000000"
    },
    "0x0Fa8EA536Be85F32724D57A37758761B86416123": {
      "balance": "0x52B7D2DCC80CD2E4000000"
    }
  },
  "nonce": "0x0",
  "timestamp": "0x0",
  "extraData": "0x00",
  "gasLimit": "0x1312D00",
  "difficulty": "0x0",
  "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "coinbase": "0x0000000000000000000000000000000000000000",
  "number": "0x0",
  "gasUsed": "0x0",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
}
```

Adding this to our genesis enables our HelloWorld precompile at the very first block (timestamp 0), with
`0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC` as the admin address.

```json
{
  "helloWorldConfig": {
    "blockTimestamp": 0,
    "adminAddresses": ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"]
  }
}
```

### Step 12: Declaring the HardHat E2E Test

Now that we have declared the HardHat test and corresponding `genesis.json` file. The last step to running
the e2e test is to declare the new test in `/tests/precompile/solidity/suites.go`.

At the bottom of the file you will see the following code commented out:

```go
	// TODO: can we refactor this so that it automagically checks to ensure each hardhat test file matches the name of a hardhat genesis file
	// and then runs the hardhat tests for each one without forcing precompile developers to modify this file.
	// ADD YOUR PRECOMPILE HERE
	/*
		ginkgo.It("your precompile", ginkgo.Label("Precompile"), ginkgo.Label("YourPrecompile"), func() {
			ctx, cancel := context.WithTimeout(context.Background(), time.Minute)
			defer cancel()

			// Specify the name shared by the genesis file in ./tests/precompile/genesis/{your_precompile}.json
			// and the test file in ./contracts/tests/{your_precompile}.ts
			// If you want to use a different test command and genesis path than the defaults, you can
			// use the utils.RunTestCMD. See utils.RunDefaultHardhatTests for an example.
			utils.RunDefaultHardhatTests(ctx, "your_precompile")
		})
	*/
```

`utils.RunDefaultHardhatTests` will run the default Hardhat test command and use the default genesis
path.
If you want to use a different test command and genesis path than the defaults, you can use the
`utils.CreateSubnet` and `utils.RunTestCMD`.
See how they were used with default params [here](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/tests/utils/subnet.go#L113)

You should copy and paste the ginkgo `It` node and update from `{your_precompile}` to `hello_world`.
The string passed in to `utils.RunDefaultHardhatTests(ctx, "your_precompile")` will be used
to find both the HardHat test file to execute and the genesis file, which is why you need to use the
same name for both.

After modifying the `It` node, it should look like the following (you can copy and paste this
directly if you prefer):

```go
	ginkgo.It("hello world", ginkgo.Label("Precompile"), ginkgo.Label("HelloWorld"), func() {
		ctx, cancel := context.WithTimeout(context.Background(), time.Minute)
		defer cancel()

		utils.RunDefaultHardhatTests(ctx, "hello_world")
	})
```

Now that we've set up the new ginkgo test, we can run the ginkgo test that we want by using the
`GINKGO_LABEL_FILTER`. This environment variable is passed as a flag to Ginkgo in
`./scripts/run_ginkgo.sh` and restricts what tests will run to only the tests with a matching label.

### Step 13: Running E2E Tests

#### Building AvalancheGo and Subnet-EVM/Precompile-EVM

Before we start testing, we will need to build the AvalancheGo binary and the custom Subnet-EVM binary.

Precompile-EVM bundles Subnet-EVM and runs it under the hood in the [`plugins/main.go`](https://github.com/ava-labs/precompile-evm/blob/hello-world-example/plugin/main.go#L24).
Meaning that Precompile-EVM binary works the same way as Subnet-EVM binary.
Precompile-EVM repo has also same scripts and the build process as Subnet-EVM.
Following steps also apply to Precompile-EVM.

You should have cloned [AvalancheGo](https://github.com/ava-labs/avalanchego) within your `$GOPATH` in
the [Prerequisites](#prerequisites) section, so you can build AvalancheGo with the following command:

```bash
cd $GOPATH/src/github.com/ava-labs/avalanchego
./scripts/build.sh
```

Once you've built AvalancheGo, you can confirm that it was successful by printing the version:

```bash
./build/avalanchego --version
```

This should print something like the following (if you are running AvalancheGo v1.9.7):

```bash
avalanche/1.9.7 [database=v1.4.5, rpcchainvm=22, commit=3e3e40f2f4658183d999807b724245023a13f5dc]
```

This path will be used later as the environment variable `AVALANCHEGO_EXEC_PATH` in the network runner.

Please note that the RPCChainVM version of AvalancheGo and Subnet-EVM must match.

Once we've built AvalancheGo, we can navigate back to the repo and build the binary:

<!-- vale off -->

<Tabs groupId="evm-tabs">

<TabItem value="subnet-evm-tab" label="Subnet-EVM" default>

```bash
cd $GOPATH/src/github.com/ava-labs/subnet-evm
./scripts/build.sh
```

This will build the Subnet-EVM binary and place it in AvalancheGo's `build/plugins` directory by default
at the file path:

`$GOPATH/src/github.com/ava-labs/avalanchego/build/plugins/srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy`

To confirm that the Subnet-EVM binary is compatible with AvalancheGo, you can run the same version command
and confirm the RPCChainVM version matches:

```bash
$GOPATH/src/github.com/ava-labs/avalanchego/build/plugins/srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy --version
```

This should give similar output:

```bash
Subnet-EVM/v0.5.2@9a1c5482c83c32b29630ff171cb20ccc889d760e [AvalancheGo=v1.10.2, rpcchainvm=26]
```

</TabItem>
<TabItem value="precompile-evm-tab" label="Precompile-EVM"  >

```bash
cd $GOPATH/src/github.com/ava-labs/precompile-evm
./scripts/build.sh
```

This will build the Precompile-EVM binary and place it in AvalancheGo's `build/plugins` directory by
default at the file path:

`$GOPATH/src/github.com/ava-labs/avalanchego/build/plugins/srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy`

To confirm that the Precompıle-EVM binary is compatible with AvalancheGo,
you can run the same version command
and confirm the RPCChainVM version matches:

```bash
$GOPATH/src/github.com/ava-labs/avalanchego/build/plugins/srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy --version
```

This should give similar output:

```bash
Precompile-EVM/v0.0.0 Subnet-EVM/v0.5.2 [AvalancheGo=v1.10.2, rpcchainvm=26]
```

</TabItem>
</Tabs>

<!-- vale on -->

If the RPCChainVM Protocol version printed out does not match the one used in AvalancheGo then Subnet-EVM
will not be able to talk to AvalancheGo and the blockchain will not start.
You can find the compatibility table
for AvalancheGo and Subnet-EVM [here](https://github.com/ava-labs/subnet-evm#avalanchego-compatibility).

The `build/plugins` directory will later be used as the `AVALANCHEGO_PLUGIN_PATH`.

#### Running Ginkgo Tests

To run ONLY the HelloWorld precompile test, run the command:

<!-- vale off -->

<Tabs groupId="evm-tabs">

<TabItem value="subnet-evm-tab" label="Subnet-EVM" default>

```bash
cd $GOPATH/src/github.com/ava-labs/subnet-evm
```

</TabItem>
<TabItem value="precompile-evm-tab" label="Precompile-EVM">

```bash
cd $GOPATH/src/github.com/ava-labs/precompile-evm
```

</TabItem>
</Tabs>

<!-- vale on -->

use `GINKGO_LABEL_FILTER` env var to filter the test:

```bash
GINKGO_LABEL_FILTER=HelloWorld ./scripts/run_ginkgo.sh
```

You will first see the node starting up in the `BeforeSuite` section of the precompile test:

```bash
$ GINKGO_LABEL_FILTER=HelloWorld ./scripts/run_ginkgo.sh
Using branch: hello-world-tutorial-walkthrough
building precompile.test
# github.com/ava-labs/subnet-evm/tests/precompile.test
ld: warning: could not create compact unwind for _blst_sha256_block_data_order: does not use RBP or RSP based frame

Compiled precompile.test
# github.com/ava-labs/subnet-evm/tests/load.test
ld: warning: could not create compact unwind for _blst_sha256_block_data_order: does not use RBP or RSP based frame

Compiled load.test
Running Suite: subnet-evm precompile ginkgo test suite - /Users/avalabs/go/src/github.com/ava-labs/subnet-evm
===================================================================================================================
Random Seed: 1674833631

Will run 1 of 7 specs
------------------------------
[BeforeSuite]
/Users/avalabs/go/src/github.com/ava-labs/subnet-evm/tests/precompile/precompile_test.go:31
  > Enter [BeforeSuite] TOP-LEVEL - /Users/avalabs/go/src/github.com/ava-labs/subnet-evm/tests/precompile/precompile_test.go:31 @ 01/27/23 10:33:51.001
INFO [01-27|10:33:51.002] Starting AvalancheGo node                wd=/Users/avalabs/go/src/github.com/ava-labs/subnet-evm
INFO [01-27|10:33:51.002] Executing                                cmd="./scripts/run.sh "
[streaming output] Using branch: hello-world-tutorial-walkthrough
...
[BeforeSuite] PASSED [15.002 seconds]
```

After the `BeforeSuite` completes successfully, it will skip all but the `HelloWorld` labeled
precompile test:

```bash
S [SKIPPED]
[Precompiles]
/Users/avalabs/go/src/github.com/ava-labs/subnet-evm/tests/precompile/solidity/suites.go:26
  contract native minter [Precompile, ContractNativeMinter]
  /Users/avalabs/go/src/github.com/ava-labs/subnet-evm/tests/precompile/solidity/suites.go:29
------------------------------
S [SKIPPED]
[Precompiles]
/Users/avalabs/go/src/github.com/ava-labs/subnet-evm/tests/precompile/solidity/suites.go:26
  tx allow list [Precompile, TxAllowList]
  /Users/avalabs/go/src/github.com/ava-labs/subnet-evm/tests/precompile/solidity/suites.go:36
------------------------------
...
Combined output:

Compiling 2 files with 0.8.0
Compilation finished successfully


  ExampleHelloWorldTest
    ✓ should gets default hello world (4057ms)
    ✓ should not set greeting before enabled (4067ms)
    ✓ should set and get greeting with enabled account (4074ms)



  3 passing (33s)


  < Exit [It] hello world - /Users/avalabs/go/src/github.com/ava-labs/subnet-evm/tests/precompile/solidity/suites.go:64 @ 01/27/23 10:34:17.484 (11.48s)
• [11.480 seconds]
------------------------------
```

Finally, you will see the load test being skipped as well:

```bash
Running Suite: subnet-evm small load simulator test suite - /Users/avalabs/go/src/github.com/ava-labs/subnet-evm
======================================================================================================================
Random Seed: 1674833658

Will run 0 of 1 specs
S [SKIPPED]
[Load Simulator]
/Users/avalabs/go/src/github.com/ava-labs/subnet-evm/tests/load/load_test.go:49
  basic subnet load test [load]
  /Users/avalabs/go/src/github.com/ava-labs/subnet-evm/tests/load/load_test.go:50
------------------------------

Ran 0 of 1 Specs in 0.000 seconds
SUCCESS! -- 0 Passed | 0 Failed | 0 Pending | 1 Skipped
PASS
```

Looks like the tests are passing!

:::note

If your tests failed, please retrace your steps. Most likely the error is that the precompile was
not enabled and some code is missing.
Try running `npm install` in the contracts directory to ensure that hardhat and other packages are installed.

You may also use the
[official tutorial implementation](https://github.com/ava-labs/subnet-evm/tree/helloworld-official-tutorial-v2)
to double-check your work as well.

:::

### Running a Local Network

We made it! Everything works in our Ginkgo tests, and now we want to spin up a local network
with the Hello World precompile activated.

Start the server in a terminal in a new tab using avalanche-network-runner. Please check out
[this link](/tooling/network-runner.md) for more information on Avalanche
Network Runner, how to download it, and how to use it. The server will be in "listening" mode
waiting for API calls.

We will start the server from the Subnet-EVM directory so that we can use a relative file path
to the genesis JSON file:

<!-- vale off -->

<Tabs groupId="evm-tabs">
<TabItem value="subnet-evm-tab" label="Subnet-EVM" default>

```bash
cd $GOPATH/src/github.com/ava-labs/subnet-evm
```

</TabItem>
<TabItem value="precompile-evm-tab" label="Precompile-EVM"  >

```bash
cd $GOPATH/src/github.com/ava-labs/precompile-evm
```

</TabItem>
</Tabs>

<!-- vale on -->

Then run ANR:

```bash
avalanche-network-runner server \
--log-level debug \
--port=":8080" \
--grpc-gateway-port=":8081"

```

Since we already compiled AvalancheGo and Subnet-EVM/Precompile-EVM in a previous step, we should have
the AvalancheGo and Subnet-EVM binaries ready to go.

We can now set the following paths. `AVALANCHEGO_EXEC_PATH` points to the latest AvalancheGo binary
we have just built. `AVALANCHEGO_PLUGIN_PATH` points to the plugins path which should have the
Subnet-EVM binary we have just built:

```bash
export AVALANCHEGO_EXEC_PATH="${GOPATH}/src/github.com/ava-labs/avalanchego/build/avalanchego"
export AVALANCHEGO_PLUGIN_PATH="${GOPATH}/src/github.com/ava-labs/avalanchego/build/plugins"
```

The following command will "issue requests" to the server we just spun up. We can use
avalanche-network-runner to spin up some nodes that run the latest version of Subnet-EVM:

```bash
  avalanche-network-runner control start \
  --log-level debug \
  --endpoint="0.0.0.0:8080" \
  --number-of-nodes=5 \
  --avalanchego-path ${AVALANCHEGO_EXEC_PATH} \
  --plugin-dir ${AVALANCHEGO_PLUGIN_PATH} \
  --blockchain-specs '[{"vm_name": "subnetevm", "genesis": "./tests/precompile/genesis/hello_world.json"}]'
```

We can look at the server terminal tab and see it booting up the local network.
If the network startup is successful then you should see something like this:

```bash
[blockchain RPC for "srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy"] "http://127.0.0.1:9650/ext/bc/2jDWMrF9yKK8gZfJaaaSfACKeMasiNgHmuZip5mWxUfhKaYoEU"
[blockchain RPC for "srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy"] "http://127.0.0.1:9652/ext/bc/2jDWMrF9yKK8gZfJaaaSfACKeMasiNgHmuZip5mWxUfhKaYoEU"
[blockchain RPC for "srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy"] "http://127.0.0.1:9654/ext/bc/2jDWMrF9yKK8gZfJaaaSfACKeMasiNgHmuZip5mWxUfhKaYoEU"
[blockchain RPC for "srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy"] "http://127.0.0.1:9656/ext/bc/2jDWMrF9yKK8gZfJaaaSfACKeMasiNgHmuZip5mWxUfhKaYoEU"
[blockchain RPC for "srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy"] "http://127.0.0.1:9658/ext/bc/2jDWMrF9yKK8gZfJaaaSfACKeMasiNgHmuZip5mWxUfhKaYoEU"
```

This shows the extension to the API server on AvalancheGo that's specific to the Subnet-EVM
Blockchain instance. To interact with it, you will want to append the `/rpc` extension, which
will supply the standard Ethereum API calls. For example, you can use the RPC URL:

`http://127.0.0.1:9650/ext/bc/2jDWMrF9yKK8gZfJaaaSfACKeMasiNgHmuZip5mWxUfhKaYoEU/rpc`

to connect to the blockchain through Core, MetaMask, HardHat, etc.

### Maintenance

You should always keep your fork up to date with the latest changes in the official Subnet-EVM repo.
If you have forked the Subnet-EVM repo, there could be conflicts and
you may need to manually resolve them.

If you used Precompile-EVM, you can update your repo by bumping Subnet-EVM versions in [`go.mod`](https://github.com/ava-labs/precompile-evm/blob/hello-world-example/go.mod#L7)
and [`version.sh`](https://github.com/ava-labs/precompile-evm/blob/hello-world-example/scripts/versions.sh#L4)

### Conclusion

We have now created a stateful precompile from scratch with the precompile generation tool. We hope
you had fun and learned a little more about the Subnet-EVM. Now that you have created a simple
stateful precompile, we urge you to create one of your own. If you have an idea for a stateful
precompile that may be useful to the community, feel free to create a fork of
[Subnet-EVM](https://github.com/ava-labs/subnet-evm) and create a pull request.
