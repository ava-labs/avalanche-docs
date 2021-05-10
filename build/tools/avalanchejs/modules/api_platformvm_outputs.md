[avalanche](../README.md) › [API-PlatformVM-Outputs](api_platformvm_outputs.md)

# Module: API-PlatformVM-Outputs

## Index

### Classes

* [AmountOutput](../classes/api_platformvm_outputs.amountoutput.md)
* [ParseableOutput](../classes/api_platformvm_outputs.parseableoutput.md)
* [SECPOwnerOutput](../classes/api_platformvm_outputs.secpowneroutput.md)
* [SECPTransferOutput](../classes/api_platformvm_outputs.secptransferoutput.md)
* [StakeableLockOut](../classes/api_platformvm_outputs.stakeablelockout.md)
* [TransferableOutput](../classes/api_platformvm_outputs.transferableoutput.md)

### Variables

* [bintools](api_platformvm_outputs.md#const-bintools)
* [serializer](api_platformvm_outputs.md#const-serializer)

### Functions

* [SelectOutputClass](api_platformvm_outputs.md#const-selectoutputclass)

## Variables

### `Const` bintools

• **bintools**: *[BinTools](../classes/utils_bintools.bintools.md)‹›* = BinTools.getInstance()

*Defined in [src/apis/platformvm/outputs.ts:13](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/apis/platformvm/outputs.ts#L13)*

___

### `Const` serializer

• **serializer**: *[Serialization](../classes/utils_serialization.serialization.md)‹›* = Serialization.getInstance()

*Defined in [src/apis/platformvm/outputs.ts:14](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/apis/platformvm/outputs.ts#L14)*

## Functions

### `Const` SelectOutputClass

▸ **SelectOutputClass**(`outputid`: number, ...`args`: Array‹any›): *[Output](../classes/common_output.output.md)*

*Defined in [src/apis/platformvm/outputs.ts:23](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/apis/platformvm/outputs.ts#L23)*

Takes a buffer representing the output and returns the proper Output instance.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`outputid` | number | A number representing the inputID parsed prior to the bytes passed in  |
`...args` | Array‹any› | - |

**Returns:** *[Output](../classes/common_output.output.md)*

An instance of an [Output](../classes/common_output.output.md)-extended class.
