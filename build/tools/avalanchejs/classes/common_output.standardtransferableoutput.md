[avalanche](../README.md) › [Common-Output](../modules/common_output.md) › [StandardTransferableOutput](common_output.standardtransferableoutput.md)

# Class: StandardTransferableOutput

## Hierarchy

  ↳ [StandardParseableOutput](common_output.standardparseableoutput.md)

  ↳ **StandardTransferableOutput**

  ↳ [TransferableOutput](api_platformvm_outputs.transferableoutput.md)

  ↳ [TransferableOutput](api_avm_outputs.transferableoutput.md)

  ↳ [TransferableOutput](api_evm_outputs.transferableoutput.md)

## Index

### Constructors

* [constructor](common_output.standardtransferableoutput.md#constructor)

### Properties

* [_codecID](common_output.standardtransferableoutput.md#protected-_codecid)
* [_typeID](common_output.standardtransferableoutput.md#protected-_typeid)
* [_typeName](common_output.standardtransferableoutput.md#protected-_typename)
* [assetID](common_output.standardtransferableoutput.md#protected-assetid)
* [output](common_output.standardtransferableoutput.md#protected-output)

### Methods

* [deserialize](common_output.standardtransferableoutput.md#deserialize)
* [fromBuffer](common_output.standardtransferableoutput.md#abstract-frombuffer)
* [getAssetID](common_output.standardtransferableoutput.md#getassetid)
* [getCodecID](common_output.standardtransferableoutput.md#getcodecid)
* [getOutput](common_output.standardtransferableoutput.md#getoutput)
* [getTypeID](common_output.standardtransferableoutput.md#gettypeid)
* [getTypeName](common_output.standardtransferableoutput.md#gettypename)
* [serialize](common_output.standardtransferableoutput.md#serialize)
* [toBuffer](common_output.standardtransferableoutput.md#tobuffer)
* [comparator](common_output.standardtransferableoutput.md#static-comparator)

## Constructors

###  constructor

\+ **new StandardTransferableOutput**(`assetID`: Buffer, `output`: [Output](common_output.output.md)): *[StandardTransferableOutput](common_output.standardtransferableoutput.md)*

*Overrides [ParseableOutput](api_platformvm_outputs.parseableoutput.md).[constructor](api_platformvm_outputs.parseableoutput.md#constructor)*

*Defined in [src/common/output.ts:410](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L410)*

Class representing an [StandardTransferableOutput](common_output.standardtransferableoutput.md) for a transaction.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`assetID` | Buffer | undefined | A [Buffer](https://github.com/feross/buffer) representing the assetID of the [Output](common_output.output.md) |
`output` | [Output](common_output.output.md) | undefined | A number representing the InputID of the [StandardTransferableOutput](common_output.standardtransferableoutput.md)  |

**Returns:** *[StandardTransferableOutput](common_output.standardtransferableoutput.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:40](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L40)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [StandardParseableOutput](common_output.standardparseableoutput.md).[_typeID](common_output.standardparseableoutput.md#protected-_typeid)*

*Defined in [src/common/output.ts:385](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L385)*

___

### `Protected` _typeName

• **_typeName**: *string* = "StandardTransferableOutput"

*Overrides [StandardParseableOutput](common_output.standardparseableoutput.md).[_typeName](common_output.standardparseableoutput.md#protected-_typename)*

*Defined in [src/common/output.ts:384](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L384)*

___

### `Protected` assetID

• **assetID**: *Buffer* = undefined

*Defined in [src/common/output.ts:399](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L399)*

___

### `Protected` output

• **output**: *[Output](common_output.output.md)*

*Inherited from [TransferableOutput](api_platformvm_outputs.transferableoutput.md).[output](api_platformvm_outputs.transferableoutput.md#protected-output)*

*Defined in [src/common/output.ts:346](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L346)*

## Methods

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[deserialize](common_inputs.standardparseableinput.md#deserialize)*

*Defined in [src/common/output.ts:394](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L394)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *void*

___

### `Abstract` fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset?`: number): *number*

*Overrides [StandardParseableOutput](common_output.standardparseableoutput.md).[fromBuffer](common_output.standardparseableoutput.md#abstract-frombuffer)*

*Defined in [src/common/output.ts:404](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L404)*

**Parameters:**

Name | Type |
------ | ------ |
`bytes` | Buffer |
`offset?` | number |

**Returns:** *number*

___

###  getAssetID

▸ **getAssetID**(): *Buffer*

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
