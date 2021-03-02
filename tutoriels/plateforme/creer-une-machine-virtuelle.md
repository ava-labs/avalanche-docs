---
description: Créer une Machine Virtuelle (VM) sur le réseau d'Avalanche
---

# Créer une Machine Virtuelle \(VM\)

## Note

Le code ci-dessous est légèrement obsolète. Certaines méthodes, interfaces et implémentations sont légèrement différentes de celles de ce tutoriel. Nous allons laisser cela en place car le code actuel est très similaire et ce tutoriel est toujours utile pour démontrer le fonctionnement du modèle de VM d'Avalanche.

### Introduction <a id="introduction"></a>

L'une des principales fonctionnalités du réseau Avalanche est la création de nouvelles blockchains personnalisées, définies par des [machines virtuelles](../../apprendre/presentation-du-systeme/#quest-ce-quune-machine-virtuelle-vm) \(VMs\).

Dans ce didacticiel, nous allons créer une machine virtuelle très simple. La blockchain définie par la machine virtuelle est un serveur d'horodatage. Chaque bloc de la blockchain contient l’horodatage de sa création ainsi qu’un élément de données de 32 octets \(payload\). L’horodatage de chaque bloc est postérieur à l’horodatage de son parent.

Un tel serveur est utile car il peut être utilisé pour prouver qu'une donnée existait au moment de la création du bloc. Par exemple, supposons que vous ayez un manuscrit de livre et que vous souhaitiez pouvoir prouver à l'avenir que le manuscrit existe aujourd'hui. Vous ajoutez un bloc à la blockchain où la charge utile du bloc est un hachage de votre manuscrit. À l'avenir, vous pouvez prouver que le manuscrit existait aujourd'hui en montrant que le bloc, qui a un horodatage d'aujourd'hui, a comme payload le hachage de votre manuscrit. \(Cela découle du fait qu'il est impossible de trouver la pré-image d'un hachage.\)

Avant d’arriver à l'implémentation de la machine virtuelle, nous allons examiner l’interface qu’une machine virtuelle doit implémenter pour être compatible avec le moteur de consensus de ma plateforme Avalanche.

Nous allons montrer et expliquer tout le code qui constitue cette machine virtuelle dans des extraits. Les commentaires en ligne expliquent ce qui se passe dans le code. Au bas de certains extraits, nous expliquons plus en détail certaines parties du code. Si vous souhaitez voir le code à un seul endroit, plutôt que dans des extraits de code, vous pouvez le voir dans notre [Github repositiory](https://github.com/ava-labs/avalanchego/tree/master/vms/timestampvm)[.](https://github.com/ava-labs/avalanchego/tree/master/vms/timestampvm)

### L'interface de `snowman.VM`  <a id="the-snowmanvm-interface"></a>

Pour parvenir à un consensus sur les blockchains linéaires \(par opposition aux blockchains DAG\), Avalanche utilise le moteur de consensus **Snowman** alimenté par Avalanche. La blockchain que nous définissons est linéaire, elle utilisera donc Snowman. Pour être compatible avec Snowman, la machine virtuelle qui définit la blockchain doit implémenter l'interface `snowman.VM,` que nous incluons ci-dessous à partir de sa déclaration dans[`github.com/ava-labs/avalanchego/snow/engine/snowman/vm.go`.](https://github.com/ava-labs/avalanchego/blob/master/snow/engine/snowman/vm.go)

L'interface est grande, mais ne vous inquiétez pas. Nous allons expliquer chaque méthode et voir un exemple d'implémentation, et il n'est pas nécessaire que vous compreniez chaque nuance.

```cpp
// ChainVM defines the methods a Virtual Machine must implement to use the Snowman consensus engine.
//
// A Snowman VM defines the state contained in a linear blockchain,
// the state transition functions that modify the blockchain's state,
// the API exposed by the blockchain, as well as other aspects of the blockchain.
type ChainVM interface {
    // Initialize an instance of the blockchain defined by this VM.
    // [ctx]: Run-time context and metadata about the blockchain.
    //     [ctx.networkID]: The ID of the network this blockchain exists on.
    //     [ctx.chainID]: The unique ID of this blockchain.
    //     [ctx.Log]: Used to log messages
    //     [ctx.NodeID]: The ID of this node.
    // [db]: The database the blockchain persists data to.
    // [genesisBytes]: The byte representation of the genesis state of this blockchain.
    //                 If this VM were an account-based payments system, for example
    //                 `genesisBytes` would probably be a genesis
    //                 transaction that gives coins to some accounts, and this
    //                 transaction would be in the genesis block.
    // [toEngine]: The channel used to send messages to the consensus engine.
    // [fxs]: Feature extensions that attach to this VM.
    // In this release, we do not document feature extensions. You can ignore them.
    Initialize(
        ctx *snow.Context,
        db database.Database,
        genesisBytes []byte,
        toEngine chan<- Message,
        fxs []*Fx,
    ) error

    // Shutdown this blockchain.
    Shutdown()

    // Creates the HTTP handlers for this blockchain's API
    // and specifies the endpoint where they handle traffic.
    //
    // Each handler handles traffic to a specific endpoint.
    // Each endpoint begins with:
    // [Node's address]:[Node's HTTP port]/ext/bc/[blockchain ID]
    // A handler may handle traffic at an *extension* of the above endpoint.
    //
    // The method returns a mapping from an extension to the HTTP handler at that extension.
    //
    // For example, if this VM implements an account-based payments system,
    // CreateHandlers might return this map:
    // "accounts" --> [handler for API calls that pertain to accounts]
    // "transactions" --> [handler for API calls that pertain to transactions]
    //
    // The accounts handler would have endpoint [Node's address]:[Node's HTTP port]/ext/bc/[blockchain ID]/accounts
    // The trasnsactions handler would have endpoint [Node's address]:[Node's HTTP port]/ext/bc/[blockchain ID]/trasnsactions
    //
    // If a handler is mapped to by the empty string, it has no extension.
    // It handles traffic at [Node's address]:[Node's HTTP port]/ext/bc/[blockchain ID]
    CreateHandlers() map[string]*HTTPHandler

    // Attempt to create a new block from pending data in the blockchain's mempool.
    //
    // If there is no new block to be created, returns an error.
    BuildBlock() (snowman.Block, error)

    // Attempt to create a block from its byte representation.
    ParseBlock([]byte) (snowman.Block, error)

    // Attempt to fetch a block by its ID.
    //
    // If the block does not exist, returns an error.
    GetBlock(ids.ID) (snowman.Block, error)

    // Set the preferred block to the one with the specified ID.
    // New blocks will be built atop the preferred block.
    //
    // This should always be a block that has no children known to consensus.
    SetPreference(ids.ID)

    // LastAccepted returns the ID of the last accepted block.
    //
    // If no blocks have been accepted yet, should return the genesis block's ID.
    LastAccepted() ids.ID
}
```

### L'interface de `snowman.Block` <a id="the-snowmanblock-interface"></a>

Vous avez peut-être remarqué le type `snowman.Block` référencé dans l'interface `snowman.VM`. Il décrit les méthodes qu'un bloc doit implémenter pour être un bloc dans une chaîne linéaire \(Snowman\).

Examinons cette interface et ses méthodes, que nous copions depuis [`github.com/ava-labs/avalanchego/snow/consensus/snowman/block.go`.](https://github.com/ava-labs/avalanchego/blob/master/snow/consensus/snowman/block.go) 

```cpp
// Block is a block in a blockchain.
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
    // ID returns this block's unique ID.
    //
    // Typically, a block's ID is a hash of its byte representation.
    // A block should return the same ID upon repeated calls.
    ID() ids.ID

    // Accept this block.
    //
    // This block will be accepted by every correct node in the network.
    Accept()

    // Reject this block.
    //
    // This block will not be accepted by any correct node in the network.
    Reject()

    // Status returns this block's current status.
    //
    // If Accept has been called on n block with this ID, Accepted should be
    // returned. Similarly, if Reject has been called on a block with this
    // ID, Rejected should be returned. If the contents of this block are
    // unknown, then Unknown should be returned. Otherwise, Processing should be
    // returned.
    Status() Status

    // Parent returns this block's parent.
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
}
```

## Bibliothèques

Nous avons créé certains types que votre implémentation de machine virtuelle peut intégrer \(l'intégration est comme la version d'héritage de Go\) afin de gérer le code standard.

Dans notre exemple, nous utilisons les deux types de bibliothèques ci-dessous et nous vous encourageons à les utiliser également.

### core.SnowmanVM

Ce type, une structure, contient des méthodes et des champs communs à toutes les implémentations de l'interface `snowman.ChainVM`.

**Méthodes**

Ce type implémente les méthodes suivantes, qui font partie de l'interface `snowman.ChainVM` :

* `SetPreference`
* `Shutdown`
* `LastAccepted`

Si votre implémentation de machine virtuelle intègre un `core.SnowmanVM`, vous n'avez besoin d'implémenter aucune de ces méthodes car elles sont déjà implémentées par `core.SnowmanVM`. Vous pouvez, si vous le souhaitez, remplacer ces méthodes héritées.

**Champs**

Ce type contient plusieurs champs que vous souhaiterez inclure dans votre implémentation de machine virtuelle. Parmi eux on retrouve :

* `DB`: la base de données de la blockchain.
* `Ctx`: le contexte d'exécution de la blockchain.
* `preferred`: ID du bloc préféré, sur lequel les nouveaux blocs seront construits.
* `lastAccepted`: ID du bloc le plus récemment accepté.
* `toEngine`: le canal par lequel les messages sont envoyés au moteur de consensus alimentant la blockchain.
* `State`: utilisé pour conserver des données telles que des blocs. Peut être utilisé pour mettre / obtenir des octets.

### core.Block

Ce type, une structure, contient des méthodes et des champs communs à toutes les implémentations de l'interface snowman.Block.

**Méthodes**

Ce type implémente les méthodes suivantes, qui font partie de l'interface `snowman.Block`:

* `ID`
* `Parent`
* `Accept`
* `Reject`
* `Status`

Your Virtual Machine implementation will probably override `Accept` and `Reject` so that these methods cause application-specific state changes.

**Fields**

`core.Block` has a field VM, which is a reference to a `core.SnowmanVM`. This means that a `core.Block` has access to all of the fields and methods of that type.

## Implémentation du serveur d'horodatage

Nous connaissons maintenant l'interface que notre machine virtuelle doit implémenter et les bibliothèques que nous pouvons utiliser pour construire une machine virtuelle.

Écrivons notre machine virtuelle, qui implémente`snowman.VM`, et dont les blocs implémentent `snowman.Block`.

### Block

Voyons d'abord notre implémentation de Block.

La déclaration de type est :

```cpp
// Block is a block on the chain.
// Each block contains:
// 1) A piece of data (the block's payload)
// 2) The (unix) timestamp when the block was created
type Block struct {
    *core.Block           `serialize:"true"`
    Data        [32]byte  `serialize:"true"`
    Timestamp   int64     `serialize:"true"`
}
```

La balise `serialize:"true"` indique que lorsqu'un bloc est sérialisé \(lorsqu'il est conservé dans la base de données ou envoyé à d'autres nœuds, par exemple\), le champ avec la balise est inclus dans la représentation sérialisée.

**Vérifiez**

```cpp
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
        return errors.New("error while retrieving block from database")
    }

    // Ensure [b]'s timestamp is after its parent's timestamp.
    if b.Timestamp < time.Unix(parent.Timestamp, 0).Unix() {
        return errors.New("block's timestamp is more than 1 hour ahead of local time")
    }

    // Ensure [b]'s timestamp is not more than an hour 
    // ahead of this node's time
    if b.Timestamp >= time.Now().Add(time.Hour).Unix() {
        return errors.New("block's timestamp is more than 1 hour ahead of local time")
    }

    // Our block inherits VM from *core.Block.
    // It holds the database we read/write, b.VM.DB
    // We persist this block to that database using VM's SaveBlock method.
    b.VM.SaveBlock(b.VM.DB, b)

    // Then we flush the database's contents
    return b.VM.DB.Commit()
}
```

C'est tout pour le code d'implémentation de Block ! Toutes les autres méthodes de`snowman.Block`, que notre `Block` doit implémenté sont héritées de `*core.Block`.

### Machine Virtuelle

Voyons maintenant l'implémentation de VM, qui implémente l'interface `snowman.VM`.

La déclaration est :

```cpp
// This Virtual Machine defines a blockchain that acts as a timestamp server
// Each block contains a piece of data (payload) and the timestamp when it was created
type VM struct {
    core.SnowmanVM

    // codec serializes and de-serializes structs to/from bytes
    codec codec.Codec

    // Proposed pieces of data that haven't been put into a block and proposed yet
    mempool [][32]byte
}
```

**Initialiser**

```cpp
// Initialize this vm
// [ctx] is the execution context
// [db] is this database we read/write
// [toEngine] is used to notify the consensus engine that new blocks are
//   ready to be added to consensus
// The data in the genesis block is [genesisData]
func (vm *VM) Initialize(
    ctx *snow.Context,
    db database.Database,
    genesisData []byte,
    toEngine chan<- common.Message,
    _ []*common.Fx,
) error {
    // First, we initialize the core.SnowmanVM.
    // vm.ParseBlock, which we'll see further on, tells the core.SnowmanVM how to deserialize
    // a block from bytes
    if err := vm.SnowmanVM.Initialize(ctx, db, vm.ParseBlock, toEngine); err != nil {
        ctx.Log.Error("error initializing SnowmanVM: %v", err)
        return err
    }
    // Set vm's codec to a new codec, which we can use to 
    // serialize and deserialize blocks
    vm.codec = codec.NewDefault()

    // If the database is empty, initialize the state of this blockchain
    // using the genesis data
    if !vm.DBInitialized() {
        // Ensure that the genesis bytes are no longer than 32 bytes
        // (the genesis block, like all blocks, holds 32 bytes of data)
        if len(genesisData) > 32 {
            return errors.New("genesis data should be bytes (max length 32)")
        }

        // genesisData is a byte slice (because that's what the snowman.VM interface says)
        // but each block contains an byte array.
        // To make the types match, take the first [dataLen] bytes from genesisData
        // and put them in an array
        var genesisDataArr [dataLen]byte
        copy(genesisDataArr[:], genesisData)

        // Create the genesis block
        // Timestamp of genesis block is 0. It has no parent, so we say the parent's ID is empty.
        // We'll come to the definition of NewBlock later.
        genesisBlock, err := vm.NewBlock(ids.Empty, genesisDataArr, time.Unix(0, 0))
        if err != nil {
            vm.Ctx.Log.Error("error while creating genesis block: %v", err)
            return err
        }

        // Persist the genesis block to the database.
        // Normally, a block is saved to the database when Verify() is called on the block.
        // We don't call Verify on the genesis block, though. (It has no parent so
        // it wouldn't pass verification.)
        // vm.DB is the database, and was set when we initialized the embedded SnowmanVM.
        if err := vm.SaveBlock(vm.DB, genesisBlock); err != nil {
            vm.Ctx.Log.Error("error while saving genesis block: %v", err)
            return err
        }

        // Accept the genesis block.
        // Sets [vm.lastAccepted] and [vm.preferred] to the genesisBlock.
        genesisBlock.Accept()

        // Mark the database as initialized so that in the future when this chain starts
        // it pulls state from the database rather than starting over from genesis
        vm.SetDBInitialized()

        // Flush the database
        if err := vm.DB.Commit(); err != nil {
            vm.Ctx.Log.Error("error while commiting db: %v", err)
            return err
        }
    }
    return nil
}
```

**proposeBlock**

Cette méthode ajoute un élément de données au mempool et informe la couche de consensus de la blockchain qu'un nouveau bloc est prêt à être construit et voté. Nous verrons plus tard où le call se fait.

```cpp
// proposeBlock appends [data] to [p.mempool].
// Then it notifies the consensus engine
// that a new block is ready to be added to consensus
// (namely, a block with data [data])
func (vm *VM) proposeBlock(data [dataLen]byte) {
    vm.mempool = append(vm.mempool, data)
    vm.NotifyBlockReady()
}
```

**ParseBlock**

```cpp
// ParseBlock parses [bytes] to a snowman.Block
// This function is used by the vm's state to unmarshal blocks saved in state
// and by the consensus layer when it receives the byte representation of a block
// from another node
func (vm *VM) ParseBlock(bytes []byte) (snowman.Block, error) {
    // A new empty block
    block := &Block{}

    // Unmarshal the byte repr. of the block into our empty block
    err := vm.codec.Unmarshal(bytes, block)

    // Initialize the block
    // (Block inherits Initialize from its embedded *core.Block)
    block.Initialize(bytes, &vm.SnowmanVM)
    return block, err
}
```

**NewBlock**

```cpp
// NewBlock returns a new Block where:
// - the block's parent has ID [parentID]
// - the block's data is [data]
// - the block's timestamp is [timestamp]
func (vm *VM) NewBlock(parentID ids.ID, data [dataLen]byte, timestamp time.Time) (*Block, error) {
    // Create our new block
    block := &Block{
        Block:     core.NewBlock(parentID),
        Data:      data,
        Timestamp: timestamp.Unix(),
    }

    // Get the byte representation of the block
    blockBytes, err := vm.codec.Marshal(block)
    if err != nil {
        return nil, err
    }

    // Initialize the block by providing it with its byte representation
    // and a reference to SnowmanVM
    block.Initialize(blockBytes, &vm.SnowmanVM)

    return block, nil
}
```

**BuildBlock**

Cette méthode est appelée par la couche de consensus après que la couche d'application lui a dit qu'un nouveau bloc est prêt à être construit \(c'est-à-dire lorsque `vm.NotifyConsensus ()` est appelé\)

```cpp
// BuildBlock returns a block that this VM wants to add to consensus
func (vm *VM) BuildBlock() (snowman.Block, error) {
    // There is no data to put in a new block
    if len(vm.mempool) == 0 { 
        return nil, errors.New("there is no block to propose")
    }

    // Get the value to put in the new block
    value := vm.mempool[0]
    vm.mempool = vm.mempool[1:]

    // Notify consensus engine that there are more pending data for blocks
    // (if that is the case) when done building this block
    if len(vm.mempool) > 0 {
        defer vm.NotifyBlockReady()
    }

    // Build the block
    block, err := vm.NewBlock(vm.Preferred(), value, time.Now())
    if err != nil {
        return nil, err
    }
    return block, nil
}
```

**CreateHandlers**

```cpp
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

### Service

AvalancheGo utilise la bibliothèque [RPC de Gorilla](https://www.gorillatoolkit.org/pkg/rpc). pour implémenter des API. 

En utilisant Gorilla, il existe une structure pour chaque service d'API. Dans le cas de cette blockchain, il n'y a qu'un seul service d'API.

La déclaration de la structure de service est :

```cpp
// Service is the API service for this VM
type Service struct{ vm *VM }
```

Pour chaque méthode API, il y a:  _\*_  Une structure qui définit les arguments de la méthode __\* Une structure qui définit les valeurs de retour de la méthode \* Une méthode qui implémente la méthode API, et est paramétrée sur les 2 structures ci-dessus

**ProposeBlock**

Cette méthode API permet aux clients d'ajouter un bloc à la blockchain .

```cpp
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
    // Parse the data given as argument to bytes
    byteFormatter := formatting.CB58{}
    if err := byteFormatter.FromString(args.Data); err != nil {
        return errBadData
    }
    // Ensure the data is 32 bytes
    dataSlice := byteFormatter.Bytes
    if len(dataSlice) != 32 {
        return errBadData
    }
    // Convert the data from a byte slice to byte array
    var data [dataLen]byte             
    copy(data[:], dataSlice[:dataLen])
    // Invoke proposeBlock to trigger creation of block with this data
    s.vm.proposeBlock(data)
    reply.Success = true
    return nil
}
```

**GetBlock**

Cette méthode API permet aux clients d'obtenir un bloc par son ID.

```cpp
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
    var ID ids.ID
    var err error
    if args.ID == "" {
        ID = s.vm.LastAccepted()
    } else {
        ID, err = ids.FromString(args.ID)
        if err != nil {
            return errors.New("problem parsing ID")
        }
    }

    // Get the block from the database
    blockInterface, err := s.vm.GetBlock(ID)
    if err != nil {
        return errors.New("error getting data from database")
    }

    block, ok := blockInterface.(*Block)
    if !ok { // Should never happen but better to check than to panic
        return errors.New("error getting data from database")
    }

    // Fill out the response with the block's data
    reply.APIBlock.ID = block.ID().String()
    reply.APIBlock.Timestamp = block.Timestamp
    reply.APIBlock.ParentID = block.ParentID().String()
    byteFormatter := formatting.CB58{Bytes: block.Data[:]}
    reply.Data = byteFormatter.String()

    return nil
}
```

### **API**

L'API résultante a les méthodes suivantes:

**timestamp.getBlock**

Obtenez un bloc par son identifiant. Si aucun ID n'est fourni, vous obtenez le dernier bloc.

**Signature**

```cpp
timestamp.getBlock({id: string}) ->
    {
        id: string,
        data: string,
        timestamp: int,
        parentID: string
    }
```

* `id` est l'ID du bloc en cours de récupération. Si omis des arguments, on obtient le dernier bloc
* `data` est la représentation en base 58 \(avec somme de contrôle\) de la charge utile de 32 byte payload
* `timestamp` est l'horodatage Unix lorsque ce bloc a été créé
* `parentID` est le parent du bloc

**Exemple d'appel :**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "timestamp.getBlock",
    "params":{
        "id":"xqQV1jDnCXDxhfnNT7tDBcXeoH2jC3Hh7Pyv4GXE1z1hfup5K"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/timestamp
```

**Exemple de résponse :**

```cpp
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

**timestamp.proposeBlock**

Proposez la création d'un nouveau bloc.

**Signature**

```cpp
timestamp.proposeBlock({data: string}) -> {success: bool}
```

* `data` est la représentation en base 58 \(avec somme de contrôle\) de la charge utile de 32 byte payload du bloc.

**Exemple d'appel :**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "timestamp.proposeBlock",
    "params":{
        "data":"SkB92YpWm4Q2iPnLGCuDPZPgUQMxajqQQuz91oi3xD984f8r"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/timestamp
```

**Exemple de réponse :**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "Success": true
    },
    "id": 1
}
```

## Récapitulatif

C'est tout ! C'est l'implémentation complète d'une machine virtuelle qui définit un serveur d'horodatage basé sur la blockchain.

Dans ce tutoriel, nous avons appris :

* L'interface `snowman.ChainVM`, que toutes les machines virtuelles qui définissent une chaîne linéaire doivent implémenter
* L'interface `snowman.Block`, que tous les blocs faisant partie d'une chaîne linéaire doivent implémenter
* Les types de bibliothèques `core.SnowmanVM` et `core.Block`, qui accélèrent la définition des machines virtuelles

