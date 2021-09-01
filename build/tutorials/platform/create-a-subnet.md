# Crear una Subred

## Introducción

Una [subred](../../../learn/platform-overview/#subnets) es un conjunto de validadores Una subnet valida un conjunto de blockchains. Cada blockchain es validada por exactamente una subnet, la cual se especifica en la creación de la blockchain. Las Subnets son una primitiva poderosa que permite la creación de blockchains autorizadas.

Cuando se crea una subnet, se especifica un límite y un conjunto de control keys. \(En realidad las direcciones de las teclas, no las propias llaves se especifican.\) Para agregar un validador a esa subred, se necesitan _firmas de _umbral de esas clave. **Llamamos las claves de control de la subred **y llamamos la firma de una clave de **control en una transacción que agrega un validador a una subred una firma de control.** El resultado es que una subnet tiene control sobre sus miembros.

En este tutorial, crearemos una nueva subnet con 2 control keys y un límite de 2.

### Generar las claves de control<a id="generate-the-control-keys"></a>

Primero, generemos las 2 control keys. Para ello llamamos [`platform.createAddress`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createaddress)esto genera una nueva clave privada y la almacena para un usuario.

Para generar la primera control key ejecutamos:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createAddress",
    "params": {
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

Esto da la primera clave de control \(de nuevo, en realidad da la _dirección de la primera clave _de control\). La control key la tiene el usuario que acabamos de especificar.

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "P-avax1spnextuw2kfzeucj0haf0e4e08jd4499gn0zwg"
    },
    "id": 1
}
```

Genera la segunda control key:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createAddress",
    "params": {
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

La respuesta contiene la segunda control key, que es guardada por el usuario que acabamos de especificar:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "P-avax1zg5uhuwfrf5tv852zazmvm9cqratre588qm24z"
    },
    "id": 1
}
```

### Crea la subred<a id="create-the-subnet"></a>

Para crear una subred, llamamos [`platform.createSubnet`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createsubnet).

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createSubnet",
    "params": {
        "controlKeys":[
            "P-avax1spnextuw2kfzeucj0haf0e4e08jd4499gn0zwg",
            "P-avax1zg5uhuwfrf5tv852zazmvm9cqratre588qm24z"
        ],
        "threshold":2,
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

La respuesta nos da el ID de la transacción, que es también el ID de la Subnet recién creada.

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "3fbrm3z38NoDB4yMC3hg5pRvc72XqnAGiu7NgaEp1dwZ8AD9g",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

### Verificando el éxito<a id="verifying-success"></a>

Podemos llamar [`platform.getSubnets`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getsubnets)para obtener todas las subredes que existen:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getSubnets",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

La respuesta confirma que nuestra subnet fue creada:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "subnets": [
            {
                "id": "3fbrm3z38NoDB4yMC3hg5pRvc72XqnAGiu7NgaEp1dwZ8AD9g",
                "controlKeys": [
                    "KNjXsaA1sZsaKCD1cd85YXauDuxshTes2",
                    "Aiz4eEt5xv9t4NCnAWaQJFNz5ABqLtJkR"
                ],
                "threshold": "2"
            }
        ]
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

### Añadir validadores a la subred<a id="add-validators-to-the-subnet"></a>

Este [tutorial](../nodes-and-staking/add-a-validator.md) te mostrará cómo agregar validadores a una subred.

