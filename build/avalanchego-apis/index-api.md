# API

AvalancheGo peut être configuré pour fonctionner avec un indexeur. C'est-à-dire qu'il enregistre \(index\) chaque conteneur \(un block, un vertex ou une transaction\) qu'il accepte sur la X-Chain, la P-Chain et la C-Chain. Pour exécuter AvalancheGo avec l'indexation activée, utilisez le drapeau de ligne de commande `--index-enabled`. AvalancheGo ne fera que indexer les conteneurs acceptés lors de l'exécution avec `--index-enabled`. Pour garantir que votre nœud dispose d'un index complet, exécutez un nœud avec une nouvelle base de données et `--index-enabled`. Le nœud acceptera chaque bloc, vertex et chaque transaction dans l'historique du réseau pendant le bootstrapping, en veillant à ce que votre index soit complet. Il est OK pour désactiver votre nœud si il est en cours d'exécution avec l'indexation activée. Si elle redémarre avec l'indexation encore activée, elle acceptera tous les conteneurs acceptés alors qu'elle était hors ligne. L'indexer ne doit jamais manquer d'indexer un block, un vertex ou une transaction acceptés.

Les conteneurs indexés \(c'est-à-dire les blocks, les sommets et les transactions\) sont en effet temporisés avec le moment où le nœud a accepté ce contenant. Notez que si le conteneur a été indexé lors du bootstrapping, d'autres nœuds peuvent avoir accepté le conteneur beaucoup plus tôt. Chaque conteneur indexé au cours de la mise en œuvre de bootstrapping sera timestamped avec le moment où le nœud a été bootstrapé, et non pas quand il a été accepté pour la première fois par le réseau.

Notez que pour les DAG \(y compris les X-Chain\), les nœuds peuvent accepter des sommets et des transactions dans un ordre différent des uns des autres.

Ce document montre comment interroger les données de l'API d'Index AvalancheGo's L'API Index est seulement disponible lors de l'exécution avec `--index-enabled`.

## Format

Cette API utilise le format `json 2.0`RPC. Pour plus d'informations sur la création d'appels JSON RPC, consultez [ici](issuing-api-calls.md).

## Enders

Chaque chaîne a un ou plusieurs index. Pour voir si un bloc C-Chain est accepté, par exemple, envoyez un appel API à l'index des blocs C-Chain. Pour voir si un bloc X-Chain est accepté, par exemple, envoyez un appel API à l'index des blocs X-Chain.

### Transactions X-Chain

```text
/ext/index/X/tx
```

### Vertices X-Chain

```text
/ext/index/X/vtx
```

### Blocs de P-Chain

```text
/ext/index/P/block
```

### Blocs de C-Chain

```text
/ext/index/C/block
```

## Méthodes API

### index.getLastAccepted

Obtenez le plus récent conteneur

#### **Signature**

```cpp
info.getLastAccepted({
  encoding:string
}) -> {
  id: string,
  bytes: string,
  timestamp: string,
  encoding: string,
  index: string
}
```

où :

* `id`est l'ID du conteneur
* `bytes`est la représentation des octets du conteneur
* `timestamp`est le moment où ce nœud a accepté le conteneur
* `index`est combien de conteneurs ont été acceptés dans cet index avant celui-ci
* `encoding`est `"cb58"`ou`"hex"`

#### **Exemple**

```cpp
curl --location --request POST 'localhost:9650/ext/index/X/tx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "index.getLastAccepted",
    "params": {
        "encoding":"cb58"
    },
    "id": 1
}'
```

#### **Exemple**

```cpp
{
  "jsonrpc":"2.0",
  "id"     :1,
  "result" :{
    "id":"6fXf5hncR8LXvwtM8iezFQBpK5cubV6y1dWgpJCcNyzGB1EzY",
    "bytes":"111115HRzXVDSeonLBcv6QdJkQFjPzPEobMWy7PyGuoheggsMCx73MVXZo2hJMEXXvR5gFFasTRJH36aVkLiWHtTTFcghyFTqjaHnBhdXTRiLaYcro3jpseqLAFVn3ngnAB47nebQiBBKmg3nFWKzQUDxMuE6uDGXgnGouDSaEKZxfKreoLHYNUxH56rgi5c8gKFYSDi8AWBgy26siwAWj6V8EgFnPVgm9pmKCfXio6BP7Bua4vrupoX8jRGqdrdkN12dqGAibJ78Rf44SSUXhEvJtPxAzjEGfiTyAm5BWFqPdheKN72HyrBBtwC6y7wG6suHngZ1PMBh93Ubkbt8jjjGoEgs5NjpasJpE8YA9ZMLTPeNZ6ELFxV99zA46wvkjAwYHGzegBXvzGU5pGPbg28iW3iKhLoYAnReysY4x3fBhjPBsags37Z9P3SqioVifVX4wwzxYqbV72u1AWZ4JNmsnhVDP196Gu99QTzmySGTVGP5ABNdZrngTRfmGTFCRbt9CHsgNbhgetkxbsEG7tySi3gFxMzGuJ2Npk2gnSr68LgtYdSHf48Ns",
    "timestamp":"2021-04-02T15:34:00.262979-07:00",
    "encoding":"cb58",
    "index":"0"
  }
}
```

### index.getContainerByIndex index.getContainerByIndex

Obtenez conteneur par index. Le premier récipient accepté est à l'index 0, le second est à l'index 1, etc.

#### **Signature**

```cpp
info.getContainerByIndex({
  index: uint64,
  encoding: string
}) -> {
  id: string,
  bytes: string,
  timestamp: string,
  encoding: string,
  index: string
}
```

* `id`est l'ID du conteneur
* `bytes`est la représentation des octets du conteneur
* `timestamp`est le moment où ce nœud a accepté le conteneur
* `index`est combien de conteneurs ont été acceptés dans cet index avant celui-ci
* `encoding`est `"cb58"`ou`"hex"`

#### **Exemple**

```cpp
curl --location --request POST 'localhost:9650/ext/index/X/tx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "index.getContainerByIndex",
    "params": {
        "index":0,
        "encoding":"cb58"
    },
    "id": 1
}'
```

#### **Exemple**

```cpp
{
  "jsonrpc":"2.0",
  "id"     :1,
  "result" :{
    "id":"6fXf5hncR8LXvwtM8iezFQBpK5cubV6y1dWgpJCcNyzGB1EzY",
    "bytes":"111115HRzXVDSeonLBcv6QdJkQFjPzPEobMWy7PyGuoheggsMCx73MVXZo2hJMEXXvR5gFFasTRJH36aVkLiWHtTTFcghyFTqjaHnBhdXTRiLaYcro3jpseqLAFVn3ngnAB47nebQiBBKmg3nFWKzQUDxMuE6uDGXgnGouDSaEKZxfKreoLHYNUxH56rgi5c8gKFYSDi8AWBgy26siwAWj6V8EgFnPVgm9pmKCfXio6BP7Bua4vrupoX8jRGqdrdkN12dqGAibJ78Rf44SSUXhEvJtPxAzjEGfiTyAm5BWFqPdheKN72HyrBBtwC6y7wG6suHngZ1PMBh93Ubkbt8jjjGoEgs5NjpasJpE8YA9ZMLTPeNZ6ELFxV99zA46wvkjAwYHGzegBXvzGU5pGPbg28iW3iKhLoYAnReysY4x3fBhjPBsags37Z9P3SqioVifVX4wwzxYqbV72u1AWZ4JNmsnhVDP196Gu99QTzmySGTVGP5ABNdZrngTRfmGTFCRbt9CHsgNbhgetkxbsEG7tySi3gFxMzGuJ2Npk2gnSr68LgtYdSHf48Ns",
    "timestamp":"2021-04-02T15:34:00.262979-07:00",
    "encoding":"cb58",
    "index":"0"
  }
}
```

### index.getContainerRange Range

Retourne les conteneurs avec des indices en `startIndex`[, `startIndex+1`, .., `startIndex`\+ - `numToFetch`1]. `numToFetch`doit être en .`[0,1024]`

#### **Signature**

```cpp
info.getContainerRange({
  startIndex: uint64,
  numToFetch: uint64,
  encoding: string
}) -> []{
  id: string,
  bytes: string,
  timestamp: string,
  encoding: string,
  index: string
}
```

* `id`est l'ID du conteneur
* `bytes`est la représentation des octets du conteneur
* `timestamp`est le moment où ce nœud a accepté le conteneur
* `index`est combien de conteneurs ont été acceptés dans cet index avant celui-ci
* `encoding`est `"cb58"`ou`"hex"`

#### **Exemple**

```cpp
curl --location --request POST 'localhost:9650/ext/index/X/tx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "index.getContainerRange",
    "params": {
        "startIndex":0,
        "numToFetch":100,
        "encoding":"cb58"
    },
    "id": 1
}'
```

#### **Exemple**

```cpp
{
  "jsonrpc":"2.0",
  "id"     :1,
  "result" :[{
    "id":"6fXf5hncR8LXvwtM8iezFQBpK5cubV6y1dWgpJCcNyzGB1EzY",
    "bytes":"111115HRzXVDSeonLBcv6QdJkQFjPzPEobMWy7PyGuoheggsMCx73MVXZo2hJMEXXvR5gFFasTRJH36aVkLiWHtTTFcghyFTqjaHnBhdXTRiLaYcro3jpseqLAFVn3ngnAB47nebQiBBKmg3nFWKzQUDxMuE6uDGXgnGouDSaEKZxfKreoLHYNUxH56rgi5c8gKFYSDi8AWBgy26siwAWj6V8EgFnPVgm9pmKCfXio6BP7Bua4vrupoX8jRGqdrdkN12dqGAibJ78Rf44SSUXhEvJtPxAzjEGfiTyAm5BWFqPdheKN72HyrBBtwC6y7wG6suHngZ1PMBh93Ubkbt8jjjGoEgs5NjpasJpE8YA9ZMLTPeNZ6ELFxV99zA46wvkjAwYHGzegBXvzGU5pGPbg28iW3iKhLoYAnReysY4x3fBhjPBsags37Z9P3SqioVifVX4wwzxYqbV72u1AWZ4JNmsnhVDP196Gu99QTzmySGTVGP5ABNdZrngTRfmGTFCRbt9CHsgNbhgetkxbsEG7tySi3gFxMzGuJ2Npk2gnSr68LgtYdSHf48Ns",
    "timestamp":"2021-04-02T15:34:00.262979-07:00",
    "encoding":"cb58",
    "index":"0"
  }]
}
```

### index.getIndex

Obtenez l'index d'un conteneur.

#### **Signature**

```cpp
info.getIndex({
  containerID: string,
  encoding: string
}) -> {
  index: string
}
```

où `encoding`est ou ou est ou ou `"cb58"`.`"hex"`

#### **Exemple**

```cpp
curl --location --request POST 'localhost:9650/ext/index/X/tx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "index.getIndex",
    "params": {
        "containerID":"6fXf5hncR8LXvwtM8iezFQBpK5cubV6y1dWgpJCcNyzGB1EzY",
        "encoding":"cb58"
    },
    "id": 1
}'
```

#### **Exemple**

```cpp
{
  "jsonrpc":"2.0",
  "result":
    {
      "index":"0"
    },
  "id":1
}
```

### index.isAccepted

Retourne vrai si le conteneur est dans cet index.

#### **Signature**

```cpp
info.isAccepted({
  containerID: string,
  encoding: string
}) -> {
  isAccepted: bool
}
```

#### **Exemple**

```cpp
curl --location --request POST 'localhost:9650/ext/index/X/tx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "index.isAccepted",
    "params": {
        "containerID":"6fXf5hncR8LXvwtM8iezFQBpK5cubV6y1dWgpJCcNyzGB1EzY",
        "encoding":"cb58"
    },
    "id": 1
}'
```

#### **Exemple**

```cpp
{
  "jsonrpc":"2.0",
  "result":
    {
      "isAccepted": true
    },
  "id":1
}
```

