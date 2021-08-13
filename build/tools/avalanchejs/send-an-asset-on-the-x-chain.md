# Envoyer un actif sur la chaîne X-

Cet exemple envoie un actif dans la chaîne X à un seul destinataire. La première étape de ce processus est de créer une instance d'Avalanche connectée à notre extrémité de la plateforme Avalanche.

```text
import {
    Avalanche,
    BinTools,
    Buffer,
    BN
  } from "avalanche"

let myNetworkID = 1; //default is 3, we want to override that for our local network
let myBlockchainID = "2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM"; // The X-Chain blockchainID on this network
let avax = new avalanche.Avalanche("localhost", 9650, "http", myNetworkID, myBlockchainID);
let xchain = avax.XChain(); //returns a reference to the X-Chain used by AvalancheJS
```

Nous supposons également que la keystore contient une liste d'adresses utilisées dans cette transaction.

## Obtenir l'ensemble UTXO<a id="getting-the-utxo-set"></a>

La chaîne X-Chain tous les soldes disponibles dans un datastore appelé Extrants de transaction non dépensés \(UTXOs\). Un ensemble UTXO est la liste unique des sorties produites par les transactions, les adresses qui peuvent dépenser ces sorties, et d'autres variables telles que les temps de verrouillage \(un estampillage après lequel la sortie peut être dépensée\) et les seuils \(combien de signers sont nécessaires pour dépenser la sortie\).

Pour le cas de cet exemple, nous allons créer une transaction simple qui dépense une quantité de pièces disponibles et l'envoie à une seule adresse sans aucune restriction. La gestion des UTXOs sera principalement abstraite.

Cependant, nous avons besoin d'obtenir l'ensemble UTXO pour les adresses que nous gérons.

```text
let myAddresses = xchain.keyChain().getAddresses(); //returns an array of addresses the KeyChain manages
let addressStrings = xchain.keyChain().getAddressStrings(); //returns an array of addresses the KeyChain manages as strings
let utxos = (await xchain.getUTXOs(myAddresses)).utxos;
```

## Dépenses des UTXOs<a id="spending-the-utxos"></a>

La fonction `buildBaseTx()` aide envoie un type d'actif unique. Nous avons un certain assetID dont nous voulons envoyer les pièces à une adresse destinataire. C'est un atout imaginaire pour cet exemple que nous croyons avoir 400 pièces. Vérifions que nous avons les fonds disponibles pour la transaction.

```text
let assetid = "23wKfz3viWLmjWo2UZ7xWegjvnZFenGAVkouwQCeB9ubPXodG6"; //avaSerialized string
let mybalance = utxos.getBalance(myAddresses, assetid); //returns 400 as a BN
```

Nous avons 400 pièces! Nous allons maintenant envoyer 100 de ces pièces à l'adresse de notre ami.

```text
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
let signedTx = unsignedTx.sign(myKeychain)
let txid = await xchain.issueTx(signedTx);
```

Et la transaction est envoyée!

## Obtenez le statut de la transaction<a id="get-the-status-of-the-transaction"></a>

Maintenant que nous avons envoyé la transaction au réseau, il faut quelques secondes pour déterminer si la transaction a été effectuée. Nous pouvons obtenir un statut mis à jour sur la transaction à l'aide du TxID via la chaîne X.

```text
// returns one of: "Accepted", "Processing", "Unknown", and "Rejected"
let status = await xchain.getTxStatus(txid);
```

Les statuts peuvent être l'un des statuts "acceptés", "traitement", "inconnu" et "rejetés":

* "Accepté" indique que la transaction a été acceptée comme valide par le réseau et exécutée
* « traitement » indique que la transaction est votée dessus.
* "Inconnu" indique que le noeud ne sait rien de la transaction, indiquant que le noeud ne l'a pas
* "Rejeté" indique que le noeud sait sur la transaction, mais il est en conflit avec une transaction acceptée

## Vérifier les résultats<a id="check-the-results"></a>

La transaction est finalement revenue comme "Acceptée", maintenant mettons à jour let’s et vérifions que le solde de la transaction est comme nous nous attendions.

_Note: Dans un vrai réseau, le solde n'est pas garanti pour correspondre à ce scénario. Les frais de transaction ou les dépenses supplémentaires peuvent varier le solde. Aux fins de cet exemple, nous ne supposons aucun de ces cas._

```text
let updatedUTXOs = await xchain.getUTXOs();
let newBalance = updatedUTXOs.getBalance(myAddresses, assetid);
if(newBalance.toNumber() != mybalance.sub(sendAmount).toNumber()){
    throw Error("heyyy these should equal!");
}
```

