# Coreth Atomik Aktarım Biçimi

Bu sayfa `in` atomik işlemleri nasıl we tek bir gerçek kaynağı olması gerekiyor. Bu belge, şifreli kullanıcı tanımlaması için paketi paketlemek ve [secp256k1](cryptographic-primitives.md#cryptography-in-the-avalanche-virtual-machine) için [ilkel serileştirme](serialization-primitives.md) biçimini kullanır.

## Codec kimlik

Bazı veriler verilerin nasıl çölleşmesi gerektiğini belirten bir kod kod numarası (16\) ile hazırlanır. Şu anda geçerli kod çözücü tek kimlik 0 \(`0x00 0x00`\).

## Girdiler

Coreth Atomik Transactions girdiler, ya bu zincirden `bir EVMInput` ya da bir başka zincir `SECP256K1TransferInput`\ içeren `TransferableInput` (başka bir zincirden bir SECPP2P256K1TransferInput\) içeren, bir TransferableInput (bu zincirden bir EVMInput içerir. Bu zincir için `harcama` için `EVMInput` in kullanılacak, `Transferable` Girdi ise atomik UTXOs başka bir zincirden aktarmak için kullanılacak.

### EVM Girdi

Bir `ExportTx` parçası olarak fonları düşürmek için bir EVM hesabı belirten girdi tipi.

#### EVM Girdi Içeren

Bir EVM Girdi `adres`, `miktar`, `varlık` ve `none` içerir.

* **`Adres`** Fon aktarmak için EVM adresidir.
* **`Miktar,`** AVAX için nAVAX ve diğer tüm varlıklar için en küçük denomination miktarı olarak aktarılacak varlığın miktarıdır.
* **`Varlığın`** kimliği nakil edilecek kimliktir.
* **`Nonce`** EVM hesabının ihracat fonlarının nonce idi.

#### Gantt EVM Girdi Belirtisi

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

#### Prototip EVM Girdi Belirtisi

```text
message  {
    bytes address = 1; // 20 bytes
    uint64 amount = 2; // 08 bytes
    bytes assetID = 3; // 32 bytes
    uint64 nonce = 4;  // 08 bytes
}
```

#### EVM Girdi Örnekleri

EVM Girdi yapalım:

* `Adresi: 0x8db97cece249c2b98bdc0226cc4c2a57bf52f_BAR_`
* `200.`
* `Erişim tarihi: 11213151718181911b112141618181811214161818113161818191b1d1e1e1)`
* `Nonce: 0`

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

### Transfer Edilebilir Girdi

Transferable Input `SECP256K1Transferinput'u` paketler. Transferable girdiler, belirli bir UTXO aktarımı ile tanımlar.

#### Hangi Aktarılabilir Girdi Içeriyor

Transfer edilebilir bir girdi `TxID`, `UTXOIndex` `Varlık` ve `bir Girdi` içerir.

* **`TxID`** bu girişin bir çıktıyı tüketen işlemleri tanımlayan 32 byte dizidir.
* **`UTXOIndex`** bu girişin belirlenen işlemde hangi utxo consuming tanımlayan bir is
* **`AssetID`** bu giriş referanslarını belirleyen 32 byte dizidir.
* **`Girdi`** aşağıdaki gibi tanımlanan `SECP256K1TransferInput`'dur.

#### Gantt Transferable Input Specification Comment

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

#### Proto Transferable Input Specification

```text
message TransferableInput {
    bytes tx_id = 1;       // 32 bytes
    uint32 utxo_index = 2; // 04 bytes
    bytes asset_id = 3;    // 32 bytes
    Input input = 4;       // size(input)
}
```

#### Transfer Edilebilir Girdi Örnekleri

Transfer edilebilir bir girişim yapalım:

* `TxID: 0x6613a40dcdd8d22ea4a4a9a4c84490517cf550b6685e045e0455e4f258e59954f22e59959`
* `UTXOIndex: 1`
* `AssetID: 0xdbcf890f77f49b968648b72b7f9f82937f28a6804af05da0dc12ba53f2dd.`
* `Giriş: "Örnek SECP256K1 Aktarma Girdi"`

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

### SECP256K1 Transfer Girdi

Bir [secp256k1](https://github.com/ava-labs/avalanche-docs/tree/94d2e4aeddbf91f89b830f9b44b4aa60089ac755/build/cryptographic-primitives/README.md#cryptography-in-the-avalanche-virtual-machine) transfer girdisi harcanmamış bir secp256k1 transfer çıktısını harcamasına izin verir.

#### SECP256K1 Aktarma Girdi Içeriyor

Bir secp256k1 transfer girdisi `bir miktar` ve `Adres` contains içerir.

* **`Bu`** girdi tipinin kimliği. `005`.
* **`Miktar,`** bu girişin from tüketilmesi gereken miktarı belirten uzundur. Olumlu olmalı. in belirtilen miktara eşit olmalı.
* Adres Indices, UTXO. harcamak için kullanılan özel anahtarları tanımlayan eşsiz **`AddressIndices`** listesidir. UTXO her bir adresi UTXO. harcayabilecek bir dizi adres vardır. Her int bu işlem için imza atan adres dizisindeki indeksi temsil eder. Dizinin üst seviyeye kadar sıralanması gerekiyor.

#### Gantt SECP256K1 Transfer Girdi Belirtisi

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

#### Proto SECP256K1 Transfer Girdi Belirtisi

```text
message SECP256K1TransferInput {
    uint32 typeID = 1;                   // 04 bytes
    uint64 amount = 2;                   // 08 bytes
    repeated uint32 address_indices = 3; // 04 bytes + 04 bytes * len(address_indices)
}
```

#### SECP256K1 Transfer Girdi Örnek

Ödeme girdisi yapalım:

* **`TypeId`**: 5
* **`500.`**
* **`Adres Adresi`**:

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

## Çıktı

Coreth Atomik Transactions çıkışları ya bu zincirdeki bir adres dengesine eklenen bir `EVMOutput` ya da bir `TransferableOutput` `(SECP256K1Transferoutput`\ içerir) başka bir zincire taşınmak için bir zincire taşınmak için bir SECPP256K1TransferOutput\ içerir.

EVM Çıktı, `bu` zincire fon eklemek için in kullanılacak, `Transferable` Output ise atomik UTXOs başka bir zincire aktarmak için kullanılacak.

### EVM Çıktı

`Bir IMportTx` parçası olarak bir EVM hesabına uygulanacak bir durum değişikliği belirten çıkış tipi

#### EVM Çıktısının Içerdiği

Bir EVM `Çıktı, bir adres`, `miktar`, ve `varlık` içerir.

* **`Adres`** EVM adresi ve fonları alacak.
* **`Miktar,`** AVAX için nAVAX ve diğer tüm varlıklar için en küçük denomination miktarı olarak aktarılacak varlığın miktarıdır.
* **`Varlığın`** kimliği nakil edilecek kimliktir.

#### Gantt EVM Çıktı Specification

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

#### Prototip EVM Çıktı Specification

```text
message  {
    bytes address = 1; // 20 bytes
    uint64 amount = 2; // 08 bytes
    bytes assetID = 3; // 32 bytes
}
```

#### EVM Çıktı Örnek

EVM Çıktısını yapalım:

* `Adresi: 0x0eb5cc85c2909b60decb35a3b52cd2cd2.`
* `500.`
* `AssetID: 0xdbcf890f77f49b968648b72b7f9f82937f28a6804af05da0dc12ba53f2dd.`

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

### Transfer Edilebilir Çıktı

Transferable çıktılar, bir varlık kimliğiyle `SECP256K1TransferOutput` paketler.

#### Hangi Aktarılabilir Çıktı Içeriyor

Transfer edilebilir çıktı, `SECP256K1TransferOutput`'u olan bir `AssetID` ve bir `Çıktı` içerir.

* **`AssetID`** bu çıkış referanslarını belirleyen 32 byte dizidir.
* **`Çıktı,`** `aşağıdaki` şekilde tanımlanan SECP256K1Transferoutput olarak tanımlanmaktadır.

#### Gantt Transferable Çıktı Specification

```text
+----------+----------+-------------------------+
| asset_id : [32]byte |                32 bytes |
+----------+----------+-------------------------+
| output   : Output   |      size(output) bytes |
+----------+----------+-------------------------+
                      | 32 + size(output) bytes |
                      +-------------------------+
```

#### Proto Transferable Output Specification Specification

```text
message TransferableOutput {
    bytes asset_id = 1; // 32 bytes
    Output output = 2;  // size(output)
}
```

#### Transfer Edilebilir Çıktı Örnek

Transfer edilebilir bir çıkış yapalım:

* `AssetID: 0xdbcf890f77f49b968648b72b7f9f82937f28a6804af05da0dc12ba53f2dd.`
* `Çıktı: "Örnek SECP256K1 Aktarım Çıktısı"`

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

### SECP256K1 Transfer Çıktı

Bir [secp256k1](cryptographic-primitives.md#cryptography-in-the-avalanche-virtual-machine) transfer çıktısı, belirtilen bir unix zaman sonrasında bir adresler koleksiyonuna bir miktar varlık gönderme imkanı sağlar.

#### SECP256K1 Aktarım Çıktısını Içeriyor

Bir secp256k1 transfer çıktısı `TypeID`, `Amount`, `Locktime`, `Threshold` ve `Adresler` içerir.

* Bu çıktıların kimliği, **`TypeID`** tipidir. `007`.
* **`Miktar,`** bu çıkışın sahip olduğu varlığın miktarını belirten uzunluktur. Olumlu olmalı.
* **`Locktime`**, bu çıkışın sonra harcanabileceği unix zaman damgasını içerecek uzunluktadır. İkinciye özgü zaman damgası özeldir.
* **`Threshold`**, çıkışı harcamak için gerekli eşsiz imzaların sayısını belirleyen bir int **`Adreslerin`** uzunluğuna eşit ya da daha az olmalı. **`Adresler`** boşsa, 0 olmalı.
* **`Adresler,`** bu çıkışı harcamak için kullanılabilecek özel anahtarlara karşılık gelen eşsiz adreslerin listesidir. Adresler lexicographically. olarak sıralanmalıdır.

#### Gantt SECP256K1 Transfer Çıktı Specification

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

#### Proto SECP256K1 Transfer Çıktı Specification

```text
message SECP256K1TransferOutput {
    uint32 typeID = 1;            // 04 bytes
    uint64 amount = 2;            // 08 bytes
    uint64 locktime = 3;          // 08 bytes
    uint32 threshold = 4;         // 04 bytes
    repeated bytes addresses = 5; // 04 bytes + 20 bytes * len(addresses)
}
```

#### SECP256K1 Transfer Çıktı Örneği

Bir secp256k1 transfer çıktısı yapalım:

* **`TypeID`**: 7
* **`Amoun`**: 100.
* **`Kilitleme zamanı`**: 0
* **`Eşik`**: 1
* **`Adresler`**:
   * 0x6f90db6137a78f76b3693f7f2bc507956dae563

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

## Atom Aktarımı

Atom Transactions zincirlerin arasında fonları taşımak için kullanılır. İki tip `ImportTx` ve `ExportTx` vardır.

### ExportTx

ExportTx from farklı bir zincire aktarma amaçlı bir işlemdir.

#### Hangi ExportTx Içeriyor

Bir ExportTx bir `typeID`, `ağ` `kimliği, blok zinciri`, `hedef` zinciri, `girdiler` ve `ihracat çıktıları` içerir.

* **`typeID`** bir ExportTx için kullanılan bir int Bir exportTx için typeID 1 dir.
* **`Network,`** Avalanche ağ ağını tanımlayan bir int olarak bu işlem için verilmesi gereken bir iledir. Bu mainnet, fuji, vb. anlamına gelebilir, ve EVM's ağ kimliğinden farklıdır.
* **`blockchainID`** bu işlem için hangi blok zincirini tanımlayan 32 byte dizidir.
* **`Hedef Zincir,`** bu işlem fonu için hangi blok zincirini tanımlayan 32 byte dizidir.
* **`Girdiler,`** of kaynak sağlamak için bir dizi EVM Girdileridir.
* **`İhracat Çıktıları`** `Varış Zincirine` aktarılacak bir dizi Transferable Output dizisidir.

#### Gantt Eklentisi Belirtisi

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

#### ExportTx ExportTx ExportTx

EVM Çıktısını yapalım:

* **`TypeID`**: `1`
* **`Ağ ID`**: `12345`
* **`Blockchain ID`**: `0x91060eabfb5a5a57171710109b5896e5ff00010a1cfe6b103d585e6ebf27b97a1735`
* **`Hedef Zinciri`**: `0xd891ad56056d9c01f18f43f58b5c784ad07a4a49cf3d11623804b5cba2c6b.`
* **`Girdiler`**:
   * `"Örnek EVMInput yukarıda tanımlanır`
* **`Dışarıya aktarılan çıkışlar`**:
   * `"Örnek TransferableOutput yukarıda tanımlanır`

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

ImportTx başka bir zincirden to para aktarmak için bir işlemdir.

#### Hangi İçeriye Aktarma Içeriyor

Bir ImportTx bir `typeID`, `ağ kimliği`, `blok zinciri`, `hedef` zinciri, `importedInputs`, Girdiler, ve `Outs` içerir.

* **`typeID`** bir importTx için kullanılan bir int Bir `ImportTx` için typeID 0.
* **`Network,`** Avalanche ağ ağını tanımlayan bir int olarak bu işlem için verilmesi gereken bir iledir. Bu mainnet, fuji, vb. anlamına gelebilir, ve EVM's ağ kimliğinden farklıdır.
* **`blockchainID`** bu işlem için hangi blok zincirini tanımlayan 32 byte dizidir.
* **`Kaynak Zincir,`** fonları ithal etmek için hangi blok zincirini tanımlayan 32 byte dizidir.
* **`İçeriye aktarılan`** Girdiler, of kaynak sağlamak için bir dizi TransferableInputs dizisidir.
* **`Outs`** bu zincirin içine aktarılacak bir dizi EVM çıktısı dizisidir.

#### Gantt İçeriye Aktarma Belirtisi

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

#### İçeriye Aktarma Örnekleri

Bir ImportTx yapalım:

* **`TypeID`**: `0`
* **`Ağ ID`**: `12345`
* **`Blockchain ID`**: `0x91060eabfb5a5a57171710109b5896e5ff00010a1cfe6b103d585e6ebf27b97a1735`
* **`Kaynak`**: `0xd891ad56056d9c01f18f43f58b784ad07a4a49cf3d11623804cba2c6bb6bb.`
* **`İçeriye Aktarılan Girdiler`**:
   * `"Örnek Transferable Girdi yukarıda tanımlanır`
* **`Dışarı`**:
   * `"Örnek EVMOutput yukarıda tanımlanır`

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

## Kimlikler

`S.P.256K11. ^ "SECP256K1"`. Her bir giriş ile eşleştirilir. Kimlik düzeni girdilerin sırasıyla uyuşuyor.

### SECP256K1 Credential

Bir [secp256k1](https://github.com/ava-labs/avalanche-docs/tree/94d2e4aeddbf91f89b830f9b44b4aa60089ac755/build/cryptographic-primitives/README.md#cryptography-in-the-avalanche-virtual-machine) referansları 65 byte geri alınabilir imzalar listesi içerir.

#### SECP256K1 Credential Içeriyor

* **`Bu`** tip için bir kimlik örneğidir. `009`.
* **`İmzalar`** 65 byte yeniden kurtarılabilir imzalar dizisidir. İmzaların düzeni girişin imza input's uymalıdır.

#### Gantt SECP256K1 Credential Specification Specification

```text
+------------------------------+---------------------------------+
| type_id         : int        |                         4 bytes |
+-----------------+------------+---------------------------------+
| signatures      : [][65]byte |  4 + 65 * len(signatures) bytes |
+-----------------+------------+---------------------------------+
                               |  8 + 65 * len(signatures) bytes |
                               +---------------------------------+
```

#### Proto SECP256K1 Credential Specification

```text
message SECP256K1Credential {
    uint32 typeID = 1;             // 4 bytes
    repeated bytes signatures = 2; // 4 bytes + 65 bytes * len(signatures)
}
```

#### SECP256K1 Credential Örnek

Ödeme girdisi yapalım:

* **`TypeID`**: 9
* **`İmzalar`**:
   * `0x0accccf47a8205442840e2421975138790e41be262f7197f3d93faa26cc874106d743ffaf025782c8c86b862d2d2b9febebe7d352f0b0b01019db49dbbbdbb191919dbb16647373301019191886644`

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

## İmzalamış İşlem

İmzalı bir işlem imzalanmamış bir `AtomicTx` ve kimlik içerir.

### İmzaladığı Işlem Içeriyor

İmzalı bir işlem, `CodecID`, `AtomicTx` ve `Credentials` içerir.

* **`CodecID`** geçerli kod kod çözücü tek kimlik `000`.
* **`AtomicTx`** yukarıda belirtildiği gibi bir atom işlemidir.
* **`Kimlik`** bir dizi kimlik dizisidir. Her bir kimlik the in aynı indekse karşılık gelir.

### Gantt İmzalamış İşlem Belirtisi

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

### Proto İmzalamış İşlem Belirtisi

```text
message Tx {
    uint16 codec_id = 1;                 // 2 bytes
    AtomicTx atomic_tx = 2;              // size(atomic_tx)
    repeated Credential credentials = 3; // 4 bytes + size(credentials)
}
```

### İmzalamış Aktarım Örnekleri

İmzasız işlemleri ve özetlemeyi önceki örneklerden kullanan bir anlaşma yapalım.

* **`Şifreleme `**: `0`
* **`00391010106550010106b10101015d5d8666cc3335d866dd86df18f338556646449449c3383838333833833833844464441138338b1138bb164166ff38bb3004040040464040040404004004040040464640046460040464640464640046464b1164644644464644646464464640046444446446464464644b110446464464644b100446644488648644644880044bff11384488`**``
* **`Kimlikler`**

   `0010acccf47a8205440e242421975138790e41be262f7197f3d93faa26cc8410.866d2b2b9febe7d32f0b45545540b40100`

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

UTXO bir işlem çıkışını temsil eden tek bir uygulamadır.

### UTXO Içeriyor

UTXO bir `CodecID`, `TxID`, `UTXOIndex`, `Varlık` ve `Çıktı` içerir.

* **`CodecID`** tek geçerli `CodecID` `000.`
* **`TxID`** 32 byte işlem kimliği. İşlem kimlikleri imzalanmış işlemlerin bytes Sha256 ile hesaplanır.
* **`UTXOIndex`**, **`TxID`** tarafından belirtilen işlemde bu utxo tarafından yaratılan bir işlemde hangi çıktıyı belirleyen bir is
* **`AssetID`** bu utxo referanslarını tanımlayan 32 byte dizidir.
* **`Çıkış`** bu utxo yaratan çıkış object Çıkışların seri düzleştirilmesi yukarıda tanımlanmıştı.

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
* **`UTXOIndex`**: 0 = 0x00.
* **`Erişim`** `tarihi: 11213151718181911b112141618181811214161818113161818191b1d1e1e1)`
* **`Çıktı`**: `"Örnek EVMOutput yukarıda tanımlanır`

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

