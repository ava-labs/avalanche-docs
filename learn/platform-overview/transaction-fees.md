---
description: En savoir plus sur les frais de transaction d'Avalanche

---

# Frais de transaction

Afin d'éviter les spams, les transactions sur Avalanche nécessitent le paiement d'une taxe de transaction. Les frais sont payés en [AVAX](../../#avalanche-avax-token). **La taxe de transaction est brûlée \(détruite pour toujours\).**

Lorsque vous émettez une transaction via l'API d'Avalanche, les frais de transaction sont automatiquement déduits de l'une des adresses que vous contrôlez.

## Calendrier des frais

Différents types de transactions nécessitent le paiement d'une taxe de transaction différente. Ce tableau montre le calendrier des frais de transaction :

{% allusion style="warning" %} Le prix du gaz [C-Chain](./#contract-chain-c-chain) est 225 nAVAX \(225 GWei\). La limite de gaz de la chaîne C est de 8 \* 10e6 \(8,000,000\). {% endhint %}

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

