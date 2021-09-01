# Integra un exchange con Avalanche C-Chain

## Resumen

El objetivo de este documento es proporcionar una breve visión general de cómo integrarse con la EVM-Compatible Avalanche compatibles con la EVM-Compatible Avalanche C-Chain. Para equipos que ya apoyan ET, el soporte de la C-Chain es tan directo como girar un nodo de Avalanche \(que tiene la [misma API](https://eth.wiki/json-rpc/API) que [C-Chain](https://geth.ethereum.org/docs/rpc/server) y poblar la ChainID de Avalanche \(43114\) al crear transacciones.

Además, Ava Labs mantiene una implementación de la [API](https://www.rosetta-api.org/) de Rosetta para la C-Chain llamada [avalanche-rosetta](https://github.com/ava-labs/avalanche-rosetta). Puedes aprender más sobre esta ruta de integración estandarizada en el sitio web de la API de Rosetta adjunto.

## Integración con los extremos de EVM

### Ejecutando un nodo de Avalanche

Si quieres crear tu fuente de formulario de nodo o incluirla en una imagen de docker, consulta el [repositorio](https://github.com/ava-labs/avalanchego) de AvalancheGo GitHub Para crear y ejecutar rápidamente puedes usar el [script de instalación de](../nodes-and-staking/set-up-node-with-installer.md) nodo que automatiza la instalación y actualización de nodo de avalanchego como un servicio systemd en Linux, usando binarios preconstruidos.

### Configurar un nodo de Avalanche

Todas las opciones de configuración y sus valores por defecto se describen [aquí](../../references/command-line-interface.md).

Puedes proporcionar opciones de configuración en la línea de comandos, o usar un archivo de config, que puede ser más fácil de trabajar al proporcionar muchas opciones. `—config-file=config.json`Puedes especificar la ubicación de archivo config con , donde `config.json`es un archivo JSON cuyas claves y valores son nombres y valores de opción.

Las cadenas individuales, incluyendo la C-Chain, tienen sus propias opciones de configuración que están separadas de las opciones de nivel de nodo. Estos también pueden ser especificados en un archivo de config. Para más detalles, mira [aquí](../../references/command-line-interface.md#chain-configs).

El archivo de config de C-Chain debería estar en `$HOME/.avalanchego/configs/chains/C/config.json`. También puedes decirle AvalancheGo para buscar en algún otro lugar para el archivo de configuración de C-Chain con la opción `--chain-config-dir`. Un archivo de configuración C-Chain

```javascript
{
  "snowman-api-enabled": false,
  "coreth-admin-api-enabled": false,
  "net-api-enabled": true,
  "eth-api-enabled": true,
  "personal-api-enabled": false,
  "tx-pool-api-enabled": true,
  "debug-api-enabled": true,
  "web3-api-enabled": true,
  "local-txs-enabled": true
}
```

{% hint style="warning" %}Si necesitas la funcionalidad de [nodo](https://ethereum.org/en/developers/docs/nodes-and-clients/#archive-node) de Archivo de Ethereum, necesitas desactivar la C-Chain que ha sido habilitada por defecto desde AvalancheGo v1.4.10. Para desactivar la poda, incluye `"pruning-enabled": false`en el archivo de configuración C-Chain.{% endhint %}

### Interactuando con la C-Chain

Interactuar con la C-Chain es idéntico a interactuar con [C-Chain](https://geth.ethereum.org/) Puedes encontrar el material de referencia para la API de C-Chain [aquí](../../avalanchego-apis/contract-chain-c-chain-api.md).

Tenga en cuenta que el espacio de `personal_`nombres se apaga de forma predeterminada. Para activarlo, necesitas pasar el interruptor de línea de comandos apropiado a tu nodo, como en el ejemplo de configuración anterior.

## Integración con Rosetta

[Rosetta](https://www.rosetta-api.org/) es una especificación de código abierto y un conjunto de herramientas que hace que la integración con diferentes redes de blockchain sea más fácil al presentar el mismo conjunto de API para todas las redes. La [API](https://www.rosetta-api.org/docs/data_api_introduction.html) de Rosetta está formada por 2 componentes básicos, la API de datos y la API de [construcción](https://www.rosetta-api.org/docs/construction_api_introduction.html). Juntos, estas API permiten que cualquiera lea y escriba a blockchains en un formato estándar sobre un protocolo de comunicación estándar. Las especificaciones para estas API se pueden encontrar en el repositorio [de especificaciones](https://github.com/coinbase/rosetta-specifications) rosetta.

Puedes encontrar la implementación de servidor de Rosetta para Avalanche C-Chain [aquí](https://github.com/ava-labs/avalanche-rosetta), todo lo que necesitas hacer es instalar y ejecutar el servidor con la configuración correcta. Viene con un archivo de Dockerfile empaqueta tanto el servidor como el cliente de Avalanche. Las instrucciones detalladas se pueden encontrar en el repositorio enlazado.

## Construcción de transacciones

Las transacciones de Avalanche C-Chain son idénticas a las transacciones de EVM estándar con 2 excepciones:

* Deben ser firmados con la ChainID de Avalanche \(43114\).
* El precio de gas se fija a 225 Gwei.

Para propósitos de desarrollo, Avalanche admite todas las herramientas populares para Ethereum, de modo que los desarrolladores familiarizados con Ethereum y Solidity pueden sentirse como en casa. Tenemos tutoriales y repositorios para varios entornos de desarrollo populares:

* [MetaMask](../smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md)
* [Truffle](../smart-contracts/using-truffle-with-the-avalanche-c-chain.md)
* [Hardhat](../smart-contracts/using-hardhat-with-the-avalanche-c-chain.md)

## Ingesting de datos en blockchain

Puedes usar cualquier forma estándar de ingerir datos en la blockchain que usas para la red Ethereum.

### Determinación de la finalización

El consenso de Avalanche proporciona finalización rápida e irreversible con 1-2 segundos. Para consultar el bloque ultimado más actualizado y consultar cualquier valor \(es decir, block, equilibrio, estado, etc\) con el `latest`parámetro. Si preguntas por encima del último bloque finalizado \(es decir, eth\_blockNumber devuelve 10 y preguntas 11\), se lanzará un error que indica que los datos no finalizados no pueden ser consultados \(como de avalanchego@v1.3.2\).

### \(Opcional\)

Si piensas extraer datos de la C-Chain en tus propios sistemas usando golang, te recomendamos usar nuestro [ethclient](https://github.com/ava-labs/coreth/tree/master/ethclient) personalizado. El cliente estándar de go-Ethereum no computa hash correctamente \(cuando llamas `block.Hash()`\) porque no toma en cuenta el campo de `[ExtDataHash](https://github.com/ava-labs/coreth/blob/2c3cfac5f766ce5f32a2eddc43451bdb473b84f1/core/types/block.go#L98)`cabecera añadido en los bloques de Avalanche C-Chain que se utiliza move AVAX entre las blocks \(X-Chain y P-Chain\). Puedes leer más sobre nuestra abstracción de varias blockchains [aquí](../../../learn/platform-overview/) \(sin ámbito de aplicación para una integración normal de C-Chain\).

Si piensas leer las respuestas de JSON directamente o usar web3.js \(no recompute hash recibido por el alambre\) para extraer datos de transacción en la cadena/registros o recibos, no deberías tener problemas.

## Soporte

Si tienes algún problema o preguntas, contacta directamente a nuestros desarrolladores, o en nuestro servidor de [Discord](https://chat.avalabs.org/) público.

