# AvalancheGo Release Notes

{% page-ref page="../tutorials/nodes-and-staking/upgrade-your-avalanchego-node.md" %}

## v1.5.1 \([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.1)\)

This update is backwards compatible with [v1.5.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0). Please see the expected update times in the v1.5.0 release.

**Subnets**

* Added `subnetID`s to the handshake message. This notifies peers about which subnet's a node is interesting in syncing.
* Optimized subnet container gossiping.

**AVM**

* Fixed `avm.GetTx`'s JSON endpoint to properly report `amount`s on UTXOs.

**Bootstrapping**

* Fixed busy loop that could occur if a node's internet dropped during bootstrapping, causing the node to report a fatal error.

**RPCChainVM**

* Improved caching of unverified blocks.

**Coreth**

- Updated to Geth v1.10.7.  


## v1.5.0 \([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0)\)

**This change is not backwards compatible with previous releases.**

This upgrade adds dynamic fees to the C-chain, along with various other improvements.

The changes in the upgrade go into effect at 10 AM EDT, August 24th 2021 on Mainnet. You should upgrade your node before the changes go into effect, otherwise you may experience loss of uptime on your node.

More info can be found [here](https://medium.com/avalancheavax/apricot-phase-three-c-chain-dynamic-fees-432d32d67b60).

**Network Upgrades**

* Added dynamic fee calculations to the C-chain.
* Increased `CreateSubnetTx` and `CreateChainTx` fees.
* Fixed heap corruption bug in delegator validation.
* Enforced `MaxStakeWeight` for delegation transactions.

**Client Upgrades**

* Added transaction indexing capabilities to the X-chain to enable historical lookups of transactions by address and asset.
* Added `./avalanchego` as the default command in the docker image.
* Used static dependency versions in the docker image.
* Removed database migration support and deamon runner.
* Refactored node config parsing.
* Optimized container gossiping sampling.
* Added the ability to statically build the AvalancheGo and EVM binaries.
* Simplified the `Block` interface to only expose the parent block's ID rather than fetching the full parent block.
* Added additional metrics for pending jobs in the consensus engines.
* Refactored P-chain statuses to handle blockchain validation statuses separately from transaction confirmation statuses.

**Updated APIs**

* Added `GetAddressTxs` to the `avm` API.
* Added `SetLoggerLevel` and `GetLoggerLevel` to the `Admin` API to allow fine grained tuning of log levels while the node is still running.
* Added `GetConfig` to the `Admin` API to allow fetching the node config that the node is currently using.
* Updated `platformvm.Client` to allow specifying `nodeID`s in `GetCurrentValidators` and `GetPendingValidators` and generalized the response to `GetStake`.

**Updated CLI Arguments**

* Removed `fetch-only`.
* Added JSON config parsing to `avm` VM.
  * Added `indexTransactions`
  * Added `indexAllowIncomplete`

## PRE\_RELEASE v1.5.0-fuji \([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0-fuji)\)

**Please note that this release is unable to run mainnet - and will display "this node version doesn't support mainnet" if attempted to run with a mainnet configuration. If you run a mainnet node, no action is required until the official release is published next week.**

**This change is not backwards compatible with previous releases.**

This upgrade adds dynamic fees to the C-chain, along with various other improvements.

The changes in the upgrade go into effect at 3 PM EDT, August 16th 2021 on the Fuji testnet. After Fuji is updated and verified, a mainnet compatible release will be published.

**Network Upgrades**

* Added dynamic fee calculations to the C-chain.
* Increased `CreateSubnetTx` and `CreateChainTx` fees.
* Fixed heap corruption bug in delegator validation.
* Enforced `MaxStakeWeight` for delegation transactions.

**Client Upgrades**

* Added transaction indexing capabilities to the X-chain to enable historical lookups of transactions by address and asset.
* Added `./avalanchego` as the default command in the docker image.
* Used static dependency versions in the docker image.
* Removed database migration support and deamon runner.
* Refactored node config parsing.
* Optimized container gossiping sampling.
* Added the ability to statically build the AvalancheGo and EVM binaries.
* Simplified the `Block` interface to only expose the parent block's ID rather than fetching the full parent block.
* Added additional metrics for pending jobs in the consensus engines.
* Refactored P-chain statuses to handle blockchain validation statuses separately from transaction confirmation statuses.

**Updated APIs**

* Added `GetAddressTxs` to the `avm` API.
* Added `SetLoggerLevel` and `GetLoggerLevel` to the `Admin` API to allow fine grained tuning of log levels while the node is still running.
* Added `GetConfig` to the `Admin` API to allow fetching the node config that the node is currently using.
* Updated `platformvm.Client` to allow specifying `nodeID`s in `GetCurrentValidators` and `GetPendingValidators` and generalized the response to `GetStake`.

**Updated CLI Arguments**

* Removed `fetch-only`.
* Added JSON config parsing to `avm` VM.
  * Added `indexTransactions`
  * Added `indexAllowIncomplete`

## v1.4.12 \([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.12)\)

This update is backwards compatible. It is optional, but encouraged.

**X-Chain**

* Added formatting argument `"json"` to API method `GetTx`, which returns the JSON representation of the queried transaction
* Added interface type assertions

**Info API**

* Added method `GetNodeVersion` to Info API client

**Prometheus Metrics**

* Fixed and renamed metrics for bytes not sent due to compression
* Added metrics for bytes not received due to compression
* Added helper struct `noAverager` to `metrics` package

**Database**

* Updated/added benchmarks

**Shared Memory**

* Replace `Put` and `Remove` with `Apply` to allow for future atomic transaction optimization

## v1.4.11 \([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.11)\)

**C-Chain**

This release enables snapshots by default.

**Config Flags**

_Removed_

* `conn-meter-reset-duration`
* `conn-meter-max-conns`

_Added_

* `network-compression-enabled`

**Prometheus Metrics**

Many Prometheus metrics were renamed, and many histograms were replaced with 2 gauges. See [here](https://github.com/ava-labs/avalanche-docs/tree/master/dashboards) for updated Grafana Dashboards.

This release also adds helper methods to the `utils/metric` package.

**RocksDB**

RocksDB is no longer built by default when running the build script, and it is not included in publicly released binaries. To build AvalancheGo with RocksDB, run `export ROCKSDBALLOWED=1` in your terminal and then `scripts/build.sh`. You must do this before you can use `--db-type=rocksdb`.

The RocksDB database now places/looks for its files in a subdirectory `rocksdb`. Note that if you previously ran with RocksDB, you'll need to move the existing files.

**Message Compression**

Nodes now compress some P2P messages. If a peer is version &gt;= v1.4.11, Put, Push Query, Peer List and Multiput messages sent to the peer are compressed using gzip before being sent over the network. This reduces AvalancheGo's bandwidth usage.

**Inbound Connection Throttling** Refactored inbound connection rate-limiting and enable it by default.

**General Improvements**

* Refactored and improved performance of iteration over a database served by gRPC to a plugin.
* On Linux, clean up the C-Chain if AvalancheGo dies ungracefully
* Refactored P2P message definitions and move them from the `network` package.
* Added VM aliases to the HTTP API server
* Replaced `1024` with `units.KiB`, etc.
* Improved partition tolerance by processing chits in order of the creation of the corresponding queries.

**Fuji IPs**

Updated the bootstrap IPs for the Fuji Testnet.

## v1.4.10 \([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.10)\)

**Apricot Phase 2 - Patch 10**

{% hint style="warning" %}
This update is backwards compatible. It is optional, but encouraged.
{% endhint %}

The patch includes performance, throttling, and VM improvements:

* Added support to use `RocksDB` rather than `LevelDB` on supported architectures.
* Restructured inbound network throttling to be on a per-node basis, to restrict the bandwidth usage of peer nodes.
* Restructured outbound network throttling to weight allocated bytes by stake.
* Updated the default value of the `pruning-enabled` flag to `true` for the C-chain.
* Enabled registering of custom VMs over RPC.
* Updated blockchain status to report validation status.
* Moved `TimestampVM` into its own repository to match the expected VM creation path.
* Fixed protobuf code-gen script to place `grpc` files in the correct location.
* Passed the block bytes through the `rpcchainvm#Block.Verify` to avoid any potential cache eviction verification failures.

## v1.4.9 \([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.9)\)

**Apricot Phase 2 - Patch 9**

{% hint style="warning" %}
This update is backwards compatible. It is optional, but encouraged.
{% endhint %}

The patch includes performance improvements, and monitoring improvements:

* Added support to run the C-chain with pruning enabled. Pruning is currently disabled by default.
* Reduced C-chain Websocket ping interval to reduce disconnects when behind load balancer.
* Added timestamp to snowman Block interface.
* Fixed bug in C-chain API max duration enforcement for calls made via websockets.
* Added gzip header support for the http endpoint.
* Added additional version descriptions to the `info.getNodeVersion` endpoint.
* Restricted connecting to node versions &gt;= 1.4.5.
* Moved daemon logs under the primary log folder.
* Added support for deterministic sampling.
* Added auto deployment GitHub action for new tags.
* Refactored config management to better support launching nodes programmatically.

## v1.4.8 \([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.8)\)

**Apricot Phase 2 - Patch 8**

{% hint style="warning" %}
This update is backwards compatible. It is optional, but encouraged.
{% endhint %}

The patch includes performance improvements, monitoring improvements, and subnet fixes:

* Changed the AVM's fee definition to enforce fees to be paid in the chain's native asset. This doesn't change the X-Chain's  behavior, but it makes other AVM instances usable.
* Added the ability to specify configs to specific chains. This deprecates the `coreth-config` CLI parameter.
* Added rate limiting to the number of new outbound connections.
* Introduced a VM wrapper that adds transparent metrics to a chain.
* Added the ability to enable continuous node profiling.
* Reduced byte allocations in the networking layer.
* Added various CLI parameters for tuning gossip parameters.
* Enabled nodes to run using an ephemeral key pair, rather than one that is read from disk.
* Removed incorrect spurious warning.
* Moved CI tests to run in Github Actions rather than running in Travis.
* Removed special cases from the VM interface.

**Added Command Line Arguments:**

* `profile-dir`
* `profile-continuous-enabled`
* `profile-continuous-freq`
* `profile-continuous-max-files`
* `chain-config-dir`
* `bootstrap-multiput-max-containers-received`
* `bootstrap-multiput-max-containers-sent`
* `boostrap-max-time-get-ancestors`
* `consensus-on-accept-gossip-size`
* `consensus-accepted-frontier-gossip-size`
* `meter-vms-enabled`
* `staking-ephemeral-cert-enabled`
* `outbound-connection-timeout`
* `outbound-connection-throttling-rps`

## v1.4.7 \([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.7)\)

**Apricot Phase 2 - Patch 7**

{% hint style="warning" %}
This update is backwards compatible. It is optional, but encouraged. The patch includes performance improvements and bug fixes.
{% endhint %}

If the previously installed node version is &lt;= v1.4.4 then this node may have stopped processing blocks. This update will repair the node and perform a database migration. For details about the database migration please see the [v1.4.5 database migration notes](avalanchego-v1.4.5-database-migration.md). If the previously installed node version is &gt;=v1.4.5 then this node will use the existing database and does not need to perform a database migration.

* Fixed the pre-migration node to correctly verify the P-chain block `SHraz7TtMfTQ5DX1rREhNZW1bi7PpPzAq7xoJAwrWNQrLhQcD`.
* Fixed regression in `platformvm.GetBlockchains` to correctly return the primary subnet blockchains.
* Updated the grpc version to v1.37.
* Optimized peerlist sampling.
* Added database benchmarks.
* Reduced various repeated memory allocations.

## v1.4.6 \([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.6)\)

**Apricot Phase 2 - Patch 6**

{% hint style="warning" %}
This update is backwards compatible. It is optional, but encouraged. This patch includes performance improvements and bug fixes.
{% endhint %}

**If the previously installed node version is &lt;= v1.4.4 then this node will perform a database migration. For details about the database migration please see the v1.4.5 release notes.** If the previously installed node version is v1.4.5 then this node use the existing database and does not need to perform a database migration.

This patch:

* Removes invalid transaction issuance into P-chain mempool that caused high sustained DB writes.
* Ignored non-database files and folders in the database directory. This should specifically fix errors reported on macOS with .DS\_Store files.
* Fixed the build-dir flag to be able to be specified via CLI without causing the preupgrade node to error.
* Removed the plugin-dir flag that is no longer supported with the node-manager daemon. Typically not specifying the flag leads to the correct behavior. However, for complex installations the build-dir flag may be required.
* Enforced gossiping messages only to connections that have finished the peer handshake.
* Reduced memory allocations during consensus traversals and bootstrapping.

## v1.4.5 \([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.5)\)

**Apricot Phase 2 - Patch 5 - DB Upgrade**

**This upgrade is more involved than the typical version update. More detailed instructions and an FAQ can be found** [**here**](https://docs.avax.network/build/release-notes/avalanchego-v1.4.5-database-migration)**.**

{% hint style="warning" %}
This update is backwards compatible. It is optional, but encouraged. The patch includes significant performance improvements and numerous other updates.
{% endhint %}

**VM Improvements:**

* Fully redesigned the `platformvm`'s state management.
  * Removed the usage of `versiondb`s being passed through blocks to pass state references that can be modified and read without re-parsing objects.
  * Implemented a base state manager to properly cache and mange writes to the underlying database.
  * Implemented CoW validator sets to enable caching multiple validator sets in memory.
  * Indexed chains by subnet to avoid touching unused state objects.
  * Indexed validators by `nodeID` to avoid unnecessary iterations while accepting `addDelegator` and `addSubnetValidator` transactions.
  * Reduced the number of key-value pairs dedicated to managing validator sets on disk and validator uptimes.
* Added staking reward look-ups to the `platformvm`'s API to support indexing of rewards.
* Refactored validator uptime metering to simplify testing.
* Added block and transaction type metrics to the `platformvm`.
* Added API call metrics to the `avm` and the `platformvm`.
* Updated the `avm`'s state management to use `prefixdb`s, record caching metrics, and share additional code with the `platformvm`.
* Simplified `UTXO` management and indexing in the `avm` and `platformvm`.
* Restructured address parsing and management to be fully shared across compatible VM instances.
* Restructured shared memory of the primary subnet to be fully shared across VM instances.
* Added a chain state implementation to support seamless caching over existing VM implementations and to simplify the implementation of new VMs.
* Integrated the new chain state manager into the `rpcchainvm`, which also adds various metrics.
* Added `upgradeBytes` and `configBytes` to the standard VM interface to better support future network upgrades.
* Added `getAtomicTx` and `getAtomicTxStatus` endpoints to the `evm` API.
* Simplified `evm` block production to be synchronously performed with the consensus engine.
* Added an atomic transaction mempool to re-introduce orphaned atomic transactions.
* Fixed bug in the `evm` client to properly set the `sourceChain` in `getAtomicUTXOs`.
* Integrated the new chain state manager into the `evm` to better optimize block management.

**Bootstrapping Improvements:**

* Removed re-traversals during bootstrapping. This significantly improves the performance of the node during restarts of the bootstrapping process.
* Fixed an ungraceful node shutdown when attempting to exit the node while executing bootstrapped containers.
* Fixed duplicated IPC container broadcasts during bootstrapping.
* Standardized the bootstrapping jobs queue to write to state using `prefixdb`s rather than implementing custom prefixing.
* Added additional bootstrapping caching and cache metrics.

**Database Migration Additions:**

* Added a daemon process manager to seamlessly migrate to the updated database format.
* Refactored version handling to track database semantic versions.
* Implemented a database manager to track and operate over different database versions.
* Implemented a `keystore` migration that automatically copies users from the `v1.0.0` database to the `v1.4.5` database.
* Implemented a validator uptime migration from the `v1.0.0` database to the `v1.4.5` database.

**Node Improvements:**

* Updating config parsing to always expand environment variables.
* Refactored the node config to allow specifying TLS certificates in memory without touching disk.
* Added better support for meaningful exit codes.
* Displayed listening address of the `http` and `staking` servers to aid in supporting non-specific port mappings.
* Implemented a `versionable` database to be able to toggle between a pass through database and a `versioned` database.
* Optimized ID `Set` pre-allocations and reduced the memory usage of the `struct`s.
* Enforced stricter linting rules.

**Modified command line arguments:**

For the following arguments `"default"` was previously treated as a keyword. Now, `"default"` will attempt to be treated as the intended value of the flag. To retain the default behavior, the flag should not be specified.

* `config-file`
* `coreth-config`
* `plugin-dir`
* `staking-tls-key-file`
* `staking-tls-cert-file`
* `bootstrap-ips`
* `bootstrap-ids`
* `ipcs-path`
* `db-dir`

For the following arguments `""` was previously treated as a keyword. Now, `""` will attempt to be treated as the intended value of the flag. To retain the default behavior, the flag should not be specified.

* `ipcs-chain-ids`
* `log-dir`
* `log-display-level`

It is no longer required that the `bootstrap-ips` and `bootstrap-ids` are paired. This means it is now valid to specify a different number of `bootstrap-ips` than `bootstrap-ids`. The `bootstrap-ips` are used to initially connect to the network and the `bootstrap-ids` are used as the beacons in bootstrapping.

**Added command line arguments:**

* `fetch-only`
* `build-dir`

**Removed command line arguments:**

* `xput-server-port`
* `xput-server-enabled`

## v1.4.4 \([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.4)\)

**Apricot Phase 2 - Patch 4**

{% hint style="warning" %}
This update is backwards compatible. It is optional, but encouraged.
{% endhint %}

The patch includes bug fixes and performance improvements that aim to optimize the upcoming `db-upgrade` release.

* Skipped tailing delay in bootstrapping so that all chains finish as soon as the last chain is marked as bootstrapped in a subnet.
* Improved message handling during bootstrapping to handle messages while waiting for other chains to sync.
* Reduced sampler allocations by re-using existing samplers.
* Updated docker scripts to only push images from the `master` branch.
* Fixed log formatting.
* Improved error messages.

## v1.4.3 \([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.3)\)

**Apricot Phase 2 - Patch 3**

{% hint style="warning" %}
This update is backwards compatible. It is optional, but encouraged.
{% endhint %}

The patch includes bug fixes, updated uptime monitoring, and performance improvements.

* Fixed benched message handling that could cause a node to be unable to progress during bootstrapping. This was typically experienced when the node would fail to transition to normal execution as it was finishing bootstrapping.
* Fixed a non-deterministic bug in the C-Chain codebase that could cause nodes that receive a lot of transaction broadcast requests to temporarily stop producing blocks until they process a block produced by another node.
* Restricted the number of version messages to be sent to a peer to one.
* Removed legacy handshake messages that were deprecated in Apricot Phase 2.
* Marked nodes that have been benched as being offline for uptime calculations.
* Updated the validator set to be more performant during validator set changes.
* Updated the networking to only attempt to re-connect to a peer on disconnect if they are currently a validator.

## v1.4.2 \([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.2)\)

**Apricot Phase 2 - Patch 2**

{% hint style="warning" %}
This update is backwards compatible with v1.4.0 and v1.4.1. The changes in the upgrade go into effect at 10 AM EDT, May 5th 2021 on the Fuji testnet and 7 AM EDT, May 10th 2021 on mainnet.
{% endhint %}

The patch further reduces the size of gossiped peerlist messages and introduces several new flags:

* `network-peer-list-size` allows for tuning the number of peers gossiped in each `peerlist` message.
* `network-peer-list-gossip-size` allows for tuning the number of peers to gossip `peerlist` messages to.
* `network-peer-list-gossip-frequency` allows for tuning how frequently `peerlist`s are gossiped.

## v1.4.1 \([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.1)\)

**Apricot Phase 2 - Patch 1**

{% hint style="warning" %}
This update is backwards compatible with v1.4.0. Please see the expected update times in the v1.4.0 release.
{% endhint %}

The patch reduces the size of gossiped peerlist messages and introduces a new flag `--bootstrap-beacon-connection-timeout` that allows for the beacon connection timeout to be configured on startup.

## v1.4.0 \([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.0)\)

**Apricot Phase 2**

{% hint style="danger" %}
**Please note that this change is not backwards compatible with previous releases.**

**The related blog post can be found** [**here**](https://medium.com/avalancheavax/apricot-phase-two-berlin-eips-enhanced-avalanche-native-token-ant-support-c2ae0febe5bf)**.**
{% endhint %}

{% hint style="warning" %}
This upgrade applies the Ethereum Berlin upgrade to the C-chain, adds a new AVM endpoint, and includes various stability improvements. We urge everyone in the community to update as soon as possible in order to ensure that their nodes remain healthy.

The changes in the upgrade go into effect at 10 AM EDT, May 5th 2021 on the Fuji testnet and 7 AM EDT, May 10th 2021 on mainnet.
{% endhint %}

**The primary components to this upgrade include:**

* Updated Coreth to depend on v1.10.2 of go-ethereum.
* Applied the Ethereum Berlin upgrade. Specifically [EIP-2565](https://eips.ethereum.org/EIPS/eip-2565), [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718), [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929), and [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930).
* Added new stateful pre-compiled smart contracts to the C-chain to support ANT transfers and ARC-20 wrappers around ANTs.
* Added an AVM `/events` endpoint that supports websocket notification of transactions being accepted matching an addresses filter.
* Added two new networking message types `SignedVersion` and `SignedPeerlist` to improve validator -&gt; IP mappings.
* Fixed a long standing bug where shutting down the node while a chain was bootstrapping could cause the chain to be shut down ungracefully.
* Updated the plugin gRPC packages to paginate large requests to improve stability.
* Added the ability to run avalanchego's main binary as a plugin.
* Fixed a potential race condition in the leveldb corruption protection.
* Updated the automated build scripts to better support multiple architectures.

**Added command line arguments:**

* `plugin-mode-enabled` specifies the binary to run in plugin mode.

**Removed command line arguments:**

* `p2p-tls-enabled`
* `disconnected-check-frequency`
* `disconnected-restart-timeout`
* `restart-on-disconnected`

## v1.3.2 \([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.2)\)

**Apricot Phase 1 - Patch 2**

{% hint style="danger" %}
This update is backwards compatible. It is optional, but encouraged. The patch includes security improvements, bug fixes, and monitoring improvements.
{% endhint %}

**Security Improvements**

* Enforced a strict canonical format for C-chain blocks made prior to `Apricot Phase 1`. This ensures that modifications to the `extra-data` block field can not result in modifications to the chain state during bootstrapping.
* Changed the `Keystore` to ensure only encrypted values are sent over the IPC between avalanchego and plugin processes.

**Bug Fixes:**

* Fixed delegation cap calculations to include updating the current delegation maximum before removing a delegator. This ensures that the delegation cap is always enforced.
* Fixed `AVM`'s static API to be registered correctly on startup.
* Updated node `uptime` calculations to take network upgrades into account.

**Monitoring Improvements**

* Added an optional node indexer that can provide a locally consistent ordering of operations accepted on a chain.
* Updated ansible inventory to include numerous improvements \(Huge thanks to @moreati\).

## v1.3.1 \([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.1)\)

**Apricot Phase 1 - Patch 1**

{% hint style="danger" %}
This update is backwards compatible. It is optional, but encouraged. The patch includes stability, monitoring improvements, and minor bug fixes.
{% endhint %}

**The primary components to this upgrade include:**

* Fixed C-chain segfault when performing compression on arm64 CPUs.
* Added group permissions to local files to enable complex node monitoring.
* Stripped white space from Auth passwords passed through the api-auth-password-file flag.
* Removed timeSinceNoOutstandingRequests as it was replaced by longestRunningRequest.
* Added additional metrics in network throttling.
* Various code cleanup.

**Added command line arguments:**

* `network-health-max-outstanding-request-duration`

**Removed command line arguments:**

* `network-health-max-time-since-no-requests`

## v1.3.0 \([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.0)\)

**Apricot Phase 1**

{% hint style="danger" %}
Please note that this change is not backwards compatible with previous releases.

This upgrade reduces C-chain gas fees, removes C-chain gas refunds, and includes various security improvements. We urge everyone in the community to update as soon as possible in order to ensure that their nodes remain healthy.
{% endhint %}

The changes in the upgrade go into effect at 10 AM EST, March 25th 2021 on the Fuji testnet and 10 AM EST, March 31st 2021 on mainnet.

**The primary components to this upgrade include:**

* Reduced C-chain gas cost from 470 nAVAX to 225 nAVAX.
* Removed C-chain gas refunds. This change adopts [EIP-3298](https://eips.ethereum.org/EIPS/eip-3298).
* Refactored C-chain verification to be cleaner when performing network upgrades.
* Fixed the Auth API to properly enforce revoked tokens.
* Strengthened the Auth API to ensure the expected signature format is used.
* Removed the Auth API's password from the CLI arguments.
* Added more strict file permissions checks.
* Added some minor additional error handling.
* Sanitized log writes before being written to disk.
* Added configurable origins to the HTTP endpoint.
* Removed attempted HTTPs to HTTP fail over on startup. Now the node will close on startup if upgrading the HTTP endpoint to HTTPs fails.

**Added command line arguments:**

* `api-auth-password-file` specifies the file to read the Auth API's password from.

**Removed command line arguments:**

* `api-auth-password`

## **v1.2.4 \(**[**View on GitHub**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.4)**\)**

**Apricot Phase 0 - Upgrade 1 - Patch 4**

{% hint style="danger" %}
This update is backwards compatible. It is optional, but encouraged. The patch includes stability and monitoring improvements.
{% endhint %}

* Updated readme to correct storage requirements.
* Added additional error handling to Avalanche Tx verification during bootstrapping.
* Updated numerous metrics, including adding numerous new metrics relating to node health and database usage, removing unused and invalid metrics, and fixing some metric names.
* Added additional logging to CI.
* Added the C-chain to the list of critical chains.

## **v1.2.3 \(**[**View on GitHub**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.3-signed)**\)**

**Apricot Phase 0 - Upgrade 1 - Patch 3**

{% hint style="danger" %}
This update is backwards compatible. It is optional, but encouraged. The patch includes stability and monitoring improvements.
{% endhint %}

* Adjusted `[network, router, consensus]` health check parameters to remove flaky health checks.
* Simplified C-chain block handling.

## **v1.2.2 \(**[**View on GitHub**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.2)**\)**

**Apricot Phase 0 - Upgrade 1 - Patch 2**

{% hint style="danger" %}
This update is backwards compatible. It is optional, but encouraged. The patch includes stability, performance, and monitoring improvements.
{% endhint %}

* Added IP aliases in the network library to avoid repeated `SYN` calls.
* Fixed bootstrap message handling when bootstrapping from yourself.
* Simplified `AdvanceTimeTx` issuance.
* Added new consensus health checks.
* Adding node health logging.
* Added health responses to health `GET` requests.
* Consolidated incoming message logs.
* Added error logging to the `LevelDB` wrapper.
* Added error codes to the `rpcdb` to avoid string parsing.
* Improved C-chain handling of canonical chain to reduce the number of reorgs.
* Improved C-chain handling of mock calls performed on the `pending` block.

## **v1.2.1 \(**[**View on GitHub**](https://github.com/ava-labs/avalanchego/tree/v1.2.1)**\)**

**Apricot Phase 0 - Upgrade 1 - Patch 1**

{% hint style="danger" %}
This update is backwards compatible. It is optional, but encouraged. The patch includes stability, performance, and monitoring improvements.

Please note that this update removes \`network-timeout-increase\` and ‘network-timeout-reduction\` as command line arguments.
{% endhint %}

Change Summary:

* Added \`UTXO\`s to the \`platformvm.getStake\` response.
* Added benchlist reporting to the \`info.peers\` response.
* Added additional health checks into the networking layer.
* Added \`percent of stake connected\` as a reported metric.
* Added bootstrapping restart logic to ensure the node has caught up to the current tip, even during times of high throughput.
* Added subnet-wide bootstrapping to ensure that a chain won't fall behind due to another chain bootstrapping.
* Prevented verification of rejected blocks to avoid unnecessary computation.
* Removed gossiping of non-preferred blocks to the network.
* Switched the network timeout calculator to use an EWMA of the observed network latency.
* Removed \`Get\` requests from the network latency calculations.
* Cleaned up the benchlisting algorithm.
* Cleaned up handling of dropped messages on send.
* Cleaned up outstanding request and timeout logic.
* Generalized performance tracking to allow for prefixing of profile names.
* Added additional caching to the Avalanche bootstrapping traversal.
* Fixed ansible linting.
* The added command line arguments mainly consist of configurations of health checks. Additionally, the modified network latency calculations changed the name of some command line args.

Added command line arguments:

* \`network-timeout-halflife\`
* \`network-timeout-coefficient\`
* \`network-health-min-conn-peers\`
* \`network-health-max-time-since-msg-received\`
* \`network-health-max-time-since-msg-sent\`
* \`network-health-max-portion-send-queue-full\`
* \`network-health-max-send-fail-rate\`
* \`network-health-max-time-since-no-requests\`
* \`router-health-max-drop-rate\`
* \`router-health-max-outstanding-requests\`
* \`health-check-frequency\`
* \`health-check-averager-halflife\`
* \`bootstrap-retry-enabled\`
* \`bootstrap-retry-max-attempts\`

Removed command line arguments:

* \`network-timeout-increase\`
* \`network-timeout-reduction\`

## v1.2.0 \([View on GitHub](https://github.com/ava-labs/avalanchego/tree/v1.2.0)\)

**Apricot Phase 0 - Upgrade 1**

{% hint style="danger" %}
**Please note that this patch is not backwards compatible with previous releases. This upgrade fixes performance issues related to interchange transfers between X, C, and P chains. We urge everyone in the community to upgrade as soon as possible in order to ensure that their nodes are not affected. Also, note that nodes may take several extra minutes to connect after the upgrade and the process should be allowed to complete uninterrupted.**
{% endhint %}

The primary components to this upgrade include:

* Fixed atomic import validation on C-Chain
* Added rule exception logic to allow atomic bonus blocks
* Added fail-fast logic into Shared Memory if duplicated deletes are issued
* Fixed issue where polls could stall in snowman because of a failure to clear requests
* Fixed BAD BLOCK issue in coreth due to unknown ancestors
* Fixed a race condition in the repair canonical chain script in coreth
* Limited number of processing blocks in Snowman and processing txs in Avalanche
* Updated networking timeout default values and benchlist settings
* Verified there was no safety violation after the initial network instability

## v1.1.5 \([View on GitHub](https://github.com/ava-labs/avalanchego/tree/v1.1.5)\)

**Apricot Phase 0 - Patch 5**

{% hint style="danger" %}
This update is backwards compatible. It is optional but encouraged. The patch includes stability improvements.
{% endhint %}

* Fixed a potential deadlock when registering new chains that could cause the P-chain and http\(s\) endpoint to block.
* Repairs TxID -&gt; Block Height indexing in the C-chain.
* Added graceful handling of empty contract deployments in the debug\_traceTransaction API in the C-chain.
* Improved error handling in the C-chain.

## v1.1.4 \([View on GitHub](https://github.com/ava-labs/avalanchego/tree/v1.1.4)\)

**Apricot Phase 0 - Patch 4**

{% hint style="danger" %}
This update is backwards compatible. It is optional but encouraged. The patch includes CLI upgrades, API bug fixes, stability improvements, and performance improvements.
{% endhint %}

* Fixed an issue where C-chain block indexes could map to unaccepted blocks at a given height.
* Fixed VM crash when the RPCChainVM experienced high API loads.
* Fixed optimistic vote bubbling in the Avalanche Engine to correctly pass votes through processing vertices.
* Added field IncludePartial to the AVM's GetBalance and GetAllBalances API methods. This changes the default behavior to only return the balances of spendable and uniquely owned assets.
* Added the ability to specify custom genesis configs for custom network IDs.
* Added additional IPC API functionality.
* Added additional caching to the RPCChainVM.
* Improved plugin directory lookup to always work with the binary releases.

## v1.1.3 \([View on GitHub](https://github.com/ava-labs/avalanchego/tree/v1.1.3)\)

**Apricot Phase 0 - Patch 3**

{% hint style="danger" %}
This update is optional but encouraged. The patch includes minor bug fixes relating to APIs.
{% endhint %}

* Fixed hanging call when attempting to filter C-chain logs.
* Fixed C-chain client to call the proper multi-coin API.
* Added `getAtomicUTXOs` to `avm` and `platformvm` API clients.

## v1.1.2 \([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.2)\)

**Apricot Phase 0 - Patch 2**

{% hint style="danger" %}
This update is optional but encouraged. The patch includes bug fixes and performance improvements.
{% endhint %}

* Fixed bootstrapping processing cache to reduce duplicated traversals when bootstrapping Avalanche.
* Optimized P-chain verification during bootstrapping.
* Fixed maximum bench list calculation to use the proper input values.
* Removed extra linter runs from CI.
* Added `Height` to the `snowman.Block` interface.

## v1.1.1 \([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.1)\)

**Apricot Phase 0 - Patch 1**

{% hint style="danger" %}
This update is optional but encouraged. The patch includes bug fixes and performance improvements.
{% endhint %}

* Fixed a node crash bug when users disabled the `Health` API.
* Fixed a bug in uptime tracking that could over report a node's uptime.
* Refactored vertex parsing to use a `Codec`.
* Separated stateful and stateless vertex management.
* Added per-field slice length checking to the Codec.
* Introduced a new codec type that groups `TypeID`s together.
* Introduced message limit flags to the CLI.
* Introduced a semanticdb package to be used during a future database migration.
* Added Epoch tracking to the chain context.
* Improved some of the error messages returned during transaction validation.
* Reduced GC pressure in the version DB.

## v1.1.0 \([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.0)\)

**Apricot Phase 0**

{% hint style="danger" %}
**Please note that this upgrade is not backwards compatible with previous releases. Upgrades must be performed no later than Monday, December 7th at 11 p.m. UTC \(6 p.m. EST\). The upgrade, which was originally scheduled around mid December, is now being expedited to fix an important token unlocking bug. We urge everyone in the community to upgrade as soon as possible in order to ensure that their nodes are not affected.**
{% endhint %}

There are two primary components to this upgrade:

* General preparations for our upcoming Apricot network upgrade called the Apricot Phase Zero Upgrade
* Fixing an issue that prevented stake-able locked outputs from being unlocked after their lock \_\*\*\_time had passed

## v1.0.6 \([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.6)\)

{% hint style="danger" %}
Please note that this release contains breaking changes described [here](https://docs.avax.network/build/apis/deprecated-api-calls). It changes the default response format of platform.getTxStatus and platform.getCurrentValidators. The update is optional but encouraged. The patch includes performance improvements and some quality of life improvements.
{% endhint %}

* Removed deprecated formats of  platform.getTxStatus and platform.getCurrentValidators.
* Added support for hex encodings of imported and exported users from the keystore API.
* Set golang requirement to v1.15.5 to avoid a DoS vulnerability found in the golang standard lib.
* Added API clients to act as helpers interacting with the node software.
* Enabled falling back to bootstrapping if a node becomes disconnected from the rest of the network.
* Fixed the GetUTXOs APIs when UTXOs referenced multiple addresses.
* Refactored binary encoding to better generalize RPC options.
* Fixed IP block filtering to correctly set the window length.
* Generalized the codec package to be able to manage multiple codecs with different versions.
* Added Epoch to the Vertex interface in preparation of a future release.
* Deferred transaction hashing to reduce CPU/Memory utilization past fast checks.
* For those using [https://explorerapi.avax-dev.network/](https://explorerapi.avax-dev.network/), the URL is going to be shut down in a future release. Please switch over to [https://explorerapi.avax.network/](https://explorerapi.avax.network/). 

For assistance with this update, follow our [Developer FAQ](https://support.avalabs.org/en/collections/2618154-developer-faq), if you are still running into issues you can join our [Discord](https://chat.avax.network/) for help.

## v1.0.5  \([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.5)\)

{% hint style="danger" %}
Please note that the release after this one, v1.0.6, will contain the breaking changes described [here](https://docs.avax.network/build/apis/deprecated-api-calls). Namely, the response format of `platform.getTxStatus` and `platform.getCurrentValidators` will change.
{% endhint %}

The changes in this release, v1.0.5, are backwards compatible with previous releases. The update is optional but encouraged. The patch includes performance improvements and some quality of life improvements.

* Added `IssueTx` and `GetUTXOs` to the C-chain API to enable issuing atomic swaps without revealing private keys to a node.
* Fixed memory leak in the snowman request manager with oracle block processing.
* Fix UTXO pagination bug that under-reported available funds.
* Moved chain http logs to live in the human-readable chain logs folder.
* Restructure how IDs are managed to avoid heap allocations.
* Optimized the `UniformSampler`s to avoid creating multiple maps.
* Reduced usage of `ids.Set` in favor of `[]ids.ID` to better utilize continuous memory.
* Introduced `[]byte` reuse in `PrefixDB`.
* Implemented type-specific sorting functions to avoid frequent interface conversion allocations.
* Optimized AVM load user to avoid reading unnecessary information from disk.
* Removed a memory allocation + copy in socket sending for the full length of the message.

For assistance with this update, follow our [Developer FAQ](https://support.avalabs.org/en/collections/2618154-developer-faq), if you are still running into issues you can join our [Discord](https://chat.avax.network) for help.

## v1.0.4  \([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.4)\)

![AvalancheGo release notes v1.0.4.png](../../.gitbook/assets/image%20%2817%29.png)

{% hint style="danger" %}
This update is optional but encouraged. The patch includes quality of life improvements and various performance enhancements. Note that this update requires the CLI parameters to be specified with -- rather than allowing for either - or --. For example, `-public-ip=127.0.0.1` is no longer allowed and must be specified as `--public-ip=127.0.0.1`. Otherwise, this update is backwards compatible.
{% endhint %}

```text
• Added subnet whitelisting to allow a node owner to choose which subnets to validate.
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

For assistance with this update, follow our [Developer FAQ](https://support.avalabs.org/en/collections/2618154-developer-faq), if you are still running into issues you can join our [Discord](https://chat.avax.network) for help.

