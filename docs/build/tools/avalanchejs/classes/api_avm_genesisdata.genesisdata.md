[avalanche](../README.md) › [API-AVM-GenesisData](../modules/api_avm_genesisdata.md) › [GenesisData](api_avm_genesisdata.genesisdata.md)

# Class: GenesisData

## Hierarchy

* [Serializable](utils_serialization.serializable.md)

  ↳ **GenesisData**

## Index

### Constructors

* [constructor](api_avm_genesisdata.genesisdata.md#constructor)

### Properties

* [_codecID](api_avm_genesisdata.genesisdata.md#protected-_codecid)
* [_typeID](api_avm_genesisdata.genesisdata.md#protected-_typeid)
* [_typeName](api_avm_genesisdata.genesisdata.md#protected-_typename)
* [genesisAssets](api_avm_genesisdata.genesisdata.md#protected-genesisassets)
* [networkID](api_avm_genesisdata.genesisdata.md#protected-networkid)

### Methods

* [deserialize](api_avm_genesisdata.genesisdata.md#deserialize)
* [fromBuffer](api_avm_genesisdata.genesisdata.md#frombuffer)
* [getCodecID](api_avm_genesisdata.genesisdata.md#getcodecid)
* [getGenesisAssets](api_avm_genesisdata.genesisdata.md#getgenesisassets)
* [getNetworkID](api_avm_genesisdata.genesisdata.md#getnetworkid)
* [getTypeID](api_avm_genesisdata.genesisdata.md#gettypeid)
* [getTypeName](api_avm_genesisdata.genesisdata.md#gettypename)
* [sanitizeObject](api_avm_genesisdata.genesisdata.md#sanitizeobject)
* [serialize](api_avm_genesisdata.genesisdata.md#serialize)
* [toBuffer](api_avm_genesisdata.genesisdata.md#tobuffer)

## Constructors

###  constructor

\+ **new GenesisData**(`genesisAssets`: [GenesisAsset](api_avm_genesisasset.genesisasset.md)[], `networkID`: number): *[GenesisData](api_avm_genesisdata.genesisdata.md)*

*Defined in [src/apis/avm/genesisdata.ts:124](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/genesisdata.ts#L124)*

Class representing AVM GenesisData

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`genesisAssets` | [GenesisAsset](api_avm_genesisasset.genesisasset.md)[] | [] | Optional GenesisAsset[] |
`networkID` | number | DefaultNetworkID | Optional DefaultNetworkID  |

**Returns:** *[GenesisData](api_avm_genesisdata.genesisdata.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = AVMConstants.LATESTCODEC

*Overrides [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/apis/avm/genesisdata.ts:26](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/genesisdata.ts#L26)*

___

### `Protected` _typeID

• **_typeID**: *number* = undefined

*Inherited from [Serializable](utils_serialization.serializable.md).[_typeID](utils_serialization.serializable.md#protected-_typeid)*

*Defined in [src/utils/serialization.ts:50](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L50)*

___

### `Protected` _typeName

• **_typeName**: *string* = "GenesisData"

*Overrides [Serializable](utils_serialization.serializable.md).[_typeName](utils_serialization.serializable.md#protected-_typename)*

*Defined in [src/apis/avm/genesisdata.ts:25](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/genesisdata.ts#L25)*

___

### `Protected` genesisAssets

• **genesisAssets**: *[GenesisAsset](api_avm_genesisasset.genesisasset.md)[]*

*Defined in [src/apis/avm/genesisdata.ts:63](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/genesisdata.ts#L63)*

___

### `Protected` networkID

• **networkID**: *Buffer* = Buffer.alloc(4)

*Defined in [src/apis/avm/genesisdata.ts:64](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/genesisdata.ts#L64)*

## Methods

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[deserialize](common_inputs.standardparseableinput.md#deserialize)*

*Defined in [src/apis/avm/genesisdata.ts:45](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/genesisdata.ts#L45)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Defined in [src/apis/avm/genesisdata.ts:85](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/genesisdata.ts#L85)*

Takes a [Buffer](https://github.com/feross/buffer) containing an [GenesisAsset](api_avm_genesisasset.genesisasset.md), parses it, populates the class, and returns the length of the [GenesisAsset](api_avm_genesisasset.genesisasset.md) in bytes.

**`remarks`** assume not-checksummed

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`bytes` | Buffer | - | A [Buffer](https://github.com/feross/buffer) containing a raw [GenesisAsset](api_avm_genesisasset.genesisasset.md)  |
`offset` | number | 0 | - |

**Returns:** *number*

The length of the raw [GenesisAsset](api_avm_genesisasset.genesisasset.md)

___

###  getCodecID

▸ **getCodecID**(): *number*

*Inherited from [SigIdx](common_signature.sigidx.md).[getCodecID](common_signature.sigidx.md#getcodecid)*

*Defined in [src/utils/serialization.ts:70](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L70)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getGenesisAssets

▸ **getGenesisAssets**(): *[GenesisAsset](api_avm_genesisasset.genesisasset.md)[]*

*Defined in [src/apis/avm/genesisdata.ts:69](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/genesisdata.ts#L69)*

Returns the GenesisAssets[]

**Returns:** *[GenesisAsset](api_avm_genesisasset.genesisasset.md)[]*

___

###  getNetworkID

▸ **getNetworkID**(): *number*

*Defined in [src/apis/avm/genesisdata.ts:74](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/genesisdata.ts#L74)*

Returns the NetworkID as a number

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

*Defined in [src/apis/avm/genesisdata.ts:29](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/genesisdata.ts#L29)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Defined in [src/apis/avm/genesisdata.ts:106](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/genesisdata.ts#L106)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [GenesisData](api_avm_genesisdata.genesisdata.md).

**Returns:** *Buffer*
