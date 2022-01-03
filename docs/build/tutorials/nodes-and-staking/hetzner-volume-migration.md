---
sidebar_position: 12
---

# Hetzner Volume Migration

[Hetzner](https://www.hetzner.com/) is a cloud provider which can be used to run an Avalanche node. However, it does not provide for local storage expansion (local storage comes with an instance when created). There are two ways to migrate the database: one is to attach a Cloud Volume to an existing instance and move the extra files there; the other is to migrate to another machine using database backup and restore.

## Attach a Cloud Volume

On Hetzner's instance dashboard:

![instance dashboard](/img/Hetzner-instance.png)

select volumes from the left option list, press ‘create volume’:

![volume](/img/Hetzner-volume.png)

Select the size and leave default mount and file system selections:

![volume](/img/Hetzner-create-volume.png)


Press `Create and Buy now`. This will create, format and mount a new volume onto the instance. We can now move the database files there.


Log into the instance.
(note: document assumes the default Hetzner Ubuntu config, which defaults to root user being logged in, so sudo is omitted, and /root assumed as homedir)

Stop the AvalancheGo node with:
```
systemctl stop avalanchego
```

The volume will be mounted as something like `/mnt/HC_Volume_15890160`. Find out the exact volume name by using the `df` command.

Then, we need to copy the old database to to the new volume:
```
cp -r  ~/.avalanchego/db /mnt/HC_Volume_15890160/db/
```

This might take a while. When that is done, we move the old database to the temporary directory:
```
mv ~/.avalanchego/db ~/db_old
```
We can later delete `~/db_old` to reclaim space if everything works ok.

Then we link the database from the new, large volume to the same place where the database was:
```
ln -s /mnt/HC_Volume_15890160/db ~/.avalanchego/db
```

Now we can start the node back up:
```
systemctl start avalanchego
```

Node should now be running from the database on the large volume. To check that everything is in order and that node is not bootstrapping from scratch (which would indicate a problem), use:
```
journalctl -u avalanchego -f
```

Node should be catching up to the network and fetching a small number of blocks before resuming normal operation.

## Database Backup and Restore

Another way is to back up the database and restore it on another machine. Detailed steps can be found [here.](./node-backup-and-restore.md#database)

