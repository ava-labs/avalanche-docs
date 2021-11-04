# 创建虚拟机 (VM)

## 简介

Avalanche 的核心特征之一是能够创建新的自定义区块链，这由[虚拟机 (VM)](../../../learn/platform-overview/#virtual-machines)来定义

在本教程中，我们将创建一个非常简单的虚拟机。虚拟机定义的区块链是一个[ 时间戳服务器](https://github.com/ava-labs/timestampvm)。区块链中的每个区块在创建时都包含时间戳，连同 32 字节的数据 (有效载荷)。 每个区块的时间戳是在父级时间戳之后。

此类服务器很有用，因为可以用于证明在创建区块时已存在一段数据。假设您拥有一份书籍手稿，并且希望将来能够证明手稿今天已存在。您可以将一个区块添加到区块链，该区块的有效载荷就是手稿的哈希。将来，您可以通过展示该区块的有效载荷中有手稿的哈希，证明手稿今天已存在（这是因为不可能找到哈希的原像）。

区块链可以作为独立于 AvalancheGo 的进程运行，并可通过 gRPC 与 AvalancheGo 进行通信。这可以通过 `rpcchainvm`（一种特定虚拟机，使用 [`go-plugin`](https://pkg.go.dev/github.com/hashicorp/go-plugin) 并打包另一个虚拟机实施）来实现。例如，C-Chain 以此方式运行 [Coreth](https://github.com/ava-labs/coreth) 虚拟机。

在着手实施虚拟机之前，我们将查看虚拟机为了兼容 AvalancheGo 的共识引擎而必须实施的接口。我们将在代码片段中显示和解释所有代码。如果您希望在一个地方看到所有代码，请参阅[此储存库。](https://github.com/ava-labs/timestampvm/)

_注意：每个运行/网络的区块链、子网、交易和地址的 ID 都可能不同。这意味着当您尝试时，教程中的一些输入、端点等可能不同。_

## 接口

### `block.ChainVM`

为了就线性区块链（而非 DAG 区块链）达成共识，Avalanche使用 Snowman 共识引擎。为了兼容 Snowman，虚拟机必须实施 `block.ChainVM` 接口，我们在下面从[其声明](https://github.com/ava-labs/avalanchego/blob/master/snow/engine/snowman/block/vm.go)中包含该接口。

接口非常大，但不要担心，我们将解释每种方法并查看实施示例，而立即了解每一个细节并不重要。

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

`common.VM` 是每一个 `VM` 必须实施的类型，不论是 DAG 还是线性链。

```go
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

您可能已注意到 `block.ChainVM` 界面中引用了 `snowman.Block` 类型。它描述了一个区块要成为线性（Snowman）链中的区块而必须实施的方法。

我们查看该接口及其方法，我们从[此处](https://github.com/ava-labs/avalanchego/blob/master/snow/consensus/snowman/block.go)复制得来。

```go
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

该接口是每一个可判定对象的超级集合，例如交易、区块和顶点。

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

## 辅助库

我们已创建虚拟机实施可以嵌入（嵌入类似于 Go 的版本继承）的某些类型，以便处理样板代码。

在示例中，我们使用下面的两个库类型，我们鼓励您也使用。

### core.SnowmanVM

该辅助类型是实施许多 `block.ChainVM` 方法的结构。可在[此处](https://github.com/ava-labs/avalanchego/blob/master/vms/components/core/snowman_vm.go)找到其实施。

#### 方法

`core.SnowmanVM` 实施的某些 `block.ChainVM` 方法是：

* `ParseBlock`
* `GetBlock`
* `SetPreference`
* `LastAccepted`
* `Shutdown`
* `Bootstrapping`
* `Bootstrapped`
* `Initialize`

如果您的虚拟机实施嵌入 `core.SnowmanVM`，则不需要实施任何这些方法，因为 `core.SnowmanVM` 已经实施了。您可以按自己的意愿超越这些继承的方法。

#### 字段

该类型含有您希望在虚拟机实施中包含的几个字段。其中包括：

* `DB`：区块链的数据库
* `Ctx`：区块链的运行时上下文
* `preferred`：将构建新区块所在的首选区块的 ID
* `LastAcceptedID`：最近已接受区块的 ID
* `ToEngine`：用于将消息发送到驱动该区块链的共识引擎的渠道
* `State`：用于持续存储数据，例如区块

### core.Block

该辅助类型实施 `snowman.Block` 接口的多种方法。

#### 方法

某些实施的 `snowman.Block` 接口方法是：

* `ID`
* `Parent`
* `Accept`
* `Reject`
* `Status`
* `Height`

您的虚拟机实施中的区块可能会超越 `Accept` 和 `Reject`，因此这些方法会导致应用特定的状态发生改变。

#### 字段

`core.Block` 有一个字段 `VM`，是指 `core.SnowmanVM`。这意味着 `core.Block` 可以访问该类型的所有字段和方法。

### rpcchainvm

`rpcchainvm` 是打包 `block.ChainVM` 的特殊虚拟机，允许打包的区块链在自己的进程中运行，独立于 AvalancheGo。`rpcchainvm` 具有两个重要部分：服务器和客户端。[`server`](https://github.com/ava-labs/avalanchego/blob/master/vms/rpcchainvm/vm_server.go) 在其自己的进程中运行基本 `block.ChainVM`，并允许通过 gRPC 调用基本虚拟机方法。[客户端](https://github.com/ava-labs/avalanchego/blob/master/vms/rpcchainvm/vm_client.go) 作为 AvalancheGo 的一部分运行，并且将对相应的服务器进行 gRPC 调用，以更新或查询区块链的状态。

具体而言：假设 AvalancheGo 希望从以这种方式运行的链中检索区块。AvalancheGo 调用客户端的 `GetBlock` 方法，该方法向在单独进程中运行的服务器发出 gRPC 调用。服务器调用基础虚拟机的 `GetBlock` 方法并向客户端发送响应，然后客户端向 AvalancheGo 发送响应。

作为另一个示例，我们查看服务器的 `BuildBlock` 方法：

```go
func (vm *VMServer) BuildBlock(_ context.Context, _ *vmproto.BuildBlockRequest) (*vmproto.BuildBlockResponse, error) {
    blk, err := vm.vm.BuildBlock()
    if err != nil {
        return nil, err
    }
    blkID := blk.ID()
    parentID := blk.Parent()
    return &vmproto.BuildBlockResponse{
        Id:       blkID[:],
        ParentID: parentID[:],
        Bytes:    blk.Bytes(),
        Height:   blk.Height(),
    }, nil
}
```

它调用 `vm.vm.BuildBlock()`，其中 `vm.vm` 是基础虚拟机实施，然后返回一个新的区块。

## 时间戳服务器实施

目前我们知道虚拟机必须实施的接口以及可以用于构建虚拟机的库。

让我们编写虚拟机，虚拟机实施 `block.ChainVM`，其区块实施 `snowman.Block`。

### 区块

首先，查看我们的区块实施。

类型声明是：

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

`serialize:"true"` 标签表明，当持续存储区块或将其发送到其他节点时，该字段应包含在区块的字节表示中。

#### 验证

此方法验证区块是否有效并将其保存在数据库中。

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
    parentID := b.Parent()
    parentIntf, err := b.VM.GetBlock(parentID)
    if err != nil {
        return errDatabaseGet
    }
    parent, ok := parentIntf.(*Block)
    if !ok {
        return errBlockType
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

这是我们用于区块实施的全部代码！我们的 `Block` 必须实施的 `snowman.Block` 的所有其他方法都是从 `*core.Block` 继承。

### 虚拟机

现在，查看我们的时间戳虚拟机实施，其实施了 `block.ChainVM` 接口。

声明是：

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

#### 初始化

当虚拟机的新实例初始化时，调用此方法。创世区块是根据本方法创建。

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

此方法将一条数据添加到内存池中，并通知区块链的共识层，即一个新的区块已准备好构建和投票。这是通过 API 方法 `ProposeBlock` 来调用，我们稍后再来讨论。

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

从字节表示中解析区块。

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

注册 `Service` 中定义的处理器。查看[下文](create-a-virtual-machine-vm.md#api)了解关于 API 的更多信息。

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

注册 `StaticService` 中定义的静态处理器。查看[下文](create-a-virtual-machine-vm.md#static-api)了解关于静态 API 的更多信息。

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

### 静态 API

虚拟机可能拥有静态 API，允许客户端调用方法，这些方法不查询或更新特定区块链的状态，但适用于整个虚拟机。这与计算机编程中的静态方法相似。AvalancheGo 使用 [Gorilla 的 RPC 库](https://www.gorillatoolkit.org/pkg/rpc)来实施 HTTP API。

`StaticService` 为我们的虚拟机实施静态 API。

```go
// StaticService defines the static API for the timestamp vm
type StaticService struct{}
```

#### 编码

对于每种 API 方法，都有：

* 一种定义方法参数的结构
* 一种定义方法返回值的结构
* 一种实施 API 的方法，并且在上述两种结构上实现参数化。

此 API 方法使用给定的编码方案，将一个字符串编码成字节表示。它可用于对数据进行编码，然后将数据放入一个区块中并提议作为该链的下一个区块。

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

#### 解码

此 API 方法与 `Encode` 正好相反。

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

虚拟机还可以有非静态 HTTP API，允许客户端查询和更新区块链的状态。

`Service`的声明是：

```go
// Service is the API service for this VM
type Service struct{ vm *VM }
```

请注意，此结构引用虚拟机，因此可以查询和更新状态。

此虚拟机的 API 有两种方法。一种方法允许客户端按 ID 获取区块。另一种方法允许客户端提议此区块链的下一个区块。端点中的区块链 ID 会发生变化，因为每个区块链都有唯一的 ID。有关更多信息，请参阅[与新区块链交互](create-custom-blockchain.md#interact-with-the-new-blockchain)。

#### timestampvm.getBlock

按 ID 获取区块。如果没有提供 ID，则获取最新区块。

**签名**

```cpp
timestampvm.getBlock({id: string}) ->
    {
        id: string,
        data: string,
        timestamp: int,
        parentID: string
    }
```

* `id` 是被检索区块的 ID。如果参数中省略，则获取最新区块
* `data` 是区块 32 字节有效载荷的 base 58（带校验和）表示
* `timestamp` 是创建此区块时的 Unix 时间戳
* `parentID` 是该区块的父级

**示例调用**

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

**示例响应**

```javascript
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

**实施**

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
    reply.APIBlock.ParentID = block.Parent().String()
    reply.Data, err = formatting.Encode(formatting.CB58, block.Data[:])
    return err
}
```

#### timestampvm.proposeBlock

提议此区块链上的下一个区块。

**签名**

```cpp
timestampvm.proposeBlock({data: string}) -> {success: bool}
```

* `data` 是提议区块的 32 字节有效载荷的 base 58（带校验和）表示。

**示例调用**

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

**示例响应**

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "Success": true
  },
  "id": 1
}
```

**实施**

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

### 插件

为了使此虚拟机与 `go-plugin` 兼容，我们需要定义一个 `main` 软件包和方法，以便通过 gRPC 为虚拟机服务，这样 AvalancheGo 可以调用其方法。

`main.go` 的内容是：

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

现在 AvalancheGo 的 `rpcchainvm` 可以连接到此插件并调用其方法。

#### 虚拟机别名

可以给虚拟机及其 API 端点指定别名。例如，我们可以通过以下命令在 `~/.avalanchego/configs/vms/aliases.json` 创建一个 JSON 文件，给 `TimestampVM` 指定别名：

```javascript
{
  "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH": [
    "timestampvm",
    "timestamp"
  ]
}
```

现在可以在端点 `/ext/vm/timestampvm` 和 `/ext/vm/timestamp` 访问此虚拟机的静态 API。给虚拟机指定别名会产生其他影响，如下所示。如需了解更多详情，请查看[此处](../../references/command-line-interface.md#vm-configs)。

#### 创建可执行文件

此虚拟机有一个[构建脚本](https://github.com/ava-labs/timestampvm-rpc/blob/main/scripts/build.sh)，可以构建此虚拟机的可执行文件（在调用时，它会运行上述 `main` 方法）。

可执行文件的路径及其名称可以通过参数提供给构建脚本。例如：

```text
./scripts/build.sh ../avalanchego/build/avalanchego-latest/plugins timestampvm
```

如果环境变量未设置，则路径默认为 `$GOPATH/src/github.com/ava-labs/avalanchego/build/avalanchego-latestplugins/tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH`（`tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH` 是此虚拟机的 ID）。

AvalancheGo 在 `[buildDir]/avalanchego-latest/plugins` 下搜索和注册插件。请参阅[此处](../../references/command-line-interface.md#build-directory) 了解更多信息。

可执行文件的名称必须是完整的虚拟机 ID（CB58 编码），或者必须是[虚拟机别名配置](../../references/command-line-interface.md#vm-configs)定义的虚拟机别名。

本教程中，为了简化流程，我们使用虚拟机 ID 作为可执行文件的名称。但 AvalancheGo 也会接受 `timestampvm` 或 `timestamp`，因为它们是此虚拟机的别名。

### 结语

就这样！以上就是虚拟机（定义了基于区块链的时间戳服务器）的完整实施过程。

在本教程中，我们学习了：

* `block.ChainVM` 接口，定义了线性链的所有虚拟机都必须实施此接口
* `snowman.Block` 接口，作为线性链一部分的所有区块都必须实施此接口
* `core.SnowmanVM` 和 `core.Block` 库类型，可以更快捷定义虚拟机
* `rpcchainvm` 类型，允许区块链在自己的进程中运行。

现在我们可以使用这个自定义虚拟机创建一个新的区块链。

{% page-ref page="create-custom-blockchain.md" %}

