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

*Inherited from [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:40](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L40)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [Serializable](utils_serialization.serializable.md).[_typeID](utils_serialization.serializable.md#protected-_typeid)*

*Defined in [src/apis/avm/ops.ts:50](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L50)*

___

### `Protected` _typeName

• **_typeName**: *string* = "Operation"

*Overrides [Serializable](utils_serialization.serializable.md).[_typeName](utils_serialization.serializable.md#protected-_typename)*

*Defined in [src/apis/avm/ops.ts:49](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L49)*

___

### `Protected` sigCount

• **sigCount**: *Buffer* = Buffer.alloc(4)

*Defined in [src/apis/avm/ops.ts:69](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L69)*

___

### `Protected` sigIdxs

• **sigIdxs**: *[SigIdx](common_signature.sigidx.md)[]* = []

*Defined in [src/apis/avm/ops.ts:70](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L70)*

## Methods

###  addSignatureIdx

▸ **addSignatureIdx**(`addressIdx`: number, `address`: Buffer): *void*

*Defined in [src/apis/avm/ops.ts:104](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L104)*

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

*Defined in [src/apis/avm/ops.ts:59](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L59)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Defined in [src/apis/avm/ops.ts:114](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L114)*

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

*Defined in [src/utils/serialization.ts:59](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L59)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

### `Abstract` getCredentialID

▸ **getCredentialID**(): *number*

*Defined in [src/apis/avm/ops.ts:96](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L96)*

Returns the credential ID.

**Returns:** *number*

___

### `Abstract` getOperationID

▸ **getOperationID**(): *number*

*Defined in [src/apis/avm/ops.ts:86](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L86)*

**Returns:** *number*

___

###  getSigIdxs

▸ **getSigIdxs**(): *[SigIdx](common_signature.sigidx.md)[]*

*Defined in [src/apis/avm/ops.ts:91](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L91)*

Returns the array of [SigIdx](common_signature.sigidx.md) for this [Operation](api_avm_operations.operation.md)

**Returns:** *[SigIdx](common_signature.sigidx.md)[]*

___

###  getTypeID

▸ **getTypeID**(): *number*

*Inherited from [SigIdx](common_signature.sigidx.md).[getTypeID](common_signature.sigidx.md#gettypeid)*

*Defined in [src/utils/serialization.ts:52](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L52)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getTypeName

▸ **getTypeName**(): *string*

*Inherited from [SigIdx](common_signature.sigidx.md).[getTypeName](common_signature.sigidx.md#gettypename)*

*Defined in [src/utils/serialization.ts:45](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L45)*

Used in serialization. TypeName is a string name for the type of object being output.

**Returns:** *string*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *object*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/apis/avm/ops.ts:52](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L52)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Defined in [src/apis/avm/ops.ts:129](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L129)*

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Defined in [src/apis/avm/ops.ts:144](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L144)*

Returns a base-58 string representing the [NFTMintOperation](api_avm_operations.nftmintoperation.md).

**Returns:** *string*

___

### `Static` comparator

▸ **comparator**(): *function*

*Defined in [src/apis/avm/ops.ts:72](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L72)*

**Returns:** *function*

▸ (`a`: [Operation](api_avm_operations.operation.md), `b`: [Operation](api_avm_operations.operation.md)): *1 | -1 | 0*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Operation](api_avm_operations.operation.md) |
`b` | [Operation](api_avm_operations.operation.md) |
