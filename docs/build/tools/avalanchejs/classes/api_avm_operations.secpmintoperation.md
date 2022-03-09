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
* [sanitizeObject](api_avm_operations.secpmintoperation.md#sanitizeobject)
* [serialize](api_avm_operations.secpmintoperation.md#serialize)
* [setCodecID](api_avm_operations.secpmintoperation.md#setcodecid)
* [toBuffer](api_avm_operations.secpmintoperation.md#tobuffer)
* [toString](api_avm_operations.secpmintoperation.md#tostring)
* [comparator](api_avm_operations.secpmintoperation.md#static-comparator)

## Constructors

###  constructor

\+ **new SECPMintOperation**(`mintOutput`: [SECPMintOutput](api_avm_outputs.secpmintoutput.md), `transferOutput`: [SECPTransferOutput](api_avm_outputs.secptransferoutput.md)): *[SECPMintOperation](api_avm_operations.secpmintoperation.md)*

*Defined in [src/apis/avm/ops.ts:427](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L427)*

An [Operation](api_avm_operations.operation.md) class which mints new tokens on an assetID.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`mintOutput` | [SECPMintOutput](api_avm_outputs.secpmintoutput.md) | undefined | The [SECPMintOutput](api_avm_outputs.secpmintoutput.md) that will be produced by this transaction. |
`transferOutput` | [SECPTransferOutput](api_avm_outputs.secptransferoutput.md) | undefined | A [SECPTransferOutput](api_evm_outputs.secptransferoutput.md) that will be produced from this minting operation.  |

**Returns:** *[SECPMintOperation](api_avm_operations.secpmintoperation.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = AVMConstants.LATESTCODEC

*Overrides [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/apis/avm/ops.ts:326](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L326)*

___

### `Protected` _typeID

• **_typeID**: *number* = this._codecID === 0
      ? AVMConstants.SECPMINTOPID
      : AVMConstants.SECPMINTOPID_CODECONE

*Overrides [Operation](api_avm_operations.operation.md).[_typeID](api_avm_operations.operation.md#protected-_typeid)*

*Defined in [src/apis/avm/ops.ts:327](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L327)*

___

### `Protected` _typeName

• **_typeName**: *string* = "SECPMintOperation"

*Overrides [Operation](api_avm_operations.operation.md).[_typeName](api_avm_operations.operation.md#protected-_typename)*

*Defined in [src/apis/avm/ops.ts:325](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L325)*

___

### `Protected` mintOutput

• **mintOutput**: *[SECPMintOutput](api_avm_outputs.secpmintoutput.md)* = undefined

*Defined in [src/apis/avm/ops.ts:348](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L348)*

___

### `Protected` sigCount

• **sigCount**: *Buffer* = Buffer.alloc(4)

*Inherited from [Operation](api_avm_operations.operation.md).[sigCount](api_avm_operations.operation.md#protected-sigcount)*

*Defined in [src/apis/avm/ops.ts:93](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L93)*

___

### `Protected` sigIdxs

• **sigIdxs**: *[SigIdx](common_signature.sigidx.md)[]* = []

*Inherited from [Operation](api_avm_operations.operation.md).[sigIdxs](api_avm_operations.operation.md#protected-sigidxs)*

*Defined in [src/apis/avm/ops.ts:94](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L94)*

___

### `Protected` transferOutput

• **transferOutput**: *[SECPTransferOutput](api_avm_outputs.secptransferoutput.md)* = undefined

*Defined in [src/apis/avm/ops.ts:349](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L349)*

## Methods

###  addSignatureIdx

▸ **addSignatureIdx**(`addressIdx`: number, `address`: Buffer): *void*

*Inherited from [Operation](api_avm_operations.operation.md).[addSignatureIdx](api_avm_operations.operation.md#addsignatureidx)*

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

*Overrides [Operation](api_avm_operations.operation.md).[deserialize](api_avm_operations.operation.md#deserialize)*

*Defined in [src/apis/avm/ops.ts:340](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L340)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Overrides [Operation](api_avm_operations.operation.md).[fromBuffer](api_avm_operations.operation.md#frombuffer)*

*Defined in [src/apis/avm/ops.ts:405](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L405)*

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

*Inherited from [SigIdx](common_signature.sigidx.md).[getCodecID](common_signature.sigidx.md#getcodecid)*

*Defined in [src/utils/serialization.ts:70](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L70)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getCredentialID

▸ **getCredentialID**(): *number*

*Overrides [Operation](api_avm_operations.operation.md).[getCredentialID](api_avm_operations.operation.md#abstract-getcredentialid)*

*Defined in [src/apis/avm/ops.ts:380](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L380)*

Returns the credential ID.

**Returns:** *number*

___

###  getMintOutput

▸ **getMintOutput**(): *[SECPMintOutput](api_avm_outputs.secpmintoutput.md)*

*Defined in [src/apis/avm/ops.ts:391](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L391)*

Returns the [SECPMintOutput](api_avm_outputs.secpmintoutput.md) to be produced by this operation.

**Returns:** *[SECPMintOutput](api_avm_outputs.secpmintoutput.md)*

___

###  getOperationID

▸ **getOperationID**(): *number*

*Overrides [Operation](api_avm_operations.operation.md).[getOperationID](api_avm_operations.operation.md#abstract-getoperationid)*

*Defined in [src/apis/avm/ops.ts:373](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L373)*

Returns the operation ID.

**Returns:** *number*

___

###  getSigIdxs

▸ **getSigIdxs**(): *[SigIdx](common_signature.sigidx.md)[]*

*Inherited from [Operation](api_avm_operations.operation.md).[getSigIdxs](api_avm_operations.operation.md#getsigidxs)*

*Defined in [src/apis/avm/ops.ts:123](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L123)*

Returns the array of [SigIdx](common_signature.sigidx.md) for this [Operation](api_avm_operations.operation.md)

**Returns:** *[SigIdx](common_signature.sigidx.md)[]*

___

###  getTransferOutput

▸ **getTransferOutput**(): *[SECPTransferOutput](api_avm_outputs.secptransferoutput.md)*

*Defined in [src/apis/avm/ops.ts:398](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L398)*

Returns [SECPTransferOutput](api_evm_outputs.secptransferoutput.md) to be produced by this operation.

**Returns:** *[SECPTransferOutput](api_avm_outputs.secptransferoutput.md)*

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

*Overrides [Operation](api_avm_operations.operation.md).[serialize](api_avm_operations.operation.md#serialize)*

*Defined in [src/apis/avm/ops.ts:332](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L332)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  setCodecID

▸ **setCodecID**(`codecID`: number): *void*

*Defined in [src/apis/avm/ops.ts:356](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L356)*

Set the codecID

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`codecID` | number | The codecID to set  |

**Returns:** *void*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Overrides [Operation](api_avm_operations.operation.md).[toBuffer](api_avm_operations.operation.md#tobuffer)*

*Defined in [src/apis/avm/ops.ts:417](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L417)*

Returns the buffer representing the [SECPMintOperation](api_avm_operations.secpmintoperation.md) instance.

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Inherited from [Operation](api_avm_operations.operation.md).[toString](api_avm_operations.operation.md#tostring)*

*Defined in [src/apis/avm/ops.ts:176](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L176)*

Returns a base-58 string representing the [NFTMintOperation](api_avm_operations.nftmintoperation.md).

**Returns:** *string*

___

### `Static` comparator

▸ **comparator**(): *function*

*Inherited from [Operation](api_avm_operations.operation.md).[comparator](api_avm_operations.operation.md#static-comparator)*

*Defined in [src/apis/avm/ops.ts:96](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L96)*

**Returns:** *function*

▸ (`a`: [Operation](api_avm_operations.operation.md), `b`: [Operation](api_avm_operations.operation.md)): *1 | -1 | 0*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Operation](api_avm_operations.operation.md) |
`b` | [Operation](api_avm_operations.operation.md) |
