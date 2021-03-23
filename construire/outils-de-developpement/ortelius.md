---
description: >-
  Cette API permet aux clients d'interagir avec Ortelius, l'indexeur
  d'Avalanche.
---

# Ortelius API

## Ortelius API

### Format

Cette API utilise des requêtes HTTP GET à l'aide de paramètres de requête URL et renvoie des données JSON.

### Versions

À partir de la version 2, les chemins de l'API seront préfixés par une balise de version, par exemple `http://localhost:8080/v2`.

La version actuelle de l'API est la version 2. La documentation de l'ancienne API contient des informations sur l'utilisation de l'API v1.

### Types de Data

En plus des integers, strings, et booleans, les types de données suivants sont utilisés dans toute l'API:

| Nom | Description | Exemples |
| :--- | :--- | :--- |
| `id` | Un identifiant d'objet codé CB58, tel qu'une chaîne, une transaction ou un identifiant d'actif | `2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM` |
| `address` | Une adresse encodée en bech-32 | `fuji1wycv8n7d2fg9aq6unp23pnj4q0arv03ysya8jw` |
| `datetime` | Un horodatage Unix sous forme d'entier ou de chaîne au format RFC3339 | `1599696000`, `2020-09-10T00:00:00Z` |

### Paramètres de liste

Tous les points de terminaison pour répertorier les ressources acceptent les paramètres suivants:

| Nom | Type | Description | Default | Max |
| :--- | :--- | :--- | :--- | :--- |
| `limit` | `int` | Le nombre maximum d'articles à retourner | `500` | `500` |
| `offset` | `int` | Le nombre d'éléments à ignorer | `0` | None |
| `query` | `string` | Un préfixe d'ID pour filtrer les éléments par | None | None |
| `startTime` | `datetime` | Limites aux éléments créés à un moment donné ou après | `0` | Now |
| `endTime` | `datetime` | Limites aux éléments créés avant ou à un moment donné | Now | Now |

## Points de terminaison disponibles

### Aperçu

La racine de l'API donne un aperçu des constantes du réseau Avalanche actif en cours d'indexation

**Paramètres**

None

**Exemple de Call**

```text
curl "http://localhost:8080/v2"
```

**Exemple de Réponse**

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

### Recherche

Trouvez une adresse ou une transaction par son identifiant.

**Paramètress**

| Name | Type | Description | Default | Max |
| :--- | :--- | :--- | :--- | :--- |
| `query` | `string` | Un préfixe d'ID pour filtrer les éléments par | None | None |

**Exemple de Call**

```text
curl "http://localhost:8080/v2/search?query=2jEugPDFN89KXLEXtf5"
```

**Example de Réponse**

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

### Agrégat

Calculez les données de transaction agrégées sur une période donnée.

**Paramètress**

| Name | Type | Description | Default | Max |
| :--- | :--- | :--- | :--- | :--- |
| `chainID` | `id` | Un identifiant de chaîne pour filtrer les résultats. Peut être fourni plusieurs fois. | None | None |
| `assetID` | `id` | Un ID d'élément par lequel filtrer les résultats. | None | None |

**Exemple de Call**

```text
curl "http://localhost:8080/v2/aggregates?startTime=2020-09-21T00:00:00Z&endTime=2020-10-21T00:00:00Z"
```

**Exemple de Réponse**

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

### TxFee Agrégat

AVAX Agrégat txfee

**Exemple de Call**

```text
curl "http://localhost:8080/v2/txfeeAggregates?startTime=2020-09-21T00:00:00Z&endTime=2020-10-21T00:00:00Z"
```

**Exemple de Réponse**

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

### Adresse de chaîne

Répond avec les chaînes sur lesquelles une adresse apparaît.

**Paramètres**

| Name | Type | Description | Default | Max |
| :--- | :--- | :--- | :--- | :--- |
| `address` | `address` | Une adresse par laquelle filtrer les résultats. Peut être fourni plusieurs fois. | None | None |

**Exemple de Call**

```text
curl "http://localhost:8080/v2/addressChains?address=X-fujiABC"
```

**Exemple de Réponse**

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

### Liste de Transactions

Rechercher des transactions confirmées sur le réseau.

**Paramètres**

| Name | Type | Description | Default | Max |
| :--- | :--- | :--- | :--- | :--- |
| `chainID` | `id` | Un identifiant de chaîne pour filtrer les résultats. Peut être fourni plusieurs fois. | None | None |
| `assetID` | `id` | Un ID d'élément par lequel filtrer les résultats. | None | None |
| `address` | `address` | Une adresse par laquelle filtrer les résultats. Peut être fourni plusieurs fois. | None | None |
| `disableGenesis` | `bool` | Lorsqu'elle est vraie, les données du sommet Genesis ne sont pas renvoyées. | true | N/A |
| `sort` | `string` | Une méthode pour trier les résultats. Peut-être`timestamp-asc` ou `timestamp-desc`. | `timestamp-asc` | N/A |

**Exemple de Call**

```bash
curl "http://localhost:8080/v2/transactions?limit=1&chainID=11111111111111111111111111111111LpoYY&offset=100"
```

**Exemple de Réponse**

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

### Obetenir une Transaction

Trouver une transaction unique par son ID.

**Exemple de Call**

```text
curl "http://localhost:8080/v2/transactions/2jEugPDFN89KXLEXtf5oKp5spsJawTht2zP4kKJjkQwwRsDdLX"
```

**Exemple de Réponse**

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

### Liste d'Adresses

Trouvez des adresses qui ont été impliquées dans des transactions confirmées.

**Params**

| Name | Type | Description | Default | Max |
| :--- | :--- | :--- | :--- | :--- |
| `chainID` | `id` | Un identifiant de chaîne pour filtrer les résultats. Peut être fourni plusieurs fois. | None | None |
| `address` | `address` | Une adresse par laquelle filtrer les résultats. Peut être fourni plusieurs fois. | None | None |

**Exemple de Call**

```text
curl "http://localhost:8080/v2/addresses?limit=1"
```

**Exemple de Réponse**

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

### Obtenir l'adresse

Trouvez une seule adresse grâce à son identifiant.

**Exemple de Call**

```text
curl "http://localhost:8080/v2/addresses/avax1y8cyrzn2kg4udccs5d625gkac7a99pe452cy5u"
```

**Exemple de Réponse**

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

### Liste des actifs

Trouvez les ressources qui ont été créées sur la X-Chain.

**Params**

| Name | Type | Description | Default | Max |
| :--- | :--- | :--- | :--- | :--- |
| `enableAggregate` | string | Les valeur"minute", "hour", "day", "week", "month", or "year" lorsqu'elles sont fournies, des données agrégées sur l'élément seront incluses. | N/A | N/A |

**Exemple de Call**

```text
curl "http://localhost:8080/v2/assets?limit=1&enableAggregate=minute"
```

**Exemple de Réponse**

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

### Obtenir un actif

Recherchez un seul élément grâce à son identifiant.

**Exemple de Call**

```text
curl "http://localhost:8080/v2/assets/FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z?enableAggregate=true"
```

**Exemple de Réponse**

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

### Liste des sorties

Recherchez les sorties qui ont été créées par une transaction confirmée sur le réseau.

**Paramètres**

| Name | Type | Description | Default | Max |
| :--- | :--- | :--- | :--- | :--- |
| `chainID` | `id` | Un identifiant de chaîne pour filtrer les résultats. Peut être fourni plusieurs fois. | None | None |
| `address` | `address` | Une adresse par laquelle filtrer les résultats. Peut être fourni plusieurs fois. | None | None |
| `spent` | `bool` | S'il est défini, les résultats seront filtrés selon qu'ils sont dépensés \(true\) ou non dépensés \(false\) | None | N/A |

**Exemple de Call**

```text
curl "http://localhost:8080/v2/outputs?limit=1&spent=false"
```

**Exemple de Réponse**

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

### Obtenir la sortie

Trouvez une sortie unique par son ID.

**Exemple de Call**

```text
curl "http://localhost:8080/v2/outputs/114RMPhYM7do7cDX7KWSqFeLkbUXFrLKcqPL4GMdjTvemPzvc"
```

**Exemple de Réponse**

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

La version 1 de l'API a été conçue pour prendre en charge uniquement la X-Chain, et elle n'a pas utilisé de préfixe de version \(`/ v1`\). Il est disponible au chemin `/x` hors de la racine, qui est le point de terminaison Vue d'ensemble pour uniquement la X-Chain:

**Exemple de Call**

```text
curl "http://localhost:8080/x"
```

**Exemple de Réponse**

```javascript
{
  "networkID": 1,
  "vm": "avm",
  "chainAlias": "x",
  "chainID": "2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM",
  "avaxAssetID": "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z"
}
```

L'API héritée prend en charge les mêmes points de terminaison et paramètres que la version 2, sauf que le paramètre chainID pour tous les points de terminaison est défini par défaut sur l'ID de la X-Chain.

