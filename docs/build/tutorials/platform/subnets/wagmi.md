---
sidebar_position: 7
---

# WAGMI Subnet Demo

The WAGMI ("We're All Going to Make It") Subnet Demo is a high throughput testbed for EVM (Ethereum Virtual Machine) optimizations. It is parameterized to run at a factor more capacity than Fuji/Mainnet C-Chain and will be used to experiment with release candidates before they make it into an official coreth release.

## Network Parameters
* Network ID: 11111
* Chain ID: 11111
* Block Gas Limit: 20,000,000 (2.5x C-Chain)
* 10s Gas Target: 100,000,000 (~6.67x C-Chain)
* Min Fee: 1 GWei (4% of C-Chain)
* Target Block Rate: 2s (Same as C-Chain)

Everyone that has used the the C-Chain more than twice (~970k addresses) has been airdropped 10 WGM tokens. With the current fee parameterization, this should be enough for hundreds of txs.

This is one of the first cases of using Avalanche Subnets as a proving ground for changes in a production VM (coreth). Many underestimate how useful the isolation of subnets is for performing complex VM testing on a live network (without impacting the stability of the primary network).


We created a basic WAGMI Explorer [https://trywagmi.xyz](https://trywagmi.xyz) that surfaces aggregated usage statistics about the subnet.

## Subnet Info
* SubnetID: [28nrH5T2BMvNrWecFcV3mfccjs6axM1TVyqe79MCv2Mhs8kxiY](https://testnet.avascan.info/blockchains?subnet=28nrH5T2BMvNrWecFcV3mfccjs6axM1TVyqe79MCv2Mhs8kxiY)
* ChainID: [2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt](https://testnet.avascan.info/blockchain/2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt)

## Adding WAGMI to MetaMask

* Network Name: WAGMI
* RPC URL: https://subnets.avax.network/wagmi/wagmi-chain-testnet/rpc
* WS URL: wss://subnets.avax.network/wagmi/wagmi-chain-testnet/ws
* Chain ID: 11111
* Symbol: WGM
* Explorer: https://subnets.avax.network/wagmi/wagmi-chain-testnet/explorer

