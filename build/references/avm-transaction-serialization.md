# Format de transaction AVM

Ce fichier est destiné à être la seule source de vérité pour la manière dont nous we les transactions sur la machine virtuelle d'Avalanche \(AVM\). Ce document utilise le format de [sérialisation primitive](serialization-primitives.md) pour l'emballage et la [secp256k1](cryptographic-primitives.md#secp256k1-addresses) pour l'identification des utilisateurs cryptographiques.

## ID de Codec

Certaines données sont préparées avec un ID de codec \(unt16\) qui indique comment les données doivent être deserialized. Pour l'instant, le seul codec valide est 0 `0x00 0x00`\(\).

## Sortie transférable

Les sorties transférables enveloppent une sortie avec un identifiant d'actifs.

### Que contient la sortie transférable

Une sortie transférable contient une `AssetID`et un .[`Output`](avm-transaction-serialization.md#outputs)

* **`AssetID`**est un tableau de 32 octes qui définit l'actif de ce fichier de référence.
* **`Output`**est une sortie, comme défini [ci-dessous.](avm-transaction-serialization.md#outputs) Par exemple, il peut s'agir d'une [sortie de transfert SECP256K1](avm-transaction-serialization.md#secp256k1-transfer-output).

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

### Spécification de sortie transférable de prototype

```text
message TransferableOutput {
    bytes asset_id = 1; // 32 bytes
    Output output = 2;  // size(output)
}
```

### Exemple de sortie transférable

Faire une sortie transférable :

* `AssetID`:`0x000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f`
* `Output`:`"Example SECP256K1 Transfer Output from below"`

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

### Qu'est ce que contient l'entrée transférable

Une entrée transférable contient un `TxID`, `UTXOIndex``AssetID`et un .`Input`

* **`TxID`**est un tableau de 32 octes qui définit la transaction que cette entrée prend en charge. Les ID de transaction sont calculés en prenant sha256 des octets de la transaction signée.
* **`UTXOIndex`**est une int qui définit ce is cette entrée est consommée dans la transaction spécifiée.
* **`AssetID`**est un tableau de 32 octes qui définit l'actif de cette référence en entrée.
* **`Input`**est une entrée, comme défini ci-dessous. Ceci ne peut actuellement être [qu'une entrée de transfert SECP256K1](avm-transaction-serialization.md#secp256k1-transfer-input)

### Spécification d'entrée transférable Gantt

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

### Spécification d'entrée transférable de prototype

```text
message TransferableInput {
    bytes tx_id = 1;       // 32 bytes
    uint32 utxo_index = 2; // 04 bytes
    bytes asset_id = 3;    // 32 bytes
    Input input = 4;       // size(input)
}
```

### Exemple d'entrée transférable

Fait une entrée transférable :

* `TxID`:`0xf1e1d1c1b1a191817161514131211101f0e0d0c0b0a090807060504030201000`
* `UTXOIndex`:`5`
* `AssetID`:`0x000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f`
* `Input`:`"Example SECP256K1 Transfer Input from below"`

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

Les opérations transférables décrivent un ensemble of avec une opération de transfert fournie. Un seul identifiant d'actif est en mesure de faire référence par opération.

### Que contient l'Op transférable

`UTXOIDs`Une opération transférable contient une `AssetID`, , et une `TransferOp`.

* **`AssetID`**est un tableau de 32 octes qui définit l'actif de cette opération qui change.
* **`UTXOIDs`**est un tableau de tuples TxID-OutputIndex . Ce tableau doit être trié en ordre lexicographique.
* **`TransferOp`**est un [objet d'opération transférable.](avm-transaction-serialization.md#operations)

### Spécification d'Op transférable Gantt

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

### Spécification d'Op transférable de prototype

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

Faire une opération transférable :

* `AssetID`:`0x000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f`
* `UTXOIDs`:
   * `UTXOID`:
      * `TxID`:`0xf1e1d1c1b1a191817161514131211101f0e0d0c0b0a090807060504030201000`
      * `UTXOIndex`:`5`
* `Op`:`"Example Transfer Op from below"`

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

[`SECP256K1MintOutput`](avm-transaction-serialization.md#secp256k1-mint-output)Les sorties ont quatre types possibles : [`SECP256K1TransferOutput`](avm-transaction-serialization.md#secp256k1-transfer-output), [`NFTTransferOutput`](avm-transaction-serialization.md#nft-transfer-output)et .[`NFTMintOutput`](avm-transaction-serialization.md#nft-mint-output)

## Sortie de transfert SECP256K1

Une sortie de transfert [secp256k1](cryptographic-primitives.md#secp-256-k1-addresses) permet d'envoyer une quantité d'actifs à une collection d'adresses après un seul moment précis.

### **Qu'est que la sortie de transfert SECP256K1 contient une sortie de transfert SECP.**

`Locktime``Threshold`Une sortie de transfert secp256k1 contient `TypeID`, , `Amount`, et `Addresses`.

* **`TypeID`**est l'ID pour ce type de sortie. C'est `0x00000007`.
* **`Amount`**est un long qui spécifie la quantité de l'actif que possède cette sortie. Doit être positif.
* **`Locktime`**est une longue qui contient le stamp unix que cette sortie peut être dépensée après. Le timestamp unix est spécifique à la seconde.
* **`Threshold`**est une lettre d'information qui indique le nombre de signatures uniques requises pour dépenser la sortie. Doit être inférieur ou égal à la longueur de **`Addresses`**. Si **`Addresses`**est vide, doit être 0.
* **`Addresses`**est une liste d'adresses uniques qui correspondent aux clés privées qui peuvent être utilisées pour dépenser cette sortie. Les adresses doivent être triées lexicographiquement.

### **Spécification de sortie de transfert de Gantt SECP256K1**

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

### **Exemple de sortie de transfert SECP256K1**

Fait une sortie de transfert secp256k1 avec :

* **`TypeID`**:`7`
* **`Amount`**:`12345`
* **`Locktime`**:`54321`
* **`Threshold`**:`1`
* **`Addresses`**:
* `0x51025c61fbcfc078f69334f834be6dd26d55a955`
* `0xc3344128e060128ede3523a24a461c8943ab0859`

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

## Sortie de menthe SECP256K1

Une sortie de menthe [secp256k1](cryptographic-primitives.md#secp-256-k1-addresses) est une sortie qui est détenue par une collection d'adresses.

### **Que contient la sortie de Mint SECP256K1**

`Locktime``Threshold`Une sortie de la mint secp256k1 contient , `TypeID`, et `Addresses`.

* **`TypeID`**est l'ID pour ce type de sortie. C'est `0x00000006`.
* **`Locktime`**est une longue qui contient le stamp unix que cette sortie peut être dépensée après. Le timestamp unix est spécifique à la seconde.
* **`Threshold`**est une lettre d'information qui indique le nombre de signatures uniques requises pour dépenser la sortie. Doit être inférieur ou égal à la longueur de **`Addresses`**. Si **`Addresses`**est vide, doit être 0.
* **`Addresses`**est une liste d'adresses uniques qui correspondent aux clés privées qui peuvent être utilisées pour dépenser cette sortie. Les adresses doivent être triées lexicographiquement.

### **Spécification de sortie de menthe de Gantt SECP256K1.**

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

### **Spécifications de sortie de menthe de Proto SECP256K1**

```text
message SECP256K1MintOutput {
    uint32 typeID = 1;            // 04 bytes
    uint64 locktime = 2;          // 08 bytes
    uint32 threshold = 3;         // 04 bytes
    repeated bytes addresses = 4; // 04 bytes + 20 bytes * len(addresses)
}
```

### **Exemple de sortie de menthe SECP256K1**

Fait une sortie de menthe SECP256K1 avec :

* **`TypeID`**:`6`
* **`Locktime`**:`54321`
* **`Threshold`**:`1`
* **`Addresses`**:
* `0x51025c61fbcfc078f69334f834be6dd26d55a955`
* `0xc3344128e060128ede3523a24a461c8943ab0859`

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

Une sortie de transfert NFT est une NFT qui est propriété d'une collection d'adresses.

### **Que contient la sortie de transfert NFT**

`TypeID``Payload``Locktime``Threshold`Une sortie de transfert NFT contient , `GroupID`, et `Addresses`.

* **`TypeID`**est l'ID pour ce type de sortie. C'est `0x0000000b`.
* **`GroupID`**est une lettre qui spécifie le groupe avec lequel la NFT a été délivrée.
* **`Payload`**est une chaîne arbitraire d'octets pas longtemps plus que 1024 octets.
* **`Locktime`**est une longue qui contient le stamp unix que cette sortie peut être dépensée après. Le timestamp unix est spécifique à la seconde.
* **`Threshold`**est une lettre d'information qui indique le nombre de signatures uniques requises pour dépenser la sortie. Doit être inférieur ou égal à la longueur de **`Addresses`**. Si **`Addresses`**est vide, doit être 0.
* **`Addresses`**est une liste d'adresses uniques qui correspondent aux clés privées qui peuvent être utilisées pour dépenser cette sortie. Les adresses doivent être triées lexicographiquement.

### **Spécification de sortie de transfert NFT**

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

Fait une sortie de transfert NFT avec :

* **`TypeID`**:`11`
* **`GroupID`**:`12345`
* **`Payload`**:`0x431100`
* **`Locktime`**:`54321`
* **`Threshold`**:`1`
* **`Addresses`**:
* `0x51025c61fbcfc078f69334f834be6dd26d55a955`
* `0xc3344128e060128ede3523a24a461c8943ab0859`

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

## Sortie de Mint NFT

Une sortie de menthe NFT est une NFT qui est la propriété d'une collection d'adresses.

### **Qu'est-ce que la sortie NFT Mint contient**

`Locktime``Threshold`Une sortie NFT Mint contient une `TypeID`, , `GroupID`, et `Addresses`.

* **`TypeID`**est l'ID pour ce type de sortie. C'est `0x0000000a`.
* **`GroupID`**est une lettre qui spécifie le groupe auquel est délivré ce NFT.
* **`Locktime`**est une longue qui contient le stamp unix que cette sortie peut être dépensée après. Le timestamp unix est spécifique à la seconde.
* **`Threshold`**est une lettre d'information qui indique le nombre de signatures uniques requises pour dépenser la sortie. Doit être inférieur ou égal à la longueur de **`Addresses`**. Si **`Addresses`**est vide, doit être 0.
* **`Addresses`**est une liste d'adresses uniques qui correspondent aux clés privées qui peuvent être utilisées pour dépenser cette sortie. Les adresses doivent être triées lexicographiquement.

### **Spécification de sortie de menthe de Gantt NFT**

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

### **Spécifications de sortie de menthe de prototype NFT**

```text
message NFTMintOutput {
    uint32 typeID = 1;            // 04 bytes
    uint32 group_id = 2;          // 04 bytes
    uint64 locktime = 3;          // 08 bytes
    uint32 threshold = 4;         // 04 bytes
    repeated bytes addresses = 5; // 04 bytes + 20 bytes * len(addresses)
}
```

### **Exemple de sortie de Mint NFT**

Fait une sortie de menthe NFT avec :

* **`TypeID`**:`10`
* **`GroupID`**:`12345`
* **`Locktime`**:`54321`
* **`Threshold`**:`1`
* **`Addresses`**:
* `0x51025c61fbcfc078f69334f834be6dd26d55a955`
* `0xc3344128e060128ede3523a24a461c8943ab0859`

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

Les entrées ont un type possible : `SECP256K1TransferInput`.

## SECP256K1

Une entrée de transfert [secp256k1](cryptographic-primitives.md#secp-256-k1-addresses) permet de dépenser une sortie de transfert secp256k1.

### **Qu'est ce que contient l'entrée de transfert SECP256K\)**

Une entrée de transfert secp256k1 contient `Amount`et .`AddressIndices`

* **`TypeID`**est l'ID pour ce type d'entrée. C'est `0x00000005`.
* **`Amount`**est un long qui spécifie la quantité que cette entrée doit consommer de that Doit être positif. Doit être égal à la quantité spécifiée dans be
* **`AddressIndices`**est une liste de notes uniques qui définissent les clés privées qui sont utilisées pour dépenser of Chaque UTXO a un tableau d'adresses qui peuvent dépenser of Chaque lettre représente l'index de ce tableau d'adresses qui signera cette transaction. Le tableau doit être trié de bas à haut.

### **Spécifications d'entrée de transfert de Gantt SECP256K1**

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

### **Exemple d'entrée de transfert SECP256K1**

Fait une entrée de paiement avec :

* **`TypeId`**:`5`
* **`Amount`**:`123456789`
* **`AddressIndices`**: `3``7`[,,]

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

`NFTMintOp`Les opérations ont trois types possibles : `SECP256K1MintOperation`, et `NFTTransferOp`.

## **SECP256K1**

Une opération de menthe [secp256k1](cryptographic-primitives.md#secp-256-k1-addresses) consomme une sortie de menthe SECP256K1, crée une nouvelle sortie de menthe et envoie une sortie de transfert à un nouvel ensemble de propriétaires.

### **Que contient l'opération de menthe SECP256K1**

`AddressIndices``MintOutput`Une opération de menthe secp256k1 contient une , `TypeID`, et `TransferOutput`.

* **`TypeID`**est l'ID pour ce type de sortie. C'est `0x00000008`.
* **`AddressIndices`**est une liste de notes uniques qui définissent les clés privées qui sont utilisées pour dépenser [of](avm-transaction-serialization.md#utxo) Chaque UTXO a un tableau d'adresses qui peuvent dépenser of Chaque lettre représente l'index de ce tableau d'adresses qui signera cette transaction. Le tableau doit être trié de bas à haut.
* **`MintOutput`**est une [sortie Mint SECP256K1.](avm-transaction-serialization.md#secp256k1-mint-output)
* **`TransferOutput`**est une [sortie de transfert SECP256K1.](avm-transaction-serialization.md#secp256k1-transfer-output)

### **Spécification d'opération Gantt SECP256K1**

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

### **Spécifications d'opération de la menthe de Proto SECP256K1**

```text
message SECP256K1MintOperation {
    uint32 typeID = 1;                   // 4 bytes
    repeated uint32 address_indices = 2; // 04 bytes + 04 bytes * len(address_indices)
    MintOutput mint_output = 3;          // size(mint_output
    TransferOutput transfer_output = 4;  // size(transfer_output)
}
```

### **Exemple d'exploitation de la menthe SECP256K1**

Faire une opération de menthe [secp256k1](cryptographic-primitives.md#secp-256-k1-addresses) avec :

* **`TypeId`**:`8`
* **`AddressIndices`**:
* `0x00000003`
* `0x00000007`
* **`MintOutput`**:`"Example SECP256K1 Mint Output from above"`
* **`TransferOutput`**:`"Example SECP256K1 Transfer Output from above"`

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

## NFT

Une opération de menthe NFT consomme une sortie de menthe NFT et envoie une sortie non dépensée à un nouvel ensemble de propriétaires.

### **Que contient NFT Mint**

`GroupID``Payload`Une opération de menthe NFT contient une `TypeID`, `AddressIndices`, et `Output`d'adresses.

* **`TypeID`**est l'ID pour ce type d'opération. C'est `0x0000000c`.
* **`AddressIndices`**est une liste de notes uniques qui définissent les clés privées qui sont utilisées pour dépenser of Chaque UTXO a un tableau d'adresses qui peuvent dépenser of Chaque lettre représente l'index de ce tableau d'adresses qui signera cette transaction. Le tableau doit être trié de bas à haut.
* **`GroupID`**est une lettre qui spécifie le groupe auquel est délivré ce NFT.
* **`Payload`**est une chaîne arbitraire d'octets ne dépassant pas plus de 1024 octets.
* **`Output`**n'est pas un , `TransferableOutput`mais plutôt un temps de verrouillage, un seuil et un tableau d'adresses uniques qui correspondent aux clés privées qui peuvent être utilisées pour dépenser cette sortie. Les adresses doivent être triées lexicographiquement.

### **Spécification d'Op Mint Gantt NFT**

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

### **Spécifications d'Op Mint de prototype**

```text
message NFTMintOp {
    uint32 typeID = 1;                   // 04 bytes
    repeated uint32 address_indices = 2; // 04 bytes + 04 bytes * len(address_indices)
    uint32 group_id = 3;                 // 04 bytes
    bytes payload = 4;                   // 04 bytes + len(payload)
    repeated bytes outputs = 5;          // 04 bytes + size(outputs)
}
```

### **Exemple de Op de NFT**

Faire une opération de menthe NFT avec :

* **`TypeId`**:`12`
* **`AddressIndices`**:
   * `0x00000003`
   * `0x00000007`
* **`GroupID`**:`12345`
* **`Payload`**:`0x431100`
* **`Locktime`**:`54321`
* **`Threshold`**:`1`
* **`Addresses`**:
* `0xc3344128e060128ede3523a24a461c8943ab0859`

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

## NFT

Une opération de transfert NFT envoie une sortie de transfert NFT non dépensée à un nouvel ensemble de propriétaires.

### **Qu'est-ce que NFT Transfer Op**

Une opération de transfert NFT contient un `TypeID`, et une opération `AddressIndices`de transfert NFT .`NFTTransferOutput`

* **`TypeID`**est l'ID pour ce type de sortie. C'est `0x0000000d`.
* **`AddressIndices`**est une liste de notes uniques qui définissent les clés privées qui sont utilisées pour dépenser of Chaque UTXO a un tableau d'adresses qui peuvent dépenser of Chaque lettre représente l'index de ce tableau d'adresses qui signera cette transaction. Le tableau doit être trié de bas à haut.
* **`NFTTransferOutput`**est la sortie de cette opération et doit être un résultat de [transfert NFT.](avm-transaction-serialization.md#nft-transfer-output) Cette sortie n'a pas le **`TypeId`**, parce que le type est connu par le contexte d'être dans cette opération.

### **Spécification d'Op de transfert NFT**

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

### **Spécifications d'Op de transfert de prototype NFT**

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

### **Exemple d'Op de transfert NFT**

Effectuons une opération de transfert NFT avec :

* **`TypeID`**:`13`
* **`AddressIndices`**:
* `0x00000007`
* `0x00000003`
* **`GroupID`**:`12345`
* **`Payload`**:`0x431100`
* **`Locktime`**:`54321`
* **`Threshold`**:`1`
* **`Addresses`**:
* `0xc3344128e060128ede3523a24a461c8943ab0859`
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

## État

L'état initial décrit l'état initial d'un actif lorsqu'il est créé. Il contient l'ID de l'extension de fonctionnalité que l'actif utilise et un tableau de sorties de longueur variable qui indique l'ensemble de l'actif UTXO de la genesis.

### Qu'est ce que l'État initial contient

L'état initial contient un `FxID`et un tableau de .`Output`

* **`FxID`**est une lettre qui définit la fonctionnalité d'extension de cet État qui fait partie. Pour les actifs SECP256K1, ceci est `0x00000000`. Pour les actifs de NFT, ceci est `0x00000001`.
* **`Outputs`**est un tableau de [sorties](avm-transaction-serialization.md#outputs) de longueur variable, tel que défini ci-dessus.

### Spécification d'État initiale de Gantt

```text
+---------------+----------+-------------------------------+
| fx_id         : int      |                       4 bytes |
+---------------+----------+-------------------------------+
| outputs       : []Output |       4 + size(outputs) bytes |
+---------------+----------+-------------------------------+
                           |       8 + size(outputs) bytes |
                           +-------------------------------+
```

### Spécifications initiales de l'État de Proto

```text
message InitialState {
    uint32 fx_id = 1;                  // 04 bytes
    repeated Output outputs = 2;       // 04 + size(outputs) bytes
}
```

### Exemple d'État

Fait un premier état :

* `FxID`:`0x00000000`
* `InitialState`:`["Example SECP256K1 Transfer Output from above"]`

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

## Crédits

`SECP256K1Credential`Les lettres de créance ont deux types possibles : et `NFTCredential`. Chaque créancier est associé à une entrée ou une opération. L'ordre des titres d'identification correspond à l'ordre des entrées ou des opérations.

## SECP256K1

Un code d'identification [secp256k1](cryptographic-primitives.md#secp-256-k1-addresses) contient une liste de signatures récupérables de 65 octets.

### **Qu'est-ce que SECP256K1 contient le crédit SECP1**

* **`TypeID`**est l'ID de ce type. C'est `0x00000009`.
* **`Signatures`**est un tableau de signatures récupérables de 65 octets. L'ordre des signatures doit correspondre aux indices de signature de l'entrée.

### **Spécifications de crédit de Gantt SECP256K1**

```text
+------------------------------+---------------------------------+
| type_id         : int        |                         4 bytes |
+-----------------+------------+---------------------------------+
| signatures      : [][65]byte |  4 + 65 * len(signatures) bytes |
+-----------------+------------+---------------------------------+
                               |  8 + 65 * len(signatures) bytes |
                               +---------------------------------+
```

### **Spécifications de crédits de Proto-SECP256K1**

```text
message SECP256K1Credential {
    uint32 typeID = 1;             // 4 bytes
    repeated bytes signatures = 2; // 4 bytes + 65 bytes * len(signatures)
}
```

### **SECP256K1**

Fait une entrée de paiement avec :

* **`TypeID`**:`9`
* **`signatures`**:
* `0x000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1e1d1f202122232425262728292a2b2c2e2d2f303132333435363738393a3b3c3d3e3f00`
* `0x404142434445464748494a4b4c4d4e4f505152535455565758595a5b5c5e5d5f606162636465666768696a6b6c6e6d6f707172737475767778797a7b7c7d7e7f00`

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

## NFT

Un code NFT est le même qu'un [code secp256k1](avm-transaction-serialization.md#secp256k1-credential) avec un type de code différent. Le TypeID pour un titre de référence NFT est `0x0000000e`.

## Transactions non signées

Les transactions non signées contiennent le contenu complet d'une transaction avec seules les signatures manquantes. [`OperationTx`](avm-transaction-serialization.md#what-unsigned-operation-tx-contains)[`ImportTx`](avm-transaction-serialization.md#what-unsigned-import-tx-contains)Les transactions non signées ont quatre types possibles : , [`CreateAssetTx`](avm-transaction-serialization.md#what-unsigned-create-asset-tx-contains), et [`ExportTx`](avm-transaction-serialization.md#what-unsigned-export-tx-contains). Ils sont tous intégrés [`BaseTx`](avm-transaction-serialization.md#what-base-tx-contains), qui contient des champs et des opérations communes.

### Que contient la base Tx

`TypeID``BlockchainID``Outputs``Inputs`Une base de tx contient , `NetworkID`, et `Memo`.

* **`TypeID`**est l'ID de ce type. C'est `0x00000000`.
* **`NetworkID`**est une lettre qui définit le réseau auquel cette transaction est destinée à être délivrée. Cette valeur est destinée à soutenir le routage des transactions et n'est pas conçue pour la prévention des attaques de replay.
* **`BlockchainID`**est un tableau de 32 octes qui définit la blockchain que cette transaction a été délivrée. Ceci est utilisé pour la prévention des attaques de replay pour les transactions qui pourraient être valides sur le réseau ou la blockchain.
* **`Outputs`**est un tableau d'objets de [sortie transférables.](avm-transaction-serialization.md#transferable-output) Les extrants doivent être triés lexicographiquement par leur représentation sérialisée. La quantité totale des actifs créés dans ces produits doit être inférieure ou égale à la quantité totale de chaque actif consommé dans les intrants moins les frais de transaction.
* **`Inputs`**est un tableau [d'objets d'entrée transférables.](avm-transaction-serialization.md#transferable-input) Les entrées doivent être triées et uniques. Les entrées sont triées d'abord lexicographiquement par leurs **`TxID`**et ensuite par les **`UTXOIndex`**de bas à haut. S'il y a des entrées qui ont la même et , **`UTXOIndex`**la transaction est **`TxID`**invalide , car cela entraînerait une double dépense.
* **`Memo`**Le champ Memo contient des octets, jusqu'à 256 octets.

### Spécifications de base de Gantt

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

### Spécifications de prototype

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

Fait un tx de base qui utilise les entrées et les sorties des exemples précédents :

* **`TypeID`**:`0`
* **`NetworkID`**:`4`
* **`BlockchainID`**:`0xffffffffeeeeeeeeddddddddcccccccbbbbbbbbaaaaaaaa9999999988888888`
* **`Outputs`**:
   * `"Example Transferable Output as defined above"`
* **`Inputs`**:
   * `"Example Transferable Input as defined above"`
* **`Memo`**:`0x00010203`

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

### Que contient Tx de créer un actif non signé

`Symbol``Denomination`Un tx d'actifs de création non signé contient `BaseTx`, , `Name`, et `InitialStates`. `TypeID`L'est .`0x00000001`

* **`BaseTx`**
* **`Name`**est une chaîne de caractères lisible par l'homme qui définit le nom de l'actif que cette transaction va créer. Le nom n'est pas garanti pour être unique. Le nom doit être composé de seuls caractères ASCII imprimables et ne doit pas être plus de 128 caractères.
* **`Symbol`**est une chaîne de caractères lisible par l'homme qui définit le symbole de l'actif que cette transaction va créer. Le symbole n'est pas garanti pour être unique. Le symbole doit être composé de seuls caractères ASCII imprimables et ne doit pas être plus que 4 caractères.
* **`Denomination`**est un octet qui définit la divisibilité de l'actif que cette transaction créera Par exemple, le jeton AVAX est divisible en billionths. Par conséquent, la dénomination du jeton AVAX est de 9. La dénomination ne doit pas être supérieure à 32.
* **`InitialStates`**est un tableau de longueur variable qui définit les extensions de fonctionnalités que prend en charge cet actif et [l'état initial](avm-transaction-serialization.md#initial-state) de ces extensions de rôle.

### Gantt Unsigned Créer des actifs Tx

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

### Prototype de texte non signé Créer un actif Tx

```text
message CreateAssetTx {
    BaseTx base_tx = 1;                       // size(base_tx)
    string name = 2;                          // 2 bytes + len(name)
    name symbol = 3;                          // 2 bytes + len(symbol)
    uint8 denomination = 4;                   // 1 bytes
    repeated InitialState initial_states = 5; // 4 bytes + size(initial_states)
}
```

### Créer un actif Tx

Fait un tx de base non signé qui utilise les entrées et les sorties des exemples précédents :

* `BaseTx`:`"Example BaseTx as defined above with ID set to 1"`
* `Name`:`Volatility Index`
* `Symbol`:`VIX`
* `Denomination`:`2`
* **`InitialStates`**:
* `"Example Initial State as defined above"`

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

### Que contient l'opération Tx non signée

`BaseTx`Une opération non signée tx contient un , et `Ops`. `TypeID`Le pour ce type est .`0x00000002`

* **`BaseTx`**
* **`Ops`**est un tableau de longueur variable [d'ops transférables.](avm-transaction-serialization.md#transferable-op)

### Spécification d'opération Tx de Gantt

```text
+---------+------------------+-------------------------------------+
| base_tx : BaseTx           |                 size(base_tx) bytes |
+---------+------------------+-------------------------------------+
| ops     : []TransferableOp |                 4 + size(ops) bytes |
+---------+------------------+-------------------------------------+
                             | 4 + size(ops) + size(base_tx) bytes |
                             +-------------------------------------+
```

### Spécifications de l'opération Tx de prototype

```text
message OperationTx {
    BaseTx base_tx = 1;          // size(base_tx)
    repeated TransferOp ops = 2; // 4 bytes + size(ops)
}
```

### Exemple de opération Tx

Faisons une opération tx non signée qui utilise les entrées et les sorties des exemples précédents :

* `BaseTx`:`"Example BaseTx above" with TypeID set to 2`
* **`Ops`**: `"Example Transferable Op as defined above"`[[]

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

### Que contient Tx d'importation non signée

`BaseTx`Une importation tx non signée contient un , `SourceChain`et .`Ins` `TypeID`\* Le type de ce type est `0x00000003`.

* **`BaseTx`**
* **`SourceChain`**est un identifiant de blockchain de source de 32 octets.
* **`Ins`**est un tableau de longueur variable [d'entrées transférables.](avm-transaction-serialization.md#transferable-input)

### Spécification de Tx d'importation non signée Gantt

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

### Spécifications Tx d'importation non signées de prototype

```text
message ImportTx {
    BaseTx base_tx = 1;          // size(base_tx)
    bytes source_chain = 2;      // 32 bytes
    repeated TransferIn ins = 3; // 4 bytes + size(ins)
}
```

### Exemple de Tx d'importation non signé

Fait un tx d'importation non signé qui utilise les entrées des exemples précédents :

* `BaseTx``"Example BaseTx as defined above"`: , mais avec `TypeID`set to`3`
* `SourceChain`:`0x0000000000000000000000000000000000000000000000000000000000000000`
* `Ins`:`"Example SECP256K1 Transfer Input as defined above"`

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

### Que contient Tx d'exportation non signée.

`DestinationChain`Une tx d'exportation non signée contient un `BaseTx`, , et `Outs`. `TypeID`Le pour ce type est .`0x00000004`

* **`DestinationChain`**est l'ID de 32 octets de la chaîne dans laquelle les fonds sont exportés.
* **`Outs`**est un tableau de longueur variable de [sorties transférables.](avm-transaction-serialization.md#transferable-output)

### Spécification Tx d'exportation non signée de Gantt

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

### Spécifications Tx d'exportation non signées de prototype

```text
message ExportTx {
    BaseTx base_tx = 1;            // size(base_tx)
    bytes destination_chain = 2;   // 32 bytes
    repeated TransferOut outs = 3; // 4 bytes + size(outs)
}
```

### Exemple de Tx d'exportation non signé

Fait un tx d'exportation non signé qui utilise les sorties des exemples précédents :

* `BaseTx``"Example BaseTx as defined above"`: , mais avec `TypeID`set to`4`
* `DestinationChain`:`0x0000000000000000000000000000000000000000000000000000000000000000`
* `Outs`:`"Example SECP256K1 Transfer Output as defined above"`

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

Une transaction signée est une transaction non signée avec l'ajout d'un tableau de [pièces](avm-transaction-serialization.md#credentials) d'identité.

### Que contient la transaction signée

`UnsignedTx`Une transaction signée contient une `CodecID`, et `Credentials`.

* **`CodecID`**Le seul code de codec valide actuel est .`00 00`
* **`UnsignedTx`**est une transaction non signée, comme décrit ci-dessus.
* **`Credentials`**est un tableau de [lettres](avm-transaction-serialization.md#credentials) d'identité. Chaque titre de créance sera associé à l'entrée dans le même index de ce titre.

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

### Spécification de transaction signée de prototype

```text
message Tx {
    uint16 codec_id = 1;                 // 2 bytes
    UnsignedTx unsigned_tx = 2;          // size(unsigned_tx)
    repeated Credential credentials = 3; // 4 bytes + size(credentials)
}
```

### Exemple de transaction signé

Fait une transaction signée qui utilise la transaction et les justificatifs d'identité non signés des exemples précédents.

* **`CodecID`**:`0`
* **`UnsignedTx`**:`0x0000000100000004ffffffffeeeeeeeeddddddddccccccccbbbbbbbbaaaaaaaa999999998888888800000001000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f000000070000000000003039000000000000d431000000010000000251025c61fbcfc078f69334f834be6dd26d55a955c3344128e060128ede3523a24a461c8943ab085900000001f1e1d1c1b1a191817161514131211101f0e0d0c0b0a09080706050403020100000000005000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f0000000500000000075bcd150000000200000007000000030000000400010203`
* **`Credentials`** `0x0000000900000002000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1e1d1f202122232425262728292a2b2c2e2d2f303132333435363738393a3b3c3d3e3f00404142434445464748494a4b4c4d4e4f505152535455565758595a5b5c5e5d5f606162636465666768696a6b6c6e6d6f707172737475767778797a7b7c7d7e7f00`

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

### Que contient UTXO

`UTXOIndex``AssetID`Un UTXO contient un , `CodecID`, `TxID`, et `Output`.

* **`CodecID`**La seule validité `CodecID`est`00 00`
* **`TxID`**est un identifiant de transaction de 32 octets. Les ID de transaction sont calculés en prenant sha256 des octets de la transaction signée.
* **`UTXOIndex`**est une int qui spécifie la sortie dans la transaction spécifiée par **`TxID`**que cet utxo a été créé.
* **`AssetID`**est un tableau de 32 octes qui définit l'actif de ce fichier utxo.
* **`Output`**est l'objet [de sortie](avm-transaction-serialization.md#transferable-output) qui a créé cet utxo. La sérialisation des produits a été définie ci-dessus.

### Spécification UTXO

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

### Spécifications de prototype

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

Fait un UTXO de la transaction signée créée ci-dessus :

* **`CodecID`**:`0`
* **`TxID`**:`0xf966750f438867c3c9828ddcdbe660e21ccdbb36a9276958f011ba472f75d4e7`
* **`UTXOIndex`**: `0`=`0x00000000`
* **`AssetID`**:`0x000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f`
* **`Output`**:`"Example SECP256K1 Transferable Output as defined above"`

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

### Que contient GenesisAsset

`Alias``BlockchainID``Outputs``Inputs``Memo``Name``Symbol``Denomination`Une instance de GenesisAsset contient un , `NetworkID`, et `InitialStates`.

* **`Alias`**est l'alias de cet actif.
* **`NetworkID`**définit le réseau auquel cette transaction est destinée à être délivrée. Cette valeur est destinée à soutenir le routage des transactions et n'est pas conçue pour la prévention des attaques de replay.
* **`BlockchainID`**est l'ID \(tableau 32 octets\) qui définit la blockchain à laquelle cette transaction a été délivrée. Ceci est utilisé pour la prévention des attaques de replay pour les transactions qui pourraient être valides sur le réseau ou la blockchain.
* **`Outputs`**est un tableau d'objets de [sortie transférables.](avm-transaction-serialization.md#transferable-output) Les extrants doivent être triés lexicographiquement par leur représentation sérialisée. La quantité totale des actifs créés dans ces produits doit être inférieure ou égale à la quantité totale de chaque actif consommé dans les intrants moins les frais de transaction.
* **`Inputs`**est un tableau [d'objets d'entrée transférables.](avm-transaction-serialization.md#transferable-input) Les entrées doivent être triées et uniques. Les entrées sont triées d'abord lexicographiquement par leurs **`TxID`**et ensuite par les **`UTXOIndex`**de bas à haut. S'il y a des entrées qui ont la même et , **`UTXOIndex`**la transaction est **`TxID`**invalide , car cela entraînerait une double dépense.
* **`Memo`**est un champ de mémo qui contient des octets, jusqu'à 256 octets.
* **`Name`**est une chaîne de caractères lisible par l'homme qui définit le nom de l'actif que cette transaction va créer. Le nom n'est pas garanti pour être unique. Le nom doit être composé de seuls caractères ASCII imprimables et ne doit pas être plus de 128 caractères.
* **`Symbol`**est une chaîne de caractères lisible par l'homme qui définit le symbole de l'actif que cette transaction va créer. Le symbole n'est pas garanti pour être unique. Le symbole doit être composé de seuls caractères ASCII imprimables et ne doit pas être plus que 4 caractères.
* **`Denomination`**est un octet qui définit la divisibilité de l'actif que cette transaction créera Par exemple, le jeton AVAX est divisible en billionths. Par conséquent, la dénomination du jeton AVAX est de 9. La dénomination ne doit pas être supérieure à 32.
* **`InitialStates`**est un tableau de longueur variable qui définit les extensions de fonctionnalités que prend en charge cet actif et [l'état initial](avm-transaction-serialization.md#initial-state) de ces extensions de rôle.

### Spécification de Gantt GenesisAsset

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

### Spécifications de proto GenesisAsset

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

Faisons un GenesisAsset :

* **`Alias`**:`asset1`
* **`NetworkID`**:`12345`
* **`BlockchainID`**:`0x0000000000000000000000000000000000000000000000000000000000000000`
* **`Outputs`**: [[]
* **`Inputs`**: [[]
* **`Memo`**:`2Zc54v4ek37TEwu4LiV3j41PUMRd6acDDU3ZCVSxE7X`
* **`Name`**:`asset1`
* **`Symbol`**:`MFCA`
* **`Denomination`**:`1`
* **`InitialStates`**:
* `"Example Initial State as defined above"`

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

