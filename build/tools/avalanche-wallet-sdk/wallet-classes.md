# ウォレットクラス

SDKの核となるのが、ユーザーが簡単に違うタイプのウォレットを作成したり管理したりできるウォレットクラスです。

## ニーモニックウォレット

ニーモニック ウォレットは、BIP44、BIP32、BIP39仕様に従って設計されています。受け取ったトランザクションごとに、ニーモニックウォレットが新しいアドレスを生成します。これによりプライバシーが向上しますが、このウォレットタイプのパフォーマンスは低下します。

### 新しいウォレット

```typescript
import {MnemonicWallet} from '@avalabs/avalanche-wallet-sdk'

// Create a new wallet
let newMnemonic = MnemonicWallet.generateMnemonicPhrase()
let myWallet = MnemonicWallet.fromMnemonic(newMnemonic)

let addressX = myWallet.getAddressX()
let addressP = myWallet.getAddressP()
let addressC = myWallet.getAddressC()
```

### 既存のニーモニックフレーズから

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

## パブリックニーモニックウォレット

MnemonicWallet クラスと類似していますが、シードフレーズへのアクセスを持たない読み取り専用のモードとなります。

```typescript
import {PublicMnemonicWallet} from '@avalabs/avalanche-wallet-sdk'

const XPUB_AVM = `xpub6CvdTKLRh3ehvVLR2f3M1GUTFesrz5zoYFbw32iZqRShmoDnxtfSaF7mdCvXwNRfTwce5RYEADGb6YAzhqEAujEkvjTod6s2WEkpUBJZwqf`;
const XPUB_EVM = `xpub6CQ5fy7iAochmG1tL2ww2P4BviDRRrcEjG3u1uM6GcyGwzihscWoX9RwiCrZDcpAbYK8reYcy7cT8ZgZWVbReZ44ehVYqi5jZD9NknLx4TS`;

let wallet = new PublicMnemonicWallet(XPUB_AVM, XPUB_EVM);
```

## Ledgerウォレット

MnemonicWalletクラスと類似しています。シードフレーズにアクセスする代わりに、外部のLedgerデバイスにアクセスし、取引に署名します。

顧客のアプリケーションは、適切な[Ledgerトランスポート](https://github.com/LedgerHQ/ledgerjs#ledgerhqhw-transport-)を提供する必要があります。

```typescript
import TransportU2F from '@ledgerhq/hw-transport-u2f';

let transport = await TransportU2F.create();
let wallet = await LedgerWallet.fromTransport(transport);
```

## Singletonウォレット

Singletonウォレットは単一の秘密鍵で構成されているため、最もパフォーマンスが高いウォレットタイプです。

```typescript
import { SingletonWallet } from '@avalabs/avalanche-wallet-sdk'

let privateKey = "PrivateKey-23Zqf7uScHNEoj5kuQfGkk8LSoUjM95LawSxFmgNCK6kFnWC7p"
let wallet = new SingletonWallet(privateKey);
```

