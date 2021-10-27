# 仮想マシン（VM）を作成する

## はじめに

Avalancheのコア機能の一つは、[仮想マシン（VM）](../../../learn/platform-overview/#virtual-machines)で定義されている新しいカスタムブロックチェーンを作成する機能です。

このチュートリアルでは、非常にシンプルなVMを作成します。VMで定義するブロックチェーンは、[タイムスタンプサーバー](https://github.com/ava-labs/timestampvm)です。ブロックチェーンの各ブロックには、32バイトのデータ（ペイロード）と一緒に作成時のタイムスタンプが含まれています。各ブロックのタイムスタンプは、親のタイムスタンプ後にあります。

このようなサーバーは、ブロックが作成時に存在していたデータ部分を証明するのに使用できるため便利です。例えば、本の原稿があるとします。そして、今日存在している原稿を将来的に証明できるようにしたいとします。ブロックのペイロードが原稿のハッシュであるブロックチェーンに、ブロックを追加することができます。将来的には、ペイロードに原稿のハッシュがあることをブロックが示すことで、原稿が今日存在していたことを証明できます（これは、ハッシュのプリイメージを見つけるのが不可能であるという事実に起因します）。

ブロックチェーンは、AvalancheGoとは別のプロセスとして実行することができます。そしてgRPCを介してAvalancheGoと通信することができます。これは`rpcchainvm`という[`go-plugin`](https://pkg.go.dev/github.com/hashicorp/go-plugin)を使用する特別なVMで有効になり、別のVM実装をラップすることができます。例えば、 C-Chainは、この方法で[Coreth](https://github.com/ava-labs/coreth)VMを実行します。

VMの実装の前に、AvalancheGoのコンセンサスエンジンと互換性を持たせるためにVMが実装しなければならないインターフェースを確認します。スニペットですべてのコードを表示し、説明してゆきます。1つの場所ですべてのコードを確認する場合は、[このリポジトリ](https://github.com/ava-labs/timestampvm/)を参照してください。

## インターフェース

### `block.ChainVM`

リニアブロックチェーン（DAGブロックチェーンとは対照的）にコンセンサスに達するため、Avalancheでは、Snowmanコンセンサスエンジンを使用します。Snowmanと互換性を持たせるために、VMは、[その宣言](https://github.com/ava-labs/avalanchego/blob/master/snow/engine/snowman/block/vm.go)から次を含む`block.ChainVM`インターフェースを実装する必要があります。

インターフェースは大きいですが、心配無用です。各メソッドを説明し、実装例を確認していきます。そして、すべての詳細をすぐに理解することが重要なのではありません。

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

`common.VM`は、全ての`VM`で、つまり、DAGであろうとリニアチェーンであろうと、必ず実装する必要のあるタイプです。

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

`block.ChainVM`インターフェースで参照されている`snowman.Block`タイプに気付いたかもしれません。それは、リニア（Snowman）チェーンでブロックに実装する必要のあるメソッドを説明するものです。

[こちら](https://github.com/ava-labs/avalanchego/blob/master/snow/consensus/snowman/block.go)から、コピーするこのインターフェースとそのメソッドを確認しましょう。

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

このインターフェースは、トランザクション、ブロック、頂点など、すべての決定可能なオブジェクトのスーパーセットです。

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

## ヘルパーライブラリ

ボイラープレートコードを処理するために、VM実装で埋め込むことができるいくつかのタイプ（埋め込みとは、Goの継承版のようなもの）を作成しました。

この例では、次のライブラリタイプの両方を使用します。これらの使用を推奨します。

### core.SnowmanVM

このヘルパータイプは、多くの`block.ChainVM`メソッドを実装する構造です。その実装は[こちら](https://github.com/ava-labs/avalanchego/blob/master/vms/components/core/snowman_vm.go)にあります。

#### メソッド

`core.SnowmanVM`で実装するいくつかの`block.ChainVM`メソッドは、次のようになります。

* `ParseBlock`
* `GetBlock`
* `SetPreference`
* `LastAccepted`
* `Shutdown`
* `Bootstrapping`
* `Bootstrapped`
* `Initialize`

VM実装が`core.SnowmanVM`を埋め込む場合、すでに`core.SnowmanVM`で実装されているため、これらのメソッドを実装する必要はありません。これらの継承メソッドを希望する場合、オーバーライドすることができます。

#### フィールド

このタイプには、VM実装に含める複数のフィールドが含まれています。その中で：

* `DB`：ブロックチェーンのデータベース
* `Ctx`：ブロックチェーンのランタイムコンテキスト
* `preferred`：新しいブロックが構築される希望ブロックのID
* `LastAcceptedID`：最も最近受け入れたブロックのID
* `ToEngine`：このブロックチェーンにパワーを与えるコンセンサスエンジンにメッセージを送信するチャネル
* `State`：ブロックなどのデータを永続保持するために使用される

### core.Block

このヘルパータイプは、`snowman.Block`インターフェースの多くのメソッドを実装します。

#### メソッド

実装された`snowman.Block`インターフェースメソッドは、次のようになります。

* `ID`
* `Parent`
* `Accept`
* `Reject`
* `Status`
* `Height`

VM実装のブロックは、`Accept`と`Reject`をオーバーライドするため、これらのメソッドはアプリケーション固有の状態を引き起こするようになります。

#### フィールド

`core.Block`にはフィールド`VM`があり、これは`core.SnowmanVM`への参照です。つまり、その`core.Block`は全てのフィールドとそのタイプの全メソッドにアクセスできることを意味します。

### rpcchainvm

`rpcchainvm`は`block.ChainVM`をラップする特別なVMで、これによりラップされたブロックチェーンAvalancheGoから独自のプロセスで実行できるようになります。`rpcchainvm`には2つの大切な部分、サーバーとクライアントがあります。[`server`](https://github.com/ava-labs/avalanchego/blob/master/vms/rpcchainvm/vm_server.go)は、基本の`block.ChainVM`を自身のプロセスで実行し、基本のVMのメソッドをgRPCを介して呼び出すことができます。[クライアント](https://github.com/ava-labs/avalanchego/blob/master/vms/rpcchainvm/vm_client.go)は、AvalancheGoの一部として実行し、ブロックチェーンの状態を更新したりクエリを行うために、対応するサーバーにgRPC呼び出しを実行します。

さらに具体的に説明します：例えば、AvalancheGoがこの方法で、チェーン実行からブロックを取得したいとします。AvalancheGoは、クライアントの`GetBlock`メソッドを呼び出します。これは、別のプロセスで実行中のサーバーにgRPC呼び出しを行います。サーバーは基本のVMの`GetBlock`メソッドを呼び出してクライアントにレスポンスを提供し、次にAvalancheGoにレスポンスを与えます。

別の例として、サーバーの`BuildBlock`メソッドを確認しましょう。

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

`vm.vm`が基本のVM実装である`vm.vm.BuildBlock()`を呼び出し、新しいブロックを返します。

## タイムスタンプサーバーの実装

これまで、VMが実装しなければならないインターフェースと、VMを構築するライブラリについて学びましたね。

では、`snowman.Block`を実装するブロックを持つ`block.ChainVM`を実装するVMを書きましょう。

### ブロック

まず、ブロックの実装を確認しましょう。

タイプ宣言は、次のようになります。

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

`serialize:"true"`タグは、ブロックを永続化する場合や他のノードに送信する場合に使用するブロックのバイト表現にフィールドが含まれることを示します。

#### 検証

このメソッドは、ブロックが有効であることを確認し、データベースに保存します。

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

これがブロックの実装のためのすべてのコードです。`snowman.Block`のその他全てのメソッドは`Block`を実装する必要があり、`*core.Block`から継承されます。

### 仮想マシン

では、`block.ChainVM`インターフェースを実装するタイムスタンプVMの実装を確認しましょう。

宣言は、次のようになります。

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

#### 初期化

このメソッドは、VMの新しいインスタンスを初期化するときに呼び出します。ジェネシスブロックは、このメソッドで作成されます。

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

#### prosyseBlock

このメソッドは、データの一部をメモリプールに追加し、新しいブロックが構築され、投票の準備ができたブロックチェーンのコンセンサスレイヤーについての通知をします。これは、後で参照するAPIメソッド`ProposeBlock`で呼び出します。

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

バイト表現からブロックをパースします。

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

`Service`で定義された登録ハンドラーです。APIの詳細は、[下記](create-a-virtual-machine-vm.md#api)を参照してください。

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

`StaticService`で定義された静的ハンドラーを登録します。静的APIの詳細は[下記](create-a-virtual-machine-vm.md#static-api)を参照してください。

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

### 静的API

VMは静的APIを持つことができ、これによりクライアントが特定のブロックチェーンの状態をクエリしたり更新したりしないメソッドを呼び出すことができますが、全体としてVMに適用することができます。これは、コンピュータプログラミングの静的メソッドに類似しています。AvalancheGo[は、GorillaのRPCライブラリ](https://www.gorillatoolkit.org/pkg/rpc)を使用してHTTP APIを実装します。

`StaticService`はVMの静的APIを実装します。

```go
// StaticService defines the static API for the timestamp vm
type StaticService struct{}
```

#### エンコード

各APIメソッドには、次があります。

* メソッドの引数を定義する構造
* メソッドのリターン値を定義する構造
* APIメソッドを実装し、上記の2つの構造でパラメータ化されるメソッド

このAPIメソッドは、指定されたエンコードスキームを使用してバイト表現に文字列をエンコードします。次にブロックに置かれ、このチェーンの次のブロックとして提案されたデータをエンコードするために使用できます。

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

#### デコード

このAPIメソッドは、`Encode`とは逆のものです。

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

VMは静的ではないHTTP APIを持っていることもあり、クライアントはブロックチェーンの状態をクエリし、更新することができます。

`Service`の宣言は、次のようになります。

```go
// Service is the API service for this VM
type Service struct{ vm *VM }
```

この構造は、VMに参照があることに注意してください。このため、状態をクエリし、更新することができます。

このVMのAPIには、2つのメソッドがあります。1つは、クライアントがそのIDでブロックを取得することができます。もう1つのメソッドは、クライアントがこのブロックチェーンの次のブロックを提案することができます。

#### timestampvm.getBlock

そのIDでブロックを取得します。IDがない場合は、最新のブロックを取得します。

**署名**

```cpp
timestampvm.getBlock({id: string}) ->
    {
        id: string,
        data: string,
        timestamp: int,
        parentID: string
    }
```

* `id`は、取得するブロックのIDです。引数から省略した場合は、最新のブロックを取得します。
* `data`は、ブロックの32バイトペイロードの基本58（チェックサムでの）表現です。
* `timestamp`は、このブロックが作成されたときのUNIXタイムスタンプ
* `parentID`は、ブロックの親

**呼び出し例**

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

**レスポンス例**

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

**実装**

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

#### timestampvm.prosymprosyeBlock

このブロックチェーンで次のブロックを提案します。

**署名**

```cpp
timestampvm.proposeBlock({data: string}) -> {success: bool}
```

* `data`は、提案ブロックの32バイトペイロードの基本58（チェックサムで）表現

**呼び出し例**

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

**レスポンス例**

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "Success": true
  },
  "id": 1
}
```

**実装**

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

### プラグイン

このVMと`go-plugin`に互換性を持たせるために、gRPCにVMを提供する`main`パッケージとメソッドを定義する必要があり、そうすることで、AvalancheGoがそのメソッドを呼び出すことができます。

`main.go`の内容は、次のようになります。

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

これで、AvalancheGoの`rpcchainvm`がこのプラグインに接続し、そのメソッドを呼び出せるようになります。

#### VMエイリアス

VMとそのAPIエンドポイントにエイリアスを作成可能です。例えば、次と一緒に`~/.avalanchego/configs/vms/aliases.json`でJSONファイルを作成し、`TimestampVM`にエイリアスを作成できます。

```javascript
{
  "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH": [
    "timestampvm",
    "timestamp"
  ]
}
```

これで、このVMの静的APIがエンドポイント`/ext/vm/timestampvm`と`/ext/vm/timestamp`でアクセスできるようになりました。VMへのエイリアスの提供は、次のようにその他の意味合いがあります。詳細は[こちら](../../references/command-line-interface.md#vm-configs)をご覧ください。

#### 実行ファイルの構築

このVMには、このVMの実行ファイルを構築する[ビルドスクリプト](https://github.com/ava-labs/timestampvm-rpc/blob/main/scripts/build.sh)があります（呼び出したときは、上記から`main`メソッドを実行します。）

実行ファイルのパスとその名前は、引数を介してビルドスクリプトに提供することができます。例：

```text
./scripts/build.sh ../avalanchego/build/avalanchego-latest/plugins timestampvm
```

環境変数が設定されていない場合、`$GOPATH/src/github.com/ava-labs/avalanchego/build/avalanchego-latestplugins/tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH`へのデフォルトのパス（`tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH`はこのVMのIDです。）

AvalancheGoが検索し、`[buildDir]/avalanchego-latest/plugins`の下でプラグインを登録します。詳細は[こちら](../../references/command-line-interface.md#build-directory)をご覧ください。

実行ファイルの名前は、完全なVM ID(CB58でエンコードされている）か、[VMエイリアス構成](../../references/command-line-interface.md#vm-configs)により定義されたVMエイリアスでなければなりません。

このチュートリアルでは、実行ファイルの名前としてVMのIDを使用し、プロセスを簡素化しました。ただし、これらはこのVMのエイリアスであるため、AvalancheGoはまた`timestamp`か`timestampvm`を受け入れます。

### まとめ

完了です。これが、ブロックチェーンベースのタイムスタンプサーバーを定義するVMの実装です。

このチュートリアルで学んだ内容は、次の通りです。

* リニアチェーンを定義するすべてのVMを実装する`block.ChainVM`インターフェース
* リニアチェーンの一部であるすべてのブロックを実装しなければならない`snowman.Block`インターフェース
* VMを速く定義する`core.SnowmanVM`と`core.Block`のライブラリタイプ
* ブロックチェーンが自身のプロセスで実行できる`rpcchainvm`タイプ

これで、このカスタム仮想マシンで新しいブロックチェーンを作成できるようになりました。

{% page-ref page="create-custom-blockchain.md" %}

