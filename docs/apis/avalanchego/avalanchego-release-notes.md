# Release Notes

:::info

[Upgrade Your AvalancheGo Node](../../nodes/maintain/upgrade-your-avalanchego-node.md)

:::

## V1.9.9 [View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.9.9)

**Banff.9 - gRPC Plugin Protocol**

This version is backwards compatible to
[v1.9.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.9.0).
It is optional, but encouraged. The supported plugin version is `23`.

**Note: The `--whitelisted-subnets` flag was deprecated in `v1.9.6`. 
This is the last release in which it will be supported. Use `--track-subnets` instead.**

### Monitoring

- Added warning when the P2P server IP is private
- Added warning when the HTTP server IP is potentially publicly reachable
- Removed `merkledb.trieView#calculateIDs` tracing when no recalculation is needed

**Databases**

- Capped the number of goroutines that `merkledb.trieView#calculateIDsConcurrent` will create
- Removed `nodb` package
- Refactored `Batch` implementations to share common code
- Added `Batch.Replay` invariant tests
- Converted to use `require` in all `database` interface tests

**Cryptography**

- Moved the `secp256k1` implementations to a new `secp256k1` package out of the `crypto` package
- Added `rfc6979` compliance tests to the `secp256k1` signing implementation
- Removed unused cryptography implementations `ed25519`, `rsa`, and `rsapss`
- Removed unnecessary cryptography interfaces `crypto.Factory`, `crypto.RecoverableFactory`,
  `crypto.PublicKey`, and `crypto.PrivateKey`
- Added verification when parsing `secp256k1` public keys to ensure usage of the compressed format

**API**

- Removed delegators from `platform.getCurrentValidators` unless a single `nodeID` is requested
- Added `delegatorCount` and `delegatorWeight` to the validators returned by `platform.getCurrentValidators`

**Documentation**

- Improved documentation on the `block.WithVerifyContext` interface
- Fixed `--public-ip` and `--public-ip-resolution-service` CLI flag descriptions
- Updated `README.md` to explicitly reference `SECURITY.md`

**Coreth**

- Enabled state sync by default when syncing from an empty database
- Increased block gas limit to 15M for `Cortina` Network Upgrade
- Added back file tracer endpoint
- Added back JS tracer

**Miscellaneous**

- Added `allowedNodes` to the Subnet config for `validatorOnly` Subnets
- Removed the `hashicorp/go-plugin` dependency to improve plugin flexibility
- Replaced specialized `bag` implementations with generic `bag` implementations
- Added `mempool` package to the `avm`
- Added `chain.State#IsProcessing` to simplify integration with `block.WithVerifyContext`
- Added `StateSyncMinVersion` to `sync.ClientConfig`
- Added validity checks for `InitialStakeDuration` in a custom network genesis
- Removed unnecessary reflect call when marshalling an empty slice

**Cleanup**

- Renamed `teleporter` package to `warp`
- Replaced `bool` flags in P-chain state diffs with an `enum`
- Refactored Subnet configs to more closely align between the primary network and Subnets
- Simplified the `utxo.Spender` interface
- Removed unused field `common.Config#Validators`

## V1.9.8 [View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.9.8)

**Banff.8 - PROXY Protocol**

This version is backwards compatible to
[v1.9.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.9.0). It is
optional, but encouraged. The supported plugin version is `22`.

**Networking**

- Added TCP proxy support for p2p network traffic
- Added p2p network client utility for directly messaging the p2p network

**Consensus**

- Guaranteed delivery of App messages to the VM, regardless of sync status
- Added `EngineType` to consensus context

**MerkleDB - Alpha**

- Added initial implementation of a path-based merkle-radix tree
- Added initial implementation of state sync powered by the merkledb

**APIs**

- Updated `platform.getCurrentValidators` to return `uptime` as a percentage
- Updated `platform.get*Validators` to avoid iterating over the staker set when requesting specific NodeIDs
- Cached staker data in `platform.get*Validators` to significantly reduce DB IO
- Added `stakeAmount` and `weight` to all staker responses in P-chain APIs
- Deprecated `stakeAmount` in staker responses from P-chain APIs
- Removed `creationTxFee` from `info.GetTxFeeResponse`
- Removed `address` from `platformvm.GetBalanceRequest`

**Fixes**

- Fixed `RemoveSubnetValidatorTx` weight diff corruption
- Released network lock before attempting to close a peer connection
- Fixed X-Chain last accepted block initialization to use the genesis block,
  not the stop vertex after linearization
- Removed plugin directory handling from AMI generation
- Removed copy of plugins directory from tar script

**Cleanup**

- Removed unused rpm packaging scripts
- Removed engine dependency from chain registrants
- Removed unused field from chain handler log
- Linted custom test `chains.Manager`
- Used generic btree implementation
- Deleted `utils.CopyBytes`
- Updated rjeczalik/notify from v0.9.2 to v0.9.3

**Miscellaneous**

- Added AVM `state.Chain` interface
- Added generic atomic value utility
- Added test for the AMI builder during RCs
- Converted cache implementations to use generics
- Added optional cache eviction callback


## V1.9.7 [View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.9.7)

**Banff.7 - Subnet Validator Look-ups**

This version is backwards compatible to 
[v1.9.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.9.0). It is 
optional, but encouraged. The supported plugin version is `22`.

**Fixes**

- Fixed Subnet validator lookup regression


## V1.9.6 [View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.9.6)

**Banff.6 - Dynamic State Syncing Support**

This version is backwards compatible to
[v1.9.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.9.0). It is
optional, but encouraged. The supported plugin version is `22`.

**Consensus**

- Added `StateSyncMode` to the return of `StateSummary#Accept` to support
  syncing chain state while tracking the chain as a light client
- Added `AcceptedFrontier` to `Chits` messages
- Reduced unnecessary confidence resets during consensus by applying
  `AcceptedFrontier`s during `QueryFailed` handling
- Added EngineType for consensus messages in the p2p message definitions
- Updated `vertex.DAGVM` interface to support linearization

**Configs**

- Added `--plugin-dir` flag. The default value is `[DATADIR]/plugins`
- Removed `--build-dir` flag. The location of the AvalancheGo binary is no
  longer considered when looking for the `plugins` directory. Subnet maintainers
  should ensure that their node is able to properly discover plugins, as the
  default location is likely changed. See `--plugin-dir`
- Changed the default value of `--api-keystore-enabled` to `false`
- Added `--track-subnets` flag as a replacement of `--whitelisted-subnets`

**Fixes**

- Fixed NAT-PMP router discovery and port mapping
- Fixed `--staking-enabled=false` setting to correctly start Subnet chains and report healthy
- Fixed message logging in the consensus handler

**VMs**

- Populated non-trivial logger in the `rpcchainvm` `Server`'s `snow.Context`
- Updated `rpcchainvm` Proto definitions to use Enums
- Added `Block` format and definition to the `AVM`
- Removed `proposervm` height index reset

**Metrics**

- Added `avalanche_network_peer_connected_duration_average` metric
- Added `avalanche_api_calls_processing` metric
- Added `avalanche_api_calls` metric
- Added `avalanche_api_calls_duration` metric

**Documentation**

- Added wallet example to create `stakeable.LockOut` outputs
- Improved Ubuntu deb install instructions

**Miscellaneous**

- Updated ledger-avalanche to v0.6.5
- Added linter to ban the usage of `fmt.Errorf` without format directives
- Added `List` to the `buffer#Deque` interface
- Added `Index` to the `buffer#Deque` interface
- Added `SetLevel` to the `Logger` interface
- Updated `auth` API to use the new `jwt` standard


## V1.9.5 [View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.9.5)

**Banff.5 - Warp Messaging**

This version is backwards compatible to
[v1.9.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.9.0). It is
optional, but encouraged. The supported plugin version is `21`.

**Subnet Messaging**

- Added Subnet message serialization format
- Added Subnet message signing
- Replaced `bls.SecretKey` with a `teleporter.Signer` in the `snow.Context`
- Moved `SNLookup` into the `validators.State` interface to support
  non-whitelisted chainID to subnetID lookups
- Added support for non-whitelisted subnetIDs for fetching the validator set at a given height
- Added Subnet message verification
- Added `teleporter.AnycastID` to denote a Subnet message not intended for a specific chain

**Fixes**

- Added re-gossip of updated validator IPs
- Fixed `rpcchainvm.BatchedParseBlock` to correctly wrap returned blocks
- Removed incorrect `uintptr` handling in the generic codec
- Removed message latency tracking on messages being sent to itself

**Coreth**

- Added support for `eth_call` over VM2VM messaging
- Added config flags for TX pool behavior

**Miscellaneous**

- Added networking package README.md
- Removed pagination of large db messages over gRPC
- Added `Size` to the generic codec to reduce allocations
- Added `UnpackLimitedBytes` and `UnpackLimitedStr` to the manual packer
- Added SECURITY.md
- Exposed proposer list from the `proposervm`'s `Windower` interface
- Added health and bootstrapping client helpers that block until the node is healthy
- Moved bit sets from the `ids` package to the `set` package
- Added more wallet examples

## V1.9.4 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.9.4))

**Banff.4 - VM BLS Access**

This version is backwards compatible to
[v1.9.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.9.0). It is
optional, but encouraged. The supported plugin version is `20`.

**This version modifies the db format. The db format is compatible with v1.9.3,
but not v1.9.2 or earlier. After running a node with v1.9.4 attempting to run a
node with a version earlier than v1.9.3 may report a fatal error on startup.**

**PeerList Gossip Optimization**

- Added gossip tracking to the `peer` instance to only gossip new `IP`s to a connection
- Added `PeerListAck` message to report which `TxID`s provided by the `PeerList` message were tracked
- Added `TxID`s to the `PeerList` message to unique-ify NodeIDs across validation periods
- Added `TxID` mappings to the gossip tracker

**Validator Set Tracking**

- Renamed `GetValidators` to `Get` on the `validators.Manager` interface
- Removed `Set`, `AddWeight`, `RemoveWeight`, and `Contains` from the `validators.Manager` interface
- Added `Add` to the `validators.Manager` interface
- Removed `Set` from the `validators.Set` interface
- Added `Add` and `Get` to the `validators.Set` interface
- Modified `validators.Set#Sample` to return `ids.NodeID` rather than `valdiators.Validator`
- Replaced the `validators.Validator` interface with a struct
- Added a `BLS` public key field to `validators.Validator`
- Added a `TxID` field to `validators.Validator`
- Improved and documented error handling within the `validators.Set` interface
- Added `BLS` public keys to the result of `GetValidatorSet`
- Added `BuildBlockWithContext` as an optional VM method to build blocks at a specific P-chain height
- Added `VerifyWithContext` as an optional block method to verify blocks at a specific P-chain height

**Uptime Tracking**

- Added ConnectedSubnet message handling to the chain handler
- Added SubnetConnector interface and implemented it in the platformvm
- Added Subnet uptimes to p2p `pong` messages
- Added Subnet uptimes to `platform.getCurrentValidators`
- Added `subnetID` as an argument to `info.Uptime`

**Fixes**

- Fixed incorrect context cancellation of escaped contexts from grpc servers
- Fixed race condition between API initialization and shutdown
- Fixed race condition between NAT traversal initialization and shutdown
- Fixed race condition during beacon connection tracking
- Added race detection to the E2E tests
- Added additional message and sender tests

**Coreth**

- Improved header and logs caching using maximum accepted depth cache
- Added config option to perform database inspection on startup
- Added configurable transaction indexing to reduce disk usage
- Added special case to allow transactions using Nick's Method to bypass API level replay protection
- Added counter metrics for number of accepted/processed logs

**APIs**

- Added indices to the return values of `GetLastAccepted` and `GetContainerByID`
  on the `indexer` API client
- Removed unnecessary locking from the `info` API

**Chain Data**

- Added `ChainDataDir` to the `snow.Context` to allow blockchains to canonically
  access disk outside AvalancheGo's database
- Added `--chain-data-dir` as a CLI flag to specify the base directory for all `ChainDataDir`s

**Miscellaneous**

- Removed `Version` from the `peer.Network` interface
- Removed `Pong` from the `peer.Network` interface
- Reduced memory allocations inside the system throttler
- Added `CChainID` to the `snow.Context`
- Converted all sorting to utilize generics
- Converted all set management to utilize generics

## V1.9.3 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.9.3))

**Banff.3 - Tracing**

This version is backwards compatible to
[v1.9.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.9.0). It is
optional, but encouraged. The supported plugin version is `19`.

**Tracing**

- Added `context.Context` to all `VM` interface functions
- Added `context.Context` to the `validators.State` interface
- Added additional message fields to `tracedRouter#HandleInbound`
- Added `tracedVM` implementations for `block.ChainVM` and `vertex.DAGVM`
- Added `tracedState` implementation for `validators.State`
- Added `tracedHandler` implementation for `http.Handler`
- Added `tracedConsensus` implementations for `snowman.Consensus` and `avalanche.Consensus`

**Fixes**

- Fixed incorrect `NodeID` used in registered `AppRequest` timeouts
- Fixed panic when calling `encdb#NewBatch` after `encdb#Close`
- Fixed panic when calling `prefixdb#NewBatch` after `prefixdb#Close`

**Configs**

- Added `proposerMinBlockDelay` support to Subnet configs
- Added `providedFlags` field to the `initializing node` for easily observing custom node configs
- Added `--chain-aliases-file` and `--chain-aliases-file-content` CLI flags
- Added `--proposervm-use-current-height` CLI flag

**Coreth**

- Added metric for number of processed and accepted transactions
- Added wait for state sync go-routines to complete on shutdown
- Increased `go-ethereum` dependency to v1.10.26
- Increased soft cap on transaction size limits
- Added back isForkIncompatible checks for all existing forks
- Cleaned up Apricot Phase 6 code

**Linting**

- Added `unused-receiver` linter
- Added `unused-parameter` linter
- Added `useless-break` linter
- Added `unhandled-error` linter
- Added `unexported-naming` linter
- Added `struct-tag` linter
- Added `bool-literal-in-expr` linter
- Added `early-return` linter
- Added `empty-lines` linter
- Added `error-lint` linter

**Testing**

- Added `scripts/build_fuzz.sh` and initial fuzz tests
- Added additional `Fx` tests
- Added additional `messageQueue` tests
- Fixed `vmRegisterer` tests

**Documentation**

- Documented `Database.Put` invariant for `nil` and empty slices
- Documented AvalancheGo's versioning scheme
- Improved `vm.proto` docs

**Miscellaneous**

- Added peer gossip tracker
- Added `avalanche_P_vm_time_until_unstake` and `avalanche_P_vm_time_until_unstake_subnet` metrics
- Added `keychain.NewLedgerKeychainFromIndices`
- Removed usage of `Temporary` error handling after `listener#Accept`
- Removed `Parameters` from all `Consensus` interfaces
- Updated `avalanche-network-runner` to `v1.3.0`
- Added `ids.BigBitSet` to extend `ids.BitSet64` for arbitrarily large sets
- Added support for parsing future Subnet uptime tracking data to the P-chain's state implementation
- Increased validator set cache size
- Added `avax.UTXOIDFromString` helper for managing `UTXOID`s more easily

## V1.9.2 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.9.2))

**Banff.2 - Additional BLS Support**

This version is backwards compatible to
[v1.9.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.9.0). It is
optional, but encouraged. The supported plugin version is `19`.

**Coreth**

- Added trie clean cache journaling to disk to improve processing time after restart
- Fixed regression where a snapshot could be marked as stale by the asynchronous
  acceptor during block processing
- Added fine-grained block processing metrics

**RPCChainVM**

- Added `validators.State` to the rpcchainvm server's `snow.Context`
- Added `rpcProtocolVersion` to the output of `info.getNodeVersion`
- Added `rpcchainvm` protocol version to the output of the `--version` flag
- Added `version.RPCChainVMProtocolCompatibility` map to easily compare plugin
  compatibility against AvalancheGo versions

**Builds**

- Downgraded `ubuntu` release binaries from `jammy` to `focal`
- Updated MacOS github runners to `macos-12`
- Added workflow dispatch to build release binaries

**BLS**

- Added BLS proof of possession to `platform.getCurrentValidators` and `platform.getPendingValidators`
- Added BLS public key to in-memory staker objects
- Improved memory clearing of BLS secret keys

**Cleanup**

- Fixed issue where the chain manager would attempt to start chain creation multiple times
- Fixed race that caused the P-chain to finish bootstrapping before the primary network finished bootstrapping
- Converted inbound message handling to expect usage of types rather than maps of fields
- Simplified the `validators.Set` implementation
- Added a warning if synchronous consensus messages take too long

## V1.9.1 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.9.1))

**Banff.1 - VM2 Messaging**

This version is backwards compatible to
[v1.9.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.9.0). It is
optional, but encouraged. The supported plugin version is `18`.

**Features**

- Added cross-chain messaging support to the VM interface
- Added Ledger support to the Primary Network wallet
- Converted Bionic builds to Jammy builds
- Added `mock.gen.sh` to programmatically generate mock implementations
- Added BLS signer to the `snow.Context`
- Moved `base` from `rpc.NewEndpointRequester` to be included in the `method` in `SendRequest`
- Converted `UnboundedQueue` to `UnboundedDeque`

**Observability**

- Added support for OpenTelemetry tracing
- Converted periodic bootstrapping status update to be time-based
- Removed duplicated fields from the json format of the node config
- Configured min connected stake health check based on the consensus parameters
- Added new consensus metrics
- Documented how chain time is advanced in the PlatformVM with `chain_time_update.md`

**Cleanup**

- Converted chain creation to be handled asynchronously from the P-chain's execution environment
- Removed `SetLinger` usage of P2P TCP connections
- Removed `Banff` upgrade flow
- Fixed ProposerVM inner block caching after verification
- Fixed PlatformVM mempool verification to use an updated chain time
- Removed deprecated CLI flags: `--dynamic-update-duration`, `--dynamic-public-ip`
- Added unexpected Put bytes tests to the Avalanche and Snowman consensus engines
- Removed mockery generated mock implementations
- Converted safe math functions to use generics where possible
- Added linting to prevent usage of `assert` in unit tests
- Converted empty struct usage to `nil` for interface compliance checks
- Added `CODEOWNERs` to own first rounds of PR review

## V1.9.0 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.9.0))

**Banff - Elastic Subnets**

This upgrade adds support for creating Proof-of-Stake Subnets.

This version is not backwards compatible. The changes in the upgrade go into
effect at 12 PM EDT, October 18th 2022 on Mainnet.

**All Mainnet nodes should upgrade before 12 PM EDT, October 18th 2022.**

The supported plugin version is `17`.

**Upgrades**

- Activated P2P serialization format change to Protobuf
- Activated non-AVAX `ImportTx`/`ExportTx`s to/from the P-chain
- Activated `Banff*` blocks on the P-chain
- Deactivated `Apricot*` blocks on the P-chain
- Activated `RemoveSubnetValidatorTx`s on the P-chain
- Activated `TransformSubnetTx`s on the P-chain
- Activated `AddPermissionlessValidatorTx`s on the P-chain
- Activated `AddPermissionlessDelegatorTx`s on the P-chain
- Deactivated ANT `ImportTx`/`ExportTx`s on the C-chain
- Deactivated ANT precompiles on the C-chain

**Deprecations**

- Ubuntu 18.04 releases are deprecated and will not be provided for `>=v1.9.1`

**Miscellaneous**

- Fixed locked input signing in the P-chain wallet
- Removed assertions from the logger interface
- Removed `--assertions-enabled` flag
- Fixed typo in `--bootstrap-max-time-get-ancestors` flag
- Standardized exported P-Chain codec usage
- Improved isolation and execution of the E2E tests
- Updated the linked hashmap implementation to use generics

## PRE_RELEASE v1.9.0-Fuji-post-upgrade ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.9.0-fuji-post-upgrade))

**Banff - Elastic Subnets - Fuji Post Upgrade Pre-release**

**Please note that this release is unable to run Mainnet - and will display
"Mainnet is not supported" if attempted to run with a Mainnet configuration.**

This upgrade performs post-upgrade cleanup to the C-chain.

The changes in the upgrade go into effect at 3 PM EDT, October 4th 2022 on the Fuji testnet.

**All Fuji nodes should upgrade before 3 PM EDT, October 4th 2022.**

The supported plugin version is `16`.

**Upgrades**

- Activated P2P serialization format change to Protobuf
- Activated non-AVAX `ImportTx`/`ExportTx`s to/from the P-chain
- Activated `Banff*` blocks on the P-chain
- Deactivated `Apricot*` blocks on the P-chain
- Activated `RemoveSubnetValidatorTx`s on the P-chain
- Activated `TransformSubnetTx`s on the P-chain
- Activated `AddPermissionlessValidatorTx`s on the P-chain
- Activated `AddPermissionlessDelegatorTx`s on the P-chain
- Deactivated ANT `ImportTx`/`ExportTx`s on the C-chain
- Deactivated ANT precompiles on the C-chain

**Deprecations**

- Ubuntu 18.04 releases are deprecated and will not be provided for `>=v1.9.1`

**Miscellaneous**

- Fixed locked input signing in the P-chain wallet
- Removed assertions from the logger interface
- Removed `--assertions-enabled` flag
- Fixed typo in `--bootstrap-max-time-get-ancestors` flag
- Standardized exported P-Chain codec usage
- Improved isolation and execution of the E2E tests
- Updated the linked hashmap implementation to use generics

## PRE_RELEASE v1.9.0-Fuji ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.9.0-fuji))

**Banff - Elastic Subnets - Fuji Pre-release**

**Please note that this release is unable to run Mainnet - and will display
"Mainnet is not supported" if attempted to run with a Mainnet configuration.**

This upgrade adds support for creating Proof-of-Stake Subnets.

The changes in the upgrade go into effect at 10 AM EDT, October 3rd 2022 on the
Fuji testnet. After Fuji is updated and verified, a Mainnet compatible release
will be published.

**All Fuji nodes should upgrade before 10 AM EDT, October 3rd 2022.**

The supported plugin version is `16`.

**Upgrades**

- Activated P2P serialization format change to Protobuf
- Activated non-AVAX `ImportTx`/`ExportTx`s to/from the P-chain
- Activated `Banff*` blocks on the P-chain
- Deactivated `Apricot*` blocks on the P-chain
- Activated `RemoveSubnetValidatorTx`s on the P-chain
- Activated `TransformSubnetTx`s on the P-chain
- Activated `AddPermissionlessValidatorTx`s on the P-chain
- Activated `AddPermissionlessDelegatorTx`s on the P-chain
- Deactivated ANT `ImportTx`/`ExportTx`s on the C-chain
- Deactivated ANT precompiles on the C-chain

**Deprecations**

- Ubuntu 18.04 releases are deprecated and will not be provided for `>=v1.9.1`

**Miscellaneous**

- Fixed locked input signing in the P-chain wallet
- Removed assertions from the logger interface
- Removed `--assertions-enabled` flag
- Fixed typo in `--bootstrap-max-time-get-ancestors` flag
- Standardized exported P-Chain codec usage
- Improved isolation and execution of the E2E tests
- Updated the linked hashmap implementation to use generics

## V1.8.6 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.8.6))

This version is backwards compatible to
[v1.8.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.8.0). It is
optional, but encouraged. The supported plugin version is `16`.

**BLS**

- Added BLS key file at `--staking-signer-key-file`
- Exposed BLS proof of possession in the `info.getNodeID` API
- Added BLS proof of possession to `AddPermissionlessValidatorTx`s for the Primary Network

The default value of `--staking-signer-key-file` is
`~/.avalanchego/staking/signer.key`. If the key file doesn't exist, it will be
populated with a new key.

**Networking**

- Added P2P Proto support to be activated in a future release
- Fixed inbound bandwidth spike after leaving the validation set
- Removed support for `ChitsV2` messages
- Removed `ContainerID`s from `Put` and `PushQuery` messages
- Added `pending_timeouts` metric to track the number of active timeouts a node is tracking
- Fixed overflow in gzip decompression
- Optimized memory usage in `peer.MessageQueue`

**Miscellaneous**

- Fixed bootstrapping ETA metric
- Removed unused `unknown_txs_count` metric
- Replaced duplicated code with generic implementations

**Coreth**

- Added failure reason to bad block API

## V1.8.5 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.8.5))

Please upgrade your node as soon as possible.

The supported plugin version is `16`.

**Fixes**

- Fixed stale block reference by evicting blocks upon successful verification

**[Coreth](https://medium.com/avalancheavax/apricot-phase-6-native-asset-call-deprecation-a7b7a77b850a)**

- Removed check for Apricot Phase6 incompatible fork to unblock nodes that did
  not upgrade ahead of the activation time

## V1.8.4 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.8.4))

Please upgrade your node as soon as possible.

The supported plugin version is `16`.

**Caching**

- Added temporarily invalid block caching to reduce repeated network requests
- Added caching to the proposervm's inner block parsing

**[Coreth](https://medium.com/avalancheavax/apricot-phase-6-native-asset-call-deprecation-a7b7a77b850a)**

- Reduced the log level of `BAD BLOCK`s from `ERROR` to `DEBUG`
- Deprecated Native Asset Call

## V1.8.2 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.8.2))

Please upgrade your node as soon as possible.

The changes in `v1.8.x` go into effect at 4 PM EDT on September 6th, 2022 on
both Fuji and Mainnet. You should upgrade your node before the changes go into
effect, otherwise they may experience loss of uptime.

The supported plugin version is `16`.

**[Coreth](https://medium.com/avalancheavax/apricot-phase-6-native-asset-call-deprecation-a7b7a77b850a)**

- Fixed live-lock in bootstrapping, after performing state-sync, by properly
  reporting `database.ErrNotFound` in `GetBlockIDAtHeight` rather than a
  formatted error
- Increased the log level of `BAD BLOCK`s from `DEBUG` to `ERROR`
- Fixed typo in Chain Config `String` function

## V1.8.1 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.8.1))

Please upgrade your node as soon as possible.

The changes in `v1.8.x` go into effect at 4 PM EDT on September 6th, 2022 on
both Fuji and Mainnet. You should upgrade your node before the changes go into
effect, otherwise they may experience loss of uptime.

The supported plugin version is `16`.

**Miscellaneous**

- Reduced the severity of not quickly connecting to bootstrap nodes from `FATAL` to `WARN`

**[Coreth](https://medium.com/avalancheavax/apricot-phase-6-native-asset-call-deprecation-a7b7a77b850a)**

- Reduced the log level of `BAD BLOCK`s from `ERROR` to `DEBUG`
- Added Apricot Phase6 to Chain Config `String` function

## V1.8.0 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.8.0))

This is a mandatory security upgrade. Please upgrade your node **as soon as possible.**

The changes in the upgrade go into effect at **4 PM EDT on September 6th, 2022**
on both Fuji and Mainnet. You should upgrade your node before the changes go
into effect, otherwise they may experience loss of uptime.

You may see some extraneous ERROR logs ("BAD BLOCK") on your node after
upgrading. These may continue until the Apricot Phase 6 activation (at 4 PM EDT
on September 6th).

The supported plugin version is `16`.

**PlatformVM APIs**

- Fixed `GetBlock` API when requesting the encoding as `json`
- Changed the json key in `AddSubnetValidatorTx`s from `subnet` to `subnetID`
- Added multiple asset support to `getBalance`
- Updated `PermissionlessValidator`s returned from `getCurrentValidators` and
  `getPendingValidators` to include `validationRewardOwner` and
  `delegationRewardOwner`
- Deprecated `rewardOwner` in `PermissionlessValidator`s returned from `getCurrentValidators` and `getPendingValidators`
- Added `subnetID` argument to `getCurrentSupply`
- Added multiple asset support to `getStake`
- Added `subnetID` argument to `getMinStake`

**PlatformVM Structures**

- Renamed existing blocks
  - `ProposalBlock` -> `ApricotProposalBlock`
  - `AbortBlock` -> `ApricotAbortBlock`
  - `CommitBlock` -> `ApricotCommitBlock`
  - `StandardBlock` -> `ApricotStandardBlock`
  - `AtomicBlock` -> `ApricotAtomicBlock`
- Added new block types **to be enabled in a future release**
  - `BlueberryProposalBlock`
    - Introduces a `Time` field and an unused `Txs` field before the remaining
      `ApricotProposalBlock` fields
  - `BlueberryAbortBlock`
    - Introduces a `Time` field before the remaining `ApricotAbortBlock` fields
  - `BlueberryCommitBlock`
    - Introduces a `Time` field before the remaining `ApricotCommitBlock` fields
  - `BlueberryStandardBlock`
    - Introduces a `Time` field before the remaining `ApricotStandardBlock` fields
- Added new transaction types **to be enabled in a future release**
  - `RemoveSubnetValidatorTx`
    - Can be included into `BlueberryStandardBlock`s
    - Allows a Subnet owner to remove a validator from their Subnet
  - `TransformSubnetTx`
    - Can be included into `BlueberryStandardBlock`s
    - Allows a Subnet owner to convert their Subnet into a permissionless Subnet
  - `AddPermissionlessValidatorTx`
    - Can be included into `BlueberryStandardBlock`s
    - Adds a new validator to the requested permissionless Subnet
  - `AddPermissionlessDelegatorTx`
    - Can be included into `BlueberryStandardBlock`s
    - Adds a new delegator to the requested permissionless validator on the requested Subnet

**PlatformVM Block Building**

- Fixed race in `AdvanceTimeTx` creation to avoid unnecessary block construction
- Added `block_formation_logic.md` to describe how blocks are created
- Refactored `BlockBuilder` into `ApricotBlockBuilder`
- Added `BlueberryBlockBuilder`
- Added `OptionBlock` builder visitor
- Refactored `Mempool` issuance and removal logic to use transaction visitors

**PlatformVM Block Execution**

- Added support for executing `AddValidatorTx`, `AddDelegatorTx`, and
  `AddSubnetValidatorTx` inside of a `BlueberryStandardBlock`
- Refactored time advancement into a standard state modification structure
- Refactored `ProposalTxExecutor` to abstract state diff creation
- Standardized upgrade checking rules
- Refactored Subnet authorization checking

**Wallet**

- Added support for new transaction types in the P-chain wallet
- Fixed fee amounts used in the Primary Network wallet to reduce unnecessary fee burning

**Networking**

- Defined `p2p.proto` to be used for future network messages
- Added `--network-tls-key-log-file-unsafe` to support inspecting p2p messages
- Added `avalanche_network_accept_failed` metrics to track networking `Accept` errors

**Miscellaneous**

- Removed reserved fields from Proto files and renumbered the existing fields
- Added generic dynamically resized ring buffer
- Updated gRPC version to `v1.49.0` to fix non-deterministic errors reported in the `rpcchainvm`
- Removed `--signature-verification-enabled` flag
- Removed dead code
  - `ids.QueueSet`
  - `timer.Repeater`
  - `timer.NewStagedTimer`
  - `timer.TimedMeter`

**[Coreth](https://medium.com/avalancheavax/apricot-phase-6-native-asset-call-deprecation-a7b7a77b850a)**

- Incorrectly deprecated Native Asset Call
- Migrated to `go-ethereum` v1.10.23
- Added API to fetch Chain Config

## V1.7.18 - Chapelco ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.18))

This version is backwards compatible to
[v1.7.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.0). It is
optional, but encouraged. The supported plugin version is `15`.

**Fixes**

- Fixed bug in `codeToFetch` database accessors that caused an error when starting/stopping state sync
- Fixed rare BAD BLOCK errors during C-chain bootstrapping
- Fixed platformvm `couldn't get preferred block state` log due to attempted block building during bootstrapping
- Fixed platformvm `failed to fetch next staker to reward` error log due to an
  incorrect `lastAcceptedID` reference
- Fixed AWS AMI creation

**PlatformVM**

- Refactored platformvm metrics handling
- Refactored platformvm block creation
- Introduced support to prevent empty `nodeID` use on the P-chain to be activated in a future upgrade

**Coreth**

- Updated gas price estimation to limit lookback window based on block timestamps
- Added metrics for processed/accepted gas
- Simplified syntactic block verification
- Ensured `statedb` errors during block processing are logged
- Removed deprecated gossiper/block building logic from pre-Apricot Phase 4
- Added marshal function for duration to improve config output

**Miscellaneous**

- Updated local network genesis to use a newer start time
- Updated minimum Golang version to go1.18.1
- Removed support for RocksDB
- Bumped `go-ethereum` version to v1.10.21
- Added various additional tests
- Introduced additional database invariants for all database implementations
- Added retries to windows CI installations
- Removed useless ID aliasing during chain creation

## V1.7.17 - Verbier ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.17))

This version is backwards compatible to
[v1.7.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.0). It is
optional, but encouraged. The supported plugin version is `15`.

**VMs**

- Refactored P-chain block state management
  - Supporting easier parsing and usage of blocks
  - Improving separation of block execution with block definition
  - Unifying state definitions
- Introduced support to send custom X-chain assets to the P-chain to be activated in a future upgrade
- Introduced support to use custom assets on the P-chain to be activated in a future upgrade
- Added VMs README to begin fully documenting plugin invariants
- Added various comments around expected usages of VM tools

**Coreth**

- Added optional JSON logging
- Added interface for supporting stateful precompiles
- Removed legacy code format from the database

**Fixes**

- Fixed ungraceful gRPC connection closure during very long running requests
- Fixed LevelDB panic during shutdown
- Fixed verification of `--stake-max-consumption-rate` to include the upper-bound
- Fixed various CI failures
- Fixed flaky unit tests

**Miscellaneous**

- Added bootstrapping ETA metrics
- Converted all logs to support structured fields
- Improved Snowman++ oracle block verification error messages
- Removed deprecated or unused scripts

## V1.7.16 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.16))

This version is backwards compatible to
[v1.7.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.0). It is
optional, but encouraged. The supported plugin version is `15`.

**LevelDB**

- Fix rapid disk growth by manually specifying the maximum manifest file size

## V1.7.15 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.15))

:::warning

This version should not be used in a production environment.
[v1.7.16](#v1716-view-on-github) resolves a database leak introduced in this
release.

:::

This version is backwards compatible to
[v1.7.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.0). It is
optional, but encouraged. The supported plugin version is `15`.

**PlatformVM**

- Replaced copy-on-write validator set data-structure to use tree diffs to optimize validator set additions
- Replaced validation transactions with a standardized representation to remove transaction type handling
- Migrated transaction execution to its own package
- Removed child pointers from processing blocks
- Added P-chain wallet helper for providing initial transactions

**Coreth**

- Bumped `go-ethereum` dependency to v1.10.20
- Updated API names used to enable services in `eth-api` config flag. Prior
  names are supported but deprecated, please update configurations
  [accordingly](../../nodes/maintain/chain-config-flags.md#c-chain-configs)
- Optimized state sync by parallelizing trie syncing
- Added `eth_syncing` API for compatibility. Note: This API is only accessible
  after bootstrapping and always returns `"false"`, since the node will no
  longer be syncing at that point
- Added metrics to the atomic transaction mempool
- Added metrics for incoming/outgoing mempool gossip

**Fixes**

- Updated Snowman and Avalanche consensus engines to report original container
  preferences before processing the provided container
- Fixed inbound message byte throttler context cancellation cleanup
- Removed case sensitivity of IP resolver services
- Added failing health check when a whitelisted Subnet fails to initialize a chain

**Miscellaneous**

- Added gRPC client metrics for dynamically created connections
- Added uninitialized continuous time averager for when initial predictions are unreliable
- Updated linter version
- Documented various platform invariants
- Cleaned up various dead parameters
- Improved various tests

## V1.7.14 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.14))

This version is backwards compatible to
[v1.7.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.0). It is
optional, but encouraged.

**APIs**

:::warning

These API format changes are breaking changes. <https://api.avax.network> and
<https://api.avax-test.network> have been updated with this format. If you are
using AvalancheGo APIs in your code, please ensure you have updated to the
latest versions. See [this doc](cb58-deprecation.md) for details about the CB58
removal.

:::

- Removed `CB58` as an encoding option from all APIs
- Added `HexC` and `HexNC` as encoding options for all APIs that accept an encoding format
- Removed the `Success` response from all APIs
- Replaced `containerID` with `id` in the indexer API

**PlatformVM**

- Fixed incorrect `P-chain` height in `Snowman++` when staking is disabled
- Moved `platformvm` transactions to be defined in a sub-package
- Moved `platformvm` genesis management to be defined in a sub-package
- Moved `platformvm` state to be defined in a sub-package
- Standardized `platformvm` transactions to always be referenced via pointer
- Moved the `platformvm` transaction builder to be defined in a sub-package
- Fixed uptime rounding during node shutdown

**Networking**

- Updated `Connected` and `Disconnected` messages to only be sent to chains if
  the peer is tracking the Subnet
- Updated the minimum TLS version on the p2p network to `v1.3`
- Supported context cancellation in the networking rate limiters
- Added `ChitsV2` message format for the p2p network to be used in a future upgrade

**Miscellaneous**

- Fixed `--public-ip-resolution-frequency` invalid overwrite of the resolution service
- Added additional metrics to distinguish between virtuous and rogue currently processing transactions
- Suppressed the super cool `avalanchego` banner when `stdout` is not directed to a terminal
- Updated linter version
- Improved various comments and documentation
- Standardized primary network handling across Subnet maps

## V1.7.13 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.13))

This version is backwards compatible to
[v1.7.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.0). It is
optional, but encouraged.

State Sync v0.1 (v1.7.11) and v0.2 (v1.7.12) are not compatible with State Sync
v0.3 (v1.7.13). When the majority of stake upgrades, old clients will no longer
be able to State Sync. In addition, v1.7.13 modifies the VM interface, so you'll
need to update your Custom VM dependency.

**State Sync**

- Added peer bandwidth tracking to optimize `coreth` state sync message routing
- Fixed `coreth` leaf request handler bug to ensure the handler delivers a valid range proof
- Removed redundant proof keys from `coreth` leafs response message format
- Improved `coreth` state sync request retry logic
- Improved `coreth` state sync handler metrics
- Improved `coreth` state sync ETA
- Added `avalanche_{chainID}_handler_async_expired` metric

**Miscellaneous**

- Fixed `platform.getCurrentValidators` API to correctly mark a node as connected to itself on Subnets.
- Fixed `platform.getBlockchainStatus` to correctly report `Unknown` for
  blockchains that are not managed by the `P-Chain`
- Added process metrics by default in the `rpcchainvm#Server`
- Added `Database` health checks
- Removed the deprecated `Database.Stat` call from the `rpcdb#Server`
- Added fail fast logic to duplicated Snowman additions to avoid undefined behavior
- Added additional testing around Snowman diverged voting tests
- Deprecated `--dynamic-update-duration` and `--dynamic-public-ip` CLI flags
- Added `--public-ip-resolution-frequency` and `--public-ip-resolution-service`
  to replace `--dynamic-update-duration` and `--dynamic-public-ip`, respectively

## V1.7.12 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.12))

This version is backwards compatible to
[v1.7.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.0). It is
optional, but encouraged.

**State Sync**

- Fixed proposervm state summary acceptance to only accept state summaries with
  heights higher than the locally last accepted block
- Fixed proposervm state summary serving to only respond to requests after height indexing has finished
- Improved C-chain state sync leaf request serving by optimistically reading leaves from snapshot
- Refactored C-chain state sync block fetching

**Networking**

- Reduced default PeerList and accepted frontier gossiping
- Increased the default at-large outbound buffer size to 32 MiB

**Metrics**

- Added LevelDB metrics
- Added process and Golang metrics for the AvalancheGo binary
- Added available disk space health check
  - Ensured that the disk space will not be fully utilized by shutting down the
    node if there is a critically low amount of free space remaining
- Improved C-chain state sync metrics

**Performance**

- Added C-chain acceptor queue within `core/blockchain.go`
- Removed rpcdb locking when committing batches and using iterators
- Capped C-chain TrieDB dirties cache size during block acceptance to reduce
  commit size at 4096 block interval

**Cleanup**

- Refactored the avm to utilize the external TXs package
- Unified platformvm dropped TX handling
- Clarified snowman child block acceptance calls
- Fixed small consensus typos
- Reduced minor duplicated code in consensus
- Moved the platformvm key factory out of the VM into the test file
- Removed unused return values from the timeout manager
- Removed weird json RPC private interface
- Standardized json imports
- Added VM factory interface checks

## V1.7.11 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.11))

This version is backwards compatible to
[v1.7.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.0). It is
optional, but encouraged.

**The first startup of the C-Chain will cause an increase in CPU and IO usage
due to an index update. This index update runs in the background and does not
impact restart time.**

**State Sync**

- Added state syncer engine to facilitate VM state syncing, rather than full historical syncing
- Added `GetStateSummaryFrontier`, `StateSummaryFrontier`,
  `GetAcceptedStateSummary`, `AcceptedStateSummary` as P2P messages
- Updated `Ancestors` message specification to expect an empty response if the container is unknown
- Added `--state-sync-ips` and `--state-sync-ids` flags to allow manual
  overrides of which nodes to query for accepted state summaries
- Updated networking library to permanently track all manually tracked peers, rather than just beacons
- Added state sync support to the `metervm`
- Added state sync support to the `proposervm`
- Added state sync support to the `rpcchainvm`
- Added beta state sync support to `coreth`

**ProposerVM**

- Prevented rejected blocks from overwriting the `proposervm` height index
- Optimized `proposervm` block rewind to utilize the height index if available
- Ensured `proposervm` height index is marked as repaired in `Initialize` if it
  is fully repaired on startup
- Removed `--reset-proposervm-height-index`. The height index will be reset upon first restart
- Optimized `proposervm` height index resetting to periodically flush deletions

**Bug Fixes**

- Fixed IPC message issuance and restructured consensus event callbacks to be checked at compile time
- Fixed `coreth` metrics initialization
- Fixed bootstrapping startup logic to correctly startup if initially connected to enough stake
- Fixed `coreth` panic during metrics collection
- Fixed panic on concurrent map read/write in P-chain wallet SDK
- Fixed `rpcchainvm` panic by sanitizing HTTP response codes
- Fixed incorrect JSON tag on `platformvm.BaseTx`
- Fixed `AppRequest`, `AppResponse`, and `AppGossip` stringers used in logging

**API/Client**

- Supported client implementations pointing to non-standard URIs
- Introduced `ids.NodeID` type to standardize logging and simplify API service and client implementations
- Changed client implementations to use standard types rather than `string`s wherever possible
- Added `subnetID` as an argument to `platform.getTotalStake`
- Added `connected` to the Subnet validators in responses to `platform.getCurrentValidators` and `platform.getPendingValidators`
- Add missing `admin` API client methods
- Improved `indexer` API client implementation to avoid encoding edge cases

**Networking**

- Added `--snow-mixed-query-num-push-vdr` and
  `--snow-mixed-query-num-push-non-vdr` to allow parameterization of sending
  push queries
  - By default, non-validators now send only pull queries, not push queries.
  - By default, validators now send both pull queries and push queries upon
    inserting a container into consensus. Previously, nodes sent only push
    queries.
- Added metrics to track the amount of over gossiping of `peerlist` messages
- Added custom message queueing support to outbound `Peer` messages
- Reused `Ping` messages to avoid needless memory allocations

**Logging**

- Replaced AvalancheGo's internal logger with [uber-go/zap](https://github.com/uber-go/zap).
- Replaced AvalancheGo's log rotation with [lumberjack](https://github.com/natefinch/lumberjack).
- Renamed `log-display-highlight` to `log-format` and added `json` option.
- Added `log-rotater-max-size`, `log-rotater-max-files`, `log-rotater-max-age`,
  `log-rotater-compress-enabled` options for log rotation.

**Miscellaneous**

- Standardized RPC specification of timestamp fields
- Logged health checks whenever a failing health check is queried
- Added callback support for the validator set manager
- Increased `coreth` trie tip buffer size to 32
- Added CPU usage metrics for AvalancheGo and all sub-processes
- Added Disk IO usage metrics for AvalancheGo and all sub-processes

**Cleanup**

- Refactored easily separable `platformvm` files into separate smaller packages
- Simplified default version parsing
- Fixed various typos
- Converted some structs to interfaces to better support mocked testing
- Refactored IP utils

**Documentation**

- Increased recommended disk size to 1 TB
- Updated issue template
- Documented additional `snowman.Block` invariants

## V1.7.10 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.10))

This version is backwards compatible to
[v1.7.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.0). It is
optional, but encouraged.

**Networking**

- Improved vertex and block gossiping for validators with low stake weight.
- Added peers metric by Subnet.
- Added percentage of stake connected metric by Subnet.

**APIs**

- Added support for specifying additional headers and query params in the RPC client implementations.
- Added static API clients for the `platformvm` and the `avm`.

**PlatformVM**

- Introduced time based windowing of accepted P-chain block heights to ensure
  that local networks update the proposer list timely in the `proposervm`.
- Improved selection of decision transactions from the mempool.

**RPCChainVM**

- Increased `buf` version to `v1.3.1`.
- Migrated all Proto definitions to a dedicated `/proto` folder.
- Removed the dependency on the non-standard grpc broker to better support other language implementations.
- Added grpc metrics.
- Added grpc server health checks.

**Coreth**

- Fixed a bug where a deadlock on shutdown caused historical re-generation on restart.
- Added an API endpoint to fetch the current VM Config.
- Added AvalancheGo custom log formatting to the logs.
- Removed support for the JS Tracer.

**Logging**

- Added piping of Subnet logs to stdout.
- Lazily initialized logs to avoid opening files that are never written to.
- Added support for arbitrarily deleted log files while AvalancheGo is running.
- Removed redundant logging configs.

**Miscellaneous**

- Updated minimum go version to `v1.17.9`.
- Added Subnet bootstrapping health checks.
- Supported multiple tags per codec instantiation.
- Added minor fail-fast optimization to string packing.
- Removed dead code.
- Fixed typos.
- Simplified consensus engine `Shutdown` notification dispatching.
- Removed `Sleep` call in the inbound connection throttler.

## V1.7.9 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.9))

This version is backwards compatible to
[v1.7.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.0). It is
optional, but encouraged.

**Updates**

- Improved Subnet gossip to only send messages to nodes participating in that Subnet.
- Fixed inlined VM initialization to correctly register static APIs.
- Added logging for file descriptor limit errors.
- Removed dead code from network packer.
- Improved logging of invalid hash length errors.

## V1.7.8 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.8))

This version is backwards compatible to
[v1.7.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.0). It is
optional, but encouraged.

**Networking**

- Fixed duplicate reference decrease when closing a peer.
- Freed allocated message buffers immediately after sending.
- Added `--network-peer-read-buffer-size` and `--network-peer-write-buffer-size` config options.
- Moved peer IP signature verification to enable concurrent verifications.
- Reduced the number of connection flushes when sending messages.
- Canceled outbound connection requests on shutdown.
- Reused dialer across multiple outbound connections.
- Exported `NewTestNetwork` for easier external testing.

**Coreth**

- Reduced log level of snapshot regeneration logs.
- Enabled atomic TX replacement with higher gas fees.
- Parallelized trie index re-generation.

**Miscellaneous**

- Fixed incorrect `BlockchainID` usage in the X-chain `ImportTx` builder.
- Fixed incorrect `OutputOwners` in the P-chain `ImportTx` builder.
- Improved FD limit error logging and warnings.
- Rounded bootstrapping ETAs to the nearest second.
- Added gossip config support to the Subnet configs.
- Optimized various queue removals for improved memory freeing.
- Added a basic X-chain E2E usage test to the new testing framework.

## V1.7.7 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.7))

This version is backwards compatible to
[v1.7.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.0). It is
optional, but encouraged.

**Networking**

- Refactored the networking library to track potential peers by `nodeID` rather than IP.
- Separated peer connections from the mesh network implementation to simplify testing.
- Fixed duplicate `Connected` messages bug.
- Supported establishing outbound connections with peers reporting different inbound and outbound IPs.

**Database**

- Disabled seek compaction in LevelDB by default.

**GRPC**

- Increased protocol version, this requires all plugin definitions to update their communication dependencies.
- Merged services to be served using the same server when possible.
- Implemented a fast path for simple HTTP requests.
- Removed duplicated message definitions.
- Improved error reporting around invalid plugins.

**Coreth**

- Optimized FeeHistory API.
- Added protection to prevent accidental corruption of archival node trie index.
- Added capability to restore complete trie index on best effort basis.
- Rounded up fast-cache sizes to utilize all mmap'd memory in chunks of 64MB.

**Configs**

- Removed `--inbound-connection-throttling-max-recent`
- Renamed `--network-peer-list-size` to `--network-peer-list-num-validator-ips`
- Removed `--network-peer-list-gossip-size`
- Removed `--network-peer-list-staker-gossip-fraction`
- Added `--network-peer-list-validator-gossip-size`
- Added `--network-peer-list-non-validator-gossip-size`
- Removed `--network-get-version-timeout`
- Removed `--benchlist-peer-summary-enabled`
- Removed `--peer-alias-timeout`

**Miscellaneous**

- Fixed error reporting when making Avalanche chains that did not manually specify a primary alias.
- Added beacon utils for easier programmatic handling of beacon nodes.
- Resolved the default log directory on initialization to avoid additional error handling.
- Added support to the chain state module to specify an arbitrary new accepted block.

## V1.7.6 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.6))

This version is backwards compatible to
[v1.7.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.0). It is
optional, but encouraged.

**Consensus**

- Introduced a new vertex type to support future `Avalanche` based network upgrades.
- Added pending message metrics to the chain message queues.
- Refactored event dispatchers to simplify dependencies and remove dead code.

**PlatformVM**

- Added `json` encoding option to the `platform.getTx` call.
- Added `platform.getBlock` API.
- Cleaned up block building logic to be more modular and testable.

**Coreth**

- Increased `FeeHistory` maximum historical limit to improve MetaMask UI on the C-Chain.
- Enabled chain state metrics.
- Migrated `go-ethereum` v1.10.16 changes.

**Miscellaneous**

- Added the ability to load new VM plugins dynamically.
- Implemented X-chain + P-chain wallet that can be used to build and sign
  transactions. Without providing a full node private keys.
- Integrated e2e testing to the repository to avoid maintaining multiple synced repositories.
- Fixed `proposervm` height indexing check to correctly mark the indexer as repaired.
- Introduced message throttling overrides to be used in future improvements to reliably send messages.
- Introduced a cap on the client specified request deadline.
- Increased the default `leveldb` open files limit to `1024`.
- Documented the `leveldb` configurations.
- Performed various cleanup passes.

## V1.7.5 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.5))

This version is backwards compatible to
[v1.7.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.0). It is
optional, but encouraged.

**Consensus**

- Added asynchronous processing of `App.*` messages.
- Added height indexing support to the `proposervm` and `rpcchainvm`. If a node
  is updated to `>=v1.7.5` and then downgraded to `<v1.7.5`, the user must
  enable the `--reset-proposervm-height-index=true` flag to ensure the
  `proposervm` height index is correctly updated going forward.
- Fixed bootstrapping job counter initialization that could cause negative ETAs to be reported.
- Fixed incorrect processing check that could log incorrect information.
- Removed incorrect warning logs.

**Miscellaneous**

- Added tracked Subnets to be reported in calls to the `info.peers` API.
- Updated gRPC implementations to use `buf` tooling and standardized naming and locations.
- Added a consistent hashing implementation to be used in future improvements.
- Fixed database iteration invariants to report `ErrClosed` rather than silently exiting.
- Added additional sanity checks to prevent users from incorrectly configuring their node.
- Updated log timestamps to include milliseconds.

**Coreth**

- Added beta support for offline pruning.
- Refactored peer networking layer.
- Enabled cheap metrics by default.
- Marked RPC call metrics as expensive.
- Added Abigen support for native asset call precompile.
- Fixed bug in BLOCKHASH opcode during `traceBlock`.
- Fixed bug in handling updated chain config on startup.

## V1.7.4 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.4))

This version is backwards compatible to
[v1.7.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.0). It is
optional, but encouraged.

**The first startup of the C-Chain will take a few minutes longer due to an index update.**

**Consensus**

- Removed deprecated Snowstorm consensus implementation that no longer aligned with the updated specification.
- Updated bootstrapping logs to no longer reset counters after a node restart.
- Added bootstrapping ETAs for fetching Snowman blocks and executing operations.
- Renamed the `MultiPut` message to the `Ancestors` message to match other message naming conventions.
- Introduced Whitelist conflicts into the Snowstorm specification that will be
  used in future X-chain improvements.
- Refactored the separation between the Bootstrapping engine and the Consensus engine to support Fast-Sync.

**Coreth**

- Added an index mapping height to the list of accepted atomic operations at
  that height in a trie. Generating this index will cause the node to take a few
  minutes longer to startup the C-Chain for the first restart.
- Updated Geth dependency to `v1.10.15`.
- Updated `networkID` to match `chainID`.

**VMs**

- Refactored `platformvm` rewards calculations to enable usage from an external library.
- Fixed `platformvm` and `avm` UTXO fetching to not re-iterate the UTXO set if no UTXOs are fetched.
- Refactored `platformvm` status definitions.
- Added support for multiple address balance lookups in the `platformvm`.
- Refactored `platformvm` and `avm` keystore users to reuse similar code.

**RPCChainVM**

- Returned a `500 InternalServerError` if an unexpected gRPC error occurs during
  the handling of an HTTP request to a plugin.
- Updated gRPC server's max message size to enable responses larger than 4MiB
  from the plugin's handling of an HTTP request.

**Configs**

- Added `--stake-max-consumption-rate` which defaults to `120,000`.
- Added `--stake-min-consumption-rate` which defaults to `100,000`.
- Added `--stake-supply-cap` which defaults to `720,000,000,000,000,000` nAVAX.
- Renamed `--bootstrap-multiput-max-containers-sent` to `--bootstrap-ancestors-max-containers-sent`.
- Renamed `--bootstrap-multiput-max-containers-received` to `--bootstrap-ancestors-max-containers-received`.
- Enforced that `--staking-enabled=false` can not be specified on public networks (`Fuji` and `Mainnet`).

**Metrics**

- All `multi_put` metrics were converted to `ancestors` metrics.

**Miscellaneous**

- Improved `corruptabledb` error reporting by tracking the first reported error.
- Updated CPU tracking to use the proper EWMA tracker rather than a linear approximation.
- Separated health checks into `readiness`, `healthiness`, and `liveness` checks
  to support more fine-grained monitoring.
- Refactored API client utilities to use a `Context` rather than an explicit timeout.

## V1.7.3 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.3))

This version is backwards compatible to
[v1.7.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.0). It is
optional, but encouraged.

**The first startup of the C-Chain will take a few minutes longer due to a minor index update.**

**Consensus**

- Introduced a notion of vertex conflicts that will be used in future X-chain improvements.

**Coreth**

- Added an index mapping height to the list of accepted atomic transactions at
  that height. Generating this index will cause the node to take approximately 2
  minutes longer to startup the C-Chain for the first restart.
- Fixed bug in base fee estimation API that impacted custom defined networks.
- Decreased minimum transaction re-gossiping interval from 1s to 500ms.
- Removed websocket handler from the static VM APIs.

**Database**

- Reduced lock contention in `prefixDB`s.

**Networking**

- Increase the gossip size from `6` to `10` validators.
- Prioritized `Connected` and `Disconnected` messages in the message handler.

**Miscellaneous**

- Notified VMs of peer versions on `Connected`.
- Fixed acceptance broadcasting over IPC.
- Fixed 32-bit architecture builds for AvalancheGo (not Coreth).

## V1.7.2 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.2))

This version is backwards compatible to
[v1.7.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.0). It is
optional, but encouraged.

**Coreth**

- Fixed memory leak in the estimate gas API.
- Reduced the default RPC gas limit to 50,000,000 gas.
- Improved RPC logging.
- Removed pre-AP5 legacy code.

**PlatformVM**

- Optimized validator set change calculations.
- Removed storage of non-decided blocks.
- Simplified error handling.
- Removed pre-AP5 legacy code.

**Networking**

- Explicitly fail requests with responses that failed to be parsed.
- Removed pre-AP5 legacy code.

**Configs**

- Introduced the ability for a delayed graceful node shutdown.
- Added the ability to take all configs as environment variables for containerized deployments.

**Utils**

- Fixed panic bug in logging library when importing from external projects.

## V1.7.1 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.1))

This update is backwards compatible with
[v1.7.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.0). Please
see the expected update times in the v1.7.0 release.

**Coreth**

- Reduced fee estimate volatility.

**Consensus**

- Fixed vote bubbling for unverified block chits.

## V1.7.0 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.0))

This upgrade adds support for issuing multiple atomic transactions into a single
block and directly transferring assets between the P-chain and the C-chain.

The changes in the upgrade go into effect at 1 PM EST, December 2nd 2021 on
Mainnet. One should upgrade their node before the changes go into effect,
otherwise they may experience loss of uptime.

**All nodes should upgrade before 1 PM EST/6 PM UTC, December 2nd 2021.**

**Networking**

- Added peer uptime reports as metrics.
- Removed IP rate limiting over local networks.

**PlatformVM**

- Enabled `AtomicTx`s to be issued into `StandardBlock`s and deprecated `AtomicBlock`s.
- Added the ability to export/import AVAX to/from the C-chain.

**Coreth**

- Enabled multiple `AtomicTx`s to be issued per block.
- Added the ability to export/import AVAX to/from the P-chain.
- Updated dynamic fee calculations.

**ProposerVM**

- Removed storage of undecided blocks.

**RPCChainVM**

- Added support for metrics to be reported by plugin VMs.

**Configs**

- Removed `--snow-epoch-first-transition` and `snow-epoch-duration` as command line arguments.

## PRE_RELEASE v1.7.0-Fuji ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.0-fuji))

**Please note that this release is unable to run Mainnet - and will display
"Mainnet is not supported" if attempted to run with a Mainnet configuration.**

This upgrade adds support for issuing multiple atomic transactions into a single
block and directly transferring assets between the P-chain and the C-chain.

The changes in the upgrade go into effect at 10 AM EST, November 24th 2021 on
the Fuji testnet. After Fuji is updated and verified, a Mainnet compatible
release will be published.

**All Fuji nodes should upgrade before 10 AM EST, November 24th 2021.**

**Networking**

- Added peer uptime reports as metrics.
- Removed IP rate limiting over local networks.

**PlatformVM**

- Enabled `AtomicTx`s to be issued into `StandardBlock`s and deprecated `AtomicBlock`s.
- Added the ability to export/import AVAX to/from the C-chain.

**Coreth**

- Enabled multiple `AtomicTx`s to be issued per block.
- Added the ability to export/import AVAX to/from the P-chain.
- Updated fee constants.

**RPCChainVM**

- Added support for metrics to be reported by plugin VMs.

**Configs**

- Removed `--snow-epoch-first-transition` and `snow-epoch-duration` as command line arguments.

## V1.6.5 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.5))

This version is backwards compatible to
[v1.6.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.0). It is
optional, but encouraged.

**Bootstrapping**

- Drop inbound messages to a chain if that chain is in the execution phase of bootstrapping.
- Print beacon NodeIDs upon failure to connect to them.

**Metrics**

- Added `avalanche_{ChainID}_bootstrap_finished`, which is 1 if the chain is done bootstrapping, 0 otherwise.

**APIs**

- Added `info.uptime` API call that attempts to report the network's view of the local node.
- Added `observedUptime` to each peer's result in `info.peers`.

**Network**

- Added reported uptime to pong messages to be able to better track a local
  node's uptime as viewed by the network.
- Refactored request timeout registry to avoid a potential race condition.

## V1.6.4 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.4))

This version is backwards compatible to
[v1.6.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.0). It is
optional, but encouraged.

**Config**

- Added flag `throttler-inbound-bandwidth-refill-rate`, which specifies the max
  average inbound bandwidth usage of a peer.
- Added flag `throttler-inbound-bandwidth-max-burst-size`, which specifies the
  max inbound bandwidth usage of a peer.

**Networking**

- Updated PeerList gossiping to use the same mechanism as other gossip calls.
- Added inbound message throttling based on recent bandwidth usage.

**Metrics**

- Updated `avalanche_{ChainID}_handler_gossip_{count,sum}` to `avalanche_{ChainID}_handler_gossip_request_{count,sum}`.
- Updated `avalanche_{ChainID}_lat_get_accepted_{count,sum}` to `avalanche_{ChainID}_lat_accepted_{count,sum}`.
- Updated `avalanche_{ChainID}_lat_get_accepted_frontier_{count,sum}` to `avalanche_{ChainID}_lat_accepted_frontier_{count,sum}`.
- Updated `avalanche_{ChainID}_lat_get_ancestors_{count,sum}` to `avalanche_{ChainID}_lat_multi_put_{count,sum}`.
- Combined `avalanche_{ChainID}_lat_pull_query_{count,sum}` and
  `avalanche_{ChainID}_lat_push_query_{count,sum}` to
  `avalanche_{ChainID}_lat_chits_{count,sum}`.
- Added `avalanche_{ChainID}_app_response_{count,sum}`.
- Added `avalanche_network_bandwidth_throttler_inbound_acquire_latency_{count,sum}`
- Added `avalanche_network_bandwidth_throttler_inbound_awaiting_acquire`
- Added `avalanche_P_vm_votes_won`
- Added `avalanche_P_vm_votes_lost`

**Indexer**

- Added method `GetContainerByID` to client implementation.
- Client methods now return `[]byte` rather than `string` representations of a container.

**C-Chain**

- Updated Geth dependency to 1.10.11.
- Added a new admin API for updating the log level and measuring performance.
- Added a new `--allow-unprotected-txs` flag to allow issuance of transactions
  without EIP-155 replay protection.

**Subnet & Custom VMs**

- Ensured that all possible chains are run in `--staking-enabled=false` networks.

## V1.6.3 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.3))

This version is backwards compatible to
[v1.6.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.0). It is
optional, but encouraged.

**Config Options**

- Updated the default value of `--inbound-connection-throttling-max-conns-per-sec` to `256`.
- Updated the default value of `--meter-vms-enabled` to `true`.
- Updated the default value of `--staking-disabled-weight` to `100`.

**Metrics**

- Changed the behavior of
  `avalanche_network_buffer_throttler_inbound_awaiting_acquire` to only
  increment if the message is actually blocking.
- Changed the behavior of
  `avalanche_network_byte_throttler_inbound_awaiting_acquire` to only increment
  if the message is actually blocking.
- Added `Block/Tx` metrics on `meterVM`s.
  - Added `avalanche_{ChainID}_vm_metervm_build_block_err_{count,sum}`.
  - Added `avalanche_{ChainID}_vm_metervm_parse_block_err_{count,sum}`.
  - Added `avalanche_{ChainID}_vm_metervm_get_block_err_{count,sum}`.
  - Added `avalanche_{ChainID}_vm_metervm_verify_{count,sum}`.
  - Added `avalanche_{ChainID}_vm_metervm_verify_err_{count,sum}`.
  - Added `avalanche_{ChainID}_vm_metervm_accept_{count,sum}`.
  - Added `avalanche_{ChainID}_vm_metervm_reject_{count,sum}`.
  - Added `avalanche_{DAGID}_vm_metervm_parse_tx_err_{count,sum}`.
  - Added `avalanche_{DAGID}_vm_metervm_get_tx_err_{count,sum}`.
  - Added `avalanche_{DAGID}_vm_metervm_verify_tx_{count,sum}`.
  - Added `avalanche_{DAGID}_vm_metervm_verify_tx_err_{count,sum}`.
  - Added `avalanche_{DAGID}_vm_metervm_accept_{count,sum}`.
  - Added `avalanche_{DAGID}_vm_metervm_reject_{count,sum}`.

**Coreth**

- Applied `callTracer` fault handling fix.
- Initialized `multicoin` functions in the runtime environment.

**ProposerVM**

- Updated block `Delay` in `--staking-enabled=false` networks to be `0`.

## V1.6.2 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.2))

This version is backwards compatible to
[v1.6.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.0). It is
optional, but encouraged.

**Config Options**

- Removed `--coreth-config`. See [here.](../../nodes/maintain/chain-config-flags.md#c-chain-configs)
- Added `--throttler-inbound-node-max-processing-msgs`. See [here.](../../nodes/maintain/avalanchego-config-flags.md#message-rate-limiting-throttling)
- Added `--db-config-file`. See [here.](../../nodes/maintain/avalanchego-config-flags.md#database-config)

**API**

- API method `avm.exportAVAX` has been removed. Use `avm.export` instead.
- API method `avm.importAVAX` has been removed. Use `avm.import` instead.
- API method `info.peers` now treats the `PublicIP` field as option and only
  populates it when a valid IP is provided.
- API client `platform.getValidatorsAt` has been added.
- API client `admin.lockProfile` has been fixed to correctly call `lockProfile`.
- API client `health.health` has been fixed to properly handle responses from an unhealthy server.
- Improved responses from the Health Check API to be more descriptive.

**Benchlist**

- Changed the minimum time a validator must be unresponsive and the maximum
  amount of time a validator will be benched for. These used to be 5 minutes and
  30 minutes, respectively, and are now 2.5 minutes and 15 minutes.

**Database**

- Allowed users to specify database config with flag `--db-config-file`.

**Subnets**

- Added the ability for a client to configure a Subnet as private to restrict
  membership to only approved validators.

**Networking**

- Changed the default size of the inbound at-large message allocation from 32 MiB to 6 MiB.
- Changed the default size of the outbound at-large message allocation from 32 MiB to 6 MiB.
- Changed the default maximum number of bytes a node can take from the inbound
  at-large message allocation from 4 MiB to 2 MiB.
- Changed the default maximum number of bytes a node can take from the outbound
  at-large message allocation from 4 MiB to 2 MiB.
- Added additional inbound message rate-limiting. A node will not read more
  messages from a peer until it is processing less than
  `--throttler-inbound-node-max-processing-msgs` from that peer.
- Changed default number of non-validators an AppGossip message is gossiped to from 2 to 0.
- Changed default number of validators an AppGossip message is gossiped to from 4 to 6.
- Introduced the ability for a VM to gossip to specific validators rather than just uniformly randomly.
- Fixed an issue that caused some nodes to never attempt to reconnect to a previously disconnected node.

**ProposerVM**

- Introduced a pessimistic P-chain height lag to improve stability during high P-chain block issuance.
- Correctly applied the requested block delay.

**Metrics**

- Removed API request histogram metrics from the X-chain and the P-chain.
- Added P-chain mempool metrics.
- Added `validator_sets` metrics to the platformvm.

**Other**

- Refactored node startup and shutdown to avoid ungraceful shutdowns in the
  event that the node is started and then immediately stopped.
- Fixed P-chain mempool to correctly track the number of allocated bytes.
- Upgraded the C-chain to run Geth 1.10.9.
- Supported Abigen for the C-chain.
- Added support for pre-image support on the C-chain.
- Added support for the fee history endpoint on the C-chain.
- Refactored ID aliasing to better support GRPC tests.
- Removed the end-to-end test branch matchup logic.
- Removed the deprecated main entry point for the database migration's process manager.

## V1.6.1 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.1))

This version is backwards compatible to
[v1.6.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.0). It is
optional, but encouraged.

**Upgrades**

- Added ability to specify Subnet configs
- Added various new networking config values
- Removed legacy messages from the network library
- Fixed P-chain mempool bug that impacted AddValidator transactions on local networks
- Changed transaction gossip rules to gossip to a fixed number of validators as well as all peers
- Removed deprecated `getLiveness` method from the Health API
- Added config option to disallow connections between non-validators

**Note**

The following are deprecated and should no longer be used. They may be removed in any future version:

- API method `avm.exportAVAX` should be removed in favor of `avm.export`
- API method `avm.importAVAX` should be removed in favor of `avm.import`
- Config option `coreth-config` should be removed in favor of a [chain config file](../../nodes/maintain/chain-config-flags.md#c-chain-configs).

## V1.6.0 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.0))

**This change is not backwards compatible with previous releases.**

This upgrade adds a contention limiter to the C-chain and P-chain, introduces a
block based fee on the C-chain, and tunes some dynamic fee parameters on the
C-chain.

The changes in the upgrade go into effect at **5 PM EDT / 9 PM UTC, September
22th 2021 on Mainnet**. You should upgrade your node before the changes go into
effect, otherwise you may experience loss of uptime on your node.

More info can be found [here](https://medium.com/avalancheavax/apricot-phase-four-snowman-and-reduced-c-chain-transaction-fees-1e1f67b42ecf).

**Go**

The minimum Go version required to build AvalancheGo is now Go 1.16.8

**Bug Fixes**

Fix race condition during timeout manager startup.

**Upgrades**

- Introduced
  [Snowman++](https://github.com/ava-labs/avalanchego/blob/v1.6.0-fuji/vms/proposervm/README.md)
  on the P-chain and C-chain.
- Introduced [mempool gossiping to the
  P-chain](https://github.com/ava-labs/avalanchego/blob/v1.6.0-fuji/vms/platformvm/README.md)
  and C-chain using the VM&lt;-&gt;VM communication layer.
- Added a block based fee to C-chain blocks.
- Set the minimum gas price to 25 nAVAX and the maximum gas price to 1000 nAVAX
  in the C-chain dynamic fee mechanism.
- Rate limit incoming connections

**New Metrics**

- `avalanche_C_blks_built` / `avalanche_P_blks_built`: Number of blocks that
  have been built locally on the C-Chain and P-Chain, respectively.
- `avalanche_C_blks_builds_failed` / `avalanche_P_blks_builds_failed`: Number of
  calls to BuildBlock that failed on the C-Chain and P-Chain, respectively.

**Config Options**

- Added flag `inbound-connection-throttling-max-conns-per-sec`.(See [config documentation.](../../nodes/maintain/avalanchego-config-flags.md))
- Deprecated flag `inbound-connection-throttling-max-recent`. This flag is now ignored.

## PRE_RELEASE v1.6.0-Fuji ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.0-fuji))

**Please note that this release is unable to run Mainnet - and will display
"Mainnet is not supported" if attempted to run with a Mainnet configuration.**

This upgrade adds a contention limiter to the C-chain and P-chain, introduces a
block based fee on the C-chain, and tunes some dynamic fee parameters on the
C-chain.

The changes in the upgrade go into effect at 5 PM EDT, September 16th 2021 on
the Fuji testnet. After Fuji is updated and verified, a Mainnet compatible
release will be published.

**All Fuji nodes should upgrade before 5 PM EDT, September 16th 2021.**

**Upgrades**

- Introduced
  [Snowman++](https://github.com/ava-labs/avalanchego/blob/v1.6.0-fuji/vms/proposervm/README.md)
  on the P-chain and C-chain.
- Introduced [mempool gossiping to the
  P-chain](https://github.com/ava-labs/avalanchego/blob/v1.6.0-fuji/vms/platformvm/README.md)
  and C-chain using the VM&lt;-&gt;VM communication layer.
- Added a block based fee to C-chain blocks.
- Set the minimum gas price to 25 nAVAX and the maximum gas price to 1000 nAVAX
  in the C-chain dynamic fee mechanism.
- Added metrics for the number of blocks built and the number of failed build block attempts.

## V1.5.3 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.3))

This version is backwards compatible to [v1.5.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0).

**Uptime**

- Changed minimum uptime requirement to receive a staking reward from 60% to 80%.

**Networking**

- Added 3 new network messages: `AppRequest`, `AppResponse` and `AppGossip`.
  These messages allow instances of a blockchain to send arbitrary data to each
  other as defined by their VM. Previously, instances of a blockchain could only
  communicate with one another by sending consensus messages (`Put`,
  `PushQuery`, etc.). See `snow/engine/common/engine.go`.
- Upon receipt of a `Pong` message, disconnect from the sender if their version is incompatible.
- Prepended method named in `common.Sender` with `Send` for clarity (for example `Put` --&gt; `SendPut`).

**P-Chain**

- Added functionality to track changes in validator weight by block.
- Added API method `GetValidatorsAt` which allows for retrieval of a Subnet's
  (or the Primary Network's) validator set at a given P-Chain height.

**C-Chain**

- Incorporate changes from Geth v1.10.8
- Remove references to Ancients

**Consensus**

- Added method `Timestamp()` to the `snowman.Block` interface.

**Local Networks**

- Updated the start time of the validators in the local genesis. The end time
  for validators specified in the local config in versions before v1.5.3 is Sep.
  10, 2021 00:00:00 UTC. **Because of this, you must upgrade to AvalancheGo
  v1.5.3 in order to run a local network after this time.**

**Config Options**

- Added AvalancheGo config option `consensus-app-gossip-size`, which defines the
  number of peers an `AppGossip` message is gossiped to.
- Added C-Chain config option `log-level`. Options are: `"trace"`, `"debug"`,
  `"info"`, `"warn"`, `"error"`, `"crit"`. Defaults to `"debug"` (as before.)

## V1.5.2 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.2))

This update is backwards compatible with
[v1.5.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0). Please
see the expected update times in the v1.5.0 release.

**Coreth**

- Patched a [Geth security vulnerability](https://twitter.com/go_ethereum/status/1430067637996990464)
- Patched a panic in the API backend.

**AVM**

- Introduced stateless codec generation for improved tooling.

**Consensus**

- Added additional logging around bubbling votes.

## `V1.5.1-eth_call` ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.1-eth_call))

This update is backwards compatible with
[v1.5.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0). Please
see the expected network upgrade times in the v1.5.0 release.

This update is a hotfix for v1.5.1 that allows using `eth_call` without the
externally owned account check.

## V1.5.1 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.1))

This update is backwards compatible with
[v1.5.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0). Please
see the expected network upgrade times in the v1.5.0 release.

**Configuration**

- Removed option `bootstrap-retry-max-attempts` and added option `bootstrap-retry-warn-frequency`

**Subnets**

- Added `subnetID`s to the handshake message. This notifies peers about which
  Subnets a node is interesting in syncing.
- Optimized Subnet container gossiping.

**AVM**

- Fixed `avm.GetTx`'s JSON endpoint to properly report `amount`s on UTXOs.

**Bootstrapping**

- Fixed busy loop that could occur if a node's internet dropped during
  bootstrapping, causing the node to report a fatal error.

**RPCChainVM**

- Improved caching of unverified blocks.

**Coreth**

- Updated to Geth v1.10.7.

## V1.5.0 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0))

**This change is not backwards compatible with previous releases.**

This upgrade adds dynamic fees to the C-chain, along with various other improvements.

The changes in the upgrade go into effect at 10 AM EDT, August 24th 2021 on
Mainnet. You should upgrade your node before the changes go into effect,
otherwise you may experience loss of uptime on your node.

More info can be found [here](https://medium.com/avalancheavax/apricot-phase-three-c-chain-dynamic-fees-432d32d67b60).

**Network Upgrades**

- Added dynamic fee calculations to the C-chain.
- Increased `CreateSubnetTx` and `CreateChainTx` fees.
- Fixed heap corruption bug in delegator validation.
- Enforced `MaxStakeWeight` for delegation transactions.

**Client Upgrades**

- Added transaction indexing capabilities to the X-chain to enable historical
  lookups of transactions by address and asset.
- Added `./avalanchego` as the default command in the docker image.
- Used static dependency versions in the docker image.
- Removed database migration support and daemon runner.
- Refactored node config parsing.
- Optimized container gossiping sampling.
- Added the ability to statically build the AvalancheGo and EVM binaries.
- Simplified the `Block` interface to only expose the parent block's ID rather
  than fetching the full parent block.
- Added additional metrics for pending jobs in the consensus engines.
- Refactored P-chain statuses to handle blockchain validation statuses
  separately from transaction confirmation statuses.

**Updated APIs**

- Added `GetAddressTxs` to the `avm` API.
- Added `SetLoggerLevel` and `GetLoggerLevel` to the `Admin` API to allow fine
  grained tuning of log levels while the node is still running.
- Added `GetConfig` to the `Admin` API to allow fetching the node config that the node is currently using.
- Updated `platformvm.Client` to allow specifying `nodeID`s in
  `GetCurrentValidators` and `GetPendingValidators` and generalized the response
  to `GetStake`.

**Updated CLI Arguments**

- Removed `fetch-only`.
- Added JSON config parsing to `avm` VM.
  - Added `indexTransactions`
  - Added `indexAllowIncomplete`

## PRE_RELEASE v1.5.0-Fuji ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0-fuji))

**Please note that this release is unable to run Mainnet - and will display
"this node version doesn't support Mainnet" if attempted to run with a Mainnet
configuration. If you run a Mainnet node, no action is required until the
official release is published next week.**

**This change is not backwards compatible with previous releases.**

This upgrade adds dynamic fees to the C-chain, along with various other improvements.

The changes in the upgrade go into effect at 3 PM EDT, August 16th 2021 on the
Fuji testnet. After Fuji is updated and verified, a Mainnet compatible release
will be published.

**Network Upgrades**

- Added dynamic fee calculations to the C-chain.
- Increased `CreateSubnetTx` and `CreateChainTx` fees.
- Fixed heap corruption bug in delegator validation.
- Enforced `MaxStakeWeight` for delegation transactions.

**Client Upgrades**

- Added transaction indexing capabilities to the X-chain to enable historical
  lookups of transactions by address and asset.
- Added `./avalanchego` as the default command in the docker image.
- Used static dependency versions in the docker image.
- Removed database migration support and daemon runner.
- Refactored node config parsing.
- Optimized container gossiping sampling.
- Added the ability to statically build the AvalancheGo and EVM binaries.
- Simplified the `Block` interface to only expose the parent block's ID rather
  than fetching the full parent block.
- Added additional metrics for pending jobs in the consensus engines.
- Refactored P-chain statuses to handle blockchain validation statuses
  separately from transaction confirmation statuses.

**Updated APIs**

- Added `GetAddressTxs` to the `avm` API.
- Added `SetLoggerLevel` and `GetLoggerLevel` to the `Admin` API to allow fine
  grained tuning of log levels while the node is still running.
- Added `GetConfig` to the `Admin` API to allow fetching the node config that the node is currently using.
- Updated `platformvm.Client` to allow specifying `nodeID`s in
  `GetCurrentValidators` and `GetPendingValidators` and generalized the response
  to `GetStake`.

**Updated CLI Arguments**

- Removed `fetch-only`.
- Added JSON config parsing to `avm` VM.
  - Added `indexTransactions`
  - Added `indexAllowIncomplete`

## V1.4.12 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.12))

This update is backwards compatible. It is optional, but encouraged.

**X-Chain**

- Added formatting argument `"json"` to API method `GetTx`, which returns the
  JSON representation of the queried transaction
- Added interface type assertions

**Info API**

- Added method `GetNodeVersion` to Info API client

**Prometheus Metrics**

- Fixed and renamed metrics for bytes not sent due to compression
- Added metrics for bytes not received due to compression
- Added helper struct `noAverager` to `metrics` package

**Database**

- Updated/added benchmarks

**Shared Memory**

- Replace `Put` and `Remove` with `Apply` to allow for future atomic transaction optimization

## V1.4.11 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.11))

**C-Chain**

This release enables snapshots by default.

**Config Flags**

_Removed_

- `conn-meter-reset-duration`
- `conn-meter-max-conns`

_Added_

- `network-compression-enabled`

**Prometheus Metrics**

Many Prometheus metrics were renamed, and many histograms were replaced with 2
gauges. See
[here](https://github.com/ava-labs/avalanche-monitoring/tree/master/grafana/dashboards)
for updated Grafana Dashboards.

This release also adds helper methods to the `utils/metric` package.

**RocksDB**

RocksDB is no longer built by default when running the build script, and it is
not included in publicly released binaries. To build AvalancheGo with RocksDB,
run `export ROCKSDBALLOWED=1` in your terminal and then `scripts/build.sh`. You
must do this before you can use `--db-type=rocksdb`.

The RocksDB database now places/looks for its files in a subdirectory `rocksdb`.
Note that if you previously ran with RocksDB, you'll need to move the existing
files.

**Message Compression**

Nodes now compress some P2P messages. If a peer is version &gt;= v1.4.11, Put,
Push Query, Peer List and Multiput messages sent to the peer are compressed
using gzip before being sent over the network. This reduces AvalancheGo's
bandwidth usage.

**Inbound Connection Throttling** Refactored inbound connection rate-limiting and enable it by default.

**General Improvements**

- Refactored and improved performance of iteration over a database served by gRPC to a plugin.
- On Linux, clean up the C-Chain if AvalancheGo dies ungracefully
- Refactored P2P message definitions and move them from the `network` package.
- Added VM aliases to the HTTP API server
- Replaced `1024` with `units.KiB`, etc.
- Improved partition tolerance by processing chits in order of the creation of the corresponding queries.

**Fuji IPs**

Updated the bootstrap IPs for the Fuji Testnet.

## V1.4.10 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.10))

**Apricot Phase 2 - Patch 10**

:::caution
This update is backwards compatible. It is optional, but encouraged.
:::

The patch includes performance, throttling, and VM improvements:

- Added support to use `RocksDB` rather than `LevelDB` on supported architectures.
- Restructured inbound network throttling to be on a per-node basis, to restrict
  the bandwidth usage of peer nodes.
- Restructured outbound network throttling to weight allocated bytes by stake.
- Updated the default value of the `pruning-enabled` flag to `true` for the C-chain.
- Enabled registering of custom VMs over RPC.
- Updated blockchain status to report validation status.
- Moved `TimestampVM` into its own repository to match the expected VM creation path.
- Fixed protobuf code-gen script to place `grpc` files in the correct location.
- Passed the block bytes through the `rpcchainvm#Block.Verify` to avoid any
  potential cache eviction verification failures.

## V1.4.9 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.9))

**Apricot Phase 2 - Patch 9**

:::caution
This update is backwards compatible. It is optional, but encouraged.
:::

The patch includes performance improvements, and monitoring improvements:

- Added support to run the C-chain with pruning enabled. Pruning is currently disabled by default.
- Reduced C-chain Websocket ping interval to reduce disconnects when behind load balancer.
- Added timestamp to snowman Block interface.
- Fixed bug in C-chain API max duration enforcement for calls made via websockets.
- Added gzip header support for the HTTP endpoint.
- Added additional version descriptions to the `info.getNodeVersion` endpoint.
- Restricted connecting to node versions &gt;= 1.4.5.
- Moved daemon logs under the primary log folder.
- Added support for deterministic sampling.
- Added auto deployment GitHub action for new tags.
- Refactored config management to better support launching nodes programmatically.

## V1.4.8 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.8))

**Apricot Phase 2 - Patch 8**

:::caution
This update is backwards compatible. It is optional, but encouraged.
:::

The patch includes performance improvements, monitoring improvements, and Subnet fixes:

- Changed the AVM's fee definition to enforce fees to be paid in the chain's
  native asset. This doesn't change the X-Chain's behavior, but it makes other
  AVM instances usable.
- Added the ability to specify configs to specific chains. This deprecates the `coreth-config` CLI parameter.
- Added rate limiting to the number of new outbound connections.
- Introduced a VM wrapper that adds transparent metrics to a chain.
- Added the ability to enable continuous node profiling.
- Reduced byte allocations in the networking layer.
- Added various CLI parameters for tuning gossip parameters.
- Enabled nodes to run using an ephemeral key pair, rather than one that is read from disk.
- Removed incorrect spurious warning.
- Moved CI tests to run in GitHub Actions rather than running in Travis.
- Removed special cases from the VM interface.

**Added Command Line Arguments:**

- `profile-dir`
- `profile-continuous-enabled`
- `profile-continuous-freq`
- `profile-continuous-max-files`
- `chain-config-dir`
- `bootstrap-multiput-max-containers-received`
- `bootstrap-multiput-max-containers-sent`
- `boostrap-max-time-get-ancestors`
- `consensus-on-accept-gossip-size`
- `consensus-accepted-frontier-gossip-size`
- `meter-vms-enabled`
- `staking-ephemeral-cert-enabled`
- `outbound-connection-timeout`
- `outbound-connection-throttling-rps`

## V1.4.7 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.7))

**Apricot Phase 2 - Patch 7**

:::caution

This update is backwards compatible. It is optional, but encouraged. The patch
includes performance improvements and bug fixes.

:::

If the previously installed node version is &lt;= v1.4.4 then this node may have
stopped processing blocks. This update will repair the node and perform a
database migration. If the previously installed node version is &gt;=v1.4.5 then
this node will use the existing database and does not need to perform a database
migration.

- Fixed the pre-migration node to correctly verify the P-chain block `SHraz7TtMfTQ5DX1rREhNZW1bi7PpPzAq7xoJAwrWNQrLhQcD`.
- Fixed regression in `platformvm.GetBlockchains` to correctly return the primary Subnet blockchains.
- Updated the grpc version to v1.37.
- Optimized PeerList sampling.
- Added database benchmarks.
- Reduced various repeated memory allocations.

## V1.4.6 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.6))

**Apricot Phase 2 - Patch 6**

:::caution

This update is backwards compatible. It is optional, but encouraged. This patch
includes performance improvements and bug fixes.

:::

**If the previously installed node version is &lt;= v1.4.4 then this node will
perform a database migration. For details about the database migration please
see the v1.4.5 release notes.** 

If the previously installed node version is
v1.4.5 then this node use the existing database and does not need to perform a
database migration.

This patch:

- Removes invalid transaction issuance into P-chain mempool that caused high sustained DB writes.
- Ignored non-database files and folders in the database directory. This should
  specifically fix errors reported on macOS with .DS_Store files.
- Fixed the build-dir flag to be able to be specified via CLI without causing
  the pre-upgrade node to error.
- Removed the plugin-dir flag that is no longer supported with the node-manager
  daemon. Typically not specifying the flag leads to the correct behavior.
  However, for complex installations the build-dir flag may be required.
- Enforced gossiping messages only to connections that have finished the peer handshake.
- Reduced memory allocations during consensus traversals and bootstrapping.

## V1.4.5 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.5))

**Apricot Phase 2 - Patch 5 - DB Upgrade**

**This upgrade is more involved than the typical version update.**

:::caution

This update is backwards compatible. It is optional, but encouraged. The patch
includes significant performance improvements and numerous other updates.

:::

**VM Improvements:**

- Fully redesigned the `platformvm`'s state management.
  - Removed the usage of `versiondb`s being passed through blocks to pass state
    references that can be modified and read without re-parsing objects.
  - Implemented a base state manager to properly cache and mange writes to the underlying database.
  - Implemented CoW validator sets to enable caching multiple validator sets in memory.
  - Indexed chains by Subnet to avoid touching unused state objects.
  - Indexed validators by `nodeID` to avoid unnecessary iterations while
    accepting `addDelegator` and `addSubnetValidator` transactions.
  - Reduced the number of key-value pairs dedicated to managing validator sets
    on disk and validator uptimes.
- Added staking reward look-ups to the `platformvm`'s API to support indexing of rewards.
- Refactored validator uptime metering to simplify testing.
- Added block and transaction type metrics to the `platformvm`.
- Added API call metrics to the `avm` and the `platformvm`.
- Updated the `avm`'s state management to use `prefixdb`s, record caching
  metrics, and share additional code with the `platformvm`.
- Simplified `UTXO` management and indexing in the `avm` and `platformvm`.
- Restructured address parsing and management to be fully shared across compatible VM instances.
- Restructured shared memory of the primary Subnet to be fully shared across VM instances.
- Added a chain state implementation to support seamless caching over existing
  VM implementations and to simplify the implementation of new VMs.
- Integrated the new chain state manager into the `rpcchainvm`, which also adds various metrics.
- Added `upgradeBytes` and `configBytes` to the standard VM interface to better
  support future network upgrades.
- Added `getAtomicTx` and `getAtomicTxStatus` endpoints to the `evm` API.
- Simplified `evm` block production to be synchronously performed with the consensus engine.
- Added an atomic transaction mempool to re-introduce orphaned atomic transactions.
- Fixed bug in the `evm` client to properly set the `sourceChain` in `getAtomicUTXOs`.
- Integrated the new chain state manager into the `evm` to better optimize block management.

**Bootstrapping Improvements:**

- Removed re-traversals during bootstrapping. This significantly improves the
  performance of the node during restarts of the bootstrapping process.
- Fixed an ungraceful node shutdown when attempting to exit the node while executing bootstrapped containers.
- Fixed duplicated IPC container broadcasts during bootstrapping.
- Standardized the bootstrapping jobs queue to write to state using `prefixdb`s
  rather than implementing custom prefixing.
- Added additional bootstrapping caching and cache metrics.

**Database Migration Additions:**

- Added a daemon process manager to seamlessly migrate to the updated database format.
- Refactored version handling to track database semantic versions.
- Implemented a database manager to track and operate over different database versions.
- Implemented a `keystore` migration that automatically copies users from the
  `v1.0.0` database to the `v1.4.5` database.
- Implemented a validator uptime migration from the `v1.0.0` database to the `v1.4.5` database.

**Node Improvements:**

- Updating config parsing to always expand environment variables.
- Refactored the node config to allow specifying TLS certificates in memory without touching disk.
- Added better support for meaningful exit codes.
- Displayed listening address of the `http` and `staking` servers to aid in
  supporting non-specific port mappings.
- Implemented a `versionable` database to be able to toggle between a pass
  through database and a `versioned` database.
- Optimized ID `Set` pre-allocations and reduced the memory usage of the `struct`s.
- Enforced stricter linting rules.

**Modified command line arguments:**

For the following arguments `"default"` was previously treated as a keyword.
Now, `"default"` will attempt to be treated as the intended value of the flag.
To retain the default behavior, the flag should not be specified.

- `config-file`
- `coreth-config`
- `plugin-dir`
- `staking-tls-key-file`
- `staking-tls-cert-file`
- `bootstrap-ips`
- `bootstrap-ids`
- `ipcs-path`
- `db-dir`

For the following arguments `""` was previously treated as a keyword. Now, `""`
will attempt to be treated as the intended value of the flag. To retain the
default behavior, the flag should not be specified.

- `ipcs-chain-ids`
- `log-dir`
- `log-display-level`

It is no longer required that the `bootstrap-ips` and `bootstrap-ids` are
paired. This means it is now valid to specify a different number of
`bootstrap-ips` than `bootstrap-ids`. The `bootstrap-ips` are used to initially
connect to the network and the `bootstrap-ids` are used as the beacons in
bootstrapping.

**Added command line arguments:**

- `fetch-only`
- `build-dir`

**Removed command line arguments:**

- `xput-server-port`
- `xput-server-enabled`

## V1.4.4 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.4))

**Apricot Phase 2 - Patch 4**

:::caution
This update is backwards compatible. It is optional, but encouraged.
:::

The patch includes bug fixes and performance improvements that aim to optimize
the upcoming `db-upgrade` release.

- Skipped tailing delay in bootstrapping so that all chains finish as soon as
  the last chain is marked as bootstrapped in a Subnet.
- Improved message handling during bootstrapping to handle messages while
  waiting for other chains to sync.
- Reduced sampler allocations by re-using existing samplers.
- Updated docker scripts to only push images from the `master` branch.
- Fixed log formatting.
- Improved error messages.

## V1.4.3 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.3))

**Apricot Phase 2 - Patch 3**

:::caution
This update is backwards compatible. It is optional, but encouraged.
:::

The patch includes bug fixes, updated uptime monitoring, and performance improvements.

- Fixed benched message handling that could cause a node to be unable to
  progress during bootstrapping. This was typically experienced when the node
  would fail to transition to normal execution as it was finishing
  bootstrapping.
- Fixed a non-deterministic bug in the C-Chain codebase that could cause nodes
  that receive a lot of transaction broadcast requests to temporarily stop
  producing blocks until they process a block produced by another node.
- Restricted the number of version messages to be sent to a peer to one.
- Removed legacy handshake messages that were deprecated in Apricot Phase 2.
- Marked nodes that have been benched as being offline for uptime calculations.
- Updated the validator set to be more performant during validator set changes.
- Updated the networking to only attempt to re-connect to a peer on disconnect
  if they are currently a validator.

## V1.4.2 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.2))

**Apricot Phase 2 - Patch 2**

:::caution

This update is backwards compatible with v1.4.0 and v1.4.1. The
changes in the upgrade go into effect at 10 AM EDT, May 5th 2021 on the Fuji
testnet and 7 AM EDT, May 10th 2021 on Mainnet.

:::

The patch further reduces the size of gossiped PeerList messages and introduces several new flags:

- `network-peer-list-size` allows for tuning the number of peers gossiped in each `peerlist` message.
- `network-peer-list-gossip-size` allows for tuning the number of peers to
  gossip `peerlist` messages to.
- `network-peer-list-gossip-frequency` allows for tuning how frequently `peerlist`s are gossiped.

## V1.4.1 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.1))

**Apricot Phase 2 - Patch 1**

:::caution
This update is backwards compatible with v1.4.0. Please see the expected update times in the v1.4.0 release.
:::

The patch reduces the size of gossiped PeerList messages and introduces a new
flag `--bootstrap-beacon-connection-timeout` that allows for the beacon
connection timeout to be configured on startup.

## V1.4.0 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.0))

**Apricot Phase 2**

:::danger
**Please note that this change is not backwards compatible with previous releases.**

**The related blog post can be found** [**here**](https://medium.com/avalancheavax/apricot-phase-two-berlin-eips-enhanced-avalanche-native-token-ant-support-c2ae0febe5bf)**.**
:::

:::caution 

This upgrade applies the Ethereum Berlin upgrade to the C-chain, adds
a new AVM endpoint, and includes various stability improvements. We urge
everyone in the community to update as soon as possible in order to ensure that
their nodes remain healthy.

The changes in the upgrade go into effect at 10 AM EDT, May 5th 2021 on the Fuji
testnet and 7 AM EDT, May 10th 2021 on Mainnet.

:::

**The primary components to this upgrade include:**

- Updated Coreth to depend on v1.10.2 of `go-ethereum`.
- Applied the Ethereum Berlin upgrade. Specifically
  [EIP-2565](https://eips.ethereum.org/EIPS/eip-2565),
  [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718),
  [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929), and
  [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930).
- Added new stateful pre-compiled smart contracts to the C-chain to support ANT
  transfers and ARC-20 wrappers around ANTs.
- Added an AVM `/events` endpoint that supports websocket notification of
  transactions being accepted matching an addresses filter.
- Added two new networking message types `SignedVersion` and `SignedPeerlist` to
  improve validator -&gt; IP mappings.
- Fixed a long standing bug where shutting down the node while a chain was
  bootstrapping could cause the chain to be shut down ungracefully.
- Updated the plugin gRPC packages to paginate large requests to improve stability.
- Added the ability to run AvalancheGo's main binary as a plugin.
- Fixed a potential race condition in the LevelDB corruption protection.
- Updated the automated build scripts to better support multiple architectures.

**Added command line arguments:**

- `plugin-mode-enabled` specifies the binary to run in plugin mode.

**Removed command line arguments:**

- `p2p-tls-enabled`
- `disconnected-check-frequency`
- `disconnected-restart-timeout`
- `restart-on-disconnected`

## V1.3.2 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.2))

**Apricot Phase 1 - Patch 2**

:::danger 

This update is backwards compatible. It is optional, but encouraged.
The patch includes security improvements, bug fixes, and monitoring
improvements. 

:::

**Security Improvements**

- Enforced a strict canonical format for C-chain blocks made prior to `Apricot
  Phase 1`. This ensures that modifications to the `extra-data` block field can
  not result in modifications to the chain state during bootstrapping.
- Changed the `Keystore` to ensure only encrypted values are sent over the IPC
  between AvalancheGo and plugin processes.

**Bug Fixes:**

- Fixed delegation cap calculations to include updating the current delegation
  maximum before removing a delegator. This ensures that the delegation cap is
  always enforced.
- Fixed `AVM`'s static API to be registered correctly on startup.
- Updated node `uptime` calculations to take network upgrades into account.

**Monitoring Improvements**

- Added an optional node indexer that can provide a locally consistent ordering
  of operations accepted on a chain.
- Updated Ansible inventory to include numerous improvements (Huge thanks to @moreati).

## V1.3.1 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.1))

**Apricot Phase 1 - Patch 1**

:::danger

This update is backwards compatible. It is optional, but encouraged. The patch
includes stability, monitoring improvements, and minor bug fixes.

:::

**The primary components to this upgrade include:**

- Fixed C-chain segfault when performing compression on arm64 CPUs.
- Added group permissions to local files to enable complex node monitoring.
- Stripped white space from Auth passwords passed through the api-auth-password-file flag.
- Removed timeSinceNoOutstandingRequests as it was replaced by longestRunningRequest.
- Added additional metrics in network throttling.
- Various code cleanup.

**Added command line arguments:**

- `network-health-max-outstanding-request-duration`

**Removed command line arguments:**

- `network-health-max-time-since-no-requests`

## V1.3.0 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.0))

**Apricot Phase 1**

:::danger
Please note that this change is not backwards compatible with previous releases.

This upgrade reduces C-chain gas fees, removes C-chain gas refunds, and includes
various security improvements. We urge everyone in the community to update as
soon as possible in order to ensure that their nodes remain healthy.

:::

The changes in the upgrade go into effect at 10 AM EST, March 25th 2021 on the
Fuji testnet and 10 AM EST, March 31st 2021 on Mainnet.

**The primary components to this upgrade include:**

- Reduced C-chain gas cost from 470 nAVAX to 225 nAVAX.
- Removed C-chain gas refunds. This change adopts [EIP-3298](https://eips.ethereum.org/EIPS/eip-3298).
- Refactored C-chain verification to be cleaner when performing network upgrades.
- Fixed the Auth API to properly enforce revoked tokens.
- Strengthened the Auth API to ensure the expected signature format is used.
- Removed the Auth API's password from the CLI arguments.
- Added more strict file permissions checks.
- Added some minor additional error handling.
- Sanitized log writes before being written to disk.
- Added configurable origins to the HTTP endpoint.
- Removed attempted HTTPs to HTTP fail over on startup. Now the node will close
  on startup if upgrading the HTTP endpoint to HTTPs fails.

**Added command line arguments:**

- `api-auth-password-file` specifies the file to read the Auth API's password from.

**Removed command line arguments:**

- `api-auth-password`

## V1.2.4 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.4))

**Apricot Phase 0 - Upgrade 1 - Patch 4**

:::danger

This update is backwards compatible. It is optional, but encouraged. The patch
includes stability and monitoring improvements.

:::

- Updated README to correct storage requirements.
- Added additional error handling to Avalanche TX verification during bootstrapping.
- Updated numerous metrics, including adding numerous new metrics relating to
  node health and database usage, removing unused and invalid metrics, and
  fixing some metric names.
- Added additional logging to CI.
- Added the C-chain to the list of critical chains.

## V1.2.3 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.3-signed))

**Apricot Phase 0 - Upgrade 1 - Patch 3**

:::danger

This update is backwards compatible. It is optional, but encouraged. The patch
includes stability and monitoring improvements.

:::

- Adjusted `[network, router, consensus]` health check parameters to remove flaky health checks.
- Simplified C-chain block handling.

## V1.2.2 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.2))

**Apricot Phase 0 - Upgrade 1 - Patch 2**

:::danger

This update is backwards compatible. It is optional, but encouraged. The patch
includes stability, performance, and monitoring improvements.

:::

- Added IP aliases in the network library to avoid repeated `SYN` calls.
- Fixed bootstrap message handling when bootstrapping from yourself.
- Simplified `AdvanceTimeTx` issuance.
- Added new consensus health checks.
- Adding node health logging.
- Added health responses to health `GET` requests.
- Consolidated incoming message logs.
- Added error logging to the `LevelDB` wrapper.
- Added error codes to the `rpcdb` to avoid string parsing.
- Improved C-chain handling of canonical chain to reduce the number of reorgs.
- Improved C-chain handling of mock calls performed on the `pending` block.

## V1.2.1 ([View on GitHub](https://github.com/ava-labs/avalanchego/tree/v1.2.1))

**Apricot Phase 0 - Upgrade 1 - Patch 1**

:::danger

This update is backwards compatible. It is optional, but encouraged. The patch
includes stability, performance, and monitoring improvements.

Please note that this update removes \`network-timeout-increase\` and
‘network-timeout-reduction\` as command line arguments.

:::

Change Summary:

- Added \`UTXO\`s to the \`platformvm.getStake\` response.
- Added benchlist reporting to the \`info.peers\` response.
- Added additional health checks into the networking layer.
- Added \`percent of stake connected\` as a reported metric.
- Added bootstrapping restart logic to ensure the node has caught up to the
  current tip, even during times of high throughput.
- Added Subnet-wide bootstrapping to ensure that a chain won't fall behind due to another chain bootstrapping.
- Prevented verification of rejected blocks to avoid unnecessary computation.
- Removed gossiping of non-preferred blocks to the network.
- Switched the network timeout calculator to use an EWMA of the observed network latency.
- Removed \`Get\` requests from the network latency calculations.
- Cleaned up the benchlisting algorithm.
- Cleaned up handling of dropped messages on send.
- Cleaned up outstanding request and timeout logic.
- Generalized performance tracking to allow for prefixing of profile names.
- Added additional caching to the Avalanche bootstrapping traversal.
- Fixed Ansible linting.
- The added command line arguments mainly consist of configurations of health
  checks. Additionally, the modified network latency calculations changed the
  name of some command line arguments.

Added command line arguments:

- \`network-timeout-halflife\`
- \`network-timeout-coefficient\`
- \`network-health-min-conn-peers\`
- \`network-health-max-time-since-msg-received\`
- \`network-health-max-time-since-msg-sent\`
- \`network-health-max-portion-send-queue-full\`
- \`network-health-max-send-fail-rate\`
- \`network-health-max-time-since-no-requests\`
- \`router-health-max-drop-rate\`
- \`router-health-max-outstanding-requests\`
- \`health-check-frequency\`
- \`health-check-averager-halflife\`
- \`bootstrap-retry-enabled\`
- \`bootstrap-retry-max-attempts\`

Removed command line arguments:

- \`network-timeout-increase\`
- \`network-timeout-reduction\`

## V1.2.0 ([View on GitHub](https://github.com/ava-labs/avalanchego/tree/v1.2.0))

**Apricot Phase 0 - Upgrade 1**

:::danger

**Please note that this patch is not backwards compatible with previous
releases. This upgrade fixes performance issues related to interchange transfers
between X, C, and P chains. We urge everyone in the community to upgrade as soon
as possible in order to ensure that their nodes are not affected. Also, note
that nodes may take several extra minutes to connect after the upgrade and the
process should be allowed to complete uninterrupted.**

:::

The primary components to this upgrade include:

- Fixed atomic import validation on C-Chain
- Added rule exception logic to allow atomic bonus blocks
- Added fail-fast logic into Shared Memory if duplicated deletes are issued
- Fixed issue where polls could stall in snowman because of a failure to clear requests
- Fixed BAD BLOCK issue in Coreth due to unknown ancestors
- Fixed a race condition in the repair canonical chain script in Coreth
- Limited number of processing blocks in Snowman and processing TXs in Avalanche
- Updated networking timeout default values and benchlist settings
- Verified there was no safety violation after the initial network instability

## V1.1.5 ([View on GitHub](https://github.com/ava-labs/avalanchego/tree/v1.1.5))

**Apricot Phase 0 - Patch 5**

:::danger
This update is backwards compatible. It is optional but encouraged. The patch includes stability improvements.
:::

- Fixed a potential deadlock when registering new chains that could cause the
  P-chain and HTTP/HTTPS endpoint to block.
- Repairs TxID -&gt; Block Height indexing in the C-chain.
- Added graceful handling of empty contract deployments in the `debug_traceTransaction` API in the C-chain.
- Improved error handling in the C-chain.

## V1.1.4 ([View on GitHub](https://github.com/ava-labs/avalanchego/tree/v1.1.4))

**Apricot Phase 0 - Patch 4**

:::danger

This update is backwards compatible. It is optional but encouraged. The patch
includes CLI upgrades, API bug fixes, stability improvements, and performance
improvements.

:::

- Fixed an issue where C-chain block indexes could map to unaccepted blocks at a given height.
- Fixed VM crash when the RPCChainVM experienced high API loads.
- Fixed optimistic vote bubbling in the Avalanche Engine to correctly pass votes through processing vertices.
- Added field IncludePartial to the AVM's GetBalance and GetAllBalances API
  methods. This changes the default behavior to only return the balances of
  spendable and uniquely owned assets.
- Added the ability to specify custom genesis configs for custom network IDs.
- Added additional IPC API functionality.
- Added additional caching to the RPCChainVM.
- Improved plugin directory lookup to always work with the binary releases.

## V1.1.3 ([View on GitHub](https://github.com/ava-labs/avalanchego/tree/v1.1.3))

**Apricot Phase 0 - Patch 3**

:::danger
This update is optional but encouraged. The patch includes minor bug fixes relating to APIs.
:::

- Fixed hanging call when attempting to filter C-chain logs.
- Fixed C-chain client to call the proper multi-coin API.
- Added `getAtomicUTXOs` to `avm` and `platformvm` API clients.

## V1.1.2 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.2))

**Apricot Phase 0 - Patch 2**

:::danger
This update is optional but encouraged. The patch includes bug fixes and performance improvements.
:::

- Fixed bootstrapping processing cache to reduce duplicated traversals when bootstrapping Avalanche.
- Optimized P-chain verification during bootstrapping.
- Fixed maximum bench list calculation to use the proper input values.
- Removed extra linter runs from CI.
- Added `Height` to the `snowman.Block` interface.

## V1.1.1 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.1))

**Apricot Phase 0 - Patch 1**

:::danger
This update is optional but encouraged. The patch includes bug fixes and performance improvements.
:::

- Fixed a node crash bug when users disabled the `Health` API.
- Fixed a bug in uptime tracking that could over report a node's uptime.
- Refactored vertex parsing to use a `Codec`.
- Separated stateful and stateless vertex management.
- Added per-field slice length checking to the Codec.
- Introduced a new codec type that groups `TypeID`s together.
- Introduced message limit flags to the CLI.
- Introduced a `semanticdb` package to be used during a future database migration.
- Added Epoch tracking to the chain context.
- Improved some of the error messages returned during transaction validation.
- Reduced GC pressure in the version DB.

## V1.1.0 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.0))

**Apricot Phase 0**

:::danger

**Please note that this upgrade is not backwards compatible with previous
releases. Upgrades must be performed no later than Monday, December 7th at 11
PM UTC (6 PM EST). The upgrade, which was originally scheduled around mid
December, is now being expedited to fix an important token unlocking bug. We
urge everyone in the community to upgrade as soon as possible in order to ensure
that their nodes are not affected.**

:::

There are two primary components to this upgrade:

- General preparations for our upcoming Apricot network upgrade called the Apricot Phase Zero Upgrade
- Fixing an issue that prevented stake-able locked outputs from being unlocked
  after their lock \_\*\*\_time had passed

## V1.0.6 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.6))

:::danger

Please note that this release contains breaking changes. It changes the default
response format of platform.getTxStatus and platform.getCurrentValidators. The
update is optional but encouraged. The patch includes performance improvements
and some quality of life improvements.

:::

- Removed deprecated formats of platform.getTxStatus and platform.getCurrentValidators.
- Added support for hex encodings of imported and exported users from the keystore API.
- Set Golang requirement to v1.15.5 to avoid a DoS vulnerability found in the Golang standard lib.
- Added API clients to act as helpers interacting with the node software.
- Enabled falling back to bootstrapping if a node becomes disconnected from the rest of the network.
- Fixed the GetUTXOs APIs when UTXOs referenced multiple addresses.
- Refactored binary encoding to better generalize RPC options.
- Fixed IP block filtering to correctly set the window length.
- Generalized the codec package to be able to manage multiple codecs with different versions.
- Added Epoch to the Vertex interface in preparation of a future release.
- Deferred transaction hashing to reduce CPU/Memory utilization past fast checks.
- For those using
  [https://explorerapi.avax-dev.network/](https://explorerapi.avax-dev.network/),
  the URL is going to be shut down in a future release. Please switch over to
  [https://explorerapi.avax.network/](https://explorerapi.avax.network/).

For assistance with this update, you can join our [Discord](https://chat.avax.network/) for help.

## V1.0.5 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.5))

:::danger

Please note that the release after this one, v1.0.6, will contain the breaking
changes. Namely, the response format of `platform.getTxStatus` and
`platform.getCurrentValidators` will change.

:::

The changes in this release, v1.0.5, are backwards compatible with previous
releases. The update is optional but encouraged. The patch includes performance
improvements and some quality of life improvements.

- Added `IssueTx` and `GetUTXOs` to the C-chain API to enable issuing atomic
  swaps without revealing private keys to a node.
- Fixed memory leak in the snowman request manager with oracle block processing.
- Fix UTXO pagination bug that under-reported available funds.
- Moved chain HTTP logs to live in the human-readable chain logs folder.
- Restructure how IDs are managed to avoid heap allocations.
- Optimized the `UniformSampler`s to avoid creating multiple maps.
- Reduced usage of `ids.Set` in favor of `[]ids.ID` to better utilize continuous memory.
- Introduced `[]byte` reuse in `PrefixDB`.
- Implemented type-specific sorting functions to avoid frequent interface conversion allocations.
- Optimized AVM load user to avoid reading unnecessary information from disk.
- Removed a memory allocation + copy in socket sending for the full length of the message.

For assistance with this update, you can join our [Discord](https://chat.avax.network/) for help.

## V1.0.4 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.4))

:::danger

This update is optional but encouraged. The patch includes quality of life
improvements and various performance enhancements. Note that this update
requires the CLI parameters to be specified with -- rather than allowing for
either - or --. For example, `-public-ip=127.0.0.1` is no longer allowed and
must be specified as `--public-ip=127.0.0.1`. Otherwise, this update is
backwards compatible.

:::

```text
• Added Subnet whitelisting to allow a node owner to choose which Subnets to validate.
```

```text
• Added config file parsing for node settings.
• Added more options for specifying a node's IP address and added getNodeIP to the info *endpoint.
• Added a TxID to the result of get.Validators in the platformvm.
• Updated Coreth version.
• Cleaned up the snowball trie implementation and added additional tests to align with mutation tests.
• Implemented and optimized continuous time averages for tracking CPU and network latency.
• Significantly optimized memory allocations in various locations.
• Increased the signature verification cache size.
• Reduced DB reads during vertex management.
```

```text
• Added an optional argument includeReason to platform.getTxStatus.
If not provided, or if false, the output from getTxStatus is the same as before.

For example:
{
    "jsonrpc": "2.0",
    "result": "Dropped",
    "id": 1
}

If includeReason is true, the output from getTxStatus has a new format. It's an object that looks like this:

{
    "jsonrpc": "2.0",
    "result": {
        "status":"[Status]",
        "reason":"[Reason tx was dropped, if applicable]"
    },
    "id": 1
}

In this new format, reason will not be present unless the status is Dropped.
Anything that depends on platform.getTxStatus should switch to using the includeReason argument and use the new response format. After a few releases, we'll only support the new response format.
```

For assistance with this update, you can join our [Discord](https://chat.avax.network/) for help.
