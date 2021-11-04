# Postman 系列

## Postman 是什么？

Postman 是一款免费工具，供开发人员快速轻松地发送 REST、SOAP 和 GraphQL 请求，并测试 API。它既是在线工具，也是 Linux、MacOS 和 Windows 应用程序。您可以通过 Postman 快速发出 API 调用，并以整洁、可搜索的格式查看响应。

我们针对 [Avalanche](https://docs.avax.network) 开发了 Postman 系列，包括 [AvalancheGo 实例](../release-notes/avalanchego.md)中可用的全部公共 API 调用，便于您快速向节点发出命令并查看响应，无需复制粘贴冗长复杂的 `curl` 命令。

除了 API 系列，还有针对 Postman 的 Avalanche 环境示例。该环境定义了常见变量，如节点的 IP 地址、您的 Avalanche 地址和查询的类似公共元素，因此无需多次输入。

总的看来，它们让您轻松密切地关注自己的节点，查看节点状态并进行快速查询，以了解其运行情况。

## 设置

### Postman 安装

Postman 可以本地安装，也可以作为 web 应用程序使用。我们建议您安装应用程序，因为可以简化操作。您可以从其[网站](https://www.postman.com/downloads/)上下载 Postman。建议您使用电子邮件地址注册账户，让您的工作区在 web 应用程序和计算机安装的应用程序之间轻松备份和共享。

![下载 Postman](../../.gitbook/assets/postman_01_download.png)

安装应用程序，然后运行。应用程序会提示您创建账户或登录账户。按提示操作。同样，不一定要这样做，但建议您这样做。

### 系列导入

在 Workspaces 选项卡中选择 `New workspace`，按照提示创建新的工作区。剩余的工作就完成了。

![新工作区](../../.gitbook/assets/postman_02_workspace.png)

我们准备导入系列了。在 Workspaces 选项卡标题上选择 `New`，然后切换到 `Link` 选项卡。

![导入系列](../../.gitbook/assets/postman_03_import.png)

在 URL 输入字段中粘贴系列的链接：

```text
https://raw.githubusercontent.com/ava-labs/avalanche-postman-collection/master/Avalanche.postman_collection.json
```

Postman 将识别文件内容的格式，然后导入文件作为一个系列。完成导入。至此，您的工作区里有了 Avalanche 系列。

![系列内容](../../.gitbook/assets/postman_04_collection.png)

### 环境导入

接下来，我们要导入环境变量。同样，在 Workspaces 选项卡标题上选择 `New`，然后切换到 `Link` 选项卡。这次要粘贴环境 JSON 链接：

```text
https://raw.githubusercontent.com/ava-labs/avalanche-postman-collection/master/Example-Avalanche-Environment.postman_environment.json
```

Postman 将识别文件的格式：

![环境导入](../../.gitbook/assets/postman_05_environment.png)

导入到您的工作区。现在我们要编辑该环境，以适应特定安装情况的实际参数。这些参数不同于导入文件中的默认值。

单击环境下拉列表旁边的眼睛图标：

![环境内容](../../.gitbook/assets/postman_06_variables.png)

选择 `Edit` 按钮更改默认值。至少需要更改节点的 IP 地址，这也是 `host` 变量的值。将其改成节点的 IP（同时更改 `initial` 和 `current` 值）。此外，如果您的节点并不在安装 Postman 的同一台机器上运行，请勾选相应的[命令行选项](../references/command-line-interface.md#http-server)，确保您的节点通过 API 端口接受外部的连接。﻿﻿

至此，一切准备就绪，可以查询节点了。

## 进行 API 调用

打开其中一个 API 调用组，例如 `Health`。双击 `health` 调用：

![API 调用](../../.gitbook/assets/postman_07_making_calls.png)

您会看到，调用的格式使用了 `http`、`host` 及`port` 环境变量。单击 `Send`。将发出请求，您会很快收到响应，就在 `Response` 的 `Body` 选项卡中：

![响应](../../.gitbook/assets/postman_08_response.png)

要查看实际调用和发送到节点的变量，请切换到 API 调用选项卡中的 `Body` 选项卡。您可以在那里快速修改变量，以查看针对不同查询的响应。

## 结论

如果学完了本教程，现在就可以快速向节点发出 API 调用，而不会弄乱终端中的 curl 命令。这样便于您快速查看节点的状态、跟踪变更，或仔细检查节点的运行状况或活性。

## 贡献

我们希望通过 [Avalanche API](https://docs.avax.network/build/avalanchego-apis) 持续更新该系列，同时增加[数据可视化](https://learning.postman.com/docs/sending-requests/visualizer/#visualizing-response-data)。如果您能够以任何方式帮助改进 Avalanche Postman 系列，首先从 `master`中创建一个功能分支，然后改进功能分支，最后创建一个[拉取请求](https://github.com/ava-labs/avalanche-docs/pulls)，将您的工作重新合并到 `master`。

如有任何其他问题或建议，[请与我们商谈](https://chat.avalabs.org/)。

