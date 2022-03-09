[avalanche](../README.md) › [Common-Inputs](../modules/common_inputs.md) › [Input](common_inputs.input.md)

# Class: Input

## Hierarchy

* [Serializable](utils_serialization.serializable.md)

  ↳ **Input**

  ↳ [StandardAmountInput](common_inputs.standardamountinput.md)

## Index

### Properties

* [_codecID](common_inputs.input.md#protected-_codecid)
* [_typeID](common_inputs.input.md#protected-_typeid)
* [_typeName](common_inputs.input.md#protected-_typename)
* [sigCount](common_inputs.input.md#protected-sigcount)
* [sigIdxs](common_inputs.input.md#protected-sigidxs)

### Methods

* [addSignatureIdx](common_inputs.input.md#addsignatureidx)
* [clone](common_inputs.input.md#abstract-clone)
* [create](common_inputs.input.md#abstract-create)
* [deserialize](common_inputs.input.md#deserialize)
* [fromBuffer](common_inputs.input.md#frombuffer)
* [getCodecID](common_inputs.input.md#getcodecid)
* [getCredentialID](common_inputs.input.md#abstract-getcredentialid)
* [getInputID](common_inputs.input.md#abstract-getinputid)
* [getSigIdxs](common_inputs.input.md#getsigidxs)
* [getTypeID](common_inputs.input.md#gettypeid)
* [getTypeName](common_inputs.input.md#gettypename)
* [sanitizeObject](common_inputs.input.md#sanitizeobject)
* [select](common_inputs.input.md#abstract-select)
* [serialize](common_inputs.input.md#serialize)
* [toBuffer](common_inputs.input.md#tobuffer)
* [toString](common_inputs.input.md#tostring)
* [comparator](common_inputs.input.md#static-comparator)

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:51](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L51)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [Serializable](utils_serialization.serializable.md).[_typeID](utils_serialization.serializable.md#protected-_typeid)*

*Defined in [src/common/input.ts:23](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L23)*

___

### `Protected` _typeName

• **_typeName**: *string* = "Input"

*Overrides [Serializable](utils_serialization.serializable.md).[_typeName](utils_serialization.serializable.md#protected-_typename)*

*Defined in [src/common/input.ts:22](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L22)*

___

### `Protected` sigCount

• **sigCount**: *Buffer* = Buffer.alloc(4)

*Defined in [src/common/input.ts:42](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L42)*

___

### `Protected` sigIdxs

• **sigIdxs**: *[SigIdx](common_signature.sigidx.md)[]* = []

*Defined in [src/common/input.ts:43](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L43)*

## Methods

###  addSignatureIdx

▸ **addSignatureIdx**(`addressIdx`: number, `address`: Buffer): *void*

*Defined in [src/common/input.ts:82](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L82)*

Creates and adds a [SigIdx](common_signature.sigidx.md) to the [Input](common_inputs.input.md).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`addressIdx` | number | The index of the address to reference in the signatures |
`address` | Buffer | The address of the source of the signature  |

**Returns:** *void*

___

### `Abstract` clone

▸ **clone**(): *this*

*Defined in [src/common/input.ts:126](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L126)*

**Returns:** *this*

___

### `Abstract` create

▸ **create**(...`args`: any[]): *this*

*Defined in [src/common/input.ts:128](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L128)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[deserialize](common_inputs.standardparseableinput.md#deserialize)*

*Defined in [src/common/input.ts:32](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L32)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Defined in [src/common/input.ts:92](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L92)*

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

*Defined in [src/utils/serialization.ts:70](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L70)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

### `Abstract` getCredentialID

▸ **getCredentialID**(): *number*

*Defined in [src/common/input.ts:74](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L74)*

**Returns:** *number*

___

### `Abstract` getInputID

▸ **getInputID**(): *number*

*Defined in [src/common/input.ts:67](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L67)*

**Returns:** *number*

___

###  getSigIdxs

▸ **getSigIdxs**(): *[SigIdx](common_signature.sigidx.md)[]*

*Defined in [src/common/input.ts:72](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L72)*

Returns the array of [SigIdx](common_signature.sigidx.md) for this [Input](common_inputs.input.md)

**Returns:** *[SigIdx](common_signature.sigidx.md)[]*

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

### `Abstract` select

▸ **select**(`id`: number, ...`args`: any[]): *[Input](common_inputs.input.md)*

*Defined in [src/common/input.ts:130](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L130)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`...args` | any[] |

**Returns:** *[Input](common_inputs.input.md)*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *object*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/common/input.ts:25](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L25)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Defined in [src/common/input.ts:107](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L107)*

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Defined in [src/common/input.ts:122](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L122)*

Returns a base-58 representation of the [Input](common_inputs.input.md).

**Returns:** *string*

___

### `Static` comparator

▸ **comparator**(): *function*

*Defined in [src/common/input.ts:45](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L45)*

**Returns:** *function*

▸ (`a`: [Input](common_inputs.input.md), `b`: [Input](common_inputs.input.md)): *1 | -1 | 0*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Input](common_inputs.input.md) |
`b` | [Input](common_inputs.input.md) |
