# Crear una Subred

## Introducción

Una [subred](../../../learn/platform-overview/#subnets) es un conjunto de validadores. Una subnet valida un conjunto de blockchains. Cada blockchain es validada por exactamente una subnet, la cual se especifica en la creación de la blockchain. Las Subnets son una primitiva poderosa que permite la creación de blockchains autorizadas.

Cuando se crea una subnet, se especifica un límite y un conjunto de control keys. (En realidad, lo que se especifican son las direcciones de las claves, no las claves en sí). Para agregar un validador a esa subred, se necesitan las firmas con _umbral_ de esas claves. A estas las llamamos **claves de control** de la subred, y llamamos **firma de control** a la firma de una clave de control en una transacción que añade un validador a una subred . El resultado es que una subnet tiene control sobre sus miembros.

En este tutorial, crearemos una nueva subnet con 2 control keys y un límite de 2.

_Nota: los ID de blockchains, subredes, transacciones y direcciones pueden ser diferentes para cada ejecución o red. Eso significa que algunas entradas, terminales, etc. del tutorial pueden ser diferentes cuando tú lo pruebas._

### Genera las claves de control<a id="generate-the-control-keys"></a>

Primero, generemos las 2 control keys. Para hacerlo, tienes que llamar a [`platform.createAddress`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createaddress). Esto genera una nueva clave privada y la almacena para el usuario.

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

Esto proporciona la primera clave de control \(nuevamente, en realidad nos proporciona la _dirección _de la primera clave de control\). La clave la tiene el usuario que acabamos de especificar.

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

Para crear una subred, llamaremos a [`platform.createSubnet`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createsubnet).

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

### Comprobación de exito<a id="verifying-success"></a>

Podemos llamar a [`platform.getSubnets`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getsubnets) para obtener todas las subredes que existen:

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

### Adición de validadores de subred  <a id="adding-subnet-validators"></a>

### Emisión de una Transacción de Validador de una Subnet

Ahora agregemos un validador a una subred. Ahora mismo solo puedes añadir validadores a las subnets con llamados API, no con la Wallet de Avalanche.

Supongamos que la subred tiene la identificación `3fbrm3z38NoDB4yMC3hg5pRvc72XqnAGiu7NgaEp1dwZ8AD9g`, el umbral 2, y que `username` tiene al menos dos claves de control.

Para agregar el validador, ejecutaremos el método API [`platform.addSubnetValidator`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-addsubnetvalidator). Su firma es:

```cpp
platform.addSubnetValidator(
    {
        nodeID: string,
        subnetID: string,
        startTime: int,
        endTime: int,
        weight: int,
        changeAddr: string, (optional)
        username: string,
        password: string
    }
) -> {txID: string}
```

Examinemos los parámetros:

`nodeID`

Este es la identificación de nodo del validador que se está agregando a la subred. **Este validador debe validar la red primaria durante todo el tiempo que valide esta subred.**

`subnetID`

Este es el ID de la subnet a la que estamos añadiendo un validador.

`startTime` y `endTime`

Similar a lo anterior, estos son los tiempos de Unix en que el validador comenzará y dejará de validar la subred. `startTime` debe ser en o después del momento en que el validador comience a validar la red primaria, y `endTime`debe ser en el momento o antes de que el validador deje de validar la red primaria.

`weight`

Este es el peso de la muestra del validador para el consenso. Si el peso del validador es 1 y el peso acumulado de todos los validadores en la subnet es 100, entonces este validador se incluirá en aproximadamente 1 de cada 100 muestras durante el consenso. El peso acumulado de todos los validadores en la subred debe ser al menos `snow-sample-size`. Por ejemplo, si solo hay un validador en la subred, su peso debe ser al menos `snow-sample-size` \(20 de forma predeterminada\). Recuerda que el peso de un validador no puede cambiarse mientras está validando, así que ten cuidado de usar un valor apropiado.

`changeAddr`

Cualquier cambio que resulte de esta transacción se enviará a esta dirección. Puedes dejar este campo vacío; si lo haces, el cambio se enviará a una de las direcciones que tu usuario controla.

`username` y `password`

Estos parámetros son el nombre de usuario y la contraseña del usuario que paga la comisión de la transacción. Este usuario debe tener un número suficiente de las claves de control de esta Subnet para poder añadir un validador a esta Subnet.

Usamos el comando shell `date`para calcular el tiempo de Unix 10 minutos y 30 días en el futuro para usar como los valores de `startTime` y `endTime`, respectivamente. \(Nota: en Mac se reemplaza `$(date` con `$(gdate`. Si  `gdate`no está instalado, hay que hacer `brew install coreutils`\).

Ejemplo:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.addSubnetValidator",
    "params": {
        "nodeID":"NodeID-LMUue2dBBRWdDbPL4Yx47Ps31noeewJji",
        "subnetID":"3fbrm3z38NoDB4yMC3hg5pRvc72XqnAGiu7NgaEp1dwZ8AD9g",
        "startTime":'$(date --date="10 minutes" +%s)',
        "endTime":'$(date --date="30 days" +%s)',
        "weight":30,
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

La respuesta tiene el ID de la transacción, así como la dirección a la que fué enviado el cambio.

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2exafyvRNSE5ehwjhafBVt6CTntot7DFjsZNcZ54GSxBbVLcCm",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

Podemos comprobar el estado de la transacción llamando a [`platform.getTxStatus`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-gettxstatus):

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTxStatus",
    "params": {
        "txID":"2exafyvRNSE5ehwjhafBVt6CTntot7DFjsZNcZ54GSxBbVLcCm"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

El estatus debe ser `Committed`, lo que significa que la transacción fue exitosa. Podemos llamar a [`platform.getPendingValidators`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-getpendingvalidators) y ver que el nodo está ahora en el conjunto de validadores pendientes para la red primaria. Esta vez, especificamos el ID de la subnet:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {"subnetID":"3fbrm3z38NoDB4yMC3hg5pRvc72XqnAGiu7NgaEp1dwZ8AD9g"},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

La respuesta debe incluir el nodo que acabamos de agregar:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "validators": [
            {
                "nodeID": "NodeID-LMUue2dBBRWdDbPL4Yx47Ps31noeewJji",
                "startTime":1584042912,
                "endTime":1584121156,
                "weight": "30"
            }
        ]
    },
    "id": 1
}
```

Cuando el tiempo llegue a `1584042912`, este nodo comenzará a validar esta subred. Cuando llegue a `1584121156`, este nodo dejará de validar esta subred.

### Subredes privadas

Las subredes de Avalanche son públicas. Eso significa que cada nodo puede sincronizar y escuchar transacciones en curso o bloques en las subredes, incluso si no están validando la subred escuchada.

Los validadores o balizas de la subred pueden elegir no publicar contenido de las blockchains mediante una configuración `validatorOnly` opcional. La configuración se puede activar con [configuraciones de subred](../../references/command-line-interface.md#subnet-configs). Si un nodo establece `validatorOnly` en `true`, el nodo intercambia mensajes solo con los validadores de esta subred. Otros pares no podrán descubrir contenido de esta subred a partir de este nodo.

Nota: Esta es una configuración específica de los nodos. Cada validador de esta subred tiene que usar esta configuración para crear una subred privada completa.

### Cómo agregar la subred a la Lista Blanca

Ahora que el nodo ha sido añadido como validador de la subnet, añadámoslo a la lista blanca de subnets. La lista blanca evita que el nodo valide una subnet sin querer.

Para hacer una lista blanca de la subred, reinicia el nodo y agrega el parámetro `--whitelisted-subnets` con una lista separada por comas de subredes a ingresar en la lista blanca.

En este ejemplo, el comando completo es:

`./build/avalanchego --whitelisted-subnets=3fbrm3z38NoDB4yMC3hg5pRvc72XqnAGiu7NgaEp1dwZ8AD9g`

Para más información sobre el comando, ver: [whitelisted-subnet command-line argument](../../references/command-line-interface.md#whitelist).

