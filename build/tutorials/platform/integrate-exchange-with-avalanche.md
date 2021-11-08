# Integrar un intercambio con la C-Chain de Avalanche

## Resumen

El objetivo de este documento es proporcionar un breve resumen acerca de cómo integrarse a la C-Chain de Avalanche que es compatible con la máquina virtual de Ethereum (EVM). Para los equipos que ya apoyan ETH, el soporte de la C-Chain es tan sencillo como girar un nodo de Avalanche (que tiene la [misma API](https://eth.wiki/json-rpc/API) que [go-Ethereum](https://geth.ethereum.org/docs/rpc/server)) e ingresar los datos de la ChainID de Avalanche (43114) al construir transacciones.

Además, Ava Labs mantiene una implementación de la [API de Rosetta](https://www.rosetta-api.org/) para la C-Chain llamada [avalanche-rosetta](https://github.com/ava-labs/avalanche-rosetta). Puedes aprender más acerca de esta ruta de integración homologada en el sitio web adjunto de Rosetta API.

## Integración con terminales de la EVM

### Ejecutar un nodo de Avalanche

Si quieres construir tu nodo desde la fuente o incluirlo en una imagen de docker, consulta el [repositorio de AvalancheGo de GitHub](https://github.com/ava-labs/avalanchego). Para alistarlo y ejecutarlo rápidamente, puedes usar el [script de instalación del nodo](../nodes-and-staking/set-up-node-with-installer.md), que automatiza la instalación y actualización del nodo de AvalancheGo como un servicio de systemd de Linux, con binarios preestablecidos.

### Configuración de un nodo de Avalanche

[Aquí](../../references/command-line-interface.md) se describen todas las opciones de configuración y sus valores predeterminados.

Puedes suministrar opciones de configuración en la línea de comandos o usar un archivo de config, que puede ser más simple, ya que ofrece muchas opciones. Puedes especificar la ubicación del archivo de config con `—config-file=config.json`, donde `config.json` es un archivo JSON cuyas claves y valores son los nombres y los valores de las opciones.

Las cadenas individuales, incluyendo la C-Chain, tienen sus propias opciones de configuración, las cuales están separadas de las opciones de los nodos. Estas también se pueden especificar en un archivo de config. Puedes ver más detalles [aquí](../../references/command-line-interface.md#chain-configs).

El archivo de "config" de la C-Chain debería estar en `$HOME/.avalanchego/configs/chains/C/config.json`. También puedes decirle AvalancheGo que busque el archivo config de la C-Chain en otros lugares mediante la opción `--chain-config-dir`. Un ejemplo de un archivo de config para la C-Chain:

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

{% hint style="warning" %}Si necesitas la funcionalidad del [nodo de archivo](https://ethereum.org/en/developers/docs/nodes-and-clients/#archive-node) de Ethereum, debes desactivar la poda de la C-Chain, la cual está habilitada por defecto desde AvalancheGo v1.4.10. Para desactivar la poda, incluye `"pruning-enabled": false` en el archivo de configuración de la C-Chain.{% endhint %}

### Interacción con la C-Chain

La interacción con la C-Chain es la misma que con [go-Ethereum](https://geth.ethereum.org/). Puedes encontrar el material de referencia para la API de la C-Chain [aquí](../../avalanchego-apis/contract-chain-c-chain-api.md).

Ten en cuenta que `personal_` "namespace" está desactivado de forma predeterminada. Para activarlo, necesitas la línea de comandos apropiada para cambiarlo a tu nodo, tal como se muestra en el anterior ejemplo de config.

## Integración con Rosetta

[Rosetta](https://www.rosetta-api.org/) es una especificación de código abierto y un conjunto de herramientas que facilita la integración con diferentes redes de blockchain al presentar el mismo conjunto de API para cada red. La API de Rosetta está compuesta por dos componentes nucleares, la [API de datos](https://www.rosetta-api.org/docs/data_api_introduction.html) y la [API de construcción](https://www.rosetta-api.org/docs/construction_api_introduction.html). Juntas, estas API permiten que cualquiera pueda leer y escribir a las blockchains en un formato estándar sobre un protocolo de comunicación estándar. Las especificaciones para estas API se encuentran en el repositorio [rosetta-specifications](https://github.com/coinbase/rosetta-specifications).

Puedes encontrar la implementación del servidor Rosetta para la C-Chain de Avalanche [aquí](https://github.com/ava-labs/avalanche-rosetta). Todo lo que necesitas hacer es instalar y ejecutar el servidor con la configuración correcta. Viene con un archivo de docker que contiene el servidor y el cliente de Avalanche. Puedes encontrar instrucciones detalladas en el repositorio enlazado.

## Construcción de transacciones

Las transacciones de la C-Chain de Avalanche son idénticas a las de la EVM estándar, con dos excepciones:

* Deben estar firmadas con la ChainID de Avalanche (43114).
* La comisión de gas dinámica detallada se puede encontrar [aquí](../../../learn/platform-overview/transaction-fees.md#c-chain-fees).

Para propósitos de desarrollo, Avalanche es compatible con todas las herramientas populares para Ethereum, por lo que los desarrolladores que están familiarizados con Ethereum y Solidity se sentirán como en casa. Tenemos tutoriales y repositorios para varios entornos de desarrollo populares:

* [MetaMask y Remix](../smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md)
* [Truffle](../smart-contracts/using-truffle-with-the-avalanche-c-chain.md)
* [Hardhat](../smart-contracts/using-hardhat-with-the-avalanche-c-chain.md)

## Ingestión de datos en la cadena

Puedes usar cualquier forma estándar de ingerir datos en la cadena que usas para la red de Ethereum.

### Determinación de la finalización

El consenso de Avalanche proporciona una finalización rápida e irreversible en uno a dos segundos. Para consultar el bloque finalizado más actual, consulta cualquier valor (es decir, el bloque, el saldo, el estado, etc.) con el parámetro `latest`. Si consultas sobre el último bloque finalizado (es decir, el "eth_blockNumber" devuelve 10 y consultas por 11), se dará un error que indica que no se pueden consultar datos incompletos (como el de avalanchego@v1.3.2).

### Golang SDK personalizado (opcional)

Si planeas extraer datos de la C-Chain en tus propios sistemas con Golang, te recomendamos usar nuestro [ethclient](https://github.com/ava-labs/coreth/tree/master/ethclient). El cliente estándar de go-Ethereum no computa hashes de bloques correctamente (cuando llamas a `block.Hash()`) porque no toma en cuenta el campo de encabezado `[ExtDataHash](https://github.com/ava-labs/coreth/blob/2c3cfac5f766ce5f32a2eddc43451bdb473b84f1/core/types/block.go#L98)` agregado a los bloques de la C-Chain de Avalanche, que se usa para mover AVAX entre las cadenas (X-Chain y P-Chain). Puedes leer más acerca de nuestra abstracción multicadenas [aquí](../../../learn/platform-overview/) (fuera del alcance de una integración normal de C-Chain).

Si planeas leer respuestas JSON directamente o usar web3.js (que no computa de nuevo el hash que se recibió por el cable) para extraer datos, registros o recibos de la transacción en la cadena, ¡no deberías tener ningún problema!

## Soporte

Si tienes problemas o preguntas, contacta directamente a nuestros desarrolladores o en nuestro servidor público en [Discord](https://chat.avalabs.org/).

