---
etiquetas: [Construir, Máquinas Virtuales]
descripción: Aprende cómo construir una máquina virtual compleja en Avalanche usando Golang.
sidebar_label: VM Golang Compleja
pagination_label: Construir una VM Golang Compleja
sidebar_position: 2
---

# Cómo Construir una VM Golang Compleja

En este tutorial, aprenderemos cómo construir una máquina virtual haciendo referencia a
[la BlobVM](https://github.com/ava-labs/blobvm). La BlobVM es una máquina virtual que se puede usar
para implementar una tienda de valores clave descentralizada.

Un blob (abreviatura de "objeto binario grande") es un trozo arbitrario de datos. La BlobVM almacena un par clave-valor
descomponiéndolo en múltiples fragmentos almacenados con sus hashes como sus claves en la blockchain.
Un par clave-valor raíz tiene referencias a estos fragmentos para búsquedas. Por defecto, el tamaño máximo de fragmento
está establecido en 200 KiB.

## Componentes

Una VM define cómo se debe construir una blockchain. Un bloque se llena con un conjunto de transacciones que
mutan el estado de la blockchain cuando se ejecutan. Cuando se aplica un bloque con un conjunto de transacciones
a un estado dado, ocurre una transición de estado ejecutando todas las transacciones en el bloque en orden
y aplicándolo al bloque anterior de la blockchain. Al ejecutar una serie de bloques
cronológicamente, cualquiera puede verificar y reconstruir el estado de la blockchain en un punto arbitrario
en el tiempo.

El repositorio de BlobVM tiene algunos componentes para manejar el ciclo de vida de las tareas desde que se emite una transacción hasta que se acepta un bloque en la red:

- **Transacción** - Una transición de estado
- **Mempool** - Almacena transacciones pendientes que aún no se han finalizado
- **Red** - Propaga transacciones desde el mempool a otros nodos en la red
- **Bloque** - Define el formato del bloque, cómo verificarlo y cómo debe ser aceptado o rechazado
en la red
- **Constructor de Bloques** - Construye bloques incluyendo transacciones del mempool
- **Máquina Virtual** - Lógica a nivel de aplicación. Implementa la interfaz de la VM necesaria para interactuar con
el consenso Avalanche y define el plano de la blockchain.
- **Servicio** - Expone APIs para que los usuarios puedan interactuar con la VM
- **Fábrica** - Utilizada para inicializar la VM

## Ciclo de Vida de una Transacción

Una VM a menudo expone un conjunto de APIs para que los usuarios puedan interactuar con ella. En la blockchain,
los bloques pueden contener un conjunto de transacciones que mutan el estado de la blockchain. Sumerjámonos en el
ciclo de vida de una transacción desde su emisión hasta su finalización en la blockchain.

- Un usuario hace una solicitud de API a `service.IssueRawTx` para emitir su transacción
  - Esta API deserializará la transacción del usuario y la enviará a la VM
- La transacción se envía a la VM
  - La transacción se agrega al mempool de la VM
- La VM periódicamente de forma asíncrona hace gossip de nuevas transacciones en su mempool a otros nodos en la
red para que puedan conocerlas
- La VM envía al motor de consenso Avalanche un mensaje para indicar que tiene transacciones en el
mempool que están listas para ser construidas en un bloque
- La VM propone el bloque con el consenso
- El consenso verifica que el bloque sea válido y esté bien formado
- El consenso hace que la red vote si el bloque debe ser aceptado o rechazado
  - Si un bloque es rechazado, sus transacciones son reclamadas por el mempool para que puedan ser incluidas en
   un bloque futuro
  - Si un bloque es aceptado, se finaliza escribiéndolo en la blockchain

## Codificando la Máquina Virtual

Profundizaremos en algunos de los paquetes que están en el repositorio de BlobVM para aprender más sobre cómo
funcionan:

- [`vm`](https://github.com/ava-labs/blobvm/tree/master/vm)
  - `block_builder.go`
  - `chain_vm.go`
  - `network.go`
  - `service.go`
  - `vm.go`
- [`chain`](https://github.com/ava-labs/blobvm/tree/master/chain)
  - `unsigned_tx.go`
  - `base_tx.go`
  - `transfer_tx.go`
  - `set_tx.go`
  - `tx.go`
  - `block.go`
  - `mempool.go`
  - `storage.go`
  - `builder.go`
- [`mempool`](https://github.com/ava-labs/blobvm/tree/master/mempool)
  - `mempool.go`

### Transacciones

El estado de la blockchain solo puede ser mutado al hacer que la red acepte una transacción firmada.
Una transacción firmada contiene la transacción a ejecutar junto con la firma del emisor.
La firma es necesaria para verificar criptográficamente la identidad del remitente. Una VM puede definir una
cantidad arbitraria de tipos de transacciones únicas para soportar diferentes operaciones en la blockchain. La
BlobVM implementa dos tipos de transacciones diferentes:

- [TransferTx](https://github.com/ava-labs/blobvm/blob/master/chain/transfer_tx.go) - Transfiere monedas
entre cuentas.
- [SetTx](https://github.com/ava-labs/blobvm/blob/master/chain/set_tx.go) - Almacena un par clave-valor
en la blockchain.

#### UnsignedTransaction

Todas las transacciones en la BlobVM implementan la interfaz común
[`UnsignedTransaction`](https://github.com/ava-labs/blobvm/blob/master/chain/unsigned_tx.go),
que expone funcionalidad compartida para todos los tipos de transacción.

```go
type UnsignedTransaction interface {
	Copy() UnsignedTransaction
	GetBlockID() ids.ID
	GetMagic() uint64
	GetPrice() uint64
	SetBlockID(ids.ID)
	SetMagic(uint64)
	SetPrice(uint64)
	FeeUnits(*Genesis) uint64  // número de unidades para minar la tx
	LoadUnits(*Genesis) uint64 // unidades que deberían afectar la tasa de tarifa

	ExecuteBase(*Genesis) error
	Execute(*TransactionContext) error
	TypedData() *tdata.TypedData
	Activity() *Activity
}
```

#### BaseTx

La funcionalidad común y los metadatos para los tipos de transacción son implementados por [`BaseTx`](https://github.com/ava-labs/blobvm/blob/master/chain/base_tx.go).

- [`SetBlockID`](https://github.com/ava-labs/blobvm/blob/master/chain/base_tx.go#L26) establece el
ID de bloque de la transacción.
- [`GetBlockID`](https://github.com/ava-labs/blobvm/blob/master/chain/base_tx.go#L22) devuelve el
ID de bloque de la transacción.
- [`SetMagic`](https://github.com/ava-labs/blobvm/blob/master/chain/base_tx.go#L34) establece el número mágico.
El número mágico se utiliza para diferenciar cadenas y prevenir ataques de reproducción.
- [`GetMagic`](https://github.com/ava-labs/blobvm/blob/master/chain/base_tx.go#L30) devuelve el número mágico.
El número mágico está definido en el genesis.
- [`SetPrice`](https://github.com/ava-labs/blobvm/blob/master/chain/base_tx.go#L42) establece el precio
por unidad de tarifa para esta transacción.
- [`GetPrice`](https://github.com/ava-labs/blobvm/blob/master/chain/base_tx.go#L38) devuelve el precio
de esta transacción.
- [`FeeUnits`](https://github.com/ava-labs/blobvm/blob/master/chain/base_tx.go#L59) devuelve las unidades de tarifa
que esta transacción consumirá.
- [`LoadUnits`](https://github.com/ava-labs/blobvm/blob/master/chain/base_tx.go#L63) idéntico a `FeeUnits`
- [`ExecuteBase`](https://github.com/ava-labs/blobvm/blob/master/chain/base_tx.go#L46) ejecuta
verificaciones de validación comunes en diferentes tipos de transacción. Esto valida que la transacción contenga
un ID de bloque válido, un número mágico y un precio de gas según lo definido por el genesis.

#### TransferTx

[`TransferTx`](https://github.com/ava-labs/blobvm/blob/master/chain/transfer_tx.go#L16) soporta la
transferencia de tokens de una cuenta a otra.

```go
txBytes, err := codec.Marshal(utx)
if err != nil {
    // handle error
}
digestHash := crypto.Keccak256(txBytes)
```

- Sign the digest hash with the issuer's private key.



```go
digest, err := chain.DigestHash(utx)
```

- [Firma](https://github.com/ava-labs/blobvm/blob/master/chain/crypto.go#L17) el hash del digest con la clave privada del emisor.

```go
signature, err := chain.Sign(digest, privateKey)
```

- Crea e inicializa la nueva transacción firmada.

```go
tx := chain.NewTx(utx, sig)
if err := tx.Init(g); err != nil {
    return ids.Empty, 0, err
}
```

- Emite la solicitud con el cliente.

```go
txID, err = cli.IssueRawTx(ctx, tx.Bytes())
```

### Mempool

#### Resumen de la Mempool

La [mempool](https://github.com/ava-labs/blobvm/blob/master/mempool/mempool.go) es un búfer de memoria volátil que almacena transacciones pendientes. Las transacciones se almacenan en la mempool cada vez que un nodo aprende sobre una nueva transacción ya sea a través de gossip con otros nodos o a través de una llamada de API emitida por un usuario.

La mempool está implementada como un [heap](https://en.wikipedia.org/wiki/Heap_(data_structure)) min-max ordenado por el precio de gas de cada transacción. La mempool se crea durante la [inicialización](https://github.com/ava-labs/blobvm/blob/master/vm/vm.go#L151) de la VM.

```go
vm.mempool = mempool.New(vm.genesis, vm.config.MempoolSize)
```

Cuando se envía una transacción a la VM, primero se inicializa, verifica y ejecuta localmente. Si la transacción parece válida, entonces se agrega a la [mempool](https://github.com/ava-labs/blobvm/blob/master/vm/vm.go#L431).

```go
vm.mempool.Add(tx)
```

#### Métodos de la Mempool

#### Add

Cuando se agrega una transacción a la mempool, se llama a [`Add`](https://github.com/ava-labs/blobvm/blob/master/mempool/mempool.go#L43). Esto realiza lo siguiente:

- Verifica si la transacción que se está agregando ya existe en la mempool o no.
- La transacción se agrega al heap min-max.
- Si el tamaño del heap de la mempool es mayor que el valor máximo configurado, entonces se expulsa la transacción de menor pago.
- La transacción se agrega a la lista de transacciones que pueden ser gosipeadas a otros pares.
- Se envía una notificación a través del canal `mempool.Pending` para indicar que el motor de consenso debe construir un nuevo bloque.

### Block Builder

#### Resumen del Block Builder

La implementación de [`TimeBuilder`](https://github.com/ava-labs/blobvm/blob/master/vm/block_builder.go) para `BlockBuilder` actúa como un servicio de notificación intermedio entre la mempool y el motor de consenso. Realiza las siguientes funciones:

- Gossipea periódicamente nuevas transacciones a otros nodos en la red.
- Notifica periódicamente al motor de consenso que hay nuevas transacciones en la mempool listas para ser construidas en bloques.

`TimeBuilder` puede existir en 3 estados:

- `dontBuild` - No hay transacciones en la mempool que estén listas para ser incluidas en un bloque.
- `building` - El motor de consenso ha sido notificado de que debe construir un bloque y actualmente hay transacciones en la mempool que son elegibles para ser incluidas en un bloque.
- `mayBuild` - Hay transacciones en la mempool que son elegibles para ser incluidas en un bloque, pero el motor de consenso aún no ha sido notificado.

#### Métodos del Block Builder

#### Gossip

El método [`Gossip`](https://github.com/ava-labs/blobvm/blob/master/vm/block_builder.go#L183) inicia el gossip de nuevas transacciones desde la mempool periódicamente según lo define `vm.config.GossipInterval`.

#### Build

El método [`Build`](https://github.com/ava-labs/blobvm/blob/master/vm/block_builder.go#L166) consume transacciones de la mempool y señala al motor de consenso cuando está listo para construir un bloque.

Si la mempool señala al `TimeBuilder` que tiene transacciones disponibles, el `TimeBuilder` señalará al consenso que la VM está lista para construir un bloque enviando al motor de consenso un mensaje `common.PendingTxs`.

Cuando el motor de consenso recibe el mensaje `common.PendingTxs`, llama al método `BuildBlock` de la VM. La VM construirá entonces un bloque a partir de las transacciones elegibles en la mempool.

- Si todavía quedan transacciones en la mempool después de construir un bloque, entonces el `TimeBuilder` se pone en el estado `mayBuild` para indicar que todavía hay transacciones que son elegibles para ser construidas en un bloque, pero el motor de consenso no lo sabe todavía.

### Red

[Red](https://github.com/ava-labs/blobvm/blob/master/vm/network.go) maneja el flujo de trabajo de gosipear transacciones desde la mempool de un nodo a otros nodos en la red.

#### Métodos de la Red

##### GossipNewTxs

`GossipNewTxs` envía una lista de transacciones a otros nodos en la red. `TimeBuilder` llama a la función `GossipNewTxs` de la red para gosipear nuevas transacciones en la mempool.

```go
func (n *PushNetwork) GossipNewTxs(newTxs []*chain.Transaction) error {
	txs := []*chain.Transaction{}
	// Gossip at most the target units of a block at once
	for _, tx := range newTxs {
		if _, exists := n.gossipedTxs.Get(tx.ID()); exists {
			log.Debug("already gossiped, skipping", "txId", tx.ID())
			continue
		}
		n.gossipedTxs.Put(tx.ID(), nil)
		txs = append(txs, tx)
	}

	return n.sendTxs(txs)
}
```

Las transacciones gosipeadas recientemente se mantienen en una caché para evitar un ataque de denegación de servicio a un nodo a partir de fallas repetidas de gossip.

Los otros nodos en la red recibirán las transacciones gosipeadas a través de su controlador `AppGossip`. Una vez que se recibe un mensaje de gossip, se deserializa y las nuevas transacciones se envían a la VM.

```go
func (vm *VM) AppGossip(nodeID ids.NodeID, msg []byte) error {
	txs := make([]*chain.Transaction, 0)
	if _, err := chain.Unmarshal(msg, &txs); err != nil {
		return nil
	}

	// submit incoming gossip
	log.Debug("AppGossip transactions are being submitted", "txs", len(txs))
	if errs := vm.Submit(txs...); len(errs) > 0 {
		for _, err := range errs {

		}
	}

	return nil
}
```

### Bloque

Los bloques pasan por un ciclo de vida de ser propuestos por un validador, verificados y decididos por consenso. Una vez aceptado, un bloque se comprometerá y se finalizará en la blockchain.

BlobVM implementa dos tipos de bloques, `StatefulBlock` y `StatelessBlock`.

#### StatefulBlock

Un [`StatefulBlock`](https://github.com/ava-labs/blobvm/blob/master/chain/block.go#L26) contiene estrictamente los metadatos sobre el bloque que necesitan ser escritos en la base de datos.

```go
// API to interact with the VM

// BuildBlock builds a new block that is a child of the currently preferred block
func (vm *VM) BuildBlock(parent snowman.Block, tmstp int64, context *Context) *StatelessBlock {
	// implementation omitted
}

// GetStatelessBlock retrieves a stateless block by its ID
func (vm *VM) GetStatelessBlock(id ids.ID) (*StatelessBlock, error) {
	// implementation omitted
}

// ExecutionContext returns the execution context for a given block timestamp and parent block
func (vm *VM) ExecutionContext(tmstp int64, parent *StatelessBlock) (*Context, error) {
	// implementation omitted
}

// Accepted is called when a block is accepted by consensus
func (vm *VM) Accepted(block *StatelessBlock) {
	// implementation omitted
}

// Rejected is called when a block is rejected by consensus
func (vm *VM) Rejected(block *StatelessBlock) {
	// implementation omitted
}
```

### Conclusion

In summary, the `StatelessBlock` struct is a superset of the `StatefulBlock` struct and contains additional
fields needed for block-level operations in the VM. The VM builds a new block by calling the `BuildBlock`
method, and the block's fields are populated during the `init` method. The block is then verified for
validity using the `Verify` method, and after consensus, it is either accepted or rejected. The VM provides
APIs to interact with the block and perform various operations.

[Service](https://github.com/ava-labs/blobvm/blob/master/vm/public_service.go) implementa un servidor de API para que los usuarios puedan interactuar con la VM. La VM implementa el método de interfaz [`CreateHandlers`](https://github.com/ava-labs/blobvm/blob/master/vm/vm.go#L265) que expone la API RPC de la VM.

```go
func (vm *VM) CreateHandlers() (map[string]*common.HTTPHandler, error) {
    apis := map[string]*common.HTTPHandler{}
    public, err := newHandler(Name, &PublicService{vm: vm})
    if err != nil {
        return nil, err
    }
    apis[PublicEndpoint] = public
    return apis, nil
}
```

Una de las API que se expone es [`IssueRawTx`](https://github.com/ava-labs/blobvm/blob/master/vm/public_service.go#L63) para permitir que los usuarios emitan transacciones a la BlobVM. Acepta un `IssueRawTxArgs` que contiene la transacción que el usuario quiere emitir y la reenvía a la VM.

<!-- markdownlint-disable MD013 -->

```go
func (svc *PublicService) IssueRawTx(_ *http.Request, args *IssueRawTxArgs, reply *IssueRawTxReply) error {
	tx := new(chain.Transaction)
	if _, err := chain.Unmarshal(args.Tx, tx); err != nil {
		return err
	}

	// de lo contrario, el campo tx.id no exportado está vacío
	if err := tx.Init(svc.vm.genesis); err != nil {
		return err
	}
	reply.TxID = tx.ID()

	errs := svc.vm.Submit(tx)
	if len(errs) == 0 {
		return nil
	}
	if len(errs) == 1 {
		return errs[0]
	}
	return fmt.Errorf("%v", errs)
}
```

<!-- markdownlint-enable MD013 -->

### Máquina Virtual

Hemos aprendido sobre todos los componentes utilizados en la BlobVM. La mayoría de estos componentes se hacen referencia en el archivo `vm.go`, que actúa como punto de entrada para el motor de consenso, así como para los usuarios que interactúan con la cadena de bloques. Por ejemplo, el motor llama a `vm.BuildBlock()`, que a su vez llama a `chain.BuildBlock()`. Otro ejemplo es cuando un usuario emite una transacción en bruto a través de las API de servicio, se llama al método `vm.Submit()`.

Veamos algunos de los métodos importantes de `vm.go` que deben ser implementados:

#### Métodos de la Máquina Virtual

##### Inicializar

[Inicializar](https://github.com/ava-labs/blobvm/blob/master/vm/vm.go#L92) es invocado por `avalanchego` al crear la cadena de bloques. `avalanchego` pasa algunos parámetros a la VM que implementa.

- `ctx` - Metadatos sobre la ejecución de la VM
- `dbManager` - La base de datos a la que la VM puede escribir
- `genesisBytes` - La representación serializada del estado de génesis de esta VM
- `upgradeBytes` - La representación serializada de las actualizaciones de red
- `configBytes` - La configuración VM-específica serializada [configuración](https://github.com/ava-labs/blobvm/blob/master/vm/config.go#L10)
- `toEngine` - El canal utilizado para enviar mensajes al motor de consenso
- `fxs` - Extensiones de características que se adjuntan a esta VM
- `appSender` - Se utiliza para enviar mensajes a otros nodos en la red

BlobVM al inicializarse persiste estos campos en su propio estado para usarlos a lo largo de la vida útil de su ejecución.

```go
// implementa "snowmanblock.ChainVM.common.VM"
func (vm *VM) Initialize(
	ctx *snow.Context,
	dbManager manager.Manager,
	genesisBytes []byte,
	upgradeBytes []byte,
	configBytes []byte,
	toEngine chan<- common.Message,
	_ []*common.Fx,
	appSender common.AppSender,
) error {
	log.Info("inicializando blobvm", "versión", version.Version)

	// Cargar configuración
	vm.config.SetDefaults()
	if len(configBytes) > 0 {
		if err := ejson.Unmarshal(configBytes, &vm.config); err != nil {
			return fmt.Errorf("no se pudo deserializar la configuración %s: %w", string(configBytes), err)
		}
	}

	vm.ctx = ctx
	vm.db = dbManager.Current().Database
	vm.activityCache = make([]*chain.Activity, vm.config.ActivityCacheSize)

	// Inicializar canales antes de inicializar otras estructuras
	vm.stop = make(chan struct{})
	vm.builderStop = make(chan struct{})
	vm.doneBuild = make(chan struct{})
	vm.doneGossip = make(chan struct{})
	vm.appSender = appSender
	vm.network = vm.NewPushNetwork()

	vm.blocks = &cache.LRU{Size: blocksLRUSize}
	vm.verifiedBlocks = make(map[ids.ID]*chain.StatelessBlock)

	vm.toEngine = toEngine
	vm.builder = vm.NewTimeBuilder()

	// Intentar cargar el último aceptado
	has, err := chain.HasLastAccepted(vm.db)
	if err != nil {
		log.Error("no se pudo determinar si tenemos el último aceptado")
		return err
	}

	// Analizar datos de génesis
	vm.genesis = new(chain.Genesis)
	if err := ejson.Unmarshal(genesisBytes, vm.genesis); err != nil {
		log.Error("no se pudieron deserializar los bytes de génesis")
		return err
	}
	if err := vm.genesis.Verify(); err != nil {
		log.Error("el génesis es inválido")
		return err
	}
	targetUnitsPerSecond := vm.genesis.TargetBlockSize / uint64(vm.genesis.TargetBlockRate)
	vm.targetRangeUnits = targetUnitsPerSecond * uint64(vm.genesis.LookbackWindow)
	log.Debug("génesis cargado", "génesis", string(genesisBytes), "unidades de rango objetivo", vm.targetRangeUnits)

	vm.mempool = mempool.New(vm.genesis, vm.config.MempoolSize)

	if has { //nolint:nestif
		blkID, err := chain.GetLastAccepted(vm.db)
		if err != nil {
			log.Error("no se pudo obtener el último aceptado", "err", err)
			return err
		}

		blk, err := vm.GetStatelessBlock(blkID)
		if err != nil {
			log.Error("no se pudo cargar el último aceptado", "err", err)
			return err
		}

		vm.preferred, vm.lastAccepted = blkID, blk
		log.Info("blobvm inicializada desde el último aceptado", "bloque", blkID)
	} else {
		genesisBlk, err := chain.ParseStatefulBlock(
			vm.genesis.StatefulBlock(),
			nil,
			choices.Accepted,
			vm,
		)
		if err != nil {
			log.Error("no se pudo inicializar el bloque de génesis", "err", err)
			return err
		}

		// Establecer saldos
		if err := vm.genesis.Load(vm.db, vm.AirdropData); err != nil {
			log.Error("no se pudo establecer la asignación de génesis", "err", err)
			return err
		}



BlobVM implementa un almacén genérico de clave-valor, pero el soporte para leer y escribir archivos arbitrarios en la blockchain de BlobVM se implementa en el `blob-cli`.

Para escribir un archivo, BlobVM divide un archivo arbitrariamente grande en muchos fragmentos pequeños. Cada fragmento se envía a la VM en una transacción `SetTx`. Se genera una clave raíz que contiene todos los hashes de los fragmentos.

```go
func Upload(
	ctx context.Context, cli client.Client, priv *ecdsa.PrivateKey,
	f io.Reader, chunkSize int,
) (common.Hash, error) {
	hashes := []common.Hash{}
	chunk := make([]byte, chunkSize)
	shouldExit := false
	opts := []client.OpOption{client.WithPollTx()}
	totalCost := uint64(0)
	uploaded := map[common.Hash]struct{}{}
	for !shouldExit {
		read, err := f.Read(chunk)
		if errors.Is(err, io.EOF) || read == 0 {
			break
		}
		if err != nil {
			return common.Hash{}, fmt.Errorf("%w: read error", err)
		}
		if read < chunkSize {
			shouldExit = true
			chunk = chunk[:read]

			// Use small file optimization
			if len(hashes) == 0 {
				break
			}
		}
		k := chain.ValueHash(chunk)
		if _, ok := uploaded[k]; ok {
			color.Yellow("already uploaded k=%s, skipping", k)
		} else if exists, _, _, err := cli.Resolve(ctx, k); err == nil && exists {
			color.Yellow("already on-chain k=%s, skipping", k)
			uploaded[k] = struct{}{}
		} else {
			tx := &chain.SetTx{
				BaseTx: &chain.BaseTx{},
				Value:  chunk,
			}
			txID, cost, err := client.SignIssueRawTx(ctx, cli, tx, priv, opts...)
			if err != nil {
				return common.Hash{}, err
			}
			totalCost += cost
			color.Yellow("uploaded k=%s txID=%s cost=%d totalCost=%d", k, txID, cost, totalCost)
			uploaded[k] = struct{}{}
		}
		hashes = append(hashes, k)
	}

	r := &Root{}
	if len(hashes) == 0 {
		if len(chunk) == 0 {
			return common.Hash{}, ErrEmpty
		}
		r.Contents = chunk
	} else {
		r.Children = hashes
	}



```go
rb, err := json.Marshal(r)
if err != nil {
	return common.Hash{}, err
}
rk := chain.ValueHash(rb)
tx := &chain.SetTx{
	BaseTx: &chain.BaseTx{},
	Value:  rb,
}
txID, cost, err := client.SignIssueRawTx(ctx, cli, tx, priv, opts...)
if err != nil {
	return common.Hash{}, err
}
totalCost += cost
color.Yellow("subida root=%v txID=%s costo=%d costoTotal=%d", rk, txID, cost, totalCost)
return rk, nil
}
```

#### Ejemplo 1

```shell
blob-cli set-file ~/Downloads/computer.gif -> 6fe5a52f52b34fb1e07ba90bad47811c645176d0d49ef0c7a7b4b22013f676c8
```

Dada la raíz hash, un archivo puede buscarse deserializando todos los valores de sus fragmentos hijos y
reconstruyendo el archivo original.

```go
// TODO: hacer multihilo
func Descargar(ctx context.Context, cli client.Client, root common.Hash, f io.Writer) error {
	existe, rb, _, err := cli.Resolve(ctx, root)
	if err != nil {
		return err
	}
	if !existe {
		return fmt.Errorf("%w:%v", ErrFalta, root)
	}
	var r Root
	if err := json.Unmarshal(rb, &r); err != nil {
		return err
	}

	// Usar optimización de archivo pequeño
	if contentLen := len(r.Contents); contentLen > 0 {
		if _, err := f.Write(r.Contents); err != nil {
			return err
		}
		color.Yellow("descargada root=%v tamaño=%fKB", root, float64(contentLen)/units.KiB)
		return nil
	}

	if len(r.Children) == 0 {
		return ErrVacio
	}

	cantidadDescargada := 0
	for _, h := range r.Children {
		existe, b, _, err := cli.Resolve(ctx, h)
		if err != nil {
			return err
		}
		if !existe {
			return fmt.Errorf("%w:%s", ErrFalta, h)
		}
		if _, err := f.Write(b); err != nil {
			return err
		}
		tamaño := len(b)
		color.Yellow("descargado fragmento=%v tamaño=%fKB", h, float64(tamaño)/units.KiB)
		cantidadDescargada += tamaño
	}
	color.Yellow("descarga completa root=%v tamaño=%fMB", root, float64(cantidadDescargada)/units.MiB)
	return nil
}
```

#### Ejemplo 2

```go
blob-cli resolve-file 6fe5a52f52b34fb1e07ba90bad47811c645176d0d49ef0c7a7b4b22013f676c8 computer_copy.gif
```

## Conclusión

Esta documentación cubre conceptos sobre la Máquina Virtual al recorrer una VM que implementa un
almacenamiento de clave-valor descentralizado.

Puedes aprender más sobre BlobVM consultando el [
  README](https://github.com/ava-labs/blobvm/blob/master/README.md) en el repositorio de GitHub.