---
etiquetas: [Construir, Dapps]
descripción: Este tutorial explica cómo verificar un contrato inteligente en el explorador de bloques Snowtrace.
sidebar_label: en Snowtrace
pagination_label: Verificar contratos inteligentes en el explorador de la cadena C
sidebar_position: 0
---

# Verificar contratos inteligentes en el explorador de la cadena C

El explorador de la cadena C soporta la verificación de contratos inteligentes, permitiendo a los usuarios revisarlos.

El explorador de la cadena C en Mainnet está [aquí](https://snowtrace.io/) y el explorador de la Testnet Fuji está [aquí.](https://testnet.snowtrace.io/)

Si tienes problemas, contáctanos en [Discord](https://chat.avalabs.org).

## Pasos

Navega a la pestaña _Contrato_ en la página del Explorador para la dirección de tu contrato.

![verificar y publicar](/img/verify-and-publish1.png)

Haz clic en _Verificar y Publicar_ para entrar a la página de verificación del contrato inteligente.

![SRC](/img/verify-src.png)

[Librerías](https://docs.soliditylang.org/en/v0.8.4/contracts.html?highlight=libraries#libraries)
pueden ser proporcionadas. Si lo son, deben ser desplegadas, verificadas de forma independiente
y estar en la sección _Agregar Librerías de Contratos_.

![librerías](/img/verify-libraries.png)

El explorador de la cadena C puede obtener automáticamente los argumentos del constructor para contratos inteligentes simples. Contratos inteligentes más complicados pueden requerir que pases argumentos de constructor especiales. Contratos inteligentes con constructores complicados [pueden tener problemas de validación](verify-smart-contracts.md#caveats). Puedes probar este [codificador ABI en línea](https://abi.hashex.org/).

## Requisitos

- **IMPORTANTE** Los contratos deben ser verificados en Testnet antes de ser desplegados en Mainnet para asegurarse de que no haya problemas.
- Los contratos deben estar aplanados.
  - Los includes no funcionarán.
- Los contratos deben poder compilarse en [Remix](https://remix.ethereum.org).
  - Un contrato aplanado con `pragma experimental ABIEncoderV2` (como ejemplo)
    puede crear blobs binarios y/o de constructor inusuales. Esto podría causar
    problemas de validación.
- El Explorador de la cadena C **sólo** valida [solc
  JavaScript](https://github.com/ethereum/solc-bin) y sólo soporta
  contratos [Solidity](https://docs.soliditylang.org).

## Librerías

El bytecode de compilación identificará si hay librerías externas. Si
lanzaste con Remix, también verás múltiples transacciones creadas.

```json
{
  "linkReferences": {
    "contracts/Storage.sol": {
      "MathUtils": [
        {
          "length": 20,
          "start": 3203
        }
        ...
      ]
    }
  },
  "object": "....",
  ...
}
```

Esto requiere que añadas librerías externas para verificar el código.

Una librería puede tener librerías dependientes. Para verificar una librería, la jerarquía de
dependencias deberá ser proporcionada al Explorador de la cadena C. La verificación puede
fallar si proporcionas más que la librería más cualquier dependencia (es decir, es posible que
necesites podar el código Solidity para excluir cualquier cosa excepto las clases necesarias).

También puedes ver referencias en el bytecode en forma de `__$75f20d36....$__`.
El hash keccak256 se genera a partir del nombre de la librería.

Ejemplo de [convertidor en línea](https://emn178.github.io/online-tools/keccak_256.html):
`contracts/Storage.sol:MathUtils` =&gt;
`75f20d361629befd780a5bd3159f017ee0f8283bdb6da80805f83e829337fd12`

## Ejemplos

- [SwapFlashLoan](https://testnet.snowtrace.io/address/0x12DF75Fed4DEd309477C94cE491c67460727C0E8/contracts)

SwapFlashLoan usa swaputils y mathutils:

- [SwapUtils](https://testnet.snowtrace.io/address/0x6703e4660E104Af1cD70095e2FeC337dcE034dc1/contracts)

SwapUtils requiere mathutils:

- [MathUtils](https://testnet.snowtrace.io/address/0xbA21C84E4e593CB1c6Fe6FCba340fa7795476966/contracts)

## Precauciones

### Licencia SPDX requerida

Se debe proporcionar un SPDX.

```javascript
// SPDX-License-Identifier: ...
```

### Cadenas `keccak256` procesadas

El Explorador de la cadena C interpreta todas las cadenas keccak256(...), incluso las que están en
comentarios. Esto puede causar problemas con los argumentos del constructor.

```javascript
/// keccak256("1");
keccak256("2")
```

Esto podría causar fallos automáticos en la verificación del constructor. Si recibes
errores sobre los argumentos del constructor, puedes proporcionarlos en forma hex codificada ABI en
la página de verificación del contrato.

### Constructores de Solidity

Los constructores y constructores heredados pueden causar problemas al verificar los argumentos del constructor.

ejemplo:

```javascript
contracto abstracto Padre {
  constructor () {
    dirección msgSender = ...;
    emitir Algo(dirección(0), msgSender);
  }
}
contrato Principal es Padre {
  constructor (
          string memory _nombre,
          dirección depósito,
          uint tarifa
  ) {
    ...
  }
}
```

Si recibes errores sobre los argumentos del constructor, puedes proporcionarlos en forma hex
codificada ABI en la página de verificación del contrato.