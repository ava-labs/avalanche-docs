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
* [getCredentialID](api_avm_operations.nftmintoperation.md#getcredentialid)
* [getOperationID](api_avm_operations.nftmintoperation.md#getoperationid)
* [getOutputOwners](api_avm_operations.nftmintoperation.md#getoutputowners)
* [getPayload](api_avm_operations.nftmintoperation.md#getpayload)
* [getPayloadBuffer](api_avm_operations.nftmintoperation.md#getpayloadbuffer)
* [getSigIdxs](api_avm_operations.nftmintoperation.md#getsigidxs)
* [getTypeID](api_avm_operations.nftmintoperation.md#gettypeid)
* [getTypeName](api_avm_operations.nftmintoperation.md#gettypename)
* [serialize](api_avm_operations.nftmintoperation.md#serialize)
* [toBuffer](api_avm_operations.nftmintoperation.md#tobuffer)
* [toString](api_avm_operations.nftmintoperation.md#tostring)
* [comparator](api_avm_operations.nftmintoperation.md#static-comparator)

## Constructors

###  constructor

\+ **new NFTMintOperation**(`groupID`: number, `payload`: Buffer, `outputOwners`: Array‹[OutputOwners](common_output.outputowners.md)›): *[NFTMintOperation](api_avm_operations.nftmintoperation.md)*

*Defined in [src/apis/avm/ops.ts:497](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L497)*

An [Operation](api_avm_operations.operation.md) class which contains an NFT on an assetID.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`groupID` | number | undefined | The group to which to issue the NFT Output |
`payload` | Buffer | undefined | A [Buffer](https://github.com/feross/buffer) of the NFT payload |
`outputOwners` | Array‹[OutputOwners](common_output.outputowners.md)› | undefined | An array of outputOwners  |

**Returns:** *[NFTMintOperation](api_avm_operations.nftmintoperation.md)*

## Properties

### `Protected` _typeID

• **_typeID**: *number* = AVMConstants.NFTMINTOPID

*Overrides [Operation](api_avm_operations.operation.md).[_typeID](api_avm_operations.operation.md#protected-_typeid)*

*Defined in [src/apis/avm/ops.ts:370](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L370)*

___

### `Protected` _typeName

• **_typeName**: *string* = "NFTMintOperation"

*Overrides [Operation](api_avm_operations.operation.md).[_typeName](api_avm_operations.operation.md#protected-_typename)*

*Defined in [src/apis/avm/ops.ts:369](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L369)*

___

### `Protected` groupID

• **groupID**: *Buffer* = Buffer.alloc(4)

*Defined in [src/apis/avm/ops.ts:394](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L394)*

___

### `Protected` outputOwners

• **outputOwners**: *Array‹[OutputOwners](common_output.outputowners.md)›* = []

*Defined in [src/apis/avm/ops.ts:396](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L396)*

___

### `Protected` payload

• **payload**: *Buffer*

*Defined in [src/apis/avm/ops.ts:395](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L395)*

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

*Defined in [src/apis/avm/ops.ts:381](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L381)*

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

*Defined in [src/apis/avm/ops.ts:438](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L438)*

Popuates the instance from a [Buffer](https://github.com/feross/buffer) representing the [NFTMintOperation](api_avm_operations.nftmintoperation.md) and returns the updated offset.

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

*Defined in [src/apis/avm/ops.ts:408](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L408)*

Returns the credential ID.

**Returns:** *number*

___

###  getOperationID

▸ **getOperationID**(): *number*

*Overrides [Operation](api_avm_operations.operation.md).[getOperationID](api_avm_operations.operation.md#abstract-getoperationid)*

*Defined in [src/apis/avm/ops.ts:401](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L401)*

Returns the operation ID.

**Returns:** *number*

___

###  getOutputOwners

▸ **getOutputOwners**(): *Array‹[OutputOwners](common_output.outputowners.md)›*

*Defined in [src/apis/avm/ops.ts:431](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L431)*

Returns the outputOwners.

**Returns:** *Array‹[OutputOwners](common_output.outputowners.md)›*

___

###  getPayload

▸ **getPayload**(): *Buffer*

*Defined in [src/apis/avm/ops.ts:415](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L415)*

Returns the payload.

**Returns:** *Buffer*

___

###  getPayloadBuffer

▸ **getPayloadBuffer**(): *Buffer*

*Defined in [src/apis/avm/ops.ts:422](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L422)*

Returns the payload's raw [Buffer](https://github.com/feross/buffer) with length prepended, for use with [PayloadBase](utils_payload.payloadbase.md)'s fromBuffer

**Returns:** *Buffer*

___

###  getSigIdxs

▸ **getSigIdxs**(): *Array‹[SigIdx](common_signature.sigidx.md)›*

*Inherited from [Operation](api_avm_operations.operation.md).[getSigIdxs](api_avm_operations.operation.md#getsigidxs)*

*Defined in [src/apis/avm/ops.ts:83](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L83)*

Returns the array of [SigIdx](common_signature.sigidx.md) for this [Operation](api_avm_operations.operation.md)

**Returns:** *Array‹[SigIdx](common_signature.sigidx.md)›*

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

*Defined in [src/apis/avm/ops.ts:372](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L372)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Overrides [Operation](api_avm_operations.operation.md).[toBuffer](api_avm_operations.operation.md#tobuffer)*

*Defined in [src/apis/avm/ops.ts:460](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L460)*

Returns the buffer representing the [NFTMintOperation](api_avm_operations.nftmintoperation.md) instance.

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Overrides [Operation](api_avm_operations.operation.md).[toString](api_avm_operations.operation.md#tostring)*

*Defined in [src/apis/avm/ops.ts:495](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L495)*

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
