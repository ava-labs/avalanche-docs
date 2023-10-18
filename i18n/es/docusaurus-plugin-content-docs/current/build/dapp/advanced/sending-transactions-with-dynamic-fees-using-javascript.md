---
tags: [Construir, Dapps]
description: Este tutorial ayudará a los usuarios a enviar transacciones con configuraciones de tarifas dinámicas para ajustar su tarifa de prioridad y límite máximo de tarifa durante una alta actividad de red utilizando javascript.
sidebar_label: Tarifas de gas dinámicas
pagination_label: Enviar transacciones con tarifas dinámicas usando JavaScript
sidebar_position: 1
---

# Enviar transacciones con tarifas dinámicas usando JavaScript

## Resumen

El objetivo de este documento es proporcionar y explicar cómo enviar transacciones
con tarifas dinámicas usando JavaScript. Asegúrese de haber seguido [el tutorial sobre
ajustar las tarifas dinámicas usando
MetaMask](/build/dapp/advanced/adjusting-gas-price-during-high-network-activity.md). Allí, hemos
explicado los conceptos clave relacionados con las tarifas dinámicas y el tipo de
transacciones EIP1559.

## Requisitos previos

- Familiaridad básica con [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript).
- Familiaridad básica con [Node.js](https://nodejs.org/en) y [npm](https://www.npmjs.com/).
- Familiaridad básica con la red [C-Chain Avalanche](/reference/avalanchego/c-chain/api.md) y la [compatibilidad con EVM](https://ethereum.org/en/developers/docs/evm/)
- Comprensión básica de [transacciones de tarifa dinámica](/build/dapp/advanced/adjusting-gas-price-during-high-network-activity.md#good-to-know-keywords-and-concepts)

## Instalación de dependencias

Abra la terminal e instale las siguientes dependencias en una nueva carpeta.

- Ethers
- avalanche
- dotenv

```zsh
npm install ethers avalanche dotenv
```

## Configuración del entorno y del proyecto

Para enviar una transacción, necesitamos firmarla usando nuestra clave privada. Pero la clave privada
no debe codificarse en duro en el código, sino que debe obtenerse a través de algunas
variables de entorno. Cree un archivo `.env` en la carpeta raíz con el siguiente
contenido.

```env
PRIVATEKEY=<TU_CLAVE_PRIVADA>
```

Ahora haga un nuevo archivo `app.js` en la carpeta raíz, que será nuestro archivo principal y único
archivo con la función `sendAvax()`. Siga el resto del tutorial entendiendo y pegando los fragmentos proporcionados secuencialmente en el archivo `app.js`.

## Importación de dependencias y clave privada

```javascript
const ethers = require("ethers")
const Avalanche = require("avalanche").Avalanche
require("dotenv").config()

const privateKey = process.env.PRIVATEKEY
```

## Configuración del proveedor HTTP conectado a la red Fuji

Usando el proveedor HTTP, nos conectaremos a uno de los nodos en la red Fuji.
Usando este proveedor enviaremos la transacción firmada a la red.
También puedes conectarte a Mainnet usando la URL -
`https://api.avax.network/ext/bc/C/rpc`

```javascript
// Para enviar una transacción firmada a la red
const nodeURL = "https://api.avax-test.network/ext/bc/C/rpc"
const HTTPSProvider = new ethers.providers.JsonRpcProvider(nodeURL)
```

## Configuración de las API de la C-Chain para estimar las tarifas base y de prioridad

Para estimar la tarifa máxima y la tarifa máxima de prioridad en la red, utilizaremos
las API de la C-Chain. Podemos usar la C-Chain a través de una instancia AvalancheJS conectada
a la red como se muestra a continuación.

```javascript
// Para estimar la tarifa máxima y la tarifa de prioridad utilizando las API de la CChain
const chainId = 43113
const avalanche = new Avalanche(
  "api.avax-test.network",
  undefined,
  "https",
  chainId
)
const cchain = avalanche.CChain()
```

## Configuración de la billetera

Se requiere una billetera para firmar transacciones con su clave privada y así hacerla válida.

```javascript
// Para firmar una transacción no firmada
const wallet = new ethers.Wallet(privateKey)
const address = wallet.address
```

## Función para estimar la tarifa máxima y la tarifa máxima de prioridad

La función `calcFeeData()` estima la tarifa máxima y la tarifa máxima de prioridad por gas
según la actividad de la red utilizando las API de la C-Chain. Esta función devuelve la tarifa máxima
y la tarifa máxima de prioridad por gas en unidades de `nAVAX` o `gwei` (1 AVAX = 10^9
gwei).

```javascript
// Función para estimar la tarifa máxima y la tarifa máxima de prioridad
const calcFeeData = async (
  maxFeePerGas = undefined,
  maxPriorityFeePerGas = undefined
) => {
  const baseFee = parseInt(await cchain.getBaseFee(), 16) / 1e9
  maxPriorityFeePerGas =
    maxPriorityFeePerGas == undefined
      ? parseInt(await cchain.getMaxPriorityFeePerGas(), 16) / 1e9
      : maxPriorityFeePerGas
  maxFeePerGas =
    maxFeePerGas == undefined ? baseFee + maxPriorityFeePerGas : maxFeePerGas

  if (maxFeePerGas < maxPriorityFeePerGas) {
    throw "Error: La tarifa máxima por gas no puede ser menor que la tarifa máxima de prioridad por gas"
  }

  return {
    maxFeePerGas: maxFeePerGas.toString(),
    maxPriorityFeePerGas: maxPriorityFeePerGas.toString(),
  }
}
```

La API real devuelve la tarifa base y la tarifa de prioridad en unidades de `wei`, que es
una billonésima de billonésima de `AVAX` (1 AVAX = 10^18 wei).

## Función para crear, firmar y enviar una transacción

La función `sendAvax()` toma 4 argumentos -

- `amount` - Cantidad de AVAX a enviar en la transacción
- `to` - Dirección de destino a la que queremos enviar AVAX
- `maxFeePerGas` - Tarifa máxima deseada por gas que desea pagar en nAVAX
- `maxPriorityFeePerGas` - Tarifa máxima de prioridad deseada por gas que desea pagar en nAVAX
- `nonce` - Se utiliza como diferenciador para más de 1 transacción con el mismo firmante

Los últimos 3 argumentos son opcionales, y si se pasa `undefined`, entonces
usará la función `calcFeeData()` para estimarlos. Cada transacción con el
mismo dato y parámetros se diferencia por un valor de nonce. Si hay más
de 1 transacción con el mismo nonce firmado por la misma dirección, entonces solo 1
de ellas con la tarifa de prioridad efectiva más alta será aceptada. El parámetro `nonce`
solo debe usarse cuando estás re-emitendo o cancelando una
transacción atascada.

```javascript
// Función para enviar AVAX
const sendAvax = async (
  amount,
  to,
  maxFeePerGas = undefined,
  maxPriorityFeePerGas = undefined,
  nonce = undefined
) => {
  if (nonce == undefined) {
    nonce = await HTTPSProvider.getTransactionCount(address)
  }

  // Si no se proporciona la tarifa máxima o la tarifa máxima de prioridad, entonces se calculará automáticamente usando las API de CChain
  ;({ maxFeePerGas, maxPriorityFeePerGas } = await calcFeeData(
    maxFeePerGas,
    maxPriorityFeePerGas
  ))

  maxFeePerGas = ethers.utils.parseUnits(maxFeePerGas, "gwei")
  maxPriorityFeePerGas = ethers.utils.parseUnits(maxPriorityFeePerGas, "gwei")

  // La transacción de tipo 2 es para EIP1559
  const tx = {
    type: 2,
    nonce,
    to,
    maxPriorityFeePerGas,
    maxFeePerGas,
    value: ethers.utils.parseEther(amount),
    chainId,
  }

  tx.gasLimit = await HTTPSProvider.estimateGas(tx)

  const signedTx = await wallet.signTransaction(tx)
  const txHash = ethers.utils.keccak256(signedTx)

  console.log("Enviando transacción firmada")

  // Enviar una transacción firmada y esperar su inclusión
  await (await HTTPSProvider.sendTransaction(signedTx)).wait()



console.log(
  `Ver transacción con nonce ${nonce}: https://testnet.snowtrace.io/tx/${txHash}`
)
}
```

Esta función calcula el hash de la transacción a partir de la transacción firmada y registra en la consola la URL para el estado de la transacción en el explorador Snowtrace.

## Llamando a la función `sendAVAX()`

Hay varias formas de llamar a esta función. Podemos pasar o no los argumentos opcionales como tarifa máxima y tarifa máxima de prioridad. Se recomienda establecer la tarifa máxima como el precio máximo por gas que estás dispuesto a pagar por una transacción, sin importar cuán alta o baja sea la tarifa base, ya que como máximo solo se te cobrará la tarifa máxima proporcionada, junto con una pequeña tarifa de prioridad por encima de la tarifa base.

Si no pasas estos argumentos, entonces automáticamente estimará la tarifa máxima y la tarifa de prioridad de la red. Por ejemplo, digamos que quiero pagar 100 nAVAX por gas por una transacción y una pequeña propina de 2 nAVAX, entonces llamaremos a la siguiente función.

```javascript
// estableciendo la tarifa máxima como 100 y la tarifa de prioridad como 2
sendAvax("0.01", "0x856EA4B78947c3A5CD2256F85B2B147fEBDb7124", 100, 2)
```

**Esta función no debe usarse sin una tarifa máxima por gas. Ya que tendrás que pagar el precio estimado, incluso si es más alto que tu presupuesto.**

Podría haber los siguientes casos -

| Tarifa Máxima | Tarifa de Prioridad Máxima | Comentario                                                                                                                                                                                                                                 |
| ------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **indefinido** | 2                          | Calculará la tarifa máxima sumando la tarifa de prioridad proporcionada con la tarifa base estimada. Toma precauciones adicionales aquí, ya que la tarifa máxima ahora estará limitada por `baseFee + priorityFee`, lo que puede consumir todas las tarifas de prioridad proporcionadas. |
| 100           | **indefinido**              | Estimará la tarifa de prioridad y usará la tarifa máxima proporcionada. Si la tarifa de prioridad estimada es mayor que la tarifa máxima proporcionada, entonces arroja un error.                                                       |
| **indefinido** | **indefinido**              | Estimará la tarifa base y la tarifa de prioridad de la red, y sumará ambos valores para calcular la tarifa máxima por gas. Nuevamente, tendrás que pagar lo que se estime.                                                                 |

Obtendrás la siguiente salida al enviar con éxito las transacciones firmadas. Usando esta URL puedes ver el estado de tu transacción en Snowtrace.

```bash
Ver transacción con nonce 25: https://testnet.snowtrace.io/tx/0xd5b92b85beaf283fbaeeefb95c9a17a6b346a05b6f9687f2d6e421aa79243b35
```

## Reemisión de una Transacción Atascada

A veces, durante una alta actividad de red, todas las transacciones no logran llegar a los últimos bloques durante mucho tiempo, debido a una propina efectiva relativamente más baja que las otras transacciones en el pool. Podemos reemitir la misma transacción con una tarifa de prioridad más alta o cancelar la transacción. Para reemitir la transacción atascada, puedes enviar una nueva con la misma cantidad y datos pero con una tarifa de prioridad más alta y el mismo valor de nonce que la transacción atascada. La transacción con una propina efectiva más baja se rechazará automáticamente (debido al mismo nonce), y no necesitas preocuparte por ella. También puedes cancelar la transacción atascada, manteniendo la cantidad en 0, con una tarifa de prioridad más alta y el mismo nonce. Digamos que la transacción anterior con un valor de nonce de 25 está atascada. Entonces puedes reemitir una nueva transacción con el mismo nonce, pero esta vez con una tarifa de prioridad más alta.

```javascript
// reemitiendo transacción con nonce 25
sendAvax("0.01", "0x856EA4B78947c3A5CD2256F85B2B147fEBDb7124", 100, 10, 25)

// cancelando transacción con nonce 25
sendAvax("0", "0x856EA4B78947c3A5CD2256F85B2B147fEBDb7124", 100, 10, 25)
```

## Conclusión

Has aprendido sobre la creación, firma y envío de transacciones con parámetros de tarifa dinámica a la cadena C de la red Avalanche utilizando JavaScript. También se explicó cómo reemitir o cancelar una transacción atascada, enviando una transacción con el mismo nonce. Este tutorial señala la forma recomendada de elegir el límite de tarifa máxima y el límite de tarifa máxima de prioridad para las transacciones y también puede funcionar como una guía general para todas las cadenas basadas en EVM.