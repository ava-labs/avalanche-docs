---
tags: [Build, Subnets]
description: The WAGMI ("We're All Going to Make It") Subnet is a high throughput testbed for EVM (Ethereum Virtual Machine) optimizations. It is parameterized to run at a factor more capacity than Fuji/Mainnet C-Chain and will is used to experiment with release candidates before included in an official Coreth release.
sidebar_label: "Case Study: WAGMI Subnet"
pagination_label: "WAGMI Subnet"
sidebar_position: 1
---

# WAGMI Subnet

The WAGMI ("We're All Going to Make It") Subnet is a high throughput testbed for EVM (Ethereum
Virtual Machine) optimizations. It is parameterized to run at a factor more capacity than
Fuji/Mainnet C-Chain and will is used to experiment with release candidates before included
in an official Coreth release.

## Overview

This is one of the first cases of using Avalanche Subnets as a proving ground for changes in a
production VM (Coreth). Many underestimate how useful the isolation of Subnets is for performing
complex VM testing on a live network (without impacting the stability of the primary network).

We created a basic WAGMI Explorer [https://subnets-test.avax.network/wagmi](https://subnets-test.avax.network/wagmi)
that surfaces aggregated usage statistics about the Subnet.

- SubnetID: [28nrH5T2BMvNrWecFcV3mfccjs6axM1TVyqe79MCv2Mhs8kxiY](https://explorer-xp.avax-test.network/subnet/28nrH5T2BMvNrWecFcV3mfccjs6axM1TVyqe79MCv2Mhs8kxiY?tab=validators)
- ChainID: [2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt](https://testnet.avascan.info/blockchain/2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt)

### Network Parameters

- NetworkID: 11111
- ChainID: 11111
- Block Gas Limit: 20,000,000 (2.5x C-Chain)
- 10s Gas Target: 100,000,000 (~6.67x C-Chain)
- Min Fee: 1 Gwei (4% of C-Chain)
- Target Block Rate: 2s (Same as C-Chain)

The genesis file of WAGMI can be found [here](https://github.com/ava-labs/public-chain-assets/blob/1951594346dcc91682bdd8929bcf8c1bf6a04c33/chains/11111/genesis.json).

### Adding WAGMI to Core

```text
- Network Name: WAGMI
- RPC URL: [https://subnets.avax.network/wagmi/wagmi-chain-testnet/rpc]
- WS URL: wss://subnets.avax.network/wagmi/wagmi-chain-testnet/ws
- Chain ID: 11111
- Symbol: WGM
- Explorer: [https://subnets.avax.network/wagmi/wagmi-chain-testnet/explorer]
```

:::info

This can be used with other wallets too, such as MetaMask.

:::

## Case Study: WAGMI Upgrades

This case study uses [WAGMI](https://subnets-test.avax.network/wagmi) Subnet upgrade to show how a
network upgrade on an EVM-based (Ethereum Virtual Machine) Subnet can be done simply, and how the
resulting upgrade can be used to dynamically control fee structure on the Subnet.

### Introduction

[Subnet-EVM](https://github.com/ava-labs/subnet-evm) aims to provide an easy to use toolbox to
customize the EVM for your blockchain. It is meant to run out of the box for many Subnets without
any modification. But what happens when you want to add a new feature updating the rules of your
EVM?

Instead of hard coding the timing of network upgrades in client code like most EVM chains, requiring
coordinated deployments of new code, [Subnet-EVM
v0.2.8](https://github.com/ava-labs/subnet-evm/releases/tag/v0.2.8) introduces the long awaited
feature to perform network upgrades by just using a few lines of JSON in a configuration file.

### Network Upgrades: Enable/Disable Precompiles

Detailed description of how to do this can be found in [Customize a Subnet](/build/subnet/upgrade/customize-a-subnet.md#network-upgrades-enabledisable-precompiles) tutorial.
Here's a summary:

- Network Upgrade utilizes existing precompiles on the Subnet-EVM:
  - ContractDeployerAllowList, for restricting smart contract deployers
  - TransactionAllowList, for restricting who can submit transactions
  - NativeMinter, for minting native coins
  - FeeManager, for configuring dynamic fees
  - RewardManager, for enabling block rewards
- Each of these precompiles can be individually enabled or disabled at a given timestamp as a
  network upgrade, or any of the parameters governing its behavior changed.
- These upgrades must be specified in a file named `upgrade.json` placed in the same directory where
  [`config.json`](/build/subnet/upgrade/customize-a-subnet.md#avalanchego-chain-configs) resides: `{chain-config-dir}/{blockchainID}/upgrade.json`.

### Preparation

To prepare for the first WAGMI network upgrade, on August 15, 2022, we had announced on
[Twitter](https://twitter.com/AaronBuchwald/status/1559249414102720512) and shared on other social
media such as Discord.

For the second upgrade, on February 24, 2024, we had another announcement on [X](https://x.com/jceyonur/status/1760777031858745701?s=20).

### Deploying upgrade.json

The content of the `upgrade.json` is:

```json
{
  "precompileUpgrades": [
    {
      "feeManagerConfig": {
        "adminAddresses": ["0x6f0f6DA1852857d7789f68a28bba866671f3880D"],
        "blockTimestamp": 1660658400
      }
    },
    {
      "contractNativeMinterConfig": {
        "blockTimestamp": 1708696800,
        "adminAddresses": ["0x6f0f6DA1852857d7789f68a28bba866671f3880D"],
        "managerAddresses": ["0xadFA2910DC148674910c07d18DF966A28CD21331"]
      }
    }
  ]
}
```

With the above `upgrade.json`, we intend to perform two network upgrades:

1. The first upgrade is to activate the FeeManager precompile:
   - `0x6f0f6DA1852857d7789f68a28bba866671f3880D` is named as the new Admin of the FeeManager precompile.
   - `1660658400` is the [Unix timestamp](https://www.unixtimestamp.com/) for Tue Aug 16 2022 14:00:00 GMT+0000
     (future time when we made the announcement) when the new FeeManager change would take effect.
2. The second upgrade is to activate the NativeMinter precompile:
   - `0x6f0f6DA1852857d7789f68a28bba866671f3880D` is named as the new Admin of the NativeMinter precompile.
   - `0xadFA2910DC148674910c07d18DF966A28CD21331` is named as the new Manager of the NativeMinter precompile. Manager addresses are enabled after Durango upgrades which occurred on February 13, 2024.
   - `1708696800` is the [Unix timestamp](https://www.unixtimestamp.com/) for Fri Feb 23 2024 14:00:00 GMT+0000
     (future time when we made the announcement) when the new NativeMinter change would take effect.

Detailed explanations of feeManagerConfig can be found in [here](/build/subnet/upgrade/customize-a-subnet.md#configuring-dynamic-fees), and for the contractNativeMinterConfig in [here](/build/subnet/upgrade/customize-a-subnet.md#minting-native-coins).

We place the `upgrade.json` file in the chain config directory, which in our case is
`~/.avalanchego/configs/chains/2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt/`. After that, we
restart the node so the upgrade file is loaded.

When the node restarts, AvalancheGo reads the contents of the JSON file and passes it into
Subnet-EVM. We see a log of the chain configuration that includes the updated precompile upgrade. It
looks like this:

```text
INFO [02-22|18:27:06.473] <2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt Chain> github.com/ava-labs/subnet-evm/core/blockchain.go:335: Upgrade Config: {"precompileUpgrades":[{"feeManagerConfig":{"adminAddresses":["0x6f0f6da1852857d7789f68a28bba866671f3880d"],"blockTimestamp":1660658400}},{"contractNativeMinterConfig":{"adminAddresses":["0x6f0f6da1852857d7789f68a28bba866671f3880d"],"managerAddresses":["0xadfa2910dc148674910c07d18df966a28cd21331"],"blockTimestamp":1708696800}}]}
```

We note that `precompileUpgrades` correctly shows the upcoming precompile upgrades. Upgrade is locked
in and ready.

### Activations

When the time passed 10:00 AM EDT August 16, 2022 (Unix timestamp 1660658400), the `upgrade.json` had
been executed as planned and the new FeeManager admin address has been activated. From now on, we
don't need to issue any new code or deploy anything on the WAGMI nodes to change the fee structure.
Let's see how it works in practice!

For the second upgrade on February 23, 2024, the same process was followed. The `upgrade.json` had been
executed after Durango, as planned, and the new NativeMinter admin and manager addresses have been activated.

### Using Fee Manager

The owner `0x6f0f6DA1852857d7789f68a28bba866671f3880D` can now configure the fees on the Subnet as
they see fit. To do that, all that's needed is access to the network, the private key for the newly
set manager address and making calls on the precompiled contract.

We will use [Remix](https://remix.ethereum.org) online Solidity IDE and the [Core Browser
Extension](https://support.avax.network/en/articles/6066879-core-extension-how-do-i-add-the-core-extension).
Core comes with WAGMI network built-in. MetaMask will do as well but you will need to [add WAGMI](/build/subnet/info/wagmi.md#adding-wagmi-to-core) yourself.

First using Core, we open the account as the owner `0x6f0f6DA1852857d7789f68a28bba866671f3880D`.

Then we connect Core to WAGMI, Switch on the `Testnet Mode` in `Advanced` page in the hamburger menu:

![Core Testnet mode](/img/network-upgrade/core-testnet-mode.png)

And then open the `Manage Networks` menu in the networks dropdown. Select WAGMI there by clicking
the star icon:

![Core network selection](/img/network-upgrade/core-network-select.png)

We then switch to WAGMI in the networks dropdown. We are ready to move on to Remix now, so we open
it in the browser. First, we check that Remix sees the extension and correctly talks to it. We
select `Deploy & run transactions` icon on the left edge, and on the Environment dropdown, select
`Injected Provider`. We need to approve the Remix network access in the Core browser extension. When
that is done, `Custom (11111) network` is shown:

![Injected provider](/img/network-upgrade/remix-injected-provider.png)

Good, we're talking to WAGMI Subnet. Next we need to load the contracts into Remix. Using 'load from
GitHub' option from the Remix home screen we load two contracts:

- [IAllowList.sol](https://github.com/ava-labs/subnet-evm/blob/master/contracts/contracts/interfaces/IAllowList.sol)
- and
  [IFeeManager.sol](https://github.com/ava-labs/subnet-evm/blob/master/contract/contracts/interfaces/IFeeManager.sol).

IFeeManager is our precompile, but it references the IAllowList, so we need that one as well. We
compile IFeeManager.sol and use deployed contract at the precompile address
`0x0200000000000000000000000000000000000003` used on the
[Subnet](https://github.com/ava-labs/subnet-evm/blob/master/precompile/contracts/feemanager/module.go#L21).

![Deployed contract](/img/network-upgrade/deployed-contract.png)

Now we can interact with the FeeManager precompile from within Remix via Core. For example, we can
use the `getFeeConfig` method to check the current fee configuration. This action can be performed
by anyone as it is just a read operation.

Once we have the new desired configuration for the fees on the Subnet, we can use the `setFeeConfig`
to change the parameters. This action can **only** be performed by the owner
`0x6f0f6DA1852857d7789f68a28bba866671f3880D` as the `adminAddress` specified in the [`upgrade.json` above](#deploying-upgradejson).

![setFeeConfig](/img/network-upgrade/setFeeConfig.png)

When we call that method by pressing the `transact` button, a new transaction is posted to the
Subnet, and we can see it on [the
explorer](https://subnets-test.avax.network/wagmi/block/0xad95ccf04f6a8e018ece7912939860553363cc23151a0a31ea429ba6e60ad5a3):

![transaction](/img/network-upgrade/wagmi-tx.png)

Immediately after the transaction is accepted, the new fee config takes effect. We can check with
the `getFeeCofig` that the values are reflected in the active fee config (again this action can be
performed by anyone):

![getFeeConfig](/img/network-upgrade/getFeeConfig.png)

That's it, fees changed! No network upgrades, no complex and risky deployments, just making a simple
contract call and the new fee configuration is in place!

### Using NativeMinter

For the NativeMinter, we can use the same process to connect to the Subnet and interact with the
precompile. We can load INativeMinter interface using 'load from
GitHub' option from the Remix home screen with following contracts:

- [IAllowList.sol](https://github.com/ava-labs/subnet-evm/blob/master/contracts/contracts/interfaces/IAllowList.sol)
- and
  [INativeMinter.sol](https://github.com/ava-labs/subnet-evm/blob/master/contracts/contracts/interfaces/INativeMinter.sol).

We can compile them and interact with the deployed contract at the precompile address
`0x0200000000000000000000000000000000000001` used on the
[Subnet](https://github.com/ava-labs/subnet-evm/blob/master/precompile/contracts/nativeminter/module.go#L22).

![Deployed contract](/img/network-upgrade/deploy-minter.png)

The native minter precompile is used to mint native coins to specified addresses. The minted coins is added to the current supply and can be used by the recipient to pay for gas fees.
For more information about the native minter precompile see [here](/build/subnet/upgrade/customize-a-subnet.md#minting-native-coins).

`mintNativeCoin` method can be only called by enabled, manager and admin addresses. For this upgrade we have added both an admin and a manager address in [`upgrade.json` above](#deploying-upgradejson). The manager address was available after Durango upgrades which occurred on February 13, 2024. We will use the manager address `0xadfa2910dc148674910c07d18df966a28cd21331` to mint native coins.

![mintNativeCoin](/img/network-upgrade/mintNativeCoin.png)

When we call that method by pressing the `transact` button, a new transaction is posted to the
Subnet, and we can see it on [the
explorer](https://subnets-test.avax.network/wagmi/tx/0xc4aaba7b5863c1b8f6664ac1d483e2d7d392ab58d1a8feb0b6c318cbae7f1e93):

![tx](/img/network-upgrade/mint-tx-result.png)

As a result of this transaction, the native minter precompile minted a new native coin (1 WGM) to the recipient address `0xB78cbAa319ffBD899951AA30D4320f5818938310`. The address page on the explorer [here](https://subnets-test.avax.network/wagmi/address/0xB78cbAa319ffBD899951AA30D4320f5818938310) shows no incoming transaction; this is because the 1 WGM was directly minted by the EVM itself, without any sender.

### Conclusion

Network upgrades can be complex and perilous procedures to carry out safely. Our continuing efforts
with Subnets is to make upgrades as painless and simple as possible. With the powerful combination
of stateful precompiles and network upgrades via the upgrade configuration files we have managed to
greatly simplify both the network upgrades and network parameter changes. This in turn enables much
safer experimentation and many new use cases that were too risky and complex to carry out with
high-coordination efforts required with the traditional network upgrade mechanisms.

We hope this case study will help spark ideas for new things you may try on your own. We're looking
forward to seeing what you have built and how easy upgrades help you in managing your Subnets! If
you have any questions or issues, feel free to contact us on our
[Discord](https://chat.avalabs.org). Or just reach out to tell us what exciting new things you have
built!
