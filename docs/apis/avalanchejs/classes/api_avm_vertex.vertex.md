[avalanche](../README.md) › [API-AVM-Vertex](../modules/api_avm_vertex.md) › [Vertex](api_avm_vertex.vertex.md)

# Class: Vertex

Class representing a Vertex

## Hierarchy

* [Serializable](utils_serialization.serializable.md)

  ↳ **Vertex**

## Index

### Constructors

* [constructor](api_avm_vertex.vertex.md#constructor)

### Properties

* [_codecID](api_avm_vertex.vertex.md#protected-_codecid)
* [_typeID](api_avm_vertex.vertex.md#protected-_typeid)
* [_typeName](api_avm_vertex.vertex.md#protected-_typename)
* [blockchainID](api_avm_vertex.vertex.md#protected-blockchainid)
* [epoch](api_avm_vertex.vertex.md#protected-epoch)
* [height](api_avm_vertex.vertex.md#protected-height)
* [networkID](api_avm_vertex.vertex.md#protected-networkid)
* [numParentIDs](api_avm_vertex.vertex.md#protected-numparentids)
* [numRestrictions](api_avm_vertex.vertex.md#protected-numrestrictions)
* [numTxs](api_avm_vertex.vertex.md#protected-numtxs)
* [parentIDs](api_avm_vertex.vertex.md#protected-parentids)
* [restrictions](api_avm_vertex.vertex.md#protected-restrictions)
* [txs](api_avm_vertex.vertex.md#protected-txs)

### Methods

* [clone](api_avm_vertex.vertex.md#clone)
* [deserialize](api_avm_vertex.vertex.md#deserialize)
* [fromBuffer](api_avm_vertex.vertex.md#frombuffer)
* [getBlockchainID](api_avm_vertex.vertex.md#getblockchainid)
* [getCodecID](api_avm_vertex.vertex.md#getcodecid)
* [getEpoch](api_avm_vertex.vertex.md#getepoch)
* [getHeight](api_avm_vertex.vertex.md#getheight)
* [getNetworkID](api_avm_vertex.vertex.md#getnetworkid)
* [getParentIDs](api_avm_vertex.vertex.md#getparentids)
* [getRestrictions](api_avm_vertex.vertex.md#getrestrictions)
* [getTxs](api_avm_vertex.vertex.md#gettxs)
* [getTypeID](api_avm_vertex.vertex.md#gettypeid)
* [getTypeName](api_avm_vertex.vertex.md#gettypename)
* [sanitizeObject](api_avm_vertex.vertex.md#sanitizeobject)
* [serialize](api_avm_vertex.vertex.md#serialize)
* [setCodecID](api_avm_vertex.vertex.md#setcodecid)
* [toBuffer](api_avm_vertex.vertex.md#tobuffer)

## Constructors

###  constructor

\+ **new Vertex**(`networkID`: number, `blockchainID`: string, `height`: BN, `epoch`: number, `parentIDs`: Buffer[], `txs`: [Tx](api_avm_transactions.tx.md)[], `restrictions`: Buffer[]): *[Vertex](api_avm_vertex.vertex.md)*

*Defined in [src/apis/avm/vertex.ts:209](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/avm/vertex.ts#L209)*

Class representing a Vertex which is a container for AVM Transactions.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`networkID` | number | DefaultNetworkID | Optional, [DefaultNetworkID](../modules/utils_constants.md#const-defaultnetworkid) |
`blockchainID` | string | "2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM" | Optional, default "2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM" |
`height` | BN | new BN(0) | Optional, default new BN(0) |
`epoch` | number | 0 | Optional, default new BN(0) |
`parentIDs` | Buffer[] | [] | Optional, default [] |
`txs` | [Tx](api_avm_transactions.tx.md)[] | [] | Optional, default [] |
`restrictions` | Buffer[] | [] | Optional, default []  |

**Returns:** *[Vertex](api_avm_vertex.vertex.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = AVMConstants.LATESTCODEC

*Overrides [NBytes](common_nbytes.nbytes.md).[_codecID](common_nbytes.nbytes.md#protected-_codecid)*

*Defined in [src/apis/avm/vertex.ts:23](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/avm/vertex.ts#L23)*

___

### `Protected` _typeID

• **_typeID**: *number* = undefined

*Inherited from [Serializable](utils_serialization.serializable.md).[_typeID](utils_serialization.serializable.md#protected-_typeid)*

*Defined in [src/utils/serialization.ts:50](https://github.com/ava-labs/avalanchejs/blob/8033096/src/utils/serialization.ts#L50)*

___

### `Protected` _typeName

• **_typeName**: *string* = "Vertex"

*Overrides [Serializable](utils_serialization.serializable.md).[_typeName](utils_serialization.serializable.md#protected-_typename)*

*Defined in [src/apis/avm/vertex.ts:22](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/avm/vertex.ts#L22)*

___

### `Protected` blockchainID

• **blockchainID**: *Buffer*

*Defined in [src/apis/avm/vertex.ts:27](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/avm/vertex.ts#L27)*

___

### `Protected` epoch

• **epoch**: *number*

*Defined in [src/apis/avm/vertex.ts:29](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/avm/vertex.ts#L29)*

___

### `Protected` height

• **height**: *BN*

*Defined in [src/apis/avm/vertex.ts:28](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/avm/vertex.ts#L28)*

___

### `Protected` networkID

• **networkID**: *number*

*Defined in [src/apis/avm/vertex.ts:26](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/avm/vertex.ts#L26)*

___

### `Protected` numParentIDs

• **numParentIDs**: *number*

*Defined in [src/apis/avm/vertex.ts:31](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/avm/vertex.ts#L31)*

___

### `Protected` numRestrictions

• **numRestrictions**: *number*

*Defined in [src/apis/avm/vertex.ts:35](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/avm/vertex.ts#L35)*

___

### `Protected` numTxs

• **numTxs**: *number*

*Defined in [src/apis/avm/vertex.ts:33](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/avm/vertex.ts#L33)*

___

### `Protected` parentIDs

• **parentIDs**: *Buffer[]*

*Defined in [src/apis/avm/vertex.ts:30](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/avm/vertex.ts#L30)*

___

### `Protected` restrictions

• **restrictions**: *Buffer[]*

*Defined in [src/apis/avm/vertex.ts:34](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/avm/vertex.ts#L34)*

___

### `Protected` txs

• **txs**: *[Tx](api_avm_transactions.tx.md)[]*

*Defined in [src/apis/avm/vertex.ts:32](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/avm/vertex.ts#L32)*

## Methods

###  clone

▸ **clone**(): *this*

*Defined in [src/apis/avm/vertex.ts:205](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/avm/vertex.ts#L205)*

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding?`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Inherited from [StandardParseableOutput](common_output.standardparseableoutput.md).[deserialize](common_output.standardparseableoutput.md#deserialize)*

*Defined in [src/utils/serialization.ts:97](https://github.com/ava-labs/avalanchejs/blob/8033096/src/utils/serialization.ts#L97)*

**Parameters:**

Name | Type |
------ | ------ |
`fields` | object |
`encoding?` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Defined in [src/apis/avm/vertex.ts:111](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/avm/vertex.ts#L111)*

Takes a [Buffer](https://github.com/feross/buffer) containing an [Vertex](api_avm_vertex.vertex.md), parses it, populates the class, and returns the length of the Vertex in bytes.

**`remarks`** assume not-checksummed

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`bytes` | Buffer | - | A [Buffer](https://github.com/feross/buffer) containing a raw [Vertex](api_avm_vertex.vertex.md)  |
`offset` | number | 0 | - |

**Returns:** *number*

The length of the raw [Vertex](api_avm_vertex.vertex.md)

___

###  getBlockchainID

▸ **getBlockchainID**(): *string*

*Defined in [src/apis/avm/vertex.ts:46](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/avm/vertex.ts#L46)*

Returns the BlockchainID as a CB58 string

**Returns:** *string*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Inherited from [NBytes](common_nbytes.nbytes.md).[getCodecID](common_nbytes.nbytes.md#getcodecid)*

*Defined in [src/utils/serialization.ts:70](https://github.com/ava-labs/avalanchejs/blob/8033096/src/utils/serialization.ts#L70)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getEpoch

▸ **getEpoch**(): *number*

*Defined in [src/apis/avm/vertex.ts:60](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/avm/vertex.ts#L60)*

Returns the Epoch as a number.

**Returns:** *number*

___

###  getHeight

▸ **getHeight**(): *BN*

*Defined in [src/apis/avm/vertex.ts:53](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/avm/vertex.ts#L53)*

Returns the Height as a [BN](https://github.com/indutny/bn.js/).

**Returns:** *BN*

___

###  getNetworkID

▸ **getNetworkID**(): *number*

*Defined in [src/apis/avm/vertex.ts:40](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/avm/vertex.ts#L40)*

Returns the NetworkID as a number

**Returns:** *number*

___

###  getParentIDs

▸ **getParentIDs**(): *Buffer[]*

*Defined in [src/apis/avm/vertex.ts:67](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/avm/vertex.ts#L67)*

**Returns:** *Buffer[]*

An array of Buffers

___

###  getRestrictions

▸ **getRestrictions**(): *Buffer[]*

*Defined in [src/apis/avm/vertex.ts:81](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/avm/vertex.ts#L81)*

**Returns:** *Buffer[]*

An array of Buffers

___

###  getTxs

▸ **getTxs**(): *[Tx](api_avm_transactions.tx.md)[]*

*Defined in [src/apis/avm/vertex.ts:74](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/avm/vertex.ts#L74)*

Returns array of UnsignedTxs.

**Returns:** *[Tx](api_avm_transactions.tx.md)[]*

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

▸ **serialize**(`encoding?`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *object*

*Inherited from [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/utils/serialization.ts:90](https://github.com/ava-labs/avalanchejs/blob/8033096/src/utils/serialization.ts#L90)*

**Parameters:**

Name | Type |
------ | ------ |
`encoding?` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) |

**Returns:** *object*

___

###  setCodecID

▸ **setCodecID**(`codecID`: number): *void*

*Defined in [src/apis/avm/vertex.ts:90](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/avm/vertex.ts#L90)*

Set the codecID

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`codecID` | number | The codecID to set  |

**Returns:** *void*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Defined in [src/apis/avm/vertex.ts:162](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/avm/vertex.ts#L162)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [Vertex](api_avm_vertex.vertex.md).

**Returns:** *Buffer*
