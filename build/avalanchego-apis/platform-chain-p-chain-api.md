# API de la Cadena de Plataforma \(P-Chain\) 

La API permite a los clientes interactuar con la cadena P o [P-Chain](../../learn/platform-overview/#platform-chain-p-chain), que mantiene al conjunto de [validadores](../../learn/platform-overview/staking.md#validators) de Avalanche y maneja la creación de cadenas de bloques.

## Endpoint / Extremo

```cpp
/ext/P
```

## Format

Esta API usa formato RPC `json 2.0`.

## Metodos

### platform.addDelegator

Agrega un delegador a la Red Primaria.

Un delegador hace stake de AVAX y especifica un validador (delegado) para validar la red en su nombre. El delegado tiene una mayor probabilidad de ser muestreado por otros validadores \(peso\) en proporción a la participación que se le delega.

El delegado cobra una tarifa al delegador; el primero recibe un porcentaje de la recompensa de validación del delegador \ (si corresponde.\) Una transacción que delega participación no tiene comisión.

El período de delegación debe ser un subconjunto del período en el que el delegado valida la red primaria.

Notar que una vez que emitiste la transacción de agregar un nodo como delegador, no hay manera de cambiar los parámetros. **No puedes retirar tu stake antes de tiempo, o cambiar el monto, ID del nodo o dirección de recompensas.** Por favor, asegúrate de usar los valores correctos. Si no estás seguro, puedes revisar nuestas [Preguntas Frecuentes de Desarrolladores](https://support.avalabs.org/en/collections/2618154-developer-faq) o pedir ayuda en [Discord.](https://chat.avalabs.org/)

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

* `nodeID` es el ID del nodo al cual delegar.
* `startTime` es el tiempo Unix cuando el delegador comienza a delegar.
* `endTime`es el tiempo Unix cuando el delegador termina de delegar \(y el AVAX en stake es devuelto\).
* `stakeAmount` es la cantidad de nAVAX con el que e delegador está participando.
* `rewardAddress` es la dirección a la que va la recompensa del validador, si hay una.
* `from` son las direcciones que desea utilizar para esta operación. Si se omite, usa cualquiera de tus direcciones según sea necesario.
* `changeAddr` es la dirección a la que se enviará cualquier cambio. Si se omite, el cambio se envía a una de las direcciones controladas por el usuario.
* `username` es el usuario que paga la tarifa de transacción.
* `password` es la contraseña de`username`.
* `txID` es el ID de la transacción

#### **Llamada de Ejemplo**

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

#### **Respuesta ejemplo**

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

El validador cobra una tarifa a los delegadores; el primero recibe un porcentaje de la recompensa de validación del delegador \(si corresponde\). La tarifa mínima de delegación es del 2%. Una transacción que agrega un validador no paga comisión.

El período de validación debe ser de entre 2 semanas y 1 año.

Hay un máximo peso total impuesto a los validadores. Esto significa que ningún validador podrá tener más AVAX en stake que este valor. Este valor se establecerá inicialmente en el `min(5*cantidad en stake, 3M AVAX)`. El valor total de un validador es de 3 millones de AVAX.

Toma en cuenta que una vez que se emite la transacción para agregar un nodo como validador, no hay forma de cambiar los parámetros. ** No puede retirar el stake antes de tiempo ni cambiar la cantidad de la participación, el ID de nodo o la dirección de la recompensa. ** Asegúrate de que estás utilizando los valores correctos. Si no estás seguro, consulta nuestra sección de [Preguntas Frecuentes para Desarrolladores](https://support.avalabs.org/en/collections/2618154-developer-faq) o solicita ayuda en [Discord.](https://chat.avalabs.org/)

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

* `nodeID` es el ID del nodo del validador que se agrega.
* `startTime` es el tiempo Unix cuando el validador comienza a validar la red primaria.
* `endTime` es el tiempo Unix en el que el validador deja de validar la red primaria \(y se devuelve el AVAX en stake\).
* `stakeAmount` es la cantidad de nAVAX que el validador está dejando en stake.
* `rewardAddress` es la dirección a la que irá la recompensa del validador, si hay una.
* `delegationFeeRate` es la tarifa porcentual que cobra este validador cuando otros delegan stake en ellos. Se permiten hasta 4 lugares decimales; se ignoran los lugares decimales adicionales. Debe estar entre 0 y 100, inclusive. Por ejemplo, si `delegationFeeRate` es` 1.2345` y alguien delega en este validador, cuando el período de delegación finaliza, el 1.2345% de la recompensa va al validador y el resto al delegador. 
*  `from` son las direcciones que deseas utilizar para esta operación. Si se omite, usa cualquiera de tus direcciones según sea necesario.
* `changeAddr` es la dirección a la que se enviará cualquier cambio. Si se omite, el cambio se envía a una de las direcciones controladas por el usuario.
* `username` es el usuario que paga la tarifa de transacción.
* `password` es la contraseña de `username`.
* `txID` es el ID de la transacción

#### **Llamada de Ejemplo**

En este ejemplo, usamos el comando de shell `date` para calcular los tiempos Unix 10 minutos y 2 días en el futuro. \(Nota: si estás en una Mac, reemplaza `$(date` por` $(gdate`. Si no tienes `gdate` instalado, haz`brew install coreutils`.\)

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

#### **Respuesta ejemplo**

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

* `nodeID` es el ID del nodo validador.
* `subnetID`es la subred que validarán.
* `startTime` es el tiempo Unix en la que el validador comienza a validar la subred.
* `endTime` es el tiempo Unix en el que el validador deja de validar la subred.
* `weight` es el peso del validador utilizado para el muestreo.
* `from` son las direcciones que desea utilizar para esta operación. Si se omite, use cualquiera de sus direcciones según sea necesario.
* `changeAddr` es la dirección a la que se enviará cualquier cambio. Si se omite, el cambio se envía a una de las direcciones controladas por el usuario.
* `username` es el usuario que paga la tarifa de transacción.
* `password` es la contraseña de`username`.
* `txID` es el ID de transacción.

#### **Llamada de Ejemplo**

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

Crea una nueva dirección controlada por el usuario dado.

#### **Firma**

```cpp
platform.createAddress({
    username: string,
    password: string
}) -> {address: string}
```

#### **Llamada de Ejemplo**

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

#### **Respuesta ejemplo**

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
* `subnetID` es el ID de la subred que valida la nueva cadena de bloques. La subred debe existir y no puede ser la red principal.
* `vmID` es el ID de la máquina virtual que ejecuta blockchain. También puede ser un alias de la máquina virtual.
* `name` es un nombre humanamente-legible para la nueva cadena de bloques. No necesariamente único.
* `genesisData` es la representación en bytes del estado de génesis de la nueva cadena de bloques codificada en el formato especificado por el parámetro `encoding`.
* `encoding` especifica el formato que se utilizará para `genesisData`. Puede ser "cb58" o "hex". El valor predeterminado es "cb58". Las máquinas virtuales deben tener un método de API estático llamado `buildGenesis` que pueda usarse para generar `genesisData`
* `from` son las direcciones que desea utilizar para esta operación. Si se omite, usa cualquiera de tus direcciones según sea necesario.
* `changeAddr` es la dirección a la que se enviará cualquier cambio. Si se omite, el cambio se envía a una de las direcciones controladas por el usuario.
* `username` es el usuario que paga la tarifa de transacción. Este usuario debe tener una cantidad suficiente de claves de control de la subred.
* `password` es la contraseña de`username`.
* `txID` es el ID de transacción.

#### **Llamada de Ejemplo**

En este ejemplo, estamos creando una nueva instancia de la máquina virtual de Timestamo. `genesisData` proviene de llamar a `timestamp.buildGenesis`.

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

#### **Respuesta ejemplo**

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
* Para agregar un validador a esta subred, se requieren una cantidad (`threshold`) de firmas de las direcciones en `controlKeys`
* `from` son las direcciones que desea utilizar para esta operación. Si se omite, usa cualquiera de tus direcciones según sea necesario.
* `changeAddr` es la dirección a la que se enviará cualquier cambio. Si se omite, el cambio se envía a una de las direcciones controladas por el usuario.
* `username` es el usuario que paga la tarifa de transacción.
* `password` es la contraseña de `username`.

#### **Llamada de Ejemplo**

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

#### **Respuesta ejemplo**

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

Envíe AVAX desde una dirección en P-Chain a una dirección en X-Chain. Después de emitir esta transacción, debe llamar al método [`avm.importAVAX`] (exchange-chain-x-chain-api.md#avm-importavax) de X-Chain para completar la transferencia.

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
* `amount` es la cantidad de nAVAX a enviar.
* `to` es la dirección en X-Chain a la que enviar el AVAX
* `from` son las direcciones que desea utilizar para esta operación. Si se omite, usa cualquiera de tus direcciones según sea necesario.
* `changeAddr` es la dirección a la que se enviará cualquier cambio. Si se omite, el cambio se envía a una de las direcciones controladas por el usuario.
* `username` es el usuario que envía el AVAX y paga la tarifa de transacción.
* `password` es la contraseña de `username`.
* `txID` es el ID de esta transacción.

#### **Llamada de Ejemplo**

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

#### **Respuesta ejemplo**

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

Obtén la llave privada que controla una dirección determinada. La llave privada devuelta se puede agregar a un usuario con[`platform.importKey`](platform-chain-p-chain-api.md#platform-importkey).

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
* `privateKey` es la representación en cadena de la clave privada que controla `address`.

#### **Llamada de Ejemplo**

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

#### **Respuesta ejemplo**

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

* `address` es la dirección de la cual se quiere obtener el saldo.
* `balance` es el saldo total, en nAVAX.
* `unlocked` es el saldo desbloqueado, en nAVAX.
* `lockedStakeable` es el saldo disponible para stake y bloqueado, en nAVAX.
* `lockedNotStakeable` es el saldo bloqueado y no disponible para stake, en nAVAX.
* `utxoIDs` son los ID de los UTXO que hacen referencia a la `address`.

#### **Llamada de Ejemplo**

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

#### **Respuesta ejemplo**

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

Obtén todas las cadenas de bloques que existen \(excluyendo la cadena P\).

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
* `name` es el nombre humanamente-legible de esta cadena de bloques.
* `id` es el ID de blockchain.
* `subnetID` es el ID de la subred que valida esta cadena de bloques.
* `vmID` es el ID de la máquina virtual que ejecuta la cadena de bloques.

#### **Llamada de Ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getBlockchains",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Respuesta ejemplo**

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

`status` es una de las siguientes:

* `Validating`: La cadena de bloques está siendo validada por este nodo.
* `Created`: La cadena de bloques existe, pero no está siendo validada por este nodo.
* `Preferred`: Se propuso crear la cadena de bloques y es probable que se cree, pero la transacción aún no se acepta.
* `Unknown`: La cadena de bloques no se propuso o no se prefiere la propuesta para crearla. La propuesta puede volver a presentarse.
 
#### **Llamada de Ejemplo**

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

#### **Respuesta ejemplo**

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

#### **Llamada de Ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getCurrentSupply",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Respuesta ejemplo**

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

El campo de nivel superior  `delegators` fue [descontinuado](deprecated-api-calls.md#getcurrentvalidators) a partir de v1.0.1, y eliminado en v1.0.6. En cambio, cada elemento de `validators` ahora contiene la lista de delegadores para ese validador.

#### **Firma**

```cpp
platform.getCurrentValidators({
    subnetID: string //optional
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

* `subnetID` es la subred de la cual se devuelven los validadores actuales. Si se omite, devuelve los validadores actuales de la red primaria.
* `validadores`:
  * `txID` es la transacción de validador.
  * `startTime` es la hora Unix en la que el validador comienza a validar la subred.
  * `endTime` es la hora Unix en la que el validador deja de validar la subred.
  * `stakeAmount` es la cantidad de nAVAX que este validador dejó en stake. Omitido si "subnetID" no es la red primaria.
  * `nodeID` es el ID de nodo del validador.
  * `weight` es el peso del validador cuando se toman muestras de los validadores. Omitido si `subnetID` es la red principal.
  * `rewardOwner` es una salida de `OutputOwners` que incluye `locktime`,` threshold` y un arreglo de direcciones (`addresses`).
  * `potencialReward` es la recompensa potencial obtenida al hacer stake.
  * `delegationFeeRate` es la tarifa porcentual que cobra este validador cuando otros delegan su stake en ellos.
  * `uptime` es el % de tiempo que el nodo consultado ha informado que el par está en línea.
  * `connected` es si el nodo está conectado a la red
  * `delegators` es la lista de delegadores a este validador:
    * `txID` es la transacción del delegador.
    * `startTime` es la hora Unix en la que se inició el delegador.
    * `endTime` es el tiempo de Unix en el que se detiene el delegador.
    * `StakeAmount` es la cantidad de nAVAX que este delegador puso en stake. Omitido si `subnetID`  no es la red primaria.
    * `nodeID` es el ID del nodo de validación.
    * `rewardOwner` es una salida de` OutputOwners` que incluye `locktime`, `threshold` y un arreglo de direcciones (`addresses`) .
    * `potencialReward` es la recompensa potencial obtenida al hacer staking
* `delegators`: \(** obsoleto a partir de v1.0.1. Consulta la nota en la parte superior de la documentación del método. **\)

#### **Llamada de Ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getCurrentValidators",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Respuesta ejemplo**

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

#### **Llamada de Ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getHeight",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Respuesta ejemplo**

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

#### **Llamada de Ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getMinStake"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Respuesta ejemplo**

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
    subnetID: string //optional
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

* `subnetID` es la subred de la cual se devuelven los validadores actuales. Si se omite, devuelve los validadores actuales de la red primaria.
* `validators`:
   * `txID` es la transacción del validador.
   * `startTime` es la hora Unix en la que el validador comienza a validar la subred.
   * `endTime` es la hora Unix en la que el validador deja de validar la subred.
   * `stakeAmount` es la cantidad de nAVAX que este validador dejó en stake. Omitido si `subnetID` no es la red primaria.
   * `nodeID` es el ID de nodo del validador.
   * `connected` si el nodo está conectado.
   * `weight` es el peso del validador cuando se toman muestras de los validadores. Omitido si `subnetID` es la red principal.
* `delegators`:
   * `txID` es la transacción del delegador.
   * `startTime` es la hora Unix en la que se inicia la delegación.
   * `endTime` es el tiempo de Unix en el que se detiene el delegador.
   * `stakeAmount` es la cantidad de nAVAX que este delegador apostó. Omitido si `subnetID` no es la red primaria.
   * `nodeID` es el ID del nodo de validación.

#### **Llamada de Ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Respuesta ejemplo**

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

* `subnetID` es la subred en la cual se solicita el assetID.
* `assetID` es el ID del activo de staking de una subred.

#### **Llamada de Ejemplo**

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

#### **Respuesta ejemplo**

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

* `ids` son los ID de las subredes para obtener información. Si se omite, obtiene información sobre todas las subredes.
* `id` es el ID de la subred.
* Se necesita el número  `threshold` de firmas de las direcciones en `controlKeys` para agregar un validador a la subred.


Mira [aquí](../tutorials/nodes-and-staking/add-a-validator.md) para obtener información de cómo agregar un validador a una Subred

#### **Llamada de Ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getSubnets",
    "params": {"ids":["hW8Ma7dLMA7o4xmJf3AXBbo17bXzE7xnThUd3ypM4VAWo1sNJ"]},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Respuesta ejemplo**

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

#### **Llamada de Ejemplo**

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

#### **Respuesta ejemplo**

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

Obtén la cantidad total de nAVAX en stake en la red primaria.

#### **Firma**

```cpp
platform.getTotalStake() -> {stake: int}
```

#### **Llamada de Ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTotalStake",
    "params": {},
    "id": 1
}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Respuesta ejemplo**

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

Opcional, el parámetro `encoding` para specify the format for the returned transaction. Can be either “cb58” or “hex”. Defaults to “cb58”.

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

#### **Llamada de Ejemplo**

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

#### **Respuesta ejemplo**

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

Gets a transaction’s status by its ID. If the transaction was dropped, response will include a `reason` field with more information why the transaction was dropped.

See [here](deprecated-api-calls.md#gettxstatus) for notes on previous behavior.

#### **Firma**

```cpp
platform.getTxStatus({
    txID: string
}) -> {status: string}
```

#### **Llamada de Ejemplo**

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

#### **Respuesta ejemplo**

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

Gets the UTXOs that reference a given set of addresses.

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

* `utxos` is a list of UTXOs such that each UTXO references at least one address in `addresses`.
* At most `limit` UTXOs are returned. If `limit` is omitted or greater than 1024, it is set to 1024.
* This method supports pagination. `endIndex` denotes the last UTXO returned. To get the next set of UTXOs, use the value of `endIndex` as `startIndex` in the next call.
* If `startIndex` is omitted, will fetch all UTXOs up to `limit`.
* When using pagination \(ie when `startIndex` is provided\), UTXOs are not guaranteed to be unique across multiple calls. That is, a UTXO may appear in the result of the first call, and then again in the second call.
* When using pagination, consistency is not guaranteed across multiple calls. That is, the UTXO set of the addresses may have changed between calls.
* `encoding` specifies the format for the returned UTXOs. Can be either “cb58” or “hex” and defaults to “cb58”.

#### **Ejemplo**

Suppose we want all UTXOs that reference at least one of `P-avax1s994jad0rtwvlfpkpyg2yau9nxt60qqfv023qx` and `P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr`.

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

This gives response:

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

Since `numFetched` is the same as `limit`, we can tell that there may be more UTXOs that were not fetched. We call the method again, this time with `startIndex`:

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

This gives response:

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

Since `numFetched` is less than `limit`, we know that we are done fetching UTXOs and don’t need to call this method again.

Suppose we want to fetch the UTXOs exported from the X Chain to the P Chain in order to build an ImportTx. Then we need to call GetUTXOs with the sourceChain argument in order to retrieve the atomic UTXOs:

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

This gives response:

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

Complete a transfer of AVAX from the X-Chain to the P-Chain.

Before this method is called, you must call the X-Chain’s [`avm.exportAVAX`](exchange-chain-x-chain-api.md#avm-exportavax) method to initiate the transfer.

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

* `to` is the ID of the address the AVAX is imported to. This must be the same as the `to` argument in the corresponding call to the X-Chain’s `exportAVAX`.
* `sourceChain` is the ID or alias of the chain the AVAX is being imported from. To import funds from the X-Chain, use `"X"`.
* `from` are the addresses that you want to use for this operation. If omitted, uses any of your addresses as needed.
* `changeAddr` is the address any change will be sent to. If omitted, change is sent to one of the addresses controlled by the user.
* `username` is the user that controls the address specified in `to`.
* `password` is `username`‘s password.

#### **Llamada de Ejemplo**

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

#### **Respuesta ejemplo**

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

Otorga a un usuario control sobre una dirección proporcionando la llave privada que controla la dirección.

#### **Firma**

```cpp
platform.importKey({
    username: string,
    password: string,
    privateKey:string
}) -> {address: string}
```

* Add `privateKey` to `username`‘s set of private keys. `address` is the address `username` now controls with the private key.
* Agrega una llave privada (`privateKey`) al conjunto de llaves privadas de `username`. `address` es la dirección que ahora controla el usuario (`username`) con la llave privada.

#### **Llamada de Ejemplo**

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

#### **Respuesta ejemplo**

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
* `encoding` especifica el formato de codificación de los bytes de la transacción. Puede ser "cb58" o "hex". El valor predeterminado es "cb58".
* `txID` es el ID de la transacción.

#### **Llamada de Ejemplo**

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

#### **Respuesta ejemplo**

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

#### **Llamada de Ejemplo**

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

#### **Respuesta ejemplo**

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

* `size` es el número de validadores a muestrear.
* `subnetID` es la subred de la que se tomará la muestra. Si se omite, el valor predeterminado es la red principal.
* Cada elemento de `validators` es el ID de un validador.

#### **Llamada de Ejemplo**

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

#### **Respuesta ejemplo**

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

* `blockchainID` es el ID de la cadena de bloques.
* `subnetID` es el ID de la Subred que valida la cadena de bloques.

#### **Llamada de Ejemplo**

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

#### **Respuesta ejemplo**

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

Obtén los IDs de las blockchains que valida una Subred.

#### **Firma**

```cpp
platform.validates(
    {
        subnetID: string
    }
) -> {blockchainIDs: []string}
```

* `subnetID` es el ID de la Subred.
* Cada elemento de `blockchainIDs` son el ID de las blockchains validadas por una Subred.

#### **Llamada de Ejemplo**

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

#### **Respuesta ejemplo**

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

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE0MTc3MTE2OTAsMTQ1NjIyMjE2MiwtMT
IyODYwNjE5MSwxNTMxMjY0Nzg4LC0xMTM3NTc5NTQyLDU1NzI0
MDA4MCwtNzU5NjkwODUyLC0xNzE3MTQ2MjQ3LC0yMTI3MjY3NT
AyLDEyMjkzNzM0MjksLTgyNjI0NTM3MCwtMTcyNDE3MzUxNSwx
NzI5MTY4MjA4LC0xMzExODczNzQ4LDc2NDk1MzczMCwxNjI3Mj
gyNjksLTgxMjUyNzU5NSwxNDkzMTk0Nzk5LDk3NDI5MDE1OV19

-->