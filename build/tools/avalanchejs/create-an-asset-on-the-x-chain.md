# Crear un activo en la X-Chain

Este ejemplo crea un activo en la X-Chain y lo publica en la plataforma Avalanche. El primer paso de este proceso es crear una instancia de AvalancheJS conectada a nuestro Endpoint de elección de la plataforma Avalanche. En este ejemplo estamos usando la red local a `12345`través de A[vash.](https://github.com/ava-labs/avalanche-docs/tree/bba457018ce99b2a1bdf51e488b136049254e330/build/tools/avash/README.md) Los ejemplos de código están escritos en tipos. El script está en pleno en los typescript y javascript, después de los pasos individuales.

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

## Importa la dirección prefinanciada de la red local

A continuación obtenemos una instancia de bintools para tratar con datos binarios, un blockchain local de X-Chain La red local `12345`tiene una dirección prefinanciada a la que puedes acceder con la clave privada.`PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN` Por último, obtén la dirección prefinanciada como una `Buffer`y como una .`string`

```typescript
const bintools: BinTools = BinTools.getInstance()
const xKeychain: KeyChain = xchain.keyChain()
const privKey: string = "PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN"
xKeychain.importKey(privKey)
const xAddresses: Buffer[] = xchain.keyChain().getAddresses()
const xAddressStrings: string[] = xchain.keyChain().getAddressStrings()
```

## Prepararse para la salida de acuñación

Ahora necesitamos crear una matriz vacía para la `SECPMintOutput`que vamos a crear. También necesitamos una `threshold`y `locktime`para las salidas que vamos a crear. Cada transacción de X-Chain puede contener un `memo`campo de hasta 256 bytes. de datos arbitrarios.

```typescript
const outputs: SECPMintOutput[] = []
const threshold: number = 1
const locktime: BN = new BN(0)
const memo: Buffer = bintools.stringToBuffer("AVM utility method buildCreateAssetTx to create an ANT")
```

## Describe el nuevo activo

El primer paso para crear un nuevo activo usando AvalancheJS es determinar las cualidades del activo. Le daremos al activo un nombre, un símbolo de identificación, así como una denominación.

```typescript
const name: string = "TestToken"
const symbol: string = "TEST"
// Where is the decimal point indicate what 1 asset is and where fractional assets begin
// Ex: 1 AVAX is denomination 9, so the smallest unit of AVAX is nanoAVAX (nAVAX) at 10^-9 AVAX
const denomination: number = 3
```

## Establece async/espere

El código restante será capsulado por esta `main`función de modo que podamos usar el / `async``await`patrón.

```typescript
const main = async (): Promise<any> => {
}
main()
```

## Fetch el UTXO

`xchain.getUTXOs`Pásese `xAddressStrings`a buscar el UTXO.

```typescript
  const avmUTXOResponse: iAVMUTXOResponse = await xchain.getUTXOs(xAddressStrings)
  const utxoSet: UTXOSet = avmUTXOResponse.utxos
```

## Creando el estado inicial

Queremos acuñar un activo con 507 unidades del activo mantenido por la clave gestionada. Esto establece el estado que resultará de la transacción de Crear Activo.

```typescript
// Create outputs for the asset's initial state
const amount: BN = new BN(507)
const secpTransferOutput = new SECPTransferOutput(amount, xAddresses, locktime, threshold)
const initialStates: InitialStates = new InitialStates()

// Populate the initialStates with the outputs
initialStates.addOutput(secpTransferOutput)
```

## Crea la salida de acuñación

También queremos crear un `SECPMintOutput`para que podamos acuñar más de este activo más tarde.

```typescript
const secpMintOutput: SECPMintOutput = new SECPMintOutput(xAddresses, locktime, threshold)
outputs.push(secpMintOutput
```

## Creación de la transacción firmada

Ahora que sabemos cómo queremos que se vea un activo, creamos una salida para enviar a la red. Hay una función de ayuda de AVM `buildCreateAssetTx()`que hace solo eso.

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

## Emitir la transacción firmada

Ahora firmemos la transacción y emitamos a la red de Avalanche. Si de éxito devolverá una cadena serializada [CB58](http://support.avalabs.org/en/articles/4587395-what-is-cb58) para el TxID.

Ahora que tenemos una transacción firmada preparada para enviar a la red, let’s

```typescript
const tx: Tx = unsignedTx.sign(xKeychain)
const id: string = await xchain.issueTx(tx)
console.log(id)
```

## Obtén el estado de la transacción<a id="get-the-status-of-the-transaction"></a>

Ahora que enviamos la transacción a la red, lleva unos segundos determinar si la transacción ha sido aprobada. Podemos obtener un estado actualizado de la transacción usando el TxID a través de la API de AVM.

```typescript
// returns one of: "Accepted", "Processing", "Unknown", and "Rejected"
const status: string = await xchain.getTxStatus(id)
```

Las estadísticas pueden ser uno de "Aceptado", "Procesamiento", "Desconocido" y "Rechazado":

* "aceptado" indica que la transacción ha sido aceptada como válida por la red y ejecutada
* "Procesamiento" indica que la transacción está siendo votada
* "Desconocido" indica que el nodo no sabe nada sobre la transacción, indicando que el nodo no la tiene
* "Rejected" indica que el nodo sabe sobre la transacción, pero contraviene con una transacción aceptada

## Identificar el activo recién creado<a id="identifying-the-newly-created-asset"></a>

La X-Chain utiliza el TxID de la transacción que creó el activo como identificador único del mismo. Este identificador único es conocido como el "AssetID" del activo. Cuando los activos se negocian en la X-Chain, siempre hacen referencia al AssetID que representan.

