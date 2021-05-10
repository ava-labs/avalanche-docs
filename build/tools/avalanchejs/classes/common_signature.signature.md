[avalanche](../README.md) › [Common-Signature](../modules/common_signature.md) › [Signature](common_signature.signature.md)

# Class: Signature

Signature for a [Tx](api_avm_transactions.tx.md)

## Hierarchy

  ↳ [NBytes](common_nbytes.nbytes.md)

  ↳ **Signature**

## Index

### Constructors

* [constructor](common_signature.signature.md#constructor)

### Properties

* [_codecID](common_signature.signature.md#protected-_codecid)
* [_typeID](common_signature.signature.md#protected-_typeid)
* [_typeName](common_signature.signature.md#protected-_typename)
* [bsize](common_signature.signature.md#protected-bsize)
* [bytes](common_signature.signature.md#protected-bytes)

### Methods

* [clone](common_signature.signature.md#clone)
* [create](common_signature.signature.md#create)
* [deserialize](common_signature.signature.md#deserialize)
* [fromBuffer](common_signature.signature.md#frombuffer)
* [fromString](common_signature.signature.md#fromstring)
* [getCodecID](common_signature.signature.md#getcodecid)
* [getSize](common_signature.signature.md#getsize)
* [getTypeID](common_signature.signature.md#gettypeid)
* [getTypeName](common_signature.signature.md#gettypename)
* [serialize](common_signature.signature.md#serialize)
* [toBuffer](common_signature.signature.md#tobuffer)
* [toString](common_signature.signature.md#tostring)

## Constructors

###  constructor

\+ **new Signature**(): *[Signature](common_signature.signature.md)*

*Defined in [src/common/credentials.ts:91](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/credentials.ts#L91)*

Signature for a [Tx](api_avm_transactions.tx.md)

**Returns:** *[Signature](common_signature.signature.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [Serializable](utils_serialization.serializable.md).[_codecID](utils_serialization.serializable.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:42](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/serialization.ts#L42)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [NBytes](common_nbytes.nbytes.md).[_typeID](common_nbytes.nbytes.md#protected-_typeid)*

*Defined in [src/common/credentials.ts:76](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/credentials.ts#L76)*

___

### `Protected` _typeName

• **_typeName**: *string* = "Signature"

*Overrides [NBytes](common_nbytes.nbytes.md).[_typeName](common_nbytes.nbytes.md#protected-_typename)*

*Defined in [src/common/credentials.ts:75](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/credentials.ts#L75)*

___

### `Protected` bsize

• **bsize**: *number* = 65

*Overrides [NBytes](common_nbytes.nbytes.md).[bsize](common_nbytes.nbytes.md#protected-bsize)*

*Defined in [src/common/credentials.ts:81](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/credentials.ts#L81)*

___

### `Protected` bytes

• **bytes**: *Buffer‹›* = Buffer.alloc(65)

*Overrides [NBytes](common_nbytes.nbytes.md).[bytes](common_nbytes.nbytes.md#protected-bytes)*

*Defined in [src/common/credentials.ts:80](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/credentials.ts#L80)*

## Methods

###  clone

▸ **clone**(): *this*

*Overrides [NBytes](common_nbytes.nbytes.md).[clone](common_nbytes.nbytes.md#abstract-clone)*

*Defined in [src/common/credentials.ts:83](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/credentials.ts#L83)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Overrides [NBytes](common_nbytes.nbytes.md).[create](common_nbytes.nbytes.md#abstract-create)*

*Defined in [src/common/credentials.ts:89](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/credentials.ts#L89)*

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

*Defined in [src/common/nbytes.ts:37](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/nbytes.ts#L37)*

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

*Defined in [src/common/nbytes.ts:75](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/nbytes.ts#L75)*

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

*Inherited from [NBytes](common_nbytes.nbytes.md).[fromString](common_nbytes.nbytes.md#fromstring)*

*Defined in [src/common/nbytes.ts:58](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/nbytes.ts#L58)*

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

*Inherited from [Serializable](utils_serialization.serializable.md).[getCodecID](utils_serialization.serializable.md#getcodecid)*

*Defined in [src/utils/serialization.ts:61](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/serialization.ts#L61)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getSize

▸ **getSize**(): *number*

*Inherited from [NBytes](common_nbytes.nbytes.md).[getSize](common_nbytes.nbytes.md#getsize)*

*Defined in [src/common/nbytes.ts:51](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/nbytes.ts#L51)*

Returns the length of the [Buffer](https://github.com/feross/buffer).

**Returns:** *number*

The exact length requirement of this class

___

###  getTypeID

▸ **getTypeID**(): *number*

*Inherited from [Serializable](utils_serialization.serializable.md).[getTypeID](utils_serialization.serializable.md#gettypeid)*

*Defined in [src/utils/serialization.ts:54](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/serialization.ts#L54)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getTypeName

▸ **getTypeName**(): *string*

*Inherited from [Serializable](utils_serialization.serializable.md).[getTypeName](utils_serialization.serializable.md#gettypename)*

*Defined in [src/utils/serialization.ts:47](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/serialization.ts#L47)*

Used in serialization. TypeName is a string name for the type of object being output.

**Returns:** *string*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *object*

*Inherited from [NBytes](common_nbytes.nbytes.md).[serialize](common_nbytes.nbytes.md#serialize)*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/common/nbytes.ts:29](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/nbytes.ts#L29)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Inherited from [NBytes](common_nbytes.nbytes.md).[toBuffer](common_nbytes.nbytes.md#tobuffer)*

*Defined in [src/common/nbytes.ts:95](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/nbytes.ts#L95)*

**Returns:** *Buffer*

A reference to the stored [Buffer](https://github.com/feross/buffer)

___

###  toString

▸ **toString**(): *string*

*Inherited from [NBytes](common_nbytes.nbytes.md).[toString](common_nbytes.nbytes.md#tostring)*

*Defined in [src/common/nbytes.ts:102](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/nbytes.ts#L102)*

**Returns:** *string*

A base-58 string of the stored [Buffer](https://github.com/feross/buffer)
