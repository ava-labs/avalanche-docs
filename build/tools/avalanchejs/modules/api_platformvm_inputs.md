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

* [serialization](api_platformvm_inputs.md#const-serialization)

### Functions

* [SelectInputClass](api_platformvm_inputs.md#const-selectinputclass)

## Variables

### `Const` serialization

• **serialization**: *[Serialization](../classes/utils_serialization.serialization.md)* = Serialization.getInstance()

*Defined in [src/apis/platformvm/inputs.ts:17](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/platformvm/inputs.ts#L17)*

## Functions

### `Const` SelectInputClass

▸ **SelectInputClass**(`inputid`: number, ...`args`: any[]): *[Input](../classes/common_inputs.input.md)*

*Defined in [src/apis/platformvm/inputs.ts:26](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/platformvm/inputs.ts#L26)*

Takes a buffer representing the output and returns the proper [Input](../classes/common_inputs.input.md) instance.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`inputid` | number | A number representing the inputID parsed prior to the bytes passed in  |
`...args` | any[] | - |

**Returns:** *[Input](../classes/common_inputs.input.md)*

An instance of an [Input](../classes/common_inputs.input.md)-extended class.
