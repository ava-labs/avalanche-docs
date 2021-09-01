# バーチャルマシン（VM）を作成する

## はじめに

Avalancheのコア機能の一つは、[バーチャルマシン（VMs）](../../../learn/platform-overview/#virtual-machines)で定義される新しいカスタムブロックチェーンを作成する機能です。

このチュートリアルでは、非常にシンプルなVMを作成します。VMによって定義されるブロックチェーンは、タイムスタンプサーバーです[。](https://github.com/ava-labs/timestampvm)ブロックチェーン内の各ブロックには、32バイトのデータ（ペイロード）とともに作成された時のタイムスタンプが含まれています。各ブロックのタイムスタンプは、親のタイムスタンプ後になります。

ブロックが作成された際に存在したデータを証明するために使用できるため、サーバは便利です。本の原稿を持ち、将来、原稿が今日存在することを証明できるようになりたいとします。ブロックのペイロードがあなたの写本のハッシュであるブロックチェーンにブロックチェーンに追加することができます。将来的には、ブロックがペイロードにあなたの原稿のハッシュを持っていることを示すことで、今日写しが存在することを証明することができます。（これは、ハッシュのプレイメージを見つけることができないという事実から、ブロックがそのハッシュの前にイメージが存在することを証明することができます。

ブロックチェーンは、AvalancheGoから別々のプロセスとして実行可能で、gRPC上でAvalancheGoと通信できます。これは、別のVM実装を使用[`go-plugin`](https://pkg.go.dev/github.com/hashicorp/go-plugin)し`rpcchainvm`、ラップする特別なVMで有効になります。たとえば、C-Chainは、[Coreth](https://github.com/ava-labs/coreth) VMを実行します。

VMの実装に到達する前に、AvalancheGoのコンセンサスエンジンと互換性がないというインターフェースを見ていきます。スニペットで構成されるすべてのコードを表示し、説明します。1か所ですべてのコードを表示したい場合は、[このリポジトリ](https://github.com/ava-labs/timestampvm/)を参照してください。

## インターフェース

### `block.ChainVM`

（DAGブロックチェーンとは異なり）リニアブロックチェーンにコンセンサスを提供するため、AvalancheはSnowmanコンセンサスエンジンを使用します。Snowmanと互換性がないため、VMは[その宣言](https://github.com/ava-labs/avalanchego/blob/master/snow/engine/snowman/block/vm.go)から以下に含まれる`block.ChainVM`インターフェースを実装する必要があります。

インターフェースは大きくなります。しかし、心配しないで、各メソッドを説明し、実装例を見ることにより、すべての詳細をすぐに理解する必要はありません。

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

`common.VM`DAGあるいはリニアチェーンを`VM`かけて、すべてのものが実装しなければならない型です。

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

インターフェースで参照される`snowman.Block`タイプに気づかれた可能性があります`block.ChainVM`。この方法では、ブロックが線型（Snowman）チェーンでブロックとして実装しなければならない方法について説明します。

ここからコピーするこのインターフェースとそのメソッドを見てみよう[。](https://github.com/ava-labs/avalanchego/blob/master/snow/consensus/snowman/block.go)

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

このインターフェースは、トランザクション、ブロック、バーティスといった、すべての決定可能なオブジェクトのスーパーセットです。

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

ボイラープレートコードを処理するために、VM実装が埋め込む（Goの継承バージョンのものと同じように）できる種類のものを作成しました。

下記のライブラリタイプの両方を使用します。その際、それらも使用することを推奨します。

### core.SnowmanVM

このヘルパタイプは、多くのメソッドを実装する構造体です`block.ChainVM`。その実装は[、ここから](https://github.com/ava-labs/avalanchego/blob/master/vms/components/core/snowman_vm.go)見ることができます。

#### メソッド

以下で実装されたいくつかの`block.ChainVM`メソッドは次のとおりです`core.SnowmanVM`：

* `ParseBlock`
* `GetBlock`
* `SetPreference`
* `LastAccepted`
* `Shutdown`
* `Bootstrapping`
* `Bootstrapped`
* `Initialize`

仮にあなたのVM実装が埋め込まれた場合、すでに実装されているため`core.SnowmanVM`、これらのメソッドのいずれかを実装する必要はありません`core.SnowmanVM`。必要に応じて、これらの継承メソッドをオーバーライドすることができます。

#### フィールド

このタイプには、VM実装に含めることになるいくつかのフィールドが含まれています。その中で：

* `DB`：ブロックチェーンのデータベース
* `Ctx`：ブロックチェーンのランタイムコンテキスト
* `preferred`: 新しいブロックが構築される好みブロックのID。
* `LastAcceptedID`: 最新で受け付けられたブロックのID
* `ToEngine`：このブロックチェーンに力を与えるコンセンサスエンジンにメッセージを送信するために使用されるチャネル
* `State`：ブロックなどのデータを永続させるために使用されます

### core.Block

このヘルパタイプは、インターフェースの多くのメソッドを実装します`snowman.Block`。

#### メソッド

いくつかの実装された`snowman.Block`インターフェースメソッドは、次のとおりです。

* `ID`
* `Parent`
* `Accept`
* `Reject`
* `Status`
* `Height`

あなたのVM実装中のブロックは、おそらくオーバーライドされ`Accept`、これらのメソッドによりアプリケーション固有のステート変更が発生するよう`Reject`になります。

#### フィールド

`core.Block``VM`フィールド`core.SnowmanVM`つまり、そのタイプのすべてのフィールドとメソッドにアクセス`core.Block`できます。

### rpcchainvm

`rpcchainvm``rpcchainvm`これは、AvalancheGoと別に、ラップされたブロックチェーンで実行できるように`block.ChainVM`する特別なVMです。サーバーとクライアントの2つの重要な部分があります。これにより、自身のプロセス`block.ChainVM`で基礎となるものが[`server`](https://github.com/ava-labs/avalanchego/blob/master/vms/rpcchainvm/vm_server.go)実行され、基礎となるVMのメソッドがgRPC経由で呼び出されることができます。[クライアント](https://github.com/ava-labs/avalanchego/blob/master/vms/rpcchainvm/vm_client.go)は、AvalancheGoの一部として実行され、対応するサーバーにgRPC呼び出しを行い、ブロックチェーンの状態を更新したり問い合わせたりするようにします。

事をより具体化する：AvalancheGoがこのように実行するチェーンからブロックを取り出したいと考えてください。AvalancheGoは、クライアントメソッドを呼び出します。これにより`GetBlock`、gRPCがサーバーに呼び出されるようになります。サーバーは、基礎となる`GetBlock`VMメソッドを呼び出し、クライアントにレスポンスを提供します。これによりAvalancheGoにレスポンスを提供します。

別の例として、サーバーのメソッドを見てみましょう`BuildBlock`：

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

この呼び出しが、基礎となるVM実装`vm.vm`である場所で`vm.vm.BuildBlock()`呼び出し、新しいブロックを返します。

## タイムスタンプサーバ実装

現在、VMが実装しなければならないインターフェースと、VMを構築するためのライブラリがわかることがわかりました。

実装し、そのブロックが実装`block.ChainVM`するVMを書きましょう。`snowman.Block`

### ブロック

まず、ブロック実装を見てみよう。

型宣言は、次のとおりです。

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

`serialize:"true"`タグは、ブロックを永続化する場合や他のノードに送信する際に使用されるブロックのバイト表現にフィールドが含まれないようにすることを示します。

#### 検証

この方法により、ブロックが有効であることを確認し、データベースに保存します。

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

それが、我々のブロック実装のためのコードです！我々が実装しなければ`Block`ならない他のメソッドは`snowman.Block`、以下から継承されます。`*core.Block`

### バーチャルマシン

さて、インターフェースを実装する、我々のタイムスタンプVM実装を見てみよう`block.ChainVM`。

宣言は次のとおりです。

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

このメソッドは、VMの新しいインスタンスが初期化されたときに呼び出されます。Genesisブロックは、この方法で作成されます。

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

#### prosoeBlock

この方法により、メンプールにデータが追加され、新しいブロックが構築され、投票が完了するというブロックチェーンのコンセンサスレイヤーに通知します。これは、APIメソッドで呼び出されます`ProposeBlock`。

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

バイト表現からブロックを解析します。

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

#### CreateHandler

`Service`.で定義されたハンドラAPIの詳細は[、以下](create-a-virtual-machine-vm.md#api)のことを参照してください。

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

#### CreateStaticHandler

.で定義された静的ハンドラを登録`StaticService`します静的APIの詳細は[、以下](create-a-virtual-machine-vm.md#static-api)のことを参照してください。

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

VMは静的なAPIを持っている可能性があり、クライアントが特定のブロックチェーンの状態を問い合わせや更新するのではなく、VM全体として適用されるメソッドを呼び出すことができます。これは、コンピュータプログラミングにおける静的メソッドに類似したものです。AvalancheGoは、[GorillaのRPCライブラリ](https://www.gorillatoolkit.org/pkg/rpc)を使用して、HTTP APIを実装します。

`StaticService`我々のVMのための静的APIを実装します。

```go
// StaticService defines the static API for the timestamp vm
type StaticService struct{}
```

#### エンコード

各APIメソッドで、以下のものがあります：

* メソッドの引数を定義する構造体
* メソッドの戻り値を定義する構造体
* APIメソッドを実装し、上記2つのストラクチャ上でパラメータ化されるメソッド。

このAPIメソッドは、指定されたエンコードスキームを使用して、そのバイト表現に文字列をエンコードします。その後ブロックに置かれたデータをエンコードし、このチェーンの次のブロックとして提案するのに使用できます。

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

`Encode`このAPIメソッドは、以下の逆の

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

VMは、非静的HTTP APIを持たせる可能性もあり、これによりクライアントがブロックチェーンの状態を問い合わせ、更新できるようにします。

`Service`宣言は次のとおりです：

```go
// Service is the API service for this VM
type Service struct{ vm *VM }
```

この構造体は、VMに参照されることにより、ステートクエリや更新が可能になります。

このVMのAPIには、2つのメソッドがあります。ひとつは、クライアントがIDでブロックを取得することができます。もう一方で、クライアントがこのブロックチェーンの次のブロックを提案することができます。

#### timestampvm.getBlock

IDでブロックを取得します。IDが存在しない場合、最新ブロックを取得してください。

**シグネチャ**

```cpp
timestampvm.getBlock({id: string}) ->
    {
        id: string,
        data: string,
        timestamp: int,
        parentID: string
    }
```

* `id`は、取得されるブロックのIDです。引数から省略した場合、最新ブロックを取得します
* `data`ブロックの32バイトペイロードについて、ベース58（チェックサムで）表現されます。
* `timestamp`このブロックが作成されたときに、Unixタイムスタンプ
* `parentID`ブロックの親

**コール例**

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

**例**

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

#### timestampvm.proposeBlock

このブロックチェーン上で次のブロックをプロポーズします。

**シグネチャ**

```cpp
timestampvm.proposeBlock({data: string}) -> {success: bool}
```

* `data`iss は、提案されたブロックの32バイトペイロードについて、58（チェックサムで）表現になります。

**コール例**

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

**例**

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

このVMと互換性が向上するためには`go-plugin`、gRPC上で我々のVMにサービスを提供する`main`パッケージとメソッドを定義する必要があります。これによりAvalancheGoがメソッドを呼び出すことができます。

`main.go`内容は次のとおりです：

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

AvalancheGoがこのプラグインに接続し、メソッドを呼び出す`rpcchainvm`ことができます。

#### VMエイリアス

VMとAPIエンドポイントを別名することができます。たとえば、以下のJSONファイルを作成`TimestampVM`してエイリアスできます`~/.avalanchego/configs/vms/aliases.json`。

```javascript
{
  "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH": [
    "timestampvm",
    "timestamp"
  ]
}
```

これで、エンドポイントと . このVMの静的APIにアクセスできるよう`/ext/vm/timestampvm`になりました。`/ext/vm/timestamp`以下に示すように、VMにエイリアスを与えることは他の意味を持ちます。より詳細は、ここを参照[してください。](../../references/command-line-interface.md#vm-configs)

#### 実行可能なビルド

`main`このVMは、このVMの実行可能ファイルを構築する[ビルドスクリプト](https://github.com/ava-labs/timestampvm-rpc/blob/main/scripts/build.sh)を持っています。

実行可能ファイルとその名前と同様に、引数を介してビルドスクリプトに提供することができます。たとえば、

```text
./scripts/build.sh ../avalanchego/build/avalanchego-latest/plugins timestampvm
```

`$GOPATH/src/github.com/ava-labs/avalanchego/build/avalanchego-latestplugins/tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH`環境変数が設定されていない場合、パスはデフォルト値で（このVMのID`tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH`です。）

AvalancheGoは、以下のプラグインを検索し、登録します`[buildDir]/avalanchego-latest/plugins`。より詳細な情報は[、ここ](../../references/command-line-interface.md#build-directory)を参照してください。

実行可能名は、（CB58でエンコードされた）フルVM IDで、または、[VM Aliass Config](../../references/command-line-interface.md#vm-configs).で定義されたVMエイリアスでなければなりません。

このチュートリアルでは、VMのIDを実行可能名として使用し、プロセスをシンプルにしました。`timestampvm`しかし、AvalancheGoは、このVMのエイリアスであること`timestamp`からも受け付けるでしょう。

### ラッピングアップ

それで終わりました！ブロックチェーンベースのタイムスタンプサーバーを定義する、VMの実装全体です。

このチュートリアルでは、以下のことを学習しました：

* `block.ChainVM`リニアチェーンを定義するすべてのVMが
* リニアチェーンの一部であるすべてのブロックが実装しなければならないインターフェース`snowman.Block`。
* VMの定義をより迅速にするような種類`core.SnowmanVM`と`core.Block`ライブラリのタイプ
* ブロックチェーが自身のプロセスで実行できるようにする`rpcchainvm`タイプ。

これで、このカスタムバーチャルマシンで新しいブロックチェーンを作成できます。

{% page-ref page="create-custom-blockchain.md" %}

