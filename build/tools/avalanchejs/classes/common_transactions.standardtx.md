[avalanche](../README.md) › [Common-Transactions](../modules/common_transactions.md) › [StandardTx](common_transactions.standardtx.md)

# Class: StandardTx ‹**KPClass, KCClass, SUBTx**›

Class representing a signed transaction.

## Type parameters

▪ **KPClass**: *[StandardKeyPair](common_keychain.standardkeypair.md)*

▪ **KCClass**: *[StandardKeyChain](common_keychain.standardkeychain.md)‹KPClass›*

▪ **SUBTx**: *[StandardUnsignedTx](common_transactions.standardunsignedtx.md)‹KPClass, KCClass, [StandardBaseTx](common_transactions.standardbasetx.md)‹KPClass, KCClass››*

## Hierarchy

* [Serializable](utils_serialization.serializable.md)

  ↳ **StandardTx**

  ↳ [Tx](api_avm_transactions.tx.md)

  ↳ [Tx](api_platformvm_transactions.tx.md)

## Index

### Constructors

* [constructor](common_transactions.standardtx.md#constructor)

### Properties

* [_typeID](common_transactions.standardtx.md#protected-_typeid)
* [_typeName](common_transactions.standardtx.md#protected-_typename)
* [credentials](common_transactions.standardtx.md#protected-credentials)
* [unsignedTx](common_transactions.standardtx.md#protected-unsignedtx)

### Methods

* [deserialize](common_transactions.standardtx.md#deserialize)
* [fromBuffer](common_transactions.standardtx.md#abstract-frombuffer)
* [fromString](common_transactions.standardtx.md#fromstring)
* [getTypeID](common_transactions.standardtx.md#gettypeid)
* [getTypeName](common_transactions.standardtx.md#gettypename)
* [getUnsignedTx](common_transactions.standardtx.md#getunsignedtx)
* [serialize](common_transactions.standardtx.md#serialize)
* [toBuffer](common_transactions.standardtx.md#tobuffer)
* [toString](common_transactions.standardtx.md#tostring)

## Constructors

###  constructor

\+ **new StandardTx**(`unsignedTx`: SUBTx, `credentials`: Array‹[Credential](common_signature.credential.md)›): *[StandardTx](common_transactions.standardtx.md)*

*Defined in [src/common/tx.ts:377](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L377)*

Class representing a signed transaction.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`unsignedTx` | SUBTx | undefined | Optional [StandardUnsignedTx](common_transactions.standardunsignedtx.md) |
`credentials` | Array‹[Credential](common_signature.credential.md)› | undefined | - |

**Returns:** *[StandardTx](common_transactions.standardtx.md)*

## Properties

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [Serializable](utils_serialization.serializable.md).[_typeID](utils_serialization.serializable.md#protected-_typeid)*

*Defined in [src/common/tx.ts:309](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L309)*

___

### `Protected` _typeName

• **_typeName**: *string* = "StandardTx"

*Overrides [Serializable](utils_serialization.serializable.md).[_typeName](utils_serialization.serializable.md#protected-_typename)*

*Defined in [src/common/tx.ts:308](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L308)*

___

### `Protected` credentials

• **credentials**: *Array‹[Credential](common_signature.credential.md)›* = []

*Defined in [src/common/tx.ts:321](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L321)*

___

### `Protected` unsignedTx

• **unsignedTx**: *SUBTx* = undefined

*Defined in [src/common/tx.ts:320](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L320)*

## Methods

###  deserialize

▸ **deserialize**(`fields`: object, `encoding?`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Inherited from [Serializable](utils_serialization.serializable.md).[deserialize](utils_serialization.serializable.md#deserialize)*

*Defined in [src/utils/serialization.ts:64](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/serialization.ts#L64)*

**Parameters:**

Name | Type |
------ | ------ |
`fields` | object |
`encoding?` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) |

**Returns:** *void*

___

### `Abstract` fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset?`: number): *number*

*Defined in [src/common/tx.ts:330](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L330)*

**Parameters:**

Name | Type |
------ | ------ |
`bytes` | Buffer |
`offset?` | number |

**Returns:** *number*

___

###  fromString

▸ **fromString**(`serialized`: string): *number*

*Defined in [src/common/tx.ts:365](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L365)*

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

###  getTypeID

▸ **getTypeID**(): *number*

*Inherited from [Serializable](utils_serialization.serializable.md).[getTypeID](utils_serialization.serializable.md#gettypeid)*

*Defined in [src/utils/serialization.ts:52](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/serialization.ts#L52)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getTypeName

▸ **getTypeName**(): *string*

*Inherited from [Serializable](utils_serialization.serializable.md).[getTypeName](utils_serialization.serializable.md#gettypename)*

*Defined in [src/utils/serialization.ts:45](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/serialization.ts#L45)*

Used in serialization. TypeName is a string name for the type of object being output.

**Returns:** *string*

___

###  getUnsignedTx

▸ **getUnsignedTx**(): *SUBTx*

*Defined in [src/common/tx.ts:326](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L326)*

Returns the [StandardUnsignedTx](common_transactions.standardunsignedtx.md)

**Returns:** *SUBTx*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *object*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/common/tx.ts:311](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L311)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Defined in [src/common/tx.ts:335](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L335)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [StandardTx](common_transactions.standardtx.md).

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Defined in [src/common/tx.ts:375](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L375)*

Returns a cb58 representation of the [StandardTx](common_transactions.standardtx.md).

**`remarks`** 
unlike most toStrings, this returns in cb58 serialization format

**Returns:** *string*
