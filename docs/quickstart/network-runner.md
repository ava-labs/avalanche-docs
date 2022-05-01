# Avalanche Network Runner

The Avalanche Network Runner allows a user to define, create and interact with a network of Avalanche nodes. It can be used for development and testing.

**Note that this tool is not for running production nodes, and that because it is being heavily developed right now, documentation might differ slightly from the actual code.**

## Installation

The Avalanche Network Runner repository is hosted at [https://github.com/ava-labs/avalanche-network-runner](https://github.com/ava-labs/avalanche-network-runner).

That repository's README details the tool.

Clone the repository with:

```sh
git clone https://github.com/ava-labs/avalanche-network-runner.git
```

Unless otherwise specified, file paths given below are relative to the root of this repository. 

## Usage

The basic pattern for using the Avalanche Network Runner is:

* Define the network
* Start the network
* Interact with it
* Shutdown

The [api](https://github.com/ava-labs/avalanche-network-runner/tree/main/api) package contains client code that allows the user to make API calls to Avalanche nodes within the network.

Please find examples of usage in the [examples](https://github.com/ava-labs/avalanche-network-runner/tree/main/examples) subdirectory.

## Run an Example

An example can be found at [examples/local/fivenodenetwork/main.go](https://github.com/ava-labs/avalanche-network-runner/blob/main/examples/local/fivenodenetwork/main.go). It creates a network of 5 nodes, waits for the nodes to become healthy and then waits for the user to terminate the program with a SIGINT (`CTRL + C`) or SIGTERM.

To run this example, do:

```sh
go run examples/local/fivenodenetwork/main.go
```

## Using Avalanche Network as a Library

The Avalanche Network Runner is meant to be imported into your programs so that you can use it to programatically start, interact with and stop Avalanche networks. For an example of using the Network Runner in a program, see the code in the example [above](#run-an-example).

Creating a network is as simple as:

```go
network, err := local.NewDefaultNetwork(log, binaryPath)
```

where `log` is a logger of type [logging.Logger](https://github.com/ava-labs/avalanchego/blob/master/utils/logging/logger.go#L12) and `binaryPath` is the path of the AvalancheGo binary that each node that exists on network startup will run.

For example, the below snippet creates a new network using default configurations, and each node in the network runs the binaries at `/home/user/go/src/github.com/ava-labs/avalanchego/build`:

```go
network, err := local.NewDefaultNetwork(log,"/home/user/go/src/github.com/ava-labs/avalanchego/build")
```

**Once you create a network, you must eventually call `Stop()` on it to make sure all of the nodes in the network stop.** Calling this method kills all of the Avalanche nodes in the network. You probably want to call this method in a `defer` statement to make sure it runs.

To wait until the network is ready to use, use the network's `Healthy` method. It returns a channel which will be notified when all nodes are healthy.

Each node has a unique name. Use the network's `GetNodeNames()` method to get the names of all nodes.

Use the network's method `GetNode(string)` to get a node by its name. For example:

```go
names, _ := network.GetNodeNames()
node, _ := network.GetNode(names[0])
```

Then you can make API calls to the node:

```go
id, _ := node.GetAPIClient().InfoAPI().GetNodeID() // Gets the node's node ID
balance, _ := node.GetAPIClient().XChainAPI().GetBalance(address,assetID,false) // Pretend these arguments are defined 
```

After a network has been created and is healthy, you can add or remove nodes to/from the network:

```
newNode, _ := network.AddNode(nodeConfig)
err := network.RemoveNode(names[0])
```

Where `nodeConfig` is a struct which contains information about the new node to be created.
For a local node, the most important elements are its name, its binary path and its identity, given by a TLS key/cert.

You can create a network where nodes are running different binaries -- just provide different binary paths to each:

```go
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

After adding a node, you may want to call the network's `Healthy` method again and wait until the new node is healthy before making API calls to it.

## Creating Custom Networks

To create custom networks, pass a custom config (the second parameter) to the `local.NewNetwork(logging.Logger, network.Config)` function. The config defines the number of nodes when the network starts, the genesis state of the network, and the configs for each node.

Please refer to [NetworkConfig](https://github.com/ava-labs/avalanche-network-runner#network-creation) for more details.

<!--- TODO uncomment this when we suport K8s better
## Kubernetes Backend

It's possible to create a network with a Kubernetes backend, offering higher flexibility and scalability in defining and running a development and test network.

An example can be found at `examples/k8s/main.go`. This example program creates a network of five nodes, each of which runs in a Kubernetes pod.

Note that the Kubernetes backend should only be used by advanced users and requires significantly more setup to use. 

### AvalancheGo Operator

In order for AvalancheGo nodes to run in a Kubernetes cluster, we use the [Operator pattern](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/). Therefore, for an AvalancheGo network to be runnable on Kubernetes, the `avalanchego-operator` dependency must be fulfilled. Essentially, the operator allows AvalancheGo nodes to run inside a Kubernetes cluster in a stateful manner.

Please find the AvalancheGo Operator code at [https://github.com/ava-labs/avalanchego-operator.](https://github.com/ava-labs/avalanchego-operator)

There are a multitude of possible configurations and setups when running Kubernetes, depending on your organization, preferences and environment. Generally, the Kubernetes admin should be responsible for installing and running the operator, as it involves setting up roles, services and permissions. Please refer to the AvalancheGo Operator documentation for instructions on installation, configuration, deployment, etc.

To install the AvalancheGo Operator in a local Kubernetes network (like `minikube` or `k3s`), assuming the Kubernetes environment has already been created and configured:

* Clone the AvalancheGo Operator repository above
* `make install` inside the AvalancheGo Operator repository (requires standard build tools)
* `make run` inside the AvalancheGo Operator repository

This will run the AvalancheGo operator inside the cluster. The most important link to a deployment is the `Kind` parameter, which needs to be set to `Avalanchego` for the operator to kick in. (See next section for details.)

You should only run the AvalancheGo Operator on a local Kubernetes cluster for testing before deploying to a remote Kubernetes cluster. If your goal is to simply run an Avalanche network locally, use the Local Backend of the Avalanche Network Runner.

### Configuration

Essentially, using a network with the Kubernetes backend is the same as using a network with the local backend.

The main difference lies in creating the network definition due to the properties and requirements of Kubernetes.

The key elements which should be provided are the genesis JSON file, the TLS certificates and keys for the node identity, and optionally configuration files for the AvalancheGo nodes. This is similar to the local backend implementation. 

It is left to the user to implement a means of providing the configuration to the network (reading and parsing files, etc.). `examples/k8s/main.go` provides an example of how to do it.
The Kubernetes-specific information needs to be provided in the `ImplSpecificConfig` of the `network.Config` (describes the network) and the `node.Config` (describes each individual node) structs.
For Kubernetes, each of these are represented as `Avalanchego` types from the AvalancheGo Operator package `github.com/ava-labs/avalanchego-operator`, which provides the interface to Kubernetes. The `k8s.ObjectSpec` acts as a helper layer to create such objects. Therefore, to create Kubernetes node definitions compatible with the AvalancheGo Operator, define instances of `k8s.ObjectSpec` for each node and pass these as `ImplSpecificConfig` member to a `node.Config`.

Example configuration defined in JSON:

```json
    {
      "namespace": "my-avalanchego-test",
      "identifier": "node-id-0",
      "kind": "Avalanchego",
      "apiVersion": "chain.avax.network/v1alpha1",
      "image": "avaplatform/avalanchego",
      "tag": "v1.7.1"
    }
```

Example configuration defined in Go:

```go
spec := &k8s.ObjectSpec{
  Namespace:  "my-avalanchego-test",
  Identifier: "node-id-0",
  Kind:       "Avalanchego",
  APIVersion: "chain.avax.network/v1alpha1",
  Image:      "avaplatform/avalanchego",
  Tag:        "v1.7.1",
```

**Note:** It is currently not possible to create a default network without any configuration for Kubernetes. This might be addressed in a future iteration.

**IMPORTANT**
To run a custom network in this way, the executable which will run this code needs to have access to the Kubernetes cluster. One way to achieve this is to deploy the executable as a pod itself into the cluster. An example script can be found at `examples/k8s/Dockerfile`. Create its image by running `docker build -f ./examples/k8s/Dockerfile -t <IMAGE>:<TAG> .` from the Avalanche Network Runner repository root.  The defaults for these examples are `<IMAGE>=k8s-netrunner` and `<TAG>=alpha`. An example pod definition using these properties can then be deployed to the cluster via `kubectl apply -f examples/k8s/simple-netrunner-pod.yaml`. Make sure the `Namespace` definitions match. If you change any of `IMAGE` or `TAG`, the `simple-netrunner-pod.yaml` file needs to be edited accordingly. Don't forget to edit `DOCKERFILE` if you start customizing.

Finally, to make this work altogether, the pod needs to have itself access to the cluster. An example script for doing this is at `examples/k8s/svc-rbac.yaml`. Apply it by running `kubectl apply -f examples/k8s/svc-rbac.yaml`. Once again, make sure namespaces match if customizing.
 
Please note one more time that there are multitudes of ways about how to deploy and configure Kubernetes networks. We provide here only a couple of examples. **None of these examples are meant to be used in production, and the Avalanche Network runner is not meant to run production nodes.**
-->