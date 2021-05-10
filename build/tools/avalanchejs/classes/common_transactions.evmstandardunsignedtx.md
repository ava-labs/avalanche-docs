[avalanche](../README.md) › [Common-Transactions](../modules/common_transactions.md) › [EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md)

# Class: EVMStandardUnsignedTx ‹**KPClass, KCClass, SBTx**›

Class representing an unsigned transaction.

## Type parameters

▪ **KPClass**: *[StandardKeyPair](common_keychain.standardkeypair.md)*

▪ **KCClass**: *[StandardKeyChain](common_keychain.standardkeychain.md)‹KPClass›*

▪ **SBTx**: *[EVMStandardBaseTx](common_transactions.evmstandardbasetx.md)‹KPClass, KCClass›*

## Hierarchy

* [Serializable](utils_serialization.serializable.md)

  ↳ **EVMStandardUnsignedTx**

  ↳ [UnsignedTx](api_evm_transactions.unsignedtx.md)

## Index

### Constructors

* [constructor](common_transactions.evmstandardunsignedtx.md#constructor)

### Properties

* [_codecID](common_transactions.evmstandardunsignedtx.md#protected-_codecid)
* [_typeID](common_transactions.evmstandardunsignedtx.md#protected-_typeid)
* [_typeName](common_transactions.evmstandardunsignedtx.md#protected-_typename)
* [codecid](common_transactions.evmstandardunsignedtx.md#protected-codecid)
* [transaction](common_transactions.evmstandardunsignedtx.md#protected-transaction)

### Methods

* [deserialize](common_transactions.evmstandardunsignedtx.md#deserialize)
* [fromBuffer](common_transactions.evmstandardunsignedtx.md#abstract-frombuffer)
* [getBurn](common_transactions.evmstandardunsignedtx.md#getburn)
* [getCodecID](common_transactions.evmstandardunsignedtx.md#getcodecid)
* [getCodecIDBuffer](common_transactions.evmstandardunsignedtx.md#getcodecidbuffer)
* [getInputTotal](common_transactions.evmstandardunsignedtx.md#getinputtotal)
* [getOutputTotal](common_transactions.evmstandardunsignedtx.md#getoutputtotal)
* [getTransaction](common_transactions.evmstandardunsignedtx.md#abstract-gettransaction)
* [getTypeID](common_transactions.evmstandardunsignedtx.md#gettypeid)
* [getTypeName](common_transactions.evmstandardunsignedtx.md#gettypename)
* [serialize](common_transactions.evmstandardunsignedtx.md#serialize)
* [sign](common_transactions.evmstandardunsignedtx.md#abstract-sign)
* [toBuffer](common_transactions.evmstandardunsignedtx.md#tobuffer)

## Constructors

###  constructor

\+ **new EVMStandardUnsignedTx**(`transaction`: SBTx, `codecid`: number): *[EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md)*

*Defined in [src/common/evmtx.ts:209](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/evmtx.ts#L209)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`transaction` | SBTx | undefined |
`codecid` | number | 0 |

**Returns:** *[EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [Serializable](utils_serialization.serializable.md).[_codecID](utils_serialization.serializable.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:42](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/serialization.ts#L42)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [Serializable](utils_serialization.serializable.md).[_typeID](utils_serialization.serializable.md#protected-_typeid)*

*Defined in [src/common/evmtx.ts:108](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/evmtx.ts#L108)*

___

### `Protected` _typeName

• **_typeName**: *string* = "StandardUnsignedTx"

*Overrides [Serializable](utils_serialization.serializable.md).[_typeName](utils_serialization.serializable.md#protected-_typename)*

*Defined in [src/common/evmtx.ts:107](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/evmtx.ts#L107)*

___

### `Protected` codecid

• **codecid**: *number* = 0

*Defined in [src/common/evmtx.ts:124](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/evmtx.ts#L124)*

___

### `Protected` transaction

• **transaction**: *SBTx*

*Defined in [src/common/evmtx.ts:125](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/evmtx.ts#L125)*

## Methods

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Overrides [Serializable](utils_serialization.serializable.md).[deserialize](utils_serialization.serializable.md#deserialize)*

*Defined in [src/common/evmtx.ts:119](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/evmtx.ts#L119)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *void*

___

### `Abstract` fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset?`: number): *number*

*Defined in [src/common/evmtx.ts:188](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/evmtx.ts#L188)*

**Parameters:**

Name | Type |
------ | ------ |
`bytes` | Buffer |
`offset?` | number |

**Returns:** *number*

___

###  getBurn

▸ **getBurn**(`assetID`: Buffer): *BN*

*Defined in [src/common/evmtx.ts:179](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/evmtx.ts#L179)*

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

*Defined in [src/common/evmtx.ts:130](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/evmtx.ts#L130)*

Returns the CodecID as a number

**Returns:** *number*

___

###  getCodecIDBuffer

▸ **getCodecIDBuffer**(): *Buffer*

*Defined in [src/common/evmtx.ts:135](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/evmtx.ts#L135)*

Returns the [Buffer](https://github.com/feross/buffer) representation of the CodecID

**Returns:** *Buffer*

___

###  getInputTotal

▸ **getInputTotal**(`assetID`: Buffer): *BN*

*Defined in [src/common/evmtx.ts:144](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/evmtx.ts#L144)*

Returns the inputTotal as a BN

**Parameters:**

Name | Type |
------ | ------ |
`assetID` | Buffer |

**Returns:** *BN*

___

###  getOutputTotal

▸ **getOutputTotal**(`assetID`: Buffer): *BN*

*Defined in [src/common/evmtx.ts:161](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/evmtx.ts#L161)*

Returns the outputTotal as a BN

**Parameters:**

Name | Type |
------ | ------ |
`assetID` | Buffer |

**Returns:** *BN*

___

### `Abstract` getTransaction

▸ **getTransaction**(): *SBTx*

*Defined in [src/common/evmtx.ts:186](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/evmtx.ts#L186)*

Returns the Transaction

**Returns:** *SBTx*

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

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *object*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/common/evmtx.ts:110](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/evmtx.ts#L110)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

### `Abstract` sign

▸ **sign**(`kc`: KCClass): *[EVMStandardTx](common_transactions.evmstandardtx.md)‹KPClass, KCClass, [EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md)‹KPClass, KCClass, SBTx››*

*Defined in [src/common/evmtx.ts:205](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/evmtx.ts#L205)*

Signs this [UnsignedTx](api_avm_transactions.unsignedtx.md) and returns signed [StandardTx](common_transactions.standardtx.md)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`kc` | KCClass | An [KeyChain](api_avm_keychain.keychain.md) used in signing  |

**Returns:** *[EVMStandardTx](common_transactions.evmstandardtx.md)‹KPClass, KCClass, [EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md)‹KPClass, KCClass, SBTx››*

A signed [StandardTx](common_transactions.standardtx.md)

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Defined in [src/common/evmtx.ts:190](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/evmtx.ts#L190)*

**Returns:** *Buffer*
