---
descripción: "Esta API permite a los clientes interactuar con Ortelius, el indexador de Avalanche".
---

# API de Ortelius

## API de Ortelius

### Formato

Esta API usa peticiones GET HTTP usando URL query parameters and returns JSON data.

### Versioning

Starting with version 2, the API paths will be prefixed by a version tag, e.g. `http://localhost:8080/v2`.

The current version of the API is version 2. The [Legacy API](ortelius.md#legacy-api) documentation has information about using the v1 API.

### Data Types

In addition to integers, strings, and booleans, the following data types are used throughout the API:

| Name | Description | Examples |
| :--- | :--- | :--- |
| `id` | A CB58 encoded object identifier, such as a chain, transaction, or asset ID | `2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM` |
| `address` | A bech-32 encoded address | `fuji1wycv8n7d2fg9aq6unp23pnj4q0arv03ysya8jw` |
| `datetime` | A Unix timestamp as an integer or an RFC3339 formatted string | `1599696000`, `2020-09-10T00:00:00Z` |

### List Parameters

All endpoints for listing resources accept the following parameters:

| Name | Type | Description | Default | Max |
| :--- | :--- | :--- | :--- | :--- |
| `limit` | `int` | The maximum number of items to return | `500` | `500` |
| `offset` | `int` | The number of items to skip | `0` | None |
| `query` | `string` | An ID prefix to filter items by | None | None |
| `startTime` | `datetime` | Limits to items created on or after a given time | `0` | Now |
| `endTime` | `datetime` | Limits to items created on or before a given time | Now | Now |

### Available Endpoints

#### Overview

The root of the API gives an overview of the constants for the active Avalanche network being indexed.

**Params**

None

**Example Call**

```text
curl "http://localhost:8080/v2"
```

**Example Response**

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

#### Search

Find an address or a transaction by its ID.

**Params**

| Name | Type | Description | Default | Max |
| :--- | :--- | :--- | :--- | :--- |
| `query` | `string` | An ID prefix to filter items by | None | None |

**Example Call**

```text
curl "http://localhost:8080/v2/search?query=2jEugPDFN89KXLEXtf5"
```

**Example Response**

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

#### Aggregate

Calculate aggregate transaction data over a time frame.

**Params**

| Name | Type | Description | Default | Max |
| :--- | :--- | :--- | :--- | :--- |
| `chainID` | `id` | A chain ID to filter results by. May be supplied multiple times. | None | None |
| `assetID` | `id` | An asset ID to filter results by. | None | None |

**Example Call**

```text
curl "http://localhost:8080/v2/aggregates?startTime=2020-09-21T00:00:00Z&endTime=2020-10-21T00:00:00Z"
```

**Example Response**

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

#### TxFee Aggregate

AVAX Aggregate txfee

**Example Call**

```text
curl "http://localhost:8080/v2/txfeeAggregates?startTime=2020-09-21T00:00:00Z&endTime=2020-10-21T00:00:00Z"
```

**Example Response**

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

#### Address Chain

Responds with the chains an address appears on.

**Params**

| Name | Type | Description | Default | Max |
| :--- | :--- | :--- | :--- | :--- |
| `address` | `address` | A address to filter results by. May be supplied multiple times. | None | None |

**Example Call**

```text
curl "http://localhost:8080/v2/addressChains?address=X-fujiABC"
```

**Example Response**

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

#### List Transactions

Find transactions confirmed transactions from the network.

**Params**

| Name | Type | Description | Default | Max |
| :--- | :--- | :--- | :--- | :--- |
| `chainID` | `id` | A chain ID to filter results by. May be supplied multiple times. | None | None |
| `assetID` | `id` | An asset ID to filter results by. | None | None |
| `address` | `address` | An address to filter results by. May be supplied multiple times. | None | None |
| `disableGenesis` | `bool` | When true, the data for the Genesis vertex is not returned. | true | N/A |
| `sort` | `string` | A method to sort results by. May be `timestamp-asc` or `timestamp-desc`. | `timestamp-asc` | N/A |

**Example Call**

```bash
curl "http://localhost:8080/v2/transactions?limit=1&chainID=11111111111111111111111111111111LpoYY&offset=100"
```

**Example Response**

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

#### Get Transaction

Find a single transaction by its ID.

**Example Call**

```text
curl "http://localhost:8080/v2/transactions/2jEugPDFN89KXLEXtf5oKp5spsJawTht2zP4kKJjkQwwRsDdLX"
```

**Example Response**

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

#### List Addresses

Find addresses that have been involved in confirmed transactions.

**Params**

| Name | Type | Description | Default | Max |
| :--- | :--- | :--- | :--- | :--- |
| `chainID` | `id` | A chain ID to filter results by. May be supplied multiple times. | None | None |
| `address` | `address` | An address to filter results by. May be supplied multiple times. | None | None |

**Example Call**

```text
curl "http://localhost:8080/v2/addresses?limit=1"
```

**Example Response**

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

#### Get Address

Find a single address by its ID.

**Example Call**

```text
curl "http://localhost:8080/v2/addresses/avax1y8cyrzn2kg4udccs5d625gkac7a99pe452cy5u"
```

**Example Response**

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

#### List Assets

Find assets that have been created on the X-chain.

**Params**

| Name | Type | Description | Default | Max |
| :--- | :--- | :--- | :--- | :--- |
| `enableAggregate` | string | Values "minute", "hour", "day", "week", "month", or "year" when provided, aggregated data about the asset will be included. | N/A | N/A |

**Example Call**

```text
curl "http://localhost:8080/v2/assets?limit=1&enableAggregate=minute"
```

**Example Response**

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
      "aggregates": {
        "day": {
          "startTime": "2020-11-15T04:47:00Z",
          "endTime": "2020-11-16T04:47:00Z",
          "transactionVolume": "0",
          "transactionCount": 0,
          "addressCount": 0,
          "outputCount": 0,
          "assetCount": 0
        },
        "hour": {
          "startTime": "2020-11-16T03:47:00Z",
          "endTime": "2020-11-16T04:47:00Z",
          "transactionVolume": "0",
          "transactionCount": 0,
          "addressCount": 0,
          "outputCount": 0,
          "assetCount": 0
        },
        "minute": {
          "startTime": "2020-11-16T04:46:00Z",
          "endTime": "2020-11-16T04:47:00Z",
          "transactionVolume": "0",
          "transactionCount": 0,
          "addressCount": 0,
          "outputCount": 0,
          "assetCount": 0
        },
        "month": {
          "startTime": "2020-10-17T04:47:00Z",
          "endTime": "2020-11-16T04:47:00Z",
          "transactionVolume": "0",
          "transactionCount": 0,
          "addressCount": 0,
          "outputCount": 0,
          "assetCount": 0
        },
        "week": {
          "startTime": "2020-11-09T04:47:00Z",
          "endTime": "2020-11-16T04:47:00Z",
          "transactionVolume": "0",
          "transactionCount": 0,
          "addressCount": 0,
          "outputCount": 0,
          "assetCount": 0
        },
        "year": {
          "startTime": "2019-11-17T04:47:00Z",
          "endTime": "2020-11-16T04:47:00Z",
          "transactionVolume": "6637657099999996",
          "transactionCount": 1,
          "addressCount": 159,
          "outputCount": 1,
          "assetCount": 817
        }
      }
    }
  ]
}
```

#### Get Asset

Find a single asset by its ID.

**Example Call**

```text
curl "http://localhost:8080/v2/assets/FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z?enableAggregate=true"
```

**Example Response**

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
  "aggregates": {
    "day": {
      "startTime": "2020-11-15T04:50:00Z",
      "endTime": "2020-11-16T04:50:00Z",
      "transactionVolume": "0",
      "transactionCount": 0,
      "addressCount": 0,
      "outputCount": 0,
      "assetCount": 0
    },
    "hour": {
      "startTime": "2020-11-16T03:50:00Z",
      "endTime": "2020-11-16T04:50:00Z",
      "transactionVolume": "0",
      "transactionCount": 0,
      "addressCount": 0,
      "outputCount": 0,
      "assetCount": 0
    },
    "minute": {
      "startTime": "2020-11-16T04:49:00Z",
      "endTime": "2020-11-16T04:50:00Z",
      "transactionVolume": "0",
      "transactionCount": 0,
      "addressCount": 0,
      "outputCount": 0,
      "assetCount": 0
    },
    "month": {
      "startTime": "2020-10-17T04:50:00Z",
      "endTime": "2020-11-16T04:50:00Z",
      "transactionVolume": "0",
      "transactionCount": 0,
      "addressCount": 0,
      "outputCount": 0,
      "assetCount": 0
    },
    "week": {
      "startTime": "2020-11-09T04:50:00Z",
      "endTime": "2020-11-16T04:50:00Z",
      "transactionVolume": "0",
      "transactionCount": 0,
      "addressCount": 0,
      "outputCount": 0,
      "assetCount": 0
    },
    "year": {
      "startTime": "2019-11-17T04:50:00Z",
      "endTime": "2020-11-16T04:50:00Z",
      "transactionVolume": "6637657099999996",
      "transactionCount": 1,
      "addressCount": 159,
      "outputCount": 1,
      "assetCount": 817
    }
  }
}
```

#### List Outputs

Find outputs that have been created by a transaction confirmed on the network.

**Params**

| Name | Type | Description | Default | Max |
| :--- | :--- | :--- | :--- | :--- |
| `chainID` | `id` | A chain ID to filter results by. May be supplied multiple times. | None | None |
| `address` | `address` | An address to filter results by. May be supplied multiple times. | None | None |
| `spent` | `bool` | If set, results will be filtered by whether they're spent \(true\) or unspent \(false\) | None | N/A |

**Example Call**

```text
curl "http://localhost:8080/v2/outputs?limit=1&spent=false"
```

**Example Response**

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

#### Get Output

Find a single output by its ID.

**Example Call**

```text
curl "http://localhost:8080/v2/outputs/114RMPhYM7do7cDX7KWSqFeLkbUXFrLKcqPL4GMdjTvemPzvc"
```

**Example Response**

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

### Legacy API

Version 1 of the API was built to support only the X-chain, and it did not use a version prefix \(`/v1`\). It is available at the path `/x` off of the root, which is the Overview endpoint for only the X-chain:

**Example Call**

```text
curl "http://localhost:8080/x"
```

**Example Response**

```javascript
{
  "networkID": 1,
  "vm": "avm",
  "chainAlias": "x",
  "chainID": "2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM",
  "avaxAssetID": "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z"
}
```

The legacy API supports the same endpoints and parameters as version 2, except the chainID parameter for all endpoints defaults to the X-chain ID.

## Ortelius Configuration

Configuration using a JSON file for Ortelius applications. The configuration defines which network and blockchains Ortelius should index, as well as connection information for the required backing services.

## Example

This configuration is the one used by the standalone Docker Compose setup and illustrates the various available settings. `kafka`, `mysql`, and `redis` are DNS names that resolve to relevant service.

```javascript
{
  "networkID": 5,
  "logDirectory": "/var/log/ortelius",
  "listenAddr": "localhost:8080",
  "chains": {
    "11111111111111111111111111111111LpoYY": {
      "id": "11111111111111111111111111111111LpoYY",
      "alias": "P",
      "vmType": "pvm"
    },
    "2JVSBoinj9C2J33VntvzYtVJNZdN2NKiwwKjcumHUWEb5DbBrm": {
      "id": "2JVSBoinj9C2J33VntvzYtVJNZdN2NKiwwKjcumHUWEb5DbBrm",
      "alias": "F",
      "vmType": "avm"
    }
  },
  "stream": {
    "kafka": {
      "brokers": [
        "kafka:9092"
      ]
    },
    "producer": {
        "ipcRoot": "/tmp"
    },
    "consumer": {
        "groupName": "indexer"
    }
  },
  "services": {
    "redis": {
      "addr": "redis:6379"
    },
    "db": {
      "dsn": "root:password@tcp(mysql:3306)/ortelius",
      "driver": "mysql"
    }
  }
}
```

<!--stackedit_data:
eyJoaXN0b3J5IjpbNDEzMzg3NjMwXX0=
-->