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

* [_codecID](api_avm_minterset.minterset.md#protected-_codecid)
* [_typeID](api_avm_minterset.minterset.md#protected-_typeid)
* [_typeName](api_avm_minterset.minterset.md#protected-_typename)
* [minters](api_avm_minterset.minterset.md#protected-minters)
* [threshold](api_avm_minterset.minterset.md#protected-threshold)

### Methods

* [_cleanAddresses](api_avm_minterset.minterset.md#protected-_cleanaddresses)
* [deserialize](api_avm_minterset.minterset.md#deserialize)
* [getCodecID](api_avm_minterset.minterset.md#getcodecid)
* [getMinters](api_avm_minterset.minterset.md#getminters)
* [getThreshold](api_avm_minterset.minterset.md#getthreshold)
* [getTypeID](api_avm_minterset.minterset.md#gettypeid)
* [getTypeName](api_avm_minterset.minterset.md#gettypename)
* [serialize](api_avm_minterset.minterset.md#serialize)

## Constructors

###  constructor

\+ **new MinterSet**(`threshold`: number, `minters`: string[] | Buffer[]): *[MinterSet](api_avm_minterset.minterset.md)*

*Defined in [src/apis/avm/minterset.ts:70](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/minterset.ts#L70)*

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`threshold` | number | 1 | The number of signatures required to mint more of an asset by signing a minting transaction |
`minters` | string[] &#124; Buffer[] | [] | Array of addresss which are authorized to sign a minting transaction  |

**Returns:** *[MinterSet](api_avm_minterset.minterset.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:40](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L40)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [Serializable](utils_serialization.serializable.md).[_typeID](utils_serialization.serializable.md#protected-_typeid)*

*Defined in [src/apis/avm/minterset.ts:27](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/minterset.ts#L27)*

___

### `Protected` _typeName

• **_typeName**: *string* = "MinterSet"

*Overrides [Serializable](utils_serialization.serializable.md).[_typeName](utils_serialization.serializable.md#protected-_typename)*

*Defined in [src/apis/avm/minterset.ts:26](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/minterset.ts#L26)*

___

### `Protected` minters

• **minters**: *Buffer[]* = []

*Defined in [src/apis/avm/minterset.ts:44](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/minterset.ts#L44)*

___

### `Protected` threshold

• **threshold**: *number*

*Defined in [src/apis/avm/minterset.ts:43](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/minterset.ts#L43)*

## Methods

### `Protected` _cleanAddresses

▸ **_cleanAddresses**(`addresses`: string[] | Buffer[]): *Buffer[]*

*Defined in [src/apis/avm/minterset.ts:60](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/minterset.ts#L60)*

**Parameters:**

Name | Type |
------ | ------ |
`addresses` | string[] &#124; Buffer[] |

**Returns:** *Buffer[]*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[deserialize](common_inputs.standardparseableinput.md#deserialize)*

*Defined in [src/apis/avm/minterset.ts:37](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/minterset.ts#L37)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Inherited from [SigIdx](common_signature.sigidx.md).[getCodecID](common_signature.sigidx.md#getcodecid)*

*Defined in [src/utils/serialization.ts:59](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L59)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getMinters

▸ **getMinters**(): *Buffer[]*

*Defined in [src/apis/avm/minterset.ts:56](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/minterset.ts#L56)*

Returns the minters.

**Returns:** *Buffer[]*

___

###  getThreshold

▸ **getThreshold**(): *number*

*Defined in [src/apis/avm/minterset.ts:49](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/minterset.ts#L49)*

Returns the threshold.

**Returns:** *number*

___

###  getTypeID

▸ **getTypeID**(): *number*

*Inherited from [SigIdx](common_signature.sigidx.md).[getTypeID](common_signature.sigidx.md#gettypeid)*

*Defined in [src/utils/serialization.ts:52](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L52)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getTypeName

▸ **getTypeName**(): *string*

*Inherited from [SigIdx](common_signature.sigidx.md).[getTypeName](common_signature.sigidx.md#gettypename)*

*Defined in [src/utils/serialization.ts:45](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L45)*

Used in serialization. TypeName is a string name for the type of object being output.

**Returns:** *string*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *object*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/apis/avm/minterset.ts:29](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/minterset.ts#L29)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*
