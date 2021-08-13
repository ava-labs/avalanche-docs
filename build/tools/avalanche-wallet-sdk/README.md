# Cüzdan SDK

## Dikkat et: Beta Serbest Bırakma  

Bu kütüphane hızlı gelişim altında ve sık sık kırılma değişiklikleri olabilir. Bir denetim bekliyor.

## Avalanche Cüzdan SDK \(Beta\ )

Avalanche Cüzdan SDK, Avalanche ağı üzerinde koruma olmayan cüzdan oluşturmak ve yönetmek için bir TypeScript kütüphanesidir.

Avalanche's X-Chain, P-Chain ve C-Chain üzerinde transact için yüksek seviye yöntemler sağlar.

Cüzdan tipleri destekleniyor:

* Singleton Cüzdanları
* Ledger Cüzdanları
* Mnemonik Cüzdanlar
* XPUB Cüzdanları

`avalanche-wallet-sdk`, sdk kullanarak, geliştiriciler yapabilir:

* Alın ve NFTs. gönderin.
* Zincirler arasında fon aktarır
* Doğrulayıcı setine bir düğüm ekle
* Bir a kazığı Delegate
* Cüzdan örneklerinden anahtar mağazası dosyalarını oluştur
* Cüzdan işlemleri tarihini al.
* on NFTs

### Kurum

Bu kütüphanenin [Github](https://github.com/ava-labs/avalanche-wallet-sdk) in kaynak kodu bulunabilir.

#### `npm` ile kurul

`npm yükleme -- kaydetme @avalabs/avalanche-wallet-sdk sdk`

#### `İplik` ile kurul

`@ @avalabs/avalanche-wallet-sdk sdk ekle`

### Sınıflar

Bu kütüphanenin açık olduğu dersler için [burada](wallet-classes.md) bakın.

### Örnek Kullanım

#### Etkinlik Dinleyicileri

Her cüzdan örnekleri durumundaki değişiklikleri göstermek için olayları ateşleyecek.

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

#### AVAX Gönderiyor

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

#### Ağları Değiştiriyor

SDK öntanımlı olarak Avalanche to bağlanır.

```typescript
import { NetworkConstants, Network} from '@avalabs/avalanche-wallet-sdk';

// Set to Mainnet
Network.setNetwork(NetworkConstants.MainnetConfig)

// Set to Fuji Testnet
Network.setNetwork(NetworkConstants.TestnetConfig)
```

#### BN \(Büyük Numara\ Yazılıyor

Token miktarları BN.js kullanarak en küçük bölünebilir biriminde temsil edilir. `Utils` isim uzayı, BN sayılarını okunabilir bir şekilde göstermek için yardımcı fonksiyonlarına sahiptir.

```typescript
import {Utils} from '@avalabs/avalanche-wallet-sdk'

// On X-Chain and P-Chain AVAX has 9 decimals
let amtX = new BN(1234567000000)
Utils.bnToAvaxX(amtX) // 1,234.567

// On the C-Chain it has 18
let amtC = new BN(1234567000000000000000)
Utils.bnToAvaxC(amtC) // 1,234.567
```

#### Web Soket Provider

Web `WebsocketProvider` sınıfını kullanarak, cüzdan denemelerini gerçek zamanlı olarak without güncelle.

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

#### ERC20 Tokens Ekle

SDK, bir dizi ERC20 sözleşmesi ile dolu. Bunun gibi ek sözleşmeler ekleyebilirsiniz:

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

