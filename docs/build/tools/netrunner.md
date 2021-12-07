# Network-runner

The network-runner tool allows to define, start and shutdown default or custom avalanchego networks for development and testing.

> **Please do not use this tool for running production nodes. We cannot take responsibility nor be able to give support in this case.**

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
* using a kubernetes network as a backend

The tool shares a common interface design, located at the `<REPOSITORY_ROOT>/network` package.
Then each backend implements its own runtime.

* Local: `<REPOSITORY_ROOT>/local`
* Kubernetes: `<REPOSITORY_ROOT>/k8s`

The `api` package contains client code to access avalanchego nodes.

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

After a network has been created and is healthy, we can add new nodes to, or remove nodes from, the network:
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
The basic operations (interface) of the general `Network` interface are being implemented by the kubernetes backend as well. 

### Requirements
**IMPORTANT**
In order for avalanchego nodes to be running smoothly in a kubernetes cluster, we apply the [Operator pattern](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/). Therefore, for such an avalanchego network to be runnable on kubernetes, the `avalanchego-operator` dependency must be fulfilled. Essentially, the operator allows avalanchego nodes to run inside a kubernetes cluster in a stateful mode.

Please find the code for running the operator at 
```
[https://github.com/ava-labs/avalanchego-operator](https://github.com/ava-labs/avalanchego-operator)
```

There is a multitude of possible configurations and setups when running kubernetes, depending on organization, preferences and environment. Generally, the kubernetes admin should be responsible to install and run the operator, as it involves setting up roles, services and permissions. Please refer to the operator docs on how to install, configure and deploy/run it. Feel free to reach out to us for support on this.

Generally it makes not much sense to run networks in kubernetes environments for local development, like `minikube` or `k3s`. For such use cases, the local processes variant should be preferred. Nevertheless, for documentation purposes, to install the operator in a local kubernetes network (assuming the kubernetes environment has already been created and configured), it would be:
* clone the operator repository above
* execute `make install` inside the repository (requires standard build tools)
* execute `make run`

This will run the avalanchego operator inside the cluster. The most important link to a deployment is the `Kind` parameter, which needs to be set to `Avalanchego` for the operator to kick in. See next chapter for details.


### Kubernetes configuration
Essentially, setting up a kubernetes network follows the same sequence as the local processes implementation documented above.
* Define the network definition
* Start the network
* Interact with it
* Shutdown

The difference lies in how to create the network definition due to the properties and requirements of kubernetes.

The key elements which should be provided are the genesis JSON file, the TLS certificates and keys for the node identity, and optionally configuration files for the avalanchego nodes. This is also analog to the local processes implementation. 

It is left to the user to implement how to exactly provide the configuration to the network (implement go code, reading files from the file system, etc.). The `<REPOSITORY_ROOT>/examples/k8s/main.go` provides just an example of how to do it.
The kubernetes specific information needs to be provided in the `ImplSpecificConfig` of the `network.Config` (describes the network) and the `node.Config` (describes each individual node) structs.
For kubernetes, each of these finally are represented as `Avalanchego` types from the operator package `github.com/ava-labs/avalanchego-operator`, which provides the interface to kubernetes. The `k8s.ObjectSpec` acts as a helper layer to create such objects. Therefore, to create kubernetes node definitions compatible to the operator, define instances of `k8s.ObjectSpec` for each node and pass these as `ImplSpecificConfig` member to a `node.Config`.

For example via JSON config file:
```
    {
      "namespace": "my-avalanchego-test",
      "identifier": "node-id-0",
      "kind": "Avalanchego",
      "apiVersion": "chain.avax.network/v1alpha1",
      "image": "avaplatform/avalanchego",
      "tag": "v1.7.1"
    }
```

or via code:
```
&k8s.ObjectSpec{
  Namespace:  "my-avalanchego-test",
  Identifier: "node-id-0",
  Kind:       "Avalanchego",
  APIVersion: "chain.avax.network/v1alpha1",
  Image:      "avaplatform/avalanchego",
  Tag:        "v1.7.1",
```

**Note:** It is currently not possible to create a default network without any configuration for kubernetes. This might be addressed in a future iteration.

**IMPORTANT**
To run a custom network in this way, the executable which will run this code needs to have access to the cluster. One way to achieve this is to deploy the executable as a pod itself into the cluster. An example script can be found at `<REPOSITORY_ROOT>/examples/k8s/Dockerfile`. Create its image by running `docker build -f ./examples/k8s/Dockerfile -t <IMAGE>:<TAG> .` from the `<REPOSITORY_ROOT>`. The defaults for these examples are `<IMAGE>=k8s-netrunner` and `<TAG>=alpha`. An example pod definition using these properties can then be deployed to the cluster via `kubectl apply -f <REPOSITORY_ROOT>/examples/k8s/simple-netrunner-pod.yaml`. Make sure the `Namespace` definitions match. If you change any of `IMAGE` or `TAG`, the `simple-netrunner-pod.yaml` file needs to be edited accordingly. Don't forget to edit `DOCKERFILE` if you start customizing.

Finally, to make this work altogether, the pod needs to have itself access to the cluster. An example script about how to make this happen is at `<REPOSITORY_ROOT>/examples/k8s/svc-rbac.yaml`. Apply it by running `kubectl apply -f <REPOSITORY_ROOT>/examples/k8s/svc-rbac.yaml`. Once again make sure namespaces match if customizing.
 
Please note one more time that there are multitudes of ways about how to deploy and configure kubernetes networks. We provide here only a couple of examples. **NONE OF THESE EXAMPLES ARE MEANT TO BE USED IN ANY WAY FOR PRODUCTION** - apart from the fact that the tool itself is not meant for production anyways, but development and testing only.
