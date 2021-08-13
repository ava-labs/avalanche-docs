# Crear un NFT \(Parte 1\)

## Introducción

En Avalanche, los bienes digitales están representados como tokens. Algunas fichas son **fungible**, lo que significa que una muestra es intercambiable para cualquier otro tok. La moneda del mundo real es honesta, por ejemplo; una nota de $5 se trata como la misma que cualquier otra nota de $5.

Avalanche también admite tokens no fungibles \(NFTs\). Por definición, cada NFT es único y no perfectamente intercambiable para cualquier otro NFT. Por ejemplo, podría haber una NFT que representa la propiedad de una pieza de arte del mundo real; cada pieza de arte, como cada NFT, es única. Los NFTs representan escasez digital y pueden demostrar tener una utilidad aún mayor que las fichas fungibles tradicionales.

En este tutorial, crearemos y enviaremos NFTs utilizando la API de AvalancheGo’s En un tutorial futuro, crearemos una familia NFT personalizada utilizando [AvalanchejS](../../tools/avalanchejs/) y exploraremos NFTs con más detalle.

## Requisitos para requisitos de seguridad

Has completado [Run Nodo](../nodes-and-staking/run-avalanche-node.md) Avalanche y estás familiarizado con [la arquitectura de Avalanche](../../../learn/platform-overview/). En este tutorial, utilizamos [la colección de Avalanche Postman](https://github.com/ava-labs/avalanche-postman-collection) para ayudarnos a hacer llamadas de API.

## Crear la Familia NFT

Cada NFT pertenece a una **familia**, que tiene un nombre y un símbolo. Cada familia está compuesta por **grupos**. El número de grupos en una familia se especifica cuando se crea la familia. Nuestra NFT existirá en la cadena X, por lo que para crear nuestra familia NFT llamaremos [`avm.createNFTAsset`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createnftasset), que es un método de la API de [la cadena X](../../avalanchego-apis/exchange-chain-x-chain-api.md).

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

### **Método de medición**

* [`avm.createNFTAsset`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createnftasset)

**Parámetros**

* `nombre` es un nombre de lectura humana para nuestra familia NFT. No necesariamente único. Entre 0 y 128 caracteres.
* `símbolo` es un símbolo de corta duración para esta familia NFT. Entre 0 y 4 caracteres. No necesariamente único. Puede ser omitido.
* `minterSets` es una lista en la que cada elemento especifica que `el umbral` de las direcciones en `minters` puede mintar juntos más del activo mediante la firma de una operación de minado.
* Realizar una transacción en la cadena X requiere una tarifa de transacción pagada en AVAX. `nombre de usuario` y `contraseña` denotan el usuario que paga la tarifa.
* `de` son las direcciones que desea utilizar para esta operación. Si se omitida, utiliza cualquiera de sus direcciones según sea necesario.
* `changeAddr` es la dirección a la que se enviará cualquier cambio. Si se omitida, el cambio se envía a cualquiera de sus direcciones.

### **Respuesta**

* `asset es` el ID del nuevo activo que hemos creado.
* `changeAddr` en el resultado es la dirección donde se envió cualquier cambio.

Más tarde en este ejemplo, vamos a mintar un NFT, así que asegúrese de reemplazar al menos 1 dirección en el conjunto de minter con una dirección que controla su usuario.

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

La respuesta debería parecer así:

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

Un par de cosas a notar: primero, además de crear una familia NFT, el [`avm.createNFTAsset`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createnftasset) de family, también crea un grupo para cada uno de los `minterSets`, que se pasan en. Por ejemplo, si `minterSets` tiene 3 elementos, la familia NFT tiene 3 grupos. En segundo lugar, tome nota del `activo que` se devuelve en la respuesta. Este es el `activo de` la familia NFT recientemente creada, y lo necesitarás más tarde para emitir NFTs.

Puede estar preguntando por qué especificamos _conjuntos_ de direcciones que pueden mintar más unidades del activo en lugar de una sola dirección. Aquí está el porqué:

* **Seguridad:** si solo una dirección puede mintar más del activo, y la clave privada para esa dirección se pierde, no se pueden acuñar más unidades. De manera similar, si solo una dirección puede mintar más del activo, nada detiene al titular de esa dirección de acuñar unilateralmente tanto como deseen.
* **Flexibilidad:** es agradable poder codificar la lógica como: "Alice puede unilateralmente mentar más unidades de este activo, o 2 de Dinesh, Ellin y Jamie pueden juntar más".

## Obtén UTXOS para NFT

Las salidas NFT no aparecen en llamadas a [`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance)[``](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getallbalances) o avm.getBalance Para ver sus NFTs, debe llamar a [`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos) y luego analizar el utxo para comprobar la identificación de tipo. Los productos de la menta NFT tienen un id tipo de `00 00 00 0a` en hexidecimal \(`10` en decimal\) y los productos de transferencia NFT tienen un id tipo de `00 00 00 0b` en hexdecimal \(`11` en decimal\).

### **Método de medición**

* [`avm.getUTXOS`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos)

### **Parámetros**

* `Las direcciones` son las direcciones para buscar UTXOS para.

**Respuesta:**

* `numFetched` es el número total de UTXOs en la respuesta.
* `utxos` es una variedad de cadenas codificadas CB58.
* `endIndex` Este método admite la paginación. `endIndex` denota el último UTXO devuelto .

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

[`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos) devuelve 2 UTXOs. Tomemos la primera y Let’s para confirmar que es una [salida de la menta NFT.](../../references/avm-transaction-serialization.md#nft-mint-output) Primero, convertimos la cadena codificada Base58Check que se devuelve de [`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos) en hex. La siguiente cadena [CB58](http://support.avalabs.org/en/articles/4587395-what-is-cb58):

```cpp
116VhGCxiSL4GrMPKHkk9Z92WCn2i4qk8qdN3gQkFz6FMEbHo82Lgg8nkMCPJcZgpVXZLQU6MfYuqRWfzHrojmcjKWbfwqzZoZZmvSjdD3KJFsW3PDs5oL3XpCHq4vkfFy3q1wxVY8qRc6VrTZaExfHKSQXX1KnC
```

se expresa en hexadecimal como:

```cpp
00 00 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57 00 00 00 01 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57 00 00 00 0a 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 01 00 00 00 01 3c b7 d3 84 2e 8c ee 6a 0e bd 09 f1 fe 88 4f 68 61 e1 b2 9c
```

Ahora, podemos descomponer el hex en los componentes individuales de UTXO’s al referirse al [formato de serialización de la transacción](../../references/avm-transaction-serialization.md):

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

Tenga en cuenta que el `TypeID` es `00 00 00 0a`, que es el ID de tipo correcto para una salida de la menta NFT. También tenga en cuenta que el `GroupID` es `de 00 00 00`. Este `GroupID` fue creado en función del número de `MinterSets` que pasé a `avm.createNFTAsset`.

## Mint el activo

Ahora que tenemos una familia NFT y un grupo para el único `MinterSet` podemos crear NFTs pertenecientes a este grupo. Para hacer eso llamamos [`avm.mintNFT`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-mintnft):

### **Método de medición**

* [`avm.mintNFT`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-mintnft)

### **Parámetros**

* `asset` es el ID de la familia NFT.
* `La` carga útil es una carga útil codificada arbitraria CB58 de hasta 1024 bytes. En la parte 2 **\(VENING SOON\)** exploraremos la creación de un protocolo alrededor de la carga útil NFT. Para este tutorial, la carga útil es la cadena "AVA Labs".
* es la dirección `que` recibirá el NFT, recién mentado. `Reemplazar a` una dirección que controla el usuario para que más tarde pueda enviar algunos de los NFT, recientemente mentados.
* `Nombre` de usuario debe ser un usuario que tenga las teclas que le da permiso para mentar más de este NFT. Es decir, controla al menos las teclas _de umbral_ para uno de los conjuntos de minero que hemos especificado anteriormente.
* `contraseña` es la contraseña válida para `el nombre de usuario`

### **Respuesta**

* `txID` es el ID de transacción.
* `changeAddr` en el resultado es la dirección donde se envió cualquier cambio.

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

Al igual que el paso anterior, ahora podemos confirmar que un NFT fue acuñado llamando a [`avm.getUTXOS`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos) y analizando el UTXO para confirmar que ahora tenemos un [salida de transferencia NFT](../../references/avm-transaction-serialization.md#nft-transfer-output).

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

Esto debe dar:

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

Como en el paso anterior, ahora podemos decodificar el CB58 codificado UTXO para hexidecimal y luego descomponerlo a sus componentes individuales para confirmar que tenemos el UTXO y el tipo correcto.

Primero, convertimos la cadena codificada Base58Check que se devuelve de [`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos) en hex. La siguiente cadena CB58:

```cpp
11Do4RK6FchGXeoycKujR7atm3tvBz3qc64uoipCc5J74Sj1U4orM6vbBGSES8hnjgjZava9oPgmnbHxh2mBKjeXdvAqTRtYMHEacrveSzKgk7F8h8xi8JB9CddoiX8nbjZMYt1keGo5Rvpjh8dGymDWwRbV1FdnG5uDiiyU8uidc3P24
```

se expresa en hexadecimal como:

```cpp
00 00 7d 07 0d 1e fe a6 4e 45 09 05 c6 11 ee b1 cf 61 9f 21 22 eb 17 db aa ea 9a fe 2d ff 17 be 27 6b 00 00 00 01 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57 00 00 00 0b 00 00 00 00 00 00 00 08 41 56 41 20 4c 61 62 73 00 00 00 00 00 00 00 00 00 00 00 01 00 00 00 01 3c b7 d3 84 2e 8c ee 6a 0e bd 09 f1 fe 88 4f 68 61 e1 b2 9c
```

Ahora, podemos descomponer el hex en los componentes individuales de UTXO’s

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

Tenga en cuenta que el `TypeID` es `00 00 00 0b` que es el id de tipo correcto para una [salida de transferencia NFT](../../references/avm-transaction-serialization.md#nft-transfer-output). Además, tenga en cuenta que la carga útil está incluida.

## Enviar la NFT

Ahora, puedes enviar la NFT a cualquiera. Para ello, utilice el método API [`avm.sendNFT`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-sendnft) de AvalancheGo’s

**Método de medición**

* [`avm.sendNFT`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-sendnft)

**Parámetros**

* `asset ID` es el ID del NFT que enviamos.
* es la dirección `que` recibirá el NFT, recién mentado.
* `groupID` es el grupo NFT desde el que enviar el NFT.
* `nombre de usuario` es el usuario que controla el NFT.
* `contraseña` es la contraseña válida para `el nombre de usuario`

**Respuesta**

* `txID` es el ID de transacción.
* `changeAddr` en el resultado es la dirección donde se envió cualquier cambio.

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

La respuesta confirma que nuestra Operación de Transferencia NFT tuvo éxito:

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

Puede llamar a [`avm.getUTXOS`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos) para la dirección que envió el NFT a la UTXO deforme, después de convertir de CB58 a hex, para confirmar que hay un UTXO con tipo id `00 00 00 0b` en hex o `11` en decimal.

## Envoltura

La tecnología de cadena de bloqueo y tokenomics representan una nueva forma radical de representar activos digitales. Las fichas no fungibles permiten que los activos escasos sean tokenized. En este tutorial, nosotros:

* `CreateNFTAsset` utilizado para crear una familia y grupo de activos no fungibles.
* Utilizado para `mintNFT` unidades de menta de un NFT al grupo.
* Se usaron `getUTXOs` para buscar UTXOS para una dirección. Luego convertimos el CB58 codificó UTXO a hex y lo descomponemos a sus componentes individuales.
* `Enviando NFT` usado para transferir NFTs entre direcciones.

En la parte 2 de esta serie, vamos a ir más a fondo utilizando AvalanchejS para crear un protocolo para nuestra carga útil NFT emitiendo a múltiples grupos.

