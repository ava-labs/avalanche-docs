---
description: Envoyer un actif de la X-Chain vers un récipient unique
---

# Envoyer un actif sur la X-Chain

Cet exemple envoie un élément de la X-Chain à un seul destinataire. La première étape de ce processus consiste à créer une instance d'Avalanche connectée à notre point de terminaison Avalanche Platform de choix.

```cpp
import {
    Avalanche,
    BinTools,
    Buffer,
    BN
  } from "avalanche" 

let myNetworkID = 1; //default is 3, we want to override that for our local network
let myBlockchainID = "GJABrZ9A6UQFpwjPU8MDxDd8vuyRoDVeDAXc694wJ5t3zEkhU"; // The X-Chain blockchainID on this network
let avax = new avalanche.Avalanche("localhost", 9650, "http", myNetworkID, myBlockchainID);
let xchain = avax.XChain(); //returns a reference to the X-Chain used by AvalancheJS
```

Nous supposons également que le KeyStore contient une liste d'adresses utilisées dans cette transaction.

### Obtenir l'ensemble UTXO <a id="getting-the-utxo-set"></a>

La X-Chain stocke tous les soldes disponibles dans une banque de données appelée Sorties de transaction non dépensées \(UTXO\). Un ensemble UTXO est la liste unique des sorties produites par les transactions, les adresses qui peuvent dépenser ces sorties et d'autres variables telles que les temps de verrouillage \(un horodatage après lequel la sortie peut être dépensée\) et les seuils \(combien de signataires sont nécessaires pour dépenser la sortie \).

Dans le cas de cet exemple, nous allons créer une transaction simple qui dépense une quantité de pièces disponibles et l'envoie à une seule adresse sans aucune restriction. La gestion des UTXO sera pour la plupart abstraite.

Cependant, nous devons obtenir l'ensemble UTXO pour les adresses que nous gérons.

```cpp
let myAddresses = xchain.keyChain().getAddresses(); //returns an array of addresses the KeyChain manages
let addressStrings = xchain.keyChain().getAddressStrings(); //returns an array of addresses the KeyChain manages as strings
let utxos = await xchain.getUTXOs(myAddresses);
```

### Dépenser les UTXOs <a id="spending-the-utxos"></a>

La fonction d'assistance `buildBaseTx ()` envoie un seul type d'actif. Nous avons un assetID particulier dont nous voulons envoyer les pièces à une adresse de destinataire. C'est un atout imaginaire pour cet exemple que nous pensons avoir 400 pièces. Vérifions que nous avons les fonds disponibles pour la transaction.

```cpp
let assetid = "23wKfz3viWLmjWo2UZ7xWegjvnZFenGAVkouwQCeB9ubPXodG6"; //avaSerialized string
let mybalance = utxos.getBalance(myAddresses, assetid); //returns 400 as a BN
```

Nous avons 400 pièces! Nous allons maintenant envoyer 100 de ces pièces à l'adresse de notre ami.

```cpp
let sendAmount = new BN(100); //amounts are in BN format
let friendsAddress = "X-avax1k26jvfdzyukms95puxcceyzsa3lzwf5ftt0fjk"; // address format is Bech32

//The below returns a UnsignedTx
//Parameters sent are (in order of appearance):
//   * The UTXO Set
//   * The amount being sent as a BN
//   * An array of addresses to send the funds
//   * An array of addresses sending the funds
//   * An array of addresses any leftover funds are sent
//   * The AssetID of the funds being sent
let unsignedTx = await xchain.buildBaseTx(utxos, sendAmount, [friendsAddress], addressStrings, addressStrings, assetid);
let signedTx = xchain.signTx(unsignedTx);
let txid = await xchain.issueTx(signedTx);
```

Et la transaction est envoyée !

### Obtenez le statut de la transaction <a id="get-the-status-of-the-transaction"></a>

Maintenant que nous avons envoyé la transaction au réseau, il faut quelques secondes pour déterminer si la transaction a abouti. Nous pouvons obtenir un statut mis à jour sur la transaction en utilisant le TxID via la X-Chain.

```cpp
// returns one of: "Accepted", "Processing", "Unknown", and "Rejected"
let status = await xchain.getTxStatus(txid);
```



Les statuts peuvent être l'un des suivants: “Accepted”, “Processing”, “Unknown”, and “Rejected”:

* “Accepted” indique que la transaction a été acceptée comme valide par le réseau et exécutée.
* “Processing” indique que la transaction fait l'objet d'un vote.
* “Unknown” indique que le nœud ne sait rien de la transaction, ce qui indique que le nœud ne l'a pas.
* “Rejected” iindique que le nœud connaît la transaction, mais qu'elle est en conflit avec une transaction acceptée.

### Vérifiez les résultats <a id="check-the-results"></a>

La transaction est finalement revenue comme "Accepted", mettons maintenant à jour l'UTXOSet et vérifions que le solde de la transaction est comme prévu.

_Remarque: dans un réseau réel, le solde n'est pas garanti pour correspondre à ce scénario. Les frais de transaction ou les dépenses supplémentaires peuvent faire varier le solde. Aux fins de cet exemple, nous n'assumons aucun de ces cas._

```cpp
let updatedUTXOs = await xchain.getUTXOs();
let newBalance = updatedUTXOs.getBalance(myAddresses, assetid);
if(newBalance.toNumber() != mybalance.sub(sendAmount).toNumber()){
    throw Error("heyyy these should equal!");
}
```

