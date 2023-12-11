---
tags: [Construir, Máquinas Virtuales]
description: Generando tu precompilado
sidebar_label: Generando tu precompilado
pagination_label: Generando tu precompilado
sidebar_position: 2
---

# Generando tu precompilado

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

En esta sección, repasaremos el proceso para generar automáticamente el código de plantilla que
puedes configurar según corresponda para tu precompilado estatal.

Primero, debemos crear la interfaz Solidity que queremos que nuestro precompilado implemente. Esta será
la interfaz de HelloWorld. Tendrá dos funciones simples, `sayHello()` y `setGreeting()`. Estas
dos funciones demostrarán la obtención y configuración, respectivamente, de un valor almacenado en el
espacio de estado del precompilado.

La función `sayHello()` es una función `view`, lo que significa que no modifica el estado del precompilado
y devuelve un resultado de tipo cadena. La función `setGreeting()` es una función cambiadora de estado, lo que significa que
modifica el estado del precompilado. La interfaz `HelloWorld` hereda la interfaz `IAllowList`
para usar la funcionalidad de lista de permitidos.

Para este tutorial, estaremos trabajando en una nueva rama en el repositorio Subnet-EVM/Precompile-EVM.

<!-- vale off -->

<Tabs groupId="evm-tabs">
<TabItem value="subnet-evm-tab" label="Subnet-EVM" default>

```bash
cd $GOPATH/src/github.com/ava-labs/subnet-evm
```

Luego cambia a una nueva rama:

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

¡Ahora tenemos una interfaz que nuestro precompilado puede implementar!
Creemos un [ABI](https://docs.soliditylang.org/en/v0.8.13/abi-spec.html#contract-abi-specification)
de nuestra interfaz Solidity.

En el mismo directorio, ejecutemos:

```shell
solc --abi ./contracts/interfaces/IHelloWorld.sol -o ./abis
```

</TabItem>
<TabItem value="precompile-evm-tab" label="Precompile-EVM"  >

```bash
cd $GOPATH/src/github.com/ava-labs/precompile-evm
```

Luego cambia a una nueva rama:

```bash
git checkout -b hello-world-stateful-precompile
```

Comenzaremos en este directorio `./contracts/`:

```bash
cd contracts/
```

Para interfaces de Precompile-EVM y otros contratos en Subnet-EVM,
se puede acceder a través del paquete `@avalabs/subnet-evm-contracts`.
Esto ya se ha agregado al archivo `package.json`.
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

¡Ahora tenemos una interfaz que nuestro precompilado puede implementar!
Creemos un [ABI](https://docs.soliditylang.org/en/v0.8.13/abi-spec.html#contract-abi-specification)
de nuestra interfaz Solidity.

En Precompile-EVM importamos contratos del paquete `@avalabs/subnet-evm-contracts`.
Para generar el ABI en Precompile-EVM, necesitamos incluir la carpeta `node_modules` para encontrar
los contratos importados con las siguientes banderas:

- `--abi`
  - Especificación ABI de los contratos.
- `--base-path path`
  - Usa la ruta dada como la raíz del árbol de origen en lugar de la raíz del sistema de archivos.
- `--include-path path`
  - Hace que un directorio fuente adicional esté disponible para la devolución de llamada de importación predeterminada. Usa esta opción si
    quieres importar contratos cuya ubicación no está fija en relación con tu árbol de origen principal;
    por ejemplo,
    bibliotecas de terceros instaladas usando un administrador de paquetes. Se puede usar varias veces.
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
    "name": "leerAllowList",
    "outputs": [
      { "internalType": "uint256", "name": "rol", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decirHola",
    "outputs": [
      { "internalType": "string", "name": "resultado", "type": "string" }
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

Como puedes ver, el ABI también contiene las funciones de la interfaz `IAllowList`. Esto se debe a que la interfaz `IHelloWorld` hereda de la interfaz `IAllowList`.

Nota: El ABI debe tener salidas con nombres para poder generar la plantilla de precompilación.

Ahora que tenemos un ABI con el que la herramienta de generación de precompilaciones puede interactuar, podemos ejecutar el siguiente comando para generar nuestros archivos de precompilación de HelloWorld.

¡Volviendo a la raíz del repositorio, ejecutemos el script de ayuda PrecompileGen:

<!-- markdownlint-disable MD013 -->

```shell
cd ..
```

Tanto Subnet-EVM como Precompile-EVM tienen el mismo script `generate_precompile.sh`. El de Precompile-EVM
instala el script de Subnet-EVM y lo ejecuta.

```bash

$ ./scripts/generate_precompile.sh --help

Usando la rama: precompile-tutorial
NOMBRE:
precompilegen - herramienta de generación de precompilaciones de subnet-evm

USO:
main [opciones globales] comando [opciones del comando] [argumentos...]

VERSIÓN:
1.10.26-estable

COMANDOS:
help, h Muestra una lista de comandos o ayuda para un comando

OPCIONES GLOBALES:

    --abi valor
          Ruta al archivo JSON del ABI del contrato a generar, - para STDIN

    --out valor
          Carpeta de salida para los archivos de precompilación generados, - para STDOUT (predeterminado =
          ./precompile/contracts/{pkg}). Los archivos de prueba no se generarán si se usa STDOUT
    --pkg valor
          Nombre del paquete Go para generar la precompilación (predeterminado = {type})
    --type valor
          Nombre de la estructura para la precompilación (predeterminado = {nombre del archivo abi})
MISCELÁNEO
    --help, -h                     (predeterminado: false)
          mostrar ayuda
    --version, -v                  (predeterminado: false)
          imprimir la versión
DERECHOS DE AUTOR:
Derechos de autor 2013-2022 Los autores de go-ethereum
```

¡Ahora generemos los archivos de plantilla de precompilación!

<!-- vale off -->

<Tabs groupId="evm-tabs">
<TabItem value="subnet-evm-tab" label="Subnet-EVM" default>

En Subnet-EVM, las implementaciones de precompilación residen en el directorio [`./precompile/contracts`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contracts). Generemos nuestra plantilla de precompilación
en el directorio `./precompile/contracts/helloworld`, donde `helloworld` es el nombre del
paquete Go en el que queremos generar la precompilación.

```bash
./scripts/generate_precompile.sh --abi ./contracts/abis/IHelloWorld.abi --type HelloWorld --pkg helloworld
```

</TabItem>
<TabItem value="precompile-evm-tab" label="Precompile-EVM"  >
Para Precompile-EVM, no necesitamos colocar los archivos en una estructura de directorios profunda. Simplemente podemos generar la
plantilla de precompilación en su propio directorio a través de la bandera `--out ./helloworld`.

```bash
./scripts/generate_precompile.sh --abi ./contracts/abis/IHelloWorld.abi --type HelloWorld --pkg helloworld --out ./helloworld
```

</TabItem>
</Tabs>

<!-- vale on -->

<!-- markdownlint-enable MD013 -->

Esto genera archivos de plantilla de precompilación `contract.go`, `contract.abi`, `config.go`, `module.go`
y `README.md`. El archivo `README.md` explica pautas generales para el desarrollo de precompilaciones.
Debes leer cuidadosamente este archivo antes de modificar la plantilla de precompilación.

```md
Hay algunos cambios que deben hacerse en el archivo generado. Cada área que requiere que agregues tu código está marcada con CUSTOM CODE para que sea fácil de encontrar y modificar.
Además, hay otros archivos que necesitas editar para activar tu precompilación.
Estas áreas están resaltadas con comentarios que dicen "ADD YOUR PRECOMPILE HERE".
Para hacer pruebas, echa un vistazo a otras pruebas de precompilación en contract_test.go y config_test.go en otras carpetas de precompilación.
Consulta el tutorial en <https://docs.avax.network/subnets/hello-world-precompile-tutorial> para obtener más información sobre el desarrollo de precompilaciones.
Pautas generales para el desarrollo de precompilaciones:
1- Establece una clave de configuración adecuada en el archivo module.go generado. Por ejemplo: "yourPrecompileConfig".
2- Lee el comentario y establece una dirección de contrato adecuada en el archivo module.go generado. Por ejemplo:
ContractAddress = common.HexToAddress("UNADIRECCIONHEXADAEQUIVOCADA")
3- Se recomienda modificar solo el código en las áreas resaltadas marcadas con "CUSTOM CODE STARTS HERE". Por lo general, los códigos personalizados solo son necesarios en esas áreas.
Modificar el código fuera de estas áreas debe hacerse con precaución y con un profundo entendimiento de cómo estos cambios pueden afectar a la EVM.
4- Establece los costos de gas en el archivo contract.go generado.
5- Importa forzosamente tu paquete de precompilación en precompile/registry/registry.go
6- Agrega tus pruebas unitarias de configuración bajo el paquete generado config_test.go
7- Agrega tus pruebas unitarias de contrato bajo el paquete generado contract_test.go
8- Además, puedes agregar una prueba de VM completa para tu precompilación en plugin/vm/vm_test.go. Consulta las pruebas de precompilación existentes para ver ejemplos.
9- Agrega tu interfaz de Solidity y contrato de prueba al directorio contracts/contracts
10- Escribe pruebas de contrato de Solidity para tu precompilación en contracts/contracts/test/
11- Escribe contrapartes de pruebas DS-Test en TypeScript para tus pruebas de Solidity en contracts/test/
12- Crea tu génesis con tu precompilación habilitada en tests/precompile/genesis/
13- Crea una prueba de extremo a extremo para tu prueba de Solidity en tests/precompile/solidity/suites.go
14- Ejecuta tus pruebas de extremo a extremo de precompilación de Solidity con './scripts/run_ginkgo.sh`
```

¡Sigamos estos pasos y creemos nuestra precompilación de HelloWorld!
