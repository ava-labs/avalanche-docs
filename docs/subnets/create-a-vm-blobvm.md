# How to Build a Complex VM

This is part of a series of tutorials for building a Virtual Machine (VM):

- [Introduction to Virtual Machines](./introduction-to-vm.md)
- [How to Build a Simple VM](./create-a-vm-timestampvm.md)
- How to Build a Complex VM (this article)

## Introduction

In this tutorial, we will learn all about how we can build a virtual machine by referencing [the BlobVM](https://github.com/ava-labs/blobvm). It's a Virtual Machine that can be used to instantiate key-value blockchains for storing files like images, videos, etc. in an efficient way.

Blobs are small chunks of data. In BlobVM, we divide a file into small blobs and store them as key-value pairs. The key of these small file chunks are linked together as the children of the root. This tree is also stored as JSON against the root's key.

## Prerequisites

Make sure you have followed the previous tutorials in this series:

- [Introduction to Virtual Machines](./introduction-to-vm.md)
- [How to Build a Simple VM](./create-a-vm-timestampvm.md)

## Components of the BlobVM

The main task of a VM is to represent the initial state (genesis state) and block structure containing state transitioning details. One of the most common structures to represent state transitions is the **transaction**. When a block with transactions is applied to the current state, the state transition will happen by simply executing the transactions. The order of transactions matters here.

BlobVM has the following components to handle the tasks from transaction to block acceptance:

- **Transaction** - Transaction structure, initialization, execution etc.
- **Mempool** - Heap (min and max) for keeping pending transactions locally on the node.
- **Network** - Implements gossip of transactions from mempool to the network.
- **Block** - Handles block creation, initialization, verification, parsing, etc.
- **Builder** - Returns the built preferred block by including transactions from the mempool.
- **Block Builder** - Initiates the gossip of new transactions, notifies the engine that new blocks are ready to be built, and also handles next block generation notification.
- **Storage** - Stores and retrieves data of the chain's state.
- **Virtual Machine** - Entry point for all the components to orchestrate them according to the consensus engine and API requests.
- **Service** - API handlers for interacting with the VM and initialized chain.
- **Factory** - For creating new instances of the Virtual Machine.

## Transaction Lifecycle in BlobVM

A Virtual Machine exposes APIs or handlers for users to make direct RPC to aservice. All changes on a chain happen through blocks and more specifically transactions. A VM handles transactions internally since the consensus engine only cares about blocks. Let's see how a transaction goes through the network to update the chain's state:

- A user make an RPC request to `service.IssueRawTx()`
- `service.IssueRawTx()` is called using handlers to
  - Receive the transaction bytes as arguments
  - Unmarshal the bytes into a transaction object
  - Initialize the transaction object with message digest, txID, etc.
  - Submit the transaction to the VM
- The transaction is submitted to the Virtual Machine - `vm.Submit()` to
  - Get the preferred (last accepted) block
  - Get the execution context of the preferred block that includes
    - Recent TxIDs (Txns in the lookback window e.g last 10s as defined in Genesis)
    - Recent BlockIDs
    - Recent Price and Cost
    - Next Price, Next Cost, etc.
  - Execute the transaction locally with the execution context, dummy database, and block
  - Add a valid transaction to mempool - `mempool.newTxs`
    - Call `mempool.addPending()` to signal the VM to build a block for the newly added tx
- The node running the VM then gossips any new transactions to its peers from `mempool.newTxs` at regular intervals
- The VM signals the consensus engine to build blocks out of pending transactions in the mempool
- ProposerVM delays the request until it's the node's turn to propose a block
- The consensus engine calls `vm.BuildBlock()` to get the block from the VM
- The Engine calls `block.Verify()` method
- Successfully verified blocks have been gossiped within the network for consensus
- Blocks containing transactions are accepted or rejected according to the consensus results
- Accepted blocks and related data are committed to the node's database

## Coding the Virtual Machine

We have divided the components into 3 packages. We will be looking at each of these files and learning about their functions.

- **[vm](https://github.com/ava-labs/blobvm/tree/master/vm)**
  - block_builder.go
  - chain_vm.go
  - network.go
  - service.go
  - vm.go
- **[chain](https://github.com/ava-labs/blobvm/tree/master/chain)**
  - unsigned_tx.go
  - base_tx.go
  - transfer_tx.go
  - set_tx.go
  - tx.go
  - block.go
  - mempool.go
  - storage.go
  - builder.go
- **[mempool](https://github.com/ava-labs/blobvm/tree/master/mempool)**
  - mempool.go

### Transactions

At the very basic level, the state of a chain can only be updated by issuing a signed transaction. A signed transaction contains an unsigned transaction and a signature (of the sender). The signature is necessary to identify the sender. In a Virtual Machine we can have multiple types of unsigned transactions to achieve different tasks. In BlobVM we have 2 types of unsigned transactions:

- [TransferTx](https://github.com/ava-labs/blobvm/blob/master/chain/transfer_tx.go) - For transferring coins between accounts.
- [SetTx](https://github.com/ava-labs/blobvm/blob/master/chain/set_tx.go) - For storing blob data on the chain.

A complete transaction consists of 2 parts:

- Unsigned Transaction
- Signature

#### UnsignedTx

All [unsigned transactions](https://github.com/ava-labs/blobvm/blob/master/chain/unsigned_tx.go) have common basic functionality along with their customizations. `BaseTx` handles all the common functionality. For eg. `SetTx` and `TransferTx` have their implementation of the unsigned transaction, with a common extension from `BaseTx`. This is explained later in the doc.

`TransferTx` and `SetTx` are unsigned transactions and have to implement the following methods:

```go
type UnsignedTransaction interface {
	Copy() UnsignedTransaction
	GetBlockID() ids.ID
	GetMagic() uint64
	GetPrice() uint64
	SetBlockID(ids.ID)
	SetMagic(uint64)
	SetPrice(uint64)
	FeeUnits(*Genesis) uint64  // number of units to mine tx
	LoadUnits(*Genesis) uint64 // units that should impact fee rate

	ExecuteBase(*Genesis) error
	Execute(*TransactionContext) error
	TypedData() *tdata.TypedData
	Activity() *Activity
}
```

#### BaseTx

Most of the methods of an unsigned transaction are implemented by the [`BaseTx`](https://github.com/ava-labs/blobvm/blob/master/chain/base_tx.go). The values like blockID, transaction price, and magic number are set while creating an unsigned transaction. Let's look at these basic methods:

- [`SetBlockID()`](https://github.com/ava-labs/blobvm/blob/master/chain/base_tx.go#L26) sets the block ID for the last accepted block.
- [`GetBlockID()`](https://github.com/ava-labs/blobvm/blob/master/chain/base_tx.go#L22) returns the block ID.
- [`SetMagic()`](https://github.com/ava-labs/blobvm/blob/master/chain/base_tx.go#L34) sets the magic number that will differentiate chains to prevent replay attacks
- [`GetMagic()`](https://github.com/ava-labs/blobvm/blob/master/chain/base_tx.go#L30) gets the magic number. Magic number is defined in genesis.
- [`SetPrice()`](https://github.com/ava-labs/blobvm/blob/master/chain/base_tx.go#L42) sets the price per fee unit for this transaction.
- [`GetPrice()`](https://github.com/ava-labs/blobvm/blob/master/chain/base_tx.go#L38) gets the price for this transaction.
- [`FeeUnits()`](https://github.com/ava-labs/blobvm/blob/master/chain/base_tx.go#L59) returns the fee units this transaction will consume.
- [`LoadUnits()`](https://github.com/ava-labs/blobvm/blob/master/chain/base_tx.go#L63) same as fee units that return the units this transaction will consume.
- [`ExecuteBase()`](https://github.com/ava-labs/blobvm/blob/master/chain/base_tx.go#L46) executes the basic checks for a transaction like magic number validation, minimum transaction price, etc.

```go
func (b *BaseTx) ExecuteBase(g *Genesis) error {
	if b.BlockID == ids.Empty {
		return ErrInvalidBlockID
	}
	if b.Magic != g.Magic {
		return ErrInvalidMagic
	}
	if b.Price < g.MinPrice {
		return ErrInvalidPrice
	}
	return nil
}
```

- [`Execute()`](https://github.com/ava-labs/blobvm/blob/master/chain/unsigned_tx.go#L34) executes the specific check for a transaction and may perform a state change on the database instance provided as an argument. Each type of transaction should implement its own `execute` method. For example, `TransferTx` executes a balance modification, i.e. add transfer amount to the receiver and deducts the same amount from the sender.

A transaction is executed 2 times: [before including](https://github.com/ava-labs/blobvm/blob/master/vm/vm.go#L428) it in mempool and [during verification](https://github.com/ava-labs/blobvm/blob/master/chain/block.go#L213) of the block containing this transaction. As mentioned earlier, verification of a block happens before gossiping it within the network for consensus.

During a transaction's inclusion in the mempool, it is executed with a dummy database, and the database is aborted after the transaction's execution so that the transaction state is not saved to the disk.

Whereas during a block's verification, all the transactions in the block is executed with the parent's database instance. After the block is accepted, the database is committed so that the transaction's state is saved to the disk.

By committing or aborting a database, we save or reject its state on the disk

Let's have a detailed look on `TransferTx` and `SetTx`:

#### TransferTx

We create a transaction of type `TransferTx` when we want to transfer coins from one account to another. We can create this unsigned transaction using the [`TransferTx` struct](https://github.com/ava-labs/blobvm/blob/master/chain/transfer_tx.go#L16).

```go
type TransferTx struct {
	*BaseTx `serialize:"true" json:"baseTx"`

	// To is the recipient of the [Units].
	To common.Address `serialize:"true" json:"to"`

	// Units are transferred to [To].
	Units uint64 `serialize:"true" json:"units"`
}
```

As you can see above `TransferTx` also includes `BaseTx` because most of the methods of an unsigned transaction are already implemented there.

The most important method that every unsigned transaction should implement is [`Execute()`](https://github.com/ava-labs/blobvm/blob/master/chain/transfer_tx.go#L26) method. It performs transaction-related checks that are not present in basic transactions and can also change the state.

```go
func (t *TransferTx) Execute(c *TransactionContext) error {
	// Must transfer to someone
	if bytes.Equal(t.To[:], zeroAddress[:]) {
		return ErrNonActionable
	}

	// This prevents someone from transferring to themselves.
	if bytes.Equal(t.To[:], c.Sender[:]) {
		return ErrNonActionable
	}
	if t.Units == 0 {
		return ErrNonActionable
	}
	if _, err := ModifyBalance(c.Database, c.Sender, false, t.Units); err != nil {
		return err
	}
	if _, err := ModifyBalance(c.Database, t.To, true, t.Units); err != nil {
		return err
	}
	return nil
}
```

The execution method above performs checks such as: the address should not be empty, sender and receiver should not be same and fee units should not be 0. It also performs the state change by modifying the sender and receiver's balance.

#### SetTx

Transaction of type `SetTx` is used for storing blob data on the chain. We can create this unsigned transaction by using the [`SetTx` struct](https://github.com/ava-labs/blobvm/blob/master/chain/set_tx.go#L15). The `value` field holds the blob bytes.

```go
type SetTx struct {
	*BaseTx `serialize:"true" json:"baseTx"`

	Value []byte `serialize:"true" json:"value"`
}
```

`SetTx` has also implemented its own [`FeeUnits` method](https://github.com/ava-labs/blobvm/blob/master/chain/set_tx.go#L48). This is to compensate the network according to the size of the blob a particular transaction wants to store.

```go
func (s *SetTx) FeeUnits(g *Genesis) uint64 {
	// We don't subtract by 1 here because we want to charge extra for any
	// value-based interaction (even if it is small or a delete).
	return s.BaseTx.FeeUnits(g) + valueUnits(g, uint64(len(s.Value)))
}
```

`SetTx`'s [`Execute()` method](https://github.com/ava-labs/blobvm/blob/master/chain/set_tx.go#L21) handles checks such as: blob value should not be empty, its size should not exceed maximum allowed limit and blob should not be already existing by comparing the blob's hash.

```go
func (s *SetTx) Execute(t *TransactionContext) error {
	g := t.Genesis
	switch {
	case len(s.Value) == 0:
		return ErrValueEmpty
	case uint64(len(s.Value)) > g.MaxValueSize:
		return ErrValueTooBig
	}

	k := ValueHash(s.Value)

	// Do not allow duplicate value setting
	_, exists, err := GetValueMeta(t.Database, k)
	if err != nil {
		return err
	}
	if exists {
		return ErrKeyExists
	}

	return PutKey(t.Database, k, &ValueMeta{
		Size:    uint64(len(s.Value)),
		TxID:    t.TxID,
		Created: t.BlockTime,
	})
}
```

Apart from typical checks, it will also store the [metadata](https://github.com/ava-labs/blobvm/blob/master/chain/set_tx.go#L41) on the provided database instance.

#### Signed Transaction

We cannot issue unsigned transactions to the network. The sender needs to add its signature with the unsigned transaction to make a [signed transaction](https://github.com/ava-labs/blobvm/blob/master/chain/tx.go). A signature is basically an [ECDSA signature](https://cryptobook.nakov.com/digital-signatures/ecdsa-sign-verify-messages) (using sender's private key) of the [KECCAK256](https://keccak.team/keccak.html) hash of [typed unsigned transaction data (Digest hash)](https://eips.ethereum.org/EIPS/eip-712).

```go
type Transaction struct {
	UnsignedTransaction `serialize:"true" json:"unsignedTransaction"`
	Signature           []byte `serialize:"true" json:"signature"`

	digestHash []byte
	bytes      []byte
	id         ids.ID
	size       uint64
	sender     common.Address
}
```

A new signed transaction can be created using the [`NewTx` function](https://github.com/ava-labs/blobvm/blob/master/chain/tx.go#L25) by passing the unsigned transaction and the signature. To populate the rest of the fields like digestHash, bytes, id, etc. we can call the new transaction's [`init()` method](https://github.com/ava-labs/blobvm/blob/master/chain/tx.go#L45). The code is self-explanatory.

```go
func NewTx(utx UnsignedTransaction, sig []byte) *Transaction {
	return &Transaction{
		UnsignedTransaction: utx,
		Signature:           sig,
	}
}
```

The unsigned transaction's `Execute()` method is never called directly, even before adding it to mempool or during verification of a block. The `Execute()` method of the signed transaction performs the execution of the underlying unsigned transaction. It performs the following task:

- Executes the basic part of the unsigned transaction (`ExecuteBase`).
- Parent block of the transaction (blockID) should be one of the recent blocks.
- Transaction ID must not be recently executed.
- Modify the sender's balance to reduce transaction fees.
- Checks if transaction price per unit is more than the next expected block's price.
- Execute the underlying unsigned transaction.
- Set transaction ID as the key on the database passed as an argument.

```go
func (t *Transaction) Execute(g *Genesis, db database.Database, blk *StatelessBlock, context *Context) error {
	if err := t.UnsignedTransaction.ExecuteBase(g); err != nil {
		return err
	}
	if !context.RecentBlockIDs.Contains(t.GetBlockID()) {
		// Hash must be recent to be any good
		// Should not happen beause of mempool cleanup
		return ErrInvalidBlockID
	}
	if context.RecentTxIDs.Contains(t.ID()) {
		// Tx hash must not be recently executed (otherwise could be replayed)
		//
		// NOTE: We only need to keep cached tx hashes around as long as the
		// block hash referenced in the tx is valid
		return ErrDuplicateTx
	}

	// Ensure sender has balance
	if _, err := ModifyBalance(db, t.sender, false, t.FeeUnits(g)*t.GetPrice()); err != nil {
		return err
	}
	if t.GetPrice() < context.NextPrice {
		return ErrInsufficientPrice
	}
	if err := t.UnsignedTransaction.Execute(&TransactionContext{
		Genesis:   g,
		Database:  db,
		BlockTime: uint64(blk.Tmstmp),
		TxID:      t.id,
		Sender:    t.sender,
	}); err != nil {
		return err
	}
	if err := SetTransaction(db, t); err != nil {
		return err
	}
	return nil
}
```

Here's the overview on how to create and issue a signed transaction:

- Create an unsigned transaction with required fields.

```go
utx := &chain.SetTx{
    BaseTx: &chain.BaseTx{},
    Value:  "chunk data",
}
```

- Set unsigned transaction parameters.

```go
utx.SetBlockID(la)
utx.SetMagic(g.Magic)
utx.SetPrice(price + blockCost/utx.FeeUnits(g))
```

- Calculate the [digest hash](https://github.com/ava-labs/blobvm/blob/master/chain/tx.go#L41) for unsigned transaction.

```go
dh, err := chain.DigestHash(utx)
```

- [Sign](https://github.com/ava-labs/blobvm/blob/master/chain/crypto.go#L17) the digest hash with the sender's private key.

```go
sig, err := chain.Sign(dh, priv)
```

- Create and initialize the new signed transaction.

```go
tx := chain.NewTx(utx, sig)
if err := tx.Init(g); err != nil {
    return ids.Empty, 0, err
}
```

- Issue the raw transaction bytes to the client

```go
txID, err = cli.IssueRawTx(ctx, tx.Bytes())
```

### Mempool

[The Mempool](https://github.com/ava-labs/blobvm/blob/master/mempool/mempool.go) is temporary memory for storing pending transactions. These are maintained at the local node level and can be flushed out when the node restarts. The new transactions received directly from a user or through app gossip, are stored inside this mempool.

Ideally the Mempool is a Max Heap that pushes new transactions into the heap according to the transaction's price. It keeps the transaction with the highest price at the top and is [initialized](https://github.com/ava-labs/blobvm/blob/master/vm/vm.go#L151) during the initialization of VM.

```go
vm.mempool = mempool.New(vm.genesis, vm.config.MempoolSize)
```

Whenever a transaction is submitted to VM, it first gets initialized, verified, and executed locally. If the transaction looks valid, then it's [added to mempool](https://github.com/ava-labs/blobvm/blob/master/vm/vm.go#L431).

```go
vm.mempool.Add(tx)
```

The Mempool's `Add` method is implemented in the [mempool.go](https://github.com/ava-labs/blobvm/blob/master/mempool/mempool.go#L43) file. It has the following functions:

- Verifies if the transaction ID exists in the mempool or not.
- Optimistically add the transaction to the max heap.
- If the max heap size is larger than the configured size, then it will pop the minimum price tx.
- Add the transaction to `mempool.newTxs`.
- Add notification in the `mempool.Pending` channel to indicate production of a new block.

There are many other methods implemented. The code is well commented for you to understand.

### Block Builder

[Block builder](https://github.com/ava-labs/blobvm/blob/master/vm/block_builder.go) acts as a notifying service to the consensus engine. It serves the following functions:

- Regularly initiates the gossip of new transactions.
- Regularly notifies the consensus engine that new blocks are ready to be built.
- Handles next block generation notification.

VM has 3 block building status:

- **dontBuild** - There are no pending transactions and so block building is halted.
- **building** - The engine has been notified and the block building is in process.
- **mayBuild** - There are pending transactions but waiting for the build interval before notifying.

During initialization of the VM, [`NewTimeBuilder`](https://github.com/ava-labs/blobvm/blob/master/vm/block_builder.go#L79) is returned to VM as `vm.builder`. `NewTimeBuilder` also implements the `Build()` and `Gossip()` methods which are invoked during VM initialization.

```go
go vm.builder.Build()
go vm.builder.Gossip()
```

The [`Gossip()`](https://github.com/ava-labs/blobvm/blob/master/vm/block_builder.go#L183) method initiates gossip of new transactions from the mempool at regular intervals as set initially by `vm.config.GossipInterval`.

Functions of [the `Build()` method](https://github.com/ava-labs/blobvm/blob/master/vm/block_builder.go#L166) method:

- Calls `signalTxsReady()` whenever it receives pending transaction signal from mempool.
- `signalTxsReady()` method does nothing if the status is other than `dontBuild`.
- If status is `dontBuild`, it will call `markBuilding()` method.
- `markBuilding()` notifies the consensus engine that it has pending transactions.
- And will set the block status to `building`.

Whenever the consensus engine calls `vm.BuildBlock()`, the VM builds the block from the transactions in mempool and then calls the block builder method [`HandleGenerateBlock()`](https://github.com/ava-labs/blobvm/blob/master/vm/block_builder.go#L121). Let's have a look at this function:

- If there are still pending transactions then it will set the status to `mayBuild`.
- After BuildInterval, as set during VM initialization, it will call `buildBlockTwoStageTimer()`.
- `buildBlockTwoStageTimer` will call the `markBuilding()` method if the status is `mayBuild`.

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

[Network](https://github.com/ava-labs/blobvm/blob/master/vm/network.go) has the responsibility for gossiping new transactions from the node's local mempool to every peer of the node. It implements the `GossipNewTxs()` function that will be called by the block builder at regular intervals.

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

It puts the recently gossiped transactions into a cache so that we don't have to re-send these transactions. Block builder also calls `RegossipTxs()` that will pop the transactions from mempool and gossip them even if they are in the cache.

The actual transfer of transactions happens through the `sendTxs()` method. It then sends the transactions as bytes to the `avalanchego` service through `appSender` that is being provided to VM during initialization. `avalanchego` then gossips the transactions to the subnet's validators.

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

### Block

Before getting accepted (or rejected) and being committed to the database, a block goes through a proposal by a node, verification, and consensus. Once it's persisted on the chain's state it becomes a **stateful** block. Until then it's a **stateless** block. After acceptance its stateless version is put into the cache and the stateful version is put into the database.

A [Stateful Block](https://github.com/ava-labs/blobvm/blob/master/chain/block.go#L26) has only required fields in its structure like `parentID`, `timestamp`, `height`, `transactions`, etc. since it will be stored on the database.

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

Whereas a [Stateless Block](https://github.com/ava-labs/blobvm/blob/master/chain/block.go#L39) contains parameters like the block's ID, status, timestamp, database instance (for getting stored when accepted), along with the aspiring stateful block. A stateless block is never written on the database but remains in the node's memory or cache.

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

- **StatefulBlock** - It is the block that will be committed to the database once it is accepted.
- **bytes** - It is the serialized form of the `StatefulBlock`.
- **id** - It is the Keccak256 hash of the bytes field.
- **st** - It is the status of the block and could be - `processing`, `accepted`, or `rejected`.
- **children** - To store the child blocks in the stateless block.
- **onAcceptDB** - It is a DB instance that we can use to save the block to the database.

The VM signals the consensus engine to build a block, whenever a new transaction is added to the mempool. But `ProposerVM` will delay the notification until it's the node's turn to build the block. When it's the node's turn the consensus engine will receive the notification and will call the VM's `BuildBlock()` method.

When the consensus engine calls VM to build a block, the VM invokes the [`NewBlock()`](https://github.com/ava-labs/blobvm/blob/master/chain/block.go#L52) function to get the stateless block using for arguments the parent block, timestamp and recent context.

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

A newly created block can be initialized with the necessary details of a stateless block like block ID, bytes, and timestamp using the block's [`init()` method](https://github.com/ava-labs/blobvm/blob/master/chain/block.go#L112). This method is generally called when we have complete and final information about the stateful block inside. For example, this method is called at the end of the builder's [`chain.BuildBlock()`](https://github.com/ava-labs/blobvm/blob/master/chain/builder.go#L85) method.

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

We can also get the initialized stateless block from the stateful block using the [`ParseStatefulBlock()` method](https://github.com/ava-labs/blobvm/blob/master/chain/block.go#L78). This is generally used when we have fetched a stateful block from the database, but we also need a stateless block, as used [here](https://github.com/ava-labs/blobvm/blob/master/vm/vm.go#L348).

A block once built, has 3 states:

- **Verified**
  - A verified block can be accepted or rejected
  - Store the block to database (will not be saved until accepted)
  - Add to `vm.verifiedBlocks`
  - Remove the block transactions from mempool
- **Rejected**
  - Delete the block from `vm.verifiedBlocks`
  - Re-add txns to mempool
- **Accepted**
  - Commit the block to database to permanently store it
  - Delete the block from `vm.verifiedBlocks`
  - Add the block to `vm.blocks` cache

When the consensus engine receives the built block, it calls the block's [`Verify()` method](https://github.com/ava-labs/blobvm/blob/master/chain/block.go#L227). This method serves the following functions\* -

- At least 1 transaction and block timestamp should be within 10s in the future (futureBound).

```go
if len(b.Txs) == 0 {
  return nil, nil, ErrNoTxs
}
if b.Timestamp().Unix() >= time.Now().Add(futureBound).Unix() {
  return nil, nil, ErrTimestampTooLate
}
```

- Transaction's total gas units should not exceed the block gas limit.

```go
blockSize := uint64(0)
for _, tx := range b.Txs {
  blockSize += tx.LoadUnits(g)
  if blockSize > g.MaxBlockSize {
    return nil, nil, ErrBlockTooBig
  }
}
```

- Verify the parent block is available and has a timestamp earlier than the block timestamp.

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

- Check cost and price for the current block with respect to the lookback window from the parent block timestamp. This information is provided in the [execution context](https://github.com/ava-labs/blobvm/blob/master/vm/chain_vm.go#L64) of the block.

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

- Create a new DB instance on top of the parent's DB instance, and link it with block's `onAccept`.

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

The verification is not complete until it saves the verified state on the local memory:

- Put the block on the database against the block's ID as its key.
- Put the block ID as the last accepted block on the database.
- Put the block to the VM's verified block's map.

Note that the block is not saved to the database until it's accepted i.e. the `Accept()` method is called.

```go
// Set last accepted block and store
if err := SetLastAccepted(b.onAcceptDB, b); err != nil {
  return err
}

parent.addChild(b)
b.vm.Verified(b)
```

The [`SetLastAccepted()` function](https://github.com/ava-labs/blobvm/blob/master/chain/storage.go#L193) shown above will set the last accepted block ID and also store the block to database memory, but will not commit until it is accepted.

Once a block is verified, it will be sent to the network to achieve consensus. The verified blocks have 2 verdicts - **Accepted** or **Rejected**. A block's [`Accept()`](https://github.com/ava-labs/blobvm/blob/master/chain/block.go#L246) or [`Reject()`](https://github.com/ava-labs/blobvm/blob/master/chain/block.go#L261) method will be called depending upon the consensus result.

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

### Builder

[Builder](https://github.com/ava-labs/blobvm/blob/master/chain/builder.go) implements block building and returns the built block to the caller. It tries to build a new block from the preferred block as parent and with transactions from mempool. It has a `BuildBlock()` function that is called when the consensus engine calls `vm.BuildBlock()`.

It performs the following task:

- Get the parent's stateless block using the preferred ID

```go
parent, err := vm.GetStatelessBlock(preferred)
```

- Get execution context that has recent block IDs, recent transaction IDs, next prices, etc.

```go
context, err := vm.ExecutionContext(nextTime, parent)
```

- Gets a new block, based on the above information

```go
b := NewBlock(vm, parent, nextTime, context)
```

- Prune the mempool that belongs to recent blocks

```go
mempool.Prune(context.RecentBlockIDs)
```

- Loads the transaction from the mempool to an aspiring block. It iterates through all the mempool transactions but ignores transactions whose gas units are [exceeding the remaining block limit](https://github.com/ava-labs/blobvm/blob/master/chain/builder.go#L65), or whose price is [less that this block's price](https://github.com/ava-labs/blobvm/blob/master/chain/builder.go#L59).

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

[Storage](https://github.com/ava-labs/blobvm/blob/master/chain/storage.go) handles all the database operations like storing transactions, blocks, account balance, etc. Everything is stored as a key-value pair for all types (block, transaction, balance, etc.) of data.

We prefix different types of keys with a unique byte. For eg. the block identifier is prefixed with `0x0` and the transaction ID with `0x1`. Similarly, we have [prefix](https://github.com/ava-labs/blobvm/blob/master/chain/storage.go#L29) for other types as well. The prefix and original ID are separated by a `ByteDelimiter`. Prefixing is necessary for identifying the type of raw byte a particular key is pointing to.

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

- **Block** - For storing block data.
- **Transaction** - For storing transaction ID.
- **Transaction Value** - For storing transaction data i.e. the blob.
- **Key** - For storing metadata of a blob like blob size, associated txID and timestamp.
- **Balance** - For storing account balance.

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
- [SetLastAccepted()](https://github.com/ava-labs/blobvm/blob/master/chain/storage.go#L193) - Add a new block. This will be called when a block is verified.
- [linkValues()](https://github.com/ava-labs/blobvm/blob/master/chain/storage.go#L142) - Put block's transaction values in the database. This will be called when adding new block with `SetLastAccepted()` function call.

Let's have a closer look at these functions:

- **SetBalance** - This function will set the balance of an address that will be passed as an argument. This is called [internally](https://github.com/ava-labs/blobvm/blob/master/chain/storage.go#L336) by the `ModifyBalance()` function and while [allocating](https://github.com/ava-labs/blobvm/blob/master/chain/genesis.go#L115) the coins to airdrop addresses while creating the genesis block.

```go
func SetBalance(db database.KeyValueWriter, address common.Address, bal uint64) error {
	k := PrefixBalanceKey(address)
	b := make([]byte, 8)
	binary.BigEndian.PutUint64(b, bal)
	return db.Put(k, b)
}
```

- **ModifyBalance** - This function will modify the balance of an address depending upon the `add` and `change` parameters. It will simply perform the `SafeAdd` and `SafeSub` operations on the existing balance. The `add` bool parameter indicates whether to add or subtract the `change` amount from the existing balance. Finally, it will call the `SetBalance` function with the updated amount.

It's called while executing the transactions. For transfer transactions, it will [reduce](https://github.com/ava-labs/blobvm/blob/master/chain/transfer_tx.go#L39) the sender's balance and [increase](https://github.com/ava-labs/blobvm/blob/master/chain/transfer_tx.go#L42) the receiver's balance. And for every transaction, it will be called to [reduce](https://github.com/ava-labs/blobvm/blob/master/chain/tx.go#L104) the fee from the sender.

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

- **SetTransaction** - This function will simply put a key representing transaction ID to indicate the existence of a particular transaction.

```go
func SetTransaction(db database.KeyValueWriter, tx *Transaction) error {
	k := PrefixTxKey(tx.ID())
	return db.Put(k, nil)
}
```

- **PutKey** - This function will store the metadata of a blob. Metadata includes blob size, transaction ID, and timestamp. It will be [called](https://github.com/ava-labs/blobvm/blob/master/chain/set_tx.go#L41) while executing the transaction (`SetTx`).

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

- **SetLastAccepted** - This function will set the last accepted block ID and also store the block (passed in the argument) in the database. It will call the `linkValues` function to store the block transactions on the database. It will be [called at the end of the block verification process](https://github.com/ava-labs/blobvm/blob/master/chain/block.go#L236).

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

- **linkValues** - This function is called to store the block transaction values that are associated with a blob (i.e. `SetTx`) on the database. It will loop over the transactions and will [store](https://github.com/ava-labs/blobvm/blob/master/chain/storage.go#L160) the blob value. Since the values are now stored separately, it will [replace](https://github.com/ava-labs/blobvm/blob/master/chain/storage.go#L163) the blob values in the block transactions with their transaction ID. The replaced value can again be restored by calling the [`restoreValues()` function](https://github.com/ava-labs/blobvm/blob/master/chain/storage.go#L173) with that block.

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

The [other functions](https://github.com/ava-labs/blobvm/blob/master/chain/storage.go) are for reading the data that we have stored using the above functions. You can learn about these functions through the comments.

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

In the above function, a new RPC server is created with the `PublicService`. It implements all the RPCs supported by the Virtual Machine. It has access to a VM instance in its structure, that is passed while creating it (see the above function).

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

- Unmarshal transaction bytes into VM-defined transaction object.
- Initialize the transaction object with txID, digest hash, etc.
- Submit the transaction object to VM.

Similarly, all other services are implemented.

### Virtual Machine

We have learned about all the components used in the BlobVM. Most of these components are referenced in the `vm.go` file, which acts as the entry point for the consensus engine as well as users interacting with the blockchain. For example, the engine calls `vm.BuildBlock()`, that in turn calls `chain.BuildBlock()`. Another example is when a user issues a raw transaction through service APIs, the `vm.Submit()` method is called.

Let's look at some of the important methods of `vm.go` that must be implemented:

#### [Initialize](https://github.com/ava-labs/blobvm/blob/master/vm/vm.go#L92)

This method is called whenever we want to build a chain from the registered VM. This initialized the database manager, mempool, genesis block, caches, and finally start the block building notifier and transaction gossiper.

Let's look at the parameters this method takes:

- **ctx** - Metadata about the VM that includes information as mentioned [here](https://github.com/ava-labs/avalanchego/blob/master/snow/context.go#L37).
- **dbManager** - The manager of the database this VM will persist data to.
- **genesisBytes** - The byte-encoding of the genesis information of this VM.
- **upgradeBytes** - To facilitate network upgrades.
- **configBytes** - VM specific [configurations](https://github.com/ava-labs/blobvm/blob/master/vm/config.go#L10) like BuildInterval, GossipInterval, etc.
- **toEngine** - The channel used to send messages to the consensus engine.
- **fxs** - Feature extensions that attach to this VM.
- **appSender** - For sending data to `avalanchego` for things like gossiping.

It performs the following task:

- [Load configurations](https://github.com/ava-labs/blobvm/blob/master/vm/vm.go#L104) - If there are no config bytes, then it will simply load the [default configurations](https://github.com/ava-labs/blobvm/blob/master/vm/config.go#L19). But if the bytes are passed, then it will unmarshal it to `vm.config`.

```go
vm.config.SetDefaults()
if len(configBytes) > 0 {
    if err := ejson.Unmarshal(configBytes, &vm.config); err != nil {
        return fmt.Errorf("failed to unmarshal config %s: %w", string(configBytes), err)
    }
}
```

- Setting up of context, channels, block builder, gossiper, caches, etc. as shown [below](https://github.com/ava-labs/blobvm/blob/master/vm/vm.go#L112).

```go
vm.ctx = ctx
vm.db = dbManager.Current().Database
vm.activityCache = make([]*chain.Activity, vm.config.ActivityCacheSize)

// Init channels before initializing other structs
vm.stop = make(chan struct{})
vm.builderStop = make(chan struct{})
vm.doneBuild = make(chan struct{})
vm.doneGossip = make(chan struct{})
vm.appSender = appSender
vm.network = vm.NewPushNetwork()

vm.blocks = &cache.LRU{Size: blocksLRUSize}
vm.verifiedBlocks = make(map[ids.ID]*chain.StatelessBlock)

vm.toEngine = toEngine
vm.builder = vm.NewTimeBuilder()
```

- [Unmarshal](https://github.com/ava-labs/blobvm/blob/master/vm/vm.go#L138) and [verify](https://github.com/ava-labs/blobvm/blob/master/chain/genesis.go#L86) genesis data.

```go
vm.genesis = new(chain.Genesis)
if err := ejson.Unmarshal(genesisBytes, vm.genesis); err != nil {
    log.Error("could not unmarshal genesis bytes")
    return err
}
if err := vm.genesis.Verify(); err != nil {
    log.Error("genesis is invalid")
    return err
}
```

- Sets the [mempool](https://github.com/ava-labs/blobvm/blob/master/vm/vm.go#L151)

```go
vm.mempool = mempool.New(vm.genesis, vm.config.MempoolSize)
```

- Checks the [existence](https://github.com/ava-labs/blobvm/blob/master/vm/vm.go#L131) of any last accepted block in the database.

```go
has, err := chain.HasLastAccepted(vm.db)
if err != nil {
    log.Error("could not determine if have last accepted")
    return err
}
```

- If the last accepted block is [found](https://github.com/ava-labs/blobvm/blob/master/vm/vm.go#L154) it will update the parameters like `vm.preferred` and `vm.lastAccepted` with the last accepted block and start bootstrapping from that block.

```go
blkID, err := chain.GetLastAccepted(vm.db)
if err != nil {
    log.Error("could not get last accepted", "err", err)
    return err
}

blk, err := vm.GetStatelessBlock(blkID)
if err != nil {
    log.Error("could not load last accepted", "err", err)
    return err
}

vm.preferred, vm.lastAccepted = blkID, blk
log.Info("initialized blobvm from last accepted", "block", blkID)
```

- If there is no last accepted block in the database it will [load](https://github.com/ava-labs/blobvm/blob/master/chain/genesis.go#L96) the genesis state and set genesis block as `vm.preferred` and `vm.lastAccepted`.

```go
genesisBlk, err := chain.ParseStatefulBlock(
    vm.genesis.StatefulBlock(),
    nil,
    choices.Accepted,
    vm,
)
if err != nil {
    log.Error("unable to init genesis block", "err", err)
    return err
}

// Set Balances
if err := vm.genesis.Load(vm.db, vm.AirdropData); err != nil {
    log.Error("could not set genesis allocation", "err", err)
    return err
}

if err := chain.SetLastAccepted(vm.db, genesisBlk); err != nil {
    log.Error("could not set genesis as last accepted", "err", err)
    return err
}
gBlkID := genesisBlk.ID()
vm.preferred, vm.lastAccepted = gBlkID, genesisBlk
log.Info("initialized blobvm from genesis", "block", gBlkID)
```

- Finally, it will start the builder and gossiper as explained in the [block builder](#block-builder) section.

```go
go vm.builder.Build()
go vm.builder.Gossip()
```

#### [GetBlock](https://github.com/ava-labs/blobvm/blob/master/vm/vm.go#L318)

It will return the stateless block corresponding to the ID parameter passed.

```go
func (vm *VM) GetBlock(id ids.ID) (snowman.Block, error) {
	b, err := vm.GetStatelessBlock(id)
	if err != nil {
		log.Warn("failed to get block", "err", err)
	}
	return b, err
}
```

The [`vm.GetStatelessBlock()`](https://github.com/ava-labs/blobvm/blob/master/vm/vm.go#L326) method will perform the following task:

- Returns the stateless block, if present in the cache (only accepted blocks are there).
- Returns the stateless block from the [verfied blocks](https://github.com/ava-labs/blobvm/blob/master/vm/vm.go#L65) mapping, if not present in the cache.
- Return the stateless block (parsed from the stateful block) from the database, if not found above.

```go
func (vm *VM) GetStatelessBlock(blkID ids.ID) (*chain.StatelessBlock, error) {
	// has the block been cached from previous "Accepted" call
	bi, exist := vm.blocks.Get(blkID)
	if exist {
		blk, ok := bi.(*chain.StatelessBlock)
		if !ok {
			return nil, fmt.Errorf("unexpected entry %T found in LRU cache, expected *chain.StatelessBlock", bi)
		}
		return blk, nil
	}

	// has the block been verified, not yet accepted
	if blk, exists := vm.verifiedBlocks[blkID]; exists {
		return blk, nil
	}

	// not found in memory, fetch from disk if accepted
	stBlk, err := chain.GetBlock(vm.db, blkID)
	if err != nil {
		return nil, err
	}
	// If block on disk, it must've been accepted
	return chain.ParseStatefulBlock(stBlk, nil, choices.Accepted, vm)
}
```

The [`chain.ParseStatefulBlock()`](https://github.com/ava-labs/blobvm/blob/master/chain/block.go#L78) function will parse the stateful block into the stateless block and return it to the caller.

#### [ParseBlock](https://github.com/ava-labs/blobvm/blob/master/vm/vm.go#L353)

It will parse the bytes into the stateless block and return it to the caller. This basically calls `chain.ParseBlock()` for fetching stateless block. It also checks if it already has this block in the cache, verified blocks list, or in the database. If it is found there, it will return that stateless block.

```go
func (vm *VM) ParseBlock(source []byte) (snowman.Block, error) {
	newBlk, err := chain.ParseBlock(
		source,
		choices.Processing,
		vm,
	)
	if err != nil {
		log.Error("could not parse block", "err", err)
		return nil, err
	}
	log.Debug("parsed block", "id", newBlk.ID())

	// If we have seen this block before, return it with the most
	// up-to-date info
	if oldBlk, err := vm.GetBlock(newBlk.ID()); err == nil {
		log.Debug("returning previously parsed block", "id", oldBlk.ID())
		return oldBlk, nil
	}

	return newBlk, nil
}
```

The [`chain.ParseBlock()`](https://github.com/ava-labs/blobvm/blob/master/chain/block.go#L66) function will unmarshal the byte representation of a block into a stateful block, and finally return the stateless block from it using `ParseStatfulBlock()`.

```go
func ParseBlock(
	source []byte,
	status choices.Status,
	vm VM,
) (*StatelessBlock, error) {
	blk := new(StatefulBlock)
	if _, err := Unmarshal(source, blk); err != nil {
		return nil, err
	}
	return ParseStatefulBlock(blk, source, status, vm)
}
```

#### [BuildBlock](https://github.com/ava-labs/blobvm/blob/master/vm/vm.go#L377)

The consensus engine calls the `vm.BuildBlock()` method whenever it is the node's turn to propose a block (there must be a pending transaction in the mempool) and returns the stateless block. This makes use of the `chain.BuildBlock()` method to get the block. This is explained in the [Builder](#builder) section.

This method will also handle the next block generation using VM's `HandlerGenerateBlock()` method, as explained in the [Block Builder](#block-builder) section.

```go
func (vm *VM) BuildBlock() (snowman.Block, error) {
	log.Debug("BuildBlock triggered")
	blk, err := chain.BuildBlock(vm, vm.preferred)
	vm.builder.HandleGenerateBlock()
	if err != nil {
		log.Debug("BuildBlock failed", "error", err)
		return nil, err
	}
	sblk, ok := blk.(*chain.StatelessBlock)
	if !ok {
		return nil, fmt.Errorf("unexpected snowman.Block %T, expected *StatelessBlock", blk)
	}

	log.Debug("BuildBlock success", "blkID", blk.ID(), "txs", len(sblk.Txs))
	return blk, nil
}
```

#### [SetPreference](https://github.com/ava-labs/blobvm/blob/master/vm/vm.go#L437)

This method sets the block ID preferred by this node.

```go
func (vm *VM) SetPreference(id ids.ID) error {
	log.Debug("set preference", "id", id)
	vm.preferred = id
	return nil
}
```

#### [LastAccepted](https://github.com/ava-labs/blobvm/blob/master/vm/vm.go#L445)

This method returns the block ID last accepted by the node.

```go
func (vm *VM) LastAccepted() (ids.ID, error) {
	return vm.lastAccepted.ID(), nil
}
```

## Conclusion

This documentation covers the implementation and explanations of a Virtual Machine by taking reference from the BlobVM. Different VMs can have different implementations depending upon their use case. A common thing among them could be the interface for a linear or DAG VM.

You can learn about using BlobVM in more detail through the [README](https://github.com/ava-labs/blobvm/blob/master/README.md) provided in its repository.
