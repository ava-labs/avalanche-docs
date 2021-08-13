# Verificar los contratos inteligentes en el Explorador de Cadena C-C.

El Explorador de Cadena C-Chain la verificación de contratos inteligentes, permitiendo a los usuarios revisarlo.

El Explorador de Cadena Mainnet está [aquí](https://cchain.explorer.avax.network/) y el Explorador de Testnet Fuji está [aquí.](https://cchain.explorer.avax-test.network/)

Si tiene problemas, póngase en contacto con nosotros en [Discord](https://chat.avalabs.org).

## Pasos por la vía de la entrada

Navega a la pestaña _Código_ en la página Explorer para la dirección de su contrato.

![Verificar &amp; Publicar](../../../.gitbook/assets/smart-contract-verify-page.png)

Haga clic en _Verificar y Publicar_ para ingresar en la página de verificación de contrato inteligente.

![Entrada en vigor del contrato](../../../.gitbook/assets/smart-contract-input-page.png)

Se pueden proporcionar [bibliotecas.](https://docs.soliditylang.org/en/v0.8.4/contracts.html?highlight=libraries#libraries) Si lo son, deben ser desplegados, verificados de forma independiente y en la sección _de Bibliotecas de Contrato de_ Adjunta.

![Bibliotecas](../../../.gitbook/assets/smart-contract-library.png)

El Explorador de Cadena C-puede obtener argumentos de constructor automáticamente para contratos inteligentes simples. Los contratos más complicados podrían requerir que usted pase en argumentos especiales constructores. Los contratos inteligentes con constructores complicados [pueden tener problemas](verify-smart-contracts.md#caveats) de validación. Puedes probar este [codificador abi en línea](https://abi.hashex.org/).

## Requisitos para requisitos de seguridad

* Los contratos **importantes** deben verificarse en Testnet antes de ser desplegados en Mainnet para garantizar que no haya problemas.
* Los contratos deben ser atados.
   * Incluye no funcionará.
* Los contratos deben ser compilables en [Remix](https://remix.ethereum.org).
   * Un contrato aplanado con `pragma experimental ABIEncoderV2` \(como ejemplo\) puede crear blobs binarios y/o constructores. Esto podría causar problemas de validación.
* El Explorador de Cadena **C-Chain** valida [el javascript solc](https://github.com/ethereum/solc-bin) y solo admite contratos de [Solidity](https://docs.soliditylang.org)

## Bibliotecas

El bytecode compilará identificará si hay bibliotecas externas. Si liberaste con Remix, también verás múltiples transacciones creadas.

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

Esto requiere que agregue bibliotecas externas para verificar el código.

Una biblioteca puede tener bibliotecas dependientes. Para verificar una biblioteca, la jerarquía de dependencias tendrá que ser proporcionada al Explorador de Cadena C. La verificación puede fallar si usted proporciona más que la biblioteca más cualquier dependencia \(es decir, es posible que necesite podar el código de solidez para excluir cualquier cosa que no sea las clases necesarias).

También puede ver referencias en el código de byte en el formulario `__$75f20d36.... $__`. El hash keccak256 se genera a partir del nombre de la biblioteca.

Ejemplo [convertidor en línea](https://emn178.github.io/online-tools/keccak_256.html): `contracts/Storage.sol:MathUtils` => `75f20d361629befd780a5bd3159f017e0f8283bdb6da805f83e829337fd12`

## Ejemplos de ello

* [SwapFlashLoan](https://cchain.explorer.avax-test.network/address/0x12DF75Fed4DEd309477C94cE491c67460727C0E8/contracts)

SwapFlashLoan utiliza swaputils y mathutils:

* [SwapUtils](https://cchain.explorer.avax-test.network/address/0x6703e4660E104Af1cD70095e2FeC337dcE034dc1/contracts)

SwapUtils requiere mathutils:

* [MathUtils](https://cchain.explorer.avax-test.network/address/0xbA21C84E4e593CB1c6Fe6FCba340fa7795476966/contracts)

## Cuevas

### Licencia SPDX Requerida

Debe proporcionarse un SPDX.

```javascript
// SPDX-License-Identifier: ...
```

### keccak256 Strings Procesados

El Explorador de Cadena C-Chain todas las cadenas keccak256\(...\), incluso aquellas en comentarios. Esto puede causar problemas con los constructores args.

```javascript
/// keccak256("1");
keccak256("2");
```

Esto podría causar fallos de verificación automática del constructor. Si recibe errores sobre los args constructors, se pueden proporcionar en el formulario codificado de ABI hex en la página de verificación del contrato.

### Constructores de solidez

Los constructores y constructores heredados pueden causar problemas para verificar los argumentos de constructor.

ejemplo:

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

Si recibe errores sobre los args constructors, se pueden proporcionar en el formulario codificado de ABI hex en la página de verificación del contrato.

