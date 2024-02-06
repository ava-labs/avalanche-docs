---
tags: [Nodes]
description: In this tutorial, you'll learn about advanced Avalanche node configuration options and maintenance tasks.
sidebar_label: Node Config and Maintenance
sidebar_position: 3
---

# Node Configuration and Maintenance

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
  [here](#using-a-previous-version) for usage.

:::note
Configuring the `index` and `archival` options on an existing node
will require a fresh bootstrap to recreate the database.
:::

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

- To run a Fuji node with indexing enabled and autodetected static IP:

  ```bash
  ./avalanchego-installer.sh --fuji --ip static --index
  ```

- To run an archival Mainnet node with dynamic IP and database located at `/home/node/db`:

  ```bash
  ./avalanchego-installer.sh --archival --ip dynamic --db-dir /home/node/db
  ```

- To use C-Chain state-sync to quickly bootstrap a Mainnet node, with dynamic IP and local RPC only:

  ```bash
  ./avalanchego-installer.sh --state-sync on --ip dynamic --rpc local
  ```

- To reinstall the node using node version 1.7.10 and use specific IP and local RPC only:

  ```bash
  ./avalanchego-installer.sh --reinstall --ip 1.2.3.4 --version v1.7.10 --rpc local
  ```

## Node Configuration

The file that configures node operation is `~/.avalanchego/configs/node.json`. You
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

Note that the configuration file needs to be a properly formatted `JSON` file, so
switches should formatted differently than they would be for the command line.
Therefore, don't enter options like `--public-ip-resolution-service=opendns` as shown
in the example above.

The script also creates an empty C-Chain config file, located at
`~/.avalanchego/configs/chains/C/config.json`. By editing that file, you can
configure the C-Chain, as described in detail
[here](/nodes/configure/chain-config-flags.md).

## Using a Previous Version

The installer script can also be used to install a version of AvalancheGo other than the latest
version.

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

The installer script gets updated from time to time, with new features and
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

:::warning
Please note that this is irreversible and the database and node ID will be deleted!
:::

## What Next?

That's it, you're running an AvalancheGo node! Congratulations! Let us know you
did it on our [Twitter](https://twitter.com/avalancheavax),
[Telegram](https://t.me/avalancheavax) or [Reddit](https://t.me/avalancheavax)!

If you're on a residential network (dynamic IP), don't forget to set up port
forwarding. If you're on a cloud service provider, you're good to go.

Now you can [interact with your node](/reference/standards/guides/issuing-api-calls.md),
[stake your tokens](/nodes/validate/what-is-staking.md), or level up your installation by setting up
[node monitoring](/nodes/maintain/setting-up-node-monitoring.md) to get a better
insight into what your node is doing. Also, you might want to use our [Postman Collection](/tooling/avalanchego-postman-collection/setup.md) to more
easily issue commands to your node.

Finally, if you haven't already, it is a good idea to
[back up](/nodes/maintain/node-backup-and-restore.md) important files in case you ever
need to restore your node to a different machine.

If you have any questions, or need help, feel free to contact us on our
[Discord](https://chat.avalabs.org/) server.
