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
* [sanitizeObject](api_avm_operations.utxoid.md#sanitizeobject)
* [serialize](api_avm_operations.utxoid.md#serialize)
* [toBuffer](api_avm_operations.utxoid.md#tobuffer)
* [toString](api_avm_operations.utxoid.md#tostring)
* [comparator](api_avm_operations.utxoid.md#static-comparator)

## Constructors

###  constructor

\+ **new UTXOID**(): *[UTXOID](api_avm_operations.utxoid.md)*

*Defined in [src/apis/avm/ops.ts:839](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L839)*

Class for representing a UTXOID used in [[TransferableOp]] types

**Returns:** *[UTXOID](api_avm_operations.utxoid.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:51](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L51)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [NBytes](common_nbytes.nbytes.md).[_typeID](common_nbytes.nbytes.md#protected-_typeid)*

*Defined in [src/apis/avm/ops.ts:778](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L778)*

___

### `Protected` _typeName

• **_typeName**: *string* = "UTXOID"

*Overrides [NBytes](common_nbytes.nbytes.md).[_typeName](common_nbytes.nbytes.md#protected-_typename)*

*Defined in [src/apis/avm/ops.ts:777](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L777)*

___

### `Protected` bsize

• **bsize**: *number* = 36

*Overrides [NBytes](common_nbytes.nbytes.md).[bsize](common_nbytes.nbytes.md#protected-bsize)*

*Defined in [src/apis/avm/ops.ts:783](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L783)*

___

### `Protected` bytes

• **bytes**: *Buffer‹›* = Buffer.alloc(36)

*Overrides [NBytes](common_nbytes.nbytes.md).[bytes](common_nbytes.nbytes.md#protected-bytes)*

*Defined in [src/apis/avm/ops.ts:782](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L782)*

## Methods

###  clone

▸ **clone**(): *this*

*Overrides [NBytes](common_nbytes.nbytes.md).[clone](common_nbytes.nbytes.md#abstract-clone)*

*Defined in [src/apis/avm/ops.ts:831](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L831)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Overrides [NBytes](common_nbytes.nbytes.md).[create](common_nbytes.nbytes.md#abstract-create)*

*Defined in [src/apis/avm/ops.ts:837](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L837)*

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

▸ **fromString**(`utxoid`: string): *number*

*Overrides [SigIdx](common_signature.sigidx.md).[fromString](common_signature.sigidx.md#fromstring)*

*Defined in [src/apis/avm/ops.ts:807](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L807)*

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

*Defined in [src/apis/avm/ops.ts:796](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L796)*

Returns a base-58 representation of the [UTXOID](api_avm_operations.utxoid.md).

**Returns:** *string*

___

### `Static` comparator

▸ **comparator**(): *function*

*Defined in [src/apis/avm/ops.ts:788](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L788)*

Returns a function used to sort an array of [UTXOID](api_avm_operations.utxoid.md)s

**Returns:** *function*

▸ (`a`: [UTXOID](api_avm_operations.utxoid.md), `b`: [UTXOID](api_avm_operations.utxoid.md)): *1 | -1 | 0*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [UTXOID](api_avm_operations.utxoid.md) |
`b` | [UTXOID](api_avm_operations.utxoid.md) |
