[avalanche](../README.md) › [API-EVM-Outputs](api_evm_outputs.md)

# Module: API-EVM-Outputs

## Index

### Classes

* [AmountOutput](../classes/api_evm_outputs.amountoutput.md)
* [EVMOutput](../classes/api_evm_outputs.evmoutput.md)
* [SECPTransferOutput](../classes/api_evm_outputs.secptransferoutput.md)
* [TransferableOutput](../classes/api_evm_outputs.transferableoutput.md)

### Variables

* [bintools](api_evm_outputs.md#const-bintools)

### Functions

* [SelectOutputClass](api_evm_outputs.md#const-selectoutputclass)

## Variables

### `Const` bintools

• **bintools**: *[BinTools](../classes/utils_bintools.bintools.md)* = BinTools.getInstance()

*Defined in [src/apis/evm/outputs.ts:18](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/outputs.ts#L18)*

## Functions

### `Const` SelectOutputClass

▸ **SelectOutputClass**(`outputID`: number, ...`args`: any[]): *[Output](../classes/common_output.output.md)*

*Defined in [src/apis/evm/outputs.ts:27](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/outputs.ts#L27)*

Takes a buffer representing the output and returns the proper Output instance.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`outputID` | number | A number representing the outputID parsed prior to the bytes passed in  |
`...args` | any[] | - |

**Returns:** *[Output](../classes/common_output.output.md)*

An instance of an [Output](src_common.md#output)-extended class.
