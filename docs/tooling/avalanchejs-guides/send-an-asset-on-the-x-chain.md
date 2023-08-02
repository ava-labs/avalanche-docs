---
tags: [Tooling, AvalancheJS]
description: AvalancheJS is a JavaScript Library for interfacing with the Avalanche platform. It is built using TypeScript and intended to support both browser and Node.js. The AvalancheJS library allows one to issue commands to the Avalanche node APIs.
pagination_label: Send an Asset on the X-Chain
sidebar_label: Send X-Chain Asset
sidebar_position: 5
---
# Send an Asset on the X-Chain

This example sends an asset in the X-Chain to a single recipient. The first step
in this process is to create an instance of Avalanche connected to our Avalanche
Platform endpoint of choice.

```ts
import { Avalanche, BinTools, Buffer, BN } from "avalanche"

let myNetworkID = 1 //default is 3, we want to override that for our local network
let myBlockchainID = "2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM" // The X-Chain blockchainID on this network
let avax = new avalanche.Avalanche(
  "localhost",
  9650,
  "http",
  myNetworkID,
  myBlockchainID
)
let xchain = avax.XChain() //returns a reference to the X-Chain used by AvalancheJS
```

We’re also assuming that the keystore contains a list of addresses used in this transaction.

## Getting the UTXO Set

The X-Chain stores all available balances in a data store called Unspent
Transaction Outputs (UTXOs). A UTXO Set is the unique list of outputs produced
by transactions, addresses that can spend those outputs, and other variables
such as lockout times (a timestamp after which the output can be spent) and
thresholds (how many signers are required to spend the output).

For the case of this example, we’re going to create a simple transaction that
spends an amount of available coins and sends it to a single address without any
restrictions. The management of the UTXOs will mostly be abstracted away.

However, we do need to get the UTXO Set for the addresses we’re managing.

```ts
let myAddresses = xchain.keyChain().getAddresses() //returns an array of addresses the KeyChain manages
let addressStrings = xchain.keyChain().getAddressStrings() //returns an array of addresses the KeyChain manages as strings
let utxos = (await xchain.getUTXOs(myAddresses)).utxos
```

## Spending the UTXOs

The `buildBaseTx()` helper function sends a single asset type. We have a
particular assetID whose coins we want to send to a recipient address. This is
an imaginary asset for this example which we believe to have 400 coins. Let’s
verify that we have the funds available for the transaction.

```ts
let assetid = "23wKfz3viWLmjWo2UZ7xWegjvnZFenGAVkouwQCeB9ubPXodG6" //avaSerialized string
let mybalance = utxos.getBalance(myAddresses, assetid) //returns 400 as a BN
```

We have 400 coins! We’re going to now send 100 of those coins to our friend’s address.

```ts
let sendAmount = new BN(100) //amounts are in BN format
let friendsAddress = "X-avax1k26jvfdzyukms95puxcceyzsa3lzwf5ftt0fjk" // address format is Bech32

//The below returns a UnsignedTx
//Parameters sent are (in order of appearance):
//   * The UTXO Set
//   * The amount being sent as a BN
//   * An array of addresses to send the funds
//   * An array of addresses sending the funds
//   * An array of addresses any leftover funds are sent
//   * The AssetID of the funds being sent
let unsignedTx = await xchain.buildBaseTx(
  utxos,
  sendAmount,
  [friendsAddress],
  addressStrings,
  addressStrings,
  assetid
)
let signedTx = unsignedTx.sign(myKeychain)
let txid = await xchain.issueTx(signedTx)
```

And the transaction is sent!

## Get the Status of the Transaction

Now that we sent the transaction to the network, it takes a few seconds to
determine if the transaction has gone through. We can get an updated status on
the transaction using the TxID through the X-Chain.

```ts
// returns one of: "Accepted", "Processing", "Unknown", and "Rejected"
let status = await xchain.getTxStatus(txid)
```

The statuses can be one of `Accepted`, `Processing`, `Unknown`, and `Rejected`

- "Accepted" indicates that the transaction has been accepted as valid by the network and executed
- "Processing" indicates that the transaction is being voted on.
- "Unknown" indicates that node knows nothing about the transaction, indicating
  the node doesn’t have it
- "Rejected" indicates the node knows about the transaction, but it conflicted with an accepted transaction

## Check the Results

The transaction finally came back as `Accepted`, now let’s update the UTXOSet
and verify that the transaction balance is as we expected.

_Note: In a real network the balance isn’t guaranteed to match this scenario.
Transaction fees or additional spends may vary the balance. For the purpose of
this example, we assume neither of those cases._

```ts
let updatedUTXOs = await xchain.getUTXOs()
let newBalance = updatedUTXOs.getBalance(myAddresses, assetid)
if (newBalance.toNumber() != mybalance.sub(sendAmount).toNumber()) {
  throw Error("heyyy these should equal!")
}
```
