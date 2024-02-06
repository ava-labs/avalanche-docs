---
tags: [Nodes]
description: In this tutorial, you'll learn how to prepare your environment for AvalancheGo installation and configure your network settings.
sidebar_label: Preparing Your Environment
sidebar_position: 0
---

# Run an Avalanche Node Using the Install Script

We have a shell (bash) script that installs AvalancheGo on your computer. This
script sets up full, running node in a matter of minutes with minimal user input
required. Script can also be used for unattended, automated installs.

## System Requirements

Avalanche is an incredibly lightweight protocol, so nodes can run on commodity
hardware with the following minimum specifications. 

- CPU: Equivalent of 8 AWS vCPU
- RAM: 16 GiB
- Storage: 1 TiB
- OS: Ubuntu 20.04 or MacOS &gt;= 12
- Network: sustained 5Mbps up/down bandwidth

:::caution

Using an HDD may result in poor and random read/write latencies,
therefore reducing performance and reliability.

:::

:::note

Hardware requirements shall scale with the amount of AVAX staked on
the node and/or network activity. Nodes with big stakes (100k+ AVAX) will need
more powerful machines than listed, and will use more bandwidth as well.

:::

This install script assumes:

- AvalancheGo is not running and not already installed as a service
- User running the script has superuser privileges (can run `sudo`)

## Environment Considerations

If you run a different flavor of Linux, the script might not work as intended.
It assumes `systemd` is used to run system services. Other Linux flavors might
use something else, or might have files in different places than is assumed by
the script. It will probably work on any distribution that uses `systemd` but it
has been developed for and tested on Ubuntu.

If you have a node already running on the computer, stop it before running the
script. Script won't touch the node working directory so you won't need to
bootstrap the node again.

### Node Running from Terminal

If your node is running in a terminal stop it by pressing `ctrl+C`.

### Node Running as a Service

If your node is already running as a service, then you probably don't need this
script. You're good to go.

### Node Running in the Background

If your node is running in the background (by running with `nohup`, for example)
then find the process running the node by running `ps aux | grep avalanche`.
This will produce output like:

```text
ubuntu  6834  0.0  0.0   2828   676 pts/1    S+   19:54   0:00 grep avalanche
ubuntu  2630 26.1  9.4 2459236 753316 ?      Sl   Dec02 1220:52 /home/ubuntu/build/avalanchego
```

Look for line that doesn't have `grep` on it. In this example, that is the
second line. It shows information about your node. Note the process id, in this
case, `2630`. Stop the node by running `kill -2 2630`.

### Node Working Files

If you previously ran an AvalancheGo node on this computer, you will have local
node files stored in `$HOME/.avalanchego` directory. Those files will not be
disturbed, and node set up by the script will continue operation with the same
identity and state it had before. That being said, for your node's security,
back up `staker.crt` and `staker.key` files, found in
`$HOME/.avalanchego/staking` and store them somewhere secure. You can use those
files to recreate your node on a different computer if you ever need to. Check
out this [tutorial](/nodes/maintain/node-backup-and-restore.md) for backup and
restore procedure.

## Networking Considerations

To run successfully, AvalancheGo needs to accept connections from the Internet
on the network port `9651`. Before you proceed with the installation, you need
to determine the networking environment your node will run in.

### Running on a Cloud Provider

If your node is running on a cloud provider computer instance, it will have a
static IP. Find out what that static IP is, or set it up if you didn't already.
The script will try to find out the IP by itself, but that might not work in all
environments, so you will need to check the IP or enter it yourself.

### Running on a Home Connection

If you're running a node on a computer that is on a residential internet
connection, you have a dynamic IP; that is, your IP will change periodically.
The install script will configure the node appropriately for that situation.
But, for a home connection, you will need to set up inbound port forwarding of
port `9651` from the internet to the computer the node is installed on.

As there are too many models and router configurations, we cannot provide
instructions on what exactly to do, but there are online guides to be found
(like
[this](https://www.noip.com/support/knowledgebase/general-port-forwarding-guide/),
or [this](https://www.howtogeek.com/66214/how-to-forward-ports-on-your-router/)
), and your service provider support might help too.

:::warning

Please note that a fully connected Avalanche node maintains and communicates
over a couple of thousand of live TCP connections. For some low-powered and
older home routers that might be too much to handle. If that is the case you may
experience lagging on other computers connected to the same router, node getting
benched, failing to sync and similar issues.

:::
