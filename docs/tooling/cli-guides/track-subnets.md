# Be a Subnet validator 

This page will guide you on how to have your node validate a Subnet! Currently, we are only 
supporting validating on Fuji network with Mainnet support coming in the near future!

:::warning

ALPHA WARNING: This command is currently in experimental mode. Proceed at your own risk.

:::

## Prerequisites

Before we begin, you will need to have:

- Created a Cloud Server node as described [here](/docs/tooling/cli-guides/create-a-validator.md)
- Node is bootstrapped to Primary Network (run `avalanche node status <clusterName> --bootstrapped` to check 
bootstrap status)
- Deployed Subnet on Fuji in local machine
- Stored key / Ledger with AVAX to pay for gas fess associated with adding node as Primary Network 
and Subnet Validator transactions. Instructions on how to fund stored key on Fuji can be found
[here](https://docs.avax.network/build/subnet/deploy/fuji-testnet-subnet#funding-the-key)

## Sync with Subnet

Before the node can be a Subnet Validator, the node needs to first sync with the Subnet. 

To sync with a Subnet, run:

```shell
avalanche node sync <clusterName> --subnet <subnetName>
```

All the nodes in cluster `clusterName` will now be syncing to subnet `subnetName`

Wait until node is successfully `Syncing` with the Subnet before running the next commands. 

To check sync status, run `avalanche node status <clusterName> --subnet <subnetName>`. Once the node is finished 
syncing, the response will be:

```text
{
    "jsonrpc": "2.0",
    "result": {
        "status": "Syncing"
    },
    "id": 1
}
``` 

## Be a Subnet Validator

Once the node has synced, we can now have the node be a Subnet Validator.

To be a Subnet Validator, run:

```shell
avalanche node join <clusterName> --subnet <subnetName>
```

If the node is not yet a Primary Network Validator, we will first add it as a Primary Network 
Validator. 

The wizard will ask us how we want to pay for the Add Primary Network transaction fee. 
We are going to choose `Use stored key` for Fuji:

```text
 Which key source should be used to pay transaction fees?:
  ▸ Use stored key
    Use ledger
```

Once you have selected the key to pay with, choose how many AVAX you would like to stake in the 
validator. Default is the minimum amount of AVAX that can be staked in a Fuji Network Validator.
More info regarding minimum staking amount in different networks can be found [here](https://docs.avax.network/nodes/validate/how-to-stake#fuji-testnet)

```text
 What stake weight would you like to assign to the validator?: 
  ▸ Default (1 AVAX)
    Custom
```

Next, choose how long the node will be validating for: 

```text
 How long should your validator validate for?: 
  ▸ Minimum staking duration on primary network
    Custom
```

We have set the start time for the node to be a Primary Network Validator to be in 1 minute.

Once all the inputs are completed you will see a transaction ID indicating that the node is now
a Primary Network Validator.

Next, we will wait for 1 minute for the node to officially start as a Primary Network Validator. 

We will then proceed with adding the node as a Subnet Validator. Similar to adding the node as a 
Primary Network Validator, the wizard will ask you for how you would like to pay for the transaction
fee. 

Once that is completed, you will be asked what stake you would like to assign the Subnet Validator: 

```text
 What stake weight would you like to assign to the validator?: 
  ▸ Default (20)
    Custom
```

Note that for this part, you are not staking actual AVAX in the validator. This is arbitrary 
weight that you are assigning the validator. You can learn more about the stake weight parameter in
[addSubnetValidator](/reference/avalanchego/p-chain/api.md#platformaddsubnetvalidator) under the
`weight` section.

Next, enter the start time for the node to start validating the Subnet and when you want the node 
to validate the Subnet until. 

Once all input is completed, you will another transaction ID indicating that the node is now a 
Subnet Validator. 

Once the start time that you chose for the node to be a Subnet Validator has elapsed, verify that 
the node is a subnet validator by running `avalanche node status <clusterName> 
--subnet <subnetName>`. 

You should see:

```text
{
    "jsonrpc": "2.0",
    "result": {
        "status": "Validating"
    },
    "id": 1
}
``` 
