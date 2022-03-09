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
* [sanitizeObject](common_output.address.md#sanitizeobject)
* [serialize](common_output.address.md#serialize)
* [toBuffer](common_output.address.md#tobuffer)
* [toString](common_output.address.md#tostring)
* [comparator](common_output.address.md#static-comparator)

## Constructors

###  constructor

\+ **new Address**(): *[Address](common_output.address.md)*

*Defined in [src/common/output.ts:90](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L90)*

Class for representing an address used in [Output](common_output.output.md) types

**Returns:** *[Address](common_output.address.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:51](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L51)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [NBytes](common_nbytes.nbytes.md).[_typeID](common_nbytes.nbytes.md#protected-_typeid)*

*Defined in [src/common/output.ts:29](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L29)*

___

### `Protected` _typeName

• **_typeName**: *string* = "Address"

*Overrides [NBytes](common_nbytes.nbytes.md).[_typeName](common_nbytes.nbytes.md#protected-_typename)*

*Defined in [src/common/output.ts:28](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L28)*

___

### `Protected` bsize

• **bsize**: *number* = 20

*Overrides [NBytes](common_nbytes.nbytes.md).[bsize](common_nbytes.nbytes.md#protected-bsize)*

*Defined in [src/common/output.ts:34](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L34)*

___

### `Protected` bytes

• **bytes**: *Buffer‹›* = Buffer.alloc(20)

*Overrides [NBytes](common_nbytes.nbytes.md).[bytes](common_nbytes.nbytes.md#protected-bytes)*

*Defined in [src/common/output.ts:33](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L33)*

## Methods

###  clone

▸ **clone**(): *this*

*Overrides [NBytes](common_nbytes.nbytes.md).[clone](common_nbytes.nbytes.md#abstract-clone)*

*Defined in [src/common/output.ts:82](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L82)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Overrides [NBytes](common_nbytes.nbytes.md).[create](common_nbytes.nbytes.md#abstract-create)*

*Defined in [src/common/output.ts:88](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L88)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Inherited from [Signature](common_signature.signature.md).[deserialize](common_signature.signature.md#deserialize)*

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

*Inherited from [SigIdx](common_signature.sigidx.md).[fromBuffer](common_signature.sigidx.md#frombuffer)*

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

▸ **fromString**(`addr`: string): *number*

*Overrides [SigIdx](common_signature.sigidx.md).[fromString](common_signature.sigidx.md#fromstring)*

*Defined in [src/common/output.ts:58](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L58)*

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

*Inherited from [SigIdx](common_signature.sigidx.md).[getCodecID](common_signature.sigidx.md#getcodecid)*

*Defined in [src/utils/serialization.ts:70](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L70)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getSize

▸ **getSize**(): *number*

*Inherited from [SigIdx](common_signature.sigidx.md).[getSize](common_signature.sigidx.md#getsize)*

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

*Inherited from [Signature](common_signature.signature.md).[serialize](common_signature.signature.md#serialize)*

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

*Inherited from [SigIdx](common_signature.sigidx.md).[toBuffer](common_signature.sigidx.md#tobuffer)*

*Defined in [src/common/nbytes.ts:124](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/nbytes.ts#L124)*

**Returns:** *Buffer*

A reference to the stored [Buffer](https://github.com/feross/buffer)

___

###  toString

▸ **toString**(): *string*

*Overrides [SigIdx](common_signature.sigidx.md).[toString](common_signature.sigidx.md#tostring)*

*Defined in [src/common/output.ts:47](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L47)*

Returns a base-58 representation of the [Address](common_output.address.md).

**Returns:** *string*

___

### `Static` comparator

▸ **comparator**(): *function*

*Defined in [src/common/output.ts:39](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L39)*

Returns a function used to sort an array of [Address](common_output.address.md)es

**Returns:** *function*

▸ (`a`: [Address](common_output.address.md), `b`: [Address](common_output.address.md)): *1 | -1 | 0*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Address](common_output.address.md) |
`b` | [Address](common_output.address.md) |
