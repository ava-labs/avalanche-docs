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
* [codecID](common_transactions.evmstandardunsignedtx.md#protected-codecid)
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
* [sanitizeObject](common_transactions.evmstandardunsignedtx.md#sanitizeobject)
* [serialize](common_transactions.evmstandardunsignedtx.md#serialize)
* [sign](common_transactions.evmstandardunsignedtx.md#abstract-sign)
* [toBuffer](common_transactions.evmstandardunsignedtx.md#tobuffer)

## Constructors

###  constructor

\+ **new EVMStandardUnsignedTx**(`transaction`: SBTx, `codecID`: number): *[EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md)*

*Defined in [src/common/evmtx.ts:271](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L271)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`transaction` | SBTx | undefined |
`codecID` | number | 0 |

**Returns:** *[EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:51](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L51)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [Serializable](utils_serialization.serializable.md).[_typeID](utils_serialization.serializable.md#protected-_typeid)*

*Defined in [src/common/evmtx.ts:145](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L145)*

___

### `Protected` _typeName

• **_typeName**: *string* = "StandardUnsignedTx"

*Overrides [Serializable](utils_serialization.serializable.md).[_typeName](utils_serialization.serializable.md#protected-_typename)*

*Defined in [src/common/evmtx.ts:144](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L144)*

___

### `Protected` codecID

• **codecID**: *number* = 0

*Defined in [src/common/evmtx.ts:172](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L172)*

___

### `Protected` transaction

• **transaction**: *SBTx*

*Defined in [src/common/evmtx.ts:173](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L173)*

## Methods

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[deserialize](common_inputs.standardparseableinput.md#deserialize)*

*Defined in [src/common/evmtx.ts:162](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L162)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *void*

___

### `Abstract` fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset?`: number): *number*

*Defined in [src/common/evmtx.ts:245](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L245)*

**Parameters:**

Name | Type |
------ | ------ |
`bytes` | Buffer |
`offset?` | number |

**Returns:** *number*

___

###  getBurn

▸ **getBurn**(`assetID`: Buffer): *BN*

*Defined in [src/common/evmtx.ts:236](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L236)*

Returns the number of burned tokens as a BN

**Parameters:**

Name | Type |
------ | ------ |
`assetID` | Buffer |

**Returns:** *BN*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Overrides [SigIdx](common_signature.sigidx.md).[getCodecID](common_signature.sigidx.md#getcodecid)*

*Defined in [src/common/evmtx.ts:178](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L178)*

Returns the CodecID as a number

**Returns:** *number*

___

###  getCodecIDBuffer

▸ **getCodecIDBuffer**(): *Buffer*

*Defined in [src/common/evmtx.ts:185](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L185)*

Returns the [Buffer](https://github.com/feross/buffer) representation of the CodecID

**Returns:** *Buffer*

___

###  getInputTotal

▸ **getInputTotal**(`assetID`: Buffer): *BN*

*Defined in [src/common/evmtx.ts:194](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L194)*

Returns the inputTotal as a BN

**Parameters:**

Name | Type |
------ | ------ |
`assetID` | Buffer |

**Returns:** *BN*

___

###  getOutputTotal

▸ **getOutputTotal**(`assetID`: Buffer): *BN*

*Defined in [src/common/evmtx.ts:214](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L214)*

Returns the outputTotal as a BN

**Parameters:**

Name | Type |
------ | ------ |
`assetID` | Buffer |

**Returns:** *BN*

___

### `Abstract` getTransaction

▸ **getTransaction**(): *SBTx*

*Defined in [src/common/evmtx.ts:243](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L243)*

Returns the Transaction

**Returns:** *SBTx*

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

*Defined in [src/common/evmtx.ts:147](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L147)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

### `Abstract` sign

▸ **sign**(`kc`: KCClass): *[EVMStandardTx](common_transactions.evmstandardtx.md)‹KPClass, KCClass, [EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md)‹KPClass, KCClass, SBTx››*

*Defined in [src/common/evmtx.ts:265](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L265)*

Signs this [UnsignedTx](api_evm_transactions.unsignedtx.md) and returns signed [StandardTx](common_transactions.standardtx.md)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`kc` | KCClass | An [KeyChain](api_evm_keychain.keychain.md) used in signing  |

**Returns:** *[EVMStandardTx](common_transactions.evmstandardtx.md)‹KPClass, KCClass, [EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md)‹KPClass, KCClass, SBTx››*

A signed [StandardTx](common_transactions.standardtx.md)

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Defined in [src/common/evmtx.ts:247](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L247)*

**Returns:** *Buffer*
