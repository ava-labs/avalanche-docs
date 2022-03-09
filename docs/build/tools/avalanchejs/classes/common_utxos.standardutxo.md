[avalanche](../README.md) › [Common-UTXOs](../modules/common_utxos.md) › [StandardUTXO](common_utxos.standardutxo.md)

# Class: StandardUTXO

Class for representing a single StandardUTXO.

## Hierarchy

* [Serializable](utils_serialization.serializable.md)

  ↳ **StandardUTXO**

  ↳ [UTXO](api_evm_utxos.utxo.md)

  ↳ [UTXO](api_avm_utxos.utxo.md)

  ↳ [UTXO](api_platformvm_utxos.utxo.md)

## Index

### Constructors

* [constructor](common_utxos.standardutxo.md#constructor)

### Properties

* [_codecID](common_utxos.standardutxo.md#protected-_codecid)
* [_typeID](common_utxos.standardutxo.md#protected-_typeid)
* [_typeName](common_utxos.standardutxo.md#protected-_typename)
* [assetID](common_utxos.standardutxo.md#protected-assetid)
* [codecID](common_utxos.standardutxo.md#protected-codecid)
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
* [sanitizeObject](common_utxos.standardutxo.md#sanitizeobject)
* [serialize](common_utxos.standardutxo.md#serialize)
* [toBuffer](common_utxos.standardutxo.md#tobuffer)
* [toString](common_utxos.standardutxo.md#abstract-tostring)

## Constructors

###  constructor

\+ **new StandardUTXO**(`codecID`: number, `txID`: Buffer, `outputidx`: Buffer | number, `assetID`: Buffer, `output`: [Output](common_output.output.md)): *[StandardUTXO](common_utxos.standardutxo.md)*

*Defined in [src/common/utxos.ts:172](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L172)*

Class for representing a single StandardUTXO.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`codecID` | number | 0 | Optional number which specifies the codeID of the UTXO. Default 0 |
`txID` | Buffer | undefined | Optional [Buffer](https://github.com/feross/buffer) of transaction ID for the StandardUTXO |
`outputidx` | Buffer &#124; number | undefined | - |
`assetID` | Buffer | undefined | Optional [Buffer](https://github.com/feross/buffer) of the asset ID for the StandardUTXO |
`output` | [Output](common_output.output.md) | undefined | - |

**Returns:** *[StandardUTXO](common_utxos.standardutxo.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:51](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L51)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [Serializable](utils_serialization.serializable.md).[_typeID](utils_serialization.serializable.md#protected-_typeid)*

*Defined in [src/common/utxos.ts:29](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L29)*

___

### `Protected` _typeName

• **_typeName**: *string* = "StandardUTXO"

*Overrides [Serializable](utils_serialization.serializable.md).[_typeName](utils_serialization.serializable.md#protected-_typename)*

*Defined in [src/common/utxos.ts:28](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L28)*

___

### `Protected` assetID

• **assetID**: *Buffer* = Buffer.alloc(32)

*Defined in [src/common/utxos.ts:87](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L87)*

___

### `Protected` codecID

• **codecID**: *Buffer* = Buffer.alloc(2)

*Defined in [src/common/utxos.ts:84](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L84)*

___

### `Protected` output

• **output**: *[Output](common_output.output.md)* = undefined

*Defined in [src/common/utxos.ts:88](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L88)*

___

### `Protected` outputidx

• **outputidx**: *Buffer* = Buffer.alloc(4)

*Defined in [src/common/utxos.ts:86](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L86)*

___

### `Protected` txid

• **txid**: *Buffer* = Buffer.alloc(32)

*Defined in [src/common/utxos.ts:85](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L85)*

## Methods

### `Abstract` clone

▸ **clone**(): *this*

*Defined in [src/common/utxos.ts:164](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L164)*

**Returns:** *this*

___

### `Abstract` create

▸ **create**(`codecID?`: number, `txid?`: Buffer, `outputidx?`: Buffer | number, `assetID?`: Buffer, `output?`: [Output](common_output.output.md)): *this*

*Defined in [src/common/utxos.ts:166](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L166)*

**Parameters:**

Name | Type |
------ | ------ |
`codecID?` | number |
`txid?` | Buffer |
`outputidx?` | Buffer &#124; number |
`assetID?` | Buffer |
`output?` | [Output](common_output.output.md) |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[deserialize](common_inputs.standardparseableinput.md#deserialize)*

*Defined in [src/common/utxos.ts:52](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L52)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *void*

___

### `Abstract` fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset?`: number): *number*

*Defined in [src/common/utxos.ts:132](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L132)*

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

*Defined in [src/common/utxos.ts:160](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L160)*

**Parameters:**

Name | Type |
------ | ------ |
`serialized` | string |

**Returns:** *number*

___

###  getAssetID

▸ **getAssetID**(): *Buffer*

*Defined in [src/common/utxos.ts:114](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L114)*

Returns the assetID as a [Buffer](https://github.com/feross/buffer).

**Returns:** *Buffer*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Overrides [SigIdx](common_signature.sigidx.md).[getCodecID](common_signature.sigidx.md#getcodecid)*

*Defined in [src/common/utxos.ts:93](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L93)*

Returns the numeric representation of the CodecID.

**Returns:** *number*

___

###  getCodecIDBuffer

▸ **getCodecIDBuffer**(): *Buffer*

*Defined in [src/common/utxos.ts:99](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L99)*

Returns the [Buffer](https://github.com/feross/buffer) representation of the CodecID

**Returns:** *Buffer*

___

###  getOutput

▸ **getOutput**(): *[Output](common_output.output.md)*

*Defined in [src/common/utxos.ts:125](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L125)*

Returns a reference to the output

**Returns:** *[Output](common_output.output.md)*

___

###  getOutputIdx

▸ **getOutputIdx**(): *Buffer*

*Defined in [src/common/utxos.ts:109](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L109)*

Returns a [Buffer](https://github.com/feross/buffer)  of the OutputIdx.

**Returns:** *Buffer*

___

###  getTxID

▸ **getTxID**(): *Buffer*

*Defined in [src/common/utxos.ts:104](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L104)*

Returns a [Buffer](https://github.com/feross/buffer) of the TxID.

**Returns:** *Buffer*

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

###  getUTXOID

▸ **getUTXOID**(): *string*

*Defined in [src/common/utxos.ts:119](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L119)*

Returns the UTXOID as a base-58 string (UTXOID is a string )

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

*Defined in [src/common/utxos.ts:31](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L31)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Defined in [src/common/utxos.ts:137](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L137)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [StandardUTXO](common_utxos.standardutxo.md).

**Returns:** *Buffer*

___

### `Abstract` toString

▸ **toString**(): *string*

*Defined in [src/common/utxos.ts:162](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L162)*

**Returns:** *string*
