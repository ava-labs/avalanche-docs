# Private & Permissioned Subnets

In this tutorial, we'll discuss how to set up a Subnet to make it private and permissioned in various levels of privacy.

# Table of contents

- [Introduction](#introduction)
  - [Prerequisites](#prerequisites)
  - [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Private Subnet](#private-subnet)
  - [Subnet config file (example)](#subnet-config-file-example)
- [Subnet Permissions](#subnet-permissions)
  - [Control of validator requirements](#control-of-validator-requirements)
  - [Control of contract deployment](#control-of-contract-deployment)
- [Private transactions](#)
- [Subnet Privacy](#subnet-privacy)
  - [Posting private transactions](#posting-private-transactions)
  - [Reading private transactions](#reading-private-transactions)
- [Conclusion](#conclusion)
  - [Recap of what we learned](#recap-of-what-we-learned)
  - [Possible use-cases](#possible-use-cases)
  - [Recommended resources](#recommended-resources)

## Introduction

Understand how to modify the configuration of your subnet.

:::tip

__Did you know? —__ Successful attacks on “blockchain bridges” have become increasingly common over the past couple of years, and the situation with Ronin is a prominent reminder of the urgency of the problem.
:::

### Prerequisites

- Basic understanding of [Git](https://git-scm.com/)
- Basic knowledge of the Avalanche command-line tools:
  - [__Avalanche-CLI
__](https://github.com/ava-labs/avalanche-cli)
  - [__Subnet-CLI
__](https://github.com/ava-labs/subnet-cli)
- Basic understanding of JSON files

To get started with these topics or for a comprehensive review, see the [Recommended Resources](#recommended-resources) to learn more.

### Requirements

- __Ubuntu__ &gt;=v20.04 _(LTS)_
- _(Optional)_ [__Avalanche Network Runner__](https://github.com/ava-labs/avalanche-network-runner)  
_A tool for running a local Avalanche network_

👇 __Watch a short walk-through of what we'll cover in this tutorial__ 👇

[![Sample](assets/intro.gif)](assets/intro.webm)

__↳__ [___click here to watch the full-screen Introduction video___](assets/intro.webm) &nbsp; 👀 🍿

## Getting Started

Sometimes you would rather NOT make your subnet available to the general public. It is possible to provide parameters for a subnet. Parameters here apply to all chains in the specified subnet.

> Avalanche Subnets are public by default. It means that every node can sync and listen ongoing transactions/blocks in subnets, even they're not validating the listened subnet.

AvalancheGo looks for files specified with `{subnetID}.json` under `--subnet-config-dir` as documented [here](https://docs.avax.network/nodes/maintain/avalanchego-config-flags#subnet-configs).

__A Subnet can customized by setting parameters for the following:__

- Validator-only communication to create a private Subnet
- Consensus
- Gossip

See [here](/subnets/customize-a-subnet) for more info.

## Private Subnet

[__Avalanche Subnets__](https://docs.avax.network/subnets) are public by default. This means that every node can sync and listen to ongoing transactions/blocks in Subnets, even if they're not validating the listened Subnet.

Here we learn how to provide parameters for Subnets. Parameters will apply to all chains across the specified Subnet. Parameters must be specified with a `{subnetID}.json` config file under `--subnet-config-dir`.

For more information, you can reference [AvalancheGo Config and Flags](/nodes/maintain/avalanchego-config-flags#subnet-configs).

### Subnet config file _(example)_

```json
{
  "validatorOnly": true,
  "consensusParameters": {
    "k": 25,
    "alpha": 18
  },
  "appGossipNonValidatorSize": 10
}
```

#### validatorOnly

`Type: Boolean`

When set to `true`, this node __DOES NOT__ expose Subnet blockchain contents to non-Validators via P2P messages.  
_(Defaults to false)_

Subnet Validators can choose not to publish contents of blockchains via this configuration. If a node sets `validatorOnly` to `true`, the node will exchange messages __ONLY__ with other Validators of the Subnet. Non-validating peers will __NOT__ be able to learn the contents of this Subnet from this node.

:::caution

__Yuu should know! — `validatorOnly`__ is a node-specific configuration. Every Validator of this Subnet has to use this configuration in order to effectively create a __100% Private Subnet.__
:::

## Subnet Permissions

Subnets allow you to set permissions, based on address. Currently you can limit:

1. Who can deploy a contract to a Subnet.
2. Who can execute a contract on a Subnet.

### Control of validator requirements

Subnets allow you to set permissions, based on address. Currently you can limit:

- Geographic location
- KYC

### Control of contract deployment

It is very common for Subnets to restrict whom can deploy a contract. This can allow for a single authority to maintain 100% control of all activities.

## Subnet Privacy

Hiding information on a blockchain is a non-standard practice. Typcially, ALL information contained in a blockchain is "public".

### Posting private transactions

Subnets allow you to restrict whom can __Write__ transaction data. Currently, this can be restricted to Validators ONLY.

__Setting up MetaMask__

![MetaMask Setup](assets/metamask-setup-01.png)

__Your Subnet Settings:__

| Info | Value |
|---|---|
| Network Name | Your Subnet Name |
| New RPC URL | https://127.0.0.1:&lt;port&gt;/ext/bc/&lt;SubnetId&gt;/rpc |
| ChainID | 13370 |
| Symbol | MYSUB |
| Explorer | _(empty)_ |

__FUJI Testnet Settings:__

| Info | Value |
|---|---|
| Network Name | Avalanche FUJI C-Chain |
| New RPC URL | https://api.avax-test.network/ext/bc/C/rpc |
| ChainID | 43113 |
| Symbol | C-AVAX |
| Explorer | https://testnet.snowtrace.io |

You can request test coins from this [faucet](https://faucet.avax.network/).

### Reading private transactions

Subnets allow you to restrict whom can __Read__ transaction data. Currently, this can be restricted to Validators ONLY.

## Conclusion

Well done, you made it!  
💯 🔥 👏 🎊

That’s the entire implementation of a Private Subnet.

### Recap of what we learned

1. How to set Validator requirements _(eg. message sharing)_
2. How to restrict Contract deployment
3. How to read &amp; post private transactions

### Possible use-cases

Don't stop here!

Now it's time to apply what we've learned today.

__You may want to:__

1. Restrict contract deployment to your "white-listed" partners
2. Create a trustless data network across your global business centers

### Recommended resources

- [__Developer Documents__](http://docs.avax.network/)  
  _Tap into the official Avalanche documentation_
- [__Discord__](http://chat.avax.network/)  
  _Join the official Avalanche Discord_

If you want to know more about Avalanche, here's a bunch of links for you:

[Website](https://avax.network/) | [Whitepapers](https://avalabs.org/whitepapers)
| [Twitter](https://twitter.com/avalancheavax) | [Discord](https://chat.avalabs.org/)
| [GitHub](https://github.com/ava-labs) | [Documentation](https://docs.avax.network/)
| [Forum](https://forum.avax.network/) | [Telegram](https://t.me/avalancheavax) | [Facebook](https://facebook.com/avalancheavax)
| [LinkedIn](https://linkedin.com/company/avalancheavax) | [Reddit](https://reddit.com/r/avax)
| [YouTube](http://www.youtube.com/c/AVALabsOfficial)
