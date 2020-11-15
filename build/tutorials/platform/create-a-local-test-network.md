# Create a Local Test Network

## Introduction

In the [Get Started tutorial](https://avalanche.gitbook.io/avalanche/build/getting-started), we connect a node to the test network. You might find it useful to create a local test network.

We’ll show you how to launch a 5 node local test network. For both, we’ll show how to launch the network using [Avash](https://avalanche.gitbook.io/avalanche/build/tools/avash) and manually.

The 5 nodes will have HTTP ports \(where API calls should be sent\) `9650`, `9652`, `9654`, `9656` , and `9658`.

## Create a Local Test Network

The below commands assume you have [AvalancheGo](https://avalanche.gitbook.io/avalanche/build/getting-started#download-avalanchego) installed at `$GOPATH/src/github.com/ava-labs/avalanchego`. Each of the five nodes created is a validator. The staking keys for these nodes are in `$GOPATH/src/github.com/ava-labs/avalanchego/staking/local/staker1.crt`, etc.

### Manually

To start the network:

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
./build/avalanchego --public-ip=127.0.0.1 --snow-sample-size=2 --snow-quorum-size=2 -
```

### With Avash

We assume you’ve installed [Avash](https://avalanche.gitbook.io/avalanche/build/tools/avash).

To open Avash:

```cpp
cd $GOPATH/src/github.com/ava-labs/avash
```

```cpp
go build
```

```cpp
./avash
```

Now we’re in Avash. To start the network:

```cpp
runscript scripts/five_node_staking.lua
```

When you want to tear down the network, run `exit` to exit Avash.

### Verifying Nodes are Connected <a id="verifying-nodes-are-connected"></a>

We can look at one of the node’s peers to ensure that the nodes are connected. To do so, call [`info.peers`](https://avalanche.gitbook.io/avalanche/build/apis/info-api#info-peers).

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.peers"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

`peers` should have 4 entries:

```cpp
{
   "jsonrpc":"2.0",
   "result":{
      "peers":[
         {
            "ip":"127.0.0.1:9158",
            "publicIP":"127.0.0.1:9158",
            "id":"NwEmCRVweJs9vTin7LpnweWSKVP4AB9Qi",
            "version":"avalanche/0.5.0",
            "lastSent":"2020-06-01T19:41:08Z",
            "lastReceived":"2020-06-01T19:41:08Z"
         },
         {
            "ip":"127.0.0.1:9156",
            "publicIP":"127.0.0.1:9156",
            "id":"6f3yBqjAJYV3tpBHLJKYruY3dPHAzKFEE",
            "version":"avalanche/0.5.0",
            "lastSent":"2020-06-01T19:41:08Z",
            "lastReceived":"2020-06-01T19:41:08Z"
         },
         {
            "ip":"127.0.0.1:9155",
            "publicIP":"127.0.0.1:9155",
            "id":"KxLwPp9MYV26CoP8ixTXggWvEgVaa9iPN",
            "version":"avalanche/0.5.0",
            "lastSent":"2020-06-01T19:41:08Z",
            "lastReceived":"2020-06-01T19:41:08Z"
         },
         {
            "ip":"127.0.0.1:9157",
            "publicIP":"127.0.0.1:9157",
            "id":"CkcATAFTDK4HHNWycEWfCz5wEMCsssZSt",
            "version":"avalanche/0.5.0",
            "lastSent":"2020-06-01T19:41:08Z",
            "lastReceived":"2020-06-01T19:41:08Z"
         }
      ]
   },
   "id":1
}
```

### Getting AVAX <a id="getting-avax"></a>

When running a network with `--network-id=local`, as we’ve done, there is a pre-funded X-Chain address that you can import in order to get AVAX. The private key for this address is `PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN`. After you create a keystore user on a node, you can import this key, and the funds it holds, with:

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

That’s it! Your local version of Avalanche is up and running. It has the default blockchains: the [X-Chain](https://avalanche.gitbook.io/avalanche/learn/platform-overview#exchange-chain-x-chain), [C-Chain](https://avalanche.gitbook.io/avalanche/learn/platform-overview#contract-chain-c-chain), and [P-Chain](https://avalanche.gitbook.io/avalanche/learn/platform-overview#platform-chain-p-chain). The only subnet that exists is the Primary Network.

You can add more nodes to the network. Just remember to give unique values for `db-dir`, `http-port` , and `staking-port`.

