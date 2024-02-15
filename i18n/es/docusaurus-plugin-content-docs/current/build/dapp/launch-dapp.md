---
tags: [Construir, Dapps]
description: Lanzar cualquier aplicación descentralizada de Solidity nueva o existente en Avalanche C-Chain fomenta la misma experiencia de desarrollo que Ethereum, pero se beneficia de la seguridad, velocidad e interoperabilidad de la Red Avalanche.
sidebar_label: Lanzar una Dapp de Ethereum
pagination_label: Lanzar una Dapp de Ethereum en Avalanche
---

# Lanzar una Dapp de Ethereum en Avalanche

## Resumen

El propósito de este documento es ayudarte a lanzar tu dapp existente en Avalanche. Contiene una serie de recursos diseñados para ayudarte a entender los conceptos básicos de la Plataforma Avalanche y cómo funciona, mostrar cómo conectarte a la red, cómo usar tus herramientas y entornos existentes para desarrollar y desplegar en Avalanche, así como algunas dificultades comunes que debes considerar al ejecutar tu dapp en Avalanche.

## Accediendo a Avalanche C-Chain

C-Chain expone la [misma API](/reference/avalanchego/c-chain/api.md) que `go-ethereum`, por lo que puedes usar todas las API familiares que están disponibles en Ethereum para interactuar con la plataforma.

Hay varias formas de trabajar con la C-Chain.

### A través de Core

Impulsado por Avalanche, [Core](https://medium.com/avalancheavax/ava-labs-releases-core-an-all-in-one-web3-operating-system-for-avalanche-a844eb822887) es un sistema operativo todo en uno que reúne aplicaciones Avalanche, Subnets, puentes y NFT en una experiencia de navegador sin problemas y de alto rendimiento. En otras palabras, Core es más que una billetera. Es un sistema operativo web3 curado que combina Wallet, Explorer, Bridge, Subnets, dApps y más.

En la interfaz web de tu aplicación, sigue [esto para agregar Avalanche programáticamente](/build/dapp/advanced/add-avalanche-programmatically.md#core).

### A través de MetaMask

Puedes acceder a C-Chain a través de MetaMask, definiendo una red personalizada. Ve a MetaMask, inicia sesión, haz clic en el menú desplegable de la red y selecciona 'RPC personalizado'. Los datos para Avalanche son los siguientes.

#### **Configuración de Avalanche Mainnet:**

- **Nombre de la Red**: Avalanche Mainnet C-Chain
- **Nueva URL RPC**: [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
- **ChainID**: `43114`
- **Símbolo**: `AVAX`
- **Explorador**: [https://snowtrace.io/](https://snowtrace.io/)

#### **Configuración de Avalanche Fuji Testnet:**

- **Nombre de la Red**: Avalanche Fuji C-Chain
- **Nueva URL RPC**: [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
- **ChainID**: `43113`
- **Símbolo**: `AVAX`
- **Explorador**: [https://testnet.snowtrace.io/](https://testnet.snowtrace.io/)

En la interfaz web de tu aplicación, puedes [agregar Avalanche programáticamente](/build/dapp/advanced/add-avalanche-programmatically.md#metamask) para que tus usuarios no tengan que ingresar los datos de la red manualmente.

### Usando los Nodos de API Pública o Puntos de Extremo RPC

En lugar de enmascarar las operaciones de red a través de MetaMask, puedes usar la API pública, que consiste en varios nodos AvalancheGo detrás de un balanceador de carga.

El punto final de la API de la C-Chain es [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc) para la Mainnet y [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc) para la testnet.

Para más información, consulta la [documentación](/tooling/rpc-providers.md).

Sin embargo, la API pública no expone todas las API que están disponibles en el nodo, ya que algunas de ellas no tendrían sentido en un servicio de acceso público, y algunas representarían un riesgo de seguridad. Si necesitas usar una API que no está disponible públicamente, puedes ejecutar tu propio nodo.

## Ejecutando Tu Propio Nodo

Si no quieres que tu dapp dependa de un servicio centralizado que no controlas, o tienes necesidades específicas que no pueden ser satisfechas a través de la API pública, puedes ejecutar tu propio nodo y acceder a la red de esa manera. Ejecutar tu propio nodo también evita posibles problemas de congestión y límites de tasa en la API pública.

Para fines de desarrollo y experimentación, [aquí](/nodes/run/node-manually.md) hay un tutorial que muestra cómo descargar, compilar e instalar AvalancheGo. Una solución más sencilla es usar el binario precompilado, disponible en [GitHub](https://github.com/ava-labs/avalanchego/releases). Si vas a ejecutar un nodo en una máquina Linux, puedes usar el [script de instalación](/nodes/run/with-installer/installing-avalanchego.md) para instalar el nodo como un servicio `systemd`. El script también se encarga de la actualización del nodo. Si quieres ejecutar un nodo en un contenedor de Docker, hay [scripts de compilación](https://github.com/ava-labs/avalanchego/tree/master/scripts) en el repositorio AvalancheGo para varias configuraciones de Docker.

### Configuración del Nodo

Las opciones de configuración del nodo se explican [aquí](/nodes/configure/avalanchego-config-flags.md). Pero a menos que tengas necesidades específicas, en su mayoría puedes dejar las opciones de configuración principales del nodo en sus valores predeterminados.

Por otro lado, es probable que necesites ajustar la configuración de la C-Chain para adaptarla a tu uso previsto. Puedes consultar las opciones de configuración completas para la C-Chain [aquí](/nodes/configure/chain-config-flags.md#c-chain-configs), así como la configuración predeterminada. Ten en cuenta que solo las opciones que son diferentes de sus valores predeterminados deben incluirse en el archivo de configuración.

De forma predeterminada, el archivo de configuración de la C-Chain se encuentra en `$HOME/.avalanchego/configs/chains/C/config.json`. Repasaremos cómo ajustar la configuración para cubrir algunos casos de uso comunes en las secciones siguientes.

#### Ejecutando un Nodo de Archivo

Si necesitas la funcionalidad de un [Nodo de Archivo](https://ethereum.org/en/developers/docs/nodes-and-clients/#archive-node) de Ethereum, debes desactivar la poda de la C-Chain, que está habilitada de forma predeterminada para conservar espacio en disco. Para preservar el estado histórico completo, incluye `"pruning-enabled": false` en el archivo de configuración de la C-Chain.

:::nota

Después de cambiar la bandera para desactivar la poda de la base de datos, deberás ejecutar el proceso de inicio rápido nuevamente, ya que el nodo no rellenará ningún dato ya podado y faltante.

Para volver a iniciar el nodo, detenlo, elimina la base de datos (almacenada de forma predeterminada en `~/.avalanchego/db/`) y vuelve a iniciar el nodo.

:::

#### Ejecutando un Nodo en Modo de Depuración

De forma predeterminada, las API de depuración están deshabilitadas. Para habilitarlas, debes habilitar las API EVM apropiadas en el archivo de configuración incluyendo el valor `eth-apis` en tu archivo de configuración de la C-Chain para incluir las API `debug`, `debug-tracer` e `internal-debug`.

:::nota

Incluir `eth-apis` en la bandera de configuración anula los valores predeterminados, ¡así que debes incluir también las API predeterminadas!

:::

#### Ejemplo de Archivo de Configuración de la C-Chain

Un ejemplo de archivo de configuración de la C-Chain que incluye el modo de archivo, habilita las API de depuración y las API EVM predeterminadas:

```json
{
  "eth-apis": [
    "eth",
    "eth-filter",
    "net",
    "web3",
    "internal-eth",
    "internal-blockchain",
    "internal-transaction",
    "debug-tracer"
  ],
  "pruning-enabled": false
}
```

Los valores de configuración predeterminados para la C-Chain se pueden ver [aquí](/nodes/configure/chain-config-flags.md#c-chain-configs).

### Ejecutando una Red de Pruebas Local

Si necesitas una red de prueba privada para probar tu dapp, [Avalanche Network Runner](https://github.com/ava-labs/avalanche-network-runner) es un cliente de shell para lanzar redes Avalanche locales, similar a Ganache en Ethereum.

Para obtener más información, consulta la [documentación](/tooling/network-runner.md).

## Desarrollo e implementación de contratos

Siendo una blockchain compatible con Ethereum, todas las herramientas y entornos de desarrollo habituales de Ethereum se pueden utilizar para desarrollar e implementar dapps para la C-Chain de Avalanche.

### Remix

Hay un [tutorial](/build/dapp/smart-contracts/remix-deploy.md) para usar Remix para implementar contratos inteligentes en Avalanche. Se basa en Core para acceder a la red Avalanche.

### thirdweb

También puedes usar thirdweb para probar e implementar contratos inteligentes en Avalanche. Descubre cómo en este [tutorial](/build/dapp/smart-contracts/toolchains/thirdweb.md).

### Hardhat

Hardhat es el entorno de desarrollo y prueba más nuevo para contratos inteligentes de Solidity, y es el que nuestros desarrolladores usan más. Debido a su excelente soporte de pruebas, es la forma recomendada de desarrollar para Avalanche.

Para obtener más información, consulta [este documento](/build/dapp/smart-contracts/toolchains/hardhat.md).

## Avalanche Explorer

Una parte esencial del entorno de desarrollo de contratos inteligentes es el explorador, que indexa y sirve datos de la blockchain. El explorador de la C-Chain de Mainnet está disponible en [https://snowtrace.io/](https://snowtrace.io/) y el explorador de la testnet en [https://testnet.snowtrace.io/](https://testnet.snowtrace.io/). Además de la interfaz web, también expone la [API estándar de Ethereum JSON RPC](https://eth.wiki/json-rpc/API).

## Avalanche Faucet

Para fines de desarrollo, necesitarás tokens de prueba. Avalanche tiene un [Faucet](https://faucet.avax.network/) que gotea tokens de prueba a la dirección de tu elección. Si ya tienes un saldo de AVAX mayor que cero en Mainnet, pega tu dirección de C-Chain allí y solicita tokens de prueba. De lo contrario, solicita un cupón de faucet en [Guild](https://guild.xyz/avalanche). Los administradores y moderadores en el [Discord](https://discord.com/invite/RwXY7P6) oficial también pueden proporcionar AVAX de testnet si los desarrolladores no pueden obtenerlo de las otras dos opciones.

Si es necesario, también puedes ejecutar un faucet localmente, pero construyéndolo a partir del [repositorio](https://github.com/ava-labs/avalanche-faucet).

## Verificación de contratos

La verificación de contratos inteligentes proporciona transparencia para los usuarios que interactúan con los contratos inteligentes al publicar el código fuente, permitiendo que todos atestigüen que realmente hace lo que afirma hacer. Puedes verificar tus contratos inteligentes utilizando el [explorador C-Chain](https://snowtrace.io/). El procedimiento es simple:

- navega hasta la dirección de tu contrato publicado en el explorador
- en la pestaña `code`, selecciona `verify & publish`
- copia y pega el código fuente aplanado e ingresa todos los parámetros de compilación exactamente como están en el contrato publicado
- haz clic en `verify & publish`

Si tiene éxito, la pestaña `code` ahora tendrá una marca de verificación verde y tus usuarios podrán verificar el contenido de tu contrato. Esto es una señal positiva fuerte de que tus usuarios pueden confiar en tus contratos, y se recomienda encarecidamente para todos los contratos de producción.

Consulta [esto](/build/dapp/smart-contracts/verification/verify-hardhat.md) para obtener un tutorial detallado con Hardhat.

## Verificaciones de seguridad de contratos

Debido a la naturaleza de las aplicaciones distribuidas, es muy difícil corregir errores una vez que la aplicación está implementada. Por eso, asegurarse de que tu aplicación se esté ejecutando correctamente y de manera segura antes de la implementación es de gran importancia. Las revisiones de seguridad de contratos se realizan por empresas y servicios especializados. Pueden ser muy costosos, lo que puede estar fuera del alcance de desarrolladores individuales y startups. Pero también hay servicios y programas automatizados que son gratuitos de usar.

Los más populares son:

- [Slither](https://github.com/crytic/slither), aquí tienes un [tutorial](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/)
- [MythX](https://mythx.io/)
- [Mythril](https://github.com/ConsenSys/mythril)

Recomendamos encarecidamente usar al menos uno de ellos si no es posible una revisión de seguridad de contratos profesional. Una mirada más completa a las prácticas de desarrollo seguro se puede encontrar [aquí](https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md).

## Cuidado con los detalles y cosas a tener en cuenta

La C-Chain de Avalanche Platform es compatible con EVM, pero no es idéntica. Hay algunas diferencias de las que debes ser consciente, de lo contrario, puedes crear errores sutiles o inconsistencias en cómo se comportan tus dapps.

Aquí están las principales diferencias de las que debes ser consciente.

### Medición del tiempo

Avalanche no utiliza el mismo mecanismo para medir el tiempo que Ethereum, que utiliza tiempos de bloque consistentes. En cambio, Avalanche admite emisión de bloques asincrónica, y el objetivo de producción de bloques es una tasa de cada 2 segundos. Si hay suficiente demanda, se puede producir un bloque antes. Si no hay demanda, no se producirá un bloque hasta que haya transacciones para que la red las procese.

Debido a eso, no debes medir el paso del tiempo por el número de bloques que se producen. Los resultados no serán precisos y tu contrato puede ser manipulado por terceros.

En lugar de la tasa de bloque, debes medir el tiempo simplemente leyendo el atributo de timestamp de los bloques producidos. Los timestamps están garantizados para ser crecientes de forma monótona y estar dentro de 30 segundos del tiempo real.

### Finalidad

En Ethereum, la blockchain puede ser reorganizada y los bloques pueden ser huérfanos, por lo que no puedes confiar en el hecho de que un bloque haya sido aceptado hasta que esté varios bloques más alejado de la punta (por lo general, se presume que los bloques a 6 lugares de profundidad son seguros). Ese no es el caso en Avalanche. Los bloques son aceptados o rechazados en uno o dos segundos. Y una vez que el bloque ha sido aceptado, es final y no se puede reemplazar, eliminar o modificar. Por lo tanto, el concepto de 'número de confirmaciones' en Avalanche no se utiliza. Tan pronto como un bloque es aceptado y está disponible en el explorador, es final.

### Uso de `eth_newFilter` y llamadas relacionadas con la API pública

Si estás utilizando el método de API [`eth_newFilter`](https://eth.wiki/json-rpc/API#eth_newfilter) en el servidor de API pública, es posible que no se comporte como esperas porque la API pública en realidad son varios nodos detrás de un balanceador de carga. Si haces una llamada de `eth_newFilter`, las llamadas posteriores a [`eth_getFilterChanges`](https://eth.wiki/json-rpc/API#eth_getfilterchanges) pueden no terminar en el mismo nodo que la primera llamada, y obtendrás resultados indefinidos.

Si necesitas la funcionalidad de filtrado de logs, debes usar una conexión websocket, que asegura que tu cliente siempre esté hablando con el mismo nodo detrás del balanceador de carga. Alternativamente, puedes usar [`eth_getLogs`](https://eth.wiki/json-rpc/API#eth_getlogs), o ejecutar tu propio nodo y hacer llamadas de API a él.

## Soporte

Utilizando este tutorial, deberías poder familiarizarte rápidamente con Avalanche, implementar y probar tus dapps. Si tienes preguntas, problemas o simplemente quieres charlar con nosotros, puedes encontrarnos en nuestro servidor público de [Discord](https://chat.avalabs.org/). ¡Nos encantaría saber de ti y descubrir qué estás construyendo en Avalanche!