---
Description: FAQ for subnet on Avalanche network.
---


# Subnet FAQ

**Work in Progress**

## Introduction

### I don't understand how subnets work, any documentation to read?
As subnet is in rapid development phase, we constantly update and share this FAQ and our documentation at [here](README.md). If you have suggestions or questions, please reach out to us on [Discord](http://chat.avax.network/).


## Validators

### What is a validator? 
A blockchain validator is someone who is responsible for verifying transactions on a blockchain. In proof of stake (PoS) systems like Avalanche, validators are given rewards as long as they stake the network’s token (AVAX) and correctly participate in the network. This mechanism helps secure the network by imposing the need to lock up value in the network in order to participate in the consensus decisions.


### What is a subnet?
A subnet, or subnetwork, is a dynamic set of validators working together to achieve consensus on the state of a set of blockchains. Each blockchain is validated by exactly one subnet. A subnet can validate many blockchains. A validator may be a member of many subnets to provide its validation service. 

### How do I recruit/create validators for a subnet?
If you have resources, you can create validators by staking AVAX tokens by following [this](../../../../learn/platform-overview/staking.md#validators).

If you are resource bound, you can incentivize other validators to be part of your subnet. At this early stage of subnet development, there is no marketplace for validators to advertise their nodes for subnet yet. It is up to each subnet owner to reach out and incentivize validators to validate their subnet. 

We are working to make this easier.

### How many validators are required for a subnet?
The more validators, the better. For network security and stability, we recommend 5 validators (each in a different region) for a minimal production setup. 10 validators should be enough to balance off the security, stability and future needs.


## Tokens and Fees

### How much does it cost to create a subnet?

1 AVAX based on [this doc.](../../../../learn/platform-overview/transaction-fees.md#fee-schedule)

### Can we make transactions free of charge on our subnet?

While it is possible to allow transactions free of charge on your subnet, this poses a serious Denial of Service risk. If users can freely and anonymously spam your chain with transactions it may cause legitimate users to run into high congestion and have a bad overall experience when interacting with your subnet. For this reason, we recommend that you use non-zero fees in order to provide some spam prevention on your chain. If you use subnet-evm, there is already a dynamic fee algorithm so that the fees will be increased/decreased during periods of high/low network activity.

If you feel strongly that you do not want users to pay for fees, it will require a well thought out alternative to prevent DoS attacks on your chain. While many have been proposed by various partners, we have found all of these proposed solutions have serious potential DoS vectors.


### Can transaction fees in subnet blockchains be paid with another currency other than AVAX?

Blockchains in subnets use their own currencies. see [here](create-avm-blockchain.md#create-the-genesis-data) for an example.

### How do we pay for transactions on our subnet?

For the [subnet-evm](https://github.com/ava-labs/subnet-evm), transactions are paid for by the native token of the platform. You can define initial balances on your chain by setting its genesis to give whatever addresses you want an initial starting balance.

### How is the native token of my subnet minted?

Since you can define your own VM, you can define whatever minting logic you want! You have complete control to create per block minting logic or otherwise to manipulate the EVM state however you see fit by creating a fork of [subnet-evm](https://github.com/ava-labs/subnet-evm). For the C-Chain, we modified the EVM to always set the Coinbase of every block to a specific burn address (a garbage address nobody has the key to). Therefore, all of the fees are essentially burned by being sent to this address.

The simplest way to define some form of minting logic, will be to set the Coinbase address that the subnet-evm will use such that all of the fees will be sent directly to that address allowing you to re-distribute these funds as you see fit.

You can define any minting logic that you want, you just have to dive into the subnet-evm to make the necessary modifications. If you have any ideas, we are happy to discuss and potentially even add first-class support for it within the [subnet-evm repo](https://github.com/ava-labs/subnet-evm) if it’s something that many others might find useful as well.


## Compatibility

### Can I create a subnet for my specific use-case?

The answer is usually yes. Custom Virtual Machines are non-opinionated. This brings great flexibility to Subnets. There are few interfaces and structures that a VM needs to implement for consensus requirements. Other than these, a Virtual Machine can be fully customized to provide any custom business logic.  
