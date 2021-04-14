# Node backup and restore

Once you have your node up and running, it's time to prepare for disaster recovery. Should your machine ever have a catastrophic failure due to either hardware or software issues, or even a case of natural disaster, it's best to be prepared for such a situation by making a backup.

When running, a complete node installation along with the database can grow to be multiple gigabytes in size. Having to back up and restore such a large volume of data can be expensive, complicated and time-consuming. Luckily, there is a better way.

Instead of having to back up and restore everything, we need to back up only what is essential, that is, those files that cannot be reconstructed because they are unique to your node. For Avalanchego node, unique files are those that identify your node on the network, in other words, files that define your NodeID. The installation itself can be easily recreated by installing the node on a new machine, and all the remaining gigabytes of blockchain data can be easily recreated by the process of bootstrapping, which copies the data over from other network peers.

Even if your node is a validator on the network and has multiple delegations on it, you don't need to worry about backing up anything else, because the validation and delegation transactions are also stored on the blockchain and will be restored during bootstrapping, along with the rest of the blockchain data.

## NodeID

NodeID is a unique identifier that differentiates your node from all the other peers on the network. It's a string formatted like `NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD`. You can look up the technical background of how the NodeID is constructed [here](../../references/cryptographic-primitives.md#tls-addresses). In essence, NodeID is defined by two files:
* `staker.crt`
* `staker.key`

In the default installation, they can be found in the working directory, specifically in `~/.avalanchego/staking/`. All the we need to do to recreate the node on another machine is to run a new installation with those same two files.

{% hint style="warning" %} If you have users defined in the keystore of your node, then you need to back up and restore those as well. [Keystore API](../../avalanchego-apis/keystore-api.md) has methods that can be used to export and import user keys. Note that Keystore API is used by developers only and not intended for use in production nodes. If you don't know what a keystore API is and have not used it, you don't need to worry about it. {% endhint %}

## Backup

To back up your node, we need to store `staker.crt` and `staker.key` files somewhere safe and private, preferably to a different computer, to your private storage in the cloud, a USB stick or similar. Storing them to a couple of different, secure locations increases the safety.

{% hint style="warning" %} If someone gets a hold of your staker files, they still cannot get to your funds, as they are controlled by the wallet private keys, not by the node. But, they could re-create your node somewhere else, and depending on the circumstances make you lose the staking rewards. So make sure your staker files are secure. {% endhint %}

Let's get the staker files off the machine running the node.

### From local node

If you're running the node locally, on your desktop computer, just navigate to where the files are and copy them somewhere safe.

On a default Linux installation, the path to them will be `/home/USERNAME/.avalanchego/staking/`, where `USERNAME` needs to be replaced with the actual username running the node. Select and copy the files from there to a backup location. You don't need to stop the node to do that.

### From remote node using `scp`

`scp` is a 'secure copy' command line program, available built-in on Linux and MacOS computers. There is also a Windows version, `pscp`, as part of the [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html) package. If using `pscp`, in the following commands replace each usage of `scp` with `pscp -scp`.

To copy the files from the node, you will need to be able to remotely log into the machine. You can use account password, but the secure and recommended way is to use the SSH keys. The procedure for acquiring and setting up SSH keys is highly dependent on your cloud provider and machine configuration. You can refer to our [Amazon Web Services](setting-up-an-avalanche-node-with-amazon-web-services-aws.md) and [Microsoft Azure](set-up-an-avalanche-node-with-microsoft-azure.md) setup guides for those providers. Other providers will have similar procedures.

When you have means of remote login into the machine, you can copy the files over with the following command:

```shell
scp -r ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking ~/avalanche_backup
```
This assumes the username on the machine is `ubuntu`, replace with correct username in both places if it is different. Also, replace `PUBLICIP` with the actual public IP of the machine. If `scp` doesn't automatically use your downloaded SSH key, you can point to it manually:

```shell
scp -i /path/to/the/key.pem -r ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking ~/avalanche_backup
```

Once executed, this command will create `avalanche_backup` directory in you home directory and place staker files in it. You need to store them somewhere safe.

## Restore

To restore your node from a backup, we need to do the reverse: restore `staker.key` and `staker.crt` from the backup to the working directory of the node.

First, we need to do the usual [installation](set-up-node-with-installer.md) of the node. This will create a new NodeID, which we need to replace. When the node is installed correctly, log into the machine where the node is running and stop it:

```shell
sudo systemctl stop avalanchego
```

We're ready to restore the node.

### To local node

If you're running the node locally, just copy the `staker.key` and `staker.crt` files from the backup location into the working directory, which on the default Linux installation will be `/home/USERNAME/.avalanchego/staking/`. Replace `USERNAME` with the actual username used to run the node.

### To remote node using `scp`

Again, the process is just the reverse operation. Using `scp` we need to copy the `staker.key` and `staker.crt` files from the backup location into the remote working directory. Assuming the backed up files are located in the directory where the above backup procedure placed them:

```shell
scp ~/avalanche_backup/staker.* ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking
```

Or if you need to specify the path to the SSH key:

```shell
scp -i /path/to/the/key.pem ~/avalanche_backup/staker.* ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking
```
And again, replace `ubuntu` with correct username if different, and `PUBLICIP` with the actual public IP of the machine running the node, as well as the path to the SSH key if used.

### Restart the node and verify

Once the files have been replaced, log into the machine and start the node using:

```shell
sudo systemctl start avalanchego
```

You can now check that the node is restored with the correct NodeID by issuing the [getNodeID](https://docs.avax.network/build/avalanchego-apis/info-api#info-getnodeid) API call in the same console you ran the previous command:

```shell
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

You should see your original NodeID. Restore process is done.

## Summary

Essential part of securing your node is the backup that enables full and painless restoration of your node. Following this tutorial you can rest easy knowing that should you ever find yourself in a situation where you need to restore your node from scratch, you can easily and quickly do so.

If you have any problems following this tutorial, comments you want to share with us or just want to chat, you can reach us on our [Discord](https://chat.avalabs.org/) server.