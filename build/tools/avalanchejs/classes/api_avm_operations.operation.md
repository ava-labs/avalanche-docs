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
* [serialize](api_avm_operations.operation.md#serialize)
* [toBuffer](api_avm_operations.operation.md#tobuffer)
* [toString](api_avm_operations.operation.md#tostring)
* [comparator](api_avm_operations.operation.md#static-comparator)

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [Serializable](utils_serialization.serializable.md).[_codecID](utils_serialization.serializable.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:42](https://github.com/ava-labs/avalanchejs/blob/9282770/src/utils/serialization.ts#L42)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [Serializable](utils_serialization.serializable.md).[_typeID](utils_serialization.serializable.md#protected-_typeid)*

*Defined in [src/apis/avm/ops.ts:46](https://github.com/ava-labs/avalanchejs/blob/9282770/src/apis/avm/ops.ts#L46)*

___

### `Protected` _typeName

• **_typeName**: *string* = "Operation"

*Overrides [Serializable](utils_serialization.serializable.md).[_typeName](utils_serialization.serializable.md#protected-_typename)*

*Defined in [src/apis/avm/ops.ts:45](https://github.com/ava-labs/avalanchejs/blob/9282770/src/apis/avm/ops.ts#L45)*

___

### `Protected` sigCount

• **sigCount**: *Buffer* = Buffer.alloc(4)

*Defined in [src/apis/avm/ops.ts:65](https://github.com/ava-labs/avalanchejs/blob/9282770/src/apis/avm/ops.ts#L65)*

___

### `Protected` sigIdxs

• **sigIdxs**: *Array‹[SigIdx](common_signature.sigidx.md)›* = []

*Defined in [src/apis/avm/ops.ts:66](https://github.com/ava-labs/avalanchejs/blob/9282770/src/apis/avm/ops.ts#L66)*

## Methods

###  addSignatureIdx

▸ **addSignatureIdx**(`addressIdx`: number, `address`: Buffer): *void*

*Defined in [src/apis/avm/ops.ts:100](https://github.com/ava-labs/avalanchejs/blob/9282770/src/apis/avm/ops.ts#L100)*

Creates and adds a [SigIdx](common_signature.sigidx.md) to the [Operation](api_avm_operations.operation.md).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`addressIdx` | number | The index of the address to reference in the signatures |
`address` | Buffer | The address of the source of the signature  |

**Returns:** *void*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Overrides [Serializable](utils_serialization.serializable.md).[deserialize](utils_serialization.serializable.md#deserialize)*

*Defined in [src/apis/avm/ops.ts:55](https://github.com/ava-labs/avalanchejs/blob/9282770/src/apis/avm/ops.ts#L55)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Defined in [src/apis/avm/ops.ts:110](https://github.com/ava-labs/avalanchejs/blob/9282770/src/apis/avm/ops.ts#L110)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`bytes` | Buffer | - |
`offset` | number | 0 |

**Returns:** *number*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Inherited from [Serializable](utils_serialization.serializable.md).[getCodecID](utils_serialization.serializable.md#getcodecid)*

*Defined in [src/utils/serialization.ts:61](https://github.com/ava-labs/avalanchejs/blob/9282770/src/utils/serialization.ts#L61)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

### `Abstract` getCredentialID

▸ **getCredentialID**(): *number*

*Defined in [src/apis/avm/ops.ts:92](https://github.com/ava-labs/avalanchejs/blob/9282770/src/apis/avm/ops.ts#L92)*

Returns the credential ID.

**Returns:** *number*

___

### `Abstract` getOperationID

▸ **getOperationID**(): *number*

*Defined in [src/apis/avm/ops.ts:82](https://github.com/ava-labs/avalanchejs/blob/9282770/src/apis/avm/ops.ts#L82)*

**Returns:** *number*

___

###  getSigIdxs

▸ **getSigIdxs**(): *Array‹[SigIdx](common_signature.sigidx.md)›*

*Defined in [src/apis/avm/ops.ts:87](https://github.com/ava-labs/avalanchejs/blob/9282770/src/apis/avm/ops.ts#L87)*

Returns the array of [SigIdx](common_signature.sigidx.md) for this [Operation](api_avm_operations.operation.md)

**Returns:** *Array‹[SigIdx](common_signature.sigidx.md)›*

___

###  getTypeID

▸ **getTypeID**(): *number*

*Inherited from [Serializable](utils_serialization.serializable.md).[getTypeID](utils_serialization.serializable.md#gettypeid)*

*Defined in [src/utils/serialization.ts:54](https://github.com/ava-labs/avalanchejs/blob/9282770/src/utils/serialization.ts#L54)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getTypeName

▸ **getTypeName**(): *string*

*Inherited from [Serializable](utils_serialization.serializable.md).[getTypeName](utils_serialization.serializable.md#gettypename)*

*Defined in [src/utils/serialization.ts:47](https://github.com/ava-labs/avalanchejs/blob/9282770/src/utils/serialization.ts#L47)*

Used in serialization. TypeName is a string name for the type of object being output.

**Returns:** *string*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *object*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/apis/avm/ops.ts:48](https://github.com/ava-labs/avalanchejs/blob/9282770/src/apis/avm/ops.ts#L48)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Defined in [src/apis/avm/ops.ts:125](https://github.com/ava-labs/avalanchejs/blob/9282770/src/apis/avm/ops.ts#L125)*

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Defined in [src/apis/avm/ops.ts:140](https://github.com/ava-labs/avalanchejs/blob/9282770/src/apis/avm/ops.ts#L140)*

Returns a base-58 string representing the [NFTMintOperation](api_avm_operations.nftmintoperation.md).

**Returns:** *string*

___

### `Static` comparator

▸ **comparator**(): *function*

*Defined in [src/apis/avm/ops.ts:68](https://github.com/ava-labs/avalanchejs/blob/9282770/src/apis/avm/ops.ts#L68)*

**Returns:** *function*

▸ (`a`: [Operation](api_avm_operations.operation.md), `b`: [Operation](api_avm_operations.operation.md)): *1 | -1 | 0*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Operation](api_avm_operations.operation.md) |
`b` | [Operation](api_avm_operations.operation.md) |
