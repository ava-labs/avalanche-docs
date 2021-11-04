# AvalancheGo 发布说明

{% page-ref page="../tutorials/nodes-and-staking/upgrade-your-avalanchego-node.md" %}

## v1.6.3（[在 GitHub 上查看](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.3)）

此版本向后兼容 [v1.6.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.0)。您可以选择是否更新，但我们鼓励更新。

**配置选项**

- 已将 `--inbound-connection-throttling-max-conns-per-sec` 的默认值更新为 `256`。
- 已将 `--meter-vms-enabled` 的默认值更新为 `true`。
- 已将 `--staking-disabled-weight` 的默认值更新为 `100`。

**指标**

- 将 `avalanche_network_buffer_throttler_inbound_awaiting_acquire` 的行为更改为仅在消息实际阻塞时才增加。
- 将 `avalanche_network_byte_throttler_inbound_awaiting_acquire` 的行为更改为仅在消息实际阻塞时才增加。
- 已在 `meterVM` 上增加了 `Block/Tx` 指标。
   - 已添加 `avalanche_{ChainID}_vm_metervm_build_block_err_{count,sum}`。
   - 已添加 `avalanche_{ChainID}_vm_metervm_parse_block_err_{count,sum}`。
   - 已添加 `avalanche_{ChainID}_vm_metervm_get_block_err_{count,sum}`。
   - 已添加 `avalanche_{ChainID}_vm_metervm_verify_{count,sum}`。
   - 已添加 `avalanche_{ChainID}_vm_metervm_verify_err_{count,sum}`。
   - 已添加 `avalanche_{ChainID}_vm_metervm_accept_{count,sum}`。
   - 已添加 `avalanche_{ChainID}_vm_metervm_reject_{count,sum}`。
   - 已添加 `avalanche_{DAGID}_vm_metervm_parse_tx_err_{count,sum}`。
   - 已添加 `avalanche_{DAGID}_vm_metervm_get_tx_err_{count,sum}`。
   - 已添加 `avalanche_{DAGID}_vm_metervm_verify_tx_{count,sum}`。
   - 已添加 `avalanche_{DAGID}_vm_metervm_verify_tx_err_{count,sum}`。
   - 已添加 `avalanche_{DAGID}_vm_metervm_accept_{count,sum}`。
   - 已添加 `avalanche_{DAGID}_vm_metervm_reject_{count,sum}`。

**Coreth**

- 已应用 callTracer 故障处理修复。
- 已在运行时环境中初始化多币函数。

**ProposerVM**

- 已将 `--staking-enabled=false` 网络中的区块 `Delay` 更新为 `0`。


## v1.6.2（[在 GitHub 上查看](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.2)）

此版本向后兼容 [v1.6.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.0)。您可以选择是否更新，但我们鼓励更新。

**配置选项**
* 已删除 `--coreth-config`。请参阅[此处。](../references/command-line-interface.md#c-chain-config)
* 已添加 `--throttler-inbound-node-max-processing-msgs`。请参阅[此处。](../references/command-line-interface.md#message-rate-limiting-throttling)
* 已添加 `--db-config-file`。请参阅[此处。](../references/command-line-interface.md#database-config)

**API**
* 已移除 API 方法 `avm.exportAVAX`。转为使用 `avm.export`。
* 已移除 API 方法 `avm.importAVAX`。转为使用 `avm.import`。
* API 方法 `info.peers`现在将 `PublicIP`字段视为选项，并且仅在提供有效 IP 时才填充。
* 已添加 API 客户端 `platform.getValidatorsAt`。
* API 客户端 `admin.lockProfile` 已修复，可以正确调用 `lockProfile`。
* API 客户端 `health.health` 已修复，可以正确处理来自不健康服务器的响应。
* 改进了 Health  Check API 的响应，使其更具描述性。

**闲置列表**
* 更改了验证者必须无响应的最短时间和验证者将被闲置的最长时间。以前分别是 5 分钟和 30 分钟，现在分别是 2.5 分钟和 15 分钟。

**数据库**
* 已允许用户使用标志 `--db-config-file` 指定数据库配置 。

**子网**
* 添加了客户端将子网配置为私有的功能，以将成员限制为仅经过批准的验证者。

**网络**
* 已将入站一般消息分配的默认大小从 32 MiB 更改为 6 MiB。
* 已将出站一般消息分配的默认大小从 32 MiB 更改为 6 MiB。
* 已将节点可以从入站一般消息分配中获取的默认最大字节数从 4 MiB 更改为 2 MiB。
* 将节点可以从出站一般消息分配中获取的默认最大字节数从 4 MiB 更改为 2 MiB。
* 添加了额外的入站消息速率限制。一个节点不会从一个对等点读取更多的消息，直到它处理的消息数少于来自那个对等点的 `--throttler-inbound-node-max-processing-msgs`。
* 已将 AppGossip 消息被 gossip 的默认非验证者数量从 2 更改为 0。
* 已将 AppGossip 消息被 gossip 的默认验证者数量从 4 更改为 6。
* 引入了让虚拟机向特定验证者进行 gossip 的能力，而不仅仅是随机统一地 gossip。
* 修复了导致某些节点永远不会尝试重新连接到先前断开连接的节点的问题。

**ProposerVM**
* 引入了封锁式 P 链高度滞后，以改善高 P 链区块发行期间的稳定性。
* 正确应用了请求的区块延迟。

**指标**
* 从 X 链和 P 链中删除了 API 请求直方图指标。
* 添加了 P 链内存池指标。
* 向 platformvm 添加了 `validator_sets` 指标。

**其他**
* 重构节点启动和关闭，以避免在节点启动然后立即停止的情况下意外关闭。
* 修复了 P 链内存池以正确跟踪分配的字节数。
* 升级了 C 链以运行 geth 1.10.9。
* 支持了 C 链的 abigen。
* 添加了对 C 链上的前映像支持的支持。
* 添加了对 C 链上的费用历史端点的支持。
* 重构 ID 别名以更好地支持 GRPC 测试。
* 删除了端到端测试分支匹配逻辑。
* 删除了数据库迁移进程管理器已弃用的主入口点。

## v1.6.1（[在 GitHub 上查看](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.1)）

此版本向后兼容 [v1.6.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.0)。您可以选择是否更新，但我们鼓励更新。

**升级**

* 添加了指定子网配置的功能
* 添加了各种新的网络配置值
* 从网络库中删除旧消息
* 修复了影响本地网络上的 AddValidator 交易的 P 链内存池错误
* 将交易 gossip 规则更改为 gossip 到固定数量的验证者以及所有对等点
* 从 Health API 中删除了已弃用的 `getLiveness` 方法
* 添加了配置选项以禁止非验证者之间的连接

**注意**

以下内容已弃用，不应再使用。它们可能会在任何未来版本中被删除：

* 应删除 API 方法 `avm.exportAVAX` 以支持 `avm.export`
* 应删除 API 方法 `avm.importAVAX` 以支持 `avm.import`
* 应该删除配置选项 `coreth-config` 以支持 [ 链配置文件 ](../references/command-line-interface.md#c-chain-config) 。

## v1.6.0（[在 GitHub 上查看](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.0)）

**此变更并不向后兼容之前的版本。**

本次升级为 C 链和 P 链增加了竞争限制器，在 C 链上引入了基于区块的费用，并在 C 链上调整了一些动态费用参数。

升级更改将于 **2021 年 9 月 22 日北美东部夏令时下午 5 点/协调世界时晚上 9 点在主网上生效**。您应该在此变更生效之前升级节点，否则可能会让节点损失正常运行时间。

更多信息可在 [此处](https://medium.com/avalancheavax/apricot-phase-four-snowman-and-reduced-c-chain-transaction-fees-1e1f67b42ecf)查看。

**Go**

构建 AvalancheGo 所需的最低 Go 版本现在是 Go 1.16.8

**错误修复**

修复超时管理器启动期间的竞争条件。

**升级**

* 在 P 链和 C 链上引入了 [Snowman++](https://github.com/ava-labs/avalanchego/blob/v1.6.0-fuji/vms/proposervm/README.md)。
* 使用 VM<->VM 通信层将[内存池 gossip 引入 P 链](https://github.com/ava-labs/avalanchego/blob/v1.6.0-fuji/vms/platformvm/README.md)和 C 链。
* 向 C 链区块添加了基于区块的费用。
* 在 C 链动态费用机制中设置最低 gas 价格为 25 nAVAX，最高 gas 价格为 1000 nAVAX。
* 传入连接的速率限制

**新指标**

* `avalanche_C_blks_built` / `avalanche_P_blks_built`：分别在 C 链和 P 链上本地构建的区块数量。
* `avalanche_C_blks_builds_failed` / `avalanche_P_blks_builds_failed`：分别在 C 链和 P 链上调用 BuildBlock 失败的次数。

**配置选项**

* 添加了标志 `inbound-connection-throttling-max-conns-per-sec`。（请参阅 [配置文档。](../references/command-line-interface.md)）
* 已弃用的标志 `inbound-connection-throttling-max-recent`。此标志现已忽略。

## PRE_RELEASE v1.6.0-fuji（[在 GitHub 上查看](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.0-fuji)）

**请注意，此版本无法运行主网 - 如果尝试使用主网配置运行，将显示“不支持主网”。**

本次升级为 C 链和 P 链增加了竞争限制器，在 C 链上引入了基于区块的费用，并在 C 链上调整了一些动态费用参数。

本升级中的变更将于 2021 年 9 月 16 日北美东部夏令时下午 5 点在 Fuji 测试网上生效。在 Fuji 更新并验证后，将发布主网兼容版。

**所有  Fuji 节点都应在 2021 年 9 月 16 日北美东部夏令时下午 5 点之前升级。**

**升级**

* 在 P 链和 C 链上引入了 [Snowman++](https://github.com/ava-labs/avalanchego/blob/v1.6.0-fuji/vms/proposervm/README.md)。
* 使用 VM<->VM 通信层将[内存池 gossip 引入 P 链](https://github.com/ava-labs/avalanchego/blob/v1.6.0-fuji/vms/platformvm/README.md)和 C 链。
* 向 C 链区块添加了基于区块的费用。
* 在 C 链动态费用机制中设置最低 gas 价格为 25 nAVAX，最高 gas 价格为 1000 nAVAX。
* 添加了构建区块数量和构建区块尝试失败次数的指标。

## v1.5.3（[在 GitHub 上查看](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.3)）

此版本向后兼容 [v1.5.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0)。

**正常运行时间**

* 将获得质押奖励的最低正常运行时间要求从 60% 更改为 80%。

**网络**

* 添加了 3 条新的网络消息：`AppRequest`、`AppResponse` 和 `AppGossip`。这些消息允许区块链的实例向彼此发送由其 VM 定义的任意数据。以前，区块链的实例只能通过发送共识消息来相互通信（`Put`、`PushQuery` 等）。请参阅 `snow/engine/common/engine.go`。
* 收到 `Pong` 消息后，如果版本不兼容，请断开与发件人的连接。
* 为了清楚起见，使用 `Send`按 `common.Sender` 的前置方法命名（例如 `Put` --> `SendPut`）。

**P 链**

* 添加了按区块跟踪验证者权重变化的功能。
* 添加了 API 方法 `GetValidatorsAt`，可以按给定 P 链高度检索子网（或主网络）验证者集。

**C 链**

* 合并来自 Geth v1.10.8 的更改
* 删除对 Ancients 的引用

**共识**

* 将 `Timestamp()` 增添到了 `snowman.Block` 界面。

**本地网络**

* 更新了本地创世中验证者的开始时间。v1.5.3 之前版本的本地配置中指定的验证者的结束时间为协调世界时 2021 年 9 月 10 日 00:00:00。 **因此，您必须升级到 AvalancheGo v1.5.3 才能在此之后运行本地网络。**

**配置选项**

* 添加了 AvalancheGo 配置选项 `consensus-app-gossip-size` ，该选项定义了 `AppGossip` 消息  gossip 的对等点数。
* 添加了 C 链配置选项 `log-level`。选项包括：`"trace"`、`"debug"`、`"info"`、`"warn"`、`"error"`、`"crit"`。默认为 `"debug"`（和以前一样。）

## v1.5.2（([在 GitHub 上查看）](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.2))

本更新可向后兼容 [v1.5.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0).。请在 V1.5.0 版本版中查看预计更新时间。

**Coreth**

* 修补了一个 [Geth 安全性漏洞](https://twitter.com/go_ethereum/status/1430067637996990464)
* 修补了 API 后端恐慌。

**AVM**

* 引入了无状态解码器生成技术以改进工具化。

**共识**

* 添加了关于泡泡投票的额外日志记录。

## v1.5.1-eth_call （[在 GitHub 上查看](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.1-eth_call))）

本更新可向后兼容 [v1.5.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0).。请在 V1.5.0 版本中查看预计网络升级时间。

本次更新是 V1.5.1 的一个修补程序，能够在无外部账户检查的情况下使用 eth_call。

## v1.5.1（[在 GitHub 上查看](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.1)）

本更新可向后兼容 [v1.5.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0).。请在 V1.5.0 版本中查看预计网络升级时间。

**配置**

* 去除了选项 `bootstrap-retry-max-attempts`，同时增加了选项 `bootstrap-retry-warn-frequency`

**子网**

* 将 `subnetID`添加到握手消息。此操作向对等点通知一个节点有兴趣同步哪些子网。
* 优化了子网容器 gossip。

**AVM**

* 修补了 `avm.GetTx`的 JSON 端点，可适当地报告  UTXO `amount`。

**引导**

* 修复了繁忙循环，如果在引导过程中节点的网络掉线便会发生繁忙循环，从而导致节点报告致命错误。

**RPCChainVM**

* 改进了未验证区块的缓存。

**Coreth**

* 已更新到 Geth v1.10.7。

## v1.5.0（[在 GitHub 上查看](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0)）

**此变更并不向后兼容之前的版本。**

本次升级增加了针对 C 链的动态费用以及各种其他改进。

本次升级的变更将于 2021 年 8 月 24 日东部夏令时上午 10 点在主网生效。您应该在此变更生效之前升级节点，否则可能会让节点损失正常运行时间。

更多信息可在 [此处](https://medium.com/avalancheavax/apricot-phase-three-c-chain-dynamic-fees-432d32d67b60)查看。

**网络升级**

* 给 C 链增加了动态费用计算。
* 增加了 `CreateSubnetTx` 和 `CreateChainTx` 费用。
* 修复了委托人验证过程中的堆损毁错误。
* 强化了委托交易的 `MaxStakeWeight`。

**客户端升级**

*  X 链增加加了交易索引功能，支持按地址和资产查询交易历史记录。
* 增加了 `./avalanchego`作为 docker 镜像中的默认命令。
* 在 docker 镜像中使用了静态依赖版。
* 删除数据库迁移支持和守护进程运行器。
* 重构了节点配置解析过程。
* 优化了容器 gossip 采样。
* 增加了静态构建 AvalancheGo 和 EVM 二进制的能力。
* 简化了 `Block` 界面，仅显示父区块的 ID，而不是显示全部父区块。
* 增加了针对共识引擎中的待处理工作的额外指标。
* 重构 P 链状态以便处理区块链验证状态，与交易确认状态相分开。

**更新了 API**

* 已将 `GetAddressTxs`添加到 `avm` API。
* 已将 `SetLoggerLevel` 和 `GetLoggerLevel` 添加到 `Admin` API， 以允许在节点仍在运行时精细调整日志级别。
* 已将 `GetConfig` 添加到 `Admin` ，以便获取节点当前使用的节点配置。
* 更新了 `platformvm.Client`以允许指定 `nodeID`于 `GetCurrentValidators` 和 `GetPendingValidators`中并生成对 `GetStake` 的响应。

**已更新 CLI 参数**

* 已删除 `fetch-only`。
* 已将 JSON 配置解析添加到 `avm` 虚拟机。
   * 增加了 `indexTransactions`
   * 增加了 `indexAllowIncomplete`

## PRE_RELEASE v1.5.0-fuji（[在 GitHub 上查看](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0-fuji)）

**请注意，本版无法运行主网——而且，如果试图用主网配置来运行，将显示“本节点版本不支持主网”。如果您运行的是主网节点，则在下周发布正式版本之前，无需进行任何操作。**

**此变更并不向后兼容之前的版本。**

本次升级增加了针对 C 链的动态费用以及各种其他改进。

本升级中的变更将于 2021 年 8 月 16 日北美东部夏令时下午 3 点在 Fuji 测试网上生效。在 Fuji 更新并验证后，将发布主网兼容版。

**网络升级**

* 给 C 链增加了动态费用计算。
* 增加了 `CreateSubnetTx` 和 `CreateChainTx` 费用。
* 修复了委托人验证过程中的堆损毁错误。
* 强化了委托交易的 `MaxStakeWeight`。

**客户端升级**

*  X 链增加加了交易索引功能，支持按地址和资产查询交易历史记录。
* 增加了 `./avalanchego`作为 docker 镜像中的默认命令。
* 在 docker 镜像中使用了静态依赖版。
* 删除数据库迁移支持和守护进程运行器。
* 重构了节点配置解析过程。
* 优化了容器 gossip 采样。
* 增加了静态构建 AvalancheGo 和 EVM 二进制的能力。
* 简化了 `Block` 界面，仅显示父区块的 ID，而不是显示全部父区块。
* 增加了针对共识引擎中的待处理工作的额外指标。
* 重构 P 链状态以便处理区块链验证状态，与交易确认状态相分开。

**更新了 API**

* 已将 `GetAddressTxs`添加到 `avm` API。
* 已将 `SetLoggerLevel` 和 `GetLoggerLevel` 添加到 `Admin` API， 以允许在节点仍在运行时精细调整日志级别。
* 已将 `GetConfig` 添加到 `Admin` ，以便获取节点当前使用的节点配置。
* 更新了 `platformvm.Client`以允许指定 `nodeID`于 `GetCurrentValidators` 和 `GetPendingValidators`中并生成对 `GetStake` 的响应。

**已更新 CLI 参数**

* 已删除 `fetch-only`。
* 已将 JSON 配置解析添加到 `avm` 虚拟机。
   * 增加了 `indexTransactions`
   * 增加了 `indexAllowIncomplete`

## V1.4.12（[在 GitHub 上查看](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.12)）

本次更新可向后兼容。您可以选择是否更新，但我们鼓励更新。

**X 链**

* 已将 `"json"` 添加到 API 方法 `GetTx`，后者返回已查询交易的 JSON 表达式。
* 增加了界面类型断言

**Info API**

* 增加了方法 `GetNodeVersion` 到 Info API 客户端

**Prometheus 指标**

* 修复了因压缩而未被发送的字节的指标并对其重新命名
* 针对因压缩而未收到的字节，增加了指标
* 已将辅助结构 `noAverager`添加到 `metrics`安装包

**数据库**

* 更新/增加了基准

**共享内存**

* 将 `Put`和 `Remove`替代为 `Apply` 以支持未来原子式交易优化

## V1.4.11（[在 GitHub 上查看](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.11)）

**C 链**

本版本默认支持快照。

**配置标志**

_已删除_

* `conn-meter-reset-duration`
* `conn-meter-max-conns`

_已增加_

* `network-compression-enabled`

**Prometheus 指标**

许多 Prometheus 指标被重命名，许多矩形图被 2 个仪表取代。查看 [此处](https://github.com/ava-labs/avalanche-docs/tree/master/dashboards)了解更新后的 Grafana 仪表板。

本版本在 `utils/metric` 软件包中还增加了辅助方法。

**RocksDB**

RocksDB 不再是运行构建脚本时默认构建，也不再包含在公开发行的二进制文件中。要通过 RocksDB 来构建 AvalancheGo ，则要在终端先运行 `export ROCKSDBALLOWED=1`，然后再运行 `scripts/build.sh`。 必须先执行此操作，然后才可以使用 `--db-type=rocksdb`。

现在，RocksDB 数据库的文件可以在子目录 `rocksdb` 中存放/查找。 请注意，如果之前是使用 RocksDB 运行，则需要移动现有文件。

**消息压缩**

现在节点压缩一些 P2P 消息。如果对等点的版本为 V1.4.11 或更高， 则 Push Query、Peer List 以及 Multiput 消息会先被使用 Gzip 压缩，然后才通过网络发送给该对等点。 这样降低了 AvalancheGo 的带宽使用量。

**入站连接限流** 重构入站连接速率限制并默认启用。

**总体改进**

* 重构并改进了通过数据库由 gRPC 向插件进行迭代的性能。
* 在 Linux 上，如果 AvalancheGo 非正常死亡，则清理 C 链
* 重构了 P2P 消息定义并将它们从 `network` 软件包中转移。
* 给 HTTP API 服务器增添了虚拟机别名
* 将 `1024` 取代为 `units.KiB`，等等
* 通过按创建相应查询的顺序处理 chits 来提高分区容差。

**Fuji IP**

更新了 Fuji 测试网的引导 IP。

## V1.4.10 （[在 GitHub 上查看](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.10)）

**Apricot 阶段 2 - 补丁 10**

{% hint style="warning" %}‏本次更新可向后兼容。您可以选择是否更新，但我们鼓励更新。
{% endhint %}

该补丁包含性能、限流以及虚拟机改进：

* 增加了使用 `RocksDB` 的支持，而不是在受支持架构上的 `LevelDB`。
* 重组了入站网络限流使其以每个节点为基础，以限制对等节点的带宽使用量。
* 将出站网络节流重组为按权益进行权重分配的字节。
* 已将 C 链的默认值 `pruning-enabled` 标志改为 `true`。
* 启用了通过 RPC 注册自定义虚拟机。
* 更新了区块链状态以报告验证状态。
* 已将 `TimestampVM`移到其自有存储库以匹配预期虚拟机创建路径。
* 修复了 Protobuf 代码生成脚本，以将 `grpc`文件放到正确的位置。
* 通过 `rpcchainvm#Block.Verify` 传递区块字节以避免任何潜在的缓存驱逐验证故障。

## V1.4.9（[ 在 GitHub 上查看](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.9)）

**Apricot 阶段 2 - 补丁 9**

{% hint style="warning" %}‏本次更新可向后兼容。您可以选择是否更新，但我们鼓励更新。
{% endhint %}

该补丁包含性能改进和监测改进：

* 增加了启用网络精简时运行 C 链的支持。目前网络精简默认被禁用。
* 减少 C 链 Websocket 的 ping 间隔以减少落后于负载均衡器时连接断开的次数。
* 在雪人区块界面增加了时间戳。
* 修复了对于通过 websockets 进行的调用，C 链 API 最大持续时间强制执行的错误。
* 为 HTTP 端点增加了 Gzip 标头支持。
* 在 `info.getNodeVersion` 端点增加了其他版本描述。
* 已限制为仅连接 V1.4.5 及以上版本的节点。
* 已将守护进程日志移到主日志文件夹下。
* 增加了对确定式采样的支持。
* 增加了针对新标记的自动部署 GitHub 操作。
* 重构了配置管理以便更好地支持以编程方式启动节点。

## V1.4.8 （[在 GitHub 上查看](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.8)）

**Apricot 阶段 2 - 补丁 8**

{% hint style="warning" %}‏本次更新可向后兼容。您可以选择是否更新，但我们鼓励更新。
{% endhint %}

该补丁包含性能改进，监测改进以及子网修复：

* 更改了虚拟机费用定义以强制在链的原生资产中支付费用。这不会改变 X 链的行为，但是让其他 AVM 实例变得可用。
* 增加了对特定链指定配置的能力。这就弃用了 `coreth-config` CLI 参数。
* 增加了对新出站连接数量的速度限制。
* 引进了虚拟机包装程序，对链增加了透明指标。
* 增加了启用持续节点剖析的能力。
* 减少了网络层的字节分配。
* 增加了各种 CLT 参数以调整 gossip 参数。
* 启用了节点使用短暂密钥对来运行，而不是从磁盘读取的密钥。
* 去除了不正确的虚假警告。
* 将 CI 测试移到在 Github Actions 中运行，而不是在 Travis 中运行。
* 从虚拟机界面删除特殊案例。

**增加了命令行参数：**

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

## V1.4.7（[在 GitHub 上查看](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.7)）

**Apricot 阶段 3 - 补丁 7**

{% hint style="warning" %}‏本次更新可向后兼容。您可以选择是否更新，但我们鼓励更新。
该补丁包含性能改进和错误修复程序。{% endhint %}

如果之前安装的是 V1.4.4 或以下版本的节点，那么此节点可能已经阻止处理区块。本次更新将修复该节点并执行数据库迁移。有关数据库迁移的详细信息，请参阅 [V1.4.5 数据库迁移说明](avalanchego-v1.4.5-database-migration.md)。如果之前安装的是 V1.4.5 或更高版本的节点，那么本节点将使用现有数据库并且不需要执行数据库迁移。

* 修复了迁移前字节以便正确验证 P 链区块`SHraz7TtMfTQ5DX1rREhNZW1bi7PpPzAq7xoJAwrWNQrLhQcD`。
* 修补`platformvm.GetBlockchains`中的回归分析部分以便正确返回主要子网区块链。
* 已将 Grpc 版本更新为 V1.37。
* 优化了对等点列表取样。
* 增加了数据库基准。
* 减少了各种重复内存分配。

## V1.4.6（ [在 GitHub 上查看](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.6)）

**Apricot 阶段 2 - 补丁 6**

{% hint style="warning" %}‏本次更新可向后兼容。您可以选择是否更新，但我们鼓励更新。
该补丁包含性能改进和错误修复程序。{% endhint %}

**如果之前安装的是 V1.4.4 或更低版本的节点，那么本节点将支持数据库迁移。有关数据库迁移的详细信息，请参阅 V1.4.5 发布说明 **。如果之前安装的节点是 V1.4.5 版，那么此节点将使用现有数据库并且无需执行数据库迁移。

本补丁：

* 删除导致高持续型数据库写入的 P 链内存池中的无效交易发布。
* 忽略了数据库目录中的非数据库文件和文件夹。这应该会特别修复 macOS 上报告的错误。DS_Store 文件。
* 修复了 build-dir 标志以便能够通过 CLI 进行指定，而不会造成升级前节点出错。
* 删除了节点管理器守护进程不再支持的 plugin-dir 标志。一般不指定导致正确行为的标志。但是，对于复杂的安装程序，可能会需要 build-dir 标志。
* 强制 gossip 消息到通过已经完成对等点握手的连接。
* 减少了共识遍历和引导期间的内存分配。

## V1.4.5 （[在 GitHub 上查看](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.5)）

**Apricot 阶段 2 - 补丁 5 - 数据库升级**

**本次升级比一般版本更新更复杂。更多详细说明和常见问题解答可在** [**此处**](https://docs.avax.network/build/release-notes/avalanchego-v1.4.5-database-migration)**查看。**

{% hint style="warning" %}‏本次更新可向后兼容。您可以选择是否更新，但我们鼓励更新。
本补丁包含大幅度性能改进和多个其他更新。{% endhint %}

**虚拟机改进：**

* 完全重新设计 `platformvm` 的状态管理。
   * 删除了通过块传递 `versiondb` 来传递状态引用的用法，这些引用可以在不重新解析对象的情况下进行修改和读取。
   * 实施了基础状态管理器来正确缓存和管理对底层数据库的写入。
   * 实施 CoW 验证者集来启用缓存内存中的多个验证者集。
   * 按子网对链进行索引，以避免触碰未使用的状态对象。
   * 按 `nodeID` 对验证者进行索引，以避免非必要反复，同时接受 `addDelegator` 和 `addSubnetValidator` 交易。
   * 减少了专门用来管理磁盘上的验证者集和验证者正常运行时间的键值对数量。
* 给 `platformvm` 的 API 增加了质押奖励查找操作来支持奖励索引。
* 重构了验证者正常运行时间计量来简化测试。
* 对 `platformvm` 添加了区块和交易类型指标。
* 将 API 调用指标添加到 `avm` 和 `platformvm` 。
* 更新了 `avm`的状态管理以使用 `prefixdb`，记录缓存指标以及与 `platformvm` 分享其他代码 。
* 简化了 `avm`和 `platformvm`中的 `UTXO` 管理和索引。
* 重构了地址解析和管理，以便在可兼容的虚拟机实例中实现完整共享。
* 重构了主子网的共享内存，在虚拟机实例中实现完整共享。
* 增加了链状态实施，以支持通过现有虚拟机实施实现无缝缓存并简化新虚拟机的实施。
* 将新的链状态管理器整合到了 `rpcchainvm`内，还增加了各种指标。
* 已将 `upgradeBytes` 和 `configBytes` 添加到标准虚拟机界面以更好地支持未来的网络升级。
* 已将 `getAtomicTx` 和 `getAtomicTxStatus`端点添加到 `evm` API。
* 简化了 `evm` 区块生成，以通过共识引擎实现同步执行。
* 增加了原子交易内存池来重复引入孤立原子交易。
* 修复了 `evm` 客户端的错误，以便正确设置 `getAtomicUTXOs` 中的 `sourceChain`。
* 将新的链状态管理器整合到了 `evm`中，以便更好的优化区块管理。

**引导改进：**

* 删除了引导期间的重复遍历。这样大大提升了重启引导过程期间的节点性能。
* 修复了在执行已引导容器时尝试退出节点时发生的非正常节点关闭错误。
* 修复了引导期间的重复 IPC 容器广播。
* 将引导作业队列标准化，以使用 `prefixdb` 写入状态，而不是实施自定义前缀。
* 增加了其他引导缓存和缓存指标。

**数据库迁移附加部分：**

* 增加了守护程序进程管理器，可以无缝迁移到已更新的数据库格式。
* 重构了版本处理来跟踪数据库语义版本。
* 应用了一个数据库管理器，可以跨不同的数据库版本进行跟踪和操作。
* 实施了一次 `keystore` 迁移，可以自动将用户从 `v1.0.0` 数据库复制到 `v1.4.5` 数据库。
* 实施了一次从 `v1.0.0`数据库到 `v1.4.5` 数据库的验证者正常运行时间迁移。

**节点改进：**

* 正在更新配置解析，以便始终扩展环境变量。
* 重构了节点配置以允许在不触碰磁盘的情况下指定内存中的 TLS 证书。
* 针对有意义的退出码增添了更好的支持。
* 显示了 `http` 和 `staking` 服务器的侦听地址以协助支持非特定端口映射。
* 实施了一个 `versionable` 数据库以便在传递数据库与 `versioned` 数据库之间进行切换。
* 优化了 ID `Set`预配置并降低了 `struct` 的内存使用量。
* 强制执行了更加严格的静态代码检查规则。

**修改了命令行参数：**

对于以下参数，`"default"` 之前当作关键词处理。现在，`"default"` 将尝试当作该标志的预期值来处理。要保留默认行为，则不应指定标志。

* `config-file`
* `coreth-config`
* `plugin-dir`
* `staking-tls-key-file`
* `staking-tls-cert-file`
* `bootstrap-ips`
* `bootstrap-ids`
* `ipcs-path`
* `db-dir`

对于以下参数，`""` 之前当作关键词处理。现在，`""` 将尝试当作该标志的预期值来处理。要保留默认行为，则不应指定标志。

* `ipcs-chain-ids`
* `log-dir`
* `log-display-level`

不再要求将 `bootstrap-ips` 和 `bootstrap-ids` 配对了。这意味着指定的 `bootstrap-ips` 的数量不同于 `bootstrap-ids` 是有效的。  `bootstrap-ips`用于初始连接网络，而 `bootstrap-ids` 用作引导信标。

**增加了命令行参数：**

* `fetch-only`
* `build-dir`

**删除了命令行参数：**

* `xput-server-port`
* `xput-server-enabled`

## V1.4.4（[在 GitHub 上查看](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.4)）

**Apricot 阶段 2 - 补丁 4**

{% hint style="warning" %}‏本次更新可向后兼容。您可以选择是否更新，但我们鼓励更新。
{% endhint %}

该补丁包含错误修复和性能改进，旨在优化即将到来的 `db-upgrade` 版本。

* 跳过了引导过程中的拖尾延迟，这样在子网中最后一个链被标记为已引导时所有链都已完成引导。
* 改进了引导过程中的消息处理，可以在等待其他链同步时处理消息。
* 通过重复使用现有抽样器，减少了抽样器分配。
* 更新了 docker 脚本，仅推送来自 `master` 分支的镜像。
* 修复了日志格式化问题。
* 改进了错误消息。

## V1.4.3（[在GitHub上查看](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.3)）

**Apricot 阶段 2 - 补丁 3**

{% hint style="warning" %}‏本次更新可向后兼容。您可以选择是否更新，但我们鼓励更新。
{% endhint %}

本补丁包含补丁修复程序、更新后的正常运行时间监控以及性能改进。

* 修复了可能导致节点在引导过程中无法取得进展的闲置消息处理问题。当节点完成引导时无法过渡到正常执行时，通常会经历这种情况。
* 修复了 C 链代码库中的一个非确定性错误，该错误可能导致接收大量交易广播请求的节点暂停生成区块，直到其处理另一节点生成的区块为止。
* 将发送到对等点的版本消息的数量限制为一。
* 删除了 Apricot 阶段 2 中弃用的遗留握手消息。
* 将已经闲置的节点标记为离线，以进行正常运行时间计算。
* 在验证者集更改中，已将验证者集更新为更可执行。
* 更新了网络，以便断开连接时尝试仅重新连接到当前是验证者的对等点。

## V1.4.2（ [在 GitHub 上查看](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.2)）

**Apricot 阶段 2 - 补丁 2**

{% hint style="warning" %}
本次更新向后兼容 V1.4.0 和 V1.4.1。本次升级中的变更将分别于 2021 年 5 月 5 日北美东部夏令时上午 10 点在 Fuji 测试网生效和 2021 年 5 月 10 日北美东部夏令时上午 7 点在主网生效。
{% endhint %}

本补丁进一步减小 gossip 对等点列表消息的大小并且引入数个新标志：

* `network-peer-list-size` 支持调整每个 `peerlist` 消息中的 gossip 对等点的数量。
* `network-peer-list-gossip-size` 支持调整向其 gossip `peerlist` 消息的对等点数量。
* `network-peer-list-gossip-frequency` 支持调整 `peerlist`gossip 的次数。

## V1.4.1（ [在 GitHub 上查看](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.1)）

**Apricot 阶段 2 - 补丁 1**

{% hint style="warning" %}本更新向后兼容 v1.4.0。请在 V1.4.0 版本中查看预计更新时间。{% endhint %}

本补丁减小了 gossip 对等点列表消息的大小，并且引入了新标志`--bootstrap-beacon-connection-timeout` ，从而允许在启动时配置守护程序连接超时。

## V1.4.4（[在 GitHub 上查看](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.0)）

**Apricot 阶段 2**

{% hint style="danger" %}
**请注意，本更改不向后兼容之前的版本。**

**相关的博客帖子可以在** [**此处**](https://medium.com/avalancheavax/apricot-phase-two-berlin-eips-enhanced-avalanche-native-token-ant-support-c2ae0febe5bf)**找到。**
{% endhint %}

{% hint style="warning" %}
本次升级将 Ethereum Berlin 升级应用到 C 链，增加了新的 AVM 端点，并且包含各种稳定性改进。我们鼓励社区里的每个人尽快升级以确保节点运行状况良好。

本次升级中的变更将分别于 2021 年 5 月 5 日北美东部夏令时上午 10 点在 Fuji 测试网生效和 2021 年 5 月 10 日北美东部夏令时上午 7 点在主网生效。
{% endhint %}

**本次升级的主要组成部分包括：**

* 更新了 Coreth 以依赖 V1.10.2 版 Go-ethereum。
* 应用了 Ethereum Berlin 升级。 具体指 [EIP-2565](https://eips.ethereum.org/EIPS/eip-2565)、[EIP-2718](https://eips.ethereum.org/EIPS/eip-2718)、 [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929) 和 [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930)。
* 对 C 链添加了新的状态性预编译智能合约，以支持 ANT 转移和围绕 ANT 的  ARC-20 包装。
* 增添了 AVM `/events` 端点，可支持被接受并匹配地址过滤条件的交易 Websocket 通知。
* 新增了两个新的网络消息类型 `SignedVersion` 和 `SignedPeerlist` 来改进验证者 -> IP 映射。
* 修复了一个长期存在的错误，在引导链时关闭节点可能导致链被非正常关闭。
* 更新了插件 gRPC 包，对大型请求进行分页以提高稳定性。
* 增加了将 Avalanchego 的主二进制文件作为插件运行的能力。
* 修复了 Leveldb 崩溃保护中的潜在竞争条件。
* 更新了自动执行的构建脚本以便更好地支持多个架构。

**增加了命令行参数：**

* `plugin-mode-enabled` 指定了要以插件模式运行的二进制文件。

**删除了命令行参数：**

* `p2p-tls-enabled`
* `disconnected-check-frequency`
* `disconnected-restart-timeout`
* `restart-on-disconnected`

## V1.3.2（ [在 GitHub 上查看](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.2)）

**Apricot 阶段 1- 补丁 2**

{% hint style="danger" %}‏本次更新可向后兼容。您可以选择是否更新，但我们鼓励更新。
本补丁包含安全性改进、错误修复以及监控改进。{% endhint %}

**安全性改进：**

* 针对在 `Apricot Phase 1` 之前生成的 C 链区块强制执行严格的规范格式。这样可确保对 `extra-data` 区块字段的修改导致无法在引导过程中对链状态进行修改。
* 更改了 `Keystore` 以确保通过 IPC 在 Avalanchego 和插件进程间仅传送加密值。

**错误修复：**

* 修复了委托上限计算，以包含删除委托人之前更新当前委托上限。这样可确保委托上限始终在执行。
* 修复了 `AVM` 状态 API 以便在启动时正确注册。
* 更新了节点 `uptime` 计算，以便将网络升级包括在内。

**监控改进**

* 增加了可选节点索引器，可以为在链上接受的操作提供本地一致的排序。
* 更新了 Ansible 库存以包括许多改进（特别鸣谢 @moreati）。

## V1.3.1（[在 GitHub 上查看](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.1)）

**Apricot 阶段 1 - 补丁 1**

{% hint style="danger" %}‏本次更新可向后兼容。您可以选择是否更新，但我们鼓励更新。
本补丁包含稳定性、监控改进和小错误修复。{% endhint %}

**本次升级的主要组成部分包括：**

* 修复了在 arm64 CPU 上执行压缩时的 C 链分段错误。
* 增加了对本地文件的群组使用权限以启用复杂的节点监控。
* 去除通过 api-auth-password-file 标志传递的认证密码中的空格。
* 删除了 timeSinceNoOutstandingRequests，因为已经用 longestRunningRequest 将其取代。
* 增加了网络节流的其他指标。
* 各种代码清理。

**增加了命令行参数：**

* `network-health-max-outstanding-request-duration`

**删除了命令行参数：**

* `network-health-max-time-since-no-requests`

## V1.3.0（ [在 GitHub 上查看](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.0)）

**Apricot 阶段 1**

{% hint style="danger" %}
请注意，本更改不向后兼容之前的版本。

本次升级降低了 C 链 gas 费用，去除了 C 链 gas 退款，并且包含各种安全性改进。我们鼓励社区里的每个人尽快升级以确保其节点运行状况良好。{% endhint %}

本次升级中的更改将分别于 2021 年 3 月 25 日北美东部夏令时上午 10 点在  Fuji 测试网生效和 2021 年 3 月 31 日北美东部夏令时上午 10 点在主网上生效。

**本次升级的主要组成部分包括：**

* 将 C 链 gas 成本从 470 nAVAX 降至 225 nAVAX。
* 删除了 C 链 gas 退款。此更改采用了 [EIP-3298](https://eips.ethereum.org/EIPS/eip-3298) 。
* 重构了 C 链验证以便在执行网络升级时更加清洁。
* 修复了 Auth API 以便正确执行废除的代币。
* 强化了 Auth API 以确保使用预期签名格式。
* 从 CLI 参数删除了 Auth API 的密码。
* 增加了更严格的文件权限检查。
* 增加了一些其他微小错误处理。
* 在写入磁盘之前净化日志写入。
* 向 HTTP 端点增加了可配置来源。
* 删除了在启动时尝试的 HTTP 到 HTTP 故障转移。现在，如果将 HTTP 端点升级到 HTTP 失败，那么节点将在启动时关闭。

**增加了命令行参数：**

* `api-auth-password-file` 指定了要从中读取 Auth API 密码的文件。

**删除了命令行参数：**

* `api-auth-password`

## **V1.2.4（**[**在 GitHub 上查看**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.4)**）**

**Apricot 阶段 0 - 升级 1 - 补丁 4**

{% hint style="danger" %}‏本次更新可向后兼容。您可以选择是否更新，但我们鼓励更新。
本补丁包含稳定性和监控改进。{% endhint %}

* 更新了自述文件以纠正存储要求。
* 在引导期间向 Avalanche Tx 验证添加了额外的错误处理。
* 更新了许多指标，其中包括增加多个和节点运行状况以及数据库使用相关的新指标，删除了未使用以及无效的指标，并且修正了一些指标名称。
* 增加了额外 CI 日志。
* 将 C 链添加到了关键链列表。

## **V1.2.3（ [**在 GitHub 上查看**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.3-signed)****）**

**Apricot 阶段 0 - 升级 1 - 补丁 3**

{% hint style="danger" %}‏本次更新可向后兼容。您可以选择是否更新，但我们鼓励更新。
本补丁包含稳定性和监控改进。{% endhint %}

* 调整了 `[network, router, consensus]` 运行状况检查参数以删除运行不正常的状态检查。
* 简化了 C 链区块处理。

## **V1.2.2（ [**在 GitHub 上查看**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.2)****）**

**Apricot 阶段 0 - 升级 1 - 补丁 2**

{% hint style="danger" %}‏本次更新可向后兼容。您可以选择是否更新，但我们鼓励更新。
本补丁包含稳定性、性能以及监控改进。{% endhint %}

* 增加了网络库中的 IP 别名以避免重复 `SYN` 调用。
* 修复了从您自己引导时的引导消息处理。
* 简化了 `AdvanceTimeTx` 发行。
* 增加了新的共识运行状况检查。
* 增加节点运行状况日志。
* 增加了对运行状态 `GET` 请求的运行状况反馈。
* 整合了入站消息日志。
* 对 `LevelDB` 包装程序增加了错误日志记录。
*  `rpcdb` 中增加了错误代码，避免了字符串解析。
* 改进了标准链的 C 链处理，可减少重组次数。
* 改进了在 `pending` 区块上执行的模拟调用的 C 链处理。

## **V1.2.1（[**在 GitHub 上查看**](https://github.com/ava-labs/avalanchego/tree/v1.2.1)****）**

**Apricot 阶段 0 - 升级 1 - 补丁 1**

{% hint style="danger" %}‏本次更新可向后兼容。您可以选择是否更新，但我们鼓励更新。
本补丁包含稳定性、性能以及监控改进。

请注意，本次更新删除了 `network-timeout-increase` 和‘network-timeout-reduction` 作为命令行参数。
{% endhint %}

更改总结：

* 增加了 `UTXO`s to the `platformvm.getStake` 响应。
* 向 `info.peers` 响应增加了闲置列表报告。
* 向网络层添加了额外运行状况检查。
* 增加了 `percent of stake connected` 作为报告指标。
* 增强了引导重启逻辑以确保节点抓住了当前提示，即使在高吞吐量时也是如此。
* 增加了子网宽度引导来确保链不会因其他链引导而落后。
* 阻止了被拒区块的验证来避免不必要的计算。
* 删除了网络中非首选块的 gossip。
* 切换了网络超时计算器来使用被观察网络延迟的 EWMA。
* 从网络延迟计算中删除了 `Get` 请求。
* 清理了闲置列表算法。
* 清理了发送时对丢弃的消息的处理。
* 清理了未决请求和超时逻辑。
* 归纳了性能跟踪以允许添加配置文件名称前缀。
* 向 Avalanche 引导遍历添加了额外缓存。
* 修复了 Ansible 静态代码检查。
* 增加的命令行参数主要由运行状况检查的配置组成。此外，修改过的网络延迟计算更改了一些命令行参数的名称。

增加了命令行参数：

* `network-timeout-halflife`
* `network-timeout-coefficient`
* `network-health-min-conn-peers`
* `network-health-max-time-since-msg-received`
* `network-health-max-time-since-msg-sent`
* `network-health-max-portion-send-queue-full`
* `network-health-max-send-fail-rate`
* `network-health-max-time-since-no-requests`
* `router-health-max-drop-rate`
* `router-health-max-outstanding-requests`
* `health-check-frequency`
* `health-check-averager-halflife`
* `bootstrap-retry-enabled`
* `bootstrap-retry-max-attempts`

删除了命令行参数：

* `network-timeout-increase`
* `network-timeout-reduction`

## V1.2.0（ [在 GitHub 上查看](https://github.com/ava-labs/avalanchego/tree/v1.2.0)）

**Apricot 阶段 0 - 升级 1**

{% hint style="danger" %}**
请注意，此补丁不向后兼容之前的版本。本次升级修复了与在 X、C 以及 P 链之间交换传输相关的性能问题。我们鼓励社区里的每个人尽快升级以确保节点不受影响。另外，请注意，升级后节点可能还需要几分钟才能连接并且此进程应该在无干扰的情况下完成。**{% endhint %}

本次升级的主要组成部分包括：

* 修复了 C 链上的原子导入验证
* 增加了规则例外逻辑以允许原子奖励区块
* 共享内存中增加了快速失败逻辑，以防发出重复的删除
* 修复了由于无法清除请求而导致投票可能在雪人中停滞的问题
* 修复了由于未知祖先导致 coreth 中的坏区块问题
* 修复了 coreth 修复规范链脚本中的竞赛环境
* 限制了雪人中处理的区块数量和 Avalanche 中处理的 tx 数量
* 更新了联网超时默认值和闲置列表设置
* 验证了初始网络不稳定后没有安全违规

## V1.1.5（ [在 GitHub 上查看](https://github.com/ava-labs/avalanchego/tree/v1.1.5)）

**Apricot 阶段 0 - 补丁 5**

{% hint style="danger" %}‏本次更新可向后兼容。您可以选择是否更新，但我们鼓励更新。
本补丁包含稳定性改进。{% endhint %}

* 修复了注册新链时可能导致 P 链和 HTTP 端点阻塞的潜在僵局。
* 修复了 C 链中的 TxID -> Block Height 索引。
* 在 C 链的 debug_traceTransaction API  中添加了空协议部署的正常处理。
* 改进了 C 链中的错误处理 。

## V1.1.4（ [在 GitHub 上查看](https://github.com/ava-labs/avalanchego/tree/v1.1.4)）

**Apricot 阶段 0 - 补丁 4**

{% hint style="danger" %}‏本次更新可向后兼容。您可以选择是否更新，但我们鼓励更新。
本补丁包含 CLI 升级、API 错误修复、稳定性提升以及性能改进。
{% endhint %}

* 修复了 C 链区块索引可能以给定的高度映射到未被接受的区块的问题。
* 修复了 RPCChainVM 经历高 API 负载时虚拟机崩溃的问题。
* 修复了 Avalanche 引擎中的乐观投票泡泡，以便正确地将投票传递过处理顶点。
*  AVM 的 GetBalance 增加了 IncludePartial 字段，并且增加了 GetAllBalances API 方法。这样就更改了仅返回可支出和唯一拥有资产的余额的默认行为。
* 增加了为自定义网络 ID 指定自定义 genesis 配置的能力。
* 增加了其他 IPC API 功能。
* 给 RPCChainVM 增加了额外缓存。
* 改进了插件目录查找以便始终配合二进制版本。

## V1.1.3（ [在 GitHub 上查看](https://github.com/ava-labs/avalanchego/tree/v1.1.3)）

**Apricot 阶段 0 - 补丁 3**

{% hint style="danger" %}本次更新是可选更新，但我们鼓励更新。本补丁包含 API 相关的小错误修复。{% endhint %}

* 修复了尝试过滤 C 链日志时的挂起调用。
* 修复了 C 链客户端以调用适当的多元币 API。
* 将 `getAtomicUTXOs` 增添到 `avm` 和 `platformvm` API 客户端。

## V1.1.2（ [在 GitHub 上查看）](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.2)

**Apricot 阶段 0 - 补丁 2**

{% hint style="danger" %}本次更新是可选更新，但我们鼓励更新。本补丁包含错误修复和性能改进。{% endhint %}

* 修复了引导进程缓存以减少引导 Avalanche 时的重复遍历。
* 优化了引导期间的 P 链验证。
* 修复了最大闲置列表计算以使用合适的输入值。
* 删除了从 CI 运行的额外静态代码检查。
* 将 `Height` 增添到了 `snowman.Block` 界面。

## V1.1.1（ [在 GitHub 上查看](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.1)）

**Apricot 阶段 0 - 补丁 1**

{% hint style="danger" %}本次更新是可选更新，但我们鼓励更新。本补丁包含错误修复和性能改进。{% endhint %}

* 修复了用户禁用 `Health` API 后的节点崩溃错误。
* 修复了可能过度报告节点正常运行时间的运行时跟踪错误。
* 重构了顶点解析以使用 `Codec`。
* 区分了状态和无状态顶点管理。
* Codec 增添了每字段片长度检查。
* 引入了一种新的编解码器类型，可将 `TypeID`分为一组。
* CLI 引入了消息限制标志。
* 引入了可在未来数据库迁移中使用的语义数据库软件包。
* 链上下文中增添了 Epoch 跟踪。
* 改进了交易验证期间返回的一些错误消息。
* 减少了版本数据库中的 GC 压力。

## V1.1.0（ [在 GitHub 上查看](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.0)）

**Apricot 阶段 0**

{% hint style="danger" %}**请注意，本次升级不向后兼容以前的版本。升级不得晚于协调世界时间 12 月 7 日星期一晚上 11 点（北美东部标准时间下午 6 点）。为了修复一个重要的代币解锁错误，原定于 12 月中旬发布的升级现在需要提前发布。我们鼓励社区里的每个人尽快升级以确保节点不受影响**。{% endhint %}

本次升级有两个主要部分组成：

* 我们为即将到来的 Apricot 网络升级所做好一般准备工作，称为 Apricot 阶段 0 升级。
* 修复了一个问题，该问题在 lock _**_ time 过后阻止可质押的锁定输出被解锁。

## V1.0.6（ [在 GitHub 上查看](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.6)）

{% hint style="danger" %}
请注意，本版本包含有重要变更，如 [此处](https://docs.avax.network/build/apis/deprecated-api-calls)所述。更改了 platform.getTxStatus and platform.getCurrentValidators 的默认响应格式。本次更新是可选更新，但我们鼓励更新。本补丁包含性能改进和某些生存质量改进。{% endhint %}

* 删除了 platform.getTxStattast 和 platform.getCurrentValidators 的弃用格式。
* 增加了对从 keystore API 导入和导出用户的十六进制编码的支持。
* 对 V1.15.5 设置了 Golang 要求，以避免 Gollang 标准库中的 DoS 漏洞。
* 增加了 API 客户端以作为辅助程序与节点软件交互。
* 如果节点与网络的其余部分断开连接，则启用回退到引导。
* 修复了 UTXO 引用多个地址时的 GetUTXO API。
* 重构了二进制编码以便更好地普及 RPC 选项。
* 修复了 IP 区块筛选条件来正确地设置窗口长度。
* 普及了编解码器软件包以便能够管理不同版本的多个编解码器。
* 给顶点界面增加了 Epoch 为未来的发行版做了准备。
* 延迟了交易哈希，以降低经过快速检查的 CPU/内存使用率。
* 对于那些使用 [https://explorerapi.avax-dev.network/](https://explorerapi.avax-dev.network/) 的用户，URL 将在未来的发行版中关闭。请切换到 [https://explorerapi.avax.network/](https://explorerapi.avax.network/)。

要获得本次更新的帮助，请关注我们的[开发人员常见问题解答](https://support.avalabs.org/en/collections/2618154-developer-faq)，如果仍然遇到问题，可以加入我们的 [Discord](https://chat.avax.network/) 获取帮助。

## V1.0.5（ [在 GitHub 上查看](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.5)）

{% hint style="danger" %}
请注意，本版本之后的新版本，即 V1.0.6，将包含重要变更，如[此处](https://docs.avax.network/build/apis/deprecated-api-calls)所述。 也就是说，`platform.getTxStatus` 和 `platform.getCurrentValidators` 的响应格式将发生变化。
{% endhint %}

V1.0.5 版中的更改可向后兼容之前的版本。本次更新是可选更新，但我们鼓励更新。本补丁包含性能改进和一些生存质量改进。

* C 链 API 中增添了 `IssueTx` 和 `GetUTXOs`，以便在不向节点透露私钥的情况下发布原子互换。
* 借助预言机区块处理，修复了雪人请求管理器中的内存泄漏。
* 修复了漏报可用资金的 UTXO 分页错误。
* 将链 http 日志移到人类可读的链日志文件夹。
* 重构了 ID 管理方式以避免堆配置。
* 优化了 `UniformSampler`来避免创建多个映射。
* 减少了 `ids.Set`的使用，以支持 `[]ids.ID` 更好地利用持续内存。
* 在 `PrefixDB` 中引入了 `[]byte` 复用。
* 实施了类型特定的排序功能，避免频繁干扰转换分配。
* 优化了 AVM 负载用户，以避免从磁盘读取非必要的信息。
* 针对消息的完整长度，删除了套接字发送中的内存分配和复制。

要获得本次更新的帮助，请关注我们的[开发人员常见问题解答](https://support.avalabs.org/en/collections/2618154-developer-faq)，如果仍然遇到问题，可以加入我们的 [Discord](https://chat.avax.network) 获取帮助。

## V1.0.4（ [在 GitHub 上查看](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.4)）

![AvalancheGo release notes v1.0.4.png](../../.gitbook/assets/image%20%2817%29.png)

{% hint style="danger" %}本次更新是可选更新，但我们鼓励更新。本补丁包含生存质量改进和各种性能增强。请注意，本次更新需要将 CLI 参数指定为 --，而不是允许 -- 或--。例如，不再允许 `-public-ip=127.0.0.1` 并且必须指定为 `--public-ip=127.0.0.1`。 否则，此更新可向后兼容。
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

要获得本次更新的帮助，请关注我们的[开发人员常见问题解答](https://support.avalabs.org/en/collections/2618154-developer-faq)，如果仍然遇到问题，可以加入我们的 [Discord](https://chat.avax.network) 获取帮助。

