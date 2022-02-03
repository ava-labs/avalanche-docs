# X-Chain'de bir Varlık gönderin

Bu örnekte X-Chain'de tek bir alıcıya bir varlık gönderiliyor. Bu sürecin ilk adımı, seçtiğimiz Avalanche Platformu son noktasına bağlı bir Avalanche instance'ı \(örnek\) yaratmaktır.

```ts
import {
  Avalanche,
  BinTools,
  Buffer,
  BN
} from "avalanche"

let myNetworkID = 1; //default is 3, we want to override that for our local network
let myBlockchainID = "2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM"; // The X-Chain blockchainID on this network
let avax = new avalanche.Avalanche("localhost", 9650, "http", myNetworkID, myBlockchainID);
let xchain = avax.XChain(); //returns a reference to the X-Chain used by AvalancheJS
```

Ayrıca keystore'da bu işlemde kullanılan adreslerin bir listesinin bulunduğunu varsayıyoruz.

## UTXO kümesini alma {#getting-the-utxo-set}

X-Chain mevcut tüm bakiyeleri Harcanmamış İşlem Çıktıları \(UTXO\) adı verilen bir veri ambarında saklar. Bir UTXO Kümesi, işlemler vasıtasıyla üretilen çıktıların, o çıktıları harcayabilecek adreslerin ve kilitleme \(lockout\) süreleri \(çıktının sonrasında harcanabileceği bir zaman damgası\) gibi diğer değişkenlerin ve eşiklerin \(çıktının harcanabilmesi için kaç imzacının gerekli olduğu\) bulunduğu benzersiz bir listedir.

Bu örnekteki senaryoda, mevcut coin'lerin belli bir tutarını harcayan ve bu tutarı hiçbir kısıtlama olmadan tek bir adrese gönderen basit bir işlem yaratacağız. UTXO'ların yönetimi çoğunlukla soyutlanmış olacaktır.

Ancak yine de yönetmekte olduğumuz adresler için UTXO Kümesini almamız gerekiyor.

```ts
let myAddresses = xchain.keyChain().getAddresses(); //returns an array of addresses the KeyChain manages
let addressStrings = xchain.keyChain().getAddressStrings(); //returns an array of addresses the KeyChain manages as strings
let utxos = (await xchain.getUTXOs(myAddresses)).utxos;
```

## UTXO'ları harcama {#spending-the-utxos}

`buildBaseTx()`yardımcı fonksiyonu tek bir varlık türü gönderir. Coin'lerini bir alıcı adresine göndermek istediğimiz belli bir varlık kimliğimiz \(assetID\) var. Bu varlık, bu örnekte 400 coin'i bulunduğunu düşündüğümüz hayal ürünü bir varlıktır. Şimdi bu işlem için yeterli fonumuzun mevcut olduğunu doğrulayalım.

```ts
let assetid = "23wKfz3viWLmjWo2UZ7xWegjvnZFenGAVkouwQCeB9ubPXodG6"; //avaSerialized string
let mybalance = utxos.getBalance(myAddresses, assetid); //returns 400 as a BN
```

400 coin'imiz var! Şimdi bu coin'lerden 100 adedini arkadaşımızın adresine göndereceğiz.

```ts
let sendAmount = new BN(100); //amounts are in BN format
let friendsAddress = "X-avax1k26jvfdzyukms95puxcceyzsa3lzwf5ftt0fjk"; // address format is Bech32

//The below returns a UnsignedTx
//Parameters sent are (in order of appearance):
//   * The UTXO Set
//   * The amount being sent as a BN
//   * An array of addresses to send the funds
//   * An array of addresses sending the funds
//   * An array of addresses any leftover funds are sent
//   * The AssetID of the funds being sent
let unsignedTx = await xchain.buildBaseTx(utxos, sendAmount, [friendsAddress], addressStrings, addressStrings, assetid);
let signedTx = unsignedTx.sign(myKeychain)
let txid = await xchain.issueTx(signedTx);
```

Ve işlem gönderildi!

## İşlemin durumunu alın {#get-the-status-of-the-transaction}

İşlemi ağa gönderdiğimize göre, işlemin hangi aşamada olduğu birkaç saniye içinde belirlenebilir. X-Chain yoluyla TxID'i kullanarak işlemin güncellenmiş durumunu alabiliriz.

```ts
// returns one of: "Accepted", "Processing", "Unknown", and "Rejected"
let status = await xchain.getTxStatus(txid);
```

İşlemin durumları, "Kabul Edildi", "İşleniyor", "Bilinmiyor" veya "Reddedildi" durumlarından biri olabilir:

* "Kabul Edildi", işlemin ağ tarafından geçerli olarak kabul edildiğini ve yürütüldüğünü gösterir
* "İşleniyor", işlemin oylanmakta olduğunu gösterir
* "Bilinmiyor", düğümün bu işlemden haberdar olmadığını, yani düğümde böyle bir işlemin bulunmadığını gösterir
* "Reddedildi" durumu, düğümün işlemden haberdar olduğunu ama bu işlemin kabul edilmiş bir işlemle çatıştığını gösterir

## Sonuçları kontrol edin {#check-the-results}

İşlem en sonunda "Kabul Edildi" olarak geri geldi, şimdi UTXO Kümesini güncelleyelim ve işlem bakiyesinin beklediğimiz gibi olduğunu doğrulayalım.

_Not: Gerçek bir ağda bakiyenin bu senaryoyla uyumlu olması garanti edilmez. İşlem ücretleri veya ek harcamalar bakiyeyi değiştirebilir. Bu örnekte o tür durumlar olmadığını varsaydık._

```ts
let updatedUTXOs = await xchain.getUTXOs();
let newBalance = updatedUTXOs.getBalance(myAddresses, assetid);
if(newBalance.toNumber() != mybalance.sub(sendAmount).toNumber()){
  throw Error("heyyy these should equal!");
}
```
