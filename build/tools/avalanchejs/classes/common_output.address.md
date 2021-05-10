[avalanche](../README.md) › [Common-Output](../modules/common_output.md) › [Address](common_output.address.md)

# Class: Address

Class for representing an address used in [Output](common_output.output.md) types

## Hierarchy

  ↳ [NBytes](common_nbytes.nbytes.md)

  ↳ **Address**

## Index

### Constructors

* [constructor](common_output.address.md#constructor)

### Properties

* [_codecID](common_output.address.md#protected-_codecid)
* [_typeID](common_output.address.md#protected-_typeid)
* [_typeName](common_output.address.md#protected-_typename)
* [bsize](common_output.address.md#protected-bsize)
* [bytes](common_output.address.md#protected-bytes)

### Methods

* [clone](common_output.address.md#clone)
* [create](common_output.address.md#create)
* [deserialize](common_output.address.md#deserialize)
* [fromBuffer](common_output.address.md#frombuffer)
* [fromString](common_output.address.md#fromstring)
* [getCodecID](common_output.address.md#getcodecid)
* [getSize](common_output.address.md#getsize)
* [getTypeID](common_output.address.md#gettypeid)
* [getTypeName](common_output.address.md#gettypename)
* [serialize](common_output.address.md#serialize)
* [toBuffer](common_output.address.md#tobuffer)
* [toString](common_output.address.md#tostring)
* [comparator](common_output.address.md#static-comparator)

## Constructors

###  constructor

\+ **new Address**(): *[Address](common_output.address.md)*

*Defined in [src/common/output.ts:79](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/output.ts#L79)*

Class for representing an address used in [Output](common_output.output.md) types

**Returns:** *[Address](common_output.address.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [Serializable](utils_serialization.serializable.md).[_codecID](utils_serialization.serializable.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:42](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/serialization.ts#L42)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [NBytes](common_nbytes.nbytes.md).[_typeID](common_nbytes.nbytes.md#protected-_typeid)*

*Defined in [src/common/output.ts:25](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/output.ts#L25)*

___

### `Protected` _typeName

• **_typeName**: *string* = "Address"

*Overrides [NBytes](common_nbytes.nbytes.md).[_typeName](common_nbytes.nbytes.md#protected-_typename)*

*Defined in [src/common/output.ts:24](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/output.ts#L24)*

___

### `Protected` bsize

• **bsize**: *number* = 20

*Overrides [NBytes](common_nbytes.nbytes.md).[bsize](common_nbytes.nbytes.md#protected-bsize)*

*Defined in [src/common/output.ts:30](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/output.ts#L30)*

___

### `Protected` bytes

• **bytes**: *Buffer‹›* = Buffer.alloc(20)

*Overrides [NBytes](common_nbytes.nbytes.md).[bytes](common_nbytes.nbytes.md#protected-bytes)*

*Defined in [src/common/output.ts:29](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/output.ts#L29)*

## Methods

###  clone

▸ **clone**(): *this*

*Overrides [NBytes](common_nbytes.nbytes.md).[clone](common_nbytes.nbytes.md#abstract-clone)*

*Defined in [src/common/output.ts:71](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/output.ts#L71)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Overrides [NBytes](common_nbytes.nbytes.md).[create](common_nbytes.nbytes.md#abstract-create)*

*Defined in [src/common/output.ts:77](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/output.ts#L77)*

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

▸ **fromString**(`addr`: string): *number*

*Overrides [NBytes](common_nbytes.nbytes.md).[fromString](common_nbytes.nbytes.md#fromstring)*

*Defined in [src/common/output.ts:53](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/output.ts#L53)*

Takes a base-58 string containing an [Address](common_output.address.md), parses it, populates the class, and returns the length of the Address in bytes.

**Parameters:**

Name | Type |
------ | ------ |
`addr` | string |

**Returns:** *number*

The length of the raw [Address](common_output.address.md)

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

*Defined in [src/common/output.ts:42](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/output.ts#L42)*

Returns a base-58 representation of the [Address](common_output.address.md).

**Returns:** *string*

___

### `Static` comparator

▸ **comparator**(): *function*

*Defined in [src/common/output.ts:35](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/output.ts#L35)*

Returns a function used to sort an array of [Address](common_output.address.md)es

**Returns:** *function*

▸ (`a`: [Address](common_output.address.md), `b`: [Address](common_output.address.md)): *0 | 1 | -1*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Address](common_output.address.md) |
`b` | [Address](common_output.address.md) |
