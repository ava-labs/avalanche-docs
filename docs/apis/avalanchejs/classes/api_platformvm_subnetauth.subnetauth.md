[avalanche](../README.md) › [API-PlatformVM-SubnetAuth](../modules/api_platformvm_subnetauth.md) › [SubnetAuth](api_platformvm_subnetauth.subnetauth.md)

# Class: SubnetAuth

## Hierarchy

* [Serializable](utils_serialization.serializable.md)

  ↳ **SubnetAuth**

## Index

### Properties

* [_codecID](api_platformvm_subnetauth.subnetauth.md#protected-_codecid)
* [_typeID](api_platformvm_subnetauth.subnetauth.md#protected-_typeid)
* [_typeName](api_platformvm_subnetauth.subnetauth.md#protected-_typename)
* [addressIndices](api_platformvm_subnetauth.subnetauth.md#protected-addressindices)
* [numAddressIndices](api_platformvm_subnetauth.subnetauth.md#protected-numaddressindices)

### Methods

* [addAddressIndex](api_platformvm_subnetauth.subnetauth.md#addaddressindex)
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

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [NBytes](common_nbytes.nbytes.md).[_codecID](common_nbytes.nbytes.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:51](https://github.com/ava-labs/avalanchejs/blob/8033096/src/utils/serialization.ts#L51)*

___

### `Protected` _typeID

• **_typeID**: *number* = PlatformVMConstants.SUBNETAUTH

*Overrides [Serializable](utils_serialization.serializable.md).[_typeID](utils_serialization.serializable.md#protected-_typeid)*

*Defined in [src/apis/platformvm/subnetauth.ts:17](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/subnetauth.ts#L17)*

___

### `Protected` _typeName

• **_typeName**: *string* = "SubnetAuth"

*Overrides [Serializable](utils_serialization.serializable.md).[_typeName](utils_serialization.serializable.md#protected-_typename)*

*Defined in [src/apis/platformvm/subnetauth.ts:16](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/subnetauth.ts#L16)*

___

### `Protected` addressIndices

• **addressIndices**: *Buffer[]* = []

*Defined in [src/apis/platformvm/subnetauth.ts:54](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/subnetauth.ts#L54)*

___

### `Protected` numAddressIndices

• **numAddressIndices**: *Buffer* = Buffer.alloc(4)

*Defined in [src/apis/platformvm/subnetauth.ts:55](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/subnetauth.ts#L55)*

## Methods

###  addAddressIndex

▸ **addAddressIndex**(`index`: Buffer): *void*

*Defined in [src/apis/platformvm/subnetauth.ts:34](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/subnetauth.ts#L34)*

Add an address index for Subnet Auth signing

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`index` | Buffer | the Buffer of the address index to add  |

**Returns:** *void*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Overrides [StandardParseableOutput](common_output.standardparseableoutput.md).[deserialize](common_output.standardparseableoutput.md#deserialize)*

*Defined in [src/apis/platformvm/subnetauth.ts:25](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/subnetauth.ts#L25)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Defined in [src/apis/platformvm/subnetauth.ts:57](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/subnetauth.ts#L57)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`bytes` | Buffer | - |
`offset` | number | 0 |

**Returns:** *number*

___

###  getAddressIndices

▸ **getAddressIndices**(): *Buffer[]*

*Defined in [src/apis/platformvm/subnetauth.ts:50](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/subnetauth.ts#L50)*

Returns an array of AddressIndices as Buffers

**Returns:** *Buffer[]*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Inherited from [NBytes](common_nbytes.nbytes.md).[getCodecID](common_nbytes.nbytes.md#getcodecid)*

*Defined in [src/utils/serialization.ts:70](https://github.com/ava-labs/avalanchejs/blob/8033096/src/utils/serialization.ts#L70)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getNumAddressIndices

▸ **getNumAddressIndices**(): *number*

*Defined in [src/apis/platformvm/subnetauth.ts:43](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/subnetauth.ts#L43)*

Returns the number of address indices as a number

**Returns:** *number*

___

###  getTypeID

▸ **getTypeID**(): *number*

*Inherited from [NBytes](common_nbytes.nbytes.md).[getTypeID](common_nbytes.nbytes.md#gettypeid)*

*Defined in [src/utils/serialization.ts:63](https://github.com/ava-labs/avalanchejs/blob/8033096/src/utils/serialization.ts#L63)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getTypeName

▸ **getTypeName**(): *string*

*Inherited from [NBytes](common_nbytes.nbytes.md).[getTypeName](common_nbytes.nbytes.md#gettypename)*

*Defined in [src/utils/serialization.ts:56](https://github.com/ava-labs/avalanchejs/blob/8033096/src/utils/serialization.ts#L56)*

Used in serialization. TypeName is a string name for the type of object being output.

**Returns:** *string*

___

###  sanitizeObject

▸ **sanitizeObject**(`obj`: object): *object*

*Inherited from [NBytes](common_nbytes.nbytes.md).[sanitizeObject](common_nbytes.nbytes.md#sanitizeobject)*

*Defined in [src/utils/serialization.ts:77](https://github.com/ava-labs/avalanchejs/blob/8033096/src/utils/serialization.ts#L77)*

Sanitize to prevent cross scripting attacks.

**Parameters:**

Name | Type |
------ | ------ |
`obj` | object |

**Returns:** *object*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *object*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/apis/platformvm/subnetauth.ts:19](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/subnetauth.ts#L19)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Defined in [src/apis/platformvm/subnetauth.ts:72](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/subnetauth.ts#L72)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [SubnetAuth](api_platformvm_subnetauth.subnetauth.md).

**Returns:** *Buffer*
