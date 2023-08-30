---
tags: [Nodes]
description: Basic config to be able to run your node in the background service
sidebar_label: Background Service Node Config
pagination_label: AvalancheGo Configs
sidebar_position: 3
---

## Prerequisites

- AvalancheGo installed

## Steps to run the node in the background service
### 1) Fuji Testnet Config

Run this command in your terminal to create the avalanchego.service file 
```
$ sudo nano /etc/systemd/system/avalanchego.service
```
Paste the following configuration into the avalanchego.service file

***Remember to modify the values of:***

- ***user=***
- ***group=***
- ***WorkingDirectory=***
- ***ExecStart=***

***For those that you have configured on your Server***
```
[Unit]
Description=Avalanche Node service
After=network.target

[Service]
User='YourUserHere'
Group='YourUserHere'
Restart=always
PrivateTmp=true
TimeoutStopSec=60s
TimeoutStartSec=10s
StartLimitInterval=120s
StartLimitBurst=5
WorkingDirectory=/Your/Path/To/avalanchego
ExecStart=/Your/Path/To/avalanchego/./avalanchego \  
   --network-id=fuji 

[Install]
WantedBy=multi-user.target
```
Press **CTRL + X** then **Y** then **ENTER** to save and exit.

Now, run:
```
sudo systemctl daemon-reload
```

### 2) Mainnet Config

Run this command in your terminal to create the `avalanchego.service` file 
```
$ sudo nano /etc/systemd/system/avalanchego.service
```
Paste the following configuration into the `avalanchego.service` file
```
[Unit]
Description=Avalanche Node service
After=network.target

[Service]
User='YourUserHere'
Group='YourUserHere'
Restart=always
PrivateTmp=true
TimeoutStopSec=60s
TimeoutStartSec=10s
StartLimitInterval=120s
StartLimitBurst=5
WorkingDirectory=/Your/Path/To/avalanchego
ExecStart=/Your/Path/To/avalanchego/./avalanchego 

[Install]
WantedBy=multi-user.target
```
Press **Ctrl + X** then **Y** then **Enter** to save and exit.

Now, run:
```
sudo systemctl daemon-reload
```
## Start The Node

This command makes your node start automatically in case of a reboot, run it:
```
$ sudo systemctl enable avalanchego
```

To start the node, run:
```
$ sudo systemctl start avalanchego
$ sudo systemctl status avalanchego
```
Output:
```Lua
socopower@avalanche-node-01:~$ sudo systemctl status avalanchego
● avalanchego.service - Avalanche Node service
     Loaded: loaded (/etc/systemd/system/avalanchego.service; enabled; vendor p>
     Active: active (running) since Tue 2023-08-29 23:14:45 UTC; 5h 46min ago
   Main PID: 2226 (avalanchego)
      Tasks: 27 (limit: 38489)
     Memory: 8.7G
        CPU: 5h 50min 31.165s
     CGroup: /system.slice/avalanchego.service
             └─2226 /usr/local/bin/avalanchego/./avalanchego --network-id=fuji

Aug 30 03:02:50 avalanche-node-01 avalanchego[2226]: INFO [08-30|03:02:50.685] >
Aug 30 03:02:51 avalanche-node-01 avalanchego[2226]: INFO [08-30|03:02:51.185] >
Aug 30 03:03:09 avalanche-node-01 avalanchego[2226]: [08-30|03:03:09.380] INFO >
Aug 30 03:03:23 avalanche-node-01 avalanchego[2226]: [08-30|03:03:23.983] INFO >
Aug 30 03:05:15 avalanche-node-01 avalanchego[2226]: [08-30|03:05:15.192] INFO >
Aug 30 03:05:15 avalanche-node-01 avalanchego[2226]: [08-30|03:05:15.237] INFO >
Aug 30 03:05:15 avalanche-node-01 avalanchego[2226]: [08-30|03:05:15.238] INFO >
Aug 30 03:05:19 avalanche-node-01 avalanchego[2226]: [08-30|03:05:19.809] INFO >
Aug 30 03:05:19 avalanche-node-01 avalanchego[2226]: [08-30|03:05:19.809] INFO >
Aug 30 05:00:47 avalanche-node-01 avalanchego[2226]: [08-30|05:00:47.001] INFO
```

To see the synchronization process, you can run the following command:
```
$ sudo journalctl -fu avalanchego
```

