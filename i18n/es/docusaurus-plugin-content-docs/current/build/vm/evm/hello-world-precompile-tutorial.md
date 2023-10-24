---
etiquetas: [Construir, Máquinas Virtuales]
descripción: Aprende cómo crear una precompilación estatal para Subnet-EVM desde cero.
sidebar_label: Generar una Precompilación Estatal
pagination_label: Generar una Precompilación Estatal
sidebar_position: 0
---

# Tutorial de Generación de Precompilaciones Estatales

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

En este tutorial, vamos a recorrer cómo podemos generar una precompilación estatal desde cero.
Antes de empezar, repasemos qué es una precompilación, qué es una precompilación estatal y por qué esto
es extremadamente útil.

## Antecedentes

### Contratos Precompilados

Ethereum utiliza precompilaciones para implementar eficientemente primitivas criptográficas dentro de la EVM en lugar de
reimplementar las mismas primitivas en Solidity. Las siguientes precompilaciones están incluidas actualmente:
ecrecover, sha256, blake2f, ripemd-160, Bn256Add, Bn256Mul, Bn256Pairing, la función de identidad y
exponenciación modular.

Podemos ver estos mapeos de [precompilaciones](https://github.com/ethereum/go-ethereum/blob/v1.11.1/core/vm/contracts.go#L82)
de dirección a función aquí en la VM de Ethereum:

```go
// PrecompiledContractsBerlin contiene el conjunto predeterminado de contratos Ethereum
// precompilados utilizados en la versión Berlin.
var PrecompiledContractsBerlin = map[common.Address]PrecompiledContract{
	common.BytesToAddress([]byte{1}): &ecrecover{},
	common.BytesToAddress([]byte{2}): &sha256hash{},
	common.BytesToAddress([]byte{3}): &ripemd160hash{},
	common.BytesToAddress([]byte{4}): &dataCopy{},
	common.BytesToAddress([]byte{5}): &bigModExp{eip2565: true},
	common.BytesToAddress([]byte{6}): &bn256AddIstanbul{},
	common.BytesToAddress([]byte{7}): &bn256ScalarMulIstanbul{},
	common.BytesToAddress([]byte{8}): &bn256PairingIstanbul{},
	common.BytesToAddress([]byte{9}): &blake2F{},
}
```

Estas direcciones de precompilación comienzan desde `0x0000000000000000000000000000000000000001` e incrementan en 1.

Una [precompilación](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/core/vm/contracts.go#L54-L57)
sigue esta interfaz:

```go
// PrecompiledContract es la interfaz básica para contratos nativos de Go. La implementación
// requiere un recuento de gas determinista basado en el tamaño de entrada del método Run del
// contrato.
type PrecompiledContract interface {
	RequiredGas(input []byte) uint64  // RequiredPrice calcula el uso de gas del contrato
	Run(input []byte) ([]byte, error) // Run ejecuta el contrato precompilado
}
```

Aquí tienes un ejemplo de la precompilación de
[sha256](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/core/vm/contracts.go#L237-L250).

```go
type sha256hash struct{}

// RequiredGas devuelve el gas requerido para ejecutar el contrato precompilado.
//
// Este método no requiere ninguna verificación de desbordamiento ya que el costo de gas del tamaño de entrada
// requerido para cualquier cosa significativa es tan alto que es imposible pagarlo.
func (c *sha256hash) RequiredGas(input []byte) uint64 {
	return uint64(len(input)+31)/32*params.Sha256PerWordGas + params.Sha256BaseGas
}

func (c *sha256hash) Run(input []byte) ([]byte, error) {
	h := sha256.Sum256(input)
	return h[:], nil
}
```

La instrucción CALL (CALL, STATICCALL, DELEGATECALL y CALLCODE) nos permite invocar esta precompilación.

La firma de la función CALL en la EVM es la siguiente:

```go
 Call(
 	caller ContractRef,
 	addr common.Address,
 	input []byte,
 	gas uint64,
 	value *big.Int,
)(ret []byte, leftOverGas uint64, err error)
```

Las precompilaciones son un atajo para ejecutar una función implementada por la EVM misma, en lugar de un
contrato real. Una precompilación está asociada con una dirección fija definida en la EVM. No hay ningún código de bytes
asociado con esa dirección.

Cuando se llama a una precompilación, la EVM verifica si la dirección de entrada es una dirección de precompilación, y si es así
ejecuta la precompilación. De lo contrario, carga el contrato inteligente en la dirección de entrada y lo ejecuta en el
intérprete de la EVM con los datos de entrada especificados.

### Contratos Precompilados Estatales

Una precompilación estatal se basa en una precompilación en que agrega acceso al estado. Las precompilaciones estatales son
no están disponibles en la EVM predeterminada y son específicas de las EVM de Avalanche como
[Coreth](https://github.com/ava-labs/coreth) y [Subnet-EVM](https://github.com/ava-labs/subnet-evm).

Una precompilación estatal sigue esta [interfaz](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contract/interfaces.go#L17-L20):

```go
// StatefulPrecompiledContract es la interfaz para ejecutar un contrato precompilado
type StatefulPrecompiledContract interface {
	// Run ejecuta el contrato precompilado.
	Run(accessibleState PrecompileAccessibleState,
	caller common.Address,
	addr  common.Address,
	input []byte,
	suppliedGas uint64,
	readOnly bool)
	(ret []byte, remainingGas uint64, err error)
}
```

Una precompilación estatal inyecta acceso al estado a través de la interfaz `PrecompileAccessibleState` para
proporcionar acceso al estado de la EVM, incluida la capacidad de modificar saldos y leer/escribir almacenamiento.

¡De esta manera podemos proporcionar incluso más personalización de la EVM a través de Precompilaciones Estatales que podemos
con la interfaz de precompilación original!

### AllowList

La AllowList permite que una precompilación imponga permisos en direcciones. La AllowList no es un contrato
en sí mismo, sino una estructura auxiliar para proporcionar un mecanismo de control para envolver contratos.
Proporciona una `AllowListConfig` a la precompilación para que pueda tomar una configuración inicial
desde el génesis/actualización. También proporciona 4 funciones para establecer/leer los permisos. En este tutorial,
usamos la interfaz `IAllowList` para proporcionar control de permisos a la precompilación `HelloWorld`.
`IAllowList` está definido en Subnet-EVM en [`./contracts/contracts/interfaces/IAllowList.sol`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/contracts/contracts/interfaces/IAllowList.sol).
La interfaz es la siguiente:

```sol
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IAllowList {
  // Establece [addr] para tener el rol de administrador sobre el contrato precompilado.
  function setAdmin(address addr) external;

  // Establece [addr] para estar habilitado en el contrato precompilado.
  function setEnabled(address addr) external;

  // Establece [addr] para no tener ningún rol para el contrato precompilado.
  function setNone(address addr) external;

  // Lee el estado de [addr].
  function readAllowList(address addr) external view returns (uint256 role);
}
```

Puedes encontrar más información sobre la interfaz AllowList [aquí](/build/subnet/upgrade/customize-a-subnet.md#allowlist-interface).

## Tutorial

### Resumen

Este es un breve resumen de lo que cubrirá este tutorial.

- Escribir una interfaz en Solidity
- Generar la plantilla de la precompilación
- Implementar las funciones de la precompilación en Golang
- Escribir y ejecutar pruebas

:::precaución
Los precompilados con estado son software en fase alfa. Compílelos bajo su propio riesgo.
:::

En este tutorial, usamos una rama basada en la versión `v0.5.2` de Subnet-EVM. Puedes encontrar la rama
[aquí](https://github.com/ava-labs/subnet-evm/tree/helloworld-official-tutorial-v2). El código en esta
rama es el mismo que Subnet-EVM, excepto por el directorio `precompile/contracts/helloworld`. El
directorio contiene el código para el precompilado `HelloWorld`. Usaremos este
precompilado como ejemplo para aprender cómo escribir un precompilado con estado. El código en esta rama puede quedar
obsoleto.
Siempre debes usar la última versión de Subnet-EVM cuando desarrollas tu propio precompilado.

#### Precompile-EVM

Los precompilados de Subnet-EVM se pueden registrar desde un repositorio externo.
Esto permite a los desarrolladores construir sus precompilados sin mantener un fork de Subnet-EVM.
Los precompilados se registran en Subnet-EVM en tiempo de compilación.

La diferencia entre usar Subnet-EVM y Precompile-EVM es que con Subnet-EVM puedes cambiar los internos de EVM
para interactuar con tus precompilados.
Tales como cambiar la estructura de tarifas, agregar nuevas opcodes, cambiar cómo construir un bloque, etc.
Con Precompile-EVM solo puedes agregar nuevos precompilados con estado que pueden interactuar con la StateDB.
Los precompilados construidos con Precompile-EVM siguen siendo muy poderosos porque pueden acceder directamente al
estado y modificarlo.

Hay un repositorio de plantilla sobre cómo construir un precompilado de esta manera llamado
[Precompile-EVM](https://github.com/ava-labs/precompile-evm). Tanto Subnet-EVM como Precompile-EVM comparten
estructuras de directorios y códigos comunes.
Puedes consultar la PR de Precompile-EVM que agrega el precompilado Hello World [aquí](https://github.com/ava-labs/precompile-evm/pull/2)

### Prerrequisitos

Este tutorial asume familiaridad con Golang y JavaScript.

Además, los usuarios deben estar profundamente familiarizados con la EVM para entender sus invariantes
ya que agregar un Precompilado con Estado modifica la propia EVM.

Aquí tienes algunos recursos recomendados para aprender los entresijos de la EVM:

- [La Máquina Virtual Ethereum](https://github.com/ethereumbook/ethereumbook/blob/develop/13evm.asciidoc)
- [Precompilados en Solidity](https://medium.com/@rbkhmrcr/precompiles-solidity-e5d29bd428c4)
- [Desconstruyendo un Contrato Inteligente](https://blog.openzeppelin.com/deconstructing-a-solidity-contract-part-i-introduction-832efd2d7737/)
- [Diseño de Variables de Estado en Almacenamiento](https://docs.soliditylang.org/en/v0.8.10/internals/layout_in_storage.html)
- [Diseño en Memoria](https://docs.soliditylang.org/en/v0.8.10/internals/layout_in_memory.html)
- [Diseño de Datos de Llamada](https://docs.soliditylang.org/en/v0.8.10/internals/layout_in_calldata.html)
- [Especificación ABI del Contrato](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html)
- [Personalizando la EVM con Precompilados con Estado](https://medium.com/avalancheavax/customizing-the-evm-with-stateful-precompiles-f44a34f39efd)

Por favor, instala lo siguiente antes de empezar.

Primero, instala la última versión de Go. Sigue las instrucciones [aquí](https://go.dev/doc/install).
Puedes verificarlo ejecutando `go version`.

Configura la variable de entorno `$GOPATH` correctamente para que Go busque los Espacios de Trabajo de Go. Por favor, lee
[esto](https://go.dev/doc/gopath_code) para más detalles. Puedes verificarlo ejecutando `echo $GOPATH`.

:::info
Consulta [aquí](https://github.com/golang/go/wiki/SettingGOPATH) las instrucciones para configurar
el GOPATH en función de las configuraciones del sistema.
:::

Como algunas cosas se instalarán en `$GOPATH/bin`, asegúrate de que `$GOPATH/bin` esté en tu
`$PATH`, de lo contrario, es posible que obtengas un error al ejecutar los comandos a continuación.
Para hacerlo, ejecuta el comando: `export PATH=$PATH:$GOROOT/bin:$GOPATH/bin`

Descarga los siguientes prerrequisitos en tu `$GOPATH`:

- Clona el repositorio (Subnet-EVM o Precompile-EVM)
- Clona el repositorio [AvalancheGo](https://github.com/ava-labs/avalanchego)
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

### Código Completo

Puedes inspeccionar la pull request de ejemplo para ver el código completo.

<!-- vale off -->

<Tabs groupId="evm-tabs">
<TabItem value="subnet-evm-tab" label="Subnet-EVM" default>

[Pull Request de Hello World de Subnet-EVM](https://github.com/ava-labs/subnet-evm/pull/565/)

</TabItem>
<TabItem value="precompile-evm-tab" label="Precompile-EVM"  >

[Pull Request de Hello World de Precompile-EVM](https://github.com/ava-labs/precompile-evm/pull/12/)

</TabItem>
</Tabs>

<!-- vale on -->

Para un ejemplo más completo, también puedes echar un vistazo al [Precompilado del Administrador de Recompensas](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contracts/rewardmanager/)

### Paso 0: Generando el Precompilado

Primero, debemos crear la interfaz de Solidity que queremos que nuestro precompilado implemente. Esta será
la Interfaz de HelloWorld. Tendrá dos funciones simples, `sayHello()` y `setGreeting()`. Estas
dos funciones demostrarán la obtención y configuración, respectivamente, de un valor almacenado en el
espacio de estado del precompilado. La función `sayHello()`
es una función `view`, lo que significa que no modifica el estado del precompilado y devuelve un resultado de tipo cadena.
La función `setGreeting()` es una función cambiadora de estado, lo que significa que modifica el estado del precompilado.

Para el tutorial, estaremos trabajando en una nueva rama en el repositorio Subnet-EVM/Precompile-EVM.

<!-- vale off -->

<Tabs groupId="evm-tabs">
<TabItem value="subnet-evm-tab" label="Subnet-EVM" default>

```bash
cd $GOPATH/src/github.com/ava-labs/subnet-evm
```

Luego, cambia a una nueva rama:

```bash
git checkout -b hello-world-stateful-precompile
```

Comenzaremos en este directorio `./contracts/`:

```bash
cd contracts/
```

Crea un nuevo archivo llamado `IHelloWorld.sol` y copia y pega el siguiente código:

```sol
// (c) 2022-2023, Ava Labs, Inc. Todos los derechos reservados.
// Consulta el archivo LICENSE para conocer los términos de licencia.

// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;
import "./IAllowList.sol";

interface IHelloWorld is IAllowList {
  // sayHello devuelve la cadena de saludo almacenada
  function sayHello() external view returns (string calldata result);

  // setGreeting almacena la cadena de saludo
  function setGreeting(string calldata response) external;
}
```

¡Ahora tenemos una interfaz que nuestra precompilación puede implementar!
Creemos una [ABI](https://docs.soliditylang.org/en/v0.8.13/abi-spec.html#contract-abi-specification)
de nuestra interfaz de Solidity.

En el mismo directorio, ejecutemos:

```shell
solc --abi ./contracts/interfaces/IHelloWorld.sol -o ./abis
```

</TabItem>
<TabItem value="precompile-evm-tab" label="Precompile-EVM"  >

```bash
cd $GOPATH/src/github.com/ava-labs/precompile-evm
```

Luego, cambia a una nueva rama:

```bash
git checkout -b hello-world-stateful-precompile
```

Comenzaremos en este directorio `./contracts/`:

```bash
cd contracts/
```

Para las interfaces de Precompile-EVM y otros contratos en Subnet-EVM,
se puede acceder a través del paquete `@avalabs/subnet-evm-contracts`.
Esto ya está agregado al archivo `package.json`.
Puedes instalarlo ejecutando `npm install`.
Para importar la interfaz `IAllowList`, puedes usar la siguiente declaración de importación:

```sol
import "@avalabs/subnet-evm-contracts/contracts/interfaces/IAllowList.sol";
```

El archivo completo se ve así:

```sol
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;
import "@avalabs/subnet-evm-contracts/contracts/interfaces/IAllowList.sol";

interface IHelloWorld is IAllowList {
  // sayHello devuelve la cadena de saludo almacenada
  function sayHello() external view returns (string calldata result);

  // setGreeting almacena la cadena de saludo
  function setGreeting(string calldata response) external;
}
```

¡Ahora tenemos una interfaz que nuestra precompilación puede implementar!
Creemos una [ABI](https://docs.soliditylang.org/en/v0.8.13/abi-spec.html#contract-abi-specification)
de nuestra interfaz de Solidity.

En Precompile-EVM importamos contratos del paquete `@avalabs/subnet-evm-contracts`.
Para generar la ABI en Precompile-EVM, necesitamos incluir la carpeta `node_modules` para encontrar
los contratos importados con las siguientes banderas:

- `--abi`
  - Especificación ABI de los contratos.
- `--base-path path`
  - Utiliza la ruta dada como raíz del árbol de origen en lugar de la raíz del sistema de archivos.
- `--include-path path`
  - Hace que un directorio de origen adicional esté disponible para la devolución de llamada de importación predeterminada. Usa esta opción si
    quieres importar contratos cuya ubicación no está fija en relación con tu árbol de origen principal;
    por ejemplo, bibliotecas de terceros instaladas usando un administrador de paquetes. Se puede usar varias veces.
    Solo se puede usar si la ruta base tiene un valor no vacío.
- `--output-dir path`
  - Si se proporciona, crea un archivo por componente de salida y contrato/archivo en el directorio especificado.
- `--overwrite`
  - Sobrescribe los archivos existentes (se usa junto con `--output-dir`).

```shell
solc --abi ./contracts/interfaces/IHelloWorld.sol -o ./abis --base-path . --include-path ./node_modules
```

</TabItem>
</Tabs>

<!-- vale on -->

Esto genera el código ABI en `./abis/IHelloWorld.abi`.

```json
[
  {
    "inputs": [
      { "internalType": "address", "name": "addr", "type": "address" }
    ],
    "name": "readAllowList",
    "outputs": [
      { "internalType": "uint256", "name": "role", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "sayHello",
    "outputs": [
      { "internalType": "string", "name": "result", "type": "string" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "addr", "type": "address" }
    ],
    "name": "setAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "addr", "type": "address" }
    ],
    "name": "setEnabled",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "response", "type": "string" }
    ],
    "name": "setGreeting",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "addr", "type": "address" }
    ],
    "name": "setNone",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
```

Como puedes ver, la ABI también contiene las funciones de la interfaz `IAllowList`. Esto se debe a que la
interfaz `IHelloWorld` hereda de la interfaz `IAllowList`.

Nota: La ABI debe tener salidas con nombres para generar la plantilla de precompilación.

Ahora que tenemos una ABI con la que la herramienta de generación de precompilaciones puede interactuar, podemos ejecutar el siguiente
comando para generar nuestros archivos de precompilación de HelloWorld.

Volviendo a la raíz del repositorio, ejecutemos el script de ayuda PrecompileGen:

<!-- markdownlint-disable MD013 -->

```shell
cd ..
```

Ambos, Subnet-EVM y Precompile-EVM, tienen el mismo script `generate_precompile.sh`. El de Precompile-EVM
instala el script de Subnet-EVM y lo ejecuta.

```bash

$ ./scripts/generate_precompile.sh --help



Usando la rama: precompile-tutorial
NOMBRE:
precompilegen - herramienta generadora de precompilaciones de subnet-evm

USO:
main [opciones globales] comando [opciones de comando] [argumentos...]

VERSIÓN:
1.10.26-estable

COMANDOS:
help, h Muestra una lista de comandos o ayuda para un comando

OPCIONES GLOBALES:

    --abi valor
          Ruta al archivo JSON ABI del contrato a generar, - para STDIN

    --out valor
          Carpeta de salida para los archivos de precompilación generados, - para STDOUT (por defecto =
          ./precompile/contracts/{pkg}). Los archivos de prueba no se generarán si se utiliza STDOUT

    --pkg valor
          Nombre del paquete Go para generar la precompilación (por defecto = {type})

    --type valor
          Nombre de la estructura para la precompilación (por defecto = {nombre del archivo abi})

MISC

    --help, -h                     (por defecto: false)
          muestra ayuda

    --version, -v                  (por defecto: false)
          imprime la versión

DERECHOS DE AUTOR:
Derechos de autor 2013-2022 Los autores de go-ethereum

```

¡Ahora vamos a generar los archivos de plantilla de precompilación!

<!-- vale off -->

<Tabs groupId="evm-tabs">
<TabItem value="subnet-evm-tab" label="Subnet-EVM" default>

En las implementaciones de precompilación de Subnet-EVM, residen bajo el directorio [`./precompile/contracts`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contracts). Generemos nuestra plantilla de precompilación en el directorio `./precompile/contracts/helloworld`, donde `helloworld` es el nombre del paquete Go en el que queremos generar la precompilación.

```bash
./scripts/generate_precompile.sh --abi ./contracts/abis/IHelloWorld.abi --type HelloWorld --pkg helloworld
```

</TabItem>
<TabItem value="precompile-evm-tab" label="Precompile-EVM"  >

Para Precompile-EVM no necesitamos poner archivos bajo una estructura de directorios profunda. Simplemente podemos generar la plantilla de precompilación bajo su propio directorio a través de la bandera `--out ./helloworld`.

```bash
./scripts/generate_precompile.sh --abi ./contracts/abis/IHelloWorld.abi --type HelloWorld --pkg helloworld --out ./helloworld
```

</TabItem>
</Tabs>

<!-- vale on -->

<!-- markdownlint-enable MD013 -->

Esto genera archivos de plantilla de precompilación `contract.go`, `contract.abi`, `config.go`, `module.go`
y `README.md`. `README.md` explica pautas generales para el desarrollo de precompilaciones.
Debes leer cuidadosamente este archivo antes de modificar la plantilla de precompilación.

<!-- markdownlint-disable MD013 -->

```md
Hay algunos cambios que deben hacerse en el archivo generado. Cada área que requiere que agregues tu código está marcada con CUSTOM CODE para que sea fácil de encontrar y modificar.
Además, hay otros archivos que debes editar para activar tu precompilación.
Estas áreas están resaltadas con comentarios "ADD YOUR PRECOMPILE HERE".
Para las pruebas, echa un vistazo a otras pruebas de precompilación en contract_test.go y config_test.go en otras carpetas de precompilación.
Consulta el tutorial en <https://docs.avax.network/subnets/hello-world-precompile-tutorial> para obtener más información sobre el desarrollo de precompilaciones.

Pautas generales para el desarrollo de precompilaciones:
1- Establece una clave de configuración adecuada en module.go generada. Por ejemplo: "yourPrecompileConfig"
2- Lee el comentario y establece una dirección de contrato adecuada en module.go generada. Por ejemplo:
ContractAddress = common.HexToAddress("UNADIRECCIONHEXADAELEGIBLE")
3- Se recomienda modificar solo el código en las áreas resaltadas marcadas con "CUSTOM CODE STARTS HERE". Por lo general, los códigos personalizados solo son necesarios en esas áreas.
Modificar el código fuera de estas áreas debe hacerse con precaución y con un profundo entendimiento de cómo estos cambios pueden afectar al EVM.
4- Establece los costos de gas en contract.go generada
5- Importa forzosamente tu paquete de precompilación en precompile/registry/registry.go
6- Agrega tus pruebas unitarias de configuración bajo el paquete generado config_test.go
7- Agrega tus pruebas unitarias de contrato bajo el paquete generado contract_test.go
8- Además, puedes agregar una prueba de VM completa para tu precompilación bajo plugin/vm/vm_test.go. Consulta las pruebas de precompilación existentes para ver ejemplos.
9- Agrega tu interfaz de Solidity y contrato de prueba al directorio contracts/contracts
10- Escribe pruebas de contrato de Solidity para tu precompilación en contracts/contracts/test/
11- Escribe contrapartes de pruebas DS-Test de TypeScript para tus pruebas de Solidity en contracts/test/
12- Crea tu génesis con tu precompilación habilitada en tests/precompile/genesis/
13- Crea una prueba e2e para tu prueba de Solidity en tests/precompile/solidity/suites.go
14- Ejecuta tus pruebas e2e de precompilación de Solidity con './scripts/run_ginkgo.sh`
```

Sigamos estos pasos y creemos nuestra precompilación de HelloWorld.

<!-- markdownlint-enable MD013 -->

### Paso 1: Establecer la Clave de Configuración

Vamos a saltar al archivo `helloworld/module.go` primero. Este archivo contiene la definición del módulo para nuestra precompilación. Puedes ver que la `ConfigKey` se establece en algún valor predeterminado de `helloWorldConfig`. Esta clave debe ser única para la precompilación. Esta clave de configuración determina qué clave JSON usar al leer la configuración de la precompilación desde el archivo JSON de actualización/génesis. En este caso, la clave de configuración es `helloWorldConfig` y la configuración JSON debería verse así:

```json
{
  "helloWorldConfig": {
    "blockTimestamp": 0
		...
  }
}
```

### Paso 2: Establecer la Dirección del Contrato

En el archivo `helloworld/module.go`, puedes ver que la `ContractAddress` se establece en algún valor predeterminado. Esto debería cambiarse a una dirección adecuada para tu precompilación. La dirección debe ser única para la precompilación. Hay un registro de direcciones de precompilación en [`precompile/registry/registry.go`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/registry/registry.go). Una lista de direcciones se especifica en los comentarios bajo este archivo. Modifica el valor predeterminado para que sea la siguiente dirección de precompilación estatal disponible para el usuario. Para bifurcaciones de Subnet-EVM o Precompile-EVM, los usuarios deben comenzar en `0x0300000000000000000000000000000000000000` para asegurarse de que sus propias modificaciones no entren en conflicto con precompilaciones estatales que puedan agregarse a Subnet-EVM en el futuro. Debes elegir una dirección que aún no esté tomada.

```go
// Equal checks if two Configs are equal.
func (c *Config) Equal(other precompileconfig.Config) bool {
	// Check equality of Upgrade and AllowListConfig
	if !c.Upgrade.Equal(other.GetUpgrade()) {
		return false
	}
	if !c.AllowListConfig.Equal(other.GetAllowListConfig()) {
		return false
	}

	// CUSTOM CODE STARTS HERE
	// Add your own custom equality checks for Config here
	// and return false if they are not equal

	return true
}
```

<!-- markdownlint-enable MD013 -->

#### Step 3.3: Handler File

The handler file contains the logic for handling the precompile execution. This file is located at
[`./precompile/helloworld/handler.go`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contracts/helloworld/handler.go)
for Subnet-EVM and
[./helloworld/handler.go](https://github.com/ava-labs/precompile-evm/blob/hello-world-example/helloworld/handler.go)
for Precompile-EVM.

##### Handler()

The `Handler()` function is the main entry point for executing the precompile logic. It takes in an
`*evm.EVM` instance, a `*big.Int` for gas, and a `*bytes.Buffer` for the input data. It returns a
`*big.Int` for the gas cost and a `[]byte` for the output data.

The default code generated for the `Handler()` function is a placeholder that returns an error
indicating that the precompile is not implemented. You will need to replace this code with your own
implementation of the precompile logic.

```go
// Handler is the main entry point for executing the precompile logic.
func Handler(evm *evm.EVM, gas *big.Int, input *bytes.Buffer) (*big.Int, []byte, error) {
	// CUSTOM CODE STARTS HERE
	// Replace the default code with your own implementation of the precompile logic
	// and return the gas cost and output data accordingly

	return nil, nil, errors.New("precompile not implemented")
}
```

##### Name()

The `Name()` function returns the name of the precompile. This is used for logging and debugging
purposes. You can modify this function to return a more descriptive name for your precompile.

```go
// Name returns the name of the precompile.
func Name() string {
	return "HelloWorld"
}
```

##### ID()

The `ID()` function returns the ID of the precompile. This is used to uniquely identify the
precompile in the precompile registry. You can modify this function to return a unique ID for your
precompile. The recommended approach is to use a hash of the precompile name.

```go
// ID returns the ID of the precompile.
func ID() precompiled.ID {
	return precompiled.ID(sha256.Sum256([]byte(Name())))
}
```

##### Gas()

The `Gas()` function returns the gas cost of the precompile. This is used to calculate the gas cost
for executing the precompile. You can modify this function to return the appropriate gas cost for
your precompile.

```go
// Gas returns the gas cost of the precompile.
func Gas() *big.Int {
	return big.NewInt(0) // Replace 0 with the appropriate gas cost for your precompile
}
```

##### InputLength()

The `InputLength()` function returns the expected length of the input data for the precompile. This is
used to validate the input data before executing the precompile. You can modify this function to
return the expected length of the input data for your precompile.

```go
// InputLength returns the expected length of the input data for the precompile.
func InputLength() int {
	return 0 // Replace 0 with the expected length of the input data for your precompile
}
```

##### OutputLength()

The `OutputLength()` function returns the expected length of the output data for the precompile. This
is used to validate the output data after executing the precompile. You can modify this function to
return the expected length of the output data for your precompile.

```go
// OutputLength returns the expected length of the output data for the precompile.
func OutputLength() int {
	return 0 // Replace 0 with the expected length of the output data for your precompile
}
```

##### Validate()

The `Validate()` function is called before executing the precompile to validate the input data. It
returns an error if the input data is invalid. The default code generated for the `Validate()`
function checks if the input data length matches the expected length. You can modify this function
to add custom validation logic for your precompile.

```go
// Validate validates the input data for the precompile.
func Validate(input []byte) error {
	// CUSTOM CODE STARTS HERE
	// Add your own custom validation logic for the input data
	// and return an error if the input data is invalid

	if len(input) != InputLength() {
		return fmt.Errorf("invalid input length")
	}

	return nil
}
```

##### Marshal()

The `Marshal()` function is called to serialize the precompile output data. It takes in the output
data as a `[]byte` and returns a serialized representation of the output data. The default code
generated for the `Marshal()` function simply returns the output data as is. You can modify this
function to add custom serialization logic for your precompile.

```go
// Marshal serializes the precompile output data.
func Marshal(output []byte) ([]byte, error) {
	// CUSTOM CODE STARTS HERE
	// Add your own custom serialization logic for the output data
	// and return the serialized representation of the output data

	return output, nil
}
```

##### Unmarshal()

The `Unmarshal()` function is called to deserialize the precompile input data. It takes in a
serialized representation of the input data and returns the deserialized input data. The default
code generated for the `Unmarshal()` function simply returns the input data as is. You can modify
this function to add custom deserialization logic for your precompile.

```go
// Unmarshal deserializes the precompile input data.
func Unmarshal(input []byte) ([]byte, error) {
	// CUSTOM CODE STARTS HERE
	// Add your own custom deserialization logic for the input data
	// and return the deserialized input data

	return input, nil
}
```

### Step 4: Test the Precompile

Now that you have implemented the precompile logic, it's time to test it to make sure it works as
expected. You can write test cases for your precompile in the
[`./precompile/helloworld/handler_test.go`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contracts/helloworld/handler_test.go)
file for Subnet-EVM and
[./helloworld/handler_test.go](https://github.com/ava-labs/precompile-evm/blob/hello-world-example/helloworld/handler_test.go)
file for Precompile-EVM.

In the test file, you can write test cases that cover different scenarios and edge cases for your
precompile. You can use the `TestHandler()` function provided in the test file to test the
execution of your precompile logic.

Here's an example of how a test case for the `Handler()` function might look like:

```go
func TestHandler(t *testing.T) {
	// Create a new EVM instance
	evm := evm.NewEVM()

	// Set up the input data for the precompile
	input := []byte("Hello, World!")

	// Set up the expected output data
	expectedOutput := []byte("Hello, World!")

	// Set up the gas limit
	gasLimit := big.NewInt(1000000)

	// Call the Handler function to execute the precompile logic
	gasCost, output, err := Handler(evm, gasLimit, input)
	if err != nil {
		t.Fatalf("Handler returned an error: %v", err)
	}

	// Check if the gas cost matches the expected gas cost
	if gasCost.Cmp(big.NewInt(1000)) != 0 {
		t.Errorf("Gas cost is incorrect, got: %v, want: %v", gasCost, big.NewInt(1000))
	}

	// Check if the output data matches the expected output data
	if !bytes.Equal(output, expectedOutput) {
		t.Errorf("Output data is incorrect, got: %v, want: %v", output, expectedOutput)
	}
}
```

You can write multiple test cases to cover different scenarios and edge cases for your precompile.
Make sure to test both the success cases and the failure cases to ensure that your precompile behaves
correctly in all situations.

### Step 5: Build and Run the Precompile

Once you have implemented and tested your precompile, you can build and run it to see it in action.

To build the precompile, you can use the following command:

```shell
make build-precompiles
```

This will build the precompile binary and place it in the `build` directory.

To run the precompile, you can use the following command:

```shell
./build/precompiles --config /path/to/config.json
```

Make sure to replace `/path/to/config.json` with the path to your precompile config JSON file.

The precompile will read the config file, register itself with the precompile registry, and start
listening for precompile requests.

You can now use the precompile in your EVM environment by specifying its address in the
`ContractAddress` variable in the `module.go` file of the EVM environment.

### Step 6: Enable the Precompile in the EVM Environment

To enable the precompile in the EVM environment, you need to update the `ContractAddress` variable in
the `module.go` file of the EVM environment to the address of your precompile.

For example, if your precompile address is `0x0300000000000000000000000000000000000000`, you would
update the `ContractAddress` variable in the `module.go` file to:

```go
var ContractAddress = common.HexToAddress("0x0300000000000000000000000000000000000000")
```

This tells the EVM environment to use your precompile for any `CALL`, `CALLCODE`, `DELEGATECALL`, or
`STATICCALL` operations that specify the precompile address.

### Step 7: Test the Precompile in the EVM Environment

After enabling the precompile in the EVM environment, you can test it by executing EVM transactions
that invoke the precompile.

You can use the EVM test framework to write test cases that cover different scenarios and edge cases
for your precompile. The test framework provides a set of helper functions for constructing and
executing EVM transactions.

Here's an example of how a test case for invoking the precompile using the EVM test framework might
look like

```go
// SayHello returns the greeting message stored in the contract.
func SayHello(stateDB contract.StateDB) (string, error) {
	// Get the value set at storageKey
	value := stateDB.GetState(ContractAddress, storageKeyHash)
	return string(common.TrimLeftZeroes(value.Bytes())), nil
}
```

<!-- markdownlint-enable MD013 -->

#### Step 3.5: Modify setGreeting()

The final function to modify is `setGreeting()`. This function allows us to update the greeting message
stored in the contract. We will receive a new greeting message as an input and update the value at
`storageKey` in the stateDB. The below code snippet can be copied and pasted to overwrite the default
`setGreeting` code.

```go
// SetGreeting sets the greeting message in the contract to the given [newGreeting].
func SetGreeting(stateDB contract.StateDB, newGreeting string) error {
	// Set the value at storageKey to newGreeting
	stateDB.SetState(ContractAddress, storageKeyHash, common.LeftPadBytes([]byte(newGreeting), 32))
	return nil
}
```

#### Step 3.6: Compile the Contract

Now that we have finished modifying the necessary files, we can compile the contract using the `solc`
compiler. Run the following command to compile the contract:

```bash
solc --bin --abi --optimize --overwrite -o ./helloworld/ ./helloworld/IHelloWorld.sol
```

This command compiles the contract and generates the binary and ABI files in the `./helloworld/` directory.

#### Step 3.7: Update the HelloWorld Precompile ID

Finally, we need to update the HelloWorld precompile ID in the `precompiles.go` file. Open the
`precompiles.go` file and find the `HelloWorld` precompile ID. Update the value of the `ID` constant
to a unique precompile ID. For example:

```go
const (
	// HelloWorld precompile ID
	HelloWorld = 0x0F
)
```

Save the file after making the update.

Congratulations! You have successfully implemented the HelloWorld precompile contract. Now let's move on
to testing the contract.

````go
package precompiles

import (
	"github.com/ava-labs/subnet-evm/evm"
	"github.com/ava-labs/subnet-evm/precompile"
	"github.com/ava-labs/subnet-evm/precompile/allowlist"
	"github.com/ava-labs/subnet-evm/precompile/contract"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/ethash"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/secp256k1"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie/evm_state"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie/evm_state/storage"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie/evm_state/storage/database"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie/evm_state/storage/database/memorydb"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie/evm_state/storage/database/memorydb/gorocksdb"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie/evm_state/storage/database/memorydb/leveldb"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie/evm_state/storage/database/memorydb/pebble"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie/evm_state/storage/database/memorydb/rocksdb"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie/evm_state/storage/database/memorydb/rocksdb/options"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie/evm_state/storage/database/memorydb/rocksdb/options/compaction"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie/evm_state/storage/database/memorydb/rocksdb/options/compaction/filter"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie/evm_state/storage/database/memorydb/rocksdb/options/compaction/filter/policy"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie/evm_state/storage/database/memorydb/rocksdb/options/compaction/filter/policy/bloom"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie/evm_state/storage/database/memorydb/rocksdb/options/compaction/filter/policy/bloom/bitset"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie/evm_state/storage/database/memorydb/rocksdb/options/compaction/filter/policy/bloom/bitset/block"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie/evm_state/storage/database/memorydb/rocksdb/options/compaction/filter/policy/bloom/bitset/block/blocks"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie/evm_state/storage/database/memorydb/rocksdb/options/compaction/filter/policy/bloom/bitset/block/blocks/bit"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie/evm_state/storage/database/memorydb/rocksdb/options/compaction/filter/policy/bloom/bitset/block/blocks/bit/block"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie/evm_state/storage/database/memorydb/rocksdb/options/compaction/filter/policy/bloom/bitset/block/blocks/bit/block/blocks"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie/evm_state/storage/database/memorydb/rocksdb/options/compaction/filter/policy/bloom/bitset/block/blocks/bit/block/blocks/bloom"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie/evm_state/storage/database/memorydb/rocksdb/options/compaction/filter/policy/bloom/bitset/block/blocks/bit/block/blocks/bloom/filter"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie/evm_state/storage/database/memorydb/rocksdb/options/compaction/filter/policy/bloom/bitset/block/blocks/bit/block/blocks/bloom/filter/policy"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie/evm_state/storage/database/memorydb/rocksdb/options/compaction/filter/policy/bloom/bitset/block/blocks/bit/block/blocks/bloom/filter/policy/bloom"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie/evm_state/storage/database/memorydb/rocksdb/options/compaction/filter/policy/bloom/bitset/block/blocks/bit/block/blocks/bloom/filter/policy/bloom/bloom"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie/evm_state/storage/database/memorydb/rocksdb/options/compaction/filter/policy/bloom/bitset/block/blocks/bit/block/blocks/bloom/filter/policy/bloom/bloom/blocks"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie/evm_state/storage/database/memorydb/rocksdb/options/compaction/filter/policy/bloom/bitset/block/blocks/bit/block/blocks/bloom/filter/policy/bloom/bloom/blocks/block"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie/evm_state/storage/database/memorydb/rocksdb/options/compaction/filter/policy/bloom/bitset/block/blocks/bit/block/blocks/bloom/filter/policy/bloom/bloom/blocks/block/blocks"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie/evm_state/storage/database/memorydb/rocksdb/options/compaction/filter/policy/bloom/bitset/block/blocks/bit/block/blocks/bloom/filter/policy/bloom/bloom/blocks/block/blocks/bloom"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie/evm_state/storage/database/memorydb/rocksdb/options/compaction/filter/policy/bloom/bitset/block/blocks/bit/block/blocks/bloom/filter/policy/bloom/bloom/blocks/block/blocks/bloom/filter"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie/evm_state/storage/database/memorydb/rocksdb/options/compaction/filter/policy/bloom/bitset/block/blocks/bit/block/blocks/bloom/filter/policy/bloom/bloom/blocks/block/blocks/bloom/filter/policy"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie/evm_state/storage/database/memorydb/rocksdb/options/compaction/filter/policy/bloom/bitset/block/blocks/bit/block/blocks/bloom/filter/policy/bloom/bloom/blocks/block/blocks/bloom/filter/policy/bloom"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie/evm_state/storage/database/memorydb/rocksdb/options/compaction/filter/policy/bloom/bitset/block/blocks/bit/block/blocks/bloom/filter/policy/bloom/bloom/blocks/block/blocks/bloom/filter/policy/bloom/bloom"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie/evm_state/storage/database/memorydb/rocksdb/options/compaction/filter/policy/bloom/bitset/block/blocks/bit/block/blocks/bloom/filter/policy/bloom/bloom/blocks/block/blocks/bloom/filter/policy/bloom/bloom/blocks"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie/evm_state/storage/database/memorydb/rocksdb/options/compaction/filter/policy/bloom/bitset/block/blocks/bit/block/blocks/bloom/filter/policy/bloom/bloom/blocks/block/blocks/bloom/filter/policy/bloom/bloom/blocks/block"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie/evm_state/storage/database/memorydb/rocksdb/options/compaction/filter/policy/bloom/bitset/block/blocks/bit/block/blocks/bloom/filter/policy/bloom/bloom/blocks/block/blocks/bloom/filter/policy/bloom/bloom/blocks/block/blocks"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie/evm_state/storage/database/memorydb/rocksdb/options/compaction/filter/policy/bloom/bitset/block/blocks/bit/block/blocks/bloom/filter/policy/bloom/bloom/blocks/block/blocks/bloom/filter/policy/bloom/bloom/blocks/block/blocks/bloom"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie/evm_state/storage/database/memorydb/rocksdb/options/compaction/filter/policy/bloom/bitset/block/blocks/bit/block/blocks/bloom/filter/policy/bloom/bloom/blocks/block/blocks/bloom/filter/policy/bloom/bloom/blocks/block/blocks/bloom/filter"
	"github.com/ava-labs/subnet-evm/precompile/evm_importer/trie/evm_trie/evm_state/storage/database/memorydb/rocksdb/options/compaction/filter/policy/bloom/bitset/block/blocks/bit/block/blocks/bloom/filter/policy/bloom/bloom/blocks/block/blocks/bloom/filter/policy/bloom/bloom/blocks/block/blocks/bloom/filter/policy"
	"github.com/ava-labs/subnet-ev

Para Subnet-EVM, tenemos un registro de precompilación en [`/precompile/registry/registry.go`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/registry/registry.go).
Este registro importa forzosamente precompilaciones de otros paquetes, por ejemplo:

```go
// Importaciones forzadas de cada precompilación para asegurar que la función init de cada precompilación se ejecute y se registre
// en el registro.
import (
	_ "github.com/ava-labs/subnet-evm/precompile/contracts/deployerallowlist"

	_ "github.com/ava-labs/subnet-evm/precompile/contracts/nativeminter"

	_ "github.com/ava-labs/subnet-evm/precompile/contracts/txallowlist"

	_ "github.com/ava-labs/subnet-evm/precompile/contracts/feemanager"

	_ "github.com/ava-labs/subnet-evm/precompile/contracts/rewardmanager"

	_ "github.com/ava-labs/subnet-evm/precompile/contracts/helloworld"
	// AGREGA TU PRECOMPILACIÓN AQUÍ
	// _ "github.com/ava-labs/subnet-evm/precompile/contracts/yourprecompile"
)
````

<!-- vale off -->

El registro en sí mismo también es importado forzosamente por [`/plugin/evm/vm.go](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/plugin/evm/vm.go#L50).
Esto asegura que el registro sea importado y las precompilaciones sean registradas.

<!-- vale on -->

</TabItem>
<TabItem value="precompile-evm-tab" label="Precompile-EVM"  >

Para Precompile-EVM hay un archivo [`plugin/main.go`](https://github.com/ava-labs/precompile-evm/blob/hello-world-example/plugin/main.go)
en Precompile-EVM que orquesta este registro de precompilación.

```go
// (c) 2019-2023, Ava Labs, Inc. All rights reserved.
// See the file LICENSE for licensing terms.

package main

import (
	"fmt"

	"github.com/ava-labs/avalanchego/version"
	"github.com/ava-labs/subnet-evm/plugin/evm"
	"github.com/ava-labs/subnet-evm/plugin/runner"

	// Cada precompilación generada por la herramienta precompilegen tiene una función init de auto-registro
	// que registra la precompilación con el subnet-evm. Importar el paquete de precompilación aquí
	// hará que la precompilación se registre con el subnet-evm.
	_ "github.com/ava-labs/precompile-evm/helloworld"
	// AGREGA TU PRECOMPILACIÓN AQUÍ
	//_ "github.com/ava-labs/precompile-evm/{yourprecompilepkg}"
)
```

</TabItem>
</Tabs>

<!-- vale on -->

### Paso 6: Agregar Pruebas de Configuración

La herramienta de generación de precompilaciones también genera esqueletos para pruebas unitarias. Las pruebas de configuración generadas estarán en [`./precompile/contracts/helloworld/config_test.go`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contracts/helloworld/config_test.go)
para Subnet-EVM y [`./helloworld/config_test.go`](https://github.com/ava-labs/precompile-evm/blob/hello-world-example/helloworld/config_test.go)
para Precompile-EVM.
Principalmente hay dos funciones que necesitamos probar: `Verify` y `Equal`. `Verify` verifica si la precompilación está configurada correctamente. `Equal`
verifica si la precompilación es igual a otra precompilación. Las pruebas de `Verify` generadas contienen un caso válido.
Puedes agregar más casos inválidos dependiendo de tu implementación. Las pruebas de `Equal` generan algunos
casos inválidos para probar diferentes marcas de tiempo, tipos y casos de AllowList.
Puedes consultar cada archivo `config_test.go` para otras precompilaciones
en el directorio [`./precompile/contracts`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contracts/)
de Subnet-EVM para más ejemplos.

### Paso 7: Agregar Pruebas de Contrato

La herramienta también genera pruebas de contrato para asegurarse de que nuestra precompilación funcione correctamente. Las pruebas generadas incluyen casos para probar capacidades de lista de permitidos, costos de gas y llamadas a funciones en modo de solo lectura.
Puedes consultar otros archivos `contract_test.go` en `/precompile/contracts`. Las pruebas de contrato de Hello World estarán en [`./precompile/contracts/helloworld/contract_test.go`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contracts/helloworld/contract_test.go)
para Subnet-EVM y
[`./helloworld/contract_test.go`](https://github.com/ava-labs/precompile-evm/blob/hello-world-example/helloworld/contract_test.go)
para Precompile-EVM.
También agregaremos más pruebas para cubrir las funcionalidades de `sayHello()` y `setGreeting()`.
Las pruebas de contrato se definen en una estructura estándar que cada prueba
puede personalizar según sus necesidades. La estructura de la prueba es la siguiente:

```go
// PrecompileTest es un caso de prueba para una precompilación
type PrecompileTest struct {
	// Caller es la dirección del llamador de la precompilación
	Caller common.Address
	// Input los bytes de entrada sin procesar a la precompilación
	Input []byte
	// InputFn es una función que devuelve los bytes de entrada sin procesar a la precompilación
	// Si se especifica, se ignorará Input.
	InputFn func(t *testing.T) []byte
	// SuppliedGas es la cantidad de gas suministrado a la precompilación
	SuppliedGas uint64
	// ReadOnly es si la precompilación debe ser llamada en modo de solo lectura
	// Si es verdadero, la precompilación no debe modificar el estado.
	ReadOnly bool
	// Config es la configuración a usar para la precompilación
	// Debe ser la misma configuración de precompilación que se usa en el
	// configurador de la precompilación.
	// Si es nulo, no se llamará a Configure.
	Config precompileconfig.Config
	// BeforeHook se llama antes de que se llame a la precompilación.
	BeforeHook func(t *testing.T, state contract.StateDB)
	// AfterHook se llama después de que se llame a la precompilación.
	AfterHook func(t *testing.T, state contract.StateDB)
	// ExpectedRes son los bytes de resultado esperados devueltos por la precompilación
	ExpectedRes []byte
	// ExpectedErr es el error esperado devuelto por la precompilación
	ExpectedErr string
	// BlockNumber es el número de bloque a usar para el contexto de bloque de la precompilación
	BlockNumber int64
}
```

Cada prueba puede llenar los campos de la estructura `PrecompileTest` para personalizar la prueba.
Esta prueba utiliza una función auxiliar de AllowList
`allowlist.RunPrecompileWithAllowListTests(t, Module, state.NewTestStateDB, tests)`
que puede ejecutar todas las pruebas especificadas más las suites de pruebas de AllowList. Si no planeas usar AllowList,
puedes ejecutarlas directamente de la siguiente manera:

```go
	for name, test := range tests {
		t.Run(name, func(t *testing.T) {
			test.Run(t, module, newStateDB(t))
		})
	}
```

### Paso 8 (Opcional): Pruebas de VM

Esto solo es aplicable para bifurcaciones directas de Subnet-EVM ya que los archivos de prueba no se exportan directamente en Golang. Si usas Precompile-EVM, puedes saltarte este paso.

Las pruebas de VM son pruebas que ejecutan la precompilación llamándola a través de la Subnet-EVM. Estas son las pruebas más completas que podemos ejecutar. Si tu precompilación modifica cómo funciona la Subnet-EVM, por ejemplo, cambiando las reglas de la cadena de bloques, debes agregar una prueba de VM. Por ejemplo, puedes echar un vistazo a la función TestRewardManagerPrecompileSetRewardAddress en [aquí](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/plugin/evm/vm_test.go#L2675). Para este ejemplo de Hello World, no modificamos ninguna regla de la Subnet-EVM, por lo que no necesitamos agregar ninguna prueba de VM.

### Paso 9: Agregar Contrato de Prueba

Agreguemos nuestro contrato de prueba a `./contracts/contracts`. ¡Este contrato inteligente nos permite interactuar con nuestra precompilación! Convertimos la dirección de la precompilación `HelloWorld` a la interfaz `IHelloWorld`. Al hacerlo, `helloWorld` es ahora un contrato de tipo `IHelloWorld` y cuando llamamos a cualquier función en ese contrato, seremos redirigidos a la dirección de la precompilación HelloWorld. El siguiente fragmento de código se puede copiar y pegar en un nuevo archivo llamado `ExampleHelloWorld.sol`:

```sol
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IHelloWorld.sol";

// ExampleHelloWorld muestra cómo se puede usar la precompilación HelloWorld en un contrato inteligente.
contract ExampleHelloWorld {
  address constant HELLO_WORLD_ADDRESS =
    0x0300000000000000000000000000000000000000;
  IHelloWorld helloWorld = IHelloWorld(HELLO_WORLD_ADDRESS);

  function sayHello() public view returns (string memory) {
    return helloWorld.sayHello();
  }

  function setGreeting(string calldata greeting) public {
    helloWorld.setGreeting(greeting);
  }
}
```

:::warning

La precompilación Hello World es un contrato diferente al ExampleHelloWorld y tiene una dirección diferente. Dado que la precompilación utiliza AllowList para un acceso permitido, cualquier llamada a la precompilación, incluida desde ExampleHelloWorld, será denegada a menos que el llamador se agregue a la AllowList.

:::

Ten en cuenta que este contrato es simplemente un envoltorio y está llamando a las funciones de la precompilación. La razón por la que agregamos otro contrato inteligente de ejemplo es tener pruebas más simples y sin estado.

Para el contrato de prueba, escribimos nuestra prueba en `./contracts/test/ExampleHelloWorldTest.sol`.

<!-- vale off -->
<!-- vale off -->

<Tabs groupId="evm-tabs">

<TabItem value="subnet-evm-tab" label="Subnet-EVM" default>

<!-- vale on -->

```sol
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../ExampleHelloWorld.sol";
import "../interfaces/IHelloWorld.sol";
import "./AllowListTest.sol";

contract ExampleHelloWorldTest is AllowListTest {
  IHelloWorld helloWorld = IHelloWorld(HELLO_WORLD_ADDRESS);

  function step_getDefaultHelloWorld() public {
    ExampleHelloWorld example = new ExampleHelloWorld();
    address exampleAddress = address(example);

    assertRole(helloWorld.readAllowList(exampleAddress), AllowList.Role.None);
    assertEq(example.sayHello(), "Hello World!");
  }

  function step_doesNotSetGreetingBeforeEnabled() public {
    ExampleHelloWorld example = new ExampleHelloWorld();
    address exampleAddress = address(example);

    assertRole(helloWorld.readAllowList(exampleAddress), AllowList.Role.None);

    try example.setGreeting("testing") {
      assertTrue(false, "setGreeting should fail");
    } catch {}
  }

  function step_setAndGetGreeting() public {
    ExampleHelloWorld example = new ExampleHelloWorld();
    address exampleAddress = address(example);

    assertRole(helloWorld.readAllowList(exampleAddress), AllowList.Role.None);
    helloWorld.setEnabled(exampleAddress);
    assertRole(
      helloWorld.readAllowList(exampleAddress),
      AllowList.Role.Enabled
    );

    string memory greeting = "testgreeting";
    example.setGreeting(greeting);
    assertEq(example.sayHello(), greeting);
  }
}
```

</TabItem>
<TabItem value="precompile-evm-tab" label="Precompile-EVM"  >

Para Precompile-EVM, debes importar `AllowListTest` con el paquete NPM `@avalabs/subnet-evm-contracts`:

```sol
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../ExampleHelloWorld.sol";
import "../interfaces/IHelloWorld.sol";
import "@avalabs/subnet-evm-contracts/contracts/test/AllowListTest.sol";

contract ExampleHelloWorldTest is AllowListTest {
  IHelloWorld helloWorld = IHelloWorld(HELLO_WORLD_ADDRESS);

  function step_getDefaultHelloWorld() public {
    ExampleHelloWorld example = new ExampleHelloWorld();
    address exampleAddress = address(example);

    assertRole(helloWorld.readAllowList(exampleAddress), AllowList.Role.None);
    assertEq(example.sayHello(), "Hello World!");
  }

  function step_doesNotSetGreetingBeforeEnabled() public {
    ExampleHelloWorld example = new ExampleHelloWorld();
    address exampleAddress = address(example);

    assertRole(helloWorld.readAllowList(exampleAddress), AllowList.Role.None);

    try example.setGreeting("testing") {
      assertTrue(false, "setGreeting should fail");
    } catch {}
  }

  function step_setAndGetGreeting() public {
    ExampleHelloWorld example = new ExampleHelloWorld();
    address exampleAddress = address(example);

    assertRole(helloWorld.readAllowList(exampleAddress), AllowList.Role.None);
    helloWorld.setEnabled(exampleAddress);
    assertRole(
      helloWorld.readAllowList(exampleAddress),
      AllowList.Role.Enabled
    );

    string memory greeting = "testgreeting";
    example.setGreeting(greeting);
    assertEq(example.sayHello(), greeting);
  }
}
```

</TabItem>
</Tabs>

<!-- vale on -->

### Paso 10: Agregar DS-Test

Ahora podemos activar este contrato de prueba a través de las pruebas de `hardhat`. El script de prueba utiliza el marco de pruebas `test` de Subnet-EVM en `./contracts/test`. Puedes encontrar más información sobre el marco de pruebas [aquí](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/contracts/test/utils.ts).

<!-- vale off -->

<Tabs groupId="evm-tabs">

<TabItem value="subnet-evm-tab" label="Subnet-EVM" default>

El script de prueba se ve así:

````ts
// (c) 2019-2022, Ava Labs, Inc. All rights reserved.
// See the file LICENSE for licensing terms.

import { ethers } from "hardhat";
import { test } from "./utils";

// asegúrate de que esta siempre sea una dirección de administrador para la precompilación hello world
const ADMIN_ADDRESS = "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC";
const HELLO_WORLD_ADDRESS = "0x0300000000000000000000000000000000000000";



```go
// func TestHelloWorld(t *testing.T) {
// 	// TODO: Add your test here
// }
````

Uncomment this code and replace `// TODO: Add your test here` with the name of your test function,
which in our case is `TestHelloWorldE2E`.

The final code should look like this:

```go
func TestHelloWorld(t *testing.T) {
	TestHelloWorldE2E(t)
}
```

### Step 13: Running the E2E Test

Now that we have set up the e2e test, we can run it using the following command:

```shell
go test ./tests/precompile/solidity/...
```

If all goes well, you should see the output of the test in the console, indicating whether it passed or failed.

Congratulations! You have successfully set up and run an end-to-end test for the HelloWorld precompile in HardHat!

```bash
cd $GOPATH/src/github.com/ava-labs/precompile-evm
GINKGO_LABEL_FILTER="HelloWorld" ./scripts/run_ginkgo.sh
```

or

```bash
cd $GOPATH/src/github.com/ava-labs/subnet-evm
GINKGO_LABEL_FILTER="HelloWorld" ./scripts/run_ginkgo.sh
```

</Tabs>

<!-- vale on -->

This will run only the `HelloWorld` test case in the Ginkgo test suite.

If you want to run all the tests, you can remove the `GINKGO_LABEL_FILTER` environment variable:

<!-- vale off -->

<Tabs groupId="evm-tabs">

<TabItem value="subnet-evm-tab" label="Subnet-EVM" default>

```bash
cd $GOPATH/src/github.com/ava-labs/subnet-evm
./scripts/run_ginkgo.sh
```

</TabItem>
<TabItem value="precompile-evm-tab" label="Precompile-EVM"  >

```bash
cd $GOPATH/src/github.com/ava-labs/precompile-evm
./scripts/run_ginkgo.sh
```

</TabItem>
</Tabs>

<!-- vale on -->

This will run all the tests in the Ginkgo test suite.

<TabItem value="subnet-evm-tab" label="Subnet-EVM" default>

```bash
cd $GOPATH/src/github.com/ava-labs/subnet-evm
```

</TabItem>
<TabItem value="precompile-evm-tab" label="Precompile-EVM">

```bash
cd $GOPATH/src/github.com/ava-labs/precompile-evm
```

</TabItem>
</Tabs>

<!-- vale on -->

Utiliza la variable de entorno `GINKGO_LABEL_FILTER` para filtrar la prueba:

```bash
GINKGO_LABEL_FILTER=HelloWorld ./scripts/run_ginkgo.sh
```

Primero verás que el nodo se inicia en la sección `BeforeSuite` de la prueba de precompilación:

```bash
$ GINKGO_LABEL_FILTER=HelloWorld ./scripts/run_ginkgo.sh
Usando la rama: hello-world-tutorial-walkthrough
construyendo precompile.test
# github.com/ava-labs/subnet-evm/tests/precompile.test
ld: advertencia: no se pudo crear desenrollado compacto para _blst_sha256_block_data_order: no utiliza un marco basado en RBP o RSP

Compilado precompile.test
# github.com/ava-labs/subnet-evm/tests/load.test
ld: advertencia: no se pudo crear desenrollado compacto para _blst_sha256_block_data_order: no utiliza un marco basado en RBP o RSP

Compilado load.test
Ejecutando Suite: suite de pruebas de subnet-evm precompile ginkgo - /Users/avalabs/go/src/github.com/ava-labs/subnet-evm
===================================================================================================================
Semilla aleatoria: 1674833631

Se ejecutará 1 de 7 especificaciones
------------------------------
[BeforeSuite]
/Users/avalabs/go/src/github.com/ava-labs/subnet-evm/tests/precompile/precompile_test.go:31
  > Entrar [BeforeSuite] NIVEL SUPERIOR - /Users/avalabs/go/src/github.com/ava-labs/subnet-evm/tests/precompile/precompile_test.go:31 @ 01/27/23 10:33:51.001
INFO [01-27|10:33:51.002] Iniciando nodo AvalancheGo                wd=/Users/avalabs/go/src/github.com/ava-labs/subnet-evm
INFO [01-27|10:33:51.002] Ejecutando                                cmd="./scripts/run.sh "
[salida en tiempo real] Usando la rama: hello-world-tutorial-walkthrough
...
[BeforeSuite] PASSED [15.002 segundos]
```

Después de que el `BeforeSuite` se complete con éxito, se omitirán todas las pruebas de precompilación etiquetadas
excepto la de `HelloWorld`:

```bash
S [OMITIDO]
[Precompiles]
/Users/avalabs/go/src/github.com/ava-labs/subnet-evm/tests/precompile/solidity/suites.go:26
  contrato minter nativo [Precompile, ContractNativeMinter]
  /Users/avalabs/go/src/github.com/ava-labs/subnet-evm/tests/precompile/solidity/suites.go:29
------------------------------
S [OMITIDO]
[Precompiles]
/Users/avalabs/go/src/github.com/ava-labs/subnet-evm/tests/precompile/solidity/suites.go:26
  lista de permisos de transacción [Precompile, TxAllowList]
  /Users/avalabs/go/src/github.com/ava-labs/subnet-evm/tests/precompile/solidity/suites.go:36
------------------------------
...
Salida combinada:

Compilando 2 archivos con 0.8.0
Compilación finalizada con éxito


  ExampleHelloWorldTest
    ✓ debería obtener el saludo predeterminado (4057ms)
    ✓ no debería establecer el saludo antes de habilitado (4067ms)
    ✓ debería establecer y obtener el saludo con la cuenta habilitada (4074ms)



  3 pasando (33s)


  < Salida [It] hello world - /Users/avalabs/go/src/github.com/ava-labs/subnet-evm/tests/precompile/solidity/suites.go:64 @ 01/27/23 10:34:17.484 (11.48s)
• [11.480 segundos]
------------------------------
```

Finalmente, verás que la prueba de carga también se omite:

```bash
Ejecutando Suite: suite de pruebas de simulador de carga pequeña de subnet-evm - /Users/avalabs/go/src/github.com/ava-labs/subnet-evm
======================================================================================================================
Semilla aleatoria: 1674833658

Se ejecutará 0 de 1 especificaciones
S [OMITIDO]
[Simulador de carga]
/Users/avalabs/go/src/github.com/ava-labs/subnet-evm/tests/load/load_test.go:49
  prueba de carga básica de la subnet [carga]
  /Users/avalabs/go/src/github.com/ava-labs/subnet-evm/tests/load/load_test.go:50
------------------------------

Se ejecutaron 0 de 1 especificaciones en 0.000 segundos
¡ÉXITO! -- 0 Pasado | 0 Fallido | 0 Pendiente | 1 Omitido
PASAR
```

¡Parece que las pruebas están pasando!

:::note

Si tus pruebas fallaron, por favor revisa tus pasos. Lo más probable es que el error sea que la precompilación no estaba
habilitada y falta algún código.
Intenta ejecutar `npm install` en el directorio de contratos para asegurarte de que se instalen hardhat y otros paquetes.

También puedes usar la
[implementación oficial del tutorial](https://github.com/ava-labs/subnet-evm/tree/helloworld-official-tutorial-v2)
para verificar tu trabajo también.

:::

### Ejecutando una Red Local

¡Lo logramos! Todo funciona en nuestras pruebas de Ginkgo, y ahora queremos iniciar una red local
con la precompilación de Hello World activada.

Inicia el servidor en una terminal en una nueva pestaña usando avalanche-network-runner. Por favor, revisa
[este enlace](/tooling/network-runner.md) para obtener más información sobre Avalanche
Network Runner, cómo descargarlo y cómo usarlo. El servidor estará en modo "escucha",
esperando llamadas de la API.

Iniciaremos el servidor desde el directorio Subnet-EVM para que podamos usar una ruta de archivo relativa
al archivo JSON de génesis:

<!-- vale off -->

<Tabs groupId="evm-tabs">
<TabItem value="subnet-evm-tab" label="Subnet-EVM" default>

```bash
cd $GOPATH/src/github.com/ava-labs/subnet-evm
```

</TabItem>
<TabItem value="precompile-evm-tab" label="Precompile-EVM"  >

```bash
cd $GOPATH/src/github.com/ava-labs/precompile-evm
```

</TabItem>
</Tabs>

<!-- vale on -->

Luego ejecuta ANR:

```bash
avalanche-network-runner server \
--log-level debug \
--port=":8080" \
--grpc-gateway-port=":8081"

```

Dado que ya compilamos AvalancheGo y Subnet-EVM/Precompile-EVM en un paso anterior, deberíamos tener
los binarios de AvalancheGo y Subnet-EVM listos para usar.

Ahora podemos establecer las siguientes rutas. `AVALANCHEGO_EXEC_PATH` apunta al último binario de AvalancheGo
que acabamos de construir. `AVALANCHEGO_PLUGIN_PATH` apunta a la ruta de los complementos que debería tener el
binario de Subnet-EVM que acabamos de construir:

```bash
export AVALANCHEGO_EXEC_PATH="${GOPATH}/src/github.com/ava-labs/avalanchego/build/avalanchego"
export AVALANCHEGO_PLUGIN_PATH="${GOPATH}/src/github.com/ava-labs/avalanchego/build/plugins"
```

El siguiente comando "emite solicitudes" al servidor que acabamos de iniciar. Podemos usar
avalanche-network-runner para iniciar algunos nodos que ejecutan la última versión de Subnet-EVM:

```bash
  avalanche-network-runner control start \
  --log-level debug \
  --endpoint="0.0.0.0:8080" \
  --number-of-nodes=5 \
  --avalanchego-path ${AVALANCHEGO_EXEC_PATH} \
  --plugin-dir ${AVALANCHEGO_PLUGIN_PATH} \
  --blockchain-specs '[{"vm_name": "subnetevm", "genesis": "./tests/precompile/genesis/hello_world.json"}]'
```

Podemos mirar la pestaña del terminal del servidor y ver cómo se inicia la red local.
Si el inicio de la red es exitoso, deberías ver algo como esto:

```bash
[blockchain RPC para "srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy"] "http://127.0.0.1:9650/ext/bc/2jDWMrF9yKK8gZfJaaaSfACKeMasiNgHmuZip5mWxUfhKaYoEU"
[blockchain RPC para "srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy"] "http://127.0.0.1:9652/ext/bc/2jDWMrF9yKK8gZfJaaaSfACKeMasiNgHmuZip5mWxUfhKaYoEU"
[blockchain RPC para "srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy"] "http://127.0.0.1:9654/ext/bc/2jDWMrF9yKK8gZfJaaaSfACKeMasiNgHmuZip5mWxUfhKaYoEU"
[blockchain RPC para "srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy"] "http://127.0.0.1:9656/ext/bc/2jDWMrF9yKK8gZfJaaaSfACKeMasiNgHmuZip5mWxUfhKaYoEU"
[blockchain RPC para "srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy"] "http://127.0.0.1:9658/ext/bc/2jDWMrF9yKK8gZfJaaaSfACKeMasiNgHmuZip5mWxUfhKaYoEU"
```

Esto muestra la extensión al servidor de API en AvalancheGo que es específica de la instancia de Blockchain Subnet-EVM.
Para interactuar con ella, querrás agregar la extensión `/rpc`, que
proporcionará las llamadas de API estándar de Ethereum. Por ejemplo, puedes usar la URL de RPC:

`http://127.0.0.1:9650/ext/bc/2jDWMrF9yKK8gZfJaaaSfACKeMasiNgHmuZip5mWxUfhKaYoEU/rpc`

para conectarte a la blockchain a través de Core, MetaMask, HardHat, etc.

### Mantenimiento

Siempre debes mantener tu fork actualizado con los últimos cambios en el repositorio oficial de Subnet-EVM.
Si has hecho un fork del repositorio de Subnet-EVM, podría haber conflictos y
es posible que debas resolverlos manualmente.

Si usaste Precompile-EVM, puedes actualizar tu repositorio aumentando las versiones de Subnet-EVM en [`go.mod`](https://github.com/ava-labs/precompile-evm/blob/hello-world-example/go.mod#L7)
y [`version.sh`](https://github.com/ava-labs/precompile-evm/blob/hello-world-example/scripts/versions.sh#L4)

### Conclusión

Ahora hemos creado una precompilación estatal desde cero con la herramienta de generación de precompilaciones. Esperamos
que te hayas divertido y hayas aprendido un poco más sobre Subnet-EVM. Ahora que has creado una precompilación estatal simple,
te instamos a que crees una propia. Si tienes una idea para una precompilación estatal que pueda ser útil para la comunidad, siéntete libre de hacer un fork de
[Subnet-EVM](https://github.com/ava-labs/subnet-evm) y crear una solicitud de extracción.
