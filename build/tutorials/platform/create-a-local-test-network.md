# Crear una red de pruebas locales

## Introducción

En el [tutorial de Empezar](https://avalanche.gitbook.io/avalanche/build/getting-started) conectamos un nodo a la red de pruebas. Puede que le resulte útil crear una red de pruebas local.

Le mostraremos cómo lanzar una red de pruebas local de 5 nodos. Para ambos, mostraremos cómo lanzar la red utilizando [Avash](https://avalanche.gitbook.io/avalanche/build/tools/avash) y manualmente.

Los 5 nodos tendrán puertos HTTP \(donde las llamadas API deben enviarse\) `9650`, `9652`, `9654`, `9656` y `9658`.

## Crear una red de pruebas locales

Los comandos siguientes asumirán que tiene [AvalancheGo](https://avalanche.gitbook.io/avalanche/build/getting-started#download-avalanchego) instalado en `$GOPATH/src/github.com/ava-labs/avalanchego`. Cada uno de los cinco nodos creados es un validador. Las llaves de estos nodos están en `$GOPATH/src/github.com/ava-labs/avalanchego/staking/local/staker1.crt`, etc.

### Manufacturing

Para iniciar la red:

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

### Con Avash

Suponemos que has instalado [Avash](https://avalanche.gitbook.io/avalanche/build/tools/avash).

Para abrir Avash:

```cpp
cd $GOPATH/src/github.com/ava-labs/avash
```

```cpp
go build
```

```cpp
./avash
```

Ahora estamos en Avash. Para iniciar la red:

```cpp
runscript scripts/five_node_staking.lua
```

Cuando quieras derribar la red, correr `la salida` para salir de Avash.

### Los nodos de verificación están conectados<a id="verifying-nodes-are-connected"></a>

Podemos mirar a uno de los pares del nodo para asegurarse de que los nodos estén conectados. Para ello, llame a [`info.peers`](https://avalanche.gitbook.io/avalanche/build/apis/info-api#info-peers).

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.peers"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

`Los pares` deben tener 4 entradas:

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

### Cómo conseguir AVAX<a id="getting-avax"></a>

Cuando se ejecuta una red con `--network-id=local`, como hemos hecho, hay una dirección de X-Chain prefinanciada que puede importar para obtener AVAX. La clave privada para esta dirección es `PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGztUrTXtNNN`. Después de crear un usuario de keystore en un nodo, puede importar esta clave y los fondos que tiene, con:

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

¡Eso es todo! Tu versión local de Avalanche está en marcha y en marcha. Tiene las cadenas de bloqueo predeterminadas: la cadena [X-Chain](https://avalanche.gitbook.io/avalanche/learn/platform-overview#exchange-chain-x-chain), [C-Chain](https://avalanche.gitbook.io/avalanche/learn/platform-overview#contract-chain-c-chain) y [P-Chain](https://avalanche.gitbook.io/avalanche/learn/platform-overview#platform-chain-p-chain). El único subnet que existe es la Red Primaria.

Puede agregar más nodos a la red. Solo recuerde dar valores únicos para `db-dir`, `http-port` y `staking-port`.

