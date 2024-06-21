---
tags: [Tooling, Avalanche-CLI]
description: This how-to guide focuses on deploying Teleporter Token Bridge to a local Avalanche network.
sidebar_label: Teleporter Token Bridge On a Local Network
pagination_label: Teleporter Token Bridge On a Local Network
sidebar_position: 3
---
# Teleporter Token Bridge

Teleporter Token Bridge enables users to transfer tokens between Subnets. The bridge is a set of 
smart contracts that are deployed across multiple Subnets, and leverages Teleporter for cross-chain 
communication.

For more information on Teleporter Token Bridge, check:

- [Teleporter Token Bridge README](https://github.com/ava-labs/teleporter-token-bridge)

# How to Deploy Teleporter Token Bridge on a Local Network

This how-to guide focuses on deploying Teleporter Token Bridge on a local Avalanche network.

After this tutorial, you would have learned how to transfer an ERC-20 token between two 
Teleporter-enabled Subnets and between C-Chain and a Teleporter-enabled Subnet.

## Prerequisites

For our example, you will first need to create and deploy a Teleporter-enabled Subnet in Local
Network. We will name our Subnet `testSubnet`.

- To create a Teleporter-enabled Subnet configuration, [visit here](/tooling/cli-cross-chain/teleporter-on-local-networks.md#create-subnet-configurations)
- To deploy a Teleporter-enabled Subnet, [visit here](/tooling/cli-cross-chain/teleporter-on-local-networks.md#deploy-the-subnets-to-local-network)

## Deploy ERC-20 Token in C-Chain

First, let's create an ERC-20 Token and deploy it to C-Chain. For our example, it will be called 
TOK. 

Sample script to deploy the ERC-20 Token can be found [here](https://github.com/ava-labs/avalanche-cli/tree/add-deploy-script/deploy_erc20). 
Note that you will need to modify the script [here](https://github.com/ava-labs/avalanche-cli/blob/add-deploy-script/deploy_erc20/deploy_erc20.sh#L17)
based on where you place the deploy script directory in your environment.

Prior to executing the script, you will first need to [install Foundry](https://book.getfoundry.sh/getting-started/installation) 
in your environment.

To deploy the ERC-20 Token to C-Chain, we will call: 

```bash
./deploy_erc20/deploy_erc20.sh c-chain

Deploying to http://127.0.0.1:9650/ext/bc/C/rpc
Compiling...
Compiling 5 files with Solc 0.8.18
Solc 0.8.18 finished in 750.65ms
Compiler run successful!
Deployer: 0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC
Deployed to: 0x5DB9A7629912EBF95876228C24A848de0bfB43A9
Transaction hash: 0xfc5f58885634d42648cde4eed415b2bcb3e56e571d7412d4e98e03ed3e155b7c
```

When the command is run, our EWOQ address `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC` would have 
received 100000 TOK tokens in C-Chain. 

Note that `0x5DB9A7629912EBF95876228C24A848de0bfB43A9` is our ERC-20 Token address, which we will 
use in our next command.

## Deploy Teleporter Token Bridge 

Next, we will now deploy Teleporter Token Bridge to our Local Network, where we will deploy
the Home Contract to C-Chain and the Remote Contract to our Subnet.

```bash
avalanche teleporter bridge deploy 
✔ Local Network
✔ C-Chain
✔ Deploy a new Home for the token
✔ An ERC-20 token
Enter the address of the ERC-20 Token: 0x5DB9A7629912EBF95876228C24A848de0bfB43A9
✔ Subnet testSubnet
Downloading Bridge Contracts
Compiling Bridge

Home Deployed to http://127.0.0.1:9650/ext/bc/C/rpc
Home Address: 0x4Ac1d98D9cEF99EC6546dEd4Bd550b0b287aaD6D

Remote Deployed to http://127.0.0.1:9650/ext/bc/2TnSWd7odhkDWKYFDZHqU7CvtY8G6m46gWxUnhJRNYu4bznrrc/rpc
Remote Address: 0x7DD1190e6F6CE8eE13C08F007FdAEE2f881B45D0
```

Before we transfer our ERC-20 token from C-Chain to our Subnet, we will first call `avalanche key
list` command to check our initial balances in C-Chain and Subnet. 

We will inquire the balances of our ERC-20 Token TOK both in C-Chain and our Subnet, which has the 
address of `0x5DB9A7629912EBF95876228C24A848de0bfB43A9` in the C-Chain and address of
`0x7DD1190e6F6CE8eE13C08F007FdAEE2f881B45D0` in our Remote contract.

```bash
avalanche key list --local --keys ewoq,subnet_testSubnet_airdrop --subnets c,testSubnet --tokens 0x5DB9A7629912EBF95876228C24A848de0bfB43A9,0x7DD1190e6F6CE8eE13C08F007FdAEE2f881B45D0
+--------+--------------------+---------+--------------------------------------------+---------------+-----------------+---------------+
|  KIND  |        NAME        | SUBNET     |                  ADDRESS                   |     TOKEN     |     BALANCE     |    NETWORK    |
+--------+--------------------+---------+--------------------------------------------+---------------+-----------------+---------------+
| stored | ewoq               | testSubnet | 0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC | TOK (0x7DD1.) |               0 | Local Network |
+        +                    +---------+--------------------------------------------+---------------+-----------------+---------------+
|        |                    | C-Chain    | 0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC | TOK (0x5DB9.) | 100000.000000000| Local Network |
+        +--------------------+---------+--------------------------------------------+---------------+-----------------+---------------+
|        | subnet_testSubnet  | testSubnet | 0x5a4601D594Aa3848cA5EE0770b7883d3DBC666f6 | TOK (0x7DD1.) |               0 | Local Network |
+        + _airdrop           +---------+--------------------------------------------+---------------+-----------------+---------------+
|        |                    | C-Chain    | 0x5a4601D594Aa3848cA5EE0770b7883d3DBC666f6 | TOK (0x5DB9.) |               0 | Local Network |
+--------+--------------------+---------+--------------------------------------------+---------------+-----------------+---------------+
```

## Transfer The Token From C-Chain To Our Subnet

Now we will transfer 100 TOK tokens from our ewoq address in C-Chain to subnet_testSubnet_airdrop
address in our Subnet `testSubnet`. Note that we will be using the Home address `0x4Ac1d98D9cEF99EC6546dEd4Bd550b0b287aaD6D`
and Remote address `0x7DD1190e6F6CE8eE13C08F007FdAEE2f881B45D0`.

```bash
avalanche key transfer
✔ Local Network
✔ C-Chain
✔ Subnet testSubnet
Enter the address of the Bridge on c-chain: 0x4Ac1d98D9cEF99EC6546dEd4Bd550b0b287aaD6D
Enter the address of the Bridge on testSubnet: 0x7DD1190e6F6CE8eE13C08F007FdAEE2f881B45D0
✔ ewoq
✔ Key
✔ subnet_testSubnet_airdrop
Amount to send (TOKEN units): 100
```

## Verify That Transfer Is Successful

We will call `avalanche key list` command again to verify that the transfer is successful.

`subnet_testSubnet_airdrop` should now have 100 TOK tokens in our Subnet `testSubnet` and our EWOQ
account now has 99900 TOK tokens in C-Chain.

```bash
avalanche key list --local --keys ewoq,subnet_testSubnet_airdrop --subnets c,testSubnet --tokens 0x5DB9A7629912EBF95876228C24A848de0bfB43A9,0x7DD1190e6F6CE8eE13C08F007FdAEE2f881B45D0
+--------+--------------------+---------+--------------------------------------------+---------------+-----------------+---------------+
|  KIND  |        NAME        | SUBNET     |                  ADDRESS                   |     TOKEN     |     BALANCE     |    NETWORK    |
+--------+--------------------+---------+--------------------------------------------+---------------+-----------------+---------------+
| stored | ewoq               | testSubnet | 0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC | TOK (0x7DD1.) |               0 | Local Network |
+        +                    +---------+--------------------------------------------+---------------+-----------------+---------------+
|        |                    | C-Chain    | 0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC | TOK (0x5DB9.) | 99900.000000000 | Local Network |
+        +--------------------+---------+--------------------------------------------+---------------+-----------------+---------------+
|        | subnet_testSubnet  | testSubnet | 0x5a4601D594Aa3848cA5EE0770b7883d3DBC666f6 | TOK (0x7DD1.) |   100.000000000 | Local Network |
+        + _airdrop           +---------+--------------------------------------------+---------------+-----------------+---------------+
|        |                    | C-Chain    | 0x5a4601D594Aa3848cA5EE0770b7883d3DBC666f6 | TOK (0x5DB9.) |               0 | Local Network |
+--------+--------------------+---------+--------------------------------------------+---------------+-----------------+---------------+
```

And that's it! You have now successfully completed your first transfer from C-Chain to Subnet 
using Teleporter Token Bridge!