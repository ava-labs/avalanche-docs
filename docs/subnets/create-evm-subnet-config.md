# How to Create an EVM-Based Subnet Configuration

To create an EVM-compatible subnet, you will create one using [Subnet-EVM](https://github.com/ava-labs/subnet-evm).

## Using the Subnet Creation Wizard

The Subnet Creation Wizard will walk you through the process of creating your subnet. To get started, pick a name for your Subnet and run

`avalanche subnet create <subnetName>`

The following sections will walk through each question in the wizard.

### Choose Your VM

Select `SubnetEVM`.

### Enter Your Subnet's ChainID

Choose a unique positive integer for your EVM-style ChainID. Visit [ChainList](https://chainlist.org/) to verify that your selection is indeed unique.

### Token Symbol

Enter a string to name your Subnet's native token. The token symbol does not necessarily need to be unique. Example token symbols are AVAX, JOE, and BTC.

### Subnet-EVM Version

Select `Use latest version`.

### Gas Fee Configuration

Select your fee configuration. We highly recommend `Low disk use / Low Throughput 1.5 mil gas/s (C-Chain's setting)`.

### Airdrop

For development subnets, select `Airdrop 1 million tokens to the default address (do not use in production)`.

When you are ready to start more mature testing, select `Customize your airdrop` to distribute funds to additional addresses.

### Precompiles

If you'd like to add precompiles to customize your subnet, select `Yes`.

If you don't or don't know what that means, select `No`.

### Wrapping Up

If all worked successfully, you will see `Successfully created subnet configuration`.

## Using a Custom Genesis

The Subnet Creation Wizard won't customize every aspect of the Subnet-EVM genesis for you. If you'd like complete control, you can specify a custom genesis by providing a path to the file you'd like to use. Run with:

`avalanche subnet create <subnetName> --file <filepath>`

## Overwriting an Existing Subnet Config

By default, creating a Subnet configuration with the same `subnetName` as one that already exists will fail. To overwrite an existing config, use the `-f` force flag:

`avalanche subnet create <existingSubnetName> -f`
