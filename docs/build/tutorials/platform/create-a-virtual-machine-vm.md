# Bir Sanal Makinenin \(VM\) Yaratılması

## Giriş

Avalanche'ın temel özelliklerinden biri, [Sanal Makineler \(VM\)](../../../learn/platform-overview/README.md#virtual-machines) vasıtasıyla tanımlanan yeni, kişiselleştirilmiş blok zincirler yaratma yeteneğidir

Bu eğitim makalesinde çok basit bir VM yaratacağız. VM vasıtasıyla tanımlanan blok zincir, bir [zaman damgası sunucusu](https://github.com/ava-labs/timestampvm)'dur. Blok zincirdeki her bir blok, yaratıldığı zamanı gösteren bir zaman damgası ve beraberinde 32 bitlik bir veri parçası \(payload veya yararlı yük\) içerir. Her blokun zaman damgası, onun ana blokunun zaman damgasından sonra gelir.

Böyle bir sunucu yararlıdır, çünkü bir veri parçasının o blokun yaratıldığı anda mevcut olduğunu kanıtlamak için kullanılabilir. Diyelim ki bir kitap müsveddeniz var ve gelecekte o müsveddenin bugün itibarıyla mevcut olduğunu kanıtlayabilmek istiyorsunuz. Blok zincire, blokun payload'unun müsveddenizin bir hash'i \(kripto özüt\) olduğu bir blok ekleyebilirsiniz. Gelecekte, müsveddenin bugün itibarıyla mevcut olduğunu, o blokun kendi payload'unda müsveddenizin hash'ini \(kripto özüt\) içerdiğini göstererek kanıtlayabilirsiniz \(bu, bir hash'in önceki imajını bulmanın imkansız olduğu gerçeğine dayanır\).

Bir blok zincir AvalancheGo'dan ayrı bir süreç olarak çalıştırılabilir ve gRPC üzerinden AvalancheGo ile iletişim kurabilir. Bu, [`go-plugin`](https://pkg.go.dev/github.com/hashicorp/go-plugin) kullanan özel bir VM olan ve bir başka VM implamantasyonunu saran `rpcchainvm` vasıtasıyla yapılabilir. Örneğin C-Chain [Coreth](https://github.com/ava-labs/coreth) VM'yi bu tarzda çalıştırır.

Bir VM'nin implement edilmesine geçmeden önce, bir VM'nın AvalancheGo konsensüs motoru ile uyumlu olması için implement etmek zorunda olduğu arayüze bakacağız. Tüm kodu küçük parçalar halinde gösterecek ve açıklayacağız. Kodun tamamını tek bir yerde görmek isterseniz [bu yazılım havuzuna \(repository\)](https://github.com/ava-labs/timestampvm/) bakın.

_Not: Blok Zincirlerin, Subnet'lerin, İşlemlerin ve Adreslerin kimlikleri her çalıştırma/ağ için değişik olabilir. Diğer bir deyişle, bu eğitim makalesindeki bazı girdiler, son noktalar vb. siz denediğinizde değişik olabilir._

## Arayüzler

### `block.ChainVM`

Avalanche, doğrusal blok zincirlerde konsensüse ulaşmak için, \(DAG blok zincirlerin tersine\) Snowman konsensüs motorunu kullanır. Bir VM, Snowman ile uyumlu olmak için, `block.ChainVM`arayüzünü implement etmek zorundadır; bu arayüzü kendi [deklarasyonundan](https://github.com/ava-labs/avalanchego/blob/master/snow/engine/snowman/block/vm.go) aşağıya aldık.

Bu arayüz oldukça büyüktür ama endişelenmeyin, her bir metodu açıklayıp bir implementasyon örneğine bakacağız; her ayrıntıyı hemen anlamanız önemli değil.

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

`common.VM`, ister DAG ister doğrusal zincir olsun, her `VM`'nin implement etmek zorunda olduğu bir türdür.

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

`block.ChainVM` arayüzünde `snowman.Block` türüne referans yapıldığını fark etmişsinizdir. Bu, bir blokun doğrusal \(Snowman\) bir zincirdeki bir blok olmak için implement etmek zorunda olduğu metotları tarif eder.

Gelin bu arayüze ve [buradan](https://github.com/ava-labs/avalanchego/blob/master/snow/consensus/snowman/block.go) kopyaladığımız metotlara bakalım.

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

Bu arayüz; işlemler, bloklar ve verteksler \(kesişim noktaları/ düğümler\) gibi her karar verilebilir nesnenin üst kümesidir.

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

## Yardımcı Kitaplıklar

VM implementasyonunuzun boilerplate kodu yönetmek için iliştirebileceği \(iliştirme, Go'nun inheritance \(kalıt\) sürümü gibidir\) bazı türler oluşturduk.

Örneğimizde, aşağıdaki kitaplık türlerinden her ikisini de kullanıyoruz; sizin de bunları kullanmanızı öneririz.

### core.SnowmanVM

Bu yardımcı tür, `block.ChainVM` metotlarının bir çoğunu implement eden bir yapıdır. Bunun implementasyonunu [burada](https://github.com/ava-labs/avalanchego/blob/master/vms/components/core/snowman_vm.go) bulabilirsiniz.

#### Metotlar

`core.SnowmanVM` tarafından implement edilen bazı `block.ChainVM` metotları şunlardır:

* `ParseBlock`
* `GetBlock`
* `SetPreference`
* `LastAccepted`
* `Shutdown`
* `Bootstrapping`
* `Bootstrapped`
* `Initialize`

Eğer VM implementasyonunuz bir `core.SnowmanVM` iliştirirse, bu metotların hiçbirini implement etmeniz gerekmez, çünkü bunlar zaten `core.SnowmanVM` tarafından implement edilmektedir. İsterseniz bu inheritance metotları override edebilirsiniz.

#### Alanlar

Bu tür, VM implementasyonunuza dahil etmek isteyebileceğiniz birkaç alan içerir. Bu alanlar arasında şunlar yer alır:

* `DB`: blok zincirin veri tabanı
* `Ctx` : blok zincirin runtime konteksi
* `preferred`: yeni blokların üzerinde kurulacağı tercih edilen blokun kimliği
* `LastAcceptedID` : en son kabul edilen blokun kimliği
* `ToEngine` : bu blok zinciri destekleyen konsensüs motoruna mesaj göndermek için kullanılan kanal
* `State`: bloklar gibi verileri persist etmek için kullanılır

### core.Block

Bu yardımcı türü `snowman.Block` arayüzünün birçok metodunu implement eder.

#### Metotlar

Bazı implement edilen `snowman.Block` arayüzü metotları şunlardır:

* `ID`
* `Parent`
* `Accept`
* `Reject`
* `Status`
* `Height`

VM implementasyonunuzdaki bloklar `Accept` ve `Reject` metotlarını, bu metotlar aplikasyona özgü durum değişikliklerine sebep olsunlar diye muhtemelen override edecektir.

#### Alanlar

`core.Block`'da bir `VM` alanı vardır; bu alan bir `core.SnowmanVM`'ye referanstır. Bunun anlamı, `core.Block`, o türün tüm alanlarına ve metotlarına erişebilir, demektir.

### rpcchainvm

`rpcchainvm`, `block.ChainVM`'yi saran ve sarılmış blok zincirin AvalancheGo'dan ayrı kendi süreci içinde çalışmasına izin veren özel bir VM'dir. `rpcchainvm`'de iki önemli kısım vardır: sunucu ve istemci. [`server`](https://github.com/ava-labs/avalanchego/blob/master/vms/rpcchainvm/vm_server.go), altta yatan `block.ChainVM`'yi kendi süreci içinde çalıştırır ve altta yatan VM'nin metotlarının gRPC yoluyla çağrılmasına imkan verir. [İstemci](https://github.com/ava-labs/avalanchego/blob/master/vms/rpcchainvm/vm_client.go) AvalancheGo'nun bir parçası olarak çalışır ve blok zincirin durumunu güncellemek veya sorgulamak için karşılık gelen sunucuya gRPC çağrıları yapar.

Olayı daha somut hale getirmek için: AvalancheGo'nun bir bloku bu tarzda çalışan bir zincirden getirmek istediğini varsayalım. AvalancheGo, istemcinin `GetBlock` metodunu çağırır; bu metot, ayrı bir süreçte çalışmakta olan sunucuya bir gRPC çağrısı yapar. Sunucu altta yatan VM'nin `GetBlock` metodunu çağırır ve yanıtı istemciye iletir, istemci de yanıtı AvalancheGo'ya gönderir.

Bir başka örnek olarak sunucunun `BuildBlock` metoduna bakalım:

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

Bu metod `vm.vm.BuildBlock()`'i çağırır; burada `vm.vm` altta yatan VM implementasyonudur ve yeni bir blok döndürür.

## Zaman Damgası Sunucusu İmplementasyonu

Artık VM'mizin implement etmesi gereken arayüzü ve bir VM oluşturmak için kullanabileceğimiz kitaplıkları biliyoruz.

Şimdi VM'mizi yazalım; bu VM `block.ChainVM`'yi implement eder ve onun blokları `snowman.Block`'u implement eder.

### Blok

Önce blok implementasyonumuza bakalım.

Tür deklarasyonu şudur:

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

`serialize:"true"` etiketi, alanın, bloku persist ederken veya bloku diğer düğümlere gönderirken kullanılan blokun bayt temsiline dahil edilmesi gerektiğini gösterir.

#### Doğrulama

Bu metot bir blokun geçerli olduğunu doğrular ve bunu veri tabanına kaydeder.

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

Blok implementasyonumuz için kullandığımız tüm kod budur! `snowman.Block`'un `Block`'umuzun implement etmesi gereken diğer metotlarının tümü `*core.Block`'dan kalıttır \(inheritance\).

### Sanal Makine

Şimdi `block.ChainVM` arayüzünü implement eden zaman damgası VM implementasyonumuza bakalım.

Deklarasyon şu şekildedir:

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

#### İnitialize

Bu metot VM'nin yeni bir instance'ı \(örnek\) initialize edildiğinde çağrılır. Genesis bloku bu metot altında yaratılır.

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

Bu metot mempool'a yeni bir veri parçası ekler ve blok zincirin konsensüs katmanına yeni bir blokun kurulmaya ve oylanmaya hazır olduğunu bildirir. Bu metot, daha sonra göreceğimiz `ProposeBlock` API metodu vasıtasıyla çağrılır.

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

Bir blokun kendi bayt temsilinden parse edilmesi.

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

`Service`'de tanımlanmış handler'ları kaydeder. API'ler hakkında daha fazla bilgi için [aşağıya](create-a-virtual-machine-vm.md#api) göz atın.

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

 `StaticService`'de tanımlanan statik handler'ları kaydeder. Statik API'ler hakkında daha fazla bilgi için [aşağıya](create-a-virtual-machine-vm.md#static-api) bakın.

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

### Statik API

Bir VM, istemcilerin belli bir blok zinciri sorgulamayan veya güncellemeyen fakat VM'ye bir bütün olarak uygulanan metotları çağırmalarına imkan veren statik API'ye sahip olabilir. Bu, bilgisayar programlamasındaki statik metotlara benzer. AvalancheGo, HTTP API'leri implement etmek için [Gorilla'nın RPC kitaplığını](https://www.gorillatoolkit.org/pkg/rpc) kullanır.

`StaticService`, VM'mize ait statik API'yi implement eder.

```go
// StaticService defines the static API for the timestamp vm
type StaticService struct{}
```

#### Encode

Her API metodu için şunlar mevcuttur:

* Metodun argümanlarını tanımlayan bir yapı
* Metodun dönüş değerlerini tanımlayan bir yapı
* API metodunu implement eden ve yukarıdaki 2 yapı üzerinde parametreleri belirlenen bir metot

Bu API metodu belli bir kodlama şemasını kullanarak kendi bayt temsiline bir string kodlar. Bu metot, daha sonra bir bloka yerleştirilen ve bu zincir için bir sonraki blok olarak teklif edilen verileri kodlamak için kullanılabilir.

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

Bu API metodu `Encode`'un tersidir.

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

Bir VM'de, istemcilerin blok zincirin durumunu sorgulamasına ve güncellemesine imkan veren statik olmayan bir HTTP API de bulunabilir.

`Service`'in deklarasyonu şudur:

```go
// Service is the API service for this VM
type Service struct{ vm *VM }
```

Gördüğünüz gibi bu yapının VM'ye bir referansı vardır, dolayısıyla durumu sorgulayıp güncelleyebilir.

Bu VM'nin API'si iki metoda sahiptir. Metotlardan biri, bir istemcinin bir bloku kimliği vasıtasıyla getirmesine imkan verir. Diğer metot, bir istemcinin bu blok zincirin bir sonraki blokunu teklif etmesine imkan verir. Son noktadaki blok zincir kimliği değişir, zira her blok zincirin benzersiz bir kimliği vardır. Daha fazla bilgi için [Yeni Blok Zinciri ile Etkileşim](create-custom-blockchain.md#interact-with-the-new-blockchain) bölümüne bakın.

#### estampvm.getBlock

Bir bloku kimliği vasıtasıyla getirme. Hiçbir kimlik verilmiyorsa, en son bloku getirin.

**İmza**

```cpp
timestampvm.getBlock({id: string}) ->
    {
        id: string,
        data: string,
        timestamp: int,
        parentID: string
    }
```

* `id`, getirilen blokun kimliğidir. Argümanlarda kullanılmadıysa, en son bloku getirir
* `data`, blokun 32 baytlık payload'unun base 58 \(sağlama toplamı ile birlikte\) temsilidir
* `timestamp`, bu blokun yaratıldığı andaki Unix zaman damgasıdır
* `parentID`, blokun anasıdır

**Örnek Çağrı**

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

**Örnek Yanıt**

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

**İmplementasyon**

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

Bu blok zincirde bir sonraki bloku teklif eder.

**İmza**

```cpp
timestampvm.proposeBlock({data: string}) -> {success: bool}
```

* `data`, teklif edilen blokun 32 baytlık payload'unun base 58 \(sağlama toplamı ile birlikte\) temsilidir.

**Örnek Çağrı**

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

**Örnek Yanıt**

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "Success": true
  },
  "id": 1
}
```

**İmplementasyon**

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

Bu VM'yi `go-plugin` ile uyumlu hale getirmek için, AvalancheGo'nun metotlarını çağırabilmesi için VM'mize gRPC üzerinden hizmet sunan bir `main` paketi ve metodu tanımlamalıyız.

`main.go`'nun içerikleri şunlardır:

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

Şimdi AvalancheGo'nun `rpcchainvm` metodu bu plugin'e bağlanabilir ve metotlarını çağırabilir.

#### VM Alias'ları

VM'lere ve API son noktalarına alias atamak mümkündür. Örnek olarak, `TimestampVM`'ye, `~/.avalanchego/configs/vms/aliases.json`'de aşağıdaki şekilde bir JSON dosyası yaratarak alias atayabiliriz:

```javascript
{
  "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH": [
    "timestampvm",
    "timestamp"
  ]
}
```

Şimdi bu VM'nin statik API'sine `/ext/vm/timestampvm` ve `/ext/vm/timestamp` son noktalarında erişilebilir. Bir VM'ye bir alias atanmasının başka sonuçları olur; bunları aşağıda göreceğiz. Daha fazla bilgi için [buraya](../../references/command-line-interface.md#vm-configs) bakın.

#### Executable'ın Kurulması

Bu VM'nin, bu VM'nin bir executable'ını kuran bir [build script](https://github.com/ava-labs/timestampvm-rpc/blob/main/scripts/build.sh)'i vardır \(çağırıldığında, `main` metodunu yukarıdan itibaren çalıştırır\).

Executable'ın yolu, yanı sıra adı, argümanlar yoluyla build script'e sağlanabilir. Örnek olarak:

```text
./scripts/build.sh ../avalanchego/build/avalanchego-latest/plugins timestampvm
```

Ortam değişkeni belirlenmediyse, bu yol varsayılan olarak `$GOPATH/src/github.com/ava-labs/avalanchego/build/avalanchego-latestplugins/tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH`olur \(`tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH`, bu VM'nin kimliğidir\).

AvalancheGo, `[buildDir]/avalanchego-latest/plugins` altında plugin'leri arar ve kaydeder. Daha fazla bilgi için [buraya](../../references/command-line-interface.md#build-directory) bakın.

Executable adları ya tam bir VM kimliği \(CB58 ile kodlanmış\) ya da [VM Alias Config](../../references/command-line-interface.md#vm-configs) ile tanımlanmış bir VM alias'ı olmalıdır.

Bu eğitim makalesinde biz süreci basitleştirmek için VM'nin kimliğini executable adı olarak kullandık. Ancak AvalancheGo, `timestampvm` veya `timestamp` adlarını da kabul edecektir, zira bunlar bu VM'ye atanmış alias'lardır.

### Sonuç

Bu kadar! Blok zincir tabanlı bir zaman damgası sunucusunu tanımlayan bir VM'nin tüm implementasyonu budur.

Bu eğitim makalesinde şunları öğrendik:

* Doğrusal \(linear\) bir zincir tanımlayan tüm VM'lerin implement etmesi gereken `block.ChainVM` arayüzü
* Doğrusal bir zincirin parçası olan tüm blokların implement etmesi gereken `snowman.Block` arayüzü
* VM'lerin tanımlanmasını hızlandıran `core.SnowmanVM` ve `core.Block` kitaplık türleri
* Blok zincirlerin kendi süreçlerinde çalışmasına imkan veren `rpcchainvm` türü.

Şimdi [bunu](create-custom-blockchain.md) takip ederek bu kişiselleştirilmiş sanal makine vasıtasıyla yeni bir blok zinciri oluşturabiliriz.


