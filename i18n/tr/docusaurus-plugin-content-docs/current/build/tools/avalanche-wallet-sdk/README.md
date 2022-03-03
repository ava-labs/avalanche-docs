# Genel Bakış

## Duyuru: Beta Sürümü🔴

Bu kitaplık hızlı bir geliştirme sürecinden geçmektedir ve sık sık breaking değişiklikler olabilir. Devam etmekte olan bir denetim var.

## Avalanche Cüzdan SDK \(Beta\)

Avalanche Cüzdan SDK, Avalanche ağında gözetimsiz cüzdanlar yaratmaya ve yönetmeye yarayan bir TypeScript kitaplığıdır.

Avalanche'ın X-Chain, P-Chain ve C-Chain zincirlerinde işlem yapmak için üst düzey metotlar sunar.

Desteklenen cüzdan türleri şunlardır:

* Singleton Cüzdanlar
* Ledger Cüzdanlar
* Mnemonic Cüzdanlar
* XPUB Cüzdanlar

Geliştiriciler `avalanche-wallet-sdk`'yı kullanarak şunları yapabilir:

* Tokenlar ve NFT'ler almak ve göndermek.
* Zincirler arasında fon aktarmak
* Doğrulayıcı kümesine bir düğüm eklemek
* Bir doğrulayıcıya stake delege etmek
* Cüzdan instance'larından anahtar deposu \(keystore\) dosyaları yaratmak
* Bir cüzdanın işlem geçmişini almak
* X-Chain'de NFT mint etmek

### Kurulum

Kaynak kodu bu kitaplığın [Github yazılım havuzunda](https://github.com/ava-labs/avalanche-wallet-sdk) bulunabilir.

#### `npm` ile kurun

`npm install --save @avalabs/avalanche-wallet-sdk`

#### `yarn` ile kurun

`yarn add @avalabs/avalanche-wallet-sdk`

### Class'lar

Bu kitaplığın kullanıma sunduğu Class'lar için [buraya](wallet-classes.md) bakın.

### Örnek Kullanım

#### Event Listener'lar

Her cüzdan instance'ı event'ler göndererek durumundaki değişiklikleri gösterecektir.

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

#### AVAX Gönderme

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

#### Ağları Değiştirme

SDK varsayılan olarak Avalanche Mainnet'e bağlanır.

```typescript
import { NetworkConstants, Network} from '@avalabs/avalanche-wallet-sdk';

// Set to Mainnet
Network.setNetwork(NetworkConstants.MainnetConfig)

// Set to Fuji Testnet
Network.setNetwork(NetworkConstants.TestnetConfig)
```

#### BN \(Big Number\) Yazdırma

Token tutarları BN.js kullanılarak token'ın bölünebilir en küçük birimiyle temsil edilir. `Utils` ad alanında BN sayılarını insan tarafından okunabilir şekilde görüntüleyen yardımcı fonksiyonlar vardır.

```typescript
import {Utils} from '@avalabs/avalanche-wallet-sdk'

// On X-Chain and P-Chain AVAX has 9 decimals
let amtX = new BN(1234567000000)
Utils.bnToAvaxX(amtX) // 1,234.567

// On the C-Chain it has 18
let amtC = new BN(1234567000000000000000)
Utils.bnToAvaxC(amtC) // 1,234.567
```

#### Websocket Sağlayıcı

Cüzdan bakiyelerini yoklama \(polling\) olmaksızın gerçek zamanlı olarak güncellemek için `WebsocketProvider` class'ını kullanın.

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

#### ERC20 Token'ları Ekleme

SDK, bir ERC20 sözleşmeleri setiyle yüklü olarak gelir. Şunun gibi ek sözleşmeler ekleyebilirsiniz:

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

