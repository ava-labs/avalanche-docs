---
tags: [Tooling, AvalancheJS]
description: AvalancheJS is a JavaScript Library for interfacing with the Avalanche platform. It is built using TypeScript and intended to support both browser and Node.js. The AvalancheJS library allows one to issue commands to the Avalanche node APIs.
pagination_label: Generate a Transaction ID Using AvalancheJS
sidebar_label: Generate a Transaction ID
sidebar_position: 1
---
# Generate a Transaction ID Using AvalancheJS

## Introduction

A transaction id, or TxID, is a string of numbers and letters which identifies a
specific transaction on the blockchain. TXIDs are one of the most core
components that developers interact with when working on a blockchain system.
They're deterministic and can be generated using
[AvalancheGo](/reference) or
[AvalancheJS](/tooling/avalanchejs-overview.md).

On the Avalanche network a TxID is a CB58 encoded string which is created by
`sha256` hashing the transaction.
[CB58](https://support.avax.network/en/articles/4587395-what-is-cb5) is a base58
encoding with a checksum. Below are the steps for deterministically generating a
TxID using AvalancheJS.

## Creating a Signed Transaction

The script which we're using can be found in the AvalancheJS example scripts as
[example/avm/baseTx-AVAX.ts](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/baseTx-avax.ts).
First, create a
[BaseTx](/reference/avalanchego/x-chain/txn-format.md#what-base-tx-contains).
We're omitting that part for the sake of brevity. Once you have a `BaseTx` then
create an `UnsignedTx` and `sign` it. Lastly convert the `Tx` to a `Buffer` by
calling `tx.toBuffer()`.

```ts
// Manually build BaseTx via steps in example/avm/baseTx-avax.ts
// Create an UnsignedTx with the BaseTx
const unsignedTx: UnsignedTx = new UnsignedTx(baseTx)
// Sign the UnsignedTx to create a Tx
const tx: Tx = unsignedTx.sign(xKeychain)
// Convert the Tx to a Buffer
const txBuf: Buffer = tx.toBuffer()
```

## Generate the TxID

Next, create a `sha256` hash of the `Buffer` from the previous step.

```ts
// Create sha256 hash of the Tx Buffer
const sha256Hash: Buffer = Buffer.from(
  createHash("sha256").update(txBuf).digest().buffer
)
```

As mentioned in the [Introduction](#introduction), a TxID is a CB58 encoded
string which is created by `sha256` hashing the transaction. To create the TxID
now CB58 encode the newly created `sha256` hash.

```ts
// cb58 the sha256 hash
const generatedTxID: string = bintools.cb58Encode(sha256Hash)
console.log(`Generated TxID: ${generatedTxID}`)
```

The `generatedTxID` will be a CB58 encoded string similar to `eLXEKFFMgGmK7ZLokCFjppdBfGy5hDuRqh5uJVyXXPaRErpAX`.

## Confirm TxID Is Correct

To confirm that the `generatedTxID` is correct issue the `BaseTx` to AvalancheGo
and compare the TxID which is returned with the recently created TxID.

```ts
// get the actual txID from the full node
const actualTxID: string = await xchain.issueTx(tx)
console.log(`Success! TxID: ${actualTxID}`)

// Note the generated TxID and the returned TxID match
Generated TXID: eLXEKFFMgGmK7ZLokCFjppdBfGy5hDuRqh5uJVyXXPaRErpAX
Returned TXID: eLXEKFFMgGmK7ZLokCFjppdBfGy5hDuRqh5uJVyXXPaRErpAX
```

## Summary

TXIDs are a core component of any blockchain system. They are used extensively
in Avalanche when creating transactions, issuing new assets and even spinning up
Subnets and validators. TXIDs are deterministically created by `sha256` hashing
a `Buffer` of the transaction and then CB58 encoding the hash.
