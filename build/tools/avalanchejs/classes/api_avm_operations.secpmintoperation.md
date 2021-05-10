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

* [_codecID](api_avm_operations.secpmintoperation.md#protected-_codecid)
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
* [getCodecID](api_avm_operations.secpmintoperation.md#getcodecid)
* [getCredentialID](api_avm_operations.secpmintoperation.md#getcredentialid)
* [getMintOutput](api_avm_operations.secpmintoperation.md#getmintoutput)
* [getOperationID](api_avm_operations.secpmintoperation.md#getoperationid)
* [getSigIdxs](api_avm_operations.secpmintoperation.md#getsigidxs)
* [getTransferOutput](api_avm_operations.secpmintoperation.md#gettransferoutput)
* [getTypeID](api_avm_operations.secpmintoperation.md#gettypeid)
* [getTypeName](api_avm_operations.secpmintoperation.md#gettypename)
* [serialize](api_avm_operations.secpmintoperation.md#serialize)
* [setCodecID](api_avm_operations.secpmintoperation.md#setcodecid)
* [toBuffer](api_avm_operations.secpmintoperation.md#tobuffer)
* [toString](api_avm_operations.secpmintoperation.md#tostring)
* [comparator](api_avm_operations.secpmintoperation.md#static-comparator)

## Constructors

###  constructor

\+ **new SECPMintOperation**(`mintOutput`: [SECPMintOutput](api_avm_outputs.secpmintoutput.md), `transferOutput`: [SECPTransferOutput](api_avm_outputs.secptransferoutput.md)): *[SECPMintOperation](api_avm_operations.secpmintoperation.md)*

*Defined in [src/apis/avm/ops.ts:363](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/avm/ops.ts#L363)*

An [Operation](api_avm_operations.operation.md) class which mints new tokens on an assetID.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`mintOutput` | [SECPMintOutput](api_avm_outputs.secpmintoutput.md) | undefined | The [SECPMintOutput](api_avm_outputs.secpmintoutput.md) that will be produced by this transaction. |
`transferOutput` | [SECPTransferOutput](api_avm_outputs.secptransferoutput.md) | undefined | A [SECPTransferOutput](api_avm_outputs.secptransferoutput.md) that will be produced from this minting operation.  |

**Returns:** *[SECPMintOperation](api_avm_operations.secpmintoperation.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = AVMConstants.LATESTCODEC

*Overrides [Serializable](utils_serialization.serializable.md).[_codecID](utils_serialization.serializable.md#protected-_codecid)*

*Defined in [src/apis/avm/ops.ts:269](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/avm/ops.ts#L269)*

___

### `Protected` _typeID

• **_typeID**: *number* = this._codecID === 0 ? AVMConstants.SECPMINTOPID : AVMConstants.SECPMINTOPID_CODECONE

*Overrides [Operation](api_avm_operations.operation.md).[_typeID](api_avm_operations.operation.md#protected-_typeid)*

*Defined in [src/apis/avm/ops.ts:270](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/avm/ops.ts#L270)*

___

### `Protected` _typeName

• **_typeName**: *string* = "SECPMintOperation"

*Overrides [Operation](api_avm_operations.operation.md).[_typeName](api_avm_operations.operation.md#protected-_typename)*

*Defined in [src/apis/avm/ops.ts:268](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/avm/ops.ts#L268)*

___

### `Protected` mintOutput

• **mintOutput**: *[SECPMintOutput](api_avm_outputs.secpmintoutput.md)* = undefined

*Defined in [src/apis/avm/ops.ts:288](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/avm/ops.ts#L288)*

___

### `Protected` sigCount

• **sigCount**: *Buffer* = Buffer.alloc(4)

*Inherited from [Operation](api_avm_operations.operation.md).[sigCount](api_avm_operations.operation.md#protected-sigcount)*

*Defined in [src/apis/avm/ops.ts:65](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/avm/ops.ts#L65)*

___

### `Protected` sigIdxs

• **sigIdxs**: *Array‹[SigIdx](common_signature.sigidx.md)›* = []

*Inherited from [Operation](api_avm_operations.operation.md).[sigIdxs](api_avm_operations.operation.md#protected-sigidxs)*

*Defined in [src/apis/avm/ops.ts:66](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/avm/ops.ts#L66)*

___

### `Protected` transferOutput

• **transferOutput**: *[SECPTransferOutput](api_avm_outputs.secptransferoutput.md)* = undefined

*Defined in [src/apis/avm/ops.ts:289](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/avm/ops.ts#L289)*

## Methods

###  addSignatureIdx

▸ **addSignatureIdx**(`addressIdx`: number, `address`: Buffer): *void*

*Inherited from [Operation](api_avm_operations.operation.md).[addSignatureIdx](api_avm_operations.operation.md#addsignatureidx)*

*Defined in [src/apis/avm/ops.ts:100](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/avm/ops.ts#L100)*

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

*Defined in [src/apis/avm/ops.ts:280](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/avm/ops.ts#L280)*

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

*Defined in [src/apis/avm/ops.ts:335](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/avm/ops.ts#L335)*

Popuates the instance from a [Buffer](https://github.com/feross/buffer) representing the [SECPMintOperation](api_avm_operations.secpmintoperation.md) and returns the updated offset.

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

*Defined in [src/utils/serialization.ts:61](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/serialization.ts#L61)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getCredentialID

▸ **getCredentialID**(): *number*

*Overrides [Operation](api_avm_operations.operation.md).[getCredentialID](api_avm_operations.operation.md#abstract-getcredentialid)*

*Defined in [src/apis/avm/ops.ts:310](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/avm/ops.ts#L310)*

Returns the credential ID.

**Returns:** *number*

___

###  getMintOutput

▸ **getMintOutput**(): *[SECPMintOutput](api_avm_outputs.secpmintoutput.md)*

*Defined in [src/apis/avm/ops.ts:321](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/avm/ops.ts#L321)*

Returns the [SECPMintOutput](api_avm_outputs.secpmintoutput.md) to be produced by this operation.

**Returns:** *[SECPMintOutput](api_avm_outputs.secpmintoutput.md)*

___

###  getOperationID

▸ **getOperationID**(): *number*

*Overrides [Operation](api_avm_operations.operation.md).[getOperationID](api_avm_operations.operation.md#abstract-getoperationid)*

*Defined in [src/apis/avm/ops.ts:303](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/avm/ops.ts#L303)*

Returns the operation ID.

**Returns:** *number*

___

###  getSigIdxs

▸ **getSigIdxs**(): *Array‹[SigIdx](common_signature.sigidx.md)›*

*Inherited from [Operation](api_avm_operations.operation.md).[getSigIdxs](api_avm_operations.operation.md#getsigidxs)*

*Defined in [src/apis/avm/ops.ts:87](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/avm/ops.ts#L87)*

Returns the array of [SigIdx](common_signature.sigidx.md) for this [Operation](api_avm_operations.operation.md)

**Returns:** *Array‹[SigIdx](common_signature.sigidx.md)›*

___

###  getTransferOutput

▸ **getTransferOutput**(): *[SECPTransferOutput](api_avm_outputs.secptransferoutput.md)*

*Defined in [src/apis/avm/ops.ts:328](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/avm/ops.ts#L328)*

Returns [SECPTransferOutput](api_avm_outputs.secptransferoutput.md) to be produced by this operation.

**Returns:** *[SECPTransferOutput](api_avm_outputs.secptransferoutput.md)*

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

*Overrides [Operation](api_avm_operations.operation.md).[serialize](api_avm_operations.operation.md#serialize)*

*Defined in [src/apis/avm/ops.ts:272](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/avm/ops.ts#L272)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  setCodecID

▸ **setCodecID**(`codecID`: number): *void*

*Defined in [src/apis/avm/ops.ts:291](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/avm/ops.ts#L291)*

**Parameters:**

Name | Type |
------ | ------ |
`codecID` | number |

**Returns:** *void*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Overrides [Operation](api_avm_operations.operation.md).[toBuffer](api_avm_operations.operation.md#tobuffer)*

*Defined in [src/apis/avm/ops.ts:347](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/avm/ops.ts#L347)*

Returns the buffer representing the [SECPMintOperation](api_avm_operations.secpmintoperation.md) instance.

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Inherited from [Operation](api_avm_operations.operation.md).[toString](api_avm_operations.operation.md#tostring)*

*Defined in [src/apis/avm/ops.ts:140](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/avm/ops.ts#L140)*

Returns a base-58 string representing the [NFTMintOperation](api_avm_operations.nftmintoperation.md).

**Returns:** *string*

___

### `Static` comparator

▸ **comparator**(): *function*

*Inherited from [Operation](api_avm_operations.operation.md).[comparator](api_avm_operations.operation.md#static-comparator)*

*Defined in [src/apis/avm/ops.ts:68](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/avm/ops.ts#L68)*

**Returns:** *function*

▸ (`a`: [Operation](api_avm_operations.operation.md), `b`: [Operation](api_avm_operations.operation.md)): *0 | 1 | -1*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Operation](api_avm_operations.operation.md) |
`b` | [Operation](api_avm_operations.operation.md) |
