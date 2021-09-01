# Crear un NFT \(Parte 1\)

## Introducción

En Avalanche, los bienes digitales se representan como tokens. Algunos tokens son ****fungibles, lo que significa que un token es intercambiable para cualquier otro tokens de otro. Las monedas del mundo real son fungibles, por ejemplo; un billete de 5 dólares se trata como si fuera igual a cualquier otro billete de 5 dólares.

Avalanche también soporta los tokens no fungibles \(NFTs\). Por definición, cada NFT es única y no es perfectamente intercambiable con ninguna otra NFT. Por ejemplo, podría haber una NFT que represente la propiedad de una pieza de arte del mundo real; cada pieza de arte, como cada NFT, es único. Los NFT's representan la escasez digital y pueden resultar incluso más útiles que los tradicionales tokens fungibles.

En este tutorial, crearemos y enviaremos NFTs usando la API de AvalancheGo. En un tutorial futuro, crearemos una familia NFT personalizada usando [AvalancheJS](../../tools/avalanchejs/) y exploraremos NFT con más detalles.

## Requisitos

Has completado [Ejecutar un nodo](../nodes-and-staking/run-avalanche-node.md) de Avalanche y están familiarizados con [la arquitectura de](../../../learn/platform-overview/) Avalanche. En este tutorial, usamos [la colección de Avalanche para](https://github.com/ava-labs/avalanche-postman-collection) ayudarnos a hacer llamadas de la API.

## Crear la Familia NFT

Cada NFT pertenece a una ****familia, que tiene un nombre y un símbolo. Cada familia está compuesta de ****grupos. El número de grupos de la familia es especificado cuando esta se crea. [`avm.createNFTAsset`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createnftasset)Nuestra NFT existirá en la X-Chain, de modo que para crear nuestra familia NFT que llamaremos , que es un método de la [API](../../avalanchego-apis/exchange-chain-x-chain-api.md) de la X-Chain.

La firma de este método es:

```cpp
avm.createNFTAsset({
    name: string,
    symbol: string,
    minterSets []{
        minters: []string,
        threshold: int
    },
    from: []string,
    changeAddr: string,
    username: string,
    password: string
}) ->
{
    assetID: string,
    changeAddr: string,
}
```

### **Método**

* [`avm.createNFTAsset`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createnftasset)

**Parámetros**

* `name`es un nombre de lectura humana para nuestra familia NFT. No necesariamente único. Entre 0 y 128 caracteres.
* `symbol`es un símbolo de corta duración para esta familia NFT. Entre 0 y 4 caracteres. No necesariamente único. Puede ser omitido.
* `minterSets`es una lista donde cada elemento especifica la de las direcciones en que `minters`acuñan más del activo al firmar una operación `threshold`de acuñación.
* Realizar una transacción en la X-Chain requiere una comisión de transacción pagada en AVAX. `username`y `password`denotar el usuario que paga la tarifa.
* `from`son las direcciones que quieres usar para esta operación. Si se omite, usa cualquiera de tus direcciones según sea necesario.
* `changeAddr`es la dirección a la que se enviará cualquier cambio Si se omite, el cambio se envía a cualquiera de tus direcciones.

### **Respuesta**

* `assetID`es el ID de un nuevo activo que hemos creado.
* `changeAddr`en el resultado es la dirección donde se envió cualquier cambio.

Más tarde en este ejemplo, acuñaremos un NFT, así que asegúrate de reemplazar al menos 1 dirección del minter set con una dirección que tu usuario controle.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.createNFTAsset",
    "params" :{
        "name":"Family",
        "symbol":"FAM",
        "minterSets":[
            {
                "minters": [
                    "X-avax1ghstjukrtw8935lryqtnh643xe9a94u3tc75c7"
                ],
                "threshold": 1
            }
        ],
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

La respuesta debería ser así:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "assetID":"2X1YV4jpGpqezvj2khQdj1yEiXU1dCwsJ7DmNhQRyZZ7j9oYBp",
        "changeAddr":"X-avax1ghstjukrtw8935lryqtnh643xe9a94u3tc75c7"
    }
}
```

Un par de cosas a notar: primero, además de crear una familia NFT, AvalancheGo’s [`avm.createNFTAsset`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createnftasset)también crea un grupo para cada una de las cosas `minterSets`que se pasan en. Por ejemplo, si `minterSets`tiene 3 elementos, la familia NFT tiene 3 grupos. Segundo, toma nota de lo `assetID`que se vuelve en la respuesta. Esta es la familia NFT recientemente `assetID`creada, y lo necesitarás más tarde para emitir NFT.

Puede que te preguntes por qué especificamos _conjuntos de direcciones que pueden acuñar más unidades del activo en lugar _de una sola dirección. Aquí está el porqué:

* **Seguridad: **si solo una dirección puede acuñar más del activo, y la clave privada para esa dirección se pierde, no se pueden acuñar más unidades. Del mismo modo, si sólo una dirección puede acuñar más del activo, nada impide que el titular de esa dirección acuñe unilateralmente todo lo que quiera.
* **Flexibilidad: **es agradable poder codificar lógica como: "Alice puede acuñar unilateralmente más unidades de este activo, o 2 de Dinesh, Ellin y Jamie pueden acuñar más".

## Obtener UTXOs para NFT

Las salidas de NFT no aparecen en llamadas a [`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance)o .[`avm.getAllBalances`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getallbalances) Para ver tus NFT, tienes que llamar [`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos)y luego analizar el utxo para comprobar el ID del tipo. `11`Las salidas de acuñación NFT tienen un tipo de identificación `00 00 00 0a`en hexidecimal \( en decimal\) y las salidas de transferencia NFT tienen un tipo de identificación `00 00 00 0b`en hexdecimal al \( `10`en decimal\).

### **Método**

* [`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos)

### **Parámetros**

* `addresses`son las direcciones para buscar UTXOs para.

**Respuesta:**

* `numFetched`es el número total de UTXOs en la respuesta.
* `utxos`es una matriz de cadenas codificadas de CB58.
* `endIndex`Este método admite la paginación. `endIndex`Denomina la última UTXO devuelve.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.getUTXOs",
    "params" :{
        "addresses":["X-avax1ghstjukrtw8935lryqtnh643xe9a94u3tc75c7"]
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

La respuesta contiene una lista de UTXOs:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "numFetched": "2",
        "utxos": [
            "116VhGCxiSL4GrMPKHkk9Z92WCn2i4qk8qdN3gQkFz6FMEbHo82Lgg8nkMCPJcZgpVXZLQU6MfYuqRWfzHrojmcjKWbfwqzZoZZmvSjdD3KJFsW3PDs5oL3XpCHq4vkfFy3q1wxVY8qRc6VrTZaExfHKSQXX1KnC",
            "11cxRVipJgtuHy1ZJ6qM7moAf3GveBD9PjHeZMkhk7kjizdGUu5RxZqhViaWh8dJa9jT9sS62xy73FubMAxAy8b542v3k8frTnVitUagW9YhTMLmZ6nE48Z9qXB2V9HHzCuFH1xMvUEj33eNWv5wsP3JvmywkwkQW9WLM"
        ],
        "endIndex": {
            "address": "X-avax1ghstjukrtw8935lryqtnh643xe9a94u3tc75c7",
            "utxo": "2iyUVo8XautXpZwVfp5vhSh4ASWbo67zmHbtx7SUJg2Qa8BHtr"
        }
    }
}
```

[`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos)retorna 2 UTXOs. Tomemos la primera y la decode para confirmar que es una [salida de acuñación de NFT](../../references/avm-transaction-serialization.md#nft-mint-output) Primero, convertimos la cadena de codificación de Base58Check que se devuelve de en en [`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos)al hex. La siguiente cadena [CB58](http://support.avalabs.org/en/articles/4587395-what-is-cb58):

```cpp
116VhGCxiSL4GrMPKHkk9Z92WCn2i4qk8qdN3gQkFz6FMEbHo82Lgg8nkMCPJcZgpVXZLQU6MfYuqRWfzHrojmcjKWbfwqzZoZZmvSjdD3KJFsW3PDs5oL3XpCHq4vkfFy3q1wxVY8qRc6VrTZaExfHKSQXX1KnC
```

se expresa en hexadecimal como:

```cpp
00 00 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57 00 00 00 01 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57 00 00 00 0a 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 01 00 00 00 01 3c b7 d3 84 2e 8c ee 6a 0e bd 09 f1 fe 88 4f 68 61 e1 b2 9c
```

Ahora, podemos descomponer el hex en los componentes individuales de la UTXO al referirse al formato de serialización de [la transacción](../../references/avm-transaction-serialization.md):

```cpp
NFT Mint Output

CodecID: 00 00
TXID: 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57
Output Index: 00 00 00 01
AssetID: 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57
TypeID: 00 00 00 0a
GroupID: 00 00 00 00
Locktime: 00 00 00 00 00 00 00 00
Threshold: 00 00 00 01
Address Count: 00 00 00 01
Addresses[0]: 3c b7 d3 84 2e 8c ee 6a 0e bd 09 f1 fe 88 4f 68 61 e1 b2 9c
```

`00 00 00 0a`Tenga en cuenta que el `TypeID`es el ID de tipo correcto para una salida de acuñación NFT. También ten en cuenta que el `GroupID`es .`00 00 00 00` Esto `GroupID`fue creado en base al número de personas `MinterSets`que pasé a la red.`avm.createNFTAsset`

## Acuñar el Activo

Ahora que tenemos una familia NFT y un grupo para el sencillo `MinterSet`somos capaces de crear NFT pertenecientes a este grupo. Para hacer eso [`avm.mintNFT`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-mintnft)llamamos:

### **Método**

* [`avm.mintNFT`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-mintnft)

### **Parámetros**

* `assetID`es el ID de la familia NFT.
* `payload`es una carga útil codificada de CB58 de hasta 1024 bytes. En la parte 2 **\(VENING **PRONTO\) exploraremos la creación de un protocolo alrededor de la carga útil de NFT. Para este tutorial, la carga útil es la cadena "AVA Labs".
* `to`es la dirección que recibirá el NFT recientemente acuñado. Reemplaza `to`con una dirección que tus controles de usuario para que más tarde puedas enviar algunos de los NFT acuñados recientemente.
* `username`debe ser un usuario que mantiene claves que le dan permiso de acuñar más de este NFT. Es decir, controla al menos las _claves de _umbral para uno de los conjuntos de mineros que especificamos arriba.
* `password`es la contraseña válida para`username`

### **Respuesta**

* `txID`es el ID de transacción.
* `changeAddr`en el resultado es la dirección donde se envió cualquier cambio.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.mintNFT",
    "params" :{
        "assetID":"2X1YV4jpGpqezvj2khQdj1yEiXU1dCwsJ7DmNhQRyZZ7j9oYBp",
        "payload":"2EWh72jYQvEJF9NLk",
        "to":"X-avax1a202a8pu5w4vnerwzp84j68yknm6lf47drfsdv",
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

La respuesta contiene el ID de la transacción.

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"x4fKx95KirTvqWCeiPZfnjB4xFdrTduymRKMouXTioXojdnUm",
        "changeAddr": "X-avax1a202a8pu5w4vnerwzp84j68yknm6lf47drfsdv"
    }
}
```

Similar al paso anterior, podemos confirmar que una NFT fue acuñada al llamar [`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos)y analizar la UTXO para confirmar que ahora tenemos una salida de [transferencia de NFT](../../references/avm-transaction-serialization.md#nft-transfer-output)

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.getUTXOs",
    "params" :{
        "addresses":["X-avax1a202a8pu5w4vnerwzp84j68yknm6lf47drfsdv"]
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Esto debería darnos:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "numFetched": "2",
        "utxos": [
            "11Do4RK6FchGXeoycKujR7atm3tvBz3qc64uoipCc5J74Sj1U4orM6vbBGSES8hnjgjZava9oPgmnbHxh2mBKjeXdvAqTRtYMHEacrveSzKgk7F8h8xi8JB9CddoiX8nbjZMYt1keGo5Rvpjh8dGymDWwRbV1FdnG5uDiiyU8uidc3P24",
            "11JL98R9yVoCaekrzP2PoCKJfCTin6vhTWU4h9TxqevEUnhiMo2j7F4DHxRpHq6BnFnHGAajhmiXgrdfUbbNd1izmdLVMwqe3UCTJWWLaJ6XUZ46R243T8NdhKXXJWC9GvcjFYMyiKRWvVnvFt7duzq8P8D53uhv1QfdQ9"
        ],
        "endIndex": {
            "address": "X-avax1a202a8pu5w4vnerwzp84j68yknm6lf47drfsdv",
            "utxo": "2qs3A1sBhVjFcXqRADJ7AorvoawVgMkNdgJi8eYNPABMKmdBYq"
        }
    },
    "id": 1
}
```

Como en el paso anterior, ahora podemos decodificar la UTXO codificada en CB58 a hexadecimal y luego descomponerla en sus componentes individuales para confirmar que tenemos la UTXO y el tipo correctos.

Primero, convertimos la cadena de codificación de Base58Check que se devuelve de en en [`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos)al hex. La siguiente cadena CB58:

```cpp
11Do4RK6FchGXeoycKujR7atm3tvBz3qc64uoipCc5J74Sj1U4orM6vbBGSES8hnjgjZava9oPgmnbHxh2mBKjeXdvAqTRtYMHEacrveSzKgk7F8h8xi8JB9CddoiX8nbjZMYt1keGo5Rvpjh8dGymDWwRbV1FdnG5uDiiyU8uidc3P24
```

se expresa en hexadecimal como:

```cpp
00 00 7d 07 0d 1e fe a6 4e 45 09 05 c6 11 ee b1 cf 61 9f 21 22 eb 17 db aa ea 9a fe 2d ff 17 be 27 6b 00 00 00 01 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57 00 00 00 0b 00 00 00 00 00 00 00 08 41 56 41 20 4c 61 62 73 00 00 00 00 00 00 00 00 00 00 00 01 00 00 00 01 3c b7 d3 84 2e 8c ee 6a 0e bd 09 f1 fe 88 4f 68 61 e1 b2 9c
```

Ahora, podemos descomponer el hex en los componentes UTXO’s individuales:

```cpp
NFT Mint Output

CodecID: 00 00
TXID: 7d 07 0d 1e fe a6 4e 45 09 05 c6 11 ee b1 cf 61 9f 21 22 eb 17 db aa ea 9a fe 2d ff 17 be 27 6b
Output Index: 00 00 00 01
AssetID: 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57
TypeID: 00 00 00 0b
GroupID: 00 00 00 00
Payload Length: 00 00 00 08
Payload: 41 56 41 20 4c 61 62 73
Locktime: 00 00 00 00 00 00 00 00
Threshold: 00 00 00 01
Address Count: 00 00 00 01
Addresses[0]: 3c b7 d3 84 2e 8c ee 6a 0e bd 09 f1 fe 88 4f 68 61 e1 b2 9c
```

`00 00 00 0b`Tenga en cuenta que el `TypeID`es el ID de tipo correcto para una salida de [transferencia de NFT.](../../references/avm-transaction-serialization.md#nft-transfer-output) Además, ten en cuenta que la carga útil está incluida.

## Enviar el NFT

Ahora puedes enviar el NFT a quién quieras. Para ello, usa el método [`avm.sendNFT`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-sendnft)API de AvalancheGo.

**Método**

* [`avm.sendNFT`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-sendnft)

**Parámetros**

* `assetID`es el ID de la NFT que enviamos.
* `to`es la dirección que recibirá el NFT recientemente acuñado.
* `groupID`es el grupo NFT desde el que enviar el NFT.
* `username`es el usuario que controla el NFT.
* `password`es la contraseña válida para`username`

**Respuesta**

* `txID`es el ID de transacción.
* `changeAddr`en el resultado es la dirección donde se envió cualquier cambio.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.sendNFT",
    "params" :{
        "assetID" :"2X1YV4jpGpqezvj2khQdj1yEiXU1dCwsJ7DmNhQRyZZ7j9oYBp",
        "to"      :"X-avax1ghstjukrtw8935lryqtnh643xe9a94u3tc75c7",
        "groupID" : 0,
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

La respuesta confirma que la operación de transferencia NFT fué exitosa

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID": "txtzxcrzPx1sn38HWKU9PB52EpbpXCegbdHNxPNAYd9ZvezJq",
        "changeAddr": "X-avax1a202a8pu5w4vnerwzp84j68yknm6lf47drfsdv"0
    }
}
```

Puedes llamar [`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos)para la dirección que enviaste la NFT a la UTXO devuelta y decompose la versión devuelta, después de convertir de CB58 a hex, para confirmar que hay una UTXO con un tipo de id `00 00 00 0b`en hex o `11`decimal.

## Concluimos!

La tecnología de blockchain y los tokenomics representan una nueva forma radical de representar los activos digitales. Los tokens no fungibles permiten que los escasos activos se conviertan en tokens. En este tutorial:

* Utilizado `createNFTAsset`para crear una familia y un grupo de activos no fungibles
* Utilizado para `mintNFT`acuñar unidades de una NFT al grupo.
* Utilizado `getUTXOs`para buscar UTXOs para una dirección. Luego convertimos la UTXO codificada en CB58 a hexadecimal y la descompusimos en sus componentes individuales.
* Utilizado `sendNFT`para transferir NFT entre direcciones.

En la segunda parte de esta serie, profundizaremos en el uso de AvalancheJS para crear un protocolo para nuestra carga útil NFT emitiéndola a múltiples grupos.

