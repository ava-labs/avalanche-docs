# AVM İşlem Biçimi

Bu dosya Avalanche Sanal in işlemleri nasıl we tek gerçek kaynağı olarak tanımlanmaktadır. Bu belge, şifreli kullanıcı tanımlaması için paketi paketlemek ve [secp256k1](cryptographic-primitives.md#secp256k1-addresses) için [ilkel serileştirme](serialization-primitives.md) biçimini kullanır.

## Codec kimlik

Bazı veriler verilerin nasıl çölleşmesi gerektiğini belirten bir kod kod numarası (16\) ile hazırlanır. Şu anda geçerli kod çözücü tek kimlik 0 \(`0x00 0x00`\).

## Transfer Edilebilir Çıktı

Transferable çıktılar, bir çıktıyı varlık kimliğiyle paketler.

### Hangi Aktarılabilir Çıktı Içeriyor

Transfer edilebilir bir çıkış bir `AssetID` ve [`bir Çıktı`](avm-transaction-serialization.md#outputs) içerir.

* **`AssetID`** bu çıkış referanslarını belirleyen 32 byte dizidir.
* **`Çıkış`** [aşağıdaki](avm-transaction-serialization.md#outputs) gibi tanımlanmış bir output, Örneğin, [SECP256K1 transfer çıkışı](avm-transaction-serialization.md#secp256k1-transfer-output) olabilir.

### Gantt Transferable Çıktı Specification

```text
+----------+----------+-------------------------+
| asset_id : [32]byte |                32 bytes |
+----------+----------+-------------------------+
| output   : Output   |      size(output) bytes |
+----------+----------+-------------------------+
                      | 32 + size(output) bytes |
                      +-------------------------+
```

### Proto Transferable Output Specification Specification

```text
message TransferableOutput {
    bytes asset_id = 1; // 32 bytes
    Output output = 2;  // size(output)
}
```

### Transfer Edilebilir Çıktı Örnek

Transfer edilebilir bir çıkış yapalım:

* `Erişim` `tarihi: 11213151718181911b112141618181811214161818113161818191b1d1e1e1)`
* `Çıktı`: `"Örnek SECP256K1 Aktarım Çıktısı"`

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

## Transfer Edilebilir Girdi

Transferable girdiler, belirli bir UTXO aktarımı ile tanımlar.

### Hangi Aktarılabilir Girdi Içeriyor

Transfer edilebilir bir girdi `TxID`, `UTXOIndex` `Varlık` ve `bir Girdi` içerir.

* **`TxID`** bu girişin bir çıktıyı tüketen işlemleri tanımlayan 32 byte dizidir. İşlem kimlikleri imzalanmış işlemlerin bytes Sha256 ile hesaplanır.
* **`UTXOIndex`** bu girişin belirlenen işlemde hangi utxo consuming tanımlayan bir is
* **`AssetID`** bu giriş referanslarını belirleyen 32 byte dizidir.
* **`Girdi`** aşağıda tanımlandığı gibi bir girdir. Bu sadece [SECP256K1 transfer girdisi](avm-transaction-serialization.md#secp256k1-transfer-input) olabilir.

### Gantt Transferable Input Specification Comment

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

### Proto Transferable Input Specification

```text
message TransferableInput {
    bytes tx_id = 1;       // 32 bytes
    uint32 utxo_index = 2; // 04 bytes
    bytes asset_id = 3;    // 32 bytes
    Input input = 4;       // size(input)
}
```

### Transfer Edilebilir Girdi Örnekleri

Transfer edilebilir bir girişim yapalım:

* `TxID`: `0xf1d1c1c1c111010d0b090806050403020000 0060504030101016161513110d0d0101000`
* `UTXOIndex`: `5`
* `Erişim` `tarihi: 11213151718181911b112141618181811214161818113161818191b1d1e1e1)`
* `Giriş`: `"Örnek SECP256K1 Aktarma Girdi"`

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

## Transfer edilebilir Otomobil

Transferable operasyonlar bir transfer operasyonu ile bir dizi UTXOs tanımlar. Sadece bir tane Varlık Kimliği operasyonu için referans alınabilir.

### Hangi Aktarılabilir Operasyon Içeriyor

Transfer edilebilir bir `operasyon, bir AssetID`, `AssetID`, ve bir `Transferop` içerir.

* **`AssetID`** bu işlemin değişimini belirleyen 32 byte dizidir.
* **`UTXOIDs`** TxID-OutputIndex tuples dizisidir. Bu dizinin lexicographical sırayla sıralanması gerekir.
* **`TransferOp`** [transferi mümkün](avm-transaction-serialization.md#operations) bir işlemdir.

### Gantt Aktarılabilir Op Specification

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

### Proto Transferable Op Specification Specification Comment

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

### Transfer Edilebilir Op Örnekleri

Transfer edilebilir bir operasyon yapalım:

* `Erişim` `tarihi: 11213151718181911b112141618181811214161818113161818191b1d1e1e1)`
* `UTXOIDs`:
   * `UTXOID`:
      * `TxID`: `0xf1d1c1c1c111010d0b090806050403020000 0060504030101016161513110d0d0101000`
      * `UTXOIndex`: `5`
* `Op`: `"Aşağıdan Örnek Transfer Op`

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

## Çıktı

Çıkışlar dört olası türüne sahiptir: [`SECP256K1Transferoutput`](avm-transaction-serialization.md#secp256k1-transfer-output), [`SECP256K1MintOutput`](avm-transaction-serialization.md#secp256k1-mint-output), [`NFTTransferOutput`](avm-transaction-serialization.md#nft-transfer-output) ve [`NFTMintoutput`](avm-transaction-serialization.md#nft-mint-output).

## SECP256K1 Transfer Çıktı

Bir [secp256k1](cryptographic-primitives.md#secp-256-k1-addresses) transfer çıktısı, belirtilen bir unix zaman sonrasında bir adresler koleksiyonuna bir miktar varlık gönderme imkanı sağlar.

### **SECP256K1 Aktarım Çıktısını Içeriyor**

Bir secp256k1 transfer çıktısı `TypeID`, `Amount`, `Locktime`, `Threshold` ve `Adresler` içerir.

* Bu çıktıların kimliği, **`TypeID`** tipidir. `007`.
* **`Miktar,`** bu çıkışın sahip olduğu varlığın miktarını belirten uzunluktur. Olumlu olmalı.
* **`Locktime`**, bu çıkışın sonra harcanabileceği unix zaman damgasını içerecek uzunluktadır. İkinciye özgü zaman damgası özeldir.
* **`Threshold`**, çıkışı harcamak için gerekli eşsiz imzaların sayısını belirleyen bir int **`Adreslerin`** uzunluğuna eşit ya da daha az olmalı. **`Adresler`** boşsa, 0 olmalı.
* **`Adresler,`** bu çıkışı harcamak için kullanılabilecek özel anahtarlara karşılık gelen eşsiz adreslerin listesidir. Adresler lexicographically. olarak sıralanmalıdır.

### **Gantt SECP256K1 Transfer Çıktı Specification**

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

### **Proto SECP256K1 Transfer Çıktı Specification**

```text
message SECP256K1TransferOutput {
    uint32 typeID = 1;            // 04 bytes
    uint64 amount = 2;            // 08 bytes
    uint64 locktime = 3;          // 08 bytes
    uint32 threshold = 4;         // 04 bytes
    repeated bytes addresses = 5; // 04 bytes + 20 bytes * len(addresses)
}
```

### **SECP256K1 Transfer Çıktı Örneği**

Bir secp256k1 transfer çıktısı yapalım:

* **`TypeID`**: `7`
* **`Amount`**: `12345`
* **`Kilit`**: `54321`
* **`Eşik`**: `1`
* **`Adresler`**:
* `0x51025c61fccc078f6933f834be6d5a955`
* `0xc344128e0601283523a24a461c8943ab089989`

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

## SECP256K1 Mint Çıktı

Bir [secp256k1](cryptographic-primitives.md#secp-256-k1-addresses) nane çıktısı bir adres koleksiyona ait bir çıktıdır.

### **SECP256K1 Mint Çıktı Içerir**

Bir secp256k1 Mint çıktısı `TypeID`, `Locktime`, `Threshold` ve `Adresler` içerir.

* Bu çıktıların kimliği, **`TypeID`** tipidir. `006`.
* **`Locktime`**, bu çıkışın sonra harcanabileceği unix zaman damgasını içerecek uzunluktadır. İkinciye özgü zaman damgası özeldir.
* **`Threshold`**, çıkışı harcamak için gerekli eşsiz imzaların sayısını belirleyen bir int **`Adreslerin`** uzunluğuna eşit ya da daha az olmalı. **`Adresler`** boşsa, 0 olmalı.
* **`Adresler,`** bu çıkışı harcamak için kullanılabilecek özel anahtarlara karşılık gelen eşsiz adreslerin listesidir. Adresler lexicographically. olarak sıralanmalıdır.

### **Gantt SECP256K1 Mint Çıktı Specification**

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

### **Proto SECP256K1 Mint Çıktı Specification**

```text
message SECP256K1MintOutput {
    uint32 typeID = 1;            // 04 bytes
    uint64 locktime = 2;          // 08 bytes
    uint32 threshold = 3;         // 04 bytes
    repeated bytes addresses = 4; // 04 bytes + 20 bytes * len(addresses)
}
```

### **SECP256K1 Mint Çıktı Örneği**

SECP256K1 nane çıktısı yapalım:

* **`TypeID`**: `6`
* **`Kilit`**: `54321`
* **`Eşik`**: `1`
* **`Adresler`**:
* `0x51025c61fccc078f6933f834be6d5a955`
* `0xc344128e0601283523a24a461c8943ab089989`

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

## NFT Transfer Çıktı

NFT transfer çıktısı bir adres koleksiyona sahip olan bir NFT NFT

### **NFT Aktarım Çıktısını Içeriyor**

Bir NFT transfer çıktısı `TypeID`, `GroupID`, `Payload`, `Locktime`, `Threshold` ve `Adres` içerir.

* Bu çıktıların kimliği, **`TypeID`** tipidir. `00b`.
* **`GroupID`** bu NFT ile verilen grubu belirten bir int
* **`Yük,`** 1024 bayttan fazla uzun sürmeyen bir bayt dizisidir.
* **`Locktime`**, bu çıkışın sonra harcanabileceği unix zaman damgasını içerecek uzunluktadır. İkinciye özgü zaman damgası özeldir.
* **`Threshold`**, çıkışı harcamak için gerekli eşsiz imzaların sayısını belirleyen bir int **`Adreslerin`** uzunluğuna eşit ya da daha az olmalı. **`Adresler`** boşsa, 0 olmalı.
* **`Adresler,`** bu çıkışı harcamak için kullanılabilecek özel anahtarlara karşılık gelen eşsiz adreslerin listesidir. Adresler lexicographically. olarak sıralanmalıdır.

### **Gantt NFT Transfer Çıktı Specification**

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

### **Protez NFT Transfer Çıktı Specification**

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

### **NFT Transfer Çıktı Örnek**

NFT transfer çıktısını şöyle yapalım:

* **`TypeID`**: `11`
* **`GroupID`**: `12345`
* **`Yük`**: `0x431100`
* **`Kilit`**: `54321`
* **`Eşik`**: `1`
* **`Adresler`**:
* `0x51025c61fccc078f6933f834be6d5a955`
* `0xc344128e0601283523a24a461c8943ab089989`

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

## NFT Mint Çıktı

NFT nane çıktısı bir adres koleksiyona sahip olan bir NFT idi.

### **NFT Mint Çıktı Içeriyor**

NFT Mint çıktısı bir `TypeID`, `GroupID`, `Locktime`, `Threshold` ve `Adres` içerir.

* Bu çıktıların kimliği, **`TypeID`** tipidir. `00a`.
* **`GroupID`** bu NFT tarafından verilen grubu belirleyen bir int
* **`Locktime`**, bu çıkışın sonra harcanabileceği unix zaman damgasını içerecek uzunluktadır. İkinciye özgü zaman damgası özeldir.
* **`Threshold`**, çıkışı harcamak için gerekli eşsiz imzaların sayısını belirleyen bir int **`Adreslerin`** uzunluğuna eşit ya da daha az olmalı. **`Adresler`** boşsa, 0 olmalı.
* **`Adresler,`** bu çıkışı harcamak için kullanılabilecek özel anahtarlara karşılık gelen eşsiz adreslerin listesidir. Adresler lexicographically. olarak sıralanmalıdır.

### **Gantt NFT Mint Çıktı Specification**

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

### **Protez NFT Mint Çıktı Specification**

```text
message NFTMintOutput {
    uint32 typeID = 1;            // 04 bytes
    uint32 group_id = 2;          // 04 bytes
    uint64 locktime = 3;          // 08 bytes
    uint32 threshold = 4;         // 04 bytes
    repeated bytes addresses = 5; // 04 bytes + 20 bytes * len(addresses)
}
```

### **NFT Mint Çıktı Örnek**

NFT nane çıktısı yapalım:

* **`TypeID`**: `10`
* **`GroupID`**: `12345`
* **`Kilit`**: `54321`
* **`Eşik`**: `1`
* **`Adresler`**:
* `0x51025c61fccc078f6933f834be6d5a955`
* `0xc344128e0601283523a24a461c8943ab089989`

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

## Girdiler

Girdilerin tek bir türü vardır: `SECP256K1TransferInput`.

## SECP256K1 Transfer Girdi

Bir [secp256k1](cryptographic-primitives.md#secp-256-k1-addresses) transfer girdisi harcanmamış bir secp256k1 transfer çıktısını harcamasına izin verir.

### **SECP256K1 Aktarma Girdi Içeriyor**

Bir secp256k1 transfer girdisi `bir miktar` ve `Adres` contains içerir.

* **`Bu`** girdi tipinin kimliği. `005`.
* **`Miktar,`** bu girişin from tüketilmesi gereken miktarı belirten uzundur. Olumlu olmalı. in belirtilen miktara eşit olmalı.
* Adres Indices, UTXO. harcamak için kullanılan özel anahtarları tanımlayan eşsiz **`AddressIndices`** listesidir. UTXO her bir adresi UTXO. harcayabilecek bir dizi adres vardır. Her int bu işlem için imza atan adres dizisindeki indeksi temsil eder. Dizinin üst seviyeye kadar sıralanması gerekiyor.

### **Gantt SECP256K1 Transfer Girdi Belirtisi**

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

### **Proto SECP256K1 Transfer Girdi Belirtisi**

```text
message SECP256K1TransferInput {
    uint32 typeID = 1;                   // 04 bytes
    uint64 amount = 2;                   // 08 bytes
    repeated uint32 address_indices = 3; // 04 bytes + 04 bytes * len(address_indices)
}
```

### **SECP256K1 Transfer Girdi Örnek**

Ödeme girdisi ile yapalım:

* **`TypeId`**: `5`
* **`Amount`**: `123456789`
* **`Adres Adresi`**````:

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

## Operasyonlar

Operasyonlarda üç olası tip vardır: `SECP256K1MintOperation`, `NFTMintOp`, ve `NFTTransferop`.

## **SECP256K1 MM Operasyonu**

[SECP256K1](cryptographic-primitives.md#secp-256-k1-addresses) nane işlemleri SECP256K1 nane çıktısını tüketir, yeni bir nane çıktısı yaratır ve yeni bir grup sahiplerine transfer çıktısını gönderir.

### **SECP256K1 Mint Operasyonu Içeriyor**

Bir secp256k1 Mint operasyonu bir `TypeID`, `Adres Adresleri`, `MintOutput`, ve `a` içerir.

* Bu çıktıların kimliği, **`TypeID`** tipidir. `008`.
* Adres Indices, [UTXO](avm-transaction-serialization.md#utxo). harcamak için kullanılan özel anahtarları tanımlayan eşsiz **`AddressIndices`** listesidir. UTXO her bir adresi UTXO. harcayabilecek bir dizi adres vardır. Her int bu işlem için imza atan adres dizisindeki indeksi temsil eder. Dizinin üst seviyeye kadar sıralanması gerekiyor.
* **`MintOutput`** [SECP256K1 Mint](avm-transaction-serialization.md#secp256k1-mint-output) çıktısı.
* **`Transferoutput`** [SECP256K1 Transfer](avm-transaction-serialization.md#secp256k1-transfer-output) çıktısı.

### **Gantt SECP256K1 Mint Operasyonu Belirleniyor**

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

### **Proto SECP256K1 Mint Operasyonu Belirleniyor**

```text
message SECP256K1MintOperation {
    uint32 typeID = 1;                   // 4 bytes
    repeated uint32 address_indices = 2; // 04 bytes + 04 bytes * len(address_indices)
    MintOutput mint_output = 3;          // size(mint_output
    TransferOutput transfer_output = 4;  // size(transfer_output)
}
```

### **SECP256K1 Mint Operasyonu Örnek**

[Şu sekp256k1](cryptographic-primitives.md#secp-256-k1-addresses) nane operasyonu yapalım:

* **`TypeId`**: `8`
* **`Adres Adres Adresi`**:
* `003`
* `0x007`
* **`Mintoutput`**: `"Örnek SECP256K1 Mint Çıktı Yukarıdan`
* **`Transferoutput`**: `"Örnek SECP256K1 Transfer Çıktısı"`

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

NFT nane operasyonu NFT nane çıktısını tüketir ve yeni bir sahiplere harcanmamış bir çıkış gönderir.

### **NFT Mint Op Içeriyor**

NFT nane operasyonu `bir` `TypeID`, `Adres Adres Adres Adresi Adresi ve` `a``` içerir.

* Bu tip bir operasyon için **`TypeID`** kimliktir. `00c`.
* Adres Indices, UTXO. harcamak için kullanılan özel anahtarları tanımlayan eşsiz **`AddressIndices`** listesidir. UTXO her bir adresi UTXO. harcayabilecek bir dizi adres vardır. Her int bu işlem için imza atan adres dizisindeki indeksi temsil eder. Dizinin üst seviyeye kadar sıralanması gerekiyor.
* **`GroupID`** bu NFT tarafından verilen grubu belirleyen bir int
* **`Yük,`** 1024 bayttan fazla olmayan bir bayt dizisidir.
* **`Çıkış`** bir `TransferableOutput`, fakat daha ziyade bir kilit, eşik ve bu çıkışı harcamak için kullanılabilecek özel anahtarlara karşılık gelen eşsiz adresler dizisidir. Adresler lexicographically. olarak sıralanmalıdır.

### **Gantt NFT Mint Op Specification**

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

### **Protez NFT Mint Op Specification**

```text
message NFTMintOp {
    uint32 typeID = 1;                   // 04 bytes
    repeated uint32 address_indices = 2; // 04 bytes + 04 bytes * len(address_indices)
    uint32 group_id = 3;                 // 04 bytes
    bytes payload = 4;                   // 04 bytes + len(payload)
    repeated bytes outputs = 5;          // 04 bytes + size(outputs)
}
```

### **NFT Mint Op Örnek**

NFT nane ameliyatı yapalım:

* **`TypeId`**: `12`
* **`Adres Adres Adresi`**:
   * `003`
   * `0x007`
* **`GroupID`**: `12345`
* **`Yük`**: `0x431100`
* **`Kilit`**: `54321`
* **`Eşik`**: `1`
* **`Adresler`**:
* `0xc344128e0601283523a24a461c8943ab089989`

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

## NFT Transfer Op

NFT transfer işlemi yeni bir sahiplere harcanmamış NFT transfer çıktısını gönderir.

### **NFT Transfer Operasyonu Içeriyor**

Bir NFT transfer operasyonu bir `TypeID`, `Adres Indices` ve bir `an` içerir.

* Bu çıktıların kimliği, **`TypeID`** tipidir. `00d`.
* Adres Indices, UTXO. harcamak için kullanılan özel anahtarları tanımlayan eşsiz **`AddressIndices`** listesidir. UTXO her bir adresi UTXO. harcayabilecek bir dizi adres vardır. Her int bu işlem için imza atan adres dizisindeki indeksi temsil eder. Dizinin üst seviyeye kadar sıralanması gerekiyor.
* **`NFTTransferoutput`** bu operasyonun çıkışı ve [bir NFT Transfer Çıkışı](avm-transaction-serialization.md#nft-transfer-output) olması gerekiyor. Bu çıkışın **`the`** yoktur, çünkü bu tür bu operasyonun içeriği ile bilinmektedir.

### **Gantt NFT Aktarma Operasyonu Specification**

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

### **Protez NFT Aktarma Operasyonu Belirtisi**

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

### **NFT Transfer Op Örnek**

NFT transfer işlemlerini şöyle yapalım:

* **`TypeID`**: `13`
* **`Adres Adres Adresi`**:
* `0x007`
* `003`
* **`GroupID`**: `12345`
* **`Yük`**: `0x431100`
* **`Kilit`**: `54321`
* **`Eşik`**: `1`
* **`Adresler`**:
* `0xc344128e0601283523a24a461c8943ab089989`
* `0x51025c61fccc078f6933f834be6d5a955`

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

## İlk Durum

İlk durum bir varlığın ilk durumunu tanımlar. Varlığın kullandığı özellik uzantısının kimliğini ve varlığın genesis UTXO kümesini belirten değişken uzunluk a dizisini içermektedir.

### Hangi Başlangıç Durumu Içeriyor

İlk durum bir `FxID` ve `bir` an içerir.

* **`FxID`** bu durumun bir parçası olduğu uzantıyı tanımlayan bir is SECP256K1 varlığı için `0x00'den` arıyorum. NFT varlıkları için, burası `001`.
* **`Çıkışlar`** yukarıda tanımlandığı [gibi](avm-transaction-serialization.md#outputs) değişken uzunluk dizisidir.

### Gantt Başlangıç Durumu Belirtisi

```text
+---------------+----------+-------------------------------+
| fx_id         : int      |                       4 bytes |
+---------------+----------+-------------------------------+
| outputs       : []Output |       4 + size(outputs) bytes |
+---------------+----------+-------------------------------+
                           |       8 + size(outputs) bytes |
                           +-------------------------------+
```

### Proto Başlangıç Durumu Belirtisi

```text
message InitialState {
    uint32 fx_id = 1;                  // 04 bytes
    repeated Output outputs = 2;       // 04 + size(outputs) bytes
}
```

### İlk Durum Örnekleri

İlk bir durum yapalım:

* `FxID`: `0x00.`
* `İlk durum`: `["Örnek SECP256K1 Transfer Çıktısı"]`

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

## Kimlikler

Credentials iki olası türü vardır: `SECP256K1Credential`, ve `NFTCredential`. Her bir giriş veya operasyon ile eşleştirilir. Kimlik düzeni girişin veya operasyonların sırasıyla uyuşuyor.

## SECP256K1 Credential

Bir [secp256k1](cryptographic-primitives.md#secp-256-k1-addresses) referansları 65 byte geri alınabilir imzalar listesi içerir.

### **SECP256K1 Credential Içeriyor**

* **`Bu`** tip için bir kimlik örneğidir. `009`.
* **`İmzalar`** 65 byte yeniden kurtarılabilir imzalar dizisidir. İmzaların sırası, girişin imza input’s uymalıdır.

### **Gantt SECP256K1 Credential Specification Specification**

```text
+------------------------------+---------------------------------+
| type_id         : int        |                         4 bytes |
+-----------------+------------+---------------------------------+
| signatures      : [][65]byte |  4 + 65 * len(signatures) bytes |
+-----------------+------------+---------------------------------+
                               |  8 + 65 * len(signatures) bytes |
                               +---------------------------------+
```

### **Proto SECP256K1 Credential Specification**

```text
message SECP256K1Credential {
    uint32 typeID = 1;             // 4 bytes
    repeated bytes signatures = 2; // 4 bytes + 65 bytes * len(signatures)
}
```

### **SECP256K1 Credential Örnek**

Ödeme girdisi ile yapalım:

* **`TypeID`**: `9`
* **`İmzalar`**:
* `00102030405060708090a0b0c0d0d0e0f11213151618191b1c1d1d1f22425262728292a22d303133f013f0113f013f133f11111b11b1b11b11b11cc3322`
* `0x404142445565667766`

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

## NFT Credential

NFT Credential farklı bir TypeID ile [secp256k1](avm-transaction-serialization.md#secp256k1-credential) Credential ile aynıdır. NFT Credential için TypeID `0x00e`.

## İmzalamamış İşlemler

İmzalanmamış işlemler sadece imzalar eksik olan bir işlemin tam içeriğini içermektedir. İmzalanmamış işlemler dört olası tip içerir: [`CreateAssetTx`](avm-transaction-serialization.md#what-unsigned-create-asset-tx-contains), [`OperationTx`](avm-transaction-serialization.md#what-unsigned-operation-tx-contains), [`ImportTx`](avm-transaction-serialization.md#what-unsigned-import-tx-contains), ve [`ExportTx`](avm-transaction-serialization.md#what-unsigned-export-tx-contains). Hepsi [`BaseTx`](avm-transaction-serialization.md#what-base-tx-contains), yerleştiriyor, bu da ortak alanlar ve operasyonlar içeriyor.

### Hangi Taban Tx Içeriyor

Bir temel tx bir `TypeID`, `NetworkID`, `BlockchainID`, `Outputs`, `Girdi` ve `Memo` içerir.

* **`Bu`** tip için bir kimlik örneğidir. `00`.
* **`NetworkID`** bu işlem için hangi ağ için verileceği tanımlanan bir int (NetworkID (NetworkID) bir int olarak tanımlanır. Bu değer işlem yönlendirmesini desteklemek için tasarlanır ve yeniden oynanma saldırı önleme için tasarlanmaz.
* **`Blockchain ID`** bu işlem için hangi blok zincirini tanımlayan 32 byte dizidir. Bu işlem ağ veya blok zinciri boyunca geçerli olabilecek işlemler için yeniden oynanma saldırı önleme için kullanılır.
* **`Çıkışlar`** [transferi edilebilir bir](avm-transaction-serialization.md#transferable-output) nesne dizisidir. Çıkışlar seri temsili lexicographically olarak sıralamalıdır. Bu çıkışlarda yaratılan varlıkların toplam miktarı girdilerde tüketilen toplam varlığın toplam miktarına eşit veya işlem ücreti eksi olarak tüketilmesine eşit olmalıdır.
* **`Girdiler,`** [transfer edilebilir girişim nesnelerinin](avm-transaction-serialization.md#transferable-input) bir dizisidir. Girdilerin sıralanması ve eşsiz olması gerekir. Girdiler, ilk olarak **`TxID`** ve sonra **`UTXOIndex`** tarafından satılır. Eğer aynı **`TxID`** ve **`UTXOIndex`** olan girdilerde varsa, bu işlem çift harcanmaya neden olacağı için geçersizdir.
* **`Memo`** alanı 256 baytlık bir bayttan oluşmaktadır.

### Gantt Base Tx Specification

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

### Proto Base Tx Specification

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

### Bas Tx Örnek

Önceki örneklerden giriş ve çıkışları kullanan bir baz tx yapalım:

* **`TypeID`**: `0`
* **`NetworkID`**: `4`
* **`Blockchain ID`**: `0xffffeeeeeedddccbbaa99888`
* **`Çıktılar`**:
   * `"Örnek Transferable Çıktı yukarıda tanımlanır`
* **`Girdiler`**:
   * `"Örnek Transferable Girdi yukarıda tanımlanır`
* **`Not`**: `0x0010203`

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

### İmzalamamış Varlık Tx Içeriyor

İmzalamamış bir varlık `tx`, `İsmi`, `Sembol`, `Denomination` ve `contains` içerir. `TypeID` `001`.

* **`BaseTx`**
* **`Bu`** işlem yaratacağı varlığın adını tanımlayan bir insan okunabilir sicim. Bu isim eşsiz olmak için garanti değil. Bu isim sadece basılabilir ASCII karakterlerinden oluşmalı ve 128 karakterden fazla olmamalıdır.
* **`Sembol,`** bu işlem yaratacağı varlığın sembolünü tanımlayan okunabilir bir dizidir. Sembolün eşsiz olması garanti değil. Sembol sadece basılabilir ASCII karakterlerinden oluşmalı ve 4 karakterden fazla olmamalıdır.
* **`Bu`** işlem yaratacağı varlığın bölünebilirliğini tanımlayan bir bayttır. Örneğin, AVAX işareti, milyarlarca kişiye bölünür. Bu nedenle, AVAX işaretinin paydası 9 oldu. 32 den fazla olmamalı.
* **`İlk Devletler`** bu varlık destekleyeceği özellikler uzantılarını ve bu özelliklerin [başlangıç](avm-transaction-serialization.md#initial-state) durumunu tanımlayan değişken uzunluk dizisidir.

### Gantt İmzalamamış Varlık Varlığı Tx Specification

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

### İmzalamamış Proto Varlık Tx Specification

```text
message CreateAssetTx {
    BaseTx base_tx = 1;                       // size(base_tx)
    string name = 2;                          // 2 bytes + len(name)
    name symbol = 3;                          // 2 bytes + len(symbol)
    uint8 denomination = 4;                   // 1 bytes
    repeated InitialState initial_states = 5; // 4 bytes + size(initial_states)
}
```

### İmzalamamış Varlık Varlığı Tx Örnekleri

Önceki örneklerden giriş ve çıkışları kullanan imzasız bir tx yapalım:

* `BaseTx`: `"Örnek BaseTx yukarıda tanımlanan kimlik seti 1'e göre tanımlanır`
* `Adı`: `Volatility Volatility`
* `Sembol`: `VIX`
* `Denomination`: `2`
* **`İlk olarak`**:
* `"Örnek Başlangıç Durumu yukarıda tanımlanıyor`

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

### Hangi İmzalanmamış Tx Operasyonu Içeriyor

İmzalanmamış bir tx bir `BaseTx` ve `Ops` içerir. Bu tip için `TypeID` `0x002`.

* **`BaseTx`**
* **`Operasyon`** değişken uzunlukta bir [transferable operasyon](avm-transaction-serialization.md#transferable-op) dizisidir.

### Gantt İmzalanmamış Tx Özelleştirme Operasyonu

```text
+---------+------------------+-------------------------------------+
| base_tx : BaseTx           |                 size(base_tx) bytes |
+---------+------------------+-------------------------------------+
| ops     : []TransferableOp |                 4 + size(ops) bytes |
+---------+------------------+-------------------------------------+
                             | 4 + size(ops) + size(base_tx) bytes |
                             +-------------------------------------+
```

### İmzalanmamış Proto Tx Özelleştirme Operasyonu

```text
message OperationTx {
    BaseTx base_tx = 1;          // size(base_tx)
    repeated TransferOp ops = 2; // 4 bytes + size(ops)
}
```

### İmzalanmamış Tx Örnek

Önceki örneklerden giriş ve çıkışları kullanan imzasız bir tx yapalım:

* `BaseTx`: `"Örnek BaseTx Yukarı" TypeID seti 2 e`
* **`Ops`**: `\["Örnek Transferable Op yukarıda tanımlanmış gibi"`\

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

### İmzalanmamış Tx Içeriyor

İmzasız bir ithal tx bir `BaseTx`, `SourceChain` ve `Ins` içerir. \* Bu tip için `TypeID`for `0x003`.

* **`BaseTx`**
* **`Kaynak`** zinciri 32 byte kaynak kodu bir kimliktir.
* **`Ins`** [Transferable](avm-transaction-serialization.md#transferable-input) of değişken uzunluk dizisidir.

### Gantt İmzalanmamış Aktarma Tx Tx

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

### İmzalanmamış Proto Aktarma Tx Tx

```text
message ImportTx {
    BaseTx base_tx = 1;          // size(base_tx)
    bytes source_chain = 2;      // 32 bytes
    repeated TransferIn ins = 3; // 4 bytes + size(ins)
}
```

### İmzalanmamış Tx Örnek

Önceki örneklerden girdileri kullanan imzasız bir aktarma tx yapalım:

* `BaseTx`: `"Örnek BaseTx yukarıda tanımlanmış` ama `TypeID` seti `3`'e ayarlandı.
* `Kaynak Zinciri`: `0x00`
* `Ins`: `"Örnek SECP256K1 Transfer Girdi yukarıda tanımlanır`

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

### İmzalanmamış Aktarma Tx Içeriyor

İmzasız bir ihracat tx bir `BaseTx`, `Destination Chain` ve `Outs` içerir. Bu tip için `TypeID` `0x004`.

* **`Tahliye`** zinciri, fonların ihraç edildiği zincirin 32 byte kimliği.
* **`Outs`** [Transferable Outputs](avm-transaction-serialization.md#transferable-output). değişken uzunluk dizisidir.

### Gantt İmzalamamış Aktarma Tx Tx

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

### Proto İmzalamadı Aktarma Tx Tx

```text
message ExportTx {
    BaseTx base_tx = 1;            // size(base_tx)
    bytes destination_chain = 2;   // 32 bytes
    repeated TransferOut outs = 3; // 4 bytes + size(outs)
}
```

### İmzalanmamış Aktarma Tx Örnekleri

Önceki örneklerden çıkan çıktıları kullanan imzasız bir aktarma tx yapalım:

* `BaseTx`: `"Örnek BaseTx yukarıda tanımlanmış` gibi tanımlanabilir", ama `TypeID` seti `4`'e ayarlanır
* `Hedef Zinciri`: `0x00`
* `Outs`: `"Örnek SECP256K1 Transfer Çıktı yukarıda tanımlanır`

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

## İmzalamış İşlem

İmzalı [işlem, bir](avm-transaction-serialization.md#credentials) dizi kimlik dizisinin eklenmesiyle imzalanmamış bir işlemdir.

### İmzaladığı Işlem Içeriyor

İmzalı bir işlem, `CodecID`, `UnsignedTx` ve `Credentials` içerir.

* **`CodecID`** geçerli kod kod çözücü tek kimlik `000`.
* **`İmzalanmamış Tx`** yukarıda belirtildiği gibi imzalanmamış bir işlemdir.
* **`Kimlik`** [bir dizi kimlik](avm-transaction-serialization.md#credentials) dizisidir. Her bir kimlik bu kimlik belgesindeki girdilerle aynı girişte eşleştirilecektir.

### Gantt İmzalamış İşlem Belirtisi

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

### Proto İmzalamış İşlem Belirtisi

```text
message Tx {
    uint16 codec_id = 1;                 // 2 bytes
    UnsignedTx unsigned_tx = 2;          // size(unsigned_tx)
    repeated Credential credentials = 3; // 4 bytes + size(credentials)
}
```

### İmzalamış Aktarım Örnekleri

İmzasız işlemleri ve özetlerini önceki örneklerden kullanan imzalı bir işlem yapalım.

* **`Şifreleme `**: `0`
* **`100404ffffcc`**` 5900b1c0b1c0b0b0d0d0b0d0d0b0101010d0d0d010d0d000d0100d0d000d00d0d010100d0d000d0d00d0d0d01000000d00d0d00d0d00d00d0d000d0d00d0d0d000101000d01010d0d0d0100d00100d0d0d010001010d0d01010d01010d010111010d0d0d00100d0d01010d0d01010d0d01010d0101010d0101001010`
* **`0010113141516171816191a1c1c1dd1dd122628292233`**``

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

UTXO bir işlem çıkışını temsil eden tek bir uygulamadır.

### UTXO Içeriyor

UTXO bir `CodecID`, `TxID`, `UTXOIndex`, `Varlık` ve `Çıktı` içerir.

* **`CodecID`** tek geçerli `CodecID` `000.`
* **`TxID`** 32 byte işlem kimliği. İşlem kimlikleri imzalanmış işlemlerin bytes Sha256 ile hesaplanır.
* **`UTXOIndex`**, **`TxID`** tarafından belirtilen işlemde bu utxo tarafından yaratılan bir işlemde hangi çıktıyı belirleyen bir is
* **`AssetID`** bu utxo referanslarını tanımlayan 32 byte dizidir.
* **`Çıkış`** bu utxo yaratan [çıkış](avm-transaction-serialization.md#transferable-output) object Çıkışların seri düzleştirilmesi yukarıda tanımlanmıştı.

### Gantt UTXO Specification

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

### Proto UTXO Specification

```text
message Utxo {
    uint16 codec_id = 1;     // 02 bytes
    bytes tx_id = 2;         // 32 bytes
    uint32 output_index = 3; // 04 bytes
    bytes asset_id = 4;      // 32 bytes
    Output output = 5;       // size(output)
}
```

### UTXO Örnek

Yukarıda yaratılan imzalı işlemden UTXO yapalım:

* **`Şifreleme `**: `0`
* **`TxID`**: `0xf96650f438867c3c9828dcdddbe660e21cccdb36a9276958f011ba472f75d4e7`
* **`UTXOIndex`**: `0` = `0x00.`
* **`Erişim`** `tarihi: 11213151718181911b112141618181811214161818113161818191b1d1e1e1)`
* **`Çıktı`**: `"Örnek SECP256K1 Aktarılabilir Çıktı yukarıda tanımlanır`

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

AVM'nin Genesis örneğinde verilecek bir varlık

### GenesisAsset Varlığı Içeriyor

Bir GenesisAsset örneğinde bir `Alias`, `NetworkID`, `BlockchainID`, `Outputs`, `Inputs`, `Memo`, `Adı`, `Sembol`, `Denomination` ve `of` oluşur.

* **`Alias`** bu varlığın takma adı.
* **`NetworkID`** bu işlem hangi ağa verilecek olduğunu belirler. Bu değer işlem yönlendirmesini desteklemek için tasarlanır ve yeniden oynanma saldırı önleme için tasarlanmaz.
* **`Blockchain ID`** bu işlem için hangi blok zincirini tanımlayan ID \(32-byte array\) tanımlar. Bu işlem ağ veya blok zinciri boyunca geçerli olabilecek işlemler için yeniden oynanma saldırı önleme için kullanılır.
* **`Çıkışlar`** [transferi edilebilir bir](avm-transaction-serialization.md#transferable-output) nesne dizisidir. Çıkışlar seri temsili lexicographically olarak sıralamalıdır. Bu çıkışlarda yaratılan varlıkların toplam miktarı girdilerde tüketilen toplam varlığın toplam miktarına eşit veya işlem ücreti eksi olarak tüketilmesine eşit olmalıdır.
* **`Girdiler,`** [transfer edilebilir girişim nesnelerinin](avm-transaction-serialization.md#transferable-input) bir dizisidir. Girdilerin sıralanması ve eşsiz olması gerekir. Girdiler, ilk olarak **`TxID`** ve sonra **`UTXOIndex`** tarafından satılır. Eğer aynı **`TxID`** ve **`UTXOIndex`** olan girdilerde varsa, bu işlem çift harcanmaya neden olacağı için geçersizdir.
* **`Memo`**, 256 baytlık bir bayt içeren, bir not alanıdır.
* **`Bu`** işlem yaratacağı varlığın adını tanımlayan bir insan okunabilir sicim. Bu isim eşsiz olmak için garanti değil. Bu isim sadece basılabilir ASCII karakterlerinden oluşmalı ve 128 karakterden fazla olmamalıdır.
* **`Sembol,`** bu işlem yaratacağı varlığın sembolünü tanımlayan okunabilir bir dizidir. Sembolün eşsiz olması garanti değil. Sembol sadece basılabilir ASCII karakterlerinden oluşmalı ve 4 karakterden fazla olmamalıdır.
* **`Bu`** işlem yaratacağı varlığın bölünebilirliğini tanımlayan bir bayttır. Örneğin, AVAX işareti, milyarlarca kişiye bölünür. Bu nedenle, AVAX işaretinin paydası 9 oldu. 32 den fazla olmamalı.
* **`İlk Devletler`** bu varlık destekleyeceği özellikler uzantılarını ve bu özelliklerin [başlangıç](avm-transaction-serialization.md#initial-state) durumunu tanımlayan değişken uzunluk dizisidir.

### Gantt GenesisAsset Specification

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

### Proto GenesisAsset Specification

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

### GenesisAsset Örnek

Bir GenesisAsset: yapalım:

* **`İsim`**: `Varlık 1`
* **`Ağ ID`**: `12345`
* **`Blockchain ID,`** `0x00`
* **`Çıktılar`**: [\]
* **`Girdiler`**:
* **`Mem`**: `2Zc54v4ek37TEwu4LiV3j41PUMRd6ACDDU3ZCVSxE7X`
* **`İsim`**: `Varlık 1`
* **`Sembol`**: `MFCA`
* **`Denomination`**: `1`
* **`İlk olarak`**:
* `"Örnek Başlangıç Durumu yukarıda tanımlanıyor`

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

