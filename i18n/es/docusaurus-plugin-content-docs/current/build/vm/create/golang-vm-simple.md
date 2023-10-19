---
tags: [Construir, Máquinas Virtuales]
description: Aprende cómo construir una máquina virtual simple en Avalanche usando Golang.
sidebar_label: VM Golang Simple
pagination_label: Construir una VM Golang Simple
sidebar_position: 1
---

# Cómo Construir una VM Golang Simple

En este tutorial, crearemos una VM muy simple llamada la
[TimestampVM](https://github.com/ava-labs/timestampvm/tree/v1.2.1). Cada bloque en la blockchain de la
TimestampVM contiene una marca de tiempo estrictamente creciente cuando se creó el bloque y una carga
de datos de 32 bytes.

Un servidor así es útil porque se puede usar para probar que un dato existía en el momento en que se
creó el bloque. Supongamos que tienes un manuscrito de un libro y quieres poder probar en el
futuro que el manuscrito existe hoy en día. Puedes agregar un bloque a la blockchain donde la carga
del bloque es un hash de tu manuscrito. En el futuro, puedes probar que el manuscrito existía hoy
mostrando que el bloque tiene el hash de tu manuscrito en su carga (esto se sigue del hecho de que
encontrar la pre-imagen de un hash es imposible).

## Implementación de la TimestampVM

Ahora sabemos la interfaz que nuestra VM debe implementar y las bibliotecas que podemos usar para
construir una VM.

Escribamos nuestra VM, que implementa `block.ChainVM` y cuyos bloques implementan `snowman.Block`. También
puedes seguir el código en el [repositorio de la TimestampVM
](https://github.com/ava-labs/timestampvm/tree/main).

### Codec

`Codec` es necesario para codificar/decodificar el bloque en representación de bytes. La TimestampVM
utiliza el codec y el gestor por defecto.

```go title="/timestampvm/codec.go"
const (
	// CodecVersion es la versión de codec por defecto actual
	CodecVersion = 0
)

// Codecs hacen la serialización y deserialización
var (
	Codec codec.Manager
)

func init() {
	// Crear codec y gestor por defecto
	c := linearcodec.NewDefault()
	Codec = codec.NewDefaultManager()

	// Registrar codec en el gestor con CodecVersion
	if err := Codec.RegisterCodec(CodecVersion, c); err != nil {
		panic(err)
	}
}
```

### Estado

La interfaz `State` define la capa de base de datos y las conexiones. Cada VM debe definir sus propios
métodos de base de datos. `State` incrusta el `BlockState` que define las operaciones de estado relacionadas con los bloques.

```go title="/timestampvm/state.go"
var (
	// Estos son prefijos para las claves de la base de datos.
	// Es importante establecer prefijos diferentes para cada objeto de base de datos separado.
	singletonStatePrefix = []byte("singleton")
	blockStatePrefix     = []byte("block")

	_ State = &state{}
)

// State es un envoltorio alrededor de avax.SingleTonState y BlockState
// State también expone algunos métodos necesarios para gestionar las confirmaciones de la base de datos y el cierre.
type State interface {
	// SingletonState está definido en avalanchego,
	// se utiliza para entender si la base de datos está inicializada o no.
	avax.SingletonState
	BlockState

	Commit() error
	Close() error
}

type state struct {
	avax.SingletonState
	BlockState

	baseDB *versiondb.Database
}

func NewState(db database.Database, vm *VM) State {
	// crear una nueva base de datos baseDB
	baseDB := versiondb.New(db)

	// crear un "blockDB" prefijado a partir de baseDB
	blockDB := prefixdb.New(blockStatePrefix, baseDB)
	// crear un "singletonDB" prefijado a partir de baseDB
	singletonDB := prefixdb.New(singletonStatePrefix, baseDB)

	// devolver el estado con los componentes de estado subcreados
	return &state{
		BlockState:     NewBlockState(blockDB, vm),
		SingletonState: avax.NewSingletonState(singletonDB),
		baseDB:         baseDB,
	}
}

// Commit confirma las operaciones pendientes en baseDB
func (s *state) Commit() error {
	return s.baseDB.Commit()
}

// Close cierra la base de datos base subyacente
func (s *state) Close() error {
	return s.baseDB.Close()
}
```

#### Estado de Bloque

Esta interfaz e implementación proporciona funciones de almacenamiento a la VM para almacenar y recuperar bloques.

```go title="/timestampvm/block_state.go"
const (
	lastAcceptedByte byte = iota
)

const (
	// capacidad máxima de bloque de la caché
	blockCacheSize = 8192
)

// persiste los IDs de bloque lastAccepted con esta clave
var lastAcceptedKey = []byte{lastAcceptedByte}

var _ BlockState = &blockState{}

// BlockState define métodos para gestionar el estado con Bloques e IDs LastAccepted.
type BlockState interface {
	GetBlock(blkID ids.ID) (*Block, error)
	PutBlock(blk *Block) error

	GetLastAccepted() (ids.ID, error)
	SetLastAccepted(ids.ID) error
}

// blockState implementa la interfaz BlocksState con base de datos y caché.
type blockState struct {
	// caché para almacenar bloques
	blkCache cache.Cacher
	// base de datos de bloques
	blockDB      database.Database
	lastAccepted ids.ID

	// referencia a la VM
	vm *VM
}

// blkWrapper envuelve los bytes de blk reales y el estado para persistirlos juntos
type blkWrapper struct {
	Blk    []byte         `serialize:"true"`
	Status choices.Status `serialize:"true"`
}

// NewBlockState devuelve BlockState con una nueva caché y la base de datos dada
func NewBlockState(db database.Database, vm *VM) BlockState {
	return &blockState{
		blkCache: &cache.LRU{Size: blockCacheSize},
		blockDB:  db,
		vm:       vm,
	}
}

// GetBlock obtiene el Bloque tanto de la caché como de la base de datos
func (s *blockState) GetBlock(blkID ids.ID) (*Block, error) {
	// Comprobar si la caché tiene este blkID
	if blkIntf, cached := s.blkCache.Get(blkID); cached {
		// hay una clave pero el valor es nulo, así que devuelve un error
		if blkIntf == nil {
			return nil, database.ErrNotFound
		}
		// Lo encontramos, devuelve el bloque en la caché
		return blkIntf.(*Block), nil
	}

	// obtener los bytes del bloque de la base de datos con la clave blkID
	wrappedBytes, err := s.blockDB.Get(blkID[:])
	if err != nil {
		// no pudimos encontrarlo en la base de datos, vamos a cachear este blkID con valor nulo
		// así que la próxima vez que intentemos buscar la misma clave podemos devolver un error
		// sin acceder a la base de datos
		if err == database.ErrNotFound {
			s.blkCache.Put(blkID, nil)
		}
		// no se pudo encontrar el bloque, devuelve el error
		return nil, err
	}

	// primero decodificar/deserializar el envoltorio de bloque para que podamos tener el estado y los bytes del bloque
	blkw := blkWrapper{}
	if _, err := Codec.Unmarshal(wrappedBytes, &blkw); err != nil {
		return nil, err
	}

	// ahora decodificar/deserializar los bytes reales del bloque al bloque
	blk := &Block{}
	if _, err := Codec.Unmarshal(blkw.Blk, blk); err != nil {
		return nil, err
	}

	// inicializar el bloque con los bytes del bloque, el estado y la vm
	blk.Initialize(blkw.Blk, blkw.Status, s.vm)

	// poner el bloque en la caché
	s.blkCache.Put(blkID, blk)

	return blk, nil
}

// PutBlock pone el bloque tanto en la base de datos como en la caché
func (s *blockState) PutBlock(blk *Block) error {
	// crear un envoltorio de bloque con los bytes del bloque y el estado
	blkw := blkWrapper{
		Blk:    blk.Bytes(),
		Status: blk.Status(),
	}



### Block

Vamos a ver nuestra implementación de bloque.

La declaración de tipo es:

```go title="/timestampvm/block.go"
// Block es un bloque en la cadena.
// Cada bloque contiene:
// 1) ParentID
// 2) Altura
// 3) Marca de tiempo
// 4) Un trozo de datos (una cadena)
type Block struct {
	PrntID ids.ID        `serialize:"true" json:"parentID"`  // ID del padre
	Hght   uint64        `serialize:"true" json:"height"`    // Altura de este bloque. El bloque génesis está en altura 0.
	Tmstmp int64         `serialize:"true" json:"timestamp"` // Tiempo en que se propuso este bloque
	Dt     [dataLen]byte `serialize:"true" json:"data"`      // Datos arbitrarios

	id     ids.ID         // guardar el ID de este bloque
	bytes  []byte         // bytes codificados de este bloque
	status choices.Status // estado del bloque
	vm     *VM            // referencia a la VM subyacente, principalmente utilizada para el estado
}
```

La etiqueta `serialize:"true"` indica que el campo debe incluirse en la representación de bytes del bloque
utilizada al persistir el bloque o enviarlo a otros nodos.

#### Verify

Este método verifica que un bloque sea válido y lo almacena en la memoria. Es importante almacenar los
bloques verificados en la memoria y devolverlos en el método `vm.GetBlock`.

```go title="/timestampvm/block.go"
// Verify devuelve nil si y solo si este bloque es válido.
// Para ser válido, debe ser que:
// b.parent.Timestamp < b.Timestamp <= [hora local] + 1 hora
func (b *Block) Verify() error {
	// Obtener el padre de [b]
	parentID := b.Parent()
	parent, err := b.vm.getBlock(parentID)
	if err != nil {
		return errDatabaseGet
	}

	// Asegurarse de que la altura de [b] venga justo después de la altura de su padre
	if expectedHeight := parent.Height() + 1; expectedHeight != b.Hght {
		return fmt.Errorf(
			"se esperaba que el bloque tuviera altura %d, pero se encontró %d",
			expectedHeight,
			b.Hght,
		)
	}

	// Asegurarse de que la marca de tiempo de [b] sea posterior a la marca de tiempo de su padre.
	if b.Timestamp().Unix() < parent.Timestamp().Unix() {
		return errTimestampTooEarly
	}

	// Asegurarse de que la marca de tiempo de [b] no sea más de una hora
	// adelante del tiempo de este nodo
	if b.Timestamp().Unix() >= time.Now().Add(time.Hour).Unix() {
		return errTimestampTooLate
	}

	// Colocar ese bloque en bloques verificados en memoria
	b.vm.verifiedBlocks[b.ID()] = b

	return nil
}
```

#### Accept

`Accept` es llamado por el consenso para indicar que este bloque es aceptado.

```go title="/timestampvm/block.go"
// Accept establece el estado de este bloque como Aceptado y establece lastAccepted en el ID de este
// bloque y guarda esta información en b.vm.DB
func (b *Block) Accept() error {
	b.SetStatus(choices.Accepted) // Cambiar estado de este bloque
	blkID := b.ID()

	// Persistir datos
	if err := b.vm.state.PutBlock(b); err != nil {
		return err
	}

	// Establecer el último ID aceptado en el ID de este bloque
	if err := b.vm.state.SetLastAccepted(blkID); err != nil {
		return err
	}

	// Eliminar este bloque de los bloques verificados ya que es aceptado
	delete(b.vm.verifiedBlocks, b.ID())

	// Confirmar cambios en la base de datos
	return b.vm.state.Commit()
}
```

#### Reject

`Reject` es llamado por el consenso para indicar que este bloque es rechazado.

```go title="/timestampvm/block.go"
// Reject establece el estado de este bloque como Rechazado y guarda el estado en la base de datos
// Recuerde que se debe llamar a b.vm.DB.Commit() para persistir en la base de datos
func (b *Block) Reject() error {
	b.SetStatus(choices.Rejected) // Cambiar estado de este bloque
	if err := b.vm.state.PutBlock(b); err != nil {
		return err
	}
	// Eliminar este bloque de los bloques verificados ya que es rechazado
	delete(b.vm.verifiedBlocks, b.ID())
	// Confirmar cambios en la base de datos
	return b.vm.state.Commit()
}
```

#### Métodos de Campo del Bloque

Estos métodos son requeridos por la interfaz `snowman.Block`.

```go title="/timestampvm/block.go"
// ID devuelve el ID de este bloque
func (b *Block) ID() ids.ID { return b.id }

// ParentID devuelve el ID del padre de [b]
func (b *Block) Parent() ids.ID { return b.PrntID }

// Height devuelve la altura de este bloque. El bloque génesis tiene altura 0.
func (b *Block) Height() uint64 { return b.Hght }

// Timestamp devuelve el tiempo de este bloque. El bloque génesis tiene tiempo 0.
func (b *Block) Timestamp() time.Time { return time.Unix(b.Tmstmp, 0) }

// Status devuelve el estado de este bloque
func (b *Block) Status() choices.Status { return b.status }

// Bytes devuelve la representación de bytes de este bloque
func (b *Block) Bytes() []byte { return b.bytes }
```

#### Funciones Auxiliares

Estos métodos son métodos de conveniencia para los bloques, no son parte de la interfaz del bloque.

```go title="/timestampvm/vm.go"
// BuildBlock builds a new block and returns it
// The new block contains the data from the mempool
// and has the preferred block as its parent
func (vm *VM) BuildBlock() (snowman.Block, error) {
	// Get the preferred block
	preferred, err := vm.state.GetBlock(vm.preferred)
	if err != nil {
		return nil, err
	}

	// Get the timestamp for the new block
	timestamp := vm.ctx.Time().Unix()

	// Get the data from the mempool
	data := vm.mempool[0]

	// Create a new block with the preferred block as its parent
	block, err := vm.NewBlock(preferred.ID(), timestamp, data, vm.ctx.Time())
	if err != nil {
		return nil, err
	}

	// Remove the data from the mempool
	vm.mempool = vm.mempool[1:]

	return block, nil
}
```

#### ParseBlock

`ParseBlock` parses a block from its byte representation and returns it.

```go title="/timestampvm/vm.go"
// ParseBlock takes a byte representation of a block and returns the block
func (vm *VM) ParseBlock(bytes []byte) (snowman.Block, error) {
	block := &Block{}
	if err := block.Unmarshal(bytes); err != nil {
		return nil, err
	}
	return block, nil
}
```

#### GetBlock

`GetBlock` retrieves a block by its ID.

```go title="/timestampvm/vm.go"
// GetBlock retrieves a block by its ID
func (vm *VM) GetBlock(id ids.ID) (snowman.Block, error) {
	return vm.state.GetBlock(id)
}
```

#### SetPreference

`SetPreference` sets the preferred block.

```go title="/timestampvm/vm.go"
// SetPreference sets the preferred block
func (vm *VM) SetPreference(id ids.ID) error {
	vm.preferred = id
	return nil
}
```

#### LastAccepted

`LastAccepted` returns the ID of the last accepted block.

```go title="/timestampvm/vm.go"
// LastAccepted returns the ID of the last accepted block
func (vm *VM) LastAccepted() (ids.ID, error) {
	return vm.state.GetLastAccepted()
}
```

#### Bootstrapping

`Bootstrapping` returns true if the VM is currently bootstrapping.

```go title="/timestampvm/vm.go"
// Bootstrapping returns true if the VM is currently bootstrapping
func (vm *VM) Bootstrapping() bool {
	return false
}
```

#### Bootstrapped

`Bootstrapped` returns true if the VM has finished bootstrapping.

```go title="/timestampvm/vm.go"
// Bootstrapped returns true if the VM has finished bootstrapping
func (vm *VM) Bootstrapped() bool {
	return true
}
```

#### Shutdown

`Shutdown` shuts down the VM.

```go title="/timestampvm/vm.go"
// Shutdown shuts down the VM
func (vm *VM) Shutdown() error {
	return nil
}
```

#### NotifyBlockReady

`NotifyBlockReady` notifies the consensus engine that a new block is ready to be added to consensus.

```go title="/timestampvm/vm.go"
// NotifyBlockReady notifies the consensus engine that a new block is ready to be added to consensus
func (vm *VM) NotifyBlockReady() {
	vm.toEngine <- common.PendingTxs
}
```

#### NotifyBlockReady

`NotifyBlockReady` notifies the consensus engine that a new block is ready to be added to consensus.

```go title="/timestampvm/vm.go"
// NotifyBlockReady notifies the consensus engine that a new block is ready to be added to consensus
func (vm *VM) NotifyBlockReady() {
	vm.toEngine <- common.PendingTxs
}
```

#### GetTimestamp

`GetTimestamp` returns the timestamp of a block.

```go title="/timestampvm/vm.go"
// GetTimestamp returns the timestamp of a block
func (vm *VM) GetTimestamp(block snowman.Block) (int64, error) {
	timestampBlock, ok := block.(*Block)
	if !ok {
		return 0, fmt.Errorf("block is not a timestamp block")
	}
	return timestampBlock.Timestamp(), nil
}
```

#### GetBlockData

`GetBlockData` returns the data of a block.

```go title="/timestampvm/vm.go"
// GetBlockData returns the data of a block
func (vm *VM) GetBlockData(block snowman.Block) ([]byte, error) {
	dataBlock, ok := block.(*Block)
	if !ok {
		return nil, fmt.Errorf("block is not a data block")
	}
	return dataBlock.Data(), nil
}
```

#### GetBlockStatus

`GetBlockStatus` returns the status of a block.

```go title="/timestampvm/vm.go"
// GetBlockStatus returns the status of a block
func (vm *VM) GetBlockStatus(block snowman.Block) (choices.Status, error) {
	statusBlock, ok := block.(*Block)
	if !ok {
		return choices.Unknown, fmt.Errorf("block is not a status block")
	}
	return statusBlock.Status(), nil
}
```

#### GetBlockVM

`GetBlockVM` returns the VM of a block.

```go title="/timestampvm/vm.go"
// GetBlockVM returns the VM of a block
func (vm *VM) GetBlockVM(block snowman.Block) (snowman.VM, error) {
	return vm, nil
}
```

#### GetBlockBytes

`GetBlockBytes` returns the byte representation of a block.

```go title="/timestampvm/vm.go"
// GetBlockBytes returns the byte representation of a block
func (vm *VM) GetBlockBytes(block snowman.Block) ([]byte, error) {
	return block.Marshal()
}
```

#### GetBlockID

`GetBlockID` returns the ID of a block.

```go title="/timestampvm/vm.go"
// GetBlockID returns the ID of a block
func (vm *VM) GetBlockID(block snowman.Block) (ids.ID, error) {
	return block.ID(), nil
}
```

#### GetBlockParentID

`GetBlockParentID` returns the parent ID of a block.

```go title="/timestampvm/vm.go"
// GetBlockParentID returns the parent ID of a block
func (vm *VM) GetBlockParentID(block snowman.Block) (ids.ID, error) {
	return block.ParentID(), nil
}
```

#### GetBlockHeight

`GetBlockHeight` returns the height of a block.

```go title="/timestampvm/vm.go"
// GetBlockHeight returns the height of a block
func (vm *VM) GetBlockHeight(block snowman.Block) (int64, error) {
	return block.Height(), nil
}
```

#### GetBlockTxs

`GetBlockTxs` returns the transactions of a block.

```go title="/timestampvm/vm.go"
// GetBlockTxs returns the transactions of a block
func (vm *VM) GetBlockTxs(block snowman.Block) ([]snowman.Tx, error) {
	return nil, nil
}
```

#### GetBlockTx

`GetBlockTx` returns a transaction from a block by its ID.

```go title="/timestampvm/vm.go"
// GetBlockTx returns a transaction from a block by its ID
func (vm *VM) GetBlockTx(block snowman.Block, txID ids.ID) (snowman.Tx, error) {
	return nil, nil
}
```

#### GetTxStatus

`GetTxStatus` returns the status of a transaction.

```go title="/timestampvm/vm.go"
// GetTxStatus returns the status of a transaction
func (vm *VM) GetTxStatus(tx snowman.Tx) (choices.Status, error) {
	return choices.Unknown, nil
}
```

#### GetTxBytes

`GetTxBytes` returns the byte representation of a transaction.

```go title="/timestampvm/vm.go"
// GetTxBytes returns the byte representation of a transaction
func (vm *VM) GetTxBytes(tx snowman.Tx) ([]byte, error) {
	return nil, nil
}
```

#### GetTxID

`GetTxID` returns the ID of a transaction.

```go title="/timestampvm/vm.go"
// GetTxID returns the ID of a transaction
func (vm *VM) GetTxID(tx snowman.Tx) (ids.ID, error) {
	return tx.ID(), nil
}
```

#### GetTxTimestamp

`GetTxTimestamp` returns the timestamp of a transaction.

```go title="/timestampvm/vm.go"
// GetTxTimestamp returns the timestamp of a transaction
func (vm *VM) GetTxTimestamp(tx snowman.Tx) (int64, error) {
	return 0, nil
}
```

#### GetTxBlockID

`GetTxBlockID` returns the ID of the block containing a transaction.

```go title="/timestampvm/vm.go"
// GetTxBlockID returns the ID of the block containing a transaction
func (vm *VM) GetTxBlockID(tx snowman.Tx) (ids.ID, error) {
	return ids.Empty, nil
}
```

#### GetTxBlockHeight

`GetTxBlockHeight` returns the height of the block containing a transaction.

```go title="/timestampvm/vm.go"
// GetTxBlockHeight returns the height of the block containing a transaction
func (vm *VM) GetTxBlockHeight(tx snowman.Tx) (int64, error) {
	return 0, nil
}
```

#### GetTxBlockIndex

`GetTxBlockIndex` returns the index of a transaction in its block.

```go title="/timestampvm/vm.go"
// GetTxBlockIndex returns the index of a transaction in its block
func (vm *VM) GetTxBlockIndex(tx snowman.Tx) (int64, error) {
	return 0, nil
}
```

#### GetTxInputs

`GetTxInputs` returns the inputs of a transaction.

```go title="/timestampvm/vm.go"
// GetTxInputs returns the inputs of a transaction
func (vm *VM) GetTxInputs(tx snowman.Tx) ([]snowman.Input, error) {
	return nil, nil
}
```

#### GetTxOutputs

`GetTxOutputs` returns the outputs of a transaction.

```go title="/timestampvm/vm.go"
// GetTxOutputs returns the outputs of a transaction
func (vm *VM) GetTxOutputs(tx snowman.Tx) ([]snowman.Output, error) {
	return nil, nil
}
```

#### GetTxInputUTXOs

`GetTxInputUTXOs` returns the UTXOs spent by the inputs of a transaction.

```go title="/timestampvm/vm.go"
// GetTxInputUTXOs returns the UTXOs spent by the inputs of a transaction
func (vm *VM) GetTxInputUTXOs(tx snowman.Tx) ([]ids.ID, error) {
	return nil, nil
}
```

#### GetTxOutputUTXOs

`GetTxOutputUTXOs` returns the UTXOs created by the outputs of a transaction.

```go title="/timestampvm/vm.go"
// GetTxOutputUTXOs returns the UTXOs created by the outputs of a transaction
func (vm *VM) GetTxOutputUTXOs(tx snowman.Tx) ([]ids.ID, error) {
	return nil, nil
}
```

#### GetUTXO

`GetUTXO` retrieves a UTXO by its ID.

```go title="/timestampvm/vm.go"
// GetUTXO retrieves a UTXO by

```go title="/timestampvm/factory.go"
package timestampvm

import (
	"fmt"

	"github.com/ava-labs/avalanchego/vms"
	"github.com/ava-labs/avalanchego/vms/components/verify"
)

// Factory ...
type Factory struct{}

// New ...
func (f *Factory) New(*snow.Context) (interface{}, error) {
	return &VM{}, nil
}

// Codec ...
func (f *Factory) Codec() (codec codec.Manager) {
	return &verify.Codec{}
}

// Initialize ...
func (f *Factory) Initialize(*snow.Context, *snow.Parameters, interface{}) error {
	return nil
}

// Version ...
func (f *Factory) Version() (string, error) {
	return Version.String(), nil
}

// CreateStatic ...
func (f *Factory) CreateStatic(ctx *snow.Context, db database.Database) (interface{}, error) {
	vm := &VM{}
	err := vm.Initialize(ctx, db)
	return vm, err
}

// Create ...
func (f *Factory) Create(ctx *snow.Context, db database.Database) (interface{}, error) {
	vm := &VM{}
	err := vm.Initialize(ctx, db)
	return vm, err
}

// Bootstrapping ...
func (f *Factory) Bootstrapping() error { return nil }

// Bootstrapped ...
func (f *Factory) Bootstrapped() error { return nil }

// Shutdown ...
func (f *Factory) Shutdown() error { return nil }

// Notify ...
func (f *Factory) Notify(msg common.Message) error {
	return fmt.Errorf("dropping message %s", msg)
}
```

#### Codec

`Codec` returns the codec manager for the VM.

```go title="/timestampvm/factory.go"
// Codec ...
func (f *Factory) Codec() (codec codec.Manager) {
	return &verify.Codec{}
}
```

// Fábrica ...
type Fábrica struct{}

// Nuevo ...
func (f *Fábrica) Nuevo(*snow.Context) (interface{}, error) { return &VM{}, nil }
```

### API Estática

Una VM puede tener una API estática, que permite a los clientes llamar a métodos que no consultan ni actualizan el estado de una blockchain en particular, sino que se aplican a la VM en su conjunto. Esto es análogo a los métodos estáticos en la programación de computadoras. AvalancheGo utiliza la biblioteca de RPC de [Gorilla](https://www.gorillatoolkit.org/pkg/rpc) para implementar APIs HTTP.

`StaticService` implementa la API estática para nuestra VM.

```go title="/timestampvm/static_service.go"
// StaticService define la API estática para la vm de timestamp
type StaticService struct{}
```

#### Encode

Para cada método de la API, hay:

- Una estructura que define los argumentos del método
- Una estructura que define los valores de retorno del método
- Un método que implementa el método de la API, y está parametrizado en las 2 estructuras anteriores

Este método de la API codifica una cadena a su representación en bytes utilizando un esquema de codificación dado. Se puede utilizar para codificar datos que luego se colocan en un bloque y se proponen como el siguiente bloque para esta cadena.

```go title="/timestampvm/static_service.go"
// EncodeArgs son los argumentos para Encode
type EncodeArgs struct {
    Data     string              `json:"data"`
    Encoding formatting.Encoding `json:"encoding"`
    Length   int32               `json:"length"`
}

// EncodeReply es la respuesta de Encoder
type EncodeReply struct {
    Bytes    string              `json:"bytes"`
    Encoding formatting.Encoding `json:"encoding"`
}

// Encoder devuelve los datos codificados
func (ss *StaticService) Encode(_ *http.Request, args *EncodeArgs, reply *EncodeReply) error {
    if len(args.Data) == 0 {
        return fmt.Errorf("el argumento Data no puede estar vacío")
    }
    var argBytes []byte
    if args.Length > 0 {
        argBytes = make([]byte, args.Length)
        copy(argBytes, args.Data)
    } else {
        argBytes = []byte(args.Data)
    }

    bytes, err := formatting.EncodeWithChecksum(args.Encoding, argBytes)
    if err != nil {
        return fmt.Errorf("no se pudo codificar los datos como cadena: %s", err)
    }
    reply.Bytes = bytes
    reply.Encoding = args.Encoding
    return nil
}
```

#### Decode

Este método de la API es el inverso de `Encode`.

```go title="/timestampvm/static_service.go"
// DecoderArgs son los argumentos para Decode
type DecoderArgs struct {
    Bytes    string              `json:"bytes"`
    Encoding formatting.Encoding `json:"encoding"`
}

// DecoderReply es la respuesta de Decoder
type DecoderReply struct {
    Data     string              `json:"data"`
    Encoding formatting.Encoding `json:"encoding"`
}

// Decoder devuelve los datos decodificados
func (ss *StaticService) Decode(_ *http.Request, args *DecoderArgs, reply *DecoderReply) error {
    bytes, err := formatting.Decode(args.Encoding, args.Bytes)
    if err != nil {
        return fmt.Errorf("no se pudo decodificar los datos como cadena: %s", err)
    }
    reply.Data = string(bytes)
    reply.Encoding = args.Encoding
    return nil
}
```

### API

Una VM también puede tener una API HTTP no estática, que permite a los clientes consultar y actualizar el estado de la blockchain.

La declaración de `Service` es:

```go title="/timestampvm/service.go"
// Service es el servicio de API para esta VM
type Service struct{ vm *VM }
```

Tenga en cuenta que esta estructura tiene una referencia a la VM, por lo que puede consultar y actualizar el estado.

La API de esta VM tiene dos métodos. Uno permite a un cliente obtener un bloque por su ID. El otro permite a un cliente proponer el siguiente bloque de esta blockchain. El ID de la blockchain en el endpoint cambia, ya que cada blockchain tiene un ID único.

#### `timestampvm.getBlock`

Obtener un bloque por su ID. Si no se proporciona ningún ID, obtener el último bloque.

##### Firma de `getBlock`

```sh
timestampvm.getBlock({id: string}) ->
    {
        id: string,
        data: string,
        timestamp: int,
        parentID: string
    }
```

- `id` es el ID del bloque que se está recuperando. Si se omite de los argumentos, obtiene el último bloque
- `data` es la representación en base 58 (con checksum) de la carga útil de 32 bytes del bloque
- `timestamp` es la marca de tiempo Unix cuando se creó este bloque
- `parentID` es el padre del bloque

##### Ejemplo de llamada a `getBlock`

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

##### Ejemplo de respuesta de `getBlock`

```json
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

##### Implementación de `getBlock`

```go title="/timestampvm/service.go"
// GetBlockArgs son los argumentos para GetBlock
type GetBlockArgs struct {
	// ID del bloque que estamos obteniendo.
	// Si se deja en blanco, obtiene el último bloque
	ID *ids.ID `json:"id"`
}

// GetBlockReply es la respuesta de GetBlock
type GetBlockReply struct {
	Timestamp json.Uint64 `json:"timestamp"` // Marca de tiempo del bloque más reciente
	Data      string      `json:"data"`      // Datos en el bloque más reciente. Representación en base 58 de 5 bytes.
	ID        ids.ID      `json:"id"`        // Representación en cadena del ID del bloque más reciente
	ParentID  ids.ID      `json:"parentID"`  // Representación en cadena del ID del padre del bloque más reciente
}

If your node is already running, you can install the virtual machine by following these steps:

1. Copy the binary into the plugins directory on the running node.

   ```bash
   docker cp <path to your binary> <container ID>:/avalanchego/build/plugins/
   ```

2. Use the `avm` command to install the virtual machine.

   ```bash
   docker exec -it <container ID> /avalanchego/build/avalanchego install plugin --plugin-name <VM ID or alias>
   ```

   For example, if the VM ID is `tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH`, you can run:

   ```bash
   docker exec -it <container ID> /avalanchego/build/avalanchego install plugin --plugin-name tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH
   ```

   If you have defined a VM alias, you can use the alias instead of the VM ID.

   ```bash
   docker exec -it <container ID> /avalanchego/build/avalanchego install plugin --plugin-name timestampvm
   ```

3. Restart the node for the changes to take effect.

   ```bash
   docker restart <container ID>
   ```

The virtual machine should now be installed and ready to use on your Avalanche node.

Carga el binario con la API `loadVMs`.

```bash
curl -sX POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.loadVMs",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

Confirma que la respuesta de `loadVMs` contiene la máquina virtual recién instalada
`tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH`. Verás esta máquina virtual, así como cualquier
otra que no estuviera instalada previamente, en la respuesta.

```json
{
  "jsonrpc": "2.0",
  "result": {
    "newVMs": {
      "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH": [
        "timestampvm",
        "timestamp"
      ],
      "spdxUxVJQbX85MGxMHbKw1sHxMnSqJ3QBzDyDYEP3h6TLuxqQ": []
    }
  },
  "id": 1
}
```

Ahora, la API estática de esta VM se puede acceder en los endpoints `/ext/vm/timestampvm` y
`/ext/vm/timestamp`. Para obtener más detalles sobre las configuraciones de la VM, consulta
[aquí](/nodes/configure/avalanchego-config-flags.md#vm-configs).

En este tutorial, usamos el ID de la VM como nombre ejecutable para simplificar el proceso. Sin embargo,
AvalancheGo también aceptaría `timestampvm` o `timestamp` ya que esos son alias registrados en el
paso anterior.

## Conclusión

¡Eso es todo! Esa es toda la implementación de una VM que define un servidor de tiempo basado en blockchain.

En este tutorial, aprendimos:

- La interfaz `block.ChainVM`, que todas las VMs que definen una cadena lineal deben implementar
- La interfaz `snowman.Block`, que todos los bloques que son parte de una cadena lineal deben implementar
- El tipo `rpcchainvm`, que permite que las blockchains se ejecuten en sus propios procesos.
- Una implementación real de `block.ChainVM` y `snowman.Block`.