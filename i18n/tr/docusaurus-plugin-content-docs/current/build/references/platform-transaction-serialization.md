---
sidebar\_position: 8
---
# Platform İşlem Formatı

Bu dosyanın Avalanche'ın Platform Sanal Makinesi, diğer adıyla `Platform Chain` veya `P-Chain` üzerindeki işlemleri nasıl serileştirdiğimize ilişkin gerçeğin tek kaynağı olması amaçlanmaktadır. Bu dokümanda paketleme için [primitif serileştirme](serialization-primitives.md) formatı ve kriptografik kullanıcı kimliklendirmesi için [secp256k1](cryptographic-primitives.md#secp-256-k1-addresses) kullanılır.

## Codec ID'si

Bazı verilerin önüne verinin nasıl serileştireceğini belirten bir codec ID \(unt16\) eklenmiştir. Şu anda tek geçerli codec kimliği 0'dır \(`0x00 0x00`\).

## Transfer Edilebilir Çıktı

Transfer edilebilir çıktılar, bir çıktıyı varlık kimliği ile sarar \(wrap\).

### Transfer Edilebilir Çıktı Neleri İçerir

Transfer edilebilir bir çıktı, bir `AssetID` ve bir `Output` içerir.

* **`AssetID`**, bu çıktının hangi varlığa referans verdiğini belirten 32 baytlık bir dizilimdir. Tek geçerli `AssetID` AVAX `AssetID`'sidir.
* **`Output`**, aşağıdaki gibi tanımlanan bir çıktıdır. Mesela bu çıktı bir SECP256K1 transfer çıktısı olabilir.

### Gantt Transfer Edilebilir Çıktı Spesifikasyonu

```text
+----------+----------+-------------------------+
| asset_id : [32]byte |                32 bytes |
+----------+----------+-------------------------+
| output   : Output   |      size(output) bytes |
+----------+----------+-------------------------+
                      | 32 + size(output) bytes |
                      +-------------------------+
```

### Proto Transfer Edilebilir Çıktı Özellikleri

```text
message TransferableOutput {
    bytes asset_id = 1; // 32 bytes
    Output output = 2;  // size(output)
}
```

### Transfer Edilebilir Çıktı Örneği

Şimdi transfer edilebilir bir çıktı oluşturalım:

* `AssetID: 0x6870b7d66ac32540311379e5b5dbad28ec7eb8ddbfc8f4d67299ebb48475907a`
* `Output: "Example SECP256K1 Transfer Output from below"`

```text
[
    AssetID <- 0x6870b7d66ac32540311379e5b5dbad28ec7eb8ddbfc8f4d67299ebb48475907a,
    Output  <- 0x0000000700000000ee5be5c000000000000000000000000100000001da2bee01be82ecc00c34f361eda8eb30fb5a715c,
]
=
[
    // assetID:
    0x68, 0x70, 0xb7, 0xd6, 0x6a, 0xc3, 0x25, 0x40,
    0x31, 0x13, 0x79, 0xe5, 0xb5, 0xdb, 0xad, 0x28,
    0xec, 0x7e, 0xb8, 0xdd, 0xbf, 0xc8, 0xf4, 0xd6,
    0x72, 0x99, 0xeb, 0xb4, 0x84, 0x75, 0x90, 0x7a,
    // output:
    0x00, 0x00, 0x00, 0x07, 0x00, 0x00, 0x00, 0x00,
    0xee, 0x5b, 0xe5, 0xc0, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x01, 0xda, 0x2b, 0xee, 0x01,
    0xbe, 0x82, 0xec, 0xc0, 0x0c, 0x34, 0xf3, 0x61,
    0xed, 0xa8, 0xeb, 0x30, 0xfb, 0x5a, 0x71, 0x5c,
]
```

## Transfer Edilebilir Girdi

Transfer edilebilir girdiler, transfer girdisi verilmiş olan belli bir UTXO'yu tarif eder.

### Transfer Edilebilir Girdi Neleri İçerir

Transfer edilebilir bir girdi bir `TxID`, `UTXOIndex`, `AssetID` ve `Input`içerir.

* **`TxID`**, bu girdinin hangi işlemden bir çıktıyı tükettiğini tanımlayan 32 baytlık bir dizilimdir.
* **`UTXOIndex`**, bu girdinin belirlenen işlemde hangi utxo'yu tükettiğini belirleyen bir tamsayıdır \(int\).
* **`AssetID`**, bu girdinin referans verdiği varlığı tanımlayan 32 baytlık bir dizilimdir. Tek geçerli `AssetID` AVAX `AssetID`'sidir.
* **`Input`**, transfer edilebilir bir girdi nesnesidir.

### Gantt Transfer Edilebilir Girdi Spesifikasyonu

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

### Proto Transfer Edilebilir Girdi Özellikleri

```text
message TransferableInput {
    bytes tx_id = 1;       // 32 bytes
    uint32 utxo_index = 2; // 04 bytes
    bytes asset_id = 3;    // 32 bytes
    Input input = 4;       // size(input)
}
```

### Transfer Edilebilir Girdi Örneği

Şimdi bir transfer edilebilir girdi oluşturalım:

* **`TxID`**: `0x0dfafbdf5c81f635c9257824ff21c8e3e6f7b632ac306e11446ee540d34711a15`
* **`UTXOIndex`**: `0`
* **`AssetID`**: `0x6870b7d66ac32540311379e5b5dbad28ec7eb8ddbfc8f4d67299ebb48475907a`
* **`Input`**: `"Example SECP256K1 Transfer Input from below"`

```text
[
    TxID      <- 0x0dfafbdf5c81f635c9257824ff21c8e3e6f7b632ac306e11446ee540d34711a15
    UTXOIndex <- 0x00000001
    AssetID   <- 0x6870b7d66ac32540311379e5b5dbad28ec7eb8ddbfc8f4d67299ebb48475907a
    Input     <- 0x0000000500000000ee6b28000000000100000000
]
=
[
    // txID:
    0xdf, 0xaf, 0xbd, 0xf5, 0xc8, 0x1f, 0x63, 0x5c,
    0x92, 0x57, 0x82, 0x4f, 0xf2, 0x1c, 0x8e, 0x3e,
    0x6f, 0x7b, 0x63, 0x2a, 0xc3, 0x06, 0xe1, 0x14,
    0x46, 0xee, 0x54, 0x0d, 0x34, 0x71, 0x1a, 0x15,
    // utxoIndex:
    0x00, 0x00, 0x00, 0x01,
    // assetID:
    0x68, 0x70, 0xb7, 0xd6, 0x6a, 0xc3, 0x25, 0x40,
    0x31, 0x13, 0x79, 0xe5, 0xb5, 0xdb, 0xad, 0x28,
    0xec, 0x7e, 0xb8, 0xdd, 0xbf, 0xc8, 0xf4, 0xd6,
    0x72, 0x99, 0xeb, 0xb4, 0x84, 0x75, 0x90, 0x7a,
    // input:
    0x00, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x00,
    0xee, 0x6b, 0x28, 0x00, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x00
]
```

## Çıktılar

Çıktıların iki olası tipi vardır: `SECP256K1TransferOutput`, `SECP256K1OutputOwners`.

## SECP256K1 Transfer Çıktısı

Bir [secp256k1](cryptographic-primitives.md#secp-256-k1-addresses) transfer çıktısı, bir varlığın bir miktarının bir adresler koleksiyonuna belirlenen bir unix zamanından sonra gönderilmesine imkan verir. Tek geçerli varlık AVAX'tır.

### **SECP256K1 Transfer Çıktısı Neleri İçerir**

Bir secp256k1 transfer çıktısı bir `TypeID`, `Amount`, `Locktime`, `Threshold` ve `Addresses` içerir.

* **`TypeID`**, bu çıktı tipinin kimliğidir.  `0x00000007`değerindedir.
* **`Amount`**, bu çıktının sahip olduğu varlığın miktarını belirten bir long'tur \(uzun veri tipi\). Pozitif bir değer olmalıdır.
* **`Locktime`**, bu çıktının sonrasında harcanabileceği unix zaman damgasını içeren bir long'tur. Unix zaman damgası saniyeye kadar kesin bir birimdir.
* **`Threshold`**, çıktıyı harcamak için gereken benzersiz imzaların sayısını belirten bir tamsayıdır. **`Addresses`** uzunluğundan küçük veya ona eşit olmalıdır. **`Addresses`** ögesi boş ise, 0 olmalıdır.
* **`Addresses`**, bu çıktıyı harcamak için kullanılabilecek özel anahtarlara karşılık gelen benzersiz adreslerin bir listesidir. Adresler sözlük sıralaması ile sıralanmalıdır.

### **Gantt SECP256K1 Transfer Çıktısı Spesifikasyonu**

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

### **Proto SECP256K1 Transfer Çıktısı Spesifikasyonu**

```text
message SECP256K1TransferOutput {
    uint32 type_id = 1;           // 04 bytes
    uint64 amount = 2;            // 08 bytes
    uint64 locktime = 3;          // 08 bytes
    uint32 threshold = 4;         // 04 bytes
    repeated bytes addresses = 5; // 04 bytes + 20 bytes * len(addresses)
}
```

### **SECP256K1 Transfer Çıktısı Örneği**

Şimdi şunu kullanarak bir secp256k1 transfer çıktısı oluşturalım:

* **`TypeID`**: 7
* **`Amount`**: 3999000000
* **`Locktime`**: 0
* **`Threshold`**: 1
* **`Addresses`**:
   * 0xda2bee01be82ecc00c34f361eda8eb30fb5a715c

```text
[
    TypeID    <- 0x00000007
    Amount    <- 0x00000000ee5be5c0
    Locktime  <- 0x0000000000000000
    Threshold <- 0x00000001
    Addresses <- [
        0xda2bee01be82ecc00c34f361eda8eb30fb5a715c,
    ]
]
=
[
    // type_id:
    0x00, 0x00, 0x00, 0x07,
    // amount:
    0x00, 0x00, 0x00, 0x00, 0xee, 0x5b, 0xe5, 0xc0,
    // locktime:
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    // threshold:
    0x00, 0x00, 0x00, 0x01,
    // number of addresses:
    0x00, 0x00, 0x00, 0x01,
    // addrs[0]:
    0xda, 0x2b, 0xee, 0x01, 0xbe, 0x82, 0xec, 0xc0,
    0x0c, 0x34, 0xf3, 0x61, 0xed, 0xa8, 0xeb, 0x30,
    0xfb, 0x5a, 0x71, 0x5c,
]
```

## SECP256K1 Çıktı Sahipleri Çıktısı

Bir [Secp256k1](cryptographic-primitives.md#secp-256-k1-addresses) çıktı sahipleri çıktısı, kilitleme dönemi sona erdiğinde staking ödülleri alacaktır.

### **SECP256K1 Çıktı Sahipleri Çıktısı Neleri İçerir**

Bir Secp256k1 çıktı sahipleri çıktısı bir `TypeID`, `Locktime`, `Threshold` ve `Addresses` içerir.

* **`TypeID`**, bu çıktı tipinin kimliğidir. Bu kimlik `0x0000000b`'dir.
* **`Locktime`**, bu çıktının sonrasında harcanabileceği unix zaman damgasını içeren bir long'tur. Unix zaman damgası saniyeye kadar kesin bir birimdir.
* **`Threshold`**, çıktıyı harcamak için gereken benzersiz imzaların sayısını belirten bir tamsayıdır. **`Addresses`** uzunluğundan küçük veya ona eşit olmalıdır. **`Addresses`** ögesi boş ise, 0 olmalıdır.
* **`Addresses`**, bu çıktıyı harcamak için kullanılabilecek özel anahtarlara karşılık gelen benzersiz adreslerin bir listesidir. Adresler sözlükbilim \(lexicographically\) sıralamasına göre sıralanmalıdır.

### **Gantt SECP256K1 Çıktı Sahipleri Çıktısı Spesifikasyonu**

```text
+-----------+------------+--------------------------------+
| type_id   : int        |                        4 bytes |
+-----------+------------+--------------------------------+
| locktime  : long       |                        8 bytes |
+-----------+------------+--------------------------------+
| threshold : int        |                        4 bytes |
+-----------+------------+--------------------------------+
| addresses : [][20]byte |  4 + 20 * len(addresses) bytes |
+-----------+------------+--------------------------------+
                         | 20 + 20 * len(addresses) bytes |
                         +--------------------------------+
```

### **Proto SECP256K1 Çıktı Sahipleri Çıktısı Spesifikasyonu**

```text
message SECP256K1OutputOwnersOutput {
    uint32 type_id = 1;           // 04 bytes
    uint64 locktime = 2;          // 08 bytes
    uint32 threshold = 3;         // 04 bytes
    repeated bytes addresses = 4; // 04 bytes + 20 bytes * len(addresses)
}
```

### **SECP256K1 Çıktı Sahipleri Çıktısı Örneği**

Şimdi şunu kullanarak bir Secp256k1 çıktı sahipleri çıktısı oluşturalım:

* **`TypeID`**: 11
* **`Locktime`**: 0
* **`Threshold`**: 1
* **`Addresses`**:
   * 0xda2bee01be82ecc00c34f361eda8eb30fb5a715c

```text
[
    TypeID    <- 0x0000000b
    Locktime  <- 0x0000000000000000
    Threshold <- 0x00000001
    Addresses <- [
        0xda2bee01be82ecc00c34f361eda8eb30fb5a715c,
    ]
]
=
[
    // type_id:
    0x00, 0x00, 0x00, 0x0b,
    // locktime:
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    // threshold:
    0x00, 0x00, 0x00, 0x01,
    // number of addresses:
    0x00, 0x00, 0x00, 0x01,
    // addrs[0]:
    0xda, 0x2b, 0xee, 0x01, 0xbe, 0x82, 0xec, 0xc0,
    0x0c, 0x34, 0xf3, 0x61, 0xed, 0xa8, 0xeb, 0x30,
    0xfb, 0x5a, 0x71, 0x5c,
]
```

## Girdiler

Girdilerin bir olası tipi vardır: `SECP256K1TransferInput`.

## SECP256K1 Transfer Girdisi

Secp265k1 transfer girdisi, harcanmamış bir [secp256k1](cryptographic-primitives.md#secp-256-k1-addresses) transfer çıktısını harcamaya olanak tanır.

### **SECP256K1 Transfer Çıktısı Neleri İçerir**

Bir Secp256k1 transfer girdisi bir `Amount` ve `AddressIndices` içerir.

* **`TypeID`**, bu çıktı tipinin kimliğidir. Bu kimlik `0x00000005`'dir.
* **`Amount`**, bu girdinin UTXO'dan harcıyor olması gereken miktarı belirten bir long'tur. Pozitif bir değer olmalıdır. UTXO'da belirlenen miktara eşit olmalıdır.
* **`AddressIndices`**, UTXO'yu harcamak için kullanılan özel anahtarları belirleyen bir benzersiz tamsayılar listesidir. Her bir UTXO'da UTXO'yu harcayabilecek adreslerin bir dizilimi vardır. Her tamsayı, işlemi imzalayacak bu adres dizisindeki endeksi temsil eder. Dizi en düşükten en yükseğe doğru sıralanmalıdır.

### **Gantt SECP256K1 Transfer Girdisi Spesifikasyonu**

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

**Proto SECP256K1 Transfer Girdisi Spesifikasyonu**

```text
message SECP256K1TransferInput {
    uint32 type_id = 1;                  // 04 bytes
    uint64 amount = 2;                   // 08 bytes
    repeated uint32 address_indices = 3; // 04 bytes + 4 bytes * len(address_indices)
}
```

### **SECP256K1 Transfer Girdisi Örneği**

Şimdi şunu kullanarak bir ödeme girdisi oluşturalım:

* **`TypeID`**: 5
* **`Amount`**: 4000000000
* **`AddressIndices`**: [0]

```text
[
    TypeID         <- 0x00000005
    Amount         <- 0x00000000ee6b2800,
    AddressIndices <- [0x00000000]
]
=
[
    // type_id:
    0x00, 0x00, 0x00, 0x05,
    // amount:
    0x00, 0x00, 0x00, 0x00, 0xee, 0x6b, 0x28, 0x00,
    // length:
    0x00, 0x00, 0x00, 0x01,
    // address_indices[0]
    0x00, 0x00, 0x00, 0x00
]
```

## İmzalanmamış İşlemler

İmzalanmamış işlemler, bir işlemin sadece imzaların eksik olduğu tam içeriğini içerir. İmzalanmamış işlemlerin altı olası tipi vardır: `AddValidatorTx`, `AddSubnetValidatorTx`, `AddDelegatorTx`, `CreateSubnetTx`, `ImportTx` ve `ExportTx`. Bunlar, ortak alanlar ve operasyonlar içeren `BaseTx` iliştirirler.

## İmzalanmamış BaseTx

### **Base Tx Neleri İçerir**

Bir base tx, bir `TypeID`, `NetworkID`, `BlockchainID`, `Outputs`, `Inputs` ve `Memo` içerir.

* **`TypeID`**, bu tipin kimliğidir. Bu kimlik `0x00000000`'dir.
* **`NetworkID`**, bu işlemin hangi ağa gönderilmesi amaçlandıysa, o ağı tanımlayan bir tamsayıdır. Bu değerin işlem yönlendirmeyi desteklemesi amaçlanır ve tekrarlama saldırısını \(replay attack\) önlemek için tasarlanmamıştır.
* **`BlockchainID`**, bu işlemin gönderildiği blok zinciri tanımlayan 32 baytlık bir dizilimidir. Bu, ağda veya blok zincirde potansiyel olarak geçerli olabilecek işlemlere yönelik tekrarlama saldırılarını önlemek için kullanılır.
* **`Outputs`**, transfer edilebilir çıktı nesnelerinin bir dizilimidir. Çıktılar serileştirilmiş temsillerine göre sözlükbilimsel olarak sıralanmalıdır. Bu çıktılarda yaratılan varlıkların toplam miktarı, girdilerde tüketilen her bir varlığın toplam miktarından işlem ücreti düşüldükten sonra kalan miktarından küçük ya da ona eşit olmalıdır.
* **`Inputs`**, transfer edilebilir girdi nesnelerinin bir dizilimidir. Girdiler sıralanmış ve benzersiz olmalıdır. Girdiler önce **`TxID`**'e göre ve sonra **`UTXOIndex`**'e göre küçükten büyüğe doğru sözlükbilimsel olarak sıralanır. Aynı **`TxID`** ve **`UTXOIndex`**'e sahip girdiler varsa, işlem geçersizdir, çünkü bu durum çifte harcamaya yol açabilir.
* **`Memo`** Memo alanı 256 bayta kadar gelişigüzel baytlar içerir.

### **Gantt Base Tx Spesifikasyonu**

```text
+---------------+----------------------+-----------------------------------------+
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

### **Proto Base Tx Spesifikasyonu**

```text
message BaseTx {
    uint32 type_id = 1;          // 04 bytes
    uint32 network_id = 2;       // 04 bytes
    bytes blockchain_id = 3;     // 32 bytes
    repeated Output outputs = 4; // 04 bytes + size(outs)
    repeated Input inputs = 5;   // 04 bytes + size(ins)
    bytes memo = 6;              // 04 bytes + size(memo)
}
```

### **Base Tx Örneği**

Şimdi önceki örneklerden girdiler ve çıktılar kullanan bir base tx oluşturalım:

* **`TypeID`**: `0`
* **`NetworkID`**: `12345`
* **`BlockchainID`**: `0x000000000000000000000000000000000000000000000000000000000000000`
* **`Outputs`**:
   * `"Example Transferable Output as defined above"`
* **`Inputs`**:
   * `"Example Transferable Input as defined above"`

```text
[
    TypeID       <- 0x00000000
    NetworkID    <- 0x00003039
    BlockchainID <- 0x000000000000000000000000000000000000000000000000000000000000000
    Outputs      <- [
        0x6870b7d66ac32540311379e5b5dbad28ec7eb8ddbfc8f4d67299ebb48475907a0000000700000000ee5be5c000000000000000000000000100000001da2bee01be82ecc00c34f361eda8eb30fb5a715c
    ]
    Inputs       <- [
        0xdfafbdf5c81f635c9257824ff21c8e3e6f7b632ac306e11446ee540d34711a15000000016870b7d66ac32540311379e5b5dbad28ec7eb8ddbfc8f4d67299ebb48475907a0000000500000000ee6b28000000000100000000
    ]
]
=
[
    // type_id:
    0x00, 0x00, 0x00, 0x00,
    // networkID:
    0x00, 0x00, 0x30, 0x39,
    // blockchainID:
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    // number of outputs:
    0x00, 0x00, 0x00, 0x01,
    // transferable output:
    0x68, 0x70, 0xb7, 0xd6, 0x6a, 0xc3, 0x25, 0x40,
    0x31, 0x13, 0x79, 0xe5, 0xb5, 0xdb, 0xad, 0x28,
    0xec, 0x7e, 0xb8, 0xdd, 0xbf, 0xc8, 0xf4, 0xd6,
    0x72, 0x99, 0xeb, 0xb4, 0x84, 0x75, 0x90, 0x7a,
    0x00, 0x00, 0x00, 0x07, 0x00, 0x00, 0x00, 0x00,
    0xee, 0x5b, 0xe5, 0xc0, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x01, 0xda, 0x2b, 0xee, 0x01,
    0xbe, 0x82, 0xec, 0xc0, 0x0c, 0x34, 0xf3, 0x61,
    0xed, 0xa8, 0xeb, 0x30, 0xfb, 0x5a, 0x71, 0x5c,
    // number of inputs:
    0x00, 0x00, 0x00, 0x01,
    // transferable input:
    0xdf, 0xaf, 0xbd, 0xf5, 0xc8, 0x1f, 0x63, 0x5c,
    0x92, 0x57, 0x82, 0x4f, 0xf2, 0x1c, 0x8e, 0x3e,
    0x6f, 0x7b, 0x63, 0x2a, 0xc3, 0x06, 0xe1, 0x14,
    0x46, 0xee, 0x54, 0x0d, 0x34, 0x71, 0x1a, 0x15,
    0x00, 0x00, 0x00, 0x01,
    0x68, 0x70, 0xb7, 0xd6, 0x6a, 0xc3, 0x25, 0x40,
    0x31, 0x13, 0x79, 0xe5, 0xb5, 0xdb, 0xad, 0x28,
    0xec, 0x7e, 0xb8, 0xdd, 0xbf, 0xc8, 0xf4, 0xd6,
    0x72, 0x99, 0xeb, 0xb4, 0x84, 0x75, 0x90, 0x7a,
    0x00, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x00,
    0xee, 0x6b, 0x28, 0x00, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x00,
    // Memo length:
    0x00, 0x00, 0x00, 0x00,
]
```

## İmzalanmamış Doğrulayıcı Ekleme İşlemi

### **İmzalanmamış Doğrulayıcı Ekleme İşlemi Neleri İçerir**

Bir imzalanmamış doğrulayıcı ekleme işlemi bir `BaseTx`, `Validator`, `Stake`, `RewardsOwner` ve `Shares` içerir. Bu tipin `TypeID`'si `0x0000000c`'dir.

* **`BaseTx`**
* **`Validator`** Doğrulayıcı bir `NodeID`, `StartTime`, `EndTime` ve `Weight`'ya sahiptir
   * **`NodeID`**, doğrulayıcının düğüm kimliği olan 20 bayttır.
   * **`StartTime`**, doğrulayıcının doğrulamaya başladığı andaki Unix zamanı olan bir long'tur.
   * **`EndTime`**, doğrulayıcının doğrulamayı durdurduğu Unix zamanı olan bir long'tur.
   * **`Weight`**, doğrulayıcının stake ettiği tutar olan bir long'tur
* **`Stake`** Stake `LockedOuts`'a sahiptir
   * **`LockedOuts`** Staking dönemi boyunca kilitlenen Transfer Edilebilir Çıktıların bir dizilimidir. Staking döneminin sonunda bu çıktılar ilgili adreslerine iade edilir.
* **`RewardsOwner`** Bir `SECP256K1OutputOwners`'dir
* **`Shares`**, yetkilendiricilerden \(delegator\) alınan ödül yüzdesinin 10.000 katıdır

### **Gantt İmzalanmamış Doğrulayıcı Ekleme İşleme Spesifikasyonu **

```text
+---------------+-----------------------+-----------------------------------------+
| base_tx       : BaseTx                |                     size(base_tx) bytes |
+---------------+-----------------------+-----------------------------------------+
| validator     : Validator             |                                44 bytes |
+---------------+-----------------------+-----------------------------------------+
| stake         : Stake                 |                  size(LockedOuts) bytes |
+---------------+-----------------------+-----------------------------------------+
| rewards_owner : SECP256K1OutputOwners |               size(rewards_owner) bytes |
+---------------+-----------------------+-----------------------------------------+
| shares        : Shares                |                                 4 bytes |
+---------------+-----------------------+-----------------------------------------+
                  | 48 + size(stake) + size(rewards_owner) + size(base_tx) bytes |
                  +--------------------------------------------------------------+
```

### **Proto İmzalanmamış Doğrulayıcı Ekleme İşlemi Spesifikasyonu**

```text
message AddValidatorTx {
    BaseTx base_tx = 1;                      // size(base_tx)
    Validator validator = 2;                 // 44 bytes
    Stake stake = 3;                         // size(LockedOuts)
    SECP256K1OutputOwners rewards_owner = 4; // size(rewards_owner)
    uint32 shares = 5;                       // 04 bytes
}
```

### **İmzalanmamış Doğrulayıcı Ekleme İşlemi Örneği**

Şimdi önceki örneklerden girdiler ve çıktılar kullanan imzalanmamış doğrulayıcı ekleme işlemi oluşturalım:

* **`BaseTx`**: `"Example BaseTx as defined above with ID set to 0c"`
* **`Validator`** Doğrulayıcı bir `NodeID`, `StartTime`, `EndTime` ve `Weight`'ya sahiptir
   * **`NodeID`**, doğrulayıcının düğüm kimliği olan 20 bayttır.
   * **`StartTime`**, doğrulayıcının doğrulamaya başladığı andaki Unix zamanı olan bir long'tur.
   * **`EndTime`**, doğrulayıcının doğrulamayı durdurduğu Unix zamanı olan bir long'tur.
   * **`Weight`**, doğrulayıcının stake ettiği tutar olan bir long'tur
* **`Stake`**: `0x0000000139c33a499ce4c33a3b09cdd2cfa01ae70dbf2d18b2d7d168524440e55d55008800000007000001d1a94a2000000000000000000000000001000000013cb7d3842e8cee6a0ebd09f1fe884f6861e1b29c`
* **`RewardsOwner`**: `0x0000000b00000000000000000000000100000001da2bee01be82ecc00c34f361eda8eb30fb5a715c`
* **`Shares`**: `0x00000064`

   0x0000000b00000000000000000000000100000001da2bee01be82ecc00c34f361eda8eb30fb5a715c

```text
[
    BaseTx       <- 0x0000000c000030390000000000000000000000000000000000000000000000000000000000000006870b7d66ac32540311379e5b5dbad28ec7eb8ddbfc8f4d67299ebb48475907a0000000700000000ee5be5c000000000000000000000000100000001da2bee01be82ecc00c34f361eda8eb30fb5a715cdfafbdf5c81f635c9257824ff21c8e3e6f7b632ac306e11446ee540d34711a15000000016870b7d66ac32540311379e5b5dbad28ec7eb8ddbfc8f4d67299ebb48475907a0000000500000000ee6b28000000000100000000
    NodeID       <- 0xe9094f73698002fd52c90819b457b9fbc866ab80
    StarTime     <- 0x000000005f21f31d
    EndTime      <- 0x000000005f497dc6
    Weight       <- 0x000000000000d431
    Stake        <- 0x0000000139c33a499ce4c33a3b09cdd2cfa01ae70dbf2d18b2d7d168524440e55d55008800000007000001d1a94a2000000000000000000000000001000000013cb7d3842e8cee6a0ebd09f1fe884f6861e1b29c
    RewardsOwner <- 0x0000000b00000000000000000000000100000001da2bee01be82ecc00c34f361eda8eb30fb5a715c
    Shares       <- 0x00000064
]
=
[
    // base tx:
    0x00, 0x00, 0x00, 0x0c, 0x00, 0x00, 0x30, 0x39,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x01, 0x68, 0x70, 0xb7, 0xd6,
    0x6a, 0xc3, 0x25, 0x40, 0x31, 0x13, 0x79, 0xe5,
    0xb5, 0xdb, 0xad, 0x28, 0xec, 0x7e, 0xb8, 0xdd,
    0xbf, 0xc8, 0xf4, 0xd6,
    0x72, 0x99, 0xeb, 0xb4, 0x84, 0x75, 0x90, 0x7a,
    0x00, 0x00, 0x00, 0x07, 0x00, 0x00, 0x00, 0x00,
    0xee, 0x5b, 0xe5, 0xc0, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x01, 0xda, 0x2b, 0xee, 0x01,
    0xbe, 0x82, 0xec, 0xc0, 0x0c, 0x34, 0xf3, 0x61,
    0xed, 0xa8, 0xeb, 0x30, 0xfb, 0x5a, 0x71, 0x5c,
    0x00, 0x00, 0x00, 0x01,
    0xdf, 0xaf, 0xbd, 0xf5, 0xc8, 0x1f, 0x63, 0x5c,
    0x92, 0x57, 0x82, 0x4f, 0xf2, 0x1c, 0x8e, 0x3e,
    0x6f, 0x7b, 0x63, 0x2a, 0xc3, 0x06, 0xe1, 0x14,
    0x46, 0xee, 0x54, 0x0d, 0x34, 0x71, 0x1a, 0x15,
    0x00, 0x00, 0x00, 0x01,
    0x68, 0x70, 0xb7, 0xd6, 0x6a, 0xc3, 0x25, 0x40,
    0x31, 0x13, 0x79, 0xe5, 0xb5, 0xdb, 0xad, 0x28,
    0xec, 0x7e, 0xb8, 0xdd, 0xbf, 0xc8, 0xf4, 0xd6,
    0x72, 0x99, 0xeb, 0xb4, 0x84, 0x75, 0x90, 0x7a,
    0x00, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x00,
    0xee, 0x6b, 0x28, 0x00, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00,
    // Node ID
    0xe9, 0x09, 0x4f, 0x73, 0x69, 0x80, 0x02, 0xfd,
    0x52, 0xc9, 0x08, 0x19, 0xb4, 0x57, 0xb9, 0xfb,
    0xc8, 0x66, 0xab, 0x80,
    // StartTime
    0x00, 0x00, 0x00, 0x00, 0x5f, 0x21, 0xf3, 0x1d,
    // EndTime
    0x00, 0x00, 0x00, 0x00, 0x5f, 0x49, 0x7d, 0xc6,
    // Weight
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xd4, 0x31,
    // Stake
    0x00, 0x00, 0x00, 0x01, 0x39, 0xc3, 0x3a, 0x49,
    0x9c, 0xe4, 0xc3, 0x3a, 0x3b, 0x09, 0xcd, 0xd2,
    0xcf, 0xa0, 0x1a, 0xe7, 0x0d, 0xbf, 0x2d, 0x18,
    0xb2, 0xd7, 0xd1, 0x68, 0x52, 0x44, 0x40, 0xe5,
    0x5d, 0x55, 0x00, 0x88, 0x00, 0x00, 0x00, 0x07,
    0x00, 0x00, 0x01, 0xd1, 0xa9, 0x4a, 0x20, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
    0x3c, 0xb7, 0xd3, 0x84, 0x2e, 0x8c, 0xee, 0x6a,
    0x0e, 0xbd, 0x09, 0xf1, 0xfe, 0x88, 0x4f, 0x68,
    0x61, 0xe1, 0xb2, 0x9c,
    // RewardsOwner
    0x00, 0x00, 0x00, 0x0b, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x01, 0xda, 0x2b, 0xee, 0x01,
    0xbe, 0x82, 0xec, 0xc0, 0x0c, 0x34, 0xf3, 0x61,
    0xed, 0xa8, 0xeb, 0x30, 0xfb, 0x5a, 0x71, 0x5c,
    // Shares
    0x00, 0x00, 0x00, 0x64,
]
```

## İmzalanmamış Subnet Doğrulayıcısı Ekleme İşlemi

### **İmzalanmamış Subnet Doğrulayıcısı Ekleme İşlemi Neleri İçerir**

Bir imzalanmamış subnet doğrulayıcısı ekleme işlemi bir `BaseTx`, `Validator`, `SubnetID` ve `SubnetAuth` içerir. Bu tipin `TypeID`'si `0x0000000d`'dir.

* **`BaseTx`**
* **`Validator`** Doğrulayıcı bir `NodeID`, `StartTime`, `EndTime` ve `Weight`'ya sahiptir
   * **`NodeID`**, doğrulayıcının düğüm kimliği olan 20 bayttır.
   * **`StartTime`**, doğrulayıcının doğrulamaya başladığı andaki Unix zamanı olan bir long'tur.
   * **`EndTime`**, doğrulayıcının doğrulamayı durdurduğu Unix zamanı olan bir long'tur.
   * **`Weight`**, doğrulayıcının stake ettiği tutar olan bir long'tur
* **`SubnetID`**, 32 baytlık bir subnet kimliğidir
* **`SubnetAuth`**, `SigIndices` içerir ve `0x0000000a` tip kimliğine sahiptir. `SigIndices`, bir subnet'e bir doğrulayıcı eklemek için kontrol imzasını imzalayan adresleri belirleyen benzersiz bir tamsayılar listesidir. Dizilim küçükten büyüğe doğru sıralanmalıdır.

### **Gantt İmzalanmamış Subnet Doğrulayıcısı Ekleme İşlemi Spesifikasyonu**

```text
+---------------+----------------------+-----------------------------------------+
| base_tx       : BaseTx               |                     size(base_tx) bytes |
+---------------+----------------------+-----------------------------------------+
| validator     : Validator            |                                44 bytes |
+---------------+----------------------+-----------------------------------------+
| subnet_id     : [32]byte             |                                32 bytes |
+---------------+----------------------+-----------------------------------------+
| subnet_auth   : SubnetAuth           |        4 bytes + len(sig_indices) bytes |
+---------------+----------------------+-----------------------------------------+
                                   | 80 + len(sig_indices) + size(base_tx) bytes |
                                   +---------------------------------------------+
```

### **Proto İmzalanmamış Subnet Doğrulayıcısı Ekleme İşlemi Spesifikasyonu**

```text
message AddSubnetValidatorTx {
    BaseTx base_tx = 1;         // size(base_tx)
    Validator validator = 2;    // size(validator)
    SubnetID subnet_id = 3;     // 32 bytes
    SubnetAuth subnet_auth = 4; // 04 bytes + len(sig_indices)
}
```

### **İmzalanmamış Subnet Doğrulayıcısı Ekleme İşlemi Örneği**

Şimdi önceki örneklerden girdiler ve çıktılar kullanan bir imzalanmamış subnet doğrulayıcısı ekleme işlemi oluşturalım:

* **`BaseTx`**: `"Example BaseTx as defined above with ID set to 0d"`
* **`NodeID`**: `0xe9094f73698002fd52c90819b457b9fbc866ab80`
* **`StarTime`**: `0x000000005f21f31d`
* **`EndTime`**: `0x000000005f497dc6`
* **`Weight`**: `0x000000000000d431`
* **`SubnetID`**: `0x58b1092871db85bc752742054e2e8be0adf8166ec1f0f0769f4779f14c71d7eb`
* **`SubnetAuth`**:
   * **`TypeID`**: `0x0000000a`
   * **`SigIndices`**: `0x00000000`

```text
[
    BaseTx       <- 0x0000000d000030390000000000000000000000000000000000000000000000000000000000000006870b7d66ac32540311379e5b5dbad28ec7eb8ddbfc8f4d67299ebb48475907a0000000700000000ee5be5c000000000000000000000000100000001da2bee01be82ecc00c34f361eda8eb30fb5a715cdfafbdf5c81f635c9257824ff21c8e3e6f7b632ac306e11446ee540d34711a15000000016870b7d66ac32540311379e5b5dbad28ec7eb8ddbfc8f4d67299ebb48475907a0000000500000000ee6b28000000000100000000
    NodeID       <- 0xe9094f73698002fd52c90819b457b9fbc866ab80
    StarTime     <- 0x000000005f21f31d
    EndTime      <- 0x000000005f497dc6
    Weight       <- 0x000000000000d431
    SubnetID     <- 0x58b1092871db85bc752742054e2e8be0adf8166ec1f0f0769f4779f14c71d7eb
    SubnetAuth TypeID   <- 0x0000000a
    SubnetAuth   <- 0x00000000
]
=
[
    // base tx:
    0x00, 0x00, 0x00, 0x0d,
    0x00, 0x00, 0x30, 0x39,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x01,
    0x68, 0x70, 0xb7, 0xd6, 0x6a, 0xc3, 0x25, 0x40,
    0x31, 0x13, 0x79, 0xe5, 0xb5, 0xdb, 0xad, 0x28,
    0xec, 0x7e, 0xb8, 0xdd, 0xbf, 0xc8, 0xf4, 0xd6,
    0x72, 0x99, 0xeb, 0xb4, 0x84, 0x75, 0x90, 0x7a,
    0x00, 0x00, 0x00, 0x07, 0x00, 0x00, 0x00, 0x00,
    0xee, 0x5b, 0xe5, 0xc0, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x01, 0xda, 0x2b, 0xee, 0x01,
    0xbe, 0x82, 0xec, 0xc0, 0x0c, 0x34, 0xf3, 0x61,
    0xed, 0xa8, 0xeb, 0x30, 0xfb, 0x5a, 0x71, 0x5c,
    0x00, 0x00, 0x00, 0x01,
    0xdf, 0xaf, 0xbd, 0xf5, 0xc8, 0x1f, 0x63, 0x5c,
    0x92, 0x57, 0x82, 0x4f, 0xf2, 0x1c, 0x8e, 0x3e,
    0x6f, 0x7b, 0x63, 0x2a, 0xc3, 0x06, 0xe1, 0x14,
    0x46, 0xee, 0x54, 0x0d, 0x34, 0x71, 0x1a, 0x15,
    0x00, 0x00, 0x00, 0x01,
    0x68, 0x70, 0xb7, 0xd6, 0x6a, 0xc3, 0x25, 0x40,
    0x31, 0x13, 0x79, 0xe5, 0xb5, 0xdb, 0xad, 0x28,
    0xec, 0x7e, 0xb8, 0xdd, 0xbf, 0xc8, 0xf4, 0xd6,
    0x72, 0x99, 0xeb, 0xb4, 0x84, 0x75, 0x90, 0x7a,
    0x00, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x00,
    0xee, 0x6b, 0x28, 0x00, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00,
    // Node ID
    0xe9, 0x09, 0x4f, 0x73, 0x69, 0x80, 0x02, 0xfd,
    0x52, 0xc9, 0x08, 0x19, 0xb4, 0x57, 0xb9, 0xfb,
    0xc8, 0x66, 0xab, 0x80,
    // StartTime
    0x00, 0x00, 0x00, 0x00, 0x5f, 0x21, 0xf3, 0x1d,
    // EndTime
    0x00, 0x00, 0x00, 0x00, 0x5f, 0x49, 0x7d, 0xc6,
    // Weight
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xd4, 0x31,
    // SubnetID
    0x58, 0xb1, 0x09, 0x28, 0x71, 0xdb, 0x85, 0xbc,
    0x75, 0x27, 0x42, 0x05, 0x4e, 0x2e, 0x8b, 0xe0,
    0xad, 0xf8, 0x16, 0x6e, 0xc1, 0xf0, 0xf0, 0x76,
    0x9f, 0x47, 0x79, 0xf1, 0x4c, 0x71, 0xd7, 0xeb,
    // SubnetAuth
    // SubnetAuth TypeID
    0x00, 0x00, 0x00, 0x0a,
    // SigIndices length
    0x00, 0x00, 0x00, 0x01,
    // SigIndices
    0x00, 0x00, 0x00, 0x00,
]
```

## İmzalanmamış Yetkilendirici Ekleme İşlemi

### **İmzalanmamış Yetkilendirici Ekleme İşlemi Neleri İçerir**

Bir imzalanmamış yetkilendirici ekleme işlemi bir `BaseTx`, `Validator`, `Stake` ve `RewardsOwner` içerir. Bu tipin `TypeID`'si `0x0000000e`'dir.

* **`BaseTx`**
* **`Validator`** Doğrulayıcı bir `NodeID`, `StartTime`, `EndTime` ve `Weight`'ya sahiptir
   * **`NodeID`**, yetkilendirilenin \(delegatee\) düğüm kimliği olan 20 bayttır.
   * **`StartTime`**, yetkilendirenin \(delegator\) yetkilendirmeye başladığı andaki Unix zamanı olan bir long'tur.
   * **`EndTime`**, yetkilendirenin yetkilendirmeyi durdurduğu \(ve stake edilen AVAX'ın iade edildiği\) andaki Unix zamanı olan bir long'tur.
   * **`Weight`**, yetkilendirenin stake ettiği miktar olan bir long'tur
* **`Stake`** Stake `LockedOuts`'a sahiptir
   * **`LockedOuts`** Staking dönemi boyunca kilitlenen Transfer Edilebilir Çıktıların bir dizilimidir. Staking döneminin sonunda bu çıktılar ilgili adreslerine iade edilir.
* **`RewardsOwner`** Bir `SECP256K1OutputOwners`'dir

### **Gantt İmzalanmamış Yetkilendirici Ekleme İşlemi Spesifikasyonu**

```text
+---------------+-----------------------+-----------------------------------------+
| base_tx       : BaseTx                |                     size(base_tx) bytes |
+---------------+-----------------------+-----------------------------------------+
| validator     : Validator             |                                44 bytes |
+---------------+-----------------------+-----------------------------------------+
| stake         : Stake                 |                  size(LockedOuts) bytes |
+---------------+-----------------------+-----------------------------------------+
| rewards_owner : SECP256K1OutputOwners |               size(rewards_owner) bytes |
+---------------+-----------------------+-----------------------------------------+
                  | 44 + size(stake) + size(rewards_owner) + size(base_tx) bytes |
                  +--------------------------------------------------------------+
```

### **Proto İmzalanmamış Yetkilendirici Ekleme İşlemi Spesifikasyonu**

```text
message AddDelegatorTx {
    BaseTx base_tx = 1;                      // size(base_tx)
    Validator validator = 2;                 // 44 bytes
    Stake stake = 3;                         // size(LockedOuts)
    SECP256K1OutputOwners rewards_owner = 4; // size(rewards_owner)
}
```

### **İmzalanmamış Yetkilendirici Ekleme İşlemi Örneği**

Şimdi önceki örneklerden girdiler ve çıktılar kullanan bir imzalanmamış yetkilendirici ekleme işlemi oluşturalım:

* **`BaseTx`**: `"Example BaseTx as defined above with ID set to 0e"`
* **`NodeID`**: `0xe9094f73698002fd52c90819b457b9fbc866ab80`
* **`StarTime`**: `0x000000005f21f31d`
* **`EndTime`**: `0x000000005f497dc6`
* **`Weight`**: `0x000000000000d431`
* **`Stake`**: `0x0000000139c33a499ce4c33a3b09cdd2cfa01ae70dbf2d18b2d7d168524440e55d55008800000007000001d1a94a2000000000000000000000000001000000013cb7d3842e8cee6a0ebd09f1fe884f6861e1b29c`
* **`RewardsOwner`**: `0x0000000b00000000000000000000000100000001da2bee01be82ecc00c34f361eda8eb30fb5a715c`

```text
[
    BaseTx       <- 0x0000000e000030390000000000000000000000000000000000000000000000000000000000000006870b7d66ac32540311379e5b5dbad28ec7eb8ddbfc8f4d67299ebb48475907a0000000700000000ee5be5c000000000000000000000000100000001da2bee01be82ecc00c34f361eda8eb30fb5a715cdfafbdf5c81f635c9257824ff21c8e3e6f7b632ac306e11446ee540d34711a15000000016870b7d66ac32540311379e5b5dbad28ec7eb8ddbfc8f4d67299ebb48475907a0000000500000000ee6b28000000000100000000
    NodeID       <- 0xe9094f73698002fd52c90819b457b9fbc866ab80
    StarTime     <- 0x000000005f21f31d
    EndTime      <- 0x000000005f497dc6
    Weight       <- 0x000000000000d431
    Stake        <- 0x0000000139c33a499ce4c33a3b09cdd2cfa01ae70dbf2d18b2d7d168524440e55d55008800000007000001d1a94a2000000000000000000000000001000000013cb7d3842e8cee6a0ebd09f1fe884f6861e1b29c
    RewardsOwner <- 0x0000000b00000000000000000000000100000001da2bee01be82ecc00c34f361eda8eb30fb5a715c
]
=
[
    // base tx:
    0x00, 0x00, 0x00, 0x0e, 0x00, 0x00, 0x30, 0x39,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x01,
    0x68, 0x70, 0xb7, 0xd6, 0x6a, 0xc3, 0x25, 0x40,
    0x31, 0x13, 0x79, 0xe5, 0xb5, 0xdb, 0xad, 0x28,
    0xec, 0x7e, 0xb8, 0xdd, 0xbf, 0xc8, 0xf4, 0xd6,
    0x72, 0x99, 0xeb, 0xb4, 0x84, 0x75, 0x90, 0x7a,
    0x00, 0x00, 0x00, 0x07, 0x00, 0x00, 0x00, 0x00,
    0xee, 0x5b, 0xe5, 0xc0, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x01, 0xda, 0x2b, 0xee, 0x01,
    0xbe, 0x82, 0xec, 0xc0, 0x0c, 0x34, 0xf3, 0x61,
    0xed, 0xa8, 0xeb, 0x30, 0xfb, 0x5a, 0x71, 0x5c,
    0x00, 0x00, 0x00, 0x01,
    0xdf, 0xaf, 0xbd, 0xf5, 0xc8, 0x1f, 0x63, 0x5c,
    0x92, 0x57, 0x82, 0x4f, 0xf2, 0x1c, 0x8e, 0x3e,
    0x6f, 0x7b, 0x63, 0x2a, 0xc3, 0x06, 0xe1, 0x14,
    0x46, 0xee, 0x54, 0x0d, 0x34, 0x71, 0x1a, 0x15,
    0x00, 0x00, 0x00, 0x01,
    0x68, 0x70, 0xb7, 0xd6, 0x6a, 0xc3, 0x25, 0x40,
    0x31, 0x13, 0x79, 0xe5, 0xb5, 0xdb, 0xad, 0x28,
    0xec, 0x7e, 0xb8, 0xdd, 0xbf, 0xc8, 0xf4, 0xd6,
    0x72, 0x99, 0xeb, 0xb4, 0x84, 0x75, 0x90, 0x7a,
    0x00, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x00,
    0xee, 0x6b, 0x28, 0x00, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00,
    // Node ID
    0xe9, 0x09, 0x4f, 0x73, 0x69, 0x80, 0x02, 0xfd,
    0x52, 0xc9, 0x08, 0x19, 0xb4, 0x57, 0xb9, 0xfb,
    0xc8, 0x66, 0xab, 0x80,
    // StartTime
    0x00, 0x00, 0x00, 0x00, 0x5f, 0x21, 0xf3, 0x1d,
    // EndTime
    0x00, 0x00, 0x00, 0x00, 0x5f, 0x49, 0x7d, 0xc6,
    // Weight
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xd4, 0x31,
    // Stake
    0x00, 0x00, 0x00, 0x01, 0x39, 0xc3, 0x3a, 0x49,
    0x9c, 0xe4, 0xc3, 0x3a, 0x3b, 0x09, 0xcd, 0xd2,
    0xcf, 0xa0, 0x1a, 0xe7, 0x0d, 0xbf, 0x2d, 0x18,
    0xb2, 0xd7, 0xd1, 0x68, 0x52, 0x44, 0x40, 0xe5,
    0x5d, 0x55, 0x00, 0x88, 0x00, 0x00, 0x00, 0x07,
    0x00, 0x00, 0x01, 0xd1, 0xa9, 0x4a, 0x20, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
    0x3c, 0xb7, 0xd3, 0x84, 0x2e, 0x8c, 0xee, 0x6a,
    0x0e, 0xbd, 0x09, 0xf1, 0xfe, 0x88, 0x4f, 0x68,
    0x61, 0xe1, 0xb2, 0x9c,
    // RewardsOwner
    0x00, 0x00, 0x00, 0x0b, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x01, 0xda, 0x2b, 0xee, 0x01,
    0xbe, 0x82, 0xec, 0xc0, 0x0c, 0x34, 0xf3, 0x61,
    0xed, 0xa8, 0xeb, 0x30, 0xfb, 0x5a, 0x71, 0x5c,
]
```

## İmzalanmamış Subnet Yaratma İşlemi

### **İmzalanmamış Subnet Yaratma İşlemi Neleri İçerir**

Bir imzalanmamış subnet yaratma işlemi bir `BaseTx` ve `RewardsOwner` içerir. Bu tipin `TypeID`'si `0x00000010`'dir.

* **`BaseTx`**
* **`RewardsOwner`** Bir `SECP256K1OutputOwners`'dir

### **Gantt İmzalanmamış Subnet Yaratma İşlemi Spesifikasyonu**

```text
+-----------------+-----------------------|---------------------------------+
| base_tx         : BaseTx                |             size(base_tx) bytes |
+-----------------+-----------------------+--------------------------------+
| rewards_owner   : SECP256K1OutputOwners |       size(rewards_owner) bytes |
+-----------------+-----------------------+---------------------------------+
                                | size(rewards_owner) + size(base_tx) bytes |
                                +-------------------------------------------+
```

### **Proto İmzalanmamış Subnet Yaratma İşlemi Spesifikasyonu**

```text
message CreateSubnetTx {
    BaseTx base_tx = 1;                      // size(base_tx)
    SECP256K1OutputOwners rewards_owner = 2; // size(rewards_owner)
}
```

### **İmzalanmamış Subnet Yaratma İşlemi Örneği**

Şimdi önceki örneklerden girdiler kullanan bir imzalanmamış subnet yaratma işlemi oluşturalım:

* **`BaseTx`**: "Yukarıda tanımlandığı gibi ama Tip Kimliği 16 olarak ayarlanan Örnek BaseTx"
* **`RewardsOwner`**:
   * **`TypeId`**: 11
   * **`Locktime`**: 0
   * **`Threshold`**: 1
   * **`Addresses`**: [ 0xda2bee01be82ecc00c34f361eda8eb30fb5a715c ]

```text
[
    BaseTx        <- 0x00000010000030390000000000000000000000000000000000000000000000000000000000000006870b7d66ac32540311379e5b5dbad28ec7eb8ddbfc8f4d67299ebb48475907a0000000700000000ee5be5c000000000000000000000000100000001da2bee01be82ecc00c34f361eda8eb30fb5a715cdfafbdf5c81f635c9257824ff21c8e3e6f7b632ac306e11446ee540d34711a15000000016870b7d66ac32540311379e5b5dbad28ec7eb8ddbfc8f4d67299ebb48475907a0000000500000000ee6b28000000000100000000
    RewardsOwner <-
        TypeID    <- 0x0000000b
        Locktime  <- 0x0000000000000000
        Threshold <- 0x00000001
        Addresses <- [
            0xda2bee01be82ecc00c34f361eda8eb30fb5a715c,
        ]
]
=
[
    // base tx:
    0x00, 0x00, 0x00, 0x10,
    0x00, 0x00, 0x30, 0x39, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01,
    0x39, 0xc3, 0x3a, 0x49, 0x9c, 0xe4, 0xc3, 0x3a,
    0x3b, 0x09, 0xcd, 0xd2, 0xcf, 0xa0, 0x1a, 0xe7,
    0x0d, 0xbf, 0x2d, 0x18, 0xb2, 0xd7, 0xd1, 0x68,
    0x52, 0x44, 0x40, 0xe5, 0x5d, 0x55, 0x00, 0x88,
    0x00, 0x00, 0x00, 0x07, 0x00, 0x00, 0x12, 0x30,
    0x9c, 0xd5, 0xfd, 0xc0, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x01, 0x3c, 0xb7, 0xd3, 0x84,
    0x2e, 0x8c, 0xee, 0x6a, 0x0e, 0xbd, 0x09, 0xf1,
    0xfe, 0x88, 0x4f, 0x68, 0x61, 0xe1, 0xb2, 0x9c,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    // RewardsOwner type id
    0x00, 0x00, 0x00, 0x0b,
    // locktime:
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    // threshold:
    0x00, 0x00, 0x00, 0x01,
    // number of addresses:
    0x00, 0x00, 0x00, 0x01,
    // addrs[0]:
    0xda, 0x2b, 0xee, 0x01,
    0xbe, 0x82, 0xec, 0xc0, 0x0c, 0x34, 0xf3, 0x61,
    0xed, 0xa8, 0xeb, 0x30, 0xfb, 0x5a, 0x71, 0x5c
]
```

## İmzalanmamış İçe Aktarma İşlemi

### **İmzalanmamış İçe Aktarma İşlemi Neleri İçerir**

Bir imzalanmamış içe aktarma işlemi bir `BaseTx`, `SourceChain` ve `Ins` içerir. Bu tipin `TypeID`'si `0x00000011`'dir.

* **`BaseTx`**
* **`SourceChain`**, bir 32 baytlık kaynak blok zincir kimliğidir.
* **`Ins`**, Transfer Edilebilir Girdiler'in değişken uzunluktaki bir dizilimidir.

### **Gantt İmzalanmamış İçe Aktarma İşlemi Spesifikasyonu**

```text
+-----------------+--------------|---------------------------------+
| base_tx         : BaseTx       |             size(base_tx) bytes |
+-----------------+--------------+---------------------------------+
| source_chain    : [32]byte     |                        32 bytes |
+-----------------+--------------+---------------------------------+
| ins             : []TransferIn |             4 + size(ins) bytes |
+-----------------+--------------+---------------------------------+
                            | 36 + size(ins) + size(base_tx) bytes |
                            +--------------------------------------+
```

### **Proto İmzalanmamış İçe Aktarma İşlemi Spesifikasyonu**

```text
message ImportTx {
    BaseTx base_tx = 1;          // size(base_tx)
    bytes source_chain = 2;      // 32 bytes
    repeated TransferIn ins = 3; // 4 bytes + size(ins)
}
```

### **İmzalanmamış İçe Aktarma İşlemi Örneği**

Şimdi önceki örneklerden girdiler kullanan bir imzalanmamış içe aktarma işlemi oluşturalım:

* **`BaseTx`**: "Yukarıda tanımlandığı gibi, Tip Kimliği 17 olarak ayarlanan Örnek BaseTx"
* **`SourceChain`**:
* **`Ins`**: "Yukarıda tanımlandığı gibi Örnek SECP256K1 Transfer Girdisi"

```text
[
    BaseTx        <- 0x00000011000030390000000000000000000000000000000000000000000000000000000000000006870b7d66ac32540311379e5b5dbad28ec7eb8ddbfc8f4d67299ebb48475907a0000000700000000ee5be5c000000000000000000000000100000001da2bee01be82ecc00c34f361eda8eb30fb5a715cdfafbdf5c81f635c9257824ff21c8e3e6f7b632ac306e11446ee540d34711a15000000016870b7d66ac32540311379e5b5dbad28ec7eb8ddbfc8f4d67299ebb48475907a0000000500000000ee6b28000000000100000000
    SourceChain   <- 0x787cd3243c002e9bf5bbbaea8a42a16c1a19cc105047c66996807cbf16acee10
    Ins <- [
            // input:
    ]
]
=
[
    // base tx:
    0x00, 0x00, 0x00, 0x11,
    0x00, 0x00, 0x30, 0x39, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01,
    0x39, 0xc3, 0x3a, 0x49, 0x9c, 0xe4, 0xc3, 0x3a,
    0x3b, 0x09, 0xcd, 0xd2, 0xcf, 0xa0, 0x1a, 0xe7,
    0x0d, 0xbf, 0x2d, 0x18, 0xb2, 0xd7, 0xd1, 0x68,
    0x52, 0x44, 0x40, 0xe5, 0x5d, 0x55, 0x00, 0x88,
    0x00, 0x00, 0x00, 0x07, 0x00, 0x00, 0x12, 0x30,
    0x9c, 0xd5, 0xfd, 0xc0, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x01, 0x3c, 0xb7, 0xd3, 0x84,
    0x2e, 0x8c, 0xee, 0x6a, 0x0e, 0xbd, 0x09, 0xf1,
    0xfe, 0x88, 0x4f, 0x68, 0x61, 0xe1, 0xb2, 0x9c,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    // sourceChain
    0x78, 0x7c, 0xd3, 0x24, 0x3c, 0x00, 0x2e, 0x9b,
    0xf5, 0xbb, 0xba, 0xea, 0x8a, 0x42, 0xa1, 0x6c,
    0x1a, 0x19, 0xcc, 0x10, 0x50, 0x47, 0xc6, 0x69,
    0x96, 0x80, 0x7c, 0xbf, 0x16, 0xac, 0xee, 0x10,
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
    0xee, 0x6b, 0x28, 0x00, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x00,
]
```

## İmzalanmamış Dışa Aktarma İşlemi

### **İmzalanmamış Dışa Aktarma İşlemi Neleri İçerir**

Bir imzalanmamış dışa aktarma tx'i bir `BaseTx`, `DestinationChain` ve `Outs` içerir. Bu tipin `TypeID`'si `0x00000012`'dir.

* **`DestinationChain`**, fonlar hangi zincire aktarılıyorsa, o zincirin 32 baytlık kimliğidir.
* **`Outs`**, Transfer Edilebilir Çıktılar'ın değişken uzunluktaki bir dizilimidir.

### **Gantt İmzalanmamış Dışa Aktarma İşlemi Spesifikasyonu**

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

### **Proto İmzalanmamış Dışa Aktarma İşlemi Spesifikasyonu**

```text
message ExportTx {
    BaseTx base_tx = 1;            // size(base_tx)
    bytes destination_chain = 2;   // 32 bytes
    repeated TransferOut outs = 3; // 4 bytes + size(outs)
}
```

### **İmzalanmamış Dışa Aktarma İşlemi Örneği**

Şimdi önceki örneklerden çıktılar kullanan bir imzalanmamış dışa aktarma işlemi oluşturalım:

* `BaseTx`: "Yukarıda tanımlandığı gibi Örnek BaseTx" `TypeID` 18'e ayarlanmış
* `DestinationChain`: `0x0000000000000000000000000000000000000000000000000000000000000000`
* `Outs`: "Yukarıda tanımlandığı gibi Örnek SECP256K1 Transfer Çıktısı"

```text
[
    BaseTx           <- 0x00000012000030390000000000000000000000000000000000000000000000000000000000000006870b7d66ac32540311379e5b5dbad28ec7eb8ddbfc8f4d67299ebb48475907a0000000700000000ee5be5c000000000000000000000000100000001da2bee01be82ecc00c34f361eda8eb30fb5a715cdfafbdf5c81f635c9257824ff21c8e3e6f7b632ac306e11446ee540d34711a15000000016870b7d66ac32540311379e5b5dbad28ec7eb8ddbfc8f4d67299ebb48475907a0000000500000000ee6b28000000000100000000
    DestinationChain <- 0x0000000000000000000000000000000000000000000000000000000000000000
    Outs <- [
        000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f000000070000000000003039000000000000d431000000010000000251025c61fbcfc078f69334f834be6dd26d55a955c3344128e060128ede3523a24a461c8943ab0859,
    ]
]
=
[
    // base tx:
    0x00, 0x00, 0x00, 0x12
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

## Kimlik Bilgileri \(Credentials\)

Kimlik bilgilerinin bir olası tipi vardır: `SECP256K1Credential`. Her bir kimlik bilgisi bir Girdi veya Operasyon ile eşleşir. Kimlik bilgilerinin sırası, girdilerin veya operasyonların sırasıyla uyumludur.

## SECP256K1 Kimlik Bilgisi

[Secp256k1](cryptographic-primitives.md#secp-256-k1-addresses) kimlik bilgisi 65 baytlık kurtarılabilir imzaların bir listesini içerir.

### **SECP256K1 Kimlik Bilgisi Neleri İçerir**

* **`TypeID`**, bu tipin kimliğidir.  `0x00000009`değerindedir.
* **`Signatures`**, 65 baytlık bir geri getirilebilir imzalar dizilimidir. İmzaların sırası, girdinin imza indeksleri ile eşleşmelidir.

### **Gantt SECP256K1 Kimlik Bilgisi Spesifikasyonu**

```text
+------------------------------+---------------------------------+
| type_id         : int        |                         4 bytes |
+-----------------+------------+---------------------------------+
| signatures      : [][65]byte |  4 + 65 * len(signatures) bytes |
+-----------------+------------+---------------------------------+
                               |  8 + 65 * len(signatures) bytes |
                               +---------------------------------+
```

### **Proto SECP256K1 Kimlik Bilgisi Spesifikasyonu**

```text
message SECP256K1Credential {
    uint32 TypeID = 1;             // 4 bytes
    repeated bytes signatures = 2; // 4 bytes + 65 bytes * len(signatures)
}
```

### **SECP256K1 Kimlik Bilgisi Örneği**

Şimdi şunu kullanarak bir ödeme girdisi oluşturalım:

* **`signatures`**:
* `0x000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1e1d1f202122232425262728292a2b2c2e2d2f303132333435363738393a3b3c3d3e3f00`
* `0x404142434445464748494a4b4c4d4e4f505152535455565758595a5b5c5e5d5f606162636465666768696a6b6c6e6d6f707172737475767778797a7b7c7d7e7f00`

```text
[
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

## İmzalanmış İşlem

Bir imzalanmış işlem, bir kimlik bilgileri dizilimi eklenen bir imzalanmamış işlemdir.

### İmzalanmış İşlem Neleri İçerir

Bir İmzalanmış işlem bir `CodecID`, `UnsignedTx`ve `Credentials` içerir.

* **`CodecID`** Tek güncel geçerli codec kimliği `00 00`'dır.
* **`UnsignedTx`**, yukarıda tanımlanan bir imzalanmamış işlemdir.
* **`Credentials`**, bir kimlik bilgileri dizilimidir. Her kimlik bilgisi, bu kimlik bilgisinde yer alan aynı indeksteki girdiyle eşleşecektir.

### Gantt İmzalanmış İşlem Spesifikasyonu

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

### Proto İmzalanmış İşlem Özellikleri

```text
message Tx {
    uint32 codec_id = 1;                 // 2 bytes
    UnsignedTx unsigned_tx = 2;          // size(unsigned_tx)
    repeated Credential credentials = 3; // 4 bytes + size(credentials)
}
```

### İmzalanmış İşlem Örneği

Şimdi önceki örneklerden imzalanmamış işlem ve kimlik bilgisi kullanan imzalanmış bir işlem oluşturalım.

* **`CodecID`**: `0`
* **`UnsignedTx`**: `0x0000000100000003ffffffffeeeeeeeeddddddddccccccccbbbbbbbbaaaaaaaa999999998888888800000001000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f000000070000000000003039000000000000d431000000010000000251025c61fbcfc078f69334f834be6dd26d55a955c3344128e060128ede3523a24a461c8943ab085900000001f1e1d1c1b1a191817161514131211101f0e0d0c0b0a09080706050403020100000000005000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f0000000500000000075bcd150000000200000003000000070000000400010203`
* **`Credentials`** `0x0000000900000002000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1e1d1f202122232425262728292a2b2c2e2d2f303132333435363738393a3b3c3d3e3f00404142434445464748494a4b4c4d4e4f505152535455565758595a5b5c5e5d5f606162636465666768696a6b6c6e6d6f707172737475767778797a7b7c7d7e7f00`

```text
[
    CodecID     <- 0x0000
    UnsignedTx  <- 0x0000000100000003ffffffffeeeeeeeeddddddddccccccccbbbbbbbbaaaaaaaa999999998888888800000001000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f000000070000000000003039000000000000d431000000010000000251025c61fbcfc078f69334f834be6dd26d55a955c3344128e060128ede3523a24a461c8943ab085900000001f1e1d1c1b1a191817161514131211101f0e0d0c0b0a09080706050403020100000000005000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f0000000500000000075bcd150000000200000003000000070000000400010203
    Credentials <- [
        0x0000000900000002000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1e1d1f202122232425262728292a2b2c2e2d2f303132333435363738393a3b3c3d3e3f00404142434445464748494a4b4c4d4e4f505152535455565758595a5b5c5e5d5f606162636465666768696a6b6c6e6d6f707172737475767778797a7b7c7d7e7f00,
    ]
]
=
[
    // Codec ID
    0x00, 0x00,
    // unsigned transaction:
    0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x03,
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
    0x00, 0x00, 0x00, 0x03, 0x00, 0x00, 0x00, 0x07,
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

UTXO, bir işlem çıktısının bağımsız bir temsilidir.

### UTXO Neleri İçerir

Bir UTXO bir `CodecID`, `TxID`, `UTXOIndex` ve `Output` içerir.

* **`CodecID`** Tek güncel geçerli codec kimliği `00 00`'dır.
* **`TxID`**, 32 baytlık bir işlem kimliğidir. İşlem ID'leri imzalı işlemin sha256 kadar baytını alarak hesaplanır.
* **`UTXOIndex`**, , bu utxo'nun yaratıldığı **`TxID`** vasıtasıyla belirlenen işlem çıktısını belirten bir tamsayıdır.
* **`AssetID`** bu utxo'nun hangi varlığa referans yaptığını belirten 32 baytlık bir dizilimdir.
* **`Output`**, bu utxo'yu yaratan çıktı nesnesidir. Çıktıların serileştirilmesi yukarıda tanımlanmıştı.

#### Gantt UTXO Spesifikasyonu {#gantt-utxo-specification}

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

### Proto UTXO Spesifikasyonu

```text
message Utxo {
    uint32 codec_id = 1;     // 02 bytes
    bytes tx_id = 2;         // 32 bytes
    uint32 output_index = 3; // 04 bytes
    bytes asset_id = 4;      // 32 bytes
    Output output = 5;       // size(output)
}
```

### UTXO Örneği

Şimdi yukarıda yaratılan imzalı işlemden bir UTXO oluşturalım:

* **`CodecID`**: `0`
* **`TxID`**: `0xf966750f438867c3c9828ddcdbe660e21ccdbb36a9276958f011ba472f75d4e7`
* **`UTXOIndex`**: 0x00000000
* **`AssetID`**: `0x000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f`
* **`Output`**: `"Example SECP256K1 Transferable Output as defined above"`

```text
[
    CodecID   <- 0x0000
    TxID      <- 0xf966750f438867c3c9828ddcdbe660e21ccdbb36a9276958f011ba472f75d4e7
    UTXOIndex <- 0x00000000
    AssetID   <- 0x000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f
    Output    <- 0x000000070000000000003039000000000000d431000000010000000251025c61fbcfc078f69334f834be6dd26d55a955c3344128e060128ede3523a24a461c8943ab0859
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

## StakeableLockIn

Bir StakeableLockIn, stake edilmiş ve kilitlenmiş bir girdidir. StakeableLockIn, yalnızca aynı adresli StakeableLockOut'ları kilit süresi geçene kadar fonlayabilir.

### **StakeableLockIn Neleri İçerir**

Bir StakeableLockIn bir `TypeID`, `Locktime` ve `TransferableIn` içerir.

* **`TypeID`**, bu çıktı tipinin kimliğidir. Bu kimlik `0x00000015`'dir.
* **`Locktime`**, girdinin öncesinde sadece stake etmek için tüketilebileceği unix zaman damgasını içeren bir long'tur. Unix zaman damgası saniye cinsinden ifade edilir.
* **`TransferableIn`**, transfer edilebilir bir girdi nesnesidir.

### **Gantt StakeableLockIn Spesifikasyonu**

```text
+-----------------+-------------------+--------------------------------+
| type_id         : int               |                        4 bytes |
+-----------------+-------------------+--------------------------------+
| locktime        : long              |                        8 bytes |
+-----------------+-------------------+--------------------------------+
| transferable_in : TransferableInput |          size(transferable_in) |
+-----------------+-------------------+--------------------------------+
                                    | 12 + size(transferable_in) bytes |
                                    +----------------------------------+
```

### **Proto StakeableLockIn Spesifikasyonu**

```text
message StakeableLockIn {
    uint32 type_id = 1;                    // 04 bytes
    uint64 locktime = 2;                   // 08 bytes
    TransferableInput transferable_in = 3; // size(transferable_in)
}
```

### **StakeableLockIn Örneği**

Şimdi şunu kullanarak bir StakeableLockIn oluşturalım:

* **`TypeID`**: 21
* **`Locktime`**: 54321
* **`TransferableIn`**: "Yukarıda tanımlandığı gibi Örnek SECP256K1 Transfer Girdisi"

```text
[
    TypeID    <- 0x00000015
    Locktime  <- 0x000000000000d431
    TransferableIn <- [
        f1e1d1c1b1a191817161514131211101f0e0d0c0b0a09080706050403020100000000005000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f0000000500000000075bcd150000000100000000,
    ]
]
=
[
    // type_id:
    0x00, 0x00, 0x00, 0x15,
    // locktime:
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xd4, 0x31,
    // transferable_in
    0xf1, 0xe1, 0xd1, 0xc1, 0xb1, 0xa1, 0x91, 0x81,
    0x71, 0x61, 0x51, 0x41, 0x31, 0x21, 0x11, 0x01,
    0xf0, 0xe0, 0xd0, 0xc0, 0xb0, 0xa0, 0x90, 0x80,
    0x70, 0x60, 0x50, 0x40, 0x30, 0x20, 0x10, 0x00,
    0x00, 0x00, 0x00, 0x05,
    0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
    0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f,
    0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17,
    0x18, 0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f,
    0x00, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x00,
    0x07, 0x5b, 0xcd, 0x15, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x00,
]
```

## StakeableLockOut

Bir StakeableLockOut, kilit zamanına kadar kilitli olan; ancak bu süreye kadar stake edilebilen bir çıktıdır.

### **StakeableLockOut Neleri İçerir**

Bir StakeableLockOut bir `TypeID`, `Locktime` ve `TransferableOut` içerir.

* **`TypeID`**, bu çıktı tipinin kimliğidir. Bu kimlik `0x00000016`'dir.
* **`Locktime`**, çıktıların öncesinde sadece stake etmek için tüketilebileceği unix zaman damgasını içeren bir long'tur. Unix zaman damgası saniye cinsinden ifade edilir.
* **`transferableout`**: "Yukarıda tanımlandığı gibi Örnek SECP256K1 Transfer Çıktısı"

### **Gantt StakeableLockOut Spesifikasyonu**

```text
+------------------+--------------------+--------------------------------+
| type_id          : int                |                        4 bytes |
+------------------+--------------------+--------------------------------+
| locktime         : long               |                        8 bytes |
+------------------+--------------------+--------------------------------+
| transferable_out : TransferableOutput |         size(transferable_out) |
+------------------+--------------------+--------------------------------+
                                     | 12 + size(transferable_out) bytes |
                                     +-----------------------------------+
```

### **Proto StakeableLockOut Spesifikasyonu**

```text
message StakeableLockOut {
    uint32 type_id = 1;                      // 04 bytes
    uint64 locktime = 2;                     // 08 bytes
    TransferableOutput transferable_out = 3; // size(transferable_out)
}
```

### **StakeableLockOut Örneği**

Şimdi şunu kullanarak bir stakeablelockout oluşturalım:

* **`TypeID`**: 22
* **`Locktime`**: 54321
* **`TransferableOutput`**: `"Example SECP256K1 Transfer Output from above"`

```text
[
    TypeID              <- 0x00000016
    Locktime            <- 0x000000000000d431
    TransferableOutput  <- 0x000000070000000000003039000000000000d431000000010000000251025c61fbcfc078f69334f834be6dd26d55a955c3344128e060128ede3523a24a461c8943ab0859,
]
=
[
    // type_id:
    0x00, 0x00, 0x00, 0x16,
    // locktime:
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xd4, 0x31,
    // transferable_out
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

