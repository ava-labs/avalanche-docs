# Fuji Workflow.

## Introducción

Fuji es la red de pruebas de la red Avalanche. Puede usarlo para probar su dapp o contrato inteligente después de que lo hayas desarrollado localmente. \(Puede usar [Avash](https://docs.avax.network/build/tools/avash) para probar las cosas localmente. \) Fuji está típicamente en la misma versión que el Avalanche Mainnet, pero a veces está ejecutando una versión inédita de AvalancheGo. En general, puedes esperar que el comportamiento de Fuji sea casi lo mismo que Avalanche Mainnet. Herramientas como los exploradores y carteras deben trabajar con el Fuji Testnet.

En este tutorial, vamos a pasar por un ejemplo de flujo de trabajo Fuji para mostrar cómo se puede usar. Haremos lo siguiente:

1. Generar 24 palabras english mnemonic vía AvalanchejS
2. Deriva direcciones externas de cadena X BIP44 a través de AvalanchejS
3. Obtener AVAX del grifo Fuji
4. Enviar AVAX vía AvalancheJS
5. Examinar la transacción resultante en el Explorador de Avalanche
6. Usa el mnemonic para iniciar sesión en la billetera web

## Generar un Mnemonic

Para empezar, crearemos una frase mnemónica con [AvalancheJS](https://docs.avax.network/build/tools/avalanchejs). Mnemonics nos permite codificar una fuerte seguridad en una frase legible por el hombre. AvalanchejS admite 10 idiomas, incluyendo inglés, japonés, español, italiano, francés, coreano, checo, Portuguese, chino simplificado y chino tradicional.

Primero, genere un mnemonic de 24 palabras english [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) compatible a través de AvalancheJS.

```typescript
import { Mnemonic } from "avalanche"
const mnemonic: Mnemonic = Mnemonic.getInstance()
const strength: number = 256
const wordlist = mnemonic.getWordlists("english") as string[]
const m: string = mnemonic.generateMnemonic(strength, randomBytes, wordlist)
console.log(m)
// "pool hat domain flame stomach canal fury master farm gown tide supreme winner motion this first divide spray forum wall reopen bounce spider palm"
```

## Direcciones Derivadas

Después de generar un mnemonic podemos utilizar AvalanchejS para derivar pares deterministas jerárquicos de conformidad con [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) \(HD\).

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

**Tenga** en cuenta que estamos utilizando `el llavero` que aún no se ha definido. Crear un llavero vacío se puede ver en [este ejemplo Script AvalanchejS](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/newKeyChain.ts). Hay enlaces a docenas de ejemplos de AvalanchejS en [los recursos que se enumeran a continuación](fuji-workflow.md#resources).

Mientras tenga la frase menmonic puede volver a generar sus teclas privadas y las direcciones que controlan.

## Consigue un Drip del Fuji Faucet

Podemos obtener un "gote" de AVAX desde el grifo Fuji. Pega la dirección en el [sitio web del grifo Fuji](https://faucet.avax-test.network). Estos AVAX son para el Fuji Testnet y no tienen valor monetario.

![Solicitar AVAX](../../../.gitbook/assets/faucet-request.png)

El grifo enviará un poco de AVAX a la dirección y devolverá un ID de transacción \(txID\). Este txID se puede utilizar con el Fuji Testnet Explorer para obtener más información sobre la transacción.

![Recibiendo AVAX](../../../.gitbook/assets/faucet-response.png)

### Compruebe los detalles de la transacción

El txID, `2GjAMJrBUYs8RuK2bXrNCuu34fNpJVor2ubNzvcuDPo5t9nMct`, se puede ver en el [Explorador Fuji Testnet](https://explorer.avax-test.network/tx/2GjAMJrBUYs8RuK2bXrNCuu34fNpJVor2ubNzvcUDPo5t9nMct). Avalanche también tiene un [Explorador Mainnet](https://explorer.avax.network).

Detalles de ![la transacción Detalles](../../../.gitbook/assets/explorer-1.png) ![de entrada y salida](../../../.gitbook/assets/explorer-2.png)

### Obtener el equilibrio

También podemos utilizar el Explorador Fuji para obtener el equilibrio para la 1ª dirección derivada del BIP44—[X-fuji1cfvdpdqyzpp8pq0g6trmjsrn9pt8nutsfm7a40](https://explorer.avax-test.network/address/fuji1cfvdpdqyzpp8pq0g6trmjsrn9pt8nutsfm7a40).

![1ª dirección derivada saldo 1ª transacciones de](../../../.gitbook/assets/balance-1.png)![](../../../.gitbook/assets/balance-2.png) dirección derivada

Alternativamente, podemos utilizar AvalanchejS para obtener el equilibrio.

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

## Envío de AVAX

El grifo envió 2 AVAX a la primera dirección que generamos. Enviemos AVAX desde la primera dirección a la segunda dirección.

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

### Verificar el éxito

Podemos verificar que la transacción, `ankMr1tD65A9Ssto5w4ic1d31t6w42jeu8pfv6v4gRPpMg17g`, fue exitosa utilizando AvalancheJS.

```typescript
const txid: string = "ankMr1tD65A9SSto5w4ic1d31t6w42jeu8pfv6v4gRPpMg17g"
const status: string = await xchain.getTxStatus(txid)
console.log(status)
// Accepted
```

Alternativamente, podemos utilizar el Fuji Tesntet Explorer. La transacción se puede ver en el [Explorador Fuji](https://explorer.avax-test.network/tx/ankMr1tD65A9SSto5w4ic1d31t6w42jeu8pfv6v4gRPpMg17g).

Detalles de ![la transacción Detalles](../../../.gitbook/assets/explorer-3.png) ![de entrada y salida](../../../.gitbook/assets/explorer-4.png)

#### Obtener el equilibrio

También podemos utilizar el Explorador Fuji para obtener el equilibrio para la 2ª dirección—[X-fuji1y75dj6qygj7frw2xtcfn724qfty4aadnmeth6y](https://explorer.avax-test.network/address/X-fuji1y75dj6qygj7frw2xtcfn724qfty4aadnmeth6y).

![2ª dirección derivada saldo 2ª dirección derivada](../../../.gitbook/assets/balance-3.png) ![de transacciones](../../../.gitbook/assets/balance-4.png)

Alternativamente, podemos utilizar AvalanchejS para obtener el equilibrio.

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

### Inicia sesión en la Cartera Web

Por último, podemos utilizar el mnemonic para acceder a la [Cartera Web de Avalanche](https://wallet.avax.network). Veremos que tiene el equilibrio AVAX y que deriva automáticamente la tercera dirección de la mnemonic.

Usa el mnemonic para acceder a la Cartera Web.

![Acerque la cartera](../../../.gitbook/assets/mnemonic.png)

El equilibrio es correcto y la dirección "activa" es la tercera dirección derivada.

![Balance de billetera web](../../../.gitbook/assets/wallet-1.png) ![3ª dirección BIP44 derivada](../../../.gitbook/assets/wallet-2.png)

También tenga en cuenta que la cartera GUI muestra que derivó las mismas 3 direcciones que nuestro script arriba.

![Direcciones derivadas de la cartera](../../../.gitbook/assets/wallet-3.png) ![AvalanchejS direcciones](../../../.gitbook/assets/derived.png) derivadas

## Resumen

El Fuji Testnet desempeña un papel crítico en las aplicaciones de prueba y QAing, contratos inteligentes y productos financieros antes de desplegarse en el Mainnet. Herramientas como AvalancheJS, la API pública, el grifo y el explorador ayudan a asegurarse de que su entorno de pruebas y QA está cerca de Mainnet para que pueda estar seguro cuando se lanza en Mainnet.

## Recursos

Para obtener recursos adicionales y valiosos, véase más adelante.

### Grifo

El [Fuji Faucet](https://faucet.avax-test.network) envía direcciones AVAX a X-Chain o C-Chain para ayudarle a probar. \(Este testnet Avax no tiene valor. \)

### Cartera

La cartera [web de](https://wallet.avax.network) Avalanche es una cartera simple, segura y no privativa de libertad para almacenar activos de Avalanche. Soporta redes Mainnet, Fuji y personalizadas.

### Explorador de datos

El Explorador de Avalanche le permite explorar la red en [Mainnet](https://explorer.avax.network) y [Fuji](https://explorer.avax-test.network).

### API pública

Mira [aquí.](https://docs.avax.network/build/tools/public-api)

### Ejemplos de Avalanchejs

Hay más [de 60 scripts AvalanchejS](https://github.com/ava-labs/avalanchejs/tree/master/examples) que demuestran cómo activos y NFTs, enviar transacciones, añadir validadores y más.

