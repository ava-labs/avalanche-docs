---
descripcción: "Proporcionado por un miembro de la Comunidad": Murat Çeliktepe'
---

# Crear un Token ERC-20

Los tokens  ERC-20 son el concepto más fundamental y esencial en Ethereum. A medida que la comunidad de Avalanche y el ecosistema crecen, se implementarán nuevos casos de uso y proyectos que están funcionando en Ethereum o en diferentes cadenas. El estándar de tokens que se utilizaría para los proyectos no es específico y cada uno puede crear su propio estándar y su propio token.

Por lo tanto, crearemos nuestro propio token ERC-20 y lo acuñaremos en cualquier dirección que queramos. El token se generará en la C-Chain de Avalanche y será accesible en esa cadena.

Lo que tenemos que considerar principalmente es que desplegaremos un smart contract escrito con Solidity a Avalanche. Esta es la característica que nos proporciona Avalanche: poder desplegar cualquier smart contract en la cadena y no es necesario que interactúe con un nuevo concepto de contrato específico del lenguaje. Veamos cómo crear un contrato ERC-20 y desplegarlo en la C-Chain de Avalanche.

## Configurar Metamask

Lo primero que debemos configurar es una wallet de metamask.

![Image for post](https://miro.medium.com/max/408/0*0HGM4O_J5iF3943S)

Haz clic en el icono de metamask del navegador y selecciona el menú desplegable de la red. Aquí debemos conectarnos a la C-Chain. Haz clic en “Custom RPC”.

![Image for post](https://miro.medium.com/max/989/1*Y7O1bBeTWnuQBAqTnwmqUQ.png)

Ahora, tenemos que ajustar estas casillas con los valores correctos.

* **Network Name**: Avalanche C-Chain
* **New RPC URL**:
  * **Mainnet:** [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc) 
  * **Fuji Testnet:** [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
  * **Local Testnet:** [http://localhost:9650/ext/bc/C/rpc](http://localhost:9650/ext/bc/C/rpc) 
* **ChainID**:
  * **Mainnet:** `0xa86a` 
  * **Fuji Testnet:** `0xa869` 
  * **Local Testnet:** `0xa868` 
* **Symbol**: C-AVAX
* **Explorer**:
  * **Mainnet:** [https://cchain.explorer.avax.network](https://cchain.explorer.avax.network/) 
  * **Fuji Testnet:** [https://cchain.explorer.avax-test.network](https://cchain.explorer.avax-test.network/)
  * **Localnet:** n/a 

![Image for post](https://miro.medium.com/max/358/1*q0HIWcI3okakwYV2glos0A.png)

Después de configurar todos los parámetros correctamente, deberíamos ver esta página. Por ahora, tenemos 0 C-AVAX. "C" se refiere a la C-chain y tenemos que conseguir algo de C-AVAX para interactuar con la red.

## Agrega fondos a tu dirección de la C-Chain
Dependiendo de la red utilizada, hay tres maneras de hacer llegar los fondos a su dirección de la C-Chain.

### **Usando la Wallet de Avalanche**

En la red principal, puedes usar la [Wallet de Avalanche](https://wallet.avax.network/) para transferir fondos de la X-Chain a tu dirección de la C-Chain. El proceso es simple, como se explica en este [tutorial](../platform/transfer-avax-between-x-chain-and-c-chain.md). La wallet puede ser usada en redes locales y de pruebas.

### **Usando el Faucet de la Red de Pruebas**

Para la agregar fondos en la red de pruebas, también puedes utilizar el Faucet de la Red de Pruebas. Ve a [https://faucet.avax-test.network/](https://faucet.avax-test.network/) y pega tu dirección C-AVAX. Todo lo que necesitas hacer es agregar el prefijo “C-” y la Faucet cambiará de AVAX a C-AVAX.


### Agregando Fondos en la Red de Pruebas Local

En una red local, puedes agregar fondos fácilmente a tus direcciones desplegando su propio faucet. [Tutorial](https://medium.com/avalabs/the-ava-platform-tools-pt-2-the-ava-faucet-48f28da57146)

Vamos al [faucet de avax](https://faucet.avax-test.network/) y pega tu dirección con prefijo “C-”.

Por ejemplo mi dirección es: “0xfe8886bec537252040Dff36448C0F104Be635650”, Necesito pegar la dirección de mi cuenta como: 
“C-0xfe8886bec537252040Dff36448C0F104Be635650”

![Image for post](https://miro.medium.com/max/422/1*okw3MKlyGcF4U9ibsq5v8w.png)

Después de copiar y pegar la dirección aquí, haz clic en **request 2.0000 C-AVAX**. Este token de prueba del faucet no tiene ningún valor, es sólo para fines de desarrollo.

Entonces comprueba el balance de tu wallet y deberías tener algunos tokens de prueba en metamask.

## Crear un Token de Acuñación

Now, we can create our mintable token on Remix. Open Remix on your browser or go to [this link](https://remix.ethereum.org/#optimize=false&evmVersion=null&version=soljson-v0.6.6+commit.6c089d02.js).

![Image for post](https://miro.medium.com/max/1910/1*FWHtbWNXr6FvjzPHH93wvw.png)

You should view this page. On this page, first, click “SOLIDITY” from “Featured Plugins” and then click the “New File” button. When you click the New File button, you will see a pop-up that requires a file name. You can choose a name or leave the default.

Since we will use an ERC-20 contract from [OpenZeppelin](https://openzeppelin.com/contracts/), just paste this line to the file and save.

`import “`[`https://github.com/OpenZeppelin/openzeppelincontracts/blob/master/contracts/presets/ERC20PresetMinterPauser.sol`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/presets/ERC20PresetMinterPauser.sol)`”;`

![Image for post](https://miro.medium.com/max/1408/1*y1wpcCeB8PypnPfs-zhyBg.png)

After saving the file, we will see a bunch of files that are imported to remix. This is a remix feature that allows us to import a GitHub contract repository to remix by just giving the URL-Link. with an import statement.

![Image for post](https://miro.medium.com/max/1364/1*6pmdpKWiKj4RW-OcvMSijA.png)

We have ERC20PresetMinterPauser.sol file in the presets. This file is written by OpenZeppelin according to ERC20 standards with minter functionality. After deploying this file, we will be the owner of the contract and will have the authority and ability to mint token how much we want.

![Image for post](https://miro.medium.com/max/1398/1*5UcrRfoSwjpD29NyuMrrbA.png)

## Deploy the Contract

Open the second tab which is “SOLIDITY COMPILER” and select the solidity version that matches with the solidity version written in file as “pragma solidity …..”. The version should be equal to or bigger than the file’s version. For example, in my file, “pragma solidity ^0.6.0” is written and the version is 0.6.0. So, in the compiler I solidity version as 0.6.6. After setting up the solidity version click to compile button. If you did not change anything in the file or the solidity version is not wrong, you should not get an error.

![Image for post](https://miro.medium.com/max/1388/1*2jkDckFUJ4z3gMoLYZ_-PQ.png)

Then, let’s jump to the third tab which is DEPLOY & RUN TRANSACTION. Here before deploying our contract, we should change the environment. Click to the environment and select “Injected Web3”. If a pop-up shows up and asks you to connect the account, click to connect. After, you should see the account address in the “ACCOUNT” textbox.

The last thing before the deployment process is to set the contract that will be deployed as a token. Above the Deploy Button, there is a drop-down menu to select a contract. Select the contract named “ERC20PresetMinterPauser.sol”.

![Image for post](https://miro.medium.com/max/383/1*s9LtZu4hSuPcVwVZsweZJA.png)

Now, here enter the name and symbol of your token. I will name it “test” and the symbol will be “tst”. You can give it a and click to transact button.

![Image for post](https://miro.medium.com/max/593/1*ZKDEv_h_Pqfd3b7PAosXQw.png)

After clicking the button, a pop-up will show up and just confirm it.

![Image for post](https://miro.medium.com/max/353/1*yOOQYZvESjSKx2qec5pYgA.png)

And then another pop-up, a metamask confirmation, appears. Confirm it.

After confirming all these pop-ups we have deployed our token to avalanche C-Chain. So we can start to interact with it.

## Interact with Token

We can see our transaction that deployed on avalanche C-Chain via this [c-chain explore](https://cchain.explorer.avax-test.network/).

But firstly, let’s see our transaction hash from the remix console.

![Image for post](https://miro.medium.com/max/1469/1*WTHSIfrDe9R_hk-C5GNq0g.png)

After deploying the contract, we should see a log in remix console. When you click to arrow and expand it, a transaction hash will come up. Copy it.

![Image for post](https://miro.medium.com/max/1909/1*NBXgtkYv2VfBkZx1OsBm7A.png)

Just paste the transaction hash to the [explorer](https://cchain.explorer.avax-test.network/) I shared above and press enter.

![Image for post](https://miro.medium.com/max/1907/1*6GhQaa_UaDvtk3Kvimi3aA.png)

Here we can see all details about the transaction and token contract.

![Image for post](https://miro.medium.com/max/764/1*tTFQUn3fStbv-TW9kExyUg.png)

The first one is my wallet address that creates token and the second address is my token contract address which is named “test”. Now, let’s mint some token to our own address.

![Image for post](https://miro.medium.com/max/607/1*K9eBNTQFkvUYjjmvegDZtQ.png)

Come back to the remix and after deploying, you should be able to see the contract in “Deployed Contracts” section.

Here, we have a bunch of functions that we can use to interact with our token contract. You can check all these methods from OpenZeppelin documentation to learn how to use them. But we will only use the mint method.

Click to arrow beside the mint method to read it.

![Image for post](https://miro.medium.com/max/577/1*GrxG6rsklrYN4xN1eF_ckw.png)

Enter your address and an amount in WEI. For example, I will mint 1000 tst token so, I entered “1000000000000000000000”

![Image for post](https://miro.medium.com/max/354/1*FM-PMUY7au61ejHJzBIsfg.png)

## Add Token to Metamask

Now we minted 1000 token to our contract, but you should not be able to see the tokens in your metamask wallet. In order to see our own token, we have to add it. On metamask, click to “Add Token” button and select “Custom Token” tab.

Here enter the token address that you can see from explorer as I showed above. Copy and paste it here. Then click on the Next button, you should see 1000 token that you named in your metamask wallet. Also, you can send it to another account via either remix or metamask.

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTY4MzczOTA3Niw3ODg4NTAxMTYsLTQyMD
I4MDQ3OF19
-->