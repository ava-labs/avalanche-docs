[avalanche](../README.md) › [API-AVM-Transactions](../modules/api_avm_transactions.md) › [UnsignedTx](api_avm_transactions.unsignedtx.md)

# Class: UnsignedTx

## Hierarchy

  ↳ [StandardUnsignedTx](common_transactions.standardunsignedtx.md)‹[KeyPair](api_avm_keychain.keypair.md), [KeyChain](api_avm_keychain.keychain.md), [BaseTx](api_avm_basetx.basetx.md)›

  ↳ **UnsignedTx**

## Index

### Constructors

* [constructor](api_avm_transactions.unsignedtx.md#constructor)

### Properties

* [_codecID](api_avm_transactions.unsignedtx.md#protected-_codecid)
* [_typeID](api_avm_transactions.unsignedtx.md#protected-_typeid)
* [_typeName](api_avm_transactions.unsignedtx.md#protected-_typename)
* [codecID](api_avm_transactions.unsignedtx.md#protected-codecid)
* [transaction](api_avm_transactions.unsignedtx.md#protected-transaction)

### Methods

* [deserialize](api_avm_transactions.unsignedtx.md#deserialize)
* [fromBuffer](api_avm_transactions.unsignedtx.md#frombuffer)
* [getBurn](api_avm_transactions.unsignedtx.md#getburn)
* [getCodecID](api_avm_transactions.unsignedtx.md#getcodecid)
* [getCodecIDBuffer](api_avm_transactions.unsignedtx.md#getcodecidbuffer)
* [getInputTotal](api_avm_transactions.unsignedtx.md#getinputtotal)
* [getOutputTotal](api_avm_transactions.unsignedtx.md#getoutputtotal)
* [getTransaction](api_avm_transactions.unsignedtx.md#gettransaction)
* [getTypeID](api_avm_transactions.unsignedtx.md#gettypeid)
* [getTypeName](api_avm_transactions.unsignedtx.md#gettypename)
* [sanitizeObject](api_avm_transactions.unsignedtx.md#sanitizeobject)
* [serialize](api_avm_transactions.unsignedtx.md#serialize)
* [sign](api_avm_transactions.unsignedtx.md#sign)
* [toBuffer](api_avm_transactions.unsignedtx.md#tobuffer)

## Constructors

###  constructor

\+ **new UnsignedTx**(`transaction`: [BaseTx](api_avm_basetx.basetx.md), `codecID`: number): *[UnsignedTx](api_avm_transactions.unsignedtx.md)*

*Inherited from [StandardUnsignedTx](common_transactions.standardunsignedtx.md).[constructor](common_transactions.standardunsignedtx.md#constructor)*

*Defined in [src/common/tx.ts:355](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L355)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`transaction` | [BaseTx](api_avm_basetx.basetx.md) | undefined |
`codecID` | number | 0 |

**Returns:** *[UnsignedTx](api_avm_transactions.unsignedtx.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:51](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L51)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [StandardUnsignedTx](common_transactions.standardunsignedtx.md).[_typeID](common_transactions.standardunsignedtx.md#protected-_typeid)*

*Defined in [src/apis/avm/tx.ts:51](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/tx.ts#L51)*

___

### `Protected` _typeName

• **_typeName**: *string* = "UnsignedTx"

*Overrides [StandardUnsignedTx](common_transactions.standardunsignedtx.md).[_typeName](common_transactions.standardunsignedtx.md#protected-_typename)*

*Defined in [src/apis/avm/tx.ts:50](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/tx.ts#L50)*

___

### `Protected` codecID

• **codecID**: *number* = 0

*Inherited from [StandardUnsignedTx](common_transactions.standardunsignedtx.md).[codecID](common_transactions.standardunsignedtx.md#protected-codecid)*

*Defined in [src/common/tx.ts:254](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L254)*

___

### `Protected` transaction

• **transaction**: *[BaseTx](api_avm_basetx.basetx.md)*

*Inherited from [StandardUnsignedTx](common_transactions.standardunsignedtx.md).[transaction](common_transactions.standardunsignedtx.md#protected-transaction)*

*Defined in [src/common/tx.ts:255](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L255)*

## Methods

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Overrides [StandardUnsignedTx](common_transactions.standardunsignedtx.md).[deserialize](common_transactions.standardunsignedtx.md#deserialize)*

*Defined in [src/apis/avm/tx.ts:55](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/tx.ts#L55)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Overrides [StandardUnsignedTx](common_transactions.standardunsignedtx.md).[fromBuffer](common_transactions.standardunsignedtx.md#abstract-frombuffer)*

*Defined in [src/apis/avm/tx.ts:65](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/tx.ts#L65)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`bytes` | Buffer | - |
`offset` | number | 0 |

**Returns:** *number*

___

###  getBurn

▸ **getBurn**(`assetID`: Buffer): *BN*

*Inherited from [StandardUnsignedTx](common_transactions.standardunsignedtx.md).[getBurn](common_transactions.standardunsignedtx.md#getburn)*

*Defined in [src/common/tx.ts:323](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L323)*

Returns the number of burned tokens as a BN

**Parameters:**

Name | Type |
------ | ------ |
`assetID` | Buffer |

**Returns:** *BN*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Inherited from [StandardUnsignedTx](common_transactions.standardunsignedtx.md).[getCodecID](common_transactions.standardunsignedtx.md#getcodecid)*

*Overrides [SigIdx](common_signature.sigidx.md).[getCodecID](common_signature.sigidx.md#getcodecid)*

*Defined in [src/common/tx.ts:260](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L260)*

Returns the CodecID as a number

**Returns:** *number*

___

###  getCodecIDBuffer

▸ **getCodecIDBuffer**(): *Buffer*

*Inherited from [StandardUnsignedTx](common_transactions.standardunsignedtx.md).[getCodecIDBuffer](common_transactions.standardunsignedtx.md#getcodecidbuffer)*

*Defined in [src/common/tx.ts:267](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L267)*

Returns the [Buffer](https://github.com/feross/buffer) representation of the CodecID

**Returns:** *Buffer*

___

###  getInputTotal

▸ **getInputTotal**(`assetID`: Buffer): *BN*

*Inherited from [StandardUnsignedTx](common_transactions.standardunsignedtx.md).[getInputTotal](common_transactions.standardunsignedtx.md#getinputtotal)*

*Defined in [src/common/tx.ts:276](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L276)*

Returns the inputTotal as a BN

**Parameters:**

Name | Type |
------ | ------ |
`assetID` | Buffer |

**Returns:** *BN*

___

###  getOutputTotal

▸ **getOutputTotal**(`assetID`: Buffer): *BN*

*Inherited from [StandardUnsignedTx](common_transactions.standardunsignedtx.md).[getOutputTotal](common_transactions.standardunsignedtx.md#getoutputtotal)*

*Defined in [src/common/tx.ts:299](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L299)*

Returns the outputTotal as a BN

**Parameters:**

Name | Type |
------ | ------ |
`assetID` | Buffer |

**Returns:** *BN*

___

###  getTransaction

▸ **getTransaction**(): *[BaseTx](api_avm_basetx.basetx.md)*

*Overrides [StandardUnsignedTx](common_transactions.standardunsignedtx.md).[getTransaction](common_transactions.standardunsignedtx.md#abstract-gettransaction)*

*Defined in [src/apis/avm/tx.ts:61](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/tx.ts#L61)*

**Returns:** *[BaseTx](api_avm_basetx.basetx.md)*

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

*Inherited from [StandardUnsignedTx](common_transactions.standardunsignedtx.md).[serialize](common_transactions.standardunsignedtx.md#serialize)*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/common/tx.ts:229](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L229)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  sign

▸ **sign**(`kc`: [KeyChain](api_avm_keychain.keychain.md)): *[Tx](api_avm_transactions.tx.md)*

*Overrides [StandardUnsignedTx](common_transactions.standardunsignedtx.md).[sign](common_transactions.standardunsignedtx.md#abstract-sign)*

*Defined in [src/apis/avm/tx.ts:83](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/tx.ts#L83)*

Signs this [UnsignedTx](api_avm_transactions.unsignedtx.md) and returns signed [StandardTx](common_transactions.standardtx.md)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`kc` | [KeyChain](api_avm_keychain.keychain.md) | An [KeyChain](api_evm_keychain.keychain.md) used in signing  |

**Returns:** *[Tx](api_avm_transactions.tx.md)*

A signed [StandardTx](common_transactions.standardtx.md)

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Inherited from [StandardUnsignedTx](common_transactions.standardunsignedtx.md).[toBuffer](common_transactions.standardunsignedtx.md#tobuffer)*

*Defined in [src/common/tx.ts:334](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L334)*

**Returns:** *Buffer*
