# Blueberry Changes

This document specifies changes in Avalanche Blueberry (AvalanchGo v1.8.0) from Apricot (AvalanchGo v1.1.0 to v1.7.18).

## Block Composition and Formation Logic

AvalancheGo v1.8.0 (Blueberry) slightly changes the way the P-chain selects transactions to be included in next block and deals with block timestamps. In this brief document we detail the process and the changes.

### Apricot

#### Block Content

Currently, Apricot allows the following block types with the following content:

- _Standard Blocks_ may contain multiple transactions of the following types:
  - CreateChainTx
  - CreateSubnetTx
  - ImportTx
  - ExportTx
- _Proposal Blocks_ may contain a single transaction of the following types:
  - AddValidatorTx
  - AddDelegatorTx
  - AddSubnetValidatorTx
  - RewardValidatorTx
  - AdvanceTimeTx
- _Options blocks_, i.e. _Commit Block_ and _Abort Block_ do not contain any transaction.

Note that _Atomic Blocks_ have been deprecated during Apricot. They used to contain `ImportTx` and `ExportTx` which are now included in the _Standard Blocks_.

Each block has an header containing:

- ParentID
- Height

Note that Apricot block headers do not contain any block timestamp.

#### Block Formation Logic

Transactions included in an Apricot block can originate from the mempool or can be created just in time to duly update the staker set. Block formation logic in Apricot can be broken up into two high-level steps:

- First, we try to select any candidate decision or proposal transactions which could be included in a block _without advancing the current chain time_;
- If no such transactions are found, we evaluate candidate transactions which _may require advancing chain time_. If a chain time advancement is required to include these transactions in a block, a proposal block with an advance time transaction is built first; selected transactions may be included in a subsequent block.

In more detail, blocks which do not change chain time are built as follows:

1. If mempool contains any decision transactions, a Standard Block is issued with all of the transactions the default block size can accommodate. Note that Apricot Standard Blocks do not change the current chain time.
2. If the current chain time matches any staker's staking ending time, a reward transaction is issued into a Proposal Block to initiate network voting on whether the specified staker should be rewarded. Note that there could be multiple stakers ending their staking period at the same chain time, hence a Proposal Block must be issued for all of them before the chain time is moved ahead. Any attempt to move chain time ahead before rewarding all stakers would fail block verification.

While the above steps could be executed in any order, we pick decisions transactions first to maximize throughput.

Once all possibilities of create a block not advancing chain time are exhausted, we attempt to build a block which _may_ advance chain time as follows:

1. If the local clock's time is greater than or equal to the earliest change-event timestamp of the staker set, an advance time transaction is issued into a Proposal Block to move current chain time to the earliest change timestamp of the staker set. Upon this Proposal block's acceptance, chain time will be move ahead and all scheduled changes (e.g. promoting a staker from pending to current) will be carried out.
2. If the mempool contains any proposal transactions, the mempool proposal transaction with the earliest start time is selected and included into a Proposal Block[^1]. A mempool proposal transaction as is won't change the current chain time[^2]. However there is an edge case to consider: on low activity chains (e.g. Fuji P-chain) chain time may fall significantly behind the local clock. If a proposal transaction is finally issued, its start time is likely to be quite far in the future relative to the current chain time. This would cause the proposal transaction to be considered invalid and rejected, since a staker added by a proposal transaction's start time must be at most 366 hours (two weeks) after current chain time. To avoid this edge case on low-activity chains, an advance time transaction is issued first to move chain time to the local clock's time. As soon as chain time is advanced, the mempool proposal transaction will be issued and accepted.

Note that the order in which these steps are executed matters. A block updating chain time would be deemed invalid if it would advance time beyond the staker set's next change event, skipping the associated changes. The order above ensures this never happens because it checks first if chain time should be moved to the time of the next staker set change. It can also be verified by inspection that the timestamp selected for the advance time transactions always respect the synchrony bound.

Block formation terminates as soon as any of the steps executed manage to select transactions to be included into a block. Otherwise, an error is raised to signal that there are no transactions to be issued. Finally a timer is kicked off to schedule the next block formation attempt.

### Blueberry

#### Blueberry Block Content

Blueberry allows the following block types with the following content:

- _Standard Blocks_ may contain multiple transactions of the following types:
  - CreateChainTx
  - CreateSubnetTx,
  - ImportTx,
  - ExportTx,
  - AddValidatorTx,
  - AddDelegatorTx,
  - AddSubnetValidatorTx.
- _Proposal Blocks_ may contain a single transaction of the following type:
  - RewardValidatorTx,
- _Options blocks_, i.e. _Commit Block_ and _Abort Block_ do not contain any transactions.

Note that each block has an header containing:

- ParentID
- Height
- Time

So the main differences with respect to Apricot are:

- _AddValidatorTx_, _AddDelegatorTx_, _AddSubnetValidatorTx_ are included into Standard Blocks rather than Proposal Blocks so that they don't need to be voted on (i.e. followed by a Commit/Abort block).
- Block timestamp is explicitly serialized into block header, to allow chain time update.
- _AdvanceTimeTx_ transactions is not accepted anymore, for reasons explained in section [Chain Time Update Mechanism](#chain-time-update-mechanism)

#### Blueberry Block Formation Logic

The activation of the Blueberry upgrade only makes minor changes to the way the P-chain selects transactions to be included in next block, such as block timestamp calculation. Below are the details of changes.

Operations are carried out in the following order:

- A Standard Block is first filled with mempool decision transactions.
- All stakers are checked to see if any of them needs to be rewarded by issuing as many Proposal Blocks as needed, as above.
- Chain time is moved ahead to the earliest staker set change event. Unlike Apricot, here a Standard Block is issued with no transactions whose timestamp is the proposed chain time. A Standard Block does not require any voting, and will be either accepted or rejected. Hence this solution is marginally faster.
- A Proposal Block is built with one mempool proposal transaction, if any. No changes to chain time are proposed here.

[^1]: Proposal transactions whose start time is too close to local time are dropped first and won't be included in any block. TODO: I am not sure why is this, but it's coherent with P-chain API dropping any AddValidator/Delegator/SubnetValidator request whose start time is too close.
[^2]: Of course advance time transactions are proposal transactions and they do change chain time. But advance time transactions are generated just in time and never stored in a mempool. Here I refer to mempool proposal transactions which are AddValidator, AddDelegator and AddSubnetValidator. Reward delegator transaction is a proposal transaction which does not change chain time but which is never in mempool (it's generated just in time).

## Chain Time Update Mechanism

The activation of the Blueberry changes the way P-chain tracks its `ChainTime`. In this brief document we detail these changes.

### About `ChainTime`

One of the P-chain's main responsibilities is to record staking periods of any staker (i.e. any validator or delegator) on any subnet to duly reward their activity.

The P-chain tracks a network agrees timestamp called `ChainTime` that allows nodes to reach agreement about when a staker starts and stops its staking time. These start/stop times are basic inputs to determine whether the staker should be rewarded based on what percentage of `ChainTime` it is perceived as active from other validators.

Note that this `ChainTime` has nothing to do with the `Snowman++` timestamp. `Snowman++` timestamps are local times used to reduce network congestion and have no role in rewarding of any staker.

### Apricot

In current Apricot, `ChainTime` is incremented by an `AdvanceTimeTx` transaction, being included into a `ProposalBlock` block type. Validators voted on `ChainTime` advance by accepting either the `CommitBlock` or the `AbortBlock` following the `ProposalBlock`. `ChainTime` was moved ahead only if the `CommitBlock` was accepted.

`AdvanceTimeTx` transactions are zero-fee transactions subject to three main validations:

1. _Strict Monotonicity_: proposed time must be _strictly_ greater than current `ChainTime`.
2. _Synchronicity_: proposed time must not be greater than node’s current time plus a synchronicity bound (currently set to 10 seconds).
3. _No Skipping_: proposed time must be less than or equal to the next staking event, that is start/end of any staker.

Note that _Synchronicity_ makes sure that `ChainTime` approximate “real” time flow. If we dropped synchronicity requirement, a staker could declare any staking time and immediately push `ChainTime` to the end, so as to pocket a reward without having actually carried out any activity in the “real” time.

### Blueberry

Following the Blueberry activation, `AdvanceTimeTxs` cannot be included anymore in any block. Instead, each P-chain block type explicitly serializes a timestamp so that `ChainTime` is set to the block timestamp once the block is accepted.

Validation rules for block timestamps varies slightly depending on block types:

- `CommitBlock`s and `AbortBlock`s timestamp must be equal to the timestamp of the `ProposalBlock` they depend upon.
- `StandardBlock`s and `ProposalBlock`s share `AdvanceTimeTx`s validation rules with the exception of the _strict monotonicity_:
  1. _Monotonicity_: block timestamp must be _greater than or equal to_ the current `ChainTime` (which is also its parent's timestamp if the parent was accepted).
  2. _Synchronicity_: block timestamp must not be greater than node’s current time plus a synchronicity bound (currently set to 10 seconds).
  3. _No Skipping_: proposed time must be less than or equal to the next staking event (a staker starting or stopping).

### Serialization changes

However upon Blueberry activation some transactions and blocks type will be forbidden, while some new block types will be allowed. Specifically:

- The following block types will be forbidden [^3]:
  - `blocks.ApricotAbortBlock`
  - `blocks.ApricotCommitBlock`
  - `blocks.ApricotProposalBlock`
  - `blocks.ApricotStandardBlock`
- The following tx types will be forbidden:
  - `AdvanceTimeTx`
- The following block types will be allowed:
  - `blocks.BlueberryAbortBlock`
  - `blocks.BlueberryCommitBlock`
  - `blocks.BlueberryProposalBlock`
  - `blocks.BlueberryStandardBlock`

Note that unlike `blocks.Apricot*` blocks, `blocks.Blueberry*` blocks will serialize block timestamp.

Note Blueberry won't change any transactions format, so transactions byte representation is fully backward compatible. Also Blueberry won't change any codec version

[^3]: Note that avalanchego codebase includes `blocks.ApricotAtomicBlock`, which has been forbidden on Apricot Phase 5 upgrade. This type is kept just to allow bootstrapping from genesis and it is forbidden on Blueberry as well as subsequent Apricot upgrades.
