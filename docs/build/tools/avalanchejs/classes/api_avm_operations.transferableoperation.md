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
* [sanitizeObject](api_avm_operations.transferableoperation.md#sanitizeobject)
* [serialize](api_avm_operations.transferableoperation.md#serialize)
* [toBuffer](api_avm_operations.transferableoperation.md#tobuffer)
* [comparator](api_avm_operations.transferableoperation.md#static-comparator)

## Constructors

###  constructor

\+ **new TransferableOperation**(`assetID`: Buffer, `utxoids`: [UTXOID](api_avm_operations.utxoid.md)[] | string[] | Buffer[], `operation`: [Operation](api_avm_operations.operation.md)): *[TransferableOperation](api_avm_operations.transferableoperation.md)*

*Defined in [src/apis/avm/ops.ts:289](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L289)*

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

*Defined in [src/utils/serialization.ts:51](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L51)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [Serializable](utils_serialization.serializable.md).[_typeID](utils_serialization.serializable.md#protected-_typeid)*

*Defined in [src/apis/avm/ops.ts:187](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L187)*

___

### `Protected` _typeName

• **_typeName**: *string* = "TransferableOperation"

*Overrides [Serializable](utils_serialization.serializable.md).[_typeName](utils_serialization.serializable.md#protected-_typename)*

*Defined in [src/apis/avm/ops.ts:186](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L186)*

___

### `Protected` assetID

• **assetID**: *Buffer* = Buffer.alloc(32)

*Defined in [src/apis/avm/ops.ts:216](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L216)*

___

### `Protected` operation

• **operation**: *[Operation](api_avm_operations.operation.md)*

*Defined in [src/apis/avm/ops.ts:218](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L218)*

___

### `Protected` utxoIDs

• **utxoIDs**: *[UTXOID](api_avm_operations.utxoid.md)[]* = []

*Defined in [src/apis/avm/ops.ts:217](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L217)*

## Methods

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[deserialize](common_inputs.standardparseableinput.md#deserialize)*

*Defined in [src/apis/avm/ops.ts:198](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L198)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Defined in [src/apis/avm/ops.ts:249](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L249)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`bytes` | Buffer | - |
`offset` | number | 0 |

**Returns:** *number*

___

###  getAssetID

▸ **getAssetID**(): *Buffer*

*Defined in [src/apis/avm/ops.ts:237](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L237)*

Returns the assetID as a [Buffer](https://github.com/feross/buffer).

**Returns:** *Buffer*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Inherited from [SigIdx](common_signature.sigidx.md).[getCodecID](common_signature.sigidx.md#getcodecid)*

*Defined in [src/utils/serialization.ts:70](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L70)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getOperation

▸ **getOperation**(): *[Operation](api_avm_operations.operation.md)*

*Defined in [src/apis/avm/ops.ts:247](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L247)*

Returns the operation

**Returns:** *[Operation](api_avm_operations.operation.md)*

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

###  getUTXOIDs

▸ **getUTXOIDs**(): *[UTXOID](api_avm_operations.utxoid.md)[]*

*Defined in [src/apis/avm/ops.ts:242](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L242)*

Returns an array of UTXOIDs in this operation.

**Returns:** *[UTXOID](api_avm_operations.utxoid.md)[]*

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

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/apis/avm/ops.ts:189](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L189)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Defined in [src/apis/avm/ops.ts:270](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L270)*

**Returns:** *Buffer*

___

### `Static` comparator

▸ **comparator**(): *function*

*Defined in [src/apis/avm/ops.ts:223](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/ops.ts#L223)*

Returns a function used to sort an array of [TransferableOperation](api_avm_operations.transferableoperation.md)s

**Returns:** *function*

▸ (`a`: [TransferableOperation](api_avm_operations.transferableoperation.md), `b`: [TransferableOperation](api_avm_operations.transferableoperation.md)): *1 | -1 | 0*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [TransferableOperation](api_avm_operations.transferableoperation.md) |
`b` | [TransferableOperation](api_avm_operations.transferableoperation.md) |
