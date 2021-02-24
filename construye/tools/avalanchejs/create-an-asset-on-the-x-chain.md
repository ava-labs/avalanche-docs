# Crear un activo en la X-Chain

Este ejemplo crea un activo en la X-Chain y lo publica en la plataforma Avalanche. El primer paso de este proceso es crear una instancia de AvalancheJS conectada a nuestro Endpoint de elección de la plataforma Avalanche.

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
let name = "Rickcoin es la moneda más inteligente";
let symbol = "RICK";

// Donde la coma decimal indica que es 1 activo y donde comienzan los activos fraccionarios
// Ejemplo: 1 AVAX es denominación  9, así que la unidad más pequeña de AVAX es nanoAVAX (nAVAX) a 10^-9 AVAX
let denomination = 9;
```

## Creando el estado inicial

Queremos acuñar un activo con 400 monedas para todas nuestras llaves administradas, 500 para la segunda dirección que conocemos, y 600 para la segunda y tercera dirección. Esto establece el estado que resultará de la transacción de Crear Activo.

_Nota: Este ejemplo asume que ya tenemos las llaves administradas en el Keychain de nuestra X-Chain._

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

Creación de la transacción firmada

Ahora que sabemos cómo queremos que se vea un activo, creamos una salida para enviar a la red. Hay una función de ayuda de AVM `buildCreateAssetTx()` que hace precisamente eso.

```text
// Obtiene el UTXOSet para nuestra dirección
let utxos = await xchain.getUTXOs(addresses);

// Realizar una transacción Create Asset sin firmar a partir de los datos compilados anteriormente
let unsigned = await xchain.buildCreateAssetTx(
  utxos, // el UTXOSet que contiene los UTXOs que vamos a gastar
  addresses, // las direcciones que pagarán las comisiones
  addresses, // las direcciones que reciben el cambio de los UTXOs gastados
  initialState, // el estado inicial que se creará para este nuevo activo 
  name, // el nombre completo del activo
  symbol, // un símbolo identificador corto para el activo
  denomination // la denominación del activo 
);

let signed = xchain.keyChain().signTx(unsigned); //retorna una Tx class
```

## Emitir la transacción firmada

Ahora que tenemos una transacción firmada lista para enviarla a la red, vamos a emitirla!

Usando la API de AvalancheJS X-Chain, vamos a ejecutar la función issueTx. Esta función puede tomar la Tx class devuelta en el paso anterior, una representación [CB58](http://support.avalabs.org/en/articles/4587395-what-is-cb58) de la transacción, o una clase Buffer sin procesar con los datos de la transacción. A continuación se presentan ejemplos de cada una de ellas:

```text
// uusando la Tx class
let txid = await xchain.issueTx(signed); //devuelve una cadena serializada CB58 para el TxID
```

```text
// usando la representación base-58
let txid = await xchain.issueTx(signed.toString()); //devuelve una cadena serializada CB58 para el TxID
```

```text
// usando el Buffer de la transacción
let txid = await xchain.issueTx(signed.toBuffer()); //devuelve una cadena serializada CB58 para el TxID
```

Suponemos que UNO de esos métodos se utiliza para emitir la transacción.

## Obtener el estado de la transacción <a id="get-the-status-of-the-transaction"></a>

Ahora que enviamos la transacción a la red, lleva unos segundos determinar si la transacción ha sido aprobada. Podemos obtener un estado actualizado de la transacción usando el TxID a través de la API de AVM.

```text
// retorna cualquiera entre: "Accepted", "Processing", "Unknown", y "Rejected"
let status = await xchain.getTxStatus(txid);
```

Los estados pueden ser "Aceptado", "Procesando", "Desconocido" y "Rechazado":

* "Aceptada" indica que la transacción ha sido aceptada como válida por la red y ejecutada
* "Procesamiento" indica que la transacción está siendo votada.
* "Desconocido" indica que el nodo no sabe nada de la transacción, lo que indica que el nodo no lo tiene
* "Rechazado" indica que el nodo sabe de la transacción, pero entró en conflicto con una transacción aceptada

## Identificar el activo recién creado <a id="identifying-the-newly-created-asset"></a>

La X-Chain utiliza el TxID de la transacción que creó el activo como identificador único del mismo. Este identificador único se conoce en adelante como el "AssetID" del activo. Cuando los activos se negocian en la X-Chain, siempre hacen referencia al AssetID que representan.

