# X-Chainでアセットを作成する

この例では、X-Chain上にアセットを作成し、Avalancheプラットフォームに公開します。このプロセスの最初のステップは、AvalancheJSの選択肢のAvalancheプラットフォームエンドポイントに接続したインスタンスを作成することです。この例では、[Avash](https://github.com/ava-labs/avalanche-docs/tree/bba457018ce99b2a1bdf51e488b136049254e330/build/tools/avash/README.md)経由でローカルネットワーク`12345`を使用しています。コードの例はtypescriptで書かれています。スクリプトは、個々のステップの後で、typescript と javascript の両方で完全にあります。

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

## ローカルネットワークの事前資金済みのアドレスをインポートします。

次に、バイナリデータ、X-Chainローカルキーチェーンを扱うためのbintoolsのインスタンスを取得します。ローカルネットワーク`12345`には事前申請済みのアドレスがあり、`PrivateKey-ewoqjJP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGgztUrTXtNNN`.最後に、事前資金済みのアドレスを`Buffer`として、`および文字列`として取得します。

```typescript
const bintools: BinTools = BinTools.getInstance()
const xKeychain: KeyChain = xchain.keyChain()
const privKey: string = "PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN"
xKeychain.importKey(privKey)
const xAddresses: Buffer[] = xchain.keyChain().getAddresses()
const xAddressStrings: string[] = xchain.keyChain().getAddressStrings()
```

## Mint 出力の準備

これで、作成する`SECPMintOutput`の空の配列を作成する必要があります。また、作成する出力の`閾値`と`ロックタイム`も必要です。X-Chainトランザクションは、任意のデータから最大256バイトまでの`メモフィールド`を格納できます。

```typescript
const outputs: SECPMintOutput[] = []
const threshold: number = 1
const locktime: BN = new BN(0)
const memo: Buffer = bintools.stringToBuffer("AVM utility method buildCreateAssetTx to create an ANT")
```

## 新しいアセットを記述する

AvalancheJSを使用して新しい資産を作成する最初のステップは、資産の質を決定することです。アセットに名前、ティッカーシンボル、およびデノミネーションを付与します。

```typescript
const name: string = "TestToken"
const symbol: string = "TEST"
// Where is the decimal point indicate what 1 asset is and where fractional assets begin
// Ex: 1 AVAX is denomination 9, so the smallest unit of AVAX is nanoAVAX (nAVAX) at 10^-9 AVAX
const denomination: number = 3
```

## async/awaitを設定する

残りのコードはこの`メイン`関数でカプセル化され、`async`/`await` パターンを使用できます。

```typescript
const main = async (): Promise<any> => {
}
main()
```

## UTXO を取得する

`xAddressStrings` を `xchain.`getUTXO に渡して UTXO を取得します。

```typescript
  const avmUTXOResponse: iAVMUTXOResponse = await xchain.getUTXOs(xAddressStrings)
  const utxoSet: UTXOSet = avmUTXOResponse.utxos
```

## JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-

マネージドキーが保有するアセットの507ユニットでアセットをミントしたいです。これにより、Assetトランザクションの作成結果となる状態が設定されます。

```typescript
// Create outputs for the asset's initial state
const amount: BN = new BN(507)
const secpTransferOutput = new SECPTransferOutput(amount, xAddresses, locktime, threshold)
const initialStates: InitialStates = new InitialStates()

// Populate the initialStates with the outputs
initialStates.addOutput(secpTransferOutput)
```

## Mint 出力の作成

また、`SECPMintOutput` を作成して、このアセットをさらに多くミントできるようにします。

```typescript
const secpMintOutput: SECPMintOutput = new SECPMintOutput(xAddresses, locktime, threshold)
outputs.push(secpMintOutput
```

## 署名済みトランザクションの作成

JavaScriptを有効にしますAVM ヘルパー関数 `buildCreateAssetTx()` があります。これだけです。

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

## トランザクションに署名して発行します。

さて、トランザクションに署名してAvalancheネットワークに発行しましょう。成功すると、TxID の [CB58](http://support.avalabs.org/en/articles/4587395-what-is-cb58) シリアライズされた文字列を返します。

これで、ネットワークに送信する署名済みトランザクションができましたので、それを発行しましょう！

```typescript
const tx: Tx = unsignedTx.sign(xKeychain)
const id: string = await xchain.issueTx(tx)
console.log(id)
```

## JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-<a id="get-the-status-of-the-transaction"></a>

トランザクションをネットワークに送信したので、トランザクションが通過したかどうかを判断するのに数秒かかります。TxID を使用して、トランザクションの更新ステータスを AVM API から取得できます。

```typescript
// returns one of: "Accepted", "Processing", "Unknown", and "Rejected"
const status: string = await xchain.getTxStatus(id)
```

ステータスは "Accepted", "Processing", "Unknown", "Rejected" のいずれかです:

* "Accepted" はトランザクションがネットワークによって有効であると認められ、実行されたことを示します。
* "Processing"はトランザクションが投票されていることを示します。
* "Unknown" は、ノードがトランザクションについて何も知らないことを示し、ノードがそれを持っていないことを示します。
* "Rejected" は、トランザクションのノードがトランザクションを知っていることを示しますが、受け入れられたトランザクションと矛盾します。

## 新しく作成されたアセットの識別<a id="identifying-the-newly-created-asset"></a>

X-Chainは、アセットの固有の識別子としてアセットを作成したトランザクションのTxIDを使用します。この一意の識別子は、今後、アセットの「AssetID」として知られています。X-Chainの周りでアセットが取引される場合、AssetIDは常に参照します。

