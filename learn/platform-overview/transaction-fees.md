---
description: Más información sobre las tasas de transacción de Avalanche

---

# Honorarios de transacción

Para evitar el spam, las transacciones en Avalanche requieren el pago de una tasa de transacción. La tarifa se paga en [AVAX](../../#avalanche-avax-token). **La tarifa de transacción se quema \(destruida para siempre\).**

Cuando emita una transacción a través de la API de Avalanche, la tarifa de transacción se deduce automáticamente de una de las direcciones que controla.

## Calendario de tasas

Diferentes tipos de transacciones requieren el pago de una tarifa de transacción diferente. Esta tabla muestra el calendario de honorarios de transacción:

{% insinuar style="warning" %} El precio de gas [de cadena C](./#contract-chain-c-chain) es de 225 nAVAX \(225 GWei\). El límite de gas de cadena C es de 8 \* 10e6 \(8.000.000 \). {% endhint %}

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

