---
tags: [Nodes]
description: Detailed instructions for running an Avalanche node with Latitude.sh
sidebar_label: Latitude
pagination_label: Run an Avalanche Node with Latitude.sh
sidebar_position: 3
---

# Run an Avalanche Node with Latitude.sh

## Introduction

This tutorial will guide you through setting up an Avalanche node on [Latitude.sh](https://latitude.sh).
Latitude.sh provides high-performance lighting-fast bare metal servers to ensure that your node is highly
secure, available, and accessible.

To get started, you'll need:

- A Latitude.sh account
- A terminal with which to SSH into your Latitude.sh machine

For the instructions on creating an account and server with Lattitude.sh, please reference their
[GitHub tutorial](https://github.com/NottherealIllest/Latitude.sh-post/blob/main/avalanhe/avax-copy.md)
, or visit [this page](https://www.latitude.sh/dashboard/signup) to sign up and create your first project.

This tutorial assumes your local machine has a Unix-style terminal. If you're on Windows, you'll have
to adapt some of the commands used here.

## Configuring Your Server

### Create a Latitude.sh Account

At this point your account has been verified, and you have created a new project and deployed the
server according to the instructions linked above.

### Access Your Server & Further Steps

All your Lattitude.sh credentials are available by clicking the `server` under your project, and can
be used to access your Latitude.sh machine from your local machine using a terminal.

:::note
You will need to install the `avalanche node installer script` directly in the server's terminal.
:::

After gaining access, we’ll need to set up our Avalanche node. To do this, follow the instructions
here to install and run your node [Set Up Avalanche Node With Installer](/nodes/run/with-installer).

Your AvalancheGo node should now be running and in the process of bootstrapping, which can take a few
hours. To check if it's done, you can issue an API call using `curl`.
The request is:

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.isBootstrapped",
    "params": {
        "chain":"X"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

Once the node is finished bootstrapping, the response will be:

```json
{
  "jsonrpc": "2.0",
  "result": {
    "isBootstrapped": true
  },
  "id": 1
}
```

You can continue on, even if AvalancheGo isn't done bootstrapping.
In order to make your node a validator, you'll need its node ID. To get it, run:

```sh
curl -X POST --data '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

The response contains the node ID.

```json
{
  "jsonrpc": "2.0",
  "result": { "nodeID": "KhDnAoZDW8iRJ3F26iQgK5xXVFMPcaYeu" },
  "id": 1
}
```

In the above example the node ID is `NodeID-KhDnAoZDW8iRJ3F26iQgK5xXVFMPcaYeu`.

AvalancheGo has other APIs, such as the [Health API](https://docs.avax.network/apis/avalanchego/apis/health),
that may be used to interact with the node. Some APIs are disabled by default. To enable such APIs,
modify the ExecStart section of `/etc/systemd/system/avalanchego.service` (created during the
installation process) to include flags that enable these endpoints. Don't manually enable any APIs
unless you have a reason to.

Exit out of the SSH server by running:

```sh
exit
```

### Upgrading Your Node

AvalancheGo is an ongoing project and there are regular version upgrades. Most upgrades are
recommended but not required. Advance notice will be given for upgrades that are not backwards
compatible. To update your node to the latest version, SSH into your server using a terminal and
run the installer script again.

```sh
./avalanchego-installer.sh
```

Your machine is now running the newest AvalancheGo version. To see the status of the AvalancheGo service,
run `sudo systemctl status avalanchego.`

## Wrap Up

That's it! You now have an AvalancheGo node running on a Latitude.sh machine. We recommend setting up
[node monitoring](https://docs.avax.network/nodes/maintain/setting-up-node-monitoring) for your
AvalancheGo node.
