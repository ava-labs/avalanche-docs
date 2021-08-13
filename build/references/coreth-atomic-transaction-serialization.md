# Coreth Format de transaction atomique

Cette page est `destinée` à être la seule source de Ce document utilise le format [de sérialisationprimitive](serialization-primitives.md) pour l'emballage et [secp256k1](cryptographic-primitives.md#cryptography-in-the-avalanche-virtual-machine) pour l'identification de l'utilisateur cryptographique.

## ID de codec

Certaines données sont préparées avec un ID decodec \(unt16\) qui indique comment les données devraient être deserialized. En ce moment, la seule ID de codecvalide est 0 \(`0×00 0×00`\).

## Entrées

Les entrées dans les opérations atomiques de Corethsont soit une entrée `EVMInput` de cette chaîne ou une entrée `TransferableInput` contient un `SECP256K1TransferInput`\) d'une autre chaîne. The `sera` utilisé dans `ExportTx` pour dépenser des fonds de cette chaîne, tandis que la `TransferableInput` sera utilisée pour importer des UTXOs atomiques d'une autre chaîne.

### Entrée EVM

Type d'entrée qui spécifie un compte EVM pour déduire les fonds dans le cadre d'un `ExportTx`.

#### Qu'entrée EVM contient

Une entrée EVM contient une `adresse`, `montant`, `assetID`, et `nonce`.

* **`Adresse`** est l'adresse EVM à partir delaquelle pour transférer des fonds.
* **`Montant`** est le montant de l'actif à transférer\(spécifié dans nAVAX pour AVAX et la plus petite dénomination pour tous les autres actifs\).
* **`AssetID`** est l'ID del'actif à transférer.
* **`Once`** est la nonce du compte EVMfonds d'exportation de fonds.

#### Gantt EVM spécification d'entrée

```text
+----------+----------+-------------------------+
| address  : [20]byte |                20 bytes |
+----------+----------+-------------------------+
| amount   : uint64   |                08 bytes |
+----------+----------+-------------------------+
| asset_id : [32]byte |                32 bytes |
+----------+----------+-------------------------+
| nonce    : uint64   |                08 bytes |
+----------+----------+-------------------------+
                      |                68 bytes |
                      +-------------------------+
```

#### Gantt EVM spécification d'entrée

```text
message  {
    bytes address = 1; // 20 bytes
    uint64 amount = 2; // 08 bytes
    bytes assetID = 3; // 32 bytes
    uint64 nonce = 4;  // 08 bytes
}
```

#### EVM Input Exemple

Faisons une entrée EVM :

* `Adresse :0×8db97c7cece249c2b98bdc0226cc4c2a57bf52f`c
* `Montant : 200`0
* `AssetID : 0×000102030405060708090a0b0c0d0e0f1011415161718191a1b1c1d1e1`f
* `Nonce : `0

```text
[
    Address   <- 0xc3344128e060128ede3523a24a461c8943ab0859,
    Amount    <- 0x00000000001e8480
    AssetID   <- 0xdbcf890f77f49b96857648b72b77f9f82937f28a68704af05da0dc12ba53f2db
    Nonce     <- 0x0000000000000000
]
=
[
    // address:
    0x8d, 0xb9, 0x7c, 0x7c, 0xec, 0xe2, 0x49, 0xc2,
    0xb9, 0x8b, 0xdc, 0x02, 0x26, 0xcc, 0x4c, 0x2a,
    0x57, 0xbf, 0x52, 0xfc,
    // amount:
    0x00, 0x00, 0x00, 0x00, 0x00, 0x1e, 0x84, 0x80,
    // assetID:
    0xdb, 0xcf, 0x89, 0x0f, 0x77, 0xf4, 0x9b, 0x96,
    0x85, 0x76, 0x48, 0xb7, 0x2b, 0x77, 0xf9, 0xf8,
    0x29, 0x37, 0xf2, 0x8a, 0x68, 0x70, 0x4a, 0xf0,
    0x5d, 0xa0, 0xdc, 0x12, 0xba, 0x53, 0xf2, 0xdb,
    // nonce:
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
]
```

### Entrée transférable

Entrée transférable wraps `unSECP256K1TransferInput`. Inputs transférables décrivent uneUTXO spécifique avec une entrée de transfert fournie.

#### Qu'entrée transférable Contient

Une entrée transférable contient une `TxID`,` UTXOInde`x` AssetI`D et une` entré`e.

* **`TxID`** est un tableau32-octets qui définit quelle transaction cette entrée consomme une sortie de.
* **`UTXOIndex`** est une int qui définitlaquelle utxo cette entrée est consuming dans la transaction spécifiée.
* **`AssetID`** est un tableauune gamme 32-octets qui définit quel atout cette référence d'entrée.
* **`Input`** est `unSECP256K1TransferInput`, tel que défini ci-dessous.

#### Gantt spécification d'entrée transférable

```text
+------------+----------+------------------------+
| tx_id      : [32]byte |               32 bytes |
+------------+----------+------------------------+
| utxo_index : int      |               04 bytes |
+------------+----------+------------------------+
| asset_id   : [32]byte |               32 bytes |
+------------+----------+------------------------+
| input      : Input    |      size(input) bytes |
+------------+----------+------------------------+
                        | 68 + size(input) bytes |
                        +------------------------+
```

#### Promo spécification d'entrée transférable

```text
message TransferableInput {
    bytes tx_id = 1;       // 32 bytes
    uint32 utxo_index = 2; // 04 bytes
    bytes asset_id = 3;    // 32 bytes
    Input input = 4;       // size(input)
}
```

#### Exemple d'entrée transférable

Faisons une entrée transférable :

* `TxID :0×6613a40dcd8d22ea4aa99a4c84349056317cf550b6685e045e45e459954f2588595`9
* `UTXOIndex : `1
* `AssetID :0xdbcf890f77f49b96857648b72b77f9f82937f28a68704af05da0dc12ba53f2d`b
* `Entrée : "ExempleSECP256K1 Entrée de transfert de ci-dessous`"

```text
[
    TxID      <- 0x6613a40dcdd8d22ea4aa99a4c84349056317cf550b6685e045e459954f258e59
    UTXOIndex <- 0x00000001
    AssetID   <- 0xdbcf890f77f49b96857648b72b77f9f82937f28a68704af05da0dc12ba53f2db
    Input     <- 0x0000000500000000075bcd15000000020000000700000003
]
=
[
    // txID:
    0x66, 0x13, 0xa4, 0x0d, 0xcd, 0xd8, 0xd2, 0x2e,
    0xa4, 0xaa, 0x99, 0xa4, 0xc8, 0x43, 0x49, 0x05,
    0x63, 0x17, 0xcf, 0x55, 0x0b, 0x66, 0x85, 0xe0,
    0x45, 0xe4, 0x59, 0x95, 0x4f, 0x25, 0x8e, 0x59,
    // utxoIndex:
    0x00, 0x00, 0x00, 0x01,
    // assetID:
    0xdb, 0xcf, 0x89, 0x0f, 0x77, 0xf4, 0x9b, 0x96,
    0x85, 0x76, 0x48, 0xb7, 0x2b, 0x77, 0xf9, 0xf8,
    0x29, 0x37, 0xf2, 0x8a, 0x68, 0x70, 0x4a, 0xf0,
    0x5d, 0xa0, 0xdc, 0x12, 0xba, 0x53, 0xf2, 0xdb,
    // input:
    0x00, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x74,
    0x6a, 0x52, 0x88, 0x00, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x00,
]
```

### SECP256K1 Entrée de transfert

Une entrée de transfert [secp256k1](https://github.com/ava-labs/avalanche-docs/tree/94d2e4aeddbf91f89b830f9b44b4aa60089ac755/build/cryptographic-primitives/README.md#cryptography-in-the-avalanche-virtual-machine) permet de dépenser une sortie de transfert secp256k1.

#### Qu'entrée de transfertSECP256K1 Contient

Une entrée de transfertcontient une `Somme` et `Indices`.

* **`TypeID`** est l'ID de ce typed'entrée. Il `est0x005`.
* **`Somme`** est une longue qui spécifie la quantitéque cette entrée devrait être consommatrice d’is Doit être positive. Doit être égale à la quantité spécifiée dans be
* **`AddressIndices`** est une liste d'indices uniques qui définissent les clés privées qui sont utilisées pour dépenser of Chaque UTXO a une gammed'adresses qui peuvent dépenser of Chaque int représente l'index dans cette gamme d'adresses qui signera cette transaction. La gamme doit être triée de bas à haute.

#### Gantt SECP256K1 spécification d'entrée de transfert

```text
+-------------------------+-------------------------------------+
| type_id         : int   |                             4 bytes |
+-----------------+-------+-------------------------------------+
| amount          : long  |                             8 bytes |
+-----------------+-------+-------------------------------------+
| address_indices : []int |  4 + 4 * len(address_indices) bytes |
+-----------------+-------+-------------------------------------+
                          | 16 + 4 * len(address_indices) bytes |
                          +-------------------------------------+
```

#### Promo SECP256K1 spécification d'entrée de transfert

```text
message SECP256K1TransferInput {
    uint32 typeID = 1;                   // 04 bytes
    uint64 amount = 2;                   // 08 bytes
    repeated uint32 address_indices = 3; // 04 bytes + 04 bytes * len(address_indices)
}
```

#### SECP256K1 Exemple d'entrée de transfert

Faisons une entrée de paiement avec :

* **`TypeId`** : 5
* **`Montant`** :5000
* **`Indices`** : \[0\]

```text
[
    TypeID         <- 0x00000005
    Amount         <- 500000000000 = 0x000000746a528800,
    AddressIndices <- [0x00000000]
]
=
[
    // type id:
    0x00, 0x00, 0x00, 0x05,
    // amount:
    0x00, 0x00, 0x00, 0x74, 0x6a, 0x52, 0x88, 0x00,
    // length:
    0x00, 0x00, 0x00, 0x01,
    // sig[0]
    0x00, 0x00, 0x00, 0x00,
]
```

## Extrants

Extrants à Coreth Transactions atomiques sont soit une `EVMOutput` à ajouter à la balance d'une adresse sur cette chaîne ou une `EVMOutput` \(whcih contient une `SECP256K1TransferOutput`\) à être déplacée dans une autre chaîne.

La sortie EVM sera utilisée dans `ImportTxpour` ajouter des fonds à cette chaîne, tandis que la Sortie `TransferableOutput` utilisée pour exporter des UTXOs atomiques dans une autre chaîne.

### Sortie EVM

Type de sortie spécifiant une modification d'étatà appliquer à un compte EVM dans le cadre d'une `ImportTx`.

#### Qu'entrée EVM contient

Une sortie EVM contient une `adresse`,` montan`t, et` assetI`D.

* **`Adresse`** est l'adresse EVM qui recevra lesfonds.
* **`Montant`** est le montant de l'actif à transférer\(spécifié dans nAVAX pour AVAX et la plus petite dénomination pour tous les autres actifs\).
* **`AssetID`** est l'ID del'actif à transférer.

#### Gantt EVM spécification d'entrée

```text
+----------+----------+-------------------------+
| address  : [20]byte |                20 bytes |
+----------+----------+-------------------------+
| amount   : uin64    |                08 bytes |
+----------+----------+-------------------------+
| asset_id : [32]byte |                32 bytes |
+----------+----------+-------------------------+
                      |                60 bytes |
                      +-------------------------+
```

#### Gantt EVM spécification d'entrée

```text
message  {
    bytes address = 1; // 20 bytes
    uint64 amount = 2; // 08 bytes
    bytes assetID = 3; // 32 bytes
}
```

#### EVM Exemple de sortie

Faisons une entrée EVM :

* `Adresse :0×0eb5ccb85c29009b6060decb353a38ea3b52cd2`0
* `Montant :500`0
* `AssetID :0xdbcf890f77f49b96857648b72b77f9f82937f28a68704af05da0dc12ba53f2d`b

```text
[
    Address   <- 0x0eb5ccb85c29009b6060decb353a38ea3b52cd20,
    Amount    <- 0x000000746a528800
    AssetID   <- 0xdbcf890f77f49b96857648b72b77f9f82937f28a68704af05da0dc12ba53f2db
]
=
[
    // address:
    0xc3, 0x34, 0x41, 0x28, 0xe0, 0x60, 0x12, 0x8e,
    0xde, 0x35, 0x23, 0xa2, 0x4a, 0x46, 0x1c, 0x89,
    0x43, 0xab, 0x08, 0x59,
    // amount:
    0x00, 0x00, 0x00, 0x74, 0x6a, 0x52, 0x88, 0x00,
    // assetID:
    0xdb, 0xcf, 0x89, 0x0f, 0x77, 0xf4, 0x9b, 0x96,
    0x85, 0x76, 0x48, 0xb7, 0x2b, 0x77, 0xf9, 0xf8,
    0x29, 0x37, 0xf2, 0x8a, 0x68, 0x70, 0x4a, 0xf0,
    0x5d, 0xa0, 0xdc, 0x12, 0xba, 0x53, 0xf2, 0xdb,
]
```

### Sortie transférable

`Outputs` transférables envelopper uneidentifiant d'actif.

#### Qu'entrée transférable Contient

Une sortie transférable contient une `AssetID` etune `sortie` qui est une `SECP256K1TransferOutput`.

* **`AssetID`** est une gamme de 32-octets qui définit quel atout cette référence de sortie.
* **`Sortie`** est `uneSECP256K1TransferOutput` telle que définie ci-dessous.

#### Gantt spécification d'entrée transférable

```text
+----------+----------+-------------------------+
| asset_id : [32]byte |                32 bytes |
+----------+----------+-------------------------+
| output   : Output   |      size(output) bytes |
+----------+----------+-------------------------+
                      | 32 + size(output) bytes |
                      +-------------------------+
```

#### Gantt spécification d'entrée transférable

```text
message TransferableOutput {
    bytes asset_id = 1; // 32 bytes
    Output output = 2;  // size(output)
}
```

#### Exemple de sortie transférable

Faisons une entrée transférable :

* `AssetID :0xdbcf890f77f49b96857648b72b77f9f82937f28a68704af05da0dc12ba53f2d`b
* `Sortie : "ExempleSECP256K1 Sortie de transfert "Example`

```text
[
    AssetID <- 0xdbcf890f77f49b96857648b72b77f9f82937f28a68704af05da0dc12ba53f2db
    Output  <- 0x000000070000000000003039000000000000d431000000010000000251025c61fbcfc078f69334f834be6dd26d55a955c3344128e060128ede3523a24a461c8943ab0859,
]
=
[
    // assetID:
    0xdb, 0xcf, 0x89, 0x0f, 0x77, 0xf4, 0x9b, 0x96,
    0x85, 0x76, 0x48, 0xb7, 0x2b, 0x77, 0xf9, 0xf8,
    0x29, 0x37, 0xf2, 0x8a, 0x68, 0x70, 0x4a, 0xf0,
    0x5d, 0xa0, 0xdc, 0x12, 0xba, 0x53, 0xf2, 0xdb,
    // output:
    0xdb, 0xcf, 0x89, 0x0f, 0x77, 0xf4, 0x9b, 0x96,
    0x85, 0x76, 0x48, 0xb7, 0x2b, 0x77, 0xf9, 0xf8,
    0x29, 0x37, 0xf2, 0x8a, 0x68, 0x70, 0x4a, 0xf0,
    0x5d, 0xa0, 0xdc, 0x12, 0xba, 0x53, 0xf2, 0xdb,
    0x00, 0x00, 0x00, 0x07, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x0f, 0x42, 0x40, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x01, 0x66, 0xf9, 0x0d, 0xb6,
    0x13, 0x7a, 0x78, 0xf7, 0x6b, 0x36, 0x93, 0xf7,
    0xf2, 0xbc, 0x50, 0x79, 0x56, 0xda, 0xe5, 0x63,
]
```

### SECP256K1 Sortie de transfert

Une sortie de [transfertsecp256k1](cryptographic-primitives.md#cryptography-in-the-avalanche-virtual-machine) permet d'envoyer une quantité d'un actif à une collection d'adresses après une heure unix spécifiée.

#### Qu'entrée de transfertSECP256K1 Contient

Une sortie de transfertsecp256k1 contient à `Montant```, `Locktime`, `Seuil`, et `Adresses`.

* **`TypeID`** est l'ID de ce typed'entrée. Il `est0x007`.
* **`Somme`** est une longue qui spécifie la quantitéde l'actif que cette sortie possède. Doit être positive.
* **`Locktime`** est une longue qui contientl'unix timestamp que cette sortie peut être dépensée après. L'unix timestamp est spécifique à la seconde.
* **`Seuil`** est une int qui nomme le nombre de Doit être inférieure ou égale à la longueur **`desAdresses`**. Si **`Adresses`** est vide, doit être 0.
* **`Adresses`** est une liste d'adresses uniques quicorrespondent aux clés privées qui peuvent être utilisées pour dépenser cette sortie. Adresses doivent être triéeslexicographiquement.

#### Gantt SECP256K1 spécification d'entrée de transfert

```text
+-----------+------------+--------------------------------+
| type_id   : int        |                        4 bytes |
+-----------+------------+--------------------------------+
| amount    : long       |                        8 bytes |
+-----------+------------+--------------------------------+
| locktime  : long       |                        8 bytes |
+-----------+------------+--------------------------------+
| threshold : int        |                        4 bytes |
+-----------+------------+--------------------------------+
| addresses : [][20]byte |  4 + 20 * len(addresses) bytes |
+-----------+------------+--------------------------------+
                         | 28 + 20 * len(addresses) bytes |
                         +--------------------------------+
```

#### Promo SECP256K1 spécification d'entrée de transfert

```text
message SECP256K1TransferOutput {
    uint32 typeID = 1;            // 04 bytes
    uint64 amount = 2;            // 08 bytes
    uint64 locktime = 3;          // 08 bytes
    uint32 threshold = 4;         // 04 bytes
    repeated bytes addresses = 5; // 04 bytes + 20 bytes * len(addresses)
}
```

#### SECP256K1 Sortie de transfert

Faisons une sortie detransfertsecp256k1 avec :

* **`TypeID`** :7
* **`Montant`** : 1000
* **`Locktime`** : 0
* **`Seuil`** : 1
* **`Adresses`** :
   * 0×66f90db6137a78f76b3693f7f2bc507956dae566

```text
[
    TypeID    <- 0x00000007
    Amount    <- 0x00000000000f4240
    Locktime  <- 0x0000000000000000
    Threshold <- 0x00000001
    Addresses <- [
        0x66f90db6137a78f76b3693f7f2bc507956dae563
    ]
]
=
[
    // typeID:
    0x00, 0x00, 0x00, 0x07,
    // amount:
    0x00, 0x00, 0x00, 0x00, 0x00, 0x0f, 0x42, 0x40,
    // locktime:
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    // threshold:
    0x00, 0x00, 0x00, 0x01,
    // number of addresses:
    0x00, 0x00, 0x00, 0x01,
    // addrs[0]:
    0x66, 0xf9, 0x0d, 0xb6, 0x13, 0x7a, 0x78, 0xf7,
    0x6b, 0x36, 0x93, 0xf7, 0xf2, 0xbc, 0x50, 0x79,
    0x56, 0xda, 0xe5, 0x63,
]
```

## Transactions atomiques

Transactions atomiques sont utilisées pour déplacer des fondsentre chaînes. Il y a deux types `ImportTx` `etExportTx`.

### ExportTx

ExportTx est une transaction pour exporter des fondsde Coreth vers une autre chaîne.

#### What Contient

An ExportTx contient une `typeID`,` networkI`D,` blockchainI`D,` destinationChai`n,` entrée`s, et` exportedOutput`s.

* **`TypeID`** est une int que le typed'une ExportTx. L'ID pour une exportTx est1.
* **`NetworkID`** est une int qui définit laquellequel réseau Avalanche cette transaction est destinée à être émise à. Ceci pourrait se référer à mainnet, fuji, etc. et est différente de l'ID de réseau de l'EVM.
* **`BlockchainID`** est une ary32-octets qui définit quelle blockchain cette transaction a été émise à.
* **`DestinationChain`** est une gamme de32-octequi définit quelle blockchain cette transaction exporte des fonds.
* **`Inputs`** est une gamme d'entréesEVM pour financer of
* **`ExportedOutputs`** est une gammed'Entrées TransferableOutputs transférer à `destinationChain`.

#### Gantt ExportTx spécification

```text
+---------------------+----------------------+-------------------------------------------------+
| typeID              : int                  |                                        04 bytes |
+---------------------+----------------------+-------------------------------------------------+
| networkID           : int                  |                                        04 bytes |
+---------------------+----------------------+-------------------------------------------------+
| blockchainID        : [32]byte             |                                        32 bytes |
+---------------------+----------------------+-------------------------------------------------+
| destinationChain    : [32]byte             |                                        32 bytes |
+---------------------+----------------------+-------------------------------------------------+
| inputs              : []EvmInput           |                          4 + size(inputs) bytes |
+---------------------+----------------------+-------------------------------------------------+
| exportedOutputs     : []TransferableOutput |                 4 + size(exportedOutputs) bytes |
+----------+----------+----------------------+-------------------------------------------------+
                                             | 80 + size(inputs) + size(exportedOutputs) bytes |
                                             +-------------------------------------------------+
```

#### ExportTx Exemple

Faisons une entrée EVM :

* **`TypeID`** :` `1
* **`NetworkID`** :` 1234`5
* **`BlockchainID`** :` 0×91060eabfb5a571720109b5896e5ff0010a1cfe6b103d585e6ebf27b97a173`5
* **`DestinationChain`** `:0xd891ad56056d9c01f18f43f58b5c784ad07a4a49cf3d1f11623804b5cba2c6b`f
* **`Entrées`** :
   * `"Exemple EVMInput telle que définie ci-dessus"`
* **`Exportedoutputs`** :
   * `"Exemple EVMInput telle que définie ci-dessus"`

```text
[
    TypeID           <- 0x00000001
    NetworkID        <- 0x00003039
    BlockchainID     <- 0x91060eabfb5a571720109b5896e5ff00010a1cfe6b103d585e6ebf27b97a1735
    DestinationChain <- 0xd891ad56056d9c01f18f43f58b5c784ad07a4a49cf3d1f11623804b5cba2c6bf
    Inputs           <- [
        0xc3344128e060128ede3523a24a461c8943ab08590000000000003039000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f0000000000000001
    ]
    ExportedOutputs  <- [
        0xdbcf890f77f49b96857648b72b77f9f82937f28a68704af05da0dc12ba53f2dbdbcf890f77f49b96857648b72b77f9f82937f28a68704af05da0dc12ba53f2db0000000700000000000f42400000000000000000000000010000000166f90db6137a78f76b3693f7f2bc507956dae563
    ]
]
=
[
    // typeID:
    0x00, 0x00, 0x00, 0x01,
    // networkID:
    0x00, 0x00, 0x00, 0x04,
    // blockchainID:
    0x91, 0x06, 0x0e, 0xab, 0xfb, 0x5a, 0x57, 0x17,
    0x20, 0x10, 0x9b, 0x58, 0x96, 0xe5, 0xff, 0x00,
    0x01, 0x0a, 0x1c, 0xfe, 0x6b, 0x10, 0x3d, 0x58,
    0x5e, 0x6e, 0xbf, 0x27, 0xb9, 0x7a, 0x17, 0x35,
    // destination_chain:
    0xd8, 0x91, 0xad, 0x56, 0x05, 0x6d, 0x9c, 0x01,
    0xf1, 0x8f, 0x43, 0xf5, 0x8b, 0x5c, 0x78, 0x4a,
    0xd0, 0x7a, 0x4a, 0x49, 0xcf, 0x3d, 0x1f, 0x11,
    0x62, 0x38, 0x04, 0xb5, 0xcb, 0xa2, 0xc6, 0xbf,
    // inputs[] count:
    0x00, 0x00, 0x00, 0x01,
    // inputs[0]
    0x8d, 0xb9, 0x7c, 0x7c, 0xec, 0xe2, 0x49, 0xc2,
    0xb9, 0x8b, 0xdc, 0x02, 0x26, 0xcc, 0x4c, 0x2a,
    0x57, 0xbf, 0x52, 0xfc, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x1e, 0x84, 0x80, 0xdb, 0xcf, 0x89, 0x0f,
    0x77, 0xf4, 0x9b, 0x96, 0x85, 0x76, 0x48, 0xb7,
    0x2b, 0x77, 0xf9, 0xf8, 0x29, 0x37, 0xf2, 0x8a,
    0x68, 0x70, 0x4a, 0xf0, 0x5d, 0xa0, 0xdc, 0x12,
    0xba, 0x53, 0xf2, 0xdb, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00,
    // exportedOutputs[] count
    0x00, 0x00, 0x00, 0x01,
    // exportedOutputs[0]
    0xdb, 0xcf, 0x89, 0x0f, 0x77, 0xf4, 0x9b, 0x96,
    0x85, 0x76, 0x48, 0xb7, 0x2b, 0x77, 0xf9, 0xf8,
    0x29, 0x37, 0xf2, 0x8a, 0x68, 0x70, 0x4a, 0xf0,
    0x5d, 0xa0, 0xdc, 0x12, 0xba, 0x53, 0xf2, 0xdb,
    0x00, 0x00, 0x00, 0x07, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x0f, 0x42, 0x40, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x01, 0x66, 0xf9, 0x0d, 0xb6,
    0x13, 0x7a, 0x78, 0xf7, 0x6b, 0x36, 0x93, 0xf7,
    0xf2, 0xbc, 0x50, 0x79, 0x56, 0xda, 0xe5, 0x63,
]
```

### ImportTx

ImportTx est une transaction pour importer des fondsà Coreth d'une autre chaîne.

#### Qu'importe Contient

An ImportTx contient une `typeID`,` networkI`D,` blockchainI`D,` destinationChai`n,` importedInput`s, et` Out`s.

* **`TypeID`** est une int que le typed'une ExportTx. L'ID pour une `ImportTx` est0.
* **`NetworkID`** est une int qui définit laquellequel réseau Avalanche cette transaction est destinée à être émise à. Ceci pourrait se référer à mainnet, fuji, etc. et est différente de l'ID de réseau de l'EVM.
* **`BlockchainID`** est une ary32-octets qui définit quelle blockchain cette transaction a été émise à.
* **`SourceChain`** est une gamme 32-octets qui définit quelle blockchain à partir de laquelle pour importer des fonds.
* **`ImportedInputs`** est une gamme d'Inputs TransferableInputs financer of
* **`Outs`** est une gamme d'Outputs EVM à importer dans cette chaîne.

#### Gantt ImportTx spécification

```text
+---------------------+----------------------+-------------------------------------------------+
| typeID              : int                  |                                        04 bytes |
+---------------------+----------------------+-------------------------------------------------+
| networkID           : int                  |                                        04 bytes |
+---------------------+----------------------+-------------------------------------------------+
| blockchainID        : [32]byte             |                                        32 bytes |
+---------------------+----------------------+-------------------------------------------------+
| sourceChain         : [32]byte             |                                        32 bytes |
+---------------------+----------------------+-------------------------------------------------+
| importedInputs      : []TransferableInput  |                  4 + size(importedInputs) bytes |
+---------------------+----------------------+-------------------------------------------------+
| outs                : []EVMOutput          |                            4 + size(outs) bytes |
+----------+----------+----------------------+-------------------------------------------------+
                                             |    80 + size(importedInputs) + size(outs) bytes |
                                             +-------------------------------------------------+
```

#### ImportTx Exemple

Faisons une ImportTx :

* **`TypeID`** :` `0
* **`NetworkID`** :` 1234`5
* **`BlockchainID`** :` 0×91060eabfb5a571720109b5896e5ff0010a1cfe6b103d585e6ebf27b97a173`5
* **`SourceChain`** :` 0xd891ad56056d9c01f18f43f58b5c784ad07a4a49cf3d1f11623804b5cba2c6b`f
* **`ImportedInputs`** :
   * `"Exemple EVMInput telle que définie ci-dessus"`
* **`Outs`** :
   * `"ExapmleEVMOutput telle que définie ci-dessus"`

```text
[
    TypeID           <- 0x00000000
    NetworkID        <- 0x00003039
    BlockchainID     <- 0x91060eabfb5a571720109b5896e5ff00010a1cfe6b103d585e6ebf27b97a1735
    SourceChain      <- 0xd891ad56056d9c01f18f43f58b5c784ad07a4a49cf3d1f11623804b5cba2c6bf
    ImportedInputs   <- [
        0x6613a40dcdd8d22ea4aa99a4c84349056317cf550b6685e045e459954f258e5900000001dbcf890f77f49b96857648b72b77f9f82937f28a68704af05da0dc12ba53f2db00000005000000746a5288000000000100000000
    ]
    Outs             <- [
        0x0eb5ccb85c29009b6060decb353a38ea3b52cd20000000746a528800dbcf890f77f49b96857648b72b77f9f82937f28a68704af05da0dc12ba53f2db
    ]
]
=
[
    // typeID:
    0x00, 0x00, 0x00, 0x00,
    // networkID:
    0x00, 0x00, 0x00, 0x04,
    // blockchainID:
    0x91, 0x06, 0x0e, 0xab, 0xfb, 0x5a, 0x57, 0x17,
    0x20, 0x10, 0x9b, 0x58, 0x96, 0xe5, 0xff, 0x00,
    0x01, 0x0a, 0x1c, 0xfe, 0x6b, 0x10, 0x3d, 0x58,
    0x5e, 0x6e, 0xbf, 0x27, 0xb9, 0x7a, 0x17, 0x35,
    // sourceChain:
    0xd8, 0x91, 0xad, 0x56, 0x05, 0x6d, 0x9c, 0x01,
    0xf1, 0x8f, 0x43, 0xf5, 0x8b, 0x5c, 0x78, 0x4a,
    0xd0, 0x7a, 0x4a, 0x49, 0xcf, 0x3d, 0x1f, 0x11,
    0x62, 0x38, 0x04, 0xb5, 0xcb, 0xa2, 0xc6, 0xbf,
    // importedInputs[] count:
    0x00, 0x00, 0x00, 0x01,
    // importedInputs[0]
    0x66, 0x13, 0xa4, 0x0d, 0xcd, 0xd8, 0xd2, 0x2e,
    0xa4, 0xaa, 0x99, 0xa4, 0xc8, 0x43, 0x49, 0x05,
    0x63, 0x17, 0xcf, 0x55, 0x0b, 0x66, 0x85, 0xe0,
    0x45, 0xe4, 0x59, 0x95, 0x4f, 0x25, 0x8e, 0x59,
    0x00, 0x00, 0x00, 0x01, 0xdb, 0xcf, 0x89, 0x0f,
    0x77, 0xf4, 0x9b, 0x96, 0x85, 0x76, 0x48, 0xb7,
    0x2b, 0x77, 0xf9, 0xf8, 0x29, 0x37, 0xf2, 0x8a,
    0x68, 0x70, 0x4a, 0xf0, 0x5d, 0xa0, 0xdc, 0x12,
    0xba, 0x53, 0xf2, 0xdb, 0x00, 0x00, 0x00, 0x05,
    0x00, 0x00, 0x00, 0x74, 0x6a, 0x52, 0x88, 0x00,
    0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00,
    // outs[] count
    0x00, 0x00, 0x00, 0x01,
    // outs[0]
    0x0e, 0xb5, 0xcc, 0xb8, 0x5c, 0x29, 0x00, 0x9b,
    0x60, 0x60, 0xde, 0xcb, 0x35, 0x3a, 0x38, 0xea,
    0x3b, 0x52, 0xcd, 0x20, 0x00, 0x00, 0x00, 0x74,
    0x6a, 0x52, 0x88, 0x00, 0xdb, 0xcf, 0x89, 0x0f,
    0x77, 0xf4, 0x9b, 0x96, 0x85, 0x76, 0x48, 0xb7,
    0x2b, 0x77, 0xf9, 0xf8, 0x29, 0x37, 0xf2, 0x8a,
    0x68, 0x70, 0x4a, 0xf0, 0x5d, 0xa0, 0xdc, 0x12,
    0xba, 0x53, 0xf2, 0xdb,
]
```

## Credits

Credentials ont un type `:SECP256K1Credentia`l. Chaque credential est jumelée avec uneInput. L'ordre des credentials correspond àl'ordre des inputs.

### SECP256K1 Credit

À [secp256k1credential](https://github.com/ava-labs/avalanche-docs/tree/94d2e4aeddbf91f89b830f9b44b4aa60089ac755/build/cryptographic-primitives/README.md#cryptography-in-the-avalanche-virtual-machine) contient une liste de 65-octets signatures.

#### Qu'est-ceSECP256K1 Credential Contient

* **`TypeID`** est l'ID de ce typed'entrée. Il est `0×009`.
* **`Signatures`** est une gamme de65-octets signatures. L'ordre des signatures doit correspondre aux indices designature de l'input.

#### Gantt SECP256K1spécification de crédit

```text
+------------------------------+---------------------------------+
| type_id         : int        |                         4 bytes |
+-----------------+------------+---------------------------------+
| signatures      : [][65]byte |  4 + 65 * len(signatures) bytes |
+-----------------+------------+---------------------------------+
                               |  8 + 65 * len(signatures) bytes |
                               +---------------------------------+
```

#### Gantt SECP256K1spécification de créditProto SECP256K1 spécification Credential

```text
message SECP256K1Credential {
    uint32 typeID = 1;             // 4 bytes
    repeated bytes signatures = 2; // 4 bytes + 65 bytes * len(signatures)
}
```

#### SECP256K1 Exemple de créditréférence

Faisons une entrée de paiement avec :

* **`TypeID`** : 9
* **`Signaux`** :
   * `0×0acccf47a8a8449a84428440e242875138790e41be262f7197f3d93faa26cc8741060d743ffaf025782c8c86b862d2b9febe7d352f0b4591afbd1a737f8a30010199dbf`

```text
[
    TypeID         <- 0x00000009
    Signatures     <- [
        0x0acccf47a820549a84428440e2421975138790e41be262f7197f3d93faa26cc8741060d743ffaf025782c8c86b862d2b9febebe7d352f0b4591afbd1a737f8a30010199dbf,
    ]
]
=
[
    // Type ID
    0x00, 0x00, 0x00, 0x09,
    // length:
    0x00, 0x00, 0x00, 0x01,
    // sig[0]
    0x0a, 0xcc, 0xcf, 0x47, 0xa8, 0x20, 0x54, 0x9a,
    0x84, 0x42, 0x84, 0x40, 0xe2, 0x42, 0x19, 0x75,
    0x13, 0x87, 0x90, 0xe4, 0x1b, 0xe2, 0x62, 0xf7,
    0x19, 0x7f, 0x3d, 0x93, 0xfa, 0xa2, 0x6c, 0xc8,
    0x74, 0x10, 0x60, 0xd7, 0x43, 0xff, 0xaf, 0x02,
    0x57, 0x82, 0xc8, 0xc8, 0x6b, 0x86, 0x2d, 0x2b,
    0x9f, 0xeb, 0xeb, 0xe7, 0xd3, 0x52, 0xf0, 0xb4,
    0x59, 0x1a, 0xfb, 0xd1, 0xa7, 0x37, 0xf8, 0xa3,
    0x00, 0x10, 0x19, 0x9d, 0xbf,
]
```

## Transaction signée

Une transaction signée contient une `AtomicTxet` credentials.

### Qu'a signé Contient

Une transaction signée contient une `CodecID`,` AtomicT`x, et` Credential`s.

* **`CodecID`** La seule actuelle valide codecidcodec id est `00 00`.
* **`AtomicTx`** est une transactionatomique, telle que décrite ci-dessus.
* **`Credentials`** est une gammede credentials. Chaque credential correspond à l'entrée dumême index dans the

### Gantt Signé Transaction spécification

```text
+---------------------+--------------+------------------------------------------------+
| codec_id            : uint16       |                                        2 bytes |
+---------------------+--------------+------------------------------------------------+
| atomic_tx           : AtomicTx     |                          size(atomic_tx) bytes |
+---------------------+--------------+------------------------------------------------+
| credentials         : []Credential |                    4 + size(credentials) bytes |
+---------------------+--------------+------------------------------------------------+
                                     |   6 + size(atomic_tx) + len(credentials) bytes |
                                     +------------------------------------------------+
```

### Promo Signé Transaction spécification

```text
message Tx {
    uint16 codec_id = 1;                 // 2 bytes
    AtomicTx atomic_tx = 2;              // size(atomic_tx)
    repeated Credential credentials = 3; // 4 bytes + size(credentials)
}
```

### Signé Transaction Exemple

Faisons une transaction signée qui utilise la transaction nonsignée et credential des exemples précédents.

* **`CodecID`** :` `0
* **`Unsight`**`2003991060eabfb5a571720109b5896e5ff0010a1cfe6b103d585e6ebf27b97a1735d891ad56056d9c01f18f43f58b5c784ad07a4a49cf3d11623804b5c5cba2c6bf0001613a40dcd8d22ea4a99a4c849056317c550b685e45e45954f258001dbcf890f77f49b968727f772937f28a68704a8a704a8f2004a8f28a5704a8f207201720172072017770707107107770707073f2073f53a53a59a597af597a`
* **`Credits`**

   `0×0090010accccf47a8449a84428440e242975138790e41be262f7197f3d93faa26cc8741060d743ffaf025782c8c86b862d2b9febe7d352f0b4591afbd1a737f8a30`

```text
[
    CodecID            <- 0x0000
    UnsignedAtomic Tx  <- 0x0000000100000004ffffffffeeeeeeeeddddddddccccccccbbbbbbbbaaaaaaaa999999998888888800000001000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f000000070000000000003039000000000000d431000000010000000251025c61fbcfc078f69334f834be6dd26d55a955c3344128e060128ede3523a24a461c8943ab085900000001f1e1d1c1b1a191817161514131211101f0e0d0c0b0a09080706050403020100000000005000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f0000000500000000075bcd150000000200000007000000030000000400010203
    Credentials        <- [
        0x00000009000000010acccf47a820549a84428440e2421975138790e41be262f7197f3d93faa26cc8741060d743ffaf025782c8c86b862d2b9febebe7d352f0b4591afbd1a737f8a300,
    ]
]
=
[
    // Codec ID
    0x00, 0x00,
    // unsigned atomic transaction:
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x30, 0x39,
    0x91, 0x06, 0x0e, 0xab, 0xfb, 0x5a, 0x57, 0x17,
    0x20, 0x10, 0x9b, 0x58, 0x96, 0xe5, 0xff, 0x00,
    0x01, 0x0a, 0x1c, 0xfe, 0x6b, 0x10, 0x3d, 0x58,
    0x5e, 0x6e, 0xbf, 0x27, 0xb9, 0x7a, 0x17, 0x35,
    0xd8, 0x91, 0xad, 0x56, 0x05, 0x6d, 0x9c, 0x01,
    0xf1, 0x8f, 0x43, 0xf5, 0x8b, 0x5c, 0x78, 0x4a,
    0xd0, 0x7a, 0x4a, 0x49, 0xcf, 0x3d, 0x1f, 0x11,
    0x62, 0x38, 0x04, 0xb5, 0xcb, 0xa2, 0xc6, 0xbf,
    0x00, 0x00, 0x00, 0x01, 0x66, 0x13, 0xa4, 0x0d,
    0xcd, 0xd8, 0xd2, 0x2e, 0xa4, 0xaa, 0x99, 0xa4,
    0xc8, 0x43, 0x49, 0x05, 0x63, 0x17, 0xcf, 0x55,
    0x0b, 0x66, 0x85, 0xe0, 0x45, 0xe4, 0x59, 0x95,
    0x4f, 0x25, 0x8e, 0x59, 0x00, 0x00, 0x00, 0x01,
    0xdb, 0xcf, 0x89, 0x0f, 0x77, 0xf4, 0x9b, 0x96,
    0x85, 0x76, 0x48, 0xb7, 0x2b, 0x77, 0xf9, 0xf8,
    0x29, 0x37, 0xf2, 0x8a, 0x68, 0x70, 0x4a, 0xf0,
    0x5d, 0xa0, 0xdc, 0x12, 0xba, 0x53, 0xf2, 0xdb,
    0x00, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x74,
    0x6a, 0x52, 0x88, 0x00, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01,
    0x0e, 0xb5, 0xcc, 0xb8, 0x5c, 0x29, 0x00, 0x9b,
    0x60, 0x60, 0xde, 0xcb, 0x35, 0x3a, 0x38, 0xea,
    0x3b, 0x52, 0xcd, 0x20, 0x00, 0x00, 0x00, 0x74,
    0x6a, 0x52, 0x88, 0x00, 0xdb, 0xcf, 0x89, 0x0f,
    0x77, 0xf4, 0x9b, 0x96, 0x85, 0x76, 0x48, 0xb7,
    0x2b, 0x77, 0xf9, 0xf8, 0x29, 0x37, 0xf2, 0x8a,
    0x68, 0x70, 0x4a, 0xf0, 0x5d, 0xa0, 0xdc, 0x12,
    0xba, 0x53, 0xf2, 0xdb,
    // number of credentials:
    0x00, 0x00, 0x00, 0x01,
    // credential[0]:
    0x00, 0x00, 0x00, 0x09, 0x00, 0x00, 0x00, 0x01,
    0x0a, 0xcc, 0xcf, 0x47, 0xa8, 0x20, 0x54, 0x9a,
    0x84, 0x42, 0x84, 0x40, 0xe2, 0x42, 0x19, 0x75,
    0x13, 0x87, 0x90, 0xe4, 0x1b, 0xe2, 0x62, 0xf7,
    0x19, 0x7f, 0x3d, 0x93, 0xfa, 0xa2, 0x6c, 0xc8,
    0x74, 0x10, 0x60, 0xd7, 0x43, 0xff, 0xaf, 0x02,
    0x57, 0x82, 0xc8, 0xc8, 0x6b, 0x86, 0x2d, 0x2b,
    0x9f, 0xeb, 0xeb, 0xe7, 0xd3, 0x52, 0xf0, 0xb4,
    0x59, 0x1a, 0xfb, 0xd1, 0xa7, 0x37, 0xf8, 0xa3,
    0x00,
```

## UTXO

À UTXO est une représentation autonome d'une sortie de transaction.

### What Contient

À UTXO contient `uneCodecID`, `UTXOIndex```, `AssetID`, et `Output`.

* **`CodecID`** seule valide `CodecID` est `00 00`
* **`TxID`** est une transaction32-octets ID. Transaction IDs sont calculés en prenantsha256 des octets de la transaction signée.
* **`UTXOIndex`** est une int qui spécifie quelle sortie dans la transaction spécifiée par **`TxID`** que cette utxo a été créée par.
* **`AssetID`** est une gamme 32-octets qui définit quel atout cette utxo références.
* **`Output`** est l'objet de sortie qui a créé cette utxo. La sérialisation des Outputs a été définieci-dessus.

### Gantt UTXO spécification

```text
+--------------+----------+-------------------------+
| codec_id     : uint16   |                 2 bytes |
+--------------+----------+-------------------------+
| tx_id        : [32]byte |                32 bytes |
+--------------+----------+-------------------------+
| output_index : int      |                 4 bytes |
+--------------+----------+-------------------------+
| asset_id     : [32]byte |                32 bytes |
+--------------+----------+-------------------------+
| output       : Output   |      size(output) bytes |
+--------------+----------+-------------------------+
                          | 70 + size(output) bytes |
                          +-------------------------+
```

### Promo UTXO spécification

```text
message Utxo {
    uint16 codec_id = 1;     // 02 bytes
    bytes tx_id = 2;         // 32 bytes
    uint32 output_index = 3; // 04 bytes
    bytes asset_id = 4;      // 32 bytes
    Output output = 5;       // size(output)
}
```

### UTXO Exemple

Faisons une UTXO de la transactionsignée created ci-dessus :

* **`CodecID`** :` `0
* **`TxID`** :` 0xf966750f438867c3c9828ddcdbe660e21ccdbb36a9276958f011ba472f75d4d4`7
* **`UTXOIndex`** : 0 == 0×000
* **`AssetID`** :` 0×000102030405060708090a0b0c0d0e0f1011415161718191a1b1c1d1e1`f
* **`Output`** :` "Exemple EVMOutput telle que définie ci-dessus`"

```text
[
    CodecID   <- 0x0000
    TxID      <- 0xf966750f438867c3c9828ddcdbe660e21ccdbb36a9276958f011ba472f75d4e7
    UTXOIndex <- 0x00000000
    AssetID   <- 0x000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f
    Output    <-     0x000000070000000000003039000000000000d431000000010000000251025c61fbcfc078f69334f834be6dd26d55a955c3344128e060128ede3523a24a461c8943ab0859
]
=
[
    // Codec ID:
    0x00, 0x00,
    // txID:
    0xf9, 0x66, 0x75, 0x0f, 0x43, 0x88, 0x67, 0xc3,
    0xc9, 0x82, 0x8d, 0xdc, 0xdb, 0xe6, 0x60, 0xe2,
    0x1c, 0xcd, 0xbb, 0x36, 0xa9, 0x27, 0x69, 0x58,
    0xf0, 0x11, 0xba, 0x47, 0x2f, 0x75, 0xd4, 0xe7,
    // utxo index:
    0x00, 0x00, 0x00, 0x00,
    // assetID:
    0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
    0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f,
    0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17,
    0x18, 0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f,
    // output:
    0x00, 0x00, 0x00, 0x07, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x30, 0x39, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0xd4, 0x31, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x02, 0x00, 0x01, 0x02, 0x03,
    0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b,
    0x0c, 0x0d, 0x0e, 0x0f, 0x10, 0x11, 0x12, 0x13,
    0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1a, 0x1b,
    0x1c, 0x1d, 0x1e, 0x1f, 0x20, 0x21, 0x22, 0x23,
    0x24, 0x25, 0x26, 0x27,
]
```

