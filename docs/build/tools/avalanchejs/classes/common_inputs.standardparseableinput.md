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

* [_codecID](common_inputs.standardparseableinput.md#protected-_codecid)
* [_typeID](common_inputs.standardparseableinput.md#protected-_typeid)
* [_typeName](common_inputs.standardparseableinput.md#protected-_typename)
* [input](common_inputs.standardparseableinput.md#protected-input)

### Methods

* [deserialize](common_inputs.standardparseableinput.md#deserialize)
* [fromBuffer](common_inputs.standardparseableinput.md#abstract-frombuffer)
* [getCodecID](common_inputs.standardparseableinput.md#getcodecid)
* [getInput](common_inputs.standardparseableinput.md#getinput)
* [getTypeID](common_inputs.standardparseableinput.md#gettypeid)
* [getTypeName](common_inputs.standardparseableinput.md#gettypename)
* [sanitizeObject](common_inputs.standardparseableinput.md#sanitizeobject)
* [serialize](common_inputs.standardparseableinput.md#serialize)
* [toBuffer](common_inputs.standardparseableinput.md#tobuffer)
* [comparator](common_inputs.standardparseableinput.md#static-comparator)

## Constructors

###  constructor

\+ **new StandardParseableInput**(`input`: [Input](common_inputs.input.md)): *[StandardParseableInput](common_inputs.standardparseableinput.md)*

*Defined in [src/common/input.ts:172](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L172)*

Class representing an [StandardParseableInput](common_inputs.standardparseableinput.md) for a transaction.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`input` | [Input](common_inputs.input.md) | undefined | A number representing the InputID of the [StandardParseableInput](common_inputs.standardparseableinput.md)  |

**Returns:** *[StandardParseableInput](common_inputs.standardparseableinput.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:51](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L51)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [Serializable](utils_serialization.serializable.md).[_typeID](utils_serialization.serializable.md#protected-_typeid)*

*Defined in [src/common/input.ts:135](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L135)*

___

### `Protected` _typeName

• **_typeName**: *string* = "StandardParseableInput"

*Overrides [Serializable](utils_serialization.serializable.md).[_typeName](utils_serialization.serializable.md#protected-_typename)*

*Defined in [src/common/input.ts:134](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L134)*

___

### `Protected` input

• **input**: *[Input](common_inputs.input.md)*

*Defined in [src/common/input.ts:145](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L145)*

## Methods

###  deserialize

▸ **deserialize**(`fields`: object, `encoding?`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Inherited from [StandardParseableInput](common_inputs.standardparseableinput.md).[deserialize](common_inputs.standardparseableinput.md#deserialize)*

*Defined in [src/utils/serialization.ts:97](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L97)*

**Parameters:**

Name | Type |
------ | ------ |
`fields` | object |
`encoding?` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) |

**Returns:** *void*

___

### `Abstract` fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset?`: number): *number*

*Defined in [src/common/input.ts:164](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L164)*

**Parameters:**

Name | Type |
------ | ------ |
`bytes` | Buffer |
`offset?` | number |

**Returns:** *number*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Inherited from [SigIdx](common_signature.sigidx.md).[getCodecID](common_signature.sigidx.md#getcodecid)*

*Defined in [src/utils/serialization.ts:70](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L70)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getInput

▸ **getInput**(): *[Input](common_inputs.input.md)*

*Defined in [src/common/input.ts:161](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L161)*

**Returns:** *[Input](common_inputs.input.md)*

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

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/common/input.ts:137](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L137)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Defined in [src/common/input.ts:166](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L166)*

**Returns:** *Buffer*

___

### `Static` comparator

▸ **comparator**(): *function*

*Defined in [src/common/input.ts:150](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L150)*

Returns a function used to sort an array of [StandardParseableInput](common_inputs.standardparseableinput.md)s

**Returns:** *function*

▸ (`a`: [StandardParseableInput](common_inputs.standardparseableinput.md), `b`: [StandardParseableInput](common_inputs.standardparseableinput.md)): *1 | -1 | 0*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [StandardParseableInput](common_inputs.standardparseableinput.md) |
`b` | [StandardParseableInput](common_inputs.standardparseableinput.md) |
