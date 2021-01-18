---
descripción: Aprende más sobre las comisioness de transacción de Avalanche
---

# Comisiones de Transacción

Para evitar el spam, las transacciones en Avalanche requieren el pago de una comisión por la transacción. La comisión se paga en [AVAX](../../#avalanche-avax-token). **Se le hace _Burn_ a la comisión de la transacción  \(se destruye por siempre\).**

When you issue a transaction through Avalanche’s API, the transaction fee is automatically deducted from one of the addresses you control.

## Fee Schedule

Different types of transactions require payment of a different transaction fee. This table shows the transaction fee schedule:

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
```

The [C-Chain](./#contract-chain-c-chain) gas price is 4.7e-7 AVAX/gas. The C-Chain gas limit is 10e8.

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTIwNzE2MDEwMThdfQ==
-->