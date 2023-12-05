---
etiquetas: [Construir, Dapps]
descripción: Un recorrido completo de las actividades de desarrollo necesarias para una aplicación descentralizada básica.
sidebar_label: Flujo de trabajo de Fuji
pagination_label: Flujo de trabajo de Fuji
---

# Flujo de trabajo de Fuji

## Introducción

Fuji es la red de prueba de la red Avalanche. Puedes usarla para probar tu dapp
o contrato inteligente después de haberlo desarrollado localmente. (Puedes usar
[Avalanche Network Runner](/tooling/network-runner.md) para probar cosas localmente). Fuji está
típicamente en la misma versión que la Avalanche Mainnet, pero a veces está
ejecutando una versión no lanzada de AvalancheGo. En general, puedes esperar que el comportamiento de Fuji sea más o menos el mismo que el de Avalanche Mainnet. Herramientas como exploradores
y billeteras deberían funcionar con la Testnet Fuji.

En este tutorial, pasaremos por un ejemplo de flujo de trabajo de Fuji para mostrar cómo se puede usar. Haremos lo siguiente:

1. Configurar la red Fuji en Core (opcional)
2. Generar una mnemónica de 24 palabras en inglés a través de AvalancheJS
3. Derivar direcciones externas de la C-Chain a través de AvalancheJS
4. Obtener AVAX del grifo de Fuji
5. Enviar AVAX a través de ethersJS
6. Examinar la transacción resultante en el Avalanche Explorer
7. Usar una clave privada derivada de una mnemónica para iniciar sesión en la extensión Core (billetera)

## Configurar la Red Fuji en Core (opcional)

Para acceder a la red de prueba Fuji, el Modo Testnet debe estar habilitado.
Para hacer eso, ve a **Configuración** y haz clic en **Avanzado**.

<div style={{textAlign: 'center'}}>

![Imagen de configuración 1](/img/c-chain-ERC20/settings1.png)

</div>

Aquí, activa la función de **Modo Testnet**. Esto hará que Core cambie automáticamente a
Fuji Testnet.

<div style={{textAlign: 'center'}}>

![Imagen de configuración 2](/img/c-chain-ERC20/settings2.png)

</div>

:::info

Si estás usando otras billeteras, como MetaMask, puedes agregar la Fuji Testnet
usando las siguientes especificaciones:

- **Nombre de la Red**: Avalanche C-Chain
- **Nueva URL RPC**: [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
- **ChainID**: `43113`
- **Símbolo**: AVAX
- **Explorador**: [`https://testnet.snowtrace.io`](https://testnet.snowtrace.io/)

:::

## Generar una Mnemónica

Para empezar, crearemos una frase mnemónica con
[AvalancheJS](/tooling/avalanchejs-overview.md). Las mnemónicas nos permiten codificar
una seguridad sólida en una frase legible para humanos. AvalancheJS soporta 10 idiomas
incluyendo inglés, japonés, español, italiano, francés, coreano, checo,
portugués, chino simplificado y chino tradicional.

Primero, genera una mnemónica de 24 palabras en inglés
[BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)-compatible
a través de AvalancheJS.

```typescript
import { Mnemonic } from "avalanche";
const mnemonic: Mnemonic = Mnemonic.getInstance();
const strength: number = 256;
const wordlist = mnemonic.getWordlists("english") as string[];
const m: string = mnemonic.generateMnemonic(strength, randomBytes, wordlist);
console.log(m);
// "chimney asset heavy ecology accuse window gold weekend annual oil emerge alley retreat rabbit seed advance define off amused board quick wealth peasant disorder"
```

## Derivar Direcciones

Después de generar una mnemónica, podemos usar AvalancheJS para derivar
pares de claves jerárquicas deterministas (HD) compatibles con
[BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki).

```typescript
import HDNode from "avalanche/dist/utils/hdnode";
import { Avalanche, Mnemonic, Buffer } from "avalanche";
import { EVMAPI, KeyChain } from "avalanche/dist/apis/evm";
import { ethers } from "ethers";

const ip: string = "api.avax-test.network";
const port: number = 443;
const protocol: string = "https";
const networkID: number = 5;
const avalanche: Avalanche = new Avalanche(ip, port, protocol, networkID);
const cchain: EVMAPI = avalanche.CChain();

const mnemonic: Mnemonic = Mnemonic.getInstance();
const m: string =
  "chimney asset heavy ecology accuse window gold weekend annual oil emerge alley retreat rabbit seed advance define off amused board quick wealth peasant disorder";
const seed: Buffer = mnemonic.mnemonicToSeedSync(m);
const hdnode: HDNode = new HDNode(seed);

const keyChain: KeyChain = cchain.newKeyChain();

const cAddresses: string[] = [];

for (let i: number = 0; i <= 2; i++) {
  const child: HDNode = hdnode.derive(`m/44'/60'/0'/0/${i}`);
  keyChain.importKey(child.privateKey);
  const cchainAddress = ethers.utils.computeAddress(child.privateKey);
  cAddresses.push(cchainAddress);
}
console.log(cAddresses);
// [
//   '0x2d1d87fF3Ea2ba6E0576bCA4310fC057972F2559',
//   '0x25d83F090D842c1b4645c1EFA46B15093d4CaC7C',
//   '0xa14dFb7d8593c44a47A07298eCEA774557036ff3'
// ]
```

### Generar Claves Privadas a partir de una Mnemónica

Mientras tengas la frase mnemónica, puedes regenerar tus claves privadas
y las direcciones que controlan.

Por ejemplo, si quieres generar las claves privadas para las primeras 3 direcciones en el keychain de la C Chain:

- [0x2d1d87fF3Ea2ba6E0576bCA4310fC057972F2559](https://testnet.snowtrace.io/address/0x2d1d87fF3Ea2ba6E0576bCA4310fC057972F2559)
- [0x25d83F090D842c1b4645c1EFA46B15093d4CaC7C](https://testnet.snowtrace.io/address/0x25d83F090D842c1b4645c1EFA46B15093d4CaC7C)
- [0xa14dFb7d8593c44a47A07298eCEA774557036ff3](https://testnet.snowtrace.io/address/0xa14dFb7d8593c44a47A07298eCEA774557036ff3)

podrías actualizar el script de ejemplo anterior al siguiente:

```typescript
const cAddresses: string[] = [];
const privateKeys: string[] = [];
for (let i: number = 0; i <= 2; i++) {
  // Derivando la dirección _i_-ésima de la cadena C de la BIP44 externa
  const child: HDNode = hdnode.derive(`m/44'/60'/0'/0/${i}`);
  keyChain.importKey(child.privateKey);
  // Convirtiendo las direcciones BIP44 a direcciones hexadecimales
  const cchainAddress = ethers.utils.computeAddress(child.privateKey);
  privateKeys.push(child.privateKey.toString("hex"));
  cAddresses.push(cchainAddress);
}
console.log({ cAddresses, privateKeys });
// {
//   cAddresses: [
//     '0x2d1d87fF3Ea2ba6E0576bCA4310fC057972F2559',
//     '0x25d83F090D842c1b4645c1EFA46B15093d4CaC7C',
//     '0xa14dFb7d8593c44a47A07298eCEA774557036ff3'
//   ],
//   privateKeys: [
//     'cd30aef1af167238c627593537e162ecf5aad1d4ab4ea98ed2f96ad4e47006dc',
//     'b85479b26bc8fbada4737e90ab2133204f2fa2a9ea33c1e0de4452cbf8fa3be4',
//     'c72e18ea0f9aa5457396e3bf810e9de8df0177c8e4e5bf83a85f871512d645a9'
//   ]
// }
```

## Obtén un Drip del Fuji Faucet

Podemos obtener un "drip" de AVAX del Fuji faucet. Pega la dirección en el
sitio web del [Fuji faucet](https://faucet.avax.network). Estos AVAX son para la Fuji
Testnet y no tienen valor monetario.

![Solicitando AVAX](/img/fuji-workflow/faucet1.png)

El faucet enviará algunos AVAX a la dirección y devolverá un ID de transacción
(txID). Este txID se puede usar con el Fuji Testnet Explorer para obtener más información sobre
la transacción.

![Recibiendo AVAX](/img/fuji-workflow/faucet2.png)

### Verificar los Detalles de la Transacción

El txID, `0x1419b04559bf140ab82216f7696110936fb7d4bc1f147e3b85fef7ca1008a19e`,
se puede ver en el [Fuji Testnet
Explorer](https://testnet.snowtrace.io/tx/0x1419b04559bf140ab82216f7696110936fb7d4bc1f147e3b85fef7ca1008a19e).
Avalanche también tiene un [Mainnet Explorer](https://explorer.avax.network).

![Detalles de la transacción](/img/faucet-fuji-wf-alt-tx1.png)

### Obtén el Saldo

También podemos usar el Fuji Explorer para obtener el saldo de la primera dirección—[0x2d1d87fF3Ea2ba6E0576bCA4310fC057972F2559](https://explorer.avax-test.network/address/0x2d1d87fF3Ea2ba6E0576bCA4310fC057972F2559).

![Saldo de la primera dirección derivada](/img/faucet-fuji-wf-alt-balance.png)

Alternativamente, podemos usar [ethersJS](https://docs.ethers.io/v5/) para obtener el saldo.

```typescript
const ethers = require("ethers");
const network = "https://api.avax-test.network/ext/bc/C/rpc";
const provider = ethers.getDefaultProvider(network);
const address = "0x2d1d87fF3Ea2ba6E0576bCA4310fC057972F2559";

const main = async (): Promise<any> => {
  provider.getBalance(address).then((balance) => {
    // convertir una unidad de moneda de wei a ether
    const balanceInAvax = ethers.utils.formatEther(balance);
    console.log(`saldo: ${balanceInAvax} AVAX`);
    // saldo: 2 AVAX
  });
};

main();
```

## Enviando AVAX

El faucet envió 2 AVAX a la primera dirección que generamos. Vamos a enviar AVAX desde
la primera dirección a la segunda dirección.

```typescript
// importar ethers.js
import { ethers } from "ethers";
// red: usando la testnet Fuji
const network = "https://api.avax-test.network/ext/bc/C/rpc";
// proveedor: establecer una conexión RPC con la red
const provider = new ethers.providers.JsonRpcProvider(network);

// Clave privada del remitente:
// dirección correspondiente 0x0x2d1d87fF3Ea2ba6E0576bCA4310fC057972F2559
let privateKey =
  "cd30aef1af167238c627593537e162ecf5aad1d4ab4ea98ed2f96ad4e47006dc";
// Crear una instancia de billetera
let wallet = new ethers.Wallet(privateKey, provider);
// Dirección del receptor
let receiverAddress = "0x25d83F090D842c1b4645c1EFA46B15093d4CaC7C";
// Cantidad de AVAX a enviar
let amountInAvax = "0.01";
// Crear un objeto de transacción
let tx = {
  to: receiverAddress,
  // Convertir la unidad de moneda de ether a wei
  value: ethers.utils.parseEther(amountInAvax),
};
// Enviar una transacción
wallet.sendTransaction(tx).then((txObj) => {
  console.log(`"tx, https://testnet.snowtrace.io/tx/${txObj.hash}`);
  // Un resultado de transacción se puede verificar en un snowtrace con un enlace de transacción que se puede obtener aquí.
});
```

### Verificar el Éxito

Podemos verificar que la transacción,
`0x3a5f4198b3be8d24b272f8255912aae4dcf2fb1f97f70d1787434de7b3097aac`, fue
exitosa usando el Fuji Testnet Explorer. La transacción se puede ver
[aquí](https://testnet.snowtrace.io/tx/0x3a5f4198b3be8d24b272f8255912aae4dcf2fb1f97f70d1787434de7b3097aac).

![Detalles de la transacción](/img/fuji-wf-alt-tx-2.png)

#### Obtén el Saldo

También podemos usar el Fuji Explorer para obtener el saldo de la segunda dirección—[0x25d83F090D842c1b4645c1EFA46B15093d4CaC7C](https://testnet.snowtrace.io/address/0x25d83F090D842c1b4645c1EFA46B15093d4CaC7C).

Alternativamente, podemos usar ethersJS para obtener el saldo.

```typescript
const ethers = require("ethers");
const network = "https://api.avax-test.network/ext/bc/C/rpc";
const provider = ethers.getDefaultProvider(network);
const address = "0x25d83F090D842c1b4645c1EFA46B15093d4CaC7C";

const main = async (): Promise<any> => {
  provider.getBalance(address).then((balance) => {
    // convertir una unidad de moneda de wei a ether
    const balanceInAvax = ethers.utils.formatEther(balance);
    console.log(`saldo: ${balanceInAvax} AVAX`);
    // saldo: 0.01 AVAX
  });
};

main();
```



const main = async (): Promise<any> => {
  provider.getBalance(address).then((balance) => {
    // convertir una unidad de moneda de wei a ether
    const balanceInAvax = ethers.utils.formatEther(balance);
    console.log(`saldo: ${balanceInAvax} AVAX`);
    // saldo: 0.02 AVAX
  });
};

main();
```

### Iniciar sesión en la Extensión Core

Por último, podemos [usar la mnemotecnia para generar una clave privada](#generar-claves-privadas-desde-una-mnemotecnia) para acceder a esa cuenta en la [extensión Core](https://join.core.app/extension).
Veremos que tiene el saldo de AVAX y que deriva la dirección hexadecimal de la clave privada.

Usa la clave privada para acceder a la cuenta en la Extensión Core.

![Acceder a la billetera](/img/fuji-wf-alt-enter-key.png)

El saldo es correcto y la dirección es la primera dirección derivada.

![Saldo de la extensión Core](/img/fuji-wf-wallet-alt-info.png) ![3ra dirección derivada BIP44](/img/fuji-wf-alt-wallet-address.png)

Podemos repetir este proceso de inicio de sesión usando las claves privadas de las otras 2 direcciones en el [script anterior](#generar-claves-privadas-desde-una-mnemotecnia).

![Direcciones derivadas de la billetera](/img/fuji-wf-alt-wallet-address-2.png)
![Direcciones derivadas de la billetera2](/img/fuji-wf-alt-wallet-address-3.png)  
![Direcciones derivadas de la billetera3](/img/fuji-wf-alt-wallet-addresses.png)

## Resumen

La red de pruebas Fuji juega un papel crítico en la prueba de dapps, contratos inteligentes y productos financieros antes de implementar en la red principal. Las herramientas como AvalancheJS, la API pública, el grifo y el explorador ayudan a asegurar que tu entorno de prueba y QA esté cerca de la red principal para que puedas tener confianza al lanzar en la red principal.

## Recursos

Para recursos adicionales y valiosos, consulta a continuación.

### Grifo

El [Fuji Faucet](https://faucet.avax.network) envía AVAX a direcciones de la cadena X o de la cadena C para ayudarte a probar. (Este AVAX de la red de pruebas no tiene valor.)

### Billetera

La [extensión Core](https://join.core.app/extension) y la [aplicación móvil Core](https://support.avax.network/en/articles/6115608-core-mobile-where-can-i-download-core-mobile-to-my-phone) son billeteras simples, seguras y no custodiadas para almacenar activos Avalanche. Soportan Mainnet, Fuji y redes personalizadas.

### Explorador

El Avalanche Explorer te permite explorar la red en [Mainnet](https://explorer.avax.network) y [Fuji](https://explorer.avax-test.network).

### Puntos finales RPC - Servidor de API pública

Ver [aquí](/tooling/rpc-providers.md).

### Ejemplos de AvalancheJS

Hay más de [60 ejemplos de scripts AvalancheJS](https://github.com/ava-labs/avalanchejs/tree/master/examples) que demuestran cómo manejar activos y NFTs, enviar transacciones, agregar validadores y más.