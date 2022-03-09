[avalanche](../README.md) › [API-EVM-Inputs](api_evm_inputs.md)

# Module: API-EVM-Inputs

## Index

### Classes

* [AmountInput](../classes/api_evm_inputs.amountinput.md)
* [EVMInput](../classes/api_evm_inputs.evminput.md)
* [SECPTransferInput](../classes/api_evm_inputs.secptransferinput.md)
* [TransferableInput](../classes/api_evm_inputs.transferableinput.md)

### Functions

* [SelectInputClass](api_evm_inputs.md#const-selectinputclass)

## Functions

### `Const` SelectInputClass

▸ **SelectInputClass**(`inputID`: number, ...`args`: any[]): *[Input](../classes/common_inputs.input.md)*

*Defined in [src/apis/evm/inputs.ts:32](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/inputs.ts#L32)*

Takes a buffer representing the output and returns the proper [Input](../classes/common_inputs.input.md) instance.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`inputID` | number | A number representing the inputID parsed prior to the bytes passed in  |
`...args` | any[] | - |

**Returns:** *[Input](../classes/common_inputs.input.md)*

An instance of an [Input](../classes/common_inputs.input.md)-extended class.
