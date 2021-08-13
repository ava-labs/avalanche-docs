# Crear un Blockchain personalizado

## Introducción

Avalanche admite la creación de blockchains con máquinas virtuales en subnets. En este tutorial, crearemos una cadena de bloques personalizada utilizando una máquina virtual personalizada \(Timestamp VM\).

Si desea un blockchain que tenga capacidades de X-Chain \(AVM\), consulte [Crear AVM Blockchain](../nodes-and-staking/run-avalanche-node.md).

### Requisitos previos

Necesitará un nodo en ejecución, un usuario en el nodo, y un poco de AVAX en la dirección controlada por el usuario. Todo eso está cubierto en el tutorial [Run Avalanche](../nodes-and-staking/run-avalanche-node.md) Node.

A continuación, necesita tener su nodo como validador en la [Red Primaria](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network). Puede averiguar cómo hacer eso en el tutorial [Añadir un](../nodes-and-staking/add-a-validator.md) Validador. Se recomienda que lo haga [con llamadas de API](../nodes-and-staking/add-a-validator.md#add-a-validator-with-api-calls), ya que así es como interactuará con su nodo en el resto de este tutorial.

## Crear la máquina virtual

Cada blockchain es una instancia de una máquina virtual. Por ejemplo, X-Chain es una instancia de AVM y C-Chain es la instancia de EVM. Avalanche admite crear nuevas cadenas de bloques \(instancias\) de máquinas virtuales. En este caso usaremos Timestamp VM, que es un plugin VM externo. Timestamp VM se comunicará con nuestro nodo AvalancheGo a través de RPC.

{% page-ref page="create-a-virtual-machine-vm.md" %}

## Crear el Subred

Cada blockchain es validado por una [subred](../../../learn/platform-overview/#subnets). Antes de crear un blockchain, necesitará un subnet para validarlo. También puede utilizar un subnet que ya existe si tiene un número suficiente de sus teclas de control.

{% page-ref page="create-a-subnet.md" %}

### Añadir Validadores al Subnet

El subnet necesita validadores para validar cadenas de bloqueo.

{% page-ref page="../nodes-and-staking/add-a-validator.md" %}

### Crear los datos del Génesis<a id="create-the-genesis-data"></a>

Cada blockchain tiene algún estado de génesis cuando se crea. Cada VM define el formato y la semántica de sus datos de génesis. `TimestampVM``` utiliza datos codificados CB58 como datos de génesis. Hay métodos de API estáticas que pueden utilizarse para codificar / decodificar datos de string . Ver [TimestampVM API](create-a-virtual-machine-vm.md#api).

Generemos un simple dato de génesis para TimestampVM:

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

Nuestros datos de génesis serán `fP1vxkpyLWnH9dD6BQA`.

## Crear el Bloqueo

Ahora creemos el nuevo blockchain. Para ello, llamamos [`platform.createBlockchain`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createblockchain). Tu llamada debería parecer la que está abajo. Tienes que cambiar `subnetID` a la subred que validará tu blockchain, y proporcionar un `nombre` de usuario que controle un número suficiente de las teclas de control de la subred. Como recordatorio, puedes averiguar qué umbral y las teclas de control de una subred son llamando a [`platform.getSubnets`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getsubnets).

Recuerda que hemos utilizado `tGas3T58KzdjLHBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH` como nuestro ID VM en [Crear una máquina virtual \(VM\)](create-a-virtual-machine-vm.md#vm-aliases).

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

La respuesta contiene el ID de transacción:

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

### Verificar el éxito<a id="verify-success"></a>

Después de unos segundos, la transacción para crear nuestra cadena de bloques debería haber sido aceptada y la cadena de bloques debería existir \(asumiendo que la solicitud estaba bien formada, etc.)

Para comprobar, llame a [`platform.getBlockchains`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getblockchains). Esto devuelve una lista de todas las cadenas de bloqueo que existen.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getBlockchains",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

La respuesta confirma que se creó el blockchain :

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

### Validando el Blockchain<a id="validating-blockchain"></a>

Cada blockchain necesita un conjunto de validadores para validar y procesar las transacciones en él. Puede comprobar si un nodo está validando una cadena de bloques determinada llamando a [`platform.getBlockchainStatus`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getblockchainstatus) en ese nodo:

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

Si responde `"Validar"`, el nodo está validando la cadena dada. Si responde `"Sincronización"`, entonces la cadena rastreada por este nodo, pero no está validando. Si respondía `"Creado"` entonces la cadena existe pero no está siendo sincronizada. Tenga en cuenta que para validar o ver un subnet, debe comenzar su nodo con el argumento `--whitelisted-subnets=[subnet ID va aquí]``` \(por ejemplo, --whitelisted-subnets=KL1e8io1Zi2kr8cTXxvi321pAzfQuua8tmBfadqpf9K2dc2TT\), así como añadir el nodo al conjunto de validadores de la subred.

Puede encontrar más información en el tutorial [de Agregar un Validador de](../nodes-and-staking/add-a-validator.md#adding-a-subnet-validator) Subnet.

## Interactuar con el nuevo Blockchain<a id="interact-with-the-new-blockchain"></a>

Puede interactuar con esta nueva instancia del VM. El punto de partida API de su blockchain es `127.0.1:9650/ext/bc/sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk`.

También puede alias este ID de cadena con `timestampbc`, o lo que quieras, para URL de API más simples. Más información: [admin.aliasChain](https://docs.avax.network/build/avalanchego-apis/admin-api#admin-aliaschain)

### Verifican el bloque de Génesis

En la génesis especificamos `fP1vxkpyLWnH9dD6BQA` como datos de génesis. Let’s que:

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

Como se puede ver nuestro primer bloque tiene `la marca de tiempo: 0`. También el ID de padre `\(11)` es el ID de la cadena P. Let's los datos de génesis con el método de API estática de VM. Recuerde que nuestro ID de TimestampVM está aliado con `timestampvm`:

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

Podemos ver que los datos de génesis tienen la cadena `helloworld`.

### Proponer nuevo bloque

Podemos proponer nuevos bloques a nuestra cadena de bloques con algunos datos en él.

Primero vamos a obtener datos codificados. Los bloques esperan tener bytes de 32 longitud. Hay un argumento `de longitud` en el método de encode:

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

Resultado contiene el campo `de datos` tiene `qDNkrS9xuyGmaAgdHajbmansvCKnK5BHvyCybJaFCAqx46Z8y`. Estos son los mismos datos que los datos propuestos en el paso anterior.

