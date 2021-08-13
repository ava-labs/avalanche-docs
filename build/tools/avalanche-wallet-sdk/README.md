# Cartera SDK

## Aviso: Beta Release🔴

Esta biblioteca está en rápido desarrollo y puede haber cambios frecuentes de rotura. Está pendiente una auditoría.

## Cartera Avalanche SDK \(Beta\)

La cartera de Avalanche SDK es una biblioteca TypeScript para crear y gestionar carteras no privativas de libertad en la red Avalanche.

Proporciona métodos de alto nivel para transact en la cadena X, cadena P y cadena C de Avalanche.

Los tipos de billetera son compatibles:

* Carteras de Singleton
* Carteras de Ledger
* Carteras Mnemónicas
* Carteras XPUB

Utilizando `avalanche-wallet-sdk`, los desarrolladores pueden:

* Recibir y enviar fichas y NFTs.
* Transferir fondos entre cadenas
* Añadir un nodo al conjunto del validador
* Delegado de la participación en un validador
* Crear archivos de keystore desde instancias de billetera
* Obtenga el historial de transacciones de una cartera
* Mint NFTs en la cadena X-

### Instalación de instalaciones

El código fuente se puede encontrar en la [repo. de Github](https://github.com/ava-labs/avalanche-wallet-sdk) de esta biblioteca.

#### Instalar con `npm`

`npm instale --save @avalabs/avalanche-wallet-sdk sdk`

#### Instalar con `hilo`

`añadir @avalabs/avalanche-wallet-sdk`

### Clases de tipo

Vea [aquí](wallet-classes.md) para las clases expuestas por esta biblioteca.

### Uso de ejemplo

#### Oyentes del evento

Cada instancia de la billetera disparará eventos para indicar cambios en su estado.

```typescript
// Create a wallet instance
let myWallet = MnemonicWallet.create()

// Fired when the wallet starts using a new address
// Used only with HD wallets (Mnemonic, Ledger, and XPUB)
myWallet.on('addressChanged', (addresses)=>{
    // Use the most recent addresses from the wallet
})

// Fired when X chain balance is updated
myWallet.on('balanceChangedX', (newBalance)=>{
    // Recent X chain balance
})

// Fired when P chain AVAX balance is updated
myWallet.on('balanceChangedP', (newBalance)=>{
    // Recent P chain AVAX balance
})

// Fired when C chain AVAX balance is updated
myWallet.on('balanceChangedC', (newBalance)=>{
    // Recent C chain AVAX balance
})
```

#### Envío de AVAX

```typescript
import {MnemonicWallet, BN} from '@avalabs/avalanche-wallet-sdk'

let myWallet = MnemonicWallet.create()

// Mnemonic wallets need to find their HD index on startup
await myWallet.resetHdIndices()

// Update the UTXOs
await myWallet.updateUtxosX()

// Send 1 nAVAX
let to = "X-avax1r20dtfehaat9wev69ajzzfcwtll903vlcx50uh"
let amount = new BN(1)
let txID = await myWallet.sendAvax(to, amount)
```

#### Cambiando las redes

Por defecto, el SDK está conectado a la Avalanche Mainnet.

```typescript
import { NetworkConstants, Network} from '@avalabs/avalanche-wallet-sdk';

// Set to Mainnet
Network.setNetwork(NetworkConstants.MainnetConfig)

// Set to Fuji Testnet
Network.setNetwork(NetworkConstants.TestnetConfig)
```

#### Impresión BN \(Big Number\)

Las cantidades de token se representan en su unidad divisible más pequeña utilizando BN.js. El espacio de nombres de `Utils` tiene funciones de ayuda para mostrar números BN de una manera legible humana.

```typescript
import {Utils} from '@avalabs/avalanche-wallet-sdk'

// On X-Chain and P-Chain AVAX has 9 decimals
let amtX = new BN(1234567000000)
Utils.bnToAvaxX(amtX) // 1,234.567

// On the C-Chain it has 18
let amtC = new BN(1234567000000000000000)
Utils.bnToAvaxC(amtC) // 1,234.567
```

#### Proveedor de Websocket

Utilice la clase `WebsocketProvider` para actualizar los saldos de billetera en tiempo real sin votación.

```typescript
import { Network, NetworkConstants } from 'avalanche-wallet-sdk';

// Create a websocket provider from the network currently used by the SDK
const provider = Network.WebsocketProvider.fromActiveNetwork()

// To track wallets and update their balances
provider.trackWallet(myWallet)

// To stop tracking wallets
// Make sure to call this to avoid memory leaks
provider.removeWallet(myWallet)

// To change provider network
provider.setNetwork(NetworkConstants.TestnetConfig) // connect to Fuji testnet
```

#### Añadiendo ERC20 ERC20

El SDK viene cargado con un conjunto de contratos ERC20. Puede agregar contratos adicionales como este:

```typescript
import { Assets } from '@avalabs/avalanche-wallet-sdk'

// Will try to fetch details about the ERC20 contract
try{
    await Assets.addErc20Token('0x34B6C87bb59Eb37EFe35C8d594a234Cd8C654D50'); // Testnet DAI
}catch(e){
    // Contract not found or not valid
}

// or from known data
let tokenData = {
    chainId: 43114,
    address: '0xbA7dEebBFC5fA1100Fb055a87773e1E99Cd3507a',
    decimals: 18,
    name: 'Dai Stablecoin',
    symbol: 'DAI',
}

Assets.addErc20TokenFromData(tokenData)
```

