[avalanche](../README.md) › [API-PlatformVM-Transactions](../modules/api_platformvm_transactions.md) › [Tx](api_platformvm_transactions.tx.md)

# Class: Tx

## Hierarchy

  ↳ [StandardTx](common_transactions.standardtx.md)‹[KeyPair](api_platformvm_keychain.keypair.md), [KeyChain](api_platformvm_keychain.keychain.md), [UnsignedTx](api_platformvm_transactions.unsignedtx.md)›

  ↳ **Tx**

## Index

### Constructors

* [constructor](api_platformvm_transactions.tx.md#constructor)

### Properties

* [_codecID](api_platformvm_transactions.tx.md#protected-_codecid)
* [_typeID](api_platformvm_transactions.tx.md#protected-_typeid)
* [_typeName](api_platformvm_transactions.tx.md#protected-_typename)
* [credentials](api_platformvm_transactions.tx.md#protected-credentials)
* [unsignedTx](api_platformvm_transactions.tx.md#protected-unsignedtx)

### Methods

* [deserialize](api_platformvm_transactions.tx.md#deserialize)
* [fromBuffer](api_platformvm_transactions.tx.md#frombuffer)
* [fromString](api_platformvm_transactions.tx.md#fromstring)
* [getCodecID](api_platformvm_transactions.tx.md#getcodecid)
* [getTypeID](api_platformvm_transactions.tx.md#gettypeid)
* [getTypeName](api_platformvm_transactions.tx.md#gettypename)
* [getUnsignedTx](api_platformvm_transactions.tx.md#getunsignedtx)
* [serialize](api_platformvm_transactions.tx.md#serialize)
* [toBuffer](api_platformvm_transactions.tx.md#tobuffer)
* [toString](api_platformvm_transactions.tx.md#tostring)

## Constructors

###  constructor

\+ **new Tx**(`unsignedTx`: [UnsignedTx](api_platformvm_transactions.unsignedtx.md), `credentials`: Array‹[Credential](common_signature.credential.md)›): *[Tx](api_platformvm_transactions.tx.md)*

*Inherited from [StandardTx](common_transactions.standardtx.md).[constructor](common_transactions.standardtx.md#constructor)*

*Defined in [src/common/tx.ts:378](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/tx.ts#L378)*

Class representing a signed transaction.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`unsignedTx` | [UnsignedTx](api_platformvm_transactions.unsignedtx.md) | undefined | Optional [StandardUnsignedTx](common_transactions.standardunsignedtx.md) |
`credentials` | Array‹[Credential](common_signature.credential.md)› | undefined | - |

**Returns:** *[Tx](api_platformvm_transactions.tx.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [Serializable](utils_serialization.serializable.md).[_codecID](utils_serialization.serializable.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:42](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/serialization.ts#L42)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [StandardTx](common_transactions.standardtx.md).[_typeID](common_transactions.standardtx.md#protected-_typeid)*

*Defined in [src/apis/platformvm/tx.ts:94](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/tx.ts#L94)*

___

### `Protected` _typeName

• **_typeName**: *string* = "Tx"

*Overrides [StandardTx](common_transactions.standardtx.md).[_typeName](common_transactions.standardtx.md#protected-_typename)*

*Defined in [src/apis/platformvm/tx.ts:93](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/tx.ts#L93)*

___

### `Protected` credentials

• **credentials**: *Array‹[Credential](common_signature.credential.md)›* = []

*Inherited from [StandardTx](common_transactions.standardtx.md).[credentials](common_transactions.standardtx.md#protected-credentials)*

*Defined in [src/common/tx.ts:319](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/tx.ts#L319)*

___

### `Protected` unsignedTx

• **unsignedTx**: *[UnsignedTx](api_platformvm_transactions.unsignedtx.md)* = undefined

*Inherited from [StandardTx](common_transactions.standardtx.md).[unsignedTx](common_transactions.standardtx.md#protected-unsignedtx)*

*Defined in [src/common/tx.ts:318](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/tx.ts#L318)*

## Methods

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Overrides [Serializable](utils_serialization.serializable.md).[deserialize](utils_serialization.serializable.md#deserialize)*

*Defined in [src/apis/platformvm/tx.ts:98](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/tx.ts#L98)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Overrides [StandardTx](common_transactions.standardtx.md).[fromBuffer](common_transactions.standardtx.md#abstract-frombuffer)*

*Defined in [src/apis/platformvm/tx.ts:118](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/tx.ts#L118)*

Takes a [Buffer](https://github.com/feross/buffer) containing an [Tx](api_platformvm_transactions.tx.md), parses it, populates the class, and returns the length of the Tx in bytes.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`bytes` | Buffer | - | A [Buffer](https://github.com/feross/buffer) containing a raw [Tx](api_platformvm_transactions.tx.md) |
`offset` | number | 0 | A number representing the starting point of the bytes to begin parsing  |

**Returns:** *number*

The length of the raw [Tx](api_platformvm_transactions.tx.md)

___

###  fromString

▸ **fromString**(`serialized`: string): *number*

*Inherited from [StandardTx](common_transactions.standardtx.md).[fromString](common_transactions.standardtx.md#fromstring)*

*Defined in [src/common/tx.ts:366](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/tx.ts#L366)*

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

*Defined in [src/utils/serialization.ts:61](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/serialization.ts#L61)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

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

###  getUnsignedTx

▸ **getUnsignedTx**(): *[UnsignedTx](api_platformvm_transactions.unsignedtx.md)*

*Inherited from [StandardTx](common_transactions.standardtx.md).[getUnsignedTx](common_transactions.standardtx.md#getunsignedtx)*

*Defined in [src/common/tx.ts:324](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/tx.ts#L324)*

Returns the [StandardUnsignedTx](common_transactions.standardunsignedtx.md)

**Returns:** *[UnsignedTx](api_platformvm_transactions.unsignedtx.md)*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *object*

*Inherited from [StandardTx](common_transactions.standardtx.md).[serialize](common_transactions.standardtx.md#serialize)*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/common/tx.ts:309](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/tx.ts#L309)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Inherited from [StandardTx](common_transactions.standardtx.md).[toBuffer](common_transactions.standardtx.md#tobuffer)*

*Defined in [src/common/tx.ts:333](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/tx.ts#L333)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [StandardTx](common_transactions.standardtx.md).

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Inherited from [StandardTx](common_transactions.standardtx.md).[toString](common_transactions.standardtx.md#tostring)*

*Defined in [src/common/tx.ts:376](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/tx.ts#L376)*

Returns a cb58 representation of the [StandardTx](common_transactions.standardtx.md).

**`remarks`** 
unlike most toStrings, this returns in cb58 serialization format

**Returns:** *string*
