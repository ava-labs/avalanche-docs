# Envía un activo en la X-Chain

Este ejemplo envía un activo en la X-Chain a un solo destinatario. El primer paso en este proceso es crear una instancia de Avalanche conectada a nuestro endpoint de la Plataforma de Avalanche de elección.

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

También suponemos que el keystore contiene una lista de direcciones utilizadas en esta transacción.

## Obtención del conjunto de UTXO<a id="getting-the-utxo-set"></a>

La X-Chain almacena todos los saldos disponibles en un almacén de datos llamado Salidas de Transacciones No Gastadas \(UTXOs\). Un conjunto de UTXO es la lista única de salidas producidas por las transacciones, las direcciones que pueden gastar esas salidas, y otras variables como los tiempos de bloqueo \(un timestamp después del cual la salida puede ser gastada\) y los límites \(cuántos firmantes se requieren para gastar la salida\).

Para el caso de este ejemplo, vamos a crear una simple transacción que consume una cantidad de monedas disponibles y la envía a una sola dirección sin ninguna restricción. La gestión de los UTXOs será mayormente abstraída.

Sin embargo, necesitamos obtener el conjunto de UTXO para las direcciones que estamos administrando.

```text
let myAddresses = xchain.keyChain().getAddresses(); //returns an array of addresses the KeyChain manages
let addressStrings = xchain.keyChain().getAddressStrings(); //returns an array of addresses the KeyChain manages as strings
let utxos = (await xchain.getUTXOs(myAddresses)).utxos;
```

## Gastar UTXOs<a id="spending-the-utxos"></a>

La función de `buildBaseTx()`ayuda envía un solo tipo de activo. Tenemos un assetID particular cuyas monedas queremos enviar a una dirección de destinatario. Este es un activo imaginario para este ejemplo que creemos que tiene 400 monedas. Verifiquemos que tenemos los fondos disponibles para la transacción.

```text
let assetid = "23wKfz3viWLmjWo2UZ7xWegjvnZFenGAVkouwQCeB9ubPXodG6"; //avaSerialized string
let mybalance = utxos.getBalance(myAddresses, assetid); //returns 400 as a BN
```

¡Tenemos 400 monedas! Ahora vamos a enviar 100 de esas monedas a la dirección de nuestro amigo.

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

## Obtén el estado de la transacción<a id="get-the-status-of-the-transaction"></a>

Ahora que enviamos la transacción a la red, lleva unos segundos determinar si la transacción ha sido aprobada. Podemos obtener un estado actualizado de la transacción usando el TxID a través de la X-Chain.

```text
// returns one of: "Accepted", "Processing", "Unknown", and "Rejected"
let status = await xchain.getTxStatus(txid);
```

Las estadísticas pueden ser uno de "Aceptado", "Procesamiento", "Desconocido" y "Rechazado":

* "aceptado" indica que la transacción ha sido aceptada como válida por la red y ejecutada
* "Procesamiento" indica que la transacción está siendo votada
* "Desconocido" indica que el nodo no sabe nada sobre la transacción, indicando que el nodo no la tiene
* "Rejected" indica que el nodo sabe sobre la transacción, pero contraviene con una transacción aceptada

## Consulta los resultados<a id="check-the-results"></a>

La transacción finalmente volvió como "Aceptada", ahora actualizemos la UTXOSet y verificamos que el saldo de transacción es como esperábamos.

_Nota: En una red real, el saldo no está garantizado para coincidir con este escenario. Las comisiones de transacción o los gastos adicionales pueden variar el saldo. Para el propósito de este ejemplo, asumimos ninguno de esos casos._

```text
let updatedUTXOs = await xchain.getUTXOs();
let newBalance = updatedUTXOs.getBalance(myAddresses, assetid);
if(newBalance.toNumber() != mybalance.sub(sendAmount).toNumber()){
    throw Error("heyyy these should equal!");
}
```

