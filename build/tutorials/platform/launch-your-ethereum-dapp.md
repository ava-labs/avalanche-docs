# Inicia tu Dapp de Ethereum

## Resumen

El propósito de este documento es ayudarte a lanzar tu dapp existente en Avalanche. Contiene una serie de recursos diseñados para ayudarte a obtener los fundamentos de la plataforma de Avalanche y cómo funciona, mostrar cómo conectarse a la red, cómo usar tus herramientas y entornos existentes al desarrollar e implementar en Avalanche, así como algunas de las dificultades comunes que necesitas considerar al ejecutar tu dapp en Avalanche.

## Bases de la plataforma

Avalanche es una [red de redes](../../../learn/platform-overview/). Significa que no es una sola cadena que ejecuta un solo tipo uniforme de bloques. Contiene varias subredes que cada una ejecutando una de las chains. más heterogéneas. Pero, para ejecutar una dapp de Ethereum en una red rápida y rápida de baja tarifa con finalización instantánea, no necesitamos preocuparnos con eso ahora mismo. Usando el enlace de arriba puedes saber más si quieres, pero todo lo que necesitas saber ahora mismo es que una de las blockchains ejecutadas en la red primaria de Avalanche es la C-Chain \(blockchain contract\).

C-Chain ejecuta un fork de [go-ethereum](https://geth.ethereum.org/docs/rpc/server) llamado [coreth](https://github.com/ava-labs/coreth) que tiene la red y las porciones de consenso reemplazadas por equivalentes de Avalanche. Lo que queda es el VM de Ethereum que ejecuta contratos inteligentes de Solidity y administra estructuras de datos y bloques en la cadena. Como resultado, obtienes una blockchain que puede ejecutar todos los contratos inteligentes de Solidity desde Ethereum, pero con un ancho de banda de transacción y una finalización instantánea que [el consenso revolucionario de](../../../learn/platform-overview/avalanche-consensus.md) Avalanche permite.

Coreth se carga como un plugin en [AvalancheGo](https://github.com/ava-labs/avalancheg), la aplicación de nodo de cliente utilizada para ejecutar la red de Avalanche.

En lo que respecta a tu dapp, ejecutará lo mismo que en Ethereum, solo más rápido y barato. Averigüemos cómo.

## Access Avalanche C-Chain

C-Chain expone la [misma API](../../avalanchego-apis/contract-chain-c-chain-api.md) que go-ethereum, para que puedas usar todas las API familiares disponibles en Ethereum para interactuar con la plataforma.

Hay varias maneras de trabajar con la C-Chain.

### A través de MetaMask

Puedes acceder a la C-Chain a través de MetaMask, al definir una red personalizada. Ve a MetaMask, enciende el menú de red y selecciona 'RPC personalizado'. Los datos para Avalanche es lo siguiente.

#### **Configuración de Avalanche Mainnet:**

* **Nombre de la **red: Avalanche Mainnet C-Chain
* **Nuevo RPC **URL: [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
* **ChainID**:`43114`
* ****Símbolo:`AVAX`
* **Explorador de **ello: [https://cchain.explorer.avax.network/](https://cchain.explorer.avax.network/)

#### **Configuración de FUJI Testnet:**

* **Nombre de la **red: Avalanche FUJI C-Chain
* **Nuevo RPC **URL: [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
* **ChainID**:`43113`
* ****Símbolo:`AVAX`
* **Explorador de **ello: [https://cchain.explorer.avax-test.network](https://cchain.explorer.avax-test.network/)

En la interfaz web de tu aplicación, puedes [agregar Avalanche de forma programática](../smart-contracts/add-avalanche-to-metamask-programmatically.md) para que tus usuarios no tengan que introducir los datos de la red manualmente. Para ver el flujo de red personalizado en acción, mira hacia fuera [Pangolin DEX](https://app.pangolin.exchange/).

### Usar los nodos de API públicas

En lugar de proxying operaciones de red a través de MetaMask, puedes usar la API pública, que consiste en un número de nodos de AvalancheGo detrás de un balancer de carga.

El extremo de la API de C-Chain es [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc) para la red principal y [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc) para la testnet.

Para más información, mira la documentación:

{% page-ref page="../../tools/public-api.md" %}

### Ejecutando tu propio nodo

Si no quieres que tu dapp dependa de un servicio centralizado que no controles, puedes ejecutar tu propio nodo y acceder a la red de esa manera. Ejecutar tu propio nodo también evita problemas potenciales con la congestión de API públicas y la limitación de tasas

Para propósitos de desarrollo, [aquí](../nodes-and-staking/run-avalanche-node.md) hay un tutorial para descargar, crear e instalar AvalancheGo. Si vas a ejecutar un nodo de producción en una máquina Linux, [aquí](../nodes-and-staking/set-up-node-with-installer.md) hay un tutorial que muestra cómo usar el script de instalador para instalar rápidamente y fácilmente el nodo como un `systemd`servicio. Script también maneja la actualización de nodo. Si quieres ejecutar un nodo en un contenedor de docker, hay [scripts](https://github.com/ava-labs/avalanchego/tree/master/scripts) en el repo de AvalancheGo para varios configuración de Docker.

### Ejecutando una red de pruebas local

Si necesitas una red de pruebas privada para probar tu dapp, [Avash](https://github.com/ava-labs/avash) es un cliente de shell para lanzar redes locales de Avalanche, similares a Avalanche en Ethereum.

Avash utiliza Lua como un lenguaje de scripting para orquestar redes locales.

Para más información, mira la documentación:

{% page-ref page="../../tools/avash.md" %}

## Desarrollar y implementar contratos

Siendo una blockchain compatible con Ethereum, todas las herramientas habituales de desarrolladores y entornos pueden ser usadas para desarrollar e implementar dapps para la Avalanche's Avalanche.

### Remix

Hay un tutorial para usar Remix para implementar contratos inteligentes en Avalanche. Depende de la máscara de acceso a la red de Avalanche.

{% page-ref page="../smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md" %}

### Truffle

También puedes usar Truffle para probar e implementar contratos inteligentes en Avalanche. Descubre cómo en este tutorial:

{% page-ref page="../smart-contracts/using-truffle-with-the-avalanche-c-chain.md" %}

### Hardhat

Hardhat es el entorno de desarrollo y pruebas más reciente para los contratos inteligentes de Solidity y el que nuestros desarrolladores usan más. Debido a su excelente soporte de prueba, es la forma recomendada de desarrollar para Avalanche.

Para más información vea:{% page-ref page="../smart-contracts/using-hardhat-with-the-avalanche-c-chain.md" %}

## Explorador de Avalanche

Una parte esencial del entorno de desarrollo de contratos inteligentes es el explorador, que indexa y sirve datos de blockchain. El explorador de C-Chain está disponible en [https://cchain.explorer.avax.network/](https://cchain.explorer.avax.network/)[](https://cchain.explorer.avax-test.network/) y el explorador de testnet en explorer, Además de la interfaz web, también expone el estándar [Ethereum JSON RPC API](https://eth.wiki/json-rpc/API).

## Faucet de Avalanche

Para propósitos de desarrollo, necesitarás tokens de prueba. Avalanche tiene un [Faucet](https://faucet.avax-test.network/) que deriva tokens de prueba a la dirección de tu elección. Pasta tu dirección de C-Chain allí.

Si necesitas, también puedes ejecutar una faucet localmente, pero crearlo desde el [repositorio](https://github.com/ava-labs/avalanche-faucet).

## Verificación de contratos

La verificación de contratos inteligentes proporciona transparencia para los usuarios que interactúan con contratos inteligentes publicando el código fuente, permitiendo a todos probar que realmente hace lo que se dice hacer. Puedes verificar tus contratos inteligentes usando el [explorador de C-Chain](https://cchain.explorer.avax.network/). El procedimiento es simple:

* navega a tu dirección de contrato publicado en el explorador
* en la `code`pestaña`verify & publish`
* Copie y pega el código de fuente de flattened e introduce todos los parámetros de construcción exactamente como están en el contrato publicado
* haga`verify & publish`

Si es exitoso, la `code`pestaña ahora tendrá una marca de verificación verde, y tus usuarios podrán verificar el contenido de tu contrato. Esta es una señal positiva de que tus usuarios pueden confiar en tus contratos y se recomienda encarecidamente para todos los contratos de producción.

## verificaciones de seguridad de los contratos

Debido a la naturaleza de las aplicaciones distribuidas, es muy difícil solucionar errores una vez que la aplicación sea implementada. Debido a eso, asegurarte de que tu aplicación se esté ejecutando de forma correcta y segura antes de la implementación es de gran importancia. Las revisiones de seguridad de los contratos son hechas por empresas especializadas y servicios Pueden ser muy caros, que pueden estar fuera de alcance para desarrolladores individuales y empresas iniciales. Pero, también hay servicios y programas automatizados que son libres de usar.

Más populares son:

* [Slither](https://github.com/crytic/slither), aquí hay un [tutorial](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/)
* [MythX](https://mythx.io/)
* [Mythril](https://github.com/ConsenSys/mythril)

Recomendamos altamente usar al menos uno de ellos si la revisión de seguridad de contrato profesional no es posible. Aquí se puede encontrar un aspecto más completo de las prácticas de desarrollo [seguros](https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md).

## Gotchas y cosas a las que buscar

La C-Chain de Avalanche Platforme es compatible con EVM, pero no es idéntica. Hay algunas diferencias que necesitas ser conscientes de lo contrario, puedes crear errores sutiles o inconsistencias en cómo tus dapps se comportan

Aquí están las principales diferencias que deberías ser consciente.

### Tiempo de medición

Es habitual en Ethereum usar el progreso de altura de bloque como un proxy por tiempo. No deberías hacer eso en Avalanche. Las Chains en Avalanche son quiescent, lo que significa que si no hay actividad, no hay bloques producidos. Lo opuesto es también cierto, si hay una gran cantidad de actividad, los bloques se producen muy rápido. Debido a eso, no deberías medir el paso de tiempo por el número de bloques que se crean. Los resultados no serán exactos, y tu contrato puede ser manipulado por terceros.

En vez de la tasa de bloque, deberías medir el tiempo simplemente leyendo el atributo de timestamp de los bloques producidos. Se garantiza que los temporizadores aumenten monotonically y estén dentro de los 30 segundos del tiempo real.

### Finalidad

En Ethereum, la blockchain puede ser reorganizada y los bloques pueden ser orfanatos, por lo que no puedes confiar en el hecho de que un bloque ha sido aceptado hasta que se encuentra a varias cuadras más lejos de la punta \(normalmente se presume que los bloques 6 lugares de profundidad son seguros\). Ese no es el caso en Avalanche. Los bloques son aceptados o rechazados dentro de un segundo o dos. Y una vez que el bloque ha sido aceptado, es final, y no puede ser reemplazado, abandonado o modificado. Por lo tanto, el concepto de 'número de confirmaciones' en Avalanche Tan pronto como un bloque sea aceptado y disponible en el explorador, es final.

### Precio de gas

Gas en Avalanche Validadores no se mantienen el gas por sí mismos \(se recompensan por el staking\), por lo que la dinámica de las 'guerras de gas' donde las transacciones de alto precio se incluyen primero es inexistente. Por lo tanto, nunca hay una necesidad de poner un precio de gas más alto en tus transacciones. Solo estarás quemando gas en vano.

### Configuración de C-Chain

Las cadenas individuales, incluyendo la C-Chain, tienen sus propias opciones de configuración que pueden ser dadas en un archivo de config. Puede que quieras usar una configuración de C-Chain distinta del valor predeterminado al desarrollar dapps. Para más detalles en los configurar de chain, mira [aquí.](../../references/command-line-interface.md#chain-configs)

El archivo de config de C-Chain debería estar en `$HOME/.avalanchego/configs/chains/C/config.json`. También puedes decirle AvalancheGo para buscar en algún otro lugar para el archivo de configuración de C-Chain con la opción `--chain-config-dir`. Puedes buscar opciones de configuración completas para C-Chain [aquí](../../references/command-line-interface.md#coreth-config). Un archivo de configuración C-Chain

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

### Usar `eth_newFilter`y llamadas relacionadas con la API pública

Si estás usando el método [`eth_newFilter`](https://eth.wiki/json-rpc/API#eth_newfilter)API en el servidor de API público, puede que no se comporten como esperes porque la API pública es en realidad varios nodos detrás de un balancer de carga. [`eth_getFilterChanges`](https://eth.wiki/json-rpc/API#eth_getfilterchanges)Si haces una llamada, las llamadas posteriores a las que no terminan en el mismo nodo que la primera `eth_newFilter`llamada, y terminarás con resultados indefinidos.

Si necesitas la funcionalidad de filtrado de registro, deberías usar una conexión de websocket que asegura que tu cliente siempre esté hablando con el mismo nodo detrás del equilibrador de carga. [`eth_getLogs`](https://eth.wiki/json-rpc/API#eth_getlogs)Alternativamente, puedes usar o ejecutar tu propio nodo y hacer llamadas de API a él.

## Soporte

Usando este tutorial deberías poder ponerse rápidamente al día en Avalanche, implementar y probar tus dapps. Si tienes preguntas, problemas o quieres charlar con nosotros, puedes contactarnos en nuestro servidor de [Discord](https://chat.avalabs.org/) público. Nos encantaría escuchar de ti y averiguar qué estás construyendo en Avalanche!

