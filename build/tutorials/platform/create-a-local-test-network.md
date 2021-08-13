# Créer un réseau local de test

## Introduction

Dans le [tutoriel de la démarche](https://avalanche.gitbook.io/avalanche/build/getting-started), nous connectons un noeud au réseau de test. Vous pourriez trouver utile de créer un réseau local de test.

Nous vous montrerons comment lancer un réseau de test local à 5 noeuds. Pour les deux, nous allons montrer comment lancer le réseau en utilisant [Avash](https://avalanche.gitbook.io/avalanche/build/tools/avash) et manuellement.

Les 5 nœuds auront les ports HTTP \(où les appels API devraient être envoyés\) `9650`, `9652`, `9654`, `9656` et `9658`.

## Créer un réseau local de test

Les commandes `ci-dessous` supposent que vous avez [AvalancheGo](https://avalanche.gitbook.io/avalanche/build/getting-started#download-avalanchego) installé à AvalancheGo Chacun des cinq nœuds créés est un validant. Les clés de jalonnement de ces nœuds sont dans `$GOPATH/src/github.com/ava-labs/avalanchego/stakego/local/staker1.crt`, etc.

### Manuellement

Pour démarrer le réseau:

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

### Avec Avash

Nous supposons que vous avez installé [Avash](https://avalanche.gitbook.io/avalanche/build/tools/avash).

Pour ouvrir Avash:

```cpp
cd $GOPATH/src/github.com/ava-labs/avash
```

```cpp
go build
```

```cpp
./avash
```

Maintenant, nous sommes à Avash. Pour démarrer le réseau:

```cpp
runscript scripts/five_node_staking.lua
```

Lorsque vous voulez déchirer le réseau, lancez `la sortie` pour sortir Avash.

### Les nœuds de vérification sont connectés<a id="verifying-nodes-are-connected"></a>

Nous pouvons regarder l'un des pairs du noeud pour s'assurer que les noeuds sont connectés. Pour ce faire, appelez [`info.peers`](https://avalanche.gitbook.io/avalanche/build/apis/info-api#info-peers).

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.peers"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

`les pairs` devraient avoir 4 entrées:

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

### Obtenir AVAX<a id="getting-avax"></a>

Lors de l'exécution d'un réseau avec `--network-id=local`, comme nous l'avons fait, il ya une adresse X-Chain pre-funded que vous pouvez importer afin d'obtenir AVAX. La clé privée pour cette adresse est `PrivateKey-ewoqjP7PxY4yr3iLtpLisriqt94hdyDFNgchSxGztUrTXtNN`. Après vous créer un utilisateur de frappe sur un nœud, vous pouvez importer cette clé, et les fonds qu'elle détient avec:

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

C'est ça! Votre version locale d'Avalanche est en cours d'exécution. Il a les blocs par défaut : la [X-Chain](https://avalanche.gitbook.io/avalanche/learn/platform-overview#exchange-chain-x-chain), [X-Chain](https://avalanche.gitbook.io/avalanche/learn/platform-overview#contract-chain-c-chain), et [X-Chain,](https://avalanche.gitbook.io/avalanche/learn/platform-overview#platform-chain-p-chain) Le seul sous-réseau existant est le réseau primaire.

Vous pouvez ajouter plus de nœuds au réseau. Rappelez-vous simplement de donner des valeurs uniques pour `db-dir`, `http-port` , et `staking-port`.

