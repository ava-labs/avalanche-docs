[avalanche](../README.md) › [API-AVM-Outputs](api_avm_outputs.md)

# Module: API-AVM-Outputs

## Index

### Classes

* [AmountOutput](../classes/api_avm_outputs.amountoutput.md)
* [NFTMintOutput](../classes/api_avm_outputs.nftmintoutput.md)
* [NFTOutput](../classes/api_avm_outputs.nftoutput.md)
* [NFTTransferOutput](../classes/api_avm_outputs.nfttransferoutput.md)
* [SECPMintOutput](../classes/api_avm_outputs.secpmintoutput.md)
* [SECPTransferOutput](../classes/api_avm_outputs.secptransferoutput.md)
* [TransferableOutput](../classes/api_avm_outputs.transferableoutput.md)

### Variables

* [bintools](api_avm_outputs.md#const-bintools)
* [serializer](api_avm_outputs.md#const-serializer)

### Functions

* [SelectOutputClass](api_avm_outputs.md#const-selectoutputclass)

## Variables

### `Const` bintools

• **bintools**: *[BinTools](../classes/utils_bintools.bintools.md)‹›* = BinTools.getInstance()

*Defined in [src/apis/avm/outputs.ts:12](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/outputs.ts#L12)*

___

### `Const` serializer

• **serializer**: *[Serialization](../classes/utils_serialization.serialization.md)‹›* = Serialization.getInstance()

*Defined in [src/apis/avm/outputs.ts:13](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/outputs.ts#L13)*

## Functions

### `Const` SelectOutputClass

▸ **SelectOutputClass**(`outputid`: number, ...`args`: Array‹any›): *[Output](../classes/common_output.output.md)*

*Defined in [src/apis/avm/outputs.ts:22](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/outputs.ts#L22)*

Takes a buffer representing the output and returns the proper Output instance.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`outputid` | number | A number representing the inputID parsed prior to the bytes passed in  |
`...args` | Array‹any› | - |

**Returns:** *[Output](../classes/common_output.output.md)*

An instance of an [Output](../classes/common_output.output.md)-extended class.
