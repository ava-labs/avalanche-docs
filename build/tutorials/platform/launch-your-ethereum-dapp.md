# Inicia tu Dapp de Ethereum

## Resumen

El objetivo de este documento es ayudarte a lanzar tu DApp existente en Avalanche. Contiene una serie de recursos diseñados para ayudarte a entender los fundamentos de la plataforma de Avalanche y cómo funciona. También te muestra cómo conectarte a la red y cómo puedes usar tus herramientas y entornos existentes para desarrollar y desplegar en Avalanche, así como algunos de los obstáculos comunes que deberás considerar a la hora de ejecutar tu DApp en Avalanche.

## Fundamentos de la plataforma

Avalanche es una [red de redes](../../../learn/platform-overview/). Esto significa que no es una sola cadena que ejecuta un solo tipo uniforme de bloques. Contiene varias subredes, cada una de las cuales ejecuta una o más cadenas heterogéneas. Sin embargo, para ejecutar una DApp de Ethereum en una red rápida de comisiones bajas y con finalización instantánea, pero por ahora no es necesario preocuparnos por eso. En el enlace de arriba puedes encontrar más información, pero por ahora, todo lo que necesitas saber es que una de las cadenas que se ejecutan en la red primaria de Avalanche es la C-Chain (cadena de contratos).

La C-Chain ejecuta una rama de [go-Ethereum](https://geth.ethereum.org/docs/rpc/server) llamada [Coreth](https://github.com/ava-labs/coreth), la cual ha reemplazado las porciones de redes y consenso con los equivalentes de Avalanche. Lo que queda es la máquina virtual (VM) de Ethereum, que ejecuta contratos inteligentes de Solidity y administra estructuras de datos y bloques en la cadena. Como resultado, obtienes una blockchain que puede ejecutar todos los contratos inteligentes de Solidity desde Ethereum, pero con un ancho de banda de transacción mucho mayor y la finalización instantánea que el [consenso revolucionario de Avalanche](../../../learn/platform-overview/avalanche-consensus.md) permite.

Coreth se carga como un plugin en [AvalancheGo](https://github.com/ava-labs/avalanchego), la aplicación del nodo del cliente que se utiliza para ejecutar la red de Avalanche.

En lo que respecta a tu DApp, esta ejecutará lo mismo que en Ethereum, pero de forma más rápida y económica. Averigüemos cómo hacerlo.

## Acceso a la C-Chain de Avalanche

La C-Chain expone la [misma API](../../avalanchego-apis/contract-chain-c-chain-api.md) que la de go-Ethereum, así que puedes usar todas las API familiares que están disponibles en Ethereum para interactuar con la plataforma.

Hay varias maneras de trabajar con la C-Chain.

### Con MetaMask

Puedes acceder a la C-Chain a través de MetaMask al definir una red personalizada. Ve a MetaMask, inicia sesión, haz clic en el menú desplegable de la red y selecciona "Custom RPC". A continuación, enumeramos los datos para Avalanche.

#### **Configuración de la red principal de Avalanche:**

* **Nombre de la red**: Avalanche Mainnet C-Chain
* **Nuevo URL del RPC**: [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
* **Identificación de la cadena**: `43114`
* **Símbolo**:`AVAX`
* **Explorador**: [https://cchain.explorer.avax.network/](https://cchain.explorer.avax.network/)

#### **Configuración de la Red de Pruebas de FUJI:**

* **Nombre de la red**: Avalanche FUJI C-Chain
* **Nuevo URL de RPC**: [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
* **Identificación de la cadena**: `43113`
* **Símbolo**:`AVAX`
* **Explorador**: [https://cchain.explorer.avax-test.network](https://cchain.explorer.avax-test.network/)

En la interfaz web de tu aplicación, puedes [agregar Avalanche programáticamente](../smart-contracts/add-avalanche-to-metamask-programmatically.md) para que tus usuarios no tengan que ingresar los datos de la red manualmente. Para ver la añadidura del flujo de la red personalizada en acción, consulta [Pangolin DEX](https://app.pangolin.exchange/).

### Con nodos de API públicas

En lugar de hacer proxy de las operaciones de red a través de MetaMask, puedes usar la API pública, que consiste en una serie de nodos de AvalancheGo detrás de un proveedor de carga.

La terminal de la API de la C-Chain es [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc) para la Mainnet y [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc) para la red de pruebas.

Para obtener más información, consulta la documentación:

{% page-ref page="../../tools/public-api.md" %}

### Ejecución de tu propio nodo

Si no quieres que tu DApp dependa de un servicio centralizado fuera de tu control, puedes acceder a la red ejecutando tu propio nodo. Ejecutar tu propio nodo también evita posibles problemas de limitaciones de las comisiones y congestión de la API pública.

Para propósitos de desarrollo, [aquí](../nodes-and-staking/run-avalanche-node.md) puedes encontrar un tutorial de cómo descargar, construir e instalar AvalancheGo. Si vas a ejecutar un nodo de producción en una máquina de Linux, [aquí](../nodes-and-staking/set-up-node-with-installer.md) tienes un tutorial que muestra cómo usar el script de instalación para instalar de manera fácil y rápida el nodo como un `systemd`servicio. El script también admite mejoras de los nodos. Si quieres ejecutar un nodo en un contenedor de docker, en el repositorio de AvalancheGo hay [scripts de construcción](https://github.com/ava-labs/avalanchego/tree/master/scripts) para varias configuraciones de docker.

### Ejecución de una red local de pruebas

Si necesitas una red de pruebas privada para probar tu DApp, [Avash](https://github.com/ava-labs/avash) es un Secure Shell Client (SSC) para iniciar redes locales de Avalanche, similar a Ganache en Ethereum.

Avash utiliza Lua como un lenguaje de scripts para disponer de las redes locales.

Para obtener más información, consulta la documentación:

{% page-ref page="../../tools/avash.md" %}

## Desarrollo y despliegue de contratos

Ya que es una blockchain compatible con Ethereum, todas las herramientas y entornos habituales del desarrollo de Ethereum se pueden usar para desarrollar y desplegar DApps para la C-Chain de Avalanche.

### Remix

Hay un tutorial de cómo usar Remix para desplegar contratos inteligentes en Avalanche. Este depende de MetaMask para acceder a la red de Avalanche.

{% page-ref page="../smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md" %}

### Truffle

También puedes usar Truffle para probar y desplegar contratos inteligentes en Avalanche. Descubre cómo hacer eso en este tutorial:

{% page-ref page="../smart-contracts/using-truffle-with-the-avalanche-c-chain.md" %}

### Hardhat

Hardhat es el más reciente entorno de desarrollo y pruebas para los contratos inteligentes de Solidity, y es el que más usan nuestros desarrolladores. Su excelente soporte de pruebas lo ha convertido en la forma más recomendada para desarrollar para Avalanche.

Para obtener más información, consulta:

{% page-ref page="../smart-contracts/using-hardhat-with-the-avalanche-c-chain.md" %}

## Explorador de Avalanche

Una parte esencial del entorno de desarrollo de contratos inteligentes es el explorador, que indexa y provee datos de blockchain. El explorador de C-Chain está disponible en [https://cchain.explorer.avax.network/](https://cchain.explorer.avax.network/) y el de la red de pruebas en [https://cchain.explorer.avax-test.network](https://cchain.explorer.avax-test.network/). Además de la interfaz web, también expone la [API JSON RPC estándar de Ethereum](https://eth.wiki/json-rpc/API).

## Faucet de Avalanche

Para propósitos de desarrollo, necesitarás tokens de prueba. Avalanche tiene un [Faucet](https://faucet.avax-test.network/) que gotea tokens de prueba hacia la dirección de tu elección. Pega tu dirección de C-Chain allí.

De ser necesario, también puedes ejecutar un Faucet localmente, pero construyéndolo desde el [repositorio](https://github.com/ava-labs/avalanche-faucet).

## Verificación del contrato

La verificación del contrato inteligente proporciona transparencia para los usuarios que interactúan con contratos inteligentes al publicar el código fuente. Esto permite que todos verifiquen que realmente hace lo que dice poder hacer. Puedes verificar tus contratos inteligentes con el [explorador de la C-Chain](https://cchain.explorer.avax.network/). El procedimiento es simple:

* Navega a tu dirección de contrato publicada en el explorador.
* En la pestaña `code` , selecciona `verify & publish`.
* Copia y pega el código de fuente aplanado e ingresa todos los parámetros de construcción tal y como se encuentran en el contrato publicado.
* Haz clic en `verify & publish`.

Si lo hiciste bien, la pestaña `code` ahora tendrá una marca de verificación verde y tus usuarios podrán verificar el contenido de tu contrato. Esta es una señal positiva de que tus usuarios pueden confiar en tus contratos, fuertemente recomiendado para todos los contratos de producción.

 [Aquí](../smart-contracts/verify-smart-contracts-with-sourcify-truffle.md) encuentras un tutorial detallado con Sourcify y Truffle.

## Chequeos de la seguridad del contrato

Debido a la naturaleza de las aplicaciones distribuidas, es muy difícil arreglar errores después del despliegue de la aplicación. Por esa razón, es muy importante que te asegures de que tu aplicación se esté ejecutando correctamente y de forma segura antes de su despliegue. Las revisiones de seguridad de los contratos están al cargo de empresas y servicios especializados. Estos pueden ser muy caros y, por ende, estar fuera del alcance de desarrolladores individuales y empresas emergentes. Sin embargo, también hay servicios y programas automatizados que son de libre acceso.

Los más populares son:

* [Slither](https://github.com/crytic/slither), aquí hay un [tutorial](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/).
* [MythX](https://mythx.io/)
* [Mythril](https://github.com/ConsenSys/mythril)

Si no te es posible trabajar con revisores profesionales de seguridad de contratos, te recomendamos fuertemente usar al menos uno de los mencionados. Puedes encontrar información más detallada acerca de las prácticas de desarrollo seguras [aquí](https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md).

## Gotchas y cosas de las que debes estar consciente

La C-Chain de la plataforma de Avalanche es compatible con la máquina virtual de Ethereum (EVM), pero no es idéntica a ella. Debes estar al tanto de algunas de sus diferencias; de otro modo, puede que llegues a crear errores o inconsistencias sutiles en el comportamiento de tus DApps.

Estas son las principales diferencias que debes conocer:

### Tiempo de medición

En Ethereum, es habitual medir el tiempo usando el progreso de la altura de los bloques. No deberías hacer eso en Avalanche. Las cadenas de Avalanche son pasivas: si no hay actividad, no producen bloques. Lo opuesto también es cierto: si hay una gran cantidad de actividad, producen bloques rápidamente. Por eso, no deberías medir el paso del tiempo según la cantidad de bloques producidos. Los resultados no serían exactos y terceros podrían manipular tu contrato.

En lugar de usar la tasa de los bloques, para medir el tiempo simplemente deberías leer el atributo de las marcas de tiempo de los bloques producidos. Se garantiza que las marcas de tiempo incrementarán monótonamente y que estarán a menos de 30 segundos del tiempo real.

### Finalización

En Ethereum, la blockchain se puede reorganizar y crear bloques huérfanos, por lo que no puedes depender de la aceptación de un bloque hasta que tenga varios bloques más lejos de su punta (se asume que los bloques que se encuentran a seis posiciones de profundidad son seguros). Ese no es el caso en Avalanche. Los bloques se aceptan o se rechazan dentro de un segundo o dos. La aceptación de un bloque es final; no se puede reemplazar, abandonar o modificar. Por lo tanto, el concepto de "cantidad de confirmaciones" no se usa en Avalanche. La aceptación y puesta en disposición de un bloque en el explorador es final.

### Precio del gas

En Avalanche, el gas se quema. Los validadores no se dejan gas para ellos mismos (se les recompensa por hacer participaciones), de modo que las dinámicas de las "guerras de gas", que incluyen transacciones a mayor precio, no existen. Por ende, nunca hay necesidad de elevar el precio de gas de tus transacciones. Solo estarías quemando gas en vano.

### Configuración de la C-Chain

Las cadenas individuales, incluyendo la C-Chain, tienen sus propias opciones de configuración que se pueden dar en un archivo de configuración. Es posible que quieras usar una configuración de C-Chain distinta a la predeterminada para desarrollar DApps. Puedes obtener más detalles acerca de las configuraciones de cadenas [aquí.](../../references/command-line-interface.md#chain-configs)

El archivo de "config" de la C-Chain debería estar en `$HOME/.avalanchego/configs/chains/C/config.json`. También puedes decirle a AvalancheGo que busque el archivo config de la C-Chain en otros lugares mediante la opción `--chain-config-dir`. Puedes buscar opciones de configuración completa para la C-Chain [aquí](../../references/command-line-interface.md#coreth-config). Un ejemplo de un archivo de config para la C-Chain:

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

### Con `eth_newFilter` y llamadas relacionadas con la API pública

Si estás usando el método de API [`eth_newFilter`](https://eth.wiki/json-rpc/API#eth_newfilter) en el servidor de la API pública, es posible que no se comporte como lo esperabas, ya que la API pública en realidad consiste en varios nodos detrás de un balanceador de carga. Si haces una llamada `eth_newFilter` , puede que las llamadas posteriores a [`eth_getFilterChanges`](https://eth.wiki/json-rpc/API#eth_getfilterchanges) no terminen en el mismo nodo que la primera, y que obtengas resultados indefinidos.

Si necesitas la funcionalidad de filtrado de registros, debes usar una conexión de websocket, la cual garantiza que tu cliente siempre estará hablando con el mismo nodo detrás del balanceador de carga. Como alternativa, puedes usar [`eth_getLogs`](https://eth.wiki/json-rpc/API#eth_getlogs) o ejecutar tu propio nodo y hacer llamadas de API al mismo.

## Soporte

Este tutorial deberías permitirte ponerte al día con Avalanche, desplegar y probar tus DApps rápidamente. Si tienes preguntas o problemas, o si simplemente quieres chatear con nosotros, puedes contactarnos en nuestro servidor de [Discord](https://chat.avalabs.org/). ¡Nos encantaría saber de ti y enterarnos de lo que estás construyendo en Avalanche!

