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

*Defined in [src/apis/avm/ops.ts:657](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L657)*

Class for representing a UTXOID used in [[TransferableOp]] types

**Returns:** *[UTXOID](api_avm_operations.utxoid.md)*

## Properties

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [NBytes](common_nbytes.nbytes.md).[_typeID](common_nbytes.nbytes.md#protected-_typeid)*

*Defined in [src/apis/avm/ops.ts:603](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L603)*

___

### `Protected` _typeName

• **_typeName**: *string* = "UTXOID"

*Overrides [NBytes](common_nbytes.nbytes.md).[_typeName](common_nbytes.nbytes.md#protected-_typename)*

*Defined in [src/apis/avm/ops.ts:602](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L602)*

___

### `Protected` bsize

• **bsize**: *number* = 36

*Overrides [NBytes](common_nbytes.nbytes.md).[bsize](common_nbytes.nbytes.md#protected-bsize)*

*Defined in [src/apis/avm/ops.ts:608](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L608)*

___

### `Protected` bytes

• **bytes**: *Buffer‹›* = Buffer.alloc(36)

*Overrides [NBytes](common_nbytes.nbytes.md).[bytes](common_nbytes.nbytes.md#protected-bytes)*

*Defined in [src/apis/avm/ops.ts:607](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L607)*

## Methods

###  clone

▸ **clone**(): *this*

*Overrides [NBytes](common_nbytes.nbytes.md).[clone](common_nbytes.nbytes.md#abstract-clone)*

*Defined in [src/apis/avm/ops.ts:649](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L649)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Overrides [NBytes](common_nbytes.nbytes.md).[create](common_nbytes.nbytes.md#abstract-create)*

*Defined in [src/apis/avm/ops.ts:655](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L655)*

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

*Inherited from [NBytes](common_nbytes.nbytes.md).[fromBuffer](common_nbytes.nbytes.md#frombuffer)*

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

▸ **fromString**(`utxoid`: string): *number*

*Overrides [NBytes](common_nbytes.nbytes.md).[fromString](common_nbytes.nbytes.md#fromstring)*

*Defined in [src/apis/avm/ops.ts:630](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L630)*

Takes a base-58 string containing an [UTXOID](api_avm_operations.utxoid.md), parses it, populates the class, and returns the length of the UTXOID in bytes.

**Parameters:**

Name | Type |
------ | ------ |
`utxoid` | string |

**Returns:** *number*

The length of the raw [UTXOID](api_avm_operations.utxoid.md)

___

###  getSize

▸ **getSize**(): *number*

*Inherited from [NBytes](common_nbytes.nbytes.md).[getSize](common_nbytes.nbytes.md#getsize)*

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

*Inherited from [NBytes](common_nbytes.nbytes.md).[serialize](common_nbytes.nbytes.md#serialize)*

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

*Inherited from [NBytes](common_nbytes.nbytes.md).[toBuffer](common_nbytes.nbytes.md#tobuffer)*

*Defined in [src/common/nbytes.ts:94](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/nbytes.ts#L94)*

**Returns:** *Buffer*

A reference to the stored [Buffer](https://github.com/feross/buffer)

___

###  toString

▸ **toString**(): *string*

*Overrides [NBytes](common_nbytes.nbytes.md).[toString](common_nbytes.nbytes.md#tostring)*

*Defined in [src/apis/avm/ops.ts:619](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L619)*

Returns a base-58 representation of the [UTXOID](api_avm_operations.utxoid.md).

**Returns:** *string*

___

### `Static` comparator

▸ **comparator**(): *function*

*Defined in [src/apis/avm/ops.ts:613](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L613)*

Returns a function used to sort an array of [UTXOID](api_avm_operations.utxoid.md)s

**Returns:** *function*

▸ (`a`: [UTXOID](api_avm_operations.utxoid.md), `b`: [UTXOID](api_avm_operations.utxoid.md)): *0 | 1 | -1*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [UTXOID](api_avm_operations.utxoid.md) |
`b` | [UTXOID](api_avm_operations.utxoid.md) |
