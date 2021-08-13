# Format de la transaction de la plate-forme

Ce fichier est censé être la seule source de vérité pour la façon dont nous we les transactions dans la machine virtuelle de la plate-forme Avalanche, aka la `chaîne` de la plate-forme ou `P-Chain`. Ce document utilise le format [de sérialisation primitive](serialization-primitives.md) pour l'emballage et [secp256k1](cryptographic-primitives.md#secp-256-k1-addresses) pour l'identification de l'utilisateur cryptographique.

## ID du code

Certaines données sont préparées avec un ID de codec \(unt16\) qui indique comment les données devraient être deserialized. En ce moment, le seul ID de codec valide est 0 \(`0x00 0x00`\).

## Sortie transférable

Les sorties transférables enveloppent une sortie avec un identifiant d'actif.

### Ce que la sortie transférable contient

Une sortie transférable contient un `AssetID` et une `sortie`.

* **`AssetID`** est un tableau 32-octets qui définit quel atout cette sortie références. Le seul `AssetID``` valide est the
* **`La sortie`** est une sortie, telle que définie ci-dessous. Par exemple, il peut s'agir d'une sortie de transfert SECP256K1.

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

* `AssetID: 0x6870b7d66ac32540311379e5b5dbad28ec7eb8ddbfc8f4d67299ebb48475907a`
* `Sortie : "Exemple SECP256K1 sortie de transfert de ci-dessous"`

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

### Ce que l'entrée transférable contient

Une entrée transférable contient un `TxID`, `UTXOIndex` `AssetID` et une `entrée`.

* **`TxID`** est un tableau 32-octets qui définit quelle transaction cette entrée consomme une sortie de.
* **`UTXOIndex`** est une int qui définit lequel utxo cette entrée consomme la transaction spécifiée.
* **`AssetID`** est un tableau 32-octets qui définit quel atout cette référence d'entrée. Le seul `AssetID``` valide est the
* **`L'entrée`** est un objet d'entrée transférable.

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

* **`TxID`**: `0x0dfafbdf5c81f635c9257824ff21c8e3e6f7b632ac306e11446e540d34711a15`
* **`UTXOIndex`**: `0`
* **`AssetID`**: `0x6870b7d66ac32540311379e5b5dbad28ec7eb8ddbfc8f4d67299ebb48475907a`
* **`Entrée`**`: "Exemple SECP256K1 Entrée de transfert de ci-dessous"`

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

Les sorties ont deux types possibles: `SECP256K1TransferOutput`, `SECP256K1OutputOwner`.

## Sortie de transfert SECP256K1

Une sortie de transfert [secp256k1](cryptographic-primitives.md#secp-256-k1-addresses) permet d'envoyer une quantité d'un actif à une collection d'adresses après une période unix spécifiée. Le seul actif valide est AVAX.

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
    uint32 type_id = 1;           // 04 bytes
    uint64 amount = 2;            // 08 bytes
    uint64 locktime = 3;          // 08 bytes
    uint32 threshold = 4;         // 04 bytes
    repeated bytes addresses = 5; // 04 bytes + 20 bytes * len(addresses)
}
```

### **SECP256KK Exemple de sortie de transfert**

Let’s sortie de transfert secp256k1 avec:

* **`TypeID`**: 7
* **`Montant`**: 3999000
* **`Heure de verrouillage`**: 0
* **`Seuil`**: 1
* **`Adresses `**:
   * 0xda2be01be82ecc00c34f361eda8eb30fb5a715c

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

## SECP256K1 Sortie propriétaires

Une sortie de sortie [secp256k1](cryptographic-primitives.md#secp-256-k1-addresses) les propriétaires vont régénérer les récompenses de la mise en marche lorsque la période de verrouillage se termine.

### **Ce que la sortie des propriétaires de sortie SECP256K1 Contient**

Une sortie de sortie secp256k1 contient un `TypeID`, `Locktime`, `Seuil` et `Addresses`.

* **`TypeID`** est l'ID de ce type de sortie. Il est `0x00b`.
* **`Locktime`** est une longue qui contient the unix que cette sortie peut être dépensée après. The unix est spécifique à la seconde.
* **`Seuil`** est une int qui nomme le nombre de signatures uniques requises pour dépenser la sortie. Doit être inférieure ou égale à la longueur des **`adresses`**. Si **`les adresses`** sont vides, doit être 0.
* **`Les`** adresses sont une liste d'adresses uniques qui correspondent aux clés privées qui peuvent être utilisées pour dépenser cette sortie. Les adresses doivent être triées lexicographiquement.

### **Gantt SECP256K1 Propriétaires de sortie spécification de sortie**

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

### **Prototype SECP256K1 Propriétaires de sortie spécification de sortie**

```text
message SECP256K1OutputOwnersOutput {
    uint32 type_id = 1;           // 04 bytes
    uint64 locktime = 2;          // 08 bytes
    uint32 threshold = 3;         // 04 bytes
    repeated bytes addresses = 4; // 04 bytes + 20 bytes * len(addresses)
}
```

### **SECP256K1 Propriétaires de sortie Exemple de sortie**

Let’s sortie des propriétaires de sortie secp256k1 avec:

* **`TypeID`**: 11
* **`Heure de verrouillage`**: 0
* **`Seuil`**: 1
* **`Adresses `**:
   * 0xda2be01be82ecc00c34f361eda8eb30fb5a715c

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

Les entrées ont un type possible: `SECP256K1TransferInput`.

## SECP256K1 Entrée de transfert

Une entrée de transfert [secp256k1](cryptographic-primitives.md#secp-256-k1-addresses) permet de dépenser une sortie de transfert secp256k1.

### **Qu'est-ce que SECP256KK entrée de transfert Contient**

Une entrée de transfert secp256k1 contient une `quantité` et des `Indices`.

* **`TypeID`** est l'ID de ce type de sortie. Il est `0x005`.
* **`La quantité`** est une longue qui spécifie la quantité que cette entrée devrait consommer à partir de this Doit être positive. Doit être égal à la quantité spécifiée dans the
* **`AddressIndices`** est une liste d'indices uniques qui définissent les clés privées sont utilisés pour dépenser of Chaque UTXO dispose d'une gamme d'adresses qui peuvent dépenser of Chaque int représente l'index dans ce tableau d'adresses qui signera cette transaction. Le tableau doit être trié de bas à haut.

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

**Spécifications d'entrée de transfert de prototype SECP256K1**

```text
message SECP256K1TransferInput {
    uint32 type_id = 1;                  // 04 bytes
    uint64 amount = 2;                   // 08 bytes
    repeated uint32 address_indices = 3; // 04 bytes + 4 bytes * len(address_indices)
}
```

### **SECP256K1 Exemple d'entrée de transfert**

Faisons une entrée de paiement avec:

* **`TypeID`**: 5
* **`Montant`**: 4000
* **`Indices d'adresses`**: \[0\]

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

Les transactions non signées contiennent le contenu complet d'une transaction avec seules les signatures manquantes. Les transactions non signées ont six types possibles: `AddValidatorTx`, `AddValidatorTx`, `AddDelegatorTx`, `CreateSubnetTx`, `ImportTx` et `ExportTx`. Ils intègrent `BaseTx`, qui contient des champs et des opérations communs.

## BaseTx non signé

### **Qu'est-ce que la base Tx contient**

Une base tx contient un `TypeID`, `NetworkID`, `BlockchainID`, `Sorties`, `Entrées`, et `Memo`.

* **`TypeID`** est l'ID de ce type. Il est `0x00`.
* **`NetworkID`** est une int qui définit quel réseau cette transaction est censée être délivrée. Cette valeur est destinée à soutenir le routage des transactions et n'est pas conçue pour la prévention des attaques de replay.
* **`BlockchainID`** est un tableau 32-octets qui définit quelle chaîne de blocs cette transaction a été délivrée. Ceci est utilisé pour la prévention des attaques de replay pour les transactions qui pourraient être valables sur le réseau ou la chaîne de blocage.
* **`Sorties`** est un tableau d'objets de sortie transférables. Les sorties doivent être triées lexicographiquement par leur représentation sérialisée. La quantité totale des actifs créés dans ces produits doit être inférieure ou égale à la quantité totale de chaque actif consommé dans les intrants moins les frais de transaction.
* **`Intrants`** est un tableau d'objets d'entrée transférables. Les entrées doivent être triées et uniques. Les entrées sont triées d'abord lexicographiquement par leur **`TxID`** puis par **`the`** de bas à haut. S'il y a des entrées qui ont le même **`TxID`** et **`UTXOIndex`**, la transaction est invalide car cela entraînerait une double dépense.
* **`Memo`** champ contient des octets, jusqu'à 256 octets.

### **Spécifications de base Gantt Tx**

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

### **Spécifications de base de prototype Tx**

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

Faisons une base tx qui utilise les entrées et sorties des exemples précédents :

* **`TypeID`**: `0`
* **`NetworkID`**: `12345`
* **`BlockchainID`**: `0x000`
* **`Sorties`**:
   * `"Exemple de sortie transférable telle que définie ci-dessus"`
* **`Entrées`**:
   * `"Exemple d'entrée transférable telle que définie ci-dessus"`

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

## Non signé Ajouter Valider Tx

### **Qu'est-ce qu'il n'a pas signé Ajouter Valider Tx Contient**

Un validateur d'ajout non signé tx contient un `BaseTx`, `un` validateur, `Intervenants`, `Récompenses et` `partages`. Le `TypeID` de ce type est `0x00c`.

* **`BaseTx`**
* **`Validator`** a un `NodeID`, `le` NodeID, `la fin de temps` et `le poids`
   * **`NodeID`** est 20 octets qui est l'ID noeud du validateur.
   * **`StartTime`** est une longue qui est l'heure Unix lorsque le validateur commence à valider.
   * **`EndTime`** est une longue qui est l'heure Unix lorsque le validateur cesse de valider.
   * **`Poids`** est une longue qui est la quantité que le validateur prend les mesures
* Prise **`de prise`** a `LockedOuts`
   * **`LockedOuts`** Un tableau de sorties transférables qui sont verrouillées pendant la durée de la période de mise en œuvre. À la fin de la période de jalonnement, ces sorties sont remboursées à leurs adresses respectives.
* **`RewardsOwner`** de `sortie SECP256K1`
* **`Actions`** 10,000 fois pourcentage de récompense prélevée auprès des délégués

### **Gantt non signé Ajouter Validator Tx spécification**

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

### **Promo non signé Ajouter Validator Tx spécification**

```text
message AddValidatorTx {
    BaseTx base_tx = 1;                      // size(base_tx)
    Validator validator = 2;                 // 44 bytes
    Stake stake = 3;                         // size(LockedOuts)
    SECP256K1OutputOwners rewards_owner = 4; // size(rewards_owner)
    uint32 shares = 5;                       // 04 bytes
}
```

### **Unsigned Ajouter Valider Tx Exemple**

Let’s validator tx non signé qui utilise les entrées et sorties des exemples précédents :

* **`BaseTx `**: `"Exemple BaseTx tel que défini ci-dessus avec ID set à 0c"`
* **`Validator`** a un `NodeID`, `le` NodeID, `la fin de temps` et `le poids`
   * **`NodeID`** est 20 octets qui est l'ID noeud du validateur.
   * **`StartTime`** est une longue qui est l'heure Unix lorsque le validateur commence à valider.
   * **`EndTime`** est une longue qui est l'heure Unix lorsque le validateur cesse de valider.
   * **`Poids`** est une longue qui est la quantité que le validateur prend les mesures
* **`Intervenant`**: `0x00139c33a499ce4c33a3b09cdd2cfa01ae70dbf2d18b2d7d16852440e55088007001a94a20000100013cb7842e8cee6a0ebd09f1fe884f6861e1b29c`
* **`Propriétaire `**: `0x00b001001da2bee01be82ecc00c34f361eda8eb30fb5a715c`
* **`Actions `**: `0x0064`

   0x00b001001da2bee01be82ecc00c34f361e8eb30fb5a715c

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

## Non signé Ajouter Subnet Validant Tx

### **Ce qu'il n'a pas signé Ajouter Subnet Validant Tx Contient**

Un validateur subnet d'ajout non signé tx contient un `BaseTx`, `un` BaseTx, un `SubnetID` et un `SubnetAuth`. Le `TypeID` de ce type est `0x00d`.

* **`BaseTx`**
* **`Validator`** a un `NodeID`, `le` NodeID, `la fin de temps` et `le poids`
   * **`NodeID`** est 20 octets qui est l'ID noeud du validateur.
   * **`StartTime`** est une longue qui est l'heure Unix lorsque le validateur commence à valider.
   * **`EndTime`** est une longue qui est l'heure Unix lorsque le validateur cesse de valider.
   * **`Poids`** est une longue qui est la quantité que le validateur prend les mesures
* **`SubnetID`** a 32 octets subnet id
* **`SubnetAuth`** contient `SigIndices` et a un type id de `0x00a`. `SigIndices` est une liste d'indices uniques qui définissent les adresses signant la signature de contrôle pour ajouter un validateur à un sous-réseau. Le tableau doit être trié de bas à haut.

### **Gantt non signé Ajouter Subnet Validator Tx spécification**

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

### **Prototype non signé Ajouter Subnet Validator Tx spécification**

```text
message AddSubnetValidatorTx {
    BaseTx base_tx = 1;         // size(base_tx)
    Validator validator = 2;    // size(validator)
    SubnetID subnet_id = 3;     // 32 bytes
    SubnetAuth subnet_auth = 4; // 04 bytes + len(sig_indices)
}
```

### **Unsigned Ajouter Subnet Validant Tx Exemple**

Let’s unsigned subnet n'a pas été signé tx qui utilise les entrées et sorties des exemples précédents :

* **`BaseTx `**: `"Exemple BaseTx tel que défini ci-dessus avec ID set à 0d"`
* **`NodeID`**: `0xe9094f73698002fd52c90819b457b9fbc866ab80`
* **`StarTime`**: `0x005f21f31d`
* **`Durée`**: `0x005f497dc6`
* **`Poids`**: `0x00d431`
* **`SubnetID`**: `0x58b1092871db85bc752742054e2e8be0adf8166ec1f0769f4779f14c71d7eb`
* **`SubnetAuth`**:
   * **`TypeID`**: `0x00a`
   * **`SigIndices`**: `0x000`

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

## Non signé Ajouter le délégué Tx

### **Ce qu'il n'a pas signé Ajouter délégué Tx Contient**

Un délégué d'ajout non signé tx contient un `BaseTx`, un BaseTx, `Stake`, et `Validator``,` Le `TypeID` de ce type est `0x00e`.

* **`BaseTx`**
* **`Validator`** a un `NodeID`, `le` NodeID, `la fin de temps` et `le poids`
   * **`NodeID`** est 20 octets qui est l'ID noeud du délégué.
   * **`StartTime`** est une longue qui est l'heure Unix lorsque le délégué commence à déléguer.
   * **`EndTime`** est une longue qui est l'heure Unix lorsque le délégué cesse de déléguer \(et staked est retourné\).
   * **`Poids`** est une longue qui est la quantité que le délégué prend
* Prise **`de prise`** a `LockedOuts`
   * **`LockedOuts`** Un tableau de sorties transférables qui sont verrouillées pendant la durée de la période de mise en œuvre. À la fin de la période de jalonnement, ces sorties sont remboursées à leurs adresses respectives.
* **`RewardsOwner`** Un `SECP256K1OutputOwner`

### **Gantt non signé Ajouter délégué spécification Tx**

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

### **Promo non signé Ajouter délégué spécification Tx**

```text
message AddDelegatorTx {
    BaseTx base_tx = 1;                      // size(base_tx)
    Validator validator = 2;                 // 44 bytes
    Stake stake = 3;                         // size(LockedOuts)
    SECP256K1OutputOwners rewards_owner = 4; // size(rewards_owner)
}
```

### **Unsigned Ajouter l'exemple du délégué Tx**

Let’s unsigned add delegator tx qui utilise les entrées et les sorties des exemples précédents :

* **`BaseTx `**: `"Exemple BaseTx tel que défini ci-dessus avec ID set 0e"`
* **`NodeID`**: `0xe9094f73698002fd52c90819b457b9fbc866ab80`
* **`StarTime`**: `0x005f21f31d`
* **`Durée`**: `0x005f497dc6`
* **`Poids`**: `0x00d431`
* **`Intervenant`**: `0x00139c33a499ce4c33a3b09cdd2cfa01ae70dbf2d18b2d7d16852440e55088007001a94a20000100013cb7842e8cee6a0ebd09f1fe884f6861e1b29c`
* **`Propriétaire `**: `0x00b001001da2bee01be82ecc00c34f361eda8eb30fb5a715c`

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

## Unsigned Créer sous-réseau Tx

### **Qu'est-ce que non autorisé Créer Subnet Tx Contient**

Un subnet de création non signé tx contient un `BaseTx`, et `RewardsOwner`. Le `TypeID` de ce type est `0x0010`.

* **`BaseTx`**
* **`RewardsOwner`** de `sortie SECP256K1`

### **Gantt non signé Créer sous-réseau Tx spécification**

```text
+-----------------+-----------------------|---------------------------------+
| base_tx         : BaseTx                |             size(base_tx) bytes |
+-----------------+-----------------------+--------------------------------+
| rewards_owner   : SECP256K1OutputOwners |       size(rewards_owner) bytes |
+-----------------+-----------------------+---------------------------------+
                                | size(rewards_owner) + size(base_tx) bytes |
                                +-------------------------------------------+
```

### **Prototype non signé Créer sous-réseau Tx spécification**

```text
message CreateSubnetTx {
    BaseTx base_tx = 1;                      // size(base_tx)
    SECP256K1OutputOwners rewards_owner = 2; // size(rewards_owner)
}
```

### **Exemple de sous-réseau Tx non disponible**

Let’s unsigned tx unsigned create subnet qui utilise les entrées des exemples précédents :

* **`BaseTx `**: "Exemple BaseTx tel que défini ci-dessus, mais avec TypeID réglé à 16"
* **`RewardsOwner`**: :
   * **`TypeId`**: 11
   * **`Heure de verrouillage`**: 0
   * **`Seuil`**: 1
   * **`Adresses `**: \[ 0xda2bee01be82ecc00c34f361eda8eb30fb5a715c \]

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

## Importer non autorisée Tx

### **Qu'importe non importation Tx Contient**

Un tx non signé contient un `BaseTx`, `SourceChain` et `Ins`. Le `TypeID` de ce type est `0x0011`.

* **`BaseTx`**
* **`SourceChain`** est un ID de blockchain source 32 octets.
* **`Ins`** est un tableau de longueur variable d'Entres transférables.

### **Gantt non signé spécification Tx d'importation**

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

### **Promo non signé spécification d'importation Tx**

```text
message ImportTx {
    BaseTx base_tx = 1;          // size(base_tx)
    bytes source_chain = 2;      // 32 bytes
    repeated TransferIn ins = 3; // 4 bytes + size(ins)
}
```

### **Exemple d'importation non disponible Tx**

Let’s tx non signé qui utilise les entrées des exemples précédents :

* **`BaseTx `**: "Exemple BaseTx tel que défini ci-dessus avec TypeID set 17"
* **`Chaîne source`**:
* **`Ins`**: "Exemple SECP256K1 Entrée de transfert telle que définie ci-dessus"

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

## Exportation non autorisée Tx

### **Qu'exportation non autorisée Tx Contient**

Un tx d'exportation non signé contient un `BaseTx`, `une chaîne de destination` et des `Outs`. Le `TypeID` de ce type est `0x0012`.

* **`DestinationChain`** est l'ID 32 octets de la chaîne dans laquelle les fonds sont exportés.
* Les **`Outs`** est un tableau de longueur variable de sorties transférables.

### **Gantt non signé spécification d'exportation Tx**

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

### **Spécifications d'exportation Tx non signées de prototype**

```text
message ExportTx {
    BaseTx base_tx = 1;            // size(base_tx)
    bytes destination_chain = 2;   // 32 bytes
    repeated TransferOut outs = 3; // 4 bytes + size(outs)
}
```

### **Exemple d'exportation non disponible**

Let’s tx d'exportation non signé qui utilise les sorties des exemples précédents :

* `BaseTx `: "Exemple BaseTx tel que défini ci-dessus" avec `TypeID` set 18
* `Chaîne de destination`: `0x000`
* `Sorties`: "Exemple SECP256K1 sortie de transfert telle que définie ci-dessus"

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

## Pouvoirs

Les pouvoirs ont un type possible: `SECP256K1Credential`. Chaque titre est jumelé avec une entrée ou une opération. L'ordre des titres d'identification correspond à l'ordre des entrées ou des opérations.

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
    uint32 TypeID = 1;             // 4 bytes
    repeated bytes signatures = 2; // 4 bytes + 65 bytes * len(signatures)
}
```

### **SECP256K1 Exemple de crédit**

Faisons une entrée de paiement avec:

* **`signatures`**:
* `0x000102030405060708090a0b0c0d0e0f101131415161718191a1c1e1d1f2022425262728292a2c2e2d2f303132333435363738393a3c3d3f00`
* `0x404142434445464748494a4b4c4d4e4f505152535455565758595a5c5e5d5f606162636465668696a6b6e6d6f707172737475767778797a7b7d7f00`

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

Une transaction signée est une transaction non signée avec l'ajout d'un tableau de titres d'identité.

### Ce que la transaction signée contient

Une transaction signée contient un `CodecID`, `UnsignedTx`, et `crédits`.

* **`CodecID`** Le seul id codec valide actuel est `00 00`.
* **`UnsignedTx`** est une transaction non signée, comme décrit ci-dessus.
* **`Les`** pouvoirs sont un tableau de pouvoirs. Chaque titre sera jumelé à l'entrée dans le même index à cette titre.

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
    uint32 codec_id = 1;                 // 2 bytes
    UnsignedTx unsigned_tx = 2;          // size(unsigned_tx)
    repeated Credential credentials = 3; // 4 bytes + size(credentials)
}
```

### Exemple de transaction signé

Effectuons une transaction signée qui utilise la transaction non signée et la pièce de crédit à partir des exemples précédents.

* **`CodecID`**: `0`
* **`UnsignedTx`**: `0x001003ffffffffeeeeedddddddccccbbbbbbbaaaaaaa998800100102030405060708090a0c0c0e0f10115161718191a1b1c1d1e1f004310043100251025c61fbcfc078f69334f834be6dd265a95534128060128e3523a24a461c8943a461c8943a_de 59001f1e1d1c1b1a19181716151413121101f0e0c0b0a09080706050403020100500500200200200200200200200200400303`
* **`Crédits`** `0x002000102030405060708090a0c0d0e0f101161718191a1c1e1d1f202232425262728292a2c2e2d2f30313334353637393a3c3d3e3f00404142445464748494a4c4d4e4f5051525355758595a5565667677a7a00900090090090900909000900`

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

### What contient

Un UTXO contient un `CodecID`, `TxID`, `UTXOIndex`, et `Output`.

* **`CodecID`** Le seul id codec valide actuel est `00 00`.
* **`TxID`** est un identifiant de transaction 32-octets. Les ID de transaction sont calculés en prenant sha256 des octets de la transaction signée.
* **`UTXOIndex`** est une int qui spécifie quelle sortie dans la transaction spécifiée par **`TxID`** que cet utxo a été créé.
* **`AssetID`** est un tableau 32-octets qui définit quel atout cette référence utxo.
* **`Sortie`** est l'objet de sortie qui a créé cet utxo. La série des extrants a été définie ci-dessus.

#### Spécifications Gantt UTXO<a id="gantt-utxo-specification"></a>

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
    uint32 codec_id = 1;     // 02 bytes
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
* **`UTXOIndex`**: 0x000
* **`AssetID`**: `0x000102030405060708090a0b0c0d0e0f101131415161718191a1b1c1d1e1f`
* **`Sortie `**: `"Exemple SECP256K1 Sortie transférable telle que définie ci-dessus"`

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

## Lockin interactif

Un verrouillage interactif est une entrée mise en place et verrouillée. Le verrouillage interactif peut uniquement financer le verrouillage interactif LockOuts avec la même adresse jusqu'à ce que son temps de verrouillage ait passé.

### **Ce que What Lockin Contient**

Un LockIn parties prenantes contient un `TypeID`, `Locktime` et `transférable`.

* **`TypeID`** est l'ID de ce type de sortie. Il est `0x0015`.
* **`Locktime`** est une longue qui contient the unix avant laquelle l'entrée peut être consommée uniquement à l'enjeu. The unix est spécifique à la seconde.
* **`TransferableIn`** est un objet d'entrée transférable.

### **Spécification Gantt StakeableLockIn**

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

### **Spécification de lockin proto StakeableLockIn**

```text
message StakeableLockIn {
    uint32 type_id = 1;                    // 04 bytes
    uint64 locktime = 2;                   // 08 bytes
    TransferableInput transferable_in = 3; // size(transferable_in)
}
```

### **Exemple de verrouillage interactif**

Let’s verrouillage StakeableLockIn

* **`TypeID`**: 21
* **`Heure d'arrêt`**: 54321
* **`TransferableIn`**: "Exemple SECP256K1 Entrée de transfert telle que définie ci-dessus"

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

## LockOut parties intéressées

Un verrouillage interactif est une sortie qui est verrouillée jusqu'à son temps de verrouillage, mais peut être empilé dans l'intervalle.

### **Ce que StakeableLockOut LockOut Contient**

Un LockOut parties prenantes contient un `TypeID`, `Locktime` et `TransferableOut`.

* **`TypeID`** est l'ID de ce type de sortie. Il est `0x0016`.
* **`Locktime`** est une longue qui contient the unix avant lequel la sortie peut être consommée uniquement à l'enjeu. The unix est spécifique à la seconde.
* **`transferableout`**: "Exemple SECP256K1 Sortie de transfert telle que définie ci-dessus"

### **spécification de StakeableLockOut Gantt parties prenantes**

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

### **Spécifications de verrouillage proto StakeableLockOut**

```text
message StakeableLockOut {
    uint32 type_id = 1;                      // 04 bytes
    uint64 locktime = 2;                     // 08 bytes
    TransferableOutput transferable_out = 3; // size(transferable_out)
}
```

### **Exemple de verrouillage interactif**

Faisons une prise de jeu avec:

* **`TypeID`**: 22
* **`Heure d'arrêt`**: 54321
* **`Sortie transférable`**: `"Exemple SECP256K1 sortie de transfert depuis haut"`

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

