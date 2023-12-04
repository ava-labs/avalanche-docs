---
etiquetas: [Construir, Máquinas Virtuales]
descripción: Configurando tu entorno para construir precompilaciones estatales en EVM
sidebar_label: Antecedentes y Requisitos
pagination_label: Antecedentes y Requisitos
sidebar_position: 1
---

# Antecedentes y Requisitos

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Esta es una breve descripción de lo que cubrirá este tutorial.

- Escribir una interfaz en Solidity
- Generar la plantilla de la precompilación
- Implementar las funciones de la precompilación en Golang
- Escribir y ejecutar pruebas

:::caution
Las precompilaciones estatales son software en [fase alfa](https://es.wikipedia.org/wiki/Ciclo_de_vida_de_liberaci%C3%B3n_de_software#Alfa).
Construye bajo tu propio riesgo.
:::

En este tutorial, usamos una rama basada en la versión `v0.5.2` de Subnet-EVM. Puedes encontrar la rama
[aquí](https://github.com/ava-labs/subnet-evm/tree/helloworld-official-tutorial-v2). El código en esta
rama es el mismo que Subnet-EVM, excepto por el directorio `precompile/contracts/helloworld`. El
directorio contiene el código de la precompilación `HelloWorld`. Usaremos esta
precompilación como ejemplo para aprender cómo escribir una precompilación estatal. El código en esta rama puede volverse
obsoleto. Siempre debes usar la última versión de Subnet-EVM cuando desarrollas tu propia precompilación.

## Precompile-EVM

Las precompilaciones de Subnet-EVM se pueden registrar desde un repositorio externo.
Esto permite a los desarrolladores construir sus precompilaciones sin mantener un fork de Subnet-EVM.
Las precompilaciones se registran en Subnet-EVM en tiempo de construcción.

La diferencia entre usar Subnet-EVM y Precompile-EVM es que con Subnet-EVM puedes cambiar los internos de la EVM
para interactuar con tus precompilaciones.
Tales como cambiar la estructura de tarifas, agregar nuevas opcodes, cambiar cómo construir un bloque, etc.
Con Precompile-EVM solo puedes agregar nuevas precompilaciones estatales que pueden interactuar con la StateDB.
Las precompilaciones construidas con Precompile-EVM siguen siendo muy poderosas porque pueden acceder directamente al
estado y modificarlo.

Hay un repositorio de plantilla sobre cómo construir una precompilación de esta manera llamado
[Precompile-EVM](https://github.com/ava-labs/precompile-evm). Tanto Subnet-EVM como Precompile-EVM comparten
estructuras de directorios y códigos comunes.

Puedes consultar la PR de Precompile-EVM que agrega la precompilación de Hello World [aquí](https://github.com/ava-labs/precompile-evm/pull/12).

## Requisitos

Este tutorial asume familiaridad con Golang y JavaScript.

Además, los usuarios deben estar profundamente familiarizados con la EVM para entender sus invariantes
ya que agregar una Precompilación Estatal modifica la propia EVM.

Aquí hay algunos recursos recomendados para aprender los entresijos de la EVM:

- [La Máquina Virtual Ethereum](https://github.com/ethereumbook/ethereumbook/blob/develop/13evm.asciidoc)
- [Precompilaciones en Solidity](https://medium.com/@rbkhmrcr/precompiles-solidity-e5d29bd428c4)
- [Descomponiendo un Contrato Inteligente](https://blog.openzeppelin.com/deconstructing-a-solidity-contract-part-i-introduction-832efd2d7737/)
- [Distribución de Variables de Estado en Almacenamiento](https://docs.soliditylang.org/en/v0.8.10/internals/layout_in_storage.html)
- [Distribución en Memoria](https://docs.soliditylang.org/en/v0.8.10/internals/layout_in_memory.html)
- [Distribución de Datos de Llamada](https://docs.soliditylang.org/en/v0.8.10/internals/layout_in_calldata.html)
- [Especificación del ABI del Contrato](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html)
- [Personalizando la EVM con Precompilaciones Estatales](https://medium.com/avalancheavax/customizing-the-evm-with-stateful-precompiles-f44a34f39efd)

Por favor, instala lo siguiente antes de comenzar.

Primero, instala la última versión de Go. Sigue las instrucciones [aquí](https://go.dev/doc/install).
Puedes verificarlo ejecutando `go version`.

Configura la variable de entorno `$GOPATH` correctamente para que Go busque los Workspaces de Go. Por favor, lee
[esto](https://go.dev/doc/gopath_code) para más detalles. Puedes verificarlo ejecutando `echo $GOPATH`.

:::info
Consulta [aquí](https://github.com/golang/go/wiki/SettingGOPATH) las instrucciones para configurar
GOPATH basado en las configuraciones del sistema.
:::

Como algunas cosas se instalarán en `$GOPATH/bin`, asegúrate de que `$GOPATH/bin` esté en tu
`$PATH`, de lo contrario, es posible que obtengas un error al ejecutar los comandos a continuación.
Para hacer eso, ejecuta el comando: `export PATH=$PATH:$GOROOT/bin:$GOPATH/bin`

Descarga los siguientes requisitos previos en tu `$GOPATH`:

- Clona el repositorio (Subnet-EVM o Precompile-EVM) con Git
- Clona el repositorio [AvalancheGo](https://github.com/ava-labs/avalanchego) con Git
- Instala [Avalanche Network Runner](/tooling/network-runner.md)
- Instala [solc](https://github.com/ethereum/solc-js#usage-on-the-command-line)
- Instala [Node.js y NPM](https://nodejs.org/en/download)
  Para copiar y pegar fácilmente, usa los siguientes comandos:

```shell
cd $GOPATH
mkdir -p src/github.com/ava-labs
cd src/github.com/ava-labs
```

Clona el repositorio:

<!-- vale off -->

<Tabs groupId="evm-tabs">
<TabItem value="subnet-evm-tab" label="Subnet-EVM" default>

```shell
git clone git@github.com:ava-labs/subnet-evm.git
```

</TabItem>
<TabItem value="precompile-evm-tab" label="Precompile-EVM" >

```shell
git clone git@github.com:ava-labs/precompile-evm.git
```

Alternativamente, puedes usarlo como un repositorio de plantillas desde [github](https://github.com/ava-labs/precompile-evm/generate).

</TabItem>
</Tabs>

<!-- vale on -->

Luego ejecuta los siguientes comandos:

```shell
git clone git@github.com:ava-labs/avalanchego.git
curl -sSfL https://raw.githubusercontent.com/ava-labs/avalanche-network-runner/main/scripts/install.sh | sh -s
npm install -g solc
```

## Código Completo

Puedes inspeccionar la solicitud de extracción de ejemplo para ver el código completo.

<!-- vale off -->

<Tabs groupId="evm-tabs">
<TabItem value="subnet-evm-tab" label="Subnet-EVM" default>

[Solicitud de Extracción Hello World de Subnet-EVM](https://github.com/ava-labs/subnet-evm/pull/565/)

</TabItem>
<TabItem value="precompile-evm-tab" label="Precompile-EVM"  >

[Solicitud de Extracción Hello World de Precompile-EVM](https://github.com/ava-labs/precompile-evm/pull/12/)

</TabItem>
</Tabs>

<!-- vale on -->

Para un ejemplo completo, también puedes consultar la [Precompilación del Administrador de Recompensas](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contracts/rewardmanager/).