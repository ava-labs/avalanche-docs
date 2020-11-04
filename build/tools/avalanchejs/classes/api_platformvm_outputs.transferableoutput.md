[avalanche](../README.md) › [API-PlatformVM-Outputs](../modules/api_platformvm_outputs.md) › [TransferableOutput](api_platformvm_outputs.transferableoutput.md)

# Class: TransferableOutput

## Hierarchy

  ↳ [StandardTransferableOutput](common_output.standardtransferableoutput.md)

  ↳ **TransferableOutput**

## Index

### Constructors

* [constructor](api_platformvm_outputs.transferableoutput.md#constructor)

### Properties

* [_typeID](api_platformvm_outputs.transferableoutput.md#protected-_typeid)
* [_typeName](api_platformvm_outputs.transferableoutput.md#protected-_typename)
* [assetID](api_platformvm_outputs.transferableoutput.md#protected-assetid)
* [output](api_platformvm_outputs.transferableoutput.md#protected-output)

### Methods

* [deserialize](api_platformvm_outputs.transferableoutput.md#deserialize)
* [fromBuffer](api_platformvm_outputs.transferableoutput.md#frombuffer)
* [getAssetID](api_platformvm_outputs.transferableoutput.md#getassetid)
* [getOutput](api_platformvm_outputs.transferableoutput.md#getoutput)
* [getTypeID](api_platformvm_outputs.transferableoutput.md#gettypeid)
* [getTypeName](api_platformvm_outputs.transferableoutput.md#gettypename)
* [serialize](api_platformvm_outputs.transferableoutput.md#serialize)
* [toBuffer](api_platformvm_outputs.transferableoutput.md#tobuffer)
* [comparator](api_platformvm_outputs.transferableoutput.md#static-comparator)

## Constructors

###  constructor

\+ **new TransferableOutput**(`assetID`: Buffer, `output`: [Output](common_output.output.md)): *[TransferableOutput](api_platformvm_outputs.transferableoutput.md)*

*Inherited from [StandardTransferableOutput](common_output.standardtransferableoutput.md).[constructor](common_output.standardtransferableoutput.md#constructor)*

*Overrides [StandardParseableOutput](common_output.standardparseableoutput.md).[constructor](common_output.standardparseableoutput.md#constructor)*

*Defined in [src/common/output.ts:409](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L409)*

Class representing an [StandardTransferableOutput](common_output.standardtransferableoutput.md) for a transaction.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`assetID` | Buffer | undefined | A [Buffer](https://github.com/feross/buffer) representing the assetID of the [Output](common_output.output.md) |
`output` | [Output](common_output.output.md) | undefined | A number representing the InputID of the [StandardTransferableOutput](common_output.standardtransferableoutput.md)  |

**Returns:** *[TransferableOutput](api_platformvm_outputs.transferableoutput.md)*

## Properties

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [StandardTransferableOutput](common_output.standardtransferableoutput.md).[_typeID](common_output.standardtransferableoutput.md#protected-_typeid)*

*Defined in [src/apis/platformvm/outputs.ts:35](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/outputs.ts#L35)*

___

### `Protected` _typeName

• **_typeName**: *string* = "TransferableOutput"

*Overrides [StandardTransferableOutput](common_output.standardtransferableoutput.md).[_typeName](common_output.standardtransferableoutput.md#protected-_typename)*

*Defined in [src/apis/platformvm/outputs.ts:34](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/outputs.ts#L34)*

___

### `Protected` assetID

• **assetID**: *Buffer* = undefined

*Inherited from [StandardTransferableOutput](common_output.standardtransferableoutput.md).[assetID](common_output.standardtransferableoutput.md#protected-assetid)*

*Defined in [src/common/output.ts:398](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L398)*

___

### `Protected` output

• **output**: *[Output](common_output.output.md)*

*Inherited from [StandardParseableOutput](common_output.standardparseableoutput.md).[output](common_output.standardparseableoutput.md#protected-output)*

*Defined in [src/common/output.ts:345](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L345)*

## Methods

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Overrides [StandardTransferableOutput](common_output.standardtransferableoutput.md).[deserialize](common_output.standardtransferableoutput.md#deserialize)*

*Defined in [src/apis/platformvm/outputs.ts:39](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/outputs.ts#L39)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Overrides [StandardTransferableOutput](common_output.standardtransferableoutput.md).[fromBuffer](common_output.standardtransferableoutput.md#abstract-frombuffer)*

*Defined in [src/apis/platformvm/outputs.ts:45](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/outputs.ts#L45)*

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

*Defined in [src/common/output.ts:400](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L400)*

**Returns:** *Buffer*

___

###  getOutput

▸ **getOutput**(): *[Output](common_output.output.md)*

*Inherited from [StandardParseableOutput](common_output.standardparseableoutput.md).[getOutput](common_output.standardparseableoutput.md#getoutput)*

*Defined in [src/common/output.ts:356](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L356)*

**Returns:** *[Output](common_output.output.md)*

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

*Inherited from [StandardTransferableOutput](common_output.standardtransferableoutput.md).[serialize](common_output.standardtransferableoutput.md#serialize)*

*Overrides [StandardParseableOutput](common_output.standardparseableoutput.md).[serialize](common_output.standardparseableoutput.md#serialize)*

*Defined in [src/common/output.ts:386](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L386)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Inherited from [StandardTransferableOutput](common_output.standardtransferableoutput.md).[toBuffer](common_output.standardtransferableoutput.md#tobuffer)*

*Overrides [StandardParseableOutput](common_output.standardparseableoutput.md).[toBuffer](common_output.standardparseableoutput.md#tobuffer)*

*Defined in [src/common/output.ts:405](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L405)*

**Returns:** *Buffer*

___

### `Static` comparator

▸ **comparator**(): *function*

*Inherited from [StandardParseableOutput](common_output.standardparseableoutput.md).[comparator](common_output.standardparseableoutput.md#static-comparator)*

*Defined in [src/common/output.ts:350](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L350)*

Returns a function used to sort an array of [ParseableOutput](api_platformvm_outputs.parseableoutput.md)s

**Returns:** *function*

▸ (`a`: [StandardParseableOutput](common_output.standardparseableoutput.md), `b`: [StandardParseableOutput](common_output.standardparseableoutput.md)): *0 | 1 | -1*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [StandardParseableOutput](common_output.standardparseableoutput.md) |
`b` | [StandardParseableOutput](common_output.standardparseableoutput.md) |
