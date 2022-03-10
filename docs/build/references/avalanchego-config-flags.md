---
sidebar_position: 3
description: This documents list all available configuration and flags for AvalancheGo.
---

# AvalancheGo Config and Flags

You can specify the configuration of a node with the arguments below.

## Config File

#### `--config-file` (string):

Path to a JSON file that specifies this node's configuration. Command line arguments will override arguments set in the config file. This flag is ignored if `--config-file-content` is specified.

Example JSON config file:

```json
{
    "log-level": "debug"
}
```

#### `--config-file-content` (string):

As an alternative to `--config-file`, it allows specifying base64 encoded config content. Must be used in conjunction with `--config-file-content-type`.

#### `--config-file-content-type` (string):

Specifies the format of the base64 encoded config content. JSON, TOML, YAML are among currently supported file format (see [here](https://github.com/spf13/viper#reading-config-files) for full list). Required if `--config-file-content` is set.

## APIs

#### `--api-admin-enabled` (boolean):

If set to `false`, this node will not expose the Admin API. Defaults to `false`. See [here](../avalanchego-apis/admin.md) for more information.

#### `--api-auth-required` (boolean):

If set to `true`, API calls require an authorization token. Defaults to `false`. See [here](../avalanchego-apis/auth.md) for more information.

#### `--api-auth-password` (string):

The password needed to create/revoke authorization tokens. If `--api-auth-required=true`, must be specified; otherwise ignored. See [here](../avalanchego-apis/auth.md) for more information.

#### `--api-health-enabled` (boolean):

If set to `true`, this node will expose the Health API. Defaults to `true`. See [here](../avalanchego-apis/health.md) for more information.

#### `--index-enabled` (boolean): {#index-enabled}

If `false`, this node will not enable the indexer and the Index API will not be available. Defaults to `false`. See [here](../avalanchego-apis/index-api.md) for more information.

#### `--api-info-enabled` (boolean):

If set to `true`, this node will expose the Info API. Defaults to `true`. See [here](../avalanchego-apis/info.md) for more information.

#### `--api-ipcs-enabled` (boolean):

If set to `true`, this node will expose the IPCs API. Defaults to `false`. See [here](../avalanchego-apis/ipc.md) for more information.

#### `--api-keystore-enabled` (boolean):

If set to `false`, this node will not expose the Keystore API. Defaults to `true`. See [here](../avalanchego-apis/keystore.md) for more information.

#### `--api-metrics-enabled` (boolean):

If set to `false`, this node will not expose the Metrics API. Defaults to `true`. See [here](../avalanchego-apis/metrics.md) for more information.

#### `--http-shutdown-wait` (duration):

Duration to wait after receiving SIGTERM or SIGINT before initiating shutdown. The `/health` endpoint will return unhealthy during this duration (if the Health API is enabled.) Defaults to 0.

#### `--http-shutdown-timeout` (duration):

Maximum duration to wait for existing connections to complete during node shutdown. Defaults to 10 seconds.

## Assertions

#### `--assertions-enabled` (boolean):

When set to `true`, assertions will execute at runtime throughout the codebase. This is intended for use in debugging, as we may get a more specific error message. Defaults to `true`.

## Bootstrapping

#### `--bootstrap-beacon-connection-timeout` (duration):

Timeout when attempting to connect to bootstrapping beacons. Defaults to `1m`.

#### `--bootstrap-ids` (string):

Bootstrap IDs is an array of validator IDs. These IDs will be used to authenticate bootstrapping peers. An example setting of this field would be `--bootstrap-ids="NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg,NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ"`. The default value depends on the network ID.

#### `--bootstrap-ips` (string):

Bootstrap IPs is an array of IPv4:port pairs. These IP Addresses will be used to bootstrap the current Avalanche state. An example setting of this field would be `--bootstrap-ips="127.0.0.1:12345,1.2.3.4:5678"`. The default value depends on the network ID.

#### `--bootstrap-retry-enabled` (boolean):

If true, will retry bootstrapping if it fails.

#### `--bootstrap-retry-max-attempts` (uint):

Max number of times to retry bootstrapping after a failure.

#### `--bootstrap-ancestors-max-containers-sent` (uint)

Max number of containers in an Ancestors message sent by this node. Defaults to `2000`.

#### `--bootstrap-ancestors-max-containers-received` (unit)

This node reads at most this many containers from an incoming Ancestors message. Defaults to `2000`.

## Chain Configs

Some chains allow the node operator to provide a custom configuration. AvalancheGo can read chain configurations from files and pass them to the corresponding chains on initialization.

AvalancheGo looks for these files in the directory specified by `--chain-config-dir`. This directory can have sub-directories whose names are chain IDs or chain aliases. Each sub-directory contains the configuration for the chain specified in the directory name. Each sub-directory should contain a file named `config`, whose value is passed in when the corresponding chain is initialized (see below for extension). For example, the config for the C-Chain should be at: `{chain-config-dir}/C/config.json`.

The filename extension that these files should have, and the contents of these files, is VM-dependent. For example, some chains may expect `config.txt` while others expect `config.json`. If multiple files are provided with the same name but different extensions (e.g. `config.json` and `config.txt`) in the same sub-directory, AvalancheGo will exit with an error.

For a given chain, AvalancheGo will look first for a config sub-directory whose name is the chain ID. If it isn't found, it looks for a config sub-directory whose name is the chain's primary alias. If it's not found, it looks for a config sub-directory whose name is another alias for the chain. All folder and file names are case sensitive.

It is not required to provide these custom configurations. If they are not provided, a VM-specific default config will be used.

#### `--chain-config-dir` (string):

Specifies the directory that contains chain configs, as described above. Defaults to `$HOME/.avalanchego/configs/chains`. If this flag is not provided and the default directory does not exist, AvalancheGo will not exit since custom configs are optional. However, if the flag is set, the specified folder must exist, or AvalancheGo will exit with an error. This flag is ignored if `--chain-config-content` is specified.

#### `--chain-config-content` (string):

As an alternative to `--chain-config-dir`, chains custom configurations can be loaded altogether from command line via `--chain-config-content` flag. Content must be base64 encoded.

### C-Chain Configs

In order to specify a config for the C-Chain, a JSON config file should be placed at `{chain-config-dir}/C/config.json`.

For example if `chain-config-dir` has the default value which is `$HOME/.avalanchego/configs/chains`, then `config.json` can be placed at `$HOME/.avalanchego/configs/chains/C/config.json`.

The C-Chain config options described below.

The default C-Chain config is:

```json
{
  "snowman-api-enabled": false,
  "coreth-admin-api-enabled": false,
  "coreth-admin-api-dir": "",
  "eth-apis": [
    "public-eth",
    "public-eth-filter",
    "net",
    "web3",
    "internal-public-eth",
    "internal-public-blockchain",
    "internal-public-transaction-pool",
    "internal-public-account"
  ],
  "continuous-profiler-dir": "",
  "continuous-profiler-frequency": 900000000000,
  "continuous-profiler-max-files": 5,
  "rpc-gas-cap": 50000000,
  "rpc-tx-fee-cap": 100,
  "preimages-enabled": false,
  "pruning-enabled": true,
  "snapshot-async": true,
  "snapshot-verification-enabled": false,
  "metrics-enabled": false,
  "metrics-expensive-enabled": false,
  "local-txs-enabled": false,
  "api-max-duration": 0, // Default to no maximum
  "ws-cpu-refill-rate": 0,
  "ws-cpu-max-stored": 0,
  "api-max-blocks-per-request": 0, // Default to no maximum
  "allow-unfinalized-queries": false,
  "allow-unprotected-txs": false,
  "keystore-directory": "",
  "keystore-external-signer": "",
  "keystore-insecure-unlock-allowed": false,
  "remote-tx-gossip-only-enabled": false,
  "tx-regossip-frequency": 60000000000,
  "tx-regossip-max-size": 15,
  "log-level": "debug",
  "offline-pruning-enabled": false,
  "offline-pruning-bloom-filter-size": 512, // MB
  "offline-pruning-data-directory": ""
}
```

Default values are overridden only if specified in the given config.

#### Continuous Profiling

##### `continuous-profiler-dir` (string):

Enables the continuous profiler (captures a CPU/Memory/Lock profile at a specified interval). Defaults to "". If a non-empty string is provided, it enables the continuous profiler and specifies the directory to place the profiles in.

##### `continuous-profiler-frequency` (duration):

Specifies the frequency to run the continuous profiler. Defaults to 15 minutes.

##### `continuous-profiler-max-files` (int):

Specifies the maximum number of profiles to keep before removing the oldest.

#### Enabling Avalanche Specific APIs

##### `snowman-api-enabled` (boolean):

Enables the Snowman API. Defaults to false.

##### `coreth-admin-api-enabled` (boolean):

Enables the Admin API. Defaults to false.

##### `coreth-admin-api-dir` (string):

Specifies the directory for the Admin API to use to store CPU/Mem/Lock Profiles. Defaults to "".

#### Enabling EVM APIs

##### `eth-apis` ([]string):

Use the `eth-apis` field to specify the exact set of below services to enable on your node. If this field is not set, then the default list will be: `["public-eth","public-eth-filter","net","web3","internal-public-eth","internal-public-blockchain","internal-public-transaction-pool"]`.

Note: if you populate this field, it will override the defaults so you must include every service you wish to enable.

##### `public-eth`:

Adds the following RPC calls to the `eth_*` namespace. Defaults to true.

`eth_coinbase`
`eth_etherbase`

##### `public-eth-filter`:

Enables the public filter API for the `eth_*` namespace. Defaults to true.

Adds the following RPC calls (see https://eth.wiki/json-rpc/API for complete documentation):

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

##### `private-admin`:

Adds the following RPC calls to the `admin_*` namespace. Defaults to false.

- `admin_importChain`
- `admin_exportChain`

##### `public-debug`:

Adds the following RPC calls to the `debug_*` namespace. Defaults to false.

- `debug_dumpBlock`
- `debug_accountRange`

##### `private-debug`:

Adds the following RPC calls to the `debug_*` namespace. Defaults to false.

- `debug_preimage`
- `debug_getBadBlocks`
- `debug_storageRangeAt`
- `debug_getModifiedAccountsByNumber`
- `debug_getModifiedAccountsByHash`
- `debug_getAccessibleState`

##### `net`:

Adds the following RPC calls to the `net_*` namespace. Defaults to true.

- `net_listening`
- `net_peerCount`
- `net_version`

Note: Coreth is a virtual machine and does not have direct access to the networking layer, so `net_listening` always returns true and `net_peerCount` always returns 0. For accurate metrics on the network layer, users should use the AvalancheGo APIs.

##### `debug-tracer`:

Adds the following RPC calls to the `debug_*` namespace. Defaults to false.

- `debug_traceChain`
- `debug_traceBlockByNumber`
- `debug_traceBlockByHash`
- `debug_traceBlock`
- `debug_traceBadBlock`
- `debug_intermediateRoots`
- `debug_traceTransaction`
- `debug_traceCall`

##### `web3`:

Adds the following RPC calls to the `web3_*` namespace. Defaults to true.

- `web3_clientVersion`
- `web3_sha3`

##### `internal-public-eth`:

Adds the following RPC calls to the `eth_*` namespace. Defaults to true.

- `eth_gasPrice`
- `eth_baseFee`
- `eth_maxPriorityFeePerGas`
- `eth_feeHistory`

##### `internal-public-blockchain`:

Adds the following RPC calls to the `eth_*` namespace. Defaults to true.

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

##### `internal-public-transaction-pool`:

Adds the following RPC calls to the `eth_*` namespace. Defaults to true.

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

##### `internal-public-tx-pool`:

Adds the following RPC calls to the `txpool_*` namespace. Defaults to false.

- `txpool_content`
- `txpool_contentFrom`
- `txpool_status`
- `txpool_inspect`

##### `internal-public-debug`:

Adds the following RPC calls to the `debug_*` namespace. Defaults to false.

- `debug_getHeaderRlp`
- `debug_getBlockRlp`
- `debug_printBlock`

##### `internal-private-debug`:

Adds the following RPC calls to the `debug_*` namespace. Defaults to false.

- `debug_chaindbProperty`
- `debug_chaindbCompact`

##### `internal-public-account`:

Adds the following RPC calls to the `eth_*` namespace. Defaults to true.

- `eth_accounts`

##### `internal-private-personal`:

Adds the following RPC calls to the `personal_*` namespace. Defaults to false.

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

#### API Configuration

##### `rpc-gas-cap` (int):

The maximum gas to be consumed by an RPC Call (used in `eth_estimateGas` and `eth_call`). Defaults to 50,000,000.

##### `rpc-tx-fee-cap` (int):

Global transaction fee (price \* gaslimit) cap (measured in AVAX) for send-transaction variants. Defaults to 100.

##### `api-max-duration` (duration):

Maximum API call duration. If API calls exceed this duration, they will time out. Defaults to 0 (no maximum).

##### `api-max-blocks-per-request` (int):

Maximum number of blocks to serve per `getLogs` request. Defaults to 0 (no maximum).

##### `ws-cpu-refill-rate` (duration):

The refill rate specifies the maximum amount of CPU time to allot a single connection per second. Defaults to no maximum (0).

##### `ws-cpu-max-stored` (duration):

Specifies the maximum amount of CPU time that can be stored for a single WS connection. Defaults to no maximum (0).

##### `allow-unfinalized-queries` (boolean):

Allows queries for unfinalized (not yet accepted) blocks/transactions. Defaults to false.

#### Transaction Pool

##### `local-txs-enabled` (boolean):

Enables local transaction handling (prioritizes transactions submitted through this node). Defaults to false.

##### `allow-unprotected-txs` (boolean):

If true, the APIs will allow transactions that are not replay protected (EIP-155) to be issued through this node. Defaults to false.

##### `remote-tx-gossip-only-enabled` (boolean):

If true, the node will only gossip remote transactions to prevent transactions issued through this node from being broadcast to the network. Defaults to false.

##### `tx-regossip-frequency` (duration):

Amount of time that should elapse before we attempt to re-gossip a transaction that was already gossiped once. Defaults to 1 minute.

##### `tx-regossip-max-size` (int):

Maximum number of transactions to re-gossip at once. Defaults to 15.

#### Metrics

##### `metrics-enabled` (boolean):

Enables metrics. Defaults to false.

##### `metrics-expensive-enabled` (boolean):

Enables expensive metrics. Defaults to false.

#### Database

##### `pruning-enabled` (boolean):

If true, database pruning of obsolete historical data will be enabled. Should be disabled for nodes that need access to all data at historical roots. Pruning will be done only for new data. Defaults to `false` in v1.4.9, and `true` in subsequent versions.

##### `preimages-enabled` (boolean):

If true, enables preimages. Defaults to false.

##### `offline-pruning-enabled` (boolean):

If true, offline pruning will run on startup and block until it completes (approximately one hour on mainnet). This will reduce the size of the database by deleting old trie nodes. **While performing offline pruning, your node will not be able to process blocks and will be considered offline.**
While ongoing, the pruning process consumes a small amount of additional disk space (for deletion markers and the bloom filter). For more information see [here.](../tutorials/nodes-and-staking/run-offline-pruning.md#disk-space-considerations)

Since offline pruning deletes old state data, this should not be run on nodes that need to support archival API requests.

This is meant to be run manually, so after running with this flag once, it must be toggled back to false before running the node again. Therefore, you should run with this flag set to true and then set it to false on the subsequent run.

##### `offline-pruning-bloom-filter-size` (int):

This flag sets the size of the bloom filter to use in offline pruning (denominated in MB and defaulting to 512 MB). The bloom filter is kept in memory for efficient checks during pruning and is also written to disk to allow pruning to resume withou re-generating the bloom filter.

The active state is added to the bloom filter before iterating the DB to find trie nodes that can be safely deleted, any trie nodes not in the bloom filter are considered safe for deletion. The size of the bloom filter may impact its false positive rate, which can impact the results of offline pruning. This is an advanced parameter that has been tuned to 512 MB and should not be changed without thoughtful consideration.

##### `offline-pruning-data-directory` (string):

This flag must be set when offline pruning is enabled and sets the directory that offline pruning will use to write its bloom filter to disk. This directory should not be changed in between runs until offline pruning has completed.

#### Snapshots

##### `snapshot-async` (boolean):

If true, allows snapshot generation to be executed asynchronously. Defaults to true.

##### `snapshot-verification-enabled` (boolean):

If true, verifies the complete snapshot after it has been generated. Defaults to false.

#### Log Level

##### `log-level` (string):

Defines the log level. Must be one of `"trace"`, `"debug"`, `"info"`, `"warn"`, `"error"`, `"crit"`. Defaults to `"debug"`.

#### Keystore Settings

##### `keystore-directory` (string):

The directory that contains private keys. Can be given as a relative path. If empty, uses a temporary directory at `coreth-keystore`. Defaults to empty string.

##### `keystore-external-signer` (string):

Specifies an external URI for a clef-type signer. Defaults to the empty string (not enabled).

##### `keystore-insecure-unlock-allowed` (bool):

If true, allow users to unlock accounts in unsafe HTTP environment. Defaults to false.

### X-Chain Configs

In order to specify a config for the X-Chain, a JSON config file should be placed at `{chain-config-dir}/X/config.json`.

For example if `chain-config-dir` has the default value which is `$HOME/.avalanchego/configs/chains`, then `config.json` can be placed at `$HOME/.avalanchego/configs/chains/X/config.json`.

This allows you to specify a config to be passed into the X-Chain. The default values for this config are:

```json
{
  "index-transactions": false,
  "index-allow-incomplete": false
}
```

Default values are overridden only if explicitly specified in the config.

The parameters are as follows:

**Transaction Indexing**

#### `index-transactions` (boolean):

Enables AVM transaction indexing if set to `true`. Default value is `false`. When set to `true`, AVM transactions are indexed against the `address` and `assetID` involved. This data is available via `avm.getAddressTxs` [API](../avalanchego-apis/x-chain.mdx#avmgetaddresstxs).

Please note that if `index-transactions` is set to true, it must always be set to true for the node's lifetime. If set to `false` after having been set to `true`, the node will refuse to start unless `index-allow-incomplete` is also set to `true` (see below).

#### `index-allow-incomplete` (boolean):

Allows incomplete indices. Default value is `false`.

This config value is ignored if there is no X-Chain indexed data in the DB and `index-transactions` is set to `false`.

## Database

##### `--db-dir` (string, file path):

Specifies the directory to which the database is persisted. Defaults to `"$HOME/.avalanchego/db"`.

##### `--db-type` (string):

Specifies the type of database to use. Must be one of `leveldb`, `rocksdb`, `memdb`. `memdb` is an in-memory, non-persisted database.

Note that when running with `leveldb`, the node can't read data that was persisted when running with `rocksdb`, and vice-versa.

**Two important notes about RocksDB**: First, RocksDB does not work on all computers. Second, RocksDB is not built by default and is not included in publicly released binaries. To build AvalancheGo with RocksDB, run `export ROCKSDBALLOWED=1` in your terminal and then `scripts/build.sh`. You must do this before you can use `--db-type=rocksdb`.

### Database Config

#### `--db-config-file` (string):

Path to the database config file. Ignored if `--config-file-content` is specified.

#### `--db-config-file-content` (string):

As an alternative to `--db-config-file`, it allows specifying base64 encoded database config content.

#### LevelDB Config

A LevelDB config file must be JSON and may have these keys.
Any keys not given will receive the default value.

```go
{
	// BlockSize is the minimum uncompressed size in bytes of each 'sorted
	// table' block.
	"blockCacheCapacity": int
	// BlockSize is the minimum uncompressed size in bytes of each 'sorted
	// table' block.
	"blockSize": int
	// CompactionExpandLimitFactor limits compaction size after expanded.  This
	// will be multiplied by table size limit at compaction target level.
	"compactionExpandLimitFactor": int
	// CompactionGPOverlapsFactor limits overlaps in grandparent (Level + 2)
	// that a single 'sorted table' generates.  This will be multiplied by
	// table size limit at grandparent level.
	"compactionGPOverlapsFactor": int
	// CompactionL0Trigger defines number of 'sorted table' at level-0 that will
	// trigger compaction.
	"compactionL0Trigger": int
	// CompactionSourceLimitFactor limits compaction source size. This doesn't
	// apply to level-0.  This will be multiplied by table size limit at
	// compaction target level.
	"compactionSourceLimitFactor": int
	// CompactionTableSize limits size of 'sorted table' that compaction
	// generates.  The limits for each level will be calculated as:
	//   CompactionTableSize * (CompactionTableSizeMultiplier ^ Level)
	// The multiplier for each level can also fine-tuned using
	// CompactionTableSizeMultiplierPerLevel.
	"compactionTableSize": int
	// CompactionTableSizeMultiplier defines multiplier for CompactionTableSize.
	"compactionTableSizeMultiplier": float
	"compactionTableSizeMultiplierPerLevel": []float
	// CompactionTotalSizeMultiplier defines multiplier for CompactionTotalSize.
	"compactionTotalSizeMultiplier": float64
	// OpenFilesCacheCapacity defines the capacity of the open files caching.
	"openFilesCacheCapacity": int
	// There are two buffers of size WriteBuffer used.
	"writeBuffer": int
	"filterBitsPerKey": int
}
```

#### RocksDB Config File

Custom config is not yet supported for RocksDB.

## Genesis

#### `--genesis` (string):

Path to a JSON file containing the genesis data to use. Ignored when running standard networks (Mainnet, Fuji Testnet), or when `--genesis-content` is specified. If not given, uses default genesis data. For an example of a JSON representation of genesis data, see [here](https://github.com/ava-labs/avalanchego/blob/master/genesis/genesis_local.go#L16).

#### `--genesis-content` (string):

As an alternative to `--genesis`, it allows specifying base64 encoded genesis data to use.

## HTTP Server

#### `--http-host` (string):

The address that HTTP APIs listen on. Defaults to `127.0.0.1`. This means that by default, your node can only handle API calls made from the same machine. To allow API calls from other machines, use `--http-host=`. You can also enter domain names as parameter.

#### `--http-port` (int):

Each node runs an HTTP server that provides the APIs for interacting with the node and the Avalanche network. This argument specifies the port that the HTTP server will listen on. The default value is `9650`.

#### `--http-tls-cert-file` (string, file path):

This argument specifies the location of the TLS certificate used by the node for the HTTPS server. This must be specified when `--http-tls-enabled=true`. There is no default value. This flag is ignored if `--http-tls-cert-file-content` is specified.

#### `--http-tls-cert-file-content` (string):

As an alternative to `--http-tls-cert-file`, it allows specifying base64 encoded content of the TLS certificate used by the node for the HTTPS server. Note that full certificate content, with the leading and trailing header, must be base64 encoded. This must be specified when `--http-tls-enabled=true`.

#### `--http-tls-enabled` (boolean):

If set to `true`, this flag will attempt to upgrade the server to use HTTPS. Defaults to `false`.

#### `--http-tls-key-file` (string, file path):

This argument specifies the location of the TLS private key used by the node for the HTTPS server. This must be specified when `--http-tls-enabled=true`. There is no default value. This flag is ignored if `--http-tls-key-file-content` is specified.

#### `--http-tls-key-file-content` (string):

As an alternative to `--http-tls-key-file`, it allows specifying base64 encoded content of the TLS private key used by the node for the HTTPS server. Note that full private key content, with the leading and trailing header, must be base64 encoded. This must be specified when `--http-tls-enabled=true`.

## IPCS

#### `--ipcs-chain-ids` (string)

Comma separated list of chain ids to connect to (e.g. `11111111111111111111111111111111LpoYY,4R5p2RXDGLqaifZE4hHWH9owe34pfoBULn1DrQTWivjg8o4aH`). There is no default value.

#### `--ipcs-path` (string)

The directory (Unix) or named pipe prefix (Windows) for IPC sockets. Defaults to /tmp.

## File Descriptor Limit

#### `--fd-limit` (int)

Attempts to raise the process file descriptor limit to at least this value. Defaults to `32768`

## Logging

#### `--log-level` (string, `{Off, Fatal, Error, Warn, Info, Debug, Verbo}`):

The log level determines which events to log. There are 7 different levels, in order from highest priority to lowest.

- `Off`: No logs have this level of logging.
- `Fatal`: Fatal errors that are not recoverable.
- `Error`: Errors that the node encounters, these errors were able to be recovered.
- `Warn`: A Warning that might be indicative of a spurious byzantine node, or potential future error.
- `Info`: Useful descriptions of node status updates.
- `Debug`: Debug logging is useful when attempting to understand possible bugs in the code. More information that would be typically desired for normal usage will be displayed.
- `Verbo`: Tracks extensive amounts of information the node is processing. This includes message contents and binary dumps of data for extremely low level protocol analysis.

When specifying a log level note that all logs with the specified priority or higher will be tracked. Defaults to `Info`.

#### `--log-display-level` (string, `{Off, Fatal, Error, Warn, Info, Debug, Verbo}`):

The log level determines which events to display to the screen. If left blank, will default to the value provided to `--log-level`.

#### `--log-display-highlight` (string, `{auto, plain, colors}`):

Whether to color/highlight display logs. Default highlights when the output is a terminal. Otherwise, should be one of `{auto, plain, colors}`

#### `--log-dir` (string, file path):

Specifies the directory in which system logs are kept. Defaults to `"$HOME/.avalanchego/logs"`.

## Network ID

#### `--network-id` (string):

The identity of the network the node should connect to. Can be one of:

- `--network-id=mainnet` -&gt; Connect to Mainnet (default).
- `--network-id=fuji` -&gt; Connect to the Fuji test-network.
- `--network-id=testnet` -&gt; Connect to the current test-network. (Right now, this is Fuji.)
- `--network-id=local` -&gt; Connect to a local test-network.
- `--network-id=network-{id}` -&gt; Connect to the network with the given ID. `id` must be in the range `[0, 2^32)`.

## Public IP

#### `--public-ip` (string):

Validators must know their public facing IP addresses so they can let other nodes know how to connect to them. If this argument is not provided, the node will attempt to perform NAT traversal to get the node’s public IP. Should be set to `127.0.0.1` to create a local network. If not set, attempts to learn IP using NAT traversal.

#### `--dynamic-public-ip` (string):

Valid values if param is present: `opendns`, `ifconfigco` or `ifconfigme`. This overrides `--public-ip`. If set, will poll the remote service every `--dynamic-update-duration` and update the node’s public IP address.

`--dynamic-update-duration` (duration):

The time between poll events for `--dynamic-public-ip` or NAT traversal. The recommended minimum is 1 minute. Defaults to `5m`.

## Signature Verification

#### `--signature-verification-enabled` (boolean):

Enables signature verification. When set to `false`, signatures won’t be checked in VMs that allow signatures to be disabled. Defaults to `true`.

## Staking

#### `--staking-port` (int):

The port through which the staking server will connect to the Avalanche network externally. Defaults to `9651`.

#### `--staking-enabled` (boolean):

Avalanche uses Proof of Stake (PoS) as Sybil resistance to make it prohibitively expensive to attack the network. If false, sybil resistance is disabled and all peers will be sampled during consensus. Defaults to `true`. Note that this can not be specified on public networks (`Fuji` and `Mainnet`).

Setting this flag to `false` **does not** mean "this node is not a validator."
It means that this node will sample all nodes, not just validators.
**You should not set this flag to false unless you understand what you are doing.**

#### `--staking-tls-cert-file` (string, file path):

Avalanche uses two-way authenticated TLS connections to securely connect nodes. This argument specifies the location of the TLS certificate used by the node. By default, the node expects the TLS certificate to be at `$HOME/.avalanchego/staking/staker.crt`. This flag is ignored if `--staking-tls-cert-file-content` is specified.

#### `--staking-tls-cert-file-content` (string):

As an alternative to `--staking-tls-cert-file`, it allows specifying base64 encoded content of the TLS certificate used by the node. Note that full certificate content, with the leading and trailing header, must be base64 encoded.

#### `--staking-tls-key-file` (string, file path):

Avalanche uses two-way authenticated TLS connections to securely connect nodes. This argument specifies the location of the TLS private key used by the node. By default, the node expects the TLS private key to be at `$HOME/.avalanchego/staking/staker.key`. This flag is ignored if `--staking-tls-key-file-content` is specified.

#### `--staking-tls-key-file-content` (string):

As an alternative to `--staking-tls-key-file`, it allows specifying base64 encoded content of the TLS private key used by the node. Note that full private key content, with the leading and trailing header, must be base64 encoded.

#### `--staking-disabled-weight` (int):

Weight to provide to each peer when staking is disabled. Defaults to `1`.

## Version

#### `--version` (boolean)

If this is `true`, print the version and quit. Defaults to `false`.

## Advanced Options

The following options may affect the correctness of a node. Only power users should change these.

### App Gossiping

#### `--consensus-app-gossip-non-validator-size` (uint):

Number of peers (which may or may not be validators) to gossip an AppGossip message to. Defaults to `0`.

#### `--consensus-app-gossip-validator-size` (uint):

Number of validators to gossip an AppGossip message to. Defaults to `10`.

### Benchlist

#### `--benchlist-duration` (duration):

Maximum amount of time a peer is benchlisted after surpassing `--benchlist-fail-threshold`. Defaults to `15m`.

#### `--benchlist-fail-threshold` (int):

Number of consecutive failed queries to a node before benching it (assuming all queries to it will fail). Defaults to `10`.

#### `--benchlist-min-failing-duration` (duration):

Minimum amount of time queries to a peer must be failing before the peer is benched. Defaults to `150s`.

### Build Directory

#### `--build-dir` (string):

Specifies where to find AvalancheGo & plugin binaries. Defaults to the path of executed AvalancheGo binary. The structure of this directory must be as follows:

```text
build-dir
|_avalanchego
    |_plugins
      |_evm
```

### Consensus Parameters

#### `--consensus-gossip-frequency` (duration):

Time between gossiping accepted frontiers. Defaults to `10s`.

#### `--consensus-shutdown-timeout` (duration):

Timeout before killing an unresponsive chain. Defaults to `5s`.

#### `--creation-tx-fee` (int):

Transaction fee, in nAVAX, for transactions that create new state. Defaults to `1000000` nAVAX (.001 AVAX) per transaction.

#### `--min-delegator-stake` (int):

The minimum stake, in nAVAX, that can be delegated to a validator of the Primary Network.

Defaults to `25000000000` (25 AVAX) on Mainnet. Defaults to `5000000` (.005 AVAX) on Test Net.

#### `--min-delegation-fee` (int):

The minimum delegation fee that can be charged for delegation on the Primary Network, multiplied by `10,000` . Must be in the range `[0, 1000000]`. Defaults to `20000` (2%) on Mainnet.

#### `--min-stake-duration` (duration):

Minimum staking duration. The Default on Mainnet is `336h` (two weeks.)

#### `--min-validator-stake` (int):

The minimum stake, in nAVAX, required to validate the Primary Network.

Defaults to `2000000000000` (2,000 AVAX) on Mainnet. Defaults to `5000000` (.005 AVAX) on Test Net.

#### `--max-stake-duration` (duration):

The maximum staking duration, in hours. Defaults to `8760h` (365 days) on Mainnet.

#### `--max-validator-stake` (int):

The maximum stake, in nAVAX, that can be placed on a validator on the primary network. Defaults to `3000000000000000` (3,000,000 AVAX) on Mainnet. This includes stake provided by both the validator and by delegators to the validator.

#### `--stake-minting-period` (duration):

Consumption period of the staking function, in hours. The Default on Mainnet is `8760h` (365 days).

#### `--stake-max-consumption-rate` (uint):

The maximum percentage of the consumption rate for the remaining token supply in the minting period, which is 1 year on Mainnet. Defaults to `120,000` which is 12% per years.

#### `--stake-min-consumption-rate` (uint):

The minimum percentage of the consumption rate for the remaining token supply in the minting period, which is 1 year on Mainnet. Defaults to `100,000` which is 10% per years.

#### `--stake-supply-cap` (uint):

The maximum stake supply, in nAVAX, that can be placed on a validator. Defaults to `720,000,000,000,000,000` nAVAX.

#### `--tx-fee` (int):

The required amount of nAVAX to be burned for a transaction to be valid on the X-Chain, and for import/export transactions on the P-Chain. This parameter requires network agreement in its current form. Changing this value from the default should only be done on private networks. Defaults to `1,000,000` nAVAX per transaction.

#### `--uptime-requirement` (float):

Fraction of time a validator must be online to receive rewards. Defaults to `0.8`.

### Snow Parameters

#### `--snow-avalanche-batch-size` (int):

DAG implementations of Snow consensus define `b` as the number of transactions a vertex should include. Increasing `b` will, theoretically, increase throughput while increasing latency. The node will wait for at most 1 second to collect a batch, and will then issue the entire batch at once. The value must be at least `1`. Defaults to `30`.

#### `--snow-avalanche-num-parents` (int):

DAG implementations of Snow consensus define `p` as the number of parents a vertex should include. Increasing `p` will improve the amortization of network queries. However, by increasing the connectivity of the graph, the complexity of the graph traversals is increased. The value must be at least `2`. Defaults to `5`.

#### `--snow-concurrent-repolls` (int):

Snow consensus requires repolling transactions that are issued during low time of network usage. This parameter lets one define how aggressive the client will be in finalizing these pending transactions. This should only be changed after careful consideration of the tradeoffs of Snow consensus. The value must be at least `1` and at most `--snow-rogue-commit-threshold`. Defaults to `4`.

#### `--snow-sample-size` (int):

Snow consensus defines `k` as the number of validators that are sampled during each network poll. This parameter lets one define the `k` value used for consensus. This should only be changed after careful consideration of the tradeoffs of Snow consensus. The value must be at least `1`. Defaults to `20`.

#### `--snow-quorum-size` (int):

Snow consensus defines `alpha` as the number of validators that must prefer a transaction during each network poll to increase the confidence in the transaction. This parameter lets us define the `alpha` value used for consensus. This should only be changed after careful consideration of the tradeoffs of Snow consensus. The value must be at greater than `k/2`. Defaults to `14`.

#### `--snow-virtuous-commit-threshold` (int):

Snow consensus defines `beta1` as the number of consecutive polls that a virtuous transaction must increase its confidence for it to be accepted. This parameter lets us define the `beta1` value used for consensus. This should only be changed after careful consideration of the tradeoffs of Snow consensus. The value must be at least `1`. Defaults to `15`.

#### `--snow-rogue-commit-threshold` (int):

Snow consensus defines `beta2` as the number of consecutive polls that a rogue transaction must increase its confidence for it to be accepted. This parameter lets us define the `beta2` value used for consensus. This should only be changed after careful consideration of the tradeoffs of Snow consensus. The value must be at least `beta1`. Defaults to `30`.

### Continuous Profiling

You can configure your node to continuously run memory/CPU profiles and save the most recent ones. Continuous memory/CPU profiling is enabled if `--profile-continuous-enabled` is set.

#### `--profile-continuous-enabled` (boolean):

Whether the app should continuously produce performance profiles. Defaults to the false (not enabled).

#### `--profile-dir` (string):

If profiling enabled, node continuously runs memory/CPU profiles and puts them at this directory. Defaults to the `$HOME/.avalanchego/profiles/`.

#### `--profile-continuous-freq` (duration):

How often a new CPU/memory profile is created. Defaults to `15m`.

#### `--profile-continuous-max-files` (int):

Maximum number of CPU/memory profiles files to keep. Defaults to 5.

### Health

#### `--health-check-frequency` (duration):

Health check runs with this freqency. Defaults to `30s`.

#### `--health-check-averager-halflife` (duration):

Halflife of averagers used in health checks (to measure the rate of message failures, for example.) Larger value --&gt; less volatile calculation of averages. Defaults to `10s`.

### Network

#### `--network-allow-private-ips` (bool):

Allows the node to connect peers with private IPs. Defaults to `true`.

#### `--network-compression-enabled` (bool):

If true, compress certain messages sent to peers to reduce bandwidth usage.

#### `--network-initial-timeout` (duration):

Initial timeout value of the adaptive timeout manager, in nanoseconds. Defaults to `5s`.

#### `--network-initial-reconnect-delay` (duration):

Initial delay duration must be waited before attempting to reconnect a peer. Defaults to `1s`.

#### `--network-max-reconnect-delay` (duration):

Maximum delay duration must be waited before attempting to reconnect a peer. Defaults to `1h`.

#### `--network-minimum-timeout` (duration):

Minimum timeout value of the adaptive timeout manager, in nanoseconds. Defaults to `2s`.

#### `--network-maximum-timeout` (duration):

Maximum timeout value of the adaptive timeout manager, in nanoseconds. Defaults to `10s`.

#### `--network-maximum-inbound-timeout` (duration):

Maximum timeout value of an inbound message. Defines duration within which an incoming message must be fulfilled. Incoming messages containing deadline higher than this value will be overridden with this value. Defaults to `10s`.

#### `--network-timeout-halflife` (duration):

Halflife used when calculating average network latency. Larger value --&gt; less volatile network latency calculation. Defaults to `5m`.

#### `--network-timeout-coefficient` (duration):

Requests to peers will time out after \[`network-timeout-coefficient`\] \* \[average request latency\]. Defaults to `2`.

#### `--network-read-handshake-timeout` (duration):

Timeout value for reading handshake messages. Defaults to `15s`.

#### `--network-ping-timeout` (duration):

Timeout value for Ping-Pong with a peer. Defaults to `30s`.

#### `--network-ping-frequency` (duration):

Frequency of pinging other peers. Defaults to `22.5s`.

#### `--network-health-min-conn-peers` (uint):

Node will report unhealthy if connected to less than this many peers. Defaults to `1`.

#### `--network-health-max-time-since-msg-received` (duration):

Node will report unhealthy if it hasn't received a message for this amount of time. Defaults to `1m`.

#### `--network-health-max-time-since-no-requests` (duration):

Node will report unhealthy if it hasn't received a message for this amount of time. Defaults to `1m`.

#### `--network-health-max-portion-send-queue-full` (float):

Node will report unhealthy if its send queue is more than this portion full. Must be in \[0,1\]. Defaults to `0.9`.

#### `--network-health-max-send-fail-rate` (float):

Node will report unhealthy if more than this portion of message sends fail. Must be in \[0,1\]. Defaults to `0.25`.

#### `--network-max-clock-difference` (duration):

Max allowed clock difference value between this node and peers. Defaults to `1m`.

#### `--network-require-validator-to-connect` (bool):

If true, this node will only maintain a connection with another node if this node is a validator, the other node is a validator, or the other node is a beacon.

#### `--outbound-connection-timeout` (duration):

Timeout while dialing a peer.

### Message Rate-Limiting

These flags govern rate-limiting of inbound and outbound messages. For more information on rate-limiting and the flags below, see package `throttling` in AvalancheGo.

#### `--throttler-inbound-bandwidth-refill-rate` (uint):

Max average inbound bandwidth usage of a peer, in bytes per second. See interface `throttling.BandwidthThrottler`. Defaults to `512`.

#### `--throttler-inbound-bandwidth-max-burst-size` (uint):

Max inbound bandwidth a node can use at once. See interface `throttling.BandwidthThrottler`. Defaults to `2 MiB`.

#### `--throttler-inbound-at-large-alloc-size` (uint):

Size, in bytes, of at-large allocation in the inbound message throttler. Defaults to `6291456` (6 MiB).

#### `--throttler-inbound-validator-alloc-size` (uint):

Size, in bytes, of validator allocation in the inbound message throttler. Defaults to `33554432` (32 MiB).

#### `--throttler-inbound-node-max-at-large-bytes` (uint):

Maximum number of bytes a node can take from the at-large allocation of the inbound message throttler. Defaults to `2097152` (2 MiB).

#### `--throttler-inbound-node-max-processing-msgs` (uint):

Node will stop reading messages from a peer when it is processing this many messages from the peer.
Will resume reading messages from the peer when it is processing less than this many messages.
Defaults to `1024`.

#### `--throttler-outbound-at-large-alloc-size` (uint):

Size, in bytes, of at-large allocation in the outbound message throttler. Defaults to `6291456` (6 MiB).

#### `--throttler-outbound-validator-alloc-size` (uint):

Size, in bytes, of validator allocation in the outbound message throttler. Defaults to `33554432` (32 MiB).

#### `--throttler-outbound-node-max-at-large-bytes` (uint):

Maximum number of bytes a node can take from the at-large allocation of the outbound message throttler. Defaults to `2097152` (2 MiB).

### Connection Rate-Limiting

#### `--inbound-connection-throttling-cooldown` (duration):

Node will upgrade an inbound connection from a given IP at most once within this duration. Defaults to `10s`. If 0 or negative, will not consider recency of last upgrade when deciding whether to upgrade.

#### `--inbound-connection-throttling-max-conns-per-sec` (uint):

Node will accept at most this many inbound connections per second. Defaults to `512`.

#### `--outbound-connection-throttling-rps` (uint):

Node makes at most this many outgoing peer connection attempts per second. Defaults to `50`.

### Peer List Gossiping

Nodes gossip peers to each other so that each node can have an up-to-date peer list. A node gossips `--network-peer-list-num-validator-ips` peers to `--network-peer-list-validator-gossip-size` validators and `--network-peer-list-non-validator-gossip-size` non-validators every `--network-peer-list-gossip-frequency`.

#### `--network-peer-list-gossip-frequency` (duration):

Defaults to `1m`.

#### `--network-peer-list-num-validator-ips` (int):

Defaults to `20`.

#### `--network-peer-list-validator-gossip-size` (int):

Defaults to `25`.

#### `--network-peer-list-non-validator-gossip-size` (int):

Defaults to `25`.

### Plugin Mode

#### `--plugin-mode-enabled` (bool):

If true, runs the node as a [plugin.](https://github.com/hashicorp/go-plugin) Defaults to `false`.

### Subnets

### Whitelist

#### `--whitelisted-subnets` (string):

Comma separated list of subnets that this node would validate if added to. Defaults to empty (will only validate the Primary Network).

### Subnet Configs

It is possible to provide parameters for subnets. Parameters here apply to all chains in the specified subnets. Parameters must be specified with a `{subnetID}.json` config file under `--subnet-config-dir`. AvalancheGo loads configs for subnets specified in `--whitelisted-subnet` parameter.

#### `--subnet-config-dir` (string):

Specifies the directory that contains subnet configs, as described above. Defaults to `$HOME/.avalanchego/configs/subnets`. If the flag is set explicitly, the specified folder must exist, or AvalancheGo will exit with an error. This flag is ignored if `--subnet-config-content` is specified.

Example: Let's say we have a subnet with ID `p4jUwqZsA2LuSftroCd3zb4ytH8W99oXKuKVZdsty7eQ3rXD6`. We can create a config file under the default `subnet-config-dir` at `$HOME/.avalanchego/configs/subnets/p4jUwqZsA2LuSftroCd3zb4ytH8W99oXKuKVZdsty7eQ3rXD6.json`. An example config file is:

```json
{
  "validatorOnly": false,
  "consensusParameters": {
    "k": 25,
    "alpha": 18
  }
}
```

#### `--subnet-config-content` (string):

As an alternative to `--subnet-config-dir`, it allows specifying base64 encoded parameters for subnets.

**Validator Only**

#### `validatorOnly` (bool):

If `true` this node does not expose subnet blockchain contents to non-validators via P2P messages. Defaults to `false`. For more information see [here.](../tutorials/platform/subnets/create-a-subnet.md#private-subnets)

**Consensus Parameters**

Subnet configs supports loading new consensus parameters. JSON keys are different than their matching `CLI` keys.

| CLI Key                          | JSON Key              |
| :------------------------------- | :-------------------- |
| --snow-sample-size               | k                     |
| --snow-quorum-size               | alpha                 |
| --snow-virtuous-commit-threshold | betaVirtuous          |
| --snow-rogue-commit-threshold    | betaRogue             |
| --snow-concurrent-repolls        | concurrentRepolls     |
| --snow-optimal-processing        | optimalProcessing     |
| --snow-max-processing            | maxOutstandingItems   |
| --snow-max-time-processing       | maxItemProcessingTime |
| --snow-avalanche-batch-size      | batchSize             |
| --snow-avalanche-num-parents     | parentSize            |

The consensus parameters of a subnet default to the same values used for the Primary Network, which are given [here](avalanchego-config-flags.md#snow-parameters).

### Virtual Machine (VM) Configs {#vm-configs}

#### `--vm-aliases-file` (string):

Path to JSON file that defines aliases for Virtual Machine IDs. Defaults to `~/.avalanchego/configs/vms/aliases.json`. This flag is ignored if `--vm-aliases-file-content` is specified. Example content:

```json
{
  "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH": [
    "timestampvm",
    "timerpc"
  ]
}
```

The above example aliases the VM whose ID is `"tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH"` to `"timestampvm"` and `"timerpc"`.

`--vm-aliases-file-content` (string):

As an alternative to `--vm-aliases-file`, it allows specifying base64 encoded aliases for Virtual Machine IDs.
