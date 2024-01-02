---
tags: [Build, Virtual Machines]
description: Understand how the VM itself is structured in TimestampVM
sidebar_label: Defining the VM Itself
pagination_label: Defining the VM Itself
sidebar_position: 5
---

# Architecture of the TimestampVM

After examining several of the data structures and functionalities that TimestampVM relies on, it is time that we examine the architecture of the TimestampVM itself. In addition, we will look at some data structures that TimestampVM utilizes.

## Aside: SnowmanVM

In addition to blocks having to adhere to the `Snowman.Block` interface, VMs which interact with the Snowman Consensus Engine must also implement the `SnowmanVM` interface. In the context of a Rust-based VM, this means that we must satisfy the `ChainVM` trait in `avalanche-types`:

```rust title="avalanche-types/src/subnet/rpc/snowman/block.rs"
/// ref. <https://pkg.go.dev/github.com/ava-labs/avalanchego/snow/engine/snowman/block#ChainVm>
#[tonic::async_trait]
pub trait ChainVm: CommonVm + BatchedChainVm + Getter + Parser {
    type Block: snowman::Block;

    /// Attempt to create a new block from ChainVm data
    /// Returns either a block or an error
    async fn build_block(&self) -> Result<<Self as ChainVm>::Block>;

    /// Issues a transaction to the chain
    async fn issue_tx(&self) -> Result<<Self as ChainVm>::Block>;

    /// Notify the Vm of the currently preferred block.
    async fn set_preference(&self, id: Id) -> Result<()>;

    /// Returns the ID of the last accepted block.
    /// If no blocks have been accepted, this should return the genesis block
    async fn last_accepted(&self) -> Result<Id>;

    /// Returns empty if the height index is available.
    /// Returns ErrIndexIncomplete if the height index is not currently available.
    /// TODO: Remove after v1.11.x activates.
    async fn verify_height_index(&self) -> Result<()>;

    /// Returns the ID of the block that was accepted with [height].
    /// Returns ErrNotFound if the [height] index is unknown.
    async fn get_block_id_at_height(&self, height: u64) -> Result<Id>;

    /// Returns whether state sync is enabled.
    async fn state_sync_enabled(&self) -> Result<bool>;
}
```

## Defining TimestampVM

Below is the definition of the VM struct which represents TimestampVM:

```rust title="timestampvm/src/vm/mod.rs"
pub struct Vm<A> {
    /// Maintains the Vm-specific states.
    pub state: Arc<RwLock<State>>,
    pub app_sender: Option<A>,

    /// A queue of data that have not been put into a block and proposed yet.
    /// Mempool is not persistent, so just keep in memory via Vm.
    pub mempool: Arc<RwLock<VecDeque<Vec<u8>>>>,
}
```

We see the following three fields:

- `state`: a data structure which represents the state of the VM. Note that the `state` field is a completely different data structure than the `State` data structure we saw earlier in the Case Study.
- `app_sender`: a channel for which our VM can receive and send requests
- `mempool`: as the field name might suggest, this is where proposed blocks from external users are kept. 

We now examine the `state` data structure mentioned earlier:

```rust title="timestampvm/src/vm/mod.rs"
/// Represents VM-specific states.
/// Defined in a separate struct, for interior mutability in [`Vm`](Vm).
/// To be protected with `Arc` and `RwLock`.
pub struct State {
    pub ctx: Option<Context<ValidatorStateClient>>,
    pub version: Version,
    pub genesis: Genesis,

    /// Represents persistent Vm state.
    pub state: Option<state::State>,
    /// Currently preferred block Id.
    pub preferred: ids::Id,
    /// Channel to send messages to the snowman consensus engine.
    pub to_engine: Option<Sender<snow::engine::common::message::Message>>,
    /// Set "true" to indicate that the Vm has finished bootstrapping
    /// for the chain.
    pub bootstrapped: bool,
}
```

We now see the relationship between the `State` and `state` data structure - `State` contains `state` alongside other fields which are relevant to the Snowman consensus algorithm.
