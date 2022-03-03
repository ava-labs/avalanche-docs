# Bir Yerel Test Ağı Yaratma

## Giriş

Bu eğitim makalesinde bir yerel test ağının nasıl yaratılacağını göstereceğiz.

Size 5 düğümlü yerel bir test ağının nasıl başlatılacağını göstereceğiz. Hem [Avash](../../tools/avash.md)'ı kullanarak hem de manuel olarak ağı nasıl başlatacağınızı göstereceğiz.

Bu 5 düğümde HTTP portları \(API çağrılarının gönderilmesi gereken portlar\), yani `9650`, `9652`, `9654`, `9656` ve `9658` portları bulunacaktır.

## Bir Yerel Test Ağı Yaratma

Aşağıdaki komutlar `$GOPATH/src/github.com/ava-labs/avalanchego`'de [AvalancheGo](../nodes-and-staking/run-avalanche-node.md#download-avalanchego) kurulumunuz olduğunu varsayar. Oluşturulan beş düğümün her biri bir doğrulayıcıdır \(validator\). Bu düğümlerin staking anahtarları `$GOPATH/src/github.com/ava-labs/avalanchego/staking/local/staker1.crt` vb.'dedir.

### Manuel olarak

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

[Avash](../../tools/avash.md)'ı kurduğunuzu varsayıyoruz.

Avash'ı açmak için:

```cpp
cd $GOPATH/src/github.com/ava-labs/avash
```

```cpp
go build
```

```cpp
./avash
```

Şimdi Avash'tayız. Ağı başlatmak için:

```cpp
runscript scripts/five_node_staking.lua
```

Ağı sökmek istediğinizde, `exit`'i çalıştırarak Avash'tan çıkın.

### Düğümlerin Bağlı Olduğunu Doğrulamak {#verifying-nodes-are-connected}

Düğümlerin bağlı olduğundan emin olmak için düğümlerden birinin eşlerine bakabiliriz. Bunu yapmak için [`info.peers`](../../avalanchego-apis/info-api.md#infopeers)'i çağırın.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.peers"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

`peers`'de 4 giriş olmalı:

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

### AVAX'ı almak {#getting-avax}

Daha önce yaptığımız gibi `--network-id=local` ile bir ağ çalıştırırken, AVAX almak için içe aktarabileceğiniz önceden fonlanmış bir X-Chain adresi vardır. Bu adresin özel anahtarı `PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN`'dir. Bir düğümde bir keystore kullanıcısı yarattıktan sonra, bu anahtarı ve içindeki fonları şunu çalıştırarak içe aktarabilirsiniz:

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

Bu kadar! Yerel Avalanche sürümünüz güncel ve çalışır durumda. Bu sürümünüzde varsayılan blok zincirler mevcut: [X-Chain](../../../learn/platform-overview/README.md#exchange-chain-x-chain), [C-Chain](../../../learn/platform-overview/README.md#contract-chain-c-chain) ve [P-Chain](../../../learn/platform-overview/README.md#platform-chain-p-chain). Mevcut tek subnet, Birincil Ağ'dır \(Primary Network\).

Bu ağa daha fazla düğüm ekleyebilirsiniz. `db-dir`, `http-port` ve `staking-port` için benzersiz değerler vermeyi unutmayın yeter.

