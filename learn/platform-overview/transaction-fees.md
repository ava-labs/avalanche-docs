---
description: Avalanche's işlem ücretleri hakkında daha fazla bilgi edin.

---

# İşlem Ücretleri

spam, işlemler bir işlem ücretinin ödemesini gerektirir. Ücret [in](../../#avalanche-avax-token) ödeniyor. **Bu işlem ücreti yakıldı (sonsuza dek yok edildi).**

Avalanche’s API aracılığıyla bir işlem yayınladığınızda, işlem ücreti otomatik olarak kontrol ettiğiniz adreslerden birinden indirilir.

## Fiyat Programı

Farklı işlemler farklı bir işlem ücreti ödemesi gerektirir. Bu masa işlem ücreti programını gösteriyor:

{% ipuçları style="warning" } [C-Chain](./#contract-chain-c-chain) gaz fiyatı 225 nAVAX \(225 GWei\). C-Chain gaz sınırı 8 \* 10e6 \(8,000,000\). {% endhint }

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
| C        : Simple send       |           (*) 0.004725 |
+----------+-------------------+------------------------+

(*) 21000 gas units at 225 nAVAX gas price
```

