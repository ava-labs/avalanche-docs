# Cadena de plataforma \(P-Chain\) API

Esta API permite a los clientes interactuar con la [cadena P](../../learn/platform-overview/#platform-chain-p-chain), que mantiene el conjunto de [validadores](../../learn/platform-overview/staking.md#validators) de Avalanche y maneja la creación de blockchain.

## Endpoint

```cpp
/ext/P
```

## Formato de la versión

Esta API utiliza el formato `json 2.0` RPC.

## Métodos de trabajo

### platform.addDelegator

Añada un delegado a la Red Primaria.

Un delegado está en juego AVAX y especifica un validador \(el delegatee\) para validar en su nombre. El delegado tiene una mayor probabilidad de ser muestreado por otros validadores \(peso\) en proporción a la participación delegada en ellos.

El delegado cobra una cuota al delegador; el primero recibe un porcentaje de la recompensa de validación del delegado \(si la hay). \) Una transacción que los delegados estaca no tiene ningún cargo.

El período de delegación debe ser un subconjunto del período que el delegado valida la Red Primaria.

Tenga en cuenta que una vez que emita la transacción para agregar un nodo como delegador, no hay forma de cambiar los parámetros. **No puedes eliminar una estaca temprano o cambiar la cantidad de la estaca, ID de nodo o dirección de recompensa.** Por favor asegúrese de que está utilizando los valores correctos. Si no estás seguro, echa un vistazo a nuestras [Preguntas frecuentes](https://support.avalabs.org/en/collections/2618154-developer-faq) para Desarrolladores o pide ayuda en [Discord.](https://chat.avalabs.org/)

{% page-ref page=".. /../learn/platform-overview/staking.md" %}

#### **Firma**

```cpp
platform.addDelegator(
    {
        nodeID: string,
        startTime: int,
        endTime: int,
        stakeAmount: int,
        rewardAddress: string,
        from: []string, //optional
        changeAddr: string, //optional
        username: string,
        password: string
    }
) ->
{
    txID: string,
    changeAddr: string
}
```

* `NodeID` es el ID del nodo para delegar.
* `startTime` es la hora Unix cuando el delegado comienza a delegar.
* `endTime` es el tiempo Unix cuando el delegado deja de delegar \(y se devuelve AVAX staked).
* `La cantidad de la cantidad` de nAVAX el delegado está estancando.
* `rewardAddress` dirección es la dirección a la que se va la recompensa del validador, si hay una.
* `de` son las direcciones que desea utilizar para esta operación. Si se omitida, utiliza cualquiera de sus direcciones según sea necesario.
* `changeAddr` es la dirección a la que se enviará cualquier cambio. Si se omitida, el cambio se envía a una de las direcciones controladas por el usuario.
* `nombre de usuario` es el usuario que paga la cuota de transacción.
* `contraseña` es la contraseña `de nombre de` usuario.
* `txID` es el ID de transacción

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.addDelegator",
    "params": {
        "nodeID":"NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ",
        "rewardAddress":"P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy",
        "startTime":1594102400,
        "endTime":1604102400,
        "stakeAmount":100000,
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "6pB3MtHUNogeHapZqMUBmx6N38ii3LzytVDrXuMovwKQFTZLs",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

### platform.addValidator

Añada un validador a la Red Primaria. Debes apostar a AVAX para hacer esto. Si el nodo es lo suficientemente correcto y sensible mientras se valida, usted recibe una recompensa cuando se llega al final del período de grapado. La probabilidad del validador de ser muestreado por otros validadores durante el consenso es proporcional a la cantidad de AVAX apegada.

El validador cobra una cuota a los delegators; el primero recibe un porcentaje de la recompensa de validación del delegado \(si la hay). \) La cuota mínima de delegación es del 2%. Una transacción que agrega un validador no tiene ningún cargo.

El período de validación debe ser entre 2 semanas y 1 año.

Hay un peso total máximo impuesto a los validadores. Esto significa que ningún validador jamás tendrá más AVAX guardado y delegado en él que este valor. Este valor se establecerá inicialmente en `min(5 * cantidad en staked, 3M AVAX)`. El valor total de un validador es de 3 millones de AVAX.

Tenga en cuenta que una vez que emita la transacción para agregar un nodo como validador, no hay forma de cambiar los parámetros. **No puedes eliminar la estaca temprano o cambiar la cantidad de la estaca, ID de nodo o dirección de recompensa.** Por favor asegúrese de que está utilizando los valores correctos. Si no estás seguro, echa un vistazo a nuestras [Preguntas frecuentes](https://support.avalabs.org/en/collections/2618154-developer-faq) para Desarrolladores o pide ayuda en [Discord.](https://chat.avalabs.org/)

{% page-ref page=".. /../learn/platform-overview/staking.md" %}

#### **Firma**

```cpp
platform.addValidator(
    {
        nodeID: string,
        startTime: int,
        endTime: int,
        stakeAmount: int,
        rewardAddress: string,
        delegationFeeRate: float,
        from: []string, //optional
        changeAddr: string, //optional
        username: string,
        password: string
    }
) ->
{
    txID: string,
    changeAddr: string
}
```

* `nodeID` es el ID del nodo del validador añadido.
* `startTime` es el tiempo Unix cuando el validador comienza a validar la Red Primaria.
* `endTime` es el tiempo Unix cuando el validador deja de validar la Red Primaria \(y se devuelve AVAX staked).
* `La cantidad de la cantidad` de nAVAX el validador está estancando.
* `rewardAddress` dirección es la dirección a la que se va a hacer la recompensa del validador, si hay una.
* `delegationFeeRate` es el porcentaje de honorarios que este validador cobra cuando otros delegan en ellos la participación de otros. Hasta 4 lugares decimales permitidos; se ignoran los lugares decimales adicionales. Debe ser entre 0 y 100, inclusive. Por ejemplo, si la `delegationFeeRate` es `1.2345` y alguien delega en este validador, entonces cuando el período de delegación haya terminado, el 1.2345% de la recompensa va al validador y el resto va al delegador.
* `de` son las direcciones que desea utilizar para esta operación. Si se omitida, utiliza cualquiera de sus direcciones según sea necesario.
* `changeAddr` es la dirección a la que se enviará cualquier cambio. Si se omitida, el cambio se envía a una de las direcciones controladas por el usuario.
* `nombre de usuario` es el usuario que paga la cuota de transacción.
* `contraseña` es la contraseña `de nombre de` usuario.
* `txID` es el ID de transacción

#### **Ejemplo de llamada**

En este ejemplo, utilizamos `la fecha` de comandos de shell para calcular los tiempos Unix 10 minutos y 2 días en el futuro. \(Nota: Si estás en un Mac, reemplace `$(fecha` con `$(gdate`). Si no tiene `gdate` instalado, haga la `brew install coreutils`. \)

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.addValidator",
    "params": {
        "nodeID":"NodeID-ARCLrphAHZ28xZEBfUL7SVAmzkTZNe1LK",
        "rewardAddress":"P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy",
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "startTime":'$(date --date="10 minutes" +%s)',
        "endTime":'$(date --date="2 days" +%s)',
        "stakeAmount":1000000,
        "delegationFeeRate":10,
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Respuesta de ejemplo**

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

### platform.addSubnetValidator

Añada un validador a un subnet distinto de la Red Primaria. El Validador debe validar la Red Primaria durante toda la duración que validen esta subred.

#### **Firma**

```cpp
platform.addSubnetValidator(
    {
        nodeID: string,
        subnetID: string,
        startTime: int,
        endTime: int,
        weight: int,
        from: []string, //optional
        changeAddr: string, //optional
        username: string,
        password: string
    }
) ->
{
    txID: string,
    changeAddr: string,
}
```

* `NodeID` es el ID del nodo del validador.
* `subnetID` es el subred que validarán.
* `startTime` es el tiempo unix cuando el validador comienza a validar la subred.
* `endTime` es el tiempo unix cuando el validador deja de validar la subred.
* `peso` es el peso del validador utilizado para el muestreo.
* `de` son las direcciones que desea utilizar para esta operación. Si se omitida, utiliza cualquiera de sus direcciones según sea necesario.
* `changeAddr` es la dirección a la que se enviará cualquier cambio. Si se omitida, el cambio se envía a una de las direcciones controladas por el usuario.
* `nombre de usuario` es el usuario que paga la cuota de transacción.
* `contraseña` es la contraseña `de nombre de` usuario.
* `txID` es el ID de transacción.

#### **Llamada de ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.addSubnetvalidator",
    "params": {
        "nodeID":"NodeID-7xhw2mdxuds44j42tcb6u5579esbst3lg",
        "subnetID":"zbfoww1ffkpvrfywpj1cvqrfnyesepdfc61hmu2n9jnghduel",
        "startTime":1583524047,
        "endTime":1604102399,
        "weight":1,
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID": "2exafyvRNSE5ehwjhafBVt6CTntot7DFjsZNcZ54GSxBbVLcCm",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    }
}
```

### platform.createAddress

Crear una nueva dirección controlada por el usuario dado.

#### **Firma**

```cpp
platform.createAddress({
    username: string,
    password: string
}) -> {address: string}
```

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createAddress",
    "params": {
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "P-avax12lqey27sfujqq6mc5a3jr5av56cjsu8hg2d3hx"
    },
    "id": 1
}
```

### platform.createBlockchain

Crear un nuevo blockchain. Actualmente solo apoya la creación de nuevas instancias del AVM y del Timestamp VM.

#### **Firma**

```cpp
platform.createBlockchain(
    {
        subnetID: string,
        vmID: string,
        name: string,
        genesisData: string,
        encoding: string, //optional
        from: []string, //optional
        changeAddr: string, //optional
        username: string,
        password: string
    }
) ->
{
    txID: string,
    changeAddr: string
}
```

* `subnetID` es el ID del Subnet que valida el nuevo blockchain. El Subred debe existir y no puede ser la Red Primaria.
* `vmID` es el ID de la Máquina Virtual de la cadena de blockchain. También puede ser un alias de la Máquina Virtual.
* `nombre` es un nombre legible por el hombre para el nuevo blockchain. No necesariamente único.
* `genesisData` es la representación byte del estado de génesis del nuevo blockchain codificado en el formato especificado por el parámetro `de` codificación.
* `La codificación` especifica el formato que debe utilizar para `genesisData`. Puede ser "cb58" o "hex". Defaults to "cb58". Las máquinas virtuales deben tener un método de API estático llamado `buildGenesis` que puede utilizarse para generar `genesisData`
* `de` son las direcciones que desea utilizar para esta operación. Si se omitida, utiliza cualquiera de sus direcciones según sea necesario.
* `changeAddr` es la dirección a la que se enviará cualquier cambio. Si se omitida, el cambio se envía a una de las direcciones controladas por el usuario.
* `nombre de usuario` es el usuario que paga la cuota de transacción. Este usuario debe tener un número suficiente de las teclas de control de la subred.
* `contraseña` es la contraseña `de nombre de` usuario.
* `txID` es el ID de transacción.

#### **Ejemplo de llamada**

En este ejemplo estamos creando una nueva instancia de la máquina virtual de Timestamp . `genesisData` provenían de llamar `timestamp.buildGenesis`.

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createBlockchain",
    "params" : {
        "vmID":"timestamp",
        "subnetID":"2bRCr6B4MiEfSjidDwxDpdCyviwnfUVqB2HGwhm947w9YYqb7r",
        "name":"My new timestamp",
        "genesisData": "45oj4CqFViNHUtBxJ55TZfqaVAXFwMRMj2XkHVqUYjJYoTaEM",
        "encoding": "cb58",
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2TBnyFmST7TirNm6Y6z4863zusRVpWi5Cj1sKS9bXTUmu8GfeU",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

### platform.createSubnet

Crear un nuevo subnet.

El ID de la subred es el mismo que el ID de esta transacción.

#### **Firma**

```cpp
platform.createSubnet(
    {
        controlKeys: []string,
        threshold: int,
        from: []string, //optional
        changeAddr: string, //optional
        username: string,
        password: string
    }
) ->
{
    txID: string,
    changeAddr: string
}
```

* Para añadir un validador a este subnet, se requieren firmas `de umbral` de las direcciones en `controlKeys`
* `de` son las direcciones que desea utilizar para esta operación. Si se omitida, utiliza cualquiera de sus direcciones según sea necesario.
* `changeAddr` es la dirección a la que se enviará cualquier cambio. Si se omitida, el cambio se envía a una de las direcciones controladas por el usuario.
* `nombre de usuario` es el usuario que paga la cuota de transacción.
* `contraseña` es la contraseña `de nombre de` usuario.

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createSubnet",
    "params": {
        "controlKeys":[
            "P-avax13xqjvp8r2entvw5m29jxxjhmp3hh6lz8laep9m",
            "P-avax165mp4efnel8rkdeqe5ztggspmw4v40j7pfjlhu"
        ],
        "threshold":2,
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "hJfC5xGhtjhCGBh1JWn3vZ51KJP696TZrsbadPHNbQG2Ve5yd"
    },
    "id": 1
}
```

### platform.exportAVAX

Enviar AVAX desde una dirección en la cadena P a una dirección en la cadena X. Después de emitir esta transacción, debe llamar al método [`avm.importAVAX`](exchange-chain-x-chain-api.md#avm-importavax) de la cadena X-X, para completar la transferencia.

#### **Firma**

```cpp
platform.exportAVAX(
    {
        amount: int,
        from: []string, //optional
        to: string,
        changeAddr: string, //optional
        username: string,
        password: string
    }
) ->
{
    txID: string,
    changeAddr: string
}
```

* `la` cantidad es la cantidad de nAVAX para enviar.
* a es la `dirección` de la cadena X para enviar el AVAX a
* `de` son las direcciones que desea utilizar para esta operación. Si se omitida, utiliza cualquiera de sus direcciones según sea necesario.
* `changeAddr` es la dirección a la que se enviará cualquier cambio. Si se omitida, el cambio se envía a una de las direcciones controladas por el usuario.
* `nombre` de usuario es el usuario que envía el AVAX y paga la tarifa de transacción.
* `contraseña` es la contraseña `de nombre de` usuario.
* `txID` es el ID de esta transacción.

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.exportAVAX",
    "params": {
        "to":"X-avax1yv8cwj9kq3527feemtmh5gkvezna5xys08mxet",
        "amount":1,
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2Kz69TNBSeABuaVjKa6ZJCTLobbe5xo9c5eU8QwdUSvPo2dBk3",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

### platform.exportKey

Consigue la clave privada que controla una dirección determinada.   La clave privada devuelta se puede agregar a un usuario con [`platform.importKey`](platform-chain-p-chain-api.md#platform-importkey).

#### **Firma**

```cpp
platform.exportKey({
    username: string,
    password: string,
    address: string
}) -> {privateKey: string}
```

* `nombre` de usuario es el usuario que controla `la dirección`.
* `contraseña` es la contraseña `de nombre de` usuario.
* `privateKey` es la representación de cadena de la clave privada que controla `la dirección`.

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.exportKey",
    "params" :{
        "username" :"myUsername",
        "password": "myPassword",
        "address": "P-avax1zwp96clwehpwm57r9ftzdm7rnuslrunj68ua3r"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "privateKey":"PrivateKey-Lf49kAJw3CbaL783vmbeAJvhscJqC7vi5yBYLxw2XfbzNS5RS"
    }
}
```

### platform.getBalance

Consigue el equilibrio de AVAX controlado por una dirección determinada.

#### **Firma**

```cpp
platform.getBalance({
    address:string
}) -> {
    balance: string,
    unlocked: string,
    lockedStakeable: string,
    lockedNotStakeable: string,
    utxoIDs: []{
        txID: string,
        outputIndex: int
    }
}
```

* `la` dirección es la dirección para obtener el saldo de.
* `el equilibrio` es el saldo total, en nAVAX.
* `desbloqueado` es el saldo desbloqueado, en NAVAX.
* `lockedStakeable` es el equilibrio de la garantía bloqueada, en nAVAX.
* `lockedNotStakeable` es el equilibrio bloqueado y no stakeable en nAVAX.
* `utxoIDs` son las ID de las UTXOS que `dirección` de referencia.

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
  "jsonrpc":"2.0",
  "id"     : 1,
  "method" :"platform.getBalance",
  "params" :{
      "address":"P-avax1m8wnvtqvthsxxlrrsu3f43kf9wgch5tyfx4nmf"
  }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "balance": "20000000000000000",
        "unlocked": "10000000000000000",
        "lockedStakeable": "10000000000000000",
        "lockedNotStakeable": "0",
        "utxoIDs": [
            {
                "txID": "11111111111111111111111111111111LpoYY",
                "outputIndex": 1
            },
            {
                "txID": "11111111111111111111111111111111LpoYY",
                "outputIndex": 0
            }
        ]
    },
    "id": 1
}
```

### platform.getBlockchains

Obtenga todas las cadenas de bloqueo que existen \(excluyendo la cadena P-Chain\).

#### **Firma**

```cpp
platform.getBlockchains() ->
{
    blockchains: []{
        id: string,
        name:string,
        subnetID: string,
        vmID: string
    }
}
```

* `blockchains` es todas las cadenas de bloqueo que existe en la red Avalanche.
* `nombre` es el nombre legible por el hombre de este blockchain.
* `id` es la ID del blockchain.
* `subnetID` es el ID del Subnet que valida este blockchain.
* `vmID` es el ID de la Máquina Virtual de la cadena de blockchain.

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getBlockchains",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "blockchains": [
            {
                "id": "2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM",
                "name": "X-Chain",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "jvYyfQTxGMJLuGWa55kdP2p2zSUYsQ5Raupu4TW34ZAUBAbtq"
            },
            {
                "id": "2q9e4r6Mu3U68nU1fYjgbR6JvwrRx36CohpAX5UQxse55x1Q5",
                "name": "C-Chain",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "mgj786NP7uDwBCcq6YwThhaN8FLyybkCa4zBWTQbNgmK6k9A6"
            },
            {
                "id": "CqhF97NNugqYLiGaQJ2xckfmkEr8uNeGG5TQbyGcgnZ5ahQwa",
                "name": "Simple DAG Payments",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "sqjdyTKUSrQs1YmKDTUbdUhdstSdtRTGRbUn8sqK8B6pkZkz1"
            },
            {
                "id": "VcqKNBJsYanhVFxGyQE5CyNVYxL3ZFD7cnKptKWeVikJKQkjv",
                "name": "Simple Chain Payments",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "sqjchUjzDqDfBPGjfQq2tXW1UCwZTyvzAWHsNzF2cb1eVHt6w"
            },
            {
                "id": "2SMYrx4Dj6QqCEA3WjnUTYEFSnpqVTwyV3GPNgQqQZbBbFgoJX",
                "name": "Simple Timestamp Server",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH"
            },
            {
                "id": "KDYHHKjM4yTJTT8H8qPs5KXzE6gQH5TZrmP1qVr1P6qECj3XN",
                "name": "My new timestamp",
                "subnetID": "2bRCr6B4MiEfSjidDwxDpdCyviwnfUVqB2HGwhm947w9YYqb7r",
                "vmID": "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH"
            },
            {
                "id": "2TtHFqEAAJ6b33dromYMqfgavGPF3iCpdG3hwNMiart2aB5QHi",
                "name": "My new AVM",
                "subnetID": "2bRCr6B4MiEfSjidDwxDpdCyviwnfUVqB2HGwhm947w9YYqb7r",
                "vmID": "jvYyfQTxGMJLuGWa55kdP2p2zSUYsQ5Raupu4TW34ZAUBAbtq"
            }
        ]
    },
    "id": 1
}
```

### platform.getBlockchainStatus

Consigue el estado de un blockchain.

#### **Firma**

```cpp
platform.getBlockchainStatus(
    {
        blockchainID: string
    }
) -> {status: string}
```

`status` es uno de:

* `Validación`: El blockchain está siendo validado por este nodo.
* `Creado`: La cadena de bloques existe pero no está siendo validada por este nodo.
* `Preferido`: Se propuso crear la cadena de bloques y es probable que se cree, pero la transacción aún no se acepta.
* `Desconocido`: No se propuso la cadena de bloques o no se prefiere la propuesta de crearlo. La propuesta puede ser representada.

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getBlockchainStatus",
    "params":{
        "blockchainID":"2NbS4dwGaf2p1MaXb65PrkZdXRwmSX4ZzGnUu7jm3aykgThuZE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "status": "Created"
    },
    "id": 1
}
```

### platform.getCurrentSupply

Devuelve una parte superior en el número de AVAX que existen. Se trata de un límite superior porque no cuenta con fichas quemadas, incluyendo los honorarios de transacción.

#### **Firma**

```cpp
platform.getCurrentSupply() -> {supply: int}
```

* `la fuente` es una unión superior en el número de AVAX que existen, denominadas en nAVAX.

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getCurrentSupply",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "supply": "365865167637779183"
    },
    "id": 1
}
```

La respuesta en este ejemplo indica que el suministro de AVAX’s es de 365.865 millones.

### platform.getCurrentValidators

Enumera los actuales validadores de la Subnet dada.

Los `delegados` de campo de alto nivel fueron [desmentidos](deprecated-api-calls.md#getcurrentvalidators) a partir de v1.0.1, y eliminados en v1.0.6. En cambio, cada elemento de `validadores` contiene ahora la lista de delegados para ese validador.

#### **Firma**

```cpp
platform.getCurrentValidators({
    subnetID: string, //optional
    nodeIDs: string[], //optional
}) -> {
    validators: []{
        txID: string,
        startTime: string,
        endTime: string,
        stakeAmount: string, //optional
        nodeID: string,
        weight: string, //optional
        rewardOwner: {
            locktime: string,
            threshold: string,
            addresses: string[]
        },
        potentialReward: string,
        delegationFee: string,
        uptime: string,
        connected: bool,
        delegators: []{
            txID: string,
            startTime: string,
            endTime: string,
            stakeAmount: string, //optional
            nodeID: string,
            rewardOwner: {
                locktime: string,
                threshold: string,
                addresses: string[]
            },
            potentialReward: string,
        }
    }
}
```

* `subnetID` es el subnet cuyos actuales validadores son devueltos. Si se omitida, devuelve los actuales validadores de la Red Primaria.
* `nodeIDs` es una lista de los nodeIDs de los actuales validadores que se soliciten. Si se omitida, todos los validadores actuales son devueltos. Si un nodeID especificado no está en el conjunto de validadores actuales, no se incluirá en la respuesta.
* `validadores`:
   * `txID` es la transacción de validación.
   * `startTime` es el tiempo Unix cuando el validador comienza a validar el Subnet.
   * `endTime` es el tiempo Unix cuando el validador deja de validar el Subnet.
   * `La cantidad` de la cantidad de nAVAX este validador en estado de estaca. Omitido si `subnetID` no es la Red Primaria.
   * `nodeID` es el ID del nodo del validador.
   * `el peso` es el peso del validador cuando los validadores de muestreo. Omitido si `subnetID` es la Red Primaria.
   * `rewardOwner` es una salida de `OutputOwners` que incluye `tiempo` de bloqueo, `umbral` y gama de `direcciones`.
   * `potentialReward` es la recompensa potencial ganada de grapar
   * `delegationFeeRate` es el porcentaje de honorarios que este validador cobra cuando otros delegan en ellos la participación de otros.
   * `tiempo` de actividad es el % del tiempo que el nodo deseado ha reportado al igual que en línea.
   * `conectado` si el nodo está conectado a la red
   * `Los delegados` es la lista de delegados a este validador:
      * `txID` es la transacción del delegador.
      * `startTime` es la hora Unix cuando el delegado empezó.
      * `endTime` es el tiempo Unix cuando el delegado se detiene.
      * `La cantidad de la cantidad` de nAVAX este delegado en la zona estancada. Omitido si `subnetID` no es la Red Primaria.
      * `nodeID` es el ID de nodo de validación del nodo.
      * `rewardOwner` es una salida de `OutputOwners` que incluye `tiempo` de bloqueo, `umbral` y gama de `direcciones`.
      * `potentialReward` es la recompensa potencial ganada de grapar
* `delegators`: **\(depreciado a partir de v1.0.1. Véase la nota en la parte superior de la documentación del método.** \)

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getCurrentValidators",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "validators": [
            {
                "txID": "2NNkpYTGfTFLSGXJcHtVv6drwVU2cczhmjK2uhvwDyxwsjzZMm",
                "startTime": "1600368632",
                "endTime": "1602960455",
                "stakeAmount": "2000000000000",
                "nodeID": "NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD",
                "rewardOwner": {
                    "locktime": "0",
                    "threshold": "1",
                    "addresses": [
                        "P-avax18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u"
                    ]
                },
                "potentialReward": "117431493426",
                "delegationFee": "10.0000",
                "uptime": "0.0000",
                "connected": false,
                "delegators": [
                    {
                        "txID": "Bbai8nzGVcyn2VmeYcbS74zfjJLjDacGNVuzuvAQkHn1uWfoV",
                        "startTime": "1600368523",
                        "endTime": "1602960342",
                        "stakeAmount": "25000000000",
                        "nodeID": "NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD",
                        "rewardOwner": {
                            "locktime": "0",
                            "threshold": "1",
                            "addresses": [
                                "P-avax18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u"
                            ]
                        },
                        "potentialReward": "11743144774"
                    }
                ]
            }
        ]
    },
    "id": 1
}
```

### platform.getHeight

Devuelve la altura del último bloque aceptado.

#### **Firma**

```cpp
platform.getHeight() ->
{
    height: int,
}
```

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getHeight",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "height": "56"
    },
    "id": 1
}
```

### platform.getMinStake

Obtenga la cantidad mínima de AVAX necesaria para validar la Red Primaria y la cantidad mínima de AVAX que puede delegarse.

#### **Firma**

```cpp
platform.getMinStake() ->
{
    minValidatorStake : uint64,
    minDelegatorStake : uint64
}
```

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getMinStake"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "minValidatorStake": "2000000000000",
        "minDelegatorStake": "25000000000"
    },
    "id": 1
}
```

### platform.getPendingValidators

Enumera los validadores en el conjunto de validación pendiente del Subnet especificado. Cada validador no está validando actualmente el Subred, sino que lo hará en el futuro.

#### **Firma**

```cpp
platform.getPendingValidators({
    subnetID: string, //optional
    nodeIDs: string[], //optional
}) -> {
    validators: []{
        txID: string,
        startTime: string,
        endTime: string,
        stakeAmount: string, //optional
        nodeID: string,
        delegationFee: string,
        connected: bool,
        weight: string, //optional
    },
    delegators: []{
        txID: string,
        startTime: string,
        endTime: string,
        stakeAmount: string,
        nodeID: string
    }
}
```

* `subnetID` es el subnet cuyos actuales validadores son devueltos. Si se omitida, devuelve los actuales validadores de la Red Primaria.
* `nodeIDs` es una lista de los nodeIDs de los validadores pendientes que solicitar. Si se omitida, todos los validadores pendientes son devueltos. Si un nodeID especificado no está en el conjunto de validadores pendientes, no se incluirá en la respuesta.
* `validadores`:
   * `txID` es la transacción de validación.
   * `startTime` es el tiempo Unix cuando el validador comienza a validar el Subnet.
   * `endTime` es el tiempo Unix cuando el validador deja de validar el Subnet.
   * `La cantidad` de la cantidad de nAVAX este validador en estado de estaca. Omitido si `subnetID` no es la Red Primaria.
   * `nodeID` es el ID del nodo del validador.
   * `conectado` si el nodo está conectado.
   * `el peso` es el peso del validador cuando los validadores de muestreo. Omitido si `subnetID` es la Red Primaria.
* `delegators`:
   * `txID` es la transacción del delegador.
   * `startTime` es la hora Unix cuando el delegado empieza.
   * `endTime` es el tiempo Unix cuando el delegado se detiene.
   * `La cantidad de la cantidad` de nAVAX este delegado en la zona estancada. Omitido si `subnetID` no es la Red Primaria.
   * `nodeID` es el ID de nodo de validación del nodo.

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "validators": [
            {
                "txID": "2NNkpYTGfTFLSGXJcHtVv6drwVU2cczhmjK2uhvwDyxwsjzZMm",
                "startTime": "1600368632",
                "endTime": "1602960455",
                "stakeAmount": "200000000000",
                "nodeID": "NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD",
                "delegationFee": "10.0000",
                "connected": false
            }
        ],
        "delegators": [
            {
                "txID": "Bbai8nzGVcyn2VmeYcbS74zfjJLjDacGNVuzuvAQkHn1uWfoV",
                "startTime": "1600368523",
                "endTime": "1602960342",
                "stakeAmount": "20000000000",
                "nodeID": "NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg"
            }
        ]
    },
    "id": 1
}
```

### platform.getRewardUTXOs

Devuelve las UTXOs que fueron recompensadas después de que terminara el período de fijación o delegación de la transacción proporcionada.

#### **Firma**

```cpp
platform.getRewardUTXOs({
    txID: string,
    encoding: string //optional
}) -> {
    numFetched: integer,
    utxos: []string,
    encoding: string
}
```

* `txID` es el ID de la operación de fijación o delegación
* `numFetched` es el número de UTXOS devuelto
* `utxos` es una variedad de recompensas codificadas UTXOS
* `La codificación` especifica el formato para los UTXOs. Puede ser "cb58" o "hex" y por defecto a "cb58".

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getRewardUTXOs",
    "params": {
        "txID": "2nmH8LithVbdjaXsxVQCQfXtzN9hBbmebrsaEYnLM9T32Uy2Y5"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "numFetched": "2",
        "utxos": [
            "11Zf8cc55Qy1rVgy3t87MJVCSEu539whRSwpdbrtHS6oh5Hnwv1gz8G3BtLJ73MPspLkD83cygZufT4TPYZCmuxW5cRdPrVMbZAHfb6uyGM1jNGBhBiQAgQ6V1yceYf825g27TT6WU4bTdbniWdECDWdGdi84hdiqSJH2y",
            "11Zf8cc55Qy1rVgy3t87MJVCSEu539whRSwpdbrtHS6oh5Hnwv1NjNhqZnievVs2kBD9qTrayBYRs81emGTtmnu2wzqpLstbAPJDdVjf3kjwGWywNCdjV6TPGojVR5vHpJhBVRtHTQXR9VP9MBdHXge8zEBsQJAoZhTbr2"
        ],
        "encoding": "cb58"
    },
    "id": 1
}
```

### platform.getStakingAssetID

Recuperar un activo de un activo de un subnet. Actualmente, esto solo devuelve el activo básico de la Red Primaria.

#### **Firma**

```cpp
platform.getStakingAssetID({
    subnetID: string //optional
}) -> {
    assetID: string
}
```

* `subnetID` es el subnet cuyo activo se solicita
* asset ID es el activo de `un activo` de grapado de un subnet.

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getStakingAssetID",
    "params": {
        "subnetID": "11111111111111111111111111111111LpoYY"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "assetID": "2fombhL7aGPwj3KH4bfrmJwW6PVnMobf9Y2fn9GwxiAAJyFDbe"
    },
    "id": 1
}
```

### platform.getSubnets

Obtenga información sobre los Subnets.

#### **Firma**

```cpp
platform.getSubnets(
    {ids: []string}
) ->
{
    subnets: []{
        id: string,
        controlKeys: []string,
        threshold: string
    }
}
```

* `Los ID` son los ID de las subredes para obtener información. Si se omitida, obtiene información sobre todas las subredes.
* `id` es la ID del Subnet.
* Las firmas `de umbral` de direcciones en `controlLas teclas` son necesarias para agregar un validador a la subred.

Vea [aquí](../tutorials/nodes-and-staking/add-a-validator.md) para obtener información sobre la adición de un validador a un Subnet.

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getSubnets",
    "params": {"ids":["hW8Ma7dLMA7o4xmJf3AXBbo17bXzE7xnThUd3ypM4VAWo1sNJ"]},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "subnets": [
            {
                "id": "hW8Ma7dLMA7o4xmJf3AXBbo17bXzE7xnThUd3ypM4VAWo1sNJ",
                "controlKeys": [
                    "KNjXsaA1sZsaKCD1cd85YXauDuxshTes2",
                    "Aiz4eEt5xv9t4NCnAWaQJFNz5ABqLtJkR"
                ],
                "threshold": "2"
            }
        ]
    },
    "id": 1
}'
```

### platform.getStake

Consigue la cantidad de nAVAX apuñalada por un conjunto de direcciones. La cantidad devuelta no incluye recompensas de grata.

#### **Firma**

```cpp
platform.getStake({addresses: []string}) -> {staked: int}
```

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getStake",
    "params": {
        "addresses": [
            "P-everest1g3ea9z5kmkzwnxp8vr8rpjh6lqw4r0ufec460d",
            "P-everest12un03rm579fewele99c4v53qnmymwu46dv3s5v"
        ]
    },
    "id": 1
}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "staked": "5000000"
    },
    "id": 1
}
```

### platform.getTotalStake

Obtén la cantidad total de nAVAX en la Red Primaria.

#### **Firma**

```cpp
platform.getTotalStake() -> {stake: int}
```

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTotalStake",
    "params": {},
    "id": 1
}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "stake": "279825917679866811"
    },
    "id": 1
}
```

### platform.getTx

Obtiene una transacción por su identificación.

Parámetro `de codificación` opcional para especificar el formato para la transacción devuelta. Puede ser "cb58" o "hex". Defaults to "cb58".

#### **Firma**

```cpp
platform.getTx({
    txID: string,
    encoding: string //optional
}) -> {
    tx: string,
    encoding: string,
}
```

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTx",
    "params": {
        "txID":"TAG9Ns1sa723mZy1GSoGqWipK6Mvpaj7CAswVJGM6MkVJDF9Q",
        "encoding": "cb58"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "tx": "111117XV7Rm5EoKbwXFJp5WWWouAENJcF1zXGxPDPCfTbpiLfwkUXcoHKnfzdXz7sRgGYeaVtJkcD9MNgGuKGXsyWEWpTK2zAToEf64ezp7r7SyvyL7RqC5oqvNbRDShn5hm9pDV4JTCjZR5RzAxjBEJZ2V8eqtU6jvpsJMHxNBtCwL6Atc1t2Dt7s5nqf7wdbFUBvwKXppBb2Yps8wUvtTKQifssMUAPygc2Rv4rGd9LRANk4JTiT15qzUjXX7zSzz16pxdBXc4jp2Z2UJRWbdxZdaybL3mYCFj197bBnYieRYzRohaUEpEjGcohrmkSfHB8S2eD74o2r66sVGdpXYo95vkZeayQkrMRit6unwWBx8FJR7Sd7GysxS9A3CiMc8cL4oRmr7XyvcFCrnPbUZK7rnN1Gtq3MN8k4JVvX6DuiFAS7xe61jY3VKJAZM9Lg3BgU6TAU3gZ",
        "encoding": "cb58"
    },
    "id": 1
}
```

### platform.getTxStatus

Obtiene el estado de una transacción por su ID. Si la transacción fue abandonada, la respuesta incluirá un campo `de razón` con más información por qué la transacción fue abandonada.

Vea [aquí](deprecated-api-calls.md#gettxstatus) para ver notas sobre comportamiento anterior.

#### **Firma**

```cpp
platform.getTxStatus({
    txID: string
}) -> {status: string}
```

`status` es uno de:

* `Comprometido`: La transacción es \(o será \) aceptada por cada nodo
* `Procesamiento`: La transacción está siendo votada por este nodo
* `Caído`: La transacción nunca será aceptada por ningún nodo de la red, compruebe el campo de `razón` para obtener más información
* `Desconocido`: La transacción no ha sido vista por este nodo

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTxStatus",
    "params": {
        "txID":"TAG9Ns1sa723mZy1GSoGqWipK6Mvpaj7CAswVJGM6MkVJDF9Q"
   },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "status": "Committed"
    },
    "id": 1
}
```

### platform.getUTXOs

Obtiene las UTXOs que refieren un conjunto de direcciones.

#### **Firma**

```cpp
platform.getUTXOs(
    {
        addresses: []string,
        limit: int, //optional
        startIndex: { //optional
            address: string,
            utxo: string
        },
        sourceChain: string, //optional
        encoding: string, //optional
    },
) ->
{
    numFetched: int,
    utxos: []string,
    endIndex: {
        address: string,
        utxo: string
    },
    encoding: string,
}
```

* `utxos` es una lista de UTXOS de tal manera que cada UTXO hace referencia al menos una dirección en `direcciones`.
* Al máximo `se` devuelven UTXOs Si se omite `el límite` o supera 1024, se establece en 1024.
* Este método admite la paginación. `endIndex` denota el último UTXO devuelto. Para obtener el siguiente conjunto de UTXOs, utilice el valor de `endIndex` como `startIndex` en la siguiente llamada.
* Si `startIndex` se omitida, traerá todos los UTXOS hasta `límite`.
* Cuando se utiliza la paginación \(es decir, cuando `startIndex` se proporciona \), UTXOs no se garantiza que sean únicos en múltiples llamadas. Es decir, un UTXO puede aparecer en el resultado de la primera llamada, y luego otra vez en la segunda llamada.
* Al utilizar la paginación, la consistencia no está garantizada en múltiples llamadas. Es decir, el conjunto UTXO de las direcciones puede haber cambiado entre llamadas.
* `La codificación` especifica el formato para los UTXOs. Puede ser "cb58" o "hex" y por defecto a "cb58".

#### **Ejemplo de ello**

Supongamos que queremos todas las UTXOs esa referencia al menos uno de `P-avax1s994jad0rtwvlfppyg2yau9nxt60qfv023qx` y `P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr`.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getUTXOs",
    "params" :{
        "addresses":["P-avax1s994jad0rtwvlfpkpyg2yau9nxt60qqfv023qx", "P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr"],
        "limit":5,
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

Esto da respuesta:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "numFetched": "5",
        "utxos": [
            "11PQ1sNw9tcXjVki7261souJnr1TPFrdVCu5JGZC7Shedq3a7xvnTXkBQ162qMYxoerMdwzCM2iM1wEQPwTxZbtkPASf2tWvddnsxPEYndVSxLv8PDFMwBGp6UoL35gd9MQW3UitpfmFsLnAUCSAZHWCgqft2iHKnKRQRz",
            "11RCDVNLzFT8KmriEJN7W1in6vB2cPteTZHnwaQF6kt8B2UANfUkcroi8b8ZSEXJE74LzX1mmBvtU34K6VZPNAVxzF6KfEA8RbYT7xhraioTsHqxVr2DJhZHpR3wGWdjUnRrqSSeeKGE76HTiQQ8WXoABesvs8GkhVpXMK",
            "11GxS4Kj2od4bocNWMQiQhcBEHsC3ZgBP6edTgYbGY7iiXgRVjPKQGkhX5zj4NC62ZdYR3sZAgp6nUc75RJKwcvBKm4MGjHvje7GvegYFCt4RmwRbFDDvbeMYusEnfVwvpYwQycXQdPFMe12z4SP4jXjnueernYbRtC4qL",
            "11S1AL9rxocRf2NVzQkZ6bfaWxgCYch7Bp2mgzBT6f5ru3XEMiVZM6F8DufeaVvJZnvnHWtZqocoSRZPHT5GM6qqCmdbXuuqb44oqdSMRvLphzhircmMnUbNz4TjBxcChtks3ZiVFhdkCb7kBNLbBEmtuHcDxM7MkgPjHw",
            "11Cn3i2T9SMArCmamYUBt5xhNEsrdRCYKQsANw3EqBkeThbQgAKxVJomfc2DE4ViYcPtz4tcEfja38nY7kQV7gGb3Fq5gxvbLdb4yZatwCZE7u4mrEXT3bNZy46ByU8A3JnT91uJmfrhHPV1M3NUHYbt6Q3mJ3bFM1KQjE"
        ],
        "endIndex": {
            "address": "P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr",
            "utxo": "kbUThAUfmBXUmRgTpgD6r3nLj7rJUGho6xyht5nouNNypH45j"
        },
        "encoding": "cb58"
    },
    "id": 1
}
```

Dado que `el número Fetched` es el mismo `límite`, podemos decir que puede haber más UTXOS que no fueron capturados. Llamamos al método otra vez, esta vez con `startIndex`:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getUTXOs",
    "params" :{
        "addresses":["P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr"],
        "limit":5,
        "startIndex": {
            "address": "P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr",
            "utxo": "kbUThAUfmBXUmRgTpgD6r3nLj7rJUGho6xyht5nouNNypH45j"
        },
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

Esto da respuesta:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "numFetched": "4",
        "utxos": [
            "115ZLnNqzCsyugMY5kbLnsyP2y4se4GJBbKHjyQnbPfRBitqLaxMizsaXbDMU61fHV2MDd7fGsDnkMzsTewULi94mcjk1bfvP7aHYUG2i3XELpV9guqsCtv7m3m3Kg4Ya1m6tAWqT7PhvAaW4D3fk8W1KnXu5JTWvYBqD2",
            "11QASUuhw9M1r52maTFUZ4fnuQby9inX77VYxePQoNavEyCPuHN5cCWPQnwf8fMrydFXVMPAcS4UJAcLjSFskNEmtVPDMY4UyHwh2MChBju6Y7V8yYf3JBmYt767NPsdS3EqgufYJMowpud8fNyH1to4pAdd6A9CYbD8KG",
            "11MHPUWT8CsdrtMWstYpFR3kobsvRrLB4W8tP9kDjhjgLkCJf9aaJQM832oPcvKBsRhCCxfKdWr2UWPztRCU9HEv4qXVwRhg9fknAXzY3a9rXXPk9HmArxMHLzGzRECkXpXb2dAeqaCsZ637MPMrJeWiovgeAG8c5dAw2q",
            "11K9kKhFg75JJQUFJEGiTmbdFm7r1Uw5zsyDLDY1uVc8zo42WNbgcpscNQhyNqNPKrgtavqtRppQNXSEHnBQxEEh5KbAEcb8SxVZjSCqhNxME8UTrconBkTETSA23SjUSk8AkbTRrLz5BAqB6jo9195xNmM3WLWt7mLJ24"
        ],
        "endIndex": {
            "address": "P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr",
            "utxo": "21jG2RfqyHUUgkTLe2tUp6ETGLriSDTW3th8JXFbPRNiSZ11jK"
        },
        "encoding": "cb58"
    },
    "id": 1
}
```

Dado que `numFetched` es menos que `límite`, sabemos que hemos terminado de buscar UTXOS y no necesitamos llamar a este método de nuevo.

Supongamos que queremos traer las UTXOS exportadas de la Cadena X a la Cadena P para construir una ImportTx. Entonces necesitamos llamar a GetutXOs con el argumento sourceChain para recuperar los UTXOs:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getUTXOs",
    "params" :{
        "addresses":["P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr"],
        "sourceChain": "X",
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

Esto da respuesta:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "numFetched": "1",
        "utxos": [
            "115P1k9aSVFBfi9siZZz135jkrBCdEMZMbZ82JaLLuML37cgVMvGwefFXr2EaH2FML6mZuCehMLDdXSVE5aBwc8ePn8WqtZgDv9W641JZoLQhWY8fmvitiBLrc3Zd1aJPDxPouUVXFmLEbmcUnQxfw1Hyz1jpPbWSioowb"
        ],
        "endIndex": {
            "address": "P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr",
            "utxo": "S5UKgWoVpoGFyxfisebmmRf8WqC7ZwcmYwS7XaDVZqoaFcCwK"
        },
        "encoding": "cb58"
    },
    "id": 1
}
```

### platform.importAVAX

Completa una transferencia de AVAX de la cadena X a la cadena P-Chain.

Antes de que se llame este método, debe llamar el método [`avm.exportAVAX`](exchange-chain-x-chain-api.md#avm-exportavax) de la cadena X-Chain’s iniciar la transferencia.

#### **Firma**

```cpp
platform.importAVAX(
    {
        from: []string, //optional
        to: string,
        changeAddr: string, //optional
        sourceChain: string,
        username: string,
        password: string
    }
) ->
{
    tx: string,
    changeAddr: string
}
```

* `a` es el ID de la dirección a la que se importa AVAX. Esto debe ser lo mismo que el argumento `de` la llamada correspondiente a la exportación `exportAVAX`. de la cadena X.
* `sourceChain` es el ID o alias de la cadena de la que AVAX está siendo importado. Para importar fondos de la cadena X, utilice `"X"`.
* `de` son las direcciones que desea utilizar para esta operación. Si se omitida, utiliza cualquiera de sus direcciones según sea necesario.
* `changeAddr` es la dirección a la que se enviará cualquier cambio. Si se omitida, el cambio se envía a una de las direcciones controladas por el usuario.
* `nombre de usuario` es el usuario que controla la dirección especificada `en`.
* `contraseña` es la contraseña `de nombre de` usuario.

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.importAVAX",
    "params": {
        "sourceChain": "X",
        "to": "P-avax1apzq2zt0uaaatum3wdz83u4z7dv4st7l5m5n2a",
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username": "myUsername",
        "password": "myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "P63NjowXaQJXt5cmspqdoD3VcuQdXUPM5eoZE2Vcg63aVEx8R",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

### platform.importKey

Dé un control de usuario sobre una dirección proporcionando la clave privada que controla la dirección.

#### **Firma**

```cpp
platform.importKey({
    username: string,
    password: string,
    privateKey:string
}) -> {address: string}
```

* Añadir `privateKey` al conjunto de teclas privadas `de` `nombre` de usuario. `La dirección` es el nombre de usuario de dirección ahora controla con la tecla privada.

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.importKey",
    "params" :{
        "username": "myUsername",
        "password": "myPassword",
        "privateKey": "PrivateKey-2w4XiXxPfQK4TypYqnohRL8DRNTz9cGiGmwQ1zmgEqD9c9KWLq"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc":"2.0",
    "id": 1,
    "result": {
        "address":"P-avax19hwpvkx2p5q99w87dlpfhqpt3czyh8ywasfaym"
    }
}
```

### platform.issueTx

Emitir una transacción a la cadena de la plataforma.

#### **Firma**

```cpp
platform.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {txID: string}
```

* `tx` es la representación de byte de una transacción.
* `La` codificación especifica el formato de codificación para los bytes de transacción. Puede ser "cb58" o "hex". Defaults to "cb58".
* `txID` es el ID de la transacción.

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.issueTx",
    "params": {
        "tx":"111Bit5JNASbJyTLrd2kWkYRoc96swEWoWdmEhuGAFK3rCAyTnTzomuFwgx1SCUdUE71KbtXPnqj93KGr3CeftpPN37kVyqBaAQ5xaDjr7wVBTUYi9iV7kYJnHF61yovViJF74mJJy7WWQKeRMDRTiPuii5gsd11gtNahCCsKbm9seJtk2h1wAPZn9M1eL84CGVPnLUiLP",
        "encoding": "cb58"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "G3BuH6ytQ2averrLxJJugjWZHTRubzCrUZEXoheG5JMqL5ccY"
    },
    "id": 1
}
```

### platform.listAddresses

Lista de direcciones controladas por el usuario dado.

#### **Firma**

```cpp
platform.listAddresses({
    username: string,
    password: string
}) -> {addresses: []string}
```

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.listAddresses",
    "params": {
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "addresses": ["P-avax1ffksh2m592yjzwfp2xmdxe3z4ushln9s09z5p0"]
    },
    "id": 1
}
```

### platform.sampleValidators

Validadores de muestra del subnet especificado.

#### **Firma**

```cpp
platform.sampleValidators(
    {
        size: int,
        subnetID: string, //optional
    }
) ->
{
    validators: []string
}
```

* `el tamaño` es el número de validadores para muestra.
* `subnetID` es el Subred de quien se muestrea. Si se omitió, por defecto en la Red Primaria.
* Cada elemento de `validadores` es el ID de un validador.

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.sampleValidators",
    "params" :{
        "size":2
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "validators":[
            "NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ",
            "NodeID-NFBbbJ4qCmNaCzeW7sxErhvWqvEQMnYcN"
        ]
    }
}
```

### platform.validatedBy

Consigue el Subred que valida un blockchain determinado.

#### **Firma**

```cpp
platform.validatedBy(
    {
        blockchainID: string
    }
) -> {subnetID: string}
```

* `blockchainID` es la ID de blockchain.
* `subnetID` es el ID del Subnet que valida el blockchain.

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.validatedBy",
    "params": {
        "blockchainID": "KDYHHKjM4yTJTT8H8qPs5KXzE6gQH5TZrmP1qVr1P6qECj3XN"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "subnetID": "2bRCr6B4MiEfSjidDwxDpdCyviwnfUVqB2HGwhm947w9YYqb7r"
    },
    "id": 1
}
```

### platform.validates

Consigue las ID de las cadenas de bloqueo que un Subnet valida

#### **Firma**

```cpp
platform.validates(
    {
        subnetID: string
    }
) -> {blockchainIDs: []string}
```

* `subnetID` es la ID del Subnet.
* Cada elemento de `blockchainIDs` es el ID de una cadena de bloques que el Subnet valida .

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.validates",
    "params": {
        "subnetID":"2bRCr6B4MiEfSjidDwxDpdCyviwnfUVqB2HGwhm947w9YYqb7r"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "blockchainIDs": [
            "KDYHHKjM4yTJTT8H8qPs5KXzE6gQH5TZrmP1qVr1P6qECj3XN",
            "2TtHFqEAAJ6b33dromYMqfgavGPF3iCpdG3hwNMiart2aB5QHi"
        ]
    },
    "id": 1
}
```

