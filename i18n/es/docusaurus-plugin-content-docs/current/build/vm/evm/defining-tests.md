---
tags: [Construir, Máquinas Virtuales]
description: En este tutorial, repasaremos las diferentes formas en que podemos escribir casos de prueba para nuestro precompilador con estado.
sidebar_label: Escribiendo Casos de Prueba
pagination_label: Escribiendo Casos de Prueba
sidebar_position: 4
---

# Escribiendo Casos de Prueba

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

En esta sección, repasaremos las diferentes formas en que podemos escribir casos de prueba para nuestro precompilador con estado.

## Agregando Pruebas de Configuración

La herramienta de generación de precompiladores también genera esqueletos para pruebas unitarias. Las pruebas de configuración generadas estarán
en [`./precompile/contracts/helloworld/config_test.go`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contracts/helloworld/config_test.go)
para Subnet-EVM y [`./helloworld/config_test.go`](https://github.com/ava-labs/precompile-evm/blob/hello-world-example/helloworld/config_test.go)
para Precompile-EVM.
Principalmente, hay dos funciones que necesitamos probar: `Verify` y `Equal`. `Verify` verifica si el precompilador está configurado correctamente. `Equal`
verifica si el precompilador es igual a otro precompilador. Las pruebas generadas de `Verify` contienen un caso válido.
Puedes agregar más casos inválidos según tu implementación. Las pruebas de `Equal` generan algunos
casos inválidos para probar diferentes marcas de tiempo, tipos y casos de AllowList.
Puedes verificar cada archivo `config_test.go` para otros precompiladores
en el directorio [`./precompile/contracts`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contracts/)
de Subnet-EVM para más ejemplos.

## Agregando Pruebas de Contrato

La herramienta también genera pruebas de contrato para asegurarse de que nuestro precompilador funcione correctamente. Las pruebas generadas incluyen casos para probar capacidades de lista de permitidos, costos de gas y llamadas a funciones en modo de solo lectura.
Puedes verificar otros archivos `contract_test.go` en `/precompile/contracts`. Las pruebas de contrato de Hello World
estarán en [`./precompile/contracts/helloworld/contract_test.go`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contracts/helloworld/contract_test.go)
para Subnet-EVM y
[`./helloworld/contract_test.go`](https://github.com/ava-labs/precompile-evm/blob/hello-world-example/helloworld/contract_test.go)
para Precompile-EVM.
También agregaremos más pruebas para cubrir las funcionalidades de `sayHello()` y `setGreeting()`.
Las pruebas de contrato se definen en una estructura estándar que cada prueba
puede personalizar según sus necesidades. La estructura de la prueba es la siguiente:

```go
// PrecompileTest es un caso de prueba para un precompilador
type PrecompileTest struct {
	// Caller es la dirección del llamador del precompilador
	Caller common.Address
	// Input son los bytes de entrada sin procesar para el precompilador
	Input []byte
	// InputFn es una función que devuelve los bytes de entrada sin procesar para el precompilador
	// Si se especifica, se ignorará Input.
	InputFn func(t *testing.T) []byte
	// SuppliedGas es la cantidad de gas suministrado al precompilador
	SuppliedGas uint64
	// ReadOnly es si el precompilador debe ser llamado en modo de solo lectura
	// Si es verdadero, el precompilador no debe modificar el estado.
	ReadOnly bool
	// Config es la configuración a usar para el precompilador
	// Debe ser la misma configuración de precompilador que se usa en el
	// configurador del precompilador.
	// Si es nulo, no se llamará a Configure.
	Config precompileconfig.Config
	// BeforeHook se llama antes de que se llame al precompilador.
	BeforeHook func(t *testing.T, state contract.StateDB)
	// AfterHook se llama después de que se llame al precompilador.
	AfterHook func(t *testing.T, state contract.StateDB)
	// ExpectedRes son los bytes de resultado sin procesar esperados devueltos por el precompilador
	ExpectedRes []byte
	// ExpectedErr es el error esperado devuelto por el precompilador
	ExpectedErr string
	// BlockNumber es el número de bloque a usar para el contexto de bloque del precompilador
	BlockNumber int64
}
```

Cada prueba puede poblar los campos de la estructura `PrecompileTest` para personalizar la prueba.
Esta prueba utiliza una función auxiliar de AllowList
`allowlist.RunPrecompileWithAllowListTests(t, Module, state.NewTestStateDB, tests)`
que puede ejecutar todas las pruebas especificadas más suites de pruebas de AllowList. Si no planeas usar AllowList,
puedes ejecutarlas directamente de la siguiente manera:

```go
	for name, test := range tests {
		t.Run(name, func(t *testing.T) {
			test.Run(t, module, newStateDB(t))
		})
	}
```

## Agregando Pruebas de VM (Opcional)

Esto solo es aplicable para bifurcaciones directas de Subnet-EVM, ya que los archivos de prueba no se exportan directamente en
Golang. Si usas Precompile-EVM, puedes omitir este paso.

Las pruebas de VM son pruebas que ejecutan el precompilador llamándolo a través de la Subnet-EVM. Estas son las pruebas más
completas que podemos ejecutar. Si tu precompilador modifica cómo funciona la Subnet-EVM, por ejemplo,
cambiando las reglas de la cadena de bloques, debes agregar una prueba de VM. Por ejemplo, puedes echar un vistazo a la
función TestRewardManagerPrecompileSetRewardAddress en [aquí](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/plugin/evm/vm_test.go#L2675).
Para este ejemplo de Hello World, no modificamos ninguna regla de la Subnet-EVM, así que no necesitamos agregar pruebas de VM.

## Agregando Contratos de Prueba en Solidity

Agreguemos nuestro contrato de prueba a `./contracts/contracts`. ¡Este contrato inteligente nos permite interactuar
con nuestro precompilador! Convertimos la dirección del precompilador `HelloWorld` a la interfaz `IHelloWorld`. Al
hacerlo, `helloWorld` es ahora un contrato de tipo `IHelloWorld` y cuando llamamos a cualquier función en
ese contrato, seremos redirigidos a la dirección del precompilador HelloWorld. El siguiente fragmento de código
se puede copiar y pegar en un nuevo archivo llamado `ExampleHelloWorld.sol`:

```sol
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./IHelloWorld.sol";
// ExampleHelloWorld muestra cómo se puede usar el precompilador HelloWorld en un contrato inteligente.
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

El precompilador Hello World es un contrato diferente al ExampleHelloWorld y tiene una dirección diferente.
Dado que el precompilador usa AllowList para un acceso permitido,
cualquier llamada al precompilador, incluida desde ExampleHelloWorld, será denegada a menos que
el llamador se agregue a la AllowList.

:::

Ten en cuenta que este contrato es simplemente un envoltorio y está llamando a las funciones del precompilador.
La razón por la que agregamos otro contrato inteligente de ejemplo es tener pruebas más simples y sin estado.

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

Para Precompile-EVM, debes importar AllowListTest con el paquete NPM @avalabs/subnet-evm-contracts:

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

## Adding DS-Test Case

Ah, entiendo. Aquí está la traducción manteniendo el enlace original:

Podemos ahora activar este contrato de prueba a través de pruebas de hardhat.
El script de prueba utiliza el marco de pruebas test de Subnet-EVM en ./contracts/test.
Puedes encontrar más información sobre el marco de pruebas
[aquí](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/contracts/test/utils.ts).

<!-- vale off -->

<Tabs groupId="evm-tabs">

<TabItem value="subnet-evm-tab" label="Subnet-EVM" default>

El script de prueba se ve así:

```ts
// (c) 2019-2022, Ava Labs, Inc. All rights reserved.
// See the file LICENSE for licensing terms.

import { ethers } from "hardhat";
import { test } from "./utils";

// make sure this is always an admin for hello world precompile
const ADMIN_ADDRESS = "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC";
const HELLO_WORLD_ADDRESS = "0x0300000000000000000000000000000000000000";

describe("ExampleHelloWorldTest", function () {
  this.timeout("30s");

  beforeEach("Setup DS-Test contract", async function () {
    const signer = await ethers.getSigner(ADMIN_ADDRESS);
    const helloWorldPromise = ethers.getContractAt(
      "IHelloWorld",
      HELLO_WORLD_ADDRESS,
      signer
    );

    return ethers
      .getContractFactory("ExampleHelloWorldTest", { signer })
      .then((factory) => factory.deploy())
      .then((contract) => {
        this.testContract = contract;
        return contract.deployed().then(() => contract);
      })
      .then(() => Promise.all([helloWorldPromise]))
      .then(([helloWorld]) => helloWorld.setAdmin(this.testContract.address))
      .then((tx) => tx.wait());
  });

  test("should gets default hello world", ["step_getDefaultHelloWorld"]);

  test(
    "should not set greeting before enabled",
    "step_doesNotSetGreetingBeforeEnabled"
  );

  test(
    "should set and get greeting with enabled account",
    "step_setAndGetGreeting"
  );
});
```

</TabItem>
<TabItem value="precompile-evm-tab" label="Precompile-EVM"  >
The test script looks like this:

```ts
// (c) 2019-2022, Ava Labs, Inc. All rights reserved.
// See the file LICENSE for licensing terms.

import { ethers } from "hardhat";
import { test } from "@avalabs/subnet-evm-contracts";

// make sure this is always an admin for hello world precompile
const ADMIN_ADDRESS = "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC";
const HELLO_WORLD_ADDRESS = "0x0300000000000000000000000000000000000000";

describe("ExampleHelloWorldTest", function () {
  this.timeout("30s");

  beforeEach("Setup DS-Test contract", async function () {
    const signer = await ethers.getSigner(ADMIN_ADDRESS);
    const helloWorldPromise = ethers.getContractAt(
      "IHelloWorld",
      HELLO_WORLD_ADDRESS,
      signer
    );

    return ethers
      .getContractFactory("ExampleHelloWorldTest", { signer })
      .then((factory) => factory.deploy())
      .then((contract) => {
        this.testContract = contract;
        return contract.deployed().then(() => contract);
      })
      .then(() => Promise.all([helloWorldPromise]))
      .then(([helloWorld]) => helloWorld.setAdmin(this.testContract.address))
      .then((tx) => tx.wait());
  });

  test("should gets default hello world", ["step_getDefaultHelloWorld"]);

  test(
    "should not set greeting before enabled",
    "step_doesNotSetGreetingBeforeEnabled"
  );

  test(
    "should set and get greeting with enabled account",
    "step_setAndGetGreeting"
  );
});
```

</TabItem>
</Tabs>

<!-- vale on -->
