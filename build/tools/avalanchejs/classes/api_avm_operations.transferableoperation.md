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
* [assetID](api_avm_operations.transferableoperation.md#protected-assetid)
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

\+ **new TransferableOperation**(`assetID`: Buffer, `utxoids`: [UTXOID](api_avm_operations.utxoid.md)[] | string[] | Buffer[], `operation`: [Operation](api_avm_operations.operation.md)): *[TransferableOperation](api_avm_operations.transferableoperation.md)*

*Defined in [src/apis/avm/ops.ts:242](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L242)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`assetID` | Buffer | undefined |
`utxoids` | [UTXOID](api_avm_operations.utxoid.md)[] &#124; string[] &#124; Buffer[] | undefined |
`operation` | [Operation](api_avm_operations.operation.md) | undefined |

**Returns:** *[TransferableOperation](api_avm_operations.transferableoperation.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:40](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L40)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [Serializable](utils_serialization.serializable.md).[_typeID](utils_serialization.serializable.md#protected-_typeid)*

*Defined in [src/apis/avm/ops.ts:156](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L156)*

___

### `Protected` _typeName

• **_typeName**: *string* = "TransferableOperation"

*Overrides [Serializable](utils_serialization.serializable.md).[_typeName](utils_serialization.serializable.md#protected-_typename)*

*Defined in [src/apis/avm/ops.ts:155](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L155)*

___

### `Protected` assetID

• **assetID**: *Buffer* = Buffer.alloc(32)

*Defined in [src/apis/avm/ops.ts:179](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L179)*

___

### `Protected` operation

• **operation**: *[Operation](api_avm_operations.operation.md)*

*Defined in [src/apis/avm/ops.ts:181](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L181)*

___

### `Protected` utxoIDs

• **utxoIDs**: *[UTXOID](api_avm_operations.utxoid.md)[]* = []

*Defined in [src/apis/avm/ops.ts:180](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L180)*

## Methods

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[deserialize](common_inputs.standardparseableinput.md#deserialize)*

*Defined in [src/apis/avm/ops.ts:167](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L167)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Defined in [src/apis/avm/ops.ts:206](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L206)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`bytes` | Buffer | - |
`offset` | number | 0 |

**Returns:** *number*

___

###  getAssetID

▸ **getAssetID**(): *Buffer*

*Defined in [src/apis/avm/ops.ts:194](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L194)*

Returns the assetID as a [Buffer](https://github.com/feross/buffer).

**Returns:** *Buffer*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Inherited from [SigIdx](common_signature.sigidx.md).[getCodecID](common_signature.sigidx.md#getcodecid)*

*Defined in [src/utils/serialization.ts:59](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L59)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getOperation

▸ **getOperation**(): *[Operation](api_avm_operations.operation.md)*

*Defined in [src/apis/avm/ops.ts:204](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L204)*

Returns the operation

**Returns:** *[Operation](api_avm_operations.operation.md)*

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

###  getUTXOIDs

▸ **getUTXOIDs**(): *[UTXOID](api_avm_operations.utxoid.md)[]*

*Defined in [src/apis/avm/ops.ts:199](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L199)*

Returns an array of UTXOIDs in this operation.

**Returns:** *[UTXOID](api_avm_operations.utxoid.md)[]*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *object*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/apis/avm/ops.ts:158](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L158)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Defined in [src/apis/avm/ops.ts:223](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L223)*

**Returns:** *Buffer*

___

### `Static` comparator

▸ **comparator**(): *function*

*Defined in [src/apis/avm/ops.ts:186](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/ops.ts#L186)*

Returns a function used to sort an array of [TransferableOperation](api_avm_operations.transferableoperation.md)s

**Returns:** *function*

▸ (`a`: [TransferableOperation](api_avm_operations.transferableoperation.md), `b`: [TransferableOperation](api_avm_operations.transferableoperation.md)): *1 | -1 | 0*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [TransferableOperation](api_avm_operations.transferableoperation.md) |
`b` | [TransferableOperation](api_avm_operations.transferableoperation.md) |
