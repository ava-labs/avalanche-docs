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

This error has many possible causes, but a common cause is usually due to **an RPC
protocol version mismatch.**

AvalancheGo communicates with custom VMs over RPC using [gRPC](https://grpc.io/). gRPC defines a
protocol specification shared by both AvalancheGo and the VM. **Both components must be running
the same RPC version for VM deployment to work.**

Your custom VM's RPC version is set by the version of AvalancheGo that you import. By default,
Avalanche-CLI creates local Avalalanche networks that run the latest AvalancheGo release.

### Example

_Here's an example with real numbers from the AvalancheGo compatibility page_:

- If the latest AvalancheGo release is version v1.10.11, then Avalanche-CLI deploys a network with
RPC version 28.
- For your deploy to be successful, your VM must also have RPC version 28. Because only
AvalancheGo versions v1.10.9, v1.10.10 and v1.10.11 supports RPC version 28, 
your VM **must** import one of those versions.

### Solution

Error: `RPCChainVM protocol version mismatch between AvalancheGo and Virtual Machine plugin`

This error occurs when the RPCChainVM protocol version used by VMs like Subnet-EVM
are incompatible with the protocol version of AvalancheGo.

If your VM has an RPC version mismatch, you have two options: 

1. Update the version of AvalancheGo you use in your VM. This is the correct long-term approach.
2. Use Avalanche-CLI to deploy an older version of AvalancheGo by using the
`--avalanchego-version` flag. Both the [`subnet deploy`](/tooling/avalanche-cli.md#subnet-deploy)
and [`network start`](/tooling/avalanche-cli.md#network-start) commands support
setting the AvalancheGo version explicitly.

Although it's very important to keep your version of AvalancheGo up-to-date,
this workaround helps you avoid broken builds in the short term. 

:::caution
You must upgrade to the latest AvalancheGo version when deploying publicly to 
Fuji Testnet or Avalanche Mainnet.
:::

### More Information

Similar version matching is required in different tools on the ecosystem. Here is a compatibility 
table showing which RPCChainVM Version implements the more recent releases of 
AvalancheGo, Subnet-EVM, Precompile-EVM and HyperSDK.

| RPCChainVM | AvalancheGo                    | Subnet-EVM               | Precompile-EVM             | HyperSDK |
| :--------: | :-------:                      | :-------:                | :-------:                  | :-------: |
| 26         | v1.10.1-v1.10.4                | v0.5.1-v0.5.2            | v0.1.0-v0.1.1              | v0.0.6-v0.0.9 |
| 27         | v1.10.5-v1.10.8                | v0.5.3                   | v0.1.2                     | v0.0.10-v0.0.12 |
| 28         | v1.10.9-v1.10.12               | v0.5.4-v0.5.6            | v0.1.3-v0.1.4              | v0.0.13-**v0.0.15 (latest)** |
| 29     | v1.10.13-v1.10.14                  | v0.5.7-**v0.5.8 (latest)** | **v0.1.5 (latest)**      | -          |
| **30**     | **v1.10.15 (latest)**          | -                         | -                         | -          |

You can view the full RPC compatibility broken down by release version for each tool here: 

[AvalancheGo](https://github.com/ava-labs/avalanchego/blob/master/version/compatibility.json).

[Subnet-EVM](https://github.com/ava-labs/subnet-evm/blob/master/compatibility.json).

[Precompile-EVM](https://github.com/ava-labs/precompile-evm/blob/main/compatibility.json).


:::note
Updates to AvalancheGo's RPC version are **not** tied to its semantic version scheme. Minor AvalancheGo
version bumps may include a breaking RPC version bump.
:::

## Fix for MacBook Air M1/M2: ‘Bad CPU type in executable’ Error

When running `avalanche subnet deploy` via the Avalanche-CLI, the terminal may throw an error that
contains the following: 

``` zsh
zsh: bad CPU type in executable:
/Users/user.name/Downloads/build/avalanchego
```

This is because some Macs lack support for x86 binaries. Running the following command should fix
this issue:

`/usr/sbin/softwareupdate --install-rosetta`


