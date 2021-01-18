# Crea una Virtual Machine \(VM\)

_El código de abajo está ligeramente desactualizado. Algunos métodos, interfaces e implementaciones son ligeramente diferentes a los de este tutorial. Vamos a dejar esto porque el código actual es muy similar, y este tutorial sigue siendo útil para demostrar cómo funciona el modelo VM de Avalanche._

## Introducción

Una de las características principales de Avalanche es la creación de nuevas blockchains personalizadas, que están definidas por [Virtual Machines \(VMs\)](../../../learn/platform-overview/#virtual-machines)

En este tutorial, crearemos una VM muy simple. La blockchain definida por la VM es un servidor de timestamp. Cada bloque de la blockchain contiene el timestamp de cuando fue creada, junto con un dato de 32 bytes \(carga útil\). El timestamp de cada bloque es posterior a la de su predecesor.

Tal servidor es útil porque puede utilizarse para probar que un dato existía en el momento en que se creó el bloque. Supongamos que tienes un manuscrito de un libro, y quieres ser capaz de probar en el futuro que el manuscrito existe hoy. Añades un bloque a la blockchain donde la carga útil del bloque es un hash de tu manuscrito. En el futuro, puede probar que el manuscrito existe hoy, mostrando que el bloque tiene el hash de su manuscrito en su carga. \(esto se deriva del hecho de que encontrar la imagen previa de un hash es imposible\).

Antes de llegar a la implementación de la VM, veremos la interfaz que una VM debe implementar para ser compatible con el motor de consenso de la plataforma Avalanche. Mostraremos y explicaremos todo el código en fragmentos. Si quieres ver el código en un lugar, en lugar de en fragmentos, puedes verlo en nuestro [Repositorio de GitHub.](https://github.com/ava-labs/avalanchego/tree/master/vms/timestampvm)

## La Interfaz `snowman.VM`

Para llegar a un consenso en las blockchains lineales \(a diferencia de las blockchains DAG\), Avalanche utiliza el protocolo de consenso Snowman. Para ser compatible con Snowman, el VM que define la blockchain debe implementar la interfaz`snowman.VM`, que incluimos a continuación de su declaración en[`github.com/ava-labs/avalanchego/blob/master/snow/engine/snowman/block/vm.go`](https://github.com/ava-labs/avalanchego/blob/master/snow/engine/snowman/block/vm.go).

La interfaz es grande, pero no se preocupe, le explicaremos cada método y veremos un ejemplo de implementación. No es necesario que entienda todos los detalles.

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

##  La Interfaz snowman.Block 

Puede que hayas notado `snowman.Block` al que se hace referencia en la interfaz `snowman.VM`. este describe los métodos que un bloque debe implementar para ser un bloque en una cadena lineal \(Snowman\) 

Veamos esta interfaz y sus métodos, los cuales copiamos de [`github.com/ava-labs/avalanchego/snow/consensus/snowman/block.go`.](https://github.com/ava-labs/avalanchego/blob/master/snow/consensus/snowman/block.go)

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

## Bibliotecas


Hemos creado algunos tipos que tu implementación VM puede integrar \(la incrustación es como la versión de la sucesión de Go\) para manejar el código de la plantilla.

En nuestro ejemplo, usamos los dos tipos de biblioteca que se muestran a continuación, y te animamos a que los uses también.

### core.SnowmanVM

Este modelo, una estructura, contiene métodos y campos comunes a todas las implementaciones de la interfaz `snowman.ChainVM` 

#### **Methods**

Este modelo implementa los siguientes métodos, que forman parte de la interfaz `snowman.ChainVM` :

* `SetPreference`
* `Shutdown`
* `LastAccepted`

Si tu implementación de VM incorpora un `core.SnowmanVM`, no necesitas implementar ninguno de estos métodos porque ya están implementados por `core.SnowmanVM`. Si quieres, puedes anular estos métodos que se han heredado.

#### **Campos**

Este modelo contiene varios campos que querrás incluir en tu implementación de VM. Entre ellos:

* `DB`: la base de datos de la blockchain
* `Ctx`: el contexto de ejecución de la blockchain
* `preferred`: ID del bloque preferido, sobre el cual se construirán nuevos bloques
* `lastAccepted`: ID del bloque más recientemente aceptado
* `toEngine`: el canal donde se envían los mensajes al protocolo de consenso que alimenta la blockchain
* `State`: usado para persistir datos como bloques \(puede ser usado para poner/obtener cualquier byte\)

### core.Block

Este modelo, una estructura, contiene métodos y campos comunes a todas las implementaciones de la interfaz `snowman.Block`.

#### **Métodos**

Este modelo implementa los siguientes métodos, que forman parte de la interfaz `snowman.Block`:

* `ID`
* `Parent`
* `Accept`
* `Reject`
* `Status`

Su implementación VM probablemente anulará `Accept` y `Reject` para que estos métodos causen cambios de estado específicos de la aplicación.

#### **Campos**

`core.Block` tiene un campo VM, que es una referencia a `core.SnowmanVM`. Esto significa que un `core.Block` tiene acceso a todos los campos y métodos de ese modelo.

## Implementación del Servidor de Timestamp


Ahora, sabemos la interfaz que nuestra VM debe implementar y las bibliotecas que podemos usar para construir una VM.

Escribamos nuestra VM, que implementa `snowman.VM` y cuyos bloques implementan `snowman.Block`.

### Bloque


Primero, veamos la implementación de nuestro bloque.

El tipo de declaración es:

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

La etiqueta "serialize: "true"` indica cuando un bloque persiste en la base de datos o se envía a otros nodos. El campo con la etiqueta se incluye en la representación serializada.

#### **Verifica**

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

¡Ese es todo el código para la implementación de nuestro bloque! Todos los demás métodos de `snowman.Block`que nuestro "bloque" debe implementar, son heredados de `*core.Block`.

### Virtual Machine


Ahora, veamos la implementación de VM, la cual implementa la interfaz `snowman.VM`.

La declaración es:

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

#### **Inicializar**

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

#### **proposeBlock**

Este método añade un dato al mempool y notifica a la capa de consenso de la blockchain que un nuevo bloque está listo para ser construido y votado. Veremos dónde se ejecuta esto más tarde.

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

#### **ParseBlock**

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

#### **NewBlock**

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

#### **BuildBlock**

This method is called by the consensus layer after the application layer tells it that a new block is ready to be built \(i.e., when `vm.NotifyConsensus()` is called\).

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

#### **CreateHandlers**

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

AvalancheGo usa la [Librería RPC de Gorilla](https://www.gorillatoolkit.org/pkg/rpc) para implementar APIs.

Usando Gorilla, hay una estructura para cada servicio API. En el caso de esta blockchain, sólo hay un servicio de API.

The service struct’s declaration is:

```cpp
// Service is the API service for this VM
type Service struct{ vm *VM }
```

Para cada método API, hay: \* Una estructura que define los argumentos del método. \* Una estructura que define los valores de retorno del método. \* Un método que implementa el método de la API, y está parametrizado en las dos estructuras anteriores.

#### **ProposeBlock**

Este método de la API permite que los clientes añadan un bloque a la blockchain.

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

#### **GetBlock**

Este método de la API permite a los clientes obtener un bloque por su ID.

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

#### **API**

El API resultante tiene los siguientes métodos:

**timestamp.getBlock**

Consigue un bloque por su ID. Si no se proporciona un ID, obtener el último bloque.

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

* `id` es la ID del bloque que se está recuperando. Si se omite en los argumentos, se obtiene el último bloque
* `data` es la base 58 \(con suma de comprobación\)  que representa la carga útil de 32 bytes del bloque.
* `timestamp` es el timestamp de Unix de cuando este bloque fue creado
* `parentID` es el padre del bloque

**Example Call**

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

**Example Response**

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

Propone la creación de un nuevo bloque.

**Signature**

```cpp
timestamp.proposeBlock({data: string}) -> {success: bool}
```

* `data` is the base 58 \(with checksum\) representation of the proposed block’s 32 byte payload.

**Example Call**

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

**Example Response**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "Success": true
    },
    "id": 1
}
```

### Wrapping Up

That’s it! That’s the entire implementation of a VM which defines a blockchain-based timestamp server.

In this tutorial, we learned:

* The `snowman.ChainVM` interface, which all VMs that define a linear chain must implement
* The `snowman.Block` interface, which all blocks that are part of a linear chain must implement
* The `core.SnowmanVM` and `core.Block` library types, which make defining VMs faster

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTM1MDAzOTIzNCwxNDg2MTM1MDg5XX0=
-->