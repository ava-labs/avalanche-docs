# Network Upgrade

This tutorial uses [WAGMI](https://subnets-test.avax.network/wagmi) as a case study to show how to do network upgrade on an EVM-based Subnet.

## Introduction

[Subnet-EVM](https://github.com/ava-labs/subnet-evm) aims to provide an easy to use toolbox to customize the EVM for your blockchain. It is meant to run out of the box for many subnets without any modification. But what happens when you want to add a new feature updating the rules of your EVM?

Instead of hardcoding the timing of network upgrades like most EVM chains, [Subnet-EVM v0.2.8](https://github.com/ava-labs/subnet-evm/releases/tag/v0.2.8) introduces the long awaited feature to perform network upgrades by just using a few lines of JSON.

### WAGMI

The WAGMI ("We're All Going to Make It") Subnet Demo is a high throughput testbed for EVM (Ethereum Virtual Machine) optimizations. It is parameterized to run at a factor more capacity than Fuji/Mainnet C-Chain and will be used to experiment with release candidates before they make it into an official coreth release.

#### Network Parameters

- Network ID: 11111
- Chain ID: 11111
- Block Gas Limit: 20,000,000 (2.5x C-Chain)
- 10s Gas Target: 100,000,000 (~6.67x C-Chain)
- Min Fee: 1 GWei (4% of C-Chain)
- Target Block Rate: 2s (Same as C-Chain)

Genesis file of WAGMI can be found [here](https://github.com/ava-labs/subnet-evm/blob/master/networks/11111/genesis.json).

### Network Upgrades: Enable/Disable Precompiles

Detailed description of how to do this can be found [here](./customize-a-subnet.md#network-upgrades-enabledisable-precompiles). Here is a summary:

- Network Upgrade utilizes existing precompile on the Subnet-EVM:
  - Restricting Smart Contract Deployers
  - Restricting Who Can Submit Transactions
  - Minting Native Coins
  - Configuring Dynamic Fees
- Each of these precomiples can be individually enabled or disabled at a given timestamp as a network upgrade.
- These upgrades must be specified in a file named `upgrade.json` placed in the same directory where [`config.json`](#chain-configs) resides: `{chain-config-dir}/{blockchainID}/upgrade.json`.

## Preparation

To prepare for the WAGMI network upgrade, on 08/15/2022, we had announced on [Twitter](https://twitter.com/AaronBuchwald/status/1559249414102720512) and shared on other social media such as Discord, with the following information:

> With subnet-evm v0.2.8 It's time for a whole new Subnet Season: Network Upgrade Edition.
>
> Like every great show, we're kicking this season off with a pilot episode: WAGMI Network Upgrade.
>
> Stay tuned because this pilot is literally a can't miss for every WAGMI node 😉

> The upgrade will activate the fee config manager, and enable smooth fee config updates in the future
> https://docs.avax.network/subnets/customize-a-subnet#configuring-dynamic-fees
>
> This upgrade changes how blocks are processed on WAGMI, so every WAGMI node needs to upgrade to continue to validate WAGMI correctly.

> In order to update your node, you need to update to subnet-evm v0.2.8 and follow the instructions to enable a stateful precompile on subnet-evm here: https://docs.avax.network/subnets/customize-a-subnet#network-upgrades-enabledisable-precompiles
>
> You can find the JSON to configure the network upgrade in this gist: https://gist.github.com/aaronbuchwald/b3af9da34678f542ce31717e7963085b

> TLDR; you will need to place the JSON file into your node's file directory within chain-config-dir/wagmi blockchainID/upgrade.json and restart your node.
>
> Note: the WAGMI blockchainID is 2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt.

### upgrade.json

The content of the `upgrade.json` is:

```json
{
  "precompileUpgrades": [
    {
      "feeManagerConfig": {
        "adminAddresses": ["0x6f0f6DA1852857d7789f68a28bba866671f3880D"],
        "blockTimestamp": 1660658400
      }
    }
  ]
}
```

Detailed explanation of feeManagerConfig can be found [here](./customize-a-subnet.md#configuring-dynamic-fees).

With the above `upgrade.json`, we intend to change the `adminAddresses` at timestamp `1660658400`:

- `0x6f0f6DA1852857d7789f68a28bba866671f3880D` is named as the new Admin of the ContractDeployerAllowList
- `1660658400` is the unix timestamp for 10:00 AM EDT 08/16/2022 (future time when we made the announcement) when the new FeeManager would take effect.

> When your node restarts, AvalancheGo reads the contents of the JSON file and passes it into subnet-evm. You should see a log of the chain configuration that includes the updated precompile upgrade that looks like this:

```
INFO [08-15|15:09:36.772] <2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt Chain>
github.com/ava-labs/subnet-evm/eth/backend.go:155: Initialised chain configuration
config=“{ChainID: 11111 Homestead: 0 EIP150: 0 EIP155: 0 EIP158: 0 Byzantium: 0
Constantinople: 0 Petersburg: 0 Istanbul: 0, Muir Glacier: 0, Subnet EVM: 0, FeeConfig:
{\“gasLimit\“:20000000,\“targetBlockRate\“:2,\“minBaseFee\“:1000000000,\“targetGas\
“:100000000,\“baseFeeChangeDenominator\“:48,\“minBlockGasCost\“:0,\“maxBlockGasCost\
“:10000000,\“blockGasCostStep\“:500000}, AllowFeeRecipients: false, NetworkUpgrades: {\
“subnetEVMTimestamp\“:0}, PrecompileUpgrade: {}, UpgradeConfig: {\“precompileUpgrades\“:
[{\“feeManagerConfig\“:{\“adminAddresses\“:[\
“0x6f0f6da1852857d7789f68a28bba866671f3880d\“],\“blockTimestamp\“:1660658400}}]},
Engine: Dummy Consensus Engine}”
```

## Activation

When the time passed 10:00 AM EDT 08/16/2022 (unix timestamp 1660658400), the `upgrade.json` had been executed as planned.

## Config Fee

The owner `0x6f0f6DA1852857d7789f68a28bba866671f3880D` can now configure the fee as they see fit.

- Connect MetaMask to WAGMI with info [here](./wagmi.md#adding-wagmi-to-metamask).
- Open Remix: https://remix.ethereum.org/#optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.7+commit.e28d00a7.js
- Create files for IAllowList.sol and IFeeManager.sol from subnet-evm under `contracts` and copy + paste following contents respectively:
  - https://github.com/ava-labs/subnet-evm/blob/master/contract-examples/contracts/IAllowList.sol
  - https://github.com/ava-labs/subnet-evm/blob/master/contract-examples/contracts/IFeeManager.sol
  - Need both since IFeeManager references IAllowList
- Compile IFeeManager.sol
- Deploy IFeeManager at the precompile address:

  - https://github.com/ava-labs/subnet-evm/blob/master/precompile/params.go#L42
  - 0x0200000000000000000000000000000000000003

- Now you can interact with the FeeManager precompile from within Remix + MetaMask
- Read the allow list for different addresses to confirm most basic way
  - Admin address (yours): 0x6f0f6DA1852857d7789f68a28bba866671f3880D
  - Non-admin address: 0xb1173cccaa72345648856ea026D72EEDF9f0B83b (one of my test addresses)
- Use getFeeConfig to see the current configuration
- Call setFeeConfig and getFeeConfig
  - Current config: https://github.com/ava-labs/subnet-evm/blob/master/networks/11111/genesis.json
  - I’d recommend cutting the target gas and gas limit in half, experimenting, and then putting it back if you want to keep it at the current setting or leaving/playing around more depending on what you want the fees to be

![](/img/network-upgrade/deployed-contract.png)

![](/img/network-upgrade/getFeeConfig.png)

![](/img/network-upgrade/iFeeManager.png)

![](/img/network-upgrade/setFeeConfig.png)

![](/img/network-upgrade/wagmi-tx.png)
