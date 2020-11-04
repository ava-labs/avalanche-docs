[avalanche](../README.md) › [Common-NBytes](../modules/common_nbytes.md) › [NBytes](common_nbytes.nbytes.md)

# Class: NBytes

Abstract class that implements basic functionality for managing a
[Buffer](https://github.com/feross/buffer) of an exact length.

Create a class that extends this one and override bsize to make it validate for exactly
the correct length.

## Hierarchy

* [Serializable](utils_serialization.serializable.md)

  ↳ **NBytes**

  ↳ [Address](common_output.address.md)

  ↳ [SigIdx](common_signature.sigidx.md)

  ↳ [Signature](common_signature.signature.md)

  ↳ [UTXOID](api_avm_operations.utxoid.md)

## Index

### Properties

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
* [getSize](common_nbytes.nbytes.md#getsize)
* [getTypeID](common_nbytes.nbytes.md#gettypeid)
* [getTypeName](common_nbytes.nbytes.md#gettypename)
* [serialize](common_nbytes.nbytes.md#serialize)
* [toBuffer](common_nbytes.nbytes.md#tobuffer)
* [toString](common_nbytes.nbytes.md#tostring)

## Properties

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [Serializable](utils_serialization.serializable.md).[_typeID](utils_serialization.serializable.md#protected-_typeid)*

*Defined in [src/common/nbytes.ts:26](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/nbytes.ts#L26)*

___

### `Protected` _typeName

• **_typeName**: *string* = "NBytes"

*Overrides [Serializable](utils_serialization.serializable.md).[_typeName](utils_serialization.serializable.md#protected-_typename)*

*Defined in [src/common/nbytes.ts:25](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/nbytes.ts#L25)*

___

### `Protected` bsize

• **bsize**: *number*

*Defined in [src/common/nbytes.ts:43](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/nbytes.ts#L43)*

___

### `Protected` bytes

• **bytes**: *Buffer*

*Defined in [src/common/nbytes.ts:42](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/nbytes.ts#L42)*

## Methods

### `Abstract` clone

▸ **clone**(): *this*

*Defined in [src/common/nbytes.ts:105](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/nbytes.ts#L105)*

**Returns:** *this*

___

### `Abstract` create

▸ **create**(...`args`: any[]): *this*

*Defined in [src/common/nbytes.ts:107](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/nbytes.ts#L107)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Overrides [Serializable](utils_serialization.serializable.md).[deserialize](utils_serialization.serializable.md#deserialize)*

*Defined in [src/common/nbytes.ts:36](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/nbytes.ts#L36)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`buff`: Buffer, `offset`: number): *number*

*Defined in [src/common/nbytes.ts:74](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/nbytes.ts#L74)*

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

*Defined in [src/common/nbytes.ts:57](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/nbytes.ts#L57)*

Takes a base-58 encoded string, verifies its length, and stores it.

**Parameters:**

Name | Type |
------ | ------ |
`b58str` | string |

**Returns:** *number*

The size of the [Buffer](https://github.com/feross/buffer)

___

###  getSize

▸ **getSize**(): *number*

*Defined in [src/common/nbytes.ts:50](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/nbytes.ts#L50)*

Returns the length of the [Buffer](https://github.com/feross/buffer).

**Returns:** *number*

The exact length requirement of this class

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

*Defined in [src/common/nbytes.ts:28](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/nbytes.ts#L28)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Defined in [src/common/nbytes.ts:94](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/nbytes.ts#L94)*

**Returns:** *Buffer*

A reference to the stored [Buffer](https://github.com/feross/buffer)

___

###  toString

▸ **toString**(): *string*

*Defined in [src/common/nbytes.ts:101](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/nbytes.ts#L101)*

**Returns:** *string*

A base-58 string of the stored [Buffer](https://github.com/feross/buffer)
