# Precompiles

Precompiled contracts are a way to execute code written in low-level code (such as Go) from the EVM.
They are responsible for implementing specific operations or computations that are commonly used by
smart contracts. They were originally defined in Appendix E of the Ethereum Yellowpaper.

Ethereum uses precompiles to efficiently implement cryptographic primitives within the EVM instead
of re-implementing the same primitives in Solidity. The following precompiles are currently
included: ecrecover, sha256, blake2f, ripemd-160, Bn256Add, Bn256Mul, Bn256Pairing, the identity
function, and modular exponentiation.

If you are familiar with Python programming, you might know that there is a similar concept. Many
python functions and libraries are actually written in the programming language C, since it is much
more efficient than Python. When writing Python code developers can import these modules and call
these functions without noticing a difference.

Precompiles can be called from a Solidity smart contract as if they were another contract written in
Solidity. The EVM keeps a list of addresses that are reserved and mapped to the precompiles.

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

These precompile addresses start from 0x0000000000000000000000000000000000000001 and increment by 1.
For instance, the address 0x02 is mapped to the Precompile that hashes its input using the SHA256
Hash Function. 

When a precompile is called, the EVM checks if the input address is a precompile address, and if so
it executes the precompile. Otherwise, it loads the smart contract at the input address and runs it
on the EVM interpreter with the specified input data. To call the Precompile we can write the
following in Solidity:

```solidity
(bool ok, bytes memory out) = address(2).staticcall(abi.encode("Some value"));
```

