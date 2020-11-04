[avalanche](../README.md) › [API-AVM-MinterSet](../modules/api_avm_minterset.md) › [MinterSet](api_avm_minterset.minterset.md)

# Class: MinterSet

Class for representing a threshold and set of minting addresses in Avalanche.

**`typeparam`** including a threshold and array of addresses

## Hierarchy

* [Serializable](utils_serialization.serializable.md)

  ↳ **MinterSet**

## Index

### Constructors

* [constructor](api_avm_minterset.minterset.md#constructor)

### Properties

* [_typeID](api_avm_minterset.minterset.md#protected-_typeid)
* [_typeName](api_avm_minterset.minterset.md#protected-_typename)
* [minters](api_avm_minterset.minterset.md#protected-minters)
* [threshold](api_avm_minterset.minterset.md#protected-threshold)

### Methods

* [_cleanAddresses](api_avm_minterset.minterset.md#protected-_cleanaddresses)
* [deserialize](api_avm_minterset.minterset.md#deserialize)
* [getMinters](api_avm_minterset.minterset.md#getminters)
* [getThreshold](api_avm_minterset.minterset.md#getthreshold)
* [getTypeID](api_avm_minterset.minterset.md#gettypeid)
* [getTypeName](api_avm_minterset.minterset.md#gettypename)
* [serialize](api_avm_minterset.minterset.md#serialize)

## Constructors

###  constructor

\+ **new MinterSet**(`threshold`: number, `minters`: Array‹string | Buffer›): *[MinterSet](api_avm_minterset.minterset.md)*

*Defined in [src/apis/avm/minterset.ts:66](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/minterset.ts#L66)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`threshold` | number | The number of signatures required to mint more of an asset by signing a minting transaction |
`minters` | Array‹string &#124; Buffer› | Array of addresss which are authorized to sign a minting transaction  |

**Returns:** *[MinterSet](api_avm_minterset.minterset.md)*

## Properties

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [Serializable](utils_serialization.serializable.md).[_typeID](utils_serialization.serializable.md#protected-_typeid)*

*Defined in [src/apis/avm/minterset.ts:23](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/minterset.ts#L23)*

___

### `Protected` _typeName

• **_typeName**: *string* = "MinterSet"

*Overrides [Serializable](utils_serialization.serializable.md).[_typeName](utils_serialization.serializable.md#protected-_typename)*

*Defined in [src/apis/avm/minterset.ts:22](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/minterset.ts#L22)*

___

### `Protected` minters

• **minters**: *Array‹Buffer›* = []

*Defined in [src/apis/avm/minterset.ts:40](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/minterset.ts#L40)*

___

### `Protected` threshold

• **threshold**: *number*

*Defined in [src/apis/avm/minterset.ts:39](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/minterset.ts#L39)*

## Methods

### `Protected` _cleanAddresses

▸ **_cleanAddresses**(`addresses`: Array‹string | Buffer›): *Array‹Buffer›*

*Defined in [src/apis/avm/minterset.ts:56](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/minterset.ts#L56)*

**Parameters:**

Name | Type |
------ | ------ |
`addresses` | Array‹string &#124; Buffer› |

**Returns:** *Array‹Buffer›*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Overrides [Serializable](utils_serialization.serializable.md).[deserialize](utils_serialization.serializable.md#deserialize)*

*Defined in [src/apis/avm/minterset.ts:33](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/minterset.ts#L33)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  getMinters

▸ **getMinters**(): *Array‹Buffer›*

*Defined in [src/apis/avm/minterset.ts:52](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/minterset.ts#L52)*

Returns the minters.

**Returns:** *Array‹Buffer›*

___

###  getThreshold

▸ **getThreshold**(): *number*

*Defined in [src/apis/avm/minterset.ts:45](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/minterset.ts#L45)*

Returns the threshold.

**Returns:** *number*

___

###  getTypeID

▸ **getTypeID**(): *number*

*Inherited from [Serializable](utils_serialization.serializable.md).[getTypeID](utils_serialization.serializable.md#gettypeid)*

*Defined in [src/utils/serialization.ts:52](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/serialization.ts#L52)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getTypeName

▸ **getTypeName**(): *string*

*Inherited from [Serializable](utils_serialization.serializable.md).[getTypeName](utils_serialization.serializable.md#gettypename)*

*Defined in [src/utils/serialization.ts:45](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/serialization.ts#L45)*

Used in serialization. TypeName is a string name for the type of object being output.

**Returns:** *string*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *object*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/apis/avm/minterset.ts:25](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/minterset.ts#L25)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*
