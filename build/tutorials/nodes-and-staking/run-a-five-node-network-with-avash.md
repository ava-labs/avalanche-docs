# 使用 Avash 运行一个五节点网络

[Avash](https://github.com/ava-labs/avalanche-docs/tree/5d8eee7598db8da63038af14437e5ed6dac39af7/build/tools/avash/README.md) 是一个用于在您的本地机器上运行测试或私有 Avalanche 网络的开发网络。82/ 5000

您可以配置和自动化本地网络，使其处于您希望的任何状态。

82/ 5000这大大加快了本地开发工作和测试。

## 依赖关系

首先，确保您有每个依赖项的最新最优版本。

### Golang

首先，确认您安装的是[最新版本的 Golang](https://golang.org/dl) ，如果不是，则安装最新版本。本教程使用 `go1.17.1`。

```text
go version
go version go1.17.1 darwin/amd64
```

### AvalancheGo

接下来，确认您已安装和构建[最新版本的 AvalancheGo](https://github.com/ava-labs/avalanchego/releases)。此教程使用 `avalanche/1.6.0`。

```text
cd /path/to/avalanchego
git fetch -p
git checkout v1.6.0
./scripts/build.sh
...building
...building
Build Successful

./build/avalanchego --version
avalanche/1.6.0 [database=v1.4.5, commit=43ab26923909bf5750c1edeb8477a3b912e40eaa]
```

### Avash

然后，确认您已安装和构建[最新版本的 Avash](https://github.com/ava-labs/avalanchego/releases)。此教程使用 `v1.2.0`。调用  `help` 命令以确认正确构建了 Avash。

```text
cd /path/to/avash
git fetch -p
git checkout v1.2.0
go build

./avash help
A shell environment for launching and interacting with multiple Avalanche nodes.
```

## 启动本地网络

在正确构建所有依赖项后，现在您要准备启动本地 Avalanche 网络。在本示例中，我们将运行一个 Avash 捆绑的 `five_node_staking.lua` 脚本。

### 五节点质押脚本

Avash 让您可以自动执行开发环境，使之成为任意数量的本地 AvalancheGo 实例，每个实例都有唯一的配置。例如，`five_node_staking.lua` 脚本会启动一个具有 5 个完整 AvalancheGo 节点的本地 Avalanche 网络。您可以通过 RPC 与单个节点进行交互。

在以下 `five_node_staking.lua` 脚本通知中，您可以运行和配置任意数量的完整节点。您受 [Avash certs/ 目录](https://github.com/ava-labs/avash/tree/master/certs)中的质押者密钥数量的限制。AvalancheGo 带有 7 个质押者密钥。

通过传递有效的 [AvalancheGo 命令行参数](https://docs.avax.network/build/references/command-line-interface)，单独配置每个节点。

```lua
cmds = {
    "startnode node1 --db-type=memdb --staking-enabled=true --http-port=9650 --staking-port=9651 --log-level=debug --bootstrap-ips= --staking-tls-cert-file=certs/keys1/staker.crt --staking-tls-key-file=certs/keys1/staker.key",
    "startnode node2 --db-type=memdb --staking-enabled=true --http-port=9652 --staking-port=9653 --log-level=debug --bootstrap-ips=127.0.0.1:9651 --bootstrap-ids=NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg --staking-tls-cert-file=certs/keys2/staker.crt --staking-tls-key-file=certs/keys2/staker.key",
    "startnode node3 --db-type=memdb --staking-enabled=true --http-port=9654 --staking-port=9655 --log-level=debug --bootstrap-ips=127.0.0.1:9651 --bootstrap-ids=NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg --staking-tls-cert-file=certs/keys3/staker.crt --staking-tls-key-file=certs/keys3/staker.key",
    "startnode node4 --db-type=memdb --staking-enabled=true --http-port=9656 --staking-port=9657 --log-level=debug --bootstrap-ips=127.0.0.1:9651 --bootstrap-ids=NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg --staking-tls-cert-file=certs/keys4/staker.crt --staking-tls-key-file=certs/keys4/staker.key",
    "startnode node5 --db-type=memdb --staking-enabled=true --http-port=9658 --staking-port=9659 --log-level=debug --bootstrap-ips=127.0.0.1:9651 --bootstrap-ids=NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg --staking-tls-cert-file=certs/keys5/staker.crt --staking-tls-key-file=certs/keys5/staker.key",
}

for key, cmd in ipairs(cmds) do
    avash_call(cmd)
end
```

启动 Avash 并通过 Avash shell 运行 `five_node_staking.lua` 脚本。

```text
cd /path/to/avash
./avash
avash> runscript scripts/five_node_staking.lua
```

现在打开新选项卡并运行此 `curl`。

```text
curl --location --request POST 'http://localhost:9650/ext/info' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNetworkName",
    "params" :{
    }
}'

{
    "jsonrpc": "2.0",
    "result": {
        "networkName": "local"
    },
    "id": 1
}
```

如果您成功完成了以前步骤的每一步，那么您的本地 avash 网络准备就绪。

## 检查网络

Avash 的 shell 提供了一个 `procmanager` 命令，能够列出、停止和启动在进程管理器中注册的进程。

可用的命令：

```text
kill        Kills the process named if currently running.
killall     Kills all processes if currently running.
list        Lists the processes currently running.
metadata    Prints the metadata associated with the node name.
remove      Removes the process named.
removeall   Removes all processes.
start       Starts the process named if not currently running.
startall    Starts all processes if currently stopped.
stop        Stops the process named if currently running.
stopall     Stops all processes if currently running.
```

当您 `list` 所有进程时，可以查看用于启动 AvalancheGo 实例的所有标志的值。

![列出进程](../../../.gitbook/assets/procmanager-list.png)

## 摘要

Avash 的关键功能是使开发人员能够在具有无价值资产的高度可配置环境中快速测试他们的工作。AvalancheGo 的每个实例都是一个完整的节点，Avash 是一个实际的 AvalancheGo 网络，执行真实的共识并产生真实的区块和顶点。

如果您正在为 Avalanche 网络编写软件，那么 Avash 应该是工作流程的基本组成部分。您应该在本地 Avash 网络上启动每个新项目，并且仅在广泛测试和 QA 后，将您的工作部署到 Fuji 测试网并最终部署到主网上。

