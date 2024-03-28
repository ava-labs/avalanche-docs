---
tags: [Construir, Subredes, Durango]
description: Cómo actualizar las precompilaciones de Subnet existentes para Durango
sidebar_label: Actualizar una Subnet para Durango
pagination_label: Actualizar precompilaciones de Subnet para Durango
sidebar_position: 1
---

# Cómo actualizar tus precompilaciones y Subnet-EVM para Durango

## Introducción

Durango se activará en la Mainnet de Avalanche a las 11 AM ET (4 PM UTC) del miércoles 6 de marzo de 2024. Subnet-EVM introduce un conjunto de nuevas características y cambios incompatibles con versiones anteriores con la actualización de red Durango. Esta guía te guiará a través del proceso de actualización de tu Subnet-EVM y precompilaciones para la actualización de red Durango. La actualización de red Durango introduce nuevas características y mejoras a la plataforma Avalanche y Subnet-EVM. Esta guía te ayudará a asegurarte de que tu Subnet-EVM y precompilaciones sean compatibles con la actualización de red Durango.

Nota: Subnet-EVM ya realiza estas actualizaciones en precompilaciones nativas estatales. Esta guía es para usuarios que tienen precompilaciones personalizadas y necesitan actualizarlas para Durango.

Durango introduce los siguientes cambios en Subnet-EVM:

- Mensajería de Warp Avalanche
- Eventos en precompilaciones
- Rol de administrador
- Modo no estricto
- Actualización de Shanghai [(ACP-24)](https://github.com/avalanche-foundation/ACPs/blob/main/ACPs/24-shanghai-eips.md)
  - La actualización de Shanghai se activará con Durango sin ninguna modificación adicional en Subnet-EVM.

## Mensajería de Warp Avalanche

La Mensajería de Warp Avalanche (AWM) es una nueva característica introducida con la actualización de red Durango. Permite la comunicación nativa entre Subnets y permite a los desarrolladores de Máquinas Virtuales (VM) implementar protocolos de comunicación arbitrarios entre cualquier par de Subnets. Para obtener más información sobre AWM, consulta [aquí](/build/cross-chain/awm/overview.md).

La precompilación de Warp debe estar habilitada para las Subnets después de Durango. Para obtener más información sobre la precompilación y la activación, consulta [aquí](/build/subnet/upgrade/customize-a-subnet.md#avalanche-warp-messaging)

## Eventos

Las precompilaciones nativas de Subnet-EVM comenzarán a emitir eventos con la actualización de red Durango. Esto te permitirá escuchar eventos emitidos por precompilaciones nativas de Subnet-EVM. Se introducirán los siguientes eventos:

- `event RoleSet(uint256 indexed role, address indexed account, address indexed sender, uint256 oldRole)`: Este evento se emitirá cuando se establece un rol para una cuenta. Las precompilaciones que utilizan la interfaz `IAllowList` emitirán este evento sin requerir ningún cambio. El evento contiene el rol, la cuenta, el remitente como parámetros indexados y el rol anterior como parámetro no indexado.
- `event FeeConfigChanged(address indexed sender, FeeConfig oldFeeConfig, FeeConfig newFeeConfig)`: Este evento se emitirá cuando se cambia la configuración de tarifas en la precompilación `FeeManager`. El evento contiene el remitente como parámetro indexado y la configuración de tarifas anterior y nueva como parámetros no indexados.
- `event NativeCoinMinted(address indexed sender, address indexed recipient, uint256 amount)`: Este evento se emitirá cuando se crean nuevas monedas nativas. El evento contiene el remitente, el destinatario como parámetros indexados y la cantidad como parámetro no indexado.
- `event RewardAddressChanged(address indexed sender, address indexed oldRewardAddress, address indexed newRewardAddress)`: Este evento se emitirá cuando se cambia la dirección de recompensa en la precompilación `RewardManager`. El evento contiene el remitente, las direcciones de recompensa antiguas y nuevas como parámetros no indexados.
- `event FeeRecipientsAllowed(address indexed sender)`: Este evento se emitirá cuando se permiten los destinatarios de tarifas en la precompilación `RewardManager`. El evento contiene el remitente como parámetro indexado.
- `event RewardsDisabled(address indexed sender)`: Este evento se emitirá cuando las recompensas están desactivadas en la precompilación `RewardManager`. El evento contiene el remitente como parámetro indexado.

### Eventos personalizados

Los eventos mencionados anteriormente ya se han introducido y se manejan en precompilaciones nativas de Subnet-EVM. Si tienes una precompilación personalizada, puedes comenzar a emitir tus eventos personalizados utilizando la activación de Durango. Para hacer esto, puedes definir tu evento personalizado en tu interfaz de Solidity y regenerar las vinculaciones de go usando la herramienta `precompilegen`, para obtener más información, consulta [aquí](/build/vm/evm/generate-precompile.md).

Por lo general, generarás un archivo `event.go` además de tus archivos de precompilación existentes. Debes implementar cómo emitir tus eventos y los costos de gas de tus eventos, como en el [ejemplo de hello world](/build/vm/evm/defining-precompile.md#event-file). En esta guía, utilizaremos el ejemplo de hello world para demostrar cómo emitir eventos personalizados. El evento que se introducirá es:

```solidity
event GreetingChanged(address indexed sender, string oldGreeting, string newGreeting)
```

Se emitirá cuando se cambie el saludo en la precompilación de hello world. Puedes encontrar la precompilación de hello world [aquí](https://github.com/ava-labs/subnet-evm/tree/helloworld-official-tutorial-v2/precompile/contracts/helloworld). También asumimos que la precompilación de hello world ya está desplegada antes de Durango y la estaremos actualizando para Durango.

#### Ajuste de los costos de gas

Ajustar los costos de gas para tus eventos personalizados es muy importante. Los eventos emitidos se escriben en estado y consumen recursos. Debes asegurarte de cobrar la cantidad correcta de gas antes de emitir tu evento. La herramienta `precompilegen` genera automáticamente un andamiaje para tus cálculos de gas, sin embargo, debes revisar y ajustar los costos de gas según tus necesidades, especialmente si estás utilizando datos de tamaño arbitrario en tus eventos. La función de costo de gas para el evento `GreetingChanged(address indexed sender, string oldGreeting, string newGreeting)` se ve así:

```go
func GetGreetingChangedEventGasCost(data GreetingChangedEventData) uint64 {
	gas := contract.LogGas // costo base de gas

	// Agregar costo de gas de los tópicos (2 tópicos)
	// Los tópicos siempre incluyen el hash de firma del evento. El resto son los argumentos de evento indexados.
	gas += contract.LogTopicGas * 2

	// CÓDIGO PERSONALIZADO COMIENZA AQUÍ
	// Ten en cuenta que los datos aquí se codificarán utilizando el esquema de codificación ABI.
	// Por lo tanto, el costo de cálculo puede cambiar según el tipo de datos + tamaño de datos y debe cobrarse en consecuencia.
	// es decir, gas += LogDataGas * uint64(len(data.oldGreeting))
	gas += contract.LogDataGas * uint64(len(data.OldGreeting)) // * ...
	// CÓDIGO PERSONALIZADO TERMINA AQUÍ
	// CÓDIGO PERSONALIZADO COMIENZA AQUÍ
	// Ten en cuenta que los datos aquí se codificarán utilizando el esquema de codificación ABI.
	// Por lo tanto, el costo de cálculo puede cambiar según el tipo de datos + tamaño de datos y debe cobrarse en consecuencia.
	// es decir, gas += LogDataGas * uint64(len(data.newGreeting))
	gas += contract.LogDataGas * uint64(len(data.NewGreeting)) // * ...
	// CÓDIGO PERSONALIZADO TERMINA AQUÍ

	// CÓDIGO PERSONALIZADO COMIENZA AQUÍ
	return gas
}
```

Hemos cobrado el costo base de gas, el costo de gas de los tópicos y el costo de gas de los datos para el saludo antiguo y nuevo. El costo de gas de los tópicos incluye 2 tópicos, uno para el hash de firma del evento y el otro para el argumento de remitente indexado. El costo de gas de los datos se calcula según el tipo y tamaño de los datos. Si no estás utilizando datos de tamaño arbitrario en tus eventos, puedes definirlo como una constante.

#### Verificación de activación de Durango

Después de completar la definición de tus eventos personalizados, debes empaquetar tus eventos, cobrar el gas de tu evento y emitirlos en tus funciones de precompilación. Dado que este procedimiento no es compatible con versiones anteriores, debes asegurarte de que esto solo se active después de la actualización de red Durango.

Puedes usar la función `contract.IsDurangoActivated` para verificar si la actualización de red Durango está activada. Para el ejemplo de Hello World, cambiaremos la función `setGreeting` a partir de [aquí](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contracts/helloworld/contract.go#L187) de la siguiente manera:

```go
if contract.IsDurangoActivated(accessibleState) {
 ...
}
```

Nota: esta activación no será necesaria si planeas implementar tu precompilación personalizada después de Durango.

#### Empaquetadores de eventos

Los empacadores y desempacadores de eventos se generarán automáticamente con la herramienta `precompilegen`. Puedes usar estos empacadores y desempacadores para empacar y desempacar tus eventos personalizados. Para el ejemplo de "Hola mundo":

```go
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
```

Esto primero carga gas para obtener el saludo antiguo de la búsqueda de estado y luego lo obtiene del estado. Luego empaca los datos del evento con el saludo antiguo y nuevo como datos de evento no indexados.

#### Emitiendo Eventos

Después de empacar los datos del evento, puedes cargar el gas del evento y emitir tus eventos personalizados usando la función `stateDB.AddLog`. Para el ejemplo de "Hola mundo", comienza [aquí](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contracts/helloworld/contract.go#L203-L214):

```go
// Carga el gas para emitir el evento.
eventGasCost := GetGreetingChangedEventGasCost(eventData)
if remainingGas, err = contract.DeductGas(remainingGas, eventGasCost); err != nil {
  return nil, 0, err
}

// Emite el evento
stateDB.AddLog(
  ContractAddress,
  topics,
  data,
  accessibleState.GetBlockContext().Number().Uint64(),
)
```

## Rol de Gerente

Durango introduce un nuevo rol llamado rol de gerente. El rol de gerente es un rol intermedio entre `Admin` y `Enabled`. El rol de gerente se considera como una cuenta `Enabled` y realiza operaciones restringidas que cambian el estado en precompilaciones. El rol de gerente también puede modificar otras cuentas `Enabled`. Puede designar nuevas cuentas `Enabled` y eliminar cuentas `Enabled` existentes. El rol de gerente no puede modificar otras cuentas `Manager` o `Admin`. Para obtener más información sobre AllowList, consulta [aquí](/build/subnet/upgrade/customize-a-subnet.md#allowlist-interface).

Si tienes alguna precompilación que utiliza AllowList, puedes emitir una llamada a `setManager` en tu precompilación para designar nuevas cuentas de gerente. Para actualizaciones o nuevas precompilaciones con la configuración de AllowList, puedes usar `managerAddresses` de la siguiente manera:

```json
{
  "feeManagerConfig": {
    "blockTimestamp": 0,
    "adminAddresses": [<lista de direcciones>],
    "managerAddresses": [<lista de direcciones>],
    "enabledAddresses": [<lista de direcciones>],
  }
}
```

## Modo No Estricto

El desempaquetado en modo estricto evita el uso de bytes de relleno adicionales en las entradas. Esto creó algunos problemas en algunos contratos heredados como la billetera Gnosis Multisig. Para obtener más información sobre el modo estricto, consulta la [documentación de Solidity](https://docs.soliditylang.org/en/latest/abi-spec.html#strict-encoding-mode).

Para el ejemplo de "Hola mundo", estábamos usando este `UnpackSetGreetingInput` con el modo estricto habilitado antes:

```go
func UnpackSetGreetingInput(input []byte) (string, error) {
  // Esta función estaba utilizando el desempaquetado en modo estricto de forma predeterminada.
	res, err := HelloWorldABI.UnpackInput("setGreeting", input)
	if err != nil {
		return "", err
	}
	unpacked := *abi.ConvertType(res[0], new(string)).(*string)
	return unpacked, nil
}
```

Para manejar bytes de relleno adicionales, Subnet-EVM comenzará a usar el modo no estricto con Durango en los "Desempacadores de Entrada". Sin embargo, dado que este cambio no será compatible con versiones anteriores, debes asegurarte de que esto se active solo después de la actualización de red Durango. Puedes usar la función `contract.IsDurangoActivated` para verificar si se ha activado la actualización de red Durango. Ahora usaremos esta función para comenzar a usar el desempaquetado en modo no estricto:

```go
// UnpackSetGreetingInput intenta desempaquetar [input] en el argumento de tipo string
// asume que [input] no incluye el selector (omitiendo los primeros 4 bytes de la firma de la función)
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
	unpacked := *abi.ConvertType(res[0], new(string)).(*string)
	return unpacked, nil
}
```

Para llamar a esta función en `setGreeting`, debemos usar la activación de Durango de la siguiente manera [aquí](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contracts/helloworld/contract.go#L159-L167):

```go
// no usar modo estricto después de Durango
useStrictMode := !contract.IsDurangoActivated(accessibleState)
// intenta desempaquetar [input] en los argumentos de SetGreetingInput.
// Asume que [input] no incluye el selector
// Puedes usar la variable desempaquetada [inputStruct] en tu código
inputStruct, err := UnpackSetGreetingInput(input, useStrictMode)
if err != nil {
  return nil, remainingGas, err
}
```

Esto asegurará que se use el desempaquetado en modo no estricto después de la activación de Durango.

Nota: Esto no debería causar ningún problema importante para tus precompilaciones personalizadas. Si quieres seguir usando el antiguo modo estricto y mantener la compatibilidad con versiones anteriores puedes usar `true` para el parámetro `useStrictMode`. Sin embargo, si tu precompilación se utiliza principalmente desde otros contratos desplegados (Solidity), debes hacer esta transición para aumentar la compatibilidad de tu precompilación.
