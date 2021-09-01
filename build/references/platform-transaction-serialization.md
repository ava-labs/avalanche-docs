# Format de transaction de la plateforme

Ce fichier est destiné à être une seule source de vérité pour la manière dont nous we les transactions sur la machine virtuelle de la plateforme d'Avalanche, alias the `Platform Chain`or .`P-Chain` Ce document utilise le format de [sérialisation primitive](serialization-primitives.md) pour l'emballage et la [secp256k1](cryptographic-primitives.md#secp-256-k1-addresses) pour l'identification des utilisateurs cryptographiques.

## ID de Codec

Certaines données sont préparées avec un ID de codec \(unt16\) qui indique comment les données doivent être deserialized. Pour l'instant, le seul codec valide est 0 `0x00 0x00`\(\).

## Sortie transférable

Les sorties transférables enveloppent une sortie avec un identifiant d'actifs.

### Que contient la sortie transférable

Une sortie transférable contient une `AssetID`et un .`Output`

* **`AssetID`**est un tableau de 32 octes qui définit l'actif de ce fichier de référence. La seule validité `AssetID`est the .`AssetID`
* **`Output`**est une sortie, comme défini ci-dessous. Par exemple, il peut s'agir d'une sortie de transfert SECP256K1.

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

## Entrée transférable

Les entrées transférables décrivent un UTXO spécifique avec une entrée de transfert fournie.

### Qu'est ce que contient l'entrée transférable

Une entrée transférable contient un `TxID`, `UTXOIndex``AssetID`et un .`Input`

* **`TxID`**est un tableau de 32 octes qui définit la transaction que cette entrée prend en charge.
* **`UTXOIndex`**est une lettre qui définit la consommation de is que cette entrée prend en charge.
* **`AssetID`**est un tableau de 32 octes qui définit l'actif de cette référence en entrée. La seule validité `AssetID`est the .`AssetID`
* **`Input`**est un objet d'entrée transférable.

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

## Extrants

Les sorties ont deux types possibles : `SECP256K1TransferOutput`, `SECP256K1OutputOwners`.

## Sortie de transfert SECP256K1

Une sortie de transfert [secp256k1](cryptographic-primitives.md#secp-256-k1-addresses) permet d'envoyer une quantité d'actifs à une collection d'adresses après un seul moment précis. Le seul actif valide est AVAX.

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
    uint32 type_id = 1;           // 04 bytes
    uint64 amount = 2;            // 08 bytes
    uint64 locktime = 3;          // 08 bytes
    uint32 threshold = 4;         // 04 bytes
    repeated bytes addresses = 5; // 04 bytes + 20 bytes * len(addresses)
}
```

### **Exemple de sortie de transfert SECP256K1**

Fait une sortie de transfert secp256k1 avec :

* **`TypeID`**: 7
* **`Amount`**: 3999000
* **`Locktime`**:
* **`Threshold`**:
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

## Sortie des propriétaires de sortie SECP256K1

Une sortie de sortie [secp256k1](cryptographic-primitives.md#secp-256-k1-addresses) va réciter les récompenses de jalonnement lorsque la période de verrouillage se termine.

### **Que contient la sortie de sortie SECP256K1**

`Threshold`Une sortie de sortie secp256k1 contient `TypeID`, `Locktime`, et `Addresses`.

* **`TypeID`**est l'ID pour ce type de sortie. C'est `0x0000000b`.
* **`Locktime`**est une longue qui contient le stamp unix que cette sortie peut être dépensée après. Le timestamp unix est spécifique à la seconde.
* **`Threshold`**est une lettre d'information qui indique le nombre de signatures uniques requises pour dépenser la sortie. Doit être inférieur ou égal à la longueur de **`Addresses`**. Si **`Addresses`**est vide, doit être 0.
* **`Addresses`**est une liste d'adresses uniques qui correspondent aux clés privées qui peuvent être utilisées pour dépenser cette sortie. Les adresses doivent être triées lexicographiquement.

### **Spécification de sortie de sortie de Gantt SECP256K1**

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

### **Proto SECP256K1**

```text
message SECP256K1OutputOwnersOutput {
    uint32 type_id = 1;           // 04 bytes
    uint64 locktime = 2;          // 08 bytes
    uint32 threshold = 3;         // 04 bytes
    repeated bytes addresses = 4; // 04 bytes + 20 bytes * len(addresses)
}
```

### **Exemple de sortie de sortie**

Fait une sortie de sortie secp256k1 avec :

* **`TypeID`**: 11
* **`Locktime`**:
* **`Threshold`**:
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

## Entrées

Les entrées ont un type possible : `SECP256K1TransferInput`.

## SECP256K1

Une entrée de transfert [secp256k1](cryptographic-primitives.md#secp-256-k1-addresses) permet de dépenser une sortie de transfert secp256k1.

### **Qu'est ce que contient l'entrée de transfert SECP256K\)**

Une entrée de transfert secp256k1 contient `Amount`et .`AddressIndices`

* **`TypeID`**est l'ID pour ce type de sortie. C'est `0x00000005`.
* **`Amount`**est un long qui spécifie la quantité que cette entrée doit consommer de that Doit être positif. Doit être égal à la quantité spécifiée dans be
* **`AddressIndices`**est une liste de notes uniques qui définissent les clés privées sont utilisées pour dépenser of Chaque UTXO a un tableau d'adresses qui peuvent dépenser of Chaque lettre représente l'index de ce tableau d'adresses qui signera cette transaction. Le tableau doit être trié de bas à haut.

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

**Spécifications d'entrée de transfert de prototype SECP256K1**

```text
message SECP256K1TransferInput {
    uint32 type_id = 1;                  // 04 bytes
    uint64 amount = 2;                   // 08 bytes
    repeated uint32 address_indices = 3; // 04 bytes + 4 bytes * len(address_indices)
}
```

### **Exemple d'entrée de transfert SECP256K1**

Fait une entrée de paiement avec :

* **`TypeID`**:
* **`Amount`**: 4000
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

## Transactions non signées

Les transactions non signées contiennent le contenu complet d'une transaction avec seules les signatures manquantes. `AddValidatorTx``AddDelegatorTx``CreateSubnetTx``ImportTx`Les transactions non signées ont six types possibles , `AddSubnetValidatorTx`, et `ExportTx`. Ils sont intégrés `BaseTx`, qui contient des champs et des opérations communes.

## BaseTx

### **Que contient la base Tx**

`TypeID``BlockchainID``Outputs``Inputs`Une base de tx contient , `NetworkID`, et `Memo`.

* **`TypeID`**est l'ID de ce type. C'est `0x00000000`.
* **`NetworkID`**est une lettre qui définit le réseau auquel cette transaction est destinée à être délivrée. Cette valeur est destinée à soutenir le routage des transactions et n'est pas conçue pour la prévention des attaques de replay.
* **`BlockchainID`**est un tableau de 32 octes qui définit la blockchain que cette transaction a été délivrée. Ceci est utilisé pour la prévention des attaques de replay pour les transactions qui pourraient être valides sur le réseau ou la blockchain.
* **`Outputs`**est un tableau d'objets de sortie transférables. Les extrants doivent être triés lexicographiquement par leur représentation sérialisée. La quantité totale des actifs créés dans ces produits doit être inférieure ou égale à la quantité totale de chaque actif consommé dans les intrants moins les frais de transaction.
* **`Inputs`**est un tableau d'objets d'entrée transférables. Les entrées doivent être triées et uniques. Les entrées sont triées d'abord lexicographiquement par leurs **`TxID`**et ensuite par les **`UTXOIndex`**de bas à haut. S'il y a des entrées qui ont la même et , **`UTXOIndex`**la transaction est **`TxID`**invalide , car cela entraînerait une double dépense.
* **`Memo`**Le champ Memo contient des octets, jusqu'à 256 octets.

### **Spécifications de base de Gantt**

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

### **Spécifications de prototype**

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

### **Exemple de base Tx**

Faisons une base de tx qui utilise les entrées et les sorties des exemples précédents :

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

## Ajouter un validateur non signé Tx

### **Ce que contient Tx d'ajouter validateur et de validateur non signé.**

`Stake``RewardsOwner`Un validateur d'ajout non signé contient `BaseTx`, `Validator`, et `Shares`. `TypeID`Le pour ce type est .`0x0000000c`

* **`BaseTx`**
* **`Validator`**`NodeID``StartTime`Validateur a , , `EndTime`et`Weight`
   * **`NodeID`**est 20 octets qui est l'ID de nœud du validateur.
   * **`StartTime`**est un long qui est le temps Unix lorsque le validateur commence à valider.
   * **`EndTime`**est un long qui est l'heure d'Unix lorsque le validateur cesse de valider.
   * **`Weight`**est un long qui est le montant que le validateur stake
* **`Stake`**Take a`LockedOuts`
   * **`LockedOuts`**Un tableau d'extrants transférables qui sont verrouillés pour la durée de la période de jalonnement. À la fin de la période de jalonnement, ces produits sont remboursés à leurs adresses respectives.
* **`RewardsOwner`**A`SECP256K1OutputOwners`
* **`Shares`**10 000 fois pourcentage de récompense pris auprès des délégués

### **Gantt Unsigned Ajouter un validateur Tx**

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

### **Proto Ajouter un validateur Tx**

```text
message AddValidatorTx {
    BaseTx base_tx = 1;                      // size(base_tx)
    Validator validator = 2;                 // 44 bytes
    Stake stake = 3;                         // size(LockedOuts)
    SECP256K1OutputOwners rewards_owner = 4; // size(rewards_owner)
    uint32 shares = 5;                       // 04 bytes
}
```

### **Exemple de validateur Tx**

Fait un validateur d'ajout non signé tx qui utilise les entrées et les sorties des exemples précédents :

* **`BaseTx`**:`"Example BaseTx as defined above with ID set to 0c"`
* **`Validator`**`NodeID``StartTime`Validateur a , , `EndTime`et`Weight`
   * **`NodeID`**est 20 octets qui est l'ID de nœud du validateur.
   * **`StartTime`**est un long qui est le temps Unix lorsque le validateur commence à valider.
   * **`EndTime`**est un long qui est l'heure d'Unix lorsque le validateur cesse de valider.
   * **`Weight`**est un long qui est le montant que le validateur stake
* **`Stake`**:`0x0000000139c33a499ce4c33a3b09cdd2cfa01ae70dbf2d18b2d7d168524440e55d55008800000007000001d1a94a2000000000000000000000000001000000013cb7d3842e8cee6a0ebd09f1fe884f6861e1b29c`
* **`RewardsOwner`**:`0x0000000b00000000000000000000000100000001da2bee01be82ecc00c34f361eda8eb30fb5a715c`
* **`Shares`**:`0x00000064`

   0x00b00b000001001da2bee01be82ecc0c0c34f361eda8eb30fb5a715c

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

## Ajouter un validateur de sous-réseau Tx

### **Ce que contient le validateur de sous-réseau Ajouter et de sous-réseau Tx**

`Validator``SubnetID`Un validateur de sous-réseau d'ajout non signé contient un , `BaseTx`, et `SubnetAuth`. `TypeID`Le pour ce type est .`0x0000000d`

* **`BaseTx`**
* **`Validator`**`NodeID``StartTime`Validateur a , , `EndTime`et`Weight`
   * **`NodeID`**est 20 octets qui est l'ID de nœud du validateur.
   * **`StartTime`**est un long qui est le temps Unix lorsque le validateur commence à valider.
   * **`EndTime`**est un long qui est l'heure d'Unix lorsque le validateur cesse de valider.
   * **`Weight`**est un long qui est le montant que le validateur stake
* **`SubnetID`**a 32 octies
* **`SubnetAuth`**contient `SigIndices`et a un type d'identifiant . `0x0000000a`est `SigIndices`une liste d'indices uniques qui définissent les adresses de signature de la commande pour ajouter un validateur à un sous-réseau. Le tableau doit être trié de bas à haut.

### **Gantt Unsigned Ajouter un validateur de sous-réseau Tx**

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

### **Proto Ajouter un validateur de sous-réseau Tx**

```text
message AddSubnetValidatorTx {
    BaseTx base_tx = 1;         // size(base_tx)
    Validator validator = 2;    // size(validator)
    SubnetID subnet_id = 3;     // 32 bytes
    SubnetAuth subnet_auth = 4; // 04 bytes + len(sig_indices)
}
```

### **Exemple de validateur de sous-réseau Tx**

Fait un validateur de sous-réseau tx qui utilise les entrées et les sorties des exemples précédents :

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

## Ajouter un délégué Tx

### **Ce que contient le délégué Ajouter non signé Tx**

`Validator``Stake`Un délégué d'ajout non signé de Tx contient un , `BaseTx`, et `RewardsOwner`. `TypeID`Le pour ce type est .`0x0000000e`

* **`BaseTx`**
* **`Validator`**`NodeID``StartTime`Validateur a , , `EndTime`et`Weight`
   * **`NodeID`**est 20 octets qui est l'ID de nœud du délégué.
   * **`StartTime`**est un long qui est le temps d'Unix lorsque le délégué commence à déléguer.
   * **`EndTime`**est un long qui est le temps d'Unix lorsque le délégué cesse de déléguer \(et que is staked est renvoyé\).
   * **`Weight`**est un long qui est le montant que le délégué est en jeu.
* **`Stake`**Take a`LockedOuts`
   * **`LockedOuts`**Un tableau d'extrants transférables qui sont verrouillés pour la durée de la période de jalonnement. À la fin de la période de jalonnement, ces produits sont remboursés à leurs adresses respectives.
* **`RewardsOwner`**An`SECP256K1OutputOwners`

### **Gantt Unsigned Ajouter délégué Tx Specification**

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

### **Proto Ajouter le délégué Tx**

```text
message AddDelegatorTx {
    BaseTx base_tx = 1;                      // size(base_tx)
    Validator validator = 2;                 // 44 bytes
    Stake stake = 3;                         // size(LockedOuts)
    SECP256K1OutputOwners rewards_owner = 4; // size(rewards_owner)
}
```

### **Exemple de Tx**

Fait un tx d'ajout non signé qui utilise les entrées et les sorties des exemples précédents :

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

## Créer un sous-réseau Tx

### **Que contient Tx de sous-réseau de Créer sans signature**

`BaseTx`Une tx de sous-réseau de création non signée contient un , et `RewardsOwner`. `TypeID`Le pour ce type est .`0x00000010`

* **`BaseTx`**
* **`RewardsOwner`**A`SECP256K1OutputOwners`

### **Gantt Unsigned Créer des sous-réseaux Tx**

```text
+-----------------+-----------------------|---------------------------------+
| base_tx         : BaseTx                |             size(base_tx) bytes |
+-----------------+-----------------------+--------------------------------+
| rewards_owner   : SECP256K1OutputOwners |       size(rewards_owner) bytes |
+-----------------+-----------------------+---------------------------------+
                                | size(rewards_owner) + size(base_tx) bytes |
                                +-------------------------------------------+
```

### **Prototype de spécifications de Tx de sous-réseau**

```text
message CreateSubnetTx {
    BaseTx base_tx = 1;                      // size(base_tx)
    SECP256K1OutputOwners rewards_owner = 2; // size(rewards_owner)
}
```

### **Exemple de Tx de sous-réseau de Créer non signé**

Fait un sous-réseau tx qui utilise les entrées des exemples précédents pour créer un sous-réseau non signé :

* **`BaseTx`**: "Exemple de baseTx tel que défini ci-dessus, mais avec TypeID réglé sur 16"
* **`RewardsOwner`**:
   * **`TypeId`**: 11
   * **`Locktime`**:
   * **`Threshold`**:
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

## Import non signé Tx

### **Que contient Tx d'importation non signée**

`SourceChain`Une importation tx non signée contient un `BaseTx`, et `Ins`. `TypeID`Le pour ce type est .`0x00000011`

* **`BaseTx`**
* **`SourceChain`**est un identifiant de blockchain de source de 32 octets.
* **`Ins`**est un tableau de longueur variable d'entrées transférables.

### **Spécification de Tx d'importation non signée Gantt**

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

### **Spécifications Tx d'importation non signées de prototype**

```text
message ImportTx {
    BaseTx base_tx = 1;          // size(base_tx)
    bytes source_chain = 2;      // 32 bytes
    repeated TransferIn ins = 3; // 4 bytes + size(ins)
}
```

### **Exemple de Tx d'importation non signé**

Fait un tx d'importation non signé qui utilise les entrées des exemples précédents :

* **`BaseTx`**: "Exemple de baseTx tel que défini ci-dessus avec TypeID réglé sur 17"
* **`SourceChain`**:
* **`Ins`**: "Exemple d'entrée de transfert SECP256K1 comme défini ci-dessus"

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

## Exportation non signée

### **Que contient Tx d'exportation non signée.**

`DestinationChain`Une tx d'exportation non signée contient un `BaseTx`, , et `Outs`. `TypeID`Le pour ce type est .`0x00000012`

* **`DestinationChain`**est l'ID de 32 octets de la chaîne dans laquelle les fonds sont exportés.
* **`Outs`**est un tableau de longueur variable de sorties transférables.

### **Spécification Tx d'exportation non signée de Gantt**

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

### **Spécifications Tx d'exportation non signées de prototype**

```text
message ExportTx {
    BaseTx base_tx = 1;            // size(base_tx)
    bytes destination_chain = 2;   // 32 bytes
    repeated TransferOut outs = 3; // 4 bytes + size(outs)
}
```

### **Exemple de Tx d'exportation non signé**

Fait un tx d'exportation non signé qui utilise les sorties des exemples précédents :

* `BaseTx`: "Exemple de baseTx tel que défini ci-dessus" avec `TypeID`réglé à 18
* `DestinationChain`:`0x0000000000000000000000000000000000000000000000000000000000000000`
* `Outs`: "Exemple de sortie de transfert SECP256K1 comme défini ci-dessus"

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

## Crédits

Les lettres de créance ont un type possible : `SECP256K1Credential`. Chaque créancier est associé à une entrée ou une opération. L'ordre des titres d'identification correspond à l'ordre des entrées ou des opérations.

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
    uint32 TypeID = 1;             // 4 bytes
    repeated bytes signatures = 2; // 4 bytes + 65 bytes * len(signatures)
}
```

### **SECP256K1**

Fait une entrée de paiement avec :

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

## Transaction signée

Une transaction signée est une transaction non signée avec l'ajout d'un tableau de pièces d'identité.

### Que contient la transaction signée

`UnsignedTx`Une transaction signée contient une `CodecID`, et `Credentials`.

* **`CodecID`**Le seul code de codec valide actuel est .`00 00`
* **`UnsignedTx`**est une transaction non signée, comme décrit ci-dessus.
* **`Credentials`**est un tableau de lettres d'identité. Chaque titre de créance sera associé à l'entrée dans le même index de ce titre.

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
    uint32 codec_id = 1;                 // 2 bytes
    UnsignedTx unsigned_tx = 2;          // size(unsigned_tx)
    repeated Credential credentials = 3; // 4 bytes + size(credentials)
}
```

### Exemple de transaction signé

Fait une transaction signée qui utilise la transaction non signée et les justificatifs d'identification des exemples précédents.

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

Un UTXO est une représentation autonome d'une sortie de transaction.

### Que contient UTXO

`TxID``UTXOIndex`Un UTXO contient un , `CodecID`, et `Output`.

* **`CodecID`**Le seul code de codec valide actuel est .`00 00`
* **`TxID`**est un identifiant de transaction de 32 octets. Les ID de transaction sont calculés en prenant sha256 des octets de la transaction signée.
* **`UTXOIndex`**est une int qui spécifie la sortie dans la transaction spécifiée par **`TxID`**que cet utxo a été créé.
* **`AssetID`**est un tableau de 32 octes qui définit l'actif de ce fichier utxo.
* **`Output`**est l'objet de sortie qui a créé cet utxo. La sérialisation des produits a été définie ci-dessus.

#### Spécification UTXO<a id="gantt-utxo-specification"></a>

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
    uint32 codec_id = 1;     // 02 bytes
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
* **`UTXOIndex`**: 0x000
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

Un Lockin est une entrée jalonnée et verrouillée. La LockIn StakeableLockIn uniquement financer la même adresse que celle de StakeableLockOuts jusqu'à ce que son temps de verrouillage ait passé.

### **Que contient StakeableLockin**

`TypeID`Un Lockin en question contient un , `Locktime`et .`TransferableIn`

* **`TypeID`**est l'ID pour ce type de sortie. C'est `0x00000015`.
* **`Locktime`**est une longue qui contient le stamp unix avant que l'entrée ne peut être consommée qu'à en jeu. Le timestamp unix est spécifique à la seconde.
* **`TransferableIn`**est un objet d'entrée transférable.

### **Spécification de Gantt**

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

### **Spécifications de Lockin de prototype**

```text
message StakeableLockIn {
    uint32 type_id = 1;                    // 04 bytes
    uint64 locktime = 2;                   // 08 bytes
    TransferableInput transferable_in = 3; // size(transferable_in)
}
```

### **Exemple de Lockin**

Faisons un LockIn StakeableLockIn avec :

* **`TypeID`**: 21
* **`Locktime`**: 54321
* **`TransferableIn`**: "Exemple d'entrée de transfert SECP256K1 comme défini ci-dessus"

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

Un LockOut est une sortie qui est verrouillé jusqu'à son verrouillage, mais qui peut être staké en attendant.

### **Qu'est ce que contient StakeableLockOut**

`TypeID`Un LockOut en est un `Locktime`et .`TransferableOut`

* **`TypeID`**est l'ID pour ce type de sortie. C'est `0x00000016`.
* **`Locktime`**est une longue qui contient le stamp unix avant que la sortie ne puisse être consommée qu'à en jeu. Le timestamp unix est spécifique à la seconde.
* **`transferableout`**: "Exemple de sortie de transfert SECP256K1 comme défini ci-dessus"

### **Spécification de LockOut Gantt**

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

### **Spécifications de LockOut de Proto**

```text
message StakeableLockOut {
    uint32 type_id = 1;                      // 04 bytes
    uint64 locktime = 2;                     // 08 bytes
    TransferableOutput transferable_out = 3; // size(transferable_out)
}
```

### **Exemple de Lockout**

Fait un stakeablelockout avec :

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

