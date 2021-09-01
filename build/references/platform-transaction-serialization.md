# Formato de transacción de la plataforma

Este archivo está destinado a ser la única fuente de verdad para cómo seriamos transacciones en la máquina virtual de la plataforma de Avalanche, aka la `Platform Chain`o`P-Chain` Este documento utiliza el formato [de serialización primitivo](serialization-primitives.md) para el embalaje y el [secp256k1](cryptographic-primitives.md#secp-256-k1-addresses) para la identificación de usuario criptográfico.

## Codec ID

Algunos datos se preparan con un códec ID \(unt16\) que denota cómo los datos deben ser deserializados. En este momento, el único ID de codec válido es 0 `0x00 0x00`\(\).

## Salida Transferible

Las salidas transferibles o "Transferable Outputs" envuelven una salida con el ID de un activo.

### Que Contiene una Salida Transferible

Una salida transferible contiene un `AssetID`y un .`Output`

* **`AssetID`**es una matriz de 32 bytes que define qué activo activa esta referencia de salida. Lo único válido `AssetID`es el AVAX`AssetID`
* **`Output`**es una salida, tal y como se define a continuación. Por ejemplo, puede ser una salida de transferencia SECP256K1.

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

## Entrada Transferible

Las entradas transferibles o "Transferable inputs" describen un UTXO específico con una entrada de transferencia proporcionada.

### Que Contiene una Entrada Transferible

Una entrada transferible contiene un `TxID`, `UTXOIndex``AssetID`y un .`Input`

* **`TxID`**es una matriz de 32 bytes que define qué transacción esta entrada está consumiendo una salida.
* **`UTXOIndex`**es una int que define qué utxo esta entrada está consumiendo la transacción especificada.
* **`AssetID`**es una matriz de 32 bytes que define qué activo hace estas referencias de entrada. Lo único válido `AssetID`es el AVAX`AssetID`
* **`Input`**es un objeto de entrada transferible.

### Especificación Gantt de una Entrada Transferible

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

### Especificación Proto de una Entrada Transferible

```text
message TransferableInput {
    bytes tx_id = 1;       // 32 bytes
    uint32 utxo_index = 2; // 04 bytes
    bytes asset_id = 3;    // 32 bytes
    Input input = 4;       // size(input)
}
```

### Ejemplo de una Entrada Transferible

Hagamos una entrada transferible:

* **`TxID`**:`0x0dfafbdf5c81f635c9257824ff21c8e3e6f7b632ac306e11446ee540d34711a15`
* **`UTXOIndex`**:`0`
* **`AssetID`**:`0x6870b7d66ac32540311379e5b5dbad28ec7eb8ddbfc8f4d67299ebb48475907a`
* **`Input`**:`"Example SECP256K1 Transfer Input from below"`

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

Las salidas tienen dos tipos posibles: `SECP256K1TransferOutput`, `SECP256K1OutputOwners`.

## Salida de Transferencia SECP256K1

Una salida de transferencia [secp256k1](cryptographic-primitives.md#secp-256-k1-addresses) permite enviar una cantidad de un activo a una colección de direcciones después de un tiempo unix especificado. El único activo válido es AVAX.

### **¿Contiene**

`Locktime``Threshold``Addresses`Una salida de transferencia secp256k1 contiene una `TypeID`, `Amount`y

* **`TypeID`**es el ID para este tipo de salida. Es `0x00000007`.
* **`Amount`**es un largo que especifica la cantidad del activo que esta salida posee. Debe ser positivo.
* **`Locktime`**es un largo que contiene la marca de tiempo de unix que se puede gastar esta salida después. El timestamp unix es específico para el segundo.
* **`Threshold`**es una int que nombra el número de firmas únicas necesarias para gastar la salida. Debe ser menor o igual a la longitud de **`Addresses`**. Si **`Addresses`**está vacío, debe ser 0.
* **`Addresses`**es una lista de direcciones únicas que corresponden a las claves privadas que pueden ser usadas para gastar esta salida. Las direcciones deben estar ordenadas lexicográficamente.

### **Especificación de salida de transferencia SECP256K1**

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

### **Especificación de salida de transferencia de Proto SECP256K1**

```text
message SECP256K1TransferOutput {
    uint32 type_id = 1;           // 04 bytes
    uint64 amount = 2;            // 08 bytes
    uint64 locktime = 3;          // 08 bytes
    uint32 threshold = 4;         // 04 bytes
    repeated bytes addresses = 5; // 04 bytes + 20 bytes * len(addresses)
}
```

### **Ejemplo de salida de transferencia SECP256K1**

Hagamos una salida de transferencia secp256k1 con:

* **`TypeID`**: 7
* **`Amount`**: 399900 
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

## Salida

Una salida de propietarios de salidas [secp256k1](cryptographic-primitives.md#secp-256-k1-addresses) recibirá las recompensas de participación cuando termine el período de bloqueo

### **Qué Salida de los propietarios de salidas SECP256K1**

`Locktime``Threshold``Addresses`Una salida de propietarios de salidas secp256k1 contiene una `TypeID`, y

* **`TypeID`**es el ID para este tipo de salida. Es `0x0000000b`.
* **`Locktime`**es un largo que contiene la marca de tiempo de unix que se puede gastar esta salida después. El timestamp unix es específico para el segundo.
* **`Threshold`**es una int que nombra el número de firmas únicas necesarias para gastar la salida. Debe ser menor o igual a la longitud de **`Addresses`**. Si **`Addresses`**está vacío, debe ser 0.
* **`Addresses`**es una lista de direcciones únicas que corresponden a las claves privadas que pueden ser usadas para gastar esta salida. Las direcciones deben estar ordenadas lexicográficamente.

### **Especificación de salida SECP256K1**

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

### **Especificación de salida Proto SECP256K1**

```text
message SECP256K1OutputOwnersOutput {
    uint32 type_id = 1;           // 04 bytes
    uint64 locktime = 2;          // 08 bytes
    uint32 threshold = 3;         // 04 bytes
    repeated bytes addresses = 4; // 04 bytes + 20 bytes * len(addresses)
}
```

### **Ejemplo de salida de salida SECP256K1**

Hagamos una salida de propietarios de salida secp256k1 con:

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

## Entrada

`SECP256K1TransferInput`Las entradas tienen un tipo posible:

## Entrada de Transferencia SECP256K1

Una entrada [de](cryptographic-primitives.md#secp-256-k1-addresses) transferencia secp256k1 permite gastar una salida de transferencia de secp256k1 no utilizada.

### **Qué entrada de transferencia SECP256K1**

Una entrada de transferencia secp256k1 contiene una `Amount`y .`AddressIndices`

* **`TypeID`**es el ID para este tipo de salida. Es `0x00000005`.
* **`Amount`**es un largo que especifica la cantidad que esta entrada debería consumir desde la UTXO. Debe ser positivo. Debe ser igual a la cantidad especificada en la UTXO.
* **`AddressIndices`**es una lista de ints únicas que definen las claves privadas se están usando para gastar la UTXO. Cada UTXO tiene un conjunto de direcciones que pueden utilizar la UTXO. Cada int representa el índice de esta matriz de direcciones que firmará esta transacción. La matriz debe ser ordenada de baja a alta.

### **Especificación de entrada de transferencia**

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

**Especificación de entrada de transferencia**

```text
message SECP256K1TransferInput {
    uint32 type_id = 1;                  // 04 bytes
    uint64 amount = 2;                   // 08 bytes
    repeated uint32 address_indices = 3; // 04 bytes + 4 bytes * len(address_indices)
}
```

### **Ejemplo de entrada de transferencia**

Hagamos una entrada de pago con:

* **`TypeID`**: 5
* **`Amount`**: 400 
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

## Transacciones no Firmadas

Las transacciones no firmadas o "Unsigned transactions" contienen el contenido completo de una transacción en la que sólo faltan las firmas. `AddValidatorTx``AddDelegatorTx``CreateSubnetTx``ImportTx``ExportTx`Las transacciones no firmadas tienen seis tipos posibles: , `AddSubnetValidatorTx`, y . Ellos `BaseTx`incorporaron, que contiene campos y operaciones comunes.

## BaseTx no firmado

### **¿Qué Contiene**

`TypeID``BlockchainID``Outputs``Inputs`Una base tx contiene una , , `NetworkID`, y `Memo`.

* **`TypeID`**es el ID para este tipo. Es `0x00000000`.
* **`NetworkID`**es un int que define a qué red se pretende emitir esta transacción. Este valor está pensado para soportar el enrutamiento de la transacción y no está diseñado para la prevención de ataques de repetición.
* **`BlockchainID`**es una matriz de 32 bytes que define a qué blockchain se emitió esta transacción. Se utiliza para la prevención de ataques de repetición de transacciones que podrían ser válidas en toda la red o en la blockchain.
* **`Outputs`**es una matriz de objetos de salida transferibles. Las salidas deben ser ordenadas lexicográficamente por su representación serializada. La cantidad total de los activos creados en estos productos debe ser inferior o igual a la cantidad total de cada activo consumido en los insumos menos la tasa de transacción.
* **`Inputs`**es una matriz de objetos de entrada transferibles. Las entradas deben ser clasificadas y únicas. Las entradas se clasifican primero lexicográficamente por sus **`TxID`**y luego por lo **`UTXOIndex`**de lo bajo a lo alto. Si hay entradas que tienen lo mismo **`TxID`**y , **`UTXOIndex`**entonces la transacción es inválida ya que esto daría lugar a un gasto doble.
* **`Memo`**El campo de Memo contiene bytes arbitrarios, de hasta 256 bytes.

### **Especificación Tx de base**

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

### **Especificación de Tx**

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

### **Ejemplo de base Tx**

Let’s make a base tx that uses the inputs and outputs from the previous If your local machine has MacOS or Linuxs:

* **`TypeID`**:`0`
* **`NetworkID`**:`12345`
* **`BlockchainID`**:`0x000000000000000000000000000000000000000000000000000000000000000`
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

## Añadir validador Tx

### **Lo que contiene**

`Stake``RewardsOwner``Shares`Un validador de añadir tx contiene una `BaseTx`, `Validator`, y El `TypeID`para este tipo es`0x0000000c`

* **`BaseTx`**
* **`Validator`**`NodeID``StartTime`Validador tiene una , `EndTime`y`Weight`
   * **`NodeID`**es 20 bytes que es el ID de nodo del validador.
   * **`StartTime`**es un largo que es el tiempo Unix cuando el validador empieza a validar.
   * **`EndTime`**es un largo que es el tiempo Unix cuando el validador deja de validar.
   * **`Weight`**es un largo que es la cantidad que el validador en juego
* **`Stake`**Stake`LockedOuts`
   * **`LockedOuts`**Una gama de salidas transferibles que están bloqueadas durante la duración del período de participación. Al final del período de participación, estas salidas se reembolsan a sus direcciones respectivas.
* **`RewardsOwner`**A`SECP256K1OutputOwners`
* **`Shares`**10.000 veces el porcentaje de recompensa tomada de los delegados

### **Gantt sin firma Añadir Validador Tx**

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

### **Especificación Tx**

```text
message AddValidatorTx {
    BaseTx base_tx = 1;                      // size(base_tx)
    Validator validator = 2;                 // 44 bytes
    Stake stake = 3;                         // size(LockedOuts)
    SECP256K1OutputOwners rewards_owner = 4; // size(rewards_owner)
    uint32 shares = 5;                       // 04 bytes
}
```

### **Validador de añadir**

Hagamos un validador de añadir tx sin firma que utiliza las entradas y salidas de los ejemplos anteriores:

* **`BaseTx`**:`"Example BaseTx as defined above with ID set to 0c"`
* **`Validator`**`NodeID``StartTime`Validador tiene una , `EndTime`y`Weight`
   * **`NodeID`**es 20 bytes que es el ID de nodo del validador.
   * **`StartTime`**es un largo que es el tiempo Unix cuando el validador empieza a validar.
   * **`EndTime`**es un largo que es el tiempo Unix cuando el validador deja de validar.
   * **`Weight`**es un largo que es la cantidad que el validador en juego
* **`Stake`**:`0x0000000139c33a499ce4c33a3b09cdd2cfa01ae70dbf2d18b2d7d168524440e55d55008800000007000001d1a94a2000000000000000000000000001000000013cb7d3842e8cee6a0ebd09f1fe884f6861e1b29c`
* **`RewardsOwner`**:`0x0000000b00000000000000000000000100000001da2bee01be82ecc00c34f361eda8eb30fb5a715c`
* **`Shares`**:`0x00000064`

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

## Sin firma Añadir Validador de Subred Tx

### **Lo que contiene**

`Validator``SubnetID``SubnetAuth`Un validador de subred tx de añadir contiene una `BaseTx`, y El `TypeID`para este tipo es`0x0000000d`

* **`BaseTx`**
* **`Validator`**`NodeID``StartTime`Validador tiene una , `EndTime`y`Weight`
   * **`NodeID`**es 20 bytes que es el ID de nodo del validador.
   * **`StartTime`**es un largo que es el tiempo Unix cuando el validador empieza a validar.
   * **`EndTime`**es un largo que es el tiempo Unix cuando el validador deja de validar.
   * **`Weight`**es un largo que es la cantidad que el validador en juego
* **`SubnetID`**un id de subred de 32 bytes
* **`SubnetAuth`**contiene `SigIndices`y tiene un tipo de id . `0x0000000a`es una lista de ints únicas que definen las direcciones que firman la firma de control para agregar un validador a `SigIndices`una subred. La matriz debe ser ordenada de baja a alta.

### **Gantt sin firmar Añadir Subred Validador Tx**

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

### **Especificación Tx**

```text
message AddSubnetValidatorTx {
    BaseTx base_tx = 1;         // size(base_tx)
    Validator validator = 2;    // size(validator)
    SubnetID subnet_id = 3;     // 32 bytes
    SubnetAuth subnet_auth = 4; // 04 bytes + len(sig_indices)
}
```

### **Validadores de Subred Tx Ejemplo**

Hagamos un validador de subred tx de subred que utiliza las entradas y salidas de los ejemplos anteriores:

* **`BaseTx`**:`"Example BaseTx as defined above with ID set to 0d"`
* **`NodeID`**:`0xe9094f73698002fd52c90819b457b9fbc866ab80`
* **`StarTime`**:`0x000000005f21f31d`
* **`EndTime`**:`0x000000005f497dc6`
* **`Weight`**:`0x000000000000d431`
* **`SubnetID`**:`0x58b1092871db85bc752742054e2e8be0adf8166ec1f0f0769f4779f14c71d7eb`
* **`SubnetAuth`**:
   * **`TypeID`**:`0x0000000a`
   * **`SigIndices`**:`0x00000000`

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

## Sin firma Añadir Delegado Tx

### **Lo que contiene el Delegado de Tx**

`Validator``Stake``RewardsOwner`Un delegado de añadir tx contiene una `BaseTx`, y El `TypeID`para este tipo es`0x0000000e`

* **`BaseTx`**
* **`Validator`**`NodeID``StartTime`Validador tiene una , `EndTime`y`Weight`
   * **`NodeID`**es 20 bytes que es el ID de nodo del delegado.
   * **`StartTime`**es un largo que es la época Unix cuando el delegado empieza a delegar.
   * **`EndTime`**es un largo que es el tiempo Unix cuando el delegado deja de delegar \(y se devuelve AVAX \).
   * **`Weight`**es un largo que es la cantidad que el delegado en juego
* **`Stake`**Stake`LockedOuts`
   * **`LockedOuts`**Una gama de salidas transferibles que están bloqueadas durante la duración del período de participación. Al final del período de participación, estas salidas se reembolsan a sus direcciones respectivas.
* **`RewardsOwner`**Una`SECP256K1OutputOwners`

### **Gantt sin firmar Añadir Especificación de Delegado Tx**

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

### **Especificación de Tx**

```text
message AddDelegatorTx {
    BaseTx base_tx = 1;                      // size(base_tx)
    Validator validator = 2;                 // 44 bytes
    Stake stake = 3;                         // size(LockedOuts)
    SECP256K1OutputOwners rewards_owner = 4; // size(rewards_owner)
}
```

### **Añadir Delegado Tx Ejemplo**

Hagamos un delegado de añadir tx no firmado que utiliza las entradas y salidas de los ejemplos anteriores:

* **`BaseTx`**:`"Example BaseTx as defined above with ID set to 0e"`
* **`NodeID`**:`0xe9094f73698002fd52c90819b457b9fbc866ab80`
* **`StarTime`**:`0x000000005f21f31d`
* **`EndTime`**:`0x000000005f497dc6`
* **`Weight`**:`0x000000000000d431`
* **`Stake`**:`0x0000000139c33a499ce4c33a3b09cdd2cfa01ae70dbf2d18b2d7d168524440e55d55008800000007000001d1a94a2000000000000000000000000001000000013cb7d3842e8cee6a0ebd09f1fe884f6861e1b29c`
* **`RewardsOwner`**:`0x0000000b00000000000000000000000100000001da2bee01be82ecc00c34f361eda8eb30fb5a715c`

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

## Crear Subnet

### **¿Contiene**

`BaseTx``RewardsOwner`Un tx de creación de subred contiene un , y El `TypeID`para este tipo es`0x00000010`

* **`BaseTx`**
* **`RewardsOwner`**A`SECP256K1OutputOwners`

### **Gantt sin firmar Crea la especificación de Subred Tx**

```text
+-----------------+-----------------------|---------------------------------+
| base_tx         : BaseTx                |             size(base_tx) bytes |
+-----------------+-----------------------+--------------------------------+
| rewards_owner   : SECP256K1OutputOwners |       size(rewards_owner) bytes |
+-----------------+-----------------------+---------------------------------+
                                | size(rewards_owner) + size(base_tx) bytes |
                                +-------------------------------------------+
```

### **Especificación de Tx**

```text
message CreateSubnetTx {
    BaseTx base_tx = 1;                      // size(base_tx)
    SECP256K1OutputOwners rewards_owner = 2; // size(rewards_owner)
}
```

### **Ejemplo de Tx de Subnet**

Hagamos una tx de creación de subred que usa las entradas de los ejemplos anteriores:

* **`BaseTx`**: "Ejemplo de baseTx definido anteriormente pero con TypeID configurado en 16"
* **`RewardsOwner`**:
   * **`TypeId`**: 11
   * **`Locktime`**: 0
   * **`Threshold`**: 1
   * **`Addresses`**: [ 0xda2bee01be82ecc0c34f361eda8eb30fb5a715c ]

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

## Importe Tx no firmado

### **¿Contiene**

`SourceChain`Una importación tx de importación no firmada contiene una `BaseTx`, y `Ins`. El `TypeID`para este tipo es`0x00000011`

* **`BaseTx`**
* **`SourceChain`**es un ID de código fuente de 32 bytes
* **`Ins`**es una matriz de longitud variable de entradas transferibles.

### **Especificación de Tx de importación de Gantt**

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

### **Especificación de importación Tx no firmada**

```text
message ImportTx {
    BaseTx base_tx = 1;          // size(base_tx)
    bytes source_chain = 2;      // 32 bytes
    repeated TransferIn ins = 3; // 4 bytes + size(ins)
}
```

### **Ejemplo de importación Tx de una importación sin firmada no firmada sin firmada sin firma no de ejemplo de Tx**

Hagamos un ejemplo de una transacción de importación no firmada que utilice las entradas y salidas de los ejemplos anteriores:

* **`BaseTx`**: "Ejemplo de baseTx definido arriba con TypeID configurado en 17"
* **`SourceChain`**:
* **`Ins`**: "Example SECP256K1 Transfer

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

## Export Tx no firmado

### **¿Contiene**

`DestinationChain`Una tx de exportación no firmada contiene una `BaseTx`, y `Outs`. El `TypeID`para este tipo es`0x00000012`

* **`DestinationChain`**es el ID de 32 bytes de la cadena donde los fondos se exportan
* **`Outs`**es una matriz de longitud variable de salidas transferibles.

### **Especificación de Tx de exportación**

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

### **Especificación de Tx de exportación no firmada**

```text
message ExportTx {
    BaseTx base_tx = 1;            // size(base_tx)
    bytes destination_chain = 2;   // 32 bytes
    repeated TransferOut outs = 3; // 4 bytes + size(outs)
}
```

### **Ejemplo de exportación Tx no firmado no firmado**

Hagamos un ejemplo de una Transacción de Exportación No Firmada que utilice las entradas y salidas de los ejemplos anteriores:

* `BaseTx`: "Ejemplo de baseTx tal y como se define arriba" con `TypeID`conjunto en 18
* `DestinationChain`:`0x0000000000000000000000000000000000000000000000000000000000000000`
* `Outs`: "Example SECP256K1 Transfer Tal como se define arriba"

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

`SECP256K1Credential`Las credenciales tienen un tipo posible: Cada credencial está emparejada con una entrada u operación. El orden de las credenciales coincide con el orden de las entradas u operaciones.

## SECP256K1 Credential

Una credencial de [secp256k1](cryptographic-primitives.md#secp-256-k1-addresses) contiene una lista de firmas recuperables de 65 bytes

### **Lo que contiene la Credencial SECP256K1**

* **`TypeID`**es el ID para este tipo. Es `0x00000009`.
* **`Signatures`**es una matriz de firmas recuperables de 65 bytes. El orden de las firmas debe coincidir con los índices de firmas de la entrada.

### **Especificación de credencial**

```text
+------------------------------+---------------------------------+
| type_id         : int        |                         4 bytes |
+-----------------+------------+---------------------------------+
| signatures      : [][65]byte |  4 + 65 * len(signatures) bytes |
+-----------------+------------+---------------------------------+
                               |  8 + 65 * len(signatures) bytes |
                               +---------------------------------+
```

### **Especificación de credencial**

```text
message SECP256K1Credential {
    uint32 TypeID = 1;             // 4 bytes
    repeated bytes signatures = 2; // 4 bytes + 65 bytes * len(signatures)
}
```

### **Ejemplo de Credencial SECP256K1**

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

## Transacción Firmada

Una transacción firmada o "signed transaction" es una transacción no firmada con la adición de una serie de credenciales.

### Que Contiene una Transacción Firmada

`UnsignedTx`Una transacción firmada contiene una `CodecID`, y `Credentials`.

* **`CodecID`**El único id de codec válido es`00 00`
* **`UnsignedTx`**es una transacción sin firmar, como se describe arriba.
* **`Credentials`**es una matriz de credenciales. Cada credencial será emparejada con la entrada en el mismo índice en esta credencial.

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

Hagamos una transacción firmada que usa la transacción y la credencial sin firma de los ejemplos anteriores.

* **`CodecID`**:`0`
* **`UnsignedTx`**:`0x0000000100000003ffffffffeeeeeeeeddddddddccccccccbbbbbbbbaaaaaaaa999999998888888800000001000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f000000070000000000003039000000000000d431000000010000000251025c61fbcfc078f69334f834be6dd26d55a955c3344128e060128ede3523a24a461c8943ab085900000001f1e1d1c1b1a191817161514131211101f0e0d0c0b0a09080706050403020100000000005000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f0000000500000000075bcd150000000200000003000000070000000400010203`
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

`TxID``UTXOIndex``Output`Una UTXO contiene una `CodecID`, y

* **`CodecID`**El único id de codec válido es`00 00`
* **`TxID`**es un ID de transacción de 32 bytes Los ID de transacción se calculan tomando sha256 de los bytes de la transacción firmada.
* **`UTXOIndex`**es un int que especifica qué salida en la transacción especificada por la **`TxID`**cual se creó este utxo.
* **`AssetID`**es una matriz de 32 bytes que define qué activo hace estas referencias de utxo.
* **`Output`**es el objeto de salida que creó este utxo. La serialización de las Salidas fue definida anteriormente.

#### Especificación de Gantt UTXO<a id="gantt-utxo-specification"></a>

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

* **`CodecID`**:`0`
* **`TxID`**:`0xf966750f438867c3c9828ddcdbe660e21ccdbb36a9276958f011ba472f75d4e7`
* **`UTXOIndex`**: 0x00 
* **`AssetID`**:`0x000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f`
* **`Output`**:`"Example SECP256K1 Transferable Output as defined above"`

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

Una empresa de StakeableLockIn Lockin es una entrada de entrada de stocked y bloqueada. La StakeableLockIn Lockin solo puede financiar StakeableLockOuts con la misma dirección hasta que su tiempo de bloqueo haya pasado.

### **¿Qué Contiene StakeableLockin**

`TypeID`Una entidad de interés Lockin contiene un , `Locktime`y`TransferableIn`

* **`TypeID`**es el ID para este tipo de salida. Es `0x00000015`.
* **`Locktime`**es un largo que contiene la marca de tiempo de unix antes de la cual la entrada puede ser consumida solo para jugar. El timestamp unix es específico para el segundo.
* **`TransferableIn`**es un objeto de entrada transferible.

### **Especificación de Gantt StakeableLockIn**

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

### **Especificación de Proto**

```text
message StakeableLockIn {
    uint32 type_id = 1;                    // 04 bytes
    uint64 locktime = 2;                   // 08 bytes
    TransferableInput transferable_in = 3; // size(transferable_in)
}
```

### **StakeableLockIn Ejemplo**

Hagamos un StakeableLockIn con:

* **`TypeID`**: 21
* **`Locktime`**: 54321
* **`TransferableIn`**: "Example SECP256K1 Transfer

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

Un StakeableLockOut LockOut es una salida que está bloqueada hasta su tiempo de bloqueo, pero puede ser staked mientras tanto.

### **Qué contiene**

`TypeID`Un stakeableLockOut contiene un , `Locktime`y`TransferableOut`

* **`TypeID`**es el ID para este tipo de salida. Es `0x00000016`.
* **`Locktime`**es un largo que contiene la marca de tiempo de unix antes de la cual la salida puede ser consumida solo para jugar. El timestamp unix es específico para el segundo.
* **`transferableout`**: "Example SECP256K1 Transfer Tal como se define arriba"

### **Especificación de Gantt StakeableLockOut**

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

### **Especificación de Proto StakeableLockOut**

```text
message StakeableLockOut {
    uint32 type_id = 1;                      // 04 bytes
    uint64 locktime = 2;                     // 08 bytes
    TransferableOutput transferable_out = 3; // size(transferable_out)
}
```

### **Ejemplo de StakeableLockout**

Hagamos una participación con:

* **`TypeID`**: 22
* **`Locktime`**: 54321
* **`TransferableOutput`**:`"Example SECP256K1 Transfer Output from above"`

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

