[avalanche](../README.md) › [Common-Inputs](../modules/common_inputs.md) › [Input](common_inputs.input.md)

# Class: Input

## Hierarchy

* [Serializable](utils_serialization.serializable.md)

  ↳ **Input**

  ↳ [StandardAmountInput](common_inputs.standardamountinput.md)

## Index

### Properties

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
* [getCredentialID](common_inputs.input.md#abstract-getcredentialid)
* [getInputID](common_inputs.input.md#abstract-getinputid)
* [getSigIdxs](common_inputs.input.md#getsigidxs)
* [getTypeID](common_inputs.input.md#gettypeid)
* [getTypeName](common_inputs.input.md#gettypename)
* [select](common_inputs.input.md#abstract-select)
* [serialize](common_inputs.input.md#serialize)
* [toBuffer](common_inputs.input.md#tobuffer)
* [toString](common_inputs.input.md#tostring)
* [comparator](common_inputs.input.md#static-comparator)

## Properties

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [Serializable](utils_serialization.serializable.md).[_typeID](utils_serialization.serializable.md#protected-_typeid)*

*Defined in [src/common/input.ts:19](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L19)*

___

### `Protected` _typeName

• **_typeName**: *string* = "Input"

*Overrides [Serializable](utils_serialization.serializable.md).[_typeName](utils_serialization.serializable.md#protected-_typename)*

*Defined in [src/common/input.ts:18](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L18)*

___

### `Protected` sigCount

• **sigCount**: *Buffer* = Buffer.alloc(4)

*Defined in [src/common/input.ts:38](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L38)*

___

### `Protected` sigIdxs

• **sigIdxs**: *Array‹[SigIdx](common_signature.sigidx.md)›* = []

*Defined in [src/common/input.ts:39](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L39)*

## Methods

###  addSignatureIdx

▸ **addSignatureIdx**(`addressIdx`: number, `address`: Buffer): *void*

*Defined in [src/common/input.ts:70](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L70)*

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

*Defined in [src/common/input.ts:114](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L114)*

**Returns:** *this*

___

### `Abstract` create

▸ **create**(...`args`: any[]): *this*

*Defined in [src/common/input.ts:116](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L116)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Overrides [Serializable](utils_serialization.serializable.md).[deserialize](utils_serialization.serializable.md#deserialize)*

*Defined in [src/common/input.ts:28](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L28)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Defined in [src/common/input.ts:80](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L80)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`bytes` | Buffer | - |
`offset` | number | 0 |

**Returns:** *number*

___

### `Abstract` getCredentialID

▸ **getCredentialID**(): *number*

*Defined in [src/common/input.ts:62](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L62)*

**Returns:** *number*

___

### `Abstract` getInputID

▸ **getInputID**(): *number*

*Defined in [src/common/input.ts:55](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L55)*

**Returns:** *number*

___

###  getSigIdxs

▸ **getSigIdxs**(): *Array‹[SigIdx](common_signature.sigidx.md)›*

*Defined in [src/common/input.ts:60](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L60)*

Returns the array of [SigIdx](common_signature.sigidx.md) for this [Input](common_inputs.input.md)

**Returns:** *Array‹[SigIdx](common_signature.sigidx.md)›*

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

### `Abstract` select

▸ **select**(`id`: number, ...`args`: any[]): *[Input](common_inputs.input.md)*

*Defined in [src/common/input.ts:118](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L118)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`...args` | any[] |

**Returns:** *[Input](common_inputs.input.md)*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *object*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/common/input.ts:21](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L21)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Defined in [src/common/input.ts:95](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L95)*

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Defined in [src/common/input.ts:110](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L110)*

Returns a base-58 representation of the [Input](common_inputs.input.md).

**Returns:** *string*

___

### `Static` comparator

▸ **comparator**(): *function*

*Defined in [src/common/input.ts:41](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L41)*

**Returns:** *function*

▸ (`a`: [Input](common_inputs.input.md), `b`: [Input](common_inputs.input.md)): *0 | 1 | -1*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Input](common_inputs.input.md) |
`b` | [Input](common_inputs.input.md) |
