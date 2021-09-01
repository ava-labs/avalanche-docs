# Añadir un Validador

## Introducción

La [red primaria](https://avalanche.gitbook.io/avalanche/build/tutorials/platform/add-a-validator#introduction) es inherente a la plataforma de Avalanche y valida las [blockchains integradas](https://avalanche.gitbook.io/avalanche/learn/platform-overview) de Avalanche En este tutorial, agregaremos un nodo a la red primaria y una [subred](https://avalanche.gitbook.io/avalanche/learn/platform-overview#subnets) en Avalanche.

La P-Chain maneja los metadatos de Avalanche. Esto incluye el seguimiento de qué nodos están en qué subredes, que blockchains existen, y cuales subnets están validando cuales blockchains. Para agregar un validador, emitiremos [transacciones](http://support.avalabs.org/en/articles/4587384-what-is-a-transaction) a la P-Chain.

{% hint style="danger" %}Tenga en cuenta que una vez que emita la transacción para agregar un nodo como validador, no hay forma de cambiar los parámetros.** No puedes eliminar tu participación temprano o cambiar la cantidad de acción, el ID de nodo o la dirección de recompensa.** Por favor, asegúrate de utilizar los valores correctos en los llamados de la API a continuación. Si no estás seguro, busca las [preguntas frecuentes de desarrolladores](http://support.avalabs.org/en/collections/2618154-developer-faq) o pide ayuda en [Discord.](https://chat.avalabs.org/){% endhint %}

## Requisitos

Has completado [Ejecutar un nodo](run-avalanche-node.md) de Avalanche y están familiarizados con [la arquitectura de](../../../learn/platform-overview/) Avalanche. En este tutorial, usamos [la colección de Avalanche para](https://github.com/ava-labs/avalanche-postman-collection) ayudarnos a hacer llamadas de la API.

`--public-ip=[YOUR NODE'S PUBLIC IP HERE]`Para asegurar que tu nodo esté bien conectado, asegúrate de que tu nodo pueda recibir y enviar tráfico TCP en el puerto de participación \( `9651`de forma predeterminada\) y iniciaste tu nodo con argumento de la línea de comandos El no hacer ninguna de estas cosas puede poner en peligro su recompensa de Staking.

## Añade un Validador con la Wallet de Avalanche

Primero, te mostramos cómo agregar tu nodo como validador usando [la billetera](https://wallet.avax.network) de Avalanche.

Obtén el ID de tu nodo llamando [`info.getNodeID`](https://avalanche.gitbook.io/avalanche/build/apis/info-api#info-getnodeid)a:

![getNodeID](../../../.gitbook/assets/getNodeID-postman.png)

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

Abre [la billetera](https://wallet.avax.network/) e ve la `Earn`pestaña. Elige .`Add Validator`

![Billetera de la web](../../../.gitbook/assets/web-wallet-earn-tab.png)

Rellena los parámetros de Staking. Se explican con más detalle a continuación. Cuando hayas llenado en todos los parámetros de participación y los revisas dobles, haz clic en `Confirm`. Asegúrate de que el periodo de Staking es de al menos 2 semanas, la comisión de delegación es de al menos el 2%, y estás haciendo Stake de al menos 2.000 AVAX.

{% page-ref page="../../../learn/platform-overview/staking.md" %}

![Gana validada](../../../.gitbook/assets/earn-validate.png)

Deberías ver este mensaje de aprobación, y tu balance debería ser actualizado.

![Tu transacción de validación](../../../.gitbook/assets/your-validation-transaction-is-sent.png)

Llamar [`platform.getPendingValidators`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-getpendingvalidators)verifica que nuestra transacción fue aceptada.

![getPendingValidators postman](../../../.gitbook/assets/getPendingValidators-postman.png)

Vuelve a la `Earn`pestaña, y haz clic en .`Estimated Rewards`

![Gana de validada, delegada](../../../.gitbook/assets/earn-validate-delegate.png)

Una vez que la hora de inicio de nuestro validador haya pasado, veremos las recompensas que podemos ganar, así como su hora de inicio, su hora de fin y el porcentaje de su período de validación que ha pasado.

![Recompensas estimadas](../../../.gitbook/assets/estimated-rewards.png)

¡Eso es todo!

## Añadir un validador con llamados a la API

También podemos añadir un nodo al conjunto de validadores haciendo llamados API a nuestro nodo. Para agregar un nodo la red primaria, llamaremos [`platform.addValidator`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-addvalidator).

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

Este es el ID de nodo del validador que se está agregando. Para obtener la ID de tu nodo, llama [`info.getNodeID`](https://avalanche.gitbook.io/avalanche/build/apis/info-api#info-getnodeid)a:

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

`startTime`y`endTime`

Cuando uno emite una transacción para unirse a la red primaria, especifican el tiempo que ingresarán \(Empieza a validar\) y salen \(deja de validar.\) La duración mínima que se puede validar la red primaria es de 24 horas, y la duración máxima es de un año. Uno puede volver a ingresar en la red primaria después de salir, es solo que la _duración máxima _continua es un año. `startTime`y `endTime`son las veces Unix cuando tu validador comenzará y dejará de validar la red primaria, respectivamente. `startTime`debe ser en el futuro en relación con el momento de emitir la transacción.

`stakeAmount`

Para validar la Red Primaria, se debe hacer stake de AVAX. Este parámetro define el monto de AVAX del stake.

`rewardAddress`

Cuando un validador deje de validar la Red Primaria, recibirá una recompensa si es lo suficientemente receptivo y correcto mientras valida la Red Primaria. Estos tokens se envían a `rewardAddress`. La participación original se enviará de vuelta a una dirección controlada por `username`.

El stake de un validador nunca es reducido, sin importar su comportamiento; siempre recibirán su stake de vuelta cuando terminen de validar.

`changeAddr`

Cualquier cambio que resulte de esta transacción se enviará a esta dirección. Puedes dejar este campo vacío; si lo haces, el cambio se enviará a una de las direcciones que tienes tus controles de usuario.

`delegationFeeRate`

Avalanche permite la delegación del Stake. Este parámetro es el porcentaje de comisión que este validador cobra cuando otros delegan el Stake. `delegationFeeRate``1.2345`Por ejemplo, si es y alguien delega en este validador, entonces cuando el período de delegación ha terminado, el 1.2345 % de la recompensa va al validador y el resto va al delegador.

`username`y`password`

Estos parámetros son el nombre de usuario y la contraseña del usuario que paga la comisión de la transacción, proporciona el AVAX del Stake y a quien se les devolverá los AVAX en Stake.

Ahora vamos a emitir la transacción. Utilizamos el comando shell `date`para calcular el tiempo de Unix 10 minutos y 30 días en el futuro para usar como los valores `startTime`y , `endTime`respectivamente. \(Nota: Si estás en una Mac, reemplaza `$(date`con .`$(gdate` Si no has `gdate`instalado, `brew install coreutils`haz.\) En este ejemplo apostamos 2000 AVAX \(2 x 1012 nAVAX\).

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

Podemos comprobar el estado de la transacción llamando al [`platform.getTxStatus`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-gettxstatus)siguiente:

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

El estado debería ser `Committed`, lo que significa que la transacción fue exitosa. Podemos llamar [`platform.getPendingValidators`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-getpendingvalidators)y ver que el nodo está ahora en el validador pendiente para la red primaria:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

La respuesta debería incluir el nodo que acabamos de añadir:

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

Cuando el tiempo `1584021450`llegue, este nodo empezará a validar la red primaria. Cuando llegue a la `1584121156`fecha, este nodo dejará de validar la red primaria. La AVAX en staked se devolverá a una dirección controlada por y las recompensas, si las `username`hay, se entregarán a la `rewardAddress`.

## Añadir un Validador de Subnet

### Emisión de una Transacción de Validador de una Subnet

Ahora añadamos el mismo nodo a una subnet. Lo siguiente tendrá más sentido si ya has hecho este [tutorial sobre crear una Subnet](https://avalanche.gitbook.io/avalanche/build/tutorials/platform/create-a-subnet). Ahora mismo sólo puedes añadir validadores a las subnets con llamados API, no con la Wallet de Avalanche.

Supongamos que la Subred tiene ID `nTd2Q2nTLp8M9qv2VKHMdvYhtNWX7aTPa4SMEK7x7yJHbcWvr`, umbral 2 y que `username`contiene al menos 2 claves de control.

[`platform.addSubnetValidator`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-addsubnetvalidator)Para agregar el validador, llamaremos método de API Su firma es:

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

Este es el ID de nodo del validador que se agrega a la subred.** Este validador debe validate la red primaria durante toda la duración que valida esta it**

`subnetID`

Este es el ID de la subnet a la que estamos añadiendo un validador.

`startTime`y`endTime`

`endTime`Similar a arriba, estas son las épocas Unix que el validador iniciará y dejará de validar la subred. debe ser en o después de que el validador empiece a validar la red primaria, y `startTime`debe estar en o antes de que el validador deje de validar la red primaria.

`weight`

Este es el peso de la muestra del validador para el consenso. Si el peso del validador es 1 y el peso acumulado de todos los validadores en la subnet es 100, entonces este validador se incluirá en aproximadamente 1 de cada 100 muestras durante el consenso. El peso acumulado de todos los validadores en la subred debe ser al menos `snow-sample-size`. Por ejemplo, si solo hay un validador en la subred, su peso debe ser al menos \(por `snow-sample-size`defecto 20\). Recuerda que el peso de un validador no puede ser cambiado mientras está validado, así que ten cuidado de usar un valor apropiado.

`changeAddr`

Cualquier cambio que resulte de esta transacción se enviará a esta dirección. Puedes dejar este campo vacío; si lo haces, el cambio se enviará a una de las direcciones que tienes tus controles de usuario.

`username`y`password`

Estos parámetros son el nombre de usuario y la contraseña del usuario que paga la comisión de la transacción. Este usuario debe tener un número suficiente de las claves de control de esta Subnet para poder añadir un validador a esta Subnet.

Utilizamos el comando shell `date`para calcular el tiempo de Unix 10 minutos y 30 días en el futuro para usar como los valores `startTime`y , `endTime`respectivamente. \(Nota: Si estás en una Mac, reemplaza `$(date`con .`$(gdate` Si no has `gdate`instalado, `brew install coreutils`haz.\)

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.addSubnetValidator",
    "params": {
        "nodeID":"NodeID-LMUue2dBBRWdDbPL4Yx47Ps31noeewJji",
        "subnetID":"nTd2Q2nTLp8M9qv2VKHMdvYhtNWX7aTPa4SMEK7x7yJHbcWvr",
        "startTime":'$(date --date="10 minutes" +%s)',
        "endTime":'$(date --date="30 days" +%s)',
        "weight":30,
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
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
        "txID": "2exafyvRNSE5ehwjhafBVt6CTntot7DFjsZNcZ54GSxBbVLcCm",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

Podemos comprobar el estado de la transacción llamando al [`platform.getTxStatus`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-gettxstatus)siguiente:

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

El estado debería ser `Committed`, lo que significa que la transacción fue exitosa. Podemos llamar [`platform.getPendingValidators`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-getpendingvalidators)y ver que el nodo está ahora en el validador pendiente para la Red Primaria. Esta vez, especificamos el ID de la subnet:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {"subnetID":"nTd2Q2nTLp8M9qv2VKHMdvYhtNWX7aTPa4SMEK7x7yJHbcWvr"},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

La respuesta debería incluir el nodo que acabamos de añadir:

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

Cuando el tiempo `1584042912`llegue, este nodo empezará a validar esta will Cuando llegue a la `1584121156`fecha, este nodo dejará de validar esta it

### Agregando la Subnet a la Lista Blanca

Ahora que el nodo ha sido añadido como validador de la subnet, añadámoslo a la lista blanca de subnets. La lista blanca evita que el nodo valide una subnet sin querer.

Para whitelist la subred, reinicia el nodo y agrega el parámetro con una lista separada de subredes separadas `--whitelisted-subnets`por coma a la lista blanca.

El comando completo es:

`./build/avalanchego --whitelisted-subnets=nTd2Q2nTLp8M9qv2VKHMdvYhtNWX7aTPa4SMEK7x7yJHbcWvr`

