# Créer un réseau de test local

## Introduction

Dans le [tutoriel de la mise](https://avalanche.gitbook.io/avalanche/build/getting-started) en démarrage, nous connectons un nœud au réseau de test. Vous pourriez la trouver utile pour créer un réseau de test local.

Nous vous montrerons comment lancer un réseau de test local de 5 nœuds. Pour les deux, nous montrerons comment lancer le réseau en utilisant [Avash](https://avalanche.gitbook.io/avalanche/build/tools/avash) et manuellement.

`9652``9654``9656`Les 5 nœuds auront des ports HTTP \(où les appels API doivent être envoyés\) , , `9650`, et .`9658`

## Créer un réseau de test local

Les commandes ci-dessous supposent que vous avez installé [AvalancheGo](https://avalanche.gitbook.io/avalanche/build/getting-started#download-avalanchego) à `$GOPATH/src/github.com/ava-labs/avalanchego`. Chacun des cinq nœuds créés est un validateur. Les clés de jalonnement pour ces nœuds sont en `$GOPATH/src/github.com/ava-labs/avalanchego/staking/local/staker1.crt`, etc.

### Manuellement

Pour démarrer le réseau :

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

Pour ouvrir Avash :

```cpp
cd $GOPATH/src/github.com/ava-labs/avash
```

```cpp
go build
```

```cpp
./avash
```

Maintenant nous sommes à Avash. Pour démarrer le réseau :

```cpp
runscript scripts/five_node_staking.lua
```

Lorsque vous souhaitez démolir le réseau, exécutez `exit`pour sortir Avash.

### Les nœuds de vérification sont connectés<a id="verifying-nodes-are-connected"></a>

Nous pouvons consulter l'un des pairs du nœud pour garantir que les nœuds sont connectés. Pour le faire, appelez [`info.peers`](https://avalanche.gitbook.io/avalanche/build/apis/info-api#info-peers).

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.peers"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

`peers`devrait avoir 4 entrées :

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

Lors de l'exécution d'un réseau avec `--network-id=local`, comme nous l'avons fait, il y a une adresse X-Chain pre-funded que vous pouvez importer pour obtenir AVAX. La clé privée pour cette adresse est `PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN`. Après avoir créé un utilisateur de frappes sur un nœud, vous pouvez importer cette clé et les fonds qu'elle détient avec :

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

C'est tout ! Votre version locale d'Avalanche est en cours de fonctionnement et en cours d'exécution. Il a les blockchains par défaut : la [X-Chain](https://avalanche.gitbook.io/avalanche/learn/platform-overview#exchange-chain-x-chain), la [C-Chain](https://avalanche.gitbook.io/avalanche/learn/platform-overview#contract-chain-c-chain) et la [P-Chain](https://avalanche.gitbook.io/avalanche/learn/platform-overview#platform-chain-p-chain). Le seul sous-réseau qui existe est le réseau principal.

Vous pouvez ajouter d'autres nœuds au réseau. `http-port`N'oubliez pas de donner des valeurs uniques pour `db-dir`, et .`staking-port`

