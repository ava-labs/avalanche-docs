---
tags: [Construir, Dapps]
description: Este tutorial explica cómo verificar un contrato inteligente en un explorador de bloques usando Hardhat después de desplegarlo en Avalanche C-Chain.
sidebar_label: Usando Hardhat
pagination_label: Verificando Contratos Inteligentes Usando Hardhat y Snowtrace
---

# Verificando Contratos Inteligentes Usando Hardhat y Snowtrace

Este tutorial asume que el contrato fue desplegado usando Hardhat y que todas las dependencias de Hardhat
están instaladas correctamente.

Después de desplegar un contrato inteligente, se puede verificar el contrato inteligente en Snowtrace en tres pasos:

1. Aplanar el Contrato Inteligente
2. Limpiar el contrato aplanado
3. Verificar usando la interfaz gráfica de Snowtrace

## Aplanar un Contrato Inteligente usando Hardhat

Para aplanar el contrato, ejecuta el siguiente comando:
`npx hardhat flatten <ruta-al-contrato> >> <nombre-contrato-aplanado>.sol`

## Limpiar el Contrato Inteligente aplanado

Es posible que sea necesario hacer algunas limpiezas para que el código se compile correctamente en el Verificador de Contratos Snowtrace.

- Elimina todo excepto la licencia SPDX superior.

  - Si el contrato utiliza múltiples licencias SPDX, utiliza ambas licencias agregando AND:
    `SPDX-License-Identifier: MIT AND BSD-3-Clause`

## Verificar el Contrato Inteligente usando Snowtrace UI

Snowtrace está trabajando actualmente en una nueva interfaz de usuario (UI) para la verificación de contratos inteligentes. 
Mientras tanto, puede considerar el uso de su API para una experiencia de verificación de contratos inteligentes sin problemas.
<!--

1. Busca el contrato en Snowtrace
2. Haz clic en la pestaña del contrato

   1. Si el contrato no está verificado, verás algo similar a la imagen de abajo
      ![snowtraceHH-1](/img/snowtraceHH-1.png)

   <br></br>

3. Haz clic en Verificar y Publicar
4. En la siguiente pantalla, en los menús desplegables, selecciona lo siguiente

   1. **Solidity (Archivo único)**
   2. **La versión del compilador que utilizaste para compilar el contrato desplegado**
   3. El tipo de licencia de código abierto (selecciona ninguno si no corresponde)
      ![snowtraceHH-2](/img/snowtraceHH-2.png)

   <br></br>

5. Copia y pega el código del contrato aplanado en el cuadro correspondiente
6. Si se utilizó optimización al compilar el contrato, asegúrate de seleccionar "Sí" en el menú desplegable
   etiquetado como "Optimization" (Optimización)

   1. Si se utilizó optimización, expande el cuadro inferior etiquetado como "Misc Settings" (Configuraciones Misceláneas) e ingresa el número de ejecuciones
      ![snowtraceHH-3](/img/snowtraceHH-3.png)

   <br></br>

7. Selecciona Verificar y Publicar
   1. Si tiene éxito, todos los contratos con el mismo bytecode serán verificados
   2. Si no tiene éxito, lee los mensajes de error proporcionados y realiza los cambios apropiados
      1. Asegúrate de verificar que la versión del compilador y las ejecuciones del optimizador sean las mismas que cuando compilado el contrato antes del despliegue -->

## Verificar el Contrato Inteligente Programáticamente Usando APIs

Asegúrate de tener Postman o cualquier otra plataforma API instalada en tu ordenador (o accesible a través de servicios online), 
junto con el código fuente de tu contrato y los parámetros utilizados durante el despliegue.

A continuación se muestra la URL de llamada a la API que debe utilizarse para una solicitud POST: 

```https://api.snowtrace.io/api?module=contract&action=verifysourcecode```

Tenga en cuenta que esta URL está configurada específicamente para verificar contratos en Avalanche C-Chain Mainnet. 
Si desea verificar en Fuji Testnet, utilice:

```https://api-testnet.snowtrace.io/api?module=contract&action=verifysourcecode ```

Aquí está el cuerpo de la llamada a la API con los parámetros requeridos:

```json
{
  "contractaddress": "YOUR_CONTRACT_ADDRESS",
  "sourceCode": "YOUR_FLATTENED_SOURCE_CODE",
  "codeformat": "solidity-single-file",
  "contractname": "YOUR_CONTRACT_NAME",
  "compilerversion": "YOUR_COMPILER_VERSION",
  "optimizationUsed": "YOUR_OPTIMIZATION_VALUE",  // 0 si no está optimizado, 1 si está optimizado
  "runs": "YOUR_OPTIMIZATION_RUNS",  // eliminar si no es aplicable
  "licenseType": "YOUR_LICENSE_TYPE",  // 1 si no se especifica
  "apikey": "API_KEY_PLACEHOLDER", // no necesita una clave de API, utilice un marcador de posición
  "evmversion": "YOUR_EVM_VERSION_ON_REMIX",
  "constructorArguments": "YOUR_CONSTRUCTOR_ARGUMENTS"   // Eliminar si no procede
}
```

## Verificando con Hardhat-Verify

Esta parte del tutorial asume que el contrato fue desplegado usando Hardhat y que todas las dependencias de Hardhat
están instaladas correctamente, incluyendo `'@nomiclabs/hardhat-etherscan'`.

Necesitará crear un `.env.json` con su _Wallet Seed Phrase_. No necesitas una clave API para verificar en Snowtrace.

Ejemplo de `.env.json`:

```json
{
  "MNEMONIC": "tu-frase-de-semilla-de-billetera",
}
```

<br></br>

A continuación se muestra un ejemplo de `hardhat.config.ts` utilizado para el despliegue y la verificación (ver LN 45: `etherscan`)

```typescript
import { task } from "hardhat/config";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "ethers";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "hardhat-gas-reporter";
import "@nomiclabs/hardhat-etherscan";
import { MNEMONIC, APIKEY } from "./.env.json";

// Al usar la red hardhat, puedes elegir bifurcar Fuji o Avalanche Mainnet
// Esto te permitirá depurar contratos usando la red hardhat mientras mantienes el estado de la red actual
// Para habilitar la bifurcación, activa uno de estos booleanos y luego ejecuta tus tareas/scripts usando ``--network hardhat``
// Para obtener más información, consulta la guía de hardhat
// https://hardhat.org/hardhat-network/
// https://hardhat.org/guides/mainnet-forking.html
const FORK_FUJI = false;
const FORK_MAINNET = false;
const forkingData = FORK_FUJI
  ? {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
    }
  : FORK_MAINNET
  ? {
      url: "https://api.avax.network/ext/bc/C/rpc",
    }
  : undefined;

task(
  "accounts",
  "Imprime la lista de cuentas",
  async (args, hre): Promise<void> => {
    const accounts: SignerWithAddress[] = await hre.ethers.getSigners();
    accounts.forEach((account: SignerWithAddress): void => {
      console.log(account.address);
    });
  }
);

task(
  "balances",
  "Imprime la lista de saldos de cuentas AVAX",
  async (args, hre): Promise<void> => {
    const accounts: SignerWithAddress[] = await hre.ethers.getSigners();
    for (const account of accounts) {
      const balance: BigNumber = await hre.ethers.provider.getBalance(
        account.address
      );
      console.log(`${account.address} tiene un saldo de ${balance.toString()}`);
    }
  }
);
export default {
  etherscan: {
    // No necesita una clave API para Snowtrace
  },

  solidity: {
    compilers: [
      {
        version: "0.8.0",
      },
      {
        version: "0.8.10",
      },
    ],
  },
  networks: {
    hardhat: {
      gasPrice: 225000000000,
      chainId: 43114, //Solo especifica un chainId si no estamos bifurcando
      // forking: {
      //   url: 'https://api.avax.network/ext/bc/C/rpc',
      // },
    },
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      gasPrice: 225000000000,
      chainId: 43113,
      accounts: { mnemonic: MNEMONIC },
    },
    mainnet: {
      url: "https://api.avax.network/ext/bc/C/rpc",
      gasPrice: 225000000000,
      chainId: 43114,
      accounts: { mnemonic: MNEMONIC },
    },
  },
};
```

<br></br>

Una vez que el contrato esté desplegado, verifica con hardhat verify ejecutando lo siguiente:

```zsh
npx hardhat verify <dirección-del-contrato> <argumentos> --network <red>
```

<br></br>

Ejemplo:

```zsh
npx hardhat verify 0x3972c87769886C4f1Ff3a8b52bc57738E82192D5 MockNFT Mock ipfs://QmQ2RFEmZaMds8bRjZCTJxo4DusvcBdLTS6XuDbhp5BZjY 100 --network fuji
```

<br></br>

También puedes verificar los contratos de forma programática a través de un script.

Ejemplo:

```typescript
import console from "console";
const hre = require("hardhat");

// Define el NFT
const nombre = "MockNFT";
const simbolo = "Mock";
const _metadataUri = "ipfs://QmQ2RFEmZaMds8bRjZCTJxo4DusvcBdLTS6XuDbhp5BZjY";
const _maxTokens = "100";

async function main() {
  await hre.run("verify:verify", {
    address: "0x3972c87769886C4f1Ff3a8b52bc57738E82192D5",
    constructorArguments: [nombre, simbolo, _metadataUri, _maxTokens],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

<br></br>

Primero crea tu script y luego ejecútalo a través de hardhat ejecutando lo siguiente:

```zsh
npx hardhat run scripts/<nombre_del_script.ts> --network <red>
```

<br></br>

Ejemplo:

```zsh
npx hardhat run scripts/5-verifyNFT.ts --network fuji
```

<br></br>

Verificar a través de la terminal no te permitirá pasar un arreglo como argumento, sin embargo, puedes hacerlo
al verificar a través de un script incluyendo el arreglo en tus _Constructor Arguments_.

Ejemplo: (ver línea 13 `_custodians`, línea 30 `_custodians`)

```typescript
import console from "console";
const hre = require("hardhat");

// Define el NFT
const nombre = "MockNFT";
const simbolo = "Mock";
const _metadataUri =
  "ipfs://QmQn2jepp3jZ3tVxoCisMMF8kSi8c5uPKYxd71xGWG38hV/Example";
const _royaltyRecipient = "0xcd3b766ccdd6ae721141f452c550ca635964ce71";
const _royaltyValue = "50000000000000000";
const _custodians = [
  "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199",
  "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
  "0xdd2fd4581271e230360230f9337d5c0430bf44c0",
];
const _saleLength = "172800";
const _claimAddress = "0xcd3b766ccdd6ae721141f452c550ca635964ce71";

async function main() {
  await hre.run("verify:verify", {
    address: "0x08bf160B8e56899723f2E6F9780535241F145470",
    constructorArguments: [
      nombre,
      simbolo,
      _metadataUri,
      _royaltyRecipient,
      _royaltyValue,
      _custodians,
      _saleLength,
      _claimAddress,
    ],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```
