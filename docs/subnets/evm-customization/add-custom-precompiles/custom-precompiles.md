# Custom Precompiles

Avalanche allows you to add custom precompiles to your EVM. Adding precompiles instead of
implementing the logic in solidity has some advantages:

## Performance Optimization

Precompiles are primarily used to optimize the performance of specific types of computations. Adding
a new precompile can significantly reduce the computational resources required to perform certain
tasks, which can, in turn, improve the performance of smart contracts and decentralized applications
(DApps) that depend on these tasks.

The SHA256 hash function (0x02) and the RIPEMD160 hash function (0x03) are examples of precompiles
that significantly improve performance. If these functions had to be implemented in a smart
contract, they would be computationally expensive and slow. However, as precompiles, they are
executed quickly and efficiently.

## Security

By incorporating a function as a precompile, it is possible to leverage libaries that have been
thoroughly reviewed and audited. This can reduce the risk of bugs and vulnerabilities, contributing
to the overall security.

For example, the ModExp (0x05) precompile safely performs modular exponentiation, a complex
mathematical operation used in various cryptographic functions.

## Access to Go Libraries

Since precompiles are implemented in Go, we can utilize existing Go Libraries. Go has a rich
ecosystem of Libraries. Accessing these avoids the need for reimplementation, which takes effort and
poses the risks of introducing bugs in the process of translating from Go to Solidity.

Check out the [implementation of the sha256 hash
algorithm](https://cs.opensource.google/go/go/+/refs/tags/go1.20.5:src/crypto/sha256/sha256.go) to
get an idea of how much effort a translation would bring.

## Gas Efficiency

Adding a new precompile to the EVM can make certain types of computations more gas-efficient,
reducing the cost of executing transactions that involve these computations. This makes it feasible
to incorporate more complex operations into smart contracts, enhancing their functionality without
unduly increasing the cost of transactions.

The identity precompile (0x04) copies and returns input data. Even though it's simple, it offers gas
efficiency because it's faster and cheaper than implementing the same functionality in a standard
contract.

## Advanced Features and Functionality

By adding new precompiles to the EVM, it is possible to introduce new features and functionalities,
such as advanced cryptographic operations, complex mathematical calculations, data structures, and
more. This can open up new possibilities for DApps and smart contracts, allowing them to perform
tasks that would otherwise be too computationally expensive or technically challenging.

The precompiles for elliptic curve operations, such as ecadd (0x06), ecmul (0x07), and ecpairing
(0x08), enable the use of advanced cryptographic functionality in EVM smart contracts. These
precompiles are essential for implementing zk-SNARKs, a form of zero-knowledge proof, in Ethereum.

## Interoperability

Some precompiles can enhance the interoperability of the EVM with other blockchains or systems. For
instance, precompiles could be used to verify proofs from other chains or to perform operations
compatible with other cryptographic standards.

The BLS12-381 elliptic curve operations precompiles (0x0a through 0x13, added in the Istanbul
upgrade) enhance EVM's interoperability. They allow for operations compatible with the BLS signature
scheme and could potentially facilitate inter-blockchain communication.
