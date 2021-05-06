---
description: Avalanche'ın işlem ücretleri hakkında daha fazla bilgi edinin
---

# İşlem Ücretleri

Spami engellemek adına, Avalanche üzerinde yapılan işlemler için bir işlem ücreti ödenmesi gerekir. Bu ücret, [AVAX](../../#avalanche-avax-token) ile ödenir. **İşlem ücreti yakılır \(sonsuza kadar yok olur\).**

Avalanche’ın API'si aracılığıyla bir işlem yaptığınızda; işlem ücreti, sizin kontrolünüzde olan adreslerin birinden otomatik olarak kesilir.

## Ücret Tarifesi

Yapılan işlem türüne göre farklı bir işlem ücretinin ödenmesi gerekir. İşlem türlerine göre ücretleri görmek için aşağıdaki tablodan faydalanabilirsiniz:

{% hint style="warning" %}
[C-Chain](./#contract-chain-c-chain) için gas fiyatı 225 nAVAX'dır. \(225 GWei\). C-Chain'in gas limiti 10e8'dir. \(100,000,000\)
{% endhint %}

```cpp
+----------+---------------------+------------------------+
| Zincir   : İşlem Türü          | İşlem Ücreti (AVAX)    |
+----------+---------------------+------------------------+
| P        : Blokzincir Oluştur  |                   0.01 |
+----------+---------------------+------------------------+
| P        : Validatör Ekle      |                      0 |
+----------+---------------------+------------------------+
| P        : Delegatör Ekle      |                      0 |
+----------+---------------------+------------------------+
| P        : Subnet Oluştur      |                   0.01 |
+----------+---------------------+------------------------+
| P        : AVAX'ı İçe Aktar    |                  0.001 |
+----------+---------------------+------------------------+
| P        : AVAX'ı Dışa Aktar   |                  0.001 |
+----------+---------------------+------------------------+
| X        : Gönder              |                  0.001 |
+----------+---------------------+------------------------+
| X        : Varlık Oluştur      |                   0.01 |
+----------+---------------------+------------------------+
| X        : Varlık Çıkart       |                  0.001 |
+----------+---------------------+------------------------+
| X        : AVAX'ı İçe Aktar    |                  0.001 |
+----------+---------------------+------------------------+
| X        : AVAX'ı Dışa Aktar   |                  0.001 |
+----------+---------------------+------------------------+
```