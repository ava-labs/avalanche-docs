---
description: Cette API permet aux clients d'interagir avec la chaîne d'horodatage.
---

# API Timestamp

La chaîne d'horodatage est un serveur d'horodatage. Chaque bloc contient le payload en 32 octets et l'horodatage de la création du bloc.

Les [données de genèse](platform-api-p-chain.md) d'une nouvelle instance de la chaîne d'horodatage sont la payload en 32 octets du bloc de genèse.

## Endpoint

```cpp
/ext/timestamp
```

## Méthodes

### timestamp.getBlock

Obtenez un bloc par son identifiant. Si aucun ID n'est fourni, obtenez le dernier bloc.

**Signature**

```cpp
timestamp.getBlock({id: string}) ->
    {
        id: string,
        data: string,
        timestamp: int,
        parentID: string
    }
```

* `id` est l'ID du bloc en cours de récupération. Si omis des arguments, obtient le dernier bloc.
* `data` est la représentation en base 58 \(avec somme de contrôle\) du payload en 32 octets du bloc.
* `timestamp` est l'horodatage Unix lorsque ce bloc a été créé.
* `parentID` est le parent du bloc.

**Exemple d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "timestamp.getBlock",
    "params":{
        "id":"xqQV1jDnCXDxhfnNT7tDBcXeoH2jC3Hh7Pyv4GXE1z1hfup5K"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/timestamp
```

**Example de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "timestamp": "1581717416",
        "data": "11111111111111111111111111111111LpoYY",
        "id": "xqQV1jDnCXDxhfnNT7tDBcXeoH2jC3Hh7Pyv4GXE1z1hfup5K",
        "parentID": "22XLgiM5dfCwTY9iZnVk8ZPuPe3aSrdVr5Dfrbxd3ejpJd7oef"
    },
    "id": 1
}
```

### timestamp.proposeBlock

Proposez la création d'un nouveau bloc.

**Signature**

```cpp
timestamp.proposeBlock({data: string}) -> {success: bool}
```

* `data` est la représentation en base 58 \(avec somme de contrôle\) du payload en 32 octets du bloc proposé.

**Exemple d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "timestamp.proposeBlock",
    "params":{
        "data":"SkB92YpWm4Q2iPnLGCuDPZPgUQMxajqQQuz91oi3xD984f8r"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/timestamp
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "Success": true
    },
    "id": 1
}
```

