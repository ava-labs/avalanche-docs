---
etiquetas: [Construir, Dapps]
descripción: Este tutorial explica cómo verificar un contrato inteligente en un explorador de bloques usando Truffle después de desplegarlo en Avalanche C-Chain.
sidebar_label: Usando Truffle
pagination_label: Verificando Contratos Inteligentes con Truffle Verify
---

# Verificando Contratos Inteligentes con Truffle Verify

_Este tutorial incluye elementos de la documentación de inicio rápido de Truffle [aquí](https://www.trufflesuite.com/docs/truffle/quickstart)_

_Inspirado en la documentación de verificación de Truffle [aquí](https://www.npmjs.com/package/truffle-plugin-verify)_

## Crear un Proyecto

Asegúrate de tener Truffle instalado:

```zsh
npm install -g truffle
```

Crea un nuevo directorio para tu proyecto Truffle:

```zsh
mkdir MetaCoin
cd MetaCoin
```

Descarga ("unbox") la caja de MetaCoin:

```zsh
truffle unbox metacoin
```

Una vez que se complete esta operación, ahora tendrás una estructura de proyecto con los siguientes elementos:

- `contracts/`: Directorio para contratos Solidity
- `migrations/`: Directorio para archivos de despliegue scriptables
- `test/`: Directorio para archivos de prueba para probar tu aplicación y contratos
- `truffle.js`: Archivo de configuración de Truffle

## Compilando

Antes de compilar nuestro contrato inteligente, debemos configurar nuestro entorno

Ejecuta los siguientes comandos:

```zsh
npm init -y
```

```zsh
yarn add @truffle/hdwallet-provider yarn add -D truffle-plugin-verify
```

Crea un archivo `.env.json` en el directorio raíz de tu proyecto:

```json
{
  "mnemonic": "tu-frase-de-semilla-de-billetera",
  "snowtraceApiKey": "tu-clave-de-api-de-snowtrace"
}
```

_Obtén tu clave de API de Snowtrace [aquí](https://snowtrace.io/myapikey)_

Configura tu archivo `truffle-config.js` con la configuración adecuada:

```js
/**
 * Usa este archivo para configurar tu proyecto Truffle. Está preconfigurado con algunas
 * configuraciones comunes para diferentes redes y características como migraciones,
 * compilación y pruebas. Descomenta las que necesites o modifícalas
 * según tu proyecto sea necesario.
 *
 * Más información sobre la configuración se puede encontrar en:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * Para desplegar a través de Infura, necesitarás un proveedor de billetera (como @truffle/hdwallet-provider)
 * para firmar tus transacciones antes de enviarlas a un nodo público remoto. Las cuentas de Infura
 * están disponibles de forma gratuita en: infura.io/register.
 *
 * También necesitarás una mnemónica: la frase de doce palabras que la billetera usa para generar
 * pares de claves públicas/privadas. Si publicas tu código en GitHub, asegúrate de cargar esta
 * frase desde un archivo que hayas ignorado en .git para que no se haga pública accidentalmente.
 *
 */

const HDWalletProvider = require("@truffle/hdwallet-provider")

//
const { snowtraceApiKey, mnemonic } = require("./.env.json")

module.exports = {
  /**
   * Las redes definen cómo te conectas a tu cliente de Ethereum y te permiten establecer
   * las configuraciones predeterminadas que web3 usa para enviar transacciones. Si no especificas una,
   * Truffle iniciará una blockchain de desarrollo para ti en el puerto 9545 cuando
   * ejecutes `develop` o `test`. Puedes pedirle a un comando Truffle que use una red específica
   * desde la línea de comandos, por ejemplo
   *
   * $ truffle test --network <nombre-de-red>
   */

  plugins: ["truffle-plugin-verify"],
  api_keys: {
    snowtrace: snowtraceApiKey,
  },
  networks: {
    fuji: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://api.avax-test.network/ext/bc/C/rpc`
        ),
      network_id: 1,
      timeoutBlocks: 200,
      confirmations: 5,
    },
  },
}
```

_La red se puede configurar para el despliegue en Mainnet (ver Alternativas)_

Ejecuta el siguiente comando:

```zsh
truffle compile
```

Una vez que se complete esta operación, tu carpeta `./build/contracts` debería contener los siguientes elementos:

- `ConvertLib.json`
- `MetaCoin.json`
- `Migrations.json`

## Migrando

Ejecuta el siguiente comando:

```zsh
npx truffle migrate --network fuji
```

Deberías ver la actividad de la TX en tu terminal
![truffle-verify-txn1](/img/truffle-verify-txn1.png)

![truffle-verify-txn2](/img/truffle-verify-txn2.png)

![truffle-verify-txn3](/img/truffle-verify-txn3.png)

## Truffle Verify

Truffle verify permite a los usuarios verificar contratos desde la CLI

### Fuji Testnet

Echa un vistazo al explorador de Fuji Testnet [aquí](https://testnet.snowtrace.io/)
y lee más sobre truffle verify
[aquí](https://github.com/rkalis/truffle-plugin-verify)

Si tienes problemas, contáctanos en [Discord](https://chat.avalabs.org)

1. Ejecuta el siguiente comando:

    ```zsh
    npx truffle run verify ConvertLib MetaCoin --network fuji
    ```

2. Espera el mensaje de verificación desde la CLI
   ![truffle-verify-message1](/img/truffle-verify-message1.png)

3. Mira el contrato verificado
   ![truffle-verify-view-contract](/img/truffle-verify-view-contract.png)

### Mainnet

Configura tu archivo `truffle-config.js` con la configuración adecuada:

```js
module.exports = {
...
   plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    snowtrace: snowtraceApiKey
  },
  networks: {

    mainnet: {
        provider: () => new HDWalletProvider(mnemonic, `https://api.avax.network/ext/bc/C/rpc`),
        network_id: 1,
        timeoutBlocks: 200,
        confirmations: 5
    }
  }
};
```

Ejecuta los siguientes comandos:

```zsh
truffle migrate --network mainnet
```

```zsh
truffle verify CovertLib MetaCoin --network mainnet
```

Gracias por leer 🔺