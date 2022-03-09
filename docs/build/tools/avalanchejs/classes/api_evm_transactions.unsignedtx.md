[avalanche](../README.md) › [API-EVM-Transactions](../modules/api_evm_transactions.md) › [UnsignedTx](api_evm_transactions.unsignedtx.md)

# Class: UnsignedTx

## Hierarchy

  ↳ [EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md)‹[KeyPair](api_evm_keychain.keypair.md), [KeyChain](api_evm_keychain.keychain.md), [EVMBaseTx](api_evm_basetx.evmbasetx.md)›

  ↳ **UnsignedTx**

## Index

### Constructors

* [constructor](api_evm_transactions.unsignedtx.md#constructor)

### Properties

* [_codecID](api_evm_transactions.unsignedtx.md#protected-_codecid)
* [_typeID](api_evm_transactions.unsignedtx.md#protected-_typeid)
* [_typeName](api_evm_transactions.unsignedtx.md#protected-_typename)
* [codecID](api_evm_transactions.unsignedtx.md#protected-codecid)
* [transaction](api_evm_transactions.unsignedtx.md#protected-transaction)

### Methods

* [deserialize](api_evm_transactions.unsignedtx.md#deserialize)
* [fromBuffer](api_evm_transactions.unsignedtx.md#frombuffer)
* [getBurn](api_evm_transactions.unsignedtx.md#getburn)
* [getCodecID](api_evm_transactions.unsignedtx.md#getcodecid)
* [getCodecIDBuffer](api_evm_transactions.unsignedtx.md#getcodecidbuffer)
* [getInputTotal](api_evm_transactions.unsignedtx.md#getinputtotal)
* [getOutputTotal](api_evm_transactions.unsignedtx.md#getoutputtotal)
* [getTransaction](api_evm_transactions.unsignedtx.md#gettransaction)
* [getTypeID](api_evm_transactions.unsignedtx.md#gettypeid)
* [getTypeName](api_evm_transactions.unsignedtx.md#gettypename)
* [sanitizeObject](api_evm_transactions.unsignedtx.md#sanitizeobject)
* [serialize](api_evm_transactions.unsignedtx.md#serialize)
* [sign](api_evm_transactions.unsignedtx.md#sign)
* [toBuffer](api_evm_transactions.unsignedtx.md#tobuffer)

## Constructors

###  constructor

\+ **new UnsignedTx**(`transaction`: [EVMBaseTx](api_evm_basetx.evmbasetx.md), `codecID`: number): *[UnsignedTx](api_evm_transactions.unsignedtx.md)*

*Inherited from [EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md).[constructor](common_transactions.evmstandardunsignedtx.md#constructor)*

*Defined in [src/common/evmtx.ts:271](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L271)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`transaction` | [EVMBaseTx](api_evm_basetx.evmbasetx.md) | undefined |
`codecID` | number | 0 |

**Returns:** *[UnsignedTx](api_evm_transactions.unsignedtx.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:51](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L51)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md).[_typeID](common_transactions.evmstandardunsignedtx.md#protected-_typeid)*

*Defined in [src/apis/evm/tx.ts:48](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/tx.ts#L48)*

___

### `Protected` _typeName

• **_typeName**: *string* = "UnsignedTx"

*Overrides [EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md).[_typeName](common_transactions.evmstandardunsignedtx.md#protected-_typename)*

*Defined in [src/apis/evm/tx.ts:47](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/tx.ts#L47)*

___

### `Protected` codecID

• **codecID**: *number* = 0

*Inherited from [EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md).[codecID](common_transactions.evmstandardunsignedtx.md#protected-codecid)*

*Defined in [src/common/evmtx.ts:172](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L172)*

___

### `Protected` transaction

• **transaction**: *[EVMBaseTx](api_evm_basetx.evmbasetx.md)*

*Inherited from [EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md).[transaction](common_transactions.evmstandardunsignedtx.md#protected-transaction)*

*Defined in [src/common/evmtx.ts:173](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L173)*

## Methods

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Overrides [EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md).[deserialize](common_transactions.evmstandardunsignedtx.md#deserialize)*

*Defined in [src/apis/evm/tx.ts:52](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/tx.ts#L52)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Overrides [EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md).[fromBuffer](common_transactions.evmstandardunsignedtx.md#abstract-frombuffer)*

*Defined in [src/apis/evm/tx.ts:62](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/tx.ts#L62)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`bytes` | Buffer | - |
`offset` | number | 0 |

**Returns:** *number*

___

###  getBurn

▸ **getBurn**(`assetID`: Buffer): *BN*

*Inherited from [EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md).[getBurn](common_transactions.evmstandardunsignedtx.md#getburn)*

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

*Inherited from [EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md).[getCodecID](common_transactions.evmstandardunsignedtx.md#getcodecid)*

*Overrides [SigIdx](common_signature.sigidx.md).[getCodecID](common_signature.sigidx.md#getcodecid)*

*Defined in [src/common/evmtx.ts:178](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L178)*

Returns the CodecID as a number

**Returns:** *number*

___

###  getCodecIDBuffer

▸ **getCodecIDBuffer**(): *Buffer*

*Inherited from [EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md).[getCodecIDBuffer](common_transactions.evmstandardunsignedtx.md#getcodecidbuffer)*

*Defined in [src/common/evmtx.ts:185](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L185)*

Returns the [Buffer](https://github.com/feross/buffer) representation of the CodecID

**Returns:** *Buffer*

___

###  getInputTotal

▸ **getInputTotal**(`assetID`: Buffer): *BN*

*Inherited from [EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md).[getInputTotal](common_transactions.evmstandardunsignedtx.md#getinputtotal)*

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

*Inherited from [EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md).[getOutputTotal](common_transactions.evmstandardunsignedtx.md#getoutputtotal)*

*Defined in [src/common/evmtx.ts:214](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L214)*

Returns the outputTotal as a BN

**Parameters:**

Name | Type |
------ | ------ |
`assetID` | Buffer |

**Returns:** *BN*

___

###  getTransaction

▸ **getTransaction**(): *[EVMBaseTx](api_evm_basetx.evmbasetx.md)*

*Overrides [EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md).[getTransaction](common_transactions.evmstandardunsignedtx.md#abstract-gettransaction)*

*Defined in [src/apis/evm/tx.ts:58](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/tx.ts#L58)*

**Returns:** *[EVMBaseTx](api_evm_basetx.evmbasetx.md)*

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

*Inherited from [EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md).[serialize](common_transactions.evmstandardunsignedtx.md#serialize)*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/common/evmtx.ts:147](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L147)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  sign

▸ **sign**(`kc`: [KeyChain](api_evm_keychain.keychain.md)): *[Tx](api_evm_transactions.tx.md)*

*Overrides [EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md).[sign](common_transactions.evmstandardunsignedtx.md#abstract-sign)*

*Defined in [src/apis/evm/tx.ts:80](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/tx.ts#L80)*

Signs this [UnsignedTx](api_evm_transactions.unsignedtx.md) and returns signed [StandardTx](common_transactions.standardtx.md)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`kc` | [KeyChain](api_evm_keychain.keychain.md) | An [KeyChain](api_evm_keychain.keychain.md) used in signing  |

**Returns:** *[Tx](api_evm_transactions.tx.md)*

A signed [StandardTx](common_transactions.standardtx.md)

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Inherited from [EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md).[toBuffer](common_transactions.evmstandardunsignedtx.md#tobuffer)*

*Defined in [src/common/evmtx.ts:247](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L247)*

**Returns:** *Buffer*
