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
* [codecid](api_avm_transactions.unsignedtx.md#protected-codecid)
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
* [serialize](api_avm_transactions.unsignedtx.md#serialize)
* [sign](api_avm_transactions.unsignedtx.md#sign)
* [toBuffer](api_avm_transactions.unsignedtx.md#tobuffer)

## Constructors

###  constructor

\+ **new UnsignedTx**(`transaction`: [BaseTx](api_avm_basetx.basetx.md), `codecid`: number): *[UnsignedTx](api_avm_transactions.unsignedtx.md)*

*Inherited from [StandardUnsignedTx](common_transactions.standardunsignedtx.md).[constructor](common_transactions.standardunsignedtx.md#constructor)*

*Defined in [src/common/tx.ts:286](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/tx.ts#L286)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`transaction` | [BaseTx](api_avm_basetx.basetx.md) | undefined |
`codecid` | number | 0 |

**Returns:** *[UnsignedTx](api_avm_transactions.unsignedtx.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [Serializable](utils_serialization.serializable.md).[_codecID](utils_serialization.serializable.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:42](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/serialization.ts#L42)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [StandardUnsignedTx](common_transactions.standardunsignedtx.md).[_typeID](common_transactions.standardunsignedtx.md#protected-_typeid)*

*Defined in [src/apis/avm/tx.ts:53](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/apis/avm/tx.ts#L53)*

___

### `Protected` _typeName

• **_typeName**: *string* = "UnsignedTx"

*Overrides [StandardUnsignedTx](common_transactions.standardunsignedtx.md).[_typeName](common_transactions.standardunsignedtx.md#protected-_typename)*

*Defined in [src/apis/avm/tx.ts:52](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/apis/avm/tx.ts#L52)*

___

### `Protected` codecid

• **codecid**: *number* = 0

*Inherited from [StandardUnsignedTx](common_transactions.standardunsignedtx.md).[codecid](common_transactions.standardunsignedtx.md#protected-codecid)*

*Defined in [src/common/tx.ts:196](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/tx.ts#L196)*

___

### `Protected` transaction

• **transaction**: *[BaseTx](api_avm_basetx.basetx.md)*

*Inherited from [StandardUnsignedTx](common_transactions.standardunsignedtx.md).[transaction](common_transactions.standardunsignedtx.md#protected-transaction)*

*Defined in [src/common/tx.ts:197](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/tx.ts#L197)*

## Methods

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Overrides [StandardUnsignedTx](common_transactions.standardunsignedtx.md).[deserialize](common_transactions.standardunsignedtx.md#deserialize)*

*Defined in [src/apis/avm/tx.ts:57](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/apis/avm/tx.ts#L57)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Overrides [StandardUnsignedTx](common_transactions.standardunsignedtx.md).[fromBuffer](common_transactions.standardunsignedtx.md#abstract-frombuffer)*

*Defined in [src/apis/avm/tx.ts:67](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/apis/avm/tx.ts#L67)*

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

*Defined in [src/common/tx.ts:255](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/tx.ts#L255)*

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

*Overrides [Serializable](utils_serialization.serializable.md).[getCodecID](utils_serialization.serializable.md#getcodecid)*

*Defined in [src/common/tx.ts:202](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/tx.ts#L202)*

Returns the CodecID as a number

**Returns:** *number*

___

###  getCodecIDBuffer

▸ **getCodecIDBuffer**(): *Buffer*

*Inherited from [StandardUnsignedTx](common_transactions.standardunsignedtx.md).[getCodecIDBuffer](common_transactions.standardunsignedtx.md#getcodecidbuffer)*

*Defined in [src/common/tx.ts:207](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/tx.ts#L207)*

Returns the [Buffer](https://github.com/feross/buffer) representation of the CodecID

**Returns:** *Buffer*

___

###  getInputTotal

▸ **getInputTotal**(`assetID`: Buffer): *BN*

*Inherited from [StandardUnsignedTx](common_transactions.standardunsignedtx.md).[getInputTotal](common_transactions.standardunsignedtx.md#getinputtotal)*

*Defined in [src/common/tx.ts:216](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/tx.ts#L216)*

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

*Defined in [src/common/tx.ts:236](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/tx.ts#L236)*

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

*Defined in [src/apis/avm/tx.ts:63](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/apis/avm/tx.ts#L63)*

**Returns:** *[BaseTx](api_avm_basetx.basetx.md)*

___

###  getTypeID

▸ **getTypeID**(): *number*

*Inherited from [Serializable](utils_serialization.serializable.md).[getTypeID](utils_serialization.serializable.md#gettypeid)*

*Defined in [src/utils/serialization.ts:54](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/serialization.ts#L54)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getTypeName

▸ **getTypeName**(): *string*

*Inherited from [Serializable](utils_serialization.serializable.md).[getTypeName](utils_serialization.serializable.md#gettypename)*

*Defined in [src/utils/serialization.ts:47](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/serialization.ts#L47)*

Used in serialization. TypeName is a string name for the type of object being output.

**Returns:** *string*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *object*

*Inherited from [StandardUnsignedTx](common_transactions.standardunsignedtx.md).[serialize](common_transactions.standardunsignedtx.md#serialize)*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/common/tx.ts:182](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/tx.ts#L182)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  sign

▸ **sign**(`kc`: [KeyChain](api_avm_keychain.keychain.md)): *[Tx](api_avm_transactions.tx.md)*

*Overrides [StandardUnsignedTx](common_transactions.standardunsignedtx.md).[sign](common_transactions.standardunsignedtx.md#abstract-sign)*

*Defined in [src/apis/avm/tx.ts:83](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/apis/avm/tx.ts#L83)*

Signs this [UnsignedTx](api_avm_transactions.unsignedtx.md) and returns signed [StandardTx](common_transactions.standardtx.md)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`kc` | [KeyChain](api_avm_keychain.keychain.md) | An [KeyChain](api_avm_keychain.keychain.md) used in signing  |

**Returns:** *[Tx](api_avm_transactions.tx.md)*

A signed [StandardTx](common_transactions.standardtx.md)

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Inherited from [StandardUnsignedTx](common_transactions.standardunsignedtx.md).[toBuffer](common_transactions.standardunsignedtx.md#tobuffer)*

*Defined in [src/common/tx.ts:266](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/tx.ts#L266)*

**Returns:** *Buffer*
