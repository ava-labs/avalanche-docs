# Enviar un activo en la cadena X

Este ejemplo envía un activo en la cadena X a un solo destinatario. El primer paso en este proceso es crear una instancia de Avalanche conectada a nuestro punto de elección de la Plataforma Avalanche.

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

También asumimos que el keystore contiene una lista de direcciones utilizadas en esta transacción.

## Conseguir el juego UTXO<a id="getting-the-utxo-set"></a>

La cadena X almacena todos los saldos disponibles en una escala de datos llamada Salidas de Transacción no gastadas \(UTXOs\). Un UTXO Set es la lista única de salidas producidas por transacciones, direcciones que pueden gastar esas salidas y otras variables como tiempos de bloqueo \(una marca de tiempo después de la cual la salida puede ser gastada\) y umbrales \(cuántos firmantes se requieren para gastar la salida\).

Para el caso de este ejemplo, vamos a crear una transacción sencilla que gasta una cantidad de monedas disponibles y la envía a una sola dirección sin ninguna restricción. La gestión de las UTXOs se retirará en su mayoría.

Sin embargo, necesitamos obtener el conjunto UTXO para las direcciones que estamos dirigiendo.

```text
let myAddresses = xchain.keyChain().getAddresses(); //returns an array of addresses the KeyChain manages
let addressStrings = xchain.keyChain().getAddressStrings(); //returns an array of addresses the KeyChain manages as strings
let utxos = (await xchain.getUTXOs(myAddresses)).utxos;
```

## Gastar las UTXOS<a id="spending-the-utxos"></a>

La función de ayuda `buildBaseTx()` envía un único tipo de activo. Tenemos un determinado assetID cuyas monedas queremos enviar a una dirección del destinatario. Este es un activo imaginario por este ejemplo que creemos tener 400 monedas. Let’s que tenemos los fondos disponibles para la transacción.

```text
let assetid = "23wKfz3viWLmjWo2UZ7xWegjvnZFenGAVkouwQCeB9ubPXodG6"; //avaSerialized string
let mybalance = utxos.getBalance(myAddresses, assetid); //returns 400 as a BN
```

¡Tenemos 400 monedas! Ahora enviaremos 100 de esas monedas a la dirección de nuestro amigo.

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

¡Y la transacción es enviada!

## Obtener el estado de la transacción<a id="get-the-status-of-the-transaction"></a>

Ahora que enviamos la transacción a la red, tarda unos segundos en determinar si la transacción ha pasado. Podemos obtener un estado actualizado en la transacción utilizando el TxID a través de la cadena X.

```text
// returns one of: "Accepted", "Processing", "Unknown", and "Rejected"
let status = await xchain.getTxStatus(txid);
```

Los estatus, que pueden ser uno de "Aceptados", "Procesamiento", "Desconocido" y "Rechazado":

* "Aceptado" indica que la transacción ha sido aceptada como válida por la red y ejecutada
* "Procesamiento" indica que la transacción está siendo votada.
* "Desconocido" indica que el nodo no sabe nada sobre la transacción, indicando que el nodo no lo tiene.
* "Rechazado" indica que el nodo sabe sobre la transacción, pero se opuso a una transacción aceptada

## Compruebe los resultados<a id="check-the-results"></a>

La transacción finalmente volvió como "Aceptado", ahora actualizemos el UTXOSet y let’s que el saldo de transacción es como esperábamos.

_Nota: En una red real el equilibrio no está garantizado para que coincida con este escenario. Las tasas de transacción o los gastos adicionales pueden variar el equilibrio. A los efectos de este ejemplo, no asumimos ninguno de esos casos._

```text
let updatedUTXOs = await xchain.getUTXOs();
let newBalance = updatedUTXOs.getBalance(myAddresses, assetid);
if(newBalance.toNumber() != mybalance.sub(sendAmount).toNumber()){
    throw Error("heyyy these should equal!");
}
```

