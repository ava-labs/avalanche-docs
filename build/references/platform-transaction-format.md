# Formato de Transacción de la Plataforma

Este archivo pretende ser la única fuente de verdad sobre cómo serializamos las transacciones en la Avalanche’s Platform Virtual Machine, también conocida como la`Platform Chain` o la `P-Chain`. Este documento utiliza el formato [serialización primitiva](serialization-primitives.md) para el empaquetado y [secp256k1](cryptographic-primitives.md#secp-256-k1-addresses) para la identificación criptográfica del usuario.

## Codec ID

Algunos datos se preparan con un códec ID \(unt16\) que denota cómo los datos deben ser deserializados. En este momento, el único ID de códec válido es el 0 \(`0x00 0x00`\).

## Salida Transferible

Las salidas transferibles o "Transferable Outputs" envuelven una salida con el ID  de un activo.

### What Transferable Output Contains

Una salida transferible contiene una `AssetID` y un `Output`.

* **`AssetID`** es una matriz de 32 bytes que define a qué activo hace referencia esta salida. El único `AssetID` válido es el `AssetID` AVAX.
* **`Output`** is an output, as defined below. For example, this can be a SECP256K1 transfer output.

### Especificación Gantt de una Salida Transferible

```text
+----------+----------+-------------------------+
| asset_id : [32]byte |                32 bytes |
+----------+----------+-------------------------+
| output   : Output   |      size(output) bytes |
+----------+----------+-------------------------+
                      | 32 + size(output) bytes |
                      +-------------------------+
```

### Especificación Proto de una Salida Transferible

```text
message TransferableOutput {
    bytes asset_id = 1; // 32 bytes
    Output output = 2;  // size(output)
}
```

### Ejemplo de una Salida Transferible

Hagamos una salida transferible:

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

## Entrada transferible

Las entradas transferibles o "Transferable inputs" describen un UTXO específico con una entrada de transferencia proporcionada.

### Que Contiene una Entrada Transferible

Una entrada transferible contiene un `TxID`un `UTXOIndex` `AssetID` y un `Input`.

* **`TxID`** es una matriz de 32 bytes que define de qué transacción esta entrada está consumiendo una salida.
* **`UTXOIndex`** es un int que define qué utxo está consumiendo esta entrada en la transacción especificada.
* **`AssetID`** es una matriz de 32 bytes que define a qué activo hace referencia esta salida. El único `AssetID` válido es el `AssetID` AVAX.
* **`Input`** es un elemento de entrada transferible.

### Especificación Gantt de Entrada Transferible

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

### Especificación Proto de la Entrada Transferible

```text
message TransferableInput {
    bytes tx_id = 1;       // 32 bytes
    uint32 utxo_index = 2; // 04 bytes
    bytes asset_id = 3;    // 32 bytes
    Input input = 4;       // size(input)
}
```

### Ejemplo de entrada transferible

Hagamos una entrada transferible:

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

## Salidas

Las salidas o "Outputs" tienen dos tipos posibles: `SECP256K1TransferOutput`y `SECP256K1OutputOwners`.

##  Salida de Transferencia SECP256K1

Una salida de transferencia [secp256k1](cryptographic-primitives.md#secp-256-k1-addresses)  o "secp256k1 transfer output" permite enviar una cantidad de un bien a un conjunto de direcciones después de un tiempo unix especificado. El único activo válido es AVAX.

### **Que contiene una Salida de Transferencia SECP256K1**

Una salida de transferencia de secp256k1 contiene un `TypeID`, `Amount`, `Locktime`, `Threshold`, y `Addresses`.

* **`TypeID`** es el ID para este tipo de salida. Es `0x00000007`.
* **`Amount`** es un long que especifica la cantidad del activo que esta salida posee. Debe ser positivo.
* **`Locktime`** es un long que contiene el timestamp unix en que esta salida puede ser utilizada después. El timestamp unix es específico para el segundo.
* **`Threshold`** es un int que nombra el número de firmas únicas requeridas para gastar la salida. Debe ser menor o igual a la longitud de las **`Addresses`**. Si **`Addresses`** está vacío, debe ser 0.
* **`Addresses`** es una lista de direcciones únicas que corresponden a las private keys que pueden ser usadas para gastar esta salida. Las direcciones deben estar ordenadas lexicográficamente.

### ** Especificación Gantt de una Salida de Transferencia SECP256K1**

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

### **Especificación Proto de una Salida de Transferencia SECP256K1 **

```text
message SECP256K1TransferOutput {
    uint32 type_id = 1;           // 04 bytes
    uint64 amount = 2;            // 08 bytes
    uint64 locktime = 3;          // 08 bytes
    uint32 threshold = 4;         // 04 bytes
    repeated bytes addresses = 5; // 04 bytes + 20 bytes * len(addresses)
}
```

### **Ejemplo de una Salida de Transferencia SECP256K1**

Hagamos una salida de transferencia secp256k1 con:

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

##  Salida de los Propietarios de la Salida SECP256K1

Una  salida de los propietarios de la salida [secp256k1](cryptographic-primitives.md#secp-256-k1-addresses) o "secp256k1 output owners output" recibirá las recompensas del stake cuando termine el período de retención.

### **Que Contiene una Salida de los Propietarios de la Salida SECP256K1**

Una salida de los propietarios de la salida SECP256K1 contiene un `TypeID`, `Locktime`, `Threshold`, y `Addresses`.

* **`TypeID`** es el ID para este tipo de salida. Es `0x0000000b`.
* **`Locktime`** es un long que contiene el timestamp unix en que esta salida puede ser utilizada después. El timestamp unix es específico para el segundo.
* **`Threshold`** es un int que nombra el número de firmas únicas requeridas para gastar la salida. Debe ser menor o igual a la longitud de las **`Addresses`**. Si **`Addresses`** está vacío, debe ser 0.
* **`Addresses`** es una lista de direcciones únicas que corresponden a las private keys que pueden ser usadas para gastar esta salida. Las direcciones deben estar ordenadas lexicográficamente.

### **Especificación Gantt de una Salida de los Propietarios de la Salida SECP256K1**

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

### **Especificación Proto de una Salida de los Propietarios de la Salida SECP256K1**

```text
message SECP256K1OutputOwnersOutput {
    uint32 type_id = 1;           // 04 bytes
    uint64 locktime = 2;          // 08 bytes
    uint32 threshold = 3;         // 04 bytes
    repeated bytes addresses = 4; // 04 bytes + 20 bytes * len(addresses)
}
```

### **Ejemplo de una Salida de los Propietarios de la Salida SECP256K1**

Hagamos una salida de los propietarios de la salida SECP256K1 con:

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


## Entradas

Las entradas o "Inputs"  tienen un tipo posible: `SECP256K1TransferInput`.

## Entrada de Transferencia SECP256K1 

Una entrada de transferencia [secp256k1](cryptographic-primitives.md#secp-256-k1-addresses) o "secp256k1 transfer input" permite utilizar una salida de transferencia secp256k1 no utilizada.

### **Que Contiene una Entrada de Transferencia SECP256K1**


Una entrada de transferencia secp256k1 contiene un `Amount` y un `AddressIndices`.

* **`TypeID`** es el ID para este tipo de entrada. Es `0x00000005`.
* **`Amount`** es un long que especifica la cantidad que esta entrada debe utilizar de la UTXO. Debe ser positivo. Debe ser igual a la cantidad especificada en la UTXO.
* **`AddressIndices`** es una lista de ints únicos que definen las private keys que se están usando para utilizar la UTXO. Cada UTXO tiene un conjunto de direcciones que pueden utilizar la UTXO. Cada int representa el índice de esta matriz de direcciones que firmará esta transacción. La matriz debe ser ordenada de baja a alta.


### **Especificación Gantt de una Entrada de Transferencia SECP256K1**

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

**Especificación Proto de una  Entrada de Transferencia SECP256K1**

```text
message SECP256K1TransferInput {
    uint32 type_id = 1;                  // 04 bytes
    uint64 amount = 2;                   // 08 bytes
    repeated uint32 address_indices = 3; // 04 bytes + 4 bytes * len(address_indices)
}
```

### **Ejemplo de una Entrada de Transferencia SECP256K1**

Hagamos una entrada de pago con:

* **`TypeID`**: 5
* **`Amount`**: 4000000000
* **`AddressIndices`**: \[0\]

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

## Transacciones no Firmadas

Las transacciones no firmadas o "Unsigned transactions"  contienen el contenido completo de una transacción en la que sólo faltan las firmas. Las transacciones no firmadas tienen cuatro tipos posibles `CreateAssetTx`, `OperationTx`, `ImportTx`, y `ExportTx`. Todas ellas incluyen `BaseTx`, la cual contiene campos y operaciones comunes.

## Transacción Base No Firmada

### **Que Contiene una Transacción Base**

Una transacción base o "BaseTx" contiene `TypeID`, `NetworkID`, `BlockchainID`, `Outputs`, `Inputs`, y`Memo`.

* **`TypeID`** es la identificación para este tipo. Es `0x00000000`.
* **`NetworkID`** es un int que define a qué red se destina esta transacción. Este valor está pensado para soportar el enrutamiento de la transacción y no está diseñado para la prevención de ataques de repetición.
* **`BlockchainID`** es un array de 32 bytes que define a qué blockchain se emitió esta transacción. Se utiliza para la prevención de ataques de repetición de transacciones que podrían ser válidas en toda la red o en la blockchain.
* **`Outputs`** es una matriz de objetos de salida transferibles. Las salidas deben ser ordenadas lexicográficamente por su representación serializada. La cantidad total de los activos creados en estos productos debe ser inferior o igual a la cantidad total de cada activo consumido en los insumos menos la tasa de transacción.
* **`Inputs`** es un conjunto de objetos de entrada transferibles. Las entradas deben ser clasificadas y únicas. Las entradas se ordenan primero lexicográficamente por su **`TxID`** y luego por el **`UTXOIndex`** de bajo a alto. Si hay entradas que tienen el mismo **`TxID`** y **`UTXOIndex`**, entonces la transacción es inválida ya que esto resultaría en un doble gasto.
* **`Memo`** El campo Memo contiene bytes arbitrarios, hasta 256 bytes.


### **Especificación Gantt de una Transacción Base**

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

### **Especificación Proto de una Transacción Base**

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

### **Ejemplo de una Transacción Base**

Hagamos un base tx que utilice las entradas y salidas de los ejemplos anteriores:

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

## Transacción Agregar Validador No Firmada

### Que Contiene una Transacción Agregar Validador No Firmada

Una transacción agregar validador no firmada o "Unsigned Add Validator Tx" contiene un `BaseTx`, `Validator`, `Stake`, `RewardsOwner`, y `Shares`. Su `TypeID` es `0x0000000c`.

* **`BaseTx`**
* **`NodeID`** es de 20 bytes el cual es el  ID del nodo del delegado.
* **`StartTime`** es un long el cual es el tiempo de Unix cuando el delegado comienza a delegar.
* **`EndTime`** es un long el cual es el tiempo Unix cuando el delegado deja de delegar \(y se devuelve el AVAX del stake\).
* **`Weight`** es un long, el cual es la cantidad que el delegado pone en staking
* **`Stake`**  el Stake tiene `LockedOuts`
 * **`LockedOuts`** Un conjunto de salidas transferibles que están bloqueadas mientras dure el período de stake. Al final del periodo de stake, estas salidas son devueltas a sus respectivas direcciones.
* **`RewardsOwner`** Un `SECP256K1OutputOwners`
* **`Shares`**  10 000  veces el porcentaje de recompensa tomado de los delegadores

### **Especificación Gantt de una Transacción Agregar Validador No Firmada**

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

### **Especificación Proto de una Transacción Agregar Validador No Firmada**

```text
message AddValidatorTx {
    BaseTx base_tx = 1;                      // size(base_tx)
    Validator validator = 2;                 // 44 bytes
    Stake stake = 3;                         // size(LockedOuts)
    SECP256K1OutputOwners rewards_owner = 4; // size(rewards_owner)
    uint32 shares = 5;                       // 04 bytes
}
```

### **Ejemplo de una Transacción Agregar Validador No Firmada**

Hagamos un ejemplo de una transacción agregar validador no firmada que utilice las entradas y salidas de los ejemplos anteriores:

* **`BaseTx`**: `"Example BaseTx as defined above with ID set to 0c"`
* **`NodeID`**: `0xe9094f73698002fd52c90819b457b9fbc866ab80`
* **`StarTime`**: `0x000000005f21f31d`
* **`EndTime`**: `0x000000005f497dc6`
* **`Weight`**: `0x000000000000d431`
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

## Transacción Agregar Validador de Subnet No Firmada

### **Que Contiene una Transacción Agregar Validador de Subnet No Firmada**

Una transacción agregar validador de subnet no firmada o "Unsigned Add Subnet Validator Tx" contiene un `BaseTx`, `Validator`, `SubnetID`, y `SubnetAuth`. Su `TypeID`es `0x0000000d`.

* **`BaseTx`**
* **`Validator`** Tiene una `NodeID`, `StartTime`, `EndTime`, y `Weight`
* **`NodeID`** es de 20 bytes el cual es el  ID del nodo del delegado.
* **`StartTime`** es un long el cual es el tiempo de Unix cuando el delegado comienza a delegar.
* **`EndTime`** es un long el cual es el tiempo Unix cuando el delegado deja de delegar \(y se devuelve el AVAX del stake\).
* **`Weight`** es un long, el cual es la cantidad que el delegado pone en staking
* **`SubnetID`** un id de subnet de 32 bytes
* **`SubnetAuth`` contiene `SigIndices`` y tiene un tipo de identificación de `0x0000000a`. `SigIndices` es una lista de ints únicos que definen las direcciones que ejecutan la firma de control para añadir un validador a una subred. El conjunto debe ser clasificado de bajo a alto.
* 
### **Especificación Gantt de una Transacción Agregar Validador de Subnet No Firmada**

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

### **Especificación Proto de una Transacción Agregar Validador de Subnet No Firmada**

```text
message AddSubnetValidatorTx {
    BaseTx base_tx = 1;         // size(base_tx)
    Validator validator = 2;    // size(validator)
    SubnetID subnet_id = 3;     // 32 bytes
    SubnetAuth subnet_auth = 4; // 04 bytes + len(sig_indices)
}
```

### **Ejemplo de una Transacción Agregar Validador de Subnet No Firmada**

Hagamos un ejemplo de una transacción agregar validador de subnet no firmada que utilice las entradas y salidas de los ejemplos anteriores:

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

## Transacción Agregar Delegador de Subnet No Firmada

### **Que Contiene una Transacción Agregar Delegador de Subnet No Firmada**

Una transacción agregar delegador de subnet no firmada o "Unsigned Add Subnet Validator Tx" contiene un `BaseTx`, `Validator`, `Stake`, y `RewardsOwner`. Su `TypeID` es `0x0000000e`.

* **`BaseTx`**
* **`Validator`** Tiene una `NodeID`, `StartTime`, `EndTime`, y `Weight`
* **`NodeID`** es de 20 bytes el cual es el  ID del nodo del delegado.
* **`StartTime`** es un long el cual es el tiempo de Unix cuando el delegado comienza a delegar.
* **`EndTime`** es un long el cual es el tiempo Unix cuando el delegado deja de delegar \(y se devuelve el AVAX del stake\).
* **`Weight`** es un long, el cual es la cantidad que el delegado pone en staking
* **`Stake`**  el Stake tiene `LockedOuts`
 * **`LockedOuts`** Un conjunto de salidas transferibles que están bloqueadas mientras dure el período de stake. Al final del periodo de stake, estas salidas son devueltas a sus respectivas direcciones.
* **`RewardsOwner`** Un `SECP256K1OutputOwners`

### **Especificación Gantt de una Transacción Agregar Delegador de Subnet No Firmada**

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

### **Especificación Proto de una Transacción Agregar Delegador de Subnet No Firmada**

```text
message AddDelegatorTx {
    BaseTx base_tx = 1;                      // size(base_tx)
    Validator validator = 2;                 // 44 bytes
    Stake stake = 3;                         // size(LockedOuts)
    SECP256K1OutputOwners rewards_owner = 4; // size(rewards_owner)
}
```

### **Ejemplo de una Transacción Agregar Delegador de Subnet No Firmada**

Hagamos un ejemplo de una transacción agregar delegador de subnet no firmada que utilice las entradas y salidas de los ejemplos anteriores:

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

## Transacción Crear Subnet No Firmada

### **Que Contiene una Transacción Crear Subnet No Firmada**

Una transacción crear subnet no firmada o "Unsigned Create Subnet Tx" contiene un `BaseTx`, y `RewardsOwner`. Su `TypeID` es `0x00000010`.

* **`BaseTx`**
* **`RewardsOwner`** A `SECP256K1OutputOwners`

### **Especificación Gantt de una Transacción Crear Subnet No Firmada**

```text
+-----------------+-----------------------|---------------------------------+
| base_tx         : BaseTx                |             size(base_tx) bytes |
+-----------------+-----------------------+--------------------------------+
| rewards_owner   : SECP256K1OutputOwners |       size(rewards_owner) bytes |
+-----------------+-----------------------+---------------------------------+
                                | size(rewards_owner) + size(base_tx) bytes |
                                +-------------------------------------------+
```

### **Especificación Proto de una Transacción Crear Subnet No Firmada**

```text
message CreateSubnetTx {
    BaseTx base_tx = 1;                      // size(base_tx)
    SECP256K1OutputOwners rewards_owner = 2; // size(rewards_owner)
}
```

### **Ejemplo de una Transacción Crear Subnet No Firmada**

Hagamos un ejemplo de una transacción crear subnet no firmada que utilice las entradas y salidas de los ejemplos anteriores:

* **`BaseTx`**: “Example BaseTx as defined above but with TypeID set to 16”
* **`RewardsOwner`**:
  * **`TypeId`**: 11
  * **`Locktime`**: 0
  * **`Threshold`**: 1
  * **`Addresses`**: \[ 0xda2bee01be82ecc00c34f361eda8eb30fb5a715c \]

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

## Transacción Importar No Firmada

### **Que Contiene una Transacción Importar No Firmada**

Una transacción importar no firmada o "Unsigned Import Tx" contiene un `BaseTx`, `SourceChain`, y  `Ins`. Su `TypeID`  es `0x00000011`.

* **`BaseTx`**
* **`SourceChain`** es una ID de blockchain de fuente de 32 bytes.
* **`Ins`** es un conjunto de longitud variable de entradas transferibles.

### **Especificación Gantt de una Transacción Importar No Firmada**

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

### **Especificación Proto de una Transacción Importar No Firmada**

```text
message ImportTx {
    BaseTx base_tx = 1;          // size(base_tx)
    bytes source_chain = 2;      // 32 bytes
    repeated TransferIn ins = 3; // 4 bytes + size(ins)
}
```

### **Ejemplo de una Transacción Importar No Firmad**

Hagamos un ejemplo de una transacción importar no firmada que utilice las entradas y salidas de los ejemplos anteriores:

* **`BaseTx`**: “Example BaseTx as defined above with TypeID set to 17”
* **`SourceChain`**:
* **`Ins`**: “Example SECP256K1 Transfer Input as defined above”

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

## Transacción Exportar No Firmada

### **Que Contiene una Transacción Exportar No Firmada**

Una transacción exportar no firmada o "Unsigned Export Tx" contiene un `BaseTx`, `DestinationChain`, y  `Outs`. Su `TypeID` es `0x00000012`.

* **`DestinationChain`** es el ID de 32 bytes de la cadena a la que se exportan los fondos.
* **`Outs`** es un conjunto de longitud variable de salidas transferibles.

### **Especificación Gantt de una Transacción Exportar No Firmada**

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

### **Especificación Proto de una Transacción Exportar No Firmada**

```text
message ExportTx {
    BaseTx base_tx = 1;            // size(base_tx)
    bytes destination_chain = 2;   // 32 bytes
    repeated TransferOut outs = 3; // 4 bytes + size(outs)
}
```

### **Ejemplo de una Transacción Exportar No Firmada**

Hagamos un ejemplo de una transacción exportar no firmada que utilice las entradas y salidas de los ejemplos anteriores:

* `BaseTx`: “Example BaseTx as defined above” with `TypeID` set to 18
* `DestinationChain`: `0x0000000000000000000000000000000000000000000000000000000000000000`
* `Outs`: “Example SECP256K1 Transfer Output as defined above”

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

## Credenciales

Las credenciales o "Credentials" tienen un tipo posible: `SECP256K1Credential`. Cada credencial está emparejada con una entrada u operación. El orden de las credenciales coincide con el orden de las entradas u operaciones.

## Credencial SECP256K1

Una credencial [secp256k1](cryptographic-primitives.md#secp-256-k1-addresses) contiene una lista de firmas recuperables de 65 bytes.

### **Que Contiene una  Credencial SECP256K1**

* **`TypeID`** es el ID para este tipo. Es  `0x00000009`.
* **`Signatures`** es un conjunto de firmas recuperables de 65 bytes. El orden de las firmas debe coincidir con los índices de firmas de la entrada.

### **Especificación Gantt de una  Credencial SECP256K1**

```text
+------------------------------+---------------------------------+
| type_id         : int        |                         4 bytes |
+-----------------+------------+---------------------------------+
| signatures      : [][65]byte |  4 + 65 * len(signatures) bytes |
+-----------------+------------+---------------------------------+
                               |  8 + 65 * len(signatures) bytes |
                               +---------------------------------+
```

### **Especificación Proto de una  Credencial SECP256K1**

```text
message SECP256K1Credential {
    uint32 TypeID = 1;             // 4 bytes
    repeated bytes signatures = 2; // 4 bytes + 65 bytes * len(signatures)
}
```

### **Ejemplo de una  Credencial SECP256K1**

Hagamos una entrada de pago con:

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

## 
Transacción Firmada

Una transacción firmada o "signed transaction" es una transacción no firmada con la adición de una serie de credenciales.

### Que Contiene una Transacción Firmada

Una transacción firmada contiene un   `CodecID`, `UnsignedTx`, y`Credentials`.

* **`CodecID`** La única identificación de codec válida actualmente es `00 00`.
* **`UnsignedTx`** es una transacción sin firmar, como se describe arriba.
* **`Credentials`** es un conjunto de credenciales. Cada credencial será emparejada con la entrada en el mismo índice en esta credencial.

### Especificación Gantt de una Transacción Firmada

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

### Especificación Proto de una Transacción Firmada

```text
message Tx {
    uint32 codec_id = 1;                 // 2 bytes
    UnsignedTx unsigned_tx = 2;          // size(unsigned_tx)
    repeated Credential credentials = 3; // 4 bytes + size(credentials)
}
```

### Ejemplo de una Transacción Firmada

Hagamos un ejemplo de una transacción firmada que utilice las entradas y salidas de los ejemplos anteriores:

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

Una UTXO o "Unspent Transaction Output"es una representación independiente de la salida de una transacción.

### Que Contiene Una UTXO

Una UTXO contiene un `CodecID`, `TxID`, `UTXOIndex`, `AssetID`, y `Output`.

* **`CodecID`** El único `CodecID` válido es `00 00`
* **`TxID`** es una identificación de transacción de 32 bytes. Los ID de transacción se calculan tomando sha256 de los bytes de la transacción firmada.
* **`UTXOIndex`** es un int que especifica qué salida de la transacción especificada por **`TxID`** fue creada por este utxo.
* **`AssetID`** es una matriz de 32 bytes que define a qué activo hace referencia este utxo.
* **`Output`** es el objeto de salida que creó este utxo. La serialización de las Salidas fue definida anteriormente.

#### Especificación Gantt de una UTXO <a id="gantt-utxo-specification"></a>

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

### Especificación Proto de una UTXO

```text
message Utxo {
    uint32 codec_id = 1;     // 02 bytes
    bytes tx_id = 2;         // 32 bytes
    uint32 output_index = 3; // 04 bytes
    bytes asset_id = 4;      // 32 bytes
    Output output = 5;       // size(output)
}
```

### Ejemplo de una UTXO

Ejemplo de una UTXO de la transacción firmada creada anteriormente:

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

Una StakeableLockIn es una entrada en stake y encerrada. El StakeableLockIn sólo puede financiar StakeableLockOuts con la misma dirección hasta que su tiempo de encierro haya pasado.

### **Que Contiene una StakeableLockIn**

Una StakeableLockIn contiene un `TypeID`, `Locktime` y `TransferableIn`.

* **`TypeID`** es el ID para este tipo de salida. Es `0x00000015`.
* **`Locktime`** es un long que contiene el timestamp unix en que esta salida puede ser utilizada después. El timestamp unix es específico para el segundo.
* **`TransferableIn`** es un elemento de entrada transferible.

### **Especificación Gantt de una StakeableLockIn**

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

### **Especificación Proto de una StakeableLockIn**

```text
message StakeableLockIn {
    uint32 type_id = 1;                    // 04 bytes
    uint64 locktime = 2;                   // 08 bytes
    TransferableInput transferable_in = 3; // size(transferable_in)
}
```

### **Ejemplo de una StakeableLockIn**

Hagamos una StakeableLockIn con:

* **`TypeID`**: 21
* **`Locktime`**: 54321
* **`TransferableIn`**: “Example SECP256K1 Transfer Input as defined above”

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

Una StakeableLockOut es una salida que está bloqueada hasta el momento de su cierre, pero puede ser puesta en stake mientras tanto.

### **Que Contiene una StakeableLockOut**

Una StakeableLockOut contiene un `TypeID`, `Locktime` y `TransferableOut`.

* **`TypeID`** es el ID para este tipo de salida. Es `0x00000015`.
* **`Locktime`** es un long que contiene el timestamp unix en que esta salida puede ser utilizada después. El timestamp unix es específico para el segundo.
* **`transferableout`**: "Tome como ejemplo  Salida de Transferencia SECP256K1 como se ha definido previamente"

### **Gantt StakeableLockOut Specification**

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

### **Proto StakeableLockOut Specification**

```text
message StakeableLockOut {
    uint32 type_id = 1;                      // 04 bytes
    uint64 locktime = 2;                     // 08 bytes
    TransferableOutput transferable_out = 3; // size(transferable_out)
}
```

### **StakeableLockOut Example**

Let’s make a stakeablelockout with:

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

<!--stackedit_data:
eyJoaXN0b3J5IjpbMjkwMzIyMzUzLC00MTE5MDczNTEsLTIwOD
g4NzI1OTMsMTc5OTEyNTgwNCwtMTI4ODAwMTYzMCwtNjI5NjQ2
NjYwLC03MzUxNzc3NjcsLTEwNDYyNTk3NTksLTIwMzc1MjY5Nz
ksMTIwOTUwNjI3NCwtNjQzMjQxNTE4LDI2NTI1MDU5NiwtNTAz
NTYzODM4LC02NzY2MDc5NTUsLTEyMDE3ODg1OTcsLTM3OTAzMz
gxMiwtMzY3OTM5MDcwLC00ODIzMzY1MjNdfQ==
-->