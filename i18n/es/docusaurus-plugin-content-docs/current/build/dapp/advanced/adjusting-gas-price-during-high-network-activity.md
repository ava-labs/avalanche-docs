---
etiquetas: [Construir, Dapps]
descripción: Este tutorial ayudará a los usuarios a ajustar su tarifa de prioridad y límite máximo de tarifa durante períodos de alta actividad en la red y aprovechar los beneficios de las transacciones de tarifa dinámica.
sidebar_label: Ajustar manualmente el precio del gas
pagination_label: Ajustar el precio del gas durante alta actividad en la red
sidebar_position: 0
---

# Ajustar el precio del gas durante alta actividad en la red

A veces, durante períodos de alta actividad en la red, las transacciones quedan pendientes durante mucho tiempo o reciben instantáneamente una notificación de transacción fallida. Esto puede confundir y frustrar a los usuarios, especialmente si no entienden por qué sus transacciones no son aceptadas.

## Razones probables por las que estás aquí

- Tu transacción se ha detenido y no sabes qué hacer
- Tu transacción ha fallado, con un error de "transacción subvalorada"
- Es tu primera transacción y quieres asegurarte de cualquier problema potencial
- Solo por conocimiento general sobre cómo ajustar la configuración de tarifa dinámica

Si estas son tus razones para estar aquí, entonces puedes pasar por esta sección completa, para comprender mejor el escenario, o saltar directamente a la [solución](#ajustar-las-tarifas-de-gas-antes-de-enviar-la-transacción).

## Palabras clave y conceptos importantes

La cantidad de cómputo utilizada por una transacción se mide en unidades de `gas`. Cada unidad de gas se paga en AVAX al precio de gas de la transacción. El precio del gas de la transacción se determina por los parámetros de la transacción y la tarifa base del bloque en el que se incluye.

Para evitar agotar la billetera del usuario debido a una ejecución no terminante a través de la EVM, las transacciones se envían con un "límite de gas", que denota las unidades máximas de gas que una transacción en particular puede consumir.

Si una transacción intenta usar más de este límite, entonces la transacción se revertirá y seguirá consumiendo y pagando el límite completo de gas. Las tarifas totales pagadas por el usuario se pueden calcular como `(gas consumido) * (precio del gas)` y se conocen como "tarifas de gas". De manera similar, las tarifas máximas de gas se pueden calcular como `(límite de gas) * (precio del gas)`.

Originalmente, las transacciones solo podían establecer un parámetro único para definir cuánto estaban dispuestas a pagar por el gas: el "precio del gas". Cuando se introdujeron las tarifas dinámicas, también se introdujeron transacciones de estilo EIP-1559 que contienen dos parámetros, "maxFeeCap" y "maxPriorityFee", para determinar el precio que una transacción está dispuesta a pagar.

Con la introducción de las tarifas dinámicas, las transacciones de estilo heredado que solo tienen un parámetro de "precio del gas" pueden llevar tanto a transacciones retrasadas como a pagar de más por las transacciones. ¡Las transacciones de tarifa dinámica son la solución! Para obtener más información, lee [esto](/reference/standards/guides/txn-fees#dynamic-fee-transactions).

Para el algoritmo de tarifa dinámica, cuando se produce o verifica un bloque, miramos los últimos 10 segundos para ver cuánto gas se ha consumido dentro de esa ventana (con un cargo adicional por cada bloque producido en esa ventana) para determinar la utilización actual de la red. Esta ventana tiene una utilización objetivo, que actualmente está establecida en `15M` unidades de gas. Por último, hay un cargo adicional si se produce un bloque más rápido que la tasa objetivo de producción de bloques. Actualmente, la tasa objetivo de producción de bloques es de un bloque cada dos segundos, por lo que si se produce un nuevo bloque un segundo después de su padre, entonces se agrega un cargo adicional al cálculo de la tarifa base.

El precio base podría aumentar, disminuir o permanecer igual según la cantidad de actividad en la red en la ventana más reciente. Si el gas total en los últimos bloques de la ventana es más, menos o igual que el gas objetivo, entonces el precio base aumentará, disminuirá o permanecerá igual, respectivamente.

Al estimar la tarifa base para los usuarios, simplemente miramos el bloque preferido actual y calculamos cuál sería la tarifa base para un bloque construido sobre ese bloque inmediatamente.

Junto con un límite de gas, los usuarios ahora pueden pasar 2 valores en transacciones de tarifa dinámica:

- "gas fee cap" y "gas tip cap".

El precio máximo por unidad de gas que el usuario está dispuesto a pagar por su transacción se llama "gas fee cap". Si el precio base de un bloque es mayor que el gas fee cap, entonces la transacción permanecerá en el grupo de transacciones hasta que la tarifa base se haya cambiado para ser menor o igual al gas fee cap proporcionado (nota: el grupo de transacciones limita la cantidad de transacciones pendientes, por lo que si la cantidad de transacciones pendientes supera el límite configurado, las transacciones con las tarifas más bajas pueden ser expulsadas del grupo de transacciones y necesitan ser reemitidas).

"Gas tip cap" es el precio máximo por unidad de gas que el usuario está dispuesto a pagar por encima del precio base para priorizar su transacción. Pero la propina está limitada tanto por el gas tip cap como por el gas fee cap. La propina real pagada por encima de la "tarifa base" del bloque se conoce como "propina de gas efectiva".

```javascript
PropinaEfectiva = min(MaxFeeCap - TarifaBase, GasTipCap)
```

Considera los siguientes ejemplos (aquí Gwei o nAVAX es una milmillonésima parte de AVAX) -

| Transacción | Max Fee Cap | Gas tip cap | Precio base | Propina efectiva | Precio total |
| ----------- | ----------- | ----------- | ----------- | ---------------- | ------------ |
| 1           | 50 Gwei     | 0 Gwei      | 25 Gwei     | 0 Gwei           | 25 Gwei      |
| 2           | 50 Gwei     | 0 Gwei      | 50 Gwei     | 0 Gwei           | 50 Gwei      |
| 3           | 50 Gwei     | 0 Gwei      | 60 Gwei     | 0 Gwei           | **PENDIENTE** |
| A           | 50 Gwei     | 10 Gwei     | 40 Gwei     | 10 Gwei          | 50 Gwei      |
| B           | 40 Gwei     | 40 Gwei     | 40 Gwei     | 0 Gwei           | 40 Gwei      |

Mira las transacciones **A** y **B** (las dos transacciones inferiores). En estos escenarios, parece que la transacción B está pagando una propina más alta, sin embargo, esto depende de la tarifa base del bloque donde se incluyen las transacciones. La propina efectiva de A es mayor que la de B. Entonces, si ambas transacciones compiten por ser incluidas en el próximo bloque, entonces los validadores priorizarían la transacción A ya que paga una propina efectiva más alta.

## ¿Por qué mi transacción está en espera o fallando?

Si tu transacción está fallando y dando un error de "transacción subvalorada", entonces el max fee cap de tu transacción debe ser menor que la tarifa base mínima que la red soporta (hasta ahora, son 25 nAVAX o Gwei). Aunque la tarifa base se estima automáticamente en billeteras como Core o MetaMask, puedes intentar aumentar el max fee cap en la billetera.

Durante un período de congestión en la red, todas las transacciones enviadas no pueden incluirse en el mismo bloque, debido al límite de gas del bloque. Entonces, los validadores eligen transacciones dando mayor prioridad a las transacciones con las propinas efectivas más altas.

Otra razón por la que tu transacción puede quedarse atascada en pendiente es que el max fee cap puede estar por debajo de la tarifa base actual que la red está cobrando. En este caso, necesitas aumentar el max fee cap de tu transacción por encima de la tarifa base actual para que se incluya en el bloque.

Estos ajustes de tarifas se pueden hacer a través de billeteras como Core o MetaMask.

## Ajustar las tarifas de gas antes de enviar la transacción

Es posible que no necesites editar las tarifas de gas en días normales. Esto solo es necesario si hay una congestión intensa en la red y las tarifas base fluctúan con frecuencia.

1. Creemos una muestra de transacción en Avalanche Mainnet, en la que enviaremos 0.1 AVAX a un receptor usando Core. Se pueden ver cuatro configuraciones de gas predefinidas, que son la estimación de gas incorporada en Core. Para establecer una tarifa personalizada, selecciona "Personalizado" e ingresa la cantidad de gas a usar. Al hacer clic en el ícono de **Configuración**, podemos revisar las tarifas de gas y la cantidad que queremos enviar.

   <div style={{textAlign: 'center'}}>

    ![dynamic fees adjustment 1](/img/adjust-gas-fees/adjust-gas1.png)

2. En esta página, puedes editar la tarifa de prioridad (Tarifa máxima de prioridad) y la tarifa base (Tarifa máxima base). Puedes estimar la tarifa máxima como se muestra en [Snowtrace](https://snowtrace.io/gastracker), que representa la tarifa máxima promedio en los últimos 3 segundos. Para estadísticas más detalladas, puedes echar un vistazo [aquí](https://stats.avax.network/dashboard/c-chain-activity/).

3. Si la actividad de la red es alta, debes editar las tarifas de prioridad y máximas en consecuencia, según lo indicado en Snowtrace. Considera el ejemplo a continuación, donde la tarifa máxima promedio es de 26 Gwei (nAVAX).

4. Se recomienda establecer el límite de la tarifa máxima como el precio máximo que estás dispuesto a pagar por una transacción, sin importar cuán alta o baja sea la tarifa base, ya que solo se te cobrará el mínimo entre la tarifa base y el límite de la tarifa máxima, junto con una pequeña tarifa de prioridad por encima de la tarifa base. Ahora, editemos la tarifa máxima a 35 Gwei. Esto aseguraría que nuestra transacción no falle hasta que la tarifa base supere esta cantidad. Podemos establecer una tarifa de prioridad en cualquier valor entre 0 y 35 Gwei. Cuanto más alta sea la tarifa de prioridad, más rápida será la transacción. Para este ejemplo, establezcamos esto en 2 Gwei. Ahora, guarda y envía la transacción.

5. Después de enviar la transacción, incluso si la tarifa base ha disminuido, solo pagarás 2 Gwei por encima de esa tarifa como tarifa de prioridad. Si esta tarifa es una de las más altas entre las transacciones pendientes, entonces se confirmará rápidamente. Podemos ver la confirmación de la transacción a continuación.