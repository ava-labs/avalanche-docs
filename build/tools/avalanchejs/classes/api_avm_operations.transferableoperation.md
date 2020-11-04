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

* [_typeID](api_avm_operations.transferableoperation.md#protected-_typeid)
* [_typeName](api_avm_operations.transferableoperation.md#protected-_typename)
* [assetid](api_avm_operations.transferableoperation.md#protected-assetid)
* [operation](api_avm_operations.transferableoperation.md#protected-operation)
* [utxoIDs](api_avm_operations.transferableoperation.md#protected-utxoids)

### Methods

* [deserialize](api_avm_operations.transferableoperation.md#deserialize)
* [fromBuffer](api_avm_operations.transferableoperation.md#frombuffer)
* [getAssetID](api_avm_operations.transferableoperation.md#getassetid)
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

*Defined in [src/apis/avm/ops.ts:234](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L234)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`assetid` | Buffer | undefined |
`utxoids` | Array‹[UTXOID](api_avm_operations.utxoid.md) &#124; string &#124; Buffer› | undefined |
`operation` | [Operation](api_avm_operations.operation.md) | undefined |

**Returns:** *[TransferableOperation](api_avm_operations.transferableoperation.md)*

## Properties

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [Serializable](utils_serialization.serializable.md).[_typeID](utils_serialization.serializable.md#protected-_typeid)*

*Defined in [src/apis/avm/ops.ts:148](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L148)*

___

### `Protected` _typeName

• **_typeName**: *string* = "TransferableOperation"

*Overrides [Serializable](utils_serialization.serializable.md).[_typeName](utils_serialization.serializable.md#protected-_typename)*

*Defined in [src/apis/avm/ops.ts:147](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L147)*

___

### `Protected` assetid

• **assetid**: *Buffer* = Buffer.alloc(32)

*Defined in [src/apis/avm/ops.ts:171](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L171)*

___

### `Protected` operation

• **operation**: *[Operation](api_avm_operations.operation.md)*

*Defined in [src/apis/avm/ops.ts:173](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L173)*

___

### `Protected` utxoIDs

• **utxoIDs**: *Array‹[UTXOID](api_avm_operations.utxoid.md)›* = []

*Defined in [src/apis/avm/ops.ts:172](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L172)*

## Methods

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Overrides [Serializable](utils_serialization.serializable.md).[deserialize](utils_serialization.serializable.md#deserialize)*

*Defined in [src/apis/avm/ops.ts:159](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L159)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Defined in [src/apis/avm/ops.ts:198](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L198)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`bytes` | Buffer | - |
`offset` | number | 0 |

**Returns:** *number*

___

###  getAssetID

▸ **getAssetID**(): *Buffer*

*Defined in [src/apis/avm/ops.ts:186](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L186)*

Returns the assetID as a [Buffer](https://github.com/feross/buffer).

**Returns:** *Buffer*

___

###  getOperation

▸ **getOperation**(): *[Operation](api_avm_operations.operation.md)*

*Defined in [src/apis/avm/ops.ts:196](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L196)*

Returns the operation

**Returns:** *[Operation](api_avm_operations.operation.md)*

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

###  getUTXOIDs

▸ **getUTXOIDs**(): *Array‹[UTXOID](api_avm_operations.utxoid.md)›*

*Defined in [src/apis/avm/ops.ts:191](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L191)*

Returns an array of UTXOIDs in this operation.

**Returns:** *Array‹[UTXOID](api_avm_operations.utxoid.md)›*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *object*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/apis/avm/ops.ts:150](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L150)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Defined in [src/apis/avm/ops.ts:215](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L215)*

**Returns:** *Buffer*

___

### `Static` comparator

▸ **comparator**(): *function*

*Defined in [src/apis/avm/ops.ts:178](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/ops.ts#L178)*

Returns a function used to sort an array of [TransferableOperation](api_avm_operations.transferableoperation.md)s

**Returns:** *function*

▸ (`a`: [TransferableOperation](api_avm_operations.transferableoperation.md), `b`: [TransferableOperation](api_avm_operations.transferableoperation.md)): *0 | 1 | -1*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [TransferableOperation](api_avm_operations.transferableoperation.md) |
`b` | [TransferableOperation](api_avm_operations.transferableoperation.md) |
