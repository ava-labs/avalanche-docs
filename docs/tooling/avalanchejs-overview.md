---
tags: [Tooling, AvalancheJS]
description: AvalancheJS is a JavaScript Library for interfacing with the Avalanche platform. It is built using TypeScript and intended to support both browser and Node.js. The AvalancheJS library allows one to issue commands to the Avalanche node APIs.
pagination_label: AvalancheJS
sidebar_label: AvalancheJS
sidebar_position: 0
---

# AvalancheJS Overview

AvalancheJS is a JavaScript Library for interfacing with the
[Avalanche](/learn/avalanche/intro.md) platform. It is built using
TypeScript and intended to support both browser and Node.js. The AvalancheJS
library allows one to issue commands to the Avalanche node APIs.

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

- Locally manage private keys
- Retrieve balances on addresses
- Get UTXOs for addresses
- Build and sign transactions
- Issue signed transactions to the X-Chain, P-Chain and C-Chain on the Primary network
- Create a Subnetwork
- Swap AVAX and assets between the X-Chain, P-Chain and C-Chain
- Add a Validator to the Primary network
- Add a Delegator to the Primary network
- Administer a local node
- Retrieve Avalanche network information from a node

## Requirements

AvalancheJS requires Node.js version 14.18.0 or higher to compile.

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

This will generate a pure JavaScript library and place it in a folder named
"web" in the project root. The "avalanchejs" file can then be dropped into any
project as a pure JavaScript implementation of Avalanche.

![avalanchejs](/img/avalanchejs/avalanchejs-1.png)

## Use AvalancheJS in Projects

The AvalancheJS library can be imported into your existing Node.js project as follows:

```ts
const avalanche = require("avalanche");
```

Or into your TypeScript project like this:

```ts
import { Avalanche } from "avalanche";
```

## Importing Essentials

```ts
import { Avalanche, BinTools, Buffer, BN } from "avalanche";

let bintools = BinTools.getInstance();
```

The above lines import the libraries used in the tutorials. The libraries include:

- avalanche: Our JavaScript module.
- bn.js: A big number module use by AvalancheJS.
- buffer: A Buffer library.
- BinTools: A singleton built into AvalancheJS that is used for dealing with binary data.

## Run Scripts

### TypeScript File

**Via NPM**

Install typescript:

`npm install typescript`

Run the script:

`ts-node script-name.ts`

**Via YARN**

Install typescript:

`yarn add typescript`

Run the script:

`ts-node script-name.ts`

### JavaScript File

As Node.js is already installed per [requirements](/#Requirements),
simply run the script:

`node script-name.js`

### Example

Let's say that the AvalancheJS repository was cloned. There are a lot of
useful scripts in `Examples`. Suppose the one we want to run is AVM's
`getTx`, which has the path `examples/avm/getTX.ts`.

To execute the script, we use:

`ts-node examples/avm/getTx.ts`

It ran successfully, providing the following output:

```zsh
lavinia@Lavinias-MacBook-Pro avalanchejs % ts-node examples/avm/getTx.ts
{
  unsignedTx: {
    networkID: 1,
    blockchainID: '11111111111111111111111111111111LpoYY',
    outputs: [ [Object] ],
    inputs: [ [Object] ],
    memo: '0x',
    destinationChain: '2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM',
    exportedOutputs: [ [Object] ]
  },
  credentials: [ { signatures: [Array] } ],
  id: 'MTyhpMPU69qLPJL59dwfYbxpWNzp8bfsHyvy9B4DkzN2kWSQ5'
}
```
