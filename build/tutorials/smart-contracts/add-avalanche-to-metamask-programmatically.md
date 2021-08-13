# Añadir Avalanche a MetaMask Programmatically

Agregar nuevas redes a Metamask no es una tarea trivial para personas que no son técnicamente sabanas, y puede ser un paso de error. Para ayudar a facilitar la incorporación de los usuarios a su aplicación, es útil simplificar ese proceso en la mayor medida posible. Este tutorial mostrará cómo construir un botón sencillo en su aplicación de extremo frontal que automatiza el proceso de agregar la red Avalanche a MetaMask.

## EIP-3038 & MetaMask

[EIP-3038](https://eips.ethereum.org/EIPS/eip-3085) es una propuesta de [mejora etérea](https://eips.ethereum.org/) que define un método RPC para agregar cadenas compatibles con Ethereum a aplicaciones de billeteras.

Desde marzo de 2021 Metamask ha implementado ese EIP como parte de su API de [redes personalizadas](https://consensys.net/blog/metamask/connect-users-to-layer-2-networks-with-the-metamask-custom-networks-api/) de Metamask

Veamos cómo funciona.

## Estructuras de datos

Para añadir la red Avalanche a Metamask, necesitamos preparar las estructuras de datos que contendrán todos los datos necesarios.

Datos principales de la red:

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

Datos de red de ensayo:

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

Para añadir la red a MetaMask, necesitamos llamar al método `wallet_addEthereumChain` expuesto por el proveedor web3.

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

Cuando se `inyecta` se inicia como `conector web3 react/inyectado` utilizado para interconectar con las API de MetaMask. El uso de otros marcos web populares es similar. Reemplazar `AVALANCHE_MAINNET_PARAMS` con `AVALANCHE_TESTNET_PARAMS` si desea agregar la red de prueba.

El patrón de uso típico sería exponer un botón llamando a ese método si obtienes errores de `conexión` de `Red errónea` o Error al intentar establecer una conexión a MetaMask.

## Experiencia del usuario

Cuando los usuarios llegan por primera vez al sitio web de su dapp, necesitan aprobar la conexión a MetaMask. Después de hacerlo, si no detecta una conexión de red web exitosa, puede presentarlos con un diálogo pidiéndoles que confirme el cambio a una nueva red:

![red incorrecta](../../../.gitbook/assets/add-avalanche-to-metamask-01-wrong-network.png)

Si presionan el botón, se muestra un diálogo de MetaMask pidiendo aprobación para añadir la nueva red:

![añadir una red](../../../.gitbook/assets/add-avalanche-to-metamask-02-add-network.png)

Si lo aprueban, su aplicación estará conectada a la red Avalanche. Muy fácil, no hay necesidad de ninguna entrada de datos, no hay posibilidad de entrada de datos incorrecta. Y eso es todo, los usuarios están listos para interacy con tu dapp!

## Conclusión

Los usuarios de Dapps a menudo no son muy sofisticados técnicamente y el abordaje debe ser lo más fácil y fácil posible. La adición manual de una nueva red a MetaMask es un obstáculo que un cierto porcentaje de sus usuarios potenciales no podrán despejar. Eliminar ese requisito es un paso sencillo que mejorará su experiencia y permitirá que más usuarios puedan utilizar realmente su dapp.

Si tiene alguna pregunta, problemas o ideas sobre cómo mejorar, o simplemente quiere unirse a nuestra comunidad de desarrolladores, puede ponerse en contacto con nosotros en nuestro servidor [de](https://chat.avalabs.org/) Discordia.

