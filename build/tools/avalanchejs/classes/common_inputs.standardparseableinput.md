[avalanche](../README.md) › [Common-Inputs](../modules/common_inputs.md) › [StandardParseableInput](common_inputs.standardparseableinput.md)

# Class: StandardParseableInput

## Hierarchy

* [Serializable](utils_serialization.serializable.md)

  ↳ **StandardParseableInput**

  ↳ [StandardTransferableInput](common_inputs.standardtransferableinput.md)

  ↳ [ParseableInput](api_platformvm_inputs.parseableinput.md)

## Index

### Constructors

* [constructor](common_inputs.standardparseableinput.md#constructor)

### Properties

* [_typeID](common_inputs.standardparseableinput.md#protected-_typeid)
* [_typeName](common_inputs.standardparseableinput.md#protected-_typename)
* [input](common_inputs.standardparseableinput.md#protected-input)

### Methods

* [deserialize](common_inputs.standardparseableinput.md#deserialize)
* [fromBuffer](common_inputs.standardparseableinput.md#abstract-frombuffer)
* [getInput](common_inputs.standardparseableinput.md#getinput)
* [getTypeID](common_inputs.standardparseableinput.md#gettypeid)
* [getTypeName](common_inputs.standardparseableinput.md#gettypename)
* [serialize](common_inputs.standardparseableinput.md#serialize)
* [toBuffer](common_inputs.standardparseableinput.md#tobuffer)
* [comparator](common_inputs.standardparseableinput.md#static-comparator)

## Constructors

###  constructor

\+ **new StandardParseableInput**(`input`: [Input](common_inputs.input.md)): *[StandardParseableInput](common_inputs.standardparseableinput.md)*

*Defined in [src/common/input.ts:156](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L156)*

Class representing an [StandardParseableInput](common_inputs.standardparseableinput.md) for a transaction.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`input` | [Input](common_inputs.input.md) | undefined | A number representing the InputID of the [StandardParseableInput](common_inputs.standardparseableinput.md)  |

**Returns:** *[StandardParseableInput](common_inputs.standardparseableinput.md)*

## Properties

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [Serializable](utils_serialization.serializable.md).[_typeID](utils_serialization.serializable.md#protected-_typeid)*

*Defined in [src/common/input.ts:124](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L124)*

___

### `Protected` _typeName

• **_typeName**: *string* = "StandardParseableInput"

*Overrides [Serializable](utils_serialization.serializable.md).[_typeName](utils_serialization.serializable.md#protected-_typename)*

*Defined in [src/common/input.ts:123](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L123)*

___

### `Protected` input

• **input**: *[Input](common_inputs.input.md)*

*Defined in [src/common/input.ts:134](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L134)*

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

*Defined in [src/common/input.ts:148](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L148)*

**Parameters:**

Name | Type |
------ | ------ |
`bytes` | Buffer |
`offset?` | number |

**Returns:** *number*

___

###  getInput

▸ **getInput**(): *[Input](common_inputs.input.md)*

*Defined in [src/common/input.ts:145](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L145)*

**Returns:** *[Input](common_inputs.input.md)*

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

*Defined in [src/common/input.ts:126](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L126)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Defined in [src/common/input.ts:150](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L150)*

**Returns:** *Buffer*

___

### `Static` comparator

▸ **comparator**(): *function*

*Defined in [src/common/input.ts:139](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L139)*

Returns a function used to sort an array of [StandardParseableInput](common_inputs.standardparseableinput.md)s

**Returns:** *function*

▸ (`a`: [StandardParseableInput](common_inputs.standardparseableinput.md), `b`: [StandardParseableInput](common_inputs.standardparseableinput.md)): *0 | 1 | -1*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [StandardParseableInput](common_inputs.standardparseableinput.md) |
`b` | [StandardParseableInput](common_inputs.standardparseableinput.md) |
