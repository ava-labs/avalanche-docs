[avalanche](../README.md) › [API-AVM-Operations](api_avm_operations.md)

# Module: API-AVM-Operations

## Index

### Classes

* [NFTMintOperation](../classes/api_avm_operations.nftmintoperation.md)
* [NFTTransferOperation](../classes/api_avm_operations.nfttransferoperation.md)
* [Operation](../classes/api_avm_operations.operation.md)
* [SECPMintOperation](../classes/api_avm_operations.secpmintoperation.md)
* [TransferableOperation](../classes/api_avm_operations.transferableoperation.md)
* [UTXOID](../classes/api_avm_operations.utxoid.md)

### Variables

* [bintools](api_avm_operations.md#const-bintools)
* [serializer](api_avm_operations.md#const-serializer)

### Functions

* [SelectOperationClass](api_avm_operations.md#const-selectoperationclass)

## Variables

### `Const` bintools

• **bintools**: *[BinTools](../classes/utils_bintools.bintools.md)‹›* = BinTools.getInstance()

*Defined in [src/apis/avm/ops.ts:15](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L15)*

___

### `Const` serializer

• **serializer**: *[Serialization](../classes/utils_serialization.serialization.md)‹›* = Serialization.getInstance()

*Defined in [src/apis/avm/ops.ts:16](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L16)*

## Functions

### `Const` SelectOperationClass

▸ **SelectOperationClass**(`opid`: number, ...`args`: Array‹any›): *[Operation](../classes/api_avm_operations.operation.md)*

*Defined in [src/apis/avm/ops.ts:25](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L25)*

Takes a buffer representing the output and returns the proper [Operation](../classes/api_avm_operations.operation.md) instance.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`opid` | number | A number representing the operation ID parsed prior to the bytes passed in  |
`...args` | Array‹any› | - |

**Returns:** *[Operation](../classes/api_avm_operations.operation.md)*

An instance of an [Operation](../classes/api_avm_operations.operation.md)-extended class.
