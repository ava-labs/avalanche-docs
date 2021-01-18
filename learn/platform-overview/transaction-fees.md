---
descripción: Aprende más sobre las comisioness de transacción de Avalanche
---

# Comisiones de Transacción

Para evitar el spam, las transacciones en Avalanche requieren el pago de una comisión por la transacción. La comisión se paga en [AVAX](../../#avalanche-avax-token). **Se le hace _Burn_ a la comisión de la transacción  \(se destruye por siempre\).**

Cuando emites una transacción a través de la API de Avalanche, la comisión por la transacción se deduce automáticamente de una de las direcciones que controlas.

## Lista de comisiones

Los diferentes tipos de transacciones requieren el pago de una comisión de transacción diferente. Esta tabla muestra la tabla de comisiones de transacción:

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

El gas fee de la [C-Chain](./#contract-chain-c-chain) es de 4.7e-7 AVAX/gas. El límite de gas de la C-Chain es de 10e8.

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEwNzMxNjc2N119
-->