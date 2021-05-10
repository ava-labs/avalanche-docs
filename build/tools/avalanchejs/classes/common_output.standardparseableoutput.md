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

* [_codecID](common_output.standardparseableoutput.md#protected-_codecid)
* [_typeID](common_output.standardparseableoutput.md#protected-_typeid)
* [_typeName](common_output.standardparseableoutput.md#protected-_typename)
* [output](common_output.standardparseableoutput.md#protected-output)

### Methods

* [deserialize](common_output.standardparseableoutput.md#deserialize)
* [fromBuffer](common_output.standardparseableoutput.md#abstract-frombuffer)
* [getCodecID](common_output.standardparseableoutput.md#getcodecid)
* [getOutput](common_output.standardparseableoutput.md#getoutput)
* [getTypeID](common_output.standardparseableoutput.md#gettypeid)
* [getTypeName](common_output.standardparseableoutput.md#gettypename)
* [serialize](common_output.standardparseableoutput.md#serialize)
* [toBuffer](common_output.standardparseableoutput.md#tobuffer)
* [comparator](common_output.standardparseableoutput.md#static-comparator)

## Constructors

###  constructor

\+ **new StandardParseableOutput**(`output`: [Output](common_output.output.md)): *[StandardParseableOutput](common_output.standardparseableoutput.md)*

*Defined in [src/common/output.ts:368](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/output.ts#L368)*

Class representing an [ParseableOutput](api_platformvm_outputs.parseableoutput.md) for a transaction.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`output` | [Output](common_output.output.md) | undefined | A number representing the InputID of the [ParseableOutput](api_platformvm_outputs.parseableoutput.md)  |

**Returns:** *[StandardParseableOutput](common_output.standardparseableoutput.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [Serializable](utils_serialization.serializable.md).[_codecID](utils_serialization.serializable.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:42](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/serialization.ts#L42)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [Serializable](utils_serialization.serializable.md).[_typeID](utils_serialization.serializable.md#protected-_typeid)*

*Defined in [src/common/output.ts:336](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/output.ts#L336)*

___

### `Protected` _typeName

• **_typeName**: *string* = "StandardParseableOutput"

*Overrides [Serializable](utils_serialization.serializable.md).[_typeName](utils_serialization.serializable.md#protected-_typename)*

*Defined in [src/common/output.ts:335](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/output.ts#L335)*

___

### `Protected` output

• **output**: *[Output](common_output.output.md)*

*Defined in [src/common/output.ts:346](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/output.ts#L346)*

## Methods

###  deserialize

▸ **deserialize**(`fields`: object, `encoding?`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Inherited from [Serializable](utils_serialization.serializable.md).[deserialize](utils_serialization.serializable.md#deserialize)*

*Defined in [src/utils/serialization.ts:74](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/serialization.ts#L74)*

**Parameters:**

Name | Type |
------ | ------ |
`fields` | object |
`encoding?` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) |

**Returns:** *void*

___

### `Abstract` fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset?`: number): *number*

*Defined in [src/common/output.ts:360](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/output.ts#L360)*

**Parameters:**

Name | Type |
------ | ------ |
`bytes` | Buffer |
`offset?` | number |

**Returns:** *number*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Inherited from [Serializable](utils_serialization.serializable.md).[getCodecID](utils_serialization.serializable.md#getcodecid)*

*Defined in [src/utils/serialization.ts:61](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/serialization.ts#L61)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getOutput

▸ **getOutput**(): *[Output](common_output.output.md)*

*Defined in [src/common/output.ts:357](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/output.ts#L357)*

**Returns:** *[Output](common_output.output.md)*

___

###  getTypeID

▸ **getTypeID**(): *number*

*Inherited from [Serializable](utils_serialization.serializable.md).[getTypeID](utils_serialization.serializable.md#gettypeid)*

*Defined in [src/utils/serialization.ts:54](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/serialization.ts#L54)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getTypeName

▸ **getTypeName**(): *string*

*Inherited from [Serializable](utils_serialization.serializable.md).[getTypeName](utils_serialization.serializable.md#gettypename)*

*Defined in [src/utils/serialization.ts:47](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/serialization.ts#L47)*

Used in serialization. TypeName is a string name for the type of object being output.

**Returns:** *string*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *object*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/common/output.ts:338](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/output.ts#L338)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Defined in [src/common/output.ts:362](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/output.ts#L362)*

**Returns:** *Buffer*

___

### `Static` comparator

▸ **comparator**(): *function*

*Defined in [src/common/output.ts:351](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/output.ts#L351)*

Returns a function used to sort an array of [ParseableOutput](api_platformvm_outputs.parseableoutput.md)s

**Returns:** *function*

▸ (`a`: [StandardParseableOutput](common_output.standardparseableoutput.md), `b`: [StandardParseableOutput](common_output.standardparseableoutput.md)): *0 | 1 | -1*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [StandardParseableOutput](common_output.standardparseableoutput.md) |
`b` | [StandardParseableOutput](common_output.standardparseableoutput.md) |
