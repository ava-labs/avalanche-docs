# X-Chain Migration Guide

## Overview

This document summarizes all of the changes made to the X-Chain API to support
Avalanche Cortina, which migrates the X-Chain to run Snowman++. In summary, the
core transaction submission and confirmation flow is unchanged, however, there
are new APIs that must be called to index all transactions.

## Transaction Broadcast and Confirmation

The transaction format on the X-Chain does not change in Cortina. This means that wallets that
have already integrated with the X-Chain don’t need to change how they sign transactions.
Additionally, there is no change to the format of the avm.issueTx or the avm.getTx API.

However, the *avm.getTxStatus* endpoint is now deprecated and its usage should be replaced with
*avm.getTx* (which only returns accepted transactions for AvalancheGo >= v1.9.12). *avm.getTxStatus*
will still work up to and after the Cortina activation if you wish to migrate after the network
upgrade has occurred.

## Vertex -> Block Indexing

Before Cortina, indexing the X-Chain required polling the */ext/index/X/vtx* endpoint to fetch
new vertices. During the Cortina activation, a “stop vertex” will be produced using a new codec
version that will contain no transactions. This new vertex type will be the same format as
previous vertices. To ensure historical data can still be accessed in Cortina, the
*/ext/index/X/vtx* will remain accessible even though it will no longer be
populated with chain data.

After Cortina activation, you will need to migrate to using the new *ext/index/X/block* endpoint
(shares the same semantics as */ext/index/P/block*) to continue indexing X-Chain activity.
Because X-Chain ordering is deterministic in Cortina, this means that X-Chain blocks across
all heights will be consistent across all nodes and will include a timestamp. Here is an example of
iterating over these blocks in Golang:

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

After Cortina activation, it will also be possible to fetch X-Chain blocks directly without
enabling the Index API. You can use the *avm.getBlock*, *avm.getBlockByHeight*, and
*avm.getHeight* endpoints to do so. This, again, will be similar to the P-Chain semantics.

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
* ipcs
  * ipcs.publishBlockchain
  * ipcs.unpublishBlockchain
  * ipcs.getPublishedBlockchains
* keystore
  * keystore.createUser
  * keystore.deleteUser
  * keystore.listUsers
  * keystore.importUser
  * keystore.exportUser
* avm/pubsub
* avm
  * avm.getAddressTxs
  * avm.getBalance
  * avm.getAllBalances
  * avm.createAsset
  * avm.createFixedCapAsset
  * avm.createVariableCapAsset
  * avm.createNFTAsset
  * avm.createAddress
  * avm.listAddresses
  * avm.exportKey
  * avm.importKey
  * avm.mint
  * avm.sendNFT
  * avm.mintNFT
  * avm.import
  * avm.export
  * avm.send
  * avm.sendMultiple
* avm/wallet
  * wallet.issueTx
  * wallet.send
  * wallet.sendMultiple
* platform
  * platform.exportKey
  * platform.importKey
  * platform.getBalance
  * platform.createAddress
  * platform.listAddresses
  * platform.getSubnets
  * platform.addValidator
  * platform.addDelegator
  * platform.addSubnetValidator
  * platform.createSubnet
  * platform.exportAVAX
  * platform.importAVAX
  * platform.createBlockchain
  * platform.getBlockchains
  * platform.getStake
  * platform.getMaxStakeAmount
  * platform.getRewardUTXOs
<!-- vale on -->