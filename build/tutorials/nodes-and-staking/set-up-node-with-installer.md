# Setting up node on Linux using the installer script

Setting up AvalancheGo node to run on [Avalanche platform](../../../learn/platform-overview/README.md) involves a whole series of commands, editing files and system settings. Since those are all known and reproducible, we created a shell \(bash\) script to automate and speed up the process, and also to help those that don't necessarily have extensive technical knowledge and might find the install process too complicated. 

Using our script you can go from a clean system to having a full, running node in a matter of minutes, entering only a couple commands and answering a few prompts.

## Before you start

This install script makes a few assumptions:
* clean Ubuntu 18.04 or 20.04 install \(sorry, Mac or Windows not supported yet\)
* AvalancheGo is not running and not already installed as a service
* user running the script has superuser privileges \(can run `sudo`\)

### Environment considerations

If you run a different flavor of Linux, the script might not work as intended. It assumes `systemd` is used to run system services. Other Linux flavors might use something else, or might have files in different places than is assumed by the script.

If you have a node already running on the computer, stop it before running the script, otherwise two instances will clash, and you may end up with corrupted files.

#### Node running from terminal

If your node is running in a terminal stop it by pressing `ctrl+c`.

#### Node running as a service

If a node is already running as a service, then you probably don't need this script. You're good to go.

#### Node running in the background

If your node is running in the background \(by running with `nohup`, for example\) then find the process running the node by running `ps aux | grep avalanche`. This will produce output like:

```text
ubuntu  6834  0.0  0.0   2828   676 pts/1    S+   19:54   0:00 grep avalanche
ubuntu  2630 26.1  9.4 2459236 753316 ?      Sl   Dec02 1220:52 /home/ubuntu/build/avalanchego
```

Look for line that doesn't have `grep` on it. In this example, that is the second line. It shows information about your node. Note the process id, in this case, `2630`. Stop the node by running `kill -2 2630`.

#### Node working files

If you had a previously running node instance, by default you will have local node files stored in `$HOME/.avalanchego` directory. Those files will not be disturbed, and node set up by the script will continue operation with the same identity and state it had before, it is completely safe to run the script. That being said, for your own safety and as a generally good practice, back up `staker.crt` and `staker.key` files, found in `$HOME/.avalanchego/staking` and store them somewhere secure and safe. You can use those files to recreate your node on a different computer if you ever need to do so.

### Networking considerations

To run successfully, AvalancheGo needs to accept connections from the Internet on the network port `9651`. Before you proceed with the installation, you need to determine the networking environment your node will run in.

#### Running on a cloud provider

If your node is running on a cloud provider computer instance, it will have a static IP. Find out what that static IP is, or set it up if you didn't already. The script will try to find out the IP by itself, but that might not work in all environments, so you will need to check the IP or enter it yourself.

#### Running on a home connection

If you're running a node on a computer that is on a residential connection, you will have a dynamic IP; that is, your IP will change periodically. Installer will configure the node appropriately for that situation. But, for a home connection, you will need to set up inbound port forwarding of port `9651` from the internet to the computer the node is installed on.

As there are too many models and router configurations, we cannot provide instructions on what exactly to do, but there are online guides to be found \(like [this](https://www.noip.com/support/knowledgebase/general-port-forwarding-guide/), or [this](https://www.howtogeek.com/66214/how-to-forward-ports-on-your-router/) \), and your service provider support might help too.

## Running the script

So, now that you prepared your system and have the info ready, let's get to it.

To download the script, in the terminal run the following command:

```shell
wget https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/avalanche-installer.sh
```

Script should be transferred to your computer. Now we need to make it executable:

```shell
chmod 755 avalanche-installer.sh
```

And we're ready to run it. Do so with:

```shell
./avalanche-installer.sh
```

And we're off! The output should show you what it's doing, something like this:

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

enter `1` if you have dynamic IP, and `2` if you have a static IP. If you are on a static IP, it will try to auto-detect the IP and ask for confirmation.

```text
Detected '3.15.152.14' as your public IP. Is this correct? [y,n]:
```

Confirm with `y`, or `n` if the detected IP is wrong (or empty), and then enter the correct IP at the next prompt.

The script will then continue with system service creation and finish with starting the service.

```text
Installing service with public IP: 3.15.152.14
Created symlink /etc/systemd/system/multi-user.target.wants/avalanchego.service → /etc/systemd/system/avalanchego.service.

Done!

Your node should now be bootstrapping on the main net.
To check that the service is running use the following command (q to exit):
sudo systemctl status avalanchego
To follow the log use (ctrl-c to stop):
sudo journalctl -u avalanchego -f

Reach us over on https://chat.avax.network if you're having problems.
```

Script should be finished now, and you should see the system prompt again.

## Post installation

You can check that the service is running by entering:

```shell
sudo systemctl status avalanchego
```

Which should produce something like this:

```text
● avalanchego.service - AvalancheGo systemd service
Loaded: loaded (/etc/systemd/system/avalanchego.service; enabled; vendor preset: enabled)
Active: active (running) since Tue 2021-01-05 10:38:21 UTC; 51s ago
Main PID: 2142 (avalanchego)
Tasks: 8 (limit: 4495)
Memory: 223.0M
CGroup: /system.slice/avalanchego.service
└─2142 /home/ubuntu/avalanche-node/avalanchego --plugin-dir=/home/ubuntu/avalanche-node/plugins --dynamic-public-ip=opendns --http-host=

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

Note the `active (running)` which indicates the service is running ok. You may need to press q to return to the command prompt.

To find out your NodeID, which is used to identify your node to the network, run the following command:

```shell
sudo journalctl -u avalanchego | grep "node's ID"
```

It will produce output like:
```text
Jan 05 10:38:38 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:38] avalanchego/node/node.go#428: Set node's ID to 6seStrauyCnVV7NEVwRbfaT9B6EnXEzfY
```
Append `NodeID-` to the value, in this case the NodeID is: `NodeID-6seStrauyCnVV7NEVwRbfaT9B6EnXEzfY`. Store that somewhere you can refer to later, it will be needed for staking or looking up your node.

Your node should be in the process of bootstrapping now. You can monitor the progress by issuing the following command:

```shell
sudo journalctl -u avalanchego -f
```

Press `ctrl-c` when you wish to stop.

## What next?

That's it, you are running a node on the Avalanche platform now! Congratulations! Let us know you did it on our [Twitter](https://twitter.com/avalancheavax), [Telegram](https://t.me/avalancheavax) or [Reddit](https://t.me/avalancheavax)!

If you're on a residential network (dynamic IP), don't forget to set up port forwarding. If you're on a cloud service provider, you're good to go.

Now you can proceed to [interact with the node](../../avalanchego-apis/issuing-api-calls.md), [stake your tokens](staking-avax-by-validating-or-delegating-with-the-avalanche-wallet.md), or level up your installation by setting up [node monitoring](setting-up-node-monitoring.md) to get a better insight into what your node is doing.

If you have any questions, or need help, feel free to contact us on our [Discord](https://chat.avalabs.org/) server.
