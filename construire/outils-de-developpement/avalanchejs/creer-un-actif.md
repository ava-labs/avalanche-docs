---
description: Création d'un actif et publication sur la plateforme Avalanche (X-Chain)
---

# Créer un actif sur la X-Chain

Cet exemple crée un actif dans la X-Chain et le publie sur la plate-forme Avalanche. La première étape de ce processus consiste à créer une instance d'AvalancheJS connectée à notre point de terminaison Avalanche Platform de choix.

```cpp
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

## Décrivez le nouvel actif <a id="describe-the-new-asset"></a>

La première étape de la création d'un nouvel actif à l'aide d'AvalancheJS consiste à déterminer les qualités de l'actif. Nous donnerons à l'actif un nom, un symbole boursier, ainsi qu'une dénomination.

```cpp
// Name our new coin and give it a symbol
let name = "Rickcoin is the most intelligent coin";
let symbol = "RICK";

// Where is the decimal point indicate what 1 asset is and where fractional assets begin
// Ex: 1 AVAX is denomination 9, so the smallest unit of AVAX is nanoAVAX (nAVAX) at 10^-9 AVAX
let denomination = 9;
```

## Création de l'état initial <a id="creating-the-initial-state"></a>

Nous voulons frapper un actif avec 400 pièces pour toutes nos clés gérées, 500 à la deuxième adresse que nous connaissons et 600 aux deuxième et troisième adresses. Cela configure l'état qui résultera de la transaction Créer un actif.

Remarque : Cet exemple suppose que les clés sont déjà gérées dans le KeyChain de notre X-Chain.

```cpp
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

## Création de la transaction signée <a id="creating-the-signed-transaction"></a>

Maintenant que nous savons à quoi nous voulons qu'un actif ressemble, nous créons une sortie à envoyer au réseau. Il existe une fonction d'assistance AVM `buildCreateAssetTx ()` qui fait exactement cela.

```cpp
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

## Émettre la transaction signée <a id="issue-the-signed-transaction"></a>

Now that we have a signed transaction ready to send to the network, let’s issue it!

Maintenant que nous avons une transaction signée prête à être envoyée au réseau, émettons-la! En utilisant l'API X-Chain AvalancheJS, nous allons appeler la fonction `issueTx`. Cette fonction peut prendre la classe Tx renvoyée à l'étape précédente, une représentation CB58 de la transaction ou une classe Buffer brute avec les données de la transaction. Des exemples de chacun sont ci-dessous:

```cpp
// using the Tx class
let txid = await xchain.issueTx(signed); //returns a CB58 serialized string for the TxID
```

```cpp
// using the base-58 representation
let txid = await xchain.issueTx(signed.toString()); //returns a CB58 serialized string for the TxID
```

```cpp
// using the transaction Buffer
let txid = await xchain.issueTx(signed.toBuffer()); //returns a CB58 serialized string for the TxID
```

Nous supposons qu'une de ces méthodes est utilisée pour émettre la transaction.

## Obtenez le statut de la transaction <a id="get-the-status-of-the-transaction"></a>

Maintenant que nous avons envoyé la transaction au réseau, il faut quelques secondes pour déterminer si la transaction a abouti. Nous pouvons obtenir un statut mis à jour sur la transaction en utilisant le TxID via l'API AVM.

```cpp
// returns one of: "Accepted", "Processing", "Unknown", and "Rejected"
let status = await xchain.getTxStatus(txid);
```

Les statuts peuvent être l'un des suivants: “Accepted”, “Processing”, “Unknown”, and “Rejected”:

* “Accepted” indique que la transaction a été acceptée comme valide par le réseau et exécutée.
* “Processing” indique que la transaction fait l'objet d'un vote.
* “Unknown” indique que le nœud ne sait rien de la transaction, ce qui indique que le nœud ne l'a pas.
* “Rejected” iindique que le nœud connaît la transaction, mais qu'elle est en conflit avec une transaction acceptée.

## Identification de l'actif nouvellement créé <a id="identifying-the-newly-created-asset"></a>

La X-Chain utilise le TxID de la transaction qui a créé l'actif comme identifiant unique de l'actif. Cet identifiant unique est désormais appelé «`AssetID`» de l'actif. Lorsque les actifs sont échangés autour de la chaîne X, ils référencent toujours l'`AssetID` qu'ils représentent.

