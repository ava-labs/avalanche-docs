# on bir Varlık oluştur

Bu örnek X-Chain üzerinde bir varlık yaratır ve Avalanche platformuna yayınlar. Bu sürecin ilk adımı, Avalanche platformunun seçim noktasına bağlı bir AvalancheJS örneğini oluşturmaktır. Bu örnekte [Avash](https://github.com/ava-labs/avalanche-docs/tree/bba457018ce99b2a1bdf51e488b136049254e330/build/tools/avash/README.md) `12345`üzerinden yerel ağı kullanıyoruz. Kod örnekleri yazı yazılarak yazılmıştır. Senaryo her iki tip yazma ve yazma halinde bireysel adımlardan sonra tam olarak doludur.

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

## Yerel ağın önceden finanse edilmiş adresini içeriye aktar

Bir sonraki örnek, ikili verilerle uğraşmak için, bir X-Chain yerel anahtarlığı var. Yerel ağ özel anahtarla erişebileceğiniz önceden finanse edilmiş bir adres `12345`var.`PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN` Son olarak önceden finanse edilen adresi A `Buffer`ve a olarak al.`string`

```typescript
const bintools: BinTools = BinTools.getInstance()
const xKeychain: KeyChain = xchain.keyChain()
const privKey: string = "PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN"
xKeychain.importKey(privKey)
const xAddresses: Buffer[] = xchain.keyChain().getAddresses()
const xAddressStrings: string[] = xchain.keyChain().getAddressStrings()
```

## Mint Çıktısına hazırlanın

`SECPMintOutput`Şimdi yaratacağımız bir diziyi oluşturmamız gerekiyor. Ayrıca yaratacağımız çıkışlar `locktime`için bir `threshold`de ihtiyacımız var. Her X-Chain işlemleri 256 baytlık bir `memo`alana sahip olabilir.

```typescript
const outputs: SECPMintOutput[] = []
const threshold: number = 1
const locktime: BN = new BN(0)
const memo: Buffer = bintools.stringToBuffer("AVM utility method buildCreateAssetTx to create an ANT")
```

## Yeni varlığı tanımla

AvalancheJS kullanarak yeni bir varlık yaratmanın ilk adımı, varlığın niteliklerini belirlemektir. Varlığa bir isim vereceğiz, bir kalça sembolü ve bir de denomination. vereceğiz.

```typescript
const name: string = "TestToken"
const symbol: string = "TEST"
// Where is the decimal point indicate what 1 asset is and where fractional assets begin
// Ex: 1 AVAX is denomination 9, so the smallest unit of AVAX is nanoAVAX (nAVAX) at 10^-9 AVAX
const denomination: number = 3
```

## async/await ayarla

Kalan kod bu `main`fonksiyon tarafından will böylece / desenini `async``await`kullanabiliriz.

```typescript
const main = async (): Promise<any> => {
}
main()
```

## UTXO getir

`xAddressStrings`UTXO. getirmeleri `xchain.getUTXOs`için pas verin.

```typescript
  const avmUTXOResponse: iAVMUTXOResponse = await xchain.getUTXOs(xAddressStrings)
  const utxoSet: UTXOSet = avmUTXOResponse.utxos
```

## İlk durum oluşturuluyor

Yönetilen anahtar tarafından tutulan 507 ünite varlığı olan bir varlığı nane olarak değerlendirmek istiyoruz. Bu durum yaratılma varlıklarının işleminden kaynaklanacak bir durum oluşturmaktadır.

```typescript
// Create outputs for the asset's initial state
const amount: BN = new BN(507)
const secpTransferOutput = new SECPTransferOutput(amount, xAddresses, locktime, threshold)
const initialStates: InitialStates = new InitialStates()

// Populate the initialStates with the outputs
initialStates.addOutput(secpTransferOutput)
```

## Mint Çıktısını Oluştur

Bu varlığı daha sonra daha fazla nane yapabilmek `SECPMintOutput`için bir tane yaratacağız.

```typescript
const secpMintOutput: SECPMintOutput = new SECPMintOutput(xAddresses, locktime, threshold)
outputs.push(secpMintOutput
```

## İmzalı işlem oluşturuluyor

Artık bir varlığın neye benzemesini istediğimizi bildiğimize göre ağa göndermek için bir işlem yaratacağız. `buildCreateAssetTx()`AVM yardım fonksiyonu var. Bu da bunu yapıyor.

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

## İşlemi imzala ve yayınla

Şimdi alışverişi imzalayalım ve Avalanche ağına bildirelim. Başarılı olursa TxID için serileştirilmiş bir [CB58](http://support.avalabs.org/en/articles/4587395-what-is-cb58) dizisini geri verecek.

Şimdi şebekeye göndermeye hazır bir anlaşma that göre, bunu yayınlayalım!

```typescript
const tx: Tx = unsignedTx.sign(xKeychain)
const id: string = await xchain.issueTx(tx)
console.log(id)
```

## İşlemin durumunu öğrenin<a id="get-the-status-of-the-transaction"></a>

Şimdi bu işlemi ağa gönderdiğimize göre işlemlerin geçip geçmediğini anlamak birkaç saniye sürüyor. TxID kullanarak işlem hakkında güncelleştirilmiş bir durum alabiliriz. AVM API aracılığıyla TxID kullanarak.

```typescript
// returns one of: "Accepted", "Processing", "Unknown", and "Rejected"
const status: string = await xchain.getTxStatus(id)
```

Bu durum "kabul edilme", "Süreç", "Bilinmeyen Bilinmeyen ve "Accepted", gibi bir şey olabilir:

* "Kabul edildi" bu işlem ağ tarafından geçerli kabul edildiğini ve çalıştırıldığını gösteriyor
* "İşlem" işlemlerin oylandığını gösteriyor.
* "Bilinmiyor" düğümün işlemle ilgili hiçbir şey bilmediğini gösteriyor ve düğümün onda olmadığını gösteriyor.
* "Reddedilmek" düğümün işlemden haberi olduğunu gösteriyor ama kabul edilen bir işlem ile çelişiyor.

## Yeni yaratılmış varlığı tanımlamak@ info: whatsthis<a id="identifying-the-newly-created-asset"></a>

X-Chain, varlığı yaratan işlemin TxID 'sini kullanır. Bu tanımlayıcı şu andan itibaren varlığın "AssetID" olarak bilinir. X-Chain etrafında mal varlıkları takas edildiğinde, her zaman temsil ettikleri AssetID ile anlaşırlar.

