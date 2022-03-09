[avalanche](../README.md) › [API-AVM-Outputs](../modules/api_avm_outputs.md) › [TransferableOutput](api_avm_outputs.transferableoutput.md)

# Class: TransferableOutput

## Hierarchy

  ↳ [StandardTransferableOutput](common_output.standardtransferableoutput.md)

  ↳ **TransferableOutput**

## Index

### Constructors

* [constructor](api_avm_outputs.transferableoutput.md#constructor)

### Properties

* [_codecID](api_avm_outputs.transferableoutput.md#protected-_codecid)
* [_typeID](api_avm_outputs.transferableoutput.md#protected-_typeid)
* [_typeName](api_avm_outputs.transferableoutput.md#protected-_typename)
* [assetID](api_avm_outputs.transferableoutput.md#protected-assetid)
* [output](api_avm_outputs.transferableoutput.md#protected-output)

### Methods

* [deserialize](api_avm_outputs.transferableoutput.md#deserialize)
* [fromBuffer](api_avm_outputs.transferableoutput.md#frombuffer)
* [getAssetID](api_avm_outputs.transferableoutput.md#getassetid)
* [getCodecID](api_avm_outputs.transferableoutput.md#getcodecid)
* [getOutput](api_avm_outputs.transferableoutput.md#getoutput)
* [getTypeID](api_avm_outputs.transferableoutput.md#gettypeid)
* [getTypeName](api_avm_outputs.transferableoutput.md#gettypename)
* [sanitizeObject](api_avm_outputs.transferableoutput.md#sanitizeobject)
* [serialize](api_avm_outputs.transferableoutput.md#serialize)
* [toBuffer](api_avm_outputs.transferableoutput.md#tobuffer)
* [comparator](api_avm_outputs.transferableoutput.md#static-comparator)

## Constructors

###  constructor

\+ **new TransferableOutput**(`assetID`: Buffer, `output`: [Output](common_output.output.md)): *[TransferableOutput](api_avm_outputs.transferableoutput.md)*

*Inherited from [StandardTransferableOutput](common_output.standardtransferableoutput.md).[constructor](common_output.standardtransferableoutput.md#constructor)*

*Overrides [StandardParseableOutput](common_output.standardparseableoutput.md).[constructor](common_output.standardparseableoutput.md#constructor)*

*Defined in [src/common/output.ts:486](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L486)*

Class representing an [StandardTransferableOutput](../modules/src_common.md#standardtransferableoutput) for a transaction.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`assetID` | Buffer | undefined | A [Buffer](https://github.com/feross/buffer) representing the assetID of the [Output](../modules/src_common.md#output) |
`output` | [Output](common_output.output.md) | undefined | A number representing the InputID of the [StandardTransferableOutput](../modules/src_common.md#standardtransferableoutput)  |

**Returns:** *[TransferableOutput](api_avm_outputs.transferableoutput.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:51](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L51)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [StandardTransferableOutput](common_output.standardtransferableoutput.md).[_typeID](common_output.standardtransferableoutput.md#protected-_typeid)*

*Defined in [src/apis/avm/outputs.ts:57](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/outputs.ts#L57)*

___

### `Protected` _typeName

• **_typeName**: *string* = "TransferableOutput"

*Overrides [StandardTransferableOutput](common_output.standardtransferableoutput.md).[_typeName](common_output.standardtransferableoutput.md#protected-_typename)*

*Defined in [src/apis/avm/outputs.ts:56](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/outputs.ts#L56)*

___

### `Protected` assetID

• **assetID**: *Buffer* = undefined

*Inherited from [StandardTransferableOutput](common_output.standardtransferableoutput.md).[assetID](common_output.standardtransferableoutput.md#protected-assetid)*

*Defined in [src/common/output.ts:475](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L475)*

___

### `Protected` output

• **output**: *[Output](common_output.output.md)*

*Inherited from [StandardParseableOutput](common_output.standardparseableoutput.md).[output](common_output.standardparseableoutput.md#protected-output)*

*Defined in [src/common/output.ts:411](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L411)*

## Methods

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Overrides [StandardTransferableOutput](common_output.standardtransferableoutput.md).[deserialize](common_output.standardtransferableoutput.md#deserialize)*

*Defined in [src/apis/avm/outputs.ts:61](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/outputs.ts#L61)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Overrides [StandardTransferableOutput](common_output.standardtransferableoutput.md).[fromBuffer](common_output.standardtransferableoutput.md#abstract-frombuffer)*

*Defined in [src/apis/avm/outputs.ts:67](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/outputs.ts#L67)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`bytes` | Buffer | - |
`offset` | number | 0 |

**Returns:** *number*

___

###  getAssetID

▸ **getAssetID**(): *Buffer*

*Inherited from [StandardTransferableOutput](common_output.standardtransferableoutput.md).[getAssetID](common_output.standardtransferableoutput.md#getassetid)*

*Defined in [src/common/output.ts:477](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L477)*

**Returns:** *Buffer*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Inherited from [SigIdx](common_signature.sigidx.md).[getCodecID](common_signature.sigidx.md#getcodecid)*

*Defined in [src/utils/serialization.ts:70](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L70)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getOutput

▸ **getOutput**(): *[Output](common_output.output.md)*

*Inherited from [StandardParseableOutput](common_output.standardparseableoutput.md).[getOutput](common_output.standardparseableoutput.md#getoutput)*

*Defined in [src/common/output.ts:427](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L427)*

**Returns:** *[Output](common_output.output.md)*

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

*Inherited from [StandardTransferableOutput](common_output.standardtransferableoutput.md).[serialize](common_output.standardtransferableoutput.md#serialize)*

*Overrides [StandardParseableOutput](common_output.standardparseableoutput.md).[serialize](common_output.standardparseableoutput.md#serialize)*

*Defined in [src/common/output.ts:457](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L457)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Inherited from [StandardTransferableOutput](common_output.standardtransferableoutput.md).[toBuffer](common_output.standardtransferableoutput.md#tobuffer)*

*Overrides [StandardParseableOutput](common_output.standardparseableoutput.md).[toBuffer](common_output.standardparseableoutput.md#tobuffer)*

*Defined in [src/common/output.ts:482](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L482)*

**Returns:** *Buffer*

___

### `Static` comparator

▸ **comparator**(): *function*

*Inherited from [StandardParseableOutput](common_output.standardparseableoutput.md).[comparator](common_output.standardparseableoutput.md#static-comparator)*

*Defined in [src/common/output.ts:416](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L416)*

Returns a function used to sort an array of [ParseableOutput](api_platformvm_outputs.parseableoutput.md)s

**Returns:** *function*

▸ (`a`: [StandardParseableOutput](common_output.standardparseableoutput.md), `b`: [StandardParseableOutput](common_output.standardparseableoutput.md)): *1 | -1 | 0*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [StandardParseableOutput](common_output.standardparseableoutput.md) |
`b` | [StandardParseableOutput](common_output.standardparseableoutput.md) |
