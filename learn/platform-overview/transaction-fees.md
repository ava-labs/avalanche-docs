---
description: Avalanche's işlem ücretleri hakkında daha fazla bilgi edin.
---

# İşlem Ücretleri

spam, işlemler bir işlem ücretinin ödemesini gerektirir. Ücret [in](../../#avalanche-avax-token) ödeniyor.** Bu işlem ücreti yakıldı \(sonsuza dek yok edildi\).**

Avalanche’s API aracılığıyla bir işlem yayınladığınızda, işlem ücreti otomatik olarak kontrol ettiğiniz adreslerden birinden indirilir.

## Fiyat Programı

Farklı işlemler farklı bir işlem ücreti ödemesi gerektirir. Bu masa işlem ücreti programını gösteriyor:

{% hint style="warning" %}[C-Chain](./#contract-chain-c-chain) gazı fiyatı Apricot 3'ten önce 225 nAVAX \(GWei\) idi. C-Chain gaz sınırı 8 \* 10e6 \(8,000,000\). Apricot Faz 3 to dinamik ücretler sunar ve gaz fiyatının 75 nAVAX \(GWei\) ve 225 nAVAX \(Ağ faaliyetine bağımlı\) arasında dalgalanmasına olanak sağlar. Kayısı-3. aşamadaki dinamik ücretler hakkında daha ayrıntılı bilgi için aşağıya bakınız.{% endhint %}

```cpp
+----------+-------------------+------------------------+
| Chain    : Transaction Type  | Transaction Fee (AVAX) |
+----------+-------------------+------------------------+
| P        : Create Blockchain |                   0.01 |
+----------+-------------------+------------------------+
| P        : Add Validator     |                      0 |
+----------+-------------------+------------------------+
| P        : Add Delegator     |                      0 |
+----------+-------------------+------------------------+
| P        : Create Subnet     |                   0.01 |
+----------+-------------------+------------------------+
| P        : Import AVAX       |                  0.001 |
+----------+-------------------+------------------------+
| P        : Export AVAX       |                  0.001 |
+----------+-------------------+------------------------+
| X        : Send              |                  0.001 |
+----------+-------------------+------------------------+
| X        : Create Asset      |                   0.01 |
+----------+-------------------+------------------------+
| X        : Mint Asset        |                  0.001 |
+----------+-------------------+------------------------+
| X        : Import AVAX       |                  0.001 |
+----------+-------------------+------------------------+
| X        : Export AVAX       |                  0.001 |
+----------+-------------------+------------------------+
| C        : Simple send       |   0.001575 - 0.004725* |
+----------+-------------------+------------------------+

(*) C-Chain gas price varies. See below.
```

## C-Chain Ücretleri

Avalanche C-Chain bir işlem için "baz ücreti" belirlemek için bir algoritma kullanır. Ağ kullanımı hedef kullanım üzerinde olduğunda baz ücreti artar ve ağ kullanımı hedefin altında olduğunda azalır.

### Base Fee

Üs ücreti 75 nAVAX \(GWei\) kadar düşebilir ve 225 nAVAX \(GWei\) kadar yüksekte olabilir. Daha önce gaz fiyatı 225 nAVAX ile sabit kaldı. 225 nAVAX \(GWei\) değerindeki eski ve sabit gaz fiyatıyla verilen her işlem geçerli sayılacak ve bir bloğa dahil edilecek. Kullanıcıların işlemlerinde hangi ücreti kullanacaklarını tahmin etmek için kullanıcılarının `eth_baseFee`ve `eth_maxPriorityFeePerGas`API yöntemlerini kullanmalarını öneriyoruz.

### Dinamik Ücret İşlemleri

İşlem ücretleri Ethereum's bir gaz ücreti kapağı ve bir gaz bahşiş kapağından oluşan EIP-1559 stili Dynamic Fee Transactions üzerine kuruludur. Sadece tek bir gaz fiyatı belirten tüm miras işlemleri için, gaz fiyatı hem gaz ücreti hem de gaz tüyosu kapağı olarak hizmet eder. Ücret kapağı işlem işleminin bir ünitesi için verilen maksimum bedel olarak belirtilir. Bahşiş kapağı, işlem bir bloğa dahil olmak için ödeme yapmak için temel ücretin üzerinde maksimum miktarını belirtir. \(bu öncelik ücreti olarak da bilinir\). Bu nedenle bir işlemle ödenen etkili gaz fiyatı `min(gasFeeCap, baseFee + gasTipCap)`olacaktır. in ise öncelikli ücret ödenen blokta bulunan madenciye ödendiği yer in hem üs ücreti hem de öncelik ücreti yakıldı.

### MetaMask

MetaMask kayısı 3 aşama etkisini gösterdiğinde Dynamic Fee Transactions kullanmaya otomatik olarak başlayacaktır. MetaMask, kullanırsanız, kayısı 3'ü canlı olarak geçer başlamaz dinamik ücretlerden yararlanmaya başlayacaksınız.

### Dinamik Ücretlerden Nasıl Faydalanacaksın?

Eğer dinamik ücretlerden faydalanmak istiyorsanız bu `DynamicFeeTx`tip kullanmanız gerek. Bu işlem tipi your A `gasFeeCap`ve a belirtmesini sağlar.`gasTipCap`

* `gasFeeCap`- ...benzinin fiyatı en yüksek fiyata satım yapmak için
* `gasTipCap``baseFee`- ...bir bloğun üzerinde maksimum miktarı işlem dahil olmak için ödeme yapmaya hazır

Bir sonraki blok için baz ücretini tahmin etmek için `eth_baseFee`API çağrısını kullanın. Eğer işlem süresince daha fazla blok oluşturulursa ve bir bloğa dahil edilirse, baz ücreti API çağrısının tahmin ettiği baz ücretten farklı olabilir, bu yüzden bu değeri bir tahmin olarak değerlendirmek önemlidir.

Bir sonraki olarak, bir bloğa dahil edilmesi gereken öncelik ücretini tahmin etmek için `eth_maxPriorityFeePerGas`API çağrısını kullanın. Bu API çağrısı, son bloklara bakacak ve son zamanlarda yapılan işlemlerle ilgili ipuçları blokta dahil etmek için ne kadar ödendiğini görecek.

`gasTipCap`Bu bilgi bazında, işlem işlemini nasıl öncelik ettiğinize göre bu `gasFeeCap`ve sevdiğinize göre bu özelliği, gaz başına ödenmiş fiyatı en az indirim olarak mümkün olduğunca çabuk vs. dahil edinme yöntemine göre, belirleyebilirsiniz.

