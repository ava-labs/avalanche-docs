[avalanche](../README.md) › [API-AVM-Operations](../modules/api_avm_operations.md) › [Operation](api_avm_operations.operation.md)

# Class: Operation

A class representing an operation. All operation types must extend on this class.

## Hierarchy

* [Serializable](utils_serialization.serializable.md)

  ↳ **Operation**

  ↳ [SECPMintOperation](api_avm_operations.secpmintoperation.md)

  ↳ [NFTMintOperation](api_avm_operations.nftmintoperation.md)

  ↳ [NFTTransferOperation](api_avm_operations.nfttransferoperation.md)

## Index

### Properties

* [_codecID](api_avm_operations.operation.md#protected-_codecid)
* [_typeID](api_avm_operations.operation.md#protected-_typeid)
* [_typeName](api_avm_operations.operation.md#protected-_typename)
* [sigCount](api_avm_operations.operation.md#protected-sigcount)
* [sigIdxs](api_avm_operations.operation.md#protected-sigidxs)

### Methods

* [addSignatureIdx](api_avm_operations.operation.md#addsignatureidx)
* [deserialize](api_avm_operations.operation.md#deserialize)
* [fromBuffer](api_avm_operations.operation.md#frombuffer)
* [getCodecID](api_avm_operations.operation.md#getcodecid)
* [getCredentialID](api_avm_operations.operation.md#abstract-getcredentialid)
* [getOperationID](api_avm_operations.operation.md#abstract-getoperationid)
* [getSigIdxs](api_avm_operations.operation.md#getsigidxs)
* [getTypeID](api_avm_operations.operation.md#gettypeid)
* [getTypeName](api_avm_operations.operation.md#gettypename)
* [sanitizeObject](api_avm_operations.operation.md#sanitizeobject)
* [serialize](api_avm_operations.operation.md#serialize)
* [toBuffer](api_avm_operations.operation.md#tobuffer)
* [toString](api_avm_operations.operation.md#tostring)
* [comparator](api_avm_operations.operation.md#static-comparator)

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:51](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L51)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [Serializable](utils_serialization.serializable.md).[_typeID](utils_serialization.serializable.md#protected-_typeid)*

*Defined in [src/apis/avm/ops.ts:74](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L74)*

___

### `Protected` _typeName

• **_typeName**: *string* = "Operation"

*Overrides [Serializable](utils_serialization.serializable.md).[_typeName](utils_serialization.serializable.md#protected-_typename)*

*Defined in [src/apis/avm/ops.ts:73](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L73)*

___

### `Protected` sigCount

• **sigCount**: *Buffer* = Buffer.alloc(4)

*Defined in [src/apis/avm/ops.ts:93](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L93)*

___

### `Protected` sigIdxs

• **sigIdxs**: *[SigIdx](common_signature.sigidx.md)[]* = []

*Defined in [src/apis/avm/ops.ts:94](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L94)*

## Methods

###  addSignatureIdx

▸ **addSignatureIdx**(`addressIdx`: number, `address`: Buffer): *void*

*Defined in [src/apis/avm/ops.ts:136](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L136)*

Creates and adds a [SigIdx](common_signature.sigidx.md) to the [Operation](api_avm_operations.operation.md).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`addressIdx` | number | The index of the address to reference in the signatures |
`address` | Buffer | The address of the source of the signature  |

**Returns:** *void*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[deserialize](common_inputs.standardparseableinput.md#deserialize)*

*Defined in [src/apis/avm/ops.ts:83](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L83)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Defined in [src/apis/avm/ops.ts:146](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L146)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`bytes` | Buffer | - |
`offset` | number | 0 |

**Returns:** *number*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Inherited from [SigIdx](common_signature.sigidx.md).[getCodecID](common_signature.sigidx.md#getcodecid)*

*Defined in [src/utils/serialization.ts:70](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L70)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

### `Abstract` getCredentialID

▸ **getCredentialID**(): *number*

*Defined in [src/apis/avm/ops.ts:128](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L128)*

Returns the credential ID.

**Returns:** *number*

___

### `Abstract` getOperationID

▸ **getOperationID**(): *number*

*Defined in [src/apis/avm/ops.ts:118](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L118)*

**Returns:** *number*

___

###  getSigIdxs

▸ **getSigIdxs**(): *[SigIdx](common_signature.sigidx.md)[]*

*Defined in [src/apis/avm/ops.ts:123](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L123)*

Returns the array of [SigIdx](common_signature.sigidx.md) for this [Operation](api_avm_operations.operation.md)

**Returns:** *[SigIdx](common_signature.sigidx.md)[]*

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

*Defined in [src/apis/avm/ops.ts:76](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L76)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Defined in [src/apis/avm/ops.ts:161](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L161)*

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Defined in [src/apis/avm/ops.ts:176](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L176)*

Returns a base-58 string representing the [NFTMintOperation](api_avm_operations.nftmintoperation.md).

**Returns:** *string*

___

### `Static` comparator

▸ **comparator**(): *function*

*Defined in [src/apis/avm/ops.ts:96](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L96)*

**Returns:** *function*

▸ (`a`: [Operation](api_avm_operations.operation.md), `b`: [Operation](api_avm_operations.operation.md)): *1 | -1 | 0*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Operation](api_avm_operations.operation.md) |
`b` | [Operation](api_avm_operations.operation.md) |
