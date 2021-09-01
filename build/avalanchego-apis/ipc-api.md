# API IPC

L'API IPC permet aux utilisateurs de créer des socles de domaine UNIX pour les blockchains à publier à. Lorsque la blockchain accepte un vertex/block, il le publiera sur une socket et les décisions contenues à l'intérieur seront publiées à un autre.

Un nœud ne sera exposer cette API que si elle est démarrée avec un [argument](../references/command-line-interface.md) de ligne de commande `api-ipcs-enabled=true`.

## Format de message de IPC

Les messages de socket sont constitués d'un entier de 64bit en format BigEndian, suivi de ces nombreux octets.

Exemple :

```text
Sending:
    [0x41, 0x76, 0x61, 0x78]
Writes to the socket:
    [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x04, 0x41, 0x76, 0x61, 0x78]
```

## Format d'URL de Socket IPC

`consensus`Les noms des soques sont de la forme où se `<event_type>`trouve ou `<network_id>-<chain_id>-<event_type>`.`decisions` La socket de consensus reçoit des verticaux et des blocks et tandis que la socket de décision recouvre des transactions individuelles.

## Format

Cette API utilise le format `json 2.0`RPC.

## Endpoint

`/ext/ipcs`

## Méthodes

### ipcs.publishBlockchain

Enregistrer une blockchain afin qu'elle publie des sommets acceptés sur une socket de domaine Unix.

#### **Signature**

```cpp
ipcs.publishBlockchain({blockchainID: string}) -> {consensusURL: string, decisionsURL: string}
```

* `blockchainID`est la blockchain qui publiera les sommets acceptés.
* `consensusURL`est le chemin de la prise de domaine Unix dans lequel les sommets sont publiés.
* `decisionsURL`est le chemin de la prise de domaine Unix dans lequel les transactions sont publiées.

#### **Exemple**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "ipcs.publishBlockchain",
    "params":{
        "blockchainID":"11111111111111111111111111111111LpoYY"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/ipcs
```

#### **Exemple**

```cpp
{
    "jsonrpc":"2.0",
    "result":{
        "decisionsURL":"/tmp/1-11111111111111111111111111111111LpoYY-consensus",
        "consensusURL":"/tmp/1-11111111111111111111111111111111LpoYY-decisions"
    },
    "id":1
}
```

### ipcs.unpublishBlockchain

Désigner une blockchain pour qu'elle ne publie plus sur une socket de domaine Unix.

#### **Signature**

```cpp
ipcs.unpublishBlockchain({blockchainID: string}) -> {success: bool}
```

* `blockchainID`est la blockchain qui ne publiera plus sur une socket de domaine Unix.

#### **Exemple**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "ipcs.unpublishBlockchain",
    "params":{
        "blockchainID":"11111111111111111111111111111111LpoYY"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/ipcs
```

#### **Exemple**

```cpp
{
    "jsonrpc":"2.0",
    "result":{
        "success":true
    },
    "id":1
}
```

