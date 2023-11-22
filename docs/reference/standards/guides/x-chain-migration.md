---
tags: [Standards]
description: This document summarizes all of the changes made to the X-Chain API to support Avalanche Cortina (v1.10.0).
sidebar_label: X-Chain Migration
pagination_label: X-Chain Migration Guide - Avalanche Cortina
sidebar_position: 2
---

# X-Chain Migration Guide

## Overview

This document summarizes all of the changes made to the X-Chain API to support
Avalanche Cortina (v1.10.0), which migrates the X-Chain to run Snowman++.
In summary, the core transaction submission and confirmation flow is unchanged,
however, there are new APIs that must be called to index all transactions.

## Transaction Broadcast and Confirmation

The transaction format on the X-Chain does not change in Cortina. This means that wallets that
have already integrated with the X-Chain don’t need to change how they sign transactions.
Additionally, there is no change to the format of the [avm.issueTx](/reference/avalanchego/x-chain/api.md#avmissuetx)
or the [avm.getTx](/reference/avalanchego/x-chain/api.md#avmgettx) API.

However, the [avm.getTxStatus](/reference/avalanchego/x-chain/api.md#avmgettxstatus) endpoint is now
deprecated and its usage should be replaced with
[avm.getTx](/reference/avalanchego/x-chain/api.md#avmgettx) (which only returns accepted transactions
for AvalancheGo >= v1.9.12). [avm.getTxStatus](/reference/avalanchego/x-chain/api.md#avmgettxstatus)
will still work up to and after the Cortina activation if you wish to migrate
after the network upgrade has occurred.

## Vertex -> Block Indexing

Before Cortina, indexing the X-Chain required polling the
[/ext/index/X/vtx](/reference/avalanchego/index-api.md#x-chain-vertices) endpoint to fetch new
vertices. During the Cortina activation, a “stop vertex” will be produced using
a [new codec
version](https://github.com/ava-labs/avalanchego/blob/c27721a8da1397b218ce9e9ec69839b8a30f9860/snow/engine/avalanche/vertex/codec.go#L17-L18)
that will contain no transactions. This new vertex type will be the [same
format](https://github.com/ava-labs/avalanchego/blob/c27721a8da1397b218ce9e9ec69839b8a30f9860/snow/engine/avalanche/vertex/stateless_vertex.go#L95-L102)
as previous vertices. To ensure historical data can still be accessed in
Cortina, the [/ext/index/X/vtx](/reference/avalanchego/index-api.md#x-chain-vertices) will remain
accessible even though it will no longer be populated with chain data.

:::note

The index for the X-chain tx and vtx endpoints will never increase
again. The index for the X-chain blocks will increase as new
blocks are added.

:::

After Cortina activation, you will need to migrate to using the new
_ext/index/X/block_ endpoint (shares the same semantics as
[/ext/index/P/block](/reference/avalanchego/index-api.md#p-chain-blocks)) to continue indexing
X-Chain activity. Because X-Chain ordering is deterministic in Cortina, this
means that X-Chain blocks across all heights will be consistent across all nodes
and will include a timestamp. Here is an example of iterating over these blocks
in Golang:

```golang
package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/ava-labs/avalanchego/indexer"
	"github.com/ava-labs/avalanchego/vms/proposervm/block"
	"github.com/ava-labs/avalanchego/wallet/chain/x"
	"github.com/ava-labs/avalanchego/wallet/subnet/primary"
)

func main() {
	var (
		uri       = fmt.Sprintf("%s/ext/index/X/block", primary.LocalAPIURI)
		client    = indexer.NewClient(uri)
		ctx       = context.Background()
		nextIndex uint64
	)
	for {
		log.Printf("polling for next accepted block")
		container, err := client.GetContainerByIndex(ctx, nextIndex)
		if err != nil {
			time.Sleep(time.Second)
			continue
		}

		proposerVMBlock, err := block.Parse(container.Bytes)
		if err != nil {
			log.Fatalf("failed to parse proposervm block: %s\n", err)
		}

		avmBlockBytes := proposerVMBlock.Block()
		avmBlock, err := x.Parser.ParseBlock(avmBlockBytes)
		if err != nil {
			log.Fatalf("failed to parse avm block: %s\n", err)
		}

		acceptedTxs := avmBlock.Txs()
		log.Printf("accepted block %s with %d transactions", avmBlock.ID(), len(acceptedTxs))

		for _, tx := range acceptedTxs {
			log.Printf("accepted transaction %s", tx.ID())
		}

		nextIndex++
	}
}
```

After Cortina activation, it will also be possible to fetch X-Chain blocks
directly without enabling the Index API. You can use the [avm.getBlock](/reference/avalanchego/x-chain/api.md#avmgetblock),
[avm.getBlockByHeight](/reference/avalanchego/x-chain/api.md#avmgetblockbyheight), and [avm.getHeight](/reference/avalanchego/x-chain/api.md#avmgetheight)
endpoints to do so. This, again,
will be similar to the [P-Chain semantics](/reference/avalanchego/p-chain/api.md#platformgetblock).

## Deprecated API Calls

This long-term deprecation effort will better align usage of AvalancheGo with its purpose, to be a
minimal and efficient runtime that supports only what is required to validate the Primary Network
and Subnets. Integrators should make plans to migrate to tools and services that are better
optimized for serving queries over Avalanche Network state and avoid keeping any keys on the node
itself.

:::note

This deprecation ONLY applies to APIs that AvalancheGo exposes over the HTTP port.
Transaction types with similar names to these APIs are NOT being deprecated.

:::

<!-- vale off -->

- ipcs
  - ipcs.publishBlockchain
  - ipcs.unpublishBlockchain
  - ipcs.getPublishedBlockchains
- keystore
  - keystore.createUser
  - keystore.deleteUser
  - keystore.listUsers
  - keystore.importUser
  - keystore.exportUser
- avm/pubsub
- avm
  - avm.getAddressTxs
  - avm.getBalance
  - avm.getAllBalances
  - avm.createAsset
  - avm.createFixedCapAsset
  - avm.createVariableCapAsset
  - avm.createNFTAsset
  - avm.createAddress
  - avm.listAddresses
  - avm.exportKey
  - avm.importKey
  - avm.mint
  - avm.sendNFT
  - avm.mintNFT
  - avm.import
  - avm.export
  - avm.send
  - avm.sendMultiple
- avm/wallet
  - wallet.issueTx
  - wallet.send
  - wallet.sendMultiple
- platform
  - platform.exportKey
  - platform.importKey
  - platform.getBalance
  - platform.createAddress
  - platform.listAddresses
  - platform.getSubnets
  - platform.addValidator
  - platform.addDelegator
  - platform.addSubnetValidator
  - platform.createSubnet
  - platform.exportAVAX
  - platform.importAVAX
  - platform.createBlockchain
  - platform.getBlockchains
  - platform.getStake
  - platform.getMaxStakeAmount
  - platform.getRewardUTXOs
  <!-- vale on -->

## Cortina FAQ

### Do I Have to Upgrade my Node?

If you don’t upgrade your validator to `v1.10.0` before the Avalanche Mainnet activation date,
your node will be marked as offline and other nodes will report your node as having lower uptime,
which may jeopardize your staking rewards.

### Is There any Change in Hardware Requirements?

No.

### Will Updating Decrease my Validator’s Uptime?

No. As a reminder, you can check your validator’s estimated uptime using the [`info.uptime` API call](/reference/avalanchego/info-api.md#infouptime).

### I Think Something Is Wrong. What Should I Do?

First, make sure that you’ve read the documentation thoroughly and checked
the [FAQs](https://support.avax.network/en/).
If you don’t see an answer to your question,
go to our [Discord](https://discord.com/invite/RwXY7P6)
server and search for your question.
If it has not already been asked, please post it in the appropriate channel.
