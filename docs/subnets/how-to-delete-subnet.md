# How to delete a Subnet

## Deleting a Subnet configuration

To delete a created Subnet configuration, run

`avalanche subnet delete <subnetName>`

## Deleting a deployed Subnet

You can't delete Subnets deployed to Mainnet or the Fuji Testnet.

However, you may delete Subnets deployed to a local network by cleaning the network state with

```shell
avalanche network clean
```
