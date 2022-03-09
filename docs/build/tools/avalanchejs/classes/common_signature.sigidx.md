[avalanche](../README.md) › [Common-Signature](../modules/common_signature.md) › [SigIdx](common_signature.sigidx.md)

# Class: SigIdx

Type representing a [Signature](common_signature.signature.md) index used in [Input](common_inputs.input.md)

## Hierarchy

  ↳ [NBytes](common_nbytes.nbytes.md)

  ↳ **SigIdx**

## Index

### Constructors

* [constructor](common_signature.sigidx.md#constructor)

### Properties

* [_codecID](common_signature.sigidx.md#protected-_codecid)
* [_typeID](common_signature.sigidx.md#protected-_typeid)
* [_typeName](common_signature.sigidx.md#protected-_typename)
* [bsize](common_signature.sigidx.md#protected-bsize)
* [bytes](common_signature.sigidx.md#protected-bytes)
* [source](common_signature.sigidx.md#protected-source)

### Methods

* [clone](common_signature.sigidx.md#clone)
* [create](common_signature.sigidx.md#create)
* [deserialize](common_signature.sigidx.md#deserialize)
* [fromBuffer](common_signature.sigidx.md#frombuffer)
* [fromString](common_signature.sigidx.md#fromstring)
* [getCodecID](common_signature.sigidx.md#getcodecid)
* [getSize](common_signature.sigidx.md#getsize)
* [getSource](common_signature.sigidx.md#getsource)
* [getTypeID](common_signature.sigidx.md#gettypeid)
* [getTypeName](common_signature.sigidx.md#gettypename)
* [sanitizeObject](common_signature.sigidx.md#sanitizeobject)
* [serialize](common_signature.sigidx.md#serialize)
* [setSource](common_signature.sigidx.md#setsource)
* [toBuffer](common_signature.sigidx.md#tobuffer)
* [toString](common_signature.sigidx.md#tostring)

## Constructors

###  constructor

\+ **new SigIdx**(): *[SigIdx](common_signature.sigidx.md)*

*Defined in [src/common/credentials.ts:68](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/credentials.ts#L68)*

Type representing a [Signature](common_signature.signature.md) index used in [Input](common_inputs.input.md)

**Returns:** *[SigIdx](common_signature.sigidx.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:51](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L51)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [NBytes](common_nbytes.nbytes.md).[_typeID](common_nbytes.nbytes.md#protected-_typeid)*

*Defined in [src/common/credentials.ts:25](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/credentials.ts#L25)*

___

### `Protected` _typeName

• **_typeName**: *string* = "SigIdx"

*Overrides [NBytes](common_nbytes.nbytes.md).[_typeName](common_nbytes.nbytes.md#protected-_typename)*

*Defined in [src/common/credentials.ts:24](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/credentials.ts#L24)*

___

### `Protected` bsize

• **bsize**: *number* = 4

*Overrides [NBytes](common_nbytes.nbytes.md).[bsize](common_nbytes.nbytes.md#protected-bsize)*

*Defined in [src/common/credentials.ts:46](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/credentials.ts#L46)*

___

### `Protected` bytes

• **bytes**: *Buffer‹›* = Buffer.alloc(4)

*Overrides [NBytes](common_nbytes.nbytes.md).[bytes](common_nbytes.nbytes.md#protected-bytes)*

*Defined in [src/common/credentials.ts:45](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/credentials.ts#L45)*

___

### `Protected` source

• **source**: *Buffer* = Buffer.alloc(20)

*Defined in [src/common/credentials.ts:44](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/credentials.ts#L44)*

## Methods

###  clone

▸ **clone**(): *this*

*Overrides [NBytes](common_nbytes.nbytes.md).[clone](common_nbytes.nbytes.md#abstract-clone)*

*Defined in [src/common/credentials.ts:60](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/credentials.ts#L60)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Overrides [NBytes](common_nbytes.nbytes.md).[create](common_nbytes.nbytes.md#abstract-create)*

*Defined in [src/common/credentials.ts:66](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/credentials.ts#L66)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Overrides [Signature](common_signature.signature.md).[deserialize](common_signature.signature.md#deserialize)*

*Defined in [src/common/credentials.ts:34](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/credentials.ts#L34)*

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

▸ **fromString**(`b58str`: string): *number*

*Inherited from [SigIdx](common_signature.sigidx.md).[fromString](common_signature.sigidx.md#fromstring)*

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

*Inherited from [SigIdx](common_signature.sigidx.md).[getSize](common_signature.sigidx.md#getsize)*

*Defined in [src/common/nbytes.ts:78](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/nbytes.ts#L78)*

Returns the length of the [Buffer](https://github.com/feross/buffer).

**Returns:** *number*

The exact length requirement of this class

___

###  getSource

▸ **getSource**(): *Buffer*

*Defined in [src/common/credentials.ts:58](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/credentials.ts#L58)*

Retrieves the source address for the signature

**Returns:** *Buffer*

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

*Overrides [Signature](common_signature.signature.md).[serialize](common_signature.signature.md#serialize)*

*Defined in [src/common/credentials.ts:27](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/credentials.ts#L27)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  setSource

▸ **setSource**(`address`: Buffer): *void*

*Defined in [src/common/credentials.ts:51](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/credentials.ts#L51)*

Sets the source address for the signature

**Parameters:**

Name | Type |
------ | ------ |
`address` | Buffer |

**Returns:** *void*

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

*Inherited from [SigIdx](common_signature.sigidx.md).[toString](common_signature.sigidx.md#tostring)*

*Defined in [src/common/nbytes.ts:131](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/nbytes.ts#L131)*

**Returns:** *string*

A base-58 string of the stored [Buffer](https://github.com/feross/buffer)
