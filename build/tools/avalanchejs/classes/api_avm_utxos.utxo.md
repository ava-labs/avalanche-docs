[avalanche](../README.md) › [API-AVM-UTXOs](../modules/api_avm_utxos.md) › [UTXO](api_avm_utxos.utxo.md)

# Class: UTXO

Class for representing a single UTXO.

## Hierarchy

  ↳ [StandardUTXO](common_utxos.standardutxo.md)

  ↳ **UTXO**

## Index

### Constructors

* [constructor](api_avm_utxos.utxo.md#constructor)

### Properties

* [_codecID](api_avm_utxos.utxo.md#protected-_codecid)
* [_typeID](api_avm_utxos.utxo.md#protected-_typeid)
* [_typeName](api_avm_utxos.utxo.md#protected-_typename)
* [assetID](api_avm_utxos.utxo.md#protected-assetid)
* [codecID](api_avm_utxos.utxo.md#protected-codecid)
* [output](api_avm_utxos.utxo.md#protected-output)
* [outputidx](api_avm_utxos.utxo.md#protected-outputidx)
* [txid](api_avm_utxos.utxo.md#protected-txid)

### Methods

* [clone](api_avm_utxos.utxo.md#clone)
* [create](api_avm_utxos.utxo.md#create)
* [deserialize](api_avm_utxos.utxo.md#deserialize)
* [fromBuffer](api_avm_utxos.utxo.md#frombuffer)
* [fromString](api_avm_utxos.utxo.md#fromstring)
* [getAssetID](api_avm_utxos.utxo.md#getassetid)
* [getCodecID](api_avm_utxos.utxo.md#getcodecid)
* [getCodecIDBuffer](api_avm_utxos.utxo.md#getcodecidbuffer)
* [getOutput](api_avm_utxos.utxo.md#getoutput)
* [getOutputIdx](api_avm_utxos.utxo.md#getoutputidx)
* [getTxID](api_avm_utxos.utxo.md#gettxid)
* [getTypeID](api_avm_utxos.utxo.md#gettypeid)
* [getTypeName](api_avm_utxos.utxo.md#gettypename)
* [getUTXOID](api_avm_utxos.utxo.md#getutxoid)
* [serialize](api_avm_utxos.utxo.md#serialize)
* [toBuffer](api_avm_utxos.utxo.md#tobuffer)
* [toString](api_avm_utxos.utxo.md#tostring)

## Constructors

###  constructor

\+ **new UTXO**(`codecID`: number, `txID`: Buffer, `outputidx`: Buffer | number, `assetID`: Buffer, `output`: [Output](common_output.output.md)): *[UTXO](api_avm_utxos.utxo.md)*

*Inherited from [StandardUTXO](common_utxos.standardutxo.md).[constructor](common_utxos.standardutxo.md#constructor)*

*Defined in [src/common/utxos.ts:125](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/utxos.ts#L125)*

Class for representing a single StandardUTXO.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`codecID` | number | 0 | Optional number which specifies the codeID of the UTXO. Default 0 |
`txID` | Buffer | undefined | Optional [Buffer](https://github.com/feross/buffer) of transaction ID for the StandardUTXO |
`outputidx` | Buffer &#124; number | undefined | - |
`assetID` | Buffer | undefined | Optional [Buffer](https://github.com/feross/buffer) of the asset ID for the StandardUTXO |
`output` | [Output](common_output.output.md) | undefined | - |

**Returns:** *[UTXO](api_avm_utxos.utxo.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:40](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L40)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [StandardUTXO](common_utxos.standardutxo.md).[_typeID](common_utxos.standardutxo.md#protected-_typeid)*

*Defined in [src/apis/avm/utxos.ts:39](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/utxos.ts#L39)*

___

### `Protected` _typeName

• **_typeName**: *string* = "UTXO"

*Overrides [StandardUTXO](common_utxos.standardutxo.md).[_typeName](common_utxos.standardutxo.md#protected-_typename)*

*Defined in [src/apis/avm/utxos.ts:38](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/utxos.ts#L38)*

___

### `Protected` assetID

• **assetID**: *Buffer* = Buffer.alloc(32)

*Inherited from [StandardUTXO](common_utxos.standardutxo.md).[assetID](common_utxos.standardutxo.md#protected-assetid)*

*Defined in [src/common/utxos.ts:49](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/utxos.ts#L49)*

___

### `Protected` codecID

• **codecID**: *Buffer* = Buffer.alloc(2)

*Inherited from [StandardUTXO](common_utxos.standardutxo.md).[codecID](common_utxos.standardutxo.md#protected-codecid)*

*Defined in [src/common/utxos.ts:46](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/utxos.ts#L46)*

___

### `Protected` output

• **output**: *[Output](common_output.output.md)* = undefined

*Inherited from [StandardUTXO](common_utxos.standardutxo.md).[output](common_utxos.standardutxo.md#protected-output)*

*Defined in [src/common/utxos.ts:50](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/utxos.ts#L50)*

___

### `Protected` outputidx

• **outputidx**: *Buffer* = Buffer.alloc(4)

*Inherited from [StandardUTXO](common_utxos.standardutxo.md).[outputidx](common_utxos.standardutxo.md#protected-outputidx)*

*Defined in [src/common/utxos.ts:48](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/utxos.ts#L48)*

___

### `Protected` txid

• **txid**: *Buffer* = Buffer.alloc(32)

*Inherited from [StandardUTXO](common_utxos.standardutxo.md).[txid](common_utxos.standardutxo.md#protected-txid)*

*Defined in [src/common/utxos.ts:47](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/utxos.ts#L47)*

## Methods

###  clone

▸ **clone**(): *this*

*Overrides [StandardUTXO](common_utxos.standardutxo.md).[clone](common_utxos.standardutxo.md#abstract-clone)*

*Defined in [src/apis/avm/utxos.ts:90](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/utxos.ts#L90)*

**Returns:** *this*

___

###  create

▸ **create**(`codecID`: number, `txid`: Buffer, `outputidx`: Buffer | number, `assetID`: Buffer, `output`: [Output](common_output.output.md)): *this*

*Overrides [StandardUTXO](common_utxos.standardutxo.md).[create](common_utxos.standardutxo.md#abstract-create)*

*Defined in [src/apis/avm/utxos.ts:96](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/utxos.ts#L96)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`codecID` | number | AVMConstants.LATESTCODEC |
`txid` | Buffer | undefined |
`outputidx` | Buffer &#124; number | undefined |
`assetID` | Buffer | undefined |
`output` | [Output](common_output.output.md) | undefined |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Overrides [StandardUTXO](common_utxos.standardutxo.md).[deserialize](common_utxos.standardutxo.md#deserialize)*

*Defined in [src/apis/avm/utxos.ts:43](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/utxos.ts#L43)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Overrides [StandardUTXO](common_utxos.standardutxo.md).[fromBuffer](common_utxos.standardutxo.md#abstract-frombuffer)*

*Defined in [src/apis/avm/utxos.ts:49](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/utxos.ts#L49)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`bytes` | Buffer | - |
`offset` | number | 0 |

**Returns:** *number*

___

###  fromString

▸ **fromString**(`serialized`: string): *number*

*Overrides [StandardUTXO](common_utxos.standardutxo.md).[fromString](common_utxos.standardutxo.md#abstract-fromstring)*

*Defined in [src/apis/avm/utxos.ts:74](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/utxos.ts#L74)*

Takes a base-58 string containing a [UTXO](api_avm_utxos.utxo.md), parses it, populates the class, and returns the length of the StandardUTXO in bytes.

**`remarks`** 
unlike most fromStrings, it expects the string to be serialized in cb58 format

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`serialized` | string | A base-58 string containing a raw [UTXO](api_avm_utxos.utxo.md)  |

**Returns:** *number*

The length of the raw [UTXO](api_avm_utxos.utxo.md)

___

###  getAssetID

▸ **getAssetID**(): *Buffer*

*Inherited from [StandardUTXO](common_utxos.standardutxo.md).[getAssetID](common_utxos.standardutxo.md#getassetid)*

*Defined in [src/common/utxos.ts:81](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/utxos.ts#L81)*

Returns the assetID as a [Buffer](https://github.com/feross/buffer).

**Returns:** *Buffer*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Inherited from [StandardUTXO](common_utxos.standardutxo.md).[getCodecID](common_utxos.standardutxo.md#getcodecid)*

*Overrides [SigIdx](common_signature.sigidx.md).[getCodecID](common_signature.sigidx.md#getcodecid)*

*Defined in [src/common/utxos.ts:55](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/utxos.ts#L55)*

Returns the numeric representation of the CodecID.

**Returns:** *number*

___

###  getCodecIDBuffer

▸ **getCodecIDBuffer**(): *Buffer*

*Inherited from [StandardUTXO](common_utxos.standardutxo.md).[getCodecIDBuffer](common_utxos.standardutxo.md#getcodecidbuffer)*

*Defined in [src/common/utxos.ts:62](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/utxos.ts#L62)*

Returns the [Buffer](https://github.com/feross/buffer) representation of the CodecID

**Returns:** *Buffer*

___

###  getOutput

▸ **getOutput**(): *[Output](common_output.output.md)*

*Inherited from [StandardUTXO](common_utxos.standardutxo.md).[getOutput](common_utxos.standardutxo.md#getoutput)*

*Defined in [src/common/utxos.ts:93](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/utxos.ts#L93)*

Returns a reference to the output

**Returns:** *[Output](common_output.output.md)*

___

###  getOutputIdx

▸ **getOutputIdx**(): *Buffer*

*Inherited from [StandardUTXO](common_utxos.standardutxo.md).[getOutputIdx](common_utxos.standardutxo.md#getoutputidx)*

*Defined in [src/common/utxos.ts:74](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/utxos.ts#L74)*

Returns a [Buffer](https://github.com/feross/buffer)  of the OutputIdx.

**Returns:** *Buffer*

___

###  getTxID

▸ **getTxID**(): *Buffer*

*Inherited from [StandardUTXO](common_utxos.standardutxo.md).[getTxID](common_utxos.standardutxo.md#gettxid)*

*Defined in [src/common/utxos.ts:67](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/utxos.ts#L67)*

Returns a [Buffer](https://github.com/feross/buffer) of the TxID.

**Returns:** *Buffer*

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

###  getUTXOID

▸ **getUTXOID**(): *string*

*Inherited from [StandardUTXO](common_utxos.standardutxo.md).[getUTXOID](common_utxos.standardutxo.md#getutxoid)*

*Defined in [src/common/utxos.ts:86](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/utxos.ts#L86)*

Returns the UTXOID as a base-58 string (UTXOID is a string )

**Returns:** *string*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *object*

*Inherited from [StandardUTXO](common_utxos.standardutxo.md).[serialize](common_utxos.standardutxo.md#serialize)*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/common/utxos.ts:27](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/utxos.ts#L27)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Inherited from [StandardUTXO](common_utxos.standardutxo.md).[toBuffer](common_utxos.standardutxo.md#tobuffer)*

*Defined in [src/common/utxos.ts:105](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/utxos.ts#L105)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [StandardUTXO](common_utxos.standardutxo.md).

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Overrides [StandardUTXO](common_utxos.standardutxo.md).[toString](common_utxos.standardutxo.md#abstract-tostring)*

*Defined in [src/apis/avm/utxos.ts:85](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/utxos.ts#L85)*

Returns a base-58 representation of the [UTXO](api_avm_utxos.utxo.md).

**`remarks`** 
unlike most toStrings, this returns in cb58 serialization format

**Returns:** *string*
