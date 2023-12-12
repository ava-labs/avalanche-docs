---
tags: [Construir, Máquinas Virtuales]
description: Guía para empezar a construir precompilaciones estatales para Subnet-EVM y Precompile-EVM
sidebar_label: Introducción
pagination_label: Introducción
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
// PrecompiledContractsBerlin contains the default set of pre-compiled Ethereum
// contracts used in the Berlin release.
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
// PrecompiledContract is the basic interface for native Go contracts. The implementation
// requires a deterministic gas count based on the input size of the Run method of the
// contract.
type PrecompiledContract interface {
	RequiredGas(input []byte) uint64  // RequiredPrice calculates the contract gas use
	Run(input []byte) ([]byte, error) // Run runs the precompiled contract
}
```

Aquí tienes un ejemplo de la función de la
[precompilación sha256](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/core/vm/contracts.go#L237-L250).

```go
type sha256hash struct{}

// RequiredGas returns the gas required to execute the pre-compiled contract.
//
// This method does not require any overflow checking as the input size gas costs
// required for anything significant is so high it's impossible to pay for.
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

Cuando se llama a una precompilación, la EVM verifica si la dirección de entrada es una dirección de precompilación, y si es así, la
ejecuta la precompilación. De lo contrario, carga el contrato inteligente en la dirección de entrada y lo ejecuta en el
intérprete de la EVM con los datos de entrada especificados.

### Contratos Precompilados Estatales

Una precompilación estatal se basa en una precompilación en que agrega acceso al estado. Las precompilaciones estatales son
no están disponibles en la EVM por defecto, y son específicas de las EVM de Avalanche como
[Coreth](https://github.com/ava-labs/coreth) y [Subnet-EVM](https://github.com/ava-labs/subnet-evm).

Una precompilación estatal sigue esta [interfaz](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contract/interfaces.go#L17-L20):

```go
// StatefulPrecompiledContract is the interface for executing a precompiled contract
type StatefulPrecompiledContract interface {
	// Run executes the precompiled contract.
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
proporcionar acceso al estado de la EVM, incluyendo la capacidad de modificar saldos y leer/escribir almacenamiento.

¡De esta manera podemos proporcionar incluso más personalización de la EVM a través de Precompilaciones Estatales que podemos
con la interfaz de precompilación original!

### AllowList

La AllowList permite que una precompilación imponga permisos en direcciones. La AllowList no es un contrato
en sí mismo, sino una estructura auxiliar para proporcionar un mecanismo de control para envolver contratos.
Proporciona una `AllowListConfig` a la precompilación para que pueda tomar una configuración inicial
desde el génesis/actualización. También proporciona 4 funciones para establecer/leer los permisos. En este tutorial,
usamos la interfaz `IAllowList` para proporcionar control de permisos a la precompilación `HelloWorld`.
`IAllowList` está definido en Subnet-EVM bajo [`./contracts/contracts/interfaces/IAllowList.sol`](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/contracts/contracts/interfaces/IAllowList.sol).
La interfaz es la siguiente:

```sol
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
interface IAllowList {
  // Set [addr] to have the admin role over the precompile contract.
  function setAdmin(address addr) external;
  // Set [addr] to be enabled on the precompile contract.
  function setEnabled(address addr) external;
  // Set [addr] to have no role for the precompile contract.
  function setNone(address addr) external;
  // Read the status of [addr].
  function readAllowList(address addr) external view returns (uint256 role);
}
```

Puedes encontrar más información sobre la interfaz AllowList [aquí](/build/subnet/upgrade/customize-a-subnet.md#allowlist-interface).
