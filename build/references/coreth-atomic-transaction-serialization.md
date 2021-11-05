# Corethのアトミックトランザクションのフォーマット

このページは、`Coreth`のアトミックトランザクションをどのようにシリアライズするかについて、信頼できる唯一の情報源となることを目的としています。本ドキュメントでは、梱包には[プリミティブ・シリアライゼーション](serialization-primitives.md)のフォーマットを、暗号化されたユーザー識別には[secp256k1](cryptographic-primitives.md#cryptography-in-the-avalanche-virtual-machine)を使用しています。

## コーデックID

一部のデータには、そのデータをどのようにデシリアライズするかを示すコーデックID（unt16）が前に付加されています。今のところ、有効なコーデックIDは0`0x00 0x00`のみです。

## 入力

コレスアトミックトランザクションへの入力は、このチェーンの`EVMInput`か、他のチェーンの`TransferableInput`（これには`SECP256K1TransferInput`が含まれる）のいずれかです。`EVMInput`は、このチェーンから資金を消費する際に`ExportTx`使用され、`TransferableInput`は、他のチェーンからアトミックUTXOをインポートする際に使用されます。

### EVMの入力

`ExportTx`の一部として、資金を控除するEVMアカウントを指定する入力タイプです。

#### EVMの入力に含まれるもの

EVMの入力には、`address`、`amount`、`assetID`、`nonce`が含まれます。

* **`Address`**は、送金元のEVMアドレスです。
* **`Amount`**は、転送する資産の量（AVAXの場合はnAVAXで指定し、それ以外の資産の場合は、最小のデノミネーションで指定）です。
* **`AssetID`**は、転送する資産のIDです。
* **`Nonce`**は、資金を伝送するEVMアカウントのワンタイムパスワードです。

#### Gantt EVMの入力仕様

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

#### Proto EVMの入力仕様

```text
message  {
    bytes address = 1; // 20 bytes
    uint64 amount = 2; // 08 bytes
    bytes assetID = 3; // 32 bytes
    uint64 nonce = 4;  // 08 bytes
}
```

#### EVMの入力例

EVMを入力してみましょう。

* `Address: 0x8db97c7cece249c2b98bdc0226cc4c2a57bf52fc`
* `Amount: 2000000`
* `AssetID: 0x000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f`
* `Nonce: 0`

```text
[
    Address   <- 0x8db97c7cece249c2b98bdc0226cc4c2a57bf52fc,
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

### 転送可能な入力

転送可能な入力ラップは`SECP256K1TransferInput`です。転送可能な入力は、特定のUTXOを指定された転送入力で記述します。

#### 転送可能な入力の内容

転送可能な入力には、`TxID``UTXOIndex``AssetID``Input`が含まれています。

* **`TxID`**は、32バイトの配列で、この入力がどのトランザクションからの出力を消費するかを定義します。
* **`UTXOIndex`**は、指定されたトランザクションでこの入力がどのutxoを消費するかを定義する整数です。
* **`AssetID`**は、この入力がどの資産を参照するかを定義する32バイトの配列です。
* **`Input`**は、次に定義される`SECP256K1TransferInput`です。

#### Ganttの転送可能な入力仕様

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

#### Protoの転送入力の仕様

```text
message TransferableInput {
    bytes tx_id = 1;       // 32 bytes
    uint32 utxo_index = 2; // 04 bytes
    bytes asset_id = 3;    // 32 bytes
    Input input = 4;       // size(input)
}
```

#### 転送可能な入力の例

転送可能な入力をしてみましょう。

* `TxID: 0x6613a40dcdd8d22ea4aa99a4c84349056317cf550b6685e045e459954f258e59`
* `UTXOIndex: 1`
* `AssetID: 0xdbcf890f77f49b96857648b72b77f9f82937f28a68704af05da0dc12ba53f2db`
* `Input: "Example SECP256K1 Transfer Input from below"`

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

### SECP256K1の転送入力

[secp256k1](https://github.com/ava-labs/avalanche-docs/tree/94d2e4aeddbf91f89b830f9b44b4aa60089ac755/build/cryptographic-primitives/README.md#cryptography-in-the-avalanche-virtual-machine)の転送入力では、未使用のsecp256k1の転送出力を使うことができます。

#### SECP256K1の転送入力に含まれるもの

secp256k1の転送入力には、`Amount`と`AddressIndices`が含まれています。

* **`TypeID`**は、この入力タイプのIDです。それは`0x00000005`です。
* **`Amount`**は、この入力がUTXOから消費されるべき量を指定するロングです。ポジティブであること。UTXOで指定された量と同じでなければいけません。
* **`AddressIndices`**は、UTXOの使用に使用される秘密鍵を定義する、一意の整数のリストです。各UTXOは、UTXOを消費することができるアドレスの配列を持っています。各intは、このトランザクションに署名するこのアドレス配列のインデックスを表します。配列は低位から高位にソートされている必要があります。

#### Gantt SECP256K1の転送入力の仕様

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

#### Proto SECP256K1の転送入力の仕様

```text
message SECP256K1TransferInput {
    uint32 typeID = 1;                   // 04 bytes
    uint64 amount = 2;                   // 08 bytes
    repeated uint32 address_indices = 3; // 04 bytes + 04 bytes * len(address_indices)
}
```

#### SECP256K1の転送入力の例

決済入力をしてみましょう。

* **`TypeId`**：5
* **`Amount`**：500000000000
* **`AddressIndices`**：[0]

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

## 出力

Corethのアトミックトランザクションへの出力は、このチェーン上のアドレスの残高に追加される`EVMOutput`か、他のチェーンに移動される`TransferableOutput`（これには`SECP256K1TransferOutput`が含まれます）のいずれかです。

EVMの出力は、`ImportTx`ではこのチェーンに資金を追加するために使用され、`TransferableOutput`ではアトミックUTXOを他のチェーンに伝送するために使用されます。

### EVMの出力

`ImportTx`の一環として、EVMのアカウントに適用される状態変化を指定する出力タイプです。

#### EVMの出力に含まれるもの

EVMの出力には、`address`、`amount`、`assetID`があります。

* **`Address`**は、資金を受け取るEVMアドレスです。
* **`Amount`**は、転送する資産の量（AVAXの場合はnAVAXで指定し、それ以外の資産の場合は、最小のデノミネーションで指定）です。
* **`AssetID`**は、転送する資産のIDです。

#### Gantt EVMの出力仕様

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

#### Proto EVMの出力仕様

```text
message  {
    bytes address = 1; // 20 bytes
    uint64 amount = 2; // 08 bytes
    bytes assetID = 3; // 32 bytes
}
```

#### EVMの出力例

EVMを出力してみましょう。

* `Address: 0x0eb5ccb85c29009b6060decb353a38ea3b52cd20`
* `Amount: 500000000000`
* `AssetID: 0xdbcf890f77f49b96857648b72b77f9f82937f28a68704af05da0dc12ba53f2db`

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

### 転送可能な出力

転送可能な出力では、`SECP256K1TransferOutput`を資産IDでラップします。

#### 転送可能な出力の内容

転送可能な出力には、`AssetID`と`Output`が含まれており、これが`SECP256K1TransferOutput`になります。

* **`AssetID`**は、32バイトの配列で、この出力がどの資産を参照するかを定義します。
* **`Output`**は、以下に定義される`SECP256K1TransferOutput`です。

#### Ganttの転送可能な出力仕様

```text
+----------+----------+-------------------------+
| asset_id : [32]byte |                32 bytes |
+----------+----------+-------------------------+
| output   : Output   |      size(output) bytes |
+----------+----------+-------------------------+
                      | 32 + size(output) bytes |
                      +-------------------------+
```

#### Prot転送可能な出力仕様

```text
message TransferableOutput {
    bytes asset_id = 1; // 32 bytes
    Output output = 2;  // size(output)
}
```

#### 転送可能な出力例

転送可能な出力をしてみましょう。

* `AssetID: 0xdbcf890f77f49b96857648b72b77f9f82937f28a68704af05da0dc12ba53f2db`
* `Output: "Example SECP256K1 Transfer Output from below"`

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

### SECP256K1の転送出力

[secp256k1](cryptographic-primitives.md#cryptography-in-the-avalanche-virtual-machine)の転送出力では、指定されたunix時間後に資産の数量を複数のアドレスに送信することができます。

#### SECP256K1の転送出力の内容

secp256k1の転送出力には、`TypeID`、`Amount`、`Locktime`、`Threshold`、`Addresses`が含まれています。

* **`TypeID`**は、このタイプのIDです。それは`0x00000007`です。
* **`Amount`**は、この出力が所有する資産の数量を指定するロングです。ポジティブであること。
* **`Locktime`**は、この出力が使用可能になるunixタイムスタンプを含むロングです。unixのタイムスタンプは秒単位で決まっています。
* **`Threshold`**は、出力を消費するために必要な固有の署名の数を示す整数です。**`Addresses`**の長さ以下である必要があります。**`Addresses`**が空の場合、0でなければなりません。
* **`Addresses`**は、この出力を消費するために使用できる秘密鍵に対応する一意のアドレスのリストです。アドレスは辞書的にソートされている必要があります。

#### Gantt SECP256K1の転送出力の仕様

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

#### Proto SECP256K1の転送出力の仕様

```text
message SECP256K1TransferOutput {
    uint32 typeID = 1;            // 04 bytes
    uint64 amount = 2;            // 08 bytes
    uint64 locktime = 3;          // 08 bytes
    uint32 threshold = 4;         // 04 bytes
    repeated bytes addresses = 5; // 04 bytes + 20 bytes * len(addresses)
}
```

#### SECP256K1の転送出力の例

secp256k1の転送出力をしてみましょう。

* **`TypeID`**：7
* **`Amount`**：1000000
* **`Locktime`**：0
* **`Threshold`**：1
* **`Addresses`**：
   * 0x66f90db6137a78f76b3693f7f2bc507956dae563

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

## アトミックトランザクション

アトミックトランザクションは、チェーン間の資金移動に使用されます。`ImportTx`と`ExportTx`の2種類があります。

### ExportTx

ExportTxは、CORETHから別のチェーンに資金を伝送するためのトランザクションです。

#### ExportTxに含まれるもの

ExportTxには、`typeID`、`networkID`、`blockchainID`、`destinationChain`、`inputs`、`exportedOutputs`が含まれています。

* **`typeID`**は、ExportTxのタイプを示すintです。exportTxのtypeIDは1です。
* **`networkID`**は、このトランザクションがどのアバランチネットワークに対して発行されるかを定義するintです。これは、mainnet、fujiなどを意味し、EVMのネットワークIDとは異なります。
* **`blockchainID`**は、32バイトの配列で、このトランザクションがどのブロックチェーンに発行されたかを定義します。
* **`destinationChain`**は、32バイトの配列で。このトランザクションがどのブロックチェーンに資金を伝送するかを定義します。
* **`inputs`**は、ExportTxの資金源となるEVMの出力の配列です。
* **`exportedOutputs`**は、`destinationChain`に転送するTransferableOutputsの配列です。

#### Gantt ExportTxの仕様

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

#### ExportTxの例

EVMを出力してみましょう。

* **`TypeID`**：`1`
* **`NetworkID`**：`12345`
* **`BlockchainID`**：`0x91060eabfb5a571720109b5896e5ff00010a1cfe6b103d585e6ebf27b97a1735`
* **`DestinationChain`**：`0xd891ad56056d9c01f18f43f58b5c784ad07a4a49cf3d1f11623804b5cba2c6bf`
* **`Inputs`**：
   * `"Example EVMInput as defined above"`
* **`Exportedoutputs`**：
   * `"Example TransferableOutput as defined above"`

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

ImportTxは、他のチェーンからCORETHに資金を取り込むためのトランザクションです。

#### ImportTxに含まれるもの

ImportTxには、`typeID`、`networkID`、`blockchainID`、`destinationChain`、`importedInputs`、`Outs`が含まれています。

* **`typeID`**は、ImportTxのタイプを表すintです。`ImportTx`の場合のtypeIDは0です。
* **`networkID`**は、このトランザクションがどのアバランチネットワークに対して発行されるかを定義するintです。これは、mainnet、fujiなどを意味し、EVMのネットワークIDとは異なります。
* **`blockchainID`**は、32バイトの配列で、このトランザクションがどのブロックチェーンに発行されたかを定義します。
* **`sourceChain`**は、どのブロックチェーンから資金を取り込むかを定義する32バイトの配列です。
* **`importedInputs`**は、ImportTxの資金源となるTransferableInputsの配列です。
* **`Outs`**は、このチェーンに取り込むEVMの出力の配列です。

#### Gantt ImportTxの仕様

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

#### ImportTxの例

ImportTxを作ってみましょう。

* **`TypeID`**：`0`
* **`NetworkID`**：`12345`
* **`BlockchainID`**：`0x91060eabfb5a571720109b5896e5ff00010a1cfe6b103d585e6ebf27b97a1735`
* **`SourceChain`**：`0xd891ad56056d9c01f18f43f58b5c784ad07a4a49cf3d1f11623804b5cba2c6bf`
* **`ImportedInputs`**：
   * `"Example TransferableInput as defined above"`
* **`Outs`**：
   * `"Exapmle EVMOutput as defined above"`

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

## 認証情報

クレデンシャルには、次の1つのタイプがあります：`SECP256K1Credential`。各クレデンシャルは入力とペアになっています。クレデンシャルの順番は、インプットの順番と一致しています。

### SECP256K1の認証情報

[secp256k1](https://github.com/ava-labs/avalanche-docs/tree/94d2e4aeddbf91f89b830f9b44b4aa60089ac755/build/cryptographic-primitives/README.md#cryptography-in-the-avalanche-virtual-machine)の認証情報には、65バイトの復元可能な署名のリストが含まれています。

#### SECP256K1の認証情報に含まれるもの

* **`TypeID`**は、このタイプのIDです。それは`0x00000009`です。
* **`Signatures`**は、65バイトの復元可能な署名の配列です。署名の順番は、入力の署名のインデックスと一致しなければなりません。

#### Gantt SECP256K1の認証情報の仕様

```text
+------------------------------+---------------------------------+
| type_id         : int        |                         4 bytes |
+-----------------+------------+---------------------------------+
| signatures      : [][65]byte |  4 + 65 * len(signatures) bytes |
+-----------------+------------+---------------------------------+
                               |  8 + 65 * len(signatures) bytes |
                               +---------------------------------+
```

#### Proto SECP256K1の認証情報の仕様

```text
message SECP256K1Credential {
    uint32 typeID = 1;             // 4 bytes
    repeated bytes signatures = 2; // 4 bytes + 65 bytes * len(signatures)
}
```

#### SECP256K1の認証情報の例

決済入力をしてみましょう。

* **`TypeID`**：9
* **`signatures`**：
   * `0x0acccf47a820549a84428440e2421975138790e41be262f7197f3d93faa26cc8741060d743ffaf025782c8c86b862d2b9febebe7d352f0b4591afbd1a737f8a30010199dbf`

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

## 署名済みのトランザクション

署名済みトランザクションには、未署名の`AtomicTx`と認証情報が含まれます。

### 署名済みトランザクションの内容

署名済みのトランザクションには、`CodecID`、`AtomicTx`、`Credentials`が含まれます。

* **`CodecID`**現在有効なコーデックIDは`00 00`のみです。
* **`AtomicTx`**は、上述のようにアトミックトランザクションです。
* **`Credentials`**は認証情報の配列です。各クレデンシャルは、AtomicTxの同じインデックスの入力に対応しています。

### Ganttの署名済みのトランザクションの仕様

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

### Protoの署名済みのトランザクションの仕様

```text
message Tx {
    uint16 codec_id = 1;                 // 2 bytes
    AtomicTx atomic_tx = 2;              // size(atomic_tx)
    repeated Credential credentials = 3; // 4 bytes + size(credentials)
}
```

### 署名済みのトランザクションの例

前述の例の符号なしのトランザクションと認証情報を使用して、符号付きトランザクションを作成してみましょう。

* **`CodecID`**：`0`
* **`UnsignedTx`**：`0x000000000000303991060eabfb5a571720109b5896e5ff00010a1cfe6b103d585e6ebf27b97a1735d891ad56056d9c01f18f43f58b5c784ad07a4a49cf3d1f11623804b5cba2c6bf000000016613a40dcdd8d22ea4aa99a4c84349056317cf550b6685e045e459954f258e5900000001dbcf890f77f49b96857648b72b77f9f82937f28a68704af05da0dc12ba53f2db00000005000000746a5288000000000100000000000000010eb5ccb85c29009b6060decb353a38ea3b52cd20000000746a528800dbcf890f77f49b96857648b72b77f9f82937f28a68704af05da0dc12ba53f2db`
* **`Credentials`**

   `0x00000009000000010acccf47a820549a84428440e2421975138790e41be262f7197f3d93faa26cc8741060d743ffaf025782c8c86b862d2b9febebe7d352f0b4591afbd1a737f8a300`

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

UTXOは、トランザクション出力の独立した表現です。

### UTXOに含まれるもの

UTXOには`CodecID`、`TxID`、`UTXOIndex`、`AssetID`、`Output`が含まれています。

* **`CodecID`**唯一有効な`CodecID`は`00 00`です。
* **`TxID`**は、32バイトのトランザクションIDです。トランザクションIDは、署名されたトランザクションのバイトのsha256を取って計算されます。
* **`UTXOIndex`**は、**`TxID`**で指定されたトランザクションの中で、このutxoがどの出力で作成されたかを指定する整数です。
* **`AssetID`**は、このUTXOがどの資産を参照するかを定義する32バイトの配列です。
* **`Output`**は、このutxoを作成した出力オブジェクトです。出力の直列化は上で定義した通りです。

### Gantt UTXOの仕様

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

### Proto UTXOの仕様

```text
message Utxo {
    uint16 codec_id = 1;     // 02 bytes
    bytes tx_id = 2;         // 32 bytes
    uint32 output_index = 3; // 04 bytes
    bytes asset_id = 4;      // 32 bytes
    Output output = 5;       // size(output)
}
```

### UTXOの例

上記で作成した署名付きトランザクションからUTXOを作ってみましょう。

* **`CodecID`**：`0`
* **`TxID`**：`0xf966750f438867c3c9828ddcdbe660e21ccdbb36a9276958f011ba472f75d4e7`
* **`UTXOIndex`**：0 = 0x00000000
* **`AssetID`**：`0x000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f`
* **`Output`**：`"Example EVMOutput as defined above"`

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

