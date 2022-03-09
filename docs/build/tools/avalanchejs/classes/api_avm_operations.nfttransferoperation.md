[avalanche](../README.md) › [API-AVM-Operations](../modules/api_avm_operations.md) › [NFTTransferOperation](api_avm_operations.nfttransferoperation.md)

# Class: NFTTransferOperation

A [Operation](api_avm_operations.operation.md) class which specifies a NFT Transfer Op.

## Hierarchy

  ↳ [Operation](api_avm_operations.operation.md)

  ↳ **NFTTransferOperation**

## Index

### Constructors

* [constructor](api_avm_operations.nfttransferoperation.md#constructor)

### Properties

* [_codecID](api_avm_operations.nfttransferoperation.md#protected-_codecid)
* [_typeID](api_avm_operations.nfttransferoperation.md#protected-_typeid)
* [_typeName](api_avm_operations.nfttransferoperation.md#protected-_typename)
* [output](api_avm_operations.nfttransferoperation.md#protected-output)
* [sigCount](api_avm_operations.nfttransferoperation.md#protected-sigcount)
* [sigIdxs](api_avm_operations.nfttransferoperation.md#protected-sigidxs)

### Methods

* [addSignatureIdx](api_avm_operations.nfttransferoperation.md#addsignatureidx)
* [deserialize](api_avm_operations.nfttransferoperation.md#deserialize)
* [fromBuffer](api_avm_operations.nfttransferoperation.md#frombuffer)
* [getCodecID](api_avm_operations.nfttransferoperation.md#getcodecid)
* [getCredentialID](api_avm_operations.nfttransferoperation.md#getcredentialid)
* [getOperationID](api_avm_operations.nfttransferoperation.md#getoperationid)
* [getOutput](api_avm_operations.nfttransferoperation.md#getoutput)
* [getSigIdxs](api_avm_operations.nfttransferoperation.md#getsigidxs)
* [getTypeID](api_avm_operations.nfttransferoperation.md#gettypeid)
* [getTypeName](api_avm_operations.nfttransferoperation.md#gettypename)
* [sanitizeObject](api_avm_operations.nfttransferoperation.md#sanitizeobject)
* [serialize](api_avm_operations.nfttransferoperation.md#serialize)
* [setCodecID](api_avm_operations.nfttransferoperation.md#setcodecid)
* [toBuffer](api_avm_operations.nfttransferoperation.md#tobuffer)
* [toString](api_avm_operations.nfttransferoperation.md#tostring)
* [comparator](api_avm_operations.nfttransferoperation.md#static-comparator)

## Constructors

###  constructor

\+ **new NFTTransferOperation**(`output`: [NFTTransferOutput](api_avm_outputs.nfttransferoutput.md)): *[NFTTransferOperation](api_avm_operations.nfttransferoperation.md)*

*Defined in [src/apis/avm/ops.ts:758](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L758)*

An [Operation](api_avm_operations.operation.md) class which contains an NFT on an assetID.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`output` | [NFTTransferOutput](api_avm_outputs.nfttransferoutput.md) | undefined | An [NFTTransferOutput](api_avm_outputs.nfttransferoutput.md)  |

**Returns:** *[NFTTransferOperation](api_avm_operations.nfttransferoperation.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = AVMConstants.LATESTCODEC

*Overrides [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/apis/avm/ops.ts:673](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L673)*

___

### `Protected` _typeID

• **_typeID**: *number* = this._codecID === 0
      ? AVMConstants.NFTXFEROPID
      : AVMConstants.NFTXFEROPID_CODECONE

*Overrides [Operation](api_avm_operations.operation.md).[_typeID](api_avm_operations.operation.md#protected-_typeid)*

*Defined in [src/apis/avm/ops.ts:674](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L674)*

___

### `Protected` _typeName

• **_typeName**: *string* = "NFTTransferOperation"

*Overrides [Operation](api_avm_operations.operation.md).[_typeName](api_avm_operations.operation.md#protected-_typename)*

*Defined in [src/apis/avm/ops.ts:672](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L672)*

___

### `Protected` output

• **output**: *[NFTTransferOutput](api_avm_outputs.nfttransferoutput.md)*

*Defined in [src/apis/avm/ops.ts:692](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L692)*

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

*Defined in [src/apis/avm/ops.ts:686](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L686)*

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

*Defined in [src/apis/avm/ops.ts:736](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L736)*

Popuates the instance from a [Buffer](https://github.com/feross/buffer) representing the [NFTTransferOperation](api_avm_operations.nfttransferoperation.md) and returns the updated offset.

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

*Defined in [src/apis/avm/ops.ts:723](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L723)*

Returns the credential ID.

**Returns:** *number*

___

###  getOperationID

▸ **getOperationID**(): *number*

*Overrides [Operation](api_avm_operations.operation.md).[getOperationID](api_avm_operations.operation.md#abstract-getoperationid)*

*Defined in [src/apis/avm/ops.ts:716](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L716)*

Returns the operation ID.

**Returns:** *number*

___

###  getOutput

▸ **getOutput**(): *[NFTTransferOutput](api_avm_outputs.nfttransferoutput.md)*

*Defined in [src/apis/avm/ops.ts:731](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L731)*

**Returns:** *[NFTTransferOutput](api_avm_outputs.nfttransferoutput.md)*

___

###  getSigIdxs

▸ **getSigIdxs**(): *[SigIdx](common_signature.sigidx.md)[]*

*Inherited from [Operation](api_avm_operations.operation.md).[getSigIdxs](api_avm_operations.operation.md#getsigidxs)*

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

*Overrides [Operation](api_avm_operations.operation.md).[serialize](api_avm_operations.operation.md#serialize)*

*Defined in [src/apis/avm/ops.ts:679](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L679)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  setCodecID

▸ **setCodecID**(`codecID`: number): *void*

*Defined in [src/apis/avm/ops.ts:699](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L699)*

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

*Defined in [src/apis/avm/ops.ts:745](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L745)*

Returns the buffer representing the [NFTTransferOperation](api_avm_operations.nfttransferoperation.md) instance.

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Overrides [Operation](api_avm_operations.operation.md).[toString](api_avm_operations.operation.md#tostring)*

*Defined in [src/apis/avm/ops.ts:756](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L756)*

Returns a base-58 string representing the [NFTTransferOperation](api_avm_operations.nfttransferoperation.md).

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
