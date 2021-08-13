# Cüzdan Sınıfları

of çekirdeği kullanıcıların kolayca farklı cüzdan türlerini oluşturmasına ve yönetmesine izin veren cüzdan sınıflarıdır.

## Mnemonik Cüzdan

Mnemonik cüzdanlar BIP44, BIP32 ve BIP39 özelliklerine göre tasarlanmıştır. Her işlem için mnemonik cüzdan yeni bir adres üretir. Bu durum gizliliği artırır ancak bu cüzdan tipinin performansını azaltır.

### Yeni cüzdan

```typescript
import {MnemonicWallet} from '@avalabs/avalanche-wallet-sdk'

// Create a new wallet
let newMnemonic = MnemonicWallet.generateMnemonicPhrase()
let myWallet = MnemonicWallet.fromMnemonic(newMnemonic)

let addressX = myWallet.getAddressX()
let addressP = myWallet.getAddressP()
let addressC = myWallet.getAddressC()
```

### Varolan Mnemonik Bir Ifadeden

```typescript
import {MnemonicWallet} from '@avalabs/avalanche-wallet-sdk'

// Create a wallet instance from the known mnemonic phrase
let myWallet = MnemonicWallet.fromMnemonic(myMnemonicPhrase)

// This is also a good place to attach the event listeners.

// Mnemonic wallets with activity need to find their HD index on startup
// This is a heavy operation and can take a long time for wallets with extensive activity
myWallet.resetHdIndices().then(()=>{
    // The wallet is ready to use

    // Update X chain balance
    myWallet.updateUtxosX()
    // Update P chain balance
    myWallet.updateUtxosP()
    // Update C chain AVAX balance
    myWallet.updateAvaxBalanceC()
    // update C chain ERC20 balance
    myWallet.updateBalanceERC20()

    let addressX = myWallet.getAddressX()
    let addressP = myWallet.getAddressP()
    let addressC = myWallet.getAddressC()
})
```

## Kamu Mnemonik Cüzdan

MnemonicWallet sınıfına benzer ama tohum cümlesine erişimi olmayan okunabilir modda.

```typescript
import {PublicMnemonicWallet} from '@avalabs/avalanche-wallet-sdk'

const XPUB_AVM = `xpub6CvdTKLRh3ehvVLR2f3M1GUTFesrz5zoYFbw32iZqRShmoDnxtfSaF7mdCvXwNRfTwce5RYEADGb6YAzhqEAujEkvjTod6s2WEkpUBJZwqf`;
const XPUB_EVM = `xpub6CQ5fy7iAochmG1tL2ww2P4BviDRRrcEjG3u1uM6GcyGwzihscWoX9RwiCrZDcpAbYK8reYcy7cT8ZgZWVbReZ44ehVYqi5jZD9NknLx4TS`;

let wallet = new PublicMnemonicWallet(XPUB_AVM, XPUB_EVM);
```

## Ledger Cüzdan

MnemonicWallet sınıfına benziyor. Bir tohum cümlesine erişmek yerine, işlemleri imzalamak için harici bir defter aygıtı ile iletişim kuruyor.

Müşteri başvurusu uygun [hesap defterini](https://github.com/LedgerHQ/ledgerjs#ledgerhqhw-transport-) taşımayı sağlamalıdır.

```typescript
import TransportU2F from '@ledgerhq/hw-transport-u2f';

let transport = await TransportU2F.create();
let wallet = await LedgerWallet.fromTransport(transport);
```

## Singleton Cüzdan

Singleton cüzdanları en çok performant cüzdan tipidir, çünkü tek bir adres ile tek bir özel anahtardan oluşur.

```typescript
import { SingletonWallet } from '@avalabs/avalanche-wallet-sdk'

let privateKey = "PrivateKey-23Zqf7uScHNEoj5kuQfGkk8LSoUjM95LawSxFmgNCK6kFnWC7p"
let wallet = new SingletonWallet(privateKey);
```

