# API de la Cadena de Plataforma (P-Chain)

Esta API permite que los clientes interactúen con la [P-Chain](../../learn/platform-overview/#platform-chain-p-chain), que mantiene el conjunto de [validadores](../../learn/platform-overview/staking.md#validators) de Avalanche y maneja la creación de blockchains.

## Terminales

```cpp
/ext/P
```

## Formato

Esta API usa el `json 2.0`formato RPC.

## Métodos

### platform.addDelegator

Agrega un delegador a la Red Primaria.

Un delegador hace stake de AVAX y especifica un validador (delegado) para validar la red en su nombre. El delegado tiene una mayor probabilidad de ser muestreado por otros validadores (peso) en proporción a la participación que se le delega.

El delegado le cobra una comisión al delegador; el primero recibe un porcentaje de la recompensa de validación del delegador (si la hay). Una transacción en la que la participación de los delegados no tiene comisión.

El período de delegación debe ser un subconjunto del período en el que el delegado valida la red primaria.

Ten en cuenta que, una vez emitas la transacción para agregar un nodo como delegador, no hay forma de cambiar los parámetros. **No se puede retirar la participación antes de tiempo, tampoco cambiar el monto de dicha participación, la identificación del nodo o la dirección de recompensas.** Por favor, asegúrate de usar los valores correctos. Si no estás seguro, puedes consultar nuestras [Preguntas frecuentes del desarrollador](https://support.avalabs.org/en/collections/2618154-developer-faq) o pedir ayuda en [Discord.](https://chat.avalabs.org/)

{% page-ref page="../../learn/platform-overview/staking.md" %}

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

* `nodeID` es la idenfiticación del nodo al que se va a hacer la delegación.
* `startTime` es la hora en Unix cuando el delegador empieza a delegar.
* `endTime` es la hora en Unix en que el delegador deja de delegar (y el AVAX participante es devuelto).
* `stakeAmount` es la cantidad de nAVAX con el que el delegador está participando.
* `rewardAddress` es la dirección a donde va la recompensa del validador, si la hay.
* `from` son las direcciones que quieres usar para esta operación. Si se omite, usa cualquiera de tus direcciones según sea necesario.
* `changeAddr` es la dirección a la que se enviará cualquier cambio. Si se omite, el cambio se envía a una de las direcciones controladas por el usuario.
* `username` es el usuario que paga la comisión de la transacción.
* `password` es la contraseña de `username`.
* `txID` es la identificación de la transacción

#### **Llamada de ejemplo**

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

Agrega un validador a la red primaria. Debe hacer staking de AVAX para hacer esto. Si el nodo es lo suficientemente correcto y receptivo durante la validación, recibirá una recompensa cuando finalice el período de participación. La probabilidad del validador de ser muestreado por otros validadores durante el consenso es proporcional a la cantidad de AVAX en stake.

El validador cobra una comisión a los delegadores; el validador recibe un porcentaje de la recompensa de la validación del delegador (si la hay). La comisión mínima de la delegación es 2%. Una transacción que agrega un validador no paga comisión.

El período de validación debe ser de entre 2 semanas y 1 año.

Hay un máximo peso total impuesto a los validadores. Esto significa que ningún validador podrá tener más AVAX en stake que este valor. Este valor inicialmente se establece en `min(5 * amount staked, 3M AVAX)`. El valor total de un validador es de 3 millones de AVAX.

Hay que tener en cuenta que, una vez que se emita la transacción para agregar un nodo como validador, no hay forma de cambiar los parámetros. **No se puede retirar la participación antes de tiempo, tampoco cambiar el monto de la participación, el ID del nodo o la dirección de la recompensa.** Por favor, asegúrate de usar los valores correctos. Si no estás seguro, puedes consultar nuestras [Preguntas frecuentes del desarrollador](https://support.avalabs.org/en/collections/2618154-developer-faq) o pedir ayuda en [Discord.](https://chat.avalabs.org/)

{% page-ref page="../../learn/platform-overview/staking.md" %}

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

* `nodeID` es la identificación del nodo del validador que se está agregando.
* `startTime` es la hora en Unix en que el validador comienza a validar la red primaria.
* `endTime` es la hora en Unix en que el validador deja de validar la red primaria (y el AVAX participante es devuelto).
* `stakeAmount` es la cantidad de nAVAX con la que está participando el validador.
* `rewardAddress` es la dirección a donde va la recompensa del validador, si la hay.
* `delegationFeeRate` es la comisión porcentual que cobra el validador cuando otros le delegan inversiones. Se permiten hasta 4 lugares decimales; se ignoran los lugares decimales adicionales. Debe estar entre 0 y 100, inclusive. Por ejemplo, si la `delegationFeeRate` es `1.2345` y alguien delega a este validador, cuando termine el período de delegación, el 1,2345% de la recompensa es para el validador y el resto al delegador.
* `from` son las direcciones que quieres usar para esta operación. Si se omite, usa cualquiera de tus direcciones según sea necesario.
* `changeAddr` es la dirección a la que se enviará cualquier cambio. Si se omite, el cambio se envía a una de las direcciones controladas por el usuario.
* `username` es el usuario que paga la comisión de la transacción.
* `password` es la contraseña de `username`.
* `txID` es la identificación de la transacción

#### **Llamada de ejemplo**

En este ejemplo, usamos el comando shell `date` para calcular los tiempos en Unix 10 minutos y 2 días en el futuro. (Nota: en Mac se reemplaza `$(date` con `$(gdate`. Si  `gdate`no está instalado, hay que hacer `brew install coreutils`).

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

Agrega un validador a una subred que no sea la red primaria. El validador debe validar la red primaria durante todo el tiempo que valide esta subred.

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

* `nodeID` es la identificación del nodo del validador.
* `subnetID` es la subred que validarán.
* `startTime` es la hora en Unix en que el validador empieza a validar la subred.
* `endTime` es la hora en Unix en que el validador deja de validar la subred.
* `weight` es el peso del validador utilizado para el muestreo.
* `from` son las direcciones que quieres usar para esta operación. Si se omite, usa cualquiera de tus direcciones según sea necesario.
* `changeAddr` es la dirección a la que se enviará cualquier cambio. Si se omite, el cambio se envía a una de las direcciones controladas por el usuario.
* `username` es el usuario que paga la comisión de la transacción.
* `password` es la contraseña de `username`.
* `txID` es la identificación de la transacción.

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

#### **Ejemplo de respuesta**

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

Crea una nueva dirección controlada por el usuario dado.

#### **Firma**

```cpp
platform.createAddress({
    username: string,
    password: string
}) -> {address: string}
```

#### **Llamada de ejemplo**

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

Crea una nueva cadena de bloques. Actualmente solo admite la creación de nuevas instancias de AVM y la MV Timestamp.

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

* `subnetID` es la identificación de la subred que valida la nueva blockchain. La subred debe existir y no puede ser la red principal.
* `vmID` es la identificación de la máquina virtual que la blockchain ejecuta. También puede ser un alias de la máquina virtual.
* `name` es un nombre de lectura humana para la nueva blockchain. No necesariamente único.
* `genesisData` es la representación en bytes del estado génesis de la nueva blockchain codificada en el formato especificado por el parámetro `encoding`.
* `encoding` indica el formato que se debe usar para `genesisData`. Pueden ser "cb58" o "hex". De forma predeterminada es "cb58". Las máquinas virtuales deben tener un método de API estático llamado `buildGenesis` que puede usarse para generar `genesisData`
* `from` son las direcciones que quieres usar para esta operación. Si se omite, usa cualquiera de tus direcciones según sea necesario.
* `changeAddr` es la dirección a la que se enviará cualquier cambio. Si se omite, el cambio se envía a una de las direcciones controladas por el usuario.
* `username` es el usuario que paga la comisión de la transacción. Este usuario debe tener una cantidad suficiente de claves de control de la subred.
* `password` es la contraseña de `username`.
* `txID` es la identificación de la transacción.

#### **Llamada de ejemplo**

En este ejemplo crearemos una nueva instancia de la Máquina Virtual Timestamp. `genesisData` surgió al llamar `timestamp.buildGenesis`.

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

Crea una nueva subred.

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

* Para agregarle un validador a esta subred se requieren las firmas `threshold` de las direcciones en `controlKeys`
* `from` son las direcciones que quieres usar para esta operación. Si se omite, usa cualquiera de tus direcciones según sea necesario.
* `changeAddr` es la dirección a la que se enviará cualquier cambio. Si se omite, el cambio se envía a una de las direcciones controladas por el usuario.
* `username` es el usuario que paga la comisión de la transacción.
* `password` es la contraseña de `username`.

#### **Llamada de ejemplo**

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

Envíe AVAX desde una dirección en P-Chain a una dirección en X-Chain. Después de emitir esta transacción, se debe llamar el método [`avm.importAVAX`](exchange-chain-x-chain-api.md#avm-importavax) de la X-Chain para culminar la transferencia.

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

* `amount` es la cantidad de nAVAX que se enviarán.
* `to` es la dirección de la X-Chain a donde se debe enviar el AVAX
* `from` son las direcciones que quieres usar para esta operación. Si se omite, usa cualquiera de tus direcciones según sea necesario.
* `changeAddr` es la dirección a la que se enviará cualquier cambio. Si se omite, el cambio se envía a una de las direcciones controladas por el usuario.
* `username` es el usuario que envía el AVAX y paga la comisión de la transacción.
* `password` es la contraseña de `username`.
* `txID` es la identificación de esta transacción.

#### **Llamada de ejemplo**

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

Obtén la clave privada que controla una dirección determinada.  
 La clave privada devuelta se le puede agregar a un usuario con [`platform.importKey`](platform-chain-p-chain-api.md#platform-importkey).

#### **Firma**

```cpp
platform.exportKey({
    username: string,
    password: string,
    address: string
}) -> {privateKey: string}
```

* `username` es el usuario que controla `address`.
* `password` es la contraseña de `username`.
* `privateKey` es la representación en cadena de la clave privada que controla`address`.

#### **Llamada de ejemplo**

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

Obtén el saldo de AVAX controlado por una dirección determinada.

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

* `address` es la dirección cuyo saldo se va a obtener.
* `balance` es el saldo total en nAVAX.
* `unlocked` es el saldo desbloqueado, en nAVAX.
* `lockedStakeable` es el saldo susceptible de participación bloqueado, en nAVAX.
* `lockedNotStakeable` es el saldo bloqueado y no susceptible de participación, en nAVAX.
* `utxoIDs` son las identificaciones de los UTXO que hacen remiten a `address`.

#### **Llamada de ejemplo**

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

Obtén todas las cadenas de bloques que existen (excluyendo la cadena P).

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

* `blockchains` son todas las blockchains que existen en la red Avalanche.
* `name` es el nombre de lectura humana de esta blockchain.
* `id` es la identificación de la cadena de bloques.
* `subnetID` es la identificación de la subred que valida esta blockchain.
* `vmID` es la identificación de la máquina virtual que la blockchain ejecuta.

#### **Llamada de ejemplo**

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

Obtén el estado de una cadena de bloques.

#### **Firma**

```cpp
platform.getBlockchainStatus(
    {
        blockchainID: string
    }
) -> {status: string}
```

`status` es uno de:

* `Validating`: la blockchain está siendo validada por este nodo.
* `Created`: la blockchain existe, pero no está siendo validada por este nodo.
* `Preferred`: se propuso crear la blockchain y es probable que se cree, pero la transacción aún ha sido aceptada.
* `Unknown`: no se propuso la blockchain o no se prefiere la propuesta de crearla. La propuesta puede volver a presentarse.

#### **Llamada de ejemplo**

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

Devuelve un límite superior en el número de AVAX que existen. Este es un límite superior porque no tiene en cuenta los tokens quemados, incluidas las tarifas de transacción.

#### **Firma**

```cpp
platform.getCurrentSupply() -> {supply: int}
```

* `supply` es un límite superior en el número de AVAX que existen, denominado en nAVAX.

#### **Llamada de ejemplo**

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

La respuesta en este ejemplo indica que el suministro de AVAX es como máximo de 365,865 millones.

### platform.getCurrentValidators

Enumera los validadores actuales de una subred dada.

El campo del nivel superior `delegators` quedó [obsoleto](deprecated-api-calls.md#getcurrentvalidators) a partir de la v1.0.1, y fue eliminado en la v1.0.6. En cambio, cada elemento de `validators` ahora contiene la lista de delegadores para ese validador.

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

* `subnetID` es la subred cuyos validadores actuales son devueltos. Si se omite, devuelve los validadores actuales de la red primaria.
* `nodeIDs`es una lista de las identificaciones de los nodos (nodeID) de los validadores actuales para solicitar. Si se omiten, se devuelven todos los validadores actuales. Si la identificación de un nodo indicado no está en el conjunto de validadores actuales, no se incluirá en la respuesta.
* `validators`:
   * `txID` es la transacción del validador.
   * `startTime` es la hora en Unix en que el validador empieza a validar la subred.
   * `endTime` es la hora en Unix en que el delegador deja de delegar (y el AVAX invertido es devuelto).
   * `stakeAmount` es la cantidad de nAVAX que este validador puso a participar. Se omite si `subnetID` no es la red primaria.
   * `nodeID` es la identificación del nodo del validador.
   * `weight` es el peso del validador cuando se toman muestras de los validadores. Se omite si `subnetID` es la red primaria.
   * `rewardOwner` es una salida de `OutputOwners` que incluye `locktime`, `threshold` y un conjunto de `addresses`.
   * `potentialReward` es la recompensa potencial que se va a ganar por la participación.
   * `delegationFeeRate` es la comisión porcentual que cobra el validador cuando otros le delegan participaciones.
   * `uptime` es el porcentaje de tiempo que el nodo consultado ha reportado que el par está en línea.
   * `connected` es si el nodo está conectado a la red
   * `delegators` es la lista de delegadores para este validador:
      * `txID` es la transacción del delegador.
      * `startTime` es la hora en Unix en que el delegador comenzó.
      * `endTime` es la hora en Unix en que se detiene el delegador.
      * `stakeAmount` es la cantidad de nAVAX que este delegador puso a participar. Se omite si `subnetID` no es la red primaria.
      * `nodeID` es la identificación del nodo del nodo que está validando.
      * `rewardOwner` es una salida de `OutputOwners` que incluye `locktime`, `threshold` y un conjunto de `addresses`.
      * `potentialReward` es la recompensa potencial que se va a ganar por la participación.
* `delegators`: (**obsoleto a partir de la v1.0.1. Ver la nota en la parte superior de la documentación del método.**)

#### **Llamada de ejemplo**

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

#### **Llamada de ejemplo**

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

Obtén la cantidad mínima de AVAX requerida para validar la Red Primaria y la cantidad mínima de AVAX que se puede delegar.

#### **Firma**

```cpp
platform.getMinStake() ->
{
    minValidatorStake : uint64,
    minDelegatorStake : uint64
}
```

#### **Llamada de ejemplo**

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

Enumera los validadores en el conjunto de validadores pendientes de la subred especificada. Cada validador aún no está validando la subred, pero lo hará en el futuro.

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

* `subnetID` es la subred cuyos validadores actuales son devueltos. Si se omite, devuelve los validadores actuales de la red primaria.
* `nodeIDs` es una lista de las identificaciones de los nodos de los validadores pendientes de solicitar. Si se omiten, todos los validadores pendientes son devueltos. Si la identificación de un nodo indicado no está en el conjunto de validadores pendientes, no se incluirá en la respuesta.
* `validators`:
   * `txID` es la transacción del validador.
   * `startTime` es la hora en Unix en que el validador empieza a validar la subred.
   * `endTime` es la hora en Unix en que el delegador deja de delegar (y el AVAX invertido es devuelto).
   * `stakeAmount` es la cantidad de nAVAX que este validador puso a participar. Se omite si `subnetID` no es la red primaria.
   * `nodeID` es la identificación del nodo del validador.
   * `connected` si el nodo está conectado.
   * `weight` es el peso del validador cuando se toman muestras de los validadores. Se omite si `subnetID` es la red primaria.
* `delegators`:
   * `txID` es la transacción del delegador.
   * `startTime` es la hora en Unix cuando comienza el delegador.
   * `endTime` es la hora en Unix en que se detiene el delegador.
   * `stakeAmount` es la cantidad de nAVAX que este delegador puso a participar. Se omite si `subnetID` no es la red primaria.
   * `nodeID` es la identificación del nodo del nodo que está validando.

#### **Llamada de ejemplo**

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

Devuelve los UTXO que se otorgaron después de que terminó el período de participación o de delegación de la transacción.

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

* `txID` es la identificación de la transacción de participación o delegación
* `numFetched` es el número de UTXO devueltos
* `utxos` es un conjunto de UTXO de recompensa codificados
* `encoding` especifica el formato de los UTXO devueltos. Pueden ser "cb58" o "hex" y de forma predeterminada es "cb58".

#### **Llamada de ejemplo**

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

Obtén un el ID (assetID) de un activo de staking de una subred. Actualmente, esto solo devuelve el assetID de participación de la red primaria.

#### **Firma**

```cpp
platform.getStakingAssetID({
    subnetID: string //optional
}) -> {
    assetID: string
}
```

* `subnetID` es la subred de la cual se solicita la identificación del activo (assetID).
* `assetID` es la identificación del activo (assetID) de un activo participante de una subred.

#### **Llamada de ejemplo**

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

Obtén información de la Subred.

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

* `ids` son las identificaciones de las subredes cuya información se va a obtener. Si se omite, obtiene información sobre todas las subredes.
* `id` es la identificación de la subred.
* Se necesitan las firmas `threshold` de las direcciones en `controlKeys` para agregar un validador a la subred.

[Aquí](../tutorials/nodes-and-staking/add-a-validator.md) se encuentra información sobre la forma de agregar un validador a una subred.

#### **Llamada de ejemplo**

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

Obtenga la cantidad de nAVAX en stake por un conjunto de direcciones. La cantidad devuelta no incluye la recompensas del staking.

#### **Firma**

```cpp
platform.getStake({addresses: []string}) -> {staked: int}
```

#### **Llamada de ejemplo**

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

### platform.getTimestamp

Se debe obtener la marca temporal de la P-Chain.

#### **Firma**

```cpp
platform.getTimestamp() -> {time: string}
```

#### **Llamada de ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTimestamp",
    "params": {},
    "id": 1
}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Respuesta de ejemplo**

```json
{
    "jsonrpc": "2.0",
    "result": {
        "timestamp": "2021-09-07T00:00:00-04:00"
    },
    "id": 1
}
```

### platform.getTotalStake

Obtén la cantidad total de nAVAX en stake en la red primaria.

#### **Firma**

```cpp
platform.getTotalStake() -> {stake: int}
```

#### **Llamada de ejemplo**

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

Obtén una transacción por su ID.

Parámetro `encoding` opcional para especificar el formato de la transacción devuelta. Pueden ser "cb58" o "hex". De forma predeterminada es "cb58".

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

#### **Llamada de ejemplo**

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

Obtén el estado de una transacción por su ID. Si se canceló la transacción, la respuesta incluye un campo de `reason` con más información sobre la causa de la cancelación de la transacción.

[Aquí](deprecated-api-calls.md#gettxstatus) se encuentran las notas sobre el comportamiento anterior.

#### **Firma**

```cpp
platform.getTxStatus({
    txID: string
}) -> {status: string}
```

`status` es uno de:

* `Committed`: la transacción está (o va a ser aceptada) por cada nodo
* `Processing`: El nodo está votando por esta transacción
* `Dropped`: la transacción nunca será aceptada por ningún nodo de la red; revisa el campo `reason` para más información
* `Unknown`: El nodo no ha visto esta transacción

#### **Llamada de ejemplo**

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

Obtiene los UTXO que hacen referencia a un conjunto de direcciones determinado.

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

* `utxos` es una lista de UTXO en la que cada UTXO remite al menos a una dirección de `addresses`.
* Como máximo `limit` UTXO son devueltos. Si `limit`es omitido o mayor que 1024, se establece en 1024.
* Este método admite la paginación. `endIndex` denota el último UTXO devuelto. Para obtener el siguiente grupo de UTXO, utiliza el valor de `endIndex` como `startIndex` en la siguiente llamada.
* Si `startIndex` se omite, consulta todos los UTXO hasta `limit`.
* Cuando se utiliza  la paginación (es decir, cuando se suministra el `startIndex`), no se garantiza que los UTXO sean únicos en varias llamadas. Es decir, puede aparecer un UTXO en el resultado de la primera llamada y luego nuevamente en la segunda llamada.
* Cuando se utiliza la paginación, no se garantiza la consistencia en varias llamadas. Es decir, el conjunto UTXO de direcciones puede haber cambiado entre llamadas.
* `encoding` especifica el formato de los UTXO devueltos. Pueden ser "cb58" o "hex" y de forma predeterminada es "cb58".

#### **Ejemplo**

Supongamos que queremos todos los UTXO que hacen referencia al menos a uno de `P-avax1s994jad0rtwvlfpkpyg2yau9nxt60qqfv023qx` y `P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr`.

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

Esto nos da la respuesta:

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

Como `numFetched` es igual que `limit`, podemos decir que puede haber más UTXO que no fueron consultados. Llamamos el método otra vez, esta vez con `startIndex`:

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

Esto nos da la respuesta:

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

Como `numFetched` es menor que `limit`, sabemos que terminamos de consultar los UTXO y no tenemos que llamar este método otra vez.

Supongamos que queremos obtener los UTXO exportados de la Cadena X a la Cadena P para construir un ImportTx. Luego, necesitamos llamar a GetUTXOs con el argumento sourceChain para recuperar los UTXO atómicos:

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

Esto nos da la respuesta:

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

### platform.getValidatorsAt

Se deben obtener los validadores y sus pesos de una subred o la red primaria en una altura de la P-Chain dada.

#### **Firma**

```cpp
platform.getValidatorsAt(
    {
        height: int,
        subnetID: string, // optional
    }
)
```

* `height` es la altura de la P-Chain a la cual debe establecerse el conjunto de validadores.
* `subnetID` es el ID de la subred para obtener el conjunto de validadores. Si no se da,  obtiene el conjunto de validadores de la red primaria.

#### **Llamada de ejemplo**

```bash
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getValidatorsAt",
    "params": {
        "height":1
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Respuesta de ejemplo**

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "validators": {
            "NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg": 2000000000000000,
            "NodeID-GWPcbFJZFfZreETSoWjPimr846mXEKCtu": 2000000000000000,
            "NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ": 2000000000000000,
            "NodeID-NFBbbJ4qCmNaCzeW7sxErhvWqvEQMnYcN": 2000000000000000,
            "NodeID-P7oB2McjBGgW2NXXWVYjV8JEDFoW9xDE5": 2000000000000000
        }
    },
    "id": 1
}
```

### platform.importAVAX

Completa una transferencia de AVAX de X-Chain a P-Chain.

Antes de llamar este método, se debe llamar el método [`avm.exportAVAX`](exchange-chain-x-chain-api.md#avm-exportavax) de la X-Chain para iniciar la transferencia.

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

* `to` es la identificación de la dirección a donde se importa el AVAX. Esta debe ser la misma que el argumento `to` en la correspondiente llamada al `exportAVAX` de la X-Chain.
* `sourceChain` es la identificación o alias de la cadena desde donde se importa el AVAX. Para importar fondos desde la X-Chain, utiliza `"X"`.
* `from` son las direcciones que quieres usar para esta operación. Si se omite, usa cualquiera de tus direcciones según sea necesario.
* `changeAddr` es la dirección a la que se enviará cualquier cambio. Si se omite, el cambio se envía a una de las direcciones controladas por el usuario.
* `username` es el usuario que controla la dirección especificada en `to`.
* `password` es la contraseña de `username`.

#### **Llamada de ejemplo**

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

Otorga a un usuario control sobre una dirección proporcionando la clave privada que controla la dirección.

#### **Firma**

```cpp
platform.importKey({
    username: string,
    password: string,
    privateKey:string
}) -> {address: string}
```

* Se agrega `privateKey` al grupo de claves privadas de `username`. `address` es la dirección que `username` ahora controla con la clave privada.

#### **Llamada de ejemplo**

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

Emite una transacción a la Cadena de Plataforma.

#### **Firma**

```cpp
platform.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {txID: string}
```

* `tx` es la representación en bytes de una transacción.
* `encoding`especifica el formato de codificación para los bytes de la transacción. Pueden ser "cb58" o "hex". De forma predeterminada es "cb58".
* `txID` es la identificación de la transacción.

#### **Llamada de ejemplo**

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

Lista de direcciones controladas por un usuario dado.

#### **Firma**

```cpp
platform.listAddresses({
    username: string,
    password: string
}) -> {addresses: []string}
```

#### **Llamada de ejemplo**

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

Muestrea validadores de una Subred específica

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

* `size` es el número de validadores que se van a muestrear.
* `subnetID` es la subred que se va a muestrear. Si se omite, el valor predeterminado es la red principal.
* Cada elemento de `validators` es la identificación de un validador.

#### **Llamada de ejemplo**

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

Obtén la Subred que valida cierta cadena de bloques dada.

#### **Firma**

```cpp
platform.validatedBy(
    {
        blockchainID: string
    }
) -> {subnetID: string}
```

* `blockchainID` es la identificación de la cadena de bloques.
* `subnetID` es la identificación de la subred que valida la blockchain.

#### **Llamada de ejemplo**

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

Obtén la identificación de las blockchains que valida una Subred.

#### **Firma**

```cpp
platform.validates(
    {
        subnetID: string
    }
) -> {blockchainIDs: []string}
```

* `subnetID` es la identificación de la subred.
* Cada elemento de `blockchainIDs` es la identificación de una blockchain que la subred valida.

#### **Llamada de ejemplo**

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

