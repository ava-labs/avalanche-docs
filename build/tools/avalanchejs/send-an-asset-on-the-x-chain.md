# Envíe un activo en la X-Chain

Este ejemplo envía un activo en la X-Chain a un solo destinatario. El primer paso en este proceso es crear una instancia de Avalanche conectada a nuestro endpoint de la Plataforma de Avalanche de elección.

```text
import {
    Avalanche,
    BinTools,
    Buffer,
    BN
  } from "avalanche" 

let myNetworkID = 1; //por defecto es 3, queremos anular eso para nuestra red local
let myBlockchainID = "2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM"; // La blockchainID de la X-Chain en esta red
let avax = new avalanche.Avalanche("localhost", 9650, "http", myNetworkID, myBlockchainID);
let xchain = avax.XChain(); //devuelve una referencia a la X-Chain usada por AvalancheJS
```

También suponemos que el keystore contiene una lista de direcciones utilizadas en esta transacción.

## Obteniendo el Set UTXO<a id="getting-the-utxo-set"></a>


La X-Chain almacena todos los saldos disponibles en un almacén de datos llamado Salidas de Transacciones No Gastadas \(UTXOs\). Un conjunto de UTXO es la lista única de salidas producidas por las transacciones, las direcciones que pueden gastar esas salidas, y otras variables como los tiempos de bloqueo \(un timestamp después del cual la salida puede ser gastada\) y los límites \(cuántos firmantes se requieren para gastar la salida\).

Para el caso de este ejemplo, vamos a crear una simple transacción que consume una cantidad de monedas disponibles y la envía a una sola dirección sin ninguna restricción. La gestión de los UTXOs será mayormente abstraída.

Sin embargo, necesitamos obtener el conjunto de UTXO para las direcciones que estamos administrando.

```text
let myAddresses = xchain.keyChain().getAddresses(); //devuelve un conjunto de direcciones que el KeyChain maneja
let addressStrings = xchain.keyChain().getAddressStrings(); //devuelve un conjunto de direcciones que el KeyChain maneja como cadenas
let utxos = (await xchain.getUTXOs(myAddresses)).utxos;
```

## Utilizando los UTXOs <a id="spending-the-utxos"></a>

La función de ayuda `buildBaseTx()` envía un único tipo de activo. Tenemos un assetID particular cuyas monedas queremos enviar a una dirección de destinatario. Este es un activo imaginario para este ejemplo que creemos que tiene 400 monedas. Verifiquemos que tenemos los fondos disponibles para la transacción.
```text
let assetid = "23wKfz3viWLmjWo2UZ7xWegjvnZFenGAVkouwQCeB9ubPXodG6"; //avaSerialized string
let mybalance = utxos.getBalance(myAddresses, assetid); //retorna 400 como BN
```

¡Tenemos 400 monedas! Ahora vamos a enviar 100 de esas monedas a la dirección de nuestro amigo.
```text
let sendAmount = new BN(100); //los montos están en formato BN
let friendsAddress = "X-avax1k26jvfdzyukms95puxcceyzsa3lzwf5ftt0fjk"; // el formato de la dirección es Bech32

//El siguiente devuelve un UnsignedTx
//Los parámetros enviados son (en orden de aparición):
//    * El set de UTXO
//    * La cantidad que se envía como BN
//    * Una serie de direcciones para enviar los fondos
//    * Una serie de direcciones que envían los fondos
//    * Una serie de direcciones donde se envían los fondos sobrantes
//    * El AssetID de los fondos que se envían
let unsignedTx = await xchain.buildBaseTx(utxos, sendAmount, [friendsAddress], addressStrings, addressStrings, assetid);
let signedTx = unsignedTx.sign(myKeychain)
let txid = await xchain.issueTx(signedTx);
```

¡Y la transacción es enviada!

## Obtener estado de la transacción <a id="get-the-status-of-the-transaction"></a>

Ahora que enviamos la transacción a la red, lleva unos segundos determinar si la transacción ha sido aprobada. Podemos obtener un estado actualizado de la transacción usando el TxID a través de la X-Chain.

```text
// retorna cualquiera entre: "Accepted", "Processing", "Unknown", y "Rejected"
let status = await xchain.getTxStatus(txid);
```

Los estados pueden ser "Aceptado", "Procesando", "Desconocido" y "Rechazado":

* "Aceptada" indica que la transacción ha sido aceptada como válida por la red y ejecutada
* "Procesamiento" indica que la transacción está siendo votada.
* "Desconocido" indica que el nodo no sabe nada de la transacción, lo que indica que el nodo no lo tiene
* "Rechazado" indica que el nodo sabe de la transacción, pero entró en conflicto con una transacción aceptada

## Revisa los resultados <a id="check-the-results"></a>

The transaction finally came back as “Accepted”, now let’s update the UTXOSet and verify that the transaction balance is as we expected.

_Note: In a real network the balance isn’t guaranteed to match this scenario. Transaction fees or additional spends may vary the balance. For the purpose of this example, we assume neither of those cases._

```text
let updatedUTXOs = await xchain.getUTXOs();
let newBalance = updatedUTXOs.getBalance(myAddresses, assetid);
if(newBalance.toNumber() != mybalance.sub(sendAmount).toNumber()){
    throw Error("heyyy these should equal!");
}
```

<!--stackedit_data:
eyJoaXN0b3J5IjpbODI1ODA0NjYzLDE0MTQ3Nzc0MjUsLTY3ND
AwNTI5Nl19
-->