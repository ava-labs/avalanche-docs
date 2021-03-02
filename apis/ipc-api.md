---
description: >-
  L'API IPC permet aux utilisateurs de créer des sockets de domaine UNIX sur
  lesquelles les blockchains peuvent publier
---

# API IPC

L'API IPC permet aux utilisateurs de créer des sockets de domaine UNIX sur lesquelles publier des blockchains. Lorsque la blockchain accepte un sommet / bloc, elle le publie sur une socket et les décisions contenues à l'intérieur sont publiées sur un autre.   
Un nœud exposera cette API uniquement s'il est démarré avec l'argument de ligne de commande `api-ipcs-enabled=true`.

## Format de message IPC

Les messages de socket se composent d'un entier 64 bits au format BigEndian suivi d'octets.

Example:

```cpp
Sending:
    [0x41, 0x76, 0x61, 0x78]
Writes to the socket:
    [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x04, 0x41, 0x76, 0x61, 0x78]
```

## Format d'URL du socket IPC

Les noms des sockets sont de la forme  `<network_id>-<chain_id>-<event_type>`  où  `<event_type>`est soit un `consensus`, soit des `decisions`. Le socket de consensus reçoit des verticies et des blocs et tandis que le socket de décisions reçoit des transactions individuelles.

## Format

Cette API utilise le format RPC `json 2.0`. Pour plus d'informations sur les appels JSON RPC, cliquez [ici](emettre-des-appels-dapi.md).

## Endpoint

```cpp
/ext/ipcs
```

## Méthodes

### ipcs.publishBlockchain

Enregistrez une blockchain pour qu'elle publie les sommets acceptés sur une socket Unix domain.

**Signature**

```cpp
ipcs.publishBlockchain({blockchainID: string}) -> {consensusURL: string, decisionsURL: string}
```

* `blockchainID` est la blockchain qui publiera les sommets acceptés.
* `consensusURL` est le chemin de la socket domain Unix sur laquelle les sommets sont publiés.
* `decisionsURL` est le chemin de la socket domain Unix sur laquelle les transactions sont publiées.

**Exemple d'un Appel**

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

**Exemple de Réponse**

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

Désenregistrez une blockchain afin qu'elle ne publie plus sur une socket domain Unix.

**Signature**

```cpp
ipcs.unpublishBlockchain({blockchainID: string}) -> {success: bool}
```

* `blockchainID` est la blockchain qui ne publiera plus sur une socket domain Unix.

**Exemple d'un Appel**

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

**Exemple de Réponse**

```cpp
{
    "jsonrpc":"2.0",
    "result":{
        "success":true
    },
    "id":1
}
```

