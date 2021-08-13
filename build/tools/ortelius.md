---
description: 'Esta API permite a los clientes interactuar con Ortelius, el indexador Avalanche.'

---

# API Ortelius

## API Ortelius

### Formato de la versión

Esta API utiliza peticiones GET HTTP utilizando parámetros de consulta de URL y devuelve datos JSON.

### Versioning

A partir de la versión 2, las rutas de API se prefixed por una etiqueta de versión, por ejemplo, `http://localhost:8080/v2`.

La versión actual de la API es la versión 2. La documentación de [la API](ortelius.md#legacy-api) de Legacy tiene información sobre el uso de la API v1.

### Tipos de datos

Además de enteros, cadenas y booleanos, se utilizan los siguientes tipos de datos en toda la API:

| Nombre del nombre de la empresa | Descripción | Ejemplos de ello |
| :--- | :--- | :--- |
| `I.` | Un identificador de objetos codificados CB58, como una cadena, transacción o identificación de activos | `2oYMBNV4eNHyqk2fjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM` |
| `Dirección de la dirección` | Una dirección codificada bech-32 \(utilizada en la cadena X y la cadena P-Chain\) | `fuji1wycv8n7d2fg9aq6unp23pnj4q0arv03ysya8jw` |
| `fecha` | Una marca de tiempo Unix como entero o una cadena formateada RFC339 | `1599696000``,` 2020-09-10T0:00:00:00Z |
| `cdd` | Una dirección codificada hex \(utilizada en C-Chain\) | `0xB31f6AA3C1e785363F0875A1B74E27b85FD66c7` |
| `chash` | Un hash codificado hex. | `0xe5b9359888317e8552e769ad92b6a2fd01ac8f0f90d8ffa437e50fcb8d970077 0xe5b93598317e077 0xe552e770552e770077 0077 0xe0077 0xe5b92b6a2fd01a2fd01ac8f0f90d8ffb8fffb077 0x0077 0077 0x077 0077 00` |

### Parámetros de la lista

Todos los puntos finales para la inclusión de recursos aceptan los siguientes parámetros:

| Nombre del nombre de la empresa | Tipo de cambio | Descripción | Prejudicial | Max |
| :--- | :--- | :--- | :--- | :--- |
| `límite de la duración de la duración de la duración` | `int` | El número máximo de elementos que se devuelven | `5000` | `5000` |
| `consulta` | `cadena de producción` | Un prefijo de identificación para filtrar elementos por | No hay ninguna otra cosa que no se pueda ni siquiera | No hay ninguna otra cosa que no se pueda ni siquiera |
| `startTime` | `fecha` | Límites a los elementos creados en o después de un tiempo determinado | `0` | Ahora bien, ¿no? |
| `endTime` | `fecha` | Límites a los elementos creados en o antes de un tiempo determinado | Ahora bien, ¿no? | Ahora bien, ¿no? |

## Puntos de referencia disponibles

### Descripción general

La raíz de la API ofrece una visión general de las constantes para la red activa Avalanche que está indexada.

**Parames**

No hay ninguna otra cosa que no se pueda ni siquiera

**Ejemplo de llamada**

```text
curl "http://localhost:8080/v2"
```

**Respuesta de ejemplo**

```javascript
{
  "network_id": 1,
  "chains": {
    "11111111111111111111111111111111LpoYY": {
      "chainID": "11111111111111111111111111111111LpoYY",
      "chainAlias": "p",
      "vm": "pvm",
      "avaxAssetID": "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z",
      "networkID": 1
    },
    "2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM": {
      "chainID": "2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM",
      "chainAlias": "x",
      "vm": "avm",
      "avaxAssetID": "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z",
      "networkID": 1
    }
  }
}
```

### Búsqueda de la información

Encuentra una dirección o una transacción por su ID.

**Parames**

| Nombre del nombre de la empresa | Tipo de cambio | Descripción | Prejudicial | Max |
| :--- | :--- | :--- | :--- | :--- |
| `consulta` | `cadena de producción` | Un prefijo de identificación para filtrar elementos por | No hay ninguna otra cosa que no se pueda ni siquiera | No hay ninguna otra cosa que no se pueda ni siquiera |

**Ejemplo de llamada**

```text
curl "http://localhost:8080/v2/search?query=2jEugPDFN89KXLEXtf5"
```

**Respuesta de ejemplo**

```javascript
{
  "count": 1,
  "results": [
    {
      "type": "transaction",
      "data": {
        "id": "2jEugPDFN89KXLEXtf5oKp5spsJawTht2zP4kKJjkQwwRsDdLX",
        "chainID": "11111111111111111111111111111111LpoYY",
        "type": "add_validator",
        "inputs": [
          {
            "output": {
              "id": "G2Jq9fj6atW1jvJDTXJKHSkMhRWdrsFuafPpR98DK3izZdfqT",
              "transactionID": "11111111111111111111111111111111LpoYY",
              "outputIndex": 14025,
              "assetID": "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z",
              "outputType": 7,
              "amount": "2000000000000",
              "locktime": 0,
              "threshold": 1,
              "addresses": [
                "avax14q43wu6wp8fs745dt6y5s0a02vx57ypq4xc5s3"
              ],
              "timestamp": "2020-09-10T00:00:00Z",
              "redeemingTransactionID": "2jEugPDFN89KXLEXtf5oKp5spsJawTht2zP4kKJjkQwwRsDdLX"
            },
            "credentials": [
              {
                "address": "avax14q43wu6wp8fs745dt6y5s0a02vx57ypq4xc5s3",
                "public_key": "AgSmTeCLGsNhKvSbRIi01jswlr2fV+C/tv3v86Ty4eDQ",
                "signature": "Ms5KquahoTfLGeIl5s6iP5r1fj15lm5MmrMahu8X7L0m5UTyRBRmcXnniURFaJP6X8dCL9f46t8zYawXscdgkQE="
              }
            ]
          }
        ],
        "outputs": [
          {
            "id": "U7M4jk3y7KGWPmSoeS4WhBX6qNHGtkDtQ5dSzYiaw4rmZ92yE",
            "transactionID": "2jEugPDFN89KXLEXtf5oKp5spsJawTht2zP4kKJjkQwwRsDdLX",
            "outputIndex": 0,
            "assetID": "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z",
            "outputType": 7,
            "amount": "2000000000000",
            "locktime": 0,
            "threshold": 1,
            "addresses": [
              "avax14q43wu6wp8fs745dt6y5s0a02vx57ypq4xc5s3"
            ],
            "timestamp": "2020-10-10T07:09:44Z",
            "redeemingTransactionID": ""
          }
        ],
        "memo": "AAAAAA==",
        "inputTotals": {
          "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z": "2000000000000"
        },
        "outputTotals": {
          "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z": "2000000000000"
        },
        "reusedAddressTotals": null,
        "timestamp": "2020-10-10T07:09:44Z",
        "txFee": 0,
        "genesis": false
      },
      "score": 0
    }
  ]
}
```

### Agregado

Calcular los datos agregados de las transacciones durante un plazo de tiempo.

**Parames**

| Nombre del nombre de la empresa | Tipo de cambio | Descripción | Prejudicial | Max |
| :--- | :--- | :--- | :--- | :--- |
| `chainID` | `I.` | Una identificación de cadena para filtrar los resultados. Puede ser suministrado varias veces. | No hay ninguna otra cosa que no se pueda ni siquiera | No hay ninguna otra cosa que no se pueda ni siquiera |
| `activos` | `I.` | Un ID de activos para filtrar los resultados. | No hay ninguna otra cosa que no se pueda ni siquiera | No hay ninguna otra cosa que no se pueda ni siquiera |
| `Intervalo` | `cadena de producción` | Valores 'minuto', 'hora', 'día', 'semana', 'mes', 'año' | No hay ninguna otra cosa que no se pueda ni siquiera | No hay ninguna otra cosa que no se pueda ni siquiera |

**Ejemplo de llamada**

```text
curl "http://localhost:8080/v2/aggregates?startTime=2020-09-21T00:00:00Z&endTime=2020-10-21T00:00:00Z"
```

**Respuesta de ejemplo**

```javascript
{
  "startTime": "2020-09-21T00:00:00Z",
  "endTime": "2020-10-21T00:00:00Z",
  "aggregates": {
    "startTime": "2020-09-21T00:00:00Z",
    "endTime": "2020-10-21T00:00:00Z",
    "transactionVolume": "1652211194850792239",
    "transactionCount": 135966,
    "addressCount": 19567,
    "outputCount": 283221,
    "assetCount": 180
  }
}
```

### TxFee Agregado

AVAX Agregado txfee

**Ejemplo de llamada**

```text
curl "http://localhost:8080/v2/txfeeAggregates?startTime=2020-09-21T00:00:00Z&endTime=2020-10-21T00:00:00Z"
```

**Respuesta de ejemplo**

```javascript
{
  "aggregates": {
    "startTime": "2020-09-21T00:00:00Z",
    "endTime": "2020-10-21T00:00:00Z",
    "txfee": "134818000000"
  },
  "startTime": "2020-09-21T00:00:00Z",
  "endTime": "2020-10-21T00:00:00Z"
}
```

### Dirección

Responde con las cadenas en las que aparece una dirección.

**Parames**

| Nombre del nombre de la empresa | Tipo de cambio | Descripción | Prejudicial | Max |
| :--- | :--- | :--- | :--- | :--- |
| `Dirección de la dirección` | `Dirección de la dirección` | Una dirección para filtrar los resultados. Puede ser suministrado varias veces. | No hay ninguna otra cosa que no se pueda ni siquiera | No hay ninguna otra cosa que no se pueda ni siquiera |

**Ejemplo de llamada**

```text
curl "http://localhost:8080/v2/addressChains?address=X-fujiABC"
```

**Respuesta de ejemplo**

```javascript
{
  "addressChains": {
    "avax14q43wu6wp8fs745dt6y5s0a02vx57ypq4xc5s3": [
      "11111111111111111111111111111111LpoYY"
    ],
    "avax1y8cyrzn2kg4udccs5d625gkac7a99pe452cy5u": [
      "11111111111111111111111111111111LpoYY",
      "2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM"
    ]
  }
}
```

### Lista de las transacciones

Encuentra transacciones que han sido aceptadas.

**Parames**

| Nombre del nombre de la empresa | Tipo de cambio | Descripción | Prejudicial | Max |
| :--- | :--- | :--- | :--- | :--- |
| `chainID` | `I.` | Una identificación de cadena para filtrar los resultados. Puede ser suministrado varias veces. | No hay ninguna otra cosa que no se pueda ni siquiera | No hay ninguna otra cosa que no se pueda ni siquiera |
| `activos` | `I.` | Un ID de activos para filtrar los resultados. | No hay ninguna otra cosa que no se pueda ni siquiera | No hay ninguna otra cosa que no se pueda ni siquiera |
| `Dirección de la dirección` | `Dirección de la dirección` | Una dirección para filtrar los resultados. Puede ser suministrado varias veces. | No hay ninguna otra cosa que no se pueda ni siquiera | No hay ninguna otra cosa que no se pueda ni siquiera |
| `Ordene que la gente no sea` | `cadena de producción` | Un método para ordenar los resultados. Puede ser `timestamp-asc` o `timestamp-desc`. | `timestamp-asc` | N/A |

**Ejemplo de llamada**

```bash
curl "http://localhost:8080/v2/transactions?chainID=11111111111111111111111111111111LpoYY"
```

**Respuesta de ejemplo**

```javascript
{
  "startTime": "0001-01-01T00:00:00Z",
  "endTime": "2020-11-16T04:18:07Z",
  "transactions": [
    {
      "id": "2jEugPDFN89KXLEXtf5oKp5spsJawTht2zP4kKJjkQwwRsDdLX",
      "chainID": "11111111111111111111111111111111LpoYY",
      "type": "add_validator",
      "inputs": [
        {
          "output": {
            "id": "G2Jq9fj6atW1jvJDTXJKHSkMhRWdrsFuafPpR98DK3izZdfqT",
            "transactionID": "11111111111111111111111111111111LpoYY",
            "outputIndex": 14025,
            "assetID": "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z",
            "outputType": 7,
            "amount": "2000000000000",
            "locktime": 0,
            "threshold": 1,
            "addresses": [
              "avax14q43wu6wp8fs745dt6y5s0a02vx57ypq4xc5s3"
            ],
            "timestamp": "2020-09-10T00:00:00Z",
            "redeemingTransactionID": "2jEugPDFN89KXLEXtf5oKp5spsJawTht2zP4kKJjkQwwRsDdLX"
          },
          "credentials": [
            {
              "address": "avax14q43wu6wp8fs745dt6y5s0a02vx57ypq4xc5s3",
              "public_key": "AgSmTeCLGsNhKvSbRIi01jswlr2fV+C/tv3v86Ty4eDQ",
              "signature": "Ms5KquahoTfLGeIl5s6iP5r1fj15lm5MmrMahu8X7L0m5UTyRBRmcXnniURFaJP6X8dCL9f46t8zYawXscdgkQE="
            }
          ]
        }
      ],
      "outputs": [
        {
          "id": "U7M4jk3y7KGWPmSoeS4WhBX6qNHGtkDtQ5dSzYiaw4rmZ92yE",
          "transactionID": "2jEugPDFN89KXLEXtf5oKp5spsJawTht2zP4kKJjkQwwRsDdLX",
          "outputIndex": 0,
          "assetID": "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z",
          "outputType": 7,
          "amount": "2000000000000",
          "locktime": 0,
          "threshold": 1,
          "addresses": [
            "avax14q43wu6wp8fs745dt6y5s0a02vx57ypq4xc5s3"
          ],
          "timestamp": "2020-10-10T07:09:44Z",
          "redeemingTransactionID": ""
        }
      ],
      "memo": "AAAAAA==",
      "inputTotals": {
        "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z": "2000000000000"
      },
      "outputTotals": {
        "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z": "2000000000000"
      },
      "reusedAddressTotals": null,
      "timestamp": "2020-10-10T07:09:44Z",
      "txFee": 0,
      "genesis": false
    }
  ]
}
```

### Obtener la Transacción

Encuentra una sola transacción por su ID.

**Ejemplo de llamada**

```text
curl "http://localhost:8080/v2/transactions/2jEugPDFN89KXLEXtf5oKp5spsJawTht2zP4kKJjkQwwRsDdLX"
```

**Respuesta de ejemplo**

```javascript
{
  "id": "2jEugPDFN89KXLEXtf5oKp5spsJawTht2zP4kKJjkQwwRsDdLX",
  "chainID": "11111111111111111111111111111111LpoYY",
  "type": "add_validator",
  "inputs": [
    {
      "output": {
        "id": "G2Jq9fj6atW1jvJDTXJKHSkMhRWdrsFuafPpR98DK3izZdfqT",
        "transactionID": "11111111111111111111111111111111LpoYY",
        "outputIndex": 14025,
        "assetID": "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z",
        "outputType": 7,
        "amount": "2000000000000",
        "locktime": 0,
        "threshold": 1,
        "addresses": [
          "avax14q43wu6wp8fs745dt6y5s0a02vx57ypq4xc5s3"
        ],
        "timestamp": "2020-09-10T00:00:00Z",
        "redeemingTransactionID": "2jEugPDFN89KXLEXtf5oKp5spsJawTht2zP4kKJjkQwwRsDdLX"
      },
      "credentials": [
        {
          "address": "avax14q43wu6wp8fs745dt6y5s0a02vx57ypq4xc5s3",
          "public_key": "AgSmTeCLGsNhKvSbRIi01jswlr2fV+C/tv3v86Ty4eDQ",
          "signature": "Ms5KquahoTfLGeIl5s6iP5r1fj15lm5MmrMahu8X7L0m5UTyRBRmcXnniURFaJP6X8dCL9f46t8zYawXscdgkQE="
        }
      ]
    }
  ],
  "outputs": [
    {
      "id": "U7M4jk3y7KGWPmSoeS4WhBX6qNHGtkDtQ5dSzYiaw4rmZ92yE",
      "transactionID": "2jEugPDFN89KXLEXtf5oKp5spsJawTht2zP4kKJjkQwwRsDdLX",
      "outputIndex": 0,
      "assetID": "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z",
      "outputType": 7,
      "amount": "2000000000000",
      "locktime": 0,
      "threshold": 1,
      "addresses": [
        "avax14q43wu6wp8fs745dt6y5s0a02vx57ypq4xc5s3"
      ],
      "timestamp": "2020-10-10T07:09:44Z",
      "redeemingTransactionID": ""
    }
  ],
  "memo": "AAAAAA==",
  "inputTotals": {
    "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z": "2000000000000"
  },
  "outputTotals": {
    "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z": "2000000000000"
  },
  "reusedAddressTotals": null,
  "timestamp": "2020-10-10T07:09:44Z",
  "txFee": 0,
  "genesis": false
}
```

### Direcciones de la lista

Encuentra direcciones que se hayan referido en transacciones aceptadas.

**Parames**

| Nombre del nombre de la empresa | Tipo de cambio | Descripción | Prejudicial | Max |
| :--- | :--- | :--- | :--- | :--- |
| `chainID` | `I.` | Una identificación de cadena para filtrar los resultados. Puede ser suministrado varias veces. | No hay ninguna otra cosa que no se pueda ni siquiera | No hay ninguna otra cosa que no se pueda ni siquiera |
| `Dirección de la dirección` | `Dirección de la dirección` | Una dirección para filtrar los resultados. Puede ser suministrado varias veces. | No hay ninguna otra cosa que no se pueda ni siquiera | No hay ninguna otra cosa que no se pueda ni siquiera |

**Ejemplo de llamada**

```text
curl "http://localhost:8080/v2/addresses?address=X-avax1y8cyrzn2kg4udccs5d625gkac7a99pe452cy5u"
```

**Respuesta de ejemplo**

```javascript
{
  "addresses": [
    {
      "address": "avax1y8cyrzn2kg4udccs5d625gkac7a99pe452cy5u",
      "publicKey": null,
      "assets": {
        "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z": {
          "id": "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z",
          "transactionCount": 2,
          "utxoCount": 17,
          "balance": "39561999999996",
          "totalReceived": "39561999999996",
          "totalSent": "0"
        }
      }
    }
  ]
}
```

### Obtener dirección

Encuentra una sola dirección por su ID.

**Ejemplo de llamada**

```text
curl "http://localhost:8080/v2/addresses/avax1y8cyrzn2kg4udccs5d625gkac7a99pe452cy5u"
```

**Respuesta de ejemplo**

```javascript
{
  "address": "avax1y8cyrzn2kg4udccs5d625gkac7a99pe452cy5u",
  "publicKey": null,
  "assets": {
    "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z": {
      "id": "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z",
      "transactionCount": 2,
      "utxoCount": 17,
      "balance": "39561999999996",
      "totalReceived": "39561999999996",
      "totalSent": "0"
    }
  }
}
```

### Lista de activos

Encuentra activos que se han creado en la cadena X.

**Ejemplo de llamada**

```text
curl "http://localhost:8080/v2/assets"
```

**Respuesta de ejemplo**

```javascript
{
  "assets": [
    {
      "id": "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z",
      "chainID": "2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM",
      "name": "Avalanche",
      "symbol": "AVAX",
      "alias": "AVAX",
      "currentSupply": "24509771588234718",
      "timestamp": "2020-09-10T00:00:00Z",
      "denomination": 9,
      "variableCap": 0,
      "nft": 1
    }
  ]
}
```

### Obtén activos

Encuentra un solo activo por su ID.

**Ejemplo de llamada**

```text
curl "http://localhost:8080/v2/assets/FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z"
```

**Respuesta de ejemplo**

```javascript
{
  "id": "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z",
  "chainID": "2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM",
  "name": "Avalanche",
  "symbol": "AVAX",
  "alias": "AVAX",
  "currentSupply": "24509771588234718",
  "timestamp": "2020-09-10T00:00:00Z",
  "denomination": 9,
  "variableCap": 0,
  "nft": 1
}
```

### Productos de la lista

Encuentra productos que hayan sido creados por una transacción aceptada.

**Parames**

| Nombre del nombre de la empresa | Tipo de cambio | Descripción | Prejudicial | Max |
| :--- | :--- | :--- | :--- | :--- |
| `chainID` | `I.` | Una identificación de cadena para filtrar los resultados. Puede ser suministrado varias veces. | No hay ninguna otra cosa que no se pueda ni siquiera | No hay ninguna otra cosa que no se pueda ni siquiera |
| `Dirección de la dirección` | `Dirección de la dirección` | Una dirección para filtrar los resultados. Puede ser suministrado varias veces. | No hay ninguna otra cosa que no se pueda ni siquiera | No hay ninguna otra cosa que no se pueda ni siquiera |
| `gastado en el gasto.` | `bol` | Si se establece, los resultados se filtrarán por si se gastan \(true\) o no se gastan \(fals\) | No hay ninguna otra cosa que no se pueda ni siquiera | N/A |

**Ejemplo de llamada**

```text
curl "http://localhost:8080/v2/outputs?address=X-avax1y8cyrzn2kg4udccs5d625gkac7a99pe452cy5u&spent=false"
```

**Respuesta de ejemplo**

```javascript
{
  "outputs": [
    {
      "id": "114RMPhYM7do7cDX7KWSqFeLkbUXFrLKcqPL4GMdjTvemPzvc",
      "transactionID": "dhU8aMRrtMWvBWSh41aTxUbwArYootNUBcL3N3UJXVPL8H9ip",
      "outputIndex": 4,
      "assetID": "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z",
      "outputType": 7,
      "amount": "2327176470588",
      "locktime": 0,
      "threshold": 1,
      "addresses": [
        "avax1y8cyrzn2kg4udccs5d625gkac7a99pe452cy5u"
      ],
      "timestamp": "2020-09-10T00:00:00Z",
      "redeemingTransactionID": ""
    }
  ]
}
```

### Obtener salida

Encuentra una sola salida por su ID.

**Ejemplo de llamada**

```text
curl "http://localhost:8080/v2/outputs/114RMPhYM7do7cDX7KWSqFeLkbUXFrLKcqPL4GMdjTvemPzvc"
```

**Respuesta de ejemplo**

```javascript
{
  "id": "114RMPhYM7do7cDX7KWSqFeLkbUXFrLKcqPL4GMdjTvemPzvc",
  "transactionID": "dhU8aMRrtMWvBWSh41aTxUbwArYootNUBcL3N3UJXVPL8H9ip",
  "outputIndex": 4,
  "assetID": "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z",
  "outputType": 7,
  "amount": "2327176470588",
  "locktime": 0,
  "threshold": 1,
  "addresses": [
    "avax1y8cyrzn2kg4udccs5d625gkac7a99pe452cy5u"
  ],
  "timestamp": "2020-09-10T00:00:00Z",
  "redeemingTransactionID": ""
}
```

### Consigue un bloque de cadena C

Encuentra un bloque único por su número.

**Ejemplo de llamada**

```text
curl "http://localhost:8080/v2/ctxdata/10"
```

**Respuesta de ejemplo**

```javascript
{
    "blockNumber": "10",
    "header": {
        "parentHash": "0xbd9c3e357b29f403a2b5ba455960e17f595f82eb84e5e9a1c7f7bdaf4784d0e6",
        "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
        "miner": "0x0100000000000000000000000000000000000000",
        "stateRoot": "0x22e2b78756f092431f28ccc906cacc1a1c58d9b341b87fa86ba3af4141517f3d",
        "transactionsRoot": "0x237cc8fb9965f0f7477bd6c06583aecb0b17af8cc8915d6990894c00762f0e4a",
        "receiptsRoot": "0x056b23fbba480696b65fe5a59b8f2148a1299103c4f57df839233af2cf4ca2d2",
        "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "difficulty": "0x1",
        "number": "0xa",
        "gasLimit": "0x5e70b15",
        "gasUsed": "0x5208",
        "timestamp": "0x5f6dfb2a",
        "extraData": "0xd683010916846765746886676f312e3133856c696e75786573c7769a0f720e36aef6bd06a29f56131b901d1e57392d2663e67fce32e7c4",
        "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "nonce": "0x0000000000000000",
        "extDataHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "hash": "0x0af6d14cf36b0d52e0b49747460859804fcd7a6f8518fe374fba05c96c27d35a"
    },
    "uncles": null,
    "txs": null,
    "version": 0,
    "received_at": "0001-01-01T00:00:00Z",
    "blockExtraData": "",
    "transactions": [
        {
            "nonce": "0x2",
            "gasPrice": "0x6d6e2edc00",
            "gas": "0x5208",
            "to": "0x0c498d075ae2236cfd13800abc61caf04b8fad63",
            "value": "0x38d7ea4c68000",
            "input": "0x",
            "v": "0x150f8",
            "r": "0x30cb390fdc1ef12b2f6e2b1bc604d0ddc6996fe601b351908f762ec589ce53b6",
            "s": "0x5529ac942dd2e5e970475cd6392291271f02ad0d5c48fdff68daea856c752e84",
            "hash": "0xe91eeb7aca41cb41b6d32ffd841eee3a297ab9318e7467961ed43b5e0ee3e58e"
        }
    ],
    "logs": [
        {
            "address": "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7",
            "topics": [
                "0x7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65",
                "0x000000000000000000000000e54ca86531e17ef3616d22ca28b0d458b6c89106"
            ],
            "data": "0x000000000000000000000000000000000000000000000000128fc29c60e5e255",
            "blockNumber": "0x12bf12",
            "transactionHash": "0xf5d3dfbdf9722db34907b65b22dca5715bb2eac4f02f4b4992ffe2c06f3a88d2",
            "transactionIndex": "0x1",
            "blockHash": "0xaf0f4d2c60544fe24d0393ec0160f31ba4bad8532af64ad37960719e34bc6c4c",
            "logIndex": "0x9",
            "removed": false
        }
    ]
}
```

### Lista de las transacciones de cadena C

Encuentra transacciones aceptadas de cadena C.

**Parames**

| Nombre del nombre de la empresa | Tipo de cambio | Descripción | Prejudicial | Max |
| :--- | :--- | :--- | :--- | :--- |
| `aDirección` | `cdd` | Dirección de la dirección | No hay ninguna otra cosa que no se pueda ni siquiera | No hay ninguna otra cosa que no se pueda ni siquiera |
| `fromAddress` | `cdd` | Dirección de la dirección | No hay ninguna otra cosa que no se pueda ni siquiera | No hay ninguna otra cosa que no se pueda ni siquiera |
| `Dirección de la dirección` | `cdd` | dirección \(a o desde \) | No hay ninguna otra cosa que no se pueda ni siquiera | No hay ninguna otra cosa que no se pueda ni siquiera |
| `hash` | `chash` | hash de transacción | No hay ninguna otra cosa que no se pueda ni siquiera | No hay ninguna otra cosa que no se pueda ni siquiera |
| `blockStart` | `Número de números` | Número de bloque de inicio incluido | No hay ninguna otra cosa que no se pueda ni siquiera | N/A |
| `blockEnd` | `Número de números` | Número de bloque de terminación exclusivo | No hay ninguna otra cosa que no se pueda ni siquiera | N/A |

**Ejemplo de llamada**

```text
curl "http://localhost:8080/v2/ctransactions?toAddress=0x34ec164fd085ae43906eab6dffd1eae0a0855a2a&blockStart=797380&blockEnd=797381"
```

**Respuesta de ejemplo**

```javascript
{
    "Transactions": [
        {
            "block": "797380",
            "hash": "0x00000217bc17e7e3187efae9248523f4fe2bc90e029e3ba13ddd8ff69607c705",
            "createdAt": "2021-03-28T07:42:30.471607Z",
            "nonce": 0,
            "gasPrice": "225000000000",
            "gasLimit": 21000,
            "blockGasUsed": 63000,
            "blockGasLimit": 8000000,
            "blockNonce": 0,
            "blockHash": "0x51b403a5c193d922ecb0b027fb036d37167360dbc1e45ec8958393b290c5e2c0",
            "recipient": "0x34ec164fd085ae43906eab6dffd1eae0a0855a2a",
            "value": "597980000000000000",
            "toAddr": "0x34ec164fd085ae43906eab6dffd1eae0a0855a2a",
            "fromAddr": "0xb7b01ad34bc162a5d46d68aefebf713a8c084531",
            "v": "86263",
            "r": "23429721050439544961261311044009191980315981699252178414904071291824124200150",
            "s": "93404286468504758513269147057107932118692478661841229003612084917267902194944",
            "traces": [
                {
                    "callType": "call",
                    "to": "0x34ec164fd085ae43906eab6dffd1eae0a0855a2a",
                    "from": "0xb7b01ad34bc162a5d46d68aefebf713a8c084531",
                    "type": "call",
                    "gasUsed": "0",
                    "gas": "0",
                    "value": "597980000000000000"
                }
            ]
        }
    ],
    "startTime": "0001-01-01T00:00:00Z",
    "endTime": "2021-04-23T16:24:08Z"
}
```

### Consigue una transacción de cadena C cruda

Obtén una transacción de C-Chain aceptada por su ID.

**Ejemplo de llamada**

```text
curl "http://localhost:8080/v2/rawtransaction/pxiBJkwnaKhaJdYkkfAVRZXrJj47jJF3QAvsasbYF2Rfweoog"
```

**Respuesta de ejemplo**

```javascript
{
    "tx": "0x00000000000000000001ed5f38341..."
}
```

### API de legado

La versión 1 de la API fue construida para soportar solo la cadena X, y no utilizó un prefijo de versión \(`/v1`\). Está disponible en el camino `/x` de la raíz, que es el punto final de vista general para solo la cadena X:

**Ejemplo de llamada**

```text
curl "http://localhost:8080/x"
```

**Respuesta de ejemplo**

```javascript
{
  "networkID": 1,
  "vm": "avm",
  "chainAlias": "x",
  "chainID": "2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM",
  "avaxAssetID": "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z"
}
```

La API legada admite los mismos puntos de extremo y parámetros que la versión 2, excepto el parámetro chainID para todos los valores predeterminados de endpoints al ID de cadena X.

