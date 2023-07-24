---
tags: [Build, Subnets]
description: This how-to guide explains how to upgrade a deployed Subnet's Virtual Machine.
sidebar_label: Subnet Virtual Machine 
pagination_label: Upgrade a Subnet's Virtual Machine
sidebar_position: 2
---

# How to Upgrade a Subnet's Virtual Machine

This how-to guide explains how to upgrade an already-deployed Subnet.

## Upgrading a Local VM

To upgrade a local Subnet, you first need to pause the local network. To do so, run

```shell
avalanche network stop
```

Next, you need to select the new VM to run your Subnet on. If you're running a Subnet-EVM Subnet,
you likely want to bump to the latest released version. If you're running a Custom VM, you'll want
to choose another custom binary.

Start the upgrade wizard with

```shell
avalanche subnet upgrade vm <subnetName>
```

where you replace `<subnetName>` with the name of the Subnet you'd like to upgrade.

### Selecting a VM Deployment to Upgrade

After starting the Subnet Upgrade Wizard, you should see something like this:

```text
? What deployment would you like to upgrade:
  ▸ Update config for future deployments
    Existing local deployment
```

If you select the first option, Avalanche-CLI updates your Subnet's config and any future calls to
`avalanche subnet deploy` use the new version you select. However, any existing local deployments
continue to use the old version.

If you select the second option, the opposite occurs. The existing local deployment switches
to the new VM but subsequent deploys use the original.

### Select a VM to Upgrade To

The next option asks you to select your new virtual machine.

```text
? How would you like to update your subnet's virtual machine:
  ▸ Update to latest version
    Update to a specific version
    Update to a custom binary
```

If you're using the Subnet-EVM, you'll have the option to upgrade to the latest released
version. You can also select a specific version or supply a custom binary. If your Subnet already
uses a custom VM, you need to select another custom binary.

Once you select your VM, you should see something like:

```text
Upgrade complete. Ready to restart the network.
```

### Restart the Network

:::note

If you are running multiple Subnets concurrently, you may need to update multiple Subnets to restart
the network. All of your deployed must be using the same RPC Protocol version. You can see more
details about this [here](/build/subnet/info/troubleshoot-subnet.md#incompatible-rpc-version-for-custom-vm).

:::

Finally, restart the network with

```shell
avalanche network start
```

If the network starts correctly, your Subnet is now running the upgraded VM.

