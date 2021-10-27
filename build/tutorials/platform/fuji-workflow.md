# Fujiワークフロー

## はじめに

Fujiは、Avalancheネットワークのテストネットワークです。ローカルで開発した後に、それを使ってdAppまたはスマートコントラクトをテストすることができます。（[Avash](https://docs.avax.network/build/tools/avash)を使用してローカルでテストできます。）Fujiは、一般的に、Avalancheメインネットと同じバージョンですが、時には、リリース前のAvaalancheGoバージョンを実行していることがあります。一般的に、Fujiの動作は、Avalancheメインネットとほぼ同じものであると期待できます。エクスプローラやウォレットなどのツールは、Fuji Testnetで動作する必要があります。

このチュートリアルでは、Fujiのワークフロー例を確認して、使用方法を説明します。次を行います。

1. AvalancheJSを介して24単語の英語ニーモニックを生成する
2. AvalancheJSを介して外部BIP44 X-Chainアドレスをデライブする
3. FujiフォーセットからAVAXを取得する
4. AvalancheJSを介してAVAXを送信する
5. Avalancheエクスプローラで結果として生じるトランザクションを確認する
6. ニーモニックを使用して、ウェブウォレットにログインする

## ニーモニックを生成する

はじめに、[AvalancheJS](https://docs.avax.network/build/tools/avalanchejs)でニーモニックフレーズを作成します。ニーモニックにより、人間が読めるフレーズに強いセキュリティをエンコードすることができます。AvalancheJSは、英語、日本語、スペイン語、イタリア、フランス語、韓国語、チェコ語、ポルトガル語、中国簡体字、中国繁体語の10言語をサポートしています。

まず、AvalancheJS経由で24ワード英語の[BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)準拠ニーモニックを生成します。

```typescript
import { Mnemonic } from "avalanche"
const mnemonic: Mnemonic = Mnemonic.getInstance()
const strength: number = 256
const wordlist = mnemonic.getWordlists("english") as string[]
const m: string = mnemonic.generateMnemonic(strength, randomBytes, wordlist)
console.log(m)
// "pool hat domain flame stomach canal fury master farm gown tide supreme winner motion this first divide spray forum wall reopen bounce spider palm"
```

## アドレスをデライブする

ニーモニックを生成したら、AvalancheJSで、[BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)準拠の階層決定（HD）鍵ペアをデライブすることができます。

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

まだ定義されていない`keychain`を使用していることに**注意**してください。空のキーチェーンの作成は、[このAvaalancheJSスクリプト例](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/newKeyChain.ts)で確認できます。下記に[リストされているリソース](fuji-workflow.md#resources)には、AvalancheJS例へのリンクがたくさんあります。

ニーモニックフレーズがある限りは、秘密鍵と管理するアドレスを再生成できます。

## Fujiフォーセットからドリップを取得する

FujiフォーセットからAVAXの「ドリップ」を取得できます。アドレスを[Fujiフォーセットウェブサイト](https://faucet.avax-test.network)に貼り付けます。これらのAVAXはFuji Testnet用であり、通貨価値はありません。

![AVAXをリクエストする](../../../.gitbook/assets/faucet-request.png)

フォーセットは、アドレスに一部のAVAXを送信し、トランザクションID（txID）を返します。このtxIDは、トランザクションの詳細を確認するために、Fuji Testnet Explorerで使用できます。

![AVAXを受信する](../../../.gitbook/assets/faucet-response.png)

### トランザクションの詳細を確認する

txID`2GjAMJrBUYs8RuK2bXrNCuu34fNpJVor2ubNzvcUDPo5t9nMct`は[Fuji Testnet Explorer](https://explorer.avax-test.network/tx/2GjAMJrBUYs8RuK2bXrNCuu34fNpJVor2ubNzvcUDPo5t9nMct)で確認できます。Avalancheには[Mainnet Explorer](https://explorer.avax.network)もあります。

![トランザクションの詳細](../../../.gitbook/assets/explorer-1.png) ![入力と出力の詳細](../../../.gitbook/assets/explorer-2.png)

### 残高を取得する

また、Fuji  Explorerを使用して最初のBIP44派生アドレス、X-fuji1cfvdvdqyzpppc8[X-fuji1cfvdpdqyzpp8pq0g6trmjsrn9pt8nutsfm7a40](https://explorer.avax-test.network/address/fuji1cfvdpdqyzpp8pq0g6trmjsrn9pt8nutsfm7a40)の残高を取得することができます。

![最初の派生アドレス残高](../../../.gitbook/assets/balance-1.png) ![最初の派生アドレストランザクション](../../../.gitbook/assets/balance-2.png)

または、AvalancheJSで残高を取得することができます。

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

フォーセットは、2つのAVAXを生成した最初のアドレスに送信しました。最初のアドレスから2つ目のアドレスにAVAXを送信します。

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

### 成功を検証する

トランザクション`ankMr1tD65A9SSto5w4ic1d31t6w42jeu8pfv6v4gRPpMg17g`がAvalancheJSで成功したことを確認できます。

```typescript
const txid: string = "ankMr1tD65A9SSto5w4ic1d31t6w42jeu8pfv6v4gRPpMg17g"
const status: string = await xchain.getTxStatus(txid)
console.log(status)
// Accepted
```

また、Fuji Tesntetエクスプローラを使用できます。トランザクションは[Fuji Explorer](https://explorer.avax-test.network/tx/ankMr1tD65A9SSto5w4ic1d31t6w42jeu8pfv6v4gRPpMg17g)で確認できます。

![トランザクションの詳細](../../../.gitbook/assets/explorer-3.png) ![入力と出力の詳細](../../../.gitbook/assets/explorer-4.png)

#### 残高を取得する

また、Fuji Explorerを使用して2つ目のアドレス[X-fuji1y75dj6qygj7frw2xtcfn724qfty4aadnmeth6y](https://explorer.avax-test.network/address/X-fuji1y75dj6qygj7frw2xtcfn724qfty4aadnmeth6y)の残高を取得できます。

![2つ目の派生アドレス残高](../../../.gitbook/assets/balance-3.png) ![2つ目の派生アドレストランザクション](../../../.gitbook/assets/balance-4.png)

または、AvalancheJSで残高を取得することができます。

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

### ウェブウォレットにサインインする

最後に、ニーモニックで[Avalancheウェブウォレット](https://wallet.avax.network)にアクセスできます。AVAX残高があり、自動的にニーモニックから３つ目のアドレスをデライブしているのが分かります。

ニーモニックでウェブウォレットにアクセスします。

![ウォレットにアクセスする](../../../.gitbook/assets/mnemonic.png)

残高は正しく、「アクティブ」なアドレスは3つ目の派生アドレスです。

![ウェブウォレット残高](../../../.gitbook/assets/wallet-1.png) ![3つ目の派生BIP44アドレス](../../../.gitbook/assets/wallet-2.png)

また、ウォレットGUIが上記のスクリプトと同じ3つのアドレスを派生したことを示している点に注意してください。

![アドレス派生のウォレット](../../../.gitbook/assets/wallet-3.png) ![AvalancheJS派生のアドレス](../../../.gitbook/assets/derived.png)

## まとめ

Fuji Testnetは、テストを行い、dapps、スマートコントラクトや金融商品のQAを行うのに重要な役割を果たしています。AvaalancheJS、公開API、フォーセット、エクスプローラのようなツールを使用して、テストとQA環境がメインネットに近くなるよう役立てれば、メインネットで自信を持って起動できます。

## リソース

追加の貴重なリソースについては、次を参照してください。

### フォーセット

[Fujiフォーセット](https://faucet.avax-test.network)は、X-Chainまたは C-ChainアドレスにAVAXを送信しますから、テストのサポートに役立ちます。（このテストネットAvaxには値がありません。）

### ウォレット

[Avalanche Web Wallet](https://wallet.avax.network)は、Avalanche資産を保存するシンプルで安全な非管理のウォレットです。Mainnet、Fuji、カスタムネットワークをサポートしています。

### エクスプローラ

Avalanche Explorerでは、[Mainnet](https://explorer.avax.network)と[Fuji](https://explorer.avax-test.network)でネットワークを探検することができます。

### 公開API

[こちら](https://docs.avax.network/build/tools/public-api)を参照してください。

### AvalancheJSの例

資産、NFT、トランザクション送信、バリデーターなどの方法を説明する、60[を超えるAvalancheJSスクリプトがあ](https://github.com/ava-labs/avalanchejs/tree/master/examples)ります。

