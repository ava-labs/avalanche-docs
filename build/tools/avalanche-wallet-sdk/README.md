# ウォレットSDK

## Notice: Beta Release 🔴JPY 日本

このライブラリは急速に開発中であり、頻繁に破損する変更が発生する可能性があります。監査が保留中です。

## AvalancheウォレットSDK \(Beta\)

Avalanche Wallet SDKは、Avalancheネットワーク上で非カストディアルウォレットを作成および管理するためのTypeScriptライブラリです。

AvalancheのX-Chain、P-Chain、C-Chainをトランザクションするための高レベルの方法を提供しています。

ウォレットタイプはサポートされています。

* Singleton Wallets - シンプルな財布
* 元帳財布
* Mnemonicウォレット
* XPUB ウォレット

`avalanche-wallet-sdk` を使用すると、開発者は次のことができます:

* トークンとNFTを受信して送信します。
* チェーン間で資金を送金する
* JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScri
* Stake to validator.
* Wallet インスタンスからキーストアファイルを作成する
* ウォレットのトランザクション履歴を取得する
* X-ChainのミントNFT

### JPY-JPY-

ソースコードは、このライブラリの[Github](https://github.com/ava-labs/avalanche-wallet-sdk)レポートで見つけることができます。

#### `npm`でインストールする

`npm install --save @avalabs/avalanche-wallet-sdk-JP`

#### `yarn`でインストールする

`yarn add @avalabs/avalanche-wallet-sdk-JP`

### JP-JP-

JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript[-](wallet-classes.md)JavaScript-JavaScript-JavaScript-JavaScri

### 使用例

#### イベントリスナー

すべてのウォレットインスタンスはイベントを発動して、その状態の変更を示します。

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

#### AVAXの送信

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

#### ネットワークを変える

SDK は、デフォルトでは Avalanche Mainnet に接続されています。

```typescript
import { NetworkConstants, Network} from '@avalabs/avalanche-wallet-sdk';

// Set to Mainnet
Network.setNetwork(NetworkConstants.MainnetConfig)

// Set to Fuji Testnet
Network.setNetwork(NetworkConstants.TestnetConfig)
```

#### BN \(Big Number\) を印刷する

トークン量はBN.jsを使用して、割り切り可能な単位で表現されます。`Utils` 名前空間には、BN 番号を人間が読みやすい方法で表示するヘルパー関数があります。

```typescript
import {Utils} from '@avalabs/avalanche-wallet-sdk'

// On X-Chain and P-Chain AVAX has 9 decimals
let amtX = new BN(1234567000000)
Utils.bnToAvaxX(amtX) // 1,234.567

// On the C-Chain it has 18
let amtC = new BN(1234567000000000000000)
Utils.bnToAvaxC(amtC) // 1,234.567
```

#### Websocketプロバイダー

`WebsocketProvider`クラスを使用して、ポーリングなしでリアルタイムでウォレット残高を更新します。

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

#### ERC20トークンの追加

SDKにはERC20コントラクトが含まれています。次のような追加の契約を追加できます。

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

