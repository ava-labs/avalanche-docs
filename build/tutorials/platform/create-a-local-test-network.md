# Local Test Networkの作成

## JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-

[Get](https://avalanche.gitbook.io/avalanche/build/getting-started) Started チュートリアルでは、ノードをテスト・ネットワークに接続します。Local test ネットワークを作成するのに便利です。

5ノードローカルテストネットワークを起動する方法を紹介します。どちらも、[Avash](https://avalanche.gitbook.io/avalanche/build/tools/avash) と手動でネットワークを起動する方法を説明します。

5つのノードにはHTTPポート \(Where API callss to send\)`9650`, `9652`, `9654`, `9656`, `9658`があります。

## Local Test Networkの作成

以下のコマンドは、[AvalancheGo](https://avalanche.gitbook.io/avalanche/build/getting-started#download-avalanchego) が`$GOPATH/src/github.com/ava-labs/avalanchego` にインストールされていると仮定します。作成された5つのノードはそれぞれバリデータです。これらのノードのステーキングキーは、`$GOPATH/src/github.com/ava-labs/avalanchego/staking/local/staker1.crt` などにあります。

### 手動で

ネットワークを起動するには:

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

### Avashを使って

[Avash](https://avalanche.gitbook.io/avalanche/build/tools/avash) をインストールしたと仮定します。

Avash を開くには:

```cpp
cd $GOPATH/src/github.com/ava-labs/avash
```

```cpp
go build
```

```cpp
./avash
```

今、私たちはAvashにいます。ネットワークを起動するには:

```cpp
runscript scripts/five_node_staking.lua
```

ネットワークを解体したい場合は、`exit`を実行してAvashを終了します。

### ノードが接続されていることを確認する<a id="verifying-nodes-are-connected"></a>

ノードが接続されていることを確認するために、ノードのピアの1つを見ることができます。これを行うには、[`info.peers`](https://avalanche.gitbook.io/avalanche/build/apis/info-api#info-peers) を呼び出します。

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.peers"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

`peers` は 4 つのエントリーを持っている必要があります。

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

### AVAXの取得<a id="getting-avax"></a>

`--network-id=local` でネットワークを実行する場合、AVAX を取得するためにインポートできるX-Chainアドレスがあります。このアドレスに対する秘密鍵は`PrivateKey-ewoqjJP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGgztUrTXtNNです。`keystore ユーザーをノードに作成した後、このキーとその保有する資金をインポートできます。

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

それでいい！Avalancheのローカルバージョンが稼働しています。[X-Chain](https://avalanche.gitbook.io/avalanche/learn/platform-overview#exchange-chain-x-chain)、[C-Chain](https://avalanche.gitbook.io/avalanche/learn/platform-overview#contract-chain-c-chain)、[P-Chain](https://avalanche.gitbook.io/avalanche/learn/platform-overview#platform-chain-p-chain)というデフォルトのブロックチェーンがあります。唯一のサブネットは、Primary Networkです。

ネットワークにさらに多くのノードを追加できます。`db-dir`、`http-port`、`staking-port` に対してユニークな値を与えることを忘れないでください。

