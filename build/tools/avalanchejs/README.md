# AvalancheJS

AvalancheJS is a JavaScript Library for interfacing with the [Avalanche](../../../#avalanche) platform. It is built using TypeScript and intended to support both browser and Node.js. The AvalancheJS library allows one to issue commands to the Avalanche node APIs.

The APIs currently supported by default are:

* Admin API
* Auth API
* AVM API \(X-Chain\)
* EVM API \(C-Chain)
* Health API
* Info API
* Keystore API
* Metrics API
* PlatformVM API

We built AvalancheJS with ease of use in mind. With this library, any Javascript developer is able to interact with a node on the Avalanche Platform who has enabled their API endpoints for the developer’s consumption. We keep the library up-to-date with the latest changes in the [Avalanche Platform Specification](https://docs.avax.network).

Using AvalancheJS, developers can:

* Locally manage private keys
* Retrieve balances on addresses
* Get UTXOs for addresses
* Build and sign transactions
* Issue signed transactions to the X-Chain, P-Chain and C-Chain on the primary subnet
* Create a Subnetwork
* Swap AVAX and assets between the X-Chain, P-Chain and C-Chain
* Add a Validator to the primary subnet
* Add a Delegator to the primary subnet
* Administer a local node
* Retrieve Avalanche network information from a node

## Requirements

AvalancheJS requires Node.js version 12.14.1 or higher to compile.

## Installation

Avalanche is available for install via `npm`:

`npm install --save avalanche`

You can also pull the repo down directly and build it from scratch:

`npm run build`

This will generate a pure Javascript library and place it in a folder named “web” in the project root. The “avalanchejs” file can then be dropped into any project as a pure javascript implementation of Avalanche.

The AvalancheJS library can be imported into your existing Node.js project as follows:

```text
const avalanche = require("avalanche");
```

Or into your TypeScript project like this:

```text
import { Avalanche } from "avalanche"
```

## Importing essentials

```text
import {
    Avalanche,
    BinTools,
    Buffer,
    BN
  } from "avalanche"

let bintools = BinTools.getInstance();
```

The above lines import the libraries used in the tutorials. The libraries include:

* avalanche: Our javascript module.
* bn.js: A bignumber module use by AvalancheJS.
* buffer: A Buffer library.
* BinTools: A singleton built into AvalancheJS that is used for dealing with binary data.

