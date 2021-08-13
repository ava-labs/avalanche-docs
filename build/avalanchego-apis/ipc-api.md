# API IPC

L'API IPC permet aux utilisateurs de créer des sockets de domaine UNIX pour les blockchains à publier à. Lorsque la blockchain accepte un vertex/bloc, il le publiera sur une prise et les décisions contenues à l'intérieur seront publiées à un autre.

Un noeud ne sera exposer cette API que s'il est démarré avec [l'argument de ligne de commande](../references/command-line-interface.md) `api-ipcs-enabled=true`.

## Format de message de la IPC

Les messages de prise consistent en un entier 64bit dans le format BigEndian suivi de ce nombre d'octets.

Exemple:

```text
Sending:
    [0x41, 0x76, 0x61, 0x78]
Writes to the socket:
    [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x04, 0x41, 0x76, 0x61, 0x78]
```

## Format URL de la prise de l'IPC

Les noms des prises sont de la forme `<network_id>-<chain_id>-<event_type>` où `<event_type>` est soit `consensuel` ou `décisions`. La prise de consensus reçoit des vertiges et des blocs et tandis que la prise de décisions recouvre les transactions individuelles.

## Format

Cette API utilise le format RPC `json 2.0`.

## Point de fin

`/ext/ipcs`

## Méthodes

### ipcs.publishBlockchain

Enregistrez une chaîne de blocs afin qu'elle publie des sommets acceptés sur une prise de domaine Unix.

#### **Signature**

```cpp
ipcs.publishBlockchain({blockchainID: string}) -> {consensusURL: string, decisionsURL: string}
```

* `blockchainID` est la chaîne de blocs qui publiera les sommets acceptés.
* `consensusURL` est le chemin de la prise de domaine Unix dans laquelle les sommets sont publiés.
* `decisionsURL` est le chemin de la prise de domaine Unix dans lequel les transactions sont publiées.

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Déréguler une chaîne de blocs afin qu'elle ne publie plus à une prise de domaine Unix.

#### **Signature**

```cpp
ipcs.unpublishBlockchain({blockchainID: string}) -> {success: bool}
```

* `blockchainID` est la chaîne de blocs qui ne sera plus publier sur une prise de domaine Unix.

#### **Exemple d'appel**

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

#### **Exemple de réponse**

```cpp
{
    "jsonrpc":"2.0",
    "result":{
        "success":true
    },
    "id":1
}
```

