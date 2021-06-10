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
* [serialize](api_evm_transactions.tx.md#serialize)
* [toBuffer](api_evm_transactions.tx.md#tobuffer)
* [toString](api_evm_transactions.tx.md#tostring)

## Constructors

###  constructor

\+ **new Tx**(`unsignedTx`: [UnsignedTx](api_evm_transactions.unsignedtx.md), `credentials`: [Credential](common_signature.credential.md)[]): *[Tx](api_evm_transactions.tx.md)*

*Inherited from [EVMStandardTx](common_transactions.evmstandardtx.md).[constructor](common_transactions.evmstandardtx.md#constructor)*

*Defined in [src/common/evmtx.ts:298](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/common/evmtx.ts#L298)*

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

*Inherited from [Serializable](utils_serialization.serializable.md).[_codecID](utils_serialization.serializable.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:42](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/serialization.ts#L42)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [EVMStandardTx](common_transactions.evmstandardtx.md).[_typeID](common_transactions.evmstandardtx.md#protected-_typeid)*

*Defined in [src/apis/evm/tx.ts:87](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/evm/tx.ts#L87)*

___

### `Protected` _typeName

• **_typeName**: *string* = "Tx"

*Overrides [EVMStandardTx](common_transactions.evmstandardtx.md).[_typeName](common_transactions.evmstandardtx.md#protected-_typename)*

*Defined in [src/apis/evm/tx.ts:86](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/evm/tx.ts#L86)*

___

### `Protected` credentials

• **credentials**: *[Credential](common_signature.credential.md)[]* = []

*Inherited from [EVMStandardTx](common_transactions.evmstandardtx.md).[credentials](common_transactions.evmstandardtx.md#protected-credentials)*

*Defined in [src/common/evmtx.ts:242](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/common/evmtx.ts#L242)*

___

### `Protected` unsignedTx

• **unsignedTx**: *[UnsignedTx](api_evm_transactions.unsignedtx.md)* = undefined

*Inherited from [EVMStandardTx](common_transactions.evmstandardtx.md).[unsignedTx](common_transactions.evmstandardtx.md#protected-unsignedtx)*

*Defined in [src/common/evmtx.ts:241](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/common/evmtx.ts#L241)*

## Methods

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Overrides [Serializable](utils_serialization.serializable.md).[deserialize](utils_serialization.serializable.md#deserialize)*

*Defined in [src/apis/evm/tx.ts:91](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/evm/tx.ts#L91)*

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

*Defined in [src/apis/evm/tx.ts:112](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/evm/tx.ts#L112)*

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

*Defined in [src/common/evmtx.ts:286](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/common/evmtx.ts#L286)*

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

*Inherited from [Serializable](utils_serialization.serializable.md).[getCodecID](utils_serialization.serializable.md#getcodecid)*

*Defined in [src/utils/serialization.ts:61](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/serialization.ts#L61)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getTypeID

▸ **getTypeID**(): *number*

*Inherited from [Serializable](utils_serialization.serializable.md).[getTypeID](utils_serialization.serializable.md#gettypeid)*

*Defined in [src/utils/serialization.ts:54](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/serialization.ts#L54)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getTypeName

▸ **getTypeName**(): *string*

*Inherited from [Serializable](utils_serialization.serializable.md).[getTypeName](utils_serialization.serializable.md#gettypename)*

*Defined in [src/utils/serialization.ts:47](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/serialization.ts#L47)*

Used in serialization. TypeName is a string name for the type of object being output.

**Returns:** *string*

___

###  getUnsignedTx

▸ **getUnsignedTx**(): *[UnsignedTx](api_evm_transactions.unsignedtx.md)*

*Inherited from [EVMStandardTx](common_transactions.evmstandardtx.md).[getUnsignedTx](common_transactions.evmstandardtx.md#getunsignedtx)*

*Defined in [src/common/evmtx.ts:247](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/common/evmtx.ts#L247)*

Returns the [StandardUnsignedTx](common_transactions.standardunsignedtx.md)

**Returns:** *[UnsignedTx](api_evm_transactions.unsignedtx.md)*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *object*

*Inherited from [EVMStandardTx](common_transactions.evmstandardtx.md).[serialize](common_transactions.evmstandardtx.md#serialize)*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/common/evmtx.ts:232](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/common/evmtx.ts#L232)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Inherited from [EVMStandardTx](common_transactions.evmstandardtx.md).[toBuffer](common_transactions.evmstandardtx.md#tobuffer)*

*Defined in [src/common/evmtx.ts:256](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/common/evmtx.ts#L256)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [StandardTx](common_transactions.standardtx.md).

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Inherited from [EVMStandardTx](common_transactions.evmstandardtx.md).[toString](common_transactions.evmstandardtx.md#tostring)*

*Defined in [src/common/evmtx.ts:296](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/common/evmtx.ts#L296)*

Returns a cb58 representation of the [StandardTx](common_transactions.standardtx.md).

**`remarks`** 
unlike most toStrings, this returns in cb58 serialization format

**Returns:** *string*
