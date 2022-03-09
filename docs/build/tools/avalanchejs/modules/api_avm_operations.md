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
* [buffer](api_avm_operations.md#const-buffer)
* [cb58](api_avm_operations.md#const-cb58)
* [decimalString](api_avm_operations.md#const-decimalstring)
* [hex](api_avm_operations.md#const-hex)
* [serialization](api_avm_operations.md#const-serialization)

### Functions

* [SelectOperationClass](api_avm_operations.md#const-selectoperationclass)

## Variables

### `Const` bintools

• **bintools**: *[BinTools](../classes/utils_bintools.bintools.md)* = BinTools.getInstance()

*Defined in [src/apis/avm/ops.ts:29](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L29)*

___

### `Const` buffer

• **buffer**: *[SerializedType](src_utils.md#serializedtype)* = "Buffer"

*Defined in [src/apis/avm/ops.ts:32](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L32)*

___

### `Const` cb58

• **cb58**: *[SerializedType](src_utils.md#serializedtype)* = "cb58"

*Defined in [src/apis/avm/ops.ts:31](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L31)*

___

### `Const` decimalString

• **decimalString**: *[SerializedType](src_utils.md#serializedtype)* = "decimalString"

*Defined in [src/apis/avm/ops.ts:34](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L34)*

___

### `Const` hex

• **hex**: *[SerializedType](src_utils.md#serializedtype)* = "hex"

*Defined in [src/apis/avm/ops.ts:33](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L33)*

___

### `Const` serialization

• **serialization**: *[Serialization](../classes/utils_serialization.serialization.md)* = Serialization.getInstance()

*Defined in [src/apis/avm/ops.ts:30](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L30)*

## Functions

### `Const` SelectOperationClass

▸ **SelectOperationClass**(`opid`: number, ...`args`: any[]): *[Operation](../classes/api_avm_operations.operation.md)*

*Defined in [src/apis/avm/ops.ts:43](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L43)*

Takes a buffer representing the output and returns the proper [Operation](../classes/api_avm_operations.operation.md) instance.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`opid` | number | A number representing the operation ID parsed prior to the bytes passed in  |
`...args` | any[] | - |

**Returns:** *[Operation](../classes/api_avm_operations.operation.md)*

An instance of an [Operation](../classes/api_avm_operations.operation.md)-extended class.
