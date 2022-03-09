[avalanche](../README.md) › [Utils-PersistanceOptions](../modules/utils_persistanceoptions.md) › [PersistanceOptions](utils_persistanceoptions.persistanceoptions.md)

# Class: PersistanceOptions

A class for defining the persistance behavior of this an API call.

## Hierarchy

* **PersistanceOptions**

## Index

### Constructors

* [constructor](utils_persistanceoptions.persistanceoptions.md#constructor)

### Properties

* [mergeRule](utils_persistanceoptions.persistanceoptions.md#protected-mergerule)
* [name](utils_persistanceoptions.persistanceoptions.md#protected-name)
* [overwrite](utils_persistanceoptions.persistanceoptions.md#protected-overwrite)

### Methods

* [getMergeRule](utils_persistanceoptions.persistanceoptions.md#getmergerule)
* [getName](utils_persistanceoptions.persistanceoptions.md#getname)
* [getOverwrite](utils_persistanceoptions.persistanceoptions.md#getoverwrite)

## Constructors

###  constructor

\+ **new PersistanceOptions**(`name`: string, `overwrite`: boolean, `mergeRule`: [MergeRule](../modules/utils_constants.md#mergerule)): *[PersistanceOptions](utils_persistanceoptions.persistanceoptions.md)*

*Defined in [src/utils/persistenceoptions.ts:31](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/persistenceoptions.ts#L31)*

**`remarks`** 
The merge rules are as follows:
  * "intersection" - the intersection of the set
  * "differenceSelf" - the difference between the existing data and new set
  * "differenceNew" - the difference between the new data and the existing set
  * "symDifference" - the union of the differences between both sets of data
  * "union" - the unique set of all elements contained in both sets
  * "unionMinusNew" - the unique set of all elements contained in both sets, excluding values only found in the new set
  * "unionMinusSelf" - the unique set of all elements contained in both sets, excluding values only found in the existing set

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`name` | string | - | The namespace of the database the data |
`overwrite` | boolean | false | True if the data should be completey overwritten |
`mergeRule` | [MergeRule](../modules/utils_constants.md#mergerule) | - | - |

**Returns:** *[PersistanceOptions](utils_persistanceoptions.persistanceoptions.md)*

## Properties

### `Protected` mergeRule

• **mergeRule**: *[MergeRule](../modules/utils_constants.md#mergerule)* = "union"

*Defined in [src/utils/persistenceoptions.ts:16](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/persistenceoptions.ts#L16)*

___

### `Protected` name

• **name**: *string* = undefined

*Defined in [src/utils/persistenceoptions.ts:12](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/persistenceoptions.ts#L12)*

___

### `Protected` overwrite

• **overwrite**: *boolean* = false

*Defined in [src/utils/persistenceoptions.ts:14](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/persistenceoptions.ts#L14)*

## Methods

###  getMergeRule

▸ **getMergeRule**(): *[MergeRule](../modules/utils_constants.md#mergerule)*

*Defined in [src/utils/persistenceoptions.ts:31](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/persistenceoptions.ts#L31)*

Returns the [MergeRule](../modules/utils_constants.md#mergerule) of the instance

**Returns:** *[MergeRule](../modules/utils_constants.md#mergerule)*

___

###  getName

▸ **getName**(): *string*

*Defined in [src/utils/persistenceoptions.ts:21](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/persistenceoptions.ts#L21)*

Returns the namespace of the instance

**Returns:** *string*

___

###  getOverwrite

▸ **getOverwrite**(): *boolean*

*Defined in [src/utils/persistenceoptions.ts:26](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/persistenceoptions.ts#L26)*

Returns the overwrite rule of the instance

**Returns:** *boolean*
