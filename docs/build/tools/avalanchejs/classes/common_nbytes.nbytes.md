[avalanche](../README.md) › [Common-NBytes](../modules/common_nbytes.md) › [NBytes](common_nbytes.nbytes.md)

# Class: NBytes

Abstract class that implements basic functionality for managing a
[Buffer](https://github.com/feross/buffer) of an exact length.

Create a class that extends this one and override bsize to make it validate for exactly
the correct length.

## Hierarchy

* [Serializable](utils_serialization.serializable.md)

  ↳ **NBytes**

  ↳ [SigIdx](common_signature.sigidx.md)

  ↳ [Signature](common_signature.signature.md)

  ↳ [Address](common_output.address.md)

  ↳ [UTXOID](api_avm_operations.utxoid.md)

## Index

### Properties

* [_codecID](common_nbytes.nbytes.md#protected-_codecid)
* [_typeID](common_nbytes.nbytes.md#protected-_typeid)
* [_typeName](common_nbytes.nbytes.md#protected-_typename)
* [bsize](common_nbytes.nbytes.md#protected-bsize)
* [bytes](common_nbytes.nbytes.md#protected-bytes)

### Methods

* [clone](common_nbytes.nbytes.md#abstract-clone)
* [create](common_nbytes.nbytes.md#abstract-create)
* [deserialize](common_nbytes.nbytes.md#deserialize)
* [fromBuffer](common_nbytes.nbytes.md#frombuffer)
* [fromString](common_nbytes.nbytes.md#fromstring)
* [getCodecID](common_nbytes.nbytes.md#getcodecid)
* [getSize](common_nbytes.nbytes.md#getsize)
* [getTypeID](common_nbytes.nbytes.md#gettypeid)
* [getTypeName](common_nbytes.nbytes.md#gettypename)
* [sanitizeObject](common_nbytes.nbytes.md#sanitizeobject)
* [serialize](common_nbytes.nbytes.md#serialize)
* [toBuffer](common_nbytes.nbytes.md#tobuffer)
* [toString](common_nbytes.nbytes.md#tostring)

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:51](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L51)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [Serializable](utils_serialization.serializable.md).[_typeID](utils_serialization.serializable.md#protected-_typeid)*

*Defined in [src/common/nbytes.ts:30](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/nbytes.ts#L30)*

___

### `Protected` _typeName

• **_typeName**: *string* = "NBytes"

*Overrides [Serializable](utils_serialization.serializable.md).[_typeName](utils_serialization.serializable.md#protected-_typename)*

*Defined in [src/common/nbytes.ts:29](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/nbytes.ts#L29)*

___

### `Protected` bsize

• **bsize**: *number*

*Defined in [src/common/nbytes.ts:71](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/nbytes.ts#L71)*

___

### `Protected` bytes

• **bytes**: *Buffer*

*Defined in [src/common/nbytes.ts:70](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/nbytes.ts#L70)*

## Methods

### `Abstract` clone

▸ **clone**(): *this*

*Defined in [src/common/nbytes.ts:135](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/nbytes.ts#L135)*

**Returns:** *this*

___

### `Abstract` create

▸ **create**(...`args`: any[]): *this*

*Defined in [src/common/nbytes.ts:136](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/nbytes.ts#L136)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[deserialize](common_inputs.standardparseableinput.md#deserialize)*

*Defined in [src/common/nbytes.ts:52](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/nbytes.ts#L52)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`buff`: Buffer, `offset`: number): *number*

*Defined in [src/common/nbytes.ts:102](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/nbytes.ts#L102)*

Takes a [[Buffer]], verifies its length, and stores it.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`buff` | Buffer | - |
`offset` | number | 0 |

**Returns:** *number*

The size of the [Buffer](https://github.com/feross/buffer)

___

###  fromString

▸ **fromString**(`b58str`: string): *number*

*Defined in [src/common/nbytes.ts:85](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/nbytes.ts#L85)*

Takes a base-58 encoded string, verifies its length, and stores it.

**Parameters:**

Name | Type |
------ | ------ |
`b58str` | string |

**Returns:** *number*

The size of the [Buffer](https://github.com/feross/buffer)

___

###  getCodecID

▸ **getCodecID**(): *number*

*Inherited from [SigIdx](common_signature.sigidx.md).[getCodecID](common_signature.sigidx.md#getcodecid)*

*Defined in [src/utils/serialization.ts:70](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L70)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getSize

▸ **getSize**(): *number*

*Defined in [src/common/nbytes.ts:78](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/nbytes.ts#L78)*

Returns the length of the [Buffer](https://github.com/feross/buffer).

**Returns:** *number*

The exact length requirement of this class

___

###  getTypeID

▸ **getTypeID**(): *number*

*Inherited from [SigIdx](common_signature.sigidx.md).[getTypeID](common_signature.sigidx.md#gettypeid)*

*Defined in [src/utils/serialization.ts:63](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L63)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getTypeName

▸ **getTypeName**(): *string*

*Inherited from [SigIdx](common_signature.sigidx.md).[getTypeName](common_signature.sigidx.md#gettypename)*

*Defined in [src/utils/serialization.ts:56](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L56)*

Used in serialization. TypeName is a string name for the type of object being output.

**Returns:** *string*

___

###  sanitizeObject

▸ **sanitizeObject**(`obj`: object): *object*

*Inherited from [SigIdx](common_signature.sigidx.md).[sanitizeObject](common_signature.sigidx.md#sanitizeobject)*

*Defined in [src/utils/serialization.ts:77](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L77)*

Sanitize to prevent cross scripting attacks.

**Parameters:**

Name | Type |
------ | ------ |
`obj` | object |

**Returns:** *object*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *object*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/common/nbytes.ts:32](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/nbytes.ts#L32)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Defined in [src/common/nbytes.ts:124](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/nbytes.ts#L124)*

**Returns:** *Buffer*

A reference to the stored [Buffer](https://github.com/feross/buffer)

___

###  toString

▸ **toString**(): *string*

*Defined in [src/common/nbytes.ts:131](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/nbytes.ts#L131)*

**Returns:** *string*

A base-58 string of the stored [Buffer](https://github.com/feross/buffer)
