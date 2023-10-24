---
etiquetas: [Construir, Máquinas Virtuales]
descripción: Una Máquina Virtual es un plano para una blockchain. Las VM pueden definir cualquier cosa que desees, pero generalmente definirán transacciones que se ejecutan y cómo se crean los bloques.
sidebar_label: Introducción a las VM
pagination_label: Introducción a las Máquinas Virtuales
---

# Introducción a las Máquinas Virtuales

## Resumen

Una [Máquina Virtual (VM)](/learn/avalanche/virtual-machines) es un plano para una blockchain. Las blockchains se instancian a partir de una VM, similar a cómo se instancian los objetos a partir de una definición de clase. Las VM pueden definir cualquier cosa que desees, pero generalmente definen transacciones que se ejecutan y cómo se crean los bloques.

## Bloques y Estado

Las Máquinas Virtuales trabajan con bloques y estado. La funcionalidad proporcionada por las VM es:

- Definir la representación del estado de una blockchain
- Representar las operaciones en ese estado
- Aplicar las operaciones en ese estado

Cada bloque en la blockchain contiene un conjunto de transiciones de estado. Cada bloque se aplica en orden desde el bloque génesis inicial de la blockchain hasta su último bloque aceptado para alcanzar el estado más reciente de la blockchain.

## Blockchain

Una blockchain se basa en dos componentes principales: el **Motor de Consenso** y la **VM**. La VM define el comportamiento específico de la aplicación y cómo se construyen y se analizan los bloques para crear la blockchain. Todas las VM se ejecutan sobre el Motor de Consenso Avalanche, que permite que los nodos en la red acuerden el estado de la blockchain. Aquí tienes un rápido ejemplo de cómo las VM interactúan con el consenso:

1. Un nodo quiere actualizar el estado de la blockchain
2. La VM del nodo notificará al motor de consenso que quiere actualizar el estado
3. El motor de consenso solicitará el bloque a la VM
4. El motor de consenso verificará el bloque devuelto usando la implementación de `Verify()` de la VM
5. El motor de consenso hará que la red alcance consenso sobre si aceptar o rechazar el bloque recién verificado
   - Cada nodo virtuoso (bien comportado) en la red tendrá la misma preferencia por un bloque en particular
6. Dependiendo de los resultados del consenso, el motor aceptará o rechazará el bloque
   - Lo que sucede cuando se acepta o se rechaza un bloque es específico de la implementación de la VM

AvalancheGo proporciona el motor de consenso para cada blockchain en la Red Avalanche. El motor de consenso se basa en la interfaz de la VM para manejar la construcción, el análisis y el almacenamiento de bloques, así como para verificar y ejecutar en nombre del motor de consenso.

Esta desvinculación entre la aplicación y la capa de consenso permite a los desarrolladores construir sus aplicaciones rápidamente mediante la implementación de máquinas virtuales, sin tener que preocuparse por la capa de consenso gestionada por Avalanche, que se ocupa de cómo los nodos acuerdan si aceptar o no un bloque.

## Instalación de una VM

Las VM se suministran como binarios a un nodo que ejecuta `AvalancheGo`. Estos binarios deben tener el nombre del **VMID** asignado a la VM. Un VMID es un hash de 32 bytes codificado en CB58 que se genera cuando construyes tu VM.

Para instalar una VM, su binario debe ser instalado en la ruta de plugins de `AvalancheGo`. Consulta
[aquí](/nodes/configure/avalanchego-config-flags.md#--plugin-dir-string) para más detalles.
Se pueden instalar varias VM en esta ubicación.

Cada VM se ejecuta como un proceso separado de AvalancheGo y se comunica con `AvalancheGo` mediante llamadas gRPC. Esta funcionalidad está habilitada por **RPCChainVM**, una VM especial que envuelve otras implementaciones de VM y conecta la VM y AvalancheGo, estableciendo un protocolo de comunicación estandarizado entre ellos.

:::info

Durante la creación de la VM, se intercambian mensajes de handshake a través de **RPCChainVM** entre AvalancheGo y la instalación de la VM. Asegúrate de que las versiones de protocolo de **RPCChainVM** coincidan para evitar errores, actualizando tu VM o utilizando una
[versión diferente de AvalancheGo](https://github.com/ava-labs/AvalancheGo/releases).

Ten en cuenta que algunas VM pueden no ser compatibles con la última versión del protocolo.

:::

### Manipuladores de API

Los usuarios pueden interactuar con una blockchain y su VM a través de manipuladores expuestos por la API de la VM.

Las VM exponen dos tipos de manipuladores para servir respuestas a solicitudes entrantes:

- **Manipuladores de Blockchain** - También conocidos como manipuladores, estos exponen APIs para interactuar con una blockchain instanciada por una VM. El punto final de la API será diferente para cada cadena. El punto final para un manipulador es `/ext/bc/[chainID]`.
- **Manipuladores de VM** - También conocidos como manipuladores estáticos, estos exponen APIs para interactuar con la VM directamente. Un ejemplo de API sería analizar datos de génesis para instanciar una nueva blockchain. El punto final para un manipulador estático es `/ext/vm/[vmID]`.

Para cualquier lector familiarizado con la programación orientada a objetos, los manipuladores estáticos y no estáticos en una VM son análogos a los métodos estáticos y no estáticos en una clase. Los manipuladores de blockchain se pueden pensar como métodos en un objeto, mientras que los manipuladores de VM se pueden pensar como métodos estáticos en una clase.

### Instanciar una VM

La interfaz `vm.Factory` se implementa para crear nuevas instancias de VM a partir de las cuales se puede inicializar una blockchain. El método `New` de la fábrica que se muestra a continuación proporciona a `AvalancheGo` una instancia de la VM. Está definido en el archivo
[`factory.go`](https://github.com/ava-labs/timestampvm/blob/main/timestampvm/factory.go)
del repositorio `timestampvm`.

```go
// Devuelve una nueva instancia de VM desde la fábrica de la VM
func (f *Factory) New(*snow.Context) (interface{}, error) { return &vm.VM{}, nil }
```

### Inicializar una VM para crear una Blockchain

Antes de que una VM pueda ejecutarse, AvalancheGo la inicializará invocando su método `Initialize`. Aquí, la
VM se inicializará y se configurará todo lo que requiera antes de empezar a ejecutarse.

Esto puede implicar configurar su base de datos, mempool, estado de génesis o cualquier otra cosa que la VM requiera para ejecutarse.

```go
if err := vm.Initialize(
    ctx.Context,
    vmDBManager,
    genesisData,
    chainConfig.Upgrade,
    chainConfig.Config,
    msgChan,
    fxs,
    sender,
);
```

Puedes consultar la
[implementación](https://github.com/ava-labs/timestampvm/blob/main/timestampvm/vm.go#L75) de
`vm.initialize` en el repositorio de TimestampVM.

## Interfaces

Cada VM debe implementar las siguientes interfaces:

### `block.ChainVM`

Para alcanzar un consenso en blockchains lineales, Avalanche utiliza el motor de consenso Snowman. Para ser
compatible con Snowman, una VM debe implementar la interfaz `block.ChainVM`.

Para más información, consulta [aquí](https://github.com/ava-labs/avalanchego/blob/master/snow/engine/snowman/block/vm.go).

```go title="/snow/engine/snowman/block/vm.go"
// ChainVM define la funcionalidad requerida de una VM Snowman.
//
// Una VM Snowman es responsable de definir la representación del estado,
// la representación de las operaciones en ese estado, la aplicación de las operaciones
// en ese estado, y la creación de las operaciones. El consenso decidirá si
// la operación se ejecuta y el orden en que se ejecutan las operaciones.
//
// Por ejemplo, supongamos que tenemos una VM que realiza un seguimiento de un número creciente que
// es acordado por la red.
// El estado es un solo número.
// La operación es establecer el número en un nuevo valor, más grande.
// Aplicar la operación guardará en la base de datos el nuevo valor.
// La VM puede intentar emitir un nuevo número, de valor más grande, en cualquier momento.
// El consenso se asegurará de que la red esté de acuerdo en el número en cada altura de bloque.
type ChainVM interface {
	common.VM
	Getter
	Parser

	// Intenta crear un nuevo bloque a partir de los datos contenidos en la VM.
	//
	// Si la VM no quiere emitir un nuevo bloque, se debe devolver un error.
	BuildBlock() (snowman.Block, error)

	// Notifica a la VM del bloque actualmente preferido.
	//
	// Este bloque siempre debe ser un bloque que no tiene hijos conocidos por el consenso.
	SetPreference(ids.ID) error

	// LastAccepted devuelve la ID del último bloque aceptado.
	//
	// Si aún no se han aceptado bloques por consenso, se asume que hay un bloque aceptado por definición, el bloque Génesis, que se devolverá.
	LastAccepted() (ids.ID, error)
}



// Getter define la funcionalidad para obtener un bloque por su ID.
type Getter interface {
	// Intenta cargar un bloque.
	//
	// Si el bloque no existe, se debe devolver un error.
	//
	GetBlock(ids.ID) (snowman.Block, error)
}

// Parser define la funcionalidad para obtener un bloque por sus bytes.
type Parser interface {
	// Intenta crear un bloque a partir de una secuencia de bytes.
	//
	// El bloque debe estar representado por el arreglo completo de bytes, sin bytes adicionales.
	ParseBlock([]byte) (snowman.Block, error)
}
```

### `common.VM`

`common.VM` es un tipo que cada `VM` debe implementar.

Para obtener más información, puedes ver el archivo completo [aquí](https://github.com/ava-labs/avalanchego/blob/master/snow/engine/common/vm.go).

```go title="/snow/engine/common/vm.go"
// VM describe la interfaz que todas las VM de consenso deben implementar
type VM interface {
    // Contiene controladores para mensajes específicos de VM a VM
	AppHandler

	// Devuelve nil si la VM está saludable.
	// Se llama periódicamente y se informa a través de la API de salud del nodo.
	health.Checkable

	// Connector representa un controlador que se llama en conexión conectar/desconectar
	validators.Connector

	// Inicializa esta VM.
	// [ctx]: Metadatos sobre esta VM.
	//     [ctx.networkID]: La ID de la red en la que se está ejecutando la cadena de esta VM.
	//     [ctx.chainID]: La ID única de la cadena en la que se está ejecutando esta VM.
	//     [ctx.Log]: Se utiliza para registrar mensajes.
	//     [ctx.NodeID]: La ID única del staker de este nodo.
	//     [ctx.Lock]: Un candado de lectura/escritura compartido por esta VM y el motor de consenso
	//                 que gestiona esta VM. El candado de escritura se mantiene
	//                 siempre que el código en el motor de consenso llame a la VM.
	// [dbManager]: El administrador de la base de datos en la que esta VM persistirá los datos.
	// [genesisBytes]: La codificación de bytes de la información de génesis de esta
	//                 VM. La VM lo usa para inicializar su estado. Por
	//                 ejemplo, si esta VM fuera un sistema de pagos basado en cuentas,
	//                 `genesisBytes` probablemente contendría una transacción de génesis que da monedas a algunas cuentas, y esta
	//                 transacción estaría en el bloque génesis.
	// [toEngine]: El canal utilizado para enviar mensajes al motor de consenso.
	// [fxs]: Extensiones de características que se adjuntan a esta VM.
	Initialize(
		ctx *snow.Context,
		dbManager manager.Manager,
		genesisBytes []byte,
		upgradeBytes []byte,
		configBytes []byte,
		toEngine chan<- Message,
		fxs []*Fx,
		appSender AppSender,
	) error

	// Bootstrapping se llama cuando el nodo está empezando a arrancar esta cadena.
	Bootstrapping() error

	// Bootstrapped se llama cuando el nodo ha terminado de arrancar esta cadena.
	Bootstrapped() error

	// Shutdown se llama cuando el nodo se está apagando.
	Shutdown() error

	// Version devuelve la versión de la VM que está ejecutando este nodo.
	Version() (string, error)

	// Crea los controladores HTTP para llamadas de red personalizadas de la VM.
	//
	// Esto expone controladores que el mundo exterior puede usar para comunicarse con
	// una referencia estática a la VM. Cada controlador tiene la ruta:
	// [Dirección del nodo]/ext/VM/[ID de la VM]/[extensión]
	//
	// Devuelve un mapeo de [extension]s a controladores HTTP.
	//
	// Cada extensión puede especificar cómo se gestiona el bloqueo para mayor comodidad.
	//
	// Por ejemplo, podría tener una extensión para crear
	// bytes de génesis que esta VM puede interpretar.
	CreateStaticHandlers() (map[string]*HTTPHandler, error)

	// Crea los controladores HTTP para llamadas de red personalizadas de la cadena.
	//
	// Esto expone controladores que el mundo exterior puede usar para comunicarse con
	// la cadena. Cada controlador tiene la ruta:
	// [Dirección del nodo]/ext/bc/[ID de la cadena]/[extensión]
	//
	// Devuelve un mapeo de [extension]s a controladores HTTP.
	//
	// Cada extensión puede especificar cómo se gestiona el bloqueo para mayor comodidad.
	//
	// Por ejemplo, si esta VM implementa un sistema de pagos basado en cuentas,
	// podría tener una extensión llamada `cuentas`, donde los clientes podrían obtener
	// información sobre sus cuentas.
	CreateHandlers() (map[string]*HTTPHandler, error)
}
```

### `snowman.Block`

La interfaz `snowman.Block` define la funcionalidad que un bloque debe implementar para ser un bloque en una cadena lineal Snowman.

Para obtener más información, puedes ver el archivo completo [aquí](https://github.com/ava-labs/avalanchego/blob/master/snow/consensus/snowman/block.go).

```go title="/snow/consensus/snowman/block.go"
// Block es una posible decisión que dicta el próximo bloque canónico.
//
// Se garantiza que los bloques se verifican, aceptan y rechazan en orden topológico.
// Específicamente, si se llama a Verify, entonces el padre ya ha sido verificado. Si
// se llama a Accept, entonces el padre ya ha sido aceptado. Si
// se llama a Reject, el padre ya ha sido aceptado o rechazado.
//
// Si el estado del bloque es Desconocido, se asume que se puede llamar a ID.
// Si el estado del bloque es Aceptado o Rechazado; Nunca se llamará a Parent, Verify, Accept
// y Reject.
type Block interface {
    choices.Decidable

    // Parent devuelve la ID del padre de este bloque.
    Parent() ids.ID

    // Verifica que la transición de estado que este bloque haría si se acepta sea válida.
    // Si la transición de estado es inválida, se debe devolver un error no nulo.
    //
    // Se garantiza que el Padre se ha verificado correctamente.
    Verify() error

    // Bytes devuelve la representación binaria de este bloque.
    //
    // Esto se utiliza para enviar bloques a los pares. Los bytes deben poder ser
    // analizados en el mismo bloque en otro nodo.
    Bytes() []byte

    // Height devuelve la altura de este bloque en la cadena.
    Height() uint64
}
```

### `choices.Decidable`

Esta interfaz es un superset de cada objeto decidible, como transacciones, bloques y vértices.

Para obtener más información, puedes ver el archivo completo [aquí](https://github.com/ava-labs/avalanchego/blob/master/snow/choices/decidable.go).

```go title="/snow/choices/decidable.go"
// Decidable representa un elemento que puede ser decidido.
//
// Los objetos decidibles suelen ser pensados como transacciones, bloques o
// vértices.
type Decidable interface {
	// ID devuelve una ID única para este elemento.
	//
	// Típicamente, esto se implementa usando un hash criptográfico de una
	// representación binaria de este elemento. Un elemento debe devolver las mismas
	// IDs en llamadas repetidas.
	ID() ids.ID

	// Acepta este elemento.
	//
	// Este elemento será aceptado por cada nodo correcto en la red.
	Accept() error

	// Rechaza este elemento.
	//
	// Este elemento no será aceptado por ningún nodo correcto en la red.
	Reject() error



// Status devuelve el estado actual de este elemento.
//
// Si se ha llamado a Accept en un elemento con este ID, se debe devolver Accepted. De manera similar, si se ha llamado a Reject en un elemento con este ID, se debe devolver Rejected. Si el contenido de este elemento es desconocido, entonces se debe devolver Unknown. De lo contrario, se debe devolver Processing.
Status() Status
```
