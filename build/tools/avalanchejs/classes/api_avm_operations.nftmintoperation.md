[avalanche](../README.md) › [API-AVM-Operations](../modules/api_avm_operations.md) › [NFTMintOperation](api_avm_operations.nftmintoperation.md)

# Class: NFTMintOperation

An [Operation](api_avm_operations.operation.md) class which specifies a NFT Mint Op.

## Hierarchy

  ↳ [Operation](api_avm_operations.operation.md)

  ↳ **NFTMintOperation**

## Index

### Constructors

* [constructor](api_avm_operations.nftmintoperation.md#constructor)

### Properties

* [_codecID](api_avm_operations.nftmintoperation.md#protected-_codecid)
* [_typeID](api_avm_operations.nftmintoperation.md#protected-_typeid)
* [_typeName](api_avm_operations.nftmintoperation.md#protected-_typename)
* [groupID](api_avm_operations.nftmintoperation.md#protected-groupid)
* [outputOwners](api_avm_operations.nftmintoperation.md#protected-outputowners)
* [payload](api_avm_operations.nftmintoperation.md#protected-payload)
* [sigCount](api_avm_operations.nftmintoperation.md#protected-sigcount)
* [sigIdxs](api_avm_operations.nftmintoperation.md#protected-sigidxs)

### Methods

* [addSignatureIdx](api_avm_operations.nftmintoperation.md#addsignatureidx)
* [deserialize](api_avm_operations.nftmintoperation.md#deserialize)
* [fromBuffer](api_avm_operations.nftmintoperation.md#frombuffer)
* [getCodecID](api_avm_operations.nftmintoperation.md#getcodecid)
* [getCredentialID](api_avm_operations.nftmintoperation.md#getcredentialid)
* [getGroupID](api_avm_operations.nftmintoperation.md#getgroupid)
* [getOperationID](api_avm_operations.nftmintoperation.md#getoperationid)
* [getOutputOwners](api_avm_operations.nftmintoperation.md#getoutputowners)
* [getPayload](api_avm_operations.nftmintoperation.md#getpayload)
* [getPayloadBuffer](api_avm_operations.nftmintoperation.md#getpayloadbuffer)
* [getSigIdxs](api_avm_operations.nftmintoperation.md#getsigidxs)
* [getTypeID](api_avm_operations.nftmintoperation.md#gettypeid)
* [getTypeName](api_avm_operations.nftmintoperation.md#gettypename)
* [serialize](api_avm_operations.nftmintoperation.md#serialize)
* [setCodecID](api_avm_operations.nftmintoperation.md#setcodecid)
* [toBuffer](api_avm_operations.nftmintoperation.md#tobuffer)
* [toString](api_avm_operations.nftmintoperation.md#tostring)
* [comparator](api_avm_operations.nftmintoperation.md#static-comparator)

## Constructors

###  constructor

\+ **new NFTMintOperation**(`groupID`: number, `payload`: Buffer, `outputOwners`: [OutputOwners](common_output.outputowners.md)[]): *[NFTMintOperation](api_avm_operations.nftmintoperation.md)*

*Defined in [src/apis/avm/ops.ts:553](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L553)*

An [Operation](api_avm_operations.operation.md) class which contains an NFT on an assetID.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`groupID` | number | undefined | The group to which to issue the NFT Output |
`payload` | Buffer | undefined | A [Buffer](https://github.com/feross/buffer) of the NFT payload |
`outputOwners` | [OutputOwners](common_output.outputowners.md)[] | undefined | An array of outputOwners  |

**Returns:** *[NFTMintOperation](api_avm_operations.nftmintoperation.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = AVMConstants.LATESTCODEC

*Overrides [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/apis/avm/ops.ts:397](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L397)*

___

### `Protected` _typeID

• **_typeID**: *number* = this._codecID === 0 ? AVMConstants.NFTMINTOPID : AVMConstants.NFTMINTOPID_CODECONE

*Overrides [Operation](api_avm_operations.operation.md).[_typeID](api_avm_operations.operation.md#protected-_typeid)*

*Defined in [src/apis/avm/ops.ts:398](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L398)*

___

### `Protected` _typeName

• **_typeName**: *string* = "NFTMintOperation"

*Overrides [Operation](api_avm_operations.operation.md).[_typeName](api_avm_operations.operation.md#protected-_typename)*

*Defined in [src/apis/avm/ops.ts:396](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L396)*

___

### `Protected` groupID

• **groupID**: *Buffer* = Buffer.alloc(4)

*Defined in [src/apis/avm/ops.ts:425](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L425)*

___

### `Protected` outputOwners

• **outputOwners**: *[OutputOwners](common_output.outputowners.md)[]* = []

*Defined in [src/apis/avm/ops.ts:427](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L427)*

___

### `Protected` payload

• **payload**: *Buffer*

*Defined in [src/apis/avm/ops.ts:426](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L426)*

___

### `Protected` sigCount

• **sigCount**: *Buffer* = Buffer.alloc(4)

*Inherited from [Operation](api_avm_operations.operation.md).[sigCount](api_avm_operations.operation.md#protected-sigcount)*

*Defined in [src/apis/avm/ops.ts:69](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L69)*

___

### `Protected` sigIdxs

• **sigIdxs**: *[SigIdx](common_signature.sigidx.md)[]* = []

*Inherited from [Operation](api_avm_operations.operation.md).[sigIdxs](api_avm_operations.operation.md#protected-sigidxs)*

*Defined in [src/apis/avm/ops.ts:70](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L70)*

## Methods

###  addSignatureIdx

▸ **addSignatureIdx**(`addressIdx`: number, `address`: Buffer): *void*

*Inherited from [Operation](api_avm_operations.operation.md).[addSignatureIdx](api_avm_operations.operation.md#addsignatureidx)*

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

*Overrides [Operation](api_avm_operations.operation.md).[deserialize](api_avm_operations.operation.md#deserialize)*

*Defined in [src/apis/avm/ops.ts:409](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L409)*

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

*Defined in [src/apis/avm/ops.ts:494](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L494)*

Popuates the instance from a [Buffer](https://github.com/feross/buffer) representing the [NFTMintOperation](api_avm_operations.nftmintoperation.md) and returns the updated offset.

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

###  getCredentialID

▸ **getCredentialID**(): *number*

*Overrides [Operation](api_avm_operations.operation.md).[getCredentialID](api_avm_operations.operation.md#abstract-getcredentialid)*

*Defined in [src/apis/avm/ops.ts:453](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L453)*

Returns the credential ID.

**Returns:** *number*

___

###  getGroupID

▸ **getGroupID**(): *Buffer*

*Defined in [src/apis/avm/ops.ts:464](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L464)*

Returns the payload.

**Returns:** *Buffer*

___

###  getOperationID

▸ **getOperationID**(): *number*

*Overrides [Operation](api_avm_operations.operation.md).[getOperationID](api_avm_operations.operation.md#abstract-getoperationid)*

*Defined in [src/apis/avm/ops.ts:446](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L446)*

Returns the operation ID.

**Returns:** *number*

___

###  getOutputOwners

▸ **getOutputOwners**(): *[OutputOwners](common_output.outputowners.md)[]*

*Defined in [src/apis/avm/ops.ts:487](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L487)*

Returns the outputOwners.

**Returns:** *[OutputOwners](common_output.outputowners.md)[]*

___

###  getPayload

▸ **getPayload**(): *Buffer*

*Defined in [src/apis/avm/ops.ts:471](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L471)*

Returns the payload.

**Returns:** *Buffer*

___

###  getPayloadBuffer

▸ **getPayloadBuffer**(): *Buffer*

*Defined in [src/apis/avm/ops.ts:478](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L478)*

Returns the payload's raw [Buffer](https://github.com/feross/buffer) with length prepended, for use with [PayloadBase](utils_payload.payloadbase.md)'s fromBuffer

**Returns:** *Buffer*

___

###  getSigIdxs

▸ **getSigIdxs**(): *[SigIdx](common_signature.sigidx.md)[]*

*Inherited from [Operation](api_avm_operations.operation.md).[getSigIdxs](api_avm_operations.operation.md#getsigidxs)*

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

*Overrides [Operation](api_avm_operations.operation.md).[serialize](api_avm_operations.operation.md#serialize)*

*Defined in [src/apis/avm/ops.ts:400](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L400)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  setCodecID

▸ **setCodecID**(`codecID`: number): *void*

*Defined in [src/apis/avm/ops.ts:434](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L434)*

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

*Defined in [src/apis/avm/ops.ts:516](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L516)*

Returns the buffer representing the [NFTMintOperation](api_avm_operations.nftmintoperation.md) instance.

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Overrides [Operation](api_avm_operations.operation.md).[toString](api_avm_operations.operation.md#tostring)*

*Defined in [src/apis/avm/ops.ts:551](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L551)*

Returns a base-58 string representing the [NFTMintOperation](api_avm_operations.nftmintoperation.md).

**Returns:** *string*

___

### `Static` comparator

▸ **comparator**(): *function*

*Inherited from [Operation](api_avm_operations.operation.md).[comparator](api_avm_operations.operation.md#static-comparator)*

*Defined in [src/apis/avm/ops.ts:72](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L72)*

**Returns:** *function*

▸ (`a`: [Operation](api_avm_operations.operation.md), `b`: [Operation](api_avm_operations.operation.md)): *1 | -1 | 0*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Operation](api_avm_operations.operation.md) |
`b` | [Operation](api_avm_operations.operation.md) |
