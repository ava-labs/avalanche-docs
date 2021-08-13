# Wallet クラス

SDKの中核は、ユーザーが簡単にさまざまなタイプのウォレットを作成および管理できるウォレットクラスです。

## Mnemonicウォレット

MnemonicウォレットはBIP44、BIP32、BIP39仕様に従って設計されています。受信したトランザクションごとに、mnemonicウォレットは新しいアドレスを生成します。これにより、プライバシーは向上しますが、このウォレットタイプのパフォーマンスは低下します。

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

### 既存のMnemonicフレーズから

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

## Public Mnemonic Wallet - 株式会社JP

MnemonicWallet クラスと同様ですが、シードフレーズにアクセスせずに読み取り専用モードです。

```typescript
import {PublicMnemonicWallet} from '@avalabs/avalanche-wallet-sdk'

const XPUB_AVM = `xpub6CvdTKLRh3ehvVLR2f3M1GUTFesrz5zoYFbw32iZqRShmoDnxtfSaF7mdCvXwNRfTwce5RYEADGb6YAzhqEAujEkvjTod6s2WEkpUBJZwqf`;
const XPUB_EVM = `xpub6CQ5fy7iAochmG1tL2ww2P4BviDRRrcEjG3u1uM6GcyGwzihscWoX9RwiCrZDcpAbYK8reYcy7cT8ZgZWVbReZ44ehVYqi5jZD9NknLx4TS`;

let wallet = new PublicMnemonicWallet(XPUB_AVM, XPUB_EVM);
```

## Ledger Wallet - レジャーウォレット

MnemonicWallet クラスと同様です。シードフレーズにアクセスする代わりに、トランザクションに署名するために外部レジャーデバイスと通信します。

クライアント・アプリケーションは、適切な[レジャー・](https://github.com/LedgerHQ/ledgerjs#ledgerhqhw-transport-)トランスポートを提供する必要があります。

```typescript
import TransportU2F from '@ledgerhq/hw-transport-u2f';

let transport = await TransportU2F.create();
let wallet = await LedgerWallet.fromTransport(transport);
```

## Singleton Wallet USB-JP

Singletonウォレットは、1つのプライベートキーで構成されているため、最もパフォーマンス的なウォレットタイプです。

```typescript
import { SingletonWallet } from '@avalabs/avalanche-wallet-sdk'

let privateKey = "PrivateKey-23Zqf7uScHNEoj5kuQfGkk8LSoUjM95LawSxFmgNCK6kFnWC7p"
let wallet = new SingletonWallet(privateKey);
```

