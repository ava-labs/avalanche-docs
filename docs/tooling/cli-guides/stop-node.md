# Stop cloud server nodes

This page will guide you to stop a cloud server node set up by Avalanche-CLI

:::warning

ALPHA WARNING: This command is currently in experimental mode. Proceed at your own risk.

:::

## Stopping a node

To stop all nodes in a cluster, run:

```shell
avalanche node stop <clusterName>
```

:::warning

ALPHA WARNING: This command will delete all files associated with the cloud servers in the cluster. 
This includes the downloaded `staker.crt` and `staker.key` files in your local `.avalanche-cli` 
directory (which are used to back up your node). More info about node backup can be found [here](/nodes/maintain/node-backup-and-restore.md)

:::


:::note

Please note that a stopped on AWS can still incur cost (such as storage fees).

Ava Labs is not responsible for the cost incurred from stopping Avalanche node through
Avalanche-CLI

:::

Once completed, the EC2 instance set up on AWS would have stopped and the Elastic IP associated 
with it would also have been released.
