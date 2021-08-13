# Añadir un nodo al conjunto del Validador

## Introducción

La [Red Primaria](https://avalanche.gitbook.io/avalanche/build/tutorials/platform/add-a-validator#introduction) es inherente a la plataforma Avalanche y valida las [cadenas de bloqueo integradas](https://avalanche.gitbook.io/avalanche/learn/platform-overview) de Avalanche. En este tutorial, añadiremos un nodo a la Red Primaria y un [subnet](https://avalanche.gitbook.io/avalanche/learn/platform-overview#subnets) en Avalanche.

La cadena P gestiona metadatos en Avalanche. Esto incluye el seguimiento de los nodos en los que existen subnets, cuáles blockchains y qué subredes están validando qué cadenas de bloqueo. Para agregar un validador, emitiremos [transacciones](http://support.avalabs.org/en/articles/4587384-what-is-a-transaction) a la cadena P.

{% insinuar style="danger" %} Tenga en cuenta que una vez que emita la transacción para agregar un nodo como validador, no hay forma de cambiar los parámetros. **No puedes eliminar tu estaca temprano o cambiar la cantidad de la estaca, ID de nodo o dirección de recompensa.** Por favor, asegúrese de que está utilizando los valores correctos en las llamadas API a continuación. Si no estás seguro, busque las [preguntas frecuentes](http://support.avalabs.org/en/collections/2618154-developer-faq) del desarrollador o pida ayuda en [Discord.](https://chat.avalabs.org/) {% endhint %}

## Requisitos para requisitos de seguridad

Has completado [Run Nodo](run-avalanche-node.md) Avalanche y estás familiarizado con [la arquitectura de Avalanche](../../../learn/platform-overview/). En este tutorial, utilizamos [la colección de Avalanche Postman](https://github.com/ava-labs/avalanche-postman-collection) para ayudarnos a hacer llamadas de API.

Para asegurar que su nodo esté bien conectado, asegúrese de que su nodo pueda recibir y enviar tráfico TCP en el puerto de fijación \(`9651` por defecto\) y que usted inició su nodo con el argumento de línea de comandos `--public-ip=[YOUR IP PÚBLICA DE SU NODO AQUÍ]`. Si no se hace cualquiera de estos puede poner en peligro su gratificación.

## Añadir un validador con Cartera Avalanche

Primero, le mostramos cómo agregar su nodo como validador utilizando [Avalanche Wallet](https://wallet.avax.network).

Consigue la identificación de su nodo llamando a [`info.getNodeID`](https://avalanche.gitbook.io/avalanche/build/apis/info-api#info-getnodeid):

![getNodeID postal.](../../../.gitbook/assets/getNodeID-postman.png)

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

La respuesta tiene la identificación de su nodo:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "nodeID": "NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD"
    },
    "id": 1
}
```

[Abra la billetera](https://wallet.avax.network/) y vaya a la pestaña `Ganar.` Elija `Agregar Validator`.

![Cartera web ganar pestaña](../../../.gitbook/assets/web-wallet-earn-tab.png)

Llene los parámetros de la grata. Se explican con más detalle a continuación. Cuando hayas llenado todos los parámetros de fijación y los haya comprobado doble, haga clic en `Confirmar`. Asegúrese de que el período de fijación sea al menos 2 semanas, la tasa de honorarios de delegación es al menos 2%, y está engrapado al menos 2.000 AVAX.

{% page-ref page=".. /.. /../learn/platform-overview/staking.md" %}

![Ganar validar](../../../.gitbook/assets/earn-validate.png)

Usted debe ver este mensaje de éxito, y su equilibrio debe ser actualizado.

![Su transacción de validación se envía](../../../.gitbook/assets/your-validation-transaction-is-sent.png)

Llamando [`platform.getPendingValidators`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-getpendingvalidators) verifica que nuestra transacción fue aceptada.

![getPendingValidators postales](../../../.gitbook/assets/getPendingValidators-postman.png)

Vuelve a la pestaña `Ganar,` y haz clic en `Recompensas estimadas`.

![Ganar, validar, delegar](../../../.gitbook/assets/earn-validate-delegate.png)

Una vez que el tiempo de inicio de su validador haya pasado, verá las recompensas que puede ganar, así como su tiempo de inicio, el tiempo de finalización y el porcentaje de su período de validación que ha pasado.

![rewards estimadas](../../../.gitbook/assets/estimated-rewards.png)

¡Eso es todo!

## Añada un validador con llamadas API

También podemos agregar un nodo al conjunto de validadores haciendo llamadas API a nuestro nodo. Para agregar un nodo la Red Primaria, llamaremos [`platform.addValidator`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-addvalidator).

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

Vamos a revisar y examinar estos argumentos.

`nodeID`

Este es el ID del nodo del validador que se añade. Para obtener la identificación de su nodo, llame a [`info.getNodeID`](https://avalanche.gitbook.io/avalanche/build/apis/info-api#info-getnodeid):

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "info.getNodeID",
    "params":{},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

La respuesta tiene la identificación de su nodo:

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

Cuando uno emite una transacción para unirse a la Red Primaria, especifican el tiempo que ingresarán \(empezar a validar\) y dejar \(dejar de validar). \) La duración mínima que se puede validar la Red Primaria es de 24 horas, y la duración máxima es de un año. Uno puede volver a entrar en la Red Primaria después de salir, es solo que la duración máxima _continua_ es de un año. `startTime` y `endTime` son los tiempos Unix cuando su validador comenzará y dejará de validar la Red Primaria, respectivamente. `startTime` debe estar en el futuro en relación con el momento en que se emite la transacción.

`Importe de la participación`

Para validar la Red Primaria, uno debe apostar AVAX. Este parámetro define la cantidad de AVAX en estado estancado.

`rewardAddress`

Cuando un validador deje de validar la Red Primaria, recibirán una recompensa si son suficientemente sensibles y correctos mientras validan la Red Primaria. Estas fichas se envían a `rewardAddress`. La estaca original se enviará de vuelta a una dirección controlada por `el nombre de usuario`.

La estaca de un validador nunca se desploma, independientemente de su comportamiento; siempre recibirán su estaca de vuelta cuando terminen de validar.

`changeAddr`

Cualquier cambio resultante de esta transacción se enviará a esta dirección. Puede dejar este campo vacío; si lo hace, el cambio se enviará a una de las direcciones que controla el usuario.

`delegationFeeRate de gastos`

Avalanche permite la delegación de juego. Este parámetro es el porcentaje de honorarios que este validador cobra cuando otros delegan la participación en ellos. Por ejemplo, si la `delegationFeeRate` es `1.2345` y alguien delega en este validador, entonces cuando el período de delegación haya terminado, el 1.2345% de la recompensa va al validador y el resto va al delegador.

`nombre de usuario` y `contraseña`

Estos parámetros son el nombre de usuario y la contraseña del usuario que paga la tarifa de transacción, proporciona el AVAX almacenado y a quien se devolverá el AVAX almacenado.

Ahora emitamos la transacción. Utilizamos la `fecha` de comando shell para calcular el tiempo Unix 10 minutos y 30 días en el futuro para usar como los valores de `startTime` y `endTime`, respectivamente. \(Nota: Si estás en un Mac, reemplace `$(fecha` con `$(gdate`). Si no tiene `gdate` instalado, haga la `brew install coreutils`. \) En este ejemplo apostamos 2.000 AVAX \(2 x 1012 nAVAX\).

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

La respuesta tiene el ID de transacción, así como la dirección al cambio se fue.

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

El estado debe ser `comprometido`, lo que significa que la transacción tuvo éxito. Podemos llamar a [`platform.getPendingValidators`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-getpendingvalidators) y ver que el nodo está ahora en el conjunto de validadores pendientes para la Red Primaria:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

La respuesta debe incluir el nodo que acabamos de añadir:

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

Cuando llegue el momento `1584021450`, este nodo empezará a validar la Red Primaria. Cuando llegue a `1584121156`, este nodo dejará de validar la Red Primaria. El AVAX staked será devuelto a una dirección controlada por `el nombre de usuario`, y las recompensas, si las hubiere, se entregarán a `rewardAddress`.

## Añadiendo un Validador de Subnet

### Emisión de una Transacción de Validador Subnet

Ahora vamos a añadir el mismo nodo a una subred. Lo siguiente tendrá más sentido si ya has hecho este [tutorial sobre la creación de un Subnet](https://avalanche.gitbook.io/avalanche/build/tutorials/platform/create-a-subnet). En este momento solo puede agregar validadores a subnets con llamadas de API, no con Avalanche Wallet.

Supongamos que el Subred tiene ID `nTd2Q2nTLp8M9qv2VKHMdvYhtNWX7aTPa4SMEK7x7yJHbcWvr`, umbral 2, y que el `nombre de usuario` tiene al menos 2 teclas de control.

Para agregar el validador, llamaremos plataforma de método de [`API`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-addsubnetvalidator) Su firma es:

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

Este es el ID de nodo del validador que se añade a la subred. **Este validador debe validar la Red Primaria durante toda la duración que valida este Subnet.**

`subnetID`

Este es el ID del subnet al que estamos agregando un validador.

`startTime` y `endTime`

Al igual que antes, estas son las veces Unix que el validador iniciará y dejará de validar el subnet. `startTime` debe estar en o después del momento en que el validador comience a validar la Red Primaria, y `endTime` debe estar en o antes de que el validador deje de validar la Red Primaria.

`peso`

Este es el peso de muestreo del validador para el consenso. Si el peso del validador es 1 y el peso acumulado de todos los validadores en el subnet es de 100, entonces este validador se incluirá en aproximadamente 1 de cada 100 muestras durante el consenso. El peso acumulado de todos los validadores en el subnet debe ser al menos `el tamaño de la muestra de nieve`. Por ejemplo, si solo hay un validador en la subred, su peso debe ser al menos tamaño de `muestra de nieve` \(predeterminado 20\). Recuerda que el peso de un validador no puede cambiarse mientras está validando, así que cuida utilizar un valor apropiado.

`changeAddr`

Cualquier cambio resultante de esta transacción se enviará a esta dirección. Puede dejar este campo vacío; si lo hace, el cambio se enviará a una de las direcciones que controla el usuario.

`nombre de usuario` y `contraseña`

Estos parámetros son el nombre de usuario y contraseña del usuario que paga la tarifa de transacción. Este usuario debe tener un número suficiente de las teclas de control de este Subnet para añadir un validador a este Subnet.

Utilizamos la `fecha` de comando shell para calcular el tiempo Unix 10 minutos y 30 días en el futuro para usar como los valores de `startTime` y `endTime`, respectivamente. \(Nota: Si estás en un Mac, reemplace `$(fecha` con `$(gdate`). Si no tiene `gdate` instalado, haga la `brew install coreutils`. \)

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

La respuesta tiene el ID de transacción, así como la dirección al cambio se fue.

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

El estado debe ser `comprometido`, lo que significa que la transacción tuvo éxito. Podemos llamar a [`platform.getPendingValidators`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-getpendingvalidators) y ver que el nodo está ahora en el conjunto de validadores pendientes para la Red Primaria. Esta vez, especificamos el ID de subnet:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {"subnetID":"nTd2Q2nTLp8M9qv2VKHMdvYhtNWX7aTPa4SMEK7x7yJHbcWvr"},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

La respuesta debe incluir el nodo que acabamos de añadir:

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

Cuando llegue el momento `1584042912`, este nodo empezará a validar este Subnet. Cuando llegue a `1584121156`, este nodo dejará de validar este Subnet.

### Blanqueando el Subred

Ahora que el nodo ha sido agregado como validador de la subred, añadámoslo a la lista blanca de las subredes. La lista blanca impide que el nodo valida un subnet sin intención.

Para blanquear el subnet, reinicie el nodo y agregue el parámetro --subredes `--whitelisted-subnets` una lista separada de coma de subredes a la lista blanca.

El comando completo es:

`./build/avalanchego ---whitelist-subnets=nTd2Q2nTLp8M9qv2VKHMdvYhtNWX7aTPa4SMEK7x7yJHbcWvr`

