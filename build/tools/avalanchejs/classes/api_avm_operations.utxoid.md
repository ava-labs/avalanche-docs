[avalanche](../README.md) › [API-AVM-Operations](../modules/api_avm_operations.md) › [UTXOID](api_avm_operations.utxoid.md)

# Class: UTXOID

Class for representing a UTXOID used in [[TransferableOp]] types

## Hierarchy

  ↳ [NBytes](common_nbytes.nbytes.md)

  ↳ **UTXOID**

## Index

### Constructors

* [constructor](api_avm_operations.utxoid.md#constructor)

### Properties

* [_codecID](api_avm_operations.utxoid.md#protected-_codecid)
* [_typeID](api_avm_operations.utxoid.md#protected-_typeid)
* [_typeName](api_avm_operations.utxoid.md#protected-_typename)
* [bsize](api_avm_operations.utxoid.md#protected-bsize)
* [bytes](api_avm_operations.utxoid.md#protected-bytes)

### Methods

* [clone](api_avm_operations.utxoid.md#clone)
* [create](api_avm_operations.utxoid.md#create)
* [deserialize](api_avm_operations.utxoid.md#deserialize)
* [fromBuffer](api_avm_operations.utxoid.md#frombuffer)
* [fromString](api_avm_operations.utxoid.md#fromstring)
* [getCodecID](api_avm_operations.utxoid.md#getcodecid)
* [getSize](api_avm_operations.utxoid.md#getsize)
* [getTypeID](api_avm_operations.utxoid.md#gettypeid)
* [getTypeName](api_avm_operations.utxoid.md#gettypename)
* [serialize](api_avm_operations.utxoid.md#serialize)
* [toBuffer](api_avm_operations.utxoid.md#tobuffer)
* [toString](api_avm_operations.utxoid.md#tostring)
* [comparator](api_avm_operations.utxoid.md#static-comparator)

## Constructors

###  constructor

\+ **new UTXOID**(): *[UTXOID](api_avm_operations.utxoid.md)*

*Defined in [src/apis/avm/ops.ts:701](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/avm/ops.ts#L701)*

Class for representing a UTXOID used in [[TransferableOp]] types

**Returns:** *[UTXOID](api_avm_operations.utxoid.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [Serializable](utils_serialization.serializable.md).[_codecID](utils_serialization.serializable.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:42](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/serialization.ts#L42)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [NBytes](common_nbytes.nbytes.md).[_typeID](common_nbytes.nbytes.md#protected-_typeid)*

*Defined in [src/apis/avm/ops.ts:647](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/avm/ops.ts#L647)*

___

### `Protected` _typeName

• **_typeName**: *string* = "UTXOID"

*Overrides [NBytes](common_nbytes.nbytes.md).[_typeName](common_nbytes.nbytes.md#protected-_typename)*

*Defined in [src/apis/avm/ops.ts:646](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/avm/ops.ts#L646)*

___

### `Protected` bsize

• **bsize**: *number* = 36

*Overrides [NBytes](common_nbytes.nbytes.md).[bsize](common_nbytes.nbytes.md#protected-bsize)*

*Defined in [src/apis/avm/ops.ts:652](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/avm/ops.ts#L652)*

___

### `Protected` bytes

• **bytes**: *Buffer‹›* = Buffer.alloc(36)

*Overrides [NBytes](common_nbytes.nbytes.md).[bytes](common_nbytes.nbytes.md#protected-bytes)*

*Defined in [src/apis/avm/ops.ts:651](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/avm/ops.ts#L651)*

## Methods

###  clone

▸ **clone**(): *this*

*Overrides [NBytes](common_nbytes.nbytes.md).[clone](common_nbytes.nbytes.md#abstract-clone)*

*Defined in [src/apis/avm/ops.ts:693](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/avm/ops.ts#L693)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Overrides [NBytes](common_nbytes.nbytes.md).[create](common_nbytes.nbytes.md#abstract-create)*

*Defined in [src/apis/avm/ops.ts:699](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/avm/ops.ts#L699)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Inherited from [NBytes](common_nbytes.nbytes.md).[deserialize](common_nbytes.nbytes.md#deserialize)*

*Overrides [Serializable](utils_serialization.serializable.md).[deserialize](utils_serialization.serializable.md#deserialize)*

*Defined in [src/common/nbytes.ts:37](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/nbytes.ts#L37)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`buff`: Buffer, `offset`: number): *number*

*Inherited from [NBytes](common_nbytes.nbytes.md).[fromBuffer](common_nbytes.nbytes.md#frombuffer)*

*Defined in [src/common/nbytes.ts:75](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/nbytes.ts#L75)*

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

▸ **fromString**(`utxoid`: string): *number*

*Overrides [NBytes](common_nbytes.nbytes.md).[fromString](common_nbytes.nbytes.md#fromstring)*

*Defined in [src/apis/avm/ops.ts:674](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/avm/ops.ts#L674)*

Takes a base-58 string containing an [UTXOID](api_avm_operations.utxoid.md), parses it, populates the class, and returns the length of the UTXOID in bytes.

**Parameters:**

Name | Type |
------ | ------ |
`utxoid` | string |

**Returns:** *number*

The length of the raw [UTXOID](api_avm_operations.utxoid.md)

___

###  getCodecID

▸ **getCodecID**(): *number*

*Inherited from [Serializable](utils_serialization.serializable.md).[getCodecID](utils_serialization.serializable.md#getcodecid)*

*Defined in [src/utils/serialization.ts:61](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/serialization.ts#L61)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getSize

▸ **getSize**(): *number*

*Inherited from [NBytes](common_nbytes.nbytes.md).[getSize](common_nbytes.nbytes.md#getsize)*

*Defined in [src/common/nbytes.ts:51](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/nbytes.ts#L51)*

Returns the length of the [Buffer](https://github.com/feross/buffer).

**Returns:** *number*

The exact length requirement of this class

___

###  getTypeID

▸ **getTypeID**(): *number*

*Inherited from [Serializable](utils_serialization.serializable.md).[getTypeID](utils_serialization.serializable.md#gettypeid)*

*Defined in [src/utils/serialization.ts:54](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/serialization.ts#L54)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getTypeName

▸ **getTypeName**(): *string*

*Inherited from [Serializable](utils_serialization.serializable.md).[getTypeName](utils_serialization.serializable.md#gettypename)*

*Defined in [src/utils/serialization.ts:47](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/serialization.ts#L47)*

Used in serialization. TypeName is a string name for the type of object being output.

**Returns:** *string*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *object*

*Inherited from [NBytes](common_nbytes.nbytes.md).[serialize](common_nbytes.nbytes.md#serialize)*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/common/nbytes.ts:29](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/nbytes.ts#L29)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Inherited from [NBytes](common_nbytes.nbytes.md).[toBuffer](common_nbytes.nbytes.md#tobuffer)*

*Defined in [src/common/nbytes.ts:95](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/nbytes.ts#L95)*

**Returns:** *Buffer*

A reference to the stored [Buffer](https://github.com/feross/buffer)

___

###  toString

▸ **toString**(): *string*

*Overrides [NBytes](common_nbytes.nbytes.md).[toString](common_nbytes.nbytes.md#tostring)*

*Defined in [src/apis/avm/ops.ts:663](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/avm/ops.ts#L663)*

Returns a base-58 representation of the [UTXOID](api_avm_operations.utxoid.md).

**Returns:** *string*

___

### `Static` comparator

▸ **comparator**(): *function*

*Defined in [src/apis/avm/ops.ts:657](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/avm/ops.ts#L657)*

Returns a function used to sort an array of [UTXOID](api_avm_operations.utxoid.md)s

**Returns:** *function*

▸ (`a`: [UTXOID](api_avm_operations.utxoid.md), `b`: [UTXOID](api_avm_operations.utxoid.md)): *0 | 1 | -1*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [UTXOID](api_avm_operations.utxoid.md) |
`b` | [UTXOID](api_avm_operations.utxoid.md) |
