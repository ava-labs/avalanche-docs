[avalanche](../README.md) › [Common-Transactions](../modules/common_transactions.md) › [StandardUnsignedTx](common_transactions.standardunsignedtx.md)

# Class: StandardUnsignedTx ‹**KPClass, KCClass, SBTx**›

Class representing an unsigned transaction.

## Type parameters

▪ **KPClass**: *[StandardKeyPair](common_keychain.standardkeypair.md)*

▪ **KCClass**: *[StandardKeyChain](common_keychain.standardkeychain.md)‹KPClass›*

▪ **SBTx**: *[StandardBaseTx](common_transactions.standardbasetx.md)‹KPClass, KCClass›*

## Hierarchy

* [Serializable](utils_serialization.serializable.md)

  ↳ **StandardUnsignedTx**

  ↳ [UnsignedTx](api_avm_transactions.unsignedtx.md)

  ↳ [UnsignedTx](api_platformvm_transactions.unsignedtx.md)

## Index

### Constructors

* [constructor](common_transactions.standardunsignedtx.md#constructor)

### Properties

* [_codecID](common_transactions.standardunsignedtx.md#protected-_codecid)
* [_typeID](common_transactions.standardunsignedtx.md#protected-_typeid)
* [_typeName](common_transactions.standardunsignedtx.md#protected-_typename)
* [codecid](common_transactions.standardunsignedtx.md#protected-codecid)
* [transaction](common_transactions.standardunsignedtx.md#protected-transaction)

### Methods

* [deserialize](common_transactions.standardunsignedtx.md#deserialize)
* [fromBuffer](common_transactions.standardunsignedtx.md#abstract-frombuffer)
* [getBurn](common_transactions.standardunsignedtx.md#getburn)
* [getCodecID](common_transactions.standardunsignedtx.md#getcodecid)
* [getCodecIDBuffer](common_transactions.standardunsignedtx.md#getcodecidbuffer)
* [getInputTotal](common_transactions.standardunsignedtx.md#getinputtotal)
* [getOutputTotal](common_transactions.standardunsignedtx.md#getoutputtotal)
* [getTransaction](common_transactions.standardunsignedtx.md#abstract-gettransaction)
* [getTypeID](common_transactions.standardunsignedtx.md#gettypeid)
* [getTypeName](common_transactions.standardunsignedtx.md#gettypename)
* [serialize](common_transactions.standardunsignedtx.md#serialize)
* [sign](common_transactions.standardunsignedtx.md#abstract-sign)
* [toBuffer](common_transactions.standardunsignedtx.md#tobuffer)

## Constructors

###  constructor

\+ **new StandardUnsignedTx**(`transaction`: SBTx, `codecid`: number): *[StandardUnsignedTx](common_transactions.standardunsignedtx.md)*

*Defined in [src/common/tx.ts:286](https://github.com/ava-labs/avalanchejs/blob/9282770/src/common/tx.ts#L286)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`transaction` | SBTx | undefined |
`codecid` | number | 0 |

**Returns:** *[StandardUnsignedTx](common_transactions.standardunsignedtx.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [Serializable](utils_serialization.serializable.md).[_codecID](utils_serialization.serializable.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:42](https://github.com/ava-labs/avalanchejs/blob/9282770/src/utils/serialization.ts#L42)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [Serializable](utils_serialization.serializable.md).[_typeID](utils_serialization.serializable.md#protected-_typeid)*

*Defined in [src/common/tx.ts:180](https://github.com/ava-labs/avalanchejs/blob/9282770/src/common/tx.ts#L180)*

___

### `Protected` _typeName

• **_typeName**: *string* = "StandardUnsignedTx"

*Overrides [Serializable](utils_serialization.serializable.md).[_typeName](utils_serialization.serializable.md#protected-_typename)*

*Defined in [src/common/tx.ts:179](https://github.com/ava-labs/avalanchejs/blob/9282770/src/common/tx.ts#L179)*

___

### `Protected` codecid

• **codecid**: *number* = 0

*Defined in [src/common/tx.ts:196](https://github.com/ava-labs/avalanchejs/blob/9282770/src/common/tx.ts#L196)*

___

### `Protected` transaction

• **transaction**: *SBTx*

*Defined in [src/common/tx.ts:197](https://github.com/ava-labs/avalanchejs/blob/9282770/src/common/tx.ts#L197)*

## Methods

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Overrides [Serializable](utils_serialization.serializable.md).[deserialize](utils_serialization.serializable.md#deserialize)*

*Defined in [src/common/tx.ts:191](https://github.com/ava-labs/avalanchejs/blob/9282770/src/common/tx.ts#L191)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *void*

___

### `Abstract` fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset?`: number): *number*

*Defined in [src/common/tx.ts:264](https://github.com/ava-labs/avalanchejs/blob/9282770/src/common/tx.ts#L264)*

**Parameters:**

Name | Type |
------ | ------ |
`bytes` | Buffer |
`offset?` | number |

**Returns:** *number*

___

###  getBurn

▸ **getBurn**(`assetID`: Buffer): *BN*

*Defined in [src/common/tx.ts:255](https://github.com/ava-labs/avalanchejs/blob/9282770/src/common/tx.ts#L255)*

Returns the number of burned tokens as a BN

**Parameters:**

Name | Type |
------ | ------ |
`assetID` | Buffer |

**Returns:** *BN*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Overrides [Serializable](utils_serialization.serializable.md).[getCodecID](utils_serialization.serializable.md#getcodecid)*

*Defined in [src/common/tx.ts:202](https://github.com/ava-labs/avalanchejs/blob/9282770/src/common/tx.ts#L202)*

Returns the CodecID as a number

**Returns:** *number*

___

###  getCodecIDBuffer

▸ **getCodecIDBuffer**(): *Buffer*

*Defined in [src/common/tx.ts:207](https://github.com/ava-labs/avalanchejs/blob/9282770/src/common/tx.ts#L207)*

Returns the [Buffer](https://github.com/feross/buffer) representation of the CodecID

**Returns:** *Buffer*

___

###  getInputTotal

▸ **getInputTotal**(`assetID`: Buffer): *BN*

*Defined in [src/common/tx.ts:216](https://github.com/ava-labs/avalanchejs/blob/9282770/src/common/tx.ts#L216)*

Returns the inputTotal as a BN

**Parameters:**

Name | Type |
------ | ------ |
`assetID` | Buffer |

**Returns:** *BN*

___

###  getOutputTotal

▸ **getOutputTotal**(`assetID`: Buffer): *BN*

*Defined in [src/common/tx.ts:236](https://github.com/ava-labs/avalanchejs/blob/9282770/src/common/tx.ts#L236)*

Returns the outputTotal as a BN

**Parameters:**

Name | Type |
------ | ------ |
`assetID` | Buffer |

**Returns:** *BN*

___

### `Abstract` getTransaction

▸ **getTransaction**(): *SBTx*

*Defined in [src/common/tx.ts:262](https://github.com/ava-labs/avalanchejs/blob/9282770/src/common/tx.ts#L262)*

Returns the Transaction

**Returns:** *SBTx*

___

###  getTypeID

▸ **getTypeID**(): *number*

*Inherited from [Serializable](utils_serialization.serializable.md).[getTypeID](utils_serialization.serializable.md#gettypeid)*

*Defined in [src/utils/serialization.ts:54](https://github.com/ava-labs/avalanchejs/blob/9282770/src/utils/serialization.ts#L54)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getTypeName

▸ **getTypeName**(): *string*

*Inherited from [Serializable](utils_serialization.serializable.md).[getTypeName](utils_serialization.serializable.md#gettypename)*

*Defined in [src/utils/serialization.ts:47](https://github.com/ava-labs/avalanchejs/blob/9282770/src/utils/serialization.ts#L47)*

Used in serialization. TypeName is a string name for the type of object being output.

**Returns:** *string*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *object*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/common/tx.ts:182](https://github.com/ava-labs/avalanchejs/blob/9282770/src/common/tx.ts#L182)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

### `Abstract` sign

▸ **sign**(`kc`: KCClass): *[StandardTx](common_transactions.standardtx.md)‹KPClass, KCClass, [StandardUnsignedTx](common_transactions.standardunsignedtx.md)‹KPClass, KCClass, SBTx››*

*Defined in [src/common/tx.ts:282](https://github.com/ava-labs/avalanchejs/blob/9282770/src/common/tx.ts#L282)*

Signs this [UnsignedTx](api_avm_transactions.unsignedtx.md) and returns signed [StandardTx](common_transactions.standardtx.md)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`kc` | KCClass | An [KeyChain](api_avm_keychain.keychain.md) used in signing  |

**Returns:** *[StandardTx](common_transactions.standardtx.md)‹KPClass, KCClass, [StandardUnsignedTx](common_transactions.standardunsignedtx.md)‹KPClass, KCClass, SBTx››*

A signed [StandardTx](common_transactions.standardtx.md)

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Defined in [src/common/tx.ts:266](https://github.com/ava-labs/avalanchejs/blob/9282770/src/common/tx.ts#L266)*

**Returns:** *Buffer*
