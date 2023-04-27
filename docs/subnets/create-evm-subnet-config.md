# How to Create an EVM-Based Subnet Configuration

To create an Ethereum Virtual Machine (EVM) compatible Subnet, Avalanche-CLI
runs [Subnet-EVM](https://github.com/ava-labs/subnet-evm) as its virtual machine.

## Prerequisites

- [Avalanche-CLI installed](install-avalanche-cli)

## Using the Subnet Creation Wizard

The Subnet Creation Wizard walks you through the process of creating your Subnet. To get started,
pick a name for your Subnet and run

```shell
avalanche subnet create <subnetName>
```

The following sections walk through each question in the wizard.

### Choose Your VM

Select `SubnetEVM`.

### Enter Your Subnet's ChainID

Choose a unique positive integer for your EVM-style ChainID. Visit
[chainlist](https://chainlist.org/) to verify that your selection is indeed unique.

### Token Symbol

Enter a string to name your Subnet's native token. The token symbol doesn't necessarily need to be
unique. Example token symbols are AVAX, JOE, and BTC.

### Subnet-EVM Version

Select `Use latest version`.

### Gas Fee Configuration

Select your fee configuration. The Ava Labs team highly recommends
`Low disk use / Low Throughput 1.5 mil gas/s (C-Chain's setting)`.

### Airdrop

For development Subnets, select `Airdrop 1 million tokens to the default address (do not use in production)`.

When you are ready to start more mature testing, select `Customize your airdrop` to distribute
funds to additional addresses.

### Precompiles

If you'd like to add precompiles to customize your Subnet, select `Yes`.

If you don't or don't know what that means, select `No`.

### Wrapping Up

If the command works successfully, it prints `Successfully created subnet configuration`.

## Using a Custom Genesis

The Subnet Creation Wizard won't customize every aspect of the Subnet-EVM genesis for you. If
you'd like complete control, you can specify a custom genesis by providing a path to the file
you'd like to use. This bypasses most of the wizard's prompts. Run with:

```shell
avalanche subnet create <subnetName> --genesis <filepath>
```

## Overwriting an Existing Subnet Config

By default, creating a Subnet configuration with the same `subnetName` as one that already exists
fails. To overwrite an existing config, use the `-f` force flag:

```shell
avalanche subnet create <existingSubnetName> -f
```
