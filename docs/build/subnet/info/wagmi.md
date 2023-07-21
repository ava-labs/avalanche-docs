---
tags: [Build, Subnets]
description: The WAGMI ("We're All Going to Make It") Subnet is a high throughput testbed for EVM (Ethereum Virtual Machine) optimizations. It is parameterized to run at a factor more capacity than Fuji/Mainnet C-Chain and will is used to experiment with release candidates before included in an official Coreth release.
sidebar_label: "Case Study: WAGMI Subnet"
pagination_label: "Case Study: WAGMI Subnet"
sidebar_position: 0
---
# Case Study: WAGMI Subnet

The WAGMI ("We're All Going to Make It") Subnet is a high throughput testbed for EVM (Ethereum
Virtual Machine) optimizations. It is parameterized to run at a factor more capacity than
Fuji/Mainnet C-Chain and will is used to experiment with release candidates before included
in an official Coreth release.

## Network Parameters

- NetworkID: 11111
- ChainID: 11111
- Block Gas Limit: 20,000,000 (2.5x C-Chain)
- 10s Gas Target: 100,000,000 (~6.67x C-Chain)
- Min Fee: 1 Gwei (4% of C-Chain)
- Target Block Rate: 2s (Same as C-Chain)

Genesis file of WAGMI can be found [here](https://github.com/ava-labs/public-chain-assets/blob/main/chains/11111/genesis.json).

This is one of the first cases of using Avalanche Subnets as a proving ground for changes in a
production VM (Coreth). Many underestimate how useful the isolation of Subnets is for performing
complex VM testing on a live network (without impacting the stability of the primary network).

We created a basic WAGMI Explorer [https://subnets-test.avax.network/wagmi](https://subnets-test.avax.network/wagmi)
that surfaces aggregated usage statistics about the Subnet.

## Subnet Info

- SubnetID: [28nrH5T2BMvNrWecFcV3mfccjs6axM1TVyqe79MCv2Mhs8kxiY](https://explorer-xp.avax-test.network/subnet/28nrH5T2BMvNrWecFcV3mfccjs6axM1TVyqe79MCv2Mhs8kxiY?tab=validators)
- ChainID: [2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt](https://testnet.avascan.info/blockchain/2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt)

## Adding WAGMI to Core

```text
- Network Name: WAGMI
- RPC URL: <https://subnets.avax.network/wagmi/wagmi-chain-testnet/rpc>
- WS URL: wss://subnets.avax.network/wagmi/wagmi-chain-testnet/ws
- Chain ID: 11111
- Symbol: WGM
- Explorer: <https://subnets.avax.network/wagmi/wagmi-chain-testnet/explorer>
```

:::info

This can be used with other wallets too, such as MetaMask.

:::
