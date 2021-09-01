---
description: Más información sobre las tasas de transacción de Avalanche
---

# Comisiones de transacción

Para evitar el spam, las transacciones en Avalanche requieren el pago de una comisión por la transacción. La tarifa se paga en [AVAX](../../#avalanche-avax-token).** La tarifa de transacción se quemó \(destruida para siempre\).**

Cuando emites una transacción a través de la API de Avalanche, la comisión por la transacción se deduce automáticamente de una de las direcciones que controlas.

## Lista de comisiones

Los diferentes tipos de transacciones requieren el pago de una comisión de transacción diferente. Esta tabla muestra la tabla de comisiones de transacción:

{% hint style="warning" %}El precio [de](./#contract-chain-c-chain) gas de C-Chain es de 225 nAVAX \(GWei\) antes de la fase 3 de Apricot . El límite de gas de C-Chain es de 8 \* 10e6 \(800\). Apricot Fase 3 introduce tarifas dinámicas a la C-Chain que permitirá al precio de gas fluctuar entre 75 nAVAX \(GWei\) y 225 nAVAX \(GWei\) \(dependiendo de la actividad de la red\). Ver a continuación para obtener información más detallada sobre las tarifas dinámicas en la fase 3 de Apricot{% endhint %}

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

## Tarifas de C-Chain

La C-Chain de Avalanche utiliza un algoritmo para determinar la "tarifa base" para una transacción. La tasa base aumenta cuando la utilización de la red está por encima de la utilización de destino y disminuye cuando la utilización de la red está por debajo del objetivo.

### Tarifas básicas

La tarifa de base puede ir tan baja como 75 nAVAX \(GWei\) y tan alta como 225 nAVAX \(GWei\). Anteriormente, el precio de gas fue fijado en 225 nAVAX. Cualquier transacción emitida con el precio de gas constante de 225 nAVAX \(GWei\) se considerará válido e incluido en un bloque. Recomendamos que los usuarios cambien a usar los métodos `eth_baseFee`y la `eth_maxPriorityFeePerGas`API para estimar qué tarifa usar en sus transacciones.

### Transacciones dinámicas

Las tarifas de transacción se basan en las transacciones dinámicas de Fee Dinámicas de estilo EIP-1559 de Ethereum, que consisten en una tapa de tasas de gas y una tapa de punta de gas. Para todas las transacciones heredadas, que solo especifican un precio de gas, el precio de gas sirve como la tapa de la tarifa de gas y la tapa de la punta de gas. La tapa de la tarifa especifica el precio máximo que la transacción está dispuesta a pagar por unidad de gas. El límite de punta especifica la cantidad máxima por encima de la tarifa base que la transacción está dispuesta a pagar para ser incluida en un bloque \(esto también se denomina la tarifa prioritaria\). Por lo tanto, el precio de gas efectivo pagado por una transacción será `min(gasFeeCap, baseFee + gasTipCap)`. A diferencia de Ethereum, donde se paga la tarifa de prioridad al minero que produce el bloque, en Avalanche tanto la tarifa base como la tarifa prioritaria se queman

### MetaMask

MetaMask empezará automáticamente a usar transacciones de tarifas dinámicas una vez que la fase 3 de Apricot entra en efecto. Si usas MetaMask, automáticamente empezarás a aprovechar las tarifas dinámicas tan pronto como la fase 3 de Apricot sea en vivo

### ¿Cómo deberías aprovechar las tarifas dinámicas?

Si quieres empezar a aprovechar las tarifas dinámicas, tendrás que empezar a usar el `DynamicFeeTx`tipo. Este tipo de transacción permite tu transacción especificar a `gasFeeCap`y a .`gasTipCap`

* `gasFeeCap`- precio máximo por unidad de gas que la transacción está dispuesta a pagar
* `gasTipCap`- cantidad máxima por encima `baseFee`de un bloque que la transacción está dispuesta a pagar para ser incluida

Usa la llamada de `eth_baseFee`API para estimar la tarifa base para el siguiente bloque. Si se producen más bloques entre el momento en que you tu transacción y está incluida en un bloque, la tarifa base podría ser diferente de la tarifa base estimada en la llamada de la API, por lo que es importante tratar este valor como una estimación.

A continuación, usa la llamada de `eth_maxPriorityFeePerGas`API para estimar la tarifa de prioridad necesaria para ser incluida en un bloque. Esta llamada de API examinará los bloques más recientes y verá qué consejos han sido pagados por transacciones recientes para ser incluidos en el bloque.

Basado en esta información, puedes especificar la `gasFeeCap`y tu gusto basado en cómo priorizas conseguir tu transacción incluida lo más rápido posible frente `gasTipCap`a minimizar el precio pagado por unidad de gas.

