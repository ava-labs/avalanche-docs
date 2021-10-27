# ローカルテストネットワークを作成する

## はじめに

[Get Started tutorial](https://avalanche.gitbook.io/avalanche/build/getting-started)では、テストネットワークにノードを接続します。ローカルテストネットワークを作成するのが便利だと思うでしょう。

5つのノードローカルテストネットワークを起動する方法を説明します。両方用に、[Avash](https://avalanche.gitbook.io/avalanche/build/tools/avash)を使用して手動でネットワークを起動する方法を説明します。

5つのノードには、HTTPポート（API呼び出しを送信する場所）の`9650``9652``9654``9656``9658`があります。

## ローカルテストネットワークを作成する

以下のコマンドは、`$GOPATH/src/github.com/ava-labs/avalanchego`でインストールされた[AvalancheGo](https://avalanche.gitbook.io/avalanche/build/getting-started#download-avalanchego)を想定しています。作成した5つのノードはそれぞれがバリデーターです。これらのノードのステーキング鍵は`$GOPATH/src/github.com/ava-labs/avalanchego/staking/local/staker1.crt`、などです。

### 手動で行う

ネットワークを起動するには、次を実行します。

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

### Avashで行う

[Avash](https://avalanche.gitbook.io/avalanche/build/tools/avash)をインストールしたことを想定しています。

Avashを開くには、次を実行します。

```cpp
cd $GOPATH/src/github.com/ava-labs/avash
```

```cpp
go build
```

```cpp
./avash
```

これでAvashにいます。ネットワークを起動するには、次を実行します。

```cpp
runscript scripts/five_node_staking.lua
```

ネットワークを解解する場合、`exit`を実行してAvashを終了します。

### 検証ノードが接続されている<a id="verifying-nodes-are-connected"></a>

ノードのピアの1つを確認して、ノードが接続されていることを確認することができます。これを行うには、[`info.peers`](https://avalanche.gitbook.io/avalanche/build/apis/info-api#info-peers)を呼び出します。

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.peers"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

`peers`には4つのエントリがなければなりません。

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

### AVAXを取得する<a id="getting-avax"></a>

以前にもそうしたように`--network-id=local`でネットワークが動作中の場合には、AVAXの取得にインポートできる資金調達済みのX-Chainアドレスがありますこのアドレスの秘密鍵は、`PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN`です。ノードにキーストアユーザーを作成した後、この鍵と、保有する資金を次でインポートできます。

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

完了です。ローカルバージョンのAvalancheが稼働しています。これには、デフォルトのブロックチェーンがあります。それらは、[X-Chain](https://avalanche.gitbook.io/avalanche/learn/platform-overview#exchange-chain-x-chain)、[C-Chain](https://avalanche.gitbook.io/avalanche/learn/platform-overview#contract-chain-c-chain)、[P-Chain](https://avalanche.gitbook.io/avalanche/learn/platform-overview#platform-chain-p-chain)です。存在する唯一のサブネットは一次ネットワークです。

ネットワークに、より多くのノードを追加することができます。`db-dir`、`http-port`、`staking-port`に固有の値を指定するのを忘れないでください。

