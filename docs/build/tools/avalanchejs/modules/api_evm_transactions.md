[avalanche](../README.md) › [API-EVM-Transactions](api_evm_transactions.md)

# Module: API-EVM-Transactions

## Index

### Classes

* [Tx](../classes/api_evm_transactions.tx.md)
* [UnsignedTx](../classes/api_evm_transactions.unsignedtx.md)

### Functions

* [SelectTxClass](api_evm_transactions.md#const-selecttxclass)

## Functions

### `Const` SelectTxClass

▸ **SelectTxClass**(`txTypeID`: number, ...`args`: any[]): *[EVMBaseTx](../classes/api_evm_basetx.evmbasetx.md)*

*Defined in [src/apis/evm/tx.ts:32](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/tx.ts#L32)*

Takes a buffer representing the output and returns the proper [EVMBaseTx](../classes/api_evm_basetx.evmbasetx.md) instance.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`txTypeID` | number | The id of the transaction type  |
`...args` | any[] | - |

**Returns:** *[EVMBaseTx](../classes/api_evm_basetx.evmbasetx.md)*

An instance of an [EVMBaseTx](../classes/api_evm_basetx.evmbasetx.md)-extended class.
