# 富士ワークフロー

## はじめに

富士は、Avalancheネットワーク上のテストネットワークです。ローカルで開発した後、dappやスマートコントラクトをテストするために使用できます。（[Avash](https://docs.avax.network/build/tools/avash)を使用して、ローカルで物事をテストすることができます。）富士は、Avalancheメインネットと同じバージョンで動作する場合もあります。しかし、AvalancheGoの未リリースバージョンを実行する場合もあります。一般に、富士の行動はAvalancheメインネットとほぼ同じものと期待できます。エクスプローラやウォレットなどのツールは、富士テストネットで動作するはずです。

このチュートリアルでは、富士ワークフロー例を確認し、どのように使用できるかを示します。以下のことを行います：

1. AvalancheJS経由で24単語の英語のmnemonicを生成する
2. AvalancheJS経由で外部BIP44 X-Chainアドレスを導入します
3. 富士コーセットからAVAXを入手
4. AvalancheJS
5. Avalanche エクスプローラ上で結果として生じたトランザクションを確認する
6. mnemonicを使用して、ウェブウォレットにサインする

## Mnemonicを生成する

まず[AvalancheJS](https://docs.avax.network/build/tools/avalanchejs)でmnemonicフレーズを作成します。Mnemonicsにより、強力なセキュリティを人間が読みやすいフレーズにエンコードできるようにします。AvalancheJSは、英語、日本語、スペイン語、イタリア語、フランス語、韓国語、チェコ語、ポルトガル語、中国語の簡体字、繁体字など10の言語をサポートしています。

まず、AvalancheJSを通じて、24ワードで英語の[BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)に準拠したmnemonicを生成します。

```typescript
import { Mnemonic } from "avalanche"
const mnemonic: Mnemonic = Mnemonic.getInstance()
const strength: number = 256
const wordlist = mnemonic.getWordlists("english") as string[]
const m: string = mnemonic.generateMnemonic(strength, randomBytes, wordlist)
console.log(m)
// "pool hat domain flame stomach canal fury master farm gown tide supreme winner motion this first divide spray forum wall reopen bounce spider palm"
```

## デリーブアドレス

mnemonicを生成した後、AvalancheJSを使用して[BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)準拠に準拠した階層決定論（HD）キーペアを導出することができます。

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

**`keychain`まだ定義されていないものを使用していることに留意**してください。空のキーチェーンの作成例例例で[AvalancheJSスクリプト](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/newKeyChain.ts)[以下のリソース](fuji-workflow.md#resources)には、AvalancheJS例数十ものリンクがあります。

メンモンコレースが存在する限り、秘密鍵とそのコントロールするアドレスを再生成できます。

## 富士フォーセットからドリップを入手する

富士コーセットからAVAXの「ドリップ」が手に入ることができます。アドレスを[、富士コーセットウェブサイト](https://faucet.avax-test.network)に貼り付けます。これらのAVAXは、富士テストネットのためで、金銭価値は存在しません。

![AVAX要求](../../../.gitbook/assets/faucet-request.png)

フォーセットにより、AVAXをアドレスに送信し、トランザクションID（txID）を返します。このtxIDは、富士テストネットエクスプローラで使用し、トランザクションについて詳しく知ることができます。

![AVAXを受け取る](../../../.gitbook/assets/faucet-response.png)

### トランザクションの詳細を確認する

txIDは`2GjAMJrBUYs8RuK2bXrNCuu34fNpJVor2ubNzvcUDPo5t9nMct`、[富士](https://explorer.avax-test.network/tx/2GjAMJrBUYs8RuK2bXrNCuu34fNpJVor2ubNzvcUDPo5t9nMct)テストネットエクスプローラ上で見ることができます。Avalancheは、メインネットエクスプローラもあります[。](https://explorer.avax.network)

![トランザクション詳細](../../../.gitbook/assets/explorer-1.png)![](../../../.gitbook/assets/explorer-2.png)

### バランスを取得する

また、Fujiエクスプローラを使用して、1st BIP44から派生したアドレス、[X-fuji1cfvdpdqyzpp8pq0g6trmjsrn9pt8nutsfm7a40](https://explorer.avax-test.network/address/fuji1cfvdpdqyzpp8pq0g6trmjsrn9pt8nutsfm7a40)のバランスが得られます。

![1st派生アドレス残高](../../../.gitbook/assets/balance-1.png) 1st![派生アドレストランザクション](../../../.gitbook/assets/balance-2.png)

あるいは、AvalancheJSを使用してバランスを得ることができます。

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

## AVAX送信

フォーセットにより、我々が生成した最初のアドレスに2つのAVAXが送信されます。1番目のアドレスから2番目のアドレスにAVAXを送信しましょう。

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

`ankMr1tD65A9SSto5w4ic1d31t6w42jeu8pfv6v4gRPpMg17g`AvalancheJSを使用してトランザクションが成功したことを確認することができます。

```typescript
const txid: string = "ankMr1tD65A9SSto5w4ic1d31t6w42jeu8pfv6v4gRPpMg17g"
const status: string = await xchain.getTxStatus(txid)
console.log(status)
// Accepted
```

あるいは、富士テスンテ エクスプローラーを使用することもできます。取引は、[Fuji Explorer](https://explorer.avax-test.network/tx/ankMr1tD65A9SSto5w4ic1d31t6w42jeu8pfv6v4gRPpMg17g)上で確認できます。

![トランザクション詳細](../../../.gitbook/assets/explorer-3.png)![](../../../.gitbook/assets/explorer-4.png)

#### バランスを取得する

また、[X-fuji1y75dj6qygj7frw2xtcfn724qfty4aadnmeth6y](https://explorer.avax-test.network/address/X-fuji1y75dj6qygj7frw2xtcfn724qfty4aadnmeth6y)のバランスが得られます。

![第2回派生アドレスバランス](../../../.gitbook/assets/balance-3.png) 2nd![派生アドレストランザクション](../../../.gitbook/assets/balance-4.png)

あるいは、AvalancheJSを使用してバランスを得ることができます。

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

### ウェブウォレットにサインする

最後に、mnemonicを使用して[Avalancheウェブウォレット](https://wallet.avax.network)にアクセスすることができます。AVAXバランスがあり、自動的にmnemonicから3番目のアドレスが導入されることがわかります。

mnemonicを使用して、ウェブウォレットにアクセスします。

![ウォレットにアクセスする](../../../.gitbook/assets/mnemonic.png)

バランスが正しく、「アクティブ」アドレスは3番目の派生アドレスです。

![ウェブウォレットバランス](../../../.gitbook/assets/wallet-1.png) ![3rd派生されたBIP44アドレス](../../../.gitbook/assets/wallet-2.png)

また、ウォレットGUIにより、上記のスクリプトと同じ3アドレスが導入されていることを示しています。

![ウォレット由来](../../../.gitbook/assets/wallet-3.png)![のアドレス AvalancheJS](../../../.gitbook/assets/derived.png)

## 概要

Mainnetに展開する前に、テストとQAingのdapps、スマートコントラクト、金融商品で重要な役割を果たします。AvalancheJS、パブリックAPI、フォーセット、エクスプローラなどのツールツールにより、テストとQA環境がメインネットに近いようにすることができます。

## リソース

追加で貴重なリソースについては、以下のことを参照してください。

### Faucet

[富士コーセット](https://faucet.avax-test.network)により、AVAXをX-ChainあるいはC-Chainアドレスに送信し、テストをサポートします。（このテストネットAvaxは価値はありません。）

### ウォレット

[Avalanche](https://wallet.avax.network)ウェブウォレットは、Avalancheアセットを保存するためのシンプルで安全な非カストディアルウォレットです。メインネット、富士、カスタムネットワークをサポートしています。

### エクスプローラ

Avalanche エクスプローラにより、[メインネット](https://explorer.avax.network)と[富士](https://explorer.avax-test.network)でネットワーク探索が可能になります。

### パブリックAPI

[ここに](https://docs.avax.network/build/tools/public-api)見る

### AvalancheJS例

AvalancheJSスクリプト例は、アセットやNFTsにどのように行われるか、トランザクションを送信したり、バリデータを追加したりする[方法を示す例が60](https://github.com/ava-labs/avalanchejs/tree/master/examples)を超えます。

