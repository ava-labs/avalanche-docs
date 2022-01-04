# Fuji İş Akışı

## Giriş

Fuji, Avalanche ağının test ağıdır. Fuji'yi dapp'inizi veya akıllı sözleşmenizi yerel olarak geliştirdikten sonra test etmek için kullanabilirsiniz. \(Ögeleri yerel olarak test etmek için [Avash](https://docs.avax.network/build/tools/avash)'ı kullanabilirsiniz.\) Fuji tipik olarak Avalanche Ana Ağı \(Mainnet\) ile aynı sürümdedir ama bazen AvalancheGo'nun henüz çıkarılmamış bir sürümünü çalıştırmaktadır. Genel olarak Fuji'nin davranışının Avalanche Mainnet ile aşağı yukarı aynı olmasını bekleyebilirsiniz. Tarayıcılar ve cüzdanlar gibi araçların Fuji Testnet ile çalışması beklenir.

Bu eğitim makalesinde Fuji'nin nasıl kullanılabileceğini örnek bir Fuji iş akışı üzerinde göstereceğiz. Sırasıyla şunları yapacağız:

1. AvalancheJS yoluyla 24 sözcükten oluşan ingilizce bir nimonik üretilmesi
2. AvalancheJS yoluyla harici BIP44 X-Chain adreslerinin türetilmesi
3. Fuji musluğundan \(faucet\) AVAX alma
4. AvalancheJS üzerinden AVAX gönderme
5. Ortaya çıkan işlemin Avalanche Tarayıcı üzerinde incelenmesi
6. Nimoniği kullanarak web cüzdana giriş yapmak

## Bir Nimonik Üretme

Başlamak için, [AvalancheJS](https://docs.avax.network/build/tools/avalanchejs) yoluyla bir nimonik söz öbeği \(mnemonic phrase\) oluşturacağız. Nimonikler güçlü bir güvenlik yapısını insan tarafından okunabilir bir söz öbeği halinde şifrelememize imkan verir. AvalancheJS 10 dili -İngilizce, Japonca, İspanyolca, İtalyanca, Fransızca, Korece, Çekçe, Portekizce, Basitleştirimiş Çince ve Geleneksel Çince- destekler.

Önce AvalancheJS yoluyla 24 sözcükten oluşan, [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) uyumlu bir nimonik üretin.

```typescript
import { Mnemonic } from "avalanche"
const mnemonic: Mnemonic = Mnemonic.getInstance()
const strength: number = 256
const wordlist = mnemonic.getWordlists("english") as string[]
const m: string = mnemonic.generateMnemonic(strength, randomBytes, wordlist)
console.log(m)
// "pool hat domain flame stomach canal fury master farm gown tide supreme winner motion this first divide spray forum wall reopen bounce spider palm"
```

## Adresler Türetme

Bir nimonik ürettikten sonra AvalancheJS'yi kullanarak [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) uyumlu hiyerarşik deterministik \(HD\) anahtar çiftleri türetebiliriz.

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

**Not**: Henüz tanımlanmamış olan `keychain`'i kullandığımızı görüyorsunuz. Boş bir anahtar zinciri yaratılması [bu örnek AvalancheJS script'inde](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/newKeyChain.ts) görülebilir. [Aşağıda sıralanan kaynaklarda](fuji-workflow.md#resources) düzinelerce AvalancheJS örneğine bağlantılar vardır.

Elinizde nimonik söz öbeği olduğu sürece özel anahtarlarınızı ve bunların kontrol ettikleri adresleri yeniden üretebilirsiniz.

## Fuji Musluğundan Bir Damla Alma

Fuji musluğundan bir "damla" AVAX alabiliriz. Adresi [Fuji musluk web sitesine](https://faucet.avax-test.network) yapıştırın. Bu AVAX'lar Fuji Testnet içindir ve parasal bir değeri yoktur.

![AVAX İsteme](/img/faucet-request.png)

Musluk bu adrese bir miktar AVAX gönderecek ve bir işlem kimliği \(txID\) döndürecektir. Bu txID Fuji Testnet Tarayıcı'yla kullanılarak işlem hakkında daha fazla bilgi edinilebilir.

![AVAX Alma](/img/faucet-response.png)

### İşlem Bilgilerini Kontrol Etme

txID, yani `2GjAMJrBUYs8RuK2bXrNCuu34fNpJVor2ubNzvcUDPo5t9nMct`, [Fuji Testnet Tarayıcı](https://explorer.avax-test.network/tx/2GjAMJrBUYs8RuK2bXrNCuu34fNpJVor2ubNzvcUDPo5t9nMct)'da görülebilir. Avalanche'da ayrıca bir [Mainnet Tarayıcı](https://explorer.avax.network) da vardır.

![İşlem bilgileri](/img/explorer-1.png) ![Girdi ve Çıktı bilgileri](/img/explorer-2.png)

### Bakiyeyi Alma

Fuji Tarayıcı'yı kullanarak da 1'inci BIP44 türetimi adresin -[X-fuji1cfvdpdqyzpp8pq0g6trmjsrn9pt8nutsfm7a40](https://explorer.avax-test.network/address/fuji1cfvdpdqyzpp8pq0g6trmjsrn9pt8nutsfm7a40)- bakiyesini alabiliriz.

![1'inci türetilmiş adresin bakiyesi](/img/balance-1.png) ![1'inci türetilmiş adresin işlemleri](/img/balance-2.png)

Alternatif olarak, AvalancheJS'yi kullanarak bakiyeyi alabiliriz.

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

## AVAX Gönderme

Musluk, oluşturduğumuz birinci adrese 2 AVAX göndermişti. Şimdi 1'inci adresten 2'nci adrese AVAX gönderelim.

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

### Başarı Doğrulaması

`ankMr1tD65A9SSto5w4ic1d31t6w42jeu8pfv6v4gRPpMg17g` işleminin başarılı olduğunu AvalancheJS kullanarak doğrulayabiliriz.

```typescript
const txid: string = "ankMr1tD65A9SSto5w4ic1d31t6w42jeu8pfv6v4gRPpMg17g"
const status: string = await xchain.getTxStatus(txid)
console.log(status)
// Accepted
```

Alternatif olarak Fuji Testnet Tarayıcı'yı kullanabiliriz. İşlem [Fuji Tarayıcı](https://explorer.avax-test.network/tx/ankMr1tD65A9SSto5w4ic1d31t6w42jeu8pfv6v4gRPpMg17g)'da görülebilir.

![İşlem bilgileri](/img/explorer-3.png) ![Girdi ve Çıktı bilgileri](/img/explorer-4.png)

#### Bakiyeyi Alma

Fuji Tarayıcı'yı kullanarak da 2'nci adresin -[X-fuji1y75dj6qygj7frw2xtcfn724qfty4aadnmeth6y](https://explorer.avax-test.network/address/X-fuji1y75dj6qygj7frw2xtcfn724qfty4aadnmeth6y)- bakiyesini alabiliriz.

![2'nci türetilmiş adres bakiyesi](/img/balance-3.png) ![2'nci türetilmiş adres işlemleri](/img/balance-4.png)

Alternatif olarak, AvalancheJS'yi kullanarak bakiyeyi alabiliriz.

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

### Web Cüzdanına Giriş Yapma

Son olarak nimoniği kullanarak [Avalanche Web Cüzdan](https://wallet.avax.network)'a giriş yapabiliriz. Cüzdanda AVAX bakiyesinin mevcut olduğunu ve cüzdanın nimonikten hareketle 3'üncü adresi bir otomatik sihir gibi türettiğini göreceğiz.

Nimoniği kullanarak Web Cüzdan'a girin.

![Cüzdana giriş](/img/mnemonic.png)

Bakiye doğrudur ve "etkin" adres 3'üncü türetilmiş adrestir.

![Web cüzdan bakiyesi](/img/wallet-1.png) ![3'üncü türetilmiş BIP44 adresi](/img/wallet-2.png)

Gördüğünüz gibi, cüzdanın Grafik Kullanıcı Arayüzü \(GUI\), cüzdanın aynı 3 adresi yukarıdaki script'imizdeki gibi türettiğini göstermektedir.

![Cüzdanın türettiği adresler](/img/wallet-3.png) ![AvalancheJS'nin türettiği adresler](/img/derived.png)

## Özet

Fuji Testnet, dapp'lerin, akıllı sözleşmelerin ve finansal ürünlerin Ana Ağda \(Mainnet\) konuşlandırılmadan önce test edilmesinde ve kalite güvence kontrollerinin yapılmasında kritik bir rol oynar. AvalancheJS, genel API, musluk ve tarayıcı gibi araçlar, test ve kalite güvence ortamınızın Ana Ağa yakın bir nitelikte olmasını sağlar, bu sayede dapp'lerinizi, akıllı sözleşmelerinizi ve finansal ürünlerinizi Ana Ağda kendinizden emin bir şekilde başlatabilirsiniz.

## Kaynaklar

Değerli ek kaynaklar için lütfen aşağıya göz atın.

### Musluk

[Fuji Faucet](https://faucet.avax-test.network), test yapmanıza yardımcı olmak için X-Chain veya C-Chain adreslerine AVAX gönderir. \(Bu test ağı Avax'ının bir değeri yoktur.\)

### Cüzdan

[Avalanche Web Cüzdan](https://wallet.avax.network), Avalanche varlıklarını saklamak için basit, güvenli, vesayetsiz bir cüzdandır. Ana Ağı, Fuji'yi ve özel ağları destekler.

### Tarayıcı

Avalanche Tarayıcı, [Ana Ağ](https://explorer.avax.network)'daki ve [Fuji](https://explorer.avax-test.network)'deki ağı taramanıza imkan verir.

### Genel API

[Buraya](https://docs.avax.network/build/tools/public-api) göz atın.

### AvalancheJS Örnekleri

Varlıklar ve NFT'ler başlatma, gönderme işlemleri, doğrulayıcılar ekleme gibi birçok işlemin nasıl yapıldığını gösteren [60'tan fazla örnek AvalancheJS scripti](https://github.com/ava-labs/avalanchejs/tree/master/examples) vardır.

