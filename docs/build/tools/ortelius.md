---
description: 'This API allows clients to interact with Ortelius, the Avalanche indexer.'
---

# Ortelius API

## Ortelius API

**This API has been deprecated. See [here](deprecating-ortelius.md) on how to migrate away.**

### Format

This API uses GET HTTP requests using URL query parameters and returns JSON data.

### Versioning

Starting with version 2, the API paths will be prefixed by a version tag, e.g. `http://localhost:8080/v2`.

The current version of the API is version 2. The [Legacy API](ortelius.md#legacy-api) documentation has information about using the v1 API.

### Data Types

In addition to integers, strings, and booleans, the following data types are used throughout the API:

| Name | Description | Examples |
| :--- | :--- | :--- |
| `id` | A CB58 encoded object identifier, such as a chain, transaction, or asset ID | `2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM` |
| `address` | A bech-32 encoded address (used on the X-Chain and P-Chain) | `fuji1wycv8n7d2fg9aq6unp23pnj4q0arv03ysya8jw` |
| `datetime` | A Unix timestamp as an integer or an RFC3339 formatted string | `1599696000`, `2020-09-10T00:00:00Z` |
| `caddress` | A hex encoded address (used on the C-Chain) | `0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7` |
| `chash` | A hex encoded hash | `0xe5b935988317e8552e769ad92b6a2fd01ac8f0f90d8ffa4377e50fcb8d970077` |

### List Parameters

All endpoints for listing resources accept the following parameters:

| Name | Type | Description | Default | Max |
| :--- | :--- | :--- | :--- | :--- |
| `limit` | `int` | The maximum number of items to return | `5000` | `5000` |
| `query` | `string` | An ID prefix to filter items by | None | None |
| `startTime` | `datetime` | Limits to items created on or after a given time | `0` | Now |
| `endTime` | `datetime` | Limits to items created on or before a given time | Now | Now |

## Available Endpoints

### Overview

The root of the API gives an overview of the constants for the active Avalanche network being indexed.

**Params**

None

**Example Call**

```text
curl "http://localhost:8080/v2"
```

**Example Response**

```json
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

### Search

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

```json
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

### Aggregate

Calculate aggregate transaction data over a time frame.

**Params**

| Name | Type | Description | Default | Max |
| :--- | :--- | :--- | :--- | :--- |
| `chainID` | `id` | A chain ID to filter results by. May be supplied multiple times. | None | None |
| `assetID` | `id` | An asset ID to filter results by. | None | None |
| `intervalSize` | `string` | Values 'minute', 'hour', 'day', 'week', 'month', 'year' | None | None |

**Example Call**

```text
curl "http://localhost:8080/v2/aggregates?startTime=2020-09-21T00:00:00Z&endTime=2020-10-21T00:00:00Z"
```

**Example Response**

```json
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

### TxFee Aggregate

AVAX Aggregate txfee

**Example Call**

```text
curl "http://localhost:8080/v2/txfeeAggregates?startTime=2020-09-21T00:00:00Z&endTime=2020-10-21T00:00:00Z"
```

**Example Response**

```json
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

### Address Chain

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

```json
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

### List Transactions

Find transactions that have been accepted.

**Params**

| Name | Type | Description | Default | Max |
| :--- | :--- | :--- | :--- | :--- |
| `chainID` | `id` | A chain ID to filter results by. May be supplied multiple times. | None | None |
| `assetID` | `id` | An asset ID to filter results by. | None | None |
| `address` | `address` | An address to filter results by. May be supplied multiple times. | None | None |
| `sort` | `string` | A method to sort results by. May be `timestamp-asc` or `timestamp-desc`. | `timestamp-asc` | N/A |

**Example Call**

```bash
curl "http://localhost:8080/v2/transactions?chainID=11111111111111111111111111111111LpoYY"
```

**Example Response**

```json
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

### Get Transaction

Find a single transaction by its ID.

**Example Call**

```text
curl "http://localhost:8080/v2/transactions/2jEugPDFN89KXLEXtf5oKp5spsJawTht2zP4kKJjkQwwRsDdLX"
```

**Example Response**

```json
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

### List Addresses

Find addresses that have been referenced in accepted transactions.

**Params**

| Name | Type | Description | Default | Max |
| :--- | :--- | :--- | :--- | :--- |
| `chainID` | `id` | A chain ID to filter results by. May be supplied multiple times. | None | None |
| `address` | `address` | An address to filter results by. May be supplied multiple times. | None | None |

**Example Call**

```text
curl "http://localhost:8080/v2/addresses?address=X-avax1y8cyrzn2kg4udccs5d625gkac7a99pe452cy5u"
```

**Example Response**

```json
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

### Get Address

Find a single address by its ID.

**Example Call**

```text
curl "http://localhost:8080/v2/addresses/avax1y8cyrzn2kg4udccs5d625gkac7a99pe452cy5u"
```

**Example Response**

```json
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

### List Assets

Find assets that have been created on the X-chain.

**Example Call**

```text
curl "http://localhost:8080/v2/assets"
```

**Example Response**

```json
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

### Get Asset

Find a single asset by its ID.

**Example Call**

```text
curl "http://localhost:8080/v2/assets/FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z"
```

**Example Response**

```json
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

### List Outputs

Find outputs that have been created by an accepted transaction.

**Params**

| Name | Type | Description | Default | Max |
| :--- | :--- | :--- | :--- | :--- |
| `chainID` | `id` | A chain ID to filter results by. May be supplied multiple times. | None | None |
| `address` | `address` | An address to filter results by. May be supplied multiple times. | None | None |
| `spent` | `bool` | If set, results will be filtered by whether they're spent (true) or unspent (false) | None | N/A |

**Example Call**

```text
curl "http://localhost:8080/v2/outputs?address=X-avax1y8cyrzn2kg4udccs5d625gkac7a99pe452cy5u&spent=false"
```

**Example Response**

```json
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

### Get Output

Find a single output by its ID.

**Example Call**

```text
curl "http://localhost:8080/v2/outputs/114RMPhYM7do7cDX7KWSqFeLkbUXFrLKcqPL4GMdjTvemPzvc"
```

**Example Response**

```json
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

### Get a C-Chain Block

Find a single block by its number.

**Example Call**

```text
curl "http://localhost:8080/v2/ctxdata/10"
```

**Example Response**

```json
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

### List C-Chain Transactions

Find accepted C-Chain transactions.

**Params**

| Name | Type | Description | Default | Max |
| :--- | :--- | :--- | :--- | :--- |
| `toAddress` | `caddress` | address | None | None |
| `fromAddress` | `caddress` | address | None | None |
| `address` | `caddress` | address (to or from) | None | None |
| `hash` | `chash` | transaction hash | None | None |
| `blockStart` | `number` | Starting block number inclusive | None | N/A |
| `blockEnd` | `number` | Ending block number exclusive | None | N/A |

**Example Call**

```text
curl "http://localhost:8080/v2/ctransactions?toAddress=0x34ec164fd085ae43906eab6dffd1eae0a0855a2a&blockStart=797380&blockEnd=797381"
```

**Example Response**

```json
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

### Get a Raw C-Chain Transaction

Get an accepted C-Chain transaction by its ID.

**Example Call**

```text
curl "http://localhost:8080/v2/rawtransaction/pxiBJkwnaKhaJdYkkfAVRZXrJj47jJF3QAvsasbYF2Rfweoog"
```

**Example Response**

```json
{
    "tx": "0x00000000000000000001ed5f38341..."
}
```

### Legacy API

Version 1 of the API was built to support only the X-chain, and it did not use a version prefix (`/v1`). It is available at the path `/x` off of the root, which is the Overview endpoint for only the X-chain:

**Example Call**

```text
curl "http://localhost:8080/x"
```

**Example Response**

```json
{
  "networkID": 1,
  "vm": "avm",
  "chainAlias": "x",
  "chainID": "2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM",
  "avaxAssetID": "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z"
}
```

The legacy API supports the same endpoints and parameters as version 2, except the chainID parameter for all endpoints defaults to the X-chain ID.

