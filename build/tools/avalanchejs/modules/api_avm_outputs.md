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
* [serialization](api_avm_outputs.md#const-serialization)

### Functions

* [SelectOutputClass](api_avm_outputs.md#const-selectoutputclass)

## Variables

### `Const` bintools

• **bintools**: *[BinTools](../classes/utils_bintools.bintools.md)* = BinTools.getInstance()

*Defined in [src/apis/avm/outputs.ts:13](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/outputs.ts#L13)*

___

### `Const` serialization

• **serialization**: *[Serialization](../classes/utils_serialization.serialization.md)* = Serialization.getInstance()

*Defined in [src/apis/avm/outputs.ts:14](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/outputs.ts#L14)*

## Functions

### `Const` SelectOutputClass

▸ **SelectOutputClass**(`outputid`: number, ...`args`: any[]): *[Output](../classes/common_output.output.md)*

*Defined in [src/apis/avm/outputs.ts:23](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/outputs.ts#L23)*

Takes a buffer representing the output and returns the proper Output instance.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`outputid` | number | A number representing the inputID parsed prior to the bytes passed in  |
`...args` | any[] | - |

**Returns:** *[Output](../classes/common_output.output.md)*

An instance of an [Output](src_common.md#output)-extended class.
