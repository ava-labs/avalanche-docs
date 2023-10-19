---
tags: [Construir, Dapps]
description: El objetivo de este documento es proporcionar una breve descripción de cómo integrarse con la C-Chain Avalanche compatible con EVM.
sidebar_label: Integración de intercambio
pagination_label: Integración de intercambio en C-Chain
sidebar_position: 3
---

# Integración de intercambio en C-Chain

## Resumen

El objetivo de este documento es proporcionar una breve descripción de cómo integrarse con la C-Chain Avalanche compatible con EVM. Para los equipos que ya admiten ETH, admitir la C-Chain es tan sencillo como poner en marcha un nodo Avalanche (que tiene la [misma API](https://eth.wiki/json-rpc/API) que [`go-ethereum`](https://geth.ethereum.org/docs/rpc/server)) y población de la ChainID de Avalanche (43114) al construir transacciones.

Además, Ava Labs mantiene una implementación de la [API de Rosetta](https://www.rosetta-api.org/) para la C-Chain llamada [avalanche-rosetta](https://github.com/ava-labs/avalanche-rosetta). Puede obtener más información sobre esta ruta de integración estandarizada en el sitio web adjunto de la API de Rosetta.

## Integración utilizando puntos finales EVM

### Ejecutar un nodo Avalanche

Si desea construir su nodo desde el origen o incluirlo en una imagen de Docker, consulte el [repositorio de GitHub de AvalancheGo](https://github.com/ava-labs/avalanchego). Para ponerse en marcha rápidamente, puede utilizar el [script de instalación del nodo](/nodes/run/with-installer.md) que automatiza la instalación y actualización del nodo AvalancheGo como un servicio `systemd` en Linux, utilizando binarios precompilados.

### Configuración de un nodo Avalanche

Todas las opciones de configuración y sus valores predeterminados se describen [aquí](/nodes/configure/avalanchego-config-flags.md).

Puede proporcionar opciones de configuración en la línea de comandos o utilizar un archivo de configuración, que puede ser más fácil de usar cuando se proporcionan muchas opciones. Puede especificar la ubicación del archivo de configuración con `--config-file=config.json`, donde `config.json` es un archivo JSON cuyas claves y valores son nombres de opciones y valores.

Las cadenas individuales, incluida la C-Chain, tienen sus propias opciones de configuración que son independientes de las opciones a nivel de nodo. Estos también se pueden especificar en un archivo de configuración. Para más detalles, consulte [aquí](/nodes/configure/chain-config-flags.md#c-chain-configs).

El archivo de configuración de la C-Chain debería estar en `$HOME/.avalanchego/configs/chains/C/config.json`. También puede indicarle a AvalancheGo que busque en otro lugar el archivo de configuración de la C-Chain con la opción `--chain-config-dir`. Un ejemplo de archivo de configuración de la C-Chain:

:::caution

Si necesita la funcionalidad de un [nodo de archivo](https://ethereum.org/en/developers/docs/nodes-and-clients/#archive-node) de Ethereum, debe desactivar la poda de la C-Chain, que ha estado habilitada de forma predeterminada desde AvalancheGo v1.4.10. Para desactivar la poda, incluya `"pruning-enabled": false` en el archivo de configuración de la C-Chain como se muestra a continuación.

:::

```json
{
  "snowman-api-enabled": false,
  "coreth-admin-api-enabled": false,
  "local-txs-enabled": true,
  "pruning-enabled": false,
  "eth-apis": [
    "internal-eth",
    "internal-blockchain",
    "internal-transaction",
    "internal-tx-pool",
    "internal-account",
    "internal-personal",
    "debug-tracer",
    "web3",
    "eth",
    "eth-filter",
    "admin",
    "net"
  ]
}
```

### Interactuando con la C-Chain

La interacción con la C-Chain es idéntica a la interacción con [`go-ethereum`](https://geth.ethereum.org/). Puede encontrar el material de referencia para la API de la C-Chain [aquí](/reference/avalanchego/c-chain/api.md).

Tenga en cuenta que el espacio de nombres `personal_` está desactivado de forma predeterminada. Para activarlo, debe pasar el interruptor de línea de comandos adecuado a su nodo, como en el ejemplo de configuración anterior.

## Integración utilizando Rosetta

[Rosetta](https://www.rosetta-api.org/) es una especificación de código abierto y un conjunto de herramientas que facilita la integración con diferentes redes blockchain al presentar el mismo conjunto de API para cada red. La API de Rosetta se compone de 2 componentes principales, la [API de Datos](https://www.rosetta-api.org/docs/data_api_introduction.html) y la [API de Construcción](https://www.rosetta-api.org/docs/construction_api_introduction.html). Juntas, estas API permiten que cualquiera pueda leer y escribir en blockchains en un formato estándar sobre un protocolo de comunicación estándar. Las especificaciones de estas API se pueden encontrar en el repositorio de [rosetta-specifications](https://github.com/coinbase/rosetta-specifications).

Puede encontrar la implementación del servidor Rosetta para Avalanche C-Chain [aquí](https://github.com/ava-labs/avalanche-rosetta), todo lo que necesita hacer es instalar y ejecutar el servidor con la configuración adecuada. Viene con un `Dockerfile` que empaqueta tanto el servidor como el cliente Avalanche. Las instrucciones detalladas se pueden encontrar en el repositorio vinculado.

## Construcción de transacciones

Las transacciones de Avalanche C-Chain son idénticas a las transacciones EVM estándar con 2 excepciones:

- Deben estar firmadas con la ChainID de Avalanche (43114).
- La tarifa de gas dinámica detallada se puede encontrar [aquí](/reference/standards/guides/txn-fees#c-chain-fees).

Para fines de desarrollo, Avalanche admite todas las herramientas populares para Ethereum, por lo que los desarrolladores familiarizados con Ethereum y Solidity pueden sentirse como en casa. Tenemos tutoriales y repositorios para varios entornos de desarrollo populares:

- [Core y Remix](/build/dapp/smart-contracts/remix-deploy.md)
- [Truffle](/build/dapp/smart-contracts/toolchains/truffle.md)
- [Hardhat](/build/dapp/smart-contracts/toolchains/hardhat.md)

## Ingesta de datos en cadena

Puede utilizar cualquier forma estándar de ingerir datos en cadena que use para la red Ethereum.

### Determinación de la finalidad

El consenso Avalanche proporciona finalidad rápida e irreversible en 1-2 segundos. Para consultar el bloque finalizado más actualizado, consulte cualquier valor (es decir, bloque, saldo, estado, etc.) con el parámetro `latest`. Si consulta por encima del último bloque finalizado (es decir, eth_blockNumber devuelve 10 y consulta 11), se lanzará un error que indica que no se pueden consultar datos no finalizados (a partir de `avalanchego@v1.3.2`).

### (Opcional) SDK personalizado de Golang

Si planea extraer datos de la C-Chain a sus propios sistemas utilizando Golang, recomendamos usar nuestro cliente `ethclient` personalizado [`ethclient`](https://github.com/ava-labs/coreth/tree/master/ethclient). El cliente Ethereum estándar `go-ethereum` no calcula correctamente los hashes de bloque (cuando llama a `block.Hash()`) porque no tiene en cuenta el campo de encabezado agregado [ExtDataHash](https://github.com/ava-labs/coreth/blob/2c3cfac5f766ce5f32a2eddc43451bdb473b84f1/core/types/block.go#L98) en bloques Avalanche C-Chain, que se utiliza para mover AVAX entre cadenas (X-Chain y P-Chain). Puede leer más sobre nuestra abstracción de múltiples cadenas [aquí](/learn/avalanche/avalanche-platform.md) (fuera del alcance de una integración normal de C-Chain).

¡Si planea leer respuestas JSON directamente o usar web3.js (que no vuelve a calcular el hash recibido por cable) para extraer datos de transacciones/logs/recibos en cadena, no debería tener ningún problema!

## Soporte

Si tiene algún problema o pregunta, comuníquese directamente con nuestros desarrolladores o en nuestro servidor público de [Discord](https://chat.avalabs.org/).
