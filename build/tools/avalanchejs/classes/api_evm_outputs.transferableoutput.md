[avalanche](../README.md) › [API-EVM-Outputs](../modules/api_evm_outputs.md) › [TransferableOutput](api_evm_outputs.transferableoutput.md)

# Class: TransferableOutput

## Hierarchy

  ↳ [StandardTransferableOutput](common_output.standardtransferableoutput.md)

  ↳ **TransferableOutput**

## Index

### Constructors

* [constructor](api_evm_outputs.transferableoutput.md#constructor)

### Properties

* [_codecID](api_evm_outputs.transferableoutput.md#protected-_codecid)
* [_typeID](api_evm_outputs.transferableoutput.md#protected-_typeid)
* [_typeName](api_evm_outputs.transferableoutput.md#protected-_typename)
* [assetID](api_evm_outputs.transferableoutput.md#protected-assetid)
* [output](api_evm_outputs.transferableoutput.md#protected-output)

### Methods

* [deserialize](api_evm_outputs.transferableoutput.md#deserialize)
* [fromBuffer](api_evm_outputs.transferableoutput.md#frombuffer)
* [getAssetID](api_evm_outputs.transferableoutput.md#getassetid)
* [getCodecID](api_evm_outputs.transferableoutput.md#getcodecid)
* [getOutput](api_evm_outputs.transferableoutput.md#getoutput)
* [getTypeID](api_evm_outputs.transferableoutput.md#gettypeid)
* [getTypeName](api_evm_outputs.transferableoutput.md#gettypename)
* [serialize](api_evm_outputs.transferableoutput.md#serialize)
* [toBuffer](api_evm_outputs.transferableoutput.md#tobuffer)
* [comparator](api_evm_outputs.transferableoutput.md#static-comparator)

## Constructors

###  constructor

\+ **new TransferableOutput**(`assetID`: Buffer, `output`: [Output](common_output.output.md)): *[TransferableOutput](api_evm_outputs.transferableoutput.md)*

*Inherited from [TransferableOutput](api_platformvm_outputs.transferableoutput.md).[constructor](api_platformvm_outputs.transferableoutput.md#constructor)*

*Overrides [ParseableOutput](api_platformvm_outputs.parseableoutput.md).[constructor](api_platformvm_outputs.parseableoutput.md#constructor)*

*Defined in [src/common/output.ts:410](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L410)*

Class representing an [StandardTransferableOutput](../modules/src_common.md#standardtransferableoutput) for a transaction.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`assetID` | Buffer | undefined | A [Buffer](https://github.com/feross/buffer) representing the assetID of the [Output](../modules/src_common.md#output) |
`output` | [Output](common_output.output.md) | undefined | A number representing the InputID of the [StandardTransferableOutput](../modules/src_common.md#standardtransferableoutput)  |

**Returns:** *[TransferableOutput](api_evm_outputs.transferableoutput.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:40](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L40)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [StandardTransferableOutput](common_output.standardtransferableoutput.md).[_typeID](common_output.standardtransferableoutput.md#protected-_typeid)*

*Defined in [src/apis/evm/outputs.ts:32](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/evm/outputs.ts#L32)*

___

### `Protected` _typeName

• **_typeName**: *string* = "TransferableOutput"

*Overrides [StandardTransferableOutput](common_output.standardtransferableoutput.md).[_typeName](common_output.standardtransferableoutput.md#protected-_typename)*

*Defined in [src/apis/evm/outputs.ts:31](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/evm/outputs.ts#L31)*

___

### `Protected` assetID

• **assetID**: *Buffer* = undefined

*Inherited from [TransferableOutput](api_platformvm_outputs.transferableoutput.md).[assetID](api_platformvm_outputs.transferableoutput.md#protected-assetid)*

*Defined in [src/common/output.ts:399](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L399)*

___

### `Protected` output

• **output**: *[Output](common_output.output.md)*

*Inherited from [TransferableOutput](api_platformvm_outputs.transferableoutput.md).[output](api_platformvm_outputs.transferableoutput.md#protected-output)*

*Defined in [src/common/output.ts:346](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L346)*

## Methods

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Overrides [StandardTransferableOutput](common_output.standardtransferableoutput.md).[deserialize](common_output.standardtransferableoutput.md#deserialize)*

*Defined in [src/apis/evm/outputs.ts:36](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/evm/outputs.ts#L36)*

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

*Defined in [src/apis/evm/outputs.ts:42](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/evm/outputs.ts#L42)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`bytes` | Buffer | - |
`offset` | number | 0 |

**Returns:** *number*

___

###  getAssetID

▸ **getAssetID**(): *Buffer*

*Inherited from [TransferableOutput](api_platformvm_outputs.transferableoutput.md).[getAssetID](api_platformvm_outputs.transferableoutput.md#getassetid)*

*Defined in [src/common/output.ts:401](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L401)*

**Returns:** *Buffer*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Inherited from [SigIdx](common_signature.sigidx.md).[getCodecID](common_signature.sigidx.md#getcodecid)*

*Defined in [src/utils/serialization.ts:59](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L59)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getOutput

▸ **getOutput**(): *[Output](common_output.output.md)*

*Inherited from [TransferableOutput](api_platformvm_outputs.transferableoutput.md).[getOutput](api_platformvm_outputs.transferableoutput.md#getoutput)*

*Defined in [src/common/output.ts:357](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L357)*

**Returns:** *[Output](common_output.output.md)*

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

*Inherited from [TransferableOutput](api_platformvm_outputs.transferableoutput.md).[serialize](api_platformvm_outputs.transferableoutput.md#serialize)*

*Overrides [ParseableOutput](api_platformvm_outputs.parseableoutput.md).[serialize](api_platformvm_outputs.parseableoutput.md#serialize)*

*Defined in [src/common/output.ts:387](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L387)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Inherited from [TransferableOutput](api_platformvm_outputs.transferableoutput.md).[toBuffer](api_platformvm_outputs.transferableoutput.md#tobuffer)*

*Overrides [ParseableOutput](api_platformvm_outputs.parseableoutput.md).[toBuffer](api_platformvm_outputs.parseableoutput.md#tobuffer)*

*Defined in [src/common/output.ts:406](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L406)*

**Returns:** *Buffer*

___

### `Static` comparator

▸ **comparator**(): *function*

*Inherited from [TransferableOutput](api_platformvm_outputs.transferableoutput.md).[comparator](api_platformvm_outputs.transferableoutput.md#static-comparator)*

*Defined in [src/common/output.ts:351](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L351)*

Returns a function used to sort an array of [ParseableOutput](api_platformvm_outputs.parseableoutput.md)s

**Returns:** *function*

▸ (`a`: [StandardParseableOutput](common_output.standardparseableoutput.md), `b`: [StandardParseableOutput](common_output.standardparseableoutput.md)): *1 | -1 | 0*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [StandardParseableOutput](common_output.standardparseableoutput.md) |
`b` | [StandardParseableOutput](common_output.standardparseableoutput.md) |
