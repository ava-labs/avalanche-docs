[avalanche](../README.md) › [API-PlatformVM-SubnetAuth](../modules/api_platformvm_subnetauth.md) › [SubnetAuth](api_platformvm_subnetauth.subnetauth.md)

# Class: SubnetAuth

## Hierarchy

* [Serializable](utils_serialization.serializable.md)

  ↳ **SubnetAuth**

## Index

### Constructors

* [constructor](api_platformvm_subnetauth.subnetauth.md#constructor)

### Properties

* [_codecID](api_platformvm_subnetauth.subnetauth.md#protected-_codecid)
* [_typeID](api_platformvm_subnetauth.subnetauth.md#protected-_typeid)
* [_typeName](api_platformvm_subnetauth.subnetauth.md#protected-_typename)
* [addressIndices](api_platformvm_subnetauth.subnetauth.md#protected-addressindices)
* [numAddressIndices](api_platformvm_subnetauth.subnetauth.md#protected-numaddressindices)

### Methods

* [deserialize](api_platformvm_subnetauth.subnetauth.md#deserialize)
* [fromBuffer](api_platformvm_subnetauth.subnetauth.md#frombuffer)
* [getAddressIndices](api_platformvm_subnetauth.subnetauth.md#getaddressindices)
* [getCodecID](api_platformvm_subnetauth.subnetauth.md#getcodecid)
* [getNumAddressIndices](api_platformvm_subnetauth.subnetauth.md#getnumaddressindices)
* [getTypeID](api_platformvm_subnetauth.subnetauth.md#gettypeid)
* [getTypeName](api_platformvm_subnetauth.subnetauth.md#gettypename)
* [sanitizeObject](api_platformvm_subnetauth.subnetauth.md#sanitizeobject)
* [serialize](api_platformvm_subnetauth.subnetauth.md#serialize)
* [toBuffer](api_platformvm_subnetauth.subnetauth.md#tobuffer)

## Constructors

###  constructor

\+ **new SubnetAuth**(`addressIndices`: Buffer[]): *[SubnetAuth](api_platformvm_subnetauth.subnetauth.md)*

*Defined in [src/apis/platformvm/subnetauth.ts:73](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/subnetauth.ts#L73)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`addressIndices` | Buffer[] | undefined |

**Returns:** *[SubnetAuth](api_platformvm_subnetauth.subnetauth.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:51](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L51)*

___

### `Protected` _typeID

• **_typeID**: *number* = PlatformVMConstants.SUBNETAUTH

*Overrides [Serializable](utils_serialization.serializable.md).[_typeID](utils_serialization.serializable.md#protected-_typeid)*

*Defined in [src/apis/platformvm/subnetauth.ts:17](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/subnetauth.ts#L17)*

___

### `Protected` _typeName

• **_typeName**: *string* = "SubnetAuth"

*Overrides [Serializable](utils_serialization.serializable.md).[_typeName](utils_serialization.serializable.md#protected-_typename)*

*Defined in [src/apis/platformvm/subnetauth.ts:16](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/subnetauth.ts#L16)*

___

### `Protected` addressIndices

• **addressIndices**: *Buffer[]* = []

*Defined in [src/apis/platformvm/subnetauth.ts:43](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/subnetauth.ts#L43)*

___

### `Protected` numAddressIndices

• **numAddressIndices**: *Buffer* = Buffer.alloc(4)

*Defined in [src/apis/platformvm/subnetauth.ts:44](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/subnetauth.ts#L44)*

## Methods

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[deserialize](common_inputs.standardparseableinput.md#deserialize)*

*Defined in [src/apis/platformvm/subnetauth.ts:25](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/subnetauth.ts#L25)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Defined in [src/apis/platformvm/subnetauth.ts:46](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/subnetauth.ts#L46)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`bytes` | Buffer | - |
`offset` | number | 0 |

**Returns:** *number*

___

###  getAddressIndices

▸ **getAddressIndices**(): *Buffer[]*

*Defined in [src/apis/platformvm/subnetauth.ts:39](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/subnetauth.ts#L39)*

Returns an array of AddressIndices as Buffers

**Returns:** *Buffer[]*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Inherited from [SigIdx](common_signature.sigidx.md).[getCodecID](common_signature.sigidx.md#getcodecid)*

*Defined in [src/utils/serialization.ts:70](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L70)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getNumAddressIndices

▸ **getNumAddressIndices**(): *number*

*Defined in [src/apis/platformvm/subnetauth.ts:32](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/subnetauth.ts#L32)*

Returns the number of address indices as a number

**Returns:** *number*

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

*Defined in [src/apis/platformvm/subnetauth.ts:19](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/subnetauth.ts#L19)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Defined in [src/apis/platformvm/subnetauth.ts:61](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/subnetauth.ts#L61)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [SubnetAuth](api_platformvm_subnetauth.subnetauth.md).

**Returns:** *Buffer*
