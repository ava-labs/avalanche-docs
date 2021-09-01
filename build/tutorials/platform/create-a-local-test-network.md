# ローカルテストネットワークを作成する

## はじめに

[「始める」](https://avalanche.gitbook.io/avalanche/build/getting-started)チュートリアルでは、テストネットワークにノードを接続します。ローカルテストネットワークを作成するのに役に立つかもしれません。

5ノードローカルテストネットワークを立ち上げる方法を以下に示します。両方のために、[Avash](https://avalanche.gitbook.io/avalanche/build/tools/avash)を使用して、手動でネットワークを起動する方法を説明します。

`9656`5つのノードには、（APIコールが送信される場合）HTTPポートが存在します。 `9650`, `9652`, `9654`,そして。`9658`

## ローカルテストネットワークを作成する

以下のコマンドを実行して[AvalancheGo](https://avalanche.gitbook.io/avalanche/build/getting-started#download-avalanchego)がインストールされていると仮定します`$GOPATH/src/github.com/ava-labs/avalanchego`。作成された5つのノードはそれぞれバリデータです。これらのノードのためのステーキングキーは`$GOPATH/src/github.com/ava-labs/avalanchego/staking/local/staker1.crt`、等に存在します。

### 手動で

ネットワークを始めるには：

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

### Avashで

[Avash](https://avalanche.gitbook.io/avalanche/build/tools/avash)をインストールしたとみなします。

Avashを開く：

```cpp
cd $GOPATH/src/github.com/ava-labs/avash
```

```cpp
go build
```

```cpp
./avash
```

今、Avashに到達しました。ネットワークを始めるには：

```cpp
runscript scripts/five_node_staking.lua
```

ネットワークを切り崩したい場合は、Avashを終了`exit`するために実行してください。

### 検証ノードが接続されます<a id="verifying-nodes-are-connected"></a>

ノードが接続されていることを確認することができます。そのためには、[`info.peers`](https://avalanche.gitbook.io/avalanche/build/apis/info-api#info-peers).

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.peers"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

`peers`4つのエントリを持たなければなりません：

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

### AVAXを取得<a id="getting-avax"></a>

我々が行ったように、ネットワークを実行する際に`--network-id=local`、AVAXを取得するためにインポートできる事前資金でX-Chainアドレスが存在します。このアドレスのための秘密鍵は、次のようになります`PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN`。ノード上に鍵ストアユーザーを作成した後、この鍵をインポートし、その資金が以下のもので保持できます。

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

それで終わりました！Avalancheのローカルバージョンが稼働しています。デフォルトのブロックチェーン、[X-Chain](https://avalanche.gitbook.io/avalanche/learn/platform-overview#exchange-chain-x-chain)、[C-Chain](https://avalanche.gitbook.io/avalanche/learn/platform-overview#contract-chain-c-chain)、[P-Chain](https://avalanche.gitbook.io/avalanche/learn/platform-overview#platform-chain-p-chain)があります。存在する唯一のサブネットは、プライマリネットワークです。

より多くのノードをネットワークに追加することができます。`http-port`ただ、 `db-dir`, ,と.にユニークな価値を与えることを忘れないでください。`staking-port`

