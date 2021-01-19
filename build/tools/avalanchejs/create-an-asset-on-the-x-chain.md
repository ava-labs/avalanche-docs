# Crear un activo en la X-Chain

Este ejemplo crea un activo en la X-Chain y lo publica en la plataforma Avalanche. El primer paso de este proceso es crear una instancia de AvalancheJS conectada a nuestro 
Endpoint de elección de la plataforma Avalanche.

```text
import {
    Avalanche,
    BinTools,
    Buffer,
    BN
  } from "avalanche" 
import {
    InitialStates,
    SECPTransferOutput
  } from "avalanche/dist/apis/avm"

let myNetworkID = 12345; //default is 3, we want to override that for our local network
let myBlockchainID = "GJABrZ9A6UQFpwjPU8MDxDd8vuyRoDVeDAXc694wJ5t3zEkhU"; // The X-Chain blockchainID on this network
let avax = new Avalanche("localhost", 9650, "http", myNetworkID, myBlockchainID);
let xchain = avax.XChain(); //returns a reference to the X-Chain used by AvalancheJS
```

## Describe el nuevo activo
El primer paso para crear un nuevo activo usando AvalancheJS es determinar las cualidades del activo. Le daremos al activo un nombre, un símbolo de identificación, así como una denominación.

```text
// Nombra nuestra nueva moneda y dale un símbolo
let name = "Rickcoin is the most intelligent coin";
let symbol = "RICK";

// Donde la coma decimal indica que es 1 activo y donde comienzan los activos fraccionarios
// Ejemplo: 1 AVAX es denominación  9, así que la unidad más pequeña de AVAX es nanoAVAX (nAVAX) a 10^-9 AVAX
let denomination = 9;
```

## Creating the initial state

We want to mint an asset with 400 coins to all of our managed keys, 500 to the second address we know of, and 600 to the second and third address. This sets up the state that will result from the Create Asset transaction.

_Note: This example assumes we have the keys already managed in our X-Chain’s Keychain._

```text
let addresses = xchain.keyChain().getAddresses();

// Create outputs for the asset's initial state
let secpOutput1 = new SECPTransferOutput(new BN(400), new BN(400), 1, addresses);
let secpOutput2 = new SECPTransferOutput(new BN(500), new BN(400), 1, [addresses[1]]);
let secpOutput3 = new SECPTransferOutput(new BN(600), new BN(400), 1, [addresses[1], addresses[2]]);

// Populate the initialStates with the outputs
let initialState = new InitialStates();
initialState.addOutput(secpOutput1);
initialState.addOutput(secpOutput2);
initialState.addOutput(secpOutput3);
```

## Creating the signed transaction

Now that we know what we want an asset to look like, we create an output to send to the network. There is an AVM helper function `buildCreateAssetTx()` which does just that.

```text
// Fetch the UTXOSet for our addresses
let utxos = await xchain.getUTXOs(addresses);

// Make an unsigned Create Asset transaction from the data compiled earlier
let unsigned = await xchain.buildCreateAssetTx(
  utxos, // the UTXOSet containing the UTXOs we're going to spend
  addresses, // the addresses which will pay the fees
  addresses, // the addresses which recieve the change from the spent UTXOs
  initialState, // the initial state to be created for this new asset 
  name, // the full name of the asset
  symbol, // a short ticker symbol for the asset
  denomination // the asse's denomination 
);

let signed = xchain.keyChain().signTx(unsigned); //returns a Tx class
```

## Issue the signed transaction

Now that we have a signed transaction ready to send to the network, let’s issue it!

Using the AvalancheJS X-Chain API, we going to call the issueTx function. This function can take either the Tx class returned in the previous step, a [CB58](http://support.avalabs.org/en/articles/4587395-what-is-cb58) representation of the transaction, or a raw Buffer class with the data for the transaction. Examples of each are below:

```text
// using the Tx class
let txid = await xchain.issueTx(signed); //returns a CB58 serialized string for the TxID
```

```text
// using the base-58 representation
let txid = await xchain.issueTx(signed.toString()); //returns a CB58 serialized string for the TxID
```

```text
// using the transaction Buffer
let txid = await xchain.issueTx(signed.toBuffer()); //returns a CB58 serialized string for the TxID
```

We assume ONE of those methods is used to issue the transaction.

## Get the status of the transaction <a id="get-the-status-of-the-transaction"></a>

Now that we sent the transaction to the network, it takes a few seconds to determine if the transaction has gone through. We can get an updated status on the transaction using the TxID through the AVM API.

```text
// returns one of: "Accepted", "Processing", "Unknown", and "Rejected"
let status = await xchain.getTxStatus(txid);
```

The statuses can be one of “Accepted”, “Processing”, “Unknown”, and “Rejected”:

* “Accepted” indicates that the transaction has been accepted as valid by the network and executed
* “Processing” indicates that the transaction is being voted on.
* “Unknown” indicates that node knows nothing about the transaction, indicating the node doesn’t have it
* “Rejected” indicates the node knows about the transaction, but it conflicted with an accepted transaction

## Identifying the newly created asset <a id="identifying-the-newly-created-asset"></a>

The X-Chain uses the TxID of the transaction which created the asset as the unique identifier for the asset. This unique identifier is henceforth known as the “AssetID” of the asset. When assets are traded around the X-Chain, they always reference the AssetID that they represent.

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE0NjE2ODg1MjBdfQ==
-->