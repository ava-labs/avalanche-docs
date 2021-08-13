# AVM Format de transaction

Ce fichier est censé être la seule source de vérité pour la façon dont nous we les transactions dans la machine virtuelle Avalanche \(AVM\). Ce document utilise le format [de sérialisation primitive](serialization-primitives.md) pour l'emballage et [secp256k1](cryptographic-primitives.md#secp256k1-addresses) pour l'identification de l'utilisateur cryptographique.

## ID du code

Certaines données sont préparées avec un ID de codec \(unt16\) qui indique comment les données devraient être deserialized. En ce moment, le seul ID de codec valide est 0 \(`0x00 0x00`\).

## Sortie transférable

Les sorties transférables enveloppent une sortie avec un identifiant d'actif.

### Ce que la sortie transférable contient

Une sortie transférable contient un `AssetID` et une [`sortie`](avm-transaction-serialization.md#outputs).

* **`AssetID`** est un tableau 32-octets qui définit quel atout cette sortie références.
* **`La sortie`** est une sortie, telle que définie [ci-dessous](avm-transaction-serialization.md#outputs). Par exemple, il peut s'agir d'une [sortie de transfert SECP256K1](avm-transaction-serialization.md#secp256k1-transfer-output).

### Spécification de sortie transférable Gantt

```text
+----------+----------+-------------------------+
| asset_id : [32]byte |                32 bytes |
+----------+----------+-------------------------+
| output   : Output   |      size(output) bytes |
+----------+----------+-------------------------+
                      | 32 + size(output) bytes |
                      +-------------------------+
```

### Spécification de sortie transférable Proto

```text
message TransferableOutput {
    bytes asset_id = 1; // 32 bytes
    Output output = 2;  // size(output)
}
```

### Exemple de sortie transférable

Faisons une sortie transférable:

* `AssetID`: `0x000102030405060708090a0b0c0d0e0f101131415161718191a1b1c1d1e1f`
* `Sortie `: `"Exemple SECP256K1 sortie de transfert de ci-dessous"`

```text
[
    AssetID <- 0x000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f
    Output  <- 0x000000070000000000003039000000000000d431000000010000000251025c61fbcfc078f69334f834be6dd26d55a955c3344128e060128ede3523a24a461c8943ab0859,
]
=
[
    // assetID:
    0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
    0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f,
    0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17,
    0x18, 0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f,
    // output:
    0x00, 0x00, 0x00, 0x07, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x30, 0x39, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0xd4, 0x31, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x02, 0x51, 0x02, 0x5c, 0x61,
    0xfb, 0xcf, 0xc0, 0x78, 0xf6, 0x93, 0x34, 0xf8,
    0x34, 0xbe, 0x6d, 0xd2, 0x6d, 0x55, 0xa9, 0x55,
    0xc3, 0x34, 0x41, 0x28, 0xe0, 0x60, 0x12, 0x8e,
    0xde, 0x35, 0x23, 0xa2, 0x4a, 0x46, 0x1c, 0x89,
    0x43, 0xab, 0x08, 0x59,
]
```

## Entrée transférable

Les entrées transférables décrivent un UTXO spécifique avec une entrée de transfert fournie.

### Ce que l'entrée transférable contient

Une entrée transférable contient un `TxID`, `UTXOIndex` `AssetID` et une `entrée`.

* **`TxID`** est un tableau 32-octets qui définit quelle transaction cette entrée consomme une sortie de. Les ID de transaction sont calculés en prenant sha256 des octets de la transaction signée.
* **`UTXOIndex`** est une int qui définit lequel utxo cette entrée est consommatrice dans la transaction spécifiée.
* **`AssetID`** est un tableau 32-octets qui définit quel atout cette référence d'entrée.
* **`L'entrée`** est une entrée, telle que définie ci-dessous. Ceci peut actuellement être seulement une [entrée de transfert SECP256K1](avm-transaction-serialization.md#secp256k1-transfer-input)

### Spécifications d'entrée transférables Gantt

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

### Spécifications d'entrée transférables Proto

```text
message TransferableInput {
    bytes tx_id = 1;       // 32 bytes
    uint32 utxo_index = 2; // 04 bytes
    bytes asset_id = 3;    // 32 bytes
    Input input = 4;       // size(input)
}
```

### Exemple d'entrée transférable

Faisons une entrée transférable:

* `TxID`: `0xf1e1d1c1b1a19181716151413121101f0e0c0b0a090807060504030201000`
* `UTXOIndex`: `5`
* `AssetID`: `0x000102030405060708090a0b0c0d0e0f101131415161718191a1b1c1d1e1f`
* `Entrée``: "Exemple SECP256K1 Entrée de transfert de ci-dessous"`

```text
[
    TxID      <- 0xf1e1d1c1b1a191817161514131211101f0e0d0c0b0a090807060504030201000
    UTXOIndex <- 0x00000005
    AssetID   <- 0x000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f
    Input     <- 0x0000000500000000075bcd15000000020000000700000003
]
=
[
    // txID:
    0xf1, 0xe1, 0xd1, 0xc1, 0xb1, 0xa1, 0x91, 0x81,
    0x71, 0x61, 0x51, 0x41, 0x31, 0x21, 0x11, 0x01,
    0xf0, 0xe0, 0xd0, 0xc0, 0xb0, 0xa0, 0x90, 0x80,
    0x70, 0x60, 0x50, 0x40, 0x30, 0x20, 0x10, 0x00,
    // utxoIndex:
    0x00, 0x00, 0x00, 0x05,
    // assetID:
    0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
    0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f,
    0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17,
    0x18, 0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f,
    // input:
    0x00, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x00,
    0x07, 0x5b, 0xcd, 0x15, 0x00, 0x00, 0x00, 0x02,
    0x00, 0x00, 0x00, 0x03, 0x00, 0x00, 0x00, 0x07
]
```

## Op transférable

Les opérations transférables décrivent un ensemble of avec une opération de transfert fournie. Seul un ID d'actif est capable d'être référencé par opération.

### Ce que Up transférable Contient

Une opération transférable contient un `AssetID`, `UTXOIDs`, et un `TransferOp`.

* **`AssetID`** est un tableau 32-octets qui définit quel atout cette opération change.
* **`UTXOIDS`** est un tableau de tuples TxID-OutputIndex Ce tableau doit être trié dans lexicographique.
* **`TransferOp`** est un [objet d'opération transférable](avm-transaction-serialization.md#operations).

### spécification d'op transférable Gantt

```text
+-------------+------------+------------------------------+
| asset_id    : [32]byte   |                     32 bytes |
+-------------+------------+------------------------------+
| utxo_ids    : []UTXOID   | 4 + 36 * len(utxo_ids) bytes |
+-------------+------------+------------------------------+
| transfer_op : TransferOp |      size(transfer_op) bytes |
+-------------+------------+------------------------------+
                           |   36 + 36 * len(utxo_ids)    |
                           |    + size(transfer_op) bytes |
                           +------------------------------+
```

### Spécification d'Op transférable Proto

```text
message UTXOID {
    bytes tx_id = 1;       // 32 bytes
    uint32 utxo_index = 2; // 04 bytes
}
message TransferableOp {
    bytes asset_id = 1;           // 32 bytes
    repeated UTXOID utxo_ids = 2; // 4 + 36 * len(utxo_ids) bytes
    TransferOp transfer_op = 3;   // size(transfer_op)
}
```

### Exemple d'op transférable

Faisons une opération transférable:

* `AssetID`: `0x000102030405060708090a0b0c0d0e0f101131415161718191a1b1c1d1e1f`
* `UTXOIDS`:
   * `UTXOID` :
      * `TxID`: `0xf1e1d1c1b1a19181716151413121101f0e0c0b0a090807060504030201000`
      * `UTXOIndex`: `5`
* `Op`: `"Exemple de transfert Op depuis dessous"`

```text
[
    AssetID   <- 0x000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f
    UTXOIDs   <- [
        {
            TxID:0xf1e1d1c1b1a191817161514131211101f0e0d0c0b0a090807060504030201000
            UTXOIndex:5
        }
    ]
    Op     <- 0x0000000d0000000200000003000000070000303900000003431100000000010000000251025c61fbcfc078f69334f834be6dd26d55a955c3344128e060128ede3523a24a461c8943ab0859
]
=
[
    // assetID:
    0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
    0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f,
    0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17,
    0x18, 0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f,
    // number of utxoIDs:
    0x00, 0x00, 0x00, 0x01,
    // txID:
    0xf1, 0xe1, 0xd1, 0xc1, 0xb1, 0xa1, 0x91, 0x81,
    0x71, 0x61, 0x51, 0x41, 0x31, 0x21, 0x11, 0x01,
    0xf0, 0xe0, 0xd0, 0xc0, 0xb0, 0xa0, 0x90, 0x80,
    0x70, 0x60, 0x50, 0x40, 0x30, 0x20, 0x10, 0x00,
    // utxoIndex:
    0x00, 0x00, 0x00, 0x05,
    // op:
    0x00, 0x00, 0x00, 0x0d, 0x00, 0x00, 0x00, 0x02,
    0x00, 0x00, 0x00, 0x03, 0x00, 0x00, 0x00, 0x07,
    0x00, 0x00, 0x30, 0x39, 0x00, 0x00, 0x00, 0x03,
    0x43, 0x11, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00,
    0x00, 0x00, 0x02, 0x51, 0x02, 0x5c, 0x61, 0xfb,
    0xcf, 0xc0, 0x78, 0xf6, 0x93, 0x34, 0xf8, 0x34,
    0xbe, 0x6d, 0xd2, 0x6d, 0x55, 0xa9, 0x55, 0xc3,
    0x34, 0x41, 0x28, 0xe0, 0x60, 0x12, 0x8e, 0xde,
    0x35, 0x23, 0xa2, 0x4a, 0x46, 0x1c, 0x89, 0x43,
    0xab, 0x08, 0x59,
]
```

## Extrants

Les sorties ont quatre types possibles: [`SECP256K1TransferOutput`](avm-transaction-serialization.md#secp256k1-transfer-output), [`SECP256K1MintOutput`](avm-transaction-serialization.md#secp256k1-mint-output), [`NFTTransferOutput`](avm-transaction-serialization.md#nft-transfer-output) et [`NFTMintOutput`](avm-transaction-serialization.md#nft-mint-output).

## Sortie de transfert SECP256K1

Une sortie de transfert [secp256k1](cryptographic-primitives.md#secp-256-k1-addresses) permet d'envoyer une quantité d'un actif à une collection d'adresses après une période unix spécifiée.

### **Qu'est-ce que la sortie de transfert SECP256KK contient**

Une sortie de transfert secp256k1 contient un `TypeID`, `Montant`, `Locktime`, `Seuil` et `Addresses`.

* **`TypeID`** est l'ID de ce type de sortie. Il est `0x007`.
* **`Le montant`** est une longue qui spécifie la quantité de l'actif que cette sortie possède. Doit être positive.
* **`Locktime`** est une longue qui contient the unix que cette sortie peut être dépensée après. The unix est spécifique à la seconde.
* **`Seuil`** est une int qui nomme le nombre de signatures uniques requises pour dépenser la sortie. Doit être inférieure ou égale à la longueur des **`adresses`**. Si **`les adresses`** sont vides, doit être 0.
* **`Les`** adresses sont une liste d'adresses uniques qui correspondent aux clés privées qui peuvent être utilisées pour dépenser cette sortie. Les adresses doivent être triées lexicographiquement.

### **Spécifications de sortie de transfert Gantt SECP256K1**

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

### **Spécifications de sortie de transfert de prototype SECP256K1**

```text
message SECP256K1TransferOutput {
    uint32 typeID = 1;            // 04 bytes
    uint64 amount = 2;            // 08 bytes
    uint64 locktime = 3;          // 08 bytes
    uint32 threshold = 4;         // 04 bytes
    repeated bytes addresses = 5; // 04 bytes + 20 bytes * len(addresses)
}
```

### **SECP256KK Exemple de sortie de transfert**

Let’s sortie de transfert secp256k1 avec:

* **`TypeID`**: `7`
* **`Montant`**: `12345`
* **`Heure d'arrêt`**: `54321`
* **`Seuil`**: `1`
* **`Adresses `**:
* `0x51025c61fbcfc078f69334f834be6dd26d55a955`
* `0xc3344128e060128e3523a24a461c8943ab0859`

```text
[
    TypeID    <- 0x00000007
    Amount    <- 0x0000000000003039
    Locktime  <- 0x000000000000d431
    Threshold <- 0x00000001
    Addresses <- [
        0x51025c61fbcfc078f69334f834be6dd26d55a955,
        0xc3344128e060128ede3523a24a461c8943ab0859,
    ]
]
=
[
    // typeID:
    0x00, 0x00, 0x00, 0x07,
    // amount:
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x30, 0x39,
    // locktime:
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xd4, 0x31,
    // threshold:
    0x00, 0x00, 0x00, 0x01,
    // number of addresses:
    0x00, 0x00, 0x00, 0x02,
    // addrs[0]:
    0x51, 0x02, 0x5c, 0x61, 0xfb, 0xcf, 0xc0, 0x78,
    0xf6, 0x93, 0x34, 0xf8, 0x34, 0xbe, 0x6d, 0xd2,
    0x6d, 0x55, 0xa9, 0x55,
    // addrs[1]:
    0xc3, 0x34, 0x41, 0x28, 0xe0, 0x60, 0x12, 0x8e,
    0xde, 0x35, 0x23, 0xa2, 0x4a, 0x46, 0x1c, 0x89,
    0x43, 0xab, 0x08, 0x59,
]
```

## Sortie de la Monnaie SECP256K1

Une sortie [secp256k1](cryptographic-primitives.md#secp-256-k1-addresses) mint est une sortie qui est détenue par une collection d'adresses.

### **Que la sortie de la Monnaie SECP256K1 contient**

Une sortie secp256k1 Mint contient un `TypeID`, `Locktime`, `Seuil` et `Addresses`.

* **`TypeID`** est l'ID de ce type de sortie. Il est `0x006`.
* **`Locktime`** est une longue qui contient the unix que cette sortie peut être dépensée après. The unix est spécifique à la seconde.
* **`Seuil`** est une int qui nomme le nombre de signatures uniques requises pour dépenser la sortie. Doit être inférieure ou égale à la longueur des **`adresses`**. Si **`les adresses`** sont vides, doit être 0.
* **`Les`** adresses sont une liste d'adresses uniques qui correspondent aux clés privées qui peuvent être utilisées pour dépenser cette sortie. Les adresses doivent être triées lexicographiquement.

### **Spécifications de sortie de la Monnaie Gantt SECP256K1**

```text
+-----------+------------+--------------------------------+
| type_id   : int        |                       4 bytes  |
+-----------+------------+--------------------------------+
| locktime  : long       |                       8 bytes  |
+-----------+------------+--------------------------------+
| threshold : int        |                       4 bytes  |
+-----------+------------+--------------------------------+
| addresses : [][20]byte |  4 + 20 * len(addresses) bytes |
+-----------+------------+--------------------------------+
                         | 20 + 20 * len(addresses) bytes |
                         +--------------------------------+
```

### **Spécifications de sortie de la Monnaie de Proto SECP256K1**

```text
message SECP256K1MintOutput {
    uint32 typeID = 1;            // 04 bytes
    uint64 locktime = 2;          // 08 bytes
    uint32 threshold = 3;         // 04 bytes
    repeated bytes addresses = 4; // 04 bytes + 20 bytes * len(addresses)
}
```

### **SECP256K1 Exemple de sortie de la Monnaie**

Let’s sortie de menthe SECP256K1 avec:

* **`TypeID`**: `6`
* **`Heure d'arrêt`**: `54321`
* **`Seuil`**: `1`
* **`Adresses `**:
* `0x51025c61fbcfc078f69334f834be6dd26d55a955`
* `0xc3344128e060128e3523a24a461c8943ab0859`

```text
[
    TypeID    <- 0x00000006
    Locktime  <- 0x000000000000d431
    Threshold <- 0x00000001
    Addresses <- [
        0x51025c61fbcfc078f69334f834be6dd26d55a955,
        0xc3344128e060128ede3523a24a461c8943ab0859,
    ]
]
=
[
    // typeID:
    0x00, 0x00, 0x00, 0x06,
    // locktime:
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xd4, 0x31,
    // threshold:
    0x00, 0x00, 0x00, 0x01,
    // number of addresses:
    0x00, 0x00, 0x00, 0x02,
    // addrs[0]:
    0x51, 0x02, 0x5c, 0x61, 0xfb, 0xcf, 0xc0, 0x78,
    0xf6, 0x93, 0x34, 0xf8, 0x34, 0xbe, 0x6d, 0xd2,
    0x6d, 0x55, 0xa9, 0x55,
    // addrs[1]:
    0xc3, 0x34, 0x41, 0x28, 0xe0, 0x60, 0x12, 0x8e,
    0xde, 0x35, 0x23, 0xa2, 0x4a, 0x46, 0x1c, 0x89,
    0x43, 0xab, 0x08, 0x59,
]
```

## Sortie de transfert NFT

Une sortie de transfert NFT est une sortie NFT qui est détenue par une collection d'adresses.

### **Qu'est-ce que la sortie de transfert NFT contient**

Une sortie de transfert NFT contient un `TypeID`, `GroupID`, `charge` utile, `temps de` verrouillage, `Seuil` et `adresses`.

* **`TypeID`** est l'ID de ce type de sortie. Il est `0x00b`.
* **`GroupID`** est une int qui spécifie le groupe avec lequel ce NFT a été délivré.
* **`La charge utile`** est une chaîne arbitraire d'octets pas long plus que 1024 octets.
* **`Locktime`** est une longue qui contient the unix que cette sortie peut être dépensée après. The unix est spécifique à la seconde.
* **`Seuil`** est une int qui nomme le nombre de signatures uniques requises pour dépenser la sortie. Doit être inférieure ou égale à la longueur des **`adresses`**. Si **`les adresses`** sont vides, doit être 0.
* **`Les`** adresses sont une liste d'adresses uniques qui correspondent aux clés privées qui peuvent être utilisées pour dépenser cette sortie. Les adresses doivent être triées lexicographiquement.

### **Spécifications de sortie de transfert NFT Gantt**

```text
+-----------+------------+-------------------------------+
| type_id   : int        |                       4 bytes |
+-----------+------------+-------------------------------+
| group_id  : int        |                       4 bytes |
+-----------+------------+-------------------------------+
| payload   : []byte     |        4 + len(payload) bytes |
+-----------+------------+-------------------------------+
| locktime  : long       |                       8 bytes |
+-----------+------------+-------------------------------+
| threshold : int        |                       4 bytes |
+-----------+------------+-------------------------------+
| addresses : [][20]byte | 4 + 20 * len(addresses) bytes |
+-----------+------------+-------------------------------+
                         |             28 + len(payload) |
                         |  + 20 * len(addresses) bytes  |
                         +-------------------------------+
```

### **Spécifications de sortie de transfert de prototype NFT**

```text
message NFTTransferOutput {
    uint32 typeID = 1;            // 04 bytes
    uint32 group_id = 2;          // 04 bytes
    bytes payload = 3;            // 04 bytes + len(payload)
    uint64 locktime = 4           // 08 bytes
    uint32 threshold = 5;         // 04 bytes
    repeated bytes addresses = 6; // 04 bytes + 20 bytes * len(addresses)
}
```

### **Exemple de sortie de transfert NFT**

Faisons une sortie de transfert NFT avec:

* **`TypeID`**: `11`
* **`GroupeID`**: `12345`
* **`Charge utile`**: `0x431100`
* **`Heure d'arrêt`**: `54321`
* **`Seuil`**: `1`
* **`Adresses `**:
* `0x51025c61fbcfc078f69334f834be6dd26d55a955`
* `0xc3344128e060128e3523a24a461c8943ab0859`

```text
[
    TypeID    <- 0x0000000b
    GroupID   <- 0x00003039
    Payload   <- 0x431100
    Locktime  <- 0x000000000000d431
    Threshold <- 0x00000001
    Addresses <- [
        0x51025c61fbcfc078f69334f834be6dd26d55a955,
        0xc3344128e060128ede3523a24a461c8943ab0859,
    ]
]
=
[
    // TypeID:
    0x00, 0x00, 0x00, 0x0b,
    // groupID:
    0x00, 0x00, 0x30, 0x39,
    // length of payload:
    0x00, 0x00, 0x00, 0x03,
    // payload:
    0x43, 0x11, 0x00,
    // locktime:
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xd4, 0x31,
    // threshold:
    0x00, 0x00, 0x00, 0x01,
    // number of addresses:
    0x00, 0x00, 0x00, 0x02,
    // addrs[0]:
    0x51, 0x02, 0x5c, 0x61, 0xfb, 0xcf, 0xc0, 0x78,
    0xf6, 0x93, 0x34, 0xf8, 0x34, 0xbe, 0x6d, 0xd2,
    0x6d, 0x55, 0xa9, 0x55,
    // addrs[1]:
    0xc3, 0x34, 0x41, 0x28, 0xe0, 0x60, 0x12, 0x8e,
    0xde, 0x35, 0x23, 0xa2, 0x4a, 0x46, 0x1c, 0x89,
    0x43, 0xab, 0x08, 0x59,
]
```

## Sortie Mint NFT

Une sortie NFT mint est une NFT qui est détenue par une collection d'adresses.

### **Ce que la sortie NFT Mint contient**

Une sortie NFT Mint contient un `TypeID`, `GroupID`, `Locktime`, `Seuil` et `Addresses`.

* **`TypeID`** est l'ID de ce type de sortie. Il est `0x00a`.
* **`GroupID`** est une int qui spécifie le groupe auquel cette NFT est délivrée.
* **`Locktime`** est une longue qui contient the unix que cette sortie peut être dépensée après. The unix est spécifique à la seconde.
* **`Seuil`** est une int qui nomme le nombre de signatures uniques requises pour dépenser la sortie. Doit être inférieure ou égale à la longueur des **`adresses`**. Si **`les adresses`** sont vides, doit être 0.
* **`Les`** adresses sont une liste d'adresses uniques qui correspondent aux clés privées qui peuvent être utilisées pour dépenser cette sortie. Les adresses doivent être triées lexicographiquement.

### **spécification de sortie Gantt NFT**

```text
+-----------+------------+--------------------------------+
| type_id   : int        |                        4 bytes |
+-----------+------------+--------------------------------+
| group_id  : int        |                        4 bytes |
+-----------+------------+--------------------------------+
| locktime  : long       |                        8 bytes |
+-----------+------------+--------------------------------+
| threshold : int        |                        4 bytes |
+-----------+------------+--------------------------------+
| addresses : [][20]byte |  4 + 20 * len(addresses) bytes |
+-----------+------------+--------------------------------+
                         | 24 + 20 * len(addresses) bytes |
                         +--------------------------------+
```

### **Spécifications de sortie de la Monnaie de Proto**

```text
message NFTMintOutput {
    uint32 typeID = 1;            // 04 bytes
    uint32 group_id = 2;          // 04 bytes
    uint64 locktime = 3;          // 08 bytes
    uint32 threshold = 4;         // 04 bytes
    repeated bytes addresses = 5; // 04 bytes + 20 bytes * len(addresses)
}
```

### **Exemple de sortie Mint NFT**

Faisons une sortie NFT de la menthe avec:

* **`TypeID`**: `10`
* **`GroupeID`**: `12345`
* **`Heure d'arrêt`**: `54321`
* **`Seuil`**: `1`
* **`Adresses `**:
* `0x51025c61fbcfc078f69334f834be6dd26d55a955`
* `0xc3344128e060128e3523a24a461c8943ab0859`

```text
[
    TypeID    <- 0x0000000a
    GroupID   <- 0x00003039
    Locktime  <- 0x000000000000d431
    Threshold <- 0x00000001
    Addresses <- [
        0x51025c61fbcfc078f69334f834be6dd26d55a955,
        0xc3344128e060128ede3523a24a461c8943ab0859,
    ]
]
=
[
    // TypeID
    0x00, 0x00, 0x00, 0x0a,
    // groupID:
    0x00, 0x00, 0x30, 0x39,
    // locktime:
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xd4, 0x31,
    // threshold:
    0x00, 0x00, 0x00, 0x01,
    // number of addresses:
    0x00, 0x00, 0x00, 0x02,
    // addrs[0]:
    0x51, 0x02, 0x5c, 0x61, 0xfb, 0xcf, 0xc0, 0x78,
    0xf6, 0x93, 0x34, 0xf8, 0x34, 0xbe, 0x6d, 0xd2,
    0x6d, 0x55, 0xa9, 0x55,
    // addrs[1]:
    0xc3, 0x34, 0x41, 0x28, 0xe0, 0x60, 0x12, 0x8e,
    0xde, 0x35, 0x23, 0xa2, 0x4a, 0x46, 0x1c, 0x89,
    0x43, 0xab, 0x08, 0x59,
]
```

## Entrées

Les entrées ont un type possible: `SECP256K1TransferInput`.

## SECP256K1 Entrée de transfert

Une entrée de transfert [secp256k1](cryptographic-primitives.md#secp-256-k1-addresses) permet de dépenser une sortie de transfert secp256k1.

### **Qu'est-ce que SECP256KK entrée de transfert Contient**

Une entrée de transfert secp256k1 contient une `quantité` et des `Indices`.

* **`TypeID`** est l'ID de ce type d'entrée. Il est `0x005`.
* **`La quantité`** est une longue qui spécifie la quantité que cette entrée devrait consommer à partir de this Doit être positive. Doit être égal à la quantité spécifiée dans the
* **`AddressIndices`** est une liste d'indices uniques qui définissent les clés privées qui sont utilisées pour dépenser of Chaque UTXO dispose d'une gamme d'adresses qui peuvent dépenser of Chaque int représente l'index dans ce tableau d'adresses qui signera cette transaction. Le tableau doit être trié de bas à haut.

### **Spécifications d'entrée de transfert Gantt SECP256K1**

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

### **Spécifications d'entrée de transfert de prototype SECP256K1**

```text
message SECP256K1TransferInput {
    uint32 typeID = 1;                   // 04 bytes
    uint64 amount = 2;                   // 08 bytes
    repeated uint32 address_indices = 3; // 04 bytes + 04 bytes * len(address_indices)
}
```

### **SECP256K1 Exemple d'entrée de transfert**

Faisons une entrée de paiement avec:

* **`TypeId`**: `5`
* **`Montant`**: `123456789`
* **`Indices d'adresses`**: \[`3`,`7`\]

```text
[
    TypeID         <- 0x00000005
    Amount         <- 123456789 = 0x00000000075bcd15,
    AddressIndices <- [0x00000003, 0x00000007]
]
=
[
    // type id:
    0x00, 0x00, 0x00, 0x05,
    // amount:
    0x00, 0x00, 0x00, 0x00, 0x07, 0x5b, 0xcd, 0x15,
    // length:
    0x00, 0x00, 0x00, 0x02,
    // sig[0]
    0x00, 0x00, 0x00, 0x03,
    // sig[1]
    0x00, 0x00, 0x00, 0x07,
]
```

## Opérations

Les opérations ont trois types possibles: `SECP256K1MintOperation`, `NFTMintOp`, et `NFTTransferOp`.

## **SECP256K1 Opération de la Monnaie**

Une opération [secp256k1](cryptographic-primitives.md#secp-256-k1-addresses) menthe consomme une sortie SECP256K1, crée une nouvelle sortie de menthe et envoie une sortie de transfert à un nouvel ensemble de propriétaires.

### **Que SECP256K1 Opération Mint Contient**

Une opération secp256k1 Mint contient un `TypeID`, `Indices`, Indices, `MintOutput`, et `TransferOutput`.

* **`TypeID`** est l'ID de ce type de sortie. Il est `0x008`.
* **`AddressIndices`** est une liste d'indices uniques qui définissent les clés privées qui sont utilisées pour dépenser [of](avm-transaction-serialization.md#utxo) Chaque UTXO dispose d'une gamme d'adresses qui peuvent dépenser of Chaque int représente l'index dans ce tableau d'adresses qui signera cette transaction. Le tableau doit être trié de bas à haut.
* **`MintOutput`** est une [sortie Mint SECP256K1](avm-transaction-serialization.md#secp256k1-mint-output).
* **`TransferOutput`** est une [sortie de transfert SECP256K1](avm-transaction-serialization.md#secp256k1-transfer-output).

### **Gantt SECP256K1 spécification d'opération de la Monnaie**

```text
+----------------------------------+------------------------------------+
| type_id         : int            |                            4 bytes |
+----------------------------------+------------------------------------+
| address_indices : []int          | 4 + 4 * len(address_indices) bytes |
+----------------------------------+------------------------------------+
| mint_output     : MintOutput     |            size(mint_output) bytes |
+----------------------------------+------------------------------------+
| transfer_output : TransferOutput |        size(transfer_output) bytes |
+----------------------------------+------------------------------------+
                                   |       8 + 4 * len(address_indices) |
                                   |                + size(mint_output) |
                                   |      + size(transfer_output) bytes |
                                   +------------------------------------+
```

### **Promo SECP256K1 spécification d'opération de la Monnaie**

```text
message SECP256K1MintOperation {
    uint32 typeID = 1;                   // 4 bytes
    repeated uint32 address_indices = 2; // 04 bytes + 04 bytes * len(address_indices)
    MintOutput mint_output = 3;          // size(mint_output
    TransferOutput transfer_output = 4;  // size(transfer_output)
}
```

### **SECP256K1 Exemple d'opération de la Monnaie**

Faisons-le une opération de menthe [secp256k1](cryptographic-primitives.md#secp-256-k1-addresses) avec:

* **`TypeId`**: `8`
* **`Indices d'adresses`**:
* `0x003`
* `0x007`
* **`MintOutput`**: `"Exemple SECP256K1 Sortie de la Monnaie de dessus"`
* **`TransferOutput`**: `"Exemple SECP256K1 Sortie de transfert depuis haut"`

```text
[
    TypeID <- 0x00000008
    AddressIndices <- [0x00000003, 0x00000007]
    MintOutput <- 0x00000006000000000000d431000000010000000251025c61fbcfc078f69334f834be6dd26d55a955c3344128e060128ede3523a24a461c89
    TransferOutput <- 0x000000070000000000003039000000000000d431000000010000000251025c61fbcfc078f69334f834be6dd26d55a955c3344128e060128ede3523a24a461c8943ab0859
]
=
[
    // typeID
    0x00, 0x00, 0x00, 0x08,
    // number of address_indices:
    0x00, 0x00, 0x00, 0x02,
    // address_indices[0]:
    0x00, 0x00, 0x00, 0x03,
    // address_indices[1]:
    0x00, 0x00, 0x00, 0x07,
    // mint output
    0x00, 0x00, 0x00, 0x06, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0xd4, 0x31, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x02, 0x51, 0x02, 0x5c, 0x61,
    0xfb, 0xcf, 0xc0, 0x78, 0xf6, 0x93, 0x34, 0xf8,
    0x34, 0xbe, 0x6d, 0xd2, 0x6d, 0x55, 0xa9, 0x55,
    0xc3, 0x34, 0x41, 0x28, 0xe0, 0x60, 0x12, 0x8e,
    0xde, 0x35, 0x23, 0xa2, 0x4a, 0x46, 0x1c, 0x89,
    0x43, 0xab, 0x08, 0x59,
    // transfer output
    0x00, 0x00, 0x00, 0x07, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x30, 0x39, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0xd4, 0x31, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x02, 0x51, 0x02, 0x5c, 0x61,
    0xfb, 0xcf, 0xc0, 0x78, 0xf6, 0x93, 0x34, 0xf8,
    0x34, 0xbe, 0x6d, 0xd2, 0x6d, 0x55, 0xa9, 0x55,
    0xc3, 0x34, 0x41, 0x28, 0xe0, 0x60, 0x12, 0x8e,
    0xde, 0x35, 0x23, 0xa2, 0x4a, 0x46, 0x1c, 0x89,
    0x43, 0xab, 0x08, 0x59,
]
```

## NFT Mint Op

Une opération de menthe NFT consomme une sortie de menthe NFT et envoie une sortie non passée à un nouvel ensemble de propriétaires.

### **Ce que NFT Mint Op Contient**

Une opération NFT mint contient un `TypeID`, `Indices`, `GroupID`, `Charge utile` et `sortie` des adresses.

* **`TypeID`** est l'ID de ce type d'opération. Il est `0x00c`.
* **`AddressIndices`** est une liste d'indices uniques qui définissent les clés privées qui sont utilisées pour dépenser of Chaque UTXO dispose d'une gamme d'adresses qui peuvent dépenser of Chaque int représente l'index dans ce tableau d'adresses qui signera cette transaction. Le tableau doit être trié de bas à haut.
* **`GroupID`** est une int qui spécifie le groupe auquel cette NFT est délivrée.
* **`La charge utile`** est une chaîne arbitraire d'octets n'excédant pas 1024 octets.
* **`Sortie`** n'est pas un `Sortie transférable`, mais plutôt un temps de verrouillage, un seuil, et un tableau d'adresses uniques qui correspondent aux clés privées qui peuvent être utilisées pour dépenser cette sortie. Les adresses doivent être triées lexicographiquement.

### **spécification d'Op Gantt NFT**

```text
+------------------------------+------------------------------------+
| type_id         : int        |                            4 bytes |
+-----------------+------------+------------------------------------+
| address_indices : []int      | 4 + 4 * len(address_indices) bytes |
+-----------------+------------+------------------------------------+
| group_id        : int        |                            4 bytes |
+-----------------+------------+------------------------------------+
| payload         : []byte     |             4 + len(payload) bytes |
+-----------------+------------+------------------------------------+
| outputs         : []Output   |            4 + size(outputs) bytes |
+-----------------+------------+------------------------------------+
                               |                               20 + |
                               |         4 * len(address_indices) + |
                               |                     len(payload) + |
                               |                size(outputs) bytes |
                               +------------------------------------+
```

### **Spécifications d'Op Mint de Proto NFT**

```text
message NFTMintOp {
    uint32 typeID = 1;                   // 04 bytes
    repeated uint32 address_indices = 2; // 04 bytes + 04 bytes * len(address_indices)
    uint32 group_id = 3;                 // 04 bytes
    bytes payload = 4;                   // 04 bytes + len(payload)
    repeated bytes outputs = 5;          // 04 bytes + size(outputs)
}
```

### **Exemple d'Op Mint NFT**

Faisons une opération de menthe NFT avec:

* **`TypeId`**: `12`
* **`Indices d'adresses`**:
   * `0x003`
   * `0x007`
* **`GroupeID`**: `12345`
* **`Charge utile`**: `0x431100`
* **`Heure d'arrêt`**: `54321`
* **`Seuil`**: `1`
* **`Adresses `**:
* `0xc3344128e060128e3523a24a461c8943ab0859`

```text
[
    TypeID         <- 0x0000000c
    AddressIndices <- [
        0x00000003,
        0x00000007,
    ]
    GroupID        <- 0x00003039
    Payload        <- 0x431100
    Locktime       <- 0x000000000000d431
    Threshold      <- 0x00000001
    Addresses      <- [
        0xc3344128e060128ede3523a24a461c8943ab0859
    ]
]
=
[
    // Type ID
    0x00, 0x00, 0x00, 0x0c,
    // number of address indices:
    0x00, 0x00, 0x00, 0x02,
    // address index 0:
    0x00, 0x00, 0x00, 0x03,
    // address index 1:
    0x00, 0x00, 0x00, 0x07,
    // groupID:
    0x00, 0x00, 0x30, 0x39,
    // length of payload:
    0x00, 0x00, 0x00, 0x03,
    // payload:
    0x43, 0x11, 0x00,
    // number of outputs:
    0x00, 0x00, 0x00, 0x01,
    // outputs[0]
    // locktime:
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xd4, 0x31,
    // threshold:
    0x00, 0x00, 0x00, 0x01,
    // number of addresses:
    0x00, 0x00, 0x00, 0x01,
    // addrs[0]:
    0xc3, 0x34, 0x41, 0x28, 0xe0, 0x60, 0x12, 0x8e,
    0xde, 0x35, 0x23, 0xa2, 0x4a, 0x46, 0x1c, 0x89,
    0x43, 0xab, 0x08, 0x59,
]
```

## NFT Transfert Op

Une opération de transfert NFT envoie une sortie de transfert NFT non utilisée à un nouvel ensemble de propriétaires.

### **Ce que NFT Transfert Op Contient**

Une opération de transfert NFT contient un `TypeID`, `des Indices` d'adresse et un `NFTTransferOutput` non saisi.

* **`TypeID`** est l'ID de ce type de sortie. Il est `0x00d`.
* **`AddressIndices`** est une liste d'indices uniques qui définissent les clés privées qui sont utilisées pour dépenser of Chaque UTXO dispose d'une gamme d'adresses qui peuvent dépenser of Chaque int représente l'index dans ce tableau d'adresses qui signera cette transaction. Le tableau doit être trié de bas à haut.
* **`NFTTransferOutput`** est la sortie de cette opération et doit être un [sortie de transfert NFT](avm-transaction-serialization.md#nft-transfer-output). Cette sortie n'a pas le **`TypeId`**, parce que le type est connu par le contexte d'être dans cette opération.

### **Spécifications de transfert NFT Gantt**

```text
+------------------------------+------------------------------------+
| type_id         : int        |                            4 bytes |
+-----------------+------------+------------------------------------+
| address_indices : []int      | 4 + 4 * len(address_indices) bytes |
+-----------------+------------+------------------------------------+
| group_id        : int        |                            4 bytes |
+-----------------+------------+------------------------------------+
| payload         : []byte     |             4 + len(payload) bytes |
+-----------------+------------+------------------------------------+
| locktime        : long       |                            8 bytes |
+-----------+------------+------------------------------------------+
| threshold       : int        |                            4 bytes |
+-----------------+------------+------------------------------------+
| addresses       : [][20]byte |      4 + 20 * len(addresses) bytes |
+-----------------+------------+------------------------------------+
                               |                  36 + len(payload) |
                               |        + 4 * len(address_indices)  |
                               |        + 20 * len(addresses) bytes |
                               +------------------------------------+
```

### **Spécifications de transfert Op de prototype NFT**

```text
message NFTTransferOp {
    uint32 typeID = 1;                   // 04 bytes
    repeated uint32 address_indices = 2; // 04 bytes + 04 bytes * len(address_indices)
    uint32 group_id = 3;                 // 04 bytes
    bytes payload = 4;                   // 04 bytes + len(payload)
    uint64 locktime = 5;                 // 08 bytes
    uint32 threshold = 6;                // 04 bytes
    repeated bytes addresses = 7;        // 04 bytes + 20 bytes * len(addresses)
}
```

### **Exemple de transfert Op NFT**

Faisons une opération de transfert NFT avec:

* **`TypeID`**: `13`
* **`Indices d'adresses`**:
* `0x007`
* `0x003`
* **`GroupeID`**: `12345`
* **`Charge utile`**: `0x431100`
* **`Heure d'arrêt`**: `54321`
* **`Seuil`**: `1`
* **`Adresses `**:
* `0xc3344128e060128e3523a24a461c8943ab0859`
* `0x51025c61fbcfc078f69334f834be6dd26d55a955`

```text
[
    TypeID         <- 0x0000000d
    AddressIndices <- [
        0x00000007,
        0x00000003,
    ]
    GroupID        <- 0x00003039
    Payload        <- 0x431100
    Locktime       <- 0x000000000000d431
    Threshold      <- 00000001
    Addresses      <- [
        0x51025c61fbcfc078f69334f834be6dd26d55a955,
        0xc3344128e060128ede3523a24a461c8943ab0859,
    ]
]
=
[
    // Type ID
    0x00, 0x00, 0x00, 0x0d,
    // number of address indices:
    0x00, 0x00, 0x00, 0x02,
    // address index 0:
    0x00, 0x00, 0x00, 0x07,
    // address index 1:
    0x00, 0x00, 0x00, 0x03,
    // groupID:
    0x00, 0x00, 0x30, 0x39,
    // length of payload:
    0x00, 0x00, 0x00, 0x03,
    // payload:
    0x43, 0x11, 0x00,
    // locktime:
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xd4, 0x31,
    // threshold:
    0x00, 0x00, 0x00, 0x01,
    // number of addresses:
    0x00, 0x00, 0x00, 0x02,
    // addrs[0]:
    0x51, 0x02, 0x5c, 0x61, 0xfb, 0xcf, 0xc0, 0x78,
    0xf6, 0x93, 0x34, 0xf8, 0x34, 0xbe, 0x6d, 0xd2,
    0x6d, 0x55, 0xa9, 0x55,
    // addrs[1]:
    0xc3, 0x34, 0x41, 0x28, 0xe0, 0x60, 0x12, 0x8e,
    0xde, 0x35, 0x23, 0xa2, 0x4a, 0x46, 0x1c, 0x89,
    0x43, 0xab, 0x08, 0x59,
]
```

## État initial

L'état initial décrit l'état initial d'un actif lorsqu'il est créé. Il contient l'ID de l'extension de fonctionnalité que l'actif utilise et un tableau de longueur variable des sorties qui dénotent l'ensemble de genèse UTXO de l'actif.

### Quel État initial contient

État initial contient un `FxID` et un tableau de `sortie`.

* **`FxID`** est une int qui définit quelle extension de fonctionnalité cet état fait partie. Pour les actifs SECP256K1, ceci est `0x00`. Pour les actifs NFT, ceci est `0x001`.
* **`Les sorties`** sont un tableau de longueur variable de [sorties](avm-transaction-serialization.md#outputs), tel que défini ci-dessus.

### Spécifications initiales d'État Gantt

```text
+---------------+----------+-------------------------------+
| fx_id         : int      |                       4 bytes |
+---------------+----------+-------------------------------+
| outputs       : []Output |       4 + size(outputs) bytes |
+---------------+----------+-------------------------------+
                           |       8 + size(outputs) bytes |
                           +-------------------------------+
```

### Spécifications initiales de l'État de prototype

```text
message InitialState {
    uint32 fx_id = 1;                  // 04 bytes
    repeated Output outputs = 2;       // 04 + size(outputs) bytes
}
```

### Exemple d'État initial

Faisons un état initial:

* `FxID`: `0x000`
* `État initial`: `["Exemple SECP256K1 sortie de transfert de plus haut")`

```text
[
    FxID <- 0x00000000
    InitialState  <- [
        0x000000070000000000003039000000000000d431000000010000000251025c61fbcfc078f69334f834be6dd26d55a955c3344128e060128ede3523a24a461c8943ab0859,
    ]
]
=
[
    // fxID:
    0x00, 0x00, 0x00, 0x00,
    // num outputs:
    0x00, 0x00, 0x00, 0x01,
    // output:
    0x00, 0x00, 0x00, 0x07, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x30, 0x39, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0xd4, 0x31, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x02, 0x51, 0x02, 0x5c, 0x61,
    0xfb, 0xcf, 0xc0, 0x78, 0xf6, 0x93, 0x34, 0xf8,
    0x34, 0xbe, 0x6d, 0xd2, 0x6d, 0x55, 0xa9, 0x55,
    0xc3, 0x34, 0x41, 0x28, 0xe0, 0x60, 0x12, 0x8e,
    0xde, 0x35, 0x23, 0xa2, 0x4a, 0x46, 0x1c, 0x89,
    0x43, 0xab, 0x08, 0x59,
]
```

## Pouvoirs

Les pouvoirs ont deux types possibles: `SECP256K1Credential`, et `NFTCredential`. Chaque titre est jumelé avec une entrée ou une opération. L'ordre des titres d'identification correspond à l'ordre des entrées ou des opérations.

## SECP256K1 Crédits

Un titre [secp256k1](cryptographic-primitives.md#secp-256-k1-addresses) contient une liste de signatures récupérables 65-octets.

### **Ce que SECP256K1 Credit Contient**

* **`TypeID`** est l'ID de ce type. Il est `0x009`.
* **`Signatures`** est un tableau de signatures récupérables 65 octets. L'ordre des signatures doit correspondre aux indices de signature de l'entrée.

### **Gantt SECP256K1 spécification de niveau de crédit**

```text
+------------------------------+---------------------------------+
| type_id         : int        |                         4 bytes |
+-----------------+------------+---------------------------------+
| signatures      : [][65]byte |  4 + 65 * len(signatures) bytes |
+-----------------+------------+---------------------------------+
                               |  8 + 65 * len(signatures) bytes |
                               +---------------------------------+
```

### **Promo SECP256K1 spécification de niveau de crédit**

```text
message SECP256K1Credential {
    uint32 typeID = 1;             // 4 bytes
    repeated bytes signatures = 2; // 4 bytes + 65 bytes * len(signatures)
}
```

### **SECP256K1 Exemple de crédit**

Faisons une entrée de paiement avec:

* **`TypeID`**: `9`
* **`signatures`**:
* `0x000102030405060708090a0b0c0d0e0f101131415161718191a1c1e1d1f2022425262728292a2c2e2d2f303132333435363738393a3c3d3f00`
* `0x404142434445464748494a4b4c4d4e4f505152535455565758595a5c5e5d5f606162636465668696a6b6e6d6f707172737475767778797a7b7d7f00`

```text
[
    TypeID         <- 0x00000009
    Signatures <- [
        0x000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1e1d1f202122232425262728292a2b2c2e2d2f303132333435363738393a3b3c3d3e3f00,
        0x404142434445464748494a4b4c4d4e4f505152535455565758595a5b5c5e5d5f606162636465666768696a6b6c6e6d6f707172737475767778797a7b7c7d7e7f00,
    ]
]
=
[
    // Type ID
    0x00, 0x00, 0x00, 0x09,
    // length:
    0x00, 0x00, 0x00, 0x02,
    // sig[0]
    0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
    0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f,
    0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17,
    0x18, 0x19, 0x1a, 0x1b, 0x1c, 0x1e, 0x1d, 0x1f,
    0x20, 0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27,
    0x28, 0x29, 0x2a, 0x2b, 0x2c, 0x2e, 0x2d, 0x2f,
    0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37,
    0x38, 0x39, 0x3a, 0x3b, 0x3c, 0x3d, 0x3e, 0x3f,
    0x00,
    // sig[1]
    0x40, 0x41, 0x42, 0x43, 0x44, 0x45, 0x46, 0x47,
    0x48, 0x49, 0x4a, 0x4b, 0x4c, 0x4d, 0x4e, 0x4f,
    0x50, 0x51, 0x52, 0x53, 0x54, 0x55, 0x56, 0x57,
    0x58, 0x59, 0x5a, 0x5b, 0x5c, 0x5e, 0x5d, 0x5f,
    0x60, 0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67,
    0x68, 0x69, 0x6a, 0x6b, 0x6c, 0x6e, 0x6d, 0x6f,
    0x70, 0x71, 0x72, 0x73, 0x74, 0x75, 0x76, 0x77,
    0x78, 0x79, 0x7a, 0x7b, 0x7c, 0x7d, 0x7e, 0x7f,
    0x00,
]
```

## Créancier NFT

Un titre NFT est la même qu'un [titre secp256k1](avm-transaction-serialization.md#secp256k1-credential) avec un type différent Le TypeID d'un titre NFT est `0x00e`.

## Transactions non signées

Les transactions non signées contiennent le contenu complet d'une transaction avec seules les signatures manquantes. Les transactions non signées ont quatre types possibles: [`CreateAssetTx`](avm-transaction-serialization.md#what-unsigned-create-asset-tx-contains), [`OperationTx`](avm-transaction-serialization.md#what-unsigned-operation-tx-contains), [`ImportTx`](avm-transaction-serialization.md#what-unsigned-import-tx-contains) et [`ExportTx`](avm-transaction-serialization.md#what-unsigned-export-tx-contains). Ils intègrent tous [`BaseTx`](avm-transaction-serialization.md#what-base-tx-contains), qui contient des champs et des opérations communs.

### Qu'est-ce que la base Tx contient

Une base tx contient un `TypeID`, `NetworkID`, `BlockchainID`, `Sorties`, `Entrées`, et `Memo`.

* **`TypeID`** est l'ID de ce type. Il est `0x00`.
* **`NetworkID`** est une int qui définit quel réseau cette transaction est censée être délivrée. Cette valeur est destinée à soutenir le routage des transactions et n'est pas conçue pour la prévention des attaques de replay.
* **`BlockchainID`** est un tableau 32-octets qui définit quelle chaîne de blocs cette transaction a été délivrée. Ceci est utilisé pour la prévention des attaques de replay pour les transactions qui pourraient être valables sur le réseau ou la chaîne de blocage.
* **`Sorties`** est un tableau [d'objets de sortie transférables](avm-transaction-serialization.md#transferable-output). Les sorties doivent être triées lexicographiquement par leur représentation sérialisée. La quantité totale des actifs créés dans ces produits doit être inférieure ou égale à la quantité totale de chaque actif consommé dans les intrants moins les frais de transaction.
* **`Intrants`** est un tableau [d'objets d'entrée transférables](avm-transaction-serialization.md#transferable-input). Les entrées doivent être triées et uniques. Les entrées sont triées d'abord lexicographiquement par leur **`TxID`** puis par **`the`** de bas à haut. S'il y a des entrées qui ont le même **`TxID`** et **`UTXOIndex`**, la transaction est invalide car cela entraînerait une double dépense.
* **`Memo`** champ contient des octets, jusqu'à 256 octets.

### Spécifications de base Gantt Tx

```text
+--------------------------------------+-----------------------------------------+
| type_id       : int                  |                                 4 bytes |
+---------------+----------------------+-----------------------------------------+
| network_id    : int                  |                                 4 bytes |
+---------------+----------------------+-----------------------------------------+
| blockchain_id : [32]byte             |                                32 bytes |
+---------------+----------------------+-----------------------------------------+
| outputs       : []TransferableOutput |                 4 + size(outputs) bytes |
+---------------+----------------------+-----------------------------------------+
| inputs        : []TransferableInput  |                  4 + size(inputs) bytes |
+---------------+----------------------+-----------------------------------------+
| memo          : [256]byte            |                    4 + size(memo) bytes |
+---------------+----------------------+-----------------------------------------+
                          | 52 + size(outputs) + size(inputs) + size(memo) bytes |
                          +------------------------------------------------------+
```

### Spécifications de base de prototype Tx

```text
message BaseTx {
    uint32 typeID = 1;           // 04 bytes
    uint32 network_id = 2;       // 04 bytes
    bytes blockchain_id = 3;     // 32 bytes
    repeated Output outputs = 4; // 04 bytes + size(outs)
    repeated Input inputs = 5;   // 04 bytes + size(ins)
    bytes memo = 6;              // 04 bytes + size(memo)
}
```

### Exemple de base Tx

Faisons une base tx qui utilise les entrées et sorties des exemples précédents :

* **`TypeID`**: `0`
* **`Réseau ID`**: `4`
* **`BlockchainID`**: `0xffffffeeeeedddddddcccccccbbbbbbbaaaaaaa99888`
* **`Sorties`**:
   * `"Exemple de sortie transférable telle que définie ci-dessus"`
* **`Entrées`**:
   * `"Exemple d'entrée transférable telle que définie ci-dessus"`
* **`Mémo `**: `0x00010203`

```text
[
    TypeID       <- 0x00000000
    NetworkID    <- 0x00000004
    BlockchainID <- 0xffffffffeeeeeeeeddddddddcccccccbbbbbbbbaaaaaaaa9999999988888888
    Outputs      <- [
        0x000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f000000070000000000003039000000000000d431000000010000000251025c61fbcfc078f69334f834be6dd26d55a955c3344128e060128ede3523a24a461c8943ab0859
    ]
    Inputs       <- [
        0xf1e1d1c1b1a191817161514131211101f0e0d0c0b0a09080706050403020100000000005000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f0000000500000000075bcd15000000020000000700000003
    ]
    Memo <- 0x00010203
]
=
[
    // typeID
    0x00, 0x00, 0x00, 0x00,
    // networkID:
    0x00, 0x00, 0x00, 0x04,
    // blockchainID:
    0xff, 0xff, 0xff, 0xff, 0xee, 0xee, 0xee, 0xee,
    0xdd, 0xdd, 0xdd, 0xdd, 0xcc, 0xcc, 0xcc, 0xcc,
    0xbb, 0xbb, 0xbb, 0xbb, 0xaa, 0xaa, 0xaa, 0xaa,
    0x99, 0x99, 0x99, 0x99, 0x88, 0x88, 0x88, 0x88,
    // number of outputs:
    0x00, 0x00, 0x00, 0x01,
    // transferable output:
    0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
    0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f,
    0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17,
    0x18, 0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f,
    0x00, 0x00, 0x00, 0x07, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x30, 0x39, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0xd4, 0x31, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x02, 0x51, 0x02, 0x5c, 0x61,
    0xfb, 0xcf, 0xc0, 0x78, 0xf6, 0x93, 0x34, 0xf8,
    0x34, 0xbe, 0x6d, 0xd2, 0x6d, 0x55, 0xa9, 0x55,
    0xc3, 0x34, 0x41, 0x28, 0xe0, 0x60, 0x12, 0x8e,
    0xde, 0x35, 0x23, 0xa2, 0x4a, 0x46, 0x1c, 0x89,
    0x43, 0xab, 0x08, 0x59,
    // number of inputs:
    0x00, 0x00, 0x00, 0x01,
    // transferable input:
    0xf1, 0xe1, 0xd1, 0xc1, 0xb1, 0xa1, 0x91, 0x81,
    0x71, 0x61, 0x51, 0x41, 0x31, 0x21, 0x11, 0x01,
    0xf0, 0xe0, 0xd0, 0xc0, 0xb0, 0xa0, 0x90, 0x80,
    0x70, 0x60, 0x50, 0x40, 0x30, 0x20, 0x10, 0x00,
    0x00, 0x00, 0x00, 0x05, 0x00, 0x01, 0x02, 0x03,
    0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b,
    0x0c, 0x0d, 0x0e, 0x0f, 0x10, 0x11, 0x12, 0x13,
    0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1a, 0x1b,
    0x1c, 0x1d, 0x1e, 0x1f, 0x00, 0x00, 0x00, 0x05,
    0x00, 0x00, 0x00, 0x00, 0x07, 0x5b, 0xcd, 0x15,
    0x00, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00, 0x07,
    0x00, 0x00, 0x00, 0x03,
    // Memo length:
    0x00, 0x00, 0x00, 0x04,
    // Memo:
    0x00, 0x01, 0x02, 0x03,
]
```

### Qu'est-ce que non non Créer l'actif Tx Contient

Un atout tx non signé create contient un `BaseTx`, `nom`, `Symbole`, `dénomination`, et `InitialStates`. Le `TypeID` est `0x001`.

* **`BaseTx`**
* **`Nom`** est une chaîne lisible humaine qui définit le nom de l'actif que cette transaction créera. Le nom n'est pas garanti d'être unique. Le nom doit être composé uniquement de caractères ASCII imprimable et ne doit pas être supérieur à 128 caractères.
* **`Symbole`** est une chaîne lisible humaine qui définit le symbole de l'actif que cette transaction va créer. Le symbole n'est pas garanti d'être unique. Le symbole doit être composé uniquement de caractères ASCII imprimable et ne doit pas être supérieur à 4 caractères.
* **`La dénomination`** est un octet qui définit la divisibilité de l'actif que cette transaction créera. Par exemple, le jeton AVAX divisible en billionths. Par conséquent, la dénomination du jeton AVAX 9. La dénomination ne doit pas être supérieure à 32.
* **`InitialStates`** est un tableau de longueur variable qui définit les extensions de fonctionnalité que cet actif supporte, et [l'état initial](avm-transaction-serialization.md#initial-state) de ces extensions de fonctionnalité.

### Gantt non signé Créer l'actif Tx spécification

```text
+----------------+----------------+--------------------------------------+
| base_tx        : BaseTx         |                  size(base_tx) bytes |
+----------------+----------------+--------------------------------------+
| name           : string         |                  2 + len(name) bytes |
+----------------+----------------+--------------------------------------+
| symbol         : string         |                2 + len(symbol) bytes |
+----------------+----------------+--------------------------------------+
| denomination   : byte           |                              1 bytes |
+----------------+----------------+--------------------------------------+
| initial_states : []InitialState |       4 + size(initial_states) bytes |
+----------------+----------------+--------------------------------------+
                                  | size(base_tx) + size(initial_states) |
                                  |  + 9 + len(name) + len(symbol) bytes |
                                  +--------------------------------------+
```

### Prototype non signé Créer l'actif Tx spécification

```text
message CreateAssetTx {
    BaseTx base_tx = 1;                       // size(base_tx)
    string name = 2;                          // 2 bytes + len(name)
    name symbol = 3;                          // 2 bytes + len(symbol)
    uint8 denomination = 4;                   // 1 bytes
    repeated InitialState initial_states = 5; // 4 bytes + size(initial_states)
}
```

### Unsigned Créer un actif Exemple Tx

Let’s base tx non signée qui utilise les entrées et sorties des exemples précédents :

* `BaseTx `: `"Exemple BaseTx tel que défini ci-dessus avec ID set 1"`
* `Nom`: `Indice de volatilité`
* `Symbole `: `VIX`
* `Dénomination`: `2`
* **`États initiaux`**:
* `"Exemple État initial tel que défini ci-dessus"`

```text
[
    BaseTx        <- 0x0000000100000004ffffffffeeeeeeeeddddddddccccccccbbbbbbbbaaaaaaaa999999998888888800000001000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f000000070000000000003039000000000000d431000000010000000251025c61fbcfc078f69334f834be6dd26d55a955c3344128e060128ede3523a24a461c8943ab085900000001f1e1d1c1b1a191817161514131211101f0e0d0c0b0a09080706050403020100000000005000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f0000000500000000075bcd150000000200000007000000030000000400010203
    Name          <- 0x0010566f6c6174696c69747920496e646578
    Symbol        <- 0x0003564958
    Denomination  <- 0x02
    InitialStates <- [
        0x0000000000000001000000070000000000003039000000000000d431000000010000000251025c61fbcfc078f69334f834be6dd26d55a955c3344128e060128ede3523a24a461c8943ab0859,
    ]
]
=
[
    // base tx:
    0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x04,
    0xff, 0xff, 0xff, 0xff, 0xee, 0xee, 0xee, 0xee,
    0xdd, 0xdd, 0xdd, 0xdd,
    0xcc, 0xcc, 0xcc, 0xcc, 0xbb, 0xbb, 0xbb, 0xbb,
    0xaa, 0xaa, 0xaa, 0xaa, 0x99, 0x99, 0x99, 0x99,
    0x88, 0x88, 0x88, 0x88, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
    0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f,
    0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17,
    0x18, 0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f,
    0x00, 0x00, 0x00, 0x07, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x30, 0x39, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0xd4, 0x31, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x02, 0x51, 0x02, 0x5c, 0x61,
    0xfb, 0xcf, 0xc0, 0x78, 0xf6, 0x93, 0x34, 0xf8,
    0x34, 0xbe, 0x6d, 0xd2, 0x6d, 0x55, 0xa9, 0x55,
    0xc3, 0x34, 0x41, 0x28, 0xe0, 0x60, 0x12, 0x8e,
    0xde, 0x35, 0x23, 0xa2, 0x4a, 0x46, 0x1c, 0x89,
    0x43, 0xab, 0x08, 0x59, 0x00, 0x00, 0x00, 0x01,
    0xf1, 0xe1, 0xd1, 0xc1, 0xb1, 0xa1, 0x91, 0x81,
    0x71, 0x61, 0x51, 0x41, 0x31, 0x21, 0x11, 0x01,
    0xf0, 0xe0, 0xd0, 0xc0, 0xb0, 0xa0, 0x90, 0x80,
    0x70, 0x60, 0x50, 0x40, 0x30, 0x20, 0x10, 0x00,
    0x00, 0x00, 0x00, 0x05, 0x00, 0x01, 0x02, 0x03,
    0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b,
    0x0c, 0x0d, 0x0e, 0x0f, 0x10, 0x11, 0x12, 0x13,
    0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1a, 0x1b,
    0x1c, 0x1d, 0x1e, 0x1f, 0x00, 0x00, 0x00, 0x05,
    0x00, 0x00, 0x00, 0x00, 0x07, 0x5b, 0xcd, 0x15,
    0x00, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00, 0x07,
    0x00, 0x00, 0x00, 0x03, 0x00, 0x00, 0x00, 0x04,
    0x00, 0x01, 0x02, 0x03
    // name:
    0x00, 0x10, 0x56, 0x6f, 0x6c, 0x61, 0x74, 0x69,
    0x6c, 0x69, 0x74, 0x79, 0x20, 0x49, 0x6e, 0x64,
    0x65, 0x78,
    // symbol length:
    0x00, 0x03,
    // symbol:
    0x56, 0x49, 0x58,
    // denomination:
    0x02,
    // number of InitialStates:
    0x00, 0x00, 0x00, 0x01,
    // InitialStates[0]:
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x07, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x30, 0x39, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0xd4, 0x31, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x02, 0x51, 0x02, 0x5c, 0x61,
    0xfb, 0xcf, 0xc0, 0x78, 0xf6, 0x93, 0x34, 0xf8,
    0x34, 0xbe, 0x6d, 0xd2, 0x6d, 0x55, 0xa9, 0x55,
    0xc3, 0x34, 0x41, 0x28, 0xe0, 0x60, 0x12, 0x8e,
    0xde, 0x35, 0x23, 0xa2, 0x4a, 0x46, 0x1c, 0x89,
    0x43, 0xab, 0x08, 0x59,
]
```

### Qu'opération non autorisée Tx Contient

Une opération non signée tx contient un `BaseTx` et `Ops`. Le `TypeID` de ce type est `0x002`.

* **`BaseTx`**
* **`Ops`** est un tableau de longueur variable des [Ops](avm-transaction-serialization.md#transferable-op) transférables.

### Gantt non signé opération Tx spécification

```text
+---------+------------------+-------------------------------------+
| base_tx : BaseTx           |                 size(base_tx) bytes |
+---------+------------------+-------------------------------------+
| ops     : []TransferableOp |                 4 + size(ops) bytes |
+---------+------------------+-------------------------------------+
                             | 4 + size(ops) + size(base_tx) bytes |
                             +-------------------------------------+
```

### Promo non signé opération Tx spécification

```text
message OperationTx {
    BaseTx base_tx = 1;          // size(base_tx)
    repeated TransferOp ops = 2; // 4 bytes + size(ops)
}
```

### Exemple d'opération Tx non signé

Let’s opération non signée tx qui utilise les entrées et sorties des exemples précédents :

* `BaseTx`: `"Exemple BaseTx ci-dessus" avec TypeID set à 2`
* **`Options`**: `\["Exemple d'Op transférable tel que défini ci-dessus"\]`

```text
[
    BaseTx <- 0x0000000200000004ffffffffeeeeeeeeddddddddccccccccbbbbbbbbaaaaaaaa999999998888888800000001000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f000000070000000000003039000000000000d431000000010000000251025c61fbcfc078f69334f834be6dd26d55a955c3344128e060128ede3523a24a461c8943ab085900000001f1e1d1c1b1a191817161514131211101f0e0d0c0b0a09080706050403020100000000005000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f0000000500000000075bcd150000000200000007000000030000000400010203
    Ops <- [
        0x000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f00000001f1e1d1c1b1a191817161514131211101f0e0d0c0b0a090807060504030201000000000050000000d0000000200000003000000070000303900000003431100000000010000000251025c61fbcfc078f69334f834be6dd26d55a955c3344128e060128ede3523a24a461c8943ab0859,
    ]
]
=
[
    // base tx:
    0x00, 0x00, 0x00, 0x02,
    0x00, 0x00, 0x00, 0x04, 0xff, 0xff, 0xff, 0xff,
    0xee, 0xee, 0xee, 0xee, 0xdd, 0xdd, 0xdd, 0xdd,
    0xcc, 0xcc, 0xcc, 0xcc, 0xbb, 0xbb, 0xbb, 0xbb,
    0xaa, 0xaa, 0xaa, 0xaa, 0x99, 0x99, 0x99, 0x99,
    0x88, 0x88, 0x88, 0x88, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
    0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f,
    0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17,
    0x18, 0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f,
    0x00, 0x00, 0x00, 0x07, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x30, 0x39, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0xd4, 0x31, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x02, 0x51, 0x02, 0x5c, 0x61,
    0xfb, 0xcf, 0xc0, 0x78, 0xf6, 0x93, 0x34, 0xf8,
    0x34, 0xbe, 0x6d, 0xd2, 0x6d, 0x55, 0xa9, 0x55,
    0xc3, 0x34, 0x41, 0x28, 0xe0, 0x60, 0x12, 0x8e,
    0xde, 0x35, 0x23, 0xa2, 0x4a, 0x46, 0x1c, 0x89,
    0x43, 0xab, 0x08, 0x59, 0x00, 0x00, 0x00, 0x01,
    0xf1, 0xe1, 0xd1, 0xc1, 0xb1, 0xa1, 0x91, 0x81,
    0x71, 0x61, 0x51, 0x41, 0x31, 0x21, 0x11, 0x01,
    0xf0, 0xe0, 0xd0, 0xc0, 0xb0, 0xa0, 0x90, 0x80,
    0x70, 0x60, 0x50, 0x40, 0x30, 0x20, 0x10, 0x00,
    0x00, 0x00, 0x00, 0x05, 0x00, 0x01, 0x02, 0x03,
    0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b,
    0x0c, 0x0d, 0x0e, 0x0f, 0x10, 0x11, 0x12, 0x13,
    0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1a, 0x1b,
    0x1c, 0x1d, 0x1e, 0x1f, 0x00, 0x00, 0x00, 0x05,
    0x00, 0x00, 0x00, 0x00, 0x07, 0x5b, 0xcd, 0x15,
    0x00, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00, 0x07,
    0x00, 0x00, 0x00, 0x03, 0x00, 0x00, 0x00, 0x04,
    0x00, 0x01, 0x02, 0x03
    // number of operations:
    0x00, 0x00, 0x00, 0x01,
    // transfer operation:
    0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
    0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f,
    0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17,
    0x18, 0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f,
    0x00, 0x00, 0x00, 0x01, 0xf1, 0xe1, 0xd1, 0xc1,
    0xb1, 0xa1, 0x91, 0x81, 0x71, 0x61, 0x51, 0x41,
    0x31, 0x21, 0x11, 0x01, 0xf0, 0xe0, 0xd0, 0xc0,
    0xb0, 0xa0, 0x90, 0x80, 0x70, 0x60, 0x50, 0x40,
    0x30, 0x20, 0x10, 0x00, 0x00, 0x00, 0x00, 0x05,
    0x00, 0x00, 0x00, 0x0d, 0x00, 0x00, 0x00, 0x02,
    0x00, 0x00, 0x00, 0x03, 0x00, 0x00, 0x00, 0x07,
    0x00, 0x00, 0x30, 0x39, 0x00, 0x00, 0x00, 0x03,
    0x43, 0x11, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00,
    0x00, 0x00, 0x02, 0x51, 0x02, 0x5c, 0x61, 0xfb,
    0xcf, 0xc0, 0x78, 0xf6, 0x93, 0x34, 0xf8, 0x34,
    0xbe, 0x6d, 0xd2, 0x6d, 0x55, 0xa9, 0x55, 0xc3,
    0x34, 0x41, 0x28, 0xe0, 0x60, 0x12, 0x8e, 0xde,
    0x35, 0x23, 0xa2, 0x4a, 0x46, 0x1c, 0x89, 0x43,
    0xab, 0x08, 0x59,
]
```

### Qu'importe non importation Tx Contient

Un tx non signé contient un `BaseTx`, `SourceChain` et `Ins`. \* Le `TypeID`for ce type est `0x003`.

* **`BaseTx`**
* **`SourceChain`** est un ID de blockchain source 32 octets.
* **`Ins`** est un tableau de longueur variable [d'Entres transférables](avm-transaction-serialization.md#transferable-input).

### Gantt non signé spécification Tx d'importation

```text
+---------+----------------------+-----------------------------+
| base_tx : BaseTx               |         size(base_tx) bytes |
+-----------------+--------------+-----------------------------+
| source_chain    : [32]byte     |                    32 bytes |
+---------+----------------------+-----------------------------+
| ins     : []TransferIn         |         4 + size(ins) bytes |
+---------+----------------------+-----------------------------+
                        | 36 + size(ins) + size(base_tx) bytes |
                        +--------------------------------------+
```

### Promo non signé spécification d'importation Tx

```text
message ImportTx {
    BaseTx base_tx = 1;          // size(base_tx)
    bytes source_chain = 2;      // 32 bytes
    repeated TransferIn ins = 3; // 4 bytes + size(ins)
}
```

### Exemple d'importation non disponible Tx

Let’s tx non signé qui utilise les entrées des exemples précédents :

* `BaseTx`: `"Exemple BaseTx tel que défini ci-dessus"`, mais avec `TypeID` réglé à `3`
* `SourceChain`: `0x000`
* `Ins`: `"Exemple SECP256K1 Entrée de transfert telle que définie ci-dessus"`

```text
[
    BaseTx        <- 0x0000000300000004ffffffffeeeeeeeeddddddddccccccccbbbbbbbbaaaaaaaa999999998888888800000001000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f000000070000000000003039000000000000d431000000010000000251025c61fbcfc078f69334f834be6dd26d55a955c3344128e060128ede3523a24a461c8943ab085900000001f1e1d1c1b1a191817161514131211101f0e0d0c0b0a09080706050403020100000000005000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f0000000500000000075bcd150000000200000007000000030000000400010203
    SourceChain <- 0x0000000000000000000000000000000000000000000000000000000000000000
    Ins <- [
        f1e1d1c1b1a191817161514131211101f0e0d0c0b0a09080706050403020100000000005000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f0000000500000000075bcd15000000020000000300000007,
    ]
]
=
[
    // base tx:
    0x00, 0x00, 0x00, 0x03,
    0x00, 0x00, 0x00, 0x04, 0xff, 0xff, 0xff, 0xff,
    0xee, 0xee, 0xee, 0xee, 0xdd, 0xdd, 0xdd, 0xdd,
    0xcc, 0xcc, 0xcc, 0xcc, 0xbb, 0xbb, 0xbb, 0xbb,
    0xaa, 0xaa, 0xaa, 0xaa, 0x99, 0x99, 0x99, 0x99,
    0x88, 0x88, 0x88, 0x88, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
    0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f,
    0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17,
    0x18, 0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f,
    0x00, 0x00, 0x00, 0x07, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x30, 0x39, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0xd4, 0x31, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x02, 0x51, 0x02, 0x5c, 0x61,
    0xfb, 0xcf, 0xc0, 0x78, 0xf6, 0x93, 0x34, 0xf8,
    0x34, 0xbe, 0x6d, 0xd2, 0x6d, 0x55, 0xa9, 0x55,
    0xc3, 0x34, 0x41, 0x28, 0xe0, 0x60, 0x12, 0x8e,
    0xde, 0x35, 0x23, 0xa2, 0x4a, 0x46, 0x1c, 0x89,
    0x43, 0xab, 0x08, 0x59, 0x00, 0x00, 0x00, 0x01,
    0xf1, 0xe1, 0xd1, 0xc1, 0xb1, 0xa1, 0x91, 0x81,
    0x71, 0x61, 0x51, 0x41, 0x31, 0x21, 0x11, 0x01,
    0xf0, 0xe0, 0xd0, 0xc0, 0xb0, 0xa0, 0x90, 0x80,
    0x70, 0x60, 0x50, 0x40, 0x30, 0x20, 0x10, 0x00,
    0x00, 0x00, 0x00, 0x05, 0x00, 0x01, 0x02, 0x03,
    0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b,
    0x0c, 0x0d, 0x0e, 0x0f, 0x10, 0x11, 0x12, 0x13,
    0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1a, 0x1b,
    0x1c, 0x1d, 0x1e, 0x1f, 0x00, 0x00, 0x00, 0x05,
    0x00, 0x00, 0x00, 0x00, 0x07, 0x5b, 0xcd, 0x15,
    0x00, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00, 0x07,
    0x00, 0x00, 0x00, 0x03, 0x00, 0x00, 0x00, 0x04,
    0x00, 0x01, 0x02, 0x03
    // source chain:
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    // input count:
    0x00, 0x00, 0x00, 0x01,
    // txID:
    0xf1, 0xe1, 0xd1, 0xc1, 0xb1, 0xa1, 0x91, 0x81,
    0x71, 0x61, 0x51, 0x41, 0x31, 0x21, 0x11, 0x01,
    0xf0, 0xe0, 0xd0, 0xc0, 0xb0, 0xa0, 0x90, 0x80,
    0x70, 0x60, 0x50, 0x40, 0x30, 0x20, 0x10, 0x00,
    // utxoIndex:
    0x00, 0x00, 0x00, 0x05,
    // assetID:
    0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
    0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f,
    0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17,
    0x18, 0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f,
    // input:
    0x00, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x00,
    0x07, 0x5b, 0xcd, 0x15, 0x00, 0x00, 0x00, 0x02,
    0x00, 0x00, 0x00, 0x03, 0x00, 0x00, 0x00, 0x07,
]
```

### Qu'exportation non autorisée Tx Contient

Un tx d'exportation non signé contient un `BaseTx`, `une chaîne de destination` et des `Outs`. Le `TypeID` de ce type est `0x004`.

* **`DestinationChain`** est l'ID 32 octets de la chaîne dans laquelle les fonds sont exportés.
* Les **`Outs`** est un tableau de longueur variable de [sorties transférables](avm-transaction-serialization.md#transferable-output).

### Gantt non signé spécification d'exportation Tx

```text
+-------------------+---------------+--------------------------------------+
| base_tx           : BaseTx        |                  size(base_tx) bytes |
+-------------------+---------------+--------------------------------------+
| destination_chain : [32]byte      |                             32 bytes |
+-------------------+---------------+--------------------------------------+
| outs              : []TransferOut |                 4 + size(outs) bytes |
+-------------------+---------------+--------------------------------------+
                          | 36 + size(outs) + size(base_tx) bytes |
                          +---------------------------------------+
```

### Spécifications d'exportation Tx non signées de prototype

```text
message ExportTx {
    BaseTx base_tx = 1;            // size(base_tx)
    bytes destination_chain = 2;   // 32 bytes
    repeated TransferOut outs = 3; // 4 bytes + size(outs)
}
```

### Exemple d'exportation non disponible

Let’s tx d'exportation non signé qui utilise les sorties des exemples précédents :

* `BaseTx`: `"Exemple BaseTx tel que défini ci-dessus"`, mais avec `TypeID` réglé à `4`
* `Chaîne de destination`: `0x000`
* `Sorties`: `"Exemple SECP256K1 sortie de transfert telle que définie ci-dessus"`

```text
[
    BaseTx           <- 0x0000000400000004ffffffffeeeeeeeeddddddddccccccccbbbbbbbbaaaaaaaa999999998888888800000001000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f000000070000000000003039000000000000d431000000010000000251025c61fbcfc078f69334f834be6dd26d55a955c3344128e060128ede3523a24a461c8943ab085900000001f1e1d1c1b1a191817161514131211101f0e0d0c0b0a09080706050403020100000000005000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f0000000500000000075bcd150000000200000007000000030000000400010203
    DestinationChain <- 0x0000000000000000000000000000000000000000000000000000000000000000
    Outs <- [
        000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f000000070000000000003039000000000000d431000000010000000251025c61fbcfc078f69334f834be6dd26d55a955c3344128e060128ede3523a24a461c8943ab0859,
    ]
]
=
[
    // base tx:
    0x00, 0x00, 0x00, 0x04
    0x00, 0x00, 0x00, 0x04, 0xff, 0xff, 0xff, 0xff,
    0xee, 0xee, 0xee, 0xee, 0xdd, 0xdd, 0xdd, 0xdd,
    0xcc, 0xcc, 0xcc, 0xcc, 0xbb, 0xbb, 0xbb, 0xbb,
    0xaa, 0xaa, 0xaa, 0xaa, 0x99, 0x99, 0x99, 0x99,
    0x88, 0x88, 0x88, 0x88, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
    0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f,
    0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17,
    0x18, 0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f,
    0x00, 0x00, 0x00, 0x07, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x30, 0x39, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0xd4, 0x31, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x02, 0x51, 0x02, 0x5c, 0x61,
    0xfb, 0xcf, 0xc0, 0x78, 0xf6, 0x93, 0x34, 0xf8,
    0x34, 0xbe, 0x6d, 0xd2, 0x6d, 0x55, 0xa9, 0x55,
    0xc3, 0x34, 0x41, 0x28, 0xe0, 0x60, 0x12, 0x8e,
    0xde, 0x35, 0x23, 0xa2, 0x4a, 0x46, 0x1c, 0x89,
    0x43, 0xab, 0x08, 0x59, 0x00, 0x00, 0x00, 0x01,
    0xf1, 0xe1, 0xd1, 0xc1, 0xb1, 0xa1, 0x91, 0x81,
    0x71, 0x61, 0x51, 0x41, 0x31, 0x21, 0x11, 0x01,
    0xf0, 0xe0, 0xd0, 0xc0, 0xb0, 0xa0, 0x90, 0x80,
    0x70, 0x60, 0x50, 0x40, 0x30, 0x20, 0x10, 0x00,
    0x00, 0x00, 0x00, 0x05, 0x00, 0x01, 0x02, 0x03,
    0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b,
    0x0c, 0x0d, 0x0e, 0x0f, 0x10, 0x11, 0x12, 0x13,
    0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1a, 0x1b,
    0x1c, 0x1d, 0x1e, 0x1f, 0x00, 0x00, 0x00, 0x05,
    0x00, 0x00, 0x00, 0x00, 0x07, 0x5b, 0xcd, 0x15,
    0x00, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00, 0x07,
    0x00, 0x00, 0x00, 0x03, 0x00, 0x00, 0x00, 0x04,
    0x00, 0x01, 0x02, 0x03
    // destination_chain:
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    // outs[] count:
    0x00, 0x00, 0x00, 0x01,
    // assetID:
    0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
    0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f,
    0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17,
    0x18, 0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f,
    // output:
    0x00, 0x00, 0x00, 0x07,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x30, 0x39,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xd4, 0x31,
    0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x02,
    0x51, 0x02, 0x5c, 0x61, 0xfb, 0xcf, 0xc0, 0x78,
    0xf6, 0x93, 0x34, 0xf8, 0x34, 0xbe, 0x6d, 0xd2,
    0x6d, 0x55, 0xa9, 0x55, 0xc3, 0x34, 0x41, 0x28,
    0xe0, 0x60, 0x12, 0x8e, 0xde, 0x35, 0x23, 0xa2,
    0x4a, 0x46, 0x1c, 0x89, 0x43, 0xab, 0x08, 0x59,
]
```

## Transaction signée

Une transaction signée est une transaction non signée avec l'ajout d'un tableau de [titres](avm-transaction-serialization.md#credentials) d'identité.

### Ce que la transaction signée contient

Une transaction signée contient un `CodecID`, `UnsignedTx`, et `crédits`.

* **`CodecID`** Le seul id codec valide actuel est `00 00`.
* **`UnsignedTx`** est une transaction non signée, comme décrit ci-dessus.
* **`Les`** [pouvoirs](avm-transaction-serialization.md#credentials) sont un tableau de pouvoirs. Chaque titre sera jumelé à l'entrée dans le même index à cette titre.

### Spécification de transaction signée Gantt

```text
+---------------------+--------------+------------------------------------------------+
| codec_id            : uint16       |                                        2 bytes |
+---------------------+--------------+------------------------------------------------+
| unsigned_tx         : UnsignedTx   |                        size(unsigned_tx) bytes |
+---------------------+--------------+------------------------------------------------+
| credentials         : []Credential |                    4 + size(credentials) bytes |
+---------------------+--------------+------------------------------------------------+
                                     | 6 + size(unsigned_tx) + len(credentials) bytes |
                                     +------------------------------------------------+
```

### Spécifications de transaction signées Proto

```text
message Tx {
    uint16 codec_id = 1;                 // 2 bytes
    UnsignedTx unsigned_tx = 2;          // size(unsigned_tx)
    repeated Credential credentials = 3; // 4 bytes + size(credentials)
}
```

### Exemple de transaction signé

Effectuons une transaction signée qui utilise la transaction non signée et les informations d'identification des exemples précédents.

* **`CodecID`**: `0`
* **`UnsignedTx`**: `0x001004ffffffeeeedddddccccbbbbbbbaaaaaaa998800100102030405060708090a0c0c0e0f10115161718191a1b1c110251718191a1c11e1f0030390043100251025c61fbcfc078f69334f834be6dd265a95534128734128e060128e3523a24a461c8943a461c89439439439461c99461774a2001774a4a4610100101001019779977997799979774a4 59001f1e1d1c1b1a19181716151413121101f0e0c0b0a090807060504030201005005002002002002002002002002004004003`
* **`Crédits`** `0x002000102030405060708090a0c0d0e0f101161718191a1c1e1d1f202232425262728292a2c2e2d2f30313334353637393a3c3d3e3f00404142445464748494a4c4d4e4f5051525355758595a5565667677a7a00900090090090900909000900`

```text
[
    CodecID     <- 0x0000
    UnsignedTx  <- 0x0000000100000004ffffffffeeeeeeeeddddddddccccccccbbbbbbbbaaaaaaaa999999998888888800000001000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f000000070000000000003039000000000000d431000000010000000251025c61fbcfc078f69334f834be6dd26d55a955c3344128e060128ede3523a24a461c8943ab085900000001f1e1d1c1b1a191817161514131211101f0e0d0c0b0a09080706050403020100000000005000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f0000000500000000075bcd150000000200000007000000030000000400010203
    Credentials <- [
        0x0000000900000002000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1e1d1f202122232425262728292a2b2c2e2d2f303132333435363738393a3b3c3d3e3f00404142434445464748494a4b4c4d4e4f505152535455565758595a5b5c5e5d5f606162636465666768696a6b6c6e6d6f707172737475767778797a7b7c7d7e7f00,
    ]
]
=
[
    // Codec ID
    0x00, 0x00,
    // unsigned transaction:
    0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x04,
    0xff, 0xff, 0xff, 0xff, 0xee, 0xee, 0xee, 0xee,
    0xdd, 0xdd, 0xdd, 0xdd, 0xcc, 0xcc, 0xcc, 0xcc,
    0xbb, 0xbb, 0xbb, 0xbb, 0xaa, 0xaa, 0xaa, 0xaa,
    0x99, 0x99, 0x99, 0x99, 0x88, 0x88, 0x88, 0x88,
    0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x02, 0x03,
    0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b,
    0x0c, 0x0d, 0x0e, 0x0f, 0x10, 0x11, 0x12, 0x13,
    0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1a, 0x1b,
    0x1c, 0x1d, 0x1e, 0x1f, 0x00, 0x00, 0x00, 0x07,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x30, 0x39,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xd4, 0x31,
    0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x02,
    0x51, 0x02, 0x5c, 0x61, 0xfb, 0xcf, 0xc0, 0x78,
    0xf6, 0x93, 0x34, 0xf8, 0x34, 0xbe, 0x6d, 0xd2,
    0x6d, 0x55, 0xa9, 0x55, 0xc3, 0x34, 0x41, 0x28,
    0xe0, 0x60, 0x12, 0x8e, 0xde, 0x35, 0x23, 0xa2,
    0x4a, 0x46, 0x1c, 0x89, 0x43, 0xab, 0x08, 0x59,
    0x00, 0x00, 0x00, 0x01, 0xf1, 0xe1, 0xd1, 0xc1,
    0xb1, 0xa1, 0x91, 0x81, 0x71, 0x61, 0x51, 0x41,
    0x31, 0x21, 0x11, 0x01, 0xf0, 0xe0, 0xd0, 0xc0,
    0xb0, 0xa0, 0x90, 0x80, 0x70, 0x60, 0x50, 0x40,
    0x30, 0x20, 0x10, 0x00, 0x00, 0x00, 0x00, 0x05,
    0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
    0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f,
    0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17,
    0x18, 0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f,
    0x00, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x00,
    0x07, 0x5b, 0xcd, 0x15, 0x00, 0x00, 0x00, 0x02,
    0x00, 0x00, 0x00, 0x07, 0x00, 0x00, 0x00, 0x03,
    0x00, 0x00, 0x00, 0x04, 0x00, 0x01, 0x02, 0x03
    // number of credentials:
    0x00, 0x00, 0x00, 0x01,
    // credential[0]:
    0x00, 0x00, 0x00, 0x09, 0x00, 0x00, 0x00, 0x02,
    0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
    0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f,
    0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17,
    0x18, 0x19, 0x1a, 0x1b, 0x1c, 0x1e, 0x1d, 0x1f,
    0x20, 0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27,
    0x28, 0x29, 0x2a, 0x2b, 0x2c, 0x2e, 0x2d, 0x2f,
    0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37,
    0x38, 0x39, 0x3a, 0x3b, 0x3c, 0x3d, 0x3e, 0x3f,
    0x00, 0x40, 0x41, 0x42, 0x43, 0x44, 0x45, 0x46,
    0x47, 0x48, 0x49, 0x4a, 0x4b, 0x4c, 0x4d, 0x4e,
    0x4f, 0x50, 0x51, 0x52, 0x53, 0x54, 0x55, 0x56,
    0x57, 0x58, 0x59, 0x5a, 0x5b, 0x5c, 0x5e, 0x5d,
    0x5f, 0x60, 0x61, 0x62, 0x63, 0x64, 0x65, 0x66,
    0x67, 0x68, 0x69, 0x6a, 0x6b, 0x6c, 0x6e, 0x6d,
    0x6f, 0x70, 0x71, 0x72, 0x73, 0x74, 0x75, 0x76,
    0x77, 0x78, 0x79, 0x7a, 0x7b, 0x7c, 0x7d, 0x7e,
    0x7f, 0x00,
```

## UTXO

Un UTXO est une représentation autonome d'une sortie de transaction.

### What contient

Un UTXO contient un `CodecID`, `TxID`, `UTXOIndex`, `AssetID` et `Output`.

* **`CodecID`**`` la seule valide CodecID est `00 00`
* **`TxID`** est un identifiant de transaction 32-octets. Les ID de transaction sont calculés en prenant sha256 des octets de la transaction signée.
* **`UTXOIndex`** est une int qui spécifie quelle sortie dans la transaction spécifiée par **`TxID`** que cet utxo a été créé.
* **`AssetID`** est un tableau 32-octets qui définit quel atout cette référence utxo.
* **`Sortie`** est l'objet [de sortie](avm-transaction-serialization.md#transferable-output) qui a créé cet utxo. La série des extrants a été définie ci-dessus.

### Spécifications Gantt UTXO

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

### Spécifications de prototype UTXO

```text
message Utxo {
    uint16 codec_id = 1;     // 02 bytes
    bytes tx_id = 2;         // 32 bytes
    uint32 output_index = 3; // 04 bytes
    bytes asset_id = 4;      // 32 bytes
    Output output = 5;       // size(output)
}
```

### Exemple UTXO

Faisons-le un UTXO à partir de la transaction signée créée ci-dessus:

* **`CodecID`**: `0`
* **`TxID`**: `0xf966750f438867c3c9828ddcdbe660e21ccdbb36a9276958f011ba472f75d477d47`
* **`UTXOIndex`**: `0` = `0x000`
* **`AssetID`**: `0x000102030405060708090a0b0c0d0e0f101131415161718191a1b1c1d1e1f`
* **`Sortie `**: `"Exemple SECP256K1 Sortie transférable telle que définie ci-dessus"`

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

## GenesisAsset

Un actif à émettre dans une instance de la Genèse de l'AVM

### Ce que GenesisAsset Contient

Une instance d'un GenesisAsset contient un `Alias`, `NetworkID`, `BlockchainID`, `Sorties`, `Entrées`, `Memo`, `Nom`, `Symbole`, `Dénomination` et `InitialStates`.

* **`Alias`** est l'alias de cet actif.
* **`NetworkID`** définit quel réseau cette transaction est censée être délivrée. Cette valeur est destinée à soutenir le routage des transactions et n'est pas conçue pour la prévention des attaques de replay.
* **`BlockchainID`** est l'ID \(32-octets\) qui définit la chaîne de blocs que cette transaction a été délivrée. Ceci est utilisé pour la prévention des attaques de replay pour les transactions qui pourraient être valables sur le réseau ou la chaîne de blocage.
* **`Sorties`** est un tableau [d'objets de sortie transférables](avm-transaction-serialization.md#transferable-output). Les sorties doivent être triées lexicographiquement par leur représentation sérialisée. La quantité totale des actifs créés dans ces produits doit être inférieure ou égale à la quantité totale de chaque actif consommé dans les intrants moins les frais de transaction.
* **`Intrants`** est un tableau [d'objets d'entrée transférables](avm-transaction-serialization.md#transferable-input). Les entrées doivent être triées et uniques. Les entrées sont triées d'abord lexicographiquement par leur **`TxID`** puis par **`the`** de bas à haut. S'il y a des entrées qui ont le même **`TxID`** et **`UTXOIndex`**, la transaction est invalide car cela entraînerait une double dépense.
* **`Memo`** est un champ de mémo qui contient des octets, jusqu'à 256 octets.
* **`Nom`** est une chaîne lisible humaine qui définit le nom de l'actif que cette transaction créera. Le nom n'est pas garanti d'être unique. Le nom doit être composé uniquement de caractères ASCII imprimable et ne doit pas être supérieur à 128 caractères.
* **`Symbole`** est une chaîne lisible humaine qui définit le symbole de l'actif que cette transaction va créer. Le symbole n'est pas garanti d'être unique. Le symbole doit être composé uniquement de caractères ASCII imprimable et ne doit pas être supérieur à 4 caractères.
* **`La dénomination`** est un octet qui définit la divisibilité de l'actif que cette transaction créera. Par exemple, le jeton AVAX divisible en billionths. Par conséquent, la dénomination du jeton AVAX 9. La dénomination ne doit pas être supérieure à 32.
* **`InitialStates`** est un tableau de longueur variable qui définit les extensions de fonctionnalité que cet actif supporte, et [l'état initial](avm-transaction-serialization.md#initial-state) de ces extensions de fonctionnalité.

### Spécification Gantt GenesisAsset

```text
+----------------+----------------------+--------------------------------+
| alias          : string               |           2 + len(alias) bytes |
+----------------+----------------------+--------------------------------+
| network_id     : int                  |                        4 bytes |
+----------------+----------------------+--------------------------------+
| blockchain_id  : [32]byte             |                       32 bytes |
+----------------+----------------------+--------------------------------+
| outputs        : []TransferableOutput |        4 + size(outputs) bytes |
+----------------+----------------------+--------------------------------+
| inputs         : []TransferableInput  |         4 + size(inputs) bytes |
+----------------+----------------------+--------------------------------+
| memo           : [256]byte            |           4 + size(memo) bytes |
+----------------+----------------------+--------------------------------+
| name           : string               |            2 + len(name) bytes |
+----------------+----------------------+--------------------------------+
| symbol         : string               |          2 + len(symbol) bytes |
+----------------+----------------------+--------------------------------+
| denomination   : byte                 |                        1 bytes |
+----------------+----------------------+--------------------------------+
| initial_states : []InitialState       | 4 + size(initial_states) bytes |
+----------------+----------------------+--------------------------------+
|           59 + size(alias) + size(outputs) + size(inputs) + size(memo) |
|                 + len(name) + len(symbol) + size(initial_states) bytes |
+------------------------------------------------------------------------+
```

### Spécifications de l'actif de prototype

```text
message GenesisAsset {
    string alias = 1;                          // 2 bytes + len(alias)
    uint32 network_id = 2;                     // 04 bytes
    bytes blockchain_id = 3;                   // 32 bytes
    repeated Output outputs = 4;               // 04 bytes + size(outputs)
    repeated Input inputs = 5;                 // 04 bytes + size(inputs)
    bytes memo = 6;                            // 04 bytes + size(memo)
    string name = 7;                           // 2 bytes + len(name)
    name symbol = 8;                           // 2 bytes + len(symbol)
    uint8 denomination = 9;                    // 1 bytes
    repeated InitialState initial_states = 10; // 4 bytes + size(initial_states)
}
```

### Exemple de GenesisAsset

Faisons un GenesisAsset:

* **`Alias`**: `actif1`
* **`NetworkID`**: `12345`
* **`BlockchainID`**: `0x000`
* **`Sorties`**: \[\]
* **`Entrées`**: \[\]
* **`Mémoire`**: `2Zc54v4ek37TEwu4LiV3j41PUMRd6acDDU3ZCVSxE7X`
* **`Nom`**: `actif1`
* **`Symbole `**: `MFCA`
* **`Dénomination`**: `1`
* **`États initiaux`**:
* `"Exemple État initial tel que défini ci-dessus"`

```text
[
    Alias         <- 0x617373657431
    NetworkID     <- 0x00003039
    BlockchainID  <- 0x0000000000000000000000000000000000000000000000000000000000000000
    Outputs       <- []
    Inputs        <- []
    Memo          <- 0x66x726f6d20736e6f77666c616b6520746f206176616c616e636865
    Name          <- 0x617373657431
    Symbol        <- 0x66x726f6d20736e6f77666c616b6520746f206176616c616e636865
    Denomination  <- 0x66x726f6d20736e6f77666c616b6520746f206176616c616e636865
    InitialStates <- [
        0x0000000000000001000000070000000000003039000000000000d431000000010000000251025c61fbcfc078f69334f834be6dd26d55a955c3344128e060128ede3523a24a461c8943ab0859
    ]
]
=
[
    // asset alias len:
    0x00, 0x06,
    // asset alias:
    0x61, 0x73, 0x73, 0x65, 0x74, 0x31,
    // network_id:
    0x00, 0x00, 0x30, 0x39,
    // blockchain_id:
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    // output_len:
    0x00, 0x00, 0x00, 0x00,
    // input_len:
    0x00, 0x00, 0x00, 0x00,
    // memo_len:
    0x00, 0x00, 0x00, 0x1b,
    // memo:
    0x66, 0x72, 0x6f, 0x6d, 0x20, 0x73, 0x6e, 0x6f, 0x77, 0x66, 0x6c, 0x61,
    0x6b, 0x65, 0x20, 0x74, 0x6f, 0x20, 0x61, 0x76, 0x61, 0x6c, 0x61, 0x6e, 0x63, 0x68, 0x65,
    // asset_name_len:
    0x00, 0x0f,
    // asset_name:
    0x6d, 0x79, 0x46, 0x69, 0x78, 0x65, 0x64, 0x43, 0x61, 0x70, 0x41, 0x73, 0x73, 0x65, 0x74,
    // symbol_len:
    0x00, 0x04,
    // symbol:
    0x4d, 0x46, 0x43, 0x41,
    // denomination:
    0x07,
    // number of InitialStates:
    0x00, 0x00, 0x00, 0x01,
    // InitialStates[0]:
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x07, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x30, 0x39, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0xd4, 0x31, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x02, 0x51, 0x02, 0x5c, 0x61,
    0xfb, 0xcf, 0xc0, 0x78, 0xf6, 0x93, 0x34, 0xf8,
    0x34, 0xbe, 0x6d, 0xd2, 0x6d, 0x55, 0xa9, 0x55,
    0xc3, 0x34, 0x41, 0x28, 0xe0, 0x60, 0x12, 0x8e,
    0xde, 0x35, 0x23, 0xa2, 0x4a, 0x46, 0x1c, 0x89,
    0x43, 0xab, 0x08, 0x59,
]
```

