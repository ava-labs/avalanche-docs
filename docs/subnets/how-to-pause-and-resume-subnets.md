# How to Pause and Resume Local Subnets

If you've deployed a Subnet locally, you can preserve and restore the state of your deployed subnets.

## Stopping the Local Network

To gracefully stop a running local network while preserving state, run

`avalanche network stop`

When restarted, all of your deployed Subnets will resume where they left off.

### Example Call

```text

> avalanche network stop

dialing endpoint ":8097"

Network stopped successfully.

```

### Starting/Restarting the Local Network

To start or restart a stopped network, run

`avalanche network start`

Deploying a Subnet locally will start the network automatically.

The network will resume with the same state it paused with.

### Example Call

```text

> avalanche network start

dialing endpoint ":8097"

Starting previously deployed and stopped snapshot

.....................

Network ready to use. Local network node endpoints:

Endpoint at node node3 for blockchain "n6yXZSaNXCvh6BUTJ2fgyc4iDxoz21NVaVgY3N4sSpTGMqJzc": http://127.0.0.1:48498/ext/bc/2GAinA2PAEEEnuy1yTeqgqCbQWUGFTvUaiDSRiZgMrRRoLYs92/rpc

Endpoint at node node4 for blockchain "n6yXZSaNXCvh6BUTJ2fgyc4iDxoz21NVaVgY3N4sSpTGMqJzc": http://127.0.0.1:63196/ext/bc/2GAinA2PAEEEnuy1yTeqgqCbQWUGFTvUaiDSRiZgMrRRoLYs92/rpc

Endpoint at node node5 for blockchain "n6yXZSaNXCvh6BUTJ2fgyc4iDxoz21NVaVgY3N4sSpTGMqJzc": http://127.0.0.1:49912/ext/bc/2GAinA2PAEEEnuy1yTeqgqCbQWUGFTvUaiDSRiZgMrRRoLYs92/rpc

Endpoint at node node1 for blockchain "n6yXZSaNXCvh6BUTJ2fgyc4iDxoz21NVaVgY3N4sSpTGMqJzc": http://127.0.0.1:47497/ext/bc/2GAinA2PAEEEnuy1yTeqgqCbQWUGFTvUaiDSRiZgMrRRoLYs92/rpc

Endpoint at node node2 for blockchain "n6yXZSaNXCvh6BUTJ2fgyc4iDxoz21NVaVgY3N4sSpTGMqJzc": http://127.0.0.1:62099/ext/bc/2GAinA2PAEEEnuy1yTeqgqCbQWUGFTvUaiDSRiZgMrRRoLYs92/rpc

```

## Checking Network Status

If you'd like to determine whether or not a local Avalanche network is running on your machine, run

`avalanche network status`

### Example call

If the local network is running, you will see something like

```
Requesting network status...
Network is Up. Network information:
==================================================================================================
Healthy: true
Custom VMs healthy: true
Number of nodes: 5
Number of custom VMs: 0
======================================== Node information ========================================
node2 has ID NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ and endpoint http://127.0.0.1:9652:
node3 has ID NodeID-NFBbbJ4qCmNaCzeW7sxErhvWqvEQMnYcN and endpoint http://127.0.0.1:9654:
node4 has ID NodeID-GWPcbFJZFfZreETSoWjPimr846mXEKCtu and endpoint http://127.0.0.1:9656:
node5 has ID NodeID-P7oB2McjBGgW2NXXWVYjV8JEDFoW9xDE5 and endpoint http://127.0.0.1:9658:
node1 has ID NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg and endpoint http://127.0.0.1:9650:
==================================== Custom VM information =======================================
```

If the network is not running, you will instead see

```
Requesting network status...
No local network running
```
