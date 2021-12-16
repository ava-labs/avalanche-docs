---
sidebar_position: 2
---

# Subnet FAQ

**Work in Progress**

## Introduction

One of the core features of Avalanche is the ability to create new blockchains. Avalanche supports the creation of new instances of the [Ethereum Virtual Machine (EVM)](../../../../learn/platform-overview/README.md#contract-chain-c-chain). See [Create a Blockchain Running the Subnet EVM](create-evm-blockchain.md) for a detailed tutorial.


## Compatibility

### Can I create a subnet for xxx?

The answer is usually yes, because Subnet provides great flexibility to work almost anything.


## Fees

### How much does it cost to create a subnet?

1 AVAX based on [this doc](../../../../learn/platform-overview/transaction-fees.md#fee-schedule)

### Could it be possible to create a subnet with free transaction?

Fee is used to fight against DoS (denial of service) attacks. It's possible, and it requires modification to existing VMs. but certainly not advised.


### Does it means we can validate a blockchain transaction with another currency than AVAX? 

Blockchains in subnets use their own currencies. for instance see [here](create-avm-blockchain.md#create-the-genesis-data)


## Development




