---
tags: [Nodes]
description: Reference for all available chain config options and flags.
sidebar_label: Chain Configs
pagination_label: Chain Configs
sidebar_position: 1
---

# Chain Configs

Some chains allow the node operator to provide a custom configuration.
AvalancheGo can read chain configurations from files and pass them to the
corresponding chains on initialization.

AvalancheGo looks for these files in the directory specified by
`--chain-config-dir` AvalancheGo flag, as documented
[here](/nodes/configure/avalanchego-config-flags.md#--chain-config-dir-string). If omitted, value
defaults to `$HOME/.avalanchego/configs/chains`. This directory can have
sub-directories whose names are chain IDs or chain aliases. Each sub-directory
contains the configuration for the chain specified in the directory name. Each
sub-directory should contain a file named `config`, whose value is passed in
when the corresponding chain is initialized (see below for extension). For
example, config for the C-Chain should be at:
`{chain-config-dir}/C/config.json`.

This also applies to Subnets, for example, if a Subnet's chain id is
`2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt`, the config for this chain
should be at
`{chain-config-dir}/2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt/config.json`

:::tip

By default, none of these directories and/or files exist. You would need to
create them manually if needed.

:::

The filename extension that these files should have, and the contents of these
files, is VM-dependent. For example, some chains may expect `config.txt` while
others expect `config.json`. If multiple files are provided with the same name
but different extensions (for example `config.json` and `config.txt`) in the same
sub-directory, AvalancheGo will exit with an error.

For a given chain, AvalancheGo will follow the sequence below to look for its
config file, where all folder and file names are case sensitive:

- First it looks for a config sub-directory whose name is the chain ID - If it
  isn't found, it looks for a config sub-directory whose name is the chain's
  primary alias - If it's not found, it looks for a config sub-directory whose
  name is another alias for the chain

Alternatively, for some setups it might be more convenient to provide config
entirely via the command line. For that, you can use AvalancheGo
`--chain-config-content` flag, as documented
[here](/nodes/configure/avalanchego-config-flags.md#--chain-config-content-string).

It is not required to provide these custom configurations. If they are not
provided, a VM-specific default config will be used. And the values of these
default config are printed when the node starts.

## C-Chain Configs

In order to specify a config for the C-Chain, a JSON config file should be
placed at `{chain-config-dir}/C/config.json`. This file does not exist by
default.

For example if `chain-config-dir` has the default value which is
`$HOME/.avalanchego/configs/chains`, then `config.json` should be placed at
`$HOME/.avalanchego/configs/chains/C/config.json`.

The C-Chain config is printed out in the log when a node starts. Default values
for each config flag are specified below.

Default values are overridden only if specified in the given config file. It is
recommended to only provide values which are different from the default, as that
makes the config more resilient to future default changes. Otherwise, if
defaults change, your node will remain with the old values, which might
adversely affect your node operation.

### State Sync

#### `state-sync-enabled` (boolean)

Set to `true` to start the chain with state sync enabled. The peer will
download chain state from peers up to a recent block near tip, then proceed with
normal bootstrapping.

Defaults to perform state sync if starting a new node from scratch. However, if
running with an existing database it will default to false and not perform state
sync on subsequent runs.

Please note that if you need historical data, state sync isn't the right option.
However, it is sufficient if you are just running a validator.

#### `state-sync-skip-resume` (boolean)

If set to `true`, the chain will not resume a previously started state sync
operation that did not complete. Normally, the chain should be able to resume
state syncing without any issue. Defaults to `false`.

#### `state-sync-min-blocks` (int)

Minimum number of blocks the chain should be ahead of the local node to prefer
state syncing over bootstrapping. If the node's database is already close to the
chain's tip, bootstrapping is more efficient. Defaults to `300000`.

#### `state-sync-ids` (string)

Comma separated list of node IDs (prefixed with `NodeID-`) to fetch state sync
data from. An example setting of this field would be
`--state-sync-ids="NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg,NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ"`.
If not specified (or empty), peers are selected at random. Defaults to empty
string (`""`).

#### `state-sync-server-trie-cache` (int)

Size of trie cache used for providing state sync data to peers in MBs. Should be
a multiple of `64`. Defaults to `64`.

### Continuous Profiling

#### `continuous-profiler-dir` (string)

Enables the continuous profiler (captures a CPU/Memory/Lock profile at a
specified interval). Defaults to `""`. If a non-empty string is provided, it
enables the continuous profiler and specifies the directory to place the
profiles in.

#### `continuous-profiler-frequency` (duration)

Specifies the frequency to run the continuous profiler. Defaults `900000000000`
nano seconds which is 15 minutes.

#### `continuous-profiler-max-files` (int)

Specifies the maximum number of profiles to keep before removing the oldest.
Defaults to `5`.

### Enabling Avalanche Specific APIs

#### `snowman-api-enabled` (boolean)

Enables the Snowman API. Defaults to `false`.

#### `coreth-admin-api-enabled` (boolean)

Deprecated as of `v0.12.5`. Use `admin-api-enabled` instead.

Enables the Admin API. Defaults to `false`.

#### `coreth-admin-api-dir` (string)

Deprecated as of `v0.12.5`. Use `admin-api-dir` instead.

Specifies the directory for the Admin API to use to store CPU/Mem/Lock Profiles.
Defaults to `""`.

### Enabling EVM APIs

#### `eth-apis` ([]string)

Use the `eth-apis` field to specify the exact set of below services to enable on
your node. If this field is not set, then the default list will be:
`["eth","eth-filter","net","web3","internal-eth","internal-blockchain","internal-transaction"]`.

:::note

The names used in this configuration flag have been updated in Coreth `v0.8.14`.
The previous names containing `public-` and `private-` are deprecated. While
the current version continues to accept deprecated values, they may not be
supported in future updates and updating to the new values is recommended.

The mapping of deprecated values and their updated equivalent follows:

| Deprecated                         | Use instead            |
| ---------------------------------- | ---------------------- |
| `public-eth`                       | `eth`                  |
| `public-eth-filter`                | `eth-filter`           |
| `private-admin`                    | `admin`                |
| `private-debug`                    | `debug`                |
| `public-debug`                     | `debug`                |
| `internal-public-eth`              | `internal-eth`         |
| `internal-public-blockchain`       | `internal-blockchain`  |
| `internal-public-transaction-pool` | `internal-transaction` |
| `internal-public-tx-pool`          | `internal-tx-pool`     |
| `internal-public-debug`            | `internal-debug`       |
| `internal-private-debug`           | `internal-debug`       |
| `internal-public-account`          | `internal-account`     |
| `internal-private-personal`        | `internal-personal`    |

:::

:::note

If you populate this field, it will override the defaults so you must include
every service you wish to enable.

:::

#### `eth`

The API name `public-eth` is deprecated as of v1.7.15, and the APIs previously
under this name have been migrated to `eth`.

Adds the following RPC calls to the `eth_*` namespace. Defaults to `true`.

`eth_coinbase`
`eth_etherbase`

#### `eth-filter`

The API name `public-eth-filter` is deprecated as of v1.7.15, and the APIs
previously under this name have been migrated to `eth-filter`.

Enables the public filter API for the `eth_*` namespace. Defaults to `true`.

Adds the following RPC calls (see [here](https://eth.wiki/json-rpc/API) for
complete documentation):

- `eth_newPendingTransactionFilter`
- `eth_newPendingTransactions`
- `eth_newAcceptedTransactions`
- `eth_newBlockFilter`
- `eth_newHeads`
- `eth_logs`
- `eth_newFilter`
- `eth_getLogs`
- `eth_uninstallFilter`
- `eth_getFilterLogs`
- `eth_getFilterChanges`

#### `admin`

The API name `private-admin` is deprecated as of v1.7.15, and the APIs
previously under this name have been migrated to `admin`.

Adds the following RPC calls to the `admin_*` namespace. Defaults to `false`.

- `admin_importChain`
- `admin_exportChain`

#### `debug`

The API names `private-debug` and `public-debug` are deprecated as of v1.7.15,
and the APIs previously under these names have been migrated to `debug`.

Adds the following RPC calls to the `debug_*` namespace. Defaults to `false`.

- `debug_dumpBlock`
- `debug_accountRange`
- `debug_preimage`
- `debug_getBadBlocks`
- `debug_storageRangeAt`
- `debug_getModifiedAccountsByNumber`
- `debug_getModifiedAccountsByHash`
- `debug_getAccessibleState`

#### `net`

Adds the following RPC calls to the `net_*` namespace. Defaults to `true`.

- `net_listening`
- `net_peerCount`
- `net_version`

Note: Coreth is a virtual machine and does not have direct access to the
networking layer, so `net_listening` always returns true and `net_peerCount`
always returns 0. For accurate metrics on the network layer, users should use
the AvalancheGo APIs.

#### `debug-tracer`

Adds the following RPC calls to the `debug_*` namespace. Defaults to `false`.

- `debug_traceChain`
- `debug_traceBlockByNumber`
- `debug_traceBlockByHash`
- `debug_traceBlock`
- `debug_traceBadBlock`
- `debug_intermediateRoots`
- `debug_traceTransaction`
- `debug_traceCall`

#### `web3`

Adds the following RPC calls to the `web3_*` namespace. Defaults to `true`.

- `web3_clientVersion`
- `web3_sha3`

#### `internal-eth`

The API name `internal-public-eth` is deprecated as of v1.7.15, and the APIs
previously under this name have been migrated to `internal-eth`.

Adds the following RPC calls to the `eth_*` namespace. Defaults to `true`.

- `eth_gasPrice`
- `eth_baseFee`
- `eth_maxPriorityFeePerGas`
- `eth_feeHistory`

#### `internal-blockchain`

The API name `internal-public-blockchain` is deprecated as of v1.7.15, and the
APIs previously under this name have been migrated to `internal-blockchain`.

Adds the following RPC calls to the `eth_*` namespace. Defaults to `true`.

- `eth_chainId`
- `eth_blockNumber`
- `eth_getBalance`
- `eth_getAssetBalance`
- `eth_getProof`
- `eth_getHeaderByNumber`
- `eth_getHeaderByHash`
- `eth_getBlockByNumber`
- `eth_getBlockByHash`
- `eth_getUncleBlockByNumberAndIndex`
- `eth_getUncleBlockByBlockHashAndIndex`
- `eth_getUncleCountByBlockNumber`
- `eth_getUncleCountByBlockHash`
- `eth_getCode`
- `eth_getStorageAt`
- `eth_call`
- `eth_estimateGas`
- `eth_createAccessList`

#### `internal-transaction`

The API name `internal-public-transaction-pool` is deprecated as of v1.7.15, and
the APIs previously under this name have been migrated to
`internal-transaction`.

Adds the following RPC calls to the `eth_*` namespace. Defaults to `true`.

- `eth_getBlockTransactionCountByNumber`
- `eth_getBlockTransactionCountByHash`
- `eth_getTransactionByBlockNumberAndIndex`
- `eth_getTransactionByBlockHashAndIndex`
- `eth_getRawTransactionByBlockNumberAndIndex`
- `eth_getRawTransactionByBlockHashAndIndex`
- `eth_getTransactionCount`
- `eth_getTransactionByHash`
- `eth_getRawTransactionByHash`
- `eth_getTransactionReceipt`
- `eth_sendTransaction`
- `eth_fillTransaction`
- `eth_sendRawTransaction`
- `eth_sign`
- `eth_signTransaction`
- `eth_pendingTransactions`
- `eth_resend`

#### `internal-tx-pool`

The API name `internal-public-tx-pool` is deprecated as of v1.7.15, and the APIs
previously under this name have been migrated to `internal-tx-pool`.

Adds the following RPC calls to the `txpool_*` namespace. Defaults to `false`.

- `txpool_content`
- `txpool_contentFrom`
- `txpool_status`
- `txpool_inspect`

#### `internal-debug`

The API names `internal-private-debug` and `internal-public-debug` are
deprecated as of v1.7.15, and the APIs previously under these names have been
migrated to `internal-debug`.

Adds the following RPC calls to the `debug_*` namespace. Defaults to `false`.

- `debug_getHeaderRlp`
- `debug_getBlockRlp`
- `debug_printBlock`
- `debug_chaindbProperty`
- `debug_chaindbCompact`

#### `debug-handler`

Adds the following RPC calls to the `debug_*` namespace. Defaults to `false`.

- `debug_verbosity`
- `debug_vmodule`
- `debug_backtraceAt`
- `debug_memStats`
- `debug_gcStats`
- `debug_blockProfile`
- `debug_setBlockProfileRate`
- `debug_writeBlockProfile`
- `debug_mutexProfile`
- `debug_setMutexProfileFraction`
- `debug_writeMutexProfile`
- `debug_writeMemProfile`
- `debug_stacks`
- `debug_freeOSMemory`
- `debug_setGCPercent`

#### `internal-account`

The API name `internal-public-account` is deprecated as of v1.7.15, and the APIs
previously under this name have been migrated to `internal-account`.

Adds the following RPC calls to the `eth_*` namespace. Defaults to `true`.

- `eth_accounts`

#### `internal-personal`

The API name `internal-private-personal` is deprecated as of v1.7.15, and the
APIs previously under this name have been migrated to `internal-personal`.

Adds the following RPC calls to the `personal_*` namespace. Defaults to `false`.

- `personal_listAccounts`
- `personal_listWallets`
- `personal_openWallet`
- `personal_deriveAccount`
- `personal_newAccount`
- `personal_importRawKey`
- `personal_unlockAccount`
- `personal_lockAccount`
- `personal_sendTransaction`
- `personal_signTransaction`
- `personal_sign`
- `personal_ecRecover`
- `personal_signAndSendTransaction`
- `personal_initializeWallet`
- `personal_unpair`

### API Configuration

#### `rpc-gas-cap` (int)

The maximum gas to be consumed by an RPC Call (used in `eth_estimateGas` and
`eth_call`). Defaults to `50,000,000`.

#### `rpc-tx-fee-cap` (int)

Global transaction fee (price \* `gaslimit`) cap (measured in AVAX) for
send-transaction variants. Defaults to `100`.

#### `api-max-duration` (duration)

Maximum API call duration. If API calls exceed this duration, they will time
out. Defaults to `0` (no maximum).

#### `api-max-blocks-per-request` (int)

Maximum number of blocks to serve per `getLogs` request. Defaults to `0` (no
maximum).

#### `ws-cpu-refill-rate` (duration)

The refill rate specifies the maximum amount of CPU time to allot a single
connection per second. Defaults to no maximum (`0`).

#### `ws-cpu-max-stored` (duration)

Specifies the maximum amount of CPU time that can be stored for a single WS
connection. Defaults to no maximum (`0`).

#### `allow-unfinalized-queries` (boolean)

Allows queries for unfinalized (not yet accepted) blocks/transactions. Defaults
to `false`.

#### `accepted-cache-size` `(int)

Specifies the depth to keep accepted headers and accepted logs in the cache. This
is particularly useful to improve the performance of `eth_getLogs` for recent logs.

### Transaction Pool

#### `local-txs-enabled` (boolean)

Enables local transaction handling (prioritizes transactions submitted through
this node). Defaults to `false`.

#### `allow-unprotected-txs` (boolean)

If `true`, the APIs will allow transactions that are not replay protected
(EIP-155) to be issued through this node. Defaults to `false`.

#### `allow-unprotected-tx-hashes` ([]TxHash)

Specifies an array of transaction hashes that should be allowed to bypass
replay protection. This flag is intended for node operators that want to explicitly
allow specific transactions to be issued through their API. Defaults to an empty list.

#### `push-gossip-num-validators` (int)

Number of validators to initially send transactions received over the RPC. Defaults to 100.

#### `push-gossip-num-peers` (int)

Number of peers to initially send transactions received over the RPC. Defaults to 0.

#### `push-regossip-num-validators` (int)

Number of validators to periodically send transactions received over the RPC. Defaults to 10.

#### `push-regossip-num-peers` (int)

Number of peers to periodically send transactions received over the RPC. Defaults to 0.

#### `push-gossip-frequency` (duration)

Freqeuency to send transactions received over the RPC to peers. Defaults to `100000000` nano seconds which is
100 miliseconds.

#### `pull-gossip-frequency` (duration)

Freqeuency to request transactions from peers. Defaults to `1000000000` nano seconds which is
1 second.

#### `tx-regossip-frequency` (duration)

Deprecated as of `v0.12.5`. Use `regossip-frequency` instead.

Amount of time that should elapse before we attempt to re-gossip a transaction
that was already gossiped once. Defaults to `60000000000` nano seconds which is
1 minute.

#### `tx-pool-price-limit` (int)

Minimum gas price to enforce for acceptance into the pool. Defaults to 1 wei.

#### `tx-pool-price-bump` (int)

Minimum price bump percentage to replace an already existing transaction (nonce). Defaults to 10%.

#### `tx-pool-account-slots` (int)

Number of executable transaction slots guaranteed per account. Defaults to 16.

#### `tx-pool-global-slots` (int)

Maximum number of executable transaction slots for all accounts. Defaults to 5120.

#### `tx-pool-account-queue` (int)

Maximum number of non-executable transaction slots permitted per account. Defaults to 64.

#### `tx-pool-global-queue` (int)

Maximum number of non-executable transaction slots for all accounts. Defaults to 1024.

#### `tx-pool-lifetime` (duration)

Maximum duration a non-executable transaction will be allowed in the poll. Defaults to `600000000000` nano seconds which is
10 minutes.

### Metrics

#### `metrics-enabled` (boolean)

Enables metrics. Defaults to `false`.

#### `metrics-expensive-enabled` (boolean)

Enables expensive metrics. Defaults to `false`.

### Snapshots

#### `snapshot-async` (boolean)

If `true`, allows snapshot generation to be executed asynchronously. Defaults to
`true`.

#### `snapshot-verification-enabled` (boolean)

If `true`, verifies the complete snapshot after it has been generated. Defaults
to `false`.

### Logging

#### `log-level` (string)

Defines the log level for the chain. Must be one of `"trace"`, `"debug"`, `"info"`,
`"warn"`, `"error"`, `"crit"`. Defaults to `"info"`.

#### `log-json-format` (bool)

If `true`, changes logs to JSON format. Defaults to `false`.

### Keystore Settings

#### `keystore-directory` (string)

The directory that contains private keys. Can be given as a relative path. If
empty, uses a temporary directory at `coreth-keystore`. Defaults to the empty
string (`""`).

#### `keystore-external-signer` (string)

Specifies an external URI for a clef-type signer. Defaults to the empty string
(`""` as not enabled).

#### `keystore-insecure-unlock-allowed` (bool)

If `true`, allow users to unlock accounts in unsafe HTTP environment. Defaults
to `false`.

### Database

#### `trie-clean-cache` (int)

Size of cache used for clean trie nodes (in MBs). Should be a multiple of `64`.
Defaults to `512`.

#### `trie-dirty-cache` (int)

Size of cache used for dirty trie nodes (in MBs). When the dirty nodes exceed
this limit, they are written to disk. Defaults to `256`.

#### `trie-dirty-commit-target` (int)

Memory limit to target in the dirty cache before performing a commit (in MBs).
Defaults to `20`.

#### `trie-prefetcher-parallelism` (int)

Max concurrent disk reads trie pre-fetcher should perform at once.
Defaults to `16`.

#### `snapshot-cache` (int)

Size of the snapshot disk layer clean cache (in MBs). Should be a multiple of
`64`. Defaults to `256`.

#### `trie-clean-journal` (string)

Directory to use to save the trie clean cache (must be populated to enable
journaling the trie clean cache). Empty and disabled by default.

#### `trie-clean-rejournal` (duration)

Frequency to re-journal the trie clean cache to disk (minimum 1 minute, must
be populated to enable journaling the trie clean cache).

#### `acceptor-queue-limit` (int)

Specifies the maximum number of blocks to queue during block acceptance before
blocking on Accept. Defaults to `64`.

#### `commit-interval` (int)

Specifies the commit interval at which to persist the merkle trie to disk.
Defaults to `4096`.

#### `pruning-enabled` (boolean)

If `true`, database pruning of obsolete historical data will be enabled. This reduces the amount
of data written to disk, but does not delete any state that is written to the disk previously.
This flag should be set to `false` for nodes that need access to all data at
historical roots. Pruning will be done only for new data. Defaults to `false` in
v1.4.9, and `true` in subsequent versions.

:::note

If a node is ever run with `pruning-enabled` as `false` (archival mode), setting
`pruning-enabled` to `true` will result in a warning and the node will shut
down. This is to protect against unintentional misconfigurations of an archival
node.

To override this and switch to pruning mode, in addition to `pruning-enabled:
true`, `allow-missing-tries` should be set to `true` as well.

:::

#### `populate-missing-tries` (\*uint64)

If non-nil, sets the starting point for repopulating missing tries to
re-generate archival merkle forest.

To restore an archival merkle forest that has been corrupted (missing trie nodes
for a section of the blockchain), specify the starting point of the last block
on disk, where the full trie was available at that block to re-process blocks
from that height onwards and re-generate the archival merkle forest on startup.
This flag should be used once to re-generate the archival merkle forest and
should be removed from the config after completion. This flag will cause the
node to delay starting up while it re-processes old blocks.

#### `populate-missing-tries-parallelism` (int)

Number of concurrent readers to use when re-populating missing tries on startup.
Defaults to 1024.

#### `allow-missing-tries` (boolean)

If `true`, allows a node that was once configured as archival to switch to
pruning mode. Defaults to `false`.

#### `preimages-enabled` (boolean)

If `true`, enables preimages. Defaults to `false`.

#### `offline-pruning-enabled` (boolean)

If `true`, offline pruning will run on startup and block until it completes
(approximately one hour on Mainnet). This will reduce the size of the database
by deleting old trie nodes. **While performing offline pruning, your node will
not be able to process blocks and will be considered offline.** While ongoing,
the pruning process consumes a small amount of additional disk space (for
deletion markers and the bloom filter). For more information see
[here.](/nodes/maintain/run-offline-pruning.md#disk-space-considerations)

Since offline pruning deletes old state data, this should not be run on nodes
that need to support archival API requests.

This is meant to be run manually, so after running with this flag once, it must
be toggled back to false before running the node again. Therefore, you should
run with this flag set to true and then set it to false on the subsequent run.

#### `offline-pruning-bloom-filter-size` (int)

This flag sets the size of the bloom filter to use in offline pruning
(denominated in MB and defaulting to 512 MB). The bloom filter is kept in memory
for efficient checks during pruning and is also written to disk to allow pruning
to resume without re-generating the bloom filter.

The active state is added to the bloom filter before iterating the DB to find
trie nodes that can be safely deleted, any trie nodes not in the bloom filter
are considered safe for deletion. The size of the bloom filter may impact its
false positive rate, which can impact the results of offline pruning. This is an
advanced parameter that has been tuned to 512 MB and should not be changed
without thoughtful consideration.

#### `offline-pruning-data-directory` (string)

This flag must be set when offline pruning is enabled and sets the directory
that offline pruning will use to write its bloom filter to disk. This directory
should not be changed in between runs until offline pruning has completed.

#### `tx-lookup-limit` (uint64)

Number of recent blocks for which to maintain transaction lookup indices in the database. If set to 0,
transaction lookup indices will be maintained for all blocks. Defaults to `0`.

#### `skip-tx-indexing` (bool)

If set to `true`, the node will not index transactions. TxLookupLimit can be still used to control deleting old transaction indices.
Defaults to `false`.

### VM Networking

#### `max-outbound-active-requests` (int)

Specifies the maximum number of outbound VM2VM requests in flight at once. Defaults to `16`.

#### `max-outbound-active-cross-chain-requests` (int)

Specifies the maximum number of outbound cross-chain requests in flight at once. Defaults to `64`.

### Miscellaneous

#### `airdrop` (string)

Path to a json file that contains a list of addresses for a genesis airdrop.
Each address will be airdropped `AirdropAmount` at genesis, and the hash of the
airdrop file must match `AirdropHash`. `AirdropAmount` and `AirdropHash` are
part of the genesis config. This option applies to `subnet-evm` only (not
applicable to `coreth`).

#### `skip-upgrade-check` (bool)

If set to `true`, the chain will skip verifying that all expected network
upgrades have taken place before the last accepted block on startup. This allows
node operators to recover if their node has accepted blocks after a network
upgrade with a version of the code prior to the upgrade. Defaults to `false`.

## X-Chain Configs

In order to specify a config for the X-Chain, a JSON config file should be
placed at `{chain-config-dir}/X/config.json`.

For example if `chain-config-dir` has the default value which is
`$HOME/.avalanchego/configs/chains`, then `config.json` can be placed at
`$HOME/.avalanchego/configs/chains/X/config.json`.

This allows you to specify a config to be passed into the X-Chain. The default
values for this config are:

```json
{
  "index-transactions": false,
  "index-allow-incomplete": false
}
```

Default values are overridden only if explicitly specified in the config.

The parameters are as follows:

**Transaction Indexing**

### `index-transactions` (boolean)

Enables AVM transaction indexing if set to `true`. Default value is `false`.
When set to `true`, AVM transactions are indexed against the `address` and
`assetID` involved. This data is available via `avm.getAddressTxs`
[API](/reference/avalanchego/x-chain/api.md#avmgetaddresstxs).

:::note
If `index-transactions` is set to true, it must always be set to true
for the node's lifetime. If set to `false` after having been set to `true`, the
node will refuse to start unless `index-allow-incomplete` is also set to `true`
(see below).
:::

### `index-allow-incomplete` (boolean)

Allows incomplete indices. Default value is `false`.

This config value is ignored if there is no X-Chain indexed data in the DB and
`index-transactions` is set to `false`.

## Subnet Chain Configs

As mentioned above, if a Subnet's chain id is
`2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt`, the config for this chain
should be at
`{chain-config-dir}/2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt/config.json`

## FAQ

- When using `getBlockNumber` it will return finalized blocks. To allow for queries
  for unfinalized (not yet accepted) blocks/transactions use `allow-unfainalized-queries`
  and set to true (by default it is set to `false`)

- When deactivating offline pruning `(pruning-enabled: false)` from previously
  enabled state, this will not impact blocks whose state was already pruned. This will
  return missing trie node errors, as the node can't lookup the state of a historical
  block if that state was deleted.
