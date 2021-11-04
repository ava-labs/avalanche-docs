# 命令行界面

您可以用以下参数指定节点配置。

## 配置文件

`--config-file`（字符串）：

指定此节点配置的  JSON 文件的路径。命令行参数将覆盖在配置文件中设置的参数。

JSON 配置文件示例：

```javascript
{
    "log-level": "debug"
}
```

## API

`--api-admin-enabled`（布尔值）：

如果设为 `false`， 此节点将不公开 Admin API.。默认值设为 `false`。请参阅[此处](../avalanchego-apis/admin-api.md) 了解更多信息。

`--api-auth-required`（布尔值）：

如果设置为 `true` ，则 API 调用需要授权代币。默认值设为 `false`。请参阅[此处](../avalanchego-apis/auth-api.md) 了解更多信息。

`--api-auth-password`（字符串）：

创建/撤销授权代币需要密码。如果 `--api-auth-required=true`，则必须指定；否则将被忽略。请参阅[此处](../avalanchego-apis/auth-api.md) 了解更多信息。

`--api-health-enabled`（布尔值）：

如果设为 `true`， 则此节点将公开 Health API。默认值设为 `true`。请参阅[此处](../avalanchego-apis/health-api.md) 了解更多信息。

`--index-enabled`（布尔值）：<a id="index-enabled"></a>

如果 `false`，此节点将无法启动索引程序，而 Index API 将不可用。默认值设为 `false`。请参阅[此处](../avalanchego-apis/index-api.md) 了解更多信息。

`--api-info-enabled`（布尔值）：

如果设为 `true`，则此节点将公开 Info API。. 默认值设为 `true`。请参阅[此处](../avalanchego-apis/info-api.md) 了解更多信息。

`--api-ipcs-enabled`（布尔值）：

如果设置为 `true`，则此节点将公开 IPC 的 API。 默认值设为 `false`。请参阅[此处](../avalanchego-apis/ipc-api.md) 了解更多信息。

`--api-keystore-enabled`（布尔值）：

如果设置为 `false`，则此节点将不公开 Keystore API。 默认值设为 `true`。请参阅[此处](../avalanchego-apis/keystore-api.md) 了解更多信息。

`--api-metrics-enabled`（布尔值）：

如果设置为 `false`，则此节点将不公开 Metrics API。默认值设为 `true`。请参阅[此处](../avalanchego-apis/metrics-api.md) 了解更多信息。

## 断言

`--assertions-enabled`（布尔值）：

当设置为 `true`时，断言将在整个代码库中在运行时执行。此值用于调试，因为我们可能获取更具体的错误消息。默认值设为 `true`。

## 引导

`--bootstrap-beacon-connection-timeout`（期限）：

尝试连接到引导信标时超时。默认值设为 `1m`。

`--bootstrap-ids`（字符串）：

引导 ID 是一组验证者 ID。这些 ID 将用于验证引导对等点。此字段的设置示例为  `--bootstrap-ids="NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg,NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ"`。默认值取决于网络 ID。

`--bootstrap-ips`（字符串）：

引导 IP 是一组  IPv4:port 对。这些 IP 地址将用于引导当前 Avalanche 的状态。此字段的设置示例为  `--bootstrap-ips="127.0.0.1:12345,1.2.3.4:5678"`。默认值取决于网络 ID。

`--bootstrap-retry-enabled`（布尔值）：

如果为 true，则失败后将重试引导。

`--bootstrap-retry-max-attempts`（无符号整型）：

失败后重试引导的最大次数。

## 数据库

`--db-dir`（字符串、文件路径）：

指定数据库存留的目录。默认值设为 `"$HOME/.avalanchego/db"`。

`--db-type`（字符串）：

指定要使用的数据库类型。必须是 `leveldb`、 `rocksdb`和 `memdb` 中的一个。 `memdb` 是一个内存内、非持久性数据库。

请注意，通过 `leveldb`运行时，节点无法读取通过 `rocksdb`运行的持久数据，反之亦然。

**有关 RocksDB 的两个重要注意事项**：首先， RocksDB 并不能在所有计算机上工作。其次，RocksDB 不是默认构建的，而且未包含在公开发布的二进制文件中。要通过 RocksDB 来构建 AvalancheGo ，则要在您的终端先运行 `export ROCKSDBALLOWED=1`，然后再运行 `scripts/build.sh`。 必须先执行此操作，然后才可以使用 `--db-type=rocksdb`。

## Genesis

`--genesis`（字符串）：

包含 genesis 数据的 JSON 文件的路径。运行标准网络（主网、测试网）时忽略。如果没有指定，则使用默认 genesis 数据。例如，genesis 数据的 JSON 表达式示例，请参阅[此处](https://github.com/ava-labs/avalanchego/blob/master/genesis/genesis_local.go#L16)。

## HTTP 服务器

`--http-host`（字符串）：

HTTP API 侦听的地址。默认值设为 `127.0.0.1`。这意味着默认情况下，您的节点只能处理来自相同机器的 API 调用。要允许来自其他机器的 API 调用，使用 `--http-host=`。您也可以输入域名作为参数。

`--http-port`（整数）：

每个节点运行一个 HTTP 服务器，后者提供 API 与节点及 Avalanche 网络进行交互。此参数指定 HTTP 服务器侦听的端口。默认值为 `9650`。.

`--http-tls-cert-file`（字符串、文件路径）：

此参数指定节点用于 HTTPS 服务器的 TLS 证书的位置。 `--http-tls-enabled=true`时，必须指定此参数。 没有默认值。

`--http-tls-enabled`（布尔值）：

如果设置为 `true`，此标记将尝试升级服务器以使用 HTTPS。默认值设为 `false`。

`--http-tls-key-file`（字符串、文件路径）：

此参数指定了节点用于 HTTPS 服务器的 TLS 私钥的位置。 `--http-tls-enabled=true`时，必须指定此参数。 没有默认值。

## IPCS

`--ipcs-chain-ids`（字符串）

要连接的链 ID 列表，以逗号分隔（例如 `11111111111111111111111111111111LpoYY,4R5p2RXDGLqaifZE4hHWH9owe34pfoBULn1DrQTWivjg8o4aH` ）。没有默认值。

`--ipcs-path`（字符串）

IPC 套接字的目录 \(Unix\) 或指定管道前缀 \(Windows\)。默认值为 /tmp。

## 文件描述器限制

`--fd-limit`（整数）

尝试将流程文件描述器限制提升到至少此值的次数。默认值为 `32768`。

## 日志记录

`--log-level`（字符串，`{Off, Fatal, Error, Warn, Info, Debug, Verbo}`）：

日志级别决定了要记录那些事件。有 7 个不同的级别，按从最高优先级到最低优先级排序。

* `Off`： 没有日志具有此记录级别。
* `Fatal`：无法恢复的致命错误。
* `Error`：节点遇到的错误，这些错误是无法恢复的。
* `Warn`：一种可能表示虚假拜占庭节点或潜在未来错误的警告。
* `Info`：节点状态更新的有用描述。
* `Debug`：在尝试了解代码中可能存在的错误时，调试日志记录非常有用将显示更多有关正常使用通常所需的信息。
* `Verbo`：跟踪节点正在处理的大量信息。这包括消息内容和二进制数据转储，以用于极低级协议分析。

请注意，在指定日志级别时，将跟踪所有指定优先级或更高优先级的所有日志。默认值设为 `Info`。

`--log-display-level`（字符串，`{Off, Fatal, Error, Warn, Info, Debug, Verbo}`）：

日志级别决定屏幕上显示哪些事件。如果留空，则将默认设置为提供给 `--log-level`的值。

`--log-display-highlight`（字符串，`{auto, plain, colors}`）：

是否要彩色/高亮显示日志。当输出是终端时，默认高亮显示。否则，应该为 `{auto, plain, colors}`中的一个。

`--log-dir`（字符串、文件路径）：

指定系统日志的存储目录。默认值设为 `"$HOME/.avalanchego/logs"`。

## 网络 ID

`--network-id`（字符串）：

节点要连接的网络的身份。可以是以下之一：

* `--network-id=mainnet` -> 连接到主网（默认）。
* `--network-id=fuji` -> 连接到 Fuji 测试网络。
* `--network-id=testnet` -> 连接到当前测试网络。（现在，是 Fuji 测试网络。）
* `--network-id=local` -> 连接到当地测试网络。
* `--network-id=network-{id}` -> 使用给定 ID 连网。 `id`必须在 `[0, 2^32)`范围内。

## 公共 IP

`--public-ip`（字符串）：

验证者必须知道其公共 IP 地址，这样才能让其节点知道如何连接。如果未提供此参数，节点将尝试执行 NAT 遍历来获取其节点的公共 IP。应该设置为 `127.0.0.1`，以便创建本地网络。如果没有设置，则尝试使用 NAT 遍历来获知 IP。

`--dynamic-public-ip`（字符串）：

如果存在参数，则有效值为：`opendns`、`ifconfigco` 或 `ifconfigme`。此值将覆盖 `--public-ip`。 如果设置，则每  `--dynamic-update-duration`轮询一次远程服务并更新节点的公共 IP 地址

`--dynamic-update-duration`（期限）：

 `--dynamic-public-ip` 轮询事件或 NAT 遍历之间的时间。建议最短 1 分钟。默认值设为 `5m`。

## 签名验证

`--signature-verification-enabled`（布尔值）：

启用签名验证。设置为 `false`时，在允许禁用签名的虚拟机中，不检查签名。默认值设为 `true`。

## 权益质押

`--staking-port`（字符串）：

质押服务器将从外部连接到 Avalanche 网络所使用的端口。默认值设为 `9651`。

`--staking-enabled`（布尔值）：

Avalanche 将权益证明 \(PoS\) 用作女巫攻击防御，使得攻击网络的成本高得令人望而却步。如果为 false，则女巫防御被禁用并且将在共识期间抽样所有对等点。默认值设为 `true`。

将此标志设置为 `false` **并不 ** 意味着“此节点不是验证者”。
这意味着该节点将对所有节点进行采样，而不仅仅是验证者。
**除非您了解自己在做什么，否则不应将此标志设置为 false。**

`--staking-tls-cert-file`（字符串、文件路径）：

Avalanche 采用了双向验证 TLS 连接来确保安全连接节点。此参数指定了节点所用的 TLS 证书的位置。默认情况下，节点预计 TLS 证书将在 `$HOME/.avalanchego/staking/staker.crt`。

`--staking-tls-key-file`（字符串、文件路径）：

Avalanche 采用了双向验证 TLS 连接来确保安全连接节点。此参数指定节点所用的 TLS 私钥的位置默认情况下，节点预计 TLS 私钥位于 `$HOME/.avalanchego/staking/staker.key`。

`--staking-disabled-weight`（整数）：

在质押被禁用时，提供给各个对等点的权重。默认值设为 `1`。

## 版本

`--version`（布尔值）

如果此值是 `true`，则打印该版本并退出。默认值设为 `false`。

## 高级选项

以下选项可能会影响节点的正确性。仅有权限的用户才应该更改这些选项。

### 应用 Gossip

`--consensus-app-gossip-non-validator-size`（无符号整型）：

将 AppGossip 消息 gossip 的目标对等点（可能是/不是验证者）的数量。默认值设为 `0`。

`--consensus-app-gossip-validator-size`（无符号整型）：

对 AppGossip 消息进行 gossip 的验证者数量。默认值设为 `6`。

### 基准列表

`--benchlist-duration`（期限）：

在超过 `--benchlist-fail-threshold` 时，对等点被列入闲置的最大时间量。 默认值设为 `15m`。

`--benchlist-fail-threshold`（整数）：

在对节点进行基准测试之前连续失败的查询次数（假设对的所有查询都将失败的话）。默认值设为 `10`。

`--benchlist-peer-summary-enabled`（布尔值）：

启用了对等点特定查询延迟指标。默认值设为 `false`。

`--benchlist-min-failing-duration`（期限）：

在将对等点进行闲置之前，给对等点发送的查询必定失败的最短时间。默认值设为 `150s`。

### 构建目录

`--build-dir`（字符串）：

指定在哪里查找 AvalancheGo 和插件二进制文件。默认设置为已执行的 AvalancheGo 二进制文件路径。该目录的结构必须如下：

```text
build-dir
|_avalanchego
    |_plugins
      |_evm
```

### 链配置：

一些链允许节点操作员提供自定义配置。AvalancheGo 可以从文件中读取链配置，并在初始化时将它们传递到相应的链。

AvalancheGo 在 `--chain-config-dir`指定的目录中查找这些文件。 这些目录可以有子目录，其名称是链 ID 或链的别名。每个子目录包含目录名称中指定的链的配置。每个子目录应该包含一个名为 `config`的文件，当相应的链初始化时该文件的值即被传递进来。例如，C 链的配置应该在： `[chain-config-dir-goes-here]/C/config.json`。

这些文件应有的扩展名和这些文件的内容独立于虚拟机。例如，有些链可能预计为 `config.txt`，而其他的则预计为 `config.json`。如果同一子目录中有多个名称相同但扩展名不同的文件（如 `config.json` 和 `config.txt`），则  AvalancheGo 将报错并退出。

对于指定链， AvalancheGo 首先查找名称为链 ID的配置子目录。如果没有找到，则查找名称是链的主要别名的配置子目录。如果没有找到 ，则查找名称是链的另一个别名的配置子目录。所有文件夹和文件名都区分大小写。

不要求提供这些自定义配置。如果没有提供，则将使用虚拟机特定默认配置。

`--chain-config-dir`（字符串）：

指定包含链配置的目录，如上所述。默认值设为 `$HOME/.avalanchego/configs/chains`。如果没有提供此标记且默认目录不存在，AvalancheGo 不会退出，因为自定义配置是可选项。但是，如果设置了标记，则指定文件夹必须存在，否则AvalancheGo 将报错并退出。

#### C 链配置

为了给 C 链指定配置，JSON 配置文件应该在  `{chain-config-dir}/C/config.json`（或其他指定位置，如上述规定。）

例如，如果 `chain-config-dir` 具有默认值，那么 `config.json` 可以放在 `$HOME/.avalanchego/configs/chains/C/config.json`。

下面描述了 C 链配置选项。

默认的 C 链配置是：

```json
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
  "pruning-enabled": false,
  "api-max-duration": 0, // Default to no maximum
  "api-max-blocks-per-request": 0, // Default to no maximum
  "allow-unfinalized-queries": false,
  "log-level": "info"
}
```

仅当在给定配置中指定时才会覆盖默认值。

**API**

`snowman-api-enabled`（布尔值）：

启用 Snowman API。默认值为 false。

`coreth-admin-api-enabled`（布尔值）：

启用 Admin API。默认值为 false。

`net-api-enabled`（布尔值）：

启用 `net_*`API 。默认值为 true。

`eth-api-enabled`（布尔值）：

启用 `eth_*`API 。默认值为 true。

`personal-api-enabled`（布尔值）：

启用 `personal_*`API 。默认值为 false。

`tx-pool-api-enabled`（布尔值）：

启用 `txpool_*`API 。默认值为 false。

`debug-api-enabled`（布尔值）：

启用 `debug_*`API 。默认值为 false。

`web3-api-enabled`（布尔值）：

启用 `web3_*`API 。默认值为 true。

**API Gas/价格上限**

`rpc-gas-cap`（整数）：

PRC 调用消耗的最大 Gas \(用于 `eth_estimateGas`），以 nAVAX \(GWei\) 为单位。默认值为 2,500,000,000.

`rpc-tx-fee-cap`（整数）：

全球交易费用（价格 \* gaslimit）上限（以AVAX衡量）,用于发送交易变量。默认值为 100 。

**数据库精简**

`pruning-enabled`（布尔值）：

如果为 true，则将启用对过时历史数据进行数据库精简。对于需要访问历史根基上所有数据的节点，则应该禁用数据库精简。将仅针对新的数据完成精简。在 V1.4.9  中，默认值为 `false` in v1.4.9，而在之后的版本中为 `true` 。

**日志级别**

`log-level`（字符串）：

定义日志级别。必须为 `"trace"`、`"debug"`、`"info"`、`"warn"`、`"error"`、`"crit"` 之一。默认值设为 `"debug"`。

**Keystore 设置**

`keystore-directory`（字符串）：

包含私钥的目录。可作为相对路径提供。如果为空，则使用位于 `coreth-keystore`的临时目录。默认值为空字符串。

`keystore-external-signer`（字符串）：

指定谱号类型签名者的外部 URI。默认值为空字符串（未启用）。

`keystore-insecure-unlock-allowed`（布尔型）：

如果为 true，则允许用户在不安全的 HTTP 环境中解锁账户。默认值为 false。

**其他设置**

`local-txs-enabled`（布尔值）：

启用本地交易处理。默认值为 false。

`api-max-duration`（期限）：

最大 API 调用持续时间。如果 API 调用超过此期限，则将超时。默认值为 0（ 无最大值）。

`api-max-blocks-per-request`（整数）：

每个 `getLogs` 请求服务的最大区块数量。 默认值为 0（ 无最大 值）。

`allow-unfinalized-queries`（布尔值）：

允许查询未终止（尚未接受的）区块/交易。默认值为 false。

#### X 链配置

为了指定 X 链的配置，JSON 配置文件应该放置在  `{chain-config-dir}/X/config.json`（ 或其他有效位置，如上述规定）  

例如，如果 `chain-config-dir` 具有默认值，那么 `config.json` 可以放在 `$HOME/.avalanchego/configs/chains/X/config.json`。

这样，可以指定要传递到 X 链的配置。此配置的默认值为：

```javascript
{
  "index-transactions": false,
  "index-allow-incomplete": false
}
```

仅当在配置文件中明确指定才会覆盖默认值。

参数如下：

**交易索引**

`index-transactions`（布尔值）：

如果设置为 `true`，则启用 AVM 交易索引。默认值为 `false`。  设置为 `true` 时，AVM 交易将依靠`assetID`和相关 `address`进行索引。此数据可通过 [API](https://github.com/ava-labs/avalanche-docs/tree/c747464781639d100a0a1183c037a972262fc893/build/references/exchange-chain-x-chain-api.md#avm-get-address-txs-api)`avm.getAddressTxs` 获取。

请注意，如果  `index-transactions` 设置为 true，则节点的运行寿命必须始终设为 true。如果设置为 `false`后，再设置为 `true` ，则节点将拒绝启动，除非 `index-allow-incomplete`也被设置为 `true`（见下文）。

`index-allow-incomplete`（布尔值）：

允许不完整索引。默认值为 `false`。

如果数据库中没有 X 链索引数据，而且  `index-transactions` 被设置为  `false`，则配置数据将被忽略。

### 共识参数

`--consensus-gossip-frequency`（期限）：

gossip 已接受的边界之间的时间。默认值设为 `10s`。

`--consensus-shutdown-timeout`（期限）：

终止未响应链前超时。默认值设为 `5s`。

`--creation-tx-fee`（整数）：

交易费，以 nAVAX 为单位计算，适用于创建了新状态的交易。默认值为 `1000000` nAVAX \(.001 AVAX\) /笔交易

`--min-delegator-stake`（整数）：

可委托给主要网络验证者的最小质押，以 nAVAX 为单位计算。

默认为主网上的 `25000000000` \(25 AVAX\)。在测试网络上默认值为 `5000000`（即：.005 AVAX）。

`--min-delegation-fee`（整数）：

主网可收取的最低委托费用，乘以 `10,000`。必须在 `[0, 1000000]`范围内。默认为主网上的 `20000` \(2%\)。

`--min-stake-duration`（期限）：

最短质押期限。主网上的默认值为 `336h`\(两周。\)

`--min-validator-stake`（整数）：

最小质押，以 nAVAX 为单位，需要在主网验证。

默认为主网上的 `2000000000000` \(2000 AVAX\)。在测试网络上默认值为 `5000000`（即：.005 AVAX）。

`--max-stake-duration`（期限）：

最长质押期限（以小时计）。主网上默认值设为`8760h` \(365 天\)。

`--max-validator-stake`（整数）：质押

最大质押额度，以 nAVAX 为单位，可以放在主网验证者上。主网上默认值设为`3000000000000000`（3,000,000 个 AVAX）。这包含验证者提供的质押和委托人提供给验证者的质押。

`--stake-minting-period`（期限）：

质押职能的消费期限（以小时计）。主网上默认值设为`8760h`（365 天）。

`--tx-fee`（整数）：

X-Chain 上有效的交易和 P-Chain 上的导入/导出交易所需销毁的 nAVAX  数量。此参数要求当前形式的网络协议。只有在专网上才能从默认设置更改此值。默认值为 `1,000,000`nAVAX/ 每次交易。

`--uptime-requirement`（浮标）：

验证者必须在线才能收到奖励的时间断。默认值设为 `0.8`。

#### Snow 参数

`--snow-avalanche-batch-size`（整数）：

Snow 共识的 DAG 实施将 `b` 定义为顶点应该包含的交易数量。理论上，增加 `b`会提升吞吐量，同时也会增加延迟性。节点最多等待 1 秒钟来收集一个批次，然后立即发布整个批次。该值必须至少为  `1` 。默认值设为 `30`。

`--snow-avalanche-num-parents`（整数）：

Snow 共识的 DAG 实施将 `p` 定义为顶点应该包含的父代数量。增加 `p` 将改善网络查询的摊销情况。但是，通过增加图形的连接性，图形遍历的复杂性也增加了。该值必须至少为  `2` 。默认值设为 `5`。

`--snow-concurrent-repolls`（整数）：

Snow 共识需要在网络使用率低期间发布的重复轮询交易。此参数让我们可以定义客户在最后完成这些待审交易过程中的激进程度。此参数只有在仔细考虑过 Snow 共识的取舍权衡后才能更改。此值必须至少为 `1` 而且最大为 `--snow-rogue-commit-threshold`。默认值设为 `4`。

`--snow-sample-size`（整数）：

Snow 共识将 `k` 定义为在每次网络轮询中抽样的验证者数量。此参数让我们可以定义用于共识的  `k`值。此参数只有在仔细考虑过 Snow 共识的取舍权衡后才能更改。该值必须至少为  `1` 。默认值设为 `20`。

`--snow-quorum-size`（整数）：

Snow 共识将 `alpha`定义为在每次网络轮询必须要求的交易数量，以增加交易信心。此参数让我们可以定义共识所用的 `alpha`值。此参数只有在仔细考虑过 Snow 共识的取舍权衡后才能更改。该值必须大于 `k/2` 。默认值设为 `14`。

`--snow-virtuous-commit-threshold`（整数）：

Snow 共识将 `beta1`定义为必定会提升其被接受信心的良性交易的连续轮询的数量。此参数让我们可以定义共识所用的 `beta1`值。此参数只有在仔细考虑过 Snow 共识的取舍权衡后才能更改。该值必须至少为  `1` 。默认值设为 `15`。

`--snow-rogue-commit-threshold`（整数）：

Snow 共识将 `beta2` 定义为必定会提升其被接受信心的流氓交易的连续轮询数量。此参数让我们可以定义共识所用的 `beta2`值。此参数只有在仔细考虑过 Snow 共识的取舍权衡后才能更改。该值必须至少为  `beta1` 。默认值设为 `30`。

### 持续配置

您可以配置节点为持续运行内存/CPU 配置，并保存最近的配置。 如果设置为 `--profile-continuous-enabled`，则启用持续内存/CPU 配置。

`--profile-continuous-enabled`（布尔值）：

该应用程序是否应持续生产性能配置文件。默认为 false（未启用）。

`--profile-dir`（字符串）：

如果已启用配置文件，则节点持续运行内存/CPU 配置并将它们放到此目录中。默认值设为 `$HOME/.avalanchego/profiles/` 。

`--profile-continuous-freq`（期限）：

多久创建一次新的 CPU/内存配置文件。默认值设为 `15m`。

`--profile-continuous-max-files`（整数）：

要保留的 CPU/内存配置文件的最大数量。默认值为 5。

### 数据库配置

`--db-config-file`（字符串）：

数据库配置文件的路径。

#### LevelDB 配置

LevelDB 配置文件必须是 JSON，而且可能拥有这些密钥。任何未指定的密钥都将收到默认值。

```
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

#### RocksDB 配置文件

RocksDB 还不支持自定义配置。

### 运行状况

`--health-check-frequency`（期限）：

运行状况检查以此频率运行。默认值设为 `30s`。

`--health-check-averager-halflife`（期限）：

运行状况检查所用的平均半衰期（例如，衡量消息传输失败率。）较大值 -> 平均值的波动性较小默认值设为 `10s`。

### 网络

`--network-allow-private-ips`（布尔型）：

允许节点连接具有私有 IP 的对等点。默认值设为 `true`。

`--network-compression-enabled`（布尔型）：

如果为 true，则压缩发送给对等点的某些消息以减少带宽使用。

`--network-initial-timeout`（期限）：

适配超时管理器的初始超时值（以纳秒计）。默认值设为 `5s`。

`--network-initial-reconnect-delay`（期限）：

在尝试重新连接对等点之前，必须等待初始延迟时间。默认值设为 `1s`。

`--network-max-reconnect-delay`（期限）：

在尝试重新连接对等点之前，必须等待最大延迟时间。默认值设为 `1h`。

`--network-minimum-timeout`（期限）：

适配超时管理器的的最小超时值（以纳秒计）。默认值设为 `2s`。

`--network-maximum-timeout`（期限）：

适配超时管理器的最大超时值（以纳秒计）。默认值设为 `10s`。

`--network-timeout-halflife`（期限）：

计算网络平均延迟时使用的半衰期。较大值 -> 网络延迟计算值较低的波动性。默认值设为 `5m`。

`--network-timeout-coefficient`（期限）：

对对等点的请求将在 `network-timeout-coefficient`[] \* [平均请求延迟] 后超时。默认值设为 `2`。

`--network-get-version-timeout`（期限）：

握手中等待对等点 GetVersion 响应的超时。默认值设为 `10s`。

`--network-read-handshake-timeout`（期限）：

读取握手消息的超时值。默认值设为 `15s`。

`--network-ping-timeout`（期限）：

使用对等点的 Ping-Pong 超时值。默认值设为 `30s`。

`--network-ping-frequency`（期限）：

ping 其他对等点的频率。默认值设为 `22.5s`。

`--network-health-min-conn-peers`（无符号整型）：

如果连接到少于以下数量的对等点，则节点将报告运行状况不良。默认值设为 `1`。

`--network-health-max-time-since-msg-received`（期限）：

如果在此期间里没有收到消息，则节点将报告运行状况不良。默认值设为 `1m`。

`--network-health-max-time-since-no-requests`（期限）：

如果在此期间里没有收到消息，则节点将报告运行状况不良。默认值设为 `1m`。

`--network-health-max-portion-send-queue-full`（浮标）：

如果其发送队列超过这整个部分，则节点将报告运行状况不良。必须为 [0,1]。默认值设为 `0.9`。

`--network-health-max-send-fail-rate`（浮标）：

如果消息发送失败超过这个部分，则节点将报告运行状况不良。必须为 [0,1]。默认值设为 `0.25`。

`--network-max-clock-difference`（期限）：

此节点和对等点之间的最大允许时间差别值。默认值设为 `1m`。

`--network-require-validator-to-connect`（布尔型）：

如果为 true，则此节点将仅在此节点是验证者、其他节点是验证者或其他节点是守护程序的情况下与其他节点保持连接。

`--outbound-connection-timeout`（期限）：

向对等点拨号时的超时。

#### 消息速率限制

这些标记管理着进/出站消息的传输限速。有关限速和以下标记的更多信息，请参阅 AvalancheGo 中的 `throttling` 安装包。

`--throttler-inbound-at-large-alloc-size`（无符号整型）：

进站消息节流器的大配置的大小（以字节计）。默认为 `6291456` \(6 MiB\)。

`--throttler-inbound-validator-alloc-size`（无符号整型）：

进站消息节流器的验证者配置的大小（以字节计）。默认为 `33554432` \(32 MiB\)。

`--throttler-inbound-node-max-at-large-bytes`（无符号整型）：

节点可以从进站消息节流器的大配置获取的最大字节数量。默认为 `2097152`  \(2 MiB\)。

`--throttler-inbound-node-max-processing-msgs`（无符号整型）：

节点在处理来自对等点的许多消息时将停止读取来自对等点的消息。当处理的消息少于此数目时，将继续读取来自对等点的消息。默认值设为 `1024`。

`--throttler-outbound-at-large-alloc-size`（无符号整型）：

节点可以从出站消息节流器的大配置获取的最大字节数量。默认为 `6291456` \(6 MiB\)。

`--throttler-outbound-validator-alloc-size`（无符号整型）：

节点可以从出站消息节流器的验证者配置获取的最大字节数量。默认为 `33554432` \(32 MiB\)。

`--throttler-outbound-node-max-at-large-bytes`（无符号整型）：

节点可以从出站消息节流器的大配置获取的最大字节数量。默认为 `2097152`  \(2 MiB\)。
#### 连接速率限制

`--inbound-connection-throttling-cooldown`（期限）：

节点将在此持续时间内最多从给定 IP 升级入站连接。默认值设为 `10s`。如果为 0 或负，在决定是否升级时不会考虑上次升级的新旧程度。

`--inbound-connection-throttling-max-conns-per-sec`（无符号整型）：

节点最多会接受此数目的每秒入站连接。默认值设为 `512`。

`--inbound-connection-throttling-max-recent`（无符号整型）：

已弃用。从 AvalancheGo V1.6.0 起开始忽略。

`--outbound-connection-throttling-rps`（无符号整型）：

节点最多每秒进行此数目的出站对等点连接尝试。默认值设为 `50`。

#### 对等点列表 gossip

节点将互相 gossip 对等点，这样每个节点都能有最新的对等点列表。每当`--network-peer-list-gossip-frequency`，  节点将 `--network-peer-list-size`对等点 gossip`--network-peer-list-gossip-size` 给其对等点。

`--network-peer-list-gossip-frequency`（期限）：

默认值设为 `1m`。

`--network-peer-list-gossip-size`（整数）：

默认值设为 `50`。

`--network-peer-list-size`（整数）：

默认值设为 `20`。

`--network-peer-list-staker-gossip-fraction`（无符号整型）：

每个 `network-peer-list-staker-gossip-fraction`gossip 对等点列表中的 1 条消息将被发送到验证者。

默认值设为 `2`。

### 插件模式

`--plugin-mode-enabled`（布尔型）：

如果为 true，则将此节点当中[插件](https://github.com/hashicorp/go-plugin)运行。默认值设为 `false`。

### 子网

#### 白名单

`--whitelisted-subnets`（字符串）：

如果添加，本节点将验证的子网列表（以逗号分隔）。默认值为空（将仅验证主网络）。

#### 子网配置

可以为子网提供参数。此处的参数适用于指定子网中的所有链。必须通过 `--subnet-config-dir` 下面的 `{subnetID}.json` 配置文件来指定参数。AvalancheGo 为 `--whitelisted-subnet` 参数中指定的子网加载配置。

`--subnet-config-dir`（字符串）：

指定包含子网配置的目录，如上所述。默认值设为 `$HOME/.avalanchego/configs/subnets`。如果明确设置了标志，则指定的文件夹必须存在，否则 AvalancheGo 将退出并显示错误。

示例：假设我们有一个具有 ID `p4jUwqZsA2LuSftroCd3zb4ytH8W99oXKuKVZdsty7eQ3rXD6` 的子网。 我们可以在 `$HOME/.avalanchego/configs/subnets/p4jUwqZsA2LuSftroCd3zb4ytH8W99oXKuKVZdsty7eQ3rXD6.json` 的默认 `subnet-config-dir` 下创建配置文件。示例配置文件为：

```json
{
  "validatorOnly": false,
  "consensusParameters": {
    "k": 25,
    "alpha": 18
  }
}
```

**仅验证者**

`validatorOnly`（布尔型）：

如果为 `true`，则此节点不会通过 P2P 消息向非验证者公开子网区块链内容。默认值设为 `false`。有关详情，请参阅[此处。](../platform/create-a-subnet.md#private-subnets)

**共识参数**

子网配置支持加载新的共识参数。JSON 密钥与它们匹配的 `CLI` 密钥不同。

| CLI 密钥 | JSON 密钥 |
| :--- | :--- |
| --snow-sample-size | k |
| --snow-quorum-size | alpha |
| --snow-virtuous-commit-threshold | betaVirtuous |
| --snow-rogue-commit-threshold | betaRogue |
| --snow-concurrent-repolls | concurrentRepolls |
| --snow-optimal-processing | optimalProcessing |
| --snow-max-processing | maxOutstandingItems |
| --snow-max-time-processing | maxItemProcessingTime |
| --snow-avalanche-batch-size | batchSize |
| --snow-avalanche-num-parents | parentSize |

子网的共识参数默认与用于主网的值相同，这些值在[此处](command-line-interface.md#snow-parameters)给出。

### 虚拟机（VM）配置<a id="vm-configs"></a>

`--vm-aliases-file`（字符串）：

给虚拟机 ID 定义别名的 JSON 文件的路径。默认值设为 `~/.avalanchego/configs/vms/aliases.json`。示例内容：

```javascript
{
  "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH": [
    "timestampvm",
    "timerpc"
  ]
}
```

上述示例给 ID 为从 `"tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH"`到  `"timestampvm"`和 `"timerpc"`的虚拟机指定了别名。

