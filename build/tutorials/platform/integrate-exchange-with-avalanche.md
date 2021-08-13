# Integre un intercambio con Avalanche C-Chain

## Descripción general

El objetivo de este documento es proporcionar una breve visión general de cómo integrarse con la cadena EVM-Compatible EVM. Para los equipos que ya soportan ETH, el apoyo a la cadena C es tan sencillo como girar un nodo Avalanche \(que tiene la [misma API](https://eth.wiki/json-rpc/API) que [C-Chain](https://geth.ethereum.org/docs/rpc/server) y la populación de ChainID \(43114\) de Avalanche al construir transacciones.

Además, Ava Labs mantiene una implementación de la [API Rosetta](https://www.rosetta-api.org/) para la cadena C llamada [avalanche-rosetta](https://github.com/ava-labs/avalanche-rosetta). Puede obtener más información sobre esta ruta de integración estandarizada en el sitio web de la API de Rosetta adjunto.

## Integración con EVM Endpoints

### Corriendo un nodo Avalanche

Si desea construir su fuente de formulario de nodo o incluirlo en una imagen de muelle, haga referencia al [repositorio de AvalancheGo GitHub](https://github.com/ava-labs/avalanchego). Para ponerse en marcha y poner en marcha rápidamente, puede utilizar el [script de instalación de](../nodes-and-staking/set-up-node-with-installer.md) nodo que automatiza la instalación y actualización del nodo avalanchego como servicio systemd en Linux, utilizando binarios preconstruidos.

### Configurar un nodo Avalanche

Todas las opciones de configuración y sus valores predeterminados se describen [aquí](../../references/command-line-interface.md).

Puede suministrar opciones de configuración en la línea de comandos, o utilizar un archivo de config, que puede ser más fácil de trabajar al proporcionar muchas opciones. Puede especificar la ubicación del archivo config con `—config-file=config.json`, donde `config.json` es un archivo JSON cuyas teclas y valores son nombres y valores de opción.

Las cadenas individuales, incluida la cadena C-Chain, tienen sus propias opciones de configuración que están separadas de las opciones de nivel de nodo. Estos también se pueden especificar en un archivo de config. Para más detalles, vea [aquí](../../references/command-line-interface.md#chain-configs).

El archivo de config de la cadena C debe estar en `$HOME/.avalanchego/configs/chains/C/config.json`. También puede decirle a AvalancheGo que busque en otro lugar el archivo de config C-Chain con opción `--chain-config-dir`. Un ejemplo de archivo de config C-Chain

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

{% insinuar style="warning" %} Si necesita la funcionalidad de [Nodo de Archivo](https://ethereum.org/en/developers/docs/nodes-and-clients/#archive-node) Ethereum, necesita desactivar la poda de C-Chain que ha sido activada por defecto desde AvalancheGo v1.4.10. Para desactivar la poda, incluya `"pruning-enabled": falso` en el archivo de config C-Chain {% endhint %}

### Interactuar con la cadena C

Interactuar con la cadena C es idéntico a la interacción con [go-ethereum](https://geth.ethereum.org/). Puede encontrar el material de referencia para C-Chain API [aquí](../../avalanchego-apis/contract-chain-c-chain-api.md).

Tenga en cuenta que `el` espacio de nombres personales se desactiva de forma predeterminada. Para activarlo, debe pasar el interruptor de línea de comandos apropiado a su nodo, como en el ejemplo de configuración anterior.

## Integración con Rosetta

[Rosetta](https://www.rosetta-api.org/) es una especificación de código abierto y conjunto de herramientas que facilitan la integración con diferentes redes de blockchain presentando el mismo conjunto de API para cada red. La API Rosetta está compuesta por 2 componentes principales, la [API de datos](https://www.rosetta-api.org/docs/data_api_introduction.html) y la API [de construcción](https://www.rosetta-api.org/docs/construction_api_introduction.html). Juntos, estas API permiten que cualquiera lea y escriba a blockchains en un formato estándar sobre un protocolo de comunicación estándar. Las especificaciones para estas API se pueden encontrar en el repositorio [de especificaciones](https://github.com/coinbase/rosetta-specifications) rosetta.

Puede encontrar la implementación del servidor Rosetta para Avalanche C-Chain [aquí](https://github.com/ava-labs/avalanche-rosetta), todo lo que necesita hacer es instalar y ejecutar el servidor con la configuración adecuada. Viene con un archivo Dockerfile que empaqueta tanto el servidor como el cliente Avalanche. Las instrucciones detalladas se pueden encontrar en el repositorio enlazado.

## Construcción de transacciones

Las transacciones de la cadena C de Avalanche son idénticas a las transacciones estándar de EVM con 2 excepciones:

* Deben ser firmados con ChainID de Avalanche \(43114\).
* El precio del gas se fija a 225 Gwei.

Para fines de desarrollo, Avalanche soporta toda la herramienta popular para Ethereum, por lo que los desarrolladores familiarizados con Ethereum y Solidez pueden sentirse como en casa. Tenemos tutoriales y repositorios para varios entornos de desarrollo populares:

* [MetaMask y Remix](../smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md)
* [Trufa](../smart-contracts/using-truffle-with-the-avalanche-c-chain.md)
* [Hardhat](https://github.com/ava-labs/avalanche-smart-contract-quickstart)

## Ingesting de datos en cadena

Puede utilizar cualquier forma estándar de ingerir datos en cadena que utilice para la red Ethereum.

### Determinación de la Finalidad

El consenso de Avalanche proporciona una finalización rápida e irreversible con 1-2 segundos. Para consultar el bloque ultimado más actualizado, consulta cualquier valor \(es decir, bloque, equilibrio, estado, etc.) con el parámetro `más` reciente. Si desea por encima del último bloque finalizado \(es decir, eth\_blockNumber devuelve 10 y desea 11\), se lanzará un error indicando que los datos no ultimados no pueden ser consultados \(a partir de avalanchego@v1.3.2\).

### \(Opcional\) Personalizado Golang SDK

Si planea extraer datos de la cadena C en sus propios sistemas utilizando golang, recomendamos usar nuestro [ethclient](https://github.com/ava-labs/coreth/tree/master/ethclient). El cliente estándar go-ethereum Ethereum no computa correctamente hash \(cuando se llama `block.Hash()`\) porque no tiene en cuenta el agregado `[ExtDataHash](https://github.com/ava-labs/coreth/blob/2c3cfac5f766ce5f32a2edddc43451bdb473b84f1/core/type/block.go#L98)` campo de encabezado en bloques de Avalanche C-Chain, que se utiliza mover AVAX entre cadenas \(X-Chain y P-Chain\). Puede leer más sobre nuestra abstracción de múltiples cadenas [aquí](../../../learn/platform-overview/) \(fuera de alcance para una integración normal de la cadena C).

Si planea leer las respuestas JSON directamente o utilizar web3.js \(no recompute hash recibido sobre el alambre\) para extraer datos de transacción en cadena/logs/recibos, ¡no debe tener ningún problema!

## Apoyo al apoyo

Si tiene algún problema o pregunta, contacte directamente con nuestros desarrolladores, o en nuestro servidor de [Discord](https://chat.avalabs.org/) público.

