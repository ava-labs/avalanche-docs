# Crear un subnet

## Introducción

Un [subnet](../../../learn/platform-overview/#subnets) es un conjunto de validadores. Un subnet valida un conjunto de cadenas de bloqueo. Cada blockchain es validado por exactamente un subnet, que se especifica en la creación de blockchain. Las subredes son un poderoso primitivo que permite la creación de cadenas de bloqueo autorizadas.

Cuando se crea un subnet, se especifica un umbral y un conjunto de llaves. \(En realidad las direcciones de las llaves, no las propias llaves, se especifican. \) Para añadir un validador a esa subred, se necesitan firmas _de umbral_ de esas teclas. Llamamos a estas **teclas de control** del subred y llamamos la firma de una clave de control en una transacción que agrega un validador a una firma **de control.** La oportunidad es que un subnet tiene control sobre su membresía.

En este tutorial, crearemos un nuevo subred con 2 teclas de control y un umbral de 2.

### Generar las teclas de control<a id="generate-the-control-keys"></a>

Primero, generemos las 2 teclas de control. Para ello llamamos [`platform.createAddress`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createaddress) Esto genera una nueva clave privada y la almacena para un usuario.

Para generar la primera clave:

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

Esto da la primera tecla de control \(de nuevo, realmente da la _dirección_ de la primera tecla de control\). La clave es sostenida por el usuario que acabamos de especificar.

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "P-avax1spnextuw2kfzeucj0haf0e4e08jd4499gn0zwg"
    },
    "id": 1
}
```

Generar la segunda llave:

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

La respuesta contiene la segunda tecla de control, que es sostenida por el usuario que acabamos de especificar:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "P-avax1zg5uhuwfrf5tv852zazmvm9cqratre588qm24z"
    },
    "id": 1
}
```

### Crear el Subred<a id="create-the-subnet"></a>

Para crear un subnet, llamamos [`platform.createSubnet`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createsubnet).

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

La respuesta nos da el ID de la transacción, que también es el ID del Subnet, recién creado.

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

Podemos llamar a [`platform.getSubnets`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getsubnets) para conseguir todas las Subnets que existen:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getSubnets",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

La respuesta confirma que se creó nuestro subnet:

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

### Añadir Validadores al Subnet<a id="add-validators-to-the-subnet"></a>

Este [tutorial](../nodes-and-staking/add-a-validator.md) le mostrará cómo agregar validadores a una subred.

