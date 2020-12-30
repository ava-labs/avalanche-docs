# Command Line Interface

When running a node, there are a variety of possible configurations that are supported.

## Arguments

### Config File

`--config-file` \(string\):

Config file specifies a JSON file to configure a node instead of specifying arguments via the command line. Command line arguments will override any options set in the config file.

```text
./build/avalanchego --config-file=config.json
```

config.json file:

```cpp
{
    "plugin-dir": "/home/ubuntu/avalanchego/plugins",
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

`--bootstrap-ids` \(string\):

Bootstrap IDs is an array of validator IDs. These IDs will be used to authenticate bootstrapping peers. This only needs to be set when `--p2p-tls-enabled=true`. An example setting of this field would be `--bootstrap-ids="NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg,NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ"`. Defaults to empty \(does not attempt to bootstrap from other nodes.\)

`--bootstrap-ips` \(string\):

Bootstrap IPs is an array of IPv4:port pairs. These IP Addresses will be used to bootstrap the current Avalanche state. An example setting of this field would be `--bootstrap-ips="127.0.0.1:12345,1.2.3.4:5678"`. Defaults to empty \(does not attempt to bootstrap from other nodes.\)

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

### HTTP Server

`--http-host` \(string\):

The address that HTTP APIs listen on. Defaults to `127.0.0.1`. This means that by default, your node can only handle API calls made from the same machine. To allow API calls from other machines, use `--http-host=`. For example if your public IP address is `1.2.3.4` and you’d like to access AvalancheGo’s RPC over that IP address then you need to pass in `--http-host=1.2.3.4`. To allow API calls from all IPs, use `http-host=`.

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

`--p2p-tls-enabled` \(boolean\):

Avalanche uses two-way authenticated TLS connections to securely identify the `stakingID` of connected peers. However, This can be disabled for testing. When TLS is disabled, the `stakingID` will be derived from the IP Address the node claims it owns. This will also disable encryption of inter-node communication. This should only be specified for testing. Defaults to `true`. This must be true when `--staking-enabled=true`.

`--staking-enabled` \(boolean\):

Avalanche uses Proof of Stake \(PoS\) as Sybil resistance to make it prohibitively expensive to attack the network. When this is `true`, `--p2p-tls-enabled` must be set to `true` in order to secure P2P communications.

`--staking-tls-cert-file` \(string, file path\):

Avalanche uses two-way authenticated TLS connections to securely identify the `stakingID` of connected peers when `--p2p-tls-enabled=true`. This argument specifies the location of the TLS certificate used by the node. This must be specified when `--p2p-tls-enabled=true`. Defaults to `""`.

`--staking-tls-key-file` \(string, file path\):

Avalanche uses two-way authenticated TLS connections to securely identify the `stakingID` of connected peers when `--p2p-tls-enabled=true`. This argument specifies the location of the TLS private key used by the node. This must be specified when `--p2p-tls-enabled=true`. Defaults to `""`.

`--staking-disabled-weight` \(int\):

Weight to provide to each peer when staking is disabled. Defaults to `1`.

### Version

`--version` \(boolean\)

If this is `true`, print the version and quit. Defaults to `false`.

## Advanced Options

The following options affect the correctness of the platform. They may need to be changed network-wide, and as a result, an ordinary user should not change from the defaults.

### Benchlist

`--benchlist-duration` \(duration\):

Amount of time a peer is benchlisted after surpassing `--benchlist-fail-threshold`. Defaults to `1h`.

`--benchlist-fail-threshold` \(int\):

Number of consecutive failed queries to a node before benching it \(assuming all queries to it will fail\). Defaults to `10`.

`--benchlist-peer-summary-enabled` \(boolean\):

Enables peer specific query latency metrics. Defaults to `false`.

`--benchlist-min-failing-duration` \(duration\):

Minimum amount of time messages to a peer must be failing before the peer is benched. Defaults to `5m`.

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

The maximum staking duration, in seconds. Defaults to `8760h` \(365 days\) on Main Net.

`--max-validator-stake` \(int\):

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

`--snow-epoch-first-transition` \(int\):

Unix timestamp of the transition from epoch 0 to epoch 1. Defaults to `1609840800`.

`--stake-minting-period` \(duration\):

Consumption period of the staking function, in seconds. The Default on Main Net is `8760h` \(365 days\).

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

### Network Timeout

`--network-initial-timeout` \(duration\):

Initial timeout value of the adaptive timeout manager, in nanoseconds. Defaults to `5s`.

`--network-minimum-timeout` \(duration\):

Minimum timeout value of the adaptive timeout manager, in nanoseconds. Defaults to `5s`.

`--network-maximum-timeout` \(duration\):

Maximum timeout value of the adaptive timeout manager, in nanoseconds. Defaults to `10s`.

`--network-timeout-multiplier` \(float\):

Multiplier of the timeout after a failed request. Defaults to `1.1`.

`--network-timeout-reduction` \(duration\):

Reduction of the timeout after a successful request, in nanoseconds. Defaults to `1`.

### Throughput Server

`--xput-server-enabled` \[Deprecated\] \(boolean\):

An optional server helps run throughput tests by injecting load into the network on command. If enabled, this server is started up and listens for commands from a test coordinator. Defaults to `false`.

`--xput-server-port` \[Deprecated\] \(string\):

This option lets one specify on which port the throughput server, if enabled, will listen. Defaults to `9652`.

### Subnet Whitelist

`--whitelisted-subnets` \(string\):

Comma separated list of subnets that this node would validate if added to. Defaults to empty \(will only validate the Primary Network\).

### Restart on Disconnect

Some users have had an issue where their AvalancheGo node gets into an unhealthy state when their node loses internet connectivity or when their IP address changes. To help deal with this, there are command line flags that cause the node to restart if it disconnected from all peers. They are:

`--restart-on-disconnected` \(boolean, defaults to `false`\)

`--disconnected-check-frequency`  \(duration, defaults to `10s`\)

`--disconnected-restart-timeout` \(duration, defaults to `1m`\)

If `restart-on-disconnected` is `true`, the node will check every `disconnected-check-frequency` to see whether it has lost connection to all peers. If the node has lost connection to all peers for `disconnected-restart-timeout`, it will restart. 

If `restart-on-disconnected` is `false` or either`disconnected-check-frequency` or`disconnected-restart-timeout` is 0, node will not restart.

### Plugins

`--plugin-dir` \(string, file path\):

Specifies the directory in which the `evm` plugin is kept. Defaults to `"$HOME/.avalanchego/build/plugins"`.

`--coreth-config` \(json\):

This allows you to specify a config to be passed into Coreth, the VM running the C Chain. The default values for this config are:

```cpp
{
    "snowman-api-enabled": false,
    "coreth-admin-api-enabled": false,
    "net-api-enabled": true,
    "rpc-gas-cap": 2500000000,
    "rpc-tx-fee-cap": 100,
    "eth-api-enabled": true,
    "personal-api-enabled": true,
    "tx-pool-api-enabled": true,
    "debug-api-enabled": false,
    "web3-api-enabled": true
}
```

Note: if a config is specified, all default options are overridden. For example:

```text
./build/avalanchego --config-file=config.json
```

config.json:

```cpp
{
    "coreth-config": {
        "snowman-api-enabled": false,
        "coreth-admin-api-enabled": false,
        "net-api-enabled": true,
        "rpc-gas-cap": 2500000000,
        "rpc-tx-fee-cap": 100,
        "eth-api-enabled": true,
        "tx-pool-api-enabled": true,
        "debug-api-enabled": true,
        "web3-api-enabled": true
    }
}
```

Since the option `personal-api-enabled` is excluded, it will be set to false and disable the `personal_*` namespace.

The options specify parameters for Coreth \(the C Chain\) as follows:

* `snowman-api-enabled` -&gt; Enables Snowman API.
* `coreth-admin-apienabled` -&gt; Enables Admin API on Coreth plugin.
* `net-api-enabled` -&gt; Enables `net_*` API.
* `rpc-gas-cap` -&gt; Sets the maximum gas to be consumed by an RPC Call \(used in `eth_estimateGas`\)
* `rpc-tx-fee-cap` -&gt; Sets the global transaction fee \(price \* gaslimit\) cap for send-transction variants. The unit is AVAX.
* `eth-api-enabled` -&gt; Enables `eth_*` API.
* `personal-api-enabled` -&gt; Enables `personal_*` API.
* `tx-pool-api-enabled` -&gt; Enables `txpool_*` API.
* `debug-api-enabled` -&gt; Enables `debug_*` API.
* `web3-api-enabled` -&gt; Enables `web3_*` API.

