# How to Pause and Resume Local Subnets

If you've deployed a Subnet locally, you can preserve and restore the state of your deployed Subnets.

## Stopping the Local Network

To gracefully stop a running local network while preserving state, run

```shell
avalanche network stop
```

When restarted, all of your deployed Subnets resume where they left off.

```text
> avalanche network stop
Network stopped successfully.
```

### Resuming the Local Network

To resume a stopped network, run

```shell
avalanche network start
```

The network resumes with the same state it paused with.

<!-- markdownlint-disable MD013 -->

```text
> avalanche network start
Starting previously deployed and stopped snapshot
Booting Network. Wait until healthy...
...............
Network ready to use. Local network node endpoints:
+-------+----------+------------------------------------------------------------------------------------+
| NODE  |    VM    |                                        URL                                         |
+-------+----------+------------------------------------------------------------------------------------+
| node5 | mySubnet | http://127.0.0.1:9658/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc |
+-------+----------+------------------------------------------------------------------------------------+
| node1 | mySubnet | http://127.0.0.1:9650/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc |
+-------+----------+------------------------------------------------------------------------------------+
| node2 | mySubnet | http://127.0.0.1:9652/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc |
+-------+----------+------------------------------------------------------------------------------------+
| node3 | mySubnet | http://127.0.0.1:9654/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc |
+-------+----------+------------------------------------------------------------------------------------+
| node4 | mySubnet | http://127.0.0.1:9656/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc |
+-------+----------+------------------------------------------------------------------------------------+
```

<!-- markdownlint-enable MD013 -->

## Checking Network Status

If you'd like to determine whether or not a local Avalanche network is running on your machine, run

```shell
avalanche network status
```

### Example Call

If the local network is running, the command prints something like

```text
Requesting network status...
Network is Up. Network information:
==================================================================================================
Healthy: true
Custom VMs healthy: true
Number of nodes: 5
Number of custom VMs: 1
======================================== Node information ========================================
node5 has ID NodeID-P7oB2McjBGgW2NXXWVYjV8JEDFoW9xDE5 and endpoint http://127.0.0.1:9658:
node1 has ID NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg and endpoint http://127.0.0.1:9650:
node2 has ID NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ and endpoint http://127.0.0.1:9652:
node3 has ID NodeID-NFBbbJ4qCmNaCzeW7sxErhvWqvEQMnYcN and endpoint http://127.0.0.1:9654:
node4 has ID NodeID-GWPcbFJZFfZreETSoWjPimr846mXEKCtu and endpoint http://127.0.0.1:9656:
==================================== Custom VM information =======================================
Endpoint at node4 for blockchain "SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz": http://127.0.0.1:9656/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc
Endpoint at node5 for blockchain "SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz": http://127.0.0.1:9658/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc
Endpoint at node1 for blockchain "SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz": http://127.0.0.1:9650/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc
Endpoint at node2 for blockchain "SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz": http://127.0.0.1:9652/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc
Endpoint at node3 for blockchain "SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz": http://127.0.0.1:9654/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc
```

If the network isn't running, the command instead prints

```text
Requesting network status...
No local network running
```

or

```text
Requesting network status...
Error: timed out trying to contact backend controller, it is most probably not running
```
