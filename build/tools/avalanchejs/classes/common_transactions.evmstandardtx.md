[avalanche](../README.md) › [Common-Transactions](../modules/common_transactions.md) › [EVMStandardTx](common_transactions.evmstandardtx.md)

# Class: EVMStandardTx ‹**KPClass, KCClass, SUBTx**›

Class representing a signed transaction.

## Type parameters

▪ **KPClass**: *[StandardKeyPair](common_keychain.standardkeypair.md)*

▪ **KCClass**: *[StandardKeyChain](common_keychain.standardkeychain.md)‹KPClass›*

▪ **SUBTx**: *[EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md)‹KPClass, KCClass, [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md)‹KPClass, KCClass››*

## Hierarchy

* [Serializable](utils_serialization.serializable.md)

  ↳ **EVMStandardTx**

  ↳ [Tx](api_evm_transactions.tx.md)

## Index

### Constructors

* [constructor](common_transactions.evmstandardtx.md#constructor)

### Properties

* [_codecID](common_transactions.evmstandardtx.md#protected-_codecid)
* [_typeID](common_transactions.evmstandardtx.md#protected-_typeid)
* [_typeName](common_transactions.evmstandardtx.md#protected-_typename)
* [credentials](common_transactions.evmstandardtx.md#protected-credentials)
* [unsignedTx](common_transactions.evmstandardtx.md#protected-unsignedtx)

### Methods

* [deserialize](common_transactions.evmstandardtx.md#deserialize)
* [fromBuffer](common_transactions.evmstandardtx.md#abstract-frombuffer)
* [fromString](common_transactions.evmstandardtx.md#fromstring)
* [getCodecID](common_transactions.evmstandardtx.md#getcodecid)
* [getTypeID](common_transactions.evmstandardtx.md#gettypeid)
* [getTypeName](common_transactions.evmstandardtx.md#gettypename)
* [getUnsignedTx](common_transactions.evmstandardtx.md#getunsignedtx)
* [serialize](common_transactions.evmstandardtx.md#serialize)
* [toBuffer](common_transactions.evmstandardtx.md#tobuffer)
* [toString](common_transactions.evmstandardtx.md#tostring)

## Constructors

###  constructor

\+ **new EVMStandardTx**(`unsignedTx`: SUBTx, `credentials`: [Credential](common_signature.credential.md)[]): *[EVMStandardTx](common_transactions.evmstandardtx.md)*

*Defined in [src/common/evmtx.ts:298](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/evmtx.ts#L298)*

Class representing a signed transaction.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`unsignedTx` | SUBTx | undefined | Optional [StandardUnsignedTx](common_transactions.standardunsignedtx.md) |
`credentials` | [Credential](common_signature.credential.md)[] | undefined | - |

**Returns:** *[EVMStandardTx](common_transactions.evmstandardtx.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [Serializable](utils_serialization.serializable.md).[_codecID](utils_serialization.serializable.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:42](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/utils/serialization.ts#L42)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [Serializable](utils_serialization.serializable.md).[_typeID](utils_serialization.serializable.md#protected-_typeid)*

*Defined in [src/common/evmtx.ts:230](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/evmtx.ts#L230)*

___

### `Protected` _typeName

• **_typeName**: *string* = "StandardTx"

*Overrides [Serializable](utils_serialization.serializable.md).[_typeName](utils_serialization.serializable.md#protected-_typename)*

*Defined in [src/common/evmtx.ts:229](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/evmtx.ts#L229)*

___

### `Protected` credentials

• **credentials**: *[Credential](common_signature.credential.md)[]* = []

*Defined in [src/common/evmtx.ts:242](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/evmtx.ts#L242)*

___

### `Protected` unsignedTx

• **unsignedTx**: *SUBTx* = undefined

*Defined in [src/common/evmtx.ts:241](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/evmtx.ts#L241)*

## Methods

###  deserialize

▸ **deserialize**(`fields`: object, `encoding?`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Inherited from [Serializable](utils_serialization.serializable.md).[deserialize](utils_serialization.serializable.md#deserialize)*

*Defined in [src/utils/serialization.ts:74](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/utils/serialization.ts#L74)*

**Parameters:**

Name | Type |
------ | ------ |
`fields` | object |
`encoding?` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) |

**Returns:** *void*

___

### `Abstract` fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset?`: number): *number*

*Defined in [src/common/evmtx.ts:251](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/evmtx.ts#L251)*

**Parameters:**

Name | Type |
------ | ------ |
`bytes` | Buffer |
`offset?` | number |

**Returns:** *number*

___

###  fromString

▸ **fromString**(`serialized`: string): *number*

*Defined in [src/common/evmtx.ts:286](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/evmtx.ts#L286)*

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

*Defined in [src/utils/serialization.ts:61](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/utils/serialization.ts#L61)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getTypeID

▸ **getTypeID**(): *number*

*Inherited from [Serializable](utils_serialization.serializable.md).[getTypeID](utils_serialization.serializable.md#gettypeid)*

*Defined in [src/utils/serialization.ts:54](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/utils/serialization.ts#L54)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getTypeName

▸ **getTypeName**(): *string*

*Inherited from [Serializable](utils_serialization.serializable.md).[getTypeName](utils_serialization.serializable.md#gettypename)*

*Defined in [src/utils/serialization.ts:47](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/utils/serialization.ts#L47)*

Used in serialization. TypeName is a string name for the type of object being output.

**Returns:** *string*

___

###  getUnsignedTx

▸ **getUnsignedTx**(): *SUBTx*

*Defined in [src/common/evmtx.ts:247](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/evmtx.ts#L247)*

Returns the [StandardUnsignedTx](common_transactions.standardunsignedtx.md)

**Returns:** *SUBTx*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *object*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/common/evmtx.ts:232](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/evmtx.ts#L232)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Defined in [src/common/evmtx.ts:256](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/evmtx.ts#L256)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [StandardTx](common_transactions.standardtx.md).

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Defined in [src/common/evmtx.ts:296](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/evmtx.ts#L296)*

Returns a cb58 representation of the [StandardTx](common_transactions.standardtx.md).

**`remarks`** 
unlike most toStrings, this returns in cb58 serialization format

**Returns:** *string*
