# Añadir un Validador

## Introducción

La [Red Primaria](https://avalanche.gitbook.io/avalanche/build/tutorials/platform/add-a-validator#introduction) es propia de la plataforma de Avalanche y valida las [blockchains incorporadas](https://avalanche.gitbook.io/avalanche/learn/platform-overview) de Avalanche. En este tutorial, añadiremos un nodo a la red primaria y una [subred](https://avalanche.gitbook.io/avalanche/learn/platform-overview#subnets) en Avalanche.

La P-Chain maneja los metadatos de Avalanche. Esto incluye el seguimiento de qué nodos están en qué subredes, que blockchains existen, y cuales subnets están validando cuales blockchains. Para añadir un validador, emitiremos [transacciones](http://support.avalabs.org/en/articles/4587384-what-is-a-transaction) a la P-Chain.

{% hint style="danger" %}Ten en cuenta que, una vez que se emite la transacción para agregar un nodo como validador, no hay forma de cambiar los parámetros.** No puedes quitar tu prueba de participación antes de tiempo ni cambiar la cantidad, la identificación del nodo o la dirección de la recompensa.** Por favor, asegúrate de utilizar los valores correctos en los llamados de la API a continuación. Si no estás seguro, consulta la sección [Developer FAQ o](http://support.avalabs.org/en/collections/2618154-developer-faq) pide ayuda en Di[scord.
](https://chat.avalabs.org/){% endhint %}

## Requisitos

Haber completado [Ejecuta un nodo de Avalanche](run-avalanche-node.md) y comprender [La arquitectura de Avalanche](../../../learn/platform-overview/). En este tutorial, usamos la [Colección de Postman de Avalanche](https://github.com/ava-labs/avalanche-postman-collection) para ayudarnos a hacer llamados a la API.

Para asegurarse de que su nodo está bien conectado, asegúrate de que su nodo puede recibir y enviar el tráfico TCP en el puerto de participación (`9651` predeterminado) y que iniciaste tu nodo con el argumento de la línea de comandos`--public-ip=[YOUR NODE'S PUBLIC IP HERE]`. El no hacer ninguna de estas cosas puede poner en peligro su recompensa de Staking.

## Añade un Validador con la Wallet de Avalanche

Primero, te mostramos cómo añadir tu nodo como validador usando la [billetera de Avalanche](https://wallet.avax.network).

Obtén la identificación de tu nodo llamando a [`info.getNodeID`](https://avalanche.gitbook.io/avalanche/build/apis/info-api#info-getnodeid):

![getNodeID postman](../../../.gitbook/assets/getNodeID-postman.png)

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

La respuesta contiene el ID de tu Nodo:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "nodeID": "NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD"
    },
    "id": 1
}
```

Abre [la billetera](https://wallet.avax.network/) y ve a la pestaña `Earn`. Elige `Add Validator`.

![Pestaña earn de la billetera web](../../../.gitbook/assets/web-wallet-earn-tab.png)

Rellena los parámetros de Staking. Se explican con más detalle a continuación. Cuando hayas rellenado todos los parámetros de participación y los hayas comprobado dos veces, haz clic en `Confirm`. Asegúrate de que el periodo de Staking es de al menos 2 semanas, la comisión de delegación es de al menos el 2%, y estás haciendo Stake de al menos 2.000 AVAX.

{% page-ref page="../../../learn/platform-overview/staking.md" %}

![Obtén una validación](../../../.gitbook/assets/earn-validate.png)

Deberías ver este mensaje de aprobación, y tu balance debería ser actualizado.

![Tu transacción de validación se envió](../../../.gitbook/assets/your-validation-transaction-is-sent.png)

Al llamar a [`platform.getPendingValidators`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-getpendingvalidators) verificas que nuestra transacción fue aceptada.

![getPendingValidators postman](../../../.gitbook/assets/getPendingValidators-postman.png)

Regresa a la pestaña `Earn` y haz clic en `Estimated Rewards`.

![Obtener, validar, delegar](../../../.gitbook/assets/earn-validate-delegate.png)

Una vez que la hora de inicio de nuestro validador haya pasado, veremos las recompensas que podemos ganar, así como su hora de inicio, su hora de fin y el porcentaje de su período de validación que ha pasado.

![Recompensas estimadas](../../../.gitbook/assets/estimated-rewards.png)

¡Eso es todo!

## Añadir un validador con llamados a la API

También podemos añadir un nodo al conjunto de validadores haciendo llamados API a nuestro nodo. Para agregar un nodo a la red primaria, llamaremos a [`platform.addValidator`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-addvalidator).

La firma de este método es:

```cpp
platform.addValidator(
    {
        nodeID: string,
        startTime: int,
        endTime: int,
        stakeAmount: int,
        rewardAddress: string,
        changeAddr: string, (optional)
        delegationFeeRate: float,
        username: string,
        password: string
    }
) -> {txID: string}
```

Vamos a examinar estos argumentos.

`nodeID`

Este es el ID de nodo del validador que se está agregando. Para obtener la identificación de tu nodo, llama a [`info.getNodeID`](https://avalanche.gitbook.io/avalanche/build/apis/info-api#info-getnodeid):

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "info.getNodeID",
    "params":{},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

La respuesta contiene el ID de tu Nodo:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "nodeID": "NodeID-LMUue2dBBRWdDbPL4Yx47Ps31noeewJji"
    },
    "id": 1
}
```

`startTime` y `endTime`

Cuando se emite una transacción para unirse a la red primaria, especifican la hora en que entrarán (empezarán a validar) y saldrán (dejarán de validar). La duración mínima que uno puede validar la red primaria es de 24 horas y la duración máxima es de un año. Puedes volver a entrar a la red primaria después de salir, es solo que la duración máxima _continua_ es de un año. `startTime` y `endTime`son los tiempos de Unix en que tu validador comenzará y dejará de validar en la red primaria, respectivamente. `startTime`debe ser en el futuro relativo al momento en que se emite la transacción.

`stakeAmount`

Para validar la Red Primaria, se debe hacer stake de AVAX. Este parámetro define el monto de AVAX del stake.

`rewardAddress`

Cuando un validador deje de validar la Red Primaria, recibirá una recompensa si es lo suficientemente receptivo y correcto mientras valida la Red Primaria. Estos tokens se envían a `rewardAddress`. La participación original será devuelta a una dirección controlada por `username`.

El stake de un validador nunca es reducido, sin importar su comportamiento; siempre recibirán su stake de vuelta cuando terminen de validar.

`changeAddr`

Cualquier cambio que resulte de esta transacción se enviará a esta dirección. Puedes dejar este campo vacío; si lo haces, el cambio se enviará a una de las direcciones que tu usuario controla.

`delegationFeeRate`

Avalanche permite la delegación del Stake. Este parámetro es el porcentaje de comisión que este validador cobra cuando otros delegan el Stake. Por ejemplo, si `delegationFeeRate` es `1.2345` y alguien delega a este validador, cuando termine el período de delegación, el 1,2345% de la recompensa es para el validador y el resto para el delegador.

`username` y `password`

Estos parámetros son el nombre de usuario y la contraseña del usuario que paga la comisión de la transacción, proporciona el AVAX del Stake y a quien se les devolverá los AVAX en Stake.

Ahora vamos a emitir la transacción. Usamos el comando shell `date`para calcular el tiempo de Unix 10 minutos y 30 días en el futuro para usar como los valores de `startTime` y `endTime`, respectivamente. (Nota: en Mac se reemplaza `$(date` con `$(gdate`. Si  `gdate`no está instalado, hay que hacer `brew install coreutils`). En este ejemplo hacemos una participación de 2000 AVAX (2 x 1012 nAVAX).

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.addValidator",
    "params": {
        "nodeID":"NodeID-LMUue2dBBRWdDbPL4Yx47Ps31noeewJji",
        "startTime":'$(date --date="10 minutes" +%s)',
        "endTime":'$(date --date="30 days" +%s)',
        "stakeAmount":2000000000000,
        "rewardAddress":"P-avax1d4wfwrfgu4dkkyq7dlhx0lt69y2hjkjeejnhca",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "delegationFeeRate":10,
        "username":"USERNAME",
        "password":"PASSWORD"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

La respuesta tiene el ID de la transacción, así como la dirección a la que fué enviado el cambio.

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "6pb3mthunogehapzqmubmx6n38ii3lzytvdrxumovwkqftzls",
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
        "txID":"6pb3mthunogehapzqmubmx6n38ii3lzytvdrxumovwkqftzls"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

El estatus debe ser `Committed`, lo que significa que la transacción fue exitosa. Podemos llamar a [`platform.getPendingValidators`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-getpendingvalidators) y ver que el nodo está ahora en el conjunto de validadores pendientes para la red primaria:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {},
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
                "startTime": "1584021450",
                "endtime": "1584121156",
                "stakeAmount": "2000000000000",
            }
        ]
    },
    "id": 1
}
```

Cuando el tiempo llegue a `1584021450`, este nodo comenzará a validar la red primaria. Cuando llegue a `1584121156`, este nodo dejará de validar la red primaria. Los AVAX en participación serán devueltos a una dirección controlada por `username`, y las recompensas, si las hay, se otorgarán a `rewardAddress`.

## Adición de validadores a una subred

Este [tutorial](../platform/create-a-subnet.md#adding-subnet-validators) te mostrará cómo agregar validadores a una subred.