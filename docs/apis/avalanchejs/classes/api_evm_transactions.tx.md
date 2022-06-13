[avalanche](../README.md) › [API-EVM-Transactions](../modules/api_evm_transactions.md) › [Tx](api_evm_transactions.tx.md)

# Class: Tx

## Hierarchy

  ↳ [EVMStandardTx](common_transactions.evmstandardtx.md)‹[KeyPair](api_evm_keychain.keypair.md), [KeyChain](api_evm_keychain.keychain.md), [UnsignedTx](api_evm_transactions.unsignedtx.md)›

  ↳ **Tx**

## Index

### Constructors

* [constructor](api_evm_transactions.tx.md#constructor)

### Properties

* [_codecID](api_evm_transactions.tx.md#protected-_codecid)
* [_typeID](api_evm_transactions.tx.md#protected-_typeid)
* [_typeName](api_evm_transactions.tx.md#protected-_typename)
* [credentials](api_evm_transactions.tx.md#protected-credentials)
* [unsignedTx](api_evm_transactions.tx.md#protected-unsignedtx)

### Methods

* [deserialize](api_evm_transactions.tx.md#deserialize)
* [fromBuffer](api_evm_transactions.tx.md#frombuffer)
* [fromString](api_evm_transactions.tx.md#fromstring)
* [getCodecID](api_evm_transactions.tx.md#getcodecid)
* [getTypeID](api_evm_transactions.tx.md#gettypeid)
* [getTypeName](api_evm_transactions.tx.md#gettypename)
* [getUnsignedTx](api_evm_transactions.tx.md#getunsignedtx)
* [sanitizeObject](api_evm_transactions.tx.md#sanitizeobject)
* [serialize](api_evm_transactions.tx.md#serialize)
* [toBuffer](api_evm_transactions.tx.md#tobuffer)
* [toString](api_evm_transactions.tx.md#tostring)

## Constructors

###  constructor

\+ **new Tx**(`unsignedTx`: [UnsignedTx](api_evm_transactions.unsignedtx.md), `credentials`: [Credential](common_signature.credential.md)[]): *[Tx](api_evm_transactions.tx.md)*

*Inherited from [EVMStandardTx](common_transactions.evmstandardtx.md).[constructor](common_transactions.evmstandardtx.md#constructor)*

*Defined in [src/common/evmtx.ts:361](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/evmtx.ts#L361)*

Class representing a signed transaction.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`unsignedTx` | [UnsignedTx](api_evm_transactions.unsignedtx.md) | undefined | Optional [StandardUnsignedTx](common_transactions.standardunsignedtx.md) |
`credentials` | [Credential](common_signature.credential.md)[] | undefined | - |

**Returns:** *[Tx](api_evm_transactions.tx.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [NBytes](common_nbytes.nbytes.md).[_codecID](common_nbytes.nbytes.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:51](https://github.com/ava-labs/avalanchejs/blob/8033096/src/utils/serialization.ts#L51)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [EVMStandardTx](common_transactions.evmstandardtx.md).[_typeID](common_transactions.evmstandardtx.md#protected-_typeid)*

*Defined in [src/apis/evm/tx.ts:92](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/evm/tx.ts#L92)*

___

### `Protected` _typeName

• **_typeName**: *string* = "Tx"

*Overrides [EVMStandardTx](common_transactions.evmstandardtx.md).[_typeName](common_transactions.evmstandardtx.md#protected-_typename)*

*Defined in [src/apis/evm/tx.ts:91](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/evm/tx.ts#L91)*

___

### `Protected` credentials

• **credentials**: *[Credential](common_signature.credential.md)[]* = []

*Inherited from [EVMStandardTx](common_transactions.evmstandardtx.md).[credentials](common_transactions.evmstandardtx.md#protected-credentials)*

*Defined in [src/common/evmtx.ts:305](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/evmtx.ts#L305)*

___

### `Protected` unsignedTx

• **unsignedTx**: *[UnsignedTx](api_evm_transactions.unsignedtx.md)* = undefined

*Inherited from [EVMStandardTx](common_transactions.evmstandardtx.md).[unsignedTx](common_transactions.evmstandardtx.md#protected-unsignedtx)*

*Defined in [src/common/evmtx.ts:304](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/evmtx.ts#L304)*

## Methods

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Overrides [StandardParseableOutput](common_output.standardparseableoutput.md).[deserialize](common_output.standardparseableoutput.md#deserialize)*

*Defined in [src/apis/evm/tx.ts:96](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/evm/tx.ts#L96)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Overrides [EVMStandardTx](common_transactions.evmstandardtx.md).[fromBuffer](common_transactions.evmstandardtx.md#abstract-frombuffer)*

*Defined in [src/apis/evm/tx.ts:119](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/evm/tx.ts#L119)*

Takes a [Buffer](https://github.com/feross/buffer) containing an [Tx](api_evm_transactions.tx.md), parses it,
populates the class, and returns the length of the Tx in bytes.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`bytes` | Buffer | - | A [Buffer](https://github.com/feross/buffer) containing a raw [Tx](api_evm_transactions.tx.md) |
`offset` | number | 0 | A number representing the starting point of the bytes to begin parsing  |

**Returns:** *number*

The length of the raw [Tx](api_evm_transactions.tx.md)

___

###  fromString

▸ **fromString**(`serialized`: string): *number*

*Inherited from [EVMStandardTx](common_transactions.evmstandardtx.md).[fromString](common_transactions.evmstandardtx.md#fromstring)*

*Defined in [src/common/evmtx.ts:349](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/evmtx.ts#L349)*

Takes a base-58 string containing an [StandardTx](common_transactions.standardtx.md), parses it, populates the class, and returns the length of the Tx in bytes.

**`remarks`** 
unlike most fromStrings, it expects the string to be serialized in cb58 format

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`serialized` | string | A base-58 string containing a raw [StandardTx](common_transactions.standardtx.md)  |

**Returns:** *number*

The length of the raw [StandardTx](common_transactions.standardtx.md)

___

###  getCodecID

▸ **getCodecID**(): *number*

*Inherited from [NBytes](common_nbytes.nbytes.md).[getCodecID](common_nbytes.nbytes.md#getcodecid)*

*Defined in [src/utils/serialization.ts:70](https://github.com/ava-labs/avalanchejs/blob/8033096/src/utils/serialization.ts#L70)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

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

###  getUnsignedTx

▸ **getUnsignedTx**(): *[UnsignedTx](api_evm_transactions.unsignedtx.md)*

*Inherited from [EVMStandardTx](common_transactions.evmstandardtx.md).[getUnsignedTx](common_transactions.evmstandardtx.md#getunsignedtx)*

*Defined in [src/common/evmtx.ts:310](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/evmtx.ts#L310)*

Returns the [StandardUnsignedTx](common_transactions.standardunsignedtx.md)

**Returns:** *[UnsignedTx](api_evm_transactions.unsignedtx.md)*

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

*Inherited from [EVMStandardTx](common_transactions.evmstandardtx.md).[serialize](common_transactions.evmstandardtx.md#serialize)*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/common/evmtx.ts:295](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/evmtx.ts#L295)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Inherited from [EVMStandardTx](common_transactions.evmstandardtx.md).[toBuffer](common_transactions.evmstandardtx.md#tobuffer)*

*Defined in [src/common/evmtx.ts:319](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/evmtx.ts#L319)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [StandardTx](common_transactions.standardtx.md).

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Inherited from [EVMStandardTx](common_transactions.evmstandardtx.md).[toString](common_transactions.evmstandardtx.md#tostring)*

*Defined in [src/common/evmtx.ts:359](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/evmtx.ts#L359)*

Returns a cb58 representation of the [StandardTx](common_transactions.standardtx.md).

**`remarks`** 
unlike most toStrings, this returns in cb58 serialization format

**Returns:** *string*
