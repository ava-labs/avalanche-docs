# Crear una Máquina Virtual (VM)

## Introducción

Una de las características fundamentales de Avalanche es la capacidad de crear blockchains nuevas y personalizadas que están definidas por [máquinas virtuales (VM).](../../../learn/platform-overview/#virtual-machines)

En este tutorial, crearemos una VM muy simple. La blockchain definida por la VM es un [servidor de marca temporal](https://github.com/ava-labs/timestampvm). Cada bloque de la blockchain contiene el timestamp de cuando fue creada, junto con un dato de 32 bytes (carga útil). El timestamp de cada bloque es posterior a la de su predecesor.

Tal servidor es útil porque puede utilizarse para probar que un dato existía en el momento en que se creó el bloque. Supongamos que tienes un manuscrito de un libro, y quieres ser capaz de probar en el futuro que el manuscrito existe hoy. Puedes añadir un bloque a la blockchain donde la carga útil del bloque es un hash de tu manuscrito. A futuro podrás comprobar que el manuscrito existió hoy al mostrar que el bloque tiene el hash de tu manuscrito en su carga útil. (Esto se deriva del hecho de que es imposible encontrar la preimagen de un hash).

También puedes ejecutar una blockchain como un proceso separado de AvalancheGo que puede comunicarse con este a través de gRPC. Esta función la habilita `rpcchainvm`, una VM especial que usa [`go-plugin`](https://pkg.go.dev/github.com/hashicorp/go-plugin) y que envuelve otra implementación de VM. Por ejemplo, la C-Chain ejecuta la VM de [Coreth](https://github.com/ava-labs/coreth) de esta manera.

Antes de llegar a la implementación de la VM, veremos la interfaz que una VM debe implementar para ser compatible con el motor de consenso del motor de AvalancheGo. Mostraremos y explicaremos todo el código en fragmentos. Si quieres ver todo el código en un solo lugar, mira [este repositorio.](https://github.com/ava-labs/timestampvm/)

_Nota: los ID de blockchains, subredes, transacciones y direcciones pueden ser diferentes para cada ejecución o red. Eso significa que algunas entradas, terminales, etc. del tutorial pueden ser diferentes cuando tú lo pruebas._

## Interfaces

### `block.ChainVM`

Para llegar a un consenso sobre las blockchains lineales (a diferencia de las DAG), Avalanche utiliza el Protocolo de Consenso Snowman. Para ser compatible con Snowman, una VM debe implementar la interfaz `block.ChainVM`, la cual incluimos a continuación desde [su declaración](https://github.com/ava-labs/avalanchego/blob/master/snow/engine/snowman/block/vm.go).

La interfaz es grande, pero no te preocupes, te explicaremos cada método y veremos un ejemplo de implementación. No es necesario que entiendas todos los detalles de inmediato.

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

`common.VM`es un tipo que cada `VM`, sea una cadena DAG o lineal, debe implementar.

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

Puede que hayas notado el tipo `snowman.Block`, al que se hace referencia en la interfaz `block.ChainVM`. este describe los métodos que un bloque debe implementar para ser un bloque en una cadena lineal (Snowman)

Veamos esta interfaz y sus métodos, los cuales copiamos de [aquí.](https://github.com/ava-labs/avalanchego/blob/master/snow/consensus/snowman/block.go)

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

Esta interfaz es el superconjunto de cada objeto decidible, tal como transacciones, bloques y vértices.

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

## Bibliotecas de soporte

Hemos creado algunos tipos que tu implementación VM puede integrar (la incrustación es como la versión de la sucesión de Go) para manejar el código de la plantilla.

En nuestro ejemplo, usamos los dos tipos de biblioteca que se muestran a continuación, y te animamos a que los uses también.

### core.SnowmanVM

Este tipo de ayuda es una estructura que implementa muchos de los métodos `block.ChainVM`. Puedes encontrar su implementación [aquí](https://github.com/ava-labs/avalanchego/blob/master/vms/components/core/snowman_vm.go).

#### Métodos

Algunos de los métodos de `block.ChainVM` implementados por `core.SnowmanVM` son:

* `ParseBlock`
* `GetBlock`
* `SetPreference`
* `LastAccepted`
* `Shutdown`
* `Bootstrapping`
* `Bootstrapped`
* `Initialize`

Si tu implementación de VM incorpora `core.SnowmanVM`, no necesitas implementar ninguno de estos métodos porque `core.SnowmanVM` ya los implementa. Si quieres, puedes anular estos métodos que se han heredado.

#### Campos

Este modelo contiene varios campos que querrás incluir en tu implementación de VM. Entre ellos:

* `DB`: base de datos de la blockchain
* `Ctx`: contexto de ejecución de la blockchain
* `preferred`: identificación del bloque preferido, sobre el cual se construirán nuevos bloques
* `LastAcceptedID`: identificación del bloque aceptado más recientemente
* `ToEngine`: canal para enviar mensajes al motor de consenso que alimenta esta blockchain
* `State`: usado para persistir datos como bloques

### core.Block

Este tipo de ayuda implementa muchos métodos de la interfaz `snowman.Block`.

#### Métodos

Algunos de los métodos de interfaz `snowman.Block` implementados son:

* `ID`
* `Parent`
* `Accept`
* `Reject`
* `Status`
* `Height`

Los bloques de tu implementación de VM probablemente anularán `Accept` y `Reject` para que esos métodos hagan cambios de estado específicos de la aplicación.

#### Campos

`core.Block`tiene un campo `VM`, que es una referencia a un `core.SnowmanVM`. Esto significa que un `core.Block` tiene acceso a todos los campos y métodos de ese modelo.

### rpcchainvm

`rpcchainvm` es una VM especial que envuelve a un `block.ChainVM` y permite que la blockchain envuelta ejecute su propio proceso aparte de AvalancheGo. `rpcchainvm` tiene dos partes importantes: un servidor y un cliente. [`server`](https://github.com/ava-labs/avalanchego/blob/master/vms/rpcchainvm/vm_server.go) ejecuta el `block.ChainVM` subyacente en su propio proceso, y hace posible llamar a los métodos subyacentes de la VM a través de gRPC. El [cliente](https://github.com/ava-labs/avalanchego/blob/master/vms/rpcchainvm/vm_client.go) se ejecuta como parte de AvalancheGo y hace llamadas gRPC al servidor correspondiente para actualizar o consultar el estado de la blockchain.

Para hablar más claramente, supongamos que AvalancheGo quiere recuperar un bloque de la ejecución de una cadena de esta manera. AvalancheGo llama al método `GetBlock` del cliente, que hace una llamada gRPC al servidor, el cual se está ejecutando en un proceso separado. El servidor llama al método subyacente de la VM `GetBlock`, y le da la respuesta al cliente, quien a su vez le da la respuesta a AvalancheGo.

Para dar otro ejemplo, veamos el método `BuildBlock` del servidor:

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

Este llama a `vm.vm.BuildBlock()`, donde `vm.vm` es la implementación de la VM subyacente, y genera un nuevo bloque.

## Implementación del Servidor de Timestamp

Ya conocemos la interfaz que nuestra VM debe implementar y las bibliotecas que podemos usar para construir una VM.

Escribamos nuestra VM, la cual implementa `block.ChainVM` y cuyos bloques implementan `snowman.Block`.

### Bloque

Primero, veamos la implementación de nuestro bloque.

El tipo de declaración es:

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

La etiqueta `serialize:"true"` indica que se debe incluir el campo en la representación de bytes del bloque utilizado para persistir el bloque o enviarlo a otros nodos.

#### Verifica

Este método verifica que un bloque es válido y lo guarda en la base de datos.

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

¡Ese es todo el código para la implementación de nuestro bloque! Todos los otros métodos de `snowman.Block` que nuestro `Block` debe implementar se heredan de `*core.Block`.

### Virtual Machine

Veamos la implementación de nuestra VM de marca temporal, la cual implementa la interfaz `block.ChainVM`.

La declaración es:

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

#### Inicializar

Se llama a este método cuando se inicia una nueva instancia de la VM. El bloque génesis se crea bajo este método.

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

#### ProposeBlock

Este método añade un dato al mempool y notifica a la capa de consenso de la blockchain que un nuevo bloque está listo para ser construido y votado. Esto se llama desde el método de API `ProposeBlock` , acerca del cual aprenderemos más adelante.

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

Analiza un bloque de su representación de bytes.

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

Los gestores registrados se definen en `Service`. Mira [abajo](create-a-virtual-machine-vm.md#api) para más información de las API.

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

Registra los gestores estáticos definidos en `StaticService`. Mira [abajo](create-a-virtual-machine-vm.md#static-api) para más información de las API estáticas.

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

### API estática

Una VM puede tener una API estática, la cual permite que los clientes llamen a métodos que no consultan o actualizan el estado de una blockchain particular, sino que se aplican a la VM como un todo. Esto es análogo a los métodos estáticos de la programación de computadoras. AvalancheGo utiliza la [biblioteca RPC de Gorilla](https://www.gorillatoolkit.org/pkg/rpc) para implementar las API de HTTP.

`StaticService` implementa la API estática para nuestra VM.

```go
// StaticService defines the static API for the timestamp vm
type StaticService struct{}
```

#### Codificación

Para cada método API, hay:

* Una struct que define los argumentos del método
* Una struct que define los valores de retorno del método
* Un método que implementa el método de la API y que está parametrizado en las dos structs anteriores

Este método de API codifica una cadena a su representación de bytes mediante un esquema de codificación dado. Puede usarse para codificar datos que luego se colocan en un bloque, y luego se propone como el siguiente bloque para esta cadena.

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

#### Descodificación

Este método de API es lo opuesto de `Encode`.

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

Una VM también puede tener una HTTP API que le permite a los clientes consultar y actualizar el estado de la blockchain.

La declaración de `Service` es:

```go
// Service is the API service for this VM
type Service struct{ vm *VM }
```

Ten en cuenta que esta struct tiene una referencia a la VM, por lo que puede consultar y actualizar el estado.

La API de esta VM tiene dos métodos. Uno permite que un cliente obtenga un bloque por su identificación. El otro permite que un cliente proponga el siguiente bloque de esta blockchain. El ID de la blockchain en la terminal cambia, ya que cada blockchain tiene un ID único. Para más información, consulta [Interacción con la nueva blockchain](create-custom-blockchain.md#interact-with-the-new-blockchain).

#### timestampvm.getBlock

Consigue un bloque por su ID. Si no se proporciona un ID, obtener el último bloque.

**Firma**

```cpp
timestampvm.getBlock({id: string}) ->
    {
        id: string,
        data: string,
        timestamp: int,
        parentID: string
    }
```

* `id` es la identificación del bloque que se está obteniendo. Si se omite en los argumentos, se obtiene el último bloque
* `data` es la base 58 (con suma de comprobación) que representa la carga útil de 32 bytes del bloque.
* `timestamp` es la marca temporal de Unix de cuando este bloque fue creado.
* `parentID`es el padre del bloque.

**Llamada de ejemplo**

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

**Respuesta de ejemplo**

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

**Implementación**

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

Propón el siguiente bloque de esta blockchain.

**Firma**

```cpp
timestampvm.proposeBlock({data: string}) -> {success: bool}
```

* `data` es la base 58 (con suma de comprobación) que representa la carga útil de 32 bytes del bloque.

**Llamada de ejemplo**

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

**Respuesta de ejemplo**

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "Success": true
  },
  "id": 1
}
```

**Implementación**

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

Para hacer esta VM compatible con `go-plugin`, tenemos que definir un paquete `main` y un método para servirle a nuestra VM por gRPC para que AvalancheGo pueda llamar a sus métodos.

Los contenidos de `main.go` son:

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

Ahora, el `rpcchainvm` de AvalancheGo se puede conectar a este plugin y llamar a sus métodos.

#### Alias de la VM

Es posible asignarle un alias a las VM y sus terminales de API. Por ejemplo, podemos asignarle un alias a `TimestampVM` al crear un archivo JSON en `~/.avalanchego/configs/vms/aliases.json` con:

```javascript
{
  "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH": [
    "timestampvm",
    "timestamp"
  ]
}
```

Ahora esta API estática de la VM se puede acceder en las terminales `/ext/vm/timestampvm` y `/ext/vm/timestamp`. Asignarle un alias a la VM tiene otras implicaciones, como veremos abajo. Puedes ver más detalles [aquí](../../references/command-line-interface.md#vm-configs).

#### Construcción del ejecutable

Esta VM tiene un [script](https://github.com/ava-labs/timestampvm-rpc/blob/main/scripts/build.sh) de construcción que crea un ejecutable de esta VM (cuando se invoca, ejecuta el método `main` desde arriba).

Se le puede proporcionar al script de construcción, así como su nombre, la ruta al ejecutable a través de argumentos. Por ejemplo:

```text
./scripts/build.sh ../avalanchego/build/avalanchego-latest/plugins timestampvm
```

Si la variable del entorno no está configurada, la ruta se predetermina como `$GOPATH/src/github.com/ava-labs/avalanchego/build/avalanchego-latestplugins/tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH` ( `tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH`es la identificación de esta VM).

AvalancheGo busca y registra los plugins bajo `[buildDir]/avalanchego-latest/plugins` . Mira [aquí](../../references/command-line-interface.md#build-directory) para más información.

Los nombres ejecutables deben ser una identificación completa de la VM (codificada en CB58) o un alias de la VM definido por [VM Aliases Config](../../references/command-line-interface.md#vm-configs).

En este tutorial, usamos la identificación de la VM como el nombre ejecutable para simplificar el proceso. Sin embargo, AvalancheGo también aceptaría `timestampvm` o `timestamp`, ya que estos son alias para esta VM.

### ¡Concluimos!

¡Eso es todo! Esta es la implementación completa de un VM que define un servidor de timestamp basado en una blockchain.

En este tutorial, aprendimos:

* La interfaz `block.ChainVM`, que todos los VM que definen una cadena lineal deben implementar
* La interfaz `snowman.Block`, que todos los VM que definen una cadena lineal deben implementar
* Los tipos de biblioteca `core.SnowmanVM` y `core.Block`, que permiten definir las VM más rápidamente.
* El tipo `rpcchainvm`, que permite que las blockchains ejecuten sus propios procesos.

Ahora podemos crear una nueva blockchain con esta máquina virtual personalizada.

{% page-ref page="create-custom-blockchain.md" %}

