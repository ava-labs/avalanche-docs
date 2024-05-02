---
tags: [Tooling, Avalanche-CLI]
description: This page provides instructions for halting cloud server nodes established by Avalanche-CLI.
pagination_label: Terminate Nodes Originally Created with Avalanche-CLI
sidebar_label: Terminate All Nodes
sidebar_position: 8
---
# Terminate Nodes Created By Avalanche-CLI

This page provides instructions for terminating cloud server nodes created by Avalanche-CLI.

:::warning

ALPHA WARNING: This command is currently in experimental mode. Proceed at your own risk.

:::

## Terminating All Nodes

To terminate all nodes in a cluster, run:

```shell
avalanche node destroy <clusterName>
```

:::warning

ALPHA WARNING: This command will delete all files associated with the cloud servers in the cluster. 
This includes the downloaded `staker.crt` and `staker.key` files in your local `.avalanche-cli` 
directory (which are used to back up your node). More info about node backup can be found [here](/nodes/maintain/node-backup-and-restore.md).

:::

Once completed, the instance set up on AWS / GCP would have been terminated and any Static Public 
IP associated with it would have been released.
