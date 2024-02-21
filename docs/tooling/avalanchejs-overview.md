---
tags: [Tooling, AvalancheJS]
description: AvalancheJS is a JavaScript Library for interfacing with the Avalanche platform. It is built using TypeScript and intended to support both browser and Node.js. The AvalancheJS library allows one to issue commands to the Avalanche node APIs.
pagination_label: AvalancheJS
sidebar_label: AvalancheJS
sidebar_position: 0
---

# AvalancheJS Overview

AvalancheJS is a JavaScript Library for interfacing with the 
[Avalanche](/learn/avalanche/intro.md) Platform. 
It is built using TypeScript and intended to support both browser and Node.js. 
The AvalancheJS library allows you to issue commands to the Avalanche node APIs.

The APIs currently supported by default are:

- Admin API
- Auth API
- AVM API (X-Chain)
- EVM API (C-Chain)
- Health API
- Index API
- Info API
- Keystore API
- Metrics API
- PlatformVM API
- Socket API

We built AvalancheJS with ease of use in mind. With this library, any JavaScript
developer is able to interact with a node on the Avalanche Platform who has
enabled their API endpoints for the developer’s consumption. We keep the library
up-to-date with the latest changes in the Avalanche Platform Specification found
in the [Platform Chain Specification](/reference/avalanchego/p-chain/api.md), [Exchange Chain (X-Chain) Specification](/reference/avalanchego/x-chain/api.md), [Contract Chain (C-Chain) Specification](/reference/avalanchego/c-chain/api.md).

Using AvalancheJS, developers can:

- Retrieve balances on addresses
- Get UTXOs for addresses
- Build and sign transactions
- Issue signed transactions to the X-Chain, P-Chain, and C-Chain
- Perform cross-chain swaps between the X, P and C chains
- Add Validators and Delegators
- Create Subnets and Blockchains

## Requirements

AvalancheJS requires Node.js LTS version 20.11.1 or higher to compile.

## Installation

### Using the NPM Package

Add AvalancheJS to your project via `npm` or `yarn`.

For installing via `npm`:

`npm install --save @avalabs/avalanchejs`

For installing via `yarn`:

`yarn add @avalabs/avalanchejs`

:::caution

Please note that [this](https://www.npmjs.com/package/avalanche)
npm package is deprecated.
Make sure to always use
[@avalabs/avalanchejs](https://www.npmjs.com/package/@avalabs/avalanchejs)
instead.

:::

### Build from Repository

You can also pull the repo down directly and build it from scratch.

Clone the AvalancheJS repository:

`git clone https://github.com/ava-labs/avalanchejs.git`

Then build it:

`npm run build`

or

`yarn build`

This will generate double builds, one is CommonJS, the other one is ESM.
The "avalanchejs" file can then be dropped into any
project as a pure JavaScript implementation of Avalanche.
The "index.js" file can then be dropped into any project as 
a pure JavaScript implementation of Avalanche.
Depending on the project, the ESM or CommonJS file will
be used.

![avalanchejs1](/img/avalanchejs/avalanchejs-1.png)

![avalanchejs2](/img/avalanchejs/avalanchejs-2.png)

## Use AvalancheJS in Projects

The AvalancheJS library can be imported into your existing project as follows:

```ts
import { avm, pvm, evm } from '@avalabs/avalanchejs';
```

## Importing Essentials

```ts
import { avm /** X-chain */, pvm /** P-chain */, evm /** C-chain */, utils } from "@avalabs/avalanchejs"

// example calls
const exportTx = avm.newExportTx(...) // constructs a new export tx from X
const addValidatorTx = pvm.newAddPermissionlessValidatorTx(...) // constructs a new add validator tx on P
const importTx = evm.newImportTx(...) // constructs a new import tx to C

const publicKeyBytes = utils.hexToBuffer(publicKeyHex)
const signature = utils.signHash(bytes, privateKeyBytes)
```

## Run Scripts

When cloning the AvalancheJS repository, there are several handy
examples and utils. Because it is using ECMAScript Modules (ESM),
and not CommonJS, the following command needs to be ran:

`node --loader ts-node/esm path/script_name.ts`

This command tells Node.js to use the ts-node/esm 
loader when running a TypeScript script.

<details>
<summary> Example </summary>
<p>

Let's say that the AvalancheJS repository was cloned.  
Suppose we want to run `examples/p-chain/export.ts`.

This creates an export transaction from P-Chain to X-Chain.

First, make sure you add the environment variables in a
`.env` file at the root of the project. 

Fill in the private key for your account, 
and the P-Chain and X-Chain addresses.

![avalanchejs2](/img/avalanchejs/avalanchejs-3.png)

To execute the script, we use:

`node --loader ts-node/esm examples/c-chain/export.ts`

It ran successfully, providing the following output:

```zsh
laviniatalpas@Lavinias-MacBook-Pro avalanchejs % node --loader ts-node/esm examples/c-chain/export.ts 
(node:53180) ExperimentalWarning: `--experimental-loader` may be removed in the future; instead use `register()`:
--import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("ts-node/esm", pathToFileURL("./"));'
(Use `node --trace-warnings ...` to show where the warning was created)
{ txID: 'QKiNPBoLjAzbVwEoXsmx3XGWuMGZ2Nmt6e4CWvFC41iMEyu6P' }
```


</p>
</details>
