# X-Chain上で資産を作成する

この例では、X-Chain上に資産を作成し、Avalancheプラットフォームでそれを公開しますこのプロセスの最初のステップは、選択したAvalancheプラットフォームエンドポイントに接続されたAvalancheJSのインスタンスを作成することです。この例では、[Avash](https://github.com/ava-labs/avalanche-docs/tree/bba457018ce99b2a1bdf51e488b136049254e330/build/tools/avash/README.md)を介`12345`してローカルネットワークを使用しています。コードの例は、TypeScriptで書かれています。個々のステップの後、スクリプトはTypeScriptとJavaScriptの両方で完全になります

```typescript
import {
  Avalanche,
  BinTools,
  BN,
  Buffer
 } from "avalanche"
import {
  AVMAPI,
  InitialStates,
  KeyChain,
  SECPMintOutput,
  SECPTransferOutput,
  Tx,
  UnsignedTx,
  UTXOSet
} from "avalanche/dist/apis/avm"
import {
  iAVMUTXOResponse
} from "avalanche/dist/apis/avm/interfaces"

const ip: string = "localhost"
const port: number = 9650
const protocol: string = "http"
const networkID: number = 12345 // Default is 1, we want to override that for our local network
const avalanche: Avalanche = new Avalanche(ip, port, protocol, networkID)
const xchain: AVMAPI = avalanche.XChain() // Returns a reference to the X-Chain used by AvalancheJS
```

## ローカルネットワークの資金提供済のアドレスをインポートする

次に、バイナリデータ、X-Chainローカルキーチェーンを扱うためのBinToolsのインスタンスを取得します。ローカルネットワークには、秘密鍵でアクセスできる資金提供済のアドレスが存在`12345`しています`PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN`最後に、資金提供済のアドレスを`Buffer`として、また、`string` として取得します。

```typescript
const bintools: BinTools = BinTools.getInstance()
const xKeychain: KeyChain = xchain.keyChain()
const privKey: string = "PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN"
xKeychain.importKey(privKey)
const xAddresses: Buffer[] = xchain.keyChain().getAddresses()
const xAddressStrings: string[] = xchain.keyChain().getAddressStrings()
```

## ミント出力の準備

そして、`SECPMintOutput`用に空の配列を作成する必要があります。作成する出力には、`locktime`と`threshold`を必要とします。各X-Chainトランザクションには、最大256バイトまでのフィー`memo`フィールドが含まれています。

```typescript
const outputs: SECPMintOutput[] = []
const threshold: number = 1
const locktime: BN = new BN(0)
const memo: Buffer = bintools.stringToBuffer("AVM utility method buildCreateAssetTx to create an ANT")
```

## 新しい資産を説明する

AvalancheJSを使用して新しい資産を作成する最初のステップは、資産の質を判断することです。資産に名前、ティッカーシンボル、そしてデノミネーションを指定します。

```typescript
const name: string = "TestToken"
const symbol: string = "TEST"
// Where is the decimal point indicate what 1 asset is and where fractional assets begin
// Ex: 1 AVAX is denomination 9, so the smallest unit of AVAX is nanoAVAX (nAVAX) at 10^-9 AVAX
const denomination: number = 3
```

## async/awaitを設定する

残りのコードは、この`main`機能でカプセル化されるため、`async`パター`await`ンを使用できるようになります。

```typescript
const main = async (): Promise<any> => {
}
main()
```

## UTXOをフェッチする

UTXOをフェッチするため、を `xAddressStrings`に渡します`xchain.getUTXOs`。

```typescript
  const avmUTXOResponse: iAVMUTXOResponse = await xchain.getUTXOs(xAddressStrings)
  const utxoSet: UTXOSet = avmUTXOResponse.utxos
```

## 初期状態の作成をする

管理鍵が保有している資産の507単位で資産をミントしたいと思います。これにより、資産トランザクションの作成に起因する状態を設定します。

```typescript
// Create outputs for the asset's initial state
const amount: BN = new BN(507)
const secpTransferOutput = new SECPTransferOutput(amount, xAddresses, locktime, threshold)
const initialStates: InitialStates = new InitialStates()

// Populate the initialStates with the outputs
initialStates.addOutput(secpTransferOutput)
```

## ミント出力を作成する

また、この資産を後でより多くミントできるように、`SECPMintOutput`を作成したいと思います。

```typescript
const secpMintOutput: SECPMintOutput = new SECPMintOutput(xAddresses, locktime, threshold)
outputs.push(secpMintOutput
```

## 署名トランザクションの作成

資産がどのようになるかが分かったので、次はネットワークに送信するトランザクションを作成します。それを行うAVMヘルパー機能`buildCreateAssetTx()`があります。

```typescript
const unsignedTx: UnsignedTx = await xchain.buildCreateAssetTx(
  utxoSet,
  xAddressStrings,
  xAddressStrings,
  initialStates,
  name,
  symbol,
  denomination,
  outputs,
  memo
)
```

## トランザクションに署名し発行する

次に、トランザクションに署名し、Avalancheネットワークにそれを発行します。成功すると、TxIDの[CB58](http://support.avalabs.org/en/articles/4587395-what-is-cb58)シリアライズされた文字列を返します。

さて、署名トランザクションをネットワークに送信する準備ができましたので、それを発行しましょう！

```typescript
const tx: Tx = unsignedTx.sign(xKeychain)
const id: string = await xchain.issueTx(tx)
console.log(id)
```

## トランザクションのステータスを取得する<a id="get-the-status-of-the-transaction"></a>

トランザクションをネットワークに送信しました。トランザクションが完了したかどうかを判断するのに数秒かかります。AVM APIを介し、TxIDを使ってトランザクション上で更新されたステータスを取得することができます。

```typescript
// returns one of: "Accepted", "Processing", "Unknown", and "Rejected"
const status: string = await xchain.getTxStatus(id)
```

ステータスは、「承認」、「処理中」、「不明」、「拒否」のいずれかです。

* 「承認」は、トランザクションがネットワークで有効として受け入れられ、実行されていることを示します。
* 「処理中」は、トランザクションが処理中であることを示します。
* 「不明」は、ノードがトランザクションについて何も知らず、ノードが持っていないことを示します。
* 「拒否」は、トランザクションを知っていることを示しますが、承認トランザクションとは反対です。

## 新しく作成された資産を識別する<a id="identifying-the-newly-created-asset"></a>

X-Chainは、資産の固有識別子として、資産を作成したトランザクションのTxIDを使用します。この固有識別子は、資産の「AssetID」として知られています。X-Chain周辺で資産が取引される場合、それらは常にAssetIDを参照します。

