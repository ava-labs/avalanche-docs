[avalanche](../README.md) › [API-AVM-Operations](../modules/api_avm_operations.md) › [SECPMintOperation](api_avm_operations.secpmintoperation.md)

# Class: SECPMintOperation

An [Operation](api_avm_operations.operation.md) class which specifies a SECP256k1 Mint Op.

## Hierarchy

  ↳ [Operation](api_avm_operations.operation.md)

  ↳ **SECPMintOperation**

## Index

### Constructors

* [constructor](api_avm_operations.secpmintoperation.md#constructor)

### Properties

* [_typeID](api_avm_operations.secpmintoperation.md#protected-_typeid)
* [_typeName](api_avm_operations.secpmintoperation.md#protected-_typename)
* [mintOutput](api_avm_operations.secpmintoperation.md#protected-mintoutput)
* [sigCount](api_avm_operations.secpmintoperation.md#protected-sigcount)
* [sigIdxs](api_avm_operations.secpmintoperation.md#protected-sigidxs)
* [transferOutput](api_avm_operations.secpmintoperation.md#protected-transferoutput)

### Methods

* [addSignatureIdx](api_avm_operations.secpmintoperation.md#addsignatureidx)
* [deserialize](api_avm_operations.secpmintoperation.md#deserialize)
* [fromBuffer](api_avm_operations.secpmintoperation.md#frombuffer)
* [getCredentialID](api_avm_operations.secpmintoperation.md#getcredentialid)
* [getMintOutput](api_avm_operations.secpmintoperation.md#getmintoutput)
* [getOperationID](api_avm_operations.secpmintoperation.md#getoperationid)
* [getSigIdxs](api_avm_operations.secpmintoperation.md#getsigidxs)
* [getTransferOutput](api_avm_operations.secpmintoperation.md#gettransferoutput)
* [getTypeID](api_avm_operations.secpmintoperation.md#gettypeid)
* [getTypeName](api_avm_operations.secpmintoperation.md#gettypename)
* [serialize](api_avm_operations.secpmintoperation.md#serialize)
* [toBuffer](api_avm_operations.secpmintoperation.md#tobuffer)
* [toString](api_avm_operations.secpmintoperation.md#tostring)
* [comparator](api_avm_operations.secpmintoperation.md#static-comparator)

## Constructors

###  constructor

\+ **new SECPMintOperation**(`mintOutput`: [SECPMintOutput](api_avm_outputs.secpmintoutput.md), `transferOutput`: [SECPTransferOutput](api_avm_outputs.secptransferoutput.md)): *[SECPMintOperation](api_avm_operations.secpmintoperation.md)*

*Defined in [src/apis/avm/ops.ts:345](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L345)*

An [Operation](api_avm_operations.operation.md) class which mints new tokens on an assetID.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`mintOutput` | [SECPMintOutput](api_avm_outputs.secpmintoutput.md) | undefined | The [SECPMintOutput](api_avm_outputs.secpmintoutput.md) that will be produced by this transaction. |
`transferOutput` | [SECPTransferOutput](api_avm_outputs.secptransferoutput.md) | undefined | A [SECPTransferOutput](api_avm_outputs.secptransferoutput.md) that will be produced from this minting operation.  |

**Returns:** *[SECPMintOperation](api_avm_operations.secpmintoperation.md)*

## Properties

### `Protected` _typeID

• **_typeID**: *number* = AVMConstants.SECPMINTOPID

*Overrides [Operation](api_avm_operations.operation.md).[_typeID](api_avm_operations.operation.md#protected-_typeid)*

*Defined in [src/apis/avm/ops.ts:265](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L265)*

___

### `Protected` _typeName

• **_typeName**: *string* = "SECPMintOperation"

*Overrides [Operation](api_avm_operations.operation.md).[_typeName](api_avm_operations.operation.md#protected-_typename)*

*Defined in [src/apis/avm/ops.ts:264](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L264)*

___

### `Protected` mintOutput

• **mintOutput**: *[SECPMintOutput](api_avm_outputs.secpmintoutput.md)* = undefined

*Defined in [src/apis/avm/ops.ts:283](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L283)*

___

### `Protected` sigCount

• **sigCount**: *Buffer* = Buffer.alloc(4)

*Inherited from [Operation](api_avm_operations.operation.md).[sigCount](api_avm_operations.operation.md#protected-sigcount)*

*Defined in [src/apis/avm/ops.ts:61](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L61)*

___

### `Protected` sigIdxs

• **sigIdxs**: *Array‹[SigIdx](common_signature.sigidx.md)›* = []

*Inherited from [Operation](api_avm_operations.operation.md).[sigIdxs](api_avm_operations.operation.md#protected-sigidxs)*

*Defined in [src/apis/avm/ops.ts:62](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L62)*

___

### `Protected` transferOutput

• **transferOutput**: *[SECPTransferOutput](api_avm_outputs.secptransferoutput.md)* = undefined

*Defined in [src/apis/avm/ops.ts:284](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L284)*

## Methods

###  addSignatureIdx

▸ **addSignatureIdx**(`addressIdx`: number, `address`: Buffer): *void*

*Inherited from [Operation](api_avm_operations.operation.md).[addSignatureIdx](api_avm_operations.operation.md#addsignatureidx)*

*Defined in [src/apis/avm/ops.ts:96](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L96)*

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

*Overrides [Operation](api_avm_operations.operation.md).[deserialize](api_avm_operations.operation.md#deserialize)*

*Defined in [src/apis/avm/ops.ts:275](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L275)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Overrides [Operation](api_avm_operations.operation.md).[fromBuffer](api_avm_operations.operation.md#frombuffer)*

*Defined in [src/apis/avm/ops.ts:317](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L317)*

Popuates the instance from a [Buffer](https://github.com/feross/buffer) representing the [SECPMintOperation](api_avm_operations.secpmintoperation.md) and returns the updated offset.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`bytes` | Buffer | - |
`offset` | number | 0 |

**Returns:** *number*

___

###  getCredentialID

▸ **getCredentialID**(): *number*

*Overrides [Operation](api_avm_operations.operation.md).[getCredentialID](api_avm_operations.operation.md#abstract-getcredentialid)*

*Defined in [src/apis/avm/ops.ts:296](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L296)*

Returns the credential ID.

**Returns:** *number*

___

###  getMintOutput

▸ **getMintOutput**(): *[SECPMintOutput](api_avm_outputs.secpmintoutput.md)*

*Defined in [src/apis/avm/ops.ts:303](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L303)*

Returns the [SECPMintOutput](api_avm_outputs.secpmintoutput.md) to be produced by this operation.

**Returns:** *[SECPMintOutput](api_avm_outputs.secpmintoutput.md)*

___

###  getOperationID

▸ **getOperationID**(): *number*

*Overrides [Operation](api_avm_operations.operation.md).[getOperationID](api_avm_operations.operation.md#abstract-getoperationid)*

*Defined in [src/apis/avm/ops.ts:289](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L289)*

Returns the operation ID.

**Returns:** *number*

___

###  getSigIdxs

▸ **getSigIdxs**(): *Array‹[SigIdx](common_signature.sigidx.md)›*

*Inherited from [Operation](api_avm_operations.operation.md).[getSigIdxs](api_avm_operations.operation.md#getsigidxs)*

*Defined in [src/apis/avm/ops.ts:83](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L83)*

Returns the array of [SigIdx](common_signature.sigidx.md) for this [Operation](api_avm_operations.operation.md)

**Returns:** *Array‹[SigIdx](common_signature.sigidx.md)›*

___

###  getTransferOutput

▸ **getTransferOutput**(): *[SECPTransferOutput](api_avm_outputs.secptransferoutput.md)*

*Defined in [src/apis/avm/ops.ts:310](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L310)*

Returns [SECPTransferOutput](api_avm_outputs.secptransferoutput.md) to be produced by this operation.

**Returns:** *[SECPTransferOutput](api_avm_outputs.secptransferoutput.md)*

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

*Overrides [Operation](api_avm_operations.operation.md).[serialize](api_avm_operations.operation.md#serialize)*

*Defined in [src/apis/avm/ops.ts:267](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L267)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Overrides [Operation](api_avm_operations.operation.md).[toBuffer](api_avm_operations.operation.md#tobuffer)*

*Defined in [src/apis/avm/ops.ts:329](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L329)*

Returns the buffer representing the [SECPMintOperation](api_avm_operations.secpmintoperation.md) instance.

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Inherited from [Operation](api_avm_operations.operation.md).[toString](api_avm_operations.operation.md#tostring)*

*Defined in [src/apis/avm/ops.ts:136](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L136)*

Returns a base-58 string representing the [NFTMintOperation](api_avm_operations.nftmintoperation.md).

**Returns:** *string*

___

### `Static` comparator

▸ **comparator**(): *function*

*Inherited from [Operation](api_avm_operations.operation.md).[comparator](api_avm_operations.operation.md#static-comparator)*

*Defined in [src/apis/avm/ops.ts:64](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L64)*

**Returns:** *function*

▸ (`a`: [Operation](api_avm_operations.operation.md), `b`: [Operation](api_avm_operations.operation.md)): *0 | 1 | -1*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Operation](api_avm_operations.operation.md) |
`b` | [Operation](api_avm_operations.operation.md) |
