# Verifica los contratos inteligentes en el Explorador de C-Chain

El Explorador de C-Chain admite la verificación de contratos inteligentes, que permiten a los usuarios revisarlos.

El Explorador de C-Chain de Mainnet está [aquí](https://cchain.explorer.avax.network/) y el Explorador de Fuji Testnet está [aquí.](https://cchain.explorer.avax-test.network/)

Si tienes problemas, contacta con nosotros en [Discord](https://chat.avalabs.org).

## Pasos

Navega a la _pestaña de _código en la página Explorer para la dirección de tu contrato.

![Verificar &amp; Publica](../../../.gitbook/assets/smart-contract-verify-page.png)

Haz clic en _Verifique y publica para introducir la página de verificación _de contratos inteligentes.

![Entrada de contrato](../../../.gitbook/assets/smart-contract-input-page.png)

[Se](https://docs.soliditylang.org/en/v0.8.4/contracts.html?highlight=libraries#libraries) pueden proporcionar Si son, deben ser implementados, verificados de forma independiente y en la _sección de Bibliotecas de contratos de _Agregar

![Bibliotecas](../../../.gitbook/assets/smart-contract-library.png)

El Explorador de C-Chain puede traer argumentos de constructor automáticamente para contratos inteligentes simples. Los contratos más complicados pueden requerir que pases en argumentos de constructores especiales. Los contratos inteligentes con constructores complicados [pueden tener problemas](verify-smart-contracts.md#caveats) de validación. Puedes probar este [codificador de abi en línea](https://abi.hashex.org/).

## Requisitos

* **Los **contratos importantes deben ser verificados en Testnet antes de ser implementados en Mainnet para asegurar que no haya problemas.
* Los contratos deben ser atados.
   * Incluye no funcionará.
* Los contratos deberían ser compilables en [Remix](https://remix.ethereum.org).
   * Un contrato de flattened con `pragma experimental ABIEncoderV2`\(como un ejemplo\) puede crear blobs binarios inusuales y/o constructores. Esto puede causar problemas de validación.
* El Explorador de C-Chain **solo **valida de [solc javascript](https://github.com/ethereum/solc-bin) y solo admite contratos de [Solidity](https://docs.soliditylang.org)

## Bibliotecas

La bytecode se identificará si hay bibliotecas externas. Si liberas con Remix, también verás varias transacciones creadas.

```javascript
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

Esto requiere que añada bibliotecas externas para verificar el código.

Una biblioteca puede tener bibliotecas dependientes. Para verificar una biblioteca, la jerarquía de dependencias tendrá que ser proporcionada al Explorador de C-Chain La verificación puede fallar si proporciona más de la biblioteca más cualquier dependencia \(es decir, puedes necesitar pode el código de Solidity para excluir cualquier cosa menos las clases necesarias\).

`__$75f20d36....$__`También puedes ver referencias en el código de byte en la forma El hash de keccak256 se genera desde el nombre de la biblioteca.

Ejemplo [convertidor en línea](https://emn178.github.io/online-tools/keccak_256.html): `contracts/Storage.sol:MathUtils`=>`75f20d361629befd780a5bd3159f017ee0f8283bdb6da80805f83e829337fd12`

## Ejemplos

* [SwapFlashLoan](https://cchain.explorer.avax-test.network/address/0x12DF75Fed4DEd309477C94cE491c67460727C0E8/contracts)

SwapFlashLoan utiliza swaputils y mathutils:

* [SwapUtils](https://cchain.explorer.avax-test.network/address/0x6703e4660E104Af1cD70095e2FeC337dcE034dc1/contracts)

SwapUtils requiere mathutils:

* [MathUtils](https://cchain.explorer.avax-test.network/address/0xbA21C84E4e593CB1c6Fe6FCba340fa7795476966/contracts)

## Caveats

### SPDX

Debe ser proporcionado

```javascript
// SPDX-License-Identifier: ...
```

### keccak256 Strings Procesadas

El Explorador de C-Chain interpreta todas las cadenas keccak256 \(...\), incluso aquellas en comentarios. Esto puede causar problemas con los constructores

```javascript
/// keccak256("1");
keccak256("2");
```

Esto podría causar fallos de verificación de constructores automáticos. Si recibes errores sobre los creadores args pueden ser proporcionados en forma codificada de ABI hex en la página de verificación de contrato.

### Constructores de Solidity

Los constructores y los creadores heredados pueden causar problemas de verificación de los argumentos de constructores.

Ejemplo:

```javascript
abstract contract Parent {
  constructor () {
    address msgSender = ...;
    emit Something(address(0), msgSender);
  }
}
contract Main is Parent {
  constructor (
          string memory _name,
          address deposit,
          uint fee
  ) {
    ...
  }
}
```

Si recibes errores sobre los creadores args pueden ser proporcionados en forma codificada de ABI hex en la página de verificación de contrato.

