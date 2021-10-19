# Abigen

Compile a solidity contract into golang to deploy and call contracts progrmatically.

## How to Build

Download the solidity compiler from [solc-bin](https://github.com/ethereum/solc-bin).

Copy the appropriate compiler into your current path.  ~/bin/ is a common path in most linux distributions.

```shell
# cp linux-amd64/solc-linux-amd64-v0.8.9+commit.e5eed63a ~/bin
```

Ensure solc can run.

```shell
# solc --version
solc, the solidity compiler commandline interface
Version: 0.8.9+commit.e5eed63a.Linux.g++
```

Build abigen.

```shell
# cd ~/go/src/github.com/ava-labs/avalanche
# go build -o abigen cmd/abigen/main.go
# cp abigen ~/bin
```

Compile a contract.

```shell
# abigen --sol counter.sol --pkg main --out counter.go
```

This will produce `contract.go` suitable to interact with contract.

## Example Code

Setup the connection to `avalanhcego`, then deploy, call, and fetch values from the contract.

Abigen offers more features for complicated contracts, the following is provided as an example to get started using the basic contract

```go
package main

import (
	"context"
	"log"
	"math/big"
	"strings"
	"time"

	"github.com/ava-labs/avalanchego/utils/constants"
	"github.com/ava-labs/avalanchego/utils/formatting"
	"github.com/ava-labs/coreth/accounts/abi/bind"
	"github.com/ava-labs/coreth/core/types"
	"github.com/ava-labs/coreth/ethclient"
	"github.com/ava-labs/coreth/params"
	"github.com/ava-labs/coreth/rpc"
	"github.com/decred/dcrd/dcrec/secp256k1/v3"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"
)

func main() {
	// setup client
	rc, err := rpc.Dial("http://localhost:9650/ext/bc/C/rpc")
	if err != nil {
		log.Fatal(err)
	}
	ec := ethclient.NewClient(rc)

	ctx := context.Background()

	// fetch networkid
	networkId, err := ec.ChainID(ctx)
	if err != nil {
		log.Fatal(err)
	}

	// parse key
	privateKeyString := "PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN"
	privateKeyBytes, err := formatting.Decode(formatting.CB58, strings.TrimPrefix(privateKeyString, constants.SecretKeyPrefix))
	if err != nil {
		log.Fatal(err)
	}
	privateKey := secp256k1.PrivKeyFromBytes(privateKeyBytes)
	privateKeyECDSA := privateKey.ToECDSA()

	// derive 'c' address
	cAddress := crypto.PubkeyToAddress(privateKeyECDSA.PublicKey)

	// setup siner and transaction options.
	signer := types.LatestSignerForChainID(networkId)
	to := &bind.TransactOpts{
		Signer: func(address common.Address, transaction *types.Transaction) (*types.Transaction, error) {
			return types.SignTx(transaction, signer, privateKeyECDSA)
		},
		From:     cAddress,
		Context:  ctx,
		GasLimit: params.ApricotPhase1GasLimit,
	}

	// deploy the contract
	storageAddress, storageTransaction, storageContract, err := DeployStorage(to, ec)
	if err != nil {
		log.Fatal(err)
	}

	// wait for the transaction to be accepted
	for {
		r, err := ec.TransactionReceipt(ctx, storageTransaction.Hash())
		if err != nil {
			if err.Error() != "not found" {
				log.Fatal(err)
			}
			time.Sleep(1 * time.Second)
			continue
		}
		if r.Status != 0 {
			break
		}
		time.Sleep(1 * time.Second)
	}

	log.Println("storageAddress", storageAddress)
	log.Println("storageTransaction", storageTransaction)

	// Call store on the contract
	storeTransaction, err := storageContract.Store(to, big.NewInt(1), common.BytesToAddress([]byte("addr1")))
	if err != nil {
		log.Fatal(err)
	}

	// wait for the transaction
	for {
		r, err := ec.TransactionReceipt(ctx, storeTransaction.Hash())
		if err != nil {
			if err.Error() != "not found" {
				log.Fatal(err)
			}
			time.Sleep(1 * time.Second)
			continue
		}
		if r.Status != 0 {
			break
		}
		time.Sleep(1 * time.Second)
	}

	log.Println("storeTransaction", storeTransaction)

	// setup call options for storage
	co := &bind.CallOpts{
		Accepted: true,
		Context:  ctx,
		From:     storageAddress,
	}

	// retrieve the value of the contract
	storageValue, err := storageContract.Retrieve(co)
	if err != nil {
		log.Fatal(err)
	}

	log.Println("storageValue", storageValue)
}
```
