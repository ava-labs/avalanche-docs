# Stateful Precompile Generation Tutorial

In this tutorial, we are going to walk through how we can generate a stateful precompile from scratch.
Before we start, let's brush up on what a precompile is, what a stateful precompile is, and why this
is extremely useful.

## Background

### Precompiled Contracts

Ethereum uses precompiles to efficiently implement cryptographic primitives within the EVM instead of
re-implementing the same primitives in Solidity. The following precompiles are currently included:
ecrecover, sha256, blake2f, ripemd-160, Bn256Add, Bn256Mul, Bn256Pairing, the identity function, and
modular exponentiation.

We can see these [precompile](https://github.com/ethereum/go-ethereum/blob/master/core/vm/contracts.go#L81)
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

A [precompile](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/core/vm/contracts.go#L53-L56)
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
[sha256 precompile](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/core/vm/contracts.go#L238-L252)
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

When a precompile is called, the EVM checks if the input address is a precompile address and if so it
executes the precompile. Otherwise it loads the smart contract at the input address and runs it on the
the EVM interpreter with the specified input data.

### Stateful Precompiled Contracts

A stateful precompile builds on a precompile in that it adds state access. Stateful precompiles are
not available in the default EVM, and are specific to Avalanche EVMs such as
[Coreth](https://github.com/ava-labs/coreth) and [Subnet-EVM](https://github.com/ava-labs/subnet-evm).

A stateful precompile follows this [interface](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contract.go#L64-L67):

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

The AllowList enables a precompile to enforce permissions on addresses. The AllowList is not a contract itself,
but a helper structure to provide a control mechanism for wrapping contracts.
It provides an `AllowListConfig` to the precompile so that it can take an initial configuration
from genesis/upgrade. It also provides 4 functions to set/read the permissions. In this tutorial, we
used `AllowList` to provide permission control to the `HelloWorld` precompile.
You can find more information about the AllowList interface [here](../subnets/customize-a-subnet.md#allowlist).

## Tutorial

### Overview

This is a brief overview of what this tutorial will cover.

- Write a Solidity interface
- Generate the precompile template
- Implement the precompile functions in Golang
- Write and run tests

Stateful precompiles are [alpha software](https://en.wikipedia.org/wiki/Software_release_life_cycle#Alpha).
Build at your own risk.

In this tutorial we used a branch based on SubnetEVM version `v0.4.9`. You can find the branch
[here](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/). The code in this
branch is the same as SubnetEVM version `v0.4.9` except for the `precompile/` directory. The
`precompile/` directory contains the code for the `HelloWorld` precompile. We will be using this
precompile as an example to learn how to write a stateful precompile. The code in this branch can become
outdated.
You should always use the latest version of SubnetEVM when you develop your own precompile.

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
- [Precompiles in Solidity](https://medium.com/@rbkhmrcr/precompiles-solidity-e5d29bd428c4)
- [Customizing the EVM with Stateful Precompiles](https://medium.com/avalancheavax/customizing-the-evm-with-stateful-precompiles-f44a34f39efd)

Please install the following before getting started.

First install the latest version of Go. Follow the instructions [here](https://go.dev/doc/install).
You can verify by running `go version`.

Set `$GOPATH` environment variable properly for Go to look for Go Workspaces. Please read
[this](https://go.dev/doc/gopath_code) for details. You can verify by running `echo $GOPATH`.

As a few things will be installed into `$GOPATH/bin`, please make sure that `$GOPATH/bin` is in your
`$PATH`, otherwise, you may get error running the commands below.

Download the following prerequisites into your `$GOPATH`:

- Git Clone the [Subnet-EVM](https://github.com/ava-labs/subnet-evm) repository
- Git Clone [AvalancheGo](https://github.com/ava-labs/avalanchego) repository
- Install [Avalanche Network Runner](https://docs.avax.network/subnets/network-runner)
- Install [solc](https://github.com/ethereum/solc-js#usage-on-the-command-line)
- Install [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)

For easy copy paste, use the below commands:

```shell
cd $GOPATH
mkdir -p src/github.com/ava-labs
cd src/github.com/ava-labs
git clone git@github.com:ava-labs/subnet-evm.git
git clone git@github.com:ava-labs/avalanchego.git
curl -sSfL https://raw.githubusercontent.com/ava-labs/avalanche-network-runner/main/scripts/install.sh | sh -s
npm install -g solc
npm install -g yarn
```

### Complete Code

You can inspect the [Hello World Precompile tutorial](https://github.com/ava-labs/hello-world-official-precompile-tutorial/pull/1)
for the complete code.

For a full-fledged example, you can also check out the [Reward Manager Precompile](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contracts/rewardmanager/)

### Step 0: Generating the Precompile

For the tutorial, we will be working in a new branch in Subnet-EVM:

```bash
cd $GOPATH/src/github.com/ava-labs/subnet-evm
git checkout -b hello-world-stateful-precompile
```

We will start off in this directory `./contract-examples/contracts`:

```bash
cd contract-examples/contracts
```

First we must create the Solidity interface that we want our precompile to implement. This will be
the HelloWorld Interface. It will have two simple functions, `sayHello()` and `setGreeting()`. These
two functions will demonstrate the getting and setting respectively of a value stored in the
precompile's state space.

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

This interface defines 2 functions, `sayHello()` and `setGreeting()`. The `sayHello()` function
is a `view` function, meaning it does not modify the state of the precompile and returns a string result.
The `setGreeting()` function is a state changer function, meaning it modifies the state of the precompile.

`IAllowList` is an interface that we will use to restrict access to the precompile. It is defined in
`./contract-examples/contracts/IAllowList.sol`:

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

Now we have an interface that our precompile can implement!
Let's create an [ABI](https://docs.soliditylang.org/en/v0.8.13/abi-spec.html#contract-abi-specification)
of our Solidity interface.

In the same `./contract-examples/contracts` directory, let's run

```shell
solcjs --abi IHelloWorld.sol && mv IHelloWorld_sol_IHelloWorld.abi IHelloWorld.abi
```

This generates the ABI code and moves it to `./contract-examples/contracts` as `IHelloWorld.abi`:

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

Let's go back to the root of the Subnet-EVM repository and run the PrecompileGen script helper:

<!-- markdownlint-disable MD013 -->

```bash
$ cd $GOPATH/src/github.com/ava-labs/subnet-evm

$ ./scripts/generate_precompile.sh --help

Using branch: precompile-tutorial
NAME:
   precompilegen - subnet-evm precompile generator tool

USAGE:
   main [global options] command [command options] [arguments...]

VERSION:
   1.10.26-stable

COMMANDS:
   help, h  Shows a list of commands or help for one command

GLOBAL OPTIONS:

    --abi value
          Path to the contract ABI json to generate, - for STDIN

    --out value
          Output folder for the generated precompile files, - for STDOUT (default =
          ./precompile/contracts/{pkg})

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

Precompile contracts reside under the [`./precompile/contracts`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contracts) directory. Let's generate our precompile
template in the `./precompile/contracts/helloworld` directory, where `helloworld` is the name of the
Go package we want to generate the precompile into.

```bash
./scripts/generate_precompile.sh --abi ./abis/IHelloWorld.abi --type HelloWorld --pkg helloworld
```

<!-- markdownlint-enable MD013 -->

This generates a precompile template files `contract.go`, `contract.abi`, `config.go` and `module.go`
located at [`./precompile/contracts/helloworld`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contracts/helloworld)
directory. In those files there is a comment block that explains general guidelines for precompile
development.

In `./precompile/helloworld`, directory search `CUSTOM CODE STARTS HERE` to find places where
we can/should modify the precompile.

Let's fill out the rest!

<!-- markdownlint-disable MD013 -->

```go
/* General guidelines for precompile development:
1- Set a suitable config key in generated module.go. E.g: "yourPrecompileConfig"
2- Read the comment and set a suitable contract address in generated module.go. E.g:
	ContractAddress = common.HexToAddress("ASUITABLEHEXADDRESS")
3- It is recommended to only modify code in the highlighted areas marked with "CUSTOM CODE STARTS HERE". Typically, custom codes are required in only those areas.
Modifying code outside of these areas should be done with caution and with a deep understanding of how these changes may impact the EVM.
4- Set gas costs in generated contract.go
5- Force import your precompile package in precompile/registry/registry.go
6- Add your config unit tests under generated package config_test.go
7- Add your contract unit tests undertgenerated package contract_test.go
8- Additionally you can add a full-fledged VM test for your precompile under plugin/vm/vm_test.go. See existing precompile tests for examples.
9- Add your solidity interface and test contract to contract-examples/contracts
10- Write solidity tests for your precompile in contract-examples/test
11- Create your genesis with your precompile enabled in tests/e2e/genesis/
12- Create e2e test for your solidity test in tests/e2e/solidity/suites.go
13- Run your e2e precompile Solidity tests with 'E2E=true ./scripts/run.sh
*/
```

<!-- markdownlint-enable MD013 -->

### Step 1: Set Config Key

Let's jump to `helloworld/module.go` file first. This file contains the module definition for our
precompile. We can see the `ConfigKey` is set to some default value of `helloWorldConfig`.
This key should be unique to the precompile.
This config key determines which JSON key to use when reading the precompile's config from the
JSON upgrade/genesis file. In this case, the config key is `helloWorldConfig` and JSON config
should look like:

```json
{
  "helloWorldConfig": {
    "blockTimestamp": 0
		...
  }
}
```

### Step 2: Set Contract Address

We can see the `ContractAddress` is set to some default value.
You should change that default value to a suitable address for your precompile.
The address should be unique to the precompile. There is a registry of precompile addresses
under [`precompile/registry/registry.go`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/registry/registry.go).
A list of addresses is specified in comments under this file.
Modify the default value to be the next user available stateful precompile address. For forks of
Subnet-EVM, users should start at `0x0300000000000000000000000000000000000000` to ensure
that their own modifications do not conflict with stateful precompiles that may be added to
Subnet-EVM in the future. You should pick an address that is not already taken,
and write it down in `registry.go` as a comment for future reference.

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

Don't forget to update the actual variable `ContractAddress` in [`module.go`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contracts/helloworld/module.go#L49)
to the address you chose. It should look like:

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
precompile package that we need to modify. We should start with the reference imports code block.

#### Step 3.1: Module File

Module file contains fundamental information about the precompile. This includes the key for the
precompile, the address of the precompile and a configurator. This file is located at
[`./precompile/helloworld/module.go`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contracts/helloworld/module.go)

It defines the module for the precompile. The module is used to register the precompile to the
precompile registry. The precompile registry is used to read configs and enable the precompile.
Registration is done in `init()` function of the module file. `NewConfig()` is used to create a
new instance for the precompile config. This will be used in custom Unmarshal/Marshal logic.
You don't need to override these functions.

##### Configure()

Module file contains a `configurator` which implements `contract.Configurator` interface. This interface
contains a `Configure()` function which is used to configure the precompile and set the initial
state of the precompile. This function is called when the precompile is enabled. This typically used
to read from given config in upgrade/genesis JSON and set the initial state of the
precompile accordingly. This function also calls `AllowListConfig.Configure()` to invoke AllowList
configuration as the last step. You should keep it as it is if you want to use AllowList.
You can modify this function for your custom logic. You can circle back to this function later
after you have finalized implementation of the precompile config.

#### Step 3.2: Config File

Config file contains the config for the precompile. This file is located at
[`/precompile/helloworld/config.go`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contracts/helloworld/config.go).
This file contains `Config` struct which implements `precompileconfig.Config` interface.
It has some embedded structs like `precompileconfig.Upgrade`. `Upgrade` is used to enable
upgrades for the precompile. It contains the `BlockTimestamp` and `Disable` to enable/disable
upgrades. `BlockTimestamp` is the timestamp of the block when the upgrade will be activated.
`Disable` is used to disable the upgrade. If you use `AllowList` for the precompile, there is also
`allowlist.AllowListConfig` embedded in the `Config` struct. `AllowListConfig` is used specify initial
roles for specified addresses. If you have any custom fields in your precompile config, you can add them
here. These custom fields will be read from upgrade/genesis JSON and set in the precompile config.

```go
// Config implements the StatefulPrecompileConfig
// interface while adding in the HelloWorld specific precompile address.
type Config struct {
	allowlist.AllowListConfig
	precompileconfig.Upgrade
}
```

##### Verify()

`Verify()` is called on startup and an error is treated as fatal. Generated code contains a call
to `AllowListConfig.Verify()` to verify the `AllowListConfig`. You can leave that as is, and start
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

Next we see is `Equal()`. This function determines if two precompile configs are equal. This is used
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
`StateDB` allows us to store a key-value mapping of 32 byte hashes. The below code snippet can be
copied and pasted to overwrite the default `Configure()` code.

```go
const defaultGreeting = "Hello World!"

// Configure configures [state] with the given [cfg] precompileconfig.
// This function is called by the EVM once per precompile contract activation.
// You can use this function to set up your precompile contract's initial state,
// by using the [cfg] config and [state] stateDB.
	// Configure configures [state] with the initial configuration.
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

Contract file contains the functions of the precompile contract that will be called by the EVM. The
file is located at [`./precompile/helloworld/contract.go`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contracts/helloworld/contract.go).
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

There is also auto generated Packers and Unpackers for the ABI. These will be used in `sayHello` and
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
byte array. The `Unpacker` function converts this input to a more easy to use format so that we can
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

Next place to modify is in our `sayHello()` function. In a previous step we created the `IHelloWorld.sol`
interface with two functions `sayHello()` and `setGreeting()`. We finally get to implement them here.
If any contract calls these functions from the interface, the below function gets executed. This function
is a simple getter function. In `Configure()` we set up a mapping with the key as `storageKey` and
the value as `Hello World!` In this function, we will be returning whatever value is at `storageKey`.
The below code snippet can be copied and pasted to overwrite the default `sayHello` code.

First we add a helper function to get the greeting value from the stateDB, this will be helpful
when we test our contract.

```go
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
	if remainingGas, err = contract.deductGas(suppliedGas, SayHelloGasCost); err != nil {
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

The below code snippet can be copied and pasted to overwrite the default `sayGreeting()` code.

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

In [`precompile/contract/utils.go`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contract/utils.go#L19-L20)
we have `WriteGasCostPerSlot` and `ReadGasCostPerSlot`.

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
twice then the gas cost for that function would be `40_000`.

On top of these gas costs, we also have to account for the gas costs of AllowList gas costs. These
are the gas costs of reading and writing permissions for addresses in AllowList. These are defined
under [`precompile/allowlist/allowlist.go`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/allowlist/allowlist.go#L28-L29).
By default these are added to the default gas costs to the state-change functions (SetGreeting)
of the precompile. Meaning that these functions will cost an additional `ReadAllowListGasCost` in order
to read permissions from the storage. If you don't plan to read permissions from the storage then
you can omit these.

Now going back to `/precompile/helloworld/contract.go`, we can modify our precompile function gas costs.
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

We should register our precompile in [`/precompile/registry.go`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/registry/registry.go)
to be discovered by other packages.
Our `Module` file contains an `init()` function that registers our precompile.
`init()` is called when the package is imported.
We should register our precompile in a common package so
that it can be imported by other packages.

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

### Step 6: Add Config Tests

Let's add some unit tests to make sure our precompile is configured correctly. Config tests will
be under `/precompile/contracts/helloworld/config_test.go`. There are mainly 2 functions we need
to test: `Verify` and `Equal`. `Verify` checks if the precompile is configured correctly. `Equal`
checks if the precompile is equal to another precompile. You can check other `config_test.go` files
in the `/precompile/contracts` directory for examples. For the `HelloWorld` precompile, you can
check the code in [here](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contracts/helloworld/config_test.go)

### Step 6: Add Contract Tests

We also need to add some contract tests to make sure our precompile is working correctly. Contract
tests will be under `/precompile/contracts/helloworld/contract_test.go` [here](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contracts/helloworld/contract_test.go).
The test will cover all functionality of `sayHello()` and `setGreeting()`.
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
This test uses a AllowList helper function
`allowlist.RunPrecompileWithAllowListTests(t, Module, state.NewTestStateDB, tests)`
which can run all specified tests plus AllowList test suites. If you don't plan to use AllowList,
you can directly run as follows:

```go
	for name, test := range tests {
		t.Run(name, func(t *testing.T) {
			test.Run(t, module, newStateDB(t))
		})
	}
```

You can check other `contract_test.go` files in the `/precompile/contracts`.

### Step 7: Add Test Contract

Let's add our test contract to `./contract-examples/contracts`. This smart contract lets us interact
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
  address constant HELLO_WORLD_ADDRESS = 0x0300000000000000000000000000000000000000;
  IHelloWorld helloWorld = IHelloWorld(HELLO_WORLD_ADDRESS);

  function getHello() public view returns (string memory) {
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

### Step 7: Building AvalancheGo and Subnet-EVM

Before we start testing, we will need to build the AvalancheGo binary and the custom Subnet-EVM binary.

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

Once we've built AvalancheGo, we can navigate back to the Subnet-EVM repo and build the Subnet-EVM binary:

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

This should give the output:

```bash
Subnet-EVM/v0.4.9@a584fcad593885b6c095f42adaff6b53d51aedb8 [AvalancheGo=v1.9.7, rpcchainvm=22]
```

If the RPCChainVM Protocol version printed out does not match the one used in AvalancheGo then Subnet-EVM
will not be able to talk to AvalancheGo and the blockchain will not start.

The `build/plugins` directory will later be used as the `AVALANCHEGO_PLUGIN_PATH`.

### Step 8: Add Precompile Solidity Tests

#### Step 8.1: Add Hardhat Test

We can now write our hardhat test in `./contract-examples/test`. The below code snippet can be
copied and pasted into a new file called `hello_world.ts` [here](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/contract-examples/tests/hello_world.ts):

```ts
// (c) 2019-2022, Ava Labs, Inc. All rights reserved.
// See the file LICENSE for licensing terms.

import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract, ContractFactory } from "ethers";

// make sure this is always an admin for the precompile
const adminAddress: string = "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC";
const HELLO_WORLD_ADDRESS = "0x0300000000000000000000000000000000000000";

describe("ExampleHelloWorld", function () {
  let helloWorldContract: Contract;
  let adminSigner: SignerWithAddress;
  let adminSignerPrecompile: Contract;

  before(async function () {
    // Deploy Hello World Contract
    const ContractF: ContractFactory = await ethers.getContractFactory(
      "ExampleHelloWorld"
    );
    helloWorldContract = await ContractF.deploy();
    await helloWorldContract.deployed();
    const helloWorldContractAddress: string = helloWorldContract.address;
    console.log(`Contract deployed to: ${helloWorldContractAddress}`);

    adminSigner = await ethers.getSigner(adminAddress);
    adminSignerPrecompile = await ethers.getContractAt(
      "IHelloWorld",
      HELLO_WORLD_ADDRESS,
      adminSigner
    );
  });

  it("should getHello properly", async function () {
    let result = await helloWorldContract.callStatic.getHello();
    expect(result).to.equal("Hello World!");
  });

  it("contract should not be able to set greeting without enabled", async function () {
    const modifiedGreeting = "What's up";
    let contractRole = await adminSignerPrecompile.readAllowList(
      helloWorldContract.address
    );
    expect(contractRole).to.be.equal(0); // 0 = NONE
    try {
      let tx = await helloWorldContract.setGreeting(modifiedGreeting);
      await tx.wait();
    } catch (err) {
      return;
    }
    expect.fail("should have errored");
  });

  it("should be add contract to enabled list", async function () {
    let contractRole = await adminSignerPrecompile.readAllowList(
      helloWorldContract.address
    );
    expect(contractRole).to.be.equal(0);

    let enableTx = await adminSignerPrecompile.setEnabled(
      helloWorldContract.address
    );
    await enableTx.wait();
    contractRole = await adminSignerPrecompile.readAllowList(
      helloWorldContract.address
    );
    expect(contractRole).to.be.equal(1); // 1 = ENABLED
  });

  it("should setGreeting and getHello", async function () {
    const modifiedGreeting = "What's up";
    let tx = await helloWorldContract.setGreeting(modifiedGreeting);
    await tx.wait();

    expect(await helloWorldContract.callStatic.getHello()).to.be.equal(
      modifiedGreeting
    );
  });
});
```

#### Step 8.2: Add Genesis

To run our HardHat test, we will need to create a Subnet that has the `Hello World` precompile activated,
so we will copy and paste the below genesis file into: `./tests/precompile/genesis/hello_world.json`.

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
    "subnetEVMTimestamp": 0,
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

#### Step 8.3: Declaring the HardHat E2E Test

Now that we have declared the HardHat test and corresponding `genesis.json` file. The last step to running
the e2e test is to declare the new test in `./tests/precompile/solidity/suites.go`.

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
			// and the test file in ./contract-examples/tests/{your_precompile}.ts
			utils.ExecuteHardHatTestOnNewBlockchain(ctx, "your_precompile")
		})
	*/
```

You should copy and paste the ginkgo `It` node and update from `{your_precompile}` to `hello_world`.
The string passed in to `utils.ExecuteHardHatTestsOnNewBlockchain(ctx, "your_precompile")` will be used
to find both the HardHat test file to execute and the genesis file, which is why you need to use the
same name for both.

After modifying the `It` node, it should look like the following (you can copy and paste this
directly if you prefer):

```go
	ginkgo.It("hello world", ginkgo.Label("Precompile"), ginkgo.Label("HelloWorld"), func() {
		ctx, cancel := context.WithTimeout(context.Background(), time.Minute)
		defer cancel()

		utils.ExecuteHardHatTestOnNewBlockchain(ctx, "hello_world")
	})
```

Now that we've set up the new ginkgo test, we can run the ginkgo test that we want by using the
`GINKGO_LABEL_FILTER`. This enviroment variable is passed as a flag to ginkgo in
`./scripts/run_ginkgo.sh` and restricts what tests will run to only the tests with a matching label.

To run ONLY the HelloWorld precompile test, run the command:

```bash
cd $GOPATH/src/github.com/ava-labs/subnet-evm
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
[streaming output] Creating data directory: /tmp/subnet-evm-start-node/2023-01-27:10:33:51/node1
[streaming output] Executing command: /Users/avalabs/go/src/github.com/ava-labs/avalanchego/build/avalanchego --data-dir=/tmp/subnet-evm-start-node/2023-01-27:10:33:51/node1 --config-file=/tmp/subnet-evm-start-node/2023-01-27:10:33:51/node1/config.json
[streaming output] [01-27|10:33:56.962] WARN process/process.go:92 UPnP or NAT-PMP router attach failed, you may not be listening publicly. Please confirm the settings in your router
[streaming output] [01-27|10:33:56.965] INFO leveldb/db.go:203 creating leveldb {"config": {"blockCacheCapacity":12582912,"blockSize":0,"compactionExpandLimitFactor":0,"compactionGPOverlapsFactor":0,"compactionL0Trigger":0,"compactionSourceLimitFactor":0,"compactionTableSize":0,"compactionTableSizeMultiplier":0,"compactionTableSizeMultiplierPerLevel":null,"compactionTotalSize":0,"compactionTotalSizeMultiplier":0,"disableSeeksCompaction":true,"openFilesCacheCapacity":1024,"writeBuffer":6291456,"filterBitsPerKey":10,"maxManifestFileSize":9223372036854775807,"metricUpdateFrequency":10000000000}}
[streaming output] [01-27|10:33:57.061] INFO node/node.go:224 initializing networking {"currentNodeIP": "10.56.134.240:9651"}
[streaming output] [01-27|10:33:57.066] INFO server/server.go:309 adding route {"url": "/ext/vm/mgj786NP7uDwBCcq6YwThhaN8FLyybkCa4zBWTQbNgmK6k9A6", "endpoint": "/rpc"}
[streaming output] [01-27|10:33:57.782] INFO <P Chain> platformvm/vm.go:228 initializing last accepted {"blkID": "2cC67R6vPRSX4BCAY3ouAk9JKCCpAxjFxRVUQWfnEQF1BjQhqX"}
[streaming output] INFO [01-27|10:33:57.792] <C Chain> github.com/ava-labs/coreth/core/state/snapshot/wipe.go:133: Deleted state snapshot leftovers kind=accounts wiped=0 elapsed="26.846µs"
[streaming output] [01-27|10:33:57.801] INFO server/server.go:270 adding route {"url": "/ext/bc/2CA6j5zYzasynPsFeNoqWkmTCt3VScMvXUZHbfDJ8k3oGzAPtU", "endpoint": "/ws"}
[streaming output] [01-27|10:33:57.806] INFO <P Chain> snowman/transitive.go:444 consensus starting {"lastAcceptedBlock": "2cC67R6vPRSX4BCAY3ouAk9JKCCpAxjFxRVUQWfnEQF1BjQhqX"}
[streaming output] [01-27|10:34:01.004] WARN health/health.go:85 failing readiness check {"reason": {"bootstrapped":{"error":"not yet run","timestamp":"0001-01-01T00:00:00Z","duration":0}}}
INFO [01-27|10:34:06.003] AvalancheGo node is healthy
  < Exit [BeforeSuite] TOP-LEVEL - /Users/avalabs/go/src/github.com/ava-labs/subnet-evm/tests/precompile/precompile_test.go:31 @ 01/27/23 10:34:06.003 (15.002s)
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
S [SKIPPED]
[Precompiles]
/Users/avalabs/go/src/github.com/ava-labs/subnet-evm/tests/precompile/solidity/suites.go:26
  contract deployer allow list [Precompile, ContractDeployerAllowList]
  /Users/avalabs/go/src/github.com/ava-labs/subnet-evm/tests/precompile/solidity/suites.go:43
------------------------------
S [SKIPPED]
[Precompiles]
/Users/avalabs/go/src/github.com/ava-labs/subnet-evm/tests/precompile/solidity/suites.go:26
  fee manager [Precompile, FeeManager]
  /Users/avalabs/go/src/github.com/ava-labs/subnet-evm/tests/precompile/solidity/suites.go:50
------------------------------
S [SKIPPED]
[Precompiles]
/Users/avalabs/go/src/github.com/ava-labs/subnet-evm/tests/precompile/solidity/suites.go:26
  reward manager [Precompile, RewardManager]
  /Users/avalabs/go/src/github.com/ava-labs/subnet-evm/tests/precompile/solidity/suites.go:57
------------------------------
[Precompiles]
/Users/avalabs/go/src/github.com/ava-labs/subnet-evm/tests/precompile/solidity/suites.go:26
  hello world [Precompile, HelloWorld]
  /Users/avalabs/go/src/github.com/ava-labs/subnet-evm/tests/precompile/solidity/suites.go:64
  > Enter [It] hello world - /Users/avalabs/go/src/github.com/ava-labs/subnet-evm/tests/precompile/solidity/suites.go:64 @ 01/27/23 10:34:06.004
INFO [01-27|10:34:06.004] Executing HardHat tests on a new blockchain test=hello_world
INFO [01-27|10:34:06.028] Reading genesis file                     filePath=./tests/precompile/genesis/hello_world.json wd=/Users/avalabs/go/src/github.com/ava-labs/subnet-evm
INFO [01-27|10:34:06.029] Creating new subnet
[streaming output] [01-27|10:34:06.059] INFO <P Chain> proposervm/pre_fork_block.go:223 built block {"blkID": "vByWDipDCUSwfKogQyZSBzHpfAAd3wsaLyzeZ7NkZ7HUefVbs", "innerBlkID": "2HQHayX2WwvNDoTQtVhTf4ZpaHs1Sm448wUh4DZMSDwfH7smKR", "height": 1, "parentTimestamp": "[08-15|00:00:00.000]", "blockTimestamp": "[01-27|10:34:06.000]"}
INFO [01-27|10:34:06.158] Creating new Subnet-EVM blockchain       genesis="&{Config:{ChainID: 99999 Homestead: 0 EIP150: 0 EIP155: 0 EIP158: 0 Byzantium: 0 Constantinople: 0 Petersburg: 0 Istanbul: 0, Muir Glacier: 0, Subnet EVM: 0, FeeConfig: {\"gasLimit\":20000000,\"targetBlockRate\":2,\"minBaseFee\":1000000000,\"targetGas\":100000000,\"baseFeeChangeDenominator\":48,\"minBlockGasCost\":0,\"maxBlockGasCost\":10000000,\"blockGasCostStep\":500000}, AllowFeeRecipients: false, NetworkUpgrades: {\"subnetEVMTimestamp\":0}, PrecompileUpgrade: {\"helloWorldConfig\":{\"blockTimestamp\":0}}, UpgradeConfig: {}, Engine: Dummy Consensus Engine} Nonce:0 Timestamp:0 ExtraData:[0] GasLimit:20000000 Difficulty:+0 Mixhash:0x0000000000000000000000000000000000000000000000000000000000000000 Coinbase:0x0000000000000000000000000000000000000000 Alloc:map[0x0Fa8EA536Be85F32724D57A37758761B86416123:{Code:[] Storage:map[] Balance:+100000000000000000000000000 Nonce:0 PrivateKey:[]} 0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC:{Code:[] Storage:map[] Balance:+100000000000000000000000000 Nonce:0 PrivateKey:[]}] AirdropHash:0x0000000000000000000000000000000000000000000000000000000000000000 AirdropAmount:<nil> AirdropData:[] Number:0 GasUsed:0 ParentHash:0x0000000000000000000000000000000000000000000000000000000000000000 BaseFee:<nil>}"
[streaming output] [01-27|10:34:07.017] INFO chains/manager.go:300 creating chain {"subnetID": "29uVeLPJB1eQJkzRemU8g8wZDw5uJRqpab5U2mX9euieVwiEbL", "chainID": "R537oVXfcfYtdUCSTHnr1DiBJCEtJEuDfRUehnG1LHBgxusTC", "vmID": "srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy"}
[streaming output] INFO [01-27|10:34:07.112] <R537oVXfcfYtdUCSTHnr1DiBJCEtJEuDfRUehnG1LHBgxusTC Chain> github.com/ava-labs/subnet-evm/plugin/evm/vm.go:261: Initializing Subnet EVM VM Version=v0.4.9@a657d3bb5ee647d4a01b8f35e9134a1f01ba5f38 Config="{AirdropFile: SnowmanAPIEnabled:false AdminAPIEnabled:false AdminAPIDir: EnabledEthAPIs:[eth eth-filter net web3 internal-eth internal-blockchain internal-transaction] ContinuousProfilerDir: ContinuousProfilerFrequency:15m0s ContinuousProfilerMaxFiles:5 RPCGasCap:50000000 RPCTxFeeCap:100 TrieCleanCache:512 TrieCleanJournal: TrieCleanRejournal:0s TrieDirtyCache:256 TrieDirtyCommitTarget:20 SnapshotCache:256 Preimages:false SnapshotAsync:true SnapshotVerify:false Pruning:true AcceptorQueueLimit:64 CommitInterval:4096 AllowMissingTries:false PopulateMissingTries:<nil> PopulateMissingTriesParallelism:1024 MetricsExpensiveEnabled:true LocalTxsEnabled:false TxPoolJournal:transactions.rlp TxPoolRejournal:1h0m0s TxPoolPriceLimit:1 TxPoolPriceBump:10 TxPoolAccountSlots:16 TxPoolGlobalSlots:5120 TxPoolAccountQueue:64 TxPoolGlobalQueue:1024 APIMaxDuration:0s WSCPURefillRate:0s WSCPUMaxStored:0s MaxBlocksPerRequest:0 AllowUnfinalizedQueries:false AllowUnprotectedTxs:false AllowUnprotectedTxHashes:[0xfefb2da535e927b85fe68eb81cb2e4a5827c905f78381a01ef2322aa9b0aee8e] KeystoreDirectory: KeystoreExternalSigner: KeystoreInsecureUnlockAllowed:false RemoteGossipOnlyEnabled:false RegossipFrequency:1m0s RegossipMaxTxs:16 RegossipTxsPerAddress:1 PriorityRegossipFrequency:1s PriorityRegossipMaxTxs:32 PriorityRegossipTxsPerAddress:16 PriorityRegossipAddresses:[] LogLevel:info LogJSONFormat:false FeeRecipient: OfflinePruning:false OfflinePruningBloomFilterSize:512 OfflinePruningDataDirectory: MaxOutboundActiveRequests:16 MaxOutboundActiveCrossChainRequests:64 InspectDatabase:false StateSyncEnabled:false StateSyncSkipResume:false StateSyncServerTrieCache:64 StateSyncIDs: StateSyncCommitInterval:16384 StateSyncMinBlocks:300000 SkipUpgradeCheck:false SkipSubnetEVMUpgradeCheck:false AcceptedCacheSize:32 TxLookupLimit:0}"
[streaming output] INFO [01-27|10:34:07.122] <R537oVXfcfYtdUCSTHnr1DiBJCEtJEuDfRUehnG1LHBgxusTC Chain> github.com/ava-labs/subnet-evm/core/state/snapshot/snapshot.go:773: Rebuilding state snapshot
[streaming output] [01-27|10:34:07.131] INFO <R537oVXfcfYtdUCSTHnr1DiBJCEtJEuDfRUehnG1LHBgxusTC Chain> bootstrap/bootstrapper.go:122 starting bootstrapper
[streaming output] [01-27|10:34:07.134] INFO <R537oVXfcfYtdUCSTHnr1DiBJCEtJEuDfRUehnG1LHBgxusTC Chain> snowman/transitive.go:444 consensus starting {"lastAcceptedBlock": "HkbbSAwXRE7CacDWMNdZjURbFCCUwL3TSeXLRVEK8L3SVD9Su"}
INFO [01-27|10:34:09.064] Created subnet successfully              ChainURI=http://127.0.0.1:9650/ext/bc/R537oVXfcfYtdUCSTHnr1DiBJCEtJEuDfRUehnG1LHBgxusTC/rpc
INFO [01-27|10:34:09.064] Sleeping to wait for test ping           rpcURI=http://127.0.0.1:9650/ext/bc/R537oVXfcfYtdUCSTHnr1DiBJCEtJEuDfRUehnG1LHBgxusTC/rpc
INFO [01-27|10:34:09.072] Running hardhat command                  cmd="/usr/local/bin/npx hardhat test ./test/hello_world.ts --network local"
[streaming output] [01-27|10:34:13.311] INFO <R537oVXfcfYtdUCSTHnr1DiBJCEtJEuDfRUehnG1LHBgxusTC Chain> proposervm/pre_fork_block.go:172 built block {"blkID": "2eD6Ntat4wmR1FfQBDqqS8NKbYTdrVyARSpTKr21Fbjr6DHEnx", "height": 1, "parentTimestamp": "[01-01|00:00:00.000]"}
[streaming output] INFO [01-27|10:34:13.410] <R537oVXfcfYtdUCSTHnr1DiBJCEtJEuDfRUehnG1LHBgxusTC Chain> github.com/ava-labs/subnet-evm/internal/ethapi/api.go:1819: Submitted transaction hash=0x22bbad5e1bd0882fa5b2ae3df70923f4803e9dd2454f48af92358f441f94add5 from=0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC nonce=1 recipient=0x52C84043CD9c865236f11d9Fc9F56aa003c1f922 value=0 type=0 gasFeeCap=1,000,000,000 gasTipCap=1,000,000,000 gasPrice=1,000,000,000
[streaming output] [01-27|10:34:15.425] INFO <R537oVXfcfYtdUCSTHnr1DiBJCEtJEuDfRUehnG1LHBgxusTC Chain> proposervm/pre_fork_block.go:223 built block {"blkID": "2p4JTKpZz98vM4FGtxDM1ch97EJGmK54ozBim5MJkFpWxbMxeH", "innerBlkID": "s6jcHhZCrPiBjxhisZEY9NHPnX1ZZ2WRiy1WP3g64ZuayBiuL", "height": 2, "parentTimestamp": "[01-27|15:34:13.000]", "blockTimestamp": "[01-27|10:34:15.000]"}

Combined output:

Compiling 2 files with 0.8.0
Compilation finished successfully


  ExampleHelloWorld
Contract deployed to: 0x52C84043CD9c865236f11d9Fc9F56aa003c1f922
  	✓ should getHello properly
    ✓ contract should not be able to set greeting without enabled
    ✓ should be add contract to enabled list (4071ms)
    ✓ should setGreeting and getHello (4049ms)


  2 passing (4s)


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

If your tests failed, please retrace your steps. Most likely the error is that the precompile was
not enabled and some code is missing. Please also use the
[official tutorial implementation](https://github.com/ava-labs/subnet-evm/tree/hello-world-tutorial-walkthrough)
to double check your work as well.

### Step 9: Running a Local Network

We made it! Everything works in our ginkgo tests, and now we want to spin up a local network
with the Hello World precompile activated.

Start the server in a terminal in a new tab using avalanche-network-runner. Please check out
[this link](./network-runner.md) for more information on Avalanche
Network Runner, how to download it, and how to use it. The server will be on "listening" mode
waiting for API calls.

We will start the server from the Subnet-EVM directory, so that we can use a relative file path
to the genesis json file:

```bash
cd $GOPATH/src/github.com/ava-labs/subnet-evm
avalanche-network-runner server \
--log-level debug \
--port=":8080" \
--grpc-gateway-port=":8081"
```

Since we already compiled AvalancheGo and Subnet-EVM in a previous step, we should have the
AvalancheGo and Subnet-EVM binaries ready to go.

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

to connect to the blockchain through MetaMask, HardHat, etc.

### Conclusion

We have now created a stateful precompile from scratch with the precompile generation tool. We hope
you had fun and learned a little more about the Subnet-EVM. Now that you have created a simple
stateful precompile, we urge you to create one of your own. If you have an idea for a stateful
precompile that may be useful to the community, feel free to create a fork of
[Subnet-EVM](https://github.com/ava-labs/subnet-evm) and create a pull request.
