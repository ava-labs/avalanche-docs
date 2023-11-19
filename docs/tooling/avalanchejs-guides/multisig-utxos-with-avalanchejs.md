---
tags: [Tooling, AvalancheJS]
description: AvalancheJS is a JavaScript Library for interfacing with the Avalanche platform. It is built using TypeScript and intended to support both browser and Node.js. The AvalancheJS library allows one to issue commands to the Avalanche node APIs.
pagination_label: Multi Signature UTXOs with AvalancheJS
sidebar_label: Multi Signature UTXOs
sidebar_position: 7
---
# Multi Signature UTXOs with AvalancheJS

## Introduction

An account on a chain that follows the UTXO model doesn't have a parameter like
balance. All it has is a bunch of outputs that are resulted from previous
transactions. Each output has some amount of asset associated with them. These
outputs can have 1 or multiple owners. The owners are basically the account
addresses that can consume this output.

The outputs are the result of a transaction that can be spent by the owner of
that output. For example, an account has 3 outputs that it can spend, and hence
are currently unspent. That is why we call them Unspent Transaction Outputs
(UTXOs). So it is better to use the term unspent outputs rather than just
outputs. Similarly, we add the amount in the UTXOs owned by an address to
calculate its balance. Signing a transaction basically adds the signature of the
UTXO owners included in the inputs.

If an account A wants to send 1.3 AVAX to account B, then it has to include all
those unspent outputs in a transaction, that are owned by A and whose sum of
amounts in those outputs is more than or equal to 1.3. These UTXOs will be
included as inputs in a transaction. Account A also has to create outputs with
amount 1.3 and the owner being the receiver (here B). There could be multiple
outputs in the outputs array. This means, that using these UTXOs, we can create
multiple outputs with different amounts to different addresses.

Once the transaction is committed, the UTXOs in the inputs will be consumed and
outputs will become new UTXOs for the receiver. If the inputs have more amount
unlocked than being consumed by the outputs, then the excess amount will be
burned as fees. Therefore, we should also create a change output which will be
assigned to us, if there is an excess amount in the input. In the diagram given
below, a total of 1.72 AVAX is getting unlocked in inputs, therefore we have
also created a change output for the excess amount (0.41 AVAX) to the sender's
address. The remaining amount after being consumed by the outputs like
receiver's and change output, is burned as fees (0.01 AVAX).

![multisig UTXOs 1](/img/multisig-utxos-1.png)

## Multi-Signature UTXOs

UTXOs can be associated with multiple addresses. If there are multiple owners of
a UTXO, then we must note the `threshold` value. We have to include signatures
of a threshold number of UTXO owners with the unsigned transaction to consume
UTXOs present in the inputs. The threshold value of a UTXO is set while issuing
the transaction.

We can use these multi-sig UTXOs as inputs for multiple purposes and not only
for sending assets. For example, we can use them to create Subnets, add
delegators, add validators, etc.

## Atomic Transactions

On Avalanche, we can even create cross-chain outputs. This means that we can do
a native cross-chain transfer of assets. These are made possible through
**Atomic Transactions**. This is a 2-step process -

- Export transaction on source chain
- Import transactions on the destination chain

Atomic transactions are similar to other transactions. We use UTXOs of the
source chain as inputs and create outputs owned by destination chain addresses.
When the export transactions are issued, the newly created UTXOs stay in the
**Exported Atomic Memory**. These are neither on the source chain nor on the
destination chain. These UTXOs can only be used as inputs by their owners on the
destination chain while making import transactions. Using these UTXOs on the
atomic memory, we can create multiple outputs with different amounts or
addresses.

![multisig UTXOs 2](/img/multisig-utxos-2.png)

## UTXOs on C-Chain

We can't use UTXOs on C-Chain to do regular transactions because C-Chain follows
the account-based approach. In C-Chain, each address (account) is mapped with
its balance, and the assets are transferred simply by adding and subtracting
from this balance using the virtual machine.

But we can export UTXOs with one or multiple owners to C-Chain and then import
them by signing the transaction with the qualified spenders containing those
UTXOs as inputs. The output on C-Chain can only have a single owner (a
hexadecimal address). Similarly while exporting from C-Chain to other chains, we
can have multiple owners for the output, but input will be signed only by the
account whose balance is getting used.

## Getting Hands-on Multi-Signature UTXOs

Next, we will make utility and other helpful functions, so that, we can use them
to create multi-sig UTXOs and spend them with ease. These functions will extract
common steps into a function so that we do not have to follow each step every
time we are issuing a transaction.

**You can either follow the steps below to get a better understanding of
concepts and code or directly clone and test the examples from this
[repo](https://github.com/rajranjan0608/multisignature-utxos).**

## Setting Up Project

Make a new directory `multisig` for keeping all the project codes and move
there. First, let's install the required dependencies.

```bash
npm install --save @avalabs/avalanchejs dotenv
```

Now create a configuration file named `config.js` for storing all the pieces of
information regarding the network and chain we are connecting to. Since we are
making transactions on the Fuji network, its network ID is 5. You can change the
configuration according to the network you are using.

```javascript
require("dotenv").config()

module.exports = {
  protocol: "https",
  ip: "api.avax-test.network",
  port: 443,
  networkID: 5,
  privateKeys: JSON.parse(process.env.PRIVATEKEYS),
  mnemonic: process.env.MNEMONIC,
}
```

Create a `.env` file for storing sensitive information which we can't make
public like the private keys or the mnemonic. Here are the sample private keys,
which you should not use. You can create a new account on [Avalanche
Wallet](https://wallet.avax.network/) and paste the mnemonic here for
demonstration.

```env
PRIVATEKEYS=`[
    "PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN",
    "PrivateKey-R6e8f5QSa89DjpvL9asNdhdJ4u8VqzMJStPV8VVdDmLgPd8a4"
]`
MNEMONIC="mask stand appear..."
```

## Setting Up APIs and Keychains

Create a file `importAPI.js` for importing and setting up all the necessary
APIs, Keychains, addresses, etc. Now paste the following snippets into the file.

### Importing Dependencies and Configurations

We need dependencies like the AvalancheJS module and other configurations. Let's import them at the top.

```javascript
const { Avalanche, BinTools, BN } = require("avalanche")
const Web3 = require("web3")

const MnemonicHelper = require("avalanche/dist/utils/mnemonic").default
const HDNode = require("avalanche/dist/utils/hdnode").default
const { privateToAddress } = require("ethereumjs-util")

// Importing node details and Private key from the config file.
const {
  ip,
  port,
  protocol,
  networkID,
  privateKeys,
  mnemonic,
} = require("./config.js")

let { avaxAssetID, chainIDs } = require("./constants.js")

// For encoding and decoding to CB58 and buffers.
const bintools = BinTools.getInstance()
```

### Setup Avalanche APIs

To make API calls to the Avalanche network and different blockchains like
X-Chain, P-Chain and C-Chain, let's set up these by adding the following code
snippet.

```javascript
// Avalanche instance
const avalanche = new Avalanche(ip, port, protocol, networkID)
const nodeURL = `${protocol}://${ip}:${port}/ext/bc/C/rpc`
const web3 = new Web3(nodeURL)

// Platform and Avax API
const platform = avalanche.PChain()
const avax = avalanche.XChain()
const evm = avalanche.CChain()
```

### Setup Keychains with Private Keys

In order to sign transactions with our private keys, we will use the AvalancheJS
keychain API. This will locally store our private keys and can be easily used
for signing.

```javascript
// Keychain for signing transactions
const keyChains = {
  x: avax.keyChain(),
  p: platform.keyChain(),
  c: evm.keyChain(),
}

function importPrivateKeys(privKey) {
  keyChains.x.importKey(privKey)
  keyChains.p.importKey(privKey)
  keyChains.c.importKey(privKey)
}
```

We can either use mnemonics to derive private keys from it or simply use the
bare private key for importing keys to the keychain. We can use the following
function to get private keys from the mnemonic and address index which we want.
For demo purposes, we will use addresses at index 0 and 1.

```javascript
function getPrivateKey(mnemonic, activeIndex = 0) {
  const mnemonicHelper = new MnemonicHelper()
  const seed = mnemonicHelper.mnemonicToSeedSync(mnemonic)
  const hdNode = new HDNode(seed)

  const avaPath = `m/44'/9000'/0'/0/${activeIndex}`

  return hdNode.derive(avaPath).privateKeyCB58
}

// importing keys in the key chain - use this if you have any private keys
// privateKeys.forEach((privKey) => {
// 	importPrivateKeys(privKey)
// })

// importing private keys from mnemonic
importPrivateKeys(getPrivateKey(mnemonic, 0))
importPrivateKeys(getPrivateKey(mnemonic, 1))
```

### Setup Addresses and Chain IDs

For creating transactions we might need addresses of different formats like
`Buffer` or `Bech32` etc. And to make issue transactions on different chains we
need their `chainID`. Paste the following snippet to achieve the same.

```javascript
// Buffer representation of addresses
const addresses = {
  x: keyChains.x.getAddresses(),
  p: keyChains.p.getAddresses(),
  c: keyChains.c.getAddresses(),
}

// String representation of addresses
const addressStrings = {
  x: keyChains.x.getAddressStrings(),
  p: keyChains.p.getAddressStrings(),
  c: keyChains.c.getAddressStrings(),
}

avaxAssetID = bintools.cb58Decode(avaxAssetID)

chainIDs = {
  x: bintools.cb58Decode(chainIDs.x),
  p: bintools.cb58Decode(chainIDs.p),
  c: bintools.cb58Decode(chainIDs.c),
}

// Exporting these for other files to use
module.exports = {
  networkID,
  platform,
  avax,
  evm,
  keyChains,
  avaxAssetID,
  addresses,
  addressStrings,
  chainIDs,
  bintools,
  web3,
  BN,
}
```

We can use the above-exported variables and APIs from other files as required.

## Creating Utility Functions

While creating multi-sig transactions, we have a few things in common, like
creating inputs with the UTXOs, creating outputs, and adding signature indexes.
So let's create a file named `utils.js` and paste the following snippets that we
can call every time we want to do a repetitive task.

### Getting Dependencies

Inputs and outputs are an array of transferable input and transferable output.
These contain transfer inputs and associated assetID which is being transferred.
There are different types of transfer inputs/outputs for sending assets, minting
assets, minting NFTs, etc.

We will be using `SECPTransferInput/SECPTransferOutput` for sending our assets.

But since we can't use UTXOs on C-Chain, we cannot directly import them either.
Therefore we need to create a different type of input/output for them called
`EVMInput/EVMOutput`.

```javascript
const { BN, chainIDs, web3 } = require("./importAPI")

let SECPTransferInput,
  TransferableInput,
  SECPTransferOutput,
  TransferableOutput,
  EVMInput,
  EVMOutput

const getTransferClass = (chainID) => {
  let vm = ""
  if (chainID.compare(chainIDs.x) == 0) {
    vm = "avm"
  } else if (chainID.compare(chainIDs.p) == 0) {
    vm = "platformvm"
  } else if (chainID.compare(chainIDs.c) == 0) {
    vm = "evm"
  }
  return ({
    SECPTransferInput,
    TransferableInput,
    SECPTransferOutput,
    TransferableOutput,
    EVMInput,
    EVMOutput,
    index,
  } = require(`avalanche/dist/apis/${vm}/index`))
}
```

Different chains have their own implementation of TransferInput/Output classes.
Therefore we need to update the required modules according to the chain we
issuing transactions on. To make it more modular, we created a
`getTransferClass()` function, that will take `chainID` and import modules as
required.

### Creating Transferable Output

The `createOutput()` function will create and return the transferable output
according to arguments amount, assetID, owner addresses, lock time, and
threshold. Lock time represents the timestamp after which this output could be
spent. Mostly this parameter will be 0.

```javascript
const createOutput = (amount, assetID, addresses, locktime, threshold) => {
  let transferOutput = new SECPTransferOutput(
    amount,
    addresses,
    locktime,
    threshold
  )

  return new TransferableOutput(assetID, transferOutput)
}
```

### Creating Transferable Input

The `createInput()` function will create and return transferable input. Input
require arguments like amount in the UTXO, and arguments which identify that
UTXO, like txID of the transaction which the UTXO was the output of, `outputIndex`
(index of the output in that TX), and qualified signatures (output spenders
which are present in our keychain) whose signature will be required while
signing this transaction.

```javascript
const createInput = (
  amount,
  txID,
  outputIndex,
  assetID,
  spenders,
  threshold
) => {
  // creating transfer input
  let transferInput = new SECPTransferInput(amount)

  // adding threshold signatures
  addSignatureIndexes(spenders, threshold, transferInput)

  // creating transferable input
  return new TransferableInput(txID, outputIndex, assetID, transferInput)
}
```

### Add Signature Indexes

The `createSignatureIndexes()` function will add spender addresses along with an
index for each address in the transfer input. While signing the unsigned
transaction, these signature indexes will be used.

By adding signature indexes we are not signing the inputs but just adding a
placeholder of the address at a particular index whose signature is required
when we call the `.sign()` function on the unsigned transactions. Once the
threshold spender addresses are added, it will exit.

```javascript
const addSignatureIndexes = (addresses, threshold, input) => {
  let sigIndex = 0
  addresses.every((address) => {
    if (threshold > 0) {
      input.addSignatureIdx(sigIndex, address)
      sigIndex++
      threshold--
      return true
    } else {
      return false
    }
  })
}
```

### Create EVM Input

As explained earlier, we do not have UTXOs on C-Chain. Therefore we cannot make
regular inputs. The following function `createEVMInput()` will create the
required input and add a signature index corresponding to the address specified
in the input.

EVM Inputs are required when we want to export assets from C-Chain. In the
following function, `addresses` is the array of Buffer addresses but for
`C-Chain Export Transactions`, a hex address is also appended at last.

```javascript
const createEVMInput = (amount, addresses, assetID, nonce) => {
  const hexAddress = addresses.at(-1)
  const evmInput = new EVMInput(hexAddress, amount, assetID, nonce)
  evmInput.addSignatureIdx(0, addresses[0])

  return evmInput
}
```

### Create EVM Output

The `createEVMOutput()` function will create EVM output for importing assets on C-Chain.

```javascript
const createEVMOutput = (amount, hexAddress, assetID) => {
  return new EVMOutput(hexAddress, amount, assetID)
}
```

### Update Transfer Class

Let's make a small function that will call the `getTransferClass()` according to the `chainID`.

```javascript
const updateTransferClass = (chainID) => {
  {
    SECPTransferInput,
      TransferableInput,
      SECPTransferOutput,
      TransferableOutput,
      EVMInput,
      EVMOutput,
      (index = getTransferClass(chainID))
  }
}
```

### Add UTXOs to Inputs

We have `inputs` as an array of UTXOs that will be consumed in the transaction.
The `updateInputs()` function will take UTXOs, `addresses` whose credentials we
have for signing, `assetID` and `toBeUnlocked` that is amount we want to consume.
`toBeUnlocked` contains everything we want to consume including transfer amount,
fees, stake amount (if any), etc.

We also have a special variable `C`, that will indicate the type of transaction
which is associated with the C-Chain. This is required because -

- Export from C-Chain (C.export == true) - These types of transactions cannot
  have UTXOs as inputs and therefore `EVMInput` is created.
- Import to C-Chain (C.import == true) - The outputs imported on C-Chain from exported UTXOs are `EVMOutput`.

It will create inputs with the passed UTXOs worth the `toBeUnlocked` amount. But
if there is a UTXO that when included, will surpass the `toBeUnlocked` amount,
then it will create a change output with the qualified spenders as their new
owners with the surpassed amount.

This function will return the `inputs` array containing all the unlocked UTXOs,
change transferable output, and the net balance included in these inputs. Now
add the following function snippet.

```javascript
const updateInputs = async (
  utxos,
  addresses,
  C,
  assetID,
  toBeUnlocked,
  chainID
) => {
  // Getting transferable inputs according to chain id
  updateTransferClass(chainID)

  let inputs = [],
    changeTransferableOutput = undefined,
    netInputBalance = new BN(0)

  if (C.export) {
    const nonce = await web3.eth.getTransactionCount(addresses.at(-1))
    inputs.push(createEVMInput(toBeUnlocked, addresses, assetID, nonce))
  } else {
    utxos.forEach((utxo) => {
      let output = utxo.getOutput()
      if (
        output.getOutputID() === 7 &&
        assetID.compare(utxo.getAssetID()) === 0 &&
        netInputBalance < toBeUnlocked
      ) {
        let outputThreshold = output.getThreshold()

        // spenders which we have in our keychain
        let qualifiedSpenders = output.getSpenders(addresses)

        // create inputs only if we have custody of threshold or more number of utxo spenders
        if (outputThreshold <= qualifiedSpenders.length) {
          let txID = utxo.getTxID()
          let outputIndex = utxo.getOutputIdx()
          let utxoAmount = output.amountValue
          let outputLocktime = output.getLocktime()

          netInputBalance = netInputBalance.add(utxoAmount)

          let excessAmount = netInputBalance.sub(toBeUnlocked)

          // creating change transferable output
          if (excessAmount > 0) {
            if (!C.import) {
              changeTransferableOutput = createOutput(
                excessAmount,
                assetID,
                qualifiedSpenders,
                outputLocktime,
                outputThreshold
              )
            }
          }

          // create transferable input
          let transferableInput = createInput(
            utxoAmount,
            txID,
            outputIndex,
            assetID,
            qualifiedSpenders,
            outputThreshold
          )

          inputs.push(transferableInput)
        }
      }
    })
  }
  return { inputs, changeTransferableOutput }
}
```

Only those UTXOs will be included whose output ID is `7` representing
`SECPTransferOutput`. These outputs are used for transferring assets. Also, we
are only including outputs containing `AVAX` assets. These conditions are
checked in the following line -

```javascript
if(output.getOutputID() === 7 && assetID.compare(utxo.getAssetID()) === 0 && netInputBalance < toBeUnlocked) {
```

The following part in the above function creates the change output if the total
included balance surpasses the required amount and the transaction is not a
C-Chain export -

```javascript
netInputBalance = netInputBalance.add(utxoAmount)

let excessAmount = netInputBalance.sub(toBeUnlocked)

// creating change transferable output
if (excessAmount > 0) {
  if (!C.import) {
    changeTransferableOutput = createOutput(
      excessAmount,
      assetID,
      qualifiedSpenders,
      outputLocktime,
      outputThreshold
    )
  }
}
```

### Export Utility Functions

Now paste the following snippet to export these utility functions.

```javascript
module.exports = {
  createOutput,
  createEVMOutput,
  updateInputs,
}
```

All the utility functions are created.

## Create Inputs and Outputs

Let's create a function that will return the array of sufficient UTXOs stuffed
inside an array and necessary outputs like send output, multi-sig output, evm
output, change output, etc. This function is basically a wrapper that
orchestrates the utility and other functions to generate inputs and outputs from
parameters like addresses, asset id, chain id, output arguments (to, threshold
and amount), etc.

Now make a new file `createInputsAndOutputs.js` and paste the following snippets of code inside it.

### Importing Dependencies

We need to import utility functions for creating outputs and inputs with the UTXOs.

```javascript
const { BN, avax, platform, evm, chainIDs, bintools } = require("./importAPI")

const { createOutput, createEVMOutput, updateInputs } = require("./utils")
```

`EVMInput` should be used as inputs while creating an export transaction from
C-Chain and `EVMOutput` should be used as outputs while creating an import
transaction on C-Chain. To make it easier to decide when to do what, let's make
a function `checkChain()` that will return an object `C` (described earlier).

```javascript
const checkChain = (chainID, ownerAddress) => {
  let C = {
    export: false,
    import: false,
  }
  if (chainID.compare(chainIDs.c) == 0) {
    if (typeof ownerAddress == "string" && bintools.isHex(ownerAddress)) {
      C.import = true
    } else {
      C.export = true
    }
  }
  return C
}
```

For getting UTXOs from an address, let's make another function
`getUnspentOutputs()`. This function will fetch UTXOs from a given address and
source chain. The `sourceChain` will be used to fetch exported UTXOs that are
not yet imported. The exported outputs stay in the exported atomic memory. This
parameter will only be used when we want to import assets.

```javascript
// UTXOs for spending unspent outputs
const getUnspentOutputs = async (
  addresses,
  chainID,
  sourceChain = undefined
) => {
  let utxoSet
  if (chainID.compare(chainIDs.x) == 0) {
    utxoSet = await avax.getUTXOs(addresses, sourceChain)
  } else if (chainID.compare(chainIDs.p) == 0) {
    utxoSet = await platform.getUTXOs(addresses, sourceChain)
  }
  return utxoSet.utxos.getAllUTXOs()
}
```

Now for organizing inputs and outputs and adding required signature indexes (not
signatures) for each unspent output, adding change output, etc, we will make a
`createInputsAndOutputs()` function. Paste the following snippet next.

```javascript
const createInputsAndOutputs = async (
  assetID,
  chainID,
  addresses,
  addressStrings,
  outputConfig,
  fee,
  sourceChain
) => {
  let locktime = new BN(0)

  let C = checkChain(chainID, outputConfig[0].owners)

  let utxos = []
  if (C.export) {
    addresses.push("0x3b0e59fc2e9a82fa5eb3f042bc5151298e4f2cab") // getHexAddress(addresses[0])
  } else {
    utxos = await getUnspentOutputs(addressStrings, chainID, sourceChain)
  }

  let toBeUnlocked = fee
  outputConfig.forEach((output) => {
    toBeUnlocked = toBeUnlocked.add(output.amount)
  })

  // putting right utxos in the inputs
  let { inputs, changeTransferableOutput } = await updateInputs(
    utxos,
    addresses,
    C,
    assetID,
    toBeUnlocked,
    chainID
  )

  let outputs = []

  // creating transferable outputs and transfer outputs
  outputConfig.forEach((output) => {
    let newOutput
    if (!C.import) {
      newOutput = createOutput(
        output.amount,
        assetID,
        output.owners,
        locktime,
        output.threshold
      )
    } else {
      newOutput = createEVMOutput(output.amount, output.owners, assetID)
    }
    outputs.push(newOutput)
  })

  // pushing change output (if any)
  if (changeTransferableOutput != undefined && !C.import) {
    outputs.push(changeTransferableOutput)
  }

  return { inputs, outputs }
}
```

Output config is basically an array of all outputs that we want to create. This
excludes the change output because it will be automatically created. It has the
following structure.

```javascript
// Regular outputs
;[
  {
    amount: BigNumber,
    owners: [Buffer],
    threshold: Number,
  },
][
  // Import to C-Chain
  {
    amount: BigNumber,
    owners: "hex address string",
  }
]
```

You will learn about these arguments and how we can actually pass this along
with other arguments through the examples ahead.

### Exporting Functions

Add the following snippet to export this function.

```javascript
module.exports = {
  createInputsAndOutputs,
}
```

We have created all the utility and helper functions. You can use this project
structure to create different types of transactions like BaseTx, Export, Import,
AddDelegator, etc. You should have the following files in your project now -

- **.env** - Secret file storing data like mnemonic and private keys
- **config.js** - Network information and parsed data from `.env`
- **constants.js** - Asset and Chain specific static data
- **importAPI.js** - Import and setup apis, addresses and keychains
- **utils.js** - Utility functions for creating inputs and outputs
- **createInputsAndOutputs.js** - Wrapper of `utility.js` for orchestrating utility functions.

Follow the next steps for **examples** and on how to use these functions.

## Examples

Now let's look at the examples for executing these transactions. For example, we
will create a separate `examples` folder. In order to run the example scripts,
you must be in the root folder where all the environment variables and
configurations are kept.

```bash
node examples/send.js
```

## Multi-Signature Base TX on X-Chain

Let's create a base transaction that converts a single-owner UTXO into a
multi-sig UTXO. The final UTXO can be used by new owners of the unspent output
by adding their signatures for each output. Create a new file `sendBaseTx.js`
and paste the following snippets.

### Import Dependencies

Import the necessary dependencies like `keyChains`, `addresses`, `utility`
functions, `UnSignedTx` and `BaseTx` classes etc.

```javascript
const {
  avaxAssetID,
  keyChains,
  chainIDs,
  addresses,
  addressStrings,
  networkID,
  BN,
  avax,
} = require("../importAPI")

const { UnsignedTx, BaseTx } = require("avalanche/dist/apis/avm/index")

const { createInputsAndOutputs } = require("../createMultisig")
```

### Send BaseTx

Now create the `sendBaseTx()` function to be called for sending base TX to the network.

```javascript
async function sendBaseTx() {
  let memo = Buffer.from("Multisig Base Tx")

  // unlock amount = sum(output amounts) + fee
  let fee = new BN(1e6)

  // creating outputs of 0.5 (multisig) and 0.1 AVAX - change output will be added by the function in the last
  let outputConfig = [
    {
      amount: new BN(5e8),
      owners: addresses.x,
      threshold: 2,
    },
    {
      amount: new BN(1e8),
      owners: [addresses.x[1]],
      threshold: 1,
    },
  ]

  let { inputs, outputs } = await createInputsAndOutputs(
    avaxAssetID,
    chainIDs.x,
    addresses.x,
    addressStrings.x,
    outputConfig,
    fee
  )

  const baseTx = new BaseTx(networkID, chainIDs.x, outputs, inputs, memo)

  const unsignedTx = new UnsignedTx(baseTx)
  const tx = unsignedTx.sign(keyChains.x)
  const txID = await avax.issueTx(tx)
  console.log("TxID:", txID)
}
```

We have created the BaseTx with the following output configuration -

- Multi-sig output of value 0.5 AVAX with threshold 2 and owners represented by
  `addresses.x`. The owners are basically an array of addresses in Buffer
  representation.
- Single owner output of value 0.1 AVAX.

```javascript
let outputConfig = [
  {
    amount: new BN(5e8),
    owners: addresses.x,
    threshold: 2,
  },
  {
    amount: new BN(1e8),
    owners: [addresses.x[1]],
    threshold: 1,
  },
]
```

Let's discuss the arguments of `createInputsAndOutputs()` in detail -

- `assetID` - ID of the asset involved in transaction
- `chainID` - ID of the chain on which this transaction will be issued
- `addresses` - Addresses buffer array whose UTXO will be consumed
- `addressStrings` - Addresses string array whose UTXO will be consumed
- `outputConfig` - Array of output object containing amount, owners and threshold
- `fee` - Fee for this transaction to be consumed in inputs
- `sourceChain` - Chain from which UTXOs will be fetched. Will take `chainID` as default.

In the above parameters, if `fee` is less than the fees actually required for
that transaction, then there will be no surplus amount left by outputs over
inputs because any surplus will be converted into a change output. This can
cause transaction failure. So keep the fees in accordance with the transaction
as mentioned [here](/reference/standards/guides/txn-fees#fee-schedule).

Also, the `sourceChain` parameter is required for fetching exported UTXOs that
do not exist yet on the destination chain. For non-export/import transactions,
this parameter is not required.

The `createInputsAndOutputs()` function will return `inputs` and `outputs`
required for any transaction. The last element of the outputs array would be
change output. And the order of other outputs will be the same as that in the
`outputConfig`. Signature indexes corresponding to their owners are already
included in the inputs. We can create an unsigned base transaction using the
`BaseTx` and `UnsignedTx` classes as shown above. The `.sign()` function
basically adds the required signatures from the keychain at the place indicated
by signature indexes.

Once the multi-sig UTXO is created, this UTXO can only be used if we have the
threshold signers in our keychain. The `util` functions can be tweaked a little
bit to create and return inputs with a part number of signers (&lt;threshold). We
can then partially sign the inputs and ask other owners to add signature index
and sign.

Now call the `sendBaseTx()` function by adding this line

```javascript
sendBaseTx()
```

Run this file using `node examples/sendBaseTx.js`, see the txID in the output,
and look for it in the Fuji explorer.

![multisig UTXOs 3](/img/multisig-utxos-3.jpeg)

## Export Multi-Sig UTXO From X to P-Chain

Now we will look into exporting assets from the X to P chain. It will be similar
to the BaseTx example, with few differences in output ordering and cross-chain
owner addresses.

Make a new file named `exportXP.js` and paste the following snippets.

### Import Dependencies

This time we will require `ExportTx` instead of `BaseTx` class.

```javascript
const {
  avaxAssetID,
  keyChains,
  chainIDs,
  addresses,
  addressStrings,
  networkID,
  BN,
  avax,
} = require("../importAPI")

const { UnsignedTx, ExportTx } = require("avalanche/dist/apis/avm/index")

const { createInputsAndOutputs } = require("../createMultisig")
```

### Send Export Transaction

Most of the things will be very much similar in this function. You can have a
look at `outputConfig`, which creates a multi-sig output for addresses on
P-Chain. These addresses will be required for signing `importTx` on P-Chain.

The `fee` here will only be for exporting the asset. The import fees will be
deducted from the UTXOs present on the **Exported Atomic Memory**, a memory
location where UTXOs lie after getting exported but before being imported. If
there is only a single UTXO, then it will be deducted from it.

```javascript
async function exportXP() {
  let memo = Buffer.from("Multisig Export Tx")

  // consuming amount = sum(output amount) + fee
  let fee = new BN(1e6)

  // creates mutlti-sig (0.1 AVAX) and single-sig (0.03 AVAX) output for exporting to P Address (0.001 AVAX will be fees)
  let outputConfig = [
    {
      amount: new BN(3e6),
      owners: [addresses.p[0]],
      threshold: 1,
    },
    {
      amount: new BN(1e8),
      owners: addresses.p,
      threshold: 2,
    },
  ]

  // importing fees will be deducted from these our other outputs in the exported output memory
  let { inputs, outputs } = await createInputsAndOutputs(
    avaxAssetID,
    chainIDs.x,
    addresses.x,
    addressStrings.x,
    outputConfig,
    fee
  )

  // outputs at index 0 and 1 are to be exported
  const exportTx = new ExportTx(
    networkID,
    chainIDs.x,
    [outputs.at(-1)],
    inputs,
    memo,
    chainIDs.p,
    [outputs[0], outputs[1]]
  )

  const unsignedTx = new UnsignedTx(exportTx)
  const tx = unsignedTx.sign(keyChains.x)
  const txID = await avax.issueTx(tx)
  console.log("TxID:", txID)
}
```

Another point to note is how inputs, outputs, and `exportedOutputs` are passed here.

- Inputs are as usual passed for the `ins` parameter of the `ExportTx` class.
- But only `outputs. at(-1)` representing change output (last element) is passed
  in place of the usual `outs` parameter.
- The last parameter of this class is `exportedOuts`, representing the outputs that
  will be exported from this chain to `destinationChain` (2nd last parameter).

All these inputs and outputs are array, and hence con contains multiple outputs
or inputs. But you have to manage which output should be passed where.

Call the function by adding the below function call.

```javascript
exportXP()
```

Run this file using `node examples/exportXP.js`, see the txID in the output, and
look for it in the [Fuji
explorer](https://explorer-xp.avax-test.network/blockchain/2JVSBoinj9C2J33VntvzYtVJNZdN2NKiwwKjcumHUWEb5DbBrm).

![multisig UTXOs 4](/img/multisig-utxos-4.jpeg)

In the above image, we are consuming UTXO with the amount `0.486...`, and
generating outputs with the amount `0.382...` (change output) and `0.003` and
`0.1` (exported output). The remaining `0.001` is burned as transaction fees.

## Import Multi-Sig UTXO From X to P-Chain

After exporting the UTXOs from the source chain, it stays in the exported atomic
memory that is these are neither on the source chain nor on the destination chain.
Paste the following snippets into a new file `importP.js`.

### Import Dependencies

We will require `ImportTx` from PlatformVM APIs.

```javascript
const {
  avaxAssetID,
  keyChains,
  chainIDs,
  addresses,
  addressStrings,
  networkID,
  BN,
  platform,
} = require("../importAPI")

const { UnsignedTx, ImportTx } = require("avalanche/dist/apis/platformvm/index")

const { createInputsAndOutputs } = require("../createMultisig")
```

### Send Import Transaction

The `importP()` is a simple function that will use UTXOs on the exported atomic
memory as its inputs and create an output on the P-Chain addresses. You can
change the output config's owners and amount as per your need.

An important point to note here is that all UTXOs that are included in this
`importTx` will be transferred to the destination chain. Even if the import
amount is less than the amount in the UTXO, it will be sent to the qualified
spender on the destination chain as a change output.

```javascript
async function importP() {
  let memo = Buffer.from("Multisig Import Tx")

  // Use this parameter if you have UTXOs exported from other chains - only exported outputs will be fetched
  let sourceChain = "X"

  // unlock amount = sum(output amount) + fee
  let fee = new BN(1e6)

  let outputConfig = [
    {
      amount: new BN(1e6),
      owners: addresses.p,
      threshold: 2,
    },
    {
      amount: new BN(1e2),
      owners: addresses.p[0],
      threshold: 1,
    },
  ]

  // all the inputs here are the exported ones due to source chain parameter
  let { inputs, outputs } = await createInputsAndOutputs(
    avaxAssetID,
    chainIDs.p,
    addresses.p,
    addressStrings.p,
    outputConfig,
    fee,
    sourceChain
  )

  const importTx = new ImportTx(
    networkID,
    chainIDs.p,
    outputs,
    [],
    memo,
    chainIDs.x,
    inputs
  )

  const unsignedTx = new UnsignedTx(importTx)
  const tx = unsignedTx.sign(keyChains.x)
  const txID = await platform.issueTx(tx)
  console.log("TxID:", txID)
}
```

![multisig UTXOs 5](/img/multisig-utxos-5.jpeg)

In the above image, we are consuming the above exported UTXOs with amounts
`0.003` and `0.1`, and generating outputs with amount `0.092...` (change output
imported on P-Chain) and 2 `0.005` imported outputs (1 multi-sig and 1
single-sig). The remaining `0.001` is burned as transaction fees.

## Import Multi-Sig UTXO From X to C-Chain

This transaction will also be similar to other atomic transactions, except for
the `outputConfig` parameter. You can easily get the idea by looking at the code
below. Before you can run this example, there must be exported outputs for the
addresses you control on the C-Chain, otherwise, there will be no UTXO to
consume.

Here we are importing UTXOs that are exported from X-Chain.

```javascript
const {
  avaxAssetID,
  keyChains,
  chainIDs,
  addresses,
  addressStrings,
  networkID,
  BN,
  evm,
} = require("../importAPI")

const { UnsignedTx, ImportTx } = require("avalanche/dist/apis/evm/index")

const { createInputsAndOutputs } = require("../createMultisig")

async function importP() {
  // Use this parameter if you have UTXOs exported from other chains - only exported outputs will be fetched
  let sourceChain = "X"

  // unlock amount = sum(output amount) + fee (fees on C-Chain is dynamic)
  let fee = new BN(0)

  let outputConfig = [
    {
      amount: new BN(1e4),
      owners: "0x4406a53c35D05424966bD8FC354E05a3c6B56aF0",
    },
    {
      amount: new BN(2e4),
      owners: "0x3b0e59fc2e9a82fa5eb3f042bc5151298e4f2cab",
    },
  ]

  // all the inputs here are the exported ones due to source chain parameter
  let { inputs, outputs } = await createInputsAndOutputs(
    avaxAssetID,
    chainIDs.c,
    addresses.c,
    addressStrings.c,
    outputConfig,
    fee,
    sourceChain
  )

  const importTx = new ImportTx(
    networkID,
    chainIDs.c,
    chainIDs.x,
    inputs,
    outputs
  )

  const unsignedTx = new UnsignedTx(importTx)
  const tx = unsignedTx.sign(keyChains.x)
  const txID = await evm.issueTx(tx)
  console.log("TxID:", txID)
}

importP()
```

![multisig UTXOs 6](/img/multisig-utxos-6.png)

You can use [Avascan](https://testnet.avascan.info/) to view import and export transactions on C-Chain.

## Add Delegator Transaction

Till now we have covered common transactions like BaseTx, Export, and Import TX.
Export and Import TX will be similar in all the UTXO-based chains like X and P.
But for Account-based chains, we have to deal with an account-balance system.

Now let's try using the multi-sig UTXOs exported from X-Chain to P-Chain to
issue an `addDelegator()` transaction. Create a file `addDelegatorTx.js` and
paste the following snippets.

### Import Dependencies

Import the dependencies like `AddDelegatorTx` and `UnsignedTx` classes using the following code.

```javascript
const {
  avaxAssetID,
  keyChains,
  chainIDs,
  addresses,
  addressStrings,
  networkID,
  BN,
  platform,
} = require("../importAPI")

const {
  UnsignedTx,
  AddDelegatorTx,
  SECPOwnerOutput,
  ParseableOutput,
} = require("avalanche/dist/apis/platformvm/index")

const { NodeIDStringToBuffer, UnixNow } = require("avalanche/dist/utils")

const { createInputsAndOutputs } = require("../createMultisig")
```

### Sending AddDelegator Transaction

Now we will create the `addDelegator()` function which will use the multi-sig
UTXOs and create a signed `addDelegatorTx`, which when issued, will add the
delegator to the specified node. Paste the following snippet next.

```javascript
async function addDelegator() {
  let nodeID = NodeIDStringToBuffer("NodeID-4B4rc5vdD1758JSBYL1xyvE5NHGzz6xzH")
  let locktime = new BN(0)
  let stakeAmount = await platform.getMinStake()
  let startTime = UnixNow().add(new BN(60 * 1))
  let endTime = startTime.add(new BN(2630000))
  let memo = Buffer.from("Multi-sig Add Delegator Tx")

  // unlock amount = sum(output amounts) + fee
  let fee = new BN(1e6)

  // creating stake amount output at 0th index
  let outputConfig = [
    {
      amount: stakeAmount.minValidatorStake,
      owners: addresses.p,
      threshold: 2,
    },
  ]

  // outputs to be created for rewards
  const rewardOutputOwners = new SECPOwnerOutput(addresses.p, locktime, 2)
  const rewardOwners = new ParseableOutput(rewardOutputOwners)

  let { inputs, outputs } = await createInputsAndOutputs(
    avaxAssetID,
    chainIDs.p,
    addresses.p,
    addressStrings.p,
    outputConfig,
    fee
  )

  const addDelegatorTx = new AddDelegatorTx(
    networkID,
    chainIDs.p,
    [],
    inputs,
    memo,
    nodeID,
    startTime,
    endTime,
    stakeAmount.minDelegatorStake,
    [outputs[0]],
    rewardOwners
  )

  const unsignedTx = new UnsignedTx(addDelegatorTx)
  const tx = unsignedTx.sign(keyChains.p)
  const txID = await platform.issueTx(tx)
  console.log("TxID:", txID)
}
```

In the above transaction, the `outputs` parameter will be empty since we do not need
to transfer any assets to the account. As you can see above we need to create
another type of output, for indicating the reward for delegation.

```javascript
const rewardOutputOwners = new SECPOwnerOutput(addresses.p, locktime, 2)
const rewardOwners = new ParseableOutput(rewardOutputOwners)
```

Call the function by adding the below function call.

```javascript
addDelegator()
```

Run this file using `node examples/addDelegatorTx.js`, see the txID in the
output, and look for it in the Fuji explorer.

![multisig UTXOs 7](/img/multisig-utxos-7.jpeg)
