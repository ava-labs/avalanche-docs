# API

AvalancheGo peut être configuré pour fonctionner avec un index. C'est-à-dire qu'il enregistre \(index\) chaque conteneur \(un bloc, vertex ou la transaction\) qu'il accepte sur la chaîne X, P-Chain et C-Chain. Pour exécuter AvalancheGo avec l'indexation activée, utilisez le drapeau de ligne de commande `--index-enabled`. AvalancheGo ne sera que les conteneurs qui sont acceptés lors de la course avec `--index-enabled`. Pour vous assurer que votre noeud a un index complet, exécutez un noeud avec une base de données fraîche et `--index-enabled`. Le noeud acceptera chaque bloc, vertex et transaction dans l'historique du réseau pendant le démarrage de l'installation, assurant votre index est complet. Il est OK de désactiver votre noeud s'il fonctionne avec l'indexation activée. Si elle redémarre avec l'indexation toujours activée, elle acceptera tous les conteneurs qui ont été acceptés pendant qu'il était hors ligne. L'indexeur ne devrait jamais manquer d'indexer un bloc, un vertex ou une transaction acceptés.

Les conteneurs indexés \(c'est-à-dire les blocs, les sommets et les transactions\) sont temporisés avec l'heure où le noeud a accepté ce conteneur. Notez que si le conteneur a été indexé pendant le démarrage, d'autres nœuds pourraient avoir accepté le conteneur beaucoup plus tôt. Chaque conteneur indexé pendant le bootstrapping sera timestamped avec l'heure à laquelle le noeud bootstrapping pas lorsqu'il a été accepté pour la première fois par le réseau.

Notez que pour les DAGs \(y compris les X-Chain\), les nœuds peuvent accepter les sommets et les transactions dans un ordre différent les uns des autres.

Ce document montre comment interroger les données de l'API Index AvalancheGo's L'API Index est disponible uniquement lors de l'exécution avec `--index-enabled`.

## Format

Cette API utilise le format RPC `json 2.0`. Pour plus d'informations sur les appels JSON RPC, voir [ici](issuing-api-calls.md).

## Points de fin

Chaque chaîne a un ou plusieurs index. Pour voir si un bloc C-Chain est accepté, par exemple, envoyez un appel API à l'index C-Chain bloc. Pour voir si un bloc X-Chain est accepté, par exemple, envoyez un appel API à l'index X-Chain bloc.

### Transactions de chaîne XX

```text
/ext/index/X/tx
```

### Vertices de chaîne X-X

```text
/ext/index/X/vtx
```

### Blocs de chaîne P

```text
/ext/index/P/block
```

### Blocs de chaîne C

```text
/ext/index/C/block
```

## Méthodes API

### index.getLastAccepted

Obtenez le conteneur le plus récemment accepté.

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

où:

* `id` est l'ID du conteneur
* `bytes` est la représentation des octets du conteneur
* `timestamp` est l'heure à laquelle ce noeud accepté le conteneur
* `index` est combien de conteneurs ont été acceptés dans cet index avant celui-ci
* `encodage` est `"cb58"` ou `"hex"`

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Obtenez conteneur par index. Le premier conteneur accepté est à l'index 0, le second est à l'index 1, etc.

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

* `id` est l'ID du conteneur
* `bytes` est la représentation des octets du conteneur
* `timestamp` est l'heure à laquelle ce noeud accepté le conteneur
* `index` est combien de conteneurs ont été acceptés dans cet index avant celui-ci
* `encodage` est `"cb58"` ou `"hex"`

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Retourne les conteneurs avec les indices dans \[startIndex, `startIndex+1`, ... `,` `startIndex` + `numToFetch` - 1\]. `numToFetch` doit être dans `[0,1024]`.

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

* `id` est l'ID du conteneur
* `bytes` est la représentation des octets du conteneur
* `timestamp` est l'heure à laquelle ce noeud accepté le conteneur
* `index` est combien de conteneurs ont été acceptés dans cet index avant celui-ci
* `encodage` est `"cb58"` ou `"hex"`

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

où `l'encodage` est `"cb58"` ou `"hex"`.

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

