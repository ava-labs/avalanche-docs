# How to Build a Simple Rust VM

This is part of a series of tutorials for building a Virtual Machine (VM):

- [Introduction to VMs](./introduction-to-vm.md)
- [How to Build a Complex VM](./create-a-vm-blobvm.md)
- How to Build a Simple Rust VM (this article)

## Introduction

In this tutorial, we’ll create a very simple Rust VM called the [TimestampVM](https://github.com/ava-labs/timestampvm-rs). Each block in the TimestampVM's blockchain contains a strictly increasing timestamp when the block was created and a 32-byte payload of data.

Such a server is useful because it can be used to prove a piece of data existed at the time the block was created. Suppose you have a book manuscript, and you want to be able to prove in the future that the manuscript exists today. You can add a block to the blockchain where the block’s payload is a hash of your manuscript. In the future, you can prove that the manuscript existed today by showing that the block has the hash of your manuscript in its payload (this follows from the fact that finding the pre-image of a hash is impossible).

## Prerequisites

Make sure you're familiar with the previous tutorial in this series, which dives into what virtual machines are.

- [Introduction to VMs](./introduction-to-vm.md)

## TimestampVM Implementation

Now we know the interface our VM must implement and the libraries we can use to build a VM using the Rust SDK.

Let’s write our VM, which implements `block.ChainVM` and whose blocks implement `snowman.Block`. You can also follow the code in the [TimestampVM repository](https://github.com/ava-labs/timestampvm-rs).

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

#### Verify

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

#### Accept

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

#### Reject

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

#### Initialize

#### CreateHandlers

#### CreateStaticHandlers

#### BuildBock

#### NotifyBlockReady

#### GetBlock

#### proposeBlock

#### ParseBlock

#### NewBlock

#### SetPreference

#### Other Functions

### Factory

### Static API

#### Encode

#### Decode

### API

#### timestampvm.getBlock

#### timestampvm.proposeBlock

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

- The `block.ChainVM` interface, which all VMs that define a linear chain must implement
- The `snowman.Block` interface, which all blocks that are part of a linear chain must implement
- The `rpcchainvm` type, which allows blockchains to run in their own processes.
- An actual implementation of `block.ChainVM` and `snowman.Block`.
