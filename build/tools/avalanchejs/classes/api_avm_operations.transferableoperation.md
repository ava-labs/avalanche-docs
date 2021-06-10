[avalanche](../README.md) › [API-AVM-Operations](../modules/api_avm_operations.md) › [TransferableOperation](api_avm_operations.transferableoperation.md)

# Class: TransferableOperation

A class which contains an [Operation](api_avm_operations.operation.md) for transfers.

## Hierarchy

* [Serializable](utils_serialization.serializable.md)

  ↳ **TransferableOperation**

## Index

### Constructors

* [constructor](api_avm_operations.transferableoperation.md#constructor)

### Properties

* [_codecID](api_avm_operations.transferableoperation.md#protected-_codecid)
* [_typeID](api_avm_operations.transferableoperation.md#protected-_typeid)
* [_typeName](api_avm_operations.transferableoperation.md#protected-_typename)
* [assetid](api_avm_operations.transferableoperation.md#protected-assetid)
* [operation](api_avm_operations.transferableoperation.md#protected-operation)
* [utxoIDs](api_avm_operations.transferableoperation.md#protected-utxoids)

### Methods

* [deserialize](api_avm_operations.transferableoperation.md#deserialize)
* [fromBuffer](api_avm_operations.transferableoperation.md#frombuffer)
* [getAssetID](api_avm_operations.transferableoperation.md#getassetid)
* [getCodecID](api_avm_operations.transferableoperation.md#getcodecid)
* [getOperation](api_avm_operations.transferableoperation.md#getoperation)
* [getTypeID](api_avm_operations.transferableoperation.md#gettypeid)
* [getTypeName](api_avm_operations.transferableoperation.md#gettypename)
* [getUTXOIDs](api_avm_operations.transferableoperation.md#getutxoids)
* [serialize](api_avm_operations.transferableoperation.md#serialize)
* [toBuffer](api_avm_operations.transferableoperation.md#tobuffer)
* [comparator](api_avm_operations.transferableoperation.md#static-comparator)

## Constructors

###  constructor

\+ **new TransferableOperation**(`assetid`: Buffer, `utxoids`: Array‹[UTXOID](api_avm_operations.utxoid.md) | string | Buffer›, `operation`: [Operation](api_avm_operations.operation.md)): *[TransferableOperation](api_avm_operations.transferableoperation.md)*

*Defined in [src/apis/avm/ops.ts:238](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/ops.ts#L238)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`assetid` | Buffer | undefined |
`utxoids` | Array‹[UTXOID](api_avm_operations.utxoid.md) &#124; string &#124; Buffer› | undefined |
`operation` | [Operation](api_avm_operations.operation.md) | undefined |

**Returns:** *[TransferableOperation](api_avm_operations.transferableoperation.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [Serializable](utils_serialization.serializable.md).[_codecID](utils_serialization.serializable.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:42](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/serialization.ts#L42)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [Serializable](utils_serialization.serializable.md).[_typeID](utils_serialization.serializable.md#protected-_typeid)*

*Defined in [src/apis/avm/ops.ts:152](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/ops.ts#L152)*

___

### `Protected` _typeName

• **_typeName**: *string* = "TransferableOperation"

*Overrides [Serializable](utils_serialization.serializable.md).[_typeName](utils_serialization.serializable.md#protected-_typename)*

*Defined in [src/apis/avm/ops.ts:151](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/ops.ts#L151)*

___

### `Protected` assetid

• **assetid**: *Buffer* = Buffer.alloc(32)

*Defined in [src/apis/avm/ops.ts:175](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/ops.ts#L175)*

___

### `Protected` operation

• **operation**: *[Operation](api_avm_operations.operation.md)*

*Defined in [src/apis/avm/ops.ts:177](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/ops.ts#L177)*

___

### `Protected` utxoIDs

• **utxoIDs**: *Array‹[UTXOID](api_avm_operations.utxoid.md)›* = []

*Defined in [src/apis/avm/ops.ts:176](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/ops.ts#L176)*

## Methods

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Overrides [Serializable](utils_serialization.serializable.md).[deserialize](utils_serialization.serializable.md#deserialize)*

*Defined in [src/apis/avm/ops.ts:163](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/ops.ts#L163)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Defined in [src/apis/avm/ops.ts:202](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/ops.ts#L202)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`bytes` | Buffer | - |
`offset` | number | 0 |

**Returns:** *number*

___

###  getAssetID

▸ **getAssetID**(): *Buffer*

*Defined in [src/apis/avm/ops.ts:190](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/ops.ts#L190)*

Returns the assetID as a [Buffer](https://github.com/feross/buffer).

**Returns:** *Buffer*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Inherited from [Serializable](utils_serialization.serializable.md).[getCodecID](utils_serialization.serializable.md#getcodecid)*

*Defined in [src/utils/serialization.ts:61](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/serialization.ts#L61)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getOperation

▸ **getOperation**(): *[Operation](api_avm_operations.operation.md)*

*Defined in [src/apis/avm/ops.ts:200](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/ops.ts#L200)*

Returns the operation

**Returns:** *[Operation](api_avm_operations.operation.md)*

___

###  getTypeID

▸ **getTypeID**(): *number*

*Inherited from [Serializable](utils_serialization.serializable.md).[getTypeID](utils_serialization.serializable.md#gettypeid)*

*Defined in [src/utils/serialization.ts:54](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/serialization.ts#L54)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getTypeName

▸ **getTypeName**(): *string*

*Inherited from [Serializable](utils_serialization.serializable.md).[getTypeName](utils_serialization.serializable.md#gettypename)*

*Defined in [src/utils/serialization.ts:47](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/serialization.ts#L47)*

Used in serialization. TypeName is a string name for the type of object being output.

**Returns:** *string*

___

###  getUTXOIDs

▸ **getUTXOIDs**(): *Array‹[UTXOID](api_avm_operations.utxoid.md)›*

*Defined in [src/apis/avm/ops.ts:195](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/ops.ts#L195)*

Returns an array of UTXOIDs in this operation.

**Returns:** *Array‹[UTXOID](api_avm_operations.utxoid.md)›*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *object*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/apis/avm/ops.ts:154](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/ops.ts#L154)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Defined in [src/apis/avm/ops.ts:219](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/ops.ts#L219)*

**Returns:** *Buffer*

___

### `Static` comparator

▸ **comparator**(): *function*

*Defined in [src/apis/avm/ops.ts:182](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/ops.ts#L182)*

Returns a function used to sort an array of [TransferableOperation](api_avm_operations.transferableoperation.md)s

**Returns:** *function*

▸ (`a`: [TransferableOperation](api_avm_operations.transferableoperation.md), `b`: [TransferableOperation](api_avm_operations.transferableoperation.md)): *1 | -1 | 0*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [TransferableOperation](api_avm_operations.transferableoperation.md) |
`b` | [TransferableOperation](api_avm_operations.transferableoperation.md) |
