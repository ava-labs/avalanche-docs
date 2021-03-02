# Créer un Réseau Local Testnet

## Introduction

Dans le tutoriel [pour commencer](../../commencer.md) nous avons connecté un nœud au réseau testnet. Vous trouverez peut-être utile de créer un réseau local testnet. 

Nous allons vous montrer comment lancer un réseau de test local à 5 nœuds. Pour les deux, nous montrerons comment lancer le réseau à l'aide d'[Avash](../../outils-de-developpement/avash.md) et manuellement.

Les 5 nœuds auront des ports HTTP \(où les appels API doivent être envoyés\) `9650`, `9652`, `9654`, `9656` et `9658`.

## Créer un réseau de test local

Les commandes ci-dessous supposent que vous avez [AvalancheGo](../../commencer.md#download-avalanchego) installé dans`$GOPATH/src/github.com/ava-labs/avalanchego`. Chacun des cinq nœuds créés est un validateur. Les clés de jalonnement pour ces nœuds se trouvent dans `$GOPATH/src/github.com/ava-labs/avalanchego/staking/local/staker1.crt`, etc.

#### Manuellement <a id="manually"></a>

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
./build/avalanchego --public-ip=127.0.0.1 --snow-sample-size=2 --snow-quorum-size=2 --http-port=9652 --staking-port=9653 --db-dir=db/node2 --staking-enabled=true --network-id=local --bootstrap-ips=127.0.0.1:9651 --bootstrap-ids=NodeId-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg --staking-tls-cert-file=$(pwd)/staking/local/staker2.crt --staking-tls-key-file=$(pwd)/staking/local/staker2.key
```

```cpp
./build/avalanchego --public-ip=127.0.0.1 --snow-sample-size=2 --snow-quorum-size=2 --http-port=9654 --staking-port=9655 --db-dir=db/node3 --staking-enabled=true --network-id=local --bootstrap-ips=127.0.0.1:9651 --bootstrap-ids=NodeId-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg --staking-tls-cert-file=$(pwd)/staking/local/staker3.crt --staking-tls-key-file=$(pwd)/staking/local/staker3.key
```

```cpp
./build/avalanchego --public-ip=127.0.0.1 --snow-sample-size=2 --snow-quorum-size=2 --http-port=9656 --staking-port=9657 --db-dir=db/node4 --staking-enabled=true --network-id=local --bootstrap-ips=127.0.0.1:9651 --bootstrap-ids=NodeId-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg --staking-tls-cert-file=$(pwd)/staking/local/staker4.crt --staking-tls-key-file=$(pwd)/staking/local/staker4.key
```

```cpp
./build/avalanchego --public-ip=127.0.0.1 --snow-sample-size=2 --snow-quorum-size=2 --http-port=9658 --staking-port=9659 --db-dir=db/node5 --staking-enabled=true --network-id=local --bootstrap-ips=127.0.0.1:9651 --bootstrap-ids=NodeId-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg --staking-tls-cert-file=$(pwd)/staking/local/staker5.crt --staking-tls-key-file=$(pwd)/staking/local/staker5.key
```

### Avec Avash

Nous supposons que vous avez installé [Avash](../../outils-de-developpement/avash.md).

Pour ouvrir Avash :

```cpp
cd $GOPATH/src/github.com/ava-labs/avash
```

```text
go build
```

```text
./avash
```

Nous sommes maintenant dans Avash. Pour démarrer le réseau :

```cpp
runscript scripts/five_node_staking.lua
```

Lorsque vous souhaitez démanteler le réseau, exécutez `exit` pour quitter Avash.

### Vérifier que les nœuds sont connectés <a id="verifying-nodes-are-connected"></a>

Nous pouvons examiner l'un des pairs du nœud pour nous assurer que les nœuds sont connectés. Pour ce faire, appelez `info.peers`.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.peers"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

`peers` devrait avoir 4 entrées :

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

### Obtenir des AVAX <a id="getting-avax"></a>

Lorsque vous exécutez un réseau avec `--network-id = local`, comme nous l'avons fait, il existe une adresse X-Chain pré-financée que vous pouvez importer afin d'obtenir AVAX. La clé privée de cette adresse est `PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN`. Après avoir créé un keytsore user sur un nœud, vous pouvez importer cette clé et les fonds qu'elle détient, avec :

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

C'est tout ! Votre réseau local Avalanche est opérationnel. Il a les blockchains par défaut : la [X-Chain](../../apprendre/presentation-du-systeme/#chaine-dechange-x-chain), [C-Chain](../../apprendre/presentation-du-systeme/#chaine-de-contrat-c-chain) et [P-Chain](../../apprendre/presentation-du-systeme/#chaine-de-plateforme-p-chain). Le seul sous-réseau existant est le réseau principal. 

Vous pouvez ajouter d'autres nœuds au réseau. N'oubliez pas de donner des valeurs uniques pour `db-dir`, `http-port` et `staking-port`.

