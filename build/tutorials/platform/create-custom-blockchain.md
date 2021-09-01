# Crea una blockchain personalizada

## Introducción

Avalanche admite la creación de blockchains con máquinas virtuales en subredes. En este tutorial, crearemos una blockchain personalizada usando una máquina virtual personalizada \(Timestamp VM\).

Si quieres una blockchain que tenga capacidades de X-Chain \(AVM\), mira [Crear](../nodes-and-staking/run-avalanche-node.md) Blockchain de AVM.

### Requisitos Previos

Necesitarás un nodo de ejecución, un usuario en el nodo y algo de AVAX en la dirección controlada por el usuario. Todo eso está cubierto en el tutorial de [Avalanche](../nodes-and-staking/run-avalanche-node.md)

A continuación, necesitas tener tu nodo sea un validador en la [red primaria](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network). Puedes averiguar cómo hacer eso en el tutorial de [Agregar un](../nodes-and-staking/add-a-validator.md) validador. Se recomienda que hagas eso [con las llamadas](../nodes-and-staking/add-a-validator.md#add-a-validator-with-api-calls) de API, ya que así es la forma en que interactuarás con tu nodo en el resto de este tutorial.

## Crea la máquina virtual

Cada blockchain es una instancia de una máquina virtual. Por ejemplo, X-Chain es una instancia de AVM y C-Chain es la instancia de EVM. Avalanche admite la creación de nuevas blockchains \(instancias\) de las máquinas virtuales. En este caso usaremos VM de [Timestamp](https://github.com/ava-labs/timestampvm) que es un plugin de VM externo. Timestamp VM se comunicará con nuestro nodo de AvalancheGo a través de RPC.

{% page-ref page="create-a-virtual-machine-vm.md" %}

## Crea la Subnet

Cada blockchain es validada por una [subred](../../../learn/platform-overview/#subnets). Antes de que puedas crear una blockchain, necesitarás una subred para validate También puedes usar una subred que ya existe si tienes un número suficiente de sus claves de control.

{% page-ref page="create-a-subnet.md" %}

### Agrega Validadores a la Subnet

La subnet necesita validadores en ella para, bueno, validar las blockchains.

{% page-ref page="../nodes-and-staking/add-a-validator.md" %}

### Crea los datos de Génesis<a id="create-the-genesis-data"></a>

Cada blockchain tiene algún estado génesis cuando se crea. Cada VM define el formato y la semántica de sus datos de génesis . [TimestampVM](create-a-virtual-machine-vm.md#api) utiliza datos codificados con CB58 como datos de génesis `encode`y los métodos de API `decode`estáticos que pueden ser utilizados para codificar / decodificar datos de string. Ver API de TimestampVM

Generamos una génesis sencilla para TimestampVM:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "timestampvm.encode",
    "params":{
        "data":"helloworld"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/vm/tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH
```

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "bytes": "fP1vxkpyLWnH9dD6BQA",
    "encoding": "cb58"
  },
  "id": 1
}
```

`fP1vxkpyLWnH9dD6BQA`Nuestros datos de génesis serán

## Crea la Blockchain

Ahora vamos a crear la nueva blockchain. Para hacerlo, [`platform.createBlockchain`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createblockchain)llamamos. Tu llamada debería parecer la de abajo. Tienes que cambiar a la subred que validada tu blockchain, y `subnetID`suministrar un `username`que controla un número suficiente de las claves de control de la subred. Como un recordatorio, puedes averiguar qué umbral y las claves de control de una subred son llamando [`platform.getSubnets`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getsubnets).

Recuerda que usamos `tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH`como nuestro ID de VM en [Crea una máquina virtual \(VM\).](create-a-virtual-machine-vm.md#vm-aliases)

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createBlockchain",
    "params" : {
        "subnetID": "KL1e8io1Zi2kr8cTXxvi321pAzfQuUa8tmBfadqpf9K2dc2TT",
        "vmID":"tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH",
        "name":"My new TSVM",
        "genesisData": "fP1vxkpyLWnH9dD6BQA",
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

La respuesta contiene el ID de la transacción:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

### Verifica el éxito<a id="verify-success"></a>

Después de unos segundos, la transacción para crear nuestra blockchain debería haber sido aceptada y la blockchain debería existir \(asumiendo que la solicitud estaba bien formada, etc.\)

Para comprobar, llama [`platform.getBlockchains`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getblockchains). Esto genera una lista de todas las blockchains existentes.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getBlockchains",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

La respuesta confirma que la blockchain fue creada:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "blockchains": [
            {
                "id": "AXerNQX7voY2AABaRdTAyXcawBURBR6thPRJp43LtPpZZi6Qz",
                "name": "X-Chain",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "jvYyfQTxGMJLuGWa55kdP2p2zSUYsQ5Raupu4TW34ZAUBAbtq"
            },
            {
                "id": "tZGm6RCkeGpVETUTp11DW3UYFZmm69zfqxchpHrSF7wgy8rmw",
                "name": "C-Chain",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "mgj786NP7uDwBCcq6YwThhaN8FLyybkCa4zBWTQbNgmK6k9A6"
            },
            {
                "id": "sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk",
                "name": "My new TSVM",
                "subnetID": "KL1e8io1Zi2kr8cTXxvi321pAzfQuUa8tmBfadqpf9K2dc2TT",
                "vmID": "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH"
            },
            {
                "id": "xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH",
                "name": "My new AVM",
                "subnetID": "KL1e8io1Zi2kr8cTXxvi321pAzfQuUa8tmBfadqpf9K2dc2TT",
                "vmID": "jvYyfQTxGMJLuGWa55kdP2p2zSUYsQ5Raupu4TW34ZAUBAbtq"
            }
        ]
    },
    "id": 1
}
```

### Validada<a id="validating-blockchain"></a>

Cada blockchain necesita un conjunto de validadores para validar y procesar transacciones en ella. Puedes comprobar si un nodo está validating una blockchain dada al llamar [`platform.getBlockchainStatus`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getblockchainstatus)a ese nodo:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getBlockchainStatus",
    "params" :{
        "blockchainID":"sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "status": "Validating"
  },
  "id": 1
}
```

Si `"Validating"`responde, el nodo está validada la cadena dada. Si responde `"Syncing"`, la cadena rastreada por este nodo pero no está validada. Si responde, `"Created"`entonces la cadena existe pero no se está sincronizando. `--whitelisted-subnets=KL1e8io1Zi2kr8cTXxvi321pAzfQuUa8tmBfadqpf9K2dc2TT`Tenga en cuenta que para validar o ver una subred, necesitas iniciar tu nodo con argumento \(por `--whitelisted-subnets=[subnet ID goes here]`ejemplo\) y agregar el nodo al conjunto de validador de la subred.

Se puede encontrar más información en el tutorial de [validador](../nodes-and-staking/add-a-validator.md#adding-a-subnet-validator) de Subred.

## Interactuando con la nueva blockchain<a id="interact-with-the-new-blockchain"></a>

Puedes interactuar con esta nueva instancia del VM. El punto de finalización de la API de tu blockchain es `127.0.0.1:9650/ext/bc/sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk`.

También puedes alias este ID de blocket con o cualquier cosa que `timestampbc`quieras, para URL de API más simples. Más información: [admin.aliasChain](https://docs.avax.network/build/avalanchego-apis/admin-api#admin-aliaschain)

### Verifica el bloque de Génesis

En la génesis que especificamos `fP1vxkpyLWnH9dD6BQA`como los datos de génesis. Let’s que:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "timestampvm.getBlock",
    "params":{
        "id":""
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk
```

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "timestamp": "0",
        "data": "nyfJkNxEwKeQ9KpPducrm3jRaDzpPNJXUdZtgCWeMZTUxPqGp",
        "id": "24kWScv7DMA4LwdoFwmN1iRU3idyHRrrA2UxN9k6AuXihoK3mn",
        "parentID": "11111111111111111111111111111111LpoYY"
    },
    "id": 1
}
```

Como puedes ver que nuestro primer bloque `timestamp: 0`tiene. También el ID de padre `11111111111111111111111111111111LpoYY`\(\) es la ID de la P-chain. Let's los datos de génesis con el método de API estática de VM. Recuerda que nuestro ID de TimestampVM está aliado con `timestampvm`:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "id"     : 1,
    "method" : "timestampvm.decode",
    "params" : {
        "bytes": "nyfJkNxEwKeQ9KpPducrm3jRaDzpPNJXUdZtgCWeMZTUxPqGp"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/vm/tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH
```

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "data":"helloworld",
        "encoding": "cb58"
    },
    "id": 1
}
```

Podemos ver que los datos de génesis tienen la `helloworld`cadena.

### Propone un nuevo bloque

Podemos proponer nuevos bloques a nuestra blockchain con algunos datos en ella.

Primero Los bloques esperan tener bytes de 32 longitud. Hay un `length`argumento en el método de codificación:

```cpp
curl -X POST --data '{
   "jsonrpc": "2.0",
    "method" : "timestampvm.encode",
    "params" : {
        "data": "mynewblock",
        "length": 32
    }
    "id"     : 1,
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/vm/tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH
```

Resultado:

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "bytes": "qDNkrS9xuyGmaAgdHAjbmANSvCKnK5BHvyCybJaFCAqx46Z8y",
    "encoding": "cb58"
  },
  "id": 1
}
```

Ahora podemos proponer un nuevo bloque con los datos:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "timestampvm.proposeBlock",
    "params":{
        "data":"qDNkrS9xuyGmaAgdHAjbmANSvCKnK5BHvyCybJaFCAqx46Z8y"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk
```

Resultado:

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "Success": true
  },
  "id": 1
}
```

Revisemos el último bloque para verificar la existencia de nuestro bloque propuesto:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "timestampvm.getBlock",
    "params":{
        "id":""
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk
```

Resultado:

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "timestamp": "1625674027",
    "data": "qDNkrS9xuyGmaAgdHAjbmANSvCKnK5BHvyCybJaFCAqx46Z8y",
    "id": "Br36bggr9vEEoNTNVPsSCD7QHHoCqE31Coui6uh1rA71EGPve",
    "parentID": "24kWScv7DMA4LwdoFwmN1iRU3idyHRrrA2UxN9k6AuXihoK3mn"
  },
  "id": 1
}
```

El resultado contiene el `data`campo tiene .`qDNkrS9xuyGmaAgdHAjbmANSvCKnK5BHvyCybJaFCAqx46Z8y` Estos son los mismos datos que nuestros datos propuestos en el paso anterior.

