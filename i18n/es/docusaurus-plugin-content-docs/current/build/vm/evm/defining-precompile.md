---
tags: [Construir, Máquinas Virtuales]
description: En esta guía, definiremos la precompilación implementando la interfaz `HelloWorld`.
sidebar_label: Definiendo tu Precompilación
pagination_label: Definiendo tu Precompilación
sidebar_position: 3
---

# Definiendo tu Precompilación

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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

### Archivo de Eventos

El archivo de eventos contiene los eventos que la precompilación puede emitir. Este archivo se encuentra en
[`./precompile/helloworld/event.go`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contracts/helloworld/event.go) para Subnet-EVM y
[./helloworld/event.go](https://github.com/ava-labs/precompile-evm/blob/hello-world-example/helloworld/event.go) para Precompile-EVM. El archivo comienza con un comentario sobre los eventos y cómo pueden emitirse:

```go
/* NOTA: Los eventos solo se pueden emitir en funciones que cambian el estado. Por lo tanto, no se pueden usar eventos en funciones de solo lectura (view).
Los eventos generalmente se emiten al final de una función que cambia el estado con el método AddLog de StateDB. El método AddLog toma 4 argumentos:
	1. Dirección del contrato que emitió el evento.
	2. Hashes de los temas del evento.
	3. Datos no indexados codificados del evento.
	4. Número de bloque en el que se emitió el evento.
El primer argumento es la dirección del contrato que emitió el evento.
Los temas pueden tener como máximo 4 elementos, el primer tema es el hash de la firma del evento y el resto son los argumentos de evento indexados. Puede haber como máximo 3 argumentos indexados.
Los temas no se pueden desempaquetar completamente en sus valores originales ya que son hashes de 32 bytes.
Los argumentos no indexados se codifican utilizando el esquema de codificación ABI. Los argumentos no indexados se pueden desempaquetar en sus valores originales.
Antes de empaquetar el evento, debe calcular el costo de gas del evento. El costo de gas de un evento es el costo de gas base + el costo de gas de los temas + el costo de gas de los datos no indexados.
Consulte las funciones Get{EvetName}EventGasCost para obtener más detalles.
Puede usar el siguiente código para emitir un evento en sus funciones de precompilación que cambian el estado (el empaquetador generado puede ser diferente):
topics, data, err := PackMyEvent(
	topic1,
	topic2,
	data1,
	data2,
)
if err != nil {
	return nil, remainingGas, err
}
accessibleState.GetStateDB().AddLog(
	ContractAddress,
	topics,
	data,
	accessibleState.GetBlockContext().Number().Uint64(),
)
```

En este archivo, debe establecer el costo de gas de su evento e implementar la función `Get{EventName}EventGasCost`. Esta función debe tomar los datos que desea emitir y calcular el costo de gas. En este ejemplo, definimos nuestro evento de la siguiente manera y planeamos emitirlo en la función `setGreeting`:

```solidity
  event GreetingChanged(address indexed sender, string oldGreeting, string newGreeting);
```

Utilizamos cadenas arbitrarias como datos de evento no indexados, recuerda que cada evento emitido se almacena en la cadena, por lo que cargar la cantidad correcta es crítico. Calculamos el costo de gas según la longitud de la cadena para asegurarnos de estar cobrando la cantidad correcta de gas. Si estás seguro de que estás tratando con datos de longitud fija, puedes usar un costo de gas fijo para tu evento. Mostraremos cómo se pueden emitir eventos en la sección del Archivo del Contrato.

### Archivo del Contrato

El archivo del contrato contiene las funciones del contrato de precompilación que serán llamadas por la EVM. El archivo se encuentra en [`./precompile/helloworld/contract.go`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contracts/helloworld/contract.go) para Subnet-EVM y [./helloworld/contract.go](https://github.com/ava-labs/precompile-evm/blob/hello-world-example/helloworld/contract.go) para Precompile-EVM. Dado que usamos la interfaz `IAllowList`, habrá código generado automáticamente para las funciones de `AllowList` como se muestra a continuación:

```go
// GetHelloWorldAllowListStatus devuelve el rol de [dirección] para la lista HelloWorld.
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

También hay empaquetadores y desempaquetadores generados automáticamente para la ABI. Estos se utilizarán en las funciones `sayHello` y `setGreeting` para cumplir con la ABI. Estas funciones se generan automáticamente y se utilizarán en los lugares necesarios. No tienes que preocuparte por cómo lidiar con ellos, pero es bueno saber qué son.

Nota: Hubo algunos cambios en los empaquetadores de precompilación con Durango. En este ejemplo, asumimos que el contrato de precompilación HelloWorld se ha implementado antes de Durango. Necesitamos activar esta condición solo después de Durango. Si esta es una nueva precompilación y nunca se ha implementado antes de Durango, puedes activarla de inmediato eliminando la condición if.

Cada entrada de una función de contrato de precompilación tiene su propia función `Desempaquetador`, como sigue (si se implementa antes de Durango):

```go
// UnpackSetGreetingInput intenta desempaquetar [input] en el argumento de tipo cadena
// asume que [input] no incluye el selector (omite los primeros 4 bytes de la firma de la función)
// si [useStrictMode] es verdadero, devolverá un error si la longitud de [input] no es [common.HashLength]
func UnpackSetGreetingInput(input []byte, useStrictMode bool) (string, error) {
	// Inicialmente teníamos esta verificación para asegurarnos de que la entrada tuviera la longitud correcta.
	// Sin embargo, Solidity no siempre empaqueta la entrada a la longitud correcta y permite
	// que se agreguen bytes de relleno adicionales al final de la entrada. Por lo tanto, hemos eliminado
	// esta verificación con Durango. Aún necesitamos mantener esta verificación por compatibilidad con versiones anteriores.
	if useStrictMode && len(input) > common.HashLength {
		return "", ErrInputExceedsLimit
	}
	res, err := HelloWorldABI.UnpackInput("setGreeting", input, useStrictMode)
	if err != nil {
		return "", err
	}
	desempaquetado := *abi.ConvertType(res[0], new(string)).(*string)
	return desempaquetado, nil
}
```

Si esta es una nueva precompilación que se implementará después de Durango, puedes omitir el manejo del modo estricto y usar false:

```go
func UnpackSetGreetingInput(input []byte) (string, error) {
	res, err := HelloWorldABI.UnpackInput("setGreeting", input, false)
	if err != nil {
		return "", err
	}
	desempaquetado := *abi.ConvertType(res[0], new(string)).(*string)
	return desempaquetado, nil
}
```

La ABI es un formato binario y la entrada a la función del contrato de precompilación es un arreglo de bytes. La función `Desempaquetador` convierte esta entrada a un formato más fácil de usar para que podamos usarla en nuestra función.

De manera similar, hay una función `Empaquetador` para cada salida de una función del contrato de precompilación, como sigue:

```go
// PackSayHelloOutput intenta empaquetar el resultado dado de tipo cadena
// para cumplir con las salidas de la ABI.
func PackSayHelloOutput(result string) ([]byte, error) {
	return HelloWorldABI.PackOutput("sayHello", result)
}
```

Esta función convierte la salida de la función a un arreglo de bytes que cumple con la ABI y puede ser devuelto a la EVM como resultado.

#### Modificar sayHello()

El siguiente lugar para modificar es nuestra función `sayHello()`. En un paso anterior, creamos la interfaz `IHelloWorld.sol` con dos funciones `sayHello()` y `setGreeting()`. Finalmente, llegamos a implementarlas aquí. Si algún contrato llama a estas funciones desde la interfaz, la siguiente función se ejecuta. Esta función es una función simple de obtención. En `Configure()`, configuramos un mapeo con la clave `storageKey` y el valor `Hello World!`. En esta función, devolveremos el valor que se encuentre en `storageKey`. El siguiente fragmento de código se puede copiar y pegar para sobrescribir el código `setGreeting` predeterminado.

Primero, agregamos una función auxiliar para obtener el valor de saludo del stateDB, esto será útil cuando probemos nuestro contrato. Usaremos `storageKeyHash` para almacenar el valor en el almacenamiento reservado del Contrato en el stateDB.

```go
var (
  // storageKeyHash es el hash de la clave de almacenamiento "storageKey" en el almacenamiento del contrato.
	// Esto se utiliza para almacenar el valor del saludo en el almacenamiento del contrato.
	// Es importante usar una clave única aquí para evitar conflictos con otras claves de almacenamiento
	// como direcciones, AllowList, etc.
	storageKeyHash = common.BytesToHash([]byte("storageKey"))
)
// GetGreeting devuelve el valor de la clave de almacenamiento "storageKey" en el almacenamiento del contrato,
// con ceros iniciales recortados.
// Esta función se utiliza principalmente para pruebas.
func GetGreeting(stateDB contract.StateDB) string {
	// Obtener el valor establecido en el destinatario
	value := stateDB.GetState(ContractAddress, storageKeyHash)
	return string(common.TrimLeftZeroes(value.Bytes()))
}
```

Ahora podemos modificar la función `sayHello` para devolver el valor almacenado.

<!-- markdownlint-disable MD013 -->

```go
func sayHello(accessibleState contract.AccessibleState, caller common.Address, addr common.Address, input []byte, suppliedGas uint64, readOnly bool) (ret []byte, remainingGas uint64, err error) {
	if remainingGas, err = contract.DeductGas(suppliedGas, SayHelloGasCost); err != nil {
		return nil, 0, err
	}
	// EL CÓDIGO PERSONALIZADO COMIENZA AQUÍ

	// Obtener el estado actual
	currentState := accessibleState.GetStateDB()
	// Obtener el valor establecido en el destinatario
	value := GetGreeting(currentState)
	packedOutput, err := PackSayHelloOutput(value)
	if err != nil {
		return nil, remainingGas, err
	}

	// Devolver la salida empaquetada y el gas restante
	return packedOutput, remainingGas, nil
}
```

<!-- markdownlint-enable MD013 -->

#### Modificar setGreeting()

La función `setGreeting()` es una función simple de configuración. Toma como entrada `input` y estableceremos ese valor en el mapeo de estado con la clave `storageKey`. También verifica si la VM que ejecuta el precompilado está en modo de solo lectura. Si lo está, devuelve un error. Al final de una ejecución exitosa, emitirá el evento `GreetingChanged`.

También hay un código generado de `AllowList` en esa función. Este código generado verifica si la dirección del llamador es elegible para realizar esta operación que cambia el estado. Si no lo es, devuelve un error.

Agreguemos la función auxiliar para establecer el valor de saludo en la stateDB, esto será útil cuando probemos nuestro contrato.

```go
// StoreGreeting establece el valor de la clave de almacenamiento "storageKey" en el almacenamiento del contrato.
func StoreGreeting(stateDB contract.StateDB, input string) {
	inputPadded := common.LeftPadBytes([]byte(input), common.HashLength)
	inputHash := common.BytesToHash(inputPadded)

	stateDB.SetState(ContractAddress, storageKeyHash, inputHash)
}
```

El siguiente fragmento de código se puede copiar y pegar para sobrescribir el código `setGreeting()` predeterminado.

<!-- markdownlint-disable MD013 -->

```go
func setGreeting(accessibleState contract.AccessibleState, caller common.Address, addr common.Address, input []byte, suppliedGas uint64, readOnly bool) (ret []byte, remainingGas uint64, err error) {
	if remainingGas, err = contract.DeductGas(suppliedGas, SetGreetingGasCost); err != nil {
		return nil, 0, err
	}
	if readOnly {
		return nil, remainingGas, vmerrs.ErrWriteProtection
	}
	// no use el modo estricto después de Durango
	useStrictMode := !contract.IsDurangoActivated(accessibleState)
	// intenta desempaquetar [input] en los argumentos de SetGreetingInput.
	// Supone que [input] no incluye el selector
	// Puede usar la variable desempaquetada [inputStruct] en su código
	inputStruct, err := UnpackSetGreetingInput(input, useStrictMode)
	if err != nil {
		return nil, remainingGas, err
	}
	// La lista de permitidos está habilitada y SetGreeting es una función que cambia el estado.
	// Esta parte del código restringe que la función sea llamada solo por direcciones habilitadas/administradoras en la lista de permitidos.
	// Puede modificar/eliminar este código si no desea que esta función esté restringida por la lista de permitidos.
	stateDB := accessibleState.GetStateDB()
	// Verifica que el llamador esté en la lista de permitidos y, por lo tanto, tenga derecho a llamar a esta función.
	callerStatus := allowlist.GetAllowListStatus(stateDB, ContractAddress, caller)
	if !callerStatus.IsEnabled() {
		return nil, remainingGas, fmt.Errorf("%w: %s", ErrCannotSetGreeting, caller)
	}
	// el código de la lista de permitidos termina aquí.

	// EL CÓDIGO PERSONALIZADO COMIENZA AQUÍ
	// Con Durango, puedes emitir un evento en tus funciones de precompilación que cambian el estado.
	// Nota: Si has estado usando el precompilado antes de Durango, debes activarlo solo después de Durango.
	// Activar este código antes de Durango resultará en un fallo de consenso.
	// Si este es un nuevo precompilado y nunca se ha implementado antes de Durango, puedes activarlo de inmediato eliminando
	// la condición if.
	// Este ejemplo asume que el contrato de precompilación HelloWorld se ha implementado antes de Durango.
	if contract.IsDurangoActivated(accessibleState) {
		// Primero leeremos el saludo antiguo. Así que debemos cobrar el gas por leer el almacenamiento.
		if remainingGas, err = contract.DeductGas(remainingGas, contract.ReadGasCostPerSlot); err != nil {
			return nil, 0, err
		}
		oldGreeting := GetGreeting(stateDB)

		eventData := GreetingChangedEventData{
			OldGreeting: oldGreeting,
			NewGreeting: inputStruct,
		}
		topics, data, err := PackGreetingChangedEvent(caller, eventData)
		if err != nil {
			return nil, remainingGas, err
		}
		// Cobrar el gas por emitir el evento.
		eventGasCost := GetGreetingChangedEventGasCost(eventData)
		if remainingGas, err = contract.DeductGas(remainingGas, eventGasCost); err != nil {
			return nil, 0, err
		}

		// Emitir el evento
		stateDB.AddLog(
			ContractAddress,
			topics,
			data,
			accessibleState.GetBlockContext().Number().Uint64(),
		)
	}

	// setGreeting es la función de ejecución
	// "SetGreeting(name string)" y establece el storageKey
	// en la cadena devuelta por hello world
	StoreGreeting(stateDB, inputStruct)

	// Esta función no devuelve una salida, déjala como está
	packedOutput := []byte{}

	// Devuelve la salida empaquetada y el gas restante
	return packedOutput, remainingGas, nil
}
```

Nota: Eventos de precompilación introducidos con Durango. En este ejemplo, asumimos que el contrato de precompilación HelloWorld se ha implementado antes de Durango. Si este es un nuevo precompilado y se implementará después de Durango, puedes activarlo de inmediato eliminando la condición Durango (`contract.IsDurangoActivated(accessibleState)`).

<!-- markdownlint-enable MD013 -->

## Configuración de costos de gas

Configurar los costos de gas para las funciones es muy importante y debe hacerse con cuidado. Si los costos de gas se establecen demasiado bajos, las funciones pueden ser abusadas y causar ataques de denegación de servicio (DoS). Si los costos de gas se establecen demasiado altos, entonces el contrato será demasiado caro de ejecutar. Subnet-EVM tiene algunos costos de gas predefinidos para operaciones de escritura y lectura en [`precompile/contract/utils.go`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contract/utils.go#L19-L20). Para proporcionar una línea de base para los costos de gas, hemos establecido los siguientes costos de gas.

```go
// Costos de gas para precompilaciones con estado
const (
	WriteGasCostPerSlot = 20_000
	ReadGasCostPerSlot  = 5_000
)
```

`WriteGasCostPerSlot` es el costo de una escritura, como modificar una ranura de almacenamiento de estado.

`ReadGasCostPerSlot` es el costo de leer una ranura de almacenamiento de estado.

Esto debería estar en tus estimaciones de costos de gas según cuántas veces la función de precompilación hace una lectura o escritura. Por ejemplo, si el precompilado modifica la ranura de estado de su dirección de precompilado dos veces, entonces el costo de gas para esa función sería `40_000`. Sin embargo, si el precompilado realiza operaciones adicionales y requiere más poder computacional, entonces debes aumentar los costos de gas en consecuencia.

Además de estos costos de gas, también tenemos que tener en cuenta los costos de gas de AllowList. Estos son los costos de gas de leer y escribir permisos para direcciones en AllowList. Estos están definidos en [`precompile/allowlist/allowlist.go`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/allowlist/allowlist.go#L28-L29) de Subnet-EVM. Por defecto, estos se suman a los costos de gas predeterminados de las funciones de cambio de estado (SetGreeting) del precompilado. Esto significa que estas funciones costarán un gas adicional de `ReadAllowListGasCost` para leer los permisos del almacenamiento. Si no planeas leer los permisos del almacenamiento, puedes omitir esto.

Ahora volviendo a nuestro `/helloworld/contract.go`, podemos modificar los costos de gas de nuestra función de precompilación. Busca (`CTRL F`) `SET A GAS COST HERE` para ubicar el código de costo de gas predeterminado.

```go
SayHelloGasCost    uint64 = 0                                  // ESTABLECER UN COSTO DE GAS AQUÍ
SetGreetingGasCost uint64 = 0 + allowlist.ReadAllowListGasCost // ESTABLECER UN COSTO DE GAS AQUÍ
```

Obtenemos y establecemos nuestro saludo con `sayHello()` y `setGreeting()` en una ranura respectivamente, por lo que podemos definir los costos de gas de la siguiente manera. También leemos permisos de la AllowList en `setGreeting()`, por lo que mantenemos `allowlist.ReadAllowListGasCost`.

```go
SayHelloGasCost    uint64 = contract.ReadGasCostPerSlot
SetGreetingGasCost uint64 = contract.WriteGasCostPerSlot + allowlist.ReadAllowListGasCost
```

## Registrando tu precompilación

Deberíamos registrar nuestro paquete de precompilación en el Subnet-EVM para que sea descubierto por otros paquetes. Nuestro archivo `Module` contiene una función `init()` que registra nuestra precompilación. `init()` se llama cuando se importa el paquete. Deberíamos registrar nuestra precompilación en un paquete común para que pueda ser importada por otros paquetes.

<!-- vale off -->

<Tabs groupId="evm-tabs">

<TabItem value="subnet-evm-tab" label="Subnet-EVM" default>

Para Subnet-EVM tenemos un registro de precompilaciones en [`/precompile/registry/registry.go`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/registry/registry.go).
Este registro importa forzosamente precompilaciones de otros paquetes, por ejemplo:

```go
// Importaciones forzadas de cada precompilación para asegurar que la función init de cada precompilación se ejecute y se registre a sí misma
// con el registro.
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

El registro en sí también se importa forzosamente en [`/plugin/evm/vm.go](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/plugin/evm/vm.go#L50).
Esto asegura que el registro se importe y las precompilaciones se registren.

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
