[avalanche](../README.md) › [Common-UTXOs](../modules/common_utxos.md) › [StandardUTXO](common_utxos.standardutxo.md)

# Class: StandardUTXO

Class for representing a single StandardUTXO.

## Hierarchy

* [Serializable](utils_serialization.serializable.md)

  ↳ **StandardUTXO**

  ↳ [UTXO](api_avm_utxos.utxo.md)

  ↳ [UTXO](api_evm_utxos.utxo.md)

  ↳ [UTXO](api_platformvm_utxos.utxo.md)

## Index

### Constructors

* [constructor](common_utxos.standardutxo.md#constructor)

### Properties

* [_codecID](common_utxos.standardutxo.md#protected-_codecid)
* [_typeID](common_utxos.standardutxo.md#protected-_typeid)
* [_typeName](common_utxos.standardutxo.md#protected-_typename)
* [assetid](common_utxos.standardutxo.md#protected-assetid)
* [codecid](common_utxos.standardutxo.md#protected-codecid)
* [output](common_utxos.standardutxo.md#protected-output)
* [outputidx](common_utxos.standardutxo.md#protected-outputidx)
* [txid](common_utxos.standardutxo.md#protected-txid)

### Methods

* [clone](common_utxos.standardutxo.md#abstract-clone)
* [create](common_utxos.standardutxo.md#abstract-create)
* [deserialize](common_utxos.standardutxo.md#deserialize)
* [fromBuffer](common_utxos.standardutxo.md#abstract-frombuffer)
* [fromString](common_utxos.standardutxo.md#abstract-fromstring)
* [getAssetID](common_utxos.standardutxo.md#getassetid)
* [getCodecID](common_utxos.standardutxo.md#getcodecid)
* [getCodecIDBuffer](common_utxos.standardutxo.md#getcodecidbuffer)
* [getOutput](common_utxos.standardutxo.md#getoutput)
* [getOutputIdx](common_utxos.standardutxo.md#getoutputidx)
* [getTxID](common_utxos.standardutxo.md#gettxid)
* [getTypeID](common_utxos.standardutxo.md#gettypeid)
* [getTypeName](common_utxos.standardutxo.md#gettypename)
* [getUTXOID](common_utxos.standardutxo.md#getutxoid)
* [serialize](common_utxos.standardutxo.md#serialize)
* [toBuffer](common_utxos.standardutxo.md#tobuffer)
* [toString](common_utxos.standardutxo.md#abstract-tostring)

## Constructors

###  constructor

\+ **new StandardUTXO**(`codecID`: number, `txid`: Buffer, `outputidx`: Buffer | number, `assetid`: Buffer, `output`: [Output](common_output.output.md)): *[StandardUTXO](common_utxos.standardutxo.md)*

*Defined in [src/common/utxos.ts:125](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/utxos.ts#L125)*

Class for representing a single StandardUTXO.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`codecID` | number | 0 | Optional number which specifies the codeID of the UTXO. Default 1 |
`txid` | Buffer | undefined | Optional [Buffer](https://github.com/feross/buffer) of transaction ID for the StandardUTXO |
`outputidx` | Buffer &#124; number | undefined | - |
`assetid` | Buffer | undefined | Optional [Buffer](https://github.com/feross/buffer) of the asset ID for the StandardUTXO |
`output` | [Output](common_output.output.md) | undefined | - |

**Returns:** *[StandardUTXO](common_utxos.standardutxo.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [Serializable](utils_serialization.serializable.md).[_codecID](utils_serialization.serializable.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:42](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/serialization.ts#L42)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [Serializable](utils_serialization.serializable.md).[_typeID](utils_serialization.serializable.md#protected-_typeid)*

*Defined in [src/common/utxos.ts:25](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/utxos.ts#L25)*

___

### `Protected` _typeName

• **_typeName**: *string* = "StandardUTXO"

*Overrides [Serializable](utils_serialization.serializable.md).[_typeName](utils_serialization.serializable.md#protected-_typename)*

*Defined in [src/common/utxos.ts:24](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/utxos.ts#L24)*

___

### `Protected` assetid

• **assetid**: *Buffer* = Buffer.alloc(32)

*Defined in [src/common/utxos.ts:49](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/utxos.ts#L49)*

___

### `Protected` codecid

• **codecid**: *Buffer* = Buffer.alloc(2)

*Defined in [src/common/utxos.ts:46](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/utxos.ts#L46)*

___

### `Protected` output

• **output**: *[Output](common_output.output.md)* = undefined

*Defined in [src/common/utxos.ts:50](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/utxos.ts#L50)*

___

### `Protected` outputidx

• **outputidx**: *Buffer* = Buffer.alloc(4)

*Defined in [src/common/utxos.ts:48](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/utxos.ts#L48)*

___

### `Protected` txid

• **txid**: *Buffer* = Buffer.alloc(32)

*Defined in [src/common/utxos.ts:47](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/utxos.ts#L47)*

## Methods

### `Abstract` clone

▸ **clone**(): *this*

*Defined in [src/common/utxos.ts:120](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/utxos.ts#L120)*

**Returns:** *this*

___

### `Abstract` create

▸ **create**(`codecID?`: number, `txid?`: Buffer, `outputidx?`: Buffer | number, `assetid?`: Buffer, `output?`: [Output](common_output.output.md)): *this*

*Defined in [src/common/utxos.ts:122](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/utxos.ts#L122)*

**Parameters:**

Name | Type |
------ | ------ |
`codecID?` | number |
`txid?` | Buffer |
`outputidx?` | Buffer &#124; number |
`assetid?` | Buffer |
`output?` | [Output](common_output.output.md) |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Overrides [Serializable](utils_serialization.serializable.md).[deserialize](utils_serialization.serializable.md#deserialize)*

*Defined in [src/common/utxos.ts:38](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/utxos.ts#L38)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *void*

___

### `Abstract` fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset?`: number): *number*

*Defined in [src/common/utxos.ts:100](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/utxos.ts#L100)*

Takes a [Buffer](https://github.com/feross/buffer) containing an [StandardUTXO](common_utxos.standardutxo.md), parses it, populates the class, and returns the length of the StandardUTXO in bytes.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`bytes` | Buffer | A [Buffer](https://github.com/feross/buffer) containing a raw [StandardUTXO](common_utxos.standardutxo.md)  |
`offset?` | number | - |

**Returns:** *number*

___

### `Abstract` fromString

▸ **fromString**(`serialized`: string): *number*

*Defined in [src/common/utxos.ts:116](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/utxos.ts#L116)*

**Parameters:**

Name | Type |
------ | ------ |
`serialized` | string |

**Returns:** *number*

___

###  getAssetID

▸ **getAssetID**(): *Buffer*

*Defined in [src/common/utxos.ts:81](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/utxos.ts#L81)*

Returns the assetID as a [Buffer](https://github.com/feross/buffer).

**Returns:** *Buffer*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Overrides [Serializable](utils_serialization.serializable.md).[getCodecID](utils_serialization.serializable.md#getcodecid)*

*Defined in [src/common/utxos.ts:55](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/utxos.ts#L55)*

Returns the numeric representation of the CodecID.

**Returns:** *number*

___

###  getCodecIDBuffer

▸ **getCodecIDBuffer**(): *Buffer*

*Defined in [src/common/utxos.ts:62](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/utxos.ts#L62)*

Returns the [Buffer](https://github.com/feross/buffer) representation of the CodecID

**Returns:** *Buffer*

___

###  getOutput

▸ **getOutput**(): *[Output](common_output.output.md)*

*Defined in [src/common/utxos.ts:93](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/utxos.ts#L93)*

Returns a reference to the output;

**Returns:** *[Output](common_output.output.md)*

___

###  getOutputIdx

▸ **getOutputIdx**(): *Buffer*

*Defined in [src/common/utxos.ts:74](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/utxos.ts#L74)*

Returns a [Buffer](https://github.com/feross/buffer)  of the OutputIdx.

**Returns:** *Buffer*

___

###  getTxID

▸ **getTxID**(): *Buffer*

*Defined in [src/common/utxos.ts:67](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/utxos.ts#L67)*

Returns a [Buffer](https://github.com/feross/buffer) of the TxID.

**Returns:** *Buffer*

___

###  getTypeID

▸ **getTypeID**(): *number*

*Inherited from [Serializable](utils_serialization.serializable.md).[getTypeID](utils_serialization.serializable.md#gettypeid)*

*Defined in [src/utils/serialization.ts:54](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/serialization.ts#L54)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getTypeName

▸ **getTypeName**(): *string*

*Inherited from [Serializable](utils_serialization.serializable.md).[getTypeName](utils_serialization.serializable.md#gettypename)*

*Defined in [src/utils/serialization.ts:47](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/serialization.ts#L47)*

Used in serialization. TypeName is a string name for the type of object being output.

**Returns:** *string*

___

###  getUTXOID

▸ **getUTXOID**(): *string*

*Defined in [src/common/utxos.ts:86](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/utxos.ts#L86)*

Returns the UTXOID as a base-58 string (UTXOID is a string )

**Returns:** *string*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *object*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/common/utxos.ts:27](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/utxos.ts#L27)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Defined in [src/common/utxos.ts:105](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/utxos.ts#L105)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [StandardUTXO](common_utxos.standardutxo.md).

**Returns:** *Buffer*

___

### `Abstract` toString

▸ **toString**(): *string*

*Defined in [src/common/utxos.ts:118](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/utxos.ts#L118)*

**Returns:** *string*
