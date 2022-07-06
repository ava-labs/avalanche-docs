# Create a Blob Virtual Machine (VM)

## Introduction

Virtual Machine is a blueprint for a blockchain and a blockchain instantiates from VM, very much similar to a class-object relationship. Issuance of transactions, transaction types, block structure, block building algorithm, keeping pending transactions in the mempool, gossiping transactions to the connected nodes, etc. are defined in a virtual machine.

Virtual Machines can be broken down into components like **Transaction**, **Mempool**, **Network**, **Block**, etc. Each component works together to:

- Define the representation of the blockchain's state
- Represent the operations in that state
- Apply the operations in that state

## BlobVM

In this tutorial, we will learn all about virtual machines and how we can build them by taking references from [BlobVM](https://github.com/ava-labs/blobvm). It's a virtual machine that can be used to instantiate key-value blockchains for storing files like images, videos, etc. in an efficient way.

Blobs are small chunks of data. In BlobVM, we divide a file into small blobs and store them as a key-value pair. The key of these small chunks of a file is linked together as the children of the root. This tree is also stored as JSON data against the root's key.

## How to Use a VM

VM modules are served as a binary plugin to the `avalanchego` software. The nodes that want to power their chains using a particular VM, must have the built binary in their `avalanchego`'s `build/plugins` directory (see [here](../nodes/maintain/avalanchego-config-flags.md#--build-dir-string) for more details). There could be multiple VM plugins in this directory.

## High-Level Overview

Virtual Machines are created as a module, whose binary is registered (loaded) by a node running `avalanchego`, against a user-defined **vmID** (binary file name must be vmID). We can build multiple chains with the registered VM. A VM is registered, only when its built binary is present in the `build/plugins/` directory.

The VM exposes 3 things for interaction:

- **Static and Non-Static Handlers (API)** for making requests to VM methods
- **Service** for implementing handlers or APIs
- **Client** for making calls to the service's APIs

### What are Handlers

Handlers serve the response for the incoming HTTP requests. Handlers can also be wrapped with **gRPC** for efficiently making calls from other services such as `avalanchego`. Handler helps in creating APIs. VM implements 2 kinds of handlers:

- **Non-Static Handlers** - They help in interacting with blockchains instantiated by the VM. The API's endpoint will be different for different chains. `/ext/bc/[chainID]`
- **Static Handlers** - They help in directly accessing VM. These are optional for reasons such as parsing genesis bytes required to instantiate new blockchains. `/ext/vm/[vmID]`

### Registering a VM

While registering a VM, we store its **factory** against the user-defined **vmID**. As the name suggests, a VM factory can create new VM instances. Using the VM's instance, we can initialize it and can create a new chain. Note that, instantiating a VM is different than initializing it. We initialize the instance of a VM with parameters like genesis, database manager, etc. to create a functional chain.

```go
// Registering a factory inside avalanchego
func (m *manager) RegisterFactory(vmID ids.ID, factory Factory) error {
    ...
    m.factories[vmID] = factory
    ...
}
```

### Instantiating a VM

Each VM has a **factory** that is capable of creating new VM instances. A VM can be initialized as a chain along with handlers for accessing it, only when we have the VM's instance. The factory's `New` method shown below, returns the VM's instance to its caller in `avalanchego`.

```go
// Returning a new VM instance from VM's factory
func (f *Factory) New(*snow.Context) (interface{}, error) { return &vm.VM{}, nil }
```

VM's methods and other parts of the code are made available to `avalanchego` by **registering** its factory and instantiating a new VM using this factory whenever a chain is required to be built. It's generally in the [`factory.go`](https://github.com/ava-labs/blobvm/blob/master/factory.go) file of the VM.

```go
// Instantiating a new VM from its factory in avalanchego
func (m *manager) buildChain(chainParams ChainParameters, sb Subnet) (*chain, error) {
    ...
    vmFactory, err := m.VMManager.GetFactory(vmID)
    vm, err := vmFactory.New(ctx.Context)
    ...
}
```

### Initializing a VM

Chains are functional, only when the instantiated VMs are initialized. Initializing a VM involves setting up the database, block builder, mempool, genesis state, handlers, etc. This will expose the VM's API handlers, start accepting transactions, gossiping them across the network, building blocks, etc.

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

You can refer to the implementation of `vm.initialize` in the [BlobVM](https://github.com/ava-labs/blobvm/blob/master/vm/vm.go#L92) repository.

### Interaction

Once a VM is initialized, it becomes a functional chain. We can use the handlers to issue transactions, query chain state, and whatever functionalities are being provided by the VM.

### Consensus Engine

## Components of a Virtual Machine

We have to implement the following components in our virtual machine.

- **Transaction** - Transaction structure, initialization, execution etc.
- **Mempool** - Heap (min and max) for keeping pending transactions locally on the node.
- **Network** - Implements gossip of transactions from mempool to the network.
- **Block** - Handles block creation, initialization, verification, parsing, etc.
- **Builder** - Returns the built preferred block by including transactions from the mempool.
- **Block Builder** - Initiates the gossip of new transactions, notifies the engine that new blocks are ready to be built, and also handles next block generation notification.
- **Storage** - Stores and retrieves data of the chain's state.
- **Virtual Machine** - Entry point for all the components to orchestrate them according to the consensus engine and API requests.
- **Service** - API handlers for interacting with VM and initialized chain.
- **Client** - For interacting with service APIs.
- **Factory** - For creating new instances of the virtual machine.

## Transaction Lifecycle

Virtual Machine exposes APIs or handlers for users to make direct RPC to service or use the client to interact with the service. Every change on a chain can happen only through **transactions**. Let's see, how a transaction goes through the network to update the chain's state.

- User calls `client.IssueRawTx` or directly make RPC to `service`
- `service.IssueRawTx()` is called using handlers
  - Receive Tx bytes as arguments
  - Unmarshal bytes into Tx object
  - Initialize Tx object with message digest, txID etc.
  - Submit Tx to VM
- Tx is submitted to virtual machine - `vm.Submit()`
  - Get preferred (last accepted\*) block
  - Get execution context of the preferred block that includes
    - Recent TxIDs (Txns in the lookback window e.g last 10s as defined in Genesis)
    - Recent BlockIDs
    - Recent Price and Cost
    - Next Price, Next Cost etc.
  - Execute transaction locally with execution context, dummy database and block
  - Add valid transaction to mempool - `mempool.newTxs`
    - Call `mempool.addPending()` to signal VM to build block for the newly added tx
- Gossip new transactions from `mempool.newTxs` at regular intervals (defined in Genesis)
- (TODO) ProposerVM and Consensus engine to build block
- AvalancheGo consensus engine calls `vm.BuildBlock` and VM calls `chain.BuildBlock`
- Returns built block to avalanchego

## Coding the Virtual Machine

We have divided the components into 5 categories. We will be looking at each of these files and learning about their functions.

- vm
  - block_builder.go
  - chain_vm.go
  - network.go
  - service.go
  - vm.go
- chain
  - base_tx.go
  - unsigned_tx.go
  - tx.go
  - transfer_tx.go
  - set_tx.go
  - block.go
  - mempool.go
  - storage.go
  - builder.go
- mempool
  - mempool.go
- client
  - client.go
- tree
  - tree.go

### Block Builder

[Block builder](https://github.com/ava-labs/blobvm/blob/master/vm/block_builder.go) acts as a notifying service to the consensus engine. It serves the following functions:

- Regularly initiates the gossip of new transactions
- Regularly notifies consensus engine that new blocks are ready to be built
- Handles next block generation notification

VM has 3 block building status:

- **dontBuild** - There are no pending transactions and so block building is halted
- **building** - The engine has been notified and the block building is in process.
- **mayBuild** - There are pending transactions but waiting for the build interval before notifying

During initialization of VM, [NewTimeBuilder](https://github.com/ava-labs/blobvm/blob/master/vm/block_builder.go#L79) is returned to VM as `vm.builder`. The NewTimeBuilder also implements `Build()` and `Gossip()` methods and are invoked during VM initialization.

```go
go vm.builder.Build()
go vm.builder.Gossip()
```
[Gossip()](https://github.com/ava-labs/blobvm/blob/master/vm/block_builder.go#L183) method initiates gossip of new transactions from the mempool at regular intervals as set initially by `vm.config.GossipInterval`.

Functions of [Build()](https://github.com/ava-labs/blobvm/blob/master/vm/block_builder.go#L166) method:

- Calls `signalTxsReady()` whenever it receives pending transaction signal from mempool
- `signalTxsReady()` method does nothing if the status is other than `dontBuild`
- If status is `dontBuild`, it will call `markBuilding()` method
- `markBuilding()` notifies consensus engine that it has pending transactions
- And will set the block status to `building`

Whenever the consensus engine calls `vm.BuildBlock()`, the VM builds the block from the transactions in mempool and then calls the block builder method [HandleGenerateBlock()](https://github.com/ava-labs/blobvm/blob/master/vm/block_builder.go#L121). Let's have a look at this function:

- If there are still pending transactions, then it will set the status to `mayBuild`
- After BuildInterval, as set during VM initialization, it will call `buildBlockTwoStageTimer()`.
- `buildBlockTwoStageTimer` will call the `markBuilding()` method if the status is `mayBuild`

It also has 3 channels for gracefully shutting down VM.

```go
vm.doneBuild = make(chan struct{})
vm.doneGossip = make(chan struct{})
vm.builderStop = make(chan struct{})
```

`doneBuild` and `doneGossip` will prevent shutting down until `Build()` and `Gossip()` are stopped. Whereas `builderStop` is the channel to stop `Build()` and `Gossip()`. See the below [snippet](https://github.com/ava-labs/blobvm/blob/master/vm/vm.go#L228) from `blobvm/vm/vm.go`

```go
func (vm *VM) Shutdown() error {
    close(vm.stop)
    <-vm.doneBuild
    <-vm.doneGossip
    if vm.ctx == nil {
        return nil
    }
    return vm.db.Close()
}
```

### Network

[Network](https://github.com/ava-labs/blobvm/blob/master/vm/network.go) has the responsibility to gossip new transactions from the node's local mempool to every peer of the node. It implements the `GossipNewTxs()` function that will be called by the block builder at regular intervals.

```go
func (n *PushNetwork) GossipNewTxs(newTxs []*chain.Transaction) error {
	txs := []*chain.Transaction{}
	// Gossip at most the target units of a block at once
	for _, tx := range newTxs {
		if _, exists := n.gossipedTxs.Get(tx.ID()); exists {
			log.Debug("already gossiped, skipping", "txId", tx.ID())
			continue
		}
		n.gossipedTxs.Put(tx.ID(), nil)
		txs = append(txs, tx)
	}

	return n.sendTxs(txs)
}
```

It puts the recently gossiped transactions into a cache, so that, we do not have to re-send these transactions. Block builder also calls `RegossipTxs()` that will pop the transactions from mempool and gossip them even if they are in the cache.

The actual transfer of transactions happens through the `sendTxs()` method. It then sends the transactions as bytes to the `avalanchego` service through `appSender` that is being provided to VM during initialization. The `avalanchego` then gossips the transactions to the subnet's validators.

```go title="/blobvm/vm/network.go"
func (n *PushNetwork) sendTxs(txs []*chain.Transaction) error {
    if err := n.vm.appSender.SendAppGossip(b); err != nil {
        log.Warn(
            "GossipTxs failed",
            "error", err,
        )
        return err
    }
}
```

The other validators similarly receive incoming transactions from other validators via the `avalanchego` service on `vm/network.go`'s `AppGossip()` method. Once transaction bytes are received, it submits unmarshalled transaction objects to the VM.

```go
func (vm *VM) AppGossip(nodeID ids.NodeID, msg []byte) error {
	txs := make([]*chain.Transaction, 0)
	if _, err := chain.Unmarshal(msg, &txs); err != nil {
		return nil
	}

	// submit incoming gossip
	log.Debug("AppGossip transactions are being submitted", "txs", len(txs))
	if errs := vm.Submit(txs...); len(errs) > 0 {
		for _, err := range errs {

		}
	}

	return nil
}
```

### Service

[Service](https://github.com/ava-labs/blobvm/blob/master/vm/public_service.go) implements the API handlers to access the functions of the VM. VM has a method called [`CreateHandlers()`](https://github.com/ava-labs/blobvm/blob/master/vm/vm.go#L265) that will return the HTTP handler.

```go
func (vm *VM) CreateHandlers() (map[string]*common.HTTPHandler, error) {
    apis := map[string]*common.HTTPHandler{}
    public, err := newHandler(Name, &PublicService{vm: vm})
    if err != nil {
        return nil, err
    }
    apis[PublicEndpoint] = public
    return apis, nil
}
```

In the above function, a new RPC server is created with the `PublicService`. It implements all the RPCs supported by the virtual machine. It has access to a VM instance in its structure, that is passed while creating it (see the above function).

```go
type PublicService struct {
	vm *VM
}
```

Let's have a look at the [`IssueRawTx()`](https://github.com/ava-labs/blobvm/blob/master/vm/public_service.go#L63) service method -

```go
func (svc *PublicService) IssueRawTx(_ *http.Request, args *IssueRawTxArgs, reply *IssueRawTxReply) error {
	tx := new(chain.Transaction)
	if _, err := chain.Unmarshal(args.Tx, tx); err != nil {
		return err
	}

	// otherwise, unexported tx.id field is empty
	if err := tx.Init(svc.vm.genesis); err != nil {
		return err
	}
	reply.TxID = tx.ID()

	errs := svc.vm.Submit(tx)
	if len(errs) == 0 {
		return nil
	}
	if len(errs) == 1 {
		return errs[0]
	}
	return fmt.Errorf("%v", errs)
}
```
It accepts `IssueRawTxArgs` that contain transaction bytes. It processes the request as following

- Unmarshal transaction bytes into VM-defined transaction object
- Initialize transaction object with txID, digest hash, etc.
- Submit transaction object to VM.

Similarly, all other services are implemented.

### Mempool

[Mempool](https://github.com/ava-labs/blobvm/blob/master/mempool/mempool.go) is temporary memory for storing pending transactions. These are maintained at the local node level and can be flushed out when the node restarts. The new transactions received directly from a client or through app gossip, are stored inside this mempool.

Mempool is ideally a Max Heap that pushes new transactions into the heap according to the transaction's price. It keeps the transaction with the highest price at the top. Due to separate implementation of transaction heap and other complexities it has its own `mempool` directory.

Mempool is [initialized](https://github.com/ava-labs/blobvm/blob/master/vm/vm.go#L151) during the initialization of VM.

```go
vm.mempool = mempool.New(vm.genesis, vm.config.MempoolSize)
```

Whenever a transaction is submitted to VM, it first gets initialized, verified, and executed locally. If the transaction looks valid, then it is [added](https://github.com/ava-labs/blobvm/blob/master/vm/vm.go#L431) to mempool.

```go
vm.mempool.Add(tx)
```
`Add` method of mempool is implemented in the [mempool.go](https://github.com/ava-labs/blobvm/blob/master/mempool/mempool.go#L43) file. It has the following functions:

- Verifies if the transaction ID exists in the mempool or not
- Optimistically add the transaction to the max heap
- If the max heap size is larger than the configured size, then it will pop the minimum price tx.
- Add the transaction to `mempool.newTxs`
- Add notification in the `mempool.Pending` channel to indicate production of a new block

There are many other methods implemented. The code is well commented for you to understand.

### Builder

[Builder](https://github.com/ava-labs/blobvm/blob/master/chain/builder.go) implements the block building and returns the built block to the caller. It tries to build a new block from the preferred block as parent and transactions from mempool. It has a `BuildBlock()` function that is called when consensus engine called `vm.BuildBlock()`.

It performs the following task:

- Get the parent's stateless block using the preferred ID

```go
parent, err := vm.GetStatelessBlock(preferred)
```

- Get execution context that has recent block IDs, recent transaction IDs, next prices etc.

```go
context, err := vm.ExecutionContext(nextTime, parent)
```

- Gets new block, based on the above information

```go
b := NewBlock(vm, parent, nextTime, context)
```

- Prune the mempool that belongs to recent blocks

```go
mempool.Prune(context.RecentBlockIDs)
```

- Loads the transaction from mempool to aspiring block. It iterates through all the mempool transactions but ignores transactions whose gas units are [exceeding](https://github.com/ava-labs/blobvm/blob/master/chain/builder.go#L65) the remaining block limit, or whose price is [less](https://github.com/ava-labs/blobvm/blob/master/chain/builder.go#L59) that this block's price.

```go
for mempool.Len() > 0 {
    next, price := mempool.PopMax()
    if price < b.Price {
        mempool.Add(next)
        log.Debug("skipping tx: too low price", "block price", b.Price, "tx price", price)
        break
    }
    nextLoad := next.LoadUnits(g)
    if units+nextLoad > g.MaxBlockSize {
        unusableTxs = append(unusableTxs, next)
        log.Debug("skipping tx: too large", "block size", units, "tx load", nextLoad)
        continue // could be txs that fit that are smaller
    }
    // Verify that changes pass
    tvdb := versiondb.New(vdb)
    if err := next.Execute(g, tvdb, b, context); err != nil {
        log.Debug("skipping tx: failed verification", "err", err)
        continue
    }
    if err := tvdb.Commit(); err != nil {
        return nil, err
    }
    b.Txs = append(b.Txs, next)
    units += nextLoad
}
```

- Once transactions are added to the block, it will initialize the block to have the marshaled representation and block hash. It will also verify the block.

```go
if err := b.init(); err != nil {
    return nil, err
}
_, _, err = b.verify()
```

Finally, it will return the block to the caller, which is the VM and hence the consensus engine.

### Storage

[Storage](https://github.com/ava-labs/blobvm/blob/master/chain/storage.go) handles all the database operations like storing transactions, blocks, account balance etc. Everything is stored as key-value pair for all types (block, transaction, balance etc.) of data.

We prefix different types of key with a unique byte. For eg. block identifier is prefixed with `0x0` and transaction ID with `0x1`. Similarly we have [prefix](https://github.com/ava-labs/blobvm/blob/master/chain/storage.go#L56) for other types as well. The prefix and original ID is separated by a `ByteDelimiter`. Prefixing is necessary for identifying the type of raw byte a paticular key is pointing to.

```go
const (
	blockPrefix   = 0x0
	txPrefix      = 0x1
	txValuePrefix = 0x2
	keyPrefix     = 0x3
	balancePrefix = 0x4

	linkedTxLRUSize = 512

	ByteDelimiter byte = '/'
)
```

We have 5 types of key-value pairs in total -
* **Block** - For storing block data.
* **Transaction** - For storing transaction ID.
* **Transaction Value** - For storing transaction data i.e. the blob.
* **Key** - For storing metadata of a blob like blob size, associated txID and timestamp.
* **Balance** - For storing account balance.

Prefixing each type of data is handled in separate functions. For eg., block prefixing is handled [here](https://github.com/ava-labs/blobvm/blob/master/chain/storage.go#L47). It takes the `blockID` and returns something like `0x0/<blockID>` as a byte array.

```go
// [blockPrefix] + [delimiter] + [blockID]
func PrefixBlockKey(blockID ids.ID) (k []byte) {
	k = make([]byte, 2+len(blockID))
	k[0] = blockPrefix
	k[1] = ByteDelimiter
	copy(k[2:], blockID[:])
	return k
}
```

We have the following functions that will perform the write operation on the database. Every function is passed with a database instance where we want to store the data. -

- [SetBalance()](https://github.com/ava-labs/blobvm/blob/master/chain/storage.go#L312) and [ModifyBalance()](https://github.com/ava-labs/blobvm/blob/master/chain/storage.go#L319) - Update account balance
- [SetTransaction()](https://github.com/ava-labs/blobvm/blob/master/chain/storage.go#L268) - Set transaction ID
- [PutKey()](https://github.com/ava-labs/blobvm/blob/master/chain/storage.go#L258) - Set blob metadata. This will be called when executing the `SetTx`.
- [SetLastAccepted()](https://github.com/ava-labs/blobvm/blob/master/chain/storage.go#L193) - Add new block. This will be called when a block is verified.
- [linkValues()](https://github.com/ava-labs/blobvm/blob/master/chain/storage.go#L142) - Put block's transaction values to database. This will be called when adding new block with `SetLastAccepted()` function call.

Let's have a closer look at these functions:

- **SetBalance** - This function will set the balance of an address that will be passed as argument. This is called [internally](https://github.com/ava-labs/blobvm/blob/master/chain/storage.go#L336) by the `ModifyBalance()` function and while [allocating](https://github.com/ava-labs/blobvm/blob/master/chain/genesis.go#L115) the coins to airdrop addresses while creating the genesis block.

```go
func SetBalance(db database.KeyValueWriter, address common.Address, bal uint64) error {
	k := PrefixBalanceKey(address)
	b := make([]byte, 8)
	binary.BigEndian.PutUint64(b, bal)
	return db.Put(k, b)
}
```

- **ModifyBalance** - This function will modify the balance of an address depending upon the parameters `add` and `change`. It will simply perform the `SafeAdd` and `SafeSub` operation on the existing balance. `add` bool parameter indicates whether to add or to subtract the `change` amount from the existing balance. Finally it will call the `SetBalance` function with the updated amount.

    It is called while executing the transactions. For transfer transactions it will [reduce](https://github.com/ava-labs/blobvm/blob/master/chain/transfer_tx.go#L39) the sender's balance and [increase](https://github.com/ava-labs/blobvm/blob/master/chain/transfer_tx.go#L42) the receiver's balance. And for every transaction it will be called to [reduce](https://github.com/ava-labs/blobvm/blob/master/chain/tx.go#L104) the fee from the sender.

```go
func ModifyBalance(db database.KeyValueReaderWriter, address common.Address, add bool, change uint64) (uint64, error) {
	b, err := GetBalance(db, address)
	if err != nil {
		return 0, err
	}
	var (
		n     uint64
		xflow bool
	)
	if add {
		n, xflow = smath.SafeAdd(b, change)
	} else {
		n, xflow = smath.SafeSub(b, change)
	}
	if xflow {
		return 0, fmt.Errorf("%w: bal=%d, addr=%v, add=%t, prev=%d, change=%d", ErrInvalidBalance, b, address, add, b, change)
	}
	return n, SetBalance(db, address, n)
}
```

- **SetTransaction** - This function will simply put a key representing transaction ID to indicate the existance of particular transaction.

```go
func SetTransaction(db database.KeyValueWriter, tx *Transaction) error {
	k := PrefixTxKey(tx.ID())
	return db.Put(k, nil)
}
```

- **PutKey** - This function will store the metadata of a blob. Metadata includes blob size, transaction ID and timestamp. It will be [called](https://github.com/ava-labs/blobvm/blob/master/chain/set_tx.go#L41) while executing the transaction (`SetTx`).

```go
func PutKey(db database.KeyValueWriter, key common.Hash, vmeta *ValueMeta) error {
	// [keyPrefix] + [delimiter] + [key]
	k := ValueKey(key)
	rvmeta, err := Marshal(vmeta)
	if err != nil {
		return err
	}
	return db.Put(k, rvmeta)
}
```

- **SetLastAccepted** - This function will set the last accepted block ID and also store the block (passed in the argument) on the database. It will call the `linkValues` function to store the block transactions on the database. It will be [called](https://github.com/ava-labs/blobvm/blob/master/chain/block.go#L236) at the end of the block verification process.

```go
func SetLastAccepted(db database.KeyValueWriter, block *StatelessBlock) error {
	bid := block.ID()
	if err := db.Put(lastAccepted, bid[:]); err != nil {
		return err
	}
	ogTxs, err := linkValues(db, block)
	if err != nil {
		return err
	}
	sbytes, err := Marshal(block.StatefulBlock)
	if err != nil {
		return err
	}
	if err := db.Put(PrefixBlockKey(bid), sbytes); err != nil {
		return err
	}
	// Restore the original transactions in the block in case it is cached for
	// later use.
	block.Txs = ogTxs
	return nil
}
```

- **linkValues** - This function is called to store the block transaction values that are associated with blob (i.e. `SetTx`) on the database. It will loop over the transactions and will [store](https://github.com/ava-labs/blobvm/blob/master/chain/storage.go#L160) the blob value. Since the values are now stored separately, it will [replace](https://github.com/ava-labs/blobvm/blob/master/chain/storage.go#L163) the blob values in the block transactions with their transaction ID. The replaced value can again be restored by calling the [`restoreValues()`](https://github.com/ava-labs/blobvm/blob/master/chain/storage.go#L173) function with that block.

```go
func linkValues(db database.KeyValueWriter, block *StatelessBlock) ([]*Transaction, error) {
	g := block.vm.Genesis()
	ogTxs := make([]*Transaction, len(block.Txs))
	for i, tx := range block.Txs {
		switch t := tx.UnsignedTransaction.(type) {
		case *SetTx:
			if len(t.Value) == 0 {
				ogTxs[i] = tx
				continue
			}

			// Copy transaction for later
			cptx := tx.Copy()
			if err := cptx.Init(g); err != nil {
				return nil, err
			}
			ogTxs[i] = cptx

			if err := db.Put(PrefixTxValueKey(tx.ID()), t.Value); err != nil {
				return nil, err
			}
			t.Value = tx.id[:] // used to properly parse on restore
		default:
			ogTxs[i] = tx
		}
	}
	return ogTxs, nil
}
```

The [other functions](https://github.com/ava-labs/blobvm/blob/master/chain/storage.go) are for reading the data that we have stored using the above functions. These functions are commented as required for you to understand.

### Block

A block before getting accepted (or rejected) and being comitted to database, goes through proposal by a node, verification and consensus. Once it's persisted on the chain's state it becomes a **stateful** block. Until then it's a **stateless** block. After acceptance its stateless version is put into the cache, and the stateful version is put into the database.

[Stateful block](https://github.com/ava-labs/blobvm/blob/master/chain/block.go#L26) has only required fields in its structure like parentID, timestamp, height, transactions etc. since it will be stored on the database.

```go
type StatefulBlock struct {
	Prnt        ids.ID         `serialize:"true" json:"parent"`
	Tmstmp      int64          `serialize:"true" json:"timestamp"`
	Hght        uint64         `serialize:"true" json:"height"`
	Price       uint64         `serialize:"true" json:"price"`
	Cost        uint64         `serialize:"true" json:"cost"`
	AccessProof common.Hash    `serialize:"true" json:"accessProof"`
	Txs         []*Transaction `serialize:"true" json:"txs"`
}
```

Whereas [Stateless block](https://github.com/ava-labs/blobvm/blob/master/chain/block.go#L39) contains parameters like block's ID, status, timestamp, database instance (for getting stored when accepted), along with the aspiring stateful block. A stateless block is never written on the database, but remains in the node's memory or cache.

```go
type StatelessBlock struct {
	*StatefulBlock   `serialize:"true" json:"block"`
	id                ids.ID
	st                choices.Status
	t                 time.Time
	bytes             []byte
	vm                VM
	children          []*StatelessBlock
	onAcceptDB        *versiondb.Database
}
```

Let's have a look at the fields of StatelessBlock:

- **StatefulBlock** - It is the block that will be comitted to database once it is accepted.
- **bytes** - It is the serialized form of the StatefulBlock
- **id** - It is the Keccak256 hash of bytes field.
- **st** - It is the status of block and could be - processing, accepted or rejected.
- **children** - To store the child blocks in the stateless block
- **onAcceptDB** - It is a DB instance that we can use to save the block to the database

The VM signals consensus engine to build a block, whenever a new transaction is added to the mempool. But ProposerVM will delay the notification, until it is the node's turn to build the block. When it is the node's turn, the consensus engine will receive the notification and will call the VM's `BuildBlock()` method.

When consensus engine calls VM to build a block, the VM invokes [`NewBlock()`](https://github.com/ava-labs/blobvm/blob/1fbb655246a2a41861f40d603ad40299b177252a/chain/block.go#L52) function to get the stateless block using arguments parent block, timestamp and recent context.

```go
func NewBlock(vm VM, parent snowman.Block, tmstp int64, context *Context) *StatelessBlock {
    return &StatelessBlock{
        StatefulBlock: &StatefulBlock{
            Tmstmp: tmstp,
            Prnt:   parent.ID(),
            Hght:   parent.Height() + 1,
            Price:  context.NextPrice,
            Cost:   context.NextCost,
        },
        vm: vm,
        st: choices.Processing,
    }
}
```

A newly created block can be initialized with necessary details of a stateless block like block ID, bytes and timestamp using the block's [`init()`](https://github.com/ava-labs/blobvm/blob/master/chain/block.go#L112) method. This method is generally called when we have complete and final information about the stateful block inside. For e.g., this method is called at the end of builder's [`chain.BuildBlock()`](https://github.com/ava-labs/blobvm/blob/master/chain/builder.go#L85) method.

```go
func (b *StatelessBlock) init() error {
	bytes, err := Marshal(b.StatefulBlock)
	if err != nil {
		return err
	}
	b.bytes = bytes

	id, err := ids.ToID(crypto.Keccak256(b.bytes))
	if err != nil {
		return err
	}
	b.id = id
	b.t = time.Unix(b.StatefulBlock.Tmstmp, 0)
	g := b.vm.Genesis()
	for _, tx := range b.StatefulBlock.Txs {
		if err := tx.Init(g); err != nil {
			return err
		}
	}
	return nil
}
```

We can also get the initialized stateless block from the stateful block using the [`ParseStatefulBlock()`](https://github.com/ava-labs/blobvm/blob/master/chain/block.go#L78) method. This is generally used when we have fetched a stateful block from the database, but we also need a stateless block, as used [here](https://github.com/ava-labs/blobvm/blob/master/vm/vm.go#L348).

A block once built, has 3 states:

- **Verified**
  - A verified block can be accepted or rejected
  - Store block to database (will not be saved until accepted)
  - Add to `vm.verifiedBlocks`
  - Remove block transactions from mempool
- **Rejected**
  - Delete block from `vm.verifiedBlocks`
  - Re-add txns to mempool
- **Accepted**
  - Commit block to database to permanently store it
  - Delete block from `vm.verifiedBlocks`
  - Add block to `vm.blocks` cache

When consensus engine receives the built block, it calls the block's [`Verify()`](https://github.com/ava-labs/blobvm/blob/master/chain/block.go#L227) method. This method serves the following functions* -

- At least 1 transaction and block timestamp should be within 10s in future (futureBound).

```go
if len(b.Txs) == 0 {
  return nil, nil, ErrNoTxs
}
if b.Timestamp().Unix() >= time.Now().Add(futureBound).Unix() {
  return nil, nil, ErrTimestampTooLate
}
```

- Transactions' total gas units should not exceed block gas limit.

```go
blockSize := uint64(0)
for _, tx := range b.Txs {
  blockSize += tx.LoadUnits(g)
  if blockSize > g.MaxBlockSize {
    return nil, nil, ErrBlockTooBig
  }
}
```

- Verify the parent block is available and has timestamp earlier than the block timestamp.

```go
parent, err := b.vm.GetStatelessBlock(b.Prnt)
if err != nil {
  log.Debug("could not get parent", "id", b.Prnt)
  return nil, nil, err
}
if b.Timestamp().Unix() < parent.Timestamp().Unix() {
  return nil, nil, ErrTimestampTooEarly
}
```

- Check cost and price for the current block with respect to the lookback window from parent block timestamp. This information is provided in the [execution context](https://github.com/ava-labs/blobvm/blob/master/vm/chain_vm.go#L64) of the block.

```go
context, err := b.vm.ExecutionContext(b.Tmstmp, parent)
if err != nil {
  return nil, nil, err
}
if b.Cost != context.NextCost {
  return nil, nil, ErrInvalidCost
}
if b.Price != context.NextPrice {
  return nil, nil, ErrInvalidPrice
}
```

- Create a new DB instance on top of parent's DB instance, and link it with block's `onAccept`.

```go
parentState, err := parent.onAccept()
if err != nil {
  return nil, nil, err
}
onAcceptDB := versiondb.New(parentState)
```

Now using this `onAccept`, we can commit the block to the chain's state (or database).

- Check if the extra fee from all the included transactions is greater than the required surplus

```go
surplusFee := uint64(0)
for _, tx := range b.Txs {
  if err := tx.Execute(g, onAcceptDB, b, context); err != nil {
    return nil, nil, err
  }
  surplusFee += (tx.GetPrice() - b.Price) * tx.FeeUnits(g)
}

// Ensure enough fee is paid to compensate for block production speed
requiredSurplus := b.Price * b.Cost
if surplusFee < requiredSurplus {
  return nil, nil, fmt.Errorf("%w: required=%d found=%d", ErrInsufficientSurplus, requiredSurplus, surplusFee)
}
```

The verification is not complete until it will it save the verified state on the local memory:

- Put the block on the database against the block's ID as its key
- Put the block ID as last accepted block on the database
- Put the block to the VM's verified block's map

Note that the block is not saved to database until it's accepted i.e. the `Accept()` method is called.

```go
// Set last accepted block and store
if err := SetLastAccepted(b.onAcceptDB, b); err != nil {
  return err
}

parent.addChild(b)
b.vm.Verified(b)
```

[`SetLastAccepted()`](https://github.com/ava-labs/blobvm/blob/master/chain/storage.go#L193) function shown above will set the last accepted block ID and also store the block to database memory, but will not commit until it is accepted.

Once a block is verified, it will be sent to the network to achieve consensus on it. The verified blocks has 2 verdicts - **Accepted** or **Rejected**. A block's [`Accept()`](https://github.com/ava-labs/blobvm/blob/master/chain/block.go#L246) or [`Reject()`](https://github.com/ava-labs/blobvm/blob/master/chain/block.go#L261) method will be called depending upon the consensus result.

```go
func (b *StatelessBlock) Accept() error {
	if err := b.onAcceptDB.Commit(); err != nil {
		return err
	}
	for _, child := range b.children {
		if err := child.onAcceptDB.SetDatabase(b.vm.State()); err != nil {
			return err
		}
	}
	b.st = choices.Accepted
	b.vm.Accepted(b)
	return nil
}

// implements "snowman.Block.choices.Decidable"
func (b *StatelessBlock) Reject() error {
	b.st = choices.Rejected
	b.vm.Rejected(b)
	return nil
}
```

### Base Transaction

### Unsigned Transaction

### Transaction

### Transfer Transaction

### Set Transaction

### Chain VM

### VM
