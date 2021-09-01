# Créer une machine virtuelle \(VM\)

## Introduction

L'une des principales caractéristiques d'Avalanche est la possibilité de créer de nouvelles blockchains personnalisées, qui sont définies par des [machines virtuelles \(VM\)](../../../learn/platform-overview/#virtual-machines)

Dans ce tutoriel, nous créerons un VM très simple. La blockchain définie par la VM est un [serveur](https://github.com/ava-labs/timestampvm) de timestamp Chaque bloc de la blockchain contient le timestamp lorsqu'il a été créé avec un morceau de données de 32 octets \(charge utile\). Le stamp chronologique de chaque bloc est après le stamp chronologique de son père.

Un tel serveur est utile parce qu'il peut être utilisé pour prouver qu'un morceau de données existait au moment de la création du block. Supposons que vous ayez un manuscrit de livre, et vous voulez être en mesure de prouver à l'avenir que le manuscrit existe aujourd'hui. Vous pouvez ajouter un bloc à la blockchain où la charge utile du bloc est un hachage de votre manuscrit. Dans l'avenir, vous pouvez prouver que le manuscrit existait aujourd'hui en montrant que le bloc a le hachage de votre manuscrit dans sa charge utile \(cela découle du fait que trouver la pré-image d'un hachage est impossible\).

Une blockchain peut fonctionner comme un processus distinct a et peut communiquer avec AvalancheGo sur gRPC. `rpcchainvm`Ceci est activé par une VM spéciale qui utilise [`go-plugin`](https://pkg.go.dev/github.com/hashicorp/go-plugin)et enveloppe une autre implémentation de VM. Le C-Chain, par exemple, gère la VM [Coreth](https://github.com/ava-labs/coreth) de cette façon.

Avant de parvenir à la mise en œuvre d'une VM, nous examinerons l'interface qu'une VM doit mettre en œuvre pour être compatible avec le moteur de consensus AvalancheGo's Nous allons montrer et expliquer tout le code en snippets. Si vous souhaitez voir tout le code en un seul endroit, consultez [ce dépôt.](https://github.com/ava-labs/timestampvm/)

## Interfaces

### `block.ChainVM`

Pour parvenir à un consensus sur les blockchains linéaires \(par opposition aux blockchains DAG\), Avalanche utilise le moteur de consensus de Snowman. Pour être compatible avec Snowman, une VM doit implémenter `block.ChainVM`l'interface, que nous incluons ci-dessous de [sa déclaration.](https://github.com/ava-labs/avalanchego/blob/master/snow/engine/snowman/block/vm.go)

L'interface est grande, mais ne vous inquiétez pas, nous expliquerons chaque méthode et verrons un exemple de mise en œuvre, et il n'est pas important que vous compreniez tout de suite tous les détails.

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

`common.VM`est un type que tous les , `VM`qu'une DAG ou une chaîne linéaire, doivent mettre en œuvre.

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

Vous pouvez avoir remarqué le `snowman.Block`type référencé dans `block.ChainVM`l'interface. Il décrit les méthodes qu'un bloc doit mettre en œuvre pour être un bloc dans une chaîne linéaire \(Snowman\).

Examinons cette interface et ses méthodes, que nous copions [d'ici.](https://github.com/ava-labs/avalanchego/blob/master/snow/consensus/snowman/block.go)

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

Cette interface est le superset de tout objet decidable comme les transactions, les blocs et les sommets.

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

## Bibliothèques d'aide

Nous avons créé certains types que votre implémentation VM peut intégrer \(l'intégration est comme la version d'héritage de Go\) pour gérer le code de la chaudière.

Dans notre exemple, nous utilisons les deux types de bibliothèques ci-dessous, et nous vous encourageons à les utiliser aussi.

### core.SnowmanVM

Ce type d'aide est une structure qui met en œuvre plusieurs des `block.ChainVM`méthodes. Sa mise en œuvre peut être trouvée [ici](https://github.com/ava-labs/avalanchego/blob/master/vms/components/core/snowman_vm.go).

#### Méthodes

Certaines `block.ChainVM`méthodes mises en œuvre par sont `core.SnowmanVM`:

* `ParseBlock`
* `GetBlock`
* `SetPreference`
* `LastAccepted`
* `Shutdown`
* `Bootstrapping`
* `Bootstrapped`
* `Initialize`

Si votre implémentation VM se trouve `core.SnowmanVM`, vous n'avez besoin de mettre en œuvre aucune de ces méthodes parce qu'elles sont déjà mises en œuvre par `core.SnowmanVM`. Vous pouvez annuler ces méthodes héréditaires.

#### Fields

Ce type de type contient plusieurs champs que vous voudrez inclure dans votre implémentation VM. Parmi eux:

* `DB`: la base de données de la blockchain
* `Ctx`: le contexte de runtime de la blockchain
* `preferred`: ID du bloc préféré, qui seront construits sur
* `LastAcceptedID`: ID du bloc le plus récemment accepté
* `ToEngine`: canal utilisé pour envoyer des messages au moteur de consensus en appuyant cette blockchain
* `State`: utilisé pour persister des données telles que des blocs

### core.Block

Ce type d'aide met en œuvre de nombreuses méthodes de `snowman.Block`l'interface.

#### Méthodes

Certaines méthodes `snowman.Block`d'interface mises en œuvre sont :

* `ID`
* `Parent`
* `Accept`
* `Reject`
* `Status`
* `Height`

Les blocs de votre implémentation VM seront probablement annulés `Accept`et de `Reject`sorte que ces méthodes provoquent des changements d'État spécifiques à une application.

#### Fields

`core.Block`a un champ , `VM`qui est une référence à un .`core.SnowmanVM` Cela signifie qu'a `core.Block`a accès à tous les champs et méthodes de ce type.

### rpcchainvm

`rpcchainvm`est une VM spéciale qui s'enroule un `block.ChainVM`et permet à la blockchain enveloppé de fonctionner dans son propre processus séparé is `rpcchainvm`a deux parties importantes : un serveur et un client. Le pilote [`server`](https://github.com/ava-labs/avalanchego/blob/master/vms/rpcchainvm/vm_server.go)le sous-jacent `block.ChainVM`dans son propre processus et permet d'appeler les méthodes de VM sous-jacentes sur gRPC. Le [client](https://github.com/ava-labs/avalanchego/blob/master/vms/rpcchainvm/vm_client.go) s'exécute dans le cadre of et fait des appels gRPC vers le serveur correspondant afin de mettre à jour ou d'interroger l'état de la blockchain.

Pour rendre les choses plus concrètes : supposons that veut récupérer un bloc d'une chaîne de cette façon. AvalancheGo appelle la méthode du client, qui fait un appel au serveur `GetBlock`gRPC, qui est en cours d'exécution dans un processus séparé. Le serveur appelle la `GetBlock`méthode de VM sous-jacente et sert la réponse au client, qui donne à son tour la réponse à AvalancheGo.

Par exemple, examinons la méthode du serveur `BuildBlock`:

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

Il appelle `vm.vm.BuildBlock()`, où `vm.vm`est la mise en œuvre VM sous-jacente et retourne un nouveau block.

## Impression du serveur de Timestamp

Maintenant nous savons l'interface que notre VM doit mettre en œuvre et les bibliothèques que nous pouvons utiliser pour construire une VM.

Écrivons notre VM, qui met en œuvre et dont `block.ChainVM`les blocs mettent en œuvre .`snowman.Block`

### Bloc

Premièrement, examinons notre mise en œuvre de block.

La déclaration de type est :

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

`serialize:"true"`L'étiquette indique que le champ doit être inclus dans la représentation des octets du bloc utilisé lors de la persistance du bloc ou de l'envoyer à d'autres nœuds.

#### Vérifier

Cette méthode vérifie qu'un bloc est valide et l'enregistre dans la base de données.

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

C'est tout le code pour notre mise en œuvre de block! Toutes les autres méthodes de , que notre `Block`devoir mettre en `snowman.Block`œuvre, sont héritées de .`*core.Block`

### Machine virtuelle

Maintenant, examinons notre implémentation de la VM de Timestamp qui met en œuvre `block.ChainVM`l'interface.

La déclaration est :

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

#### Initialiser

Cette méthode est appelée lorsqu'une nouvelle instance de VM est initialisée. Le bloc Genesis est créé en vertu de cette méthode.

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

Cette méthode ajoute un morceau de données au mempool et notifie la couche de consensus de la blockchain sur laquelle un nouveau bloc est prêt à être construit et voté. Ceci est appelé par la méthode API `ProposeBlock`, que nous verrons plus tard.

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

Écrasez un bloc de sa représentation par octets.

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

#### Creater Handling

Les gestionnaires réglés définis dans `Service`. Voir [ci-dessous](create-a-virtual-machine-vm.md#api) pour plus d'informations sur les API.

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

Registres des gestionnaires statiques définis dans `StaticService`. Voir [ci-dessous](create-a-virtual-machine-vm.md#static-api) pour plus d'informations sur les API statiques.

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

### API statique

Un VM peut avoir une API statique, qui permet aux clients d'appeler des méthodes qui ne demandent pas ou mettent à jour l'état d'une blockchain particulier, mais qui s'appliquent plutôt à l'ensemble de la VM. Ceci est analagous pour les méthodes statiques de la programmation d'ordinateur. AvalancheGo utilise [la bibliothèque RPC de Gorilla](https://www.gorillatoolkit.org/pkg/rpc) pour implémenter des API HTTP.

`StaticService`met en œuvre l'API statique pour notre VM.

```go
// StaticService defines the static API for the timestamp vm
type StaticService struct{}
```

#### Encode

Pour chaque méthode d'API, il y a :

* Une structure qui définit les arguments de la méthode
* Une structure qui définit les valeurs de retour de la méthode
* Une méthode qui met en œuvre la méthode de l'API et est paramétré sur les 2 structures ci-dessus.

Cette méthode API code une chaîne à sa représentation d'octets en utilisant un schéma d'encodage donné. Il peut être utilisé pour encoder les données qui sont ensuite mises dans un bloc et proposées comme le prochain bloc pour cette chaîne.

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

Cette méthode API est l'inverse de `Encode`.

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

Un VM peut également avoir un API HTTP non statique, qui permet aux clients de interroger et de mettre à jour l'état de la blockchain.

`Service`La déclaration de 's est :

```go
// Service is the API service for this VM
type Service struct{ vm *VM }
```

Notez que cette structure a une référence à la VM, de sorte qu'elle peut interroger et mettre à jour l'état.

L'API de cette VM a deux méthodes. On permet à un client d'obtenir un bloc par son ID. L'autre permet à un client de proposer le prochain bloc de cette blockchain.

#### timestampvm.getBlock

Obtenez un bloc par son identité. Si aucun ID n'est fourni, obtenez le dernier block.

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

* `id`est l'ID du bloc qui est récupéré. Si omis d'arguments, obtient le dernier bloc
* `data`est la représentation de base 58 \(avec checksum\) de la charge utile de 32 octets du bloc
* `timestamp`est le timestamp Unix lorsque ce bloc a été créé
* `parentID`est le parent du bloc

**Exemple**

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

**Exemple**

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

**Mise en œuvre**

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

Proposer le prochain bloc sur cette blockchain.

**Signature**

```cpp
timestampvm.proposeBlock({data: string}) -> {success: bool}
```

* `data`est la représentation de base 58 \(avec checksum\) de la charge utile de 32 octes du bloc proposé.

**Exemple**

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

**Exemple**

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "Success": true
  },
  "id": 1
}
```

**Mise en œuvre**

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

Afin de rendre ce VM compatible avec , nous devons définir un `main`paquet et une `go-plugin`méthode, qui sert notre VM sur gRPC de sorte this puisse appeler ses méthodes.

`main.go`Le contenu de 's est :

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

Maintenant les AvalancheGo's `rpcchainvm`peuvent se connecter à ce plugin et appelle ses méthodes.

#### VM Alias

Il est possible d'alias VM et leurs paramètres d'API Par exemple, nous pouvons les alias `TimestampVM`en créant un fichier JSON avec `~/.avalanchego/configs/vms/aliases.json`:

```javascript
{
  "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH": [
    "timestampvm",
    "timestamp"
  ]
}
```

Maintenant, l'API statique de cette VM peut être consultée aux points de départ `/ext/vm/timestampvm`et .`/ext/vm/timestamp` Donner un alias à un VM a d'autres implications, comme nous le verrons ci-dessous. Pour plus de détails, voir [ici](../../references/command-line-interface.md#vm-configs).

#### Construire l'exécutable

Ce VM a un [script](https://github.com/ava-labs/timestampvm-rpc/blob/main/scripts/build.sh) de construction qui construit un exécutable de ce VM \(lorsqu'il est invoqué, il exécute la `main`méthode d'en haut.\)

Le chemin vers l'exécutable, ainsi que son nom, peuvent être fournis au script de construction par des arguments. Par exemple:

```text
./scripts/build.sh ../avalanchego/build/avalanchego-latest/plugins timestampvm
```

Si la variable d'environnement n'est pas définie, le chemin est en défaut de modifier `$GOPATH/src/github.com/ava-labs/avalanchego/build/avalanchego-latestplugins/tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH`\( `tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH`est l'ID de cette VM.\)

AvalancheGo recherche et enregistre les plugins sous `[buildDir]/avalanchego-latest/plugins`. Voir [ici](../../references/command-line-interface.md#build-directory) pour plus d'informations.

Les noms exécutables doivent être soit un ID VM complet \(encodé en CB58\), soit être un alias VM défini par les alias VM [Alias](../../references/command-line-interface.md#vm-configs).

Dans ce tutoriel, nous avons utilisé l'ID de la VM comme nom d'exécutable pour simplifier le processus. Cependant, AvalancheGo accepterait `timestampvm`ou `timestamp`car ce sont des alias pour ce VM.

### Empiler

C'est tout ! C'est la mise en œuvre entière d'un VM qui définit un serveur de timestamp basé sur blockchain.

Dans ce tutoriel, nous avons appris :

* `block.ChainVM`L'interface que toutes les VM qui définissent une chaîne linéaire doivent mettre en œuvre
* `snowman.Block`L'interface que tous les blocs qui font partie d'une chaîne linéaire doivent mettre en œuvre
* Les types de `core.Block`bibliothèque et qui rendent la définition `core.SnowmanVM`de VM plus rapide
* Le `rpcchainvm`type, qui permet aux blockchains de fonctionner dans leurs propres processus.

Maintenant nous pouvons créer une nouvelle blockchain avec cette machine virtuelle personnalisée.

{% page-ref page="create-custom-blockchain.md" %}

