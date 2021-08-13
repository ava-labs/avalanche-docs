# Lanzar tu aplicación Ethereum Dapp

## Descripción general

El propósito de este documento es ayudarle a lanzar su dapp existente en Avalanche. Contiene una serie de recursos diseñados para ayudarle a obtener los fundamentos de la plataforma Avalanche y cómo funciona, mostrar cómo conectarse a la red, cómo utilizar sus herramientas y entornos existentes para desarrollar e implementar en Avalanche, así como algunas trampas comunes que necesita considerar al ejecutar su dapp en Avalanche.

## Base de la plataforma

Avalanche es una [red de redes](../../../learn/platform-overview/). Significa que no es una sola cadena que ejecuta un único tipo de bloques uniformes. Contiene múltiples subnets, cada una de las cadenas más heterogéneas. Pero, para ejecutar una dapp Ethereum en una red rápida y con una finalización instantánea, no necesitamos preocuparnos por eso ahora mismo. Usando el eslabón de arriba puede averiguar más si lo desea, pero todo lo que necesita saber ahora mismo es que una de las cadenas que se ejecutan en la Red Primaria de Avalanche es la cadena C-Chain \(cadena de contrato\).

C-Chain ejecuta una horquilla de [go-ethereum](https://geth.ethereum.org/docs/rpc/server) llamada [coreth](https://github.com/ava-labs/coreth) que tiene las porciones de networking y consenso sustituidas por equivalentes Avalanche. Lo que queda es el Ethereum VM, que ejecuta contratos inteligentes de Solidity y gestiona estructuras de datos y bloques en la cadena. Como resultado, obtienes una cadena de bloques que puede ejecutar todos los contratos inteligentes de Solidez de Ethereum, pero con un ancho de banda de transacciones mucho mayor y una finalización instantánea que [el consenso revolucionario de Avalanche](../../../learn/platform-overview/avalanche-consensus.md) habilita.

Coreth se carga como un plugin en [AvalancheGo](https://github.com/ava-labs/avalancheg), la aplicación de nodo cliente utilizada para ejecutar la red Avalanche.

En lo que respecta a su dapp, se ejecutará lo mismo que en Ethereum, más rápido y barato. Averiguemos cómo.

## Access Avalanche C-Chain

C-Chain expone la [misma API](../../avalanchego-apis/contract-chain-c-chain-api.md) que go-ethereum, para que pueda utilizar todas las API familiares que están disponibles en Ethereum para la interacción con la plataforma.

Hay múltiples formas de trabajar con la cadena C.

### A través de MetaMask

Puede acceder a la cadena C a través de MetaMask, definiendo una red personalizada. Ve a MetaMask, ingresa, haz clic en el desplegable de red y selecciona 'Personalizado RPC'. Los datos de Avalanche son los siguientes.

#### **Configuración de Avalanche Mainnet:**

* **Nombre de la red**: Avalanche Mainnet C-Chain
* **Nuevo RPC URL**: [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
* **ChainID**: `43114`
* **Símbolo**: `AVAX`
* **Explorador** de [https://cchain.explorer.avax.network/](https://cchain.explorer.avax.network/)

#### **Configuración de FUJI Testnet:**

* **Nombre de la red**: Avalanche FUJI C-Chain
* **Nuevo URL de** RPC: [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
* **ChainID**: `43113`
* **Símbolo**: `AVAX`
* **Explorador** de [https://cchain.explorer.avax-test.network](https://cchain.explorer.avax-test.network/)

En la interfaz web de su aplicación, puede [agregar Avalanche programáticamente](../smart-contracts/add-avalanche-to-metamask-programmatically.md) para que sus usuarios no tengan que introducir los datos de red manualmente. Para ver el flujo de red personalizado en acción, echa un vistazo a [Pangolin DEX](https://app.pangolin.exchange/).

### Utilizando los Nodos de API públicas

En lugar de proxying operaciones de red a través de MetaMask, puede utilizar la API pública, que consiste en un número de nodos AvalancheGo detrás de un balancer de carga.

El endpoint de la API de cadena C es [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)[](https://api.avax-test.network/ext/bc/C/rpc) para el mainnet y C-Chain para el testnet.

Para obtener más información, consulte la [documentación](../../tools/public-api.md).

### Ejecutando su propio nodo

Si no quieres que tu dapp dependa de un servicio centralizado que no controles, puedes ejecutar tu propio nodo y acceder a la red de esa manera. El funcionamiento de su propio nodo también evita posibles problemas con la congestión de API pública y la limitación de la velocidad.

Para fines de desarrollo, [aquí](../nodes-and-staking/run-avalanche-node.md) hay un tutorial para descargar, construir e instalar AvalancheGo. Si vas a ejecutar un nodo de producción en una máquina Linux, [aquí](../nodes-and-staking/set-up-node-with-installer.md) hay un tutorial que muestra cómo usar el script para instalar rápidamente y fácilmente el nodo como servicio de `systemd`. Script también maneja la actualización de nodos. Si desea ejecutar un nodo en un contenedor de muelle, hay [scripts de construcción](https://github.com/ava-labs/avalanchego/tree/master/scripts) en el repo de AvalancheGo para varios configs Docker.

### Ejecutar una red de pruebas locales

Si necesita una red de pruebas privada para probar su dapp, [Avash](https://github.com/ava-labs/avash) es un cliente de shell para lanzar redes locales de Avalanche, similar a Ganache en Ethereum.

Avash utiliza Lua como lenguaje de guiones para orquestar redes locales. Puedes encontrar un tutorial para Avash [aquí](../../tools/avash.md).

## Elaboración y Despliegue de Contratos

Siendo un blockchain compatible con Ethereum, todas las herramientas y entornos habituales de desarrollador Ethereum pueden utilizarse para desarrollar e implementar dapps para la cadena C-Chain.

### Remix

[Aquí](../smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md) hay un tutorial para usar Remix para implementar contratos inteligentes en Avalanche. Se basa en MetaMask para acceder a la red Avalanche.

### Trufa

También puede utilizar Trufa para probar e implementar contratos inteligentes en Avalanche. Averigua cómo en [este](../smart-contracts/using-truffle-with-the-avalanche-c-chain.md) tutorial.

### Hardhat

Hardhat es el entorno de desarrollo y prueba más reciente para contratos inteligentes de Solidity y el que nuestros desarrolladores usan más. Debido a su excelente soporte de prueba, es la forma recomendada de desarrollar para Avalanche.

[Aquí](https://github.com/ava-labs/avalanche-smart-contract-quickstart) hay un repositorio de inicio rápido que nuestros desarrolladores usan para iniciar nuevos proyectos. Ya está configurado para Avalanche por lo que no se requiere ninguna configuración adicional.

## Avalanche Explorer

Una parte esencial del entorno de desarrollo de contratos inteligente es el explorador, que indexa y sirve datos de blockchain. [Mainnet](https://cchain.explorer.avax-test.network/) C-Chain Explorer está disponible en [https://cchain.explorer.avax.network/](https://cchain.explorer.avax.network/) y testnet explorer en C-Chain Además de la interfaz web, también expone la API estándar [Ethereum JSON RPC](https://eth.wiki/json-rpc/API).

## Grifo de Avalanche

Para fines de desarrollo, necesitará fichas de prueba. Avalanche tiene un [grifo](https://faucet.avax-test.network/) que gotea tokens de prueba a la dirección de su elección. Pega su dirección de cadena C allí.

Si lo necesita, también puede ejecutar un grifo localmente, pero construirlo desde el [repositorio](https://github.com/ava-labs/avalanche-faucet).

## Verificación de contratos

La verificación de contratos inteligente proporciona transparencia para los usuarios que interactúan con contratos inteligentes publicando el código fuente, permitiendo a todos demostrar que realmente hace lo que afirma hacer. Puede verificar sus contratos inteligentes utilizando el [explorador de la cadena C](https://cchain.explorer.avax.network/). El procedimiento es simple:

* navegar por su dirección de contrato publicada en el explorador
* en la pestaña `de código` seleccione `verificar y publicar`
* copiar y pegar el código fuente aplanado e introducir todos los parámetros de construcción exactamente como están en el contrato publicado
* haga clic `en verificar y publicar`

Si tiene éxito, la pestaña `de código` ahora tendrá una marca de verificación verde, y sus usuarios podrán verificar el contenido de su contrato. Esta es una señal positiva fuerte de que sus usuarios pueden confiar en sus contratos, y se recomienda encarecidamente para todos los contratos de producción.

## Control de la seguridad de los contratos

Debido a la naturaleza de las aplicaciones distribuidas, es muy difícil corregir errores una vez que la aplicación se despliega. Debido a eso, asegúrese de que su aplicación se ejecuta correctamente y de forma segura antes de la implementación es de gran importancia. Las empresas y servicios especializados realizan exámenes de seguridad de los contratos. Pueden ser muy caros, lo que podría estar fuera de alcance para desarrolladores individuales y startups. Pero, también hay servicios y programas automatizados que son gratuitos de usar.

La mayoría de los populares son:

* [Slither](https://github.com/crytic/slither), aquí hay un [tutorial](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/)
* [MythX](https://mythx.io/)
* [Mythril](https://github.com/ConsenSys/mythril)

Recomendamos muy bien utilizar al menos uno de ellos si no es posible revisar la seguridad de los contratos profesionales. Aquí se puede encontrar una mirada más completa sobre prácticas de desarrollo [seguras](https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md).

## Gotchas y cosas para cuidar

La cadena C-Chain de Avalanche Platform es compatible con EVM, pero no es idéntica. Hay algunas diferencias de las que necesita ser consciente de, de lo contrario, puede crear errores sutiles o inconsistencias en cómo se comportan tus dapps.

Aquí están las principales diferencias de las que debe ser consciente.

### Tiempo de medición

Es habitual en Ethereum utilizar el progreso de altura del bloque como proxy para el tiempo. No deberías hacer eso en Avalanche. Las cadenas de Avalanche son quiescentes, lo que significa que si no hay actividad, no hay bloques producidos. Lo contrario también es cierto, si hay una gran cantidad de actividad, los bloques se producen muy rápido. Por eso, no deberías medir el paso del tiempo por el número de bloques que se producen. Los resultados no serán exactos, y su contrato puede ser manipulado por terceros.

En lugar de la velocidad de bloque, debe medir el tiempo simplemente leyendo el atributo de timestamp de los bloques producidos. Las marcas de tiempo están garantizadas para aumentar monotónicamente y para estar dentro de los 30 segundos del tiempo real.

### Finalidad

En Ethereum, la cadena de bloques puede ser reorganizada y los bloques pueden ser huérfanos, por lo que no puede confiar en el hecho de que un bloque ha sido aceptado hasta que se encuentra a varias cuadras más lejos de la punta \(por lo general, se presume que los bloques 6 lugares de profundidad son seguros). Ese no es el caso de Avalanche. Los bloques se aceptan o rechazan dentro de un segundo o dos. Y una vez que el bloque ha sido aceptado, es final, y no puede ser sustituido, bajado o modificado. Por lo tanto, no se utiliza el concepto de 'número de confirmaciones' en Avalanche. Tan pronto como un bloque sea aceptado y disponible en el explorador, es final.

### Precio del gas

Gas en Avalanche se quema. Los validadores no guardan el gas por sí mismos \(se les recompensan por el staking\), por lo que la dinámica de las 'guerras de gas' donde las transacciones de mayor precio se incluyen primero es inexistente. Por lo tanto, nunca hay necesidad de poner un precio más alto de gas en sus transacciones. Sólo quemarás gas en vano.

### Configuración de Coreth

De forma predeterminada, coreth se configura de una manera óptima para los nodos de funcionamiento público utilizados como validadores. Para el desarrollo o las aplicaciones dapps, es posible que desee cambiar algunos valores por defecto a ajustes más apropiados para su uso. Esto se hace a través de las opciones de línea de comandos de nodo. Las opciones de línea de comandos para coreth se enumeran [aquí](../../references/command-line-interface.md#coreth-config), junto con sus valores predeterminados.

Puede suministrar opciones en la línea de comandos o utilizar el archivo de configuración, que puede ser más fácil de trabajar cuando se configuran muchas opciones personalizadas. Utilice `—config-file=config.json``` opción, y luego proporcione una configuración completa en el archivo config.json, por ejemplo:

```javascript
{
  "coreth-config": {
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
}
```

### Usar `eth_newFilter` y llamadas relacionadas con la API pública

Si está utilizando el método de la API [`eth_newFilter`](https://eth.wiki/json-rpc/API#eth_newfilter) en el servidor API público, puede que no se comporte como lo esperas, porque la API pública en realidad es varios nodos detrás de un balancer de carga. Si hace una llamada `eth_newFilter` las llamadas posteriores a [`eth_getFilterChanges`](https://eth.wiki/json-rpc/API#eth_getfilterchanges) pueden no terminar en el mismo nodo que la primera llamada, y terminará con resultados indefinidos.

Si necesita la funcionalidad de filtrado de registro, debe utilizar una conexión de websocket que asegura que su cliente siempre esté hablando con el mismo nodo detrás del balancer de carga. Alternativamente, puede usar [`eth_getLogs`](https://eth.wiki/json-rpc/API#eth_getlogs), o ejecutar su propio nodo y hacer llamadas de API a él.

## Apoyo al apoyo

Usando este tutorial debe ser capaz de ponerse al día rápidamente en Avalanche, implementar y probar sus aplicaciones. Si tiene preguntas, problemas o simplemente quiere charlar con nosotros, puede llegar a nosotros en nuestro servidor de [Discord](https://chat.avalabs.org/) público. Nos encantaría saber de ti y averiguar qué estás construyendo en Avalanche!

