[avalanche](../README.md) › [API-AVM-InitialStates](../modules/api_avm_initialstates.md) › [InitialStates](api_avm_initialstates.initialstates.md)

# Class: InitialStates

Class for creating initial output states used in asset creation

## Hierarchy

* [Serializable](utils_serialization.serializable.md)

  ↳ **InitialStates**

## Index

### Properties

* [_codecID](api_avm_initialstates.initialstates.md#protected-_codecid)
* [_typeID](api_avm_initialstates.initialstates.md#protected-_typeid)
* [_typeName](api_avm_initialstates.initialstates.md#protected-_typename)
* [fxs](api_avm_initialstates.initialstates.md#protected-fxs)

### Methods

* [addOutput](api_avm_initialstates.initialstates.md#addoutput)
* [deserialize](api_avm_initialstates.initialstates.md#deserialize)
* [fromBuffer](api_avm_initialstates.initialstates.md#frombuffer)
* [getCodecID](api_avm_initialstates.initialstates.md#getcodecid)
* [getTypeID](api_avm_initialstates.initialstates.md#gettypeid)
* [getTypeName](api_avm_initialstates.initialstates.md#gettypename)
* [serialize](api_avm_initialstates.initialstates.md#serialize)
* [toBuffer](api_avm_initialstates.initialstates.md#tobuffer)

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:40](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L40)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [Serializable](utils_serialization.serializable.md).[_typeID](utils_serialization.serializable.md#protected-_typeid)*

*Defined in [src/apis/avm/initialstates.ts:22](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/initialstates.ts#L22)*

___

### `Protected` _typeName

• **_typeName**: *string* = "InitialStates"

*Overrides [Serializable](utils_serialization.serializable.md).[_typeName](utils_serialization.serializable.md#protected-_typename)*

*Defined in [src/apis/avm/initialstates.ts:21](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/initialstates.ts#L21)*

___

### `Protected` fxs

• **fxs**: *object*

*Defined in [src/apis/avm/initialstates.ts:48](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/initialstates.ts#L48)*

#### Type declaration:

* \[ **fxid**: *number*\]: [Output](common_output.output.md)[]

## Methods

###  addOutput

▸ **addOutput**(`out`: [Output](common_output.output.md), `fxid`: number): *void*

*Defined in [src/apis/avm/initialstates.ts:55](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/initialstates.ts#L55)*

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`out` | [Output](common_output.output.md) | - | The output state to add to the collection |
`fxid` | number | AVMConstants.SECPFXID | The FxID that will be used for this output, default AVMConstants.SECPFXID  |

**Returns:** *void*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[deserialize](common_inputs.standardparseableinput.md#deserialize)*

*Defined in [src/apis/avm/initialstates.ts:35](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/initialstates.ts#L35)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Defined in [src/apis/avm/initialstates.ts:62](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/initialstates.ts#L62)*

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

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/apis/avm/initialstates.ts:24](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/initialstates.ts#L24)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Defined in [src/apis/avm/initialstates.ts:87](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/initialstates.ts#L87)*

**Returns:** *Buffer*
