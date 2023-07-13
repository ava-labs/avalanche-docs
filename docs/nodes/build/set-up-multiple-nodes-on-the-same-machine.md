---
sidebar_position: 10
description: Tutorial on how to set up a multiple nodes on the same machine.
---

# Run Multiple Nodes on the Same Machine

This tutorial will guide you on how to run multiple nodes on the same machine.

You should have `avalanchego` running on your machine already. You will need to create different directories for each node, and congfigure each directory accordingly.

## Setting up the nodes

Open up your terminal, create a directory for the nodes and navigate to it.

```zsh
mkdir avalanche-nodes && cd avalanche-nodes
```
Create sub-directories for the number of nodes you want to run. In this tutorial, we will run two nodes:

```zsh
mkdir node1 && mkdir node2
```

Navigate to node1 and create the configuration file:

```zsh
cd node1 && touch config-node1.json
```

Configure the file according to your requirements. Here is an example of the basic requirements:

```js
{
    "network-id": "local",
    "http-port": 9652,
    "db-dir": "./db-node1",
    "log-dir": "./logs-node1"
}
```

Save the configuration, then navigate to the node2 directory and create a configuration file as well.

```zsh
cd ../node2 && touch config-node2.json
```

Configure the node2 according to your requirements:

```js
{
    "network-id": "fuji",
    "http-port": 9653,
    "db-dir": "./db-node2",
    "log-dir": "./logs-node2"
}
```

Be sure to specify a different http ports for each node. 
The `db-dir` option specifies the data directory for that node, while the `log-dir` option specifies the log directory.
Save the configuration file.

## Running the nodes

Open up a new terminal window and navigate to node1. Run the following command to start the node:

```zsh
<path to avalanchego> --config-file=config-node1.json
```

Open up another terminal window and navigate to node2. Run the following command to start node2:

```zsh
<path to avalanchego> --config-file=config-node2.json
```

This will start both nodes independently, and generate logs and data directories in the corresponding directory. The nodes will run simultaneously without any interference. To ensure that each node is running correctly, you can check the logs for each node by navigating to the data directory for that node.
