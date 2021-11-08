---
description: Aprende más acerca de las comisiones de transacción de Avalanche
---

# Comisiones de transacción

Para evitar el spam, las transacciones en Avalanche requieren el pago de una comisión por la transacción. La comisión se paga en [AVAX](../../#avalanche-avax-token).** La comisión de la transacción se quema \(se destruye para siempre\). **

Cuando emites una transacción a través de la API de Avalanche, la comisión por la transacción se deduce automáticamente de una de las direcciones que controlas.

## Lista de comisiones

Los diferentes tipos de transacciones requieren el pago de una comisión de transacción diferente. Esta tabla muestra la tabla de comisiones de transacción:

{% hint style="warning" %}
El precio de gas de la [C-Chain](./#contract-chain-c-chain) era 225 nAVAX \(GWei\) antes de Apricot Fase 3 \(AP3\). El límite de gas de la C-Chain es 8 \* 10e6 \(8,000,000\). AP3 introduce comisiones dinámicas a la C-Chain lo que permite que el precio de gas fluctúe entre 75 nAVAX \(GWei\) y 225 nAVAX \(GWei\) \(dependiedo de la actividad de la red\). Apricot Fase 4 \(AP4\) amplía más el rango de comisiones dinámicas a entre 25 nAVAX \(66% de reducción con respecto a AP3\) y 1000 nAVAX. A continuación se encuentra información más detallada sobre las comisiones dinámicas. {% endhint %}

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

## Comisiones de la C-Chain

La C-Chain de Avalanche utiliza un algoritmo para determinar la "comisión básica" para una transacción. La comisión básica aumenta cuando la utilización de la red sobrepasa la utilización meta, y disminuye cuando la utilización de la red está por debajo de la meta.

### Comisión básica

La comisión básica tiene un mínimo de 25 nAVAX \(GWei\) y un máximo de 1000 nAVAX \(GWei\) después de AP4.

Hay que tener en cuenta que el precio máximo de gas no es limitado por el precio de gas estático de  AP2 \(225 nAVAX\). Si no se migra para usar los extremos de comisiones dinámicas integrados antes de la activación de la AP4, es posible que el procesamiento de las transacciones se demore \(si el precio de gas mínimo aumenta por encima de 225 nAVAX\). Se recomienda que los usuarios se cambien y usen los métodos [eth\_baseFee](https://github.com/ava-labs/avalanche-docs/tree/884d4ae1e6c69ff4b260feac1205fc8120bc0093/build/avalanchego-apis/contract-chain-c-chain-api/README.md#eth_basefee) y [eth\_maxPriorityFeePerGas](https://github.com/ava-labs/avalanche-docs/tree/884d4ae1e6c69ff4b260feac1205fc8120bc0093/build/avalanchego-apis/contract-chain-c-chain-api/README.md#eth_maxpriorityfeepergas) de la API para estimar qué comisión usar en sus transacciones.

### Transacciones de comisión dinámica

Las comisiones de transacción se basan en el estilo de transacciones dinámicas EIP-1559 de Ethereum, que consiste en un capital de comisión de gas y en un límite de capital de gas. El precio del gas para todas las transacciones heredadas, que solo especifican un precio único de gas, sirve como el capital de comisión de gas y también como el límite de gas. La comisión de gas especifica el precio máximo que la transacción está dispuesta a pagar por unidad de gas. El límite de capital especifica la cantidad máxima por encima de la comisión básica que la transacción está dispuesta a pagar y se incluye en un bloque \(esto también se denomina comisión de prioridad\). Por lo tanto, el precio efectivo del gas pagado por una transacción será `min(gasFeeCap, baseFee + gasTipCap)`. A diferencia de Ethereum, donde la comisión de prioridad se le paga al minero que produce el bloque, en Avalanche tanto la comisión básica como la de prioridad se queman.

### metamask

MetaMask empezará a usar transacciones de comisión dinámica automáticamente una vez que la Fase 3 de Apricot entre en vigencia. Si usas MetaMask, automáticamente empezarás a aprovechar las comisiones dinámicas tan pronto se lance la Fase 3 de Apricot.

### ¿Cómo deberías aprovechar las comisiones dinámicas?

Si quieres empezar a aprovechar las comisiones dinámicas, tendrás que empezar a usar ese tipo `DynamicFeeTx`. Este tipo de transacción le permite a tu transacción especificar un `gasFeeCap`y un `gasTipCap`.

* `gasFeeCap` - el precio máximo por unidad de gas que la transacción está dispuesta a pagar
* `gasTipCap` - la cantidad máxima por encima de `baseFee` de un bloque que la transacción está dispuesta a pagar para ser incluida

Usa `eth_baseFee` API call para estimar la comisión básica para el siguiente bloque. Si se producen más bloques en el lapso que construyes tu transacción y esta se incluye en un bloque, la comisión básica podría ser diferente a la estimada por API call, por lo que es importante considerar este valor como una estimación.

A continuación, utiliza `eth_maxPriorityFeePerGas` API call para estimar la comisión de prioridad que se necesita para ser incluida en un bloque. Esta API call examinará los bloques más recientes y verá los límites recientes que se han pagado en transacciones para ser incluidos en el bloque.

Con base en esta información, puedes especificar el `gasFeeCap` y el `gasTipCap` a tu gusto, según como priorices la inclusión de tu transacción lo antes posible versus la minimización del precio a pagar por unidad de gas.

