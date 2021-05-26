# AvalancheGo v1.4.5: Database Migration

## Summary

* [AvalancheGo v1.4.5](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.5) brings significant database optimizations.
* It will temporarily double the amount of disk space used by AvalancheGo, and will temporarily increase usage of memory and CPU.
* Please read this entire document to make sure that your node successfully migrates and remains healthy during the migration. If it doesn’t answer your question, go to our [Discord](https://chat.avalabs.org/) server and post in the \#troubleshooting channel. Please read the pinned messages and search for your question before posting.
* This article explains how to upgrade a node running AvalancheGo &lt; v1.4.5 to AvalancheGo &gt;= 1.4.5.

## Background

We are excited to announce the release of [v1.4.5 of AvalancheGo](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.5), which brings significant database optimizations and stability improvements to AvalancheGo.

In tests, we observed a ~90% reduction in read I/O on a Mainnet validator, as shown in the graph below:

![](../../.gitbook/assets/0%20%281%29%20%282%29%20%281%29.png)

The improvements are due to extensive refactoring of state management in the P-Chain, as well as other other database optimizations.

We anticipate that nodes upgraded to &gt;= v1.4.5 will consume less CPU and perform many fewer disk reads once the migration has been completed. These changes will also significantly improve P-Chain decision latency.

This upgrade also significantly shortens the amount of time it takes to bootstrap.

This article is applicable when you're upgrading your node from AvalancheGo &lt; v1.4.5 to AvalancheGo &gt;= v1.4.5. Although this article is written for v1.4.5 and references that version below, for example, it still applies if you're upgrading from AvalancheGo v1.4.4 to AvalancheGo v1.4.6. When reading this document, replace v1.4.5 with the version you are updating to \(except in reference to the database subdirectory v1.4.5, which will not change.\)

## The Upgrade Process

If you have an existing database on your computer, then when you run AvalancheGo v1.4.5, it will actually start 2 nodes. One will be running v1.4.4, which uses the “old” database version \(v1.0.0\). The other will be running v1.4.5, which uses the “new” database format \(v1.4.5\).

The v1.4.4 node will run as normal, and you will see its logs as before. The node will connect to the network using the same node ID as before and, if it is a validator, participate in consensus as before. In short, things should look the same as when running v1.4.4.

The v1.4.5 node will run in the background, and will bootstrap from the v1.4.4 node running on the same computer. This is faster and uses less bandwidth than the normal bootstrap procedure, which requires data to be sent over the internet. During the bootstrapping process, the v1.4.5 node will populate the “new” database.

When the v1.4.5 node is done bootstrapping, the v1.4.4 node will stop and the v1.4.5 node will restart. When the v1.4.5 node restarts, it will run normally, using the “new” database, and complete the migration. Your node will have the same node ID as before.

You should not provide the flag`--plugin-dir`. If you used the installer script to install AvalancheGo, you need to remove this flag from your AvalancheGo service file. See this [note](avalanchego-v1.4.5-database-migration.md#note-for-the-nodes-installed-with-installer-script).

## Resource Usage

During the migration, when both nodes are running, AvalancheGo will consume more system resources than usual.

When the migration completes, there will be 2 bootstrapped databases on your computer. Make sure that the amount of free disk space on your computer exceeds the size of a fully bootstrapped database \(~38 GB\). We recommend that you dedicate at least 200 GB of disk space on your computer to AvalancheGo. While AvalancheGo currently uses only a fraction of that amount, we anticipate disk usage will rise before we implement a pruning solution.

Memory and CPU usage will also be elevated while both nodes are running. We anticipate that any computer with CPU &gt;= 2GHz and &gt;= 6 GB of RAM available for AvalancheGo will not have any issues. That said, you should monitor your node especially closely for the first few days to ensure that it is healthy.

See [FAQ](https://app.gitbook.com/@avalanche/s/avalanche/build/release-notes/avalanchego-v1.4.5-database-migration#faq) for how to check that your computer has adequate disk space, and what to do if your computer has specs lower than the recommended ones.

## Step-by-Step Upgrade Instructions

### Verify

Verify that your computer meets the following requirements:

* CPU &gt;= 2GHz 
* RAM &gt;= 6 GB
* Hard drive: you should have at least 1.3 times of the disk space currently occupied by _`$HOME/.avalanchego/db/mainnet/v1.0.0`_, which is around 38GB. This means that you should have about 50 GB free space. Otherwise, the program will not be able to proceed to upgrade the database. We recommend that you dedicate at least 200 GB of disk space on your computer to AvalancheGo. To check how much space you have, see [How much disk space is available right now](https://docs.avax.network/build/release-notes/avalanchego-v1.4.5-database-migration#how-much-disk-space-is-available-right-now)
* To remedy, see following
  * [What should I do if my computer doesn’t have enough disk space?](https://docs.avax.network/build/release-notes/avalanchego-v1.4.5-database-migration#what-should-i-do-if-my-computer-doesnt-have-enough-disk-space)
  * [What if my computer can’t run 2 nodes at once?](https://docs.avax.network/build/release-notes/avalanchego-v1.4.5-database-migration#what-if-my-computer-cant-run-2-nodes-at-once)

### Backup 

Backup your node’s data by following [this](https://docs.avax.network/build/tutorials/nodes-and-staking/node-backup-and-restore).

Your staking key/certificate are not in the database, and **should not be affected at all** by the database migration. Even so, it is good practice to [have a backup](https://docs.avax.network/build/tutorials/nodes-and-staking/node-backup-and-restore) of your staking key/certificate.

### Download 

New version can be downloaded with **one** of the following approaches depending on your practices: 

* With [Installer Scripts](https://docs.avax.network/build/tutorials/nodes-and-staking/set-up-node-with-installer#node-upgrade), run _`./avalanchego-installer.sh`_
* With binary download, see [here](https://docs.avax.network/build/tutorials/nodes-and-staking/run-avalanche-node#binary)
* With building from source code, see [here](https://docs.avax.network/build/tutorials/nodes-and-staking/run-avalanche-node#source-code)

### Execute

To start the new version

* If you run AvalancheGo as a service, which we highly recommend, verify that the _`--plugin-dir`_ flag is not present in the _`avalanchego.service`_ file. If it is not present, you can skip the following paragraph. If it is present, follow the instructions below to remove it.

  In the console, enter the command: _`sudo nano /etc/systemd/system/avalanchego.service`_  
  In the editor, locate the line that begins with _`ExecStart=`_ and on it delete the following part: _`--plugin-dir=/home/ubuntu/avalanche-node/plugins`_ Then save the changes by pressing ctrl-x and y.

  To apply the changes, run the command:  
  _`sudo systemctl daemon-reload`_  
  Finally, restart the node with:  
  _`sudo systemctl restart avalanchego`_

* With binary download or building from source code, see [here](https://docs.avax.network/build/tutorials/nodes-and-staking/run-avalanche-node#start-a-node-and-connect-to-avalanche)

### Monitor

Monitor and make sure that migration completes successfully:

* You can check progress by doing the following:
  * Check your disk space usage using command 

    _`du -h $HOME/.avalanchego/db/mainnet`_

    which should produce results showing the size of both databases under v1.0.0 and v1.4.5, respectively. 

  * Logs for the node populating the new database can be found under _`$HOME/.avalanchego/logs/fetch-only`_
  * These messages indicate the completion of the database migration:
    * When _`“starting to run node in normal execution mode”`_ is printed, then the new **database** has been bootstrapped, and the node has restarted.
    * When _`“finished migrating keystore from database version v1.0.0 to v1.4.5”`_ is printed, then the **keystore** data is finished migrating.
    * When _`“finished migrating platform vm from database version v1.0.0 to v1.4.5”`_ is printed, then validator **uptimes** are finished migrating.
* Depending on your computer, the upgrade process could take a significant amount of time. Some validators have reported 30+ hours with less powerful computers. It mainly depends on the type of storage on the computer. If the storage is SSD-based it should complete in 12 hours or less. On HDD-based systems it can take a couple of days \(migration is almost exclusively random reads/writes and HDDs are pretty slow on those types of workloads\). However, your node will continue to work during the migration without downtime.
* You can verify your node’s version by issuing `info.getNodeVersion` API \(see tutorial on [Postman](https://docs.avax.network/build/tools/postman-avalanche-collection)\)  and you should get the response as follows, where the version number should be &gt;=1.4.6 depending which version you are updating to, after the completion of migration.

  ```javascript
    {
    "jsonrpc": "2.0",
    "result": {
        "version": "avalanche/1.4.6"
    },
    "id": 1
    }
  ```

More information on updating a node can be found [here](https://docs.avax.network/build/tutorials/nodes-and-staking/upgrade-your-avalanchego-node).

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

When _`“finished migrating platformvm from database version v1.0.0 to v1.4.5”`_ is printed, then validator uptimes are finished migrating.

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

If your node was installed with the [installer script](https://docs.avax.network/build/tutorials/nodes-and-staking/set-up-node-with-installer), you need to fix the service definition file after upgrading to 1.4.5. In the console, enter the command:_`sudo nano /etc/systemd/system/avalanchego.service`_  
In the editor, locate the line that begins with _`ExecStart=`_ and on it delete the following part: _`--plugin-dir=/home/ubuntu/avalanche-node/plugins`_ Then save the changes by pressing ctrl-x and y.

To apply the changes run the command:  
_`sudo systemctl daemon-reload`_  
Finally, restart the node with:  
_`sudo systemctl restart avalanchego`_

