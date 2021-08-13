# Sanal Makine oluştur \(VM\

## Tanıştırma

of temel özelliklerinden biri [sanal makineler](../../../learn/platform-overview/#virtual-machines) tarafından tanımlanan yeni ve özel blok zincirleri oluşturma yeteneğidir.

Bu özel ders için çok basit bir VM oluşturacağız. VM tarafından tanımlanan blok zinciri bir zaman damgası sunucudur. Blok zincirindeki her blok 32 byte veri parçası ile oluşturulan zaman damgasını içerir. Her bloğun zaman damgası ebeveynlerinin zaman damgası sonradır.

Bu tür bir sunucu bloğun oluşturulduğu zaman bir veri parçasının var olduğunu kanıtlamak için kullanılabilir. Diyelim ki bir kitap yazması var, ve gelecekte el yazmasının bugün varolduğunu kanıtlamak istiyorsun. Blokun yükünün el yazmasının bir esrar olduğu blok zincirine bir blok ekleyebilirsiniz. Gelecekte, bu taslağın bugün varolduğunu kanıtlayabilirsiniz... bu da bir hash pre-image bulunmasının imkansız olduğu gerçeğinden kaynaklanıyor.

Bir blok zinciri from ayrı bir işlem olarak çalışabilir ve AvalancheGo ile gRPC üzerinden iletişim kurabilir. Bu `rpcchainvm` ile etkinleştirilir, [`go-plugin`](https://pkg.go.dev/github.com/hashicorp/go-plugin) kullanan ve başka bir VM uygulaması ile sarılır. C-Chain örneğin, [Coreth](https://github.com/ava-labs/coreth) VM'yi bu şekilde çalıştırır.

Bir of uygulanmasına geçmeden önce, of AvalancheGo's uzlaşma motoruyla uyumlu olması için uygulaması gereken arayüze bakacağız. snippets. tüm kodları gösterip açıklayacağız. Tüm kodları bir yerde görmek istiyorsanız [bu](https://github.com/ava-labs/timestampvm/) depoya bakın.

## Arayüzler

### `Blok. block.ChainVM`

Avalanche (DAG blok zincirlerine karşı olarak) lineer blok zincirleri üzerinde uzlaşmaya ulaşmak için Snowman consensus motorunu kullanır. Kardan Adam'la uyumlu olabilmek için bir VM bloğu uygulaması gerekir. `block.ChainVM` [arayüzü](https://github.com/ava-labs/avalanchego/blob/master/snow/engine/snowman/block/vm.go) bildirgesinden aşağıda we

Arayüz büyüktür, ama merak etme, her yöntemi açıklayacağız ve bir uygulama örneği göreceğiz ve her detayı hemen anlamanız önemli değil.

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

### `common. VM`

`common.VM`, her `VM`, bir DAG veya doğrusal zincir için uygulaması gereken bir tiptir.

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

### `Kardan Adam.`

Blokta kullanılan `kardan adam` tipini fark etmiş olabilirsiniz. `block.ChainVM` arayüzü. Bir bloğun bir doğrusal zincirde bir blok olması için uygulaması gereken yöntemleri tanımlar.

Bu arayüze ve yöntemlerine bakalım, [buradan](https://github.com/ava-labs/avalanchego/blob/master/snow/consensus/snowman/block.go) kopyalıyoruz.

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

### `Seçimler. Karar verilebilir.`

Bu arayüz işlemler, bloklar ve dikişler gibi her kararlı nesnenin superset

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

## Yardımcı Kütüphaneler

VM uygulamasının yazabileceği bazı türler yarattık. (gömme kalıtım gibi\ (gömme kalıtım gibi) kayan kodu ele geçirmek için.

Örnek olarak, aşağıdaki kütüphane türlerini kullanıyoruz. Ve sizi de kullanmanız için teşvik ediyoruz.

### core. core.SnowmanVM

Bu yardım tipi bloğun birçok kısmını uygulayan bir yapıdır. `block.ChainVM` yöntemleri Burada uygulanması [mümkün](https://github.com/ava-labs/avalanchego/blob/master/vms/components/core/snowman_vm.go).

#### Yöntemler

Bazı blok. `block.ChainVM` yöntemleri çekirdek tarafından uygulanıyor. `core.SnowmanVM`

* `ParseBlock`
* `GetBlock`
* `SetPreference`
* `Kabul Edildi`
* `Kapat çeneni`
* `- Çizme takıntısı`
* `- Bot kayışlı`
* `Başlat`

Eğer VM uygulamanız çekirdeği If bu yöntemlerin hiçbirini uygulamanız gerekmez. Çünkü zaten çekirdek tarafından uygulanmışlardır. `core.SnowmanVM```, tarafından uygulanmışlardır. Eğer istersen bu miras kalan yöntemleri geçersiz kılabilirsin.

#### - Tarlalar

Bu tip VM uygulamasında dahil etmek isteyeceğiniz birkaç alan içerir. Aralarında da var:

* `DB`: blok zincirinin veritabanı
* `Ctx`: blok zincirinin çalışma zamanı bağlamı
* `Tercih edilir`: Yeni bloklar inşa edilecek olan bloğun kimliği
* `Son Kabul Edilen` Kimlik: En son kabul edilen bloğun Kimliği
* `ToEngine`: Kanal bu blok zincirini güçlendiren uzlaşmalı motora mesaj gönderiyordu.
* `Durumu`: bloklar gibi verileri sürdürmek için kullanıldı

### core. core.Block

Bu yardım tipi `kardan adam` arabirimi için birçok yöntem uygulamaktadır.

#### Yöntemler

Bazı uygulanan `kardan adam. Blok` arayüzü yöntemleri:

* `Kimlik`
* `- Ebeveyn`
* `Kabul ediyorum`
* `Reddedildi`
* `Durum nedir?`
* `Boyu yüksek`

VM uygulamasındaki bloklar muhtemelen `kabul` ve `reddedilmeyi` geçersiz kılacak böylece bu yöntemler uygulama belirli durum değişikliğine neden olur.

#### - Tarlalar

`core.` Block, bir çekirdek için referans olan bir `VM` alanı vardır. `core.SnowmanVM`. Bu da `bir çekirdek` anlamına gelir. Blok, bu tip alanlara ve yöntemlere erişimi vardır.

### Rpcchainvm

`rpcchainvm``` bir bloğu saran özel bir VM. `block.ChainVM` ve sarılı blok zincirinin AvalancheGo. rpcchainvm ile birlikte iki önemli parçaya sahiptir: bir sunucu ve bir istemci. [`Sunucu`](https://github.com/ava-labs/avalanchego/blob/master/vms/rpcchainvm/vm_server.go) alt bloğu çalıştırır. `block.ChainVM` kendi işlemini içinde ve alttaki VM's yöntemlerinin gRPC aracılığıyla adlandırılmasına izin verir. [Müşteri](https://github.com/ava-labs/avalanchego/blob/master/vms/rpcchainvm/vm_client.go) AvalancheGo parçası olarak çalışıyor ve blok zincirinin durumunu güncellemek veya sorgulamak için karşılık gelen sunucuya gRPC çağrılarını yapar.

Daha beton yapmak için: AvalancheGo bu şekilde zincirleme bir koşudan bir blok almak istediğini varsayalım. AvalancheGo istemcinin `GetBlock` yöntemini çağırır ve bu da farklı bir süreçte çalışan sunucuya gRPC çağrısı yapar. Sunucu, alttaki VM's `GetBlock` metodunu çağırır ve bu da VM's yanıt verir.

Bir başka örnek olarak, sunucuların `BuildBlock` yöntemine bakalım:

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

`Vm.vm.BuildBlock()` olarak adlandırılır, burada `vm.vm` altında yatan VM uygulaması olduğu ve yeni bir bloğu geri gönderir.

## Zaman damgası Sunucusu Uygulaması

our uygulaması gereken arayüzü ve bir VM oluşturmak için kullanabileceğimiz kütüphaneleri biliyoruz.

Blok blokunu uygulayan VM'yi yazalım. `block.ChainVM` ve blokları `kardan adam uygulayan. Block`.

### Blok var

Öncelikle blok uygulamamıza bakalım.

Tipi bildirgesi:

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

Seri `serialize:"true"` etiketi bloğun sürekli olarak kullanılan bloğun byte temsiline dahil edilmelidir.

#### Doğrulayın

Bu yöntem bir bloğun geçerli olduğunu doğrular ve veritabanında saklar.

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

Blok uygulamamızın tüm kodu bu! `our` uygulaması gereken `kardan adam` yöntemlerinin tüm metotları `from` miras alınmıştır.

### Sanal Makine

Şimdi, blok uygulayan, zaman damgası VM uygulamasına bakalım. `block.ChainVM` arayüzü.

Bildirge:

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

#### Başlat

Bu yöntem yeni bir of başlatılması durumunda adlandırılır. Genesis bloğu bu yöntemle oluşturulur.

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

#### Teklif Block

Bu yöntem mempool için bir veri parçası ekler ve blok zincirinin uzlaşma katmanına yeni bir bloğun inşa edilmeye hazır olduğunu ve oylamaya hazır olduğunu bildirir. Bu yöntem API yöntemi tarafından `adlandırılır`, daha sonra göreceğiz

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

byte temsilinden bir blok ayırın.

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

#### Yaratıcı Kullanıcılar

`Hizmet` içinde tanımlanan kayıtlı denetleyiciler var. Daha fazla API'ler için [aşağıya](create-a-virtual-machine-vm.md#api) bak.

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

#### İstatistik Yöneticileri oluşturun

`in` tanımlanan kayıtlar statik denetleyiciler. Daha fazla statik API'ler için [aşağıya](create-a-virtual-machine-vm.md#static-api) bak.

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

### Statiksel API

Bir VM, belirli bir blok zincirinin durumunu sorgulamayan veya güncellemeyen yöntemleri arayabilen statik bir API olabilir, ancak to tüm olarak başvuru sağlar. Bu bilgisayar programlamasında statik yöntemlere benzeşir. Avalanchego, HTTP API'leri uygulamak için [Gorilla'nın RPC kütüphanesini](https://www.gorillatoolkit.org/pkg/rpc) kullanır.

`İstatistikler` our için statik API'yi uyguluyor.

```go
// StaticService defines the static API for the timestamp vm
type StaticService struct{}
```

#### Encode

Her API yöntemi için şöyle bir şey vardır:

* Yöntemin argümanlarını tanımlayan bir yapı.
* Yöntemin geri dönüşü değerlerini tanımlayan bir yapı.
* API metodu uygulayan ve yukarıdaki 2 yapıda that bir yöntem.

Bu API yöntemi verilen bir kodlama şeması kullanarak byte temsiline bir diziyi kodlar. Bu zincir için bir blok koyulan verileri kodlamak ve bu zincir için bir sonraki blok olarak önerilmek için kullanılabilir.

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

Bu API yöntemi `Encode`. ters yönüdür.

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

Bir VM, ayrıca statik olmayan bir HTTP API de olabilir, bu da istemcilerin blok zincirinin durumunu sorgulama ve güncellemesine olanak sağlar.

`Hizmet` bildirisi:

```go
// Service is the API service for this VM
type Service struct{ vm *VM }
```

Bu yapının to bir referans olduğunu ve durumu sorgulayabileceğini unutmayın.

Bu VM's VM's iki yöntemi var. Bir müşterinin kimlik ile bir blok almasını sağlar. Diğeri ise bir müşterinin bu blok zincirinin bir sonraki bloğunu önermesini sağlar.

#### Zaman damgası timestampvm.getBlock

Kimliği ile bir blok oluşturun. Kimlik sağlanamazsa, son bloğu alın.

**İmzalanma**

```cpp
timestampvm.getBlock({id: string}) ->
    {
        id: string,
        data: string,
        timestamp: int,
        parentID: string
    }
```

* `Kimliği` bloğun kimliği alınıyor. Eğer tartışmalardan atlanırsa, son bloğu alır.
* `Veri,` bloğun 32 byte görev yükünün taban 58 \(Checksum\ ile) temsili
* Bu blok oluşturulduğunda `zaman` damgası Unix zaman damgasıdır.
* `Ebeveyn` bloğun ebeveyni

**Örnek Example**

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

**Örnek Tepki**

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

**Uygulama**

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

#### Zaman damgası öneri Bloku

Bu blok zincirinin bir sonraki bloğunu öner.

**İmzalanma**

```cpp
timestampvm.proposeBlock({data: string}) -> {success: bool}
```

* `Veriler,` önerilen bloğun 32 byte yükünün taban 58 \(Checksum\) temsilidir.

**Örnek Example**

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

**Örnek Tepki**

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "Success": true
  },
  "id": 1
}
```

**Uygulama**

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

### Eklen

Bu VM'yi with ile uyumlu hale getirmek için `go-plugin`, gRPC üzerinden hizmet eden `ana` paket ve yöntemi tanımlamamız gerekiyor böylece AvalancheGo yöntemlerini arayabilsin.

`ana .go'nun` içeriği:

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

AvalancheGo's `rpcchainvm` bu eklentiye bağlanabilir ve yöntemlerini çağırır.

#### VM Tanıklıkları

VMs takma isimlerini ve API uçlarını kullanmaları mümkün. Örneğin, `at` JSON dosyası oluşturarak `TimestampVM` takma ad koyabiliriz.

```javascript
{
  "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH": [
    "timestampvm",
    "timestamp"
  ]
}
```

Bu VM's statik API'si `endpoints` ve `at` erişilebilir. Bir VM takma isim vermenin başka etkileri de var. Aşağıda göreceğimiz gibi. Daha fazla detay için, [buraya](../../references/command-line-interface.md#vm-configs) bak.

#### Uygulanabilir Yapılandırma

Bu VM, bu VM (çağrıldığında, `ana` metodu yukarıdan çalıştıran bir işletim sistemi oluşturan [bir yapı betiği](https://github.com/ava-labs/timestampvm-rpc/blob/main/scripts/build.sh) vardır. \)

Uygulanabilir yol, hem de adı ile argümanlar yoluyla betiğe sunulabilir. Örneğin:

```text
./scripts/build.sh ../avalanchego/build/avalanchego-latest/plugins timestampvm
```

Çevre değişeni belirlenmemişse, yol `${` `GOPATH/src/github.com/ava-labs/avalanchego/Buil/avalanchego-latestplugins/tGas3T5T5TzdjLHHDMMnH2Tvrddhqqi5iZAMZ3RXs2NLpSnhH` \(tGas3T5TzdjdjLHBDnH2Tdh2Th2Th3Z3RXs2NH2Vdhhqqcc/gcccc/gccc/gc/gc/ava-c/ava-cc/ava-cc/ava-cc/ava-c/ava-cc/ava-cc/ava-cmmccmmccmmc/cc/c//ccmm \)

AvalancheGo `[buildDir]/avalanchego-latest/plugins`. / eklentiler altında kayıt eklentileri arıyor. Daha fazla bilgi için [buraya](../../references/command-line-interface.md#build-directory) bak.

Kullanılabilir isimler ya tam bir VM ID (CB58\ kodlanmış bir VM kimlik olmalıdır), ya da [VM Aliases](../../references/command-line-interface.md#vm-configs) by tanımladığı bir VM takma adıdır.

Bu özel ders için, VM's kimliğini işlemi basitleştirmek için kullandık. Ancak AvalancheGo bu VM için takma isimler olduğu için `zaman` damgası veya `zaman damgasını` da kabul eder.

### Toplantı

İşte böyle! Bu, blok zincirli zaman damgası sunucularını tanımlayan bir of tüm uygulaması.

Bu özel ders sırasında öğrendik ki:

* Blok. `block.ChainVM` arayüzü, doğrusal zinciri tanımlayan tüm VM'ler uygulamak zorundadır.
* `Kardan Adam. Blok` arayüzü, doğrusal zincirin parçası olan tüm bloklar uygular.
* Çekirdek. `core.SnowmanVM` ve `çekirdek. Block` kütüphane tipleri VM'leri daha hızlı tanımlar.
* `Rpcchainvm` tipi blok zincirlerinin kendi süreçlerinde çalışmasına olanak tanır.

Şimdi bu özel sanal makineyle yeni bir blok zinciri oluşturabiliriz.

{% page-ref page="create-custom-blockchain.md" blok page="create-custom-blockchain.md" %}

