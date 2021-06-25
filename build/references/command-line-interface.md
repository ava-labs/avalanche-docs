# Command Line Interface

You can specify the configuration of a node with the arguments below.

## Arguments

### Config File

`--config-file` \(string\):

Path to a JSON file that specifies this node's configuration. Command line arguments will override arguments set in the config file.

Example JSON config file:

```javascript
{
    "log-level": "debug"
}
```

### APIs

`--api-admin-enabled` \(boolean\):

If set to `false`, this node will not expose the Admin API. Defaults to `false`. See [here](../avalanchego-apis/admin-api.md) for more information.

`--api-auth-required` \(boolean\):

If set to `true`, API calls require an authorization token. Defaults to `false`. See [here](../avalanchego-apis/auth-api.md) for more information.

`--api-auth-password` \(string\):

The password needed to create/revoke authorization tokens. If `--api-auth-required=true`, must be specified; otherwise ignored. See [here](../avalanchego-apis/auth-api.md) for more information.

`--api-health-enabled` \(boolean\):

If set to `true`, this node will expose the Health API. Defaults to `true`. See [here](../avalanchego-apis/health-api.md) for more information.

`--api-info-enabled` \(boolean\):

If set to `true`, this node will expose the Info API. Defaults to `true`. See [here](../avalanchego-apis/info-api.md) for more information.

`--api-ipcs-enabled` \(boolean\):

If set to `true`, this node will expose the IPCs API. Defaults to `false`. See [here](../avalanchego-apis/ipc-api.md) for more information.

`--api-keystore-enabled` \(boolean\):

If set to `false`, this node will not expose the Keystore API. Defaults to `true`. See [here](../avalanchego-apis/keystore-api.md) for more information.

`--api-metrics-enabled` \(boolean\):

If set to `false`, this node will not expose the Metrics API. Defaults to `true`. See [here](../avalanchego-apis/metrics-api.md) for more information.

### Assertions

`--assertions-enabled` \(boolean\):

When set to `true`, assertions will execute at runtime throughout the codebase. This is intended for use in debugging, as we may get a more specific error message. Defaults to `true`.

### Bootstrapping

`--bootstrap-beacon-connection-timeout` \(duration\):

Timeout when attempting to connect to bootstrapping beacons. Defaults to `1m`.

`--bootstrap-ids` \(string\):

Bootstrap IDs is an array of validator IDs. These IDs will be used to authenticate bootstrapping peers. An example setting of this field would be `--bootstrap-ids="NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg,NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ"`. The default value depends on the network ID.

`--bootstrap-ips` \(string\):

Bootstrap IPs is an array of IPv4:port pairs. These IP Addresses will be used to bootstrap the current Avalanche state. An example setting of this field would be `--bootstrap-ips="127.0.0.1:12345,1.2.3.4:5678"`. The default value depends on the network ID.

`--bootstrap-retry-enabled` \(boolean\):

If true, will retry bootstrapping if it fails.

`--bootstrap-retry-max-attempts` \(uint\):

Max number of times to retry bootstrapping after a failure.

### Connection Metering

`--conn-meter-max-conns` \(int\):

Upgrade at most `conn-meter-max-conns` connections from a given IP per `conn-meter-reset-duration`. If `conn-meter-reset-duration` is 0, incoming connections are not rate-limited.

`--conn-meter-reset-duration` \(duration\):

Upgrade at most `conn-meter-max-conns` connections from a given IP per `conn-meter-reset-duration`. If `conn-meter-reset-duration` is 0, incoming connections are not rate-limited.

### Database

`--db-dir` \(string, file path\):

Specifies the directory to which the database is persisted. Defaults to `"$HOME/.avalanchego/db"`.

`--db-enabled` \(boolean\):

If set to `false`, state updates are performed solely to an in-memory database, without making any changes on permanent storage. When set to `true`, state updates are written to a local persistent database. Defaults to `true`.

### Genesis

`--genesis` \(string\):

Path to a JSON file containing the genesis data to use. Ignored when running standard networks \(Mainnet, Testnet.\) If not given, uses default genesis data. For an example of a JSON representation of genesis data, see [here](https://github.com/ava-labs/avalanchego/blob/master/genesis/genesis_local.go#L16).

### HTTP Server

`--http-host` \(string\):

The address that HTTP APIs listen on. Defaults to `127.0.0.1`. This means that by default, your node can only handle API calls made from the same machine. To allow API calls from other machines, use `--http-host=`.

`--http-port` \(int\):

Each node runs an HTTP server that provides the APIs for interacting with the node and the Avalanche network. This argument specifies the port that the HTTP server will listen on. The default value is `9650`.

`--http-tls-cert-file` \(string, file path\):

This argument specifies the location of the TLS certificate used by the node for the HTTPS server. This must be specified when `--http-tls-enabled=true`. There is no default value.

`--http-tls-enabled` \(boolean\):

If set to `true`, this flag will attempt to upgrade the server to use HTTPS. Defaults to `false`.

`--http-tls-key-file` \(string, file path\):

This argument specifies the location of the TLS private key used by the node for the HTTPS server. This must be specified when `--http-tls-enabled=true`. There is no default value.

### IPCS

`--ipcs-chain-ids` \(string\)

Comma separated list of chain ids to connect to. There is no default value.

`--ipcs-path` \(string\)

The directory \(Unix\) or named pipe prefix \(Windows\) for IPC sockets. Defaults to /tmp.

### File Descriptor Limit

`--fd-limit` \(int\)

Attempts to raise the process file descriptor limit to at least this value. Defaults to `32768`

### Logging

`--log-level` \(string, `{Off, Fatal, Error, Warn, Info, Debug, Verbo}`\):

The log level determines which events to log. There are 7 different levels, in order from highest priority to lowest.

* `Off`: No logs have this level of logging.
* `Fatal`: Fatal errors that are not recoverable.
* `Error`: Errors that the node encounters, these errors were able to be recovered.
* `Warn`: A Warning that might be indicative of a spurious byzantine node, or potential future error.
* `Info`: Useful descriptions of node status updates.
* `Debug`: Debug logging is useful when attempting to understand possible bugs in the code. More information that would be typically desired for normal usage will be displayed.
* `Verbo`: Tracks extensive amounts of information the node is processing. This includes message contents and binary dumps of data for extremely low level protocol analysis.

When specifying a log level note that all logs with the specified priority or higher will be tracked. Defaults to `Info`.

`--log-display-level` \(string, `{Off, Fatal, Error, Warn, Info, Debug, Verbo}`\):

The log level determines which events to display to the screen. If left blank, will default to the value provided to `--log-level`.

`--log-display-highlight` \(string, `{auto, plain, colors}`\):

Whether to color/highlight display logs. Default highlights when the output is a terminal. Otherwise, should be one of `{auto, plain, colors}`

`--log-dir` \(string, file path\):

Specifies the directory in which system logs are kept. Defaults to `"$HOME/.avalanchego/logs"`.

### Network ID

`--network-id` \(string\):

The identity of the network the node should connect to. Can be one of:

* `--network-id=mainnet` -&gt; Connect to Main net \(default\).
* `--network-id=fuji` -&gt; Connect to the Fuji test-network.
* `--network-id=testnet` -&gt; Connect to the current test-network. \(Right now, this is Fuji.\)
* `--network-id=local` -&gt; Connect to a local test-network.
* `--network-id=network-{id}` -&gt; Connect to the network with the given ID. `id` must be in the range `[0, 2^32)`.

### Public IP

`--public-ip` \(string\):

Validators must know their public facing IP addresses so they can let other nodes know how to connect to them. If this argument is not provided, the node will attempt to perform NAT traversal to get the node’s public IP. Should be set to `127.0.0.1` to create a local network. If not set, attempts to learn IP using NAT traversal.

`--dynamic-public-ip` \(string\):

Valid values if param is present: `opendns`, `ifconfigco` or `ifconfigme`. This overrides `--public-ip`. If set, will poll the remote service every `--dynamic-update-duration` and update the node’s public IP address.

`--dynamic-update-duration` \(duration\):

The time between poll events for `--dynamic-public-ip` or NAT traversal. The recommended minimum is 1 minute. Defaults to `5m`.

### Signature Verification

`--signature-verification-enabled` \(boolean\):

Enables signature verification. When set to `false`, signatures won’t be checked in VMs that allow signatures to be disabled. Defaults to `true`.

### Staking

`--staking-port` \(string\):

The port through which the staking server will connect to the Avalanche network externally. Defaults to `9651`.

`--staking-enabled` \(boolean\):

Avalanche uses Proof of Stake \(PoS\) as Sybil resistance to make it prohibitively expensive to attack the network. If false, sybil resistance is disabled and all peers will be sampled during consensus. Defaults to `true`.

`--staking-tls-cert-file` \(string, file path\):

Avalanche uses two-way authenticated TLS connections to securely connect nodes. This argument specifies the location of the TLS certificate used by the node. By default, the node expects the TLS certificate to be at `$HOME/.avalanchego/staking/staker.crt`.

`--staking-tls-key-file` \(string, file path\):

Avalanche uses two-way authenticated TLS connections to securely connect nodes. This argument specifies the location of the TLS private key used by the node. By default, the node expects the TLS private key to be at `$HOME/.avalanchego/staking/staker.key`.

`--staking-disabled-weight` \(int\):

Weight to provide to each peer when staking is disabled. Defaults to `1`.

### Version

`--version` \(boolean\)

If this is `true`, print the version and quit. Defaults to `false`.

## Advanced Options

The following options may affect the correctness of a node. Only power users should change these.

### Benchlist

`--benchlist-duration` \(duration\):

Amount of time a peer is benchlisted after surpassing `--benchlist-fail-threshold`. Defaults to `1h`.

`--benchlist-fail-threshold` \(int\):

Number of consecutive failed queries to a node before benching it \(assuming all queries to it will fail\). Defaults to `10`.

`--benchlist-peer-summary-enabled` \(boolean\):

Enables peer specific query latency metrics. Defaults to `false`.

`--benchlist-min-failing-duration` \(duration\):

Minimum amount of time messages to a peer must be failing before the peer is benched. Defaults to `5m`.

### Chain Configs

Some chains \(right now, just the C-Chain\) allow the node operator to provide a custom configuration. AvalancheGo can read chain configurations from files and pass them to the corresponding chains on initialization.

AvalancheGo looks for these files in the directory specified by `--chain-config-dir`. This directory can have sub-directories whose names are chain IDs or chain aliases. Each sub-directory contains the configuration for the chain specified in the directory name. Each sub-directory should contain a file named `config`, whose value is passed in when the corresponding chain is initialized. For example, the config for the C-Chain should be at: `[chain-config-dir-goes-here]/C/config.json`.

The extension that these files should have, and the contents of these files, is VM-dependent. For example, some chains may expect `config.txt` while others expect `config.json`. If multiple files are provided with the same name but different extensions \(e.g. `config.json` and `config.txt`\) in the same sub-directory, AvalancheGo will exit with an error.

For a given chain, AvalancheGo will look first for a config sub-directory whose name is the chain ID. If it isn't found, it looks for a config sub-directory whose name is the chain's primary alias. If it's not found, it looks for a config sub-directory whose name is another alias for the chain. All folder and file names are case sensitive.

It is not required to provide these custom configurations. If they are not provided, a VM-specific default config will be used.

`--chain-config-dir` \(string\):

Specifies the directory that contains chain configs, as described above. Defaults to `$HOME/.avalanchego/configs/chains`. If this flag is not provided and the default directory does not exist, AvalancheGo will not exit since custom configs are optional. However, if the flag is set, the specified folder must exist, or AvalancheGo will exit with an error.

#### C-Chain Configs

Currently, the C-Chain is the only chain that supports custom configurations. In order to specify a config for the C-Chain, a JSON config file should be placed at `{chain-config-dir}/C/config.json` \(or another valid location, as specified above.\)

For example if `chain-config-dir` has the default value, then `config.json` can be placed at `$HOME/.avalanchego/configs/chains/C/config.json`, with these contents:

```javascript
{
  "rpc-tx-fee-cap": 90,
  "eth-api-enabled": true,
  "tx-pool-api-enabled": true,
  "debug-api-enabled": true,
  "web3-api-enabled": true
}
```

For more information about C-Chain configs, see [here](command-line-interface.md#config-file).

### C-Chain / Coreth <a id="config-file"></a>

`--config-file` \(json\):

\(This argument is deprecated in favor of using [Chain Configs](command-line-interface.md#chain-configs).\)

This allows you to specify a config to be passed into the C-Chain. The default values for this config are:

```javascript
{
  "snowman-api-enabled": false,
  "coreth-admin-api-enabled": false,
  "net-api-enabled": true,
  "rpc-gas-cap": 2500000000,
  "rpc-tx-fee-cap": 100,
  "eth-api-enabled": true,
  "personal-api-enabled": false,
  "tx-pool-api-enabled": false,
  "debug-api-enabled": false,
  "web3-api-enabled": true,
  "local-txs-enabled": false,
  "api-max-duration": 0, // Default to no maximum
  "api-max-blocks-per-request": 0, // Default to no maximum
  "allow-unfinalized-queries": false
}
```

Default values are overridden only if explicitly specified in the config.

The parameters are as follows:

#### Coreth APIs

`snowman-api-enabled` \(boolean\):

Enables the Snowman API. Defaults to false.

`coreth-admin-api-enabled` \(boolean\):

Enables the Admin API. Defaults to false.

`net-api-enabled` \(boolean\):

Enables the `net_*` API. Defaults to true.

#### Coreth API Gas/Price Caps

`rpc-gas-cap` \(int\):

The maximum gas to be consumed by an RPC Call \(used in `eth_estimateGas`\), measured in nAVAX \(GWei\). Defaults to 2,500,000,000.

`rpc-tx-fee-cap` \(int\):

Global transaction fee \(price \* gaslimit\) cap \(measured in AVAX\) for send-transction variants. Defaults to 100.

#### Eth APIs

`eth-api-enabled` \(boolean\):

Enables the `eth_*` API. Defaults to true.

`personal-api-enabled` \(boolean\):

Enables the `personal_*` API. Defaults to false.

`tx-pool-api-enabled` \(boolean\):

Enables the `txpool_*` API. Defaults to false.

`debug-api-enabled` \(boolean\):

Enables the `debug_*` API. Defaults to false.

`web3-api-enabled` \(boolean\):

Enables the `web3_*` API. Defaults to true.

#### Eth Settings

`local-txs-enabled` \(boolean\):

Enables local transaction handling. Defaults to false.

`api-max-duration` \(duration\):

Maximum API call duration. If API calls exceed this duration, they will time out. Defaults to 0 \(no maximum\).

`api-max-blocks-per-request` \(int\):

Maximum number of blocks to serve per `getLogs` request. Defaults to 0 \(no maximum\).

`allow-unfinalized-queries` \(boolean\):

Allows queries for unfinalized \(not yet accepted\) blocks/transactions. Defaults to false.

#### Continuous Profiling

You can configure your node to continuously run memory/CPU profiles and save the most recent ones. Continuous memory/CPU profiling is enabled if `continuous-profiler-dir` is set.

`continuous-profiler-dir` \(string\):

If non-empty, node continuously runs memory/CPU profiles and puts them at this directory. Defaults to the empty string \(not enabled\).

`continuous-profiler-frequency` \(duration\):

How often a new CPU/memory profile is created. Defaults to `15m`.

`continuous-profiler-max-files` \(int\):

Maximum number of CPU/memory profiles files to keep. Defaults to 5.

#### Keystore Settings

`keystore-directory` \(string\):

The directory that contains private keys. Can be given as a relative path. If empty, uses a temporary directory at `coreth-keystore`. Defaults to empty string.

`keystore-external-signer` \(string\):

Specifies an external URI for a clef-type signer. Defaults to the empty string \(not enabled\).

`keystore-insecure-unlock-allowed` \(bool\):

If true, allow users to unlock accounts in unsafe HTTP environment. Defaults to false.

### Consensus Parameters

`--consensus-gossip-frequency` \(duration\):

Time between gossiping accepted frontiers. Defaults to `10s`.

`--consensus-shutdown-timeout` \(duration\):

Timeout before killing an unresponsive chain. Defaults to `5s`.

`--creation-tx-fee` \(int\):

Transaction fee, in nAVAX, for transactions that create new state. Defaults to `1000000` nAVAX \(.001 AVAX\) per transaction.

`--min-delegator-stake` \(int\):

The minimum stake, in nAVAX, that can be delegated to a validator of the Primary Network.

Defaults to `25000000000` \(25 AVAX\) on Main Net. Defaults to `5000000` \(.005 AVAX\) on Test Net.

`--min-delegation-fee` \(int\):

The minimum delegation fee that can be charged for delegation on the Primary Network, multiplied by `10,000` . Must be in the range `[0, 1000000]`. Defaults to `20000` \(2%\) on Main Net.

`--min-stake-duration` \(duration\):

Minimum staking duration. The Default on Main Net is `336h` \(two weeks.\)

`--min-validator-stake` \(int\):

The minimum stake, in nAVAX, required to validate the Primary Network.

Defaults to `2000000000000` \(2,000 AVAX\) on Main Net. Defaults to `5000000` \(.005 AVAX\) on Test Net.

`--max-stake-duration` \(duration\):

The maximum staking duration, in hours. Defaults to `8760h` \(365 days\) on Main Net.

`--max-validator-stake` \(int\):s

The maximum stake, in nAVAX, that can be placed on a validator on the primary network. Defaults to `3000000000000000` \(3,000,000 AVAX\) on Main Net. This includes stake provided by both the validator and by delegators to the validator.

`--snow-avalanche-batch-size` \(int\):

DAG implementations of Snow consensus define `b` as the number of transactions a vertex should include. Increasing `b` will, theoretically, increase throughput while increasing latency. The node will wait for at most 1 second to collect a batch, and will then issue the entire batch at once. The value must be at least `1`. Defaults to `30`.

`--snow-avalanche-num-parents` \(int\):

DAG implementations of Snow consensus define `p` as the number of parents a vertex should include. Increasing `p` will improve the amortization of network queries. However, by increasing the connectivity of the graph, the complexity of the graph traversals is increased. The value must be at least `2`. Defaults to `5`.

`--snow-concurrent-repolls` \(int\):

Snow consensus requires repolling transactions that are issued during low time of network usage. This parameter lets one define how aggressive the client will be in finalizing these pending transactions. This should only be changed after careful consideration of the tradeoffs of Snow consensus. The value must be at least `1` and at most `--snow-rogue-commit-threshold`. Defaults to `4`.

`--snow-sample-size` \(int\):

Snow consensus defines `k` as the number of validators that are sampled during each network poll. This parameter lets one define the `k` value used for consensus. This should only be changed after careful consideration of the tradeoffs of Snow consensus. The value must be at least `1`. Defaults to `20`.

`--snow-quorum-size` \(int\):

Snow consensus defines `alpha` as the number of validators that must prefer a transaction during each network poll to increase the confidence in the transaction. This parameter lets us define the `alpha` value used for consensus. This should only be changed after careful consideration of the tradeoffs of Snow consensus. The value must be at greater than `k/2`. Defaults to `14`.

`--snow-virtuous-commit-threshold` \(int\):

Snow consensus defines `beta1` as the number of consecutive polls that a virtuous transaction must increase its confidence for it to be accepted. This parameter lets us define the `beta1` value used for consensus. This should only be changed after careful consideration of the tradeoffs of Snow consensus. The value must be at least `1`. Defaults to `15`.

`--snow-rogue-commit-threshold` \(int\):

Snow consensus defines `beta2` as the number of consecutive polls that a rogue transaction must increase its confidence for it to be accepted. This parameter lets us define the `beta2` value used for consensus. This should only be changed after careful consideration of the tradeoffs of Snow consensus. The value must be at least `beta1`. Defaults to `30`.

`--stake-minting-period` \(duration\):

Consumption period of the staking function, in hours. The Default on Main Net is `8760h` \(365 days\).

`--tx-fee` \(int\):

The required amount of nAVAX to be burned for a transaction to be valid. This parameter requires network agreement in its current form. Changing this value from the default should only be done on private networks. Defaults to `1000000` nAVAX per transaction.

`--uptime-requirement` \(float\):

Fraction of time a validator must be online to receive rewards. Defaults to `0.6`.

### Message Handling

`--max-non-staker-pending-msgs` \(int\):

Maximum number of messages a non-staker is allowed to have pending. Defaults to `20`.

`--staker-msg-reserved` \(float\):

Portion of pending message buffer reserved for messages from validators. Defaults to `0.375`.

`--staker-cpu-reserved` \(float\):

Portion of chain’s CPU time reserved for messages from validators. Defaults to `0.375`.

### Network

`--network-initial-timeout` \(duration\):

Initial timeout value of the adaptive timeout manager, in nanoseconds. Defaults to `5s`.

`--network-minimum-timeout` \(duration\):

Minimum timeout value of the adaptive timeout manager, in nanoseconds. Defaults to `2s`.

`--network-maximum-timeout` \(duration\):

Maximum timeout value of the adaptive timeout manager, in nanoseconds. Defaults to `10s`.

`--network-timeout-halflife` \(duration\):

Halflife used when calculating average network latency. Larger value --&gt; less volatile network latency calculation. Defaults to `5m`.

`--network-timeout-coefficient` \(duration\):

Requests to peers will time out after \[`network-timeout-coefficient`\] \* \[average request latency\]. Defaults to `2`.

`--network-health-min-conn-peers` \(uint\):

Node will report unhealthy if connected to less than this many peers. Defaults to `1`.

`--network-health-max-time-since-msg-received` \(duration\):

Node will report unhealthy if it hasn't received a message for this amount of time. Defaults to `1m`.

`--network-health-max-time-since-no-requests` \(duration\):

Node will report unhealthy if it hasn't received a message for this amount of time. Defaults to `1m`.

`--network-health-max-portion-send-queue-full` \(float\):

Node will report unhealthy if its send queue is more than this portion full. Must be in \[0,1\]. Defaults to `0.9`.

`--network-health-max-send-fail-rate` \(float\):

Node will report unhealthy if more than this portion of message sends fail. Must be in \[0,1\]. Defaults to `0.25`.

### Health

`--health-check-frequency` \(duration\):

Health check runs with this freqency. Defaults to `30s`.

`--health-check-averager-halflife` \(duration\):

Halflife of averagers used in health checks \(to measure the rate of message failures, for example.\) Larger value --&gt; less volatile calculation of averages. Defaults to `10s`.

### Peer List Gossiping

Nodes gossip peers to each other so that each node can have an up-to-date peer list. A node gossips `--network-peer-list-size` peers to `--network-peer-list-gossip-size` of its peers every `--network-peer-list-gossip-frequency`.

`--network-peer-list-gossip-frequency` \(duration\):

Defaults to `1m`.

`--network-peer-list-gossip-size` \(int\):

Defaults to `50`.

`--network-peer-list-size` \(int\):

Defaults to `20`.

### Plugin Mode

`--plugin-mode-enabled` \(bool\):

If true, runs the node as a [plugin.](https://github.com/hashicorp/go-plugin) Defaults to `false`.

### Subnet Whitelist

`--whitelisted-subnets` \(string\):

Comma separated list of subnets that this node would validate if added to. Defaults to empty \(will only validate the Primary Network\).

