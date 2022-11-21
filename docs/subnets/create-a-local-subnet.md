# How to Deploy a Subnet on a Local Network

## Deploying Subnets Locally

To deploy, run

`avalanche subnet deploy <subnetName>`

Local deploys will start a multi-node Avalanche network in the background on your machine. Progress will be shown until it completes. It also prints info needed for connecting with Metamask.

Example:

```text
> avalanche subnet deploy firstsubnet
✔ Local Network
Deploying [firstsubnet] to Local Network
Backend controller started, pid: 71505, output at: /var/folders/0h/v4nrbbsn1vvbr5h2wfrh5h500000gn/T/avalanche-cli-backend57656025
Avalanchego installation successful
dialing endpoint ":8097"
VM ready. Trying to boot network...
Network has been booted. Wait until healthy. Please be patient, this will take some time...
...............................................................................
Network ready to use. Local network node endpoints:
Endpoint at node node4 for blockchain "n6yXZSaNXCvh6BUTJ2fgyc4iDxoz21NVaVgY3N4sSpTGMqJzc": http://127.0.0.1:63196/ext/bc/2GAinA2PAEEEnuy1yTeqgqCbQWUGFTvUaiDSRiZgMrRRoLYs92/rpc
Endpoint at node node5 for blockchain "n6yXZSaNXCvh6BUTJ2fgyc4iDxoz21NVaVgY3N4sSpTGMqJzc": http://127.0.0.1:49912/ext/bc/2GAinA2PAEEEnuy1yTeqgqCbQWUGFTvUaiDSRiZgMrRRoLYs92/rpc
Endpoint at node node1 for blockchain "n6yXZSaNXCvh6BUTJ2fgyc4iDxoz21NVaVgY3N4sSpTGMqJzc": http://127.0.0.1:47497/ext/bc/2GAinA2PAEEEnuy1yTeqgqCbQWUGFTvUaiDSRiZgMrRRoLYs92/rpc
Endpoint at node node2 for blockchain "n6yXZSaNXCvh6BUTJ2fgyc4iDxoz21NVaVgY3N4sSpTGMqJzc": http://127.0.0.1:62099/ext/bc/2GAinA2PAEEEnuy1yTeqgqCbQWUGFTvUaiDSRiZgMrRRoLYs92/rpc
Endpoint at node node3 for blockchain "n6yXZSaNXCvh6BUTJ2fgyc4iDxoz21NVaVgY3N4sSpTGMqJzc": http://127.0.0.1:48498/ext/bc/2GAinA2PAEEEnuy1yTeqgqCbQWUGFTvUaiDSRiZgMrRRoLYs92/rpc

Metamask connection details (any node URL from above works):
RPC URL:          http://127.0.0.1:63196/ext/bc/2GAinA2PAEEEnuy1yTeqgqCbQWUGFTvUaiDSRiZgMrRRoLYs92/rpc
Funded address:   0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC with 1000000 (10^18) - private key: 56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027
Network name:     firstsubnet
Chain ID:         12345
Currency Symbol:  TEST
```

To manage that network, see [the `avalanche network` command tree](#network).

### Deploying to Fuji

If you can't wait to for this tool's Fuji integration, you can use the `subnet-cli` tool to deploy your Subnet.

First, export your Subnet's genesis file with `avalanche subnet describe --genesis <subnetName>`. Then, use that genesis file to complete the instructions listed [here](./create-a-fuji-subnet.md#run-subnet-cli-wizard).

### Delete a Subnet Configuration

To delete a created Subnet configuration, run

`avalanche subnet delete <subnetName>`

## Network

The network command suite provides a collection of tools for managing local Subnet deployments.

When a Subnet is deployed locally, it runs on a local, multi-node Avalanche network. Deploying a Subnet locally will start this network in the background. This command suite allows you to shutdown and restart that network.

This network currently supports multiple, concurrently deployed Subnets and will eventually support nodes with varying configurations. Expect more functionality in future releases.

### Stopping the Local Network

To stop a running local network, run

`avalanche network stop [snapshotName]`

This graceful shutdown will preserve network state. When restarted, your Subnet should resume at the same place it left off.
`snapshotName` is optional, if provided, a named snapshot will be created which can later be started again with `avalanche network start snapshotName`.
If not provided, a default snapshot will be created. The default snapshot will be overwritten at each `stop`.

Example:

```text
> avalanche network stop
dialing endpoint ":8097"
Network stopped successfully.
```

### Starting/Restarting the Local Network

To start or restart a stopped network, run

`avalanche network start [snapshotName]`

`snapshotName` is optional, if provided the named snapshot will be used to start the network (if found).
If not provided, the last snapshot created with a unnamed `stop` will be used.

If the default snapshot doesn't exist (because no `stop` has been run yet, and/or no Subnet has been deployed yet), the command will fail.

Deploying a Subnet locally will start the network automatically.

Example:

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

### Deleting the Local Network

To stop your local network and clear its state, run

`avalanche network clean`

This will delete all stored deploy state for all local Subnet deployments. This will not delete any of your Subnet configurations. You will need to redeploy your Subnet configurations one by one to use them again.

Example:

```text
> avalanche network clean
dialing endpoint ":8097"
Process terminated.
```

### Checking Network Status

If you'd like to determine whether or not a local Avalanche network is running on your machine, run

`avalanche network status`

## Connect with Metamask

Please use the value provided by `Metamask connection details` to connect with Metamask.

```text
Metamask connection details (any node URL from above works):
RPC URL:          http://127.0.0.1:63196/ext/bc/2GAinA2PAEEEnuy1yTeqgqCbQWUGFTvUaiDSRiZgMrRRoLYs92/rpc
Funded address:   0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC with 1000000 (10^18) - private key: 56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027
Network name:     firstsubnet
Chain ID:         12345
Currency Symbol:  TEST
```

You can create a new metamask account by importing the private key `0x56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027` and start experiencing with this account.

Here is a screenshot of Metamask when everything is set correctly:
![Avalanche CLI Metamask](/img/avalanche-cli-metamask.png)

## Smart Contract

You can use this newly created Subnet just like you use C-Chain and EVM tools. Only differences are `chainID` and RPC URL. For example you can follow this article to [Deploy a Smart Contract on Your Subnet-EVM Using Remix and Metamask](./deploy-a-smart-contract-on-your-evm.md). Or you can deploy your contracts with [hardhat quick start guide](../dapps/smart-contracts/using-hardhat-with-the-avalanche-c-chain.md) by changing `url` and `chainId` in the `hardhat.config.ts`.

For example: to connect `Hardhat` to the local network that deployed with the Avalanche-CLI, we would create a network setting in `hardhat.config.ts` that looks similar to this:

```json
testChain: {
      url: "http://127.0.0.1:63196/ext/bc/2GAinA2PAEEEnuy1yTeqgqCbQWUGFTvUaiDSRiZgMrRRoLYs92/rpc",
      chainId: 12345,
      accounts: ["<YOUR-PRIVATE-KEY-HERE>"],
    }
```

## Next Step

After you feel comfortable moving forward, you should try it on the Fuji Testnet by following [this tutorial](./create-a-fuji-subnet.md).
