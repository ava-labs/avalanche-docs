[avalanche](../README.md) › [API-EVM-BaseTx](../modules/api_evm_basetx.md) › [EVMBaseTx](api_evm_basetx.evmbasetx.md)

# Class: EVMBaseTx

Class representing a base for all transactions.

## Hierarchy

  ↳ [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md)‹[KeyPair](api_evm_keychain.keypair.md), [KeyChain](api_evm_keychain.keychain.md)›

  ↳ **EVMBaseTx**

  ↳ [ImportTx](api_evm_importtx.importtx.md)

  ↳ [ExportTx](api_evm_exporttx.exporttx.md)

## Index

### Constructors

* [constructor](api_evm_basetx.evmbasetx.md#constructor)

### Properties

* [_codecID](api_evm_basetx.evmbasetx.md#protected-_codecid)
* [_typeID](api_evm_basetx.evmbasetx.md#protected-_typeid)
* [_typeName](api_evm_basetx.evmbasetx.md#protected-_typename)
* [blockchainid](api_evm_basetx.evmbasetx.md#protected-blockchainid)
* [networkid](api_evm_basetx.evmbasetx.md#protected-networkid)

### Methods

* [clone](api_evm_basetx.evmbasetx.md#clone)
* [create](api_evm_basetx.evmbasetx.md#create)
* [deserialize](api_evm_basetx.evmbasetx.md#deserialize)
* [fromBuffer](api_evm_basetx.evmbasetx.md#frombuffer)
* [getBlockchainID](api_evm_basetx.evmbasetx.md#getblockchainid)
* [getCodecID](api_evm_basetx.evmbasetx.md#getcodecid)
* [getNetworkID](api_evm_basetx.evmbasetx.md#getnetworkid)
* [getTxType](api_evm_basetx.evmbasetx.md#gettxtype)
* [getTypeID](api_evm_basetx.evmbasetx.md#gettypeid)
* [getTypeName](api_evm_basetx.evmbasetx.md#gettypename)
* [select](api_evm_basetx.evmbasetx.md#select)
* [serialize](api_evm_basetx.evmbasetx.md#serialize)
* [sign](api_evm_basetx.evmbasetx.md#sign)
* [toBuffer](api_evm_basetx.evmbasetx.md#tobuffer)
* [toString](api_evm_basetx.evmbasetx.md#tostring)

## Constructors

###  constructor

\+ **new EVMBaseTx**(`networkID`: number, `blockchainID`: Buffer): *[EVMBaseTx](api_evm_basetx.evmbasetx.md)*

*Overrides [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[constructor](common_transactions.evmstandardbasetx.md#constructor)*

*Defined in [src/apis/evm/basetx.ts:86](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/apis/evm/basetx.ts#L86)*

Class representing an EVMBaseTx which is the foundation for all EVM transactions.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`networkID` | number | DefaultNetworkID | Optional networkID, [DefaultNetworkID](../modules/utils_constants.md#const-defaultnetworkid) |
`blockchainID` | Buffer | Buffer.alloc(32, 16) | Optional blockchainID, default Buffer.alloc(32, 16)  |

**Returns:** *[EVMBaseTx](api_evm_basetx.evmbasetx.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [Serializable](utils_serialization.serializable.md).[_codecID](utils_serialization.serializable.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:42](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/serialization.ts#L42)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[_typeID](common_transactions.evmstandardbasetx.md#protected-_typeid)*

*Defined in [src/apis/evm/basetx.ts:28](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/apis/evm/basetx.ts#L28)*

___

### `Protected` _typeName

• **_typeName**: *string* = "BaseTx"

*Overrides [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[_typeName](common_transactions.evmstandardbasetx.md#protected-_typename)*

*Defined in [src/apis/evm/basetx.ts:27](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/apis/evm/basetx.ts#L27)*

___

### `Protected` blockchainid

• **blockchainid**: *Buffer* = Buffer.alloc(32)

*Inherited from [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[blockchainid](common_transactions.evmstandardbasetx.md#protected-blockchainid)*

*Defined in [src/common/evmtx.ts:45](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/evmtx.ts#L45)*

___

### `Protected` networkid

• **networkid**: *Buffer* = Buffer.alloc(4)

*Inherited from [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[networkid](common_transactions.evmstandardbasetx.md#protected-networkid)*

*Defined in [src/common/evmtx.ts:44](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/evmtx.ts#L44)*

## Methods

###  clone

▸ **clone**(): *this*

*Overrides [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[clone](common_transactions.evmstandardbasetx.md#abstract-clone)*

*Defined in [src/apis/evm/basetx.ts:73](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/apis/evm/basetx.ts#L73)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Overrides [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[create](common_transactions.evmstandardbasetx.md#abstract-create)*

*Defined in [src/apis/evm/basetx.ts:79](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/apis/evm/basetx.ts#L79)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Overrides [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[deserialize](common_transactions.evmstandardbasetx.md#deserialize)*

*Defined in [src/apis/evm/basetx.ts:32](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/apis/evm/basetx.ts#L32)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Defined in [src/apis/evm/basetx.ts:52](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/apis/evm/basetx.ts#L52)*

Takes a [Buffer](https://github.com/feross/buffer) containing an [BaseTx](api_avm_basetx.basetx.md), parses it, populates the class, and returns the length of the BaseTx in bytes.

**`remarks`** assume not-checksummed

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`bytes` | Buffer | - | A [Buffer](https://github.com/feross/buffer) containing a raw [BaseTx](api_avm_basetx.basetx.md)  |
`offset` | number | 0 | - |

**Returns:** *number*

The length of the raw [BaseTx](api_avm_basetx.basetx.md)

___

###  getBlockchainID

▸ **getBlockchainID**(): *Buffer*

*Inherited from [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[getBlockchainID](common_transactions.evmstandardbasetx.md#getblockchainid)*

*Defined in [src/common/evmtx.ts:60](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/evmtx.ts#L60)*

Returns the Buffer representation of the BlockchainID

**Returns:** *Buffer*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Inherited from [Serializable](utils_serialization.serializable.md).[getCodecID](utils_serialization.serializable.md#getcodecid)*

*Defined in [src/utils/serialization.ts:61](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/serialization.ts#L61)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getNetworkID

▸ **getNetworkID**(): *number*

*Inherited from [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[getNetworkID](common_transactions.evmstandardbasetx.md#getnetworkid)*

*Defined in [src/common/evmtx.ts:55](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/evmtx.ts#L55)*

Returns the NetworkID as a number

**Returns:** *number*

___

###  getTxType

▸ **getTxType**(): *number*

*Overrides [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[getTxType](common_transactions.evmstandardbasetx.md#abstract-gettxtype)*

*Defined in [src/apis/evm/basetx.ts:39](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/apis/evm/basetx.ts#L39)*

Returns the id of the [BaseTx](api_avm_basetx.basetx.md)

**Returns:** *number*

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

###  select

▸ **select**(`id`: number, ...`args`: any[]): *this*

*Overrides [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[select](common_transactions.evmstandardbasetx.md#abstract-select)*

*Defined in [src/apis/evm/basetx.ts:83](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/apis/evm/basetx.ts#L83)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`...args` | any[] |

**Returns:** *this*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *object*

*Inherited from [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[serialize](common_transactions.evmstandardbasetx.md#serialize)*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/common/evmtx.ts:29](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/evmtx.ts#L29)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  sign

▸ **sign**(`msg`: Buffer, `kc`: [KeyChain](api_evm_keychain.keychain.md)): *[Credential](common_signature.credential.md)[]*

*Defined in [src/apis/evm/basetx.ts:68](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/apis/evm/basetx.ts#L68)*

Takes the bytes of an [UnsignedTx](api_avm_transactions.unsignedtx.md) and returns an array of [Credential](common_signature.credential.md)s

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`msg` | Buffer | A Buffer for the [UnsignedTx](api_avm_transactions.unsignedtx.md) |
`kc` | [KeyChain](api_evm_keychain.keychain.md) | An [KeyChain](api_avm_keychain.keychain.md) used in signing  |

**Returns:** *[Credential](common_signature.credential.md)[]*

An array of [Credential](common_signature.credential.md)s

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Inherited from [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[toBuffer](common_transactions.evmstandardbasetx.md#tobuffer)*

*Defined in [src/common/evmtx.ts:65](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/evmtx.ts#L65)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [StandardBaseTx](common_transactions.standardbasetx.md).

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Inherited from [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[toString](common_transactions.evmstandardbasetx.md#tostring)*

*Defined in [src/common/evmtx.ts:75](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/evmtx.ts#L75)*

Returns a base-58 representation of the [StandardBaseTx](common_transactions.standardbasetx.md).

**Returns:** *string*
