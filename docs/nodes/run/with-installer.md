---
tags: [Nodes]
description: Detailed instructions for running an Avalanche node using the install script.
sidebar_label: Using the Install Script
pagination_label: Run an Avalanche Node Using the Install Script
sidebar_position: 1
---

# Run an Avalanche Node Using the Install Script

We have a shell (bash) script that installs AvalancheGo on your computer. This
script sets up full, running node in a matter of minutes with minimal user input
required. Script can also be used for unattended, [automated
installs](#unattended-installation).

## Before You Start

Avalanche is an incredibly lightweight protocol, so nodes can run on commodity
hardware with the following minimum specifications. 

- CPU: Equivalent of 8 AWS vCPU
- RAM: 16 GiB
- Storage: 1 TiB
- OS: Ubuntu 20.04 or MacOS &gt;= 12
- Network: sustained 5Mbps up/down bandwidth

:::caution

Using an HDD may result in poor and random 
read/write latencies, therefore reducing performance and reliability.

:::

:::note

HW requirements shall scale with the amount of AVAX staked on
the node and/or network activity. Nodes with big stakes (100k+ AVAX) will need more powerful machines
than listed, and will use more bandwidth as well.

:::

This install script assumes:

- AvalancheGo is not running and not already installed as a service
- User running the script has superuser privileges (can run `sudo`)

### Environment Considerations

If you run a different flavor of Linux, the script might not work as intended.
It assumes `systemd` is used to run system services. Other Linux flavors might
use something else, or might have files in different places than is assumed by
the script. It will probably work on any distribution that uses `systemd` but it
has been developed for and tested on Ubuntu.

If you have a node already running on the computer, stop it before running the
script. Script won't touch the node working directory so you won't need to
bootstrap the node again.

#### Node Running from Terminal

If your node is running in a terminal stop it by pressing `ctrl+C`.

#### Node Running as a Service

If your node is already running as a service, then you probably don't need this
script. You're good to go.

#### Node Running in the Background

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

#### Node Working Files

If you previously ran an AvalancheGo node on this computer, you will have local
node files stored in `$HOME/.avalanchego` directory. Those files will not be
disturbed, and node set up by the script will continue operation with the same
identity and state it had before. That being said, for your node's security,
back up `staker.crt` and `staker.key` files, found in
`$HOME/.avalanchego/staking` and store them somewhere secure. You can use those
files to recreate your node on a different computer if you ever need to. Check
out this [tutorial](/nodes/maintain/node-backup-and-restore.md) for backup and
restore procedure.

### Networking Considerations

To run successfully, AvalancheGo needs to accept connections from the Internet
on the network port `9651`. Before you proceed with the installation, you need
to determine the networking environment your node will run in.

#### Running on a Cloud Provider

If your node is running on a cloud provider computer instance, it will have a
static IP. Find out what that static IP is, or set it up if you didn't already.
The script will try to find out the IP by itself, but that might not work in all
environments, so you will need to check the IP or enter it yourself.

#### Running on a Home Connection

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

## Running the Script

So, now that you prepared your system and have the info ready, let's get to it.

To download and run the script, enter the following in the terminal:

```bash
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/avalanchego-installer.sh;\
chmod 755 avalanchego-installer.sh;\
./avalanchego-installer.sh
```

And we're off! The output should look something like this:

```text
AvalancheGo installer
---------------------
Preparing environment...
Found arm64 architecture...
Looking for the latest arm64 build...
Will attempt to download:
 https://github.com/ava-labs/avalanchego/releases/download/v1.1.1/avalanchego-linux-arm64-v1.1.1.tar.gz
avalanchego-linux-arm64-v1.1.1.tar.gz 100%[=========================================================================>]  29.83M  75.8MB/s    in 0.4s
2020-12-28 14:57:47 URL:https://github-production-release-asset-2e65be.s3.amazonaws.com/246387644/f4d27b00-4161-11eb-8fb2-156a992fd2c8?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20201228%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20201228T145747Z&X-Amz-Expires=300&X-Amz-Signature=ea838877f39ae940a37a076137c4c2689494c7e683cb95a5a4714c062e6ba018&X-Amz-SignedHeaders=host&actor_id=0&key_id=0&repo_id=246387644&response-content-disposition=attachment%3B%20filename%3Davalanchego-linux-arm64-v1.1.1.tar.gz&response-content-type=application%2Foctet-stream [31283052/31283052] -> "avalanchego-linux-arm64-v1.1.1.tar.gz" [1]
Unpacking node files...
avalanchego-v1.1.1/plugins/
avalanchego-v1.1.1/plugins/evm
avalanchego-v1.1.1/avalanchego
Node files unpacked into /home/ubuntu/avalanche-node
```

And then the script will prompt you for information about the network environment:

```text
To complete the setup some networking information is needed.
Where is the node installed:
1) residential network (dynamic IP)
2) cloud provider (static IP)
Enter your connection type [1,2]:
```

enter `1` if you have dynamic IP, and `2` if you have a static IP. If you are on
a static IP, it will try to auto-detect the IP and ask for confirmation.

```text
Detected '3.15.152.14' as your public IP. Is this correct? [y,n]:
```

Confirm with `y`, or `n` if the detected IP is wrong (or empty), and then enter
the correct IP at the next prompt.

Next, you have to set up RPC port access for your node. Those are used to query
the node for its internal state, to send commands to the node, or to interact
with the platform and its chains (sending transactions, for example). You will
be prompted:

```text
RPC port should be public (this is a public API node) or private (this is a validator)? [public, private]:
```

- `private`: this setting only allows RPC requests from the node machine itself.
- `public`: this setting exposes the RPC port to all network interfaces. 

As this is a sensitive setting you will be asked to confirm if choosing
`public`. Please read the following note carefully:

:::note

If you choose to allow RPC requests on any network interface you will need 
to set up a firewall to only let through RPC requests from known IP addresses, 
otherwise your node will be accessible to anyone and might be overwhelmed by 
RPC calls from malicious actors! If you do not plan to use your node to send 
RPC calls remotely, enter `private`.

:::

The script will then prompt you to choose whether to enable state sync setting
or not:

```text
Do you want state sync bootstrapping to be turned on or off? [on, off]:
```

Turning state sync on will greatly increase the speed of bootstrapping, but
will sync only the current network state. If you intend to use your node for
accessing historical data (archival node) you should select `off`. Otherwise,
select `on`. Validators can be bootstrapped with state sync turned on.

The script will then continue with system service creation and finish with
starting the service:

```text
Created symlink /etc/systemd/system/multi-user.target.wants/avalanchego.service → /etc/systemd/system/avalanchego.service.

Done!

Your node should now be bootstrapping.
Node configuration file is /home/ubuntu/.avalanchego/configs/node.json
C-Chain configuration file is /home/ubuntu/.avalanchego/configs/chains/C/config.json
Plugin directory, for storing subnet VM binaries, is /home/ubuntu/.avalanchego/plugins
To check that the service is running use the following command (q to exit):
sudo systemctl status avalanchego
To follow the log use (ctrl-c to stop):
sudo journalctl -u avalanchego -f

Reach us over on https://chat.avax.network if you're having problems.
```

The script is finished, and you should see the system prompt again.

## Post Installation

AvalancheGo should be running in the background as a service. You can check that it's running with:

```bash
sudo systemctl status avalanchego
```

This will print the node's latest logs, which should look like this:

```text
● avalanchego.service - AvalancheGo systemd service
Loaded: loaded (/etc/systemd/system/avalanchego.service; enabled; vendor preset: enabled)
Active: active (running) since Tue 2021-01-05 10:38:21 UTC; 51s ago
Main PID: 2142 (avalanchego)
Tasks: 8 (limit: 4495)
Memory: 223.0M
CGroup: /system.slice/avalanchego.service
└─2142 /home/ubuntu/avalanche-node/avalanchego --public-ip-resolution-service=opendns --http-host=

Jan 05 10:38:45 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:45] <P Chain> avalanchego/vms/platformvm/vm.go#322: initializing last accepted block as 2FUFPVPxbTpKNn39moGSzsmGroYES4NZRdw3mJgNvMkMiMHJ9e
Jan 05 10:38:45 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:45] <P Chain> avalanchego/snow/engine/snowman/transitive.go#58: initializing consensus engine
Jan 05 10:38:45 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:45] avalanchego/api/server.go#143: adding route /ext/bc/11111111111111111111111111111111LpoYY
Jan 05 10:38:45 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:45] avalanchego/api/server.go#88: HTTP API server listening on ":9650"
Jan 05 10:38:58 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:58] <P Chain> avalanchego/snow/engine/common/bootstrapper.go#185: Bootstrapping started syncing with 1 vertices in the accepted frontier
Jan 05 10:39:02 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:02] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: fetched 2500 blocks
Jan 05 10:39:04 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:04] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: fetched 5000 blocks
Jan 05 10:39:06 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:06] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: fetched 7500 blocks
Jan 05 10:39:09 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:09] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: fetched 10000 blocks
Jan 05 10:39:11 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:11] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: fetched 12500 blocks
```

Note the `active (running)` which indicates the service is running OK. You may
need to press `q` to return to the command prompt.

To find out your NodeID, which is used to identify your node to the network, run the following command:

```bash
sudo journalctl -u avalanchego | grep "NodeID"
```

It will produce output like:

```text
Jan 05 10:38:38 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:38] avalanchego/node/node.go#428: Set node's ID to 6seStrauyCnVV7NEVwRbfaT9B6EnXEzfY
```

Prepend `NodeID-` to the value to get, for example,
`NodeID-6seStrauyCnVV7NEVwRbfaT9B6EnXEzfY`. Store that; it will be needed for
staking or looking up your node.

Your node should be in the process of bootstrapping now. You can monitor the
progress by issuing the following command:

```bash
sudo journalctl -u avalanchego -f
```

Press `ctrl+C` when you wish to stop reading node output.

## Stopping the Node

To stop AvalancheGo, run:

```bash
sudo systemctl stop avalanchego
```

To start it again, run:

```bash
sudo systemctl start avalanchego
```

## Node Upgrade

AvalancheGo is an ongoing project and there are regular version upgrades. Most
upgrades are recommended but not required. Advance notice will be given for
upgrades that are not backwards compatible. When a new version of the node is
released, you will notice log lines like:

```text
Jan 08 10:26:45 ip-172-31-16-229 avalanchego[6335]: INFO [01-08|10:26:45] avalanchego/network/peer.go#526: beacon 9CkG9MBNavnw7EVSRsuFr7ws9gascDQy3 attempting to connect with newer version avalanche/1.1.1. You may want to update your client
```

It is recommended to always upgrade to the latest version, because new versions
bring bug fixes, new features and upgrades.

To upgrade your node, just run the installer script again:

```bash
./avalanchego-installer.sh
```

It will detect that you already have AvalancheGo installed:

```text
AvalancheGo installer
---------------------
Preparing environment...
Found 64bit Intel/AMD architecture...
Found AvalancheGo systemd service already installed, switching to upgrade mode.
Stopping service...
```

It will then upgrade your node to the latest version, and after it's done, start
the node back up, and print out the information about the latest version:

```text
Node upgraded, starting service...
New node version:
avalanche/1.1.1 [network=mainnet, database=v1.0.0, commit=f76f1fd5f99736cf468413bbac158d6626f712d2]
Done!
```

## Advanced Node Configuration

Without any additional arguments, the script installs the node in a most common
configuration. But the script also enables various advanced options to be
configured, via the command line prompts. Following is a list of advanced
options and their usage:

- `admin` - [Admin API](/reference/avalanchego/admin-api.md) will be enabled
- `archival` - disables database pruning and preserves the complete transaction history
- `state-sync` - if `on` state-sync for the C-Chain is used, if `off` it will
  use regular transaction replay to bootstrap; state-sync is much faster, but
  has no historical data
- `db-dir` - use to provide the full path to the location where the database
  will be stored
- `fuji` - node will connect to Fuji testnet instead of the Mainnet
- `index` - [Index API](/reference/avalanchego/index-api.md) will be
  enabled
- `ip` - use `dynamic`, `static` arguments, of enter a desired IP directly to be
  used as the public IP node will advertise to the network
- `rpc` - use `any` or `local` argument to select any or local network interface
  to be used to listen for RPC calls
- `version` - install a specific node version, instead of the latest. See
  [here](/nodes/run/with-installer.md#using-a-previous-version) for usage.

Please note that configuring `index` and `archival` options on an existing node
will require a fresh bootstrap to recreate the database.

Complete script usage can be displayed by entering:

```bash
./avalanchego-installer.sh --help
```

### Unattended Installation

If you want to use the script in an automated environment where you cannot enter
the data at the prompts you must provide at least the `rpc` and `ip` options.
For example:

```bash
./avalanchego-installer.sh --ip 1.2.3.4 --rpc local
```

### Usage Examples

To run a Fuji node with indexing enabled and autodetected static IP:

```bash
./avalanchego-installer.sh --fuji --ip static --index
```

To run an archival Mainnet node with dynamic IP and database located at `/home/node/db`:

```bash
./avalanchego-installer.sh --archival --ip dynamic --db-dir /home/node/db
```

To use C-Chain state-sync to quickly bootstrap a Mainnet node, with dynamic IP and local RPC only:

```bash
./avalanchego-installer.sh --state-sync on --ip dynamic --rpc local
```

To reinstall the node using node version 1.7.10 and use specific IP and local RPC only:

```bash
./avalanchego-installer.sh --reinstall --ip 1.2.3.4 --version v1.7.10 --rpc local
```

## Node Configuration

File that configures node operation is `~/.avalanchego/configs/node.json`. You
can edit it to add or change configuration options. The documentation of
configuration options can be found
[here](/nodes/configure/avalanchego-config-flags.md). Configuration may look like
this:

```json
{
  "public-ip-resolution-service": "opendns",
  "http-host": ""
}
```

Note that configuration file needs to be a properly formatted `JSON` file, so
switches are formatted differently than for command line, so don't enter options
like `--public-ip-resolution-service=opendns` but as in the example above.

Script also creates an empty C-Chain config file, located at
`~/.avalanchego/configs/chains/C/config.json`. By editing that file you can
configure the C-Chain, as described in detail
[here](/nodes/configure/chain-config-flags.md).

## Using a Previous Version

The installer script can also be used to install a version of AvalancheGo other than the latest version.

To see a list of available versions for installation, run:

```bash
./avalanchego-installer.sh --list
```

It will print out a list, something like:

```text
AvalancheGo installer
---------------------
Available versions:
v1.3.2
v1.3.1
v1.3.0
v1.2.4-arm-fix
v1.2.4
v1.2.3-signed
v1.2.3
v1.2.2
v1.2.1
v1.2.0
```

To install a specific version, run the script with `--version` followed by the
tag of the version. For example:

```bash
./avalanchego-installer.sh --version v1.3.1
```

:::danger

Note that not all AvalancheGo versions are compatible. You should generally run
the latest version. Running a version other than latest may lead to your node
not working properly and, for validators, not receiving a staking reward.

:::

Thanks to community member [Jean Zundel](https://github.com/jzu) for the
inspiration and help implementing support for installing non-latest node
versions.

## Reinstall and Script Update

Installer script gets updated from time to time, with new features and
capabilities added. To take advantage of new features or to recover from
modifications that made the node fail, you may want to reinstall the node. To do
that, fetch the latest version of the script from the web with:

```bash
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/avalanchego-installer.sh
```

After the script has updated, run it again with the `--reinstall` config flag:

```bash
./avalanchego-installer.sh --reinstall
```

This will delete the existing service file, and run the installer from scratch,
like it was started for the first time. Note that the database and NodeID will
be left intact.

## Removing the Node Installation

If you want to remove the node installation from the machine, you can run the
script with the `--remove` option, like this:

```bash
./avalanchego-installer.sh --remove
```

This will remove the service, service definition file and node binaries. It will
not remove the working directory, node ID definition or the node database. To
remove those as well, you can type:

```bash
rm -rf ~/.avalanchego/
```

Please note that this is irreversible and the database and node ID will be deleted!

## What Next?

That's it, you're running an AvalancheGo node! Congratulations! Let us know you
did it on our [Twitter](https://twitter.com/avalancheavax),
[Telegram](https://t.me/avalancheavax) or [Reddit](https://t.me/avalancheavax)!

If you're on a residential network (dynamic IP), don't forget to set up port
forwarding. If you're on a cloud service provider, you're good to go.

Now you can [interact with your
node](/reference/standards/guides/issuing-api-calls.md), [stake your
tokens](/nodes/validate/what-is-staking.md), or level up your installation by setting up
[node monitoring](/nodes/maintain/setting-up-node-monitoring.md) to get a better
insight into what your node is doing. Also, you might want to use our [Postman
Collection](/tooling/avalanchego-postman-collection.md) to more
easily issue commands to your node.

Finally, if you haven't already, it is a good idea to [back
up](/nodes/maintain/node-backup-and-restore.md) important files in case you ever
need to restore your node to a different machine.

If you have any questions, or need help, feel free to contact us on our
[Discord](https://chat.avalabs.org/) server.
