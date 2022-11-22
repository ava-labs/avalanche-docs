# How to Deploy a Subnet on a Local Network

This how-to guide focuses on taking an already created Subnet configuration and deploying it to a local Avalanche network.

## Prerequisites

- [`Avalanche-CLI`](https://github.com/ava-labs/avalanche-cli) installed
- You have [created a Subnet configuration](create-evm-subnet-config)

## Deploying Subnets Locally

In the following commands, make sure to substitute the name of your Subnet configuration for `<subnetnName>`.

To deploy your subnet, run

`avalanche subnet deploy <subnetName>`

and select `Local Network` to deploy on. Alternatively, you can bypass this prompt by providing the `--local` flag. For example:

`avalanche subnet deploy <subnetName> --local`

The command may take a couple minutes to run.

### Results

If all works as expected, the command output should look something like this:

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

You can use the deployment details to connect to and interact with your subnet.

To manage the newly deployed local Avalanche network, see [the `avalanche network` command tree](reference-cli-commands#network).

### Deploying multiple Subnets

You may deploy multiple subnets concurrently, but you cannot deploy the same subnet multiple times without resetting all deployed subnet state.

## Redeploying the Subnet

To redeploy the subnet, you first need to wipe the subnet state. This will permanently delete all data from all locally deployed subnets. To do so, run

`avalanche network clean`

You are now free to redeploy your subnet with

`avalanche subnet deploy <subnetName> --local`.
