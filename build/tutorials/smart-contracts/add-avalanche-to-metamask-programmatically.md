# Añadir Avalanche a MetaMask Programmatically

Agregar nuevas redes a Metamask no es una tarea trivial para personas que no son técnicamente savvy, y puede ser un precio de error. Para ayudar a facilitar la incorporación de los usuarios a tu aplicación, es útil simplificar ese proceso lo más posible Este tutorial mostrará cómo crear un botón sencillo en tu aplicación de frontal que automatiza el proceso de agregar la red de Avalanche a MetaMask.

## EIP-3038 & MetaMask

[EIP-3038](https://eips.ethereum.org/EIPS/eip-3085) es una [propuesta](https://eips.ethereum.org/) de mejora de Ethereum que define un método RPC para agregar blockchains compatibles con Ethereum a las aplicaciones de billetera.

Desde marzo de 2021 Metamask ha implementado esa EIP como parte de su API de [redes personalizadas](https://consensys.net/blog/metamask/connect-users-to-layer-2-networks-with-the-metamask-custom-networks-api/) de Metamask

Veamos cómo funciona.

## Estructuras de datos

Para agregar la red de Avalanche a Metamask, necesitamos preparar las estructuras de datos que contendrán todos los datos necesarios.

Datos de la red principales:

```javascript
export const AVALANCHE_MAINNET_PARAMS = {
    chainId: '43114',
    chainName: 'Avalanche Mainnet C-Chain',
    nativeCurrency: {
        name: 'Avalanche',
        symbol: 'AVAX',
        decimals: 18
    },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://cchain.explorer.avax.network/']
}
```

Datos de la red de prueba:

```javascript
export const AVALANCHE_TESTNET_PARAMS = {
    chainId: '43113',
    chainName: 'Avalanche Testnet C-Chain',
    nativeCurrency: {
        name: 'Avalanche',
        symbol: 'AVAX',
        decimals: 18
    },
    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://cchain.explorer.avax-test.network/']
}
```

## Añadiendo la red

Para agregar la red a MetaMask, necesitamos llamar al `wallet_addEthereumChain`método, expuesto por el proveedor de web3.

```javascript
  function addAvalancheNetwork() {
    injected.getProvider().then(provider => {
      provider
        .request({
          method: 'wallet_addEthereumChain',
          params: [AVALANCHE_MAINNET_PARAMS]
        })
        .catch((error: any) => {
          console.log(error)
        })
    })
  }
```

Donde `injected`se inicializa como una interfaz `web3-react/injected-connector`utilizada para interactuar con las API de MetaMask. El uso para otros marcos web populares es similar. Reemplaza `AVALANCHE_MAINNET_PARAMS`con `AVALANCHE_TESTNET_PARAMS`si quieres agregar la red de prueba.

El patrón de uso típico sería exponer un botón que llama ese método si recibes `Wrong Network`o `Error connecting`errores al intentar establecer una conexión a MetaMask.

## Experiencia

Cuando los usuarios vienen al sitio web de tu dapp, necesitan aprobar la conexión a MetaMask. Después de hacer eso, si no detectas una conexión de red de web3 exitosa, puedes presentarlos con un diálogo pidiéndoles que confirmen el cambio a una nueva red:

![red incorrecta](../../../.gitbook/assets/add-avalanche-to-metamask-01-wrong-network.png)

Si presionan el botón, se muestra un diálogo de MetaMask pidiendo la aprobación para agregar la nueva red:

![añadir una red](../../../.gitbook/assets/add-avalanche-to-metamask-02-add-network.png)

Si aprueban, tu aplicación estará conectada a la red de Avalanche. Muy fácil, no hay necesidad de ninguna entrada de datos, no hay posibilidad de una entrada de datos incorrecta. ¡Y eso es todo, los usuarios están listos para interacy con tu dapp!

## Conclusión

Los usuarios de Dapps son a menudo no muy técnicamente sofisticados y los incorporen necesita ser tan sin interrupciones y fáciles como sea posible. Agregando manualmente una nueva red a MetaMask es un obstáculo que un determinado porcentaje de tus usuarios potenciales no podrán despejar. Eliminar ese requisito es un paso sencillo que mejorará su experiencia y permitirá a más usuarios usar realmente tu dapp.

Si tienes alguna pregunta, problemas o ideas sobre cómo mejorar o simplemente quieres unirse a nuestra comunidad de desarrolladores, puedes contactarnos en nuestro servidor de [Discord](https://chat.avalabs.org/)

