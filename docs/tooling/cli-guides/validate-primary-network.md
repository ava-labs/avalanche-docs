# Be a Subnet validator 

This page will guide you on how to have your node validate Primary Network! Currently, we are only 
supporting validating on Fuji network with Mainnet support coming in the near future!

:::warning

ALPHA WARNING: This command is currently in experimental mode. Proceed at your own risk.

:::

## Prerequisites

Before we begin, you will need to have:

- Created a Cloud Server node as described [here](/docs/tooling/cli-guides/create-a-validator.md)
- Node is bootstrapped to Primary Network (run `avalanche node status <clusterName>`to check 
bootstrap status)
- Stored key / Ledger with AVAX to pay for gas fess associated with adding node as Primary Network 
and Subnet Validator transactions. Instructions on how to fund stored key on Fuji can be found
[here](https://docs.avax.network/build/subnet/deploy/fuji-testnet-subnet#funding-the-key)

## Be a Primary Network Validator

Once the node is bootstrapped to Primary Network, we can now have the node be a Primary Network 
Validator.

To be a Primary Network Validator, run:

```shell
avalanche node validate primary <clusterName> 
```

We have set the start time for the node to be a Primary Network Validator to be in 20 seconds.

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
  ▸ Default (1.00 AVAX)
    Custom
```

Next, choose how long the node will be validating for: 

```text
 How long should your validator validate for?: 
  ▸ Minimum staking duration on primary network
    Custom
```

Once all the inputs are completed you will see a transaction ID indicating that the node will be
a Primary Network Validator once the start time has elapsed.