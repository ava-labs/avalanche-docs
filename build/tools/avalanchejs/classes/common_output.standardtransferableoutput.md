[avalanche](../README.md) › [Common-Output](../modules/common_output.md) › [StandardTransferableOutput](common_output.standardtransferableoutput.md)

# Class: StandardTransferableOutput

## Hierarchy

  ↳ [StandardParseableOutput](common_output.standardparseableoutput.md)

  ↳ **StandardTransferableOutput**

  ↳ [TransferableOutput](api_avm_outputs.transferableoutput.md)

  ↳ [TransferableOutput](api_platformvm_outputs.transferableoutput.md)

## Index

### Constructors

* [constructor](common_output.standardtransferableoutput.md#constructor)

### Properties

* [_typeID](common_output.standardtransferableoutput.md#protected-_typeid)
* [_typeName](common_output.standardtransferableoutput.md#protected-_typename)
* [assetID](common_output.standardtransferableoutput.md#protected-assetid)
* [output](common_output.standardtransferableoutput.md#protected-output)

### Methods

* [deserialize](common_output.standardtransferableoutput.md#deserialize)
* [fromBuffer](common_output.standardtransferableoutput.md#abstract-frombuffer)
* [getAssetID](common_output.standardtransferableoutput.md#getassetid)
* [getOutput](common_output.standardtransferableoutput.md#getoutput)
* [getTypeID](common_output.standardtransferableoutput.md#gettypeid)
* [getTypeName](common_output.standardtransferableoutput.md#gettypename)
* [serialize](common_output.standardtransferableoutput.md#serialize)
* [toBuffer](common_output.standardtransferableoutput.md#tobuffer)
* [comparator](common_output.standardtransferableoutput.md#static-comparator)

## Constructors

###  constructor

\+ **new StandardTransferableOutput**(`assetID`: Buffer, `output`: [Output](common_output.output.md)): *[StandardTransferableOutput](common_output.standardtransferableoutput.md)*

*Overrides [StandardParseableOutput](common_output.standardparseableoutput.md).[constructor](common_output.standardparseableoutput.md#constructor)*

*Defined in [src/common/output.ts:409](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L409)*

Class representing an [StandardTransferableOutput](common_output.standardtransferableoutput.md) for a transaction.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`assetID` | Buffer | undefined | A [Buffer](https://github.com/feross/buffer) representing the assetID of the [Output](common_output.output.md) |
`output` | [Output](common_output.output.md) | undefined | A number representing the InputID of the [StandardTransferableOutput](common_output.standardtransferableoutput.md)  |

**Returns:** *[StandardTransferableOutput](common_output.standardtransferableoutput.md)*

## Properties

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [StandardParseableOutput](common_output.standardparseableoutput.md).[_typeID](common_output.standardparseableoutput.md#protected-_typeid)*

*Defined in [src/common/output.ts:384](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L384)*

___

### `Protected` _typeName

• **_typeName**: *string* = "StandardTransferableOutput"

*Overrides [StandardParseableOutput](common_output.standardparseableoutput.md).[_typeName](common_output.standardparseableoutput.md#protected-_typename)*

*Defined in [src/common/output.ts:383](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L383)*

___

### `Protected` assetID

• **assetID**: *Buffer* = undefined

*Defined in [src/common/output.ts:398](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L398)*

___

### `Protected` output

• **output**: *[Output](common_output.output.md)*

*Inherited from [StandardParseableOutput](common_output.standardparseableoutput.md).[output](common_output.standardparseableoutput.md#protected-output)*

*Defined in [src/common/output.ts:345](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L345)*

## Methods

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Overrides [Serializable](utils_serialization.serializable.md).[deserialize](utils_serialization.serializable.md#deserialize)*

*Defined in [src/common/output.ts:393](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L393)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *void*

___

### `Abstract` fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset?`: number): *number*

*Overrides [StandardParseableOutput](common_output.standardparseableoutput.md).[fromBuffer](common_output.standardparseableoutput.md#abstract-frombuffer)*

*Defined in [src/common/output.ts:403](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L403)*

**Parameters:**

Name | Type |
------ | ------ |
`bytes` | Buffer |
`offset?` | number |

**Returns:** *number*

___

###  getAssetID

▸ **getAssetID**(): *Buffer*

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
