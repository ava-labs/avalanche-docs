[avalanche](../README.md) › [API-AVM-Transactions](api_avm_transactions.md)

# Module: API-AVM-Transactions

## Index

### Classes

* [Tx](../classes/api_avm_transactions.tx.md)
* [UnsignedTx](../classes/api_avm_transactions.unsignedtx.md)

### Variables

* [serializer](api_avm_transactions.md#const-serializer)

### Functions

* [SelectTxClass](api_avm_transactions.md#const-selecttxclass)

## Variables

### `Const` serializer

• **serializer**: *[Serialization](../classes/utils_serialization.serialization.md)‹›* = Serialization.getInstance()

*Defined in [src/apis/avm/tx.ts:24](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/tx.ts#L24)*

## Functions

### `Const` SelectTxClass

▸ **SelectTxClass**(`txtype`: number, ...`args`: Array‹any›): *[BaseTx](../classes/api_avm_basetx.basetx.md)*

*Defined in [src/apis/avm/tx.ts:33](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/tx.ts#L33)*

Takes a buffer representing the output and returns the proper [BaseTx](../classes/api_avm_basetx.basetx.md) instance.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`txtype` | number | The id of the transaction type  |
`...args` | Array‹any› | - |

**Returns:** *[BaseTx](../classes/api_avm_basetx.basetx.md)*

An instance of an [BaseTx](../classes/api_avm_basetx.basetx.md)-extended class.
