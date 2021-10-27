# ウォレットSDK

## 注意：ベータ版リリース🔴

このライブラリは速い速度で開発されており、頻繁に変更が加えられる可能性があります。監査は保留中です。

## AvalancheウォレットSDK（ベータ版）

AvalancheウォレットSDKは、Avalancheネットワーク上で自己管理ウォレットを作成、管理するためのTypeScriptライブラリです。

AvalancheのX-Chain、P-Chain、C-Chain上でトランザクションを行うための高レベルのメソッドを提供します。

ウォレットの種類は、次の通りです。

* シングルトンウォレット
* レッジャーウォレット
* ニーモニックウォレット
* XPUBウォレット

`avalanche-wallet-sdk`を使用すると、デベロッパーは次のように進めることができます。

* トークンやNFTの受信と送信。
* チェーン間の資金移動
* バリデータセットにノードの追加
* ステークのバリデーターへのデリゲート
* ウォレットインスタンスからのキーストアファイルの作成
* ウォレットのトランザクション履歴の取得
*  X-Chain上のミントNFT

### インストール

ソースコードは、このライブラリの[Github repo](https://github.com/ava-labs/avalanche-wallet-sdk)にあります。

#### `npm`でのインストール

`npm install --save @avalabs/avalanche-wallet-sdk`

#### `yarn`でのインストール

`yarn add @avalabs/avalanche-wallet-sdk`

### クラス

このライブラリで公開されているクラスは[こちら](wallet-classes.md)です。

### 使用例

#### イベントリスナー

すべてのウォレットのインスタンスは、その状態の変化を示すイベントを発生させます。

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

#### ネットワークの変化

デフォルトでは、SDKはAvalancheメインネットに接続されています。

```typescript
import { NetworkConstants, Network} from '@avalabs/avalanche-wallet-sdk';

// Set to Mainnet
Network.setNetwork(NetworkConstants.MainnetConfig)

// Set to Fuji Testnet
Network.setNetwork(NetworkConstants.TestnetConfig)
```

#### BN（ビッグナンバー）の印刷

トークンの量はBN.jsを使用して最小の割り切れる単位で表現されます。`Utils`ネームスペースには、BNの数字を人間が読みやすいように表示するヘルパー関数があります。

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

`WebsocketProvider`のクラスを使用して、ポーリングなしでウォレットの残高をリアルタイムに更新します。

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

本SDKにはERC20コントラクトのセットが搭載されています。このようにコントラクトを追加することができます。

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

