# 仮想マシン \(VM\) を作成する

## JavaScript-JavaScript-JavaScript-JavaScri

Avalancheの主な機能の1つは、[Virtual Machines \(VM\)](../../../learn/platform-overview/#virtual-machines)で定義された新しいカスタムブロックチェーンを作成する機能です。

このチュートリアルでは、非常にシンプルなVMを作成します。VMによって定義されたブロックチェーンは、タイムスタンプサーバーです。ブロックチェーン内の各ブロックには、32バイトのデータ \(payload\)とともに作成されたタイムスタンプが含まれています。各ブロックのタイムスタンプは、親のタイムスタンプの後であります。

このようなサーバーは、ブロックが作成された時点で存在していたデータの一部を証明するために使用できるため便利です。本の原稿を持っていると仮定し、今日原稿が存在することを将来証明できるようになりたいとします。ブロックチェーンにブロックを追加することができます。そこでブロックのペイロードがあなたの原稿のハッシュです。将来的には、ブロックがそのペイロード \(これはハッシュの前画像を探すことは不可能であるという事実から続く)に、原稿が今日存在していたことを証明することができます。

ブロックチェーンはAvalancheGoとは別のプロセスとして実行でき、AvalancheGoとgRPCで通信できます。これは、`rpcchainvm`によって有効化されます。これは、[`go-plugin`](https://pkg.go.dev/github.com/hashicorp/go-plugin)を使用して別のVM実装を包む特別なVMです。例えば、C-Chainは[Coreth](https://github.com/ava-labs/coreth) VMをこの方法で実行します。

VMの実装に着く前に、AvalancheGoのコンセンサスエンジンと互換性があるためにVMが実装する必要があるインターフェイスについて説明します。スニペットのすべてのコードを表示し、説明します。すべてのコードが1か所で表示される場合は、[このリポジトリ](https://github.com/ava-labs/timestampvm/)を参照してください。

## インターフェイス

### `Block.ChainVM-JP`

Avalancheは、Snowman コンセンサスエンジンを使用しています。Snowman と互換性があるためには、VM は `block.ChainVM` インターフェイスを実装する必要があります。これは、[その宣言](https://github.com/ava-labs/avalanchego/blob/master/snow/engine/snowman/block/vm.go)から下記に含まれています。

インターフェイスは大きいですが、心配しないでください。各メソッドを説明し、実装例を見てみましょう。そして、すべての詳細をすぐに理解することは重要ではありません。

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

`common.VM`は`、`DAGまたはリニアチェーンであれ、すべてのVMが実装しなければならないタイプです。

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

### `snowman.Block-JP`

`snowman.Block` タイプは、`block.ChainVM` インターフェイスで参照されています。ブロックが線形 \(Snowman\) チェーン内のブロックに実装しなければならない方法を説明します。

ここからコピーするこのインターフェイスとそのメソッドを見てみましょう[。](https://github.com/ava-labs/avalanchego/blob/master/snow/consensus/snowman/block.go)

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

このインターフェイスは、トランザクション、ブロック、頂点など、すべての決定可能なオブジェクトのスーパーセットです。

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

## Helper Library-JP

VM実装が \(embedding は Go の継承型のように) を埋め込むことができるいくつかのタイプを用意しました。

この例では、両方のライブラリータイプを使用しています。また、それらも使用することをお勧めします。

### Core.SnowmanVM

このヘルパータイプは、多くの`ブロックを`実装する構造体です。ChainVMメソッド。[JavaScript-JP-JP-](https://github.com/ava-labs/avalanchego/blob/master/vms/components/core/snowman_vm.go)

#### JavaScript-JavaScript-JavaScript-JavaScri

いくつかの `block.ChainVM` メソッドは`core.SnowmanVM` によって実装されています:

* `ParseBlock-JP`
* `GetBlock-JP`
* `SetPreference-JP`
* `LastAccepted-Case-JP`
* `JavaScript-JP-JP-`
* `Bootstrapping-JP`
* `Bootstrapped`
* `JP-JP-`

VM実装が`core.`SnowmanVMを埋め込む場合、これらのメソッドはcore`.SnowmanVM`によって既に実装されているため、いずれかの方法を実装する必要はありません。JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaJava

#### JPF-JP-JP

このタイプには、VM実装に含めるためのいくつかのフィールドが含まれています。その中でも：

* `DB`: ブロックチェーンデータベース
* `Ctx`: ブロックチェーンのランタイムコンテキスト
* `preferred`: 新しいブロックが構築される優先ブロックのIDです。
* `LastAcceptedID`: 最近受け入れられたブロックのID
* `ToEngine`: このブロックチェーンに電力供給するコンセンサスエンジンにメッセージを送信するために使用されるチャネル
* `State`: ブロックなどのデータを保持するために使用されます。

### core.Block.JP

このヘルパータイプは、`snowman.Block`インターフェースの多くのメソッドを実装しています。

#### JavaScript-JavaScript-JavaScript-JavaScri

`Snowman.Block`インターフェイスメソッドは次のとおりです。

* `JP-JP-`
* `Parent-Parent-JP`
* `--`
* `JavaScriptを有効にします。`
* `JPS-JP-JP`
* `JP-JP-`

VM実装のブロックは、おそらく`Accept` and `Reject`をオーバーライドして、それらのメソッドによりアプリケーション固有の状態が変更されるようにします。

#### JPF-JP-JP

`core.Block` には、`core.SnowmanVM` への参照であるフィールド `VM` があります。これは、`core.Block`がそのタイプのすべてのフィールドとメソッドにアクセスできます。

### rpcchainvm

`rpcchainvm`は、`block.ChainVM`を包む特別なVMで、ラップされたブロックチェーンがAvalancheGoとは別に独自のプロセスで実行できるようにします。`rpcchainvm`には、サーバーとクライアントの2つの重要な部分があります。[`サーバー`](https://github.com/ava-labs/avalanchego/blob/master/vms/rpcchainvm/vm_server.go)は、基礎となる`ブロック`を独自のプロセスで実行します。ChainVM そして、基礎となる VM のメソッドを gRPC 経由で呼び出すことができます。[クライアント](https://github.com/ava-labs/avalanchego/blob/master/vms/rpcchainvm/vm_client.go)はAvalancheGoの一部として実行され、ブロックチェーンの状態を更新またはクエリするために対応するサーバーにgRPCを呼び出します。

物事をより具体的にするために: AvalancheGo がこの方法で実行するブロックを取得したいとします。AvalancheGoはクライアントの`GetBlock`メソッドを呼び出します。これは、別のプロセスで実行されているサーバーへのgRPCコールになります。サーバーは、基礎となるVMの`GetBlock`メソッドを呼び出して、クライアントへのレスポンスを提供します。

別の例として、サーバーの`BuildBlock`メソッドを見てみましょう。

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

`vm.vm.BuildBlock()` を呼び出します。`vm.vm` は VM 実装であり、新しいブロックを返します。

## Timestamp Serverの実装

VMが実装する必要があるインターフェイスとVMのビルドに使用できるライブラリがわかりました。

VMを書きましょう。`block.ChainVM`を実装し、そのブロックが`snowman.Block`を実装するVMを書きましょう。

### JPB-JP-JP

まず、ブロック実装を見てみましょう。

JavaScript-JavaScript-JavaScript-JavaScri

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

`serialize:"true"`タグは、ブロックを永続化したり、他のノードに送信したりする際に使用されるブロックのバイト表現にフィールドをインクルードする必要があります。

#### 検証する

このメソッドはブロックが有効であることを検証し、それをデータベースに保存します。

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

これが私たちのブロック実装のためのコードです！`snowman.Block`の他のメソッドはすべて、`*core.Block`から継承さ`れ`ています。

### VRマシン

さて、`block.ChainVM`インターフェースを実装したタイムスタンプVMの実装を見てみましょう。

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

#### JP-JP-

このメソッドは、VMの新しいインスタンスを初期化したときに呼び出されます。Genesisブロックはこの方法で作成されます。

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

#### proposeBlock-JP

この方法は、メンプールにデータを追加し、新しいブロックが構築され、投票される準備ができていることをブロックチェーンのコンセンサスレイヤーに通知します。これはAPIメソッド`ProposeBlock`で呼び出されます。これは後で見ます。

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

#### ParseBlock-JP

Blocks からブロックを解析します。

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

#### CreateHandlers-JP

`Service` で定義されたハンドラを登録しました。API の詳細については[、以下](create-a-virtual-machine-vm.md#api)を参照してください。

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

`StaticService`で定義された静的ハンドラを登録します。静的APIの詳細については[、以下](create-a-virtual-machine-vm.md#static-api)を参照してください。

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

VMには静的APIが存在する可能性があります。これは、クライアントが特定のブロックチェーンの状態をクエリしたり更新したりしないのではなく、VM全体に適用するメソッドを呼び出すことができます。これはコンピュータプログラミングにおける静的方法に類似しています。AvalancheGo[はGorillaのRPCライブラリ](https://www.gorillatoolkit.org/pkg/rpc)を使用してHTTP APIを実装しています。

`StaticService` は VM 用の静的 API を実装しています。

```go
// StaticService defines the static API for the timestamp vm
type StaticService struct{}
```

#### JPEJ-POJP-JP-JP

API メソッドごとに、次のようなものがあります。

* メソッドの引数を定義する構造体
* メソッドの戻り値を定義する構造体
* APIメソッドを実装し、上記2つの構造体でパラメータ化されたメソッドです。

この API メソッドは、指定したエンコーディングスキームを使用して、文字列をそのバイト表現にエンコードします。このコードは、ブロックに置かれ、このチェーンの次のブロックとして提案されたデータをエンコードするために使用できます。

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

#### Decode-JP

このAPIメソッドは`Encode`の逆にします。

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

### API-JP

VMには非静的HTTP APIもあり、クライアントはブロックチェーンの状態をクエリして更新することができます。

`サービスの`宣言は次のとおりです。

```go
// Service is the API service for this VM
type Service struct{ vm *VM }
```

この構造体はVMへの参照を持っているため、状態をクエリと更新できることに注意してください。

このVMのAPIには2つのメソッドがあります。1つはクライアントがそのIDによってブロックを取得することができます。もう1つは、クライアントがこのブロックチェーンの次のブロックを提案することができます。

#### timestampvm.getBlock-JP

JavaScript-JP-JP-IDがない場合は、最新のブロックを取得します。

**JPS-JP-JP**

```cpp
timestampvm.getBlock({id: string}) ->
    {
        id: string,
        data: string,
        timestamp: int,
        parentID: string
    }
```

* `id` は取得するブロックの ID です。引数から省略した場合、最新のブロックを取得します。
* `data` はブロックの32バイトペイロードのベース58 \(checksum\)表現です。
* `Timestamp` は、このブロックが作成されたときに Unix タイムスタンプです。
* `parentID` はブロックの親です。

**Call 例**

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

**JP-JP-**

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

このブロックチェーンで次のブロックを提案します。

**JPS-JP-JP**

```cpp
timestampvm.proposeBlock({data: string}) -> {success: bool}
```

* `data` は、提案されたブロックの32バイトペイロードの基底58 \(checksum\)表現です。

**Call 例**

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

**JP-JP-**

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

このVMを`go-plugin`と互換性があるためには、AvalancheGoがそのメソッドを呼び出すことができるように、gRPC上でVMをサービスする`メインパッケージ`とメソッドを定義する必要があります。

`main.go` の内容は次のとおりです:

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

AvalancheGoの`rpcchainvm`はこのプラグインに接続し、そのメソッドを呼び出すことができます。

#### VM エイリアス

VM と API エンドポイントを別名することができます。例えば、`TimestampVM`をエイリアスすることができます: `~/.avalanchego/configs/vms/aliases.json` からJSONファイルを作成します。

```javascript
{
  "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH": [
    "timestampvm",
    "timestamp"
  ]
}
```

これで、このVMの静的APIは、endpoints `/ext/vm/timestampvm`および`/ext/vm/`timestampでアクセスできます。VMにエイリアスを与えるには、以下のように他の意味があります。詳しくはこちらをご覧ください[。](../../references/command-line-interface.md#vm-configs)

#### JavaScript-JP-JP-

このVMには、このVM \(呼び出されたときに、上から`メインメソッド`が実行さ[れ](https://github.com/ava-labs/timestampvm-rpc/blob/main/scripts/build.sh)ます。\)

実行可能ファイルへのパスとその名前は、引数を介してビルドスクリプトに提供することができます。JavaScript-JavaScript-JavaScript-JavaScri

```text
./scripts/build.sh ../avalanchego/build/avalanchego-latest/plugins timestampvm
```

環境変数が設定されていない場合、パスは`$GOPATH/src/github.com/ava-labs/avalanchego/build/avalanchego-latestplugins/tGas3T58KzdjLHHHBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH \(tGas3T58KzdjLHH2TvrddhqTji5iZAMZAMZ3RXs2```NLpSnhH です。\)

AvalancheGoは、`[buildDir]/avalanchego-latest/plugins`の下にプラグインを検索し、登録します。詳しくは[こちら](../../references/command-line-interface.md#build-directory)をご覧ください。

実行可能名は、VM ID \(CB58\ でエンコードされた)、または[VM Aliass Config](../../references/command-line-interface.md#vm-configs) で定義されたVMエイリアスでなければなりません。

このチュートリアルでは、VMのIDを実行可能名として使用して、プロセスを簡素化しました。しかし、AvalancheGo は、このVMのエイリアスなので、`timestampvm` または `timestamp` も受け入れます。

### JP-JP-

それでいい！これは、ブロックチェーンベースのタイムスタンプサーバーを定義するVMの実装全体です。

JavaScript-JP-JP-

* `block.ChainVM` インターフェイス。これは、リニアチェーンを定義するすべての VM が実装する必要があります。
* `snowman.Block`インターフェイスは、線形チェーンの一部であるすべてのブロックが実装しなければなりません。
* `core.SnowmanVM` と `core.Block` ライブラリータイプで、VM の定義をより速くします。
* `rpcchainvm` タイプはブロックチェーンが独自のプロセスで実行できるようにします。

これで、このカスタム仮想マシンで新しいブロックチェーンを作成できます。

--

