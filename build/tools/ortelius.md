---
description: 'Cette API permet aux clients d''interagir avec Ortelius, l''indexer Avalanche.'

---

# API Ortelius

## API Ortelius

### Format

Cette API utilise les requêtes GET HTTP à l'aide des paramètres de requête URL et renvoie les données JSON.

### Version:

À partir de la version 2, les chemins API seront préfixes par une étiquette de version, par exemple `http://localhost:8080/v2`.

La version actuelle de l'API est la version 2. La documentation de [l'API Legacy](ortelius.md#legacy-api) dispose de renseignements sur l'utilisation de l'API v1.

### Types de données

En plus des entités, des chaînes et des booléens, les types de données suivants sont utilisés tout au long de l'API :

| Nom de la famille | Description | Exemples de mesures |
| :--- | :--- | :--- |
| `id` | Un identifiant d'objet encodé CB58, tel qu'une chaîne, une transaction ou un identifiant d'actif | `2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qq3Lo6ftnC6FByM` |
| `adresse` | Une adresse encodée bech-32 \(utilisée sur la chaîne X-Chain bech-32 | `fuji1wycv8n7d2fg9aq6unp23pnj4q0arv03ysya8jj` |
| `dateheure` | Un timestamp Unix comme entier ou une chaîne formatée RFC3339 | `1599696000`, `2020-09-10T00:00:00Z` |
| `cascade` | Une adresse encodée hex sur la chaîne C) | `0xB31f66AA3C1785363F0875A1B74E27b85FD66c7` |
| `chash` | Un hachage encodé | `0x5b935988317e8552e769ad92b6a2fd01ac8f0f90d8ffa4377e50fcb8d970077` |

### Paramètres de la liste

Tous les paramètres de la liste des ressources acceptent les paramètres suivants:

| Nom de la famille | Type de type | Description | Par défaut | Max |
| :--- | :--- | :--- | :--- | :--- |
| `limite` | `int` | Le nombre maximal d'articles à retourner | `5000` | `5000` |
| `querque` | `chaîne de caractères` | Un préfixe ID pour filtrer les éléments par | Aucun élément n'est | Aucun élément n'est |
| `startTime` | `dateheure` | Limites aux éléments créés sur ou après un moment donné | `0 000 000` | Maintenant, |
| `endTime` | `dateheure` | Limites aux éléments créés sur ou avant un moment donné | Maintenant, | Maintenant, |

## Paramètres disponibles

### Aperçu général

La racine de l'API donne un aperçu des constantes du réseau Avalanche actif étant indexé.

**Params**

Aucun élément n'est

**Exemple d'appel**

```text
curl "http://localhost:8080/v2"
```

**Exemple de réponse**

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

Trouvez une adresse ou une transaction par son ID.

**Params**

| Nom de la famille | Type de type | Description | Par défaut | Max |
| :--- | :--- | :--- | :--- | :--- |
| `querque` | `chaîne de caractères` | Un préfixe ID pour filtrer les éléments par | Aucun élément n'est | Aucun élément n'est |

**Exemple d'appel**

```text
curl "http://localhost:8080/v2/search?query=2jEugPDFN89KXLEXtf5"
```

**Exemple de réponse**

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

Calculer les données de transaction agrégées sur une période.

**Params**

| Nom de la famille | Type de type | Description | Par défaut | Max |
| :--- | :--- | :--- | :--- | :--- |
| `channel` | `id` | Un ID de chaîne pour filtrer les résultats par. Peut être fourni plusieurs fois. | Aucun élément n'est | Aucun élément n'est |
| `assetID` | `id` | Un identifiant d'actif pour filtrer les résultats par. | Aucun élément n'est | Aucun élément n'est |
| `intervalSize` | `chaîne de caractères` | Valeurs 'minute', 'heure', 'jour', 'semaine', 'mois', 'année' | Aucun élément n'est | Aucun élément n'est |

**Exemple d'appel**

```text
curl "http://localhost:8080/v2/aggregates?startTime=2020-09-21T00:00:00Z&endTime=2020-10-21T00:00:00Z"
```

**Exemple de réponse**

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

### Agrégat TxFee

AVAX Agrégat txfee

**Exemple d'appel**

```text
curl "http://localhost:8080/v2/txfeeAggregates?startTime=2020-09-21T00:00:00Z&endTime=2020-10-21T00:00:00Z"
```

**Exemple de réponse**

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

### Chaîne d'adresse

Répond avec les chaînes une adresse apparaît.

**Params**

| Nom de la famille | Type de type | Description | Par défaut | Max |
| :--- | :--- | :--- | :--- | :--- |
| `adresse` | `adresse` | Une adresse pour filtrer les résultats par. Peut être fourni plusieurs fois. | Aucun élément n'est | Aucun élément n'est |

**Exemple d'appel**

```text
curl "http://localhost:8080/v2/addressChains?address=X-fujiABC"
```

**Exemple de réponse**

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

### List de liste

Trouvez les transactions qui ont été acceptées.

**Params**

| Nom de la famille | Type de type | Description | Par défaut | Max |
| :--- | :--- | :--- | :--- | :--- |
| `channel` | `id` | Un ID de chaîne pour filtrer les résultats par. Peut être fourni plusieurs fois. | Aucun élément n'est | Aucun élément n'est |
| `assetID` | `id` | Un identifiant d'actif pour filtrer les résultats par. | Aucun élément n'est | Aucun élément n'est |
| `adresse` | `adresse` | Une adresse pour filtrer les résultats par. Peut être fourni plusieurs fois. | Aucun élément n'est | Aucun élément n'est |
| `trip` | `chaîne de caractères` | Une méthode de trier les résultats par. Peut être `be``` ou be | `timestamp-asc` | S/O |

**Exemple d'appel**

```bash
curl "http://localhost:8080/v2/transactions?chainID=11111111111111111111111111111111LpoYY"
```

**Exemple de réponse**

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

### Obtenir la transaction

Trouvez une seule transaction par son ID.

**Exemple d'appel**

```text
curl "http://localhost:8080/v2/transactions/2jEugPDFN89KXLEXtf5oKp5spsJawTht2zP4kKJjkQwwRsDdLX"
```

**Exemple de réponse**

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

### Adresses de la liste

Trouvez les adresses qui ont été référencées dans les transactions acceptées.

**Params**

| Nom de la famille | Type de type | Description | Par défaut | Max |
| :--- | :--- | :--- | :--- | :--- |
| `channel` | `id` | Un ID de chaîne pour filtrer les résultats par. Peut être fourni plusieurs fois. | Aucun élément n'est | Aucun élément n'est |
| `adresse` | `adresse` | Une adresse pour filtrer les résultats par. Peut être fourni plusieurs fois. | Aucun élément n'est | Aucun élément n'est |

**Exemple d'appel**

```text
curl "http://localhost:8080/v2/addresses?address=X-avax1y8cyrzn2kg4udccs5d625gkac7a99pe452cy5u"
```

**Exemple de réponse**

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

Trouvez une seule adresse par son ID.

**Exemple d'appel**

```text
curl "http://localhost:8080/v2/addresses/avax1y8cyrzn2kg4udccs5d625gkac7a99pe452cy5u"
```

**Exemple de réponse**

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

Trouvez les actifs qui ont été créés sur la chaîne X.

**Exemple d'appel**

```text
curl "http://localhost:8080/v2/assets"
```

**Exemple de réponse**

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

### Obtenir un actif

Trouvez un seul actif par son ID.

**Exemple d'appel**

```text
curl "http://localhost:8080/v2/assets/FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z"
```

**Exemple de réponse**

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

### Liste des sorties

Trouvez les sorties créées par une transaction acceptée.

**Params**

| Nom de la famille | Type de type | Description | Par défaut | Max |
| :--- | :--- | :--- | :--- | :--- |
| `channel` | `id` | Un ID de chaîne pour filtrer les résultats par. Peut être fourni plusieurs fois. | Aucun élément n'est | Aucun élément n'est |
| `adresse` | `adresse` | Une adresse pour filtrer les résultats par. Peut être fourni plusieurs fois. | Aucun élément n'est | Aucun élément n'est |
| `spent` | `bool` | Si les résultats sont définis, ils seront filtrés par leur utilisation \(true\) ou non dépensés \(false\) | Aucun élément n'est | S/O |

**Exemple d'appel**

```text
curl "http://localhost:8080/v2/outputs?address=X-avax1y8cyrzn2kg4udccs5d625gkac7a99pe452cy5u&spent=false"
```

**Exemple de réponse**

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

**Exemple d'appel**

```text
curl "http://localhost:8080/v2/outputs/114RMPhYM7do7cDX7KWSqFeLkbUXFrLKcqPL4GMdjTvemPzvc"
```

**Exemple de réponse**

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

### Obtenez un bloc de chaîne C

Trouvez un seul bloc par son numéro.

**Exemple d'appel**

```text
curl "http://localhost:8080/v2/ctxdata/10"
```

**Exemple de réponse**

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

### Liste C-Chain transactions

Trouver les transactions C-Chain acceptées.

**Params**

| Nom de la famille | Type de type | Description | Par défaut | Max |
| :--- | :--- | :--- | :--- | :--- |
| `toAddress` | `cascade` | adresse | Aucun élément n'est | Aucun élément n'est |
| `fromAddress` | `cascade` | adresse | Aucun élément n'est | Aucun élément n'est |
| `adresse` | `cascade` | adresse \(à ou de\) | Aucun élément n'est | Aucun élément n'est |
| `hash` | `chash` | has de transaction | Aucun élément n'est | Aucun élément n'est |
| `blockStart` | `Numéro de référence` | Numéro de bloc de démarrage inclusive | Aucun élément n'est | S/O |
| `blockEnd` | `Numéro de référence` | Numéro de bloc de fin exclusif | Aucun élément n'est | S/O |

**Exemple d'appel**

```text
curl "http://localhost:8080/v2/ctransactions?toAddress=0x34ec164fd085ae43906eab6dffd1eae0a0855a2a&blockStart=797380&blockEnd=797381"
```

**Exemple de réponse**

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

### Obtenez une transaction C-Chain brute

Obtenez une transaction C-Chain acceptée par son ID.

**Exemple d'appel**

```text
curl "http://localhost:8080/v2/rawtransaction/pxiBJkwnaKhaJdYkkfAVRZXrJj47jJF3QAvsasbYF2Rfweoog"
```

**Exemple de réponse**

```javascript
{
    "tx": "0x00000000000000000001ed5f38341..."
}
```

### API héritière

La version 1 de l'API a été construite pour prendre en charge uniquement la chaîne X, et elle n'a pas utilisé de préfixe version \(`/v1`\). Il est disponible au chemin `/x` hors de la racine, qui est le paramètre Aperçu pour seulement la chaîne X:

**Exemple d'appel**

```text
curl "http://localhost:8080/x"
```

**Exemple de réponse**

```javascript
{
  "networkID": 1,
  "vm": "avm",
  "chainAlias": "x",
  "chainID": "2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM",
  "avaxAssetID": "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z"
}
```

L'API legs prend en charge les mêmes paramètres et paramètres que la version 2, sauf le paramètre chainID pour tous les paramètres par défaut de l'ID de la chaîne X.

