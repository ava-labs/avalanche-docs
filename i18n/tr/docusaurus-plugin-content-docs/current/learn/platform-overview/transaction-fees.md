---
description: Avalanche'ın işlem ücretleri hakkında daha fazlasını öğrenin
---

# İşlem Ücretleri

Avalanche, istenmeyen mesajları önlemek için işlem ücreti ödenmesini gerektirir. Ücret [AVAX](../../#avalanche-avax-token) olarak ödenir. **İşlem ücreti yakılır \(sonsuza kadar imha edilir\).**

Avalanche API üzerinden bir işlem çıkardığınızda, işlem ücreti kontrol ettiğiniz adreslerden birinden otomatik olarak kesilir.

## Ücret Planı

Farklı işlem türleri farklı işlem ücreti gerektirir. Bu tablo işlem ücreti planını göstermektedir:

:::dikkat [C-Chain](./README#contract-chain-c-chain) gaz ücreti, Apricot Faz 3 \(AP3\) öncesinde 225 nAVAX \(GWei\) kadardır. C-Chain gaz limiti 8 \* 10e6 \(8.000.000\) kadardır. AP3, C-Chain'e dinamik ücretler getirmekte ve bu da gaz ücretlerinin 75 nAVAX \(GWei\) ve 225 nAVAX \(GWei\) \(ağ etkinliğine bağlı olarak\) arasında değişmesine imkan vermektedir. Apricot Faz 4 \(AP4\) dinamik ücret aralığını 25 nAVAX \(AP3'e göre %66 düşüş\) ve 1000 nAVAX arasında kadar da genişletmektedir. Dinamik ücretler hakkında daha ayrıntılı bilgi için aşağıya bakınız.
 :::

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

Avalanche C-Chain, bir işlemde "taban ücreti" belirlemek için bir algoritma kullanır. Taban ücret, ağ kullanımı hedef kullanımın üstünde olduğunda artar ve ağ kullanımı hedefin altında olduğunda düşer.

### Taban Ücret

Taban ücret, AP4 sonrasında 25 nAVAX \(GWei\) kadar düşük ve 1000 nAVAX \(GWei\) kadar yüksek olabilir.

Lütfen maksimum gas fiyatının AP2 statik gas fiyatı \(225 nAVAX\) ile sınırlı olduğunu unutmayın. AP4 aktivasyonu öncesinde yerleşik dinamik ücret son noktalarını kullanmaya geçmiyorsanız, işlemlerinizde gecikme olması mümkündür \(minimum ağ gaz fiyatının 225 nAVAX üzerine çıkması halinde\). Kullanıcıların işlemlerinde ne ücret kullanacaklarını tahmin etmek için [eth\_baseFee](../../build/avalanchego-apis/contract-chain-c-chain-api#eth_basefee) ve [eth\_maxPriorityFeePerGas](../../build/avalanchego-apis/contract-chain-c-chain-api#eth_maxpriorityfeepergas) API yöntemlerini kullanmaya geçmesini tavsiye ediyoruz.

### Dinamik Ücretli İşlemler

İşlem ücretleri Ethereum'un gaz ücreti limiti ve gaz bahşiş limitinden oluşan EIP-1559 tarzı Dinamik Ücretli İşlemlerini temel alır. Sadece tek bir gaz fiyatı belirten tüm eski usul işlemler için gaz fiyatı hem gaz ücreti limiti hem de gaz bahşiş limiti görevi görür. Bahşiş limiti, işlemin bir blokta yer almak için taban ücretinin üzerinde ödemek istediği maksimum tutarı belirtir \(bu, öncelik ücreti olarak da adlandırılır\). Bu nedenle, bir işlemin ödediği geçerli gaz fiyatı `min(gasFeeCap, baseFee + gasTipCap)` olacaktır. Öncelik ücretinin bloku üreten madenciye ödendiği Ethereum'un aksine, Avalanche'da hem taban ücreti hem de öncelik ücreti yakılır.

### MetaMask

Apricot Faz3 yürürlüğe girir girmez MetaMask otomatik olarak Dinamik Ücretli İşlemleri kullanmaya başlayacaktır. MetaMask kullanıyorsanız, Apricot Faz 3 çalışmaya başlar başlamaz otomatik olarak dinamik ücretlerden yararlanmaya başlayacaksınız.

### Dinamik Ücretlerden Nasıl Yararlanmalısınız?

Dinamik ücretlerden yararlanmaya başlamak istiyorsanız `DynamicFeeTx` tipini kullanmaya başlamanız gerekecek. Bu işlem tipi, işleminizin bir `gasFeeCap`ve bir b`gasTipCap`elirtmesine izin verir.

* `gasFeeCap` - bir birim gaz için işlemin ödemek istediği maksimum fiyat
* `gasTipCap` - işlemin bir blokta yer almak için bloktaki `baseFee`üzerine ödemek istediği maksimum tutar

Sonraki bloktaki taban fiyatı tahmin etmek için `eth_baseFee` API kullanın. İşleminizi oluşturduğunuz an ve işleminizin bir bloka eklendiği an arasında daha fazla blok üretilirse, taban ücret API çağrısının tahmin ettiği taban ücretten farklı olabilir; o yüzden bu değere bir tahmin olarak yaklaşmak önemlidir.

Ardından, bloka eklenmesi gereken öncelik ücretini tahmin etmek için `eth_maxPriorityFeePerGas` API kullanın. Bu API çağrısı en son bloklara bakacak ve son işlemlerin blokta yer almak için ne kadar bahşiş ödediğini görecektir.

Bu bilgiye dayanarak, işleminizin olabildiğince hızlı yapılmasını mı yoksa gaz birimi başına ödenen fiyatı en az indirmeyi mi istediğinize göre bir `gasFeeCap`ve `gasTipCap` belirtebilirsiniz.

### Atomik İşlem Ücretleri

C-Chain'de atomik işlemleri için, işlemin kullandığı gazın tutarına ve atomik işlemi içeren blokun taban ücretine bağlı olarak dinamik ücretler ödenir.

Kullanılan Gaz:

```cpp
+---------------------+-------+
| Item                : Gas   |
+---------------------+-------+
| Unsigned Tx Byte    : 1     |
+---------------------+-------+
| Signature           : 1000  |
+---------------------+-------+
| Per Atomic Tx       : 10000 |
+---------------------+-------+
```

Dolayısıyla, bir atomik işlemin kullandığı gaz `1 * len(unsignedTxBytes) + 1,000 * numSignatures + 10,000` olur.

İşlem ücretinin hesaplanmasında ayrıca taban ücret de dikkate alınır. Atomik işlemler 9 ondalık basamakla ifade edilen birimler kullandığı için, bir işlem karşılığında ödenecek gerçek ücret hesaplanmadan önce taban ücret 9 ondalık basamağa dönüştürülmelidir. Dolayısıyla, gerçek ücret `gasUsed * baseFee (converted to 9 decimals)` olur.
