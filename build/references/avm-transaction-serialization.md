# AVMトランザクションのフォーマット

このファイルは、Avalanche Virtual Machine (AVM)でのトランザクションをシリアライズする方法を示す唯一の情報源となります。このドキュメントでは、パッキングには[プリミティブシリアライゼーション](serialization-primitives.md)フォーマットを使用し、暗号化されたユーザー識別には[secp256k1](cryptographic-primitives.md#secp256k1-addresses)を使用しています。

## コーデックID

一部のデータには、そのデータをどのようにデシリアライズすべきかを示すコーデックID(unt16)が先頭に追加されています。現在のところ、有効なコーデックIDは0(`0x00 0x00`)のみです。

## 転送可能な出力

転送可能な出力では、出力を資産IDでラップします。

### 伝達可能なアウトプットの内容

転送可能な出力には、`AssetID`と[`Output`](avm-transaction-serialization.md#outputs)があります。

* **`AssetID`**は、この出力がどの資産を参照するかを定義する32バイトの配列です。
* **`Output`**は、[次](avm-transaction-serialization.md#outputs)に定義される出力です。例えば、[SECP256K1の転送出力](avm-transaction-serialization.md#secp256k1-transfer-output)となります。

### Ganttの転送可能な出力仕様

```text
+----------+----------+-------------------------+
| asset_id : [32]byte |                32 bytes |
+----------+----------+-------------------------+
| output   : Output   |      size(output) bytes |
+----------+----------+-------------------------+
                      | 32 + size(output) bytes |
                      +-------------------------+
```

### Protoの転送可能な出力仕様

```text
message TransferableOutput {
    bytes asset_id = 1; // 32 bytes
    Output output = 2;  // size(output)
}
```

### 転送可能な出力例

転送可能な出力を作りましょう：

* `AssetID`：`0x000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f`
* `Output`：`"Example SECP256K1 Transfer Output from below"`

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

## 転送可能な入力

転送可能な入力は、提供された転送入力で特定のUTXOを記述します。

### 伝達可能なインプットの内容

転送可能な入力には、`TxID`、`UTXOIndex``AssetID`と`Input`があります。

* **`TxID`**は、この入力がどのトランザクションからの出力を消費するかを定義する32バイトの配列です。トランザクションIDは、署名されたトランザクションのバイトのsha256を取って計算されます。
* **`UTXOIndex`**は、指定されたトランザクションでこの入力がどのUTXOを消費するかを定義する整数です。
* **`AssetID`**は、この入力がどの資産を参照するかを定義する32バイトの配列です。
* **`Input`**は、次のように定義される入力です。これは現在、[SECP256K1の転送入力](avm-transaction-serialization.md#secp256k1-transfer-input)のみとなります

### Ganttの転送可能な入力仕様

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

### Protoの転送可能な入力仕様

```text
message TransferableInput {
    bytes tx_id = 1;       // 32 bytes
    uint32 utxo_index = 2; // 04 bytes
    bytes asset_id = 3;    // 32 bytes
    Input input = 4;       // size(input)
}
```

### 転送可能な入力の例

転送可能な入力をしましょう。

* `TxID`：`0xf1e1d1c1b1a191817161514131211101f0e0d0c0b0a090807060504030201000`
* `UTXOIndex`：`5`
* `AssetID`：`0x000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f`
* `Input`：`"Example SECP256K1 Transfer Input from below"`

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

## 転送可能なOp

転送可能な操作とは、提供された転送操作を持つUTXOのセットを記述するものです。1回の操作で参照できる資産IDは1つだけです。

### 転送可能なOpの内容

転送可能な操作には、`AssetID`、`UTXOIDs`、`TransferOp`があります。

* **`AssetID`**は、どの資産を変更するかを定義する32バイトの配列です。
* **`UTXOIDs`**は、TxID-OutputIndexのタプルの配列です。この配列は、辞書順にソートされていなければなりません。
* **`TransferOp`**は[転送可能な操作オブジェクト](avm-transaction-serialization.md#operations)です。

### Ganttの転送可能Op仕様

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

### Protoの転送可能Op仕様

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

### 転送可能Opの例

転送可能な操作をしましょう。

* `AssetID`：`0x000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f`
* `UTXOIDs`：
   * `UTXOID`：
      * `TxID`：`0xf1e1d1c1b1a191817161514131211101f0e0d0c0b0a090807060504030201000`
      * `UTXOIndex`：`5`
* `Op`：`"Example Transfer Op from below"`

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

## 出力

出力は、次の4種類の可能性があります。[`SECP256K1TransferOutput`](avm-transaction-serialization.md#secp256k1-transfer-output)、[`SECP256K1MintOutput`](avm-transaction-serialization.md#secp256k1-mint-output)、[`NFTTransferOutput`](avm-transaction-serialization.md#nft-transfer-output)、[`NFTMintOutput`](avm-transaction-serialization.md#nft-mint-output)です。

## SECP256K1の転送出力

[secp256k1](cryptographic-primitives.md#secp-256-k1-addresses)転送出力では、指定されたUNIX時間後に資産の数量を複数のアドレスに送信することができます。

### **SECP256K1の転送出力の内容**

secp256k1の転送出力には、`TypeID`、`Amount`、`Locktime`、`Threshold`、`Addresses`が含まれています。

* **`TypeID`**は、この出力タイプのIDです。`0x00000007`となります。
* **`Amount`**は、この出力が所有する資産の数量を指定する長さです。正の値でなければなりません。
* **`Locktime`**は、この出力が後に消費できるUNIXタイムスタンプを含む長さです。このUNIXタイムスタンプは、秒単位で指定します。
* **`Threshold`**は、出力を消費するために必要な固有の署名の数を指定する整数です。**`Addresses`**の長さ以下でなければなりません。**`Addresses`**が空の場合、0でなければなりません。
* **`Addresses`**は、この出力を消費するために使用できる秘密鍵に対応する一意のアドレスのリストです。アドレスは、辞書的にソートされている必要があります。

### **Gantt SECP256K1の転送出力仕様**

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

### **Proto SECP256K1の転送出力仕様**

```text
message SECP256K1TransferOutput {
    uint32 typeID = 1;            // 04 bytes
    uint64 amount = 2;            // 08 bytes
    uint64 locktime = 3;          // 08 bytes
    uint32 threshold = 4;         // 04 bytes
    repeated bytes addresses = 5; // 04 bytes + 20 bytes * len(addresses)
}
```

### **SECP256K1の転送出力例**

secp256k1の転送出力をしてみましょう。

* **`TypeID`**：`7`
* **`Amount`**：`12345`
* **`Locktime`**：`54321`
* **`Threshold`**：`1`
* **`Addresses`**：
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

## SECP256K1ミント出力

[secp256k1](cryptographic-primitives.md#secp-256-k1-addresses)のミント出力とは、アドレスの集まりが所有する出力のことです。

### **SECP256K1のミント出力の内容**

secp256k1のミント出力には、`TypeID`、`Locktime`、`Threshold`、`Addresses`が含まれています。

* **`TypeID`**は、この出力タイプのIDです。`0x00000006`となります。
* **`Locktime`**は、この出力が後に消費できるUNIXタイムスタンプを含む長さです。このUNIXタイムスタンプは、秒単位で指定します。
* **`Threshold`**は、出力を消費するために必要な固有の署名の数を指定する整数です。**`Addresses`**の長さ以下でなければなりません。**`Addresses`**が空の場合、0でなければなりません。
* **`Addresses`**は、この出力を消費するために使用できる秘密鍵に対応する一意のアドレスのリストです。アドレスは、辞書的にソートされている必要があります。

### **Gantt SECP256K1のミント出力仕様**

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

### **Proto SECP256K1のミント出力仕様**

```text
message SECP256K1MintOutput {
    uint32 typeID = 1;            // 04 bytes
    uint64 locktime = 2;          // 08 bytes
    uint32 threshold = 3;         // 04 bytes
    repeated bytes addresses = 4; // 04 bytes + 20 bytes * len(addresses)
}
```

### **SECP256K1のミント出力例**

SECP256K1のミント出力を操作してみましょう。

* **`TypeID`**：`6`
* **`Locktime`**：`54321`
* **`Threshold`**：`1`
* **`Addresses`**：
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

## NFTの転送出力

NFTの転送出力とは、アドレスの集まりが所有するNFTのことです。

### **NFTの転送出力の内容**

NFTの転送出力には、`TypeID`、`GroupID`、`Payload`、`Locktime`、`Threshold`、`Addresses`が含まれています。

* **`TypeID`**は、この出力タイプのIDです。`0x0000000b`となります。
* **`GroupID`**は、このNFTが発行されたグループを指定する整数です。
* **`Payload`**は、1024バイトを超えない任意のバイト列です。
* **`Locktime`**は、この出力が後に消費できるUNIXタイムスタンプを含む長さです。このUNIXタイムスタンプは、秒単位で指定します。
* **`Threshold`**は、出力を消費するために必要な固有の署名の数を指定する整数です。**`Addresses`**の長さ以下でなければなりません。**`Addresses`**が空の場合、0でなければなりません。
* **`Addresses`**は、この出力を消費するために使用できる秘密鍵に対応する一意のアドレスのリストです。アドレスは、辞書的にソートされている必要があります。

### **Gantt NFTの転送出力仕様**

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

### **Proto NFTの転送出力仕様**

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

### **NFTの転送出力例**

NFTの転送出力を操作してみましょう。

* **`TypeID`**：`11`
* **`GroupID`**：`12345`
* **`Payload`**：`0x431100`
* **`Locktime`**：`54321`
* **`Threshold`**：`1`
* **`Addresses`**：
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

## NFTのミント出力

NFTのミント出力とは、アドレスの集まりが所有するNFTのことです。

### **NFTのミント出力の内容**

NFTのミント出力には、`TypeID`、`GroupID`、`Locktime`、`Threshold`、`Addresses`が含まれています。

* **`TypeID`**は、この出力タイプのIDです。`0x0000000a`となります。
* **`GroupID`**は、このNFTの発行対象となるグループを指定する整数です。
* **`Locktime`**は、この出力が後に消費できるUNIXタイムスタンプを含む長さです。このUNIXタイムスタンプは、秒単位で指定します。
* **`Threshold`**は、出力を消費するために必要な固有の署名の数を指定する整数です。**`Addresses`**の長さ以下でなければなりません。**`Addresses`**が空の場合、0でなければなりません。
* **`Addresses`**は、この出力を消費するために使用できる秘密鍵に対応する一意のアドレスのリストです。アドレスは、辞書的にソートされている必要があります。

### **Gantt NFTのミント出力仕様**

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

### **Proto NFTのミント出力仕様**

```text
message NFTMintOutput {
    uint32 typeID = 1;            // 04 bytes
    uint32 group_id = 2;          // 04 bytes
    uint64 locktime = 3;          // 08 bytes
    uint32 threshold = 4;         // 04 bytes
    repeated bytes addresses = 5; // 04 bytes + 20 bytes * len(addresses)
}
```

### **NFTのミント出力例**

NFTミントの出力を操作してみましょう。

* **`TypeID`**：`10`
* **`GroupID`**：`12345`
* **`Locktime`**：`54321`
* **`Threshold`**：`1`
* **`Addresses`**：
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

## 入力

入力には以下の1つのタイプがあります。`SECP256K1TransferInput`。

## SECP256K1の転送入力

[secp256k1](cryptographic-primitives.md#secp-256-k1-addresses)の転送入力では、未使用のsecp256k1転送出力を使うことができます。

### **SECP256K1の転送入力の内容**

secp256k1の転送入力には、`Amount`と`AddressIndices`が含まれています。

* **`TypeID`**は、この入力タイプのIDです。`0x00000005`となります。
* **`Amount`**は、この入力がUTXOから消費されるべき量を指定する長さです。正の値でなければなりません。UTXOで指定された量と同じでなければなりません。
* **`AddressIndices`**は、UTXOを消費するために使用される秘密鍵を定義する一意の整数のリストです。各UTXOには、そのUTXOを使うことができるアドレスの配列があります。各整数は、このトランザクションに署名する、このアドレス配列のインデックスを表します。配列は低い方から高い方へとソートされなければなりません。

### **Gantt SECP256K1の転送入力仕様**

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

### **Proto SECP256K1の転送入力仕様**

```text
message SECP256K1TransferInput {
    uint32 typeID = 1;                   // 04 bytes
    uint64 amount = 2;                   // 08 bytes
    repeated uint32 address_indices = 3; // 04 bytes + 04 bytes * len(address_indices)
}
```

### **SECP256K1の転送入力例**

決済入力をしてみましょう。

* **`TypeId`**：`5`
* **`Amount`**：`123456789`
* **`AddressIndices`**：[`3`、`7`]

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

## 操作

操作には、`SECP256K1MintOperation`、`NFTMintOp`、`NFTTransferOp`の3つのタイプがあります。

## **SECP256K1のミントの操作**

[secp256k1](cryptographic-primitives.md#secp-256-k1-addresses)のミントの操作は、SECP256K1のミント出力を消費し、新しいミント出力を作成し、転送出力を新しいオーナーのセットに送信します。

### **SECP256K1のミントの操作内容**

secp256k1のミントの操作には、`TypeID`、`AddressIndices`、`MintOutput`、`TransferOutput`があります。

* **`TypeID`**は、この出力タイプのIDです。`0x00000008`となります。
* **`AddressIndices`**は、[UTXO](avm-transaction-serialization.md#utxo)を消費するために使用される秘密鍵を定義する一意の整数のリストです。各UTXOには、そのUTXOを使うことができるアドレスの配列があります。各整数は、このトランザクションに署名する、このアドレス配列のインデックスを表します。配列は低い方から高い方へとソートされなければなりません。
* **`MintOutput`**は、[SECP256K1のミントの出力](avm-transaction-serialization.md#secp256k1-mint-output)です。
* **`TransferOutput`**は、[SECP256K1の転送の出力](avm-transaction-serialization.md#secp256k1-transfer-output)です。

### **Gantt SECP256K1のミントの操作仕様**

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

### **Proto SECP256K1のミントの操作仕様**

```text
message SECP256K1MintOperation {
    uint32 typeID = 1;                   // 4 bytes
    repeated uint32 address_indices = 2; // 04 bytes + 04 bytes * len(address_indices)
    MintOutput mint_output = 3;          // size(mint_output
    TransferOutput transfer_output = 4;  // size(transfer_output)
}
```

### **SECP256K1のミントの操作例**

[secp256k1](cryptographic-primitives.md#secp-256-k1-addresses)のミントの操作をしてみましょう。

* **`TypeId`**：`8`
* **`AddressIndices`**：
* `0x00000003`
* `0x00000007`
* **`MintOutput`**：`"Example SECP256K1 Mint Output from above"`
* **`TransferOutput`**：`"Example SECP256K1 Transfer Output from above"`

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

## NFTのミントOp

NFTのミントの操作は、NFTのミントの出力を消費し、消費されなかった出力を新しいオーナーのセットに送ります。

### **NFTのミントOpの内容**

NFTのミントの操作には、アドレスの`TypeID`、`AddressIndices`、`GroupID`、`Payload`、`Output`が含まれています。

* **`TypeID`**は、この操作タイプのIDです。`0x0000000c`となります。
* **`AddressIndices`**は、UTXOを消費するために使用される秘密鍵を定義する一意の整数のリストです。各UTXOには、そのUTXOを使うことができるアドレスの配列があります。各整数は、このトランザクションに署名する、このアドレス配列のインデックスを表します。配列は低い方から高い方へとソートされなければなりません。
* **`GroupID`**は、このNFTの発行対象となるグループを指定する整数です。
* **`Payload`**は、1024バイト以下の任意のバイト文字列です。
* **`Output`**は`TransferableOutput`ではなく、ロックタイム、閾値、そしてこの出力を消費するために使用できる秘密鍵に対応する一意のアドレスの配列です。アドレスは辞書的にソートされている必要があります。

### **GanttNFTのミントOpの仕様**

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

### **Proto NFTのミントOpの仕様**

```text
message NFTMintOp {
    uint32 typeID = 1;                   // 04 bytes
    repeated uint32 address_indices = 2; // 04 bytes + 04 bytes * len(address_indices)
    uint32 group_id = 3;                 // 04 bytes
    bytes payload = 4;                   // 04 bytes + len(payload)
    repeated bytes outputs = 5;          // 04 bytes + size(outputs)
}
```

### **NFTのミントOpの例**

NFTのミントの操作をしてみましょう。

* **`TypeId`**：`12`
* **`AddressIndices`**：
   * `0x00000003`
   * `0x00000007`
* **`GroupID`**：`12345`
* **`Payload`**：`0x431100`
* **`Locktime`**：`54321`
* **`Threshold`**：`1`
* **`Addresses`**：
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

## NFTの転送Op

NFTの転送操作は、未使用のNFT転送出力を新しい所有者のセットに送信します。

### **NFTの転送Opの内容**

NFTの転送操作には、`TypeID`、`AddressIndices`、そして型付けされていない`NFTTransferOutput`が含まれています。

* **`TypeID`**は、この出力タイプのIDです。`0x0000000d`となります。
* **`AddressIndices`**は、UTXOを消費するために使用される秘密鍵を定義する一意の整数のリストです。各UTXOには、そのUTXOを使うことができるアドレスの配列があります。各整数は、このトランザクションに署名する、このアドレス配列のインデックスを表します。配列は低い方から高い方へとソートされなければなりません。
* **`NFTTransferOutput`**は、この操作の出力であり、[NFTの転送出力](avm-transaction-serialization.md#nft-transfer-output)でなければなりません。この出力には、**`TypeId`**はありません。なぜなら、そのタイプは、この操作の中にあるというコンテキストによって知られているからです。

### **Gantt NFTの転送Opの仕様**

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

### **Proto NFTの転送Opの仕様**

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

### **NFTの転送Opの例**

NFTの転送の操作をしてみましょう。

* **`TypeID`**：`13`
* **`AddressIndices`**：
* `0x00000007`
* `0x00000003`
* **`GroupID`**：`12345`
* **`Payload`**：`0x431100`
* **`Locktime`**：`54321`
* **`Threshold`**：`1`
* **`Addresses`**：
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

## 初期状態

初期状態は、資産が作成されたときの初期状態を記述します。資産が使用する機能拡張のIDと、資産のジェネシスUTXOセットを示す可変長の出力配列が含まれます。

### 初期状態の内容

初期状態では、`FxID`と`Output`の配列が含まれています。

* **`FxID`**は、この状態がどの機能拡張に属しているかを定義する整数です。SECP256K1の資産については`0x00000000`となります。NFT資産の場合は`0x00000001`となります。
* **`Outputs`**は、上記で定義したように、[出力](avm-transaction-serialization.md#outputs)の可変長配列です。

### Ganttの初期状態の仕様

```text
+---------------+----------+-------------------------------+
| fx_id         : int      |                       4 bytes |
+---------------+----------+-------------------------------+
| outputs       : []Output |       4 + size(outputs) bytes |
+---------------+----------+-------------------------------+
                           |       8 + size(outputs) bytes |
                           +-------------------------------+
```

### Protoの初期状態の仕様

```text
message InitialState {
    uint32 fx_id = 1;                  // 04 bytes
    repeated Output outputs = 2;       // 04 + size(outputs) bytes
}
```

### 初期状態の例

初期状態を作ってみましょう。

* `FxID`：`0x00000000`
* `InitialState`：`["Example SECP256K1 Transfer Output from above"]`

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

## 認証情報

認証情報には以下の2つのタイプがあります。`SECP256K1Credential`と`NFTCredential`です。各認証情報は、入力または操作とペアになっています。認証情報の順序は、入力または操作の順序と一致します。

## SECP256K1の認証情報

[secp256k1](cryptographic-primitives.md#secp-256-k1-addresses)の認証情報には、65バイトの復元可能な署名のリストが含まれています。

### **SECP256K1の認証情報の内容**

* **`TypeID`**は、このタイプのIDです。`0x00000009`となります。
* **`Signatures`**は65バイトの復元可能な署名の配列です。署名の順序は、入力の署名インデックスと一致しなければなりません。

### **Gantt SECP256K1の認証情報の仕様**

```text
+------------------------------+---------------------------------+
| type_id         : int        |                         4 bytes |
+-----------------+------------+---------------------------------+
| signatures      : [][65]byte |  4 + 65 * len(signatures) bytes |
+-----------------+------------+---------------------------------+
                               |  8 + 65 * len(signatures) bytes |
                               +---------------------------------+
```

### **Proto SECP256K1の認証情報の仕様**

```text
message SECP256K1Credential {
    uint32 typeID = 1;             // 4 bytes
    repeated bytes signatures = 2; // 4 bytes + 65 bytes * len(signatures)
}
```

### **SECP256K1の認証情報の例**

決済入力をしてみましょう。

* **`TypeID`**：`9`
* **`signatures`**：
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

## NFTの認証情報

NFTの認証情報は、異なるTypeIDを持つ[secp256k1の認証情報](avm-transaction-serialization.md#secp256k1-credential)と同じです。NFTの認証情報のタイプIDは`0x0000000e`です。

## 未署名のトランザクション

未署名のトランザクションは、署名だけが欠けたトランザクションのすべての内容を含みます。無署名のトランザクションには以下の4つのタイプがあります。[`CreateAssetTx`](avm-transaction-serialization.md#what-unsigned-create-asset-tx-contains)、[`OperationTx`](avm-transaction-serialization.md#what-unsigned-operation-tx-contains)、[`ImportTx`](avm-transaction-serialization.md#what-unsigned-import-tx-contains)、および[`ExportTx`](avm-transaction-serialization.md#what-unsigned-export-tx-contains)です。これらはすべてには、共通のフィールドと演算を含む[`BaseTx`](avm-transaction-serialization.md#what-base-tx-contains)が埋め込まれています。

### ベーストランザクションの内容

ベースとなるトランザクションには、`TypeID`、`NetworkID`、`BlockchainID`、`Outputs`、`Inputs`、`Memo`が含まれています。

* **`TypeID`**は、このタイプのIDです。`0x00000000`となります。
* **`NetworkID`**は、このトランザクションがどのネットワークに対して発行されるかを定義する整数です。この値は、トランザクションのルーティングをサポートするためのもので、反射攻撃の防止を目的としたものではありません。
* **`BlockchainID`**は、このトランザクションがどのブロックチェーンに発行されたかを定義する32バイトの配列です。これは、ネットワークやブロックチェーン間で潜在的に有効なトランザクションに対する反射攻撃防止のために使用されます。
* **`Outputs`**は、[転送可能な出力オブジェクト](avm-transaction-serialization.md#transferable-output)の配列です。出力は、シリアル化された表現により、辞書的にソートされなければなりません。これらの出力で作成された資産の総量は、入力で消費された各資産の総量からトランザクション手数料を差し引いた値以下でなければなりません。
* **`Inputs`**は、[転送可能な入力オブジェクト](avm-transaction-serialization.md#transferable-input)の配列です。入力は、ソートされた一意である必要があります。入力はまず**`TxID`**で辞書的にソートされ、次に****`UTXOIndex`で低いものから高いものへとソートされます。**`TxID`**と**`UTXOIndex`**が同じ入力がある場合、二重支払いになるため、そのトランザクションは無効です。
* **`Memo`**メモフィールドは任意のバイトを含み、最大256バイトまでです。

### Ganttのベーストランザクションの仕様

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

### Protoのベーストランザクションの仕様

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

### ベーストランザクションの例

これまでの例の入力と出力を使用して、ベーストランザクションを作りましょう。

* **`TypeID`**：`0`
* **`NetworkID`**：`4`
* **`BlockchainID`**：`0xffffffffeeeeeeeeddddddddcccccccbbbbbbbbaaaaaaaa9999999988888888`
* **`Outputs`**：
   * `"Example Transferable Output as defined above"`
* **`Inputs`**：
   * `"Example Transferable Input as defined above"`
* **`Memo`**：`0x00010203`

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

### 未署名資産の作成トランザクションの内容

未署名資産の作成トランザクションには、`BaseTx`、`Name`、`Symbol`、`Denomination`、`InitialStates`が含まれています。`TypeID`は`0x00000001`です。

* **`BaseTx`**
* **`Name`**は、このトランザクションで作成される資産の名前を定義する人間が読める文字列です。この名前は一意であることは保証されません。名前は印刷可能なASCII文字のみで構成され、128文字以下でなければなりません。
* **`Symbol`**は、このトランザクションで作成される資産のシンボルを定義する人間が読める文字列です。シンボルは一意であることが保証されません。シンボルは印刷可能なASCII文字のみで構成され、4文字以内でなければなりません。
* **`Denomination`**は、このトランザクションで作成される資産の分割可能性を定義するバイトです。例えば、AVAXトークンは10億分の1に分割可能です。したがって、AVAXトークンのデノミネーションは9です。デノミネーションは32以下でなければなりません。
* **`InitialStates`**は、この資産がサポートする機能拡張と、その機能拡張の[初期状態](avm-transaction-serialization.md#initial-state)を定義する可変長の配列です。

### Ganttの未署名資産の作成トランザクションの仕様

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

### Protoの未署名資産の作成トランザクションの仕様

```text
message CreateAssetTx {
    BaseTx base_tx = 1;                       // size(base_tx)
    string name = 2;                          // 2 bytes + len(name)
    name symbol = 3;                          // 2 bytes + len(symbol)
    uint8 denomination = 4;                   // 1 bytes
    repeated InitialState initial_states = 5; // 4 bytes + size(initial_states)
}
```

### 未署名資産の作成トランザクションの例

前述の例の入力と出力を使用して、未署名のベーストランザクションを作ってみましょう。

* `BaseTx`：`"Example BaseTx as defined above with ID set to 1"`
* `Name`：`Volatility Index`
* `Symbol`：`VIX`
* `Denomination`：`2`
* **`InitialStates`**：
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

### 未署名操作のトランザクションの内容

未署名操作のトランザクションには、`BaseTx`、`Ops`があります。このタイプの`TypeID`は`0x00000002`です。

* **`BaseTx`**
* **`Ops`**は、[転送可能なOp](avm-transaction-serialization.md#transferable-op)の可変長配列です。

### Ganttの未署名操作のトランザクション仕様

```text
+---------+------------------+-------------------------------------+
| base_tx : BaseTx           |                 size(base_tx) bytes |
+---------+------------------+-------------------------------------+
| ops     : []TransferableOp |                 4 + size(ops) bytes |
+---------+------------------+-------------------------------------+
                             | 4 + size(ops) + size(base_tx) bytes |
                             +-------------------------------------+
```

### Protoの未署名操作のトランザクションの仕様

```text
message OperationTx {
    BaseTx base_tx = 1;          // size(base_tx)
    repeated TransferOp ops = 2; // 4 bytes + size(ops)
}
```

### 未署名操作のトランザクションの例

前述の例の入力と出力を使用して、未署名操作のトランザクションを作ってみましょう。

* `BaseTx`：`"Example BaseTx above" with TypeID set to 2`
* **`Ops`**：[`"Example Transferable Op as defined above"`]

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

### 未署名インポートのトランザクションの内容

未署名インポートのトランザクションには、`BaseTx`、`SourceChain`、`Ins`があります。*このタイプの`TypeID`は`0x00000003`です。

* **`BaseTx`**
* **`SourceChain`**は、32バイトのソースブロックチェーンIDです。
* **`Ins`**は[転送可能な入力](avm-transaction-serialization.md#transferable-input)の可変長の配列です。

### Ganttの未署名インポートのトランザクションの仕様

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

### Protoの未署名インポートのトランザクションの仕様

```text
message ImportTx {
    BaseTx base_tx = 1;          // size(base_tx)
    bytes source_chain = 2;      // 32 bytes
    repeated TransferIn ins = 3; // 4 bytes + size(ins)
}
```

### 未署名インポートのトランザクションの例

前述の例で得られた入力を使用して、未署名インポートのトランザクションを作ってみましょう。

* `BaseTx`：`"Example BaseTx as defined above"`ですが、`TypeID`を`3`に設定しています
* `SourceChain`：`0x0000000000000000000000000000000000000000000000000000000000000000`
* `Ins`：`"Example SECP256K1 Transfer Input as defined above"`

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

### 未署名エクスポートのトランザクションの内容

未署名エクスポートのトランザクションは、`BaseTx`、`DestinationChain`、`Outs`を含みます。このタイプの`TypeID`は`0x00000004`です。

* **`DestinationChain`**は、資金のエクスポート先となるチェーンの32バイトのIDです。
* **`Outs`**は、[転送可能な出力](avm-transaction-serialization.md#transferable-output)の可変長配列です。

### Ganttの未署名エクスポートのトランザクション仕様

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

### Protoの未署名エクスポートトランザクションの仕様

```text
message ExportTx {
    BaseTx base_tx = 1;            // size(base_tx)
    bytes destination_chain = 2;   // 32 bytes
    repeated TransferOut outs = 3; // 4 bytes + size(outs)
}
```

### 未署名エクスポートトランザクションの例

前述の例で得られた出力を使用して、未署名エクスポートのトランザクションを作ってみましょう。

* `BaseTx`：`"Example BaseTx as defined above"`ですが、`TypeID`を`4`に設定しています
* `DestinationChain`：`0x0000000000000000000000000000000000000000000000000000000000000000`
* `Outs`：`"Example SECP256K1 Transfer Output as defined above"`

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

## 署名済みのトランザクション

署名済のトランザクションとは、未署名のトランザクションに[認証情報](avm-transaction-serialization.md#credentials)の配列を加えたものです。

### 署名済のトランザクションの内容

署名済みのトランザクションには、`CodecID`、`UnsignedTx`、`Credentials`が含まれます。

* **`CodecID`**現在有効なコーデックIDは`00 00`のみです。
* **`UnsignedTx`**は、上述のように未署名のトランザクションです。
* **`Credentials`** は、[認証情報](avm-transaction-serialization.md#credentials)の配列です。各認証情報は、この認証情報で同じインデックスの入力とペアになります。

### Ganttの署名済みのトランザクションの仕様

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

### Protoの署名済みのトランザクションの仕様

```text
message Tx {
    uint16 codec_id = 1;                 // 2 bytes
    UnsignedTx unsigned_tx = 2;          // size(unsigned_tx)
    repeated Credential credentials = 3; // 4 bytes + size(credentials)
}
```

### 署名済みのトランザクションの例

前述の例で使用した未署名のトランザクションと認証情報を使用して、署名済みのトランザクションを作成してみましょう。

* **`CodecID`**：`0`
* **`UnsignedTx`**：`0x0000000100000004ffffffffeeeeeeeeddddddddccccccccbbbbbbbbaaaaaaaa999999998888888800000001000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f000000070000000000003039000000000000d431000000010000000251025c61fbcfc078f69334f834be6dd26d55a955c3344128e060128ede3523a24a461c8943ab085900000001f1e1d1c1b1a191817161514131211101f0e0d0c0b0a09080706050403020100000000005000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f0000000500000000075bcd150000000200000007000000030000000400010203`
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

UTXOは、トランザクションの出力についての独立した表現です。

### UTXOの内容

UTXOには`CodecID`、`TxID`、`UTXOIndex`、`AssetID`、`Output`が含まれています。

* **`CodecID`**唯一有効な`CodecID`は`00 00`です
* **`TxID`**は、32バイトのトランザクションIDです。トランザクションIDは、署名済みのトランザクションのバイトのsha256を取得することによって計算されます。
* **`UTXOIndex`**は、**`TxID`**で指定されたトランザクションの中で、このUTXOがどの出力で作成されたかを指定する整数です。
* **`AssetID`**は、このUTXOがどの資産を参照するかを定義する32バイトの配列です。
* **`Output`**は、このUTXOを作成した[出力](avm-transaction-serialization.md#transferable-output)オブジェクトです。出力のシリアル化は上記で定義されています。

### GanttのUTXOの仕様

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

### ProtoのUTXOの仕様

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

上記で作成した署名済みのトランザクションからUTXOを作ってみましょう。

* **`CodecID`**：`0`
* **`TxID`**：`0xf966750f438867c3c9828ddcdbe660e21ccdbb36a9276958f011ba472f75d4e7`
* **`UTXOIndex`**：`0`=`0x00000000`
* **`AssetID`**：`0x000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f`
* **`Output`**：`"Example SECP256K1 Transferable Output as defined above"`

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

AVMのジェネシスのインスタンスで発行される資産です

### GenesisAssetの内容

GenesisAssetのインスタンスには、`Alias`、`NetworkID`、`BlockchainID`、`Outputs`、`Inputs`、`Memo`、`Name`、`Symbol`、`Denomination`、`InitialStates`が含まれています。

* **`Alias`**は、この資産のエイリアスです。
* **`NetworkID`**は、このトランザクションがどのネットワークに発行されるかを定義します。この値は、トランザクションのルーティングをサポートするためのもので、反射攻撃の防止を目的としたものではありません。
* **`BlockchainID`**は、このトランザクションがどのブロックチェーンに発行されるかを定義するID（32バイトの配列）です。これは、ネットワークやブロックチェーン間で潜在的に有効なトランザクションに対する反射攻撃防止のために使用されます。
* **`Outputs`**は、[転送可能な出力オブジェクト](avm-transaction-serialization.md#transferable-output)の配列です。出力は、シリアル化された表現により、辞書的にソートされなければなりません。これらの出力で作成された資産の総量は、入力で消費された各資産の総量からトランザクション手数料を差し引いた値以下でなければなりません。
* **`Inputs`**は、[転送可能な入力オブジェクト](avm-transaction-serialization.md#transferable-input)の配列です。入力は、ソートされた一意である必要があります。入力はまず**`TxID`**で辞書的にソートされ、次に****`UTXOIndex`で低いものから高いものへとソートされます。**`TxID`**と**`UTXOIndex`**が同じ入力がある場合、二重支払いになるため、そのトランザクションは無効です。
* **`Memo`**は、最大256バイトまでの任意のバイトを含むメモフィールドです。
* **`Name`**は、このトランザクションで作成される資産の名前を定義する人間が読める文字列です。この名前は一意であることは保証されません。名前は印刷可能なASCII文字のみで構成され、128文字以下でなければなりません。
* **`Symbol`**は、このトランザクションで作成される資産のシンボルを定義する人間が読める文字列です。シンボルは一意であることが保証されません。シンボルは印刷可能なASCII文字のみで構成され、4文字以内でなければなりません。
* **`Denomination`**は、このトランザクションで作成される資産の分割可能性を定義するバイトです。例えば、AVAXトークンは10億分の1に分割可能です。したがって、AVAXトークンのデノミネーションは9です。デノミネーションは32以下でなければなりません。
* **`InitialStates`**は、この資産がサポートする機能拡張と、その機能拡張の[初期状態](avm-transaction-serialization.md#initial-state)を定義する可変長の配列です。

### GanttのGenesisAssetの仕様

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

### ProtoのGenesisAssetの仕様

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

### GenesisAssetの例

以下のGenesisAssetを作りましょう。

* **`Alias`**：`asset1`
* **`NetworkID`**：`12345`
* **`BlockchainID`**：`0x0000000000000000000000000000000000000000000000000000000000000000`
* **`Outputs`**：[]
* **`Inputs`**：[]
* **`Memo`**：`2Zc54v4ek37TEwu4LiV3j41PUMRd6acDDU3ZCVSxE7X`
* **`Name`**：`asset1`
* **`Symbol`**：`MFCA`
* **`Denomination`**：`1`
* **`InitialStates`**：
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

