---
tags: [Build, Virtual Machines]
description: Generating Your Precompile
sidebar_label: Generating Your Precompile
pagination_label: Generating Your Precompile
sidebar_position: 2
---

# Generating Your Precompile

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In this section, we will go over the process for automatically generating the template code which
you can configure accordingly for your stateful precompile.

First, we must create the Solidity interface that we want our precompile to implement. This will be
the HelloWorld Interface. It will have two simple functions, `sayHello()` and `setGreeting()`. These
two functions will demonstrate the getting and setting respectively of a value stored in the
precompile's state space.

The `sayHello()` function is a `view` function, meaning it does not modify the state of the precompile
and returns a string result. The `setGreeting()` function is a state changer function, meaning it
modifies the state of the precompile. The `HelloWorld` interface inherits `IAllowList` interface
to use the allow list functionality.

For this tutorial, we will be working in a new branch in Subnet-EVM/Precompile-EVM repo.

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
You can install it by running `npm install`.
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
See the tutorial in <https://docs.avax.network/subnets/hello-world-precompile-tutorial> for more information about precompile development.
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
