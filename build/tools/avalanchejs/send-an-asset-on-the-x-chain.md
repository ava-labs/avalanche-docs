# X-Chain bir varlık gönderin

Bu örnek in bir varlık tek bir alıcıya gönderir. Bu sürecin ilk adımı, Avalanche Platformu seçim noktasına bağlı bir Avalanche örneğini oluşturmaktır.

```text
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

Ayrıca bu işlemde kullanılan adreslerin bir listesini de kapsıyoruz.

## UTXO Set<a id="getting-the-utxo-set"></a>

X-Chain tüm mevcut dengeleri "Unspent Transaction Output \(UTXOs\) adlı bir veri tabanında depoluyor. UTXO Set işlemler tarafından üretilen outputs eşsiz listesidir, bu çıkışları harcar, bu çıkışları geçirebilen adresler ve çıkış için çıkış için ne kadar imza gereklidir?" gibi diğer değişkenler (bir zaman damgası) ve eşikler\ (kaç tane imzacı gereklidir).

Bu örnek için, mevcut miktarda para harcayan basit bir işlem yaratacağız ve herhangi bir kısıtlama olmadan tek bir adrese göndereceğiz. UTXOs yönetimi çoğunlukla will

Ancak yönettiğimiz adresler için UTXO Set ayarını almamız gerekiyor.

```text
let myAddresses = xchain.keyChain().getAddresses(); //returns an array of addresses the KeyChain manages
let addressStrings = xchain.keyChain().getAddressStrings(); //returns an array of addresses the KeyChain manages as strings
let utxos = (await xchain.getUTXOs(myAddresses)).utxos;
```

## UTXOs harcanıyor<a id="spending-the-utxos"></a>

`BaseTx()` yardımcı fonksiyonu tek bir varlık türü gönderir. Alıcı adrese göndermek istediğimiz bir özel bir varlık var. Bu örnek için hayali bir varlık. 400 bozukluk olduğuna inanıyoruz. Bu işlem için gerekli paraların bizde olduğunu doğrulayalım.

```text
let assetid = "23wKfz3viWLmjWo2UZ7xWegjvnZFenGAVkouwQCeB9ubPXodG6"; //avaSerialized string
let mybalance = utxos.getBalance(myAddresses, assetid); //returns 400 as a BN
```

400 sikkemiz var! Bu paralardan 100 tanesini arkadaşımızın adresine göndereceğiz.

```text
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

## İşlemin durumunu öğrenin<a id="get-the-status-of-the-transaction"></a>

Şimdi bu işlemi ağa gönderdiğimize göre işlemlerin geçip geçmediğini anlamak birkaç saniye sürüyor. X-Chain aracılığıyla TxID kullanarak işlem hakkında güncellenmiş bir durum alabiliriz.

```text
// returns one of: "Accepted", "Processing", "Unknown", and "Rejected"
let status = await xchain.getTxStatus(txid);
```

Bu durum "kabul edilme", "Süreç", "Bilinmeyen Bilinmeyen ve "Accepted", gibi bir şey olabilir:

* "Kabul edildi" bu işlem ağ tarafından geçerli kabul edildiğini ve çalıştırıldığını gösteriyor
* "İşlem" işlemlerin oylandığını gösteriyor.
* "Bilinmiyor" düğümün işlemle ilgili hiçbir şey bilmediğini gösteriyor ve düğümün onda olmadığını gösteriyor.
* "Reddedilmek" düğümün işlemden haberi olduğunu gösteriyor ama kabul edilen bir işlem ile çelişiyor.

## Sonuçları kontrol et<a id="check-the-results"></a>

Bu işlem sonunda "Kabul Edildi" olarak geri geldi, şimdi the güncelleyelim ve işlem dengesini beklediğimiz gibi doğrulayalım.

_Not: Gerçek bir ağ içinde denge bu senaryoya uymaz. İşlem ücretleri veya ek harcamalar dengeyi değiştirebilir. Bu örnekten dolayı bu davaların hiçbirini de hesaba katmıyoruz._

```text
let updatedUTXOs = await xchain.getUTXOs();
let newBalance = updatedUTXOs.getBalance(myAddresses, assetid);
if(newBalance.toNumber() != mybalance.sub(sendAmount).toNumber()){
    throw Error("heyyy these should equal!");
}
```

