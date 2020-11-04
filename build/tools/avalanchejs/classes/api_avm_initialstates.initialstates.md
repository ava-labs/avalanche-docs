[avalanche](../README.md) › [API-AVM-InitialStates](../modules/api_avm_initialstates.md) › [InitialStates](api_avm_initialstates.initialstates.md)

# Class: InitialStates

Class for creating initial output states used in asset creation

## Hierarchy

* [Serializable](utils_serialization.serializable.md)

  ↳ **InitialStates**

## Index

### Properties

* [_typeID](api_avm_initialstates.initialstates.md#protected-_typeid)
* [_typeName](api_avm_initialstates.initialstates.md#protected-_typename)
* [fxs](api_avm_initialstates.initialstates.md#protected-fxs)

### Methods

* [addOutput](api_avm_initialstates.initialstates.md#addoutput)
* [deserialize](api_avm_initialstates.initialstates.md#deserialize)
* [fromBuffer](api_avm_initialstates.initialstates.md#frombuffer)
* [getTypeID](api_avm_initialstates.initialstates.md#gettypeid)
* [getTypeName](api_avm_initialstates.initialstates.md#gettypename)
* [serialize](api_avm_initialstates.initialstates.md#serialize)
* [toBuffer](api_avm_initialstates.initialstates.md#tobuffer)

## Properties

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [Serializable](utils_serialization.serializable.md).[_typeID](utils_serialization.serializable.md#protected-_typeid)*

*Defined in [src/apis/avm/initialstates.ts:23](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/initialstates.ts#L23)*

___

### `Protected` _typeName

• **_typeName**: *string* = "AmountInput"

*Overrides [Serializable](utils_serialization.serializable.md).[_typeName](utils_serialization.serializable.md#protected-_typename)*

*Defined in [src/apis/avm/initialstates.ts:22](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/initialstates.ts#L22)*

___

### `Protected` fxs

• **fxs**: *object*

*Defined in [src/apis/avm/initialstates.ts:49](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/initialstates.ts#L49)*

#### Type declaration:

* \[ **fxid**: *number*\]: Array‹[Output](common_output.output.md)›

## Methods

###  addOutput

▸ **addOutput**(`out`: [Output](common_output.output.md), `fxid`: number): *void*

*Defined in [src/apis/avm/initialstates.ts:56](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/initialstates.ts#L56)*

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`out` | [Output](common_output.output.md) | - | The output state to add to the collection |
`fxid` | number | AVMConstants.SECPFXID | The FxID that will be used for this output, default AVMConstants.SECPFXID  |

**Returns:** *void*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Overrides [Serializable](utils_serialization.serializable.md).[deserialize](utils_serialization.serializable.md#deserialize)*

*Defined in [src/apis/avm/initialstates.ts:36](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/initialstates.ts#L36)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Defined in [src/apis/avm/initialstates.ts:63](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/initialstates.ts#L63)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`bytes` | Buffer | - |
`offset` | number | 0 |

**Returns:** *number*

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

*Defined in [src/apis/avm/initialstates.ts:25](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/initialstates.ts#L25)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Defined in [src/apis/avm/initialstates.ts:88](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/initialstates.ts#L88)*

**Returns:** *Buffer*
