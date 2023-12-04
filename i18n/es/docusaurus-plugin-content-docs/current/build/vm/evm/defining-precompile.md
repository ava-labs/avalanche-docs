---
tags: [Construir, Máquinas Virtuales]
description: En esta guía, definiremos la precompilación implementando la interfaz `HelloWorld`.
sidebar_label: Definiendo tu Precompilación
pagination_label: Definiendo tu Precompilación
sidebar_position: 3
---

# Definiendo tu Precompilación

importar Tabs desde '@theme/Tabs';
importar TabItem desde '@theme/TabItem';

Ahora que hemos autogenerado el código de plantilla requerido para nuestra precompilación, vamos a escribir la lógica de la precompilación en sí.

## Configurando la Clave de Configuración

Vamos a saltar al archivo `helloworld/module.go` primero. Este archivo contiene la definición del módulo para nuestra precompilación. Puedes ver que la `ConfigKey` se establece en algún valor predeterminado de `helloWorldConfig`. Esta clave debe ser única para la precompilación. Esta clave de configuración determina qué clave JSON usar al leer la configuración de la precompilación desde el archivo JSON de actualización/génesis. En este caso, la clave de configuración es `helloWorldConfig` y la configuración JSON debería verse así:

```json
{
  "helloWorldConfig": {
    "blockTimestamp": 0
		...
  }
}
```

## Configurando la Dirección del Contrato

En el archivo `helloworld/module.go` puedes ver que la `ContractAddress` se establece en algún valor predeterminado. Esto debería cambiarse a una dirección adecuada para tu precompilación. La dirección debe ser única para la precompilación. Hay un registro de direcciones de precompilación en [`precompile/registry/registry.go`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/registry/registry.go). Una lista de direcciones se especifica en los comentarios bajo este archivo. Modifica el valor predeterminado para que sea la siguiente dirección de precompilación estatal disponible para el usuario. Para bifurcaciones de Subnet-EVM o Precompile-EVM, los usuarios deben comenzar en `0x0300000000000000000000000000000000000000` para asegurarse de que sus propias modificaciones no entren en conflicto con precompilaciones estatales que puedan agregarse a Subnet-EVM en el futuro. Debes elegir una dirección que aún no esté tomada.

```go
// Esta lista se mantiene solo como referencia. Las direcciones reales se definen en los paquetes respectivos de las precompilaciones.
// Nota: es importante que ninguna de estas direcciones entre en conflicto entre sí o con cualquier otra precompilación
// en core/vm/contracts.go.
// Las primeras precompilaciones estatales se agregaron en coreth para admitir nativeAssetCall y nativeAssetBalance. Nuevas precompilaciones estatales
// que se originan en coreth continuarán en este prefijo, por lo que reservamos este rango en subnet-evm para que puedan migrarse a
// subnet-evm sin problemas.
// Estas comienzan en la dirección: 0x0100000000000000000000000000000000000000 y se incrementarán en 1.
// Las precompilaciones opcionales implementadas en subnet-evm comienzan en 0x0200000000000000000000000000000000000000 y se incrementarán en 1
// desde aquí para reducir el riesgo de conflictos.
// Para bifurcaciones de subnet-evm, los usuarios deben comenzar en 0x0300000000000000000000000000000000000000 para asegurarse
// de que sus propias modificaciones no entren en conflicto con precompilaciones estatales que puedan agregarse a subnet-evm
// en el futuro.
// ContractDeployerAllowListAddress = common.HexToAddress("0x0200000000000000000000000000000000000000")
// ContractNativeMinterAddress      = common.HexToAddress("0x0200000000000000000000000000000000000001")
// TxAllowListAddress               = common.HexToAddress("0x0200000000000000000000000000000000000002")
// FeeManagerAddress                = common.HexToAddress("0x0200000000000000000000000000000000000003")
// RewardManagerAddress             = common.HexToAddress("0x0200000000000000000000000000000000000004")
// HelloWorldAddress                = common.HexToAddress("0x0300000000000000000000000000000000000000")
// AGREGA TU PRECOMPILACIÓN AQUÍ
// {TuPrecompilación}Address          = common.HexToAddress("0x03000000000000000000000000000000000000??")
```

No olvides actualizar la variable real `ContractAddress` en `module.go` a la dirección que elegiste. Debería verse así:

```go
// ContractAddress es la dirección definida del contrato de precompilación.
// Esto debe ser único entre todos los contratos de precompilación.
// Consulta params/precompile_modules.go para ver los contratos de precompilación registrados y más información.
var ContractAddress = common.HexToAddress("0x0300000000000000000000000000000000000000")
```

Ahora, cuando Subnet-EVM vea la `helloworld.ContractAddress` como entrada al ejecutar [`CALL`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/core/vm/evm.go#L284), [`CALLCODE`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/core/vm/evm.go#L355), [`DELEGATECALL`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/core/vm/evm.go#L396), [`STATICCALL`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/core/vm/evm.go#L445), puede ejecutar la precompilación si la precompilación está habilitada.

## Agregando Código Personalizado

Busca (`CTRL F`) en todo el archivo con `CUSTOM CODE STARTS HERE` para encontrar las áreas en el paquete de precompilación que necesitas modificar. Debes comenzar con el bloque de código de importaciones de referencia.

### Archivo del Módulo

El archivo del módulo contiene información fundamental sobre la precompilación. Esto incluye la clave para la precompilación, la dirección de la precompilación y un configurador. Este archivo se encuentra en [`./precompile/helloworld/module.go`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contracts/helloworld/module.go) para Subnet-EVM y [./helloworld/module.go](https://github.com/ava-labs/precompile-evm/blob/hello-world-example/helloworld/module.go) para Precompile-EVM.

Este archivo define el módulo para la precompilación. El módulo se utiliza para registrar la precompilación en el registro de precompilaciones. El registro de precompilaciones se utiliza para leer configuraciones y habilitar la precompilación. El registro se realiza en la función `init()` del archivo del módulo. `MakeConfig()` se utiliza para crear una nueva instancia para la configuración de la precompilación. Esto se utilizará en la lógica personalizada de Unmarshal/Marshal. No es necesario anular estas funciones.

#### Configure()

El archivo del módulo contiene un `configurador` que implementa la interfaz `contract.Configurator`. Esta interfaz incluye una función `Configure()` utilizada para configurar la precompilación y establecer el estado inicial de la precompilación. Esta función se llama cuando se habilita la precompilación. Esto se usa típicamente para leer de una configuración dada en JSON de actualización/génesis y establece el estado inicial de la precompilación en consecuencia. Esta función también llama a `AllowListConfig.Configure()` para invocar la configuración de AllowList como último paso. Debes dejarlo como está si quieres usar AllowList. Puedes modificar esta función para tu lógica personalizada. Puedes volver a esta función más tarde después de haber finalizado la implementación de la configuración de la precompilación.

### Archivo de Configuración



El archivo de configuración contiene la configuración para la precompilación. Este archivo se encuentra en
[`./precompile/helloworld/config.go`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contracts/helloworld/config.go)
para Subnet-EVM y
[./helloworld/config.go](https://github.com/ava-labs/precompile-evm/blob/hello-world-example/helloworld/config.go)
para Precompile-EVM.
Este archivo contiene la estructura `Config`, que implementa la interfaz `precompileconfig.Config`.
Tiene algunas estructuras incrustadas como `precompileconfig.Upgrade`. `Upgrade` se utiliza para habilitar
actualizaciones para la precompilación. Contiene `BlockTimestamp` y `Disable` para habilitar/deshabilitar
actualizaciones. `BlockTimestamp` es la marca de tiempo del bloque cuando se activará la actualización.
`Disable` se utiliza para deshabilitar la actualización. Si utiliza `AllowList` para la precompilación, también hay
`allowlist.AllowListConfig` incrustado en la estructura `Config`. `AllowListConfig` se utiliza para especificar roles iniciales
para direcciones especificadas. Si tiene campos personalizados en su configuración de precompilación, puede agregarlos
aquí. Estos campos personalizados se leerán desde JSON de actualización/génesis y se establecerán en la configuración de precompilación.

```go
// Config implementa la interfaz precompileconfig.Config y
// agrega configuración específica para HelloWorld.
type Config struct {
	allowlist.AllowListConfig
	precompileconfig.Upgrade
}
```

#### Verify()

`Verify()` se llama al inicio y un error se trata como fatal. El código generado contiene una llamada
a `AllowListConfig.Verify()` para verificar la `AllowListConfig`. Puede dejar eso como está y comenzar
a agregar su propio código de verificación personalizado después de eso.

Podemos dejar esta función como está por ahora porque no hay una configuración personalizada no válida para el `Config`.

```go
// Verify intenta verificar Config y devuelve un error en consecuencia.
func (c *Config) Verify() error {
	// Verificar AllowList primero
	if err := c.AllowListConfig.Verify(); err != nil {
		return err
	}

	// EL CÓDIGO PERSONALIZADO COMIENZA AQUÍ
	// Agregue su propio código de verificación personalizado para Config aquí
	// y devuelva un error en consecuencia
	return nil
}
```

#### Equal()

A continuación, vemos `Equal()`. Esta función determina si dos configuraciones de precompilación son iguales. Esto se usa
para determinar si la precompilación necesita ser actualizada. Hay algún código predeterminado que se genera para
verificar la igualdad de `Upgrade` y `AllowListConfig`.

<!-- markdownlint-disable MD013 -->

```go
// Equal devuelve verdadero si [s] es un [*Config] y se ha configurado de manera idéntica a [c].
func (c *Config) Equal(s precompileconfig.Config) bool {
	// typecast antes de la comparación
	other, ok := (s).(*Config)
	if !ok {
		return false
	}
	// EL CÓDIGO PERSONALIZADO COMIENZA AQUÍ
	// modifique este booleano en consecuencia con su Config personalizado, para verificar si [other] y el actual [c] son iguales
	// si Config contiene solo Upgrade y AllowListConfig, puede omitir modificarlo.
	equals := c.Upgrade.Equal(&other.Upgrade) && c.AllowListConfig.Equal(&other.AllowListConfig)
	return equals
}
```

<!-- markdownlint-enable MD013 -->

Podemos dejar esta función como está ya que verificamos la igualdad de `Upgrade` y `AllowListConfig` que son
los únicos campos que tiene la estructura `Config`.

### Modificar Configure()

Ahora podemos volver a `Configure()` en `module.go` ya que terminamos de implementar la estructura `Config`.
Esta función configura el `state` con la
configuración inicial en `blockTimestamp` cuando la precompilación está habilitada.
En el ejemplo de HelloWorld, queremos configurar un
mapeo de clave-valor predeterminado en el estado donde la clave es `storageKey` y el valor es `Hello World!`. El
`StateDB` nos permite almacenar un mapeo de clave-valor de hashes de 32 bytes. El siguiente fragmento de código se puede
copiar y pegar para sobrescribir el código de `Configure()` por defecto.

```go
const defaultGreeting = "Hello World!"

// Configure configura [state] con la [cfg] precompileconfig dada.
// Esta función es llamada por el EVM una vez por activación del contrato de precompilación.
// Puede usar esta función para configurar el estado inicial de su contrato de precompilación,
// utilizando la configuración [cfg] y el estado [state].
func (*configurator) Configure(chainConfig contract.ChainConfig, cfg precompileconfig.Config, state contract.StateDB, _ contract.BlockContext) error {
	config, ok := cfg.(*Config)
	if !ok {
		return fmt.Errorf("configuración incorrecta %T: %v", config, config)
	}
	// EL CÓDIGO PERSONALIZADO COMIENZA AQUÍ

	// Esto se llamará en el primer bloque donde la precompilación estatal de HelloWorld está habilitada.
	// 1) Si BlockTimestamp es nulo, esto no se llamará
	// 2) Si BlockTimestamp es 0, esto se llamará al configurar el bloque génesis
	// 3) Si BlockTimestamp es 1000, esto se llamará al procesar el primer bloque
	// cuya marca de tiempo es >= 1000
	//
	// Establecer el valor inicial bajo [common.BytesToHash([]byte("storageKey")] a "Hello World!"
	StoreGreeting(state, defaultGreeting)
	// AllowList está activado para esta precompilación. Configurando direcciones de lista blanca aquí.
	return config.AllowListConfig.Configure(state, ContractAddress)
}
```

### Archivo del Contrato

El archivo del contrato contiene las funciones del contrato de precompilación que serán llamadas por el EVM. El
archivo se encuentra en [`./precompile/helloworld/contract.go`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contracts/helloworld/contract.go)
para Subnet-EVM y
[./helloworld/contract.go](https://github.com/ava-labs/precompile-evm/blob/hello-world-example/helloworld/contract.go)
para Precompile-EVM.
Dado que usamos la interfaz `IAllowList`, habrá código generado automáticamente para las funciones `AllowList`
como se muestra a continuación:

```go
// GetHelloWorldAllowListStatus devuelve el rol de [address] para la lista HelloWorld.
func GetHelloWorldAllowListStatus(stateDB contract.StateDB, address common.Address) allowlist.Role {
	return allowlist.GetAllowListStatus(stateDB, ContractAddress, address)
}

// SetHelloWorldAllowListStatus establece los permisos de [address] a [role] para la
// lista HelloWorld. Asume que [role] ya ha sido verificado como válido.
// Esto almacena el [role] en el almacenamiento del contrato con dirección [ContractAddress]
// y hash [address]. Significa que cualquier reutilización de la clave [address] para un valor diferente
// entra en conflicto con el mismo slot [role] almacenado.
// Las implementaciones de precompilación deben usar una clave diferente a [address] para su almacenamiento.
func SetHelloWorldAllowListStatus(stateDB contract.StateDB, address common.Address, role allowlist.Role) {
	allowlist.SetAllowListRole(stateDB, ContractAddress, address, role)
}
```

Estos serán útiles para usar el ayudante de AllowList de precompilación en nuestras funciones.

#### Packers y Unpackers

También hay Packers y Unpackers generados automáticamente para el ABI. Estos se utilizarán en las funciones `sayHello` y
`setGreeting` para comodidad del ABI.
Estas funciones se generan automáticamente
y se utilizarán en los lugares necesarios en consecuencia.
No necesita preocuparse por cómo lidiar con ellos, pero es bueno saber qué son.

Cada entrada de una función de contrato de precompilación tiene su propia función `Unpacker` de la siguiente manera:

```go
const (
	// Gas cost for the sayHello function
	SayHelloGasCost = 10000

	// Gas cost for the setGreeting function
	SetGreetingGasCost = 50000
)
```

These gas costs can be adjusted based on the complexity and resource consumption of the functions. It's important to carefully consider the gas costs to ensure the contract is secure and efficient.

```go
// Costos de gas para precompilaciones estatales
const (
	WriteGasCostPerSlot = 20_000
	ReadGasCostPerSlot  = 5_000
)
```

`WriteGasCostPerSlot` es el costo de una escritura, como modificar un espacio de almacenamiento de estado.

`ReadGasCostPerSlot` es el costo de leer un espacio de almacenamiento de estado.

Esto debe tenerse en cuenta en tus estimaciones de costo de gas en función de cuántas veces la función de precompilación hace una lectura o escritura. Por ejemplo, si la precompilación modifica el espacio de estado de su dirección de precompilación dos veces, entonces el costo de gas para esa función sería `40_000`. Sin embargo, si la precompilación realiza operaciones adicionales y requiere más poder computacional, entonces debes aumentar los costos de gas en consecuencia.

Además de estos costos de gas, también debemos tener en cuenta los costos de gas de AllowList. Estos son los costos de gas de leer y escribir permisos para direcciones en AllowList. Estos están definidos en [`precompile/allowlist/allowlist.go`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/allowlist/allowlist.go#L28-L29) de Subnet-EVM. Por defecto, se suman a los costos de gas predeterminados de las funciones de cambio de estado (SetGreeting) de la precompilación. Esto significa que estas funciones costarán un gas adicional de `ReadAllowListGasCost` para leer permisos del almacenamiento. Si no planeas leer permisos del almacenamiento, puedes omitir estos.

Ahora volviendo a nuestro `/helloworld/contract.go`, podemos modificar los costos de gas de nuestra función de precompilación. Busca (`CTRL F`) `SET A GAS COST HERE` para ubicar el código de costo de gas predeterminado.

```go
SayHelloGasCost    uint64 = 0                                  // SET A GAS COST HERE
SetGreetingGasCost uint64 = 0 + allowlist.ReadAllowListGasCost // SET A GAS COST HERE
```

Obtenemos y establecemos nuestro saludo con `sayHello()` y `setGreeting()` en un espacio de almacenamiento respectivamente, por lo que podemos definir los costos de gas de la siguiente manera. También leemos permisos de AllowList en `setGreeting()`, así que mantenemos `allowlist.ReadAllowListGasCost`.

```go
SayHelloGasCost    uint64 = contract.ReadGasCostPerSlot
SetGreetingGasCost uint64 = contract.WriteGasCostPerSlot + allowlist.ReadAllowListGasCost
```

## Registrando tu Precompilación

Debemos registrar nuestro paquete de precompilación en Subnet-EVM para que sea descubierto por otros paquetes. Nuestro archivo `Module` contiene una función `init()` que registra nuestra precompilación. `init()` se llama cuando se importa el paquete. Debemos registrar nuestra precompilación en un paquete común para que pueda ser importada por otros paquetes.

<!-- vale off -->

<Tabs groupId="evm-tabs">

<TabItem value="subnet-evm-tab" label="Subnet-EVM" default>

Para Subnet-EVM tenemos un registro de precompilaciones en [`/precompile/registry/registry.go`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/registry/registry.go).
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
```

<!-- vale off -->

El registro en sí también es importado forzosamente por [`/plugin/evm/vm.go](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/plugin/evm/vm.go#L50).
Esto asegura que el registro sea importado y las precompilaciones sean registradas.

<!-- vale on -->

</TabItem>
<TabItem value="precompile-evm-tab" label="Precompile-EVM"  >

Para Precompile-EVM hay un archivo [`plugin/main.go`](https://github.com/ava-labs/precompile-evm/blob/hello-world-example/plugin/main.go)
en Precompile-EVM que orquesta este registro de precompilaciones.

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
