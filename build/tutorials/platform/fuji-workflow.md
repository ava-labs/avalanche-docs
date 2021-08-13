# Fuji Workflow-JP

## JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-

富士山は雪崩ネットワークが実施しているテストネットワークです。Dapp やスマートコントラクトをローカルで開発した後、テストできます。\([Avash](https://docs.avax.network/build/tools/avash) を使って Thing をローカルにテストできます。\) 富士は通常Avalanche Mainnetと同じバージョンですが、AvalancheGoの未リリース版を動作している場合もあります。一般的に、富士の行動はAvalanche Mainnetとほぼ同じであると期待できます。JPJ-JP-JP

このチュートリアルでは、Fuji ワークフローの例を紹介します。JavaScript-JP-JP-

1. AvalancheJSで24単語の英語のnemonicを生成する
2. AvalancheJS 経由で外部 BIP44 X-Chain アドレスを導出
3. AVAXを富士蛇口から入手する
4. AvalancheJSでAVAXを送る
5. Avalanche Explorerで結果のトランザクションを調べる
6. mnemonic を使用して Web ウォレットにサインインします。

## Mnemonic の生成

まずは[AvalancheJS](https://docs.avax.network/build/tools/avalanchejs)でne-monic-fraseを書きましょう。Mnemonicsは、強力なセキュリティを人間が読みやすいフレーズにエンコードできます。AvalancheJSは、英語、日本語、スペイン語、イタリア語、フランス語、韓国語、チェコ語、ポルトガル語、中国語簡体字、中国語繁体字など10言語に対応しています。

まず、AvalancheJSで24語の英語[BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)準拠のnemonicを生成します。

```typescript
import { Mnemonic } from "avalanche"
const mnemonic: Mnemonic = Mnemonic.getInstance()
const strength: number = 256
const wordlist = mnemonic.getWordlists("english") as string[]
const m: string = mnemonic.generateMnemonic(strength, randomBytes, wordlist)
console.log(m)
// "pool hat domain flame stomach canal fury master farm gown tide supreme winner motion this first divide spray forum wall reopen bounce spider palm"
```

## JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-

MNMONICを生成した後、AvalancheJSを使用して[BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)準拠の階層的決定論的 \(HD\) キーペアを導出することができます。

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

まだ定義されていない`keychain`を使用していることに**注意**してください。[JavaScript](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/newKeyChain.ts) では、JavaScript を使用しています。AvalancheJSの数十の例へのリンクがあります[。](fuji-workflow.md#resources)

メンモニックフレーズを持っている限り、プライベートキーとそのコントロールするアドレスを再生成できます。

## 富士蛇口からドリップをゲット

AVAXの「ドリップ」を富士蛇口から手に入れることができます。[J-JP-JP-J](https://faucet.avax-test.network)これらのAVAXは富士テストネット用であり、金銭的価値はありません。

![AVAXのリクエスト](../../../.gitbook/assets/faucet-request.png)

蛇口はAVAXをアドレスに送り、トランザクションID \(txID\)を返します。このtxIDは、Fuji Testnet Explorerで利用できます。

![AVAXの受信](../../../.gitbook/assets/faucet-response.png)

### トランザクションの詳細を確認する

TXID `2GjAMJrBUYs8RuK2bXrNCuu34fNpJVor2ubNzvcUDPo5t9nMct`は、[Fuji Testnet Explorer](https://explorer.avax-test.network/tx/2GjAMJrBUYs8RuK2bXrNCuu34fNpJVor2ubNzvcUDPo5t9nMct)で見ることができます。Avalancheには[Mainnet Explorer](https://explorer.avax.network)もあります。

![トランザクションの詳細](../../../.gitbook/assets/explorer-1.png) ![入力および出力の詳細](../../../.gitbook/assets/explorer-2.png)

### バランスを取得する

また、Fuji Explorer を使用して、BIP44-[Dervice-JP-JP](https://explorer.avax-test.network/address/fuji1cfvdpdqyzpp8pq0g6trmjsrn9pt8nutsfm7a40)

![1st派生アドレス残高](../../../.gitbook/assets/balance-1.png) 1st![派生アドレストランザクション](../../../.gitbook/assets/balance-2.png)

AvalancheJSを使ってバランスを取ることもできます。

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

## AVAXの送信

蛇口は2AVAXを私たちが生成した最初の住所に送りました。AVAXを1つ目から2つ目に送りましょう。

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

### 成功を確認する

`ankMr1tD65A9SSto5w4ic1d31t6w42jeu8pfv6v4gRPpMg17g`がAvalancheJSを使用して成功したことを確認できます。

```typescript
const txid: string = "ankMr1tD65A9SSto5w4ic1d31t6w42jeu8pfv6v4gRPpMg17g"
const status: string = await xchain.getTxStatus(txid)
console.log(status)
// Accepted
```

また、Fuji Tesntet Explorerを使用することもできます。JPEXPORALではJPEXPORALで取引を確認できます[。](https://explorer.avax-test.network/tx/ankMr1tD65A9SSto5w4ic1d31t6w42jeu8pfv6v4gRPpMg17g)

![トランザクションの詳細](../../../.gitbook/assets/explorer-3.png) ![入力および出力の詳細](../../../.gitbook/assets/explorer-4.png)

#### バランスを取得する

また、Fuji Explorer を使って2番目のアドレス([X-fuji1y75dj6qygj7frw2xtcfn724qfty4aadnmeth6y](https://explorer.avax-test.network/address/X-fuji1y75dj6qygj7frw2xtcfn724qfty4aadnmeth6y))のバランスを得ることができます。

![2nd 派生アドレス残高](../../../.gitbook/assets/balance-3.png) ![2nd 派生アドレストランザクション](../../../.gitbook/assets/balance-4.png)

AvalancheJSを使ってバランスを取ることもできます。

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

### Webウォレットにサインイン

最後に、mnemonicを使用して[Avalanche Web Wallet](https://wallet.avax.network)にアクセスできます。AVAXのバランスがあり、mnemonicから3rdアドレスを自動的に導き出していることがわかります。

mnemonic を使用して、Web ウォレットにアクセスします。

![ウォレットにアクセスする](../../../.gitbook/assets/mnemonic.png)

残高は正しいもので、"active"アドレスは3番目の派生アドレスです。

![Webウォレット残高](../../../.gitbook/assets/wallet-1.png) ![3rd派生BIP44アドレス](../../../.gitbook/assets/wallet-2.png)

また、ウォレットGUIは上記のスクリプトと同じ3つのアドレスを導入したことを示しています。

![Wallet-](../../../.gitbook/assets/wallet-3.png)![Dervice-JS-JS-JP-JP-J](../../../.gitbook/assets/derived.png)

## JavaScript-JP-JP-

Fuji Testnetは、Mainnetに展開する前に、テストやQAing dapps、スマートコントラクト、金融商品において重要な役割を果たしています。AvalancheJS、public API、faucet、explorerのようなツーリングは、Mainnetで起動するときに自信を持ってくれるように、テストとQA環境がMainnetに近いことを保証するのに役立ちます。

## JPR-JP-JP

追加および貴重なリソースについては、下記をご覧ください。

### FAUCET

J-PRJ[-](https://faucet.avax-test.network)PR\(このテストネットAvaxには値がありません。\)

### JPWALLWENT

[Avalanche Web Wallet](https://wallet.avax.network)は、Avalancheアセットを保存するためのシンプルで安全な、管理不可のウォレットです。Mainnet、Fuji、およびカスタムネットワークをサポートしています。

### JPEXPRESSION-JP-JP-J

Avalanche Explorerでは、[Mainnet](https://explorer.avax.network)と[FJI](https://explorer.avax-test.network)のネットワークを探索できます。

### Public API-JP

[こちら](https://docs.avax.network/build/tools/public-api)をご覧ください。

### AvalancheJS 例

[AvalancheJSスクリプトには60](https://github.com/ava-labs/avalanchejs/tree/master/examples)以上の例があります。これらはアセットやNFTの方法、トランザクションの送信方法、バリデーターの追加方法などです。

