# Create a Virtual Machine \(VM\)

## Introduction

One of the core features of Avalanche is the ability to create new, custom blockchains, which are defined by [Virtual Machines \(VMs\)](../../../learn/platform-overview/#virtual-machines)

In this tutorial, we’ll create a very simple VM. The blockchain defined by the VM is a timestamp server. Each block in the blockchain contains the timestamp when it was created along with a 32-byte piece of data \(payload\). Each block’s timestamp is after its parent’s timestamp.

Such a server is useful because it can be used to prove a piece of data existed at the time the block was created. Suppose you have a book manuscript, and you want to be able to prove in the future that the manuscript exists today. You can add a block to the blockchain where the block’s payload is a hash of your manuscript. In the future, you can prove that the manuscript existed today by showing that the block has the hash of your manuscript in its payload \(this follows from the fact that finding the pre-image of a hash is impossible\).

A blockchain can run as a separate process from AvalancheGo and can communicate with AvalancheGo over gRPC. This is enabled by `rpcchainvm`, a special VM that uses [`go-plugin`](https://pkg.go.dev/github.com/hashicorp/go-plugin) and wraps another VM implementation. The C-Chain, for example, runs the [Coreth](https://github.com/ava-labs/coreth) VM in this fashion.

Before we get to the implementation of a VM, we’ll look at the interface that a VM must implement to be compatible with AvalancheGo's consensus engine. We’ll show and explain all the code in snippets. If you want to see all the code in one place, see [this repository.](https://github.com/ava-labs/timestampvm/)

## Interfaces

### `block.ChainVM`

To reach consensus on linear blockchains \(as opposed to DAG blockchains\), Avalanche uses the Snowman consensus engine. In order to be compatible with Snowman, a VM must implement the `block.ChainVM` interface, which we include below from [its declaration](https://github.com/ava-labs/avalanchego/blob/master/snow/engine/snowman/block/vm.go).

The interface is big, but don’t worry, we’ll explain each method and see an implementation example, and it isn't important that you understand every detail right away.

```go
package block

import (
	"github.com/ava-labs/avalanchego/ids"
	"github.com/ava-labs/avalanchego/snow/consensus/snowman"
	"github.com/ava-labs/avalanchego/snow/engine/common"
)

// ChainVM defines the required functionality of a Snowman VM.
//
// A Snowman VM is responsible for defining the representation of state,
// the representation of operations on that state, the application of operations
// on that state, and the creation of the operations. Consensus will decide on
// if the operation is executed and the order operations are executed in.
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

	// Attempt to create a new block from data contained in the VM.
	//
	// If the VM doesn't want to issue a new block, an error should be
	// returned.
	BuildBlock() (snowman.Block, error)

	// Attempt to create a block from a stream of bytes.
	//
	// The block should be represented by the full byte array, without extra
	// bytes.
	ParseBlock([]byte) (snowman.Block, error)

	// Attempt to load a block.
	//
	// If the block does not exist, then an error should be returned.
	GetBlock(ids.ID) (snowman.Block, error)

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

```

### `common.VM`

`common.VM` is a type that every `VM`, whether a DAG or linear chain, must implement.

```cpp
// VM describes the interface that all consensus VMs must implement
type VM interface {
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

You may have noticed the `snowman.Block` type referenced in the `block.ChainVM` interface. It describes the methods that a block must implement to be a block in a linear \(Snowman\) chain.

Let’s look at this interface and its methods, which we copy from [here.](https://github.com/ava-labs/avalanchego/blob/master/snow/consensus/snowman/block.go)

```cpp
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

	// Parent returns the block that this block points to.
	//
	// If the parent block is not known, a Block should be returned with the
	// status Unknown.
	Parent() Block

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

This interface is the superset of every decidable object, such as transactions, blocks and vertices.

```go
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

## Helper Libraries

We’ve created some types that your VM implementation can embed \(embedding is like Go’s version of inheritance\) in order to handle boilerplate code.

In our example, we use both of the library types below, and we encourage you to use them too.

### core.SnowmanVM

This helper type is a struct that implements many of the `block.ChainVM` methods. Its implementation can be found [here](https://github.com/ava-labs/avalanchego/blob/master/vms/components/core/snowman_vm.go).

#### Methods

Some `block.ChainVM` methods implemented by `core.SnowmanVM` are:

- `ParseBlock`
- `GetBlock`
- `SetPreference`
- `LastAccepted`
- `Shutdown`
- `Bootstrapping`
- `Bootstrapped`
- `Initialize`

If your VM implementation embeds a `core.SnowmanVM`, you need not implement any of these methods because they are already implemented by `core.SnowmanVM`. You may, if you want, override these inherited methods.

#### Fields

This type contains several fields that you’ll want to include in your VM implementation. Among them:

- `DB`: the blockchain’s database
- `Ctx`: the blockchain’s runtime context
- `preferred`: ID of the preferred block, which new blocks will be built on
- `LastAcceptedID`: ID of the most recently accepted block
- `ToEngine`: channel used to send messages to the consensus engine powering this blockchain
- `State`: used to persist data such as blocks

### core.Block

This helper type implements many methods of the `snowman.Block` interface.

#### Methods

Some implemented `snowman.Block` interface methods are:

- `ID`
- `Parent`
- `Accept`
- `Reject`
- `Status`
- `Height`

The blocks in your VM implementation will probably override `Accept` and `Reject` so that those methods cause application-specific state changes.

#### Fields

`core.Block` has a field `VM`, which is a reference to a `core.SnowmanVM`. This means that a `core.Block` has access to all of the fields and methods of that type.

### rpcchainvm

`rpcchainvm` is a special VM that wraps a `block.ChainVM` and allows the wrapped blockchain to run in its own process separate from AvalancheGo. `rpcchainvm` has two important parts: a server and a client. The [`server`](https://github.com/ava-labs/avalanchego/blob/master/vms/rpcchainvm/vm_server.go) runs the underlying `block.ChainVM` in its own process and allows the underlying VM's methods to be called via gRPC. The [client](https://github.com/ava-labs/avalanchego/blob/master/vms/rpcchainvm/vm_client.go) runs as part of AvalancheGo and makes gRPC calls to the corresponding server in order to update or query the state of the blockchain.

To make things more concrete: suppose that AvalancheGo wants to retrieve a block from a chain run in this fashion. AvalancheGo calls the client's `GetBlock` method, which makes a gRPC call to the server, which is running in a separate process. The server calls the underlying VM's `GetBlock` method and serves the response to the client, which in turn gives the response to AvalancheGo.

As another example, let's look at the server's `BuildBlock` method:

```go
func (vm *VMServer) BuildBlock(_ context.Context, _ *vmproto.BuildBlockRequest) (*vmproto.BuildBlockResponse, error) {
	blk, err := vm.vm.BuildBlock()
	if err != nil {
		return nil, err
	}
	blkID := blk.ID()
	parentID := blk.Parent().ID()
	return &vmproto.BuildBlockResponse{
		Id:       blkID[:],
		ParentID: parentID[:],
		Bytes:    blk.Bytes(),
		Height:   blk.Height(),
	}, nil
}
```

It calls `vm.vm.BuildBlock()`, where `vm.vm` is the underlying VM implementation, and returns a new block.

## Timestamp Server Implementation

Now we know the interface our VM must implement and the libraries we can use to build a VM.

Let’s write our VM, which implements `block.ChainVM` and whose blocks implement `snowman.Block`.

### Block

First, let’s look at our block implementation.

The type declaration is:

```go
// Block is a block on the chain.
// Each block contains:
// 1) A piece of data (the block's payload)
// 2) The (unix) timestamp when the block was created
type Block struct {
    *core.Block                `serialize:"true"`
    Data        [dataLen]byte  `serialize:"true"`
    Timestamp   int64          `serialize:"true"`
}
```

The `serialize:"true"` tag indicates that the field should be included in the byte representation of the block used when persisting the block or sending it to other nodes.

#### Verify

This method verifies that a block is valid and saves it in the database.

```go
// Verify returns nil iff this block is valid.
// To be valid, it must be that:
// b.parent.Timestamp < b.Timestamp <= [local time] + 1 hour
func (b *Block) Verify() error {
    // Check to see if this block has already been verified by calling Verify on the
    // embedded *core.Block.
    // If there is an error while checking, return an error.
    // If the core.Block says the block is accepted, return accepted.
    if accepted, err := b.Block.Verify(); err != nil || accepted {
        return err
    }

    // Get [b]'s parent
    parent, ok := b.Parent().(*Block)
    if !ok {
        return errDatabaseGet
    }

    // Ensure [b]'s timestamp is after its parent's timestamp.
    if b.Timestamp < time.Unix(parent.Timestamp, 0).Unix() {
        return errTimestampTooEarly
    }

    // Ensure [b]'s timestamp is not more than an hour
    // ahead of this node's time
    if b.Timestamp >= time.Now().Add(time.Hour).Unix() {
        return errTimestampTooLate
    }

    // Our block inherits VM from *core.Block.
    // It holds the database we read/write, b.VM.DB
    // We persist this block to that database using VM's SaveBlock method.
    if err := b.VM.SaveBlock(b.VM.DB, b); err != nil {
		return errDatabaseSave
	}

    // Then we flush the database's contents
    return b.VM.DB.Commit()
}
```

That’s all the code for our block implementation! All of the other methods of `snowman.Block`, which our `Block` must implement, are inherited from `*core.Block`.

### Virtual Machine

Now, let’s look at our timestamp VM implementation, which implements the `block.ChainVM` interface.

The declaration is:

```go
// This Virtual Machine defines a blockchain that acts as a timestamp server
// Each block contains data (a payload) and the timestamp when it was created

const (
	dataLen      = 32
	codecVersion = 0
)

type VM struct {
    core.SnowmanVM

    // codec serializes and de-serializes structs to/from bytes
    codec codec.Manager

    // Proposed data that haven't been put into a block and proposed yet
    mempool [][dataLen]byte
}
```

#### Initialize

This method is called when a new instance of VM is initialized. Genesis block is created under this method.

```go
// Initialize this vm
// [ctx] is this vm's context
// [dbManager] is the manager of this vm's database
// [toEngine] is used to notify the consensus engine that new blocks are
//   ready to be added to consensus
// The data in the genesis block is [genesisData]
func (vm *VM) Initialize(
	ctx *snow.Context,
	dbManager manager.Manager,
	genesisData []byte,
	upgradeData []byte,
	configData []byte,
	toEngine chan<- common.Message,
	_ []*common.Fx,
) error {
	version, err := vm.Version()
	if err != nil {
		log.Error("error initializing Timestamp VM: %v", err)
		return err
	}
	log.Info("Initializing Timestamp VM", "Version", version)
	if err := vm.SnowmanVM.Initialize(ctx, dbManager.Current().Database, vm.ParseBlock, toEngine); err != nil {
		log.Error("error initializing SnowmanVM: %v", err)
		return err
	}
	c := linearcodec.NewDefault()
	manager := codec.NewDefaultManager()
	if err := manager.RegisterCodec(codecVersion, c); err != nil {
		return err
	}
	vm.codec = manager

	// If database is empty, create it using the provided genesis data
	if !vm.DBInitialized() {
		if len(genesisData) > dataLen {
			return errBadGenesisBytes
		}

		// genesisData is a byte slice but each block contains an byte array
		// Take the first [dataLen] bytes from genesisData and put them in an array
		var genesisDataArr [dataLen]byte
		copy(genesisDataArr[:], genesisData)

		// Create the genesis block
		// Timestamp of genesis block is 0. It has no parent.
		genesisBlock, err := vm.NewBlock(ids.Empty, 0, genesisDataArr, time.Unix(0, 0))
		if err != nil {
			log.Error("error while creating genesis block: %v", err)
			return err
		}

		// Saves the genesis block to DB
		if err := vm.SaveBlock(vm.DB, genesisBlock); err != nil {
			log.Error("error while saving genesis block: %v", err)
			return err
		}

		// Accept the genesis block
		// Sets [vm.lastAccepted] and [vm.preferred]
		if err := genesisBlock.Accept(); err != nil {
			return fmt.Errorf("error accepting genesis block: %w", err)
		}

		// Sets DB status to initialized.
		if err := vm.SetDBInitialized(); err != nil {
			return fmt.Errorf("error while setting db to initialized: %w", err)
		}

		// Flush VM's database to underlying db
		if err := vm.DB.Commit(); err != nil {
			log.Error("error while committing db: %v", err)
			return err
		}
	}
	return nil
}
```

#### proposeBlock

This method adds a piece of data to the mempool and notifies the consensus layer of the blockchain that a new block is ready to be built and voted on. This is called by API method `ProposeBlock`, which we’ll see later.

```go
// proposeBlock appends [data] to [p.mempool].
// Then it notifies the consensus engine
// that a new block is ready to be added to consensus
// (namely, a block with data [data])
func (vm *VM) proposeBlock(data [dataLen]byte) {
    vm.mempool = append(vm.mempool, data)
    vm.NotifyBlockReady()
}
```

#### ParseBlock

Parse a block from its byte representation.

```go
// ParseBlock parses [bytes] to a snowman.Block
// This function is used by the vm's state to unmarshal blocks saved in state
// and by the consensus layer when it receives the byte representation of a block
// from another node
func (vm *VM) ParseBlock(bytes []byte) (snowman.Block, error) {
	// A new empty block
	block := &Block{}

	// Unmarshal the byte repr. of the block into our empty block
	_, err := vm.codec.Unmarshal(bytes, block)
	if err != nil {
		return nil, err
	}

	// Initialize the block
	// (Block inherits Initialize from its embedded *core.Block)
	block.Initialize(bytes, &vm.SnowmanVM)

	// Return the block
	return block, nil
}
```

#### CreateHandlers

Registed handlers defined in `Service`. See [below](#api) for more on APIs.

```go
// CreateHandlers returns a map where:
// Keys: The path extension for this blockchain's API (empty in this case)
// Values: The handler for the API
// In this case, our blockchain has only one API, which we name timestamp,
// and it has no path extension, so the API endpoint:
// [Node IP]/ext/bc/[this blockchain's ID]
// See API section in documentation for more information
func (vm *VM) CreateHandlers() map[string]*common.HTTPHandler {
    // Create the API handler (we'll see the declaration of Service further on)
    handler := vm.NewHandler("timestamp", &Service{vm})
    return map[string]*common.HTTPHandler{
        "": handler,
    }
}
```

#### CreateStaticHandlers

Registers static handlers defined in `StaticService`. See [below](#static-api) for more on static APIs.

```go
// CreateStaticHandlers returns a map where:
// Keys: The path extension for this VM's static API
// Values: The handler for that static API
// We return nil because this VM has no static API
// CreateStaticHandlers implements the common.StaticVM interface
func (vm *VM) CreateStaticHandlers() (map[string]*common.HTTPHandler, error) {
    newServer := rpc.NewServer()
    codec := cjson.NewCodec()
    newServer.RegisterCodec(codec, "application/json")
    newServer.RegisterCodec(codec, "application/json;charset=UTF-8")

    // name this service "timestamp"
    staticService := CreateStaticService()
    return map[string]*common.HTTPHandler{
        "": {LockOptions: common.WriteLock, Handler: newServer},
    }, newServer.RegisterService(staticService, "timestampvm")
}
```

### Static API

A VM may have a static API, which allows clients to call methods that do not query or update the state of a particular blockchain, but rather apply to the VM as a whole. This is analagous to static methods in computer programming. AvalancheGo uses [Gorilla’s RPC library](https://www.gorillatoolkit.org/pkg/rpc) to implement HTTP APIs.

`StaticService` implements the static API for our VM.

```go
// StaticService defines the static API for the timestamp vm
type StaticService struct{}
```

#### Encode

For each API method, there is:

- A struct that defines the method’s arguments
- A struct that defines the method’s return values
- A method that implements the API method, and is parameterized on the above 2 structs

This API method encodes a string to its byte representation using a given encoding scheme. It can be used to encode data that is then put in a block and proposed as the next block for this chain.

```go
// EncodeArgs are arguments for Encode
type EncodeArgs struct {
	Data     string              `json:"data"`
	Encoding formatting.Encoding `json:"encoding"`
}

// EncodeReply is the reply from Encoder
type EncodeReply struct {
	Bytes    string              `json:"bytes"`
	Encoding formatting.Encoding `json:"encoding"`
}

// Encoder returns the encoded data
func (ss *StaticService) Encode(_ *http.Request, args *EncodeArgs, reply *EncodeReply) error {
	bytes, err := formatting.Encode(args.Encoding, []byte(args.Data))
	if err != nil {
		return fmt.Errorf("couldn't encode data as string: %s", err)
	}
	reply.Bytes = bytes
	reply.Encoding = args.Encoding
	return nil
}
```

#### Decode

This API method is the inverse of `Encode`.

```go
// DecoderArgs are arguments for Decode
type DecoderArgs struct {
	Bytes    string              `json:"bytes"`
	Encoding formatting.Encoding `json:"encoding"`
}

// DecoderReply is the reply from Decoder
type DecoderReply struct {
	Data     string              `json:"data"`
	Encoding formatting.Encoding `json:"encoding"`
}

// Decoder returns the Decoded data
func (ss *StaticService) Decode(_ *http.Request, args *DecoderArgs, reply *DecoderReply) error {
	bytes, err := formatting.Decode(args.Encoding, args.Bytes)
	if err != nil {
		return fmt.Errorf("couldn't Decode data as string: %s", err)
	}
	reply.Data = string(bytes)
	reply.Encoding = args.Encoding
	return nil
}
```

### API

A VM may also have a non-static HTTP API, which allows clients to query and update the blockchain's state.

`Service`'s declaration is:

```go
// Service is the API service for this VM
type Service struct{ vm *VM }
```

Note that this struct has a reference to the VM, so it can query and update state.

This VM's API has two methods. One allows a client to get a block by its ID. The other allows a client to propose the next block of this blockchain.

#### timestampvm.getBlock

Get a block by its ID. If no ID is provided, get the latest block.

**Signature**

```cpp
timestampvm.getBlock({id: string}) ->
    {
        id: string,
        data: string,
        timestamp: int,
        parentID: string
    }
```

- `id` is the ID of the block being retrieved. If omitted from arguments, gets the latest block
- `data` is the base 58 \(with checksum\) representation of the block’s 32 byte payload
- `timestamp` is the Unix timestamp when this block was created
- `parentID` is the block’s parent

**Example Call**

```bash
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "timestampvm.getBlock",
    "params":{
        "id":"xqQV1jDnCXDxhfnNT7tDBcXeoH2jC3Hh7Pyv4GXE1z1hfup5K"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk
```

**Example Response**

```json
{
  "jsonrpc": "2.0",
  "result": {
    "timestamp": "1581717416",
    "data": "11111111111111111111111111111111LpoYY",
    "id": "xqQV1jDnCXDxhfnNT7tDBcXeoH2jC3Hh7Pyv4GXE1z1hfup5K",
    "parentID": "22XLgiM5dfCwTY9iZnVk8ZPuPe3aSrdVr5Dfrbxd3ejpJd7oef"
  },
  "id": 1
}
```

**Implementation**

```go
// APIBlock is the API representation of a block
type APIBlock struct {
    Timestamp int64  `json:"timestamp"` // Timestamp of most recent block
    Data      string `json:"data"`      // Data in the most recent block. Base 58 repr. of 5 bytes.
    ID        string `json:"id"`        // String repr. of ID of the most recent block
    ParentID  string `json:"parentID"`  // String repr. of ID of the most recent block's parent
}

// GetBlockArgs are the arguments to GetBlock
type GetBlockArgs struct {
    // ID of the block we're getting.
    // If left blank, gets the latest block
    ID string
}

// GetBlockReply is the reply from GetBlock
type GetBlockReply struct {
    APIBlock
}

// GetBlock gets the block whose ID is [args.ID]
// If [args.ID] is empty, get the latest block
func (s *Service) GetBlock(_ *http.Request, args *GetBlockArgs, reply *GetBlockReply) error {
	// If an ID is given, parse its string representation to an ids.ID
	// If no ID is given, ID becomes the ID of last accepted block
	var id ids.ID
	var err error
	if args.ID == "" {
		id, err = s.vm.LastAccepted()
		if err != nil {
			return fmt.Errorf("problem finding the last accepted ID: %s", err)
		}
	} else {
		id, err = ids.FromString(args.ID)
		if err != nil {
			return errors.New("problem parsing ID")
		}
	}

	// Get the block from the database
	blockInterface, err := s.vm.GetBlock(id)
	if err != nil {
		return errNoSuchBlock
	}

	block, ok := blockInterface.(*Block)
	if !ok { // Should never happen but better to check than to panic
		return errBadData
	}

	// Fill out the response with the block's data
	reply.APIBlock.ID = block.ID().String()
	reply.APIBlock.Timestamp = json.Uint64(block.Timestamp)
	reply.APIBlock.ParentID = block.ParentID().String()
	reply.Data, err = formatting.Encode(formatting.CB58, block.Data[:])
	return err
}
```

#### timestampvm.proposeBlock

Propose the next block on this blockchain.

**Signature**

```cpp
timestampvm.proposeBlock({data: string}) -> {success: bool}
```

- `data` is the base 58 \(with checksum\) representation of the proposed block’s 32 byte payload.

**Example Call**

```bash
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "timestampvm.proposeBlock",
    "params":{
        "data":"SkB92YpWm4Q2iPnLGCuDPZPgUQMxajqQQuz91oi3xD984f8r"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk
```

**Example Response**

```json
{
  "jsonrpc": "2.0",
  "result": {
    "Success": true
  },
  "id": 1
}
```

**Implementation**

```go
// ProposeBlockArgs are the arguments to ProposeValue
type ProposeBlockArgs struct {
    // Data for the new block. Must be base 58 encoding (with checksum) of 32 bytes.
    Data string
}

// ProposeBlockReply is the reply from function ProposeBlock
type ProposeBlockReply struct{
    // True if the operation was successful
    Success bool
}

// ProposeBlock is an API method to propose a new block whose data is [args].Data.
func (s *Service) ProposeBlock(_ *http.Request, args *ProposeBlockArgs, reply *ProposeBlockReply) error {
    // Decodes data
	bytes, err := formatting.Decode(formatting.CB58, args.Data)

    // Ensures byte length is as expected
	if err != nil || len(bytes) != dataLen {
		return errBadData
	}

	var data [dataLen]byte         // The data as a byte array
	copy(data[:], bytes[:dataLen]) // Copy [bytes] to [data]

    // proposes block with the data to VM
	s.vm.proposeBlock(data)
	reply.Success = true
	return nil
}
```

### Plugin

In order to make this VM compatible with `go-plugin`, we need to define a `main` package and method, which serves our VM over gRPC so that AvalancheGo can call its methods.

`main.go`'s contents are:

```go
func main() {
	log.Root().SetHandler(log.LvlFilterHandler(log.LvlDebug, log.StreamHandler(os.Stderr, log.TerminalFormat())))
	plugin.Serve(&plugin.ServeConfig{
		HandshakeConfig: rpcchainvm.Handshake,
		Plugins: map[string]plugin.Plugin{
			"vm": rpcchainvm.New(&timestampvm.VM{}),
		},

		// A non-nil value here enables gRPC serving for this plugin...
		GRPCServer: plugin.DefaultGRPCServer,
	})
}
```

Now AvalancheGo's `rpcchainvm` can connect to this plugin and calls its methods.

#### VM Aliases

It's possible to alias VMs and their API endpoints. For example, we can alias `TimestampVM` by creating a JSON file at `~/.avalanchego/configs/vms/aliases.json` with:

```json
{
  "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH": [
    "timestampvm",
    "timestamp"
  ]
}
```

Now, this VM's static API can be accessed at endpoints `/ext/vm/timestampvm` and `/ext/vm/timestamp`. 
Giving a VM an alias has other implications, as we'll see below.
For more details, see [here](../../references/command-line-interface.md#vm-configs).

#### Building the Executable

This VM has a [build script](https://github.com/ava-labs/timestampvm-rpc/blob/main/scripts/build.sh) that builds an executable of this VM (when invoked, it runs the `main` method from above.)

The path to the executable, as well as its name, can be provided to the build script via arguments. For example:

```zsh
./scripts/build.sh ../avalanchego/build/avalanchego-latest/plugins timestampvm
```

If the environment variable is not set, the path defaults to `$GOPATH/src/github.com/ava-labs/avalanchego/build/avalanchego-latestplugins/tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH` (`tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH` is the ID of this VM.)

AvalancheGo searches for and registers plugins under `[buildDir]/avalanchego-latest/plugins`. See [here](../../references/command-line-interface.md#build-directory) for more information.

Executable names must be either a full VM ID (encoded in CB58), or must be a VM alias defined by the [VM Aliases Config](../../references/command-line-interface.md#vm-configs).

In this tutorial, we used the VM's ID as the executable name to simplify the process. However, AvalancheGo would also accept `timestampvm` or `timestamp` since those are aliases for this VM.

### Wrapping Up

That’s it! That’s the entire implementation of a VM which defines a blockchain-based timestamp server.

In this tutorial, we learned:

- The `block.ChainVM` interface, which all VMs that define a linear chain must implement
- The `snowman.Block` interface, which all blocks that are part of a linear chain must implement
- The `core.SnowmanVM` and `core.Block` library types, which make defining VMs faster
- The `rpcchainvm` type, which allows blockchains to run in their own processes.

Now we can create a new blockchain with this custom virtual machine.

{% page-ref page="create-custom-blockchain.md" %}
