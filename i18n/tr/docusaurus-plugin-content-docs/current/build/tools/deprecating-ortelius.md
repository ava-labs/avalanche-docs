# Ortelius'un İndeks API'leriyle Değiştirilmesi

Bu rehberde [Ortelius API](ortelius.md)'sinin kullanımının [AvalancheGo'nun İndeks API'si](../avalanchego-apis/index-api.md) de dahil olmak üzere diğer API'lerle nasıl değiştirileceği açıklanmaktadır. **Ortelius'un kullanımdan kaldırılacağı ilan edilmiştir. Daha önce Ortelius'tan aldığınız bilgileri almak için diğer API'leri kullanmanız gerekmektedir.**

## Index API
AvalancheGo bir indeksleyici ile çalışmak üzere yapılandırılabilir. Yani, X-Chain, P-Chain ve C-Chain'de kabul ettiği her kapsayıcıyı \(bir blok, verteks veya işlem\) kaydeder \(indeksler\). AvalancheGo'yu indeks oluşturma etkinken çalıştırmak için `--index-enabled`komut satırı bayrağını kullanın. AvalancheGo yalnızca `--index-enabled` \(indeks etkinleştirilmiş\) olarak çalışırken kabul edilen konteynerleri indeksleyecektir. Daha fazla bilgi için [Index API dokümanına](../avalanchego-apis/index-api.md) bakın. Index API dokümanını baştan sona okuduğunuzdan lütfen emin olun.

Aşağıda Index API'nin şu amaçlarla nasıl kullanılacağı hakkındaki talimatları veriyoruz:
* Kabul edilen blokların/işlemlerin toplam sayısını getirin
* Kimliğine göre bir bloku/işlemi getirin

## Toplam Blok/İşlem Sayısını getirin

Belirli bir zincirde kabul edilen blokların/vertekslerin/işlemlerin sayısını getirmek için Index API'yi kullanabilirsiniz. Bunu yapmak için `curl`'ü veya Index API istemcisinin [getLastAccepted](../avalanchego-apis/index-api.md#index.getlastaccepted) metodunu kullanabilirsiniz.

Aşağıdaki örneklerde kabul edilen X-Chain işlemlerinin sayısını getiriyoruz.
* Kabul edilen C-Chain bloklarının sayısını getirmek için aşağıda `/ext/index/X/tx` yerine `/ext/index/C/block` koyun.
* Kabul edilen P-Chain bloklarının sayısını getirmek için `/ext/index/X/tx` yerine `/ext/index/P/block` koyun.
* Kabul edilen X-Chain vertekslerinin sayısını getirmek için `/ext/index/X/tx` yerine  `/ext/index/X/vtx` koyun.

### Index API İstemcisi

```go
package main

import (
	"fmt"
	"time"

	"github.com/ava-labs/avalanchego/indexer"
	"github.com/ava-labs/avalanchego/utils/formatting"
)

func main() {
	client := indexer.NewClient("http://localhost:9650", "/ext/index/X/tx", 5*time.Second)
	args := &indexer.GetLastAcceptedArgs{Encoding: formatting.Hex}
	container, err := client.GetLastAccepted(args)
	if err != nil {
		panic(err)
	}
	fmt.Printf("%d transactions have been accepted", container.Index+1)
}
```

### curl

Belirli bir zincirde kabul edilen blokların/vertekslerin/işlemlerin sayısını almak için `curl` kullanabilirsiniz.

**Örnek Çağrı**
```sh
curl --location --request POST 'http://localhost:9650/ext/index/X/tx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "index.getLastAccepted",
    "params": {
        "encoding":"hex"
    },
    "id": 1
}' | jq
```

**Örnek Yanıt**

\(Kısa tutmak için `bytes` alanının kısaltıldığını görüyorsunuz.\)

```json
{
  "jsonrpc": "2.0",
  "result": {
    "id": "2W1vuBmkapdCfRXMKbUH6BQCaTycrztxkuuBPdAfe96DanCvqZ",
    "bytes": "0x00000000000000000001ed5f383...",
    "timestamp": "2021-10-21T20:55:27.616393152Z",
    "encoding": "hex",
    "index": "2683522"
  },
  "id": 1
}
```

En son kabul edilen X-Chain işleminin kimliği: `2W1vuBmkapdCfRXMKbUH6BQCaTycrztxkuuBPdAfe96DanCvqZ`. Son kabul edilen işlemin `index`'i `2683522` olduğu için, bu, `2683523` adet X-Chain işleminin kabul edildiği anlamına gelir.

## Kimliğine göre bir İşlemi/Bloku/Verteksi getirin

Index API'yi kullanarak konteynerleri kimliklerine göre getirebilirsiniz. Ayrıca zincire özel API'leri de kullanabilirsiniz.

### Index API İstemcisi

Aşağıdaki kod parçacığı, bir X-Chain konteynerini kimliğine göre getirmek için Index API İstemcisinin [getContainerByID](../avalanchego-apis/index-api.md#index.getcontainerbyid) metodunu kullanır.
* Bir C-Chain blokunu getirmek için aşağıda `/ext/index/X/tx` yerine `/ext/index/C/block` koyun.
* Bir P-Chain blokunu getirmek için `/ext/index/X/tx` yerine  `/ext/index/P/block` koyun.
* Bir X-Chain verteksini getirmek için `/ext/index/X/tx` yerine `/ext/index/X/vtx` koyun.

```go
package main

import (
	"fmt"
	"time"

	"github.com/ava-labs/avalanchego/ids"
	"github.com/ava-labs/avalanchego/indexer"
	"github.com/ava-labs/avalanchego/utils/formatting"
)

func main() {
	client := indexer.NewClient("http://localhost:9650", "/ext/index/X/tx", 5*time.Second)
	containerID, err := ids.FromString("2W1vuBmkapdCfRXMKbUH6BQCaTycrztxkuuBPdAfe96DanCvqZ")
	if err != nil {
		panic(err)
	}
	args := &indexer.GetIndexArgs{
		ContainerID: containerID,
		Encoding:    formatting.Hex,
	}
	container, err := client.GetContainerByID(args)
	if err != nil {
		panic(err)
	}
	containerBytes, err := formatting.Decode(container.Encoding, container.Bytes)
	if err != nil {
		panic(err)
	}
	fmt.Printf("container: %v\n", containerBytes)
}
```

`curl`'in `getContainerByID` örneğini [burada](../avalanchego-apis/index-api.md#index.getcontainerbyid) bulabilirsiniz.


### Zincire Özel API'ler

#### X-Chain

Bir X-Chain işlemini kimliğine göre getirmek için X-Chain API metodu [avm.getTx](../avalanchego-apis/exchange-chain-x-chain-api.mdx#avm.gettx)'i kullanabilirsiniz. İnsanlar tarafından okunabilir bir JSON yanıtı almak için `json` ögesini  `encoding` olarak ayarlayın.

**Örnek Çağrı**

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getTx",
    "params" :{
        "txID":"2W1vuBmkapdCfRXMKbUH6BQCaTycrztxkuuBPdAfe96DanCvqZ",
        "encoding": "json"
    }
}' -H 'content-type:application/json;' http://localhost:9650/ext/bc/X | jq
```

**Örnek Yanıt**

```json
{
  "jsonrpc": "2.0",
  "result": {
    "tx": {
      "unsignedTx": {
        "networkID": 1,
        "blockchainID": "2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM",
        "outputs": [
          {
            "assetID": "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z",
            "fxID": "spdxUxVJQbX85MGxMHbKw1sHxMnSqJ3QBzDyDYEP3h6TLuxqQ",
            "output": {
              "addresses": [
                "X-avax1c284te00gjeph54wh8jy5zdlc5k6qjkkgjuz5g"
              ],
              "amount": 50000000000,
              "locktime": 0,
              "threshold": 1
            }
          },
          {
            "assetID": "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z",
            "fxID": "spdxUxVJQbX85MGxMHbKw1sHxMnSqJ3QBzDyDYEP3h6TLuxqQ",
            "output": {
              "addresses": [
                "X-avax1pgqxa6qw87wajaezvu02myyy8cctjl5y3hv02s"
              ],
              "amount": 55027917498,
              "locktime": 0,
              "threshold": 1
            }
          }
        ],
        "inputs": [
          {
            "txID": "23D2DrDg4apGW7sz3gGEXkx6wz4wMkuT8ru7s39p8K5vyvkinz",
            "outputIndex": 1,
            "assetID": "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z",
            "fxID": "spdxUxVJQbX85MGxMHbKw1sHxMnSqJ3QBzDyDYEP3h6TLuxqQ",
            "input": {
              "amount": 105028917498,
              "signatureIndices": [
                0
              ]
            }
          }
        ],
        "memo": "0x43727974706f2e636f6d"
      },
      "credentials": [
        {
          "fxID": "spdxUxVJQbX85MGxMHbKw1sHxMnSqJ3QBzDyDYEP3h6TLuxqQ",
          "credential": {
            "signatures": [
              "0x5943457d6a7e370e0ed239715f04bf4ba7545a9d3440a848d52db97aece6f51c7c87ba9aa944327f63dd39feeec9ad978b23855fe1b081bc7159a2d4f8f027b600"
            ]
          }
        }
      ]
    },
    "encoding": "json"
  },
  "id": 1
}
```


#### P-Chain

Bir P-Chain işlemini kimliğine göre getirmek için P-Chain API metodu [platform.getTx](../avalanchego-apis/platform-chain-p-chain-api.md#platform.gettx)'i kullanabilirsiniz.

#### C-Chain

Bir işlemi kimliğine göre, bir bloku kimliğine göre veya bir bloku yüksekliğine göre getirmek için C-Chain'in API'sini kullanabilirsiniz. `eth_getTransactionByHash`, `eth_getBlockByHash` ve `eth_getBlockByNumber` için [buraya](https://eth.wiki/json-rpc/API) bakın.

