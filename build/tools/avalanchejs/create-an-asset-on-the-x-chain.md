# X-Chain上でアセットを作成する

この例では、X-Chain上にアセットを作成し、Avalancheプラットフォームに公開します。このプロセスにおける最初のステップは、我々のAvalancheプラットフォームエンドポイントに接続されたAvalancheJSのインスタンスを作成することです。この例では[、Avash](https://github.com/ava-labs/avalanche-docs/tree/bba457018ce99b2a1bdf51e488b136049254e330/build/tools/avash/README.md)経由`12345`でローカルネットワークを使用しています。コードの例は、タイプスクリプトで書かれています。スクリプトは、個々のステップ後に、タイプスクリプトとジャバスクリプトの両方で完全に完了します。

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

## ローカルネットワークの事前資金でアドレスをインポートする

次に、X-Chainローカルキーチェーンであるバイナリデータを扱うためのビンツールが取得されます。ローカルネットワークには、事前に資金済みされたアドレスが`12345`存在します。`PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN`最後に、事前に資金されたアドレスをaとして、aとして取得`Buffer`します。`string`

```typescript
const bintools: BinTools = BinTools.getInstance()
const xKeychain: KeyChain = xchain.keyChain()
const privKey: string = "PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN"
xKeychain.importKey(privKey)
const xAddresses: Buffer[] = xchain.keyChain().getAddresses()
const xAddressStrings: string[] = xchain.keyChain().getAddressStrings()
```

## ミント出力に備える

`SECPMintOutput`今度作成する空のアレイを作成する必要があります。また、作成しようとするアウトプット`locktime`も必要`threshold`です。各X-Chainトランザクションは、任意のデータから256バイトまでの`memo`フィールドを含めることができます。

```typescript
const outputs: SECPMintOutput[] = []
const threshold: number = 1
const locktime: BN = new BN(0)
const memo: Buffer = bintools.stringToBuffer("AVM utility method buildCreateAssetTx to create an ANT")
```

## 新しいアセットを説明する

AvalancheJSを使用して新しいアセットを作成する最初のステップは、アセットの品質を判断することです。我々はアセットに名前、ティッカーシンボル、そしてデノミットを付与します。

```typescript
const name: string = "TestToken"
const symbol: string = "TEST"
// Where is the decimal point indicate what 1 asset is and where fractional assets begin
// Ex: 1 AVAX is denomination 9, so the smallest unit of AVAX is nanoAVAX (nAVAX) at 10^-9 AVAX
const denomination: number = 3
```

## async/await

残りのコードは、この`main`関数でカプセル化され、そのため、/パターンを使用できます`async``await`。

```typescript
const main = async (): Promise<any> => {
}
main()
```

## UTXO

`xAddressStrings`UTXOを取得`xchain.getUTXOs`する

```typescript
  const avmUTXOResponse: iAVMUTXOResponse = await xchain.getUTXOs(xAddressStrings)
  const utxoSet: UTXOSet = avmUTXOResponse.utxos
```

## 初期ステートを作成する

管理鍵により保持されるアセットが507ユニットで、アセットをミントしたいと思います。これにより、アセットトランザクションを作成するに起因するステータスを設定します。

```typescript
// Create outputs for the asset's initial state
const amount: BN = new BN(507)
const secpTransferOutput = new SECPTransferOutput(amount, xAddresses, locktime, threshold)
const initialStates: InitialStates = new InitialStates()

// Populate the initialStates with the outputs
initialStates.addOutput(secpTransferOutput)
```

## ミント出力を作成する

また、後でより多くのこのアセットをミントできる`SECPMintOutput`ように作りたいと思います。

```typescript
const secpMintOutput: SECPMintOutput = new SECPMintOutput(xAddresses, locktime, threshold)
outputs.push(secpMintOutput
```

## 署名トランザクションを作成する

アセットがどのようなものを求めるかを知ったことで、ネットワークに送信するためのトランザクションを作成します。AVMヘルパ機能があり、そのような機能を搭載`buildCreateAssetTx()`します。

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

## トランザクションにサイン、発行

次に、トランザクションにサインし、Avalancheネットワークに発行しましょう。成功した場合、TxIDのための[CB58](http://support.avalabs.org/en/articles/4587395-what-is-cb58)シリアライズ文字列を返します。

さあ、ネットワークに送信できる署名済みのトランザクションが完了しましたので、発行しましょう！

```typescript
const tx: Tx = unsignedTx.sign(xKeychain)
const id: string = await xchain.issueTx(tx)
console.log(id)
```

## トランザクションのステータスを取得する<a id="get-the-status-of-the-transaction"></a>

トランザクションをネットワークに送信したことにより、トランザクションが完了したかどうか判断まで数秒でかかります。AVM APIを通じてTxIDを使用して、トランザクション上のステータスが更新されます。

```typescript
// returns one of: "Accepted", "Processing", "Unknown", and "Rejected"
const status: string = await xchain.getTxStatus(id)
```

ステータスは、「受け入れ」、「処理」、「未知」、「拒否」のいずれかでできます。

* 「承認」は、トランザクションがネットワークにより有効と受け付けられ、実行されていることを示します。
* 「処理」は、トランザクションが投票されていることを示します。
* 「未知」は、ノードがトランザクションについて何も知らないことを示し、ノードが持つことがないことを示します。
* 「拒否」は、トランザクションを知っているノードが示しますが、受け入れられたトランザクションと競合します。

## 新しく作成されたアセットを識別<a id="identifying-the-newly-created-asset"></a>

X-Chainは、トランザクションのTxIDを使用します。このトランザクションは、アセットを生み出し、アセットのユニークな識別子として使用します。この一意識別子は、以後、アセットの「AssetID」として知られています。X-Chain周りでアセットが取引される場合、常にAssetIDを参照してください。

