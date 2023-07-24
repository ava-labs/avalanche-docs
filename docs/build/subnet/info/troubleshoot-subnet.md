---
tags: [Build, Subnets]
description: A reference for tips to resolve common issues while deploying Subnets on Avalanche.
sidebar_label: Troubleshooting
pagination_label: Troubleshooting Subnet Deployments
sidebar_position: 2
---

# Troubleshooting Subnet Deployments

If you run into trouble deploying your Subnet, use this document for tips to resolve common issues.

## Deployment Times Out

During a local deployment, your network may fail to start. Your error may look something like this:

```text
[~]$ avalanche subnet deploy mySubnet
✔ Local Network
Deploying [mySubnet] to Local Network
Backend controller started, pid: 26388, output at: /Users/user/.avalanche-cli/runs/server_20221231_111605/avalanche-cli-backend
VMs ready.
Starting network...
..................................................................................
..................................................................................
......Error: failed to query network health: rpc error: code = DeadlineExceeded desc = context deadline exceeded
```

Avalanche-CLI only supports running one local Avalanche network at a time. If other instances of
AvalancheGo are running concurrently, your Avalanche-CLI network fails to start.

To test for this error, start by shutting down any Avalanche nodes started by Avalanche-CLI.

```shell
avalanche network clean --hard
```

Next, look for any lingering AvalancheGo processes with:

```shell
ps aux | grep avalanchego
```

If any processes are running, you need to stop them before you can launch your VM with Avalanche-CLI.

:::warning

If you're running a validator node on the same box you're using Avalanche-CLI, **don't** end any
of these lingering AvalancheGo processes. This may shut down your validator and could affect
your validation uptime.

:::

## Incompatible RPC Version for Custom VM

If you're locally deploying a custom VM, you may run into this error message.

```text
[~]$ avalanche subnet deploy mySubnet
✔ Local Network
Deploying [mySubnet] to Local Network
Backend controller started, pid: 26388, output at: /Users/user/.avalanche-cli/runs/server_20221231_111605/avalanche-cli-backend
VMs ready.
Starting network...
.........
Blockchain has been deployed. Wait until network acknowledges...
..................................................................................
..................................................................................
......Error: failed to query network health: rpc error: code = DeadlineExceeded desc = context deadline exceeded
```

This error has many possible causes, however you should be aware of the possibility of an RPC
protocol version mismatch.

AvalancheGo communicates with custom VMs over RPC using [gRPC](https://grpc.io/). gRPC defines a
protocol specification shared by both AvalancheGo and the VM. Both components **must** be running
the same RPC version for VM deployment to work. You can view [AvalancheGo's RPC compatibility broken
down by release
version](https://github.com/ava-labs/avalanchego/blob/master/version/compatibility.json).

Your custom VM's RPC version is set by the version of AvalancheGo that you import. By default,
Avalanche-CLI creates local Avalalanche networks that run the latest AvalancheGo release.

Here's an example with real numbers from the AvalancheGo compatibility page. If the latest
AvalancheGo release is version v1.9.4, then Avalanche-CLI deploys a network with RPC version 20. For
your deploy to be successful, your VM must also have RPC version 20. Because only AvalancheGo
version v1.9.4 supports RPC version 20, your VM **must** import AvalancheGo version v1.9.4. If the
latest release were v1.9.3, your VM could safely import versions v1.9.2 or v1.9.3 because both
versions support RPC version 19.

If your VM has an RPC version mismatch, you have two options. First, you can update the version of
AvalancheGo you use in your VM. This is the correct long-term approach. However, there is a
short-term workaround. Avalanche-CLI supports deploying older versions of AvalancheGo by using the
`--avalanchego-version` flag. Both the [`subnet deploy`](reference-cli-commands#subnet-deploy) and
[`network start`](reference-cli-commands#network-start) commands support setting the AvalancheGo
version explicitly. Although it's very important to keep your version of AvalancheGo up-to-date,
this workaround helps you avoid broken builds in the short term. However, you need to upgrade
to the latest AvalancheGo version when deploying publicly to the Fuji Testnet or Mainnet.

:::note
Updates to AvalancheGo's RPC version are **not** tied to its semantic version scheme. Minor AvalancheGo
version bumps may include a breaking RPC version bump.
:::
