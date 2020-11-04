[avalanche](../README.md) › [API-PlatformVM-Inputs](api_platformvm_inputs.md)

# Module: API-PlatformVM-Inputs

## Index

### Classes

* [AmountInput](../classes/api_platformvm_inputs.amountinput.md)
* [ParseableInput](../classes/api_platformvm_inputs.parseableinput.md)
* [SECPTransferInput](../classes/api_platformvm_inputs.secptransferinput.md)
* [StakeableLockIn](../classes/api_platformvm_inputs.stakeablelockin.md)
* [TransferableInput](../classes/api_platformvm_inputs.transferableinput.md)

### Variables

* [serializer](api_platformvm_inputs.md#const-serializer)

### Functions

* [SelectInputClass](api_platformvm_inputs.md#const-selectinputclass)

## Variables

### `Const` serializer

• **serializer**: *[Serialization](../classes/utils_serialization.serialization.md)‹›* = Serialization.getInstance()

*Defined in [src/apis/platformvm/inputs.ts:16](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/inputs.ts#L16)*

## Functions

### `Const` SelectInputClass

▸ **SelectInputClass**(`inputid`: number, ...`args`: Array‹any›): *[Input](../classes/common_inputs.input.md)*

*Defined in [src/apis/platformvm/inputs.ts:25](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/inputs.ts#L25)*

Takes a buffer representing the output and returns the proper [Input](../classes/common_inputs.input.md) instance.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`inputid` | number | A number representing the inputID parsed prior to the bytes passed in  |
`...args` | Array‹any› | - |

**Returns:** *[Input](../classes/common_inputs.input.md)*

An instance of an [Input](../classes/common_inputs.input.md)-extended class.
