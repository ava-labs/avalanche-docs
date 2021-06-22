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
* [codecid](api_evm_transactions.unsignedtx.md#protected-codecid)
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
* [serialize](api_evm_transactions.unsignedtx.md#serialize)
* [sign](api_evm_transactions.unsignedtx.md#sign)
* [toBuffer](api_evm_transactions.unsignedtx.md#tobuffer)

## Constructors

###  constructor

\+ **new UnsignedTx**(`transaction`: [EVMBaseTx](api_evm_basetx.evmbasetx.md), `codecid`: number): *[UnsignedTx](api_evm_transactions.unsignedtx.md)*

*Inherited from [EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md).[constructor](common_transactions.evmstandardunsignedtx.md#constructor)*

*Defined in [src/common/evmtx.ts:209](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/evmtx.ts#L209)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`transaction` | [EVMBaseTx](api_evm_basetx.evmbasetx.md) | undefined |
`codecid` | number | 0 |

**Returns:** *[UnsignedTx](api_evm_transactions.unsignedtx.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [Serializable](utils_serialization.serializable.md).[_codecID](utils_serialization.serializable.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:42](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/utils/serialization.ts#L42)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md).[_typeID](common_transactions.evmstandardunsignedtx.md#protected-_typeid)*

*Defined in [src/apis/evm/tx.ts:47](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/apis/evm/tx.ts#L47)*

___

### `Protected` _typeName

• **_typeName**: *string* = "UnsignedTx"

*Overrides [EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md).[_typeName](common_transactions.evmstandardunsignedtx.md#protected-_typename)*

*Defined in [src/apis/evm/tx.ts:46](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/apis/evm/tx.ts#L46)*

___

### `Protected` codecid

• **codecid**: *number* = 0

*Inherited from [EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md).[codecid](common_transactions.evmstandardunsignedtx.md#protected-codecid)*

*Defined in [src/common/evmtx.ts:124](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/evmtx.ts#L124)*

___

### `Protected` transaction

• **transaction**: *[EVMBaseTx](api_evm_basetx.evmbasetx.md)*

*Inherited from [EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md).[transaction](common_transactions.evmstandardunsignedtx.md#protected-transaction)*

*Defined in [src/common/evmtx.ts:125](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/evmtx.ts#L125)*

## Methods

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Overrides [EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md).[deserialize](common_transactions.evmstandardunsignedtx.md#deserialize)*

*Defined in [src/apis/evm/tx.ts:51](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/apis/evm/tx.ts#L51)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Overrides [EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md).[fromBuffer](common_transactions.evmstandardunsignedtx.md#abstract-frombuffer)*

*Defined in [src/apis/evm/tx.ts:61](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/apis/evm/tx.ts#L61)*

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

*Defined in [src/common/evmtx.ts:179](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/evmtx.ts#L179)*

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

*Overrides [Serializable](utils_serialization.serializable.md).[getCodecID](utils_serialization.serializable.md#getcodecid)*

*Defined in [src/common/evmtx.ts:130](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/evmtx.ts#L130)*

Returns the CodecID as a number

**Returns:** *number*

___

###  getCodecIDBuffer

▸ **getCodecIDBuffer**(): *Buffer*

*Inherited from [EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md).[getCodecIDBuffer](common_transactions.evmstandardunsignedtx.md#getcodecidbuffer)*

*Defined in [src/common/evmtx.ts:135](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/evmtx.ts#L135)*

Returns the [Buffer](https://github.com/feross/buffer) representation of the CodecID

**Returns:** *Buffer*

___

###  getInputTotal

▸ **getInputTotal**(`assetID`: Buffer): *BN*

*Inherited from [EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md).[getInputTotal](common_transactions.evmstandardunsignedtx.md#getinputtotal)*

*Defined in [src/common/evmtx.ts:144](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/evmtx.ts#L144)*

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

*Defined in [src/common/evmtx.ts:161](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/evmtx.ts#L161)*

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

*Defined in [src/apis/evm/tx.ts:57](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/apis/evm/tx.ts#L57)*

**Returns:** *[EVMBaseTx](api_evm_basetx.evmbasetx.md)*

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

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *object*

*Inherited from [EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md).[serialize](common_transactions.evmstandardunsignedtx.md#serialize)*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/common/evmtx.ts:110](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/evmtx.ts#L110)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  sign

▸ **sign**(`kc`: [KeyChain](api_evm_keychain.keychain.md)): *[Tx](api_evm_transactions.tx.md)*

*Overrides [EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md).[sign](common_transactions.evmstandardunsignedtx.md#abstract-sign)*

*Defined in [src/apis/evm/tx.ts:77](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/apis/evm/tx.ts#L77)*

Signs this [UnsignedTx](api_evm_transactions.unsignedtx.md) and returns signed [StandardTx](common_transactions.standardtx.md)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`kc` | [KeyChain](api_evm_keychain.keychain.md) | An [KeyChain](api_avm_keychain.keychain.md) used in signing  |

**Returns:** *[Tx](api_evm_transactions.tx.md)*

A signed [StandardTx](common_transactions.standardtx.md)

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Inherited from [EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md).[toBuffer](common_transactions.evmstandardunsignedtx.md#tobuffer)*

*Defined in [src/common/evmtx.ts:190](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/evmtx.ts#L190)*

**Returns:** *Buffer*
