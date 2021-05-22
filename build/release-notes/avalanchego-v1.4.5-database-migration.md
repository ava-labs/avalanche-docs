# AvalancheGo v1.4.5: Database Migration

## Summary

* [AvalancheGo v1.4.5](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.5) brings significant database optimizations.
* It will temporarily double the amount of disk space used by AvalancheGo, and will temporarily increase usage of memory and CPU.
* Please read this entire document to make sure that your node successfully migrates and remains healthy during the migration. If it doesn’t answer your question, go to our [Discord](https://chat.avalabs.org/) server and post in the \#troubleshooting channel. Please read the pinned messages and search for your question before posting.

## Background

We are excited to announce the release of [v1.4.5 of AvalancheGo](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.5), which brings significant database optimizations and stability improvements to AvalancheGo.

In tests, we observed a ~90% reduction in read I/O on a Mainnet validator, as shown in the graph below:

![](../../.gitbook/assets/0%20%281%29.png)

The improvements are due to extensive refactoring of state management in the P-Chain, as well as other other database optimizations.

We anticipate that nodes upgraded to &gt;= v1.4.5 will consume less CPU and perform many fewer disk reads once the migration has been completed. These changes will also significantly improve P-Chain decision latency.

This upgrade also significantly shortens the amount of time it takes to bootstrap.

## The Upgrade Process

If you have an existing database on your computer, then when you run AvalancheGo v1.4.5, it will actually start 2 nodes. One will be running v1.4.4, which uses the “old” database version \(v1.0.0\). The other will be running v1.4.5, which uses the “new” database format \(v1.4.5\).

The v1.4.4 node will run as normal, and you will see its logs as before. The node will connect to the network using the same node ID as before and, if it is a validator, participate in consensus as before. In short, things should look the same as when running v1.4.4.

The v1.4.5 node will run in the background, and will bootstrap from the v1.4.4 node running on the same computer. This is faster and uses less bandwidth than the normal bootstrap procedure, which requires data to be sent over the internet. During the bootstrapping process, the v1.4.5 node will populate the “new” database.

When the v1.4.5 node is done bootstrapping, the v1.4.4 node will stop and the v1.4.5 node will restart. When the v1.4.5 node restarts, it will run normally, using the “new” database, and complete the migration. Your node will have the same node ID as before.

If you previously ran your node with flag `--plugin-dir`, you should remove that flag \(installer script does this, see the [note](avalanchego-v1.4.5-database-migration.md#note-for-the-nodes-installed-with-installer-script)\). If the main binary is in a different location than the rest of the files you have to add `--build-dir` flag. The value of this flag should be the path to the`build` directory created by running the build script, or the folder containing the binaries download from our Github. Specifically, the path specified by `--build-dir` should contain `avalanchego`, `avalanchego-latest`,  and`avalanchego-preupgrade`.

## Resource Usage

During the migration, when both nodes are running, AvalancheGo will consume more system resources than usual.

When the migration completes, there will be 2 bootstrapped databases on your computer. Make sure that the amount of free disk space on your computer exceeds the size of a fully bootstrapped database \(~38 GB\). We recommend that you dedicate at least 200 GB of disk space on your computer to AvalancheGo. While AvalancheGo currently uses only a fraction of that amount, we anticipate disk usage will rise before we implement a pruning solution.

Memory and CPU usage will also be elevated while both nodes are running. We anticipate that any computer with CPU &gt;= 2GHz and &gt;= 6 GB of RAM available for AvalancheGo will not have any issues. That said, you should monitor your node especially closely for the first few days to ensure that it is healthy.

See [FAQ](https://app.gitbook.com/@avalanche/s/avalanche/build/release-notes/avalanchego-v1.4.5-database-migration#faq) for how to check that your computer has adequate disk space, and what to do if your computer has specs lower than the recommended specs.

## How to Upgrade

From the user perspective, the upgrade process for AvalancheGo v1.4.5 is almost the same as any other upgrade. If you build from source, run the build script as before. If you use the pre-compiled binaries, invoke them as before. If you use the installer script, use that as before.

Once you start AvalancheGo v1.4.5, you should not need to do anything else, as usual.

More information on updating a node can be found [here](https://docs.avax.network/build/tutorials/nodes-and-staking/upgrade-your-avalanchego-node).

## Backups

Your staking key/certificate are not in the database, and **should not be affected at all** by the database migration. Even so, it is good practice to [have a backup](https://docs.avax.network/build/tutorials/nodes-and-staking/node-backup-and-restore) of your staking key/certificate.

You should also back up information in your node’s keystore, such as private keys.

## FAQ

### Why does \[explorer\] say my node is still on v1.4.4?

During the migration, a v1.4.4 node will be running on your computer, as explained above. Other nodes on the network will see yours as running v1.4.4 until the migration is complete.

### Is the database migration mandatory?

Yes. Every future AvalancheGo will use the new database version \(v1.4.5\), so you will eventually have to migrate your database to that version. However, it is not urgent that you upgrade to AvalancheGo v1.4.5 _right away_ \(i.e. you do not have to upgrade as soon as possible\). Nodes running AvalancheGo &gt;= v.1.4.0 will continue to operate normally.

### Can I upgrade to AvalancheGo 1.4.5 from a version other than v1.4.4?

Yes, it should work from any version &lt; 1.4.5. 

### What if my computer can’t run 2 nodes at once?

If your computer \(computer 1\) has less than 6 GB of RAM, it may not be able to run the migration because it doesn’t have enough memory to run 2 nodes at once. As a reminder, we advise that your node has at least 6 GB of RAM.

If you are unable to run the migration and you want to minimize the amount of time your node is offline, you can do the following:

* On another computer \(computer 2\), run AvalancheGo v1.4.5, wait until it bootstraps, then stop AvalancheGo .
* On computer 1, stop AvalancheGo. Move the database directory _`$HOME/.avalanchego/db/`_ from computer 2 \(which has just bootstrapped database version v1.4.5\) to the same location on computer 1. Then upgrade to AvalancheGo v1.4.5 and run it.

Note that **this is not the advised approach,** and you should only do it if your node has less than 6 GB of RAM or insufficient disk space. Again, we advise that your node has at least 6 GB of RAM and at least 200 GB of disk space. Note that this approach does not migrate keystore or validator uptime data.

### How much disk space do I need?

We recommend that you dedicate at least 200 GB of disk space on your computer to AvalancheGo. While AvalancheGo currently uses only a fraction of that amount \(~38 GB\), we anticipate disk usage will rise before we implement a pruning solution.

### How much disk space is available right now?

To see the amount of available disk space in your database directory on Mac OS or Linux, do:

_`df -h $HOME/.avalanchego/db`_

This output, for example, says that 609 GB of disk space is available:

_`Filesystem Size Used Avail Use% Mounted on`_

_`/dev/nvme0n1p2 916G 261G 609G 30% /`_

### How long will it take for the new database to bootstrap?

It can take around 30 hours. However, it may take more or less time depending on your computer.

### How do I know that the database migration has completed?

When _`“starting to run node in normal execution mode”`_ is printed, then the new database has been bootstrapped, and the node has restarted.

When _`“finished migrating keystore from database version v1.0.0 to v1.4.5”`_ is printed, then the keystore data is finished migrating.

When _`“finished migrating platform vm from database version v1.0.0 to v1.4.5”`_ is printed, then validator uptimes are finished migrating.

### Can I delete the old database?

Once the new database version is bootstrapped, the v1.4.5 node restarts and completes the database migration. After this has happened, you may delete the old database directory, which by default is at:

_`$HOME/.avalanchego/db/mainnet/v1.0.0`_

It is not necessary for you to delete the old database \(v1.0.0\).

### Will this migration change anything in the old database?

No**.** The old database \(v1.0.0\) will be unchanged.

**However, you should never modify the database while the node is running.**

To be clear, if you want to delete the old database after the new database bootstraps:

* Run v1.4.5 until the new database bootstraps and the node restarts
* Stop the node
* Delete the v1.0.0 subdirectory of the database \(and only that subdirectory!\)
* Start the node

**You should also verify that your keystore data has been successfully migrated before deleting the old database.**

### Will validator uptimes and keystore data be migrated?

Yes, but as a precaution you should [back up](https://docs.avax.network/build/tutorials/nodes-and-staking/node-backup-and-restore) your staking key/certificate and your keystore data before running AvalancheGo v1.4.5.

### How can I see the logs for the v1.4.5 node in the background?

By default, these logs are in _`$HOME/.avalanchego/logs/fetch-only`_.

### What should I do if my computer doesn’t have enough disk space?

If your node does not run on the cloud, you should [back up your node’s data](https://docs.avax.network/build/tutorials/nodes-and-staking/node-backup-and-restore), move it to a machine with more disk space, and run AvalancheGo on that machine.

If your node runs on the cloud, get instructions for increasing the amount of available disk space from your cloud provider. See their documentation.

### If something goes wrong, how can I go back to the previous version?

See [here](https://docs.avax.network/build/tutorials/nodes-and-staking/set-up-node-with-installer#using-a-previous-version). This migration does not modify any data in the existing database. The new database is created alongside it. If you encounter an issue and downgrade from AvalancheGo v1.4.5 to v1.4.4, you should have no issues downgrading since the existing database is unchanged. \(This assumes you have not deleted the existing database\).

### Will updating decrease my validator’s uptime?

If you follow the instructions in this document, no. Your node will continue to participate in consensus while the new database bootstraps in the background. If you re-bootstrap your validator from an empty database, it will be marked as offline while it bootstraps because it will be unresponsive to queries. Therefore, you should not re-bootstrap from an empty database if you can avoid it.

### Should I just re-bootstrap from scratch?

Probably not. If your node is a validator, this will cause its uptime to decrease. \(See the above answer\). If your node is not a validator, but it has already bootstrapped, it will be faster to migrate your database than to re-bootstrap from an empty database. In either case, you are better off running the migration as explained above rather than just deleting your existing v1.0.0 database.

### **My node shut off during the migration / bootstrapping. What do I do?**

Just restart your node. The migration will pick up where it left off. We highly recommend that you set up AvalancheGo to run as a service so that it will restart automatically upon shutdown. 

### I think something is wrong. What do I do?

First, **make sure that you’ve read this document thoroughly**. It might answer your question somewhere. If you don’t see the answer, go to our [Discord](https://chat.avalabs.org/) server and search for your question. If it has not already been asked, post in the \#troubleshooting channel.

### I use Ortelius, how do I upgrade it?

If you are using Ortelius, follow these steps to upgrade it:

* Keep your old Ortelius instance running.
* Install a new Ortelius instance running the latest version on a different computer.
* After the new Ortelius instance has finished bootstrapping, switch to the new instance.
* Shut down the old Ortelius instance.

Instructions for deploying Ortelius can be found at [https://github.com/ava-labs/ortelius/blob/master/docs/deployment.md](https://github.com/ava-labs/ortelius/blob/master/docs/deployment.md)

One change in this Ortelius release is that Ortelius will now use the node’s built-in indexer. This improves stability and ensures that Ortelius has no missing transactions, even if it is restarted.

### Note for the nodes installed with installer script

If your node was installed with the [installer script](https://docs.avax.network/build/tutorials/nodes-and-staking/set-up-node-with-installer), you need to fix the service definition file after upgrading to 1.4.5. In the console, enter the command:  
`sudo nano /etc/systemd/system/avalanchego.service`  
In the editor, locate the line that begins with `ExecStart=` and on it delete the following part: `--plugin-dir=/home/ubuntu/avalanche-node/plugins`, then save the changes by pressing `ctrl-x` and `y`. To apply the changes enter the command:   
`sudo systemctl daemon-reload`  
and finally, restart the node with:  
`sudo systemctl restart avalanchego`

