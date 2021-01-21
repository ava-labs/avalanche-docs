# Crear un NFT \(Parte 1\)

## Introducción

En Avalanche, los bienes digitales se representan como tokens. Algunos tokens son **fungibles**, lo que significa que un token es intercambiable por cualquier otro token. Las monedas del mundo real son fungibles, por ejemplo; un billete de 5 dólares se trata como si fuera igual a cualquier otro billete de 5 dólares.

Avalanche también soporta los tokens no fungibles \(NFTs\). Por definición, cada NFT es única y no es perfectamente intercambiable con ninguna otra NFT. Por ejemplo, podría haber una NFT que represente la propiedad de una pieza de arte del mundo real; cada pieza de arte, como cada NFT, es único. Los NFT's representan la escasez digital y pueden resultar incluso más útiles que los tradicionales tokens fungibles.

En este tutorial, crearemos y enviaremos NFTs usando la API de AvalancheGo. En un futuro tutorial, crearemos una familia de NFT personalizada usando [AvalancheJS](../../tools/avalanchejs/).

## Requisitos

Haber completado [Ejecutar un Nodo de Avalanche](../../getting-started.md) y que seas familiar con [La Arquitectura de Avalanche](../../../learn/platform-overview/). en este tutorial usaremos [Avalanche’s Postman collection](https://github.com/ava-labs/avalanche-postman-collection) para ayudarnos a hacer llamados API.

## Crear la Familia NFT

Cada NFT pertenece a una **familia**, la cual tiene un nombre y un símbolo. cada familia está compuesta por  **grupos**. El número de grupos de la familia es especificado cuando esta se crea. Nuestro NFT existirá en la  X-Chain, así que para crear la familia de nuestro NFT ejecutaremos [`avm.createNFTAsset`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createnftasset), el cual es un método de la [API de la X-Chain](../../avalanchego-apis/exchange-chain-x-chain-api.md).

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

* `name` es un nombre legible por los humanos para nuestra familia NFT. No es necesariamente único. Entre 0 y 128 caracteres.
* `symbol` es un símbolo abreviado para esta familia de NFT. Entre 0 y 4 caracteres. No necesariamente único. Puede ser omitido.
* `minterSets` es una lista donde cada elemento especifica que el `threshold` de las direcciones en `minters` pueden juntos acuñar más del activo firmando una operación de acuñación.
* Realizar una transacción en la X-Chain requiere una comisión de transacción pagada en AVAX. El `username` y `password` denotan al usuario que paga la comisión.
* `from` son las direcciones que quieres usar para esta operación. Si se omite, utiliza cualquiera de tus direcciones según sea necesario.
* `changeAddr` es la dirección a la que se enviará cualquier cambio. Si se omite, el cambio se envía a cualquiera de tus direcciones.

### **Respuesta**

* `assetID` es el ID del nuevo activo que hemos creado.
* `changeAddr` en el resultado es la dirección donde se envió el cambio.

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

La respuesta debería verse así:

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

Un par de cosas a tener en cuenta: primero, además de crear una familia NFT, en AvalancheGo [`avm.createNFTAsset`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createnftasset) también crea un grupo para cada uno de los `minterSets` . Por ejemplo, si `minterSets` tiene 3 elementos, la familia NFT tiene 3 grupos. En segundo lugar, tome nota del `assetID` el cual es proporcionado en la respuesta. Este es el `assetID` de la familia NFT que acabamos de crear, la necesitarás luego para emitir NFTs.

Tal vez se pregunte por qué especificamos _sets_ de direcciones que pueden acuñar más unidades del activo en lugar de una sola dirección. Aquí está el porqué:

* **Seguridad:** si sólo una dirección puede acuñar más del activo, y se pierde la clave privada de esa dirección, no se podrán acuñar más unidades. Del mismo modo, si sólo una dirección puede acuñar más del activo, nada impide que el titular de esa dirección acuñe unilateralmente todo lo que quiera.
* **Flexibilidad:** es agradable poder codificar la lógica como, "Alice puede acuñar unilateralmente más unidades de este activo, o 2, en el cual Dinesh, Ellin y Jamie pueden juntos acuñar más".

## Obtener UTXOs para NFT

Las salidas de la NFT no aparecen en los llamados a [`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance) o [`avm.getAllBalances`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getallbalances). Para ver tus NFTs, tienes que hacer un llamado a [`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos) y luego analizar el UTXO para comprobar el tipo de ID. Las salidas de Acuñación NFT tienen un tipo de ID de `00 00 00 0a` en hexadecimal \(`10` en decimal\) y las salidas de transferencia de NFT tienen un tipo de ID de `00 00 00 0b` en hexadecimal \(`11` en decimal\).

### **Método**

* [`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos)

### **Parámetros**

* `addresses` son las direcciones para buscar UTXOs.

**Respuesta:**

* `numFetched` es el numero total de UTXOs en la respuesta.
* `utxos` es un conjunto de cadenas codificadas CB58.
* `endIndex` este método permite la paginación. `endIndex` denota el ultimo UTXO retornado.

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

[`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos) retorna 2 UTXOs. Tomaremos la primera y la decodificaremos para confirmar que es un [Una Salida de Acuñación NFT.](../../references/avm-transaction-serialization.md#nft-mint-output) Primero, convertimos la cadena codificada Base58Check que se recibe de [`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos) a hex. La siguiente cadena de [CB58](http://support.avalabs.org/en/articles/4587395-what-is-cb58) :

```cpp
116VhGCxiSL4GrMPKHkk9Z92WCn2i4qk8qdN3gQkFz6FMEbHo82Lgg8nkMCPJcZgpVXZLQU6MfYuqRWfzHrojmcjKWbfwqzZoZZmvSjdD3KJFsW3PDs5oL3XpCHq4vkfFy3q1wxVY8qRc6VrTZaExfHKSQXX1KnC
```

Se expresa en hexadecimal como:

```cpp
00 00 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57 00 00 00 01 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57 00 00 00 0a 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 01 00 00 00 01 3c b7 d3 84 2e 8c ee 6a 0e bd 09 f1 fe 88 4f 68 61 e1 b2 9c
```

Ahora, podemos descomponer el hex en los componentes individuales de la UTXO refiriéndonos al [formato de serialización de transacciones](../../references/avm-transaction-serialization.md):

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

Ten en cuenta que el `TypeID` es`00 00 00 0a` el cual es el tipo correcto de identificación para una salida de acuñación NFT. También hay que tener en cuenta que el `GroupID` es `00 00 00 00`. Este `GroupID` fué creado basado en los números de `MinterSets` que pasamos a `avm.createNFTAsset`.

## Acuñar el Activo

Ahora que tenemos una familia de NFT y un grupo para el `MinterSet` somos capaces de crear NFTs pertenecientes a este grupo. Para hacer eso ejecutamos [`avm.mintNFT`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-mintnft):

### **Método**

* [`avm.mintNFT`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-mintnft)

### **Parámetros**

* `assetID` es el ID de la familia NFT.
* `payload` es una carga útil arbitraria codificada en CB58 de hasta 1024 bytes. En la Parte 2 \(**PRONTO**\), exploraremos la creación de un protocolo alrededor de la carga útil de la NFT. Para este tutorial, la carga útil es la cadena "AVA Labs".
* `to` es la dirección que recibirá el recién acuñado NFT. Reemplaza `to` con una dirección que tu usuario controle para que más tarde puedas enviar algunos de los recién acuñados NFT.
* `username` debe ser un usuario que tenga control keys que le permitan acuñar más de este NFT. Es decir, controla por lo menos _`threshold`_  control keys para uno de los minter sets que especificamos arriba.
* `password` es la contraseña válida para `username`

### **Respuesta**

* `txID` es el ID de la transacción.
* `changeAddr` esta es la dirección donde se envió el cambio.

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

La respuesta contiene el ID de la transacción:
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

Como en el paso anterior, podemos confirmar que un NFT fué acuñado ejecutando [`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos) y analizando el UTXO para confirmar que tenemos una [salida de Transferencia NFT](../../references/avm-transaction-serialization.md#nft-transfer-output).

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

Primero, convertimos la cadena codificada Base58Check que se se proporciona desde [`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos) a hex. La siguiente cadena de CB58:

```cpp
11Do4RK6FchGXeoycKujR7atm3tvBz3qc64uoipCc5J74Sj1U4orM6vbBGSES8hnjgjZava9oPgmnbHxh2mBKjeXdvAqTRtYMHEacrveSzKgk7F8h8xi8JB9CddoiX8nbjZMYt1keGo5Rvpjh8dGymDWwRbV1FdnG5uDiiyU8uidc3P24
```

Expresada en hexadecimal como:

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

Ten en cuenta que el `TypeID` is `00 00 00 0b` el cual es el tipo correcto de identificación para una [Salida de Transferencia NFT](../../references/avm-transaction-serialization.md#nft-transfer-output). Además, ten en cuenta que la carga útil está incluida.

## Enviar el NFT

Ahora puedes enviar el NFT a quién quieras. Para hacer eso usa el Método API [`avm.sendNFT`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-sendnft) de AvalancheGo.

**Método**

* [`avm.sendNFT`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-sendnft)

**Parámetros**

* `assetID` es la ID del NFT que enviaremos.
* `to` es la dirección que va a recibir el NFT que creamos.
* `groupID` es el grupo NFT desde el cual se envía el NFT.
* `username` es el usuario que controla el NFT.
* `password` es la contraseña valida para `username`

**Respuesta**

* `txID` es el ID de la transacción.
* `changeAddr` esta es la dirección donde se envió el cambio

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
Puedes ejecutar [`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos) en la dirección a la que enviaste el NFT y descomponer la UTXO retornada, después de convertir de CB58 a hex, para confirmar que hay un UTXO con type id `00 00 00 0b` en hex o`11` en decimal.

## Concluimos!

BLa tecnología de blockchain y los tokenomics representan una nueva forma radical de representar los activos digitales. Los tokens no fungibles permiten que los escasos activos se conviertan en tokens. En este tutorial, nosotros:

* Usamos`createNFTAsset` para crear una familia y un grupo de activos no fungibles.
* Usamos`mintNFT` para acuñar unidades de un NFT al grupo.
* Usamos`getUTXOs` para buscar UTXOs para una dirección. Luego convertimos la UTXO codificada en CB58 a hexadecimal y la descompusimos en sus componentes individuales.
* Usamos`sendNFT` para transferir NFT's entre direcciones.

En la segunda parte de esta serie, profundizaremos en el uso de AvalancheJS para crear un protocolo para nuestra carga útil NFT emitiéndola a múltiples grupos.
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTg1OTM5NTMwNCwtNTI2MTIxNDA2LDE4ND
c2NTI4NjcsLTEyMzg3OTM2NjFdfQ==
-->