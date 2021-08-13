# Yerel Test Ağı Oluştur

## Tanıştırma

[Başlama özel](https://avalanche.gitbook.io/avalanche/build/getting-started) programında test ağına bir düğüm bağlarız. Yerel bir test ağı oluşturmak için yararlı olabilir.

Size 5 a bir test ağı nasıl başlatılacağını göstereceğiz. Her ikisi için de [Avash](https://avalanche.gitbook.io/avalanche/build/tools/avash) ve elle kullanılarak ağı nasıl başlatacağımızı göstereceğiz.

5 düğüm, HTTP portları (API çağrılarının gönderileceği yerde `9650`, `9652`, `9654`, `9656` ve `9658` gibi bir yere sahiptir.

## Yerel Test Ağı Oluştur

Aşağıdaki komutlar [AvalancheGo](https://avalanche.gitbook.io/avalanche/build/getting-started#download-avalanchego) `${` AvalancheGo kurulduğunu varsayıyor. Her beş düğüm, bir doğrulayıcı. Bu düğümlerin gizlenme anahtarları `${ GOPATH/src/github.com/ava-labs/avalanchego/staking/local/staker1.crt`, vs.

### Elle mi?

Ağı başlatmak için:

```cpp
cd $GOPATH/src/github.com/ava-labs/avalanchego
```

```cpp
./scripts/build.sh
```

```cpp
./build/avalanchego --public-ip=127.0.0.1 --snow-sample-size=2 --snow-quorum-size=2 --http-port=9650 --staking-port=9651 --db-dir=db/node1 --staking-enabled=true --network-id=local --bootstrap-ips= --staking-tls-cert-file=$(pwd)/staking/local/staker1.crt --staking-tls-key-file=$(pwd)/staking/local/staker1.key
```

```cpp
./build/avalanchego --public-ip=127.0.0.1 --snow-sample-size=2 --snow-quorum-size=2 --http-port=9652 --staking-port=9653 --db-dir=db/node2 --staking-enabled=true --network-id=local --bootstrap-ips=127.0.0.1:9651 --bootstrap-ids=NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg --staking-tls-cert-file=$(pwd)/staking/local/staker2.crt --staking-tls-key-file=$(pwd)/staking/local/staker2.key
```

```cpp
./build/avalanchego --public-ip=127.0.0.1 --snow-sample-size=2 --snow-quorum-size=2 --http-port=9654 --staking-port=9655 --db-dir=db/node3 --staking-enabled=true --network-id=local --bootstrap-ips=127.0.0.1:9651 --bootstrap-ids=NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg --staking-tls-cert-file=$(pwd)/staking/local/staker3.crt --staking-tls-key-file=$(pwd)/staking/local/staker3.key
```

```cpp
./build/avalanchego --public-ip=127.0.0.1 --snow-sample-size=2 --snow-quorum-size=2 --http-port=9656 --staking-port=9657 --db-dir=db/node4 --staking-enabled=true --network-id=local --bootstrap-ips=127.0.0.1:9651 --bootstrap-ids=NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg --staking-tls-cert-file=$(pwd)/staking/local/staker4.crt --staking-tls-key-file=$(pwd)/staking/local/staker4.key
```

```cpp
./build/avalanchego --public-ip=127.0.0.1 --snow-sample-size=2 --snow-quorum-size=2 --http-port=9658 --staking-port=9659 --db-dir=db/node5 --staking-enabled=true --network-id=local --bootstrap-ips=127.0.0.1:9651 --bootstrap-ids=NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg --staking-tls-cert-file=$(pwd)/staking/local/staker5.crt --staking-tls-key-file=$(pwd)/staking/local/staker5.key
```

### Avash ile

[Avash](https://avalanche.gitbook.io/avalanche/build/tools/avash). sizin kurduğunuzu varsayıyoruz.

To açmak:

```cpp
cd $GOPATH/src/github.com/ava-labs/avash
```

```cpp
go build
```

```cpp
./avash
```

Şimdi in Ağı başlatmak için:

```cpp
runscript scripts/five_node_staking.lua
```

Ağı yıkmak istediğinizde `to` çıkışı açın.

### Düğümleri Doğrulamak Bağlantı<a id="verifying-nodes-are-connected"></a>

Düğümlerin bağlanmasını sağlamak için düğümlerin akrabalarından birine bakabiliriz. Bunu yapmak için [`bilgi toplarını`](https://avalanche.gitbook.io/avalanche/build/apis/info-api#info-peers) çağır.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.peers"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

`Akranların` 4 girişi olmalı:

```cpp
{
    "jsonrpc":"2.0",
    "result":{
        "numPeers":"4",
        "peers":[
            {
                "ip":"127.0.0.1:36698",
                "publicIP":"127.0.0.1:9655",
                "nodeID":"NodeID-NFBbbJ4qCmNaCzeW7sxErhvWqvEQMnYcN",
                "version":"avalanche/1.0.5",
                "lastSent":"2020-11-15T09:29:16-05:00",
                "lastReceived":"2020-11-15T09:29:09-05:00"
            },
            {
                "ip":"127.0.0.1:37036",
                "publicIP":"127.0.0.1:9657",
                "nodeID":"NodeID-GWPcbFJZFfZreETSoWjPimr846mXEKCtu",
                "version":"avalanche/1.0.5",
                "lastSent":"2020-11-15T09:29:16-05:00",
                "lastReceived":"2020-11-15T09:29:18-05:00"
            },
            {
                "ip":"127.0.0.1:38764",
                "publicIP":"127.0.0.1:9659",
                "nodeID":"NodeID-P7oB2McjBGgW2NXXWVYjV8JEDFoW9xDE5",
                "version":"avalanche/1.0.5",
                "lastSent":"2020-11-15T09:29:16-05:00",
                "lastReceived":"2020-11-15T09:29:15-05:00"
            },
            {
                "ip":"127.0.0.1:60194",
                "publicIP":"127.0.0.1:9653",
                "nodeID":"NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ",
                "version":"avalanche/1.0.5",
                "lastSent":"2020-11-15T09:29:16-05:00",
                "lastReceived":"2020-11-15T09:29:09-05:00"
            }
        ]
    },
    "id":1
}
```

### AVAX<a id="getting-avax"></a>

Bizim gibi -ağ `--network-id=local`, bir ağ çalıştırırken, AVAX almak için aktarabileceğiniz önceden finanse edilmiş bir X-Chain adresi vardır. Bu adrese özel anahtar `PrivateKey-ewoqjP7PxY4yr3iLpLisriqt94hdyDFNGGttNN`. Bir düğümle anahtar kullanıcısı oluşturduktan sonra, bu anahtarı ve elindeki fonları aktarabilirsiniz:

```cpp
curl --location --request POST 'localhost:9650/ext/platform' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "platform.importKey",
    "params":{
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE",
          "privateKey":"PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN"
    },
    "id": 1
}'
```

İşte böyle! of yerel versiyonu çalışıyor. Öntanımlı blok zincirleri vardır: [X-Chain](https://avalanche.gitbook.io/avalanche/learn/platform-overview#exchange-chain-x-chain), [C-Chain](https://avalanche.gitbook.io/avalanche/learn/platform-overview#contract-chain-c-chain) ve [P-Chain](https://avalanche.gitbook.io/avalanche/learn/platform-overview#platform-chain-p-chain). Varolan tek alt ağ ana ağdır.

Ağa daha fazla düğümler ekleyebilirsiniz. `Db-dir`, `http-port` ve `staking` port'a eşsiz değerler vermeyi unutmayın.

