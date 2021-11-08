# Crear un proyecto

_Este tutorial incluye elementos de los [documentos de inicio rápido](https://www.trufflesuite.com/docs/truffle/quickstart) de Truffle, y está inspirado en los [documentos de blockscout](https://docs.blockscout.com/for-users/smart-contract-interaction/verifying-a-smart-contract/contracts-verification-via-sourcify)_

Asegúrate de tener Truffle instalado:
```
npm install -g truffle
```

Crea un nuevo directorio para tu proyecto Truffle:

```zsh
mkdir MetaCoin
cd MetaCoin
```

Descarga ("unbox") la caja de MetaCoin:
```
truffle unbox metacoin
```


Una vez que esa operación se haya completado, ahora tendrás una estructura de proyecto con los siguientes elementos:

* ``contracts/``: Directorio para contratos de Solidity
* ``migrations/``: Directorio para archivos de despliegue programables
* ``test/``: Directorio para archivos de prueba para hacer pruebas de tu aplicación y tus contratos
* ``truffle.js``: Archivo de configuración de Truffle

## Compilación
Configura tu entorno:

```zsh
yarn add @truffle/hdwallet-provider
```


Crea un archivo ``.env.json`` en el directorio raíz de tu proyecto:

```json
{"mnemonic": "your-wallet-seed-phrase"}
```

Configura tu archivo ``truffle-config.js`` con los ajustes apropiados:


```js
/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

 const HDWalletProvider = require("@truffle/hdwallet-provider");

 //
 const { mnemonic } = require('./.env.json');

 module.exports = {
   /**
    * Networks define how you connect to your ethereum client and let you set the
    * defaults web3 uses to send transactions. If you don't specify one truffle
    * will spin up a development blockchain for you on port 9545 when you
    * run `develop` or `test`. You can ask a truffle command to use a specific
    * network from the command line, e.g
    *
    * $ truffle test --network <network-name>
    */

   networks: {

    fuji: {
      provider: () => new HDWalletProvider(mnemonic, `https://api.avax-test.network/ext/bc/C/rpc`),
      network_id: "*",
      timeoutBlocks: 200,
      skipDryRun: true
    }
   },
 };
```
_La red se puede configurar para despliegue en la red principal (ver [Alternativas](verify-smart-contracts-with-sourcify-truffle.md#alternatives))_

Ejecuta el siguiente comando:

```zsh
truffle compile
```


Al culminar esta operación, tu carpeta ``./build/contracts`` debe contener los siguientes elementos:


* ``ConvertLib.json``
* ``MetaCoin.json``
* ``Migrations.json``

_Necesitarás ``MetaCoin.json`` para uso futuro_

## Migración

Ejecuta el siguiente comando:
```zsh
truffle migrate --network fuji
```

Debes ver la actividad de txn en tu terminal

![Step1](https://user-images.githubusercontent.com/73849597/128948790-654fc0dc-25d5-4713-9058-dfc4101a8366.png)
<br>
 ![Step2](https://user-images.githubusercontent.com/73849597/128949004-c63d366f-3c0e-42e0-92f5-cb86da62bcba.png)
<br>
 ![Step3](https://user-images.githubusercontent.com/73849597/128948793-3cb1beda-00c3-47e2-ab43-7b4712b1cf1d.png)


_Necesitarás la dirección del contrato de MetaCoin para uso futuro_


# Verifica contratos inteligentes con el explorador de la C-Chain

El explorador de la C-Chain admite la verificación de los contratos inteligentes, lo que permite que los usuarios los revisen

El explorador de la C-Chain de la red principal se encuentra [aquí](https://cchain.explorer.avax.network/) y el explorador de la red de pruebas Fuji se encuentra [aquí](https://cchain.explorer.avax-test.network/)

Si tienes problemas, contáctanos en [Discord](https://chat.avalabs.org)

## Pasos
* Navega hasta la pestaña _Code_ en la página del explorador, para ver la dirección de tu contrato

![CodeTab2](https://user-images.githubusercontent.com/73849597/128950386-35d89fe5-c61f-41b0-badf-87a487bf422c.png)


* Haz clic en _Verify & Publish_ para ingresar a la página de verificacíon de los contratos inteligentes

![SourcifyVerify](https://user-images.githubusercontent.com/73849597/128950515-cc74c92f-6da3-485f-bb7f-a033eb59bd2e.png)


* Haz clic en _Sourcify: archivo fuentes y metadataJSON_

* Haz clic en _Next_

![JSONSourcify](https://user-images.githubusercontent.com/73849597/128950634-55bdd46e-885b-437e-84d2-534bd1801df0.png)

* Sube ``MetaCoin.sol`` ``ConvertLib.sol`` y ``MetaCoin.json``\(se encuentran en la carpeta de construcción\)

* Haz clic en _Verify & Publish_



![MetaCoin](https://user-images.githubusercontent.com/73849597/128950810-b1b5c280-267b-47ce-9922-edd36a157cd6.png)

* Mira el contrato verificado: [MetaCoin](https://cchain.explorer.avax-test.network/address/0xf1201EA651Ed5F968920c8bC62Fd76ea4CBfd9C2/contracts)


# Alternativas

## Aplana los archivos para la verificación
```zsh
yarn add truffle-flattener
```

Ejecuta el siguiente comando:

```zsh
npx truffle-flattener contracts/MetaCoin.sol > contracts/MetaCoin_flat.sol
```

repite los pasos de compilación, migración y verificación

## Despliegue de la red principal

Configura tu archivo ``truffle-config.js`` con los ajustes apropiados:

```js
module.exports = {
...
   networks: {

    mainnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://api.avax.network/ext/bc/C/rpc`),
      network_id: "*",
      timeoutBlocks: 200,
      skipDryRun: true
    }
   },
 };
```
Ejecuta el siguiente comando:
```zsh
truffle migrate --network mainnet
```

