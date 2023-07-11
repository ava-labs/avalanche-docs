# Stateful Precompiles

A stateful precompile builds on a precompile in that it adds state access. Stateful precompiles are
not available in the default EVM, and are specific to Avalanche EVMs such as
[Coreth](https://github.com/ava-labs/coreth) and [Subnet-EVM](https://github.com/ava-labs/subnet-evm).

A stateful precompile follows this [interface](https://github.com/ava-labs/subnet-evm/blob/helloworld-official-tutorial-v2/precompile/contract/interfaces.go#L17-L20):

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

A stateful precompile injects state access through the `PrecompileAccessibleState` interface to
provide access to the EVM state including the ability to modify balances and read/write storage.

This way we can provide even more customization of the EVM through Stateful Precompiles than we can
with the original precompile interface!
