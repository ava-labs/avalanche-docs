# Fuji

## Introducción

Fuji es la red de pruebas de la red de Avalanche Puedes usarlo para probar tu dapp o contrato inteligente después de que la hayas desarrollado localmente. \(Puedes usar [Avash](https://docs.avax.network/build/tools/avash) para probar cosas localmente.\) Fuji es típicamente en la misma versión que la Avalanche Mainnet, pero a veces está ejecutando una versión inédita de AvalancheGo. En general, puedes esperar que el comportamiento de Fuji sea aproximadamente lo mismo que Avalanche Mainnet. Herramientas como un explorador y billeteras deberían trabajar con la Testnet Fuji.

En este tutorial, revisaremos un flujo de trabajo de Fuji para mostrar cómo se puede usar. Haremos lo siguiente:

1. Generar una mnemonic de 24 palabras en inglés a través de AvalancheJS
2. Deriva direcciones de X-Chain externas a través de AvalancheJS
3. Obtén AVAX desde la grifo de Fuji
4. Enviar AVAX a AvalancheJS
5. Examinar la transacción resultante en el Explorador de Avalanche
6. Usa la mnemonic para iniciar sesión en la billetera web

## Generar un Mnemonic

Para comenzar, crearemos una frase mnemónica con [AvalancheJS](https://docs.avax.network/build/tools/avalanchejs). Mnemonics nos permiten codificar una seguridad fuerte en una frase legible por el hombre. AvalancheJS admite 10 idiomas, incluyendo inglés, japonés, español, italiano, francés, coreano, checo, Portuguese, chino Simplificado y chino

Primero, genera un mnemónico de 24 palabras de inglés [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) compatible con AvalancheJS.

```typescript
import { Mnemonic } from "avalanche"
const mnemonic: Mnemonic = Mnemonic.getInstance()
const strength: number = 256
const wordlist = mnemonic.getWordlists("english") as string[]
const m: string = mnemonic.generateMnemonic(strength, randomBytes, wordlist)
console.log(m)
// "pool hat domain flame stomach canal fury master farm gown tide supreme winner motion this first divide spray forum wall reopen bounce spider palm"
```

## Direcciones de derivación

Después de generar un mnemónico podemos usar AvalancheJS para derivar pares de claves jerárquicas deterministas \(HD\) de conformidad con la [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki).

```typescript
import HDNode from "avalanche/utils/hdnode"
const seed: Buffer = mnemonic.mnemonicToSeedSync(m)
const hdnode: HDNode = new HDNode(seed)

for (let i: number = 0; i <= 2; i++) {
  // Deriving the _i_th external BIP44 X-Chain address
  const child: HDNode = hdnode.derive(`m/44'/9000'/0'/0/${i}`)
  keychain.importKey(child.privateKeyCB58)
}

const xAddressStrings: string[] = xchain.keyChain().getAddressStrings()
console.log(xAddressStrings)
// [
//   'X-fuji1cfvdpdqyzpp8pq0g6trmjsrn9pt8nutsfm7a40',
//   'X-fuji1y75dj6qygj7frw2xtcfn724qfty4aadnmeth6y',
//   'X-fuji1p6n0vyjqgmp06f7pr405q2flqu9v93j383ncam'
// ]
```

**Tenga en cuenta **que estamos usando `keychain`que no se ha definido todavía. En [este ejemplo AvalancheJS](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/newKeyChain.ts) Hay enlaces a docenas de ejemplos de AvalancheJS en [los recursos enumerados](fuji-workflow.md#resources) a continuación.

Mientras tengas la frase menmonic, puedes regenerar tus claves privadas y las direcciones que controlan.

## Obtén un Drip de la Faucet de Fuji

Podemos obtener un "goteo" de AVAX desde el faucet de Fuji. Pasta la dirección en el [sitio web de Fuji](https://faucet.avax-test.network) Estos AVAX son para la Testnet de Fuji y no tienen valor monetario.

![Solicitar AVAX](../../../.gitbook/assets/faucet-request.png)

El faucet enviará algún AVAX a la dirección y devolverá un ID de transacción \(txID\). Este txID puede ser utilizado con el Explorador de Fuji para aprender más sobre la transacción.

![Recepción de AVAX](../../../.gitbook/assets/faucet-response.png)

### Consulta los detalles de transacciones

`2GjAMJrBUYs8RuK2bXrNCuu34fNpJVor2ubNzvcUDPo5t9nMct`El txID, puede ser visto en el [Explorador de Fuji](https://explorer.avax-test.network/tx/2GjAMJrBUYs8RuK2bXrNCuu34fNpJVor2ubNzvcUDPo5t9nMct) Avalanche también tiene un [Explorador de Mainnet](https://explorer.avax.network).

![Detalles de transacción Detalles de](../../../.gitbook/assets/explorer-1.png) ![entrada y salida](../../../.gitbook/assets/explorer-2.png)

### Obtén el equilibrio

También podemos usar el Explorador de Fuji para obtener el equilibrio para la 1ª dirección derivada de BIP44—[X-fuji1cfvdpdqyzpp8pq0g6trmjsrn9pt8nutsfm7a40](https://explorer.avax-test.network/address/fuji1cfvdpdqyzpp8pq0g6trmjsrn9pt8nutsfm7a40).

![1ª dirección derivada](../../../.gitbook/assets/balance-1.png) ![Balance 1ª transacciones](../../../.gitbook/assets/balance-2.png) de dirección derivada

Alternativamente, podemos usar AvalancheJS para obtener el equilibrio.

```typescript
const address: string = "X-fuji1cfvdpdqyzpp8pq0g6trmjsrn9pt8nutsfm7a40"
const balance: any = await xchain.getBalance(address, "AVAX")
console.log(balance)
// {
//   balance: '2000000000',
//   utxoIDs: [
//     {
//       txID: '2GjAMJrBUYs8RuK2bXrNCuu34fNpJVor2ubNzvcUDPo5t9nMct',
//       outputIndex: 0
//     }
//   ]
// }
```

## Enviar AVAX

El faucet envió 2 AVAX a la primera dirección que generamos. Enviemos AVAX desde la primera dirección a la segunda dirección

```typescript
// get the AVAX asset ID
const avaxAssetID: string = Defaults.network[networkID].X['avaxAssetID']

// get the AVAX balance for the 1st address
const getBalanceResponse: any = await xchain.getBalance(xAddressStrings[0], avaxAssetID)
const balance: BN = new BN(getBalanceResponse.balance)

// subtract the fee
const fee: BN = xchain.getDefaultTxFee()
const amount: BN = balance.sub(fee)

// get the UTXOs for the 1st address
const avmUTXOResponse: any = await xchain.getUTXOs(xAddressStrings[0])
const utxoSet: UTXOSet = avmUTXOResponse.utxos

// build an UnsignedTx sending AVAX from the first external BIP44 address to the second external BIP44 address
const unsignedTx: UnsignedTx = await xchain.buildBaseTx(
  utxoSet,
  amount,
  avaxAssetID,
  [xAddressStrings[1]],
  [xAddressStrings[0]],
  [xAddressStrings[1]]
)

// sign it
const tx: Tx = unsignedTx.sign(xKeychain)

// issue it and get a txid
const txid: string = await xchain.issueTx(tx)
console.log(`Success! TXID: ${txid}`)
// Success! TXID: ankMr1tD65A9SSto5w4ic1d31t6w42jeu8pfv6v4gRPpMg17g
```

### Comprobando que fué exitoso

`ankMr1tD65A9SSto5w4ic1d31t6w42jeu8pfv6v4gRPpMg17g`Podemos verificar que la transacción, fue exitosa usando AvalancheJS.

```typescript
const txid: string = "ankMr1tD65A9SSto5w4ic1d31t6w42jeu8pfv6v4gRPpMg17g"
const status: string = await xchain.getTxStatus(txid)
console.log(status)
// Accepted
```

Alternativamente, podemos usar el Explorador de Fuji La transacción puede ser vista en el [Explorador](https://explorer.avax-test.network/tx/ankMr1tD65A9SSto5w4ic1d31t6w42jeu8pfv6v4gRPpMg17g) de Fuji.

![Detalles de transacción Detalles de](../../../.gitbook/assets/explorer-3.png) ![entrada y salida](../../../.gitbook/assets/explorer-4.png)

#### Obtén el equilibrio

También podemos usar el Explorador de Fuji para obtener el equilibrio para la 2ª [dirección—X-fuji1y75dj6qygj7frw2xtcfn724qfty4aadnmet6y](https://explorer.avax-test.network/address/X-fuji1y75dj6qygj7frw2xtcfn724qfty4aadnmeth6y).

![2ª dirección derivada de saldo](../../../.gitbook/assets/balance-3.png) ![2ª segunda segunda](../../../.gitbook/assets/balance-4.png)

Alternativamente, podemos usar AvalancheJS para obtener el equilibrio.

```typescript
const address: string = "X-fuji1y75dj6qygj7frw2xtcfn724qfty4aadnmeth6y"
const balance: any = await xchain.getBalance(address, "AVAX")
console.log(balance)
// {
//   balance: '1999000000',
//   utxoIDs: [
//     {
//       txID: 'ankMr1tD65A9SSto5w4ic1d31t6w42jeu8pfv6v4gRPpMg17g',
//       outputIndex: 0
//     }
//   ]
// }
```

### Inicia sesión en la billetera de la Web

Por último, podemos usar la mnemonic para acceder a la [billetera de la Web](https://wallet.avax.network) de Avalanche. Veremos que tiene el saldo de AVAX y que auto-magically deriva la 3ª dirección de la mnemonic.

Usa el mnemonic para acceder a la billetera web.

![Acess](../../../.gitbook/assets/mnemonic.png)

El saldo es correcto y la dirección "activa" es la tercera dirección derivada.

![Balance de billetera Web](../../../.gitbook/assets/wallet-1.png) ![3ª dirección BIP44 derivada](../../../.gitbook/assets/wallet-2.png)

También ten en cuenta que la billetera GUI muestra que derivó las mismas 3 direcciones que nuestro script anterior.

![direcciones derivadas](../../../.gitbook/assets/wallet-3.png) ![de AvalancheJS](../../../.gitbook/assets/derived.png)

## Resumen

La Testnet de Fuji juega un papel crítico en las aplicaciones de pruebas y QAing, los contratos inteligentes y los productos financieros antes de implementar en la Mainnet. Herramientas como AvalancheJS, la API pública, la faucet y el explorador ayuda a asegurar que tu prueba y el entorno QA estén cerca de Mainnet de modo que puedas estar seguro cuando inicies en Mainnet.

## Recursos

Para recursos adicionales y valiosos vea a continuación.

### Faucet

El [Faucet](https://faucet.avax-test.network) de Fuji envía AVAX a las direcciones de X-Chain o C-Chain para ayudarte a probar. \(Esta red de testnet Avax no tiene valor.\)

### Billetera

La [billetera web](https://wallet.avax.network) de Avalanche es una billetera simple, segura y sin custodia para almacenar activos de Avalanche. Admite redes de Mainnet, Fuji y personalizadas.

### Explorador

El Explorador de Avalanche te permite explorar la red en [Mainnet](https://explorer.avax.network) y [Fuji](https://explorer.avax-test.network).

### API pública

Ver [aquí.](https://docs.avax.network/build/tools/public-api)

### Ejemplos de AvalancheJS

Hay más de [60 scripts](https://github.com/ava-labs/avalanchejs/tree/master/examples) de AvalancheJS que demuestran cómo se trata de activos y NFT, envían transacciones, agregan validadores y más.

