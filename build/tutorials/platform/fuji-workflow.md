# Fuji Çalışma Workflow

## Tanıştırma

Fuji, Avalanche ağının test ağıdır. Yerel bir şekilde geliştirdikten sonra dapp veya akıllı kontratını test etmek için kullanabilirsin. [\(You](https://docs.avax.network/build/tools/avash) kullanarak yerel bir şekilde test edebilirsiniz.\) Fuji genellikle Avalanche Mainnet, aynı sürümde olmasına rağmen bazen Avalanche yayımlanmamış bir sürümünü çalıştırmaktadır. Genel olarak, Fuji'nin davranışlarının Avalanche as aynı olmasını bekleyebilirsiniz. Kaşif ve cüzdan gibi araçlar Fuji with çalışmalıdır.

Bu özel ders için, nasıl kullanılabileceğini göstermek için Fuji çalışma akışına geçeceğiz. Şu işi yapacağız:

1. AvalancheJS aracılığıyla 24 kelime İngilizce mnemonik oluştur
2. AvalancheJS üzerinden dış BIP44 X-Chain adreslerini ayarla
3. Fuji musluğundan AVAX alın.
4. AVAX gönderin AvalancheJS
5. Avalanche Explorer üzerinde elde edilen işlemleri incele
6. Web cüzdanını imzalamak için mnemonic kullanın

## Bir Mnemonik Oluştur

Başlamak için [AvalancheJS](https://docs.avax.network/build/tools/avalanchejs) ile bir mnemonik cümle oluşturacağız. Mnemonics güçlü güvenliği insan okunabilir bir cümle haline getirmemizi sağlıyor. AvalancheJS İngilizce, Japonca, İspanyolca, İtalyanca, Fransızca, Korece, Portekizce, Portekizce, Çin Geleneksel ve Çin dilleri gibi on dili destekler.

İlk olarak, AvalancheJS aracılığıyla 24 kelime İngilizce [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) uyumlu mnemonik üret.

```typescript
import { Mnemonic } from "avalanche"
const mnemonic: Mnemonic = Mnemonic.getInstance()
const strength: number = 256
const wordlist = mnemonic.getWordlists("english") as string[]
const m: string = mnemonic.generateMnemonic(strength, randomBytes, wordlist)
console.log(m)
// "pool hat domain flame stomach canal fury master farm gown tide supreme winner motion this first divide spray forum wall reopen bounce spider palm"
```

## Adresleri Ayarla

Bir mnemonik ürettikten sonra [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) uyumlu hiyerarşik deterministik \(HD\) anahtar çiftleri elde etmek için AvalancheJS kullanabiliriz.

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

****Kullandığımız `keychain`şeyi henüz tanımlamadığımız bir not edin. Boş bir anahtar zinciri oluşturmak [bu örnek AvalancheJS](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/newKeyChain.ts) in görülebilir. [Aşağıda listelenmiş kaynaklarda](fuji-workflow.md#resources) düzinelerce AvalancheJS örneğiyle bağlantılar vardır.

menmonic tabirin olduğu sürece özel anahtarlarınızı ve kontrol ettikleri adresleri yeniden üretebilirsiniz.

## Fuji from bir Drip al.

Fuji musluğundan bir damla AVAX alabiliriz. Adresi [Fuji faucet sitesine](https://faucet.avax-test.network) yapıştır. Bu AVAX, Fuji Testnet için ve parasal değeri yoktur.

![AVAX İsteniyor](../../../.gitbook/assets/faucet-request.png)

Musluk adrese biraz AVAX gönderir ve işlem kimliği \(txID\) geri verir. Bu txID işlemler hakkında daha fazla bilgi almak için Fuji Testnet Explorer ile kullanılabilir.

![AVAX alınıyor](../../../.gitbook/assets/faucet-response.png)

### İşlem Detaylarını Kontrol Et

`2GjAMJrBUYs8RuK2bXrNCuu34fNpJVor2ubNzvcUDPo5t9nMct`TxID, [Fuji Testnet Explorer](https://explorer.avax-test.network/tx/2GjAMJrBUYs8RuK2bXrNCuu34fNpJVor2ubNzvcUDPo5t9nMct)'da görülebilir. Avalanche de bir [Mainnet Explorer](https://explorer.avax.network) var.

![İşlem](../../../.gitbook/assets/explorer-1.png) ![ayrıntıları Girdi ve Çıktı ayrıntıları](../../../.gitbook/assets/explorer-2.png)

### Dengeli

Ayrıca Fuji Explorer'ı 1. BIP44 türetilmiş [adres için](https://explorer.avax-test.network/address/fuji1cfvdpdqyzpp8pq0g6trmjsrn9pt8nutsfm7a40) kullanabiliriz: X-fuji1cfdpdqyzpp8pq0g6trmjsrn9pt8nutsfm7a40.

![1. türetilen adres dengesi](../../../.gitbook/assets/balance-1.png) ![1. türetilen adres transactions](../../../.gitbook/assets/balance-2.png)

Alternatif olarak, dengeyi sağlamak için AvalancheJS kullanabiliriz.

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

## AVAX Gönderiyor

Musluk ürettiğimiz ilk adrese 2 AVAX gönderdi. Birinci adresten 2. adrese Let's gönderelim.

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

### Başarıyı Doğrulayın

`ankMr1tD65A9SSto5w4ic1d31t6w42jeu8pfv6v4gRPpMg17g`İşlemin AvalancheJS kullanılarak başarılı olduğunu doğrulayabiliriz.

```typescript
const txid: string = "ankMr1tD65A9SSto5w4ic1d31t6w42jeu8pfv6v4gRPpMg17g"
const status: string = await xchain.getTxStatus(txid)
console.log(status)
// Accepted
```

Alternatif olarak Fuji Tesntet Explorer'ı kullanabiliriz. Bu işlem [Fuji Explorer](https://explorer.avax-test.network/tx/ankMr1tD65A9SSto5w4ic1d31t6w42jeu8pfv6v4gRPpMg17g)'da görülebilir.

![İşlem](../../../.gitbook/assets/explorer-3.png) ![ayrıntıları Girdi ve Çıktı ayrıntıları](../../../.gitbook/assets/explorer-4.png)

#### Dengeli

Ayrıca 2. adrese göre Fuji Explorer ile birlikte [X-fuji1y75dj6qygj7frw2xtcfn724qfty4aadnmeth6y](https://explorer.avax-test.network/address/X-fuji1y75dj6qygj7frw2xtcfn724qfty4aadnmeth6y)'yi de kullanabiliriz.

![2. türetilmiş adres dengesi](../../../.gitbook/assets/balance-3.png) ![2. türetilmiş adres işlemleri](../../../.gitbook/assets/balance-4.png)

Alternatif olarak, dengeyi sağlamak için AvalancheJS kullanabiliriz.

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

### Web Cüzdanını imzala

Son olarak, [Avalanche Web Wallet](https://wallet.avax.network). erişmek için mnemonik kullanabiliriz. AVAX dengesi olduğunu ve otomatik olarak from 3. adrese ulaşmasını sağlayacağız.

Web Cüzdan erişmek için mnemonik kullan.

![Cüzdanı aç.](../../../.gitbook/assets/mnemonic.png)

Denge doğru ve "aktif" adresi 3. türetilmiş adres.

![Web cüzdan dengesi](../../../.gitbook/assets/wallet-1.png) ![3. BIP44 adresi](../../../.gitbook/assets/wallet-2.png)

Ayrıca cüzdanın GUI üzerinde bizim our aynı 3 adresi olduğunu gösterdiğini de not edin.

![Cüzdan türetilmiş adresler](../../../.gitbook/assets/wallet-3.png) ![AvalancheJS elde edilmiş](../../../.gitbook/assets/derived.png) adresler

## Özetle

Fuji Testnet dapps, gitmeden önce QAing dapps, akıllı sözleşmeler ve finansal ürünlerde kritik bir rol oynar. AvalancheJS, halka açık API, musluk ve kaşif gibi araçlar test ve QA ortamınızın to yakın olmasını sağlamaya yardımcı olur böylece on başladığınızda emin olabilirsiniz.

## Kaynaklar

Ek ve değerli kaynaklar için lütfen aşağıda görün.

### Faucet

[Fuji Faucet](https://faucet.avax-test.network) teste yardımcı olmak için AVAX X-Chain veya C-Chain adreslerine gönderir. \(Bu testnet Avax değeri yok.\)

### Cüzdan

[Avalanche Web](https://wallet.avax.network) Cüzdanı, Avalanche varlıklarını depolamak için basit, güvenli, koruma dışı bir cüzdandır. Mainnet, Fuji ve özel ağları destekler.

### Kaşif

Avalanche Explorer [Mainnet](https://explorer.avax.network) ve [Fuji](https://explorer.avax-test.network) kanalını araştırmanızı sağlıyor.

### Kamu API

[Şuraya](https://docs.avax.network/build/tools/public-api) bak.

### AvalancheJS Örnekleri

Varlık ve NFTs, nasıl yapılacağını gösteren 60'tan fazla [örnek AvalancheJS betikleri](https://github.com/ava-labs/avalanchejs/tree/master/examples) vardır, işlemler göndermek, doğrulayıcılar ve daha fazlasını eklemek.

