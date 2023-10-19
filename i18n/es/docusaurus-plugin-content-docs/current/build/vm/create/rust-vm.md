---
tags: [Construir, Máquinas Virtuales]
description: Aprende cómo desarrollar máquinas virtuales en Avalanche usando Rust.
sidebar_label: VM de Rust
pagination_label: Construir una VM de Rust
sidebar_position: 3
---

# Cómo Construir una VM de Rust Simple

## Introducción

El SDK de Rust de Avalanche es un conjunto de herramientas para desarrolladores compuesto por bloques de construcción poderosos y tipos primitivos. Este tutorial te guiará a través de la creación de una VM simple conocida como la [TimestampVM RS](https://github.com/ava-labs/timestampvm-rs) utilizando el SDK de Rust. Cada bloque en la blockchain de la TimestampVM contiene una marca de tiempo creciente de forma monótona cuando se creó el bloque y una carga útil de datos de 32 bytes.

## Requisitos previos

- Instala la última versión estable de Rust utilizando [`rustup`](https://www.rust-lang.org/tools/install).
- Marca y revisa el repositorio de GitHub de [avalanche-rs](https://github.com/ava-labs/avalanche-rs), específicamente los traits y ayudantes de Subnet definidos en la crate `avalanche-types`.
- Para desarrolladores nuevos en Rust, visita el libro en línea gratuito [The Rust Programming Language](https://doc.rust-lang.org/book/).

  :::note
  Las VM de ejemplo en estos tutoriales se basan en
  [avalanche-types-rs](https://github.com/ava-labs/avalanche-types-rs), un predecesor de
  el repositorio [avalanche-rs](https://github.com/ava-labs/avalanche-rs) que ahora es el
  estándar aceptado. Las ubicaciones de los directorios pueden variar.
  :::
  

Si has experimentado con nuestras VM de ejemplo en Golang, encontrarás que el SDK de Rust es bastante familiar. ¿Eres completamente nuevo en la creación de una VM personalizada en Avalanche? No hay problema, por favor revisa [Introducción a las VM](/build/vm/intro.md).

## Componentes

Una VM define cómo se debe construir una blockchain. Un bloque se popula con una transacción que muta el estado de la blockchain cuando se ejecuta. Al ejecutar una serie de bloques cronológicamente, cualquiera puede verificar y reconstruir el estado de la blockchain en un punto arbitrario en el tiempo.

El repositorio de la TimestampVM RS tiene algunos componentes para manejar el ciclo de vida de las tareas desde que se emite una transacción hasta que se acepta un bloque en la red:

- **Mempool** - Almacena transacciones pendientes que aún no se han finalizado.
- **Bloque** - Define el formato del bloque, cómo verificarlo y cómo debe ser aceptado o rechazado en la red.
- **Máquina Virtual** - Lógica a nivel de aplicación. Implementa el trait de la VM necesario para interactuar con el consenso Avalanche y define el plano de la blockchain.
- **Servicio** - Expone APIs para que los usuarios puedan interactuar con la VM.
- **Estado** - Gestiona estados tanto en memoria como persistentes.

## Implementación de la TimestampVM RS

La TimestampVM RS implementa el trait
[snowman::block::ChainVM](https://github.com/ava-labs/avalanche-types-rs/blob/main/src/subnet/rpc/snowman/block.rs).
A continuación encontrarás documentación adicional sobre los métodos del trait. Para ayudar con una comprensión lógica de las expectativas para estos métodos, por favor ve los ejemplos de código a continuación.

Documentación adicional

- [ChainVM
  GoDoc](https://pkg.go.dev/github.com/ava-labs/avalanchego/snow/engine/snowman/block#ChainVm)
- [Avalanche Proto Docs](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM)
- [VMs Snowman](https://github.com/ava-labs/avalanchego/tree/master/vms#snowman-vms)

Ahora sabemos los traits (interfaces) que nuestra VM debe implementar y las bibliotecas que podemos usar para construir una VM utilizando el SDK de Rust.

Escribamos nuestra VM, que implementa `snowman::block::ChainVM` y cuyos bloques implementan `snowman::Block`. También puedes seguir el código en el [repositorio de la TimestampVM RS](https://github.com/ava-labs/timestampvm-rs).

### Estado

`Estado` gestiona los estados de bloque y cadena para esta VM, tanto en memoria como persistentes.

```rust title="/timestampvm/src/state/mod.rs"
#[derive(Clone)]
pub struct State {
    pub db: Arc<RwLock<Box<dyn subnet::rpc::database::Database + Send + Sync>>>,

    /// Mapea el Id del bloque a un Bloque.
    /// Cada elemento está verificado pero aún no ha sido aceptado/rechazado (por ejemplo, preferido).
    pub verified_blocks: Arc<RwLock<HashMap<ids::Id, Block>>>,
}

impl Default for State {
    fn default() -> State {
        Self {
            db: Arc::new(RwLock::new(subnet::rpc::database::memdb::Database::new())),
            verified_blocks: Arc::new(RwLock::new(HashMap::new())),
        }
    }
}

const LAST_ACCEPTED_BLOCK_KEY: &[u8] = b"last_accepted_block";

const STATUS_PREFIX: u8 = 0x0;

const DELIMITER: u8 = b'/';

/// Devuelve un vec de bytes utilizado como clave para identificar bloques en el estado.
/// 'STATUS_PREFIX' + 'BYTE_DELIMITER' + [block_id]
fn block_with_status_key(blk_id: &ids::Id) -> Vec<u8> {
    let mut k: Vec<u8> = Vec::with_capacity(ids::LEN + 2);
    k.push(STATUS_PREFIX);
    k.push(DELIMITER);
    k.extend_from_slice(&blk_id.to_vec());
    k
}

/// Envuelve un [`Bloque`](crate::block::Block) y su estado.
/// Este es el formato de datos que [`Estado`](State) utiliza para persistir bloques.
#[derive(Serialize, Deserialize, Clone)]
struct BlockWithStatus {
    block_bytes: Vec<u8>,
    status: choices::status::Status,
}

impl BlockWithStatus {
    fn encode(&self) -> io::Result<Vec<u8>> {
        serde_json::to_vec(&self).map_err(|e| {
            Error::new(
                ErrorKind::Other,
                format!("failed to serialize BlockStatus to JSON bytes: {}", e),
            )
        })
    }

    fn from_slice(d: impl AsRef<[u8]>) -> io::Result<Self> {
        let dd = d.as_ref();
        serde_json::from_slice(dd).map_err(|e| {
            Error::new(
                ErrorKind::Other,
                format!("failed to deserialize BlockStatus from JSON: {}", e),
            )
        })
    }
}


impl Estado {
    /// Persiste el último bloque aceptado.
    pub async fn set_last_accepted_block(&self, blk_id: &ids::Id) -> io::Result<()> {
        let mut db = self.db.write().await;
        db.put(LAST_ACCEPTED_BLOCK_KEY, &blk_id.to_vec())
            .await
            .map_err(|e| {
                Error::new(
                    ErrorKind::Other,
                    format!("no se pudo guardar el último bloque aceptado: {:?}", e),
                )
            })
    }

    /// Devuelve "true" si se encuentra un último bloque aceptado.
    pub async fn has_last_accepted_block(&self) -> io::Result<bool> {
        let db = self.db.read().await;
        match db.has(LAST_ACCEPTED_BLOCK_KEY).await {
            Ok(encontrado) => Ok(encontrado),
            Err(e) => Err(Error::new(
                ErrorKind::Other,
                format!("no se pudo cargar el último bloque aceptado: {}", e),
            )),
        }
    }

    /// Devuelve el Id del último bloque aceptado.
    pub async fn get_last_accepted_block_id(&self) -> io::Result<ids::Id> {
        let db = self.db.read().await;
        match db.get(LAST_ACCEPTED_BLOCK_KEY).await {
            Ok(d) => Ok(ids::Id::from_slice(&d)),
            Err(e) => {
                if subnet::rpc::database::errors::is_not_found(&e) {
                    return Ok(ids::Id::empty());
                }
                Err(e)
            }
        }
    }

    /// Agrega un bloque a "verified_blocks".
    pub async fn add_verified(&mut self, block: &Block) {
        let blk_id = block.id();
        log::info!("verificado agregado {blk_id}");

        let mut verified_blocks = self.verified_blocks.write().await;
        verified_blocks.insert(blk_id, block.clone());
    }

    /// Elimina un bloque de "verified_blocks".
    pub async fn remove_verified(&mut self, blk_id: &ids::Id) {
        let mut verified_blocks = self.verified_blocks.write().await;
        verified_blocks.remove(blk_id);
    }

    /// Devuelve "true" si el Id del bloque ya ha sido verificado.
    pub async fn has_verified(&self, blk_id: &ids::Id) -> bool {
        let verified_blocks = self.verified_blocks.read().await;
        verified_blocks.contains_key(blk_id)
    }

    /// Escribe un bloque en el almacenamiento de estado.
    pub async fn write_block(&mut self, block: &Block) -> io::Result<()> {
        let blk_id = block.id();
        let blk_bytes = block.to_slice()?;

        let mut db = self.db.write().await;

        let blk_status = BlockWithStatus {
            block_bytes: blk_bytes,
            status: block.status(),
        };
        let blk_status_bytes = blk_status.encode()?;

        db.put(&block_with_status_key(&blk_id), &blk_status_bytes)
            .await
            .map_err(|e| Error::new(ErrorKind::Other, format!("no se pudo guardar el bloque: {:?}", e)))
    }

    /// Lee un bloque del almacenamiento de estado utilizando la clave block_with_status_key.
    pub async fn get_block(&self, blk_id: &ids::Id) -> io::Result<Block> {
        // verifica si el bloque existe en memoria como verificado previamente.
        let verified_blocks = self.verified_blocks.read().await;
        if let Some(b) = verified_blocks.get(blk_id) {
            return Ok(b.clone());
        }

        let db = self.db.read().await;

        let blk_status_bytes = db.get(&block_with_status_key(blk_id)).await?;
        let blk_status = BlockWithStatus::from_slice(&blk_status_bytes)?;

        let mut blk = Block::from_slice(&blk_status.block_bytes)?;
        blk.set_status(blk_status.status);

        Ok(blk)
    }
}
```

### Block

Esta implementación de `snowman::Block` proporciona a la VM almacenamiento, recuperación y estado de bloques.

Block es un bloque en la cadena.
Cada bloque contiene:

- ID del bloque padre
- Altura
- Marca de tiempo
- Un trozo de datos (cadena codificada en hexadecimal)

```rust title="/timestampvm/src/block/mod.rs"
#[serde_as]
#[derive(Serialize, Deserialize, Clone, Derivative)]
#[derivative(Debug, PartialEq, Eq)]
pub struct Block {
    /// El ID del bloque padre.
    parent_id: ids::Id,
    /// Altura de este bloque.
    /// La altura del bloque génesis es 0.
    height: u64,
    /// Segundo Unix en el que se propuso este bloque.
    timestamp: u64,
    /// Datos arbitrarios.
    #[serde_as(as = "Hex0xBytes")]
    data: Vec<u8>,

    /// Estado actual del bloque.
    #[serde(skip)]
    status: choices::status::Status,
    /// Bytes codificados de este bloque.
    #[serde(skip)]
    bytes: Vec<u8>,
    /// ID generado del bloque.
    #[serde(skip)]
    id: ids::Id,

/// Referencia al administrador de estado de la VM para bloques.
#[derivative(Debug = "ignore", PartialEq = "ignore")]
#[serde(skip)]
state: state::State,
}

impl Default for Block {
    fn default() -> Self {
        Self::default()
    }
}

impl Block {
    pub fn default() -> Self {
        Self {
            parent_id: ids::Id::empty(),
            height: 0,
            timestamp: 0,
            data: Vec::new(),

            status: choices::status::Status::default(),
            bytes: Vec::new(),
            id: ids::Id::empty(),

            state: state::State::default(),
        }
    }

    pub fn new(
        parent_id: ids::Id,
        height: u64,
        timestamp: u64,
        data: Vec<u8>,
        status: choices::status::Status,
    ) -> io::Result<Self> {
        let mut b = Self {
            parent_id,
            height,
            timestamp,
            data,
            ..Default::default()
        };

        b.status = status;
        b.bytes = b.to_slice()?;
        b.id = ids::Id::sha256(&b.bytes);

        Ok(b)
    }

    pub fn to_json_string(&self) -> io::Result<String> {
        serde_json::to_string(&self).map_err(|e| {
            Error::new(
                ErrorKind::Other,
                format!("no se pudo serializar el bloque a una cadena JSON {}", e),
            )
        })
    }

    /// Codifica el [`Block`](Block) a JSON en bytes.
    pub fn to_slice(&self) -> io::Result<Vec<u8>> {
        serde_json::to_vec(&self).map_err(|e| {
            Error::new(
                ErrorKind::Other,
                format!("no se pudo serializar el bloque a bytes JSON {}", e),
            )
        })
    }

    /// Carga un [`Block`](Block) a partir de bytes JSON.
    pub fn from_slice(d: impl AsRef<[u8]>) -> io::Result<Self> {
        let dd = d.as_ref();
        let mut b: Self = serde_json::from_slice(dd).map_err(|e| {
            Error::new(
                ErrorKind::Other,
                format!("no se pudo deserializar el bloque desde JSON {}", e),
            )
        })?;

        b.bytes = dd.to_vec();
        b.id = ids::Id::sha256(&b.bytes);

        Ok(b)
    }

    /// Devuelve el Id del bloque padre.
    pub fn parent_id(&self) -> ids::Id {
        self.parent_id
    }

    /// Devuelve la altura de este bloque.
    pub fn height(&self) -> u64 {
        self.height
    }

    /// Devuelve la marca de tiempo de este bloque.
    pub fn timestamp(&self) -> u64 {
        self.timestamp
    }

    /// Devuelve los datos de este bloque.
    pub fn data(&self) -> &[u8] {
        &self.data
    }

    /// Devuelve el estado de este bloque.
    pub fn status(&self) -> choices::status::Status {
        self.status.clone()
    }

    /// Actualiza el estado de este bloque.
    pub fn set_status(&mut self, status: choices::status::Status) {
        self.status = status;
    }

    /// Devuelve la representación en bytes de este bloque.
    pub fn bytes(&self) -> &[u8] {
        &self.bytes
    }

    /// Devuelve el ID de este bloque.
    pub fn id(&self) -> ids::Id {
        self.id
    }

    /// Actualiza el estado del bloque.
    pub fn set_state(&mut self, state: state::State) {
        self.state = state;
    }

    /// Verifica las propiedades del [`Block`](Block) (por ejemplo, alturas),
    /// y una vez verificado, lo registra en el [`State`](crate::state::State).
    pub async fn verify(&mut self) -> io::Result<()> {
        if self.height == 0 && self.parent_id == ids::Id::empty() {
            log::debug!(
                "el bloque {} tiene un Id de padre vacío ya que es un bloque génesis - omitiendo verificación",
                self.id
            );
            self.state.add_verified(&self.clone()).await;
            return Ok(());
        }

        // si ya existe en la base de datos, significa que ya ha sido aceptado
        // por lo tanto, no es necesario verificarlo una vez más
        if self.state.get_block(&self.id).await.is_ok() {
            log::debug!("bloque {} ya verificado", self.id);
            return Ok(());
        }

        let prnt_blk = self.state.get_block(&self.parent_id).await?;


/// Marca este bloque como aceptado y actualiza el estado en consecuencia.

```rust title="/timestampvm/src/block/mod.rs"
pub async fn accept(&mut self) -> io::Result<()> {
    self.set_status(choices::status::Status::Accepted);

    // solo los bloques decididos son persistentes, sin reorganización
    self.state.write_block(&self.clone()).await?;
    self.state.set_last_accepted_block(&self.id()).await?;

    self.state.remove_verified(&self.id()).await;
    Ok(())
}
```

#### `reject`

Called by the consensus engine to indicate this block is rejected.

```rust title="/timestampvm/src/block/mod.rs"
pub async fn reject(&mut self) -> io::Result<()> {
    self.set_status(choices::status::Status::Rejected);

    // solo los bloques decididos son persistentes, sin reorganización
    self.state.write_block(&self.clone()).await?;

    self.state.remove_verified(&self.id()).await;
    Ok(())
}
}
```

#### `initialize`

Este método se llama cuando se inicializa una nueva instancia de la VM. El bloque génesis se crea bajo este método.

```rust title="/timestampvm/src/vm/mod.rs"
async fn initialize(
    &mut self,
    ctx: Option<subnet::rpc::context::Context>,
    db_manager: Box<dyn subnet::rpc::database::manager::Manager + Send + Sync>,
    genesis_bytes: &[u8],
    _upgrade_bytes: &[u8],
    _config_bytes: &[u8],
    to_engine: Sender<subnet::rpc::common::message::Message>,
    _fxs: &[subnet::rpc::common::vm::Fx],
    app_sender: Box<dyn subnet::rpc::common::appsender::AppSender + Send + Sync>,
) -> io::Result<()> {
    log::info!("inicializando Vm");
    let mut vm_state = self.state.write().await;

    vm_state.ctx = ctx;

    let version =
        Version::parse(VERSION).map_err(|e| Error::new(ErrorKind::Other, e.to_string()))?;
    vm_state.version = version;

    let genesis = Genesis::from_slice(genesis_bytes)?;
    vm_state.genesis = genesis;

    let current = db_manager.current().await?;
    let state = state::State {
        db: Arc::new(RwLock::new(current.db)),
        verified_blocks: Arc::new(RwLock::new(HashMap::new())),
    };
    vm_state.state = Some(state.clone());

    vm_state.to_engine = Some(to_engine);

    self.app_sender = Some(app_sender);

    let has_last_accepted = state.has_last_accepted_block().await?;
    if has_last_accepted {
        let last_accepted_blk_id = state.get_last_accepted_block_id().await?;
        vm_state.preferred = last_accepted_blk_id;
        log::info!("Vm inicializada con el último bloque aceptado {last_accepted_blk_id}");
    } else {
        let mut genesis_block = Block::new(
            ids::Id::empty(),
            0,
            0,
            vm_state.genesis.data.as_bytes().to_vec(),
            choices::status::Status::default(),
        )?;
        genesis_block.set_state(state.clone());
        genesis_block.accept().await?;


        let genesis_blk_id = genesis_block.id();
        vm_state.preferred = genesis_blk_id;
        log::info!("VM inicializada con bloque génesis {genesis_blk_id}");
    }

    self.mempool = Arc::new(RwLock::new(VecDeque::with_capacity(100)));

    log::info!("VM inicializada exitosamente");
    Ok(())
}
```

#### `create_handlers`

Registra los controladores definidos en `api::chain_handlers::Service`. Ver más abajo para más información sobre las APIs.

```rust title="/timestampvm/src/vm/mod.rs"
/// Crea los controladores específicos de la VM.
async fn create_handlers(
    &mut self,
) -> io::Result<HashMap<String, subnet::rpc::common::http_handler::HttpHandler>> {
    let svc = api::chain_handlers::Service::new(self.clone());
    let mut handler = jsonrpc_core::IoHandler::new();
    handler.extend_with(api::chain_handlers::Rpc::to_delegate(svc));

    let http_handler = subnet::rpc::common::http_handler::HttpHandler::new_from_u8(0, handler)
        .map_err(|_| Error::from(ErrorKind::InvalidData))?;

    let mut handlers = HashMap::new();
    handlers.insert("/rpc".to_string(), http_handler);
    Ok(handlers)
}
```

#### `create_static_handlers`

Registra los controladores definidos en `api::chain_handlers::Service`. Ver más abajo para más información sobre las APIs.

```rust title="/timestampvm/src/vm/mod.rs"
async fn create_static_handlers(
    &mut self,
) -> io::Result<HashMap<String, subnet::rpc::common::http_handler::HttpHandler>> {
    let svc = api::static_handlers::Service::new(self.clone());
    let mut handler = jsonrpc_core::IoHandler::new();
    handler.extend_with(api::static_handlers::Rpc::to_delegate(svc));

    let http_handler = subnet::rpc::common::http_handler::HttpHandler::new_from_u8(0, handler)
        .map_err(|_| Error::from(ErrorKind::InvalidData))?;

    let mut handlers = HashMap::new();
    handlers.insert("/static".to_string(), http_handler);
    Ok(handlers)
}
```

#### `build_block`

Construye un nuevo bloque a partir de los datos de la mempool y lo devuelve. Esto es principalmente solicitado por el motor de consenso.

```rust title="/timestampvm/src/vm/mod.rs"
async fn build_block(
    &self,
) -> io::Result<Box<dyn subnet::rpc::consensus::snowman::Block + Send + Sync>> {
    let mut mempool = self.mempool.write().await;

    log::info!("se llamó a build_block para la mempool de {} elementos", mempool.len());
    if mempool.is_empty() {
        return Err(Error::new(ErrorKind::Other, "ningún bloque pendiente"));
    }

    let vm_state = self.state.read().await;
    if let Some(state) = &vm_state.state {
        self.notify_block_ready().await;

        // "state" debe tener el bloque preferido en caché/verified_block
        // de lo contrario, error de no encontrado desde la base de datos rpcchainvm
        let prnt_blk = state.get_block(&vm_state.preferred).await?;
        let unix_now = Utc::now().timestamp() as u64;

        let first = mempool.pop_front().unwrap();
        let mut block = Block::new(
            prnt_blk.id(),
            prnt_blk.height() + 1,
            unix_now,
            first,
            choices::status::Status::Processing,
        )?;
        block.set_state(state.clone());
        block.verify().await?;

        log::info!("bloque construido exitosamente");
        return Ok(Box::new(block));
    }

    Err(Error::new(ErrorKind::NotFound, "administrador de estado no encontrado"))
}
```

#### `notify_block_ready`

Indica al motor de consenso que un nuevo bloque está listo para ser creado. Después de esto, el motor de consenso llamará de vuelta a `vm.build_block`.

```rust title="/timestampvm/src/vm/mod.rs"
pub async fn notify_block_ready(&self) {
    let vm_state = self.state.read().await;
    if let Some(engine) = &vm_state.to_engine {
        engine
            .send(subnet::rpc::common::message::Message::PendingTxs)
            .await
            .unwrap_or_else(|e| log::warn!("descartando mensaje al motor de consenso: {}", e));

        log::info!("¡notificado de que el bloque está listo!");
    } else {
        log::error!("fallo al inicializar el canal del motor de consenso");
    }
}
```

#### `get_block`

Devuelve el bloque con el ID de bloque dado.

```rust title="/timestampvm/src/vm/mod.rs"
impl subnet::rpc::snowman::block::Getter for Vm {
    async fn get_block(
        &self,
        blk_id: ids::Id,
    ) -> io::Result<Box<dyn subnet::rpc::consensus::snowman::Block + Send + Sync>> {
        let vm_state = self.state.read().await;
        if let Some(state) = &vm_state.state {
            let block = state.get_block(&blk_id).await?;
            return Ok(Box::new(block));
        }

        Err(Error::new(ErrorKind::NotFound, "administrador de estado no encontrado"))
    }
}
```

#### `propose_block`

Propone datos arbitrarios a la mempool y notifica que un bloque está listo para ser construido. Otras VM pueden optimizar la mempool con mecanismos de agrupación más complicados.

```rust title="/timestampvm/src/vm/mod.rs"
pub async fn propose_block(&self, d: Vec<u8>) -> io::Result<()> {
    let size = d.len();
    log::info!("recibido propose_block de {size} bytes");



    fn propose_block(&self, args: ProposeBlockArgs) -> BoxFuture<Result<ProposeBlockResponse>> {
        log::debug!("proposeBlock called");
        let size = args.data.len();
        if size > PROPOSE_LIMIT_BYTES {
            log::info!("límite excedido... devolviendo un error...");
            return Box::pin(async move {
                Err(Error::new(
                    ErrorKind::InvalidInput,
                    format!(
                        "los datos de {} bytes exceden el límite de {} bytes",
                        size, PROPOSE_LIMIT_BYTES
                    ),
                ))
            });
        }

        let mut mempool = self.vm.mempool.write().await;
        mempool.push_back(args.data);
        log::info!("se propusieron {} bytes de datos para un bloque");

        self.vm.notify_block_ready().await;
        Box::pin(async move { Ok(ProposeBlockResponse { success: true }) })
    }

    fn last_accepted(&self) -> BoxFuture<Result<LastAcceptedResponse>> {
        log::debug!("lastAccepted called");
        let vm_state = self.vm.state.read().await;
        if let Some(state) = &vm_state.state {
            let last_accepted = state.last_accepted();
            Box::pin(async move { Ok(LastAcceptedResponse { id: last_accepted }) })
        } else {
            Box::pin(async move { Err(Error::new(ErrorKind::NotFound, "administrador de estado no encontrado")) })
        }
    }

    fn get_block(&self, args: GetBlockArgs) -> BoxFuture<Result<GetBlockResponse>> {
        log::debug!("getBlock called");
        let vm_state = self.vm.state.read().await;
        if let Some(state) = &vm_state.state {
            let block_id = ids::Id::from_str(&args.id).unwrap();
            match state.get_block(&block_id).await {
                Ok(block) => Box::pin(async move { Ok(GetBlockResponse { block }) }),
                Err(_) => Box::pin(async move { Err(Error::new(ErrorKind::NotFound, "bloque no encontrado")) }),
            }
        } else {
            Box::pin(async move { Err(Error::new(ErrorKind::NotFound, "administrador de estado no encontrado")) })
        }
    }
}
```

### Main

The `main` function is the entry point of the `timestampvm-rs` application. It initializes the logger,
configures the network, and starts the server.

```rust title="/timestampvm/src/main.rs"
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize logger
    logger::init();

    // Load configuration
    let config = Config::load()?;

    // Configure network
    let network_config = NetworkConfig::new(
        config.network.listen_address,
        config.network.public_address,
        config.network.network_id,
        config.network.network_peers,
    );

    // Start server
    let server = Server::new(config, network_config)?;
    server.start().await?;

    Ok(())
}
```

    fn propose_block(&self, args: ProposeBlockArgs) -> BoxFuture<Result<ProposeBlockResponse>> {
        log::debug!("se llamó a propose_block");
        let vm = self.vm.clone();

        Box::pin(async move {
            vm.propose_block(args.data)
                .await
                .map_err(create_jsonrpc_error)?;
            Ok(ProposeBlockResponse { success: true })
        })
    }

    fn last_accepted(&self) -> BoxFuture<Result<LastAcceptedResponse>> {
        log::debug!("se llamó al método last_accepted");
        let vm = self.vm.clone();

        Box::pin(async move {
            let vm_state = vm.state.read().await;
            if let Some(state) = &vm_state.state {
                let last_accepted = state
                    .get_last_accepted_block_id()
                    .await
                    .map_err(create_jsonrpc_error)?;

                return Ok(LastAcceptedResponse { id: last_accepted });
            }

            Err(Error {
                code: ErrorCode::InternalError,
                message: String::from("no se encontró el administrador de estado"),
                data: None,
            })
        })
    }

    fn get_block(&self, args: GetBlockArgs) -> BoxFuture<Result<GetBlockResponse>> {
        let blk_id = ids::Id::from_str(&args.id).unwrap();
        log::info!("se llamó a get_block para {}", blk_id);

        let vm = self.vm.clone();

        Box::pin(async move {
            let vm_state = vm.state.read().await;
            if let Some(state) = &vm_state.state {
                let block = state
                    .get_block(&blk_id)
                    .await
                    .map_err(create_jsonrpc_error)?;

                return Ok(GetBlockResponse { block });
            }

            Err(Error {
                code: ErrorCode::InternalError,
                message: String::from("no se encontró el administrador de estado"),
                data: None,
            })
        })
    }
}
```

A continuación se muestran ejemplos de llamadas a la API, en los que "2wb1UXxAstB8ywwv4rU2rFCjLgXnhT44hbLPbwpQoGvFb2wRR7" es
el ID de la blockchain.

#### `timestampvm.getBlock`

Dado un ID de bloque válido, devuelve un bloque serializado.

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "id"     : 1,
    "method" : "timestampvm.getBlock",
    "params" : [{"id":"SDfFUzkdzWZbJ6YMysPPNEF5dWLp9q35mEMaLa8Ha2w9aMKoC"}]
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/2wb1UXxAstB8ywwv4rU2rFCjLgXnhT44hbLPbwpQoGvFb2wRR7/rpc

# ejemplo de respuesta
# {"jsonrpc":"2.0","result":{"block":{"data":"0x32596655705939524358","height":0,"parent_id":"11111111111111111111111111111111LpoYY","timestamp":0}},"id":1}
```

#### `timestampvm.proposeBlock`

Propone datos arbitrarios para un nuevo bloque en el consenso.

```sh
# para proponer datos
echo 1 | base64 | tr -d \\n
# MQo=

curl -X POST --data '{
    "jsonrpc": "2.0",
    "id"     : 1,
    "method" : "timestampvm.proposeBlock",
    "params" : [{"data":"MQo="}]
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/2wb1UXxAstB8ywwv4rU2rFCjLgXnhT44hbLPbwpQoGvFb2wRR7/rpc

# ejemplo de respuesta
# {"jsonrpc":"2.0","result":{"success":true},"id":1}
```

#### `timestampvm.lastAccepted`

Devuelve el ID del último bloque aceptado.

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "id"     : 1,
    "method" : "timestampvm.lastAccepted",
    "params" : []
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/2wb1UXxAstB8ywwv4rU2rFCjLgXnhT44hbLPbwpQoGvFb2wRR7/rpc

# ejemplo de respuesta
# {"jsonrpc":"2.0","result":{"id":"SDfFUzkdzWZbJ6YMysPPNEF5dWLp9q35mEMaLa8Ha2w9aMKoC"},"id":1}
```

### Plugin

Para que esta VM sea compatible con `go-plugin`, necesitamos definir un paquete y método `main`,
que sirva nuestra VM a través de gRPC para que AvalancheGo pueda llamar a sus métodos.

El contenido de `main.rs` es:

```rust title="timestampvm/src/bin/timestampvm/main.rs"
async fn main() -> io::Result<()> {
    let matches = Command::new(APP_NAME)
        .version(crate_version!())
        .about("VM de Timestamp")
        .subcommands(vec![genesis::command(), vm_id::command()])
        .get_matches();



// ref. https://github.com/env-logger-rs/env_logger/issues/47
env_logger::init_from_env(
    env_logger::Env::default().filter_or(env_logger::DEFAULT_FILTER_ENV, "info"),
);

match matches.subcommand() {
    Some((genesis::NAME, sub_matches)) => {
        let data = sub_matches.get_one::<String>("DATA").expect("required");
        let genesis = timestampvm::genesis::Genesis { data: data.clone() };
        println!("{genesis}");

        Ok(())
    }

    Some((vm_id::NAME, sub_matches)) => {
        let vm_name = sub_matches.get_one::<String>("VM_NAME").expect("required");
        let id = subnet::vm_name_to_id(vm_name)?;
        println!("{id}");

        Ok(())
    }

    _ => {
        log::info!("starting timestampvm");

        let (stop_ch_tx, stop_ch_rx): (Sender<()>, Receiver<()>) = broadcast::channel(1);
        let vm_server = subnet::rpc::vm::server::Server::new(vm::Vm::new(), stop_ch_tx);
        subnet::rpc::plugin::serve(vm_server, stop_ch_rx).await
    }
}
}