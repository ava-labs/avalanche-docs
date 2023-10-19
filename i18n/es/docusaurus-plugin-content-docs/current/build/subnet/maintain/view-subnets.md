---
etiquetas: [Construir, Subredes]
descripción: Puedes listar las Subredes que has creado con `avalanche subnet list`.
sidebar_label: Ver Subredes
pagination_label: Ver tus Subredes Creadas
sidebar_position: 0
---

# Cómo Ver tus Subredes Creadas

## Listar Configuraciones de Subredes

Puedes listar las Subredes que has creado con

`avalanche subnet list`

Ejemplo:

```text
> avalanche subnet list
+-------------+-------------+----------+---------------------------------------------------+------------+-----------+
|   SUBNET    |    CHAIN    | CHAIN ID |                       VM ID                       |    TYPE    | FROM REPO |
+-------------+-------------+----------+---------------------------------------------------+------------+-----------+
| test        | test        |     5234 | tGBrM2SXkAdNsqzb3SaFZZWMNdzjjFEUKteheTa4dhUwnfQyu | Subnet-EVM | false     |
+-------------+-------------+----------+---------------------------------------------------+------------+-----------+
```

Para ver información detallada sobre tus Subredes desplegadas, agrega la bandera `--deployed`:

```text
> avalanche subnet list --deployed
+-------------+-------------+---------------------------------------------------+---------------+-----------------------------------------------------------------+---------+
|   SUBNET    |    CHAIN    |                       VM ID                       | LOCAL NETWORK |                          FUJI (TESTNET)                         | MAINNET |
+-------------+-------------+---------------------------------------------------+---------------+-----------------------------------------------------------------+---------+
| test        | test        | tGBrM2SXkAdNsqzb3SaFZZWMNdzjjFEUKteheTa4dhUwnfQyu | Sí            | SubnetID: XTK7AM2Pw5A4cCtQ3rTugqbeLCU9mVixML3YwwLYUJ4WXN2Kt     | No      |
+             +             +                                                   +               +-----------------------------------------------------------------+---------+
|             |             |                                                   |               | BlockchainID: 5ce2WhnyeMELzg9UtfpCDGNwRa2AzMzRhBWfTqmFuiXPWE4TR | No      |
+-------------+-------------+---------------------------------------------------+---------------+-----------------------------------------------------------------+---------+
```



## Describir Configuraciones de Subredes

Para ver los detalles de una configuración específica, ejecuta

`avalanche subnet describe <nombreSubred>`

Ejemplo:

```text
> avalanche subnet describe firstsubnet

 _____       _        _ _
|  __ \     | |      (_) |
| |  | | ___| |_ __ _ _| |___
| |  | |/ _ \ __/ _  | | / __|
| |__| |  __/ || (_| | | \__ \
|_____/ \___|\__\__,_|_|_|___/
+----------------------------+----------------------------------------------------+
|         PARÁMETRO          |                       VALOR                        |
+----------------------------+----------------------------------------------------+
| Nombre de la Subred        | firstsubnet                                        |
+----------------------------+----------------------------------------------------+
| ID de la Cadena            | 12345                                              |
+----------------------------+----------------------------------------------------+
| Nombre del Token           | FSN                                                |
+----------------------------+----------------------------------------------------+
| ID de la VM                | tGBrM2SXkAdNsqzb3SaFZZWMNdzjjFEUKteheTa4dhUwnfQyu  |
+----------------------------+----------------------------------------------------+
| SubnetID Fuji              | XTK7AM2Pw5A4cCtQ3rTugqbeLCU9mVixML3YwwLYUJ4WXN2Kt  |
+----------------------------+----------------------------------------------------+
| BlockchainID Fuji          | 5ce2WhnyeMELzg9UtfpCDGNwRa2AzMzRhBWfTqmFuiXPWE4TR  |
+----------------------------+----------------------------------------------------+
| SubnetID Red Local         | 2CZP2ndbQnZxTzGuZjPrJAm5b4s2K2Bcjh8NqWoymi8NZMLYQk |
+----------------------------+----------------------------------------------------+
| BlockchainID Red Local     | oaCmwvn8FDuv8QjeTozGpHeczk1Kv2651j2jhm6sR1nraGwVW  |
+----------------------------+----------------------------------------------------+

_____              _____             __ _
 / ____|            / ____|           / _(_)
| |  __  __ _ ___  | |     ___  _ __ | |_ _  __ _
| | |_ |/ _  / __| | |    / _ \| '_ \|  _| |/ _  |
| |__| | (_| \__ \ | |___| (_) | | | | | | | (_| |
 \_____|\__,_|___/  \_____\___/|_| |_|_| |_|\__, |
                                             __/ |
                                            |___/
+--------------------------+-------------+
|      PARÁMETRO DE GAS     |    VALOR    |
+--------------------------+-------------+
| GasLimit                 |    15000000 |
+--------------------------+-------------+
| MinBaseFee               | 25000000000 |
+--------------------------+-------------+
| TargetGas                |    15000000 |
+--------------------------+-------------+
| BaseFeeChangeDenominator |          36 |
+--------------------------+-------------+
| MinBlockGasCost          |           0 |
+--------------------------+-------------+
| MaxBlockGasCost          |     1000000 |
+--------------------------+-------------+
| TargetBlockRate          |           2 |
+--------------------------+-------------+
| BlockGasCostStep         |      200000 |
+--------------------------+-------------+

          _         _
    /\   (_)       | |
   /  \   _ _ __ __| |_ __ ___  _ __
  / /\ \ | | '__/ _  | '__/ _ \| '_ \
 / ____ \| | | | (_| | | | (_) | |_) |
/_/    \_\_|_|  \__,_|_|  \___/| .__/
                               | |
                               |_|
+--------------------------------------------+------------------------+---------------------------+
|                  DIRECCIÓN                 | CANTIDAD DE AIRDROP (10^18) |   CANTIDAD DE AIRDROP (WEI)    |
+--------------------------------------------+------------------------+---------------------------+
| 0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC |                1000000 | 1000000000000000000000000 |
+--------------------------------------------+------------------------+---------------------------+


  _____                                    _ _
 |  __ \                                  (_) |
 | |__) | __ ___  ___ ___  _ __ ___  _ __  _| | ___  ___
 |  ___/ '__/ _ \/ __/ _ \| '_   _ \| '_ \| | |/ _ \/ __|
 | |   | | |  __/ (_| (_) | | | | | | |_) | | |  __/\__ \
 |_|   |_|  \___|\___\___/|_| |_| |_| .__/|_|_|\___||___/
                                    | |
                                    |_|

No se han establecido precompilaciones.

```text
> avalanche subnet describe firstsubnet --genesis
{
    "config": {
        "chainId": 12345,
        "homesteadBlock": 0,
        "eip150Block": 0,
        "eip150Hash": "0x2086799aeebeae135c246c65021c82b4e15a2c451340993aacfd2751886514f0",
        "eip155Block": 0,
        "eip158Block": 0,
        "byzantiumBlock": 0,
        "constantinopleBlock": 0,
        "petersburgBlock": 0,
        "istanbulBlock": 0,
        "muirGlacierBlock": 0,
        "subnetEVMTimestamp": 0,
        "feeConfig": {
            "gasLimit": 15000000,
            "targetBlockRate": 2,
            "minBaseFee": 25000000000,
            "targetGas": 15000000,
            "baseFeeChangeDenominator": 36,
            "minBlockGasCost": 0,
            "maxBlockGasCost": 1000000,
            "blockGasCostStep": 200000
        },
        "contractDeployerAllowListConfig": {
            "blockTimestamp": null,
            "adminAddresses": null
        },
        "contractNativeMinterConfig": {
            "blockTimestamp": null,
            "adminAddresses": null
        },
        "txAllowListConfig": {
            "blockTimestamp": null,
            "adminAddresses": null
        }
    },
    "nonce": "0x0",
    "timestamp": "0x0",
    "extraData": "0x",
    "gasLimit": "0xE4E1C0",
    "difficulty": "0x0",
    "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "coinbase": "0x0000000000000000000000000000000000000000",
    "alloc": {
        "8db97c7cece249c2b98bdc0226cc4c2a57bf52fc": {
            "balance": "0xd3c21bcecceda1000000"
        }
    },
    "airdropHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "airdropAmount": null,
    "number": "0x0",
    "gasUsed": "0x0",
    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "baseFeePerGas": null
}
```
