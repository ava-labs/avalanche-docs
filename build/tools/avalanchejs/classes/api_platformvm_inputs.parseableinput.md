[avalanche](../README.md) › [API-PlatformVM-Inputs](../modules/api_platformvm_inputs.md) › [ParseableInput](api_platformvm_inputs.parseableinput.md)

# Class: ParseableInput

## Hierarchy

  ↳ [StandardParseableInput](common_inputs.standardparseableinput.md)

  ↳ **ParseableInput**

## Index

### Constructors

* [constructor](api_platformvm_inputs.parseableinput.md#constructor)

### Properties

* [_codecID](api_platformvm_inputs.parseableinput.md#protected-_codecid)
* [_typeID](api_platformvm_inputs.parseableinput.md#protected-_typeid)
* [_typeName](api_platformvm_inputs.parseableinput.md#protected-_typename)
* [input](api_platformvm_inputs.parseableinput.md#protected-input)

### Methods

* [deserialize](api_platformvm_inputs.parseableinput.md#deserialize)
* [fromBuffer](api_platformvm_inputs.parseableinput.md#frombuffer)
* [getCodecID](api_platformvm_inputs.parseableinput.md#getcodecid)
* [getInput](api_platformvm_inputs.parseableinput.md#getinput)
* [getTypeID](api_platformvm_inputs.parseableinput.md#gettypeid)
* [getTypeName](api_platformvm_inputs.parseableinput.md#gettypename)
* [serialize](api_platformvm_inputs.parseableinput.md#serialize)
* [toBuffer](api_platformvm_inputs.parseableinput.md#tobuffer)
* [comparator](api_platformvm_inputs.parseableinput.md#static-comparator)

## Constructors

###  constructor

\+ **new ParseableInput**(`input`: [Input](common_inputs.input.md)): *[ParseableInput](api_platformvm_inputs.parseableinput.md)*

*Inherited from [StandardParseableInput](common_inputs.standardparseableinput.md).[constructor](common_inputs.standardparseableinput.md#constructor)*

*Defined in [src/common/input.ts:156](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/input.ts#L156)*

Class representing an [StandardParseableInput](common_inputs.standardparseableinput.md) for a transaction.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`input` | [Input](common_inputs.input.md) | undefined | A number representing the InputID of the [StandardParseableInput](common_inputs.standardparseableinput.md)  |

**Returns:** *[ParseableInput](api_platformvm_inputs.parseableinput.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:40](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L40)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[_typeID](common_inputs.standardparseableinput.md#protected-_typeid)*

*Defined in [src/apis/platformvm/inputs.ts:38](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/platformvm/inputs.ts#L38)*

___

### `Protected` _typeName

• **_typeName**: *string* = "ParseableInput"

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[_typeName](common_inputs.standardparseableinput.md#protected-_typename)*

*Defined in [src/apis/platformvm/inputs.ts:37](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/platformvm/inputs.ts#L37)*

___

### `Protected` input

• **input**: *[Input](common_inputs.input.md)*

*Inherited from [StandardParseableInput](common_inputs.standardparseableinput.md).[input](common_inputs.standardparseableinput.md#protected-input)*

*Defined in [src/common/input.ts:134](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/input.ts#L134)*

## Methods

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[deserialize](common_inputs.standardparseableinput.md#deserialize)*

*Defined in [src/apis/platformvm/inputs.ts:42](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/platformvm/inputs.ts#L42)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[fromBuffer](common_inputs.standardparseableinput.md#abstract-frombuffer)*

*Defined in [src/apis/platformvm/inputs.ts:48](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/platformvm/inputs.ts#L48)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`bytes` | Buffer | - |
`offset` | number | 0 |

**Returns:** *number*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Inherited from [SigIdx](common_signature.sigidx.md).[getCodecID](common_signature.sigidx.md#getcodecid)*

*Defined in [src/utils/serialization.ts:59](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L59)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getInput

▸ **getInput**(): *[Input](common_inputs.input.md)*

*Inherited from [StandardParseableInput](common_inputs.standardparseableinput.md).[getInput](common_inputs.standardparseableinput.md#getinput)*

*Defined in [src/common/input.ts:145](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/input.ts#L145)*

**Returns:** *[Input](common_inputs.input.md)*

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

*Inherited from [StandardParseableInput](common_inputs.standardparseableinput.md).[serialize](common_inputs.standardparseableinput.md#serialize)*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/common/input.ts:126](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/input.ts#L126)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Inherited from [StandardParseableInput](common_inputs.standardparseableinput.md).[toBuffer](common_inputs.standardparseableinput.md#tobuffer)*

*Defined in [src/common/input.ts:150](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/input.ts#L150)*

**Returns:** *Buffer*

___

### `Static` comparator

▸ **comparator**(): *function*

*Inherited from [StandardParseableInput](common_inputs.standardparseableinput.md).[comparator](common_inputs.standardparseableinput.md#static-comparator)*

*Defined in [src/common/input.ts:139](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/input.ts#L139)*

Returns a function used to sort an array of [StandardParseableInput](common_inputs.standardparseableinput.md)s

**Returns:** *function*

▸ (`a`: [StandardParseableInput](common_inputs.standardparseableinput.md), `b`: [StandardParseableInput](common_inputs.standardparseableinput.md)): *1 | -1 | 0*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [StandardParseableInput](common_inputs.standardparseableinput.md) |
`b` | [StandardParseableInput](common_inputs.standardparseableinput.md) |
