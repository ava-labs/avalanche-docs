[avalanche](../README.md) › [Common-Output](../modules/common_output.md) › [StandardParseableOutput](common_output.standardparseableoutput.md)

# Class: StandardParseableOutput

## Hierarchy

* [Serializable](utils_serialization.serializable.md)

  ↳ **StandardParseableOutput**

  ↳ [StandardTransferableOutput](common_output.standardtransferableoutput.md)

  ↳ [ParseableOutput](api_platformvm_outputs.parseableoutput.md)

## Index

### Constructors

* [constructor](common_output.standardparseableoutput.md#constructor)

### Properties

* [_typeID](common_output.standardparseableoutput.md#protected-_typeid)
* [_typeName](common_output.standardparseableoutput.md#protected-_typename)
* [output](common_output.standardparseableoutput.md#protected-output)

### Methods

* [deserialize](common_output.standardparseableoutput.md#deserialize)
* [fromBuffer](common_output.standardparseableoutput.md#abstract-frombuffer)
* [getOutput](common_output.standardparseableoutput.md#getoutput)
* [getTypeID](common_output.standardparseableoutput.md#gettypeid)
* [getTypeName](common_output.standardparseableoutput.md#gettypename)
* [serialize](common_output.standardparseableoutput.md#serialize)
* [toBuffer](common_output.standardparseableoutput.md#tobuffer)
* [comparator](common_output.standardparseableoutput.md#static-comparator)

## Constructors

###  constructor

\+ **new StandardParseableOutput**(`output`: [Output](common_output.output.md)): *[StandardParseableOutput](common_output.standardparseableoutput.md)*

*Defined in [src/common/output.ts:367](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L367)*

Class representing an [ParseableOutput](api_platformvm_outputs.parseableoutput.md) for a transaction.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`output` | [Output](common_output.output.md) | undefined | A number representing the InputID of the [ParseableOutput](api_platformvm_outputs.parseableoutput.md)  |

**Returns:** *[StandardParseableOutput](common_output.standardparseableoutput.md)*

## Properties

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [Serializable](utils_serialization.serializable.md).[_typeID](utils_serialization.serializable.md#protected-_typeid)*

*Defined in [src/common/output.ts:335](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L335)*

___

### `Protected` _typeName

• **_typeName**: *string* = "StandardParseableOutput"

*Overrides [Serializable](utils_serialization.serializable.md).[_typeName](utils_serialization.serializable.md#protected-_typename)*

*Defined in [src/common/output.ts:334](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L334)*

___

### `Protected` output

• **output**: *[Output](common_output.output.md)*

*Defined in [src/common/output.ts:345](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L345)*

## Methods

###  deserialize

▸ **deserialize**(`fields`: object, `encoding?`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Inherited from [Serializable](utils_serialization.serializable.md).[deserialize](utils_serialization.serializable.md#deserialize)*

*Defined in [src/utils/serialization.ts:64](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/serialization.ts#L64)*

**Parameters:**

Name | Type |
------ | ------ |
`fields` | object |
`encoding?` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) |

**Returns:** *void*

___

### `Abstract` fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset?`: number): *number*

*Defined in [src/common/output.ts:359](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L359)*

**Parameters:**

Name | Type |
------ | ------ |
`bytes` | Buffer |
`offset?` | number |

**Returns:** *number*

___

###  getOutput

▸ **getOutput**(): *[Output](common_output.output.md)*

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

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/common/output.ts:337](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L337)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Defined in [src/common/output.ts:361](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L361)*

**Returns:** *Buffer*

___

### `Static` comparator

▸ **comparator**(): *function*

*Defined in [src/common/output.ts:350](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L350)*

Returns a function used to sort an array of [ParseableOutput](api_platformvm_outputs.parseableoutput.md)s

**Returns:** *function*

▸ (`a`: [StandardParseableOutput](common_output.standardparseableoutput.md), `b`: [StandardParseableOutput](common_output.standardparseableoutput.md)): *0 | 1 | -1*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [StandardParseableOutput](common_output.standardparseableoutput.md) |
`b` | [StandardParseableOutput](common_output.standardparseableoutput.md) |
