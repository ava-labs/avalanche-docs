[avalanche](../README.md) › [API-AVM-Inputs](api_avm_inputs.md)

# Module: API-AVM-Inputs

## Index

### Classes

* [AmountInput](../classes/api_avm_inputs.amountinput.md)
* [SECPTransferInput](../classes/api_avm_inputs.secptransferinput.md)
* [TransferableInput](../classes/api_avm_inputs.transferableinput.md)

### Variables

* [serializer](api_avm_inputs.md#const-serializer)

### Functions

* [SelectInputClass](api_avm_inputs.md#const-selectinputclass)

## Variables

### `Const` serializer

• **serializer**: *[Serialization](../classes/utils_serialization.serialization.md)‹›* = Serialization.getInstance()

*Defined in [src/apis/avm/inputs.ts:15](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/inputs.ts#L15)*

## Functions

### `Const` SelectInputClass

▸ **SelectInputClass**(`inputid`: number, ...`args`: Array‹any›): *[Input](../classes/common_inputs.input.md)*

*Defined in [src/apis/avm/inputs.ts:24](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/inputs.ts#L24)*

Takes a buffer representing the output and returns the proper [Input](../classes/common_inputs.input.md) instance.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`inputid` | number | A number representing the inputID parsed prior to the bytes passed in  |
`...args` | Array‹any› | - |

**Returns:** *[Input](../classes/common_inputs.input.md)*

An instance of an [Input](../classes/common_inputs.input.md)-extended class.
