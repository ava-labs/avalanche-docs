# Crear un activo en la cadena X

Este ejemplo crea un activo en la cadena X y lo publica a la plataforma Avalanche. El primer paso en este proceso es crear una instancia de AvalanchejS conectada a nuestra plataforma de Avalanche. En este ejemplo estamos utilizando la red local `12345` a través de [Avash](https://github.com/ava-labs/avalanche-docs/tree/bba457018ce99b2a1bdf51e488b136049254e330/build/tools/avash/README.md). Los ejemplos de código están escritos en tipos. El guion está completo, tanto en full, como en javascript, después de los pasos individuales.

```typescript
import {
  Avalanche,
  BinTools,
  BN,
  Buffer
 } from "avalanche"
import {
  AVMAPI,
  InitialStates,
  KeyChain,
  SECPMintOutput,
  SECPTransferOutput,
  Tx,
  UnsignedTx,
  UTXOSet
} from "avalanche/dist/apis/avm"
import {
  iAVMUTXOResponse
} from "avalanche/dist/apis/avm/interfaces"

const ip: string = "localhost"
const port: number = 9650
const protocol: string = "http"
const networkID: number = 12345 // Default is 1, we want to override that for our local network
const avalanche: Avalanche = new Avalanche(ip, port, protocol, networkID)
const xchain: AVMAPI = avalanche.XChain() // Returns a reference to the X-Chain used by AvalancheJS
```

## Importar la dirección prefinanciada de la red local

A continuación obtenemos una instancia de bintools, para tratar con datos binarios, un llavero local de cadena X. La red local `12345` tiene una dirección prefinanciada a la que puede acceder con la clave privada `PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGztUrTXtNNN`. Por último, obtener la dirección prefinanciada como `Buffer` y como `una cadena`.

```typescript
const bintools: BinTools = BinTools.getInstance()
const xKeychain: KeyChain = xchain.keyChain()
const privKey: string = "PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN"
xKeychain.importKey(privKey)
const xAddresses: Buffer[] = xchain.keyChain().getAddresses()
const xAddressStrings: string[] = xchain.keyChain().getAddressStrings()
```

## Prepararse para la salida de la menta

Ahora necesitamos crear una matriz vacía para la `SECPMintOutput` que vamos a crear. También necesitamos un `umbral` y `tiempo` de bloqueo para las salidas que vamos a crear. Cada transacción de cadena X puede contener un campo de `memo` de hasta 256 bytes. de datos arbitrarios.

```typescript
const outputs: SECPMintOutput[] = []
const threshold: number = 1
const locktime: BN = new BN(0)
const memo: Buffer = bintools.stringToBuffer("AVM utility method buildCreateAssetTx to create an ANT")
```

## Describir el nuevo activo

El primer paso en la creación de un nuevo activo utilizando AvalanchejS es determinar las cualidades del activo. Daremos al activo un nombre, un símbolo de ticker, así como una denominación.

```typescript
const name: string = "TestToken"
const symbol: string = "TEST"
// Where is the decimal point indicate what 1 asset is and where fractional assets begin
// Ex: 1 AVAX is denomination 9, so the smallest unit of AVAX is nanoAVAX (nAVAX) at 10^-9 AVAX
const denomination: number = 3
```

## Configurar async/aguardar

El código restante se encapsulará por esta función `principal` para que podamos utilizar el patrón `async` / `espere.`

```typescript
const main = async (): Promise<any> => {
}
main()
```

## Coge el UTXO

Pase las cadenas `xAddressStrings` a `xchain.getUTXOS` para buscar el UTXO.

```typescript
  const avmUTXOResponse: iAVMUTXOResponse = await xchain.getUTXOs(xAddressStrings)
  const utxoSet: UTXOSet = avmUTXOResponse.utxos
```

## Creación del estado inicial

Queremos mintar un activo con 507 unidades del activo que posee la clave administrada. Esto establece el estado que resultará de la transacción de Crear Activos.

```typescript
// Create outputs for the asset's initial state
const amount: BN = new BN(507)
const secpTransferOutput = new SECPTransferOutput(amount, xAddresses, locktime, threshold)
const initialStates: InitialStates = new InitialStates()

// Populate the initialStates with the outputs
initialStates.addOutput(secpTransferOutput)
```

## Crear la salida de la menta

También queremos crear una `SECPMintOutput` para que podamos hacer menta más de este activo más tarde.

```typescript
const secpMintOutput: SECPMintOutput = new SECPMintOutput(xAddresses, locktime, threshold)
outputs.push(secpMintOutput
```

## Creación de la transacción firmada

Ahora que sabemos cómo queremos que se vea un activo, creamos una transacción para enviar a la red. Hay una función de ayuda AVM `buildCreateAssetTx()` que hace justo eso.

```typescript
const unsignedTx: UnsignedTx = await xchain.buildCreateAssetTx(
  utxoSet,
  xAddressStrings,
  xAddressStrings,
  initialStates,
  name,
  symbol,
  denomination,
  outputs,
  memo
)
```

## Firma y emite la transacción

Ahora firmemos la transacción y emitamos a la red Avalanche. Si es exitoso, devolverá una cadena serializada [CB58](http://support.avalabs.org/en/articles/4587395-what-is-cb58) para el TxID.

Ahora que tenemos una transacción firmada lista para enviar a la red, let’s

```typescript
const tx: Tx = unsignedTx.sign(xKeychain)
const id: string = await xchain.issueTx(tx)
console.log(id)
```

## Obtener el estado de la transacción<a id="get-the-status-of-the-transaction"></a>

Ahora que enviamos la transacción a la red, tarda unos segundos en determinar si la transacción ha pasado. Podemos obtener un estado actualizado en la transacción utilizando el TxID a través de la API AVM.

```typescript
// returns one of: "Accepted", "Processing", "Unknown", and "Rejected"
const status: string = await xchain.getTxStatus(id)
```

Los estatus, que pueden ser uno de "Aceptados", "Procesamiento", "Desconocido" y "Rechazado":

* "Aceptado" indica que la transacción ha sido aceptada como válida por la red y ejecutada
* "Procesamiento" indica que la transacción está siendo votada.
* "Desconocido" indica que el nodo no sabe nada sobre la transacción, indicando que el nodo no lo tiene.
* "Rechazado" indica que el nodo sabe sobre la transacción, pero se opuso a una transacción aceptada

## Identificar el activo recién creado<a id="identifying-the-newly-created-asset"></a>

La cadena X utiliza el TxID de la transacción que creó el activo como identificador único para el activo. Este identificador único es conocido en adelante como el "AssetID" del activo. Cuando los activos se comercializan alrededor de la cadena X, siempre hacen referencia al AssetID que representan.

