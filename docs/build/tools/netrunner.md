# Network-runner

The network-runner tool allows to define, start and shutdown default or custom avalanchego networks for development and testing.

> **Please do not use this tool for running production nodes. Ava Labs cannot take responsibility nor be able to give support in this case.**

## How to install
The network-runner repository is hosted at 

```
[https://github.com/ava-labs/avalanche-network-runner](https://github.com/ava-labs/avalanche-network-runner)
```

Opening that URL will display a README file with further details of this tool.

Clone the repository with
```
git clone https://github.com/ava-labs/avalanche-network-runner.git
```

## Supported backends
The tool can run nodes

* locally by spawning processes running on the same machine
* using a kubernetes network as a backends

The tool shares a common interface design, located at the `<REPOSITORY_ROOT>/network` package.
Then each backend implements its own runtime.

The `api` package contains client code to access avalanchego nodes.

* Local: `<REPOSITORY_ROOT>/local`
* Kubernetes: `<REPOSITORY_ROOT>/k8s`

The basic steps to create and run a network are:
* Define the network definition
* Start the network
* Interact with it
* Shutdown

Please find examples at `<REPOSITORY_ROOT>/examples` for each backend.

## Local processes
The simplest and most straightforward way to use the tool is to run it locally on a computer by spawning individual operating system processes for each avalanchego node.
**Please note that your system will set the boundaries about how many nodes you can run in this case.**

An example can be found at `<REPOSITORY_ROOT>/examples/local/main.go`. It is a simple setup which just creates a new default network of 5 nodes, and performs some simple API calls.

Creating a default network is as simple as:
`network, err := local.NewDefaultNetwork(log, binaryPath)`, where `log` is a logger instance of type `logging.Logger` and `binaryPath` a string pointing the to **path of the location of the compiled avalanchego binary**.
For example:
`local.NewDefaultNetwork(log,"/home/user/go/src/github.com/ava-labs/avalanchego/build")`

This generates a default network configuration and starts the nodes.

To wait until the network is ready to use, use the `Healthy` function. It returns a channel which will be notified when all nodes are being healthy.

`GetNodeNames()` returns a list of strings of node names. Use this to access single nodes with the `GetNode(string)` function, e.g.:

```
names, _ := network.GetNodesNames()
node := network.GetNode(names[index])
```

It is then possible to execute API calls on the node:

```
id,_ := node.GetAPIClient().InfoAPI().GetNodeID()
balance,_ := node.GetAPIClient().XChainAPI().GetBalance(addr,assetID,includePartial) //assumes these params are valid 
```

After a network has been created and is healthy, we can add new or remove nodes to resp. from the network:
```
network.AddNode(nodeConfig)
network.RemoveNode(names[index])
```

The `nodeConfig` is a struct which contains information about the new node to be created.
For a local node, the most important elements are its name, its binary path and its identity, given by a TLS key/cert.

**This means it is possible to create networks with different versions of avalanchego binaries.** Just provide different binary paths to each.

```
  stakingCert, stakingKey, err := staking.NewCertAndKeyBytes()
  if err != nil {
   return err
  }
  nodeConfig := node.Config{
    Name: "New Node",
    ImplSpecificConfig: local.NodeConfig{
      BinaryPath: "/tmp/my-avalanchego/build",
    },
    StakingKey:  stakingKey,
    StakingCert: stakingCert,
  }
```

After adding/removing nodes it's suggested to again wait for `Healthy` until performing any operations on them.

Finally run `network.Stop(ctx)` to stop the network. This will terminate all avalanchego nodes and also do a cleanup of all their temporary data.


## Creating custom networks
To create custom networks, the most important step is to pass a custom config to the `local.NewNetwork(logging.Logger, network.Config)` function (the second parameter). 
It basically requires to provide the number of nodes, a custom genesis JSON and the array of individual node configs with the binary paths.

Please refer to [NetworkConfig](https://github.com/ava-labs/avalanche-network-runner#network-creation) for some more details about the required data.


## Kubernetes
It's possible to create a network with a kubernetes backend, offering higher flexibility and scalability in defining and running a development and test network.

An example can be found at `<REPOSITORY_ROOT>/examples/k8s/main.go`. This represents an example default network of 5 nodes which can run in a kubernetes cluster.

### Requirements
**IMPORTANT**
In order for avalanchego nodes to be running smoothly in a kubernetes cluster, we apply the [Operator pattern](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/). Therefore, for such an avalanchego network to be runnable on kubernetes, the `avalanchego-operator` dependency must be fulfilled.

Please find the code for running the operator at 
```
[https://github.com/ava-labs/avalanchego-operator](https://github.com/ava-labs/avalanchego-operator)
```

There is a multitude of possible configurations and setups when running kubernetes, depending on organization, preferences and environment. Generally, the kubernetes admin should be responsible to install and run the operator, as it involves setting up roles, services and permissions. Please refer to the operator docs on how to install, configure and deploy/run it. Feel free to reach out to us for support on this.

Of course there are kubernetes environments for local development, like `minikube` or `k3s`. Generally it makes not much sense to run networks in such local environments (the local processes variant should be preferred).
