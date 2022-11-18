# How to Build a Simple Rust VM

This is part of a series of tutorials for building a Virtual Machine (VM):

- [Introduction to VMs](./introduction-to-vm.md) - [How to Build a Complex
VM](./create-a-vm-blobvm.md) - How to Build a Simple Rust VM (this article)

## Introduction

The avalanche Rust SDK is a developer toolkit composed of power building and
primitive types. This tutorial will walk you through the creation of a simple Vm
known as the [TimestampVm](https://github.com/ava-labs/timestampvm-rs) using the
SDK. Each block in the TimestampVM's blockchain contains a strictly increasing
timestamp when the block was created and a 32-byte payload of data.

## Prerequisites

- Install the latest stable version of Rust using
[rustup](https://www.rust-lang.org/tools/install)
- Bookmark and review the
[avalanche-types](https://github.com/ava-labs/avalanche-types-rs) GitHub
repository specifically the traits and helpers defined in the [subnet/rpc](https://github.com/ava-labs/avalanche-types-rs/tree/main/src/subnet/rpc) mod.
- For developers new to Rust please visit the free online book [The
Rust Programming Language](https://doc.rust-lang.org/book/)

If you are familiar with our Golang SDK and example Vm's you will find the Rust
SDK attempts to maintain some of these patterns and namespaces to reduce the
overhead of learning. If you are completely new to creating a custom Vm on
Avalanche please review [Introduction to VMs](./introduction-to-vm.md).

## TimestampVM Implementation

Now we know the interface our VM must implement and the libraries we can use to
build a VM using the Rust SDK.

Let’s write our VM, which implements `block.ChainVM` and whose blocks implement
`snowman.Block`. You can also follow the code in the [TimestampVM
repository](https://github.com/ava-labs/timestampvm-rs).

### State

`State` manages block and chain states for this Vm, both in-memory and persistent.

```rust title="/timestampvm/src/state/mod.rs"
#[derive(Clone)]
pub struct State {
    pub db: Arc<RwLock<Box<dyn subnet::rpc::database::Database + Send + Sync>>>,

    /// Maps block Id to Block.
    /// Each element is verified but not yet accepted/rejected (e.g., preferred).
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

/// Returns a vec of bytes used as a key for identifying blocks in state.
/// 'STATUS_PREFIX' + 'BYTE_DELIMITER' + [block_id]
fn block_with_status_key(blk_id: &ids::Id) -> Vec<u8> {
    let mut k: Vec<u8> = Vec::with_capacity(ids::LEN + 2);
    k.push(STATUS_PREFIX);
    k.push(DELIMITER);
    k.extend_from_slice(&blk_id.to_vec());
    k
}

/// Wraps a [`Block`](crate::block::Block) and its status.
/// This is the data format that [`State`](State) uses to persist blocks.
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

impl State {
    /// Persists the last accepted block Id.
    pub async fn set_last_accepted_block(&self, blk_id: &ids::Id) -> io::Result<()> {
        let mut db = self.db.write().await;
        db.put(LAST_ACCEPTED_BLOCK_KEY, &blk_id.to_vec())
            .await
            .map_err(|e| {
                Error::new(
                    ErrorKind::Other,
                    format!("failed to put last accepted block: {:?}", e),
                )
            })
    }

    /// Returns "true" if there's a last accepted block found.
    pub async fn has_last_accepted_block(&self) -> io::Result<bool> {
        let db = self.db.read().await;
        match db.has(LAST_ACCEPTED_BLOCK_KEY).await {
            Ok(found) => Ok(found),
            Err(e) => Err(Error::new(
                ErrorKind::Other,
                format!("failed to load last accepted block: {}", e),
            )),
        }
    }

    /// Returns the last accepted block Id.
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

    /// Adds a block to "verified_blocks".
    pub async fn add_verified(&mut self, block: &Block) {
        let blk_id = block.id();
        log::info!("verified added {blk_id}");

        let mut verified_blocks = self.verified_blocks.write().await;
        verified_blocks.insert(blk_id, block.clone());
    }

    /// Removes a block from "verified_blocks".
    pub async fn remove_verified(&mut self, blk_id: &ids::Id) {
        let mut verified_blocks = self.verified_blocks.write().await;
        verified_blocks.remove(blk_id);
    }

    /// Returns "true" if the block Id has been already verified.
    pub async fn has_verified(&self, blk_id: &ids::Id) -> bool {
        let verified_blocks = self.verified_blocks.read().await;
        verified_blocks.contains_key(blk_id)
    }

    /// Writes a block to the state storage.
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
            .map_err(|e| Error::new(ErrorKind::Other, format!("failed to put block: {:?}", e)))
    }

    /// Reads a block from the state storage using the block_with_status_key.
    pub async fn get_block(&self, blk_id: &ids::Id) -> io::Result<Block> {
        // check if the block exists in memory as previously verified.
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
}pub struct State {
    pub db: Arc<RwLock<Box<dyn subnet::rpc::database::Database + Send + Sync>>>,

    /// Maps block Id to Block.
    /// Each element is verified but not yet accepted/rejected (e.g., preferred).
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

const BLOCK_WITH_STATUS_PREFIX: u8 = 0x0;

const DELIMITER: u8 = b'/';

fn block_with_status_key(blk_id: &ids::Id) -> Vec<u8> {
    let mut k: Vec<u8> = Vec::with_capacity(ids::LEN + 2);
    k.push(BLOCK_WITH_STATUS_PREFIX);
    k.push(DELIMITER);
    k.extend_from_slice(&blk_id.to_vec());
    k
}

/// Wraps a [`Block`](crate::block::Block) and its status.
/// This is the data format that [`State`](State) uses to persist blocks.
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

impl State {
    /// Persists the last accepted block Id to state.
    pub async fn set_last_accepted_block(&self, blk_id: &ids::Id) -> io::Result<()> {
        let mut db = self.db.write().await;
        db.put(LAST_ACCEPTED_BLOCK_KEY, &blk_id.to_vec())
            .await
            .map_err(|e| {
                Error::new(
                    ErrorKind::Other,
                    format!("failed to put last accepted block: {:?}", e),
                )
            })
    }

    /// Returns "true" if there's a last accepted block found.
    pub async fn has_last_accepted_block(&self) -> io::Result<bool> {
        let db = self.db.read().await;
        match db.has(LAST_ACCEPTED_BLOCK_KEY).await {
            Ok(found) => Ok(found),
            Err(e) => Err(Error::new(
                ErrorKind::Other,
                format!("failed to load last accepted block: {}", e),
            )),
        }
    }

    /// Returns the last accepted block Id from state.
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

    /// Adds a block to "verified_blocks".
    pub async fn add_verified(&mut self, block: &Block) {
        let blk_id = block.id();
        log::info!("verified added {blk_id}");

        let mut verified_blocks = self.verified_blocks.write().await;
        verified_blocks.insert(blk_id, block.clone());
    }

    /// Removes a block from "verified_blocks".
    pub async fn remove_verified(&mut self, blk_id: &ids::Id) {
        let mut verified_blocks = self.verified_blocks.write().await;
        verified_blocks.remove(blk_id);
    }

    /// Returns "true" if the block Id has been already verified.
    pub async fn has_verified(&self, blk_id: &ids::Id) -> bool {
        let verified_blocks = self.verified_blocks.read().await;
        verified_blocks.contains_key(blk_id)
    }

    /// Writes a block to the state storage.
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
            .map_err(|e| Error::new(ErrorKind::Other, format!("failed to put block: {:?}", e)))
    }

    /// Reads a block from the state storage.
    pub async fn get_block(&self, blk_id: &ids::Id) -> io::Result<Block> {
        // check if the block has been previously verified.
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

#### Block

This implementation of `snowman.Block` provides the VM with storage, retrieval and status of blocks.

// Block is a block on the chain.
// Each block contains:
// 1) ParentID
// 2) Height
// 3) Timestamp
// 4) A piece of data (hex encoded string)

```rust title="/timestampvm/src/block/mod.rs"
#[serde_as]
#[derive(Serialize, Deserialize, Clone, Derivative)]
#[derivative(Debug, PartialEq, Eq)]
pub struct Block {
    /// The block Id of the parent block.
    parent_id: ids::Id,
    /// This block's height.
    /// The height of the genesis block is 0.
    height: u64,
    /// Unix second when this block was proposed.
    timestamp: u64,
    /// Arbitrary data.
    #[serde_as(as = "Hex0xBytes")]
    data: Vec<u8>,

    /// Current block status.
    #[serde(skip)]
    status: choices::status::Status,
    /// This block's encoded bytes.
    #[serde(skip)]
    bytes: Vec<u8>,
    /// Generated block Id.
    #[serde(skip)]
    id: ids::Id,

    /// Reference to the Vm state manager for blocks.
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
                format!("failed to serialize Block to JSON string {}", e),
            )
        })
    }

    /// Encodes the Block to JSON in bytes.
    pub fn to_slice(&self) -> io::Result<Vec<u8>> {
        serde_json::to_vec(&self).map_err(|e| {
            Error::new(
                ErrorKind::Other,
                format!("failed to serialize Block to JSON bytes {}", e),
            )
        })
    }

    /// Loads Block from JSON bytes.
    pub fn from_slice(d: impl AsRef<[u8]>) -> io::Result<Self> {
        let dd = d.as_ref();
        let mut b: Self = serde_json::from_slice(dd).map_err(|e| {
            Error::new(
                ErrorKind::Other,
                format!("failed to deserialize Block from JSON {}", e),
            )
        })?;

        b.bytes = dd.to_vec();
        b.id = ids::Id::sha256(&b.bytes);

        Ok(b)
    }

    /// Returns the parent block Id.
    pub fn parent_id(&self) -> ids::Id {
        self.parent_id
    }

    /// Returns the height of this block.
    pub fn height(&self) -> u64 {
        self.height
    }

    /// Returns the timestamp of this block.
    pub fn timestamp(&self) -> u64 {
        self.timestamp
    }

    /// Returns the data of this block.
    pub fn data(&self) -> &[u8] {
        &self.data
    }

    /// Returns the status of this block.
    pub fn status(&self) -> choices::status::Status {
        self.status.clone()
    }

    /// Updates the status of this block.
    pub fn set_status(&mut self, status: choices::status::Status) {
        self.status = status;
    }

    pub fn bytes(&self) -> &[u8] {
        &self.bytes
    }

    pub fn id(&self) -> ids::Id {
        self.id
    }

    pub fn set_state(&mut self, state: state::State) {
        self.state = state;
    }

    /// Verifies Block properties (e.g., heights),
    /// and once verified, records it to the State.
    pub async fn verify(&mut self) -> io::Result<()> {
        if self.height == 0 && self.parent_id == ids::Id::empty() {
            log::debug!(
                "block {} has an empty parent Id since it's a genesis block -- skipping verify",
                self.id
            );
            self.state.add_verified(&self.clone()).await;
            return Ok(());
        }

        // if already exists in database, it means it's already accepted
        // thus no need to verify once more
        if self.state.get_block(&self.id).await.is_ok() {
            log::debug!("block {} already verified", self.id);
            return Ok(());
        }

        let prnt_blk = self.state.get_block(&self.parent_id).await?;

        if prnt_blk.height != self.height - 1 {
            return Err(Error::new(
                ErrorKind::InvalidData,
                format!(
                    "parent block height {} != current block height {} - 1",
                    prnt_blk.height, self.height
                ),
            ));
        }

        if prnt_blk.timestamp > self.timestamp {
            return Err(Error::new(
                ErrorKind::InvalidData,
                format!(
                    "parent block timestamp {} > current block timestamp {}",
                    prnt_blk.timestamp, self.timestamp
                ),
            ));
        }

        self.state.add_verified(&self.clone()).await;
        Ok(())
    }

    /// Mark this Block accepted and updates State accordingly.
    pub async fn accept(&mut self) -> io::Result<()> {
        self.set_status(choices::status::Status::Accepted);

        // only decided blocks are persistent -- no reorg
        self.state.write_block(&self.clone()).await?;
        self.state.set_last_accepted_block(&self.id()).await?;

        self.state.remove_verified(&self.id()).await;
        Ok(())
    }

    /// Mark this Block rejected and updates State accordingly.
    pub async fn reject(&mut self) -> io::Result<()> {
        self.set_status(choices::status::Status::Rejected);

        // only decided blocks are persistent -- no reorg
        self.state.write_block(&self.clone()).await?;

        self.state.remove_verified(&self.id()).await;
        Ok(())
    }
}
```

#### verify

This method verifies that a block is valid and stores it in the memory. It is important to store the verified block in the memory and return them in the `vm.get_block()` method.

```rust title="/timestampvm/src/block/mod.rs"
/// Verify returns Ok if the block is valid.
/// Verifies Block properties (e.g., heights),
/// b.parent.Timestamp < b.Timestamp <= [local time] + 1 hour
/// and once verified, records to State memory.
pub async fn verify(&mut self) -> io::Result<()> {
    if self.height == 0 && self.parent_id == ids::Id::empty() {
        log::debug!(
            "block {} has an empty parent Id since it's a genesis block -- skipping verify",
            self.id
        );
        self.state.add_verified(&self.clone()).await;
        return Ok(());
    }

    // if already exists in database, it means it's already accepted
    // thus no need to verify once more
    if self.state.get_block(&self.id).await.is_ok() {
        log::debug!("block {} already verified", self.id);
        return Ok(());
    }

    let prnt_blk = self.state.get_block(&self.parent_id).await?;

    // ensure the height of the block is immediately following its parent
    if prnt_blk.height != self.height - 1 {
        return Err(Error::new(
            ErrorKind::InvalidData,
            format!(
                "parent block height {} != current block height {} - 1",
                prnt_blk.height, self.height
            ),
        ));
    }

    // ensure block timestamp is after its parent
    if prnt_blk.timestamp > self.timestamp {
        return Err(Error::new(
            ErrorKind::InvalidData,
            format!(
                "parent block timestamp {} > current block timestamp {}",
                prnt_blk.timestamp, self.timestamp
            ),
        ));
    }

    // ensure block timestamp is no more than an hour ahead of this nodes time
    if self.timestamp as i64 >= (Utc::now() + Duration::hours(1)).timestamp() {
        return Err(Error::new(
            ErrorKind::InvalidData,
            format!(
                "block timestamp {} is more than 1 hour ahead of local time",
                self.timestamp
            ),
        ));
    }

    // add newly verified block to memory
    self.state.add_verified(&self.clone()).await;
    Ok(())
}
```

#### accept

`Accept` is called by the consensus engine to indicate this block is accepted.

```rust title="/timestampvm/src/block/mod.rs"
/// Mark this Block accepted and update State accordingly.
pub async fn accept(&mut self) -> io::Result<()> {
    self.set_status(choices::status::Status::Accepted);

    // only decided blocks are persistent -- no reorg
    self.state.write_block(&self.clone()).await?;
    self.state.set_last_accepted_block(&self.id()).await?;

    self.state.remove_verified(&self.id()).await;
    Ok(())
}
```

#### reject

`Reject` is called by the consensus engine to indicate the block is rejected.

```rust title="/timestampvm/src/block/mod.rs"
/// Mark this Block rejected and update State accordingly.
pub async fn reject(&mut self) -> io::Result<()> {
    self.set_status(choices::status::Status::Rejected);

    // only decided blocks are persistent -- no reorg
    self.state.write_block(&self.clone()).await?;

    self.state.remove_verified(&self.id()).await;
    Ok(())
}
```

#### Block Field Methods

These methods are required by the `snowman::Block` trait.

```rust title="/timestampvm/src/block/mod.rs"
impl subnet::rpc::consensus::snowman::Block for Block {
    async fn bytes(&self) -> &[u8] {
        return self.bytes.as_ref();
    }

    async fn to_bytes(&self) -> io::Result<Vec<u8>> {
        self.to_slice()
    }

    async fn height(&self) -> u64 {
        self.height
    }

    async fn timestamp(&self) -> u64 {
        self.timestamp
    }

    async fn parent(&self) -> ids::Id {
        self.parent_id.clone()
    }

    async fn verify(&mut self) -> io::Result<()> {
        self.verify().await
    }
}
```

#### Helper Functions

These methods are convenience methods for blocks.

```rust title="/timestampvm/src/block/mod.rs"
impl subnet::rpc::consensus::snowman::Initializer for Block {
	/// Initializes a block from a bytes slice and status.
    async fn init(&mut self, bytes: &[u8], status: choices::status::Status) -> io::Result<()> {
        *self = Block::from_slice(bytes)?;
        self.status = status;

        Ok(())
    }
}

impl subnet::rpc::consensus::snowman::StatusWriter for Block {
	/// Updates the status of this block.
    async fn set_status(&mut self, status: choices::status::Status) {
        self.set_status(status)
    }
}

```

### Virtual Machine

Now, let’s look at our timestamp VM implementation, which implements the `block::ChainVM` trait.


```rust title="/timestampvm/src/vm/mod.rs"
pub struct Vm {
    /// Maintains the Vm-specific states.
    pub state: Arc<RwLock<VmState>>,
    pub app_sender: Option<Box<dyn subnet::rpc::common::appsender::AppSender + Send + Sync>>,

    /// A queue of data that have not been put into a block and proposed yet.
    /// Mempool is not persistent, so just keep in memory via Vm.
    pub mempool: Arc<RwLock<VecDeque<Vec<u8>>>>,
}

/// Represents VM-specific states.
/// Defined in a separate struct, for interior mutability in [`Vm`](Vm).
/// To be protected with `Arc` and `RwLock`.
pub struct VmState {
    pub ctx: Option<subnet::rpc::context::Context>,
    pub version: Version,
    pub genesis: Genesis,

    /// Represents persistent Vm state.
    pub state: Option<state::State>,
    /// Currently preferred block Id.
    pub preferred: ids::Id,
    /// Channel to send messages to the snowman consensus engine.
    pub to_engine: Option<Sender<subnet::rpc::common::message::Message>>,
    /// Set "true" to indicate that the Vm has finished bootstrapping
    /// for the chain.
    pub bootstrapped: bool,
}
```

#### initialize

This method is called when a new instance of VM is initialized. Genesis block is created under this method.

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
    log::info!("initializing Vm");
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
        log::info!("initialized Vm with last accepted block {last_accepted_blk_id}");
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
        log::info!("initialized Vm with genesis block {genesis_blk_id}");
    }

    self.mempool = Arc::new(RwLock::new(VecDeque::with_capacity(100)));

    log::info!("successfully initialized Vm");
    Ok(())
}
```

#### create_handlers

Registered handlers defined in `api::chain_handlers::Service`. See [below](create-a-simple-rust-vm.md#api) for more on APIs.

```rust title="/timestampvm/src/vm/mod.rs"
/// Creates VM-specific handlers.
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

#### create_static_handlers

Registered handlers defined in `api::chain_handlers::Service`. See [below](create-a-simple-rust-vm.md#api) for more on APIs.

Note: If this method is called, no other method will be called on this VM.
Each registered VM will have a single instance created to handle static
APIs. This instance will be handled separately from instances created to
service an instance of a chain.

```rust title="/timestampvm/src/vm/mod.rs"
/// Creates static handlers.
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
#### build_block

`build_block` builds a new block and returns it. This is mainly requested by the consensus engine.

```rust title="/timestampvm/src/vm/mod.rs"
/// Builds a block from mempool data.
async fn build_block(
    &self,
) -> io::Result<Box<dyn subnet::rpc::consensus::snowman::Block + Send + Sync>> {
    let mut mempool = self.mempool.write().await;

    log::info!("build_block called for {} mempool", mempool.len());
    if mempool.is_empty() {
        return Err(Error::new(ErrorKind::Other, "no pending block"));
    }

    let vm_state = self.state.read().await;
    if let Some(state) = &vm_state.state {
        self.notify_block_ready().await;

        // "state" must have preferred block in cache/verified_block
        // otherwise, not found error from rpcchainvm database
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

        log::info!("successfully built block");
        return Ok(Box::new(block));
    }

    Err(Error::new(ErrorKind::NotFound, "state manager not found"))
}
```

#### notify_block_ready

Signals the consensus engine that a new block is ready to be created.
After this is sent the concensus engine will call back to `vm.build_block`.

```rust title="/timestampvm/src/vm/mod.rs"
pub async fn notify_block_ready(&self) {
    let vm_state = self.state.read().await;
    if let Some(engine) = &vm_state.to_engine {
        engine
            .send(subnet::rpc::common::message::Message::PendingTxs)
            .await
            .unwrap_or_else(|e| log::warn!("dropping message to consensus engine: {}", e));

        log::info!("notified block ready!");
    } else {
        log::error!("consensus engine channel failed to initialized");
    }
}
```

#### get_block

`get_block` returns the block with the given block ID.

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

        Err(Error::new(ErrorKind::NotFound, "state manager not found"))
    }
}
```
#### propose_block

Proposes arbitrary data to mempool and notifies that a block is ready for builds.
Other VMs may optimize mempool with more complicated batching mechanisms.

```rust title="/timestampvm/src/vm/mod.rs"
pub async fn propose_block(&self, d: Vec<u8>) -> io::Result<()> {
    let size = d.len();
    log::info!("received propose_block of {size} bytes");

    if size > PROPOSE_LIMIT_BYTES {
        log::info!("limit exceeded... returning an error...");
        return Err(Error::new(
            ErrorKind::InvalidInput,
            format!(
                "data {}-byte exceeds the limit {}-byte",
                size, PROPOSE_LIMIT_BYTES
            ),
        ));
    }

    let mut mempool = self.mempool.write().await;
    mempool.push_back(d);
    log::info!("proposed {size} bytes of data for a block");

    self.notify_block_ready().await;
    Ok(())
}
```
#### parse_block

Parse a block from its byte representation.

```rust title="/timestampvm/src/vm/mod.rs"
impl subnet::rpc::snowman::block::Parser for Vm {
    async fn parse_block(
        &self,
        bytes: &[u8],
    ) -> io::Result<Box<dyn subnet::rpc::consensus::snowman::Block + Send + Sync>> {
        let vm_state = self.state.read().await;
        if let Some(state) = &vm_state.state {
            let mut new_block = Block::from_slice(bytes)?;
            new_block.set_status(choices::status::Status::Processing);
            new_block.set_state(state.clone());
            log::debug!("parsed block {}", new_block.id());

            match state.get_block(&new_block.id()).await {
                Ok(prev) => {
                    log::debug!("returning previously parsed block {}", prev.id());
                    return Ok(Box::new(prev));
                }
                Err(_) => return Ok(Box::new(new_block)),
            };
        }

        Err(Error::new(ErrorKind::NotFound, "state manager not found"))
    }
}
```

#### set_preference

```rust title="/timestampvm/src/vm/mod.rs"
/// Sets the container preference of the Vm.
pub async fn set_preference(&self, id: ids::Id) -> io::Result<()> {
    let mut vm_state = self.state.write().await;
    vm_state.preferred = id;

    Ok(())
}
```
#### Other Functions

### Factory

### Static API

#### Encode

#### Decode

### API

In the below examples "2wb1UXxAstB8ywwv4rU2rFCjLgXnhT44hbLPbwpQoGvFb2wRR7" is the blockchain Id.

#### timestampvm.getBlock

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "id"     : 1,
    "method" : "timestampvm.getBlock",
    "params" : [{"id":"SDfFUzkdzWZbJ6YMysPPNEF5dWLp9q35mEMaLa8Ha2w9aMKoC"}]
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/2wb1UXxAstB8ywwv4rU2rFCjLgXnhT44hbLPbwpQoGvFb2wRR7/rpc

# example response
# {"jsonrpc":"2.0","result":{"block":{"data":"0x32596655705939524358","height":0,"parent_id":"11111111111111111111111111111111LpoYY","timestamp":0}},"id":1}
```

#### timestampvm.proposeBlock

```sh
# to propose data
echo 1 | base64 | tr -d \\n
# MQo=

curl -X POST --data '{
    "jsonrpc": "2.0",
    "id"     : 1,
    "method" : "timestampvm.proposeBlock",
    "params" : [{"data":"MQo="}]
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/2wb1UXxAstB8ywwv4rU2rFCjLgXnhT44hbLPbwpQoGvFb2wRR7/rpc

# example response
# {"jsonrpc":"2.0","result":{"success":true},"id":1}
```

#### timestampvm.lastAccepted

Returns the Id of the last accepted block

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "id"     : 1,
    "method" : "timestampvm.lastAccepted",
    "params" : []
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/2wb1UXxAstB8ywwv4rU2rFCjLgXnhT44hbLPbwpQoGvFb2wRR7/rpc

# example response
# {"jsonrpc":"2.0","result":{"id":"SDfFUzkdzWZbJ6YMysPPNEF5dWLp9q35mEMaLa8Ha2w9aMKoC"},"id":1}
```

### Plugin

### Executable Binary

### VM Aliases

### Installing a VM

AvalancheGo searches for and registers plugins under the `plugins` directory of the
[build directory](../nodes/maintain/avalanchego-config-flags#build-directory).

To install the virtual machine onto your node, you need to move the built virtual machine binary under this directory.
Virtual machine executable names must be either a full virtual machine ID (encoded in CB58), or a VM alias.

Copy the binary into the plugins directory.

```bash
cp -n <path to your binary> $GOPATH/src/github.com/ava-labs/avalanchego/build/plugins/
```

#### Node Is Not Running

If your node isn't running yet, you can install all virtual machines under your `plugin` directory by starting the node.

#### Node Is Already Running

Load the binary with the `loadVMs` API.

```bash
curl -sX POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.loadVMs",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

Confirm the response of `loadVMs` contains the newly installed virtual machine
`tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH`. You'll see this virtual machine as well as any others that weren't
already installed previously in the response.

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

Now, this VM's static API can be accessed at endpoints `/ext/vm/timestampvm` and `/ext/vm/timestamp`.
For more details about VM configs, see [here](../nodes/maintain/avalanchego-config-flags.md#vm-configs).

In this tutorial, we used the VM's ID as the executable name to simplify the process. However, AvalancheGo would also
accept `timestampvm` or `timestamp` since those are registered aliases in previous step.

## Wrapping Up

That’s it! That’s the entire implementation of a VM which defines a blockchain-based timestamp server.

In this tutorial, we learned:

- The `block::ChainVM` trait, which all VMs that define a linear chain must implement
- The `snowman::Block` trait, which all blocks that are part of a linear chain must implement
- The `subnet` mod, which allows blockchains to run in their own processes using the `rpcchainvm`.
- An actual implementation of `block::ChainVM` and `snowman::Block`.
