# Interactuar con un Contrato Inteligente de Solidity desde una Aplicación en Golang

`abigen` es una herramienta proporcionada por el cliente Go Ethereum (Geth) que genera enlaces de Go para contratos inteligentes escritos en Solidity. Los desarrolladores necesitarían usar abigen cuando quieren interactuar con un contrato inteligente escrito en Solidity desde una aplicación de programación en lenguaje Go. Permite a los desarrolladores llamar fácilmente a funciones y acceder a datos de contratos en Solidity en una aplicación Go. Este tutorial demuestra cómo compilar un contrato de Solidity en Golang para desplegar y llamar a contratos de forma programática.

## Cómo Construir

Descarga el compilador de Solidity desde [solc-bin](https://github.com/ethereum/solc-bin).

Copia el compilador adecuado en tu ruta actual. ~/bin/ es una ruta común en la mayoría de las distribuciones de Linux.

```shell
# cp linux-amd64/solc-linux-amd64-v0.8.9+commit.e5eed63a ~/bin
```

Asegúrate de que solc pueda ejecutarse.

```shell
# solc --version
solc, la interfaz de línea de comandos del compilador de Solidity
Versión: 0.8.9+commit.e5eed63a.Linux.g++
```

Construye Abigen.

```shell
# cd ~/go/src/github.com/ava-labs/avalanche
# go build -o abigen cmd/abigen/main.go
# cp abigen ~/bin
```

Compila un contrato.

```shell
# abigen --sol counter.sol --pkg main --out counter.go
```

Esto producirá `counter.go` adecuado para interactuar con el contrato.

## Código de Ejemplo

Configura la conexión a `avalanchego`, luego despliega, llama y obtén valores del contrato.

Abigen ofrece más características para contratos complicados, lo siguiente se proporciona como un ejemplo para comenzar a usar el contrato básico.

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
	// configurar cliente
	rc, err := rpc.Dial("http://localhost:9650/ext/bc/C/rpc")
	if err != nil {
		log.Fatal(err)
	}
	ec := ethclient.NewClient(rc)

	ctx := context.Background()

	// obtener networkid
	networkId, err := ec.ChainID(ctx)
	if err != nil {
		log.Fatal(err)
	}

	// parsear clave
	privateKeyString := "PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN"
	privateKeyBytes, err := formatting.Decode(formatting.CB58, strings.TrimPrefix(privateKeyString, constants.SecretKeyPrefix))
	if err != nil {
		log.Fatal(err)
	}
	privateKey := secp256k1.PrivKeyFromBytes(privateKeyBytes)
	privateKeyECDSA := privateKey.ToECDSA()

	// derivar dirección 'c'
	cAddress := crypto.PubkeyToAddress(privateKeyECDSA.PublicKey)

	// configurar firmante y opciones de transacción
	signer := types.LatestSignerForChainID(networkId)
	to := &bind.TransactOpts{
		Signer: func(address common.Address, transaction *types.Transaction) (*types.Transaction, error) {
			return types.SignTx(transaction, signer, privateKeyECDSA)
		},
		From:     cAddress,
		Context:  ctx,
		GasLimit: params.ApricotPhase1GasLimit,
	}

	// desplegar el contrato
	storageAddress, storageTransaction, storageContract, err := DeployStorage(to, ec)
	if err != nil {
		log.Fatal(err)
	}

	// esperar a que la transacción sea aceptada
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

	// Llamar a store en el contrato
	storeTransaction, err := storageContract.Store(to, big.NewInt(1), common.BytesToAddress([]byte("addr1")))
	if err != nil {
		log.Fatal(err)
	}

	// esperar a la transacción
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

	// configurar opciones de llamada para storage
	co := &bind.CallOpts{
		Accepted: true,
		Context:  ctx,
		From:     storageAddress,
	}

	// obtener el valor del contrato
	storageValue, err := storageContract.Retrieve(co)
	if err != nil {
		log.Fatal(err)
	}

	log.Println("storageValue", storageValue)
}
```
