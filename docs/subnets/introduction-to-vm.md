# Introduction to VMs

## Overview

This is part of a series of tutorials for building a Virtual Machine (VM):

- Introduction to VMs (this article)
- [How to Build a Simple Golang VM](./create-a-vm-timestampvm.md)
- [How to Build a Complex Golang VM](./create-a-vm-blobvm.md)
- [How to Build a Simple Rust VM](./create-a-simple-rust-vm.md)

A [Virtual Machine (VM)](/learn/avalanche/virtual-machines) is a blueprint for a
blockchain. Blockchains
are instantiated from a VM, similar to how objects are instantiated from a class definition. VMs can
define anything you want, but will generally define transactions that are executed and how blocks are
created.

## Blocks and State

Virtual Machines deal with blocks and state. The functionality provided by VMs is to:

- Define the representation of a blockchain's state
- Represent the operations in that state
- Apply the operations in that state

Each block in the blockchain contains a set of state transitions. Each block is applied in order
from the blockchain's initial genesis block to its last accepted block to reach the latest state
of the blockchain.

## Blockchain

A blockchain relies on two major components: The **Consensus Engine** and the **VM**. The VM defines
application specific behavior and how blocks are built and parsed to create the blockchain. VMs
all run on top of the Avalanche Consensus Engine, which allows nodes in the network to agree on the
state of the blockchain. Here's a quick example of how VMs interact with consensus:

1. A node wants to update the blockchain's state
2. The node's VM will notify the consensus engine that it wants to update the state
3. The consensus engine will request the block from the VM
4. The consensus engine will verify the returned block using the VM's implementation of `Verify()`
5. The consensus engine will get the network to reach consensus on whether to accept or reject the newly
   verified block
   - Every virtuous (well-behaved) node on the network will have the same preference for a particular
     block
6. Depending upon the consensus results, the engine will either accept or reject the block
   - What happens when a block is accepted or rejected is specific to the implementation of the VM

AvalancheGo provides the consensus engine for every blockchain on the Avalanche Network. The consensus
engine relies on the VM interface to handle building, parsing, and storing blocks as well as verifying
and executing on behalf of the consensus engine.

This decoupling between the application and consensus layer allows developers to build their
applications quickly by implementing virtual machines, without having to worry about the consensus
layer managed by Avalanche which deals with how nodes agree on whether or not to accept a block.

## Installing a VM

VMs are supplied as binaries to a node running `AvalancheGo`. These binaries must be named the VM's
assigned **VMID**. A VMID is a 32-byte hash encoded in CB58 that is generated when you build your VM.

In order to install a VM, its binary must be installed in the `AvalancheGo` plugin path. See
[here](../nodes/maintain/avalanchego-config-flags.md#--plugin-dir-string) for more details.
Multiple VMs can be installed in this location.

Each VM runs as a separate process from AvalancheGo and communicates with `AvalancheGo` using gRPC
calls. This is functionality is enabled by `rpcchainvm`, a special VM that wraps around other VM
implementations so that they can communicate back and forth with the AvalancheGo.

### API Handlers

Users can interact with a blockchain and its VM through handlers exposed by the VM's API.

VMs expose two types of handlers to serve responses for incoming requests:

- **Blockchain Handlers** - Referred to as handlers, these expose APIs to interact with a blockchain
  instantiated by a VM. The API endpoint will be different for each chain. The endpoint for a handler
  is `/ext/bc/[chainID]`.
- **VM Handlers** - Referred to as static handlers, these expose APIs to interact with the VM
  directly. One example API would be to parse genesis data to instantiate a new blockchain. The endpoint
  for a static handler is `/ext/vm/[vmID]`.

For any readers familiar with object-oriented programming, static and non-static handlers on a VM are
analogous to static and non-static methods on a class. Blockchain handlers can be thought of as methods
on an object, whereas VM handlers can be thought of as static methods on a class.

### Instantiate a VM

The `vm.Factory` interface is implemented to create new VM instances from which a blockchain can be
initialized. The factory's `New` method shown below provides `AvalancheGo` with an instance of the
VM. It's defined in the
[`factory.go`](https://github.com/ava-labs/timestampvm/blob/main/timestampvm/factory.go) file
of the `timestampvm` repository.

```go
// Returning a new VM instance from VM's factory
func (f *Factory) New(*snow.Context) (interface{}, error) { return &vm.VM{}, nil }
```

### Initializing a VM to Create a Blockchain

Before a VM can run, AvalancheGo will initialize it by invoking its `Initialize` method. Here, the
VM will bootstrap itself and sets up anything it requires before it starts running.

This might involve setting up its database, mempool, genesis state, or anything else the VM requires
to run.

```go
if err := vm.Initialize(
    ctx.Context,
    vmDBManager,
    genesisData,
    chainConfig.Upgrade,
    chainConfig.Config,
    msgChan,
    fxs,
    sender,
);
```

You can refer to the
[implementation](https://github.com/ava-labs/timestampvm/blob/main/timestampvm/vm.go#L75)) of
`vm.initialize` in the TimestampVM repository.

## Interfaces

Every VM should implement the following interfaces:

### `block.ChainVM`

To reach a consensus on linear blockchains, Avalanche uses the Snowman consensus engine. To be
compatible with Snowman, a VM must implement the `block.ChainVM` interface.

For more information, see [here](https://github.com/ava-labs/avalanchego/blob/master/snow/engine/snowman/block/vm.go).

```go title="/snow/engine/snowman/block/vm.go"
// ChainVM defines the required functionality of a Snowman VM.
//
// A Snowman VM is responsible for defining the representation of the state,
// the representation of operations in that state, the application of operations
// on that state, and the creation of the operations. Consensus will decide on
// if the operation is executed and the order operations are executed.
//
// For example, suppose we have a VM that tracks an increasing number that
// is agreed upon by the network.
// The state is a single number.
// The operation is setting the number to a new, larger value.
// Applying the operation will save to the database the new value.
// The VM can attempt to issue a new number, of larger value, at any time.
// Consensus will ensure the network agrees on the number at every block height.
type ChainVM interface {
	common.VM
	Getter
	Parser

	// Attempt to create a new block from data contained in the VM.
	//
	// If the VM doesn't want to issue a new block, an error should be
	// returned.
	BuildBlock() (snowman.Block, error)

	// Notify the VM of the currently preferred block.
	//
	// This should always be a block that has no children known to consensus.
	SetPreference(ids.ID) error

	// LastAccepted returns the ID of the last accepted block.
	//
	// If no blocks have been accepted by consensus yet, it is assumed there is
	// a definitionally accepted block, the Genesis block, that will be
	// returned.
	LastAccepted() (ids.ID, error)
}

// Getter defines the functionality for fetching a block by its ID.
type Getter interface {
	// Attempt to load a block.
	//
	// If the block does not exist, an error should be returned.
	//
	GetBlock(ids.ID) (snowman.Block, error)
}

// Parser defines the functionality for fetching a block by its bytes.
type Parser interface {
	// Attempt to create a block from a stream of bytes.
	//
	// The block should be represented by the full byte array, without extra
	// bytes.
	ParseBlock([]byte) (snowman.Block, error)
}
```

### `common.VM`

`common.VM` is a type that every `VM` must implement.

For more information, you can see the full file [here](https://github.com/ava-labs/avalanchego/blob/master/snow/engine/common/vm.go).

```go title="/snow/engine/common/vm.go"
// VM describes the interface that all consensus VMs must implement
type VM interface {
    // Contains handlers for VM-to-VM specific messages
	AppHandler

	// Returns nil if the VM is healthy.
	// Periodically called and reported via the node's Health API.
	health.Checkable

	// Connector represents a handler that is called on connection connect/disconnect
	validators.Connector

	// Initialize this VM.
	// [ctx]: Metadata about this VM.
	//     [ctx.networkID]: The ID of the network this VM's chain is running on.
	//     [ctx.chainID]: The unique ID of the chain this VM is running on.
	//     [ctx.Log]: Used to log messages
	//     [ctx.NodeID]: The unique staker ID of this node.
	//     [ctx.Lock]: A Read/Write lock shared by this VM and the consensus
	//                 engine that manages this VM. The write lock is held
	//                 whenever code in the consensus engine calls the VM.
	// [dbManager]: The manager of the database this VM will persist data to.
	// [genesisBytes]: The byte-encoding of the genesis information of this
	//                 VM. The VM uses it to initialize its state. For
	//                 example, if this VM were an account-based payments
	//                 system, `genesisBytes` would probably contain a genesis
	//                 transaction that gives coins to some accounts, and this
	//                 transaction would be in the genesis block.
	// [toEngine]: The channel used to send messages to the consensus engine.
	// [fxs]: Feature extensions that attach to this VM.
	Initialize(
		ctx *snow.Context,
		dbManager manager.Manager,
		genesisBytes []byte,
		upgradeBytes []byte,
		configBytes []byte,
		toEngine chan<- Message,
		fxs []*Fx,
		appSender AppSender,
	) error

	// Bootstrapping is called when the node is starting to bootstrap this chain.
	Bootstrapping() error

	// Bootstrapped is called when the node is done bootstrapping this chain.
	Bootstrapped() error

	// Shutdown is called when the node is shutting down.
	Shutdown() error

	// Version returns the version of the VM this node is running.
	Version() (string, error)

	// Creates the HTTP handlers for custom VM network calls.
	//
	// This exposes handlers that the outside world can use to communicate with
	// a static reference to the VM. Each handler has the path:
	// [Address of node]/ext/VM/[VM ID]/[extension]
	//
	// Returns a mapping from [extension]s to HTTP handlers.
	//
	// Each extension can specify how locking is managed for convenience.
	//
	// For example, it might make sense to have an extension for creating
	// genesis bytes this VM can interpret.
	CreateStaticHandlers() (map[string]*HTTPHandler, error)

	// Creates the HTTP handlers for custom chain network calls.
	//
	// This exposes handlers that the outside world can use to communicate with
	// the chain. Each handler has the path:
	// [Address of node]/ext/bc/[chain ID]/[extension]
	//
	// Returns a mapping from [extension]s to HTTP handlers.
	//
	// Each extension can specify how locking is managed for convenience.
	//
	// For example, if this VM implements an account-based payments system,
	// it have an extension called `accounts`, where clients could get
	// information about their accounts.
	CreateHandlers() (map[string]*HTTPHandler, error)
}
```

### `snowman.Block`

The `snowman.Block` interface It define the functionality a block must implement to be a block in a
linear Snowman chain.

For more information, you can see the full file [here](https://github.com/ava-labs/avalanchego/blob/master/snow/consensus/snowman/block.go).

```go title="/snow/consensus/snowman/block.go"
// Block is a possible decision that dictates the next canonical block.
//
// Blocks are guaranteed to be Verified, Accepted, and Rejected in topological
// order. Specifically, if Verify is called, then the parent has already been
// verified. If Accept is called, then the parent has already been accepted. If
// Reject is called, the parent has already been accepted or rejected.
//
// If the status of the block is Unknown, ID is assumed to be able to be called.
// If the status of the block is Accepted or Rejected; Parent, Verify, Accept,
// and Reject will never be called.
type Block interface {
    choices.Decidable

    // Parent returns the ID of this block's parent.
    Parent() ids.ID

    // Verify that the state transition this block would make if accepted is
    // valid. If the state transition is invalid, a non-nil error should be
    // returned.
    //
    // It is guaranteed that the Parent has been successfully verified.
    Verify() error

    // Bytes returns the binary representation of this block.
    //
    // This is used for sending blocks to peers. The bytes should be able to be
    // parsed into the same block on another node.
    Bytes() []byte

    // Height returns the height of this block in the chain.
    Height() uint64
}
```

### `choices.Decidable`

This interface is a superset of every decidable object, such as transactions, blocks, and vertices.

For more information, you can see the full file [here](https://github.com/ava-labs/avalanchego/blob/master/snow/choices/decidable.go).

```go title="/snow/choices/decidable.go"
// Decidable represents element that can be decided.
//
// Decidable objects are typically thought of as either transactions, blocks, or
// vertices.
type Decidable interface {
	// ID returns a unique ID for this element.
	//
	// Typically, this is implemented by using a cryptographic hash of a
	// binary representation of this element. An element should return the same
	// IDs upon repeated calls.
	ID() ids.ID

	// Accept this element.
	//
	// This element will be accepted by every correct node in the network.
	Accept() error

	// Reject this element.
	//
	// This element will not be accepted by any correct node in the network.
	Reject() error

	// Status returns this element's current status.
	//
	// If Accept has been called on an element with this ID, Accepted should be
	// returned. Similarly, if Reject has been called on an element with this
	// ID, Rejected should be returned. If the contents of this element are
	// unknown, then Unknown should be returned. Otherwise, Processing should be
	// returned.
	Status() Status
}
```
