# ウォレットSDK

## 注意：ベータリリース🔴 🔴 gimilers

このライブラリは、急速な開発下にあり、頻繁にブレークキングの変更が発生する可能性があります。監査が完了します。

## AvalancheウォレットSDK（ベータ）

AvalancheウォレットSDKは、Avalancheネットワーク上で非カストディアルウォレットを作成、管理するためのTypeScriptライブラリです。

AvalancheのX-Chain、P-Chain、C-Chain上で取引するためのハイレベルメソッドを提供します。

ウォレットタイプは、サポートされています：

* シングルトンウォレット
* レジャーウォレット
* Mnemonicウォレット
* XPUBウォレット

開発者は`avalanche-wallet-sdk`、使用することができます：

* トークンとNFTを受信し、送信します。
* チェーン間で資金移動
* バリデータセットにノードを追加する
* バリデータにステークを委任する
* ウォレットインスタンスからキーストアファイルを作成する
* ウォレットのトランザクション履歴を取得する
* X-Chain上でミントNFT

### インストール

ソースコードは、このライブラリの[Githubレポ](https://github.com/ava-labs/avalanche-wallet-sdk)で見ることができます。

#### インストール`npm`

`npm install --save @avalabs/avalanche-wallet-sdk`

#### インストール`yarn`

`yarn add @avalabs/avalanche-wallet-sdk`

### クラス

このライブラリで公開されるクラスについては[、ここ](wallet-classes.md)を参照してください。

### 使用例

#### イベントリスナ

すべてのウォレットインスタンスにより、その状態の変化を示すイベントが発生します。

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

#### AVAX送信

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

#### ネットワークの変更

デフォルトで、SDKはAvalancheメインネットに接続されます。

```typescript
import { NetworkConstants, Network} from '@avalabs/avalanche-wallet-sdk';

// Set to Mainnet
Network.setNetwork(NetworkConstants.MainnetConfig)

// Set to Fuji Testnet
Network.setNetwork(NetworkConstants.TestnetConfig)
```

#### BN（大数）

トークンの金額は、BN.jsを使用し、最小の分割ユニットで表されます。名前`Utils`空間には、BN番号を人間が読みやすく表示するためのヘルパ関数があります。

```typescript
import {Utils} from '@avalabs/avalanche-wallet-sdk'

// On X-Chain and P-Chain AVAX has 9 decimals
let amtX = new BN(1234567000000)
Utils.bnToAvaxX(amtX) // 1,234.567

// On the C-Chain it has 18
let amtC = new BN(1234567000000000000000)
Utils.bnToAvaxC(amtC) // 1,234.567
```

#### Websocketプロバイダ

`WebsocketProvider`クラスを使用して、ポーリングなしでリアルタイムでウォレットの残高を更新します。

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

SDKは、ERC20コントラクトが含まれています。次のように追加コントラクトを追加することができます：

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

