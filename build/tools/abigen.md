# Abigen

Compilación de un contrato de solidity en golang para desplegar y llamar contratos programáticamente.

## Cómo construir

Descarga el compilador de solidity de [solc-bin](https://github.com/ethereum/solc-bin).

Copia el compilador apropiado en tu ruta actual.  ~/bin/ es una ruta común en la mayoría de las distribuciones de Linux.

```shell
# cp linux-amd64/solc-linux-amd64-v0.8.9+commit.e5eed63a ~/bin
```

Asegúrate de que solc se pueda ejecutar.

```shell
# solc --version
solc, the solidity compiler commandline interface
Version: 0.8.9+commit.e5eed63a.Linux.g++
```

Construye abigen.

```shell
# cd ~/go/src/github.com/ava-labs/avalanche
# go build -o abigen cmd/abigen/main.go
# cp abigen ~/bin
```

Compila un contrato.

```shell
# abigen --sol counter.sol --pkg main --out counter.go
```

Eso producirá `contract.go` apropiado para interactuar con el contrato.

## Ejemplo de código

Configura la conexión en `avalanhcego`, luego despliega, llama y trae los valores del contrato.

Abigen tiene más características para contratos complicados. Se ofrece el siguiente ejemplo para empezar a usar el contrato básico.

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
