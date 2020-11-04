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

*Defined in [src/common/tx.ts:288](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L288)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`transaction` | SBTx | undefined |
`codecid` | number | 0 |

**Returns:** *[StandardUnsignedTx](common_transactions.standardunsignedtx.md)*

## Properties

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [Serializable](utils_serialization.serializable.md).[_typeID](utils_serialization.serializable.md#protected-_typeid)*

*Defined in [src/common/tx.ts:183](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L183)*

___

### `Protected` _typeName

• **_typeName**: *string* = "StandardUnsignedTx"

*Overrides [Serializable](utils_serialization.serializable.md).[_typeName](utils_serialization.serializable.md#protected-_typename)*

*Defined in [src/common/tx.ts:182](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L182)*

___

### `Protected` codecid

• **codecid**: *number* = 0

*Defined in [src/common/tx.ts:199](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L199)*

___

### `Protected` transaction

• **transaction**: *SBTx*

*Defined in [src/common/tx.ts:200](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L200)*

## Methods

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Overrides [Serializable](utils_serialization.serializable.md).[deserialize](utils_serialization.serializable.md#deserialize)*

*Defined in [src/common/tx.ts:194](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L194)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *void*

___

### `Abstract` fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset?`: number): *number*

*Defined in [src/common/tx.ts:267](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L267)*

**Parameters:**

Name | Type |
------ | ------ |
`bytes` | Buffer |
`offset?` | number |

**Returns:** *number*

___

###  getBurn

▸ **getBurn**(`assetID`: Buffer): *BN*

*Defined in [src/common/tx.ts:258](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L258)*

Returns the number of burned tokens as a BN

**Parameters:**

Name | Type |
------ | ------ |
`assetID` | Buffer |

**Returns:** *BN*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Defined in [src/common/tx.ts:205](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L205)*

Returns the CodecID as a number

**Returns:** *number*

___

###  getCodecIDBuffer

▸ **getCodecIDBuffer**(): *Buffer*

*Defined in [src/common/tx.ts:210](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L210)*

Returns the [Buffer](https://github.com/feross/buffer) representation of the CodecID

**Returns:** *Buffer*

___

###  getInputTotal

▸ **getInputTotal**(`assetID`: Buffer): *BN*

*Defined in [src/common/tx.ts:219](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L219)*

Returns the inputTotal as a BN

**Parameters:**

Name | Type |
------ | ------ |
`assetID` | Buffer |

**Returns:** *BN*

___

###  getOutputTotal

▸ **getOutputTotal**(`assetID`: Buffer): *BN*

*Defined in [src/common/tx.ts:239](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L239)*

Returns the outputTotal as a BN

**Parameters:**

Name | Type |
------ | ------ |
`assetID` | Buffer |

**Returns:** *BN*

___

### `Abstract` getTransaction

▸ **getTransaction**(): *SBTx*

*Defined in [src/common/tx.ts:265](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L265)*

Returns the Transaction

**Returns:** *SBTx*

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

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *object*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/common/tx.ts:185](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L185)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

### `Abstract` sign

▸ **sign**(`kc`: KCClass): *[StandardTx](common_transactions.standardtx.md)‹KPClass, KCClass, [StandardUnsignedTx](common_transactions.standardunsignedtx.md)‹KPClass, KCClass, SBTx››*

*Defined in [src/common/tx.ts:284](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L284)*

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

*Defined in [src/common/tx.ts:269](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L269)*

**Returns:** *Buffer*
