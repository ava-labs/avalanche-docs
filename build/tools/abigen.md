# Abigen

将一个 solidity 合约编译成 golang，以程序方式部署和调用合约。

## 如何构建

从 [solc-bin](https://github.com/ethereum/solc-bin) 下载 solidity 编译器。

将适当的编译器复制到您的当前路径。 ~/bin/ 是大多数 linux 发行版中常见的路径。

```shell
# cp linux-amd64/solc-linux-amd64-v0.8.9+commit.e5eed63a ~/bin
```

确保 solc 可以运行。

```shell
# solc --version
solc, the solidity compiler commandline interface
Version: 0.8.9+commit.e5eed63a.Linux.g++
```

构建 abigen。

```shell
# cd ~/go/src/github.com/ava-labs/avalanche
# go build -o abigen cmd/abigen/main.go
# cp abigen ~/bin
```

编译合约。

```shell
# abigen --sol counter.sol --pkg main --out counter.go
```

这将产生适合与合约交互的 `contract.go`。

## 示例代码

设置到 `avalanhcego` 的连接，然后部署、调用和获取合约的值。

Abigen 为复杂的合约提供了更多功能，以下以基本合约为例介绍如何开始使用

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
