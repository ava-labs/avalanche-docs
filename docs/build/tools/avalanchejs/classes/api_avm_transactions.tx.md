[avalanche](../README.md) › [API-AVM-Transactions](../modules/api_avm_transactions.md) › [Tx](api_avm_transactions.tx.md)

# Class: Tx

## Hierarchy

  ↳ [StandardTx](common_transactions.standardtx.md)‹[KeyPair](api_avm_keychain.keypair.md), [KeyChain](api_avm_keychain.keychain.md), [UnsignedTx](api_avm_transactions.unsignedtx.md)›

  ↳ **Tx**

## Index

### Constructors

* [constructor](api_avm_transactions.tx.md#constructor)

### Properties

* [_codecID](api_avm_transactions.tx.md#protected-_codecid)
* [_typeID](api_avm_transactions.tx.md#protected-_typeid)
* [_typeName](api_avm_transactions.tx.md#protected-_typename)
* [credentials](api_avm_transactions.tx.md#protected-credentials)
* [unsignedTx](api_avm_transactions.tx.md#protected-unsignedtx)

### Methods

* [deserialize](api_avm_transactions.tx.md#deserialize)
* [fromBuffer](api_avm_transactions.tx.md#frombuffer)
* [fromString](api_avm_transactions.tx.md#fromstring)
* [getCodecID](api_avm_transactions.tx.md#getcodecid)
* [getCredentials](api_avm_transactions.tx.md#getcredentials)
* [getTypeID](api_avm_transactions.tx.md#gettypeid)
* [getTypeName](api_avm_transactions.tx.md#gettypename)
* [getUnsignedTx](api_avm_transactions.tx.md#getunsignedtx)
* [sanitizeObject](api_avm_transactions.tx.md#sanitizeobject)
* [serialize](api_avm_transactions.tx.md#serialize)
* [toBuffer](api_avm_transactions.tx.md#tobuffer)
* [toString](api_avm_transactions.tx.md#tostring)

## Constructors

###  constructor

\+ **new Tx**(`unsignedTx`: [UnsignedTx](api_avm_transactions.unsignedtx.md), `credentials`: [Credential](common_signature.credential.md)[]): *[Tx](api_avm_transactions.tx.md)*

*Inherited from [StandardTx](common_transactions.standardtx.md).[constructor](common_transactions.standardtx.md#constructor)*

*Defined in [src/common/tx.ts:456](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L456)*

Class representing a signed transaction.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`unsignedTx` | [UnsignedTx](api_avm_transactions.unsignedtx.md) | undefined | Optional [StandardUnsignedTx](common_transactions.standardunsignedtx.md) |
`credentials` | [Credential](common_signature.credential.md)[] | undefined | - |

**Returns:** *[Tx](api_avm_transactions.tx.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:51](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L51)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [StandardTx](common_transactions.standardtx.md).[_typeID](common_transactions.standardtx.md#protected-_typeid)*

*Defined in [src/apis/avm/tx.ts:95](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/tx.ts#L95)*

___

### `Protected` _typeName

• **_typeName**: *string* = "Tx"

*Overrides [StandardTx](common_transactions.standardtx.md).[_typeName](common_transactions.standardtx.md#protected-_typename)*

*Defined in [src/apis/avm/tx.ts:94](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/tx.ts#L94)*

___

### `Protected` credentials

• **credentials**: *[Credential](common_signature.credential.md)[]* = []

*Inherited from [StandardTx](common_transactions.standardtx.md).[credentials](common_transactions.standardtx.md#protected-credentials)*

*Defined in [src/common/tx.ts:389](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L389)*

___

### `Protected` unsignedTx

• **unsignedTx**: *[UnsignedTx](api_avm_transactions.unsignedtx.md)* = undefined

*Inherited from [StandardTx](common_transactions.standardtx.md).[unsignedTx](common_transactions.standardtx.md#protected-unsignedtx)*

*Defined in [src/common/tx.ts:388](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L388)*

## Methods

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[deserialize](common_inputs.standardparseableinput.md#deserialize)*

*Defined in [src/apis/avm/tx.ts:99](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/tx.ts#L99)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Overrides [StandardTx](common_transactions.standardtx.md).[fromBuffer](common_transactions.standardtx.md#abstract-frombuffer)*

*Defined in [src/apis/avm/tx.ts:121](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/tx.ts#L121)*

Takes a [Buffer](https://github.com/feross/buffer) containing an [Tx](api_avm_transactions.tx.md), parses it, populates the class, and returns the length of the Tx in bytes.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`bytes` | Buffer | - | A [Buffer](https://github.com/feross/buffer) containing a raw [Tx](api_avm_transactions.tx.md) |
`offset` | number | 0 | A number representing the starting point of the bytes to begin parsing  |

**Returns:** *number*

The length of the raw [Tx](api_avm_transactions.tx.md)

___

###  fromString

▸ **fromString**(`serialized`: string): *number*

*Inherited from [StandardTx](common_transactions.standardtx.md).[fromString](common_transactions.standardtx.md#fromstring)*

*Defined in [src/common/tx.ts:444](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L444)*

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

*Inherited from [SigIdx](common_signature.sigidx.md).[getCodecID](common_signature.sigidx.md#getcodecid)*

*Defined in [src/utils/serialization.ts:70](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L70)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getCredentials

▸ **getCredentials**(): *[Credential](common_signature.credential.md)[]*

*Inherited from [StandardTx](common_transactions.standardtx.md).[getCredentials](common_transactions.standardtx.md#getcredentials)*

*Defined in [src/common/tx.ts:394](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L394)*

Returns the [[Credential[]]]

**Returns:** *[Credential](common_signature.credential.md)[]*

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

###  getUnsignedTx

▸ **getUnsignedTx**(): *[UnsignedTx](api_avm_transactions.unsignedtx.md)*

*Inherited from [StandardTx](common_transactions.standardtx.md).[getUnsignedTx](common_transactions.standardtx.md#getunsignedtx)*

*Defined in [src/common/tx.ts:401](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L401)*

Returns the [StandardUnsignedTx](common_transactions.standardunsignedtx.md)

**Returns:** *[UnsignedTx](api_avm_transactions.unsignedtx.md)*

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

*Inherited from [StandardTx](common_transactions.standardtx.md).[serialize](common_transactions.standardtx.md#serialize)*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/common/tx.ts:379](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L379)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Inherited from [StandardTx](common_transactions.standardtx.md).[toBuffer](common_transactions.standardtx.md#tobuffer)*

*Defined in [src/common/tx.ts:410](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L410)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [StandardTx](common_transactions.standardtx.md).

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Inherited from [StandardTx](common_transactions.standardtx.md).[toString](common_transactions.standardtx.md#tostring)*

*Defined in [src/common/tx.ts:454](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L454)*

Returns a cb58 representation of the [StandardTx](common_transactions.standardtx.md).

**`remarks`** 
unlike most toStrings, this returns in cb58 serialization format

**Returns:** *string*
